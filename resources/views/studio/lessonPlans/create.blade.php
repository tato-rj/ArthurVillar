@modal(['title' => 'New lesson plan', 'id' => 'create-lessonPlan-modal'])
<form method="POST" action="{{route('studio.lesson-plans.store')}}">
	@csrf
	<input type="hidden" name="student_id" value="{{$student->id}}">

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'calendar-day'])SCHEDULE</label>

	@select(['placeholder' => 'Location', 'name' => 'location', 'grid' => 'col', 'required' => true])
		@foreach($locations as $location)
			@option(['name' => 'location', 'label' => $location, 'value' => $location, 'selected' => old('location') == $location])
		@endforeach
	@endselect

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
		@input(['placeholder' => 'Starts on', 'name' => 'starts_on', 'value' => old('starts_on'), 'type' => 'date', 'grid' => 'col', 'required' => true])

		@input(['placeholder' => 'Ends on', 'name' => 'ends_on', 'value' => old('ends_on'), 'type' => 'date', 'grid' => 'col'])
	</div>



	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'clock'])TIME</label>

	<div class="row"> 
		@select(['placeholder' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
			@foreach(timeslots(9, 21, 15) as $time)
				@option(['name' => 'start_time', 'label' => $time, 'value' => $time, 'selected' => old('start_time') == $time])
			@endforeach
		@endselect

		@select(['placeholder' => 'Duration', 'name' => 'duration_minutes', 'grid' => 'col', 'required' => true])
			@foreach([30, 45, 60, 90] as $duration)
				@option(['name' => 'duration_minutes', 'label' => $duration, 'value' => $duration, 'selected' => old('duration_minutes') == $duration])
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

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
