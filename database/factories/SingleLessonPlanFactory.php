<?php

namespace Database\Factories;

use App\Models\{Location, Student};
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SingleLessonPlan>
 */
class SingleLessonPlanFactory extends Factory
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
            'location_id' => Location::query()->inRandomOrder()->value('id') ?: Location::factory(),
            'scheduled_date' => $this->faker->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'start_time' => sprintf('%02d:%02d', intdiv($startMinutes, 60), $startMinutes % 60),
            'duration_minutes' => $duration,
            'fee_amount' => $this->faker->randomElement([3000, 4500, 6000]),
            'payment_method' => $this->faker->randomElement(['Venmo', 'Zelle', 'Cash/check']),
            'meeting_url' => null,
            'notes_url' => null,
            'status' => 'active',
            'notes' => null,
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
