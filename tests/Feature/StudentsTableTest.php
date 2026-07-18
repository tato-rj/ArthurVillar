<?php

namespace Tests\Feature;

use Carbon\Carbon;
use App\Models\Calendar\{Holiday, LessonPlan, Location, Student, TeachingBreak};
use Tests\BaseTest;

class StudentsTableTest extends BaseTest
{
    /** @test */
    public function it_identifies_students_with_a_current_lesson_plan_for_the_actions_column()
    {
        Carbon::setTestNow('2026-07-01 12:00:00');

        $scheduledStudent = Student::factory()->create(['first_name' => 'Scheduled']);
        $unscheduledStudent = Student::factory()->create(['first_name' => 'Unscheduled']);
        LessonPlan::factory()->student($scheduledStudent)->create([
            'weekday' => 4,
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-07-31',
        ]);
        $this->signIn();

        $rows = collect($this->getJson(route('calendar.tables.students'))->assertOk()->json('data'));

        $this->assertTrue($rows->firstWhere('id', $scheduledStudent->id)['has_current_lesson_plan']);
        $this->assertFalse($rows->firstWhere('id', $unscheduledStudent->id)['has_current_lesson_plan']);

        Carbon::setTestNow();
    }

    /** @test */
    public function it_lists_future_lesson_dates_missed_for_holidays_and_applicable_breaks()
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

        $this->get(route('calendar.students.missed-lessons', $student))
            ->assertOk()
            ->assertSee('Nora Stone missed lessons')
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
