<div id="general-event-details">
    <div class="calendar-modal-details">
        <div id="general-event-controls" class="calendar-modal-detail-section d-flex mt-3">
            <button type="button" id="reschedule-general-event-button" class="btn btn-outline-red w-100">Reschedule</button>
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
