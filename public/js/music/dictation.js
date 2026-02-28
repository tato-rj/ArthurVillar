/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/music/games/base/BaseStaffGame.js"
/*!********************************************************!*\
  !*** ./resources/js/music/games/base/BaseStaffGame.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseStaffGame: () => (/* binding */ BaseStaffGame),
/* harmony export */   PAGE_OPENED_AT_MS: () => (/* binding */ PAGE_OPENED_AT_MS)
/* harmony export */ });
/* harmony import */ var _staff_Staff_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../staff/Staff.js */ "./resources/js/music/staff/Staff.js");
/* harmony import */ var _staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../staff/staffUtils.js */ "./resources/js/music/staff/staffUtils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// resources/js/music/games/base/BaseStaffGame.js


var PAGE_OPENED_AT_MS = Date.now();

/**
 * BaseStaffGame
 * Shared runtime for staff-based games:
 * - Staff wiring (notes, accidentals, noteState events)
 * - Controls wiring (clear/check/help/continue)
 * - Scoring, progress, final overlay (CountUp), 2x perfect-game bonus
 * - UI SFX (Tone.js) + success/fail/final/perfect-game sounds
 *
 * Subclasses must implement:
 * - newChallenge()
 * - _onCheck()
 * Optionally override:
 * - _computeHintAnswer()
 * - _wireAccidentalPalette()
 * - _onFixedNoteState()
 */
var BaseStaffGame = /*#__PURE__*/function () {
  function BaseStaffGame() {
    var _this = this,
      _this$$doublePoints,
      _this$$doublePoints$h;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BaseStaffGame);
    var defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2,
      sound: true,
      showLetterNames: false,
      clefUrls: null,
      initialClef: "treble",
      maxUserNotes: Infinity,
      numOfChallenges: 10,
      practiceMode: false,
      timer: false,
      levelName: "",
      successPhrases: ["Awesome", "Nicely done", "Well done", "Great job", "Hooray", "Fantastic", "Nice work", "Looks good", "Good one", "Splendid", "Way to go", "Nailed it", "Brilliant", "Excellent", "Superb", "Right on", "You got it", "Perfect", "Spot on", "Impressive", "Top notch", "That’s it"],
      // namespace for jQuery event handlers (avoid collisions if multiple games exist)
      namespace: "staffGame",
      // UI gating: how many USER notes before removing instructions / enabling Check
      instructionsAfterUserNotes: 1,
      checkAfterUserNotes: 1
    };
    this.opts = _objectSpread(_objectSpread({}, defaults), options || {});
    this.ns = this.opts.namespace || "staffGame";
    this.opts.numOfChallenges = this._normalizeNumOfChallenges(this.opts.numOfChallenges);

    // UI SFX
    this._uiSfxReady = false;
    this._uiSfxSynth = null;
    this._uiSfxNoise = null;
    this._uiTimerSfxSynth = null;

    // DOM refs
    this.$staffEl = $(this.opts.staffEl);
    this.$accidentals = $("#accidentals");
    this.$controls = $("#controls");
    this.$feedback = $("#feedback-success");
    this.$bonusBadge = this.$feedback.find(".bonus");
    this.$points = $("#points");
    this.$increment = $("#increment");
    this.$checkBtn = $("#check button");
    this.$skipWrap = $("#skip");
    this.$skipBtn = this.$skipWrap.find("button");
    this.$finalOverlay = $("#final-overlay");
    this.$doublePoints = $("#double-points");
    this.$checkWrap = this.$checkBtn.parent();
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$helpBtn = $("#help");
    this.$timeupMessage = $("#timeup-message");
    this.$handPointer = $("#hand-pointer");
    this.$timer = $("#timer");
    this.$timerBox = this.$timer.children("div").first();
    this.$timerText = this.$timer.find("span");

    // Game state
    this.successPhrases = this.opts.successPhrases;
    this.maxUserNotes = Number(this.opts.maxUserNotes);
    this.numOfChallenges = this.opts.numOfChallenges;
    this.levelName = this.opts.levelName;
    this.points = 0;
    this._madeMistakeThisRound = false;
    this._madeAnyMistake = false;
    this._continueBound = false;
    this._usedHintThisRound = false;
    this._correctStreak = 0;
    this._stats = {
      checksTotal: 0,
      checksCorrect: 0,
      finishedAtMs: null
    };
    this._timerTimeoutId = null;
    this._timerRemainingSec = 0;
    this._audioUnlockArmed = false;
    this._timerEndsAtMs = 0;
    this._finalMetricsSfxTimeouts = [];
    this._finalCountupTimeouts = [];

    // Staff
    this.staff = new _staff_Staff_js__WEBPACK_IMPORTED_MODULE_0__.Staff(this.$staffEl, {
      clef: this.opts.initialClef || "treble",
      clefUrls: this.opts.clefUrls || window.__clefUrls,
      autoClef: false,
      getMaxUserNotes: function getMaxUserNotes() {
        return Number.isFinite(_this.maxUserNotes) ? _this.maxUserNotes : Infinity;
      },
      sound: !!this.opts.sound
    });
    this.showLetterNames = !!this.opts.showLetterNames;
    this.$staffEl.toggleClass("show-letternames", this.showLetterNames);

    // Fixed note state (for hints)
    this._fixedNote = {
      letterWithAcc: "?",
      letterOnly: "?"
    };
    this._fixedState = null;

    // init UI
    this.$increment.hide();
    this.$bonusBadge.hide();
    (_this$$doublePoints = this.$doublePoints) === null || _this$$doublePoints === void 0 || (_this$$doublePoints$h = _this$$doublePoints.hide) === null || _this$$doublePoints$h === void 0 || _this$$doublePoints$h.call(_this$$doublePoints);
    this.$points.text(String(this.points));
  }
  return _createClass(BaseStaffGame, [{
    key: "_normalizeNumOfChallenges",
    value: function _normalizeNumOfChallenges(raw) {
      var _this$opts$numOfChall, _this$opts;
      var n = Number(raw);
      var fallback = Number((_this$opts$numOfChall = (_this$opts = this.opts) === null || _this$opts === void 0 ? void 0 : _this$opts.numOfChallenges) !== null && _this$opts$numOfChall !== void 0 ? _this$opts$numOfChall : 10);
      var safe = Number.isFinite(n) ? Math.trunc(n) : Number.isFinite(fallback) ? Math.trunc(fallback) : 10;
      var min = BaseStaffGame.MIN_CHALLENGES;
      var max = BaseStaffGame.MAX_CHALLENGES;
      if (safe < min) return min;
      if (safe > max) return max;
      return safe;
    }

    // ------------------------ sound controls ------------------------
  }, {
    key: "setSoundEnabled",
    value: function setSoundEnabled(enabled) {
      this.opts.sound = !!enabled;
      this.staff.setSoundEnabled(!!enabled);
      if (!this.opts.sound && window.Tone) {
        try {
          this._uiSfxSynth && this._uiSfxSynth.releaseAll && this._uiSfxSynth.releaseAll();
        } catch (_) {}
        try {
          this._uiSfxSynth && this._uiSfxSynth.dispose && this._uiSfxSynth.dispose();
        } catch (_) {}
        try {
          this._uiSfxNoise && this._uiSfxNoise.dispose && this._uiSfxNoise.dispose();
        } catch (_) {}
        try {
          this._uiTimerSfxSynth && this._uiTimerSfxSynth.dispose && this._uiTimerSfxSynth.dispose();
        } catch (_) {}
        this._uiSfxSynth = null;
        this._uiSfxNoise = null;
        this._uiTimerSfxSynth = null;
        this._uiSfxReady = false;
        try {
          Tone.context && Tone.context.suspend && Tone.context.suspend();
        } catch (_) {}
      }
      return this;
    }
  }, {
    key: "isSoundEnabled",
    value: function isSoundEnabled() {
      return this.staff.isSoundEnabled();
    }
  }, {
    key: "_ensureUiSfxAudio",
    value: function () {
      var _ensureUiSfxAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (this.isSoundEnabled()) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (!this._uiSfxReady) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              if (window.Tone) {
                _context.n = 3;
                break;
              }
              return _context.a(2);
            case 3:
              _context.p = 3;
              _context.n = 4;
              return Tone.start();
            case 4:
              _context.n = 6;
              break;
            case 5:
              _context.p = 5;
              _t = _context.v;
              return _context.a(2);
            case 6:
              this._uiSfxSynth = new Tone.PolySynth(Tone.Synth, {
                oscillator: {
                  type: "triangle"
                },
                envelope: {
                  attack: 0.005,
                  decay: 0.12,
                  sustain: 0.0,
                  release: 0.25
                }
              }).toDestination();
              this._uiSfxNoise = new Tone.NoiseSynth({
                noise: {
                  type: "pink"
                },
                envelope: {
                  attack: 0.001,
                  decay: 0.08,
                  sustain: 0.0,
                  release: 0.06
                }
              }).toDestination();
              this._uiTimerSfxSynth = new Tone.Synth({
                oscillator: {
                  type: "square"
                },
                envelope: {
                  attack: 0.001,
                  decay: 0.03,
                  sustain: 0.0,
                  release: 0.06
                }
              }).toDestination();
              this._uiSfxReady = true;
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[3, 5]]);
      }));
      function _ensureUiSfxAudio() {
        return _ensureUiSfxAudio2.apply(this, arguments);
      }
      return _ensureUiSfxAudio;
    }()
  }, {
    key: "_armUiSfxOnFirstGesture",
    value: function _armUiSfxOnFirstGesture() {
      var _this2 = this;
      if (this._audioUnlockArmed) return;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._audioUnlockArmed = true;
      var ns = ".uiSfxUnlock.".concat(this.ns);
      var unlock = function unlock() {
        _this2._ensureUiSfxAudio()["finally"](function () {
          $(document).off(ns);
        });
      };
      $(document).off(ns).one("pointerdown".concat(ns, " keydown").concat(ns, " touchstart").concat(ns), unlock);
    }
  }, {
    key: "_playSuccessSfxBasic",
    value: function _playSuccessSfxBasic() {
      var _this3 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        if (!_this3._uiSfxSynth) return;
        var now = Tone.now();
        var variants = [["C6", "E6", "G6"], ["D6", "F#6", "A6"], ["E6", "G6", "B6"], ["G5", "B5", "D6", "G6"], ["A5", "C6", "E6", "A6"], ["C6", "D6", "G6"], ["F5", "A5", "C6", "F6"], ["E6", "A6", "C7"], ["B5", "D6", "G6"], ["C6", "G6", "E7"]];
        var picked = variants[Math.floor(Math.random() * variants.length)];
        picked.forEach(function (n, i) {
          _this3._uiSfxSynth.triggerAttackRelease(n, 0.07, now + i * 0.05, 0.42);
        });
      });
    }
  }, {
    key: "_playSuccessSfxBonus",
    value: function _playSuccessSfxBonus() {
      var _this4 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var _this4$_uiSfxSynth$ge;
        if (!_this4._uiSfxSynth) return;
        var now = Tone.now();
        var oldEnv = _objectSpread({}, _this4._uiSfxSynth.get().envelope);
        var oldOsc = (_this4$_uiSfxSynth$ge = _this4._uiSfxSynth.get().oscillator) === null || _this4$_uiSfxSynth$ge === void 0 ? void 0 : _this4$_uiSfxSynth$ge.type;
        try {
          _this4._uiSfxSynth.set({
            oscillator: {
              type: "sine"
            },
            envelope: {
              attack: 0.004,
              decay: 0.12,
              sustain: 0.15,
              release: 0.65
            }
          });
        } catch (_) {}
        var streakLevel = Math.max(1, Math.min(24, Number(_this4._correctStreak) || 1));
        var semitoneShift = streakLevel - 1;
        var toNote = function toNote(midi) {
          return Tone.Frequency(midi, "midi").toNote();
        };

        // Start slightly higher (D4 root) and climb one semitone per streak level up to 24.
        var arp = [62, 66, 69, 73, 74].map(function (m) {
          return toNote(m + semitoneShift);
        });
        var hit = [62, 69, 74, 78].map(function (m) {
          return toNote(m + semitoneShift);
        });
        arp.forEach(function (n, i) {
          _this4._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.045, 0.45);
        });
        hit.forEach(function (n) {
          _this4._uiSfxSynth.triggerAttackRelease(n, 0.12, now + 0.26, 0.30);
        });
        setTimeout(function () {
          try {
            _this4._uiSfxSynth.set({
              oscillator: {
                type: oldOsc || "triangle"
              },
              envelope: oldEnv
            });
          } catch (_) {}
        }, 600);
      });
    }
  }, {
    key: "_playFailSfx",
    value: function _playFailSfx() {
      var _this5 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var now = Tone.now();
        if (_this5._uiSfxNoise) {
          _this5._uiSfxNoise.triggerAttackRelease(0.06, now, 0.1);
        }
        if (_this5._uiSfxSynth) {
          _this5._uiSfxSynth.triggerAttackRelease("A2", 0.10, now + 0.01, 0.1);
          _this5._uiSfxSynth.triggerAttackRelease("G2", 0.12, now + 0.08, 10.1);
        }
      });
    }
  }, {
    key: "_playFinalSfx",
    value: function _playFinalSfx() {
      var _this6 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var _this6$_uiSfxSynth$ge;
        if (!_this6._uiSfxSynth) return;
        var oldEnv = _objectSpread({}, _this6._uiSfxSynth.get().envelope);
        var oldOsc = (_this6$_uiSfxSynth$ge = _this6._uiSfxSynth.get().oscillator) === null || _this6$_uiSfxSynth$ge === void 0 ? void 0 : _this6$_uiSfxSynth$ge.type;
        _this6._uiSfxSynth.set({
          oscillator: {
            type: "sine"
          },
          envelope: {
            attack: 0.02,
            decay: 0.25,
            sustain: 0.35,
            release: 0.9
          }
        });
        var now = Tone.now();
        var variants = [
        // 1) Triad pad + bright run
        function () {
          ["C4", "G4", "C5", "E5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.9, now, 0.6);
          });
          ["G5", "A5", "B5", "C6", "D6", "E6", "G6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.08, now + 0.25 + i * 0.06, 0.35);
          });
        },
        // 2) Rising broken chord + final hit
        function () {
          ["C5", "E5", "G5", "B5", "D6", "G6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.11, now + i * 0.08, 0.44);
          });
          ["C6", "E6", "G6"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.28, now + 0.62, 0.5);
          });
        },
        // 3) Two chord swells
        function () {
          ["A3", "E4", "A4", "C5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.45, now, 0.45);
          });
          ["F4", "A4", "C5", "F5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.52, now + 0.35, 0.48);
          });
          ["C5", "F5", "A5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.78, 0.4);
          });
        },
        // 4) Sparkly step run + octave landing
        function () {
          ["E5", "G5", "A5", "B5", "D6", "E6", "G6", "A6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.075, now + i * 0.055, 0.34);
          });
          ["A5", "A6", "C7"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.20, now + 0.52, 0.42);
          });
        },
        // 5) Major lift arpeggio
        function () {
          ["D4", "A4", "D5", "F#5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.36, now, 0.45);
          });
          ["D5", "F#5", "A5", "D6", "F#6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.095, now + 0.2 + i * 0.065, 0.4);
          });
        },
        // 6) Warm cadence
        function () {
          ["G3", "D4", "G4", "B4"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.4, now, 0.4);
          });
          ["C4", "E4", "G4", "C5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.44, now + 0.32, 0.46);
          });
          ["E5", "G5", "C6"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.22, now + 0.72, 0.4);
          });
        },
        // 7) Fast gamey sparkle
        function () {
          ["C6", "D6", "E6", "G6", "A6", "G6", "E6", "C7"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.048, 0.3);
          });
          ["G6", "C7"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.2, now + 0.48, 0.38);
          });
        },
        // 8) Two-step fanfare
        function () {
          ["F4", "C5", "A5"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.16, now + i * 0.06, 0.45);
          });
          ["G4", "D5", "B5"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.16, now + 0.28 + i * 0.06, 0.48);
          });
          ["C5", "E5", "G5", "C6"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.26, now + 0.54, 0.44);
          });
        },
        // 9) Descend then resolve up
        function () {
          ["A6", "G6", "E6", "D6", "C6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.08, now + i * 0.06, 0.34);
          });
          ["E6", "G6", "C7"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.4, 0.42);
          });
        },
        // 10) Big finish hit
        function () {
          ["C4", "E4", "G4", "C5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.34, now, 0.48);
          });
          ["E5", "G5", "B5", "D6", "E6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.09, now + 0.18 + i * 0.055, 0.38);
          });
          ["C6", "E6", "G6", "C7"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.3, now + 0.58, 0.5);
          });
        }];
        var playVariant = variants[Math.floor(Math.random() * variants.length)];
        playVariant();
        setTimeout(function () {
          try {
            _this6._uiSfxSynth.set({
              oscillator: {
                type: oldOsc || "triangle"
              },
              envelope: oldEnv
            });
          } catch (_) {}
        }, 1700);
      });
    }
  }, {
    key: "_clearFinalMetricsSfxTimers",
    value: function _clearFinalMetricsSfxTimers() {
      if (!Array.isArray(this._finalMetricsSfxTimeouts)) {
        this._finalMetricsSfxTimeouts = [];
        return;
      }
      this._finalMetricsSfxTimeouts.forEach(function (id) {
        return clearTimeout(id);
      });
      this._finalMetricsSfxTimeouts = [];
    }
  }, {
    key: "_clearFinalCountupTimers",
    value: function _clearFinalCountupTimers() {
      if (!Array.isArray(this._finalCountupTimeouts)) {
        this._finalCountupTimeouts = [];
        return;
      }
      this._finalCountupTimeouts.forEach(function (id) {
        return clearTimeout(id);
      });
      this._finalCountupTimeouts = [];
    }
  }, {
    key: "_playFinalMetricPopSfx",
    value: function _playFinalMetricPopSfx(index) {
      if (!this.isSoundEnabled() || !window.Tone) return;
      if (!this._uiSfxReady) return;
      var now = Tone.now();
      var safeIdx = Math.max(0, Number(index) || 0);
      var midi = Math.min(96, 67 + safeIdx * 2); // rises as each box appears
      var synth = this._uiTimerSfxSynth || this._uiSfxSynth;
      if (!synth) return;
      synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), 0.055, now, 0.44);
      synth.triggerAttackRelease(Tone.Frequency(midi + 5, "midi"), 0.045, now + 0.03, 0.34);
    }
  }, {
    key: "_animateFinalMetricsWithSfx",
    value: function _animateFinalMetricsWithSfx() {
      var _this7 = this;
      var $boxes = this.$finalOverlay.find("#metrics-boxes > div");
      if (!$boxes.length) return;
      var BASE_DELAY_MS = 260;
      var STEP_DELAY_MS = 260; // wider spacing between boxes

      this._clearFinalMetricsSfxTimers();
      $boxes.each(function (i, el) {
        var delayMs = BASE_DELAY_MS + i * STEP_DELAY_MS;
        el.style.animationDelay = "".concat(delayMs, "ms");
        var tid = setTimeout(function () {
          _this7._playFinalMetricPopSfx(i);
        }, delayMs);
        _this7._finalMetricsSfxTimeouts.push(tid);
      });
    }
  }, {
    key: "_playPerfectGameBonusSfx",
    value: function _playPerfectGameBonusSfx() {
      var _this8 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var _this8$_uiSfxSynth$ge;
        if (!_this8._uiSfxSynth) return;
        var oldEnv = _objectSpread({}, _this8._uiSfxSynth.get().envelope);
        var oldOsc = (_this8$_uiSfxSynth$ge = _this8._uiSfxSynth.get().oscillator) === null || _this8$_uiSfxSynth$ge === void 0 ? void 0 : _this8$_uiSfxSynth$ge.type;
        try {
          _this8._uiSfxSynth.set({
            oscillator: {
              type: "triangle"
            },
            envelope: {
              attack: 0.01,
              decay: 0.18,
              sustain: 0.25,
              release: 0.8
            }
          });
        } catch (_) {}
        var now = Tone.now();
        var fanfare = ["C5", "E5", "G5", "C6", "E6", "G6", "C7"];
        fanfare.forEach(function (n, i) {
          _this8._uiSfxSynth.triggerAttackRelease(n, 0.09, now + i * 0.06, 0.62);
        });
        var hit = ["C6", "G6", "C7", "E7"];
        hit.forEach(function (n) {
          return _this8._uiSfxSynth.triggerAttackRelease(n, 0.35, now + 0.48, 0.46);
        });
        setTimeout(function () {
          try {
            _this8._uiSfxSynth.set({
              oscillator: {
                type: oldOsc || "triangle"
              },
              envelope: oldEnv
            });
          } catch (_) {}
        }, 1400);
      });
    }

    // ------------------------ lifecycle ------------------------
  }, {
    key: "_isTimerEnabled",
    value: function _isTimerEnabled() {
      var v = this.opts.timer;
      var s = String(v || "").trim().toLowerCase();
      return v === true || s === "true" || s === "on";
    }
  }, {
    key: "_formatTimerDisplay",
    value: function _formatTimerDisplay(totalSec) {
      var sec = Math.max(0, Math.floor(Number(totalSec) || 0));
      var mm = String(Math.floor(sec / 60)).padStart(2, "0");
      var ss = String(sec % 60).padStart(2, "0");
      return "".concat(mm, ":").concat(ss);
    }
  }, {
    key: "_renderTimerDisplay",
    value: function _renderTimerDisplay() {
      var _this$$timerText;
      if (!((_this$$timerText = this.$timerText) !== null && _this$$timerText !== void 0 && _this$$timerText.length)) return;
      this.$timerText.text(this._formatTimerDisplay(this._timerRemainingSec));
      this._syncTimerWarningStyle();
    }
  }, {
    key: "_syncTimerWarningStyle",
    value: function _syncTimerWarningStyle() {
      var _this$$timerBox;
      if (!((_this$$timerBox = this.$timerBox) !== null && _this$$timerBox !== void 0 && _this$$timerBox.length)) return;
      var warning = this._timerRemainingSec <= 5;
      this.$timerBox.toggleClass("bg-red", warning);
      this.$timerBox.toggleClass("bg-primary", !warning);
    }
  }, {
    key: "_setTimedOutInteractivityDisabled",
    value: function _setTimedOutInteractivityDisabled(disabled) {
      var on = !!disabled;
      var $staff = $("#staff");
      var $staffWrapper = $("#staff-wrapper");
      var $accidentals = $("#accidentals");
      if (on) {
        $staff.attr("disabled", "disabled");
        $staffWrapper.attr("disabled", "disabled");
        $accidentals.attr("disabled", "disabled");
        $staff.attr("aria-disabled", "true");
        $staffWrapper.attr("aria-disabled", "true");
        $accidentals.attr("aria-disabled", "true");
        $staff.css("pointer-events", "none");
        $staffWrapper.css("pointer-events", "none");
        $accidentals.css("pointer-events", "none");
      } else {
        $staff.removeAttr("disabled");
        $staffWrapper.removeAttr("disabled");
        $accidentals.removeAttr("disabled");
        $staff.removeAttr("aria-disabled");
        $staffWrapper.removeAttr("aria-disabled");
        $accidentals.removeAttr("aria-disabled");
        $staff.css("pointer-events", "");
        $staffWrapper.css("pointer-events", "");
        $accidentals.css("pointer-events", "");
      }
    }
  }, {
    key: "_showSkipRoundButton",
    value: function _showSkipRoundButton() {
      var _this$$skipWrap;
      if (!((_this$$skipWrap = this.$skipWrap) !== null && _this$$skipWrap !== void 0 && _this$$skipWrap.length)) return;
      this.$skipWrap.show();
    }
  }, {
    key: "_hideSkipRoundButton",
    value: function _hideSkipRoundButton() {
      var _this$$skipWrap2;
      if (!((_this$$skipWrap2 = this.$skipWrap) !== null && _this$$skipWrap2 !== void 0 && _this$$skipWrap2.length)) return;
      this.$skipWrap.hide();
    }
  }, {
    key: "_hideTimeUpMessage",
    value: function _hideTimeUpMessage() {
      var _this$$timeupMessage;
      if (!((_this$$timeupMessage = this.$timeupMessage) !== null && _this$$timeupMessage !== void 0 && _this$$timeupMessage.length)) return;
      this.$timeupMessage.removeClass("animate__animated animate__flash").hide();
    }
  }, {
    key: "_showTimeUpMessage",
    value: function _showTimeUpMessage() {
      var _this$$timeupMessage2;
      if (!((_this$$timeupMessage2 = this.$timeupMessage) !== null && _this$$timeupMessage2 !== void 0 && _this$$timeupMessage2.length)) return;
      this.$timeupMessage.removeClass("animate__animated animate__flash").show();
      // eslint-disable-next-line no-unused-expressions
      this.$timeupMessage[0] && this.$timeupMessage[0].offsetWidth;
      this.$timeupMessage.addClass("animate__animated animate__flash");
    }
  }, {
    key: "_wouldReachLastRoundAfterAdvance",
    value: function _wouldReachLastRoundAfterAdvance() {
      if (this._isPracticeMode()) return false;
      var steps = Math.max(1, this.numOfChallenges || 1);
      var increment = 100 / steps;
      var current = parseFloat(this.$progressBar.data("progress")) || 0;
      return current + increment >= 100;
    }
  }, {
    key: "_finishRoundAsTimedOut",
    value: function _finishRoundAsTimedOut() {
      var _this9 = this;
      this._correctStreak = 0;
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this._stats.checksTotal += 1;
      var reachedEnd = this._updateProgressBar() >= 100;
      if (reachedEnd && !this._isPracticeMode()) {
        this._stats.finishedAtMs = Date.now();
        this.$checkBtn.text('Final results, let\'s see…');
        setTimeout(function () {
          return _this9._showFinalResults();
        }, 1600);
        return;
      }
      this._setTimedOutInteractivityDisabled(false);
      this._hideTimeUpMessage();
      this._hideSkipRoundButton();
      $("#interval").removeClass("text-red").addClass("text-blue");
      this._resetRoundTimerIfEnabled();
      this.newChallenge();
      this._armUiGates({
        resetInstructions: false
      });
      this.$checkBtn.enable();
    }
  }, {
    key: "_pulseTimerWarning",
    value: function _pulseTimerWarning() {
      var _this$$timer;
      if (!((_this$$timer = this.$timer) !== null && _this$$timer !== void 0 && _this$$timer.length)) return;
      this.$timer.removeClass("animate__animated animate__pulse");
      // eslint-disable-next-line no-unused-expressions
      this.$timer[0] && this.$timer[0].offsetWidth;
      this.$timer.addClass("animate__animated animate__pulse");
    }
  }, {
    key: "_playTimerWarningBeep",
    value: function _playTimerWarningBeep() {
      if (!this.isSoundEnabled() || !window.Tone) return;
      if (!this._uiSfxReady || !this._uiTimerSfxSynth) return;
      var now = Tone.now();
      this._uiTimerSfxSynth.triggerAttackRelease("C6", 0.06, now, 0.5);
    }
  }, {
    key: "_playTimerTimeUpSfx",
    value: function _playTimerTimeUpSfx() {
      if (!this.isSoundEnabled() || !window.Tone) return;
      if (!this._uiSfxReady || !this._uiTimerSfxSynth) return;
      var now = Tone.now();
      if (this._uiSfxNoise) {
        this._uiSfxNoise.triggerAttackRelease(0.12, now, 0.2);
      }
      this._uiTimerSfxSynth.triggerAttackRelease("G4", 0.11, now, 0.72);
      this._uiTimerSfxSynth.triggerAttackRelease("E4", 0.13, now + 0.10, 0.76);
      this._uiTimerSfxSynth.triggerAttackRelease("C4", 0.18, now + 0.22, 0.82);
    }
  }, {
    key: "_stopGameTimer",
    value: function _stopGameTimer() {
      var _this$$timer2, _this$$timer2$removeC;
      if (this._timerTimeoutId != null) {
        clearTimeout(this._timerTimeoutId);
        this._timerTimeoutId = null;
      }
      this._timerEndsAtMs = 0;
      this._timerRemainingSec = 0;
      this._syncTimerWarningStyle();
      (_this$$timer2 = this.$timer) === null || _this$$timer2 === void 0 || (_this$$timer2$removeC = _this$$timer2.removeClass) === null || _this$$timer2$removeC === void 0 || _this$$timer2$removeC.call(_this$$timer2, "animate__animated animate__pulse");
    }
  }, {
    key: "_pauseGameTimer",
    value: function _pauseGameTimer() {
      var _this$$timer3, _this$$timer3$removeC;
      if (this._timerTimeoutId != null) {
        clearTimeout(this._timerTimeoutId);
        this._timerTimeoutId = null;
      }
      this._timerEndsAtMs = 0;
      (_this$$timer3 = this.$timer) === null || _this$$timer3 === void 0 || (_this$$timer3$removeC = _this$$timer3.removeClass) === null || _this$$timer3$removeC === void 0 || _this$$timer3$removeC.call(_this$$timer3, "animate__animated animate__pulse");
    }
  }, {
    key: "_runGameTimerTick",
    value: function _runGameTimerTick() {
      var _this0 = this;
      if (!this._timerEndsAtMs) return;
      var prev = this._timerRemainingSec;
      var msLeft = this._timerEndsAtMs - Date.now();
      var next = Math.max(0, Math.ceil(msLeft / 1000));
      this._timerRemainingSec = next;
      this._renderTimerDisplay();
      if (next > 0 && next <= 5 && next !== prev) {
        this._pulseTimerWarning();
        this._playTimerWarningBeep();
      } else if (next === 0 && prev !== 0) {
        $("#check").hide();
        this.$helpBtn.hide();
        this._setTimedOutInteractivityDisabled(true);
        this._pulseTimerWarning();
        this._playTimerTimeUpSfx();
        this._showTimeUpMessage();
        this.$checkBtn.disable();
        if (this._wouldReachLastRoundAfterAdvance()) {
          this._hideSkipRoundButton();
          this._finishRoundAsTimedOut();
        } else {
          this._showSkipRoundButton();
        }
      }
      if (next <= 0) {
        this._stopGameTimer();
        return;
      }
      var nextChangeAt = this._timerEndsAtMs - (next - 1) * 1000;
      var delay = Math.max(16, nextChangeAt - Date.now());
      this._timerTimeoutId = setTimeout(function () {
        return _this0._runGameTimerTick();
      }, delay);
    }
  }, {
    key: "_startGameTimer",
    value: function _startGameTimer() {
      var startSec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      this._stopGameTimer();
      var total = Math.max(0, Math.floor(Number(startSec) || 0));
      this._timerEndsAtMs = Date.now() + total * 1000;
      this._timerRemainingSec = total;
      this._renderTimerDisplay();
      this._runGameTimerTick();
    }
  }, {
    key: "_timerLimitSeconds",
    value: function _timerLimitSeconds() {
      var raw = Number(this.opts.timeLimit != null ? this.opts.timeLimit : this.opts.timerLimit);
      if (!Number.isFinite(raw)) return 10;
      return Math.max(0, Math.floor(raw));
    }
  }, {
    key: "_resetRoundTimerIfEnabled",
    value: function _resetRoundTimerIfEnabled() {
      if (!this._isTimerEnabled()) return;
      this.$timer.show();
      this._startGameTimer(this._timerLimitSeconds());
    }
  }, {
    key: "start",
    value: function start() {
      this._madeAnyMistake = false;
      $("#instructions").show();
      $("#controls").show();
      this._instructionsRemoved = false;
      this._wireAccidentalPalette();
      this._wireStaffTools();
      this._wireFirstNoteLearningTracker();
      this._wireControls();
      this._resetProgress();
      this._setTimedOutInteractivityDisabled(false);
      this._hideTimeUpMessage();
      this._hideSkipRoundButton();
      this._syncHandPointerVisibility();
      if (this._isTimerEnabled()) {
        this.$timer.show();
        this._armUiSfxOnFirstGesture();
        this._resetRoundTimerIfEnabled();
      } else {
        this._stopGameTimer();
        this.$timer.hide();
      }
      this.newChallenge();
      this._armUiGates({
        resetInstructions: true
      });
      $("#page-wrapper").fadeIn("fast");
    }

    // Subclasses must implement
  }, {
    key: "newChallenge",
    value: function newChallenge() {
      throw new Error("newChallenge() not implemented");
    }

    // Subclasses implement their own check logic
  }, {
    key: "_onCheck",
    value: function _onCheck() {
      throw new Error("_onCheck() not implemented");
    }

    // ------------------------ wiring ------------------------
  }, {
    key: "_wireAccidentalPalette",
    value: function _wireAccidentalPalette() {
      $("#accidentals .music-font__doublesharp, #accidentals .music-font__doubleflat").addClass("d-none");
    }
  }, {
    key: "_wireStaffTools",
    value: function _wireStaffTools() {
      var _this1 = this;
      this.staff.enableNoteDragAndClickDelete();
      this.staff.enableGhostClickCreate();
      this.staff.enableAccidentalDrag($("#accidentals .music-font__sharp, #accidentals .music-font__flat, #accidentals .music-font__natural"));
      this.staff.enableAccidentalDropOnStaff();
      this.$staffEl.off("staff:noteState._log.".concat(this.ns)).on("staff:noteState._log.".concat(this.ns), function (e, data) {
        var full = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.spellNoteFromState)(_this1.staff, data.step, data.accidentalClass);
        var letterOnly = full.replace(/\d+$/, "");
        if (_this1.showLetterNames) {
          _this1.$staffEl.find(".note[data-note-id=\"".concat(data.noteId, "\"] .lettername")).text(letterOnly);
        }
        if (data.source === "fixed") {
          var _this1$_onFixedNoteSt;
          _this1._fixedNote = {
            letterWithAcc: letterOnly,
            letterOnly: letterOnly.replace(/[#b]+$/, "")
          };
          _this1._fixedState = {
            step: data.step,
            accidentalClass: data.accidentalClass || null,
            midi: data.midi
          };
          (_this1$_onFixedNoteSt = _this1._onFixedNoteState) === null || _this1$_onFixedNoteSt === void 0 || _this1$_onFixedNoteSt.call(_this1, data, full, letterOnly);
        }

        // Keep your debug logging behavior
        // eslint-disable-next-line no-console
        console.log(data.source === "fixed" ? "Fixed note:" : "User note:", full, {
          midi: data.midi,
          noteId: data.noteId,
          step: data.step,
          clef: _this1.staff.getClef()
        });
      });
    }
  }, {
    key: "_firstNoteCookieName",
    value: function _firstNoteCookieName() {
      var base = String(this.ns || "staffGame").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
      return "music_first_note_learned_".concat(base);
    }
  }, {
    key: "_getCookie",
    value: function _getCookie(name) {
      var key = "".concat(name, "=");
      var parts = String(document.cookie || "").split("; ");
      for (var i = 0; i < parts.length; i += 1) {
        if (parts[i].startsWith(key)) return decodeURIComponent(parts[i].slice(key.length));
      }
      return null;
    }
  }, {
    key: "_setCookie",
    value: function _setCookie(name, value) {
      var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3650;
      var d = new Date();
      d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
      var expires = "expires=".concat(d.toUTCString());
      document.cookie = "".concat(name, "=").concat(encodeURIComponent(String(value)), "; ").concat(expires, "; path=/; SameSite=Lax");
    }
  }, {
    key: "_hasLearnedFirstNote",
    value: function _hasLearnedFirstNote() {
      return this._getCookie(this._firstNoteCookieName()) === "1";
    }
  }, {
    key: "_markLearnedFirstNote",
    value: function _markLearnedFirstNote() {
      this._setCookie(this._firstNoteCookieName(), "1");
    }
  }, {
    key: "_syncHandPointerVisibility",
    value: function _syncHandPointerVisibility() {
      var _this$$handPointer;
      if (!((_this$$handPointer = this.$handPointer) !== null && _this$$handPointer !== void 0 && _this$$handPointer.length)) return;
      if (this._hasLearnedFirstNote()) this.$handPointer.hide();else this.$handPointer.show();
    }
  }, {
    key: "_wireFirstNoteLearningTracker",
    value: function _wireFirstNoteLearningTracker() {
      var _this10 = this;
      this.$staffEl.off("staff:userNoteAdded._learn.".concat(this.ns)).on("staff:userNoteAdded._learn.".concat(this.ns), function () {
        var _this10$$handPointer2, _this10$$handPointer3;
        if (_this10._hasLearnedFirstNote()) {
          var _this10$$handPointer, _this10$$handPointer$;
          (_this10$$handPointer = _this10.$handPointer) === null || _this10$$handPointer === void 0 || (_this10$$handPointer$ = _this10$$handPointer.hide) === null || _this10$$handPointer$ === void 0 || _this10$$handPointer$.call(_this10$$handPointer);
          _this10.$staffEl.off("staff:userNoteAdded._learn.".concat(_this10.ns));
          return;
        }
        _this10._markLearnedFirstNote();
        (_this10$$handPointer2 = _this10.$handPointer) === null || _this10$$handPointer2 === void 0 || (_this10$$handPointer3 = _this10$$handPointer2.hide) === null || _this10$$handPointer3 === void 0 || _this10$$handPointer3.call(_this10$$handPointer2);
        _this10.$staffEl.off("staff:userNoteAdded._learn.".concat(_this10.ns));
      });
    }
  }, {
    key: "_wireControls",
    value: function _wireControls() {
      var _this11 = this;
      $("#clear").off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
        return _this11.staff.clearNotes();
      });
      this.$checkBtn.off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
        return _this11._onCheck();
      });
      this.$helpBtn.off("click.".concat(this.ns, "Help")).on("click.".concat(this.ns, "Help"), function () {
        _this11._usedHintThisRound = true;
        _this11._showHintNote();
      });
      this.$skipBtn.off("click.".concat(this.ns, "Skip")).on("click.".concat(this.ns, "Skip"), function (e) {
        e.preventDefault();
        _this11._finishRoundAsTimedOut();
      });
      if (!this._continueBound) {
        this._continueBound = true;
        $("#continue button").off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
          $("#continue").hide();
          _this11._hideSkipRoundButton();
          _this11._hideTimeUpMessage();
          _this11._setTimedOutInteractivityDisabled(false);
          _this11._resetRoundTimerIfEnabled();
          _this11.newChallenge();
          _this11._armUiGates({
            resetInstructions: false
          });
          _this11.$checkBtn.enable();
        });
      }
    }

    // ------------------------ UI gating ------------------------
  }, {
    key: "_instructionsAfterUserNotes",
    value: function _instructionsAfterUserNotes() {
      var v = Number(this.opts.instructionsAfterUserNotes);
      return Number.isFinite(v) && v >= 0 ? Math.floor(v) : 1;
    }
  }, {
    key: "_checkAfterUserNotes",
    value: function _checkAfterUserNotes() {
      var v = Number(this.opts.checkAfterUserNotes);
      return Number.isFinite(v) && v >= 0 ? Math.floor(v) : 1;
    }
  }, {
    key: "_armUiGates",
    value: function _armUiGates() {
      var _this12 = this;
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        resetInstructions = _ref.resetInstructions;
      var needForInstructions = this._instructionsAfterUserNotes();
      var needForCheck = this._checkAfterUserNotes();
      if (resetInstructions) this._instructionsRemoved = false;

      // Ensure the check control occupies layout but is not visible until the gate opens.
      $("#check").show().addClass("invisible");
      this._userNotesSinceGate = 0;
      this.$staffEl.off("staff:userNoteAdded._uiGate.".concat(this.ns)).on("staff:userNoteAdded._uiGate.".concat(this.ns), function () {
        _this12._userNotesSinceGate += 1;
        if (!_this12._instructionsRemoved && _this12._userNotesSinceGate >= needForInstructions) {
          $("#instructions").remove();
          _this12._instructionsRemoved = true;
        }
        if (_this12._userNotesSinceGate >= needForCheck) {
          $("#check").removeClass("invisible");
          _this12.$staffEl.off("staff:userNoteAdded._uiGate.".concat(_this12.ns));
        }
      });
    }

    // ------------------------ initial note range ------------------------

    /**
     * Resolve the configured range index for the randomly-generated *given* note.
     *
     * Supported inputs:
     * - number or numeric string: 0=narrow, 1=wide, 2=full
     *
     * There is intentionally NO default here; the backend must always provide it.
     *
     * @returns {0|1|2}
     */
  }, {
    key: "_initialNoteRangeIndex",
    value: function _initialNoteRangeIndex() {
      var raw = this.opts.initialNoteRange != null ? this.opts.initialNoteRange : this.opts.range != null ? this.opts.range : undefined;
      if (raw == null) {
        throw new Error("[BaseStaffGame] Missing required option: initialNoteRange (0=narrow, 1=wide, 2=full).");
      }
      var n = Number(raw);
      if (!Number.isFinite(n)) {
        throw new Error("[BaseStaffGame] initialNoteRange must be a number (0, 1, or 2). Got: ".concat(String(raw)));
      }
      var idx = Math.trunc(n);
      if (idx === 0 || idx === 1 || idx === 2) {
        return /** @type {0|1|2} */idx;
      }

      // Out-of-range values default to FULL (2) instead of crashing.
      // eslint-disable-next-line no-console
      console.warn("[BaseStaffGame] initialNoteRange out of range; defaulting to 2 (full).", {
        value: raw
      });
      return 2;
    }

    /**
     * Staff "step" for the clef's reference line:
     * - treble: G line (2nd line from bottom) => step 2
     * - bass:   F line (2nd line from top)    => step 6
     * - alto:   C line (middle line)          => step 4
     * - tenor:  C line (2nd line from top)    => step 6
     */
  }, {
    key: "_clefMainLineStep",
    value: function _clefMainLineStep(clef) {
      switch (String(clef || "").trim().toLowerCase()) {
        case "bass":
          return 6;
        case "alto":
          return 4;
        case "tenor":
          return 6;
        case "treble":
        default:
          return 2;
      }
    }

    /**
     * Allowed bounds for the randomly-generated *given* note, based on the current clef.
     * @returns {{min:number, max:number}}
     */
  }, {
    key: "_initialFixedStepBounds",
    value: function _initialFixedStepBounds() {
      var minAllowed = this.staff.minStepAllowed();
      var maxAllowed = this.staff.maxStepAllowed();
      var idx = this._initialNoteRangeIndex();
      if (idx === 2) return {
        min: minAllowed,
        max: maxAllowed
      };
      var center = this._clefMainLineStep(this.staff.getClef());
      var lineSpan = idx === 0 ? 1 : 2;
      var spanSteps = lineSpan * 2; // 1 staff line = 2 "steps"

      var min = Math.max(minAllowed, center - spanSteps);
      var max = Math.min(maxAllowed, center + spanSteps);
      return {
        min: min,
        max: max
      };
    }
  }, {
    key: "_isStepInInitialFixedRange",
    value: function _isStepInInitialFixedRange(step) {
      if (!Number.isFinite(step)) return false;
      var _this$_initialFixedSt = this._initialFixedStepBounds(),
        min = _this$_initialFixedSt.min,
        max = _this$_initialFixedSt.max;
      return step >= min && step <= max;
    }

    /**
     * Pick a random step for the *given* note (fixed note) that respects the selected range.
     * @returns {number}
     */
  }, {
    key: "_randomInitialFixedStep",
    value: function _randomInitialFixedStep() {
      var _this$_initialFixedSt2 = this._initialFixedStepBounds(),
        min = _this$_initialFixedSt2.min,
        max = _this$_initialFixedSt2.max;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ------------------------ hints ------------------------

    /**
     * Compute one hint note (legacy API).
     *
     * @returns {{step:number, accidentalClass?:string}|null}
     */
  }, {
    key: "_computeHintAnswer",
    value: function _computeHintAnswer() {
      return null; // subclasses override
    }

    /**
     * Compute one or more hint notes.
     *
     * Subclasses can override this to return multiple notes (e.g. triads).
     *
     * @returns {Array<{id?:string, step:number|null, accidentalClass?:string|null}>}
     */
  }, {
    key: "_computeHintAnswers",
    value: function _computeHintAnswers() {
      var single = this._computeHintAnswer();
      return single ? [single] : [];
    }
  }, {
    key: "_removeAllHintNotes",
    value: function _removeAllHintNotes() {
      var _this13 = this;
      var ids = Array.isArray(this._activeHintIds) ? this._activeHintIds : [];
      ids.forEach(function (id) {
        return _this13.staff.removeNote(id);
      });
      this._activeHintIds = [];
    }
  }, {
    key: "_randomFreeStep",
    value: function _randomFreeStep() {
      var min = this.staff.minStepAllowed();
      var max = this.staff.maxStepAllowed();
      for (var tries = 0; tries < 50; tries++) {
        var step = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!this.staff._isStepOccupied(step, null)) return step;
      }
      return null;
    }
  }, {
    key: "_attachHintBlinkRemoval",
    value: function _attachHintBlinkRemoval(noteId) {
      var _this14 = this;
      var $note = this.$staffEl.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      if (!$note.length) return;
      $note.off("animationend.hint.".concat(noteId, " webkitAnimationEnd.hint.").concat(noteId)).one("animationend.hint.".concat(noteId, " webkitAnimationEnd.hint.").concat(noteId), function () {
        _this14.staff.removeNote(noteId);
        _this14._activeHintIds = (_this14._activeHintIds || []).filter(function (x) {
          return x !== noteId;
        });
      });
    }
  }, {
    key: "_showHintNote",
    value: function _showHintNote() {
      this._removeAllHintNotes();
      var answers = this._computeHintAnswers();
      var specs = Array.isArray(answers) && answers.length ? answers : [{
        step: null,
        accidentalClass: null
      }];
      this._activeHintIds = [];
      for (var i = 0; i < specs.length; i++) {
        var ans = specs[i] || {};
        var id = ans.id || (specs.length === 1 ? "hint" : "hint".concat(i + 1));
        var step = Number.isFinite(ans.step) ? Number(ans.step) : null;
        var accidentalClass = ans.accidentalClass || null;
        if (step == null) step = this._randomFreeStep();
        if (step == null) continue;
        var createdId = this.staff.addNote({
          id: id,
          step: step,
          className: "hint blink",
          allowOccupied: true,
          skipResolve: true
        });
        if (!createdId) continue;
        this._activeHintIds.push(id);
        if (accidentalClass) {
          this.staff.attachAccidentalToNote(id, accidentalClass);
          this.$staffEl.find(".accidental[data-for-note-id=\"".concat(id, "\"]")).addClass("hint blink");
        }
        this.$staffEl.find(".ledger[data-for-note-id=\"".concat(id, "\"]")).addClass("hint blink");
        this._attachHintBlinkRemoval(id);
      }
    }

    // ------------------------ scoring / progress ------------------------
  }, {
    key: "_isPracticeMode",
    value: function _isPracticeMode() {
      var v = this.opts.practiceMode;
      return v === true || String(v || "").trim().toLowerCase() === "on";
    }
  }, {
    key: "_syncPracticeUi",
    value: function _syncPracticeUi() {
      var practice = this._isPracticeMode();
      var $score = $("#score");
      if (practice) {
        $score.hide();
        this.$progressBar.parent().addClass("opacity-1");
      } else {
        $score.show();
        this.$progressBar.parent().removeClass("opacity-1");
      }
    }
  }, {
    key: "_successAnimation",
    value: function _successAnimation() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        isBonus = _ref2.isBonus;
      if (isBonus) this._playSuccessSfxBonus();else this._playSuccessSfxBasic();
      this.$helpBtn.hide();
      this.$accidentals.addClass("invisible");
      this.$feedback.find(".message span").text((0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickOne)(this.successPhrases));
      this.$feedback.stop(true, true).fadeIn("fast");
    }
  }, {
    key: "_showIncrement",
    value: function _showIncrement(earned) {
      var $inc = this.$increment;
      if (!$inc || !$inc.length) return;
      $inc.stop(true, true);
      $inc.text("+".concat(earned)).show();
      if ($inc.animateCSS) {
        $inc.animateCSS("fadeOutUp").then(function () {
          return $inc.hide();
        });
      } else {
        setTimeout(function () {
          return $inc.hide();
        }, 800);
      }
    }
  }, {
    key: "_showBonusBadge",
    value: function _showBonusBadge(bonusAmount) {
      if (!this.$bonusBadge || !this.$bonusBadge.length) return;
      if (!bonusAmount || bonusAmount <= 0) {
        this.$bonusBadge.hide();
        return;
      }
      this.$bonusBadge.text("+".concat(bonusAmount, " BONUS")).show();
      if (this.$bonusBadge.animateCSS) {
        this.$bonusBadge.animateCSS("tada");
      }
    }
  }, {
    key: "_awardPointsForCorrect",
    value: function _awardPointsForCorrect() {
      if (this._isPracticeMode()) {
        this.$points.text("0");
        this._showBonusBadge(0);
        return {
          earned: 0,
          firstTry: false,
          bonusEarned: 0
        };
      }
      if (this._usedHintThisRound) {
        this._showBonusBadge(0);
        return {
          earned: 0,
          firstTry: false,
          bonusEarned: 0
        };
      }
      var firstTry = !this._madeMistakeThisRound;
      var base = Number.isFinite(this.opts.basePoints) ? this.opts.basePoints : 1;
      var bonus = Number.isFinite(this.opts.firstTryBonus) ? this.opts.firstTryBonus : 0;
      var earned = firstTry ? base + bonus : base;
      var bonusEarned = firstTry ? bonus : 0;
      if (firstTry) {
        this._correctStreak += 1;
        if (this._correctStreak <= 1) {
          // eslint-disable-next-line no-console
          console.log("[BaseStaffGame] Correct answer. No streak yet.");
        } else {
          // eslint-disable-next-line no-console
          console.log("[BaseStaffGame] Streak ".concat(this._correctStreak, "x"));
        }
      }
      this.points += earned;
      this.$points.text(String(this.points));
      this._showBonusBadge(bonusEarned);
      return {
        earned: earned,
        firstTry: firstTry,
        bonusEarned: bonusEarned
      };
    }
  }, {
    key: "getCorrectStreak",
    value: function getCorrectStreak() {
      return Math.max(0, Number(this._correctStreak) || 0);
    }
  }, {
    key: "_resetProgress",
    value: function _resetProgress() {
      this._syncPracticeUi();
      this._correctStreak = 0;
      this._madeAnyMistake = false;
      this.$progressBar.data("progress", 0);
      this.$progressBar.css({
        width: "0%"
      });
      if (this._isPracticeMode()) this.$progressCounter.text("Practice");else this.$progressCounter.text("");
    }
  }, {
    key: "_updateProgressBar",
    value: function _updateProgressBar() {
      if (this._isPracticeMode()) {
        this.$progressBar.data("progress", 0);
        this.$progressBar.css({
          width: "0%"
        });
        this.$progressCounter.text("Practice");
        return 0;
      }
      var steps = Math.max(1, this.numOfChallenges || 1);
      var increment = 100 / steps;
      var current = parseFloat(this.$progressBar.data("progress")) || 0;
      current = Math.min(100, current + increment);
      this.$progressBar.data("progress", current);
      this.$progressBar.css({
        width: "".concat(current, "%")
      });
      var completed = Math.min(steps, Math.max(0, Math.round(current / increment)));
      this.$progressCounter.text("".concat(completed, " of ").concat(steps));
      return current;
    }
  }, {
    key: "_failAnimation",
    value: function _failAnimation($shakeTarget) {
      var _this15 = this;
      this._correctStreak = 0;
      this._playFailSfx();
      var $target = $shakeTarget || this.$checkWrap;
      $target.removeClass("animate__animated animate__shakeX");
      // eslint-disable-next-line no-unused-expressions
      $target[0] && $target[0].offsetWidth;
      $target.addClass("animate__animated animate__shakeX");
      $target.off("animationend._fail.".concat(this.ns, " webkitAnimationEnd._fail.").concat(this.ns, " oAnimationEnd._fail.").concat(this.ns, " MSAnimationEnd._fail.").concat(this.ns)).one("animationend._fail.".concat(this.ns, " webkitAnimationEnd._fail.").concat(this.ns, " oAnimationEnd._fail.").concat(this.ns, " MSAnimationEnd._fail.").concat(this.ns), function () {
        $target.removeClass("animate__animated animate__shakeX");
        _this15.$checkBtn.enable();
      });
    }
  }, {
    key: "_showFinalResults",
    value: function _showFinalResults() {
      var _this$_stats$checksTo,
        _this$_stats$checksCo,
        _this$_stats$finished,
        _this16 = this,
        _window;
      if (this._isPracticeMode()) return;
      var total = Math.max(0, (_this$_stats$checksTo = this._stats.checksTotal) !== null && _this$_stats$checksTo !== void 0 ? _this$_stats$checksTo : 0);
      var correct = Math.max(0, (_this$_stats$checksCo = this._stats.checksCorrect) !== null && _this$_stats$checksCo !== void 0 ? _this$_stats$checksCo : 0);
      var accuracy = total ? Math.round(correct / total * 100) : 0;
      var endMs = (_this$_stats$finished = this._stats.finishedAtMs) !== null && _this$_stats$finished !== void 0 ? _this$_stats$finished : Date.now();
      var totalSeconds = Math.max(0, Math.floor((endMs - PAGE_OPENED_AT_MS) / 1000));
      var perfectGame = total > 0 && !this._madeAnyMistake;
      var finalPoints = perfectGame ? this.points * 2 : this.points;
      if (perfectGame) {
        setTimeout(function () {
          var _this16$$doublePoints, _this16$$doublePoints2;
          (_this16$$doublePoints = _this16.$doublePoints) === null || _this16$$doublePoints === void 0 || (_this16$$doublePoints2 = _this16$$doublePoints.show) === null || _this16$$doublePoints2 === void 0 || _this16$$doublePoints2.call(_this16$$doublePoints);
          _this16._playPerfectGameBonusSfx();
        }, 1750);

        // eslint-disable-next-line no-console
        console.log("[BaseStaffGame] Perfect game! 2x bonus applied.", {
          basePoints: this.points,
          finalPoints: finalPoints
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("[BaseStaffGame] No perfect-game bonus.", {
          basePoints: this.points,
          finalPoints: finalPoints,
          madeAnyMistake: this._madeAnyMistake
        });
      }
      var CountUpCtor = (_window = window) === null || _window === void 0 || (_window = _window.CountUp) === null || _window === void 0 ? void 0 : _window.CountUp;
      var DURATION = 3.5;
      var mmss = function mmss(secs) {
        var v = Math.max(0, Math.floor(secs));
        var mm = String(Math.floor(v / 60)).padStart(2, "0");
        var ss = String(v % 60).padStart(2, "0");
        return "".concat(mm, ":").concat(ss);
      };
      var countTo = function countTo(selector, endVal) {
        var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var el = _this16.$finalOverlay.find(selector)[0];
        if (!el) return;
        var startCount = function startCount() {
          if (!CountUpCtor) {
            el.textContent = String(opts.formattingFn ? opts.formattingFn(endVal) : endVal) + (opts.suffix || "");
            return;
          }
          var c = new CountUpCtor(el, endVal, _objectSpread({
            duration: DURATION
          }, opts));
          if (!c.error) c.start();
        };
        var $box = $(el).closest("#metrics-boxes > div");
        var rawDelay = $box.length ? parseFloat($box[0].style.animationDelay || "0") : 0;
        var delayMs = Number.isFinite(rawDelay) ? Math.max(0, rawDelay) : 0;
        if (delayMs <= 0) {
          startCount();
          return;
        }
        var tid = setTimeout(startCount, delayMs + 40);
        _this16._finalCountupTimeouts.push(tid);
      };
      var $greeting = this.$finalOverlay.find("#result-greeting");
      var $greetingTitle = $greeting.find("h1");
      var $greetingSubtitle = $greeting.find("h6");
      var $resultImg = this.$finalOverlay.find("img").first();
      var defaultTitle = "Great job!";
      var defaultSubtitle = "It's not about getting the most points, but if it was...";
      if (accuracy < 50) {
        $greetingTitle.text("Keep going!");
        $greetingSubtitle.text("That round was tough, but your next one can be much better.");
        if ($resultImg.length) {
          var cur = String($resultImg.attr("src") || "");
          if (cur.includes("trophy.svg")) {
            $resultImg.attr("src", cur.replace("trophy.svg", "plant.svg"));
          }
        }
      } else {
        $greetingTitle.text(defaultTitle);
        $greetingSubtitle.text(defaultSubtitle);
        if ($resultImg.length) {
          var _cur = String($resultImg.attr("src") || "");
          if (_cur.includes("plant.svg")) {
            $resultImg.attr("src", _cur.replace("plant.svg", "trophy.svg"));
          }
        }
      }
      this.$finalOverlay.show();
      this._animateFinalMetricsWithSfx();
      this._clearFinalCountupTimers();
      countTo('span[name="rounds"]', this.numOfChallenges);
      countTo('span[name="score"]', finalPoints);
      countTo('span[name="accuracy"]', accuracy, {
        suffix: "%"
      });
      countTo('span[name="duration"]', totalSeconds, {
        formattingFn: mmss
      });
      this._playFinalSfx();
    }
  }]);
}();
_defineProperty(BaseStaffGame, "MIN_CHALLENGES", 2);
_defineProperty(BaseStaffGame, "MAX_CHALLENGES", 12);

/***/ },

/***/ "./resources/js/music/games/dictation/DictationChallenge.js"
/*!******************************************************************!*\
  !*** ./resources/js/music/games/dictation/DictationChallenge.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DictationChallenge: () => (/* binding */ DictationChallenge)
/* harmony export */ });
/* harmony import */ var _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/BaseStaffGame.js */ "./resources/js/music/games/base/BaseStaffGame.js");
/* harmony import */ var _staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../staff/staffUtils.js */ "./resources/js/music/staff/staffUtils.js");
/* harmony import */ var _shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/challengeUtils.js */ "./resources/js/music/games/shared/challengeUtils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// resources/js/music/games/dictation/DictationChallenge.dev.js




/**
 * Interval Dictation (dev)
 *
 * Rules:
 * - Staff note sounds are always disabled (no click/drag audio).
 * - SFX follow the global sound toggle (BaseStaffGame / opts.sound).
 * - Dictation playback always plays (ignores opts.sound) via its own synth.
 * - The player enters exactly ONE note (the heard note) above/below the fixed note.
 * - Answer checking is pitch-only (enharmonic spellings are accepted).
 */
var DictationChallenge = /*#__PURE__*/function (_BaseStaffGame) {
  function DictationChallenge() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, DictationChallenge);
    var defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2,
      namespace: "dictationChallenge",
      // Dictation: one user note (the heard note).
      maxUserNotes: 1,
      // UI gating: show Check after 1 user note.
      instructionsAfterUserNotes: 1,
      checkAfterUserNotes: 1
    };
    var merged = _objectSpread(_objectSpread(_objectSpread({}, defaults), options), {}, {
      accidentalWeights: _objectSpread(_objectSpread({}, defaults.accidentalWeights || {}), options.accidentalWeights || {}),
      intervals: Array.isArray(options.intervals) && options.intervals.length ? options.intervals.slice() : DictationChallenge.INTERVALS_DEFAULT.slice()
    });
    var clefPool = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_2__.normalizeClefPool)(merged.clefs != null ? merged.clefs : merged.clef);
    _this = _callSuper(this, DictationChallenge, [_objectSpread(_objectSpread({}, merged), {}, {
      initialClef: clefPool && clefPool[0] ? clefPool[0] : "treble"
    })]);
    _this._clefPool = clefPool;

    // Dictation state
    _this._expectedFirst = null; // { step, accidentalClass }
    _this._expectedSecond = null; // { step, accidentalClass, accOff, midi }

    // Dictation playback
    _this._dictationTimeouts = [];
    _this._dictSynth = null;
    _this._dictAudioReady = false;

    // Play/Stop UI
    _this.$playWrap = null;
    _this.$playPlayBtn = null;
    _this.$playStopBtn = null;
    return _this;
  }

  // ------------------------ lifecycle ------------------------
  _inherits(DictationChallenge, _BaseStaffGame);
  return _createClass(DictationChallenge, [{
    key: "start",
    value: function start() {
      var _this2 = this;
      _superPropGet(DictationChallenge, "start", this, 3)([]);

      // Dictation: never play sounds for user-added/moved staff notes.
      if (this.staff && typeof this.staff._soundEnabled === "function") {
        this.staff._soundEnabled = function () {
          return false;
        };
      }
      this.$playWrap = $("#play");
      this.$playPlayBtn = this.$playWrap.find('button[action="play"]');
      this.$playStopBtn = this.$playWrap.find('button[action="stop"]');
      this.$playPlayBtn.off("click.".concat(this.ns, "Play")).on("click.".concat(this.ns, "Play"), function (e) {
        e.preventDefault();
        _this2.playDictation();
      });
      this.$playStopBtn.off("click.".concat(this.ns, "Stop")).on("click.".concat(this.ns, "Stop"), function (e) {
        e.preventDefault();
        _this2._stopDictationPlayback();
        _this2._setPlayButtons(false);
      });

      // Ensure Play is shown on Continue (new round).
      $("#continue button").off("click.".concat(this.ns, "ShowPlay")).on("click.".concat(this.ns, "ShowPlay"), function () {
        var _this2$$playWrap;
        if ((_this2$$playWrap = _this2.$playWrap) !== null && _this2$$playWrap !== void 0 && _this2$$playWrap.length) _this2.$playWrap.show();
        _this2._setPlayButtons(false);
      });
      this._setPlayButtons(false);
    }

    // ------------------------ play/stop UI ------------------------
  }, {
    key: "_setPlayButtons",
    value: function _setPlayButtons(isPlaying) {
      var _this$$playPlayBtn, _this$$playStopBtn;
      if ((_this$$playPlayBtn = this.$playPlayBtn) !== null && _this$$playPlayBtn !== void 0 && _this$$playPlayBtn.length) this.$playPlayBtn.toggle(!isPlaying);
      if ((_this$$playStopBtn = this.$playStopBtn) !== null && _this$$playStopBtn !== void 0 && _this$$playStopBtn.length) this.$playStopBtn.toggle(!!isPlaying);
    }

    // ------------------------ dictation playback ------------------------
  }, {
    key: "playDictation",
    value: function playDictation() {
      var _this3 = this;
      if (!this._expectedFirst || !this._expectedSecond) return;
      this._stopDictationPlayback();
      this._setPlayButtons(true);
      var firstMidi = this.staff._stepToMidi(this._expectedFirst.step) + (this.staff._accidentalClassToOffset(this._expectedFirst.accidentalClass) || 0);

      // Sequence: first -> second -> first -> both together (1s spacing)
      this._playMidi(firstMidi, 0.6, 0.0);
      this._playMidi(this._expectedSecond.midi, 0.6, 1.0);
      this._playMidi(firstMidi, 0.6, 2.0);

      // Both together at t=3.0s (two trigger calls at same time).
      this._playMidi(firstMidi, 0.6, 3.0);
      this._playMidi(this._expectedSecond.midi, 0.6, 3.0);
      this._dictationTimeouts.push(setTimeout(function () {
        // eslint-disable-next-line no-console
        console.log("Dictation: user can now write the note on the staff.");
        _this3._setPlayButtons(false);
      }, 3000));
    }
  }, {
    key: "_stopDictationPlayback",
    value: function _stopDictationPlayback() {
      if (Array.isArray(this._dictationTimeouts)) {
        this._dictationTimeouts.forEach(function (t) {
          return clearTimeout(t);
        });
      }
      this._dictationTimeouts = [];
      if (this._dictSynth && this._dictSynth.dispose) {
        try {
          this._dictSynth.dispose();
        } catch (_) {}
      }
      this._dictSynth = null;
      this._dictAudioReady = false;
    }
  }, {
    key: "_ensureDictationAudio",
    value: function () {
      var _ensureDictationAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (window.Tone) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (!this._dictAudioReady) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              _context.n = 3;
              return Tone.start();
            case 3:
              // Poly synth so we can play two notes together.
              this._dictSynth = new Tone.PolySynth(Tone.Synth, {
                oscillator: {
                  type: "sine"
                },
                envelope: {
                  attack: 0.01,
                  decay: 0.08,
                  sustain: 0.35,
                  release: 0.25
                }
              }).toDestination();
              this._dictAudioReady = true;
            case 4:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _ensureDictationAudio() {
        return _ensureDictationAudio2.apply(this, arguments);
      }
      return _ensureDictationAudio;
    }()
  }, {
    key: "_playMidi",
    value: function _playMidi(midi, durSeconds, atSecondsFromNow) {
      var _this4 = this;
      if (!window.Tone) return;
      this._ensureDictationAudio().then(function () {
        if (!_this4._dictSynth) return;
        var now = Tone.now();
        var when = now + (Number(atSecondsFromNow) || 0);
        var dur = Number(durSeconds) || 0.6;
        _this4._dictSynth.triggerAttackRelease(Tone.Frequency(midi, "midi"), dur, when);
      });
    }

    // ------------------------ selection ------------------------
  }, {
    key: "_pickInterval",
    value: function _pickInterval() {
      var pool = Array.isArray(this.opts.intervals) && this.opts.intervals.length ? this.opts.intervals : DictationChallenge.INTERVALS_DEFAULT;
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }, {
    key: "_pickFixedNote",
    value: function _pickFixedNote() {
      var fixedList = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.toArrayMaybe)(this.opts.fixedNotes).filter(Boolean);
      if (fixedList.length) {
        var chosen = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickOne)(fixedList);
        return (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_2__.fixedNoteToStaffPosition)(this.staff, chosen);
      }
      var w = this.opts.accidentalWeights || {};
      var accidentalClass = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickWeighted)([{
        value: null,
        weight: Number(w.natural) || 0
      }, {
        value: "music-font__sharp",
        weight: Number(w.sharp) || 0
      }, {
        value: "music-font__flat",
        weight: Number(w.flat) || 0
      }]);
      return {
        step: this._randomInitialFixedStep(),
        accidentalClass: accidentalClass
      };
    }

    // ------------------------ interval math ------------------------
  }, {
    key: "_intervalSemitones",
    value: function _intervalSemitones(quality, simpleNum) {
      var baseMajorPerfect = {
        1: 0,
        2: 2,
        3: 4,
        4: 5,
        5: 7,
        6: 9,
        7: 11,
        8: 12
      }[simpleNum];
      if (baseMajorPerfect == null) return null;
      var isPerfectClass = simpleNum === 1 || simpleNum === 4 || simpleNum === 5 || simpleNum === 8;
      var q = String(quality || "").trim();
      if (isPerfectClass) {
        if (q === "P") return baseMajorPerfect;
        if (/^A+$/.test(q)) return baseMajorPerfect + q.length;
        if (/^d+$/.test(q)) return baseMajorPerfect - q.length;
        return null;
      }
      if (q === "M") return baseMajorPerfect;
      if (q === "m") return baseMajorPerfect - 1;
      if (/^A+$/.test(q)) return baseMajorPerfect + q.length;
      if (/^d+$/.test(q)) return baseMajorPerfect - (q.length + 1);
      return null;
    }
  }, {
    key: "_computeSecondFromFixed",
    value: function _computeSecondFromFixed(intervalAbbr, fixedStep, fixedMidi) {
      var _this5 = this;
      var parsed = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_2__.parseIntervalAbbr)(intervalAbbr);
      if (!parsed || !Number.isFinite(parsed.number) || parsed.number < 1) return null;
      var diatonicSteps = parsed.number - 1;
      var simpleNum = (parsed.number - 1) % 7 + 1;
      var octaves = Math.floor((parsed.number - 1) / 7);
      var baseSemiSimple = this._intervalSemitones(parsed.quality, simpleNum);
      if (baseSemiSimple == null) return null;
      var semitones = baseSemiSimple + 12 * octaves;
      var minStep = this.staff.minStepAllowed();
      var maxStep = this.staff.maxStepAllowed();
      var build = function build(dir) {
        var targetStep = fixedStep + dir * diatonicSteps;
        if (targetStep < minStep || targetStep > maxStep) return null;
        var targetMidi = fixedMidi + dir * semitones;
        var naturalTargetMidi = _this5.staff._stepToMidi(targetStep);
        var off = targetMidi - naturalTargetMidi;

        // Limit to supported accidentals.
        if (off < -2 || off > 2) return null;
        var accidentalClass = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_2__.accidentalClassFromOffset)(off);
        if (!accidentalClass) return null;
        return {
          step: targetStep,
          accidentalClass: accidentalClass,
          accOff: off,
          midi: targetMidi
        };
      };
      var up = build(+1);
      var down = build(-1);
      if (up && down) return (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickOne)([up, down]);
      return up || down || null;
    }

    // ------------------------ game flow ------------------------
  }, {
    key: "newChallenge",
    value: function newChallenge() {
      var _this$$playWrap, _this$$doublePoints, _this$$doublePoints$h;
      if ((_this$$playWrap = this.$playWrap) !== null && _this$$playWrap !== void 0 && _this$$playWrap.length) this.$playWrap.show();
      this._setPlayButtons(false);
      this.$helpBtn.hide();
      this._fixedState = null;
      this._expectedFirst = null;
      this._expectedSecond = null;
      var clef = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_2__.pickChallengeClef)(this._clefPool);
      if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);
      this._madeMistakeThisRound = false;
      this._usedHintThisRound = false;
      this.$bonusBadge.hide();
      (_this$$doublePoints = this.$doublePoints) === null || _this$$doublePoints === void 0 || (_this$$doublePoints$h = _this$$doublePoints.hide) === null || _this$$doublePoints$h === void 0 || _this$$doublePoints$h.call(_this$$doublePoints);
      var interval = this._pickInterval();

      // Retry until we find a playable pair within staff bounds/accidentals.
      var fixed = null;
      var second = null;
      for (var i = 0; i < 40; i += 1) {
        fixed = this._pickFixedNote();
        if (!fixed) continue;
        var fixedAccOff = this.staff._accidentalClassToOffset(fixed.accidentalClass) || 0;
        var fixedMidi = this.staff._stepToMidi(fixed.step) + fixedAccOff;
        second = this._computeSecondFromFixed(interval, fixed.step, fixedMidi);
        if (second) break;
      }
      if (!fixed || !second) return;
      this.staff.clearNotes();
      this.$accidentals.removeClass("invisible");
      this.$feedback.hide();

      // Show the initial note immediately (suppress natural glyph).
      var fixedAcc = fixed.accidentalClass === "music-font__natural" ? null : fixed.accidentalClass || null;
      var fixedId = this.staff.addFixedNote({
        step: fixed.step,
        accidentalClass: fixedAcc
      });
      if (fixedId) this.staff._emitNoteState(fixedId, "fixed");
      this._expectedFirst = {
        step: fixed.step,
        accidentalClass: fixed.accidentalClass || null
      };
      this._expectedSecond = second;
      $("#continue").hide();
    }

    // ------------------------ notes + hint ------------------------
  }, {
    key: "_notesOnStaffOrdered",
    value: function _notesOnStaffOrdered() {
      var _this6 = this;
      var $notes = this.$staffEl.find(".note").not(".preview").not(".hint");
      var notes = $notes.toArray().map(function (el) {
        var id = el.getAttribute("data-note-id");
        var step = _this6.staff._stepOfNoteEl(el);
        var accCls = _this6.staff._getAttachedAccidentalClass(id);
        var accOff = _this6.staff._accidentalClassToOffset(accCls) || 0;
        var fixed = el.classList.contains("fixed");
        return {
          id: id,
          step: step,
          accOff: accOff,
          fixed: fixed
        };
      });
      notes.sort(function (a, b) {
        return a.step - b.step;
      });
      return notes;
    }
  }, {
    key: "_computeHintAnswer",
    value: function _computeHintAnswer() {
      if (!this._expectedSecond) return null;
      return {
        step: this._expectedSecond.step,
        accidentalClass: this._expectedSecond.accidentalClass || null
      };
    }

    // ------------------------ evaluation ------------------------
  }, {
    key: "_onCheck",
    value: function _onCheck() {
      var _this7 = this;
      this._stopDictationPlayback();
      this._setPlayButtons(false);
      var notes = this._notesOnStaffOrdered();
      this.$checkBtn.disable();
      this._stats.checksTotal += 1;
      if (!this._expectedSecond) return;

      // fixed + 1 user note
      if (notes.length !== 2) {
        this._madeAnyMistake = true;
        this._madeMistakeThisRound = true;
        this._failAnimation(this.$checkWrap);
        this.$helpBtn.show();
        return;
      }
      var user = notes.find(function (n) {
        return !n.fixed;
      }) || null;
      if (!user) {
        this._madeAnyMistake = true;
        this._madeMistakeThisRound = true;
        this._failAnimation(this.$checkWrap);
        this.$helpBtn.show();
        return;
      }

      // Pitch-only correctness (enharmonics accepted).
      var userMidi = this.staff._stepToMidi(user.step) + (user.accOff || 0);
      var ok = userMidi === this._expectedSecond.midi;
      if (ok) {
        var _this$$playWrap2;
        this._stats.checksCorrect += 1;
        this._pauseGameTimer();
        var _this$_awardPointsFor = this._awardPointsForCorrect(),
          earned = _this$_awardPointsFor.earned,
          bonusEarned = _this$_awardPointsFor.bonusEarned;
        this._successAnimation({
          isBonus: bonusEarned > 0
        });
        if ((_this$$playWrap2 = this.$playWrap) !== null && _this$$playWrap2 !== void 0 && _this$$playWrap2.length) this.$playWrap.hide();
        $("#score").animateCSS && $("#score").animateCSS("heartBeat");
        if (earned > 0) this._showIncrement(earned);
        if (this._updateProgressBar() >= 100) {
          this._stats.finishedAtMs = Date.now();
          this.$checkBtn.text('Final results, let\'s see…');
          setTimeout(function () {
            return _this7._showFinalResults();
          }, 1600);
        } else {
          $("#check").hide();
          $("#continue").show();
        }
      } else {
        this._madeAnyMistake = true;
        this._madeMistakeThisRound = true;
        this._failAnimation(this.$checkWrap);
        this.$helpBtn.show();
      }
    }
  }]);
}(_base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame);
_defineProperty(DictationChallenge, "INTERVALS_DEFAULT", ["M2", "m3", "M3", "P5", "P8"]);

/***/ },

/***/ "./resources/js/music/games/shared/challengeUtils.js"
/*!***********************************************************!*\
  !*** ./resources/js/music/games/shared/challengeUtils.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   accidentalClassFromOffset: () => (/* binding */ accidentalClassFromOffset),
/* harmony export */   fixedNoteToStaffPosition: () => (/* binding */ fixedNoteToStaffPosition),
/* harmony export */   normalizeClefPool: () => (/* binding */ normalizeClefPool),
/* harmony export */   parseIntervalAbbr: () => (/* binding */ parseIntervalAbbr),
/* harmony export */   parsePitch: () => (/* binding */ parsePitch),
/* harmony export */   pickChallengeClef: () => (/* binding */ pickChallengeClef)
/* harmony export */ });
/* harmony import */ var _staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../staff/staffUtils.js */ "./resources/js/music/staff/staffUtils.js");

function normalizeClefPool(clefsOrSingle) {
  var raw = Array.isArray(clefsOrSingle) ? clefsOrSingle : clefsOrSingle != null ? [clefsOrSingle] : ["treble", "bass"];
  var normalized = raw.map(function (c) {
    return (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.normalizeClef)(c);
  }).filter(Boolean);
  var uniq = [];
  for (var i = 0; i < normalized.length; i += 1) {
    if (!uniq.includes(normalized[i])) uniq.push(normalized[i]);
  }
  return uniq.length ? uniq : ["treble", "bass"];
}
function pickChallengeClef(clefPool) {
  var pool = Array.isArray(clefPool) && clefPool.length ? clefPool : ["treble", "bass"];
  if (pool.length === 1) return pool[0];
  return pool[Math.floor(Math.random() * pool.length)];
}
function accidentalClassFromOffset(off) {
  if (off === 2) return "music-font__doublesharp";
  if (off === 1) return "music-font__sharp";
  if (off === 0) return "music-font__natural";
  if (off === -1) return "music-font__flat";
  if (off === -2) return "music-font__doubleflat";
  return null;
}
function parseIntervalAbbr(abbr) {
  var s = String(abbr || "").trim();
  var m = s.match(/^([PMAmd]+)(\d+)$/);
  if (!m) return null;
  return {
    quality: m[1],
    number: parseInt(m[2], 10)
  };
}
function parsePitch(pitch) {
  var s = String(pitch || "").trim();
  var m = s.match(/^([A-Ga-g])((?:#{1,2})|(?:b{1,2})|)?(\d+)$/);
  if (!m) return null;
  var letter = m[1].toUpperCase();
  var acc = m[2] || "";
  var octave = parseInt(m[3], 10);
  var baseSemitoneFromC = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11
  }[letter];
  var accOffset = acc === "##" ? 2 : acc === "#" ? 1 : acc === "bb" ? -2 : acc === "b" ? -1 : 0;
  var accidentalClass = accidentalClassFromOffset(accOffset);
  var midi = 12 * (octave + 1) + baseSemitoneFromC + accOffset;
  return {
    midi: midi,
    accOffset: accOffset,
    accidentalClass: accidentalClass
  };
}
function fixedNoteToStaffPosition(staff, noteStr) {
  var parsed = parsePitch(noteStr);
  if (!parsed) return null;
  var midi = parsed.midi,
    accOffset = parsed.accOffset,
    accidentalClass = parsed.accidentalClass;
  for (var step = staff.minStepAllowed(); step <= staff.maxStepAllowed(); step += 1) {
    var baseMidi = staff._stepToMidi(step);
    if (baseMidi + accOffset === midi) return {
      step: step,
      accidentalClass: accidentalClass
    };
  }
  var best = null;
  for (var _step = staff.minStepAllowed(); _step <= staff.maxStepAllowed(); _step += 1) {
    var _baseMidi = staff._stepToMidi(_step);
    var dist = Math.abs(_baseMidi + accOffset - midi);
    if (!best || dist < best.dist) best = {
      step: _step,
      dist: dist
    };
  }
  return best ? {
    step: best.step,
    accidentalClass: accidentalClass
  } : null;
}

/***/ },

/***/ "./resources/js/music/staff/Staff.js"
/*!*******************************************!*\
  !*** ./resources/js/music/staff/Staff.js ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Staff: () => (/* binding */ Staff)
/* harmony export */ });
/* harmony import */ var _staffUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./staffUtils.js */ "./resources/js/music/staff/staffUtils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


/**
 * Staff engine: draws staff, manages note interactions, emits events.
 * Requires: jQuery, jQuery UI (draggable/droppable), optional Tone.js.
 */
var Staff = /*#__PURE__*/function () {
  function Staff($el, opts) {
    _classCallCheck(this, Staff);
    this.$el = $el;
    var css = getComputedStyle($el[0]);
    this.opts = $.extend({
      paddingX: (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.pxFromCss)(css, "--staff-padding-x", 20),
      lineGap: (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.pxFromCss)(css, "--staff-line-gap", 16),
      lineThickness: (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.pxFromCss)(css, "--staff-line-thickness", 3),
      noteOverlapGap: (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.pxFromCss)(css, "--note-overlap-gap", -6),
      noteIdPrefix: "n",
      /** If you want default clef URLs, pass them in from page/game:
       *  clefUrls: { treble,bass,alto,tenor }
       */
      clefUrls: null,
      clef: null,
      clefUrl: null,
      autoClef: true,
      maxLedgerAbove: 2,
      maxLedgerBelow: 2,
      accidentalTopPx: 20,
      accidentalGapPx: 16,
      getMaxUserNotes: function getMaxUserNotes() {
        return Infinity;
      },
      sound: true,
      accSnapMaxPx: (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.pxFromCss)(css, "--staff-line-gap", 25) * 1.2
    }, opts || {});
    this.opts.clef = this.opts.clef == null ? null : (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.normalizeClef)(this.opts.clef);
    if (this.opts.clef && !this.opts.clefUrl) {
      this.opts.clefUrl = this._clefUrlFor(this.opts.clef);
    }
    this.opts.stepSize = this.opts.lineGap / 2;
    this.$el.css("position", "relative");
    this._idCounter = 1;
    this._drag = {
      isDragging: false,
      movedPx: 0,
      startPageY: 0,
      noteId: null,
      thresholdPx: 5,
      swallowClick: false,
      startStep: null,
      lastTargetStep: null,
      lastSoundStep: null,
      dropOnOccupied: false,
      outOfRange: false
    };
    this._previewState = {
      active: false,
      step: null
    };
    this._preview = null;
    this._previewStep = null;
    this._audioReady = false;
    this._synth = null;
    this._accDragSound = {
      noteId: null,
      step: null,
      toolType: null,
      prospectiveCls: null
    };
    this._accSnap = {
      noteId: null,
      dist: null,
      localY: null
    };
    this._suppressNextClick = {
      noteId: null,
      until: 0
    };
    this._applyClefCssVars(this.opts.clef);
    this._computeLayout();
    this._drawLines();
    if (this.opts.autoClef && !this.opts.clef) {
      this.setClef("treble");
    } else if (this.opts.clef) {
      this._applyClefCssVars(this.opts.clef);
      this.relayout();
    }
  }
  return _createClass(Staff, [{
    key: "_clefUrlFor",
    value: function _clefUrlFor(clef) {
      var c = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.normalizeClef)(clef);
      if (!c) return null;
      var urls = this.opts.clefUrls || {};
      return urls[c] || urls.treble || null;
    }
  }, {
    key: "setSoundEnabled",
    value: function setSoundEnabled(enabled) {
      this.opts.sound = !!enabled;
      if (!this.opts.sound && window.Tone) {
        try {
          Tone.Transport && Tone.Transport.stop();
        } catch (_) {}
        try {
          Tone.context && Tone.context.suspend && Tone.context.suspend();
        } catch (_) {}
        try {
          this._synth && this._synth.releaseAll && this._synth.releaseAll();
        } catch (_) {}
      }
    }
  }, {
    key: "isSoundEnabled",
    value: function isSoundEnabled() {
      return !!this.opts.sound;
    }
  }, {
    key: "_soundEnabled",
    value: function _soundEnabled() {
      return !!this.opts.sound;
    }
  }, {
    key: "_applyClefCssVars",
    value: function _applyClefCssVars(clef) {
      var c = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.normalizeClef)(clef);
      var vars = _staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.CLEF_LAYOUT_VARS[c] || _staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.CLEF_LAYOUT_VARS.treble;
      var el = this.$el[0];
      Object.keys(vars).forEach(function (k) {
        return el.style.setProperty(k, vars[k]);
      });
    }
  }, {
    key: "setClef",
    value: function setClef(clef) {
      this.opts.clef = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.normalizeClef)(clef);
      this.opts.clefUrl = this._clefUrlFor(this.opts.clef);
      this._applyClefCssVars(this.opts.clef);
      this.relayout();
    }
  }, {
    key: "getClef",
    value: function getClef() {
      return this.opts.clef || "treble";
    }
  }, {
    key: "_maxUserNotes",
    value: function _maxUserNotes() {
      var v = this.opts.getMaxUserNotes ? this.opts.getMaxUserNotes() : Infinity;
      return Number.isFinite(v) ? v : Infinity;
    }
  }, {
    key: "_userNoteCount",
    value: function _userNoteCount() {
      return this.$el.find(".note").not(".fixed").not(".preview").not(".hint").length;
    }
  }, {
    key: "_computeLayout",
    value: function _computeLayout() {
      var h = this.$el.height();
      var staffHeight = this.opts.lineGap * 4;
      var topLineY = Math.round((h - staffHeight) / 2);
      this.opts.bottomLineY = topLineY + staffHeight;
    }
  }, {
    key: "_drawLines",
    value: function _drawLines() {
      this.$el.find(".staff-line, .staff-clef").remove();
      for (var i = 0; i < 5; i++) {
        var y = this.opts.bottomLineY - (4 - i) * this.opts.lineGap;
        $('<div class="staff-line"></div>').css({
          top: "".concat(y, "px")
        }).appendTo(this.$el);
      }
      this._drawClef();
    }
  }, {
    key: "_drawClef",
    value: function _drawClef() {
      if (!this.opts.clefUrl) return;
      var clef = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.normalizeClef)(this.opts.clef);
      $('<img alt="">').addClass("staff-clef").addClass("".concat(clef, "-clef")).attr("src", this.opts.clefUrl).appendTo(this.$el);
    }
  }, {
    key: "relayout",
    value: function relayout() {
      this._computeLayout();
      this._drawLines();
      this._resolveNoteOverlaps();
      this._repositionAllAccidentals();
    }
  }, {
    key: "centerX",
    value: function centerX() {
      return this.$el.width() / 2;
    }
  }, {
    key: "stepToY",
    value: function stepToY(step) {
      return this.opts.bottomLineY - step * this.opts.stepSize;
    }
  }, {
    key: "yToStep",
    value: function yToStep(y) {
      return Math.round((this.opts.bottomLineY - y) / this.opts.stepSize);
    }
  }, {
    key: "_pageYToLocalY",
    value: function _pageYToLocalY(pageY) {
      return pageY - this.$el.offset().top;
    }
  }, {
    key: "minStepAllowed",
    value: function minStepAllowed() {
      return 0 - this.opts.maxLedgerBelow * 2;
    }
  }, {
    key: "maxStepAllowed",
    value: function maxStepAllowed() {
      return 8 + this.opts.maxLedgerAbove * 2;
    }
  }, {
    key: "_isStepAllowed",
    value: function _isStepAllowed(step) {
      return step >= this.minStepAllowed() && step <= this.maxStepAllowed();
    }
  }, {
    key: "_ledgerStepsFor",
    value: function _ledgerStepsFor(step) {
      var ledgers = [];
      var topMost = 8 + this.opts.maxLedgerAbove * 2;
      var bottomMost = 0 - this.opts.maxLedgerBelow * 2;
      if (step > 8) {
        var capped = Math.min(step, topMost);
        for (var s = 10; s <= capped; s += 2) ledgers.push(s);
      } else if (step < 0) {
        var _capped = Math.max(step, bottomMost);
        for (var _s = -2; _s >= _capped; _s -= 2) ledgers.push(_s);
      }
      return ledgers;
    }
  }, {
    key: "_renderLedgers",
    value: function _renderLedgers(id, x, step) {
      this.$el.find(".ledger[data-for-note-id=\"".concat(id, "\"]")).remove();
      var isDragging = this.$el.find(".note[data-note-id=\"".concat(id, "\"]")).hasClass("dragging");
      var steps = this._ledgerStepsFor(step);
      for (var i = 0; i < steps.length; i++) {
        var $l = $('<div class="ledger"></div>').attr("data-for-note-id", id).css({
          left: "".concat(x, "px"),
          top: "".concat(this.stepToY(steps[i]), "px")
        });
        if (isDragging) $l.addClass("dragging");
        $l.appendTo(this.$el);
      }
    }
  }, {
    key: "_previewLedgersClear",
    value: function _previewLedgersClear() {
      this.$el.find(".ledger.preview").remove();
    }
  }, {
    key: "_previewLedgersSet",
    value: function _previewLedgersSet(step) {
      this._previewLedgersClear();
      var x = this.centerX();
      var steps = this._ledgerStepsFor(step);
      for (var i = 0; i < steps.length; i++) {
        $('<div class="ledger preview"></div>').css({
          left: "".concat(x, "px"),
          top: "".concat(this.stepToY(steps[i]), "px")
        }).appendTo(this.$el);
      }
    }
  }, {
    key: "_stepOfNoteEl",
    value: function _stepOfNoteEl(el) {
      var topStr = el.style.top || window.getComputedStyle(el).top;
      return this.yToStep(parseFloat(topStr));
    }
  }, {
    key: "_isStepOccupied",
    value: function _isStepOccupied(step, excludeId) {
      var nodes = this.$el.find(".note").toArray();
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (!el) continue;
        var id = el.getAttribute("data-note-id");
        if (excludeId && id === excludeId) continue;
        if (this._stepOfNoteEl(el) === step) return true;
      }
      return false;
    }
  }, {
    key: "_getNoteIdAtStep",
    value: function _getNoteIdAtStep(step, excludeId) {
      var nodes = this.$el.find(".note").toArray();
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (!el) continue;
        var id = el.getAttribute("data-note-id");
        if (excludeId && id === excludeId) continue;
        if (this._stepOfNoteEl(el) === step) return id;
      }
      return null;
    }
  }, {
    key: "_isCenteredX",
    value: function _isCenteredX(noteId) {
      var $n = this.$el.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      if (!$n.length) return true;
      return Math.abs(parseFloat($n.css("left")) - this.centerX()) <= 0.5;
    }
  }, {
    key: "isNoteFixed",
    value: function isNoteFixed(noteId) {
      var $note = this.$el.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      return $note.length ? $note.hasClass("fixed") : false;
    }
  }, {
    key: "_nearestEditableNoteByLocalY",
    value: function _nearestEditableNoteByLocalY(localY) {
      var maxD = Number.isFinite(this.opts.accSnapMaxPx) ? this.opts.accSnapMaxPx : this.opts.lineGap * 1.2;
      var best = null;
      var nodes = this.$el.find(".note").not(".preview").toArray();
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var id = el.getAttribute("data-note-id");
        if (!id) continue;
        if ($(el).hasClass("fixed")) continue;
        var top = parseFloat(el.style.top || window.getComputedStyle(el).top);
        var d = Math.abs(top - localY);
        if (best == null || d < best.dist) best = {
          noteId: id,
          dist: d
        };
      }
      if (!best || best.dist > maxD) return null;
      return best;
    }
  }, {
    key: "_removeAccidentalForNote",
    value: function _removeAccidentalForNote(noteId) {
      this.$el.find(".accidental[data-for-note-id=\"".concat(noteId, "\"]")).remove();
    }
  }, {
    key: "_accidentalAnchorXForNote",
    value: function _accidentalAnchorXForNote(noteLeftPx) {
      var cx = this.centerX();
      var EPS = 0.5;
      if (Number.isFinite(noteLeftPx) && noteLeftPx > cx + EPS) return cx;
      return noteLeftPx;
    }
  }, {
    key: "_positionAccidentalForNote",
    value: function _positionAccidentalForNote(noteId) {
      var $note = this.$el.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      var $acc = this.$el.find(".accidental[data-for-note-id=\"".concat(noteId, "\"]"));
      if (!$note.length || !$acc.length) return;
      var noteLeft = parseFloat($note.css("left"));
      var noteTop = parseFloat($note.css("top"));
      var anchorX = this._accidentalAnchorXForNote(noteLeft);
      $acc.css({
        left: "".concat(anchorX - this.opts.accidentalGapPx, "px"),
        top: "".concat(noteTop - this.opts.accidentalTopPx, "px")
      });
    }
  }, {
    key: "_rectsOverlap",
    value: function _rectsOverlap(a, b) {
      return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
    }
  }, {
    key: "_repositionAllAccidentals",
    value: function _repositionAllAccidentals() {
      var _this = this;
      this.$el.find(".accidental").each(function (_, node) {
        var id = node.getAttribute("data-for-note-id");
        if (id) _this._positionAccidentalForNote(id);
      });
      var noteEls = this.$el.find(".note").not(".preview").toArray();
      var stepToNoteId = {};
      for (var i = 0; i < noteEls.length; i++) {
        var el = noteEls[i];
        var id = el.getAttribute("data-note-id");
        if (!id) continue;
        stepToNoteId[this._stepOfNoteEl(el)] = id;
      }
      var steps = Object.keys(stepToNoteId).map(function (s) {
        return parseInt(s, 10);
      }).sort(function (a, b) {
        return a - b;
      });
      for (var _i = 0; _i < steps.length; _i++) {
        var lowerStep = steps[_i];
        var upperStep = lowerStep + 1;
        var lowerId = stepToNoteId[lowerStep];
        var upperId = stepToNoteId[upperStep];
        if (!lowerId || !upperId) continue;
        var $lowerAcc = this.$el.find(".accidental[data-for-note-id=\"".concat(lowerId, "\"]"));
        var $upperAcc = this.$el.find(".accidental[data-for-note-id=\"".concat(upperId, "\"]"));
        if (!$lowerAcc.length || !$upperAcc.length) continue;
        var lowerRect = $lowerAcc[0].getBoundingClientRect();
        var upperRect = $upperAcc[0].getBoundingClientRect();
        if (!this._rectsOverlap(lowerRect, upperRect)) continue;
        var overlapPx = Math.max(0, upperRect.right - lowerRect.left);
        var padPx = -6;
        var curLeft = parseFloat($upperAcc.css("left"));
        if (!Number.isFinite(curLeft)) continue;
        $upperAcc.css("left", "".concat(curLeft - (overlapPx + padPx), "px"));
      }
    }
  }, {
    key: "_getAttachedAccidentalClass",
    value: function _getAttachedAccidentalClass(noteId) {
      var $acc = this.$el.find(".accidental[data-for-note-id=\"".concat(noteId, "\"]"));
      if (!$acc.length) return null;
      for (var i = 0; i < _staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.ACCIDENTAL_CLASSES.length; i++) {
        var cls = _staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.ACCIDENTAL_CLASSES[i];
        if ($acc.hasClass(cls)) return cls;
      }
      return null;
    }
  }, {
    key: "attachAccidentalToNote",
    value: function attachAccidentalToNote(noteId, accidentalClass) {
      if (!noteId || this.isNoteFixed(noteId)) return;
      this._removeAccidentalForNote(noteId);
      var $acc = $('<div class="accidental music-font"></div>').addClass(accidentalClass).attr("data-for-note-id", noteId);
      this.$el.append($acc);
      this._repositionAllAccidentals();
    }
  }, {
    key: "_hintIgnoredAccidental",
    value: function _hintIgnoredAccidental(noteId) {
      var $note = this.$el.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      if (!$note.length) return;
      $note.removeClass("animate__animated animate__headShake");
      void $note[0].offsetWidth;
      $note.addClass("animate__animated animate__headShake");
      $note.off("animationend._hint webkitAnimationEnd._hint oAnimationEnd._hint MSAnimationEnd._hint").one("animationend._hint webkitAnimationEnd._hint oAnimationEnd._hint MSAnimationEnd._hint", function () {
        $note.removeClass("animate__animated animate__headShake");
      });
    }
  }, {
    key: "applyAccidentalToolToNote",
    value: function applyAccidentalToolToNote(noteId, toolType) {
      if (!noteId || this.isNoteFixed(noteId)) return false;
      var currentCls = this._getAttachedAccidentalClass(noteId);
      if ((0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.isMaxedDouble)(currentCls, toolType)) {
        this._hintIgnoredAccidental(noteId);
        return false;
      }
      var nextCls = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.nextAccidentalClass)(currentCls, toolType);
      if (toolType === "natural" && currentCls === "music-font__natural") return false;
      if (nextCls === currentCls) return false;
      this.attachAccidentalToNote(noteId, nextCls);
      this._emitNoteState(noteId, "user");
      return true;
    }
  }, {
    key: "_ensureAudio",
    value: function () {
      var _ensureAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (this._soundEnabled()) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (!this._audioReady) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              if (window.Tone) {
                _context.n = 3;
                break;
              }
              return _context.a(2);
            case 3:
              _context.n = 4;
              return Tone.start();
            case 4:
              this._synth = new Tone.Synth({
                oscillator: {
                  type: "sine"
                },
                envelope: {
                  attack: 0.01,
                  decay: 0.08,
                  sustain: 0.6,
                  release: 0.12
                }
              }).toDestination();
              this._audioReady = true;
            case 5:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _ensureAudio() {
        return _ensureAudio2.apply(this, arguments);
      }
      return _ensureAudio;
    }()
  }, {
    key: "_stepToMidi",
    value: function _stepToMidi(step) {
      var diatonic = [0, 2, 4, 5, 7, 9, 11];
      var baseC;
      var baseIndex;
      switch (this.opts.clef) {
        case "bass":
          baseC = 36;
          baseIndex = 4;
          break;
        case "alto":
          baseC = 48;
          baseIndex = 3;
          break;
        case "tenor":
          baseC = 48;
          baseIndex = 1;
          break;
        case "treble":
        default:
          baseC = 60;
          baseIndex = 2;
          break;
      }
      var idx = baseIndex + step;
      var octaveShift = Math.floor(idx / 7);
      var noteIndex = (idx % 7 + 7) % 7;
      return baseC + diatonic[noteIndex] + octaveShift * 12;
    }
  }, {
    key: "_accidentalClassToOffset",
    value: function _accidentalClassToOffset(cls) {
      if (!cls) return 0;
      if (cls.includes("music-font__doublesharp")) return +2;
      if (cls.includes("music-font__sharp")) return +1;
      if (cls.includes("music-font__doubleflat")) return -2;
      if (cls.includes("music-font__flat")) return -1;
      return 0;
    }
  }, {
    key: "_emitNoteState",
    value: function _emitNoteState(noteId, source) {
      var $note = this.$el.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      if (!$note.length) return;
      var step = this.yToStep(parseFloat($note.css("top")));
      var accCls = this._getAttachedAccidentalClass(noteId);
      var accOff = this._accidentalClassToOffset(accCls);
      var midi = this._stepToMidi(step) + accOff;
      this.$el.trigger("staff:noteState", {
        noteId: noteId,
        step: step,
        accidentalClass: accCls,
        midi: midi,
        source: source || "unknown"
      });
    }
  }, {
    key: "_playStep",
    value: function () {
      var _playStep2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(step, accidentalOffset) {
        var midi;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(!this._soundEnabled() || !Number.isFinite(step))) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              _context2.n = 2;
              return this._ensureAudio();
            case 2:
              if (this._synth) {
                _context2.n = 3;
                break;
              }
              return _context2.a(2);
            case 3:
              midi = this._stepToMidi(step) + (accidentalOffset || 0);
              if (this._synth.triggerRelease) this._synth.triggerRelease();
              this._synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), 0.5);
            case 4:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _playStep(_x, _x2) {
        return _playStep2.apply(this, arguments);
      }
      return _playStep;
    }()
  }, {
    key: "setNoteFixed",
    value: function setNoteFixed(noteId, fixed) {
      var on = !!fixed;
      this.$el.find(".note[data-note-id=\"".concat(noteId, "\"]")).toggleClass("fixed", on);
      this.$el.find(".ledger[data-for-note-id=\"".concat(noteId, "\"]")).toggleClass("fixed", on);
      this.$el.find(".accidental[data-for-note-id=\"".concat(noteId, "\"]")).toggleClass("fixed", on);
    }
  }, {
    key: "addFixedNote",
    value: function addFixedNote(cfg) {
      var c = cfg || {};
      var id = this.addNote({
        step: c.step,
        y: c.y,
        x: c.x,
        id: c.id,
        ledger: c.ledger,
        className: c.className || ""
      });
      if (!id) return null;
      if (c.accidentalClass) this.attachAccidentalToNote(id, c.accidentalClass);
      this.setNoteFixed(id, true);
      return id;
    }
  }, {
    key: "clearNotes",
    value: function clearNotes() {
      this.$el.find(".note, .ledger, .accidental").remove();
      this._previewClear();
    }
  }, {
    key: "removeNote",
    value: function removeNote(id) {
      this.$el.find(".note[data-note-id=\"".concat(id, "\"]")).remove();
      this.$el.find(".ledger[data-for-note-id=\"".concat(id, "\"]")).remove();
      this._removeAccidentalForNote(id);
      this._resolveNoteOverlaps();
    }
  }, {
    key: "addNote",
    value: function addNote(cfg) {
      var c = cfg || {};
      var step = Number.isFinite(c.step) ? Number(c.step) : null;
      if (Number.isFinite(step) && !this._isStepAllowed(step)) return null;
      if (Number.isFinite(step) && !c.allowOccupied && this._isStepOccupied(step, null)) return null;
      var y = Number.isFinite(c.y) ? Number(c.y) : Number.isFinite(step) ? this.stepToY(step) : null;
      if (!Number.isFinite(y)) throw new Error("addNote: provide either y or step");
      var x = Number.isFinite(c.x) ? Number(c.x) : this.centerX();
      var id = c.id || "".concat(this.opts.noteIdPrefix).concat(this._idCounter++);
      var $note = $('<div class="note"><span class="lettername"></span></div>').attr("data-note-id", id).css({
        left: "".concat(x, "px"),
        top: "".concat(y, "px")
      });
      if (c.className) $note.addClass(c.className);
      this.$el.append($note);
      if (c.ledger === true || c.ledger !== false && Number.isFinite(step)) {
        this._renderLedgers(id, x, step);
      }
      if (!c.skipResolve) this._resolveNoteOverlaps();else this._repositionAllAccidentals();
      return id;
    }
  }, {
    key: "moveNote",
    value: function moveNote(id, pos) {
      var p = pos || {};
      var $note = this.$el.find(".note[data-note-id=\"".concat(id, "\"]"));
      if (!$note.length) return;
      var x = Number.isFinite(p.x) ? Number(p.x) : null;
      var step = Number.isFinite(p.step) ? Number(p.step) : null;
      if (Number.isFinite(step) && !this._isStepAllowed(step)) return;
      var y = Number.isFinite(p.y) ? Number(p.y) : Number.isFinite(step) ? this.stepToY(step) : null;
      if (Number.isFinite(x)) $note.css("left", "".concat(x, "px"));
      if (Number.isFinite(y)) $note.css("top", "".concat(y, "px"));
      if (Number.isFinite(step)) {
        var noteX = Number.isFinite(x) ? x : parseFloat($note.css("left"));
        this._renderLedgers(id, noteX, step);
      }
      this._repositionAllAccidentals();
    }
  }, {
    key: "_previewSet",
    value: function _previewSet(step) {
      if (!this._preview) this._preview = $('<div class="note preview"></div>').appendTo(this.$el);
      this._preview.css({
        left: "".concat(this.centerX(), "px"),
        top: "".concat(this.stepToY(step), "px")
      });
      this._previewStep = step;
      this._previewLedgersSet(step);
    }
  }, {
    key: "_previewClear",
    value: function _previewClear() {
      if (this._preview) {
        this._preview.remove();
        this._preview = null;
        this._previewStep = null;
      }
      this._previewLedgersClear();
    }
  }, {
    key: "_resolveNoteOverlaps",
    value: function _resolveNoteOverlaps() {
      var self = this;
      var GAP = this.opts.noteOverlapGap;
      var MAX_ITERS = 20;
      function notesArray() {
        return self.$el.find(".note").toArray().map(function (el) {
          var $el = $(el);
          return {
            el: el,
            $el: $el,
            step: self.yToStep(parseFloat($el.css("top")))
          };
        });
      }
      function noteByStep(list) {
        var map = {};
        for (var i = 0; i < list.length; i++) {
          var s = list[i].step;
          (map[s] || (map[s] = [])).push(list[i]);
        }
        return map;
      }
      function centerAll(list) {
        var cx = self.centerX();
        for (var i = 0; i < list.length; i++) {
          var id = list[i].$el.attr("data-note-id");
          self.moveNote(id, {
            x: cx,
            step: list[i].step
          });
          list[i]._shifted = false;
        }
      }
      function shiftUpperToTouch(upper, stepMap) {
        var upperRect = upper.el.getBoundingClientRect();
        var lowerEls = stepMap[upper.step - 1];
        if (!lowerEls || !lowerEls.length) return false;
        var lowerRect = lowerEls[0].el.getBoundingClientRect();
        if (!self._rectsOverlap(upperRect, lowerRect)) return false;
        var dx = lowerRect.right - upperRect.left + GAP;
        var id = upper.$el.attr("data-note-id");
        self.moveNote(id, {
          x: parseFloat(upper.$el.css("left")) + dx,
          step: upper.step
        });
        return true;
      }
      for (var iter = 0; iter < MAX_ITERS; iter++) {
        var list = notesArray();
        if (!list.length) return;
        centerAll(list);
        var stepMap = noteByStep(list);
        var steps = Object.keys(stepMap).map(function (s) {
          return parseInt(s, 10);
        }).sort(function (a, b) {
          return a - b;
        });
        var changed = false;
        for (var i = 0; i < steps.length; i++) {
          var s = steps[i];
          if (!stepMap[s] || !stepMap[s + 1]) continue;
          var lower = stepMap[s][0];
          var upper = stepMap[s + 1][0];
          if (!lower._shifted) {
            if (shiftUpperToTouch(upper, stepMap)) changed = true;
            upper._shifted = true;
          }
        }
        if (!changed) {
          self._repositionAllAccidentals();
          return;
        }
      }
      self._repositionAllAccidentals();
    }
  }, {
    key: "_setDraggingVisual",
    value: function _setDraggingVisual(noteId, on) {
      var $note = this.$el.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      var $ledgers = this.$el.find(".ledger[data-for-note-id=\"".concat(noteId, "\"]"));
      var $acc = this.$el.find(".accidental[data-for-note-id=\"".concat(noteId, "\"]"));
      $note.toggleClass("dragging", !!on);
      $ledgers.toggleClass("dragging", !!on);
      $acc.toggleClass("dragging", !!on);
    }
  }, {
    key: "_applyDraggedAdjacencyX",
    value: function _applyDraggedAdjacencyX(dragId) {
      var $drag = this.$el.find(".note[data-note-id=\"".concat(dragId, "\"]"));
      if (!$drag.length) return;
      var dragStep = this.yToStep(parseFloat($drag.css("top")));
      var center = this.centerX();
      var gap = this.opts.noteOverlapGap;
      this.moveNote(dragId, {
        x: center
      });
      var lowerId = this._getNoteIdAtStep(dragStep - 1, dragId);
      if (!lowerId) return;
      if (!this._isCenteredX(lowerId)) return;
      var $lower = this.$el.find(".note[data-note-id=\"".concat(lowerId, "\"]"));
      if (!$lower.length) return;
      var upperRect = $drag[0].getBoundingClientRect();
      var lowerRect = $lower[0].getBoundingClientRect();
      if (!this._rectsOverlap(upperRect, lowerRect)) return;
      var dx = lowerRect.right - upperRect.left + gap;
      this.moveNote(dragId, {
        x: center + dx
      });
    }
  }, {
    key: "enableGhostClickCreate",
    value: function enableGhostClickCreate() {
      var self = this;
      this.$el.off(".previewCreate");
      $(window).off("blur.previewCreate");
      this.$el.on("pointerdown.previewCreate", function (e) {
        if ($(e.target).closest(".note, .accidental").length) return;
        if (self._userNoteCount() >= self._maxUserNotes()) return;
        e.preventDefault();
        var _getPointerPageXY = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerPageXY)(e),
          pageY = _getPointerPageXY.y;
        var initialStep = self.yToStep(self._pageYToLocalY(pageY));
        if (!self._isStepAllowed(initialStep)) return;
        self._previewState.active = true;
        self._previewState.step = initialStep;
        self._previewSet(initialStep);
        if (self._soundEnabled()) self._ensureAudio();
        var pointerId = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerId)(e);
        if (this.setPointerCapture && pointerId != null) this.setPointerCapture(pointerId);
        self.$el.off("pointermove.previewCreate").on("pointermove.previewCreate", function (ev) {
          if (!self._previewState.active) return;
          if (self._userNoteCount() >= self._maxUserNotes()) {
            self._previewState.active = false;
            self._previewClear();
            self.$el.off("pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate");
            return;
          }
          var _getPointerPageXY2 = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerPageXY)(ev),
            py = _getPointerPageXY2.y;
          var s = self.yToStep(self._pageYToLocalY(py));
          if (!self._isStepAllowed(s)) return;
          self._previewState.step = s;
          self._previewSet(s);
        });
        self.$el.off("pointerup.previewCreate pointercancel.previewCreate").on("pointerup.previewCreate pointercancel.previewCreate", function () {
          if (!self._previewState.active) return;
          self._previewState.active = false;
          var finalStep = self._previewState.step;
          self._previewClear();
          self.$el.off("pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate");
          if (!self._isStepAllowed(finalStep)) return;
          if (self._isStepOccupied(finalStep, null)) return;
          if (self._userNoteCount() >= self._maxUserNotes()) return;
          var createdId = self.addNote({
            step: finalStep
          });
          if (createdId) {
            self.$el.trigger("staff:userNoteAdded", {
              noteId: createdId,
              step: finalStep
            });
            self._emitNoteState(createdId, "user");
            self._suppressNextClick.noteId = createdId;
            self._suppressNextClick.until = Date.now() + 700;
            self._playStep(finalStep, 0);
          }
        });
      });
      $(window).on("blur.previewCreate", function () {
        if (!self._previewState.active) return;
        self._previewState.active = false;
        self._previewClear();
        self.$el.off("pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate");
      });
    }
  }, {
    key: "enableNoteDragAndClickDelete",
    value: function enableNoteDragAndClickDelete() {
      var self = this;
      var d = this._drag;
      this.$el.off(".noteDrag");
      function startDragFromNoteEl(noteEl, e) {
        e.preventDefault();
        if ($(noteEl).hasClass("fixed")) return;
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();else e.stopPropagation();
        var pointerId = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerId)(e);
        var $note = $(noteEl);
        d.isDragging = false;
        d.movedPx = 0;
        d.startPageY = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerPageXY)(e).y;
        d.noteId = $note.attr("data-note-id");
        d.startStep = self.yToStep(parseFloat($note.css("top")));
        d.lastTargetStep = d.startStep;
        d.lastSoundStep = d.startStep;
        d.dropOnOccupied = false;
        d.outOfRange = false;
        self._setDraggingVisual(d.noteId, true);
        if (self._soundEnabled()) self._ensureAudio();
        var capEl = e.currentTarget && e.currentTarget.setPointerCapture ? e.currentTarget : null;
        if (capEl && pointerId != null) capEl.setPointerCapture(pointerId);
        self.$el.off("pointermove.noteDrag").on("pointermove.noteDrag", function (ev) {
          var evPointerId = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerId)(ev);
          if (pointerId != null && evPointerId != null && evPointerId !== pointerId) return;
          var py = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerPageXY)(ev).y;
          var dy = py - d.startPageY;
          d.movedPx = Math.max(d.movedPx, Math.abs(dy));
          if (!d.isDragging && d.movedPx >= d.thresholdPx) d.isDragging = true;
          if (!d.isDragging) return;
          var targetStep = self.yToStep(self._pageYToLocalY(py));
          if (!self._isStepAllowed(targetStep)) {
            d.outOfRange = true;
            return;
          }
          d.outOfRange = false;
          d.lastTargetStep = targetStep;
          self.moveNote(d.noteId, {
            step: targetStep
          });
          d.dropOnOccupied = self._isStepOccupied(targetStep, d.noteId);
          self._applyDraggedAdjacencyX(d.noteId);
          if (self._soundEnabled() && targetStep !== d.lastSoundStep) {
            d.lastSoundStep = targetStep;
            var accCls = self._getAttachedAccidentalClass(d.noteId);
            var accOff = self._accidentalClassToOffset(accCls);
            self._playStep(targetStep, accOff);
          }
        });
        self.$el.off("pointerup.noteDrag pointercancel.noteDrag").on("pointerup.noteDrag pointercancel.noteDrag", function (ev2) {
          var evPointerId = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerId)(ev2);
          if (pointerId != null && evPointerId != null && evPointerId !== pointerId) return;
          self.$el.off("pointermove.noteDrag pointerup.noteDrag pointercancel.noteDrag");
          d.swallowClick = d.isDragging;
          self._setDraggingVisual(d.noteId, false);
          if (d.outOfRange || d.dropOnOccupied) {
            self.removeNote(d.noteId);
          } else {
            self.moveNote(d.noteId, {
              step: d.lastTargetStep
            });
            self._resolveNoteOverlaps();
            self._emitNoteState(d.noteId, "user");
          }
          d.noteId = null;
          d.isDragging = false;
          d.movedPx = 0;
          d.startStep = null;
          d.lastTargetStep = null;
          d.lastSoundStep = null;
          d.dropOnOccupied = false;
          d.outOfRange = false;
        });
      }
      this.$el.on("pointerdown.noteDrag", ".accidental", function (e) {
        e.stopPropagation();
      });
      this.$el.on("pointerdown.noteDrag", ".note", function (e) {
        startDragFromNoteEl(this, e);
      });
      this.$el.on("pointerdown.noteDrag", function (e) {
        if ($(e.target).closest(".accidental").length) return;
        if ($(e.target).closest(".note").length) return;
        var _getPointerPageXY3 = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerPageXY)(e),
          pageY = _getPointerPageXY3.y;
        var step = self.yToStep(self._pageYToLocalY(pageY));
        var idAtStep = self._getNoteIdAtStep(step, null);
        if (!idAtStep) return;
        var noteEl = self.$el.find(".note[data-note-id=\"".concat(idAtStep, "\"]"))[0];
        if (!noteEl) return;
        startDragFromNoteEl(noteEl, e);
      });
      this.$el.on("click.noteDrag", ".accidental", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var noteId = this.getAttribute("data-for-note-id");
        if (!noteId) return;
        if (self.isNoteFixed(noteId)) return;
        self._removeAccidentalForNote(noteId);
        self._repositionAllAccidentals();
        self._emitNoteState(noteId, "user");
      });
      this.$el.on("click.noteDrag", ".note", function (e) {
        var clickedId = $(this).attr("data-note-id");
        if (self._suppressNextClick.noteId && clickedId === self._suppressNextClick.noteId && Date.now() < self._suppressNextClick.until) {
          self._suppressNextClick.noteId = null;
          self._suppressNextClick.until = 0;
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (d.swallowClick) {
          e.preventDefault();
          e.stopPropagation();
          d.swallowClick = false;
          return;
        }
        self.removeNote(clickedId);
      });
    }
  }, {
    key: "enableAccidentalDrag",
    value: function enableAccidentalDrag($toolEls) {
      var self = this;
      $toolEls.addClass("accidental-tool");
      function resetAccDrag() {
        self._accDragSound.noteId = null;
        self._accDragSound.step = null;
        self._accDragSound.toolType = null;
        self._accDragSound.prospectiveCls = null;
        self._accSnap.noteId = null;
        self._accSnap.dist = null;
        self._accSnap.localY = null;
      }
      $toolEls.draggable({
        helper: "clone",
        appendTo: "body",
        zIndex: 9999,
        revert: "invalid",
        scroll: false,
        start: function start(_event, ui) {
          ui.helper.addClass("dragging accidental-tool");
          if (self._soundEnabled()) self._ensureAudio();
          resetAccDrag();
          self._accDragSound.toolType = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.toolTypeFromEl)($(this));
        },
        drag: function drag(event) {
          var toolType = self._accDragSound.toolType;
          if (!toolType) return;
          var pageX = event.pageX;
          var pageY = event.pageY;
          if (!Number.isFinite(pageY) && event.originalEvent) pageY = event.originalEvent.pageY;
          if (!Number.isFinite(pageX) && event.originalEvent) pageX = event.originalEvent.pageX;
          var off = self.$el.offset();
          var x = pageX - off.left;
          var y = pageY - off.top;
          self._accSnap.localY = y;
          if (x < 0 || y < 0 || x > self.$el.width() || y > self.$el.height()) {
            resetAccDrag();
            self._accDragSound.toolType = toolType;
            return;
          }
          var nearest = self._nearestEditableNoteByLocalY(y);
          if (!nearest) {
            self._accSnap.noteId = null;
            self._accSnap.dist = null;
            self._accDragSound.noteId = null;
            self._accDragSound.step = null;
            self._accDragSound.prospectiveCls = null;
            return;
          }
          var noteId = nearest.noteId;
          self._accSnap.noteId = noteId;
          self._accSnap.dist = nearest.dist;
          var $note = self.$el.find(".note[data-note-id=\"".concat(noteId, "\"]"));
          if (!$note.length) return;
          var step = self.yToStep(parseFloat($note.css("top")));
          if (!self._isStepAllowed(step)) return;
          var currentCls = self._getAttachedAccidentalClass(noteId);
          var prospectiveCls = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.nextAccidentalClass)(currentCls, toolType);
          if ((0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.isMaxedDouble)(currentCls, toolType)) {
            self._accDragSound.noteId = null;
            self._accDragSound.step = null;
            self._accDragSound.prospectiveCls = null;
            return;
          }
          if (noteId === self._accDragSound.noteId && step === self._accDragSound.step && prospectiveCls === self._accDragSound.prospectiveCls) return;
          self._accDragSound.noteId = noteId;
          self._accDragSound.step = step;
          self._accDragSound.prospectiveCls = prospectiveCls;
          if (self._soundEnabled()) {
            var accOff = self._accidentalClassToOffset(prospectiveCls);
            self._playStep(step, accOff);
          }
        },
        stop: function stop() {
          resetAccDrag();
        }
      });
    }
  }, {
    key: "enableAccidentalDropOnStaff",
    value: function enableAccidentalDropOnStaff() {
      var self = this;
      this.$el.droppable({
        accept: ".accidental-tool",
        tolerance: "pointer",
        drop: function drop(event, ui) {
          var toolType = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.toolTypeFromEl)(ui.draggable);
          if (!toolType) return;
          var localY;
          if (self._accSnap && self._accSnap.localY != null) localY = self._accSnap.localY;else {
            var pageY = event.pageY;
            if (!Number.isFinite(pageY) && event.originalEvent) pageY = event.originalEvent.pageY;
            localY = self._pageYToLocalY(pageY);
          }
          var nearest = self._nearestEditableNoteByLocalY(localY);
          if (!nearest) return;
          self.applyAccidentalToolToNote(nearest.noteId, toolType);
        }
      });
    }
  }]);
}();

/***/ },

/***/ "./resources/js/music/staff/staffUtils.js"
/*!************************************************!*\
  !*** ./resources/js/music/staff/staffUtils.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACCIDENTAL_CLASSES: () => (/* binding */ ACCIDENTAL_CLASSES),
/* harmony export */   CLEF_LAYOUT_VARS: () => (/* binding */ CLEF_LAYOUT_VARS),
/* harmony export */   accidentalClassToText: () => (/* binding */ accidentalClassToText),
/* harmony export */   getPointerId: () => (/* binding */ getPointerId),
/* harmony export */   getPointerPageXY: () => (/* binding */ getPointerPageXY),
/* harmony export */   isMaxedDouble: () => (/* binding */ isMaxedDouble),
/* harmony export */   nextAccidentalClass: () => (/* binding */ nextAccidentalClass),
/* harmony export */   normalizeClef: () => (/* binding */ normalizeClef),
/* harmony export */   pickOne: () => (/* binding */ pickOne),
/* harmony export */   pickWeighted: () => (/* binding */ pickWeighted),
/* harmony export */   pxFromCss: () => (/* binding */ pxFromCss),
/* harmony export */   randomInt: () => (/* binding */ randomInt),
/* harmony export */   spellNoteFromState: () => (/* binding */ spellNoteFromState),
/* harmony export */   stepToLetterOctave: () => (/* binding */ stepToLetterOctave),
/* harmony export */   toArrayMaybe: () => (/* binding */ toArrayMaybe),
/* harmony export */   toolTypeFromEl: () => (/* binding */ toolTypeFromEl)
/* harmony export */ });
// resources/js/music/staff/staffUtils.js

var ACCIDENTAL_CLASSES = ["music-font__sharp", "music-font__doublesharp", "music-font__flat", "music-font__doubleflat", "music-font__natural"];
var CLEF_LAYOUT_VARS = {
  treble: {
    "--clef-width": "140px",
    "--clef-height": "calc(var(--staff-line-gap) * 6)",
    "--clef-top": "54px",
    "--clef-left-nudge": "28px"
  },
  bass: {
    "--clef-width": "76px",
    "--clef-height": "calc(var(--staff-line-gap) * 6)",
    "--clef-top": "35px",
    "--clef-left-nudge": "-12px"
  },
  alto: {
    "--clef-width": "88px",
    "--clef-height": "calc(var(--staff-line-gap) * 6)",
    "--clef-top": "47.5px",
    "--clef-left-nudge": "-10px"
  },
  tenor: {
    "--clef-width": "88px",
    "--clef-height": "calc(var(--staff-line-gap) * 6)",
    "--clef-top": "22.5px",
    "--clef-left-nudge": "-10px"
  }
};
function pxFromCss(css, varName, fallback) {
  var v = css.getPropertyValue(varName);
  var n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}
function getPointerPageXY(e) {
  var oe = e.originalEvent || e;
  if (oe.touches && oe.touches.length) return {
    x: oe.touches[0].pageX,
    y: oe.touches[0].pageY
  };
  if (oe.changedTouches && oe.changedTouches.length) return {
    x: oe.changedTouches[0].pageX,
    y: oe.changedTouches[0].pageY
  };
  return {
    x: oe.pageX,
    y: oe.pageY
  };
}
function getPointerId(e) {
  var oe = e.originalEvent || e;
  return oe && oe.pointerId != null ? oe.pointerId : null;
}
function randomInt(min, maxInclusive) {
  return Math.floor(Math.random() * (maxInclusive - min + 1)) + min;
}
function pickOne(arr) {
  if (!Array.isArray(arr) || !arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickWeighted(items) {
  var list = Array.isArray(items) ? items.filter(function (x) {
    return x && Number.isFinite(x.weight) && x.weight > 0;
  }) : [];
  if (!list.length) return null;
  var total = list.reduce(function (sum, x) {
    return sum + x.weight;
  }, 0);
  var r = Math.random() * total;
  for (var i = 0; i < list.length; i++) {
    r -= list[i].weight;
    if (r <= 0) return list[i].value;
  }
  return list[list.length - 1].value;
}
function toArrayMaybe(v) {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}
function normalizeClef(clef) {
  if (clef == null) return null;
  var c = String(clef || "treble").toLowerCase();
  if (c === "bass") return "bass";
  if (c === "alto") return "alto";
  if (c === "tenor") return "tenor";
  return "treble";
}
function toolTypeFromEl($el) {
  if ($el.hasClass("music-font__sharp")) return "sharp";
  if ($el.hasClass("music-font__flat")) return "flat";
  if ($el.hasClass("music-font__natural")) return "natural";
  return null;
}
function nextAccidentalClass(currentCls, toolType) {
  if (toolType === "sharp") {
    if (currentCls === "music-font__doublesharp") return "music-font__doublesharp";
    if (currentCls === "music-font__sharp") return "music-font__doublesharp";
    return "music-font__sharp";
  }
  if (toolType === "flat") {
    if (currentCls === "music-font__doubleflat") return "music-font__doubleflat";
    if (currentCls === "music-font__flat") return "music-font__doubleflat";
    return "music-font__flat";
  }
  if (toolType === "natural") return "music-font__natural";
  return currentCls || null;
}
function isMaxedDouble(currentCls, toolType) {
  return toolType === "sharp" && currentCls === "music-font__doublesharp" || toolType === "flat" && currentCls === "music-font__doubleflat";
}
function accidentalClassToText(cls) {
  if (!cls) return "";
  if (cls.includes("music-font__doublesharp")) return "##";
  if (cls.includes("music-font__sharp")) return "#";
  if (cls.includes("music-font__doubleflat")) return "bb";
  if (cls.includes("music-font__flat")) return "b";
  return "";
}
function stepToLetterOctave(staff, step) {
  var letters = ["C", "D", "E", "F", "G", "A", "B"];
  var baseC;
  var baseIndex;
  switch (staff.getClef()) {
    case "bass":
      baseC = 36;
      baseIndex = 4;
      break;
    case "alto":
      baseC = 48;
      baseIndex = 3;
      break;
    case "tenor":
      baseC = 48;
      baseIndex = 1;
      break;
    case "treble":
    default:
      baseC = 60;
      baseIndex = 2;
      break;
  }
  var idx = baseIndex + step;
  var octaveShift = Math.floor(idx / 7);
  var letterIndex = (idx % 7 + 7) % 7;
  var baseOctave = Math.floor(baseC / 12) - 1;
  var octave = baseOctave + octaveShift;
  return {
    letter: letters[letterIndex],
    octave: octave
  };
}
function spellNoteFromState(staff, step, accidentalClass) {
  var _stepToLetterOctave = stepToLetterOctave(staff, step),
    letter = _stepToLetterOctave.letter,
    octave = _stepToLetterOctave.octave;
  var acc = accidentalClassToText(accidentalClass);
  return "".concat(letter).concat(acc).concat(octave);
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
/*!***********************************************!*\
  !*** ./resources/js/music/games/dictation.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dictation_DictationChallenge_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dictation/DictationChallenge.js */ "./resources/js/music/games/dictation/DictationChallenge.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var options = readGlobal("__challengeOptions") || {};
var clefUrls = readGlobal("__clefUrls") || null;
var game = new _dictation_DictationChallenge_js__WEBPACK_IMPORTED_MODULE_0__.DictationChallenge(_objectSpread(_objectSpread({}, options), {}, {
  clefUrls: clefUrls
}));
game.start();
})();

/******/ })()
;