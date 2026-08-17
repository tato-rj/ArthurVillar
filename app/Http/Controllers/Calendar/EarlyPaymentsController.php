<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\EarlyPayment;
use App\Models\Calendar\LessonPlan;
use App\Models\Calendar\SingleLessonPlan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class EarlyPaymentsController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'lesson_plan_id' => ['nullable', 'required_without:single_lesson_plan_id', 'exists:lesson_plans,id'],
            'single_lesson_plan_id' => ['nullable', 'required_without:lesson_plan_id', 'exists:single_lesson_plans,id'],
            'date' => ['required', 'date_format:Y-m-d'],
            'start' => ['nullable', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'scheduled_date' => ['required', 'date_format:Y-m-d'],
            'scheduled_start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
        ]);

        $timeZone = config('calendar.timezone', 'America/New_York');
        $lessonStartsAt = Carbon::createFromFormat(
            'Y-m-d H:i',
            $data['date'].' '.($data['start'] ?? $data['scheduled_start_time']),
            $timeZone
        );

        if ($lessonStartsAt->lessThanOrEqualTo(Carbon::now($timeZone))) {
            throw ValidationException::withMessages([
                'date' => 'Early payment can only be recorded before the lesson starts.',
            ]);
        }

        $lessonPlanId = $data['lesson_plan_id'] ?? null;
        $singleLessonPlanId = $data['single_lesson_plan_id'] ?? null;

        if ($lessonPlanId && $singleLessonPlanId) {
            throw ValidationException::withMessages([
                'lesson_plan_id' => 'Choose either a recurring or single lesson occurrence.',
            ]);
        }

        $student = $singleLessonPlanId
            ? SingleLessonPlan::with('student')->findOrFail($singleLessonPlanId)->student
            : LessonPlan::with('student')->findOrFail($lessonPlanId)->student;

        if ($student->payment_exempt) {
            throw ValidationException::withMessages([
                'date' => 'Payment is not required for this student.',
            ]);
        }

        $occurrence = [
            'lesson_plan_id' => $lessonPlanId,
            'single_lesson_plan_id' => $singleLessonPlanId,
            'scheduled_date' => $singleLessonPlanId
                ? Carbon::parse($data['date'])->toDateString()
                : Carbon::parse($data['scheduled_date'])->toDateString(),
            'scheduled_start_time' => $data['scheduled_start_time'],
        ];

        $earlyPayment = $singleLessonPlanId
            ? EarlyPayment::updateOrCreate(['single_lesson_plan_id' => $singleLessonPlanId], $occurrence)
            : EarlyPayment::updateOrCreate($occurrence);

        return response()->json([
            'status' => 'early-payment',
            'early_payment_id' => $earlyPayment->id,
        ]);
    }
}
