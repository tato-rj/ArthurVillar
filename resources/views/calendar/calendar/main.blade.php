<div class="calendar-calendar-main position-relative">
	@include('calendar.calendar.header')

	<div
		id="calendar"
		{{iftrue($addTransparencyToPastEvents, 'data-transparent-past-events')}}
		{{iftrue($highlightConflictingEvents, 'data-highlight-conflicting-events')}}
	></div>
	@include('calendar.calendar.create-lesson-overlay')
</div>

@include('calendar.calendar.views')
@include('calendar.calendar.day-events-modal')
