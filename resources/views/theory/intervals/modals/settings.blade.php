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
		<input type="number" name="rounds" max="12" min="2" class="form-control form-control-sm py-1" style="width: 80px;">
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

	<div>
		<button type="submit" class="btn btn-primary w-100">{{$btnLabel}}</button>
	</div>
</form>
@endmodal