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
.block {
  border: 1px solid black;
  width: 60px;
  height: 60px;
}
</style>
@endpush

@section('content')
{{-- @include('theory.components.pagetitle', [
  'title' => 'Intervals Challenge', 
  'description' => 'Add the note that forms the indicated interval']) --}}

@include('theory.components.title', ['label' => 'BLOCKS CHALLENGE'])

<section id="page-wrapper" class="container prevent-select">
  <div class="row">
    <div class="col-lg-6 col-md-8 col-11 mx-auto text-center">
      @include('theory.components.counter')
      @include('theory.components.timer')
    </div>

    <div class="col-11 mx-auto mb-3 position-relative">
      <div id="blocks-wrapper" class="text-center mx-auto position-relative">
        @include('theory.components.accidentals')
        <div id="blocks">
          @include('theory.blocks.block')
        </div>
        @include('theory.components.feedback')
        @include('theory.components.interval')
        @include('theory.components.hand')
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls')
      @include('theory.blocks.modals.settings')
      @include('theory.blocks.modals.instructions')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.results.overlay')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
{{-- <script src="{{ mix('js/music/intervals.js') }}"></script> --}}
<script>
  /**
   * Toggle "text-black" on the label matching the range value, reset others to "text-light".
   * Works with multiple sliders if each slider points at its own labels container via data-range-labels.
   */

</script>
@endpush
