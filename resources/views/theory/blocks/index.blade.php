@extends('layouts.app', ['title' => 'Blocks Challenge', 'noMenu' => true])

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
.table {
  width: 320px;
  max-width: 100%;
}
td {
  height: 79.75px;
  position: relative;
}

.initial-block {
  background: #ffe54c !important;
  {{-- border: 1px solid #ffe54c !important; --}}
}

.block {
  background: lightyellow !important;
  {{-- border: 1px solid #ffe54c !important; --}}
}

.interval-block {
  background: black !important;
  {{-- border: 1px solid black !important; --}}
  color: white !important;
}

.initial-block div, .interval-block div, .block div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.initial-block div span {
  position: absolute;
  width: 100%;
  top: 8px;
  left: 0;
  text-align: center;
  font-size: 60%;
  font-weight: bold;
  opacity: .4;
}

.initial-block div i {
  position: absolute;
  width: 100%;
  bottom: 6px;
  left: 0;
  text-align: center;
  font-size: 1rem;

}

.block-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  z-index: 10;
  transition: .2s;
  border: 1px solid white;
}

.initial-block input, .block input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  background: transparent;
  color: black !important;
  font-weight: bold;
  font-size: 1.4rem;
  z-index: 2;
}

.block-correct, .block-wrong {
  position: absolute;
  top: 4px;
  right: 4px;
  color: white;
}

.block span:not(.block-correct):not(.block-wrong) {
  position: absolute;
  z-index: 1;
  font-size: 80%;
  font-weight: bold;
  opacity: .2;
  transition: .2s;
}
.interval-block button {
  font-size: 76%;
}
.interval-block span[interval] {
  font-size: 1.4rem;
  font-weight: bold;
}
.interval-block span[direction] {
  font-size: .6rem;
}

.interval-block > div:not(.block-cover) {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.interval-block button {
  background: transparent;
  border: none;
  color: yellow;
}

</style>
@endpush

@section('content')
@include('theory.components.title', ['label' => 'BLOCKS CHALLENGE'])
<section id="page-wrapper" class="container prevent-select">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-11 mx-auto text-center">
      @include('theory.components.counter')
      @include('theory.components.timer')
    </div>
    <div class="col-11 mx-auto mb-3 position-relative">
      <div id="blocks-wrapper" class="text-center mx-auto position-relative">
        <div id="blocks" class="my-4">
          @include('theory.blocks.grid')
        </div>
        @include('theory.components.feedback')
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls', ['instructions' => 'Complete all intervals above'])
      @include('theory.blocks.modals.settings')
      @include('theory.blocks.modals.instructions')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.results.overlay')
@include('theory.components.keyboard')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/blocks.js') }}"></script>
@endpush
