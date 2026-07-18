function refreshEventTypeButtons(group) {
    group.querySelectorAll('[data-event-type-input]').forEach(function(input) {
        const label = input.nextElementSibling;

        if (!label || !label.matches('[data-event-type-option]')) {
            return;
        }

        label.classList.toggle('btn-secondary', input.checked);
        label.classList.toggle('btn-outline-secondary', !input.checked);
    });
}

document.addEventListener('change', function(event) {
    if (!event.target.matches('[data-event-type-input]')) {
        return;
    }

    refreshEventTypeButtons(event.target.closest('[data-event-type-options]'));
});
