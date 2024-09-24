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
      <div class="d-apart mb-1">
        @include('components.period', ['period' => $recording->period])
        @if($recording->composed_in)
        <h6 class="small m-0 opacity-4">Composed in {{$recording->composed_in}}</h6>
        @endif
      </div>
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
    title: '{{$recording->name}}',
    controls: ['play', 'progress', 'current-time', 'airplay']
  });

  // Set initial volume to 0 for fade-in
  player.volume = 0;

  // Function to gradually adjust the volume with increasing fade-out speed
  function fadeVolumeWithAcceleration(targetVolume, duration) {
    const steps = 100; // Total number of steps
    const stepDuration = duration / steps; // Time for each step in seconds
    const initialVolume = player.volume;
    
    let currentStep = 0;

    const fade = setInterval(function() {
      const timeRemaining = player.duration - player.currentTime;

      // Calculate acceleration (increases the rate of fade over time)
      let accelerationFactor = 1;
      if (timeRemaining <= 5) {
        accelerationFactor = 1.25; // Last 5 seconds: 4x speed
      } else if (timeRemaining <= 7) {
        accelerationFactor = 1.5; // 7-5 seconds remaining: 3x speed
      } else if (timeRemaining <= 9) {
        accelerationFactor = 1.75; // 9-7 seconds remaining: 2x speed
      }
      
      // Calculate volume step with acceleration
      const volumeStep = (initialVolume - targetVolume) / steps * accelerationFactor;
      
      if (currentStep >= steps || player.volume <= targetVolume) {
        player.volume = targetVolume;
        clearInterval(fade); // Stop fading when target is reached
      } else {
        player.volume = player.volume - volumeStep; // Decrease volume gradually
        currentStep++;
      }
    }, stepDuration * 1000); // Convert step duration to milliseconds
  }

  // Fade in the volume when audio starts
  player.on('play', function() {
    fadeVolumeWithAcceleration(1, 5);  // Fade in to full volume over 5 seconds
  });

  // Start fade-out with acceleration when approaching the end
  player.on('timeupdate', function(e) {
    // Start fading out when there are 10 seconds left
    if (player.duration - player.currentTime <= 10 && player.volume > 0) {
      fadeVolumeWithAcceleration(0, 10);  // Fade out to 0 volume over 10 seconds with acceleration
    }
  });

  // Reset volume when track ends
  player.on('ended', function() {
    player.volume = 1; // Reset volume to full after the audio ends
  });
});

</script>
@endpush