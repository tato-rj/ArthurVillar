<?php

return [
    // Keep environment lookups here so these settings survive config:cache.
    'yt_dlp_path' => env('YT_PATH', '/usr/local/bin/yt-dlp'),
    'ffmpeg_path' => env('FFMPEG_PATH', '/usr/bin/ffmpeg'),
    'deno_path' => env('DENO_PATH', 'deno'),
    'cookies_path' => env('YT_COOKIES_PATH', '/var/tmp/youtube-cookies.txt'),
];
