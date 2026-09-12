@modal(['title' => 'New event', 'id' => 'create-event-modal'])
<form method="POST" action="{{route('calendar.events.store')}}">
    @csrf
    @include('calendar.events.partials.form', ['showGoogleCalendarImport' => true])
    @submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal

@modal(['title' => 'Use Google Calendar conference info', 'id' => 'google-conference-import-modal'])
<div data-google-conference-import>
    <div class="mb-3">
        <div class="fw-bold mb-1">Directions</div>
        <p class="text-muted small mb-0">
            In Google Calendar, open the event and select <strong>Copy conference info</strong>.
            Paste everything Google copies into the field below.
        </p>
    </div>

    <label for="google-conference-info" class="form-label">Conference info</label>
    <div class="form-control">
        <textarea
            id="google-conference-info"
            class="border-0 w-100 h-100"
            rows="9"
            placeholder="Paste the conference info copied from Google Calendar"
            data-google-conference-import-text></textarea>
    </div>

    <div class="text-red mt-2" role="alert" data-google-conference-import-error hidden></div>

    <div class="mt-3" data-google-conference-import-notification>
        <div class="form-check mb-2">
            <input
                class="form-check-input"
                type="checkbox"
                id="google-conference-send-notification"
                data-google-conference-import-notification-toggle>
            <label class="form-check-label align-middle" for="google-conference-send-notification">
                Send me a notification
            </label>
        </div>

        <div class="text-center" data-google-conference-import-notification-options hidden>
            <div class="form-select-control">
                <select class="form-select" aria-label="Notification time" data-google-conference-import-notification-minutes>
                    @foreach(\App\Models\Calendar\Event::notificationOptions() as $minutes => $label)
                        <option value="{{$minutes}}">{{$label}}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>

    <div class="text-center mt-3">
        <button type="button" class="btn btn-primary" data-google-conference-import-apply>
            Use conference info
        </button>
    </div>
</div>
@endmodal
