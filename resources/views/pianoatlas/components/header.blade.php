    <header class="atlas-header">
        <div class="atlas-brand"><h1>{{$title}}</h1><p>{{$subtitle}}</p>
            <label class="atlas-piano-select" for="piano-select">
                <span>Model</span>
                <select id="piano-select" aria-label="Model">
                    <option value="{{ route('pianoatlas.grand') }}" {{ $piano === 'grand' ? 'selected' : '' }}>Grand piano</option>
                    <option value="{{ route('pianoatlas.upright') }}" {{ $piano === 'upright' ? 'selected' : '' }}>Upright piano</option>
                    <option value="{{ route('pianoatlas.action') }}" {{ $piano === 'action' ? 'selected' : '' }}>Piano action</option>
                </select>
            </label>
        </div>

        <div class="atlas-layout-controls">
            <nav class="atlas-modes" aria-label="Model layout">
                <button class="is-active" data-layout="assembled" aria-pressed="true">Assembled</button>
                <button data-layout="exploded" aria-pressed="false">Exploded</button>
                <button data-layout="catalog" aria-pressed="false">Parts library</button>
            </nav>
            @if ($piano === 'action')
                <button id="play-assembly" class="atlas-play" aria-label="Play action demonstration" aria-pressed="false" title="Play action demonstration">
                    <span id="assembly-play-icon" aria-hidden="true">@fa(['icon' => 'play', 'mr' => 0])</span>
                    <span id="assembly-stop-icon" aria-hidden="true" hidden>@fa(['icon' => 'stop', 'mr' => 0])</span>
                </button>
                <span id="assembly-status" class="sr-only" role="status" aria-live="polite"></span>
            @endif
        </div>

        <div class="atlas-search-wrap">
            <label class="atlas-search">
                <span aria-hidden="true">⌕</span><input id="part-search" type="search" placeholder="Find a part…" aria-label="Find a part" autocomplete="off"><kbd>/</kbd>
            </label>
            <div id="search-results" class="atlas-search-results" hidden></div></div>
    </header>