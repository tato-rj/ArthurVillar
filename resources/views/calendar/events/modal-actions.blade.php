<div id="general-event-details">
    <div class="calendar-modal-details">
        <div data-general-event-notes-section hidden class="calendar-modal-detail-section">
            <div class="small font-weight-bold opacity-6 mb-2">NOTES</div>
            <div class="calendar-general-event-notes calendar-general-event-notes-display" data-general-event-notes-display-container>
                <button type="button" class="btn calendar-general-event-notes-edit" data-general-event-notes-edit>edit</button>
                <div id="general-event-notes" data-general-event-notes-display></div>
            </div>
            <form method="POST" action="" data-general-event-notes-form hidden>
                @csrf
                @method('PATCH')
                <textarea
                    name="notes"
                    class="form-control calendar-general-event-notes calendar-general-event-notes-input"
                    rows="8"
                    data-general-event-notes-input
                    aria-label="Event notes"
                ></textarea>
                <div class="d-flex justify-content-end mt-2">
                    <button type="button" class="btn btn-sm btn-outline-dark mr-2" data-general-event-notes-cancel>Cancel</button>
                    <button type="submit" class="btn btn-sm btn-primary">Save notes</button>
                </div>
            </form>
        </div>

        <div id="general-event-controls" class="calendar-modal-detail-section d-flex mt-3">
            <button type="button" id="cancel-general-event-button" class="btn btn-outline-dark w-100 mr-1">Cancel</button>
            <button type="button" id="reschedule-general-event-button" class="btn btn-outline-red w-100 ml-1">Reschedule</button>
        </div>
    </div>
</div>

<div id="reschedule-general-event">
    <form method="POST" action="">
        @csrf
        @method('PATCH')
        <input type="hidden" name="scheduled_date" id="reschedule-general-event-date">

        <div class="calendar-date-picker" data-general-event-reschedule-datepicker data-reschedule-date-fields>
            <div class="calendar-date-picker-header">
                <h3 data-general-event-reschedule-datepicker-label></h3>
                <div class="calendar-date-picker-nav">
                    <button type="button" data-general-event-reschedule-datepicker-prev aria-label="Previous month">
                        @fa(['icon' => 'chevron-left', 'mr' => 0])
                    </button>
                    <button type="button" data-general-event-reschedule-datepicker-next aria-label="Next month">
                        @fa(['icon' => 'chevron-right', 'mr' => 0])
                    </button>
                </div>
            </div>

            <div class="calendar-date-picker-weekdays" aria-hidden="true">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
            </div>

            <div class="calendar-date-picker-grid" data-general-event-reschedule-datepicker-grid></div>
        </div>

        <div class="row mb-2" data-reschedule-time-fields>
            @select(['label' => 'Starts at', 'name' => 'starts_at', 'id' => 'reschedule-general-event-start-time', 'grid' => 'col', 'required' => true])
                @foreach(\App\Models\Calendar\Event::timeOptions() as $value)
                    @option(['name' => 'starts_at', 'label' => \App\Models\Calendar\Event::timeLabel($value), 'value' => $value])
                @endforeach
            @endselect

            @select(['label' => 'Ends at', 'name' => 'ends_at', 'id' => 'reschedule-general-event-end-time', 'grid' => 'col', 'required' => true])
                @foreach(\App\Models\Calendar\Event::timeOptions() as $value)
                    @option(['name' => 'ends_at', 'label' => \App\Models\Calendar\Event::timeLabel($value), 'value' => $value])
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
