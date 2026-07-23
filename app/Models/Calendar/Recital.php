<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class Recital extends BaseModel
{
    protected $casts = [
        'date' => 'date',
    ];

    public function students()
    {
        return $this->belongsToMany(Student::class)->withTimestamps();
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
