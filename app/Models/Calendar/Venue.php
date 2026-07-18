<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class Venue extends BaseModel
{
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
}
