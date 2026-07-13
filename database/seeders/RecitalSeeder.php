<?php

namespace Database\Seeders;

use App\Models\Recital;
use App\Models\Student;
use Illuminate\Database\Seeder;

class RecitalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Recital::factory()->count(3)->create()->each(function (Recital $recital) {
            $recital->students()->sync(
                Student::query()->inRandomOrder()->limit(6)->pluck('id')
            );
        });
    }
}
