<div data-event-modal-section="general" hidden class="px-3">
    <div data-general-event-notes-section hidden class="calendar-modal-detail-section">
        <div class="calendar-general-event-notes-heading">
            <div class="small font-weight-bold opacity-6">NOTES</div>
            <button
                type="button"
                class="btn calendar-general-event-notes-edit"
                data-general-event-notes-edit
                data-event-modal-expanded-content
            >edit</button>
        </div>
        <div
            id="general-event-notes"
            class="calendar-general-event-notes"
            data-general-event-notes-display
            data-general-event-notes-display-container
        ></div>
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
</div>
