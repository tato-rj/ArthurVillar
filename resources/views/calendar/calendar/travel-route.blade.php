<section class="calendar-travel-route calendar-modal-detail-section bg-light py-3 px-4 my-4 border-y" data-travel-route hidden aria-live="polite">
    <div class="calendar-travel-route-loading" data-travel-route-loading>
        @fa(['icon' => 'route', 'mr' => 0])
        <span>Checking travel time…</span>
    </div>

    <div class="calendar-travel-route-content" data-travel-route-content hidden>
        <div class="calendar-travel-route-summary">
            <div class="mb-2" data-travel-route-times></div>
            <div class="calendar-travel-route-steps mb-2" data-travel-route-steps></div>
            <div class="calendar-travel-route-origin" data-travel-route-origin></div>
        </div>
    </div>
</section>
