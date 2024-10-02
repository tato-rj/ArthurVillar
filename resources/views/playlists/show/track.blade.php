<div class="d-apart {{$loop->last ? null : 'border-bottom mb-2 pb-2'}}">
	<div class="text-truncate mr-2">
    	<h6 class="m-0 text-truncate">{{$recording->name}} {{$recording->name}} {{$recording->name}}</h6>
    	<p class="m-0 opacity-4 small">by {{$recording->composer->name}} in {{$recording->composed_in}}</p>
    </div>

	@if($recording->is($playingRecording))
	<div class="playing-bars mx-2 text-nowrap">
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
    	<button class="btn btn-secondary btn-sm text-nowrap" type="submit">@fa(['icon' => 'play'])Play</button>
	</form>
	@endif
</div>