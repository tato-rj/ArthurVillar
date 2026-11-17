<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;
use App\Models\Traits\NullsPaymentExemptFees;

class Lesson extends BaseModel
{
    protected $casts = [
        'canceled_at' => 'datetime',
        'paid_at' => 'datetime',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'scheduled_date' => 'datetime',
    ];
    use NullsPaymentExemptFees;



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
        return $this->update($this->paymentTerms() + [
            'canceled_by' => null,
            'canceled_at' => null,
            'paid_at' => now(),
        ]);
    }

    public function scheduleOverride(): ?ScheduleOverride
    {
        if (! $this->lessonPlan || ! $this->scheduled_date || ! $this->scheduled_start_time) {
            return null;
        }

        return $this->lessonPlan->scheduleOverrides()
            ->where('original_date', $this->scheduled_date->toDateString())
            ->where('original_start_time', $this->scheduled_start_time)
            ->first()
            ?->setRelation('lessonPlan', $this->lessonPlan);
    }

    public function paymentTerms(): array
    {
        if ($this->student?->payment_exempt) {
            return ['fee_amount' => null, 'payment_method' => null];
        }

        $override = $this->scheduleOverride();
        if ($override) {
            return ['fee_amount' => $override->netFeeAmount(), 'payment_method' => $override->lessonDetails()['payment_method']];
        }

        return [
            'fee_amount' => $this->lessonPlan ? $this->lessonPlan->netFeeAmount() : $this->fee_amount,
            'payment_method' => $this->lessonPlan ? $this->lessonPlan->payment_method : $this->payment_method,
        ];
    }

    public function getPaymentUrlAttribute()
    {
        return route('calendar.lessons.payment.store', $this);
    }

    public function scopeUnpaid($query)
    {
        return $query
            ->whereNull('paid_at')
            ->whereNull('canceled_at');
    }

    public function scopePaid($query)
    {
        return $query
            ->whereNotNull('paid_at')
            ->whereNull('canceled_at');
    }

    public function scopeCanceled($query)
    {
        return $query->whereNotNull('canceled_at');
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
