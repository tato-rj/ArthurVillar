<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('travel_routes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('event_key');
            $table->text('origin_address');
            $table->string('origin_label')->nullable();
            $table->text('destination_address');
            $table->string('destination_label')->nullable();
            $table->string('request_signature', 64);
            $table->string('travel_mode', 20);
            $table->unsignedInteger('duration_seconds')->default(0);
            $table->unsignedInteger('distance_meters')->nullable();
            $table->timestamp('departure_at')->nullable();
            $table->timestamp('arrival_at');
            $table->json('steps')->nullable();
            $table->timestamp('refreshed_at');
            $table->timestamps();

            $table->unique(['user_id', 'event_key']);
            $table->index(['arrival_at', 'refreshed_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('travel_routes');
    }
};
