<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Calendar\Event;
use App\Notifications\EventReminder;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Notification;
use Tests\BaseTest;

class EventTest extends BaseTest
{
    /** @test */
    public function it_shows_the_events_page_and_management_modal()
    {
        $this->signIn();

        $this->get(route('calendar.events.index'))
            ->assertOk()
            ->assertSee('New event')
            ->assertSee('events-table', false)
            ->assertSee('create-event-modal', false)
            ->assertDontSee('<th>Notes</th>', false)
            ->assertDontSee('type="time"', false)
            ->assertSee('name="starts_at"', false)
            ->assertSee('name="ends_at"', false)
            ->assertSee('value="09:00"', false)
            ->assertSee('value="09:15"', false)
            ->assertSee('value="09:30"', false)
            ->assertSee('value="09:45"', false);
    }

    /** @test */
    public function it_creates_updates_and_deletes_an_event()
    {
        $this->signIn();

        $this->post(route('calendar.events.store'), [
            'name' => 'Dinner reservation',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '18:30',
            'ends_at' => '20:00',
            'type' => 'Restaurant',
            'notes' => 'Reservation details https://example.com/reservation',
        ])->assertRedirect();

        $event = Event::where('name', 'Dinner reservation')->firstOrFail();

        $this->patch(route('calendar.events.update', $event), [
            'name' => 'Dinner with friends',
            'scheduled_date' => '2026-08-16',
            'starts_at' => '19:00',
            'ends_at' => '21:00',
            'type' => 'Meeting',
            'notes' => 'Updated notes',
        ])->assertRedirect();

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'name' => 'Dinner with friends',
            'starts_at' => '19:00',
            'ends_at' => '21:00',
            'type' => 'Meeting',
            'notes' => 'Updated notes',
        ]);
        $this->assertSame('2026-08-16', $event->fresh()->scheduled_date->toDateString());

        $this->delete(route('calendar.events.destroy', $event))->assertRedirect();
        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

    /** @test */
    public function event_type_must_be_one_of_the_available_options()
    {
        $this->signIn();

        $this->post(route('calendar.events.store'), [
            'name' => 'Appointment',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '14:00',
            'ends_at' => '15:00',
            'type' => 'Unsupported type',
        ])->assertSessionHasErrors('type');
    }

    /** @test */
    public function an_event_must_end_after_it_starts()
    {
        $this->signIn();

        $this->post(route('calendar.events.store'), [
            'name' => 'Appointment',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '14:00',
            'ends_at' => '13:00',
        ])->assertSessionHasErrors('ends_at');
    }

    /** @test */
    public function event_times_must_use_fifteen_minute_intervals()
    {
        $this->signIn();

        $this->post(route('calendar.events.store'), [
            'name' => 'Appointment',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '14:10',
            'ends_at' => '15:00',
        ])->assertSessionHasErrors('starts_at');
    }

    /** @test */
    public function calendar_modal_can_reschedule_an_event_with_json()
    {
        $event = Event::factory()->create([
            'name' => 'Lunch meeting',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '12:00',
            'ends_at' => '13:00',
            'notes' => 'Keep these notes',
        ]);
        $this->signIn();

        $this->patchJson(route('calendar.events.reschedule', $event), [
            'scheduled_date' => '2026-08-18',
            'starts_at' => '13:30',
            'ends_at' => '14:45',
        ])
            ->assertOk()
            ->assertJsonPath('event.id', $event->id)
            ->assertJsonPath('event.scheduled_date', '2026-08-18')
            ->assertJsonPath('event.starts_at', '13:30');

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'name' => 'Lunch meeting',
            'scheduled_date' => '2026-08-18 00:00:00',
            'starts_at' => '13:30',
            'ends_at' => '14:45',
            'notes' => 'Keep these notes',
        ]);
    }

    /** @test */
    public function calendar_modal_can_load_and_edit_an_event_with_json()
    {
        $event = Event::factory()->create([
            'name' => 'Lunch meeting',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '12:00',
            'ends_at' => '13:00',
            'type' => 'Meeting',
            'notes' => 'Original notes',
        ]);
        $this->signIn();

        $this->get(route('calendar.events.edit', $event))
            ->assertOk()
            ->assertSee('edit-event-'.$event->id.'-modal', false)
            ->assertSee('value="Meeting"', false)
            ->assertSee('btn btn-secondary btn-sm btn-wide', false);

        $this->patchJson(route('calendar.events.update', $event), [
            'name' => 'Updated lunch meeting',
            'scheduled_date' => '2026-08-16',
            'starts_at' => '12:15',
            'ends_at' => '13:30',
            'type' => 'Doctor',
            'notes' => 'Updated notes',
        ])
            ->assertOk()
            ->assertJsonPath('event.id', $event->id)
            ->assertJsonPath('event.name', 'Updated lunch meeting')
            ->assertJsonPath('event.event_type', 'Doctor')
            ->assertJsonPath('event.edit_url', route('calendar.events.edit', $event));
    }

    /** @test */
    public function calendar_modal_can_cancel_an_event_with_json()
    {
        $event = Event::factory()->create();
        $this->signIn();

        $this->deleteJson(route('calendar.events.destroy', $event))
            ->assertOk()
            ->assertJsonPath('event_id', $event->id);

        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

    /** @test */
    public function it_serves_events_to_the_calendar_table()
    {
        Event::factory()->create([
            'name' => 'Dentist appointment',
            'scheduled_date' => '2026-09-10',
            'starts_at' => '10:00',
            'ends_at' => '11:00',
            'notes' => 'Bring insurance card',
        ]);
        $this->signIn();

        $row = collect($this->getJson(route('calendar.tables.events'))->assertOk()->json('data'))
            ->firstWhere('name', 'Dentist appointment');

        $this->assertSame('2026-09-10', $row['scheduled_date']);
        $this->assertSame('10:00', substr($row['starts_at'], 0, 5));
        $this->assertSame('Bring insurance card', $row['notes']);
    }

    /** @test */
    public function it_includes_general_events_in_the_calendar_range()
    {
        $user = $this->signIn();

        Event::factory()->create([
            'name' => 'Calendar meeting',
            'scheduled_date' => '2026-10-20',
            'starts_at' => '15:00',
            'ends_at' => '16:30',
            'notes' => 'Agenda at https://example.com/agenda',
            'notification_user_id' => $user->id,
            'notification_minutes_before' => 120,
        ]);
        Event::factory()->create(['scheduled_date' => '2026-11-20']);

        $payload = app(Scheduler::class)->payload(request()->merge([
            'range_start' => '2026-10-01',
            'range_end' => '2026-10-31',
        ]));

        $this->assertCount(1, $payload['generalEvents']);
        $this->assertSame('Calendar meeting', $payload['generalEvents'][0]['name']);
        $this->assertSame('2026-10-20', $payload['generalEvents'][0]['scheduled_date']);
        $this->assertSame(120, $payload['generalEvents'][0]['notification_minutes_before']);
        $this->assertSame(route('calendar.events.edit', $payload['generalEvents'][0]['id']), $payload['generalEvents'][0]['edit_url']);
        $this->assertSame('https://example.com/agenda', str($payload['generalEvents'][0]['notes'])->after('Agenda at ')->toString());
    }

    /** @test */
    public function calendar_has_the_general_event_modal_and_event_type_filters()
    {
        $this->signIn();

        $this->get(route('calendar.home', [
            'view' => 'week',
            'date' => '2026-10-20',
            'range_start' => '2026-10-18',
            'range_end' => '2026-10-24',
        ]))
            ->assertOk()
            ->assertSee('general-event-modal', false)
            ->assertSee('general-event-notification', false)
            ->assertSee('data-general-event-notes-section', false)
            ->assertSee('event-edit', false)
            ->assertSee('lesson-edit', false)
            ->assertSee('calendar-edit-modal-container', false)
            ->assertSee('calendarLessonPlanEditUrlTemplate', false)
            ->assertSee('calendarSingleLessonPlanEditUrlTemplate', false)
            ->assertSee('cancel-general-event-button', false)
            ->assertSee('reschedule-general-event-button', false)
            ->assertSee('reschedule-general-event-date', false)
            ->assertSee('create-event-modal', false)
            ->assertSee('data-calendar-create-event', false)
            ->assertSee('General Event')
            ->assertSee('calendar-event-type-recurring', false)
            ->assertSee('calendar-event-type-single', false)
            ->assertSee('calendar-event-type-general', false);
    }

    /** @test */
    public function an_event_can_send_a_notification_to_the_user_who_enabled_it()
    {
        $user = $this->signIn();

        $this->post(route('calendar.events.store'), [
            'name' => 'Doctor appointment',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '12:00',
            'ends_at' => '13:00',
            'send_notification' => '1',
            'notification_minutes_before' => '15',
        ])->assertRedirect();

        $this->assertDatabaseHas('events', [
            'name' => 'Doctor appointment',
            'notification_user_id' => $user->id,
            'notification_minutes_before' => 15,
            'notification_sent_at' => null,
        ]);
    }

    /** @test */
    public function a_device_push_subscription_can_be_saved_and_removed()
    {
        $user = $this->signIn();
        $payload = [
            'endpoint' => 'https://push.example.com/subscription/123',
            'keys' => [
                'p256dh' => 'public-key',
                'auth' => 'auth-token',
            ],
            'content_encoding' => 'aes128gcm',
        ];

        $this->postJson(route('calendar.push-subscriptions.store'), $payload)->assertOk();

        $this->assertDatabaseHas('push_subscriptions', [
            'subscribable_id' => $user->id,
            'subscribable_type' => $user->getMorphClass(),
            'endpoint' => $payload['endpoint'],
            'public_key' => 'public-key',
            'auth_token' => 'auth-token',
        ]);

        $this->deleteJson(route('calendar.push-subscriptions.destroy'), [
            'endpoint' => $payload['endpoint'],
        ])->assertOk();

        $this->assertDatabaseMissing('push_subscriptions', ['endpoint' => $payload['endpoint']]);
    }

    /** @test */
    public function the_scheduler_sends_a_due_event_reminder_once()
    {
        Notification::fake();
        CarbonImmutable::setTestNow(CarbonImmutable::parse('2026-08-15 11:50:00', config('calendar.timezone')));

        $user = $this->signIn();
        $user->updatePushSubscription(
            'https://push.example.com/subscription/123',
            'public-key',
            'auth-token',
            'aes128gcm'
        );
        $event = Event::factory()->create([
            'name' => 'Lunch meeting',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '12:00',
            'ends_at' => '13:00',
            'notification_user_id' => $user->id,
            'notification_minutes_before' => 15,
            'notification_sent_at' => null,
        ]);

        $this->artisan('calendar:send-event-reminders')->assertSuccessful();
        $this->artisan('calendar:send-event-reminders')->assertSuccessful();

        Notification::assertSentToTimes($user, EventReminder::class, 1);
        $this->assertNotNull($event->fresh()->notification_sent_at);

        CarbonImmutable::setTestNow();
    }

    /** @test */
    public function an_event_can_notify_at_its_start_time()
    {
        Notification::fake();
        CarbonImmutable::setTestNow(CarbonImmutable::parse('2026-08-15 12:00:00', config('calendar.timezone')));

        $user = $this->signIn();
        $user->updatePushSubscription(
            'https://push.example.com/subscription/at-start',
            'public-key',
            'auth-token',
            'aes128gcm'
        );
        $event = Event::factory()->create([
            'scheduled_date' => '2026-08-15',
            'starts_at' => '12:00',
            'ends_at' => '13:00',
            'notification_user_id' => $user->id,
            'notification_minutes_before' => 0,
        ]);

        $this->artisan('calendar:send-event-reminders')->assertSuccessful();

        Notification::assertSentTo($user, EventReminder::class);
        $this->assertNotNull($event->fresh()->notification_sent_at);

        CarbonImmutable::setTestNow();
    }
}
