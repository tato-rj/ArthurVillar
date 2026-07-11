<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'email' => $this->faker->unique()->safeEmail(),
            'date_of_birth' => $this->faker
                                    ->dateTimeBetween('2009-01-01', now()->subYears(5))
                                    ->format('Y-m-d'),
            'location_id' => Location::query()->inRandomOrder()->value('id') ?: Location::factory(),
            'fee_amount' => $this->faker->randomElement([3000, 4500, 6000]),
            'payment_method' => $this->faker->randomElement(['Venmo', 'Zelle', 'Cash/check']),
        ];
    }
}
