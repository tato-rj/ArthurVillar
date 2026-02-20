<div class="col-6 animate__animated animate__bounceIn">
	<div class="w-100 bg-light border border-dark {{$color}} position-relative rounded p-1 mb-3" style="border-radius: 8px !important;">
		@if($name == 'score')
		<div id="double-points">
			<div class="d-center bg-primary animate__animated animate__tada border border-black position-relative">
				<div class="badge rounded-pill bg-primary border border-black position-absolute" style="
				    font-size: 34%;
				    bottom: -6px;
				">NO MISTAKES!</div>
				<div class="d-center double-points__innerring">
					<span class="fw-bold d-center border border-black">2x</span>
				</div>
			</div>
		</div>
		@endif
		<div class="pb-1 text-center fw-bold" style="font-size: 70%">{{$title}}</div>
		<div class="text-{{$color}} border border-dark bg-white rounded fw-bold d-center px-2 py-3 h5 m-0" style="border-radius: 8px !important;">
			@fa <span name="{{$name}}"></span>
		</div>
	</div>
</div>