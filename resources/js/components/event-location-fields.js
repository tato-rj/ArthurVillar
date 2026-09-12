const refreshEventLocationFields = function(container, locationType) {
    const root = container ? container.closest('[data-event-location-fields]') || container.querySelector('[data-event-location-fields]') : null;

    if (!root) {
        return;
    }

    const typeInput = root.querySelector('[data-event-location-type]');
    const type = locationType || (typeInput ? typeInput.value : 'in_person');
    const isOnline = type === 'online';
    const inPersonFields = root.querySelector('[data-event-in-person-fields]');
    const onlineFields = root.querySelector('[data-event-online-fields]');

    if (typeInput) {
        typeInput.value = isOnline ? 'online' : 'in_person';
    }

    if (inPersonFields) {
        inPersonFields.hidden = isOnline;
        inPersonFields.disabled = isOnline;
    }

    if (onlineFields) {
        onlineFields.hidden = !isOnline;
        onlineFields.disabled = !isOnline;
    }

    root.querySelectorAll('[data-event-location-option]').forEach(function(button) {
        const selected = button.dataset.eventLocationOption === (isOnline ? 'online' : 'in_person');

        button.classList.toggle('btn-secondary', selected);
        button.classList.toggle('btn-white', !selected);
        button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
};

window.refreshEventLocationFields = refreshEventLocationFields;

document.addEventListener('click', function(event) {
    const button = event.target.closest('[data-event-location-option]');

    if (!button) {
        return;
    }

    refreshEventLocationFields(button, button.dataset.eventLocationOption);
});

document.addEventListener('reset', function(event) {
    if (!event.target.querySelector('[data-event-location-fields]')) {
        return;
    }

    window.setTimeout(function() {
        refreshEventLocationFields(event.target);
    });
});
