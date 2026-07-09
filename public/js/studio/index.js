/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/countup.js/dist/countUp.umd.js"
/*!*****************************************************!*\
  !*** ./node_modules/countup.js/dist/countUp.umd.js ***!
  \*****************************************************/
(__unused_webpack_module, exports) {

!function(t,i){ true?i(exports):0}(this,(function(t){"use strict";var i=function(){return i=Object.assign||function(t){for(var i,n=1,s=arguments.length;n<s;n++)for(var e in i=arguments[n])Object.prototype.hasOwnProperty.call(i,e)&&(t[e]=i[e]);return t},i.apply(this,arguments)},n=function(){function t(t,n,s){var e=this;this.endVal=n,this.options=s,this.version="2.9.0",this.defaults={startVal:0,decimalPlaces:0,duration:2,useEasing:!0,useGrouping:!0,useIndianSeparators:!1,smartEasingThreshold:999,smartEasingAmount:333,separator:",",decimal:".",prefix:"",suffix:"",enableScrollSpy:!1,scrollSpyDelay:200,scrollSpyOnce:!1},this.finalEndVal=null,this.useEasing=!0,this.countDown=!1,this.error="",this.startVal=0,this.paused=!0,this.once=!1,this.count=function(t){e.startTime||(e.startTime=t);var i=t-e.startTime;e.remaining=e.duration-i,e.useEasing?e.countDown?e.frameVal=e.startVal-e.easingFn(i,0,e.startVal-e.endVal,e.duration):e.frameVal=e.easingFn(i,e.startVal,e.endVal-e.startVal,e.duration):e.frameVal=e.startVal+(e.endVal-e.startVal)*(i/e.duration);var n=e.countDown?e.frameVal<e.endVal:e.frameVal>e.endVal;e.frameVal=n?e.endVal:e.frameVal,e.frameVal=Number(e.frameVal.toFixed(e.options.decimalPlaces)),e.printValue(e.frameVal),i<e.duration?e.rAF=requestAnimationFrame(e.count):null!==e.finalEndVal?e.update(e.finalEndVal):e.options.onCompleteCallback&&e.options.onCompleteCallback()},this.formatNumber=function(t){var i,n,s,a,o=t<0?"-":"";i=Math.abs(t).toFixed(e.options.decimalPlaces);var r=(i+="").split(".");if(n=r[0],s=r.length>1?e.options.decimal+r[1]:"",e.options.useGrouping){a="";for(var l=3,u=0,h=0,p=n.length;h<p;++h)e.options.useIndianSeparators&&4===h&&(l=2,u=1),0!==h&&u%l==0&&(a=e.options.separator+a),u++,a=n[p-h-1]+a;n=a}return e.options.numerals&&e.options.numerals.length&&(n=n.replace(/[0-9]/g,(function(t){return e.options.numerals[+t]})),s=s.replace(/[0-9]/g,(function(t){return e.options.numerals[+t]}))),o+e.options.prefix+n+s+e.options.suffix},this.easeOutExpo=function(t,i,n,s){return n*(1-Math.pow(2,-10*t/s))*1024/1023+i},this.options=i(i({},this.defaults),s),this.formattingFn=this.options.formattingFn?this.options.formattingFn:this.formatNumber,this.easingFn=this.options.easingFn?this.options.easingFn:this.easeOutExpo,this.el="string"==typeof t?document.getElementById(t):t,n=null==n?this.parse(this.el.innerHTML):n,this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.endVal=this.validateValue(n),this.options.decimalPlaces=Math.max(this.options.decimalPlaces),this.resetDuration(),this.options.separator=String(this.options.separator),this.useEasing=this.options.useEasing,""===this.options.separator&&(this.options.useGrouping=!1),this.el?this.printValue(this.startVal):this.error="[CountUp] target is null or undefined","undefined"!=typeof window&&this.options.enableScrollSpy&&(this.error?console.error(this.error,t):(window.onScrollFns=window.onScrollFns||[],window.onScrollFns.push((function(){return e.handleScroll(e)})),window.onscroll=function(){window.onScrollFns.forEach((function(t){return t()}))},this.handleScroll(this)))}return t.prototype.handleScroll=function(t){if(t&&window&&!t.once){var i=window.innerHeight+window.scrollY,n=t.el.getBoundingClientRect(),s=n.top+window.pageYOffset,e=n.top+n.height+window.pageYOffset;e<i&&e>window.scrollY&&t.paused?(t.paused=!1,setTimeout((function(){return t.start()}),t.options.scrollSpyDelay),t.options.scrollSpyOnce&&(t.once=!0)):(window.scrollY>e||s>i)&&!t.paused&&t.reset()}},t.prototype.determineDirectionAndSmartEasing=function(){var t=this.finalEndVal?this.finalEndVal:this.endVal;this.countDown=this.startVal>t;var i=t-this.startVal;if(Math.abs(i)>this.options.smartEasingThreshold&&this.options.useEasing){this.finalEndVal=t;var n=this.countDown?1:-1;this.endVal=t+n*this.options.smartEasingAmount,this.duration=this.duration/2}else this.endVal=t,this.finalEndVal=null;null!==this.finalEndVal?this.useEasing=!1:this.useEasing=this.options.useEasing},t.prototype.start=function(t){this.error||(this.options.onStartCallback&&this.options.onStartCallback(),t&&(this.options.onCompleteCallback=t),this.duration>0?(this.determineDirectionAndSmartEasing(),this.paused=!1,this.rAF=requestAnimationFrame(this.count)):this.printValue(this.endVal))},t.prototype.pauseResume=function(){this.paused?(this.startTime=null,this.duration=this.remaining,this.startVal=this.frameVal,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count)):cancelAnimationFrame(this.rAF),this.paused=!this.paused},t.prototype.reset=function(){cancelAnimationFrame(this.rAF),this.paused=!0,this.resetDuration(),this.startVal=this.validateValue(this.options.startVal),this.frameVal=this.startVal,this.printValue(this.startVal)},t.prototype.update=function(t){cancelAnimationFrame(this.rAF),this.startTime=null,this.endVal=this.validateValue(t),this.endVal!==this.frameVal&&(this.startVal=this.frameVal,null==this.finalEndVal&&this.resetDuration(),this.finalEndVal=null,this.determineDirectionAndSmartEasing(),this.rAF=requestAnimationFrame(this.count))},t.prototype.printValue=function(t){var i;if(this.el){var n=this.formattingFn(t);if(null===(i=this.options.plugin)||void 0===i?void 0:i.render)this.options.plugin.render(this.el,n);else if("INPUT"===this.el.tagName)this.el.value=n;else"text"===this.el.tagName||"tspan"===this.el.tagName?this.el.textContent=n:this.el.innerHTML=n}},t.prototype.ensureNumber=function(t){return"number"==typeof t&&!isNaN(t)},t.prototype.validateValue=function(t){var i=Number(t);return this.ensureNumber(i)?i:(this.error="[CountUp] invalid start or end value: ".concat(t),null)},t.prototype.resetDuration=function(){this.startTime=null,this.duration=1e3*Number(this.options.duration),this.remaining=this.duration},t.prototype.parse=function(t){var i=function(t){return t.replace(/([.,'  ])/g,"\\$1")},n=i(this.options.separator),s=i(this.options.decimal),e=t.replace(new RegExp(n,"g"),"").replace(new RegExp(s,"g"),".");return parseFloat(e)},t}();t.CountUp=n}));


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./resources/js/studio/index.js ***!
  \**************************************/
var calendarjs = window.calendarjs;
var CountUp = (__webpack_require__(/*! countup.js */ "./node_modules/countup.js/dist/countUp.umd.js").CountUp);
var state = {
  date: null,
  miniDate: null,
  view: 'week',
  instance: null,
  events: [],
  customEvents: [],
  plannedLessons: [],
  locations: [],
  selectedLocationIds: [],
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
  didAutoNowScroll: false
};
var studioTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
var monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  timeZone: studioTimeZone,
  year: 'numeric'
});
var shortMonthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: studioTimeZone
});
var dayFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  timeZone: studioTimeZone,
  year: 'numeric'
});
var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthWeekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var calendarViews = ['schedule', 'day', '3-days', 'week', 'month'];
var scheduleStart = '08:00';
var scheduleEnd = '22:00';
var sidebarHiddenQuery = '(max-width: 1000px)';
var scheduleGridViews = ['day', '3-days', 'week'];
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
  return window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches ? '3-days' : 'week';
};
var isSidebarHiddenViewport = function isSidebarHiddenViewport() {
  return window.matchMedia && window.matchMedia(sidebarHiddenQuery).matches;
};
var getUrlState = function getUrlState() {
  var params = new URLSearchParams(window.location.search);
  var view = params.get('view');
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
  if (state.view === '3-days') {
    return {
      start: cloneDate(state.date),
      end: addDays(state.date, 2)
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
    state.plannedLessons = Array.isArray(payload.plannedLessons) ? payload.plannedLessons : [];
    state.holidays = Array.isArray(payload.holidays) ? payload.holidays : [];
    state.teachingBreaks = Array.isArray(payload.teachingBreaks) ? payload.teachingBreaks : [];
    state.loadedRange = normalizeRange(payload.calendarRange) || normalizedRange;
  })["catch"](function (error) {
    console.error(error);
    state.loadedRange = normalizedRange;
  })["finally"](function () {
    if (state.pendingRangeKey === rangeKey) {
      state.pendingRangeKey = null;
    }
  });
};
var getVisibleScheduleDates = function getVisibleScheduleDates() {
  if (state.view === 'day') {
    return [cloneDate(state.date)];
  }
  if (state.view === '3-days') {
    return Array.from({
      length: 3
    }, function (_, index) {
      return addDays(state.date, index);
    });
  }
  var start = startOfWeek(state.date);
  return Array.from({
    length: 7
  }, function (_, index) {
    return addDays(start, index);
  });
};
var getScheduleGridDates = function getScheduleGridDates() {
  if (state.view === '3-days' || state.view === 'week') {
    var start = startOfWeek(state.date);
    return Array.from({
      length: 7
    }, function (_, index) {
      return addDays(start, index);
    });
  }
  return getVisibleScheduleDates();
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
  if (scheduleGridViews.includes(state.view)) {
    return toDateString(addDays(state.date, 1));
  }
  return toDateString(state.date);
};
var patchScheduleHeaders = function patchScheduleHeaders(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var headerRow = schedule ? schedule.querySelector('thead tr:not(.studio-schedule-holiday-row)') : null;
  var headers = headerRow ? headerRow.querySelectorAll('td') : [];
  var firstScheduleRow = schedule ? schedule.querySelector('tbody tr') : null;
  var columns = firstScheduleRow ? firstScheduleRow.querySelectorAll('td[data-date]') : [];
  var gridDates = getScheduleGridDates();
  var visibleDateStrings = getVisibleScheduleDates().map(toDateString);
  headers.forEach(function (header) {
    header.removeAttribute('data-selected');
    header.classList.remove('studio-schedule-hidden-column');
  });
  columns.forEach(function (column, index) {
    var date = gridDates[index];
    if (!date) {
      return;
    }
    var dateString = toDateString(date);
    var columnX = column.getAttribute('data-x');
    var header = headers[index + 1];
    var isHidden = !visibleDateStrings.includes(dateString);
    schedule.querySelectorAll("tbody td[data-x=\"".concat(columnX, "\"]")).forEach(function (cell) {
      cell.setAttribute('data-date', dateString);
      cell.classList.toggle('studio-schedule-hidden-column', isHidden);
    });
    if (!header) {
      return;
    }
    header.classList.toggle('studio-schedule-hidden-column', isHidden);
    header.textContent = String(date.getDate()).padStart(2, '0');
    header.setAttribute('data-weekday', weekdays[date.getDay()]);
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
    label.textContent = formatScheduleHour(label.textContent);
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
var getNaturalCountUpOptions = function getNaturalCountUpOptions(options) {
  return Object.assign({
    duration: randomBetween(0.55, 1.05)
  }, options);
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
  var number = Number(value || 0);
  var counter = state.paymentTotalCounters[key];
  var startVal = counter && counter.element === element ? counter.value : Number(element.dataset.countValue || 0);
  var safeStartVal = Number.isFinite(startVal) ? startVal : 0;
  var safeNumber = Number.isFinite(number) ? number : 0;
  var formatter = typeof fallbackFormatter === 'function' ? fallbackFormatter : function (nextValue) {
    return String(nextValue);
  };
  if (!CountUp) {
    element.textContent = formatter(safeNumber);
    element.dataset.countValue = String(safeNumber);
    return;
  }
  var instance = new CountUp(element, safeNumber, getNaturalCountUpOptions(Object.assign({}, options, {
    startVal: safeStartVal
  })));
  if (instance.error) {
    element.textContent = formatter(safeNumber);
  } else {
    instance.start();
  }
  state.paymentTotalCounters[key] = {
    element: element,
    instance: instance,
    value: safeNumber
  };
  element.dataset.countValue = String(safeNumber);
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
  return "".concat(remainingMinutes, "m");
};
var formatQuarterHours = function formatQuarterHours(minutes) {
  var safeMinutes = Number.isFinite(Number(minutes)) ? Number(minutes) : 0;
  var hours = Math.round(safeMinutes / 60 * 4) / 4;
  return "".concat(Number(hours.toFixed(2)), "h");
};
var getVisibleAverageHoursDayCount = function getVisibleAverageHoursDayCount() {
  if (state.view === '3-days') {
    return 3;
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
    return event.lessonPlanId && !event.isHoliday;
  });
};
var renderCalendarPaymentTotals = function renderCalendarPaymentTotals() {
  var expected = document.querySelector('[data-calendar-expected-payment]');
  var confirmed = document.querySelector('[data-calendar-confirmed-payment]');
  var lessonsCount = document.querySelector('[data-calendar-lessons-count]');
  var hoursCount = document.querySelector('[data-calendar-hours-count]');
  var averageHours = document.querySelector('[data-calendar-average-hours]');
  if (!expected && !confirmed && !lessonsCount && !hoursCount && !averageHours) {
    return;
  }
  var totals = getVisiblePaymentEvents().reduce(function (carry, event) {
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
var eventTimeFormatter = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: studioTimeZone
});
var modalDateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  timeZone: studioTimeZone
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
var patchScheduleItems = function patchScheduleItems(calendar) {
  calendar.querySelectorAll('.lm-schedule-item').forEach(function (item) {
    var start = item.getAttribute('data-start');
    var end = item.getAttribute('data-end');
    var duration = getTimeMinutes(end) - getTimeMinutes(start);
    var isShort = duration <= 30;
    var event = getEventByGuid(item.id || item.dataset.eventGuid);
    item.classList.toggle('is-short', isShort);
    item.setAttribute('data-display-time', isShort ? formatEventTime(start) : "".concat(formatEventTime(start), " - ").concat(formatEventTime(end)));
    if (event && event.calendarStatus) {
      item.setAttribute('data-lesson-status', event.calendarStatus);
    }
    applyEventTimeStatusAttributes(item, event);
    applyEventOverlapAttribute(item, event);
  });
};
var patchScheduleHolidays = function patchScheduleHolidays(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var thead = schedule ? schedule.querySelector('thead') : null;
  if (!schedule || !thead || !scheduleGridViews.includes(state.view)) {
    return;
  }
  thead.querySelectorAll('.studio-schedule-holiday-row').forEach(function (row) {
    row.remove();
  });
  var headerRow = thead.querySelector('tr');
  var headerHeight = headerRow ? headerRow.offsetHeight : 0;
  schedule.style.setProperty('--studio-schedule-header-height', "".concat(headerHeight, "px"));
  var visibleDates = getVisibleScheduleDates();
  var visibleDateStrings = visibleDates.map(toDateString);
  var hasBanner = visibleDates.some(function (date) {
    return getHolidaysForDate(date).length > 0 || getBreaksForDate(date).length > 0;
  });
  if (!hasBanner) {
    return;
  }
  var row = document.createElement('tr');
  var label = document.createElement('td');
  row.className = 'studio-schedule-holiday-row';
  label.className = 'studio-schedule-holiday-zone';
  row.appendChild(label);
  getScheduleGridDates().forEach(function (date) {
    var cell = document.createElement('td');
    var dateString = toDateString(date);
    var holidays = visibleDateStrings.includes(dateString) ? getHolidaysForDate(date) : [];
    var teachingBreaks = visibleDateStrings.includes(dateString) ? getBreaksForDate(date) : [];
    cell.className = 'studio-schedule-holiday-cell';
    cell.dataset.date = dateString;
    cell.classList.toggle('studio-schedule-hidden-column', !visibleDateStrings.includes(dateString));
    applyDateStatusAttributes(cell, dateString);
    holidays.forEach(function (holiday) {
      var item = document.createElement('span');
      item.className = 'studio-schedule-holiday';
      item.textContent = holiday.title;
      applyDateStatusAttributes(item, dateString);
      cell.appendChild(item);
    });
    teachingBreaks.forEach(function (teachingBreak) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'studio-schedule-holiday studio-schedule-break';
      item.textContent = teachingBreak.title;
      item.dataset.eventGuid = "teaching-break-".concat(teachingBreak.id, "-").concat(dateString);
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
  }) || getTeachingBreakEventByGuid(guid);
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
var resetLessonModalState = function resetLessonModalState(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-canceling', 'is-rescheduling');
  state.rescheduleAnchor = null;
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
  var meetingUrl = modal.querySelector('#meeting-url');
  var meetingUrlLink = meetingUrl ? meetingUrl.querySelector('a') : null;
  var notesUrl = modal.querySelector('#notes-url');
  var notesUrlLink = notesUrl ? notesUrl.querySelector('a') : null;
  var revert = modal.querySelector('#lesson-revert');
  var taught = modal.querySelector('#lesson-taught');
  var cancelLesson = modal.querySelector('#cancel-lesson-button');
  var confirmPayment = modal.querySelector('#confirm-payment');
  var rescheduleOriginalDate = modal.querySelector('#reschedule-lesson-original-date');
  var rescheduleOriginalStartTime = modal.querySelector('#reschedule-lesson-original-start-time');
  var rescheduleDate = modal.querySelector('#reschedule-lesson-date');
  var rescheduleLessonPlan = modal.querySelector('#reschedule-lesson [name="lesson_plan_id"]');
  var rescheduleStartTime = modal.querySelector('#reschedule-lesson-start-time');
  var rescheduleEndTime = modal.querySelector('#reschedule-lesson-end-time');
  var cancelLessonForm = modal.querySelector('#cancel-lesson form');
  var lessonPlanId = event && event.lessonPlanId ? event.lessonPlanId : '';
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
    var canRevert = !!(event && (event.scheduleOverrideId || event.lessonId));
    revert.style.display = canRevert ? 'inline-flex' : 'none';
    revert.disabled = !canRevert;
  }
  if (taught) {
    preserveButtonLabel(taught);
    taught.disabled = !event || !event.lessonPlanId;
    taught.style.display = canUseActions ? '' : 'none';
    restoreButtonLabel(taught);
  }
  if (cancelLesson) {
    preserveButtonLabel(cancelLesson);
    cancelLesson.disabled = !event || !event.lessonPlanId || event.lessonStatus === 'canceled';
    cancelLesson.style.display = event && event.lessonPlanId ? '' : 'none';
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
    rescheduleOriginalStartTime.value = event && event.originalStartTime ? normalizeTime(event.originalStartTime) : event && event.start ? normalizeTime(event.start) : '08:00';
  }
  if (rescheduleDate) {
    rescheduleDate.value = eventDate;
  }
  if (rescheduleLessonPlan) {
    rescheduleLessonPlan.value = lessonPlanId;
  }
  if (cancelLessonForm) {
    var cancelFormPayload = {
      lesson_plan_id: lessonPlanId,
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
var openLessonModal = function openLessonModal(event) {
  var modal = document.getElementById('lesson-modal');
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
      row.className = 'studio-break-lesson';
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
    event.calendarStatus = payload && payload.schedule_override_deleted ? status : event.calendarStatus === 'rescheduled' ? 'rescheduled' : status;
    event['data-lesson-status'] = event.calendarStatus;
    event.canceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
    event.lessonEditUrl = payload && payload.lesson_deleted ? '' : editUrl || event.lessonEditUrl || '';
    event.paymentUrl = payload && payload.lesson_deleted ? '' : paymentUrl || event.paymentUrl || '';
    event.lessonId = payload && payload.lesson_deleted ? '' : lessonId || event.lessonId || '';
    event.scheduleOverrideId = payload && payload.schedule_override_deleted ? '' : event.scheduleOverrideId;
  }
  if (revert) {
    var canRevert = !!(event && (event.scheduleOverrideId || event.lessonId));
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
  if (!event || !event.lessonPlanId || !lessonId) {
    return;
  }
  var lessonPlan = state.plannedLessons.find(function (plan) {
    return String(plan.id) === String(event.lessonPlanId);
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
var revertLessonAction = function revertLessonAction(button) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  if (!modal || !url || !modal.dataset.lessonId && !modal.dataset.scheduleOverrideId) {
    return;
  }
  button.disabled = true;
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': window.studioCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({
      lesson_id: modal.dataset.lessonId || '',
      schedule_override_id: modal.dataset.scheduleOverrideId || ''
    })
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Unable to revert lesson action.');
    }
    return response.json();
  }).then(function () {
    window.location.reload();
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
  });
};
var storeTaughtLesson = function storeTaughtLesson(button) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  var lessonPlanId = modal ? modal.dataset.lessonPlanId : '';
  if (!modal || !url || !lessonPlanId) {
    return;
  }
  button.disabled = true;
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': window.studioCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(getLessonOccurrencePayload(modal))
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Unable to store lesson.');
    }
    return response.json();
  }).then(function () {
    window.location.reload();
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
  });
};
var confirmLessonPayment = function confirmLessonPayment(button) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
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
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Unable to confirm payment.');
    }
    return response.json();
  }).then(function () {
    window.location.reload();
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
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
  var minutes = now.getHours() * 60 + now.getMinutes();
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
  return String(event.guid || '').indexOf('planned-lesson-') === 0;
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
  var match = String(value || '').trim().match(/^(\d{2}):(\d{2})$/);
  if (!match || Number(match[1]) > 23 || Number(match[2]) > 59 || Number(match[2]) % 15 !== 0) {
    throw new Error('Lesson times must use HH:MM on 15-minute intervals.');
  }
  return "".concat(match[1], ":").concat(match[2]);
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
var getEventDateTime = function getEventDateTime(event, key) {
  if (!event || !event.date || !event[key]) {
    return null;
  }
  var date = parseDateString(String(event.date).substring(0, 10));
  var parts = normalizeTime(event[key]).split(':').map(Number);
  date.setHours(parts[0] || 0, parts[1] || 0, 0, 0);
  return date;
};
var getEventTimeStatus = function getEventTimeStatus(event) {
  if (!event || event.isHoliday || event.isBreak) {
    return '';
  }
  var start = getEventDateTime(event, 'start');
  var end = getEventDateTime(event, 'end');
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
var applyEventTimeStatusAttributes = function applyEventTimeStatusAttributes(element, event) {
  if (!element) {
    return;
  }
  var status = getEventTimeStatus(event);
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
var getOverlappingTimedEventGuids = function getOverlappingTimedEventGuids(events) {
  var timedEvents = events.filter(function (event) {
    return event && event.guid && !event.isHoliday && !event.isBreak && event.start && event.end;
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
var isOverlappingTimedEvent = function isOverlappingTimedEvent(event) {
  if (!event || !event.guid || event.isHoliday || event.isBreak || !event.date) {
    return false;
  }
  var date = parseDateString(String(event.date).substring(0, 10));
  return getOverlappingTimedEventGuids(getEventsForDate(date)).has(event.guid);
};
var applyEventOverlapAttribute = function applyEventOverlapAttribute(element, event) {
  if (!element) {
    return;
  }
  element.toggleAttribute('overlapping-event', isOverlappingTimedEvent(event));
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
  if (!endSelect || state.rescheduleEndOptions.length) {
    return;
  }
  state.rescheduleEndOptions = Array.from(endSelect.options).map(function (option) {
    return {
      value: option.value,
      label: option.textContent
    };
  });
};
var renderRescheduleEndOptions = function renderRescheduleEndOptions(startSelect, endSelect, preferredValue) {
  if (!startSelect || !endSelect) {
    return;
  }
  cacheRescheduleEndOptions(endSelect);
  var startMinutes = getSelectTimeMinutes(startSelect);
  var selectedValue = preferredValue || endSelect.value;
  var options = state.rescheduleEndOptions.filter(function (option) {
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
var normalizeStudentSearch = function normalizeStudentSearch(value) {
  return String(value || '').trim().toLowerCase();
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
  return state.plannedLessons.filter(lessonMatchesStudentSearch).filter(lessonMatchesLocationFilter);
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
          guid: "planned-lesson-".concat(lesson.id, "-").concat(dateString, "-").concat(start),
          lessonPlanId: lesson.id,
          lessonId: occurrence.lesson_id || '',
          scheduleOverrideId: occurrence.schedule_override_id || '',
          recurrence: lesson.recurrence || '',
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
          notesUrl: occurrence.notes_url || lesson.notes_url || ''
        });
      });
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
        lessonEditUrl: getLessonEditUrl(confirmedLesson),
        paymentUrl: getLessonPaymentUrl(confirmedLesson),
        meetingUrl: lesson.meeting_url || '',
        notesUrl: lesson.notes_url || ''
      });
      occurrence = addDays(occurrence, intervalDays);
    }
  });
  return events;
};
var syncCalendarEvents = function syncCalendarEvents() {
  state.events = normalizeScheduleEvents(state.customEvents).concat(getPlannedLessonEvents(getCalendarEventRange()));
};
var createStudioEvent = function createStudioEvent(date) {
  return {
    title: 'No title',
    date: toDateString(date),
    start: '09:00',
    end: '10:00',
    color: '#2fbb7f',
    guid: "studio-".concat(Date.now(), "-").concat(Math.round(Math.random() * 100000))
  };
};
var getEventsForDate = function getEventsForDate(date) {
  var dateString = toDateString(date);
  return getVisibleCalendarEvents().filter(function (event) {
    return event.date && event.date.substring(0, 10) === dateString;
  }).sort(function (a, b) {
    return String(a.start || '').localeCompare(String(b.start || ''));
  });
};
var getCalendarItemsForDate = function getCalendarItemsForDate(date) {
  var holidays = getHolidaysForDate(date).map(function (holiday) {
    return Object.assign({}, holiday, {
      guid: "holiday-".concat(holiday.date, "-").concat(holiday.title),
      isHoliday: true
    });
  });
  return holidays.concat(getBreakEventsForDate(date)).concat(getEventsForDate(date));
};
var hasOverlappingTimedEvents = function hasOverlappingTimedEvents(events) {
  var latestEnd = null;
  return events.filter(function (event) {
    return event && !event.isHoliday && !event.isBreak && event.start && event.end;
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
var renderMonthCalendar = function renderMonthCalendar(calendar) {
  var today = todayString();
  var selected = toDateString(state.date);
  var month = state.date.getMonth();
  var gridStart = startOfMonthGrid(state.date);
  var wrapper = document.createElement('div');
  var weekdaysRow = document.createElement('div');
  var grid = document.createElement('div');
  wrapper.className = 'studio-month-calendar';
  weekdaysRow.className = 'studio-month-weekdays';
  grid.className = 'studio-month-grid';
  monthWeekdays.forEach(function (day) {
    var heading = document.createElement('div');
    heading.textContent = day;
    weekdaysRow.appendChild(heading);
  });
  var _loop = function _loop() {
    var date = addDays(gridStart, i);
    var dateString = toDateString(date);
    var events = getCalendarItemsForDate(date);
    var cell = document.createElement('button');
    var day = document.createElement('span');
    var list = document.createElement('span');
    var hasOverlaps = hasOverlappingTimedEvents(events);
    cell.type = 'button';
    cell.className = 'studio-month-day';
    cell.dataset.date = dateString;
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
    day.textContent = date.getDate() === 1 ? "".concat(shortMonthFormatter.format(date), " ").concat(date.getDate()) : date.getDate();
    list.className = 'studio-month-events';
    if (hasOverlaps) {
      var alert = document.createElement('i');
      alert.className = 'fa-solid fa-circle-exclamation studio-month-overlap-alert';
      alert.setAttribute('aria-hidden', 'true');
      cell.appendChild(alert);
    }
    events.slice(0, 4).forEach(function (event) {
      var item = document.createElement('span');
      var dot = document.createElement('span');
      var time = document.createElement('span');
      var title = document.createElement('span');
      item.className = event.isHoliday ? 'studio-month-event studio-month-event-holiday' : event.isBreak ? 'studio-month-event studio-month-event-break' : 'studio-month-event';
      dot.className = 'studio-month-event-dot';
      time.className = 'studio-month-event-time';
      title.className = 'studio-month-event-title';
      item.dataset.eventGuid = event.guid || '';
      item.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.calendarStatus || event.lessonStatus || 'unconfirmed';
      dot.dataset.eventGuid = event.guid || '';
      dot.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.calendarStatus || event.lessonStatus || 'unconfirmed';
      applyCalendarItemStatusAttributes(item, event, dateString);
      applyCalendarItemStatusAttributes(dot, event, dateString);
      time.textContent = event.isHoliday || event.isBreak ? '' : formatEventTime(event.start);
      title.textContent = event.title || 'No title';
      if (!event.isHoliday && !event.isBreak) {
        item.appendChild(dot);
        item.appendChild(time);
      }
      item.appendChild(title);
      list.appendChild(item);
    });
    if (events.length > 4) {
      var more = document.createElement('span');
      more.className = 'studio-month-more';
      more.textContent = "".concat(events.length - 4, " more");
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
  wrapper.className = 'studio-schedule-agenda';
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
      var empty = document.createElement('div');
      empty.className = 'studio-schedule-empty';
      empty.textContent = 'Nothing planned.';
      list.appendChild(empty);
    }
    items.forEach(function (event) {
      var item = document.createElement(event.isHoliday ? 'div' : 'button');
      var title = document.createElement('span');
      item.className = event.isHoliday ? 'studio-schedule-event studio-schedule-event-holiday' : event.isBreak ? 'studio-schedule-event studio-schedule-event-break' : 'studio-schedule-event';
      title.className = 'studio-schedule-event-title';
      title.textContent = event.title || 'No title';
      item.dataset.eventGuid = event.guid || '';
      item.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.calendarStatus || event.lessonStatus || 'unconfirmed';
      applyCalendarItemStatusAttributes(item, event, dateString);
      applyEventOverlapAttribute(item, event);
      if (!event.isHoliday && !event.isBreak) {
        var time = document.createElement('span');
        var duration = getEventDurationMinutes(event);
        item.type = 'button';
        item.dataset.durationMinutes = duration;
        item.style.setProperty('--studio-schedule-event-height', getAgendaEventHeight(event));
        time.className = 'studio-schedule-event-time';
        time.textContent = event.start && event.end ? "".concat(formatAgendaEventTime(event.start), "-").concat(formatAgendaEventTime(event.end)) : formatAgendaEventTime(event.start);
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
  if (state.view === '3-days') {
    return getRangeLabel(state.date, addDays(state.date, 2));
  }
  if (state.view === 'week') {
    return getWeekLabel(state.date);
  }
  return monthFormatter.format(state.date);
};
var move = function move(direction) {
  if (state.view === 'day') {
    setSelectedDate(addDays(state.date, direction));
  } else if (state.view === '3-days') {
    setSelectedDate(addDays(state.date, direction * 3));
  } else if (state.view === 'week') {
    setSelectedDate(addDays(state.date, direction * 7));
  } else if (state.view === 'month' || state.view === 'schedule') {
    setSelectedDate(addMonths(state.date, direction));
  }
};
document.addEventListener('DOMContentLoaded', function () {
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
  var calendarSearch = document.querySelector('.studio-calendar-search');
  var calendarToolbar = calendarSearch ? calendarSearch.closest('.studio-calendar-toolbar') : null;
  var calendarSearchToggle = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-toggle]') : null;
  var calendarSearchClear = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-clear]') : null;
  var studentSearch = calendarSearch ? calendarSearch.querySelector('input[name="search"]') : null;
  var offcanvasViews = document.getElementById('calendar-offcanvas-views');
  var offcanvasViewItems = Array.from(document.querySelectorAll('[data-calendar-offcanvas-view]'));
  var calendarInsights = document.getElementById('studio-calendar-insights');
  var calendarInsightsSidebarTarget = document.querySelector('[data-calendar-insights-sidebar-target]');
  var calendarInsightsOffcanvasTarget = document.querySelector('[data-calendar-insights-offcanvas-target]');
  var locationFilters = document.querySelector('[data-calendar-location-filters]');
  var calendarFilter = document.querySelector('.studio-calendar-filter');
  if (!calendar) {
    return;
  }
  state.plannedLessons = Array.isArray(window.studioPlannedLessons) ? window.studioPlannedLessons : Array.isArray(window.studioLessonPlans) ? window.studioLessonPlans : [];
  state.holidays = Array.isArray(window.studioHolidays) ? window.studioHolidays : [];
  state.teachingBreaks = Array.isArray(window.studioTeachingBreaks) ? window.studioTeachingBreaks : [];
  state.locations = Array.isArray(window.studioLocations) ? window.studioLocations : [];
  state.loadedRange = normalizeRange(window.studioCalendarRange);
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
  var syncCalendarInsightsPlacement = function syncCalendarInsightsPlacement() {
    if (!calendarInsights || !calendarInsightsSidebarTarget || !calendarInsightsOffcanvasTarget) {
      return;
    }
    var target = isSidebarHiddenViewport() ? calendarInsightsOffcanvasTarget : calendarInsightsSidebarTarget;
    if (calendarInsights.parentElement !== target) {
      target.appendChild(calendarInsights);
    }
  };
  var syncLocationFilterState = function syncLocationFilterState() {
    if (!locationFilters) {
      return;
    }
    var checkedIds = Array.from(locationFilters.querySelectorAll('input[data-calendar-location-filter]:checked')).map(function (input) {
      return normalizeLocationId(input.value);
    }).filter(Boolean);
    var allIds = getAllLocationIds();
    state.selectedLocationIds = checkedIds;
    if (calendarFilter) {
      calendarFilter.toggleAttribute('selected', isLocationFilterActive());
    }
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
      var label = document.createElement('label');
      var input = document.createElement('input');
      var text = document.createElement('span');
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
  var getVisibleScheduleDay = function getVisibleScheduleDay(agenda) {
    var days = Array.from(agenda.querySelectorAll('.studio-schedule-day'));
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
    var target = agenda.querySelector(".studio-schedule-day[data-date=\"".concat(selected, "\"]")) || agenda.querySelector(".studio-schedule-day[data-date=\"".concat(todayString(), "\"]")) || agenda.querySelector('.studio-schedule-day');
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
    calendar.classList.toggle('studio-calendar-day-view', state.view === 'day');
    calendar.classList.toggle('studio-calendar-three-days-view', state.view === '3-days');
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
        type: state.view === '3-days' ? 'week' : state.view,
        value: getScheduleValue(),
        data: normalizeScheduleEvents(getVisibleCalendarEvents()),
        validRange: [scheduleStart, scheduleEnd],
        onbeforeinsert: function onbeforeinsert() {
          return false;
        },
        onbeforechangeevent: function onbeforechangeevent(instance, detail) {
          if (detail && detail.action) {
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
  if (today) {
    today.addEventListener('click', function () {
      setSelectedDate(getTodayDate());
      _render();
    });
  }
  if (previous) {
    previous.addEventListener('click', function () {
      move(-1);
      _render();
    });
  }
  if (next) {
    next.addEventListener('click', function () {
      move(1);
      _render();
    });
  }
  if (view) {
    view.addEventListener('change', function () {
      setCalendarView(this.value);
    });
  }
  offcanvasViewItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
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
      state.miniDate = addMonths(state.miniDate, -1);
      renderMiniCalendar();
    });
  }
  if (miniNext) {
    miniNext.addEventListener('click', function () {
      state.miniDate = addMonths(state.miniDate, 1);
      renderMiniCalendar();
    });
  }
  if (miniGrid) {
    miniGrid.addEventListener('click', function (e) {
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
      storeTaughtLesson(lessonTaught);
    });
  }
  var confirmPayment = document.getElementById('confirm-payment');
  if (confirmPayment) {
    confirmPayment.addEventListener('click', function (e) {
      e.preventDefault();
      confirmLessonPayment(confirmPayment);
    });
  }
  var lessonRevert = document.getElementById('lesson-revert');
  if (lessonRevert) {
    lessonRevert.addEventListener('click', function (e) {
      e.preventDefault();
      revertLessonAction(lessonRevert);
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
    lessonModal.addEventListener('hidden.bs.modal', function () {
      resetLessonModalState(lessonModal);
    });
    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
      window.jQuery(lessonModal).on('hidden.bs.modal', function () {
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
  calendar.addEventListener('click', function (e) {
    var day = e.target.closest('.studio-month-day');
    if (!day || state.view !== 'month') {
      return;
    }
    if (!e.target.closest('.studio-month-event')) {
      setSelectedDate(parseDateString(day.dataset.date));
      state.view = 'week';
      _render();
    }
  });
  calendar.addEventListener('mousedown', function (e) {
    if (!e.target.closest('.lm-schedule-item')) {
      return;
    }
    e.stopPropagation();
  }, true);
  calendar.addEventListener('click', function (e) {
    var day = e.target.closest('.lm-schedule tbody td[data-date]');
    if (!day || !['3-days', 'week'].includes(state.view) || e.target.closest('.lm-schedule-item')) {
      return;
    }
    setSelectedDate(parseDateString(day.dataset.date));
    state.view = 'day';
    _render();
  });
  calendar.addEventListener('click', function (e) {
    var item = e.target.closest('.lm-schedule-item, .studio-month-event, .studio-schedule-event, .studio-schedule-break');
    if (!item || item.classList.contains('studio-month-event-holiday') || item.classList.contains('studio-schedule-event-holiday')) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    var event = getEventByGuid(item.id || item.dataset.eventGuid);
    if (event && event.isBreak) {
      openTeachingBreakModal(event);
      return;
    }
    openLessonModal(event);
  });
  renderLocationFilters();
  _render();
});
})();

/******/ })()
;