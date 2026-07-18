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

<div class="row">
    @select(['label' => 'Starts at', 'name' => 'starts_at', 'grid' => 'col', 'required' => true])
        @foreach(timeslots(9, 21, 15) as $time)
            @option(['name' => 'starts_at', 'label' => \App\Models\Calendar\Event::timeLabel($time), 'value' => $time, 'selected' => isset($event) && substr($event->starts_at, 0, 5) === $time])
        @endforeach
    @endselect

    @select(['label' => 'Ends at', 'name' => 'ends_at', 'grid' => 'col', 'required' => true])
        @foreach(timeslots(9, 21, 15) as $time)
            @option(['name' => 'ends_at', 'label' => \App\Models\Calendar\Event::timeLabel($time), 'value' => $time, 'selected' => isset($event) && substr($event->ends_at, 0, 5) === $time])
        @endforeach
    @endselect
</div>

@textarea([
    'label' => 'Notes',
    'name' => 'notes',
    'value' => $event->notes ?? old('notes'),
    'rows' => 5,
])

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

        <button type="button" class="btn btn-outline-warning rounded btn-sm" data-enable-push-notifications>
            @fa(['icon' => 'bell']) Enable notifications on this device
        </button>
        <div class="form-text mt-2" data-web-push-status>
            Notifications must be enabled on at least one device.
        </div>
    </div>
</div>

@submit(['label' => 'Confirm', 'theme' => 'primary'])
