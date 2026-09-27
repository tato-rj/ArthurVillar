<?php

return [
    'departure_grace_seconds' => 30,
    'absence_timeout_seconds' => 120,
    'client' => [
        'key' => env('REVERB_APP_KEY'),
        'host' => env('REVERB_PUBLIC_HOST', env('REVERB_HOST', '127.0.0.1')),
        'port' => (int) env('REVERB_PUBLIC_PORT', env('REVERB_PORT', 8080)),
        'scheme' => env('REVERB_PUBLIC_SCHEME', env('REVERB_SCHEME', 'http')),
    ],
];
