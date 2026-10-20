<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#3F84E5">
    <meta name="description" content="A simple metronome. Tap to play, swipe to find your tempo.">
    <title>Metronome | Arthur Villar</title>
    <link href="{{ asset('/favicon/favicon.ico') }}" rel="icon" type="image/x-icon">
    <link href="{{ mix('css/metronome.css') }}" rel="stylesheet">
    <script src="{{ mix('js/music/metronome.js') }}" defer></script>
</head>
<body>
    <main>
        <button
            class="metronome"
            type="button"
            data-metronome
            aria-label="Start metronome. 120 beats per minute."
            aria-pressed="false"
            aria-describedby="metronome-instructions"
        >
            <span class="metronome__tempo" data-tempo aria-hidden="true">120</span>
        </button>
        <p id="metronome-instructions" class="sr-only">
            Tap or click anywhere to start or stop. Swipe up to increase the tempo,
            or down to decrease it. Swipe slowly for fine adjustments, quickly for
            bigger changes. Tempo ranges from 20 to 300 beats per minute.
            You can also use Space or Enter to start or stop, and the up and down
            arrow keys to adjust the tempo.
        </p>
        <p class="metronome__message" data-metronome-message role="status" hidden></p>
        <noscript><p class="metronome__message">Enable JavaScript to use the metronome.</p></noscript>
    </main>
</body>
</html>
