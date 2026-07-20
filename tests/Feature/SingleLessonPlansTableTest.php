<?php

namespace Tests\Feature;

use Tests\BaseTest;
use App\Models\Calendar\{Lesson, SingleLessonPlan, Student};

class SingleLessonPlansTableTest extends BaseTest
{
    /** @test */
    public function it_loads_the_single_lesson_plans_table()
    {
        $student = Student::factory()->create([
            'first_name' => 'Single',
            'last_name' => 'Lesson',
        ]);

        SingleLessonPlan::factory()->student($student)->create([
            'scheduled_date' => '2026-07-15',
            'start_time' => '16:00',
        ]);

        $this->signIn();

        $response = $this->getJson(route('calendar.tables.single-lesson-plans', $this->singleLessonPlanTableRequest()))
            ->assertOk();

        $this->assertSame(['Single Lesson'], collect($response->json('data'))->pluck('student')->all());
    }

    /** @test */
    public function it_excludes_canceled_single_lessons()
    {
        $student = Student::factory()->create([
            'first_name' => 'Canceled',
            'last_name' => 'Single',
        ]);
        $singleLessonPlan = SingleLessonPlan::factory()->student($student)->create([
            'scheduled_date' => '2026-07-15',
            'start_time' => '16:00',
        ]);
        Lesson::factory()->create([
            'student_id' => $student->id,
            'lesson_plan_id' => null,
            'scheduled_date' => '2026-07-15',
            'scheduled_start_time' => '16:00',
            'canceled_at' => '2026-07-10 12:00:00',
        ]);

        $this->signIn();

        $this->getJson(route('calendar.tables.single-lesson-plans', $this->singleLessonPlanTableRequest()))
            ->assertOk()
            ->assertJsonMissing(['id' => $singleLessonPlan->id]);
    }

    private function singleLessonPlanTableColumns(): array
    {
        return collect([
            'student',
            'scheduled_date',
            'weekday',
            'start_time',
            'duration_minutes',
            'fee_amount',
            'payment_method',
            'location',
            'status',
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

    private function singleLessonPlanTableRequest(array $overrides = []): array
    {
        return array_replace_recursive([
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'search' => [
                'value' => '',
                'regex' => 'false',
            ],
            'columns' => $this->singleLessonPlanTableColumns(),
        ], $overrides);
    }
}
