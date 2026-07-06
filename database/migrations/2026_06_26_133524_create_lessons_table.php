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
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('lesson_plan_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->date('scheduled_date')->nullable();
            $table->char('scheduled_start_time', 5)->nullable();

            $table->dateTime('starts_at');
            $table->dateTime('ends_at');

            $table->decimal('fee_amount', 8, 2)->nullable();

            $table->timestamp('paid_at')->nullable();

            $table->string('payment_method')->nullable();
            $table->string('canceled_by')->nullable();
            $table->timestamp('canceled_at')->nullable();

            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['lesson_plan_id', 'scheduled_date', 'scheduled_start_time'], 'lessons_scheduled_occurrence_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
};
