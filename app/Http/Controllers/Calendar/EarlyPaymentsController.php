<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\EarlyPayment;
use App\Models\Calendar\LessonPlan;
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
            'date' => ['required', 'date_format:Y-m-d', 'after:today'],
            'scheduled_date' => ['required', 'date_format:Y-m-d'],
            'scheduled_start_time' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
        ]);

        $lessonPlanId = $data['lesson_plan_id'] ?? null;
        $singleLessonPlanId = $data['single_lesson_plan_id'] ?? null;

        if ($lessonPlanId && $singleLessonPlanId) {
            throw ValidationException::withMessages([
                'lesson_plan_id' => 'Choose either a recurring or single lesson occurrence.',
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
