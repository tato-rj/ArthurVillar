@extends('layouts.app', ['noMenu' => true, 'title' => $recording->name_with_composer])

@push('header')
<link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />
<style type="text/css">
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
<section class="d-center w-100" style="height: 80vh;">
  <div id="player-container" class="animate__animated animate__fadeIn animate__slower p-5" style="width: 600px; display: none;">
    <div class="mb-3 p-1 w-100">
      {{-- <img class="shadow-lg mb-3 w-100" src="{{asset($recording->cover_path)}}"> --}}
      @include('components.period', ['period' => $recording->period])
      @if($recording->composed_in)
      <h6 class="small">Composed in {{$recording->composed_in}}</h6>
      @endif
      <h2 class="mb-2 lh-1">{{$recording->name}}</h2>
      <h6 class="mb-1">{{$recording->composer}}</h6>
      <h6 class="opacity-4">{{$recording->artist}}</h6>
    </div>
    <div class="mb-4">
      <audio id="player" controls>
        <source src="{{$recording->file('audio_path')}}" type="audio/mp3" />
      </audio>
    </div>
    <div class="d-flex">
      <button data-bs-toggle="modal" data-bs-target="#recording-{{$recording->id}}-info-modal" class="btn btn-sm btn-outline-secondary mr-2">Info</button>
      <a href="{{$recording->source_url}}" target="_blank" class="btn btn-sm btn-outline-secondary">Source</a>
    </div>
  </div>
</section>

@include('recordings.info')
@endsection

@push('scripts')
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

<script>

</script>

<script type="text/javascript">
$(document).ready(function() {
  $('#player-container').show();

  const player = new Plyr('#player', {
    title: 'Example Title',
    controls: ['play', 'progress', 'current-time', 'airplay']
  });
});

function fadeOutAudio(duration) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(player.media);
    const gainNode = audioContext.createGain();
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Start at full volume
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration); // Fade out to 0

    player.play(); // Ensure playback starts
}

player.on('ended', (event) => {
  // fadeOutAudio(2)
});
</script>
@endpush