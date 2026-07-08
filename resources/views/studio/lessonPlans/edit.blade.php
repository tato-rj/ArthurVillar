@modal(['title' => 'Edit lesson plan', 'id' => 'edit-lessonPlan-'.$lessonPlan->id.'-modal'])
<form method="POST" action="{{route('studio.lesson-plans.update', $lessonPlan)}}">
	@csrf
	@method('PATCH')
	<input type="hidden" name="student_id" value="{{$lessonPlan->student_id}}">

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'calendar-day'])SCHEDULE</label>
	
	@select(['placeholder' => 'Location', 'name' => 'location_id', 'grid' => 'col', 'required' => true])
		@foreach($locations as $location)
			@option(['name' => 'location_id', 'label' => $location->name, 'value' => $location->id, 'selected' => $lessonPlan->location_id == $location->id, 'data' => ['fee-amount' => $location->feeAmountForInput()]])
		@endforeach
	@endselect

	<div class="row">
		@select(['label' => 'Weekday', 'name' => 'weekday', 'grid' => 'col'])
			@foreach(weekday() as $day)
				@option(['name' => 'weekday', 'label' => ucfirst($day), 'value' => $loop->iteration, 'selected' => $lessonPlan->weekday == $loop->iteration])
			@endforeach
		@endselect

		@select(['label' => 'Frequency', 'name' => 'recurrence_interval', 'grid' => 'col'])
			@foreach(['Every week', 'Every other week'] as $frequency)
				@option(['name' => 'recurrence_interval', 'label' => $frequency, 'value' => $loop->iteration, 'selected' => $lessonPlan->recurrence_interval == $loop->iteration])
			@endforeach
		@endselect
	</div>

	<div class="row">
		@input(['label' => 'Starts on', 'name' => 'starts_on', 'type' => 'date', 'value' => optional($lessonPlan->starts_on)->format('Y-m-d'), 'grid' => 'col'])

		@input(['label' => 'Ends on', 'name' => 'ends_on', 'type' => 'date', 'value' => optional($lessonPlan->ends_on)->format('Y-m-d'), 'grid' => 'col'])
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'clock'])TIME</label>

	<div class="row">
		@select(['label' => 'Start time', 'name' => 'start_time', 'grid' => 'col'])
			@foreach(timeslots(9, 21, 15) as $time)
				@option(['name' => 'start_time', 'label' => \App\Models\LessonPlan::timeLabel($time), 'value' => $time, 'selected' => $lessonPlan->start_time == $time])
			@endforeach
		@endselect

		@select(['label' => 'Duration', 'name' => 'duration_minutes', 'grid' => 'col'])
			@foreach([30, 45, 60, 90] as $duration)
				@option(['name' => 'duration_minutes', 'label' => $duration, 'value' => $duration, 'selected' => $lessonPlan->duration_minutes == $duration])
			@endforeach
		@endselect
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'money-bill-wave'])PAYMENT</label>

	<div class="row">
		@input(['label' => 'Fee', 'name' => 'fee_amount', 'value' => $lessonPlan->fee_amount ? ($lessonPlan->fee_amount / 100) : null, 'mask' => 'usd', 'grid' => 'col'])

		@select(['label' => 'Payment method', 'name' => 'payment_method', 'grid' => 'col'])
			@foreach(payment()->methods() as $method)
				@option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => $lessonPlan->payment_method == $method])
			@endforeach
		@endselect
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
