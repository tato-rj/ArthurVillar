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
      onError = _ref.onError,
      _ref$onReady = _ref.onReady,
      onReady = _ref$onReady === void 0 ? function () {} : _ref$onReady;
    _classCallCheck(this, MetronomeClock);
    this.createContext = createContext;
    this.onStateChange = onStateChange;
    this.onBeat = onBeat;
    this.onError = onError;
    this.onReady = onReady;
    this.tempo = _gesture__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TEMPO;
    this.running = false;
    this.ready = false;
    this.generation = 0;
    this.context = null;
    this.timer = null;
    this.notes = new Set();
    this.beats = [];
    this.beatAnchor = null;
    this.beatSpan = 1;
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
          _ref2$leadInBeats,
          leadInBeats,
          generation,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$leadInBeats = _ref2.leadInBeats, leadInBeats = _ref2$leadInBeats === void 0 ? 0 : _ref2$leadInBeats;
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
              this.beatSpan = leadInBeats || 1;
              this.beatAnchor = leadInBeats ? this.context.currentTime : null;
              this.nextBeatIndex = 0;
              this.lastBeatIndex = null;
              this.nextBeatTime = this.context.currentTime + (leadInBeats ? leadInBeats * 60 / this.tempo : 0.02);
              this.schedule();
              this.timer = setInterval(function () {
                return _this.schedule();
              }, 25);
              this.onReady();
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
        var progress = Math.min(1, Math.max(0, (now - this.beatAnchor) / (this.beatSpan * 60 / previousTempo)));
        var interval = this.beatSpan * 60 / tempo;
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
      var now = this.ready ? this.context.currentTime : 0;
      var beat = this.lastBeatIndex;
      var anchor = this.beatAnchor;
      var span = this.beatSpan;
      // A click can occur between scheduler ticks. Render from its actual audio
      // time immediately instead of holding the dot at the end of the stroke.
      var _iterator4 = _createForOfIteratorHelper(this.beats),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var queued = _step4.value;
          if (queued.time > now) break;
          beat = queued.index;
          anchor = queued.time;
          span = 1;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return {
        beat: beat !== null && beat !== void 0 ? beat : this.beatsPerBar - 1,
        preparing: beat === null,
        progress: this.ready && anchor !== null ? Math.min(1, Math.max(0, (now - anchor) / (span * 60 / this.tempo))) : 0
      };
    }
  }, {
    key: "updateBeat",
    value: function updateBeat(now) {
      var played = false;
      while (this.beats.length && this.beats[0].time <= now) {
        var beat = this.beats.shift();
        this.beatAnchor = beat.time;
        this.beatSpan = 1;
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
/* harmony export */   conductorPreparationBeats: () => (/* binding */ conductorPreparationBeats),
/* harmony export */   conductorPreparationPoint: () => (/* binding */ conductorPreparationPoint)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Traced from the four supplied conducting-pattern screenshots.
// Motion follows the reference video's flowing half-beat gestures: ease through
// turns, carry momentum between them, and soften the top/bottom reversals.
// The four-beat side loops mirror each other around the center downstroke.
var CONDUCTING_PATTERNS = {
  1: [{
    point: [200, 540],
    curves: [{
      to: [208.85, 384.54],
      controls: [[173.1, 508.74], [200.34, 423.2]]
    }, {
      to: [235.85, 210.89],
      controls: [[221.33, 327.78], [235.85, 270.11]]
    }, {
      to: [200.83, 36],
      controls: [[235.85, 153.6], [211.94, 91.77]]
    }, {
      to: [200, 540],
      controls: [[215, 204.22], [213.91, 372.13]]
    }]
  }],
  2: [{
    point: [200, 540],
    curves: [
    // Match the three-beat turn's rounded, horizontal crest.
    {
      to: [247, 343],
      controls: [[312.81, 572.13], [301, 343]]
    }, {
      to: [178.55, 416.85],
      controls: [[212.81, 343], [239.55, 434.83]]
    }, {
      to: [218.96, 256.19],
      controls: [[216.22, 388.02], [218.96, 301.19]]
    }, {
      to: [200, 36],
      controls: [[218.96, 183.16], [211.01, 108.19]]
    }]
  }, {
    point: [200, 36],
    curves: [{
      to: [200, 540],
      controls: [[200, 204], [200, 372]]
    }]
  }],
  3: [{
    point: [200, 540],
    curves: [{
      to: [203.83, 326.33],
      controls: [[175.99, 514.59], [162.56, 326.33]]
    }, {
      to: [304.96, 450.7],
      controls: [[226.88, 326.33], [261.71, 450.7]]
    },
    // A shared horizontal tangent rounds the right-hand reversal.
    {
      to: [354, 299],
      controls: [[349.3, 450.7], [402, 299]]
    }]
  }, {
    point: [354, 299],
    curves: [{
      to: [306.18, 406.25],
      controls: [[313.64, 299], [337.04, 406.25]]
    }, {
      to: [200, 36],
      controls: [[215.55, 406.25], [197.12, 94.21]]
    }]
  }, {
    point: [200, 36],
    curves: [{
      to: [200, 540],
      controls: [[200, 204], [200, 372]]
    }]
  }],
  4: [{
    point: [200, 540],
    curves: [{
      to: [208.28, 402.99],
      controls: [[200, 481.8], [202.76, 453.12]]
    }, {
      to: [200.57, 305.53],
      controls: [[209.56, 391.32], [223.13, 305.53]]
    }, {
      to: [63.15, 464.16],
      controls: [[171.7, 305.53], [96.35, 464.16]]
    }]
  }, {
    point: [63.15, 464.16],
    curves: [{
      to: [79.46, 303.09],
      controls: [[17.47, 464.16], [32.63, 303.09]]
    }, {
      to: [336.85, 464.16],
      controls: [[129.84, 303.09], [303.65, 464.16]]
    }]
  }, {
    point: [336.85, 464.16],
    curves: [{
      to: [320.54, 303.09],
      controls: [[382.53, 464.16], [367.37, 303.09]]
    }, {
      to: [235, 384],
      controls: [[270.16, 303.09], [255, 384]]
    }, {
      to: [200, 36],
      controls: [[210, 384], [204.69, 88.9]]
    }]
  }, {
    point: [200, 36],
    curves: [{
      to: [200, 540],
      controls: [[200, 204], [200, 372]]
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
var ARC_SAMPLES = 1024;
function measureStroke(segment) {
  var samples = [{
    point: segment.point,
    distance: 0
  }];
  var curveEnds = [];
  var start = segment.point;
  var previous = start;
  var length = 0;
  var _iterator = _createForOfIteratorHelper(segment.curves),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var curve = _step.value;
      // Cache a dense arc-length map once, rather than timing individual
      // Bézier parameters: equal parameter steps do not cover equal distances.
      for (var step = 1; step <= ARC_SAMPLES; step++) {
        var point = curvePoint(start, curve, step / ARC_SAMPLES);
        length += Math.hypot(point[0] - previous[0], point[1] - previous[1]);
        samples.push({
          point: point,
          distance: length,
          start: start,
          curve: curve,
          parameter: step / ARC_SAMPLES
        });
        previous = point;
      }
      curveEnds.push(length);
      start = curve.to;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    samples: samples,
    curveEnds: curveEnds,
    length: length
  };
}

// Each pair marks the curve ending a half-beat gesture and its through-speed.
// Construction joins along a stroke do not get their own timing or easing.
// Zero is reserved for sharp reversals; rounded turns keep moving.
var FLOW_GESTURES = {
  1: [[2, 0], [3, 0]],
  2: [[0, 0.5], [1, 0], [3, 0], [4, 0]],
  3: [[0, 0.5], [1, 0.65], [2, 0.5], [3, 0.65], [4, 0], [5, 0]],
  4: [[1, 0.5], [2, 0.65], [3, 0.65], [4, 0.65], [5, 0.5], [6, 0.65], [7, 0], [8, 0]]
};
var conductingMotion = Object.fromEntries(Object.entries(CONDUCTING_PATTERNS).map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    beats = _ref2[0],
    pattern = _ref2[1];
  var motion = measureStroke({
    point: pattern[0].point,
    curves: pattern.flatMap(function (segment) {
      return segment.curves;
    })
  });
  var timing = [{
    time: 0,
    distance: 0,
    speed: 0
  }].concat(_toConsumableArray(FLOW_GESTURES[beats].map(function (_ref3, index) {
    var _ref4 = _slicedToArray(_ref3, 2),
      curve = _ref4[0],
      speed = _ref4[1];
    return {
      time: (index + 1) / 2,
      distance: motion.curveEnds[curve],
      speed: speed
    };
  })));
  timing.forEach(function (knot, index) {
    if (!knot.speed) return;
    var before = timing[index - 1];
    var after = timing[index + 1];
    var incoming = (knot.distance - before.distance) / (knot.time - before.time);
    var outgoing = (after.distance - knot.distance) / (after.time - knot.time);
    // A limited harmonic-mean tangent keeps distance monotonic and
    // shares exactly the same velocity on both sides of each turn.
    knot.speed *= 2 * incoming * outgoing / (incoming + outgoing);
  });
  return [beats, _objectSpread(_objectSpread({
    beats: Number(beats)
  }, motion), {}, {
    timing: timing
  })];
}));
function distanceAtTime(motion, time) {
  if (time <= 0) return 0;
  if (time >= motion.beats) return motion.length;
  var index = Math.min(Math.floor(time * 2), motion.timing.length - 2);
  var start = motion.timing[index];
  var end = motion.timing[index + 1];
  var duration = end.time - start.time;
  var t = (time - start.time) / duration;
  // Cubic Hermite interpolation eases distance, not the Bézier parameter.
  // Unlike separate ease-in/out animations, rounded joins never stop or
  // restart; both adjacent gestures use the same tangent speed.
  return (2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1) * start.distance + (Math.pow(t, 3) - 2 * Math.pow(t, 2) + t) * duration * start.speed + (-2 * Math.pow(t, 3) + 3 * Math.pow(t, 2)) * end.distance + (Math.pow(t, 3) - Math.pow(t, 2)) * duration * end.speed;
}
function pointAtDistance(_ref5, distance) {
  var samples = _ref5.samples,
    length = _ref5.length;
  if (distance <= 0 || length === 0) return samples[0].point;
  if (distance >= length) return samples[samples.length - 1].point;
  var low = 1;
  var high = samples.length - 1;
  while (low < high) {
    var middle = Math.floor((low + high) / 2);
    if (samples[middle].distance < distance) low = middle + 1;else high = middle;
  }
  var before = samples[low - 1];
  var after = samples[low];
  if (distance === after.distance) return after.point;
  var fraction = (distance - before.distance) / (after.distance - before.distance);
  // Use the length map to recover a parameter, then evaluate the actual
  // curve. Interpolating the sample positions instead creates tiny straight
  // chords and a small direction change at every sample boundary.
  return curvePoint(after.start, after.curve, after.parameter - (1 - fraction) / ARC_SAMPLES);
}
function conductorPoint(beats, beat, progress) {
  var motion = conductingMotion[beats] || conductingMotion[1];
  var index = (beat % motion.beats + motion.beats) % motion.beats;
  var t = Math.min(1, Math.max(0, progress));
  var distance = distanceAtTime(motion, index + t);
  return pointAtDistance(motion, distance);
}
function conductorPreparationPoint(beats, progress) {
  var motion = conductingMotion[beats] || conductingMotion[1];
  var t = Math.min(1, Math.max(0, progress));
  return pointAtDistance(motion, distanceAtTime(motion, motion.beats - 0.5 + t * 0.5));
}
function conductorPreparationBeats() {
  // The reference uses half a beat for the top-to-bottom gesture. Starting
  // playback uses that same gesture, reaching the bottom on the first click.
  return 0.5;
}
function ballTransform(_ref6) {
  var _ref7 = _slicedToArray(_ref6, 2),
    x = _ref7[0],
    y = _ref7[1];
  // The HTML ball is 44 viewBox units wide (11% of the 400-unit stage).
  // Percentage transforms keep it aligned with the SVG at any screen size,
  // without measuring layout when the viewport or device orientation changes.
  return "translate3d(".concat((x / 44 - 0.5) * 100, "%, ").concat((y / 44 - 0.5) * 100, "%, 0)");
}
var motionKeyframes = new Map();
function conductorKeyframes(beats) {
  if (!motionKeyframes.has(beats)) {
    var motion = conductingMotion[beats];
    // Bake the flow into one continuous compositor animation. Sampling
    // in time retains the shared turn velocities without per-beat seeks.
    var steps = 2048;
    motionKeyframes.set(beats, Array.from({
      length: steps + 1
    }, function (_, step) {
      return {
        transform: ballTransform(pointAtDistance(motion, distanceAtTime(motion, step / steps * motion.beats))),
        offset: step / steps
      };
    }));
  }
  return motionKeyframes.get(beats);
}
var ConductorView = /*#__PURE__*/function () {
  function ConductorView(stage) {
    _classCallCheck(this, ConductorView);
    this.path = stage.querySelector('[data-conductor-path]');
    this.ball = stage.querySelector('[data-conductor-ball]');
    this.animation = null;
    this.duration = null;
    this.beats = 1;
    this.setBeats(1);
  }
  return _createClass(ConductorView, [{
    key: "setBeats",
    value: function setBeats(beats) {
      this.stop();
      this.beats = beats;
      var pattern = CONDUCTING_PATTERNS[beats];
      var segments = pattern.flatMap(function (segment) {
        return segment.curves.map(function (curve) {
          return "C ".concat(curve.controls[0].join(' '), " ").concat(curve.controls[1].join(' '), " ").concat(curve.to.join(' '));
        });
      });
      this.path.setAttribute('d', "M ".concat(pattern[0].point.join(' '), " ").concat(segments.join(' ')));
      this.prepare(0);
    }
  }, {
    key: "render",
    value: function render(beat, progress) {
      this.position(conductorPoint(this.beats, beat, progress));
    }
  }, {
    key: "prepare",
    value: function prepare(progress) {
      this.position(conductorPreparationPoint(this.beats, progress));
    }
  }, {
    key: "position",
    value: function position(_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
        x = _ref9[0],
        y = _ref9[1];
      this.ball.style.transform = ballTransform([x, y]);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.animation) this.animation.cancel();
      this.animation = null;
      this.duration = null;
    }
  }, {
    key: "sync",
    value: function sync(position, tempo, animate) {
      var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      if (!animate) {
        this.stop();
        if (position.preparing) this.prepare(position.progress);else this.render(position.beat, position.progress);
        return;
      }
      var duration = this.beats * 60000 / tempo;
      var phase = position.preparing ? 1 - conductorPreparationBeats(this.beats) / this.beats * (1 - position.progress) : (position.beat + position.progress) / this.beats;
      var elapsed = phase % 1 * duration;
      var retime = force || this.duration !== duration;
      if (!this.animation) {
        // One browser-managed transform animation continues through beats
        // and bars, independently of JavaScript's 25ms audio scheduler.
        this.animation = this.ball.animate(conductorKeyframes(this.beats), {
          duration: duration,
          iterations: Infinity,
          easing: 'linear'
        });
      } else if (this.duration !== duration) {
        this.animation.effect.updateTiming({
          duration: duration
        });
      }
      this.duration = duration;
      var current = (this.animation.currentTime || 0) % duration;
      var difference = Math.abs(current - elapsed);
      var drift = Math.min(difference, duration - difference);
      // Ignore normal audio-block/frame rounding. Seeking on every click
      // would put the scheduler's jitter back into the otherwise smooth motion.
      // A real stall or a tempo edit still re-aligns with the audio clock.
      if (retime || drift > 80) this.animation.currentTime = elapsed;
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
/* harmony export */   TEMPO_KEY: () => (/* binding */ TEMPO_KEY),
/* harmony export */   colorPalette: () => (/* binding */ colorPalette),
/* harmony export */   loadSettings: () => (/* binding */ loadSettings),
/* harmony export */   loadTempo: () => (/* binding */ loadTempo),
/* harmony export */   normalizeSettings: () => (/* binding */ normalizeSettings)
/* harmony export */ });
/* harmony import */ var _gesture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gesture */ "./resources/js/music/metronome/gesture.js");
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
var TEMPO_KEY = 'metronome.tempo.v1';
function loadTempo(storage) {
  try {
    var value = JSON.parse(storage.getItem(TEMPO_KEY));
    return Number.isInteger(value) && value >= _gesture__WEBPACK_IMPORTED_MODULE_0__.MIN_TEMPO && value <= _gesture__WEBPACK_IMPORTED_MODULE_0__.MAX_TEMPO ? value : _gesture__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TEMPO;
  } catch (error) {
    return _gesture__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_TEMPO;
  }
}
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
function luminance(channels) {
  var linear = channels.map(function (channel) {
    var value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function hexColor(channels) {
  return "#".concat(channels.map(function (channel) {
    return channel.toString(16).padStart(2, '0');
  }).join(''));
}
function mixColor(from, to, amount) {
  return from.map(function (channel, index) {
    return Math.round(channel + (to[index] - channel) * amount);
  });
}
function colorPalette(color) {
  var channels = color.slice(1).match(/../g).map(function (channel) {
    return parseInt(channel, 16);
  });
  return {
    pulse: hexColor(mixColor(channels, [0, 0, 0], 0.42)),
    ink: luminance(channels) > 0.4 ? '#112037' : '#ffffff'
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
var pulseLayer = document.querySelector('[data-metronome-pulse]');
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
var colorReset = document.querySelector('[data-settings-color-reset]');
var soundInput = document.querySelector('[data-settings-sound]');
var conductor = new _metronome_conductor__WEBPACK_IMPORTED_MODULE_3__.ConductorView(document.querySelector('[data-conductor]'));
var tempo = _metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPO;
var tempoSaveTimer = null;
var gesture = null;
var pointerId = null;
var suppressClick = false;
var pulse = null;
var backgroundPulse = null;
var backgroundPulseTempo = _metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPO;
var edgePress = null;
var edgeRepeatTimer = null;
var settingsAnimation = null;
var settingsClosing = false;
var settings = _objectSpread({}, _metronome_settings__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_SETTINGS);
try {
  settings = (0,_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.loadSettings)(window.localStorage);
  tempo = (0,_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.loadTempo)(window.localStorage);
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
    if (settings.type === 'conductor') syncConductor();
    if (reducedMotion.matches) return;
    if (beat === 0) {
      if (backgroundPulse) backgroundPulse.cancel();
      backgroundPulseTempo = tempo;
      backgroundPulse = pulseLayer.animate([{
        opacity: 1
      }, {
        opacity: 0
      }], {
        duration: 60000 / tempo,
        easing: 'ease-out'
      });
    }
    if (pulse) pulse.cancel();
    pulse = number.animate([{
      transform: 'scale(1.1)',
      opacity: 1
    }, {
      transform: 'scale(1)',
      opacity: 0.88
    }], {
      duration: 180,
      easing: 'ease-out'
    });
  },
  onReady: function onReady() {
    return syncConductor(true);
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
  var previousTempo = tempo;
  tempo = Math.round((0,_metronome_gesture__WEBPACK_IMPORTED_MODULE_1__.clampTempo)(value));
  number.textContent = String(tempo);
  if (backgroundPulse && backgroundPulse.playState === 'running') {
    // Keep the current fade in step with tempo changes during a swipe.
    backgroundPulse.updatePlaybackRate(tempo / backgroundPulseTempo);
  }
  clock.setTempo(tempo);
  if (tempo !== previousTempo) syncConductor(true);
  updateLabel();
  if (tempo !== previousTempo) {
    clearTimeout(tempoSaveTimer);
    // Only save a tempo that has settled; settings edits and playback
    // controls must not save an intermediate swipe value early.
    tempoSaveTimer = setTimeout(function () {
      tempoSaveTimer = null;
      try {
        window.localStorage.setItem(_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.TEMPO_KEY, JSON.stringify(tempo));
      } catch (error) {
        // Tempo controls remain usable when storage is unavailable.
      }
    }, 5000);
  }
}
function toggle() {
  if (settingsDialog.open) return;
  message.hidden = true;
  if (clock.running) clock.stop();else clock.start({
    leadInBeats: settings.type === 'conductor' ? (0,_metronome_conductor__WEBPACK_IMPORTED_MODULE_3__.conductorPreparationBeats)(settings.beats) : 0
  });
}
function syncConductor() {
  var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (settings.type !== 'conductor') {
    conductor.stop();
    return;
  }
  var position = clock.getBeatPosition();
  if (reducedMotion.matches) position.progress = 0;
  var animate = clock.ready && !settingsDialog.open && !document.hidden && !reducedMotion.matches;
  conductor.sync(position, tempo, animate, force);
}
function applySettings(value) {
  var persist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var previous = settings;
  settings = (0,_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.normalizeSettings)(value);
  palette = (0,_metronome_settings__WEBPACK_IMPORTED_MODULE_2__.colorPalette)(settings.color);
  if (previous.color !== settings.color && backgroundPulse) backgroundPulse.cancel();
  document.documentElement.style.setProperty('--metronome-color', settings.color);
  document.documentElement.style.setProperty('--metronome-pulse', palette.pulse);
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
function animateSettings(keyframes, duration, onFinish) {
  if (settingsAnimation) settingsAnimation.cancel();
  settingsAnimation = null;
  if (reducedMotion.matches) {
    onFinish();
    return;
  }
  var animation = settingsDialog.animate(keyframes, {
    duration: duration,
    fill: 'both'
  });
  settingsAnimation = animation;
  animation.onfinish = function () {
    if (settingsAnimation !== animation) return;
    settingsAnimation = null;
    onFinish();
    animation.cancel();
  };
}
function closeSettings() {
  if (!settingsDialog.open || settingsClosing) return;
  var opening = settingsDialog.dataset.phase === 'opening';
  var transform = settingsAnimation ? getComputedStyle(settingsDialog).transform : 'translateY(0)';
  settingsClosing = true;
  settingsDialog.dataset.phase = 'closing';
  // An interrupted entrance exits from its current position without
  // first jumping to the fully open panel's anticipation movement.
  var keyframes = opening ? [{
    transform: transform,
    easing: 'ease-in'
  }, {
    transform: 'translateY(110%)'
  }] : [{
    transform: transform,
    offset: 0,
    easing: 'ease-out'
  }, {
    transform: 'translateY(-6px)',
    offset: 0.18,
    easing: 'cubic-bezier(.55, 0, .9, .35)'
  }, {
    transform: 'translateY(112%)',
    offset: 0.9,
    easing: 'ease-out'
  }, {
    transform: 'translateY(110%)',
    offset: 1
  }];
  animateSettings(keyframes, opening ? 180 : 280, function () {
    return settingsDialog.close();
  });
}
settingsButton.addEventListener('click', function () {
  if (settingsDialog.open) return;
  stopEdgeRepeat();
  gesture = null;
  pointerId = null;
  surface.classList.remove('is-dragging');
  settingsDialog.showModal();
  settingsDialog.dataset.phase = 'opening';
  settingsButton.setAttribute('aria-expanded', 'true');
  syncConductor();
  animateSettings([{
    transform: 'translateY(110%)',
    offset: 0,
    easing: 'cubic-bezier(.16, 1, .3, 1)'
  }, {
    transform: 'translateY(-10px)',
    offset: 0.73,
    easing: 'ease-in-out'
  }, {
    transform: 'translateY(3px)',
    offset: 0.88,
    easing: 'ease-out'
  }, {
    transform: 'translateY(0)',
    offset: 1
  }], 340, function () {
    settingsDialog.dataset.phase = 'open';
  });
});
document.querySelectorAll('[data-settings-close]').forEach(function (button) {
  button.addEventListener('click', closeSettings);
});
settingsDialog.addEventListener('cancel', function (event) {
  event.preventDefault();
  closeSettings();
});
settingsDialog.addEventListener('click', function (event) {
  if (event.target === settingsDialog && event.clientY < settingsDialog.getBoundingClientRect().top) {
    closeSettings();
  }
});
settingsDialog.addEventListener('close', function () {
  if (settingsAnimation) settingsAnimation.cancel();
  settingsAnimation = null;
  settingsClosing = false;
  delete settingsDialog.dataset.phase;
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
colorReset.addEventListener('click', function () {
  return applySettings(_objectSpread(_objectSpread({}, settings), {}, {
    color: _metronome_settings__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_SETTINGS.color
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
    if (settingsAnimation) settingsAnimation.finish();
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
setTempo(tempo);
})();

/******/ })()
;