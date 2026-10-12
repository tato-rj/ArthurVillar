<?php

namespace App\Calendar\Traits;

use App\Models\Calendar\Holiday;

trait Holidays {
    private function nationalHolidays(int $year, bool $observedOnly = true)
    {
        return Holiday::query()
            ->when($observedOnly, fn ($query) => $query->observed())
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
