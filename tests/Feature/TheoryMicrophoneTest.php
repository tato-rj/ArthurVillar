<?php

namespace Tests\Feature;

use App\Games\MicrophoneSettings;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class TheoryMicrophoneTest extends TestCase
{
    public function test_settings_are_shared_by_guests_and_other_users_in_both_microphone_games(): void
    {
        $user = User::factory()->create(['email' => User::ARTHUR_EMAIL]);
        $this->actingAs($user);

        $this->get(route('admin.theory.mic.index'))->assertOk()
            ->assertSee('value="65"', false)
            ->assertSee('value="700"', false);

        $this->patchJson(route('admin.theory.mic.update'), [
            'sensitivity' => 83,
            'settleMs' => 1500,
        ])->assertOk()->assertJsonPath('settings.sensitivity', 83)
            ->assertJsonPath('settings.settleMs', 1500);

        $this->assertSame(['sensitivity' => 83, 'settleMs' => 1500], MicrophoneSettings::current());
        $this->assertDatabaseHas('microphone_settings', [
            'id' => 1,
            'sensitivity' => 83,
            'settle_ms' => 1500,
        ]);
        $this->assertSame(1, DB::table('microphone_settings')->count());
        $this->assertFalse(Schema::hasColumn('users', 'microphone_settings'));

        auth()->logout();
        foreach (['theory.note-nest.play', 'theory.note-match.play'] as $game) {
            $this->get(route($game))->assertOk()
                ->assertSee('"sensitivity":83', false)
                ->assertSee('"settleMs":1500', false);
        }

        $otherUser = User::factory()->create();
        $this->actingAs($otherUser)->get(route('theory.note-match.play'))->assertOk()
            ->assertSee('"sensitivity":83', false)
            ->assertSee('"settleMs":1500', false);
    }

    public function test_settings_are_private_and_invalid_values_are_rejected(): void
    {
        $this->get(route('admin.theory.mic.index'))->assertRedirect();
        $this->patchJson(route('admin.theory.mic.update'), ['sensitivity' => 100, 'settleMs' => 700])->assertUnauthorized();

        $this->actingAs(User::factory()->create())->patchJson(route('admin.theory.mic.update'), [
            'sensitivity' => 90,
            'settleMs' => 1400,
        ])->assertForbidden();

        $user = User::factory()->create(['email' => User::ARTHUR_EMAIL]);
        $this->actingAs($user)->patchJson(route('admin.theory.mic.update'), [
            'sensitivity' => 101,
            'settleMs' => 100,
        ])->assertUnprocessable()->assertJsonValidationErrors(['sensitivity', 'settleMs']);
        $this->assertSame(['sensitivity' => 65, 'settleMs' => 700], MicrophoneSettings::current());
        $this->assertDatabaseHas('microphone_settings', [
            'id' => 1,
            'sensitivity' => 65,
            'settle_ms' => 700,
        ]);
    }
}
