<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\{LessonPlan, Location, SingleLessonPlan};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use InvalidArgumentException;

class SingleLessonPlansController extends Controller
{
    public function edit(SingleLessonPlan $singleLessonPlan)
    {
        $singleLessonPlan->load('student', 'location');

        return view('calendar.singleLessonPlans.edit', compact('singleLessonPlan'));
    }

    public function store(Request $request)
    {
        $data = $this->validateSingleLessonPlan($request);

        SingleLessonPlan::create($this->singleLessonPlanAttributes($data));

        return back()->with('success', 'The single lesson was successfully scheduled');
    }

    public function update(Request $request, SingleLessonPlan $singleLessonPlan)
    {
        $data = $this->validateSingleLessonPlan($request);

        $singleLessonPlan->update($this->singleLessonPlanAttributes($data, $singleLessonPlan));

        return back()->with('success', 'The single lesson was successfully updated');
    }

    public function destroy(SingleLessonPlan $singleLessonPlan)
    {
        $singleLessonPlan->delete();

        return back()->with('success', 'The single lesson was successfully deleted');
    }

    public function reschedule(Request $request)
    {
        $request->validate([
            'single_lesson_plan_id' => ['required', 'exists:single_lesson_plans,id'],
            'date' => ['required', 'date_format:Y-m-d'],
            'start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'end_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
        ]);

        $singleLessonPlan = SingleLessonPlan::findOrFail($request->single_lesson_plan_id);

        try {
            $result = DB::transaction(function () use ($singleLessonPlan, $request) {
                return $singleLessonPlan->reschedule($request->only([
                    'date',
                    'start_time',
                    'end_time',
                ]));
            });
        } catch (InvalidArgumentException $e) {
            if ($request->wantsJson()) {
                return response()->json(['message' => $e->getMessage()], 422);
            }

            return back()->withErrors(['date' => $e->getMessage()])->withInput();
        }

        if ($request->wantsJson()) {
            return response()->json([
                'single_lesson_plan_id' => $result->id,
                'date' => $result->scheduled_date->toDateString(),
                'start_time' => $result->start_time,
                'end_time' => LessonPlan::addMinutesToTime($result->start_time, $result->duration_minutes),
                'duration_minutes' => $result->duration_minutes,
            ]);
        }

        return back()->with('success', 'The single lesson was successfully rescheduled');
    }

    private function validateSingleLessonPlan(Request $request)
    {
        return $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'scheduled_date' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'duration_minutes' => ['required', 'integer', 'min:15'],
            'fee_amount' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string', 'max:255'],
            'location_id' => ['required', 'exists:locations,id'],
            'meeting_url' => ['nullable', 'url', 'max:2048'],
            'notes_url' => ['nullable', 'url', 'max:2048'],
            'status' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);
    }

    private function singleLessonPlanAttributes(array $data, SingleLessonPlan $singleLessonPlan = null)
    {
        return [
            'student_id' => $singleLessonPlan ? $singleLessonPlan->student_id : $data['student_id'],
            'scheduled_date' => $this->lessonDate($data['scheduled_date']),
            'start_time' => $data['start_time'],
            'duration_minutes' => $data['duration_minutes'],
            'fee_amount' => $this->lessonFeeAmount($data),
            'payment_method' => $data['payment_method'] ?? null,
            'location_id' => $data['location_id'],
            'meeting_url' => $this->isOnlineLocation($data['location_id']) ? ($data['meeting_url'] ?? null) : null,
            'notes_url' => $this->isOnlineLocation($data['location_id']) ? ($data['notes_url'] ?? null) : null,
            'status' => $data['status'] ?? 'active',
            'notes' => $data['notes'] ?? null,
        ];
    }

    private function lessonDate($value)
    {
        return carbon($value)->toDateString();
    }

    private function feeAmount($value)
    {
        $value = preg_replace('/[^0-9]/', '', (string) $value);

        return $value === '' ? null : ((int) $value) * 100;
    }

    private function lessonFeeAmount(array $data)
    {
        $feeAmount = $this->feeAmount($data['fee_amount'] ?? null);

        if ($feeAmount !== null) {
            return $feeAmount;
        }

        $location = Location::find($data['location_id'] ?? null);

        if (! $location || ! $location->fee_amount || empty($data['duration_minutes'])) {
            return null;
        }

        $proratedDollars = ($location->fee_amount / 100) * ((int) $data['duration_minutes'] / 60);

        return ((int) floor($proratedDollars / 5) * 5) * 100;
    }

    private function isOnlineLocation($locationId)
    {
        $location = Location::find($locationId);

        return $location && strtolower($location->name) === 'online';
    }
}
