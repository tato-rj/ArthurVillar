<?php

namespace Tests\Feature;

use App\Models\Calendar\ConflictException;
use Tests\BaseTest;

class ConflictExceptionTest extends BaseTest
{
    /** @test */
    public function it_stores_and_removes_a_symmetric_calendar_conflict_exception()
    {
        $user = $this->signIn();

        $this->postJson(route('calendar.conflict-exceptions.store'), [
            'event_key' => 'lesson-plan:12:2026-08-04:14:00',
            'conflicting_event_keys' => ['general-event:34'],
        ])
            ->assertOk()
            ->assertJsonPath('ignored_conflicts.0.0', 'general-event:34')
            ->assertJsonPath('ignored_conflicts.0.1', 'lesson-plan:12:2026-08-04:14:00');

        $this->assertDatabaseHas('calendar_conflict_exceptions', [
            'user_id' => $user->id,
            'first_event_key' => 'general-event:34',
            'second_event_key' => 'lesson-plan:12:2026-08-04:14:00',
        ]);

        $this->getJson(route('calendar.home', [
            'view' => 'week',
            'date' => '2026-08-04',
            'lesson_plans' => 1,
        ]))
            ->assertOk()
            ->assertJsonPath('ignoredConflicts.0.0', 'general-event:34')
            ->assertJsonPath('ignoredConflicts.0.1', 'lesson-plan:12:2026-08-04:14:00');

        $this->deleteJson(route('calendar.conflict-exceptions.destroy'), [
            'event_key' => 'general-event:34',
            'conflicting_event_keys' => ['lesson-plan:12:2026-08-04:14:00'],
        ])
            ->assertOk()
            ->assertJsonPath('ignored_conflicts', []);

        $this->assertSame(0, ConflictException::query()->count());
    }

    /** @test */
    public function one_user_cannot_remove_another_users_conflict_exception()
    {
        $owner = $this->signIn();
        [$firstEventKey, $secondEventKey] = ConflictException::normalizedPair(
            'general-event:34',
            'single-lesson-plan:9'
        );

        ConflictException::query()->create([
            'user_id' => $owner->id,
            'first_event_key' => $firstEventKey,
            'second_event_key' => $secondEventKey,
        ]);

        $this->logout();
        $this->signIn();

        $this->deleteJson(route('calendar.conflict-exceptions.destroy'), [
            'event_key' => 'general-event:34',
            'conflicting_event_keys' => ['single-lesson-plan:9'],
        ])->assertOk();

        $this->assertDatabaseHas('calendar_conflict_exceptions', [
            'user_id' => $owner->id,
            'first_event_key' => $firstEventKey,
            'second_event_key' => $secondEventKey,
        ]);
    }
}
