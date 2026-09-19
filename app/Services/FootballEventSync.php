<?php

namespace App\Services;

use App\Models\Calendar\FootballEvent;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class FootballEventSync
{
    public function __construct(private FootballDataClient $client)
    {
    }

    public function sync(): int
    {
        $teamTla = strtoupper(config('calendar.football.team_tla', 'FLU'));
        $fixtures = collect($this->client->upcomingFixtures())
            ->filter(fn ($fixture) => filled(Arr::get($fixture, 'id')))
            ->filter(fn ($fixture) => $this->involvesTeam($fixture, $teamTla))
            ->unique(fn ($fixture) => (string) Arr::get($fixture, 'id'))
            ->values();

        DB::transaction(function () use ($fixtures) {
            $fixtureIds = $fixtures
                ->map(fn ($fixture) => (int) Arr::get($fixture, 'id'))
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
            'api_fixture_id' => (int) Arr::get($fixture, 'id'),
            'starts_at' => Carbon::parse(Arr::get($fixture, 'utcDate'))->utc(),
            'status' => Arr::get($fixture, 'status'),
            'home_team_id' => (int) Arr::get($fixture, 'homeTeam.id'),
            'home_team_name' => Arr::get($fixture, 'homeTeam.name', 'Home team'),
            'home_team_logo' => Arr::get($fixture, 'homeTeam.crest'),
            'away_team_id' => (int) Arr::get($fixture, 'awayTeam.id'),
            'away_team_name' => Arr::get($fixture, 'awayTeam.name', 'Away team'),
            'away_team_logo' => Arr::get($fixture, 'awayTeam.crest'),
            'league_id' => Arr::get($fixture, 'competition.id'),
            'league_name' => Arr::get($fixture, 'competition.name'),
            'league_round' => $this->roundName($fixture),
            'venue_name' => Arr::get($fixture, 'venue'),
            'venue_city' => null,
            'synced_at' => now(),
        ];
    }

    private function involvesTeam(array $fixture, string $teamTla): bool
    {
        return collect([
            Arr::get($fixture, 'homeTeam.tla'),
            Arr::get($fixture, 'awayTeam.tla'),
        ])->filter()
            ->map(fn ($tla) => strtoupper($tla))
            ->contains($teamTla);
    }

    private function roundName(array $fixture): ?string
    {
        if (filled(Arr::get($fixture, 'matchday'))) {
            return 'Matchday '.Arr::get($fixture, 'matchday');
        }

        $stage = Arr::get($fixture, 'stage');

        return filled($stage)
            ? str($stage)->replace('_', ' ')->title()->toString()
            : null;
    }
}
