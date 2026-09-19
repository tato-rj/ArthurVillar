<?php

namespace App\Models\External;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SchedulerVote extends Model
{
    use HasFactory;

    public const YES = 'yes';

    public const MAYBE = 'maybe';

    protected $guarded = [];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(SchedulerParticipant::class, 'scheduler_participant_id');
    }

    public function option(): BelongsTo
    {
        return $this->belongsTo(SchedulerOption::class, 'scheduler_option_id');
    }
}
