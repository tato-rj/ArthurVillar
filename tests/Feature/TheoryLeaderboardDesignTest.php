<?php

namespace Tests\Feature;

use App\Models\Theory\Player;
use Tests\TestCase;

class TheoryLeaderboardDesignTest extends TestCase
{
    private function players(int $count)
    {
        return collect(range(1, $count))->map(fn ($rank) => new Player([
            'id' => $rank, 'username' => 'Player '.$rank, 'finalScore' => 1000 - $rank,
            'avatar_url' => '/images/avatars/avatar-'.$rank.'.svg',
        ]));
    }

    public function test_podium_and_remaining_ranks_preserve_order_and_highlight_only_the_posted_entry()
    {
        $players = $this->players(6);
        $this->withSession(['newPlayer' => $players->last()]);
        $html = view('theory.components.leaderboard.list', ['leaderboard' => $players])->render();
        $doc = new \DOMDocument;
        @$doc->loadHTML($html);
        $xpath = new \DOMXPath($doc);
        $this->assertSame(3, $xpath->query('//ol[@aria-label="Top three"]/li')->length);
        $this->assertSame(3, $xpath->query('//ol[@start="4"]/li')->length);
        $this->assertSame('4', trim($xpath->query('//span[@aria-label="Rank 4"]')->item(0)->textContent));
        $highlight = $xpath->query('//li[contains(@class,"is-you")]');
        $this->assertSame(1, $highlight->length);
        $this->assertStringContainsString('Player 6', $highlight->item(0)->textContent);
    }

    public function test_sparse_leaderboards_do_not_invent_podium_players_or_show_an_empty_list()
    {
        foreach ([1, 2, 3] as $count) {
            $html = view('theory.components.leaderboard.list', ['leaderboard' => $this->players($count)])->render();
            $this->assertSame($count, substr_count($html, '<li '));
            $this->assertStringNotContainsString('leaderboard-ranks', $html);
        }
        $html = view('theory.components.leaderboard.list', ['leaderboard' => collect()])->render();
        $this->assertStringContainsString('No scores yet. Be the first!', $html);
        $this->assertStringNotContainsString('<li ', $html);
    }

    public function test_range_refreshes_use_the_new_public_layout_and_keep_the_period_filter()
    {
        foreach (['Recent' => now(), 'Older' => now()->subDays(10)] as $name => $date) {
            Player::create([
                'game' => 'Note Nest', 'username' => $name, 'avatar_url' => '/images/avatars/avatar-1.svg',
                'score' => 12, 'finalScore' => 100, 'rounds' => 4, 'accuracy' => 100, 'duration' => 30,
                'created_at' => $date,
            ]);
        }
        $this->get(route('theory.leaderboard.show', ['game' => 'Note Nest', 'range' => 'week']))
            ->assertOk()->assertSee('leaderboard-podium')->assertSee('Recent')->assertDontSee('Older');
        $this->get(route('theory.leaderboard.show', ['game' => 'Note Nest', 'range' => 'all', 'admin' => 1]))
            ->assertOk()->assertSee('leaderboard-podium')->assertSee('Recent')->assertSee('Older')
            ->assertDontSee('name="_method"', false);
    }
}
