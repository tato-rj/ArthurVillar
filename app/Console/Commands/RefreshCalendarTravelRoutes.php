<?php

namespace App\Console\Commands;

use App\Models\Calendar\TravelRoute;
use App\Services\CalendarTravelRoutes;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;

class RefreshCalendarTravelRoutes extends Command
{
    protected $signature = 'calendar:refresh-travel-routes';

    protected $description = 'Refresh cached travel routes for events approaching within two hours';

    public function handle(CalendarTravelRoutes $travelRoutes): int
    {
        if (! Schema::hasTable('travel_routes')) {
            $this->info('Travel routes table is not available yet.');

            return self::SUCCESS;
        }

        $now = now();
        $through = $now->copy()->addMinutes((int) config('calendar.google_routes.approaching_window_minutes', 120));
        $staleBefore = now()->subMinutes((int) config('calendar.google_routes.approaching_refresh_minutes', 10));
        $refreshed = 0;

        TravelRoute::query()
            ->whereBetween('arrival_at', [$now, $through])
            ->where('refreshed_at', '<=', $staleBefore)
            ->orderBy('id')
            ->chunkById(50, function ($routes) use ($travelRoutes, &$refreshed) {
                foreach ($routes as $route) {
                    if ($travelRoutes->refresh($route)) {
                        $refreshed++;
                    }
                }
            });

        $this->info("Refreshed {$refreshed} travel route(s).");

        return self::SUCCESS;
    }
}
