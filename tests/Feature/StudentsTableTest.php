<?php

namespace Tests\Feature;

use Carbon\Carbon;
use App\Models\Calendar\{Holiday, Lesson, LessonPlan, Location, SingleLessonPlan, Student, TeachingBreak};
use Tests\BaseTest;

class StudentsTableTest extends BaseTest
{
    /** @test */
    public function it_opens_student_editing_in_a_modal_from_the_index()
    {
        $student = Student::factory()->create([
            'first_name' => 'Nora',
            'last_name' => 'Stone',
            'email' => 'nora@example.com',
        ]);
        $this->signIn();

        $this->get(route('calendar.students.index'))
            ->assertOk()
            ->assertSee('js-edit-student')
            ->assertSee('edit-student-modal-container')
            ->assertSee('circle-info')
            ->assertSee('infoUrl');

        $this->get(route('calendar.students.edit', $student))
            ->assertOk()
            ->assertViewIs('calendar.students.edit')
            ->assertSee('Edit student')
            ->assertSee('Nora')
            ->assertSee('Stone')
            ->assertSee(route('calendar.students.update', $student), false)
            ->assertSee('edit-student-'.$student->id.'-modal')
            ->assertDontSee('<section class="container py-5">', false);
    }

    /** @test */
    public function it_shows_student_registrations_confirmed_unpaid_and_future_missed_lessons()
    {
        Carbon::setTestNow('2026-07-01 12:00:00');

        $location = Location::factory()->create();
        $otherLocation = Location::factory()->create();
        $student = Student::factory()->create(['first_name' => 'Nora', 'last_name' => 'Stone']);
        LessonPlan::factory()->student($student)->create([
            'location_id' => $location->id,
            'weekday' => 4,
            'start_time' => '15:30',
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-07-31',
            'recurrence_interval' => 1,
        ]);
        $lessonPlan = $student->lessonPlans()->firstOrFail();
        SingleLessonPlan::factory()->student($student)->create([
            'location_id' => $location->id,
            'scheduled_date' => '2026-08-05',
            'start_time' => '16:00',
            'duration_minutes' => 45,
            'status' => 'active',
        ]);
        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'starts_at' => '2026-07-02 15:30:00',
            'ends_at' => '2026-07-02 16:15:00',
            'paid_at' => '2026-07-01 09:00:00',
            'fee_amount' => 6500,
            'canceled_at' => null,
        ]);
        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'starts_at' => '2026-07-03 15:30:00',
            'ends_at' => '2026-07-03 16:15:00',
            'paid_at' => null,
            'fee_amount' => 5500,
            'canceled_at' => null,
        ]);
        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'starts_at' => '2026-07-04 15:30:00',
            'ends_at' => '2026-07-04 16:15:00',
            'paid_at' => null,
            'fee_amount' => 4500,
            'canceled_at' => '2026-07-01 10:00:00',
        ]);
        Holiday::factory()->fixed(7, 8)->create([
            'title' => 'Summer Holiday',
            'observes_substitute_date' => false,
        ]);
        Holiday::factory()->fixed(7, 9)->create([
            'title' => 'Thursday Holiday',
            'observes_substitute_date' => false,
        ]);
        TeachingBreak::factory()->create([
            'title' => 'Calendar Vacation',
            'starts_on' => '2026-07-15',
            'ends_on' => '2026-07-15',
        ]);
        $otherBreak = TeachingBreak::factory()->create([
            'title' => 'Other Location Break',
            'starts_on' => '2026-07-22',
            'ends_on' => '2026-07-22',
        ]);
        $otherBreak->locations()->attach($otherLocation);
        $this->signIn();

        $this->get(route('calendar.students.show', $student))
            ->assertOk()
            ->assertViewIs('calendar.students.show')
            ->assertSee('Nora Stone')
            ->assertSee('Currently registered lessons')
            ->assertSee('RECURRING LESSON')
            ->assertSee('SINGLE LESSON')
            ->assertSee('Wednesday, August 5, 2026')
            ->assertSee('Confirmed lessons')
            ->assertSee('$65')
            ->assertSee('Unpaid lessons')
            ->assertSee('$55')
            ->assertDontSee('$45')
            ->assertSee('Wednesday, July 8, 2026')
            ->assertSee('Holiday: Summer Holiday')
            ->assertSee('Wednesday, July 15, 2026')
            ->assertSee('Break: Calendar Vacation')
            ->assertDontSee('Thursday Holiday')
            ->assertDontSee('Other Location Break');

        Carbon::setTestNow();
    }

    /** @test */
    public function it_requires_a_valid_gender_when_creating_a_student()
    {
        $this->signIn();

        $this->from(route('calendar.students.index'))
            ->post(route('calendar.students.store'), [
                'first_name' => 'Nora',
                'last_name' => 'Stone',
                'email' => 'nora@example.com',
            ])
            ->assertRedirect(route('calendar.students.index'))
            ->assertSessionHasErrors('gender');

        $this->from(route('calendar.students.index'))
            ->post(route('calendar.students.store'), [
                'first_name' => 'Nora',
                'last_name' => 'Stone',
                'gender' => 'female',
                'email' => 'nora@example.com',
            ])
            ->assertRedirect(route('calendar.students.index'));

        $this->assertDatabaseHas('students', [
            'first_name' => 'Nora',
            'last_name' => 'Stone',
            'gender' => 'female',
        ]);
    }

    /** @test */
    public function it_can_search_students_by_adult_status_without_showing_an_adult_column()
    {
        Student::factory()->create([
            'first_name' => 'Adult',
            'last_name' => 'Student',
            'gender' => 'female',
            'is_adult' => true,
        ]);
        Student::factory()->create([
            'first_name' => 'Young',
            'last_name' => 'Student',
            'gender' => 'male',
            'is_adult' => false,
        ]);

        $this->signIn();

        $this->getJson(route('calendar.tables.students', [
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'search' => [
                'value' => 'adult',
                'regex' => 'false',
            ],
            'columns' => $this->studentTableColumns(),
        ]))
            ->assertOk()
            ->assertJsonFragment(['first_name' => 'Adult'])
            ->assertJsonMissing(['first_name' => 'Young']);
    }

    /** @test */
    public function it_uses_a_stable_tie_breaker_when_many_sorted_rows_share_the_same_value()
    {
        $students = collect(range(1, 6))->map(function ($number) {
            return Student::factory()->create([
                'first_name' => "Student {$number}",
                'last_name' => 'Same',
                'gender' => 'female',
            ]);
        });

        $this->signIn();

        $rows = $this->json('GET', route('calendar.tables.students'), $this->studentTableRequest([
            'start' => 0,
            'length' => 6,
            'order' => [
                ['column' => 2, 'dir' => 'asc'],
            ],
        ]))->assertOk()->json('data');

        $this->assertSame($students->pluck('id')->all(), collect($rows)->pluck('id')->all());
    }

    private function studentTableColumns(): array
    {
        return collect([
            'first_name',
            'last_name',
            'gender',
            'age',
            'location',
            'is_adult',
            'actions',
        ])->map(function ($name) {
            return [
                'data' => $name === 'actions' ? 'id' : $name,
                'name' => $name,
                'searchable' => $name === 'actions' ? 'false' : 'true',
                'orderable' => $name === 'actions' ? 'false' : 'true',
                'search' => [
                    'value' => '',
                    'regex' => 'false',
                ],
            ];
        })->all();
    }

    private function studentTableRequest(array $overrides = []): array
    {
        return array_replace_recursive([
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'search' => [
                'value' => '',
                'regex' => 'false',
            ],
            'columns' => $this->studentTableColumns(),
        ], $overrides);
    }
}
