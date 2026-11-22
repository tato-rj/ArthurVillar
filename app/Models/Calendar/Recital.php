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

    public function scopeUpcoming($query)
    {
        $now = now(config('calendar.timezone'));
        $today = $now->toDateString();

        return $query->where(function ($query) use ($today, $now) {
            $query->whereDate('recitals.date', '>', $today)
                ->orWhere(function ($query) use ($today, $now) {
                    $query->whereDate('recitals.date', $today)
                        ->where(function ($query) use ($now) {
                            $query->whereNull('recitals.start_time')
                                ->orWhere('recitals.start_time', '>', $now->toTimeString());
                        });
                });
        });
    }

    public function scopeInScheduleOrder($query)
    {
        return $query->orderBy('recitals.date')
            ->orderByRaw('CASE WHEN recitals.start_time IS NULL THEN 1 ELSE 0 END')
            ->orderBy('recitals.start_time')
            ->orderBy('recitals.id');
    }
}
