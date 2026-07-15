<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Settings::query()->firstOrCreate(
            ['key' => 'calendar.show_cancelled'],
            [
                'value' => 'false',
                'type' => Settings::TYPE_BOOLEAN,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'calendar.add_transparency_to_past_events'],
            [
                'value' => 'true',
                'type' => Settings::TYPE_BOOLEAN,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'calendar.highlight_conflicting_events'],
            [
                'value' => 'true',
                'type' => Settings::TYPE_BOOLEAN,
            ]
        );
    }
}
