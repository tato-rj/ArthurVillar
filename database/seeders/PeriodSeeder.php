<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Period;

class PeriodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Period::create([
            'name' => 'Renaissance',
            'starts_in' => '1400',
            'ends_in' => '1600'
        ]);

        Period::create([
            'name' => 'Baroque',
            'starts_in' => '1600',
            'ends_in' => '1750'
        ]);

        Period::create([
            'name' => 'Classical',
            'starts_in' => '1750',
            'ends_in' => '1800'
        ]);

        Period::create([
            'name' => 'Romantic',
            'starts_in' => '1800',
            'ends_in' => '1900'
        ]);

        Period::create([
            'name' => 'Impressionistic',
            'starts_in' => '1890',
            'ends_in' => '1920'
        ]);
    }
}
