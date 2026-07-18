<?php

namespace Database\Seeders;

use App\Models\Calendar\Venue;
use Illuminate\Database\Seeder;

class VenueSeeder extends Seeder
{
    public function run()
    {
        collect([
            [
                'name' => 'Calendar Recital Hall',
                'address' => '123 Main Street',
                'city' => 'New York',
                'state' => 'NY',
                'postal_code' => '10001',
                'map_url' => 'https://maps.google.com/?q=123+Main+Street+New+York+NY+10001',
            ],
        ])->each(function (array $venue) {
            Venue::updateOrCreate(['name' => $venue['name']], $venue);
        });
    }
}
