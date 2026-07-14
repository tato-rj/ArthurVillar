<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Recital;
use App\Models\Student;
use App\Models\Venue;
use Tests\BaseTest;

class RecitalTest extends BaseTest
{
    /** @test */
    public function it_shows_the_recitals_page_and_management_modals()
    {
        Student::factory()->create(['first_name' => 'Maria', 'last_name' => 'Silva']);
        $this->signIn();

        $this->get(route('studio.recitals.index'))
            ->assertOk()
            ->assertSee('New recital')
            ->assertSee(mix('css/studio.css'), false)
            ->assertSee('recital-participants-modal', false)
            ->assertSee('Maria Silva');
    }

    /** @test */
    public function it_creates_updates_and_deletes_a_recital()
    {
        $venue = Venue::factory()->create();
        $this->signIn();

        $this->post(route('studio.recitals.store'), [
            'name' => 'Spring Recital',
            'date' => '2026-08-15',
            'start_time' => '18:30',
            'venue_id' => $venue->id,
        ])->assertRedirect();

        $recital = Recital::where('name', 'Spring Recital')->firstOrFail();

        $this->patch(route('studio.recitals.update', $recital), [
            'name' => 'Summer Recital',
            'date' => '2026-08-16',
            'start_time' => '19:00',
            'venue_id' => $venue->id,
        ])->assertRedirect();

        $this->assertDatabaseHas('recitals', [
            'id' => $recital->id,
            'name' => 'Summer Recital',
            'start_time' => '19:00',
        ]);
        $this->assertSame('2026-08-16', $recital->fresh()->date->toDateString());

        $this->delete(route('studio.recitals.destroy', $recital))->assertRedirect();
        $this->assertDatabaseMissing('recitals', ['id' => $recital->id]);
    }

    /** @test */
    public function it_only_syncs_participants_when_the_participant_form_is_confirmed()
    {
        $recital = Recital::factory()->create();
        $students = Student::factory()->count(3)->create();
        $recital->students()->attach($students[0]);
        $this->signIn();

        $this->patch(route('studio.recitals.students.update', $recital), [
            'student_ids' => [$students[1]->id, $students[2]->id],
        ])->assertRedirect();

        $this->assertEqualsCanonicalizing(
            [$students[1]->id, $students[2]->id],
            $recital->fresh()->students()->pluck('students.id')->all()
        );
    }

    /** @test */
    public function it_serves_recitals_and_participants_to_the_studio_table()
    {
        $recital = Recital::factory()->create(['name' => 'Studio Showcase']);
        $student = Student::factory()->create(['first_name' => 'Maria', 'last_name' => 'Silva']);
        $recital->students()->attach($student);
        $this->signIn();

        $row = collect($this->getJson(route('studio.tables.recitals'))->assertOk()->json('data'))
            ->firstWhere('id', $recital->id);

        $this->assertSame('Studio Showcase', $row['name']);
        $this->assertSame(1, $row['students_count']);
        $this->assertSame('Maria Silva', $row['students'][0]['name']);
    }

    /** @test */
    public function it_includes_recitals_in_the_calendar_payload()
    {
        $venue = Venue::factory()->create([
            'name' => 'Concert Hall',
            'address' => '10 Music Avenue',
            'city' => 'Brooklyn',
            'state' => 'NY',
            'postal_code' => '11201',
            'map_url' => 'https://maps.google.com/?q=Concert+Hall',
        ]);
        $student = Student::factory()->create(['first_name' => 'Ana', 'last_name' => 'Costa']);
        $recital = Recital::factory()->create([
            'name' => 'Fall Recital',
            'date' => '2026-10-20',
            'start_time' => '18:00',
            'venue_id' => $venue->id,
        ]);
        $recital->students()->attach($student);

        $payload = app(Scheduler::class)->payload(request()->merge([
            'range_start' => '2026-10-01',
            'range_end' => '2026-10-31',
        ]));

        $event = collect($payload['recitals'])->firstWhere('id', $recital->id);

        $this->assertSame('Fall Recital', $event['name']);
        $this->assertSame('Concert Hall', $event['venue']['name']);
        $this->assertSame('10 Music Avenue, Brooklyn, NY, 11201', $event['venue']['address']);
        $this->assertSame('https://maps.google.com/?q=Concert+Hall', $event['venue']['map_url']);
        $this->assertSame('Ana Costa', $event['students'][0]['name']);
    }
}
