<div id="final-overlay" class="position-fixed w-100 h-100vh top-0 left-0">
	<div class="text-center" style="margin-top: 6rem;">
		<img src="{{asset('images/badge.png')}}" width="140" class="animate__animated animate__zoomInDown mb-4">
		<div class="text-center animate__animated animate__fadeInUp animate__faster mb-4">
			<h1 class="text-">Great job!</h1>
			<h6 class="text-muted px-4">It's not about getting the most points, but if it was...</h6>
		</div>

		<div class="row mb-5">
			<div class="col-lg-4 col-md-8 col-12 mx-auto row justify-content-center" id="metrics-boxes"> 
				@include('theory.overlays.components.box', ['name' => 'score', 'title' => 'SCORE', 'color' => 'purple', 'icon' => 'bolt'])
				@include('theory.overlays.components.box', ['name' => 'accuracy', 'title' => 'ACCURACY', 'color' => 'green', 'icon' => 'bullseye'])
				@include('theory.overlays.components.box', ['name' => 'duration', 'title' => 'TIME', 'color' => 'blue', 'icon' => 'clock'])
			</div>
		</div>
		<div class="row">
			<div class="col-lg-4 col-md-8 col-12 mx-auto"> 
				<div class="px-3">
					<a href="{{route('theory.intervals.index')}}" class="btn btn-primary mb-2 w-100">Start a new challenge</a>
					<a href="{{route('theory.index')}}" class="btn btn-white w-100">Back to the main menu</a>
				</div>
			</div>
		</div>
	</div>
</div>