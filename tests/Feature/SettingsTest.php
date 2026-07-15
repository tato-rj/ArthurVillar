<?php

namespace Tests\Feature;

use App\Models\Lesson;
use App\Models\LessonPlan;
use App\Models\Settings;
use App\Models\Student;
use Tests\BaseTest;

class SettingsTest extends BaseTest
{
    /** @test */
    public function the_calendar_settings_modal_groups_the_view_options()
    {
        $this->signIn();

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertSee('View options')
            ->assertSee('Show cancelled lessons')
            ->assertSee('Add transparency to past events')
            ->assertSee('Highlight conflicting events')
            ->assertSee('calendar_show_cancelled', false);
    }

    /** @test */
    public function it_saves_the_show_cancelled_lessons_preference_as_a_boolean_setting()
    {
        $this->signIn();

        $this->from(route('studio.home'))
            ->patch(route('studio.settings.update'), [
                'calendar_show_cancelled' => true,
                'calendar_add_transparency_to_past_events' => false,
                'calendar_highlight_conflicting_events' => false,
            ])
            ->assertRedirect(route('studio.home'))
            ->assertSessionHas('success', 'Settings updated');

        $this->assertDatabaseHas('settings', [
            'key' => 'calendar.show_cancelled',
            'value' => 'true',
            'type' => Settings::TYPE_BOOLEAN,
        ]);
        $this->assertTrue(Settings::getValue('calendar.show_cancelled'));
        $this->assertDatabaseHas('settings', [
            'key' => 'calendar.add_transparency_to_past_events',
            'value' => 'false',
            'type' => Settings::TYPE_BOOLEAN,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'calendar.highlight_conflicting_events',
            'value' => 'false',
            'type' => Settings::TYPE_BOOLEAN,
        ]);
    }

    /** @test */
    public function past_event_transparency_follows_the_calendar_view_preference()
    {
        $this->signIn();

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertSee('data-transparent-past-events', false);

        Settings::setValue('calendar.add_transparency_to_past_events', false, Settings::TYPE_BOOLEAN);

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertDontSee('data-transparent-past-events', false);
    }

    /** @test */
    public function conflicting_event_highlights_follow_the_calendar_view_preference()
    {
        $this->signIn();

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertSee('data-highlight-conflicting-events', false);

        Settings::setValue('calendar.highlight_conflicting_events', false, Settings::TYPE_BOOLEAN);

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertDontSee('data-highlight-conflicting-events', false);
    }

    /** @test */
    public function canceled_lessons_follow_the_calendar_view_preference()
    {
        $student = Student::factory()->create();
        $lessonPlan = LessonPlan::factory()->student($student)->create([
            'weekday' => 4,
            'start_time' => '14:15',
            'duration_minutes' => 30,
            'starts_on' => '2026-07-01',
        ]);

        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'starts_at' => '2026-07-08 14:15:00',
            'ends_at' => '2026-07-08 14:45:00',
            'canceled_at' => '2026-07-07 12:00:00',
            'canceled_by' => 'student',
        ]);

        $this->signIn();

        $calendarUrl = route('studio.home', [
            'view' => 'week',
            'date' => '2026-07-08',
            'lesson_plans' => 1,
        ]);

        $this->getJson($calendarUrl)
            ->assertOk()
            ->assertJsonCount(0, 'plannedLessons');

        Settings::setValue('calendar.show_cancelled', true, Settings::TYPE_BOOLEAN);

        $this->getJson($calendarUrl)
            ->assertOk()
            ->assertJsonPath('plannedLessons.0.occurrences.0.lesson_status', 'canceled');
    }

    /** @test */
    public function settings_return_values_using_their_stored_type()
    {
        Settings::setValue('theme.primary_color', '#3057d5');
        Settings::setValue('dashboard.items_per_page', 20, Settings::TYPE_INTEGER);
        Settings::setValue('theme.dark_mode', false, Settings::TYPE_BOOLEAN);

        $this->assertSame('#3057d5', Settings::getValue('theme.primary_color'));
        $this->assertSame(20, Settings::getValue('dashboard.items_per_page'));
        $this->assertFalse(Settings::getValue('theme.dark_mode'));
    }
}
