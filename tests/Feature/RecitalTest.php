<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Calendar\{Location, Recital, Student};
use Tests\BaseTest;

class RecitalTest extends BaseTest
{
    /** @test */
    public function it_shows_the_recitals_page_and_management_modals()
    {
        Location::factory()->create(['name' => 'Teaching Studio']);
        Location::factory()->recital()->create(['name' => 'Concert Hall']);
        Student::factory()->create(['first_name' => 'Maria', 'last_name' => 'Silva']);
        $this->signIn();

        $this->get(route('calendar.recitals.index'))
            ->assertOk()
            ->assertSee('New recital')
            ->assertSee(mix('css/calendar.css'), false)
            ->assertSee('recital-participants-modal', false)
            ->assertDontSee('type="time"', false)
            ->assertSee('name="start_time"', false)
            ->assertSee('Concert Hall')
            ->assertDontSee('Teaching Studio')
            ->assertSee('Maria Silva');
    }

    /** @test */
    public function it_creates_updates_and_deletes_a_recital()
    {
        $location = Location::factory()->recital()->create();
        $this->signIn();

        $this->post(route('calendar.recitals.store'), [
            'name' => 'Spring Recital',
            'date' => '2026-08-15',
            'start_time' => '18:30',
            'location_id' => $location->id,
        ])->assertRedirect();

        $recital = Recital::where('name', 'Spring Recital')->firstOrFail();

        $this->patch(route('calendar.recitals.update', $recital), [
            'name' => 'Summer Recital',
            'date' => '2026-08-16',
            'start_time' => '19:00',
            'location_id' => $location->id,
        ])->assertRedirect();

        $this->assertDatabaseHas('recitals', [
            'id' => $recital->id,
            'name' => 'Summer Recital',
            'start_time' => '19:00',
        ]);
        $this->assertSame('2026-08-16', $recital->fresh()->date->toDateString());

        $this->delete(route('calendar.recitals.destroy', $recital))->assertRedirect();
        $this->assertDatabaseMissing('recitals', ['id' => $recital->id]);
    }

    /** @test */
    public function it_only_syncs_participants_when_the_participant_form_is_confirmed()
    {
        $recital = Recital::factory()->create();
        $students = Student::factory()->count(3)->create();
        $recital->students()->attach($students[0]);
        $this->signIn();

        $this->patch(route('calendar.recitals.students.update', $recital), [
            'student_ids' => [$students[1]->id, $students[2]->id],
        ])->assertRedirect();

        $this->assertEqualsCanonicalizing(
            [$students[1]->id, $students[2]->id],
            $recital->fresh()->students()->pluck('students.id')->all()
        );
    }

    /** @test */
    public function recital_times_must_use_fifteen_minute_intervals()
    {
        $this->signIn();

        $this->post(route('calendar.recitals.store'), [
            'name' => 'Spring Recital',
            'date' => '2026-08-15',
            'start_time' => '18:10',
        ])->assertSessionHasErrors('start_time');
    }

    /** @test */
    public function recital_locations_must_be_configured_for_recitals()
    {
        $teachingLocation = Location::factory()->create();
        $this->signIn();

        $this->post(route('calendar.recitals.store'), [
            'name' => 'Spring Recital',
            'date' => '2026-08-15',
            'start_time' => '18:00',
            'location_id' => $teachingLocation->id,
        ])->assertSessionHasErrors('location_id');
    }

    /** @test */
    public function it_serves_recitals_and_participants_to_the_calendar_table()
    {
        $recital = Recital::factory()->create(['name' => 'Calendar Showcase']);
        $student = Student::factory()->create(['first_name' => 'Maria', 'last_name' => 'Silva']);
        $recital->students()->attach($student);
        $this->signIn();

        $row = collect($this->getJson(route('calendar.tables.recitals'))->assertOk()->json('data'))
            ->firstWhere('id', $recital->id);

        $this->assertSame('Calendar Showcase', $row['name']);
        $this->assertSame(1, $row['students_count']);
        $this->assertSame('Maria Silva', $row['students'][0]['name']);
    }

    /** @test */
    public function it_includes_recitals_in_the_calendar_payload()
    {
        $location = Location::factory()->recital()->create([
            'name' => 'Concert Hall',
            'address' => '10 Music Avenue',
            'city' => 'Brooklyn',
            'state' => 'NY',
            'postal_code' => '11201',
        ]);
        $student = Student::factory()->create(['first_name' => 'Ana', 'last_name' => 'Costa']);
        $recital = Recital::factory()->create([
            'name' => 'Fall Recital',
            'date' => '2026-10-20',
            'start_time' => '18:00',
            'location_id' => $location->id,
        ]);
        $recital->students()->attach($student);

        $payload = app(Scheduler::class)->payload(request()->merge([
            'range_start' => '2026-10-01',
            'range_end' => '2026-10-31',
        ]));

        $event = collect($payload['recitals'])->firstWhere('id', $recital->id);

        $this->assertSame('Fall Recital', $event['name']);
        $this->assertSame('Concert Hall', $event['location']['name']);
        $this->assertSame('10 Music Avenue, Brooklyn, NY, 11201', $event['location']['address']);
        $this->assertSame(
            'https://www.google.com/maps/search/?api=1&query=10+Music+Avenue%2C+Brooklyn%2C+NY%2C+11201',
            $event['location']['map_url']
        );
        $this->assertSame('Ana Costa', $event['students'][0]['name']);
    }
}
