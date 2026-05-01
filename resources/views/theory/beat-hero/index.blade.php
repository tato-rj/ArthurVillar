@extends('layouts.app', ['title' => $settings->gameName(), 'noMenu' => true])

@push('header')
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Music&display=swap" rel="stylesheet">
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">

<script>
  window.__challengeOptions = @json($settings->options());
</script>

<style>
</style>
@endpush

@section('content')
@include('theory.components.title')

<section id="page-wrapper" class="container prevent-select">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-11 mx-auto text-center mb-2">
      @include('theory.components.counter')
      @include('theory.components.timer')
    </div>
    <div class="col-12 mx-auto mb-2 position-relative">
      <div id="game-wrapper">
      </div>
      @include('theory.components.prompt')
      @include('theory.components.feedback')
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      <div id="instructions" class="fw-bold text-center">
        <h6 class="m-0 text-red">Swipe or use the arrows to control the snake</h6>
      </div>
      @include('theory.components.controls')
      @include('theory.beat-hero.modals.settings')
      @include('theory.beat-hero.modals.instructions')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.components.results.overlay')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/beathero.js') }}"></script>
@endpush
