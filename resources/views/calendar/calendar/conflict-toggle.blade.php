<div class="px-3 mt-2" data-conflict-section @if($expandedOnly ?? false) data-event-modal-expanded-content @endif hidden>
    <div class="border-top pt-4 mt-4">
        <div class="alert alert-danger small mb-3" data-conflict-error hidden></div>
        <button type="button" class="btn btn-outline-secondary w-100" data-conflict-toggle>
            @fa(['icon' => 'triangle-exclamation'])<span data-conflict-toggle-label>Ignore conflict</span>
        </button>
    </div>
</div>
