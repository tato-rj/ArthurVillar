<?php

namespace Tests\Feature;

use App\Models\Calendar\Lesson;
use App\Models\Calendar\LessonPlan;
use App\Models\Calendar\Student;
use Tests\BaseTest;

class LessonRecordsTableTest extends BaseTest
{
    /** @test */
    public function it_filters_lessons_by_scheduled_date_range()
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
            'scheduled_date' => '2026-07-10',
        ]);
        Lesson::factory()->lessonPlan($outsidePlan)->paid(4500)->create([
            'scheduled_date' => '2026-07-20',
        ]);

        $this->signIn();

        $this->getJson(route('calendar.tables.lesson-records', [
            'scheduled_from' => '2026-07-01',
            'scheduled_to' => '2026-07-12',
        ]))
            ->assertOk()
            ->assertJsonFragment(['student' => 'Inside Range'])
            ->assertJsonMissing(['student' => 'Outside Range']);
    }

    /** @test */
    public function it_shows_all_lessons_when_no_scheduled_date_range_is_selected()
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

        $this->getJson(route('calendar.tables.lesson-records'))
            ->assertOk()
            ->assertJsonFragment(['student' => 'First Lesson'])
            ->assertJsonFragment(['student' => 'Second Lesson']);
    }

    /** @test */
    public function it_includes_canceled_lessons_with_canceled_status()
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

        $rows = collect($this->getJson(route('calendar.tables.lesson-records'))->assertOk()->json('data'));

        $row = $rows->firstWhere('student', 'Canceled Lesson');

        $this->assertSame('Canceled', $row['status']);
        $this->assertArrayNotHasKey('payment', $row);
    }

    /** @test */
    public function lesson_records_page_lists_confirmed_and_canceled_recurring_and_single_lessons()
    {
        $recurringStudent = Student::factory()->create([
            'first_name' => 'Recurring',
            'last_name' => 'Cancellation',
        ]);
        $singleStudent = Student::factory()->create([
            'first_name' => 'Single',
            'last_name' => 'Cancellation',
        ]);
        $confirmedStudent = Student::factory()->create([
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
            'student_id' => $confirmedStudent->id,
            'lesson_plan_id' => null,
            'canceled_at' => null,
        ]);

        $this->signIn();

        $this->get(route('calendar.lesson-records.index'))
            ->assertOk()
            ->assertSee('Lesson Records')
            ->assertSee('lesson-records-table', false)
            ->assertSeeInOrder(['<th>Date</th>', '<th>Student</th>', '<th>Type</th>'], false)
            ->assertSee('<th>Payment</th>', false)
            ->assertDontSee('<th>Fee</th>', false)
            ->assertSee('data-bs-toggle="popover"', false)
            ->assertSee('text-decoration-line-through', false)
            ->assertDontSee('js-revert-canceled-lesson', false)
            ->assertSee('<th>Actions</th>', false)
            ->assertSee('Delete lesson record');

        $response = $this->getJson(route('calendar.tables.lesson-records'))->assertOk();
        $rows = collect($response->json('data'));

        $this->assertSame('Recurring', $rows->firstWhere('student', 'Recurring Cancellation')['lesson_type']);
        $this->assertSame('Single', $rows->firstWhere('student', 'Single Cancellation')['lesson_type']);
        $this->assertSame('Unpaid', $rows->firstWhere('student', 'Active Lesson')['status']);
    }

    /** @test */
    public function lesson_record_pages_use_the_new_routes_and_legacy_urls_redirect()
    {
        $student = Student::factory()->create([
            'first_name' => 'Route',
            'last_name' => 'Check',
        ]);

        $this->signIn();

        $this->get(route('calendar.lesson-records.student', $student))
            ->assertOk()
            ->assertSee("Route's lesson records")
            ->assertSee('lesson-records-table', false)
            ->assertSeeInOrder(['<th>Payment</th>', '<th>Status</th>'], false)
            ->assertSee('<th>Actions</th>', false)
            ->assertDontSee('<th>Fee</th>', false);

        $this->get(route('calendar.lessons.index'))
            ->assertRedirect(route('calendar.lesson-records.index'));

        $this->get(route('calendar.lessons.student', $student))
            ->assertRedirect(route('calendar.lesson-records.student', $student));
    }

    /** @test */
    public function it_filters_canceled_lessons_by_scheduled_date_with_other_lessons()
    {
        $inside = Student::factory()->create(['first_name' => 'Inside', 'last_name' => 'Canceled']);
        $outside = Student::factory()->create(['first_name' => 'Outside', 'last_name' => 'Canceled']);

        Lesson::factory()->create([
            'student_id' => $inside->id,
            'scheduled_date' => '2026-07-10',
            'canceled_at' => '2026-07-10 12:00:00',
        ]);
        Lesson::factory()->create([
            'student_id' => $outside->id,
            'scheduled_date' => '2026-07-20',
            'canceled_at' => '2026-07-20 12:00:00',
        ]);

        $this->signIn();

        $this->getJson(route('calendar.tables.lesson-records', [
            'scheduled_from' => '2026-07-01',
            'scheduled_to' => '2026-07-15',
        ]))
            ->assertOk()
            ->assertJsonFragment(['student' => 'Inside Canceled'])
            ->assertJsonMissing(['student' => 'Outside Canceled']);
    }

    /** @test */
    public function a_lesson_record_can_be_permanently_deleted()
    {
        $lesson = Lesson::factory()->create();

        $this->signIn();

        $this->delete(route('calendar.lessons.destroy', $lesson))
            ->assertRedirect()
            ->assertSessionHas('success', 'The lesson record was successfully deleted');

        $this->assertDatabaseMissing('lessons', ['id' => $lesson->id]);
    }
}
