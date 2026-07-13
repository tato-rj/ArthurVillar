<?php

namespace App\Models;

use Carbon\Carbon;
use InvalidArgumentException;
use App\Calendar\Traits\Holidays;

class LessonPlan extends BaseModel
{
    use Holidays;

    public const WEEKDAYS = [
        1 => 'sunday',
        2 => 'monday',
        3 => 'tuesday',
        4 => 'wednesday',
        5 => 'thursday',
        6 => 'friday',
        7 => 'saturday',
    ];

    protected $dates = [
        'starts_on', 
        'ends_on',
    ];

    protected $appends = ['recurrence', 'status', 'weekdayName'];

    protected $recurrence_labels = [
        1 => 'Every week',
        2 => 'Every other week',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function scheduleOverrides()
    {
        return $this->hasMany(ScheduleOverride::class);
    }

    public function scopeFor($query, Student $student)
    {
        $this->create([
            'student_id' => $student->id
        ]);
    }

    public function isCurrent()
    {
        return $this->status === 'active';
    }

    public function getStatusAttribute()
    {
        if (! $this->starts_on || ! $this->ends_on) {
            return 'inactive';
        }

        $today = today()->startOfDay();
        $startsOn = $this->starts_on->copy()->startOfDay();
        $endsOn = $this->ends_on->copy()->startOfDay();

        if ($startsOn->lte($today) && $endsOn->gte($today)) {
            return 'active';
        }

        if ($startsOn->lte($today)) {
            return 'inactive';
        }

        return $this->isClosestUpcomingPlan($today)
            ? 'active'
            : 'inactive';
    }

    public function setStatusAttribute($value)
    {
        unset($this->attributes['status']);
    }

    private function isClosestUpcomingPlan(Carbon $today)
    {
        if (! $this->student_id || ! $this->getKey()) {
            return false;
        }

        $hasCurrentPlan = static::query()
            ->where('student_id', $this->student_id)
            ->whereNotNull('starts_on')
            ->whereNotNull('ends_on')
            ->whereDate('starts_on', '<=', $today->toDateString())
            ->whereDate('ends_on', '>=', $today->toDateString())
            ->exists();

        if ($hasCurrentPlan) {
            return false;
        }

        $closestUpcomingPlanId = static::query()
            ->where('student_id', $this->student_id)
            ->whereNotNull('starts_on')
            ->whereNotNull('ends_on')
            ->whereDate('starts_on', '>', $today->toDateString())
            ->orderBy('starts_on')
            ->orderBy('start_time')
            ->orderBy('id')
            ->value('id');

        return (int) $closestUpcomingPlanId === (int) $this->getKey();
    }

    public function getWeekdayNameAttribute()
    {
        return static::WEEKDAYS[(int) $this->weekday] ?? null;
    }

    public function netFeeAmount()
    {
        return $this->location
            ? $this->location->netAmount($this->fee_amount)
            : $this->fee_amount;
    }

    public function projectedLessonCount()
    {
        if (! $this->starts_on || ! $this->ends_on) {
            return null;
        }

        $start = Carbon::parse($this->starts_on)->startOfDay();
        $end = Carbon::parse($this->ends_on)->startOfDay();

        if ($end->lt($start)) {
            return 0;
        }

        $excludedDates = $this->projectedLessonExcludedDates($start, $end);
        $canceledOccurrences = $this->projectedLessonCanceledOccurrences($start, $end);
        $occurrence = $start->copy()->addDays(($this->carbonWeekday() - $start->dayOfWeek + 7) % 7);
        $intervalDays = max(1, (int) $this->recurrence_interval) * 7;
        $count = 0;

        while ($occurrence->lte($end)) {
            $date = $occurrence->toDateString();
            $key = $this->projectedLessonOccurrenceKey($date, $this->start_time);

            if (! $excludedDates->has($date) && ! $canceledOccurrences->has($key)) {
                $count++;
            }

            $occurrence->addDays($intervalDays);
        }

        return $count;
    }

    public function missedLessonDates(Carbon $from = null)
    {
        if (! $this->starts_on || ! $this->ends_on) {
            return collect();
        }

        $start = Carbon::parse($this->starts_on)->startOfDay();
        $from = ($from ?: today())->copy()->startOfDay();
        $start = $start->max($from);
        $end = Carbon::parse($this->ends_on)->startOfDay();

        if ($end->lt($start)) {
            return collect();
        }

        $missedDates = collect();
        $addMissedDate = function (Carbon $date, $type, $title) use ($missedDates, $start, $end) {
            if (! $date->betweenIncluded($start, $end) || ! $this->occursOn($date)) {
                return;
            }

            $key = $date->toDateString();
            $missedDate = $missedDates->get($key, [
                'date' => $key,
                'reasons' => [],
            ]);
            $missedDate['reasons'][] = [
                'type' => $type,
                'title' => $title,
            ];
            $missedDate['reasons'] = collect($missedDate['reasons'])
                ->unique(fn ($reason) => $reason['type'].'|'.$reason['title'])
                ->values()
                ->all();

            $missedDates->put($key, $missedDate);
        };

        TeachingBreak::query()
            ->with('locations')
            ->overlapping($start->toDateString(), $end->toDateString())
            ->get()
            ->each(function (TeachingBreak $teachingBreak) use ($addMissedDate, $start, $end) {
                if (! $teachingBreak->appliesToLocation($this->location_id)) {
                    return;
                }

                $date = $teachingBreak->starts_on->copy()->max($start)->startOfDay();
                $breakEnd = $teachingBreak->ends_on->copy()->min($end)->startOfDay();

                while ($date->lte($breakEnd)) {
                    $addMissedDate($date->copy(), 'break', $teachingBreak->title);
                    $date->addDay();
                }
            });

        for ($year = $start->year - 1; $year <= $end->year + 1; $year++) {
            foreach ($this->nationalHolidays($year) as $holiday) {
                $addMissedDate($holiday['date'], 'holiday', $holiday['title']);
            }
        }

        return $missedDates->sortKeys()->values();
    }

    public function carbonWeekday()
    {
        return static::toCarbonWeekday($this->weekday);
    }

    public static function toCarbonWeekday($weekday)
    {
        return max(0, min(6, ((int) $weekday) - 1));
    }

    public static function fromCarbonWeekday($weekday)
    {
        return ((int) $weekday) + 1;
    }

    public function reschedule(array $attributes)
    {
        $originalDate = Carbon::parse($attributes['original_date'])->toDateString();
        $originalStartTime = static::normalizeTime($attributes['original_start_time'] ?? $this->start_time);
        $newDate = Carbon::parse($attributes['date'])->toDateString();
        $newStartTime = static::normalizeTime($attributes['start_time']);
        $duration = $this->minutesBetween($newStartTime, $attributes['end_time']);

        if (! $this->occursOn($originalDate)) {
            throw new InvalidArgumentException('The selected date is not an occurrence of this lesson plan.');
        }

        $this->guardAgainstSameSchedule($originalDate, $originalStartTime, $newDate, $newStartTime);

        return $this->scheduleOverrides()->updateOrCreate(
            [
                'original_date' => $originalDate,
                'original_start_time' => $originalStartTime,
            ],
            [
                'new_date' => $newDate,
                'new_start_time' => $newStartTime,
                'duration_minutes' => $duration,
                'type' => 'reschedule',
            ]
        );
    }

    public function reschedulePermanently(array $attributes)
    {
        $originalDate = Carbon::parse($attributes['original_date'])->toDateString();
        $originalStartTime = static::normalizeTime($attributes['original_start_time'] ?? $this->start_time);
        $newDate = Carbon::parse($attributes['date'])->toDateString();
        $newStartTime = static::normalizeTime($attributes['start_time']);
        $duration = $this->minutesBetween($newStartTime, $attributes['end_time']);
        $endsOn = $this->previousOccurrenceBefore($newDate);

        if (! $this->occursOn($originalDate)) {
            throw new InvalidArgumentException('The selected date is not an occurrence of this lesson plan.');
        }

        $this->guardAgainstSameSchedule($originalDate, $originalStartTime, $newDate, $newStartTime);

        $newLessonPlan = $this->replicate();

        $newLessonPlan->fill([
            'weekday' => static::fromCarbonWeekday(Carbon::parse($newDate)->dayOfWeek),
            'start_time' => $newStartTime,
            'duration_minutes' => $duration,
            'starts_on' => $newDate,
            'ends_on' => null,
        ]);

        $newLessonPlan->save();

        $this->update([
            'ends_on' => $endsOn->toDateString(),
        ]);

        $this->scheduleOverrides()->delete();

        return $newLessonPlan;
    }

    public function endBeforeOccurrence($date)
    {
        $date = Carbon::parse($date)->startOfDay();
        $endsOn = $this->previousOccurrenceBefore($date);

        $this->update([
            'ends_on' => $endsOn->toDateString(),
        ]);

        $this->scheduleOverrides()
            ->where(function ($query) use ($date) {
                $query
                    ->whereDate('original_date', '>=', $date->toDateString())
                    ->orWhereDate('new_date', '>=', $date->toDateString());
            })
            ->delete();

        return $this;
    }

    public function scopeOccurringBetween($query, $startDate, $endDate)
    {
        $start = Carbon::parse($startDate)->startOfDay();
        $end = Carbon::parse($endDate)->startOfDay();

        if ($end->lt($start)) {
            [$start, $end] = [$end, $start];
        }

        $driver = $query->getConnection()->getDriverName();

        return $query
            ->where('recurrence_interval', '>', 0)
            ->whereDate('starts_on', '<=', $end->toDateString())
            ->where(function($query) use ($start) {
                $query
                    ->whereNull('ends_on')
                    ->orWhereDate('ends_on', '>=', $start->toDateString());
            })
            ->where(function($query) use ($start, $end, $driver) {
                for ($date = $start->copy(); $date->lte($end); $date->addDay()) {
                    $dateString = $date->toDateString();
                    $weekday = static::fromCarbonWeekday($date->dayOfWeek);

                    $query->orWhere(function($query) use ($dateString, $weekday, $driver) {
                        $query
                            ->where('weekday', $weekday)
                            ->whereDate('starts_on', '<=', $dateString)
                            ->where(function($query) use ($dateString) {
                                $query
                                    ->whereNull('ends_on')
                                    ->orWhereDate('ends_on', '>=', $dateString);
                            });

                        if ($driver === 'sqlite') {
                            $query->whereRaw(
                                'CAST((julianday(?) - julianday(starts_on) - ((weekday - (CAST(strftime(\'%w\', starts_on) AS INTEGER) + 1) + 7) % 7)) AS INTEGER) >= 0',
                                [$dateString]
                            )->whereRaw(
                                'CAST((julianday(?) - julianday(starts_on) - ((weekday - (CAST(strftime(\'%w\', starts_on) AS INTEGER) + 1) + 7) % 7)) AS INTEGER) % (recurrence_interval * 7) = 0',
                                [$dateString]
                            );
                        } else {
                            $query->whereRaw(
                                'DATEDIFF(?, starts_on) - MOD(CAST(weekday AS SIGNED) - CAST(DAYOFWEEK(starts_on) AS SIGNED) + 7, 7) >= 0',
                                [$dateString]
                            )->whereRaw(
                                'MOD(DATEDIFF(?, starts_on) - MOD(CAST(weekday AS SIGNED) - CAST(DAYOFWEEK(starts_on) AS SIGNED) + 7, 7), recurrence_interval * 7) = 0',
                                [$dateString]
                            );
                        }
                    });
                }
            });
    }

    public function getStartTimeAttribute($value)
    {
        return $value ? static::normalizeTime($value) : null;
    }

    public function getRecurrenceAttribute()
    {
        return $this->recurrence_labels[$this->recurrence_interval] ?? null;
    }

    public function setStartTimeAttribute($value)
    {
        $this->attributes['start_time'] = static::normalizeTime($value);
    }

    public static function normalizeTime($value)
    {
        $value = trim((string) $value);

        if (! preg_match('/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/', $value, $matches)) {
            throw new InvalidArgumentException('Lesson times must use HH:MM.');
        }

        $hour = (int) $matches[1];
        $minute = (int) $matches[2];
        if ($hour < 0 || $hour > 23 || $minute > 59 || isset($matches[3]) || $minute % 15 !== 0) {
            throw new InvalidArgumentException('Lesson times must be on 15-minute intervals and cannot include seconds.');
        }

        return sprintf('%02d:%02d', $hour, $minute);
    }

    public static function addMinutesToTime($value, $minutes)
    {
        return Carbon::createFromFormat('H:i', static::normalizeTime($value))
            ->addMinutes($minutes)
            ->format('H:i');
    }

    public static function timeOptions()
    {
        $times = [];

        for ($minutes = 8 * 60; $minutes <= 21 * 60; $minutes += 15) {
            $times[] = sprintf('%02d:%02d', intdiv($minutes, 60), $minutes % 60);
        }

        return $times;
    }

    public static function timeLabel($value)
    {
        return Carbon::createFromFormat('H:i', static::normalizeTime($value))->format('g:i A');
    }

    public function startTime()
    {
        return Carbon::createFromFormat('H:i', $this->start_time);
    }

    public function endTime()
    {
        return $this->startTime()->addMinutes($this->duration_minutes);
    }

    public function occursOn($date)
    {
        $date = Carbon::parse($date)->startOfDay();
        $startsOn = Carbon::parse($this->starts_on)->startOfDay();
        $endsOn = $this->ends_on ? Carbon::parse($this->ends_on)->startOfDay() : null;

        if ($date->lt($startsOn) || ($endsOn && $date->gt($endsOn))) {
            return false;
        }

        $firstOccurrence = $startsOn->copy()->addDays(($this->carbonWeekday() - $startsOn->dayOfWeek + 7) % 7);

        if ($date->lt($firstOccurrence)) {
            return false;
        }

        return $firstOccurrence->diffInDays($date) % (max(1, (int) $this->recurrence_interval) * 7) === 0;
    }

    private function previousOccurrenceBefore($date)
    {
        $date = Carbon::parse($date)->startOfDay();
        $startsOn = Carbon::parse($this->starts_on)->startOfDay();
        $firstOccurrence = $startsOn->copy()->addDays(($this->carbonWeekday() - $startsOn->dayOfWeek + 7) % 7);
        $intervalDays = max(1, (int) $this->recurrence_interval) * 7;

        if ($date->lte($firstOccurrence)) {
            return $date->copy()->subDay();
        }

        $daysBeforeDate = max(0, $firstOccurrence->diffInDays($date) - 1);
        $intervalsBeforeDate = intdiv($daysBeforeDate, $intervalDays);

        return $firstOccurrence->copy()->addDays($intervalsBeforeDate * $intervalDays);
    }

    private function guardAgainstSameSchedule($originalDate, $originalStartTime, $newDate, $newStartTime)
    {
        $override = $this->scheduleOverrides()
            ->whereDate('original_date', $originalDate)
            ->where('original_start_time', $originalStartTime)
            ->first();

        $currentDate = $override
            ? Carbon::parse($override->new_date)->toDateString()
            : $originalDate;
        $currentStartTime = $override
            ? static::normalizeTime($override->new_start_time)
            : $originalStartTime;

        if ($currentDate === $newDate && $currentStartTime === $newStartTime) {
            throw new InvalidArgumentException('The lesson is already scheduled for that time.');
        }
    }

    private function projectedLessonExcludedDates(Carbon $start, Carbon $end)
    {
        $dates = collect();

        TeachingBreak::query()
            ->with('locations')
            ->overlapping($start->toDateString(), $end->toDateString())
            ->get()
            ->each(function (TeachingBreak $teachingBreak) use ($dates, $start, $end) {
                if (! $teachingBreak->appliesToLocation($this->location_id)) {
                    return;
                }

                $date = $teachingBreak->starts_on->copy()->max($start)->startOfDay();
                $breakEnd = $teachingBreak->ends_on->copy()->min($end)->startOfDay();

                while ($date->lte($breakEnd)) {
                    $dates->put($date->toDateString(), true);
                    $date->addDay();
                }
            });

        for ($year = $start->year - 1; $year <= $end->year + 1; $year++) {
            foreach ($this->nationalHolidays($year) as $holiday) {
                if ($holiday['date']->betweenIncluded($start, $end)) {
                    $dates->put($holiday['date']->toDateString(), true);
                }
            }
        }

        return $dates;
    }

    private function projectedLessonCanceledOccurrences(Carbon $start, Carbon $end)
    {
        return $this->lessons()
            ->whereNotNull('canceled_at')
            ->relevantBetween($start->toDateString(), $end->toDateString())
            ->get()
            ->mapWithKeys(function (Lesson $lesson) {
                $date = $lesson->scheduled_date
                    ? $lesson->scheduled_date->toDateString()
                    : $lesson->starts_at->toDateString();
                $startTime = $lesson->scheduled_start_time
                    ?: $lesson->starts_at->format('H:i');

                return [$this->projectedLessonOccurrenceKey($date, $startTime) => true];
            });
    }

    private function projectedLessonOccurrenceKey($date, $startTime)
    {
        return Carbon::parse($date)->toDateString().' '.static::normalizeTime($startTime);
    }

    private function minutesBetween($startTime, $endTime)
    {
        $start = Carbon::createFromFormat('H:i', static::normalizeTime($startTime));
        $end = Carbon::createFromFormat('H:i', static::normalizeTime($endTime));
        $minutes = $start->diffInMinutes($end, false);

        if ($minutes < 15 || $minutes % 15 !== 0) {
            throw new InvalidArgumentException('The rescheduled lesson must be at least 15 minutes and stay on 15-minute intervals.');
        }

        return $minutes;
    }
}
