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
</style>
@endpush

@section('content')
<section class="d-center w-100" style="height: 80vh;">
  <div id="player-container" class="animate__animated animate__fadeIn animate__slower p-5" style="max-width: 600px; display: none;">
    <div class="mb-3 p-1 w-100">
      {{-- <img class="shadow-lg mb-3 w-100" src="{{asset($recording->cover_path)}}"> --}}
      @if($recording->composed_in)
      <h6 class="small">Composed in {{$recording->composed_in}}</h6>
      @endif
      <h2 class="mb-2 lh-1">{{$recording->name}}</h2>
      <h6 class="mb-1">{{$recording->composer}}</h6>
      <h6 class="opacity-4">{{$recording->artist}}</h6>
    </div>
    <audio id="player" controls>
      <source src="{{$recording->file('audio_path')}}" type="audio/mp3" />
    </audio>
  </div>
</section>
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
</script>
@endpush