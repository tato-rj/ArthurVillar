<div id="final-overlay" class="position-absolute w-100 top-0 left-0">
	<div class="text-center container">
		<img src="{{asset('images/badges/trophy.svg')}}" width="220" class="animate__animated animate__rubberBand mb-">
		<div id="result-greeting" class="text-center animate__animated animate__fadeInUp animate__faster mb-4">
			<h1 class="text-">Great job!</h1>
			<h6 class="text-muted px-5">It's not about getting the most points, but if it was...</h6>
		</div>

		<div class="row mb-4">
			<div class="col-lg-4 col-md-8 col-12 mx-auto row justify-content-center" id="metrics-boxes"> 
				@include('theory.results.components.box', ['name' => 'rounds', 'title' => 'ROUNDS', 'color' => 'orange', 'icon' => 'gamepad'])
				@include('theory.results.components.box', ['name' => 'score', 'title' => 'TOTAL XP', 'color' => 'purple', 'icon' => 'bolt'])
				@include('theory.results.components.box', ['name' => 'accuracy', 'title' => 'ACCURACY', 'color' => 'green', 'icon' => 'bullseye'])
				@include('theory.results.components.box', ['name' => 'duration', 'title' => 'TIME', 'color' => 'blue', 'icon' => 'clock'])
			</div>
		</div>
		<div class="row mb-4">
			<div class="col-lg-4 col-md-8 col-12 mx-auto"> 
				<div class="px-3">
					<button onclick="location.reload();" class="btn btn-primary mb-2 w-100">@fa(['icon' => 'star'])Start a new challenge</button>
					<a href="{{route('theory.index')}}" class="btn btn-white w-100">Back to the main menu</a>
				</div>
			</div>
		</div>
	</div>
</div>