@modal(['title' => 'New lesson', 'id' => 'create-calendar-lesson-plan-modal'])
@php
	$oldStudentId = old('student_id');
	$oldRepeat = (string) old('repeat', 'none');
	$selectedStudent = isset($students)
		? $students->first(fn ($student) => (string) $student->id === (string) $oldStudentId)
		: null;
	$selectedStudent = $selectedStudent ?: ($student ?? null);
	$selectedStudentName = $selectedStudent
		? trim($selectedStudent->first_name . ' ' . $selectedStudent->last_name)
		: '';
@endphp

<form method="POST" action="{{route('calendar.lesson-plans.store')}}" data-lesson-plan-form>
	@csrf

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'user'])STUDENT</label>

	<div class="form-group text-left">
		<div class="calendar-student-combobox" data-student-combobox>
			<div class="form-control d-flex align-items-center calendar-student-combobox-control">
				<input
					class="border-0 w-100 h-100"
					type="text"
					autocomplete="off"
					placeholder="Select a student"
					value="{{$selectedStudentName}}"
					data-student-combobox-input>

				<input
					type="hidden"
					name="student_id"
					value="{{old('student_id', optional($selectedStudent)->id)}}"
					required
					data-student-combobox-value>

				@fa(['icon' => 'angle-down', 'mr' => 0, 'fa_color' => 'grey'])
			</div>

			<div class="calendar-student-combobox-menu" data-student-combobox-menu>
				@foreach($students ?? [] as $student)
					@php($studentName = trim($student->first_name . ' ' . $student->last_name))
					<button
						type="button"
						class="calendar-student-combobox-option"
						data-student-combobox-option
						data-student-id="{{$student->id}}"
						data-student-name="{{$studentName}}"
						data-student-location-id="{{$student->location_id}}"
						data-student-payment-method="{{$student->payment_method}}">
						{{$studentName}}
					</button>
				@endforeach

				<div class="calendar-student-combobox-empty" data-student-combobox-empty>No students found</div>
			</div>
		</div>

		@feedback(['input' => 'student_id'])
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'calendar-day'])SCHEDULE</label>

	@select(['placeholder' => 'Location', 'name' => 'location_id', 'grid' => 'col', 'required' => true])
		@foreach($locations as $location)
			@option(['name' => 'location_id', 'label' => $location->name, 'value' => $location->id, 'selected' => old('location_id', optional($selectedStudent)->location_id) == $location->id, 'data' => ['fee-amount' => $location->feeAmountForInput(), 'is-online' => strtolower($location->name) === 'online' ? 1 : 0]])
		@endforeach
	@endselect

	@select(['placeholder' => 'Directions', 'name' => 'travel_mode', 'grid' => 'col', 'required' => true])
		@option(['name' => 'travel_mode', 'label' => 'No directions', 'value' => 'NONE', 'selected' => old('travel_mode') === 'NONE'])
		@option(['name' => 'travel_mode', 'label' => 'Public transit', 'value' => 'TRANSIT', 'selected' => old('travel_mode', 'TRANSIT') === 'TRANSIT'])
		@option(['name' => 'travel_mode', 'label' => 'Walking', 'value' => 'WALK', 'selected' => old('travel_mode') === 'WALK'])
		@option(['name' => 'travel_mode', 'label' => 'Driving', 'value' => 'DRIVE', 'selected' => old('travel_mode') === 'DRIVE'])
	@endselect
	
	<div class="lesson-plan-online-field">
		@input(['placeholder' => 'Meeting URL', 'name' => 'meeting_url', 'type' => 'url', 'value' => old('meeting_url')])
	</div>

	<div class="lesson-plan-online-field">
		@input(['placeholder' => 'Notes URL', 'name' => 'notes_url', 'type' => 'url', 'value' => old('notes_url')])
	</div>

	<div class="row">
		@input(['placeholder' => 'Date', 'name' => 'starts_on', 'type' => 'date', 'value' => old('starts_on', today()->toDateString()), 'grid' => 'col', 'required' => true])
	</div>

	<div class="row">
		@select(['placeholder' => 'Repeat', 'name' => 'repeat', 'grid' => 'col', 'required' => true])
			@option(['name' => 'repeat', 'label' => 'Does not repeat', 'value' => 'none', 'selected' => $oldRepeat === 'none'])
			@option(['name' => 'repeat', 'label' => 'Every week', 'value' => 1, 'selected' => $oldRepeat === '1'])
			@option(['name' => 'repeat', 'label' => 'Every other week', 'value' => 2, 'selected' => $oldRepeat === '2'])
		@endselect
	</div>

	<div data-lesson-repeat-end @if($oldRepeat === 'none') style="display: none;" @endif>
		@input(['placeholder' => 'Ends on', 'name' => 'ends_on', 'type' => 'date', 'value' => old('ends_on'), 'required' => $oldRepeat !== 'none', 'disabled' => $oldRepeat === 'none'])
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'clock'])TIME</label>

	<div class="row"> 
		@select(['placeholder' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
			@foreach(\App\Models\Calendar\LessonPlan::timeOptions() as $time)
				@option(['name' => 'start_time', 'label' => \App\Models\Calendar\LessonPlan::timeLabel($time), 'value' => $time, 'selected' => old('start_time') == $time])
			@endforeach
		@endselect

		@select(['placeholder' => 'Duration', 'name' => 'duration_minutes', 'grid' => 'col', 'required' => true])
			@foreach([30, 45, 60, 90] as $duration)
				@option(['name' => 'duration_minutes', 'label' => $duration . ' min', 'value' => $duration, 'selected' => old('duration_minutes', 30) == $duration])
			@endforeach
		@endselect
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'money-bill-wave'])PAYMENT</label>
	<div class="row"> 
		@input(['placeholder' => 'Fee', 'name' => 'fee_amount', 'value' => old('fee_amount'), 'mask' => 'usd', 'grid' => 'col'])

		@select(['placeholder' => 'Payment method', 'name' => 'payment_method', 'grid' => 'col'])
			@foreach(payment()->methods() as $method)
				@option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => old('payment_method', optional($selectedStudent)->payment_method) == $method])
			@endforeach
		@endselect
	</div>

	@textarea(['placeholder' => 'Notes', 'name' => 'notes', 'value' => old('notes'), 'rows' => 3])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
