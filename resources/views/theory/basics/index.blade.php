@extends('layouts.app', ['title' => $settings->gameName(), 'noMenu' => true])

@push('header')
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Music&display=swap" rel="stylesheet">
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">

<script>
  window.staffZoneScreens = @json($settings->screens());
  window.__clefUrls = {
    treble: "{{ asset('images/clefs/treble-clef.svg') }}",
    bass:   "{{ asset('images/clefs/bass-clef.svg') }}",
    alto:   "{{ asset('images/clefs/alto-clef.svg') }}",
    tenor:  "{{ asset('images/clefs/tenor-clef.svg') }}",
  };
</script>

<style>
.staff-highlight {
  width: 93%;
  height: 20px;
  background: rgba(255, 229, 76, 0.6);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.staff-highlight.dragging {
  background: rgba(255, 229, 76, 0.8) !important;
}

.staff-highlight.dragging .staff-highlight__label {
  opacity: .3;
}

.staff-highlight__label {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  font-size: .8rem;
  line-height: 1.6;
  font-weight: bold;
  text-align: right;
  padding: 0 6px;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  background: rgba(255, 229, 76);
}

.progress, #score {display: none}
</style>
@endpush

@section('content')
@include('theory.components.title')

<section id="page-wrapper" class="container prevent-select">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-11 mx-auto text-center">
      @include('theory.components.counter')
    </div>

    <div class="col-11 mx-auto mb-3 position-relative">
      <div id="staff-wrapper" class="text-center mx-auto position-relative">
        <div id="staff"></div>
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      <div id="instructions" class="fw-bold text-center mb-4">
        <h6 class="m-0 text-grey" style="line-height: 1.6;"></h6>
      </div>
      <div id="continue" class="btn-floating w-100" style="display: none;">
        <button class="btn btn-green w-100">Continue</button>
      </div>
      <div id="done" class="btn-floating w-100" style="display: none;">
        <a href="{{route('theory.note-nest.play', ['numOfChallenges'=>4, 'clefs'=>['treble'], 'initialNoteRange'=>0, 'sound'=>'on', 'solfege'=>'on'])}}" class="btn btn-primary w-100">Start practicing 🙂</a>
      </div>
    </div>
  </div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/staffzone.js') }}"></script>
<script>
</script>
@endpush
