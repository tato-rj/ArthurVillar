<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class TheoryMicrophoneTest extends TestCase
{
    public function test_settings_can_be_saved_and_are_used_by_both_microphone_games(): void
    {
        $user = User::factory()->create(['email' => User::ARTHUR_EMAIL]);
        $this->actingAs($user);

        $this->get(route('theory.mic.index'))->assertOk()
            ->assertSee('value="65"', false)
            ->assertSee('value="700"', false);

        $this->patchJson(route('theory.mic.update'), [
            'sensitivity' => 83,
            'settleMs' => 1500,
        ])->assertOk()->assertJsonPath('settings.sensitivity', 83)
            ->assertJsonPath('settings.settleMs', 1500);

        $this->assertSame(['sensitivity' => 83, 'settleMs' => 1500], $user->fresh()->microphone_settings);

        foreach (['theory.note-nest.play', 'theory.note-match.play'] as $game) {
            $this->get(route($game))->assertOk()
                ->assertSee('"sensitivity":83', false)
                ->assertSee('"settleMs":1500', false);
        }
    }

    public function test_settings_are_private_and_invalid_values_are_rejected(): void
    {
        $this->get(route('theory.mic.index'))->assertRedirect();
        $this->patchJson(route('theory.mic.update'), ['sensitivity' => 100, 'settleMs' => 700])->assertUnauthorized();

        $user = User::factory()->create(['email' => User::ARTHUR_EMAIL]);
        $this->actingAs($user)->patchJson(route('theory.mic.update'), [
            'sensitivity' => 101,
            'settleMs' => 100,
        ])->assertUnprocessable()->assertJsonValidationErrors(['sensitivity', 'settleMs']);
        $this->assertNull($user->fresh()->microphone_settings);
    }
}
