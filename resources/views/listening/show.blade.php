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

.playback-modes {
  display: flex;
  gap: 6px;
  margin-left: auto;
}

.playback-mode {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
}

img {
  border-radius: 12px !important;
}

#options {

}

.playback-modes {
  justify-content: end;
}

@media (max-width: 991.98px) {
  .playback-modes {
    justify-content: start;
  }
}
</style>
@endpush

@section('content')

@if(request()->qrcode)
<div class="position-absolute top-o left-0 w-100 mt-3 animate__animated animate__fadeInLeft">
  <div class="mb-2">
    <a id="qrcode-link" href="{{route('listening.recordings.qrcode', ['recording' => $recording, 'url' => url()->current()])}}" class="btn btn-sm btn-secondary">@fa(['icon' => 'qrcode'])Make QRCode</a>
  </div>

  <div>
    <a id="public-link" href="{{url()->current()}}" target="_blank" class="btn btn-sm btn-secondary">@fa(['icon' => 'link'])Public link</a>
  </div>
</div>
@endif

<section class="d-center w-100" style="height: 80vh;">
  <div id="player-container" class="animate__animated animate__fadeIn animate__slower p-4" style="width: 600px; display: none;">
    <div class="mb-3 p-1 w-100">
      <div class="d-apart mb-1">
        <div id="player-period" class="badge bg-{{$recording->period->color}} rounded-pill py-0 mb-1">{{$recording->period->name}}</div>
        @if($recording->composed_in)
        <h6 id="player-composed-in" class="small m-0 opacity-4">Composed in {{$recording->composed_in}}</h6>
        @else
        <h6 id="player-composed-in" class="small m-0 opacity-4 d-none"></h6>
        @endif
      </div>
      <h2 id="player-title" class="mb-2 lh-1">{{$recording->name}}</h2>
      <h6 id="player-composer" class="mb-1">{{$recording->composer->name}}</h6>
      <h6 id="player-artist" class="opacity-4">{{$recording->artist}}</h6>
    </div>
    <div class="mb-4">
      <audio id="player" controls>
        <source src="{{$recording->storage('audio_path')}}" type="audio/mp3" />
      </audio>
      <p id="autoplay-error" role="status" class="small text-muted mt-2 mb-0"></p>
    </div>
    <div class="row">
      <div class="col-lg-6 col-12 order-lg-1 order-2 d-flex mb-3">
        <button id="player-about" data-bs-toggle="modal" data-bs-target="#recording-{{$recording->id}}-about-modal" class="btn btn-sm btn-outline-secondary mr-2">About</button>
        <button id="player-composer-button" data-bs-toggle="modal" data-bs-target="#recording-{{$recording->id}}-composer-modal" class="btn btn-sm btn-outline-secondary mr-2">Composer</button>
        <a id="player-youtube" href="{{$recording->source_url}}" target="_blank" class="btn btn-sm btn-outline-secondary">Youtube</a>
      </div>
      @isset($playlist)
      <div class="col-lg-6 col-12 order-lg-2 order-1 mb-3">
      <div class="playback-modes w-100" role="group" aria-label="Automatic playback mode">
        <button type="button" class="btn btn-sm btn-outline-secondary playback-mode" data-playback-mode="shuffle" aria-label="Shuffle remaining pieces" aria-pressed="false" title="Shuffle remaining pieces">@fa(['icon' => 'shuffle', 'mr' => 0])</button>
        <button type="button" class="btn btn-sm btn-outline-secondary playback-mode" data-playback-mode="repeat" aria-label="Repeat current piece" aria-pressed="false" title="Repeat current piece">@fa(['icon' => 'repeat', 'mr' => 0])</button>
        <button type="button" class="btn btn-sm btn-outline-secondary playback-mode" data-playback-mode="infinite" aria-label="Play playlist continuously" aria-pressed="false" title="Play playlist continuously">@fa(['icon' => 'infinity', 'mr' => 0])</button>
      </div>
      @endisset
    </div>
  </div>
</section>

@include('listening.components.composer')
@include('listening.components.about')

@isset($playlist)
@include('listening.components.playlist.show')
@foreach($playlist->recordings as $playlistRecording)
  @unless($playlistRecording->is($recording))
    @include('listening.components.composer', ['recording' => $playlistRecording])
    @include('listening.components.about', ['recording' => $playlistRecording])
  @endunless
@endforeach
@endisset
@endsection

@push('scripts')
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>

<script type="text/javascript">
$(document).ready(function() {
  $('#player-container').show();
  $('#playlist-container').show();

  $('#offcanvasBottom').on('click', '.track-container[submit]', function() {
    $(this).closest('form').submit();
  });

  const player = new Plyr('#player', {
    title: document.getElementById('player-title').textContent,
    controls: ['play', 'progress', 'current-time', 'airplay']
  });

  player.on('play', function() {
    $('.playing-bars:not(.d-none)').addClass('wave-animation');
    document.getElementById('autoplay-error').textContent = '';
  });

  player.on('ended pause', function() {
    $('.playing-bars').removeClass('wave-animation');
  });

  const modeButtons = Array.from(document.querySelectorAll('[data-playback-mode]'));
  if (!modeButtons.length) return;

  const modeKey = 'listening.playbackModeV2';
  let activeMode = null;

  function setMode(mode) {
    activeMode = mode;
    modeButtons.forEach(button => {
      const selected = button.dataset.playbackMode === mode;
      button.setAttribute('aria-pressed', String(selected));
      button.classList.toggle('btn-secondary', selected);
      button.classList.toggle('btn-outline-secondary', !selected);
    });
  }

  try {
    const savedMode = localStorage.getItem(modeKey);
    if (modeButtons.some(button => button.dataset.playbackMode === savedMode)) setMode(savedMode);
  } catch (error) {
    // Playback still works when browser storage is unavailable.
  }

  const tracks = Array.from(document.querySelectorAll('#offcanvasBottom form[data-recording-id]'));
  let currentIndex = tracks.findIndex(track => track.dataset.recordingId === @json((string) $recording->id));
  let shuffleRemaining = [];
  let shuffleStarted = false;

  function startPlayback() {
    const playback = player.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        document.getElementById('autoplay-error').textContent = 'Automatic playback was blocked. Press play to continue.';
      });
    }
  }

  modeButtons.forEach(button => button.addEventListener('click', function() {
    setMode(activeMode === button.dataset.playbackMode ? null : button.dataset.playbackMode);
    shuffleRemaining = [];
    shuffleStarted = false;
    try {
      localStorage.setItem(modeKey, activeMode || '');
    } catch (error) {
      // Keep the mode active for this page.
    }
  }));

  player.on('ended', function() {
    if (!activeMode) return;

    if (activeMode === 'repeat') {
      player.currentTime = 0;
      startPlayback();
      return;
    }

    let nextIndex;
    if (activeMode === 'shuffle') {
      if (!shuffleStarted) {
        shuffleStarted = true;
        shuffleRemaining = tracks
          .map((track, index) => track.dataset.audioUrl && index !== currentIndex ? index : -1)
          .filter(index => index !== -1);
        for (let index = shuffleRemaining.length - 1; index > 0; index--) {
          const randomIndex = Math.floor(Math.random() * (index + 1));
          [shuffleRemaining[index], shuffleRemaining[randomIndex]] = [shuffleRemaining[randomIndex], shuffleRemaining[index]];
        }
      }
      nextIndex = shuffleRemaining.pop() ?? -1;
    } else {
      nextIndex = tracks.findIndex((track, index) => index > currentIndex && track.dataset.audioUrl);
      if (nextIndex === -1) nextIndex = tracks.findIndex(track => track.dataset.audioUrl);
    }
    if (nextIndex === -1) return;

    if (nextIndex === currentIndex) {
      player.currentTime = 0;
      startPlayback();
      return;
    }

    const previous = tracks[currentIndex];
    const next = tracks[nextIndex];

    if (previous) {
      previous.querySelector('.track-container').setAttribute('submit', '');
      previous.querySelector('.playing-bars').classList.add('d-none');
      previous.querySelector('.track-play-button').classList.remove('d-none');
    }

    next.querySelector('.track-container').removeAttribute('submit');
    next.querySelector('.playing-bars').classList.remove('d-none');
    next.querySelector('.track-play-button').classList.add('d-none');
    currentIndex = nextIndex;

    const details = next.dataset;
    document.getElementById('player-title').textContent = details.title;
    document.getElementById('player-composer').textContent = details.composer;
    document.getElementById('player-artist').textContent = details.artist;
    const composedIn = document.getElementById('player-composed-in');
    composedIn.textContent = details.composedIn ? 'Composed in ' + details.composedIn : '';
    composedIn.classList.toggle('d-none', !details.composedIn);
    const period = document.getElementById('player-period');
    period.className = 'badge bg-' + details.periodColor + ' rounded-pill py-0 mb-1';
    period.textContent = details.periodName;
    document.getElementById('player-about').setAttribute('data-bs-target', '#recording-' + details.recordingId + '-about-modal');
    document.getElementById('player-composer-button').setAttribute('data-bs-target', '#recording-' + details.recordingId + '-composer-modal');
    document.getElementById('player-youtube').href = details.sourceUrl;

    const publicLink = document.getElementById('public-link');
    if (publicLink) publicLink.href = details.playUrl;
    const qrcodeLink = document.getElementById('qrcode-link');
    if (qrcodeLink) qrcodeLink.href = details.qrcodeUrl;
    history.replaceState(history.state, '', details.playUrl);

    player.source = {
      type: 'audio',
      title: details.title,
      sources: [{ src: details.audioUrl, type: 'audio/mp3' }]
    };
    startPlayback();
  });
});
</script>
@endpush
