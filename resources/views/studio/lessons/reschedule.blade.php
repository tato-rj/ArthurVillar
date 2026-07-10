<div id="reschedule-lesson">
	<form method="POST" action="{{route('studio.lesson-plans.reschedule')}}" data-recurring-action="{{route('studio.lesson-plans.reschedule')}}" data-single-action="{{route('studio.single-lesson-plans.reschedule')}}">
		@csrf
		<input type="hidden" name="lesson_plan_id">
		<input type="hidden" name="single_lesson_plan_id">
		<input type="hidden" name="original_date" id="reschedule-lesson-original-date">
		<input type="hidden" name="original_start_time" id="reschedule-lesson-original-start-time">
		<input type="hidden" name="date" id="reschedule-lesson-date">

		<div class="studio-date-picker" data-reschedule-datepicker>
			<div class="studio-date-picker-header">
				<h3 data-reschedule-datepicker-label></h3>
				<div class="studio-date-picker-nav">
					<button type="button" data-reschedule-datepicker-prev aria-label="Previous month">
						@fa(['icon' => 'chevron-left', 'mr' => 0])
					</button>
					<button type="button" data-reschedule-datepicker-next aria-label="Next month">
						@fa(['icon' => 'chevron-right', 'mr' => 0])
					</button>
				</div>
			</div>

			<div class="studio-date-picker-weekdays" aria-hidden="true">
				<span>S</span>
				<span>M</span>
				<span>T</span>
				<span>W</span>
				<span>T</span>
				<span>F</span>
				<span>S</span>
			</div>

			<div class="studio-date-picker-grid" data-reschedule-datepicker-grid></div>
		</div>

		<div class="studio-time-picker">
			<select name="start_time" id="reschedule-lesson-start-time" aria-label="Start time">
				@foreach(\App\Models\LessonPlan::timeOptions() as $value)
					<option value="{{$value}}">{{\App\Models\LessonPlan::timeLabel($value)}}</option>
				@endforeach
			</select>
			<span>to</span>
			<select name="end_time" id="reschedule-lesson-end-time" aria-label="End time">
				@foreach(\App\Models\LessonPlan::timeOptions() as $value)
					<option value="{{$value}}">{{\App\Models\LessonPlan::timeLabel($value)}}</option>
				@endforeach
			</select>
		</div>

		<div class="mb-4">
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
