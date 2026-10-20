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
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ "./resources/js/music/metronome/settings.js");
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
    this.beatsPerBar = 1;
    this.sound = 'click';
    this.nextBeatIndex = 0;
    this.lastBeatIndex = null;
  }
  return _createClass(MetronomeClock, [{
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this = this;
        var _ref2,
          _ref2$leadIn,
          leadIn,
          generation,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$leadIn = _ref2.leadIn, leadIn = _ref2$leadIn === void 0 ? false : _ref2$leadIn;
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
              this.beatAnchor = leadIn ? this.context.currentTime : null;
              this.nextBeatIndex = 0;
              this.lastBeatIndex = null;
              this.nextBeatTime = this.context.currentTime + (leadIn ? 60 / this.tempo : 0.02);
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
      this.lastBeatIndex = null;
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
      if (this.beatAnchor === null && this.beats.length) this.nextBeatTime = this.beats[0].time;
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
      this.nextBeatIndex = this.lastBeatIndex === null ? 0 : (this.lastBeatIndex + 1) % this.beatsPerBar;

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
    key: "setBeats",
    value: function setBeats(value) {
      if (![1, 2, 3, 4].includes(value) || value === this.beatsPerBar) return;
      this.beatsPerBar = value;
      this.reschedulePending(true);
    }
  }, {
    key: "setSound",
    value: function setSound(value) {
      if (!Object.prototype.hasOwnProperty.call(_settings__WEBPACK_IMPORTED_MODULE_1__.SOUND_PROFILES, value) || value === this.sound) return;
      this.sound = value;
      this.reschedulePending();
    }
  }, {
    key: "reschedulePending",
    value: function reschedulePending() {
      var restartBar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.ready) return;
      var now = this.context.currentTime;
      this.updateBeat(now);
      if (this.beats.length) this.nextBeatTime = this.beats[0].time;
      var _iterator3 = _createForOfIteratorHelper(this.notes),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var note = _step3.value;
          if (note.time > now) this.cancelNote(note);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      this.beats = [];
      this.nextBeatIndex = restartBar || this.lastBeatIndex === null ? 0 : (this.lastBeatIndex + 1) % this.beatsPerBar;
      if (restartBar) this.lastBeatIndex = null;
      this.schedule();
    }
  }, {
    key: "getBeatPosition",
    value: function getBeatPosition() {
      var _this$lastBeatIndex;
      return {
        beat: (_this$lastBeatIndex = this.lastBeatIndex) !== null && _this$lastBeatIndex !== void 0 ? _this$lastBeatIndex : this.beatsPerBar - 1,
        preparing: this.lastBeatIndex === null,
        progress: this.ready && this.beatAnchor !== null ? Math.min(1, Math.max(0, (this.context.currentTime - this.beatAnchor) / (60 / this.tempo))) : 0
      };
    }
  }, {
    key: "updateBeat",
    value: function updateBeat(now) {
      var played = false;
      while (this.beats.length && this.beats[0].time <= now) {
        var beat = this.beats.shift();
        this.beatAnchor = beat.time;
        this.lastBeatIndex = beat.index;
        played = true;
      }
      if (played) this.onBeat(this.lastBeatIndex);
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
        this.playClick(this.nextBeatTime, this.nextBeatIndex);
        this.beats.push({
          time: this.nextBeatTime,
          index: this.nextBeatIndex
        });
        this.nextBeatIndex = (this.nextBeatIndex + 1) % this.beatsPerBar;
        this.nextBeatTime += 60 / this.tempo;
      }
    }
  }, {
    key: "playClick",
    value: function playClick(time, beatIndex) {
      var _this2 = this;
      var profile = _settings__WEBPACK_IMPORTED_MODULE_1__.SOUND_PROFILES[this.sound];
      var pitch = beatIndex === 0 ? 1 : 0.82;
      var gain = this.context.createGain();
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(profile.volume / profile.ratios.length, time + 0.001);
      gain.gain.exponentialRampToValueAtTime(0.001, time + profile.duration - 0.005);
      gain.connect(this.context.destination);
      var oscillators = profile.ratios.map(function (ratio) {
        var oscillator = _this2.context.createOscillator();
        oscillator.type = profile.type;
        var frequency = profile.frequency * pitch * ratio;
        oscillator.frequency.setValueAtTime(frequency, time);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * profile.end, time + profile.duration - 0.01);
        oscillator.connect(gain);
        return oscillator;
      });
      var note = {
        oscillators: oscillators,
        gain: gain,
        time: time
      };
      this.notes.add(note);
      var remaining = oscillators.length;
      oscillators.forEach(function (oscillator) {
        oscillator.onended = function () {
          oscillator.disconnect();
          if (--remaining === 0) {
            gain.disconnect();
            _this2.notes["delete"](note);
          }
        };
        oscillator.start(time);
        oscillator.stop(time + profile.duration);
      });
    }
  }, {
    key: "cancelNote",
    value: function cancelNote(note) {
      note.oscillators.forEach(function (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
      });
      note.gain.disconnect();
      this.notes["delete"](note);
    }
  }]);
}();

/***/ },

/***/ "./resources/js/music/metronome/conductor.js"
/*!***************************************************!*\
  !*** ./resources/js/music/metronome/conductor.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONDUCTING_PATTERNS: () => (/* binding */ CONDUCTING_PATTERNS),
/* harmony export */   ConductorView: () => (/* binding */ ConductorView),
/* harmony export */   conductorPoint: () => (/* binding */ conductorPoint),
/* harmony export */   conductorPreparationPoint: () => (/* binding */ conductorPreparationPoint)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Each point is a beat. Curves describe the rebound toward the next beat;
// `at` is the fraction of that beat's duration at the end of each curve.
var CONDUCTING_PATTERNS = {
  1: [{
    point: [200, 540],
    curves: [{
      to: [235, 220],
      controls: [[157, 510], [250, 350]],
      at: 0.28
    }, {
      to: [200, 36],
      controls: [[232, 155], [209, 72]],
      at: 0.5
    }, {
      to: [200, 540],
      controls: [[213, 195], [215, 402]],
      at: 1
    }]
  }],
  2: [{
    point: [200, 540],
    curves: [{
      to: [262, 328],
      controls: [[306, 580], [280, 411]],
      at: 0.35
    }, {
      to: [178, 418],
      controls: [[268, 411], [213, 438]],
      at: 0.55
    }, {
      to: [200, 36],
      controls: [[248, 365], [215, 115]],
      at: 1
    }]
  }, {
    point: [200, 36],
    label: [174, 42],
    curves: [{
      to: [200, 540],
      controls: [[200, 204], [200, 372]],
      at: 1
    }]
  }],
  3: [{
    point: [200, 540],
    curves: [{
      to: [200, 328],
      controls: [[157, 451], [177, 314]],
      at: 0.35
    }, {
      to: [372, 284],
      controls: [[251, 313], [307, 610]],
      at: 1
    }]
  }, {
    point: [372, 284],
    label: [392, 290],
    curves: [{
      to: [200, 36],
      controls: [[304, 534], [217, 446]],
      at: 1
    }]
  }, {
    point: [200, 36],
    label: [174, 42],
    curves: [{
      to: [200, 540],
      controls: [[200, 204], [200, 372]],
      at: 1
    }]
  }],
  4: [{
    point: [200, 540],
    curves: [{
      to: [200, 307],
      controls: [[222, 400], [223, 307]],
      at: 0.45
    }, {
      to: [61, 467],
      controls: [[176, 307], [95, 488]],
      at: 1
    }]
  }, {
    point: [61, 467],
    label: [37, 483],
    curves: [{
      to: [77, 303],
      controls: [[14, 500], [27, 315]],
      at: 0.35
    }, {
      to: [285, 455],
      controls: [[122, 280], [252, 460]],
      at: 0.75
    }, {
      to: [362, 278],
      controls: [[330, 450], [350, 340]],
      at: 1
    }]
  }, {
    point: [362, 278],
    label: [386, 284],
    curves: [{
      to: [200, 36],
      controls: [[315, 446], [224, 446]],
      at: 1
    }]
  }, {
    point: [200, 36],
    label: [174, 42],
    curves: [{
      to: [200, 540],
      controls: [[200, 204], [200, 372]],
      at: 1
    }]
  }]
};
function curvePoint(start, curve, progress) {
  var t = Math.min(1, Math.max(0, progress));
  var u = 1 - t;
  return start.map(function (value, axis) {
    return Math.pow(u, 3) * value + 3 * Math.pow(u, 2) * t * curve.controls[0][axis] + 3 * u * Math.pow(t, 2) * curve.controls[1][axis] + Math.pow(t, 3) * curve.to[axis];
  });
}
function conductorPoint(beats, beat, progress) {
  var pattern = CONDUCTING_PATTERNS[beats] || CONDUCTING_PATTERNS[1];
  var index = (beat % pattern.length + pattern.length) % pattern.length;
  var segment = pattern[index];
  var t = Math.min(1, Math.max(0, progress));
  var start = segment.point;
  var from = 0;
  var _iterator = _createForOfIteratorHelper(segment.curves),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var curve = _step.value;
      if (t <= curve.at) return curvePoint(start, curve, (t - from) / (curve.at - from));
      start = curve.to;
      from = curve.at;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return start;
}
function conductorPreparationPoint(beats, progress) {
  if (beats !== 1) return conductorPoint(beats, beats - 1, progress);
  // A one-beat pattern still prepares at the top of its rebound.
  var curves = CONDUCTING_PATTERNS[1][0].curves;
  return curvePoint(curves[curves.length - 2].to, curves[curves.length - 1], progress);
}
var ConductorView = /*#__PURE__*/function () {
  function ConductorView(svg) {
    _classCallCheck(this, ConductorView);
    this.svg = svg;
    this.path = svg.querySelector('[data-conductor-path]');
    this.dot = svg.querySelector('[data-conductor-dot]');
    this.halo = svg.querySelector('[data-conductor-halo]');
    this.markers = svg.querySelector('[data-conductor-markers]');
    this.beats = 1;
    this.activeBeat = null;
    this.setBeats(1);
  }
  return _createClass(ConductorView, [{
    key: "setBeats",
    value: function setBeats(beats) {
      this.beats = beats;
      var pattern = CONDUCTING_PATTERNS[beats];
      var segments = pattern.flatMap(function (segment) {
        return segment.curves.map(function (curve) {
          return "C ".concat(curve.controls[0].join(' '), " ").concat(curve.controls[1].join(' '), " ").concat(curve.to.join(' '));
        });
      });
      this.path.setAttribute('d', "M ".concat(pattern[0].point.join(' '), " ").concat(segments.join(' ')));
      this.markers.innerHTML = pattern.map(function (_ref, index) {
        var point = _ref.point,
          _ref$label = _ref.label,
          label = _ref$label === void 0 ? [point[0], point[1] + 34] : _ref$label;
        return "<g data-conductor-beat=\"".concat(index, "\"><circle cx=\"").concat(point[0], "\" cy=\"").concat(point[1], "\" r=\"4\"/>") + "<text x=\"".concat(label[0], "\" y=\"").concat(label[1], "\" text-anchor=\"middle\">").concat(index + 1, "</text></g>");
      }).join('');
      this.labels = this.markers.querySelectorAll('[data-conductor-beat]');
      this.activeBeat = null;
      this.prepare(0);
    }
  }, {
    key: "render",
    value: function render(beat, progress) {
      this.position(conductorPoint(this.beats, beat, progress), beat);
    }
  }, {
    key: "prepare",
    value: function prepare(progress) {
      this.position(conductorPreparationPoint(this.beats, progress), this.beats - 1);
    }
  }, {
    key: "position",
    value: function position(_ref2, beat) {
      var _ref3 = _slicedToArray(_ref2, 2),
        x = _ref3[0],
        y = _ref3[1];
      for (var _i = 0, _arr = [this.dot, this.halo]; _i < _arr.length; _i++) {
        var element = _arr[_i];
        element.setAttribute('cx', x);
        element.setAttribute('cy', y);
      }
      if (beat !== this.activeBeat) {
        this.labels.forEach(function (label, index) {
          return label.classList.toggle('is-active', index === beat);
        });
        this.activeBeat = beat;
      }
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

/***/ },

/***/ "./resources/js/music/metronome/settings.js"
/*!**************************************************!*\
  !*** ./resources/js/music/metronome/settings.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_SETTINGS: () => (/* binding */ DEFAULT_SETTINGS),
/* harmony export */   SETTINGS_KEY: () => (/* binding */ SETTINGS_KEY),
/* harmony export */   SOUND_PROFILES: () => (/* binding */ SOUND_PROFILES),
/* harmony export */   colorPalette: () => (/* binding */ colorPalette),
/* harmony export */   loadSettings: () => (/* binding */ loadSettings),
/* harmony export */   normalizeSettings: () => (/* binding */ normalizeSettings)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var SOUND_PROFILES = {
  click: {
    type: 'triangle',
    frequency: 1400,
    end: 0.5,
    duration: 0.035,
    volume: 0.4,
    ratios: [1]
  },
  woodblock: {
    type: 'sine',
    frequency: 800,
    end: 0.92,
    duration: 0.065,
    volume: 0.45,
    ratios: [1, 2.76]
  },
  beep: {
    type: 'sine',
    frequency: 1000,
    end: 1,
    duration: 0.075,
    volume: 0.32,
    ratios: [1]
  },
  cowbell: {
    type: 'square',
    frequency: 540,
    end: 1,
    duration: 0.09,
    volume: 0.14,
    ratios: [1, 1.48]
  }
};
var DEFAULT_SETTINGS = {
  beats: 1,
  color: '#155eef',
  sound: 'click',
  type: 'classic'
};
var SETTINGS_KEY = 'metronome.settings.v1';
function normalizeSettings(value) {
  var input = value && _typeof(value) === 'object' ? value : {};
  return {
    beats: [1, 2, 3, 4].includes(Number(input.beats)) ? Number(input.beats) : DEFAULT_SETTINGS.beats,
    color: typeof input.color === 'string' && /^#[0-9a-f]{6}$/i.test(input.color) ? input.color.toLowerCase() : DEFAULT_SETTINGS.color,
    sound: Object.prototype.hasOwnProperty.call(SOUND_PROFILES, input.sound) ? input.sound : DEFAULT_SETTINGS.sound,
    type: input.type === 'conductor' ? 'conductor' : 'classic'
  };
}
function loadSettings(storage) {
  try {
    return normalizeSettings(JSON.parse(storage.getItem(SETTINGS_KEY)));
  } catch (error) {
    return _objectSpread({}, DEFAULT_SETTINGS);
  }
}
function colorPalette(color) {
  var channels = color.slice(1).match(/../g).map(function (channel) {
    return parseInt(channel, 16);
  });
  var linear = channels.map(function (channel) {
    var value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  var luminance = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  return {
    pulse: "#".concat(channels.map(function (channel) {
      return Math.round(channel * 0.78).toString(16).padStart(2, '0');
    }).join('')),
    ink: luminance > 0.4 ? '#112037' : '#ffffff'
  };
}

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
/* harmony import */ var _metronome_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metronome/settings */ "./resources/js/music/metronome/settings.js");
/* harmony import */ var _metronome_conductor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./metronome/conductor */ "./resources/js/music/metronome/conductor.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var surface = document.querySelector('[data-metronome]');
var number = document.querySelector('[data-tempo]');
var message = document.querySelector('[data-metronome-message]');
var edgeButtons = document.querySelectorAll('[data-tempo-step]');
var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
var settingsButton = document.querySelector('[data-settings-open]');
var settingsDialog = document.querySelector('[data-settings-dialog]');
var beatInputs = document.querySelectorAll('[name="metronome-beats"]');
var typeInputs = document.querySelectorAll('[name="metronome-type"]');
var colorInput = document.querySelector('[data-settings-color]');
var colorValue = document.querySelector('[data-color-value]');
var soundInput = document.querySelector('[data-settings-sound]');
var conductorSvg = document.querySelector('[data-conductor]');
var conductor = new _metronome_conductor__WEBPACK_IMPORTED_MODULE_3__.ConductorView(conductorSvg);
var tempo = _metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPO;
var gesture = null;
var pointerId = null;
var suppressClick = false;
var pulse = null;
var backgroundPulse = null;
var backgroundPulseTempo = _metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPO;
var edgePress = null;
var edgeRepeatTimer = null;
var conductorFrame = null;
var settings = _objectSpread({}, _metronome_settings__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_SETTINGS);
try {
  settings = (0,_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.loadSettings)(window.localStorage);
} catch (error) {
  // Private browsing can make storage unavailable; all controls still work.
}
var palette = (0,_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.colorPalette)(settings.color);
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
    syncConductor();
  },
  onBeat: function onBeat(beat) {
    if (settings.type === 'conductor') {
      conductor.render(beat, 0);
      syncConductor();
    }
    if (reducedMotion.matches) return;
    if (backgroundPulse) backgroundPulse.cancel();
    backgroundPulseTempo = tempo;
    backgroundPulse = surface.animate([{
      backgroundColor: palette.pulse
    }, {
      backgroundColor: settings.color
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
  if (settingsDialog.open) return;
  message.hidden = true;
  if (clock.running) clock.stop();else clock.start({
    leadIn: settings.type === 'conductor'
  });
}
function drawConductor() {
  conductorFrame = null;
  var position = clock.getBeatPosition();
  var progress = reducedMotion.matches ? 0 : position.progress;
  if (position.preparing) conductor.prepare(progress);else conductor.render(position.beat, progress);
  if (clock.running && settings.type === 'conductor' && !settingsDialog.open && !document.hidden && !reducedMotion.matches) {
    conductorFrame = requestAnimationFrame(drawConductor);
  }
}
function syncConductor() {
  if (conductorFrame !== null) cancelAnimationFrame(conductorFrame);
  conductorFrame = null;
  if (settings.type === 'conductor') drawConductor();
}
function applySettings(value) {
  var persist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var previous = settings;
  settings = (0,_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.normalizeSettings)(value);
  palette = (0,_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.colorPalette)(settings.color);
  if (previous.color !== settings.color && backgroundPulse) backgroundPulse.cancel();
  document.documentElement.style.setProperty('--metronome-color', settings.color);
  document.documentElement.style.setProperty('--metronome-ink', palette.ink);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', settings.color);
  surface.dataset.mode = settings.type;
  clock.setBeats(settings.beats);
  clock.setSound(settings.sound);
  if (conductor.beats !== settings.beats) conductor.setBeats(settings.beats);
  beatInputs.forEach(function (input) {
    input.checked = Number(input.value) === settings.beats;
  });
  typeInputs.forEach(function (input) {
    input.checked = input.value === settings.type;
  });
  colorInput.value = settings.color;
  colorValue.textContent = settings.color.toUpperCase();
  soundInput.value = settings.sound;
  syncConductor();
  if (persist) {
    try {
      window.localStorage.setItem(_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      // Settings remain usable for the current visit.
    }
  }
}
settingsButton.addEventListener('click', function () {
  stopEdgeRepeat();
  gesture = null;
  pointerId = null;
  surface.classList.remove('is-dragging');
  settingsDialog.showModal();
  settingsButton.setAttribute('aria-expanded', 'true');
  syncConductor();
});
document.querySelectorAll('[data-settings-close]').forEach(function (button) {
  button.addEventListener('click', function () {
    return settingsDialog.close();
  });
});
settingsDialog.addEventListener('close', function () {
  settingsButton.setAttribute('aria-expanded', 'false');
  syncConductor();
});
beatInputs.forEach(function (input) {
  return input.addEventListener('change', function () {
    if (input.checked) applySettings(_objectSpread(_objectSpread({}, settings), {}, {
      beats: Number(input.value)
    }));
  });
});
typeInputs.forEach(function (input) {
  return input.addEventListener('change', function () {
    if (input.checked) applySettings(_objectSpread(_objectSpread({}, settings), {}, {
      type: input.value
    }));
  });
});
colorInput.addEventListener('input', function () {
  return applySettings(_objectSpread(_objectSpread({}, settings), {}, {
    color: colorInput.value
  }));
});
soundInput.addEventListener('change', function () {
  return applySettings(_objectSpread(_objectSpread({}, settings), {}, {
    sound: soundInput.value
  }));
});
reducedMotion.addEventListener('change', function () {
  if (reducedMotion.matches) {
    if (pulse) pulse.cancel();
    if (backgroundPulse) backgroundPulse.cancel();
  }
  syncConductor();
});
surface.addEventListener('pointerdown', function (event) {
  if (settingsDialog.open || !event.isPrimary || event.button !== 0 || pointerId !== null || edgePress) return;
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
    if (settingsDialog.open || !event.isPrimary || event.button !== 0 || pointerId !== null || edgePress) return;
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
    if (!settingsDialog.open && event.detail === 0) setTempo(tempo + step);
  });
});
document.addEventListener('keydown', function (event) {
  if (settingsDialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
    setTempo(tempo + (event.key === 'ArrowUp' ? 1 : -1) * (event.shiftKey ? 10 : 1));
  } else if (event.code === 'Space' || event.key === 'Enter') {
    var _event$target;
    if ((_event$target = event.target) !== null && _event$target !== void 0 && _event$target.closest('[data-tempo-step], [data-settings-open]')) return;
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
  syncConductor();
});
window.addEventListener('pagehide', function () {
  stopEdgeRepeat();
  clock.stop();
});
applySettings(settings, false);
updateLabel();
})();

/******/ })()
;