@modal(['title' => 'Edit rescheduled lesson', 'id' => 'edit-rescheduled-lesson-modal'])
@php($isOnline = strtolower($location?->name ?? '') === 'online')
@php($paymentExempt = (bool) $override->lessonPlan->student?->payment_exempt)
<form method="POST" action="{{route('calendar.lesson-plans.rescheduled.update', [$override->lessonPlan, $override->original_date, $override->original_start_time])}}" data-schedule-override-form>
    @csrf
    @method('PATCH')

    <div class="font-weight-bold mb-3">{{$override->lessonPlan->student?->full_name ?? 'Group class'}}</div>

    <div class="row">
        @input(['label' => 'Date', 'name' => 'date', 'type' => 'date', 'value' => $override->new_date, 'grid' => 'col', 'required' => true])
    </div>

    <div class="row">
        @select(['label' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
            @foreach(\App\Models\Calendar\LessonPlan::timeOptions() as $time)
                @option(['name' => 'start_time', 'label' => \App\Models\Calendar\LessonPlan::timeLabel($time), 'value' => $time, 'selected' => $override->new_start_time === $time])
            @endforeach
        @endselect

        @input(['label' => 'Duration (minutes)', 'name' => 'duration_minutes', 'type' => 'number', 'value' => $override->duration_minutes, 'min' => 15, 'max' => 960, 'step' => 15, 'grid' => 'col', 'required' => true])
    </div>

    @select(['label' => 'Location', 'name' => 'location_id', 'required' => true])
        @foreach($locations as $option)
            @option(['name' => 'location_id', 'label' => $option->name, 'value' => $option->id, 'selected' => $location?->id === $option->id, 'data' => ['is-online' => strtolower($option->name) === 'online' ? 1 : 0]])
        @endforeach
    @endselect

    @select(['label' => 'Directions', 'name' => 'travel_mode', 'required' => true])
        @foreach(['NONE' => 'No directions', 'TRANSIT' => 'Public transit', 'WALK' => 'Walking', 'DRIVE' => 'Driving'] as $mode => $label)
            @option(['name' => 'travel_mode', 'label' => $label, 'value' => $mode, 'selected' => ($details['travel_mode'] ?: 'TRANSIT') === $mode])
        @endforeach
    @endselect

    <div class="lesson-plan-online-field" @unless($isOnline) style="display: none;" @endunless>
        @input(['label' => 'Meeting URL', 'name' => 'meeting_url', 'type' => 'url', 'value' => $details['meeting_url'], 'disabled' => ! $isOnline])
    </div>

    <div class="lesson-plan-online-field" @unless($isOnline) style="display: none;" @endunless>
        @input(['label' => 'Notes URL', 'name' => 'notes_url', 'type' => 'url', 'value' => $details['notes_url'], 'disabled' => ! $isOnline])
    </div>

    @unless($paymentExempt)
        <div class="row">
            @input(['label' => 'Fee', 'name' => 'fee_amount', 'type' => 'number', 'value' => $details['fee_amount'] !== null ? $details['fee_amount'] / 100 : null, 'min' => 0, 'max' => '9999.99', 'step' => '0.01', 'grid' => 'col'])

            @select(['label' => 'Payment method', 'name' => 'payment_method', 'grid' => 'col'])
                <option value=""></option>
                @foreach(payment()->methods() as $method)
                    @option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => $details['payment_method'] === $method])
                @endforeach
            @endselect
        </div>
    @endunless

    @textarea(['label' => 'Notes', 'name' => 'notes', 'value' => $details['notes'], 'rows' => 3])

    @submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>
@endmodal
