<?php

namespace App\Models;

class Location extends BaseModel
{
    protected $casts = [
        'fee_amount' => 'integer',
        'tax_withheld_percentage' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function lessonPlans()
    {
        return $this->hasMany(LessonPlan::class);
    }

    public function singleLessonPlans()
    {
        return $this->hasMany(SingleLessonPlan::class);
    }

    public function teachingBreaks()
    {
        return $this->belongsToMany(TeachingBreak::class)->withTimestamps();
    }

    public function netAmount($amount)
    {
        if (! $amount) {
            return $amount;
        }

        $withheld = max(0, min(100, (float) $this->tax_withheld_percentage));

        return (int) round($amount * ((100 - $withheld) / 100));
    }

    public function feeAmountForInput()
    {
        return $this->fee_amount ? ($this->fee_amount / 100) : null;
    }
}
