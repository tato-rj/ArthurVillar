<div class="mb-2 d-flex align-items-center">
	<a href="{{route('theory.index')}}" class="btn-raw text-grey" style="margin-top: 2px;">@fa(['icon' => 'times', 'fa_size' => 'xl'])</a>

	<div class="w-100 mr-2">
		<div class="progress">
		  <div class="progress-bar bg-green" id="progress-bar" style="width: 0%;">
		  	<span id="progress-counter" class="fw-bold"></span>
		  </div>
		</div>
	</div>

	<div id="score">
		<div class="d-center"> 
			@fa(['icon' => 'bolt', 'mr' => 1, 'fa_color' => 'primary'])
			<div class="position-relative">
				<span id="points" class="fw-bold text-primary h5 m-0">0</span>
				<span id="increment" class="position-absolute right-0 fw-bold text-light h5 m-0">+1</span>
			</div>
		</div>
	</div>
</div>