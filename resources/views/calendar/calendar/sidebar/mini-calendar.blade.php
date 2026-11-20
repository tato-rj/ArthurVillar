	<div class="calendar-mini-calendar" data-mini-calendar>
		<div class="calendar-mini-calendar-header">
			<button type="button" class="calendar-mini-calendar-nav" data-mini-prev aria-label="Previous month">
				@icon('chevron-left', ['mr' => 0])
			</button>
			<h2 data-mini-label role="button" tabindex="0" title="Open month view"></h2>
			<button type="button" class="calendar-mini-calendar-nav" data-mini-next aria-label="Next month">
				@icon('chevron-right', ['mr' => 0])
			</button>
		</div>

		<div class="calendar-mini-calendar-weekdays" aria-hidden="true">
			@foreach($calendarWeekdayInitials as $weekdayInitial)
				<span>{{$weekdayInitial}}</span>
			@endforeach
		</div>

		<div class="calendar-mini-calendar-grid" data-mini-grid></div>
	</div>
