const IMPORT_MODAL_ID = 'google-conference-import-modal';
const CREATE_MODAL_ID = 'create-event-modal';
const DATE_LINE_PATTERN = /^(?:(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\s*,\s*)?([A-Za-z]+)\s+(\d{1,2})(?:\s*,\s*(\d{4}))?\s*[·⋅•]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))\s*[–—-]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm))$/i;
const GOOGLE_MEET_PATTERN = /(?:https?:\/\/)?meet\.google\.com\/[a-z\d-]+(?:[/?#][^\s<>\])"']*)?/i;
const MONTHS = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};
const WEEKDAYS = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

const cleanLine = function(value) {
    return String(value || '')
        .replace(/[\u00a0\u202f]/g, ' ')
        .replace(/\\_/g, '_')
        .trim();
};

const parseTime = function(value) {
    const match = cleanLine(value).match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);

    if (!match) {
        return null;
    }

    let hour = Number(match[1]);
    const minute = Number(match[2] || 0);

    if (hour < 1 || hour > 12 || minute > 59) {
        return null;
    }

    if (match[3].toLowerCase() === 'am') {
        hour = hour === 12 ? 0 : hour;
    } else {
        hour = hour === 12 ? 12 : hour + 12;
    }

    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const validDate = function(year, month, day) {
    const date = new Date(year, month, day);

    return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
        ? date
        : null;
};

const inferYear = function(month, day, weekday, today) {
    const currentYear = today.getFullYear();

    if (typeof weekday !== 'number') {
        const thisYear = validDate(currentYear, month, day);
        const todayAtMidnight = new Date(currentYear, today.getMonth(), today.getDate());

        return thisYear && thisYear >= todayAtMidnight ? currentYear : currentYear + 1;
    }

    const candidates = [];

    for (let year = currentYear - 3; year <= currentYear + 5; year += 1) {
        const date = validDate(year, month, day);

        if (date && date.getDay() === weekday) {
            candidates.push(date);
        }
    }

    if (!candidates.length) {
        return currentYear;
    }

    candidates.sort(function(first, second) {
        const firstDistance = Math.abs(first.getTime() - today.getTime());
        const secondDistance = Math.abs(second.getTime() - today.getTime());

        return firstDistance === secondDistance
            ? first.getTime() - second.getTime()
            : firstDistance - secondDistance;
    });

    return candidates[0].getFullYear();
};

const formatDateValue = function(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
    ].join('-');
};

const parseGoogleConferenceInfo = function(value, referenceDate) {
    const lines = String(value || '')
        .split(/\r?\n/)
        .map(cleanLine)
        .filter(Boolean);
    const dateLineIndex = lines.findIndex(function(line) {
        return DATE_LINE_PATTERN.test(line);
    });

    if (!lines.length) {
        throw new Error('Paste the conference info from Google Calendar first.');
    }

    if (dateLineIndex < 0) {
        throw new Error('The event date and time could not be found in the pasted conference info.');
    }

    const dateMatch = lines[dateLineIndex].match(DATE_LINE_PATTERN);
    const month = MONTHS[dateMatch[2].toLowerCase()];
    const day = Number(dateMatch[3]);
    const specifiedYear = dateMatch[4] ? Number(dateMatch[4]) : null;
    const weekday = dateMatch[1] ? WEEKDAYS[dateMatch[1].toLowerCase()] : null;
    const today = referenceDate instanceof Date ? referenceDate : new Date();
    const year = specifiedYear || inferYear(month, day, weekday, today);
    const date = typeof month === 'number' ? validDate(year, month, day) : null;
    const startsAt = parseTime(dateMatch[5]);
    const endsAt = parseTime(dateMatch[6]);
    const meetMatch = lines.join('\n').match(GOOGLE_MEET_PATTERN);
    const title = lines.slice(0, dateLineIndex).join(' ').replace(/^["“]|["”]$/g, '').trim();

    if (!title) {
        throw new Error('The event title could not be found in the pasted conference info.');
    }

    if (!date || !startsAt || !endsAt) {
        throw new Error('The event date and time could not be read from the pasted conference info.');
    }

    if (endsAt <= startsAt) {
        throw new Error('The event end time must be later than its start time.');
    }

    if (!meetMatch) {
        throw new Error('A Google Meet video call link could not be found in the pasted conference info.');
    }

    const meetingUrl = meetMatch[0].replace(/[.,;:]+$/, '');

    return {
        title,
        date: formatDateValue(date),
        startsAt,
        endsAt,
        meetingUrl: /^https?:\/\//i.test(meetingUrl) ? meetingUrl : `https://${meetingUrl}`,
    };
};

window.parseGoogleCalendarConferenceInfo = parseGoogleConferenceInfo;

const showModal = function(modal) {
    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).show();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('show');
    }
};

const hideModal = function(modal) {
    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).hide();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('hide');
    }
};

const transitionModals = function(fromModal, toModal, callback) {
    let transitioned = false;
    const finish = function() {
        if (transitioned) {
            return;
        }

        transitioned = true;
        if (typeof callback === 'function') {
            callback();
        }
        showModal(toModal);
    };

    if (fromModal && fromModal.classList.contains('show')) {
        fromModal.addEventListener('hidden.bs.modal', finish, { once: true });
        hideModal(fromModal);
        window.setTimeout(finish, 250);
        return;
    }

    finish();
};

const hasOption = function(select, value) {
    return select && Array.from(select.options).some(function(option) {
        return option.value === value;
    });
};

const supportedEventTime = function(value) {
    const parts = String(value || '').split(':');
    const minutes = (Number(parts[0]) * 60) + Number(parts[1]);

    return parts.length === 2
        && Number.isInteger(minutes)
        && minutes >= 7 * 60
        && minutes <= 23 * 60
        && minutes % 15 === 0;
};

const applyConferenceInfo = function(form, parsed) {
    const nameInput = form.elements.namedItem('name');
    const dateInput = form.elements.namedItem('scheduled_date');
    const startSelect = form.elements.namedItem('starts_at');
    const endSelect = form.elements.namedItem('ends_at');
    const locationType = form.elements.namedItem('location_type');
    const meetingUrl = form.elements.namedItem('meeting_url');

    if (!supportedEventTime(parsed.startsAt) || !supportedEventTime(parsed.endsAt)) {
        throw new Error('The event times must use 15-minute increments between 7:00 AM and 11:00 PM.');
    }

    if (typeof window.initializeEventTimeFields === 'function') {
        window.initializeEventTimeFields(form);
    }

    nameInput.value = parsed.title;
    dateInput.value = parsed.date;
    startSelect.value = parsed.startsAt;
    nameInput.dispatchEvent(new window.Event('change', { bubbles: true }));
    dateInput.dispatchEvent(new window.Event('change', { bubbles: true }));
    startSelect.dispatchEvent(new window.Event('change', { bubbles: true }));

    if (!hasOption(endSelect, parsed.endsAt)) {
        throw new Error('The event end time is outside the available time range.');
    }

    endSelect.value = parsed.endsAt;
    endSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
    locationType.value = 'online';
    meetingUrl.value = parsed.meetingUrl;

    if (typeof window.refreshEventLocationFields === 'function') {
        window.refreshEventLocationFields(form);
    }

    meetingUrl.dispatchEvent(new window.Event('change', { bubbles: true }));
};

const initialize = function() {
    const importModal = document.getElementById(IMPORT_MODAL_ID);
    const createModal = document.getElementById(CREATE_MODAL_ID);

    if (!importModal || !createModal || importModal.googleConferenceImportInitialized) {
        return;
    }

    const form = createModal.querySelector('form');
    const importer = importModal.querySelector('[data-google-conference-import]');

    if (!form || !importer) {
        return;
    }

    const textarea = importer.querySelector('[data-google-conference-import-text]');
    const error = importer.querySelector('[data-google-conference-import-error]');
    const applyButton = importer.querySelector('[data-google-conference-import-apply]');
    const importNotificationToggle = importer.querySelector('[data-google-conference-import-notification-toggle]');
    const importNotificationOptions = importer.querySelector('[data-google-conference-import-notification-options]');
    const importNotificationMinutes = importer.querySelector('[data-google-conference-import-notification-minutes]');
    const formNotificationToggle = form.querySelector('[data-event-notification-toggle]');
    const formNotificationMinutes = form.elements.namedItem('notification_minutes_before');
    let returnToCreate = false;

    if (!textarea || !error || !applyButton) {
        return;
    }

    importModal.googleConferenceImportInitialized = true;

    const clearError = function() {
        error.textContent = '';
        error.hidden = true;
    };

    const displayError = function(message) {
        error.textContent = message;
        error.hidden = false;
    };

    const refreshImportNotificationFields = function() {
        if (importNotificationOptions && importNotificationToggle) {
            importNotificationOptions.hidden = !importNotificationToggle.checked;
        }
    };

    const syncNotificationFieldsFromForm = function() {
        if (!importNotificationToggle || !formNotificationToggle) {
            return;
        }

        importNotificationToggle.checked = formNotificationToggle.checked;
        if (importNotificationMinutes && formNotificationMinutes) {
            importNotificationMinutes.value = formNotificationMinutes.value;
        }
        refreshImportNotificationFields();
    };

    const applyNotificationFieldsToForm = function() {
        if (!importNotificationToggle || !formNotificationToggle) {
            return;
        }

        formNotificationToggle.checked = importNotificationToggle.checked;
        if (importNotificationMinutes && formNotificationMinutes) {
            formNotificationMinutes.value = importNotificationMinutes.value;
        }
        formNotificationToggle.dispatchEvent(new window.Event('change', { bubbles: true }));
    };

    createModal.querySelectorAll('[data-google-conference-import-open]').forEach(function(button) {
        button.addEventListener('click', function() {
            clearError();
            syncNotificationFieldsFromForm();
            returnToCreate = true;
            transitionModals(createModal, importModal, function() {
                window.setTimeout(function() {
                    textarea.focus();
                }, 100);
            });
        });
    });

    const importValue = function() {
        try {
            const parsed = parseGoogleConferenceInfo(textarea.value);

            applyConferenceInfo(form, parsed);
            applyNotificationFieldsToForm();
            clearError();
            hideModal(importModal);
        } catch (importError) {
            displayError(importError.message || 'The conference info could not be imported.');
        }
    };

    if (importNotificationToggle) {
        importNotificationToggle.addEventListener('change', refreshImportNotificationFields);
    }

    applyButton.addEventListener('click', importValue);
    textarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            importValue();
        }
    });

    importModal.addEventListener('hidden.bs.modal', function() {
        if (!returnToCreate) {
            return;
        }

        returnToCreate = false;
        showModal(createModal);
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
