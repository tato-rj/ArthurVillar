@extends('layouts.app', ['title' => $settings->gameName(), 'noMenu' => true])

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
#keyboard {
  height: 160px;
}

#keyboard .white-key {
  width: 40px;
  height: 100%;
  padding-left: 1px; 
  padding-right: 1px;
}

#keyboard .white-key button {
  height: 100%;
  width: 100%;
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

#keyboard .white-key button:active {
  background: rgba(0,0,0,0.04) !important;
}

#keyboard .black-key {
  height: 55%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  padding-left: 1px; 
  padding-right: 1px;
}

#keyboard .black-key button {
  height: 100%;
  width: 100%;
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

#keyboard .key-marker {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 10px;
  display: none;
  cursor: pointer;
}

#keyboard .key-marker span {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
@endpush

@section('content')
{{-- @include('theory.components.pagetitle', [
  'title' => 'Intervals Challenge', 
  'description' => 'Add the note that forms the indicated interval']) --}}

@include('theory.components.title')

<section id="page-wrapper" class="container prevent-select">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-11 mx-auto text-center">
      @include('theory.components.counter')
      @include('theory.components.timer')
    </div>

    <div class="col-11 mx-auto mb-3 position-relative">
      @include('theory.components.piano.keyboard')
      <div id="staff-wrapper" class="text-center mx-auto position-relative">
        @include('theory.components.accidentals')
        <div id="staff"></div>
        @include('theory.components.feedback')
        @include('theory.components.prompt')
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls', ['instructions' => 'Tap on the staff to add a note 👆'])
      @include('theory.note-nest.modals.settings')
      @include('theory.note-nest.modals.instructions')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.components.results.overlay')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/notenest.js') }}"></script>
<script>
</script>
@endpush
