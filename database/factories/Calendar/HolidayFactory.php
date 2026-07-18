<?php

namespace Database\Factories\Calendar;

use App\Models\Calendar\Holiday;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Holiday>
 */
class HolidayFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'slug' => $this->faker->unique()->slug(),
            'title' => $this->faker->words(2, true),
            'rule' => Holiday::FIXED_DATE,
            'month' => $this->faker->numberBetween(1, 12),
            'day' => $this->faker->numberBetween(1, 28),
            'weekday' => null,
            'week_number' => null,
            'is_observed' => true,
            'observes_substitute_date' => true,
        ];
    }

    public function fixed($month, $day)
    {
        return $this->state([
            'rule' => Holiday::FIXED_DATE,
            'month' => $month,
            'day' => $day,
            'weekday' => null,
            'week_number' => null,
        ]);
    }

    public function nthWeekday($month, $weekday = Carbon::MONDAY, $weekNumber = 1)
    {
        return $this->state([
            'rule' => Holiday::NTH_WEEKDAY,
            'month' => $month,
            'day' => null,
            'weekday' => $weekday,
            'week_number' => $weekNumber,
        ]);
    }

    public function lastWeekday($month, $weekday = Carbon::MONDAY)
    {
        return $this->state([
            'rule' => Holiday::LAST_WEEKDAY,
            'month' => $month,
            'day' => null,
            'weekday' => $weekday,
            'week_number' => null,
        ]);
    }
}
