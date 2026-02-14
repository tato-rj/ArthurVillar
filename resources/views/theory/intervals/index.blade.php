@extends('layouts.app', ['title' => 'Intervals Challenge', 'noMenu' => true])

@push('header')
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Music&display=swap" rel="stylesheet">
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">

<script>
  window.__challengeOptions = @json($challenge->options());
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
</style>
<script
  src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js"
  type="module"
></script>
@endpush

@section('content')
<section id="page-wrapper" class="container py-4">
  <div class="text-center mb-4">
    <h3 class="mb-1">Intervals Challenge</h3>
    <p class="m-0">Add the note that forms the indicated interval</p>
  </div>
  <div class="row">
    <div class="col-lg-6 col-md-8 col-11 mx-auto text-center">
      @include('theory.intervals.components.counter')
      @include('theory.intervals.components.level')
      @include('theory.intervals.components.title')
    </div>

    <div class="col-11 mx-auto mb-3">
      <div id="staff-wrapper" class="text-center mx-auto position-relative">
        @include('theory.intervals.components.accidentals')
        <div id="staff"></div>
        @include('theory.intervals.components.feedback')
        @include('theory.intervals.components.interval')
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.intervals.components.controls')
      @include('theory.intervals.components.preferences')
    </div>
  </div>
</section>

@include('theory.overlays.final')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/index.js') }}"></script>
@endpush
