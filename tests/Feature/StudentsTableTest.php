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
    public function the_new_student_modal_can_copy_contact_defaults_from_a_sibling()
    {
        $location = Location::factory()->create();
        $sibling = Student::factory()->create([
            'first_name' => 'Nora',
            'last_name' => 'Stone',
            'parent_name' => 'Alex Stone',
            'email' => 'alex@example.com',
            'phone' => '201-555-0100',
            'location_id' => $location->id,
            'payment_method' => 'Venmo',
        ]);
        $this->signIn();

        $this->get(route('calendar.students.index'))
            ->assertOk()
            ->assertSee('Sibling of')
            ->assertSee('data-sibling-combobox', false)
            ->assertSee('data-sibling-id="'.$sibling->id.'"', false)
            ->assertSee('data-sibling-last-name="Stone"', false)
            ->assertSee('data-sibling-parent-name="Alex Stone"', false)
            ->assertSee('data-sibling-email="alex@example.com"', false)
            ->assertSee('data-sibling-location-id="'.$location->id.'"', false)
            ->assertSee('data-sibling-payment-method="Venmo"', false)
            ->assertSee('data-sibling-phone="201-555-0100"', false)
            ->assertSee('populateStudentFormFromSibling', false);
    }

    /** @test */
    public function it_displays_and_sorts_the_combined_name_by_first_name()
    {
        Student::factory()->create(['first_name' => 'Zoe', 'last_name' => 'Able']);
        Student::factory()->create(['first_name' => 'Amy', 'last_name' => 'Zed']);

        $this->signIn();

        $this->get(route('calendar.students.index'))
            ->assertOk()
            ->assertSee('<th>Name</th>', false)
            ->assertDontSee('<th>First name</th>', false)
            ->assertDontSee('<th>Last name</th>', false);

        $rows = $this->json('GET', route('calendar.tables.students'), $this->studentTableRequest([
            'order' => [
                ['column' => 0, 'dir' => 'asc'],
            ],
        ]))->assertOk()->json('data');

        $this->assertSame(['Amy Zed', 'Zoe Able'], collect($rows)->pluck('name')->all());
    }

    /** @test */
    public function it_filters_students_by_location()
    {
        $home = Location::factory()->create(['name' => 'Home']);
        $online = Location::factory()->create(['name' => 'Online']);
        $bkcm = Location::factory()->create(['name' => 'BKCM']);
        $other = Location::factory()->create(['name' => 'Other']);

        Student::factory()->create(['first_name' => 'Home', 'location_id' => $home->id]);
        Student::factory()->create(['first_name' => 'Online', 'location_id' => $online->id]);
        Student::factory()->create(['first_name' => 'BKCM', 'location_id' => $bkcm->id]);
        Student::factory()->create(['first_name' => 'Other', 'location_id' => $other->id]);

        $this->signIn();

        $this->get(route('calendar.students.index'))
            ->assertOk()
            ->assertSee('Filter students')
            ->assertSee('data-student-location-filter', false)
            ->assertSee('data-students-total', false)
            ->assertSee('3 students')
            ->assertSee('at home, at BKCM, and online')
            ->assertSee('student_locations', false);

        $this->get(route('calendar.students.index', ['student_locations' => 'home,bkcm']))
            ->assertOk()
            ->assertSee('2 students')
            ->assertSee('at home and at BKCM');

        $response = $this->json('GET', route('calendar.tables.students'), $this->studentTableRequest([
            'student_locations' => 'home,online',
        ]))
            ->assertOk()
            ->assertJsonPath('recordsTotal', 2);

        $rows = $response->json('data');

        $this->assertEqualsCanonicalizing(['Home', 'Online'], collect($rows)->pluck('first_name')->all());
        $this->assertSame('house', collect($rows)->firstWhere('location', 'Home')['location_icon']);
        $this->assertSame('globe', collect($rows)->firstWhere('location', 'Online')['location_icon']);

        $this->get(route('calendar.students.index'))
            ->assertOk()
            ->assertSee('row.location_icon', false)
            ->assertSee('fa-${row.location_icon}', false);

        $this->json('GET', route('calendar.tables.students'), $this->studentTableRequest([
            'student_locations' => 'none',
        ]))
            ->assertOk()
            ->assertJsonCount(0, 'data');
    }

    /** @test */
    public function it_counts_paid_unpaid_and_canceled_lessons_for_each_student()
    {
        $student = Student::factory()->create(['first_name' => 'Lesson', 'last_name' => 'Counts']);
        $lessonPlan = LessonPlan::factory()->student($student)->create();

        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'paid_at' => now(),
            'canceled_at' => null,
        ]);
        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'paid_at' => null,
            'canceled_at' => null,
        ]);
        Lesson::factory()->lessonPlan($lessonPlan)->count(2)->create([
            'canceled_at' => now(),
        ]);

        $this->signIn();

        $row = collect($this->json('GET', route('calendar.tables.students'), $this->studentTableRequest())
            ->assertOk()
            ->json('data'))
            ->firstWhere('name', 'Lesson Counts');

        $this->assertSame(1, $row['paid_lessons_count']);
        $this->assertSame(1, $row['unpaid_lessons_count']);
        $this->assertSame(2, $row['canceled_lessons_count']);
    }

    /** @test */
    public function it_shows_student_registrations_lesson_statuses_in_one_table_and_future_missed_lessons()
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
            ->assertSee('<span class="badge bg-green text-white" title="Confirmed lessons">1</span>', false)
            ->assertSee('<span class="badge bg-red text-white ml-2" title="Unpaid lessons">1</span>', false)
            ->assertSee('<span class="badge bg-light text-dark ml-2" title="Canceled lessons">1</span>', false)
            ->assertSee('<div class="text-red font-weight-bold">Unpaid</div>', false)
            ->assertSee('<div class="text-light font-weight-bold">Canceled</div>', false)
            ->assertDontSee('$55')
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
                ['column' => 1, 'dir' => 'asc'],
            ],
        ]))->assertOk()->json('data');

        $this->assertSame($students->pluck('id')->all(), collect($rows)->pluck('id')->all());
    }

    private function studentTableColumns(): array
    {
        return collect([
            'name',
            'gender',
            'age',
            'location',
            'paid_lessons_count',
            'unpaid_lessons_count',
            'canceled_lessons_count',
            'is_adult',
            'actions',
        ])->map(function ($name) {
            return [
                'data' => $name === 'actions' ? 'id' : $name,
                'name' => $name,
                'searchable' => in_array($name, [
                    'actions',
                    'paid_lessons_count',
                    'unpaid_lessons_count',
                    'canceled_lessons_count',
                ], true) ? 'false' : 'true',
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
