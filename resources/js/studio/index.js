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
    teachingBreaks: [],
    studentSearch: '',
    loadedRange: null,
    pendingRangeKey: null,
    scheduleObserver: null,
    schedulePatchFrame: null,
    scheduleLabelFrame: null,
    rescheduleDatePickerDate: null,
    rescheduleDurationMinutes: 15,
    rescheduleAnchor: null,
    rescheduleEndOptions: [],
    paymentTotalCounters: {},
    calendarFetchId: 0,
    didAutoNowScroll: false,
};

const studioTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';

const monthFormatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    timeZone: studioTimeZone,
    year: 'numeric',
});

const shortMonthFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    timeZone: studioTimeZone,
});

const dayFormatter = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    timeZone: studioTimeZone,
    year: 'numeric',
});

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthWeekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const calendarViews = ['schedule', 'day', '2-days', 'week', 'month'];
const scheduleStart = '08:00';
const scheduleEnd = '22:00';
const sidebarHiddenQuery = '(max-width: 1000px)';

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
    return window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches ? '2-days' : 'week';
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
    if (state.view === 'day') {
        return [cloneDate(state.date)];
    }

    if (state.view === '2-days') {
        return Array.from({ length: 2 }, function(_, index) {
            return addDays(state.date, index);
        });
    }

    const start = startOfWeek(state.date);

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
    const headerRow = schedule ? schedule.querySelector('thead tr:not(.studio-schedule-holiday-row)') : null;
    const headers = headerRow ? headerRow.querySelectorAll('td') : [];
    const firstScheduleRow = schedule ? schedule.querySelector('tbody tr') : null;
    const columns = firstScheduleRow ? firstScheduleRow.querySelectorAll('td[data-date]') : [];
    const gridDates = getScheduleGridDates();

    headers.forEach(function(header) {
        header.removeAttribute('data-selected');
        header.removeAttribute('data-real-date');
        header.classList.remove('studio-schedule-hidden-column');
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
            cell.classList.toggle('studio-schedule-hidden-column', isHidden);
        });

        if (!header) {
            return;
        }

        header.classList.toggle('studio-schedule-hidden-column', isHidden);
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
        label.textContent = formatScheduleHour(label.textContent);
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

const renderCalendarPaymentTotals = function() {
    const expected = document.querySelector('[data-calendar-expected-payment]');
    const confirmed = document.querySelector('[data-calendar-confirmed-payment]');
    const lessonsCount = document.querySelector('[data-calendar-lessons-count]');
    const hoursCount = document.querySelector('[data-calendar-hours-count]');
    const averageHours = document.querySelector('[data-calendar-average-hours]');

    if (!expected && !confirmed && !lessonsCount && !hoursCount && !averageHours) {
        return;
    }

    const totals = getVisiblePaymentEvents().reduce(function(carry, event) {
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

const eventTimeFormatter = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: studioTimeZone,
});

const modalDateFormatter = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: studioTimeZone,
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

const patchScheduleItems = function(calendar) {
    calendar.querySelectorAll('.lm-schedule-item').forEach(function(item) {
        const start = item.getAttribute('data-start');
        const end = item.getAttribute('data-end');
        const duration = getTimeMinutes(end) - getTimeMinutes(start);
        const isShort = duration <= 30;
        const event = getEventByGuid(item.id || item.dataset.eventGuid);

        item.classList.toggle('is-short', isShort);
        item.setAttribute('data-display-time', isShort ? formatEventTime(start) : `${formatEventTime(start)} - ${formatEventTime(end)}`);

        if (event && event.calendarStatus) {
            item.setAttribute('data-lesson-status', event.calendarStatus);
        }

        applyEventTimeStatusAttributes(item, event);
        applyEventOverlapAttribute(item, event);
    });
};

const patchScheduleHolidays = function(calendar) {
    const schedule = calendar.querySelector('.lm-schedule');
    const thead = schedule ? schedule.querySelector('thead') : null;

    if (!schedule || !thead || !scheduleGridViews.includes(state.view)) {
        return;
    }

    thead.querySelectorAll('.studio-schedule-holiday-row').forEach(function(row) {
        row.remove();
    });

    const headerRow = thead.querySelector('tr');
    const headerHeight = headerRow ? headerRow.offsetHeight : 0;

    schedule.style.setProperty('--studio-schedule-header-height', `${headerHeight}px`);

    const visibleDates = getVisibleScheduleDates();
    const visibleDateStrings = visibleDates.map(toDateString);
    const hasBanner = visibleDates.some(function(date) {
        return getHolidaysForDate(date).length > 0 || getBreaksForDate(date).length > 0;
    });

    if (!hasBanner) {
        return;
    }

    const row = document.createElement('tr');
    const label = document.createElement('td');

    row.className = 'studio-schedule-holiday-row';
    label.className = 'studio-schedule-holiday-zone';
    row.appendChild(label);

    getScheduleGridDates().forEach(function(date) {
        const cell = document.createElement('td');
        const dateString = toDateString(date);
        const isVisible = state.view !== '2-days' || visibleDateStrings.includes(dateString);
        const holidays = isVisible ? getHolidaysForDate(date) : [];
        const teachingBreaks = isVisible ? getBreaksForDate(date) : [];

        cell.className = 'studio-schedule-holiday-cell';
        cell.dataset.date = dateString;
        cell.dataset.realDate = dateString;
        cell.classList.toggle('studio-schedule-hidden-column', !isVisible);
        applyDateStatusAttributes(cell, dateString);

        holidays.forEach(function(holiday) {
            const item = document.createElement('span');

            item.className = 'studio-schedule-holiday';
            item.textContent = holiday.title;
            applyDateStatusAttributes(item, dateString);
            cell.appendChild(item);
        });

        teachingBreaks.forEach(function(teachingBreak) {
            const item = document.createElement('button');

            item.type = 'button';
            item.className = 'studio-schedule-holiday studio-schedule-break';
            item.textContent = teachingBreak.title;
            item.dataset.eventGuid = `teaching-break-${teachingBreak.id}-${dateString}`;
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
    }) || getTeachingBreakEventByGuid(guid);
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
        button.className = 'studio-date-picker-day';
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

const resetLessonModalState = function(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove('is-canceling', 'is-rescheduling');
    state.rescheduleAnchor = null;
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
    const meetingUrl = modal.querySelector('#meeting-url');
    const meetingUrlLink = meetingUrl ? meetingUrl.querySelector('a') : null;
    const notesUrl = modal.querySelector('#notes-url');
    const notesUrlLink = notesUrl ? notesUrl.querySelector('a') : null;
    const revert = modal.querySelector('#lesson-revert');
    const taught = modal.querySelector('#lesson-taught');
    const cancelLesson = modal.querySelector('#cancel-lesson-button');
    const confirmPayment = modal.querySelector('#confirm-payment');
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
        const canRevert = !!(event && (event.scheduleOverrideId || event.lessonId));

        revert.style.display = canRevert ? 'inline-flex' : 'none';
        revert.disabled = !canRevert;
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
        const recurringCancelFields = cancelLessonForm.querySelector('[data-recurring-cancel-fields]');
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

        if (recurringCancelFields) {
            recurringCancelFields.hidden = isSingleLessonCancel;
        }

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

const openLessonModal = function(event) {
    const modal = document.getElementById('lesson-modal');

    if (!modal) {
        return;
    }

    resetLessonModalState(modal);
    populateLessonModal(modal, event);

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

            row.className = 'studio-break-lesson';
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

    modal.dataset.lessonStatus = status;
    modal.dataset.lessonCanceledBy = payload && payload.canceled_by ? payload.canceled_by : '';

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

    if (event) {
        event.lessonStatus = status;
        event.calendarStatus = payload && payload.schedule_override_deleted ? status : (event.calendarStatus === 'rescheduled' ? 'rescheduled' : status);
        event['data-lesson-status'] = event.calendarStatus;
        event.canceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
        event.lessonEditUrl = payload && payload.lesson_deleted ? '' : (editUrl || event.lessonEditUrl || '');
        event.paymentUrl = payload && payload.lesson_deleted ? '' : (paymentUrl || event.paymentUrl || '');
        event.lessonId = payload && payload.lesson_deleted ? '' : (lessonId || event.lessonId || '');
        event.scheduleOverrideId = payload && payload.schedule_override_deleted ? '' : event.scheduleOverrideId;
    }

    if (revert) {
        const canRevert = !!(event && (event.scheduleOverrideId || event.lessonId));

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

const revertLessonAction = function(button) {
    const modal = button.closest('#lesson-modal');
    const url = button.dataset.url;

    if (!modal || !url || (!modal.dataset.lessonId && !modal.dataset.scheduleOverrideId)) {
        return;
    }

    button.disabled = true;

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.studioCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
            lesson_id: modal.dataset.lessonId || '',
            schedule_override_id: modal.dataset.scheduleOverrideId || '',
        }),
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Unable to revert lesson action.');
            }

            return response.json();
        })
        .then(function() {
            window.location.reload();
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;
            restoreButtonLabel(button);
        });
};

const storeTaughtLesson = function(button) {
    const modal = button.closest('#lesson-modal');
    const url = button.dataset.url;
    const lessonPlanId = modal ? modal.dataset.lessonPlanId : '';
    const singleLessonPlanId = modal ? modal.dataset.singleLessonPlanId : '';

    if (!modal || !url || (!lessonPlanId && !singleLessonPlanId)) {
        return;
    }

    button.disabled = true;

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.studioCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(getLessonOccurrencePayload(modal)),
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Unable to store lesson.');
            }

            return response.json();
        })
        .then(function() {
            window.location.reload();
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;
            restoreButtonLabel(button);
        });
};

const confirmLessonPayment = function(button) {
    const modal = button.closest('#lesson-modal');
    const url = button.dataset.url;

    if (!modal || !url) {
        return;
    }

    button.disabled = true;

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.studioCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Unable to confirm payment.');
            }

            return response.json();
        })
        .then(function() {
            window.location.reload();
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;
            restoreButtonLabel(button);
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
    const minutes = (now.getHours() * 60) + now.getMinutes();
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

const getEventDateTime = function(event, key) {
    if (!event || !event.date || !event[key]) {
        return null;
    }

    const date = parseDateString(String(event.date).substring(0, 10));
    const parts = normalizeTime(event[key]).split(':').map(Number);

    date.setHours(parts[0] || 0, parts[1] || 0, 0, 0);

    return date;
};

const getEventTimeStatus = function(event) {
    if (!event || event.isHoliday || event.isBreak) {
        return '';
    }

    const start = getEventDateTime(event, 'start');
    const end = getEventDateTime(event, 'end');
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

const applyEventTimeStatusAttributes = function(element, event) {
    if (!element) {
        return;
    }

    const status = getEventTimeStatus(event);

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

const isOverlappingTimedEvent = function(event) {
    if (!isConflictEligibleTimedEvent(event) || !event.date) {
        return false;
    }

    const date = parseDateString(String(event.date).substring(0, 10));

    return getOverlappingTimedEventGuids(getEventsForDate(date)).has(event.guid);
};

const applyEventOverlapAttribute = function(element, event) {
    if (!element) {
        return;
    }

    element.toggleAttribute('overlapping-event', isOverlappingTimedEvent(event));
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
    if (!endSelect || state.rescheduleEndOptions.length) {
        return;
    }

    state.rescheduleEndOptions = Array.from(endSelect.options).map(function(option) {
        return {
            value: option.value,
            label: option.textContent,
        };
    });
};

const renderRescheduleEndOptions = function(startSelect, endSelect, preferredValue) {
    if (!startSelect || !endSelect) {
        return;
    }

    cacheRescheduleEndOptions(endSelect);

    const startMinutes = getSelectTimeMinutes(startSelect);
    const selectedValue = preferredValue || endSelect.value;
    const options = state.rescheduleEndOptions.filter(function(option) {
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

const normalizeStudentSearch = function(value) {
    return String(value || '').trim().toLowerCase();
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
                    lessonEditUrl: occurrence.lesson_edit_url || '',
                    paymentUrl: occurrence.lesson_payment_url || occurrence.payment_url || '',
                    meetingUrl: occurrence.meeting_url || lesson.meeting_url || '',
                    notesUrl: occurrence.notes_url || lesson.notes_url || '',
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
                lessonEditUrl: getLessonEditUrl(confirmedLesson),
                paymentUrl: getLessonPaymentUrl(confirmedLesson),
                meetingUrl: lesson.meeting_url || '',
                notesUrl: lesson.notes_url || '',
            });

            occurrence = addDays(occurrence, intervalDays);
        }
    });

    return events;
};

const syncCalendarEvents = function() {
    state.events = normalizeScheduleEvents(state.customEvents).concat(getPlannedLessonEvents(getCalendarEventRange()));
    state.visibleEventsByDate = null;
};

const createStudioEvent = function(date) {
    return {
        title: 'No title',
        date: toDateString(date),
        start: '09:00',
        end: '10:00',
        color: '#2fbb7f',
        guid: `studio-${Date.now()}-${Math.round(Math.random() * 100000)}`,
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

    return holidays.concat(getBreakEventsForDate(date)).concat(getEventsForDate(date));
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

    item.className = event.isHoliday ? 'studio-month-event studio-month-event-holiday' : (event.isBreak ? 'studio-month-event studio-month-event-break' : 'studio-month-event');
    dot.className = 'studio-month-event-dot';
    time.className = 'studio-month-event-time';
    title.className = 'studio-month-event-title';
    item.dataset.eventGuid = event.guid || '';
    item.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.calendarStatus || event.lessonStatus || 'unconfirmed'));
    dot.dataset.eventGuid = event.guid || '';
    dot.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.calendarStatus || event.lessonStatus || 'unconfirmed'));
    applyCalendarItemStatusAttributes(item, event, dateString);
    applyCalendarItemStatusAttributes(dot, event, dateString);

    time.textContent = event.isHoliday || event.isBreak ? '' : formatEventTime(event.start);
    title.textContent = event.title || 'No title';

    if (!event.isHoliday && !event.isBreak) {
        item.appendChild(dot);
        item.appendChild(time);
    }

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

const openMonthDayEventsModal = function(dateString) {
    const modal = document.getElementById('month-day-events-modal');

    if (!modal) {
        return;
    }

    const title = modal.querySelector('.modal-title');
    const list = modal.querySelector('[data-month-day-events-list]');
    const date = parseDateString(dateString);
    const events = getCalendarItemsForDate(date);

    if (title) {
        title.textContent = dayFormatter.format(date);
    }

    if (list) {
        list.innerHTML = '';

        events.forEach(function(event) {
            list.appendChild(createMonthEventElement(event, dateString));
        });
    }

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

    wrapper.className = 'studio-month-calendar';
    weekdaysRow.className = 'studio-month-weekdays';
    grid.className = 'studio-month-grid';

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

        cell.className = 'studio-month-day';
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

        day.className = 'studio-month-day-number';
        day.textContent = date.getDate() === 1
            ? `${shortMonthFormatter.format(date)} ${date.getDate()}`
            : date.getDate();

        list.className = 'studio-month-events';

        if (hasOverlaps) {
            const alert = document.createElement('i');

            alert.className = 'fa-solid fa-circle-exclamation studio-month-overlap-alert';
            alert.setAttribute('aria-hidden', 'true');
            cell.appendChild(alert);
        }

        events.slice(0, visibleEventCount).forEach(function(event) {
            list.appendChild(createMonthEventElement(event, dateString));
        });

        if (events.length > 4) {
            const more = document.createElement('span');

            more.className = 'studio-month-more';
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

    wrapper.className = 'studio-schedule-agenda';

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

        day.className = 'studio-schedule-day';
        day.dataset.date = dateString;
        dateRail.className = 'studio-schedule-date';
        weekday.className = 'studio-schedule-weekday';
        number.className = 'studio-schedule-number';
        list.className = 'studio-schedule-list';

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

            empty.className = 'studio-schedule-empty';
            empty.textContent = 'Nothing planned.';
            list.appendChild(empty);
        }

        items.forEach(function(event) {
            const item = document.createElement(event.isHoliday ? 'div' : 'button');
            const title = document.createElement('span');

            item.className = event.isHoliday ? 'studio-schedule-event studio-schedule-event-holiday' : (event.isBreak ? 'studio-schedule-event studio-schedule-event-break' : 'studio-schedule-event');
            title.className = 'studio-schedule-event-title';
            title.textContent = event.title || 'No title';
            item.dataset.eventGuid = event.guid || '';
            item.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.calendarStatus || event.lessonStatus || 'unconfirmed'));
            applyCalendarItemStatusAttributes(item, event, dateString);
            applyEventOverlapAttribute(item, event);

            if (!event.isHoliday && !event.isBreak) {
                const time = document.createElement('span');
                const duration = getEventDurationMinutes(event);

                item.type = 'button';
                item.dataset.durationMinutes = duration;
                item.style.setProperty('--studio-schedule-event-height', getAgendaEventHeight(event));
                time.className = 'studio-schedule-event-time';
                time.textContent = event.start && event.end
                    ? `${formatAgendaEventTime(event.start)}-${formatAgendaEventTime(event.end)}`
                    : formatAgendaEventTime(event.start);
                item.appendChild(title);
                item.appendChild(time);
            } else {
                if (event.isBreak) {
                    item.type = 'button';
                }

                item.appendChild(title);
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

    if (!feeInput || !hourlyFee || !duration) {
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

const initializeSingleLessonPlanForms = function() {
    document.querySelectorAll('[data-single-lesson-plan-form]').forEach(function(form) {
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

document.addEventListener('DOMContentLoaded', function() {
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
    const calendarSearch = document.querySelector('.studio-calendar-search');
    const calendarToolbar = calendarSearch ? calendarSearch.closest('.studio-calendar-toolbar') : null;
    const calendarSearchToggle = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-toggle]') : null;
    const calendarSearchClear = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-clear]') : null;
    const studentSearch = calendarSearch ? calendarSearch.querySelector('input[name="search"]') : null;
    const offcanvasViews = document.getElementById('calendar-offcanvas-views');
    const offcanvasViewItems = Array.from(document.querySelectorAll('[data-calendar-offcanvas-view]'));
    const calendarInsights = document.getElementById('studio-calendar-insights');
    const calendarInsightsSidebarTarget = document.querySelector('[data-calendar-insights-sidebar-target]');
    const calendarInsightsOffcanvasTarget = document.querySelector('[data-calendar-insights-offcanvas-target]');
    const locationFilters = document.querySelector('[data-calendar-location-filters]');
    const calendarFilter = document.querySelector('.studio-calendar-filter');

    if (!calendar) {
        return;
    }

    initializeStudentComboboxes();
    initializeSingleLessonPlanForms();

    state.plannedLessons = Array.isArray(window.studioPlannedLessons)
        ? window.studioPlannedLessons
        : (Array.isArray(window.studioLessonPlans) ? window.studioLessonPlans : []);
    state.singleLessonPlans = Array.isArray(window.studioSingleLessonPlans) ? window.studioSingleLessonPlans : [];
    state.holidays = Array.isArray(window.studioHolidays) ? window.studioHolidays : [];
    state.teachingBreaks = Array.isArray(window.studioTeachingBreaks) ? window.studioTeachingBreaks : [];
    state.locations = Array.isArray(window.studioLocations) ? window.studioLocations : [];
    state.loadedRange = normalizeRange(window.studioCalendarRange);

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

        if (calendarFilter) {
            calendarFilter.toggleAttribute('selected', isLocationFilterActive());
        }
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
            const label = document.createElement('label');
            const input = document.createElement('input');
            const text = document.createElement('span');

            label.className = 'studio-calendar-filter-option';
            label.setAttribute('for', id);

            input.type = 'checkbox';
            input.id = id;
            input.value = location.id;
            input.checked = true;
            input.dataset.calendarLocationFilter = '';

            text.textContent = location.name || 'Location';

            label.appendChild(input);
            label.appendChild(text);
            locationFilters.appendChild(label);
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
            button.className = 'studio-mini-calendar-date';
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
        const days = Array.from(agenda.querySelectorAll('.studio-schedule-day'));

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
        const target = agenda.querySelector(`.studio-schedule-day[data-date="${selected}"]`)
            || agenda.querySelector(`.studio-schedule-day[data-date="${todayString()}"]`)
            || agenda.querySelector('.studio-schedule-day');

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
        calendar.classList.toggle('studio-calendar-day-view', state.view === 'day');
        calendar.classList.toggle('studio-calendar-two-days-view', state.view === '2-days');
        calendar.classList.toggle('studio-calendar-week-view', state.view === 'week');
        calendar.classList.toggle('studio-calendar-month-view', state.view === 'month');
        calendar.classList.toggle('studio-calendar-schedule-view', state.view === 'schedule');

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
                onbeforeinsert: function() {
                    return false;
                },
                onbeforechangeevent: function(instance, detail) {
                    if (detail && detail.action) {
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

    if (today) {
        today.addEventListener('click', function() {
            setSelectedDate(getTodayDate());
            render();
        });
    }

    if (previous) {
        previous.addEventListener('click', function() {
            move(-1);
            render();
        });
    }

    if (next) {
        next.addEventListener('click', function() {
            move(1);
            render();
        });
    }

    if (view) {
        view.addEventListener('change', function() {
            setCalendarView(this.value);
        });
    }

    offcanvasViewItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
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
            state.miniDate = addMonths(state.miniDate, -1);
            renderMiniCalendar();
        });
    }

    if (miniNext) {
        miniNext.addEventListener('click', function() {
            state.miniDate = addMonths(state.miniDate, 1);
            renderMiniCalendar();
        });
    }

    if (miniGrid) {
        miniGrid.addEventListener('click', function(e) {
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
            storeTaughtLesson(lessonTaught);
        });
    }

    const confirmPayment = document.getElementById('confirm-payment');

    if (confirmPayment) {
        confirmPayment.addEventListener('click', function(e) {
            e.preventDefault();
            confirmLessonPayment(confirmPayment);
        });
    }

    const lessonRevert = document.getElementById('lesson-revert');

    if (lessonRevert) {
        lessonRevert.addEventListener('click', function(e) {
            e.preventDefault();
            revertLessonAction(lessonRevert);
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

        lessonModal.addEventListener('hidden.bs.modal', function() {
            resetLessonModalState(lessonModal);
        });

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(lessonModal).on('hidden.bs.modal', function() {
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

    calendar.addEventListener('click', function(e) {
        const day = e.target.closest('.studio-month-day');

        if (!day || state.view !== 'month') {
            return;
        }

        const more = e.target.closest('.studio-month-more');

        if (more) {
            e.preventDefault();
            e.stopPropagation();
            openMonthDayEventsModal(more.dataset.monthMoreDate || day.dataset.date);
            return;
        }

        if (!e.target.closest('.studio-month-event')) {
            setSelectedDate(parseDateString(day.dataset.date));
            state.view = 'week';
            render();
        }
    });

    calendar.addEventListener('mousedown', function(e) {
        if (!e.target.closest('.lm-schedule-item')) {
            return;
        }

        e.stopPropagation();
    }, true);

    calendar.addEventListener('click', function(e) {
        const day = e.target.closest('.lm-schedule tbody td[data-date]');

        if (!day || !['2-days', 'week'].includes(state.view) || e.target.closest('.lm-schedule-item')) {
            return;
        }

        setSelectedDate(parseDateString(day.dataset.realDate || day.dataset.date));
        state.view = 'day';
        render();
    });

    calendar.addEventListener('click', function(e) {
        const item = e.target.closest('.lm-schedule-item, .studio-month-event, .studio-schedule-event, .studio-schedule-break');

        if (!item || item.classList.contains('studio-month-event-holiday') || item.classList.contains('studio-schedule-event-holiday')) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        const event = getEventByGuid(item.id || item.dataset.eventGuid);

        if (event && event.isBreak) {
            openTeachingBreakModal(event);
            return;
        }

        openLessonModal(event);
    });

    const monthDayEventsModal = document.getElementById('month-day-events-modal');

    if (monthDayEventsModal) {
        monthDayEventsModal.addEventListener('click', function(e) {
            const item = e.target.closest('.studio-month-event, .studio-schedule-break');

            if (!item || item.classList.contains('studio-month-event-holiday')) {
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

            openLessonModal(event);
        });
    }

    renderLocationFilters();
    render();
});
