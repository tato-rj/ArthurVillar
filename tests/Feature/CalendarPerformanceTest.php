<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Calendar\Lesson;
use App\Models\Calendar\LessonPlan;
use App\Models\Calendar\Location;
use App\Models\Calendar\Student;
use App\Models\Calendar\Holiday;
use App\Models\Calendar\TeachingBreak;
use Illuminate\Support\Facades\DB;
use Tests\BaseTest;

class CalendarPerformanceTest extends BaseTest
{
    public function test_calendar_query_count_does_not_grow_per_recurring_plan()
    {
        $student = Student::factory()->create();
        $location = Location::factory()->create();
        $plans = LessonPlan::factory()->count(12)->create([
            'student_id' => $student->id,
            'location_id' => $location->id,
            'starts_on' => '2027-01-01',
            'ends_on' => '2027-12-31',
            'weekday' => 4,
            'start_time' => '15:30',
        ]);
        Lesson::factory()->lessonPlan($plans->first())->create([
            'scheduled_date' => '2027-01-06',
            'scheduled_start_time' => '15:30',
            'starts_at' => '2027-01-06 15:30:00',
            'ends_at' => '2027-01-06 16:15:00',
            'canceled_at' => now(),
        ]);
        $expected = $plans->mapWithKeys(fn ($plan) => [$plan->id => $plan->projectedLessonCount()]);

        DB::enableQueryLog();
        DB::flushQueryLog();
        $started = microtime(true);
        $payload = app(Scheduler::class)->plannedLessons(['start' => '2027-01-01', 'end' => '2027-01-31']);
        $queries = count(DB::getQueryLog());
        DB::disableQueryLog();
        fwrite(STDERR, sprintf("\nCalendar fixture: %d queries, %.1f ms, %d bytes\n", $queries, (microtime(true) - $started) * 1000, strlen($payload->toJson())));

        $this->assertCount(12, $payload);
        foreach ($payload as $plan) {
            $this->assertSame($expected[$plan['id']], $plan['projected_occurrence_count']);
        }
        $this->assertLessThanOrEqual(15, $queries, 'Calendar loading must batch shared plan-summary queries.');
    }

    public function test_batched_counts_preserve_holidays_break_locations_and_cancellations()
    {
        $studio = Location::factory()->create();
        $other = Location::factory()->create();
        Holiday::factory()->fixed(1, 13)->create();
        $break = TeachingBreak::factory()->create(['starts_on' => '2027-01-20', 'ends_on' => '2027-01-20']);
        $break->locations()->attach($studio);
        $plans = collect([$studio, $other])->map(fn ($location) => LessonPlan::factory()->create([
            'location_id' => $location->id,
            'starts_on' => '2027-01-01', 'ends_on' => '2027-01-31',
            'weekday' => 4, 'start_time' => '15:30',
        ]));
        $plans->last()->update(['canceled_from' => '2027-01-27']);
        $models = LessonPlan::whereIn('id', $plans->pluck('id'))->get();
        $counts = LessonPlan::projectedLessonCounts($models);
        foreach ($models as $plan) {
            $this->assertSame($plan->projectedLessonCount(), $counts[$plan->id]);
        }
        $this->assertSame(2, $counts[$plans->first()->id]);
        $this->assertSame(2, $counts[$plans->last()->id]);
    }
}
