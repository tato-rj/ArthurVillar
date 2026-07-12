<?php

namespace App\Models;

class Expense extends BaseModel
{
    public const RECURRENCES = [
        'weekly' => 'Weekly',
        'monthly' => 'Monthly',
    ];

    protected $dates = [
        'spent_on',
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
}
