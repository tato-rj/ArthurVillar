@modal(['title' => 'Edit lesson plan', 'id' => 'edit-lessonPlan-'.$lessonPlan->id.'-modal'])
<form method="POST" action="{{route('calendar.lesson-plans.update', $lessonPlan)}}" data-lesson-plan-form>
    @csrf
    @method('PATCH')
    <input type="hidden" name="student_id" value="{{$lessonPlan->student_id}}">
    <input type="hidden" name="is_group" value="{{$lessonPlan->student_id ? 0 : 1}}">

    @include('calendar.lessons.edit-fields', [
        'student' => $lessonPlan->student,
        'location' => $lessonPlan->location,
        'dateField' => 'starts_on',
        'date' => $lessonPlan->starts_on?->toDateString(),
        'dateRequired' => false,
        'startTime' => $lessonPlan->start_time,
        'durationMinutes' => $lessonPlan->duration_minutes,
        'details' => $lessonPlan,
        'repeat' => $lessonPlan->recurrence_interval,
        'endsOn' => $lessonPlan->ends_on?->toDateString(),
    ])

    @submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>
@endmodal
