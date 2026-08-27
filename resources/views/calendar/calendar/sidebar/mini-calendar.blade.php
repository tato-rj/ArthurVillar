	<div class="calendar-mini-calendar" data-mini-calendar>
		<div class="calendar-mini-calendar-header">
			<button type="button" class="calendar-mini-calendar-nav" data-mini-prev aria-label="Previous month">
				<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
			</button>
			<h2 data-mini-label role="button" tabindex="0" title="Open month view"></h2>
			<button type="button" class="calendar-mini-calendar-nav" data-mini-next aria-label="Next month">
				<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
			</button>
		</div>

		<div class="calendar-mini-calendar-weekdays" aria-hidden="true">
			@foreach($calendarWeekdayInitials as $weekdayInitial)
				<span>{{$weekdayInitial}}</span>
			@endforeach
		</div>

		<div class="calendar-mini-calendar-grid" data-mini-grid></div>
	</div>
