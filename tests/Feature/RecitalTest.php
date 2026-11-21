<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Calendar\{LessonPlan, Location, Recital, SingleLessonPlan, Student};
use Carbon\Carbon;
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

    public function test_lesson_students_get_their_next_recital_even_outside_the_calendar_range()
    {
        $this->travelTo(Carbon::parse('2026-11-19 12:00', config('calendar.timezone')));
        [$recurringStudent, $singleStudent, $unrelatedStudent] = Student::factory()->count(3)->create();
        LessonPlan::factory()->student($recurringStudent)->create([
            'starts_on' => '2026-11-19',
            'weekday' => LessonPlan::fromCarbonWeekday(Carbon::THURSDAY),
        ]);
        SingleLessonPlan::factory()->student($singleStudent)->create(['scheduled_date' => '2026-11-19']);
        $venue = Location::factory()->recital()->create(['name' => 'Concert Hall']);
        Recital::factory()->create(['date' => '2026-11-19', 'start_time' => '11:00'])
            ->students()->attach($recurringStudent);
        Recital::factory()->create(['date' => '2026-12-12', 'start_time' => '19:30'])
            ->students()->attach($recurringStudent);
        Recital::factory()->create([
            'name' => 'Winter Recital',
            'date' => '2026-12-12',
            'start_time' => '18:00',
            'location_id' => $venue->id,
        ])->students()->attach([$recurringStudent->id, $unrelatedStudent->id]);
        Recital::factory()->create([
            'name' => 'Studio Recital',
            'date' => '2026-11-19',
            'start_time' => '16:30',
            'location_id' => null,
        ])->students()->attach($singleStudent);

        $this->signIn();
        $range = [
            'view' => 'day',
            'date' => '2026-11-19',
            'range_start' => '2026-11-18',
            'range_end' => '2026-11-20',
        ];
        $recitalDetails = [
            'name' => 'Winter Recital',
            'date' => '2026-12-12',
            'start_time' => '18:00',
            'location_name' => 'Concert Hall',
        ];

        $page = $this->get(route('calendar.home', $range))
            ->assertOk()
            ->assertSee('data-lesson-recital-section', false);
        $this->assertSame($recitalDetails, $page->viewData('nextRecitalsByStudent')->get($recurringStudent->id));

        $this->getJson(route('calendar.home', $range + ['lesson_plans' => 1]))
            ->assertOk()
            ->assertJsonCount(2, 'recitals')
            ->assertJsonPath('nextRecitalsByStudent.'.$recurringStudent->id, $recitalDetails)
            ->assertJsonPath('nextRecitalsByStudent.'.$singleStudent->id, [
                'name' => 'Studio Recital',
                'date' => '2026-11-19',
                'start_time' => '16:30',
                'location_name' => null,
            ])
            ->assertJsonMissingPath('nextRecitalsByStudent.'.$unrelatedStudent->id);
    }

    public function test_lesson_recital_picker_lists_all_upcoming_recitals_in_schedule_order()
    {
        $this->travelTo(Carbon::parse('2026-11-21 12:00', config('calendar.timezone')));
        $student = Student::factory()->create();
        $this->signIn();
        $range = [
            'view' => 'day',
            'date' => '2026-11-21',
            'range_start' => '2026-11-20',
            'range_end' => '2026-11-22',
            'lesson_plans' => 1,
        ];
        Recital::factory()->create(['date' => '2026-11-21', 'start_time' => '11:00']);

        $this->getJson(route('calendar.home', $range))->assertOk()
            ->assertJsonPath('hasUpcomingRecitals', false);

        $later = Recital::factory()->create(['date' => '2026-12-28', 'start_time' => '18:00']);
        $joined = Recital::factory()->create(['date' => '2026-11-21', 'start_time' => '19:00']);
        $first = Recital::factory()->create(['date' => '2026-11-21', 'start_time' => '15:00']);
        $joined->students()->attach($student);

        $this->getJson(route('calendar.home', $range))->assertOk()
            ->assertJsonPath('hasUpcomingRecitals', true)
            ->assertJsonCount(3, 'recitals');
        $this->getJson(route('calendar.students.upcoming-recitals', $student))
            ->assertOk()
            ->assertJsonCount(3, 'recitals')
            ->assertJsonPath('recitals.0.id', $first->id)
            ->assertJsonPath('recitals.0.joined', false)
            ->assertJsonPath('recitals.1.id', $joined->id)
            ->assertJsonPath('recitals.1.joined', true)
            ->assertJsonPath('recitals.2.id', $later->id);
    }

    public function test_joining_recitals_adds_multiple_assignments_and_can_be_retried()
    {
        $this->travelTo(Carbon::parse('2026-11-21 12:00', config('calendar.timezone')));
        [$student, $otherStudent] = Student::factory()->count(2)->create();
        $first = Recital::factory()->create(['name' => 'Winter Showcase', 'date' => '2026-12-06', 'start_time' => '17:30']);
        $second = Recital::factory()->create(['date' => '2026-12-20']);
        $existing = Recital::factory()->create(['date' => '2026-12-30']);
        $existing->students()->attach($student);
        $first->students()->attach($otherStudent);
        $this->signIn();

        $url = route('calendar.students.upcoming-recitals.update', $student);
        $selection = ['recital_ids' => [$first->id, $second->id]];
        $this->patchJson($url, $selection)->assertOk()
            ->assertJsonPath('student.id', $student->id)
            ->assertJsonPath('recital_ids', $selection['recital_ids'])
            ->assertJsonPath('next_recital.name', $first->name)
            ->assertJsonPath('next_recital.date', '2026-12-06');
        $this->patchJson($url, $selection)->assertOk();

        $this->assertEqualsCanonicalizing([$first->id, $second->id, $existing->id], $student->recitals()->pluck('recitals.id')->all());
        $this->assertEqualsCanonicalizing([$student->id, $otherStudent->id], $first->students()->pluck('students.id')->all());
    }

    public function test_joining_recitals_rejects_a_stale_selection_without_partial_assignments()
    {
        $this->travelTo(Carbon::parse('2026-11-21 12:00', config('calendar.timezone')));
        $student = Student::factory()->create();
        $past = Recital::factory()->create(['date' => '2026-11-21', 'start_time' => '11:00']);
        $upcoming = Recital::factory()->create(['date' => '2026-11-21', 'start_time' => '14:00']);
        $this->signIn();

        $this->patchJson(route('calendar.students.upcoming-recitals.update', $student), [
            'recital_ids' => [$past->id, $upcoming->id],
        ])->assertUnprocessable()->assertJsonValidationErrors('recital_ids');

        $this->assertFalse($student->recitals()->exists());
    }
}
