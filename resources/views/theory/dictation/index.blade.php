@extends('layouts.app', ['title' => 'Dictation Challenge', 'noMenu' => true])

@push('header')
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Music&display=swap" rel="stylesheet">
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">

<script>
  window.__challengeOptions = @json($settings->options());
  window.__clefUrls = {
    treble: "{{ asset('images/clefs/treble-clef.svg') }}",
    bass:   "{{ asset('images/clefs/bass-clef.svg') }}",
    alto:   "{{ asset('images/clefs/alto-clef.svg') }}",
    tenor:  "{{ asset('images/clefs/tenor-clef.svg') }}",
  };
</script>

<style>
#accidentals, .accidental-tool, #staff {
  touch-action: none;
}

#metrics-boxes .col-6:nth-child(1) { animation-delay: 0s; }
#metrics-boxes .col-6:nth-child(2) { animation-delay: 0.1s; }
#metrics-boxes .col-6:nth-child(3) { animation-delay: 0.2s; }
#metrics-boxes .col-6:nth-child(4) { animation-delay: 0.3s; }

#interval {
  display: none;
}

#interval label {
  top: -4px !important;
}

#play {
  height: 66.4px;
}
</style>
@endpush

@section('content')
@include('theory.components.pagetitle', [
  'title' => 'Dictation Challenge', 
  'description' => 'Add the notes to match what you hear'])
<section id="page-wrapper" class="container">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-11 mx-auto text-center">
      @include('theory.components.counter')
      @include('theory.components.level')
      @include('theory.components.title')
    </div>

    <div class="col-11 mx-auto mb-3">
      <div id="staff-wrapper" class="text-center mx-auto position-relative prevent-select">
        @include('theory.components.accidentals')
        <div id="staff"></div>
        @include('theory.components.feedback')
        @include('theory.components.play')
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls')
      @include('theory.dictation.modals.settings')
      @include('theory.dictation.modals.instructions')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.results.overlay')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
{{-- <script src="{{ mix('js/music/dictation.js') }}"></script> --}}
<script type="module" src="{{ asset('js/dev-music/games/dictation.js') }}"></script>
@endpush
