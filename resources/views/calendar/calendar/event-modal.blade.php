@modal([
    'title' => '',
    'id' => 'calendar-event-modal',
    'bodyFullWidth' => true,
    'data' => [
        'event-modal-type' => 'lesson',
        'event-modal-expanded' => 'false',
        'lesson-status' => 'unconfirmed',
    ],
])
@slot('headerButtons')
<span data-event-modal-section="lesson" data-event-modal-expanded-content>
    <button id="lesson-edit" class="btn btn-raw" type="button">@fa(['icon' => 'pen'])</button>
    <button id="lesson-revert" class="btn btn-raw" data-url="{{ route('calendar.lessons.revert') }}" type="button">@fa(['icon' => 'rotate-left', 'mr' => 0])</button>
</span>
<span data-event-modal-section="general" data-event-modal-expanded-content hidden>
    <button id="event-duplicate" class="btn btn-raw" type="button" aria-label="Duplicate event" title="Duplicate event">@fa(['icon' => 'copy'])</button>
    <button id="event-edit" class="btn btn-raw" type="button">@fa(['icon' => 'pen'])</button>
    <button id="event-revert" class="btn btn-raw" type="button" style="display: none">@fa(['icon' => 'rotate-left', 'mr' => 0])</button>
</span>
@endslot

<div class="px-3 mb-4">
    <div data-event-modal-section="lesson" data-event-modal-expanded-content>
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

@include('calendar.events.modal-notes')

<div class="border-top pt-3 mt-3" data-google-event-response-section hidden>
    <div class="d-flex align-items-center justify-content-between">
        <span class="small font-weight-bold">Going?</span>
        <div class="btn-group" role="group" aria-label="Respond to Google Calendar invitation">
            <button type="button" class="btn btn-sm btn-outline-dark mr-2" data-google-event-response="accepted">
                @fa(['icon' => 'check'])Yes
            </button>
            <button type="button" class="btn btn-sm btn-outline-dark" data-google-event-response="declined">
                @fa(['icon' => 'xmark'])No
            </button>
        </div>
    </div>
</div>

<div class="px-3" data-event-modal-section="lesson">
    @include('calendar.lessons.lessonRecords.primary-controls')
</div>

<div class="px-3" data-event-modal-expanded-content>
    <div data-event-modal-section="lesson">
        @include('calendar.lessons.lessonRecords.reschedule')
        @include('calendar.lessons.lessonRecords.cancel')
        @include('calendar.lessons.lessonRecords.controls')
    </div>

    <div data-event-modal-section="general" hidden>
        @include('calendar.events.modal-actions')
    </div>
</div>

<div id="ignore-conflict" class="px-3 mt-2" data-event-modal-expanded-content hidden>
    <div class="border-top pt-4 mt-4">
        <button type="button" class="btn btn-outline-secondary w-100" data-conflict-toggle>
            @fa(['icon' => 'triangle-exclamation'])<span data-conflict-toggle-label>Ignore conflict</span>
        </button>
    </div>
</div>

<div class="px-3 mt-2" data-event-modal-expand-toggle-container>
    <button
        type="button"
        class="rounded text-center btn w-100 btn-raw text-muted"
        style="font-size: 74%"
        data-event-modal-expand-toggle
        aria-expanded="false"
    >
        <i class="fas fa-expand mr-1" data-event-modal-expand-icon aria-hidden="true"></i>
        <span data-event-modal-expand-label>SHOW MORE</span>
    </button>
</div>
@endmodal
