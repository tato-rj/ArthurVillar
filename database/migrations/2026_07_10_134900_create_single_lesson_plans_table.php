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
        Schema::create('single_lesson_plans', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('location_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->date('scheduled_date');
            $table->char('start_time', 5);
            $table->unsignedSmallInteger('duration_minutes');

            $table->decimal('fee_amount', 8, 2)->nullable();
            $table->string('payment_method')->nullable();
            $table->string('meeting_url', 2048)->nullable();
            $table->string('notes_url', 2048)->nullable();

            $table->string('status')->default('active');
            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index(['scheduled_date', 'start_time']);
            $table->index(['student_id', 'scheduled_date']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('single_lesson_plans');
    }
};
