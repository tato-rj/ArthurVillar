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
        Schema::create('schedule_overrides', function (Blueprint $table) {
            $table->id();

            $table->foreignId('lesson_plan_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->date('original_date');
            $table->char('original_start_time', 5);

            $table->date('new_date');
            $table->char('new_start_time', 5);
            $table->unsignedSmallInteger('duration_minutes');

            $table->string('type')->default('reschedule');

            $table->timestamps();

            $table->unique(['lesson_plan_id', 'original_date', 'original_start_time'], 'schedule_overrides_original_unique');
            $table->index(['new_date']);
            $table->index(['original_date']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule_overrides');
    }
};
