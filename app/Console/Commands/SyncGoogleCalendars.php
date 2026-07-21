<?php

namespace App\Console\Commands;

use App\Models\Calendar\GoogleCalendarConnection;
use App\Services\GoogleCalendarSync;
use Illuminate\Console\Command;
use Throwable;

class SyncGoogleCalendars extends Command
{
    protected $signature = 'calendar:sync-google';

    protected $description = 'Import changes from connected Google calendars';

    public function handle(GoogleCalendarSync $sync): int
    {
        $failed = false;

        GoogleCalendarConnection::query()->each(function (GoogleCalendarConnection $connection) use ($sync, &$failed) {
            try {
                $changes = $sync->sync($connection);
                $this->line("Synced {$connection->calendar_name}: {$changes} changes.");
            } catch (Throwable $exception) {
                $failed = true;
                report($exception);
                $this->error("Unable to sync {$connection->calendar_name}: {$exception->getMessage()}");
            }
        });

        return $failed ? self::FAILURE : self::SUCCESS;
    }
}
