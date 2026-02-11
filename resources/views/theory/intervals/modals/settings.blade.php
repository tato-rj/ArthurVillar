@modal(['title' => 'Game settings', 'id' => 'settings-modal'])
<form id="intervals-settings" method="GET" action="{{route('theory.intervals.play')}}">
	<div class="d-apart mb-3">
		<label class="nowrap">Level</label>
		<select style="width: fit-content;" name="level" class="form-select form-select-sm py-1">
			<option value="beginner">Beginner </option>
			<option value="intermediate">Intermediate </option>
			<option value="advanced">Advanced </option>
		</select>
	</div>

	<div class="d-apart mb-3">
		<label class="nowrap">Number of rounds</label>
		<div class="d-center form-number">
			<button style="touch-action: manipulation;" type="button" data-direction="down" class="btn-raw">@fa(['icon' => 'minus-circle', 'fa_color' => 'muted', 'mr' => 0, 'fa_size' => 'lg'])</button>
			<input type="text" readonly name="rounds" max="12" min="2" value="4" class="form-control form-control-sm py-1 mx-2" style="width: 52px;">
			<button style="touch-action: manipulation;" type="button" data-direction="up" class="btn-raw">@fa(['icon' => 'plus-circle', 'fa_color' => 'muted', 'mr' => 0, 'fa_size' => 'lg'])</button>
		</div>
{{-- 		<select style="width: fit-content;" name="rounds" class="form-select form-select-sm py-1">
			@for($i=2; $i<=12; $i++)
			<option value="{{$i}}">{{$i}} </option>
			@endfor
		</select> --}}
	</div>

	<div class="d-apart mb-3">
		<label>Sound effects</label>
		@toggle(['name' => 'sound', 'on' => true])
	</div>

	<div class="mt-4">
		<button type="submit" class="btn btn-primary w-100">{{$btnLabel}}</button>
	</div>
</form>
@endmodal