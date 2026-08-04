<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConflictException extends BaseModel
{
    protected $table = 'calendar_conflict_exceptions';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function normalizedPair(string $firstEventKey, string $secondEventKey): array
    {
        $pair = [$firstEventKey, $secondEventKey];
        sort($pair, SORT_STRING);

        return $pair;
    }
}
