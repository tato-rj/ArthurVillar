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
  :root {
    --note-python-board-size: 368px;
    --note-python-border-width: 6px;
    --note-python-board-cols: 9;
    --note-python-cell-size: calc(var(--note-python-board-size) / var(--note-python-board-cols));
  }

  #board { 
    display: inline-grid; 
    grid-template-columns: repeat(var(--note-python-board-cols), var(--note-python-cell-size));
    grid-auto-rows: var(--note-python-cell-size);
    gap:0; 
    width: calc(var(--note-python-board-size) + calc(var(--note-python-border-width) * 2));
    height: calc(var(--note-python-board-size) + calc(var(--note-python-border-width) * 2));
    background: white;
    border: var(--note-python-border-width) solid rgba(0,0,0,0.1);
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

  #game-countdown, #restart {
    font-size: 3rem;
    z-index: 100;
  }

  #restart {
    display: none;
  }

  .board-cell {
    width: var(--note-python-cell-size);
    height: var(--note-python-cell-size);
    border: 1px dotted rgba(0,0,0,0.05);
  }

  .snake {
    background: #ffe54c;
    border-radius: 4px;
    border: .5px solid black;
    transform: scale(.8);
  }

  .snake-head {
    background: #ffe54c;
    border: .5px solid black;
    border-radius: 4px;
    transform: scale(1);
  }

  .food {
    background: black;
    color: white;
    border-radius: 4px;
    border: .5px solid white;
  }

  .food-note {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  #board.failed {
    background: rgba(255,0,0,0.2);
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
      <div id="board-wrapper" style="display: none" class="text-center mx-auto position-relative ">

          <div id="game-countdown" class="position-absolute w-100 h-100 d-center">
            <button type="button" class="btn btn-primary btn-lg">START GAME</button>
            <h1 class="animate__animated animate__bounceInDown"></h1>
          </div>

          <div id="restart" class="position-absolute w-100 h-100">
            <div class="d-center w-100 h-100">
              <button onclick="window.location.reload();" type="button" class="btn btn-red btn-lg">RESTART</button>
            </div>
          </div>

          <div id="board" class="my-2 mx-auto position-relative"></div>
      </div>
      @include('theory.components.prompt')
      @include('theory.components.feedback')
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls')
      @include('theory.note-python.modals.settings')
      @include('theory.note-python.modals.instructions')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.components.results.overlay')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/notepython.js') }}"></script>
@endpush
