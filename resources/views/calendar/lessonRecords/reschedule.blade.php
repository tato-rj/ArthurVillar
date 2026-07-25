<div id="reschedule-lesson">
	<form method="POST" action="{{route('calendar.lesson-plans.reschedule')}}" data-recurring-action="{{route('calendar.lesson-plans.reschedule')}}" data-single-action="{{route('calendar.single-lesson-plans.reschedule')}}">
		@csrf
		<input type="hidden" name="lesson_plan_id">
		<input type="hidden" name="single_lesson_plan_id">
		<input type="hidden" name="original_date" id="reschedule-lesson-original-date">
		<input type="hidden" name="original_start_time" id="reschedule-lesson-original-start-time">
		<input type="hidden" name="date" id="reschedule-lesson-date">

		<div class="calendar-date-picker" data-reschedule-datepicker data-reschedule-date-fields>
			<div class="calendar-date-picker-header">
				<h3 data-reschedule-datepicker-label></h3>
				<div class="calendar-date-picker-nav">
					<button type="button" data-reschedule-datepicker-prev aria-label="Previous month">
						@fa(['icon' => 'chevron-left', 'mr' => 0])
					</button>
					<button type="button" data-reschedule-datepicker-next aria-label="Next month">
						@fa(['icon' => 'chevron-right', 'mr' => 0])
					</button>
				</div>
			</div>

			<div class="calendar-date-picker-weekdays" aria-hidden="true">
				<span>S</span>
				<span>M</span>
				<span>T</span>
				<span>W</span>
				<span>T</span>
				<span>F</span>
				<span>S</span>
			</div>

			<div class="calendar-date-picker-grid" data-reschedule-datepicker-grid></div>
		</div>

		<div class="row" data-reschedule-time-fields>
			@select(['label' => 'Starts at', 'name' => 'start_time', 'id' => 'reschedule-lesson-start-time', 'grid' => 'col', 'required' => true])
				@foreach(\App\Models\Calendar\LessonPlan::timeOptions() as $value)
					@option(['name' => 'start_time', 'label' => \App\Models\Calendar\LessonPlan::timeLabel($value), 'value' => $value])
				@endforeach
			@endselect

			@select(['label' => 'Ends at', 'name' => 'end_time', 'id' => 'reschedule-lesson-end-time', 'grid' => 'col', 'required' => true])
				@foreach(\App\Models\Calendar\LessonPlan::timeOptions() as $value)
					@option(['name' => 'end_time', 'label' => \App\Models\Calendar\LessonPlan::timeLabel($value), 'value' => $value])
				@endforeach
			@endselect
		</div>

		<div class="my-4" data-reschedule-permanence>
			<p class="mb-1">Is this change permanent?</p>
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="is_permanent" id="is_permanent_radio-1" value="0" checked>
			  <label class="form-check-label" for="is_permanent_radio-1">
			    No, only change this lesson
			  </label>
			</div>
			<div class="form-check">
			  <input class="form-check-input" type="radio" name="is_permanent" id="is_permanent_radio-2" value="1">
			  <label class="form-check-label" for="is_permanent_radio-2">
			    Yes, this change is permanent
			  </label>
			</div>
		</div>

		<button type="submit" class="btn btn-primary w-100">@fa(['icon' => 'clock-rotate-left'])Reschedule lesson</button>
	</form>
</div>
