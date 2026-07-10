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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('gender')->nullable();
            $table->date('date_of_birth')->nullable();

            $table->string('parent_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();

            $table->foreignId('location_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();
                
            $table->string('payment_method')->nullable();

            $table->string('status')->default('active');
            $table->boolean('is_adult')->default(false);

            $table->text('notes')->nullable();
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
        Schema::dropIfExists('students');
    }
};
