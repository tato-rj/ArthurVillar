<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('theory_duels', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->char('code', 4);
            // NULL releases a code without losing the historical room code.
            $table->char('join_code', 4)->nullable()->unique();
            $table->string('game', 40);
            $table->json('settings');
            $table->string('seed', 32);
            $table->string('status', 24)->index();
            $table->unsignedInteger('revision')->default(0);
            $table->timestamp('starts_at', 3)->nullable();
            $table->timestamp('expires_at')->index();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
        });
        Schema::create('theory_duel_players', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('duel_id')->constrained('theory_duels')->cascadeOnDelete();
            $table->string('role', 5);
            $table->char('token_hash', 64);
            $table->timestamp('ready_at')->nullable();
            $table->unsignedSmallInteger('progress')->default(0);
            $table->unsignedInteger('score')->default(0);
            $table->unsignedInteger('sequence')->default(0);
            $table->json('result')->nullable();
            $table->json('checkpoint')->nullable();
            $table->timestamp('finished_at', 3)->nullable();
            $table->timestamp('last_seen_at')->nullable();
            $table->timestamps();
            $table->unique(['duel_id', 'role']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('theory_duel_players');
        Schema::dropIfExists('theory_duels');
    }
};
