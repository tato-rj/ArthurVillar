<?php

namespace Tests\Unit;

use Tests\BaseTest;
use App\Models\{Student, LessonPlan, Lesson, ScheduleOverride};

class StudentTest extends BaseTest
{
    public function setUp() : void
    {
        parent::setUp();

        $this->student = Student::factory()->create();
    }

    /** @test */
    public function a_student_has_many_lesson_plans()
    {
        LessonPlan::factory()->student($this->student)->create();

        $this->assertInstanceOf(LessonPlan::class, $this->student->lessonPlans->first());
    }

    /** @test */
    public function a_student_has_many_lessons()
    {
        LessonPlan::factory()->student($this->student)->create([
            'starts_on' => today()->subMonth()->toDateString(),
            'ends_on' => today()->addMonth()->toDateString(),
        ]);

        Lesson::factory()->student($this->student)->create();
        Lesson::factory()->student($this->student)->paid($this->student->currentLessonPlan()->fee_amount)->create();

        $this->assertTrue($this->student->lessons()->exists());
    }

    /** @test */
    public function a_student_has_many_paid_and_unpaid_lessons()
    {
        LessonPlan::factory()->student($this->student)->create([
            'starts_on' => today()->subMonth()->toDateString(),
            'ends_on' => today()->addMonth()->toDateString(),
        ]);

        Lesson::factory()->student($this->student)->create();
        Lesson::factory()->student($this->student)->paid($this->student->currentLessonPlan()->fee_amount)->create();

        $this->assertTrue($this->student->lessons()->paid()->exists());
        $this->assertTrue($this->student->lessons()->unpaid()->exists());
    }

    /** @test */
    public function a_student_has_many_schedule_overrides_through_lesson_plans()
    {
        $lessonPlan = LessonPlan::factory()->student($this->student)->create();
        ScheduleOverride::factory()->lessonPlan($lessonPlan)->create();

        $this->assertInstanceOf(ScheduleOverride::class, $this->student->scheduleOverrides->first());
    }

    /** @test */
    public function deleting_a_student_deletes_its_lesson_plans_schedule_overrides_and_lessons()
    {
        $lessonPlan = LessonPlan::factory()->student($this->student)->create();
        $lesson = Lesson::factory()->lessonPlan($lessonPlan)->create();
        $scheduleOverride = ScheduleOverride::factory()->lessonPlan($lessonPlan)->create();

        $this->student->delete();

        $this->assertDatabaseMissing('students', ['id' => $this->student->id]);
        $this->assertDatabaseMissing('lesson_plans', ['id' => $lessonPlan->id]);
        $this->assertDatabaseMissing('lessons', ['id' => $lesson->id]);
        $this->assertDatabaseMissing('schedule_overrides', ['id' => $scheduleOverride->id]);
    }
}
