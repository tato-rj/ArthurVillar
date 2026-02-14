<div id="final-overlay" class="position-absolute w-100 top-0 left-0">
	<div class="text-center container" style="margin-top: 2rem;">
		<div class="position-relative">
			<div class="position-absolute top-0 left-0 w-100 h-100 d-center">
				<dotlottie-wc
				  class="w-100"
				  style="z-index: 0;"
				  src="https://lottie.host/5c852ec4-3960-4cbb-b1aa-45926b3d4545/O4zf2YSwRs.lottie"
				  autoplay
				  loop
				></dotlottie-wc>
			</div>
			<img src="{{asset('images/badge.png')}}" width="140" class="animate__animated animate__zoomInDown mb-4 pt-3 pr-2">
			<div class="text-center animate__animated animate__fadeInUp animate__faster mb-4">
				<h1 class="text-">Great job!</h1>
				<h6 class="text-muted px-5">It's not about getting the most points, but if it was...</h6>
			</div>
		</div>

		<div class="row mb-4">
			<div class="col-lg-4 col-md-8 col-12 mx-auto row justify-content-center" id="metrics-boxes"> 
				@include('theory.overlays.components.box', ['name' => 'rounds', 'title' => 'ROUNDS', 'color' => 'orange', 'icon' => 'gamepad'])
				@include('theory.overlays.components.box', ['name' => 'score', 'title' => 'SCORE', 'color' => 'purple', 'icon' => 'bolt'])
				@include('theory.overlays.components.box', ['name' => 'accuracy', 'title' => 'ACCURACY', 'color' => 'green', 'icon' => 'bullseye'])
				@include('theory.overlays.components.box', ['name' => 'duration', 'title' => 'TIME', 'color' => 'blue', 'icon' => 'clock'])
			</div>
		</div>
		<div class="row mb-4">
			<div class="col-lg-4 col-md-8 col-12 mx-auto"> 
				<div class="px-3">
					<button data-form="#intervals-settings" class="btn btn-primary mb-2 w-100">@fa(['icon' => 'star'])Start a new challenge</button>
					{{-- <button data-bs-toggle="modal" data-bs-target="#share-modal" class="btn btn-white mb-2 w-100">@fa(['icon' => 'envelope'])Share my results</button> --}}
					<a href="{{route('theory.index')}}" class="btn btn-white w-100">Back to the main menu</a>
				</div>
			</div>
		</div>
	</div>
</div>

@include('theory.intervals.modals.share')