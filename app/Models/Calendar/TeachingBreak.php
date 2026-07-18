<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class TeachingBreak extends BaseModel
{
    protected $dates = [
        'starts_on',
        'ends_on',
    ];

    public function locations()
    {
        return $this->belongsToMany(Location::class)->withTimestamps();
    }

    public function scopeOverlapping($query, $startsOn, $endsOn)
    {
        return $query
            ->whereDate('starts_on', '<=', $endsOn)
            ->whereDate('ends_on', '>=', $startsOn);
    }

    public function appliesToLocation($locationId)
    {
        if ($this->relationLoaded('locations')) {
            return $this->locations->isEmpty()
                || $this->locations->contains('id', (int) $locationId);
        }

        return ! $this->locations()->exists()
            || $this->locations()->whereKey($locationId)->exists();
    }
}
