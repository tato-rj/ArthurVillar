<?php

namespace Tests\Feature;

use Tests\BaseTest;

class DateRangeFilterTest extends BaseTest
{
    /** @test */
    public function table_date_filters_use_the_shared_range_calendar()
    {
        $this->signIn();

        collect([
            [route('calendar.lessons.index'), 'lessons-paid-from', 'lessons-paid-to'],
            [route('calendar.lessons.canceled'), 'canceled-lessons-from', 'canceled-lessons-to'],
            [route('calendar.lesson-plans.index'), 'lesson-plans-starts-from', 'lesson-plans-starts-to'],
            [route('calendar.single-lesson-plans.index'), 'single-lesson-plans-scheduled-from', 'single-lesson-plans-scheduled-to'],
        ])->each(function ($filter) {
            $this->get($filter[0])
                ->assertOk()
                ->assertSee('data-date-range', false)
                ->assertSee('data-date-range-grid', false)
                ->assertSee('id="'.$filter[1].'"', false)
                ->assertSee('id="'.$filter[2].'"', false);
        });
    }

    /** @test */
    public function the_financial_report_uses_the_range_calendar_with_month_parameters()
    {
        $this->signIn();

        $this->get(route('calendar.expenses.report', [
            'starts_from' => '2026-07',
            'starts_to' => '2026-09',
        ]))
            ->assertOk()
            ->assertSee('data-date-range', false)
            ->assertSee('data-output="month"', false)
            ->assertSee('name="starts_from"', false)
            ->assertSee('value="2026-07"', false)
            ->assertSee('name="starts_to"', false)
            ->assertSee('value="2026-09"', false);
    }
}
