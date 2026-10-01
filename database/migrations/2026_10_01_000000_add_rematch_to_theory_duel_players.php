<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('theory_duel_players', function (Blueprint $table) {
            $table->timestamp('rematch_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('theory_duel_players', function (Blueprint $table) {
            $table->dropColumn('rematch_at');
        });
    }
};
