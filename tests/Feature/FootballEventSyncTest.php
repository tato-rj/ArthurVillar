<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Calendar\FootballEvent;
use App\Services\FootballEventSync;
use Carbon\Carbon;
use Illuminate\Http\Client\Request;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Tests\BaseTest;

class FootballEventSyncTest extends BaseTest
{
    public function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow('2026-09-18 12:00:00');

        config([
            'services.football_data.token' => 'football-data-token',
            'services.football_data.base_url' => 'https://api.football-data.org/v4',
            'calendar.football.competition' => 'BSA',
            'calendar.football.team_tla' => 'FLU',
            'calendar.timezone' => 'America/New_York',
        ]);
    }

    public function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    /** @test */
    public function it_imports_upcoming_fluminense_serie_a_fixtures()
    {
        Http::fake([
            'https://api.football-data.org/v4/*' => Http::response([
                'matches' => [
                    $this->fixture(9001, '2026-09-20T22:30:00Z', 124, 'Fluminense FC', 'FLU', 127, 'CR Flamengo', 'FLA'),
                    $this->fixture(9002, '2026-09-24T00:00:00Z', 131, 'SC Corinthians Paulista', 'COR', 124, 'Fluminense FC', 'FLU'),
                    $this->fixture(9003, '2026-09-27T19:00:00Z', 133, 'SE Palmeiras', 'PAL', 134, 'Santos FC', 'SAN'),
                ],
            ]),
        ]);

        $this->assertSame(2, app(FootballEventSync::class)->sync());
        $this->assertDatabaseHas('football_events', [
            'api_fixture_id' => 9001,
            'home_team_name' => 'Fluminense FC',
            'away_team_name' => 'CR Flamengo',
            'league_name' => 'Campeonato Brasileiro Série A',
            'league_round' => 'Matchday 25',
        ]);
        $this->assertDatabaseHas('football_events', [
            'api_fixture_id' => 9002,
            'home_team_name' => 'SC Corinthians Paulista',
            'away_team_name' => 'Fluminense FC',
        ]);
        $this->assertDatabaseMissing('football_events', ['api_fixture_id' => 9003]);

        Http::assertSent(function (Request $request) {
            parse_str(parse_url($request->url(), PHP_URL_QUERY), $query);

            return $request->hasHeader('X-Auth-Token', 'football-data-token')
                && parse_url($request->url(), PHP_URL_PATH) === '/v4/competitions/BSA/matches'
                && ($query['dateFrom'] ?? null) === '2026-09-18'
                && ($query['dateTo'] ?? null) === '2026-12-31';
        });
        Http::assertSentCount(1);
    }

    /** @test */
    public function the_calendar_payload_renders_football_in_local_time_and_ignores_conflicts()
    {
        FootballEvent::create([
            'api_fixture_id' => 9001,
            'starts_at' => '2026-09-20 22:30:00',
            'status' => 'TIMED',
            'home_team_id' => 124,
            'home_team_name' => 'Fluminense',
            'away_team_id' => 127,
            'away_team_name' => 'Flamengo',
            'league_id' => 2013,
            'league_name' => 'Campeonato Brasileiro Série A',
            'league_round' => 'Matchday 25',
            'venue_name' => 'Maracana',
            'venue_city' => 'Rio de Janeiro',
        ]);

        $events = app(Scheduler::class)->generalEvents([
            'start' => '2026-09-20',
            'end' => '2026-09-20',
        ]);
        $event = $events->firstWhere('external_provider', 'football');

        $this->assertNotNull($event);
        $this->assertSame('Fluminense vs Flamengo', $event['name']);
        $this->assertSame('18:30', $event['starts_at']);
        $this->assertSame('20:30', $event['ends_at']);
        $this->assertSame('football', $event['external_provider']);
        $this->assertNull($event['notes']);
        $this->assertSame('NONE', $event['travel_mode']);
        $this->assertTrue($event['read_only']);
        $this->assertTrue($event['ignore_conflicts']);
    }

    /** @test */
    public function a_failed_download_does_not_delete_the_last_successful_fixture_set()
    {
        FootballEvent::create([
            'api_fixture_id' => 8999,
            'starts_at' => '2026-09-19 22:30:00',
            'home_team_id' => 124,
            'home_team_name' => 'Fluminense',
            'away_team_id' => 1,
            'away_team_name' => 'Opponent',
        ]);

        Http::fake([
            'https://api.football-data.org/v4/*' => Http::response([], 500),
        ]);

        try {
            app(FootballEventSync::class)->sync();
            $this->fail('The failed API response should throw an exception.');
        } catch (RequestException $exception) {
            $this->assertDatabaseHas('football_events', ['api_fixture_id' => 8999]);
        }
    }

    /** @test */
    public function the_sync_command_is_a_safe_noop_without_an_api_token()
    {
        config(['services.football_data.token' => null]);

        $this->artisan('calendar:sync-football')
            ->expectsOutput('football-data.org is not configured; set FOOTBALL_DATA_API_TOKEN to enable syncing.')
            ->assertSuccessful();
    }

    private function fixture(
        int $id,
        string $date,
        int $homeId,
        string $homeName,
        string $homeTla,
        int $awayId,
        string $awayName,
        string $awayTla
    ): array {
        return [
            'id' => $id,
            'utcDate' => $date,
            'status' => 'TIMED',
            'matchday' => 25,
            'stage' => 'REGULAR_SEASON',
            'competition' => [
                'id' => 2013,
                'name' => 'Campeonato Brasileiro Série A',
                'code' => 'BSA',
            ],
            'homeTeam' => [
                'id' => $homeId,
                'name' => $homeName,
                'tla' => $homeTla,
                'crest' => "https://crests.football-data.org/{$homeId}.png",
            ],
            'awayTeam' => [
                'id' => $awayId,
                'name' => $awayName,
                'tla' => $awayTla,
                'crest' => "https://crests.football-data.org/{$awayId}.png",
            ],
        ];
    }
}
