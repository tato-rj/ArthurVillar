<?php

namespace Tests\Unit;

use Tests\BaseTest;
use App\Models\{Student, LessonPlan, Lesson, ScheduleOverride, TeachingBreak, Holiday, Location};
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
    public function it_is_current_when_today_is_inside_a_complete_date_range()
    {
        Carbon::setTestNow(Carbon::parse('2026-07-08 12:00:00'));

        $this->assertTrue(LessonPlan::factory()->make([
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-07-31',
        ])->isCurrent());

        $this->assertFalse(LessonPlan::factory()->make([
            'starts_on' => null,
            'ends_on' => '2026-07-31',
        ])->isCurrent());

        $this->assertFalse(LessonPlan::factory()->make([
            'starts_on' => '2026-07-01',
            'ends_on' => null,
        ])->isCurrent());

        $this->assertTrue(LessonPlan::factory()->make([
            'starts_on' => '2026-07-08',
            'ends_on' => '2026-07-31',
        ])->isCurrent());

        $this->assertTrue(LessonPlan::factory()->make([
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-07-08',
        ])->isCurrent());

        Carbon::setTestNow();
    }

    /** @test */
    public function the_closest_upcoming_complete_plan_is_also_active()
    {
        Carbon::setTestNow(Carbon::parse('2026-07-08 12:00:00'));

        $student = Student::factory()->create();

        $closestUpcomingPlan = LessonPlan::factory()->student($student)->create([
            'starts_on' => '2026-07-15',
            'ends_on' => '2026-08-15',
            'start_time' => '16:00',
        ]);

        $laterUpcomingPlan = LessonPlan::factory()->student($student)->create([
            'starts_on' => '2026-07-22',
            'ends_on' => '2026-08-22',
            'start_time' => '16:00',
        ]);

        $incompleteUpcomingPlan = LessonPlan::factory()->student($student)->create([
            'starts_on' => '2026-07-10',
            'ends_on' => null,
            'start_time' => '16:00',
        ]);

        $this->assertTrue($closestUpcomingPlan->fresh()->isCurrent());
        $this->assertFalse($laterUpcomingPlan->fresh()->isCurrent());
        $this->assertFalse($incompleteUpcomingPlan->fresh()->isCurrent());

        Carbon::setTestNow();
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

    /** @test */
    public function a_projected_lesson_count_is_null_when_the_plan_has_no_end_date()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'starts_on' => '2026-12-04',
            'ends_on' => null,
        ]);

        $this->assertNull($lessonPlan->projectedLessonCount());
    }

    /** @test */
    public function it_projects_lesson_count_after_discounting_breaks_cancellations_and_holidays()
    {
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => 6,
            'start_time' => '15:30',
            'starts_on' => '2026-12-04',
            'ends_on' => '2026-12-25',
            'recurrence_interval' => 1,
        ]);

        TeachingBreak::factory()->create([
            'starts_on' => '2026-12-11',
            'ends_on' => '2026-12-11',
        ]);

        Holiday::factory()->fixed(12, 25)->create([
            'title' => 'Christmas Day',
            'is_observed' => true,
        ]);

        Lesson::factory()->lessonPlan($lessonPlan)->create([
            'scheduled_date' => '2026-12-18',
            'scheduled_start_time' => '15:30',
            'starts_at' => '2026-12-18 15:30:00',
            'ends_at' => '2026-12-18 16:15:00',
            'canceled_at' => '2026-12-18 10:00:00',
            'canceled_by' => 'student',
        ]);

        $this->assertSame(1, $lessonPlan->projectedLessonCount());
    }

    /** @test */
    public function location_specific_breaks_only_discount_matching_lesson_plans_from_projected_counts()
    {
        $blockedLocation = Location::factory()->create();
        $openLocation = Location::factory()->create();

        $blockedLessonPlan = LessonPlan::factory()->create([
            'location_id' => $blockedLocation->id,
            'weekday' => 6,
            'start_time' => '15:30',
            'starts_on' => '2026-12-04',
            'ends_on' => '2026-12-11',
            'recurrence_interval' => 1,
        ]);

        $openLessonPlan = LessonPlan::factory()->create([
            'location_id' => $openLocation->id,
            'weekday' => 6,
            'start_time' => '15:30',
            'starts_on' => '2026-12-04',
            'ends_on' => '2026-12-11',
            'recurrence_interval' => 1,
        ]);

        $teachingBreak = TeachingBreak::factory()->create([
            'starts_on' => '2026-12-11',
            'ends_on' => '2026-12-11',
        ]);
        $teachingBreak->locations()->attach($blockedLocation);

        $this->assertSame(1, $blockedLessonPlan->projectedLessonCount());
        $this->assertSame(2, $openLessonPlan->projectedLessonCount());
    }
}
