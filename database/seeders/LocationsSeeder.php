<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Calendar\Location;

class LocationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            ['name' => 'Home', 'fee_amount' => 6000, 'tax_withheld_percentage' => 0],
            ['name' => 'BKCM', 'fee_amount' => 6000, 'tax_withheld_percentage' => 30],
            ['name' => 'Online', 'fee_amount' => 6000, 'tax_withheld_percentage' => 0],
        ])->each(function ($location) {
            Location::updateOrCreate(
                ['name' => $location['name']],
                array_merge($location, ['is_active' => true])
            );
        });
    }
}
