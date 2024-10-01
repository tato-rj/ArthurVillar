<div class="d-apart {{$loop->last ? null : 'border-bottom mb-2 pb-2'}}">
	<div>
    	<h6 class="m-0">{{$recording->name}}</h6>
    	<p class="m-0 opacity-4 small">by {{$recording->composer->name}}</p>
    </div>

	@if($recording->is($playingRecording))
	<div class="playing-bars mx-2">
		@for($x=0;$x<6;$x++)
		<span style="height: {{rand(8,20)}}px; animation-delay: {{rand(1,10)/10}}s;"></span>
		@endfor
	</div>
	@else
	<form method="POST" action="{{route('recordings.url', [
    		'play_token' => request()->play_token,
    		'playlist_id' => request()->playlist_id,
    		'recording' => $recording->id
    	])}}">
    	@csrf
    	<button class="btn btn-secondary btn-sm" type="submit">@fa(['icon' => 'play'])Play</button>
	</form>
	@endif
</div>