<?php

namespace Tests\Feature;

use Tests\BaseTest;
use App\Models\Calendar\{Lesson, LessonPlan, Student};

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

        $this->getJson(route('calendar.tables.lessons', [
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

        $this->getJson(route('calendar.tables.lessons'))
            ->assertOk()
            ->assertJsonFragment(['student' => 'First Lesson'])
            ->assertJsonFragment(['student' => 'Second Lesson']);
    }

    /** @test */
    public function it_excludes_canceled_lessons()
    {
        $student = Student::factory()->create([
            'first_name' => 'Canceled',
            'last_name' => 'Lesson',
        ]);
        $lessonPlan = LessonPlan::factory()->student($student)->create();

        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'canceled_at' => '2026-07-15 12:00:00',
            'canceled_by' => 'teacher',
            'paid_at' => null,
        ]);

        $this->signIn();

        $this->getJson(route('calendar.tables.lessons'))
            ->assertOk()
            ->assertJsonMissing(['student' => 'Canceled Lesson']);
    }

    /** @test */
    public function canceled_lessons_page_lists_recurring_and_single_cancellations_only()
    {
        $recurringStudent = Student::factory()->create([
            'first_name' => 'Recurring',
            'last_name' => 'Cancellation',
        ]);
        $singleStudent = Student::factory()->create([
            'first_name' => 'Single',
            'last_name' => 'Cancellation',
        ]);
        $activeStudent = Student::factory()->create([
            'first_name' => 'Active',
            'last_name' => 'Lesson',
        ]);
        $lessonPlan = LessonPlan::factory()->student($recurringStudent)->create();

        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'canceled_at' => '2026-07-15 12:00:00',
            'canceled_by' => 'teacher',
        ]);
        Lesson::factory()->create([
            'student_id' => $singleStudent->id,
            'lesson_plan_id' => null,
            'canceled_at' => '2026-07-16 12:00:00',
            'canceled_by' => 'student',
        ]);
        Lesson::factory()->create([
            'student_id' => $activeStudent->id,
            'lesson_plan_id' => null,
            'canceled_at' => null,
        ]);

        $this->signIn();

        $this->get(route('calendar.lessons.canceled'))
            ->assertOk()
            ->assertSee('Canceled Lessons')
            ->assertSee(route('calendar.lessons.canceled'), false)
            ->assertSee('canceled-lessons-table', false)
            ->assertSee('js-revert-canceled-lesson', false)
            ->assertSee('<th>Actions</th>', false);

        $response = $this->getJson(route('calendar.tables.canceled-lessons'))->assertOk();
        $rows = collect($response->json('data'));

        $this->assertSame('Recurring', $rows->firstWhere('student', 'Recurring Cancellation')['lesson_type']);
        $this->assertSame('Single', $rows->firstWhere('student', 'Single Cancellation')['lesson_type']);
        $this->assertNull($rows->firstWhere('student', 'Active Lesson'));
    }

    /** @test */
    public function it_filters_canceled_lessons_by_cancellation_date()
    {
        $inside = Student::factory()->create(['first_name' => 'Inside', 'last_name' => 'Canceled']);
        $outside = Student::factory()->create(['first_name' => 'Outside', 'last_name' => 'Canceled']);

        Lesson::factory()->create([
            'student_id' => $inside->id,
            'canceled_at' => '2026-07-10 12:00:00',
        ]);
        Lesson::factory()->create([
            'student_id' => $outside->id,
            'canceled_at' => '2026-07-20 12:00:00',
        ]);

        $this->signIn();

        $this->getJson(route('calendar.tables.canceled-lessons', [
            'canceled_from' => '2026-07-01',
            'canceled_to' => '2026-07-15',
        ]))
            ->assertOk()
            ->assertJsonFragment(['student' => 'Inside Canceled'])
            ->assertJsonMissing(['student' => 'Outside Canceled']);
    }
}
