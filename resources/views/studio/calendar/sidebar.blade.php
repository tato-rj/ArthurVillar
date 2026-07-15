<aside class="studio-calendar-sidebar" aria-label="Calendar sidebar">
	@include('studio.calendar.sidebar.mini-calendar')
	@if($showNearbyBirthdays || $showCalendarInsights)
		@include('studio.calendar.sidebar.insights')
	@endif
</aside>
