@extends('layouts.app', ['title' => now()->format('M jS')])

@push('header')
<script>document.documentElement.dataset.calendarTheme = @json($selectedAppearanceTheme);</script>
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

#loading-bar {
	height: 2px;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
}

#loading-bar div {
	width: 0%;
	height: 100%;
	background: #4285F4;
}
</style>
@endpush

@section('content')
<div id="loading-bar">
	<div hidden></div>
</div>

<section class="calendar-calendar container-fluid py-3">
	<div class="calendar-calendar-body">
		@include('calendar.calendar.sidebar')
		@include('calendar.calendar.main')
	</div>
</section>

@include('calendar.calendar.event-modal')
@include('calendar.breaks.modal')
@include('calendar.recitals.modal')
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
window.calendarIgnoredConflicts = @json($ignoredConflicts);
window.calendarConflictExceptionsStoreUrl = @json(route('calendar.conflict-exceptions.store'));
window.calendarConflictExceptionsDestroyUrl = @json(route('calendar.conflict-exceptions.destroy'));
window.calendarLessonPlanEditUrlTemplate = @json(route('calendar.lesson-plans.edit', ['lessonPlan' => '__lesson_plan__']));
window.calendarSingleLessonPlanEditUrlTemplate = @json(route('calendar.single-lesson-plans.edit', ['singleLessonPlan' => '__single_lesson_plan__']));
window.calendarCalendarRange = @json($calendarRange);
window.calendarBirthdayWindow = @json($birthdayWindow);
window.calendarShowHolidays = @json($showHolidays);
window.calendarDefaultDesktopCalendarView = @json($defaultDesktopCalendarView);
window.calendarDefaultMobileCalendarView = @json($defaultMobileCalendarView);
window.calendarWeekStartDay = @json(['sunday' => 0, 'monday' => 1, 'saturday' => 6][$selectedCalendarWeekStart] ?? 0);
window.calendarLocations = @json($locations->map(fn ($location) => [
	'id' => $location->id,
	'name' => $location->name,
])->values());
window.calendarHomeLocation = @json($homeLocation);
window.calendarTravelRouteUrl = @json(route('calendar.travel-route.show'));
window.calendarReturnHomeTravelRouteUrl = @json(route('calendar.travel-route.return-home'));
window.calendarTravelRoutesEnabled = @json(filled(config('calendar.google_routes.api_key')));
window.calendarShowTravelTimes = @json($showTravelTimes);
window.calendarCsrfToken = @json(csrf_token());
</script>
<script src="/js/vendor/lemonadejs/lemonade.js"></script>
<script src="/js/vendor/calendarjs/index.js"></script>
<script src="{{ mix('js/calendar/index.js') }}"></script>
@endpush
