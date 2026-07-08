<?php

namespace Tests\Feature;

use Tests\BaseTest;
use Carbon\Carbon;
use App\Models\Holiday;

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
            ->get(route('studio.holidays.index'))
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
            ->patch(route('studio.holidays.update', $holiday), [])
            ->assertRedirect();

        $this->assertFalse($holiday->fresh()->is_observed);
    }

    /** @test */
    public function unobserved_holidays_do_not_show_on_the_calendar()
    {
        Holiday::factory()->fixed(7, 4)->create([
            'title' => 'Independence Day',
            'is_observed' => false,
        ]);

        $this->signIn();

        $this
            ->getJson(route('studio.home', [
                'view' => 'day',
                'date' => '2026-07-04',
                'lesson_plans' => 1,
            ]))
            ->assertOk()
            ->assertJsonMissing([
                'title' => 'Independence Day',
            ]);
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
            ->getJson(route('studio.home', [
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
            ->get(route('studio.holidays.index'))
            ->assertOk()
            ->assertSeeInOrder(['Labor Day', 'Sep 7, 2026', 'Easter Sunday', 'Mar 28, 2027'])
            ->assertSee('Easter Sunday')
            ->assertSee('Mar 28, 2027');

        Carbon::setTestNow();
    }
}
