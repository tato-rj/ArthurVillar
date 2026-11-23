<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hidden_google_calendar_events', function (Blueprint $table) {
            $table->foreignId('google_calendar_connection_id')
                ->constrained('google_calendar_connections', indexName: 'hidden_google_events_connection_fk')->cascadeOnDelete();
            // Google's series ID for recurring events, or the event ID for a single event.
            $table->string('google_event_id');
            $table->primary(['google_calendar_connection_id', 'google_event_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hidden_google_calendar_events');
    }
};
