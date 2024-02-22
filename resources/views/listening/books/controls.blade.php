@if($book->tracks()->exists())
<div id="controls" class="d-flex my-3">
	<button id="play-all" data-label="Play all" start class="btn btn-outline-secondary w-100 mr-2">Play all</button>
	<button id="shuffle" data-label="Shuffle" start class="btn btn-outline-secondary w-100 ml-2">Shuffle</button>
</div>
@endif