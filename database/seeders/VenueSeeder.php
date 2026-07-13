<?php

namespace Database\Seeders;

use App\Models\Venue;
use Illuminate\Database\Seeder;

class VenueSeeder extends Seeder
{
    public function run()
    {
        collect([
            [
                'name' => 'Studio Recital Hall',
                'address_line_1' => '123 Main Street',
                'city' => 'New York',
                'state' => 'NY',
                'postal_code' => '10001',
            ],
        ])->each(function (array $venue) {
            Venue::updateOrCreate(['name' => $venue['name']], $venue);
        });
    }
}
