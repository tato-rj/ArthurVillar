<?php

namespace App\Http\Controllers\Calendar;

use App\Models\Calendar\Lesson;
use App\Models\Calendar\LessonPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PaymentsController extends Controller
{
    public function store(Request $request, Lesson $lesson)
    {
        DB::transaction(function () use ($lesson) {
            if ($lesson->lesson_plan_id) {
                LessonPlan::query()->lockForUpdate()->find($lesson->lesson_plan_id);
                $lesson->refresh();
            }

            $lesson->pay();
        });

        return response()->json([
            'status' => $lesson->paymentStatus(),
            'fee_amount' => $lesson->fee_amount,
            'payment_exempt' => (bool) $lesson->student?->payment_exempt,
        ]);
    }
}
