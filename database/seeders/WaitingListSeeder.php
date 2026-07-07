<?php

namespace Database\Seeders;

use App\Models\WaitingList;
use Illuminate\Database\Seeder;

class WaitingListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        WaitingList::factory()->count(8)->create();
    }
}
