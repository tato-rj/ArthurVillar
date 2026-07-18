<?php

namespace App\Models\Calendar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvitationVote extends Model
{
    use HasFactory;

    public const YES = 'yes';

    public const MAYBE = 'maybe';

    protected $guarded = [];

    public function participant(): BelongsTo
    {
        return $this->belongsTo(InvitationParticipant::class, 'invitation_participant_id');
    }

    public function option(): BelongsTo
    {
        return $this->belongsTo(InvitationOption::class, 'invitation_option_id');
    }
}
