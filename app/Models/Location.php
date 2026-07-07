<?php

namespace App\Models;

class Location extends BaseModel
{
    protected $casts = [
        'tax_withheld_percentage' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function lessonPlans()
    {
        return $this->hasMany(LessonPlan::class);
    }

    public function netAmount($amount)
    {
        if (! $amount) {
            return $amount;
        }

        $withheld = max(0, min(100, (float) $this->tax_withheld_percentage));

        return (int) round($amount * ((100 - $withheld) / 100));
    }
}
