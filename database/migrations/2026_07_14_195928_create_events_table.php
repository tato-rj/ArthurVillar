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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->date('scheduled_date');
            $table->time('starts_at');
            $table->time('ends_at');
            $table->text('notes')->nullable();
            $table->foreignId('notification_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->unsignedSmallInteger('notification_minutes_before')->nullable();
            $table->timestamp('notification_sent_at')->nullable();
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
        Schema::dropIfExists('events');
    }
};
