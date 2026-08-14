<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;
use Carbon\Carbon;
use InvalidArgumentException;

class SingleLessonPlan extends BaseModel
{
    protected $dates = [
        'scheduled_date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function earlyPayments()
    {
        return $this->hasMany(EarlyPayment::class);
    }

    public function scopeUpcoming($query)
    {
        return $query->whereDate('scheduled_date', '>=', now());
    }

    public function isUpcoming()
    {
        return $this->scheduled_date >= now();
    }

    public function associatedLessons()
    {
        $date = $this->scheduled_date->toDateString();
        $startTime = $this->start_time;

        return Lesson::query()
            ->whereNull('lesson_plan_id')
            ->where('student_id', $this->student_id)
            ->where(function ($query) use ($date, $startTime) {
                $query
                    ->where(function ($query) use ($date, $startTime) {
                        $query
                            ->whereDate('scheduled_date', $date)
                            ->where('scheduled_start_time', $startTime);
                    })
                    ->orWhere(function ($query) use ($date, $startTime) {
                        $query
                            ->whereNull('scheduled_date')
                            ->whereNull('scheduled_start_time')
                            ->whereDate('starts_at', $date)
                            ->whereTime('starts_at', $startTime);
                    });
            });
    }

    public function netFeeAmount()
    {
        return $this->location
            ? $this->location->netAmount($this->fee_amount)
            : $this->fee_amount;
    }

    public function startTime()
    {
        return Carbon::createFromFormat('H:i', $this->start_time);
    }

    public function endTime()
    {
        return $this->startTime()->addMinutes($this->duration_minutes);
    }

    public function reschedule(array $attributes)
    {
        $date = Carbon::parse($attributes['date'])->toDateString();
        $startTime = LessonPlan::normalizeTime($attributes['start_time']);
        $duration = $this->minutesBetween($startTime, $attributes['end_time']);

        $this->guardAgainstSameSchedule($date, $startTime);

        $newStartsAt = Carbon::createFromFormat('Y-m-d H:i', $date.' '.$startTime);

        $this->associatedLessons()->update([
            'starts_at' => $newStartsAt,
            'ends_at' => $newStartsAt->copy()->addMinutes($duration),
            'scheduled_date' => $date,
            'scheduled_start_time' => $startTime,
        ]);

        $this->earlyPayments()->update([
            'scheduled_date' => $date,
            'scheduled_start_time' => $startTime,
        ]);

        $this->update([
            'scheduled_date' => $date,
            'start_time' => $startTime,
            'duration_minutes' => $duration,
        ]);

        return $this->fresh();
    }

    public function scopeScheduledBetween($query, $startDate, $endDate)
    {
        return $query
            ->whereDate('scheduled_date', '>=', $startDate)
            ->whereDate('scheduled_date', '<=', $endDate);
    }

    public function getStartTimeAttribute($value)
    {
        return $value ? LessonPlan::normalizeTime($value) : null;
    }

    public function setStartTimeAttribute($value)
    {
        $this->attributes['start_time'] = LessonPlan::normalizeTime($value);
    }

    private function guardAgainstSameSchedule($date, $startTime)
    {
        $currentDate = $this->scheduled_date
            ? $this->scheduled_date->toDateString()
            : null;

        if ($currentDate === $date && $this->start_time === $startTime) {
            throw new InvalidArgumentException('The lesson is already scheduled for that time.');
        }
    }

    private function minutesBetween($startTime, $endTime)
    {
        $start = Carbon::createFromFormat('H:i', LessonPlan::normalizeTime($startTime));
        $end = Carbon::createFromFormat('H:i', LessonPlan::normalizeTime($endTime));
        $minutes = $start->diffInMinutes($end, false);

        if ($minutes < 15 || $minutes % 15 !== 0) {
            throw new InvalidArgumentException('The rescheduled lesson must be at least 15 minutes and stay on 15-minute intervals.');
        }

        return $minutes;
    }
}
