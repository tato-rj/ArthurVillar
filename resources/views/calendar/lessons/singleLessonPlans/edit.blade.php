@modal(['title' => 'Edit single lesson', 'id' => 'edit-single-lesson-plan-'.$singleLessonPlan->id.'-modal'])
<form method="POST" action="{{route('calendar.single-lesson-plans.update', $singleLessonPlan)}}" data-single-lesson-plan-form>
    @csrf
    @method('PATCH')
    <input type="hidden" name="student_id" value="{{$singleLessonPlan->student_id}}">
    <input type="hidden" name="is_group" value="{{$singleLessonPlan->student_id ? 0 : 1}}">

    @include('calendar.lessons.edit-fields', [
        'student' => $singleLessonPlan->student,
        'location' => $singleLessonPlan->location,
        'dateField' => 'scheduled_date',
        'date' => $singleLessonPlan->scheduled_date?->toDateString(),
        'startTime' => $singleLessonPlan->start_time,
        'durationMinutes' => $singleLessonPlan->duration_minutes,
        'details' => $singleLessonPlan,
        'repeat' => 'none',
    ])

    @submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>
@endmodal
