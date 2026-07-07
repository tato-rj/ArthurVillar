<?php

namespace Database\Seeders;

use App\Models\TeachingBreak;
use Illuminate\Database\Seeder;

class TeachingBreakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TeachingBreak::factory()->count(3)->create();
    }
}
