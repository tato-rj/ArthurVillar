<div class="border rounded p-4 mb-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="h5 mb-0">Confirmed lessons</h3>

    </div>

    @php
        $lessons = $confirmedLessons
            ->concat($unpaidLessons)
            ->concat($canceledLessons)
            ->sortByDesc(fn ($lesson) => ($lesson->scheduled_date ?: $lesson->starts_at)->timestamp);
    @endphp

</div>
