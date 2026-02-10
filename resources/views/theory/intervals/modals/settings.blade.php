@modal(['title' => 'Settings', 'id' => 'settings-modal', 'size' => 'sm'])
<form>
{{-- 	<div class="d-apart mb-3">
		<label>Practice mode</label>
		@toggle(['name' => 'practice_mode', 'on' => true])
	</div> --}}

	<div class="d-apart mb-3">
		<label class="nowrap">Level</label>
		<select style="width: fit-content;" name="level" class="form-select form-select-sm">
			<option value="beginner">Beginner</option>
			<option value="intermediate">Intermediate</option>
			<option value="advanced">Advanced</option>
		</select>
	</div>

	<div class="d-apart mb-3">
		<label class="nowrap">Number of rounds</label>
		<select style="width: fit-content;" name="rounds" class="form-select form-select-sm">
			@for($i=2; $i<=12; $i++)
			<option value="{{$i}}">{{$i}}</option>
			@endfor
		</select>
	</div>

	<div class="d-apart mb-3">
		<label>Sound effects</label>
		@toggle(['name' => 'sound', 'on' => true])
	</div>

	<div class="d-apart mb-3">
		<label>Time limit</label>
		@toggle(['name' => 'time_limit', 'on' => false])
	</div>

	<div>
		<button type="submit" class="btn btn-primary w-100">Apply changes</button>
	</div>
</form>
@endmodal