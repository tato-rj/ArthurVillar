@extends('layouts.app', ['title' => 'Calendar'])

@push('header')
<link href="/css/vendor/calendarjs.css" rel="stylesheet">
<link href="{{ mix('css/studio.css') }}" rel="stylesheet">
<style>
:root {
    --studio-unconfirmed-lesson-color: {{$unconfirmedLessonColor}};
    --studio-unpaid-lesson-color: {{$unpaidLessonColor}};
    --studio-paid-lesson-color: {{$paidLessonColor}};
    --studio-canceled-lesson-color: {{$canceledLessonColor}};
    --studio-general-event-color: {{$generalEventColor}};
}

.studio-calendar-main {
    margin-right: 50px;
}

</style>
@endpush

@section('content')
<section class="studio-calendar container-fluid py-3">
	<div class="studio-calendar-body">
		@include('studio.calendar.sidebar')
		@include('studio.calendar.main')
	</div>
</section>

@include('studio.lessons.modal')
@include('studio.breaks.modal')
@include('studio.recitals.modal')
@include('studio.events.modal')
<div id="calendar-edit-modal-container"></div>
@endsection

@push('scripts')
<script>
window.studioPlannedLessons = @json($plannedLessons);
window.studioSingleLessonPlans = @json($singleLessonPlans);
window.studioHolidays = @json($holidays);
window.studioTeachingBreaks = @json($teachingBreaks);
window.studioRecitals = @json($recitals);
window.studioGeneralEvents = @json($generalEvents);
window.studioLessonPlanEditUrlTemplate = @json(route('studio.lesson-plans.edit', ['lessonPlan' => '__lesson_plan__']));
window.studioSingleLessonPlanEditUrlTemplate = @json(route('studio.single-lesson-plans.edit', ['singleLessonPlan' => '__single_lesson_plan__']));
window.studioCalendarRange = @json($calendarRange);
window.studioBirthdayWindow = @json($birthdayWindow);
window.studioShowHolidays = @json($showHolidays);
window.studioDefaultDesktopCalendarView = @json($defaultDesktopCalendarView);
window.studioDefaultMobileCalendarView = @json($defaultMobileCalendarView);
window.studioLocations = @json($locations->map(fn ($location) => [
	'id' => $location->id,
	'name' => $location->name,
])->values());
window.studioCsrfToken = @json(csrf_token());
</script>
<script src="/js/vendor/lemonadejs/lemonade.js"></script>
<script src="/js/vendor/calendarjs/index.js"></script>
<script src="{{ mix('js/studio/index.js') }}"></script>
@endpush
