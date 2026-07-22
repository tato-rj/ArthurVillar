<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('google_calendar_connections', function (Blueprint $table) {
            $table->unique(
                ['user_id', 'calendar_id'],
                'google_calendar_connections_user_calendar_unique'
            );
        });

        Schema::table('google_calendar_connections', function (Blueprint $table) {
            $table->dropUnique('google_calendar_connections_user_id_unique');
        });
    }

    public function down()
    {
        $duplicateConnectionIds = DB::table('google_calendar_connections')
            ->orderBy('id')
            ->get(['id', 'user_id'])
            ->groupBy('user_id')
            ->flatMap(fn ($connections) => $connections->skip(1)->pluck('id'))
            ->values();

        if ($duplicateConnectionIds->isNotEmpty()) {
            DB::table('google_calendar_connections')
                ->whereIn('id', $duplicateConnectionIds)
                ->delete();
        }

        Schema::table('google_calendar_connections', function (Blueprint $table) {
            $table->unique('user_id');
        });

        Schema::table('google_calendar_connections', function (Blueprint $table) {
            $table->dropUnique('google_calendar_connections_user_calendar_unique');
        });
    }
};
