<div id="overlay" class="position-fixed w-100 h-100vh top-0 left-0">
	<div class="text-center" style="margin-top: 6rem;">
		<img src="{{asset('images/badge.png')}}" width="140" class="animate__animated animate__zoomInDown mb-4">
		<div class="text-center animate__animated animate__fadeInUp animate__faster mb-4">
			<h1 class="text-">Great job!</h1>
			<h6 class="text-muted px-4">It's not about getting the most points, but if it was...</h6>
		</div>

		<div class="row w-100 mb-6">
			<div class="col-lg-4 col-md-8 col-12 mx-auto row"> 
				@include('theory.overlays.components.box', ['title' => 'TOTAL PTS', 'color' => 'purple', 'icon' => 'bolt', 'value' => '30'])
				@include('theory.overlays.components.box', ['title' => 'ACCURACY', 'color' => 'green', 'icon' => 'bullseye', 'value' => '92%'])
				@include('theory.overlays.components.box', ['title' => 'TIME', 'color' => 'blue', 'icon' => 'clock', 'value' => '12:34'])
			</div>
		</div>

		<a href="{{route('theory.index')}}" class="btn btn-primary ">Start a new challenge</a>
	</div>
</div>