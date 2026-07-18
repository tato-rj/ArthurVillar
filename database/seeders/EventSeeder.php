<?php

namespace Database\Seeders;

use App\Models\Calendar\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Event::factory()->count(8)->create();
    }
}
