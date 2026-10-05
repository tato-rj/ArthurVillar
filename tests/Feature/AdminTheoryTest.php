<?php

namespace Tests\Feature;

use App\Models\Theory\Player;
use App\Models\User;
use Tests\TestCase;

class AdminTheoryTest extends TestCase
{
    private function pages(): array
    {
        return [
            'admin.home',
            'admin.users.index',
            'admin.theory.mic.index',
            'admin.theory.audio.index',
            'admin.theory.leaderboard.index',
            'admin.theory.leaderboard.show',
            'admin.theory.tournaments.index',
            'admin.theory.stats.index',
        ];
    }

    public function test_admin_pages_require_arthurs_login(): void
    {
        foreach ($this->pages() as $page) {
            $this->get(route($page))->assertRedirect('http://admin.'.config('app.domain').'/login');
        }

        $this->actingAs(User::factory()->create());
        foreach ($this->pages() as $page) {
            $this->get(route($page))->assertForbidden();
        }
    }

    public function test_arthur_can_open_every_admin_tool_and_navigation_stays_on_admin(): void
    {
        $this->actingAs(User::factory()->create(['email' => User::ARTHUR_EMAIL]));
        foreach ($this->pages() as $page) {
            $response = $this->get(route($page))->assertOk();
            if ($page !== 'admin.theory.leaderboard.show') {
                $response->assertSee(route('admin.home'), false)
                    ->assertSee(route('admin.users.index'), false)
                    ->assertSee(route('admin.theory.mic.index'), false);
            }
        }

        $this->get(route('admin.theory.leaderboard.index'))
            ->assertSee(route('admin.theory.leaderboard.show', ['range' => 'all', 'game' => 'Note Nest']))
            ->assertDontSee('http://theory.'.config('app.domain').'/leaderboard/show', false);
    }

    public function test_theory_management_routes_and_old_user_pages_are_removed(): void
    {
        $this->actingAs(User::factory()->create(['email' => User::ARTHUR_EMAIL]));
        foreach (['audio', 'mic', 'tournaments', 'stats'] as $path) {
            $this->get('http://theory.'.config('app.domain').'/'.$path)->assertNotFound();
        }
        $this->get('http://theory.'.config('app.domain').'/leaderboard')->assertStatus(405);
        $this->patchJson('http://theory.'.config('app.domain').'/mic', [
            'sensitivity' => 90, 'settleMs' => 1200,
        ])->assertNotFound();
        $this->delete('http://theory.'.config('app.domain').'/leaderboard/1')->assertNotFound();
        $this->get('http://users.'.config('app.domain').'/accounts/1')->assertNotFound();
        $this->get(route('theory.home'))->assertOk();
    }

    public function test_scores_posted_on_theory_can_be_filtered_and_deleted_from_admin(): void
    {
        $this->post(route('theory.leaderboard.store'), [
            'game' => 'Note Nest', 'username' => 'Recent Player',
            'avatar_url' => '/images/avatars/avatar-1.svg',
            'score' => 12, 'accuracy' => 100, 'rounds' => 4, 'duration' => '00:30',
        ])->assertRedirect();
        $recent = Player::where('username', 'Recent Player')->firstOrFail();
        $older = Player::create([
            'game' => 'Note Nest', 'username' => 'Older Player',
            'avatar_url' => '/images/avatars/avatar-1.svg',
            'score' => 12, 'finalScore' => 100, 'rounds' => 4, 'accuracy' => 100,
            'duration' => 30, 'created_at' => now()->subDays(10),
        ]);

        $this->deleteJson(route('admin.theory.leaderboard.destroy', $recent))->assertUnauthorized();
        $this->actingAs(User::factory()->create())
            ->deleteJson(route('admin.theory.leaderboard.destroy', $recent))->assertForbidden();
        $this->assertNotNull($recent->fresh());

        $this->actingAs(User::factory()->create(['email' => User::ARTHUR_EMAIL]));
        $this->get(route('admin.theory.leaderboard.show', ['game' => 'Note Nest', 'range' => 'week']))
            ->assertOk()->assertSee('Recent Player')->assertDontSee('Older Player')
            ->assertSee(route('admin.theory.leaderboard.destroy', $recent), false);
        $this->get(route('admin.theory.leaderboard.show', ['game' => 'Note Nest', 'range' => 'all']))
            ->assertOk()->assertSee('Recent Player')->assertSee('Older Player');

        // A public leaderboard remains public even when Arthur is signed in.
        $this->get(route('theory.leaderboard.show', ['game' => 'Note Nest', 'range' => 'all', 'admin' => 1]))
            ->assertOk()->assertSee('leaderboard-podium')->assertDontSee('name="_method"', false);

        $this->from(route('admin.theory.leaderboard.index'))
            ->delete(route('admin.theory.leaderboard.destroy', $recent))
            ->assertRedirect(route('admin.theory.leaderboard.index'));
        $this->assertNull($recent->fresh());
        auth()->logout();
        $this->get(route('theory.leaderboard.show', ['game' => 'Note Nest', 'range' => 'all']))
            ->assertOk()->assertDontSee('Recent Player')->assertSee('Older Player');
        $this->assertNotNull($older->fresh());
    }
}
