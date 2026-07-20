const calendarjs = window.calendarjs;

const state = {
    date: null,
    miniDate: null,
    view: 'week',
    instance: null,
    events: [],
    customEvents: [],
    plannedLessons: [],
    singleLessonPlans: [],
    locations: [],
    selectedLocationIds: [],
    visibleEventsByDate: null,
    holidays: [],
    showHolidays: true,
    teachingBreaks: [],
    recitals: [],
    generalEvents: [],
    selectedEventTypes: ['recurring', 'single', 'general'],
    studentSearch: '',
    loadedRange: null,
    pendingRangeKey: null,
    scheduleObserver: null,
    schedulePatchFrame: null,
    scheduleLabelFrame: null,
    schedulePointerTimer: null,
    rescheduleDatePickerDate: null,
    generalEventRescheduleDatePickerDate: null,
    rescheduleDurationMinutes: 15,
    rescheduleAnchor: null,
    paymentTotalCounters: {},
    calendarFetchId: 0,
    didAutoNowScroll: false,
    birthdayWindow: 5,
    suppressNextScheduleAnimation: false,
};

const calendarTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';

const monthFormatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    timeZone: calendarTimeZone,
    year: 'numeric',
});

const shortMonthFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    timeZone: calendarTimeZone,
});

const birthdayMonthFormatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    timeZone: calendarTimeZone,
});

const dayFormatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    timeZone: calendarTimeZone,
    year: 'numeric',
});

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthWeekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const calendarViews = ['schedule', 'day', '2-days', 'week', 'month'];
const scheduleStart = '07:00';
const scheduleEnd = '22:00';
const sidebarHiddenQuery = '(max-width: 1000px)';
const dayMilliseconds = 24 * 60 * 60 * 1000;

const scheduleGridViews = ['day', '2-days', 'week'];

const createLocalDate = function(year, month, day) {
    return new Date(year, month, day, 12, 0, 0, 0);
};

const toDateString = function(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const todayString = function() {
    return toDateString(getTodayDate());
};

const parseDateString = function(value) {
    const parts = String(value).split('-').map(Number);

    return createLocalDate(parts[0], parts[1] - 1, parts[2]);
};

const isDateString = function(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
};

const isValidDate = function(date) {
    return date instanceof Date && !Number.isNaN(date.getTime());
};

const normalizeBirthdayWindow = function(value) {
    const windowDays = Number(value);

    return Number.isFinite(windowDays) && windowDays >= 0 ? Math.floor(windowDays) : 5;
};

const parseUrlDate = function(value) {
    if (!isDateString(value)) {
        return null;
    }

    const date = parseDateString(value);

    return toDateString(date) === value ? date : null;
};

const parseNullableDateString = function(value) {
    return value ? parseDateString(String(value).substring(0, 10)) : null;
};

const getDefaultCalendarView = function() {
    const isMobile = window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches;
    const configuredView = isMobile
        ? window.calendarDefaultMobileCalendarView
        : window.calendarDefaultDesktopCalendarView;

    if (calendarViews.includes(configuredView)) {
        return configuredView;
    }

    return isMobile ? '2-days' : 'week';
};

const isSidebarHiddenViewport = function() {
    return window.matchMedia && window.matchMedia(sidebarHiddenQuery).matches;
};

const getUrlState = function() {
    const params = new URLSearchParams(window.location.search);
    const requestedView = params.get('view');
    const view = requestedView === '3-days' ? '2-days' : requestedView;
    const date = params.get('date');

    return {
        view: calendarViews.includes(view) ? view : getDefaultCalendarView(),
        date: parseUrlDate(date),
    };
};

const updateCalendarUrl = function() {
    const url = new URL(window.location.href);

    url.searchParams.set('view', state.view);
    url.searchParams.set('date', toDateString(state.date));
    window.history.replaceState({
        calendarView: state.view,
        calendarDate: toDateString(state.date),
    }, '', url);
};

const normalizeRange = function(range) {
    if (!range || !range.start || !range.end) {
        return null;
    }

    const start = typeof range.start === 'string' ? range.start : toDateString(range.start);
    const end = typeof range.end === 'string' ? range.end : toDateString(range.end);

    return { start, end };
};

const getRangeKey = function(range) {
    const normalizedRange = normalizeRange(range);

    return normalizedRange ? `${normalizedRange.start}:${normalizedRange.end}` : '';
};

const isRangeLoaded = function(range) {
    return getRangeKey(state.loadedRange) === getRangeKey(range);
};

const getTodayDate = function() {
    const now = new Date();

    return createLocalDate(now.getFullYear(), now.getMonth(), now.getDate());
};

const setSelectedDate = function(date) {
    state.date = cloneDate(date);
    state.miniDate = cloneDate(state.date);
    state.didAutoNowScroll = false;
};

const getVisibleDateRange = function() {
    if (state.view === 'schedule') {
        const start = createLocalDate(state.date.getFullYear(), state.date.getMonth() - 1, 1);
        const end = createLocalDate(state.date.getFullYear(), state.date.getMonth() + 5, 0);

        return { start, end };
    }

    if (state.view === 'day') {
        return {
            start: cloneDate(state.date),
            end: cloneDate(state.date),
        };
    }

    if (state.view === '2-days') {
        return {
            start: cloneDate(state.date),
            end: addDays(state.date, 1),
        };
    }

    if (state.view === 'week') {
        const start = startOfWeek(state.date);

        return {
            start,
            end: addDays(start, 6),
        };
    }

    if (state.view === 'month') {
        const start = startOfMonthGrid(state.date);

        return {
            start,
            end: addDays(start, 41),
        };
    }

    const start = startOfWeek(state.date);

    return {
        start,
        end: addDays(start, 6),
    };
};

const getCalendarEventRange = function() {
    if (state.view === 'schedule') {
        return getVisibleDateRange();
    }

    const year = state.date.getFullYear();

    return {
        start: createLocalDate(year - 1, 0, 1),
        end: createLocalDate(year + 1, 11, 31),
    };
};

const fetchPlannedLessons = function(range) {
    const normalizedRange = normalizeRange(range);

    if (!normalizedRange) {
        return Promise.resolve();
    }

    const rangeKey = getRangeKey(normalizedRange);

    if (state.pendingRangeKey === rangeKey) {
        return Promise.resolve();
    }

    const url = new URL(window.location.href);

    url.searchParams.set('view', state.view);
    url.searchParams.set('date', toDateString(state.date));
    url.searchParams.set('range_start', normalizedRange.start);
    url.searchParams.set('range_end', normalizedRange.end);
    url.searchParams.set('lesson_plans', '1');
    state.pendingRangeKey = rangeKey;
    state.calendarFetchId += 1;

    const fetchId = state.calendarFetchId;

    return fetch(url, {
        headers: {
            Accept: 'application/json',
        },
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Unable to load calendar lessons.');
            }

            return response.json();
        })
        .then(function(payload) {
            if (fetchId !== state.calendarFetchId || getRangeKey(getVisibleDateRange()) !== rangeKey) {
                return;
            }

            state.plannedLessons = Array.isArray(payload.plannedLessons) ? payload.plannedLessons : [];
            state.singleLessonPlans = Array.isArray(payload.singleLessonPlans) ? payload.singleLessonPlans : [];
            state.holidays = Array.isArray(payload.holidays) ? payload.holidays : [];
            state.teachingBreaks = Array.isArray(payload.teachingBreaks) ? payload.teachingBreaks : [];
            state.recitals = Array.isArray(payload.recitals) ? payload.recitals : [];
            state.generalEvents = Array.isArray(payload.generalEvents) ? payload.generalEvents : [];
            state.loadedRange = normalizeRange(payload.calendarRange) || normalizedRange;
        })
        .catch(function(error) {
            if (fetchId !== state.calendarFetchId) {
                return;
            }

            console.error(error);
            state.loadedRange = normalizedRange;
        })
        .finally(function() {
            if (state.pendingRangeKey === rangeKey && fetchId === state.calendarFetchId) {
                state.pendingRangeKey = null;
            }
        });
};

const getVisibleScheduleDates = function() {
    return getScheduleDatesForAnchor(state.date, state.view);
};

const getScheduleDatesForAnchor = function(anchor, view) {
    if (view === 'day') {
        return [cloneDate(anchor)];
    }

    if (view === '2-days') {
        return Array.from({ length: 2 }, function(_, index) {
            return addDays(anchor, index);
        });
    }

    const start = startOfWeek(anchor);

    return Array.from({ length: 7 }, function(_, index) {
        return addDays(start, index);
    });
};

const getTwoDaysBackingStart = function() {
    return startOfWeek(state.date);
};

const getTwoDaysBackingDateForIndex = function(index) {
    return addDays(getTwoDaysBackingStart(), index);
};

const getTwoDaysBackingDateForVisibleDate = function(dateString) {
    const visibleIndex = getVisibleScheduleDates().map(toDateString).indexOf(String(dateString).substring(0, 10));

    if (visibleIndex < 0) {
        return null;
    }

    return toDateString(getTwoDaysBackingDateForIndex(visibleIndex));
};

const getScheduleDateForGridIndex = function(index) {
    if (state.view === '2-days') {
        const visibleDates = getVisibleScheduleDates();

        return visibleDates[index] ? cloneDate(visibleDates[index]) : getTwoDaysBackingDateForIndex(index);
    }

    if (state.view === 'week') {
        return addDays(startOfWeek(state.date), index);
    }

    return getVisibleScheduleDates()[index] ? cloneDate(getVisibleScheduleDates()[index]) : null;
};

const getScheduleGridDates = function() {
    const length = state.view === 'day' ? 1 : 7;

    return Array.from({ length }, function(_, index) {
        return getScheduleDateForGridIndex(index);
    }).filter(Boolean);
};

const getDateRangeDates = function(range) {
    const dates = [];

    if (!range || !range.start || !range.end) {
        return dates;
    }

    for (let date = cloneDate(range.start); date <= range.end; date = addDays(date, 1)) {
        dates.push(date);
    }

    return dates;
};

const getScheduleValue = function() {
    if (state.view === '2-days') {
        return toDateString(addDays(getTwoDaysBackingStart(), 1));
    }

    if (scheduleGridViews.includes(state.view)) {
        return toDateString(addDays(state.date, 1));
    }

    return toDateString(state.date);
};

const patchScheduleHeaders = function(calendar) {
    const schedule = calendar.querySelector('.lm-schedule');
    const headerRow = schedule ? schedule.querySelector('thead tr:not(.calendar-schedule-holiday-row)') : null;
    const headers = headerRow ? headerRow.querySelectorAll('td') : [];
    const firstScheduleRow = schedule ? schedule.querySelector('tbody tr') : null;
    const columns = firstScheduleRow ? firstScheduleRow.querySelectorAll('td[data-date]') : [];
    const gridDates = getScheduleGridDates();

    headers.forEach(function(header) {
        header.removeAttribute('data-selected');
        header.removeAttribute('data-real-date');
        header.classList.remove('calendar-schedule-hidden-column');
    });

    columns.forEach(function(column, index) {
        const date = gridDates[index];

        if (!date) {
            return;
        }

        const dateString = toDateString(date);
        const columnX = column.getAttribute('data-x');
        const header = headers[index + 1];
        const isHidden = state.view === '2-days' && index > 1;

        schedule.querySelectorAll(`tbody td[data-x="${columnX}"]`).forEach(function(cell) {
            cell.setAttribute('data-date', dateString);
            cell.setAttribute('data-real-date', dateString);
            cell.classList.toggle('calendar-schedule-hidden-column', isHidden);
        });

        if (!header) {
            return;
        }

        header.classList.toggle('calendar-schedule-hidden-column', isHidden);
        header.textContent = String(date.getDate()).padStart(2, '0');
        header.setAttribute('data-weekday', weekdays[date.getDay()]);
        header.setAttribute('data-real-date', dateString);

        if (dateString === todayString()) {
            header.setAttribute('data-selected', 'true');
        } else {
            header.removeAttribute('data-selected');
        }
    });
};

const formatScheduleHour = function(value) {
    const text = String(value).trim();
    const match = text.match(/^(\d{1,2})(?::\d{2})/);

    if (!match) {
        return text;
    }

    const hour = Number(match[1]);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    return `${displayHour} ${period}`;
};

const patchScheduleTimeLabels = function(calendar) {
    calendar.querySelectorAll('.lm-schedule-index').forEach(function(label) {
        const time = label.dataset.scheduleTime || label.textContent;

        label.dataset.scheduleTime = time;
        label.textContent = getTimeMinutes(time) === getTimeMinutes(scheduleStart)
            ? ''
            : formatScheduleHour(time);
        label.setAttribute('aria-hidden', getTimeMinutes(time) === getTimeMinutes(scheduleStart) ? 'true' : 'false');
    });
};

const getTimeMinutes = function(value) {
    const match = String(value || '').match(/^(\d{1,2}):(\d{2})/);

    if (!match) {
        return 0;
    }

    return (Number(match[1]) * 60) + Number(match[2]);
};

const isEventInsideScheduleWindow = function(event) {
    const start = getTimeMinutes(event.start);

    return start >= getTimeMinutes(scheduleStart) && start < getTimeMinutes(scheduleEnd);
};

const getEventDurationMinutes = function(event) {
    if (!event || !event.start || !event.end) {
        return 30;
    }

    return Math.max(15, getTimeMinutes(event.end) - getTimeMinutes(event.start));
};

const getAgendaEventHeight = function(event) {
    const duration = getEventDurationMinutes(event);

    return `${Math.min(10, Math.max(3.75, 2 + (duration / 15)))}rem`;
};

const normalizeLocationId = function(value) {
    const number = Number(value);

    return Number.isFinite(number) && number > 0 ? number : null;
};

const getAllLocationIds = function() {
    return state.locations.map(function(location) {
        return normalizeLocationId(location.id);
    }).filter(Boolean);
};

const getSelectedLocationIds = function() {
    return state.selectedLocationIds;
};

const isLocationFilterActive = function() {
    const allIds = getAllLocationIds();

    return allIds.length && state.selectedLocationIds.length < allIds.length;
};

const locationIsSelected = function(locationId) {
    const selectedIds = getSelectedLocationIds();
    const normalized = normalizeLocationId(locationId);

    return !normalized || selectedIds.includes(normalized);
};

const eventMatchesLocationFilter = function(event) {
    if (!isLocationFilterActive() || event.isHoliday) {
        return true;
    }

    if (event.isBreak) {
        const locations = Array.isArray(event.locations) ? event.locations : [];

        return !locations.length || locations.some(function(location) {
            return locationIsSelected(location.id);
        });
    }

    return locationIsSelected(event.locationId);
};

const getVisibleCalendarEvents = function() {
    return state.events
        .filter(isEventInsideScheduleWindow)
        .filter(eventMatchesLocationFilter);
};

const getScheduleRenderEvents = function() {
    const events = getVisibleCalendarEvents();

    if (state.view !== '2-days') {
        return events;
    }

    return events
        .filter(isEventInsideVisibleRange)
        .map(function(event) {
            const backingDate = getTwoDaysBackingDateForVisibleDate(event.date);

            if (!backingDate) {
                return null;
            }

            return Object.assign({}, event, {
                date: backingDate,
            });
        })
        .filter(Boolean);
};

const getVisibleEventsByDate = function() {
    if (state.visibleEventsByDate) {
        return state.visibleEventsByDate;
    }

    const eventsByDate = {};

    getVisibleCalendarEvents().forEach(function(event) {
        if (!event || !event.date) {
            return;
        }

        const dateString = String(event.date).substring(0, 10);

        if (!eventsByDate[dateString]) {
            eventsByDate[dateString] = [];
        }

        eventsByDate[dateString].push(event);
    });

    Object.keys(eventsByDate).forEach(function(dateString) {
        eventsByDate[dateString].sort(function(a, b) {
            return String(a.start || '').localeCompare(String(b.start || ''));
        });
    });

    state.visibleEventsByDate = eventsByDate;

    return eventsByDate;
};

const paymentFormatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
});

const paymentCountUpOptions = {
    decimalPlaces: 0,
    prefix: '$',
};

const randomBetween = function(min, max) {
    return min + (Math.random() * (max - min));
};

const getEventFeeAmount = function(event) {
    const amount = Number(event && event.feeAmount ? event.feeAmount : 0);

    return Number.isFinite(amount) ? amount : 0;
};

const renderLessonModalTitle = function(title, event) {
    if (!title) {
        return;
    }

    const feeAmount = getEventFeeAmount(event);

    title.textContent = '';
    title.appendChild(document.createTextNode(event && event.title ? event.title : 'Lesson'));

    if (feeAmount <= 0) {
        return;
    }

    const fee = document.createElement('span');

    fee.className = 'ml-2 opacity-4';
    fee.textContent = paymentFormatter.format(feeAmount / 100);
    title.appendChild(fee);
};

const renderCountTotal = function(key, element, value, options, fallbackFormatter) {
    if (!element) {
        return;
    }

    const number = Number(value);
    const counter = state.paymentTotalCounters[key];
    const startVal = counter && counter.element === element
        ? counter.value
        : Number(element.dataset.countValue || 0);
    const safeStartVal = Number.isFinite(startVal) ? startVal : 0;
    const safeNumber = Number.isFinite(number) ? number : 0;
    const formatter = options && typeof options.formattingFn === 'function'
        ? options.formattingFn
        : (typeof fallbackFormatter === 'function'
            ? fallbackFormatter
            : function(nextValue) {
                return String(nextValue);
            });

    if (counter && counter.frame) {
        cancelAnimationFrame(counter.frame);
    }

    if (Math.abs(safeNumber - safeStartVal) < 0.001) {
        element.textContent = formatter(safeNumber);
        element.dataset.countValue = String(safeNumber);
        state.paymentTotalCounters[key] = {
            element,
            frame: null,
            value: safeNumber,
        };

        return;
    }

    const duration = Math.round(randomBetween(520, 980));
    const start = window.performance && typeof window.performance.now === 'function'
        ? window.performance.now()
        : Date.now();
    const change = safeNumber - safeStartVal;
    const easeOutCubic = function(progress) {
        return 1 - Math.pow(1 - progress, 3);
    };
    const renderFrame = function(now) {
        const elapsed = now - start;
        const progress = Math.min(1, Math.max(0, elapsed / duration));
        const nextValue = safeStartVal + (change * easeOutCubic(progress));
        const safeNextValue = Number.isFinite(nextValue) ? nextValue : safeNumber;
        const latest = state.paymentTotalCounters[key];

        if (!latest || latest.element !== element) {
            return;
        }

        element.textContent = formatter(progress >= 1 ? safeNumber : safeNextValue);
        element.dataset.countValue = String(safeNextValue);
        latest.value = safeNextValue;

        if (progress < 1) {
            latest.frame = requestAnimationFrame(renderFrame);
            return;
        }

        latest.frame = null;
        latest.value = safeNumber;
        element.dataset.countValue = String(safeNumber);
    };

    state.paymentTotalCounters[key] = {
        element,
        frame: requestAnimationFrame(renderFrame),
        value: safeStartVal,
    };
};

const renderPaymentTotal = function(key, element, cents) {
    renderCountTotal(key, element, cents / 100, Object.assign({}, paymentCountUpOptions, {
        formattingFn: function(value) {
            const number = Number(value);

            return paymentFormatter.format(Number.isFinite(number) ? number : 0);
        },
    }), function(value) {
        const number = Number(value);

        return paymentFormatter.format(Number.isFinite(number) ? number : 0);
    });
};

const formatHoursMinutes = function(minutes) {
    const safeMinutes = Number.isFinite(Number(minutes)) ? Math.round(Number(minutes)) : 0;
    const hours = Math.floor(safeMinutes / 60);
    const remainingMinutes = safeMinutes % 60;

    if (hours && remainingMinutes) {
        return `${hours}h ${remainingMinutes}m`;
    }

    if (hours) {
        return `${hours}h`;
    }

    if (!remainingMinutes) {
        return '0h';
    }

    return `${remainingMinutes}m`;
};

const formatQuarterHours = function(minutes) {
    const safeMinutes = Number.isFinite(Number(minutes)) ? Number(minutes) : 0;
    const hours = Math.round((safeMinutes / 60) * 4) / 4;

    return `${Number(hours.toFixed(2))}h`;
};

const getVisibleAverageHoursDayCount = function() {
    if (state.view === '2-days') {
        return 2;
    }

    if (state.view === 'week') {
        return 7;
    }

    if (state.view === 'month') {
        return createLocalDate(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDate();
    }

    return 0;
};

const isEventInsideVisibleRange = function(event) {
    if (!event || !event.date) {
        return false;
    }

    const range = getVisibleDateRange();
    const date = parseDateString(String(event.date).substring(0, 10));

    return date >= range.start && date <= range.end;
};

const isEventInsidePaymentRange = function(event) {
    if (!event || !event.date) {
        return false;
    }

    if (state.view !== 'month') {
        return isEventInsideVisibleRange(event);
    }

    const date = parseDateString(String(event.date).substring(0, 10));
    const start = createLocalDate(state.date.getFullYear(), state.date.getMonth(), 1);
    const end = createLocalDate(state.date.getFullYear(), state.date.getMonth() + 1, 0);

    return date >= start && date <= end;
};

const getVisiblePaymentEvents = function() {
    return getVisibleCalendarEvents()
        .filter(function(event) {
            if (state.view !== 'schedule') {
                return isEventInsidePaymentRange(event);
            }

            return event.date === toDateString(state.date);
        })
        .filter(function(event) {
            return (event.lessonPlanId || event.singleLessonPlanId) && !event.isHoliday;
        });
};

const formatNameList = function(names) {
    if (!names.length) {
        return '';
    }

    if (names.length === 1) {
        return names[0];
    }

    if (names.length === 2) {
        return `${names[0]} and ${names[1]}`;
    }

    return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
};

const renderCalendarBirthdayInsights = function(container, names) {
    if (!container) {
        return;
    }

    const label = container.querySelector('span');
    const formattedNames = formatNameList(names);

    container.style.display = formattedNames ? '' : 'none';

    if (label) {
        label.textContent = formattedNames;
    }
};

const renderCalendarPaymentTotals = function() {
    const expected = document.querySelector('[data-calendar-expected-payment]');
    const confirmed = document.querySelector('[data-calendar-confirmed-payment]');
    const lessonsCount = document.querySelector('[data-calendar-lessons-count]');
    const hoursCount = document.querySelector('[data-calendar-hours-count]');
    const averageHours = document.querySelector('[data-calendar-average-hours]');
    const birthdayInsights = document.getElementById('calendar-calendar-insights-birthdays');

    if (!expected && !confirmed && !lessonsCount && !hoursCount && !averageHours && !birthdayInsights) {
        return;
    }

    const visiblePaymentEvents = getVisiblePaymentEvents();
    const totals = visiblePaymentEvents.reduce(function(carry, event) {
        const feeAmount = getEventFeeAmount(event);

        if (event.lessonStatus !== 'canceled' && event.calendarStatus !== 'canceled') {
            carry.expected += feeAmount;
            carry.lessons += 1;
            carry.minutes += getEventDurationMinutes(event);
        }

        if (event.lessonStatus === 'paid') {
            carry.confirmed += feeAmount;
        }

        return carry;
    }, {
        confirmed: 0,
        expected: 0,
        lessons: 0,
        minutes: 0,
    });
    const birthdayNames = [];
    const birthdayNameKeys = new Set();

    visiblePaymentEvents.forEach(function(event) {
        const name = event.studentFirstName || '';
        const key = name.toLowerCase();

        if (!name || !event.hasBirthdayNearEvent || birthdayNameKeys.has(key)) {
            return;
        }

        birthdayNameKeys.add(key);
        birthdayNames.push(name);
    });

    renderCalendarBirthdayInsights(birthdayInsights, birthdayNames);

    renderPaymentTotal('expected', expected, totals.expected);
    renderPaymentTotal('confirmed', confirmed, totals.confirmed);

    renderCountTotal('lessons', lessonsCount, totals.lessons, {
        decimalPlaces: 0,
        formattingFn: function(value) {
            const number = Number(value);

            return String(Math.round(Number.isFinite(number) ? number : 0));
        },
    }, function(value) {
        const number = Number(value);

        return String(Math.round(Number.isFinite(number) ? number : 0));
    });
    renderCountTotal('hours', hoursCount, totals.minutes, {
        decimalPlaces: 0,
        formattingFn: function(value) {
            return formatHoursMinutes(value);
        },
    }, function(value) {
        return formatHoursMinutes(value);
    });

    if (averageHours) {
        const dayCount = getVisibleAverageHoursDayCount();
        const container = averageHours.closest('.mb-3') || averageHours.parentElement;

        if (container) {
            container.style.display = dayCount ? '' : 'none';
        }

        if (dayCount) {
            renderCountTotal('average-hours', averageHours, totals.minutes / dayCount, {
                decimalPlaces: 0,
                formattingFn: function(value) {
                    return `${formatQuarterHours(value)}/day`;
                },
            }, function(value) {
                return `${formatQuarterHours(value)}/day`;
            });
        }
    }
};

const getHolidaysForDateString = function(dateString) {
    if (!state.showHolidays) {
        return [];
    }

    return state.holidays.filter(function(holiday) {
        return holiday.date === dateString;
    });
};

const getHolidaysForDate = function(date) {
    return getHolidaysForDateString(toDateString(date));
};

const getBreakDateString = function(teachingBreak, key) {
    return String(teachingBreak && teachingBreak[key] ? teachingBreak[key] : '').substring(0, 10);
};

const isDateWithinBreak = function(dateString, teachingBreak) {
    const startsOn = getBreakDateString(teachingBreak, 'starts_on');
    const endsOn = getBreakDateString(teachingBreak, 'ends_on');

    return startsOn && endsOn && dateString >= startsOn && dateString <= endsOn;
};

const getBreaksForDateString = function(dateString) {
    return state.teachingBreaks.filter(function(teachingBreak) {
        if (!isDateWithinBreak(dateString, teachingBreak)) {
            return false;
        }

        if (!isLocationFilterActive()) {
            return true;
        }

        const locations = Array.isArray(teachingBreak.locations) ? teachingBreak.locations : [];

        return !locations.length || locations.some(function(location) {
            return locationIsSelected(location.id);
        });
    });
};

const getBreaksForDate = function(date) {
    return getBreaksForDateString(toDateString(date));
};

const getRecitalsForDateString = function(dateString) {
    return state.recitals.filter(function(recital) {
        return String(recital.date || '').substring(0, 10) === dateString;
    });
};

const getRecitalsForDate = function(date) {
    return getRecitalsForDateString(toDateString(date));
};

const eventTimeFormatter = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: calendarTimeZone,
});

const modalDateFormatter = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: calendarTimeZone,
});

const formatEventTime = function(time) {
    if (!time) {
        return '';
    }

    const parts = time.split(':').map(Number);
    const date = new Date(2000, 0, 1, parts[0] || 0, parts[1] || 0);

    return eventTimeFormatter.format(date).replace(':00', '').replace(/\s/g, '').toLowerCase();
};

const formatModalEventTime = function(time) {
    if (!time) {
        return '';
    }

    const parts = time.split(':').map(Number);
    const date = new Date(2000, 0, 1, parts[0] || 0, parts[1] || 0);

    return eventTimeFormatter.format(date).replace(/\s/g, '').toLowerCase();
};

const formatAgendaEventTime = function(time) {
    return formatModalEventTime(time).toUpperCase();
};

const getLessonLocationIcon = function(locationName) {
    const location = String(locationName || '').trim().toLowerCase();

    if (location.includes('home')) {
        return 'house';
    }

    if (location.includes('online')) {
        return 'globe';
    }

    return 'building';
};

const patchScheduleItems = function(calendar) {
    calendar.querySelectorAll('.lm-schedule-item:not([holding-event])').forEach(function(item) {
        const start = item.getAttribute('data-start');
        const end = item.getAttribute('data-end');
        const duration = getTimeMinutes(end) - getTimeMinutes(start);
        const isShort = duration <= 30;
        const event = getEventByScheduleItem(item);
        const cell = item.closest('td[data-date]');
        const visibleDate = cell
            ? (cell.getAttribute('data-real-date') || cell.getAttribute('data-date'))
            : '';
        const iconName = event && event.isGeneralEvent
            ? event.eventTypeIcon
            : getLessonLocationIcon(event ? event.locationName : '');
        const iconTitle = event && event.isGeneralEvent
            ? event.eventType
            : (event && event.locationName ? event.locationName : '');
        let eventIcon = item.querySelector(':scope > .event-icon');

        if (!iconName) {
            if (eventIcon) {
                eventIcon.remove();
                eventIcon = null;
            }
        } else if (!eventIcon) {
            eventIcon = document.createElement('span');
            eventIcon.className = 'event-icon';
            eventIcon.innerHTML = '<i class="fa-solid" aria-hidden="true"></i>';
            item.appendChild(eventIcon);
        }

        if (eventIcon) {
            eventIcon.querySelector('i').className = `fa-solid fa-${iconName}`;
            eventIcon.title = iconTitle;
        }

        item.classList.toggle('is-short', isShort);
        item.classList.toggle('calendar-calendar-general-event', Boolean(event && event.isGeneralEvent));
        item.setAttribute('data-display-time', isShort ? formatEventTime(start) : `${formatEventTime(start)} - ${formatEventTime(end)}`);
        clearScheduleItemBirthdayDecoration(item);

        if (event) {
            item.setAttribute(
                'data-lesson-status',
                event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed')
            );
        }

        applyEventTimeStatusAttributes(item, event, visibleDate);
        applyEventOverlapAttribute(item, event);
    });
};

const animateCalendarLessonItems = function(calendar) {
    if (state.suppressNextScheduleAnimation) {
        calendar.querySelectorAll('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event').forEach(function(item) {
            item.dataset.lessonFadeAnimated = 'true';
        });
        state.suppressNextScheduleAnimation = false;
        return;
    }

    if (!scheduleGridViews.includes(state.view)
        || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
        return;
    }

    const nonLessonStatuses = ['holiday', 'teaching-break', 'recital'];
    const lessonItems = Array.from(calendar.querySelectorAll('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event')).filter(function(item) {
        return !nonLessonStatuses.includes(item.dataset.lessonStatus || '') && item.dataset.lessonFadeAnimated !== 'true';
    });

    lessonItems.forEach(function(item, index) {
        item.dataset.lessonFadeAnimated = 'true';
        item.style.setProperty('--calendar-lesson-fade-delay', `${index * 30}ms`);
        item.style.setProperty('--calendar-lesson-fade-opacity', window.getComputedStyle(item).opacity || '1');
        item.classList.add('calendar-calendar-lesson-fade-in');
        item.addEventListener('animationend', function() {
            item.classList.remove('calendar-calendar-lesson-fade-in');
            item.style.removeProperty('--calendar-lesson-fade-delay');
            item.style.removeProperty('--calendar-lesson-fade-opacity');
        }, { once: true });
    });
};

const patchScheduleHolidays = function(calendar) {
    const schedule = calendar.querySelector('.lm-schedule');
    const thead = schedule ? schedule.querySelector('thead') : null;

    if (!schedule || !thead || !scheduleGridViews.includes(state.view)) {
        return;
    }

    thead.querySelectorAll('.calendar-schedule-holiday-row').forEach(function(row) {
        row.remove();
    });

    const headerRow = thead.querySelector('tr');
    const headerHeight = headerRow ? headerRow.offsetHeight : 0;

    schedule.style.setProperty('--calendar-schedule-header-height', `${headerHeight}px`);

    const visibleDates = getVisibleScheduleDates();
    const visibleDateStrings = visibleDates.map(toDateString);
    const hasBanner = visibleDates.some(function(date) {
        return getHolidaysForDate(date).length > 0 || getBreaksForDate(date).length > 0 || getRecitalsForDate(date).length > 0;
    });

    if (!hasBanner) {
        return;
    }

    const row = document.createElement('tr');
    const label = document.createElement('td');

    row.className = 'calendar-schedule-holiday-row';
    label.className = 'calendar-schedule-holiday-zone';
    row.appendChild(label);

    getScheduleGridDates().forEach(function(date) {
        const cell = document.createElement('td');
        const dateString = toDateString(date);
        const isVisible = state.view !== '2-days' || visibleDateStrings.includes(dateString);
        const holidays = isVisible ? getHolidaysForDate(date) : [];
        const teachingBreaks = isVisible ? getBreaksForDate(date) : [];
        const recitals = isVisible ? getRecitalsForDate(date) : [];

        cell.className = 'calendar-schedule-holiday-cell';
        cell.dataset.date = dateString;
        cell.dataset.realDate = dateString;
        cell.classList.toggle('calendar-schedule-hidden-column', !isVisible);
        applyDateStatusAttributes(cell, dateString);

        holidays.forEach(function(holiday) {
            const item = document.createElement('span');

            item.className = 'calendar-schedule-holiday';
            item.textContent = holiday.title;
            applyDateStatusAttributes(item, dateString);
            cell.appendChild(item);
        });

        teachingBreaks.forEach(function(teachingBreak) {
            const item = document.createElement('button');

            item.type = 'button';
            item.className = 'calendar-schedule-holiday calendar-schedule-break';
            item.textContent = teachingBreak.title;
            item.dataset.eventGuid = `teaching-break-${teachingBreak.id}-${dateString}`;
            applyDateStatusAttributes(item, dateString);
            cell.appendChild(item);
        });

        recitals.forEach(function(recital) {
            const item = document.createElement('button');

            item.type = 'button';
            item.className = 'calendar-schedule-holiday calendar-schedule-recital';
            item.textContent = `${formatEventTime(recital.start_time)} ${recital.name}`;
            item.dataset.eventGuid = `recital-${recital.id}-${dateString}`;
            applyDateStatusAttributes(item, dateString);
            cell.appendChild(item);
        });

        row.appendChild(cell);
    });

    thead.appendChild(row);
};

const getEventByGuid = function(guid) {
    return state.events.find(function(event) {
        return event.guid === guid;
    }) || getTeachingBreakEventByGuid(guid) || getRecitalEventByGuid(guid) || getGeneralEventByGuid(guid);
};

const getEventByScheduleItem = function(item) {
    if (!item) {
        return null;
    }

    if (item.event) {
        return item.event;
    }

    const event = getEventByGuid(item.id || item.dataset.eventGuid);

    if (event) {
        return event;
    }

    const cell = item.closest('td[data-date]');
    const date = cell ? cell.dataset.date : '';
    const start = normalizeTime(item.getAttribute('data-start') || '08:00');
    const end = normalizeTime(item.getAttribute('data-end') || '08:15');
    const title = item.getAttribute('data-title') || '';

    return state.events.find(function(candidate) {
        return candidate.date === date
            && candidate.start === start
            && candidate.end === end
            && candidate.title === title;
    });
};

const getTeachingBreakEvent = function(teachingBreak, dateString) {
    const impact = teachingBreak.impact || {};

    return {
        guid: `teaching-break-${teachingBreak.id}-${dateString}`,
        isBreak: true,
        id: teachingBreak.id,
        date: dateString,
        title: teachingBreak.title || 'Teaching break',
        reason: teachingBreak.reason || '',
        startsOn: getBreakDateString(teachingBreak, 'starts_on'),
        endsOn: getBreakDateString(teachingBreak, 'ends_on'),
        locations: Array.isArray(teachingBreak.locations) ? teachingBreak.locations : [],
        missedLessonCount: impact.lessons_count || 0,
        missedFeeAmount: impact.fee_amount || 0,
        missedLessons: Array.isArray(impact.lessons) ? impact.lessons : [],
    };
};

const getBreakEventsForDate = function(date) {
    const dateString = toDateString(date);

    return getBreaksForDateString(dateString).map(function(teachingBreak) {
        return getTeachingBreakEvent(teachingBreak, dateString);
    });
};

const getTeachingBreakEventByGuid = function(guid) {
    const match = String(guid || '').match(/^teaching-break-(\d+)-(\d{4}-\d{2}-\d{2})$/);

    if (!match) {
        return null;
    }

    const teachingBreak = state.teachingBreaks.find(function(item) {
        return Number(item.id) === Number(match[1]);
    });

    return teachingBreak ? getTeachingBreakEvent(teachingBreak, match[2]) : null;
};

const getRecitalEvent = function(recital) {
    const dateString = String(recital.date || '').substring(0, 10);

    return {
        guid: `recital-${recital.id}-${dateString}`,
        isRecital: true,
        id: recital.id,
        date: dateString,
        start: recital.start_time,
        title: recital.name || 'Recital',
        venue: recital.venue || null,
        students: Array.isArray(recital.students) ? recital.students : [],
    };
};

const getRecitalEventsForDate = function(date) {
    return getRecitalsForDate(date).map(getRecitalEvent);
};

const getRecitalEventByGuid = function(guid) {
    const match = String(guid || '').match(/^recital-(\d+)-(\d{4}-\d{2}-\d{2})$/);

    if (!match) {
        return null;
    }

    const recital = state.recitals.find(function(item) {
        return Number(item.id) === Number(match[1]);
    });

    return recital ? getRecitalEvent(recital) : null;
};

const getGeneralEvent = function(generalEvent) {
    const dateString = String(generalEvent.scheduled_date || '').substring(0, 10);

    return {
        guid: `general-event-${generalEvent.id}-${dateString}`,
        isGeneralEvent: true,
        id: generalEvent.id,
        date: dateString,
        start: normalizeTime(generalEvent.starts_at),
        end: normalizeTime(generalEvent.ends_at),
        title: generalEvent.name || 'Event',
        eventType: generalEvent.event_type || '',
        eventTypeIcon: generalEvent.event_type_icon || '',
        notes: generalEvent.notes || '',
        notificationMinutesBefore: generalEvent.notification_minutes_before,
        editUrl: generalEvent.edit_url || '',
        rescheduleUrl: generalEvent.reschedule_url || '',
        destroyUrl: generalEvent.destroy_url || '',
        calendarStatus: 'general-event',
        lessonStatus: 'general-event',
        'data-lesson-status': 'general-event',
    };
};

const getGeneralEventCalendarEvents = function() {
    return state.generalEvents
        .filter(generalEventMatchesCalendarSearch)
        .map(getGeneralEvent);
};

const getGeneralEventByGuid = function(guid) {
    const match = String(guid || '').match(/^general-event-(\d+)-(\d{4}-\d{2}-\d{2})$/);

    if (!match) {
        return null;
    }

    const generalEvent = state.generalEvents.find(function(item) {
        return Number(item.id) === Number(match[1]);
    });

    return generalEvent ? getGeneralEvent(generalEvent) : null;
};

const getCalendarEventElementsByGuid = function(guid) {
    if (!guid) {
        return [];
    }

    return Array.from(document.querySelectorAll('#calendar .lm-schedule-item, #calendar [data-event-guid]')).filter(function(item) {
        return item.id === guid || item.dataset.eventGuid === guid;
    });
};

const getLessonStatus = function(lesson) {
    if (!lesson) {
        return 'unconfirmed';
    }

    if (lesson.canceled_at) {
        return 'canceled';
    }

    return lesson.paid_at ? 'paid' : 'unpaid';
};

const getDateTimeDateString = function(value) {
    const match = String(value || '').match(/^(\d{4}-\d{2}-\d{2})/);

    return match ? match[1] : '';
};

const getDateTimeTimeString = function(value) {
    const match = String(value || '').match(/[T\s](\d{1,2}):(\d{2})/);

    if (!match) {
        return '';
    }

    return `${String(Number(match[1])).padStart(2, '0')}:${match[2]}`;
};

const getDateTimeMinutes = function(value) {
    return getTimeMinutes(getDateTimeTimeString(value));
};

const getLessonEditUrl = function(lesson) {
    const taught = document.getElementById('lesson-taught');
    const storeUrl = taught ? taught.dataset.url : '';

    if (!lesson || !lesson.id || !storeUrl) {
        return '';
    }

    return `${storeUrl.replace(/\/$/, '')}/${lesson.id}`;
};

const getLessonPlanModalEditUrl = function(isSingleLessonPlan, id) {
    const template = isSingleLessonPlan
        ? window.calendarSingleLessonPlanEditUrlTemplate
        : window.calendarLessonPlanEditUrlTemplate;
    const placeholder = isSingleLessonPlan ? '__single_lesson_plan__' : '__lesson_plan__';

    return template && id ? String(template).replace(placeholder, id) : '';
};

const getLessonPaymentUrl = function(lesson) {
    const editUrl = getLessonEditUrl(lesson);

    return editUrl ? `${editUrl.replace(/\/$/, '')}/payments` : '';
};

const preserveButtonLabel = function(button) {
    if (button && !button.dataset.defaultHtml) {
        button.dataset.defaultHtml = button.innerHTML;
    }
};

const restoreButtonLabel = function(button) {
    if (button && button.dataset.defaultHtml) {
        button.innerHTML = button.dataset.defaultHtml;
    }
};

const setFormSubmitting = function(form, isSubmitting) {
    if (!form) {
        return;
    }

    form.querySelectorAll('button:not([type]), button[type="submit"], input[type="submit"], input[type="image"]').forEach(function(submit) {
        if (isSubmitting) {
            if (submit.disabled) {
                return;
            }

            preserveButtonLabel(submit);
            submit.dataset.calendarDisabledOnSubmit = 'true';
            submit.disabled = true;
            submit.setAttribute('aria-disabled', 'true');
            return;
        }

        if (submit.dataset.calendarDisabledOnSubmit !== 'true') {
            return;
        }

        submit.disabled = false;
        submit.removeAttribute('aria-disabled');
        delete submit.dataset.calendarDisabledOnSubmit;
        restoreButtonLabel(submit);
    });
};

const getResponseErrorMessage = function(payload, fallback) {
    if (payload && payload.message) {
        return payload.message;
    }

    if (payload && payload.errors) {
        const firstError = Object.values(payload.errors).find(function(errors) {
            return Array.isArray(errors) && errors.length;
        });

        if (firstError) {
            return firstError[0];
        }
    }

    return fallback;
};

const requestJson = function(url, options, fallbackError) {
    return fetch(url, options).then(function(response) {
        return response.json().catch(function() {
            return {};
        }).then(function(payload) {
            if (!response.ok) {
                throw new Error(getResponseErrorMessage(payload, fallbackError));
            }

            return payload;
        });
    });
};

const showLessonActionError = function(modal, message) {
    const error = modal ? modal.querySelector('[data-lesson-action-error]') : null;

    if (!error) {
        return;
    }

    error.textContent = message || 'Unable to update this lesson.';
    error.hidden = false;
};

const clearLessonActionError = function(modal) {
    const error = modal ? modal.querySelector('[data-lesson-action-error]') : null;

    if (!error) {
        return;
    }

    error.textContent = '';
    error.hidden = true;
};

const hideLessonModal = function(modal) {
    if (!modal) {
        return;
    }

    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).hide();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('hide');
    }
};

const finishLessonModalMutation = function(modal, refreshCalendar, keepOpen) {
    const guid = modal ? modal.dataset.eventGuid : '';

    return refreshCalendar().then(function() {
        const updatedEvent = guid ? getEventByGuid(guid) : null;

        if (keepOpen && updatedEvent) {
            openLessonModal(updatedEvent);
        } else {
            hideLessonModal(modal);
        }
    });
};

const getLessonForOccurrence = function(lessonPlan, dateString, startTime) {
    const lessons = Array.isArray(lessonPlan.lessons) ? lessonPlan.lessons : [];
    const lessonPlanId = Number(lessonPlan.id);
    const occurrenceMinutes = getTimeMinutes(startTime);

    return lessons.find(function(lesson) {
        const startsOnDate = getDateTimeDateString(lesson.starts_at) === dateString;
        const startsAtTime = getDateTimeMinutes(lesson.starts_at) === occurrenceMinutes;
        const belongsToPlan = !lesson.lesson_plan_id || Number(lesson.lesson_plan_id) === lessonPlanId;

        return startsOnDate && startsAtTime && belongsToPlan;
    }) || null;
};

const renderRescheduleDatePicker = function(modal) {
    const label = modal.querySelector('[data-reschedule-datepicker-label]');
    const grid = modal.querySelector('[data-reschedule-datepicker-grid]');
    const input = modal.querySelector('#reschedule-lesson-date');

    if (!label || !grid || !state.rescheduleDatePickerDate) {
        return;
    }

    const selected = input && input.value ? input.value : toDateString(state.rescheduleDatePickerDate);
    const gridStart = startOfMonthGrid(state.rescheduleDatePickerDate);
    const today = todayString();

    label.textContent = monthFormatter.format(state.rescheduleDatePickerDate);
    grid.innerHTML = '';

    for (let i = 0; i < 42; i++) {
        const date = addDays(gridStart, i);
        const dateString = toDateString(date);
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'calendar-date-picker-day';
        button.textContent = date.getDate();
        button.dataset.date = dateString;

        if (date.getMonth() !== state.rescheduleDatePickerDate.getMonth()) {
            button.classList.add('is-muted');
        }

        if (dateString === selected) {
            button.classList.add('is-selected');
        }

        if (dateString === today) {
            button.classList.add('is-today');
        }

        grid.appendChild(button);
    }
};

const renderGeneralEventRescheduleDatePicker = function(modal) {
    const label = modal.querySelector('[data-general-event-reschedule-datepicker-label]');
    const grid = modal.querySelector('[data-general-event-reschedule-datepicker-grid]');
    const input = modal.querySelector('#reschedule-general-event-date');
    const pickerDate = state.generalEventRescheduleDatePickerDate;

    if (!label || !grid || !pickerDate) {
        return;
    }

    const selected = input && input.value ? input.value : toDateString(pickerDate);
    const gridStart = startOfMonthGrid(pickerDate);
    const today = todayString();

    label.textContent = monthFormatter.format(pickerDate);
    grid.innerHTML = '';

    for (let i = 0; i < 42; i++) {
        const date = addDays(gridStart, i);
        const dateString = toDateString(date);
        const button = document.createElement('button');

        button.type = 'button';
        button.className = 'calendar-date-picker-day';
        button.textContent = date.getDate();
        button.dataset.date = dateString;

        if (date.getMonth() !== pickerDate.getMonth()) {
            button.classList.add('is-muted');
        }

        if (dateString === selected) {
            button.classList.add('is-selected');
        }

        if (dateString === today) {
            button.classList.add('is-today');
        }

        grid.appendChild(button);
    }
};

const resetLessonModalState = function(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-canceling', 'is-rescheduling', 'is-drop-rescheduling');
    delete modal.dataset.dropRecurring;
    state.rescheduleAnchor = null;
    clearLessonActionError(modal);
};

const showLessonRescheduleForm = function(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-canceling');
    modal.classList.add('is-rescheduling');
};

const showLessonCancelForm = function(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-rescheduling');
    modal.classList.add('is-canceling');
};

const getEventStartDateTime = function(event) {
    if (!event || !event.date || !event.start) {
        return null;
    }

    const dateParts = String(event.date).substring(0, 10).split('-').map(Number);
    const timeParts = normalizeTime(event.start).split(':').map(Number);
    const date = new Date(
        dateParts[0],
        dateParts[1] - 1,
        dateParts[2],
        timeParts[0],
        timeParts[1],
        0,
        0
    );

    return isValidDate(date) ? date : null;
};

const canUseLessonActionButtons = function(event) {
    if (event && event.date) {
        const eventDate = parseDateString(String(event.date).substring(0, 10));
        const today = getTodayDate();

        if (isValidDate(eventDate)) {
            return eventDate <= today;
        }
    }

    const startsAt = getEventStartDateTime(event);

    return startsAt ? startsAt <= new Date() : false;
};

const populateLessonModal = function(modal, event) {
    const title = modal.querySelector('.modal-title');
    const date = modal.querySelector('#lesson-date');
    const time = modal.querySelector('#lesson-time');
    const recurrence = modal.querySelector('#lesson-recurrence');
    const birthday = modal.querySelector('#lesson-birthday');
    const birthdayLabel = birthday ? birthday.querySelector('span') : null;
    const meetingUrl = modal.querySelector('#meeting-url');
    const meetingUrlLink = meetingUrl ? meetingUrl.querySelector('a') : null;
    const notesUrl = modal.querySelector('#notes-url');
    const notesUrlLink = notesUrl ? notesUrl.querySelector('a') : null;
    const revert = modal.querySelector('#lesson-revert');
    const edit = modal.querySelector('#lesson-edit');
    const taught = modal.querySelector('#lesson-taught');
    const cancelLesson = modal.querySelector('#cancel-lesson-button');
    const confirmPayment = modal.querySelector('#confirm-payment');
    const earlyPayment = modal.querySelector('#early-payment');
    const rescheduleOriginalDate = modal.querySelector('#reschedule-lesson-original-date');
    const rescheduleOriginalStartTime = modal.querySelector('#reschedule-lesson-original-start-time');
    const rescheduleDate = modal.querySelector('#reschedule-lesson-date');
    const rescheduleForm = modal.querySelector('#reschedule-lesson form');
    const rescheduleLessonPlan = modal.querySelector('#reschedule-lesson [name="lesson_plan_id"]');
    const rescheduleStartTime = modal.querySelector('#reschedule-lesson-start-time');
    const rescheduleEndTime = modal.querySelector('#reschedule-lesson-end-time');
    const cancelLessonForm = modal.querySelector('#cancel-lesson form');
    const lessonPlanId = event && event.lessonPlanId ? event.lessonPlanId : '';
    const singleLessonPlanId = event && event.singleLessonPlanId ? event.singleLessonPlanId : '';
    const hasLessonSource = !!(lessonPlanId || singleLessonPlanId);
    const eventDate = event && event.date ? event.date.substring(0, 10) : todayString();
    const canUseActions = canUseLessonActionButtons(event);

    renderLessonModalTitle(title, event);

    if (date) {
        date.textContent = event && event.date ? modalDateFormatter.format(parseDateString(event.date.substring(0, 10))) : '';
    }

    if (time) {
        const start = event && event.start ? formatModalEventTime(event.start) : '';
        const end = event && event.end ? formatModalEventTime(event.end) : '';

        time.textContent = start && end ? `${start} - ${end}` : start || end;
    }

    if (recurrence) {
        recurrence.textContent = event && event.recurrence ? event.recurrence : '';
    }

    if (birthday && birthdayLabel) {
        if (event && event.birthdayModalLabel) {
            birthday.style.display = '';
            birthdayLabel.textContent = event.birthdayModalLabel;
        } else {
            birthday.style.display = 'none';
            birthdayLabel.textContent = '';
        }
    }

    if (meetingUrl && meetingUrlLink) {
        if (event && event.meetingUrl) {
            meetingUrl.style.display = 'block';
            meetingUrlLink.href = event.meetingUrl;
        } else {
            meetingUrl.style.display = 'none';
            meetingUrlLink.removeAttribute('href');
        }
    }

    if (notesUrl && notesUrlLink) {
        if (event && event.notesUrl) {
            notesUrl.style.display = 'block';
            notesUrlLink.href = event.notesUrl;
        } else {
            notesUrl.style.display = 'none';
            notesUrlLink.removeAttribute('href');
        }
    }

    if (revert) {
        const canRevert = !!(event && (
            event.scheduleOverrideId
            || event.lessonId
            || (event.earlyPaymentId && !canUseActions)
        ));

        revert.style.display = canRevert ? 'inline-flex' : 'none';
        revert.disabled = !canRevert;
    }

    if (edit) {
        edit.dataset.url = event && event.calendarEditUrl ? event.calendarEditUrl : '';
        edit.style.display = edit.dataset.url ? 'inline-flex' : 'none';
        edit.disabled = !edit.dataset.url;
    }

    if (taught) {
        preserveButtonLabel(taught);
        taught.disabled = !event || !hasLessonSource;
        taught.style.display = canUseActions ? '' : 'none';
        restoreButtonLabel(taught);
    }

    if (cancelLesson) {
        preserveButtonLabel(cancelLesson);
        cancelLesson.disabled = !event || !hasLessonSource || (event.lessonStatus === 'canceled');
        cancelLesson.style.display = hasLessonSource ? '' : 'none';
        restoreButtonLabel(cancelLesson);
    }

    if (confirmPayment) {
        preserveButtonLabel(confirmPayment);
        confirmPayment.style.display = canUseActions ? '' : 'none';
        confirmPayment.dataset.url = event && event.paymentUrl ? event.paymentUrl : '';
        restoreButtonLabel(confirmPayment);
    }

    if (earlyPayment) {
        preserveButtonLabel(earlyPayment);
        earlyPayment.disabled = !event || !hasLessonSource;
        earlyPayment.style.display = event && !canUseActions && event.lessonStatus === 'unconfirmed' ? '' : 'none';
        restoreButtonLabel(earlyPayment);
    }

    if (rescheduleOriginalDate) {
        rescheduleOriginalDate.value = event && event.originalDate ? event.originalDate : eventDate;
    }

    if (rescheduleOriginalStartTime) {
        rescheduleOriginalStartTime.value = event && event.originalStartTime ? normalizeTime(event.originalStartTime) : (event && event.start ? normalizeTime(event.start) : '08:00');
    }

    if (rescheduleDate) {
        rescheduleDate.value = eventDate;
    }

    if (rescheduleLessonPlan) {
        rescheduleLessonPlan.value = lessonPlanId;
    }

    const rescheduleSingleLessonPlan = modal.querySelector('#reschedule-lesson [name="single_lesson_plan_id"]');

    if (rescheduleSingleLessonPlan) {
        rescheduleSingleLessonPlan.value = singleLessonPlanId;
    }

    if (rescheduleForm) {
        rescheduleForm.action = singleLessonPlanId && rescheduleForm.dataset.singleAction
            ? rescheduleForm.dataset.singleAction
            : (rescheduleForm.dataset.recurringAction || rescheduleForm.action);
    }

    if (cancelLessonForm) {
        const recurringCancelFields = cancelLessonForm.querySelectorAll('[data-recurring-cancel-fields]');
        const singleCancelWarning = cancelLessonForm.querySelector('[data-single-cancel-warning]');
        const cancelReasonInputs = cancelLessonForm.querySelectorAll('input[name="canceled_by"]');
        const isSingleLessonCancel = !!singleLessonPlanId;
        const cancelFormPayload = {
            lesson_plan_id: lessonPlanId,
            single_lesson_plan_id: singleLessonPlanId,
            date: eventDate,
            start: event && event.start ? normalizeTime(event.start) : '',
            end: event && event.end ? normalizeTime(event.end) : '',
            scheduled_date: event && event.originalDate ? event.originalDate : eventDate,
            scheduled_start_time: event && event.originalStartTime ? normalizeTime(event.originalStartTime) : (event && event.start ? normalizeTime(event.start) : ''),
            schedule_override_id: event && event.scheduleOverrideId ? event.scheduleOverrideId : '',
        };

        Object.keys(cancelFormPayload).forEach(function(name) {
            const input = cancelLessonForm.querySelector(`[name="${name}"]`);

            if (input) {
                input.value = cancelFormPayload[name];
            }
        });

        recurringCancelFields.forEach(function(fieldset) {
            fieldset.hidden = isSingleLessonCancel;
        });

        if (singleCancelWarning) {
            singleCancelWarning.hidden = !isSingleLessonCancel;
        }

        cancelReasonInputs.forEach(function(input) {
            input.disabled = isSingleLessonCancel;
        });
    }

    setTimeSelectValue(rescheduleStartTime, event && event.start ? event.start : '08:00');
    renderRescheduleEndOptions(
        rescheduleStartTime,
        rescheduleEndTime,
        event && event.end ? normalizeTime(event.end) : '08:15'
    );
    setTimeSelectValue(rescheduleEndTime, event && event.end ? event.end : '08:15');

    state.rescheduleAnchor = null;
    state.rescheduleDurationMinutes = Math.max(
        15,
        getSelectTimeMinutes(rescheduleEndTime) - getSelectTimeMinutes(rescheduleStartTime)
    );

    state.rescheduleDatePickerDate = parseDateString(eventDate);
    renderRescheduleDatePicker(modal);

    modal.dataset.lessonStatus = event && event.lessonStatus ? event.lessonStatus : 'unconfirmed';
    modal.dataset.lessonCanceledBy = event && event.canceledBy ? event.canceledBy : '';
};

const openLessonModal = function(event, options) {
    const modal = document.getElementById('lesson-modal');
    const settings = options || {};

    if (!modal) {
        return;
    }

    resetLessonModalState(modal);
    populateLessonModal(modal, event);
    modal.updatedScheduleItem = settings.updatedItem || null;

    if (settings.openReschedule) {
        modal.classList.add('is-drop-rescheduling');
        modal.dataset.dropRecurring = event && event.lessonPlanId ? 'true' : 'false';
        showLessonRescheduleForm(modal);
    }

    if (event) {
        modal.dataset.eventGuid = event.guid || '';
        modal.dataset.eventTitle = event.title || '';
        modal.dataset.eventDate = event.date || '';
        modal.dataset.eventStart = event.start || '';
        modal.dataset.eventEnd = event.end || '';
        modal.dataset.lessonPlanId = event.lessonPlanId || '';
        modal.dataset.singleLessonPlanId = event.singleLessonPlanId || '';
        modal.dataset.lessonId = event.lessonId || '';
        modal.dataset.scheduleOverrideId = event.scheduleOverrideId || '';
        modal.dataset.earlyPaymentId = event.earlyPaymentId || '';
        modal.dataset.originalDate = event.originalDate || event.date || '';
        modal.dataset.originalStartTime = event.originalStartTime || event.start || '';
    } else {
        modal.dataset.eventGuid = '';
        modal.dataset.eventTitle = '';
        modal.dataset.eventDate = '';
        modal.dataset.eventStart = '';
        modal.dataset.eventEnd = '';
        modal.dataset.lessonPlanId = '';
        modal.dataset.singleLessonPlanId = '';
        modal.dataset.lessonId = '';
        modal.dataset.scheduleOverrideId = '';
        modal.dataset.earlyPaymentId = '';
        modal.dataset.originalDate = '';
        modal.dataset.originalStartTime = '';
    }

    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).show();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('show');
    }
};

const formatBreakDateRange = function(event) {
    const startsOn = event && event.startsOn ? event.startsOn : (event && event.date ? event.date.substring(0, 10) : '');
    const endsOn = event && event.endsOn ? event.endsOn : startsOn;

    if (!startsOn) {
        return '';
    }

    const startLabel = modalDateFormatter.format(parseDateString(startsOn));
    const endLabel = endsOn && endsOn !== startsOn ? modalDateFormatter.format(parseDateString(endsOn)) : '';

    return endLabel ? `${startLabel} - ${endLabel}` : startLabel;
};

const openTeachingBreakModal = function(event) {
    const modal = document.getElementById('teaching-break-modal');

    if (!modal || !event) {
        return;
    }

    const title = modal.querySelector('.modal-title');
    const dates = modal.querySelector('#teaching-break-dates');
    const reason = modal.querySelector('#teaching-break-reason');
    const locations = modal.querySelector('#teaching-break-locations');
    const impact = modal.querySelector('#teaching-break-impact');
    const lessons = modal.querySelector('#teaching-break-lessons');
    const missedLessons = Array.isArray(event.missedLessons) ? event.missedLessons : [];

    if (title) {
        title.textContent = event.title || 'Teaching break';
    }

    if (dates) {
        dates.textContent = formatBreakDateRange(event);
    }

    if (reason) {
        reason.textContent = event.reason || 'No reason added.';
    }

    if (locations) {
        locations.textContent = Array.isArray(event.locations) && event.locations.length
            ? event.locations.map(function(location) { return location.name; }).join(', ')
            : 'All locations';
    }

    if (impact) {
        const count = Number(event.missedLessonCount || 0);
        impact.textContent = `${count} ${count === 1 ? 'lesson' : 'lessons'} missed · ${paymentFormatter.format(Number(event.missedFeeAmount || 0) / 100)} missed`;
    }

    if (lessons) {
        lessons.innerHTML = '';

        if (!missedLessons.length) {
            const empty = document.createElement('div');

            empty.className = 'opacity-4';
            empty.textContent = 'No lessons are currently scheduled during this break.';
            lessons.appendChild(empty);
        }

        missedLessons.forEach(function(lesson) {
            const row = document.createElement('div');
            const name = document.createElement('strong');
            const details = document.createElement('span');

            row.className = 'calendar-break-lesson';
            name.textContent = lesson.student || 'Lesson';
            details.textContent = `${lesson.date ? modalDateFormatter.format(parseDateString(String(lesson.date).substring(0, 10))) : ''} · ${formatModalEventTime(lesson.start)}-${formatModalEventTime(lesson.end)} · ${paymentFormatter.format(Number(lesson.fee_amount || 0) / 100)}`;
            row.appendChild(name);
            row.appendChild(details);
            lessons.appendChild(row);
        });
    }

    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).show();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('show');
    }
};

const openRecitalModal = function(event) {
    const modal = document.getElementById('recital-modal');

    if (!modal || !event) {
        return;
    }

    const title = modal.querySelector('.modal-title');
    const date = modal.querySelector('#recital-date');
    const time = modal.querySelector('#recital-time');
    const venue = modal.querySelector('#recital-venue');
    const participants = modal.querySelector('#recital-participants');
    const students = Array.isArray(event.students) ? event.students : [];

    if (title) title.textContent = event.title || 'Recital';
    if (date) date.textContent = event.date ? modalDateFormatter.format(parseDateString(event.date)) : '';
    if (time) time.textContent = formatModalEventTime(event.start);
    if (venue) {
        const venueName = event.venue && event.venue.name ? event.venue.name : 'No venue specified';
        const address = event.venue && event.venue.address ? event.venue.address : '';
        const mapUrl = event.venue && event.venue.map_url ? event.venue.map_url : '';

        venue.innerHTML = '';

        if (mapUrl) {
            const link = document.createElement('a');
            link.href = mapUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = venueName;
            venue.appendChild(link);
        } else {
            venue.appendChild(document.createTextNode(venueName));
        }

        if (address) {
            venue.appendChild(document.createTextNode(` · ${address}`));
        }
    }

    if (participants) {
        participants.innerHTML = '';

        if (!students.length) {
            const empty = document.createElement('div');
            empty.className = 'opacity-4';
            empty.textContent = 'No participating students.';
            participants.appendChild(empty);
        }

        students.forEach(function(student) {
            const row = document.createElement('div');
            row.className = 'calendar-break-lesson';
            row.textContent = student.name || 'Student';
            participants.appendChild(row);
        });
    }

    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).show();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('show');
    }
};

const renderNotesWithLinks = function(element, notes) {
    const text = String(notes || '');
    const urlPattern = /(?:https?:\/\/|www\.)[^\s]+/gi;
    let cursor = 0;
    let match;

    element.innerHTML = '';

    if (!text) {
        return;
    }

    element.classList.remove('opacity-4');

    while ((match = urlPattern.exec(text)) !== null) {
        const rawUrl = match[0];
        const trailingMatch = rawUrl.match(/[),.;!?]+$/);
        const trailing = trailingMatch ? trailingMatch[0] : '';
        const url = trailing ? rawUrl.slice(0, -trailing.length) : rawUrl;
        const link = document.createElement('a');

        element.appendChild(document.createTextNode(text.slice(cursor, match.index)));
        link.href = /^https?:\/\//i.test(url) ? url : `https://${url}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = url;
        element.appendChild(link);

        if (trailing) {
            element.appendChild(document.createTextNode(trailing));
        }

        cursor = match.index + rawUrl.length;
    }

    element.appendChild(document.createTextNode(text.slice(cursor)));
};

const formatGeneralEventNotification = function(minutes) {
    if (minutes === null || minutes === undefined || minutes === '') {
        return '';
    }

    const value = Number(minutes);

    if (value === 0) {
        return 'At the event time';
    }

    if (value === 1440) {
        return '1 day before';
    }

    if (value >= 60 && value % 60 === 0) {
        const hours = value / 60;
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} before`;
    }

    return `${value} ${value === 1 ? 'minute' : 'minutes'} before`;
};

const clearGeneralEventActionError = function(modal) {
    const error = modal ? modal.querySelector('[data-general-event-action-error]') : null;

    if (!error) {
        return;
    }

    error.textContent = '';
    error.hidden = true;
};

const showGeneralEventActionError = function(modal, message) {
    const error = modal ? modal.querySelector('[data-general-event-action-error]') : null;

    if (!error) {
        return;
    }

    error.textContent = message || 'Unable to update this event.';
    error.hidden = false;
};

const resetGeneralEventModalState = function(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-canceling', 'is-rescheduling', 'is-drop-rescheduling');
    state.rescheduleAnchor = null;
    clearGeneralEventActionError(modal);

    modal.querySelectorAll('button[type="submit"], input[type="submit"]').forEach(function(submit) {
        submit.disabled = false;
        restoreButtonLabel(submit);
    });
};

const showGeneralEventRescheduleForm = function(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-canceling');
    modal.classList.add('is-rescheduling');
};

const showGeneralEventCancelForm = function(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-rescheduling');
    modal.classList.add('is-canceling');
};

const openGeneralEventModal = function(event, options) {
    const modal = document.getElementById('general-event-modal');
    const settings = options || {};

    if (!modal || !event) {
        return;
    }

    const title = modal.querySelector('.modal-title');
    const date = modal.querySelector('#general-event-date');
    const time = modal.querySelector('#general-event-time');
    const eventType = modal.querySelector('#general-event-type');
    const eventTypeIcon = modal.querySelector('#general-event-type-icon');
    const eventTypeSection = modal.querySelector('[data-general-event-type-section]');
    const notification = modal.querySelector('#general-event-notification');
    const notes = modal.querySelector('#general-event-notes');
    const notesSection = modal.querySelector('[data-general-event-notes-section]');
    const edit = modal.querySelector('#event-edit');
    const rescheduleForm = modal.querySelector('#reschedule-general-event form');
    const cancelForm = modal.querySelector('#cancel-general-event form');
    const rescheduleDate = modal.querySelector('#reschedule-general-event-date');
    const rescheduleStartTime = modal.querySelector('#reschedule-general-event-start-time');
    const rescheduleEndTime = modal.querySelector('#reschedule-general-event-end-time');

    resetGeneralEventModalState(modal);
    modal.updatedScheduleItem = settings.updatedItem || null;

    if (title) title.textContent = event.title || 'Event';
    if (date) date.textContent = event.date ? modalDateFormatter.format(parseDateString(event.date)) : '';
    if (time) time.textContent = event.start && event.end
        ? `${formatModalEventTime(event.start)} - ${formatModalEventTime(event.end)}`
        : formatModalEventTime(event.start);
    if (eventType) eventType.textContent = event.eventType || '';
    if (eventTypeIcon) {
        eventTypeIcon.className = `fas opacity-4 mr-2 t-2${event.eventTypeIcon ? ` fa-${event.eventTypeIcon}` : ''}`;
        eventTypeIcon.hidden = !event.eventTypeIcon;
    }
    if (eventTypeSection) eventTypeSection.hidden = !event.eventType;
    if (notification) {
        notification.textContent = formatGeneralEventNotification(event.notificationMinutesBefore);
        notification.parentElement.hidden = !notification.textContent;
    }
    if (notesSection) notesSection.hidden = !String(event.notes || '').trim();
    if (notes) renderNotesWithLinks(notes, event.notes);
    if (edit) {
        edit.dataset.url = event.editUrl || '';
        edit.style.display = edit.dataset.url ? 'inline-flex' : 'none';
        edit.disabled = !edit.dataset.url;
    }

    modal.dataset.eventGuid = event.guid || '';
    modal.dataset.eventId = event.id || '';

    if (rescheduleForm) rescheduleForm.action = event.rescheduleUrl || '';
    if (cancelForm) cancelForm.action = event.destroyUrl || '';
    if (rescheduleDate) rescheduleDate.value = event.date || todayString();

    setTimeSelectValue(rescheduleStartTime, event.start || '08:00');
    renderRescheduleEndOptions(
        rescheduleStartTime,
        rescheduleEndTime,
        event.end ? normalizeTime(event.end) : '08:15'
    );
    setTimeSelectValue(rescheduleEndTime, event.end || '08:15');

    state.rescheduleDurationMinutes = Math.max(
        15,
        getSelectTimeMinutes(rescheduleEndTime) - getSelectTimeMinutes(rescheduleStartTime)
    );
    state.generalEventRescheduleDatePickerDate = parseDateString(event.date || todayString());
    renderGeneralEventRescheduleDatePicker(modal);

    if (settings.openReschedule) {
        modal.classList.add('is-drop-rescheduling');
        showGeneralEventRescheduleForm(modal);
    }

    showBootstrapModal(modal);
};

const submitGeneralEventModalForm = function(form, refreshCalendar) {
    const modal = form ? form.closest('#general-event-modal') : null;
    const isReschedule = !!(form && form.closest('#reschedule-general-event'));

    if (!modal || !form.action) {
        return;
    }

    setFormSubmitting(form, true);

    clearGeneralEventActionError(modal);

    requestJson(form.action, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: new FormData(form),
    }, isReschedule ? 'Unable to reschedule event.' : 'Unable to cancel event.')
        .then(function() {
            return refreshCalendar().then(function() {
                hideBootstrapModal(modal);
            });
        })
        .catch(function(error) {
            console.error(error);
            showGeneralEventActionError(modal, error.message);
        })
        .finally(function() {
            setFormSubmitting(form, false);
        });
};

const updateLessonModalState = function(modal, payload) {
    const revert = modal.querySelector('#lesson-revert');
    const taught = modal.querySelector('#lesson-taught');
    const cancelLesson = modal.querySelector('#cancel-lesson-button');
    const event = getEventByGuid(modal.dataset.eventGuid);
    const status = payload && payload.status ? payload.status : 'unpaid';
    const editUrl = payload && payload.edit_url ? payload.edit_url : '';
    const paymentUrl = payload && (payload.payment_url || payload.paymentUrl) ? (payload.payment_url || payload.paymentUrl) : '';
    const lessonId = payload && payload.lesson_id ? payload.lesson_id : '';
    const confirmPayment = modal.querySelector('#confirm-payment');
    const earlyPayment = modal.querySelector('#early-payment');
    const hasEarlyPaymentId = payload && Object.prototype.hasOwnProperty.call(payload, 'early_payment_id');
    const earlyPaymentId = hasEarlyPaymentId ? (payload.early_payment_id || '') : (event ? event.earlyPaymentId : '');

    modal.dataset.lessonStatus = status;
    modal.dataset.lessonCanceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
    modal.dataset.earlyPaymentId = earlyPaymentId;

    if (payload && payload.lesson_deleted) {
        modal.dataset.lessonId = '';
    } else if (lessonId) {
        modal.dataset.lessonId = lessonId;
    }

    if (taught) {
        taught.disabled = false;
        restoreButtonLabel(taught);
    }

    if (cancelLesson) {
        cancelLesson.disabled = status === 'canceled';
        restoreButtonLabel(cancelLesson);
    }

    if (confirmPayment && paymentUrl) {
        confirmPayment.dataset.url = paymentUrl;
    }

    if (earlyPayment) {
        earlyPayment.style.display = 'none';
        earlyPayment.disabled = false;
        restoreButtonLabel(earlyPayment);
    }

    if (event) {
        event.lessonStatus = status;
        event.calendarStatus = status === 'early-payment'
            ? status
            : (payload && payload.schedule_override_deleted ? status : (event.calendarStatus === 'rescheduled' ? 'rescheduled' : status));
        event['data-lesson-status'] = event.calendarStatus;
        event.canceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
        event.lessonEditUrl = payload && payload.lesson_deleted ? '' : (editUrl || event.lessonEditUrl || '');
        event.paymentUrl = payload && payload.lesson_deleted ? '' : (paymentUrl || event.paymentUrl || '');
        event.lessonId = payload && payload.lesson_deleted ? '' : (lessonId || event.lessonId || '');
        event.scheduleOverrideId = payload && payload.schedule_override_deleted ? '' : event.scheduleOverrideId;
        event.earlyPaymentId = earlyPaymentId;
    }

    if (revert) {
        const canRevert = !!(event && (
            event.scheduleOverrideId
            || event.lessonId
            || (event.earlyPaymentId && !canUseLessonActionButtons(event))
        ));

        revert.style.display = canRevert ? 'inline-flex' : 'none';
        revert.disabled = !canRevert;
    }

    const calendarStatus = event && event.calendarStatus ? event.calendarStatus : status;

    getCalendarEventElementsByGuid(modal.dataset.eventGuid).forEach(function(item) {
        item.setAttribute('data-lesson-status', calendarStatus);
        applyEventTimeStatusAttributes(item, event);

        item.querySelectorAll('[data-lesson-status]').forEach(function(child) {
            child.setAttribute('data-lesson-status', calendarStatus);
            applyEventTimeStatusAttributes(child, event);
        });
    });

    renderCalendarPaymentTotals();
};

const getLessonOccurrencePayload = function(modal) {
    return {
        lesson_plan_id: modal.dataset.lessonPlanId || '',
        single_lesson_plan_id: modal.dataset.singleLessonPlanId || '',
        date: modal.dataset.eventDate || '',
        start: modal.dataset.eventStart || '',
        end: modal.dataset.eventEnd || '',
        scheduled_date: modal.dataset.originalDate || modal.dataset.eventDate || '',
        scheduled_start_time: modal.dataset.originalStartTime || modal.dataset.eventStart || '',
        schedule_override_id: modal.dataset.scheduleOverrideId || '',
    };
};

const revertScheduleOverrideInState = function(event) {
    if (!event || !event.lessonPlanId || !event.scheduleOverrideId) {
        return;
    }

    const lessonPlan = state.plannedLessons.find(function(plan) {
        return String(plan.id) === String(event.lessonPlanId);
    });

    if (!lessonPlan || !Array.isArray(lessonPlan.occurrences)) {
        return;
    }

    lessonPlan.occurrences = lessonPlan.occurrences.filter(function(occurrence) {
        return String(occurrence.schedule_override_id || '') !== String(event.scheduleOverrideId);
    });

    if (!lessonPlan.occurrences.some(function(occurrence) {
        return occurrence.date === event.originalDate
            && normalizeTime(occurrence.start || lessonPlan.start_time) === normalizeTime(event.originalStartTime || event.start);
    })) {
        const start = normalizeTime(event.originalStartTime || lessonPlan.start_time);

        lessonPlan.occurrences.push({
            date: event.originalDate || event.date,
            start,
            end: addMinutesToTime(start, lessonPlan.duration_minutes),
            original_date: event.originalDate || event.date,
            original_start_time: start,
            lesson_id: '',
            lesson_status: 'unconfirmed',
            calendar_status: 'unconfirmed',
            fee_amount: event.feeAmount || lessonPlan.fee_amount || 0,
            canceled_by: '',
            lesson_edit_url: '',
            lesson_payment_url: '',
        });
    }
};

const revertLessonInState = function(event, lessonId) {
    if (!event || !lessonId) {
        return;
    }

    const lessonPlan = state.plannedLessons.concat(state.singleLessonPlans).find(function(plan) {
        return String(plan.id) === String(event.lessonPlanId || event.singleLessonPlanId);
    });

    if (!lessonPlan || !Array.isArray(lessonPlan.occurrences)) {
        return;
    }

    lessonPlan.occurrences = lessonPlan.occurrences.map(function(occurrence) {
        if (String(occurrence.lesson_id || '') !== String(lessonId)) {
            return occurrence;
        }

        return Object.assign({}, occurrence, {
            lesson_id: '',
            lesson_status: 'unconfirmed',
            calendar_status: occurrence.schedule_override_id ? 'rescheduled' : 'unconfirmed',
            canceled_by: '',
            lesson_edit_url: '',
            lesson_payment_url: '',
        });
    });
};

const revertLessonAction = function(button, refreshCalendar) {
    const modal = button.closest('#lesson-modal');
    const url = button.dataset.url;

    if (!modal || !url || (!modal.dataset.lessonId && !modal.dataset.scheduleOverrideId && !modal.dataset.earlyPaymentId)) {
        return;
    }

    button.disabled = true;
    clearLessonActionError(modal);

    requestJson(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(modal.dataset.earlyPaymentId ? {
            lesson_id: '',
            schedule_override_id: '',
            early_payment_id: modal.dataset.earlyPaymentId,
        } : {
            lesson_id: modal.dataset.lessonId || '',
            schedule_override_id: modal.dataset.scheduleOverrideId || '',
            early_payment_id: '',
        }),
    }, 'Unable to revert lesson action.')
        .then(function(payload) {
            updateLessonModalState(modal, payload);

            return finishLessonModalMutation(modal, refreshCalendar, true);
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;
            restoreButtonLabel(button);
            showLessonActionError(modal, error.message);
        });
};

const storeEarlyPayment = function(button, refreshCalendar) {
    const modal = button.closest('#lesson-modal');
    const url = button.dataset.url;

    if (!modal || !url || (!modal.dataset.lessonPlanId && !modal.dataset.singleLessonPlanId)) {
        return;
    }

    button.disabled = true;
    clearLessonActionError(modal);

    requestJson(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(getLessonOccurrencePayload(modal)),
    }, 'Unable to record the early payment.')
        .then(function(payload) {
            updateLessonModalState(modal, payload);

            return finishLessonModalMutation(modal, refreshCalendar, true);
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;
            restoreButtonLabel(button);
            showLessonActionError(modal, error.message);
        });
};

const storeTaughtLesson = function(button, refreshCalendar) {
    const modal = button.closest('#lesson-modal');
    const url = button.dataset.url;
    const lessonPlanId = modal ? modal.dataset.lessonPlanId : '';
    const singleLessonPlanId = modal ? modal.dataset.singleLessonPlanId : '';

    if (!modal || !url || (!lessonPlanId && !singleLessonPlanId)) {
        return;
    }

    button.disabled = true;
    clearLessonActionError(modal);

    requestJson(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(getLessonOccurrencePayload(modal)),
    }, 'Unable to confirm lesson.')
        .then(function(payload) {
            updateLessonModalState(modal, payload);

            return finishLessonModalMutation(modal, refreshCalendar, true);
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;
            restoreButtonLabel(button);
            showLessonActionError(modal, error.message);
        });
};

const confirmLessonPayment = function(button, refreshCalendar) {
    const modal = button.closest('#lesson-modal');
    const url = button.dataset.url;

    if (!modal || !url) {
        return;
    }

    button.disabled = true;
    clearLessonActionError(modal);

    requestJson(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
    }, 'Unable to confirm payment.')
        .then(function(payload) {
            updateLessonModalState(modal, payload);

            return finishLessonModalMutation(modal, refreshCalendar, true);
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;
            restoreButtonLabel(button);
            showLessonActionError(modal, error.message);
        });
};

const submitLessonModalForm = function(form, refreshCalendar) {
    const modal = form ? form.closest('#lesson-modal') : null;
    const isReschedule = !!(form && form.closest('#reschedule-lesson'));

    if (!modal || !form.action) {
        return;
    }

    setFormSubmitting(form, true);

    clearLessonActionError(modal);

    requestJson(form.action, {
        method: String(form.method || 'POST').toUpperCase(),
        headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: new FormData(form),
    }, isReschedule ? 'Unable to reschedule lesson.' : 'Unable to cancel lesson.')
        .then(function(payload) {
            if (!isReschedule && payload && payload.status) {
                updateLessonModalState(modal, payload);
            }

            return finishLessonModalMutation(modal, refreshCalendar, !isReschedule);
        })
        .catch(function(error) {
            console.error(error);
            showLessonActionError(modal, error.message);
        })
        .finally(function() {
            setFormSubmitting(form, false);
        });
};

const patchSchedulePointer = function(calendar) {
    const schedule = calendar.querySelector('.lm-schedule');
    const pointer = schedule ? schedule.querySelector('.lm-schedule-pointer') : null;

    if (!schedule || !pointer) {
        if (pointer) {
            pointer.style.display = 'none';
        }

        return;
    }

    const now = new Date();
    const minutesPerDivision = 15;
    const minutes = (now.getHours() * 60)
        + now.getMinutes()
        + (now.getSeconds() / 60)
        + (now.getMilliseconds() / 60000);
    const slot = Math.floor(minutes / minutesPerDivision);
    const slotOffset = (minutes % minutesPerDivision) / minutesPerDivision;
    const cell = schedule.querySelector(`tbody td[data-date="${todayString()}"][data-y="${slot}"]:not(.lm-schedule-disabled)`);

    if (!cell || cell.offsetParent === null) {
        pointer.style.display = 'none';
        return;
    }

    const scheduleRect = schedule.getBoundingClientRect();
    const cellRect = cell.getBoundingClientRect();

    pointer.style.display = 'block';
    pointer.style.left = `${cellRect.left - scheduleRect.left + schedule.scrollLeft}px`;
    pointer.style.top = `${cellRect.top - scheduleRect.top + schedule.scrollTop + (cellRect.height * slotOffset)}px`;

    if (state.view === 'day') {
        pointer.style.width = `${schedule.clientWidth - (cellRect.left - scheduleRect.left)}px`;
    } else {
        pointer.style.width = `${cellRect.width}px`;
    }
};

const scrollScheduleToNow = function(calendar) {
    if (state.didAutoNowScroll || !scheduleGridViews.includes(state.view)) {
        return;
    }

    const schedule = calendar.querySelector('.lm-schedule');
    const pointer = schedule ? schedule.querySelector('.lm-schedule-pointer') : null;

    if (!schedule || !pointer || pointer.style.display === 'none') {
        return;
    }

    const pointerTop = Number.parseFloat(pointer.style.top);

    if (!Number.isFinite(pointerTop)) {
        return;
    }

    schedule.scrollTop = Math.max(0, pointerTop - (schedule.clientHeight / 2));
    state.didAutoNowScroll = true;
};

const disconnectScheduleObserver = function() {
    if (state.scheduleObserver) {
        state.scheduleObserver.disconnect();
        state.scheduleObserver = null;
    }
};

const watchScheduleChanges = function(calendar) {
    const schedule = calendar.querySelector('.lm-schedule');

    if (!schedule || !scheduleGridViews.includes(state.view)) {
        return;
    }

    disconnectScheduleObserver();
    state.scheduleObserver = new MutationObserver(function() {
        queueSchedulePatch(calendar);
    });
    state.scheduleObserver.observe(schedule, {
        attributes: true,
        attributeFilter: ['data-start', 'data-end'],
        childList: true,
        subtree: true,
    });
};

const patchSchedule = function(calendar) {
    disconnectScheduleObserver();
    patchScheduleHeaders(calendar);
    patchScheduleTimeLabels(calendar);
    patchScheduleItems(calendar);
    patchScheduleHolidays(calendar);
    patchSchedulePointer(calendar);
    animateCalendarLessonItems(calendar);
    requestAnimationFrame(function() {
        scrollScheduleToNow(calendar);
    });
    watchScheduleChanges(calendar);
};

const queueSchedulePatch = function(calendar) {
    if (state.schedulePatchFrame) {
        cancelAnimationFrame(state.schedulePatchFrame);
    }

    state.schedulePatchFrame = requestAnimationFrame(function() {
        state.schedulePatchFrame = null;
        patchSchedule(calendar);
    });
};

const normalizeScheduleEvents = function(events) {
    return events.map(function(event) {
        return Object.assign({}, event);
    });
};

const isPlannedLessonEvent = function(event) {
    const guid = String(event.guid || '');

    return guid.indexOf('planned-lesson-') === 0 || guid.indexOf('single-lesson-plan-') === 0;
};

const syncEvents = function(instance) {
    if (!instance || typeof instance.getData !== 'function') {
        return;
    }

    state.customEvents = normalizeScheduleEvents(instance.getData()).filter(function(event) {
        return !isPlannedLessonEvent(event);
    });
};

const normalizeTime = function(value) {
    const match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);

    if (!match || Number(match[1]) > 23 || Number(match[2]) > 59 || Number(match[2]) % 15 !== 0) {
        throw new Error('Lesson times must use HH:MM on 15-minute intervals.');
    }

    return `${String(Number(match[1])).padStart(2, '0')}:${match[2]}`;
};

const minutesToTime = function(minutes) {
    const hour = Math.floor(minutes / 60) % 24;
    const minute = minutes % 60;

    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};

const addMinutesToTime = function(value, minutes) {
    const match = normalizeTime(value).match(/^(\d{2}):(\d{2})/);
    const total = (Number(match[1]) * 60) + Number(match[2]) + Number(minutes || 0);

    return minutesToTime(total);
};

const getEventDateTime = function(event, key, visibleDate) {
    const eventDate = visibleDate || (event && event.date);

    if (!event || !eventDate || !event[key]) {
        return null;
    }

    const date = parseDateString(String(eventDate).substring(0, 10));
    const parts = normalizeTime(event[key]).split(':').map(Number);

    date.setHours(parts[0] || 0, parts[1] || 0, 0, 0);

    return date;
};

const getEventTimeStatus = function(event, visibleDate) {
    if (!event || event.isHoliday || event.isBreak) {
        return '';
    }

    const start = getEventDateTime(event, 'start', visibleDate);
    const end = getEventDateTime(event, 'end', visibleDate);
    const now = new Date();

    if (!start || !end) {
        return '';
    }

    if (start < now && end < now) {
        return 'past';
    }

    if (start > now && end > now) {
        return 'future';
    }

    return '';
};

const applyEventTimeStatusAttributes = function(element, event, visibleDate) {
    if (!element) {
        return;
    }

    const status = getEventTimeStatus(event, visibleDate);

    element.toggleAttribute('past-event', status === 'past');
    element.toggleAttribute('future-event', status === 'future');
};

const applyDateStatusAttributes = function(element, dateString) {
    if (!element || !dateString) {
        return;
    }

    const today = todayString();

    element.toggleAttribute('past-event', dateString < today);
    element.toggleAttribute('future-event', dateString > today);
};

const applyCalendarItemStatusAttributes = function(element, event, fallbackDateString) {
    if (!element) {
        return;
    }

    if (event && (event.isHoliday || event.isBreak)) {
        applyDateStatusAttributes(element, event.date || fallbackDateString);
        return;
    }

    applyEventTimeStatusAttributes(element, event);
};

const isCanceledCalendarEvent = function(event) {
    return event && (event.lessonStatus === 'canceled' || event.calendarStatus === 'canceled' || event['data-lesson-status'] === 'canceled');
};

const isConflictEligibleTimedEvent = function(event) {
    return event
        && event.guid
        && !event.isHoliday
        && !event.isBreak
        && !isCanceledCalendarEvent(event)
        && event.start
        && event.end;
};

const getOverlappingTimedEventGuids = function(events) {
    const timedEvents = events
        .filter(function(event) {
            return isConflictEligibleTimedEvent(event);
        })
        .map(function(event) {
            return {
                guid: event.guid,
                start: getTimeMinutes(event.start),
                end: getTimeMinutes(event.end),
            };
        })
        .filter(function(event) {
            return event.end > event.start;
        });
    const guids = new Set();

    timedEvents.forEach(function(event, index) {
        timedEvents.slice(index + 1).forEach(function(otherEvent) {
            if (event.start < otherEvent.end && otherEvent.start < event.end) {
                guids.add(event.guid);
                guids.add(otherEvent.guid);
            }
        });
    });

    return guids;
};

const isOverlappingTimedEvent = function(event, visibleDate) {
    const eventDate = visibleDate || (event && event.date);

    if (!isConflictEligibleTimedEvent(event) || !eventDate) {
        return false;
    }

    const date = parseDateString(String(eventDate).substring(0, 10));

    return getOverlappingTimedEventGuids(getEventsForDate(date)).has(event.guid);
};

const applyEventOverlapAttribute = function(element, event) {
    if (!element) {
        return;
    }

    const cell = element.closest('td[data-date]');
    const visibleDate = cell
        ? (cell.getAttribute('data-real-date') || cell.getAttribute('data-date'))
        : '';

    element.toggleAttribute('overlapping-event', isOverlappingTimedEvent(event, visibleDate));
};

const formatSelectTime = function(value) {
    const match = normalizeTime(value).match(/^(\d{2}):(\d{2})/);
    let hour = Number(match[1]);
    const period = hour < 12 ? 'AM' : 'PM';

    hour = hour % 12 || 12;

    return `${hour}:${match[2]} ${period}`;
};

const formatDuration = function(minutes) {
    if (minutes >= 60) {
        const hours = minutes / 60;

        return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} hr`;
    }

    return `${minutes} min`;
};

const setTimeSelectValue = function(select, value) {
    if (!select) {
        return;
    }

    const normalized = normalizeTime(value);

    if (Array.from(select.options).some(function(option) {
        return option.value === normalized;
    })) {
        select.value = normalized;
        return;
    }

    if (select.options.length) {
        select.selectedIndex = 0;
    }
};

const getSelectTimeMinutes = function(select) {
    return getTimeMinutes(select && select.value ? select.value : '00:00');
};

const getSelectOptionMinutes = function(select) {
    return Array.from(select ? select.options : []).map(function(option) {
        return getTimeMinutes(option.value);
    });
};

const getSelectMinMinutes = function(select) {
    const options = getSelectOptionMinutes(select);

    return options.length ? Math.min.apply(null, options) : 0;
};

const getSelectMaxMinutes = function(select) {
    const options = getSelectOptionMinutes(select);

    return options.length ? Math.max.apply(null, options) : 0;
};

const setSelectMinutes = function(select, minutes) {
    if (!select) {
        return;
    }

    select.value = minutesToTime(minutes);
};

const cacheRescheduleEndOptions = function(endSelect) {
    if (!endSelect) {
        return [];
    }

    if (Array.isArray(endSelect.calendarRescheduleEndOptions)) {
        return endSelect.calendarRescheduleEndOptions;
    }

    endSelect.calendarRescheduleEndOptions = Array.from(endSelect.options).map(function(option) {
        return {
            value: option.value,
            label: option.textContent,
        };
    });

    return endSelect.calendarRescheduleEndOptions;
};

const renderRescheduleEndOptions = function(startSelect, endSelect, preferredValue) {
    if (!startSelect || !endSelect) {
        return;
    }

    const allOptions = cacheRescheduleEndOptions(endSelect);

    const startMinutes = getSelectTimeMinutes(startSelect);
    const selectedValue = preferredValue || endSelect.value;
    const options = allOptions.filter(function(option) {
        return getTimeMinutes(option.value) > startMinutes;
    });

    endSelect.innerHTML = '';

    options.forEach(function(option) {
        const element = document.createElement('option');
        const duration = getTimeMinutes(option.value) - startMinutes;

        element.value = option.value;
        element.textContent = `${option.label} (${formatDuration(duration)})`;
        endSelect.appendChild(element);
    });

    if (options.some(function(option) {
        return option.value === selectedValue;
    })) {
        endSelect.value = selectedValue;
        return;
    }

    if (endSelect.options.length) {
        endSelect.selectedIndex = 0;
    }
};

const syncRescheduleTimePicker = function(startSelect, endSelect, changedField) {
    if (!startSelect || !endSelect) {
        return;
    }

    const startMin = getSelectMinMinutes(startSelect);
    const endMax = getSelectMaxMinutes(endSelect);
    let startMinutes = getSelectTimeMinutes(startSelect);
    let endMinutes = getSelectTimeMinutes(endSelect);
    const duration = Math.max(15, state.rescheduleDurationMinutes || (endMinutes - startMinutes) || 15);

    if (!state.rescheduleAnchor) {
        state.rescheduleAnchor = changedField;
    }

    if (changedField === 'start') {
        startMinutes = Math.min(startMinutes, endMax - 15);

        if (state.rescheduleAnchor === 'start') {
            endMinutes = Math.min(startMinutes + duration, endMax);
        }

        if (endMinutes < startMinutes + 15) {
            endMinutes = Math.min(startMinutes + 15, endMax);
        }

        setSelectMinutes(startSelect, startMinutes);
        renderRescheduleEndOptions(startSelect, endSelect, minutesToTime(endMinutes));
        setSelectMinutes(endSelect, endMinutes);
    }

    if (changedField === 'end') {
        endMinutes = Math.max(endMinutes, startMin + 15);

        if (state.rescheduleAnchor === 'end') {
            startMinutes = Math.max(endMinutes - duration, startMin);
        }

        if (endMinutes < startMinutes + 15) {
            endMinutes = Math.min(startMinutes + 15, endMax);
        }

        setSelectMinutes(startSelect, startMinutes);
        renderRescheduleEndOptions(startSelect, endSelect, minutesToTime(endMinutes));
        setSelectMinutes(endSelect, endMinutes);
    }

    state.rescheduleDurationMinutes = Math.max(15, endMinutes - startMinutes);
};

const getStudentName = function(student) {
    if (!student) {
        return 'No title';
    }

    return [student.first_name, student.last_name].filter(Boolean).join(' ') || 'No title';
};

const getStudentFirstName = function(student) {
    return student && student.first_name ? String(student.first_name).trim() : '';
};

const studentHasBirthdayInWeek = function(student, dateString) {
    if (!student || !student.date_of_birth || !isDateString(dateString)) {
        return false;
    }

    const birthDate = parseNullableDateString(student.date_of_birth);

    if (!birthDate) {
        return false;
    }

    const eventDate = parseDateString(dateString);
    const weekStart = startOfWeek(eventDate);
    const weekEnd = addDays(weekStart, 6);
    const years = Array.from(new Set([weekStart.getFullYear(), weekEnd.getFullYear()]));

    return years.some(function(year) {
        const birthday = createLocalDate(year, birthDate.getMonth(), birthDate.getDate());

        return birthday >= weekStart && birthday <= weekEnd;
    });
};

const getOrdinalSuffix = function(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }

    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

const formatBirthdayModalDate = function(date) {
    return `${birthdayMonthFormatter.format(date)} ${date.getDate()}${getOrdinalSuffix(date.getDate())}`;
};

const getStudentBirthdayModalLabel = function(student, dateString) {
    if (!student || !student.date_of_birth || !isDateString(dateString)) {
        return '';
    }

    const birthDate = parseNullableDateString(student.date_of_birth);

    if (!birthDate) {
        return '';
    }

    const eventDate = parseDateString(dateString);
    const years = [eventDate.getFullYear() - 1, eventDate.getFullYear(), eventDate.getFullYear() + 1];
    let closestBirthday = null;
    let closestDiff = null;

    years.forEach(function(year) {
        const birthday = createLocalDate(year, birthDate.getMonth(), birthDate.getDate());
        const diff = Math.round((birthday.getTime() - eventDate.getTime()) / dayMilliseconds);

        if (Math.abs(diff) <= state.birthdayWindow && (closestDiff === null || Math.abs(diff) < Math.abs(closestDiff))) {
            closestBirthday = birthday;
            closestDiff = diff;
        }
    });

    if (!closestBirthday) {
        return '';
    }

    if (closestDiff === 0) {
        return 'today!';
    }

    if (closestDiff === -1) {
        return 'yesterday!';
    }

    if (closestDiff === 1) {
        return 'tomorrow!';
    }

    return `on ${formatBirthdayModalDate(closestBirthday)}`;
};

const studentHasBirthdayNearEvent = function(student, dateString) {
    return Boolean(getStudentBirthdayModalLabel(student, dateString));
};

const renderEventTitle = function(element, event, fallback) {
    if (!element) {
        return;
    }

    element.textContent = (event && event.title) || fallback || 'No title';
};

const clearScheduleItemBirthdayDecoration = function(item) {
    if (!item) {
        return;
    }

    Array.from(item.children).forEach(function(child) {
        if (child.classList && child.classList.contains('calendar-birthday-icon')) {
            child.remove();
        }
    });

    item.removeAttribute('data-birthday-this-week');
    item.removeAttribute('data-birthday-title');
};

const normalizeStudentSearch = function(value) {
    return String(value || '').trim().toLowerCase();
};

const generalEventMatchesCalendarSearch = function(event) {
    const query = normalizeStudentSearch(state.studentSearch);

    if (query.length < 3) {
        return true;
    }

    return String(event.event_type || '').toLowerCase().includes(query);
};

const lessonMatchesStudentSearch = function(lesson) {
    const query = normalizeStudentSearch(state.studentSearch);

    if (query.length < 3) {
        return true;
    }

    const student = lesson.student || {};
    const firstName = String(student.first_name || '').toLowerCase();
    const lastName = String(student.last_name || '').toLowerCase();
    const fullName = [firstName, lastName].filter(Boolean).join(' ');

    return firstName.includes(query) || lastName.includes(query) || fullName.includes(query);
};

const lessonMatchesLocationFilter = function(lesson) {
    if (!isLocationFilterActive()) {
        return true;
    }

    return locationIsSelected(lesson.location_id);
};

const getFilteredPlannedLessons = function() {
    return state.plannedLessons.concat(state.singleLessonPlans)
        .filter(function(lesson) {
            const type = lesson.type === 'single-lesson-plan' ? 'single' : 'recurring';

            return state.selectedEventTypes.includes(type);
        })
        .filter(lessonMatchesStudentSearch)
        .filter(lessonMatchesLocationFilter);
};

const getFirstOccurrenceDate = function(startsOn, weekday) {
    const start = cloneDate(startsOn);
    const carbonWeekday = Math.max(0, Math.min(6, Number(weekday) - 1));
    const offset = (carbonWeekday - start.getDay() + 7) % 7;

    return addDays(start, offset);
};

const getPlannedLessonEvents = function(range) {
    const events = [];

    getFilteredPlannedLessons().forEach(function(lesson) {
        const isSingleLessonPlan = lesson.type === 'single-lesson-plan';

        if (Array.isArray(lesson.occurrences)) {
            lesson.occurrences.forEach(function(occurrence) {
                const dateString = occurrence.date || '';

                if (!dateString) {
                    return;
                }

                const start = normalizeTime(occurrence.start || lesson.start_time);

                events.push({
                    title: getStudentName(lesson.student),
                    date: dateString,
                    start,
                    end: normalizeTime(occurrence.end || addMinutesToTime(lesson.start_time, lesson.duration_minutes)),
                    color: '#2fbb7f',
                    guid: `${isSingleLessonPlan ? 'single-lesson-plan' : 'planned-lesson'}-${lesson.id}-${dateString}-${start}`,
                    lessonPlanId: isSingleLessonPlan ? '' : lesson.id,
                    singleLessonPlanId: occurrence.single_lesson_plan_id || (isSingleLessonPlan ? lesson.id : ''),
                    lessonId: occurrence.lesson_id || '',
                    earlyPaymentId: occurrence.early_payment_id || '',
                    scheduleOverrideId: occurrence.schedule_override_id || '',
                    recurrence: isSingleLessonPlan ? 'Single lesson' : (lesson.recurrence || ''),
                    isSingleLessonPlan,
                    originalDate: occurrence.original_date || dateString,
                    originalStartTime: occurrence.original_start_time || start,
                    lessonStatus: occurrence.lesson_status || 'unconfirmed',
                    calendarStatus: occurrence.calendar_status || occurrence.lesson_status || 'unconfirmed',
                    'data-lesson-status': occurrence.calendar_status || occurrence.lesson_status || 'unconfirmed',
                    feeAmount: occurrence.fee_amount || lesson.fee_amount || 0,
                    locationId: normalizeLocationId(lesson.location_id),
                    locationName: lesson.location && lesson.location.name ? lesson.location.name : '',
                    canceledBy: occurrence.canceled_by || '',
                    calendarEditUrl: getLessonPlanModalEditUrl(isSingleLessonPlan, lesson.id),
                    lessonEditUrl: occurrence.lesson_edit_url || '',
                    paymentUrl: occurrence.lesson_payment_url || occurrence.payment_url || '',
                    meetingUrl: occurrence.meeting_url || lesson.meeting_url || '',
                    notesUrl: occurrence.notes_url || lesson.notes_url || '',
                    studentFirstName: getStudentFirstName(lesson.student),
                    hasBirthdayThisWeek: studentHasBirthdayInWeek(lesson.student, dateString),
                    hasBirthdayNearEvent: studentHasBirthdayNearEvent(lesson.student, dateString),
                    birthdayModalLabel: getStudentBirthdayModalLabel(lesson.student, dateString),
                });
            });

            return;
        }

        if (isSingleLessonPlan) {
            return;
        }

        const startsOn = parseNullableDateString(lesson.starts_on);

        if (!startsOn) {
            return;
        }

        const interval = Math.max(1, Number(lesson.recurrence_interval || 1));
        const intervalDays = interval * 7;
        const endsOn = parseNullableDateString(lesson.ends_on);
        const firstOccurrence = getFirstOccurrenceDate(startsOn, lesson.weekday);
        let occurrence = cloneDate(firstOccurrence);

        if (endsOn && endsOn < range.start) {
            return;
        }

        if (occurrence < range.start) {
            const daysUntilRange = Math.floor((range.start - occurrence) / 86400000);
            const intervalsToSkip = Math.floor(daysUntilRange / intervalDays);

            occurrence = addDays(occurrence, intervalsToSkip * intervalDays);

            while (occurrence < range.start) {
                occurrence = addDays(occurrence, intervalDays);
            }
        }

        while (occurrence <= range.end && (!endsOn || occurrence <= endsOn)) {
            const dateString = toDateString(occurrence);
            const start = normalizeTime(lesson.start_time);
            const confirmedLesson = getLessonForOccurrence(lesson, dateString, start);
            const lessonStatus = getLessonStatus(confirmedLesson);

            events.push({
                title: getStudentName(lesson.student),
                date: dateString,
                start,
                end: addMinutesToTime(start, lesson.duration_minutes),
                color: '#2fbb7f',
                guid: `planned-lesson-${lesson.id}-${dateString}`,
                lessonPlanId: lesson.id,
                lessonId: confirmedLesson ? confirmedLesson.id : '',
                recurrence: lesson.recurrence || '',
                lessonStatus,
                calendarStatus: lessonStatus,
                'data-lesson-status': lessonStatus,
                feeAmount: confirmedLesson && confirmedLesson.fee_amount ? confirmedLesson.fee_amount : (lesson.fee_amount || 0),
                locationId: normalizeLocationId(lesson.location_id),
                locationName: lesson.location && lesson.location.name ? lesson.location.name : '',
                canceledBy: confirmedLesson && confirmedLesson.canceled_by ? confirmedLesson.canceled_by : '',
                calendarEditUrl: getLessonPlanModalEditUrl(false, lesson.id),
                lessonEditUrl: getLessonEditUrl(confirmedLesson),
                paymentUrl: getLessonPaymentUrl(confirmedLesson),
                meetingUrl: lesson.meeting_url || '',
                notesUrl: lesson.notes_url || '',
                studentFirstName: getStudentFirstName(lesson.student),
                hasBirthdayThisWeek: studentHasBirthdayInWeek(lesson.student, dateString),
                hasBirthdayNearEvent: studentHasBirthdayNearEvent(lesson.student, dateString),
                birthdayModalLabel: getStudentBirthdayModalLabel(lesson.student, dateString),
            });

            occurrence = addDays(occurrence, intervalDays);
        }
    });

    return events;
};

const syncCalendarEvents = function() {
    const generalEvents = state.selectedEventTypes.includes('general') ? getGeneralEventCalendarEvents() : [];

    state.events = normalizeScheduleEvents(state.customEvents)
        .concat(getPlannedLessonEvents(getCalendarEventRange()))
        .concat(generalEvents);
    state.visibleEventsByDate = null;
};

const createCalendarEvent = function(date) {
    return {
        title: 'No title',
        date: toDateString(date),
        start: '09:00',
        end: '10:00',
        color: '#2fbb7f',
        guid: `calendar-${Date.now()}-${Math.round(Math.random() * 100000)}`,
    };
};

const getEventsForDate = function(date) {
    const dateString = toDateString(date);

    return getVisibleEventsByDate()[dateString] || [];
};

const getCalendarItemsForDate = function(date) {
    const holidays = getHolidaysForDate(date).map(function(holiday) {
        return Object.assign({}, holiday, {
            guid: `holiday-${holiday.date}-${holiday.title}`,
            isHoliday: true,
        });
    });

    return holidays.concat(getBreakEventsForDate(date)).concat(getRecitalEventsForDate(date)).concat(getEventsForDate(date));
};

const hasOverlappingTimedEvents = function(events) {
    let latestEnd = null;

    return events
        .filter(function(event) {
            return isConflictEligibleTimedEvent(event);
        })
        .map(function(event) {
            return {
                start: getTimeMinutes(event.start),
                end: getTimeMinutes(event.end),
            };
        })
        .filter(function(event) {
            return event.end > event.start;
        })
        .sort(function(a, b) {
            return a.start - b.start || a.end - b.end;
        })
        .some(function(event) {
            const overlaps = latestEnd !== null && event.start < latestEnd;

            latestEnd = latestEnd === null ? event.end : Math.max(latestEnd, event.end);

            return overlaps;
        });
};

const createMonthEventElement = function(event, dateString) {
    const item = document.createElement('span');
    const dot = document.createElement('span');
    const time = document.createElement('span');
    const title = document.createElement('span');

    item.className = event.isHoliday
        ? 'calendar-month-event calendar-month-event-holiday'
        : (event.isBreak
            ? 'calendar-month-event calendar-month-event-break'
            : (event.isRecital
                ? 'calendar-month-event calendar-month-event-recital'
                : (event.isGeneralEvent ? 'calendar-month-event calendar-month-event-general' : 'calendar-month-event')));
    dot.className = 'calendar-month-event-dot';
    time.className = 'calendar-month-event-time';
    title.className = 'calendar-month-event-title';
    item.dataset.eventGuid = event.guid || '';
    item.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.isRecital ? 'recital' : (event.isGeneralEvent ? 'general-event' : (event.calendarStatus || event.lessonStatus || 'unconfirmed'))));
    dot.dataset.eventGuid = event.guid || '';
    dot.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.isRecital ? 'recital' : (event.isGeneralEvent ? 'general-event' : (event.calendarStatus || event.lessonStatus || 'unconfirmed'))));
    applyCalendarItemStatusAttributes(item, event, dateString);
    applyCalendarItemStatusAttributes(dot, event, dateString);

    time.textContent = event.isHoliday || event.isBreak ? '' : formatEventTime(event.start);
    renderEventTitle(title, event, 'No title');

    if (!event.isHoliday && !event.isBreak && !event.isRecital && !event.isGeneralEvent) {
        item.appendChild(dot);
    }

    if (!event.isHoliday && !event.isBreak) item.appendChild(time);

    item.appendChild(title);

    return item;
};

const hideBootstrapModal = function(modal) {
    if (!modal) {
        return;
    }

    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).hide();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('hide');
    }
};

const showBootstrapModal = function(modal) {
    if (!modal) {
        return;
    }

    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).show();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('show');
    }
};

const showCalendarEditError = function(modal, message) {
    if (!modal) {
        return;
    }

    let error = modal.querySelector('[data-calendar-edit-error]');

    if (!error) {
        error = document.createElement('div');
        error.className = 'alert alert-danger small mb-3';
        error.setAttribute('data-calendar-edit-error', '');
        modal.querySelector('.modal-body').prepend(error);
    }

    error.textContent = message || 'Unable to update this item.';
    error.hidden = false;
};

const initializeCalendarEditModal = function(modal) {
    if (!modal) {
        return;
    }

    initializeSingleLessonPlanForms(modal);
    initializeLessonPlanForms(modal);

    const currencyInputs = modal.querySelectorAll('[data-mask="usd"]');

    if (currencyInputs.length && typeof window.Inputmask === 'function') {
        new window.Inputmask({
            alias: 'numeric',
            groupSeparator: ',',
            prefix: '$ ',
            autoGroup: true,
            digits: 0,
            rightAlign: false,
        }).mask(currencyInputs);
    }
};

const loadCalendarEditModal = function(button, sourceModal, container) {
    const url = button ? button.dataset.url : '';

    if (!button || !url || !container) {
        return;
    }

    button.disabled = true;

    fetch(url, {
        headers: {
            'Accept': 'text/html',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Unable to load the edit form.');
            }

            return response.text();
        })
        .then(function(html) {
            let didShow = false;

            container.innerHTML = html;

            const editModal = container.querySelector('.modal');
            const showEditModal = function() {
                if (didShow || !editModal) {
                    return;
                }

                didShow = true;
                initializeCalendarEditModal(editModal);
                showBootstrapModal(editModal);
            };

            button.disabled = false;

            if (sourceModal && sourceModal.classList.contains('show')) {
                sourceModal.addEventListener('hidden.bs.modal', showEditModal, { once: true });
                hideBootstrapModal(sourceModal);
                window.setTimeout(showEditModal, 250);
                return;
            }

            showEditModal();
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;

            if (sourceModal && sourceModal.id === 'lesson-modal') {
                showLessonActionError(sourceModal, error.message);
            } else {
                showGeneralEventActionError(sourceModal, error.message);
            }
        });
};

const submitCalendarEditForm = function(form, refreshCalendar) {
    const modal = form ? form.closest('.modal') : null;

    if (!form || !form.action || !modal) {
        return;
    }

    setFormSubmitting(form, true);

    requestJson(form.action, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: new FormData(form),
    }, 'Unable to update this item.')
        .then(function() {
            hideBootstrapModal(modal);
            return refreshCalendar();
        })
        .catch(function(error) {
            console.error(error);
            showCalendarEditError(modal, error.message);
        })
        .finally(function() {
            setFormSubmitting(form, false);
        });
};

const openMonthDayEventsModal = function(dateString) {
    const modal = document.getElementById('month-day-events-modal');

    if (!modal) {
        return;
    }

    const title = modal.querySelector('.modal-title');
    const list = modal.querySelector('[data-month-day-events-list]');
    const conflict = modal.querySelector('[data-month-day-events-conflict]');
    const date = parseDateString(dateString);
    const events = getCalendarItemsForDate(date);
    const overlappingEventGuids = getOverlappingTimedEventGuids(events);

    if (title) {
        title.textContent = dayFormatter.format(date);
    }

    if (list) {
        list.innerHTML = '';
        const specialEvents = events.filter(function(event) {
            return event.isHoliday || event.isBreak || event.isRecital;
        });
        const regularEvents = events.filter(function(event) {
            return !event.isHoliday && !event.isBreak && !event.isRecital;
        });
        const appendEvent = function(container, event) {
            const item = createMonthEventElement(event, dateString);

            item.toggleAttribute('overlapping-event', overlappingEventGuids.has(event.guid));
            container.appendChild(item);
        };

        if (specialEvents.length) {
            const specialEventsContainer = document.createElement('div');

            specialEventsContainer.className = 'calendar-month-day-events-special d-flex flex-wrap gap-1';
            specialEvents.forEach(function(event) {
                appendEvent(specialEventsContainer, event);
            });
            list.appendChild(specialEventsContainer);
        }

        regularEvents.forEach(function(event) {
            appendEvent(list, event);
        });
    }

    if (conflict) conflict.hidden = overlappingEventGuids.size === 0;

    showBootstrapModal(modal);
};

const renderMonthCalendar = function(calendar) {
    const today = todayString();
    const selected = toDateString(state.date);
    const month = state.date.getMonth();
    const gridStart = startOfMonthGrid(state.date);
    const wrapper = document.createElement('div');
    const weekdaysRow = document.createElement('div');
    const grid = document.createElement('div');

    wrapper.className = 'calendar-month-calendar';
    weekdaysRow.className = 'calendar-month-weekdays';
    grid.className = 'calendar-month-grid';

    monthWeekdays.forEach(function(day) {
        const heading = document.createElement('div');

        heading.textContent = day;
        weekdaysRow.appendChild(heading);
    });

    for (let i = 0; i < 42; i++) {
        const date = addDays(gridStart, i);
        const dateString = toDateString(date);
        const events = getCalendarItemsForDate(date);
        const cell = document.createElement('div');
        const day = document.createElement('span');
        const list = document.createElement('span');
        const hasOverlaps = hasOverlappingTimedEvents(events);
        const visibleEventCount = events.length >= 5 ? 3 : 4;

        cell.className = 'calendar-month-day';
        cell.dataset.date = dateString;
        cell.setAttribute('role', 'button');
        cell.tabIndex = 0;

        if (date.getMonth() !== month) {
            cell.classList.add('is-muted');
        }

        if (dateString === today) {
            cell.classList.add('is-today');
        }

        if (dateString === selected) {
            cell.classList.add('is-selected');
        }

        day.className = 'calendar-month-day-number';
        day.textContent = date.getDate() === 1
            ? `${shortMonthFormatter.format(date)} ${date.getDate()}`
            : date.getDate();

        list.className = 'calendar-month-events';

        if (hasOverlaps) {
            const alert = document.createElement('i');

            alert.className = 'fa-solid fa-circle-exclamation calendar-month-overlap-alert';
            alert.setAttribute('aria-hidden', 'true');
            cell.appendChild(alert);
        }

        events.slice(0, visibleEventCount).forEach(function(event) {
            list.appendChild(createMonthEventElement(event, dateString));
        });

        if (events.length > 4) {
            const more = document.createElement('span');

            more.className = 'calendar-month-more';
            more.dataset.monthMoreDate = dateString;
            more.setAttribute('role', 'button');
            more.tabIndex = 0;
            more.textContent = `${events.length - visibleEventCount} more`;
            list.appendChild(more);
        }

        cell.appendChild(day);
        cell.appendChild(list);
        grid.appendChild(cell);
    }

    wrapper.appendChild(weekdaysRow);
    wrapper.appendChild(grid);
    calendar.appendChild(wrapper);
};

const renderScheduleAgenda = function(calendar) {
    const range = getVisibleDateRange();
    const today = todayString();
    const selected = toDateString(state.date);
    const wrapper = document.createElement('div');

    wrapper.className = 'calendar-schedule-agenda';

    getDateRangeDates(range).forEach(function(date) {
        const dateString = toDateString(date);
        const items = getCalendarItemsForDate(date);
        const shouldRenderEmpty = dateString === today || dateString === selected;

        if (!items.length && !shouldRenderEmpty) {
            return;
        }

        const day = document.createElement('section');
        const dateRail = document.createElement('div');
        const weekday = document.createElement('div');
        const number = document.createElement('div');
        const list = document.createElement('div');

        day.className = 'calendar-schedule-day';
        day.dataset.date = dateString;
        dateRail.className = 'calendar-schedule-date';
        weekday.className = 'calendar-schedule-weekday';
        number.className = 'calendar-schedule-number';
        list.className = 'calendar-schedule-list';

        if (dateString === today) {
            day.classList.add('is-today');
        }

        if (dateString === selected) {
            day.classList.add('is-selected');
        }

        weekday.textContent = weekdays[date.getDay()].toUpperCase();
        number.textContent = date.getDate();
        dateRail.appendChild(weekday);
        dateRail.appendChild(number);

        if (!items.length) {
            const empty = document.createElement('div');

            empty.className = 'calendar-schedule-empty';
            empty.textContent = 'Nothing planned.';
            list.appendChild(empty);
        }

        items.forEach(function(event) {
            const item = document.createElement(event.isHoliday ? 'div' : 'button');
            const title = document.createElement('span');

            item.className = event.isHoliday
                ? 'calendar-schedule-event calendar-schedule-event-holiday'
                : (event.isBreak
                    ? 'calendar-schedule-event calendar-schedule-event-break'
                    : (event.isRecital
                        ? 'calendar-schedule-event calendar-schedule-recital'
                        : (event.isGeneralEvent ? 'calendar-schedule-event calendar-schedule-event-general' : 'calendar-schedule-event')));
            title.className = 'calendar-schedule-event-title';
            renderEventTitle(title, event, 'No title');
            item.dataset.eventGuid = event.guid || '';
            item.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.isRecital ? 'recital' : (event.isGeneralEvent ? 'general-event' : (event.calendarStatus || event.lessonStatus || 'unconfirmed'))));
            applyCalendarItemStatusAttributes(item, event, dateString);
            applyEventOverlapAttribute(item, event);

            if (!event.isHoliday && !event.isBreak && !event.isRecital) {
                const time = document.createElement('span');
                const duration = getEventDurationMinutes(event);

                item.type = 'button';
                item.dataset.durationMinutes = duration;
                item.style.setProperty('--calendar-schedule-event-height', getAgendaEventHeight(event));
                time.className = 'calendar-schedule-event-time';
                time.textContent = event.start && event.end
                    ? `${formatAgendaEventTime(event.start)}-${formatAgendaEventTime(event.end)}`
                    : formatAgendaEventTime(event.start);
                item.appendChild(title);
                item.appendChild(time);
            } else {
                if (event.isBreak || event.isRecital) {
                    item.type = 'button';
                }

                item.appendChild(title);

                if (event.isRecital) {
                    const time = document.createElement('span');
                    time.className = 'calendar-schedule-event-time';
                    time.textContent = formatAgendaEventTime(event.start);
                    item.appendChild(time);
                }
            }

            list.appendChild(item);
        });

        day.appendChild(dateRail);
        day.appendChild(list);
        wrapper.appendChild(day);
    });

    calendar.appendChild(wrapper);

    return wrapper;
};

const cloneDate = function(date) {
    return createLocalDate(date.getFullYear(), date.getMonth(), date.getDate());
};

const addDays = function(date, days) {
    const next = cloneDate(date);

    next.setDate(next.getDate() + days);

    return next;
};

const addMonths = function(date, months) {
    const next = cloneDate(date);

    next.setMonth(next.getMonth() + months);

    return next;
};

const startOfMonthGrid = function(date) {
    const start = createLocalDate(date.getFullYear(), date.getMonth(), 1);

    start.setDate(start.getDate() - start.getDay());

    return start;
};

const startOfWeek = function(date) {
    return addDays(date, -date.getDay());
};

const getWeekLabel = function(date) {
    const start = startOfWeek(date);
    const end = addDays(start, 6);

    return getRangeLabel(start, end);
};

const getRangeLabel = function(start, end) {
    const sameMonth = start.getMonth() === end.getMonth();
    const sameYear = start.getFullYear() === end.getFullYear();

    if (sameMonth && sameYear) {
        return monthFormatter.format(start);
    }

    if (sameYear) {
        return `${shortMonthFormatter.format(start)} - ${shortMonthFormatter.format(end)} ${end.getFullYear()}`;
    }

    return `${shortMonthFormatter.format(start)} ${start.getFullYear()} - ${shortMonthFormatter.format(end)} ${end.getFullYear()}`;
};

const getLabel = function() {
    if (state.view === 'schedule') {
        return monthFormatter.format(state.date);
    }

    if (state.view === 'day') {
        return dayFormatter.format(state.date);
    }

    if (state.view === '2-days') {
        return getRangeLabel(state.date, addDays(state.date, 1));
    }

    if (state.view === 'week') {
        return getWeekLabel(state.date);
    }

    return monthFormatter.format(state.date);
};

const move = function(direction) {
    if (state.view === 'day') {
        setSelectedDate(addDays(state.date, direction));
    } else if (state.view === '2-days') {
        setSelectedDate(addDays(state.date, direction * 2));
    } else if (state.view === 'week') {
        setSelectedDate(addDays(state.date, direction * 7));
    } else if (state.view === 'month' || state.view === 'schedule') {
        setSelectedDate(addMonths(state.date, direction));
    }
};

const getScheduleSwipeAnchor = function(direction) {
    if (state.view === 'day') {
        return addDays(state.date, direction);
    }

    if (state.view === '2-days') {
        return addDays(state.date, direction * 2);
    }

    return addDays(state.date, direction * 7);
};

const createScheduleSwipePreview = function(calendar) {
    const schedule = calendar.querySelector('.lm-schedule');
    const headerRow = schedule ? schedule.querySelector('thead tr:not(.calendar-schedule-holiday-row)') : null;
    const visibleHeaders = headerRow
        ? Array.from(headerRow.querySelectorAll('td')).filter(function(header) {
            return header.offsetParent !== null;
        })
        : [];

    if (!schedule || !headerRow || visibleHeaders.length < 2) {
        return null;
    }

    const scheduleRect = schedule.getBoundingClientRect();
    const headerRect = headerRow.getBoundingClientRect();
    const width = schedule.clientWidth;
    const height = headerRect.height;
    const gutterWidth = visibleHeaders[0].getBoundingClientRect().width;
    const sampleHeaderStyle = window.getComputedStyle(visibleHeaders[1]);
    const sampleWeekdayStyle = window.getComputedStyle(visibleHeaders[1], '::before');
    const viewport = document.createElement('div');
    const track = document.createElement('div');

    viewport.className = 'calendar-schedule-swipe-preview';
    viewport.dataset.scheduleSwipePreview = '';
    viewport.style.left = `${schedule.scrollLeft}px`;
    viewport.style.top = `${schedule.scrollTop + headerRect.top - scheduleRect.top}px`;
    viewport.style.width = `${width}px`;
    // Leave the header's own bottom pixel uncovered. Its td::after border then
    // remains on the non-moving sticky header layer while the preview slides.
    viewport.style.height = `${Math.max(0, height - 1)}px`;
    viewport.style.setProperty('--calendar-swipe-number-size', sampleHeaderStyle.fontSize);
    viewport.style.setProperty('--calendar-swipe-number-weight', sampleHeaderStyle.fontWeight);
    viewport.style.setProperty('--calendar-swipe-number-line-height', sampleHeaderStyle.lineHeight);
    viewport.style.setProperty('--calendar-swipe-weekday-size', sampleWeekdayStyle.fontSize);
    viewport.style.setProperty('--calendar-swipe-weekday-weight', sampleWeekdayStyle.fontWeight);
    viewport.style.setProperty('--calendar-swipe-weekday-line-height', sampleWeekdayStyle.lineHeight);
    viewport.style.setProperty('--calendar-swipe-weekday-spacing', sampleWeekdayStyle.paddingBottom);
    viewport.style.setProperty('--calendar-swipe-padding-top', sampleHeaderStyle.paddingTop);
    viewport.style.setProperty('--calendar-swipe-padding-right', sampleHeaderStyle.paddingRight);
    viewport.style.setProperty('--calendar-swipe-padding-bottom', sampleHeaderStyle.paddingBottom);
    viewport.style.setProperty('--calendar-swipe-padding-left', sampleHeaderStyle.paddingLeft);
    viewport.style.setProperty('--calendar-swipe-text-align', sampleHeaderStyle.textAlign);
    viewport.style.setProperty('--calendar-swipe-font-family', sampleHeaderStyle.fontFamily);
    viewport.style.setProperty('--calendar-swipe-color', sampleHeaderStyle.color);
    track.className = 'calendar-schedule-swipe-track';
    track.style.transform = `translate3d(${-width}px, 0, 0)`;

    [-1, 0, 1].forEach(function(direction) {
        const anchor = direction === 0 ? state.date : getScheduleSwipeAnchor(direction);
        const dates = getScheduleDatesForAnchor(anchor, state.view);
        const panel = document.createElement('div');
        const gutter = document.createElement('div');

        panel.className = 'calendar-schedule-swipe-panel';
        panel.style.width = `${width}px`;
        panel.style.height = `${height}px`;
        panel.style.gridTemplateColumns = `${gutterWidth}px repeat(${dates.length}, minmax(0, 1fr))`;
        gutter.className = 'calendar-schedule-swipe-gutter';
        panel.appendChild(gutter);

        dates.forEach(function(date) {
            const cell = document.createElement('div');
            const weekday = document.createElement('span');
            const day = document.createElement('span');

            cell.className = 'calendar-schedule-swipe-day';
            cell.classList.toggle('is-today', toDateString(date) === todayString());
            weekday.className = 'calendar-schedule-swipe-weekday';
            weekday.textContent = weekdays[date.getDay()];
            day.className = 'calendar-schedule-swipe-number';
            day.textContent = String(date.getDate()).padStart(2, '0');
            cell.appendChild(weekday);
            cell.appendChild(day);
            panel.appendChild(cell);
        });

        track.appendChild(panel);
    });

    viewport.appendChild(track);
    schedule.appendChild(viewport);

    return { viewport, track, width };
};

const bindScheduleHeaderSwipe = function(calendar, navigate) {
    let gesture = null;

    const removePreview = function(preview) {
        if (preview && preview.viewport.parentNode) {
            preview.viewport.remove();
        }
    };

    const finish = function(event, canceled) {
        if (!gesture || (event.pointerId !== undefined && event.pointerId !== gesture.pointerId)) {
            return;
        }

        const current = gesture;
        const elapsed = Math.max(1, event.timeStamp - current.startedAt);
        const velocity = current.deltaX / elapsed;
        const threshold = Math.min(90, current.preview ? current.preview.width * 0.18 : 90);
        const shouldNavigate = !canceled && current.dragging && (
            Math.abs(current.deltaX) >= threshold ||
            (Math.abs(current.deltaX) >= 24 && Math.abs(velocity) >= 0.45)
        );

        gesture = null;
        document.documentElement.classList.remove('calendar-schedule-header-grabbing');

        if (!current.preview) {
            return;
        }

        current.preview.track.classList.add('is-settling');

        if (!shouldNavigate) {
            current.preview.track.style.transform = `translate3d(${-current.preview.width}px, 0, 0)`;
            window.setTimeout(function() {
                removePreview(current.preview);
            }, 240);
            return;
        }

        const direction = current.deltaX < 0 ? 1 : -1;
        const destination = direction > 0 ? -current.preview.width * 2 : 0;

        current.preview.track.style.transform = `translate3d(${destination}px, 0, 0)`;
        window.setTimeout(function() {
            navigate(direction);
        }, 220);
    };

    calendar.addEventListener('pointerdown', function(event) {
        const headerRow = event.target.closest('.lm-schedule thead tr:not(.calendar-schedule-holiday-row)');

        if (!headerRow || !scheduleGridViews.includes(state.view) || event.button !== 0 || !event.isPrimary) {
            return;
        }

        gesture = {
            pointerId: event.pointerId,
            startedAt: event.timeStamp,
            startX: event.clientX,
            startY: event.clientY,
            deltaX: 0,
            dragging: false,
            preview: null,
        };
        document.documentElement.classList.add('calendar-schedule-header-grabbing');

        if (typeof headerRow.setPointerCapture === 'function') {
            headerRow.setPointerCapture(event.pointerId);
        }
    });

    calendar.addEventListener('pointermove', function(event) {
        if (!gesture || event.pointerId !== gesture.pointerId) {
            return;
        }

        const deltaX = event.clientX - gesture.startX;
        const deltaY = event.clientY - gesture.startY;

        if (!gesture.dragging) {
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 7) {
                finish(event, true);
                return;
            }

            if (Math.abs(deltaX) < 7) {
                return;
            }

            gesture.dragging = true;
            gesture.preview = createScheduleSwipePreview(calendar);

            if (!gesture.preview) {
                finish(event, true);
                return;
            }
        }

        event.preventDefault();
        gesture.deltaX = Math.max(-gesture.preview.width, Math.min(gesture.preview.width, deltaX));
        gesture.preview.track.style.transform = `translate3d(${-gesture.preview.width + gesture.deltaX}px, 0, 0)`;
    });

    calendar.addEventListener('pointerup', function(event) {
        finish(event, false);
    });

    calendar.addEventListener('pointercancel', function(event) {
        finish(event, true);
    });
};

const filterStudentComboboxOptions = function(combobox) {
    const input = combobox.querySelector('[data-student-combobox-input]');
    const options = Array.from(combobox.querySelectorAll('[data-student-combobox-option]'));
    const empty = combobox.querySelector('[data-student-combobox-empty]');
    const query = input ? input.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    options.forEach(function(option) {
        const name = String(option.dataset.studentName || option.textContent || '').toLowerCase();
        const isVisible = !query || name.includes(query);

        option.hidden = !isVisible;

        if (isVisible) {
            visibleCount += 1;
        }
    });

    if (empty) {
        empty.hidden = visibleCount > 0;
    }
};

const openStudentCombobox = function(combobox) {
    combobox.setAttribute('open', '');
    filterStudentComboboxOptions(combobox);
};

const closeStudentCombobox = function(combobox) {
    combobox.removeAttribute('open');
};

const syncFormLocationFromStudentOption = function(option) {
    const form = option ? option.closest('form') : null;
    const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
    const studentLocationId = option ? option.dataset.studentLocationId : null;

    if (!locationSelect || !studentLocationId) {
        return;
    }

    const matchingOption = Array.from(locationSelect.options).find(function(locationOption) {
        return String(locationOption.value) === String(studentLocationId);
    });

    if (!matchingOption) {
        return;
    }

    locationSelect.value = studentLocationId;
    locationSelect.dispatchEvent(new Event('change', {bubbles: true}));
};

const syncFormPaymentMethodFromStudentOption = function(option) {
    const form = option ? option.closest('form') : null;
    const paymentMethodSelect = form ? form.querySelector('select[name="payment_method"]') : null;
    const studentPaymentMethod = option ? option.dataset.studentPaymentMethod : null;

    if (!paymentMethodSelect || !studentPaymentMethod) {
        return;
    }

    const matchingOption = Array.from(paymentMethodSelect.options).find(function(paymentOption) {
        return String(paymentOption.value) === String(studentPaymentMethod);
    });

    if (!matchingOption) {
        return;
    }

    paymentMethodSelect.value = studentPaymentMethod;
    paymentMethodSelect.dispatchEvent(new Event('change', {bubbles: true}));
};

const syncFormDefaultsFromStudentOption = function(option) {
    syncFormLocationFromStudentOption(option);
    syncFormPaymentMethodFromStudentOption(option);
};

const initializeStudentComboboxes = function() {
    const comboboxes = Array.from(document.querySelectorAll('[data-student-combobox]'));

    comboboxes.forEach(function(combobox) {
        const input = combobox.querySelector('[data-student-combobox-input]');
        const value = combobox.querySelector('[data-student-combobox-value]');
        const options = Array.from(combobox.querySelectorAll('[data-student-combobox-option]'));

        if (!input || !value) {
            return;
        }

        input.addEventListener('focus', function() {
            openStudentCombobox(combobox);
        });

        input.addEventListener('click', function() {
            openStudentCombobox(combobox);
        });

        input.addEventListener('input', function() {
            value.value = '';
            input.setCustomValidity('');
            openStudentCombobox(combobox);
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeStudentCombobox(combobox);
                input.blur();
            }
        });

        options.forEach(function(option) {
            option.addEventListener('click', function() {
                input.value = option.dataset.studentName || option.textContent.trim();
                value.value = option.dataset.studentId || '';
                input.setCustomValidity('');
                syncFormDefaultsFromStudentOption(option);
                closeStudentCombobox(combobox);
            });
        });

        const form = combobox.closest('form');

        if (form) {
            form.addEventListener('submit', function(e) {
                if (!value.value) {
                    const typedName = input.value.trim().toLowerCase();
                    const exactMatch = options.find(function(option) {
                        return String(option.dataset.studentName || '').toLowerCase() === typedName;
                    });

                    if (exactMatch) {
                        input.value = exactMatch.dataset.studentName || exactMatch.textContent.trim();
                        value.value = exactMatch.dataset.studentId || '';
                        syncFormDefaultsFromStudentOption(exactMatch);
                    }
                }

                if (!value.value) {
                    e.preventDefault();
                    input.setCustomValidity('Select a student from the list.');
                    input.reportValidity();
                    openStudentCombobox(combobox);
                    return;
                }

                input.setCustomValidity('');
            });
        }
    });

    document.addEventListener('click', function(e) {
        comboboxes.forEach(function(combobox) {
            if (!combobox.contains(e.target)) {
                closeStudentCombobox(combobox);
            }
        });
    });
};

const getSelectedLocationOption = function(form) {
    const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;

    return locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
};

const singleLessonLocationIsOnline = function(form) {
    const selectedOption = getSelectedLocationOption(form);

    return selectedOption && selectedOption.dataset.isOnline === '1';
};

const setSingleLessonOnlineFields = function(form, shouldEmpty) {
    const fields = form ? Array.from(form.querySelectorAll('.single-lesson-plan-online-field')) : [];
    const isOnline = singleLessonLocationIsOnline(form);

    fields.forEach(function(field) {
        const input = field.querySelector('input');

        field.style.display = isOnline ? '' : 'none';

        if (input) {
            input.disabled = !isOnline;

            if (!isOnline || shouldEmpty) {
                input.value = '';
            }
        }
    });
};

const syncSingleLessonFee = function(form) {
    const selectedOption = getSelectedLocationOption(form);
    const durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
    const feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
    const hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
    const duration = durationSelect ? Number(durationSelect.value || 0) : 0;

    if (!feeInput) {
        return;
    }

    if (!hourlyFee || !duration) {
        return;
    }

    const proratedFee = hourlyFee * (duration / 60);
    const roundedFee = Math.floor(proratedFee / 5) * 5;

    feeInput.value = roundedFee.toFixed(2).replace(/\.00$/, '');
};

const getSingleLessonPlanDefaultDate = function() {
    if (!state.date) {
        return todayString();
    }

    if (state.view === 'month') {
        return toDateString(createLocalDate(state.date.getFullYear(), state.date.getMonth(), 1));
    }

    return toDateString(getVisibleDateRange().start);
};

const syncSingleLessonPlanModalDate = function(modal) {
    const dateInput = modal ? modal.querySelector('input[name="scheduled_date"]') : null;

    if (dateInput) {
        dateInput.value = getSingleLessonPlanDefaultDate();
    }
};

const initializeSingleLessonPlanForms = function(root) {
    (root || document).querySelectorAll('[data-single-lesson-plan-form]').forEach(function(form) {
        if (form.dataset.calendarFormInitialized === 'true') {
            return;
        }

        form.dataset.calendarFormInitialized = 'true';

        const locationSelect = form.querySelector('select[name="location_id"]');
        const durationSelect = form.querySelector('select[name="duration_minutes"]');
        const modal = form.closest('#create-single-lesson-plan-modal');

        setSingleLessonOnlineFields(form, false);

        if (locationSelect && durationSelect) {
            syncSingleLessonFee(form);
        }

        if (locationSelect) {
            locationSelect.addEventListener('change', function() {
                syncSingleLessonFee(form);
                setSingleLessonOnlineFields(form, true);
            });
        }

        if (durationSelect) {
            durationSelect.addEventListener('change', function() {
                syncSingleLessonFee(form);
            });
        }

        if (modal) {
            modal.addEventListener('show.bs.modal', function() {
                syncSingleLessonPlanModalDate(modal);
            });
        }
    });
};

const setLessonPlanOnlineFields = function(form, shouldEmpty) {
    const fields = form ? Array.from(form.querySelectorAll('.lesson-plan-online-field')) : [];
    const isOnline = singleLessonLocationIsOnline(form);

    fields.forEach(function(field) {
        const input = field.querySelector('input');

        field.style.display = isOnline ? '' : 'none';

        if (input) {
            input.disabled = !isOnline;

            if (!isOnline || shouldEmpty) {
                input.value = '';
            }
        }
    });
};

const syncLessonPlanFee = function(form) {
    const selectedOption = getSelectedLocationOption(form);
    const durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
    const feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
    const hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
    const duration = durationSelect ? Number(durationSelect.value || 0) : 0;

    if (!feeInput) {
        return;
    }

    if (!hourlyFee || !duration) {
        return;
    }

    const proratedFee = hourlyFee * (duration / 60);
    const roundedFee = Math.floor(proratedFee / 5) * 5;

    feeInput.value = roundedFee.toFixed(2).replace(/\.00$/, '');
};

const initializeLessonPlanForms = function(root) {
    (root || document).querySelectorAll('[data-lesson-plan-form]').forEach(function(form) {
        if (form.dataset.calendarFormInitialized === 'true') {
            return;
        }

        form.dataset.calendarFormInitialized = 'true';

        const locationSelect = form.querySelector('select[name="location_id"]');
        const durationSelect = form.querySelector('select[name="duration_minutes"]');

        setLessonPlanOnlineFields(form, false);

        if (locationSelect && durationSelect) {
            syncLessonPlanFee(form);
        }

        if (locationSelect) {
            locationSelect.addEventListener('change', function() {
                syncLessonPlanFee(form);
                setLessonPlanOnlineFields(form, true);
            });
        }

        if (durationSelect) {
            durationSelect.addEventListener('change', function() {
                syncLessonPlanFee(form);
            });
        }
    });
};

document.addEventListener('DOMContentLoaded', function() {
	document.addEventListener('click', function(e) {
		const button = e.target.closest('.setting-undo');

		if (!button) {
			return;
		}

		const input = document.getElementById(button.dataset.settingTarget);

		if (!input || typeof button.dataset.settingOriginal === 'undefined') {
			return;
		}

		if (input.type === 'checkbox') {
			input.checked = button.dataset.settingOriginal === 'true';
		} else {
			input.value = button.dataset.settingOriginal;
		}

		input.dispatchEvent(new Event('input', { bubbles: true }));
		input.dispatchEvent(new Event('change', { bubbles: true }));
	});

    const calendar = document.getElementById('calendar');
    const label = document.querySelector('[data-calendar-label]');
    const today = document.querySelector('[data-calendar-today]');
    const previous = document.querySelector('[data-calendar-prev]');
    const next = document.querySelector('[data-calendar-next]');
    const view = document.querySelector('[data-calendar-view]');
    const miniLabel = document.querySelector('[data-mini-label]');
    const miniGrid = document.querySelector('[data-mini-grid]');
    const miniPrevious = document.querySelector('[data-mini-prev]');
    const miniNext = document.querySelector('[data-mini-next]');
    const lessonModal = document.getElementById('lesson-modal');
    const generalEventModal = document.getElementById('general-event-modal');
    const calendarEditModalContainer = document.getElementById('calendar-edit-modal-container');
    const calendarSearch = document.querySelector('.calendar-calendar-search');
    const calendarToolbar = calendarSearch ? calendarSearch.closest('.calendar-calendar-toolbar') : null;
    const calendarSearchToggle = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-toggle]') : null;
    const calendarSearchClear = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-clear]') : null;
    const studentSearch = calendarSearch ? calendarSearch.querySelector('input[name="search"]') : null;
    const offcanvasViews = document.getElementById('calendar-offcanvas-views');
    const offcanvasViewItems = Array.from(document.querySelectorAll('[data-calendar-offcanvas-view]'));
    const calendarInsights = document.getElementById('calendar-calendar-insights');
    const calendarInsightsSidebarTarget = document.querySelector('[data-calendar-insights-sidebar-target]');
    const calendarInsightsOffcanvasTarget = document.querySelector('[data-calendar-insights-offcanvas-target]');
    const locationFilters = document.querySelector('[data-calendar-location-filters]');
    const eventTypeFilters = document.querySelector('[data-calendar-event-type-filters]');
    const calendarCreateMenu = document.querySelector('[data-calendar-create-menu]');
    const calendarCreateToggle = document.querySelector('[data-calendar-create-toggle]');
    const calendarCreateSingle = document.querySelector('[data-calendar-create-single]');
    const calendarCreateRecurring = document.querySelector('[data-calendar-create-recurring]');
    const calendarCreateEvent = document.querySelector('[data-calendar-create-event]');
    const calendarFilter = document.querySelector('.calendar-calendar-filter');
    let calendarCreateBackdrop = null;

    if (!calendar) {
        return;
    }

    let scheduleItemHold = null;
    let suppressedScheduleItemClick = null;
    let scheduleHoldNavigationSuppressedUntil = 0;

    const isScheduleHoldNavigationSuppressed = function() {
        return Boolean(scheduleItemHold && scheduleItemHold.active)
            || Date.now() < scheduleHoldNavigationSuppressedUntil;
    };

    initializeStudentComboboxes();
    initializeSingleLessonPlanForms();
    initializeLessonPlanForms();

    state.plannedLessons = Array.isArray(window.calendarPlannedLessons)
        ? window.calendarPlannedLessons
        : (Array.isArray(window.calendarLessonPlans) ? window.calendarLessonPlans : []);
    state.singleLessonPlans = Array.isArray(window.calendarSingleLessonPlans) ? window.calendarSingleLessonPlans : [];
    state.holidays = Array.isArray(window.calendarHolidays) ? window.calendarHolidays : [];
    state.showHolidays = window.calendarShowHolidays !== false;
    state.teachingBreaks = Array.isArray(window.calendarTeachingBreaks) ? window.calendarTeachingBreaks : [];
    state.recitals = Array.isArray(window.calendarRecitals) ? window.calendarRecitals : [];
    state.generalEvents = Array.isArray(window.calendarGeneralEvents) ? window.calendarGeneralEvents : [];
    state.locations = Array.isArray(window.calendarLocations) ? window.calendarLocations : [];
    state.loadedRange = normalizeRange(window.calendarCalendarRange);
    state.birthdayWindow = normalizeBirthdayWindow(window.calendarBirthdayWindow);

    const urlState = getUrlState();
    state.view = urlState.view;

    if (isValidDate(urlState.date)) {
        setSelectedDate(urlState.date);
    } else if (!state.date) {
        setSelectedDate(getTodayDate());
    } else {
        state.miniDate = cloneDate(state.date);
    }

    const syncViewControls = function() {
        if (view) {
            view.value = state.view;
        }

        offcanvasViewItems.forEach(function(item) {
            const selected = item.dataset.calendarOffcanvasView === state.view;

            item.toggleAttribute('selected', selected);
            item.classList.toggle('is-selected', selected);

            item.querySelectorAll('button').forEach(function(button) {
                button.setAttribute('aria-pressed', selected ? 'true' : 'false');
            });
        });
    };

    const removeCalendarCreateBackdrop = function(immediate) {
        if (!calendarCreateBackdrop) {
            return;
        }

        const backdrop = calendarCreateBackdrop;
        calendarCreateBackdrop = null;
        backdrop.classList.remove('show');

        const removeBackdrop = function() {
            backdrop.removeEventListener('transitionend', removeBackdrop);
            backdrop.remove();
        };

        if (immediate) {
            removeBackdrop();
            return;
        }

        backdrop.addEventListener('transitionend', removeBackdrop);

        window.setTimeout(removeBackdrop, 180);
    };

    const showCalendarCreateBackdrop = function() {
        if (calendarCreateBackdrop) {
            return;
        }

        calendarCreateBackdrop = document.createElement('div');
        calendarCreateBackdrop.className = 'modal-backdrop fade';
        calendarCreateBackdrop.setAttribute('data-calendar-create-backdrop', '');
        document.body.appendChild(calendarCreateBackdrop);
        calendarCreateBackdrop.addEventListener('click', closeCalendarCreateMenu);

        window.requestAnimationFrame(function() {
            if (calendarCreateBackdrop) {
                calendarCreateBackdrop.classList.add('show');
            }
        });
    };

    const setCalendarCreateMenuOpen = function(isOpen, options) {
        if (!calendarCreateMenu || !calendarCreateToggle) {
            return;
        }

        calendarCreateMenu.toggleAttribute('selected', isOpen);
        calendarCreateToggle.toggleAttribute('selected', isOpen);
        calendarCreateToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

        if (isOpen) {
            showCalendarCreateBackdrop();
        } else {
            removeCalendarCreateBackdrop(options && options.immediate);
        }
    };

    function closeCalendarCreateMenu(options) {
        setCalendarCreateMenuOpen(false, options);
    };

    const openCalendarCreateModal = function(modalId) {
        closeCalendarCreateMenu({ immediate: true });
        showBootstrapModal(document.getElementById(modalId));
    };

    if (calendarCreateToggle) {
        calendarCreateToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            setCalendarCreateMenuOpen(!(calendarCreateMenu && calendarCreateMenu.hasAttribute('selected')));
        });
    }

    if (calendarCreateSingle) {
        calendarCreateSingle.addEventListener('click', function() {
            openCalendarCreateModal('create-single-lesson-plan-modal');
        });
    }

    if (calendarCreateRecurring) {
        calendarCreateRecurring.addEventListener('click', function() {
            openCalendarCreateModal('create-calendar-lesson-plan-modal');
        });
    }

    if (calendarCreateEvent) {
        calendarCreateEvent.addEventListener('click', function() {
            openCalendarCreateModal('create-event-modal');
        });
    }

    if (calendarCreateMenu) {
        calendarCreateMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    document.addEventListener('click', function(e) {
        if (!calendarCreateMenu || !calendarCreateToggle || !calendarCreateMenu.hasAttribute('selected')) {
            return;
        }

        if (!calendarCreateMenu.contains(e.target) && !calendarCreateToggle.contains(e.target)) {
            closeCalendarCreateMenu();
        }
    });

    const syncCalendarInsightsPlacement = function() {
        if (!calendarInsights || !calendarInsightsSidebarTarget || !calendarInsightsOffcanvasTarget) {
            return;
        }

        const target = isSidebarHiddenViewport()
            ? calendarInsightsOffcanvasTarget
            : calendarInsightsSidebarTarget;

        if (calendarInsights.parentElement !== target) {
            target.appendChild(calendarInsights);
        }
    };

    const syncCalendarFilterSelectedState = function() {
        if (!calendarFilter) {
            return;
        }

        const eventTypeFilterIsActive = state.selectedEventTypes.length < 3;

        calendarFilter.toggleAttribute('selected', Boolean(isLocationFilterActive() || eventTypeFilterIsActive));
    };

    const syncLocationFilterState = function() {
        if (!locationFilters) {
            return;
        }

        const checkedIds = Array.from(locationFilters.querySelectorAll('input[data-calendar-location-filter]:checked'))
            .map(function(input) {
                return normalizeLocationId(input.value);
            })
            .filter(Boolean);

        state.selectedLocationIds = checkedIds;
        syncCalendarFilterSelectedState();
    };

    const syncEventTypeFilterState = function() {
        if (!eventTypeFilters) {
            return;
        }

        state.selectedEventTypes = Array.from(eventTypeFilters.querySelectorAll('input[data-calendar-event-type-filter]:checked'))
            .map(function(input) {
                return input.value;
            });
        syncCalendarFilterSelectedState();
    };

    const renderLocationFilters = function() {
        if (!locationFilters) {
            return;
        }

        locationFilters.innerHTML = '';

        if (!state.locations.length) {
            const empty = document.createElement('div');

            empty.className = 'small opacity-4';
            empty.textContent = 'No locations';
            locationFilters.appendChild(empty);
            return;
        }

        state.locations.forEach(function(location) {
            const id = `calendar-location-filter-${location.id}`;
            const option = document.createElement('div');
            const label = document.createElement('label');
            const input = document.createElement('input');

            option.className = 'form-check calendar-calendar-filter-option';
            label.className = 'form-check-label';
            label.setAttribute('for', id);

            input.type = 'checkbox';
            input.className = 'form-check-input';
            input.id = id;
            input.value = location.id;
            input.checked = true;
            input.dataset.calendarLocationFilter = '';

            label.textContent = location.name || 'Location';

            option.appendChild(input);
            option.appendChild(label);
            locationFilters.appendChild(option);
        });

        syncLocationFilterState();
    };

    const setCalendarView = function(nextView) {
        if (!nextView || nextView === state.view) {
            syncViewControls();
            return;
        }

        state.view = nextView;
        state.didAutoNowScroll = false;
        syncViewControls();
        render();
    };

    const openCalendarSearch = function() {
        if (!calendarSearch) {
            return;
        }

        calendarSearch.setAttribute('selected', '');

        if (calendarToolbar) {
            calendarToolbar.setAttribute('searching', '');
        }

        if (studentSearch) {
            studentSearch.focus();
        }
    };

    const closeCalendarSearch = function() {
        if (calendarSearch) {
            calendarSearch.removeAttribute('selected');
        }

        if (calendarToolbar) {
            calendarToolbar.removeAttribute('searching');
        }
    };

    const clearCalendarSearch = function() {
        if (studentSearch) {
            studentSearch.value = '';
        }

        state.studentSearch = '';
        closeCalendarSearch();
        render();
    };

    const closeCalendarViewsOffcanvas = function() {
        if (!offcanvasViews) {
            return;
        }

        if (window.bootstrap && window.bootstrap.Offcanvas && typeof window.bootstrap.Offcanvas.getOrCreateInstance === 'function') {
            window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasViews).hide();
            return;
        }

        if (window.bootstrap && window.bootstrap.Offcanvas) {
            new window.bootstrap.Offcanvas(offcanvasViews).hide();
            return;
        }

        const close = offcanvasViews.querySelector('.offcanvas-header [data-bs-dismiss="offcanvas"]');

        if (close) {
            close.click();
        }
    };

    syncViewControls();
    syncCalendarInsightsPlacement();

    window.addEventListener('resize', syncCalendarInsightsPlacement);

    if (studentSearch) {
        state.studentSearch = studentSearch.value;
    }

    const renderMiniCalendar = function() {
        if (!miniLabel || !miniGrid) {
            return;
        }

        miniLabel.textContent = monthFormatter.format(state.miniDate);
        miniGrid.innerHTML = '';

        const gridStart = startOfMonthGrid(state.miniDate);
        const selected = toDateString(state.date);
        const today = todayString();

        for (let i = 0; i < 42; i++) {
            const date = addDays(gridStart, i);
            const dateString = toDateString(date);
            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'calendar-mini-calendar-date';
            button.textContent = date.getDate();
            button.dataset.date = dateString;

            if (date.getMonth() !== state.miniDate.getMonth()) {
                button.classList.add('is-muted');
            }

            if (dateString === selected) {
                button.classList.add('is-selected');
            }

            if (dateString === today) {
                button.classList.add('is-today');
            }

            miniGrid.appendChild(button);
        }
    };

    const getVisibleScheduleDay = function(agenda) {
        const days = Array.from(agenda.querySelectorAll('.calendar-schedule-day'));

        if (!days.length) {
            return null;
        }

        const agendaRect = agenda.getBoundingClientRect();
        const marker = agendaRect.top + 1;

        return days.find(function(day) {
            const rect = day.getBoundingClientRect();

            return rect.bottom > marker;
        }) || days[0];
    };

    const syncScheduleLabelToScroll = function(agenda) {
        if (state.view !== 'schedule' || !agenda) {
            return;
        }

        const visibleDay = getVisibleScheduleDay(agenda);

        if (!visibleDay || !visibleDay.dataset.date) {
            return;
        }

        const visibleDate = parseDateString(visibleDay.dataset.date);
        const visibleDateString = toDateString(visibleDate);

        if (label) {
            label.textContent = monthFormatter.format(visibleDate);
        }

        if (toDateString(state.date) !== visibleDateString) {
            state.date = visibleDate;
            state.miniDate = cloneDate(visibleDate);
            updateCalendarUrl();
            renderMiniCalendar();
            renderCalendarPaymentTotals();
        }
    };

    const queueScheduleLabelSync = function(agenda) {
        if (state.scheduleLabelFrame) {
            cancelAnimationFrame(state.scheduleLabelFrame);
        }

        state.scheduleLabelFrame = requestAnimationFrame(function() {
            state.scheduleLabelFrame = null;
            syncScheduleLabelToScroll(agenda);
        });
    };

    const scrollScheduleToSelectedDate = function(agenda) {
        if (!agenda) {
            return;
        }

        const selected = toDateString(state.date || getTodayDate());
        const target = agenda.querySelector(`.calendar-schedule-day[data-date="${selected}"]`)
            || agenda.querySelector(`.calendar-schedule-day[data-date="${todayString()}"]`)
            || agenda.querySelector('.calendar-schedule-day');

        if (!target) {
            return;
        }

        agenda.scrollTop = Math.max(0, target.offsetTop);
        syncScheduleLabelToScroll(agenda);
    };

    const bindScheduleAgenda = function(agenda) {
        if (!agenda) {
            return;
        }

        agenda.addEventListener('scroll', function() {
            queueScheduleLabelSync(agenda);
        }, { passive: true });

        requestAnimationFrame(function() {
            scrollScheduleToSelectedDate(agenda);
        });
    };

    const render = function() {
        const visibleRange = getVisibleDateRange();

        syncViewControls();
        updateCalendarUrl();

        if (!isRangeLoaded(visibleRange)) {
            fetchPlannedLessons(visibleRange).then(function() {
                if (isRangeLoaded(getVisibleDateRange())) {
                    render();
                }
            });

            return;
        }

        disconnectScheduleObserver();
        if (state.schedulePatchFrame) {
            cancelAnimationFrame(state.schedulePatchFrame);
            state.schedulePatchFrame = null;
        }
        if (state.scheduleLabelFrame) {
            cancelAnimationFrame(state.scheduleLabelFrame);
            state.scheduleLabelFrame = null;
        }

        calendar.innerHTML = '';
        calendar.classList.toggle('calendar-calendar-day-view', state.view === 'day');
        calendar.classList.toggle('calendar-calendar-two-days-view', state.view === '2-days');
        calendar.classList.toggle('calendar-calendar-week-view', state.view === 'week');
        calendar.classList.toggle('calendar-calendar-month-view', state.view === 'month');
        calendar.classList.toggle('calendar-calendar-schedule-view', state.view === 'schedule');

        syncCalendarEvents();
        renderCalendarPaymentTotals();

        if (label) {
            label.textContent = getLabel();
        }

        if (view) {
            view.value = state.view;
        }

        renderMiniCalendar();

        if (state.view === 'schedule') {
            state.instance = null;
            bindScheduleAgenda(renderScheduleAgenda(calendar));

            return;
        }

        if (scheduleGridViews.includes(state.view)) {
            state.instance = calendarjs.Schedule(calendar, {
                type: state.view === '2-days' ? 'week' : state.view,
                value: getScheduleValue(),
                data: normalizeScheduleEvents(getScheduleRenderEvents()),
                validRange: [scheduleStart, scheduleEnd],
                overlap: true,
                onbeforeinsert: function() {
                    return false;
                },
                onbeforechangeevent: function(instance, detail) {
                    if (detail && detail.action && !(detail.element && detail.element.hasAttribute('holding-event'))) {
                        return false;
                    }
                },
                onbeforechange: function(instance, detail) {
                    if (scheduleItemHold && scheduleItemHold.active && detail && detail.action === 'updateEvent') {
                        return false;
                    }
                },
                oncreate: function(instance) {
                    syncEvents(instance);
                    queueSchedulePatch(calendar);
                },
                onchange: function(instance) {
                    syncEvents(instance);
                    queueSchedulePatch(calendar);
                },
                onchangeevent: function(instance) {
                    syncEvents(instance);
                    queueSchedulePatch(calendar);
                },
                ondelete: function(instance) {
                    syncEvents(instance);
                    queueSchedulePatch(calendar);
                },
            });
            patchSchedule(calendar);

            return;
        }

        if (state.view === 'month') {
            state.instance = null;
            renderMonthCalendar(calendar);

            return;
        }
    };

    const refreshCalendarAfterLessonMutation = function() {
        const schedule = calendar.querySelector('.lm-schedule');
        const scrollTop = schedule ? schedule.scrollTop : 0;
        const scrollLeft = schedule ? schedule.scrollLeft : 0;
        const visibleRange = getVisibleDateRange();

        state.loadedRange = null;
        state.pendingRangeKey = null;

        return fetchPlannedLessons(visibleRange).then(function() {
            state.suppressNextScheduleAnimation = true;
            render();

            requestAnimationFrame(function() {
                const refreshedSchedule = calendar.querySelector('.lm-schedule');

                if (refreshedSchedule) {
                    refreshedSchedule.scrollTop = scrollTop;
                    refreshedSchedule.scrollLeft = scrollLeft;
                }
            });
        });
    };

    if (today) {
        today.addEventListener('click', function() {
            if (isScheduleHoldNavigationSuppressed()) {
                return;
            }

            setSelectedDate(getTodayDate());
            render();
        });
    }

    if (previous) {
        previous.addEventListener('click', function() {
            if (isScheduleHoldNavigationSuppressed()) {
                return;
            }

            move(-1);
            render();
        });
    }

    if (next) {
        next.addEventListener('click', function() {
            if (isScheduleHoldNavigationSuppressed()) {
                return;
            }

            move(1);
            render();
        });
    }

    bindScheduleHeaderSwipe(calendar, function(direction) {
        if (isScheduleHoldNavigationSuppressed()) {
            return;
        }

        move(direction);
        render();
    });

    if (view) {
        view.addEventListener('change', function() {
            if (isScheduleHoldNavigationSuppressed()) {
                syncViewControls();
                return;
            }

            setCalendarView(this.value);
        });
    }

    offcanvasViewItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            if (isScheduleHoldNavigationSuppressed()) {
                return;
            }

            setCalendarView(item.dataset.calendarOffcanvasView);
            closeCalendarViewsOffcanvas();
        });
    });

    if (studentSearch) {
        studentSearch.addEventListener('input', function() {
            state.studentSearch = this.value;
            render();
        });
    }

    if (locationFilters) {
        locationFilters.addEventListener('change', function(e) {
            if (!e.target.matches('input[data-calendar-location-filter]')) {
                return;
            }

            syncLocationFilterState();
            render();
        });
    }

    if (eventTypeFilters) {
        eventTypeFilters.addEventListener('change', function(e) {
            if (!e.target.matches('input[data-calendar-event-type-filter]')) {
                return;
            }

            syncEventTypeFilterState();
            render();
        });
    }

    if (calendarSearchToggle) {
        calendarSearchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openCalendarSearch();
        });
    }

    if (calendarSearchClear) {
        calendarSearchClear.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            clearCalendarSearch();
        });
    }

    if (calendarSearch) {
        calendarSearch.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function(e) {
            if (!calendarSearch.contains(e.target)) {
                closeCalendarSearch();
            }
        });
    }

    if (miniPrevious) {
        miniPrevious.addEventListener('click', function() {
            if (isScheduleHoldNavigationSuppressed()) {
                return;
            }

            state.miniDate = addMonths(state.miniDate, -1);
            renderMiniCalendar();
        });
    }

    if (miniNext) {
        miniNext.addEventListener('click', function() {
            if (isScheduleHoldNavigationSuppressed()) {
                return;
            }

            state.miniDate = addMonths(state.miniDate, 1);
            renderMiniCalendar();
        });
    }

    if (miniGrid) {
        miniGrid.addEventListener('click', function(e) {
            if (isScheduleHoldNavigationSuppressed()) {
                return;
            }

            const button = e.target.closest('[data-date]');

            if (!button) {
                return;
            }

            setSelectedDate(parseDateString(button.dataset.date));
            render();
        });
    }

    const lessonTaught = document.getElementById('lesson-taught');

    if (lessonTaught) {
        lessonTaught.addEventListener('click', function(e) {
            e.preventDefault();
            storeTaughtLesson(lessonTaught, refreshCalendarAfterLessonMutation);
        });
    }

    const confirmPayment = document.getElementById('confirm-payment');

    if (confirmPayment) {
        confirmPayment.addEventListener('click', function(e) {
            e.preventDefault();
            confirmLessonPayment(confirmPayment, refreshCalendarAfterLessonMutation);
        });
    }

    const earlyPayment = document.getElementById('early-payment');

    if (earlyPayment) {
        earlyPayment.addEventListener('click', function(e) {
            e.preventDefault();
            storeEarlyPayment(earlyPayment, refreshCalendarAfterLessonMutation);
        });
    }

    const lessonRevert = document.getElementById('lesson-revert');

    if (lessonRevert) {
        lessonRevert.addEventListener('click', function(e) {
            e.preventDefault();
            revertLessonAction(lessonRevert, refreshCalendarAfterLessonMutation);
        });
    }

    const lessonEdit = document.getElementById('lesson-edit');

    if (lessonEdit) {
        lessonEdit.addEventListener('click', function(e) {
            e.preventDefault();
            loadCalendarEditModal(lessonEdit, lessonModal, calendarEditModalContainer);
        });
    }

    const cancelLessonButton = document.getElementById('cancel-lesson-button');

    if (cancelLessonButton) {
        cancelLessonButton.addEventListener('click', function(e) {
            e.preventDefault();
            showLessonCancelForm(lessonModal);
        });
    }

    if (lessonModal) {
        const rescheduleButton = lessonModal.querySelector('#reschedule-lesson-button');
        const rescheduleForm = lessonModal.querySelector('#reschedule-lesson form');
        const cancelForm = lessonModal.querySelector('#cancel-lesson form');
        const reschedulePrevious = lessonModal.querySelector('[data-reschedule-datepicker-prev]');
        const rescheduleNext = lessonModal.querySelector('[data-reschedule-datepicker-next]');
        const rescheduleGrid = lessonModal.querySelector('[data-reschedule-datepicker-grid]');
        const rescheduleDate = lessonModal.querySelector('#reschedule-lesson-date');
        const rescheduleStartTime = lessonModal.querySelector('#reschedule-lesson-start-time');
        const rescheduleEndTime = lessonModal.querySelector('#reschedule-lesson-end-time');

        if (rescheduleButton) {
            rescheduleButton.addEventListener('click', function(e) {
                e.preventDefault();
                showLessonRescheduleForm(lessonModal);
            });
        }

        [rescheduleForm, cancelForm].filter(Boolean).forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitLessonModalForm(form, refreshCalendarAfterLessonMutation);
            });
        });

        lessonModal.addEventListener('hidden.bs.modal', function() {
            restoreUpdatedScheduleItem(lessonModal.updatedScheduleItem);
            lessonModal.updatedScheduleItem = null;
            resetLessonModalState(lessonModal);
        });

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(lessonModal).on('hidden.bs.modal', function() {
                restoreUpdatedScheduleItem(lessonModal.updatedScheduleItem);
                lessonModal.updatedScheduleItem = null;
                resetLessonModalState(lessonModal);
            });
        }

        if (reschedulePrevious) {
            reschedulePrevious.addEventListener('click', function() {
                state.rescheduleDatePickerDate = addMonths(state.rescheduleDatePickerDate || getTodayDate(), -1);
                renderRescheduleDatePicker(lessonModal);
            });
        }

        if (rescheduleNext) {
            rescheduleNext.addEventListener('click', function() {
                state.rescheduleDatePickerDate = addMonths(state.rescheduleDatePickerDate || getTodayDate(), 1);
                renderRescheduleDatePicker(lessonModal);
            });
        }

        if (rescheduleGrid) {
            rescheduleGrid.addEventListener('click', function(e) {
                const button = e.target.closest('[data-date]');

                if (!button) {
                    return;
                }

                if (rescheduleDate) {
                    rescheduleDate.value = button.dataset.date;
                }

                state.rescheduleDatePickerDate = parseDateString(button.dataset.date);
                renderRescheduleDatePicker(lessonModal);
            });
        }

        if (rescheduleStartTime) {
            rescheduleStartTime.addEventListener('change', function() {
                syncRescheduleTimePicker(rescheduleStartTime, rescheduleEndTime, 'start');
            });
        }

        if (rescheduleEndTime) {
            rescheduleEndTime.addEventListener('change', function() {
                syncRescheduleTimePicker(rescheduleStartTime, rescheduleEndTime, 'end');
            });
        }
    }

    if (generalEventModal) {
        const editButton = generalEventModal.querySelector('#event-edit');
        const cancelButton = generalEventModal.querySelector('#cancel-general-event-button');
        const rescheduleButton = generalEventModal.querySelector('#reschedule-general-event-button');
        const rescheduleForm = generalEventModal.querySelector('#reschedule-general-event form');
        const cancelForm = generalEventModal.querySelector('#cancel-general-event form');
        const reschedulePrevious = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-prev]');
        const rescheduleNext = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-next]');
        const rescheduleGrid = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-grid]');
        const rescheduleDate = generalEventModal.querySelector('#reschedule-general-event-date');
        const rescheduleStartTime = generalEventModal.querySelector('#reschedule-general-event-start-time');
        const rescheduleEndTime = generalEventModal.querySelector('#reschedule-general-event-end-time');

        if (editButton) {
            editButton.addEventListener('click', function(e) {
                e.preventDefault();
                loadCalendarEditModal(editButton, generalEventModal, calendarEditModalContainer);
            });
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                showGeneralEventCancelForm(generalEventModal);
            });
        }

        if (rescheduleButton) {
            rescheduleButton.addEventListener('click', function() {
                showGeneralEventRescheduleForm(generalEventModal);
            });
        }

        [rescheduleForm, cancelForm].filter(Boolean).forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitGeneralEventModalForm(form, refreshCalendarAfterLessonMutation);
            });
        });

        generalEventModal.addEventListener('hidden.bs.modal', function() {
            restoreUpdatedScheduleItem(generalEventModal.updatedScheduleItem);
            generalEventModal.updatedScheduleItem = null;
            resetGeneralEventModalState(generalEventModal);
        });

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(generalEventModal).on('hidden.bs.modal', function() {
                restoreUpdatedScheduleItem(generalEventModal.updatedScheduleItem);
                generalEventModal.updatedScheduleItem = null;
                resetGeneralEventModalState(generalEventModal);
            });
        }

        if (reschedulePrevious) {
            reschedulePrevious.addEventListener('click', function() {
                state.generalEventRescheduleDatePickerDate = addMonths(state.generalEventRescheduleDatePickerDate || getTodayDate(), -1);
                renderGeneralEventRescheduleDatePicker(generalEventModal);
            });
        }

        if (rescheduleNext) {
            rescheduleNext.addEventListener('click', function() {
                state.generalEventRescheduleDatePickerDate = addMonths(state.generalEventRescheduleDatePickerDate || getTodayDate(), 1);
                renderGeneralEventRescheduleDatePicker(generalEventModal);
            });
        }

        if (rescheduleGrid) {
            rescheduleGrid.addEventListener('click', function(e) {
                const button = e.target.closest('[data-date]');

                if (!button) {
                    return;
                }

                if (rescheduleDate) {
                    rescheduleDate.value = button.dataset.date;
                }

                state.generalEventRescheduleDatePickerDate = parseDateString(button.dataset.date);
                renderGeneralEventRescheduleDatePicker(generalEventModal);
            });
        }

        if (rescheduleStartTime) {
            rescheduleStartTime.addEventListener('change', function() {
                syncRescheduleTimePicker(rescheduleStartTime, rescheduleEndTime, 'start');
            });
        }

        if (rescheduleEndTime) {
            rescheduleEndTime.addEventListener('change', function() {
                syncRescheduleTimePicker(rescheduleStartTime, rescheduleEndTime, 'end');
            });
        }
    }

    if (calendarEditModalContainer) {
        calendarEditModalContainer.addEventListener('submit', function(e) {
            const form = e.target.closest('form');

            if (!form || !calendarEditModalContainer.contains(form)) {
                return;
            }

            e.preventDefault();
            submitCalendarEditForm(form, refreshCalendarAfterLessonMutation);
        });
    }

    calendar.addEventListener('click', function(e) {
        const day = e.target.closest('.calendar-month-day');

        if (!day || state.view !== 'month') {
            return;
        }

        const more = e.target.closest('.calendar-month-more');

        if (more) {
            e.preventDefault();
            e.stopPropagation();
            openMonthDayEventsModal(more.dataset.monthMoreDate || day.dataset.date);
            return;
        }

        if (!e.target.closest('.calendar-month-event')) {
            setSelectedDate(parseDateString(day.dataset.date));
            state.view = 'week';
            render();
        }
    });

    calendar.addEventListener('mousedown', function(e) {
        const item = e.target.closest('.lm-schedule-item');

        if (!item || item.hasAttribute('holding-event')) {
            return;
        }

        e.stopPropagation();
    }, true);

    const removeScheduleHoldTime = function(hold) {
        if (!hold) {
            return;
        }

        if (hold.timeMarkerFrame) {
            window.cancelAnimationFrame(hold.timeMarkerFrame);
            hold.timeMarkerFrame = null;
        }
        if (hold.timeMarker) {
            hold.timeMarker.remove();
            hold.timeMarker = null;
        }
        hold.timeMarkerRow = null;
    };

    const updateScheduleHoldTime = function(hold) {
        if (!hold || hold !== scheduleItemHold || !hold.active || !hold.clone) {
            return;
        }

        const row = hold.clone.closest('tr');
        const gutter = row && row.cells.length ? row.cells[0] : null;

        if (!gutter) {
            removeScheduleHoldTime(hold);
            return;
        }

        if (gutter.querySelector(':scope > .lm-schedule-index')) {
            removeScheduleHoldTime(hold);
            return;
        }

        if (hold.timeMarkerRow !== row) {
            if (hold.timeMarker) {
                hold.timeMarker.remove();
            }

            hold.timeMarker = document.createElement('span');
            hold.timeMarker.className = 'calendar-schedule-holding-time';
            gutter.appendChild(hold.timeMarker);
            hold.timeMarkerRow = row;
        }

        hold.timeMarker.textContent = formatEventTime(hold.clone.getAttribute('data-start') || hold.clone.start)
            .replace(/(?:am|pm)$/i, '');
    };

    const queueScheduleHoldTimeUpdate = function(hold) {
        if (!hold || hold !== scheduleItemHold) {
            return;
        }

        if (hold.timeMarkerFrame) {
            window.cancelAnimationFrame(hold.timeMarkerFrame);
        }
        hold.timeMarkerFrame = window.requestAnimationFrame(function() {
            hold.timeMarkerFrame = null;
            updateScheduleHoldTime(hold);
        });
    };

    const finishScheduleNativeDrag = function(hold, clientX, clientY, commitVisualDrop) {
        if (!hold || !hold.active || hold.nativeDragFinished) {
            return;
        }

        hold.commitVisualDrop = Boolean(commitVisualDrop);
        hold.finishingNativeDrag = true;
        hold.nativeDragFinished = true;
        document.dispatchEvent(new MouseEvent('mouseup', {
            bubbles: true,
            cancelable: true,
            view: window,
            button: 0,
            buttons: 0,
            clientX: clientX === undefined ? hold.lastX : clientX,
            clientY: clientY === undefined ? hold.lastY : clientY,
        }));
    };

    const restoreUpdatedScheduleItem = function(item) {
        const original = item && item.scheduleOriginalPosition;

        if (!item || !original || !item.isConnected || !original.cell || !original.cell.isConnected) {
            return;
        }

        Object.keys(original.attributes).forEach(function(attribute) {
            const value = original.attributes[attribute];

            if (value === null) {
                item.removeAttribute(attribute);
            } else {
                item.setAttribute(attribute, value);
            }
        });

        item.start = original.start;
        item.end = original.end;
        item.date = original.date;
        item.weekday = original.weekday;
        item.event.start = original.eventStart;
        item.event.end = original.eventEnd;
        item.event.date = original.eventDate;
        item.event.weekday = original.eventWeekday;
        if (original.eventOriginalDate === undefined) {
            delete item.event.originalDate;
        } else {
            item.event.originalDate = original.eventOriginalDate;
        }
        if (original.eventOriginalStartTime === undefined) {
            delete item.event.originalStartTime;
        } else {
            item.event.originalStartTime = original.eventOriginalStartTime;
        }
        original.cell.appendChild(item);
        item.removeAttribute('updated-event');
        delete item.scheduleOriginalPosition;
    };

    const getScheduleItemGuid = function(item) {
        const event = getEventByScheduleItem(item);

        return String((event && event.guid) || (item && (item.id || item.dataset.eventGuid)) || '');
    };

    const removeDuplicateScheduleItems = function(schedule, item) {
        const guid = getScheduleItemGuid(item);

        if (!schedule || !guid) {
            return;
        }

        schedule.querySelectorAll('.lm-schedule-item').forEach(function(candidate) {
            if (candidate !== item && getScheduleItemGuid(candidate) === guid) {
                candidate.remove();
            }
        });
    };

    const applyScheduleVisualDrop = function(hold) {
        if (!hold || !hold.commitVisualDrop || !hold.clone || !hold.item || !hold.item.event) {
            return;
        }

        const target = hold.clone.parentElement;

        if (!target || target.tagName !== 'TD' || !hold.schedule || !hold.schedule.contains(target)) {
            return;
        }

        const wasMoved = target !== hold.originCell;

        if (wasMoved && !hold.item.scheduleOriginalPosition) {
            hold.item.scheduleOriginalPosition = {
                cell: hold.originCell,
                attributes: ['data-x', 'data-height', 'data-start', 'data-end'].reduce(function(attributes, attribute) {
                    attributes[attribute] = hold.item.getAttribute(attribute);
                    return attributes;
                }, {}),
                start: hold.item.start,
                end: hold.item.end,
                date: hold.item.date,
                weekday: hold.item.weekday,
                eventStart: hold.item.event.start,
                eventEnd: hold.item.event.end,
                eventDate: hold.item.event.date,
                eventWeekday: hold.item.event.weekday,
                visibleDate: hold.originCell.getAttribute('data-real-date')
                    || hold.originCell.getAttribute('data-date'),
                eventOriginalDate: hold.item.event.originalDate,
                eventOriginalStartTime: hold.item.event.originalStartTime,
            };
        }

        const start = hold.clone.getAttribute('data-start') || hold.clone.start;
        const end = hold.clone.getAttribute('data-end') || hold.clone.end;
        const date = target.getAttribute('data-real-date')
            || target.getAttribute('data-date')
            || hold.clone.date;
        const weekday = hold.clone.weekday;

        ['data-x', 'data-height', 'data-start', 'data-end'].forEach(function(attribute) {
            const value = hold.clone.getAttribute(attribute);

            if (value === null) {
                hold.item.removeAttribute(attribute);
            } else {
                hold.item.setAttribute(attribute, value);
            }
        });

        hold.item.start = start;
        hold.item.end = end;
        hold.item.date = date;
        hold.item.weekday = weekday;
        if (hold.item.scheduleOriginalPosition) {
            hold.item.event.originalDate = hold.item.event.originalDate
                || hold.item.scheduleOriginalPosition.visibleDate
                || hold.item.scheduleOriginalPosition.eventDate;
            hold.item.event.originalStartTime = hold.item.event.originalStartTime || hold.item.scheduleOriginalPosition.eventStart;
        }
        hold.item.event.start = start;
        hold.item.event.end = end;

        if (date) {
            hold.item.event.date = date;
        }
        if (weekday !== undefined) {
            hold.item.event.weekday = weekday;
        }

        target.appendChild(hold.item);
        removeDuplicateScheduleItems(hold.schedule, hold.item);
        if (hold.item.scheduleOriginalPosition && target !== hold.item.scheduleOriginalPosition.cell) {
            hold.item.setAttribute('updated-event', '');
        } else {
            hold.item.removeAttribute('updated-event');
            delete hold.item.scheduleOriginalPosition;
        }
    };

    const clearScheduleItemHold = function(pointerId) {
        if (!scheduleItemHold || (pointerId !== undefined && pointerId !== scheduleItemHold.pointerId)) {
            return;
        }

        finishScheduleNativeDrag(scheduleItemHold);
        window.clearTimeout(scheduleItemHold.timer);
        if (scheduleItemHold.active) {
            scheduleHoldNavigationSuppressedUntil = Date.now() + 750;
            const suppressedItem = scheduleItemHold.item;

            suppressedScheduleItemClick = suppressedItem;
            window.setTimeout(function() {
                if (suppressedScheduleItemClick === suppressedItem) {
                    suppressedScheduleItemClick = null;
                }
            }, 0);
        }
        applyScheduleVisualDrop(scheduleItemHold);
        removeScheduleHoldTime(scheduleItemHold);
        scheduleItemHold.item.removeAttribute('original-event');
        if (scheduleItemHold.clone) {
            scheduleItemHold.clone.remove();
        }
        const schedule = scheduleItemHold.schedule || scheduleItemHold.item.closest('.lm-schedule');
        if (schedule) {
            schedule.querySelectorAll('.lm-schedule-item[holding-event]').forEach(function(item) {
                item.remove();
            });
            schedule.style.removeProperty('cursor');
            schedule.style.touchAction = scheduleItemHold.scheduleTouchAction || '';
            schedule.style.overscrollBehavior = scheduleItemHold.scheduleOverscrollBehavior || '';
            schedule.style.overflow = scheduleItemHold.scheduleOverflow || '';
        }
        if (typeof scheduleItemHold.item.releasePointerCapture === 'function'
            && typeof scheduleItemHold.item.hasPointerCapture === 'function'
            && scheduleItemHold.item.hasPointerCapture(scheduleItemHold.pointerId)) {
            scheduleItemHold.item.releasePointerCapture(scheduleItemHold.pointerId);
        }
        const shouldPatchSchedule = scheduleItemHold.active;
        scheduleItemHold = null;
        if (shouldPatchSchedule && scheduleGridViews.includes(state.view)) {
            queueSchedulePatch(calendar);
        }
    };

    calendar.addEventListener('pointerdown', function(e) {
        const item = e.target.closest('.lm-schedule-item');

        if (!item
            || item.getAttribute('data-lesson-status') === 'canceled'
            || !scheduleGridViews.includes(state.view)
            || e.button !== 0
            || !e.isPrimary) {
            return;
        }

        clearScheduleItemHold();
        scheduleItemHold = {
            item,
            originCell: item.parentElement,
            pointerId: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            lastX: e.clientX,
            lastY: e.clientY,
            pointerType: e.pointerType,
            active: false,
            commitVisualDrop: false,
            finishingNativeDrag: false,
            nativeDragFinished: false,
            clone: null,
            timeMarker: null,
            timeMarkerRow: null,
            timeMarkerFrame: null,
            schedule: null,
            scheduleTouchAction: '',
            scheduleOverscrollBehavior: '',
            scheduleOverflow: '',
            timer: window.setTimeout(function() {
                if (!scheduleItemHold || scheduleItemHold.item !== item || !item.isConnected) {
                    return;
                }

                const clone = item.cloneNode(true);
                const event = item.event;
                const schedule = item.closest('.lm-schedule');

                if (!event || !schedule) {
                    clearScheduleItemHold(e.pointerId);
                    return;
                }

                clone.removeAttribute('id');
                clone.setAttribute('holding-event', '');
                clone.setAttribute('aria-hidden', 'true');
                clone.event = event;
                clone.date = item.date || event.date;
                clone.weekday = item.weekday !== undefined ? item.weekday : event.weekday;
                clone.start = item.start || event.start;
                clone.end = item.end || event.end;
                disconnectScheduleObserver();
                if (state.schedulePatchFrame) {
                    window.cancelAnimationFrame(state.schedulePatchFrame);
                    state.schedulePatchFrame = null;
                }
                item.setAttribute('original-event', '');
                item.parentElement.appendChild(clone);

                scheduleItemHold.active = true;
                scheduleItemHold.clone = clone;
                scheduleItemHold.schedule = schedule;
                scheduleItemHold.scheduleTouchAction = schedule.style.touchAction;
                scheduleItemHold.scheduleOverscrollBehavior = schedule.style.overscrollBehavior;
                scheduleItemHold.scheduleOverflow = schedule.style.overflow;
                scheduleHoldNavigationSuppressedUntil = Number.POSITIVE_INFINITY;
                schedule.style.cursor = 'move';
                schedule.style.touchAction = 'none';
                schedule.style.overscrollBehavior = 'none';
                schedule.style.overflow = 'hidden';
                if (typeof item.setPointerCapture === 'function') {
                    item.setPointerCapture(e.pointerId);
                }
                clone.dispatchEvent(new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    button: 0,
                    buttons: 1,
                    clientX: e.clientX,
                    clientY: e.clientY,
                }));
                queueScheduleHoldTimeUpdate(scheduleItemHold);
            }, 600),
        };
    });

    calendar.addEventListener('pointermove', function(e) {
        if (!scheduleItemHold || scheduleItemHold.pointerId !== e.pointerId) {
            return;
        }

        scheduleItemHold.lastX = e.clientX;
        scheduleItemHold.lastY = e.clientY;

        if (scheduleItemHold.active) {
            e.preventDefault();
            if (scheduleItemHold.pointerType !== 'mouse') {
                document.dispatchEvent(new MouseEvent('mousemove', {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    button: 0,
                    buttons: 1,
                    clientX: e.clientX,
                    clientY: e.clientY,
                }));
            }
            queueScheduleHoldTimeUpdate(scheduleItemHold);
            return;
        }

        if (Math.abs(e.clientX - scheduleItemHold.startX) > 8 || Math.abs(e.clientY - scheduleItemHold.startY) > 8) {
            clearScheduleItemHold(e.pointerId);
        }
    }, { passive: false });

    document.addEventListener('pointerup', function(e) {
        if (scheduleItemHold
            && scheduleItemHold.pointerId === e.pointerId
            && scheduleItemHold.active
            && scheduleItemHold.pointerType !== 'mouse') {
            e.preventDefault();
            finishScheduleNativeDrag(scheduleItemHold, e.clientX, e.clientY, true);
            return;
        }

        if (!scheduleItemHold || scheduleItemHold.pointerId !== e.pointerId || !scheduleItemHold.active) {
            clearScheduleItemHold(e.pointerId);
        }
    }, { passive: false });

    document.addEventListener('mouseup', function() {
        if (scheduleItemHold && scheduleItemHold.active) {
            if (!scheduleItemHold.finishingNativeDrag) {
                scheduleItemHold.commitVisualDrop = true;
            }
            scheduleItemHold.finishingNativeDrag = false;
            scheduleItemHold.nativeDragFinished = true;
            window.setTimeout(function() {
                clearScheduleItemHold();
            }, 0);
        }
    });

    document.addEventListener('pointercancel', function(e) {
        if (scheduleItemHold
            && scheduleItemHold.pointerId === e.pointerId
            && scheduleItemHold.active
            && scheduleItemHold.pointerType !== 'mouse') {
            finishScheduleNativeDrag(scheduleItemHold, e.clientX, e.clientY);
        }
        clearScheduleItemHold(e.pointerId);
    });

    window.addEventListener('blur', function() {
        clearScheduleItemHold();
    });

    calendar.addEventListener('click', function(e) {
        if (isScheduleHoldNavigationSuppressed()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        const day = e.target.closest('.lm-schedule tbody td[data-date]');

        if (!day || !['2-days', 'week'].includes(state.view) || e.target.closest('.lm-schedule-item')) {
            return;
        }

        setSelectedDate(parseDateString(day.dataset.realDate || day.dataset.date));
        state.view = 'day';
        render();
    });

    calendar.addEventListener('click', function(e) {
        const item = e.target.closest('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event, .calendar-schedule-break, .calendar-schedule-recital');

        if (!item || item.classList.contains('calendar-month-event-holiday') || item.classList.contains('calendar-schedule-event-holiday')) {
            return;
        }

        if (item.hasAttribute('holding-event')) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        if (item.classList.contains('lm-schedule-item') && suppressedScheduleItemClick === item) {
            suppressedScheduleItemClick = null;
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        const event = item.classList.contains('lm-schedule-item')
            ? getEventByScheduleItem(item)
            : getEventByGuid(item.id || item.dataset.eventGuid);
        const updatedItem = item.hasAttribute('updated-event') ? item : null;

        if (event && event.isBreak) {
            openTeachingBreakModal(event);
            return;
        }

        if (event && event.isRecital) {
            openRecitalModal(event);
            return;
        }

        if (event && event.isGeneralEvent) {
            openGeneralEventModal(event, {
                openReschedule: Boolean(updatedItem),
                updatedItem,
            });
            return;
        }

        openLessonModal(event, {
            openReschedule: Boolean(updatedItem),
            updatedItem,
        });
    });

    const monthDayEventsModal = document.getElementById('month-day-events-modal');

    if (monthDayEventsModal) {
        monthDayEventsModal.addEventListener('click', function(e) {
            const item = e.target.closest('.calendar-month-event, .calendar-schedule-break, .calendar-schedule-recital');

            if (!item || item.classList.contains('calendar-month-event-holiday')) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            const event = getEventByGuid(item.dataset.eventGuid);

            if (!event) {
                return;
            }

            hideBootstrapModal(monthDayEventsModal);

            if (event.isBreak) {
                openTeachingBreakModal(event);
                return;
            }

            if (event.isRecital) {
                openRecitalModal(event);
                return;
            }

            if (event.isGeneralEvent) {
                openGeneralEventModal(event);
                return;
            }

            openLessonModal(event);
        });
    }

    renderLocationFilters();
    syncEventTypeFilterState();
    render();

    const stopSchedulePointerClock = function() {
        if (state.schedulePointerTimer) {
            window.clearTimeout(state.schedulePointerTimer);
            state.schedulePointerTimer = null;
        }
    };

    const updateSchedulePointerClock = function() {
        stopSchedulePointerClock();

        if (document.hidden) {
            return;
        }

        if (scheduleGridViews.includes(state.view)) {
            patchSchedulePointer(calendar);
        }

        const nextSecondDelay = Math.max(50, 1000 - (Date.now() % 1000));
        state.schedulePointerTimer = window.setTimeout(updateSchedulePointerClock, nextSecondDelay);
    };

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopSchedulePointerClock();
            return;
        }

        updateSchedulePointerClock();
    });

    updateSchedulePointerClock();
});
