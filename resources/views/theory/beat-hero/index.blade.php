@extends('layouts.app', ['title' => $settings->gameName(), 'noMenu' => true])

@push('header')
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">

<script>
  window.__challengeOptions = @json($settings->options());
</script>

<style>
  .beat-hero-count-in {
    position: fixed;
    inset: 0;
    z-index: 1040;
    pointer-events: none;
  }

  .beat-hero-count-in__center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .beat-hero-count-in__word {
    display: block;
    font-size: clamp(3.5rem, 14vw, 8rem);
    font-weight: 900;
    line-height: 1;
    white-space: nowrap;
    {{-- text-shadow: 0 3px 0 rgba(0, 0, 0, .15); --}}
  }

  .beat-hero-game {
    --beat-hero-ink: #174a76;
    --beat-hero-blue: #1cb0f6;
    --beat-hero-gold: #f6c945;
    --beat-hero-green: #58cc02;
    --beat-hero-red: #ff4b4b;
    max-width: 760px;
    margin: 0 auto;
  }

  .sequence-dots {
    display: flex;
    justify-content: center;
    gap: 18px;
    min-height: 48px;
    margin: 2px 0 4px;
  }

  .sequence-dot {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    border-radius: 10px;
    background: #fff;
    transition: background-color .15s ease, border-color .15s ease, box-shadow .15s ease, transform .15s ease;
  }

  .sequence-dot.is-active {
    border-color: var(--beat-hero-gold);
    background: var(--beat-hero-ink);
    box-shadow: 0 0 0 1px yellow;
    transform: scale(1.08);
  }

  .sequence-dot.is-complete {
    border-color: #b9d8ee;
    background: #d9effd;
  }

  .sequence-dot.is-chosen {
    border-color: var(--beat-hero-green);
    background: var(--beat-hero-green);
    box-shadow: 0 0 0 5px rgba(88, 204, 2, .14);
  }

  .sequence-dot.is-wrong {
    border-color: var(--beat-hero-red);
    background: var(--beat-hero-red);
    box-shadow: 0 0 0 5px rgba(255, 75, 75, .14);
  }

  #sequence-status {
    min-height: 25px;
    margin: 0 0 16px;
    color: #6b7680;
    font-weight: 700;
  }

  .rhythm-card-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 36px;
    width: 100%;
  }

  .rhythm-card:hover {
    transform: translateY(-2px);
  }

  .rhythm-card:active {
    transform: translateY(2px);
  }

  .rhythm-card:focus-visible {
    outline-offset: 3px;
  }

  .rhythm-card.is-previewing {
    border-color: var(--beat-hero-blue);
    background: #f3fbff;
  }

  .rhythm-card.is-correct {
    box-shadow: 0 0px 0 var(--beat-hero-green), 0 0 0 4px var(--beat-hero-green) !important;
  }

  .rhythm-card.is-wrong {
    box-shadow: 0 4px 0 var(--beat-hero-red), 0 0 0 4px var(--beat-hero-red) !important;
    animation: rhythmCardShake .35s ease;
  }

  .rhythm-card.is-sounding .rhythm-card__figure {
    transform: scale(1.07);
  }

  .rhythm-card__number {
    position: absolute;
    z-index: 2;
    top: 8px;
    right: 8px;
    display: none;
    place-items: center;
    min-width: 26px;
    padding: 0 6px;
    height: 26px;
    border-radius: 999px;
    background: var(--beat-hero-green);
    color: #fff;
    font-size: 14px;
    font-weight: 900;
  }

  .rhythm-card.is-correct .rhythm-card__number {
    display: grid;
  }

  .rhythm-card__figure {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform .12s ease, opacity .15s ease;
  }

  .rhythm-card__figure svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  #play {
    min-height: 62px;
    margin: 18px 0 12px;
  }

  #play button {
    min-width: 132px;
  }

  .beat-hero-symbol-picker {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    max-width: 340px;
    margin: 0 auto;
    gap: 6px;
  }

  .beat-hero-symbol-choice {
    position: relative;
    min-width: 0;
  }

  .beat-hero-symbol-input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  .beat-hero-symbol-option {
    position: relative;
    display: block;
    aspect-ratio: 1.1;
    margin: 0;
    overflow: hidden;
    border: 2px solid #d9dde0;
    border-radius: 9px;
    background: #fff;
    color: var(--beat-hero-ink);
    cursor: pointer;
    transition: border-color .15s ease, background-color .15s ease, transform .15s ease;
  }

  .beat-hero-symbol-option:hover {
    border-color: #9ed9f6;
    transform: translateY(-1px);
  }

  .beat-hero-symbol-input:focus-visible + .beat-hero-symbol-option {
    outline: 3px solid rgba(28, 176, 246, .3);
    outline-offset: 2px;
  }

  .beat-hero-symbol-input:checked + .beat-hero-symbol-option {
    border-color: var(--beat-hero-blue);
    background: #eef9ff;
    box-shadow: inset 0 0 0 1px var(--beat-hero-blue);
  }

  .beat-hero-symbol-figure {
    display: block;
    width: 100%;
    height: 100%;
    padding: 2px;
  }

  .beat-hero-symbol-figure svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .beat-hero-symbol-check {
    position: absolute;
    top: 3px;
    right: 3px;
    display: none;
    place-items: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--beat-hero-blue);
    color: #fff;
    font-size: 9px;
    font-weight: 900;
    line-height: 1;
  }

  .beat-hero-symbol-input:checked + .beat-hero-symbol-option .beat-hero-symbol-check {
    display: grid;
  }

  .beat-hero-symbol-message {
    min-height: 17px;
    color: #6b7680;
  }

  .beat-hero-symbol-message.is-error {
    color: var(--beat-hero-red);
  }

  @keyframes rhythmCardShake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-6px); }
    75% { transform: translateX(6px); }
  }

  @media (max-width: 575.98px) {
    .beat-hero-game {
      width: calc(100vw - 24px);
      margin-left: calc(50% - 50vw + 12px);
    }

    .rhythm-card-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }

    .rhythm-card__number {
      top: 5px;
      right: 5px;
      min-width: 21px;
      height: 21px;
      font-size: 12px;
    }

    #sequence-status {
      margin-bottom: 12px;
      font-size: .9rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .rhythm-card,
    .rhythm-card__figure,
    .sequence-dot {
      transition: none;
    }

    .rhythm-card.is-wrong {
      animation: none;
    }
  }
</style>
@endpush

@section('content')
@include('theory.components.title')

<div id="beat-hero-count-in" class="beat-hero-count-in" hidden>
  <div class="beat-hero-count-in__center" role="status" aria-live="polite" aria-atomic="true">
    <span class="beat-hero-count-in__word text-primary fw-bold animate__animated" data-count-in-word></span>
  </div>
</div>

<section id="page-wrapper" class="container prevent-select">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-11 mx-auto text-center mb-2">
      @include('theory.components.counter')
    </div>

    <div class="col-lg-8 col-md-10 col-12 mx-auto text-center position-relative">
      <div class="beat-hero-game">
        <div id="sequence-dots" class="sequence-dots" aria-label="Rhythm sequence progress"></div>

        <p id="sequence-status" aria-live="polite"></p>

        <div id="rhythm-card-grid" class="rhythm-card-grid mb-4" aria-label="Rhythm cards"></div>

        @include('theory.components.play')
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls', ['instructions' => ''])
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
<script src="{{ mix('js/music/beathero.js') }}"></script>
@endpush
