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
/* harmony import */ var _shared_finalResults_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/finalResults.js */ "./resources/js/music/games/shared/finalResults.js");
/* harmony import */ var _shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/mojsEffects.js */ "./resources/js/music/games/shared/mojsEffects.js");
/* harmony import */ var _shared_PromptUi_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/PromptUi.js */ "./resources/js/music/games/shared/PromptUi.js");
/* harmony import */ var _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
      showNoteNames: false,
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
    this.prompt = new _shared_PromptUi_js__WEBPACK_IMPORTED_MODULE_4__.PromptUi("#prompt");

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
    this.showNoteNames = !!this.opts.showNoteNames;
    this.$staffEl.toggleClass("show-letternames", this.showNoteNames);

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
    key: "_normalizeOnOff",
    value: function _normalizeOnOff(value) {
      if (value === true) return true;
      if (value === false) return false;
      var s = String(value !== null && value !== void 0 ? value : "").trim().toLowerCase();
      return s === "on" || s === "true" || s === "1";
    }
  }, {
    key: "_showSolfegeNoteNames",
    value: function _showSolfegeNoteNames() {
      return this._normalizeOnOff(this.opts.solfege);
    }
  }, {
    key: "_toDisplayNoteName",
    value: function _toDisplayNoteName(letterWithAccidentals) {
      var raw = String(letterWithAccidentals || "").trim();
      if (!raw) return raw;
      if (!this._showSolfegeNoteNames()) return raw;
      var m = raw.match(/^([A-G])([#b]{0,2})$/i);
      if (!m) return raw;
      var letter = String(m[1] || "").toUpperCase();
      var acc = String(m[2] || "");
      var sol = BaseStaffGame.LETTER_TO_SOLFEGE[letter] || letter;
      return "".concat(sol).concat(acc);
    }
  }, {
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
              this._uiSfxSynth = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.createUiPolySynth();
              this._uiSfxNoise = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.createUiNoiseSynth();
              this._uiTimerSfxSynth = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.createUiTimerSynth();
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
          _this3._uiSfxSynth.triggerAttackRelease(n, 0.07, now + i * 0.05, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("successBasic", 0.42));
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
          _this4._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.045, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("successBonus", 0.45));
        });
        hit.forEach(function (n) {
          _this4._uiSfxSynth.triggerAttackRelease(n, 0.12, now + 0.26, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("successBonus", 0.30));
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
          _this5._uiSfxNoise.triggerAttackRelease(0.06, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("failNoise", 0.45));
        }
        if (_this5._uiSfxSynth) {
          _this5._uiSfxSynth.triggerAttackRelease("A2", 0.10, now + 0.01, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("failNote", 0.55));
          _this5._uiSfxSynth.triggerAttackRelease("G2", 0.12, now + 0.08, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("failNote", 0.6));
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
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.9, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.6));
          });
          ["G5", "A5", "B5", "C6", "D6", "E6", "G6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.08, now + 0.25 + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.35));
          });
        },
        // 2) Rising broken chord + final hit
        function () {
          ["C5", "E5", "G5", "B5", "D6", "G6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.11, now + i * 0.08, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.44));
          });
          ["C6", "E6", "G6"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.28, now + 0.62, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.5));
          });
        },
        // 3) Two chord swells
        function () {
          ["A3", "E4", "A4", "C5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.45, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.45));
          });
          ["F4", "A4", "C5", "F5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.52, now + 0.35, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.48));
          });
          ["C5", "F5", "A5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.78, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.4));
          });
        },
        // 4) Sparkly step run + octave landing
        function () {
          ["E5", "G5", "A5", "B5", "D6", "E6", "G6", "A6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.075, now + i * 0.055, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.34));
          });
          ["A5", "A6", "C7"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.20, now + 0.52, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.42));
          });
        },
        // 5) Major lift arpeggio
        function () {
          ["D4", "A4", "D5", "F#5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.36, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.45));
          });
          ["D5", "F#5", "A5", "D6", "F#6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.095, now + 0.2 + i * 0.065, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.4));
          });
        },
        // 6) Warm cadence
        function () {
          ["G3", "D4", "G4", "B4"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.4, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.4));
          });
          ["C4", "E4", "G4", "C5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.44, now + 0.32, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.46));
          });
          ["E5", "G5", "C6"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.22, now + 0.72, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.4));
          });
        },
        // 7) Fast gamey sparkle
        function () {
          ["C6", "D6", "E6", "G6", "A6", "G6", "E6", "C7"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.048, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.3));
          });
          ["G6", "C7"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.2, now + 0.48, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.38));
          });
        },
        // 8) Two-step fanfare
        function () {
          ["F4", "C5", "A5"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.16, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.45));
          });
          ["G4", "D5", "B5"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.16, now + 0.28 + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.48));
          });
          ["C5", "E5", "G5", "C6"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.26, now + 0.54, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.44));
          });
        },
        // 9) Descend then resolve up
        function () {
          ["A6", "G6", "E6", "D6", "C6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.08, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.34));
          });
          ["E6", "G6", "C7"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.4, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.42));
          });
        },
        // 10) Big finish hit
        function () {
          ["C4", "E4", "G4", "C5"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.34, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.48));
          });
          ["E5", "G5", "B5", "D6", "E6"].forEach(function (n, i) {
            _this6._uiSfxSynth.triggerAttackRelease(n, 0.09, now + 0.18 + i * 0.055, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.38));
          });
          ["C6", "E6", "G6", "C7"].forEach(function (n) {
            return _this6._uiSfxSynth.triggerAttackRelease(n, 0.3, now + 0.58, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.5));
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
      synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), 0.055, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("finalMetric", 0.44));
      synth.triggerAttackRelease(Tone.Frequency(midi + 5, "midi"), 0.045, now + 0.03, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("finalMetric", 0.34));
    }
  }, {
    key: "_animateFinalMetricsWithSfx",
    value: function _animateFinalMetricsWithSfx() {
      var _this7 = this;
      var $boxes = this.$finalOverlay.find("#metrics-boxes > div");
      if (!$boxes.length) return;
      $boxes.css({
        position: "relative",
        zIndex: 6
      });
      var BASE_DELAY_MS = 260;
      var STEP_DELAY_MS = 260; // wider spacing between boxes

      this._clearFinalMetricsSfxTimers();
      $boxes.each(function (i, el) {
        var delayMs = BASE_DELAY_MS + i * STEP_DELAY_MS;
        el.style.animationDelay = "".concat(delayMs, "ms");
        var tid = setTimeout(function () {
          var _this7$$finalOverlay;
          _this7._playFinalMetricPopSfx(i);
          (0,_shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_3__.playBurstConfettiAtElement)(el, {
            parentEl: ((_this7$$finalOverlay = _this7.$finalOverlay) === null || _this7$$finalOverlay === void 0 ? void 0 : _this7$$finalOverlay[0]) || document.body,
            index: i
          });
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
          _this8._uiSfxSynth.triggerAttackRelease(n, 0.09, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("perfectBonus", 0.62));
        });
        var hit = ["C6", "G6", "C7", "E7"];
        hit.forEach(function (n) {
          return _this8._uiSfxSynth.triggerAttackRelease(n, 0.35, now + 0.48, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("perfectBonus", 0.46));
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
  }, {
    key: "_playRunStartFanfareSfx",
    value: function _playRunStartFanfareSfx() {
      var _this9 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        if (!_this9._uiSfxSynth) return;
        var now = Tone.now();
        // French-overture style: dotted long-short gestures, ceremonial but "opening".
        // 4 rhythmic motifs x 5 tonal centers = 20 variants.
        var motifs = [
        // Motif A: tonic -> chromatic lift -> suspended color
        [[[0, 7], 0.00, 0.19, 0.20], [[3, 7], 0.24, 0.06, 0.18], [[0, 5, 10], 0.38, 0.18, 0.22], [[2, 5, 9], 0.62, 0.06, 0.18], [[0, 7, 12], 0.76, 0.15, 0.22]],
        // Motif B: minor color then bright turn
        [[[0, 3, 7], 0.00, 0.18, 0.20], [[2, 5, 9], 0.23, 0.06, 0.18], [[0, 7], 0.36, 0.18, 0.22], [[4, 7, 11], 0.60, 0.06, 0.18], [[0, 5, 9], 0.74, 0.15, 0.22]],
        // Motif C: fanfare call/response
        [[[0, 12], 0.00, 0.20, 0.19], [[7, 12], 0.25, 0.06, 0.17], [[2, 9, 14], 0.39, 0.18, 0.21], [[5, 9, 12], 0.63, 0.06, 0.17], [[0, 7, 10], 0.77, 0.16, 0.21]],
        // Motif D: stately dotted march
        [[[0, 5], 0.00, 0.19, 0.20], [[2, 5], 0.24, 0.06, 0.18], [[0, 4, 9], 0.38, 0.18, 0.22], [[-1, 4, 7], 0.62, 0.06, 0.18], [[0, 7, 11], 0.76, 0.15, 0.22]]];
        var roots = [53, 55, 57, 58, 60]; // F3..C4
        var variantIndex = Math.floor(Math.random() * 20);
        var motif = motifs[Math.floor(variantIndex / roots.length)];
        var root = roots[variantIndex % roots.length];
        var toNote = function toNote(m) {
          return Tone.Frequency(m, "midi").toNote();
        };
        motif.forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 4),
            intervals = _ref2[0],
            t = _ref2[1],
            dur = _ref2[2],
            vel = _ref2[3];
          var notes = intervals.map(function (i) {
            return toNote(root + i);
          });
          _this9._uiSfxSynth.triggerAttackRelease(notes, dur, now + t, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("runStart", vel));
        });
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
      var _this0 = this;
      this._clearCorrectStreak();
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this._stats.checksTotal += 1;
      var reachedEnd = this._updateProgressBar() >= 100;
      if (reachedEnd && !this._isPracticeMode()) {
        this._stats.finishedAtMs = Date.now();
        this.$checkBtn.text('Final results, let\'s see…');
        setTimeout(function () {
          return _this0._showFinalResults();
        }, 1600);
        return;
      }
      this._setTimedOutInteractivityDisabled(false);
      this._hideTimeUpMessage();
      this._hideSkipRoundButton();
      this.prompt.setTone("blue");
      this._resetRoundTimerIfEnabled();
      this.$accidentals.removeClass("invisible");
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
      this._uiTimerSfxSynth.triggerAttackRelease("C6", 0.06, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("timerBeep", 0.5));
    }
  }, {
    key: "_playTimerTimeUpSfx",
    value: function _playTimerTimeUpSfx() {
      if (!this.isSoundEnabled() || !window.Tone) return;
      if (!this._uiSfxReady || !this._uiTimerSfxSynth) return;
      var now = Tone.now();
      if (this._uiSfxNoise) {
        this._uiSfxNoise.triggerAttackRelease(0.12, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("timerTimeUp", 0.2));
      }
      this._uiTimerSfxSynth.triggerAttackRelease("G4", 0.11, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("timerTimeUp", 0.72));
      this._uiTimerSfxSynth.triggerAttackRelease("E4", 0.13, now + 0.10, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("timerTimeUp", 0.76));
      this._uiTimerSfxSynth.triggerAttackRelease("C4", 0.18, now + 0.22, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("timerTimeUp", 0.82));
    }
  }, {
    key: "_removeAllStaffNotesWithSmoke",
    value: function _removeAllStaffNotesWithSmoke() {
      var _this$$staffEl,
        _this$staff,
        _this1 = this;
      if (!((_this$$staffEl = this.$staffEl) !== null && _this$$staffEl !== void 0 && _this$$staffEl.length) || !((_this$staff = this.staff) !== null && _this$staff !== void 0 && _this$staff.removeNote)) return;
      var noteIds = this.$staffEl.find(".note").not(".preview").not(".hint").map(function (_, el) {
        return String(el.getAttribute("data-note-id") || "");
      }).get().filter(Boolean);
      if (!noteIds.length) return;
      noteIds.forEach(function (id) {
        var delay = Math.floor(Math.random() * 140); // tiny natural stagger
        setTimeout(function () {
          _this1.staff.removeNote(id, {
            smoke: true
          });
        }, delay);
      });
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
      var _this10 = this;
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
        this._removeAllStaffNotesWithSmoke();
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
        return _this10._runGameTimerTick();
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
      this._wireControls();
      this._resetProgress();
      this._setTimedOutInteractivityDisabled(false);
      this._hideTimeUpMessage();
      this._hideSkipRoundButton();
      if (this._isTimerEnabled()) {
        this.$timer.show();
        this._armUiSfxOnFirstGesture();
        this._resetRoundTimerIfEnabled();
      } else {
        this._stopGameTimer();
        this.$timer.hide();
      }
      this.$accidentals.removeClass("invisible");
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
      this.$accidentals.removeClass("invisible");
    }
  }, {
    key: "_wireStaffTools",
    value: function _wireStaffTools() {
      var _this11 = this;
      this.staff.enableNoteDragAndClickDelete();
      this.staff.enableGhostClickCreate();
      this.staff.enableAccidentalDrag($("#accidentals .music-font__sharp, #accidentals .music-font__flat, #accidentals .music-font__natural"));
      this.staff.enableAccidentalDropOnStaff();
      this.$staffEl.off("staff:noteState._log.".concat(this.ns)).on("staff:noteState._log.".concat(this.ns), function (e, data) {
        var full = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.spellNoteFromState)(_this11.staff, data.step, data.accidentalClass);
        var letterOnly = full.replace(/\d+$/, "");
        var displayName = _this11._toDisplayNoteName(letterOnly);
        if (_this11.showNoteNames) {
          _this11.$staffEl.find(".note[data-note-id=\"".concat(data.noteId, "\"] .lettername")).text(displayName);
        }
        if (data.source === "fixed") {
          var _this11$_onFixedNoteS;
          _this11._fixedNote = {
            letterWithAcc: letterOnly,
            letterOnly: letterOnly.replace(/[#b]+$/, "")
          };
          _this11._fixedState = {
            step: data.step,
            accidentalClass: data.accidentalClass || null,
            midi: data.midi
          };
          (_this11$_onFixedNoteS = _this11._onFixedNoteState) === null || _this11$_onFixedNoteS === void 0 || _this11$_onFixedNoteS.call(_this11, data, full, letterOnly);
        }

        // Keep your debug logging behavior
        // eslint-disable-next-line no-console
        console.log(data.source === "fixed" ? "Fixed note:" : "User note:", full, {
          midi: data.midi,
          noteId: data.noteId,
          step: data.step,
          clef: _this11.staff.getClef()
        });
      });
    }
  }, {
    key: "_wireControls",
    value: function _wireControls() {
      var _this12 = this;
      $("#clear").off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
        return _this12.staff.clearNotes();
      });
      this.$checkBtn.off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
        return _this12._onCheck();
      });
      this.$helpBtn.off("click.".concat(this.ns, "Help")).on("click.".concat(this.ns, "Help"), function () {
        _this12._usedHintThisRound = true;
        _this12._showHintNote();
      });
      this.$skipBtn.off("click.".concat(this.ns, "Skip")).on("click.".concat(this.ns, "Skip"), function (e) {
        e.preventDefault();
        _this12._finishRoundAsTimedOut();
      });
      if (!this._continueBound) {
        this._continueBound = true;
        $("#continue button").off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
          $("#continue").hide();
          _this12._hideSkipRoundButton();
          _this12._hideTimeUpMessage();
          _this12._setTimedOutInteractivityDisabled(false);
          _this12._resetRoundTimerIfEnabled();
          _this12.prompt.setTone("blue");
          _this12.$accidentals.removeClass("invisible");
          _this12.newChallenge();
          _this12._armUiGates({
            resetInstructions: false
          });
          _this12.$checkBtn.enable();
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
      var _this13 = this;
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        resetInstructions = _ref3.resetInstructions;
      var needForInstructions = this._instructionsAfterUserNotes();
      if (resetInstructions) this._instructionsRemoved = false;
      $("#check").show().removeClass("invisible");
      this._userNotesSinceGate = 0;
      this.$staffEl.off("staff:userNoteAdded._uiGate.".concat(this.ns)).on("staff:userNoteAdded._uiGate.".concat(this.ns), function () {
        _this13._userNotesSinceGate += 1;
        if (!_this13._instructionsRemoved && _this13._userNotesSinceGate >= needForInstructions) {
          _this13._removeInstructions();
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
      var _this14 = this;
      var ids = Array.isArray(this._activeHintIds) ? this._activeHintIds : [];
      ids.forEach(function (id) {
        return _this14.staff.removeNote(id);
      });
      this._activeHintIds = [];
    }
  }, {
    key: "_removeAllUserNotesForHint",
    value: function _removeAllUserNotesForHint() {
      var _this15 = this;
      var $userNotes = this.$staffEl.find(".note").not(".fixed").not(".preview").not(".hint");
      $userNotes.each(function (_, el) {
        var id = el.getAttribute("data-note-id");
        if (id) _this15.staff.removeNote(id);
      });
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
      var _this16 = this;
      var $note = this.$staffEl.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      if (!$note.length) return;
      $note.off("animationend.hint.".concat(noteId, " webkitAnimationEnd.hint.").concat(noteId)).one("animationend.hint.".concat(noteId, " webkitAnimationEnd.hint.").concat(noteId), function () {
        _this16.staff.removeNote(noteId);
        _this16._activeHintIds = (_this16._activeHintIds || []).filter(function (x) {
          return x !== noteId;
        });
      });
    }
  }, {
    key: "_showHintNote",
    value: function _showHintNote() {
      this._removeAllHintNotes();
      this._removeAllUserNotesForHint();
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
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        isBonus = _ref4.isBonus;
      if (isBonus) this._playSuccessSfxBonus();else this._playSuccessSfxBasic();
      this.$helpBtn.hide();
      this.$accidentals.addClass("invisible");
      this.$feedback.find(".message span").text((0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickOne)(this.successPhrases));
      this.$feedback.stop(true, true).fadeIn("fast");
    }
  }, {
    key: "_handleCorrectAnswerUi",
    value: function _handleCorrectAnswerUi() {
      var _this17 = this;
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$isBonus = _ref5.isBonus,
        isBonus = _ref5$isBonus === void 0 ? false : _ref5$isBonus,
        _ref5$earned = _ref5.earned,
        earned = _ref5$earned === void 0 ? 0 : _ref5$earned,
        _ref5$$prompt = _ref5.$prompt,
        $prompt = _ref5$$prompt === void 0 ? this.prompt.$root : _ref5$$prompt,
        _ref5$$extraHide = _ref5.$extraHide,
        $extraHide = _ref5$$extraHide === void 0 ? $() : _ref5$$extraHide,
        _ref5$finalDelayMs = _ref5.finalDelayMs,
        finalDelayMs = _ref5$finalDelayMs === void 0 ? 1600 : _ref5$finalDelayMs;
      this._successAnimation({
        isBonus: isBonus
      });
      if (!this._instructionsRemoved) {
        $("#instructions").remove();
        this._instructionsRemoved = true;
      }
      if ($prompt !== null && $prompt !== void 0 && $prompt.length) $prompt.hide();
      if ($extraHide !== null && $extraHide !== void 0 && $extraHide.length) $extraHide.hide();
      $("#score").animateCSS && $("#score").animateCSS("heartBeat");
      if (earned > 0) this._showIncrement(earned);
      if (this._updateProgressBar() >= 100) {
        this._stats.finishedAtMs = Date.now();
        this.$checkBtn.text('Final results, let\'s see…');
        setTimeout(function () {
          return _this17._showFinalResults();
        }, finalDelayMs);
      } else {
        $("#check").hide();
        $("#continue").show();
      }
    }
  }, {
    key: "_runSuccessFeedbackTransition",
    value: function _runSuccessFeedbackTransition() {
      var _this18 = this;
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref6$$interval = _ref6.$interval,
        $interval = _ref6$$interval === void 0 ? null : _ref6$$interval,
        _ref6$delayMs = _ref6.delayMs,
        delayMs = _ref6$delayMs === void 0 ? 800 : _ref6$delayMs,
        _ref6$onDone = _ref6.onDone,
        onDone = _ref6$onDone === void 0 ? null : _ref6$onDone;
      if (this._successFeedbackTimeoutId != null) {
        clearTimeout(this._successFeedbackTimeoutId);
        this._successFeedbackTimeoutId = null;
      }
      if ($interval !== null && $interval !== void 0 && $interval.length) $interval.hide();
      var safeDelay = Math.max(0, Number(delayMs) || 0);
      this._successFeedbackTimeoutId = setTimeout(function () {
        var _this18$$feedback, _this18$$feedback$hid;
        _this18._successFeedbackTimeoutId = null;
        (_this18$$feedback = _this18.$feedback) === null || _this18$$feedback === void 0 || (_this18$$feedback$hid = _this18$$feedback.hide) === null || _this18$$feedback$hid === void 0 || _this18$$feedback$hid.call(_this18$$feedback);
        if ($interval !== null && $interval !== void 0 && $interval.length) $interval.show();
        if (typeof onDone === "function") onDone();
      }, safeDelay);
      return this._successFeedbackTimeoutId;
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
        this._clearCorrectStreak();
        this.$points.text("0");
        this._showBonusBadge(0);
        return {
          earned: 0,
          firstTry: false,
          bonusEarned: 0
        };
      }
      if (this._usedHintThisRound) {
        this._clearCorrectStreak();
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
      this._applyCorrectStreakForOutcome({
        firstTry: firstTry
      });
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
    key: "_syncStreakBarClass",
    value: function _syncStreakBarClass() {
      var _this$$progressBar;
      if (!((_this$$progressBar = this.$progressBar) !== null && _this$$progressBar !== void 0 && _this$$progressBar.length)) return;
      var active = this.getCorrectStreak() >= 3;
      this.$progressBar.toggleClass("streak-bar", !!active);
    }
  }, {
    key: "_applyCorrectStreakForOutcome",
    value: function _applyCorrectStreakForOutcome() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        firstTry = _ref7.firstTry;
      if (!firstTry) {
        this._clearCorrectStreak();
        return;
      }
      this._correctStreak += 1;
      this._syncStreakBarClass();
      if (this._correctStreak <= 1) {
        // eslint-disable-next-line no-console
        console.log("[BaseStaffGame] Correct answer. No streak yet.");
      } else {
        // eslint-disable-next-line no-console
        console.log("[BaseStaffGame] Streak ".concat(this._correctStreak, "x"));
      }
    }
  }, {
    key: "_clearCorrectStreak",
    value: function _clearCorrectStreak() {
      this._correctStreak = 0;
      this._syncStreakBarClass();
    }
  }, {
    key: "_resetProgress",
    value: function _resetProgress() {
      this._syncPracticeUi();
      this._clearCorrectStreak();
      this._madeAnyMistake = false;
      this.$progressBar.data("progress", 0);
      this.$progressBar.css({
        width: "0%"
      });
      this.$progressBar.removeClass("streak-bar");
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
      var _this19 = this;
      this._clearCorrectStreak();
      this._playFailSfx();
      this._removeInstructions();
      var $target = $shakeTarget || this.$checkWrap;
      $target.removeClass("animate__animated animate__shakeX");
      // eslint-disable-next-line no-unused-expressions
      $target[0] && $target[0].offsetWidth;
      $target.addClass("animate__animated animate__shakeX");
      $target.off("animationend._fail.".concat(this.ns, " webkitAnimationEnd._fail.").concat(this.ns, " oAnimationEnd._fail.").concat(this.ns, " MSAnimationEnd._fail.").concat(this.ns)).one("animationend._fail.".concat(this.ns, " webkitAnimationEnd._fail.").concat(this.ns, " oAnimationEnd._fail.").concat(this.ns, " MSAnimationEnd._fail.").concat(this.ns), function () {
        $target.removeClass("animate__animated animate__shakeX");
        _this19.$checkBtn.enable();
      });
    }
  }, {
    key: "_removeInstructions",
    value: function _removeInstructions() {
      if (this._instructionsRemoved) return;
      $("#instructions").remove();
      this._instructionsRemoved = true;
    }
  }, {
    key: "_showFinalResults",
    value: function _showFinalResults() {
      var _this$_stats$checksTo,
        _this$_stats$checksCo,
        _this$_stats$finished,
        _this20 = this;
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
          var _this20$$doublePoints, _this20$$doublePoints2;
          (_this20$$doublePoints = _this20.$doublePoints) === null || _this20$$doublePoints === void 0 || (_this20$$doublePoints2 = _this20$$doublePoints.show) === null || _this20$$doublePoints2 === void 0 || _this20$$doublePoints2.call(_this20$$doublePoints);
          _this20._playPerfectGameBonusSfx();
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
      (0,_shared_finalResults_js__WEBPACK_IMPORTED_MODULE_2__.renderFinalResultsOverlay)({
        $finalOverlay: this.$finalOverlay,
        rounds: this.numOfChallenges,
        score: finalPoints,
        accuracy: accuracy,
        durationSec: totalSeconds,
        clearCountupTimers: function clearCountupTimers() {
          return _this20._clearFinalCountupTimers();
        },
        countupTimers: this._finalCountupTimeouts,
        animateMetrics: function animateMetrics() {
          return _this20._animateFinalMetricsWithSfx();
        },
        playFinalSfx: function playFinalSfx() {
          return _this20._playFinalSfx();
        }
      });
    }
  }]);
}();
_defineProperty(BaseStaffGame, "MIN_CHALLENGES", 2);
_defineProperty(BaseStaffGame, "MAX_CHALLENGES", 12);
_defineProperty(BaseStaffGame, "LETTER_TO_SOLFEGE", {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si"
});

/***/ },

/***/ "./resources/js/music/games/shared/GameAudio.js"
/*!******************************************************!*\
  !*** ./resources/js/music/games/shared/GameAudio.js ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameAudio: () => (/* binding */ GameAudio)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var GameAudio = /*#__PURE__*/function () {
  function GameAudio() {
    _classCallCheck(this, GameAudio);
  }
  return _createClass(GameAudio, null, [{
    key: "scale",
    value: function scale(kind) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var mult = Number(GameAudio.VELOCITY[kind]);
      return (Number.isFinite(mult) ? mult : 1) * (Number(base) || 0);
    }
  }, {
    key: "getSoundLibrary",
    value: function getSoundLibrary() {
      return GameAudio.SOUND_LIBRARY.map(function (sound) {
        return _objectSpread(_objectSpread({}, sound), {}, {
          valuePercent: GameAudio.getVelocityPercent(sound.volumeKey)
        });
      });
    }
  }, {
    key: "getVelocityPercent",
    value: function getVelocityPercent(kind) {
      var value = Number(GameAudio.VELOCITY[kind]);
      if (!Number.isFinite(value)) return 0;
      return Math.max(0, Math.min(100, Math.round(value * 100)));
    }
  }, {
    key: "setVelocityPercent",
    value: function setVelocityPercent(kind, percent) {
      var next = Math.max(0, Math.min(100, Number(percent) || 0));
      if (!Object.prototype.hasOwnProperty.call(GameAudio.VELOCITY, kind)) return 0;
      GameAudio.VELOCITY[kind] = next / 100;
      return next;
    }
  }, {
    key: "previewSound",
    value: function () {
      var _previewSound = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(soundId) {
        var _previewers$soundId;
        var previewers;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (window.Tone) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.n = 2;
              return Tone.start();
            case 2:
              previewers = {
                staffNote: function staffNote() {
                  GameAudio._getPreviewSynth("staffNote", function () {
                    return GameAudio.createStaffNoteSynth();
                  }).triggerAttackRelease("C4", 0.5, undefined, GameAudio.scale("staffNote", 1));
                },
                accidentalGrab: function accidentalGrab() {
                  GameAudio._getPreviewSynth("staffNoise", function () {
                    return GameAudio.createStaffNoiseSynth();
                  }).triggerAttackRelease(0.06, Tone.now(), GameAudio.scale("accidentalGrab", 0.5));
                },
                dictation: function dictation() {
                  GameAudio._getPreviewSynth("dictation", function () {
                    return GameAudio.createDictationSynth();
                  }).triggerAttackRelease(["C4", "E4"], 0.3, undefined, GameAudio.scale("dictation", 1));
                },
                sequence: function sequence() {
                  GameAudio._getPreviewSynth("sequence", function () {
                    return GameAudio.createSequenceSynth();
                  }).triggerAttackRelease(["C4", "G4"], 0.26, undefined, GameAudio.scale("sequence", 1));
                },
                successBasic: function successBasic() {
                  var synth = GameAudio._getPreviewSynth("uiPoly", function () {
                    return GameAudio.createUiPolySynth();
                  });
                  var now = Tone.now();
                  ["C6", "E6", "G6"].forEach(function (n, i) {
                    synth.triggerAttackRelease(n, 0.07, now + i * 0.05, GameAudio.scale("successBasic", 0.42));
                  });
                },
                successBonus: function successBonus() {
                  var _synth$get$oscillator;
                  var synth = GameAudio._getPreviewSynth("uiPoly", function () {
                    return GameAudio.createUiPolySynth();
                  });
                  var now = Tone.now();
                  var oldEnv = _objectSpread({}, synth.get().envelope);
                  var oldOsc = (_synth$get$oscillator = synth.get().oscillator) === null || _synth$get$oscillator === void 0 ? void 0 : _synth$get$oscillator.type;
                  try {
                    synth.set({
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
                  var semitoneShift = 3;
                  var toNote = function toNote(midi) {
                    return Tone.Frequency(midi, "midi").toNote();
                  };
                  [62, 66, 69, 73, 74].map(function (m) {
                    return toNote(m + semitoneShift);
                  }).forEach(function (n, i) {
                    synth.triggerAttackRelease(n, 0.06, now + i * 0.045, GameAudio.scale("successBonus", 0.45));
                  });
                  [62, 69, 74, 78].map(function (m) {
                    return toNote(m + semitoneShift);
                  }).forEach(function (n) {
                    synth.triggerAttackRelease(n, 0.12, now + 0.26, GameAudio.scale("successBonus", 0.30));
                  });
                  setTimeout(function () {
                    try {
                      synth.set({
                        oscillator: {
                          type: oldOsc || "triangle"
                        },
                        envelope: oldEnv
                      });
                    } catch (_) {}
                  }, 600);
                },
                failNoise: function failNoise() {
                  GameAudio._getPreviewSynth("uiNoise", function () {
                    return GameAudio.createUiNoiseSynth();
                  }).triggerAttackRelease(0.06, Tone.now(), GameAudio.scale("failNoise", 0.45));
                },
                failNote: function failNote() {
                  var synth = GameAudio._getPreviewSynth("uiPoly", function () {
                    return GameAudio.createUiPolySynth();
                  });
                  var now = Tone.now();
                  synth.triggerAttackRelease("A2", 0.10, now + 0.01, GameAudio.scale("failNote", 0.55));
                  synth.triggerAttackRelease("G2", 0.12, now + 0.08, GameAudio.scale("failNote", 0.6));
                },
                bombFail: function bombFail() {
                  var _synth$get$oscillator2;
                  var synth = GameAudio._getPreviewSynth("uiPoly", function () {
                    return GameAudio.createUiPolySynth();
                  });
                  var noiseSynth = GameAudio._getPreviewSynth("uiNoise", function () {
                    return GameAudio.createUiNoiseSynth();
                  });
                  var now = Tone.now();
                  var oldEnv = _objectSpread({}, synth.get().envelope);
                  var oldOsc = (_synth$get$oscillator2 = synth.get().oscillator) === null || _synth$get$oscillator2 === void 0 ? void 0 : _synth$get$oscillator2.type;
                  try {
                    synth.set({
                      oscillator: {
                        type: "triangle"
                      },
                      envelope: {
                        attack: 0.004,
                        decay: 0.16,
                        sustain: 0.08,
                        release: 0.38
                      }
                    });
                  } catch (_) {}
                  ["E5", "D5", "C5", "A4", "G4", "E4", "D4", "B3", "A3", "F3", "E3"].forEach(function (n, i) {
                    var when = now + i * 0.17;
                    synth.triggerAttackRelease(n, 0.15, when, GameAudio.scale("bombFail", 0.42));
                    if (i < 8) noiseSynth.triggerAttackRelease(0.05, when + 0.015, GameAudio.scale("bombFail", 0.14));
                  });
                  setTimeout(function () {
                    try {
                      synth.set({
                        oscillator: {
                          type: oldOsc || "triangle"
                        },
                        envelope: oldEnv
                      });
                    } catch (_) {}
                  }, 2200);
                },
                "final": function _final() {
                  var _synth$get$oscillator3;
                  var synth = GameAudio._getPreviewSynth("uiPoly", function () {
                    return GameAudio.createUiPolySynth();
                  });
                  var now = Tone.now();
                  var oldEnv = _objectSpread({}, synth.get().envelope);
                  var oldOsc = (_synth$get$oscillator3 = synth.get().oscillator) === null || _synth$get$oscillator3 === void 0 ? void 0 : _synth$get$oscillator3.type;
                  try {
                    synth.set({
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
                  } catch (_) {}
                  ["C5", "E5", "G5", "B5", "D6", "G6"].forEach(function (n, i) {
                    synth.triggerAttackRelease(n, 0.11, now + i * 0.08, GameAudio.scale("final", 0.44));
                  });
                  ["C6", "E6", "G6"].forEach(function (n) {
                    synth.triggerAttackRelease(n, 0.28, now + 0.62, GameAudio.scale("final", 0.5));
                  });
                  setTimeout(function () {
                    try {
                      synth.set({
                        oscillator: {
                          type: oldOsc || "triangle"
                        },
                        envelope: oldEnv
                      });
                    } catch (_) {}
                  }, 1700);
                },
                finalMetric: function finalMetric() {
                  var synth = GameAudio._getPreviewSynth("uiTimer", function () {
                    return GameAudio.createUiTimerSynth();
                  });
                  var now = Tone.now();
                  synth.triggerAttackRelease("G5", 0.055, now, GameAudio.scale("finalMetric", 0.44));
                  synth.triggerAttackRelease("C6", 0.045, now + 0.03, GameAudio.scale("finalMetric", 0.34));
                },
                perfectBonus: function perfectBonus() {
                  var _synth$get$oscillator4;
                  var synth = GameAudio._getPreviewSynth("uiPoly", function () {
                    return GameAudio.createUiPolySynth();
                  });
                  var now = Tone.now();
                  var oldEnv = _objectSpread({}, synth.get().envelope);
                  var oldOsc = (_synth$get$oscillator4 = synth.get().oscillator) === null || _synth$get$oscillator4 === void 0 ? void 0 : _synth$get$oscillator4.type;
                  try {
                    synth.set({
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
                  ["C5", "E5", "G5", "C6", "E6", "G6", "C7"].forEach(function (n, i) {
                    synth.triggerAttackRelease(n, 0.09, now + i * 0.06, GameAudio.scale("perfectBonus", 0.62));
                  });
                  setTimeout(function () {
                    try {
                      synth.set({
                        oscillator: {
                          type: oldOsc || "triangle"
                        },
                        envelope: oldEnv
                      });
                    } catch (_) {}
                  }, 1400);
                },
                runStart: function runStart() {
                  var synth = GameAudio._getPreviewSynth("uiPoly", function () {
                    return GameAudio.createUiPolySynth();
                  });
                  var now = Tone.now();
                  var toNote = function toNote(m) {
                    return Tone.Frequency(m, "midi").toNote();
                  };
                  [[[0, 7], 0.00, 0.19, 0.20], [[3, 7], 0.24, 0.06, 0.18], [[0, 5, 10], 0.38, 0.18, 0.22], [[2, 5, 9], 0.62, 0.06, 0.18], [[0, 7, 12], 0.76, 0.15, 0.22]].forEach(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 4),
                      intervals = _ref2[0],
                      t = _ref2[1],
                      dur = _ref2[2],
                      vel = _ref2[3];
                    synth.triggerAttackRelease(intervals.map(function (i) {
                      return toNote(60 + i);
                    }), dur, now + t, GameAudio.scale("runStart", vel));
                  });
                },
                timerBeep: function timerBeep() {
                  GameAudio._getPreviewSynth("uiTimer", function () {
                    return GameAudio.createUiTimerSynth();
                  }).triggerAttackRelease("C6", 0.06, Tone.now(), GameAudio.scale("timerBeep", 0.5));
                },
                timerTimeUp: function timerTimeUp() {
                  var timerSynth = GameAudio._getPreviewSynth("uiTimer", function () {
                    return GameAudio.createUiTimerSynth();
                  });
                  var noiseSynth = GameAudio._getPreviewSynth("uiNoise", function () {
                    return GameAudio.createUiNoiseSynth();
                  });
                  var now = Tone.now();
                  noiseSynth.triggerAttackRelease(0.12, now, GameAudio.scale("timerTimeUp", 0.2));
                  timerSynth.triggerAttackRelease("G4", 0.11, now, GameAudio.scale("timerTimeUp", 0.72));
                  timerSynth.triggerAttackRelease("E4", 0.13, now + 0.10, GameAudio.scale("timerTimeUp", 0.76));
                  timerSynth.triggerAttackRelease("C4", 0.18, now + 0.22, GameAudio.scale("timerTimeUp", 0.82));
                },
                countdownBeep: function countdownBeep() {
                  GameAudio._getPreviewSynth("uiTimer", function () {
                    return GameAudio.createUiTimerSynth();
                  }).triggerAttackRelease("B5", 0.06, Tone.now(), GameAudio.scale("countdownBeep", 0.2));
                },
                hinge: function hinge() {
                  var noiseSynth = GameAudio._getPreviewSynth("uiNoise", function () {
                    return GameAudio.createUiNoiseSynth();
                  });
                  var synth = GameAudio._getPreviewSynth("uiTimer", function () {
                    return GameAudio.createUiTimerSynth();
                  });
                  var now = Tone.now();
                  noiseSynth.triggerAttackRelease(0.04, now, GameAudio.scale("hinge", 0.07));
                  synth.triggerAttackRelease("E4", 0.04, now, GameAudio.scale("hinge", 0.12));
                  synth.triggerAttackRelease("C4", 0.05, now + 0.04, GameAudio.scale("hinge", 0.16));
                }
              };
              (_previewers$soundId = previewers[soundId]) === null || _previewers$soundId === void 0 || _previewers$soundId.call(previewers);
            case 3:
              return _context.a(2);
          }
        }, _callee);
      }));
      function previewSound(_x) {
        return _previewSound.apply(this, arguments);
      }
      return previewSound;
    }()
  }, {
    key: "createUiPolySynth",
    value: function createUiPolySynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "triangle"
        },
        envelope: {
          attack: 0.005,
          decay: 0.12,
          sustain: 0.0,
          release: 0.25
        },
        volume: GameAudio.SYNTH_VOLUME_DB.uiPoly
      }).toDestination();
    }
  }, {
    key: "createUiNoiseSynth",
    value: function createUiNoiseSynth() {
      return new Tone.NoiseSynth({
        noise: {
          type: "pink"
        },
        envelope: {
          attack: 0.001,
          decay: 0.08,
          sustain: 0.0,
          release: 0.06
        },
        volume: GameAudio.SYNTH_VOLUME_DB.uiNoise
      }).toDestination();
    }
  }, {
    key: "createUiTimerSynth",
    value: function createUiTimerSynth() {
      return new Tone.Synth({
        oscillator: {
          type: "square"
        },
        envelope: {
          attack: 0.001,
          decay: 0.03,
          sustain: 0.0,
          release: 0.06
        },
        volume: GameAudio.SYNTH_VOLUME_DB.uiTimer
      }).toDestination();
    }
  }, {
    key: "createStaffNoteSynth",
    value: function createStaffNoteSynth() {
      return new Tone.Synth({
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.01,
          decay: 0.08,
          sustain: 0.6,
          release: 0.12
        },
        volume: GameAudio.SYNTH_VOLUME_DB.staffNote
      }).toDestination();
    }
  }, {
    key: "createStaffNoiseSynth",
    value: function createStaffNoiseSynth() {
      return new Tone.NoiseSynth({
        noise: {
          type: "white"
        },
        envelope: {
          attack: 0.001,
          decay: 0.05,
          sustain: 0.0,
          release: 0.04
        },
        volume: GameAudio.SYNTH_VOLUME_DB.staffNoise
      }).toDestination();
    }
  }, {
    key: "createDictationSynth",
    value: function createDictationSynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.01,
          decay: 0.08,
          sustain: 0.35,
          release: 0.25
        },
        volume: GameAudio.SYNTH_VOLUME_DB.dictation
      }).toDestination();
    }
  }, {
    key: "createSequenceSynth",
    value: function createSequenceSynth() {
      return new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.01,
          decay: 0.08,
          sustain: 0.35,
          release: 0.25
        },
        volume: GameAudio.SYNTH_VOLUME_DB.sequence
      }).toDestination();
    }
  }, {
    key: "_getPreviewSynth",
    value: function _getPreviewSynth(key, factory) {
      if (!GameAudio._previewSynths[key]) {
        GameAudio._previewSynths[key] = factory();
      }
      return GameAudio._previewSynths[key];
    }
  }]);
}();
// Tweak these values to rebalance the whole app.
_defineProperty(GameAudio, "SYNTH_VOLUME_DB", {
  uiPoly: -10,
  uiNoise: -16,
  uiTimer: -14,
  staffNote: -8,
  staffNoise: -14,
  dictation: -9,
  sequence: -9
});
_defineProperty(GameAudio, "VELOCITY", {
  staffNote: 1.0,
  accidentalGrab: 0.45,
  dictation: 1.0,
  sequence: 1.0,
  successBasic: 0.7,
  successBonus: 0.7,
  failNoise: 1,
  failNote: 1,
  bombFail: 1,
  "final": 0.5,
  finalMetric: 0.85,
  perfectBonus: 0.25,
  runStart: 0.9,
  timerBeep: 0.7,
  timerTimeUp: 0.95,
  countdownBeep: 1,
  hinge: 0.55
});
_defineProperty(GameAudio, "SOUND_LIBRARY", [{
  id: "staffNote",
  label: "Staff Note",
  volumeKey: "staffNote",
  description: "Base loudness for staff note playback."
}, {
  id: "accidentalGrab",
  label: "Accidental Grab",
  volumeKey: "accidentalGrab",
  description: "Grab/tap feedback when picking up an accidental."
}, {
  id: "dictation",
  label: "Dictation",
  volumeKey: "dictation",
  description: "Dictation playback loudness in PitchDetective."
}, {
  id: "sequence",
  label: "Sequence",
  volumeKey: "sequence",
  description: "Sequence playback loudness in ToneTrek and similar games."
}, {
  id: "successBasic",
  label: "Success",
  volumeKey: "successBasic",
  description: "Normal correct-answer sound."
}, {
  id: "successBonus",
  label: "Streak Bonus",
  volumeKey: "successBonus",
  description: "Streak / bonus correct-answer sound."
}, {
  id: "failNoise",
  label: "Fail Noise",
  volumeKey: "failNoise",
  description: "Noise portion of the fail sound."
}, {
  id: "failNote",
  label: "Fail Notes",
  volumeKey: "failNote",
  description: "Pitched portion of the fail sound."
}, {
  id: "bombFail",
  label: "Bomb Hit",
  volumeKey: "bombFail",
  description: "Long stumbling fail sound when the snake hits a bomb."
}, {
  id: "final",
  label: "Final Results",
  volumeKey: "final",
  description: "Final results reveal fanfare."
}, {
  id: "finalMetric",
  label: "Metric Pop",
  volumeKey: "finalMetric",
  description: "Small pop sound as each final metric box appears."
}, {
  id: "perfectBonus",
  label: "Perfect Bonus",
  volumeKey: "perfectBonus",
  description: "Extra reward sound for perfect/no-mistakes games."
}, {
  id: "runStart",
  label: "Run Start",
  volumeKey: "runStart",
  description: "Opening fanfare at the start of a run/countdown."
}, {
  id: "timerBeep",
  label: "Timer Warning",
  volumeKey: "timerBeep",
  description: "Repeating warning beep in the last timer seconds."
}, {
  id: "timerTimeUp",
  label: "Time Up",
  volumeKey: "timerTimeUp",
  description: "Stronger sound when the timer actually runs out."
}, {
  id: "countdownBeep",
  label: "Countdown Tick",
  volumeKey: "countdownBeep",
  description: "Simple 3-2-1 countdown tick sound."
}, {
  id: "hinge",
  label: "Hinge",
  volumeKey: "hinge",
  description: "Short hinge/fall sound used by ToneTrek block reveals."
}]);
_defineProperty(GameAudio, "_previewSynths", {});

/***/ },

/***/ "./resources/js/music/games/shared/PromptUi.js"
/*!*****************************************************!*\
  !*** ./resources/js/music/games/shared/PromptUi.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PromptUi: () => (/* binding */ PromptUi)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var PromptUi = /*#__PURE__*/function () {
  function PromptUi() {
    var rootSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#prompt";
    _classCallCheck(this, PromptUi);
    this.$root = $(rootSelector).first();
    this.$short = $("#prompt-short");
    if (!this.$short.length) this.$short = this.$root.find("label").first();
    this.$direction = $("#prompt-direction");
    if (!this.$direction.length) this.$direction = this.$root.find("i").first();
    this.$long = $("#prompt-long");
    if (!this.$long.length) this.$long = this.$root.find("div").last();
  }
  return _createClass(PromptUi, [{
    key: "show",
    value: function show() {
      this.$root.show();
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$root.hide();
      return this;
    }
  }, {
    key: "setShort",
    value: function setShort(value) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$html = _ref.html,
        html = _ref$html === void 0 ? false : _ref$html;
      if (!this.$short.length) return this;
      if (html) this.$short.html(value !== null && value !== void 0 ? value : "");else this.$short.text(value !== null && value !== void 0 ? value : "");
      return this;
    }
  }, {
    key: "getShortText",
    value: function getShortText() {
      return this.$short.length ? this.$short.text() : "";
    }
  }, {
    key: "setLong",
    value: function setLong(value) {
      if (this.$long.length) this.$long.text(value !== null && value !== void 0 ? value : "");
      return this;
    }
  }, {
    key: "clearLong",
    value: function clearLong() {
      if (this.$long.length) this.$long.text("");
      return this;
    }
  }, {
    key: "showDirection",
    value: function showDirection() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      if (!this.$direction.length) return this;
      this.$direction.show().removeClass("fa-up-long fa-down-long").addClass(Number(direction) === -1 ? "fa-down-long" : "fa-up-long");
      return this;
    }
  }, {
    key: "hideDirection",
    value: function hideDirection() {
      if (this.$direction.length) this.$direction.hide();
      return this;
    }
  }, {
    key: "setTone",
    value: function setTone() {
      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "blue";
      this.$root.removeClass("incorrect");
      if (color === "red" || color === "incorrect") this.$root.addClass("incorrect");
      return this;
    }
  }]);
}();

/***/ },

/***/ "./resources/js/music/games/shared/finalResults.js"
/*!*********************************************************!*\
  !*** ./resources/js/music/games/shared/finalResults.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFinalResultsOverlay: () => (/* binding */ renderFinalResultsOverlay)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function renderFinalResultsOverlay(_ref) {
  var _window;
  var $finalOverlay = _ref.$finalOverlay,
    _ref$rounds = _ref.rounds,
    rounds = _ref$rounds === void 0 ? 0 : _ref$rounds,
    _ref$score = _ref.score,
    score = _ref$score === void 0 ? 0 : _ref$score,
    _ref$accuracy = _ref.accuracy,
    accuracy = _ref$accuracy === void 0 ? 0 : _ref$accuracy,
    _ref$durationSec = _ref.durationSec,
    durationSec = _ref$durationSec === void 0 ? 0 : _ref$durationSec,
    _ref$clearCountupTime = _ref.clearCountupTimers,
    clearCountupTimers = _ref$clearCountupTime === void 0 ? null : _ref$clearCountupTime,
    _ref$countupTimers = _ref.countupTimers,
    countupTimers = _ref$countupTimers === void 0 ? null : _ref$countupTimers,
    _ref$animateMetrics = _ref.animateMetrics,
    animateMetrics = _ref$animateMetrics === void 0 ? null : _ref$animateMetrics,
    _ref$playFinalSfx = _ref.playFinalSfx,
    playFinalSfx = _ref$playFinalSfx === void 0 ? null : _ref$playFinalSfx;
  if (!$finalOverlay || !$finalOverlay.length) return;
  var CountUpCtor = (_window = window) === null || _window === void 0 || (_window = _window.CountUp) === null || _window === void 0 ? void 0 : _window.CountUp;
  var DURATION = 3.5;
  if (typeof clearCountupTimers === "function") clearCountupTimers();
  var setMetricAnimationDelays = function setMetricAnimationDelays() {
    var $boxes = $finalOverlay.find("#metrics-boxes > div");
    if (!$boxes.length) return;
    var BASE_DELAY_MS = 260;
    var STEP_DELAY_MS = 260;
    $boxes.each(function (i, el) {
      var delayMs = BASE_DELAY_MS + i * STEP_DELAY_MS;
      el.style.animationDelay = "".concat(delayMs, "ms");
    });
  };
  var mmss = function mmss(secs) {
    var v = Math.max(0, Math.floor(Number(secs) || 0));
    var mm = String(Math.floor(v / 60)).padStart(2, "0");
    var ss = String(v % 60).padStart(2, "0");
    return "".concat(mm, ":").concat(ss);
  };
  var pushCountupTimer = function pushCountupTimer(id) {
    if (Array.isArray(countupTimers)) countupTimers.push(id);
  };
  var countTo = function countTo(selector, endVal) {
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var el = $finalOverlay.find(selector)[0];
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
    pushCountupTimer(tid);
  };
  var $greeting = $finalOverlay.find("#result-greeting");
  var $greetingTitle = $greeting.find("h1");
  var $greetingSubtitle = $greeting.find("h6");
  var $resultImg = $finalOverlay.find("img").first();
  var defaultTitle = "Great job!";
  var defaultSubtitle = "It's not about getting the most points, but if it was...";
  if (accuracy < 50) {
    $greetingTitle.text("Keep going!");
    $greetingSubtitle.text("That round was tough, but your next one can be much better.");
    if ($resultImg.length) {
      var cur = String($resultImg.attr("src") || "");
      if (cur.includes("trophy.svg")) $resultImg.attr("src", cur.replace("trophy.svg", "plant.svg"));
    }
  } else {
    $greetingTitle.text(defaultTitle);
    $greetingSubtitle.text(defaultSubtitle);
    if ($resultImg.length) {
      var _cur = String($resultImg.attr("src") || "");
      if (_cur.includes("plant.svg")) $resultImg.attr("src", _cur.replace("plant.svg", "trophy.svg"));
    }
  }
  $finalOverlay.show();
  if (typeof animateMetrics === "function") animateMetrics();else setMetricAnimationDelays();
  countTo('span[name="rounds"]', rounds);
  countTo('span[name="score"]', score);
  countTo('span[name="accuracy"]', accuracy, {
    suffix: "%"
  });
  countTo('span[name="duration"]', durationSec, {
    formattingFn: mmss
  });
  if (typeof playFinalSfx === "function") playFinalSfx();
}

/***/ },

/***/ "./resources/js/music/games/shared/mojsEffects.js"
/*!********************************************************!*\
  !*** ./resources/js/music/games/shared/mojsEffects.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   playBurstConfettiAtElement: () => (/* binding */ playBurstConfettiAtElement),
/* harmony export */   playSmokePuffAtElement: () => (/* binding */ playSmokePuffAtElement),
/* harmony export */   playSnakeCellBreakBurstAtElement: () => (/* binding */ playSnakeCellBreakBurstAtElement)
/* harmony export */ });
function playBurstConfettiAtElement(targetEl) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$parentEl = _ref.parentEl,
    parentEl = _ref$parentEl === void 0 ? document.body : _ref$parentEl,
    _ref$index = _ref.index,
    index = _ref$index === void 0 ? 0 : _ref$index;
  var mojs = window.mojs;
  if (!mojs || !targetEl) return;
  var parentRect = parentEl.getBoundingClientRect();
  var rect = targetEl.getBoundingClientRect();
  var x = rect.left - parentRect.left + rect.width / 2;
  var y = rect.top - parentRect.top + rect.height / 2;
  var countBoost = Math.min(18, Math.max(0, Number(index) || 0));
  var burst = new mojs.Burst({
    parent: parentEl,
    left: 0,
    top: 0,
    radius: {
      6: 56
    },
    angle: 45,
    count: 22 + countBoost,
    zIndex: 5,
    children: {
      radius: "rand(3,6)",
      fill: "#ffe54c",
      scale: {
        2: 0,
        easing: "quad.in"
      },
      pathScale: [1.8, null],
      degreeShift: [13, null],
      duration: [500, 760],
      easing: "quint.out",
      isForce3d: true
    }
  });
  burst.tune({
    x: x,
    y: y
  }).replay();
}
var smokeBurstCache = new WeakMap();
function _getSmokeBurst(parentEl) {
  var mojs = window.mojs;
  if (!mojs || !mojs.Burst || !parentEl) return null;
  var cached = smokeBurstCache.get(parentEl);
  if (cached) return cached;
  var DURATION = 400;
  var smoke = new mojs.Burst({
    parent: parentEl,
    left: 0,
    top: 0,
    degree: 0,
    count: 3,
    radius: {
      0: 100
    },
    children: {
      fill: "black",
      pathScale: "rand(0.5, 1)",
      radius: "rand(12, 15)",
      swirlSize: "rand(10, 15)",
      swirlFrequency: "rand(2, 4)",
      direction: [1, -1],
      duration: "rand(".concat(1 * DURATION, ", ").concat(2 * DURATION, ")"),
      delay: "rand(0, 75)",
      easing: "quad.out",
      isSwirl: true,
      isForce3d: true
    }
  });
  smokeBurstCache.set(parentEl, smoke);
  return smoke;
}
function playSmokePuffAtElement(targetEl) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref2$parentEl = _ref2.parentEl,
    parentEl = _ref2$parentEl === void 0 ? document.body : _ref2$parentEl;
  var mojs = window.mojs;
  if (!mojs || !targetEl || !parentEl) return;
  var parentRect = parentEl.getBoundingClientRect();
  var rect = targetEl.getBoundingClientRect();
  var x = rect.left - parentRect.left + rect.width / 2;
  var y = rect.top - parentRect.top + rect.height / 2;
  var smoke = _getSmokeBurst(parentEl);
  if (!smoke) return;
  smoke.tune({
    x: x,
    y: y
  }).generate().replay();
}
function playSnakeCellBreakBurstAtElement(targetEl) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref3$parentEl = _ref3.parentEl,
    parentEl = _ref3$parentEl === void 0 ? document.body : _ref3$parentEl,
    _ref3$index = _ref3.index,
    index = _ref3$index === void 0 ? 0 : _ref3$index;
  var mojs = window.mojs;
  if (!mojs || !targetEl || !parentEl) return;
  var parentRect = parentEl.getBoundingClientRect();
  var rect = targetEl.getBoundingClientRect();
  var x = rect.left - parentRect.left + rect.width / 2;
  var y = rect.top - parentRect.top + rect.height / 2;
  var boost = Math.min(4, Math.max(0, Number(index) || 0));
  var yellowShards = new mojs.Burst({
    parent: parentEl,
    left: 0,
    top: 0,
    x: x,
    y: y,
    count: 14 + boost,
    radius: {
      0: 62 + boost * 9
    },
    zIndex: 9,
    children: {
      shape: "rect",
      fill: "#ffe54c",
      radius: "rand(8.5,15.5)",
      pathScale: [1, 0.3],
      degreeShift: "rand(-28,28)",
      duration: "rand(760,1100)",
      delay: "rand(0,85)",
      easing: "quart.out",
      isForce3d: true
    }
  });
  var blackBits = new mojs.Burst({
    parent: parentEl,
    left: 0,
    top: 0,
    x: x,
    y: y,
    count: 18 + boost,
    radius: {
      0: 74 + boost * 10
    },
    zIndex: 9,
    children: {
      shape: "circle",
      fill: "black",
      radius: "rand(7.2,13.2)",
      pathScale: [1.1, 0.35],
      degreeShift: "rand(-35,35)",
      duration: "rand(820,1200)",
      delay: "rand(0,95)",
      easing: "quint.out",
      isForce3d: true
    }
  });
  new mojs.Timeline().add(yellowShards, blackBits).play();
}

/***/ },

/***/ "./resources/js/music/games/tonetrek/ToneTrek.js"
/*!*******************************************************!*\
  !*** ./resources/js/music/games/tonetrek/ToneTrek.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToneTrek: () => (/* binding */ ToneTrek)
/* harmony export */ });
/* harmony import */ var _shared_finalResults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/finalResults.js */ "./resources/js/music/games/shared/finalResults.js");
/* harmony import */ var _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../base/BaseStaffGame.js */ "./resources/js/music/games/base/BaseStaffGame.js");
/* harmony import */ var _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
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



var ToneTrek = /*#__PURE__*/function () {
  function ToneTrek() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ToneTrek);
    var defaults = {
      tableEl: "table.table",
      pathLength: 9,
      maxGenerateAttempts: 2000,
      maxStraightRun: 3,
      intervals: null,
      initialNotes: null,
      allowAccidentals: false,
      solfege: false,
      sound: true,
      basePoints: 1,
      firstTryBonus: 2,
      numOfChallenges: 4,
      namespace: "toneTrek"
    };
    this.opts = _objectSpread(_objectSpread({}, defaults), options || {});
    this.opts.numOfChallenges = this._normalizeNumOfChallenges(this.opts.numOfChallenges);
    this.$table = $(this.opts.tableEl).first();
    this.$musicKeyboard = $("#music-keyboard").first();
    this.$feedback = $("#feedback-success");
    this.$helpBtn = $("#help");
    this.$skipWrap = $("#skip");
    this.$skipBtn = this.$skipWrap.find("button");
    this.$checkWrap = $("#check");
    this.$checkBtn = $("#check button");
    this.$continueWrap = $("#continue");
    this.$continueBtn = $("#continue button");
    this.$timeupMessage = $("#timeup-message");
    this.$timer = $("#timer");
    this.$timerBox = this.$timer.children("div").first();
    this.$timerText = this.$timer.find("span");
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$points = $("#points");
    this.$finalOverlay = $("#final-overlay");
    this.$doublePoints = $("#double-points");
    this.ns = this.opts.namespace || "toneTrek";
    this._audioReady = false;
    this._synth = null;
    this._uiSfxReady = false;
    this._uiSfxSynth = null;
    this._uiSfxNoise = null;
    this._uiTimerSfxSynth = null;
    this._audioUnlockArmed = false;
    this._revealTimeouts = [];
    this._timerTimeoutId = null;
    this._timerRemainingSec = 0;
    this._timerEndsAtMs = 0;
    this._keyboardHideTimer = null;
    this._suppressKeyboardHideUntil = 0;
    this.$activeBlockInput = null;
    this.$activeBlockCell = null;
    this._instructionsDismissed = false;
    this._correctionMode = false;
    this._wrongEditableIndexes = new Set();
    this._finalStartMs = Date.now();
    this._currentRound = 1;
    this._roundLocked = false;
    this._usedHintThisRound = false;
    this._madeMistakeThisRound = false;
    this._madeAnyMistake = false;
    this._clearCorrectStreak();
    this._points = 0;
    this._stats = {
      checksTotal: 0,
      checksCorrect: 0,
      finishedAtMs: null
    };
    this._roundAnswerKey = {};
    this._roundRecords = [];
    this._finalMetricsSfxTimeouts = [];
    this._finalCountupTimeouts = [];
    this._instructionsDismissed = false;
    this._correctionMode = false;
    this._wrongEditableIndexes = new Set();
  }
  return _createClass(ToneTrek, [{
    key: "start",
    value: function start() {
      if (!this.$table.length) return;
      this._wireControls();
      this._wireNoteInputUx();
      this._wireIntervalBlocks();
      this._showStandardGameUi();
      this._resetRunUi();
      this._startRound();
    }
  }, {
    key: "_normalizeNumOfChallenges",
    value: function _normalizeNumOfChallenges(raw) {
      var n = Number(raw);
      var safe = Number.isFinite(n) ? Math.trunc(n) : 4;
      if (safe < ToneTrek.MIN_CHALLENGES) return ToneTrek.MIN_CHALLENGES;
      if (safe > ToneTrek.MAX_CHALLENGES) return ToneTrek.MAX_CHALLENGES;
      return safe;
    }
  }, {
    key: "_resetRunUi",
    value: function _resetRunUi() {
      var _this$$doublePoints, _this$$doublePoints$h;
      this._finalStartMs = Date.now();
      this._currentRound = 1;
      this._roundLocked = false;
      this._usedHintThisRound = false;
      this._madeMistakeThisRound = false;
      this._madeAnyMistake = false;
      this._clearCorrectStreak();
      this._points = 0;
      this._stats = {
        checksTotal: 0,
        checksCorrect: 0,
        finishedAtMs: null
      };
      this._roundAnswerKey = {};
      this._roundRecords = [];
      this._clearFinalMetricsSfxTimers();
      this._clearFinalCountupTimers();
      this._syncPracticeUi();
      this.$points.text("0");
      this.$feedback.hide();
      this.$helpBtn.hide();
      this.$skipWrap.hide();
      this.$continueWrap.hide();
      this._hideTimeUpMessage();
      this._setTimedOutInteractivityDisabled(false);
      this.$finalOverlay.hide();
      (_this$$doublePoints = this.$doublePoints) === null || _this$$doublePoints === void 0 || (_this$$doublePoints$h = _this$$doublePoints.hide) === null || _this$$doublePoints$h === void 0 || _this$$doublePoints$h.call(_this$$doublePoints);
      this.$checkBtn.text("Check my answer");
      this.$progressBar.data("progress", 0).css({
        width: "0%"
      });
      this.$progressCounter.text(this._isPracticeMode() ? "Practice" : "0 of ".concat(this.opts.numOfChallenges));
      if (this._isTimerEnabled()) this.$timer.show();else this.$timer.hide();
    }
  }, {
    key: "_startRound",
    value: function _startRound() {
      this._roundLocked = false;
      this._correctionMode = false;
      this._wrongEditableIndexes = new Set();
      this._usedHintThisRound = false;
      this._madeMistakeThisRound = false;
      this.$helpBtn.hide();
      this.$skipWrap.hide();
      this.$continueWrap.hide();
      this.$feedback.hide();
      this.$checkWrap.show().removeClass("invisible");
      this._armUiSfxOnFirstGesture();
      this._syncKeyboardLabels();
      this._hideTimeUpMessage();
      this._setTimedOutInteractivityDisabled(false);
      this._hideMusicKeyboard();
      this._clearActiveBlockInput();
      var $rows = this.$table.find("tbody tr");
      var rowCount = $rows.length;
      var colCount = rowCount ? $rows.first().find("td").length : 0;
      if (!rowCount || !colCount) return;
      this._clearRevealTimers();
      this.$table.find("td").removeClass("block interval-block initial-block").removeAttr("id").empty();
      this._hideAllCellsVisual();
      var maxCells = rowCount * colCount;
      var pathLength = Math.max(1, Math.min(maxCells, Number(this.opts.pathLength) || 9));
      var layout = this._buildRoundLayout({
        rowCount: rowCount,
        colCount: colCount,
        pathLength: pathLength
      });
      if (!layout) return;
      var revealItems = layout.revealItems;
      this._roundAnswerKey = layout.answerKey || {};
      this._revealPathCells(revealItems);
      if (this._isTimerEnabled()) this._resetRoundTimerIfEnabled();else {
        this._stopGameTimer();
        this.$timer.hide();
      }
    }
  }, {
    key: "_buildRoundLayout",
    value: function _buildRoundLayout(_ref) {
      var rowCount = _ref.rowCount,
        colCount = _ref.colCount,
        pathLength = _ref.pathLength;
      var maxAttempts = Math.max(1, Number(this.opts.maxGenerateAttempts) || 2000);
      var maxStraightRun = Math.max(1, Number(this.opts.maxStraightRun) || 3);
      var intervalPool = this._intervalPool();
      for (var attempt = 0; attempt < maxAttempts; attempt += 1) {
        var path = this._generatePath({
          rowCount: rowCount,
          colCount: colCount,
          length: pathLength,
          maxAttempts: 1,
          maxStraightRun: maxStraightRun
        });
        if (!path) continue;
        var initialRaw = this._pickInitialNote();
        var initialNote = this._parseSpelledNote(initialRaw) || this._parseSpelledNote("C");
        if (!initialNote) continue;
        var revealItems = [];
        var answerKey = {};
        var prevExpected = initialNote;
        var failed = false;
        for (var i = 0; i < path.length; i += 1) {
          var cell = path[i];
          if (i === 0) {
            var next = path[1] || null;
            var arrowClass = this._arrowClassForNextStep(cell, next);
            revealItems.push({
              r: cell.r,
              c: cell.c,
              i: i,
              cls: "initial-block",
              html: "<div><span>START HERE</span><input type=\"text\" name=\"note\" value=\"".concat(this._noteDisplay(initialNote), "\" disabled=\"\"><i class=\"fa-solid ").concat(arrowClass, "\"></i></div>")
            });
            continue;
          }
          if (i % 2 === 1) {
            var pickedInterval = null;
            var pickedDir = null;
            var nextExpected = null;
            var localAttempts = Math.max(8, intervalPool.length * 3);
            for (var t = 0; t < localAttempts; t += 1) {
              var interval = intervalPool[Math.floor(Math.random() * intervalPool.length)];
              var dir = Math.random() < 0.5 ? -1 : 1;
              var candidate = this._spelledIntervalTarget(prevExpected, interval, dir);
              if (!candidate) continue;
              pickedInterval = interval;
              pickedDir = dir;
              nextExpected = candidate;
              break;
            }
            if (!pickedInterval || !nextExpected) {
              failed = true;
              break;
            }
            answerKey[i + 1] = nextExpected;
            prevExpected = nextExpected;
            revealItems.push({
              r: cell.r,
              c: cell.c,
              i: i,
              cls: "interval-block",
              html: "<div><button type=\"button\" data-interval=\"".concat(pickedInterval, "\"><i class=\"fa-solid fa-volume-up\"></i></button><span interval>").concat(pickedInterval, "</span><span direction>").concat(pickedDir === -1 ? "DOWN" : "UP", "</span></div>")
            });
            continue;
          }
          revealItems.push({
            r: cell.r,
            c: cell.c,
            i: i,
            cls: "block",
            html: "<div><span style=\"opacity: 0.2; font-size: 1rem;\">ADD NOTE HERE</span><input type=\"text\" name=\"note\"></div>"
          });
        }
        if (!failed) return {
          revealItems: revealItems,
          answerKey: answerKey
        };
      }
      return null;
    }
  }, {
    key: "_intervalPool",
    value: function _intervalPool() {
      var fromOptions = Array.isArray(this.opts.intervals) ? this.opts.intervals.filter(Boolean).map(function (x) {
        return String(x).trim();
      }) : [];
      return fromOptions.length ? fromOptions : ToneTrek.INTERVALS_FALLBACK.slice();
    }
  }, {
    key: "_normalizeOnOff",
    value: function _normalizeOnOff(v) {
      if (v === true) return true;
      var s = String(v !== null && v !== void 0 ? v : "").trim().toLowerCase();
      return s === "on" || s === "true" || s === "1";
    }
  }, {
    key: "_readBoolSetting",
    value: function _readBoolSetting(key) {
      var _this$opts;
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var direct = (_this$opts = this.opts) === null || _this$opts === void 0 ? void 0 : _this$opts[key];
      if (direct !== undefined && direct !== null && String(direct).trim() !== "") {
        return this._normalizeOnOff(direct);
      }
      try {
        var qs = new URLSearchParams(window.location.search || "");
        if (qs.has(key)) return this._normalizeOnOff(qs.get(key));
      } catch (_) {}
      return !!fallback;
    }
  }, {
    key: "_isSolfegeEnabled",
    value: function _isSolfegeEnabled() {
      return this._readBoolSetting("solfege", false);
    }
  }, {
    key: "_allowsInitialAccidentals",
    value: function _allowsInitialAccidentals() {
      return this._readBoolSetting("allowAccidentals", false);
    }
  }, {
    key: "_noteDisplay",
    value: function _noteDisplay(noteObj) {
      if (!noteObj) return "";
      var letter = String(noteObj.letter || "").toUpperCase();
      var base = this._isSolfegeEnabled() ? ToneTrek.LETTER_TO_SOLFEGE[letter] || letter : letter;
      return "".concat(base).concat(this._accidentalDisplayFromOffset(Number(noteObj.accOffset) || 0));
    }
  }, {
    key: "_syncKeyboardLabels",
    value: function _syncKeyboardLabels() {
      if (!this.$musicKeyboard || !this.$musicKeyboard.length) return;
      var useSolfege = this._isSolfegeEnabled();
      this.$musicKeyboard.find("button[data-lettername]").each(function (_, el) {
        var $btn = $(el);
        var letter = String($btn.attr("data-lettername") || "").trim().toUpperCase();
        var sol = String($btn.attr("data-solfege") || "").trim();
        var label = useSolfege ? sol ? sol.charAt(0).toUpperCase() + sol.slice(1).toLowerCase() : ToneTrek.LETTER_TO_SOLFEGE[letter] || letter : letter;
        $btn.text(label);
      });
    }
  }, {
    key: "_generatePath",
    value: function _generatePath(_ref2) {
      var rowCount = _ref2.rowCount,
        colCount = _ref2.colCount,
        length = _ref2.length,
        maxAttempts = _ref2.maxAttempts,
        maxStraightRun = _ref2.maxStraightRun;
      var dirs = [{
        dr: 1,
        dc: 0
      }, {
        dr: -1,
        dc: 0
      }, {
        dr: 0,
        dc: 1
      }, {
        dr: 0,
        dc: -1
      }];
      for (var attempt = 0; attempt < maxAttempts; attempt += 1) {
        var startCol = Math.floor(Math.random() * colCount);
        var path = [{
          r: 0,
          c: startCol
        }];
        var occupied = new Set(["0,".concat(startCol)]);
        var prevDir = null;
        var sameDirRun = 0;
        while (path.length < length) {
          var cur = path[path.length - 1];
          var candidates = [];
          for (var i = 0; i < dirs.length; i += 1) {
            var dir = dirs[i];
            if (prevDir && dir.dr === prevDir.dr && dir.dc === prevDir.dc && sameDirRun >= maxStraightRun) {
              continue;
            }
            var nr = cur.r + dir.dr;
            var nc = cur.c + dir.dc;
            if (nr < 0 || nr >= rowCount || nc < 0 || nc >= colCount) continue;
            var key = "".concat(nr, ",").concat(nc);
            if (occupied.has(key)) continue;
            var sideNeighbors = this._sideNeighbors(nr, nc, occupied);
            if (sideNeighbors.length !== 1) continue;
            if (sideNeighbors[0] !== "".concat(cur.r, ",").concat(cur.c)) continue;
            candidates.push({
              r: nr,
              c: nc,
              dir: dir
            });
          }
          if (!candidates.length) break;
          var picked = candidates[Math.floor(Math.random() * candidates.length)];
          path.push({
            r: picked.r,
            c: picked.c
          });
          occupied.add("".concat(picked.r, ",").concat(picked.c));
          if (prevDir && picked.dir.dr === prevDir.dr && picked.dir.dc === prevDir.dc) {
            sameDirRun += 1;
          } else {
            prevDir = picked.dir;
            sameDirRun = 1;
          }
        }
        if (path.length === length) return path;
      }
      return null;
    }
  }, {
    key: "_sideNeighbors",
    value: function _sideNeighbors(r, c, occupied) {
      var out = [];
      var neighbors = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]];
      for (var i = 0; i < neighbors.length; i += 1) {
        var key = "".concat(neighbors[i][0], ",").concat(neighbors[i][1]);
        if (occupied.has(key)) out.push(key);
      }
      return out;
    }
  }, {
    key: "_cellAt",
    value: function _cellAt(r, c) {
      var $row = this.$table.find("tbody tr").eq(r);
      return $row.find("td").eq(c);
    }
  }, {
    key: "_pickInitialInterval",
    value: function _pickInitialInterval() {
      var fromOptions = Array.isArray(this.opts.intervals) ? this.opts.intervals.filter(Boolean) : [];
      var pool = fromOptions.length ? fromOptions : ToneTrek.INTERVALS_FALLBACK;
      return String(pool[Math.floor(Math.random() * pool.length)] || "M2");
    }
  }, {
    key: "_arrowClassForNextStep",
    value: function _arrowClassForNextStep(cur, next) {
      if (!cur || !next) return "fa-arrow-right";
      var dr = next.r - cur.r;
      var dc = next.c - cur.c;
      if (dr === 1 && dc === 0) return "fa-arrow-down";
      if (dr === -1 && dc === 0) return "fa-arrow-up";
      if (dr === 0 && dc === 1) return "fa-arrow-right";
      if (dr === 0 && dc === -1) return "fa-arrow-left";
      return "fa-arrow-right";
    }
  }, {
    key: "_pickInitialNote",
    value: function _pickInitialNote() {
      var fromOptions = Array.isArray(this.opts.initialNotes) ? this.opts.initialNotes.filter(Boolean).map(function (x) {
        return String(x).trim();
      }) : [];
      var fallback = ["C", "D", "E", "F", "G", "A", "B"];
      var pool = fromOptions.length ? fromOptions : fallback;
      var picked = String(pool[Math.floor(Math.random() * pool.length)] || "E");
      var parsed = this._parseSpelledNote(picked) || this._parseSpelledNote("E");
      if (!parsed) return "E";
      if (!this._allowsInitialAccidentals()) return "".concat(parsed.letter);
      var accidentalChoices = [0, 0, 0, 1, -1];
      var off = accidentalChoices[Math.floor(Math.random() * accidentalChoices.length)] || 0;
      var acc = off === 1 ? "#" : off === -1 ? "b" : "";
      return "".concat(parsed.letter).concat(acc);
    }
  }, {
    key: "_wireIntervalBlocks",
    value: function _wireIntervalBlocks() {
      var _this = this;
      this.$table.off("click.".concat(this.ns, "Block")).on("click.".concat(this.ns, "Block"), "td.interval-block", function (e) {
        if ($(e.target).closest("button[data-interval]").length) return;
        var $btn = $(e.currentTarget).find('button[data-interval]').first();
        if ($btn.length) $btn.trigger("click");
      });
      this.$table.off("click.".concat(this.ns, "Btn")).on("click.".concat(this.ns, "Btn"), 'td.interval-block button[data-interval]', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $btn = $(e.currentTarget);
        var $cell = $btn.closest("td.interval-block");
        var idx = parseInt($cell.attr("data-path-index"), 10);
        if (!Number.isFinite(idx) || idx <= 0) {
          _this._shakeCell($cell);
          return;
        }
        var $prev = _this.$table.find("td[data-path-index=\"".concat(idx - 1, "\"]")).first();
        var prevMidi = _this._midiFromCell($prev);
        if (!Number.isFinite(prevMidi)) {
          _this._shakeCell($cell);
          return;
        }
        var interval = String($btn.attr("data-interval") || "").trim();
        var dirRaw = String($cell.find("span[direction]").first().text() || "").trim().toUpperCase();
        var dir = dirRaw === "DOWN" ? -1 : 1;
        var semis = _this._intervalToSemitones(interval);
        if (!Number.isFinite(semis)) {
          _this._shakeCell($cell);
          return;
        }
        var secondMidi = prevMidi + dir * semis;
        _this._playDictationLike(prevMidi, secondMidi);
      });
    }
  }, {
    key: "_wireControls",
    value: function _wireControls() {
      var _this2 = this;
      this.$checkBtn.off("click.".concat(this.ns, "Check")).on("click.".concat(this.ns, "Check"), function (e) {
        e.preventDefault();
        _this2._onCheck();
      });
      this.$helpBtn.off("click.".concat(this.ns, "Help")).on("click.".concat(this.ns, "Help"), function (e) {
        e.preventDefault();
        _this2._onHelp();
      });
      this.$continueBtn.off("click.".concat(this.ns, "Continue")).on("click.".concat(this.ns, "Continue"), function (e) {
        e.preventDefault();
        _this2.$continueWrap.hide();
        _this2.$skipWrap.hide();
        _this2._hideTimeUpMessage();
        _this2._setTimedOutInteractivityDisabled(false);
        if (_this2._isPracticeMode()) {
          _this2._currentRound += 1;
          _this2._startRound();
          return;
        }
        if (_this2._currentRound >= _this2.opts.numOfChallenges) {
          _this2._showFinalResults();
          return;
        }
        _this2._currentRound += 1;
        _this2._startRound();
      });
      this.$skipBtn.off("click.".concat(this.ns, "Skip")).on("click.".concat(this.ns, "Skip"), function (e) {
        e.preventDefault();
        _this2._finishRoundAsTimedOut();
      });
    }
  }, {
    key: "_onCheck",
    value: function _onCheck() {
      var _this3 = this;
      if (this._roundLocked) return;
      var evalResult = this._evaluateRoundAnswers();
      this._renderBlockCheckMarks(evalResult);
      var isComplete = this._areAllBlockInputsFilled();
      if (!isComplete) {
        this._failAnimation();
        this._clearCorrectStreak();
        this._playFailSfx();
        this.$helpBtn.show();
        this._madeAnyMistake = true;
        this._madeMistakeThisRound = true;
        return;
      }
      this._recordRoundCheck(evalResult);
      this._stats.checksTotal += 1;
      if (evalResult.correct) {
        this._correctionMode = false;
        this._wrongEditableIndexes = new Set();
        this._stats.checksCorrect += 1;
        var earned = this._awardPointsForCorrect();
        this._finalizeRoundRecord({
          passed: true,
          earned: earned
        });
        this._pauseGameTimer();
        if (this._isPracticeMode()) {
          this._clearCorrectStreak();
          this._playSuccessSfxBasic();
        } else if (!this._usedHintThisRound && !this._madeMistakeThisRound) {
          this._applyCorrectStreakForOutcome({
            firstTry: true
          });
          this._playSuccessSfxBonus();
        } else {
          this._clearCorrectStreak();
          this._playSuccessSfxBasic();
        }
        this._showSuccessAnimation();
        this._updateProgressBar();
        this._roundLocked = true;
        this.$table.find('td.block input[name="note"]').prop("disabled", true);
        this.$helpBtn.hide();
        if (this._currentRound >= this.opts.numOfChallenges) {
          this.$checkBtn.text("Final results, let's see...");
          this.$checkWrap.hide();
          this.$continueWrap.hide();
          var tid = setTimeout(function () {
            return _this3._showFinalResults();
          }, 1400);
          this._revealTimeouts.push(tid);
        } else {
          this.$checkWrap.hide();
          this.$continueWrap.show();
          this.$continueBtn.text("Continue");
        }
        if (earned > 0) {
          $("#score").animateCSS && $("#score").animateCSS("heartBeat");
        }
        return;
      }
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this._clearCorrectStreak();
      this._finalizeRoundRecord({
        passed: false,
        earned: 0
      });
      this._enterCorrectionMode(evalResult);
      this._failAnimation();
      this._playFailSfx();
      this.$helpBtn.show();
    }
  }, {
    key: "_onHelp",
    value: function _onHelp() {
      var _this4 = this;
      if (this._roundLocked) return;
      var evalResult = this._evaluateRoundAnswers();
      var answers = evalResult.expectedByIndex || {};
      var entries = Object.keys(answers);
      if (!entries.length) return;
      this._usedHintThisRound = true;
      this._ensureRoundRecord().usedHint = true;
      entries.forEach(function (idxStr) {
        var idx = Number(idxStr);
        var $cell = _this4.$table.find("td[data-path-index=\"".concat(idx, "\"]")).first();
        if (!$cell.length || !$cell.hasClass("block")) return;
        var $input = $cell.find('input[name="note"]').first();
        if (!$input.length) return;
        var note = String(_this4._noteDisplay(answers[idxStr]) || "");
        if (!note) return;
        $input.val(note).trigger("input");
      });
      this.$helpBtn.hide();
    }
  }, {
    key: "_areAllBlockInputsFilled",
    value: function _areAllBlockInputsFilled() {
      var $inputs = this.$table.find('td.block input[name="note"]');
      if (!$inputs.length) return false;
      var allFilled = true;
      $inputs.each(function (_, el) {
        if (!String(el.value || "").trim()) allFilled = false;
      });
      return allFilled;
    }
  }, {
    key: "_evaluateRoundAnswers",
    value: function _evaluateRoundAnswers() {
      var _this5 = this;
      var expectedByIndex = this._roundAnswerKey || {};
      var marksByIndex = {};
      var expectedKeys = Object.keys(expectedByIndex);
      if (!expectedKeys.length) {
        return {
          correct: false,
          expectedByIndex: expectedByIndex,
          marksByIndex: marksByIndex,
          correctCount: 0,
          wrongCount: 0
        };
      }
      var correct = true;
      var correctCount = 0;
      var wrongCount = 0;
      expectedKeys.forEach(function (idxStr) {
        var expected = expectedByIndex[idxStr];
        var $target = _this5.$table.find("td.block[data-path-index=\"".concat(idxStr, "\"]")).first();
        var user = _this5._noteFromCell($target);
        var ok = !!(user && user.canonical === expected.canonical);
        marksByIndex[idxStr] = ok;
        if (!ok) {
          correct = false;
          wrongCount += 1;
        } else {
          correctCount += 1;
        }
      });
      return {
        correct: correct,
        expectedByIndex: expectedByIndex,
        marksByIndex: marksByIndex,
        correctCount: correctCount,
        wrongCount: wrongCount
      };
    }
  }, {
    key: "_ensureRoundRecord",
    value: function _ensureRoundRecord() {
      var idx = Math.max(0, Number(this._currentRound || 1) - 1);
      if (!this._roundRecords[idx]) {
        this._roundRecords[idx] = {
          round: idx + 1,
          checks: 0,
          firstCorrect: null,
          firstWrong: null,
          finalCorrect: 0,
          finalWrong: 0,
          usedHint: false,
          passed: false,
          points: 0
        };
      }
      return this._roundRecords[idx];
    }
  }, {
    key: "_recordRoundCheck",
    value: function _recordRoundCheck(evalResult) {
      var rec = this._ensureRoundRecord();
      rec.checks += 1;
      if (rec.firstCorrect == null || rec.firstWrong == null) {
        rec.firstCorrect = Number((evalResult === null || evalResult === void 0 ? void 0 : evalResult.correctCount) || 0);
        rec.firstWrong = Number((evalResult === null || evalResult === void 0 ? void 0 : evalResult.wrongCount) || 0);
      }
      rec.finalCorrect = Number((evalResult === null || evalResult === void 0 ? void 0 : evalResult.correctCount) || 0);
      rec.finalWrong = Number((evalResult === null || evalResult === void 0 ? void 0 : evalResult.wrongCount) || 0);
      rec.usedHint = rec.usedHint || this._usedHintThisRound;
    }
  }, {
    key: "_finalizeRoundRecord",
    value: function _finalizeRoundRecord(_ref3) {
      var passed = _ref3.passed,
        earned = _ref3.earned;
      var rec = this._ensureRoundRecord();
      rec.passed = !!passed;
      rec.usedHint = rec.usedHint || this._usedHintThisRound;
      rec.points = Number(earned || 0);
    }
  }, {
    key: "_enterCorrectionMode",
    value: function _enterCorrectionMode(evalResult) {
      var _this6 = this;
      var marks = (evalResult === null || evalResult === void 0 ? void 0 : evalResult.marksByIndex) || {};
      this._correctionMode = true;
      this._wrongEditableIndexes = new Set();
      Object.keys(marks).forEach(function (idxStr) {
        if (!marks[idxStr]) _this6._wrongEditableIndexes.add(Number(idxStr));
      });
      this._updateNoteInputProgression();
    }
  }, {
    key: "_renderBlockCheckMarks",
    value: function _renderBlockCheckMarks(evalResult) {
      var _this7 = this;
      var marks = (evalResult === null || evalResult === void 0 ? void 0 : evalResult.marksByIndex) || {};
      this.$table.find("td.block .block-correct").remove();
      this.$table.find("td.block .block-wrong").remove();
      this.$table.find("td.block > div").removeClass("bg-green bg-red");
      this.$table.find("td.block").removeClass("animate__animated animate__rubberBand animate__shakeX");
      Object.keys(marks).forEach(function (idxStr) {
        var ok = !!marks[idxStr];
        var $cell = _this7.$table.find("td.block[data-path-index=\"".concat(idxStr, "\"]")).first();
        if (!$cell.length) return;
        var $wrap = $cell.children("div").first();
        if (!$wrap.length) return;
        $wrap.addClass(ok ? "bg-green" : "bg-red");
        $cell.removeClass("animate__animated animate__rubberBand animate__shakeX");
        // eslint-disable-next-line no-unused-expressions
        $cell[0] && $cell[0].offsetWidth;
        if (ok) $cell.addClass("animate__animated animate__rubberBand");
        var html = ok ? '<span class="block-correct"><i class="fa-solid fa-circle-check"></i></span>' : '<span class="block-wrong"><i class="fa-solid fa-circle-xmark"></i></span>';
        $wrap.append(html);
      });
    }
  }, {
    key: "_noteFromCell",
    value: function _noteFromCell($cell) {
      if (!$cell || !$cell.length) return null;
      var textFromInput = String($cell.find('input[name="note"]').first().val() || "").trim();
      var raw = textFromInput || String($cell.text() || "").trim();
      return this._parseSpelledNote(raw);
    }
  }, {
    key: "_parseSpelledNote",
    value: function _parseSpelledNote(rawText) {
      var normalized = String(rawText || "").trim().replaceAll("𝄪", "##").replaceAll("♯", "#").replaceAll("𝄫", "bb").replaceAll("♭", "b");
      var m = normalized.match(/^([A-Ga-g]|DO|RE|MI|FA|SOL|LA|SI)((?:#{1,2})|(?:b{1,2})|)?(\d+)?$/i);
      if (!m) return null;
      var token = m[1].toUpperCase();
      var letter = ToneTrek.SOLFEGE_TO_LETTER[token] || token;
      var acc = m[2] || "";
      var accOffset = acc === "##" ? 2 : acc === "#" ? 1 : acc === "bb" ? -2 : acc === "b" ? -1 : 0;
      var basePc = {
        C: 0,
        D: 2,
        E: 4,
        F: 5,
        G: 7,
        A: 9,
        B: 11
      }[letter];
      var pitchClass = ((basePc + accOffset) % 12 + 12) % 12;
      return {
        letter: letter,
        accOffset: accOffset,
        pitchClass: pitchClass,
        canonical: "".concat(letter).concat(acc),
        display: this._noteDisplay({
          letter: letter,
          accOffset: accOffset
        })
      };
    }
  }, {
    key: "_accidentalDisplayFromOffset",
    value: function _accidentalDisplayFromOffset(off) {
      if (off === 2) return "𝄪";
      if (off === 1) return "♯";
      if (off === -1) return "♭";
      if (off === -2) return "𝄫";
      return "";
    }
  }, {
    key: "_spelledIntervalTarget",
    value: function _spelledIntervalTarget(prevNote, intervalAbbr, dir) {
      if (!prevNote) return null;
      var semis = this._intervalToSemitones(intervalAbbr);
      var parsed = this._parseIntervalAbbr(intervalAbbr);
      if (!Number.isFinite(semis) || !parsed || !Number.isFinite(parsed.number)) return null;
      var letters = ["C", "D", "E", "F", "G", "A", "B"];
      var fromIdx = letters.indexOf(prevNote.letter);
      if (fromIdx < 0) return null;
      var diatonicSteps = Math.max(0, parsed.number - 1);
      var toIdxRaw = fromIdx + dir * diatonicSteps;
      var toIdx = (toIdxRaw % 7 + 7) % 7;
      var targetLetter = letters[toIdx];
      var targetPc = ((prevNote.pitchClass + dir * semis) % 12 + 12) % 12;
      var naturalPc = {
        C: 0,
        D: 2,
        E: 4,
        F: 5,
        G: 7,
        A: 9,
        B: 11
      }[targetLetter];
      var off = targetPc - naturalPc;
      while (off > 6) off -= 12;
      while (off < -6) off += 12;
      if (off > 2) off -= 12;
      if (off < -2) off += 12;
      if (off < -2 || off > 2) return null;
      var accText = off === 2 ? "##" : off === 1 ? "#" : off === -1 ? "b" : off === -2 ? "bb" : "";
      return {
        letter: targetLetter,
        accOffset: off,
        pitchClass: targetPc,
        canonical: "".concat(targetLetter).concat(accText),
        display: this._noteDisplay({
          letter: targetLetter,
          accOffset: off
        })
      };
    }
  }, {
    key: "_awardPointsForCorrect",
    value: function _awardPointsForCorrect() {
      if (this._isPracticeMode()) {
        this.$points.text("0");
        return 0;
      }
      if (this._usedHintThisRound) return 0;
      var base = Number.isFinite(Number(this.opts.basePoints)) ? Number(this.opts.basePoints) : 1;
      var bonus = Number.isFinite(Number(this.opts.firstTryBonus)) ? Number(this.opts.firstTryBonus) : 2;
      var earned = this._madeMistakeThisRound ? base : base + bonus;
      this._points += Math.max(0, earned);
      this.$points.text(String(this._points));
      return earned;
    }
  }, {
    key: "_showSuccessAnimation",
    value: function _showSuccessAnimation() {
      this.$feedback.find(".message span").text("Great job");
      this.$feedback.stop(true, true).fadeIn("fast");
    }
  }, {
    key: "_failAnimation",
    value: function _failAnimation() {
      var $target = this.$checkWrap && this.$checkWrap.length ? this.$checkWrap : this.$table;
      $target.removeClass("animate__animated animate__shakeX");
      // eslint-disable-next-line no-unused-expressions
      $target[0] && $target[0].offsetWidth;
      $target.addClass("animate__animated animate__shakeX");
      $target.off("animationend.".concat(this.ns, "Fail webkitAnimationEnd.").concat(this.ns, "Fail")).one("animationend.".concat(this.ns, "Fail webkitAnimationEnd.").concat(this.ns, "Fail"), function () {
        $target.removeClass("animate__animated animate__shakeX");
      });
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
      var steps = Math.max(1, Number(this.opts.numOfChallenges) || 1);
      var increment = 100 / steps;
      var current = parseFloat(this.$progressBar.data("progress")) || 0;
      current = Math.min(100, current + increment);
      this.$progressBar.data("progress", current);
      this.$progressBar.css({
        width: "".concat(current, "%")
      });
      var completed = Math.min(steps, Math.round(current / increment));
      this.$progressCounter.text("".concat(completed, " of ").concat(steps));
      return current;
    }
  }, {
    key: "_showFinalResults",
    value: function _showFinalResults() {
      var _this8 = this;
      if (this._isPracticeMode()) return;
      this._stopGameTimer();
      this._stats.finishedAtMs = Date.now();
      var records = this._roundRecords.filter(Boolean);
      var answersCorrect = 0;
      var answersWrong = 0;
      records.forEach(function (r) {
        var c = Number.isFinite(r.firstCorrect) ? r.firstCorrect : Number(r.finalCorrect || 0);
        var w = Number.isFinite(r.firstWrong) ? r.firstWrong : Number(r.finalWrong || 0);
        answersCorrect += Math.max(0, c);
        answersWrong += Math.max(0, w);
      });
      var accuracyBase = answersCorrect + answersWrong;
      var accuracy = accuracyBase ? Math.round(answersCorrect / accuracyBase * 100) : 0;
      var durationSec = Math.max(0, Math.floor((this._stats.finishedAtMs - this._finalStartMs) / 1000));
      var perfectGame = records.length > 0 && !this._madeAnyMistake;
      var finalScore = perfectGame ? this._points * 2 : this._points;
      if (perfectGame) {
        var tid = setTimeout(function () {
          var _this8$$doublePoints, _this8$$doublePoints$;
          (_this8$$doublePoints = _this8.$doublePoints) === null || _this8$$doublePoints === void 0 || (_this8$$doublePoints$ = _this8$$doublePoints.show) === null || _this8$$doublePoints$ === void 0 || _this8$$doublePoints$.call(_this8$$doublePoints);
          _this8._playPerfectGameBonusSfx();
        }, 1750);
        this._revealTimeouts.push(tid);
      } else {
        var _this$$doublePoints2, _this$$doublePoints2$;
        (_this$$doublePoints2 = this.$doublePoints) === null || _this$$doublePoints2 === void 0 || (_this$$doublePoints2$ = _this$$doublePoints2.hide) === null || _this$$doublePoints2$ === void 0 || _this$$doublePoints2$.call(_this$$doublePoints2);
      }
      this.$musicKeyboard.hide();
      this.$continueWrap.hide();
      this.$helpBtn.hide();
      this.$checkWrap.hide();
      (0,_shared_finalResults_js__WEBPACK_IMPORTED_MODULE_0__.renderFinalResultsOverlay)({
        $finalOverlay: this.$finalOverlay,
        rounds: this.opts.numOfChallenges,
        score: finalScore,
        accuracy: accuracy,
        durationSec: durationSec,
        clearCountupTimers: function clearCountupTimers() {
          return _this8._clearFinalCountupTimers();
        },
        countupTimers: this._finalCountupTimeouts,
        animateMetrics: function animateMetrics() {
          return _this8._animateFinalMetricsWithSfx();
        },
        playFinalSfx: function playFinalSfx() {
          return _this8._playFinalSfx();
        }
      });
    }
  }, {
    key: "isSoundEnabled",
    value: function isSoundEnabled() {
      return this._isSoundEnabled();
    }
  }, {
    key: "_ensureUiSfxAudio",
    value: function _ensureUiSfxAudio() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._ensureUiSfxAudio.call(this);
    }
  }, {
    key: "_armUiSfxOnFirstGesture",
    value: function _armUiSfxOnFirstGesture() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._armUiSfxOnFirstGesture.call(this);
    }
  }, {
    key: "_playSuccessSfxBasic",
    value: function _playSuccessSfxBasic() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._playSuccessSfxBasic.call(this);
    }
  }, {
    key: "_playSuccessSfxBonus",
    value: function _playSuccessSfxBonus() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._playSuccessSfxBonus.call(this);
    }
  }, {
    key: "_applyCorrectStreakForOutcome",
    value: function _applyCorrectStreakForOutcome(args) {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._applyCorrectStreakForOutcome.call(this, args);
    }
  }, {
    key: "getCorrectStreak",
    value: function getCorrectStreak() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype.getCorrectStreak.call(this);
    }
  }, {
    key: "_syncStreakBarClass",
    value: function _syncStreakBarClass() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._syncStreakBarClass.call(this);
    }
  }, {
    key: "_clearCorrectStreak",
    value: function _clearCorrectStreak() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._clearCorrectStreak.call(this);
    }
  }, {
    key: "_playFailSfx",
    value: function _playFailSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._playFailSfx.call(this);
    }
  }, {
    key: "_playFinalSfx",
    value: function _playFinalSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._playFinalSfx.call(this);
    }
  }, {
    key: "_playPerfectGameBonusSfx",
    value: function _playPerfectGameBonusSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._playPerfectGameBonusSfx.call(this);
    }
  }, {
    key: "_playFinalMetricPopSfx",
    value: function _playFinalMetricPopSfx(index) {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._playFinalMetricPopSfx.call(this, index);
    }
  }, {
    key: "_playHingeSfx",
    value: function _playHingeSfx() {
      var _this9 = this;
      if (!this._isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var now = Tone.now();
        if (_this9._uiSfxNoise) {
          _this9._uiSfxNoise.triggerAttackRelease(0.04, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("hinge", 0.07));
        }
        var synth = _this9._uiTimerSfxSynth || _this9._uiSfxSynth;
        if (!synth) return;
        synth.triggerAttackRelease("E4", 0.04, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("hinge", 0.12));
        synth.triggerAttackRelease("C4", 0.05, now + 0.04, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("hinge", 0.16));
      });
    }
  }, {
    key: "_clearFinalMetricsSfxTimers",
    value: function _clearFinalMetricsSfxTimers() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._clearFinalMetricsSfxTimers.call(this);
    }
  }, {
    key: "_animateFinalMetricsWithSfx",
    value: function _animateFinalMetricsWithSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._animateFinalMetricsWithSfx.call(this);
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
    key: "_isPracticeMode",
    value: function _isPracticeMode() {
      return this._normalizeOnOff(this.opts.practiceMode);
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
    key: "_isTimerEnabled",
    value: function _isTimerEnabled() {
      return this._normalizeOnOff(this.opts.timer);
    }
  }, {
    key: "_formatTimerDisplay",
    value: function _formatTimerDisplay(sec) {
      var safe = Math.max(0, Math.floor(Number(sec) || 0));
      var mm = String(Math.floor(safe / 60)).padStart(2, "0");
      var ss = String(safe % 60).padStart(2, "0");
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
      var $blocksWrapper = $("#blocks-wrapper");
      this.$table.find("td.block, td.interval-block, td.initial-block").css("pointer-events", on ? "none" : "");
      $blocksWrapper.attr("disabled", on ? "disabled" : null);
      $blocksWrapper.attr("aria-disabled", on ? "true" : "false");
      $blocksWrapper.css("pointer-events", on ? "none" : "");
      if (on) {
        this.$table.find('input[name="note"]').prop("disabled", true);
        this._hideMusicKeyboard();
        this._clearActiveBlockInput();
      } else {
        this._updateNoteInputProgression();
      }
    }
  }, {
    key: "_hideTimeUpMessage",
    value: function _hideTimeUpMessage() {
      var _this$$timeupMessage;
      if (!((_this$$timeupMessage = this.$timeupMessage) !== null && _this$$timeupMessage !== void 0 && _this$$timeupMessage.length)) return;
      this.$timeupMessage.hide().removeClass("animate__animated animate__flash");
    }
  }, {
    key: "_showTimeUpMessage",
    value: function _showTimeUpMessage() {
      var _this$$timeupMessage2;
      if (!((_this$$timeupMessage2 = this.$timeupMessage) !== null && _this$$timeupMessage2 !== void 0 && _this$$timeupMessage2.length)) return;
      this.$timeupMessage.show();
      this.$timeupMessage.removeClass("animate__animated animate__flash");
      // eslint-disable-next-line no-unused-expressions
      this.$timeupMessage[0] && this.$timeupMessage[0].offsetWidth;
      this.$timeupMessage.addClass("animate__animated animate__flash");
    }
  }, {
    key: "_wouldReachLastRoundAfterAdvance",
    value: function _wouldReachLastRoundAfterAdvance() {
      return !this._isPracticeMode() && this._currentRound >= this.opts.numOfChallenges;
    }
  }, {
    key: "_finishRoundAsTimedOut",
    value: function _finishRoundAsTimedOut() {
      var _this0 = this;
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this._clearCorrectStreak();
      this._pauseGameTimer();
      this._hideSkipRoundButton();
      this.$helpBtn.hide();
      this.$checkWrap.hide();
      if (this._wouldReachLastRoundAfterAdvance()) {
        this._stats.finishedAtMs = Date.now();
        var tid = setTimeout(function () {
          return _this0._showFinalResults();
        }, 600);
        this._revealTimeouts.push(tid);
        return;
      }
      this._setTimedOutInteractivityDisabled(false);
      this._hideTimeUpMessage();
      this._currentRound += 1;
      this._startRound();
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
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._playTimerWarningBeep.call(this);
    }
  }, {
    key: "_playTimerTimeUpSfx",
    value: function _playTimerTimeUpSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_1__.BaseStaffGame.prototype._playTimerTimeUpSfx.call(this);
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
      var _this1 = this;
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
        this.$checkWrap.hide();
        this.$helpBtn.hide();
        this._setTimedOutInteractivityDisabled(true);
        this._pulseTimerWarning();
        this._playTimerTimeUpSfx();
        this._showTimeUpMessage();
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
        return _this1._runGameTimerTick();
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
    key: "_showSkipRoundButton",
    value: function _showSkipRoundButton() {
      var _this$$skipWrap;
      if (!((_this$$skipWrap = this.$skipWrap) !== null && _this$$skipWrap !== void 0 && _this$$skipWrap.length)) return;
      this.$skipWrap.stop(true, true).show();
    }
  }, {
    key: "_hideSkipRoundButton",
    value: function _hideSkipRoundButton() {
      var _this$$skipWrap2;
      if (!((_this$$skipWrap2 = this.$skipWrap) !== null && _this$$skipWrap2 !== void 0 && _this$$skipWrap2.length)) return;
      this.$skipWrap.stop(true, true).hide();
    }
  }, {
    key: "_wireNoteInputUx",
    value: function _wireNoteInputUx() {
      var _this10 = this;
      this.$table.off("pointerdown.".concat(this.ns, "Cover mousedown.").concat(this.ns, "Cover touchstart.").concat(this.ns, "Cover click.").concat(this.ns, "Cover"), ".block-cover").on("pointerdown.".concat(this.ns, "Cover mousedown.").concat(this.ns, "Cover touchstart.").concat(this.ns, "Cover click.").concat(this.ns, "Cover"), ".block-cover", function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      });
      this.$table.off("click.".concat(this.ns, "Cell"), "td.block").on("click.".concat(this.ns, "Cell"), "td.block", function (e) {
        var $cell = $(e.currentTarget);
        var $input = $cell.find('input[name="note"]').first();
        if (!$input.length) return;
        if ($input.prop("disabled")) {
          _this10._clearActiveBlockInput();
          return;
        }
        _this10._setActiveBlockInput($input);
        $input.trigger("focus");
        _this10._showMusicKeyboard();
      });
      this.$table.off("focusin.".concat(this.ns, "Note"), 'input[name="note"]').on("focusin.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        _this10._setActiveBlockInput($input);
        _this10._showMusicKeyboard();
      });
      this.$table.off("focusout.".concat(this.ns, "Note"), 'input[name="note"]').on("focusout.".concat(this.ns, "Note"), 'input[name="note"]', function () {
        if (_this10._keyboardHideTimer) clearTimeout(_this10._keyboardHideTimer);
        _this10._keyboardHideTimer = setTimeout(function () {
          if (Date.now() < _this10._suppressKeyboardHideUntil) return;
          var $active = $(document.activeElement);
          var inNoteInput = $active.is('input[name="note"]') && $active.closest("td.block").length;
          var inKeyboard = $active.closest("#music-keyboard").length;
          if (!inNoteInput && !inKeyboard) {
            _this10._hideMusicKeyboard();
          }
        }, 0);
      });
      this.$table.off("blur.".concat(this.ns, "Note"), 'input[name="note"]').on("blur.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        _this10._updateNoteInputProgression();
      });
      this.$table.off("keydown.".concat(this.ns, "Note"), 'input[name="note"]').on("keydown.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        e.preventDefault();
      });
      this.$table.off("input.".concat(this.ns, "Note"), 'input[name="note"]').on("input.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        var prevVal = String($input.data("prev-value") || "");
        var curVal = String($input.val() || "");
        var becameFilled = prevVal.trim().length === 0 && curVal.trim().length > 0;
        if (becameFilled) {
          _this10._revealNextCovers(2);
        }
        $input.data("prev-value", curVal);
        _this10._updateNoteInputProgression();
      });
      this.$table.off("paste.".concat(this.ns, "Note"), 'input[name="note"]').on("paste.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        e.preventDefault();
      });
      $(document).off("mousedown.".concat(this.ns, "Keyboard touchstart.").concat(this.ns, "Keyboard")).on("mousedown.".concat(this.ns, "Keyboard touchstart.").concat(this.ns, "Keyboard"), function (e) {
        var $target = $(e.target);
        if ($target.closest('input[name="note"]').length) return;
        if ($target.closest("#music-keyboard").length) {
          _this10._suppressKeyboardHideUntil = Date.now() + 250;
          return;
        }
        _this10._hideMusicKeyboard();
        _this10._clearActiveBlockInput();
      });
      this.$musicKeyboard.off("click.".concat(this.ns, "Write"), "button").on("click.".concat(this.ns, "Write"), "button", function (e) {
        e.preventDefault();
        var $target = $(e.currentTarget);
        var $active = _this10.$activeBlockInput && _this10.$activeBlockInput.length ? _this10.$activeBlockInput : $(document.activeElement).closest('input[name="note"]');
        if (!$active || !$active.length || !$active.closest("td.block").length) return;
        if ($active.prop("disabled")) return;
        var letter = String($target.attr("data-lettername") || "").trim().toUpperCase();
        var accidentalType = String($target.attr("data-accidental") || "").trim().toLowerCase();
        var isDelete = $target.is("[data-delete]");
        var current = String($active.val() || "").trim();
        if (isDelete) {
          var chars = Array.from(current);
          if (!chars.length) return;
          $active.val(chars.slice(0, -1).join(""));
          $active.trigger("input");
          return;
        }
        if (letter) {
          var sol = String($target.attr("data-solfege") || "").trim();
          var label = _this10._isSolfegeEnabled() ? sol ? sol.charAt(0).toUpperCase() + sol.slice(1).toLowerCase() : ToneTrek.LETTER_TO_SOLFEGE[letter] || letter : letter;
          $active.val(label);
          $active.trigger("input");
          return;
        }
        if (accidentalType) {
          var nextValue = _this10._applyAccidentalToInputValue(current, accidentalType);
          if (nextValue == null) return;
          $active.val(nextValue);
        } else {
          var text = String($target.text() || "").trim();
          if (!text) return;
          $active.val(text);
        }
        $active.trigger("input");
      });
    }
  }, {
    key: "_applyAccidentalToInputValue",
    value: function _applyAccidentalToInputValue(current, accidentalType) {
      var m = String(current || "").trim().match(/^([A-G]|Do|Re|Mi|Fa|Sol|La|Si)([#b♯♭𝄪𝄫]{0,2})$/i);
      if (!m) return null;
      var tokenUpper = String(m[1] || "").toUpperCase();
      var letter = ToneTrek.SOLFEGE_TO_LETTER[tokenUpper] || tokenUpper;
      var baseDisplay = this._isSolfegeEnabled() ? ToneTrek.LETTER_TO_SOLFEGE[letter] || letter : letter;
      var rawAcc = m[2] || "";
      var normalizedAcc = rawAcc === "#" || rawAcc === "♯" ? "sharp" : rawAcc === "##" || rawAcc === "𝄪" ? "double_sharp" : rawAcc === "b" || rawAcc === "♭" ? "flat" : rawAcc === "bb" || rawAcc === "𝄫" ? "double_flat" : "";
      if (accidentalType === "sharp") {
        if (normalizedAcc === "double_sharp") return "".concat(baseDisplay, "\uD834\uDD2A");
        if (normalizedAcc === "sharp") return "".concat(baseDisplay, "\uD834\uDD2A");
        return "".concat(baseDisplay, "\u266F");
      }
      if (accidentalType === "flat") {
        if (normalizedAcc === "double_flat") return "".concat(baseDisplay, "\uD834\uDD2B");
        if (normalizedAcc === "flat") return "".concat(baseDisplay, "\uD834\uDD2B");
        return "".concat(baseDisplay, "\u266D");
      }
      return "".concat(baseDisplay);
    }
  }, {
    key: "_updateNoteInputProgression",
    value: function _updateNoteInputProgression() {
      var $blocks = this.$table.find("td.block").toArray().sort(function (a, b) {
        var ia = parseInt(a.getAttribute("data-path-index"), 10);
        var ib = parseInt(b.getAttribute("data-path-index"), 10);
        return (Number.isFinite(ia) ? ia : 9999) - (Number.isFinite(ib) ? ib : 9999);
      });
      if (this._correctionMode) {
        var allFilledCorrection = $blocks.length > 0;
        for (var i = 0; i < $blocks.length; i += 1) {
          var $cell = $($blocks[i]);
          var idx = parseInt($cell.attr("data-path-index"), 10);
          var $input = $cell.find('input[name="note"]').first();
          var $label = $cell.children("div").children("span").not(".block-arrow").first();
          if (!$input.length) continue;
          var value = String($input.val() || "").trim();
          if (!value) allFilledCorrection = false;
          var editable = this._wrongEditableIndexes.has(idx);
          $input.prop("disabled", !editable);
          if (editable) {
            if (value) $label.hide();else {
              $label.css("opacity", "0.2");
              $label.show();
            }
          } else {
            $label.hide();
          }
        }
        if (this.$activeBlockInput && this.$activeBlockInput.length && this.$activeBlockInput.prop("disabled")) {
          this._clearActiveBlockInput();
          this._hideMusicKeyboard();
        }
        this._syncActiveBlockLabelOpacity();
        this._syncBlocksCompletionUi(allFilledCorrection);
        return;
      }
      var gateOpen = true;
      var allFilled = $blocks.length > 0;
      for (var _i = 0; _i < $blocks.length; _i += 1) {
        var _$cell = $($blocks[_i]);
        var _$input = _$cell.find('input[name="note"]').first();
        var _$label = _$cell.children("div").children("span").not(".block-arrow").first();
        if (!_$input.length) continue;
        var _value = String(_$input.val() || "").trim();
        if (!_value) allFilled = false;
        if (gateOpen) {
          _$input.prop("disabled", false);
          if (_value) {
            _$label.hide();
          } else {
            _$label.css("opacity", "0.2");
            _$label.show();
            gateOpen = false;
          }
        } else {
          _$input.prop("disabled", true);
          _$label.hide();
        }
      }
      if (this.$activeBlockInput && this.$activeBlockInput.length && this.$activeBlockInput.prop("disabled")) {
        this._clearActiveBlockInput();
      }
      this._syncActiveBlockLabelOpacity();
      this._syncBlocksCompletionUi(allFilled);
    }
  }, {
    key: "_syncBlocksCompletionUi",
    value: function _syncBlocksCompletionUi(allFilled) {
      if (this._roundLocked) return;
      if (allFilled) {
        this._instructionsDismissed = true;
        $("#instructions").remove();
        $("#check").show().removeClass("invisible");
        return;
      }
      $("#check").show().removeClass("invisible");
    }
  }, {
    key: "_setActiveBlockInput",
    value: function _setActiveBlockInput($input) {
      if (!$input || !$input.length) return;
      var $cell = $input.closest("td.block");
      if (!$cell.length) return;
      this.$activeBlockInput = $input;
      this.$activeBlockCell = $cell;
      this.$table.find("td.block").removeClass("active-editable").css({
        boxShadow: "",
        borderColor: "",
        zIndex: ""
      });
      $cell.addClass("active-editable").css({
        boxShadow: "0 0 0 3px rgba(13, 110, 253, 0.55) inset, 0 0 0 2px rgba(13, 110, 253, 0.75)",
        borderColor: "#0d6efd",
        zIndex: "2"
      });
      this._syncActiveBlockLabelOpacity();
    }
  }, {
    key: "_clearActiveBlockInput",
    value: function _clearActiveBlockInput() {
      this.$activeBlockInput = null;
      this.$activeBlockCell = null;
      this.$table.find("td.block").removeClass("active-editable").css({
        boxShadow: "",
        borderColor: "",
        zIndex: ""
      });
      this._syncActiveBlockLabelOpacity();
    }
  }, {
    key: "_syncActiveBlockLabelOpacity",
    value: function _syncActiveBlockLabelOpacity() {
      var $labels = this.$table.find('td.block > div > span').not(".block-arrow");
      $labels.css("opacity", "0.2");
      if (!this.$activeBlockCell || !this.$activeBlockCell.length) return;
      var $activeLabel = this.$activeBlockCell.children("div").children("span").not(".block-arrow").first();
      if (!$activeLabel.length || !$activeLabel.is(":visible")) return;
      $activeLabel.css("opacity", "0.05");
    }
  }, {
    key: "_isSoundEnabled",
    value: function _isSoundEnabled() {
      var v = this.opts.sound;
      return v === true || String(v || "").trim().toLowerCase() === "on";
    }
  }, {
    key: "_ensureAudio",
    value: function () {
      var _ensureAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (this._isSoundEnabled()) {
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
              this._synth = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.createSequenceSynth();
              this._audioReady = true;
            case 7:
              return _context.a(2);
          }
        }, _callee, this, [[3, 5]]);
      }));
      function _ensureAudio() {
        return _ensureAudio2.apply(this, arguments);
      }
      return _ensureAudio;
    }()
  }, {
    key: "_playMidi",
    value: function _playMidi(midi, durSeconds, atSecondsFromNow) {
      var _this11 = this;
      if (!window.Tone) return;
      this._ensureAudio().then(function () {
        if (!_this11._synth) return;
        var now = Tone.now();
        var when = now + (Number(atSecondsFromNow) || 0);
        var dur = Number(durSeconds) || 0.6;
        _this11._synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), dur, when, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("sequence", 1));
      });
    }
  }, {
    key: "_playDictationLike",
    value: function _playDictationLike(firstMidi, secondMidi) {
      if (!this._isSoundEnabled()) return;
      this._playMidi(firstMidi, 0.6, 0.0);
      this._playMidi(secondMidi, 0.6, 1.0);
      this._playMidi(firstMidi, 0.6, 2.0);
      this._playMidi(firstMidi, 0.6, 3.0);
      this._playMidi(secondMidi, 0.6, 3.0);
    }
  }, {
    key: "_midiFromCell",
    value: function _midiFromCell($cell) {
      if (!$cell || !$cell.length) return null;
      var note = this._noteFromCell($cell);
      if (!note) return null;
      // Keep playback in a stable middle register, matching previous behavior.
      return 60 + Number(note.pitchClass || 0);
    }
  }, {
    key: "_parseIntervalAbbr",
    value: function _parseIntervalAbbr(abbr) {
      var s = String(abbr || "").trim();
      var m = s.match(/^([PMAmd]+)(\d+)$/);
      if (!m) return null;
      return {
        quality: m[1],
        number: parseInt(m[2], 10)
      };
    }
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
    key: "_intervalToSemitones",
    value: function _intervalToSemitones(abbr) {
      var parsed = this._parseIntervalAbbr(abbr);
      if (!parsed || !Number.isFinite(parsed.number) || parsed.number < 1) return null;
      var simpleNum = (parsed.number - 1) % 7 + 1;
      var octaves = Math.floor((parsed.number - 1) / 7);
      var base = this._intervalSemitones(parsed.quality, simpleNum);
      if (base == null) return null;
      return base + 12 * octaves;
    }
  }, {
    key: "_shakeCell",
    value: function _shakeCell($cell) {
      if (!$cell || !$cell.length) return;
      $cell.removeClass("animate__animated animate__shakeX");
      // eslint-disable-next-line no-unused-expressions
      $cell[0] && $cell[0].offsetWidth;
      $cell.addClass("animate__animated animate__shakeX");
      $cell.off("animationend.".concat(this.ns, "Shake webkitAnimationEnd.").concat(this.ns, "Shake")).one("animationend.".concat(this.ns, "Shake webkitAnimationEnd.").concat(this.ns, "Shake"), function () {
        $cell.removeClass("animate__animated animate__shakeX");
      });
    }
  }, {
    key: "_clearRevealTimers",
    value: function _clearRevealTimers() {
      if (!Array.isArray(this._revealTimeouts)) {
        this._revealTimeouts = [];
        return;
      }
      this._revealTimeouts.forEach(function (id) {
        return clearTimeout(id);
      });
      this._revealTimeouts = [];
    }
  }, {
    key: "_revealPathCells",
    value: function _revealPathCells(items) {
      var _this12 = this;
      var onDone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var list = Array.isArray(items) ? items : [];
      if (!list.length) {
        if (typeof onDone === "function") onDone();
        return;
      }
      var _loop = function _loop() {
        var item = list[i];
        var tid = setTimeout(function () {
          var $cell = _this12._cellAt(item.r, item.c);
          $cell.attr("data-path-index", String(item.i));
          $cell.addClass(item.cls).append(item.html);
          if (item.i >= 2) {
            $cell.append('<div class="block-cover"></div>');
          }
          if (item.cls === "block") {
            $cell.find('input[name="note"]').prop("disabled", true).prop("readonly", true).attr({
              inputmode: "none",
              autocomplete: "off",
              autocorrect: "off",
              autocapitalize: "off",
              spellcheck: "false"
            });
            $cell.children("div").children("span").not(".block-arrow").first().hide();
          }
          _this12._showCellVisual($cell);
          _this12._updateNoteInputProgression();
        }, i * 80);
        _this12._revealTimeouts.push(tid);
      };
      for (var i = 0; i < list.length; i += 1) {
        _loop();
      }
      var coversTid = setTimeout(function () {
        _this12._revealNextCovers(1);
      }, list.length * 80);
      this._revealTimeouts.push(coversTid);
      if (typeof onDone === "function") {
        var doneTid = setTimeout(function () {
          return onDone();
        }, list.length * 80);
        this._revealTimeouts.push(doneTid);
      }
    }
  }, {
    key: "_revealNextCovers",
    value: function _revealNextCovers() {
      var _this13 = this;
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var maxCount = Math.max(0, Number(count) || 0);
      if (!maxCount) return;
      var $covers = this.$table.find("td[data-path-index]").toArray().sort(function (a, b) {
        var ia = parseInt(a.getAttribute("data-path-index"), 10);
        var ib = parseInt(b.getAttribute("data-path-index"), 10);
        return (Number.isFinite(ia) ? ia : 9999) - (Number.isFinite(ib) ? ib : 9999);
      }).map(function (td) {
        return $(td).children(".block-cover").first();
      }).filter(function ($c) {
        return $c && $c.length && !$c.hasClass("cover-revealing") && !$c.hasClass("cover-revealed");
      }).slice(0, maxCount);
      $covers.forEach(function ($cover, i) {
        var tid = setTimeout(function () {
          _this13._playHingeSfx();
          $cover.addClass("cover-revealing block-falling");
          $cover.removeClass("animate__animated animate__hinge").addClass("animate__animated animate__hinge").one("animationend.".concat(_this13.ns, "CoverHinge webkitAnimationEnd.").concat(_this13.ns, "CoverHinge"), function () {
            $cover.hide();
            $cover.removeClass("animate__animated animate__hinge cover-revealing");
            $cover.addClass("cover-revealed");
          });

          // Fallback in case animationend does not fire.
          var fallbackTid = setTimeout(function () {
            $cover.hide();
            $cover.removeClass("animate__animated animate__hinge cover-revealing");
            $cover.addClass("cover-revealed");
          }, 2200);
          _this13._revealTimeouts.push(fallbackTid);
        }, i * 500);
        _this13._revealTimeouts.push(tid);
      });
    }
  }, {
    key: "_showStandardGameUi",
    value: function _showStandardGameUi() {
      this._syncKeyboardLabels();
      $("#instructions").show();
      $("#controls").show();
    }
  }, {
    key: "_showMusicKeyboard",
    value: function _showMusicKeyboard() {
      if (!this.$musicKeyboard.length) return;
      if (this._keyboardHideTimer) {
        clearTimeout(this._keyboardHideTimer);
        this._keyboardHideTimer = null;
      }
      this.$musicKeyboard.stop(true, true).show().removeClass("animate__bounceOutDown").addClass("animate__animated animate__bounceInUp");
    }
  }, {
    key: "_hideMusicKeyboard",
    value: function _hideMusicKeyboard() {
      var _this14 = this;
      if (!this.$musicKeyboard.length) return;
      if (!this.$musicKeyboard.is(":visible")) return;
      this.$musicKeyboard.removeClass("animate__bounceInUp").addClass("animate__animated animate__bounceOutDown");
      var hideTid = setTimeout(function () {
        _this14.$musicKeyboard.hide();
        _this14.$musicKeyboard.removeClass("animate__bounceOutDown");
      }, 550);
      this._revealTimeouts.push(hideTid);
    }
  }, {
    key: "_hideAllCellsVisual",
    value: function _hideAllCellsVisual() {
      this.$table.find("td").css({
        visibility: "visible",
        borderColor: "transparent",
        backgroundColor: "transparent",
        color: "transparent"
      });
    }
  }, {
    key: "_showCellVisual",
    value: function _showCellVisual($cell) {
      if (!$cell || !$cell.length) return;
      $cell.css({
        borderColor: "",
        backgroundColor: "",
        color: ""
      });
    }
  }]);
}();
_defineProperty(ToneTrek, "INTERVALS_FALLBACK", ["m2", "M2", "m3", "M3", "P4", "A4", "d5", "P5", "m6", "M6", "m7", "M7", "P8"]);
_defineProperty(ToneTrek, "MIN_CHALLENGES", 2);
_defineProperty(ToneTrek, "MAX_CHALLENGES", 12);
_defineProperty(ToneTrek, "LETTER_TO_SOLFEGE", {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si"
});
_defineProperty(ToneTrek, "SOLFEGE_TO_LETTER", {
  DO: "C",
  RE: "D",
  MI: "E",
  FA: "F",
  SOL: "G",
  LA: "A",
  SI: "B"
});

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
/* harmony import */ var _StaffAnimations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StaffAnimations.js */ "./resources/js/music/staff/StaffAnimations.js");
/* harmony import */ var _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../games/shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
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
    this._baseHeightPx = this.$el.height();
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
    this._fxNoise = null;
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
    this._animations = new _StaffAnimations_js__WEBPACK_IMPORTED_MODULE_1__.StaffAnimations(this.$el);
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
        try {
          this._fxNoise && this._fxNoise.dispose && this._fxNoise.dispose();
        } catch (_) {}
        this._fxNoise = null;
        this._audioReady = false;
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
      var h = Number.isFinite(this._baseHeightPx) && this._baseHeightPx > 0 ? this._baseHeightPx : this.$el.height();
      var staffHeight = this.opts.lineGap * 4;
      var topLineY = Math.round((h - staffHeight) / 2);
      this.opts.bottomLineY = topLineY + staffHeight;
    }
  }, {
    key: "_syncDynamicHeight",
    value: function _syncDynamicHeight() {
      var _this = this;
      var baseHeight = Number.isFinite(this._baseHeightPx) && this._baseHeightPx > 0 ? this._baseHeightPx : this.$el.height();
      var requiredHeight = baseHeight;
      this.$el.find(".note, .ledger").each(function (_, el) {
        var $node = $(el);
        var top = parseFloat($node.css("top"));
        if (!Number.isFinite(top)) return;
        var outerHeight = $node.outerHeight() || 0;
        var bottom = top + outerHeight + _this.opts.lineGap;
        if (bottom > requiredHeight) requiredHeight = bottom;
      });
      var finalHeight = Math.max(baseHeight, Math.ceil(requiredHeight));
      if (this.$el.height() !== finalHeight) this.$el.height(finalHeight);
    }
  }, {
    key: "_drawLines",
    value: function _drawLines() {
      this.$el.find(".staff-line, .staff-clef, #clef-wrapper").remove();
      for (var i = 0; i < 5; i++) {
        var y = this.opts.bottomLineY - (4 - i) * this.opts.lineGap;
        var durationSec = (0.12 + Math.random() * 0.36).toFixed(3); // ~0.12s..0.48s
        $('<div class="staff-line"></div>').css({
          top: "".concat(y, "px"),
          animationDuration: "".concat(durationSec, "s")
        }).appendTo(this.$el);
      }
      this._drawClef();
    }
  }, {
    key: "_drawClef",
    value: function _drawClef() {
      if (!this.opts.clefUrl) return;
      var clef = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.normalizeClef)(this.opts.clef);
      var $img = $('<img alt="">').attr("src", this.opts.clefUrl);
      $('<div id="clef-wrapper"></div>').addClass("".concat(clef, "-clef")).append($img).appendTo(this.$el);
    }
  }, {
    key: "relayout",
    value: function relayout() {
      this._computeLayout();
      this._drawLines();
      this._resolveNoteOverlaps();
      this._repositionAllAccidentals();
      this._syncDynamicHeight();
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
      var _this2 = this;
      this.$el.find(".accidental").each(function (_, node) {
        var id = node.getAttribute("data-for-note-id");
        if (id) _this2._positionAccidentalForNote(id);
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
              this._synth = _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.createStaffNoteSynth();
              this._fxNoise = _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.createStaffNoiseSynth();
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
    key: "_playAccidentalGrabSfx",
    value: function _playAccidentalGrabSfx() {
      var _this3 = this;
      if (!this._soundEnabled() || !window.Tone) return;
      this._ensureAudio().then(function () {
        if (!_this3._fxNoise) return;
        _this3._fxNoise.triggerAttackRelease(0.06, Tone.now(), _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("accidentalGrab", 0.5));
      });
    }
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
              this._synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), 0.5, undefined, _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("staffNote", 1));
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
      this._syncDynamicHeight();
    }
  }, {
    key: "removeNote",
    value: function removeNote(id) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (opts.smoke === true) {
        var noteEl = this.$el.find(".note[data-note-id=\"".concat(id, "\"]"))[0];
        this._animations.playNoteRemoveSmoke(noteEl);
      }
      this.$el.find(".note[data-note-id=\"".concat(id, "\"]")).remove();
      this.$el.find(".ledger[data-for-note-id=\"".concat(id, "\"]")).remove();
      this._removeAccidentalForNote(id);
      this._resolveNoteOverlaps();
      this._syncDynamicHeight();
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
      this._syncDynamicHeight();
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
      this._syncDynamicHeight();
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
      this._syncDynamicHeight();
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
      this._syncDynamicHeight();
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
        self.removeNote(clickedId, {
          smoke: true
        });
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
          self._playAccidentalGrabSfx();
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

/***/ "./resources/js/music/staff/StaffAnimations.js"
/*!*****************************************************!*\
  !*** ./resources/js/music/staff/StaffAnimations.js ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaffAnimations: () => (/* binding */ StaffAnimations)
/* harmony export */ });
/* harmony import */ var _games_shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../games/shared/mojsEffects.js */ "./resources/js/music/games/shared/mojsEffects.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var StaffAnimations = /*#__PURE__*/function () {
  function StaffAnimations($container) {
    _classCallCheck(this, StaffAnimations);
    this.$container = $container;
  }
  return _createClass(StaffAnimations, [{
    key: "playNoteRemoveSmoke",
    value: function playNoteRemoveSmoke(noteEl) {
      if (!noteEl) return;
      (0,_games_shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_0__.playSmokePuffAtElement)(noteEl, {
        parentEl: document.body
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
    "--clef-top": "34px",
    "--clef-left-nudge": "28px"
  },
  bass: {
    "--clef-width": "76px",
    "--clef-height": "calc(var(--staff-line-gap) * 6)",
    "--clef-top": "15px",
    "--clef-left-nudge": "-12px"
  },
  alto: {
    "--clef-width": "88px",
    "--clef-height": "calc(var(--staff-line-gap) * 6)",
    "--clef-top": "27.5px",
    "--clef-left-nudge": "-10px"
  },
  tenor: {
    "--clef-width": "88px",
    "--clef-height": "calc(var(--staff-line-gap) * 6)",
    "--clef-top": "2.5px",
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
/*!**********************************************!*\
  !*** ./resources/js/music/games/tonetrek.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tonetrek_ToneTrek_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tonetrek/ToneTrek.js */ "./resources/js/music/games/tonetrek/ToneTrek.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var options = readGlobal("__challengeOptions") || {};
var game = new _tonetrek_ToneTrek_js__WEBPACK_IMPORTED_MODULE_0__.ToneTrek(_objectSpread({}, options));
game.start();
})();

/******/ })()
;