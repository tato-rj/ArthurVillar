<div id="final-overlay" class="position-absolute w-100 h-100 top-0 left-0">
	<div class="text-center container">
		<img src="{{asset('images/badges/trophy.svg')}}" width="220" class="animate__animated animate__rubberBand mb-">
		<div id="result-greeting" class="text-center animate__animated animate__fadeInUp animate__faster mb-2">
			<h1 class="m-0"></h1>

			<div id="settings-bonus-earned" class="text-blue mt-1 fw-bold" style="display: none">@fa(['icon' => 'gem'])Bonus points earned</div>
		</div>

		<div class="row mb-4">
			<div class="col-lg-4 col-md-8 col-12 mx-auto row justify-content-center" id="metrics-boxes"> 
				@include('theory.components.results.box', ['name' => 'rounds', 'title' => 'ROUNDS', 'color' => 'orange', 'icon' => 'gamepad'])
				@include('theory.components.results.box', ['name' => 'score', 'title' => 'SCORE', 'color' => 'purple', 'icon' => 'bolt'])
				@include('theory.components.results.box', ['name' => 'accuracy', 'title' => 'ACCURACY', 'color' => 'green', 'icon' => 'bullseye'])
				@include('theory.components.results.box', ['name' => 'duration', 'title' => 'TIME', 'color' => 'blue', 'icon' => 'clock'])
			</div>
		</div>

		<div class="row mb-4">
			<div class="col-lg-4 col-md-8 col-12 mx-auto"> 
				<div class="px-3">
					<div class="btn-floating w-100 mb-3">
	        			<button data-bs-toggle="modal" data-bs-target="#save-results-modal" class="btn btn-primary w-100">@fa(['icon' => 'star'])Join the leaderboard</button>
	        		</div>
        			<div class="d-flex">
						<button onclick="location.reload();" class="btn btn-white mr-1 w-100">@fa(['icon' => 'rotate-right'])Play again</button>
						<a href="{{route('theory.index')}}" class="btn btn-white w-100 ml-1">@fa(['icon' => 'house'])Back home</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('theory.components.leaderboard.store')
