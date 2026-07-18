<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class Expense extends BaseModel
{
    public const RECURRENCES = [
        'weekly' => 'Weekly',
        'monthly' => 'Monthly',
    ];

    protected $dates = [
        'starts_on',
        'ends_on',
    ];

    protected $casts = [
        'amount' => 'integer',
    ];

    public function amountForInput()
    {
        if (! $this->amount) {
            return null;
        }

        $dollars = $this->amount / 100;

        return floor($dollars) == $dollars
            ? (string) (int) $dollars
            : number_format($dollars, 2, '.', '');
    }

    public function getRecurrenceLabelAttribute()
    {
        return static::RECURRENCES[$this->recurrence] ?? 'One-time';
    }

    public function scopeActiveDuring($query, $startsOn, $endsOn)
    {
        return $query
            ->where(function ($query) use ($endsOn) {
                $query
                    ->whereNull('starts_on')
                    ->orWhereDate('starts_on', '<=', $endsOn);
            })
            ->where(function ($query) use ($startsOn) {
                $query
                    ->whereNull('ends_on')
                    ->orWhereDate('ends_on', '>=', $startsOn);
            });
    }
}
