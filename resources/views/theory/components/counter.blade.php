<div class="mb-2 d-flex align-items-center">
	<a href="{{route('theory.index')}}" class="btn-raw" style="margin-top: 2px;">@fa(['icon' => 'times', 'fa_size' => 'xl'])</a>

	<div class="w-100 mr-2">
		<div class="progress border border-black">
		  <div class="progress-bar bg-green" id="progress-bar" style="width: 0%;">
		  	<span id="progress-counter" class="fw-bold"></span>
		  </div>
		</div>
	</div>

	<div id="score">
		<div class="d-center"> 
			@fa(['icon' => 'bolt', 'mr' => 1, 'fa_color' => 'primary'])
			<div class="d-flex align-items-baseline">
				<div class="position-relative h4 m-0">
					<span id="points" class="fw-bold text-primary">0</span>
					<span id="increment" class="position-absolute right-0 fw-bold text-light opacity-4">+1</span>
				</div>
				<span class="text-primary fw-bold" style="font-size: 75%; margin-left: 0.15rem;">XP</span>
			</div>
		</div>
	</div>
</div>