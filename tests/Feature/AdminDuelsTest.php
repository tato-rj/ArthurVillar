<?php

namespace Tests\Feature;

use App\Models\User;
use App\Theory\Duels\Duel;
use App\Theory\Duels\DuelArchive;
use Illuminate\Support\Str;
use Tests\TestCase;

class AdminDuelsTest extends TestCase
{
    private function duel(array $attributes = []): Duel
    {
        return Duel::create($attributes + [
            'id' => (string) Str::uuid(), 'code' => 'ABCD', 'join_code' => null,
            'game' => 'note-nest', 'settings' => ['numOfChallenges' => 5, 'sound' => false],
            'seed' => bin2hex(random_bytes(16)), 'status' => Duel::FINISHED,
            'starts_at' => now()->subMinutes(2), 'finished_at' => now(), 'expires_at' => now()->addMinutes(15),
        ]);
    }

    private function archive(Duel $duel): DuelArchive
    {
        return DuelArchive::create([
            'id' => (string) Str::uuid(), 'duel_id' => $duel->id,
            'game' => $duel->game, 'status' => $duel->status, 'seed' => $duel->seed,
            'played_at' => $duel->starts_at ?? $duel->created_at,
            'snapshot' => $duel->load('players')->toArray(),
        ]);
    }

    private function signIn(): void
    {
        $this->actingAs(User::factory()->create(['email' => User::ARTHUR_EMAIL]));
    }

    private function tableRequest(array $overrides = []): array
    {
        return array_replace_recursive([
            'draw' => 1, 'start' => 0, 'length' => 10,
            'search' => ['value' => '', 'regex' => false],
            'columns' => [
                ['data' => 'played_at', 'name' => 'played_at', 'searchable' => 'true', 'orderable' => 'true', 'search' => ['value' => '']],
                ['data' => 'status', 'name' => 'status', 'searchable' => 'true', 'orderable' => 'true', 'search' => ['value' => '']],
                ['data' => 'game', 'name' => 'game', 'searchable' => 'true', 'orderable' => 'true', 'search' => ['value' => '']],
                ['data' => 'id', 'name' => 'actions', 'searchable' => 'false', 'orderable' => 'false', 'search' => ['value' => '']],
            ],
            'order' => [['column' => 0, 'dir' => 'desc']],
        ], $overrides);
    }

    public function test_every_duel_endpoint_is_restricted_to_arthur(): void
    {
        $duel = $this->duel();
        $archive = $this->archive($duel);
        $gets = [route('admin.theory.duels.index'), route('admin.theory.duels.table'),
            route('admin.theory.duels.show', $duel), route('admin.theory.duels.history.show', $archive)];
        $deletes = [route('admin.theory.duels.destroy', $duel), route('admin.theory.duels.history.destroy', $archive)];
        foreach ($gets as $url) {
            $this->getJson($url)->assertUnauthorized();
        }
        foreach ($deletes as $url) {
            $this->deleteJson($url)->assertUnauthorized();
        }
        $this->actingAs(User::factory()->create());
        foreach ($gets as $url) {
            $this->getJson($url)->assertForbidden();
        }
        foreach ($deletes as $url) {
            $this->deleteJson($url)->assertForbidden();
        }
        $this->assertNotNull($duel->fresh());
        $this->assertNotNull($archive->fresh());
    }

    public function test_index_has_calendar_table_patterns_and_admin_navigation(): void
    {
        $this->signIn();
        $this->get(route('admin.theory.duels.index'))->assertOk()
            ->assertViewIs('admin.theory.duels.index')->assertSee('duels-table')
            ->assertSee('calendarDataTableState.create')->assertSee('js-duel-info')->assertSee('js-duel-delete')
            ->assertSee(json_encode(route('admin.theory.duels.table')), false)
            ->assertSee(route('admin.theory.duels.index'), false);
    }

    public function test_table_pages_sorts_searches_and_filters_live_and_archived_matches(): void
    {
        $old = $this->duel(['starts_at' => now()->subDays(20)]);
        $archive = $this->archive($old);
        $old->update(['status' => Duel::PLAYING, 'starts_at' => now(), 'finished_at' => null]);
        $waiting = $this->duel(['status' => Duel::WAITING, 'starts_at' => null, 'finished_at' => null]);
        $finished = $this->duel(['game' => 'intervals-lab', 'starts_at' => now()->subDay()]);
        $this->signIn();

        $response = $this->getJson(route('admin.theory.duels.table', $this->tableRequest(['length' => 1])))
            ->assertOk()->assertJsonPath('recordsTotal', 4)->assertJsonCount(1, 'data');
        $this->assertSame($old->id, $response->json('data.0.id'));
        $this->assertFalse($response->json('data.0.completed'));
        $this->assertSame('Note Nest', $response->json('data.0.game'));
        $this->assertArrayNotHasKey('settings', $response->json('data.0'));
        $this->assertArrayNotHasKey('snapshot', $response->json('data.0'));

        $this->getJson(route('admin.theory.duels.table', $this->tableRequest(['start' => 3])))
            ->assertOk()->assertJsonPath('data.0.id', $archive->id)
            ->assertJsonPath('data.0.info_url', route('admin.theory.duels.history.show', $archive));
        $this->getJson(route('admin.theory.duels.table', $this->tableRequest(['completed' => 'yes'])))
            ->assertOk()->assertJsonPath('recordsFiltered', 2);
        $this->getJson(route('admin.theory.duels.table', $this->tableRequest(['completed' => 'no'])))
            ->assertOk()->assertJsonPath('recordsFiltered', 2);
        $this->getJson(route('admin.theory.duels.table', $this->tableRequest(['game' => 'intervals-lab'])))
            ->assertOk()->assertJsonPath('recordsFiltered', 1)->assertJsonPath('data.0.id', $finished->id);
        $this->getJson(route('admin.theory.duels.table', $this->tableRequest(['search' => ['value' => 'Note Nest']])))
            ->assertOk()->assertJsonPath('recordsFiltered', 3);
        $this->getJson(route('admin.theory.duels.table', $this->tableRequest(['search' => ['value' => 'Completed']])))
            ->assertOk()->assertJsonPath('recordsFiltered', 2);
        $this->getJson(route('admin.theory.duels.table', $this->tableRequest(['completed' => 'unknown'])))
            ->assertUnprocessable();
    }

    public function test_details_show_results_settings_and_activity_without_player_credentials(): void
    {
        $duel = $this->duel(['starts_at' => '2026-10-05 14:00:00', 'finished_at' => '2026-10-05 14:01:30']);
        foreach (['host' => 20, 'guest' => 20] as $role => $score) {
            $duel->players()->create([
                'role' => $role, 'token_hash' => str_repeat($role === 'host' ? 'a' : 'b', 64),
                'connection_id' => str_repeat('c', 32), 'score' => $score, 'progress' => 5,
                'result' => ['score' => $score, 'accuracy' => $role === 'host' ? 100 : 80],
                'finished_at' => $duel->finished_at, 'checkpoint' => ['_stats' => ['checksCorrect' => 5]],
            ]);
        }
        $archive = $this->archive($duel);
        $this->signIn();
        foreach ([route('admin.theory.duels.show', $duel), route('admin.theory.duels.history.show', $archive)] as $url) {
            $this->get($url)->assertOk()->assertViewIs('admin.theory.duels.show')
                ->assertSee('duel-info-modal')->assertSee('Host won')->assertSee('100%')->assertSee('80%')
                ->assertSee('01:30')->assertSee('10:00:00 AM')->assertSee('Number of rounds')->assertSee('Sound')
                ->assertSee('checksCorrect')->assertDontSee(str_repeat('a', 64))->assertDontSee(str_repeat('c', 32))
                ->assertDontSee('token_hash')->assertDontSee('connection_id');
        }
        $this->get(route('admin.theory.duels.show', $this->duel(['status' => Duel::WAITING, 'starts_at' => null, 'finished_at' => null])))
            ->assertOk()->assertSee('Not joined')->assertSee('Not completed');
    }

    public function test_deleting_a_match_removes_its_players_but_preserves_other_history(): void
    {
        $duel = $this->duel();
        $player = $duel->players()->create(['role' => 'host', 'token_hash' => str_repeat('a', 64)]);
        $archive = $this->archive($duel);
        $other = $this->duel();
        $this->signIn();
        $this->deleteJson(route('admin.theory.duels.destroy', $duel))->assertOk()
            ->assertJsonPath('deleted', true)->assertJsonPath('id', $duel->id);
        $this->assertDatabaseMissing('theory_duel_players', ['id' => $player->id]);
        $this->assertNotNull($archive->fresh());
        $this->assertNotNull($other->fresh());
        $this->get(route('admin.theory.duels.history.show', $archive))->assertOk();
        $this->deleteJson(route('admin.theory.duels.history.destroy', $archive))->assertOk()
            ->assertJsonPath('id', $archive->id);
        $this->assertNull($archive->fresh());
        $this->assertNotNull($other->fresh());
        $this->get(route('admin.theory.duels.show', $duel->id))->assertNotFound();
        $this->get(route('admin.theory.duels.history.show', $archive->id))->assertNotFound();
    }
}
