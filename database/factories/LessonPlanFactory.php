<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Student;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LessonPlan>
 */
class LessonPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $duration = $this->faker->randomElement([30, 45, 60]);
        $startMinutes = $this->faker->numberBetween(8 * 4, (int) (((21 * 60) - $duration) / 15)) * 15;

        return [
            'student_id' => function() {
                return Student::factory()->create()->id;
            },
            'weekday' => $this->faker->numberBetween(1, 7),
            'start_time' => sprintf('%02d:%02d', intdiv($startMinutes, 60), $startMinutes % 60),
            'starts_on' => $this->faker->dateTimeThisYear()->format('Y-m-d'),
            'duration_minutes' => $duration,
            'fee_amount' => $this->faker->randomElement([3000, 4500, 6000]),
            'location' => $this->faker->randomElement(['Home', 'Online', 'BKCM']),
            'payment_method' => $this->faker->randomElement(['Venmo', 'Zelle', 'Cash/check'])
        ];
    }

    public function student(Student $student)
    {
        return $this->state(function (array $attributes) use ($student) {
            return [
                'student_id' => $student->id,
            ];
        });
    }
}
