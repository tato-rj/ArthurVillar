const DATE_LINE_PATTERN = /^(?:([A-Za-z]+)\s*,\s*)?([A-Za-z]+)\.?\s+(\d{1,2})(?:\s*,\s*(\d{4}))?\s*(?:[·⋅•]|\bat\b)\s*(\d{1,2}(?::\d{2})?)\s*((?:a|p)\.?\s*m\.?)?\s*[–—−-]\s*(\d{1,2}(?::\d{2})?)\s*((?:a|p)\.?\s*m\.?)?$/i;
const GOOGLE_MEET_PATTERN = /(?:https?:\/\/)?meet\.google\.com\/[a-z\d-]+(?:[/?#][^\s<>\])"']*)?/i;
const MONTHS = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11,
};
const WEEKDAYS = {
    sun: 0,
    sunday: 0,
    mon: 1,
    monday: 1,
    tue: 2,
    tues: 2,
    tuesday: 2,
    wed: 3,
    wednesday: 3,
    thu: 4,
    thur: 4,
    thurs: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
};

const cleanLine = function(value) {
    return String(value || '')
        .replace(/[\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000]/g, ' ')
        .replace(/[\u200b-\u200f\u202a-\u202e\u2060\u2066-\u2069\ufeff]/g, '')
        .replace(/\\_/g, '_')
        .trim();
};

const normalizeMeridiem = function(value) {
    const meridiem = cleanLine(value).replace(/[.\s]/g, '').toLowerCase();

    return ['am', 'pm'].includes(meridiem) ? meridiem : null;
};

const parseTime = function(value, fallbackMeridiem) {
    const match = cleanLine(value).match(/^(\d{1,2})(?::(\d{2}))?\s*((?:a|p)\.?\s*m\.?)?$/i);

    if (!match) {
        return null;
    }

    let hour = Number(match[1]);
    const minute = Number(match[2] || 0);
    const meridiem = normalizeMeridiem(match[3] || fallbackMeridiem);

    if (minute > 59 || (meridiem ? hour < 1 || hour > 12 : hour < 0 || hour > 23)) {
        return null;
    }

    if (meridiem === 'am') {
        hour = hour === 12 ? 0 : hour;
    } else if (meridiem === 'pm') {
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
    const month = MONTHS[dateMatch[2].replace(/\.$/, '').toLowerCase()];
    const day = Number(dateMatch[3]);
    const specifiedYear = dateMatch[4] ? Number(dateMatch[4]) : null;
    const weekday = dateMatch[1] ? WEEKDAYS[dateMatch[1].replace(/\.$/, '').toLowerCase()] : null;
    const today = referenceDate instanceof Date ? referenceDate : new Date();
    const year = specifiedYear || inferYear(month, day, weekday, today);
    const date = typeof month === 'number' ? validDate(year, month, day) : null;
    // Google often includes the meridiem only once when both times share it.
    // Accept it on either side, and accept period-free 24-hour time as well.
    const startsAt = parseTime(dateMatch[5], dateMatch[6] || dateMatch[8]);
    const endsAt = parseTime(dateMatch[7], dateMatch[8] || dateMatch[6]);
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
    const meetingUrl = form.elements.namedItem('meeting_url');
    const standardFields = form.querySelector('[data-event-standard-fields]');

    if (!supportedEventTime(parsed.startsAt) || !supportedEventTime(parsed.endsAt)) {
        throw new Error('The event times must use 15-minute increments between 7:00 AM and 11:00 PM.');
    }

    if (!nameInput || !dateInput || !startSelect || !endSelect || !meetingUrl) {
        throw new Error('The event form is missing a field required for this import.');
    }

    if (typeof window.initializeEventTimeFields === 'function') {
        window.initializeEventTimeFields(form);
    }

    if (standardFields) {
        standardFields.disabled = false;
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
    meetingUrl.value = parsed.meetingUrl;
    meetingUrl.dispatchEvent(new window.Event('change', { bubbles: true }));
};

const initializeImporter = function(importer) {
    if (!importer || importer.googleConferenceImportInitialized) {
        return;
    }

    const form = importer.closest('form');

    if (!form) {
        return;
    }

    const textarea = importer.querySelector('[data-google-conference-import-text]');
    const error = importer.querySelector('[data-google-conference-import-error]');
    const locationType = form.elements.namedItem('location_type');

    if (!textarea || !error || !locationType) {
        return;
    }

    importer.googleConferenceImportInitialized = true;

    const clearError = function() {
        error.textContent = '';
        error.hidden = true;
    };

    const displayError = function(message) {
        error.textContent = message;
        error.hidden = false;
    };

    form.addEventListener('submit', function(event) {
        if (locationType.value !== 'google_calendar') {
            return;
        }

        try {
            const parsed = parseGoogleConferenceInfo(textarea.value);

            applyConferenceInfo(form, parsed);
            clearError();
        } catch (importError) {
            event.preventDefault();
            displayError(importError.message || 'The conference info could not be imported.');
            if (typeof window.refreshEventLocationFields === 'function') {
                window.refreshEventLocationFields(form, 'google_calendar');
            }
            textarea.focus();
        }
    });

    textarea.addEventListener('input', clearError);
    textarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            form.requestSubmit();
        }
    });

    form.addEventListener('reset', function() {
        window.setTimeout(function() {
            textarea.value = '';
            clearError();
        }, 0);
    });
};

const initialize = function() {
    document.querySelectorAll('[data-google-conference-import]').forEach(initializeImporter);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
