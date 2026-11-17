@modal(['title' => 'Edit lesson record', 'id' => 'edit-lesson-record-'.$lesson->id.'-modal'])
<form method="POST" action="{{route('calendar.lessons.update', $lesson)}}">
    @csrf
    @method('PATCH')

    @include('calendar.lessons.edit-fields', [
        'student' => $lesson->student,
        'dateField' => 'date',
        'date' => $lesson->starts_at->toDateString(),
        'startTime' => $lesson->starts_at->format('H:i'),
        'durationMinutes' => $lesson->starts_at->diffInMinutes($lesson->ends_at),
        'details' => $lesson,
    ])

    <label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'money-bill-wave'])STATUS</label>

    @select(['label' => 'Status', 'name' => 'status', 'required' => true])
        @option(['name' => 'status', 'label' => 'Unpaid', 'value' => 'unpaid', 'selected' => $lesson->paymentStatus() === 'unpaid'])
        @option(['name' => 'status', 'label' => 'Paid', 'value' => 'paid', 'selected' => $lesson->paymentStatus() === 'paid'])
        @option(['name' => 'status', 'label' => 'Canceled', 'value' => 'canceled', 'selected' => $lesson->paymentStatus() === 'canceled'])
    @endselect

    <div class="row">
        @input(['label' => 'Paid at', 'name' => 'paid_at', 'type' => 'datetime-local', 'value' => optional($lesson->paid_at)->format('Y-m-d\TH:i'), 'grid' => 'col'])

        @input(['label' => 'Canceled at', 'name' => 'canceled_at', 'type' => 'datetime-local', 'value' => optional($lesson->canceled_at)->format('Y-m-d\TH:i'), 'grid' => 'col'])

        @select(['label' => 'Canceled by', 'name' => 'canceled_by', 'grid' => 'col'])
            <option value="">—</option>
            @option(['name' => 'canceled_by', 'label' => 'Student', 'value' => 'student', 'selected' => $lesson->canceled_by === 'student'])
            @option(['name' => 'canceled_by', 'label' => 'Teacher', 'value' => 'teacher', 'selected' => $lesson->canceled_by === 'teacher'])
        @endselect
    </div>

    @submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>
@endmodal
