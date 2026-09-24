@php($playUrl = route('listening.show', ['token' => \App\Token\Token::generate($recording->id, $playlist)]))
<form method="GET" action="{{route('listening.url', $recording)}}"
	data-recording-id="{{$recording->id}}"
	data-audio-url="{{$recording->audio_path ? $recording->storage('audio_path') : ''}}"
	data-play-url="{{request()->qrcode ? $playUrl.'?qrcode=1' : $playUrl}}"
	data-title="{{$recording->name}}"
	data-composer="{{$recording->composer->name}}"
	data-artist="{{$recording->artist}}"
	data-composed-in="{{$recording->composed_in}}"
	data-period-name="{{$recording->period->name}}"
	data-period-color="{{$recording->period->color}}"
	data-source-url="{{$recording->source_url}}"
	@if(request()->qrcode)
	data-qrcode-url="{{route('listening.recordings.qrcode', ['recording' => $recording, 'url' => $playUrl])}}"
	@endif>
	@csrf
	<input type="hidden" name="token" value="{{request()->token}}">
	<div {{$recording->is($playingRecording) ? null : 'submit'}} class="track-container d-apart {{$loop->last ? null : 'border-bottom mb-2 pb-2'}}">
		<div class="d-flex align-ites-center text-truncate">
			<h6 class="mr-2 ml-1 mb-0 text-{{$recording->period->color}}">{{sprintf('%02d', $loop->iteration)}}</h6>
			<div class="text-truncate mr-3">
		    	<h6 class="m-0 text-truncate">{{$recording->name}}</h6>
		    	<p class="m-0 opacity-4 small text-truncate">by {{$recording->composer->shortName()}} in {{$recording->composed_in}}</p>
		    </div>
		</div>
		<div class="playing-bars text-nowrap {{$recording->is($playingRecording) ? '' : 'd-none'}}">
			@for($x=0;$x<6;$x++)
			<span style="height: {{rand(8,20)}}px; animation-delay: {{rand(1,100)/100}}s;"></span>
			@endfor
		</div>
		<button class="btn btn-secondary btn-sm text-nowrap track-play-button {{$recording->is($playingRecording) ? 'd-none' : ''}}" type="button">@fa(['icon' => 'play'])Play</button>
	</div>
</form>
