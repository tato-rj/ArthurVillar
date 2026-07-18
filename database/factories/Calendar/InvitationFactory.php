<?php

namespace Database\Factories\Calendar;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Calendar\Invitation>
 */
class InvitationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'public_id' => (string) Str::uuid(),
            'title' => $this->faker->randomElement([
                'Coffee meeting',
                'Project planning',
                'Dinner',
                'Piano lesson consultation',
            ]),
            'description' => $this->faker->optional()->sentence(),
            'duration_minutes' => $this->faker->randomElement([30, 45, 60, 90]),
        ];
    }
}
