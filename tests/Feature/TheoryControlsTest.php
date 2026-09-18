<?php

namespace Tests\Feature;

use Tests\TestCase;

class TheoryControlsTest extends TestCase
{
    public function test_answer_checking_controls_include_the_continue_button()
    {
        $html = view('theory.components.controls', [
            'instructions' => 'Choose an answer',
            'settings' => new TheoryControlsSettingsFake,
        ])->render();

        $this->assertStringContainsString('id="check"', $html);
        $this->assertSame(1, substr_count($html, 'id="continue"'));
    }

    public function test_play_controls_include_the_continue_button_once()
    {
        $html = view('theory.components.controls', [
            'type' => 'play',
            'settings' => new TheoryControlsSettingsFake,
        ])->render();

        $this->assertSame(1, substr_count($html, 'id="continue"'));
    }
}

class TheoryControlsSettingsFake
{
    public function gameName()
    {
        return 'Test Game';
    }
}
