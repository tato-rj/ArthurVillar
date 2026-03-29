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
.staff-highlight {
  width: 104%;
  height: 20px;
  background: rgba(255, 229, 76, 0.4);
  position: absolute;
}

.staff-highlight:active {
  background: rgba(144, 213, 255, 0.2) !important;
}

.staff-highlight:active .staff-highlight__note {
  opacity: .3;
}

.staff-highlight__note {
  position: absolute;
  right: 6px;
  top: 1.6px;
  font-size: .8rem;
  vertical-align: unset;
  font-weight: bold;
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
      @include('theory.components.controls', ['instructions' => 'Tap on the staff to see the note 👆'])
      @include('theory.staff-zone.modals.settings')
      @include('theory.staff-zone.modals.instructions')
      @include('theory.components.preferences')
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
