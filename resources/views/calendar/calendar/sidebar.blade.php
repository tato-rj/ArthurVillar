<aside class="calendar-calendar-sidebar" aria-label="Calendar sidebar">
	@include('calendar.calendar.sidebar.mini-calendar')
	@if($showCalendarInsights)
		@include('calendar.calendar.sidebar.insights')
	@endif
</aside>
