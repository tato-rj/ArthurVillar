<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Continent;

class ContinentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Continent::create(['name' => 'North America', 'icon' => 'earth-americas']);
        Continent::create(['name' => 'Central America', 'icon' => 'earth-americas']);
        Continent::create(['name' => 'South America', 'icon' => 'earth-americas']);
        Continent::create(['name' => 'Europe', 'icon' => 'earth-europe']);
        Continent::create(['name' => 'Asia', 'icon' => 'earth-asia']);
        Continent::create(['name' => 'Africa', 'icon' => 'earth-africa']);
        Continent::create(['name' => 'Oceania', 'icon' => 'earth-oceania']);
    }
}
