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

  #board { 
    display: inline-grid; 
    grid-template-columns: repeat(9, 49.7px); 
    grid-auto-rows: 49.7px; 
    gap:0; 
    width: fit-content;
    background: white;
    border: 6px solid rgba(0,0,0,0.1);
  }

  @keyframes greenBoard {
    0% {border-color: rgba(0,0,0,0.1);}
    50% {border-color: #58cc02;}
    100% {border-color: rgba(0,0,0,0.1);}
  }

  @keyframes redBoard {
    0% {border-color: rgba(0,0,0,0.1);}
    50% {border-color: #ff4b4b;}
    100% {border-color: rgba(0,0,0,0.1);}
  }

  #board.board-correct-hit {
    animation: greenBoard 0.4s 6;
  }

  #board.board-wrong-hit {
    animation: redBoard 0.4s 6;
  }

  #game-countdown {
    font-size: 3rem;
    z-index: 100;
  }

  .board-cell {
    width: 49.7px;
    height: 49.7px;
  }

  .snake {
    background: #ffe54c;
    border-radius: 4px;
    border: .5px solid black;
  }

  .snake-head {
    background: #ffe54c;
    border: .5px solid black;
    border-radius: 4px;
  }

  .food {
    background: black;
    color: white;
    border-radius: 4px;
  }

  .food-note {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
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
    <div class="col-11 mx-auto mb-3 position-relative">
      <div id="board-wrapper" style="display: none" class="text-center mx-auto position-relative animate__animated animate__flipInX">

            <div id="game-countdown" class="position-absolute w-100 h-100 d-center">
              <button type="button" class="btn btn-primary btn-lg">START GAME</button>
              <h1 class="animate__animated animate__bounceInDown"></h1>
            </div>
          <div id="board" class="my-2 mx-auto position-relative"></div>

      </div>
      @include('theory.components.interval')
      @include('theory.components.feedback')
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls')
      @include('theory.tone-trail.modals.settings')
      @include('theory.tone-trail.modals.instructions')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.components.results.overlay')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/tonetrail.js') }}"></script>
@endpush
