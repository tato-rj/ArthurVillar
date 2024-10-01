<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Continent;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Country>
 */
class CountryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = $this->faker->unique()->word;

        return [
            'name' => $name,
            'slug' => str_slug($name),
            'nationality' => $this->faker->word,
            'continent_id' => function() {
                return Continent::factory()->create()->id;
            },
            'iso' => $this->faker->word
        ];
    }
}
