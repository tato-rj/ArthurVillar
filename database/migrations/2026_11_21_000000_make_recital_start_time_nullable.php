<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('recitals', function (Blueprint $table) {
            $table->time('start_time')->nullable()->change();
        });
    }

    public function down(): void
    {
        // Restore the original form's default for recitals saved without a time.
        DB::table('recitals')->whereNull('start_time')->update(['start_time' => '07:00']);

        Schema::table('recitals', function (Blueprint $table) {
            $table->time('start_time')->nullable(false)->change();
        });
    }
};
