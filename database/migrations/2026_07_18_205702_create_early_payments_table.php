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
        Schema::create('early_payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lesson_plan_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('single_lesson_plan_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();

            $table->date('scheduled_date');
            $table->char('scheduled_start_time', 5);
            $table->timestamps();

            $table->unique(
                ['lesson_plan_id', 'scheduled_date', 'scheduled_start_time'],
                'early_payments_lesson_occurrence_unique'
            );
            $table->unique('single_lesson_plan_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('early_payments');
    }
};
