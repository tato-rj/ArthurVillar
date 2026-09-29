<?php

namespace App\Games;

use Illuminate\Support\Facades\DB;

class MicrophoneSettings
{
    public const DEFAULT_SENSITIVITY = 65;
    public const DEFAULT_SETTLE_MS = 700;
    public static function current(): array
    {
        $saved = DB::table('microphone_settings')->where('id', 1)->first();

        return [
            'sensitivity' => (int) ($saved->sensitivity ?? self::DEFAULT_SENSITIVITY),
            'settleMs' => (int) ($saved->settle_ms ?? self::DEFAULT_SETTLE_MS),
        ];
    }

    public static function save(array $settings): void
    {
        DB::table('microphone_settings')->updateOrInsert(
            ['id' => 1],
            ['sensitivity' => $settings['sensitivity'], 'settle_ms' => $settings['settleMs']]
        );
    }
}
