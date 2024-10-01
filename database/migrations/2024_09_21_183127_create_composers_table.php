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
        Schema::create('composers', function (Blueprint $table) {
            $table->id();
            $table->string('period_id');
            $table->string('country_id');
            $table->string('name');
            $table->string('cover_path')->nullable();
            $table->text('biography');
            $table->text('curiosity')->nullable();
            $table->string('born_in');
            $table->string('died_in');
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
        Schema::dropIfExists('composers');
    }
};
