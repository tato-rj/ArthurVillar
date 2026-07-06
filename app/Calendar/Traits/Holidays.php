<?php

namespace App\Calendar\Traits;

use Carbon\Carbon;

trait Holidays {
    private function nationalHolidays(int $year)
    {
        $holidays = [
            ['date' => Carbon::create($year, 1, 1)->startOfDay(), 'title' => "New Year's Day"],
            ['date' => $this->nthWeekdayOfMonth($year, 1, Carbon::MONDAY, 3), 'title' => 'Martin Luther King Jr. Day'],
            ['date' => $this->nthWeekdayOfMonth($year, 2, Carbon::MONDAY, 3), 'title' => "Presidents' Day"],
            ['date' => $this->lastWeekdayOfMonth($year, 5, Carbon::MONDAY), 'title' => 'Memorial Day'],
            ['date' => Carbon::create($year, 6, 19)->startOfDay(), 'title' => 'Juneteenth'],
            ['date' => Carbon::create($year, 7, 4)->startOfDay(), 'title' => 'Independence Day'],
            ['date' => $this->nthWeekdayOfMonth($year, 9, Carbon::MONDAY, 1), 'title' => 'Labor Day'],
            ['date' => $this->nthWeekdayOfMonth($year, 10, Carbon::MONDAY, 2), 'title' => 'Columbus Day'],
            ['date' => Carbon::create($year, 11, 11)->startOfDay(), 'title' => 'Veterans Day'],
            ['date' => $this->nthWeekdayOfMonth($year, 11, Carbon::THURSDAY, 4), 'title' => 'Thanksgiving Day'],
            ['date' => Carbon::create($year, 12, 25)->startOfDay(), 'title' => 'Christmas Day'],
        ];

        foreach ($holidays as $holiday) {
            $observed = $this->observedDate($holiday['date']);

            if ($observed->isSameDay($holiday['date'])) {
                continue;
            }

            $holidays[] = [
                'date' => $observed,
                'title' => $holiday['title'].' (observed)',
            ];
        }

        return $holidays;
    }
}