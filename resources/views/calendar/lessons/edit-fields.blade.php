@php
    $repeat = isset($repeat) ? (string) old('repeat', $repeat) : null;
    $locationId = old('location_id', ($location ?? null)?->id);
    $isOnline = strtolower(($locations ?? collect())->firstWhere('id', $locationId)?->name ?? '') === 'online';
    $paymentExempt = (bool) $student?->payment_exempt;
    $durationMinutes = (int) $durationMinutes;
    $timeOptions = \App\Models\Calendar\LessonPlan::timeOptions();
    $durationOptions = \App\Models\Calendar\LessonPlan::durationOptions();

    if ($startTime && ! in_array($startTime, $timeOptions, true)) {
        $timeOptions[] = $startTime;
        sort($timeOptions);
    }

    if ($durationMinutes && ! in_array($durationMinutes, $durationOptions, true)) {
        $durationOptions[] = $durationMinutes;
        sort($durationOptions);
    }
@endphp

@include('calendar.components.sectiontitle', ['icon' => 'user', 'label' => 'STUDENT'])
<div class="font-weight-bold mb-3">{{$student?->full_name ?? 'Group class'}}</div>

@include('calendar.components.sectiontitle', ['icon' => 'calendar-1', 'label' => 'SCHEDULE'])

@isset($locations)
    @select(['placeholder' => 'Location', 'name' => 'location_id', 'required' => true])
        @foreach($locations as $option)
            @option(['name' => 'location_id', 'label' => $option->name, 'value' => $option->id, 'selected' => $locationId == $option->id, 'data' => ['fee-amount' => $option->feeAmountForInput(), 'is-online' => strtolower($option->name) === 'online' ? 1 : 0]])
        @endforeach
    @endselect

    @select(['label' => 'Directions', 'name' => 'travel_mode', 'required' => true])
        @foreach(\App\Models\Calendar\Event::travelModeOptions() as $mode => $label)
            @option(['name' => 'travel_mode', 'label' => $label, 'value' => $mode, 'selected' => old('travel_mode', ($details['travel_mode'] ?? null) ?: 'TRANSIT') === $mode])
        @endforeach
    @endselect

    <div class="lesson-plan-online-field" @unless($isOnline) style="display: none;" @endunless>
        @input(['label' => 'Meeting URL', 'name' => 'meeting_url', 'type' => 'url', 'value' => $details['meeting_url'], 'disabled' => ! $isOnline])
    </div>

    <div class="lesson-plan-online-field" @unless($isOnline) style="display: none;" @endunless>
        @input(['label' => 'Notes URL', 'name' => 'notes_url', 'type' => 'url', 'value' => $details['notes_url'], 'disabled' => ! $isOnline])
    </div>
@endisset

<div class="row">
    @input(['label' => 'Date', 'name' => $dateField, 'type' => 'date', 'value' => $date, 'grid' => 'col', 'required' => $dateRequired ?? true])
</div>

@if($repeat !== null)
    <div class="row">
        @select(['label' => 'Repeat', 'name' => 'repeat', 'grid' => 'col', 'required' => true])
            @option(['name' => 'repeat', 'label' => 'Does not repeat', 'value' => 'none', 'selected' => $repeat === 'none'])
            @option(['name' => 'repeat', 'label' => 'Every week', 'value' => 1, 'selected' => $repeat === '1'])
            @option(['name' => 'repeat', 'label' => 'Every other week', 'value' => 2, 'selected' => $repeat === '2'])
        @endselect
    </div>

    <div data-lesson-repeat-end @if($repeat === 'none') style="display: none;" @endif>
        @input(['label' => 'Ends on', 'name' => 'ends_on', 'type' => 'date', 'value' => $endsOn ?? null, 'required' => $repeat !== 'none', 'disabled' => $repeat === 'none'])
    </div>
@endif

@include('calendar.components.sectiontitle', ['icon' => 'clock', 'label' => 'TIME'])

<div class="row">
    @select(['label' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
        @foreach($timeOptions as $time)
            @option(['name' => 'start_time', 'label' => \App\Models\Calendar\LessonPlan::timeLabel($time), 'value' => $time, 'selected' => old('start_time', $startTime) === $time])
        @endforeach
    @endselect

    @select(['label' => 'Duration', 'name' => 'duration_minutes', 'grid' => 'col', 'required' => true])
        @foreach($durationOptions as $duration)
            @option(['name' => 'duration_minutes', 'label' => $duration . ' min', 'value' => $duration, 'selected' => (int) old('duration_minutes', $durationMinutes) === $duration])
        @endforeach
    @endselect
</div>

<div data-lesson-payment-section {{iftrue($paymentExempt, 'hidden')}}>
    @include('calendar.components.sectiontitle', ['icon' => 'banknote', 'label' => 'PAYMENT'])

    <div class="row">
        @input(['label' => 'Fee', 'name' => 'fee_amount', 'type' => 'number', 'value' => $details['fee_amount'] !== null ? $details['fee_amount'] / 100 : null, 'min' => 0, 'max' => '9999.99', 'step' => '0.01', 'grid' => 'col', 'disabled' => $paymentExempt])

        @select(['label' => 'Payment method', 'name' => 'payment_method', 'grid' => 'col', 'disabled' => $paymentExempt])
            <option value=""></option>
            @foreach(payment()->methods() as $method)
                @option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => $details['payment_method'] === $method])
            @endforeach
        @endselect
    </div>
</div>

@textarea(['label' => 'Notes', 'name' => 'notes', 'value' => $details['notes'], 'rows' => 3])
