<?php

namespace Database\Seeders;

use App\Models\Calendar\{SingleLessonPlan, Student};
use Illuminate\Database\Seeder;

class SingleLessonPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Student::query()
            ->inRandomOrder()
            ->take(3)
            ->get()
            ->each(function (Student $student) {
                SingleLessonPlan::factory()->student($student)->create();
            });
    }
}
