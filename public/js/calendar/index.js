/******/ (() => { // webpackBootstrap
/*!****************************************!*\
  !*** ./resources/js/calendar/index.js ***!
  \****************************************/
var calendarjs = window.calendarjs;
var state = {
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
  suppressNextScheduleAnimation: false
};
var calendarTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
var monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  timeZone: calendarTimeZone,
  year: 'numeric'
});
var shortMonthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: calendarTimeZone
});
var birthdayMonthFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  timeZone: calendarTimeZone
});
var dayFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  timeZone: calendarTimeZone,
  year: 'numeric'
});
var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthWeekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var calendarViews = ['schedule', 'day', '2-days', 'week', 'month'];
var scheduleStart = '07:00';
var scheduleEnd = '22:00';
var sidebarHiddenQuery = '(max-width: 1000px)';
var dayMilliseconds = 24 * 60 * 60 * 1000;
var scheduleGridViews = ['day', '2-days', 'week'];
var createLocalDate = function createLocalDate(year, month, day) {
  return new Date(year, month, day, 12, 0, 0, 0);
};
var toDateString = function toDateString(date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  return "".concat(year, "-").concat(month, "-").concat(day);
};
var todayString = function todayString() {
  return toDateString(getTodayDate());
};
var parseDateString = function parseDateString(value) {
  var parts = String(value).split('-').map(Number);
  return createLocalDate(parts[0], parts[1] - 1, parts[2]);
};
var isDateString = function isDateString(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
};
var isValidDate = function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
};
var normalizeBirthdayWindow = function normalizeBirthdayWindow(value) {
  var windowDays = Number(value);
  return Number.isFinite(windowDays) && windowDays >= 0 ? Math.floor(windowDays) : 5;
};
var parseUrlDate = function parseUrlDate(value) {
  if (!isDateString(value)) {
    return null;
  }
  var date = parseDateString(value);
  return toDateString(date) === value ? date : null;
};
var parseNullableDateString = function parseNullableDateString(value) {
  return value ? parseDateString(String(value).substring(0, 10)) : null;
};
var getDefaultCalendarView = function getDefaultCalendarView() {
  var isMobile = window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches;
  var configuredView = isMobile ? window.calendarDefaultMobileCalendarView : window.calendarDefaultDesktopCalendarView;
  if (calendarViews.includes(configuredView)) {
    return configuredView;
  }
  return isMobile ? '2-days' : 'week';
};
var isSidebarHiddenViewport = function isSidebarHiddenViewport() {
  return window.matchMedia && window.matchMedia(sidebarHiddenQuery).matches;
};
var getUrlState = function getUrlState() {
  var params = new URLSearchParams(window.location.search);
  var requestedView = params.get('view');
  var view = requestedView === '3-days' ? '2-days' : requestedView;
  var date = params.get('date');
  return {
    view: calendarViews.includes(view) ? view : getDefaultCalendarView(),
    date: parseUrlDate(date)
  };
};
var updateCalendarUrl = function updateCalendarUrl() {
  var url = new URL(window.location.href);
  url.searchParams.set('view', state.view);
  url.searchParams.set('date', toDateString(state.date));
  window.history.replaceState({
    calendarView: state.view,
    calendarDate: toDateString(state.date)
  }, '', url);
};
var normalizeRange = function normalizeRange(range) {
  if (!range || !range.start || !range.end) {
    return null;
  }
  var start = typeof range.start === 'string' ? range.start : toDateString(range.start);
  var end = typeof range.end === 'string' ? range.end : toDateString(range.end);
  return {
    start: start,
    end: end
  };
};
var getRangeKey = function getRangeKey(range) {
  var normalizedRange = normalizeRange(range);
  return normalizedRange ? "".concat(normalizedRange.start, ":").concat(normalizedRange.end) : '';
};
var isRangeLoaded = function isRangeLoaded(range) {
  return getRangeKey(state.loadedRange) === getRangeKey(range);
};
var getTodayDate = function getTodayDate() {
  var now = new Date();
  return createLocalDate(now.getFullYear(), now.getMonth(), now.getDate());
};
var setSelectedDate = function setSelectedDate(date) {
  state.date = cloneDate(date);
  state.miniDate = cloneDate(state.date);
  state.didAutoNowScroll = false;
};
var getVisibleDateRange = function getVisibleDateRange() {
  if (state.view === 'schedule') {
    var _start = createLocalDate(state.date.getFullYear(), state.date.getMonth() - 1, 1);
    var end = createLocalDate(state.date.getFullYear(), state.date.getMonth() + 5, 0);
    return {
      start: _start,
      end: end
    };
  }
  if (state.view === 'day') {
    return {
      start: cloneDate(state.date),
      end: cloneDate(state.date)
    };
  }
  if (state.view === '2-days') {
    return {
      start: cloneDate(state.date),
      end: addDays(state.date, 1)
    };
  }
  if (state.view === 'week') {
    var _start2 = startOfWeek(state.date);
    return {
      start: _start2,
      end: addDays(_start2, 6)
    };
  }
  if (state.view === 'month') {
    var _start3 = startOfMonthGrid(state.date);
    return {
      start: _start3,
      end: addDays(_start3, 41)
    };
  }
  var start = startOfWeek(state.date);
  return {
    start: start,
    end: addDays(start, 6)
  };
};
var getCalendarEventRange = function getCalendarEventRange() {
  if (state.view === 'schedule') {
    return getVisibleDateRange();
  }
  var year = state.date.getFullYear();
  return {
    start: createLocalDate(year - 1, 0, 1),
    end: createLocalDate(year + 1, 11, 31)
  };
};
var fetchPlannedLessons = function fetchPlannedLessons(range) {
  var normalizedRange = normalizeRange(range);
  if (!normalizedRange) {
    return Promise.resolve();
  }
  var rangeKey = getRangeKey(normalizedRange);
  if (state.pendingRangeKey === rangeKey) {
    return Promise.resolve();
  }
  var url = new URL(window.location.href);
  url.searchParams.set('view', state.view);
  url.searchParams.set('date', toDateString(state.date));
  url.searchParams.set('range_start', normalizedRange.start);
  url.searchParams.set('range_end', normalizedRange.end);
  url.searchParams.set('lesson_plans', '1');
  state.pendingRangeKey = rangeKey;
  state.calendarFetchId += 1;
  var fetchId = state.calendarFetchId;
  return fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Unable to load calendar lessons.');
    }
    return response.json();
  }).then(function (payload) {
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
  })["catch"](function (error) {
    if (fetchId !== state.calendarFetchId) {
      return;
    }
    console.error(error);
    state.loadedRange = normalizedRange;
  })["finally"](function () {
    if (state.pendingRangeKey === rangeKey && fetchId === state.calendarFetchId) {
      state.pendingRangeKey = null;
    }
  });
};
var getVisibleScheduleDates = function getVisibleScheduleDates() {
  return getScheduleDatesForAnchor(state.date, state.view);
};
var getScheduleDatesForAnchor = function getScheduleDatesForAnchor(anchor, view) {
  if (view === 'day') {
    return [cloneDate(anchor)];
  }
  if (view === '2-days') {
    return Array.from({
      length: 2
    }, function (_, index) {
      return addDays(anchor, index);
    });
  }
  var start = startOfWeek(anchor);
  return Array.from({
    length: 7
  }, function (_, index) {
    return addDays(start, index);
  });
};
var getTwoDaysBackingStart = function getTwoDaysBackingStart() {
  return startOfWeek(state.date);
};
var getTwoDaysBackingDateForIndex = function getTwoDaysBackingDateForIndex(index) {
  return addDays(getTwoDaysBackingStart(), index);
};
var getTwoDaysBackingDateForVisibleDate = function getTwoDaysBackingDateForVisibleDate(dateString) {
  var visibleIndex = getVisibleScheduleDates().map(toDateString).indexOf(String(dateString).substring(0, 10));
  if (visibleIndex < 0) {
    return null;
  }
  return toDateString(getTwoDaysBackingDateForIndex(visibleIndex));
};
var getScheduleDateForGridIndex = function getScheduleDateForGridIndex(index) {
  if (state.view === '2-days') {
    var visibleDates = getVisibleScheduleDates();
    return visibleDates[index] ? cloneDate(visibleDates[index]) : getTwoDaysBackingDateForIndex(index);
  }
  if (state.view === 'week') {
    return addDays(startOfWeek(state.date), index);
  }
  return getVisibleScheduleDates()[index] ? cloneDate(getVisibleScheduleDates()[index]) : null;
};
var getScheduleGridDates = function getScheduleGridDates() {
  var length = state.view === 'day' ? 1 : 7;
  return Array.from({
    length: length
  }, function (_, index) {
    return getScheduleDateForGridIndex(index);
  }).filter(Boolean);
};
var getDateRangeDates = function getDateRangeDates(range) {
  var dates = [];
  if (!range || !range.start || !range.end) {
    return dates;
  }
  for (var date = cloneDate(range.start); date <= range.end; date = addDays(date, 1)) {
    dates.push(date);
  }
  return dates;
};
var getScheduleValue = function getScheduleValue() {
  if (state.view === '2-days') {
    return toDateString(addDays(getTwoDaysBackingStart(), 1));
  }
  if (scheduleGridViews.includes(state.view)) {
    return toDateString(addDays(state.date, 1));
  }
  return toDateString(state.date);
};
var patchScheduleHeaders = function patchScheduleHeaders(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var headerRow = schedule ? schedule.querySelector('thead tr:not(.calendar-schedule-holiday-row)') : null;
  var headers = headerRow ? headerRow.querySelectorAll('td') : [];
  var firstScheduleRow = schedule ? schedule.querySelector('tbody tr') : null;
  var columns = firstScheduleRow ? firstScheduleRow.querySelectorAll('td[data-date]') : [];
  var gridDates = getScheduleGridDates();
  headers.forEach(function (header) {
    header.removeAttribute('data-selected');
    header.removeAttribute('data-real-date');
    header.classList.remove('calendar-schedule-hidden-column');
  });
  columns.forEach(function (column, index) {
    var date = gridDates[index];
    if (!date) {
      return;
    }
    var dateString = toDateString(date);
    var columnX = column.getAttribute('data-x');
    var header = headers[index + 1];
    var isHidden = state.view === '2-days' && index > 1;
    schedule.querySelectorAll("tbody td[data-x=\"".concat(columnX, "\"]")).forEach(function (cell) {
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
var formatScheduleHour = function formatScheduleHour(value) {
  var text = String(value).trim();
  var match = text.match(/^(\d{1,2})(?::\d{2})/);
  if (!match) {
    return text;
  }
  var hour = Number(match[1]);
  var period = hour >= 12 ? 'PM' : 'AM';
  var displayHour = hour % 12 || 12;
  return "".concat(displayHour, " ").concat(period);
};
var patchScheduleTimeLabels = function patchScheduleTimeLabels(calendar) {
  calendar.querySelectorAll('.lm-schedule-index').forEach(function (label) {
    var time = label.dataset.scheduleTime || label.textContent;
    label.dataset.scheduleTime = time;
    label.textContent = getTimeMinutes(time) === getTimeMinutes(scheduleStart) ? '' : formatScheduleHour(time);
    label.setAttribute('aria-hidden', getTimeMinutes(time) === getTimeMinutes(scheduleStart) ? 'true' : 'false');
  });
};
var getTimeMinutes = function getTimeMinutes(value) {
  var match = String(value || '').match(/^(\d{1,2}):(\d{2})/);
  if (!match) {
    return 0;
  }
  return Number(match[1]) * 60 + Number(match[2]);
};
var isEventInsideScheduleWindow = function isEventInsideScheduleWindow(event) {
  var start = getTimeMinutes(event.start);
  return start >= getTimeMinutes(scheduleStart) && start < getTimeMinutes(scheduleEnd);
};
var getEventDurationMinutes = function getEventDurationMinutes(event) {
  if (!event || !event.start || !event.end) {
    return 30;
  }
  return Math.max(15, getTimeMinutes(event.end) - getTimeMinutes(event.start));
};
var getAgendaEventHeight = function getAgendaEventHeight(event) {
  var duration = getEventDurationMinutes(event);
  return "".concat(Math.min(10, Math.max(3.75, 2 + duration / 15)), "rem");
};
var normalizeLocationId = function normalizeLocationId(value) {
  var number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
};
var getAllLocationIds = function getAllLocationIds() {
  return state.locations.map(function (location) {
    return normalizeLocationId(location.id);
  }).filter(Boolean);
};
var getSelectedLocationIds = function getSelectedLocationIds() {
  return state.selectedLocationIds;
};
var isLocationFilterActive = function isLocationFilterActive() {
  var allIds = getAllLocationIds();
  return allIds.length && state.selectedLocationIds.length < allIds.length;
};
var locationIsSelected = function locationIsSelected(locationId) {
  var selectedIds = getSelectedLocationIds();
  var normalized = normalizeLocationId(locationId);
  return !normalized || selectedIds.includes(normalized);
};
var eventMatchesLocationFilter = function eventMatchesLocationFilter(event) {
  if (!isLocationFilterActive() || event.isHoliday) {
    return true;
  }
  if (event.isBreak) {
    var locations = Array.isArray(event.locations) ? event.locations : [];
    return !locations.length || locations.some(function (location) {
      return locationIsSelected(location.id);
    });
  }
  return locationIsSelected(event.locationId);
};
var getVisibleCalendarEvents = function getVisibleCalendarEvents() {
  return state.events.filter(isEventInsideScheduleWindow).filter(eventMatchesLocationFilter);
};
var getScheduleRenderEvents = function getScheduleRenderEvents() {
  var events = getVisibleCalendarEvents();
  if (state.view !== '2-days') {
    return events;
  }
  return events.filter(isEventInsideVisibleRange).map(function (event) {
    var backingDate = getTwoDaysBackingDateForVisibleDate(event.date);
    if (!backingDate) {
      return null;
    }
    return Object.assign({}, event, {
      date: backingDate
    });
  }).filter(Boolean);
};
var getVisibleEventsByDate = function getVisibleEventsByDate() {
  if (state.visibleEventsByDate) {
    return state.visibleEventsByDate;
  }
  var eventsByDate = {};
  getVisibleCalendarEvents().forEach(function (event) {
    if (!event || !event.date) {
      return;
    }
    var dateString = String(event.date).substring(0, 10);
    if (!eventsByDate[dateString]) {
      eventsByDate[dateString] = [];
    }
    eventsByDate[dateString].push(event);
  });
  Object.keys(eventsByDate).forEach(function (dateString) {
    eventsByDate[dateString].sort(function (a, b) {
      return String(a.start || '').localeCompare(String(b.start || ''));
    });
  });
  state.visibleEventsByDate = eventsByDate;
  return eventsByDate;
};
var paymentFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 0,
  style: 'currency'
});
var paymentCountUpOptions = {
  decimalPlaces: 0,
  prefix: '$'
};
var randomBetween = function randomBetween(min, max) {
  return min + Math.random() * (max - min);
};
var getEventFeeAmount = function getEventFeeAmount(event) {
  var amount = Number(event && event.feeAmount ? event.feeAmount : 0);
  return Number.isFinite(amount) ? amount : 0;
};
var renderLessonModalTitle = function renderLessonModalTitle(title, event) {
  if (!title) {
    return;
  }
  var feeAmount = getEventFeeAmount(event);
  title.textContent = '';
  title.appendChild(document.createTextNode(event && event.title ? event.title : 'Lesson'));
  if (feeAmount <= 0) {
    return;
  }
  var fee = document.createElement('span');
  fee.className = 'ml-2 opacity-4';
  fee.textContent = paymentFormatter.format(feeAmount / 100);
  title.appendChild(fee);
};
var renderCountTotal = function renderCountTotal(key, element, value, options, fallbackFormatter) {
  if (!element) {
    return;
  }
  var number = Number(value);
  var counter = state.paymentTotalCounters[key];
  var startVal = counter && counter.element === element ? counter.value : Number(element.dataset.countValue || 0);
  var safeStartVal = Number.isFinite(startVal) ? startVal : 0;
  var safeNumber = Number.isFinite(number) ? number : 0;
  var formatter = options && typeof options.formattingFn === 'function' ? options.formattingFn : typeof fallbackFormatter === 'function' ? fallbackFormatter : function (nextValue) {
    return String(nextValue);
  };
  if (counter && counter.frame) {
    cancelAnimationFrame(counter.frame);
  }
  if (Math.abs(safeNumber - safeStartVal) < 0.001) {
    element.textContent = formatter(safeNumber);
    element.dataset.countValue = String(safeNumber);
    state.paymentTotalCounters[key] = {
      element: element,
      frame: null,
      value: safeNumber
    };
    return;
  }
  var duration = Math.round(randomBetween(520, 980));
  var start = window.performance && typeof window.performance.now === 'function' ? window.performance.now() : Date.now();
  var change = safeNumber - safeStartVal;
  var easeOutCubic = function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  };
  var _renderFrame = function renderFrame(now) {
    var elapsed = now - start;
    var progress = Math.min(1, Math.max(0, elapsed / duration));
    var nextValue = safeStartVal + change * easeOutCubic(progress);
    var safeNextValue = Number.isFinite(nextValue) ? nextValue : safeNumber;
    var latest = state.paymentTotalCounters[key];
    if (!latest || latest.element !== element) {
      return;
    }
    element.textContent = formatter(progress >= 1 ? safeNumber : safeNextValue);
    element.dataset.countValue = String(safeNextValue);
    latest.value = safeNextValue;
    if (progress < 1) {
      latest.frame = requestAnimationFrame(_renderFrame);
      return;
    }
    latest.frame = null;
    latest.value = safeNumber;
    element.dataset.countValue = String(safeNumber);
  };
  state.paymentTotalCounters[key] = {
    element: element,
    frame: requestAnimationFrame(_renderFrame),
    value: safeStartVal
  };
};
var renderPaymentTotal = function renderPaymentTotal(key, element, cents) {
  renderCountTotal(key, element, cents / 100, Object.assign({}, paymentCountUpOptions, {
    formattingFn: function formattingFn(value) {
      var number = Number(value);
      return paymentFormatter.format(Number.isFinite(number) ? number : 0);
    }
  }), function (value) {
    var number = Number(value);
    return paymentFormatter.format(Number.isFinite(number) ? number : 0);
  });
};
var formatHoursMinutes = function formatHoursMinutes(minutes) {
  var safeMinutes = Number.isFinite(Number(minutes)) ? Math.round(Number(minutes)) : 0;
  var hours = Math.floor(safeMinutes / 60);
  var remainingMinutes = safeMinutes % 60;
  if (hours && remainingMinutes) {
    return "".concat(hours, "h ").concat(remainingMinutes, "m");
  }
  if (hours) {
    return "".concat(hours, "h");
  }
  if (!remainingMinutes) {
    return '0h';
  }
  return "".concat(remainingMinutes, "m");
};
var formatQuarterHours = function formatQuarterHours(minutes) {
  var safeMinutes = Number.isFinite(Number(minutes)) ? Number(minutes) : 0;
  var hours = Math.round(safeMinutes / 60 * 4) / 4;
  return "".concat(Number(hours.toFixed(2)), "h");
};
var getVisibleAverageHoursDayCount = function getVisibleAverageHoursDayCount() {
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
var isEventInsideVisibleRange = function isEventInsideVisibleRange(event) {
  if (!event || !event.date) {
    return false;
  }
  var range = getVisibleDateRange();
  var date = parseDateString(String(event.date).substring(0, 10));
  return date >= range.start && date <= range.end;
};
var isEventInsidePaymentRange = function isEventInsidePaymentRange(event) {
  if (!event || !event.date) {
    return false;
  }
  if (state.view !== 'month') {
    return isEventInsideVisibleRange(event);
  }
  var date = parseDateString(String(event.date).substring(0, 10));
  var start = createLocalDate(state.date.getFullYear(), state.date.getMonth(), 1);
  var end = createLocalDate(state.date.getFullYear(), state.date.getMonth() + 1, 0);
  return date >= start && date <= end;
};
var getVisiblePaymentEvents = function getVisiblePaymentEvents() {
  return getVisibleCalendarEvents().filter(function (event) {
    if (state.view !== 'schedule') {
      return isEventInsidePaymentRange(event);
    }
    return event.date === toDateString(state.date);
  }).filter(function (event) {
    return (event.lessonPlanId || event.singleLessonPlanId) && !event.isHoliday;
  });
};
var formatNameList = function formatNameList(names) {
  if (!names.length) {
    return '';
  }
  if (names.length === 1) {
    return names[0];
  }
  if (names.length === 2) {
    return "".concat(names[0], " and ").concat(names[1]);
  }
  return "".concat(names.slice(0, -1).join(', '), " and ").concat(names[names.length - 1]);
};
var renderCalendarBirthdayInsights = function renderCalendarBirthdayInsights(container, names) {
  if (!container) {
    return;
  }
  var label = container.querySelector('span');
  var formattedNames = formatNameList(names);
  container.style.display = formattedNames ? '' : 'none';
  if (label) {
    label.textContent = formattedNames;
  }
};
var renderCalendarPaymentTotals = function renderCalendarPaymentTotals() {
  var expected = document.querySelector('[data-calendar-expected-payment]');
  var confirmed = document.querySelector('[data-calendar-confirmed-payment]');
  var lessonsCount = document.querySelector('[data-calendar-lessons-count]');
  var hoursCount = document.querySelector('[data-calendar-hours-count]');
  var averageHours = document.querySelector('[data-calendar-average-hours]');
  var birthdayInsights = document.getElementById('calendar-calendar-insights-birthdays');
  if (!expected && !confirmed && !lessonsCount && !hoursCount && !averageHours && !birthdayInsights) {
    return;
  }
  var visiblePaymentEvents = getVisiblePaymentEvents();
  var totals = visiblePaymentEvents.reduce(function (carry, event) {
    var feeAmount = getEventFeeAmount(event);
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
    minutes: 0
  });
  var birthdayNames = [];
  var birthdayNameKeys = new Set();
  visiblePaymentEvents.forEach(function (event) {
    var name = event.studentFirstName || '';
    var key = name.toLowerCase();
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
    formattingFn: function formattingFn(value) {
      var number = Number(value);
      return String(Math.round(Number.isFinite(number) ? number : 0));
    }
  }, function (value) {
    var number = Number(value);
    return String(Math.round(Number.isFinite(number) ? number : 0));
  });
  renderCountTotal('hours', hoursCount, totals.minutes, {
    decimalPlaces: 0,
    formattingFn: function formattingFn(value) {
      return formatHoursMinutes(value);
    }
  }, function (value) {
    return formatHoursMinutes(value);
  });
  if (averageHours) {
    var dayCount = getVisibleAverageHoursDayCount();
    var container = averageHours.closest('.mb-3') || averageHours.parentElement;
    if (container) {
      container.style.display = dayCount ? '' : 'none';
    }
    if (dayCount) {
      renderCountTotal('average-hours', averageHours, totals.minutes / dayCount, {
        decimalPlaces: 0,
        formattingFn: function formattingFn(value) {
          return "".concat(formatQuarterHours(value), "/day");
        }
      }, function (value) {
        return "".concat(formatQuarterHours(value), "/day");
      });
    }
  }
};
var getHolidaysForDateString = function getHolidaysForDateString(dateString) {
  if (!state.showHolidays) {
    return [];
  }
  return state.holidays.filter(function (holiday) {
    return holiday.date === dateString;
  });
};
var getHolidaysForDate = function getHolidaysForDate(date) {
  return getHolidaysForDateString(toDateString(date));
};
var getBreakDateString = function getBreakDateString(teachingBreak, key) {
  return String(teachingBreak && teachingBreak[key] ? teachingBreak[key] : '').substring(0, 10);
};
var isDateWithinBreak = function isDateWithinBreak(dateString, teachingBreak) {
  var startsOn = getBreakDateString(teachingBreak, 'starts_on');
  var endsOn = getBreakDateString(teachingBreak, 'ends_on');
  return startsOn && endsOn && dateString >= startsOn && dateString <= endsOn;
};
var getBreaksForDateString = function getBreaksForDateString(dateString) {
  return state.teachingBreaks.filter(function (teachingBreak) {
    if (!isDateWithinBreak(dateString, teachingBreak)) {
      return false;
    }
    if (!isLocationFilterActive()) {
      return true;
    }
    var locations = Array.isArray(teachingBreak.locations) ? teachingBreak.locations : [];
    return !locations.length || locations.some(function (location) {
      return locationIsSelected(location.id);
    });
  });
};
var getBreaksForDate = function getBreaksForDate(date) {
  return getBreaksForDateString(toDateString(date));
};
var getRecitalsForDateString = function getRecitalsForDateString(dateString) {
  return state.recitals.filter(function (recital) {
    return String(recital.date || '').substring(0, 10) === dateString;
  });
};
var getRecitalsForDate = function getRecitalsForDate(date) {
  return getRecitalsForDateString(toDateString(date));
};
var eventTimeFormatter = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: calendarTimeZone
});
var modalDateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  timeZone: calendarTimeZone
});
var formatEventTime = function formatEventTime(time) {
  if (!time) {
    return '';
  }
  var parts = time.split(':').map(Number);
  var date = new Date(2000, 0, 1, parts[0] || 0, parts[1] || 0);
  return eventTimeFormatter.format(date).replace(':00', '').replace(/\s/g, '').toLowerCase();
};
var formatModalEventTime = function formatModalEventTime(time) {
  if (!time) {
    return '';
  }
  var parts = time.split(':').map(Number);
  var date = new Date(2000, 0, 1, parts[0] || 0, parts[1] || 0);
  return eventTimeFormatter.format(date).replace(/\s/g, '').toLowerCase();
};
var formatAgendaEventTime = function formatAgendaEventTime(time) {
  return formatModalEventTime(time).toUpperCase();
};
var getLessonLocationIcon = function getLessonLocationIcon(locationName) {
  var location = String(locationName || '').trim().toLowerCase();
  if (location.includes('home')) {
    return 'house';
  }
  if (location.includes('online')) {
    return 'globe';
  }
  return 'building';
};
var patchScheduleItems = function patchScheduleItems(calendar) {
  calendar.querySelectorAll('.lm-schedule-item:not([holding-event])').forEach(function (item) {
    var start = item.getAttribute('data-start');
    var end = item.getAttribute('data-end');
    var duration = getTimeMinutes(end) - getTimeMinutes(start);
    var isShort = duration <= 30;
    var event = getEventByScheduleItem(item);
    var cell = item.closest('td[data-date]');
    var visibleDate = cell ? cell.getAttribute('data-real-date') || cell.getAttribute('data-date') : '';
    var iconName = event && event.isGeneralEvent ? event.eventTypeIcon : getLessonLocationIcon(event ? event.locationName : '');
    var iconTitle = event && event.isGeneralEvent ? event.eventType : event && event.locationName ? event.locationName : '';
    var eventIcon = item.querySelector(':scope > .event-icon');
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
      eventIcon.querySelector('i').className = "fa-solid fa-".concat(iconName);
      eventIcon.title = iconTitle;
    }
    item.classList.toggle('is-short', isShort);
    item.classList.toggle('calendar-calendar-general-event', Boolean(event && event.isGeneralEvent));
    item.setAttribute('data-display-time', isShort ? formatEventTime(start) : "".concat(formatEventTime(start), " - ").concat(formatEventTime(end)));
    clearScheduleItemBirthdayDecoration(item);
    if (event) {
      item.setAttribute('data-lesson-status', event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed'));
    }
    applyEventTimeStatusAttributes(item, event, visibleDate);
    applyEventOverlapAttribute(item, event);
  });
};
var animateCalendarLessonItems = function animateCalendarLessonItems(calendar) {
  if (state.suppressNextScheduleAnimation) {
    calendar.querySelectorAll('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event').forEach(function (item) {
      item.dataset.lessonFadeAnimated = 'true';
    });
    state.suppressNextScheduleAnimation = false;
    return;
  }
  if (!scheduleGridViews.includes(state.view) || window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  var nonLessonStatuses = ['holiday', 'teaching-break', 'recital'];
  var lessonItems = Array.from(calendar.querySelectorAll('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event')).filter(function (item) {
    return !nonLessonStatuses.includes(item.dataset.lessonStatus || '') && item.dataset.lessonFadeAnimated !== 'true';
  });
  lessonItems.forEach(function (item, index) {
    item.dataset.lessonFadeAnimated = 'true';
    item.style.setProperty('--calendar-lesson-fade-delay', "".concat(index * 30, "ms"));
    item.style.setProperty('--calendar-lesson-fade-opacity', window.getComputedStyle(item).opacity || '1');
    item.classList.add('calendar-calendar-lesson-fade-in');
    item.addEventListener('animationend', function () {
      item.classList.remove('calendar-calendar-lesson-fade-in');
      item.style.removeProperty('--calendar-lesson-fade-delay');
      item.style.removeProperty('--calendar-lesson-fade-opacity');
    }, {
      once: true
    });
  });
};
var patchScheduleHolidays = function patchScheduleHolidays(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var thead = schedule ? schedule.querySelector('thead') : null;
  if (!schedule || !thead || !scheduleGridViews.includes(state.view)) {
    return;
  }
  thead.querySelectorAll('.calendar-schedule-holiday-row').forEach(function (row) {
    row.remove();
  });
  var headerRow = thead.querySelector('tr');
  var headerHeight = headerRow ? headerRow.offsetHeight : 0;
  schedule.style.setProperty('--calendar-schedule-header-height', "".concat(headerHeight, "px"));
  var visibleDates = getVisibleScheduleDates();
  var visibleDateStrings = visibleDates.map(toDateString);
  var hasBanner = visibleDates.some(function (date) {
    return getHolidaysForDate(date).length > 0 || getBreaksForDate(date).length > 0 || getRecitalsForDate(date).length > 0;
  });
  if (!hasBanner) {
    return;
  }
  var row = document.createElement('tr');
  var label = document.createElement('td');
  row.className = 'calendar-schedule-holiday-row';
  label.className = 'calendar-schedule-holiday-zone';
  row.appendChild(label);
  getScheduleGridDates().forEach(function (date) {
    var cell = document.createElement('td');
    var dateString = toDateString(date);
    var isVisible = state.view !== '2-days' || visibleDateStrings.includes(dateString);
    var holidays = isVisible ? getHolidaysForDate(date) : [];
    var teachingBreaks = isVisible ? getBreaksForDate(date) : [];
    var recitals = isVisible ? getRecitalsForDate(date) : [];
    cell.className = 'calendar-schedule-holiday-cell';
    cell.dataset.date = dateString;
    cell.dataset.realDate = dateString;
    cell.classList.toggle('calendar-schedule-hidden-column', !isVisible);
    applyDateStatusAttributes(cell, dateString);
    holidays.forEach(function (holiday) {
      var item = document.createElement('span');
      item.className = 'calendar-schedule-holiday';
      item.textContent = holiday.title;
      applyDateStatusAttributes(item, dateString);
      cell.appendChild(item);
    });
    teachingBreaks.forEach(function (teachingBreak) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'calendar-schedule-holiday calendar-schedule-break';
      item.textContent = teachingBreak.title;
      item.dataset.eventGuid = "teaching-break-".concat(teachingBreak.id, "-").concat(dateString);
      applyDateStatusAttributes(item, dateString);
      cell.appendChild(item);
    });
    recitals.forEach(function (recital) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'calendar-schedule-holiday calendar-schedule-recital';
      item.textContent = "".concat(formatEventTime(recital.start_time), " ").concat(recital.name);
      item.dataset.eventGuid = "recital-".concat(recital.id, "-").concat(dateString);
      applyDateStatusAttributes(item, dateString);
      cell.appendChild(item);
    });
    row.appendChild(cell);
  });
  thead.appendChild(row);
};
var getEventByGuid = function getEventByGuid(guid) {
  return state.events.find(function (event) {
    return event.guid === guid;
  }) || getTeachingBreakEventByGuid(guid) || getRecitalEventByGuid(guid) || getGeneralEventByGuid(guid);
};
var getEventByScheduleItem = function getEventByScheduleItem(item) {
  if (!item) {
    return null;
  }
  if (item.event) {
    return item.event;
  }
  var event = getEventByGuid(item.id || item.dataset.eventGuid);
  if (event) {
    return event;
  }
  var cell = item.closest('td[data-date]');
  var date = cell ? cell.dataset.date : '';
  var start = normalizeTime(item.getAttribute('data-start') || '08:00');
  var end = normalizeTime(item.getAttribute('data-end') || '08:15');
  var title = item.getAttribute('data-title') || '';
  return state.events.find(function (candidate) {
    return candidate.date === date && candidate.start === start && candidate.end === end && candidate.title === title;
  });
};
var getTeachingBreakEvent = function getTeachingBreakEvent(teachingBreak, dateString) {
  var impact = teachingBreak.impact || {};
  return {
    guid: "teaching-break-".concat(teachingBreak.id, "-").concat(dateString),
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
    missedLessons: Array.isArray(impact.lessons) ? impact.lessons : []
  };
};
var getBreakEventsForDate = function getBreakEventsForDate(date) {
  var dateString = toDateString(date);
  return getBreaksForDateString(dateString).map(function (teachingBreak) {
    return getTeachingBreakEvent(teachingBreak, dateString);
  });
};
var getTeachingBreakEventByGuid = function getTeachingBreakEventByGuid(guid) {
  var match = String(guid || '').match(/^teaching-break-(\d+)-(\d{4}-\d{2}-\d{2})$/);
  if (!match) {
    return null;
  }
  var teachingBreak = state.teachingBreaks.find(function (item) {
    return Number(item.id) === Number(match[1]);
  });
  return teachingBreak ? getTeachingBreakEvent(teachingBreak, match[2]) : null;
};
var getRecitalEvent = function getRecitalEvent(recital) {
  var dateString = String(recital.date || '').substring(0, 10);
  return {
    guid: "recital-".concat(recital.id, "-").concat(dateString),
    isRecital: true,
    id: recital.id,
    date: dateString,
    start: recital.start_time,
    title: recital.name || 'Recital',
    venue: recital.venue || null,
    students: Array.isArray(recital.students) ? recital.students : []
  };
};
var getRecitalEventsForDate = function getRecitalEventsForDate(date) {
  return getRecitalsForDate(date).map(getRecitalEvent);
};
var getRecitalEventByGuid = function getRecitalEventByGuid(guid) {
  var match = String(guid || '').match(/^recital-(\d+)-(\d{4}-\d{2}-\d{2})$/);
  if (!match) {
    return null;
  }
  var recital = state.recitals.find(function (item) {
    return Number(item.id) === Number(match[1]);
  });
  return recital ? getRecitalEvent(recital) : null;
};
var getGeneralEvent = function getGeneralEvent(generalEvent) {
  var dateString = String(generalEvent.scheduled_date || '').substring(0, 10);
  return {
    guid: "general-event-".concat(generalEvent.id, "-").concat(dateString),
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
    'data-lesson-status': 'general-event'
  };
};
var getGeneralEventCalendarEvents = function getGeneralEventCalendarEvents() {
  return state.generalEvents.filter(generalEventMatchesCalendarSearch).map(getGeneralEvent);
};
var getGeneralEventByGuid = function getGeneralEventByGuid(guid) {
  var match = String(guid || '').match(/^general-event-(\d+)-(\d{4}-\d{2}-\d{2})$/);
  if (!match) {
    return null;
  }
  var generalEvent = state.generalEvents.find(function (item) {
    return Number(item.id) === Number(match[1]);
  });
  return generalEvent ? getGeneralEvent(generalEvent) : null;
};
var getCalendarEventElementsByGuid = function getCalendarEventElementsByGuid(guid) {
  if (!guid) {
    return [];
  }
  return Array.from(document.querySelectorAll('#calendar .lm-schedule-item, #calendar [data-event-guid]')).filter(function (item) {
    return item.id === guid || item.dataset.eventGuid === guid;
  });
};
var getLessonStatus = function getLessonStatus(lesson) {
  if (!lesson) {
    return 'unconfirmed';
  }
  if (lesson.canceled_at) {
    return 'canceled';
  }
  return lesson.paid_at ? 'paid' : 'unpaid';
};
var getDateTimeDateString = function getDateTimeDateString(value) {
  var match = String(value || '').match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '';
};
var getDateTimeTimeString = function getDateTimeTimeString(value) {
  var match = String(value || '').match(/[T\s](\d{1,2}):(\d{2})/);
  if (!match) {
    return '';
  }
  return "".concat(String(Number(match[1])).padStart(2, '0'), ":").concat(match[2]);
};
var getDateTimeMinutes = function getDateTimeMinutes(value) {
  return getTimeMinutes(getDateTimeTimeString(value));
};
var getLessonEditUrl = function getLessonEditUrl(lesson) {
  var taught = document.getElementById('lesson-taught');
  var storeUrl = taught ? taught.dataset.url : '';
  if (!lesson || !lesson.id || !storeUrl) {
    return '';
  }
  return "".concat(storeUrl.replace(/\/$/, ''), "/").concat(lesson.id);
};
var getLessonPlanModalEditUrl = function getLessonPlanModalEditUrl(isSingleLessonPlan, id) {
  var template = isSingleLessonPlan ? window.calendarSingleLessonPlanEditUrlTemplate : window.calendarLessonPlanEditUrlTemplate;
  var placeholder = isSingleLessonPlan ? '__single_lesson_plan__' : '__lesson_plan__';
  return template && id ? String(template).replace(placeholder, id) : '';
};
var getLessonPaymentUrl = function getLessonPaymentUrl(lesson) {
  var editUrl = getLessonEditUrl(lesson);
  return editUrl ? "".concat(editUrl.replace(/\/$/, ''), "/payments") : '';
};
var preserveButtonLabel = function preserveButtonLabel(button) {
  if (button && !button.dataset.defaultHtml) {
    button.dataset.defaultHtml = button.innerHTML;
  }
};
var restoreButtonLabel = function restoreButtonLabel(button) {
  if (button && button.dataset.defaultHtml) {
    button.innerHTML = button.dataset.defaultHtml;
  }
};
var setFormSubmitting = function setFormSubmitting(form, isSubmitting) {
  if (!form) {
    return;
  }
  form.querySelectorAll('button:not([type]), button[type="submit"], input[type="submit"], input[type="image"]').forEach(function (submit) {
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
var getResponseErrorMessage = function getResponseErrorMessage(payload, fallback) {
  if (payload && payload.message) {
    return payload.message;
  }
  if (payload && payload.errors) {
    var firstError = Object.values(payload.errors).find(function (errors) {
      return Array.isArray(errors) && errors.length;
    });
    if (firstError) {
      return firstError[0];
    }
  }
  return fallback;
};
var requestJson = function requestJson(url, options, fallbackError) {
  return fetch(url, options).then(function (response) {
    return response.json()["catch"](function () {
      return {};
    }).then(function (payload) {
      if (!response.ok) {
        throw new Error(getResponseErrorMessage(payload, fallbackError));
      }
      return payload;
    });
  });
};
var showLessonActionError = function showLessonActionError(modal, message) {
  var error = modal ? modal.querySelector('[data-lesson-action-error]') : null;
  if (!error) {
    return;
  }
  error.textContent = message || 'Unable to update this lesson.';
  error.hidden = false;
};
var clearLessonActionError = function clearLessonActionError(modal) {
  var error = modal ? modal.querySelector('[data-lesson-action-error]') : null;
  if (!error) {
    return;
  }
  error.textContent = '';
  error.hidden = true;
};
var hideLessonModal = function hideLessonModal(modal) {
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
var finishLessonModalMutation = function finishLessonModalMutation(modal, refreshCalendar, keepOpen) {
  var guid = modal ? modal.dataset.eventGuid : '';
  return refreshCalendar().then(function () {
    var updatedEvent = guid ? getEventByGuid(guid) : null;
    if (keepOpen && updatedEvent) {
      openLessonModal(updatedEvent);
    } else {
      hideLessonModal(modal);
    }
  });
};
var getLessonForOccurrence = function getLessonForOccurrence(lessonPlan, dateString, startTime) {
  var lessons = Array.isArray(lessonPlan.lessons) ? lessonPlan.lessons : [];
  var lessonPlanId = Number(lessonPlan.id);
  var occurrenceMinutes = getTimeMinutes(startTime);
  return lessons.find(function (lesson) {
    var startsOnDate = getDateTimeDateString(lesson.starts_at) === dateString;
    var startsAtTime = getDateTimeMinutes(lesson.starts_at) === occurrenceMinutes;
    var belongsToPlan = !lesson.lesson_plan_id || Number(lesson.lesson_plan_id) === lessonPlanId;
    return startsOnDate && startsAtTime && belongsToPlan;
  }) || null;
};
var renderRescheduleDatePicker = function renderRescheduleDatePicker(modal) {
  var label = modal.querySelector('[data-reschedule-datepicker-label]');
  var grid = modal.querySelector('[data-reschedule-datepicker-grid]');
  var input = modal.querySelector('#reschedule-lesson-date');
  if (!label || !grid || !state.rescheduleDatePickerDate) {
    return;
  }
  var selected = input && input.value ? input.value : toDateString(state.rescheduleDatePickerDate);
  var gridStart = startOfMonthGrid(state.rescheduleDatePickerDate);
  var today = todayString();
  label.textContent = monthFormatter.format(state.rescheduleDatePickerDate);
  grid.innerHTML = '';
  for (var i = 0; i < 42; i++) {
    var date = addDays(gridStart, i);
    var dateString = toDateString(date);
    var button = document.createElement('button');
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
var renderGeneralEventRescheduleDatePicker = function renderGeneralEventRescheduleDatePicker(modal) {
  var label = modal.querySelector('[data-general-event-reschedule-datepicker-label]');
  var grid = modal.querySelector('[data-general-event-reschedule-datepicker-grid]');
  var input = modal.querySelector('#reschedule-general-event-date');
  var pickerDate = state.generalEventRescheduleDatePickerDate;
  if (!label || !grid || !pickerDate) {
    return;
  }
  var selected = input && input.value ? input.value : toDateString(pickerDate);
  var gridStart = startOfMonthGrid(pickerDate);
  var today = todayString();
  label.textContent = monthFormatter.format(pickerDate);
  grid.innerHTML = '';
  for (var i = 0; i < 42; i++) {
    var date = addDays(gridStart, i);
    var dateString = toDateString(date);
    var button = document.createElement('button');
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
var resetLessonModalState = function resetLessonModalState(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-canceling', 'is-rescheduling', 'is-drop-rescheduling');
  delete modal.dataset.dropRecurring;
  state.rescheduleAnchor = null;
  clearLessonActionError(modal);
};
var showLessonRescheduleForm = function showLessonRescheduleForm(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-canceling');
  modal.classList.add('is-rescheduling');
};
var showLessonCancelForm = function showLessonCancelForm(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-rescheduling');
  modal.classList.add('is-canceling');
};
var getEventStartDateTime = function getEventStartDateTime(event) {
  if (!event || !event.date || !event.start) {
    return null;
  }
  var dateParts = String(event.date).substring(0, 10).split('-').map(Number);
  var timeParts = normalizeTime(event.start).split(':').map(Number);
  var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], 0, 0);
  return isValidDate(date) ? date : null;
};
var canUseLessonActionButtons = function canUseLessonActionButtons(event) {
  if (event && event.date) {
    var eventDate = parseDateString(String(event.date).substring(0, 10));
    var today = getTodayDate();
    if (isValidDate(eventDate)) {
      return eventDate <= today;
    }
  }
  var startsAt = getEventStartDateTime(event);
  return startsAt ? startsAt <= new Date() : false;
};
var populateLessonModal = function populateLessonModal(modal, event) {
  var title = modal.querySelector('.modal-title');
  var date = modal.querySelector('#lesson-date');
  var time = modal.querySelector('#lesson-time');
  var recurrence = modal.querySelector('#lesson-recurrence');
  var birthday = modal.querySelector('#lesson-birthday');
  var birthdayLabel = birthday ? birthday.querySelector('span') : null;
  var meetingUrl = modal.querySelector('#meeting-url');
  var meetingUrlLink = meetingUrl ? meetingUrl.querySelector('a') : null;
  var notesUrl = modal.querySelector('#notes-url');
  var notesUrlLink = notesUrl ? notesUrl.querySelector('a') : null;
  var revert = modal.querySelector('#lesson-revert');
  var edit = modal.querySelector('#lesson-edit');
  var taught = modal.querySelector('#lesson-taught');
  var cancelLesson = modal.querySelector('#cancel-lesson-button');
  var confirmPayment = modal.querySelector('#confirm-payment');
  var earlyPayment = modal.querySelector('#early-payment');
  var rescheduleOriginalDate = modal.querySelector('#reschedule-lesson-original-date');
  var rescheduleOriginalStartTime = modal.querySelector('#reschedule-lesson-original-start-time');
  var rescheduleDate = modal.querySelector('#reschedule-lesson-date');
  var rescheduleForm = modal.querySelector('#reschedule-lesson form');
  var rescheduleLessonPlan = modal.querySelector('#reschedule-lesson [name="lesson_plan_id"]');
  var rescheduleStartTime = modal.querySelector('#reschedule-lesson-start-time');
  var rescheduleEndTime = modal.querySelector('#reschedule-lesson-end-time');
  var cancelLessonForm = modal.querySelector('#cancel-lesson form');
  var lessonPlanId = event && event.lessonPlanId ? event.lessonPlanId : '';
  var singleLessonPlanId = event && event.singleLessonPlanId ? event.singleLessonPlanId : '';
  var hasLessonSource = !!(lessonPlanId || singleLessonPlanId);
  var eventDate = event && event.date ? event.date.substring(0, 10) : todayString();
  var canUseActions = canUseLessonActionButtons(event);
  renderLessonModalTitle(title, event);
  if (date) {
    date.textContent = event && event.date ? modalDateFormatter.format(parseDateString(event.date.substring(0, 10))) : '';
  }
  if (time) {
    var start = event && event.start ? formatModalEventTime(event.start) : '';
    var end = event && event.end ? formatModalEventTime(event.end) : '';
    time.textContent = start && end ? "".concat(start, " - ").concat(end) : start || end;
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
    var canRevert = !!(event && (event.scheduleOverrideId || event.lessonId || event.earlyPaymentId && !canUseActions));
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
    cancelLesson.disabled = !event || !hasLessonSource || event.lessonStatus === 'canceled';
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
    rescheduleOriginalStartTime.value = event && event.originalStartTime ? normalizeTime(event.originalStartTime) : event && event.start ? normalizeTime(event.start) : '08:00';
  }
  if (rescheduleDate) {
    rescheduleDate.value = eventDate;
  }
  if (rescheduleLessonPlan) {
    rescheduleLessonPlan.value = lessonPlanId;
  }
  var rescheduleSingleLessonPlan = modal.querySelector('#reschedule-lesson [name="single_lesson_plan_id"]');
  if (rescheduleSingleLessonPlan) {
    rescheduleSingleLessonPlan.value = singleLessonPlanId;
  }
  if (rescheduleForm) {
    rescheduleForm.action = singleLessonPlanId && rescheduleForm.dataset.singleAction ? rescheduleForm.dataset.singleAction : rescheduleForm.dataset.recurringAction || rescheduleForm.action;
  }
  if (cancelLessonForm) {
    var recurringCancelFields = cancelLessonForm.querySelectorAll('[data-recurring-cancel-fields]');
    var singleCancelWarning = cancelLessonForm.querySelector('[data-single-cancel-warning]');
    var cancelReasonInputs = cancelLessonForm.querySelectorAll('input[name="canceled_by"]');
    var isSingleLessonCancel = !!singleLessonPlanId;
    var cancelFormPayload = {
      lesson_plan_id: lessonPlanId,
      single_lesson_plan_id: singleLessonPlanId,
      date: eventDate,
      start: event && event.start ? normalizeTime(event.start) : '',
      end: event && event.end ? normalizeTime(event.end) : '',
      scheduled_date: event && event.originalDate ? event.originalDate : eventDate,
      scheduled_start_time: event && event.originalStartTime ? normalizeTime(event.originalStartTime) : event && event.start ? normalizeTime(event.start) : '',
      schedule_override_id: event && event.scheduleOverrideId ? event.scheduleOverrideId : ''
    };
    Object.keys(cancelFormPayload).forEach(function (name) {
      var input = cancelLessonForm.querySelector("[name=\"".concat(name, "\"]"));
      if (input) {
        input.value = cancelFormPayload[name];
      }
    });
    recurringCancelFields.forEach(function (fieldset) {
      fieldset.hidden = isSingleLessonCancel;
    });
    if (singleCancelWarning) {
      singleCancelWarning.hidden = !isSingleLessonCancel;
    }
    cancelReasonInputs.forEach(function (input) {
      input.disabled = isSingleLessonCancel;
    });
  }
  setTimeSelectValue(rescheduleStartTime, event && event.start ? event.start : '08:00');
  renderRescheduleEndOptions(rescheduleStartTime, rescheduleEndTime, event && event.end ? normalizeTime(event.end) : '08:15');
  setTimeSelectValue(rescheduleEndTime, event && event.end ? event.end : '08:15');
  state.rescheduleAnchor = null;
  state.rescheduleDurationMinutes = Math.max(15, getSelectTimeMinutes(rescheduleEndTime) - getSelectTimeMinutes(rescheduleStartTime));
  state.rescheduleDatePickerDate = parseDateString(eventDate);
  renderRescheduleDatePicker(modal);
  modal.dataset.lessonStatus = event && event.lessonStatus ? event.lessonStatus : 'unconfirmed';
  modal.dataset.lessonCanceledBy = event && event.canceledBy ? event.canceledBy : '';
};
var openLessonModal = function openLessonModal(event, options) {
  var modal = document.getElementById('lesson-modal');
  var settings = options || {};
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
var formatBreakDateRange = function formatBreakDateRange(event) {
  var startsOn = event && event.startsOn ? event.startsOn : event && event.date ? event.date.substring(0, 10) : '';
  var endsOn = event && event.endsOn ? event.endsOn : startsOn;
  if (!startsOn) {
    return '';
  }
  var startLabel = modalDateFormatter.format(parseDateString(startsOn));
  var endLabel = endsOn && endsOn !== startsOn ? modalDateFormatter.format(parseDateString(endsOn)) : '';
  return endLabel ? "".concat(startLabel, " - ").concat(endLabel) : startLabel;
};
var openTeachingBreakModal = function openTeachingBreakModal(event) {
  var modal = document.getElementById('teaching-break-modal');
  if (!modal || !event) {
    return;
  }
  var title = modal.querySelector('.modal-title');
  var dates = modal.querySelector('#teaching-break-dates');
  var reason = modal.querySelector('#teaching-break-reason');
  var locations = modal.querySelector('#teaching-break-locations');
  var impact = modal.querySelector('#teaching-break-impact');
  var lessons = modal.querySelector('#teaching-break-lessons');
  var missedLessons = Array.isArray(event.missedLessons) ? event.missedLessons : [];
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
    locations.textContent = Array.isArray(event.locations) && event.locations.length ? event.locations.map(function (location) {
      return location.name;
    }).join(', ') : 'All locations';
  }
  if (impact) {
    var count = Number(event.missedLessonCount || 0);
    impact.textContent = "".concat(count, " ").concat(count === 1 ? 'lesson' : 'lessons', " missed \xB7 ").concat(paymentFormatter.format(Number(event.missedFeeAmount || 0) / 100), " missed");
  }
  if (lessons) {
    lessons.innerHTML = '';
    if (!missedLessons.length) {
      var empty = document.createElement('div');
      empty.className = 'opacity-4';
      empty.textContent = 'No lessons are currently scheduled during this break.';
      lessons.appendChild(empty);
    }
    missedLessons.forEach(function (lesson) {
      var row = document.createElement('div');
      var name = document.createElement('strong');
      var details = document.createElement('span');
      row.className = 'calendar-break-lesson';
      name.textContent = lesson.student || 'Lesson';
      details.textContent = "".concat(lesson.date ? modalDateFormatter.format(parseDateString(String(lesson.date).substring(0, 10))) : '', " \xB7 ").concat(formatModalEventTime(lesson.start), "-").concat(formatModalEventTime(lesson.end), " \xB7 ").concat(paymentFormatter.format(Number(lesson.fee_amount || 0) / 100));
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
var openRecitalModal = function openRecitalModal(event) {
  var modal = document.getElementById('recital-modal');
  if (!modal || !event) {
    return;
  }
  var title = modal.querySelector('.modal-title');
  var date = modal.querySelector('#recital-date');
  var time = modal.querySelector('#recital-time');
  var venue = modal.querySelector('#recital-venue');
  var participants = modal.querySelector('#recital-participants');
  var students = Array.isArray(event.students) ? event.students : [];
  if (title) title.textContent = event.title || 'Recital';
  if (date) date.textContent = event.date ? modalDateFormatter.format(parseDateString(event.date)) : '';
  if (time) time.textContent = formatModalEventTime(event.start);
  if (venue) {
    var venueName = event.venue && event.venue.name ? event.venue.name : 'No venue specified';
    var address = event.venue && event.venue.address ? event.venue.address : '';
    var mapUrl = event.venue && event.venue.map_url ? event.venue.map_url : '';
    venue.innerHTML = '';
    if (mapUrl) {
      var link = document.createElement('a');
      link.href = mapUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = venueName;
      venue.appendChild(link);
    } else {
      venue.appendChild(document.createTextNode(venueName));
    }
    if (address) {
      venue.appendChild(document.createTextNode(" \xB7 ".concat(address)));
    }
  }
  if (participants) {
    participants.innerHTML = '';
    if (!students.length) {
      var empty = document.createElement('div');
      empty.className = 'opacity-4';
      empty.textContent = 'No participating students.';
      participants.appendChild(empty);
    }
    students.forEach(function (student) {
      var row = document.createElement('div');
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
var renderNotesWithLinks = function renderNotesWithLinks(element, notes) {
  var text = String(notes || '');
  var urlPattern = /(?:https?:\/\/|www\.)[^\s]+/gi;
  var cursor = 0;
  var match;
  element.innerHTML = '';
  if (!text) {
    return;
  }
  element.classList.remove('opacity-4');
  while ((match = urlPattern.exec(text)) !== null) {
    var rawUrl = match[0];
    var trailingMatch = rawUrl.match(/[),.;!?]+$/);
    var trailing = trailingMatch ? trailingMatch[0] : '';
    var url = trailing ? rawUrl.slice(0, -trailing.length) : rawUrl;
    var link = document.createElement('a');
    element.appendChild(document.createTextNode(text.slice(cursor, match.index)));
    link.href = /^https?:\/\//i.test(url) ? url : "https://".concat(url);
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
var formatGeneralEventNotification = function formatGeneralEventNotification(minutes) {
  if (minutes === null || minutes === undefined || minutes === '') {
    return '';
  }
  var value = Number(minutes);
  if (value === 0) {
    return 'At the event time';
  }
  if (value === 1440) {
    return '1 day before';
  }
  if (value >= 60 && value % 60 === 0) {
    var hours = value / 60;
    return "".concat(hours, " ").concat(hours === 1 ? 'hour' : 'hours', " before");
  }
  return "".concat(value, " ").concat(value === 1 ? 'minute' : 'minutes', " before");
};
var clearGeneralEventActionError = function clearGeneralEventActionError(modal) {
  var error = modal ? modal.querySelector('[data-general-event-action-error]') : null;
  if (!error) {
    return;
  }
  error.textContent = '';
  error.hidden = true;
};
var showGeneralEventActionError = function showGeneralEventActionError(modal, message) {
  var error = modal ? modal.querySelector('[data-general-event-action-error]') : null;
  if (!error) {
    return;
  }
  error.textContent = message || 'Unable to update this event.';
  error.hidden = false;
};
var resetGeneralEventModalState = function resetGeneralEventModalState(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-canceling', 'is-rescheduling', 'is-drop-rescheduling');
  state.rescheduleAnchor = null;
  clearGeneralEventActionError(modal);
  modal.querySelectorAll('button[type="submit"], input[type="submit"]').forEach(function (submit) {
    submit.disabled = false;
    restoreButtonLabel(submit);
  });
};
var showGeneralEventRescheduleForm = function showGeneralEventRescheduleForm(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-canceling');
  modal.classList.add('is-rescheduling');
};
var showGeneralEventCancelForm = function showGeneralEventCancelForm(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-rescheduling');
  modal.classList.add('is-canceling');
};
var openGeneralEventModal = function openGeneralEventModal(event, options) {
  var modal = document.getElementById('general-event-modal');
  var settings = options || {};
  if (!modal || !event) {
    return;
  }
  var title = modal.querySelector('.modal-title');
  var date = modal.querySelector('#general-event-date');
  var time = modal.querySelector('#general-event-time');
  var eventType = modal.querySelector('#general-event-type');
  var eventTypeIcon = modal.querySelector('#general-event-type-icon');
  var eventTypeSection = modal.querySelector('[data-general-event-type-section]');
  var notification = modal.querySelector('#general-event-notification');
  var notes = modal.querySelector('#general-event-notes');
  var notesSection = modal.querySelector('[data-general-event-notes-section]');
  var edit = modal.querySelector('#event-edit');
  var rescheduleForm = modal.querySelector('#reschedule-general-event form');
  var cancelForm = modal.querySelector('#cancel-general-event form');
  var rescheduleDate = modal.querySelector('#reschedule-general-event-date');
  var rescheduleStartTime = modal.querySelector('#reschedule-general-event-start-time');
  var rescheduleEndTime = modal.querySelector('#reschedule-general-event-end-time');
  resetGeneralEventModalState(modal);
  modal.updatedScheduleItem = settings.updatedItem || null;
  if (title) title.textContent = event.title || 'Event';
  if (date) date.textContent = event.date ? modalDateFormatter.format(parseDateString(event.date)) : '';
  if (time) time.textContent = event.start && event.end ? "".concat(formatModalEventTime(event.start), " - ").concat(formatModalEventTime(event.end)) : formatModalEventTime(event.start);
  if (eventType) eventType.textContent = event.eventType || '';
  if (eventTypeIcon) {
    eventTypeIcon.className = "fas opacity-4 mr-2 t-2".concat(event.eventTypeIcon ? " fa-".concat(event.eventTypeIcon) : '');
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
  renderRescheduleEndOptions(rescheduleStartTime, rescheduleEndTime, event.end ? normalizeTime(event.end) : '08:15');
  setTimeSelectValue(rescheduleEndTime, event.end || '08:15');
  state.rescheduleDurationMinutes = Math.max(15, getSelectTimeMinutes(rescheduleEndTime) - getSelectTimeMinutes(rescheduleStartTime));
  state.generalEventRescheduleDatePickerDate = parseDateString(event.date || todayString());
  renderGeneralEventRescheduleDatePicker(modal);
  if (settings.openReschedule) {
    modal.classList.add('is-drop-rescheduling');
    showGeneralEventRescheduleForm(modal);
  }
  showBootstrapModal(modal);
};
var submitGeneralEventModalForm = function submitGeneralEventModalForm(form, refreshCalendar) {
  var modal = form ? form.closest('#general-event-modal') : null;
  var isReschedule = !!(form && form.closest('#reschedule-general-event'));
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
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: new FormData(form)
  }, isReschedule ? 'Unable to reschedule event.' : 'Unable to cancel event.').then(function () {
    return refreshCalendar().then(function () {
      hideBootstrapModal(modal);
    });
  })["catch"](function (error) {
    console.error(error);
    showGeneralEventActionError(modal, error.message);
  })["finally"](function () {
    setFormSubmitting(form, false);
  });
};
var updateLessonModalState = function updateLessonModalState(modal, payload) {
  var revert = modal.querySelector('#lesson-revert');
  var taught = modal.querySelector('#lesson-taught');
  var cancelLesson = modal.querySelector('#cancel-lesson-button');
  var event = getEventByGuid(modal.dataset.eventGuid);
  var status = payload && payload.status ? payload.status : 'unpaid';
  var editUrl = payload && payload.edit_url ? payload.edit_url : '';
  var paymentUrl = payload && (payload.payment_url || payload.paymentUrl) ? payload.payment_url || payload.paymentUrl : '';
  var lessonId = payload && payload.lesson_id ? payload.lesson_id : '';
  var confirmPayment = modal.querySelector('#confirm-payment');
  var earlyPayment = modal.querySelector('#early-payment');
  var hasEarlyPaymentId = payload && Object.prototype.hasOwnProperty.call(payload, 'early_payment_id');
  var earlyPaymentId = hasEarlyPaymentId ? payload.early_payment_id || '' : event ? event.earlyPaymentId : '';
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
    event.calendarStatus = status === 'early-payment' ? status : payload && payload.schedule_override_deleted ? status : event.calendarStatus === 'rescheduled' ? 'rescheduled' : status;
    event['data-lesson-status'] = event.calendarStatus;
    event.canceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
    event.lessonEditUrl = payload && payload.lesson_deleted ? '' : editUrl || event.lessonEditUrl || '';
    event.paymentUrl = payload && payload.lesson_deleted ? '' : paymentUrl || event.paymentUrl || '';
    event.lessonId = payload && payload.lesson_deleted ? '' : lessonId || event.lessonId || '';
    event.scheduleOverrideId = payload && payload.schedule_override_deleted ? '' : event.scheduleOverrideId;
    event.earlyPaymentId = earlyPaymentId;
  }
  if (revert) {
    var canRevert = !!(event && (event.scheduleOverrideId || event.lessonId || event.earlyPaymentId && !canUseLessonActionButtons(event)));
    revert.style.display = canRevert ? 'inline-flex' : 'none';
    revert.disabled = !canRevert;
  }
  var calendarStatus = event && event.calendarStatus ? event.calendarStatus : status;
  getCalendarEventElementsByGuid(modal.dataset.eventGuid).forEach(function (item) {
    item.setAttribute('data-lesson-status', calendarStatus);
    applyEventTimeStatusAttributes(item, event);
    item.querySelectorAll('[data-lesson-status]').forEach(function (child) {
      child.setAttribute('data-lesson-status', calendarStatus);
      applyEventTimeStatusAttributes(child, event);
    });
  });
  renderCalendarPaymentTotals();
};
var getLessonOccurrencePayload = function getLessonOccurrencePayload(modal) {
  return {
    lesson_plan_id: modal.dataset.lessonPlanId || '',
    single_lesson_plan_id: modal.dataset.singleLessonPlanId || '',
    date: modal.dataset.eventDate || '',
    start: modal.dataset.eventStart || '',
    end: modal.dataset.eventEnd || '',
    scheduled_date: modal.dataset.originalDate || modal.dataset.eventDate || '',
    scheduled_start_time: modal.dataset.originalStartTime || modal.dataset.eventStart || '',
    schedule_override_id: modal.dataset.scheduleOverrideId || ''
  };
};
var revertScheduleOverrideInState = function revertScheduleOverrideInState(event) {
  if (!event || !event.lessonPlanId || !event.scheduleOverrideId) {
    return;
  }
  var lessonPlan = state.plannedLessons.find(function (plan) {
    return String(plan.id) === String(event.lessonPlanId);
  });
  if (!lessonPlan || !Array.isArray(lessonPlan.occurrences)) {
    return;
  }
  lessonPlan.occurrences = lessonPlan.occurrences.filter(function (occurrence) {
    return String(occurrence.schedule_override_id || '') !== String(event.scheduleOverrideId);
  });
  if (!lessonPlan.occurrences.some(function (occurrence) {
    return occurrence.date === event.originalDate && normalizeTime(occurrence.start || lessonPlan.start_time) === normalizeTime(event.originalStartTime || event.start);
  })) {
    var start = normalizeTime(event.originalStartTime || lessonPlan.start_time);
    lessonPlan.occurrences.push({
      date: event.originalDate || event.date,
      start: start,
      end: addMinutesToTime(start, lessonPlan.duration_minutes),
      original_date: event.originalDate || event.date,
      original_start_time: start,
      lesson_id: '',
      lesson_status: 'unconfirmed',
      calendar_status: 'unconfirmed',
      fee_amount: event.feeAmount || lessonPlan.fee_amount || 0,
      canceled_by: '',
      lesson_edit_url: '',
      lesson_payment_url: ''
    });
  }
};
var revertLessonInState = function revertLessonInState(event, lessonId) {
  if (!event || !lessonId) {
    return;
  }
  var lessonPlan = state.plannedLessons.concat(state.singleLessonPlans).find(function (plan) {
    return String(plan.id) === String(event.lessonPlanId || event.singleLessonPlanId);
  });
  if (!lessonPlan || !Array.isArray(lessonPlan.occurrences)) {
    return;
  }
  lessonPlan.occurrences = lessonPlan.occurrences.map(function (occurrence) {
    if (String(occurrence.lesson_id || '') !== String(lessonId)) {
      return occurrence;
    }
    return Object.assign({}, occurrence, {
      lesson_id: '',
      lesson_status: 'unconfirmed',
      calendar_status: occurrence.schedule_override_id ? 'rescheduled' : 'unconfirmed',
      canceled_by: '',
      lesson_edit_url: '',
      lesson_payment_url: ''
    });
  });
};
var revertLessonAction = function revertLessonAction(button, refreshCalendar) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  if (!modal || !url || !modal.dataset.lessonId && !modal.dataset.scheduleOverrideId && !modal.dataset.earlyPaymentId) {
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
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(modal.dataset.earlyPaymentId ? {
      lesson_id: '',
      schedule_override_id: '',
      early_payment_id: modal.dataset.earlyPaymentId
    } : {
      lesson_id: modal.dataset.lessonId || '',
      schedule_override_id: modal.dataset.scheduleOverrideId || '',
      early_payment_id: ''
    })
  }, 'Unable to revert lesson action.').then(function (payload) {
    updateLessonModalState(modal, payload);
    return finishLessonModalMutation(modal, refreshCalendar, true);
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showLessonActionError(modal, error.message);
  });
};
var storeEarlyPayment = function storeEarlyPayment(button, refreshCalendar) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  if (!modal || !url || !modal.dataset.lessonPlanId && !modal.dataset.singleLessonPlanId) {
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
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(getLessonOccurrencePayload(modal))
  }, 'Unable to record the early payment.').then(function (payload) {
    updateLessonModalState(modal, payload);
    return finishLessonModalMutation(modal, refreshCalendar, true);
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showLessonActionError(modal, error.message);
  });
};
var storeTaughtLesson = function storeTaughtLesson(button, refreshCalendar) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  var lessonPlanId = modal ? modal.dataset.lessonPlanId : '';
  var singleLessonPlanId = modal ? modal.dataset.singleLessonPlanId : '';
  if (!modal || !url || !lessonPlanId && !singleLessonPlanId) {
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
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(getLessonOccurrencePayload(modal))
  }, 'Unable to confirm lesson.').then(function (payload) {
    updateLessonModalState(modal, payload);
    return finishLessonModalMutation(modal, refreshCalendar, true);
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showLessonActionError(modal, error.message);
  });
};
var confirmLessonPayment = function confirmLessonPayment(button, refreshCalendar) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
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
      'X-Requested-With': 'XMLHttpRequest'
    }
  }, 'Unable to confirm payment.').then(function (payload) {
    updateLessonModalState(modal, payload);
    return finishLessonModalMutation(modal, refreshCalendar, true);
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showLessonActionError(modal, error.message);
  });
};
var submitLessonModalForm = function submitLessonModalForm(form, refreshCalendar) {
  var modal = form ? form.closest('#lesson-modal') : null;
  var isReschedule = !!(form && form.closest('#reschedule-lesson'));
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
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: new FormData(form)
  }, isReschedule ? 'Unable to reschedule lesson.' : 'Unable to cancel lesson.').then(function (payload) {
    if (!isReschedule && payload && payload.status) {
      updateLessonModalState(modal, payload);
    }
    return finishLessonModalMutation(modal, refreshCalendar, !isReschedule);
  })["catch"](function (error) {
    console.error(error);
    showLessonActionError(modal, error.message);
  })["finally"](function () {
    setFormSubmitting(form, false);
  });
};
var patchSchedulePointer = function patchSchedulePointer(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var pointer = schedule ? schedule.querySelector('.lm-schedule-pointer') : null;
  if (!schedule || !pointer) {
    if (pointer) {
      pointer.style.display = 'none';
    }
    return;
  }
  var now = new Date();
  var minutesPerDivision = 15;
  var minutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60 + now.getMilliseconds() / 60000;
  var slot = Math.floor(minutes / minutesPerDivision);
  var slotOffset = minutes % minutesPerDivision / minutesPerDivision;
  var cell = schedule.querySelector("tbody td[data-date=\"".concat(todayString(), "\"][data-y=\"").concat(slot, "\"]:not(.lm-schedule-disabled)"));
  if (!cell || cell.offsetParent === null) {
    pointer.style.display = 'none';
    return;
  }
  var scheduleRect = schedule.getBoundingClientRect();
  var cellRect = cell.getBoundingClientRect();
  pointer.style.display = 'block';
  pointer.style.left = "".concat(cellRect.left - scheduleRect.left + schedule.scrollLeft, "px");
  pointer.style.top = "".concat(cellRect.top - scheduleRect.top + schedule.scrollTop + cellRect.height * slotOffset, "px");
  if (state.view === 'day') {
    pointer.style.width = "".concat(schedule.clientWidth - (cellRect.left - scheduleRect.left), "px");
  } else {
    pointer.style.width = "".concat(cellRect.width, "px");
  }
};
var scrollScheduleToNow = function scrollScheduleToNow(calendar) {
  if (state.didAutoNowScroll || !scheduleGridViews.includes(state.view)) {
    return;
  }
  var schedule = calendar.querySelector('.lm-schedule');
  var pointer = schedule ? schedule.querySelector('.lm-schedule-pointer') : null;
  if (!schedule || !pointer || pointer.style.display === 'none') {
    return;
  }
  var pointerTop = Number.parseFloat(pointer.style.top);
  if (!Number.isFinite(pointerTop)) {
    return;
  }
  schedule.scrollTop = Math.max(0, pointerTop - schedule.clientHeight / 2);
  state.didAutoNowScroll = true;
};
var disconnectScheduleObserver = function disconnectScheduleObserver() {
  if (state.scheduleObserver) {
    state.scheduleObserver.disconnect();
    state.scheduleObserver = null;
  }
};
var watchScheduleChanges = function watchScheduleChanges(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  if (!schedule || !scheduleGridViews.includes(state.view)) {
    return;
  }
  disconnectScheduleObserver();
  state.scheduleObserver = new MutationObserver(function () {
    queueSchedulePatch(calendar);
  });
  state.scheduleObserver.observe(schedule, {
    attributes: true,
    attributeFilter: ['data-start', 'data-end'],
    childList: true,
    subtree: true
  });
};
var patchSchedule = function patchSchedule(calendar) {
  disconnectScheduleObserver();
  patchScheduleHeaders(calendar);
  patchScheduleTimeLabels(calendar);
  patchScheduleItems(calendar);
  patchScheduleHolidays(calendar);
  patchSchedulePointer(calendar);
  animateCalendarLessonItems(calendar);
  requestAnimationFrame(function () {
    scrollScheduleToNow(calendar);
  });
  watchScheduleChanges(calendar);
};
var queueSchedulePatch = function queueSchedulePatch(calendar) {
  if (state.schedulePatchFrame) {
    cancelAnimationFrame(state.schedulePatchFrame);
  }
  state.schedulePatchFrame = requestAnimationFrame(function () {
    state.schedulePatchFrame = null;
    patchSchedule(calendar);
  });
};
var normalizeScheduleEvents = function normalizeScheduleEvents(events) {
  return events.map(function (event) {
    return Object.assign({}, event);
  });
};
var isPlannedLessonEvent = function isPlannedLessonEvent(event) {
  var guid = String(event.guid || '');
  return guid.indexOf('planned-lesson-') === 0 || guid.indexOf('single-lesson-plan-') === 0;
};
var syncEvents = function syncEvents(instance) {
  if (!instance || typeof instance.getData !== 'function') {
    return;
  }
  state.customEvents = normalizeScheduleEvents(instance.getData()).filter(function (event) {
    return !isPlannedLessonEvent(event);
  });
};
var normalizeTime = function normalizeTime(value) {
  var match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match || Number(match[1]) > 23 || Number(match[2]) > 59 || Number(match[2]) % 15 !== 0) {
    throw new Error('Lesson times must use HH:MM on 15-minute intervals.');
  }
  return "".concat(String(Number(match[1])).padStart(2, '0'), ":").concat(match[2]);
};
var minutesToTime = function minutesToTime(minutes) {
  var hour = Math.floor(minutes / 60) % 24;
  var minute = minutes % 60;
  return "".concat(String(hour).padStart(2, '0'), ":").concat(String(minute).padStart(2, '0'));
};
var addMinutesToTime = function addMinutesToTime(value, minutes) {
  var match = normalizeTime(value).match(/^(\d{2}):(\d{2})/);
  var total = Number(match[1]) * 60 + Number(match[2]) + Number(minutes || 0);
  return minutesToTime(total);
};
var getEventDateTime = function getEventDateTime(event, key, visibleDate) {
  var eventDate = visibleDate || event && event.date;
  if (!event || !eventDate || !event[key]) {
    return null;
  }
  var date = parseDateString(String(eventDate).substring(0, 10));
  var parts = normalizeTime(event[key]).split(':').map(Number);
  date.setHours(parts[0] || 0, parts[1] || 0, 0, 0);
  return date;
};
var getEventTimeStatus = function getEventTimeStatus(event, visibleDate) {
  if (!event || event.isHoliday || event.isBreak) {
    return '';
  }
  var start = getEventDateTime(event, 'start', visibleDate);
  var end = getEventDateTime(event, 'end', visibleDate);
  var now = new Date();
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
var applyEventTimeStatusAttributes = function applyEventTimeStatusAttributes(element, event, visibleDate) {
  if (!element) {
    return;
  }
  var status = getEventTimeStatus(event, visibleDate);
  element.toggleAttribute('past-event', status === 'past');
  element.toggleAttribute('future-event', status === 'future');
};
var applyDateStatusAttributes = function applyDateStatusAttributes(element, dateString) {
  if (!element || !dateString) {
    return;
  }
  var today = todayString();
  element.toggleAttribute('past-event', dateString < today);
  element.toggleAttribute('future-event', dateString > today);
};
var applyCalendarItemStatusAttributes = function applyCalendarItemStatusAttributes(element, event, fallbackDateString) {
  if (!element) {
    return;
  }
  if (event && (event.isHoliday || event.isBreak)) {
    applyDateStatusAttributes(element, event.date || fallbackDateString);
    return;
  }
  applyEventTimeStatusAttributes(element, event);
};
var isCanceledCalendarEvent = function isCanceledCalendarEvent(event) {
  return event && (event.lessonStatus === 'canceled' || event.calendarStatus === 'canceled' || event['data-lesson-status'] === 'canceled');
};
var isConflictEligibleTimedEvent = function isConflictEligibleTimedEvent(event) {
  return event && event.guid && !event.isHoliday && !event.isBreak && !isCanceledCalendarEvent(event) && event.start && event.end;
};
var getOverlappingTimedEventGuids = function getOverlappingTimedEventGuids(events) {
  var timedEvents = events.filter(function (event) {
    return isConflictEligibleTimedEvent(event);
  }).map(function (event) {
    return {
      guid: event.guid,
      start: getTimeMinutes(event.start),
      end: getTimeMinutes(event.end)
    };
  }).filter(function (event) {
    return event.end > event.start;
  });
  var guids = new Set();
  timedEvents.forEach(function (event, index) {
    timedEvents.slice(index + 1).forEach(function (otherEvent) {
      if (event.start < otherEvent.end && otherEvent.start < event.end) {
        guids.add(event.guid);
        guids.add(otherEvent.guid);
      }
    });
  });
  return guids;
};
var isOverlappingTimedEvent = function isOverlappingTimedEvent(event, visibleDate) {
  var eventDate = visibleDate || event && event.date;
  if (!isConflictEligibleTimedEvent(event) || !eventDate) {
    return false;
  }
  var date = parseDateString(String(eventDate).substring(0, 10));
  return getOverlappingTimedEventGuids(getEventsForDate(date)).has(event.guid);
};
var applyEventOverlapAttribute = function applyEventOverlapAttribute(element, event) {
  if (!element) {
    return;
  }
  var cell = element.closest('td[data-date]');
  var visibleDate = cell ? cell.getAttribute('data-real-date') || cell.getAttribute('data-date') : '';
  element.toggleAttribute('overlapping-event', isOverlappingTimedEvent(event, visibleDate));
};
var formatSelectTime = function formatSelectTime(value) {
  var match = normalizeTime(value).match(/^(\d{2}):(\d{2})/);
  var hour = Number(match[1]);
  var period = hour < 12 ? 'AM' : 'PM';
  hour = hour % 12 || 12;
  return "".concat(hour, ":").concat(match[2], " ").concat(period);
};
var formatDuration = function formatDuration(minutes) {
  if (minutes >= 60) {
    var hours = minutes / 60;
    return "".concat(Number.isInteger(hours) ? hours : hours.toFixed(1), " hr");
  }
  return "".concat(minutes, " min");
};
var setTimeSelectValue = function setTimeSelectValue(select, value) {
  if (!select) {
    return;
  }
  var normalized = normalizeTime(value);
  if (Array.from(select.options).some(function (option) {
    return option.value === normalized;
  })) {
    select.value = normalized;
    return;
  }
  if (select.options.length) {
    select.selectedIndex = 0;
  }
};
var getSelectTimeMinutes = function getSelectTimeMinutes(select) {
  return getTimeMinutes(select && select.value ? select.value : '00:00');
};
var getSelectOptionMinutes = function getSelectOptionMinutes(select) {
  return Array.from(select ? select.options : []).map(function (option) {
    return getTimeMinutes(option.value);
  });
};
var getSelectMinMinutes = function getSelectMinMinutes(select) {
  var options = getSelectOptionMinutes(select);
  return options.length ? Math.min.apply(null, options) : 0;
};
var getSelectMaxMinutes = function getSelectMaxMinutes(select) {
  var options = getSelectOptionMinutes(select);
  return options.length ? Math.max.apply(null, options) : 0;
};
var setSelectMinutes = function setSelectMinutes(select, minutes) {
  if (!select) {
    return;
  }
  select.value = minutesToTime(minutes);
};
var cacheRescheduleEndOptions = function cacheRescheduleEndOptions(endSelect) {
  if (!endSelect) {
    return [];
  }
  if (Array.isArray(endSelect.calendarRescheduleEndOptions)) {
    return endSelect.calendarRescheduleEndOptions;
  }
  endSelect.calendarRescheduleEndOptions = Array.from(endSelect.options).map(function (option) {
    return {
      value: option.value,
      label: option.textContent
    };
  });
  return endSelect.calendarRescheduleEndOptions;
};
var renderRescheduleEndOptions = function renderRescheduleEndOptions(startSelect, endSelect, preferredValue) {
  if (!startSelect || !endSelect) {
    return;
  }
  var allOptions = cacheRescheduleEndOptions(endSelect);
  var startMinutes = getSelectTimeMinutes(startSelect);
  var selectedValue = preferredValue || endSelect.value;
  var options = allOptions.filter(function (option) {
    return getTimeMinutes(option.value) > startMinutes;
  });
  endSelect.innerHTML = '';
  options.forEach(function (option) {
    var element = document.createElement('option');
    var duration = getTimeMinutes(option.value) - startMinutes;
    element.value = option.value;
    element.textContent = "".concat(option.label, " (").concat(formatDuration(duration), ")");
    endSelect.appendChild(element);
  });
  if (options.some(function (option) {
    return option.value === selectedValue;
  })) {
    endSelect.value = selectedValue;
    return;
  }
  if (endSelect.options.length) {
    endSelect.selectedIndex = 0;
  }
};
var syncRescheduleTimePicker = function syncRescheduleTimePicker(startSelect, endSelect, changedField) {
  if (!startSelect || !endSelect) {
    return;
  }
  var startMin = getSelectMinMinutes(startSelect);
  var endMax = getSelectMaxMinutes(endSelect);
  var startMinutes = getSelectTimeMinutes(startSelect);
  var endMinutes = getSelectTimeMinutes(endSelect);
  var duration = Math.max(15, state.rescheduleDurationMinutes || endMinutes - startMinutes || 15);
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
var getStudentName = function getStudentName(student) {
  if (!student) {
    return 'No title';
  }
  return [student.first_name, student.last_name].filter(Boolean).join(' ') || 'No title';
};
var getStudentFirstName = function getStudentFirstName(student) {
  return student && student.first_name ? String(student.first_name).trim() : '';
};
var studentHasBirthdayInWeek = function studentHasBirthdayInWeek(student, dateString) {
  if (!student || !student.date_of_birth || !isDateString(dateString)) {
    return false;
  }
  var birthDate = parseNullableDateString(student.date_of_birth);
  if (!birthDate) {
    return false;
  }
  var eventDate = parseDateString(dateString);
  var weekStart = startOfWeek(eventDate);
  var weekEnd = addDays(weekStart, 6);
  var years = Array.from(new Set([weekStart.getFullYear(), weekEnd.getFullYear()]));
  return years.some(function (year) {
    var birthday = createLocalDate(year, birthDate.getMonth(), birthDate.getDate());
    return birthday >= weekStart && birthday <= weekEnd;
  });
};
var getOrdinalSuffix = function getOrdinalSuffix(day) {
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
var formatBirthdayModalDate = function formatBirthdayModalDate(date) {
  return "".concat(birthdayMonthFormatter.format(date), " ").concat(date.getDate()).concat(getOrdinalSuffix(date.getDate()));
};
var getStudentBirthdayModalLabel = function getStudentBirthdayModalLabel(student, dateString) {
  if (!student || !student.date_of_birth || !isDateString(dateString)) {
    return '';
  }
  var birthDate = parseNullableDateString(student.date_of_birth);
  if (!birthDate) {
    return '';
  }
  var eventDate = parseDateString(dateString);
  var years = [eventDate.getFullYear() - 1, eventDate.getFullYear(), eventDate.getFullYear() + 1];
  var closestBirthday = null;
  var closestDiff = null;
  years.forEach(function (year) {
    var birthday = createLocalDate(year, birthDate.getMonth(), birthDate.getDate());
    var diff = Math.round((birthday.getTime() - eventDate.getTime()) / dayMilliseconds);
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
  return "on ".concat(formatBirthdayModalDate(closestBirthday));
};
var studentHasBirthdayNearEvent = function studentHasBirthdayNearEvent(student, dateString) {
  return Boolean(getStudentBirthdayModalLabel(student, dateString));
};
var renderEventTitle = function renderEventTitle(element, event, fallback) {
  if (!element) {
    return;
  }
  element.textContent = event && event.title || fallback || 'No title';
};
var clearScheduleItemBirthdayDecoration = function clearScheduleItemBirthdayDecoration(item) {
  if (!item) {
    return;
  }
  Array.from(item.children).forEach(function (child) {
    if (child.classList && child.classList.contains('calendar-birthday-icon')) {
      child.remove();
    }
  });
  item.removeAttribute('data-birthday-this-week');
  item.removeAttribute('data-birthday-title');
};
var normalizeStudentSearch = function normalizeStudentSearch(value) {
  return String(value || '').trim().toLowerCase();
};
var generalEventMatchesCalendarSearch = function generalEventMatchesCalendarSearch(event) {
  var query = normalizeStudentSearch(state.studentSearch);
  if (query.length < 3) {
    return true;
  }
  return String(event.event_type || '').toLowerCase().includes(query);
};
var lessonMatchesStudentSearch = function lessonMatchesStudentSearch(lesson) {
  var query = normalizeStudentSearch(state.studentSearch);
  if (query.length < 3) {
    return true;
  }
  var student = lesson.student || {};
  var firstName = String(student.first_name || '').toLowerCase();
  var lastName = String(student.last_name || '').toLowerCase();
  var fullName = [firstName, lastName].filter(Boolean).join(' ');
  return firstName.includes(query) || lastName.includes(query) || fullName.includes(query);
};
var lessonMatchesLocationFilter = function lessonMatchesLocationFilter(lesson) {
  if (!isLocationFilterActive()) {
    return true;
  }
  return locationIsSelected(lesson.location_id);
};
var getFilteredPlannedLessons = function getFilteredPlannedLessons() {
  return state.plannedLessons.concat(state.singleLessonPlans).filter(function (lesson) {
    var type = lesson.type === 'single-lesson-plan' ? 'single' : 'recurring';
    return state.selectedEventTypes.includes(type);
  }).filter(lessonMatchesStudentSearch).filter(lessonMatchesLocationFilter);
};
var getFirstOccurrenceDate = function getFirstOccurrenceDate(startsOn, weekday) {
  var start = cloneDate(startsOn);
  var carbonWeekday = Math.max(0, Math.min(6, Number(weekday) - 1));
  var offset = (carbonWeekday - start.getDay() + 7) % 7;
  return addDays(start, offset);
};
var getPlannedLessonEvents = function getPlannedLessonEvents(range) {
  var events = [];
  getFilteredPlannedLessons().forEach(function (lesson) {
    var isSingleLessonPlan = lesson.type === 'single-lesson-plan';
    if (Array.isArray(lesson.occurrences)) {
      lesson.occurrences.forEach(function (occurrence) {
        var dateString = occurrence.date || '';
        if (!dateString) {
          return;
        }
        var start = normalizeTime(occurrence.start || lesson.start_time);
        events.push({
          title: getStudentName(lesson.student),
          date: dateString,
          start: start,
          end: normalizeTime(occurrence.end || addMinutesToTime(lesson.start_time, lesson.duration_minutes)),
          color: '#2fbb7f',
          guid: "".concat(isSingleLessonPlan ? 'single-lesson-plan' : 'planned-lesson', "-").concat(lesson.id, "-").concat(dateString, "-").concat(start),
          lessonPlanId: isSingleLessonPlan ? '' : lesson.id,
          singleLessonPlanId: occurrence.single_lesson_plan_id || (isSingleLessonPlan ? lesson.id : ''),
          lessonId: occurrence.lesson_id || '',
          earlyPaymentId: occurrence.early_payment_id || '',
          scheduleOverrideId: occurrence.schedule_override_id || '',
          recurrence: isSingleLessonPlan ? 'Single lesson' : lesson.recurrence || '',
          isSingleLessonPlan: isSingleLessonPlan,
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
          birthdayModalLabel: getStudentBirthdayModalLabel(lesson.student, dateString)
        });
      });
      return;
    }
    if (isSingleLessonPlan) {
      return;
    }
    var startsOn = parseNullableDateString(lesson.starts_on);
    if (!startsOn) {
      return;
    }
    var interval = Math.max(1, Number(lesson.recurrence_interval || 1));
    var intervalDays = interval * 7;
    var endsOn = parseNullableDateString(lesson.ends_on);
    var firstOccurrence = getFirstOccurrenceDate(startsOn, lesson.weekday);
    var occurrence = cloneDate(firstOccurrence);
    if (endsOn && endsOn < range.start) {
      return;
    }
    if (occurrence < range.start) {
      var daysUntilRange = Math.floor((range.start - occurrence) / 86400000);
      var intervalsToSkip = Math.floor(daysUntilRange / intervalDays);
      occurrence = addDays(occurrence, intervalsToSkip * intervalDays);
      while (occurrence < range.start) {
        occurrence = addDays(occurrence, intervalDays);
      }
    }
    while (occurrence <= range.end && (!endsOn || occurrence <= endsOn)) {
      var dateString = toDateString(occurrence);
      var start = normalizeTime(lesson.start_time);
      var confirmedLesson = getLessonForOccurrence(lesson, dateString, start);
      var lessonStatus = getLessonStatus(confirmedLesson);
      events.push({
        title: getStudentName(lesson.student),
        date: dateString,
        start: start,
        end: addMinutesToTime(start, lesson.duration_minutes),
        color: '#2fbb7f',
        guid: "planned-lesson-".concat(lesson.id, "-").concat(dateString),
        lessonPlanId: lesson.id,
        lessonId: confirmedLesson ? confirmedLesson.id : '',
        recurrence: lesson.recurrence || '',
        lessonStatus: lessonStatus,
        calendarStatus: lessonStatus,
        'data-lesson-status': lessonStatus,
        feeAmount: confirmedLesson && confirmedLesson.fee_amount ? confirmedLesson.fee_amount : lesson.fee_amount || 0,
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
        birthdayModalLabel: getStudentBirthdayModalLabel(lesson.student, dateString)
      });
      occurrence = addDays(occurrence, intervalDays);
    }
  });
  return events;
};
var syncCalendarEvents = function syncCalendarEvents() {
  var generalEvents = state.selectedEventTypes.includes('general') ? getGeneralEventCalendarEvents() : [];
  state.events = normalizeScheduleEvents(state.customEvents).concat(getPlannedLessonEvents(getCalendarEventRange())).concat(generalEvents);
  state.visibleEventsByDate = null;
};
var createCalendarEvent = function createCalendarEvent(date) {
  return {
    title: 'No title',
    date: toDateString(date),
    start: '09:00',
    end: '10:00',
    color: '#2fbb7f',
    guid: "calendar-".concat(Date.now(), "-").concat(Math.round(Math.random() * 100000))
  };
};
var getEventsForDate = function getEventsForDate(date) {
  var dateString = toDateString(date);
  return getVisibleEventsByDate()[dateString] || [];
};
var getCalendarItemsForDate = function getCalendarItemsForDate(date) {
  var holidays = getHolidaysForDate(date).map(function (holiday) {
    return Object.assign({}, holiday, {
      guid: "holiday-".concat(holiday.date, "-").concat(holiday.title),
      isHoliday: true
    });
  });
  return holidays.concat(getBreakEventsForDate(date)).concat(getRecitalEventsForDate(date)).concat(getEventsForDate(date));
};
var hasOverlappingTimedEvents = function hasOverlappingTimedEvents(events) {
  var latestEnd = null;
  return events.filter(function (event) {
    return isConflictEligibleTimedEvent(event);
  }).map(function (event) {
    return {
      start: getTimeMinutes(event.start),
      end: getTimeMinutes(event.end)
    };
  }).filter(function (event) {
    return event.end > event.start;
  }).sort(function (a, b) {
    return a.start - b.start || a.end - b.end;
  }).some(function (event) {
    var overlaps = latestEnd !== null && event.start < latestEnd;
    latestEnd = latestEnd === null ? event.end : Math.max(latestEnd, event.end);
    return overlaps;
  });
};
var createMonthEventElement = function createMonthEventElement(event, dateString) {
  var item = document.createElement('span');
  var dot = document.createElement('span');
  var time = document.createElement('span');
  var title = document.createElement('span');
  item.className = event.isHoliday ? 'calendar-month-event calendar-month-event-holiday' : event.isBreak ? 'calendar-month-event calendar-month-event-break' : event.isRecital ? 'calendar-month-event calendar-month-event-recital' : event.isGeneralEvent ? 'calendar-month-event calendar-month-event-general' : 'calendar-month-event';
  dot.className = 'calendar-month-event-dot';
  time.className = 'calendar-month-event-time';
  title.className = 'calendar-month-event-title';
  item.dataset.eventGuid = event.guid || '';
  item.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.isRecital ? 'recital' : event.isGeneralEvent ? 'general-event' : event.calendarStatus || event.lessonStatus || 'unconfirmed';
  dot.dataset.eventGuid = event.guid || '';
  dot.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.isRecital ? 'recital' : event.isGeneralEvent ? 'general-event' : event.calendarStatus || event.lessonStatus || 'unconfirmed';
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
var hideBootstrapModal = function hideBootstrapModal(modal) {
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
var showBootstrapModal = function showBootstrapModal(modal) {
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
var showCalendarEditError = function showCalendarEditError(modal, message) {
  if (!modal) {
    return;
  }
  var error = modal.querySelector('[data-calendar-edit-error]');
  if (!error) {
    error = document.createElement('div');
    error.className = 'alert alert-danger small mb-3';
    error.setAttribute('data-calendar-edit-error', '');
    modal.querySelector('.modal-body').prepend(error);
  }
  error.textContent = message || 'Unable to update this item.';
  error.hidden = false;
};
var initializeCalendarEditModal = function initializeCalendarEditModal(modal) {
  if (!modal) {
    return;
  }
  initializeSingleLessonPlanForms(modal);
  initializeLessonPlanForms(modal);
  var currencyInputs = modal.querySelectorAll('[data-mask="usd"]');
  if (currencyInputs.length && typeof window.Inputmask === 'function') {
    new window.Inputmask({
      alias: 'numeric',
      groupSeparator: ',',
      prefix: '$ ',
      autoGroup: true,
      digits: 0,
      rightAlign: false
    }).mask(currencyInputs);
  }
};
var loadCalendarEditModal = function loadCalendarEditModal(button, sourceModal, container) {
  var url = button ? button.dataset.url : '';
  if (!button || !url || !container) {
    return;
  }
  button.disabled = true;
  fetch(url, {
    headers: {
      'Accept': 'text/html',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Unable to load the edit form.');
    }
    return response.text();
  }).then(function (html) {
    var didShow = false;
    container.innerHTML = html;
    var editModal = container.querySelector('.modal');
    var showEditModal = function showEditModal() {
      if (didShow || !editModal) {
        return;
      }
      didShow = true;
      initializeCalendarEditModal(editModal);
      showBootstrapModal(editModal);
    };
    button.disabled = false;
    if (sourceModal && sourceModal.classList.contains('show')) {
      sourceModal.addEventListener('hidden.bs.modal', showEditModal, {
        once: true
      });
      hideBootstrapModal(sourceModal);
      window.setTimeout(showEditModal, 250);
      return;
    }
    showEditModal();
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    if (sourceModal && sourceModal.id === 'lesson-modal') {
      showLessonActionError(sourceModal, error.message);
    } else {
      showGeneralEventActionError(sourceModal, error.message);
    }
  });
};
var submitCalendarEditForm = function submitCalendarEditForm(form, refreshCalendar) {
  var modal = form ? form.closest('.modal') : null;
  if (!form || !form.action || !modal) {
    return;
  }
  setFormSubmitting(form, true);
  requestJson(form.action, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: new FormData(form)
  }, 'Unable to update this item.').then(function () {
    hideBootstrapModal(modal);
    return refreshCalendar();
  })["catch"](function (error) {
    console.error(error);
    showCalendarEditError(modal, error.message);
  })["finally"](function () {
    setFormSubmitting(form, false);
  });
};
var openMonthDayEventsModal = function openMonthDayEventsModal(dateString) {
  var modal = document.getElementById('month-day-events-modal');
  if (!modal) {
    return;
  }
  var title = modal.querySelector('.modal-title');
  var list = modal.querySelector('[data-month-day-events-list]');
  var conflict = modal.querySelector('[data-month-day-events-conflict]');
  var date = parseDateString(dateString);
  var events = getCalendarItemsForDate(date);
  var overlappingEventGuids = getOverlappingTimedEventGuids(events);
  if (title) {
    title.textContent = dayFormatter.format(date);
  }
  if (list) {
    list.innerHTML = '';
    var specialEvents = events.filter(function (event) {
      return event.isHoliday || event.isBreak || event.isRecital;
    });
    var regularEvents = events.filter(function (event) {
      return !event.isHoliday && !event.isBreak && !event.isRecital;
    });
    var appendEvent = function appendEvent(container, event) {
      var item = createMonthEventElement(event, dateString);
      item.toggleAttribute('overlapping-event', overlappingEventGuids.has(event.guid));
      container.appendChild(item);
    };
    if (specialEvents.length) {
      var specialEventsContainer = document.createElement('div');
      specialEventsContainer.className = 'calendar-month-day-events-special d-flex flex-wrap gap-1';
      specialEvents.forEach(function (event) {
        appendEvent(specialEventsContainer, event);
      });
      list.appendChild(specialEventsContainer);
    }
    regularEvents.forEach(function (event) {
      appendEvent(list, event);
    });
  }
  if (conflict) conflict.hidden = overlappingEventGuids.size === 0;
  showBootstrapModal(modal);
};
var renderMonthCalendar = function renderMonthCalendar(calendar) {
  var today = todayString();
  var selected = toDateString(state.date);
  var month = state.date.getMonth();
  var gridStart = startOfMonthGrid(state.date);
  var wrapper = document.createElement('div');
  var weekdaysRow = document.createElement('div');
  var grid = document.createElement('div');
  wrapper.className = 'calendar-month-calendar';
  weekdaysRow.className = 'calendar-month-weekdays';
  grid.className = 'calendar-month-grid';
  monthWeekdays.forEach(function (day) {
    var heading = document.createElement('div');
    heading.textContent = day;
    weekdaysRow.appendChild(heading);
  });
  var _loop = function _loop() {
    var date = addDays(gridStart, i);
    var dateString = toDateString(date);
    var events = getCalendarItemsForDate(date);
    var cell = document.createElement('div');
    var day = document.createElement('span');
    var list = document.createElement('span');
    var hasOverlaps = hasOverlappingTimedEvents(events);
    var visibleEventCount = events.length >= 5 ? 3 : 4;
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
    day.textContent = date.getDate() === 1 ? "".concat(shortMonthFormatter.format(date), " ").concat(date.getDate()) : date.getDate();
    list.className = 'calendar-month-events';
    if (hasOverlaps) {
      var alert = document.createElement('i');
      alert.className = 'fa-solid fa-circle-exclamation calendar-month-overlap-alert';
      alert.setAttribute('aria-hidden', 'true');
      cell.appendChild(alert);
    }
    events.slice(0, visibleEventCount).forEach(function (event) {
      list.appendChild(createMonthEventElement(event, dateString));
    });
    if (events.length > 4) {
      var more = document.createElement('span');
      more.className = 'calendar-month-more';
      more.dataset.monthMoreDate = dateString;
      more.setAttribute('role', 'button');
      more.tabIndex = 0;
      more.textContent = "".concat(events.length - visibleEventCount, " more");
      list.appendChild(more);
    }
    cell.appendChild(day);
    cell.appendChild(list);
    grid.appendChild(cell);
  };
  for (var i = 0; i < 42; i++) {
    _loop();
  }
  wrapper.appendChild(weekdaysRow);
  wrapper.appendChild(grid);
  calendar.appendChild(wrapper);
};
var renderScheduleAgenda = function renderScheduleAgenda(calendar) {
  var range = getVisibleDateRange();
  var today = todayString();
  var selected = toDateString(state.date);
  var wrapper = document.createElement('div');
  wrapper.className = 'calendar-schedule-agenda';
  getDateRangeDates(range).forEach(function (date) {
    var dateString = toDateString(date);
    var items = getCalendarItemsForDate(date);
    var shouldRenderEmpty = dateString === today || dateString === selected;
    if (!items.length && !shouldRenderEmpty) {
      return;
    }
    var day = document.createElement('section');
    var dateRail = document.createElement('div');
    var weekday = document.createElement('div');
    var number = document.createElement('div');
    var list = document.createElement('div');
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
      var empty = document.createElement('div');
      empty.className = 'calendar-schedule-empty';
      empty.textContent = 'Nothing planned.';
      list.appendChild(empty);
    }
    items.forEach(function (event) {
      var item = document.createElement(event.isHoliday ? 'div' : 'button');
      var title = document.createElement('span');
      item.className = event.isHoliday ? 'calendar-schedule-event calendar-schedule-event-holiday' : event.isBreak ? 'calendar-schedule-event calendar-schedule-event-break' : event.isRecital ? 'calendar-schedule-event calendar-schedule-recital' : event.isGeneralEvent ? 'calendar-schedule-event calendar-schedule-event-general' : 'calendar-schedule-event';
      title.className = 'calendar-schedule-event-title';
      renderEventTitle(title, event, 'No title');
      item.dataset.eventGuid = event.guid || '';
      item.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.isRecital ? 'recital' : event.isGeneralEvent ? 'general-event' : event.calendarStatus || event.lessonStatus || 'unconfirmed';
      applyCalendarItemStatusAttributes(item, event, dateString);
      applyEventOverlapAttribute(item, event);
      if (!event.isHoliday && !event.isBreak && !event.isRecital) {
        var time = document.createElement('span');
        var duration = getEventDurationMinutes(event);
        item.type = 'button';
        item.dataset.durationMinutes = duration;
        item.style.setProperty('--calendar-schedule-event-height', getAgendaEventHeight(event));
        time.className = 'calendar-schedule-event-time';
        time.textContent = event.start && event.end ? "".concat(formatAgendaEventTime(event.start), "-").concat(formatAgendaEventTime(event.end)) : formatAgendaEventTime(event.start);
        item.appendChild(title);
        item.appendChild(time);
      } else {
        if (event.isBreak || event.isRecital) {
          item.type = 'button';
        }
        item.appendChild(title);
        if (event.isRecital) {
          var _time = document.createElement('span');
          _time.className = 'calendar-schedule-event-time';
          _time.textContent = formatAgendaEventTime(event.start);
          item.appendChild(_time);
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
var cloneDate = function cloneDate(date) {
  return createLocalDate(date.getFullYear(), date.getMonth(), date.getDate());
};
var addDays = function addDays(date, days) {
  var next = cloneDate(date);
  next.setDate(next.getDate() + days);
  return next;
};
var addMonths = function addMonths(date, months) {
  var next = cloneDate(date);
  next.setMonth(next.getMonth() + months);
  return next;
};
var startOfMonthGrid = function startOfMonthGrid(date) {
  var start = createLocalDate(date.getFullYear(), date.getMonth(), 1);
  start.setDate(start.getDate() - start.getDay());
  return start;
};
var startOfWeek = function startOfWeek(date) {
  return addDays(date, -date.getDay());
};
var getWeekLabel = function getWeekLabel(date) {
  var start = startOfWeek(date);
  var end = addDays(start, 6);
  return getRangeLabel(start, end);
};
var getRangeLabel = function getRangeLabel(start, end) {
  var sameMonth = start.getMonth() === end.getMonth();
  var sameYear = start.getFullYear() === end.getFullYear();
  if (sameMonth && sameYear) {
    return monthFormatter.format(start);
  }
  if (sameYear) {
    return "".concat(shortMonthFormatter.format(start), " - ").concat(shortMonthFormatter.format(end), " ").concat(end.getFullYear());
  }
  return "".concat(shortMonthFormatter.format(start), " ").concat(start.getFullYear(), " - ").concat(shortMonthFormatter.format(end), " ").concat(end.getFullYear());
};
var getLabel = function getLabel() {
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
var move = function move(direction) {
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
var getScheduleSwipeAnchor = function getScheduleSwipeAnchor(direction) {
  if (state.view === 'day') {
    return addDays(state.date, direction);
  }
  if (state.view === '2-days') {
    return addDays(state.date, direction * 2);
  }
  return addDays(state.date, direction * 7);
};
var createScheduleSwipePreview = function createScheduleSwipePreview(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var headerRow = schedule ? schedule.querySelector('thead tr:not(.calendar-schedule-holiday-row)') : null;
  var visibleHeaders = headerRow ? Array.from(headerRow.querySelectorAll('td')).filter(function (header) {
    return header.offsetParent !== null;
  }) : [];
  if (!schedule || !headerRow || visibleHeaders.length < 2) {
    return null;
  }
  var scheduleRect = schedule.getBoundingClientRect();
  var headerRect = headerRow.getBoundingClientRect();
  var width = schedule.clientWidth;
  var height = headerRect.height;
  var gutterWidth = visibleHeaders[0].getBoundingClientRect().width;
  var sampleHeaderStyle = window.getComputedStyle(visibleHeaders[1]);
  var sampleWeekdayStyle = window.getComputedStyle(visibleHeaders[1], '::before');
  var viewport = document.createElement('div');
  var track = document.createElement('div');
  viewport.className = 'calendar-schedule-swipe-preview';
  viewport.dataset.scheduleSwipePreview = '';
  viewport.style.left = "".concat(schedule.scrollLeft, "px");
  viewport.style.top = "".concat(schedule.scrollTop + headerRect.top - scheduleRect.top, "px");
  viewport.style.width = "".concat(width, "px");
  // Leave the header's own bottom pixel uncovered. Its td::after border then
  // remains on the non-moving sticky header layer while the preview slides.
  viewport.style.height = "".concat(Math.max(0, height - 1), "px");
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
  track.style.transform = "translate3d(".concat(-width, "px, 0, 0)");
  [-1, 0, 1].forEach(function (direction) {
    var anchor = direction === 0 ? state.date : getScheduleSwipeAnchor(direction);
    var dates = getScheduleDatesForAnchor(anchor, state.view);
    var panel = document.createElement('div');
    var gutter = document.createElement('div');
    panel.className = 'calendar-schedule-swipe-panel';
    panel.style.width = "".concat(width, "px");
    panel.style.height = "".concat(height, "px");
    panel.style.gridTemplateColumns = "".concat(gutterWidth, "px repeat(").concat(dates.length, ", minmax(0, 1fr))");
    gutter.className = 'calendar-schedule-swipe-gutter';
    panel.appendChild(gutter);
    dates.forEach(function (date) {
      var cell = document.createElement('div');
      var weekday = document.createElement('span');
      var day = document.createElement('span');
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
  return {
    viewport: viewport,
    track: track,
    width: width
  };
};
var bindScheduleHeaderSwipe = function bindScheduleHeaderSwipe(calendar, navigate) {
  var gesture = null;
  var removePreview = function removePreview(preview) {
    if (preview && preview.viewport.parentNode) {
      preview.viewport.remove();
    }
  };
  var finish = function finish(event, canceled) {
    if (!gesture || event.pointerId !== undefined && event.pointerId !== gesture.pointerId) {
      return;
    }
    var current = gesture;
    var elapsed = Math.max(1, event.timeStamp - current.startedAt);
    var velocity = current.deltaX / elapsed;
    var threshold = Math.min(90, current.preview ? current.preview.width * 0.18 : 90);
    var shouldNavigate = !canceled && current.dragging && (Math.abs(current.deltaX) >= threshold || Math.abs(current.deltaX) >= 24 && Math.abs(velocity) >= 0.45);
    gesture = null;
    document.documentElement.classList.remove('calendar-schedule-header-grabbing');
    if (!current.preview) {
      return;
    }
    current.preview.track.classList.add('is-settling');
    if (!shouldNavigate) {
      current.preview.track.style.transform = "translate3d(".concat(-current.preview.width, "px, 0, 0)");
      window.setTimeout(function () {
        removePreview(current.preview);
      }, 240);
      return;
    }
    var direction = current.deltaX < 0 ? 1 : -1;
    var destination = direction > 0 ? -current.preview.width * 2 : 0;
    current.preview.track.style.transform = "translate3d(".concat(destination, "px, 0, 0)");
    window.setTimeout(function () {
      navigate(direction);
    }, 220);
  };
  calendar.addEventListener('pointerdown', function (event) {
    var headerRow = event.target.closest('.lm-schedule thead tr:not(.calendar-schedule-holiday-row)');
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
      preview: null
    };
    document.documentElement.classList.add('calendar-schedule-header-grabbing');
    if (typeof headerRow.setPointerCapture === 'function') {
      headerRow.setPointerCapture(event.pointerId);
    }
  });
  calendar.addEventListener('pointermove', function (event) {
    if (!gesture || event.pointerId !== gesture.pointerId) {
      return;
    }
    var deltaX = event.clientX - gesture.startX;
    var deltaY = event.clientY - gesture.startY;
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
    gesture.preview.track.style.transform = "translate3d(".concat(-gesture.preview.width + gesture.deltaX, "px, 0, 0)");
  });
  calendar.addEventListener('pointerup', function (event) {
    finish(event, false);
  });
  calendar.addEventListener('pointercancel', function (event) {
    finish(event, true);
  });
};
var filterStudentComboboxOptions = function filterStudentComboboxOptions(combobox) {
  var input = combobox.querySelector('[data-student-combobox-input]');
  var options = Array.from(combobox.querySelectorAll('[data-student-combobox-option]'));
  var empty = combobox.querySelector('[data-student-combobox-empty]');
  var query = input ? input.value.trim().toLowerCase() : '';
  var visibleCount = 0;
  options.forEach(function (option) {
    var name = String(option.dataset.studentName || option.textContent || '').toLowerCase();
    var isVisible = !query || name.includes(query);
    option.hidden = !isVisible;
    if (isVisible) {
      visibleCount += 1;
    }
  });
  if (empty) {
    empty.hidden = visibleCount > 0;
  }
};
var openStudentCombobox = function openStudentCombobox(combobox) {
  combobox.setAttribute('open', '');
  filterStudentComboboxOptions(combobox);
};
var closeStudentCombobox = function closeStudentCombobox(combobox) {
  combobox.removeAttribute('open');
};
var syncFormLocationFromStudentOption = function syncFormLocationFromStudentOption(option) {
  var form = option ? option.closest('form') : null;
  var locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
  var studentLocationId = option ? option.dataset.studentLocationId : null;
  if (!locationSelect || !studentLocationId) {
    return;
  }
  var matchingOption = Array.from(locationSelect.options).find(function (locationOption) {
    return String(locationOption.value) === String(studentLocationId);
  });
  if (!matchingOption) {
    return;
  }
  locationSelect.value = studentLocationId;
  locationSelect.dispatchEvent(new Event('change', {
    bubbles: true
  }));
};
var syncFormPaymentMethodFromStudentOption = function syncFormPaymentMethodFromStudentOption(option) {
  var form = option ? option.closest('form') : null;
  var paymentMethodSelect = form ? form.querySelector('select[name="payment_method"]') : null;
  var studentPaymentMethod = option ? option.dataset.studentPaymentMethod : null;
  if (!paymentMethodSelect || !studentPaymentMethod) {
    return;
  }
  var matchingOption = Array.from(paymentMethodSelect.options).find(function (paymentOption) {
    return String(paymentOption.value) === String(studentPaymentMethod);
  });
  if (!matchingOption) {
    return;
  }
  paymentMethodSelect.value = studentPaymentMethod;
  paymentMethodSelect.dispatchEvent(new Event('change', {
    bubbles: true
  }));
};
var syncFormDefaultsFromStudentOption = function syncFormDefaultsFromStudentOption(option) {
  syncFormLocationFromStudentOption(option);
  syncFormPaymentMethodFromStudentOption(option);
};
var initializeStudentComboboxes = function initializeStudentComboboxes() {
  var comboboxes = Array.from(document.querySelectorAll('[data-student-combobox]'));
  comboboxes.forEach(function (combobox) {
    var input = combobox.querySelector('[data-student-combobox-input]');
    var value = combobox.querySelector('[data-student-combobox-value]');
    var options = Array.from(combobox.querySelectorAll('[data-student-combobox-option]'));
    if (!input || !value) {
      return;
    }
    input.addEventListener('focus', function () {
      openStudentCombobox(combobox);
    });
    input.addEventListener('click', function () {
      openStudentCombobox(combobox);
    });
    input.addEventListener('input', function () {
      value.value = '';
      input.setCustomValidity('');
      openStudentCombobox(combobox);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeStudentCombobox(combobox);
        input.blur();
      }
    });
    options.forEach(function (option) {
      option.addEventListener('click', function () {
        input.value = option.dataset.studentName || option.textContent.trim();
        value.value = option.dataset.studentId || '';
        input.setCustomValidity('');
        syncFormDefaultsFromStudentOption(option);
        closeStudentCombobox(combobox);
      });
    });
    var form = combobox.closest('form');
    if (form) {
      form.addEventListener('submit', function (e) {
        if (!value.value) {
          var typedName = input.value.trim().toLowerCase();
          var exactMatch = options.find(function (option) {
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
  document.addEventListener('click', function (e) {
    comboboxes.forEach(function (combobox) {
      if (!combobox.contains(e.target)) {
        closeStudentCombobox(combobox);
      }
    });
  });
};
var getSelectedLocationOption = function getSelectedLocationOption(form) {
  var locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
  return locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
};
var singleLessonLocationIsOnline = function singleLessonLocationIsOnline(form) {
  var selectedOption = getSelectedLocationOption(form);
  return selectedOption && selectedOption.dataset.isOnline === '1';
};
var setSingleLessonOnlineFields = function setSingleLessonOnlineFields(form, shouldEmpty) {
  var fields = form ? Array.from(form.querySelectorAll('.single-lesson-plan-online-field')) : [];
  var isOnline = singleLessonLocationIsOnline(form);
  fields.forEach(function (field) {
    var input = field.querySelector('input');
    field.style.display = isOnline ? '' : 'none';
    if (input) {
      input.disabled = !isOnline;
      if (!isOnline || shouldEmpty) {
        input.value = '';
      }
    }
  });
};
var syncSingleLessonFee = function syncSingleLessonFee(form) {
  var selectedOption = getSelectedLocationOption(form);
  var durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
  var feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
  var hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
  var duration = durationSelect ? Number(durationSelect.value || 0) : 0;
  if (!feeInput) {
    return;
  }
  if (!hourlyFee || !duration) {
    return;
  }
  var proratedFee = hourlyFee * (duration / 60);
  var roundedFee = Math.floor(proratedFee / 5) * 5;
  feeInput.value = roundedFee.toFixed(2).replace(/\.00$/, '');
};
var getSingleLessonPlanDefaultDate = function getSingleLessonPlanDefaultDate() {
  if (!state.date) {
    return todayString();
  }
  if (state.view === 'month') {
    return toDateString(createLocalDate(state.date.getFullYear(), state.date.getMonth(), 1));
  }
  return toDateString(getVisibleDateRange().start);
};
var syncSingleLessonPlanModalDate = function syncSingleLessonPlanModalDate(modal) {
  var dateInput = modal ? modal.querySelector('input[name="scheduled_date"]') : null;
  if (dateInput) {
    dateInput.value = getSingleLessonPlanDefaultDate();
  }
};
var initializeSingleLessonPlanForms = function initializeSingleLessonPlanForms(root) {
  (root || document).querySelectorAll('[data-single-lesson-plan-form]').forEach(function (form) {
    if (form.dataset.calendarFormInitialized === 'true') {
      return;
    }
    form.dataset.calendarFormInitialized = 'true';
    var locationSelect = form.querySelector('select[name="location_id"]');
    var durationSelect = form.querySelector('select[name="duration_minutes"]');
    var modal = form.closest('#create-single-lesson-plan-modal');
    setSingleLessonOnlineFields(form, false);
    if (locationSelect && durationSelect) {
      syncSingleLessonFee(form);
    }
    if (locationSelect) {
      locationSelect.addEventListener('change', function () {
        syncSingleLessonFee(form);
        setSingleLessonOnlineFields(form, true);
      });
    }
    if (durationSelect) {
      durationSelect.addEventListener('change', function () {
        syncSingleLessonFee(form);
      });
    }
    if (modal) {
      modal.addEventListener('show.bs.modal', function () {
        syncSingleLessonPlanModalDate(modal);
      });
    }
  });
};
var setLessonPlanOnlineFields = function setLessonPlanOnlineFields(form, shouldEmpty) {
  var fields = form ? Array.from(form.querySelectorAll('.lesson-plan-online-field')) : [];
  var isOnline = singleLessonLocationIsOnline(form);
  fields.forEach(function (field) {
    var input = field.querySelector('input');
    field.style.display = isOnline ? '' : 'none';
    if (input) {
      input.disabled = !isOnline;
      if (!isOnline || shouldEmpty) {
        input.value = '';
      }
    }
  });
};
var syncLessonPlanFee = function syncLessonPlanFee(form) {
  var selectedOption = getSelectedLocationOption(form);
  var durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
  var feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
  var hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
  var duration = durationSelect ? Number(durationSelect.value || 0) : 0;
  if (!feeInput) {
    return;
  }
  if (!hourlyFee || !duration) {
    return;
  }
  var proratedFee = hourlyFee * (duration / 60);
  var roundedFee = Math.floor(proratedFee / 5) * 5;
  feeInput.value = roundedFee.toFixed(2).replace(/\.00$/, '');
};
var initializeLessonPlanForms = function initializeLessonPlanForms(root) {
  (root || document).querySelectorAll('[data-lesson-plan-form]').forEach(function (form) {
    if (form.dataset.calendarFormInitialized === 'true') {
      return;
    }
    form.dataset.calendarFormInitialized = 'true';
    var locationSelect = form.querySelector('select[name="location_id"]');
    var durationSelect = form.querySelector('select[name="duration_minutes"]');
    setLessonPlanOnlineFields(form, false);
    if (locationSelect && durationSelect) {
      syncLessonPlanFee(form);
    }
    if (locationSelect) {
      locationSelect.addEventListener('change', function () {
        syncLessonPlanFee(form);
        setLessonPlanOnlineFields(form, true);
      });
    }
    if (durationSelect) {
      durationSelect.addEventListener('change', function () {
        syncLessonPlanFee(form);
      });
    }
  });
};
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    var button = e.target.closest('.setting-undo');
    if (!button) {
      return;
    }
    var input = document.getElementById(button.dataset.settingTarget);
    if (!input || typeof button.dataset.settingOriginal === 'undefined') {
      return;
    }
    if (input.type === 'checkbox') {
      input.checked = button.dataset.settingOriginal === 'true';
    } else {
      input.value = button.dataset.settingOriginal;
    }
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    input.dispatchEvent(new Event('change', {
      bubbles: true
    }));
  });
  var calendar = document.getElementById('calendar');
  var label = document.querySelector('[data-calendar-label]');
  var today = document.querySelector('[data-calendar-today]');
  var previous = document.querySelector('[data-calendar-prev]');
  var next = document.querySelector('[data-calendar-next]');
  var view = document.querySelector('[data-calendar-view]');
  var miniLabel = document.querySelector('[data-mini-label]');
  var miniGrid = document.querySelector('[data-mini-grid]');
  var miniPrevious = document.querySelector('[data-mini-prev]');
  var miniNext = document.querySelector('[data-mini-next]');
  var lessonModal = document.getElementById('lesson-modal');
  var generalEventModal = document.getElementById('general-event-modal');
  var calendarEditModalContainer = document.getElementById('calendar-edit-modal-container');
  var calendarSearch = document.querySelector('.calendar-calendar-search');
  var calendarToolbar = calendarSearch ? calendarSearch.closest('.calendar-calendar-toolbar') : null;
  var calendarSearchToggle = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-toggle]') : null;
  var calendarSearchClear = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-clear]') : null;
  var studentSearch = calendarSearch ? calendarSearch.querySelector('input[name="search"]') : null;
  var offcanvasViews = document.getElementById('calendar-offcanvas-views');
  var offcanvasViewItems = Array.from(document.querySelectorAll('[data-calendar-offcanvas-view]'));
  var calendarInsights = document.getElementById('calendar-calendar-insights');
  var calendarInsightsSidebarTarget = document.querySelector('[data-calendar-insights-sidebar-target]');
  var calendarInsightsOffcanvasTarget = document.querySelector('[data-calendar-insights-offcanvas-target]');
  var locationFilters = document.querySelector('[data-calendar-location-filters]');
  var eventTypeFilters = document.querySelector('[data-calendar-event-type-filters]');
  var calendarCreateMenu = document.querySelector('[data-calendar-create-menu]');
  var calendarCreateToggle = document.querySelector('[data-calendar-create-toggle]');
  var calendarCreateSingle = document.querySelector('[data-calendar-create-single]');
  var calendarCreateRecurring = document.querySelector('[data-calendar-create-recurring]');
  var calendarCreateEvent = document.querySelector('[data-calendar-create-event]');
  var calendarFilter = document.querySelector('.calendar-calendar-filter');
  var calendarCreateBackdrop = null;
  if (!calendar) {
    return;
  }
  var scheduleItemHold = null;
  var suppressedScheduleItemClick = null;
  var scheduleHoldNavigationSuppressedUntil = 0;
  var isScheduleHoldNavigationSuppressed = function isScheduleHoldNavigationSuppressed() {
    return Boolean(scheduleItemHold && scheduleItemHold.active) || Date.now() < scheduleHoldNavigationSuppressedUntil;
  };
  initializeStudentComboboxes();
  initializeSingleLessonPlanForms();
  initializeLessonPlanForms();
  state.plannedLessons = Array.isArray(window.calendarPlannedLessons) ? window.calendarPlannedLessons : Array.isArray(window.calendarLessonPlans) ? window.calendarLessonPlans : [];
  state.singleLessonPlans = Array.isArray(window.calendarSingleLessonPlans) ? window.calendarSingleLessonPlans : [];
  state.holidays = Array.isArray(window.calendarHolidays) ? window.calendarHolidays : [];
  state.showHolidays = window.calendarShowHolidays !== false;
  state.teachingBreaks = Array.isArray(window.calendarTeachingBreaks) ? window.calendarTeachingBreaks : [];
  state.recitals = Array.isArray(window.calendarRecitals) ? window.calendarRecitals : [];
  state.generalEvents = Array.isArray(window.calendarGeneralEvents) ? window.calendarGeneralEvents : [];
  state.locations = Array.isArray(window.calendarLocations) ? window.calendarLocations : [];
  state.loadedRange = normalizeRange(window.calendarCalendarRange);
  state.birthdayWindow = normalizeBirthdayWindow(window.calendarBirthdayWindow);
  var urlState = getUrlState();
  state.view = urlState.view;
  if (isValidDate(urlState.date)) {
    setSelectedDate(urlState.date);
  } else if (!state.date) {
    setSelectedDate(getTodayDate());
  } else {
    state.miniDate = cloneDate(state.date);
  }
  var syncViewControls = function syncViewControls() {
    if (view) {
      view.value = state.view;
    }
    offcanvasViewItems.forEach(function (item) {
      var selected = item.dataset.calendarOffcanvasView === state.view;
      item.toggleAttribute('selected', selected);
      item.classList.toggle('is-selected', selected);
      item.querySelectorAll('button').forEach(function (button) {
        button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });
    });
  };
  var removeCalendarCreateBackdrop = function removeCalendarCreateBackdrop(immediate) {
    if (!calendarCreateBackdrop) {
      return;
    }
    var backdrop = calendarCreateBackdrop;
    calendarCreateBackdrop = null;
    backdrop.classList.remove('show');
    var _removeBackdrop = function removeBackdrop() {
      backdrop.removeEventListener('transitionend', _removeBackdrop);
      backdrop.remove();
    };
    if (immediate) {
      _removeBackdrop();
      return;
    }
    backdrop.addEventListener('transitionend', _removeBackdrop);
    window.setTimeout(_removeBackdrop, 180);
  };
  var showCalendarCreateBackdrop = function showCalendarCreateBackdrop() {
    if (calendarCreateBackdrop) {
      return;
    }
    calendarCreateBackdrop = document.createElement('div');
    calendarCreateBackdrop.className = 'modal-backdrop fade';
    calendarCreateBackdrop.setAttribute('data-calendar-create-backdrop', '');
    document.body.appendChild(calendarCreateBackdrop);
    calendarCreateBackdrop.addEventListener('click', closeCalendarCreateMenu);
    window.requestAnimationFrame(function () {
      if (calendarCreateBackdrop) {
        calendarCreateBackdrop.classList.add('show');
      }
    });
  };
  var setCalendarCreateMenuOpen = function setCalendarCreateMenuOpen(isOpen, options) {
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
  }
  ;
  var openCalendarCreateModal = function openCalendarCreateModal(modalId) {
    closeCalendarCreateMenu({
      immediate: true
    });
    showBootstrapModal(document.getElementById(modalId));
  };
  if (calendarCreateToggle) {
    calendarCreateToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setCalendarCreateMenuOpen(!(calendarCreateMenu && calendarCreateMenu.hasAttribute('selected')));
    });
  }
  if (calendarCreateSingle) {
    calendarCreateSingle.addEventListener('click', function () {
      openCalendarCreateModal('create-single-lesson-plan-modal');
    });
  }
  if (calendarCreateRecurring) {
    calendarCreateRecurring.addEventListener('click', function () {
      openCalendarCreateModal('create-calendar-lesson-plan-modal');
    });
  }
  if (calendarCreateEvent) {
    calendarCreateEvent.addEventListener('click', function () {
      openCalendarCreateModal('create-event-modal');
    });
  }
  if (calendarCreateMenu) {
    calendarCreateMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
  document.addEventListener('click', function (e) {
    if (!calendarCreateMenu || !calendarCreateToggle || !calendarCreateMenu.hasAttribute('selected')) {
      return;
    }
    if (!calendarCreateMenu.contains(e.target) && !calendarCreateToggle.contains(e.target)) {
      closeCalendarCreateMenu();
    }
  });
  var syncCalendarInsightsPlacement = function syncCalendarInsightsPlacement() {
    if (!calendarInsights || !calendarInsightsSidebarTarget || !calendarInsightsOffcanvasTarget) {
      return;
    }
    var target = isSidebarHiddenViewport() ? calendarInsightsOffcanvasTarget : calendarInsightsSidebarTarget;
    if (calendarInsights.parentElement !== target) {
      target.appendChild(calendarInsights);
    }
  };
  var syncCalendarFilterSelectedState = function syncCalendarFilterSelectedState() {
    if (!calendarFilter) {
      return;
    }
    var eventTypeFilterIsActive = state.selectedEventTypes.length < 3;
    calendarFilter.toggleAttribute('selected', Boolean(isLocationFilterActive() || eventTypeFilterIsActive));
  };
  var syncLocationFilterState = function syncLocationFilterState() {
    if (!locationFilters) {
      return;
    }
    var checkedIds = Array.from(locationFilters.querySelectorAll('input[data-calendar-location-filter]:checked')).map(function (input) {
      return normalizeLocationId(input.value);
    }).filter(Boolean);
    state.selectedLocationIds = checkedIds;
    syncCalendarFilterSelectedState();
  };
  var syncEventTypeFilterState = function syncEventTypeFilterState() {
    if (!eventTypeFilters) {
      return;
    }
    state.selectedEventTypes = Array.from(eventTypeFilters.querySelectorAll('input[data-calendar-event-type-filter]:checked')).map(function (input) {
      return input.value;
    });
    syncCalendarFilterSelectedState();
  };
  var renderLocationFilters = function renderLocationFilters() {
    if (!locationFilters) {
      return;
    }
    locationFilters.innerHTML = '';
    if (!state.locations.length) {
      var empty = document.createElement('div');
      empty.className = 'small opacity-4';
      empty.textContent = 'No locations';
      locationFilters.appendChild(empty);
      return;
    }
    state.locations.forEach(function (location) {
      var id = "calendar-location-filter-".concat(location.id);
      var option = document.createElement('div');
      var label = document.createElement('label');
      var input = document.createElement('input');
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
  var setCalendarView = function setCalendarView(nextView) {
    if (!nextView || nextView === state.view) {
      syncViewControls();
      return;
    }
    state.view = nextView;
    state.didAutoNowScroll = false;
    syncViewControls();
    _render();
  };
  var openCalendarSearch = function openCalendarSearch() {
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
  var closeCalendarSearch = function closeCalendarSearch() {
    if (calendarSearch) {
      calendarSearch.removeAttribute('selected');
    }
    if (calendarToolbar) {
      calendarToolbar.removeAttribute('searching');
    }
  };
  var clearCalendarSearch = function clearCalendarSearch() {
    if (studentSearch) {
      studentSearch.value = '';
    }
    state.studentSearch = '';
    closeCalendarSearch();
    _render();
  };
  var closeCalendarViewsOffcanvas = function closeCalendarViewsOffcanvas() {
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
    var close = offcanvasViews.querySelector('.offcanvas-header [data-bs-dismiss="offcanvas"]');
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
  var renderMiniCalendar = function renderMiniCalendar() {
    if (!miniLabel || !miniGrid) {
      return;
    }
    miniLabel.textContent = monthFormatter.format(state.miniDate);
    miniGrid.innerHTML = '';
    var gridStart = startOfMonthGrid(state.miniDate);
    var selected = toDateString(state.date);
    var today = todayString();
    for (var i = 0; i < 42; i++) {
      var date = addDays(gridStart, i);
      var dateString = toDateString(date);
      var button = document.createElement('button');
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
  var getVisibleScheduleDay = function getVisibleScheduleDay(agenda) {
    var days = Array.from(agenda.querySelectorAll('.calendar-schedule-day'));
    if (!days.length) {
      return null;
    }
    var agendaRect = agenda.getBoundingClientRect();
    var marker = agendaRect.top + 1;
    return days.find(function (day) {
      var rect = day.getBoundingClientRect();
      return rect.bottom > marker;
    }) || days[0];
  };
  var syncScheduleLabelToScroll = function syncScheduleLabelToScroll(agenda) {
    if (state.view !== 'schedule' || !agenda) {
      return;
    }
    var visibleDay = getVisibleScheduleDay(agenda);
    if (!visibleDay || !visibleDay.dataset.date) {
      return;
    }
    var visibleDate = parseDateString(visibleDay.dataset.date);
    var visibleDateString = toDateString(visibleDate);
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
  var queueScheduleLabelSync = function queueScheduleLabelSync(agenda) {
    if (state.scheduleLabelFrame) {
      cancelAnimationFrame(state.scheduleLabelFrame);
    }
    state.scheduleLabelFrame = requestAnimationFrame(function () {
      state.scheduleLabelFrame = null;
      syncScheduleLabelToScroll(agenda);
    });
  };
  var scrollScheduleToSelectedDate = function scrollScheduleToSelectedDate(agenda) {
    if (!agenda) {
      return;
    }
    var selected = toDateString(state.date || getTodayDate());
    var target = agenda.querySelector(".calendar-schedule-day[data-date=\"".concat(selected, "\"]")) || agenda.querySelector(".calendar-schedule-day[data-date=\"".concat(todayString(), "\"]")) || agenda.querySelector('.calendar-schedule-day');
    if (!target) {
      return;
    }
    agenda.scrollTop = Math.max(0, target.offsetTop);
    syncScheduleLabelToScroll(agenda);
  };
  var bindScheduleAgenda = function bindScheduleAgenda(agenda) {
    if (!agenda) {
      return;
    }
    agenda.addEventListener('scroll', function () {
      queueScheduleLabelSync(agenda);
    }, {
      passive: true
    });
    requestAnimationFrame(function () {
      scrollScheduleToSelectedDate(agenda);
    });
  };
  var _render = function render() {
    var visibleRange = getVisibleDateRange();
    syncViewControls();
    updateCalendarUrl();
    if (!isRangeLoaded(visibleRange)) {
      fetchPlannedLessons(visibleRange).then(function () {
        if (isRangeLoaded(getVisibleDateRange())) {
          _render();
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
        onbeforeinsert: function onbeforeinsert() {
          return false;
        },
        onbeforechangeevent: function onbeforechangeevent(instance, detail) {
          if (detail && detail.action && !(detail.element && detail.element.hasAttribute('holding-event'))) {
            return false;
          }
        },
        onbeforechange: function onbeforechange(instance, detail) {
          if (scheduleItemHold && scheduleItemHold.active && detail && detail.action === 'updateEvent') {
            return false;
          }
        },
        oncreate: function oncreate(instance) {
          syncEvents(instance);
          queueSchedulePatch(calendar);
        },
        onchange: function onchange(instance) {
          syncEvents(instance);
          queueSchedulePatch(calendar);
        },
        onchangeevent: function onchangeevent(instance) {
          syncEvents(instance);
          queueSchedulePatch(calendar);
        },
        ondelete: function ondelete(instance) {
          syncEvents(instance);
          queueSchedulePatch(calendar);
        }
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
  var refreshCalendarAfterLessonMutation = function refreshCalendarAfterLessonMutation() {
    var schedule = calendar.querySelector('.lm-schedule');
    var scrollTop = schedule ? schedule.scrollTop : 0;
    var scrollLeft = schedule ? schedule.scrollLeft : 0;
    var visibleRange = getVisibleDateRange();
    state.loadedRange = null;
    state.pendingRangeKey = null;
    return fetchPlannedLessons(visibleRange).then(function () {
      state.suppressNextScheduleAnimation = true;
      _render();
      requestAnimationFrame(function () {
        var refreshedSchedule = calendar.querySelector('.lm-schedule');
        if (refreshedSchedule) {
          refreshedSchedule.scrollTop = scrollTop;
          refreshedSchedule.scrollLeft = scrollLeft;
        }
      });
    });
  };
  if (today) {
    today.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      setSelectedDate(getTodayDate());
      _render();
    });
  }
  if (previous) {
    previous.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      move(-1);
      _render();
    });
  }
  if (next) {
    next.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      move(1);
      _render();
    });
  }
  bindScheduleHeaderSwipe(calendar, function (direction) {
    if (isScheduleHoldNavigationSuppressed()) {
      return;
    }
    move(direction);
    _render();
  });
  if (view) {
    view.addEventListener('change', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        syncViewControls();
        return;
      }
      setCalendarView(this.value);
    });
  }
  offcanvasViewItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      setCalendarView(item.dataset.calendarOffcanvasView);
      closeCalendarViewsOffcanvas();
    });
  });
  if (studentSearch) {
    studentSearch.addEventListener('input', function () {
      state.studentSearch = this.value;
      _render();
    });
  }
  if (locationFilters) {
    locationFilters.addEventListener('change', function (e) {
      if (!e.target.matches('input[data-calendar-location-filter]')) {
        return;
      }
      syncLocationFilterState();
      _render();
    });
  }
  if (eventTypeFilters) {
    eventTypeFilters.addEventListener('change', function (e) {
      if (!e.target.matches('input[data-calendar-event-type-filter]')) {
        return;
      }
      syncEventTypeFilterState();
      _render();
    });
  }
  if (calendarSearchToggle) {
    calendarSearchToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openCalendarSearch();
    });
  }
  if (calendarSearchClear) {
    calendarSearchClear.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      clearCalendarSearch();
    });
  }
  if (calendarSearch) {
    calendarSearch.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    document.addEventListener('click', function (e) {
      if (!calendarSearch.contains(e.target)) {
        closeCalendarSearch();
      }
    });
  }
  if (miniPrevious) {
    miniPrevious.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      state.miniDate = addMonths(state.miniDate, -1);
      renderMiniCalendar();
    });
  }
  if (miniNext) {
    miniNext.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      state.miniDate = addMonths(state.miniDate, 1);
      renderMiniCalendar();
    });
  }
  if (miniGrid) {
    miniGrid.addEventListener('click', function (e) {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      var button = e.target.closest('[data-date]');
      if (!button) {
        return;
      }
      setSelectedDate(parseDateString(button.dataset.date));
      _render();
    });
  }
  var lessonTaught = document.getElementById('lesson-taught');
  if (lessonTaught) {
    lessonTaught.addEventListener('click', function (e) {
      e.preventDefault();
      storeTaughtLesson(lessonTaught, refreshCalendarAfterLessonMutation);
    });
  }
  var confirmPayment = document.getElementById('confirm-payment');
  if (confirmPayment) {
    confirmPayment.addEventListener('click', function (e) {
      e.preventDefault();
      confirmLessonPayment(confirmPayment, refreshCalendarAfterLessonMutation);
    });
  }
  var earlyPayment = document.getElementById('early-payment');
  if (earlyPayment) {
    earlyPayment.addEventListener('click', function (e) {
      e.preventDefault();
      storeEarlyPayment(earlyPayment, refreshCalendarAfterLessonMutation);
    });
  }
  var lessonRevert = document.getElementById('lesson-revert');
  if (lessonRevert) {
    lessonRevert.addEventListener('click', function (e) {
      e.preventDefault();
      revertLessonAction(lessonRevert, refreshCalendarAfterLessonMutation);
    });
  }
  var lessonEdit = document.getElementById('lesson-edit');
  if (lessonEdit) {
    lessonEdit.addEventListener('click', function (e) {
      e.preventDefault();
      loadCalendarEditModal(lessonEdit, lessonModal, calendarEditModalContainer);
    });
  }
  var cancelLessonButton = document.getElementById('cancel-lesson-button');
  if (cancelLessonButton) {
    cancelLessonButton.addEventListener('click', function (e) {
      e.preventDefault();
      showLessonCancelForm(lessonModal);
    });
  }
  if (lessonModal) {
    var rescheduleButton = lessonModal.querySelector('#reschedule-lesson-button');
    var rescheduleForm = lessonModal.querySelector('#reschedule-lesson form');
    var cancelForm = lessonModal.querySelector('#cancel-lesson form');
    var reschedulePrevious = lessonModal.querySelector('[data-reschedule-datepicker-prev]');
    var rescheduleNext = lessonModal.querySelector('[data-reschedule-datepicker-next]');
    var rescheduleGrid = lessonModal.querySelector('[data-reschedule-datepicker-grid]');
    var rescheduleDate = lessonModal.querySelector('#reschedule-lesson-date');
    var rescheduleStartTime = lessonModal.querySelector('#reschedule-lesson-start-time');
    var rescheduleEndTime = lessonModal.querySelector('#reschedule-lesson-end-time');
    if (rescheduleButton) {
      rescheduleButton.addEventListener('click', function (e) {
        e.preventDefault();
        showLessonRescheduleForm(lessonModal);
      });
    }
    [rescheduleForm, cancelForm].filter(Boolean).forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitLessonModalForm(form, refreshCalendarAfterLessonMutation);
      });
    });
    lessonModal.addEventListener('hidden.bs.modal', function () {
      restoreUpdatedScheduleItem(lessonModal.updatedScheduleItem);
      lessonModal.updatedScheduleItem = null;
      resetLessonModalState(lessonModal);
    });
    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
      window.jQuery(lessonModal).on('hidden.bs.modal', function () {
        restoreUpdatedScheduleItem(lessonModal.updatedScheduleItem);
        lessonModal.updatedScheduleItem = null;
        resetLessonModalState(lessonModal);
      });
    }
    if (reschedulePrevious) {
      reschedulePrevious.addEventListener('click', function () {
        state.rescheduleDatePickerDate = addMonths(state.rescheduleDatePickerDate || getTodayDate(), -1);
        renderRescheduleDatePicker(lessonModal);
      });
    }
    if (rescheduleNext) {
      rescheduleNext.addEventListener('click', function () {
        state.rescheduleDatePickerDate = addMonths(state.rescheduleDatePickerDate || getTodayDate(), 1);
        renderRescheduleDatePicker(lessonModal);
      });
    }
    if (rescheduleGrid) {
      rescheduleGrid.addEventListener('click', function (e) {
        var button = e.target.closest('[data-date]');
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
      rescheduleStartTime.addEventListener('change', function () {
        syncRescheduleTimePicker(rescheduleStartTime, rescheduleEndTime, 'start');
      });
    }
    if (rescheduleEndTime) {
      rescheduleEndTime.addEventListener('change', function () {
        syncRescheduleTimePicker(rescheduleStartTime, rescheduleEndTime, 'end');
      });
    }
  }
  if (generalEventModal) {
    var editButton = generalEventModal.querySelector('#event-edit');
    var cancelButton = generalEventModal.querySelector('#cancel-general-event-button');
    var _rescheduleButton = generalEventModal.querySelector('#reschedule-general-event-button');
    var _rescheduleForm = generalEventModal.querySelector('#reschedule-general-event form');
    var _cancelForm = generalEventModal.querySelector('#cancel-general-event form');
    var _reschedulePrevious = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-prev]');
    var _rescheduleNext = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-next]');
    var _rescheduleGrid = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-grid]');
    var _rescheduleDate = generalEventModal.querySelector('#reschedule-general-event-date');
    var _rescheduleStartTime = generalEventModal.querySelector('#reschedule-general-event-start-time');
    var _rescheduleEndTime = generalEventModal.querySelector('#reschedule-general-event-end-time');
    if (editButton) {
      editButton.addEventListener('click', function (e) {
        e.preventDefault();
        loadCalendarEditModal(editButton, generalEventModal, calendarEditModalContainer);
      });
    }
    if (cancelButton) {
      cancelButton.addEventListener('click', function () {
        showGeneralEventCancelForm(generalEventModal);
      });
    }
    if (_rescheduleButton) {
      _rescheduleButton.addEventListener('click', function () {
        showGeneralEventRescheduleForm(generalEventModal);
      });
    }
    [_rescheduleForm, _cancelForm].filter(Boolean).forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitGeneralEventModalForm(form, refreshCalendarAfterLessonMutation);
      });
    });
    generalEventModal.addEventListener('hidden.bs.modal', function () {
      restoreUpdatedScheduleItem(generalEventModal.updatedScheduleItem);
      generalEventModal.updatedScheduleItem = null;
      resetGeneralEventModalState(generalEventModal);
    });
    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
      window.jQuery(generalEventModal).on('hidden.bs.modal', function () {
        restoreUpdatedScheduleItem(generalEventModal.updatedScheduleItem);
        generalEventModal.updatedScheduleItem = null;
        resetGeneralEventModalState(generalEventModal);
      });
    }
    if (_reschedulePrevious) {
      _reschedulePrevious.addEventListener('click', function () {
        state.generalEventRescheduleDatePickerDate = addMonths(state.generalEventRescheduleDatePickerDate || getTodayDate(), -1);
        renderGeneralEventRescheduleDatePicker(generalEventModal);
      });
    }
    if (_rescheduleNext) {
      _rescheduleNext.addEventListener('click', function () {
        state.generalEventRescheduleDatePickerDate = addMonths(state.generalEventRescheduleDatePickerDate || getTodayDate(), 1);
        renderGeneralEventRescheduleDatePicker(generalEventModal);
      });
    }
    if (_rescheduleGrid) {
      _rescheduleGrid.addEventListener('click', function (e) {
        var button = e.target.closest('[data-date]');
        if (!button) {
          return;
        }
        if (_rescheduleDate) {
          _rescheduleDate.value = button.dataset.date;
        }
        state.generalEventRescheduleDatePickerDate = parseDateString(button.dataset.date);
        renderGeneralEventRescheduleDatePicker(generalEventModal);
      });
    }
    if (_rescheduleStartTime) {
      _rescheduleStartTime.addEventListener('change', function () {
        syncRescheduleTimePicker(_rescheduleStartTime, _rescheduleEndTime, 'start');
      });
    }
    if (_rescheduleEndTime) {
      _rescheduleEndTime.addEventListener('change', function () {
        syncRescheduleTimePicker(_rescheduleStartTime, _rescheduleEndTime, 'end');
      });
    }
  }
  if (calendarEditModalContainer) {
    calendarEditModalContainer.addEventListener('submit', function (e) {
      var form = e.target.closest('form');
      if (!form || !calendarEditModalContainer.contains(form)) {
        return;
      }
      e.preventDefault();
      submitCalendarEditForm(form, refreshCalendarAfterLessonMutation);
    });
  }
  calendar.addEventListener('click', function (e) {
    var day = e.target.closest('.calendar-month-day');
    if (!day || state.view !== 'month') {
      return;
    }
    var more = e.target.closest('.calendar-month-more');
    if (more) {
      e.preventDefault();
      e.stopPropagation();
      openMonthDayEventsModal(more.dataset.monthMoreDate || day.dataset.date);
      return;
    }
    if (!e.target.closest('.calendar-month-event')) {
      setSelectedDate(parseDateString(day.dataset.date));
      state.view = 'week';
      _render();
    }
  });
  calendar.addEventListener('mousedown', function (e) {
    var item = e.target.closest('.lm-schedule-item');
    if (!item || item.hasAttribute('holding-event')) {
      return;
    }
    e.stopPropagation();
  }, true);
  var removeScheduleHoldTime = function removeScheduleHoldTime(hold) {
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
  var updateScheduleHoldTime = function updateScheduleHoldTime(hold) {
    if (!hold || hold !== scheduleItemHold || !hold.active || !hold.clone) {
      return;
    }
    var row = hold.clone.closest('tr');
    var gutter = row && row.cells.length ? row.cells[0] : null;
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
    hold.timeMarker.textContent = formatEventTime(hold.clone.getAttribute('data-start') || hold.clone.start).replace(/(?:am|pm)$/i, '');
  };
  var queueScheduleHoldTimeUpdate = function queueScheduleHoldTimeUpdate(hold) {
    if (!hold || hold !== scheduleItemHold) {
      return;
    }
    if (hold.timeMarkerFrame) {
      window.cancelAnimationFrame(hold.timeMarkerFrame);
    }
    hold.timeMarkerFrame = window.requestAnimationFrame(function () {
      hold.timeMarkerFrame = null;
      updateScheduleHoldTime(hold);
    });
  };
  var finishScheduleNativeDrag = function finishScheduleNativeDrag(hold, clientX, clientY, commitVisualDrop) {
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
      clientY: clientY === undefined ? hold.lastY : clientY
    }));
  };
  var restoreUpdatedScheduleItem = function restoreUpdatedScheduleItem(item) {
    var original = item && item.scheduleOriginalPosition;
    if (!item || !original || !item.isConnected || !original.cell || !original.cell.isConnected) {
      return;
    }
    Object.keys(original.attributes).forEach(function (attribute) {
      var value = original.attributes[attribute];
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
  var getScheduleItemGuid = function getScheduleItemGuid(item) {
    var event = getEventByScheduleItem(item);
    return String(event && event.guid || item && (item.id || item.dataset.eventGuid) || '');
  };
  var removeDuplicateScheduleItems = function removeDuplicateScheduleItems(schedule, item) {
    var guid = getScheduleItemGuid(item);
    if (!schedule || !guid) {
      return;
    }
    schedule.querySelectorAll('.lm-schedule-item').forEach(function (candidate) {
      if (candidate !== item && getScheduleItemGuid(candidate) === guid) {
        candidate.remove();
      }
    });
  };
  var applyScheduleVisualDrop = function applyScheduleVisualDrop(hold) {
    if (!hold || !hold.commitVisualDrop || !hold.clone || !hold.item || !hold.item.event) {
      return;
    }
    var target = hold.clone.parentElement;
    if (!target || target.tagName !== 'TD' || !hold.schedule || !hold.schedule.contains(target)) {
      return;
    }
    var wasMoved = target !== hold.originCell;
    if (wasMoved && !hold.item.scheduleOriginalPosition) {
      hold.item.scheduleOriginalPosition = {
        cell: hold.originCell,
        attributes: ['data-x', 'data-height', 'data-start', 'data-end'].reduce(function (attributes, attribute) {
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
        visibleDate: hold.originCell.getAttribute('data-real-date') || hold.originCell.getAttribute('data-date'),
        eventOriginalDate: hold.item.event.originalDate,
        eventOriginalStartTime: hold.item.event.originalStartTime
      };
    }
    var start = hold.clone.getAttribute('data-start') || hold.clone.start;
    var end = hold.clone.getAttribute('data-end') || hold.clone.end;
    var date = target.getAttribute('data-real-date') || target.getAttribute('data-date') || hold.clone.date;
    var weekday = hold.clone.weekday;
    ['data-x', 'data-height', 'data-start', 'data-end'].forEach(function (attribute) {
      var value = hold.clone.getAttribute(attribute);
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
      hold.item.event.originalDate = hold.item.event.originalDate || hold.item.scheduleOriginalPosition.visibleDate || hold.item.scheduleOriginalPosition.eventDate;
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
  var clearScheduleItemHold = function clearScheduleItemHold(pointerId) {
    if (!scheduleItemHold || pointerId !== undefined && pointerId !== scheduleItemHold.pointerId) {
      return;
    }
    finishScheduleNativeDrag(scheduleItemHold);
    window.clearTimeout(scheduleItemHold.timer);
    if (scheduleItemHold.active) {
      scheduleHoldNavigationSuppressedUntil = Date.now() + 750;
      var suppressedItem = scheduleItemHold.item;
      suppressedScheduleItemClick = suppressedItem;
      window.setTimeout(function () {
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
    var schedule = scheduleItemHold.schedule || scheduleItemHold.item.closest('.lm-schedule');
    if (schedule) {
      schedule.querySelectorAll('.lm-schedule-item[holding-event]').forEach(function (item) {
        item.remove();
      });
      schedule.style.removeProperty('cursor');
      schedule.style.touchAction = scheduleItemHold.scheduleTouchAction || '';
      schedule.style.overscrollBehavior = scheduleItemHold.scheduleOverscrollBehavior || '';
      schedule.style.overflow = scheduleItemHold.scheduleOverflow || '';
    }
    if (typeof scheduleItemHold.item.releasePointerCapture === 'function' && typeof scheduleItemHold.item.hasPointerCapture === 'function' && scheduleItemHold.item.hasPointerCapture(scheduleItemHold.pointerId)) {
      scheduleItemHold.item.releasePointerCapture(scheduleItemHold.pointerId);
    }
    var shouldPatchSchedule = scheduleItemHold.active;
    scheduleItemHold = null;
    if (shouldPatchSchedule && scheduleGridViews.includes(state.view)) {
      queueSchedulePatch(calendar);
    }
  };
  calendar.addEventListener('pointerdown', function (e) {
    var item = e.target.closest('.lm-schedule-item');
    if (!item || item.getAttribute('data-lesson-status') === 'canceled' || !scheduleGridViews.includes(state.view) || e.button !== 0 || !e.isPrimary) {
      return;
    }
    clearScheduleItemHold();
    scheduleItemHold = {
      item: item,
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
      timer: window.setTimeout(function () {
        if (!scheduleItemHold || scheduleItemHold.item !== item || !item.isConnected) {
          return;
        }
        var clone = item.cloneNode(true);
        var event = item.event;
        var schedule = item.closest('.lm-schedule');
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
          clientY: e.clientY
        }));
        queueScheduleHoldTimeUpdate(scheduleItemHold);
      }, 600)
    };
  });
  calendar.addEventListener('pointermove', function (e) {
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
          clientY: e.clientY
        }));
      }
      queueScheduleHoldTimeUpdate(scheduleItemHold);
      return;
    }
    if (Math.abs(e.clientX - scheduleItemHold.startX) > 8 || Math.abs(e.clientY - scheduleItemHold.startY) > 8) {
      clearScheduleItemHold(e.pointerId);
    }
  }, {
    passive: false
  });
  document.addEventListener('pointerup', function (e) {
    if (scheduleItemHold && scheduleItemHold.pointerId === e.pointerId && scheduleItemHold.active && scheduleItemHold.pointerType !== 'mouse') {
      e.preventDefault();
      finishScheduleNativeDrag(scheduleItemHold, e.clientX, e.clientY, true);
      return;
    }
    if (!scheduleItemHold || scheduleItemHold.pointerId !== e.pointerId || !scheduleItemHold.active) {
      clearScheduleItemHold(e.pointerId);
    }
  }, {
    passive: false
  });
  document.addEventListener('mouseup', function () {
    if (scheduleItemHold && scheduleItemHold.active) {
      if (!scheduleItemHold.finishingNativeDrag) {
        scheduleItemHold.commitVisualDrop = true;
      }
      scheduleItemHold.finishingNativeDrag = false;
      scheduleItemHold.nativeDragFinished = true;
      window.setTimeout(function () {
        clearScheduleItemHold();
      }, 0);
    }
  });
  document.addEventListener('pointercancel', function (e) {
    if (scheduleItemHold && scheduleItemHold.pointerId === e.pointerId && scheduleItemHold.active && scheduleItemHold.pointerType !== 'mouse') {
      finishScheduleNativeDrag(scheduleItemHold, e.clientX, e.clientY);
    }
    clearScheduleItemHold(e.pointerId);
  });
  window.addEventListener('blur', function () {
    clearScheduleItemHold();
  });
  calendar.addEventListener('click', function (e) {
    if (isScheduleHoldNavigationSuppressed()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    var day = e.target.closest('.lm-schedule tbody td[data-date]');
    if (!day || !['2-days', 'week'].includes(state.view) || e.target.closest('.lm-schedule-item')) {
      return;
    }
    setSelectedDate(parseDateString(day.dataset.realDate || day.dataset.date));
    state.view = 'day';
    _render();
  });
  calendar.addEventListener('click', function (e) {
    var item = e.target.closest('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event, .calendar-schedule-break, .calendar-schedule-recital');
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
    var event = item.classList.contains('lm-schedule-item') ? getEventByScheduleItem(item) : getEventByGuid(item.id || item.dataset.eventGuid);
    var updatedItem = item.hasAttribute('updated-event') ? item : null;
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
        updatedItem: updatedItem
      });
      return;
    }
    openLessonModal(event, {
      openReschedule: Boolean(updatedItem),
      updatedItem: updatedItem
    });
  });
  var monthDayEventsModal = document.getElementById('month-day-events-modal');
  if (monthDayEventsModal) {
    monthDayEventsModal.addEventListener('click', function (e) {
      var item = e.target.closest('.calendar-month-event, .calendar-schedule-break, .calendar-schedule-recital');
      if (!item || item.classList.contains('calendar-month-event-holiday')) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      var event = getEventByGuid(item.dataset.eventGuid);
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
  _render();
  var stopSchedulePointerClock = function stopSchedulePointerClock() {
    if (state.schedulePointerTimer) {
      window.clearTimeout(state.schedulePointerTimer);
      state.schedulePointerTimer = null;
    }
  };
  var _updateSchedulePointerClock = function updateSchedulePointerClock() {
    stopSchedulePointerClock();
    if (document.hidden) {
      return;
    }
    if (scheduleGridViews.includes(state.view)) {
      patchSchedulePointer(calendar);
    }
    var nextSecondDelay = Math.max(50, 1000 - Date.now() % 1000);
    state.schedulePointerTimer = window.setTimeout(_updateSchedulePointerClock, nextSecondDelay);
  };
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopSchedulePointerClock();
      return;
    }
    _updateSchedulePointerClock();
  });
  _updateSchedulePointerClock();
});
/******/ })()
;