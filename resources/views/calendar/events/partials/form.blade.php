@php
    $eventLocationType = old('location_type', isset($event) && $event->is_online ? 'online' : 'in_person');
    $eventUsesGoogleCalendar = !empty($showGoogleCalendarImport) && $eventLocationType === 'google_calendar';
    $eventIsOnline = $eventLocationType === 'online';
@endphp

<div data-event-location-fields>
    <input type="hidden" name="location_type" value="{{$eventUsesGoogleCalendar ? 'google_calendar' : ($eventIsOnline ? 'online' : 'in_person')}}" data-event-location-type>

    <div class="d-center">
        <div class="btn-group mb-2" role="group" aria-label="Event location">
            <button
                type="button"
                class="btn {{$eventIsOnline || $eventUsesGoogleCalendar ? 'btn-white' : 'btn-secondary'}} btn-sm btn-wide"
                data-event-location-option="in_person"
                aria-pressed="{{$eventIsOnline || $eventUsesGoogleCalendar ? 'false' : 'true'}}">
                In person
            </button>
            <button
                type="button"
                class="btn {{$eventIsOnline ? 'btn-secondary' : 'btn-white'}} btn-sm btn-wide"
                data-event-location-option="online"
                aria-pressed="{{$eventIsOnline ? 'true' : 'false'}}">
                Online
            </button>
            @if(!empty($showGoogleCalendarImport))
            <button
                type="button"
                class="btn {{$eventUsesGoogleCalendar ? 'btn-secondary' : 'btn-white'}} btn-sm btn-wide"
                data-event-location-option="google_calendar"
                aria-pressed="{{$eventUsesGoogleCalendar ? 'true' : 'false'}}">
                Google Calendar
            </button>
            @endif
        </div>
    </div>

<fieldset data-event-standard-fields {{iftrue($eventUsesGoogleCalendar, 'hidden disabled')}}>
@input([
    'label' => 'Name',
    'name' => 'name',
    'required' => true,
    'value' => $event->name ?? old('name'),
])

@input([
    'label' => 'Date',
    'name' => 'scheduled_date',
    'type' => 'date',
    'required' => true,
    'value' => isset($event) && $event->scheduled_date ? $event->scheduled_date->toDateString() : old('scheduled_date'),
])

<div class="row" data-general-event-time-fields>
    @select(['label' => 'Starts at', 'name' => 'starts_at', 'grid' => 'col', 'required' => true])
        <option value=""></option>
        @foreach(\App\Models\Calendar\Event::timeOptions() as $time)
            @option(['name' => 'starts_at', 'label' => \App\Models\Calendar\Event::timeLabel($time), 'value' => $time, 'selected' => isset($event) && substr($event->starts_at, 0, 5) === $time])
        @endforeach
    @endselect

    @select(['label' => 'Ends at', 'name' => 'ends_at', 'grid' => 'col', 'required' => true])
        <option value=""></option>
        @foreach(\App\Models\Calendar\Event::timeOptions() as $time)
            @option(['name' => 'ends_at', 'label' => \App\Models\Calendar\Event::timeLabel($time), 'value' => $time, 'selected' => isset($event) && substr($event->ends_at, 0, 5) === $time])
        @endforeach
    @endselect
</div>
</fieldset>

<fieldset data-event-in-person-fields {{iftrue($eventIsOnline || $eventUsesGoogleCalendar, 'hidden disabled')}}>
    @include('calendar.partials.address-fields', ['addressable' => $event ?? null])
</fieldset>

<fieldset data-event-directions-fields {{iftrue($eventIsOnline || $eventUsesGoogleCalendar, 'hidden disabled')}}>
    @select(['label' => 'Directions', 'name' => 'travel_mode', 'required' => true])
        @foreach(\App\Models\Calendar\Event::travelModeOptions() as $travelMode => $travelModeLabel)
            @option([
                'name' => 'travel_mode',
                'label' => $travelModeLabel,
                'value' => $travelMode,
                'selected' => old('travel_mode', $event->travel_mode ?? 'TRANSIT') === $travelMode,
            ])
        @endforeach
    @endselect
</fieldset>

<fieldset data-event-online-fields {{iftrue(!$eventIsOnline, 'hidden')}} {{iftrue(!$eventIsOnline && !$eventUsesGoogleCalendar, 'disabled')}}>
    @input([
        'label' => 'URL',
        'name' => 'meeting_url',
        'type' => 'url',
        'value' => old('meeting_url', $event->meeting_url ?? null),
        'placeholder' => 'https://',
    ])
</fieldset>

@if(!empty($showGoogleCalendarImport))
<fieldset data-event-google-calendar-fields data-google-conference-import {{iftrue(!$eventUsesGoogleCalendar, 'hidden disabled')}}>
    <div class="form-group">
    <label for="google-conference-info" class="form-label w-100 mb-1 ml-3 text-nowrap">Google Calendar conference info</label>
    <div class="form-control">
        <textarea
            id="google-conference-info"
            class="border-0 w-100 h-100"
            rows="9"
            placeholder="Paste the conference info copied from Google Calendar"
            data-google-conference-import-text></textarea>
    
    <div class="text-red mt-2" role="alert" data-google-conference-import-error hidden></div>
    </div>
</fieldset>
@endif

@php
    $selectedType = $eventUsesGoogleCalendar ? 'Meeting' : old('type', $event->type ?? null);
    $typeInputSuffix = $event->id ?? 'new';
@endphp

<div class="form-group" data-event-type-fields {{iftrue($eventUsesGoogleCalendar, 'hidden')}}>
    @label(['label' => 'Type'])
    <div class="d-flex flex-wrap gap-1" data-event-type-options>
        @foreach(\App\Models\Calendar\Event::typeOptions() as $typeIcon => $typeName)
            @php
                $typeInputId = 'event-type-'.\Illuminate\Support\Str::slug($typeName).'-'.$typeInputSuffix;
                $typeSelected = $selectedType === $typeName;
            @endphp
            <input
                class="sr-only"
                type="radio"
                name="type"
                id="{{$typeInputId}}"
                value="{{$typeName}}"
                data-event-type-input
                {{iftrue($typeSelected, 'checked')}}>
            <label
                for="{{$typeInputId}}"
                class="btn {{$typeSelected ? 'btn-secondary' : 'btn-outline-secondary'}} btn-sm btn-wide rounded-sm d-center"
                data-event-type-option>
                @fa(['icon' => $typeIcon])
                <span>{{$typeName}}</span>
            </label>
        @endforeach
    </div>
</div>

<fieldset data-event-additional-fields {{iftrue($eventUsesGoogleCalendar, 'hidden disabled')}}>
@textarea([
    'label' => 'Notes',
    'name' => 'notes',
    'value' => $event->notes ?? old('notes'),
    'rows' => 5,
])
</fieldset>

@php
    $defaultNotificationMinutes = \App\Models\Calendar\Event::defaultNotificationMinutesBefore();
    $notificationEnabled = old('send_notification', isset($event) ? $event->notification_user_id !== null : $defaultNotificationMinutes !== null);
    $notificationMinutes = old('notification_minutes_before', isset($event) ? ($event->notification_minutes_before ?? 15) : ($defaultNotificationMinutes ?? 15));
    $notificationId = 'event-notification-'.($event->id ?? 'new');
@endphp

<div class="mb-3" data-event-notification-settings>
    <div class="form-check mb-2">
        <input type="hidden" name="send_notification" value="0">
        <input
            class="form-check-input"
            type="checkbox"
            name="send_notification"
            value="1"
            id="{{$notificationId}}"
            data-event-notification-toggle
            {{iftrue($notificationEnabled, 'checked')}}>
        <label class="form-check-label align-middle" for="{{$notificationId}}">Send me a notification</label>
    </div>

    <div data-event-notification-options {{iftrue(!$notificationEnabled, 'hidden')}} class="text-center">
        @select(['name' => 'notification_minutes_before'])
            @foreach(\App\Models\Calendar\Event::notificationOptions() as $minutes => $label)
                @option([
                    'name' => 'notification_minutes_before',
                    'label' => $label,
                    'value' => $minutes,
                    'selected' => (string) $notificationMinutes === (string) $minutes,
                ])
            @endforeach
        @endselect

        <button type="button" class="btn btn-outline-warning rounded btn-sm" data-enable-push-notifications hidden>
            @fa(['icon' => 'bell']) Enable notifications on this device
        </button>
        <div class="form-text mt-2" data-web-push-status hidden></div>
    </div>
</div>
</div>
