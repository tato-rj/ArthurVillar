@modal([
    'title' => '',
    'id' => 'calendar-event-modal',
    'bodyFullWidth' => true,
    'data' => [
        'event-modal-type' => 'lesson',
        'lesson-status' => 'unconfirmed',
    ],
])
@slot('headerButtons')
<span data-event-modal-section="lesson">
    <button id="lesson-edit" class="btn btn-raw" type="button">@fa(['icon' => 'pen'])</button>
    <button id="lesson-revert" class="btn btn-raw" data-url="{{ route('calendar.lessons.revert') }}" type="button">@fa(['icon' => 'rotate-left', 'mr' => 0])</button>
</span>
<span data-event-modal-section="general" hidden>
    <button id="event-duplicate" class="btn btn-raw mr-1" type="button" aria-label="Duplicate event" title="Duplicate event">@fa(['icon' => 'copy', 'mr' => 0])</button>
    <button id="event-edit" class="btn btn-raw mr-1" type="button">@fa(['icon' => 'pen'])</button>
    <button id="event-revert" class="btn btn-raw" type="button" style="display: none">@fa(['icon' => 'rotate-left', 'mr' => 0])</button>
</span>
@endslot

<div class="px-3">
    <div data-event-modal-section="lesson">
        <div id="lesson-status" class="rounded px-2 py-0 alert small mb-3"></div>
        <div class="alert alert-danger small mb-3" data-lesson-action-error hidden></div>
    </div>

    <div data-event-modal-section="general" hidden>
        <div class="alert alert-danger small mb-3" data-general-event-action-error hidden></div>
    </div>

    <div class="calendar-modal-details">
        <div id="lesson-birthday" class="calendar-modal-detail text-blue" data-event-modal-section="lesson" style="display: none">
            @fa(['icon' => 'cake-candles', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span>Birthday <span data-lesson-birthday-label></span></span>
        </div>

        <div class="calendar-modal-detail">
            @fa(['icon' => 'calendar-day', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-event-modal-date></span>
        </div>

        <div class="calendar-modal-detail">
            @fa(['icon' => 'clock', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-event-modal-time></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="lesson" data-lesson-recurrence-section>
            @fa(['icon' => 'repeat', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span id="lesson-recurrence"></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="general" data-general-event-type-section hidden>
            <i id="general-event-type-icon" class="fas calendar-modal-detail-icon" aria-hidden="true"></i>
            <span id="general-event-type"></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="general" data-general-event-organizer-section hidden>
            @fa(['icon' => 'user', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-general-event-organizer></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-location-section hidden>
            <i class="fas fa-location-dot calendar-modal-detail-icon" data-event-modal-location-icon aria-hidden="true"></i>
            <span data-event-modal-location></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="general" data-general-event-address-section hidden>
            @fa(['icon' => 'location-dot', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-general-event-address></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-meeting-section hidden>
            @fa(['icon' => 'video', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <a data-event-modal-meeting-link target="_blank" rel="noopener">Join the meeting</a>
        </div>

        <div id="notes-url" class="calendar-modal-detail" data-event-modal-section="lesson">
            @fa(['icon' => 'file-pen', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <a target="_blank" rel="noopener">Notes</a>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="general" hidden>
            @fa(['icon' => 'bell', 'mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span id="general-event-notification"></span>
        </div>
    </div>
</div>

@include('calendar.calendar.travel-route')

<div class="px-3">
    <div data-event-modal-section="lesson">
        @include('calendar.lessons.reschedule')
        @include('calendar.lessons.cancel')
        @include('calendar.lessons.controls')
    </div>

    <div data-event-modal-section="general" hidden>
        @include('calendar.events.modal-actions')
    </div>
</div>
@endmodal
