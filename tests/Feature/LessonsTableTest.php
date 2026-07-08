<?php

namespace Tests\Feature;

use Tests\BaseTest;
use App\Models\{Lesson, LessonPlan, Student};

class LessonsTableTest extends BaseTest
{
    /** @test */
    public function it_filters_lessons_by_paid_date_range()
    {
        $insideStudent = Student::factory()->create([
            'first_name' => 'Inside',
            'last_name' => 'Range',
        ]);
        $outsideStudent = Student::factory()->create([
            'first_name' => 'Outside',
            'last_name' => 'Range',
        ]);

        $insidePlan = LessonPlan::factory()->student($insideStudent)->create();
        $outsidePlan = LessonPlan::factory()->student($outsideStudent)->create();

        Lesson::factory()->lessonPlan($insidePlan)->paid(3000)->create([
            'paid_at' => '2026-07-10 12:00:00',
        ]);
        Lesson::factory()->lessonPlan($outsidePlan)->paid(4500)->create([
            'paid_at' => '2026-07-15 12:00:00',
        ]);

        $this->signIn();

        $this->getJson(route('studio.tables.lessons', [
            'paid_from' => '2026-07-01',
            'paid_to' => '2026-07-12',
        ]))
            ->assertOk()
            ->assertJsonFragment(['student' => 'Inside Range'])
            ->assertJsonMissing(['student' => 'Outside Range']);
    }

    /** @test */
    public function it_shows_all_lessons_when_no_paid_date_range_is_selected()
    {
        $firstStudent = Student::factory()->create([
            'first_name' => 'First',
            'last_name' => 'Lesson',
        ]);
        $secondStudent = Student::factory()->create([
            'first_name' => 'Second',
            'last_name' => 'Lesson',
        ]);

        $firstPlan = LessonPlan::factory()->student($firstStudent)->create();
        $secondPlan = LessonPlan::factory()->student($secondStudent)->create();

        Lesson::factory()->lessonPlan($firstPlan)->paid(3000)->create([
            'paid_at' => '2026-07-10 12:00:00',
        ]);
        Lesson::factory()->lessonPlan($secondPlan)->paid(4500)->create([
            'paid_at' => '2026-07-15 12:00:00',
        ]);

        $this->signIn();

        $this->getJson(route('studio.tables.lessons'))
            ->assertOk()
            ->assertJsonFragment(['student' => 'First Lesson'])
            ->assertJsonFragment(['student' => 'Second Lesson']);
    }
}
