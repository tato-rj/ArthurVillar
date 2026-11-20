<div
    class="calendar-date-range"
    data-date-range
    data-output="{{$output ?? 'date'}}"
>
    <input
        type="hidden"
        data-date-range-from
        @isset($fromId) id="{{$fromId}}" @endisset
        @isset($fromName) name="{{$fromName}}" @endisset
        value="{{$fromValue ?? ''}}"
    >
    <input
        type="hidden"
        data-date-range-to
        @isset($toId) id="{{$toId}}" @endisset
        @isset($toName) name="{{$toName}}" @endisset
        value="{{$toValue ?? ''}}"
    >

    <button type="button" class="calendar-date-range-toggle" data-date-range-toggle aria-expanded="false">
        @icon('calendar-1', ['mr' => 0])
        <span data-date-range-label>{{$placeholder ?? 'Select date range'}}</span>
        @icon('chevron-down', ['mr' => 0])
    </button>

    <div class="calendar-date-range-popover" data-date-range-popover hidden>
        <div class="calendar-date-range-header">
            <button type="button" class="btn-raw calendar-date-range-nav" data-date-range-previous aria-label="Previous month">
                @icon('chevron-left', ['mr' => 0])
            </button>
            <strong data-date-range-month></strong>
            <button type="button" class="btn-raw calendar-date-range-nav" data-date-range-next aria-label="Next month">
                @icon('chevron-right', ['mr' => 0])
            </button>
        </div>
        <div class="calendar-date-range-weekdays" aria-hidden="true">
            @foreach(['S', 'M', 'T', 'W', 'T', 'F', 'S'] as $weekday)
                <span>{{$weekday}}</span>
            @endforeach
        </div>
        <div class="calendar-date-range-grid" data-date-range-grid></div>
        <div class="calendar-date-range-footer">
            <span data-date-range-instruction>Select the first date</span>
            <button type="button" class="btn btn-sm btn-secondary rounded" data-date-range-clear>Clear</button>
        </div>
    </div>
</div>
