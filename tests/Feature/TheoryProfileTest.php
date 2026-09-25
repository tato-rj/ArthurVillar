<?php

namespace Tests\Feature;

use App\Models\Theory\Player;
use Tests\TestCase;

class TheoryProfileTest extends TestCase
{
    public function test_successful_score_exposes_the_saved_game_and_final_points_to_the_browser()
    {
        $url = route('theory.note-nest.play');
        $this->from($url)->post(route('theory.leaderboard.store'), [
            'game' => 'Note Nest', 'username' => 'Chosen name',
            'avatar_url' => asset('images/avatars/avatar-2.svg'),
            'score' => 30, 'accuracy' => 90, 'rounds' => 4, 'duration' => '00:40',
        ])->assertRedirect($url)->assertSessionHas('newPlayer');

        $player = Player::firstOrFail();
        $this->get($url)->assertOk()
            ->assertSee('data-posted-game="Note Nest"', false)
            ->assertSee('data-posted-score="'.$player->finalScore.'"', false);
    }

    public function test_home_uses_a_bootstrap_dropdown_with_no_assumed_scores()
    {
        $this->get(route('theory.home'))->assertOk()
            ->assertSee('data-bs-toggle="dropdown"', false)
            ->assertSee('dropdown-menu dropdown-menu-end', false)
            ->assertSee('Post a score to see it here.');
    }
}
