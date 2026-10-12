<?php

namespace Tests\Feature;

use Tests\BaseTest;
use Carbon\Carbon;
use App\Models\Calendar\Holiday;
use App\Models\Calendar\LessonPlan;

class HolidayTest extends BaseTest
{
    /** @test */
    public function it_shows_the_holidays_page()
    {
        Holiday::factory()->fixed(7, 4)->create([
            'title' => 'Independence Day',
            'is_observed' => true,
        ]);

        $this->signIn();

        $this
            ->get(route('calendar.holidays.index'))
            ->assertOk()
            ->assertSee('Independence Day');
    }

    /** @test */
    public function it_updates_whether_a_holiday_is_observed()
    {
        $holiday = Holiday::factory()->fixed(7, 4)->create([
            'is_observed' => true,
        ]);

        $this->signIn();

        $this
            ->patch(route('calendar.holidays.update', $holiday), [])
            ->assertRedirect();

        $this->assertFalse($holiday->fresh()->is_observed);
    }

    /** @test */
    public function holidays_stay_visible_when_lesson_blocking_is_toggled()
    {
        $holiday = Holiday::factory()->nthWeekday(10, Carbon::MONDAY, 2)->create([
            'title' => 'Columbus Day',
            'is_observed' => true,
        ]);
        $lessonPlan = LessonPlan::factory()->create([
            'weekday' => LessonPlan::fromCarbonWeekday(Carbon::MONDAY),
            'start_time' => '15:30',
            'starts_on' => '2026-10-12',
            'ends_on' => '2026-10-12',
            'recurrence_interval' => 1,
        ]);
        $calendarUrl = route('calendar.home', [
            'view' => 'day',
            'date' => '2026-10-12',
            'lesson_plans' => 1,
        ]);

        $this->signIn();

        $this->getJson($calendarUrl)
            ->assertOk()
            ->assertJsonCount(0, 'plannedLessons')
            ->assertJsonPath('holidays.0.title', 'Columbus Day');

        $this->patch(route('calendar.holidays.update', $holiday), [])
            ->assertRedirect();

        $this->getJson($calendarUrl)
            ->assertOk()
            ->assertJsonPath('holidays.0.title', 'Columbus Day')
            ->assertJsonPath('holidays.0.date', '2026-10-12')
            ->assertJsonCount(1, 'plannedLessons')
            ->assertJsonPath('plannedLessons.0.id', $lessonPlan->id)
            ->assertJsonPath('plannedLessons.0.occurrences.0.date', '2026-10-12')
            ->assertJsonPath('plannedLessons.0.projected_occurrence_count', 1);
        $this->assertSame(1, $lessonPlan->projectedLessonCount());
        $this->assertCount(0, $lessonPlan->missedLessonDates(Carbon::parse('2026-10-12')));

        $this->patch(route('calendar.holidays.update', $holiday), ['is_observed' => 1])
            ->assertRedirect();

        $this->getJson($calendarUrl)
            ->assertOk()
            ->assertJsonCount(0, 'plannedLessons')
            ->assertJsonPath('holidays.0.title', 'Columbus Day');
        $this->assertSame(0, $lessonPlan->projectedLessonCount());
        $this->assertCount(1, $lessonPlan->missedLessonDates(Carbon::parse('2026-10-12')));
    }

    /** @test */
    public function unobserved_holidays_keep_actual_and_substitute_dates_visible_across_years()
    {
        Holiday::factory()->fixed(1, 1)->create([
            'title' => "New Year's Day",
            'is_observed' => false,
            'observes_substitute_date' => true,
        ]);

        $this->signIn();

        foreach (['2027-12-31' => "New Year's Day (observed)", '2028-01-01' => "New Year's Day"] as $date => $title) {
            $lessonPlan = LessonPlan::factory()->create([
                'weekday' => LessonPlan::fromCarbonWeekday(Carbon::parse($date)->dayOfWeek),
                'start_time' => '15:30',
                'starts_on' => $date,
                'ends_on' => $date,
                'recurrence_interval' => 1,
            ]);

            $this->getJson(route('calendar.home', [
                'view' => 'day',
                'date' => $date,
                'lesson_plans' => 1,
            ]))
                ->assertOk()
                ->assertJsonCount(1, 'holidays')
                ->assertJsonPath('holidays.0.title', $title)
                ->assertJsonPath('holidays.0.date', $date)
                ->assertJsonPath('plannedLessons.0.id', $lessonPlan->id)
                ->assertJsonPath('plannedLessons.0.occurrences.0.date', $date);
        }
    }

    /** @test */
    public function easter_sunday_can_be_observed_on_the_calendar()
    {
        Holiday::create([
            'slug' => 'easter-sunday',
            'title' => 'Easter Sunday',
            'rule' => Holiday::EASTER,
            'is_observed' => true,
            'observes_substitute_date' => false,
        ]);

        $this->signIn();

        $this
            ->getJson(route('calendar.home', [
                'view' => 'day',
                'date' => '2026-04-05',
                'lesson_plans' => 1,
            ]))
            ->assertOk()
            ->assertJsonPath('holidays.0.title', 'Easter Sunday')
            ->assertJsonPath('holidays.0.date', '2026-04-05');
    }

    /** @test */
    public function holidays_page_shows_the_next_upcoming_date_for_each_holiday()
    {
        Carbon::setTestNow(Carbon::parse('2026-07-08 12:00:00'));

        Holiday::create([
            'slug' => 'easter-sunday',
            'title' => 'Easter Sunday',
            'rule' => Holiday::EASTER,
            'is_observed' => true,
            'observes_substitute_date' => false,
        ]);

        Holiday::factory()->nthWeekday(9, Carbon::MONDAY, 1)->create([
            'title' => 'Labor Day',
            'is_observed' => true,
        ]);

        $this->signIn();

        $this
            ->get(route('calendar.holidays.index'))
            ->assertOk()
            ->assertSeeInOrder(['Labor Day', 'Sep 7, 2026', 'Easter Sunday', 'Mar 28, 2027'])
            ->assertSee('Easter Sunday')
            ->assertSee('Mar 28, 2027');

        Carbon::setTestNow();
    }
}
