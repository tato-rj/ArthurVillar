<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{Student, LessonPlan};

class LessonPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (Student::all() as $student) {
            LessonPlan::factory()->student($student)->create([
                'starts_on' => now()->subMonth()
            ]);
        }
    }
}
