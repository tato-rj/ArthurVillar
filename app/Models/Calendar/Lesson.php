<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class Lesson extends BaseModel
{
    protected $dates = [
        'canceled_at',
        'paid_at',
        'starts_at',
        'ends_at',
        'scheduled_date',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function lessonPlan()
    {
        return $this->belongsTo(LessonPlan::class);
    }

    public function paymentStatus()
    {
        if ($this->canceled_at) {
            return 'canceled';
        }

        return $this->paid_at ? 'paid' : 'unpaid';
    }

    public function cancel($canceledBy)
    {
        return $this->update([
            'canceled_by' => $canceledBy,
            'canceled_at' => now(),
        ]);
    }

    public function pay()
    {
        return $this->update([
            'canceled_by' => null,
            'canceled_at' => null,
            'paid_at' => now(),
            'payment_method' => $this->lessonPlan ? $this->lessonPlan->payment_method : $this->payment_method,
            'fee_amount' => $this->lessonPlan ? $this->lessonPlan->netFeeAmount() : $this->fee_amount,
        ]);
    }

    public function getPaymentUrlAttribute()
    {
        return route('calendar.lessons.payment.store', $this);
    }

    public function scopeUnpaid($query)
    {
        return $query->whereNull('paid_at');
    }

    public function scopePaid($query)
    {
        return $query->whereNotNull('paid_at');
    }

    public function scopeStartingBetween($query, $startDate, $endDate)
    {
        return $query
            ->whereDate('starts_at', '>=', $startDate)
            ->whereDate('starts_at', '<=', $endDate);
    }

    public function scopeRelevantBetween($query, $startDate, $endDate)
    {
        return $query->where(function ($query) use ($startDate, $endDate) {
            $query
                ->where(function ($query) use ($startDate, $endDate) {
                    $query
                        ->whereDate('starts_at', '>=', $startDate)
                        ->whereDate('starts_at', '<=', $endDate);
                })
                ->orWhere(function ($query) use ($startDate, $endDate) {
                    $query
                        ->whereDate('scheduled_date', '>=', $startDate)
                        ->whereDate('scheduled_date', '<=', $endDate);
                });
        });
    }

    public function getScheduledStartTimeAttribute($value)
    {
        return $value ? LessonPlan::normalizeTime($value) : null;
    }

    public function setScheduledStartTimeAttribute($value)
    {
        $this->attributes['scheduled_start_time'] = $value ? LessonPlan::normalizeTime($value) : null;
    }
}
