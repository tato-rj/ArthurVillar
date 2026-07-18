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
