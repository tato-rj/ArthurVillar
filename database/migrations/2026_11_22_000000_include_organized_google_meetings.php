<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('google_calendar_events', function (Blueprint $table) {
            $table->boolean('organizer_is_self')->default(false);
        });

        // Google's incremental feed skips unchanged meetings the previous importer excluded.
        DB::table('google_calendar_connections')->update(['sync_token' => null]);
    }

    public function down(): void
    {
        DB::table('google_calendar_events')->where('organizer_is_self', true)->delete();
        Schema::table('google_calendar_events', function (Blueprint $table) {
            $table->dropColumn('organizer_is_self');
        });
    }
};
