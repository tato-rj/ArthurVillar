<?php

namespace Database\Factories\Calendar;

use App\Models\Calendar\LessonPlan;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ScheduleOverride>
 */
class ScheduleOverrideFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $lessonPlan = LessonPlan::factory()->create();

        return $this->attributesFor($lessonPlan);
    }

    public function lessonPlan(LessonPlan $lessonPlan)
    {
        return $this->state(function (array $attributes) use ($lessonPlan) {
            return $this->attributesFor($lessonPlan);
        });
    }

    private function attributesFor(LessonPlan $lessonPlan)
    {
        $originalDate = $this->occurrenceDateFor($lessonPlan);
        $duration = $lessonPlan->duration_minutes;
        $newStartMinutes = $this->faker->numberBetween(8 * 4, (int) (((21 * 60) - $duration) / 15)) * 15;

        return [
            'lesson_plan_id' => $lessonPlan->id,
            'original_date' => $originalDate->toDateString(),
            'original_start_time' => $lessonPlan->start_time,
            'new_date' => $originalDate->copy()->addDays($this->faker->numberBetween(1, 14))->toDateString(),
            'new_start_time' => sprintf('%02d:%02d', intdiv($newStartMinutes, 60), $newStartMinutes % 60),
            'duration_minutes' => $duration,
            'type' => 'reschedule',
        ];
    }

    private function occurrenceDateFor(LessonPlan $lessonPlan)
    {
        $start = Carbon::parse($lessonPlan->starts_on);
        $offset = ($lessonPlan->carbonWeekday() - $start->dayOfWeek + 7) % 7;
        $interval = max(1, (int) $lessonPlan->recurrence_interval);
        $occurrence = $start->copy()->addDays($offset);

        while ($occurrence->lt(Carbon::today())) {
            $occurrence->addWeeks($interval);
        }

        return $occurrence
            ->addWeeks($this->faker->numberBetween(0, 8) * $interval);
    }
}
