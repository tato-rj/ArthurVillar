@extends('layouts.app', ['noMenu' => true, 'title' => isset($playlist) ? $playlist->name : $recording->name_with_composer])

@push('header')
<link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
<style type="text/css">
.track-container[submit] {
  cursor: pointer;
}

.offcanvas-bottom {
    min-height: 25vh;
    max-height: 70vh !important;
    --bs-offcanvas-height: auto;
}

.wave-animation span {
  animation: wave 1s infinite ease-in-out;
  background: black !important;
}

.playing-bars {
  margin-top: 4px;
  width: 64.05px;
  text-align: center;
}

.playing-bars span {
  display: inline-block;
  background: lightgrey;
  width: 4px;
}

@keyframes wave {
  0%,100% {
    height: 4px;
  }
  50% {
    height: 20px;
  }
}

section {
  --plyr-control-icon-size: 24px;
  --plyr-font-size-time: 16px;
}

.plyr__controls {
  padding: 0 !important;
}

img {
  border-radius: 12px !important;
}

#options {

}
</style>
@endpush

@section('content')

@if(request()->qrcode)
<div class="position-absolute top-o left-0 w-100 mt-3 animate__animated animate__fadeInLeft">
  <div class="mb-2">
    <a href="{{route('admin.recordings.qrcode', ['recording' => $recording, 'url' => url()->current()])}}" class="btn btn-sm btn-secondary">@fa(['icon' => 'qrcode'])Make QRCode</a>
  </div>

  <div>
    <a href="{{url()->current()}}" target="_blank" class="btn btn-sm btn-secondary">@fa(['icon' => 'link'])Public link</a>
  </div>
</div>
@endif

<section class="d-center w-100" style="height: 80vh;">
  <div id="player-container" class="animate__animated animate__fadeIn animate__slower p-4" style="width: 600px; display: none;">
    <div class="mb-3 p-1 w-100">
      <div class="d-apart mb-1">
        @include('components.period', ['period' => $recording->period])
        @if($recording->composed_in)
        <h6 class="small m-0 opacity-4">Composed in {{$recording->composed_in}}</h6>
        @endif
      </div>
      <h2 class="mb-2 lh-1">{{$recording->name}}</h2>
      <h6 class="mb-1">{{$recording->composer->name}}</h6>
      <h6 class="opacity-4">{{$recording->artist}}</h6>
    </div>
    <div class="mb-4">
      <audio id="player" controls>
        <source src="{{$recording->storage('audio_path')}}" type="audio/mp3" />
      </audio>
    </div>
    <div class="d-flex">
      <button data-bs-toggle="modal" data-bs-target="#recording-{{$recording->id}}-about-modal" class="btn btn-sm btn-outline-secondary mr-2">About</button>
      <button data-bs-toggle="modal" data-bs-target="#recording-{{$recording->id}}-composer-modal" class="btn btn-sm btn-outline-secondary mr-2">Composer</button>
      <a href="{{$recording->source_url}}" target="_blank" class="btn btn-sm btn-outline-secondary">Youtube</a>
    </div>
  </div>
</section>

@include('admin.listening.recordings.play.composer')
@include('admin.listening.recordings.play.about')

@isset($playlist)
@include('admin.listening.playlists.show.index')
@endisset
@endsection

@push('scripts')
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

<script type="text/javascript">
$(document).ready(function() {
  $('#player-container').show();
  $('#playlist-container').show();

  $('.track-container[submit]').click(function() {
    $(this).closest('form').submit();
  });

  const player = new Plyr('#player', {
    title: '{{$recording->name}}',
    controls: ['play', 'progress', 'current-time', 'airplay']
  });

  // Fade in the volume when audio starts
  player.on('play', function() {
    $('.playing-bars').addClass('wave-animation');
  });


  // Reset volume when track ends
  player.on('ended pause', function() {
    $('.playing-bars').removeClass('wave-animation');
  });
});
</script>
@endpush