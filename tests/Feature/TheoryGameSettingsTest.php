<?php

namespace Tests\Feature;

use App\Games\NoteNestSettings;
use Tests\TestCase;

class TheoryGameSettingsTest extends TestCase
{
    public function test_replay_options_include_play_preferences_and_exclude_computed_scoring_options()
    {
        $options = (new NoteNestSettings(['numOfChallenges' => 7, 'clefs' => ['alto'], 'sound' => '0']))->replayOptions();
        $this->assertSame(7, $options['numOfChallenges']);
        $this->assertSame(['alto'], $options['clefs']);
        $this->assertFalse($options['sound']);
        $this->assertArrayNotHasKey('accidentalWeights', $options);
        $this->assertArrayNotHasKey('bonusPoints', $options);
    }

    public function test_game_page_exposes_the_settings_being_played_to_browser_storage()
    {
        $response = $this->get(route('theory.note-nest.play', ['numOfChallenges' => 7, 'clefs' => ['alto'], 'sound' => 0]))->assertOk();
        $doc = new \DOMDocument;
        @$doc->loadHTML($response->getContent());
        $title = $doc->getElementById('pagetitle');
        $this->assertSame('note-nest', $title->getAttribute('data-game-settings'));
        $saved = json_decode($title->getAttribute('data-game-options'), true);
        $this->assertSame('7', $saved['numOfChallenges']);
        $this->assertSame(['alto'], $saved['clefs']);
        $this->assertFalse($saved['sound']);
    }

    public function test_home_keeps_setup_as_default_and_provides_separate_settings_and_replay_controls()
    {
        $this->get(route('theory.home'))->assertOk()
            ->assertSee('data-game-card="note-nest"', false)
            ->assertSee('data-card-replay', false)
            ->assertSee('aria-label="Note Nest settings"', false)
            ->assertSee('Set up game');
    }

    public function test_replay_query_switches_remain_booleans_for_the_game_engine()
    {
        $options = (new NoteNestSettings(['sound' => '0', 'showNoteNames' => '0', 'timer' => '1', 'blockNote' => '1']))->browserOptions();
        $this->assertFalse($options['sound']);
        $this->assertFalse($options['showNoteNames']);
        $this->assertTrue($options['timer']);
        $this->assertTrue($options['blockNote']);
    }
}
