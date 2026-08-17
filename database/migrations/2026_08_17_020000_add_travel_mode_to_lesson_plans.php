<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('lesson_plans', function (Blueprint $table) {
            $table->string('travel_mode', 16)->default('TRANSIT');
        });

        Schema::table('single_lesson_plans', function (Blueprint $table) {
            $table->string('travel_mode', 16)->default('TRANSIT');
        });
    }

    public function down()
    {
        Schema::table('lesson_plans', fn (Blueprint $table) => $table->dropColumn('travel_mode'));
        Schema::table('single_lesson_plans', fn (Blueprint $table) => $table->dropColumn('travel_mode'));
    }
};
