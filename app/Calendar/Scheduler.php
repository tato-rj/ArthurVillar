<?php

namespace App\Calendar;

use Carbon\Carbon;
use App\Models\LessonPlan;
use Illuminate\Http\Request;
use App\Calendar\Traits\Holidays;

class Scheduler
{
    use Holidays;
    
    private const VIEWS = ['schedule', 'day', '3-days', 'week', 'month', 'year'];

    public function payload(Request $request)
    {
        $range = $this->range($request);

        return [
            'plannedLessons' => $this->plannedLessons($range),
            'holidays' => $this->holidays($range),
            'calendarRange' => $range,
        ];
    }

    public function plannedLessons(array $range)
    {
        $lessonPlans = LessonPlan::with([
            'student',
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

        return $lessonPlans->map(function (LessonPlan $lessonPlan) use ($range) {
            return array_merge($lessonPlan->toArray(), [
                'occurrences' => $this->occurrences($lessonPlan, $range),
            ]);
        })->values();
    }

    private function occurrences(LessonPlan $lessonPlan, array $range)
    {
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

            if ($overridesByOriginal->has($occurrenceKey) || ($scheduledLesson && ! $this->lessonStartsOnOccurrence($scheduledLesson, $occurrence, $lessonPlan->start_time))) {
                $occurrence->addDays($intervalDays);

                continue;
            }

            $lesson = $scheduledLesson ?: $this->lessonForOccurrence($lessonPlan, $occurrence, $lessonPlan->start_time);

            $occurrences[] = [
                'date' => $occurrence->toDateString(),
                'start' => $lessonPlan->start_time,
                'end' => LessonPlan::addMinutesToTime($lessonPlan->start_time, $lessonPlan->duration_minutes),
                'original_date' => $occurrence->toDateString(),
                'original_start_time' => $lessonPlan->start_time,
                'lesson_id' => $lesson ? $lesson->id : null,
                'lesson_status' => $lesson ? $lesson->paymentStatus() : 'unconfirmed',
                'fee_amount' => $lesson && $lesson->fee_amount ? $lesson->fee_amount : $lessonPlan->fee_amount,
                'canceled_by' => $lesson ? $lesson->canceled_by : '',
                'lesson_edit_url' => $lesson ? route('studio.lessons.edit', $lesson) : '',
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

                $occurrences[] = [
                    'date' => $override->new_date,
                    'start' => $override->new_start_time,
                    'end' => LessonPlan::addMinutesToTime($override->new_start_time, $override->duration_minutes),
                    'original_date' => $override->original_date,
                    'original_start_time' => $override->original_start_time,
                    'schedule_override_id' => $override->id,
                    'lesson_id' => $lesson ? $lesson->id : null,
                    'lesson_status' => $lesson ? $lesson->paymentStatus() : 'unconfirmed',
                    'fee_amount' => $lesson && $lesson->fee_amount ? $lesson->fee_amount : $lessonPlan->fee_amount,
                    'canceled_by' => $lesson ? $lesson->canceled_by : '',
                    'calendar_status' => 'rescheduled',
                    'lesson_edit_url' => $lesson ? route('studio.lessons.edit', $lesson) : '',
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
                    'fee_amount' => $lesson->fee_amount ?: ($lesson->lessonPlan ? $lesson->lessonPlan->fee_amount : null),
                    'canceled_by' => $lesson->canceled_by,
                    'lesson_edit_url' => route('studio.lessons.edit', $lesson),
                    'lesson_payment_url' => $lesson->paymentUrl,
                ];
            });

        return $occurrences;
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
        return Carbon::parse($date)->toDateString() . ' ' . LessonPlan::normalizeTime($startTime);
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

    private function nthWeekdayOfMonth(int $year, int $month, int $weekday, int $nth)
    {
        $date = Carbon::create($year, $month, 1)->startOfDay();

        while ($date->dayOfWeek !== $weekday) {
            $date->addDay();
        }

        return $date->addWeeks($nth - 1);
    }

    private function lastWeekdayOfMonth(int $year, int $month, int $weekday)
    {
        $date = Carbon::create($year, $month, 1)->endOfMonth()->startOfDay();

        while ($date->dayOfWeek !== $weekday) {
            $date->subDay();
        }

        return $date;
    }

    private function observedDate(Carbon $date)
    {
        if ($date->isSaturday()) {
            return $date->copy()->subDay();
        }

        if ($date->isSunday()) {
            return $date->copy()->addDay();
        }

        return $date->copy();
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
        } elseif ($view === '3-days') {
            $start = $date->copy();
            $end = $date->copy()->addDays(2);
        } elseif ($view === 'schedule') {
            $start = $date->copy()->startOfMonth()->subMonth();
            $end = $date->copy()->startOfMonth()->addMonths(4)->endOfMonth();
        } elseif ($view === 'month') {
            $start = $date->copy()->startOfMonth()->startOfWeek(Carbon::SUNDAY);
            $end = $start->copy()->addDays(41);
        } elseif ($view === 'year') {
            $start = $date->copy()->startOfYear();
            $end = $date->copy()->endOfYear();
        } else {
            $start = $date->copy()->startOfWeek(Carbon::SUNDAY);
            $end = $start->copy()->addDays(6);
        }

        return $this->rangePayload($view, $date, $start, $end);
    }

    public function view(Request $request)
    {
        $view = $request->query('view', 'week');

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
