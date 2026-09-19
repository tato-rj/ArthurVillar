<?php

namespace App\Models\External;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SchedulerParticipant extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scheduler(): BelongsTo
    {
        return $this->belongsTo(Scheduler::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(SchedulerVote::class);
    }
}
