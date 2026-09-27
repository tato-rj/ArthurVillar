<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('theory_duels', function (Blueprint $table) {
            $table->string('left_by', 5)->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('theory_duels', function (Blueprint $table) {
            $table->dropColumn('left_by');
        });
    }
};
