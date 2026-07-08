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
        Schema::create('lesson_plans', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->unsignedTinyInteger('weekday');
            // 1 = Sunday, 2 = Monday, 3 = Tuesday, etc. 0 is reserved for empty request options.

            $table->char('start_time', 5);

            $table->unsignedSmallInteger('duration_minutes');

            $table->unsignedSmallInteger('recurrence_interval')->default(1);
            // 1 = every week
            // 2 = every other week

            $table->date('starts_on')->nullable();
            $table->date('ends_on')->nullable();

            $table->decimal('fee_amount', 8, 2)->nullable();
            $table->string('payment_method')->nullable();

            $table->foreignId('location_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('status')->default('active');
            // active, paused, canceled

            $table->text('notes')->nullable();

            $table->timestamps();

            $table->index(['student_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lesson_plans');
    }
};
