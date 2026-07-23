<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class Location extends BaseModel
{
    public const USAGE_TEACHING = 'teaching';
    public const USAGE_RECITAL = 'recital';

    protected $casts = [
        'fee_amount' => 'integer',
        'tax_withheld_percentage' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public static function usages()
    {
        return [
            self::USAGE_TEACHING,
            self::USAGE_RECITAL,
        ];
    }

    public function scopeTeaching($query)
    {
        return $query->where('usage', self::USAGE_TEACHING);
    }

    public function scopeRecital($query)
    {
        return $query->where('usage', self::USAGE_RECITAL);
    }

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

    public function recitals()
    {
        return $this->hasMany(Recital::class);
    }

    public function getFullAddressAttribute()
    {
        return collect([
            $this->address,
            collect([$this->city, $this->state])->filter()->implode(', '),
            $this->postal_code,
        ])->filter()->implode(', ');
    }

    public function getMapUrlAttribute()
    {
        return $this->full_address
            ? 'https://www.google.com/maps/search/?api=1&query='.urlencode($this->full_address)
            : null;
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
