@modal(['title' => '', 'id' => 'teaching-break-modal', 'data' => ['teaching-break' => 'true']])
<div>
    <div class="mb-1">
        @icon('calendar-1', ['classes' => 'opacity-4'])
        <span id="teaching-break-dates"></span>
    </div>

    <div class="mb-3">
        @icon('info', ['classes' => 'opacity-4'])
        <span id="teaching-break-reason"></span>
    </div>

    <div class="mb-3">
        @icon('map-pin', ['classes' => 'opacity-4'])
        <span id="teaching-break-locations"></span>
    </div>

    <div class="calendar-break-impact rounded p-3 mb-3">
        <div class="font-weight-bold" id="teaching-break-impact"></div>
    </div>

    <div id="teaching-break-lessons" class="calendar-break-lessons"></div>
</div>
@endmodal
