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
}
