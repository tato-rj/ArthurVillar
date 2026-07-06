<?php

namespace Tests\Unit;

use Tests\BaseTest;
use App\Models\{Student, LessonPlan, Lesson, ScheduleOverride};
use Carbon\Carbon;
use InvalidArgumentException;

class LessonPlanTest extends BaseTest
{
    public function setUp() : void
    {
        parent::setUp();

        $this->lessonPlan = LessonPlan::factory()->create();
    }

    /** @test */
    public function a_lesson_plan_belongs_to_a_student()
    {
        $this->assertInstanceOf(Student::class, $this->lessonPlan->student);
    }

    /** @test */
    public function a_lesson_plan_has_many_lessons()
    {
        Lesson::factory()->lessonPlan($this->lessonPlan)->create();

        $this->assertInstanceOf(Lesson::class, $this->lessonPlan->lessons->first());
    }

    /** @test */
    public function a_lesson_plan_has_many_schedule_overrides()
    {
        ScheduleOverride::factory()->lessonPlan($this->lessonPlan)->create();

        $this->assertInstanceOf(ScheduleOverride::class, $this->lessonPlan->scheduleOverrides->first());
    }

    /** @test */
    public function it_knows_how_to_calculate_the_start_time_and_end_time_for_a_lesson()
    {
        $this->assertInstanceOf(Carbon::class, $this->lessonPlan->startTime());
        $this->assertInstanceOf(Carbon::class, $this->lessonPlan->endTime());

        $this->assertTrue($this->lessonPlan->endTime()->gt($this->lessonPlan->startTime()));
    }

    /** @test */
    public function it_uses_hour_and_minute_times_on_fifteen_minute_intervals()
    {
        $this->assertSame('08:15', LessonPlan::normalizeTime('8:15'));

        $this->expectException(InvalidArgumentException::class);

        LessonPlan::normalizeTime('08:10');
    }

    /** @test */
    public function it_rejects_lesson_plan_times_with_seconds()
    {
        $this->expectException(InvalidArgumentException::class);

        LessonPlan::normalizeTime('08:15:30');
    }

    /** @test */
    public function it_queries_lesson_plans_that_have_an_occurrence_inside_a_date_range()
    {
        $weekly = LessonPlan::factory()->create([
            'weekday' => 4,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 1,
        ]);

        $biweekly = LessonPlan::factory()->create([
            'weekday' => 4,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 2,
        ]);

        $matching = LessonPlan::occurringBetween('2026-07-08', '2026-07-08')->pluck('id');

        $this->assertTrue($matching->contains($weekly->id));
        $this->assertFalse($matching->contains($biweekly->id));
    }
}
