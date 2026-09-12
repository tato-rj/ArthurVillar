<?php

namespace Tests\Feature;

use App\Models\Calendar\LessonPlan;
use App\Models\Calendar\Location;
use App\Models\Calendar\SingleLessonPlan;
use App\Models\Calendar\Student;
use Carbon\Carbon;
use Tests\BaseTest;

class LessonPlansTableTest extends BaseTest
{
    /** @test */
    public function it_groups_students_by_location_in_the_new_lesson_picker()
    {
        $home = Location::factory()->create(['name' => 'Home']);
        $online = Location::factory()->create(['name' => 'Online']);
        $homeStudent = Student::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'location_id' => $home->id,
        ]);
        $onlineStudent = Student::factory()->create([
            'first_name' => 'Jane',
            'last_name' => 'Dow',
            'location_id' => $online->id,
        ]);
        $this->signIn();

        $response = $this->get(route('calendar.lesson-plans.index'))->assertOk();
        $document = new \DOMDocument();
        @$document->loadHTML($response->getContent());
        $xpath = new \DOMXPath($document);
        $modal = '//*[@id="create-calendar-lesson-plan-modal"]';

        $this->assertSame(1, $xpath->query($modal.'//*[@data-student-location-name="Home"]//*[@data-student-id="'.$homeStudent->id.'"]')->length);
        $this->assertSame(1, $xpath->query($modal.'//*[@data-student-location-name="Online"]//*[@data-student-id="'.$onlineStudent->id.'"]')->length);
        $this->assertSame(0, $xpath->query($modal.'//*[@data-student-location-name="Home"]//*[@data-student-id="'.$onlineStudent->id.'"]')->length);
        $this->assertSame(1, $xpath->query($modal.'//*[@data-student-location-name="Home"]//*[contains(concat(" ", normalize-space(@class), " "), " fa-house ")]')->length);
        $this->assertSame(1, $xpath->query($modal.'//*[@data-student-location-name="Online"]//*[contains(concat(" ", normalize-space(@class), " "), " fa-globe ")]')->length);
    }

    /** @test */
    public function it_lists_lesson_plans_without_students_as_group_classes()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'student_id' => null,
            'starts_on' => today()->subDay(),
            'ends_on' => today()->addDay(),
        ]);
        $this->signIn();

        $rows = collect($this->getJson(route(
            'calendar.tables.lesson-plans',
            $this->lessonPlanTableRequest()
        ))->assertOk()->json('data'));

        $row = $rows->firstWhere('id', $lessonPlan->id);

        $this->assertSame('Group class', $row['student']);
        $this->assertNull($row['student_id']);
    }

    /** @test */
    public function it_excludes_canceled_recurring_plans()
    {
        $student = Student::factory()->create([
            'first_name' => 'Canceled',
            'last_name' => 'Recurring',
        ]);
        $lessonPlan = LessonPlan::factory()->student($student)->create([
            'canceled_from' => '2026-07-15',
            'canceled_at' => '2026-07-10 12:00:00',
        ]);

        $this->signIn();

        $this->getJson(route('calendar.tables.lesson-plans', $this->lessonPlanTableRequest()))
            ->assertOk()
            ->assertJsonMissing(['id' => $lessonPlan->id]);
    }

    /** @test */
    public function it_searches_lesson_plans_without_querying_the_dynamic_status_order_as_a_column()
    {
        Carbon::setTestNow(Carbon::parse('2026-07-08 12:00:00'));

        $student = Student::factory()->create([
            'first_name' => 'Searchable',
            'last_name' => 'Student',
        ]);

        LessonPlan::factory()->create([
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-07-31',
            'start_time' => '16:00',
        ]);

        LessonPlan::factory()->student($student)->create([
            'starts_on' => '2026-06-01',
            'ends_on' => '2026-06-30',
            'start_time' => '16:00',
        ]);

        $this->signIn();

        $response = $this->getJson(route('calendar.tables.lesson-plans', $this->lessonPlanTableRequest([
            'plan_statuses' => 'active,inactive',
            'search' => [
                'value' => 'Searchable',
                'regex' => 'false',
            ],
        ])))->assertOk();

        $this->assertSame(['Searchable Student'], collect($response->json('data'))->pluck('student')->all());

        Carbon::setTestNow();
    }

    /** @test */
    public function it_filters_the_shared_table_by_plan_status_and_type()
    {
        Carbon::setTestNow(Carbon::parse('2026-07-08 12:00:00'));

        $activeRecurring = LessonPlan::factory()->student(Student::factory()->create([
            'first_name' => 'Active',
            'last_name' => 'Recurring',
        ]))->create([
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-07-31',
        ]);
        $inactiveRecurring = LessonPlan::factory()->student(Student::factory()->create([
            'first_name' => 'Inactive',
            'last_name' => 'Recurring',
        ]))->create([
            'starts_on' => '2026-06-01',
            'ends_on' => '2026-06-30',
        ]);
        $single = SingleLessonPlan::factory()->student(Student::factory()->create([
            'first_name' => 'Active',
            'last_name' => 'Single',
        ]))->create([
            'scheduled_date' => '2026-07-12',
        ]);

        $this->signIn();

        $defaultRows = collect($this->getJson(route(
            'calendar.tables.lesson-plans',
            $this->lessonPlanTableRequest()
        ))->assertOk()->json('data'));

        $this->assertTrue($defaultRows->contains(fn ($row) => $row['plan_type'] === 'recurring' && $row['id'] === $activeRecurring->id));
        $this->assertTrue($defaultRows->contains(fn ($row) => $row['plan_type'] === 'single' && $row['id'] === $single->id));
        $this->assertFalse($defaultRows->contains(fn ($row) => $row['plan_type'] === 'recurring' && $row['id'] === $inactiveRecurring->id));

        $inactiveRows = collect($this->getJson(route(
            'calendar.tables.lesson-plans',
            $this->lessonPlanTableRequest([
                'plan_statuses' => 'inactive',
                'plan_types' => 'recurring',
            ])
        ))->assertOk()->json('data'));

        $this->assertSame([$inactiveRecurring->id], $inactiveRows->pluck('id')->all());

        $singleRows = collect($this->getJson(route(
            'calendar.tables.lesson-plans',
            $this->lessonPlanTableRequest([
                'plan_statuses' => 'active',
                'plan_types' => 'single',
            ])
        ))->assertOk()->json('data'));

        $this->assertSame(['single'], $singleRows->pluck('plan_type')->unique()->values()->all());

        Carbon::setTestNow();
    }

    /** @test */
    public function it_shows_one_time_plans_on_the_shared_lesson_plans_page()
    {
        $student = Student::factory()->create([
            'first_name' => 'One',
            'last_name' => 'Time',
        ]);
        $lessonPlan = SingleLessonPlan::factory()->student($student)->create([
            'scheduled_date' => '2026-08-12',
            'start_time' => '14:30',
            'duration_minutes' => 45,
        ]);
        $this->signIn();

        $this->get(route('calendar.lesson-plans.index'))
            ->assertOk()
            ->assertSee('Lesson Plans')
            ->assertSee('lesson-plans-table', false)
            ->assertSee('New lesson plan')
            ->assertSee('data-bs-target="#create-calendar-lesson-plan-modal"', false)
            ->assertSee('id="create-calendar-lesson-plan-modal"', false)
            ->assertSee('data-lesson-plan-form', false)
            ->assertSee('calendarLessonPlanCreateForms', false)
            ->assertDontSee('Lesson plan type');

        $response = $this->getJson(route(
            'calendar.tables.lesson-plans',
            $this->lessonPlanTableRequest()
        ))->assertOk();

        $row = collect($response->json('data'))
            ->first(fn ($row) => $row['plan_type'] === 'single' && $row['id'] === $lessonPlan->id);

        $this->assertSame('One Time', $row['student']);
        $this->assertSame('single', $row['plan_type']);
        $this->assertSame('Does not repeat', $row['recurrence']);
        $this->assertSame('2026-08-12', $row['starts_on']);
        $this->assertSame('2026-08-12', $row['ends_on']);
        $this->assertSame('14:30', $row['start_time']);
        $this->assertSame(45, $row['duration_minutes']);
    }

    /** @test */
    public function the_new_lesson_modal_hides_payment_for_a_preselected_exempt_student()
    {
        $exempt = Student::factory()->create(['payment_exempt' => true]);
        $paying = Student::factory()->create(['payment_exempt' => false]);
        $this->signIn();

        foreach ([$exempt, $paying] as $student) {
            $response = $this->withSession(['_old_input' => ['student_id' => $student->id]])
                ->get(route('calendar.lesson-plans.index'))
                ->assertOk()
                ->assertSee('data-student-payment-exempt="1"', false)
                ->assertSee('data-student-payment-exempt="0"', false);

            if ($student->payment_exempt) {
                $response->assertSee('data-lesson-payment-section hidden', false);
            } else {
                $response->assertDontSee('data-lesson-payment-section hidden', false);
            }
        }
    }

    /** @test */
    public function lesson_plan_edit_modals_hide_payment_for_exempt_students()
    {
        $student = Student::factory()->create(['payment_exempt' => true]);
        $lessonPlan = LessonPlan::factory()->student($student)->create();
        $singleLessonPlan = SingleLessonPlan::factory()->student($student)->create();
        $this->signIn();

        $this->get(route('calendar.lesson-plans.edit', $lessonPlan))
            ->assertOk()
            ->assertSee('data-lesson-payment-section hidden', false);

        $this->get(route('calendar.single-lesson-plans.edit', $singleLessonPlan))
            ->assertOk()
            ->assertSee('data-lesson-payment-section hidden', false);
    }

    private function lessonPlanTableColumns(): array
    {
        return collect([
            'student',
            'start_time',
            'duration_minutes',
            'recurrence',
            'starts_on',
            'ends_on',
            'fee_amount',
            'location',
            'actions',
        ])->map(function ($name) {
            return [
                'data' => $name === 'actions'
                    ? 'id'
                    : $name,
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

    private function lessonPlanTableRequest(array $overrides = []): array
    {
        return array_replace_recursive([
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'search' => [
                'value' => '',
                'regex' => 'false',
            ],
            'columns' => $this->lessonPlanTableColumns(),
        ], $overrides);
    }

}
