const refreshEventLocationFields = function(container, locationType) {
    const root = container ? container.closest('[data-event-location-fields]') || container.querySelector('[data-event-location-fields]') : null;

    if (!root) {
        return;
    }

    const typeInput = root.querySelector('[data-event-location-type]');
    const type = locationType || (typeInput ? typeInput.value : 'in_person');
    const isOnline = type === 'online';
    const usesGoogleCalendar = type === 'google_calendar';
    const inPersonFields = root.querySelector('[data-event-in-person-fields]');
    const onlineFields = root.querySelector('[data-event-online-fields]');
    const googleCalendarFields = root.querySelector('[data-event-google-calendar-fields]');
    const standardFields = root.querySelector('[data-event-standard-fields]');
    const directionsFields = root.querySelector('[data-event-directions-fields]');
    const additionalFields = root.querySelector('[data-event-additional-fields]');

    if (typeInput) {
        typeInput.value = usesGoogleCalendar ? 'google_calendar' : (isOnline ? 'online' : 'in_person');
    }

    if (inPersonFields) {
        inPersonFields.hidden = isOnline || usesGoogleCalendar;
        inPersonFields.disabled = isOnline || usesGoogleCalendar;
    }

    if (onlineFields) {
        onlineFields.hidden = !isOnline;
        onlineFields.disabled = !isOnline && !usesGoogleCalendar;
    }

    if (googleCalendarFields) {
        googleCalendarFields.hidden = !usesGoogleCalendar;
        googleCalendarFields.disabled = !usesGoogleCalendar;
    }

    if (standardFields) {
        standardFields.hidden = usesGoogleCalendar;
        standardFields.disabled = usesGoogleCalendar;
    }

    if (directionsFields) {
        directionsFields.hidden = isOnline;
        directionsFields.disabled = isOnline;
    }

    if (additionalFields) {
        additionalFields.hidden = usesGoogleCalendar;
        additionalFields.disabled = usesGoogleCalendar;
    }

    root.querySelectorAll('[data-event-location-option]').forEach(function(button) {
        const selected = button.dataset.eventLocationOption === type;

        button.classList.toggle('btn-secondary', selected);
        button.classList.toggle('btn-white', !selected);
        button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });

    if (usesGoogleCalendar && googleCalendarFields) {
        const textarea = googleCalendarFields.querySelector('[data-google-conference-import-text]');

        window.setTimeout(function() {
            if (textarea) {
                textarea.focus();
            }
        }, 0);
    }
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
