<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\EarlyPayment;
use App\Models\Calendar\Lesson;
use App\Models\Calendar\LessonPlan;
use App\Models\Calendar\ScheduleOverride;
use App\Models\Calendar\SingleLessonPlan;
use App\Models\Calendar\Student;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class LessonsController extends Controller
{
    public function index()
    {
        return view('calendar.lessons.index');
    }

    public function student(Student $student)
    {
        $student->load('lessonPlans.location');

        return view('calendar.lessons.student', compact('student'));
    }

    public function store(Request $request)
    {
        $result = DB::transaction(function () use ($request) {
            $lesson = $this->lessonFromRequest($request);
            $earlyPayment = EarlyPayment::query()
                ->forOccurrence(
                    $request->input('lesson_plan_id'),
                    $request->input('single_lesson_plan_id'),
                    $request->input('scheduled_date', $request->input('date')),
                    $request->input('scheduled_start_time', $request->input('start'))
                )
                ->lockForUpdate()
                ->first();

            if ($earlyPayment) {
                $lesson['model']->pay();
                $earlyPayment->delete();
            }

            return [
                'lesson' => $lesson,
                'early_payment_consumed' => (bool) $earlyPayment,
            ];
        });

        $lesson = $result['lesson'];

        return response()->json([
            'lesson_id' => $lesson['model']->id,
            'status' => $lesson['model']->paymentStatus(),
            'edit_url' => route('calendar.lessons.edit', $lesson['model']),
            'payment_url' => $lesson['model']->paymentUrl,
            'schedule_override_deleted' => $lesson['schedule_override_deleted'],
            'early_payment_id' => '',
            'early_payment_consumed' => $result['early_payment_consumed'],
        ]);
    }

    public function cancel(Request $request)
    {
        $request->merge([
            'cancelation_type' => $request->input('cancelation_type', 'current'),
        ]);

        if ($request->filled('single_lesson_plan_id')) {
            $data = $request->validate([
                'single_lesson_plan_id' => ['required', 'exists:single_lesson_plans,id'],
            ]);

            SingleLessonPlan::whereKey($data['single_lesson_plan_id'])->delete();

            if ($request->wantsJson()) {
                return response()->json([
                    'single_lesson_plan_deleted' => true,
                ]);
            }

            return back()->with('success', 'The single lesson was successfully canceled');
        }

        $data = $request->validate([
            'lesson_plan_id' => ['required', 'exists:lesson_plans,id'],
            'date' => ['required', 'date_format:Y-m-d'],
            'scheduled_date' => ['nullable', 'date_format:Y-m-d'],
            'cancelation_type' => ['required', Rule::in(['current', 'future', 'all'])],
            'canceled_by' => ['required_if:cancelation_type,current', 'nullable', Rule::in(['teacher', 'student'])],
        ]);

        if ($data['cancelation_type'] === 'future') {
            $lessonPlan = LessonPlan::findOrFail($data['lesson_plan_id']);
            $cancelFrom = $data['scheduled_date'] ?? $data['date'];

            DB::transaction(function () use ($lessonPlan, $cancelFrom) {
                $lessonPlan->endBeforeOccurrence($cancelFrom);
            });

            if ($request->wantsJson()) {
                return response()->json([
                    'lesson_plan_id' => $lessonPlan->id,
                    'lesson_plan_ended' => true,
                ]);
            }

            return back()->with('success', 'This and all following lessons were successfully canceled');
        }

        if ($data['cancelation_type'] === 'all') {
            LessonPlan::whereKey($data['lesson_plan_id'])->delete();

            if ($request->wantsJson()) {
                return response()->json([
                    'lesson_plan_id' => $data['lesson_plan_id'],
                    'lesson_plan_deleted' => true,
                ]);
            }

            return back()->with('success', 'All lessons in this plan were successfully canceled');
        }

        $lesson = $this->lessonFromRequest($request);

        $lesson['model']->cancel($data['canceled_by']);

        $payload = [
            'lesson_id' => $lesson['model']->id,
            'status' => $lesson['model']->paymentStatus(),
            'canceled_by' => $lesson['model']->canceled_by,
            'edit_url' => route('calendar.lessons.edit', $lesson['model']),
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
            'early_payment_id' => ['nullable', 'exists:early_payments,id'],
        ]);

        abort_if(
            empty($data['lesson_id']) && empty($data['schedule_override_id']) && empty($data['early_payment_id']),
            422,
            'There is no lesson action to revert.'
        );

        $payload = [
            'status' => 'unconfirmed',
            'canceled_by' => '',
            'lesson_id' => $data['lesson_id'] ?? '',
            'schedule_override_deleted' => false,
            'lesson_reverted' => false,
            'lesson_deleted' => false,
            'early_payment_id' => $data['early_payment_id'] ?? '',
            'early_payment_deleted' => false,
        ];

        if (! empty($data['early_payment_id'])) {
            $payload['early_payment_deleted'] = EarlyPayment::whereKey($data['early_payment_id'])->delete() > 0;
            $payload['early_payment_id'] = '';

            return response()->json($payload);
        }

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
                $payload['edit_url'] = route('calendar.lessons.edit', $lesson);
                $payload['payment_url'] = $lesson->paymentUrl;
            }
        }

        return response()->json($payload);
    }

    private function lessonFromRequest(Request $request)
    {
        $data = $request->validate([
            'lesson_plan_id' => ['nullable', 'required_without:single_lesson_plan_id', 'exists:lesson_plans,id'],
            'single_lesson_plan_id' => ['nullable', 'required_without:lesson_plan_id', 'exists:single_lesson_plans,id'],
            'date' => ['required', 'date_format:Y-m-d'],
            'start' => ['required', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'end' => ['nullable', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'scheduled_date' => ['nullable', 'date_format:Y-m-d'],
            'scheduled_start_time' => ['nullable', 'date_format:H:i', Rule::in(LessonPlan::timeOptions())],
            'schedule_override_id' => ['nullable', 'exists:schedule_overrides,id'],
        ]);

        if (! empty($data['single_lesson_plan_id'])) {
            return $this->singleLessonFromRequest($data);
        }

        return $this->recurringLessonFromRequest($data);
    }

    private function recurringLessonFromRequest(array $data)
    {
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

    private function singleLessonFromRequest(array $data)
    {
        $singleLessonPlan = SingleLessonPlan::with(['student', 'location'])->findOrFail($data['single_lesson_plan_id']);
        $startsAt = Carbon::createFromFormat('Y-m-d H:i', $data['date'].' '.$data['start']);
        $endsAt = $data['end']
            ? Carbon::createFromFormat('Y-m-d H:i', $data['date'].' '.$data['end'])
            : $startsAt->copy()->addMinutes($singleLessonPlan->duration_minutes);
        $scheduledDate = $data['scheduled_date'] ?? $singleLessonPlan->scheduled_date->toDateString();
        $scheduledStartTime = $data['scheduled_start_time'] ?? $singleLessonPlan->start_time;

        $lesson = Lesson::firstOrCreate([
            'lesson_plan_id' => null,
            'student_id' => $singleLessonPlan->student_id,
            'starts_at' => $startsAt,
        ], [
            'scheduled_date' => $scheduledDate,
            'scheduled_start_time' => $scheduledStartTime,
            'ends_at' => $endsAt,
            'fee_amount' => $singleLessonPlan->netFeeAmount(),
            'payment_method' => $singleLessonPlan->payment_method,
            'notes' => $singleLessonPlan->notes,
        ]);

        if (! $lesson->scheduled_date || ! $lesson->scheduled_start_time) {
            $lesson->update([
                'scheduled_date' => $scheduledDate,
                'scheduled_start_time' => $scheduledStartTime,
            ]);
        }

        return [
            'model' => $lesson,
            'schedule_override_deleted' => false,
        ];
    }

    public function edit(Lesson $lesson)
    {
        return $lesson;
    }
}
