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
    <button id="lesson-edit" class="btn btn-raw" type="button">@icon('pen')</button>
    <button id="lesson-revert" class="btn btn-raw" data-url="{{ route('calendar.lessons.revert') }}" type="button">@icon('rotate-ccw', ['mr' => 0])</button>
</span>
<span data-event-modal-section="general" data-event-modal-expanded-content hidden>
    <button id="event-duplicate" class="btn btn-raw" type="button" aria-label="Duplicate event" title="Duplicate event">@icon('copy')</button>
    <button id="event-edit" class="btn btn-raw" type="button">@icon('pen')</button>
    <button id="event-revert" class="btn btn-raw" type="button" style="display: none">@icon('rotate-ccw', ['mr' => 0])</button>
</span>
@endslot

<div class="px-3 mb-4">
    <div data-event-modal-section="lesson" data-event-modal-expanded-content>
        <div id="lesson-status" class="rounded px-2 py-0 alert small mb-3"></div>
        <div class="alert alert-danger small mb-3" data-lesson-action-error hidden></div>
        <div class="alert alert-success small mb-3" role="status" data-lesson-restoration-notice hidden></div>
    </div>

    <div data-event-modal-section="general" hidden>
        <div class="alert alert-danger small mb-3" data-general-event-action-error hidden></div>
    </div>

    <div class="calendar-modal-details">
        <div id="lesson-birthday" class="calendar-modal-detail text-blue" data-event-modal-section="lesson" style="display: none">
            @icon('cake', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span>Birthday <span data-lesson-birthday-label></span></span>
        </div>

        <div class="calendar-modal-detail">
            @icon('calendar-1', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-event-modal-date></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="lesson" data-lesson-plan-summary-section hidden>
            @icon('calendar-check', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-lesson-plan-summary></span>
        </div>

        <div class="calendar-modal-detail">
            @icon('clock', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-event-modal-time></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="lesson" data-lesson-recurrence-section>
            @icon('repeat', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span id="lesson-recurrence"></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="lesson" data-lesson-recital-section hidden>
            @icon('piano', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-lesson-recital-details></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="lesson" data-lesson-birth-date-section hidden>
            @icon('cake', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-lesson-birth-date></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="general" data-general-event-type-section hidden>
            <i id="general-event-type-icon" class="app-icon calendar-modal-detail-icon" aria-hidden="true"></i>
            <span id="general-event-type"></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="general" data-general-event-organizer-section hidden>
            @icon('user', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-general-event-organizer></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-location-section hidden>
            @icon('map-pin', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon', 'data-event-modal-location-icon' => ''])
            <span data-event-modal-location></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="general" data-general-event-address-section hidden>
            @icon('map-pin', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span data-general-event-address></span>
        </div>

        <div class="calendar-modal-detail" data-event-modal-meeting-section hidden>
            @icon('video', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <a data-event-modal-meeting-link target="_blank" rel="noopener">Join the meeting</a>
        </div>

        <div id="notes-url" class="calendar-modal-detail" data-event-modal-section="lesson">
            @icon('file-pen', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <a target="_blank" rel="noopener">Notes</a>
        </div>

        <div class="calendar-modal-detail" data-event-modal-section="general" hidden>
            @icon('bell', ['mr' => 0, 'classes' => 'calendar-modal-detail-icon'])
            <span id="general-event-notification"></span>
        </div>
    </div>
</div>

@include('calendar.calendar.travel-route')

@include('calendar.events.modal-notes')

<div class="border-to px-3 pt- mt-3" data-event-modal-section="general" data-google-event-response-section hidden>
    <div class="d-flex align-items-center justify-content-between">
        <span class="small font-weight-bold">Going?</span>
        <div class="btn-group" role="group" aria-label="Respond to Google Calendar invitation">
            <button type="button" class="btn btn-sm btn-outline-dark mr-2" data-google-event-response="accepted">
                @icon('check')Yes
            </button>
            <button type="button" class="btn btn-sm btn-outline-dark" data-google-event-response="declined">
                @icon('x')No
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
        @include('calendar.lessons.lessonRecords.recitals')
    </div>

    <div data-event-modal-section="general" hidden>
        @include('calendar.events.modal-actions')
    </div>
</div>

@include('calendar.calendar.conflict-toggle', ['expandedOnly' => true, 'showRecitalAction' => true])

<div class="px-3 mt-2" data-event-modal-expand-toggle-container>
    <button
        type="button"
        class="rounded text-center btn w-100 btn-raw text-muted"
        style="font-size: 74%"
        data-event-modal-expand-toggle
        aria-expanded="false"
    >
        @icon('maximize', ['mr' => 1, 'data-event-modal-expand-icon' => ''])
        <span data-event-modal-expand-label>SHOW MORE</span>
    </button>
</div>
@endmodal
