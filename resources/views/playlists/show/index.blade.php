@php($playingRecording = $recording)
<div id="playlist-container" style="display: none;" class="animate__animated animate__bounceInUp animate__slower text-center position-fixed bottom-0 left-0 w-100 border-top bg-white">
	<button class="btn-raw px-3 pb-3 pt-2 w-100 text-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
			@fa(['icon' => 'chevron-up', 'mr' => 0])
			<div class="fw-bold lh-1">Show playlist</div>
	</button>
</div>

<div class="offcanvas offcanvas-bottom border-0" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
  <div class="offcanvas-header py-2">
    <h5 class="offcanvas-title text-center" id="offcanvasBottomLabel"></h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body pt-0 pb-5">
  	<div class="row"> 
  		<div class="col-lg-6 col-md-8 col-12 mx-auto"> 
  			<h5 class="offcanvas-title mb-4">@fa(['icon' => 'list']){{$playlist->name}}</h5>
		    @foreach($playlist->recordings as $recording)
					@include('playlists.show.track')
		    @endforeach
		</div>
	</div>
  </div>
</div>