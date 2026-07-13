@modal(['title' => '', 'id' => 'recital-modal', 'data' => ['recital' => 'true']])
<div>
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
        <span id="recital-venue"></span>
    </div>

    <div class="small font-weight-bold opacity-6 mb-2">PARTICIPANTS</div>
    <div id="recital-participants" class="studio-break-lessons"></div>
</div>
@endmodal
