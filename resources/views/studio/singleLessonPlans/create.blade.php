<div class="studio-calendar-create-menu" data-calendar-create-menu>
	<button type="button" class="studio-calendar-create-menu-option" data-calendar-create-single>
		@fa(['icon' => 'calendar-day', 'mr' => 2])
		Single Lesson
	</button>

	<button type="button" class="studio-calendar-create-menu-option" data-calendar-create-recurring>
		@fa(['icon' => 'repeat', 'mr' => 2])
		Recurring Lesson
	</button>
</div>

<button type="button" class="btn-raw single-lesson-plan-create" data-calendar-create-toggle aria-label="Create lesson">
	@fa(['icon' => 'plus', 'mr' => 0])
</button>

@modal(['title' => 'Add a lesson', 'id' => 'create-single-lesson-plan-modal'])
@php
	$oldStudentId = old('student_id');
	$selectedStudent = isset($students)
		? $students->first(fn ($student) => (string) $student->id === (string) $oldStudentId)
		: null;
	$selectedStudentName = $selectedStudent
		? trim($selectedStudent->first_name . ' ' . $selectedStudent->last_name)
		: '';
@endphp

<form method="POST" action="{{route('studio.single-lesson-plans.store')}}" data-single-lesson-plan-form data-student-fee-amount="{{$selectedStudent ? $selectedStudent->feeAmountForInput() : ''}}">
	@csrf

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
						data-student-fee-amount="{{$student->feeAmountForInput()}}"
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

	@select(['placeholder' => 'Location', 'name' => 'location_id', 'required' => true])
		@foreach($locations as $location)
			@option(['name' => 'location_id', 'label' => $location->name, 'value' => $location->id, 'selected' => old('location_id', optional($selectedStudent)->location_id) == $location->id, 'data' => ['fee-amount' => $location->feeAmountForInput(), 'is-online' => strtolower($location->name) === 'online' ? 1 : 0]])
		@endforeach
	@endselect

	<div class="single-lesson-plan-online-field">
		@input(['placeholder' => 'Meeting URL', 'name' => 'meeting_url', 'type' => 'url', 'value' => old('meeting_url')])
	</div>

	<div class="single-lesson-plan-online-field">
		@input(['placeholder' => 'Notes URL', 'name' => 'notes_url', 'type' => 'url', 'value' => old('notes_url')])
	</div>

	<div class="row">
		@input(['placeholder' => 'Date', 'name' => 'scheduled_date', 'type' => 'date', 'value' => old('scheduled_date', today()->toDateString()), 'grid' => 'col', 'required' => true])
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'clock'])TIME</label>

	<div class="row">
		@select(['placeholder' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
			@foreach(timeslots(8, 21, 15) as $time)
				@option(['name' => 'start_time', 'label' => \App\Models\LessonPlan::timeLabel($time), 'value' => $time, 'selected' => old('start_time') == $time])
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
		@input(['placeholder' => 'Fee', 'name' => 'fee_amount', 'value' => old('fee_amount', $selectedStudent ? $selectedStudent->feeAmountForInput() : null), 'mask' => 'usd', 'grid' => 'col'])

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
