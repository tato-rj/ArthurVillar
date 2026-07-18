<?php

namespace Database\Seeders;

use App\Models\Calendar\Settings;
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
            ['key' => 'calendar.show_insights'],
            [
                'value' => 'true',
                'type' => Settings::TYPE_BOOLEAN,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'calendar.show_holidays'],
            [
                'value' => 'true',
                'type' => Settings::TYPE_BOOLEAN,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'calendar.default_desktop_view'],
            [
                'value' => 'week',
                'type' => Settings::TYPE_STRING,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'calendar.default_mobile_view'],
            [
                'value' => '2-days',
                'type' => Settings::TYPE_STRING,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'appearance.unconfirmed_lesson_color'],
            [
                'value' => '#6b7280',
                'type' => Settings::TYPE_STRING,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'appearance.unpaid_lesson_color'],
            [
                'value' => '#ff4b4b',
                'type' => Settings::TYPE_STRING,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'appearance.paid_lesson_color'],
            [
                'value' => '#58cc02',
                'type' => Settings::TYPE_STRING,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'appearance.canceled_lesson_color'],
            [
                'value' => '#ffffff',
                'type' => Settings::TYPE_STRING,
            ]
        );

        Settings::query()->firstOrCreate(
            ['key' => 'appearance.general_event_color'],
            [
                'value' => '#ce82ff',
                'type' => Settings::TYPE_STRING,
            ]
        );

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

        Settings::query()->firstOrCreate(
            ['key' => 'notifications.default_event_minutes_before'],
            [
                'value' => '-1',
                'type' => Settings::TYPE_INTEGER,
            ]
        );
    }
}
