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
        Schema::create('tracks', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('book_id');
            $table->string('name');
            $table->string('composer')->nullable();
            $table->unsignedInteger('order')->nullable();
            $table->unsignedInteger('listen_count')->default(0);
            $table->unsignedInteger('duration')->nullable();
            $table->unsignedInteger('size')->nullable();
            $table->string('audio_path')->nullable();
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
        Schema::dropIfExists('tracks');
    }
};
