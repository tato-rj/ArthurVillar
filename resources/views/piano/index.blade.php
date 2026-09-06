@extends('layouts.app', ['title' => 'Piano Atlas', 'noMenu' => true])

@push('header')
<link href="{{ mix('css/piano.css') }}" rel="stylesheet">
@endpush

@section('content')
<div id="piano-atlas" class="piano-atlas">
    <div id="piano-stage" aria-label="Interactive 3D grand piano. Drag to rotate, scroll to zoom." tabindex="0"></div>
    <header class="atlas-header">
        <div class="atlas-brand"><h1>Piano Atlas</h1><p>The grand piano, inside and out.</p></div>
        <nav class="atlas-modes" aria-label="Model layout"><button class="is-active" data-layout="assembled" aria-pressed="true">Complete</button><button data-layout="exploded" aria-pressed="false">Exploded</button><button data-layout="catalog" aria-pressed="false">Parts library</button></nav>
        <div class="atlas-search-wrap"><label class="atlas-search"><span aria-hidden="true">⌕</span><input id="part-search" type="search" placeholder="Find a part…" aria-label="Find a piano part" autocomplete="off"><kbd>/</kbd></label><div id="search-results" class="atlas-search-results" hidden></div></div>
    </header>
    <aside class="atlas-systems atlas-panel" aria-label="Piano systems">
        <div class="panel-heading"><h2>Systems</h2><button id="systems-toggle" aria-label="Toggle systems panel" aria-expanded="true">−</button><span id="system-count">7</span></div>
        <div class="atlas-segment"><button id="show-all" class="is-active">Show all</button><button id="internal-only">Internal</button></div>
        <div id="system-list"></div>
        <div class="systems-footer"><span id="visible-count"></span><button id="reset-systems">Reset</button></div>
    </aside>


    <aside id="part-detail" class="atlas-detail atlas-panel" aria-label="Selected part" hidden>
        <div class="detail-top"><span id="detail-system" class="atlas-eyebrow"></span><button id="close-detail" class="atlas-icon-button" aria-label="Close part details">×</button></div>
        <span id="detail-number" class="detail-number"></span><h2 id="detail-title"></h2><p id="detail-description"></p>
        <dl><div><dt>MATERIAL</dt><dd id="detail-material"></dd></div><div><dt>ROLE</dt><dd id="detail-role"></dd></div></dl>
        <div class="detail-related"><span class="atlas-eyebrow">CONNECTED TO</span><div id="detail-related"></div></div>
        <button id="isolate-part" class="atlas-primary">Isolate part <span>↗</span></button><button id="hide-part" class="atlas-text-button">Hide part</button><button id="focus-part" class="atlas-text-button">Focus on part</button><button id="restore-parts" class="atlas-text-button" hidden>Show all parts</button>
    </aside>

    <div style="display: none;" class="atlas-tools atlas-panel" role="toolbar" aria-label="View controls"><button id="view-perspective" class="is-active" title="Perspective view" aria-label="Perspective view">◇</button><button id="view-top" title="Top view" aria-label="Top view">⊞</button><span></span><button id="zoom-in" aria-label="Zoom in">+</button><button id="zoom-out" aria-label="Zoom out">−</button><span></span><button id="toggle-labels" aria-label="Toggle part labels" aria-pressed="false">Aa</button><button id="toggle-rotate" aria-label="Auto rotate" aria-pressed="false">↻</button><button id="reset-view" aria-label="Reset view">⌂</button></div>

    <div id="part-labels" class="atlas-labels"></div><div id="part-tooltip" class="atlas-tooltip" hidden></div>
    <div class="atlas-bottom">
        <div class="atlas-explode atlas-panel"><div class="explode-heading"><label for="explode-slider">Explode instrument</label><output id="explode-value" for="explode-slider">0<span>%</span></output></div><input id="explode-slider" type="range" min="0" max="100" value="0"><div class="explode-footer"><span>Assembled</span><span>Separated</span></div></div>
        <button id="toggle-lid" class="atlas-lid atlas-panel" aria-pressed="true"><span aria-hidden="true">◩</span><span>Lid open<small>Click to close</small></span></button>
    </div>
    <footer class="atlas-footer"><span>Drag to orbit <i>·</i> Scroll to zoom <i>·</i> Click to explore</span><span><a href="https://www.yamaha.com/en/musical_instrument_guide/piano/" target="_blank" rel="noopener">Anatomy reference ↗</a></span></footer>
    <div id="atlas-loading" class="atlas-loading">Building your instrument<span></span></div>
    <noscript><div class="atlas-panel atlas-fallback">Enable JavaScript to explore the 3D piano.</div></noscript>
</div>
@endsection

@push('scripts')
<script src="{{ mix('js/piano/index.js') }}" defer></script>
@endpush
