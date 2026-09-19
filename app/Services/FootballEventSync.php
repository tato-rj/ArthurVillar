<?php

namespace App\Services;

use App\Models\Calendar\FootballEvent;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class FootballEventSync
{
    public function __construct(private FootballApiClient $client)
    {
    }

    public function sync(): int
    {
        $fixtures = collect(config('calendar.football.teams', []))
            ->filter(fn ($team) => ! empty($team['id']))
            ->flatMap(fn ($team) => $this->client->upcomingFixtures((int) $team['id']))
            ->filter(fn ($fixture) => filled(Arr::get($fixture, 'fixture.id')))
            ->unique(fn ($fixture) => (string) Arr::get($fixture, 'fixture.id'))
            ->values();

        DB::transaction(function () use ($fixtures) {
            $fixtureIds = $fixtures
                ->map(fn ($fixture) => (int) Arr::get($fixture, 'fixture.id'))
                ->all();

            $staleEvents = FootballEvent::query();

            if ($fixtureIds) {
                $staleEvents->whereNotIn('api_fixture_id', $fixtureIds);
            }

            $staleEvents->delete();

            $fixtures->each(function (array $fixture) {
                $attributes = $this->attributes($fixture);

                FootballEvent::query()->updateOrCreate(
                    ['api_fixture_id' => $attributes['api_fixture_id']],
                    $attributes
                );
            });
        });

        return $fixtures->count();
    }

    private function attributes(array $fixture): array
    {
        return [
            'api_fixture_id' => (int) Arr::get($fixture, 'fixture.id'),
            'starts_at' => Carbon::parse(Arr::get($fixture, 'fixture.date'))->utc(),
            'status' => Arr::get($fixture, 'fixture.status.short'),
            'home_team_id' => (int) Arr::get($fixture, 'teams.home.id'),
            'home_team_name' => Arr::get($fixture, 'teams.home.name', 'Home team'),
            'home_team_logo' => Arr::get($fixture, 'teams.home.logo'),
            'away_team_id' => (int) Arr::get($fixture, 'teams.away.id'),
            'away_team_name' => Arr::get($fixture, 'teams.away.name', 'Away team'),
            'away_team_logo' => Arr::get($fixture, 'teams.away.logo'),
            'league_id' => Arr::get($fixture, 'league.id'),
            'league_name' => Arr::get($fixture, 'league.name'),
            'league_round' => Arr::get($fixture, 'league.round'),
            'venue_name' => Arr::get($fixture, 'fixture.venue.name'),
            'venue_city' => Arr::get($fixture, 'fixture.venue.city'),
            'synced_at' => now(),
        ];
    }
}
