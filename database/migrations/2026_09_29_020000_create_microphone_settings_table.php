<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('microphone_settings', function (Blueprint $table) {
            $table->unsignedTinyInteger('id')->primary();
            $table->unsignedTinyInteger('sensitivity');
            $table->unsignedSmallInteger('settle_ms');
        });

        $previous = DB::table('settings')
            ->whereIn('key', ['theory.microphone.sensitivity', 'theory.microphone.settle_ms'])
            ->pluck('value', 'key');

        DB::table('microphone_settings')->insert([
            'id' => 1,
            'sensitivity' => (int) ($previous['theory.microphone.sensitivity'] ?? 65),
            'settle_ms' => (int) ($previous['theory.microphone.settle_ms'] ?? 700),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('microphone_settings');
    }
};
