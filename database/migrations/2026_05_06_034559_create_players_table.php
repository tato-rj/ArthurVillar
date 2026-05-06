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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('game');
            $table->string('username');
            $table->unsignedInteger('score');
            $table->unsignedInteger('rounds');
            $table->unsignedInteger('duration');
            $table->decimal('accuracy', 5, 2)->unsigned();
            $table->unsignedInteger('finalScore');
            $table->string('avatar_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('players');
    }
};
