<?php

namespace Tests\Feature;

use App\Models\Calendar\{Lesson, LessonPlan, Settings, Student};
use Tests\BaseTest;

class SettingsTest extends BaseTest
{
    /** @test */
    public function the_calendar_settings_modal_groups_the_view_options()
    {
        $this->signIn();

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSeeInOrder(['View options', 'Show calendar insights', 'Show holidays', 'Show cancelled lessons', 'Calendar initial view', 'fa-desktop', 'fa-mobile', 'Appearance', 'Unconfirmed lessons'])
            ->assertDontSee('Display options')
            ->assertSee('fa-desktop', false)
            ->assertSee('fa-mobile', false)
            ->assertSee('form-select-icon', false)
            ->assertSee('<option value="week" selected>Week</option>', false)
            ->assertSee('<option value="2-days" selected>2 Days</option>', false)
            ->assertDontSee('on desktop')
            ->assertDontSee('on mobile')
            ->assertDontSee('Desktop calendar view')
            ->assertDontSee('Mobile calendar view')
            ->assertSee('type="color"', false)
            ->assertSee('value="#6b7280"', false)
            ->assertSee('data-setting-original="#6b7280"', false)
            ->assertSee('data-setting-target="unconfirmed-lesson-color"', false)
            ->assertSee('Unpaid lessons')
            ->assertSee('value="#ff4b4b"', false)
            ->assertSee('Paid lessons')
            ->assertSee('value="#58cc02"', false)
            ->assertSee('Canceled lessons')
            ->assertSee('value="#ffffff"', false)
            ->assertSee('General events')
            ->assertSee('value="#ce82ff"', false)
            ->assertSee('View options')
            ->assertSee('Show holidays')
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

        $this->from(route('calendar.home'))
            ->patch(route('calendar.settings.update'), [
                'calendar_show_insights' => false,
                'calendar_show_holidays' => false,
                'calendar_default_desktop_view' => 'month',
                'calendar_default_mobile_view' => 'day',
                'unconfirmed_lesson_color' => '#3057D5',
                'unpaid_lesson_color' => '#AA0000',
                'paid_lesson_color' => '#00AA00',
                'canceled_lesson_color' => '#777777',
                'general_event_color' => '#9900AA',
                'calendar_show_cancelled' => true,
                'calendar_add_transparency_to_past_events' => false,
                'calendar_highlight_conflicting_events' => false,
                'default_event_notification_minutes_before' => 120,
            ])
            ->assertRedirect(route('calendar.home'))
            ->assertSessionHas('success', 'Settings updated');

        $this->assertDatabaseHas('settings', [
            'key' => 'calendar.show_insights',
            'value' => 'false',
            'type' => Settings::TYPE_BOOLEAN,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'calendar.show_holidays',
            'value' => 'false',
            'type' => Settings::TYPE_BOOLEAN,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'calendar.default_desktop_view',
            'value' => 'month',
            'type' => Settings::TYPE_STRING,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'calendar.default_mobile_view',
            'value' => 'day',
            'type' => Settings::TYPE_STRING,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'appearance.unconfirmed_lesson_color',
            'value' => '#3057d5',
            'type' => Settings::TYPE_STRING,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'appearance.unpaid_lesson_color',
            'value' => '#aa0000',
            'type' => Settings::TYPE_STRING,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'appearance.paid_lesson_color',
            'value' => '#00aa00',
            'type' => Settings::TYPE_STRING,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'appearance.canceled_lesson_color',
            'value' => '#777777',
            'type' => Settings::TYPE_STRING,
        ]);
        $this->assertDatabaseHas('settings', [
            'key' => 'appearance.general_event_color',
            'value' => '#9900aa',
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

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('data-transparent-past-events', false);

        Settings::setValue('calendar.add_transparency_to_past_events', false, Settings::TYPE_BOOLEAN);

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertDontSee('data-transparent-past-events', false);
    }

    /** @test */
    public function the_default_calendar_views_are_exposed_to_the_calendar()
    {
        $this->signIn();

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('window.calendarDefaultDesktopCalendarView = "week";', false)
            ->assertSee('window.calendarDefaultMobileCalendarView = "2-days";', false);

        Settings::setValue('calendar.default_desktop_view', 'month');
        Settings::setValue('calendar.default_mobile_view', 'day');

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('window.calendarDefaultDesktopCalendarView = "month";', false)
            ->assertSee('window.calendarDefaultMobileCalendarView = "day";', false);
    }

    /** @test */
    public function the_appearance_colors_are_exposed_to_the_calendar_styles()
    {
        $this->signIn();

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('--calendar-unconfirmed-lesson-color: #6b7280;', false)
            ->assertSee('--calendar-unpaid-lesson-color: #ff4b4b;', false)
            ->assertSee('--calendar-paid-lesson-color: #58cc02;', false)
            ->assertSee('--calendar-canceled-lesson-color: #ffffff;', false)
            ->assertSee('--calendar-general-event-color: #ce82ff;', false);

        Settings::setValue('appearance.unconfirmed_lesson_color', '#3057d5');
        Settings::setValue('appearance.unpaid_lesson_color', '#aa0000');
        Settings::setValue('appearance.paid_lesson_color', '#00aa00');
        Settings::setValue('appearance.canceled_lesson_color', '#777777');
        Settings::setValue('appearance.general_event_color', '#9900aa');

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('--calendar-unconfirmed-lesson-color: #3057d5;', false)
            ->assertSee('--calendar-unpaid-lesson-color: #aa0000;', false)
            ->assertSee('--calendar-paid-lesson-color: #00aa00;', false)
            ->assertSee('--calendar-canceled-lesson-color: #777777;', false)
            ->assertSee('--calendar-general-event-color: #9900aa;', false);
    }

    /** @test */
    public function calendar_insights_and_nearby_birthdays_follow_the_display_preference()
    {
        $this->signIn();

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('calendar-calendar-insights-birthdays', false)
            ->assertSee('data-calendar-lessons-count', false);

        Settings::setValue('calendar.show_insights', false, Settings::TYPE_BOOLEAN);

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertDontSee('calendar-calendar-insights-birthdays', false)
            ->assertDontSee('data-calendar-lessons-count', false);
    }

    /** @test */
    public function holidays_follow_the_calendar_view_preference()
    {
        $this->signIn();

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('window.calendarShowHolidays = true;', false);

        Settings::setValue('calendar.show_holidays', false, Settings::TYPE_BOOLEAN);

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('window.calendarShowHolidays = false;', false);
    }

    /** @test */
    public function conflicting_event_highlights_follow_the_calendar_view_preference()
    {
        $this->signIn();

        $this->get(route('calendar.home'))
            ->assertOk()
            ->assertSee('data-highlight-conflicting-events', false);

        Settings::setValue('calendar.highlight_conflicting_events', false, Settings::TYPE_BOOLEAN);

        $this->get(route('calendar.home'))
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

        $calendarUrl = route('calendar.home', [
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

        $this->assertSame(30, \App\Models\Calendar\Event::defaultNotificationMinutesBefore());

        Settings::setValue('notifications.default_event_minutes_before', -1, Settings::TYPE_INTEGER);

        $this->assertNull(\App\Models\Calendar\Event::defaultNotificationMinutesBefore());
    }
}
