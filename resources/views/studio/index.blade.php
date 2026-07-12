@extends('layouts.app', ['title' => 'Calendar'])

@push('header')
<link href="/css/vendor/calendarjs.css" rel="stylesheet">
<link href="{{ mix('css/studio.css') }}" rel="stylesheet">
<style>
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
@endsection

@push('scripts')
<script>
window.studioPlannedLessons = @json($plannedLessons);
window.studioSingleLessonPlans = @json($singleLessonPlans);
window.studioHolidays = @json($holidays);
window.studioTeachingBreaks = @json($teachingBreaks);
window.studioCalendarRange = @json($calendarRange);
window.studioBirthdayWindow = @json($birthdayWindow);
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
