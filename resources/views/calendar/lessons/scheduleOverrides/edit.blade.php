@modal(['title' => 'Edit rescheduled lesson', 'id' => 'edit-rescheduled-lesson-modal'])
<form method="POST" action="{{route('calendar.lesson-plans.rescheduled.update', [$override->lessonPlan, $override->original_date, $override->original_start_time])}}" data-schedule-override-form>
    @csrf
    @method('PATCH')

    @include('calendar.lessons.edit-fields', [
        'student' => $override->lessonPlan->student,
        'dateField' => 'date',
        'date' => $override->new_date,
        'startTime' => $override->new_start_time,
        'durationMinutes' => $override->duration_minutes,
    ])

    @submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>
@endmodal
