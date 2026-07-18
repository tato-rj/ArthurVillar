<?php

namespace App\Calendar\Traits;

use App\Models\Calendar\Holiday;

trait Holidays {
    private function nationalHolidays(int $year)
    {
        return Holiday::observed()
            ->orderBy('month')
            ->orderBy('day')
            ->orderBy('week_number')
            ->orderBy('title')
            ->get()
            ->flatMap(function (Holiday $holiday) use ($year) {
                return $holiday->datesForYear($year);
            })
            ->all();
    }
}
