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
        Schema::create('schedulers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->uuid('public_id')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('duration_minutes');
            $table->timestamps();
        });

        Schema::create('scheduler_options', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scheduler_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->dateTime('starts_at');
            $table->timestamps();

            $table->unique(['scheduler_id', 'starts_at']);
            $table->index('starts_at');
        });

        Schema::create('scheduler_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scheduler_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('scheduler_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('scheduler_participant_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId('scheduler_option_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('status', 10);
            $table->timestamps();

            $table->unique(
                ['scheduler_participant_id', 'scheduler_option_id'],
                'scheduler_votes_participant_option_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scheduler_votes');
        Schema::dropIfExists('scheduler_participants');
        Schema::dropIfExists('scheduler_options');
        Schema::dropIfExists('schedulers');
    }
};
