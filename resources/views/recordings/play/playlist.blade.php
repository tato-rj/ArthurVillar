@php($playingRecording = $recording)
<div id="playlist-container" style="display: none;" class="animate__animated animate__bounceInUp animate__slower text-center position-fixed bottom-0 left-0 w-100 border-top">
	<button class="btn-raw p-3 w-100" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
			@fa(['icon' => 'chevron-up', 'mr' => 0])
			<div class="fw-bold lh-1 text-dark">Show playlist</div>
	</button>
</div>

<div class="offcanvas offcanvas-bottom border-0" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
  <div class="offcanvas-header pb-0">
    <h5 class="offcanvas-title text-center" id="offcanvasBottomLabel"></h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body px-0 pt-0 pb-5">
  	<div class="row"> 
  		<div class="col-lg-6 col-md-8 col-10 mx-auto"> 
  			<h5 class="offcanvas-title mb-4">@fa(['icon' => 'list']){{$playlist->name}}</h5>
		    @foreach($playlist->recordings as $recording)
		    <div class="d-apart {{$loop->last ? null : 'border-bottom mb-2 pb-2'}}">
		    	<div>
			    	<h6 class="m-0">{{$recording->name}}</h6>
			    	<p class="m-0 opacity-4 small">by {{$recording->composer->name}}</p>
			    </div>

		    	@if($recording->is($playingRecording))
		    	<div class="playing-bars mx-2">
		    		<span></span>
		    		<span></span>
		    		<span></span>
		    	</div>
		    	{{-- <button class="btn btn-secondary btn-sm" disabled type="button">Playing</button> --}}
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
		    @endforeach
		</div>
	</div>
  </div>
</div>