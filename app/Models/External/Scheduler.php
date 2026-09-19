<?php

namespace App\Models\External;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class Scheduler extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function booted(): void
    {
        static::creating(function (Scheduler $scheduler) {
            $scheduler->public_id ??= (string) Str::uuid();
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function options(): HasMany
    {
        return $this->hasMany(SchedulerOption::class);
    }

    public function participants(): HasMany
    {
        return $this->hasMany(SchedulerParticipant::class);
    }

    public function publicUrl(): string
    {
        return URL::temporarySignedRoute(
            'scheduler.schedulers.public',
            now()->addDays(30),
            ['scheduler' => $this->public_id]
        );
    }
}
