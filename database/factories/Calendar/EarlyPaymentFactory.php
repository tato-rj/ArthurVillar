<?php

namespace Database\Factories\Calendar;

use App\Models\Calendar\EarlyPayment;
use App\Models\Calendar\LessonPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Calendar\EarlyPayment>
 */
class EarlyPaymentFactory extends Factory
{
    protected $model = EarlyPayment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'lesson_plan_id' => LessonPlan::factory(),
            'single_lesson_plan_id' => null,
            'scheduled_date' => $this->faker->dateTimeBetween('+1 day', '+3 months')->format('Y-m-d'),
            'scheduled_start_time' => $this->faker->randomElement(LessonPlan::timeOptions()),
        ];
    }
}
