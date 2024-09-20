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
        Schema::create('recordings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('composer')->nullable();
            $table->string('artist')->nullable();
            $table->string('description')->nullable();
            $table->string('composed_in')->nullable();
            $table->string('source_url')->nullable();
            $table->unsignedInteger('listen_count')->default(0);
            $table->unsignedInteger('duration')->nullable();
            $table->unsignedInteger('size')->nullable();
            $table->string('cover_path')->nullable();
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
        Schema::dropIfExists('recordings');
    }
};
