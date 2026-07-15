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
            ->assertSeeInOrder(['Display options', 'Show calendar insights', 'Appearance', 'Unconfirmed lessons', 'View options'])
            ->assertSee('type="color"', false)
            ->assertSee('value="#6b7280"', false)
			->assertSee('data-setting-original="#6b7280"', false)
			->assertSee('data-setting-target="unconfirmed-lesson-color"', false)
            ->assertSee('View options')
            ->assertSee('Show cancelled lessons')
            ->assertSee('Add transparency to past events')
            ->assertSee('Highlight conflicting events')
            ->assertSee('Notifications default')
            ->assertSee('At the event time')
            ->assertSee('15 minutes before')
            ->assertSee('calendar_show_cancelled', false);
    }

    /** @test */
    public function it_saves_the_show_cancelled_lessons_preference_as_a_boolean_setting()
    {
        $this->signIn();

        $this->from(route('studio.home'))
            ->patch(route('studio.settings.update'), [
                'calendar_show_insights' => false,
                'unconfirmed_lesson_color' => '#3057D5',
                'calendar_show_cancelled' => true,
                'calendar_add_transparency_to_past_events' => false,
                'calendar_highlight_conflicting_events' => false,
                'default_event_notification_minutes_before' => 120,
            ])
            ->assertRedirect(route('studio.home'))
            ->assertSessionHas('success', 'Settings updated');

        $this->assertDatabaseHas('settings', [
            'key' => 'calendar.show_insights',
            'value' => 'false',
            'type' => Settings::TYPE_BOOLEAN,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'appearance.unconfirmed_lesson_color',
            'value' => '#3057d5',
            'type' => Settings::TYPE_STRING,
        ]);
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
        $this->assertDatabaseHas('settings', [
            'key' => 'notifications.default_event_minutes_before',
            'value' => '120',
            'type' => Settings::TYPE_INTEGER,
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
    public function the_unconfirmed_lesson_color_is_exposed_to_the_calendar_styles()
    {
        $this->signIn();

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertSee('--studio-unconfirmed-lesson-color: #6b7280;', false);

        Settings::setValue('appearance.unconfirmed_lesson_color', '#3057d5');

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertSee('--studio-unconfirmed-lesson-color: #3057d5;', false);
    }

    /** @test */
    public function calendar_insights_and_nearby_birthdays_follow_the_display_preference()
    {
        $this->signIn();

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertSee('studio-calendar-insights-birthdays', false)
            ->assertSee('data-calendar-lessons-count', false);

        Settings::setValue('calendar.show_insights', false, Settings::TYPE_BOOLEAN);

        $this->get(route('studio.home'))
            ->assertOk()
            ->assertDontSee('studio-calendar-insights-birthdays', false)
            ->assertDontSee('data-calendar-lessons-count', false);
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

    /** @test */
    public function the_notification_preference_becomes_the_default_for_new_events()
    {
        Settings::setValue('notifications.default_event_minutes_before', 30, Settings::TYPE_INTEGER);

        $this->assertSame(30, \App\Models\Event::defaultNotificationMinutesBefore());

        Settings::setValue('notifications.default_event_minutes_before', -1, Settings::TYPE_INTEGER);

        $this->assertNull(\App\Models\Event::defaultNotificationMinutesBefore());
    }
}
