@modal(['title' => '', 'id' => 'recital-modal', 'bodyFullWidth' => true, 'data' => ['recital' => 'true']])
<div class="px-3">
    <div class="mb-2">
        @fa(['icon' => 'calendar-day', 'classes' => 'opacity-4'])
        <span id="recital-date"></span>
    </div>
    <div class="mb-2">
        @fa(['icon' => 'clock', 'classes' => 'opacity-4'])
        <span id="recital-time"></span>
    </div>
    <div class="mb-3">
        @fa(['icon' => 'location-dot', 'classes' => 'opacity-4'])
        <span id="recital-location"></span>
    </div>
</div>

@include('calendar.calendar.travel-route')

<div class="px-3">
    <div class="small font-weight-bold opacity-6 mb-2">PARTICIPANTS</div>
    <div id="recital-participants" class="calendar-break-lessons"></div>
</div>
@endmodal
