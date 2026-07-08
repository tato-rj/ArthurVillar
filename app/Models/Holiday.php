<?php

namespace App\Models;

use Carbon\Carbon;

class Holiday extends BaseModel
{
    public const FIXED_DATE = 'fixed_date';
    public const NTH_WEEKDAY = 'nth_weekday';
    public const LAST_WEEKDAY = 'last_weekday';
    public const EASTER = 'easter';

    protected $casts = [
        'is_observed' => 'boolean',
        'observes_substitute_date' => 'boolean',
    ];

    public function scopeObserved($query)
    {
        return $query->where('is_observed', true);
    }

    public function datesForYear($year)
    {
        $date = $this->dateForYear($year);
        $dates = collect([
            [
                'date' => $date,
                'title' => $this->title,
            ],
        ]);

        if (! $this->observes_substitute_date) {
            return $dates;
        }

        $observed = $this->observedDate($date);

        if (! $observed->isSameDay($date)) {
            $dates->push([
                'date' => $observed,
                'title' => $this->title.' (observed)',
            ]);
        }

        return $dates;
    }

    public function dateForYear($year)
    {
        if ($this->rule === static::FIXED_DATE) {
            return Carbon::create($year, $this->month, $this->day)->startOfDay();
        }

        if ($this->rule === static::NTH_WEEKDAY) {
            return $this->nthWeekdayOfMonth($year, $this->month, $this->weekday, $this->week_number);
        }

        if ($this->rule === static::LAST_WEEKDAY) {
            return $this->lastWeekdayOfMonth($year, $this->month, $this->weekday);
        }

        if ($this->rule === static::EASTER) {
            return Carbon::createFromTimestamp(easter_date($year))->startOfDay();
        }

        throw new \InvalidArgumentException('Unsupported holiday rule.');
    }

    public function nextDate(Carbon $from = null)
    {
        $from = ($from ?: now())->copy()->startOfDay();

        for ($year = $from->year; $year <= $from->year + 5; $year++) {
            $date = $this->datesForYear($year)
                ->pluck('date')
                ->sort()
                ->first(fn (Carbon $date) => $date->gte($from));

            if ($date) {
                return $date;
            }
        }

        return $this->dateForYear($from->year + 1);
    }

    private function nthWeekdayOfMonth($year, $month, $weekday, $weekNumber)
    {
        $date = Carbon::create($year, $month, 1)->startOfDay();

        while ($date->dayOfWeek !== (int) $weekday) {
            $date->addDay();
        }

        return $date->addWeeks(((int) $weekNumber) - 1);
    }

    private function lastWeekdayOfMonth($year, $month, $weekday)
    {
        $date = Carbon::create($year, $month, 1)->endOfMonth()->startOfDay();

        while ($date->dayOfWeek !== (int) $weekday) {
            $date->subDay();
        }

        return $date;
    }

    private function observedDate(Carbon $date)
    {
        if ($date->isSaturday()) {
            return $date->copy()->subDay();
        }

        if ($date->isSunday()) {
            return $date->copy()->addDay();
        }

        return $date->copy();
    }
}
