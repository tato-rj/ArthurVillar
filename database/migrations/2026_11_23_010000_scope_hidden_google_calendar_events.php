<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('hidden_google_calendar_events', function (Blueprint $table) {
            $table->string('series_id')->nullable();
            $table->dateTime('starts_at_utc')->nullable();
            $table->date('all_day_from')->nullable();
        });
    }

    public function down(): void
    {
        // Older clients can represent only single events and entire series.
        DB::table('hidden_google_calendar_events')->whereNotNull('starts_at_utc')->delete();
        Schema::table('hidden_google_calendar_events', function (Blueprint $table) {
            $table->dropColumn(['series_id', 'starts_at_utc', 'all_day_from']);
        });
    }
};
