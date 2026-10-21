<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#155EEF">
    <meta name="description" content="A simple metronome. Tap to play, swipe to find your tempo.">
    <title>Metronome | Arthur Villar</title>
    @include('layouts.favicon.metronome')
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
            <span class="metronome__pulse" data-metronome-pulse aria-hidden="true"></span>
            <span class="metronome__tempo" data-tempo aria-hidden="true">120</span>
            <span class="metronome__conductor" data-conductor aria-hidden="true">
                <svg viewBox="0 0 400 600">
                    <path data-conductor-path class="conductor-path" fill="none"/>
                </svg>
                <span class="conductor-ball" data-conductor-ball>
                    <span class="conductor-halo"></span>
                    <span class="conductor-dot"></span>
                </span>
            </span>
        </button>
        <button
            class="metronome__edge metronome__edge--left"
            type="button"
            data-tempo-step="-1"
            aria-label="Decrease tempo by 1. 120 beats per minute."
            aria-describedby="metronome-instructions"
        ></button>
        <button class="metronome__settings-button" type="button" data-settings-open
            aria-label="Settings" aria-haspopup="dialog" aria-controls="metronome-settings" aria-expanded="false">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m9.5 3-.6 2.4-1.8 1-2.4-.6-2.5 4.4 1.8 1.7v2.2l-1.8 1.7 2.5 4.4 2.4-.6 1.8 1 .6 2.4h5l.6-2.4 1.8-1 2.4.6 2.5-4.4-1.8-1.7v-2.2l1.8-1.7-2.5-4.4-2.4.6-1.8-1L14.5 3z" transform="translate(1 0) scale(.92)"/>
                <circle cx="12" cy="12" r="3.3"/>
            </svg>
        </button>
        <button
            class="metronome__edge metronome__edge--right"
            type="button"
            data-tempo-step="1"
            aria-label="Increase tempo by 1. 120 beats per minute."
            aria-describedby="metronome-instructions"
        ></button>
        <p id="metronome-instructions" class="sr-only">
            Tap or click the center to start or stop. Tap the left edge to decrease the tempo
            by one, or the right edge to increase it by one. Hold either edge to keep
            adjusting. Swipe up in the center to increase the tempo,
            or down to decrease it. Swipe slowly for fine adjustments, quickly for
            bigger changes. Tempo ranges from 20 to 300 beats per minute.
            You can also use Space or Enter to start or stop, and the up and down
            arrow keys to adjust the tempo.
        </p>
        <p class="metronome__message" data-metronome-message role="status" hidden></p>
        <noscript><p class="metronome__message">Enable JavaScript to use the metronome.</p></noscript>
    </main>
    <dialog class="metronome-settings" id="metronome-settings" data-settings-dialog aria-labelledby="settings-title">
        <div class="metronome-settings__content">
            <header class="metronome-settings__header">
                <h1 id="settings-title">Settings</h1>
                <button class="settings-close" type="button" data-settings-close aria-label="Close settings" autofocus>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true">
                        <path d="m6 6 12 12M18 6 6 18"/>
                    </svg>
                </button>
            </header>
            <div class="metronome-settings__fields">
                <fieldset class="settings-field">
                    <legend>Beats</legend>
                    <div class="settings-segments settings-segments--beats">
                        @foreach([1, 2, 3, 4] as $beats)
                            <label>
                                <input type="radio" name="metronome-beats" value="{{ $beats }}" @checked($beats === 1)>
                                <span>{{ $beats }}</span>
                            </label>
                        @endforeach
                    </div>
                </fieldset>
                <div class="settings-field settings-field--color">
                    <div>
                        <label for="metronome-color">Color</label>
                        <p class="settings-color-value" data-color-value>#155EEF</p>
                    </div>
                    <div class="settings-color-controls">
                        <button class="settings-color-reset" type="button" data-settings-color-reset aria-label="Reset color to original blue">Reset</button>
                        <input id="metronome-color" type="color" value="#155eef" data-settings-color>
                    </div>
                </div>
                <div class="settings-field">
                    <label for="metronome-sound">Sound</label>
                    <select id="metronome-sound" data-settings-sound>
                        <option value="click">Classic click</option>
                        <option value="woodblock">Woodblock</option>
                        <option value="beep">Beep</option>
                        <option value="cowbell">Cowbell</option>
                    </select>
                </div>
                <fieldset class="settings-field">
                    <legend>Type</legend>
                    <div class="settings-segments">
                        <label>
                            <input type="radio" name="metronome-type" value="classic" checked>
                            <span>Classic</span>
                        </label>
                        <label>
                            <input type="radio" name="metronome-type" value="conductor">
                            <span>Conductor</span>
                        </label>
                    </div>
                </fieldset>
                <label class="settings-switch" for="metronome-path">
                    <span>Show conductor path</span>
                    <input id="metronome-path" type="checkbox" role="switch" data-settings-path checked>
                </label>
            </div>
            <button class="settings-done" type="button" data-settings-close>Done</button>
        </div>
    </dialog>
</body>
</html>
