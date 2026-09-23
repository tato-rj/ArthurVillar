<?php

namespace Tests\Unit;

use App\Games\NotePythonSettings;
use PHPUnit\Framework\TestCase;

class NotePythonSettingsTest extends TestCase
{
    public function test_it_uses_a_metronome_bpm_instead_of_a_speed_index()
    {
        $options = (new NotePythonSettings)->options();

        $this->assertSame(80, $options['bpm']);
        $this->assertArrayNotHasKey('speedIndex', $options);
        $this->assertArrayNotHasKey('snakeSpeed', $options);
    }

    public function test_it_clamps_the_metronome_to_the_shared_selector_range()
    {
        $this->assertSame(50, (new NotePythonSettings(['bpm' => 20]))->options('bpm'));
        $this->assertSame(120, (new NotePythonSettings(['bpm' => 120]))->options('bpm'));
        $this->assertSame(160, (new NotePythonSettings(['bpm' => 220]))->options('bpm'));
        $this->assertSame(80, (new NotePythonSettings(['bpm' => 'fast']))->options('bpm'));
    }

    public function test_round_speed_up_is_an_optional_bonus_setting()
    {
        $standard = (new NotePythonSettings)->options();
        $this->assertFalse($standard['speedUpEachRound']);
        $this->assertContains('speedUpEachRound', $standard['bonusPoints']);

        $enabled = (new NotePythonSettings(['speedUpEachRound' => 'on']))->options();
        $this->assertSame('on', $enabled['speedUpEachRound']);
        $this->assertSame(false, (new NotePythonSettings(['bpm' => 80]))->options('speedUpEachRound'));
    }
}
