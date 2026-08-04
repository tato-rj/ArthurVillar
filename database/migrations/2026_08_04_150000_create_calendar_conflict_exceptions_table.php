<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('calendar_conflict_exceptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('first_event_key');
            $table->string('second_event_key');
            $table->timestamps();

            $table->unique(
                ['user_id', 'first_event_key', 'second_event_key'],
                'calendar_conflict_exceptions_pair_unique'
            );
        });
    }

    public function down()
    {
        Schema::dropIfExists('calendar_conflict_exceptions');
    }
};
