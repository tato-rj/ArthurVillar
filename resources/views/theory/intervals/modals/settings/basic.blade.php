<div id="settings-basic">
	<form id="intervals-settings" method="GET" action="{{route('theory.intervals.play')}}">
		
		<div class="d-apart mb-3">
			<label class="nowrap">Number of rounds</label>
			<div class="d-center form-number">
				<button style="touch-action: manipulation;" type="button" data-direction="down" class="btn-raw text-dark">@fa(['icon' => 'minus', 'mr' => 0, 'fa_size' => 'xl'])</button>
				<input type="text" readonly name="rounds" max="12" min="2" value="4" class="form-control form-control-sm py-1 mx-2 text-center" style="width: 52px;">
				<button style="touch-action: manipulation;" type="button" data-direction="up" class="btn-raw text-dark">@fa(['icon' => 'plus', 'mr' => 0, 'fa_size' => 'xl'])</button>
			</div>
		</div>
		
		<div class="d-apart mb-3">
			<label class="nowrap">Level</label>
			<select style="width: fit-content;" name="level" class="form-select form-select-sm py-1">
				<option value="beginner">Beginner </option>
				<option value="intermediate">Intermediate </option>
				<option value="advanced">Advanced </option>
			</select>
		</div>

		<div class="d-apart mb-3">
			<label>Sound effects</label>
			@toggle(['name' => 'sound', 'on' => true])
		</div>

		<div class="mt-4">
			<button type="submit" class="btn btn-primary w-100">{{$btnLabel}}</button>
		</div>
	</form>
</div>