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
  .beat-hero-wrapper {
    --rhythm-staff-width: 380px;
    --rhythm-staff-line-thickness: calc(var(--staff-line-thickness) * .5);
    min-height: 190px;
    width: var(--rhythm-staff-width);
    {{-- overflow: hidden; --}}
    margin-left: auto;
    margin-right: auto;
    margin-bottom: -20px;
  }

  #preview-wrapper {
    display: none;
    --rhythm-staff-width: 380px;
    width: var(--rhythm-staff-width);
    margin: 0 auto;
  }

  #preview-wrapper {
    margin-bottom: -90px;
  }

  #preview-score {
    min-height: auto !important;
    margin-top: -36px;
  }

  #preview-score svg {
    height: 120px !important;
  }

  .beat-hero-wrapper svg {
    display: block;
    width: 100%;
    height: auto;
  }

  .beat-hero-wrapper .vf-stave path {
    stroke-width: var(--rhythm-staff-line-thickness) !important;
    stroke-linecap: round;
  }

  .beat-hero-wrapper svg rect {
    rx: .2rem;
    transform: translateX(calc(((1px - var(--rhythm-staff-line-thickness)) / 2) - 1px));
    width: var(--rhythm-staff-line-thickness);
  }

  .beat-hero-wrapper svg rect:last-of-type {
    transform: translateX(0);
  }

  .beat-hero-wrapper svg rect:first-of-type {
    transform: translateX(calc(((1px - var(--rhythm-staff-line-thickness)) / 2) - 2px));
  }

  .beat-hero-wrapper .vf-notehead {
    transform-box: fill-box;
    transform-origin: center;
  }

  .beat-hero-wrapper .vf-notehead.pulsate {
    animation: pulse .25s;
  }

  @keyframes pulse {
    0% {
      transform: scale(2);
    }

    50% {
      transform: scale(.85);
    }

    75% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  #beat-count {
    position: absolute;
    left: 16px;
    top: 0;
    font-size: 2.8rem;
    font-weight: bold;
    opacity: 0;
    color: #1cb0f6;
  }

  .beat-animation {
    animation: fadeAnimation 1200ms;
  }

  .good-tap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: o;
    background: #58cc02;
    animation: fadeAnimation 500ms;
    opacity: 0;
  }

  .bad-tap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: o;
    background: #ffc800;
    animation: fadeAnimation 500ms;
    opacity: 0;
  }

  #tap-wrapper {
    background: white;
    border: 4px dashed lightgrey;
    height: 160px;
    width: 280px;

  }

  @keyframes fadeAnimation {
    0% {
      opacity: .8;
    }

    100% {
      opacity: 0;
    }
  }

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
      <div id="preview-wrapper" class="opacity-2">
        <div class="fw-bold text-right mx-auto" style="font-size: 60%; width: 217px;">UP NEXT</div>
        <div id="preview-score"></div>
      </div>
      <div id="game-wrapper" class="position-relative">
      </div>
      <div id="feedback-count" class="d-center fw-bold mb-2">
        <div class="feedback-count-good mx-3 text-green">
          @fa(['icon' => 'check', 'mr' => 1])correct <span></span>
        </div>
        <div class="feedback-count-bad mx-3 text-red">
          @fa(['icon' => 'times', 'mr' => 1])missed <span></span>
        </div>
      </div>
      <div id="tap-wrapper" class="mx-auto mb-3 noselect position-relative">
        <div id="tap-feedback"></div>
        <div class="d-center h-100 w-100">
          <h1 class="opacity-2 m-0">TAP HERE</h1>
        </div>
      </div>
      @include('theory.components.prompt')
      @include('theory.components.feedback')
      @include('theory.components.play')
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
{{--       <div id="instructions" class="fw-bold text-center">
        <h6 class="m-0 text-red">Swipe or use the arrows to control the snake</h6>
      </div> --}}
      @include('theory.components.controls')
      @include('theory.beat-hero.settings')
      @include('theory.components.leaderboard.show')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.components.results.overlay')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vexflow@4.2.5/build/cjs/vexflow.js"></script>
<script src="{{ mix('js/music/beathero.js') }}"></script>
@endpush
