@modal(['title' => '', 'id' => 'month-day-events-modal'])

<div class="calendar-month-day-events-conflict" data-month-day-events-conflict hidden>
    @fa(['icon' => 'circle-exclamation'])
    <span>Conflicting events</span>
</div>

<div class="calendar-month-day-events-modal-list" data-month-day-events-list></div>

@endmodal
