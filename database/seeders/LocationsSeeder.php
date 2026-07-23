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
            ['name' => 'Home', 'fee_amount' => 6000, 'tax_withheld_percentage' => 0, 'usage' => Location::USAGE_TEACHING],
            ['name' => 'BKCM', 'fee_amount' => 6000, 'tax_withheld_percentage' => 30, 'usage' => Location::USAGE_TEACHING],
            ['name' => 'Online', 'fee_amount' => 6000, 'tax_withheld_percentage' => 0, 'usage' => Location::USAGE_TEACHING],
            [
                'name' => 'Calendar Recital Hall',
                'fee_amount' => null,
                'tax_withheld_percentage' => 0,
                'address' => '123 Main Street',
                'city' => 'New York',
                'state' => 'NY',
                'postal_code' => '10001',
                'usage' => Location::USAGE_RECITAL,
            ],
        ])->each(function ($location) {
            Location::updateOrCreate(
                ['name' => $location['name']],
                array_merge($location, ['is_active' => true])
            );
        });
    }
}
