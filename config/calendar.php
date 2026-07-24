<?php

return [
    'timezone' => env('CALENDAR_TIMEZONE', 'America/New_York'),
    'google_calendar_start_date' => '2026-07-01',
    'google_routes' => [
        'api_key' => env('GOOGLE_ROUTES_API_KEY'),
        'walking_threshold_minutes' => env('GOOGLE_ROUTES_WALKING_THRESHOLD_MINUTES', 20),
        'approaching_window_minutes' => 120,
        'approaching_refresh_minutes' => 30,
        'cache_minutes' => 1440,
        'origin_lookback_days' => 14,
    ],
];
