<div class="position-relative key-wrapper">
	@if($blackKey)
	<div class="black-key">
		<button type="button" class="btn btn-dark"></button>
		@include('theory.components.piano.marker')
	</div>
	@endif
	<div class="white-key">
		<button type="button" class="btn btn-white"></button>
		@include('theory.components.piano.marker')
	</div>
</div>