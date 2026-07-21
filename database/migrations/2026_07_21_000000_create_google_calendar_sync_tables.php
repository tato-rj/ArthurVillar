<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('google_calendar_connections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('calendar_id')->default('primary');
            $table->string('calendar_name')->nullable();
            $table->string('calendar_timezone')->nullable();
            $table->text('access_token');
            $table->text('refresh_token')->nullable();
            $table->timestamp('token_expires_at')->nullable();
            $table->text('sync_token')->nullable();
            $table->timestamp('last_synced_at')->nullable();
            $table->text('last_error')->nullable();
            $table->timestamps();
        });

        Schema::create('google_calendar_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('google_calendar_connection_id')
                ->constrained('google_calendar_connections')
                ->cascadeOnDelete();
            $table->string('google_event_id');
            $table->string('recurring_event_id')->nullable();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            $table->text('html_link')->nullable();
            $table->text('meeting_url')->nullable();
            $table->string('response_status')->nullable();
            $table->boolean('all_day')->default(false);
            $table->dateTime('starts_at')->nullable();
            $table->dateTime('ends_at')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('organizer_name')->nullable();
            $table->string('organizer_email')->nullable();
            $table->json('attendees')->nullable();
            $table->dateTime('google_updated_at')->nullable();
            $table->timestamps();

            $table->unique(
                ['google_calendar_connection_id', 'google_event_id'],
                'google_calendar_events_connection_event_unique'
            );
            $table->index(['start_date', 'end_date']);
            $table->index(['starts_at', 'ends_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('google_calendar_events');
        Schema::dropIfExists('google_calendar_connections');
    }
};
