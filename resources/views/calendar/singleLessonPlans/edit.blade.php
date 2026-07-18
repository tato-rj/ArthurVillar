@modal(['title' => 'Edit single lesson', 'id' => 'edit-single-lesson-plan-'.$singleLessonPlan->id.'-modal'])
@php($singleLessonPlanIsOnline = optional($singleLessonPlan->location)->name && strtolower($singleLessonPlan->location->name) === 'online')
<form method="POST" action="{{route('calendar.single-lesson-plans.update', $singleLessonPlan)}}" data-single-lesson-plan-form>
	@csrf
	@method('PATCH')
	<input type="hidden" name="student_id" value="{{$singleLessonPlan->student_id}}">

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'user'])STUDENT</label>
	<div class="font-weight-bold mb-3">{{$singleLessonPlan->student->full_name}}</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'calendar-day'])SCHEDULE</label>

	@select(['placeholder' => 'Location', 'name' => 'location_id', 'required' => true])
		@foreach($locations as $location)
			@option(['name' => 'location_id', 'label' => $location->name, 'value' => $location->id, 'selected' => $singleLessonPlan->location_id == $location->id, 'data' => ['fee-amount' => $location->feeAmountForInput(), 'is-online' => strtolower($location->name) === 'online' ? 1 : 0]])
		@endforeach
	@endselect

	<div class="single-lesson-plan-online-field" @unless($singleLessonPlanIsOnline) style="display: none;" @endunless>
		@input(['label' => 'Meeting URL', 'name' => 'meeting_url', 'type' => 'url', 'value' => $singleLessonPlan->meeting_url, 'disabled' => ! $singleLessonPlanIsOnline])
	</div>

	<div class="single-lesson-plan-online-field" @unless($singleLessonPlanIsOnline) style="display: none;" @endunless>
		@input(['label' => 'Notes URL', 'name' => 'notes_url', 'type' => 'url', 'value' => $singleLessonPlan->notes_url, 'disabled' => ! $singleLessonPlanIsOnline])
	</div>

	<div class="row">
		@input(['label' => 'Date', 'name' => 'scheduled_date', 'type' => 'date', 'value' => optional($singleLessonPlan->scheduled_date)->format('Y-m-d'), 'grid' => 'col', 'required' => true])
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'clock'])TIME</label>

	<div class="row">
		@select(['label' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
			@foreach(timeslots(8, 21, 15) as $time)
				@option(['name' => 'start_time', 'label' => \App\Models\Calendar\LessonPlan::timeLabel($time), 'value' => $time, 'selected' => $singleLessonPlan->start_time == $time])
			@endforeach
		@endselect

		@select(['label' => 'Duration', 'name' => 'duration_minutes', 'grid' => 'col', 'required' => true])
			@foreach([30, 45, 60, 90] as $duration)
				@option(['name' => 'duration_minutes', 'label' => $duration . ' min', 'value' => $duration, 'selected' => $singleLessonPlan->duration_minutes == $duration])
			@endforeach
		@endselect
	</div>

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'money-bill-wave'])PAYMENT</label>

	<div class="row">
		@input(['label' => 'Fee', 'name' => 'fee_amount', 'value' => $singleLessonPlan->fee_amount ? ($singleLessonPlan->fee_amount / 100) : null, 'mask' => 'usd', 'grid' => 'col'])

		@select(['label' => 'Payment method', 'name' => 'payment_method', 'grid' => 'col'])
			@foreach(payment()->methods() as $method)
				@option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => $singleLessonPlan->payment_method == $method])
			@endforeach
		@endselect
	</div>

	@textarea(['label' => 'Notes', 'name' => 'notes', 'value' => $singleLessonPlan->notes, 'rows' => 3])

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
