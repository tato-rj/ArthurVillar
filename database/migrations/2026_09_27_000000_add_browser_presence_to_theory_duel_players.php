<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('theory_duel_players', function (Blueprint $table) {
            $table->string('connection_id', 32)->nullable();
            $table->timestamp('departed_at')->nullable()->index();
        });
    }

    public function down(): void
    {
        Schema::table('theory_duel_players', function (Blueprint $table) {
            $table->dropIndex(['departed_at']);
            $table->dropColumn(['connection_id', 'departed_at']);
        });
    }
};
