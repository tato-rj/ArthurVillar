<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TravelRoute extends BaseModel
{
    protected $casts = [
        'steps' => 'array',
        'departure_at' => 'datetime',
        'arrival_at' => 'datetime',
        'refreshed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
