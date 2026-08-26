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
            ->assertSee('Filter records')
            ->assertSee('Paid lessons')
            ->assertSee('Unpaid lessons')
            ->assertSee('Canceled lessons')
            ->assertSee('Total paid')
            ->assertSee('Total unpaid')
            ->assertSee('Total canceled')
            ->assertSee('lesson-records-table', false)
            ->assertSeeInOrder(['<th>Date</th>', '<th>Student</th>', '<th>Type</th>'], false)
            ->assertSee('<th>Payment</th>', false)
            ->assertDontSee('<th>Fee</th>', false)
            ->assertSee('data-bs-toggle="popover"', false)
            ->assertSee('text-decoration-line-through', false)
            ->assertDontSee('js-revert-canceled-lesson', false)
            ->assertSee('<th>Actions</th>', false)
            ->assertSee('data-pay-lesson', false)
            ->assertSee('js-edit-lesson-record', false)
            ->assertSee('Edit lesson record')
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
    public function it_filters_lesson_records_by_displayed_payment_status()
    {
        $paidStudent = Student::factory()->create(['first_name' => 'Paid', 'last_name' => 'Record']);
        $unpaidStudent = Student::factory()->create(['first_name' => 'Unpaid', 'last_name' => 'Record']);
        $canceledStudent = Student::factory()->create(['first_name' => 'Canceled', 'last_name' => 'Record']);

        Lesson::factory()->create([
            'student_id' => $paidStudent->id,
            'paid_at' => '2026-07-10 12:00:00',
            'canceled_at' => null,
        ]);
        Lesson::factory()->create([
            'student_id' => $unpaidStudent->id,
            'paid_at' => null,
            'canceled_at' => null,
        ]);
        Lesson::factory()->create([
            'student_id' => $canceledStudent->id,
            'paid_at' => '2026-07-10 12:00:00',
            'canceled_at' => '2026-07-11 12:00:00',
        ]);

        $this->signIn();

        $paidRows = collect($this->getJson(route('calendar.tables.lesson-records', [
            'record_statuses' => 'paid',
        ]))->assertOk()->json('data'));
        $this->assertSame(['Paid Record'], $paidRows->pluck('student')->values()->all());

        $unpaidRows = collect($this->getJson(route('calendar.tables.lesson-records', [
            'record_statuses' => 'unpaid',
        ]))->assertOk()->json('data'));
        $this->assertSame(['Unpaid Record'], $unpaidRows->pluck('student')->values()->all());

        $canceledRows = collect($this->getJson(route('calendar.tables.lesson-records', [
            'record_statuses' => 'canceled',
        ]))->assertOk()->json('data'));
        $this->assertSame(['Canceled Record'], $canceledRows->pluck('student')->values()->all());

        $this->getJson(route('calendar.tables.lesson-records', [
            'record_statuses' => 'none',
        ]))
            ->assertOk()
            ->assertJsonCount(0, 'data');
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

    /** @test */
    public function an_unpaid_lesson_record_can_be_marked_as_paid()
    {
        $lesson = Lesson::factory()->create([
            'paid_at' => null,
            'canceled_at' => null,
        ]);

        $this->signIn();

        $this->postJson(route('calendar.lessons.payment.store', $lesson))
            ->assertOk()
            ->assertJsonPath('status', 'paid');

        $this->assertNotNull($lesson->fresh()->paid_at);
    }

    /** @test */
    public function a_lesson_record_can_be_edited_without_changing_its_lesson_plan()
    {
        $student = Student::factory()->create([
            'first_name' => 'Editable',
            'last_name' => 'Record',
        ]);
        $lessonPlan = LessonPlan::factory()->student($student)->create([
            'start_time' => '15:00',
            'duration_minutes' => 45,
            'fee_amount' => 6000,
        ]);
        $lesson = Lesson::factory()->lessonPlan($lessonPlan)->create([
            'scheduled_date' => '2026-07-08',
            'scheduled_start_time' => '15:00',
            'starts_at' => '2026-07-08 15:00:00',
            'ends_at' => '2026-07-08 15:45:00',
            'fee_amount' => 6000,
            'paid_at' => null,
        ]);

        $this->signIn();

        $this->get(route('calendar.lessons.edit', $lesson))
            ->assertOk()
            ->assertSee('Edit lesson record')
            ->assertSee('Editable Record')
            ->assertSee('name="duration_minutes"', false);

        $this->patch(route('calendar.lessons.update', $lesson), [
            'date' => '2026-07-09',
            'start_time' => '16:15',
            'duration_minutes' => 60,
            'fee_amount' => '75.50',
            'status' => 'paid',
            'paid_at' => '2026-07-10 12:30',
            'payment_method' => 'Zelle',
            'notes' => 'Corrected historical record.',
        ])->assertSessionHasNoErrors();

        $lesson->refresh();

        $this->assertSame('2026-07-09', $lesson->scheduled_date->toDateString());
        $this->assertSame('16:15', $lesson->scheduled_start_time);
        $this->assertSame('2026-07-09 16:15:00', $lesson->starts_at->format('Y-m-d H:i:s'));
        $this->assertSame('2026-07-09 17:15:00', $lesson->ends_at->format('Y-m-d H:i:s'));
        $this->assertSame(7550, (int) $lesson->fee_amount);
        $this->assertSame('2026-07-10 12:30:00', $lesson->paid_at->format('Y-m-d H:i:s'));
        $this->assertSame('Zelle', $lesson->payment_method);
        $this->assertSame('Corrected historical record.', $lesson->notes);
        $this->assertSame('15:00', $lessonPlan->fresh()->start_time);
        $this->assertSame(45, $lessonPlan->fresh()->duration_minutes);
        $this->assertSame(6000, (int) $lessonPlan->fresh()->fee_amount);
    }
}
