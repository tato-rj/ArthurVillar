<?php

namespace App\Console\Commands;

use App\Services\FootballDataClient;
use App\Services\FootballEventSync;
use Illuminate\Console\Command;
use Throwable;

class SyncFootballEvents extends Command
{
    protected $signature = 'calendar:sync-football';

    protected $description = 'Import upcoming Fluminense Serie A fixtures';

    public function handle(FootballDataClient $client, FootballEventSync $sync): int
    {
        if (! $client->isConfigured()) {
            $this->warn('football-data.org is not configured; set FOOTBALL_DATA_API_TOKEN to enable syncing.');

            return self::SUCCESS;
        }

        try {
            $count = $sync->sync();
            $this->info("Synced {$count} upcoming football fixtures.");

            return self::SUCCESS;
        } catch (Throwable $exception) {
            report($exception);
            $this->error('Unable to sync football fixtures: '.$exception->getMessage());

            return self::FAILURE;
        }
    }
}
