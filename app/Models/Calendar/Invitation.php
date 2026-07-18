<?php

namespace App\Models\Calendar;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class Invitation extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function booted(): void
    {
        static::creating(function (Invitation $invitation) {
            $invitation->public_id ??= (string) Str::uuid();
        });
    }

    public function options(): HasMany
    {
        return $this->hasMany(InvitationOption::class);
    }

    public function participants(): HasMany
    {
        return $this->hasMany(InvitationParticipant::class);
    }

    public function publicUrl(): string
    {
        return URL::temporarySignedRoute(
            'calendar.invitations.public',
            now()->addDays(30),
            ['invitation' => $this->public_id]
        );
    }
}
