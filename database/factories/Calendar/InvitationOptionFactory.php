<?php

namespace Database\Factories\Calendar;

use App\Models\Calendar\Invitation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Calendar\InvitationOption>
 */
class InvitationOptionFactory extends Factory
{
    public function definition()
    {
        return [
            'invitation_id' => Invitation::factory(),
            'starts_at' => $this->faker->unique()->dateTimeBetween('+1 day', '+2 months'),
        ];
    }
}
