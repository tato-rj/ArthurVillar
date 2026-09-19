<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('football_events', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('api_fixture_id')->unique();
            $table->dateTime('starts_at');
            $table->string('status')->nullable();
            $table->unsignedBigInteger('home_team_id');
            $table->string('home_team_name');
            $table->text('home_team_logo')->nullable();
            $table->unsignedBigInteger('away_team_id');
            $table->string('away_team_name');
            $table->text('away_team_logo')->nullable();
            $table->unsignedBigInteger('league_id')->nullable();
            $table->string('league_name')->nullable();
            $table->string('league_round')->nullable();
            $table->string('venue_name')->nullable();
            $table->string('venue_city')->nullable();
            $table->dateTime('synced_at')->nullable();
            $table->timestamps();

            $table->index('starts_at');
            $table->index(['home_team_id', 'starts_at']);
            $table->index(['away_team_id', 'starts_at']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('football_events');
    }
};
