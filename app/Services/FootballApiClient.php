<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class FootballApiClient
{
    public function isConfigured(): bool
    {
        return filled(config('services.api_football.key'));
    }

    public function upcomingFixtures(int $teamId): array
    {
        $response = Http::baseUrl(rtrim(config('services.api_football.base_url'), '/'))
            ->acceptJson()
            ->withHeaders(['x-apisports-key' => config('services.api_football.key')])
            ->retry(2, 500)
            ->timeout(20)
            ->get('fixtures', [
                'team' => $teamId,
                'next' => config('calendar.football.fixtures_per_team', 50),
                'timezone' => 'UTC',
            ])
            ->throw()
            ->json();

        $errors = $response['errors'] ?? [];

        if (! empty($errors)) {
            throw new RuntimeException('API-Football rejected the fixtures request: '.json_encode($errors));
        }

        return $response['response'] ?? [];
    }
}
