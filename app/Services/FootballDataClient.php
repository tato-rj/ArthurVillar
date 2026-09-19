<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class FootballDataClient
{
    public function isConfigured(): bool
    {
        return filled(config('services.football_data.token'));
    }

    public function upcomingFixtures(): array
    {
        $from = now('UTC')->startOfDay();
        $to = $from->copy()->endOfYear();
        $competition = config('calendar.football.competition', 'BSA');

        $response = Http::baseUrl(rtrim(config('services.football_data.base_url'), '/'))
            ->acceptJson()
            ->withHeaders(['X-Auth-Token' => config('services.football_data.token')])
            ->retry(2, 500)
            ->timeout(20)
            ->get('competitions/'.rawurlencode($competition).'/matches', [
                'dateFrom' => $from->toDateString(),
                'dateTo' => $to->toDateString(),
            ])
            ->throw()
            ->json();

        return $response['matches'] ?? [];
    }
}
