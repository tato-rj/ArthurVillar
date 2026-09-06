@extends('layouts.app', ['title' => $pianoTitle, 'noMenu' => true])

@push('header')
<link href="{{ mix('css/pianoatlas.css') }}" rel="stylesheet">
@endpush

@section('content')
<div id="piano-atlas" class="piano-atlas">
    <div id="piano-stage" aria-label="Interactive 3D piano. Drag to rotate, scroll to zoom." tabindex="0"></div>
    @include('pianoatlas.components.header', [
        'title' => $pianoTitle,
        'subtitle' => $pianoSubtitle
        ])
    @include('pianoatlas.components.parts')
    @include('pianoatlas.components.details')

    <div id="part-labels" class="atlas-labels"></div><div id="part-tooltip" class="atlas-tooltip" hidden></div>

    @include('pianoatlas.components.controls')

    @include('pianoatlas.components.footer', ['reference' => 'https://www.yamaha.com/en/musical_instrument_guide/piano/'])

    <div id="atlas-loading" class="atlas-loading">Building your piano<span></span></div>
    <noscript><div class="atlas-panel atlas-fallback">Enable JavaScript to explore the 3D piano.</div></noscript>
</div>
@endsection

@push('scripts')
<script src="{{ mix('js/pianoatlas/' . $piano . '.js') }}" defer></script>
@endpush
