<?php

namespace App\Http\Controllers\Calendar;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Calendar\{LessonPlan, Location, SingleLessonPlan, Student};
use InvalidArgumentException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class LessonPlansController extends Controller
{
    public function index()
    {
        return view('calendar.lessons.lessonPlans.index');
    }

    public function edit(LessonPlan $lessonPlan)
    {
        return view('calendar.lessons.lessonPlans.edit', compact('lessonPlan'));
    }

    public function store(Request $request)
    {
        $data = $this->validateLessonCreation($request);
        $repeat = (string) ($data['repeat'] ?? $data['recurrence_interval'] ?? 'none');

        if ($repeat === 'none') {
            SingleLessonPlan::create($this->singleLessonPlanAttributes($data));

            return back()->with('success', 'The lesson was successfully scheduled');
        }

        $data['recurrence_interval'] = (int) $repeat;
        $this->validateLessonPlanDoesNotOverlap($data['student_id'], $data['starts_on'], $data['ends_on']);
        LessonPlan::create($this->lessonPlanAttributes($data));

        return back()->with('success', 'The lesson plan was successfully added');
    }

    public function duplicate(LessonPlan $lessonPlan)
    {
        $duplicate = $lessonPlan->replicate();
        $duplicate->fill([
            'starts_on' => null,
            'ends_on' => null,
        ]);
        $duplicate->save();

        return back()->with('success', 'The lesson plan was successfully duplicated');
    }

    public function update(Request $request, LessonPlan $lessonPlan)
    {
        $data = $this->validateLessonPlan($request);
        $repeat = (string) ($data['repeat'] ?? $data['recurrence_interval']);

        if ($repeat === 'none') {
            $data['student_id'] = $lessonPlan->student_id;
            $this->convertToSingleLessonPlan($lessonPlan, $data);

            return back()->with('success', 'The lesson plan was successfully changed to a single lesson');
        }

        $data['recurrence_interval'] = (int) $repeat;

        $this->validateLessonPlanDoesNotOverlap($lessonPlan->student_id, $data['starts_on'] ?? null, $data['ends_on'] ?? null, $lessonPlan);

        $lessonPlan->update($this->lessonPlanAttributes($data, $lessonPlan));

        return back()->with('success', 'The lesson plan was successfully updated');
    }

    private function convertToSingleLessonPlan(LessonPlan $lessonPlan, array $data)
    {
        return DB::transaction(function () use ($lessonPlan, $data) {
            $lessonPlan = LessonPlan::query()->lockForUpdate()->findOrFail($lessonPlan->id);
            $hasLessonHistory = $lessonPlan->lessons()->exists();
            $hasPaymentHistory = $lessonPlan->earlyPayments()->exists();
            $hasCancellationHistory = (bool) ($lessonPlan->canceled_at || $lessonPlan->canceled_from);

            if ($hasLessonHistory || $hasPaymentHistory || $hasCancellationHistory) {
                throw ValidationException::withMessages([
                    'repeat' => 'This lesson plan cannot be changed to a single lesson because it has recorded lesson, payment, or cancellation history. Confirmed, paid, canceled, and early-paid occurrences must remain attached to their recurring plan.',
                ]);
            }

            $singleLessonPlan = SingleLessonPlan::create($this->singleLessonPlanAttributes($data));

            $lessonPlan->scheduleOverrides()->delete();
            $lessonPlan->delete();

            return $singleLessonPlan;
        });
    }

    public function destroy(LessonPlan $lessonPlan)
    {
        DB::transaction(function () use ($lessonPlan) {
            $lessonPlan->lessons()->delete();
            $lessonPlan->earlyPayments()->delete();
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
            'repeat' => ['nullable', Rule::in(['none', '1', '2'])],
            'recurrence_interval' => ['nullable', 'required_without:repeat', 'integer', Rule::in([1, 2])],
            'starts_on' => [
                Rule::requiredIf(fn () => (string) $request->input('repeat') === 'none'),
                'nullable',
                'date',
            ],
            'ends_on' => ['nullable', 'date', 'after_or_equal:starts_on'],
            'start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'duration_minutes' => ['required', 'integer', 'min:15'],
            'fee_amount' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string', 'max:255'],
            'location_id' => [
                'required',
                Rule::exists('locations', 'id')->where('usage', Location::USAGE_TEACHING),
            ],
            'meeting_url' => ['nullable', 'url', 'max:2048'],
            'notes_url' => ['nullable', 'url', 'max:2048'],
            'notes' => ['nullable', 'string'],
            'travel_mode' => ['nullable', Rule::in(['TRANSIT', 'WALK', 'DRIVE'])],
        ]);
    }

    private function validateLessonCreation(Request $request)
    {
        return $request->validate([
            'student_id' => ['required', 'exists:students,id'],
            'repeat' => ['nullable', Rule::in(['none', '1', '2'])],
            'recurrence_interval' => ['nullable', 'integer', Rule::in([1, 2])],
            'starts_on' => ['required', 'date'],
            'ends_on' => [
                Rule::requiredIf(function () use ($request) {
                    return (string) ($request->input('repeat') ?? $request->input('recurrence_interval') ?? 'none') !== 'none';
                }),
                'nullable',
                'date',
                'after_or_equal:starts_on',
            ],
            'start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'duration_minutes' => ['required', 'integer', 'min:15'],
            'fee_amount' => ['nullable', 'string'],
            'payment_method' => ['nullable', 'string', 'max:255'],
            'location_id' => [
                'required',
                Rule::exists('locations', 'id')->where('usage', Location::USAGE_TEACHING),
            ],
            'meeting_url' => ['nullable', 'url', 'max:2048'],
            'notes_url' => ['nullable', 'url', 'max:2048'],
            'notes' => ['nullable', 'string'],
            'travel_mode' => ['nullable', Rule::in(['TRANSIT', 'WALK', 'DRIVE'])],
        ]);
    }

    private function validateLessonPlanDoesNotOverlap($studentId, $startsOn, $endsOn, LessonPlan $ignoreLessonPlan = null)
    {
        if (empty($startsOn) || empty($endsOn)) {
            return;
        }

        $startsOn = $this->lessonPlanDate($startsOn);
        $endsOn = $this->lessonPlanDate($endsOn);

        $hasOverlappingLessonPlan = LessonPlan::where('student_id', $studentId)
            ->whereNotNull('starts_on')
            ->whereNotNull('ends_on')
            ->when($ignoreLessonPlan, function ($query) use ($ignoreLessonPlan) {
                $query->whereKeyNot($ignoreLessonPlan->getKey());
            })
            ->whereDate('starts_on', '<=', $endsOn)
            ->whereDate('ends_on', '>=', $startsOn)
            ->exists();

        if ($hasOverlappingLessonPlan) {
            throw ValidationException::withMessages([
                'starts_on' => 'This lesson plan overlaps with another lesson plan.',
            ]);
        }
    }

    private function lessonPlanAttributes(array $data, LessonPlan $lessonPlan = null)
    {
        $startsOn = ! empty($data['starts_on'])
            ? $this->lessonPlanDate($data['starts_on'])
            : null;

        return [
            'student_id' => $lessonPlan ? $lessonPlan->student_id : $data['student_id'],
            'weekday' => $startsOn
                ? LessonPlan::fromCarbonWeekday(Carbon::parse($startsOn)->dayOfWeek)
                : ($lessonPlan ? $lessonPlan->weekday : null),
            'recurrence_interval' => $data['recurrence_interval'],
            'starts_on' => $startsOn,
            'ends_on' => ! empty($data['ends_on'])
                ? $this->lessonPlanDate($data['ends_on'])
                : null,
            'start_time' => $data['start_time'],
            'duration_minutes' => $data['duration_minutes'],
            'fee_amount' => $this->lessonFeeAmount($data),
            'payment_method' => $data['payment_method'] ?? null,
            'location_id' => $data['location_id'],
            'meeting_url' => $this->isOnlineLocation($data['location_id']) ? ($data['meeting_url'] ?? null) : null,
            'notes_url' => $this->isOnlineLocation($data['location_id']) ? ($data['notes_url'] ?? null) : null,
            'notes' => $data['notes'] ?? null,
            'travel_mode' => $data['travel_mode'] ?? $lessonPlan->travel_mode ?? 'TRANSIT',
        ];
    }

    private function singleLessonPlanAttributes(array $data)
    {
        return [
            'student_id' => $data['student_id'],
            'scheduled_date' => $this->lessonPlanDate($data['starts_on']),
            'start_time' => $data['start_time'],
            'duration_minutes' => $data['duration_minutes'],
            'fee_amount' => $this->lessonFeeAmount($data),
            'payment_method' => $data['payment_method'] ?? null,
            'location_id' => $data['location_id'],
            'meeting_url' => $this->isOnlineLocation($data['location_id']) ? ($data['meeting_url'] ?? null) : null,
            'notes_url' => $this->isOnlineLocation($data['location_id']) ? ($data['notes_url'] ?? null) : null,
            'status' => 'active',
            'notes' => $data['notes'] ?? null,
            'travel_mode' => $data['travel_mode'] ?? 'TRANSIT',
        ];
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

        return (int) round(floor($proratedDollars / 5) * 5 * 100);
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

    private function isOnlineLocation($locationId)
    {
        $location = Location::find($locationId);

        return $location && strtolower($location->name) === 'online';
    }
}
