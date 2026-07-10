<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\BaseTest;
use App\Calendar\Scheduler;
use App\Models\{Lesson, LessonPlan, Location, ScheduleOverride, SingleLessonPlan, Student};

class StudioLessonFlowTest extends BaseTest
{
    /** @test */
    public function it_does_not_create_a_lesson_plan_that_overlaps_another_complete_lesson_plan()
    {
        $student = Student::factory()->create();

        LessonPlan::factory()->student($student)->create([
            'status' => 'active',
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-09-01',
        ]);

        $this->signIn();

        $response = $this->from(route('studio.students.index'))->post(route('studio.lesson-plans.store'), $this->lessonPlanPayload([
            'student_id' => $student->id,
            'starts_on' => '07/15/2026',
            'ends_on' => '08/15/2026',
        ]));

        $response
            ->assertRedirect(route('studio.students.index'))
            ->assertSessionHasErrors(['starts_on' => 'This lesson plan overlaps with another lesson plan.']);

        $this->assertCount(1, $student->lessonPlans()->get());
    }

    /** @test */
    public function it_does_not_update_a_lesson_plan_to_overlap_another_complete_lesson_plan()
    {
        $student = Student::factory()->create();
        $existingLessonPlan = LessonPlan::factory()->student($student)->create([
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-09-01',
        ]);
        $lessonPlan = LessonPlan::factory()->student($student)->create([
            'starts_on' => null,
            'ends_on' => null,
        ]);

        $this->signIn();

        $this->from(route('studio.lessons.student', $student))
            ->patch(route('studio.lesson-plans.update', $lessonPlan), $this->lessonPlanPayload([
                'student_id' => $student->id,
                'starts_on' => '08/01/2026',
                'ends_on' => '08/31/2026',
            ]))
            ->assertRedirect(route('studio.lessons.student', $student))
            ->assertSessionHasErrors(['starts_on' => 'This lesson plan overlaps with another lesson plan.']);

        $this->assertSame('2026-07-01', $existingLessonPlan->fresh()->starts_on->toDateString());
        $this->assertNull($lessonPlan->fresh()->starts_on);
    }

    /** @test */
    public function it_can_create_a_lesson_plan_when_the_previous_plan_ended_today()
    {
        Carbon::setTestNow(Carbon::parse('2026-07-04 12:00:00'));

        $student = Student::factory()->create();

        LessonPlan::factory()->student($student)->create([
            'status' => 'active',
            'starts_on' => '2026-06-01',
            'ends_on' => '2026-07-04',
        ]);

        $this->signIn();

        $response = $this->post(route('studio.lesson-plans.store'), $this->lessonPlanPayload([
            'student_id' => $student->id,
            'starts_on' => '07/05/2026',
            'ends_on' => '08/05/2026',
        ]));

        $response->assertRedirect();

        $this->assertCount(2, $student->lessonPlans()->get());

        Carbon::setTestNow();
    }

    /** @test */
    public function it_duplicates_a_current_lesson_plan_without_dates()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'starts_on' => '2026-07-01',
            'ends_on' => null,
            'status' => 'active',
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'recurrence_interval' => 2,
            'fee_amount' => 6000,
            'payment_method' => 'Venmo',
            'notes' => 'Keep all settings.',
        ]);

        $this->signIn();

        $this->post(route('studio.lesson-plans.duplicate', $lessonPlan))
            ->assertRedirect();

        $duplicate = LessonPlan::where('id', '!=', $lessonPlan->id)->firstOrFail();

        $this->assertSame($lessonPlan->student_id, $duplicate->student_id);
        $this->assertSame(4, $duplicate->weekday);
        $this->assertSame('15:30', $duplicate->start_time);
        $this->assertSame(45, $duplicate->duration_minutes);
        $this->assertSame(2, $duplicate->recurrence_interval);
        $this->assertEquals(6000, $duplicate->fee_amount);
        $this->assertSame('Venmo', $duplicate->payment_method);
        $this->assertSame('Keep all settings.', $duplicate->notes);
        $this->assertNull($duplicate->starts_on);
        $this->assertNull($duplicate->ends_on);
        $this->assertFalse($duplicate->isCurrent());
    }

    /** @test */
    public function undated_lesson_plans_do_not_block_creating_a_current_lesson_plan()
    {
        $student = Student::factory()->create();

        LessonPlan::factory()->create([
            'student_id' => $student->id,
            'starts_on' => null,
            'ends_on' => null,
            'status' => 'active',
        ]);

        $this->signIn();

        $this->post(route('studio.lesson-plans.store'), $this->lessonPlanPayload([
            'student_id' => $student->id,
            'starts_on' => '07/06/2026',
        ]))->assertRedirect();

        $this->assertSame(2, LessonPlan::where('student_id', $student->id)->count());
    }

    /** @test */
    public function it_calculates_the_lesson_plan_fee_from_the_location_hourly_fee_duration_and_lower_five_dollars()
    {
        $location = Location::factory()->create([
            'fee_amount' => 4800,
        ]);

        $this->signIn();

        $this
            ->post(route('studio.lesson-plans.store'), $this->lessonPlanPayload([
                'duration_minutes' => 30,
                'fee_amount' => '',
                'location_id' => $location->id,
            ]))
            ->assertRedirect();

        $this->assertDatabaseHas('lesson_plans', [
            'location_id' => $location->id,
            'duration_minutes' => 30,
            'fee_amount' => 2000,
        ]);
    }

    /** @test */
    public function it_stores_lesson_plan_urls_only_for_online_locations()
    {
        $student = Student::factory()->create();
        $online = Location::factory()->create(['name' => 'Online']);
        $home = Location::factory()->create(['name' => 'Home']);

        $this->signIn();

        $this->post(route('studio.lesson-plans.store'), $this->lessonPlanPayload([
            'student_id' => $student->id,
            'location_id' => $online->id,
            'meeting_url' => 'https://zoom.us/j/123456789',
            'notes_url' => 'https://example.com/lesson-notes',
            'starts_on' => '07/06/2026',
            'ends_on' => '08/06/2026',
        ]))->assertRedirect();

        $this->assertDatabaseHas('lesson_plans', [
            'student_id' => $student->id,
            'location_id' => $online->id,
            'meeting_url' => 'https://zoom.us/j/123456789',
            'notes_url' => 'https://example.com/lesson-notes',
        ]);

        $this->post(route('studio.lesson-plans.store'), $this->lessonPlanPayload([
            'student_id' => $student->id,
            'location_id' => $home->id,
            'meeting_url' => 'https://zoom.us/j/987654321',
            'notes_url' => 'https://example.com/home-notes',
            'starts_on' => '09/06/2026',
            'ends_on' => '10/06/2026',
        ]))->assertRedirect();

        $this->assertDatabaseHas('lesson_plans', [
            'student_id' => $student->id,
            'location_id' => $home->id,
            'meeting_url' => null,
            'notes_url' => null,
        ]);
    }

    /** @test */
    public function it_reschedules_a_single_lesson_occurrence()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 1,
        ]);

        $this->signIn();

        $response = $this->from(route('studio.home'))->post(route('studio.lesson-plans.reschedule'), [
            'lesson_plan_id' => $lessonPlan->id,
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'date' => '2026-07-09',
            'start_time' => '16:00',
            'end_time' => '16:45',
            'is_permanent' => 0,
        ]);

        $response
            ->assertRedirect(route('studio.home'))
            ->assertSessionHas('success', 'The lesson was successfully rescheduled');

        $this->assertDatabaseHas('schedule_overrides', [
            'lesson_plan_id' => $lessonPlan->id,
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'new_date' => '2026-07-09',
            'new_start_time' => '16:00',
            'duration_minutes' => 45,
            'type' => 'reschedule',
        ]);
    }

    /** @test */
    public function rescheduling_the_same_occurrence_updates_the_existing_override()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 1,
        ]);

        ScheduleOverride::factory()->lessonPlan($lessonPlan)->create([
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'new_date' => '2026-07-09',
            'new_start_time' => '16:00',
            'duration_minutes' => 45,
        ]);

        $this->signIn();

        $this->post(route('studio.lesson-plans.reschedule'), [
            'lesson_plan_id' => $lessonPlan->id,
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'date' => '2026-07-10',
            'start_time' => '17:00',
            'end_time' => '17:30',
            'is_permanent' => 0,
        ])->assertRedirect();

        $this->assertSame(1, $lessonPlan->scheduleOverrides()->count());
        $this->assertDatabaseHas('schedule_overrides', [
            'lesson_plan_id' => $lessonPlan->id,
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'new_date' => '2026-07-10',
            'new_start_time' => '17:00',
            'duration_minutes' => 30,
        ]);
    }

    /** @test */
    public function it_does_not_reschedule_a_lesson_to_its_current_time()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 1,
        ]);

        $this->signIn();

        $this
            ->from(route('studio.home'))
            ->post(route('studio.lesson-plans.reschedule'), [
                'lesson_plan_id' => $lessonPlan->id,
                'original_date' => '2026-07-08',
                'original_start_time' => '15:30',
                'date' => '2026-07-08',
                'start_time' => '15:30',
                'end_time' => '16:15',
                'is_permanent' => 0,
            ])
            ->assertRedirect(route('studio.home'))
            ->assertSessionHasErrors(['date' => 'The lesson is already scheduled for that time.']);

        $this->assertSame(0, $lessonPlan->scheduleOverrides()->count());
    }

    /** @test */
    public function it_does_not_reschedule_an_override_to_its_current_time()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 1,
        ]);

        ScheduleOverride::factory()->lessonPlan($lessonPlan)->create([
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'new_date' => '2026-07-09',
            'new_start_time' => '16:00',
            'duration_minutes' => 45,
        ]);

        $this->signIn();

        $this
            ->from(route('studio.home'))
            ->post(route('studio.lesson-plans.reschedule'), [
                'lesson_plan_id' => $lessonPlan->id,
                'original_date' => '2026-07-08',
                'original_start_time' => '15:30',
                'date' => '2026-07-09',
                'start_time' => '16:00',
                'end_time' => '16:45',
                'is_permanent' => 0,
            ])
            ->assertRedirect(route('studio.home'))
            ->assertSessionHasErrors(['date' => 'The lesson is already scheduled for that time.']);

        $this->assertSame(1, $lessonPlan->scheduleOverrides()->count());
        $this->assertDatabaseHas('schedule_overrides', [
            'lesson_plan_id' => $lessonPlan->id,
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'new_date' => '2026-07-09',
            'new_start_time' => '16:00',
        ]);
    }

    /** @test */
    public function it_can_reschedule_a_lesson_plan_permanently()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 1,
        ]);

        ScheduleOverride::factory()->lessonPlan($lessonPlan)->create();

        $this->signIn();

        $this->post(route('studio.lesson-plans.reschedule'), [
            'lesson_plan_id' => $lessonPlan->id,
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'date' => '2026-07-10',
            'start_time' => '16:00',
            'end_time' => '17:00',
            'is_permanent' => 1,
        ])->assertRedirect();

        $lessonPlan->refresh();
        $newLessonPlan = LessonPlan::where('student_id', $lessonPlan->student_id)
            ->whereKeyNot($lessonPlan->id)
            ->firstOrFail();

        $this->assertSame('2026-07-08', $lessonPlan->ends_on->toDateString());
        $this->assertSame('2026-07-10', $newLessonPlan->starts_on->toDateString());
        $this->assertSame(6, (int) $newLessonPlan->weekday);
        $this->assertSame('16:00', $newLessonPlan->start_time);
        $this->assertSame(60, (int) $newLessonPlan->duration_minutes);
        $this->assertSame(0, $lessonPlan->scheduleOverrides()->count());
    }

    /** @test */
    public function it_cancels_a_lesson_occurrence_with_a_normal_form_post()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'starts_on' => '2026-07-01',
        ]);

        $this->signIn();

        $response = $this->from(route('studio.home'))->post(route('studio.lessons.cancel'), [
            'lesson_plan_id' => $lessonPlan->id,
            'date' => '2026-07-08',
            'start' => '15:30',
            'end' => '16:15',
            'scheduled_date' => '2026-07-08',
            'scheduled_start_time' => '15:30',
            'schedule_override_id' => '',
            'canceled_by' => 'student',
        ]);

        $response
            ->assertRedirect(route('studio.home'))
            ->assertSessionHas('success', 'The lesson was successfully canceled');

        $lesson = Lesson::firstOrFail();

        $this->assertSame($lessonPlan->id, $lesson->lesson_plan_id);
        $this->assertSame('canceled', $lesson->paymentStatus());
        $this->assertSame('student', $lesson->canceled_by);
        $this->assertNotNull($lesson->canceled_at);
    }

    /** @test */
    public function canceling_a_single_lesson_plan_deletes_the_plan_without_a_cancel_reason()
    {
        $singleLessonPlan = SingleLessonPlan::factory()->create([
            'scheduled_date' => '2026-07-15',
            'start_time' => '15:30',
            'duration_minutes' => 45,
        ]);

        $this->signIn();

        $response = $this->from(route('studio.home'))->post(route('studio.lessons.cancel'), [
            'single_lesson_plan_id' => $singleLessonPlan->id,
            'date' => '2026-07-15',
            'start' => '15:30',
            'end' => '16:15',
            'scheduled_date' => '2026-07-15',
            'scheduled_start_time' => '15:30',
            'schedule_override_id' => '',
        ]);

        $response
            ->assertRedirect(route('studio.home'))
            ->assertSessionHas('success', 'The single lesson was successfully canceled');

        $this->assertDatabaseMissing('single_lesson_plans', ['id' => $singleLessonPlan->id]);
        $this->assertDatabaseCount('lessons', 0);
    }

    /** @test */
    public function canceling_a_rescheduled_lesson_deletes_the_schedule_override()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'starts_on' => '2026-07-01',
        ]);
        $override = ScheduleOverride::factory()->lessonPlan($lessonPlan)->create([
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'new_date' => '2026-07-09',
            'new_start_time' => '16:00',
            'duration_minutes' => 30,
        ]);

        $this->signIn();

        $this->post(route('studio.lessons.cancel'), [
            'lesson_plan_id' => $lessonPlan->id,
            'date' => '2026-07-09',
            'start' => '16:00',
            'end' => '16:30',
            'scheduled_date' => '2026-07-08',
            'scheduled_start_time' => '15:30',
            'schedule_override_id' => $override->id,
            'canceled_by' => 'teacher',
        ])->assertRedirect();

        $this->assertDatabaseMissing('schedule_overrides', ['id' => $override->id]);
        $lesson = Lesson::firstOrFail();

        $this->assertSame($lessonPlan->id, $lesson->lesson_plan_id);
        $this->assertSame('teacher', $lesson->canceled_by);
        $this->assertSame('2026-07-08', $lesson->scheduled_date->toDateString());
        $this->assertSame('15:30', $lesson->scheduled_start_time);
    }

    /** @test */
    public function reverting_a_canceled_lesson_deletes_the_lesson_so_the_plan_occurrence_returns()
    {
        $lessonPlan = LessonPlan::factory()->create();
        $lesson = Lesson::factory()->lessonPlan($lessonPlan)->create([
            'canceled_at' => '2026-07-08 12:00:00',
            'canceled_by' => 'student',
            'paid_at' => null,
        ]);

        $this->signIn();

        $this->postJson(route('studio.lessons.revert'), [
            'lesson_id' => $lesson->id,
            'schedule_override_id' => '',
        ])
            ->assertOk()
            ->assertJsonPath('status', 'unconfirmed')
            ->assertJsonPath('lesson_reverted', true)
            ->assertJsonPath('lesson_deleted', true)
            ->assertJsonPath('lesson_id', '');

        $this->assertDatabaseMissing('lessons', ['id' => $lesson->id]);
    }

    /** @test */
    public function reverting_an_unpaid_lesson_deletes_the_lesson_so_the_plan_occurrence_returns()
    {
        $lessonPlan = LessonPlan::factory()->create();
        $lesson = Lesson::factory()->lessonPlan($lessonPlan)->create([
            'paid_at' => null,
            'canceled_at' => null,
        ]);

        $this->signIn();

        $this->postJson(route('studio.lessons.revert'), [
            'lesson_id' => $lesson->id,
            'schedule_override_id' => '',
        ])
            ->assertOk()
            ->assertJsonPath('status', 'unconfirmed')
            ->assertJsonPath('lesson_reverted', true)
            ->assertJsonPath('lesson_deleted', true)
            ->assertJsonPath('lesson_id', '');

        $this->assertDatabaseMissing('lessons', ['id' => $lesson->id]);
    }

    /** @test */
    public function reverting_an_unpaid_single_lesson_deletes_only_the_confirmed_lesson()
    {
        $singleLessonPlan = SingleLessonPlan::factory()->create([
            'scheduled_date' => '2026-07-15',
            'start_time' => '15:30',
            'duration_minutes' => 45,
        ]);
        $lesson = Lesson::factory()->create([
            'student_id' => $singleLessonPlan->student_id,
            'lesson_plan_id' => null,
            'starts_at' => '2026-07-15 15:30:00',
            'ends_at' => '2026-07-15 16:15:00',
            'scheduled_date' => '2026-07-15',
            'scheduled_start_time' => '15:30',
            'paid_at' => null,
            'canceled_at' => null,
        ]);

        $this->signIn();

        $this->postJson(route('studio.lessons.revert'), [
            'lesson_id' => $lesson->id,
            'schedule_override_id' => '',
        ])
            ->assertOk()
            ->assertJsonPath('status', 'unconfirmed')
            ->assertJsonPath('lesson_reverted', true)
            ->assertJsonPath('lesson_deleted', true)
            ->assertJsonPath('lesson_id', '');

        $this->assertDatabaseHas('single_lesson_plans', ['id' => $singleLessonPlan->id]);
        $this->assertDatabaseMissing('lessons', ['id' => $lesson->id]);
    }

    /** @test */
    public function reverting_a_paid_lesson_keeps_the_lesson_and_marks_it_unpaid()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'fee_amount' => 6000,
            'payment_method' => 'Venmo',
        ]);
        $lesson = Lesson::factory()->lessonPlan($lessonPlan)->paid(6000)->create([
            'payment_method' => 'Venmo',
            'canceled_at' => null,
        ]);

        $this->signIn();

        $this->postJson(route('studio.lessons.revert'), [
            'lesson_id' => $lesson->id,
            'schedule_override_id' => '',
        ])
            ->assertOk()
            ->assertJsonPath('status', 'unpaid')
            ->assertJsonPath('lesson_reverted', true)
            ->assertJsonPath('lesson_deleted', false)
            ->assertJsonPath('lesson_id', $lesson->id);

        $lesson->refresh();

        $this->assertNull($lesson->paid_at);
        $this->assertNull($lesson->payment_method);
        $this->assertSame('unpaid', $lesson->paymentStatus());
    }

    /** @test */
    public function reverting_a_rescheduled_lesson_deletes_the_schedule_override()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 4,
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'starts_on' => '2026-07-01',
        ]);
        $override = ScheduleOverride::factory()->lessonPlan($lessonPlan)->create([
            'original_date' => '2026-07-08',
            'original_start_time' => '15:30',
            'new_date' => '2026-07-09',
            'new_start_time' => '16:00',
            'duration_minutes' => 30,
        ]);

        $this->signIn();

        $this->postJson(route('studio.lessons.revert'), [
            'lesson_id' => '',
            'schedule_override_id' => $override->id,
        ])
            ->assertOk()
            ->assertJsonPath('schedule_override_deleted', true)
            ->assertJsonPath('status', 'unconfirmed');

        $this->assertDatabaseMissing('schedule_overrides', ['id' => $override->id]);
    }

    /** @test */
    public function confirming_a_single_lesson_plan_creates_a_single_lesson_and_keeps_the_pending_plan()
    {
        $location = Location::factory()->create([
            'tax_withheld_percentage' => 25,
        ]);
        $singleLessonPlan = SingleLessonPlan::factory()->create([
            'location_id' => $location->id,
            'scheduled_date' => '2026-07-15',
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'fee_amount' => 8000,
            'payment_method' => 'Venmo',
            'notes' => 'One-off makeup lesson.',
        ]);

        $this->signIn();

        $this->postJson(route('studio.lessons.store'), [
            'single_lesson_plan_id' => $singleLessonPlan->id,
            'date' => '2026-07-15',
            'start' => '15:30',
            'end' => '16:15',
            'scheduled_date' => '2026-07-15',
            'scheduled_start_time' => '15:30',
        ])
            ->assertOk()
            ->assertJsonPath('status', 'unpaid')
            ->assertJsonMissing(['single_lesson_plan_deleted' => true]);

        $this->assertDatabaseHas('single_lesson_plans', ['id' => $singleLessonPlan->id]);
        $this->assertDatabaseHas('lessons', [
            'student_id' => $singleLessonPlan->student_id,
            'lesson_plan_id' => null,
            'scheduled_date' => '2026-07-15 00:00:00',
            'scheduled_start_time' => '15:30',
            'fee_amount' => 6000,
            'payment_method' => 'Venmo',
            'notes' => 'One-off makeup lesson.',
        ]);
    }

    /** @test */
    public function calendar_payload_marks_a_confirmed_single_lesson_plan_as_unpaid()
    {
        $singleLessonPlan = SingleLessonPlan::factory()->create([
            'scheduled_date' => '2026-07-15',
            'start_time' => '15:30',
            'duration_minutes' => 45,
        ]);
        $lesson = Lesson::factory()->create([
            'student_id' => $singleLessonPlan->student_id,
            'lesson_plan_id' => null,
            'starts_at' => '2026-07-15 15:30:00',
            'ends_at' => '2026-07-15 16:15:00',
            'scheduled_date' => '2026-07-15',
            'scheduled_start_time' => '15:30',
            'paid_at' => null,
            'canceled_at' => null,
        ]);

        $singleLesson = app(Scheduler::class)->singleLessonPlans([
            'start' => '2026-07-01',
            'end' => '2026-07-31',
        ])->first();
        $occurrence = $singleLesson['occurrences'][0];

        $this->assertSame($singleLessonPlan->id, $occurrence['single_lesson_plan_id']);
        $this->assertSame($lesson->id, $occurrence['lesson_id']);
        $this->assertSame('unpaid', $occurrence['lesson_status']);
        $this->assertSame('unpaid', $occurrence['calendar_status']);
    }

    private function lessonPlanPayload(array $overrides = [])
    {
        return array_merge([
            'student_id' => Student::factory()->create()->id,
            'weekday' => 2,
            'recurrence_interval' => 1,
            'starts_on' => '07/06/2026',
            'ends_on' => '',
            'start_time' => '15:30',
            'duration_minutes' => 45,
            'fee_amount' => '30',
            'payment_method' => 'cash',
            'location_id' => Location::factory()->create()->id,
            'status' => 'active',
            'notes' => '',
        ], $overrides);
    }
}
