<?php

namespace App\Console\Commands;

use App\Services\FootballApiClient;
use App\Services\FootballEventSync;
use Illuminate\Console\Command;
use Throwable;

class SyncFootballEvents extends Command
{
    protected $signature = 'calendar:sync-football';

    protected $description = 'Import upcoming Fluminense and Brazil football fixtures';

    public function handle(FootballApiClient $client, FootballEventSync $sync): int
    {
        if (! $client->isConfigured()) {
            $this->warn('API-Football is not configured; set API_FOOTBALL_KEY to enable syncing.');

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
