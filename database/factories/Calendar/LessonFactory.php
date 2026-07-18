<?php

namespace Database\Factories\Calendar;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Calendar\{Student, LessonPlan};

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class LessonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $duration = $this->faker->randomElement([30, 45, 60, 90]);
        $startMinutes = $this->faker->numberBetween(8 * 4, (int) (((21 * 60) - $duration) / 15)) * 15;
        $startsAt = carbon($this->faker->dateTimeBetween('now', '+3 months'))
            ->setTime(intdiv($startMinutes, 60), $startMinutes % 60, 0);
        $student = Student::factory()->create();

        return [
            'student_id' => function() use ($student) {
                return $student->id;
            },
            'lesson_plan_id' => function() use ($student) {
                return LessonPlan::factory()->student($student)->create()->id;
            },
            'starts_at' => $startsAt,
            'ends_at' => $startsAt->copy()->addMinutes($duration),
        ];
    }

    public function student(Student $student)
    {
        return $this->state(function (array $attributes) use ($student) {
            return [
                'student_id' => $student->id,
                'lesson_plan_id' => $student->currentLessonPlan()->id
            ];
        });
    }

    public function lessonPlan(LessonPlan $lessonPlan)
    {
        return $this->state(function (array $attributes) use ($lessonPlan) {
            return [
                'student_id' => $lessonPlan->student->id,
                'lesson_plan_id' => $lessonPlan->id
            ];
        });
    }

    public function paid($fee)
    {
        return $this->state(function (array $attributes) use ($fee) {
            return [
                'paid_at' => now(),
                'fee_amount' => $fee
            ];
        });
    }
}
