<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\BaseTest;
use App\Models\{Lesson, LessonPlan, ScheduleOverride, Student};

class StudioLessonFlowTest extends BaseTest
{
    /** @test */
    public function it_does_not_create_a_lesson_plan_when_the_student_already_has_a_current_active_plan()
    {
        $student = Student::factory()->create();

        LessonPlan::factory()->student($student)->create([
            'status' => 'active',
            'starts_on' => today()->subWeek()->toDateString(),
            'ends_on' => null,
        ]);

        $this->signIn();

        $response = $this->from(route('studio.students.index'))->post(route('studio.lesson-plans.store'), $this->lessonPlanPayload([
            'student_id' => $student->id,
        ]));

        $response
            ->assertRedirect(route('studio.students.index'))
            ->assertSessionHasErrors(['student_id' => 'There is already an active lesson plan.']);

        $this->assertCount(1, $student->lessonPlans()->get());
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
        ]));

        $response->assertRedirect();

        $this->assertCount(2, $student->lessonPlans()->get());

        Carbon::setTestNow();
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
            'location' => '',
            'status' => 'active',
            'notes' => '',
        ], $overrides);
    }
}
