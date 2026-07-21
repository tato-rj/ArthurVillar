<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('google_calendar_connections', function (Blueprint $table) {
            $table->text('profile_picture_url')->nullable()->after('calendar_timezone');
        });
    }

    public function down()
    {
        Schema::table('google_calendar_connections', function (Blueprint $table) {
            $table->dropColumn('profile_picture_url');
        });
    }
};
