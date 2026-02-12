<div id="settings-advanced" style="display: none">
	<form id="intervals-settings" method="GET" action="{{route('theory.intervals.play')}}">
		<div class="d-apart mb-3">
			<label class="nowrap">Number of rounds</label>
			<div class="d-center form-number">
				<button style="touch-action: manipulation;" type="button" data-direction="down" class="btn-raw text-dark">@fa(['icon' => 'minus', 'mr' => 0, 'fa_size' => 'xl'])</button>
				<input type="text" readonly name="rounds" max="12" min="2" value="4" class="form-control form-control-sm py-1 mx-2 text-center" style="width: 52px;">
				<button style="touch-action: manipulation;" type="button" data-direction="up" class="btn-raw text-dark">@fa(['icon' => 'plus', 'mr' => 0, 'fa_size' => 'xl'])</button>
			</div>
		</div>

		<div class="mb-3">
			<label class="nowrap">Intervals</label>
			<div class="d-flex flex-wrap">
				@foreach(['m2', 'M2', 'm3', 'M3', 'P4', 'A4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'] as $interval)
				<div class="m-1">
					<input name="intervals" type="checkbox" value="{{$interval}}" class="btn-check" id="{{$interval}}" autocomplete="off">
					<label class="btn btn-white" for="{{$interval}}">{{$interval}}</label>
				</div>
				@endforeach
			</div>
		</div>

		<div class="mb-3">
			<label class="nowrap">Clefs</label>
			<div class="d-flex flex-wrap">
				@foreach(['treble', 'bass', 'alto', 'tenor'] as $clef)
				<div class="m-1">
					<input name="clefs" type="checkbox" value="{{$clef}}" class="btn-check" id="{{$clef}}" autocomplete="off">
					<label class="btn btn-white" for="{{$clef}}">{{ucfirst($clef)}}</label>
				</div>
				@endforeach
			</div>
		</div>

		<div class="d-apart mb-3">
			<label>Accidentals on the initial note</label>
			@toggle(['name' => 'accidentals', 'on' => false])
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