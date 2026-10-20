/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/music/metronome/clock.js"
/*!***********************************************!*\
  !*** ./resources/js/music/metronome/clock.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MetronomeClock: () => (/* binding */ MetronomeClock)
/* harmony export */ });
/* harmony import */ var _gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture */ "./resources/js/music/metronome/gesture.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var MetronomeClock = /*#__PURE__*/function () {
  function MetronomeClock(_ref) {
    var createContext = _ref.createContext,
      onStateChange = _ref.onStateChange,
      onBeat = _ref.onBeat,
      onError = _ref.onError;
    _classCallCheck(this, MetronomeClock);
    this.createContext = createContext;
    this.onStateChange = onStateChange;
    this.onBeat = onBeat;
    this.onError = onError;
    this.tempo = _gesture__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TEMPO;
    this.running = false;
    this.ready = false;
    this.generation = 0;
    this.context = null;
    this.timer = null;
    this.notes = new Set();
    this.beats = [];
    this.beatAnchor = null;
  }
  return _createClass(MetronomeClock, [{
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        var generation, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!this.running) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              generation = ++this.generation;
              this.running = true;
              this.onStateChange(true);
              _context.p = 2;
              if (!this.context || this.context.state === 'closed') {
                this.context = this.createContext();
                this.context.onstatechange = function () {
                  if (_this.ready && _this.context.state !== 'running') _this.stop();
                };
              }
              _context.n = 3;
              return this.context.resume();
            case 3:
              if (!(!this.running || generation !== this.generation)) {
                _context.n = 4;
                break;
              }
              return _context.a(2);
            case 4:
              if (!(this.context.state !== 'running')) {
                _context.n = 5;
                break;
              }
              throw new Error('Audio is unavailable.');
            case 5:
              this.ready = true;
              this.beatAnchor = null;
              this.nextBeatTime = this.context.currentTime + 0.02;
              this.schedule();
              this.timer = setInterval(function () {
                return _this.schedule();
              }, 25);
              _context.n = 8;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              if (!(generation !== this.generation)) {
                _context.n = 7;
                break;
              }
              return _context.a(2);
            case 7:
              this.stop();
              this.onError(_t);
            case 8:
              return _context.a(2);
          }
        }, _callee, this, [[2, 6]]);
      }));
      function start() {
        return _start.apply(this, arguments);
      }
      return start;
    }()
  }, {
    key: "stop",
    value: function stop() {
      this.generation++;
      this.running = false;
      this.ready = false;
      clearInterval(this.timer);
      this.timer = null;
      var _iterator = _createForOfIteratorHelper(this.notes),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var note = _step.value;
          this.cancelNote(note);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      this.beats = [];
      this.beatAnchor = null;
      this.onStateChange(false);
    }
  }, {
    key: "setTempo",
    value: function setTempo(value) {
      var tempo = Math.round((0,_gesture__WEBPACK_IMPORTED_MODULE_0__.clampTempo)(value));
      if (tempo === this.tempo) return;
      var previousTempo = this.tempo;
      this.tempo = tempo;
      if (!this.ready) return;
      var now = this.context.currentTime;
      this.updateBeat(now);
      var _iterator2 = _createForOfIteratorHelper(this.notes),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var note = _step2.value;
          if (note.time > now) this.cancelNote(note);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      this.beats = [];

      // Preserve the progress through this beat when tempo changes mid-swipe.
      if (this.beatAnchor !== null) {
        var progress = Math.min(1, Math.max(0, (now - this.beatAnchor) / (60 / previousTempo)));
        var interval = 60 / tempo;
        this.beatAnchor = now - progress * interval;
        this.nextBeatTime = now + (1 - progress) * interval;
      }
      this.schedule();
    }
  }, {
    key: "updateBeat",
    value: function updateBeat(now) {
      var played = false;
      while (this.beats.length && this.beats[0] <= now) {
        this.beatAnchor = this.beats.shift();
        played = true;
      }
      if (played) this.onBeat();
    }
  }, {
    key: "schedule",
    value: function schedule() {
      if (!this.ready) return;
      var now = this.context.currentTime;
      this.updateBeat(now);

      // Schedule against the audio clock, so rendering cannot move the clicks.
      // If a tab was stalled, resume once instead of replaying missed beats.
      if (this.nextBeatTime < now) this.nextBeatTime = now + 0.01;
      while (this.nextBeatTime < now + 0.1) {
        this.playClick(this.nextBeatTime);
        this.beats.push(this.nextBeatTime);
        this.nextBeatTime += 60 / this.tempo;
      }
    }
  }, {
    key: "playClick",
    value: function playClick(time) {
      var _this2 = this;
      var oscillator = this.context.createOscillator();
      var gain = this.context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(1400, time);
      oscillator.frequency.exponentialRampToValueAtTime(700, time + 0.025);
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.4, time + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03);
      oscillator.connect(gain);
      gain.connect(this.context.destination);
      var note = {
        oscillator: oscillator,
        gain: gain,
        time: time
      };
      this.notes.add(note);
      oscillator.onended = function () {
        oscillator.disconnect();
        gain.disconnect();
        _this2.notes["delete"](note);
      };
      oscillator.start(time);
      oscillator.stop(time + 0.035);
    }
  }, {
    key: "cancelNote",
    value: function cancelNote(note) {
      note.oscillator.stop();
      note.oscillator.disconnect();
      note.gain.disconnect();
      this.notes["delete"](note);
    }
  }]);
}();

/***/ },

/***/ "./resources/js/music/metronome/gesture.js"
/*!*************************************************!*\
  !*** ./resources/js/music/metronome/gesture.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_TEMPO: () => (/* binding */ DEFAULT_TEMPO),
/* harmony export */   MAX_TEMPO: () => (/* binding */ MAX_TEMPO),
/* harmony export */   MIN_TEMPO: () => (/* binding */ MIN_TEMPO),
/* harmony export */   TempoGesture: () => (/* binding */ TempoGesture),
/* harmony export */   clampTempo: () => (/* binding */ clampTempo)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MIN_TEMPO = 20;
var MAX_TEMPO = 300;
var DEFAULT_TEMPO = 120;
function clampTempo(value) {
  return Math.min(MAX_TEMPO, Math.max(MIN_TEMPO, value));
}
var TempoGesture = /*#__PURE__*/function () {
  function TempoGesture(tempo, x, y, time) {
    _classCallCheck(this, TempoGesture);
    this.tempo = tempo;
    this.startX = x;
    this.startY = y;
    this.lastY = y;
    this.lastTime = time;
    this.moved = false;
  }
  return _createClass(TempoGesture, [{
    key: "move",
    value: function move(x, y, time) {
      if (Math.hypot(x - this.startX, y - this.startY) >= 6) this.moved = true;
      if (!this.moved) return Math.round(this.tempo);
      var distance = this.lastY - y;
      var elapsed = Math.max(1, time - this.lastTime);
      // Slow movement gives fine control; a quick swipe covers a wider range.
      var speed = Math.abs(distance) / elapsed;
      var sensitivity = 0.2 + Math.min(speed, 2) * 0.3;
      this.tempo = clampTempo(this.tempo + distance * sensitivity);
      this.lastY = y;
      this.lastTime = time;
      return Math.round(this.tempo);
    }
  }]);
}();

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./resources/js/music/metronome.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _metronome_clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./metronome/clock */ "./resources/js/music/metronome/clock.js");
/* harmony import */ var _metronome_gesture__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metronome/gesture */ "./resources/js/music/metronome/gesture.js");


var surface = document.querySelector('[data-metronome]');
var number = document.querySelector('[data-tempo]');
var message = document.querySelector('[data-metronome-message]');
var edgeButtons = document.querySelectorAll('[data-tempo-step]');
var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
var tempo = _metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPO;
var gesture = null;
var pointerId = null;
var suppressClick = false;
var pulse = null;
var backgroundPulse = null;
var backgroundPulseTempo = _metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPO;
var edgePress = null;
var edgeRepeatTimer = null;
var clock = new _metronome_clock__WEBPACK_IMPORTED_MODULE_0__.MetronomeClock({
  createContext: function createContext() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error('Web Audio is unavailable.');
    return new AudioContext({
      latencyHint: 'interactive'
    });
  },
  onStateChange: function onStateChange(running) {
    surface.setAttribute('aria-pressed', String(running));
    updateLabel();
    if (!running && pulse) pulse.cancel();
    if (!running && backgroundPulse) backgroundPulse.cancel();
  },
  onBeat: function onBeat() {
    if (reducedMotion.matches) return;
    if (backgroundPulse) backgroundPulse.cancel();
    backgroundPulseTempo = tempo;
    backgroundPulse = surface.animate([{
      backgroundColor: '#1048c6'
    }, {
      backgroundColor: '#155eef'
    }], {
      duration: 60000 / tempo,
      easing: 'ease-out'
    });
    if (pulse) pulse.cancel();
    pulse = number.animate([{
      transform: 'scale(1.025)',
      opacity: 1
    }, {
      transform: 'scale(1)',
      opacity: 0.88
    }], {
      duration: 180,
      easing: 'ease-out'
    });
  },
  onError: function onError() {
    message.textContent = 'Sound couldn’t start. Tap to try again.';
    message.hidden = false;
  }
});
function updateLabel() {
  surface.setAttribute('aria-label', "".concat(clock.running ? 'Stop' : 'Start', " metronome. ").concat(tempo, " beats per minute."));
  edgeButtons.forEach(function (button) {
    var action = Number(button.dataset.tempoStep) > 0 ? 'Increase' : 'Decrease';
    button.setAttribute('aria-label', "".concat(action, " tempo by 1. ").concat(tempo, " beats per minute."));
  });
}
function setTempo(value) {
  tempo = Math.round((0,_metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.clampTempo)(value));
  number.textContent = String(tempo);
  if (backgroundPulse && backgroundPulse.playState === 'running') {
    // Keep the current fade in step with tempo changes during a swipe.
    backgroundPulse.updatePlaybackRate(tempo / backgroundPulseTempo);
  }
  clock.setTempo(tempo);
  updateLabel();
}
function toggle() {
  message.hidden = true;
  if (clock.running) clock.stop();else clock.start();
}
surface.addEventListener('pointerdown', function (event) {
  if (!event.isPrimary || event.button !== 0 || pointerId !== null || edgePress) return;
  pointerId = event.pointerId;
  suppressClick = false;
  gesture = new _metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.TempoGesture(tempo, event.clientX, event.clientY, event.timeStamp);
  surface.setPointerCapture(pointerId);
});
function movePointer(event) {
  if (event.pointerId !== pointerId || !gesture) return;
  setTempo(gesture.move(event.clientX, event.clientY, event.timeStamp));
  suppressClick = gesture.moved;
  surface.classList.toggle('is-dragging', gesture.moved);
}
surface.addEventListener('pointermove', movePointer);
surface.addEventListener('pointerup', function (event) {
  if (event.pointerId !== pointerId) return;
  movePointer(event);
  gesture = null;
  pointerId = null;
  surface.classList.remove('is-dragging');
});
function cancelGesture(event) {
  if (event.pointerId !== pointerId) return;
  suppressClick = true;
  gesture = null;
  pointerId = null;
  surface.classList.remove('is-dragging');
}
surface.addEventListener('pointercancel', cancelGesture);
surface.addEventListener('lostpointercapture', cancelGesture);
surface.addEventListener('click', function (event) {
  // Keyboard and assistive-technology clicks have no pointer click count.
  if (event.detail > 0 && suppressClick) {
    event.preventDefault();
    return;
  }
  toggle();
});
function stopEdgeRepeat() {
  clearTimeout(edgeRepeatTimer);
  edgeRepeatTimer = null;
  edgePress = null;
}
function repeatEdgeStep() {
  if (!edgePress) return;
  setTempo(tempo + edgePress.step);
  edgeRepeatTimer = setTimeout(repeatEdgeStep, 75);
}
edgeButtons.forEach(function (button) {
  var step = Number(button.dataset.tempoStep);
  button.addEventListener('pointerdown', function (event) {
    if (!event.isPrimary || event.button !== 0 || pointerId !== null || edgePress) return;
    edgePress = {
      button: button,
      pointerId: event.pointerId,
      step: step
    };
    button.setPointerCapture(event.pointerId);
    setTempo(tempo + step);
    edgeRepeatTimer = setTimeout(repeatEdgeStep, 350);
  });
  var release = function release(event) {
    if (edgePress && edgePress.button === button && edgePress.pointerId === event.pointerId) {
      stopEdgeRepeat();
    }
  };
  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('lostpointercapture', release);
  button.addEventListener('contextmenu', function (event) {
    return event.preventDefault();
  });
  button.addEventListener('click', function (event) {
    // Pointer presses already step immediately; keep native keyboard/AT clicks.
    if (event.detail === 0) setTempo(tempo + step);
  });
});
document.addEventListener('keydown', function (event) {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
    setTempo(tempo + (event.key === 'ArrowUp' ? 1 : -1) * (event.shiftKey ? 10 : 1));
  } else if (event.code === 'Space' || event.key === 'Enter') {
    var _event$target;
    if ((_event$target = event.target) !== null && _event$target !== void 0 && _event$target.closest('[data-tempo-step]')) return;
    event.preventDefault();
    if (!event.repeat) toggle();
  } else if (event.key === 'Escape') {
    stopEdgeRepeat();
    clock.stop();
  }
});
window.addEventListener('blur', stopEdgeRepeat);
document.addEventListener('visibilitychange', function () {
  if (document.hidden) stopEdgeRepeat();
});
window.addEventListener('pagehide', function () {
  stopEdgeRepeat();
  clock.stop();
});
updateLabel();
})();

/******/ })()
;