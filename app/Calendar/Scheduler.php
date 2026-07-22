<?php

namespace App\Calendar;

use App\Calendar\Traits\Holidays;
use App\Models\Calendar\EarlyPayment;
use App\Models\Calendar\Event;
use App\Models\Calendar\GoogleCalendarEvent;
use App\Models\Calendar\LessonPlan;
use App\Models\Calendar\Recital;
use App\Models\Calendar\SingleLessonPlan;
use App\Models\Calendar\Student;
use App\Models\Calendar\TeachingBreak;
use Carbon\Carbon;
use Illuminate\Http\Request;

class Scheduler
{
    use Holidays;

    private const VIEWS = ['schedule', 'day', '2-days', 'week', 'month'];

    public function payload(Request $request)
    {
        $range = $this->range($request);
        return [
            'plannedLessons' => $this->plannedLessons($range),
            'singleLessonPlans' => $this->singleLessonPlans($range),
            'holidays' => $this->holidays($range),
            'teachingBreaks' => $this->teachingBreaks($range),
            'recitals' => $this->recitals($range),
            'generalEvents' => $this->generalEvents($range, $request->user()?->id),
            'calendarRange' => $range,
        ];
    }

    public function singleLessonPlans(array $range)
    {
        return SingleLessonPlan::query()
            ->with([
                'student',
                'location',
                'earlyPayments',
                'student.lessons' => function ($query) use ($range) {
                    $query
                        ->whereNull('lesson_plan_id')
                        ->relevantBetween($range['start'], $range['end']);
                },
            ])
            ->scheduledBetween($range['start'], $range['end'])
            ->orderBy('scheduled_date')
            ->orderBy('start_time')
            ->get()
            ->map(function (SingleLessonPlan $singleLessonPlan) {
                $date = $singleLessonPlan->scheduled_date->toDateString();
                $startTime = $singleLessonPlan->start_time;
                $lesson = $singleLessonPlan->student->lessons->first(function ($lesson) use ($date, $startTime) {
                    $scheduledDate = $lesson->scheduled_date
                        ? Carbon::parse($lesson->scheduled_date)->toDateString()
                        : Carbon::parse($lesson->starts_at)->toDateString();
                    $scheduledStartTime = $lesson->scheduled_start_time
                        ? LessonPlan::normalizeTime($lesson->scheduled_start_time)
                        : Carbon::parse($lesson->starts_at)->format('H:i');

                    return $scheduledDate === $date && $scheduledStartTime === $startTime;
                });
                $earlyPayment = $lesson ? null : $singleLessonPlan->earlyPayments->first();
                $lessonStatus = $lesson
                    ? $lesson->paymentStatus()
                    : ($earlyPayment ? 'early-payment' : 'unconfirmed');

                $payload = $singleLessonPlan->toArray();
                unset($payload['early_payments']);

                return array_merge($payload, [
                    'type' => 'single-lesson-plan',
                    'occurrences' => [[
                        'date' => $date,
                        'start' => $startTime,
                        'end' => LessonPlan::addMinutesToTime($startTime, $singleLessonPlan->duration_minutes),
                        'original_date' => $date,
                        'original_start_time' => $startTime,
                        'single_lesson_plan_id' => $singleLessonPlan->id,
                        'lesson_id' => $lesson ? $lesson->id : null,
                        'lesson_status' => $lessonStatus,
                        'calendar_status' => $lessonStatus,
                        'early_payment_id' => $earlyPayment ? $earlyPayment->id : null,
                        'fee_amount' => $lesson && $lesson->fee_amount ? $lesson->fee_amount : $singleLessonPlan->netFeeAmount(),
                        'canceled_by' => $lesson ? $lesson->canceled_by : '',
                        'lesson_edit_url' => $lesson ? route('calendar.lessons.edit', $lesson) : '',
                        'lesson_payment_url' => $lesson ? $lesson->paymentUrl : '',
                        'meeting_url' => $singleLessonPlan->meeting_url,
                        'notes_url' => $singleLessonPlan->notes_url,
                    ]],
                ]);
            })
            ->values();
    }

    public function plannedLessons(array $range, bool $applyTeachingBreaks = true)
    {
        $excludedProjectedDates = $applyTeachingBreaks ? $this->excludedProjectedLessonDates($range) : $this->emptyProjectedLessonExclusions();
        $lessonPlans = LessonPlan::with([
            'student',
            'location',
            'earlyPayments',
            'lessons' => function ($query) use ($range) {
                $query->relevantBetween($range['start'], $range['end']);
            },
            'scheduleOverrides' => function ($query) use ($range) {
                $query
                    ->whereBetween('original_date', [$range['start'], $range['end']])
                    ->orWhereBetween('new_date', [$range['start'], $range['end']]);
            },
        ])
            ->where(function ($query) use ($range) {
                $query->occurringBetween($range['start'], $range['end']);
            })
            ->orWhereHas('scheduleOverrides', function ($query) use ($range) {
                $query->whereBetween('new_date', [$range['start'], $range['end']]);
            })
            ->orWhereHas('lessons', function ($query) use ($range) {
                $query->startingBetween($range['start'], $range['end']);
            })
            ->get();

        return $lessonPlans->map(function (LessonPlan $lessonPlan) use ($range, $excludedProjectedDates) {
            $occurrences = $this->occurrences($lessonPlan, $range, $excludedProjectedDates);
            $payload = $lessonPlan->toArray();
            unset($payload['early_payments']);

            return array_merge($payload, [
                'occurrences' => $occurrences,
            ]);
        })
            ->filter(fn ($lessonPlan) => count($lessonPlan['occurrences'] ?? []) > 0)
            ->values();
    }

    private function occurrences(LessonPlan $lessonPlan, array $range, $excludedProjectedDates = null)
    {
        $excludedProjectedDates = $excludedProjectedDates ?: $this->emptyProjectedLessonExclusions();
        $start = Carbon::parse($range['start'])->startOfDay();
        $end = Carbon::parse($range['end'])->startOfDay();
        $startsOn = Carbon::parse($lessonPlan->starts_on)->startOfDay();
        $endsOn = $lessonPlan->ends_on ? Carbon::parse($lessonPlan->ends_on)->startOfDay() : null;
        $firstOccurrence = $startsOn->copy()->addDays(($lessonPlan->carbonWeekday() - $startsOn->dayOfWeek + 7) % 7);
        $intervalDays = max(1, (int) $lessonPlan->recurrence_interval) * 7;
        $occurrence = $firstOccurrence->copy();
        $occurrences = [];
        $overrides = $lessonPlan->scheduleOverrides;
        $overridesByOriginal = $overrides->keyBy(function ($override) {
            return $this->occurrenceKey($override->original_date, $override->original_start_time);
        });
        $lessonsByScheduledOccurrence = $lessonPlan->lessons->keyBy(function ($lesson) {
            $date = $lesson->scheduled_date ?: Carbon::parse($lesson->starts_at)->toDateString();
            $startTime = $lesson->scheduled_start_time ?: Carbon::parse($lesson->starts_at)->format('H:i');

            return $this->occurrenceKey($date, $startTime);
        });

        if ($endsOn && $endsOn->lt($start)) {
            return $occurrences;
        }

        if ($occurrence->lt($start)) {
            $daysUntilRange = $occurrence->diffInDays($start, false);
            $intervalsToSkip = intdiv(max(0, $daysUntilRange), $intervalDays);

            $occurrence->addDays($intervalsToSkip * $intervalDays);

            while ($occurrence->lt($start)) {
                $occurrence->addDays($intervalDays);
            }
        }

        while ($occurrence->lte($end) && (! $endsOn || $occurrence->lte($endsOn))) {
            $occurrenceKey = $this->occurrenceKey($occurrence->toDateString(), $lessonPlan->start_time);
            $scheduledLesson = $lessonsByScheduledOccurrence->get($occurrenceKey);
            $isExcludedProjectedDate = $this->isExcludedProjectedLessonDate($occurrence, $lessonPlan, $excludedProjectedDates);

            if ($overridesByOriginal->has($occurrenceKey) || ($scheduledLesson && ! $this->lessonStartsOnOccurrence($scheduledLesson, $occurrence, $lessonPlan->start_time))) {
                $occurrence->addDays($intervalDays);

                continue;
            }

            $lesson = $scheduledLesson ?: $this->lessonForOccurrence($lessonPlan, $occurrence, $lessonPlan->start_time);
            $earlyPayment = $lesson ? null : $this->earlyPaymentForOccurrence(
                $lessonPlan->earlyPayments,
                $occurrence->toDateString(),
                $lessonPlan->start_time
            );
            $lessonStatus = $lesson
                ? $lesson->paymentStatus()
                : ($lessonPlan->isCanceledOn($occurrence) ? 'canceled' : ($earlyPayment ? 'early-payment' : 'unconfirmed'));

            if ($isExcludedProjectedDate && ! $lesson) {
                $occurrence->addDays($intervalDays);

                continue;
            }

            $occurrences[] = [
                'date' => $occurrence->toDateString(),
                'start' => $lessonPlan->start_time,
                'end' => LessonPlan::addMinutesToTime($lessonPlan->start_time, $lessonPlan->duration_minutes),
                'original_date' => $occurrence->toDateString(),
                'original_start_time' => $lessonPlan->start_time,
                'lesson_id' => $lesson ? $lesson->id : null,
                'lesson_status' => $lessonStatus,
                'calendar_status' => $lessonStatus,
                'early_payment_id' => $earlyPayment ? $earlyPayment->id : null,
                'fee_amount' => $lesson && $lesson->fee_amount ? $lesson->fee_amount : $lessonPlan->netFeeAmount(),
                'canceled_by' => $lesson ? $lesson->canceled_by : '',
                'lesson_edit_url' => $lesson ? route('calendar.lessons.edit', $lesson) : '',
                'lesson_payment_url' => $lesson ? $lesson->paymentUrl : '',
            ];

            $occurrence->addDays($intervalDays);
        }

        $overrides
            ->filter(function ($override) use ($start, $end) {
                return Carbon::parse($override->new_date)->betweenIncluded($start, $end);
            })
            ->each(function ($override) use (&$occurrences, $lessonPlan) {
                $occurrence = Carbon::parse($override->new_date)->startOfDay();
                $lesson = $this->lessonForOccurrence($lessonPlan, $occurrence, $override->new_start_time);
                $earlyPayment = $lesson ? null : $this->earlyPaymentForOccurrence(
                    $lessonPlan->earlyPayments,
                    $override->original_date,
                    $override->original_start_time
                );
                $lessonStatus = $lesson
                    ? $lesson->paymentStatus()
                    : ($lessonPlan->isCanceledOn($override->original_date) ? 'canceled' : ($earlyPayment ? 'early-payment' : 'unconfirmed'));

                $occurrences[] = [
                    'date' => $override->new_date,
                    'start' => $override->new_start_time,
                    'end' => LessonPlan::addMinutesToTime($override->new_start_time, $override->duration_minutes),
                    'original_date' => $override->original_date,
                    'original_start_time' => $override->original_start_time,
                    'schedule_override_id' => $override->id,
                    'lesson_id' => $lesson ? $lesson->id : null,
                    'lesson_status' => $lessonStatus,
                    'early_payment_id' => $earlyPayment ? $earlyPayment->id : null,
                    'fee_amount' => $lesson && $lesson->fee_amount ? $lesson->fee_amount : $lessonPlan->netFeeAmount(),
                    'canceled_by' => $lesson ? $lesson->canceled_by : '',
                    'calendar_status' => $lessonStatus === 'canceled'
                        ? 'canceled'
                        : ($earlyPayment ? 'early-payment' : 'rescheduled'),
                    'lesson_edit_url' => $lesson ? route('calendar.lessons.edit', $lesson) : '',
                    'lesson_payment_url' => $lesson ? $lesson->paymentUrl : '',
                ];
            });

        $lessonPlan->lessons
            ->filter(function ($lesson) use ($start, $end) {
                $lessonDate = Carbon::parse($lesson->starts_at)->startOfDay();

                return $lessonDate->betweenIncluded($start, $end)
                    && ! $this->lessonStartsOnOccurrence($lesson, Carbon::parse($lesson->scheduled_date ?: $lesson->starts_at), $lesson->scheduled_start_time ?: Carbon::parse($lesson->starts_at)->format('H:i'));
            })
            ->each(function ($lesson) use (&$occurrences) {
                $startTime = Carbon::parse($lesson->starts_at)->format('H:i');
                $endTime = Carbon::parse($lesson->ends_at)->format('H:i');

                $occurrences[] = [
                    'date' => Carbon::parse($lesson->starts_at)->toDateString(),
                    'start' => LessonPlan::normalizeTime($startTime),
                    'end' => LessonPlan::normalizeTime($endTime),
                    'original_date' => $lesson->scheduled_date ?: Carbon::parse($lesson->starts_at)->toDateString(),
                    'original_start_time' => $lesson->scheduled_start_time ?: LessonPlan::normalizeTime($startTime),
                    'lesson_id' => $lesson->id,
                    'lesson_status' => $lesson->paymentStatus(),
                    'calendar_status' => $lesson->paymentStatus(),
                    'fee_amount' => $lesson->fee_amount ?: ($lesson->lessonPlan ? $lesson->lessonPlan->fee_amount : null),
                    'canceled_by' => $lesson->canceled_by,
                    'lesson_edit_url' => route('calendar.lessons.edit', $lesson),
                    'lesson_payment_url' => $lesson->paymentUrl,
                ];
            });

        return $occurrences;
    }

    private function earlyPaymentForOccurrence($earlyPayments, $scheduledDate, $scheduledStartTime)
    {
        $date = Carbon::parse($scheduledDate)->toDateString();
        $startTime = LessonPlan::normalizeTime($scheduledStartTime);

        return $earlyPayments->first(function (EarlyPayment $earlyPayment) use ($date, $startTime) {
            return $earlyPayment->scheduled_date->toDateString() === $date
                && $earlyPayment->scheduled_start_time === $startTime;
        });
    }

    public function teachingBreaks(array $range)
    {
        return TeachingBreak::query()
            ->with('locations')
            ->overlapping($range['start'], $range['end'])
            ->orderBy('starts_on')
            ->get()
            ->map(function (TeachingBreak $teachingBreak) {
                return array_merge($teachingBreak->toArray(), [
                    'impact' => $this->breakImpact(
                        $teachingBreak->starts_on,
                        $teachingBreak->ends_on,
                        $teachingBreak->locations->pluck('id')->all()
                    ),
                    'type' => 'teaching-break',
                ]);
            })
            ->values();
    }

    public function recitals(array $range)
    {
        return Recital::query()
            ->with(['venue', 'students' => function ($query) {
                $query->orderBy('first_name')->orderBy('last_name');
            }])
            ->whereBetween('date', [$range['start'], $range['end']])
            ->orderBy('date')
            ->orderBy('start_time')
            ->get()
            ->map(function (Recital $recital) {
                return [
                    'id' => $recital->id,
                    'name' => $recital->name,
                    'date' => $recital->date->toDateString(),
                    'start_time' => $recital->start_time,
                    'venue' => $recital->venue ? [
                        'id' => $recital->venue->id,
                        'name' => $recital->venue->name,
                        'address' => $recital->venue->full_address,
                        'map_url' => $recital->venue->map_url,
                    ] : null,
                    'students' => $recital->students->map(fn (Student $student) => [
                        'id' => $student->id,
                        'name' => $student->full_name,
                    ])->values(),
                    'type' => 'recital',
                ];
            })
            ->values();
    }

    public function generalEvents(array $range, ?int $userId = null)
    {
        $localEvents = Event::query()
            ->whereBetween('scheduled_date', [$range['start'], $range['end']])
            ->orderBy('scheduled_date')
            ->orderBy('starts_at')
            ->get()
            ->map(fn (Event $event) => $event->calendarPayload());

        if (! $userId) {
            return $localEvents->values();
        }

        $timezone = config('calendar.timezone');
        $rangeStart = Carbon::parse($range['start'], $timezone)->startOfDay();
        $rangeEnd = Carbon::parse($range['end'], $timezone)->endOfDay();
        $googleEvents = GoogleCalendarEvent::query()
            ->with('calendarConnection')
            ->whereHas('calendarConnection', fn ($query) => $query->where('user_id', $userId))
            ->startingOnOrAfterSyncCutoff()
            ->withinRecurringSyncHorizon()
            ->where(function ($query) use ($range, $rangeStart, $rangeEnd) {
                $query->where(function ($allDay) use ($range) {
                    $allDay->where('all_day', true)
                        ->whereDate('start_date', '<=', $range['end'])
                        ->whereDate('end_date', '>', $range['start']);
                })->orWhere(function ($timed) use ($rangeStart, $rangeEnd) {
                    $timed->where('all_day', false)
                        ->where('starts_at', '<=', $rangeEnd->copy()->utc())
                        ->where('ends_at', '>=', $rangeStart->copy()->utc());
                });
            })
            ->get()
            ->map(fn (GoogleCalendarEvent $event) => $event->calendarPayload());

        return $localEvents
            ->concat($googleEvents)
            ->sortBy(fn ($event) => ($event['scheduled_date'] ?? '').' '.($event['starts_at'] ?? ''))
            ->values();
    }

    public function breakImpact($startsOn, $endsOn, array $locationIds = [])
    {
        $range = [
            'start' => Carbon::parse($startsOn)->toDateString(),
            'end' => Carbon::parse($endsOn)->toDateString(),
        ];
        $lessons = collect();
        $locationIds = collect($locationIds)->filter()->map(fn ($id) => (int) $id)->values();

        $this->plannedLessons($range, false)->each(function ($lessonPlan) use ($lessons, $locationIds) {
            if ($locationIds->isNotEmpty() && ! $locationIds->contains((int) ($lessonPlan['location_id'] ?? 0))) {
                return;
            }

            collect($lessonPlan['occurrences'] ?? [])->each(function ($occurrence) use ($lessonPlan, $lessons) {
                if (($occurrence['lesson_status'] ?? '') === 'canceled') {
                    return;
                }

                $lessons->push([
                    'lesson_plan_id' => $lessonPlan['id'] ?? null,
                    'student' => trim(($lessonPlan['student']['first_name'] ?? '').' '.($lessonPlan['student']['last_name'] ?? '')),
                    'date' => $occurrence['date'] ?? null,
                    'start' => $occurrence['start'] ?? null,
                    'end' => $occurrence['end'] ?? null,
                    'fee_amount' => (float) ($occurrence['fee_amount'] ?? $lessonPlan['fee_amount'] ?? 0),
                ]);
            });
        });

        return [
            'lessons_count' => $lessons->count(),
            'fee_amount' => $lessons->sum('fee_amount'),
            'lessons' => $lessons
                ->sortBy(fn ($lesson) => ($lesson['date'] ?? '').' '.($lesson['start'] ?? ''))
                ->values(),
        ];
    }

    private function excludedProjectedLessonDates(array $range)
    {
        return [
            'holidays' => $this->holidayDates($range),
            'teachingBreaks' => TeachingBreak::query()
                ->with('locations')
                ->overlapping($range['start'], $range['end'])
                ->get(),
        ];
    }

    private function emptyProjectedLessonExclusions()
    {
        return [
            'holidays' => collect(),
            'teachingBreaks' => collect(),
        ];
    }

    private function isExcludedProjectedLessonDate(Carbon $date, LessonPlan $lessonPlan, array $excludedProjectedDates)
    {
        if (($excludedProjectedDates['holidays'] ?? collect())->has($date->toDateString())) {
            return true;
        }

        return ($excludedProjectedDates['teachingBreaks'] ?? collect())->contains(function (TeachingBreak $teachingBreak) use ($date, $lessonPlan) {
            return $date->betweenIncluded($teachingBreak->starts_on, $teachingBreak->ends_on)
                && $teachingBreak->appliesToLocation($lessonPlan->location_id);
        });
    }

    private function lessonForOccurrence(LessonPlan $lessonPlan, Carbon $occurrence, $startTime)
    {
        $startMinutes = $this->timeMinutes($startTime);

        return $lessonPlan->lessons->first(function ($lesson) use ($occurrence, $startMinutes) {
            return Carbon::parse($lesson->starts_at)->toDateString() === $occurrence->toDateString()
                && $this->timeMinutes(Carbon::parse($lesson->starts_at)->format('H:i')) === $startMinutes;
        });
    }

    private function occurrenceKey($date, $startTime)
    {
        return Carbon::parse($date)->toDateString().' '.LessonPlan::normalizeTime($startTime);
    }

    private function lessonStartsOnOccurrence($lesson, Carbon $occurrence, $startTime)
    {
        return Carbon::parse($lesson->starts_at)->toDateString() === $occurrence->toDateString()
            && $this->timeMinutes(Carbon::parse($lesson->starts_at)->format('H:i')) === $this->timeMinutes($startTime);
    }

    private function timeMinutes($value)
    {
        $time = Carbon::createFromFormat('H:i', LessonPlan::normalizeTime($value));

        return ($time->hour * 60) + $time->minute;
    }

    public function holidays(array $range)
    {
        $start = Carbon::parse($range['start'])->startOfDay();
        $end = Carbon::parse($range['end'])->startOfDay();
        $holidays = collect();

        for ($year = $start->year - 1; $year <= $end->year + 1; $year++) {
            foreach ($this->nationalHolidays($year) as $holiday) {
                if (! $holiday['date']->betweenIncluded($start, $end)) {
                    continue;
                }

                $holidays->push([
                    'date' => $holiday['date']->toDateString(),
                    'title' => $holiday['title'],
                    'type' => 'holiday',
                ]);
            }
        }

        return $holidays
            ->unique(fn ($holiday) => $holiday['date'].' '.$holiday['title'])
            ->sortBy('date')
            ->values();
    }

    private function holidayDates(array $range)
    {
        return $this->holidays($range)
            ->mapWithKeys(fn ($holiday) => [$holiday['date'] => true]);
    }

    public function range(Request $request)
    {
        $explicitRange = $this->explicitRange($request);

        if ($explicitRange) {
            return $explicitRange;
        }

        $view = $this->view($request);
        $date = $this->date($request);

        if ($view === 'day') {
            $start = $date->copy();
            $end = $date->copy();
        } elseif ($view === '2-days') {
            $start = $date->copy();
            $end = $date->copy()->addDay();
        } elseif ($view === 'schedule') {
            $start = $date->copy()->startOfMonth()->subMonth();
            $end = $date->copy()->startOfMonth()->addMonths(4)->endOfMonth();
        } elseif ($view === 'month') {
            $start = $date->copy()->startOfMonth()->startOfWeek(Carbon::SUNDAY);
            $end = $start->copy()->addDays(41);
        } else {
            $start = $date->copy()->startOfWeek(Carbon::SUNDAY);
            $end = $start->copy()->addDays(6);
        }

        return $this->rangePayload($view, $date, $start, $end);
    }

    public function view(Request $request)
    {
        $view = $request->query('view', 'week');

        if ($view === '3-days') {
            return '2-days';
        }

        return in_array($view, self::VIEWS, true) ? $view : 'week';
    }

    private function explicitRange(Request $request)
    {
        $start = $this->parseDate($request->query('range_start'));
        $end = $this->parseDate($request->query('range_end'));

        if (! $start || ! $end) {
            return null;
        }

        if ($end->lt($start)) {
            [$start, $end] = [$end, $start];
        }

        return $this->rangePayload($this->view($request), $this->date($request), $start, $end);
    }

    private function date(Request $request)
    {
        return $this->parseDate($request->query('date')) ?? today();
    }

    private function rangePayload($view, Carbon $date, Carbon $start, Carbon $end)
    {
        return [
            'view' => $view,
            'date' => $date->toDateString(),
            'start' => $start->toDateString(),
            'end' => $end->toDateString(),
        ];
    }

    private function parseDate($value)
    {
        if (! is_string($value) || ! preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
            return null;
        }

        try {
            $date = Carbon::createFromFormat('Y-m-d', $value)->startOfDay();
        } catch (\Exception $e) {
            return null;
        }

        $errors = Carbon::getLastErrors();

        if ($errors !== false && ($errors['warning_count'] > 0 || $errors['error_count'] > 0)) {
            return null;
        }

        return $date->toDateString() === $value ? $date : null;
    }
}
