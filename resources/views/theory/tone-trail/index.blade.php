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
    <div class="col-11 mx-auto mb-3 position-relative">
      <div id="blocks-wrapper" class="text-center mx-auto position-relative">
        <div id="blocks" class="my-4">
          @include('theory.tone-trek.grid')
        </div>
        @include('theory.components.feedback')
      </div>
    </div>

    <div class="col-lg-6 col-md-8 col-11 mx-auto">
      @include('theory.components.controls', ['instructions' => 'Complete all intervals above'])
      @include('theory.tone-trek.modals.settings')
      @include('theory.tone-trek.modals.instructions')
      @include('theory.components.preferences')
    </div>
  </div>
</section>

@include('theory.components.results.overlay')
@include('theory.components.keyboard')
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/tone@14.8.49/build/Tone.js"></script>
<script src="{{ mix('js/music/blocks.js') }}"></script>
@endpush
