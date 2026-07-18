<?php

namespace Database\Factories\Calendar;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $recurrence = $this->faker->randomElement([null, 'weekly', 'monthly']);

        $startsOn = $recurrence
            ? $this->faker->optional()->date()
            : $this->faker->date();

        return [
            'name' => $this->faker->words(2, true),
            'amount' => $this->faker->numberBetween(10, 500) * 100,
            'recurrence' => $recurrence,
            'starts_on' => $startsOn,
            'ends_on' => $startsOn ? $this->faker->optional()->dateTimeBetween($startsOn, '+1 year')->format('Y-m-d') : null,
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
