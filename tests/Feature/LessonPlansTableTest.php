<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\BaseTest;
use App\Models\Calendar\{LessonPlan, Student};

class LessonPlansTableTest extends BaseTest
{
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
    public function it_sorts_lesson_plans_by_dynamic_status()
    {
        Carbon::setTestNow(Carbon::parse('2026-07-08 12:00:00'));

        $studentWithCurrentPlan = Student::factory()->create();
        $studentWithUpcomingPlan = Student::factory()->create();

        LessonPlan::factory()->student($studentWithCurrentPlan)->create([
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-07-31',
            'start_time' => '16:00',
        ]);

        LessonPlan::factory()->student($studentWithCurrentPlan)->create([
            'starts_on' => '2026-07-15',
            'ends_on' => '2026-08-15',
            'start_time' => '16:00',
        ]);

        LessonPlan::factory()->student($studentWithUpcomingPlan)->create([
            'starts_on' => '2026-07-10',
            'ends_on' => '2026-08-10',
            'start_time' => '16:00',
        ]);

        LessonPlan::factory()->create([
            'starts_on' => '2026-06-01',
            'ends_on' => '2026-06-30',
            'start_time' => '16:00',
        ]);

        $this->signIn();

        $ascendingResponse = $this->getJson(route('calendar.tables.lesson-plans', $this->lessonPlanTableRequest([
            'order' => [
                ['column' => 10, 'dir' => 'asc'],
            ],
        ])))->assertOk();

        $descendingResponse = $this->getJson(route('calendar.tables.lesson-plans', $this->lessonPlanTableRequest([
            'order' => [
                ['column' => 10, 'dir' => 'desc'],
            ],
        ])))->assertOk();

        $ascendingStatuses = collect($ascendingResponse->json('data'))->pluck('status')->all();
        $descendingStatuses = collect($descendingResponse->json('data'))->pluck('status')->all();

        $this->assertSame(['active', 'active', 'inactive', 'inactive'], $ascendingStatuses);
        $this->assertSame(['inactive', 'inactive', 'active', 'active'], $descendingStatuses);

        Carbon::setTestNow();
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
            'search' => [
                'value' => 'Searchable',
                'regex' => 'false',
            ],
        ])))->assertOk();

        $this->assertSame(['Searchable Student'], collect($response->json('data'))->pluck('student')->all());

        Carbon::setTestNow();
    }

    private function lessonPlanTableColumns(): array
    {
        return collect([
            'student',
            'weekday_name',
            'start_time',
            'duration_minutes',
            'recurrence',
            'starts_on',
            'ends_on',
            'fee_amount',
            'payment_method',
            'location',
            'status_order',
            'actions',
        ])->map(function ($name) {
            return [
                'data' => $name === 'actions'
                    ? 'id'
                    : $name,
                'name' => $name,
                'searchable' => in_array($name, ['actions', 'status_order']) ? 'false' : 'true',
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
