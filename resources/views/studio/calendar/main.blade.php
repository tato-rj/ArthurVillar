<div class="studio-calendar-main position-relative">
	@include('studio.calendar.header')

	<div id="calendar"></div>

	@include('studio.singleLessonPlans.create')
	@include('studio.lessonPlans.calendar-create')
</div>

@include('studio.calendar.views')
@include('studio.calendar.day-events-modal')
