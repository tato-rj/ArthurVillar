<?php

namespace App\Http\Controllers\Studio;

use App\Models\{Lesson, LessonPlan, Student};
use App\Models\ScheduleOverride;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;

class LessonsController extends Controller
{
    public function index()
    {
        return view('studio.lessons.index');
    }

    public function student(Student $student)
    {
        $student->load('lessonPlans.location');

        return view('studio.lessons.student', compact('student'));
    }

    public function store(Request $request)
    {
        $lesson = $this->lessonFromRequest($request);

        return response()->json([
            'lesson_id' => $lesson['model']->id,
            'status' => $lesson['model']->paymentStatus(),
            'edit_url' => route('studio.lessons.edit', $lesson['model']),
            'payment_url' => $lesson['model']->paymentUrl,
            'schedule_override_deleted' => $lesson['schedule_override_deleted'],
        ]);
    }

    public function cancel(Request $request)
    {
        $data = $request->validate([
            'canceled_by' => ['required', Rule::in(['teacher', 'student'])],
        ]);

        $lesson = $this->lessonFromRequest($request);

        $lesson['model']->cancel($data['canceled_by']);

        $payload = [
            'lesson_id' => $lesson['model']->id,
            'status' => $lesson['model']->paymentStatus(),
            'canceled_by' => $lesson['model']->canceled_by,
            'edit_url' => route('studio.lessons.edit', $lesson['model']),
            'payment_url' => $lesson['model']->paymentUrl,
            'schedule_override_deleted' => $lesson['schedule_override_deleted'],
        ];

        if ($request->wantsJson()) {
            return response()->json($payload);
        }

        return back()->with('success', 'The lesson was successfully canceled');
    }

    public function revert(Request $request)
    {
        $data = $request->validate([
            'lesson_id' => ['nullable', 'exists:lessons,id'],
            'schedule_override_id' => ['nullable', 'exists:schedule_overrides,id'],
        ]);

        abort_if(empty($data['lesson_id']) && empty($data['schedule_override_id']), 422, 'There is no lesson action to revert.');

        $payload = [
            'status' => 'unconfirmed',
            'canceled_by' => '',
            'lesson_id' => $data['lesson_id'] ?? '',
            'schedule_override_deleted' => false,
            'lesson_reverted' => false,
            'lesson_deleted' => false,
        ];

        if (! empty($data['schedule_override_id'])) {
            $payload['schedule_override_deleted'] = ScheduleOverride::whereKey($data['schedule_override_id'])->delete() > 0;
        }

        if (! empty($data['lesson_id'])) {
            $lesson = Lesson::findOrFail($data['lesson_id']);

            if ($lesson->canceled_at || ! $lesson->paid_at) {
                $lesson->delete();

                $payload['lesson_reverted'] = true;
                $payload['lesson_deleted'] = true;
                $payload['lesson_id'] = '';
                $payload['status'] = 'unconfirmed';
                $payload['canceled_by'] = '';
                $payload['edit_url'] = '';
                $payload['payment_url'] = '';
            } else {
                $lesson->update([
                    'paid_at' => null,
                    'payment_method' => null,
                    'fee_amount' => $lesson->lessonPlan ? $lesson->lessonPlan->netFeeAmount() : $lesson->fee_amount,
                ]);

                $payload['lesson_reverted'] = true;
                $payload['status'] = $lesson->fresh()->paymentStatus();
                $payload['canceled_by'] = '';
                $payload['edit_url'] = route('studio.lessons.edit', $lesson);
                $payload['payment_url'] = $lesson->paymentUrl;
            }
        }

        return response()->json($payload);
    }

    private function lessonFromRequest(Request $request)
    {
        $data = $request->validate([
            'lesson_plan_id' => ['required', 'exists:lesson_plans,id'],
            'date' => ['required', 'date_format:Y-m-d'],
            'start' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'end' => ['nullable', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'scheduled_date' => ['nullable', 'date_format:Y-m-d'],
            'scheduled_start_time' => ['nullable', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'schedule_override_id' => ['nullable', 'exists:schedule_overrides,id'],
        ]);

        $lessonPlan = LessonPlan::findOrFail($data['lesson_plan_id']);
        $startsAt = Carbon::createFromFormat('Y-m-d H:i', $data['date'].' '.$data['start']);
        $endsAt = $data['end']
            ? Carbon::createFromFormat('Y-m-d H:i', $data['date'].' '.$data['end'])
            : $startsAt->copy()->addMinutes($lessonPlan->duration_minutes);
        $scheduledDate = $data['scheduled_date'] ?? $data['date'];
        $scheduledStartTime = $data['scheduled_start_time'] ?? $data['start'];

        $lesson = Lesson::firstOrCreate([
            'lesson_plan_id' => $lessonPlan->id,
            'starts_at' => $startsAt,
        ], [
            'student_id' => $lessonPlan->student->id,
            'scheduled_date' => $scheduledDate,
            'scheduled_start_time' => $scheduledStartTime,
            'ends_at' => $endsAt,
            'fee_amount' => $lessonPlan->netFeeAmount(),
        ]);

        if (! $lesson->scheduled_date || ! $lesson->scheduled_start_time) {
            $lesson->update([
                'scheduled_date' => $scheduledDate,
                'scheduled_start_time' => $scheduledStartTime,
            ]);
        }

        $scheduleOverrideDeleted = false;

        if (! empty($data['schedule_override_id'])) {
            $scheduleOverrideDeleted = ScheduleOverride::where('lesson_plan_id', $lessonPlan->id)
                ->whereKey($data['schedule_override_id'])
                ->delete() > 0;
        }

        return [
            'model' => $lesson,
            'schedule_override_deleted' => $scheduleOverrideDeleted,
        ];
    }

    public function edit(Lesson $lesson)
    {
        return $lesson;
    }
}
