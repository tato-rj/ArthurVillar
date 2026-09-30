<?php

namespace Tests\Unit;

use App\Games\BeatHeroSettings;
use PHPUnit\Framework\TestCase;

class BeatHeroSettingsTest extends TestCase
{
    public function test_half_notes_and_triplets_survive_settings_and_replay_links()
    {
        $settings = new BeatHeroSettings(['figures' => ['half', 'triplets']]);

        $this->assertSame(['half', 'triplets'], $settings->options('figures'));
        $this->assertSame(['half', 'triplets'], $settings->replayOptions()['figures']);
        $this->assertArrayHasKey('half', $settings->figureChoices());
        $this->assertArrayHasKey('triplets', $settings->figureChoices());
    }

    public function test_legacy_game_links_default_sound_effects_to_on()
    {
        $options = (new BeatHeroSettings([
            'numOfChallenges' => 4,
            'numOfCards' => 2,
            'bpm' => 80,
        ]))->options();

        $this->assertTrue($options['sound']);
    }

    public function test_the_sound_effects_setting_can_still_be_turned_off()
    {
        $options = (new BeatHeroSettings(['sound' => '0']))->options();

        $this->assertSame('0', $options['sound']);
    }
}
