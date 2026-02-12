<input type="hidden" name="mode" value="basic">

<div class="d-apart mb-3">
	<label>Accidentals on the initial note</label>
	@toggle(['name' => 'accidentals', 'on' => false])
</div>

<div class="mb-3">
	<label class="nowrap">Intervals</label>
	<div class="d-flex flex-wrap">
		@foreach(['m2', 'M2', 'm3', 'M3', 'P4', 'A4', 'd5', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'] as $interval)
		<div class="m-1 position-relative">
			<input name="intervals[]" type="checkbox" value="{{$interval}}" class="invisible position-absolute top-0 left-0" id="{{$interval}}" autocomplete="off">
			<label class="btn btn-white" for="{{$interval}}">{{$interval}}</label>
		</div>
		@endforeach
	</div>
</div>

<div class="mb-3">
	<label class="nowrap">Clefs</label>
	<div class="d-flex flex-wrap">
		@foreach(['treble', 'bass', 'alto', 'tenor'] as $clef)
		<div class="m-1 position-relative">
			<input name="clefs[]" type="checkbox" value="{{$clef}}" class="invisible position-absolute top-0 left-0" id="{{$clef}}-clef" autocomplete="off">
			<label class="btn btn-white" for="{{$clef}}-clef">{{ucfirst($clef)}}</label>
		</div>
		@endforeach
	</div>
</div>