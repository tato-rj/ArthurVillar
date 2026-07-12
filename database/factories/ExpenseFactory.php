<?php

namespace Database\Factories;

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

        return [
            'name' => $this->faker->words(2, true),
            'amount' => $this->faker->numberBetween(10, 500) * 100,
            'recurrence' => $recurrence,
            'spent_on' => $recurrence ? null : $this->faker->date(),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}
