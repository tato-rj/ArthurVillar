<?php

namespace App\Http\Controllers\Studio;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{LessonPlan, Student};
use InvalidArgumentException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class LessonPlansController extends Controller
{
    public function store(Request $request)
    {
        $data = $this->validateLessonPlan($request);

        $this->validateStudentDoesNotHaveCurrentLessonPlan($data['student_id']);

        LessonPlan::create($this->lessonPlanAttributes($data));

        return back()->with('success', 'The lesson plan was successfully added');
    }

    public function duplicate(LessonPlan $lessonPlan)
    {
        $this->validateStudentDoesNotHaveCurrentLessonPlan($lessonPlan->student_id);

        $duplicate = $lessonPlan->replicate();
        $duplicate->fill([
            'ends_on' => null,
            'status' => 'active',
        ]);
        $duplicate->save();

        return back()->with('success', 'The lesson plan was successfully duplicated');
    }

    public function close(LessonPlan $lessonPlan)
    {
        $lessonPlan->update([
            'ends_on' => now()->toDateString(),
        ]);

        return back()->with('success', 'The lesson plan was successfully closed');
    }

    public function update(Request $request, LessonPlan $lessonPlan)
    {
        $lessonPlan->update($this->lessonPlanAttributes($this->validateLessonPlan($request), $lessonPlan));

        return back()->with('success', 'The lesson plan was successfully updated');
    }

    public function destroy(LessonPlan $lessonPlan)
    {
        DB::transaction(function () use ($lessonPlan) {
            $lessonPlan->scheduleOverrides()->delete();
            $lessonPlan->delete();
        });

        return back()->with('success', 'The lesson plan was successfully deleted');
    }

    public function reschedule(Request $request)
    {
        $request->validate([
            'lesson_plan_id' => ['required', 'exists:lesson_plans,id'],
            'original_date' => ['required', 'date_format:Y-m-d'],
            'original_start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'date' => ['required', 'date_format:Y-m-d'],
            'start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'end_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'is_permanent' => ['required', 'boolean'],
        ]);

        $lessonPlan = LessonPlan::findOrFail($request->lesson_plan_id);
        $isPermanent = $request->boolean('is_permanent');

        try {
            $result = DB::transaction(function () use ($lessonPlan, $request, $isPermanent) {
                $attributes = $request->only([
                    'original_date',
                    'original_start_time',
                    'date',
                    'start_time',
                    'end_time',
                ]);

                return $isPermanent
                    ? $lessonPlan->reschedulePermanently($attributes)
                    : $lessonPlan->reschedule($attributes);
            });
        } catch (InvalidArgumentException $e) {
            if ($request->wantsJson()) {
                return response()->json(['message' => $e->getMessage()], 422);
            }

            return back()->withErrors(['date' => $e->getMessage()])->withInput();
        }

        if ($request->wantsJson()) {
            if ($isPermanent) {
                return response()->json([
                    'lesson_plan_id' => $result->id,
                    'previous_lesson_plan_id' => $lessonPlan->id,
                    'date' => $result->starts_on->toDateString(),
                    'start_time' => $result->start_time,
                    'end_time' => LessonPlan::addMinutesToTime($result->start_time, $result->duration_minutes),
                    'duration_minutes' => $result->duration_minutes,
                    'is_permanent' => true,
                ]);
            }

            return response()->json([
                'schedule_override_id' => $result->id,
                'lesson_plan_id' => $lessonPlan->id,
                'original_date' => $result->original_date,
                'original_start_time' => $result->original_start_time,
                'date' => $result->new_date,
                'start_time' => $result->new_start_time,
                'end_time' => LessonPlan::addMinutesToTime($result->new_start_time, $result->duration_minutes),
                'duration_minutes' => $result->duration_minutes,
                'is_permanent' => false,
            ]);
        }

        return back()->with('success', 'The lesson was successfully rescheduled');
    }

    private function validateLessonPlan(Request $request)
    {
        return $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'weekday' => ['required', 'integer', 'between:1,7'],
            'recurrence_interval' => ['required', 'integer', 'min:1'],
            'starts_on' => ['required', 'date'],
            'ends_on' => ['nullable', 'date'],
            'start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'duration_minutes' => ['required', 'integer', 'min:15'],
            'fee_amount' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'status' => ['required', Rule::in(['active', 'paused', 'canceled'])],
            'notes' => ['nullable', 'string'],
        ]);
    }

    private function validateStudentDoesNotHaveCurrentLessonPlan($studentId)
    {
        $hasCurrentLessonPlan = LessonPlan::where('student_id', $studentId)
            ->where('status', 'active')
            ->where(function ($query) {
                $query
                    ->whereNull('ends_on')
                    ->orWhereDate('ends_on', '>', now()->toDateString());
            })
            ->exists();

        if ($hasCurrentLessonPlan) {
            throw ValidationException::withMessages([
                'student_id' => 'There is already an active lesson plan.',
            ]);
        }
    }

    private function lessonPlanAttributes(array $data, LessonPlan $lessonPlan = null)
    {
        return [
            'student_id' => $lessonPlan ? $lessonPlan->student_id : $data['student_id'],
            'weekday' => $data['weekday'],
            'recurrence_interval' => $data['recurrence_interval'],
            'starts_on' => $this->lessonPlanDate($data['starts_on']),
            'ends_on' => ! empty($data['ends_on'])
                ? $this->lessonPlanDate($data['ends_on'])
                : null,
            'start_time' => $data['start_time'],
            'duration_minutes' => $data['duration_minutes'],
            'fee_amount' => $this->feeAmount($data['fee_amount'] ?? null),
            'payment_method' => $data['payment_method'] ?? null,
            'location' => $data['location'] ?: '',
            'status' => $data['status'],
            'notes' => $data['notes'] ?? null,
        ];
    }

    private function feeAmount($value)
    {
        $value = preg_replace('/[^0-9]/', '', (string) $value);

        return $value === '' ? null : ((int) $value) * 100;
    }

    private function lessonPlanDate($value)
    {
        foreach (['Y-m-d', 'm/d/Y'] as $format) {
            try {
                $date = Carbon::createFromFormat($format, $value);
            } catch (InvalidArgumentException $e) {
                continue;
            }

            if ($date && $date->format($format) === $value) {
                return $date->format('Y-m-d');
            }
        }

        return Carbon::parse($value)->format('Y-m-d');
    }
}
