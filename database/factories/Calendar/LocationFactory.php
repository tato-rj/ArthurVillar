<?php

namespace Database\Factories\Calendar;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = Str::title($this->faker->unique()->word());

        return [
            'name' => $name,
            'fee_amount' => $this->faker->randomElement([3000, 4500, 6000]),
            'tax_withheld_percentage' => 0,
            'is_active' => true,
            'notes' => null,
        ];
    }
}
