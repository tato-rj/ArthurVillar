<?php

namespace Database\Factories\Calendar;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $startHour = $this->faker->numberBetween(8, 19);

        return [
            'name' => $this->faker->randomElement(['Dentist appointment', 'Dinner reservation', 'Calendar meeting']),
            'scheduled_date' => $this->faker->dateTimeBetween('now', '+6 months')->format('Y-m-d'),
            'starts_at' => sprintf('%02d:00', $startHour),
            'ends_at' => sprintf('%02d:00', $startHour + 1),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
