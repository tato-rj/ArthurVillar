@modal(['title' => 'Edit lesson record', 'id' => 'edit-lesson-record-'.$lesson->id.'-modal'])
<form method="POST" action="{{route('calendar.lessons.update', $lesson)}}">
    @csrf
    @method('PATCH')

    <label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'user'])STUDENT</label>
    <div class="font-weight-bold mb-3">{{$lesson->student->full_name}}</div>

    <label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'calendar-day'])LESSON</label>

    <div class="row">
        @input(['label' => 'Date', 'name' => 'date', 'type' => 'date', 'value' => $lesson->starts_at->format('Y-m-d'), 'grid' => 'col', 'required' => true])

        @input(['label' => 'Start time', 'name' => 'start_time', 'type' => 'time', 'value' => $lesson->starts_at->format('H:i'), 'grid' => 'col', 'required' => true])
    </div>

    <div class="row">
        @input(['label' => 'Duration (minutes)', 'name' => 'duration_minutes', 'type' => 'number', 'value' => $lesson->starts_at->diffInMinutes($lesson->ends_at), 'min' => 1, 'max' => 1440, 'grid' => 'col', 'required' => true])

        @input(['label' => 'Fee', 'name' => 'fee_amount', 'type' => 'number', 'value' => $lesson->fee_amount !== null ? ($lesson->fee_amount / 100) : null, 'min' => 0, 'step' => '0.01', 'grid' => 'col', 'disabled' => $lesson->student->payment_exempt])
    </div>

    <label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'money-bill-wave'])STATUS</label>

    @select(['label' => 'Status', 'name' => 'status', 'required' => true])
        @option(['name' => 'status', 'label' => 'Unpaid', 'value' => 'unpaid', 'selected' => $lesson->paymentStatus() === 'unpaid'])
        @option(['name' => 'status', 'label' => 'Paid', 'value' => 'paid', 'selected' => $lesson->paymentStatus() === 'paid'])
        @option(['name' => 'status', 'label' => 'Canceled', 'value' => 'canceled', 'selected' => $lesson->paymentStatus() === 'canceled'])
    @endselect

    <div class="row">
        @input(['label' => 'Paid at', 'name' => 'paid_at', 'type' => 'datetime-local', 'value' => optional($lesson->paid_at)->format('Y-m-d\TH:i'), 'grid' => 'col'])

        @select(['label' => 'Payment method', 'name' => 'payment_method', 'grid' => 'col'])
            <option value="">—</option>
            @foreach(payment()->methods() as $method)
                @option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => $lesson->payment_method === $method])
            @endforeach
        @endselect
    </div>

    <div class="row">
        @input(['label' => 'Canceled at', 'name' => 'canceled_at', 'type' => 'datetime-local', 'value' => optional($lesson->canceled_at)->format('Y-m-d\TH:i'), 'grid' => 'col'])

        @select(['label' => 'Canceled by', 'name' => 'canceled_by', 'grid' => 'col'])
            <option value="">—</option>
            @option(['name' => 'canceled_by', 'label' => 'Student', 'value' => 'student', 'selected' => $lesson->canceled_by === 'student'])
            @option(['name' => 'canceled_by', 'label' => 'Teacher', 'value' => 'teacher', 'selected' => $lesson->canceled_by === 'teacher'])
        @endselect
    </div>

    @textarea(['label' => 'Notes', 'name' => 'notes', 'value' => $lesson->notes, 'rows' => 3])

    @submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>
@endmodal
