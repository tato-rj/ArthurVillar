<div class="calendar-date-picker calendar-cancel-picker" id="{{$pickerId}}" hidden>
	<div class="calendar-date-picker-header">
		<h3 aria-live="polite" data-cancel-month></h3>
		<div class="calendar-date-picker-nav">
			<button type="button" data-month-offset="-1" aria-label="Previous month">@icon('chevron-left', ['mr' => 0])</button>
			<button type="button" data-month-offset="1" aria-label="Next month">@icon('chevron-right', ['mr' => 0])</button>
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
