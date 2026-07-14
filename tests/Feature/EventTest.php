<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Event;
use Tests\BaseTest;

class EventTest extends BaseTest
{
    /** @test */
    public function it_shows_the_events_page_and_management_modal()
    {
        $this->signIn();

        $this->get(route('studio.events.index'))
            ->assertOk()
            ->assertSee('New event')
            ->assertSee('events-table', false)
            ->assertSee('create-event-modal', false)
            ->assertDontSee('type="time"', false)
            ->assertSee('name="starts_at"', false)
            ->assertSee('name="ends_at"', false)
            ->assertSee('value="05:00"', false)
            ->assertSee('value="05:15"', false)
            ->assertSee('value="05:30"', false)
            ->assertSee('value="05:45"', false);
    }

    /** @test */
    public function it_creates_updates_and_deletes_an_event()
    {
        $this->signIn();

        $this->post(route('studio.events.store'), [
            'name' => 'Dinner reservation',
            'scheduled_date' => '2026-08-15',
            'starts_at' => '18:30',
            'ends_at' => '20:00',
            'notes' => 'Reservation details https://example.com/reservation',
        ])->assertRedirect();

        $event = Event::where('name', 'Dinner reservation')->firstOrFail();

        $this->patch(route('studio.events.update', $event), [
            'name' => 'Dinner with friends',
            'scheduled_date' => '2026-08-16',
            'starts_at' => '19:00',
            'ends_at' => '21:00',
            'notes' => 'Updated notes',
        ])->assertRedirect();

        $this->assertDatabaseHas('events', [
            'id' => $event->id,
            'name' => 'Dinner with friends',
            'starts_at' => '19:00',
            'ends_at' => '21:00',
            'notes' => 'Updated notes',
        ]);
        $this->assertSame('2026-08-16', $event->fresh()->scheduled_date->toDateString());

        $this->delete(route('studio.events.destroy', $event))->assertRedirect();
        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

    /** @test */
    public function an_event_must_end_after_it_starts()
    {
        $this->signIn();

        $this->post(route('studio.events.store'), [
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

        $this->post(route('studio.events.store'), [
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

        $this->patchJson(route('studio.events.reschedule', $event), [
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
    public function calendar_modal_can_cancel_an_event_with_json()
    {
        $event = Event::factory()->create();
        $this->signIn();

        $this->deleteJson(route('studio.events.destroy', $event))
            ->assertOk()
            ->assertJsonPath('event_id', $event->id);

        $this->assertDatabaseMissing('events', ['id' => $event->id]);
    }

    /** @test */
    public function it_serves_events_to_the_studio_table()
    {
        Event::factory()->create([
            'name' => 'Dentist appointment',
            'scheduled_date' => '2026-09-10',
            'starts_at' => '10:00',
            'ends_at' => '11:00',
            'notes' => 'Bring insurance card',
        ]);
        $this->signIn();

        $row = collect($this->getJson(route('studio.tables.events'))->assertOk()->json('data'))
            ->firstWhere('name', 'Dentist appointment');

        $this->assertSame('2026-09-10', $row['scheduled_date']);
        $this->assertSame('10:00', substr($row['starts_at'], 0, 5));
        $this->assertSame('Bring insurance card', $row['notes']);
    }

    /** @test */
    public function it_includes_general_events_in_the_calendar_range()
    {
        Event::factory()->create([
            'name' => 'Studio meeting',
            'scheduled_date' => '2026-10-20',
            'starts_at' => '15:00',
            'ends_at' => '16:30',
            'notes' => 'Agenda at https://example.com/agenda',
        ]);
        Event::factory()->create(['scheduled_date' => '2026-11-20']);

        $payload = app(Scheduler::class)->payload(request()->merge([
            'range_start' => '2026-10-01',
            'range_end' => '2026-10-31',
        ]));

        $this->assertCount(1, $payload['generalEvents']);
        $this->assertSame('Studio meeting', $payload['generalEvents'][0]['name']);
        $this->assertSame('2026-10-20', $payload['generalEvents'][0]['scheduled_date']);
        $this->assertSame('https://example.com/agenda', str($payload['generalEvents'][0]['notes'])->after('Agenda at ')->toString());
    }

    /** @test */
    public function calendar_has_the_general_event_modal_and_event_type_filters()
    {
        $this->signIn();

        $this->get(route('studio.home', [
            'view' => 'week',
            'date' => '2026-10-20',
            'range_start' => '2026-10-18',
            'range_end' => '2026-10-24',
        ]))
            ->assertOk()
            ->assertSee('general-event-modal', false)
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
}
