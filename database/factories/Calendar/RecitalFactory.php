<?php

namespace Database\Factories\Calendar;

use App\Models\Calendar\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recital>
 */
class RecitalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->randomElement(['Spring Recital', 'Summer Showcase', 'Winter Concert']),
            'date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'start_time' => $this->faker->randomElement(['14:00', '16:00', '18:30']),
            'venue_id' => Venue::query()->inRandomOrder()->value('id') ?: Venue::factory(),
        ];
    }
}
