@modal(['title' => '', 'id' => 'general-event-modal', 'data' => ['general-event' => 'true']])
@slot('headerButtons')
<button id="event-edit" class="btn btn-raw mr-1" type="button">@fa(['icon' => 'pen'])</button>
@endslot

<div class="alert alert-danger small mb-3" data-general-event-action-error hidden></div>

<div id="general-event-details">
    <div class="mb-2">
        @fa(['icon' => 'calendar-day', 'classes' => 'opacity-4'])
        <span id="general-event-date"></span>
    </div>
    <div class="mb-3">
        @fa(['icon' => 'clock', 'classes' => 'opacity-4'])
        <span id="general-event-time"></span>
    </div>

    <div class="small font-weight-bold opacity-6 mb-2">NOTES</div>
    <div id="general-event-notes" class="studio-general-event-notes"></div>

    <div id="general-event-controls" class="d-flex mt-4">
        <button type="button" id="cancel-general-event-button" class="btn btn-outline-dark w-100 mr-1">Cancel</button>
        <button type="button" id="reschedule-general-event-button" class="btn btn-outline-red w-100 ml-1">Reschedule</button>
    </div>
</div>

<div id="reschedule-general-event">
    <form method="POST" action="">
        @csrf
        @method('PATCH')
        <input type="hidden" name="scheduled_date" id="reschedule-general-event-date">

        <div class="studio-date-picker" data-general-event-reschedule-datepicker>
            <div class="studio-date-picker-header">
                <h3 data-general-event-reschedule-datepicker-label></h3>
                <div class="studio-date-picker-nav">
                    <button type="button" data-general-event-reschedule-datepicker-prev aria-label="Previous month">
                        @fa(['icon' => 'chevron-left', 'mr' => 0])
                    </button>
                    <button type="button" data-general-event-reschedule-datepicker-next aria-label="Next month">
                        @fa(['icon' => 'chevron-right', 'mr' => 0])
                    </button>
                </div>
            </div>

            <div class="studio-date-picker-weekdays" aria-hidden="true">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
            </div>

            <div class="studio-date-picker-grid" data-general-event-reschedule-datepicker-grid></div>
        </div>

        <div class="row mb-4">
            @select(['label' => 'Starts at', 'name' => 'starts_at', 'id' => 'reschedule-general-event-start-time', 'grid' => 'col', 'required' => true])
                @foreach(\App\Models\Event::timeOptions() as $value)
                    @option(['name' => 'starts_at', 'label' => \App\Models\Event::timeLabel($value), 'value' => $value])
                @endforeach
            @endselect

            @select(['label' => 'Ends at', 'name' => 'ends_at', 'id' => 'reschedule-general-event-end-time', 'grid' => 'col', 'required' => true])
                @foreach(\App\Models\Event::timeOptions() as $value)
                    @option(['name' => 'ends_at', 'label' => \App\Models\Event::timeLabel($value), 'value' => $value])
                @endforeach
            @endselect
        </div>

        <button type="submit" class="btn btn-primary w-100">@fa(['icon' => 'clock-rotate-left'])Reschedule event</button>
    </form>
</div>

<div id="cancel-general-event">
    <form method="POST" action="">
        @csrf
        @method('DELETE')

        <div class="my-4">
            <p class="mb-0 text-red">This action cannot be undone. Are you sure?</p>
        </div>

        <button type="submit" class="btn btn-primary w-100">@fa(['icon' => 'calendar-xmark'])Cancel event</button>
    </form>
</div>
@endmodal
