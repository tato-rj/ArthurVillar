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
        Schema::create('teaching_breaks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('reason')->nullable();
            $table->date('starts_on');
            $table->date('ends_on');
            $table->timestamps();

            $table->index(['starts_on', 'ends_on']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('teaching_breaks');
    }
};
