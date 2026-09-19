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
            'services.api_football.key' => 'football-key',
            'services.api_football.base_url' => 'https://v3.football.api-sports.io',
            'calendar.football.teams' => [
                ['id' => 124, 'name' => 'Fluminense'],
                ['id' => 6, 'name' => 'Brazil'],
            ],
            'calendar.timezone' => 'America/New_York',
        ]);
    }

    public function tearDown(): void
    {
        Carbon::setTestNow();

        parent::tearDown();
    }

    /** @test */
    public function it_imports_upcoming_fixtures_for_fluminense_and_brazil()
    {
        Http::fake(function (Request $request) {
            parse_str(parse_url($request->url(), PHP_URL_QUERY), $query);
            $fixture = (int) $query['team'] === 124
                ? $this->fixture(9001, '2026-09-20T22:30:00+00:00', 124, 'Fluminense', 127, 'Flamengo', 'Serie A')
                : $this->fixture(9002, '2026-09-24T00:00:00+00:00', 6, 'Brazil', 26, 'Argentina', 'Friendlies');

            return Http::response([
                'errors' => [],
                'response' => [$fixture],
            ]);
        });

        $this->assertSame(2, app(FootballEventSync::class)->sync());
        $this->assertDatabaseHas('football_events', [
            'api_fixture_id' => 9001,
            'home_team_name' => 'Fluminense',
            'away_team_name' => 'Flamengo',
            'league_name' => 'Serie A',
        ]);
        $this->assertDatabaseHas('football_events', [
            'api_fixture_id' => 9002,
            'home_team_name' => 'Brazil',
            'away_team_name' => 'Argentina',
        ]);

        foreach ([124, 6] as $teamId) {
            Http::assertSent(function (Request $request) use ($teamId) {
                parse_str(parse_url($request->url(), PHP_URL_QUERY), $query);

                return $request->hasHeader('x-apisports-key', 'football-key')
                    && $request->url() === 'https://v3.football.api-sports.io/fixtures?'.http_build_query($query)
                    && (int) ($query['team'] ?? 0) === $teamId
                    && (int) ($query['season'] ?? 0) === 2026
                    && ($query['from'] ?? null) === '2026-09-18'
                    && ($query['to'] ?? null) === '2026-12-31'
                    && ($query['timezone'] ?? null) === 'UTC';
            });
        }

        Http::assertSentCount(2);
        Http::assertNotSent(function (Request $request) {
            parse_str(parse_url($request->url(), PHP_URL_QUERY), $query);

            return array_key_exists('next', $query);
        });
    }

    /** @test */
    public function the_calendar_payload_renders_football_in_local_time_and_ignores_conflicts()
    {
        FootballEvent::create([
            'api_fixture_id' => 9001,
            'starts_at' => '2026-09-20 22:30:00',
            'status' => 'NS',
            'home_team_id' => 124,
            'home_team_name' => 'Fluminense',
            'away_team_id' => 127,
            'away_team_name' => 'Flamengo',
            'league_id' => 71,
            'league_name' => 'Serie A',
            'league_round' => 'Regular Season - 25',
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

        Http::fake(function (Request $request) {
            parse_str(parse_url($request->url(), PHP_URL_QUERY), $query);

            return (int) ($query['team'] ?? 0) === 124
                ? Http::response(['errors' => [], 'response' => [$this->fixture(9001, '2026-09-20T22:30:00+00:00', 124, 'Fluminense', 127, 'Flamengo', 'Serie A')]])
                : Http::response([], 500);
        });

        try {
            app(FootballEventSync::class)->sync();
            $this->fail('The failed API response should throw an exception.');
        } catch (RequestException $exception) {
            $this->assertDatabaseHas('football_events', ['api_fixture_id' => 8999]);
            $this->assertDatabaseMissing('football_events', ['api_fixture_id' => 9001]);
        }
    }

    /** @test */
    public function the_sync_command_is_a_safe_noop_without_an_api_key()
    {
        config(['services.api_football.key' => null]);

        $this->artisan('calendar:sync-football')
            ->expectsOutput('API-Football is not configured; set API_FOOTBALL_KEY to enable syncing.')
            ->assertSuccessful();
    }

    private function fixture(
        int $id,
        string $date,
        int $homeId,
        string $homeName,
        int $awayId,
        string $awayName,
        string $league
    ): array {
        return [
            'fixture' => [
                'id' => $id,
                'date' => $date,
                'status' => ['short' => 'NS'],
                'venue' => ['name' => 'Maracana', 'city' => 'Rio de Janeiro'],
            ],
            'league' => [
                'id' => 71,
                'name' => $league,
                'round' => 'Regular Season - 25',
            ],
            'teams' => [
                'home' => ['id' => $homeId, 'name' => $homeName, 'logo' => "https://media.api-sports.io/football/teams/{$homeId}.png"],
                'away' => ['id' => $awayId, 'name' => $awayName, 'logo' => "https://media.api-sports.io/football/teams/{$awayId}.png"],
            ],
        ];
    }
}
