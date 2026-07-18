<?php

namespace Database\Factories\Calendar;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeachingBreak>
 */
class TeachingBreakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $startsOn = Carbon::instance($this->faker->dateTimeBetween('+1 week', '+6 months'))->startOfDay();
        $endsOn = $startsOn->copy()->addDays($this->faker->numberBetween(0, 10));

        return [
            'title' => $this->faker->randomElement(['Vacation', 'Teaching trip', 'Calendar break', 'Conference']),
            'reason' => $this->faker->optional()->sentence(),
            'starts_on' => $startsOn->toDateString(),
            'ends_on' => $endsOn->toDateString(),
        ];
    }
}
