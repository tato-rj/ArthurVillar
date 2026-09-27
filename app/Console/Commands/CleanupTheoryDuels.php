<?php

namespace App\Console\Commands;

use App\Theory\Duels\DuelService;
use Illuminate\Console\Command;

class CleanupTheoryDuels extends Command
{
    protected $signature = 'theory:cleanup-duels';

    protected $description = 'Expire abandoned Duels and release their join codes';

    public function handle(DuelService $duels): int
    {
        $this->info('Closed '.$duels->cleanup().' abandoned or expired Duels.');

        return self::SUCCESS;
    }
}
