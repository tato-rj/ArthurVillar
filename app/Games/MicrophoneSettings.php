<?php

namespace App\Games;

use App\Models\User;

class MicrophoneSettings
{
    public const DEFAULT_SENSITIVITY = 65;
    public const DEFAULT_SETTLE_MS = 700;

    public static function forUser(?User $user): array
    {
        $saved = $user?->microphone_settings ?? [];

        return [
            'sensitivity' => (int) ($saved['sensitivity'] ?? self::DEFAULT_SENSITIVITY),
            'settleMs' => (int) ($saved['settleMs'] ?? self::DEFAULT_SETTLE_MS),
        ];
    }
}
