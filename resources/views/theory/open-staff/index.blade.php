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
  width: 93%;
  height: 20px;
  background: rgba(255, 229, 76, 0.6);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
}

.staff-highlight.dragging {
  background: rgba(255, 229, 76, 0.8) !important;
}

.staff-highlight.dragging .staff-highlight__label {
  opacity: .3;
}

.staff-highlight__wave {
  position: absolute;
  left: 18px;
  right: 18px;
  top: 50%;
  height: 14px;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 120ms ease;
}

.staff-highlight.is-sounding .staff-highlight__wave {
  opacity: .8;
}

.staff-highlight__wave::before,
.staff-highlight__wave::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 999px;
  background: rgba(125, 94, 0, .72);
  transform-origin: center;
}

.staff-highlight__wave::before {
  top: 6px;
  bottom: auto;
  height: 2px;
  opacity: .05;
}

.staff-highlight__wave::after {
  opacity: .15;
  filter: drop-shadow(0 0 2px rgba(125, 94, 0, .2));
  clip-path: polygon(
    0 48%,
    10% 45%,
    20% 34%,
    31% 63%,
    42% 14%,
    50% 76%,
    58% 16%,
    69% 63%,
    80% 34%,
    90% 45%,
    100% 48%,
    100% 58%,
    90% 55%,
    80% 66%,
    69% 37%,
    58% 86%,
    50% 24%,
    42% 84%,
    31% 37%,
    20% 66%,
    10% 55%,
    0 58%
  );
  animation: staff-highlight-string 260ms steps(2, end) infinite;
}

@keyframes staff-highlight-string {
  0% {
    clip-path: polygon(
      0 48%,
      10% 45%,
      20% 34%,
      31% 63%,
      42% 14%,
      50% 76%,
      58% 16%,
      69% 63%,
      80% 34%,
      90% 45%,
      100% 48%,
      100% 58%,
      90% 55%,
      80% 66%,
      69% 37%,
      58% 86%,
      50% 24%,
      42% 84%,
      31% 37%,
      20% 66%,
      10% 55%,
      0 58%
    );
  }
  50% {
    clip-path: polygon(
      0 51%,
      10% 56%,
      20% 66%,
      31% 37%,
      42% 86%,
      50% 18%,
      58% 84%,
      69% 37%,
      80% 66%,
      90% 56%,
      100% 51%,
      100% 61%,
      90% 46%,
      80% 34%,
      69% 63%,
      58% 14%,
      50% 82%,
      42% 16%,
      31% 63%,
      20% 34%,
      10% 46%,
      0 61%
    );
  }
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
