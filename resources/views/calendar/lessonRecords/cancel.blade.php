<div id="cancel-lesson">
	<form method="POST" action="{{route('calendar.lessons.cancel')}}">
		@csrf
		<input type="hidden" name="lesson_plan_id">
		<input type="hidden" name="single_lesson_plan_id">
		<input type="hidden" name="date">
		<input type="hidden" name="start">
		<input type="hidden" name="end">
		<input type="hidden" name="scheduled_date">
		<input type="hidden" name="scheduled_start_time">
		<input type="hidden" name="schedule_override_id">

		<div class="my-4 bg-light rounded p-3" data-recurring-cancel-fields>
			<p class="mb-1">Who is canceling this lesson?</p>
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="canceled_by" id="canceled_by_radio-1" value="student" checked>
			  <label class="form-check-label" for="canceled_by_radio-1">
			    Student
			  </label>
			</div>
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="canceled_by" id="canceled_by_radio-2" value="teacher">
			  <label class="form-check-label" for="canceled_by_radio-2">
			    Myself
			  </label>
			</div>
		</div>

		<div class="my-4 bg-light rounded p-3" data-recurring-cancel-fields>
			<p class="mb-1">Delete which event?</p>
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="cancelation_type" id="this-event" value="current" checked>
			  <label class="form-check-label" for="this-event">
			    This event only
			  </label>
			</div>

			<div class="form-check">
			  <input class="form-check-input" type="radio" name="cancelation_type" id="this-and-following" value="future">
			  <label class="form-check-label" for="this-and-following">
			    This and all following events
			  </label>
			</div>

			<div class="form-check">
			  <input class="form-check-input" type="radio" name="cancelation_type" id="all-events" value="all">
			  <label class="form-check-label" for="all-events">
			    All events
			  </label>
			</div>
		</div>

		<div class="my-4" data-single-cancel-warning hidden>
			<p class="mb-0 text-red">This action cannot be undone. Are you sure?</p>
		</div>

		<button type="submit" class="btn btn-primary w-100">@fa(['icon' => 'calendar-xmark'])Cancel lesson</button>
	</form>
</div>
