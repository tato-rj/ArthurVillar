<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('theory_duel_archives', function (Blueprint $table) {
            $table->uuid('id')->primary();
            // History survives deletion of the live room; each row can be deleted in Admin.
            $table->uuid('duel_id')->index();
            $table->string('game', 40);
            $table->string('status', 24);
            $table->string('seed', 32);
            $table->timestamp('played_at', 3)->index();
            $table->json('snapshot');
            $table->timestamps();
            $table->unique(['duel_id', 'seed']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('theory_duel_archives');
    }
};
