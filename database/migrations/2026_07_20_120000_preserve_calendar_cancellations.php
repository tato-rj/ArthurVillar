<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('lesson_plans', function (Blueprint $table) {
            $table->date('canceled_from')->nullable()->after('ends_on');
            $table->timestamp('canceled_at')->nullable()->after('canceled_from');
        });

        Schema::table('events', function (Blueprint $table) {
            $table->timestamp('canceled_at')->nullable()->after('notification_sent_at');
        });
    }

    public function down()
    {
        Schema::table('lesson_plans', function (Blueprint $table) {
            $table->dropColumn(['canceled_from', 'canceled_at']);
        });

        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('canceled_at');
        });
    }
};
