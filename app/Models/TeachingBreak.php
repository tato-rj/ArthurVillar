<?php

namespace App\Models;

class TeachingBreak extends BaseModel
{
    protected $dates = [
        'starts_on',
        'ends_on',
    ];

    public function scopeOverlapping($query, $startsOn, $endsOn)
    {
        return $query
            ->whereDate('starts_on', '<=', $endsOn)
            ->whereDate('ends_on', '>=', $startsOn);
    }
}
