<?php

return [
    'timezone' => env('CALENDAR_TIMEZONE', 'America/New_York'),
    'google_calendar_start_date' => '2026-07-01',
    'football' => [
        'competition' => env('FOOTBALL_DATA_COMPETITION', 'BSA'),
        'team_tla' => env('FOOTBALL_DATA_TEAM_TLA', 'FLU'),
        'duration_minutes' => 120,
    ],
    'google_places' => [
        'api_key' => env('GOOGLE_PLACES_API_KEY'),
        'region_code' => 'US',
        'location_bias' => [
            'latitude' => 40.7128,
            'longitude' => -74.0060,
            'radius_meters' => 50000,
        ],
    ],
    'google_routes' => [
        'api_key' => env('GOOGLE_ROUTES_API_KEY'),
        'arrival_buffer_minutes' => 5,
        'walking_threshold_minutes' => env('GOOGLE_ROUTES_WALKING_THRESHOLD_MINUTES', 20),
        'approaching_window_minutes' => 120,
        'approaching_refresh_minutes' => 30,
        'cache_minutes' => 1440,
        'origin_lookback_days' => 14,
    ],
];
