<div class="px-3 mt-2" data-conflict-section @if($expandedOnly ?? false) data-event-modal-expanded-content @endif hidden>
    <div class="border-top pt-4 mt-4 d-grid gap-2">
        <div data-conflict-controls>
            <div class="alert alert-danger small mb-3" data-conflict-error hidden></div>
            <button type="button" class="btn btn-outline-secondary w-100" data-conflict-toggle>
                @icon('triangle-alert')<span data-conflict-toggle-label>Ignore conflict</span>
            </button>
        </div>
        @if($showRecitalAction ?? false)
            <div data-lesson-recital-action hidden>
                <button type="button" class="btn btn-outline-secondary w-100" data-lesson-recital-open aria-controls="lesson-recital-picker" aria-expanded="false">
                    @icon('piano')Join an upcoming recital
                </button>
            </div>
        @endif
    </div>
</div>
