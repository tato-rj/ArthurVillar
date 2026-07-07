<?php

namespace App\Models;

use Carbon\Carbon;
use InvalidArgumentException;

class LessonPlan extends BaseModel
{
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

    protected $appends = ['recurrence', 'weekdayName'];

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
        return is_null($this->ends_on) || $this->ends_on->gt(now());
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
