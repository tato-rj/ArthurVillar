<form method="POST" action="{{route('recordings.url', [
		'play_token' => request()->play_token,
		'playlist_id' => request()->playlist_id,
		'recording' => $recording->id
	])}}">
	@csrf

	<div {{$recording->is($playingRecording) ? null : 'submit'}} class="track-container d-apart {{$loop->last ? null : 'border-bottom mb-2 pb-2'}}">
		<div class="d-flex align-items-center text-truncate">
			<h6 class="mr-2 ml-1 mb-0">{{sprintf('%02d', $loop->iteration)}}</h6>
			<div class="text-truncate mr-3">
		    	<h6 class="m-0 text-truncate">{{$recording->name}}</h6>
		    	<p class="m-0 opacity-4 small text-truncate">by {{$recording->composer->shortName()}} in {{$recording->composed_in}}</p>
		    </div>
		</div>
		@if($recording->is($playingRecording))
		<div class="playing-bars mx-2 text-nowrap">
			@for($x=0;$x<6;$x++)
			<span style="height: {{rand(8,20)}}px; animation-delay: {{rand(1,100)/100}}s;"></span>
			@endfor
		</div>
		@else
    	<button class="btn btn-secondary btn-sm text-nowrap" type="button">@fa(['icon' => 'play'])Play</button>
    	@endif
	</div>
</form>

