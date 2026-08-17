import { spring } from 'motion';
import { animate } from 'motion/mini';

const DOMPurify = require('dompurify');
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
    selectedEventTypes: ['recurring', 'single', 'general', 'google'],
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
    calendarRenderMode: 'animated',
    lessonActionAvailabilityTimer: null,
    scheduleWindowStart: null,
    pendingScheduleScrollTop: null,
    pendingScheduleHeaderPreview: null,
    travelRouteCache: new Map(),
    travelRouteRequests: new Map(),
    scheduleTravelAnimations: new WeakMap(),
    activeRequestControllers: new Set(),
    loadingBarFetchId: null,
    loadingBarProgress: 0,
    loadingBarTimer: null,
    loadingBarHideTimer: null,
    ignoredConflictPairs: new Set(),
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
const scheduleStart = '06:00';
const scheduleEnd = '23:00';
const monthVisibleEventLimit = 3;
const travelArrivalBufferMinutes = 5;
const sidebarHiddenQuery = '(max-width: 1000px)';
const dayMilliseconds = 24 * 60 * 60 * 1000;
const calendarRequestTimeoutMilliseconds = 20 * 1000;
const calendarStaleAfterMilliseconds = 5 * 60 * 1000;

const scheduleGridViews = ['day', '2-days', 'week'];
const calendarEventTypes = ['recurring', 'single', 'general', 'google', 'canceled'];

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
    const windowStart = params.get('window_start');
    let eventTypes = params.has('event_types')
        ? params.get('event_types').split(',').filter(function(type, index, types) {
            return calendarEventTypes.includes(type) && types.indexOf(type) === index;
        })
        : null;
    const usesGoogleEventFilter = params.get('event_filter_version') === '2';

    if (eventTypes
        && !usesGoogleEventFilter
        && eventTypes.includes('general')
        && !eventTypes.includes('google')) {
        eventTypes.push('google');
    }
    const locationIds = params.has('location_ids')
        ? params.get('location_ids').split(',').map(normalizeLocationId).filter(function(id, index, ids) {
            return id && ids.indexOf(id) === index;
        })
        : null;

    return {
        view: calendarViews.includes(view) ? view : getDefaultCalendarView(),
        date: parseUrlDate(date),
        windowStart: parseUrlDate(windowStart),
        eventTypes,
        locationIds,
    };
};

const updateCalendarUrl = function() {
    const url = new URL(window.location.href);

    url.searchParams.set('view', state.view);
    url.searchParams.set('date', toDateString(state.date));
    if (state.view === 'week' && isValidDate(state.scheduleWindowStart)) {
        url.searchParams.set('window_start', toDateString(state.scheduleWindowStart));
    } else {
        url.searchParams.delete('window_start');
    }
    url.searchParams.set('event_types', state.selectedEventTypes.join(','));
    url.searchParams.set('event_filter_version', '2');
    url.searchParams.set('location_ids', state.selectedLocationIds.join(','));
    window.history.replaceState({
        calendarView: state.view,
        calendarDate: toDateString(state.date),
        calendarEventTypes: state.selectedEventTypes.slice(),
        calendarLocationIds: state.selectedLocationIds.slice(),
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

const getCalendarLoadingBar = function() {
    return document.querySelector('#loading-bar > div');
};

const setCalendarLoadingProgress = function(fetchId, progress) {
    const bar = getCalendarLoadingBar();

    if (!bar || state.loadingBarFetchId !== fetchId) {
        return;
    }

    const nextProgress = Math.max(state.loadingBarProgress, Math.min(100, Number(progress) || 0));

    state.loadingBarProgress = nextProgress;
    bar.style.width = `${nextProgress}%`;
};

const startCalendarLoadingProgress = function(fetchId) {
    const bar = getCalendarLoadingBar();

    if (!bar) {
        return;
    }

    if (state.loadingBarTimer !== null) {
        window.clearInterval(state.loadingBarTimer);
    }
    if (state.loadingBarHideTimer !== null) {
        window.clearTimeout(state.loadingBarHideTimer);
        state.loadingBarHideTimer = null;
    }

    state.loadingBarFetchId = fetchId;
    state.loadingBarProgress = 0;
    bar.hidden = false;
    bar.style.transition = 'none';
    bar.style.opacity = '1';
    bar.style.width = '0%';
    void bar.offsetWidth;
    bar.style.transition = 'width 180ms ease-out';
    setCalendarLoadingProgress(fetchId, 6);

    state.loadingBarTimer = window.setInterval(function() {
        if (state.loadingBarFetchId !== fetchId) {
            return;
        }

        const remaining = 48 - state.loadingBarProgress;

        if (remaining > 0.5) {
            setCalendarLoadingProgress(fetchId, state.loadingBarProgress + Math.max(0.75, remaining * 0.12));
        }
    }, 180);
};

const finishCalendarLoadingProgress = function(fetchId) {
    const bar = getCalendarLoadingBar();

    if (!bar || state.loadingBarFetchId !== fetchId) {
        return;
    }

    if (state.loadingBarTimer !== null) {
        window.clearInterval(state.loadingBarTimer);
        state.loadingBarTimer = null;
    }

    bar.style.opacity = '1';
    bar.style.transition = 'width 140ms ease-out';
    setCalendarLoadingProgress(fetchId, 100);
    state.loadingBarHideTimer = window.setTimeout(function() {
        if (state.loadingBarFetchId !== fetchId) {
            return;
        }

        bar.style.transition = 'opacity 240ms ease-out';
        bar.style.opacity = '0';
        state.loadingBarHideTimer = window.setTimeout(function() {
            if (state.loadingBarFetchId !== fetchId) {
                return;
            }

            bar.hidden = true;
            bar.style.transition = 'none';
            bar.style.opacity = '1';
            bar.style.width = '0%';
            state.loadingBarProgress = 0;
            state.loadingBarFetchId = null;
            state.loadingBarHideTimer = null;
        }, 260);
    }, 160);
};

const readCalendarJsonResponse = function(response, fetchId) {
    const contentLength = Number(response.headers.get('content-length'));
    const canStream = response.body && typeof response.body.getReader === 'function';

    setCalendarLoadingProgress(fetchId, 55);

    if (!canStream || !Number.isFinite(contentLength) || contentLength <= 0) {
        return response.json().then(function(payload) {
            setCalendarLoadingProgress(fetchId, 94);

            return payload;
        });
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let receivedLength = 0;
    let responseText = '';

    const readChunk = function() {
        return reader.read().then(function(result) {
            if (result.done) {
                responseText += decoder.decode();
                setCalendarLoadingProgress(fetchId, 94);

                return JSON.parse(responseText);
            }

            receivedLength += result.value.byteLength;
            responseText += decoder.decode(result.value, { stream: true });
            setCalendarLoadingProgress(fetchId, 55 + (Math.min(1, receivedLength / contentLength) * 39));

            return readChunk();
        });
    };

    return readChunk();
};

const fetchCalendarResource = function(url, options) {
    if (typeof AbortController !== 'function') {
        return fetch(url, options);
    }

    const controller = new AbortController();
    const requestOptions = Object.assign({}, options || {}, {
        signal: controller.signal,
    });
    let didTimeout = false;
    const timeout = window.setTimeout(function() {
        didTimeout = true;
        controller.abort();
    }, calendarRequestTimeoutMilliseconds);

    state.activeRequestControllers.add(controller);

    return fetch(url, requestOptions)
        .catch(function(error) {
            if (didTimeout) {
                throw new Error('The request timed out. Please try again.');
            }

            throw error;
        })
        .finally(function() {
            window.clearTimeout(timeout);
            state.activeRequestControllers.delete(controller);
        });
};

const cancelPendingCalendarRequests = function() {
    state.activeRequestControllers.forEach(function(controller) {
        controller.abort();
    });
    state.activeRequestControllers.clear();
};

const getTodayDate = function() {
    const now = new Date();

    return createLocalDate(now.getFullYear(), now.getMonth(), now.getDate());
};

const setSelectedDate = function(date) {
    state.date = cloneDate(date);
    state.miniDate = cloneDate(state.date);
    state.didAutoNowScroll = false;
    state.scheduleWindowStart = null;
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
        const start = getVisibleScheduleDates()[0];

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

    startCalendarLoadingProgress(fetchId);

    return fetchCalendarResource(url, {
        headers: {
            Accept: 'application/json',
        },
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Unable to load calendar lessons.');
            }

            return readCalendarJsonResponse(response, fetchId);
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
            setIgnoredConflictPairs(payload.ignoredConflicts);
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

            finishCalendarLoadingProgress(fetchId);
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

    const start = isValidDate(state.scheduleWindowStart)
        ? cloneDate(state.scheduleWindowStart)
        : startOfWeek(state.date);

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

const getScheduleDateForGridIndex = function(index) {
    if (state.view === '2-days') {
        const visibleDates = getVisibleScheduleDates();

        return visibleDates[index] ? cloneDate(visibleDates[index]) : getTwoDaysBackingDateForIndex(index);
    }

    if (state.view === 'week') {
        const visibleDates = getVisibleScheduleDates();

        return visibleDates[index] ? cloneDate(visibleDates[index]) : null;
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

    if (state.view === 'week' && isValidDate(state.scheduleWindowStart)) {
        return toDateString(addDays(startOfWeek(state.scheduleWindowStart), 1));
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

const createScheduleHeaderDragPreview = function(headerRow) {
    const visibleHeaders = Array.from(headerRow.cells).slice(1).filter(function(header) {
        return header.getBoundingClientRect().width > 0;
    });
    const gutter = headerRow.cells[0];

    if (!visibleHeaders.length || !gutter) {
        return null;
    }

    const gutterRect = gutter.getBoundingClientRect();
    const firstRect = visibleHeaders[0].getBoundingClientRect();
    const lastRect = visibleHeaders[visibleHeaders.length - 1].getBoundingClientRect();
    const visibleWidth = lastRect.right - firstRect.left;
    const dayWidth = visibleWidth / visibleHeaders.length;
    const bufferDays = 31;
    const visibleDates = getVisibleScheduleDates();
    const headerStyle = window.getComputedStyle(visibleHeaders[0]);
    const weekdayStyle = window.getComputedStyle(visibleHeaders[0], '::before');
    const scheduleStyle = window.getComputedStyle(headerRow.closest('.lm-schedule'));
    const preview = document.createElement('div');
    const gutterMask = document.createElement('div');
    const rail = document.createElement('div');

    preview.className = `calendar-schedule-header-drag-preview calendar-schedule-header-drag-preview-${state.view}`;
    preview.style.left = `${firstRect.left}px`;
    preview.style.top = `${firstRect.top}px`;
    preview.style.width = `${visibleWidth}px`;
    preview.style.height = `${firstRect.height}px`;
    preview.style.borderTopRightRadius = scheduleStyle.borderTopRightRadius;
    preview.style.setProperty('--calendar-schedule-drag-number-size', headerStyle.fontSize);
    preview.style.setProperty('--calendar-schedule-drag-number-weight', headerStyle.fontWeight);
    preview.style.setProperty('--calendar-schedule-drag-number-line-height', headerStyle.lineHeight);
    preview.style.setProperty('--calendar-schedule-drag-weekday-size', weekdayStyle.fontSize);
    preview.style.setProperty('--calendar-schedule-drag-weekday-weight', weekdayStyle.fontWeight);
    preview.style.setProperty('--calendar-schedule-drag-weekday-line-height', weekdayStyle.lineHeight);
    preview.style.setProperty('--calendar-schedule-drag-weekday-spacing', weekdayStyle.paddingBottom);
    gutterMask.className = 'calendar-schedule-header-drag-gutter';
    gutterMask.style.left = `${gutterRect.left}px`;
    gutterMask.style.top = `${firstRect.top}px`;
    gutterMask.style.width = `${Math.max(0, firstRect.left - gutterRect.left)}px`;
    gutterMask.style.height = `${firstRect.height}px`;
    gutterMask.style.borderTopLeftRadius = scheduleStyle.borderTopLeftRadius;
    rail.className = 'calendar-schedule-header-drag-rail';

    Array.from({ length: (bufferDays * 2) + visibleDates.length }, function(_, index) {
        return addDays(visibleDates[0], index - bufferDays);
    }).forEach(function(date) {
        const day = document.createElement('span');
        const weekday = document.createElement('span');
        const number = document.createElement('span');

        day.className = 'calendar-schedule-header-drag-day';
        day.style.flexBasis = `${dayWidth}px`;
        day.style.width = `${dayWidth}px`;
        day.classList.toggle('is-today', toDateString(date) === todayString());
        weekday.className = 'calendar-schedule-header-drag-weekday';
        number.className = 'calendar-schedule-header-drag-number';
        weekday.textContent = weekdays[date.getDay()];
        number.textContent = String(date.getDate()).padStart(2, '0');
        day.appendChild(weekday);
        day.appendChild(number);
        rail.appendChild(day);
    });

    preview.appendChild(rail);
    document.body.appendChild(preview);
    document.body.appendChild(gutterMask);

    return {
        element: preview,
        gutterMask,
        rail,
        dayWidth,
        initialX: -(bufferDays * dayWidth),
        maxDistance: bufferDays * dayWidth,
    };
};

const removeScheduleHeaderDragPreview = function(preview) {
    if (!preview) {
        return;
    }

    if (preview.element) {
        preview.element.remove();
    }
    if (preview.gutterMask) {
        preview.gutterMask.remove();
    }
};

const bindScheduleHeaderDrag = function(calendar, navigateByDays) {
    const dragMovementRatio = 0.68;
    const settleDuration = 240;
    let drag = null;
    let settlingPreview = null;

    const getPreviewRailX = function(preview) {
        const transform = preview && preview.rail
            ? window.getComputedStyle(preview.rail).transform
            : 'none';

        if (!transform || transform === 'none') {
            return preview ? preview.initialX : 0;
        }

        try {
            return new DOMMatrixReadOnly(transform).m41;
        } catch (error) {
            const values = transform.match(/^matrix(?:3d)?\((.+)\)$/);

            if (!values) {
                return preview ? preview.initialX : 0;
            }

            const parts = values[1].split(',').map(Number);

            return transform.startsWith('matrix3d') ? parts[12] : parts[4];
        }
    };

    const settlePreview = function(preview, currentX, targetX) {
        preview.settleGeneration = Number(preview.settleGeneration || 0) + 1;
        preview.settleTargetX = targetX;
        preview.rail.style.transform = `translate3d(${currentX}px, 0, 0)`;

        if (Math.abs(currentX - targetX) < 0.5
            || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
            preview.rail.style.transform = `translate3d(${targetX}px, 0, 0)`;
            return Promise.resolve();
        }

        return new Promise(function(resolve) {
            let finished = false;
            let fallback = null;
            const finish = function() {
                if (finished) {
                    return;
                }

                finished = true;
                window.clearTimeout(fallback);
                preview.rail.removeEventListener('transitionend', finish);
                delete preview.cancelSettle;
                resolve();
            };

            preview.cancelSettle = finish;
            fallback = window.setTimeout(finish, settleDuration + 60);

            preview.rail.addEventListener('transitionend', finish);
            preview.rail.getBoundingClientRect();
            preview.rail.style.transition = `transform ${settleDuration}ms cubic-bezier(0.22, 0.61, 0.36, 1)`;
            preview.rail.style.transform = `translate3d(${targetX}px, 0, 0)`;
        });
    };

    const takeSettlingPreview = function() {
        if (!settlingPreview) {
            return null;
        }

        const preview = settlingPreview;
        const currentX = getPreviewRailX(preview);

        settlingPreview = null;
        if (typeof preview.cancelSettle === 'function') {
            preview.cancelSettle();
        }
        preview.settleGeneration = Number(preview.settleGeneration || 0) + 1;
        preview.rail.style.transition = 'none';
        preview.rail.style.transform = `translate3d(${currentX}px, 0, 0)`;

        return {
            preview,
            currentX,
            targetX: Number.isFinite(preview.settleTargetX) ? preview.settleTargetX : currentX,
        };
    };

    const clearDrag = function(preservePreview) {
        if (!drag) {
            return;
        }

        const current = drag;

        drag = null;
        current.row.classList.remove('calendar-schedule-header-dragging');
        if (current.preview) {
            current.preview.isBeingDragged = false;
        }
        if (current.preview && !preservePreview) {
            removeScheduleHeaderDragPreview(current.preview);
        }
        if (current.inputType === 'pointer'
            && typeof current.row.hasPointerCapture === 'function'
            && current.row.hasPointerCapture(current.pointerId)) {
            try {
                current.row.releasePointerCapture(current.pointerId);
            } catch (error) {
                // The browser may already have released capture after cancellation.
            }
        }
    };

    const finishDrag = function(pointerId, inputType, commit) {
        if (!drag
            || (pointerId !== null && drag.pointerId !== pointerId)
            || (inputType && drag.inputType !== inputType)) {
            return;
        }

        const current = drag;
        const offset = commit && current.active && current.preview
            ? Math.round(-(current.baseX + current.deltaX - current.anchorX) / current.preview.dayWidth)
            : 0;

        if (!current.active || !current.preview || !commit) {
            clearDrag();
            return;
        }

        const currentX = current.baseX + current.deltaX;
        const targetX = current.anchorX - (offset * current.preview.dayWidth);

        current.preview.settledPromise = settlePreview(current.preview, currentX, targetX);
        const settleGeneration = current.preview.settleGeneration;

        current.preview.isBeingDragged = false;
        settlingPreview = current.preview;
        current.preview.settledPromise.then(function() {
            if (settlingPreview === current.preview) {
                settlingPreview = null;
            }
        });
        clearDrag(true);

        if (offset) {
            navigateByDays(offset, current.preview);
            return;
        }

        current.preview.settledPromise.then(function() {
            if (current.preview.settleGeneration === settleGeneration
                && !current.preview.isBeingDragged) {
                removeScheduleHeaderDragPreview(current.preview);
            }
        });
    };

    const beginDrag = function(row, pointerId, clientX, clientY, inputType) {
        if (!row || !scheduleGridViews.includes(state.view)) {
            return;
        }

        clearDrag();
        const interrupted = takeSettlingPreview();

        drag = {
            row,
            pointerId,
            inputType,
            startX: clientX,
            startY: clientY,
            deltaX: 0,
            baseX: interrupted ? interrupted.currentX : 0,
            anchorX: interrupted ? interrupted.targetX : 0,
            active: Boolean(interrupted),
            preview: interrupted ? interrupted.preview : null,
        };

        if (interrupted) {
            drag.preview.isBeingDragged = true;
            drag.row.classList.add('calendar-schedule-header-dragging');
            if (inputType === 'pointer' && typeof drag.row.setPointerCapture === 'function') {
                try {
                    drag.row.setPointerCapture(pointerId);
                } catch (error) {
                    // Window-level listeners still complete the drag safely.
                }
            }
        }
    };

    const moveDrag = function(pointerId, inputType, clientX, clientY, e) {
        if (!drag || drag.pointerId !== pointerId || drag.inputType !== inputType) {
            return;
        }

        const deltaX = clientX - drag.startX;
        const deltaY = clientY - drag.startY;

        if (!drag.active) {
            if (Math.abs(deltaY) >= 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
                clearDrag();
                return;
            }

            if (Math.abs(deltaX) < 8 || Math.abs(deltaX) <= Math.abs(deltaY)) {
                return;
            }

            drag.preview = createScheduleHeaderDragPreview(drag.row);
            if (!drag.preview) {
                clearDrag();
                return;
            }

            drag.active = true;
            drag.baseX = drag.preview.initialX;
            drag.anchorX = drag.preview.initialX;
            drag.preview.isBeingDragged = true;
            drag.row.classList.add('calendar-schedule-header-dragging');
            if (drag.inputType === 'pointer' && typeof drag.row.setPointerCapture === 'function') {
                try {
                    drag.row.setPointerCapture(drag.pointerId);
                } catch (error) {
                    // Window-level listeners still complete the drag safely.
                }
            }
        }

        e.preventDefault();
        const minimumX = drag.anchorX - drag.preview.maxDistance;
        const maximumX = drag.anchorX + drag.preview.maxDistance;
        const resistedDeltaX = deltaX * dragMovementRatio;
        const nextX = Math.max(minimumX, Math.min(maximumX, drag.baseX + resistedDeltaX));

        drag.deltaX = nextX - drag.baseX;
        drag.preview.rail.style.transform = `translate3d(${nextX}px, 0, 0)`;
    };

    const navigateByArrow = function(dayOffset) {
        if (!dayOffset || drag || !scheduleGridViews.includes(state.view)) {
            return false;
        }

        const row = calendar.querySelector('.lm-schedule thead tr:not(.calendar-schedule-holiday-row)');
        const interrupted = takeSettlingPreview();
        const preview = interrupted ? interrupted.preview : createScheduleHeaderDragPreview(row);

        if (!preview) {
            return false;
        }

        const currentX = interrupted ? interrupted.currentX : preview.initialX;
        const anchorX = interrupted ? interrupted.targetX : preview.initialX;
        const targetX = anchorX - (dayOffset * preview.dayWidth);

        preview.isBeingDragged = false;
        preview.settledPromise = settlePreview(preview, currentX, targetX);
        settlingPreview = preview;
        preview.settledPromise.then(function() {
            if (settlingPreview === preview) {
                settlingPreview = null;
            }
        });
        navigateByDays(dayOffset, preview);

        return true;
    };

    calendar.addEventListener('pointerdown', function(e) {
        const row = e.target.closest('.lm-schedule thead tr:not(.calendar-schedule-holiday-row)');

        if (e.pointerType === 'touch' || e.button !== 0 || e.isPrimary === false) {
            return;
        }

        beginDrag(row, e.pointerId, e.clientX, e.clientY, 'pointer');
    });

    window.addEventListener('pointermove', function(e) {
        moveDrag(e.pointerId, 'pointer', e.clientX, e.clientY, e);
    }, { passive: false });

    window.addEventListener('pointerup', function(e) {
        finishDrag(e.pointerId, 'pointer', true);
    });
    window.addEventListener('pointercancel', function(e) {
        finishDrag(e.pointerId, 'pointer', false);
    });
    calendar.addEventListener('lostpointercapture', function(e) {
        if (!drag || drag.row !== e.target) {
            return;
        }

        finishDrag(e.pointerId, 'pointer', false);
    });

    calendar.addEventListener('touchstart', function(e) {
        const touch = e.changedTouches[0];
        const row = e.target.closest('.lm-schedule thead tr:not(.calendar-schedule-holiday-row)');

        if (!touch || e.touches.length !== 1) {
            return;
        }

        beginDrag(row, touch.identifier, touch.clientX, touch.clientY, 'touch');
    }, { passive: true });

    window.addEventListener('touchmove', function(e) {
        if (!drag || drag.inputType !== 'touch') {
            return;
        }

        const touch = Array.from(e.touches).find(function(candidate) {
            return candidate.identifier === drag.pointerId;
        });

        if (touch) {
            moveDrag(touch.identifier, 'touch', touch.clientX, touch.clientY, e);
        }
    }, { passive: false });

    window.addEventListener('touchend', function(e) {
        const touch = drag && drag.inputType === 'touch'
            ? Array.from(e.changedTouches).find(function(candidate) {
                return candidate.identifier === drag.pointerId;
            })
            : null;

        if (touch) {
            finishDrag(touch.identifier, 'touch', true);
        }
    });
    window.addEventListener('touchcancel', function(e) {
        const touch = drag && drag.inputType === 'touch'
            ? Array.from(e.changedTouches).find(function(candidate) {
                return candidate.identifier === drag.pointerId;
            })
            : null;

        if (touch) {
            finishDrag(touch.identifier, 'touch', false);
        }
    });
    window.addEventListener('blur', function() {
        finishDrag(null, null, false);
    });

    return navigateByArrow;
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
    calendar.querySelectorAll('.calendar-schedule-end-boundary-time').forEach(function(marker) {
        marker.remove();
    });

    calendar.querySelectorAll('.lm-schedule-index').forEach(function(label) {
        const time = label.dataset.scheduleTime || label.textContent;
        const minutes = getTimeMinutes(time);
        const isStartBoundary = minutes === getTimeMinutes(scheduleStart);
        const isEndBoundary = minutes === getTimeMinutes(scheduleEnd);

        label.dataset.scheduleTime = time;
        label.classList.toggle('calendar-schedule-boundary-time', isStartBoundary || isEndBoundary);

        if (isStartBoundary || isEndBoundary) {
            const icon = document.createElement('i');

            icon.className = 'fa-solid fa-bed';
            icon.setAttribute('aria-hidden', 'true');
            label.replaceChildren(icon);
            label.setAttribute('aria-label', isStartBoundary ? 'Wake up' : 'End of day');
            label.removeAttribute('aria-hidden');
            return;
        }

        label.textContent = formatScheduleHour(time);
        label.removeAttribute('aria-label');
        label.removeAttribute('aria-hidden');
    });

    const endDivision = (getTimeMinutes(scheduleEnd) / 15) - 1;
    const finalSlot = calendar.querySelector(`.lm-schedule tbody td[data-y="${endDivision}"]`);
    const finalRow = finalSlot ? finalSlot.closest('tr') : null;
    const gutter = finalRow && finalRow.cells.length ? finalRow.cells[0] : null;

    if (gutter) {
        const marker = document.createElement('span');
        const icon = document.createElement('i');

        marker.className = 'calendar-schedule-end-boundary-time';
        marker.setAttribute('aria-label', 'End of day');
        icon.className = 'fa-solid fa-bed';
        icon.setAttribute('aria-hidden', 'true');
        marker.appendChild(icon);
        gutter.appendChild(marker);
    }
};

const getTimeMinutes = function(value) {
    const match = String(value || '').match(/^(\d{1,2}):(\d{2})/);

    if (!match) {
        return 0;
    }

    return (Number(match[1]) * 60) + Number(match[2]);
};

const isEventInsideScheduleWindow = function(event) {
    if (event && event.allDay) {
        return true;
    }

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
    const events = getVisibleCalendarEvents().filter(function(event) {
        return !(event.allDay && event.externalProvider === 'google');
    });

    if (state.view !== '2-days' && !(state.view === 'week' && isValidDate(state.scheduleWindowStart))) {
        return events;
    }

    const visibleDateStrings = getVisibleScheduleDates().map(toDateString);
    const backingStart = state.view === '2-days'
        ? getTwoDaysBackingStart()
        : startOfWeek(state.scheduleWindowStart);

    return events
        .filter(isEventInsideVisibleRange)
        .map(function(event) {
            const visibleIndex = visibleDateStrings.indexOf(String(event.date || '').substring(0, 10));
            const backingDate = visibleIndex < 0 ? null : toDateString(addDays(backingStart, visibleIndex));

            if (!backingDate) {
                return null;
            }

            return Object.assign({}, event, {
                date: backingDate,
                scheduleSourceDate: event.date,
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

        if (event.lessonStatus === 'paid' || event.lessonStatus === 'early-payment') {
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

const getCalendarEventIcon = function(event) {
    if (!event) {
        return { name: '', title: '' };
    }

    return event.isGeneralEvent
        ? {
            name: event.eventTypeIcon || '',
            title: event.eventType || '',
            style: event.externalProvider === 'google' ? 'fa-brands' : 'fa-solid',
        }
        : {
            name: event.location && event.location.icon ? event.location.icon : '',
            title: event.locationName || '',
            style: 'fa-solid',
        };
};

const createCalendarEventIcon = function(event) {
    const icon = getCalendarEventIcon(event);

    if (!icon.name) {
        return null;
    }

    const element = document.createElement('span');

    element.className = 'event-icon';
    element.title = icon.title;
    element.innerHTML = `<i class="${icon.style} fa-${icon.name}" aria-hidden="true"></i>`;

    return element;
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
        const icon = getCalendarEventIcon(event);
        let hitArea = item.querySelector(':scope > .calendar-schedule-item-hit-area');
        let eventIcon = item.querySelector(':scope > .event-icon');

        if (!hitArea) {
            hitArea = document.createElement('span');
            hitArea.className = 'calendar-schedule-item-hit-area';
            hitArea.setAttribute('aria-hidden', 'true');
            item.appendChild(hitArea);
        }

        if (!icon.name) {
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
            eventIcon.querySelector('i').className = `${icon.style} fa-${icon.name}`;
            eventIcon.title = icon.title;
        }

        item.classList.toggle('is-short', isShort);
        item.classList.toggle('calendar-calendar-general-event', Boolean(event && event.isGeneralEvent));
        item.toggleAttribute('data-read-only', Boolean(event && event.readOnly));
        item.dataset.externalProvider = event && event.externalProvider ? event.externalProvider : '';
        item.dataset.responseStatus = event && event.responseStatus ? event.responseStatus : '';
        item.setAttribute(
            'data-display-time',
            event && event.externalProvider === 'google'
                ? 'from Google Calendar'
                : (isShort ? formatEventTime(start) : `${formatEventTime(start)} - ${formatEventTime(end)}`)
        );
        clearScheduleItemBirthdayDecoration(item);

        if (event) {
            item.setAttribute(
                'data-lesson-status',
                event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed')
            );
        }

        applyEventTimeStatusAttributes(item, event, visibleDate);
        applyEventOverlapAttribute(item, event);
        patchScheduleItemTravel(item, event);
        patchScheduleItemReturnHomeTravel(item, event);
    });
};

const animateCalendarLessonItems = function(calendar) {
    if (state.calendarRenderMode === 'discreet') {
        calendar.querySelectorAll('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event').forEach(function(item) {
            item.dataset.lessonStaggerShown = 'true';
        });
        return;
    }

    if (!scheduleGridViews.includes(state.view)
        || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
        return;
    }

    const nonLessonStatuses = ['holiday', 'teaching-break', 'recital'];
    const lessonItems = Array.from(calendar.querySelectorAll('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event')).filter(function(item) {
        return !nonLessonStatuses.includes(item.dataset.lessonStatus || '') && item.dataset.lessonStaggerShown !== 'true';
    });

    lessonItems.forEach(function(item, index) {
        item.dataset.lessonStaggerShown = 'true';
        item.style.setProperty('--calendar-lesson-show-delay', `${index * 30}ms`);
        item.classList.add('calendar-calendar-lesson-stagger-show');
        item.addEventListener('animationend', function() {
            item.classList.remove('calendar-calendar-lesson-stagger-show');
            item.style.removeProperty('--calendar-lesson-show-delay');
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
        return getHolidaysForDate(date).length > 0
            || getBreaksForDate(date).length > 0
            || getRecitalsForDate(date).length > 0
            || getAllDayGoogleEventsForDate(date).length > 0;
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
        const googleEvents = isVisible ? getAllDayGoogleEventsForDate(date) : [];

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

        googleEvents.forEach(function(event) {
            const item = document.createElement('button');

            item.type = 'button';
            item.className = 'calendar-schedule-holiday calendar-schedule-google-all-day';
            item.textContent = event.title || 'Google event';
            item.dataset.eventGuid = event.guid || '';
            item.dataset.externalProvider = 'google';
            item.dataset.responseStatus = event.responseStatus || '';
            item.dataset.lessonStatus = event.calendarStatus || 'general-event';
            item.toggleAttribute('data-read-only', Boolean(event.readOnly));
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
        if (item.event.scheduleSourceDate) {
            return Object.assign({}, item.event, {
                date: item.event.scheduleSourceDate,
            });
        }

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
        location: recital.location || null,
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
    const status = generalEvent.canceled_at ? 'canceled' : 'general-event';
    const allDay = Boolean(generalEvent.all_day);

    return {
        guid: `general-event-${generalEvent.id}-${dateString}`,
        isGeneralEvent: true,
        id: generalEvent.id,
        date: dateString,
        start: allDay ? '00:00' : normalizeTime(generalEvent.starts_at),
        end: allDay ? '23:45' : normalizeTime(generalEvent.ends_at),
        title: generalEvent.name || 'Event',
        eventType: generalEvent.event_type || '',
        eventTypeIcon: generalEvent.event_type_icon || '',
        notes: generalEvent.notes || '',
        address: generalEvent.address || '',
        city: generalEvent.city || '',
        state: generalEvent.state || '',
        postalCode: generalEvent.postal_code || '',
        travelMode: generalEvent.travel_mode || 'TRANSIT',
        notificationEnabled: Boolean(generalEvent.notification_enabled),
        notificationMinutesBefore: generalEvent.notification_minutes_before,
        editUrl: generalEvent.edit_url || '',
        notesUpdateUrl: generalEvent.notes_update_url || '',
        rescheduleUrl: generalEvent.reschedule_url || '',
        revertUrl: generalEvent.revert_url || '',
        externalProvider: generalEvent.external_provider || '',
        externalUrl: generalEvent.external_url || '',
        meetingUrl: generalEvent.meeting_url || '',
        responseStatus: generalEvent.response_status || '',
        organizerName: generalEvent.organizer_name || '',
        organizerEmail: generalEvent.organizer_email || '',
        location: generalEvent.location || '',
        allDay,
        readOnly: Boolean(generalEvent.read_only),
        calendarStatus: status,
        lessonStatus: status,
        'data-lesson-status': status,
    };
};

const getGeneralEventCalendarEvents = function() {
    return state.generalEvents
        .filter(function(generalEvent) {
            if (generalEvent.canceled_at) {
                return state.selectedEventTypes.includes('canceled');
            }

            const isGoogleEvent = generalEvent.external_provider === 'google';
            const eventType = isGoogleEvent ? 'google' : 'general';

            if (isGoogleEvent && !['accepted', 'needsAction'].includes(generalEvent.response_status)) {
                return false;
            }

            return state.selectedEventTypes.includes(eventType);
        })
        .filter(generalEventMatchesCalendarSearch)
        .map(getGeneralEvent);
};

const getAllDayGoogleEventsForDate = function(date) {
    const dateString = toDateString(date);

    return (getVisibleEventsByDate()[dateString] || []).filter(function(event) {
        return event.allDay && event.externalProvider === 'google';
    });
};

const getGeneralEventByGuid = function(guid) {
    const match = String(guid || '').match(/^general-event-(.+)-(\d{4}-\d{2}-\d{2})$/);

    if (!match) {
        return null;
    }

    const generalEvent = state.generalEvents.find(function(item) {
        return String(item.id) === match[1];
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

const resetLessonModalButtons = function(modal) {
    if (!modal) {
        return;
    }

    modal.querySelectorAll('button, input[type="submit"], input[type="image"]').forEach(function(button) {
        button.disabled = false;
        button.removeAttribute('aria-disabled');
        delete button.dataset.calendarDisabledOnSubmit;
        restoreButtonLabel(button);
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
    return fetchCalendarResource(url, options).then(function(response) {
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

    resetLessonModalButtons(modal);
    if (state.lessonActionAvailabilityTimer !== null) {
        window.clearTimeout(state.lessonActionAvailabilityTimer);
        state.lessonActionAvailabilityTimer = null;
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

const setCalendarEventModalType = function(modal, type) {
    if (!modal) {
        return;
    }

    if (type !== 'lesson' && state.lessonActionAvailabilityTimer !== null) {
        window.clearTimeout(state.lessonActionAvailabilityTimer);
        state.lessonActionAvailabilityTimer = null;
    }

    modal.dataset.eventModalType = type;
    modal.querySelectorAll('[data-event-modal-section]').forEach(function(section) {
        section.hidden = section.dataset.eventModalSection !== type;
    });
};

const setCalendarEventModalExpandAvailable = function(modal, available) {
    if (!modal) {
        return;
    }

    modal.dataset.eventModalExpandAvailable = available ? 'true' : 'false';
};

const setCalendarEventModalExpanded = function(modal, expanded) {
    if (!modal) {
        return;
    }

    const isExpanded = Boolean(expanded);
    const toggle = modal.querySelector('[data-event-modal-expand-toggle]');
    const toggleContainer = modal.querySelector('[data-event-modal-expand-toggle-container]');

    modal.dataset.eventModalExpanded = isExpanded ? 'true' : 'false';

    if (toggle) {
        toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }

    if (toggleContainer) {
        toggleContainer.hidden = isExpanded
            || modal.dataset.eventModalExpandAvailable === 'false';
    }
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

const getEventEndDateTime = function(event) {
    if (!event || !event.date || !event.end) {
        return null;
    }

    const dateParts = String(event.date).substring(0, 10).split('-').map(Number);
    const timeParts = normalizeTime(event.end).split(':').map(Number);
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

const hasCalendarEventEnded = function(event) {
    if (!event) {
        return false;
    }

    if (event.allDay) {
        return Boolean(event.date) && String(event.date).substring(0, 10) < todayString();
    }

    const endsAt = getEventEndDateTime(event) || getEventStartDateTime(event);

    return endsAt ? endsAt <= new Date() : false;
};

const updateLessonScheduleControls = function(modal, event) {
    const cancelLesson = modal.querySelector('#cancel-lesson-button');
    const rescheduleLesson = modal.querySelector('#reschedule-lesson-button');
    const controls = modal.querySelector('#lesson-schedule-controls');
    const hasLessonSource = !!(event && (event.lessonPlanId || event.singleLessonPlanId));
    const isConfirmed = Boolean(event && ['paid', 'unpaid'].includes(event.lessonStatus));
    const isCanceled = Boolean(event && event.lessonStatus === 'canceled');
    const canCancel = hasLessonSource && !isConfirmed;
    const canReschedule = hasLessonSource && !isConfirmed && !hasCalendarEventEnded(event);

    if (cancelLesson) {
        preserveButtonLabel(cancelLesson);
        cancelLesson.disabled = !canCancel || isCanceled;
        cancelLesson.style.display = canCancel ? '' : 'none';
        restoreButtonLabel(cancelLesson);
    }

    if (rescheduleLesson) {
        rescheduleLesson.disabled = !canReschedule;
        rescheduleLesson.style.display = canReschedule ? '' : 'none';
    }

    if (controls) {
        if (!canCancel && !canReschedule) {
            controls.style.setProperty('display', 'none', 'important');
        } else {
            controls.style.removeProperty('display');
        }
    }
};

const canUseLessonActionButtons = function(event) {
    const startsAt = getEventStartDateTime(event);

    return startsAt ? startsAt <= new Date() : false;
};

const updateLessonTimeDependentControls = function(modal, event) {
    const taught = modal.querySelector('#lesson-taught');
    const confirmPayment = modal.querySelector('#confirm-payment');
    const earlyPayment = modal.querySelector('#early-payment');
    const hasLessonSource = !!(event && (event.lessonPlanId || event.singleLessonPlanId));
    const canUseActions = canUseLessonActionButtons(event);

    if (taught) {
        preserveButtonLabel(taught);
        taught.disabled = !event || !hasLessonSource;
        taught.style.display = canUseActions ? '' : 'none';
        restoreButtonLabel(taught);
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
        earlyPayment.style.display = event && !event.paymentExempt && !canUseActions && event.lessonStatus === 'unconfirmed' ? '' : 'none';
        restoreButtonLabel(earlyPayment);
    }
};

const scheduleLessonActionAvailability = function(modal, event) {
    if (state.lessonActionAvailabilityTimer !== null) {
        window.clearTimeout(state.lessonActionAvailabilityTimer);
        state.lessonActionAvailabilityTimer = null;
    }

    const startsAt = getEventStartDateTime(event);
    const delay = startsAt ? startsAt.getTime() - Date.now() : 0;

    if (delay <= 0) {
        return;
    }

    state.lessonActionAvailabilityTimer = window.setTimeout(function() {
        state.lessonActionAvailabilityTimer = null;

        if (modal.dataset.eventModalType === 'lesson'
            && modal.dataset.eventGuid === String(event.guid || '')) {
            updateLessonTimeDependentControls(modal, event);

            if (!canUseLessonActionButtons(event)) {
                scheduleLessonActionAvailability(modal, event);
            }
        }
    }, Math.min(delay + 25, 2147483647));
};

const populateLessonModal = function(modal, event) {
    const title = modal.querySelector('.modal-title');
    const date = modal.querySelector('[data-event-modal-date]');
    const time = modal.querySelector('[data-event-modal-time]');
    const recurrence = modal.querySelector('#lesson-recurrence');
    const birthday = modal.querySelector('#lesson-birthday');
    const birthdayLabel = birthday ? birthday.querySelector('[data-lesson-birthday-label]') : null;
    const lessonLocation = modal.querySelector('[data-event-modal-location-section]');
    const lessonLocationContent = lessonLocation ? lessonLocation.querySelector('[data-event-modal-location]') : null;
    const lessonLocationIcon = lessonLocation ? lessonLocation.querySelector('[data-event-modal-location-icon]') : null;
    const meetingUrl = modal.querySelector('[data-event-modal-meeting-section]');
    const meetingUrlLink = meetingUrl ? meetingUrl.querySelector('[data-event-modal-meeting-link]') : null;
    const notesUrl = modal.querySelector('#notes-url');
    const notesUrlLink = notesUrl ? notesUrl.querySelector('a') : null;
    const revert = modal.querySelector('#lesson-revert');
    const edit = modal.querySelector('#lesson-edit');
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
        if (recurrence.parentElement) {
            recurrence.parentElement.hidden = !recurrence.textContent;
        }
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

    if (lessonLocation && lessonLocationContent) {
        const hasLocation = !isHomeCalendarLocation(event && event.location) && renderEventLocation(
            lessonLocationContent,
            lessonLocationIcon,
            event && event.location
        );

        lessonLocation.hidden = !hasLocation;
    }

    if (meetingUrl && meetingUrlLink) {
        if (event && event.meetingUrl) {
            meetingUrl.hidden = false;
            meetingUrlLink.href = event.meetingUrl;
        } else {
            meetingUrl.hidden = true;
            meetingUrlLink.removeAttribute('href');
        }
    }

    if (notesUrl && notesUrlLink) {
        if (event && event.notesUrl) {
            notesUrl.style.display = 'grid';
            notesUrlLink.href = event.notesUrl;
        } else {
            notesUrl.style.display = 'none';
            notesUrlLink.removeAttribute('href');
        }
    }

    if (revert) {
        const hasPendingVisualDrop = Boolean(
            modal.updatedScheduleItem
            && modal.updatedScheduleItem.hasAttribute('updated-event')
            && modal.updatedScheduleItem.scheduleOriginalPosition
        );
        const canRevert = !!(event && (
            event.scheduleOverrideId
            || event.lessonId
            || event.earlyPaymentId
        )) || hasPendingVisualDrop;

        revert.toggleAttribute('data-pending-visual-drop', hasPendingVisualDrop);
        revert.style.display = canRevert ? 'inline-flex' : 'none';
        revert.disabled = !canRevert;
    }

    if (edit) {
        edit.dataset.url = event && event.calendarEditUrl ? event.calendarEditUrl : '';
        edit.style.display = edit.dataset.url ? 'inline-flex' : 'none';
        edit.disabled = !edit.dataset.url;
    }

    updateLessonScheduleControls(modal, event);

    updateLessonTimeDependentControls(modal, event);

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
    modal.dataset.paymentExempt = event && event.paymentExempt ? 'true' : 'false';
};

const openLessonModal = function(event, options) {
    const modal = document.getElementById('calendar-event-modal');
    const settings = options || {};

    if (!modal) {
        return;
    }

    setCalendarEventModalType(modal, 'lesson');
    resetLessonModalState(modal);
    setCalendarEventModalExpandAvailable(modal, true);
    setCalendarEventModalExpanded(modal, Boolean(settings.openReschedule));
    modal.updatedScheduleItem = settings.updatedItem || null;
    populateLessonModal(modal, event);

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

    scheduleLessonActionAvailability(modal, event);
    updateConflictToggle(modal, event);

    loadTravelRoute(modal, event, settings.scheduleItem || modal.updatedScheduleItem);

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

const openRecitalModal = function(event, options) {
    const modal = document.getElementById('recital-modal');
    const settings = options || {};

    if (!modal || !event) {
        return;
    }

    const title = modal.querySelector('.modal-title');
    const date = modal.querySelector('#recital-date');
    const time = modal.querySelector('#recital-time');
    const location = modal.querySelector('#recital-location');
    const participants = modal.querySelector('#recital-participants');
    const students = Array.isArray(event.students) ? event.students : [];

    if (title) title.textContent = event.title || 'Recital';
    if (date) date.textContent = event.date ? modalDateFormatter.format(parseDateString(event.date)) : '';
    if (time) time.textContent = formatModalEventTime(event.start);
    if (location) {
        const locationName = event.location && event.location.name ? event.location.name : 'No location specified';
        const address = event.location && event.location.address ? event.location.address : '';
        const mapUrl = event.location && event.location.map_url ? event.location.map_url : '';

        location.innerHTML = '';

        if (mapUrl) {
            const link = document.createElement('a');
            link.href = mapUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = locationName;
            location.appendChild(link);
        } else {
            location.appendChild(document.createTextNode(locationName));
        }

        if (address) {
            location.appendChild(document.createTextNode(` · ${address}`));
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

    loadTravelRoute(modal, event, settings.scheduleItem);

    if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
        window.bootstrap.Modal.getOrCreateInstance(modal).show();
        return;
    }

    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
        window.jQuery(modal).modal('show');
    }
};

const appendTextWithLinks = function(element, text, options) {
    const settings = options || {};
    const urlPattern = /(?:https?:\/\/|www\.)[^\s]+/gi;
    let cursor = 0;
    let match;

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
        link.textContent = settings.labelZoomLinks && isZoomUrl(link.href) ? 'Join the meeting' : url;
        element.appendChild(link);

        if (trailing) {
            element.appendChild(document.createTextNode(trailing));
        }

        cursor = match.index + rawUrl.length;
    }

    element.appendChild(document.createTextNode(text.slice(cursor)));
};

const isZoomUrl = function(value) {
    try {
        const hostname = new URL(value, window.location.origin).hostname.toLowerCase();

        return hostname === 'zoom.us' || hostname.endsWith('.zoom.us');
    } catch (error) {
        return false;
    }
};

const normalizeHttpUrl = function(value) {
    const text = String(value || '').trim();

    if (!text || /\s/.test(text)) {
        return '';
    }

    try {
        const url = new URL(/^www\./i.test(text) ? `https://${text}` : text);

        return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch (error) {
        return '';
    }
};

const compactPhysicalLocation = function(location) {
    if (location && typeof location === 'object') {
        const address = String(location.address || '').trim();
        const city = String(location.city || '').trim();

        return [address, city].filter(Boolean).join(', ')
            || String(location.name || '').trim();
    }

    const text = String(location || '').replace(/\s*\n+\s*/g, ', ').trim();
    const parts = text.split(',').map(function(part) {
        return part.trim();
    }).filter(Boolean);

    if (parts.length < 2) {
        return text;
    }

    const streetIndex = parts.findIndex(function(part) {
        return /^\d+[A-Za-z]?(?:[-\s]|$)/.test(part);
    });

    if (streetIndex >= 0 && parts[streetIndex + 1]) {
        return `${parts[streetIndex]}, ${parts[streetIndex + 1]}`;
    }

    return parts.slice(0, 2).join(', ');
};

const physicalLocationQuery = function(location) {
    if (location && typeof location === 'object') {
        return [
            location.address,
            location.city,
            location.state,
            location.postal_code,
        ].map(function(part) {
            return String(part || '').trim();
        }).filter(Boolean).join(', ') || String(location.name || '').trim();
    }

    return String(location || '').trim();
};

const travelLocationLabel = function(location) {
    if (location && typeof location === 'object') {
        return String(location.name || '').trim()
            || compactPhysicalLocation(location);
    }

    return compactPhysicalLocation(location);
};

const locationValue = function(location) {
    if (!location || typeof location !== 'object') {
        return String(location || '').trim();
    }

    return String(location.address || location.name || physicalLocationQuery(location)).trim();
};

const normalizeLocationIdentity = function(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
};

const isHomeCalendarLocation = function(location) {
    const home = window.calendarHomeLocation;

    if (!location || !home) {
        return false;
    }

    const homeAddress = normalizeLocationIdentity(home.address);
    const homeValues = [
        home.address,
        home.name,
        physicalLocationQuery(home),
    ].map(normalizeLocationIdentity).filter(Boolean);
    const locationValues = location && typeof location === 'object'
        ? [location.address, location.name, physicalLocationQuery(location)]
        : [location];

    return locationValues
        .map(normalizeLocationIdentity)
        .filter(Boolean)
        .some(function(value) {
            return homeValues.includes(value)
                || (homeAddress && value.startsWith(homeAddress));
        });
};

const isVirtualLocation = function(value) {
    return /^(?:online|virtual|remote|zoom|google meet|meet)$/i.test(String(value || '').trim());
};

const setLocationIcon = function(icon, useVideoIcon) {
    if (!icon) {
        return;
    }

    icon.classList.remove('fa-location-dot', 'fa-video');
    icon.classList.add(useVideoIcon ? 'fa-video' : 'fa-location-dot');
};

const renderEventLocation = function(element, icon, location) {
    const value = locationValue(location);
    const query = physicalLocationQuery(location);
    const url = normalizeHttpUrl(value);
    const virtual = isVirtualLocation(value);

    element.innerHTML = '';

    if (!value) {
        return false;
    }

    if (url) {
        const link = document.createElement('a');

        setLocationIcon(icon, true);
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Join the meeting';
        element.appendChild(link);

        return true;
    }

    if (virtual) {
        setLocationIcon(icon, true);
        element.textContent = value;

        return true;
    }

    const link = document.createElement('a');

    setLocationIcon(icon, false);
    link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = compactPhysicalLocation(location);
    element.appendChild(link);

    return true;
};

const getTravelDestination = function(event) {
    if (!event) {
        return null;
    }

    if (!event.location && event.meetingUrl) {
        const home = window.calendarHomeLocation;

        return home ? {
            address: physicalLocationQuery(home),
            label: travelLocationLabel(home) || 'Home',
        } : null;
    }

    if (!event.location) {
        return null;
    }

    const value = locationValue(event.location);

    if (normalizeHttpUrl(value) || isVirtualLocation(value)) {
        const home = window.calendarHomeLocation;

        if (!home) {
            return null;
        }

        return {
            address: physicalLocationQuery(home),
            label: travelLocationLabel(home) || 'Home',
        };
    }

    const address = physicalLocationQuery(event.location);

    return address ? {
        address,
        label: travelLocationLabel(event.location) || address,
    } : null;
};

const getTravelRouteRequestDetails = function(event) {
    const destination = getTravelDestination(event);
    const startAt = getEventStartDateTime(event);
    const isCanceled = event && (event.calendarStatus === 'canceled' || event.lessonStatus === 'canceled');

    if (!window.calendarShowTravelTimes
        || !window.calendarTravelRoutesEnabled
        || !window.calendarTravelRouteUrl
        || !event
        || !destination
        || !startAt
        || event.allDay
        || isCanceled
        || startAt <= new Date()) {
        return null;
    }

    const eventKey = event.guid || String(event.id || '');
    const arrivalDate = new Date(startAt.getTime() - (travelArrivalBufferMinutes * 60 * 1000));
    const arrivalTime = [
        String(arrivalDate.getHours()).padStart(2, '0'),
        String(arrivalDate.getMinutes()).padStart(2, '0'),
        '00',
    ].join(':');
    const arrivalAt = `${toDateString(arrivalDate)}T${arrivalTime}`;
    const cacheKey = [
        state.calendarFetchId,
        eventKey,
        arrivalAt,
        destination.address,
        destination.label,
        event.travelMode || 'TRANSIT',
    ].join('|');

    return {
        cacheKey,
        payload: {
            event_key: eventKey,
            arrival_at: arrivalAt,
            destination_address: destination.address,
            destination_label: destination.label,
            travel_mode: event.travelMode || 'TRANSIT',
        },
    };
};

const hasSupportedTravelMode = function(route) {
    return Boolean(route)
        && ['TRANSIT', 'WALK', 'DRIVE'].includes(String(route.mode || '').toUpperCase());
};

const requestTravelRouteForEvent = function(event, details) {
    const requestDetails = details || getTravelRouteRequestDetails(event);

    if (!requestDetails) {
        return Promise.resolve(null);
    }

    const cached = state.travelRouteCache.get(requestDetails.cacheKey);

    if (cached && Date.now() - cached.fetchedAt < 10 * 60 * 1000) {
        return Promise.resolve(cached.route);
    }

    if (state.travelRouteRequests.has(requestDetails.cacheKey)) {
        return state.travelRouteRequests.get(requestDetails.cacheKey);
    }

    const request = requestJson(requestDetails.url || window.calendarTravelRouteUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(requestDetails.payload),
    }, 'Unable to calculate travel time.')
        .then(function(payload) {
            const route = payload.route
                && Number(payload.route.duration_seconds || 0) > 0
                && hasSupportedTravelMode(payload.route)
                ? payload.route
                : null;

            state.travelRouteCache.set(requestDetails.cacheKey, {
                fetchedAt: Date.now(),
                route,
            });

            return route;
        })
        .finally(function() {
            state.travelRouteRequests.delete(requestDetails.cacheKey);
        });

    state.travelRouteRequests.set(requestDetails.cacheKey, request);

    return request;
};

const getScheduleTravelOwnerGuid = function(event) {
    return String((event && (event.guid || event.id)) || '');
};

const updateScheduleItemTravelClasses = function(item) {
    if (!item) {
        return;
    }

    const hasBefore = Boolean(item.querySelector(':scope > .calendar-schedule-travel[data-travel-position="before"]'));
    const hasAfter = Boolean(item.querySelector(':scope > .calendar-schedule-travel[data-travel-position="after"]'));

    item.classList.toggle('has-calendar-schedule-travel', hasBefore || hasAfter);
    item.classList.toggle('has-calendar-schedule-travel-before', hasBefore);
    item.classList.toggle('has-calendar-schedule-travel-after', hasAfter);
};

const getScheduleTravelConflictPairs = function(schedule) {
    if (!schedule) {
        return [];
    }

    const items = Array.from(schedule.querySelectorAll('.lm-schedule-item:not([holding-event])'));
    const pairs = [];

    schedule.querySelectorAll('.calendar-schedule-travel').forEach(function(extension) {
        const owner = extension.parentElement;
        const ownerEvent = getEventByScheduleItem(owner);
        const ownerCell = owner ? owner.closest('td[data-date]') : null;
        const ownerDate = ownerCell
            ? (ownerCell.getAttribute('data-real-date') || ownerCell.getAttribute('data-date'))
            : '';
        const duration = Number(extension.dataset.travelDurationMinutes || 0);

        if (!owner || !ownerEvent || !ownerDate || duration <= 0) {
            return;
        }

        const ownerStart = getTimeMinutes(ownerEvent.start);
        const ownerEnd = getTimeMinutes(ownerEvent.end);
        const travelStart = extension.dataset.travelPosition === 'after'
            ? ownerEnd
            : ownerStart - duration;
        const travelEnd = extension.dataset.travelPosition === 'after'
            ? ownerEnd + duration
            : ownerStart;

        items.forEach(function(item) {
            if (item === owner || item.hasAttribute('data-pending-event-copy')) {
                return;
            }

            const event = getEventByScheduleItem(item);
            const cell = item.closest('td[data-date]');
            const date = cell
                ? (cell.getAttribute('data-real-date') || cell.getAttribute('data-date'))
                : '';

            if (!event
                || isCanceledCalendarEvent(event)
                || event.allDay
                || date !== ownerDate
                || getTimeMinutes(event.start) >= travelEnd
                || getTimeMinutes(event.end) <= travelStart) {
                return;
            }

            pairs.push({
                owner,
                ownerEvent,
                item,
                event,
            });
        });
    });

    return pairs;
};

const updateScheduleTravelOverlapLayers = function(schedule) {
    if (!schedule) {
        return;
    }

    const items = Array.from(schedule.querySelectorAll('.lm-schedule-item:not([holding-event])'));

    items.forEach(function(item) {
        item.removeAttribute('travel-overlapping-event');
        item.removeAttribute('travel-conflicting-event');
        item.style.removeProperty('--calendar-travel-overlap-z-index');
    });

    getScheduleTravelConflictPairs(schedule).forEach(function(pair) {
        if (isIgnoredConflictPair(pair.ownerEvent, pair.event)) {
            return;
        }

        const eventDuration = Math.max(
            1,
            getTimeMinutes(pair.event.end) - getTimeMinutes(pair.event.start)
        );

        pair.owner.setAttribute('travel-conflicting-event', '');
        pair.item.setAttribute('travel-conflicting-event', '');
        pair.item.setAttribute('travel-overlapping-event', '');
        pair.item.style.setProperty(
            '--calendar-travel-overlap-z-index',
            String(5000 - Math.min(eventDuration, 1440))
        );
    });

    const modal = document.getElementById('calendar-event-modal');
    const modalEvent = modal && modal.classList.contains('show')
        ? getEventByGuid(modal.dataset.eventGuid)
        : null;

    if (modalEvent) {
        updateConflictToggle(modal, modalEvent);
    }
};

const removeScheduleTravelExtension = function(extension) {
    if (!extension) {
        return;
    }

    const item = extension.parentElement;
    const animation = state.scheduleTravelAnimations.get(extension);

    if (animation) {
        animation.stop();
        state.scheduleTravelAnimations.delete(extension);
    }

    extension.remove();
    updateScheduleItemTravelClasses(item);
    updateScheduleTravelOverlapLayers(item ? item.closest('.lm-schedule') : null);
};

const clearScheduleItemTravel = function(item, event, options) {
    if (!item) {
        return;
    }

    const ownerGuid = getScheduleTravelOwnerGuid(event || item.event);
    const schedule = item.closest('.lm-schedule');

    if (schedule && ownerGuid) {
        schedule.querySelectorAll('.calendar-schedule-travel').forEach(function(extension) {
            if (extension.dataset.travelEventGuid === ownerGuid) {
                removeScheduleTravelExtension(extension);
            }
        });
    } else {
        item.querySelectorAll(':scope > .calendar-schedule-travel').forEach(removeScheduleTravelExtension);
    }

    if (!(options && options.preserveItemState)) {
        delete item.dataset.travelRouteKey;
        delete item.dataset.travelRouteState;
    }
};

const normalizeTravelPlace = function(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
};

const isHomeTravelPlace = function(value) {
    const home = window.calendarHomeLocation;
    const normalized = normalizeTravelPlace(value);

    if (!normalized || !home) {
        return false;
    }

    return normalized === 'home'
        || normalized === normalizeTravelPlace(travelLocationLabel(home))
        || normalized === normalizeTravelPlace(physicalLocationQuery(home));
};

const findPreviousScheduleItem = function(item, event, route) {
    const schedule = item ? item.closest('.lm-schedule') : null;
    const cell = item ? item.closest('td[data-date]') : null;

    if (!schedule || !cell || !event) {
        return null;
    }

    const visibleDate = cell.getAttribute('data-real-date') || cell.getAttribute('data-date') || event.date;
    const currentStart = getTimeMinutes(event.start);
    const originEndsAt = route && route.origin_ends_at ? new Date(route.origin_ends_at) : null;
    const originEndMinutes = originEndsAt && !Number.isNaN(originEndsAt.getTime())
        ? (originEndsAt.getHours() * 60) + originEndsAt.getMinutes()
        : null;
    const candidates = Array.from(schedule.querySelectorAll('.lm-schedule-item:not([holding-event])'))
        .filter(function(candidate) {
            if (candidate === item || candidate.hasAttribute('data-pending-event-copy')) {
                return false;
            }

            const candidateEvent = getEventByScheduleItem(candidate);
            const candidateCell = candidate.closest('td[data-date]');
            const candidateDate = candidateCell
                ? (candidateCell.getAttribute('data-real-date') || candidateCell.getAttribute('data-date'))
                : '';
            const candidateEnd = candidateEvent ? getTimeMinutes(candidateEvent.end) : -1;

            return candidateEvent
                && !isCanceledCalendarEvent(candidateEvent)
                && !candidateEvent.allDay
                && candidateDate === visibleDate
                && candidateEnd <= currentStart;
        })
        .sort(function(a, b) {
            return getTimeMinutes(getEventByScheduleItem(b).end)
                - getTimeMinutes(getEventByScheduleItem(a).end);
        });

    if (originEndMinutes !== null) {
        const exactOrigin = candidates.find(function(candidate) {
            return getTimeMinutes(getEventByScheduleItem(candidate).end) === originEndMinutes;
        });

        if (exactOrigin) {
            return exactOrigin;
        }
    }

    return candidates[0] || null;
};

const getScheduleTravelPlacement = function(item, event, route) {
    if ((route && route.origin_is_home) || isHomeTravelPlace(route && route.origin)) {
        return {
            item,
            position: 'before',
        };
    }

    const previousItem = findPreviousScheduleItem(item, event, route);

    return previousItem
        ? { item: previousItem, position: 'after' }
        : { item, position: 'before' };
};

const isLastScheduleItemOfDay = function(item, event) {
    const schedule = item ? item.closest('.lm-schedule') : null;
    const cell = item ? item.closest('td[data-date]') : null;

    if (!schedule || !cell || !event) {
        return false;
    }

    const visibleDate = cell.getAttribute('data-real-date') || cell.getAttribute('data-date') || event.date;
    const candidates = Array.from(schedule.querySelectorAll('.lm-schedule-item:not([holding-event])'))
        .filter(function(candidate) {
            if (candidate.hasAttribute('data-pending-event-copy')) {
                return false;
            }

            const candidateEvent = getEventByScheduleItem(candidate);
            const candidateCell = candidate.closest('td[data-date]');
            const candidateDate = candidateCell
                ? (candidateCell.getAttribute('data-real-date') || candidateCell.getAttribute('data-date'))
                : '';

            return candidateEvent
                && !isCanceledCalendarEvent(candidateEvent)
                && !candidateEvent.allDay
                && candidateDate === visibleDate;
        })
        .sort(function(a, b) {
            const eventA = getEventByScheduleItem(a);
            const eventB = getEventByScheduleItem(b);
            const endDifference = getTimeMinutes(eventA.end) - getTimeMinutes(eventB.end);

            return endDifference || (getTimeMinutes(eventA.start) - getTimeMinutes(eventB.start));
        });

    return candidates[candidates.length - 1] === item;
};

const getReturnHomeOwnerEvent = function(event) {
    return Object.assign({}, event, {
        guid: `return-home:${getScheduleTravelOwnerGuid(event)}`,
    });
};

const clearScheduleItemReturnHomeTravel = function(item, event) {
    if (!item || !event) {
        return;
    }

    clearScheduleItemTravel(item, getReturnHomeOwnerEvent(event), {
        preserveItemState: true,
    });
    delete item.dataset.returnHomeTravelRouteKey;
    delete item.dataset.returnHomeTravelRouteState;
};

const getReturnHomeTravelRouteRequestDetails = function(item, event) {
    const origin = getTravelDestination(event);
    const home = window.calendarHomeLocation;
    const homeAddress = physicalLocationQuery(home);
    const endsAt = getEventEndDateTime(event);
    const isCanceled = event && (event.calendarStatus === 'canceled' || event.lessonStatus === 'canceled');

    if (!window.calendarShowTravelTimes
        || !window.calendarTravelRoutesEnabled
        || !window.calendarReturnHomeTravelRouteUrl
        || !event
        || !origin
        || !homeAddress
        || !endsAt
        || event.allDay
        || isCanceled
        || endsAt <= new Date()
        || isHomeTravelPlace(origin.address)
        || isHomeTravelPlace(origin.label)
        || !isLastScheduleItemOfDay(item, event)) {
        return null;
    }

    const eventKey = getScheduleTravelOwnerGuid(event);
    const departureTime = [
        String(endsAt.getHours()).padStart(2, '0'),
        String(endsAt.getMinutes()).padStart(2, '0'),
        '00',
    ].join(':');
    const departureAt = `${toDateString(endsAt)}T${departureTime}`;
    const cacheKey = [
        state.calendarFetchId,
        'return-home',
        eventKey,
        departureAt,
        origin.address,
        homeAddress,
        event.travelMode || 'TRANSIT',
    ].join('|');

    return {
        cacheKey,
        url: window.calendarReturnHomeTravelRouteUrl,
        payload: {
            event_key: eventKey,
            departure_at: departureAt,
            origin_address: origin.address,
            origin_label: origin.label,
            travel_mode: event.travelMode || 'TRANSIT',
        },
    };
};

const getScheduleTravelRoutePriority = function(route) {
    if (!route) {
        return 0;
    }

    if (route.return_home) {
        return 3;
    }

    return isHomeTravelPlace(route.destination) ? 2 : 1;
};

const getScheduleTravelExtensionRoute = function(extension) {
    if (!extension) {
        return null;
    }

    if (extension.travelRoute) {
        return extension.travelRoute;
    }

    try {
        return JSON.parse(extension.dataset.travelRoute || '');
    } catch (error) {
        return null;
    }
};

const renderScheduleItemTravel = function(item, event, route, cacheKey, options) {
    if (!item || !route || Number(route.duration_seconds || 0) <= 0 || !hasSupportedTravelMode(route)) {
        clearScheduleItemTravel(item, event);
        return;
    }

    const placement = options && options.placement
        ? options.placement
        : getScheduleTravelPlacement(item, event, route);
    const targetItem = placement.item;
    const durationMinutes = Math.max(1, Math.round(Number(route.duration_seconds) / 60));
    const roundedMinutes = Math.max(15, Math.round(durationMinutes / 15) * 15);
    const row = targetItem.closest('tr');
    const rowHeight = row ? row.getBoundingClientRect().height : 15;
    const extensionHeight = Math.max(15, (rowHeight || 15) * (roundedMinutes / 15));
    const extension = document.createElement('div');
    const icon = document.createElement('i');
    const label = document.createElement('span');
    const travelMode = String(route.mode || '').toUpperCase();
    const travelIcon = travelMode === 'TRANSIT'
        ? 'fa-train-subway'
        : (travelMode === 'DRIVE' ? 'fa-car' : 'fa-person-walking');

    clearScheduleItemTravel(item, event, {
        preserveItemState: Boolean(options && options.preserveItemState),
    });

    const competingExtensions = Array.from(
        targetItem.querySelectorAll(`:scope > .calendar-schedule-travel[data-travel-position="${placement.position}"]`)
    );
    const strongestCompetingPriority = competingExtensions.reduce(function(priority, competingExtension) {
        return Math.max(
            priority,
            getScheduleTravelRoutePriority(getScheduleTravelExtensionRoute(competingExtension))
        );
    }, 0);

    if (strongestCompetingPriority >= getScheduleTravelRoutePriority(route)) {
        if (!(options && options.preserveItemState)) {
            item.dataset.travelRouteKey = cacheKey;
            item.dataset.travelRouteState = 'shown';
        }

        return;
    }

    competingExtensions.forEach(removeScheduleTravelExtension);

    extension.className = 'calendar-schedule-travel';
    extension.style.height = '0';
    extension.style.minHeight = '0';
    extension.style.opacity = '0';
    extension.style.transform = placement.position === 'after' ? 'translateY(-6px)' : 'translateY(6px)';
    extension.style.setProperty(
        '--calendar-schedule-event-color',
        window.getComputedStyle(targetItem).backgroundColor || '#6b7280'
    );
    extension.dataset.travelMode = travelMode.toLowerCase();
    extension.dataset.travelPosition = placement.position;
    extension.dataset.travelDurationMinutes = String(roundedMinutes);
    extension.dataset.travelEventGuid = getScheduleTravelOwnerGuid(event);
    extension.dataset.travelRoute = JSON.stringify(route);
    extension.travelRoute = route;
    extension.title = `${route.origin} to ${route.destination}: ${durationMinutes} min travel time`;
    extension.setAttribute('aria-hidden', 'true');
    icon.className = `fas ${travelIcon}`;
    label.textContent = `${durationMinutes} min travel time`;
    extension.appendChild(icon);
    extension.appendChild(label);
    targetItem.appendChild(extension);
    updateScheduleItemTravelClasses(targetItem);
    updateScheduleTravelOverlapLayers(targetItem.closest('.lm-schedule'));
    if (!(options && options.preserveItemState)) {
        item.dataset.travelRouteKey = cacheKey;
        item.dataset.travelRouteState = 'shown';
    }

    if (state.calendarRenderMode === 'discreet'
        || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        extension.style.height = `${extensionHeight}px`;
        extension.style.minHeight = '';
        extension.style.opacity = '.7';
        extension.style.transform = 'none';
        return;
    }

    const animation = animate(extension, {
        height: `${extensionHeight}px`,
        opacity: 0.7,
        transform: 'translateY(0)',
    }, {
        type: spring,
        stiffness: 240,
        damping: 15,
        mass: 0.7,
        delay: 0.3,
    });

    state.scheduleTravelAnimations.set(extension, animation);
};

const patchScheduleItemReturnHomeTravel = function(item, event) {
    const details = getReturnHomeTravelRouteRequestDetails(item, event);

    if (!details) {
        clearScheduleItemReturnHomeTravel(item, event);
        return;
    }

    if (item.dataset.returnHomeTravelRouteKey === details.cacheKey
        && ['loading', 'shown', 'none'].includes(item.dataset.returnHomeTravelRouteState)) {
        return;
    }

    clearScheduleItemReturnHomeTravel(item, event);
    item.dataset.returnHomeTravelRouteKey = details.cacheKey;
    item.dataset.returnHomeTravelRouteState = 'loading';

    requestTravelRouteForEvent(event, details)
        .then(function(route) {
            if (!item.isConnected || item.dataset.returnHomeTravelRouteKey !== details.cacheKey) {
                return;
            }

            if (!route) {
                item.dataset.returnHomeTravelRouteState = 'none';
                return;
            }

            renderScheduleItemTravel(
                item,
                getReturnHomeOwnerEvent(event),
                route,
                details.cacheKey,
                {
                    placement: { item, position: 'after' },
                    preserveItemState: true,
                }
            );
            item.dataset.returnHomeTravelRouteState = 'shown';
        })
        .catch(function(error) {
            if (item.isConnected && item.dataset.returnHomeTravelRouteKey === details.cacheKey) {
                item.dataset.returnHomeTravelRouteState = 'none';
            }

            console.error(error);
        });
};

const patchScheduleItemTravel = function(item, event) {
    const details = getTravelRouteRequestDetails(event);

    if (!details) {
        clearScheduleItemTravel(item, event);
        return;
    }

    if (item.dataset.travelRouteKey === details.cacheKey
        && ['loading', 'shown', 'none'].includes(item.dataset.travelRouteState)) {
        return;
    }

    clearScheduleItemTravel(item, event);
    item.dataset.travelRouteKey = details.cacheKey;
    item.dataset.travelRouteState = 'loading';

    requestTravelRouteForEvent(event, details)
        .then(function(route) {
            if (!item.isConnected || item.dataset.travelRouteKey !== details.cacheKey) {
                return;
            }

            if (!route) {
                item.dataset.travelRouteState = 'none';
                return;
            }

            renderScheduleItemTravel(item, event, route, details.cacheKey);
        })
        .catch(function(error) {
            if (item.isConnected && item.dataset.travelRouteKey === details.cacheKey) {
                item.dataset.travelRouteState = 'none';
            }

            console.error(error);
        });
};

const resetTravelRoute = function(modal) {
    const section = modal ? modal.querySelector('[data-travel-route]:not([data-travel-route-generated])') : null;

    if (!section) {
        return;
    }

    modal.dataset.travelRouteRequest = '';
    modal.querySelectorAll('[data-travel-route-generated]').forEach(function(generatedSection) {
        generatedSection.remove();
    });
    section.hidden = true;
    section.querySelector('[data-travel-route-loading]').hidden = false;
    section.querySelector('[data-travel-route-content]').hidden = true;
};

const travelVehicleIcon = function(vehicleType) {
    const type = String(vehicleType || '').toUpperCase();

    if (type.includes('BUS')) return 'fa-bus-simple';
    if (type.includes('FERRY')) return 'fa-ferry';
    if (type.includes('SUBWAY') || type.includes('METRO')) return 'fa-train-subway';
    if (type.includes('RAIL') || type.includes('TRAIN') || type.includes('TRAM')) return 'fa-train';

    return 'fa-diamond-turn-right';
};

const appendTravelStep = function(container, step, index) {
    if (index > 0) {
        const chevron = document.createElement('i');
        chevron.className = 'fas fa-chevron-right calendar-travel-route-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        container.appendChild(chevron);
    }

    const item = document.createElement('span');
    const icon = document.createElement('i');

    item.className = 'calendar-travel-route-step';

    if (step.mode === 'WALK' || step.mode === 'DRIVE') {
        icon.className = step.mode === 'DRIVE' ? 'fas fa-car' : 'fas fa-person-walking';
        item.appendChild(icon);

        const minutes = Math.max(1, Math.round(Number(step.duration_seconds || 0) / 60));
        item.appendChild(document.createTextNode(`${minutes} min`));
    } else {
        icon.className = `fas ${travelVehicleIcon(step.vehicle_type)}`;
        item.appendChild(icon);

        const line = document.createElement('span');
        const background = /^#[0-9a-f]{6}$/i.test(String(step.line_color || ''))
            ? step.line_color
            : '#4285f4';
        const textColor = /^#[0-9a-f]{6}$/i.test(String(step.line_text_color || ''))
            ? step.line_text_color
            : '#fff';

        line.className = 'calendar-travel-route-line';
        line.style.backgroundColor = background;
        line.style.color = textColor;
        line.textContent = step.line_name || step.vehicle_name || 'Transit';
        item.appendChild(line);
    }

    container.appendChild(item);
};

const renderTravelRoute = function(section, route) {
    const times = section.querySelector('[data-travel-route-times]');
    const steps = section.querySelector('[data-travel-route-steps]');
    const origin = section.querySelector('[data-travel-route-origin]');
    const durationMinutes = Math.max(0, Math.round(Number(route.duration_seconds || 0) / 60));
    const duration = document.createElement('strong');

    duration.textContent = `${durationMinutes} min`;
    times.replaceChildren(
        duration,
        document.createTextNode(' travel time')
    );
    steps.innerHTML = '';

    (Array.isArray(route.steps) ? route.steps : []).forEach(function(step, index) {
        appendTravelStep(steps, step, index);
    });

    if (!steps.children.length && durationMinutes) {
        appendTravelStep(steps, {
            mode: route.mode || 'TRANSIT',
            duration_seconds: route.duration_seconds,
        }, 0);
    }

    const routeLocations = [route.origin, route.destination]
        .filter(Boolean)
        .map(compactPhysicalLocation);

    origin.replaceChildren();
    routeLocations.forEach(function(location, index) {
        if (index > 0) {
            const arrow = document.createElement('i');

            arrow.className = 'fa-solid fa-arrow-right-long mx-2';
            arrow.style.opacity = '.5';
            arrow.setAttribute('aria-hidden', 'true');
            origin.appendChild(arrow);
        }

        origin.appendChild(document.createTextNode(location));
    });
    section.querySelector('[data-travel-route-loading]').hidden = true;
    section.querySelector('[data-travel-route-content]').hidden = false;
    section.hidden = false;
};

const getModalScheduleItem = function(event, scheduleItem) {
    if (scheduleItem && scheduleItem.isConnected && scheduleItem.classList.contains('lm-schedule-item')) {
        return scheduleItem;
    }

    const eventGuid = getScheduleTravelOwnerGuid(event);

    return getCalendarEventElementsByGuid(eventGuid).find(function(item) {
        return item.classList.contains('lm-schedule-item');
    }) || null;
};

const getScheduleItemTravelRoutes = function(item) {
    if (!item) {
        return [];
    }

    const routesByPosition = new Map();

    Array.from(item.querySelectorAll(':scope > .calendar-schedule-travel')).forEach(function(extension) {
        const position = extension.dataset.travelPosition;
        const route = getScheduleTravelExtensionRoute(extension);
        const existingRoute = routesByPosition.get(position);

        if (!route || Number(route.duration_seconds || 0) <= 0 || !hasSupportedTravelMode(route)) {
            return;
        }

        if (!existingRoute
            || getScheduleTravelRoutePriority(route) > getScheduleTravelRoutePriority(existingRoute)) {
            routesByPosition.set(position, route);
        }
    });

    return ['before', 'after']
        .map(function(position) {
            return routesByPosition.get(position);
        })
        .filter(Boolean);
};

const loadTravelRoute = function(modal, event, scheduleItem) {
    resetTravelRoute(modal);

    const section = modal
        ? modal.querySelector('[data-travel-route]:not([data-travel-route-generated])')
        : null;
    const routes = getScheduleItemTravelRoutes(getModalScheduleItem(event, scheduleItem));

    if (!section || !routes.length) {
        return;
    }

    routes.forEach(function(route, index) {
        const routeSection = index === 0 ? section : section.cloneNode(true);

        if (index > 0) {
            routeSection.setAttribute('data-travel-route-generated', '');
            section.parentNode.insertBefore(routeSection, section.nextSibling);
        }

        renderTravelRoute(routeSection, route);
    });
};

const renderNotesWithLinks = function(element, notes, options) {
    const text = String(notes || '');

    element.innerHTML = '';

    if (!text) {
        return;
    }

    element.classList.remove('opacity-4');
    appendTextWithLinks(element, text, options);
};

const renderGoogleNotesHtml = function(element, notes) {
    element.innerHTML = DOMPurify.sanitize(String(notes || ''), {
        ALLOWED_TAGS: ['a', 'p', 'br', 'div', 'span', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'blockquote'],
        ALLOWED_ATTR: ['href', 'title'],
        ALLOW_DATA_ATTR: false,
    });

    element.classList.remove('opacity-4');

    element.querySelectorAll('a').forEach(function(link) {
        const href = link.getAttribute('href') || '';
        let url;

        try {
            url = new URL(href, window.location.origin);
        } catch (error) {
            link.replaceWith(document.createTextNode(link.textContent || ''));
            return;
        }

        if (!['http:', 'https:'].includes(url.protocol)) {
            link.replaceWith(document.createTextNode(link.textContent || ''));
            return;
        }

        link.href = url.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

    });

    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node;

    while ((node = walker.nextNode())) {
        if (!node.parentElement || !node.parentElement.closest('a')) {
            textNodes.push(node);
        }
    }

    textNodes.forEach(function(textNode) {
        if (!/(?:https?:\/\/|www\.)/i.test(textNode.nodeValue || '')) {
            return;
        }

        const fragment = document.createDocumentFragment();
        appendTextWithLinks(fragment, textNode.nodeValue || '');
        textNode.replaceWith(fragment);
    });
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

const setGeneralEventNotesEditing = function(modal, editing) {
    if (!modal) {
        return;
    }

    const display = modal.querySelector('[data-general-event-notes-display-container]');
    const form = modal.querySelector('[data-general-event-notes-form]');
    const edit = modal.querySelector('[data-general-event-notes-edit]');
    const input = modal.querySelector('[data-general-event-notes-input]');
    const canEdit = edit && edit.dataset.canEdit === 'true';
    const hasNotes = Boolean(input && String(input.value || '').trim());

    if (display) display.hidden = editing || !hasNotes;
    if (form) form.hidden = !editing;
    if (edit) edit.hidden = editing || !canEdit;

    if (editing && input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
    }
};

const updateGeneralEventNotesInState = function(modal, payload) {
    const updatedEvent = payload && payload.event ? payload.event : null;

    if (!modal || !updatedEvent) {
        return;
    }

    const notes = updatedEvent.notes || '';
    const storedEvent = state.generalEvents.find(function(event) {
        return String(event.id) === String(updatedEvent.id)
            && !event.external_provider;
    });
    const display = modal.querySelector('[data-general-event-notes-display]');
    const section = modal.querySelector('[data-general-event-notes-section]');
    const input = modal.querySelector('[data-general-event-notes-input]');

    if (storedEvent) {
        Object.assign(storedEvent, updatedEvent);
    }

    if (modal.generalEvent) {
        modal.generalEvent.notes = notes;
        modal.generalEvent.notesUpdateUrl = updatedEvent.notes_update_url || modal.generalEvent.notesUpdateUrl;
    }

    getCalendarEventElementsByGuid(modal.dataset.eventGuid).forEach(function(item) {
        if (item.event) {
            item.event.notes = notes;
            item.event.notesUpdateUrl = updatedEvent.notes_update_url || item.event.notesUpdateUrl;
        }
    });

    if (display) renderNotesWithLinks(display, notes);
    if (section) section.hidden = !String(notes).trim();
    if (input) input.value = notes;

    setGeneralEventNotesEditing(modal, false);
};

const submitGeneralEventNotes = function(modal, form) {
    const input = form ? form.querySelector('[data-general-event-notes-input]') : null;

    if (!modal || !form || !form.action || !input) {
        return;
    }

    setFormSubmitting(form, true);
    clearGeneralEventActionError(modal);

    requestJson(form.action, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
            notes: input.value,
        }),
    }, 'Unable to update event notes.')
        .then(function(payload) {
            updateGeneralEventNotesInState(modal, payload);
        })
        .catch(function(error) {
            console.error(error);
            showGeneralEventActionError(modal, error.message);
        })
        .finally(function() {
            setFormSubmitting(form, false);
        });
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

    modal.classList.add('is-rescheduling');
};

const openGeneralEventModal = function(event, options) {
    const modal = document.getElementById('calendar-event-modal');
    const settings = options || {};

    if (!modal || !event) {
        return;
    }

    const title = modal.querySelector('.modal-title');
    const date = modal.querySelector('[data-event-modal-date]');
    const time = modal.querySelector('[data-event-modal-time]');
    const eventType = modal.querySelector('#general-event-type');
    const eventTypeIcon = modal.querySelector('#general-event-type-icon');
    const eventTypeSection = modal.querySelector('[data-general-event-type-section]');
    const notification = modal.querySelector('#general-event-notification');
    const notes = modal.querySelector('#general-event-notes');
    const notesSection = modal.querySelector('[data-general-event-notes-section]');
    const notesEdit = modal.querySelector('[data-general-event-notes-edit]');
    const notesForm = modal.querySelector('[data-general-event-notes-form]');
    const notesInput = modal.querySelector('[data-general-event-notes-input]');
    const meetingSection = modal.querySelector('[data-event-modal-meeting-section]');
    const meetingLink = modal.querySelector('[data-event-modal-meeting-link]');
    const organizer = modal.querySelector('[data-general-event-organizer]');
    const organizerSection = modal.querySelector('[data-general-event-organizer-section]');
    const location = modal.querySelector('[data-event-modal-location]');
    const locationIcon = modal.querySelector('[data-event-modal-location-icon]');
    const locationSection = modal.querySelector('[data-event-modal-location-section]');
    const address = modal.querySelector('[data-general-event-address]');
    const addressSection = modal.querySelector('[data-general-event-address-section]');
    const duplicate = modal.querySelector('#event-duplicate');
    const edit = modal.querySelector('#event-edit');
    const revert = modal.querySelector('#event-revert');
    const controls = modal.querySelector('#general-event-controls');
    const rescheduleForm = modal.querySelector('#reschedule-general-event form');
    const rescheduleDate = modal.querySelector('#reschedule-general-event-date');
    const rescheduleStartTime = modal.querySelector('#reschedule-general-event-start-time');
    const rescheduleEndTime = modal.querySelector('#reschedule-general-event-end-time');
    const isCanceled = event.calendarStatus === 'canceled';
    const hasEnded = hasCalendarEventEnded(event);
    const canEditNotes = !event.readOnly && !event.externalProvider && Boolean(event.notesUpdateUrl);

    setCalendarEventModalType(modal, 'general');
    resetGeneralEventModalState(modal);
    setCalendarEventModalExpandAvailable(modal, event.externalProvider !== 'google');
    setCalendarEventModalExpanded(modal, Boolean(settings.openReschedule && !event.readOnly && !hasEnded));
    modal.updatedScheduleItem = settings.updatedItem || null;
    modal.generalEvent = event;

    if (title) title.textContent = event.title || 'Event';
    if (date) date.textContent = event.date ? modalDateFormatter.format(parseDateString(event.date)) : '';
    if (time) time.textContent = event.allDay
        ? 'All day'
        : (event.start && event.end
            ? `${formatModalEventTime(event.start)} - ${formatModalEventTime(event.end)}`
            : formatModalEventTime(event.start));
    if (eventType) eventType.textContent = event.eventType || '';
    if (eventTypeIcon) {
        const eventTypeIconStyle = event.externalProvider === 'google' ? 'fa-brands' : 'fas';
        eventTypeIcon.className = `${eventTypeIconStyle} calendar-modal-detail-icon${event.eventTypeIcon ? ` fa-${event.eventTypeIcon}` : ''}`;
        eventTypeIcon.hidden = !event.eventTypeIcon;
    }
    if (eventTypeSection) eventTypeSection.hidden = !event.eventType;
    if (notification) {
        notification.textContent = formatGeneralEventNotification(event.notificationMinutesBefore);
        notification.parentElement.hidden = !notification.textContent;
    }
    if (notesSection) notesSection.hidden = !String(event.notes || '').trim();
    if (notes) {
        if (event.externalProvider === 'google') {
            renderGoogleNotesHtml(notes, event.notes);
        } else {
            renderNotesWithLinks(notes, event.notes);
        }
    }
    if (notesEdit) {
        notesEdit.dataset.canEdit = canEditNotes ? 'true' : 'false';
    }
    if (notesForm) notesForm.action = event.notesUpdateUrl || '';
    if (notesInput) notesInput.value = event.notes || '';
    setGeneralEventNotesEditing(modal, false);
    if (meetingSection) meetingSection.hidden = !event.meetingUrl;
    if (meetingLink) {
        meetingLink.href = event.meetingUrl || '#';
        meetingLink.hidden = !event.meetingUrl;
    }
    if (organizerSection) organizerSection.hidden = !(event.organizerName || event.organizerEmail);
    if (organizer) organizer.textContent = event.organizerName || event.organizerEmail || '';
    if (location && locationSection) {
        locationSection.hidden = isHomeCalendarLocation(event.location)
            || !renderEventLocation(location, locationIcon, event.location);
    }
    if (address && addressSection) {
        address.innerHTML = '';
        addressSection.hidden = true;
    }
    if (edit) {
        edit.dataset.url = event.editUrl || '';
        edit.style.display = edit.dataset.url ? 'inline-flex' : 'none';
        edit.disabled = !edit.dataset.url;
    }
    if (duplicate) {
        const canDuplicate = !event.readOnly && !event.externalProvider;

        duplicate.style.display = canDuplicate ? 'inline-flex' : 'none';
        duplicate.disabled = !canDuplicate;
    }
    if (revert) {
        const hasPendingVisualDrop = Boolean(
            modal.updatedScheduleItem
            && modal.updatedScheduleItem.hasAttribute('updated-event')
            && modal.updatedScheduleItem.scheduleOriginalPosition
        );
        const canRevertCancellation = isCanceled && Boolean(event.revertUrl);

        revert.dataset.url = event.revertUrl || '';
        revert.toggleAttribute('data-pending-visual-drop', hasPendingVisualDrop);
        revert.style.display = hasPendingVisualDrop || canRevertCancellation ? 'inline-flex' : 'none';
        revert.disabled = !hasPendingVisualDrop && !canRevertCancellation;
        restoreButtonLabel(revert);
    }
    if (controls) {
        if (isCanceled || event.readOnly || hasEnded) {
            controls.style.setProperty('display', 'none', 'important');
        } else {
            controls.style.removeProperty('display');
        }
    }

    modal.dataset.eventGuid = event.guid || '';
    modal.dataset.eventId = event.id || '';

    if (rescheduleForm) rescheduleForm.action = event.rescheduleUrl || '';
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

    if (settings.openReschedule && !event.readOnly && !hasEnded) {
        modal.classList.add('is-drop-rescheduling');
        showGeneralEventRescheduleForm(modal);
    }

    updateConflictToggle(modal, event);
    loadTravelRoute(modal, event, settings.scheduleItem || modal.updatedScheduleItem);
    showBootstrapModal(modal);
};

const submitGeneralEventModalForm = function(form, refreshCalendar) {
    const modal = form ? form.closest('#calendar-event-modal') : null;
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

const revertGeneralEventAction = function(button, refreshCalendar) {
    const modal = button ? button.closest('#calendar-event-modal') : null;
    const url = button ? button.dataset.url : '';

    if (!modal || !url) {
        return;
    }

    button.disabled = true;
    clearGeneralEventActionError(modal);

    requestJson(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-CSRF-TOKEN': window.calendarCsrfToken || '',
            'X-Requested-With': 'XMLHttpRequest',
        },
    }, 'Unable to revert event cancellation.')
        .then(function() {
            return refreshCalendar().then(function() {
                hideBootstrapModal(modal);
            });
        })
        .catch(function(error) {
            console.error(error);
            button.disabled = false;
            restoreButtonLabel(button);
            showGeneralEventActionError(modal, error.message);
        });
};

const updateLessonModalState = function(modal, payload) {
    const revert = modal.querySelector('#lesson-revert');
    const taught = modal.querySelector('#lesson-taught');
    const event = getEventByGuid(modal.dataset.eventGuid);
    const status = payload && payload.status ? payload.status : 'unpaid';
    const editUrl = payload && payload.edit_url ? payload.edit_url : '';
    const paymentUrl = payload && (payload.payment_url || payload.paymentUrl) ? (payload.payment_url || payload.paymentUrl) : '';
    const lessonId = payload && payload.lesson_id ? payload.lesson_id : '';
    const confirmPayment = modal.querySelector('#confirm-payment');
    const earlyPayment = modal.querySelector('#early-payment');
    const hasEarlyPaymentId = payload && Object.prototype.hasOwnProperty.call(payload, 'early_payment_id');
    const earlyPaymentId = hasEarlyPaymentId ? (payload.early_payment_id || '') : (event ? event.earlyPaymentId : '');
    const paymentExempt = payload && Object.prototype.hasOwnProperty.call(payload, 'payment_exempt')
        ? Boolean(payload.payment_exempt)
        : Boolean(event && event.paymentExempt);

    modal.dataset.lessonStatus = status;
    modal.dataset.lessonCanceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
    modal.dataset.earlyPaymentId = earlyPaymentId;
    modal.dataset.paymentExempt = paymentExempt ? 'true' : 'false';

    if (payload && payload.lesson_deleted) {
        modal.dataset.lessonId = '';
    } else if (lessonId) {
        modal.dataset.lessonId = lessonId;
    }

    if (taught) {
        taught.disabled = false;
        restoreButtonLabel(taught);
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
        const hasReschedule = !(payload && payload.schedule_override_deleted)
            && (event.calendarStatus === 'rescheduled' || event.scheduleOverrideId);
        event.calendarStatus = hasReschedule && status === 'unconfirmed'
            ? 'rescheduled'
            : status;
        event['data-lesson-status'] = event.calendarStatus;
        event.canceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
        event.lessonEditUrl = payload && payload.lesson_deleted ? '' : (editUrl || event.lessonEditUrl || '');
        event.paymentUrl = payload && payload.lesson_deleted ? '' : (paymentUrl || event.paymentUrl || '');
        event.lessonId = payload && payload.lesson_deleted ? '' : (lessonId || event.lessonId || '');
        event.scheduleOverrideId = payload && payload.schedule_override_deleted ? '' : event.scheduleOverrideId;
        event.earlyPaymentId = earlyPaymentId;
        event.paymentExempt = paymentExempt;

        if (paymentExempt) {
            event.feeAmount = 0;
        }
    }

    updateLessonScheduleControls(modal, event || {
        lessonStatus: status,
        lessonPlanId: modal.dataset.lessonPlanId,
        singleLessonPlanId: modal.dataset.singleLessonPlanId,
        date: modal.dataset.eventDate,
        start: modal.dataset.eventStart,
        end: modal.dataset.eventEnd,
    });

    if (revert) {
        const canRevert = !!(event && (
            event.scheduleOverrideId
            || event.lessonId
            || event.earlyPaymentId
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
    const modal = button.closest('#calendar-event-modal');
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
    const modal = button.closest('#calendar-event-modal');
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
    const modal = button.closest('#calendar-event-modal');
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
    const modal = button.closest('#calendar-event-modal');
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
    const modal = form ? form.closest('#calendar-event-modal') : null;
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
    const firstVisibleCell = Array.from(schedule.querySelectorAll(`tbody td[data-y="${slot}"][data-date]`))
        .find(function(candidate) {
            return candidate.offsetParent !== null;
        });
    const touchesTimeColumn = firstVisibleCell
        && Math.abs(cellRect.left - firstVisibleCell.getBoundingClientRect().left) < 1;
    const pointerLeft = cellRect.left - scheduleRect.left + schedule.scrollLeft;
    let extension = pointer.querySelector('.calendar-schedule-pointer-extension');
    let time = pointer.querySelector('.calendar-schedule-pointer-time');

    if (!extension) {
        extension = document.createElement('span');
        extension.className = 'calendar-schedule-pointer-extension';
        extension.setAttribute('aria-hidden', 'true');
        pointer.appendChild(extension);
    }

    if (!time) {
        time = document.createElement('span');
        time.className = 'calendar-schedule-pointer-time';
        time.setAttribute('aria-hidden', 'true');
        extension.appendChild(time);
    }

    pointer.style.display = 'block';
    pointer.classList.toggle('calendar-schedule-pointer-touches-time-column', Boolean(touchesTimeColumn));
    pointer.style.left = `${pointerLeft}px`;
    pointer.style.top = `${cellRect.top - scheduleRect.top + schedule.scrollTop + (cellRect.height * slotOffset)}px`;
    extension.style.width = `${pointerLeft}px`;
    time.textContent = eventTimeFormatter.format(now).replace(/\s*[ap]\.?m\.?/i, '');

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
        && !event.allDay
        && !isCanceledCalendarEvent(event)
        && event.start
        && event.end;
};

const getConflictEventKey = function(event) {
    if (!event) {
        return '';
    }

    if (event.isGeneralEvent) {
        const id = String(event.id || '').replace(/^google-/, '');

        if (!id) {
            return '';
        }

        return event.externalProvider === 'google'
            ? `google-event:${id}`
            : `general-event:${id}`;
    }

    if (event.singleLessonPlanId) {
        return `single-lesson-plan:${event.singleLessonPlanId}`;
    }

    if (event.lessonPlanId) {
        const date = String(event.originalDate || event.date || '').substring(0, 10);
        const start = normalizeTime(event.originalStartTime || event.start || '');

        return date && start
            ? `lesson-plan:${event.lessonPlanId}:${date}:${start}`
            : '';
    }

    return '';
};

const getConflictPairId = function(firstEventKey, secondEventKey) {
    return JSON.stringify([firstEventKey, secondEventKey].sort());
};

const isSameConflictEvent = function(firstEvent, secondEvent) {
    if (!firstEvent || !secondEvent) {
        return false;
    }

    const firstEventKey = getConflictEventKey(firstEvent);
    const secondEventKey = getConflictEventKey(secondEvent);

    if (firstEventKey && secondEventKey) {
        return firstEventKey === secondEventKey;
    }

    return Boolean(firstEvent.guid && firstEvent.guid === secondEvent.guid);
};

const setIgnoredConflictPairs = function(pairs) {
    state.ignoredConflictPairs = new Set(
        (Array.isArray(pairs) ? pairs : [])
            .filter(function(pair) {
                return Array.isArray(pair) && pair.length === 2 && pair[0] && pair[1];
            })
            .map(function(pair) {
                return getConflictPairId(String(pair[0]), String(pair[1]));
            })
    );
};

const isIgnoredConflictPair = function(firstEvent, secondEvent) {
    const firstEventKey = getConflictEventKey(firstEvent);
    const secondEventKey = getConflictEventKey(secondEvent);

    return firstEventKey
        && secondEventKey
        && state.ignoredConflictPairs.has(getConflictPairId(firstEventKey, secondEventKey));
};

const getOverlappingTimedEventPairs = function(events) {
    const timedEvents = events
        .filter(function(event) {
            return isConflictEligibleTimedEvent(event);
        })
        .map(function(event) {
            return {
                event,
                guid: event.guid,
                start: getTimeMinutes(event.start),
                end: getTimeMinutes(event.end),
            };
        })
        .filter(function(event) {
            return event.end > event.start;
        });
    const pairs = [];

    timedEvents.forEach(function(event, index) {
        timedEvents.slice(index + 1).forEach(function(otherEvent) {
            if (event.start < otherEvent.end && otherEvent.start < event.end) {
                pairs.push([event.event, otherEvent.event]);
            }
        });
    });

    return pairs;
};

const getOverlappingTimedEventGuids = function(events) {
    const guids = new Set();

    getOverlappingTimedEventPairs(events).forEach(function(pair) {
        if (isIgnoredConflictPair(pair[0], pair[1])) {
            return;
        }

        guids.add(pair[0].guid);
        guids.add(pair[1].guid);
    });

    return guids;
};

const getConflictingEvents = function(event) {
    if (!isConflictEligibleTimedEvent(event) || !event.date) {
        return [];
    }

    const date = parseDateString(String(event.date).substring(0, 10));
    const conflicts = new Map();
    const addConflict = function(conflictingEvent) {
        const key = getConflictEventKey(conflictingEvent);

        if (conflictingEvent && key) {
            conflicts.set(key, conflictingEvent);
        }
    };

    getOverlappingTimedEventPairs(getEventsForDate(date)).forEach(function(pair) {
        let conflictingEvent = null;

        if (isSameConflictEvent(pair[0], event)) {
            conflictingEvent = pair[1];
        } else if (isSameConflictEvent(pair[1], event)) {
            conflictingEvent = pair[0];
        }

        addConflict(conflictingEvent);
    });

    document.querySelectorAll('#calendar .lm-schedule').forEach(function(schedule) {
        getScheduleTravelConflictPairs(schedule).forEach(function(pair) {
            if (isSameConflictEvent(pair.ownerEvent, event)) {
                addConflict(pair.event);
            } else if (isSameConflictEvent(pair.event, event)) {
                addConflict(pair.ownerEvent);
            }
        });
    });

    return Array.from(conflicts.values());
};

const updateConflictToggle = function(modal, event) {
    const section = modal ? modal.querySelector('#ignore-conflict') : null;
    const button = section ? section.querySelector('[data-conflict-toggle]') : null;
    const label = button ? button.querySelector('[data-conflict-toggle-label]') : null;
    const eventKey = getConflictEventKey(event);
    const conflictingEvents = getConflictingEvents(event);
    const conflictingEventKeys = conflictingEvents.map(getConflictEventKey).filter(Boolean);
    const canToggle = Boolean(
        eventKey
        && conflictingEventKeys.length
        && !(event && event.externalProvider === 'google')
    );

    if (!section || !button) {
        return;
    }

    section.hidden = !canToggle;

    if (!canToggle) {
        button.disabled = false;
        delete button.dataset.conflictAction;
        delete button.dataset.eventKey;
        delete button.dataset.conflictingEventKeys;
        return;
    }

    const allIgnored = conflictingEvents.every(function(conflictingEvent) {
        return isIgnoredConflictPair(event, conflictingEvent);
    });

    button.disabled = false;
    button.dataset.conflictAction = allIgnored ? 'show' : 'ignore';
    button.dataset.eventKey = eventKey;
    button.dataset.conflictingEventKeys = JSON.stringify(conflictingEventKeys);

    if (label) {
        label.textContent = allIgnored ? 'Show conflict' : 'Ignore conflict';
    }
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
    const isOverlapping = isOverlappingTimedEvent(event, visibleDate);

    element.toggleAttribute('overlapping-event', isOverlapping);

    if (isOverlapping && element.classList.contains('lm-schedule-item')) {
        const duration = Math.max(1, getTimeMinutes(event.end) - getTimeMinutes(event.start));

        element.style.setProperty('--calendar-overlap-z-index', String(2000 - Math.min(duration, 1440)));
    } else {
        element.style.removeProperty('--calendar-overlap-z-index');
    }
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

            return state.selectedEventTypes.includes(type) || state.selectedEventTypes.includes('canceled');
        })
        .filter(lessonMatchesStudentSearch)
        .filter(lessonMatchesLocationFilter);
};

const lessonOccurrenceMatchesEventTypeFilter = function(type, status) {
    if (status === 'canceled') {
        return state.selectedEventTypes.includes('canceled');
    }

    return state.selectedEventTypes.includes(type);
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
                const lessonStatus = occurrence.lesson_status || 'unconfirmed';

                if (!dateString || !lessonOccurrenceMatchesEventTypeFilter(isSingleLessonPlan ? 'single' : 'recurring', lessonStatus)) {
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
                    lessonStatus,
                    calendarStatus: occurrence.calendar_status || lessonStatus,
                    'data-lesson-status': occurrence.calendar_status || lessonStatus,
                    feeAmount: lesson.student && lesson.student.payment_exempt ? 0 : (occurrence.fee_amount || lesson.fee_amount || 0),
                    paymentExempt: Boolean(lesson.student && lesson.student.payment_exempt),
                    studentId: lesson.student_id || (lesson.student && lesson.student.id) || '',
                    paymentMethod: lesson.payment_method || (lesson.student && lesson.student.payment_method) || '',
                    notes: lesson.notes || '',
                    locationId: normalizeLocationId(lesson.location_id),
                    locationName: lesson.location && lesson.location.name ? lesson.location.name : '',
                    location: lesson.location || null,
                    canceledBy: occurrence.canceled_by || '',
                    calendarEditUrl: getLessonPlanModalEditUrl(isSingleLessonPlan, lesson.id),
                    lessonEditUrl: occurrence.lesson_edit_url || '',
                    paymentUrl: occurrence.lesson_payment_url || occurrence.payment_url || '',
                    meetingUrl: occurrence.meeting_url || lesson.meeting_url || '',
                    notesUrl: occurrence.notes_url || lesson.notes_url || '',
                    travelMode: occurrence.travel_mode || 'TRANSIT',
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

            if (!lessonOccurrenceMatchesEventTypeFilter('recurring', lessonStatus)) {
                occurrence = addDays(occurrence, intervalDays);
                continue;
            }

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
                feeAmount: lesson.student && lesson.student.payment_exempt ? 0 : (confirmedLesson && confirmedLesson.fee_amount ? confirmedLesson.fee_amount : (lesson.fee_amount || 0)),
                paymentExempt: Boolean(lesson.student && lesson.student.payment_exempt),
                studentId: lesson.student_id || (lesson.student && lesson.student.id) || '',
                paymentMethod: lesson.payment_method || (lesson.student && lesson.student.payment_method) || '',
                notes: lesson.notes || '',
                locationId: normalizeLocationId(lesson.location_id),
                locationName: lesson.location && lesson.location.name ? lesson.location.name : '',
                location: lesson.location || null,
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
    const generalEvents = getGeneralEventCalendarEvents();

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
    return getOverlappingTimedEventGuids(events).size > 0;
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
    item.toggleAttribute('data-read-only', Boolean(event.readOnly));
    item.dataset.externalProvider = event.externalProvider || '';
    item.dataset.responseStatus = event.responseStatus || '';
    item.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.isRecital ? 'recital' : (event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed'))));
    dot.dataset.eventGuid = event.guid || '';
    dot.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.isRecital ? 'recital' : (event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed'))));
    applyCalendarItemStatusAttributes(item, event, dateString);
    applyCalendarItemStatusAttributes(dot, event, dateString);

    time.textContent = event.isHoliday || event.isBreak || event.allDay ? '' : formatEventTime(event.start);
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

const setNamedFormValue = function(form, name, value) {
    const control = form && form.elements ? form.elements.namedItem(name) : null;

    if (control) {
        control.value = value === null || typeof value === 'undefined' ? '' : String(value);
    }
};

const prepareDuplicateGeneralEventForm = function(modal, event, options) {
    const form = modal ? modal.querySelector('form') : null;
    const settings = options || {};

    if (!form || !event) {
        return false;
    }

    form.reset();
    if (typeof window.resetEventTimeFields === 'function') {
        window.resetEventTimeFields(form);
    }
    setNamedFormValue(form, 'name', event.title);
    setNamedFormValue(form, 'scheduled_date', settings.preserveDate ? event.date : '');
    setNamedFormValue(form, 'starts_at', event.start);
    setNamedFormValue(form, 'ends_at', event.end);
    setNamedFormValue(form, 'address', event.address);
    setNamedFormValue(form, 'city', event.city);
    setNamedFormValue(form, 'state', event.state);
    setNamedFormValue(form, 'postal_code', event.postalCode);
    setNamedFormValue(form, 'travel_mode', event.travelMode || 'TRANSIT');
    setNamedFormValue(form, 'notes', event.notes);

    if (typeof window.refreshEventTimeFields === 'function') {
        window.refreshEventTimeFields(form);
    }

    form.querySelectorAll('[data-event-type-input]').forEach(function(input) {
        input.checked = input.value === event.eventType;
        input.dispatchEvent(new window.Event('change', { bubbles: true }));
    });

    const notificationToggle = form.querySelector('[data-event-notification-toggle]');
    const notificationOptions = form.querySelector('[data-event-notification-options]');

    if (notificationToggle) {
        notificationToggle.checked = Boolean(event.notificationEnabled);
    }
    if (notificationOptions) {
        notificationOptions.hidden = !event.notificationEnabled;
    }
    if (event.notificationEnabled) {
        setNamedFormValue(form, 'notification_minutes_before', event.notificationMinutesBefore);
    }

    return true;
};

const openDuplicateGeneralEventModal = function(event, sourceModal, options) {
    const createModal = document.getElementById('create-event-modal');

    if (!prepareDuplicateGeneralEventForm(createModal, event, options)) {
        showGeneralEventActionError(sourceModal, 'Unable to open the duplicate event form.');
        return;
    }

    let didShow = false;
    const showCreateModal = function() {
        if (didShow) {
            return;
        }

        didShow = true;
        showBootstrapModal(createModal);
    };

    if (sourceModal && sourceModal.classList.contains('show')) {
        sourceModal.addEventListener('hidden.bs.modal', showCreateModal, { once: true });
        hideBootstrapModal(sourceModal);
        window.setTimeout(showCreateModal, 250);
        return;
    }

    showCreateModal();
};

const prepareDuplicateSingleLessonForm = function(modal, event) {
    const form = modal ? modal.querySelector('[data-lesson-plan-form]') : null;

    if (!form || !event) {
        return false;
    }

    form.reset();

    const combobox = form.querySelector('[data-student-combobox]');
    const studentInput = combobox ? combobox.querySelector('[data-student-combobox-input]') : null;
    const studentValue = combobox ? combobox.querySelector('[data-student-combobox-value]') : null;
    const studentOptions = combobox
        ? Array.from(combobox.querySelectorAll('[data-student-combobox-option]'))
        : [];
    const matchingStudent = studentOptions.find(function(option) {
        return event.studentId && String(option.dataset.studentId || '') === String(event.studentId);
    }) || studentOptions.find(function(option) {
        return String(option.dataset.studentName || '').trim().toLowerCase()
            === String(event.title || '').trim().toLowerCase();
    });

    if (studentInput) {
        studentInput.value = matchingStudent
            ? (matchingStudent.dataset.studentName || matchingStudent.textContent.trim())
            : (event.title || '');
        studentInput.setCustomValidity('');
    }
    if (studentValue) {
        studentValue.value = matchingStudent
            ? (matchingStudent.dataset.studentId || '')
            : (event.studentId || '');
    }
    if (matchingStudent) {
        syncFormDefaultsFromStudentOption(matchingStudent);
    }

    setNamedFormValue(form, 'location_id', event.locationId);
    setNamedFormValue(form, 'starts_on', event.date);
    setNamedFormValue(form, 'repeat', 'none');
    setNamedFormValue(form, 'ends_on', '');
    setNamedFormValue(form, 'start_time', event.start);
    setNamedFormValue(form, 'duration_minutes', Math.max(15, getTimeMinutes(event.end) - getTimeMinutes(event.start)));
    setNamedFormValue(form, 'fee_amount', event.feeAmount ? Number(event.feeAmount) / 100 : '');
    setNamedFormValue(form, 'payment_method', event.paymentMethod);
    setNamedFormValue(form, 'meeting_url', event.meetingUrl);
    setNamedFormValue(form, 'notes_url', event.notesUrl);
    setNamedFormValue(form, 'notes', event.notes);

    const locationSelect = form.querySelector('select[name="location_id"]');

    if (locationSelect) {
        locationSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
        // The location change sets its default fee, so restore the copied lesson's fee.
        setNamedFormValue(form, 'fee_amount', event.feeAmount ? Number(event.feeAmount) / 100 : '');
        setNamedFormValue(form, 'meeting_url', event.meetingUrl);
        setNamedFormValue(form, 'notes_url', event.notesUrl);
    }

    const repeatSelect = form.querySelector('select[name="repeat"]');

    if (repeatSelect) {
        repeatSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
    }

    modal.dataset.preserveScheduledDateOnce = 'true';

    return true;
};

const openDuplicateSingleLessonModal = function(event) {
    const createModal = document.getElementById('create-calendar-lesson-plan-modal');

    if (!prepareDuplicateSingleLessonForm(createModal, event)) {
        return;
    }

    showBootstrapModal(createModal);
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
    if (typeof window.initializeEventTimeFields === 'function') {
        window.initializeEventTimeFields(modal);
    }

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

    const lessonForm = modal.querySelector('[data-single-lesson-plan-form], [data-lesson-plan-form]');

    if (lessonForm && lessonForm.dataset.calendarAjaxSubmitInitialized !== 'true') {
        lessonForm.dataset.calendarAjaxSubmitInitialized = 'true';
        lessonForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitButton = lessonForm.querySelector('[type="submit"]');

            if (submitButton) {
                submitButton.disabled = true;
            }

            fetch(lessonForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: new FormData(lessonForm),
            })
                .then(function(response) {
                    if (response.ok) {
                        window.location.reload();
                        return;
                    }

                    return response.json()
                        .catch(function() {
                            return {};
                        })
                        .then(function(payload) {
                            const validationErrors = payload.errors ? Object.values(payload.errors) : [];
                            const validationMessage = validationErrors.length
                                ? (Array.isArray(validationErrors[0]) ? validationErrors[0][0] : validationErrors[0])
                                : '';

                            throw new Error(validationMessage || payload.message || 'Unable to update this lesson.');
                        });
                })
                .catch(function(error) {
                    showCalendarEditError(modal, error.message);

                    if (submitButton) {
                        submitButton.disabled = false;
                    }
                });
        });
    }
};

const loadCalendarEditModal = function(button, sourceModal, container) {
    const url = button ? button.dataset.url : '';

    if (!button || !url || !container) {
        return;
    }

    button.disabled = true;

    fetchCalendarResource(url, {
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

            if (sourceModal && sourceModal.dataset.eventModalType === 'lesson') {
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
        const visibleEvents = events.slice(0, monthVisibleEventLimit);
        const hiddenEventCount = events.length - visibleEvents.length;

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
        list.classList.toggle('calendar-month-events-overflowing', hiddenEventCount > 0);

        if (hasOverlaps) {
            const alert = document.createElement('i');

            alert.className = 'fa-solid fa-circle-exclamation calendar-month-overlap-alert';
            alert.setAttribute('aria-hidden', 'true');
            cell.appendChild(alert);
        }

        visibleEvents.forEach(function(event) {
            list.appendChild(createMonthEventElement(event, dateString));
        });

        if (hiddenEventCount > 0) {
            const more = document.createElement('span');

            more.className = 'calendar-month-more';
            more.dataset.monthMoreDate = dateString;
            more.setAttribute('role', 'button');
            more.tabIndex = 0;
            more.textContent = `${hiddenEventCount} more`;
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
    let renderedMonth = '';

    wrapper.className = 'calendar-schedule-agenda';

    getDateRangeDates(range).forEach(function(date) {
        const dateString = toDateString(date);
        const items = getCalendarItemsForDate(date);
        const shouldRenderEmpty = dateString === today || dateString === selected;

        if (!items.length && !shouldRenderEmpty) {
            return;
        }

        const month = dateString.substring(0, 7);

        if (month !== renderedMonth) {
            const monthBar = document.createElement('div');

            monthBar.className = 'calendar-schedule-month-bar';
            monthBar.dataset.month = month;
            monthBar.textContent = monthFormatter.format(date).toUpperCase();
            wrapper.appendChild(monthBar);
            renderedMonth = month;
        }

        const day = document.createElement('section');
        const dateRail = document.createElement('button');
        const weekday = document.createElement('div');
        const number = document.createElement('div');
        const list = document.createElement('div');

        day.className = 'calendar-schedule-day';
        day.dataset.date = dateString;
        dateRail.className = 'calendar-schedule-date';
        dateRail.type = 'button';
        dateRail.setAttribute('aria-label', `Scroll to ${modalDateFormatter.format(date)}`);
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
            item.toggleAttribute('data-read-only', Boolean(event.readOnly));
            item.dataset.externalProvider = event.externalProvider || '';
            item.dataset.responseStatus = event.responseStatus || '';
            item.dataset.lessonStatus = event.isHoliday ? 'holiday' : (event.isBreak ? 'teaching-break' : (event.isRecital ? 'recital' : (event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed'))));
            applyCalendarItemStatusAttributes(item, event, dateString);
            applyEventOverlapAttribute(item, event);

            if (!event.isHoliday && !event.isBreak && !event.isRecital) {
                const time = document.createElement('span');
                const duration = getEventDurationMinutes(event);
                const eventIcon = createCalendarEventIcon(event);

                item.type = 'button';
                item.dataset.durationMinutes = duration;
                item.style.setProperty('--calendar-schedule-event-height', getAgendaEventHeight(event));
                time.className = 'calendar-schedule-event-time';
                time.textContent = event.allDay
                    ? 'All day'
                    : (event.externalProvider === 'google'
                        ? 'from Google Calendar'
                    : (event.start && event.end
                        ? `${formatAgendaEventTime(event.start)}-${formatAgendaEventTime(event.end)}`
                        : formatAgendaEventTime(event.start)));

                if (eventIcon) {
                    item.appendChild(eventIcon);
                }

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
    const start = isValidDate(state.scheduleWindowStart)
        ? cloneDate(state.scheduleWindowStart)
        : startOfWeek(date);
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
        const rolling = isValidDate(state.scheduleWindowStart);
        const nextStart = addDays(getVisibleScheduleDates()[0], direction * 7);

        setSelectedDate(nextStart);
        if (rolling) {
            state.scheduleWindowStart = cloneDate(nextStart);
        }
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

const initializeSingleLessonPlanForms = function(root) {
    (root || document).querySelectorAll('[data-single-lesson-plan-form]').forEach(function(form) {
        if (form.dataset.calendarFormInitialized === 'true') {
            return;
        }

        form.dataset.calendarFormInitialized = 'true';

        const locationSelect = form.querySelector('select[name="location_id"]');
        const durationSelect = form.querySelector('select[name="duration_minutes"]');
        const repeatSelect = form.querySelector('select[name="repeat"]');

        setSingleLessonOnlineFields(form, false);
        syncLessonRepeatFields(form, false);

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

        if (repeatSelect) {
            repeatSelect.addEventListener('change', function() {
                syncLessonRepeatFields(form, true);
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

const syncLessonRepeatFields = function(form, shouldReset) {
    const repeatSelect = form ? form.querySelector('select[name="repeat"]') : null;
    const endsOnWrapper = form ? form.querySelector('[data-lesson-repeat-end]') : null;
    const endsOnInput = endsOnWrapper ? endsOnWrapper.querySelector('input[name="ends_on"]') : null;
    const isRecurring = repeatSelect && repeatSelect.value !== 'none';

    if (!endsOnWrapper || !endsOnInput) {
        return;
    }

    endsOnWrapper.style.display = isRecurring ? '' : 'none';
    endsOnInput.disabled = !isRecurring;
    endsOnInput.required = !!isRecurring;

    if (!isRecurring && shouldReset) {
        endsOnInput.value = '';
    }
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
        const repeatSelect = form.querySelector('select[name="repeat"]');
        const modal = form.closest('#create-calendar-lesson-plan-modal');

        setLessonPlanOnlineFields(form, false);
        syncLessonRepeatFields(form, false);

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

        if (repeatSelect) {
            repeatSelect.addEventListener('change', function() {
                syncLessonRepeatFields(form, true);
            });
        }

        if (modal) {
            modal.addEventListener('show.bs.modal', function() {
                if (modal.dataset.preserveScheduledDateOnce === 'true') {
                    delete modal.dataset.preserveScheduledDateOnce;
                    return;
                }

                setNamedFormValue(form, 'starts_on', getSingleLessonPlanDefaultDate());
                setNamedFormValue(form, 'repeat', 'none');
                setNamedFormValue(form, 'ends_on', '');
                syncLessonRepeatFields(form, true);
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
    const calendarEventModal = document.getElementById('calendar-event-modal');
    const calendarEventModalExpandToggle = calendarEventModal
        ? calendarEventModal.querySelector('[data-event-modal-expand-toggle]')
        : null;
    const lessonModal = calendarEventModal;
    const generalEventModal = calendarEventModal;
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
    const calendarCreateStudent = document.querySelector('[data-calendar-create-student]');
    const calendarCreateLesson = document.querySelector('[data-calendar-create-lesson]');
    const calendarCreateEvent = document.querySelector('[data-calendar-create-event]');
    const calendarFilter = document.querySelector('.calendar-calendar-filter');
    const calendarFilterReset = document.querySelector('[data-calendar-filter-reset]');
    let calendarCreateBackdrop = null;

    if (!calendar) {
        return;
    }

    let scheduleItemHold = null;
    let scheduleCopyModifierPressed = false;
    let suppressedScheduleItemClick = null;
    let scheduleHoldNavigationSuppressedUntil = 0;
    let pendingEventCopySequence = 0;
    let scheduleHeaderRenderTimer = null;

    const isScheduleHoldNavigationSuppressed = function() {
        return Boolean(scheduleItemHold && scheduleItemHold.active)
            || Date.now() < scheduleHoldNavigationSuppressedUntil;
    };

    initializeStudentComboboxes();
    initializeSingleLessonPlanForms();
    initializeLessonPlanForms();

    if (calendarEventModalExpandToggle) {
        calendarEventModalExpandToggle.addEventListener('click', function() {
            setCalendarEventModalExpanded(calendarEventModal, true);
        });
    }

    state.plannedLessons = Array.isArray(window.calendarPlannedLessons)
        ? window.calendarPlannedLessons
        : (Array.isArray(window.calendarLessonPlans) ? window.calendarLessonPlans : []);
    state.singleLessonPlans = Array.isArray(window.calendarSingleLessonPlans) ? window.calendarSingleLessonPlans : [];
    state.holidays = Array.isArray(window.calendarHolidays) ? window.calendarHolidays : [];
    state.showHolidays = window.calendarShowHolidays !== false;
    state.teachingBreaks = Array.isArray(window.calendarTeachingBreaks) ? window.calendarTeachingBreaks : [];
    state.recitals = Array.isArray(window.calendarRecitals) ? window.calendarRecitals : [];
    state.generalEvents = Array.isArray(window.calendarGeneralEvents) ? window.calendarGeneralEvents : [];
    setIgnoredConflictPairs(window.calendarIgnoredConflicts);
    state.locations = Array.isArray(window.calendarLocations) ? window.calendarLocations : [];
    state.loadedRange = normalizeRange(window.calendarCalendarRange);
    state.birthdayWindow = normalizeBirthdayWindow(window.calendarBirthdayWindow);

    const urlState = getUrlState();
    state.view = urlState.view;

    if (urlState.eventTypes !== null) {
        state.selectedEventTypes = urlState.eventTypes;
    }

    if (urlState.locationIds !== null) {
        state.selectedLocationIds = urlState.locationIds;
    }

    if (isValidDate(urlState.date)) {
        setSelectedDate(urlState.date);
    } else if (!state.date) {
        setSelectedDate(getTodayDate());
    } else {
        state.miniDate = cloneDate(state.date);
    }

    if (state.view === 'week' && isValidDate(urlState.windowStart)) {
        state.scheduleWindowStart = cloneDate(urlState.windowStart);
        state.date = cloneDate(state.scheduleWindowStart);
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

    if (calendarCreateLesson) {
        calendarCreateLesson.addEventListener('click', function() {
            openCalendarCreateModal('create-calendar-lesson-plan-modal');
        });
    }

    if (calendarCreateStudent) {
        calendarCreateStudent.addEventListener('click', function() {
            openCalendarCreateModal('create-student-modal');
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

        const defaultEventTypes = ['recurring', 'single', 'general', 'google'];
        const eventTypeFilterIsActive = state.selectedEventTypes.includes('canceled')
            || defaultEventTypes.some(function(type) {
                return !state.selectedEventTypes.includes(type);
            });

        const filterIsActive = Boolean(isLocationFilterActive() || eventTypeFilterIsActive);

        calendarFilter.toggleAttribute('selected', filterIsActive);

        if (calendarFilterReset) {
            calendarFilterReset.disabled = !filterIsActive;
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

    const resetCalendarFilters = function() {
        if (locationFilters) {
            locationFilters.querySelectorAll('input[data-calendar-location-filter]').forEach(function(input) {
                input.checked = true;
            });
            syncLocationFilterState();
        }

        if (eventTypeFilters) {
            eventTypeFilters.querySelectorAll('input[data-calendar-event-type-filter]').forEach(function(input) {
                input.checked = ['recurring', 'single', 'general', 'google'].includes(input.value);
            });
            syncEventTypeFilterState();
        }

        render();
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
            input.checked = urlState.locationIds === null
                || state.selectedLocationIds.includes(normalizeLocationId(location.id));
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
        state.scheduleWindowStart = null;
        state.didAutoNowScroll = false;
        syncViewControls();
        render();
    };

    const navigateScheduleHeaderByArrow = bindScheduleHeaderDrag(calendar, function(dayOffset, preview) {
        if (!dayOffset || isScheduleHoldNavigationSuppressed()) {
            if (preview) {
                removeScheduleHeaderDragPreview(preview);
            }
            return;
        }

        const schedule = calendar.querySelector('.lm-schedule');
        const nextStart = addDays(getVisibleScheduleDates()[0], dayOffset);
        const keepRollingWeek = state.view === 'week';

        if (state.pendingScheduleHeaderPreview
            && state.pendingScheduleHeaderPreview !== preview) {
            removeScheduleHeaderDragPreview(state.pendingScheduleHeaderPreview);
        }
        state.pendingScheduleHeaderPreview = preview;
        state.pendingScheduleScrollTop = schedule ? schedule.scrollTop : null;
        setSelectedDate(nextStart);
        if (keepRollingWeek) {
            state.scheduleWindowStart = cloneDate(nextStart);
        }
        state.didAutoNowScroll = true;
        window.clearTimeout(scheduleHeaderRenderTimer);
        scheduleHeaderRenderTimer = window.setTimeout(function() {
            scheduleHeaderRenderTimer = null;
            render();
        }, 300);
    });

    const useScheduleHeaderNavigation = function() {
        return scheduleGridViews.includes(state.view);
    };

    const navigateCalendarByArrow = function(direction) {
        if (!direction || isScheduleHoldNavigationSuppressed()) {
            return false;
        }

        if (useScheduleHeaderNavigation()) {
            return navigateScheduleHeaderByArrow(direction);
        }

        move(direction);
        render();

        return true;
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
        if (studentSearch && studentSearch.value.trim() !== '') {
            return;
        }

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

    const scrollScheduleToDay = function(agenda, target, behavior = 'auto') {
        const firstItem = agenda ? agenda.firstElementChild : null;

        if (!agenda || !firstItem || !target) {
            return;
        }

        const precedingMonthBar = target.previousElementSibling
            && target.previousElementSibling.classList.contains('calendar-schedule-month-bar')
            ? target.previousElementSibling
            : null;
        const scrollTarget = behavior === 'auto' && precedingMonthBar
            ? precedingMonthBar
            : target;

        agenda.scrollTo({
            behavior,
            top: Math.max(0, scrollTarget.offsetTop - firstItem.offsetTop),
        });

        if (behavior !== 'smooth') {
            syncScheduleLabelToScroll(agenda);
        }
    };

    const scrollScheduleToSelectedDate = function(agenda) {
        if (!agenda) {
            return;
        }

        const selected = toDateString(state.date || getTodayDate());
        const firstDay = agenda.querySelector('.calendar-schedule-day');
        const target = agenda.querySelector(`.calendar-schedule-day[data-date="${selected}"]`)
            || agenda.querySelector(`.calendar-schedule-day[data-date="${todayString()}"]`)
            || firstDay;

        if (!target) {
            return;
        }

        scrollScheduleToDay(agenda, target);
    };

    const bindScheduleAgenda = function(agenda) {
        if (!agenda) {
            return;
        }

        agenda.addEventListener('scroll', function() {
            queueScheduleLabelSync(agenda);
        }, { passive: true });

        agenda.addEventListener('click', function(e) {
            const dateRail = e.target.closest('.calendar-schedule-date');
            const day = dateRail ? dateRail.closest('.calendar-schedule-day') : null;

            if (!day) {
                return;
            }

            scrollScheduleToDay(agenda, day, 'smooth');
        });

        requestAnimationFrame(function() {
            scrollScheduleToSelectedDate(agenda);
        });
    };

    const render = function(options) {
        const renderMode = options && options.mode === 'discreet' ? 'discreet' : 'animated';

        state.calendarRenderMode = renderMode;

        if (scheduleHeaderRenderTimer !== null) {
            window.clearTimeout(scheduleHeaderRenderTimer);
            scheduleHeaderRenderTimer = null;
        }

        const visibleRange = getVisibleDateRange();

        syncViewControls();
        updateCalendarUrl();

        if (!isRangeLoaded(visibleRange)) {
            calendar.classList.add('calendar-schedule-range-transitioning');
            fetchPlannedLessons(visibleRange).then(function() {
                if (isRangeLoaded(getVisibleDateRange())) {
                    render({ mode: renderMode });
                }
            });

            return;
        }

        calendar.classList.remove('calendar-schedule-range-transitioning');

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
            if (state.pendingScheduleHeaderPreview) {
                const preview = state.pendingScheduleHeaderPreview;
                const settleGeneration = preview.settleGeneration;

                state.pendingScheduleHeaderPreview = null;
                Promise.resolve(preview.settledPromise).then(function() {
                    requestAnimationFrame(function() {
                        if (preview.settleGeneration === settleGeneration
                            && !preview.isBeingDragged) {
                            removeScheduleHeaderDragPreview(preview);
                        }
                    });
                });
            }
            if (state.pendingScheduleScrollTop !== null) {
                const schedule = calendar.querySelector('.lm-schedule');

                if (schedule) {
                    schedule.scrollTop = state.pendingScheduleScrollTop;
                }
                state.pendingScheduleScrollTop = null;
            }

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
            render({ mode: 'discreet' });

            requestAnimationFrame(function() {
                const refreshedSchedule = calendar.querySelector('.lm-schedule');

                if (refreshedSchedule) {
                    refreshedSchedule.scrollTop = scrollTop;
                    refreshedSchedule.scrollLeft = scrollLeft;
                }
            });
        });
    };

    let calendarInactiveAt = document.hidden ? Date.now() : null;
    let staleCalendarRecovery = null;

    const unlockCalendarMutationForms = function() {
        document.querySelectorAll('#calendar-event-modal form, #calendar-edit-modal-container form').forEach(function(form) {
            setFormSubmitting(form, false);
        });
    };

    const markCalendarInactive = function() {
        if (calendarInactiveAt === null) {
            calendarInactiveAt = Date.now();
        }
    };

    const recoverStaleCalendar = function(force) {
        const inactiveAt = calendarInactiveAt;

        calendarInactiveAt = null;

        if (!force && (inactiveAt === null || Date.now() - inactiveAt < calendarStaleAfterMilliseconds)) {
            return Promise.resolve();
        }

        if (staleCalendarRecovery) {
            return staleCalendarRecovery;
        }

        const eventModalWasOpen = Boolean(calendarEventModal && calendarEventModal.classList.contains('show'));
        const eventGuid = eventModalWasOpen ? calendarEventModal.dataset.eventGuid : '';
        const eventModalType = eventModalWasOpen ? calendarEventModal.dataset.eventModalType : '';

        state.calendarFetchId += 1;
        state.loadedRange = null;
        state.pendingRangeKey = null;
        cancelPendingCalendarRequests();
        unlockCalendarMutationForms();

        if (eventModalWasOpen) {
            resetLessonModalButtons(calendarEventModal);
        }

        staleCalendarRecovery = refreshCalendarAfterLessonMutation()
            .then(function() {
                if (!eventModalWasOpen || !eventGuid) {
                    return;
                }

                const refreshedEvent = getEventByGuid(eventGuid);

                if (!refreshedEvent) {
                    hideBootstrapModal(calendarEventModal);
                    return;
                }

                if (eventModalType === 'general' || refreshedEvent.isGeneralEvent) {
                    openGeneralEventModal(refreshedEvent);
                    return;
                }

                openLessonModal(refreshedEvent);
            })
            .catch(function(error) {
                if (error && error.name !== 'AbortError') {
                    console.error('Unable to refresh the calendar after inactivity.', error);
                }
            })
            .finally(function() {
                unlockCalendarMutationForms();
                staleCalendarRecovery = null;
            });

        return staleCalendarRecovery;
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
            navigateCalendarByArrow(-1);
        });
    }

    if (next) {
        next.addEventListener('click', function() {
            navigateCalendarByArrow(1);
        });
    }

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

    if (calendarFilterReset) {
        calendarFilterReset.addEventListener('click', resetCalendarFilters);
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

            const updatedItem = lessonModal && lessonModal.updatedScheduleItem;

            if (updatedItem
                && updatedItem.hasAttribute('updated-event')
                && updatedItem.scheduleOriginalPosition) {
                restoreUpdatedScheduleItem(updatedItem);
                lessonModal.updatedScheduleItem = null;
                openLessonModal(updatedItem.event);
                return;
            }

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
        const duplicateButton = generalEventModal.querySelector('#event-duplicate');
        const editButton = generalEventModal.querySelector('#event-edit');
        const revertButton = generalEventModal.querySelector('#event-revert');
        const notesEditButton = generalEventModal.querySelector('[data-general-event-notes-edit]');
        const notesCancelButton = generalEventModal.querySelector('[data-general-event-notes-cancel]');
        const notesForm = generalEventModal.querySelector('[data-general-event-notes-form]');
        const notesInput = generalEventModal.querySelector('[data-general-event-notes-input]');
        const rescheduleButton = generalEventModal.querySelector('#reschedule-general-event-button');
        const rescheduleForm = generalEventModal.querySelector('#reschedule-general-event form');
        const reschedulePrevious = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-prev]');
        const rescheduleNext = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-next]');
        const rescheduleGrid = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-grid]');
        const rescheduleDate = generalEventModal.querySelector('#reschedule-general-event-date');
        const rescheduleStartTime = generalEventModal.querySelector('#reschedule-general-event-start-time');
        const rescheduleEndTime = generalEventModal.querySelector('#reschedule-general-event-end-time');

        if (duplicateButton) {
            duplicateButton.addEventListener('click', function(e) {
                e.preventDefault();
                openDuplicateGeneralEventModal(generalEventModal.generalEvent, generalEventModal);
            });
        }

        if (editButton) {
            editButton.addEventListener('click', function(e) {
                e.preventDefault();
                loadCalendarEditModal(editButton, generalEventModal, calendarEditModalContainer);
            });
        }

        if (revertButton) {
            revertButton.addEventListener('click', function(e) {
                e.preventDefault();

                const updatedItem = generalEventModal && generalEventModal.updatedScheduleItem;

                if (updatedItem
                    && updatedItem.hasAttribute('updated-event')
                    && updatedItem.scheduleOriginalPosition) {
                    restoreUpdatedScheduleItem(updatedItem);
                    generalEventModal.updatedScheduleItem = null;
                    openGeneralEventModal(updatedItem.event);
                    return;
                }

                revertGeneralEventAction(revertButton, refreshCalendarAfterLessonMutation);
            });
        }

        if (notesEditButton) {
            notesEditButton.addEventListener('click', function(e) {
                e.preventDefault();
                setGeneralEventNotesEditing(generalEventModal, true);
            });
        }

        if (notesCancelButton) {
            notesCancelButton.addEventListener('click', function(e) {
                e.preventDefault();

                if (notesInput) {
                    notesInput.value = generalEventModal.generalEvent
                        ? (generalEventModal.generalEvent.notes || '')
                        : '';
                }

                clearGeneralEventActionError(generalEventModal);
                setGeneralEventNotesEditing(generalEventModal, false);
            });
        }

        if (notesForm) {
            notesForm.addEventListener('submit', function(e) {
                e.preventDefault();
                submitGeneralEventNotes(generalEventModal, notesForm);
            });
        }

        if (rescheduleButton) {
            rescheduleButton.addEventListener('click', function() {
                showGeneralEventRescheduleForm(generalEventModal);
            });
        }

        [rescheduleForm].filter(Boolean).forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitGeneralEventModalForm(form, refreshCalendarAfterLessonMutation);
            });
        });

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

    if (calendarEventModal) {
        const conflictToggleButton = calendarEventModal.querySelector('[data-conflict-toggle]');

        if (conflictToggleButton) {
            conflictToggleButton.addEventListener('click', function(e) {
                e.preventDefault();

                const action = conflictToggleButton.dataset.conflictAction;
                const eventKey = conflictToggleButton.dataset.eventKey || '';
                let conflictingEventKeys = [];

                try {
                    conflictingEventKeys = JSON.parse(conflictToggleButton.dataset.conflictingEventKeys || '[]');
                } catch (error) {
                    conflictingEventKeys = [];
                }

                const url = action === 'show'
                    ? window.calendarConflictExceptionsDestroyUrl
                    : window.calendarConflictExceptionsStoreUrl;

                if (!url || !eventKey || !conflictingEventKeys.length) {
                    return;
                }

                conflictToggleButton.disabled = true;
                clearLessonActionError(calendarEventModal);
                clearGeneralEventActionError(calendarEventModal);

                requestJson(url, {
                    method: action === 'show' ? 'DELETE' : 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': window.calendarCsrfToken || '',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({
                        event_key: eventKey,
                        conflicting_event_keys: conflictingEventKeys,
                    }),
                }, action === 'show' ? 'Unable to show this conflict.' : 'Unable to ignore this conflict.')
                    .then(function(payload) {
                        setIgnoredConflictPairs(payload.ignored_conflicts);
                        render({ mode: 'discreet' });

                        const event = getEventByGuid(calendarEventModal.dataset.eventGuid);
                        updateConflictToggle(calendarEventModal, event);
                    })
                    .catch(function(error) {
                        console.error(error);
                        conflictToggleButton.disabled = false;

                        if (calendarEventModal.dataset.eventModalType === 'lesson') {
                            showLessonActionError(calendarEventModal, error.message);
                        } else {
                            showGeneralEventActionError(calendarEventModal, error.message);
                        }
                    });
            });
        }

        const resetCalendarEventModal = function() {
            calendarEventModal.updatedScheduleItem = null;
            calendarEventModal.generalEvent = null;
            resetLessonModalState(calendarEventModal);
            resetGeneralEventModalState(calendarEventModal);
        };

        calendarEventModal.addEventListener('hidden.bs.modal', resetCalendarEventModal);

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(calendarEventModal).on('hidden.bs.modal', resetCalendarEventModal);
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

    const getScheduleItemCopyType = function(item) {
        const event = item && item.event;

        if (!event
            || event.readOnly
            || event.externalProvider
            || event.isHoliday
            || event.isBreak
            || event.isRecital
            || item.hasAttribute('data-pending-event-copy')) {
            return '';
        }

        if (event.isGeneralEvent) {
            return 'general';
        }

        return event.studentId || event.lessonPlanId || event.singleLessonPlanId
            ? 'lesson'
            : '';
    };

    const canCopyScheduleItem = function(item) {
        return Boolean(getScheduleItemCopyType(item));
    };

    const setScheduleHoldCopyMode = function(hold, shouldCopy) {
        if (!hold) {
            return;
        }

        hold.copyModeRequested = Boolean(shouldCopy);
        hold.copyMode = Boolean(shouldCopy && canCopyScheduleItem(hold.item));

        if (!hold.active || !hold.clone) {
            return;
        }

        hold.clone.toggleAttribute('copying-event', hold.copyMode);
        hold.item.toggleAttribute('original-event', !hold.copyMode);

        const existingIndicator = hold.clone.querySelector(':scope > .calendar-schedule-copy-indicator');

        if (!hold.copyMode) {
            if (existingIndicator) {
                existingIndicator.remove();
            }

            if (hold.schedule) {
                hold.schedule.style.cursor = 'move';
            }
            return;
        }

        if (!existingIndicator) {
            const indicator = document.createElement('span');

            indicator.className = 'calendar-schedule-copy-indicator';
            indicator.setAttribute('aria-hidden', 'true');
            indicator.innerHTML = '<i class="fas fa-copy"></i>';
            hold.clone.appendChild(indicator);
        }

        if (hold.schedule) {
            hold.schedule.style.cursor = 'copy';
        }
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
        if (original.eventScheduleSourceDate === undefined) {
            delete item.event.scheduleSourceDate;
        } else {
            item.event.scheduleSourceDate = original.eventScheduleSourceDate;
        }
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

    const applyScheduleCopyDrop = function(hold, target, start, end, date, weekday) {
        if (!hold.copyMode || !canCopyScheduleItem(hold.item)) {
            return false;
        }

        const clone = hold.clone;
        const sourceEvent = hold.item.event;
        const copyType = getScheduleItemCopyType(hold.item);
        const guid = `pending-${copyType}-copy-${Date.now()}-${pendingEventCopySequence += 1}`;
        const copiedEvent = Object.assign({}, sourceEvent, {
            guid,
            id: null,
            date,
            start,
            end,
            weekday,
            editUrl: '',
            rescheduleUrl: '',
            revertUrl: '',
        });

        delete copiedEvent.originalDate;
        delete copiedEvent.originalStartTime;
        delete copiedEvent.scheduleSourceDate;

        clone.removeAttribute('holding-event');
        clone.removeAttribute('copying-event');
        clone.removeAttribute('aria-hidden');
        clone.querySelector(':scope > .calendar-schedule-copy-indicator')?.remove();
        clone.setAttribute('data-pending-event-copy', copyType);
        clone.dataset.eventGuid = guid;
        clone.event = copiedEvent;
        clone.start = start;
        clone.end = end;
        clone.date = date;
        clone.weekday = weekday;
        target.appendChild(clone);

        hold.pendingCopy = clone;
        hold.clone = null;

        return true;
    };

    const applyScheduleVisualDrop = function(hold) {
        if (!hold || !hold.commitVisualDrop || !hold.clone || !hold.item || !hold.item.event) {
            return;
        }

        const target = hold.clone.parentElement;

        if (!target || target.tagName !== 'TD' || !hold.schedule || !hold.schedule.contains(target)) {
            return;
        }

        const start = hold.clone.getAttribute('data-start') || hold.clone.start;
        const end = hold.clone.getAttribute('data-end') || hold.clone.end;
        const date = target.getAttribute('data-real-date')
            || target.getAttribute('data-date')
            || hold.clone.date;
        const weekday = hold.clone.weekday;

        if (applyScheduleCopyDrop(hold, target, start, end, date, weekday)) {
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
                eventScheduleSourceDate: hold.item.event.scheduleSourceDate,
                visibleDate: hold.originCell.getAttribute('data-real-date')
                    || hold.originCell.getAttribute('data-date'),
                eventOriginalDate: hold.item.event.originalDate,
                eventOriginalStartTime: hold.item.event.originalStartTime,
            };
        }

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
            if (hold.item.event.scheduleSourceDate) {
                hold.item.event.scheduleSourceDate = date;
            }
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
            || item.hasAttribute('data-read-only')
            || item.hasAttribute('data-pending-event-copy')
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
            copyMode: false,
            copyModeRequested: Boolean(e.metaKey || scheduleCopyModifierPressed),
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
                setScheduleHoldCopyMode(scheduleItemHold, scheduleItemHold.copyModeRequested);
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
            if (scheduleItemHold.pointerType === 'mouse') {
                setScheduleHoldCopyMode(
                    scheduleItemHold,
                    Boolean(scheduleCopyModifierPressed || e.metaKey)
                );
            }
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

    document.addEventListener('mouseup', function(e) {
        if (scheduleItemHold && scheduleItemHold.active) {
            if (scheduleItemHold.pointerType === 'mouse') {
                setScheduleHoldCopyMode(
                    scheduleItemHold,
                    Boolean(scheduleCopyModifierPressed || e.metaKey)
                );
            }
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
        scheduleCopyModifierPressed = false;
        clearScheduleItemHold();
    });

    document.addEventListener('keydown', function(e) {
        if ((e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')
            || e.metaKey
            || e.ctrlKey
            || e.altKey
            || e.shiftKey
            || !useScheduleHeaderNavigation()
            || isScheduleHoldNavigationSuppressed()
            || document.querySelector('.modal.show, .offcanvas.show, dialog[open]')) {
            return;
        }

        const target = e.target;

        if (target && target.closest('input, textarea, select, [contenteditable="true"]')) {
            return;
        }

        if (navigateCalendarByArrow(e.key === 'ArrowLeft' ? -1 : 1)) {
            e.preventDefault();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Meta') {
            return;
        }

        scheduleCopyModifierPressed = true;

        if (scheduleItemHold) {
            setScheduleHoldCopyMode(scheduleItemHold, scheduleCopyModifierPressed);
        }
    });

    document.addEventListener('keyup', function(e) {
        if (e.key !== 'Meta') {
            return;
        }

        scheduleCopyModifierPressed = false;

        if (scheduleItemHold) {
            setScheduleHoldCopyMode(scheduleItemHold, scheduleCopyModifierPressed);
        }
    });

    const getScheduleItemFromCalendarClick = function(e) {
        const directItem = e.target.closest('.lm-schedule-item');

        if (directItem) {
            return directItem;
        }

        const day = e.target.closest('.lm-schedule tbody td[data-date]');

        if (!day || !Number.isFinite(e.clientX) || !Number.isFinite(e.clientY)) {
            return null;
        }

        const containsPoint = function(element) {
            const rect = element.getBoundingClientRect();

            return e.clientX >= rect.left
                && e.clientX <= rect.right
                && e.clientY >= rect.top
                && e.clientY <= rect.bottom;
        };
        const candidates = Array.from(day.querySelectorAll('.lm-schedule-item')).filter(function(item) {
            return containsPoint(item)
                || Array.from(item.querySelectorAll(':scope > .calendar-schedule-travel')).some(containsPoint);
        });

        return candidates.reduce(function(topItem, item) {
            if (!topItem) {
                return item;
            }

            const topZIndex = Number.parseInt(window.getComputedStyle(topItem).zIndex, 10) || 0;
            const itemZIndex = Number.parseInt(window.getComputedStyle(item).zIndex, 10) || 0;

            return itemZIndex >= topZIndex ? item : topItem;
        }, null);
    };

    calendar.addEventListener('click', function(e) {
        if (isScheduleHoldNavigationSuppressed()) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        const day = e.target.closest('.lm-schedule tbody td[data-date]');
        const scheduleItem = getScheduleItemFromCalendarClick(e);

        if (!day || !['2-days', 'week'].includes(state.view) || scheduleItem) {
            return;
        }

        setSelectedDate(parseDateString(day.dataset.realDate || day.dataset.date));
        state.view = 'day';
        render();
    });

    calendar.addEventListener('click', function(e) {
        const item = e.target.closest('.calendar-month-event, .calendar-schedule-event, .calendar-schedule-break, .calendar-schedule-recital, .calendar-schedule-google-all-day')
            || getScheduleItemFromCalendarClick(e);

        if (!item || item.classList.contains('calendar-month-event-holiday') || item.classList.contains('calendar-schedule-event-holiday')) {
            return;
        }

        if (item.hasAttribute('holding-event')) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        if (item.hasAttribute('data-pending-event-copy')) {
            e.preventDefault();
            e.stopPropagation();
            const copiedEvent = getEventByScheduleItem(item);

            if (item.dataset.pendingEventCopy === 'lesson') {
                openDuplicateSingleLessonModal(copiedEvent);
            } else {
                openDuplicateGeneralEventModal(copiedEvent, null, {
                    preserveDate: true,
                });
            }
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
            openRecitalModal(event, {
                scheduleItem: item,
            });
            return;
        }

        if (event && event.isGeneralEvent) {
            openGeneralEventModal(event, {
                openReschedule: Boolean(updatedItem),
                updatedItem,
                scheduleItem: item,
            });
            return;
        }

        openLessonModal(event, {
            openReschedule: Boolean(updatedItem),
            updatedItem,
            scheduleItem: item,
        });
    });

    const monthDayEventsModal = document.getElementById('month-day-events-modal');

    if (monthDayEventsModal) {
        monthDayEventsModal.addEventListener('click', function(e) {
            const item = e.target.closest('.calendar-month-event, .calendar-schedule-break, .calendar-schedule-recital, .calendar-schedule-google-all-day');

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

    if (urlState.eventTypes !== null && eventTypeFilters) {
        eventTypeFilters.querySelectorAll('input[data-calendar-event-type-filter]').forEach(function(input) {
            input.checked = state.selectedEventTypes.includes(input.value);
        });
    }

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
            markCalendarInactive();
            stopSchedulePointerClock();
            return;
        }

        updateSchedulePointerClock();
        recoverStaleCalendar(false);
    });

    window.addEventListener('pagehide', markCalendarInactive);
    window.addEventListener('pageshow', function(event) {
        recoverStaleCalendar(Boolean(event.persisted));
    });

    updateSchedulePointerClock();
});
