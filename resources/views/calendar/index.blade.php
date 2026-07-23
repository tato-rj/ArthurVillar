@extends('layouts.app', ['title' => 'Studio'])

@push('header')
<link href="/css/vendor/calendarjs.css" rel="stylesheet">
<link href="{{ mix('css/calendar.css') }}" rel="stylesheet">
<style>
:root {
    --calendar-unconfirmed-lesson-color: {{$unconfirmedLessonColor}};
    --calendar-unpaid-lesson-color: {{$unpaidLessonColor}};
    --calendar-paid-lesson-color: {{$paidLessonColor}};
    --calendar-canceled-lesson-color: {{$canceledLessonColor}};
    --calendar-general-event-color: {{$generalEventColor}};
    --calendar-google-event-color: {{$googleEventColor}};
}

.calendar-calendar-main {
    margin-right: 50px;
}

</style>
@endpush

@section('content')
<section class="calendar-calendar container-fluid py-3">
	<div class="calendar-calendar-body">
		@include('calendar.calendar.sidebar')
		@include('calendar.calendar.main')
	</div>
</section>

@include('calendar.lessons.modal')
@include('calendar.breaks.modal')
@include('calendar.recitals.modal')
@include('calendar.events.modal')
<div id="calendar-edit-modal-container"></div>
@endsection

@push('scripts')
<script>
window.calendarPlannedLessons = @json($plannedLessons);
window.calendarSingleLessonPlans = @json($singleLessonPlans);
window.calendarHolidays = @json($holidays);
window.calendarTeachingBreaks = @json($teachingBreaks);
window.calendarRecitals = @json($recitals);
window.calendarGeneralEvents = @json($generalEvents);
window.calendarLessonPlanEditUrlTemplate = @json(route('calendar.lesson-plans.edit', ['lessonPlan' => '__lesson_plan__']));
window.calendarSingleLessonPlanEditUrlTemplate = @json(route('calendar.single-lesson-plans.edit', ['singleLessonPlan' => '__single_lesson_plan__']));
window.calendarCalendarRange = @json($calendarRange);
window.calendarBirthdayWindow = @json($birthdayWindow);
window.calendarShowHolidays = @json($showHolidays);
window.calendarDefaultDesktopCalendarView = @json($defaultDesktopCalendarView);
window.calendarDefaultMobileCalendarView = @json($defaultMobileCalendarView);
window.calendarLocations = @json($locations->map(fn ($location) => [
	'id' => $location->id,
	'name' => $location->name,
])->values());
window.calendarCsrfToken = @json(csrf_token());
</script>
<script src="/js/vendor/lemonadejs/lemonade.js"></script>
<script src="/js/vendor/calendarjs/index.js"></script>
<script src="{{ mix('js/calendar/index.js') }}"></script>
@endpush
