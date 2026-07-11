@modal(['title' => 'New recurring lesson', 'id' => 'create-calendar-lesson-plan-modal'])
<form method="POST" action="{{route('studio.lesson-plans.store')}}" data-lesson-plan-form>
	@csrf

	@php
		$oldStudentId = old('student_id');
		$selectedStudent = isset($students)
			? $students->first(fn ($student) => (string) $student->id === (string) $oldStudentId)
			: null;
		$selectedStudentName = $selectedStudent
			? trim($selectedStudent->first_name . ' ' . $selectedStudent->last_name)
			: '';
	@endphp

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'user'])STUDENT</label>

	<div class="form-group text-left">
		<div class="studio-student-combobox" data-student-combobox>
			<div class="form-control d-flex align-items-center studio-student-combobox-control">
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
					value="{{old('student_id')}}"
					required
					data-student-combobox-value>

				@fa(['icon' => 'angle-down', 'mr' => 0, 'fa_color' => 'grey'])
			</div>

			<div class="studio-student-combobox-menu" data-student-combobox-menu>
				@foreach($students ?? [] as $student)
					@php($studentName = trim($student->first_name . ' ' . $student->last_name))
					<button
						type="button"
						class="studio-student-combobox-option"
						data-student-combobox-option
						data-student-id="{{$student->id}}"
						data-student-name="{{$studentName}}"
						data-student-location-id="{{$student->location_id}}"
						data-student-payment-method="{{$student->payment_method}}">
						{{$studentName}}
					</button>
				@endforeach

				<div class="studio-student-combobox-empty" data-student-combobox-empty>No students found</div>
			</div>
		</div>

		@feedback(['input' => 'student_id'])
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'calendar-day'])SCHEDULE</label>

	@select(['placeholder' => 'Location', 'name' => 'location_id', 'grid' => 'col', 'required' => true])
		@foreach($locations as $location)
			@option(['name' => 'location_id', 'label' => $location->name, 'value' => $location->id, 'selected' => old('location_id') == $location->id, 'data' => ['fee-amount' => $location->feeAmountForInput(), 'is-online' => strtolower($location->name) === 'online' ? 1 : 0]])
		@endforeach
	@endselect
	
	<div class="lesson-plan-online-field">
		@input(['placeholder' => 'Meeting URL', 'name' => 'meeting_url', 'type' => 'url', 'value' => old('meeting_url')])
	</div>

	<div class="lesson-plan-online-field">
		@input(['placeholder' => 'Notes URL', 'name' => 'notes_url', 'type' => 'url', 'value' => old('notes_url')])
	</div>

	<div class="row"> 
		@select(['placeholder' => 'Weekday', 'name' => 'weekday', 'grid' => 'col', 'required' => true])
			@foreach(weekday() as $day)
				@option(['name' => 'weekday', 'label' => ucfirst($day), 'value' => $loop->iteration, 'selected' => old('weekday') == $loop->iteration])
			@endforeach
		@endselect

		@select(['placeholder' => 'Frequency', 'name' => 'recurrence_interval', 'grid' => 'col', 'required' => true])
			@foreach(['Every week', 'Every other week'] as $frequency)
				@option(['name' => 'recurrence_interval', 'label' => $frequency, 'value' => $loop->iteration, 'selected' => old('recurrence_interval') == $loop->iteration])
			@endforeach
		@endselect
	</div>

	<div class="row"> 
		@input(['placeholder' => 'Starts on', 'name' => 'starts_on', 'type' => 'date', 'value' => old('starts_on'), 'grid' => 'col'])

		@input(['placeholder' => 'Ends on', 'name' => 'ends_on', 'type' => 'date', 'value' => old('ends_on'), 'grid' => 'col'])
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'clock'])TIME</label>

	<div class="row"> 
		@select(['placeholder' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
			@foreach(timeslots(9, 21, 15) as $time)
				@option(['name' => 'start_time', 'label' => \App\Models\LessonPlan::timeLabel($time), 'value' => $time, 'selected' => old('start_time') == $time])
			@endforeach
		@endselect

		@select(['placeholder' => 'Duration', 'name' => 'duration_minutes', 'grid' => 'col', 'required' => true])
			@foreach([30, 45, 60, 90] as $duration)
				@option(['name' => 'duration_minutes', 'label' => $duration . ' min', 'value' => $duration, 'selected' => old('duration_minutes') == $duration])
			@endforeach
		@endselect
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'money-bill-wave'])PAYMENT</label>
	<div class="row"> 
		@input(['placeholder' => 'Fee', 'name' => 'fee_amount', 'value' => old('fee_amount'), 'mask' => 'usd', 'grid' => 'col'])

		@select(['placeholder' => 'Payment method', 'name' => 'payment_method', 'grid' => 'col'])
			@foreach(payment()->methods() as $method)
				@option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => old('payment_method') == $method])
			@endforeach
		@endselect
	</div>

	@textarea(['placeholder' => 'Notes', 'name' => 'notes', 'value' => old('notes'), 'rows' => 3])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
