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
  --highlight-rgb: 255, 229, 76;
  --highlight-sounding-rgb: 251, 141, 118;
  width: 93%;
  height: 20px;
  background: rgba(var(--highlight-rgb), 0.6);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: .2s;
}

.staff-highlight--voice-2 { --highlight-rgb: 79, 199, 232; --highlight-sounding-rgb: 251, 141, 118; }
.staff-highlight--voice-3 { --highlight-rgb: 139, 118, 232; --highlight-sounding-rgb: 251, 141, 118; }
.staff-highlight--voice-4 { --highlight-rgb: 92, 205, 128; --highlight-sounding-rgb: 251, 141, 118; }

.staff-highlight.dragging {
  background: rgba(var(--highlight-rgb), 0.8) !important;
}

.staff-highlight.is-sounding {
  background: rgba(var(--highlight-sounding-rgb), 0.6) !important;
}

.staff-highlight.dragging .staff-highlight__label {
  opacity: .3;
}

.staff-highlight__label {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  height: 100%;
  font-size: .8rem;
  line-height: 1.6;
  font-weight: bold;
  text-align: right;
  padding: 0 6px;
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  background: rgb(var(--highlight-rgb));
}

#staff .ledger.staff-highlight--voice-1 { background: rgb(255, 229, 76); }
#staff .ledger.staff-highlight--voice-2 { background: rgb(79, 199, 232); }
#staff .ledger.staff-highlight--voice-3 { background: rgb(139, 118, 232); }
#staff .ledger.staff-highlight--voice-4 { background: rgb(92, 205, 128); }

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
      @include('theory.components.piano.keyboard')
      <div id="staff-wrapper" class="text-center mx-auto position-relative">
        @include('theory.components.piano.toggle')
        <div id="staff"></div>
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls', ['instructions' => 'Tap the staff to higlight a line or space 👆'])
      @include('theory.open-staff.settings')
      @include('theory.components.preferences')
    </div>
  </div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/openstaff.js') }}"></script>
<script>
</script>
@endpush
