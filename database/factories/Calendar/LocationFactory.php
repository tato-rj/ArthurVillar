<?php

namespace Database\Factories\Calendar;

use App\Models\Calendar\Location;
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
            'address' => null,
            'city' => null,
            'state' => null,
            'postal_code' => null,
            'usage' => Location::USAGE_TEACHING,
            'is_active' => true,
            'notes' => null,
        ];
    }

    public function recital()
    {
        return $this->state(fn () => [
            'fee_amount' => null,
            'usage' => Location::USAGE_RECITAL,
        ]);
    }
}
