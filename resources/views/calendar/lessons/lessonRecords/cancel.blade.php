<div id="cancel-lesson">
	<form method="POST" action="{{route('calendar.lessons.cancel')}}" data-occurrences-url="{{route('calendar.lesson-plans.cancelable-occurrences', '__plan__')}}" data-today="{{now(config('calendar.timezone'))->toDateString()}}">
		@csrf
		<input type="hidden" name="lesson_plan_id">
		<input type="hidden" name="single_lesson_plan_id">
		<input type="hidden" name="date">
		<input type="hidden" name="start">
		<input type="hidden" name="end">
		<input type="hidden" name="scheduled_date">
		<input type="hidden" name="scheduled_start_time">
		<input type="hidden" name="schedule_override_id">

		<fieldset data-cancel-controls>
			<div class="my-4 bg-light rounded p-3" data-recurring-cancel-fields data-cancel-reason>
				<p class="mb-1">Who is canceling?</p>
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
				<p class="mb-1">Which events do you want to change?</p>
				<div class="form-check">
				  <input class="form-check-input" type="radio" name="cancelation_type" id="this-event" value="current" checked>
				  <label class="form-check-label" for="this-event">
				    This event only
				  </label>
				</div>

				<div class="form-check">
				  <input class="form-check-input" type="radio" name="cancelation_type" id="multiple-events" value="multiple" aria-controls="multiple-event-picker">
				  <label class="form-check-label" for="multiple-events">Multiple events</label>
				</div>

				<div class="calendar-date-picker calendar-cancel-picker" id="multiple-event-picker" hidden>
					<p class="small mb-0">Uncheck a lesson to cancel it. Check a canceled lesson to restore it. Purple marks the lesson you opened.</p>
					<div class="calendar-date-picker-header">
						<h3 aria-live="polite" data-cancel-month></h3>
						<div class="calendar-date-picker-nav">
							<button type="button" data-month-offset="-1" aria-label="Previous month">@fa(['icon' => 'chevron-left', 'mr' => 0])</button>
							<button type="button" data-month-offset="1" aria-label="Next month">@fa(['icon' => 'chevron-right', 'mr' => 0])</button>
						</div>
					</div>
					<div class="calendar-date-picker-weekdays" aria-hidden="true">
						@foreach($calendarWeekdayInitials as $weekdayInitial)
							<span>{{$weekdayInitial}}</span>
						@endforeach
					</div>
					<div class="calendar-date-picker-grid" data-cancel-grid></div>
					<p class="small mb-0" role="status" data-cancel-status></p>
					<button type="button" class="btn btn-link p-0" data-cancel-retry hidden>Retry loading dates</button>
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
		</fieldset>

		<button type="submit" class="btn btn-primary w-100"><span data-cancel-single-label>@fa(['icon' => 'calendar-xmark'])Cancel lesson</span><span data-cancel-multiple-label>@fa(['icon' => 'check'])Save changes</span></button>
	</form>
</div>
