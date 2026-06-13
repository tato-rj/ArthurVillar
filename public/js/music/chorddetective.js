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
/* harmony import */ var _shared_PromptUi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/PromptUi.js */ "./resources/js/music/games/shared/PromptUi.js");
/* harmony import */ var _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
/* harmony import */ var _shared_PianoKeyboardUi_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/PianoKeyboardUi.js */ "./resources/js/music/games/shared/PianoKeyboardUi.js");
/* harmony import */ var _shared_InstructionsUi_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/InstructionsUi.js */ "./resources/js/music/games/shared/InstructionsUi.js");
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
    this.$instructions = $("#instructions");
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
    this.prompt = new _shared_PromptUi_js__WEBPACK_IMPORTED_MODULE_3__.PromptUi("#prompt");
    this.instructionsUi = new _shared_InstructionsUi_js__WEBPACK_IMPORTED_MODULE_6__.InstructionsUi("#instructions");
    this.$keyboard = $("#keyboard").first();
    this.$keyboardWrap = $("#keyboard-wrapper").first();
    this.$pianoToggleBtn = $("#piano-toggle button").first();

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
    this._keyboardSyncPatched = false;
    this._keyboardAccidentalPreviewPatched = false;
    this.keyboard = this._shouldUsePianoKeyboard() ? new _shared_PianoKeyboardUi_js__WEBPACK_IMPORTED_MODULE_5__.PianoKeyboardUi({
      rootSelector: "#keyboard",
      namespace: "".concat(this.ns, ".keyboard"),
      onKeyClick: function onKeyClick(data) {
        var _this$_onPianoKeyboar;
        return (_this$_onPianoKeyboar = _this._onPianoKeyboardKeyClick) === null || _this$_onPianoKeyboar === void 0 ? void 0 : _this$_onPianoKeyboar.call(_this, data);
      },
      canPlayNote: function canPlayNote() {
        var _this$staff, _this$staff$isSoundEn;
        return (_this$staff = _this.staff) === null || _this$staff === void 0 || (_this$staff$isSoundEn = _this$staff.isSoundEnabled) === null || _this$staff$isSoundEn === void 0 ? void 0 : _this$staff$isSoundEn.call(_this$staff);
      }
    }) : null;

    // Staff
    this.staff = new _staff_Staff_js__WEBPACK_IMPORTED_MODULE_0__.Staff(this.$staffEl, {
      clef: this.opts.initialClef || "treble",
      clefUrls: this.opts.clefUrls || window.__clefUrls,
      autoClef: false,
      getMaxUserNotes: function getMaxUserNotes() {
        return Number.isFinite(_this.maxUserNotes) ? _this.maxUserNotes : Infinity;
      },
      sound: !!this.opts.sound,
      showLineNames: this._normalizeOnOff(this.opts.showLineNames),
      formatLineName: function formatLineName(letter) {
        return _this._toDisplayNoteName(letter);
      }
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
    key: "_shouldUsePianoKeyboard",
    value: function _shouldUsePianoKeyboard() {
      var _this$$keyboard;
      if (this.opts.usePianoKeyboard === false) return false;
      if (this._normalizeOnOff(this.opts.usePianoKeyboard)) return true;
      return !!((_this$$keyboard = this.$keyboard) !== null && _this$$keyboard !== void 0 && _this$$keyboard.length);
    }
  }, {
    key: "_keyboardStartNoteForClef",
    value: function _keyboardStartNoteForClef(clef) {
      var cleanClef = String(clef || "").trim().toLowerCase();
      if (cleanClef === "bass") return "C3";
      if (cleanClef === "alto") return "C3";
      if (cleanClef === "tenor") return "C3";
      return "C4";
    }
  }, {
    key: "_syncPianoKeyboardStartNote",
    value: function _syncPianoKeyboardStartNote() {
      if (!this.keyboard || !this.staff) return;
      this.keyboard.setStartNote(this._keyboardStartNoteForClef(this.staff.getClef()));
    }
  }, {
    key: "_collectKeyboardSyncNotes",
    value: function _collectKeyboardSyncNotes() {
      var _this2 = this;
      return this.$staffEl.find(".note").not(".preview").not(".hint").toArray().map(function (el) {
        var _this2$staff$_getAtta, _this2$staff;
        var $note = $(el);
        var noteId = String($note.attr("data-note-id") || "");
        if (!noteId) return null;
        var top = parseFloat($note.css("top"));
        var step = Number.isFinite(top) ? _this2.staff.yToStep(top) : null;
        var accidentalClass = ((_this2$staff$_getAtta = (_this2$staff = _this2.staff)._getAttachedAccidentalClass) === null || _this2$staff$_getAtta === void 0 ? void 0 : _this2$staff$_getAtta.call(_this2$staff, noteId)) || null;
        return {
          noteId: noteId,
          step: step,
          accidentalClass: accidentalClass,
          fixed: $note.hasClass("fixed")
        };
      }).filter(Boolean);
    }
  }, {
    key: "_keyboardPrimaryNote",
    value: function _keyboardPrimaryNote(notes) {
      var list = Array.isArray(notes) ? notes : [];
      var userNotes = list.filter(function (note) {
        return !note.fixed;
      });
      if (userNotes.length) return userNotes[userNotes.length - 1];
      return list.length ? list[list.length - 1] : null;
    }
  }, {
    key: "_keyboardNoteNameForState",
    value: function _keyboardNoteNameForState(step, accidentalClass) {
      var _this$keyboard$_noteN, _this$keyboard;
      if (!Number.isFinite(step) || !this.keyboard) return "";
      var noteState = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.stepToLetterOctave)(this.staff, step);
      var letter = String((noteState === null || noteState === void 0 ? void 0 : noteState.letter) || "").trim().toUpperCase();
      var octave = Number(noteState === null || noteState === void 0 ? void 0 : noteState.octave);
      if (!letter || !Number.isFinite(octave)) return "";
      var accidentalOffset = this.staff._accidentalClassToOffset(accidentalClass) || 0;
      var naturalPitchClass = {
        C: 0,
        D: 2,
        E: 4,
        F: 5,
        G: 7,
        A: 9,
        B: 11
      }[letter];
      if (!Number.isInteger(naturalPitchClass)) return "";
      var midi = (octave + 1) * 12 + naturalPitchClass + accidentalOffset;
      return ((_this$keyboard$_noteN = (_this$keyboard = this.keyboard)._noteNameFromMidi) === null || _this$keyboard$_noteN === void 0 ? void 0 : _this$keyboard$_noteN.call(_this$keyboard, midi)) || "";
    }
  }, {
    key: "_syncPianoKeyboardMarkerFromStaff",
    value: function _syncPianoKeyboardMarkerFromStaff() {
      var _this3 = this;
      if (!this.keyboard || !this.staff) return;
      var notes = this._collectKeyboardSyncNotes().filter(function (note) {
        return Number.isFinite(note.step);
      });
      var primary = this._keyboardPrimaryNote(notes);
      if (!primary) {
        this.keyboard.syncActiveKeys([]);
        return;
      }
      var primaryState = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.stepToLetterOctave)(this.staff, primary.step);
      var keys = [this.keyboard.keyForNote(primaryState === null || primaryState === void 0 ? void 0 : primaryState.letter, primary.accidentalClass, primaryState === null || primaryState === void 0 ? void 0 : primaryState.octave)];
      var markerEntries = notes.map(function (note) {
        return {
          noteName: _this3._keyboardNoteNameForState(note.step, note.accidentalClass),
          tone: note.fixed ? "secondary" : "primary",
          $key: note.noteId === primary.noteId ? keys[0] : null
        };
      }).filter(function (entry) {
        return entry.noteName;
      });
      notes.forEach(function (note) {
        if (note.noteId === primary.noteId) return;
        var noteState = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.stepToLetterOctave)(_this3.staff, note.step);
        var $key = _this3.keyboard.keyForNoteIfVisible(noteState === null || noteState === void 0 ? void 0 : noteState.letter, note.accidentalClass, noteState === null || noteState === void 0 ? void 0 : noteState.octave);
        if ($key.length) {
          keys.push($key);
          var entry = markerEntries.find(function (item) {
            return item.noteName === _this3._keyboardNoteNameForState(note.step, note.accidentalClass);
          });
          if (entry) entry.$key = $key;
        }
      });
      this.keyboard.syncActiveMarkers(markerEntries);
    }
  }, {
    key: "_syncPianoKeyboardMarkerFromAccidentalPreview",
    value: function _syncPianoKeyboardMarkerFromAccidentalPreview() {
      var _this$staff2,
        _this4 = this;
      if (!this.keyboard || !this.staff) return;
      var dragState = ((_this$staff2 = this.staff) === null || _this$staff2 === void 0 ? void 0 : _this$staff2._accDragSound) || {};
      var noteId = String(dragState.noteId || "");
      var previewAccidentalClass = dragState.prospectiveCls || null;
      if (!noteId || !previewAccidentalClass) {
        this._syncPianoKeyboardMarkerFromStaff();
        return;
      }
      var $note = this.$staffEl.find(".note[data-note-id=\"".concat(noteId, "\"]")).first();
      if (!$note.length) {
        this._syncPianoKeyboardMarkerFromStaff();
        return;
      }
      var top = parseFloat($note.css("top"));
      var step = Number.isFinite(top) ? this.staff.yToStep(top) : null;
      if (!Number.isFinite(step)) {
        this._syncPianoKeyboardMarkerFromStaff();
        return;
      }
      var notes = this._collectKeyboardSyncNotes().filter(function (note) {
        return Number.isFinite(note.step);
      });
      var primary = this._keyboardPrimaryNote(notes) || {
        noteId: noteId,
        step: step,
        accidentalClass: previewAccidentalClass,
        fixed: false
      };
      var primaryState = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.stepToLetterOctave)(this.staff, primary.step);
      var primaryAccidental = primary.noteId === noteId ? previewAccidentalClass : primary.accidentalClass;
      var keys = [this.keyboard.keyForNote(primaryState === null || primaryState === void 0 ? void 0 : primaryState.letter, primaryAccidental, primaryState === null || primaryState === void 0 ? void 0 : primaryState.octave)];
      var markerEntries = notes.map(function (note) {
        return {
          noteName: _this4._keyboardNoteNameForState(note.step, note.noteId === noteId ? previewAccidentalClass : note.accidentalClass),
          tone: note.fixed ? "secondary" : "primary",
          $key: note.noteId === primary.noteId ? keys[0] : null
        };
      }).filter(function (entry) {
        return entry.noteName;
      });
      notes.forEach(function (note) {
        if (note.noteId === primary.noteId) return;
        var noteState = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.stepToLetterOctave)(_this4.staff, note.step);
        var accidentalClass = note.noteId === noteId ? previewAccidentalClass : note.accidentalClass;
        var $key = _this4.keyboard.keyForNoteIfVisible(noteState === null || noteState === void 0 ? void 0 : noteState.letter, accidentalClass, noteState === null || noteState === void 0 ? void 0 : noteState.octave);
        if ($key.length) {
          keys.push($key);
          var entry = markerEntries.find(function (item) {
            return item.noteName === _this4._keyboardNoteNameForState(note.step, accidentalClass);
          });
          if (entry) entry.$key = $key;
        }
      });
      this.keyboard.syncActiveMarkers(markerEntries);
    }
  }, {
    key: "_wirePianoKeyboardSync",
    value: function _wirePianoKeyboardSync() {
      var _this5 = this;
      if (!this.keyboard || !this.staff || this._keyboardSyncPatched) return;
      this._keyboardSyncPatched = true;
      var baseMoveNote = this.staff.moveNote.bind(this.staff);
      this.staff.moveNote = function () {
        var out = baseMoveNote.apply(void 0, arguments);
        _this5._syncPianoKeyboardMarkerFromStaff();
        return out;
      };
      var baseRemoveNote = this.staff.removeNote.bind(this.staff);
      this.staff.removeNote = function () {
        var out = baseRemoveNote.apply(void 0, arguments);
        _this5._syncPianoKeyboardMarkerFromStaff();
        return out;
      };
      var baseClearNotes = this.staff.clearNotes.bind(this.staff);
      this.staff.clearNotes = function () {
        var out = baseClearNotes.apply(void 0, arguments);
        _this5._syncPianoKeyboardMarkerFromStaff();
        return out;
      };
      this.$staffEl.off("staff:noteState.".concat(this.ns, ".keyboard")).on("staff:noteState.".concat(this.ns, ".keyboard"), function (e, data) {
        _this5._syncPianoKeyboardMarkerFromStaff();
      });
    }
  }, {
    key: "_wirePianoKeyboardAccidentalPreview",
    value: function _wirePianoKeyboardAccidentalPreview() {
      var _this6 = this;
      if (!this.keyboard || this._keyboardAccidentalPreviewPatched) return;
      this._keyboardAccidentalPreviewPatched = true;
      var $tools = $("#accidentals .accidental-tool");
      if (!$tools.length || !$tools.draggable) return;
      var originalDrag = $tools.draggable("option", "drag");
      var originalStop = $tools.draggable("option", "stop");
      $tools.draggable("option", "drag", function (event, ui) {
        if (typeof originalDrag === "function") originalDrag.call(event.currentTarget, event, ui);
        _this6._syncPianoKeyboardMarkerFromAccidentalPreview();
      });
      $tools.draggable("option", "stop", function (event, ui) {
        if (typeof originalStop === "function") originalStop.call(event.currentTarget, event, ui);
        _this6._syncPianoKeyboardMarkerFromStaff();
      });
    }
  }, {
    key: "_syncPianoKeyboardToggleUi",
    value: function _syncPianoKeyboardToggleUi() {
      var _this$$pianoToggleBtn, _this$$keyboardWrap;
      if (!((_this$$pianoToggleBtn = this.$pianoToggleBtn) !== null && _this$$pianoToggleBtn !== void 0 && _this$$pianoToggleBtn.length) || !((_this$$keyboardWrap = this.$keyboardWrap) !== null && _this$$keyboardWrap !== void 0 && _this$$keyboardWrap.length)) return;
      var visible = this.$keyboardWrap.is(":visible");
      if (visible) this.$pianoToggleBtn.attr("selected", "selected");else this.$pianoToggleBtn.removeAttr("selected");
    }
  }, {
    key: "_wirePianoKeyboardToggle",
    value: function _wirePianoKeyboardToggle() {
      var _this$$keyboardWrap2,
        _this$$pianoToggleBtn2,
        _this$$pianoToggleBtn3,
        _this7 = this;
      if (!((_this$$keyboardWrap2 = this.$keyboardWrap) !== null && _this$$keyboardWrap2 !== void 0 && _this$$keyboardWrap2.length)) return;
      if ((_this$$pianoToggleBtn2 = this.$pianoToggleBtn) !== null && _this$$pianoToggleBtn2 !== void 0 && _this$$pianoToggleBtn2.length) this.$keyboardWrap.hide();else this.$keyboardWrap.show();
      if ((_this$$pianoToggleBtn3 = this.$pianoToggleBtn) !== null && _this$$pianoToggleBtn3 !== void 0 && _this$$pianoToggleBtn3.length) {
        this.$pianoToggleBtn.off("click.".concat(this.ns, ".pianoToggle")).on("click.".concat(this.ns, ".pianoToggle"), function (e) {
          e.preventDefault();
          _this7.$keyboardWrap.toggle();
          _this7._syncPianoKeyboardToggleUi();
        });
      }
      this._syncPianoKeyboardToggleUi();
    }
  }, {
    key: "_toDisplayNoteName",
    value: function _toDisplayNoteName(letterWithAccidentals) {
      var raw = String(letterWithAccidentals || "").trim();
      if (!raw) return raw;
      if (!this._showSolfegeNoteNames()) return raw;
      var m = raw.match(/^([A-G])(.*)$/i);
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
              this._uiSfxSynth = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.createUiPolySynth();
              this._uiSfxNoise = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.createUiNoiseSynth();
              this._uiTimerSfxSynth = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.createUiTimerSynth();
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
      var _this8 = this;
      if (this._audioUnlockArmed) return;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._audioUnlockArmed = true;
      var ns = ".uiSfxUnlock.".concat(this.ns);
      var unlock = function unlock() {
        _this8._ensureUiSfxAudio()["finally"](function () {
          $(document).off(ns);
        });
      };
      $(document).off(ns).one("pointerdown".concat(ns, " keydown").concat(ns, " touchstart").concat(ns), unlock);
    }
  }, {
    key: "_playSuccessSfxBasic",
    value: function _playSuccessSfxBasic() {
      var _this9 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        if (!_this9._uiSfxSynth) return;
        var now = Tone.now();
        var variants = [["C6", "E6", "G6"], ["D6", "F#6", "A6"], ["E6", "G6", "B6"], ["G5", "B5", "D6", "G6"], ["A5", "C6", "E6", "A6"], ["C6", "D6", "G6"], ["F5", "A5", "C6", "F6"], ["E6", "A6", "C7"], ["B5", "D6", "G6"], ["C6", "G6", "E7"]];
        var picked = variants[Math.floor(Math.random() * variants.length)];
        picked.forEach(function (n, i) {
          _this9._uiSfxSynth.triggerAttackRelease(n, 0.07, now + i * 0.05, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("successBasic", 0.42));
        });
      });
    }
  }, {
    key: "_playSuccessSfxBonus",
    value: function _playSuccessSfxBonus() {
      var _this0 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var _this0$_uiSfxSynth$ge;
        if (!_this0._uiSfxSynth) return;
        var now = Tone.now();
        var oldEnv = _objectSpread({}, _this0._uiSfxSynth.get().envelope);
        var oldOsc = (_this0$_uiSfxSynth$ge = _this0._uiSfxSynth.get().oscillator) === null || _this0$_uiSfxSynth$ge === void 0 ? void 0 : _this0$_uiSfxSynth$ge.type;
        try {
          _this0._uiSfxSynth.set({
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
        var streakLevel = Math.max(1, Math.min(24, Number(_this0._correctStreak) || 1));
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
          _this0._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.045, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("successBonus", 0.45));
        });
        hit.forEach(function (n) {
          _this0._uiSfxSynth.triggerAttackRelease(n, 0.12, now + 0.26, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("successBonus", 0.30));
        });
        setTimeout(function () {
          try {
            _this0._uiSfxSynth.set({
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
      var _this1 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var now = Tone.now();
        if (_this1._uiSfxNoise) {
          _this1._uiSfxNoise.triggerAttackRelease(0.06, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("failNoise", 0.45));
        }
        if (_this1._uiSfxSynth) {
          _this1._uiSfxSynth.triggerAttackRelease("A2", 0.10, now + 0.01, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("failNote", 0.55));
          _this1._uiSfxSynth.triggerAttackRelease("G2", 0.12, now + 0.08, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("failNote", 0.6));
        }
      });
    }
  }, {
    key: "_playFinalSfx",
    value: function _playFinalSfx() {
      var _this10 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var _this10$_uiSfxSynth$g;
        if (!_this10._uiSfxSynth) return;
        var oldEnv = _objectSpread({}, _this10._uiSfxSynth.get().envelope);
        var oldOsc = (_this10$_uiSfxSynth$g = _this10._uiSfxSynth.get().oscillator) === null || _this10$_uiSfxSynth$g === void 0 ? void 0 : _this10$_uiSfxSynth$g.type;
        _this10._uiSfxSynth.set({
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
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.9, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.6));
          });
          ["G5", "A5", "B5", "C6", "D6", "E6", "G6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.08, now + 0.25 + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.35));
          });
        },
        // 2) Rising broken chord + final hit
        function () {
          ["C5", "E5", "G5", "B5", "D6", "G6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.11, now + i * 0.08, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.44));
          });
          ["C6", "E6", "G6"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.28, now + 0.62, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.5));
          });
        },
        // 3) Two chord swells
        function () {
          ["A3", "E4", "A4", "C5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.45, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.45));
          });
          ["F4", "A4", "C5", "F5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.52, now + 0.35, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.48));
          });
          ["C5", "F5", "A5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.78, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.4));
          });
        },
        // 4) Sparkly step run + octave landing
        function () {
          ["E5", "G5", "A5", "B5", "D6", "E6", "G6", "A6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.075, now + i * 0.055, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.34));
          });
          ["A5", "A6", "C7"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.20, now + 0.52, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.42));
          });
        },
        // 5) Major lift arpeggio
        function () {
          ["D4", "A4", "D5", "F#5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.36, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.45));
          });
          ["D5", "F#5", "A5", "D6", "F#6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.095, now + 0.2 + i * 0.065, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.4));
          });
        },
        // 6) Warm cadence
        function () {
          ["G3", "D4", "G4", "B4"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.4, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.4));
          });
          ["C4", "E4", "G4", "C5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.44, now + 0.32, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.46));
          });
          ["E5", "G5", "C6"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.22, now + 0.72, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.4));
          });
        },
        // 7) Fast gamey sparkle
        function () {
          ["C6", "D6", "E6", "G6", "A6", "G6", "E6", "C7"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.048, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.3));
          });
          ["G6", "C7"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.2, now + 0.48, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.38));
          });
        },
        // 8) Two-step fanfare
        function () {
          ["F4", "C5", "A5"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.16, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.45));
          });
          ["G4", "D5", "B5"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.16, now + 0.28 + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.48));
          });
          ["C5", "E5", "G5", "C6"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.26, now + 0.54, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.44));
          });
        },
        // 9) Descend then resolve up
        function () {
          ["A6", "G6", "E6", "D6", "C6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.08, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.34));
          });
          ["E6", "G6", "C7"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.4, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.42));
          });
        },
        // 10) Big finish hit
        function () {
          ["C4", "E4", "G4", "C5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.34, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.48));
          });
          ["E5", "G5", "B5", "D6", "E6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.09, now + 0.18 + i * 0.055, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.38));
          });
          ["C6", "E6", "G6", "C7"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.3, now + 0.58, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("final", 0.5));
          });
        }];
        var playVariant = variants[Math.floor(Math.random() * variants.length)];
        playVariant();
        setTimeout(function () {
          try {
            _this10._uiSfxSynth.set({
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
      synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), 0.055, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("finalMetric", 0.44));
      synth.triggerAttackRelease(Tone.Frequency(midi + 5, "midi"), 0.045, now + 0.03, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("finalMetric", 0.34));
    }
  }, {
    key: "_animateFinalMetricsWithSfx",
    value: function _animateFinalMetricsWithSfx() {
      var _this11 = this;
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
          _this11._playFinalMetricPopSfx(i);
        }, delayMs);
        _this11._finalMetricsSfxTimeouts.push(tid);
      });
    }
  }, {
    key: "_playPerfectGameBonusSfx",
    value: function _playPerfectGameBonusSfx() {
      var _this12 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var _this12$_uiSfxSynth$g;
        if (!_this12._uiSfxSynth) return;
        var oldEnv = _objectSpread({}, _this12._uiSfxSynth.get().envelope);
        var oldOsc = (_this12$_uiSfxSynth$g = _this12._uiSfxSynth.get().oscillator) === null || _this12$_uiSfxSynth$g === void 0 ? void 0 : _this12$_uiSfxSynth$g.type;
        try {
          _this12._uiSfxSynth.set({
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
          _this12._uiSfxSynth.triggerAttackRelease(n, 0.09, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("perfectBonus", 0.62));
        });
        var hit = ["C6", "G6", "C7", "E7"];
        hit.forEach(function (n) {
          return _this12._uiSfxSynth.triggerAttackRelease(n, 0.35, now + 0.48, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("perfectBonus", 0.46));
        });
        setTimeout(function () {
          try {
            _this12._uiSfxSynth.set({
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
      var _this13 = this;
      if (!this.isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        if (!_this13._uiSfxSynth) return;
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
          _this13._uiSfxSynth.triggerAttackRelease(notes, dur, now + t, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("runStart", vel));
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
      var _this14 = this;
      this._clearCorrectStreak();
      this._madeAnyMistake = true;
      this._madeMistakeThisRound = true;
      this._stats.checksTotal += 1;
      var reachedEnd = this._updateProgressBar() >= 100;
      if (reachedEnd && !this._isPracticeMode()) {
        this._stats.finishedAtMs = Date.now();
        this.$checkBtn.text('Final results, let\'s see…');
        setTimeout(function () {
          return _this14._showFinalResults();
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
      this._uiTimerSfxSynth.triggerAttackRelease("C6", 0.06, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("timerBeep", 0.5));
    }
  }, {
    key: "_playTimerTimeUpSfx",
    value: function _playTimerTimeUpSfx() {
      if (!this.isSoundEnabled() || !window.Tone) return;
      if (!this._uiSfxReady || !this._uiTimerSfxSynth) return;
      var now = Tone.now();
      if (this._uiSfxNoise) {
        this._uiSfxNoise.triggerAttackRelease(0.12, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("timerTimeUp", 0.2));
      }
      this._uiTimerSfxSynth.triggerAttackRelease("G4", 0.11, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("timerTimeUp", 0.72));
      this._uiTimerSfxSynth.triggerAttackRelease("E4", 0.13, now + 0.10, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("timerTimeUp", 0.76));
      this._uiTimerSfxSynth.triggerAttackRelease("C4", 0.18, now + 0.22, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("timerTimeUp", 0.82));
    }
  }, {
    key: "_removeAllStaffNotesWithSmoke",
    value: function _removeAllStaffNotesWithSmoke() {
      var _this$$staffEl,
        _this$staff3,
        _this15 = this;
      if (!((_this$$staffEl = this.$staffEl) !== null && _this$$staffEl !== void 0 && _this$$staffEl.length) || !((_this$staff3 = this.staff) !== null && _this$staff3 !== void 0 && _this$staff3.removeNote)) return;
      var noteIds = this.$staffEl.find(".note").not(".preview").not(".hint").map(function (_, el) {
        return String(el.getAttribute("data-note-id") || "");
      }).get().filter(Boolean);
      if (!noteIds.length) return;
      noteIds.forEach(function (id) {
        var delay = Math.floor(Math.random() * 140); // tiny natural stagger
        setTimeout(function () {
          _this15.staff.removeNote(id, {
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
      var _this16 = this;
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
        return _this16._runGameTimerTick();
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
      var _this$keyboard2, _this$keyboard2$bind;
      this._madeAnyMistake = false;
      this.instructionsUi.show().replay();
      $("#controls").show();
      this._instructionsRemoved = false;
      this._wireAccidentalPalette();
      this._wireStaffTools();
      (_this$keyboard2 = this.keyboard) === null || _this$keyboard2 === void 0 || (_this$keyboard2$bind = _this$keyboard2.bind) === null || _this$keyboard2$bind === void 0 || _this$keyboard2$bind.call(_this$keyboard2);
      this._wirePianoKeyboardSync();
      this._wirePianoKeyboardAccidentalPreview();
      this._wirePianoKeyboardToggle();
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
      this._syncPianoKeyboardStartNote();
      this._syncPianoKeyboardMarkerFromStaff();
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
      var _this17 = this;
      this.staff.enableNoteDragAndClickDelete();
      this.staff.enableGhostClickCreate();
      this.staff.enableAccidentalDrag($("#accidentals .music-font__sharp, #accidentals .music-font__flat, #accidentals .music-font__natural"));
      this.staff.enableAccidentalDropOnStaff();
      this.$staffEl.off("staff:noteState._log.".concat(this.ns)).on("staff:noteState._log.".concat(this.ns), function (e, data) {
        var full = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.spellNoteFromState)(_this17.staff, data.step, data.accidentalClass);
        var letterOnly = full.replace(/\d+$/, "");
        var displayName = _this17._toDisplayNoteName(letterOnly);
        if (_this17.showNoteNames) {
          _this17.$staffEl.find(".note[data-note-id=\"".concat(data.noteId, "\"] .lettername")).html(displayName);
        }
        if (data.source === "fixed") {
          var _this17$_onFixedNoteS;
          _this17._fixedNote = {
            letterWithAcc: letterOnly,
            letterOnly: letterOnly.replace(/[#b]+$/, "")
          };
          _this17._fixedState = {
            step: data.step,
            accidentalClass: data.accidentalClass || null,
            midi: data.midi
          };
          (_this17$_onFixedNoteS = _this17._onFixedNoteState) === null || _this17$_onFixedNoteS === void 0 || _this17$_onFixedNoteS.call(_this17, data, full, letterOnly);
        }

        // Keep your debug logging behavior
        // eslint-disable-next-line no-console
        console.log(data.source === "fixed" ? "Fixed note:" : "User note:", full, {
          midi: data.midi,
          noteId: data.noteId,
          step: data.step,
          clef: _this17.staff.getClef()
        });
      });
    }
  }, {
    key: "_wireControls",
    value: function _wireControls() {
      var _this18 = this;
      $("#clear").off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
        return _this18.staff.clearNotes();
      });
      this.$checkBtn.off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
        return _this18._onCheck();
      });
      this.$helpBtn.off("click.".concat(this.ns, "Help")).on("click.".concat(this.ns, "Help"), function () {
        _this18._usedHintThisRound = true;
        _this18._showHintNote();
        _this18.$helpBtn.hide();
      });
      this.$skipBtn.off("click.".concat(this.ns, "Skip")).on("click.".concat(this.ns, "Skip"), function (e) {
        e.preventDefault();
        _this18._finishRoundAsTimedOut();
      });
      if (!this._continueBound) {
        this._continueBound = true;
        $("#continue button").off("click.".concat(this.ns)).on("click.".concat(this.ns), function () {
          $("#continue").hide();
          _this18._hideSkipRoundButton();
          _this18._hideTimeUpMessage();
          _this18._setTimedOutInteractivityDisabled(false);
          _this18._resetRoundTimerIfEnabled();
          _this18.prompt.setTone("blue");
          _this18.$accidentals.removeClass("invisible");
          _this18.newChallenge();
          _this18._syncPianoKeyboardStartNote();
          _this18._syncPianoKeyboardMarkerFromStaff();
          _this18._armUiGates({
            resetInstructions: true
          });
          _this18.$checkBtn.enable();
        });
      }
    }
  }, {
    key: "_hideHelpButtonOnAnswerEdit",
    value: function _hideHelpButtonOnAnswerEdit() {
      var _this$$helpBtn, _this$$helpBtn$hide;
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if ((data === null || data === void 0 ? void 0 : data.source) === "fixed") return;
      (_this$$helpBtn = this.$helpBtn) === null || _this$$helpBtn === void 0 || (_this$$helpBtn$hide = _this$$helpBtn.hide) === null || _this$$helpBtn$hide === void 0 || _this$$helpBtn$hide.call(_this$$helpBtn);
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
    key: "_currentUserNoteCount",
    value: function _currentUserNoteCount() {
      if (this.staff && typeof this.staff._userNoteCount === "function") {
        return this.staff._userNoteCount();
      }
      return this.$staffEl.find(".note").not(".fixed").not(".preview").not(".hint").length;
    }
  }, {
    key: "_armUiGates",
    value: function _armUiGates() {
      var _this19 = this;
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        resetInstructions = _ref3.resetInstructions;
      var needForInstructions = this._instructionsAfterUserNotes();
      var needForCheck = this._checkAfterUserNotes();
      if (resetInstructions) {
        this._instructionsRemoved = false;
        this.$instructions.show();
      }
      if (needForCheck <= 0) $("#check").show().removeClass("invisible");else $("#check").hide().addClass("invisible");
      this._userNotesSinceGate = 0;
      var syncUiGate = function syncUiGate() {
        var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this19._currentUserNoteCount();
        var userNoteCount = Number.isFinite(count) ? count : _this19._currentUserNoteCount();
        if (needForInstructions > 0 && userNoteCount < needForInstructions) {
          _this19._restoreInstructions();
        } else if (!_this19._instructionsRemoved && userNoteCount >= needForInstructions) {
          _this19._removeInstructions();
        }
        if (needForCheck <= 0 || userNoteCount >= needForCheck) {
          $("#check").show().removeClass("invisible");
        } else {
          $("#check").hide().addClass("invisible");
        }
      };
      syncUiGate();
      this.$staffEl.off("staff:userNoteAdded._uiGate.".concat(this.ns, " staff:userNotesChanged._uiGate.").concat(this.ns)).on("staff:userNoteAdded._uiGate.".concat(this.ns), function () {
        _this19._userNotesSinceGate += 1;
        _this19._hideHelpButtonOnAnswerEdit();
        syncUiGate();
      }).on("staff:userNotesChanged._uiGate.".concat(this.ns), function (e, data) {
        _this19._hideHelpButtonOnAnswerEdit(data);
        syncUiGate(Number(data === null || data === void 0 ? void 0 : data.count));
      });
      this.$staffEl.off("staff:noteState._hideHelp.".concat(this.ns)).on("staff:noteState._hideHelp.".concat(this.ns), function (e, data) {
        _this19._hideHelpButtonOnAnswerEdit(data);
      });
    }

    // ------------------------ fixed note selection ------------------------
  }, {
    key: "_fixedStepBounds",
    value: function _fixedStepBounds() {
      return {
        min: this.staff.minStepAllowed(),
        max: this.staff.maxStepAllowed()
      };
    }
  }, {
    key: "_randomFixedStep",
    value: function _randomFixedStep() {
      var _this$_fixedStepBound = this._fixedStepBounds(),
        min = _this$_fixedStepBound.min,
        max = _this$_fixedStepBound.max;
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
      var _this20 = this;
      var ids = Array.isArray(this._activeHintIds) ? this._activeHintIds : [];
      ids.forEach(function (id) {
        return _this20.staff.removeNote(id);
      });
      this._activeHintIds = [];
    }
  }, {
    key: "_removeAllUserNotesForHint",
    value: function _removeAllUserNotesForHint() {
      var _this21 = this;
      var $userNotes = this.$staffEl.find(".note").not(".fixed").not(".preview").not(".hint");
      $userNotes.each(function (_, el) {
        var id = el.getAttribute("data-note-id");
        if (id) _this21.staff.removeNote(id);
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
      var _this22 = this;
      var $note = this.$staffEl.find(".note[data-note-id=\"".concat(noteId, "\"]"));
      if (!$note.length) return;
      $note.off("animationend.hint.".concat(noteId, " webkitAnimationEnd.hint.").concat(noteId)).one("animationend.hint.".concat(noteId, " webkitAnimationEnd.hint.").concat(noteId), function () {
        _this22.staff.removeNote(noteId);
        _this22._activeHintIds = (_this22._activeHintIds || []).filter(function (x) {
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
      var _this23 = this;
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
        this.$instructions.hide();
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
          return _this23._showFinalResults();
        }, finalDelayMs);
      } else {
        $("#check").hide();
        $("#continue").show();
      }
    }
  }, {
    key: "_runSuccessFeedbackTransition",
    value: function _runSuccessFeedbackTransition() {
      var _this24 = this;
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
        var _this24$$feedback, _this24$$feedback$hid;
        _this24._successFeedbackTimeoutId = null;
        (_this24$$feedback = _this24.$feedback) === null || _this24$$feedback === void 0 || (_this24$$feedback$hid = _this24$$feedback.hide) === null || _this24$$feedback$hid === void 0 || _this24$$feedback$hid.call(_this24$$feedback);
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
      var _this25 = this;
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
        _this25.$checkBtn.enable();
      });
    }
  }, {
    key: "_removeInstructions",
    value: function _removeInstructions() {
      if (this._instructionsRemoved) return;
      this.$instructions.hide();
      this._instructionsRemoved = true;
    }
  }, {
    key: "_restoreInstructions",
    value: function _restoreInstructions() {
      if (!this._instructionsRemoved) return;
      this.$instructions.show();
      this._instructionsRemoved = false;
    }
  }, {
    key: "_bonusPointSettingKeys",
    value: function _bonusPointSettingKeys() {
      var _this$opts2;
      return Array.isArray((_this$opts2 = this.opts) === null || _this$opts2 === void 0 ? void 0 : _this$opts2.bonusPoints) ? this.opts.bonusPoints.map(function (key) {
        return String(key || "").trim();
      }).filter(Boolean) : [];
    }
  }, {
    key: "_hasConfiguredScoreDoubleBonus",
    value: function _hasConfiguredScoreDoubleBonus(accuracy) {
      var _this26 = this;
      if (Number(accuracy) !== 100) return false;
      var keys = BaseStaffGame.prototype._bonusPointSettingKeys.call(this);
      return keys.some(function (key) {
        var _this26$opts;
        return BaseStaffGame.prototype._normalizeOnOff.call(_this26, (_this26$opts = _this26.opts) === null || _this26$opts === void 0 ? void 0 : _this26$opts[key]);
      });
    }
  }, {
    key: "_buildFinalScoreSummary",
    value: function _buildFinalScoreSummary() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref8$basePoints = _ref8.basePoints,
        basePoints = _ref8$basePoints === void 0 ? 0 : _ref8$basePoints,
        _ref8$accuracy = _ref8.accuracy,
        accuracy = _ref8$accuracy === void 0 ? 0 : _ref8$accuracy,
        _ref8$perfectGame = _ref8.perfectGame,
        perfectGame = _ref8$perfectGame === void 0 ? false : _ref8$perfectGame;
      var normalizedBasePoints = Number(basePoints) || 0;
      var initialScore = perfectGame ? normalizedBasePoints * 2 : normalizedBasePoints;
      var settingsBonus = BaseStaffGame.prototype._hasConfiguredScoreDoubleBonus.call(this, accuracy);
      var finalScore = settingsBonus ? initialScore * 2 : initialScore;
      return {
        perfectGame: !!perfectGame,
        settingsBonus: settingsBonus,
        initialScore: initialScore,
        finalScore: finalScore
      };
    }
  }, {
    key: "_showFinalResults",
    value: function _showFinalResults() {
      var _this$_stats$checksTo,
        _this$_stats$checksCo,
        _this$_stats$finished,
        _this27 = this;
      if (this._isPracticeMode()) return;
      var total = Math.max(0, (_this$_stats$checksTo = this._stats.checksTotal) !== null && _this$_stats$checksTo !== void 0 ? _this$_stats$checksTo : 0);
      var correct = Math.max(0, (_this$_stats$checksCo = this._stats.checksCorrect) !== null && _this$_stats$checksCo !== void 0 ? _this$_stats$checksCo : 0);
      var accuracy = total ? Math.round(correct / total * 100) : 0;
      var endMs = (_this$_stats$finished = this._stats.finishedAtMs) !== null && _this$_stats$finished !== void 0 ? _this$_stats$finished : Date.now();
      var totalSeconds = Math.max(0, Math.floor((endMs - PAGE_OPENED_AT_MS) / 1000));
      var perfectGame = total > 0 && !this._madeAnyMistake;
      var scoreSummary = this._buildFinalScoreSummary({
        basePoints: this.points,
        accuracy: accuracy,
        perfectGame: perfectGame
      });
      if (perfectGame) {
        setTimeout(function () {
          var _this27$$doublePoints, _this27$$doublePoints2;
          (_this27$$doublePoints = _this27.$doublePoints) === null || _this27$$doublePoints === void 0 || (_this27$$doublePoints2 = _this27$$doublePoints.show) === null || _this27$$doublePoints2 === void 0 || _this27$$doublePoints2.call(_this27$$doublePoints);
          _this27._playPerfectGameBonusSfx();
        }, 1750);

        // eslint-disable-next-line no-console
        console.log("[BaseStaffGame] Perfect game! 2x bonus applied.", {
          basePoints: this.points,
          finalPoints: scoreSummary.initialScore
        });
      } else {
        // eslint-disable-next-line no-console
        console.log("[BaseStaffGame] No perfect-game bonus.", {
          basePoints: this.points,
          finalPoints: scoreSummary.initialScore,
          madeAnyMistake: this._madeAnyMistake
        });
      }
      if (scoreSummary.settingsBonus) {
        // eslint-disable-next-line no-console
        console.log("[BaseStaffGame] Extra doubling is happening because the user selected challenging settings.", {
          scoreBeforeSettingsBonus: scoreSummary.initialScore,
          finalPoints: scoreSummary.finalScore
        });
      }
      (0,_shared_finalResults_js__WEBPACK_IMPORTED_MODULE_2__.renderFinalResultsOverlay)({
        $finalOverlay: this.$finalOverlay,
        rounds: this.numOfChallenges,
        score: scoreSummary.finalScore,
        accuracy: accuracy,
        durationSec: totalSeconds,
        settingsBonus: scoreSummary.settingsBonus,
        clearCountupTimers: function clearCountupTimers() {
          return _this27._clearFinalCountupTimers();
        },
        countupTimers: this._finalCountupTimeouts,
        animateMetrics: function animateMetrics() {
          return _this27._animateFinalMetricsWithSfx();
        },
        playFinalSfx: function playFinalSfx() {
          return _this27._playFinalSfx();
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

/***/ "./resources/js/music/games/chorddetective/ChordDetective.js"
/*!*******************************************************************!*\
  !*** ./resources/js/music/games/chorddetective/ChordDetective.js ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChordDetective: () => (/* binding */ ChordDetective)
/* harmony export */ });
/* harmony import */ var _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/BaseStaffGame.js */ "./resources/js/music/games/base/BaseStaffGame.js");
/* harmony import */ var _staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../staff/staffUtils.js */ "./resources/js/music/staff/staffUtils.js");
/* harmony import */ var _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
/* harmony import */ var _shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/challengeUtils.js */ "./resources/js/music/games/shared/challengeUtils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
// resources/js/music/games/chorddetective/ChordDetective.js





/**
 * Chord Detective
 *
 * Rules:
 * - Staff note sounds are always disabled (no click/drag audio).
 * - SFX follow the global sound toggle (BaseStaffGame / opts.sound).
 * - Dictation playback always plays (ignores opts.sound) via its own synth.
 * - The player enters the two heard notes that complete the triad from the fixed anchor.
 * - Answer checking is pitch-only for those notes (enharmonic spellings are accepted).
 */
var ChordDetective = /*#__PURE__*/function (_BaseStaffGame) {
  function ChordDetective() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ChordDetective);
    var defaults = {
      staffEl: "#staff",
      basePoints: 1,
      firstTryBonus: 2,
      namespace: "chordDetective",
      allowInversions: false,
      // Dictation: two user notes complete the heard triad.
      maxUserNotes: 2,
      // UI gating: show Check after 2 user notes.
      instructionsAfterUserNotes: 2,
      checkAfterUserNotes: 2
    };
    var merged = _objectSpread(_objectSpread(_objectSpread({}, defaults), options), {}, {
      accidentalWeights: _objectSpread(_objectSpread({}, defaults.accidentalWeights || {}), options.accidentalWeights || {}),
      triadQualities: Array.isArray(options.triadQualities) && options.triadQualities.length ? options.triadQualities.slice() : Object.keys(ChordDetective.TRIAD_QUALITY_FULL_NAME_MAP)
    });
    merged.maxUserNotes = 2;
    merged.instructionsAfterUserNotes = 2;
    merged.checkAfterUserNotes = 2;
    var clefPool = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_3__.normalizeClefPool)(merged.clefs != null ? merged.clefs : merged.clef);
    _this = _callSuper(this, ChordDetective, [_objectSpread(_objectSpread({}, merged), {}, {
      initialClef: clefPool && clefPool[0] ? clefPool[0] : "treble"
    })]);
    _this._clefPool = clefPool;

    // Dictation state
    _this._expectedFirst = null; // { noteId, step, accidentalClass }
    _this._expectedChordNotes = []; // [{ step, accidentalClass, accOff, midi }]
    _this._currentTriadQuality = null;
    _this._currentChordDirection = 1; // 1=up, -1=down
    _this._currentChordInversion = 0; // 0=root position, 1=first inversion, 2=second inversion

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
  _inherits(ChordDetective, _BaseStaffGame);
  return _createClass(ChordDetective, [{
    key: "start",
    value: function start() {
      var _this2 = this;
      _superPropGet(ChordDetective, "start", this, 3)([]);

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
      if (!this._expectedFirst || !this._expectedChordNotes.length) return;
      this._stopDictationPlayback();
      this._setPlayButtons(true);
      var firstMidi = this.staff._stepToMidi(this._expectedFirst.step) + (this.staff._accidentalClassToOffset(this._expectedFirst.accidentalClass) || 0);
      var chordMidis = [firstMidi].concat(_toConsumableArray(this._expectedChordNotes.map(function (note) {
        return note.midi;
      })));

      // Sequence: anchor -> chord tone -> chord tone -> chord tone -> anchor -> full triad.
      this._playMidi(firstMidi, 0.6, 0.0, function () {
        return _this3._scheduleInitialNoteFlicker(0.6, 0.0);
      });
      this._playMidi(this._expectedChordNotes[0].midi, 0.6, 1.0);
      this._playMidi(this._expectedChordNotes[1].midi, 0.6, 2.0);
      this._playMidi(this._expectedChordNotes[0].midi, 0.6, 3.0);
      this._playMidi(firstMidi, 0.6, 4.0, function () {
        return _this3._scheduleInitialNoteFlicker(0.6, 4.0);
      });
      this._playMidiGroup(chordMidis, 0.8, 5.0, function () {
        return _this3._scheduleInitialNoteFlicker(0.8, 5.0);
      });
      this._dictationTimeouts.push(setTimeout(function () {
        // eslint-disable-next-line no-console
        console.log("Dictation: user can now write the chord tones on the staff.");
        _this3._setPlayButtons(false);
      }, 5200));
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
      this._clearInitialNoteFlicker();
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
              this._dictSynth = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.createDictationSynth();
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
      var onPlay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (!window.Tone) return;
      this._ensureDictationAudio().then(function () {
        if (!_this4._dictSynth) return;
        var now = Tone.now();
        var when = now + (Number(atSecondsFromNow) || 0);
        var dur = Number(durSeconds) || 0.6;
        _this4._dictSynth.triggerAttackRelease(Tone.Frequency(midi, "midi"), dur, when, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("dictation", 1));
        if (typeof onPlay === "function") onPlay();
      });
    }
  }, {
    key: "_playMidiGroup",
    value: function _playMidiGroup(midis, durSeconds, atSecondsFromNow) {
      var _this5 = this;
      var onPlay = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (!window.Tone) return;
      var notes = Array.isArray(midis) ? midis.filter(function (midi) {
        return Number.isFinite(midi);
      }) : [];
      if (!notes.length) return;
      this._ensureDictationAudio().then(function () {
        if (!_this5._dictSynth) return;
        var now = Tone.now();
        var when = now + (Number(atSecondsFromNow) || 0);
        var dur = Number(durSeconds) || 0.8;
        _this5._dictSynth.triggerAttackRelease(notes.map(function (midi) {
          return Tone.Frequency(midi, "midi");
        }), dur, when, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("dictation", 1));
        if (typeof onPlay === "function") onPlay();
      });
    }
  }, {
    key: "_initialNoteEl",
    value: function _initialNoteEl() {
      var _this$_expectedFirst;
      var noteId = (_this$_expectedFirst = this._expectedFirst) === null || _this$_expectedFirst === void 0 ? void 0 : _this$_expectedFirst.noteId;
      if (!noteId) return $();
      return this.$staffEl.find(".note").filter(function (_, el) {
        return String(el.getAttribute("data-note-id") || "") === String(noteId);
      }).first();
    }
  }, {
    key: "_clearInitialNoteFlicker",
    value: function _clearInitialNoteFlicker() {
      this._initialNoteEl().removeClass("flickering");
    }
  }, {
    key: "_scheduleInitialNoteFlicker",
    value: function _scheduleInitialNoteFlicker(durSeconds, atSecondsFromNow) {
      var _this6 = this;
      var delayMs = Math.max(0, (Number(atSecondsFromNow) || 0) * 1000);
      var durationMs = Math.max(0, (Number(durSeconds) || 0.6) * 1000);
      var startId = setTimeout(function () {
        var $note = _this6._initialNoteEl();
        if (!$note.length) return;
        $note.addClass("flickering");
        var endId = setTimeout(function () {
          $note.removeClass("flickering");
        }, durationMs);
        _this6._dictationTimeouts.push(endId);
      }, delayMs);
      this._dictationTimeouts.push(startId);
    }

    // ------------------------ selection ------------------------
  }, {
    key: "_pickTriadQuality",
    value: function _pickTriadQuality() {
      var pool = Array.isArray(this.opts.triadQualities) && this.opts.triadQualities.length ? this.opts.triadQualities : Object.keys(ChordDetective.TRIAD_QUALITY_FULL_NAME_MAP);
      return pool[Math.floor(Math.random() * pool.length)];
    }
  }, {
    key: "_directionPool",
    value: function _directionPool() {
      var raw = Array.isArray(this.opts.direction) ? this.opts.direction : this.opts.direction != null ? [this.opts.direction] : ["up", "down"];
      var pool = raw.map(function (direction) {
        return String(direction || "").trim().toLowerCase();
      }).filter(function (direction) {
        return direction === "up" || direction === "down";
      });
      return pool.length ? _toConsumableArray(new Set(pool)) : ["up", "down"];
    }
  }, {
    key: "_pickDirection",
    value: function _pickDirection() {
      return (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickOne)(this._directionPool());
    }
  }, {
    key: "_directionValue",
    value: function _directionValue(direction) {
      return String(direction || "").trim().toLowerCase() === "down" ? -1 : 1;
    }
  }, {
    key: "_allowInitialAccidentals",
    value: function _allowInitialAccidentals() {
      return this._normalizeOnOff(this.opts.allowAccidentals);
    }
  }, {
    key: "_pickInitialAccidentalClass",
    value: function _pickInitialAccidentalClass() {
      if (!this._allowInitialAccidentals()) return null;
      var w = this.opts.accidentalWeights || {};
      return (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickWeighted)([{
        value: null,
        weight: Number(w.natural) || 0
      }, {
        value: "music-font__sharp",
        weight: Number(w.sharp) || 0
      }, {
        value: "music-font__flat",
        weight: Number(w.flat) || 0
      }]);
    }
  }, {
    key: "_normalizeInitialNoteAccidental",
    value: function _normalizeInitialNoteAccidental(note) {
      if (!note || this._allowInitialAccidentals()) return note;
      return _objectSpread(_objectSpread({}, note), {}, {
        accidentalClass: null
      });
    }
  }, {
    key: "_initialNoteAccidentalAllowed",
    value: function _initialNoteAccidentalAllowed(note) {
      if (this._allowInitialAccidentals()) return true;
      var accidentalClass = (note === null || note === void 0 ? void 0 : note.accidentalClass) || null;
      return accidentalClass == null || accidentalClass === "music-font__natural";
    }
  }, {
    key: "_pickFixedNote",
    value: function _pickFixedNote() {
      var fixedList = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.toArrayMaybe)(this.opts.fixedNotes).filter(Boolean);
      if (fixedList.length) {
        var chosen = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickOne)(fixedList);
        return this._normalizeInitialNoteAccidental((0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_3__.fixedNoteToStaffPosition)(this.staff, chosen));
      }
      return {
        step: this._randomFixedStep(),
        accidentalClass: this._pickInitialAccidentalClass()
      };
    }
  }, {
    key: "_randomFixedStep",
    value: function _randomFixedStep() {
      var min = this.staff.minStepAllowed();
      var max = this.staff.maxStepAllowed();
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ------------------------ triad math ------------------------
  }, {
    key: "_triadExpectedSemisForQuality",
    value: function _triadExpectedSemisForQuality(quality) {
      var triads = {
        major: [4, 7],
        minor: [3, 7],
        augmented: [4, 8],
        diminished: [3, 6]
      };
      return triads[String(quality || "").trim()] || null;
    }
  }, {
    key: "_toneAccidentalClass",
    value: function _toneAccidentalClass(rootMidi, targetStep, targetSemis) {
      var naturalMidi = this.staff._stepToMidi(targetStep);
      var offset = rootMidi + targetSemis - naturalMidi;
      while (offset > 6) offset -= 12;
      while (offset < -6) offset += 12;
      var accClass = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_3__.accidentalClassFromOffset)(offset);
      if (accClass == null && offset !== 0) return null;
      return accClass;
    }
  }, {
    key: "_computeChordNotesFromRoot",
    value: function _computeChordNotesFromRoot(quality, rootStep, rootMidi, direction) {
      var expected = this._triadExpectedSemisForQuality(quality);
      if (!expected) return null;
      var dir = this._directionValue(direction);
      var minStep = this.staff.minStepAllowed();
      var maxStep = this.staff.maxStepAllowed();
      var roles = [{
        stepOffset: 2,
        semis: expected[0]
      }, {
        stepOffset: 4,
        semis: expected[1]
      }];
      var notes = [];
      for (var _i = 0, _roles = roles; _i < _roles.length; _i++) {
        var role = _roles[_i];
        var targetStep = rootStep + dir * role.stepOffset;
        if (targetStep < minStep || targetStep > maxStep) return null;
        var targetSemis = dir * role.semis;
        var accidentalClass = this._toneAccidentalClass(rootMidi, targetStep, targetSemis);
        if (accidentalClass == null && targetSemis !== 0) return null;
        var midi = rootMidi + targetSemis;
        var accOff = midi - this.staff._stepToMidi(targetStep);
        notes.push({
          step: targetStep,
          accidentalClass: accidentalClass,
          accOff: accOff,
          midi: midi
        });
      }
      return notes;
    }
  }, {
    key: "_triadRoleSpecs",
    value: function _triadRoleSpecs(expected) {
      return [{
        role: 0,
        stepOffset: 0,
        semis: 0
      }, {
        role: 2,
        stepOffset: 2,
        semis: expected[0]
      }, {
        role: 4,
        stepOffset: 4,
        semis: expected[1]
      }];
    }
  }, {
    key: "_voicingToneFromRoot",
    value: function _voicingToneFromRoot(rootStep, rootMidi, roleSpecs, roleIndex) {
      var octaveShift = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var role = roleSpecs[roleIndex];
      if (!role) return null;
      var step = rootStep + role.stepOffset + 7 * octaveShift;
      var semis = role.semis + 12 * octaveShift;
      var minStep = this.staff.minStepAllowed();
      var maxStep = this.staff.maxStepAllowed();
      if (step < minStep || step > maxStep) return null;
      var accidentalClass = this._toneAccidentalClass(rootMidi, step, semis);
      if (accidentalClass == null && semis !== 0) return null;
      var midi = rootMidi + semis;
      var accOff = midi - this.staff._stepToMidi(step);
      return {
        step: step,
        accidentalClass: accidentalClass,
        accOff: accOff,
        midi: midi
      };
    }
  }, {
    key: "_computeChordVoicingFromRoot",
    value: function _computeChordVoicingFromRoot(quality, rootStep, rootMidi, direction) {
      var inversion = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var expected = this._triadExpectedSemisForQuality(quality);
      if (!expected) return null;
      var roleSpecs = this._triadRoleSpecs(expected);
      var dir = this._directionValue(direction);
      var anchorIndex = Math.max(0, Math.min(2, Number(inversion) || 0));
      var fixed = this._voicingToneFromRoot(rootStep, rootMidi, roleSpecs, anchorIndex, 0);
      if (!fixed) return null;
      var chordNotes = [];
      for (var offset = 1; offset <= 2; offset += 1) {
        var rawIndex = anchorIndex + dir * offset;
        var octaveShift = Math.floor(rawIndex / roleSpecs.length);
        var roleIndex = (rawIndex % roleSpecs.length + roleSpecs.length) % roleSpecs.length;
        var note = this._voicingToneFromRoot(rootStep, rootMidi, roleSpecs, roleIndex, octaveShift);
        if (!note) return null;
        chordNotes.push(note);
      }
      return {
        fixed: fixed,
        chordNotes: chordNotes
      };
    }
  }, {
    key: "_pickInvertedVoicingFromFixed",
    value: function _pickInvertedVoicingFromFixed(quality, fixed, direction) {
      var _this7 = this;
      var expected = this._triadExpectedSemisForQuality(quality);
      if (!expected || !fixed) return null;
      var roleSpecs = this._triadRoleSpecs(expected);
      var anchor = this._normalizeInitialNoteAccidental(fixed);
      var fixedAccOff = this.staff._accidentalClassToOffset(anchor.accidentalClass) || 0;
      var fixedMidi = this.staff._stepToMidi(anchor.step) + fixedAccOff;
      var candidates = [];
      roleSpecs.forEach(function (role, inversion) {
        var _voicing$chordNotes;
        var rootStep = anchor.step - role.stepOffset;
        var rootMidi = fixedMidi - role.semis;
        var rootOff = rootMidi - _this7.staff._stepToMidi(rootStep);
        var rootAccidentalClass = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_3__.accidentalClassFromOffset)(rootOff);
        if (rootAccidentalClass == null && rootOff !== 0) return;
        var voicing = _this7._computeChordVoicingFromRoot(quality, rootStep, rootMidi, direction, inversion);
        if (!(voicing !== null && voicing !== void 0 && (_voicing$chordNotes = voicing.chordNotes) !== null && _voicing$chordNotes !== void 0 && _voicing$chordNotes.length)) return;
        candidates.push({
          inversion: inversion,
          fixed: _objectSpread(_objectSpread({}, anchor), {}, {
            midi: fixedMidi,
            accOff: fixedAccOff
          }),
          chordNotes: voicing.chordNotes
        });
      });
      return candidates.length ? (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickOne)(candidates) : null;
    }
  }, {
    key: "_pickRandomInvertedVoicing",
    value: function _pickRandomInvertedVoicing(quality, direction) {
      var expected = this._triadExpectedSemisForQuality(quality);
      if (!expected) return null;
      var minStep = this.staff.minStepAllowed();
      var maxStep = this.staff.maxStepAllowed();
      for (var i = 0; i < 80; i += 1) {
        var _voicing$chordNotes2;
        var rootStep = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.randomInt)(minStep, maxStep);
        var rootAccidentalClass = this._pickInitialAccidentalClass();
        var rootMidi = this.staff._stepToMidi(rootStep) + (this.staff._accidentalClassToOffset(rootAccidentalClass) || 0);
        var inversion = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickOne)([0, 1, 2]);
        var voicing = this._computeChordVoicingFromRoot(quality, rootStep, rootMidi, direction, inversion);
        if (!(voicing !== null && voicing !== void 0 && (_voicing$chordNotes2 = voicing.chordNotes) !== null && _voicing$chordNotes2 !== void 0 && _voicing$chordNotes2.length)) continue;
        if (!this._initialNoteAccidentalAllowed(voicing.fixed)) continue;
        return {
          inversion: inversion,
          fixed: voicing.fixed,
          chordNotes: voicing.chordNotes
        };
      }
      return null;
    }

    // ------------------------ game flow ------------------------
  }, {
    key: "newChallenge",
    value: function newChallenge() {
      var _this$$playWrap, _this$$doublePoints, _this$$doublePoints$h, _chordNotes2;
      if ((_this$$playWrap = this.$playWrap) !== null && _this$$playWrap !== void 0 && _this$$playWrap.length) this.$playWrap.show();
      this._setPlayButtons(false);
      this.$helpBtn.hide();
      this._fixedState = null;
      this._clearInitialNoteFlicker();
      this._expectedFirst = null;
      this._expectedChordNotes = [];
      this._currentTriadQuality = null;
      this._currentChordInversion = 0;
      var clef = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_3__.pickChallengeClef)(this._clefPool);
      if (clef && clef !== this.staff.getClef()) this.staff.setClef(clef);
      this._madeMistakeThisRound = false;
      this._usedHintThisRound = false;
      this.$bonusBadge.hide();
      (_this$$doublePoints = this.$doublePoints) === null || _this$$doublePoints === void 0 || (_this$$doublePoints$h = _this$$doublePoints.hide) === null || _this$$doublePoints$h === void 0 || _this$$doublePoints$h.call(_this$$doublePoints);
      var quality = this._pickTriadQuality();
      var direction = this._pickDirection();
      this._currentTriadQuality = quality;
      this._currentChordDirection = this._directionValue(direction);

      // Retry until we find a playable triad within staff bounds/accidentals.
      var fixed = null;
      var chordNotes = null;
      var inversion = 0;
      for (var i = 0; i < 80; i += 1) {
        var _chordNotes;
        if (this.opts.allowInversions) {
          var _voicing$chordNotes3;
          var fixedList = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.toArrayMaybe)(this.opts.fixedNotes).filter(Boolean);
          var voicing = fixedList.length ? this._pickInvertedVoicingFromFixed(quality, this._pickFixedNote(), direction) : this._pickRandomInvertedVoicing(quality, direction);
          if (!(voicing !== null && voicing !== void 0 && voicing.fixed) || !(voicing !== null && voicing !== void 0 && (_voicing$chordNotes3 = voicing.chordNotes) !== null && _voicing$chordNotes3 !== void 0 && _voicing$chordNotes3.length)) continue;
          fixed = voicing.fixed;
          chordNotes = voicing.chordNotes;
          inversion = voicing.inversion || 0;
          break;
        }
        fixed = this._pickFixedNote();
        if (!fixed) continue;
        var fixedAccOff = this.staff._accidentalClassToOffset(fixed.accidentalClass) || 0;
        var fixedMidi = this.staff._stepToMidi(fixed.step) + fixedAccOff;
        chordNotes = this._computeChordNotesFromRoot(quality, fixed.step, fixedMidi, direction);
        if (((_chordNotes = chordNotes) === null || _chordNotes === void 0 ? void 0 : _chordNotes.length) === 2) break;
      }
      if (!fixed || !((_chordNotes2 = chordNotes) !== null && _chordNotes2 !== void 0 && _chordNotes2.length)) return;
      this._currentChordInversion = inversion;
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
        noteId: fixedId,
        step: fixed.step,
        accidentalClass: fixed.accidentalClass || null
      };
      this._expectedChordNotes = chordNotes;
      $("#continue").hide();
    }

    // ------------------------ notes + hint ------------------------
  }, {
    key: "_notesOnStaffOrdered",
    value: function _notesOnStaffOrdered() {
      var _this8 = this;
      var $notes = this.$staffEl.find(".note").not(".preview").not(".hint");
      var notes = $notes.toArray().map(function (el) {
        var id = el.getAttribute("data-note-id");
        var step = _this8.staff._stepOfNoteEl(el);
        var accCls = _this8.staff._getAttachedAccidentalClass(id);
        var accOff = _this8.staff._accidentalClassToOffset(accCls) || 0;
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
    key: "_computeHintAnswers",
    value: function _computeHintAnswers() {
      return this._expectedChordNotes.map(function (note, index) {
        return {
          id: "hint".concat(index + 1),
          step: note.step,
          accidentalClass: note.accidentalClass || null
        };
      });
    }

    // ------------------------ evaluation ------------------------
  }, {
    key: "_onCheck",
    value: function _onCheck() {
      var _this9 = this;
      this._stopDictationPlayback();
      this._setPlayButtons(false);
      var notes = this._notesOnStaffOrdered();
      this.$checkBtn.disable();
      this._stats.checksTotal += 1;
      if (!this._expectedChordNotes.length) return;

      // fixed root + 2 user notes
      if (notes.length !== 3) {
        this._madeAnyMistake = true;
        this._madeMistakeThisRound = true;
        this._failAnimation(this.$checkWrap);
        this.$helpBtn.show();
        return;
      }
      var userNotes = notes.filter(function (n) {
        return !n.fixed;
      });
      if (userNotes.length !== 2) {
        this._madeAnyMistake = true;
        this._madeMistakeThisRound = true;
        this._failAnimation(this.$checkWrap);
        this.$helpBtn.show();
        return;
      }

      // Pitch-only correctness (enharmonics accepted), order-independent.
      var expectedMidis = this._expectedChordNotes.map(function (note) {
        return note.midi;
      }).sort(function (a, b) {
        return a - b;
      });
      var userMidis = userNotes.map(function (note) {
        return _this9.staff._stepToMidi(note.step) + (note.accOff || 0);
      }).sort(function (a, b) {
        return a - b;
      });
      var ok = expectedMidis.length === userMidis.length && expectedMidis.every(function (midi, index) {
        return midi === userMidis[index];
      });
      if (ok) {
        this._stats.checksCorrect += 1;
        this._pauseGameTimer();
        var _this$_awardPointsFor = this._awardPointsForCorrect(),
          earned = _this$_awardPointsFor.earned,
          bonusEarned = _this$_awardPointsFor.bonusEarned;
        this._handleCorrectAnswerUi({
          isBonus: bonusEarned > 0,
          earned: earned,
          $prompt: this.prompt.$root,
          $extraHide: this.$playWrap
        });
      } else {
        this._madeAnyMistake = true;
        this._madeMistakeThisRound = true;
        this._failAnimation(this.$checkWrap);
        this.$helpBtn.show();
      }
    }
  }]);
}(_base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame);
_defineProperty(ChordDetective, "TRIAD_QUALITY_FULL_NAME_MAP", {
  major: "major",
  minor: "minor",
  augmented: "augmented",
  diminished: "diminished"
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
                wallCrash: function wallCrash() {
                  var synth = GameAudio._getPreviewSynth("uiTimer", function () {
                    return GameAudio.createUiTimerSynth();
                  });
                  var noiseSynth = GameAudio._getPreviewSynth("uiNoise", function () {
                    return GameAudio.createUiNoiseSynth();
                  });
                  var now = Tone.now();
                  noiseSynth.triggerAttackRelease(0.12, now, GameAudio.scale("wallCrash", 0.32));
                  noiseSynth.triggerAttackRelease(0.09, now + 0.045, GameAudio.scale("wallCrash", 0.22));
                  synth.triggerAttackRelease("G3", 0.08, now, GameAudio.scale("wallCrash", 0.85));
                  synth.triggerAttackRelease("D3", 0.12, now + 0.04, GameAudio.scale("wallCrash", 0.7));
                  synth.triggerAttackRelease("A2", 0.18, now + 0.11, GameAudio.scale("wallCrash", 0.62));
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
                metronomeBeat: function metronomeBeat() {
                  GameAudio.playMetronomeClick(false);
                },
                metronomeDownbeat: function metronomeDownbeat() {
                  GameAudio.playMetronomeClick(true);
                },
                rhythmHit: function rhythmHit() {
                  GameAudio.playRhythmHit();
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
    key: "ensureMetronomeAudio",
    value: function () {
      var _ensureMetronomeAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (window.Tone) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2, null);
            case 1:
              _context2.n = 2;
              return Tone.start();
            case 2:
              return _context2.a(2, GameAudio._getPreviewSynth("metronome", function () {
                return GameAudio.createMetronomeSynth();
              }));
          }
        }, _callee2);
      }));
      function ensureMetronomeAudio() {
        return _ensureMetronomeAudio.apply(this, arguments);
      }
      return ensureMetronomeAudio;
    }()
  }, {
    key: "playMetronomeClick",
    value: function playMetronomeClick() {
      var isDownbeat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!window.Tone) return;
      var synth = GameAudio._getPreviewSynth("metronome", function () {
        return GameAudio.createMetronomeSynth();
      });
      var kind = isDownbeat ? "metronomeDownbeat" : "metronomeBeat";
      synth.triggerAttackRelease(isDownbeat ? "C6" : "C5", "16n", Tone.now(), GameAudio.scale(kind, 1));
    }
  }, {
    key: "createMetronomeSynth",
    value: function createMetronomeSynth() {
      return new Tone.Synth({
        oscillator: {
          type: "square"
        },
        envelope: {
          attack: 0.001,
          decay: 0.04,
          sustain: 0,
          release: 0.01
        },
        volume: GameAudio.SYNTH_VOLUME_DB.metronome
      }).toDestination();
    }
  }, {
    key: "playRhythmHit",
    value: function playRhythmHit() {
      if (!window.Tone) return;
      var synth = GameAudio._getPreviewSynth("rhythmHit", function () {
        return GameAudio.createRhythmHitSynth();
      });
      synth.triggerAttackRelease("C2", "8n", Tone.now(), GameAudio.scale("rhythmHit", 1));
    }
  }, {
    key: "createRhythmHitSynth",
    value: function createRhythmHitSynth() {
      return new Tone.MembraneSynth({
        pitchDecay: 0.035,
        octaves: 2.5,
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.001,
          decay: 0.12,
          sustain: 0,
          release: 0.06
        },
        volume: GameAudio.SYNTH_VOLUME_DB.rhythmHit
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
  metronome: -12,
  rhythmHit: -10,
  staffNote: -8,
  dictation: -9,
  sequence: -9
});
_defineProperty(GameAudio, "VELOCITY", {
  staffNote: 1.0,
  dictation: 1.0,
  sequence: 1.0,
  successBasic: 0.7,
  successBonus: 0.7,
  failNoise: 1,
  failNote: 1,
  bombFail: 1,
  wallCrash: .4,
  "final": 0.5,
  finalMetric: 0.85,
  perfectBonus: 0.25,
  runStart: 0.9,
  timerBeep: 0.7,
  timerTimeUp: 0.95,
  countdownBeep: 1,
  metronomeBeat: 0.4,
  metronomeDownbeat: 0.6,
  rhythmHit: 0.65,
  hinge: 0.55
});
_defineProperty(GameAudio, "SOUND_LIBRARY", [{
  id: "staffNote",
  label: "Staff Note",
  volumeKey: "staffNote",
  description: "Base loudness for staff note playback."
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
  id: "wallCrash",
  label: "Wall Crash",
  volumeKey: "wallCrash",
  description: "Sharp breaking impact when the snake crashes into a wall."
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
  id: "metronomeBeat",
  label: "Metronome Beat",
  volumeKey: "metronomeBeat",
  description: "Regular metronome click."
}, {
  id: "metronomeDownbeat",
  label: "Metronome Downbeat",
  volumeKey: "metronomeDownbeat",
  description: "Higher-pitched click on the first beat of each measure."
}, {
  id: "rhythmHit",
  label: "Rhythm Hit",
  volumeKey: "rhythmHit",
  description: "Low percussive sound for Beat Hero rhythm notes."
}, {
  id: "hinge",
  label: "Hinge",
  volumeKey: "hinge",
  description: "Short hinge/fall sound used by ToneTrek block reveals."
}]);
_defineProperty(GameAudio, "_previewSynths", {});

/***/ },

/***/ "./resources/js/music/games/shared/InstructionsUi.js"
/*!***********************************************************!*\
  !*** ./resources/js/music/games/shared/InstructionsUi.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InstructionsUi: () => (/* binding */ InstructionsUi)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var InstructionsUi = /*#__PURE__*/function () {
  function InstructionsUi() {
    var rootSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#instructions";
    _classCallCheck(this, InstructionsUi);
    this.$root = $(rootSelector).first();
    this.$content = this.$root.find("h6").first();
    if (!this.$content.length) this.$content = this.$root;
    this._typed = null;
    this._lastHtml = this.$content.html() || "";
  }
  return _createClass(InstructionsUi, [{
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
    key: "setHtml",
    value: function setHtml(value) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$animate = _ref.animate,
        animate = _ref$animate === void 0 ? true : _ref$animate;
      if (!this.$content.length) return this;
      var html = String(value !== null && value !== void 0 ? value : "");
      this._lastHtml = html;
      this._destroyTyped();
      this.$content.html("");
      if (!html) return this;
      var shouldAnimate = animate && typeof window.Typed === "function";
      if (!shouldAnimate) {
        this.$content.html(html);
        return this;
      }
      var $typedTarget = $("<span></span>").addClass("instructions__typed");
      this.$content.append($typedTarget);
      this._typed = new window.Typed($typedTarget[0], {
        strings: [html],
        typeSpeed: 24,
        startDelay: 180,
        showCursor: true,
        contentType: "html"
      });
      return this;
    }
  }, {
    key: "replay",
    value: function replay() {
      return this.setHtml(this._lastHtml);
    }
  }, {
    key: "getHtml",
    value: function getHtml() {
      return this._lastHtml;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._destroyTyped();
      return this;
    }
  }, {
    key: "_destroyTyped",
    value: function _destroyTyped() {
      var _this$_typed;
      if (!((_this$_typed = this._typed) !== null && _this$_typed !== void 0 && _this$_typed.destroy)) return;
      this._typed.destroy();
      this._typed = null;
    }
  }]);
}();

/***/ },

/***/ "./resources/js/music/games/shared/PianoKeyboardUi.js"
/*!************************************************************!*\
  !*** ./resources/js/music/games/shared/PianoKeyboardUi.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PianoKeyboardUi: () => (/* binding */ PianoKeyboardUi)
/* harmony export */ });
/* harmony import */ var _GameAudio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var PianoKeyboardUi = /*#__PURE__*/function () {
  function PianoKeyboardUi() {
    var _this$_naturalMidiFro;
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$rootSelector = _ref.rootSelector,
      rootSelector = _ref$rootSelector === void 0 ? "#keyboard" : _ref$rootSelector,
      _ref$namespace = _ref.namespace,
      namespace = _ref$namespace === void 0 ? "pianoKeyboard" : _ref$namespace,
      _ref$onKeyClick = _ref.onKeyClick,
      onKeyClick = _ref$onKeyClick === void 0 ? null : _ref$onKeyClick,
      _ref$canPlayNote = _ref.canPlayNote,
      canPlayNote = _ref$canPlayNote === void 0 ? null : _ref$canPlayNote,
      _ref$visibleWhiteKeys = _ref.visibleWhiteKeys,
      visibleWhiteKeys = _ref$visibleWhiteKeys === void 0 ? 7 : _ref$visibleWhiteKeys,
      _ref$initialStartNote = _ref.initialStartNote,
      initialStartNote = _ref$initialStartNote === void 0 ? "C4" : _ref$initialStartNote;
    _classCallCheck(this, PianoKeyboardUi);
    this.rootSelector = rootSelector;
    this.ns = namespace;
    this.onKeyClick = typeof onKeyClick === "function" ? onKeyClick : null;
    this.canPlayNote = typeof canPlayNote === "function" ? canPlayNote : null;
    this.visibleWhiteKeys = Math.max(1, Number(visibleWhiteKeys) || 7);
    this._startWhiteMidi = (_this$_naturalMidiFro = this._naturalMidiFromNoteName(initialStartNote)) !== null && _this$_naturalMidiFro !== void 0 ? _this$_naturalMidiFro : 60;
    this._activeMarkers = new Map();
    this._renderTimeoutId = null;
    this._audioReady = false;
    this._synth = null;
    this._drag = {
      active: false,
      pointerId: null,
      startPageX: 0,
      originWhiteMidi: this._startWhiteMidi,
      lastStepOffset: 0,
      didMove: false,
      suppressClickUntil: 0
    };
  }
  return _createClass(PianoKeyboardUi, [{
    key: "setStartNote",
    value: function setStartNote(noteName) {
      var midi = this._naturalMidiFromNoteName(noteName);
      if (!Number.isFinite(midi)) return this;
      this._startWhiteMidi = midi;
      this.clearActive();
      this.render();
      return this;
    }
  }, {
    key: "bind",
    value: function bind() {
      var _this = this;
      this.render();
      $(document).off("click.".concat(this.ns), this.rootSelector).on("click.".concat(this.ns), this.rootSelector, function (e) {
        if (Date.now() < _this._drag.suppressClickUntil) return;
        e.preventDefault();
        _this._activateKeyFromTarget(e.target);
      });
      $(document).off("pointerdown.".concat(this.ns, "Drag"), this.rootSelector).on("pointerdown.".concat(this.ns, "Drag"), this.rootSelector, function (e) {
        var _e$originalEvent;
        e.preventDefault();
        var pointerId = (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 ? void 0 : _e$originalEvent.pointerId;
        var $key = _this._resolveKeyFromTarget(e.target);
        if ($key.length) {
          _this._drag.suppressClickUntil = Date.now() + 250;
          _this._activateKeyFromTarget($key[0]);
        }
        _this._drag.active = true;
        _this._drag.pointerId = pointerId != null ? pointerId : null;
        _this._drag.startPageX = e.pageX;
        _this._drag.originWhiteMidi = _this._startWhiteMidi;
        _this._drag.lastStepOffset = 0;
        _this._drag.didMove = false;
        $(e.currentTarget).addClass("dragging");
        if (e.currentTarget.setPointerCapture && pointerId != null) {
          e.currentTarget.setPointerCapture(pointerId);
        }
      });
      $(document).off("pointermove.".concat(this.ns, "Drag")).on("pointermove.".concat(this.ns, "Drag"), function (e) {
        var _e$originalEvent2;
        if (!_this._drag.active) return;
        var pointerId = (_e$originalEvent2 = e.originalEvent) === null || _e$originalEvent2 === void 0 ? void 0 : _e$originalEvent2.pointerId;
        if (_this._drag.pointerId != null && pointerId != null && pointerId !== _this._drag.pointerId) return;
        var whiteKeyWidth = _this._whiteKeyWidth();
        if (!Number.isFinite(whiteKeyWidth) || whiteKeyWidth <= 0) return;
        var deltaX = e.pageX - _this._drag.startPageX;
        var nextOffset = _this._stepOffsetFromDeltaX(deltaX, whiteKeyWidth);
        if (nextOffset === _this._drag.lastStepOffset) return;
        _this._drag.lastStepOffset = nextOffset;
        _this._drag.didMove = true;
        _this._startWhiteMidi = _this._shiftNaturalMidi(_this._drag.originWhiteMidi, -nextOffset);
        _this.render();
      });
      $(document).off("pointerup.".concat(this.ns, "Drag pointercancel.").concat(this.ns, "Drag")).on("pointerup.".concat(this.ns, "Drag pointercancel.").concat(this.ns, "Drag"), function (e) {
        var _e$originalEvent3;
        var pointerId = (_e$originalEvent3 = e.originalEvent) === null || _e$originalEvent3 === void 0 ? void 0 : _e$originalEvent3.pointerId;
        if (_this._drag.pointerId != null && pointerId != null && pointerId !== _this._drag.pointerId) return;
        _this._finishDrag();
      });
      return this;
    }
  }, {
    key: "unbind",
    value: function unbind() {
      $(document).off("click.".concat(this.ns), this.rootSelector);
      $(document).off("pointerdown.".concat(this.ns, "Drag"), this.rootSelector);
      $(document).off("pointermove.".concat(this.ns, "Drag"));
      $(document).off("pointerup.".concat(this.ns, "Drag pointercancel.").concat(this.ns, "Drag"));
      return this;
    }
  }, {
    key: "render",
    value: function render() {
      var $root = $(this.rootSelector).first();
      if (!$root.length) return this;
      var whiteNotes = this._visibleWhiteNotes();
      var nextIds = whiteNotes.map(function (white) {
        return String(white.midi);
      });
      var currentIds = $root.children(".key-wrapper").map(function (_, el) {
        return String(el.getAttribute("data-white-midi") || "");
      }).get();
      var changed = currentIds.join(",") !== nextIds.join(",");
      if (!changed) return this;
      var existing = new Map();
      $root.children(".key-wrapper").each(function (_, el) {
        var $el = $(el);
        existing.set(String($el.attr("data-white-midi") || ""), $el);
      });
      $root.children(".key-wrapper").each(function (_, el) {
        var id = String(el.getAttribute("data-white-midi") || "");
        if (!nextIds.includes(id)) $(el).remove();
      });
      var newWrappers = [];
      for (var i = 0; i < whiteNotes.length; i += 1) {
        var white = whiteNotes[i];
        var id = String(white.midi);
        var $wrapper = existing.get(id);
        if (!$wrapper || !$wrapper.length) {
          $wrapper = this._buildWrapper(white);
          newWrappers.push($wrapper);
        }
        $root.append($wrapper);
      }
      if (!currentIds.length) {
        $root.find(".white-key, .black-key").show();
        this._reapplyActiveMarkers();
        return this;
      }
      newWrappers.forEach(function ($wrapper) {
        $wrapper.find(".white-key, .black-key").show();
      });
      this._reapplyActiveMarkers();
      return this;
    }
  }, {
    key: "noteNameForKey",
    value: function noteNameForKey($key) {
      return $key !== null && $key !== void 0 && $key.length ? String($key.attr("data-note") || "") : "";
    }
  }, {
    key: "_activateKeyFromTarget",
    value: function _activateKeyFromTarget(target) {
      var $key = this._resolveKeyFromTarget(target);
      if (!$key.length) return;
      var noteName = this.noteNameForKey($key);
      void this._playNoteName(noteName);
      if (this.onKeyClick) this.onKeyClick({
        $key: $key,
        noteName: noteName,
        manual: true
      });
    }
  }, {
    key: "_activateKeyFromPointerEvent",
    value: function _activateKeyFromPointerEvent(event) {
      var pointerTarget = this._pointerEventTarget(event);
      this._activateKeyFromTarget(pointerTarget || (event === null || event === void 0 ? void 0 : event.target));
    }
  }, {
    key: "keyForNote",
    value: function keyForNote(letter, accidentalClass, octave) {
      var targetMidi = this._midiForNoteSpec(letter, accidentalClass, octave);
      if (!Number.isFinite(targetMidi)) return $();
      this._ensureMidiVisible(targetMidi);
      var selector = "".concat(this.rootSelector, " [data-midi=\"").concat(targetMidi, "\"]");
      return $(selector).first();
    }
  }, {
    key: "keyForNoteIfVisible",
    value: function keyForNoteIfVisible(letter, accidentalClass, octave) {
      var targetMidi = this._midiForNoteSpec(letter, accidentalClass, octave);
      if (!Number.isFinite(targetMidi) || !this._isMidiVisible(targetMidi)) return $();
      var selector = "".concat(this.rootSelector, " [data-midi=\"").concat(targetMidi, "\"]");
      return $(selector).first();
    }
  }, {
    key: "clickKey",
    value: function clickKey($key) {
      if ($key !== null && $key !== void 0 && $key.length) $key.trigger("click");
      return this;
    }
  }, {
    key: "clearActive",
    value: function clearActive() {
      this._hideAllMarkers();
      this._activeMarkers = new Map();
      return this;
    }
  }, {
    key: "syncActiveKey",
    value: function syncActiveKey($nextKey) {
      return this.syncActiveKeys($nextKey !== null && $nextKey !== void 0 && $nextKey.length ? [$nextKey] : []);
    }
  }, {
    key: "syncActiveKeys",
    value: function syncActiveKeys(keys) {
      var _this2 = this;
      var nextKeys = Array.isArray(keys) ? keys.filter(function ($key) {
        return $key === null || $key === void 0 ? void 0 : $key.length;
      }) : [];
      var entries = nextKeys.map(function ($key) {
        var noteName = _this2.noteNameForKey($key);
        if (!noteName) return null;
        return {
          noteName: noteName,
          tone: "primary",
          $key: $key
        };
      }).filter(Boolean);
      return this.syncActiveMarkers(entries);
    }
  }, {
    key: "syncActiveNoteNames",
    value: function syncActiveNoteNames(noteNames) {
      var _this3 = this;
      var visibleKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var nextNoteNames = noteNames instanceof Set ? _toConsumableArray(noteNames).filter(Boolean) : (Array.isArray(noteNames) ? noteNames : []).filter(Boolean);
      var nextKeys = Array.isArray(visibleKeys) ? visibleKeys.filter(function ($key) {
        return $key === null || $key === void 0 ? void 0 : $key.length;
      }) : [];
      var entries = nextNoteNames.map(function (noteName) {
        var $key = nextKeys.find(function ($candidate) {
          return _this3.noteNameForKey($candidate) === noteName;
        }) || null;
        return {
          noteName: noteName,
          tone: "primary",
          $key: $key
        };
      });
      return this.syncActiveMarkers(entries);
    }
  }, {
    key: "syncActiveMarkers",
    value: function syncActiveMarkers(entries) {
      var _this4 = this;
      var list = Array.isArray(entries) ? entries.filter(Boolean) : [];
      var nextMarkers = new Map();
      list.forEach(function (entry) {
        var noteName = String(entry.noteName || "").trim();
        if (!noteName) return;
        nextMarkers.set(noteName, entry.tone === "secondary" ? "secondary" : "primary");
      });
      if (this._markerMapsEqual(this._activeMarkers, nextMarkers)) {
        list.forEach(function (entry) {
          var _entry$$key;
          if (!(entry !== null && entry !== void 0 && (_entry$$key = entry.$key) !== null && _entry$$key !== void 0 && _entry$$key.length)) return;
          var tone = nextMarkers.get(String(entry.noteName || "").trim()) || "primary";
          var $marker = entry.$key.find(".key-marker").first();
          _this4._applyMarkerTone($marker, tone);
          _this4._showMarker($marker);
        });
        return this;
      }
      this._hideAllMarkers();
      this._activeMarkers = new Map(nextMarkers);
      list.forEach(function (entry) {
        var _entry$$key2;
        if (!(entry !== null && entry !== void 0 && (_entry$$key2 = entry.$key) !== null && _entry$$key2 !== void 0 && _entry$$key2.length)) return;
        var noteName = String(entry.noteName || "").trim();
        var tone = _this4._activeMarkers.get(noteName);
        if (!noteName || !tone) return;
        var $marker = entry.$key.find(".key-marker").first();
        _this4._applyMarkerTone($marker, tone);
        _this4._showMarker($marker);
      });
      return this;
    }
  }, {
    key: "toggleKey",
    value: function toggleKey($key) {
      if (!($key !== null && $key !== void 0 && $key.length)) return this;
      var noteName = this.noteNameForKey($key);
      // eslint-disable-next-line no-console
      console.log("[PianoKeyboardUi] Keyboard key clicked", {
        note: noteName
      });
      if (this.onKeyClick) this.onKeyClick({
        $key: $key,
        noteName: noteName,
        manual: true
      });
      return this;
    }
  }, {
    key: "_markerHtml",
    value: function _markerHtml() {
      return "\n      <div class=\"key-marker\">\n        <div class=\"d-center w-100\">\n          <span class=\"bg-primary\"></span>\n        </div>\n      </div>\n    ";
    }
  }, {
    key: "_buildWrapper",
    value: function _buildWrapper(white) {
      var black = this._blackNoteAfter(white.midi);
      var $wrapper = $('<div class="position-relative key-wrapper"></div>').attr("data-white-midi", String(white.midi));
      if (black) {
        var $black = $('<div class="black-key"></div>').attr({
          "data-note": black.note,
          "data-midi": String(black.midi)
        });
        $black.append('<button type="button" class="btn btn-dark"></button>');
        $black.append(this._markerHtml());
        $wrapper.append($black);
      }
      var $white = $('<div class="white-key"></div>').attr({
        "data-note": white.note,
        "data-midi": String(white.midi)
      });
      $white.append('<button type="button" class="btn btn-white"></button>');
      $white.append(this._markerHtml());
      $wrapper.append($white);
      return $wrapper;
    }
  }, {
    key: "_resolveKeyFromTarget",
    value: function _resolveKeyFromTarget(target) {
      var $key = $(target).closest(".white-key, .black-key");
      if ($key.length) return $key;
      var $wrapper = $(target).closest("".concat(this.rootSelector, " .key-wrapper"));
      if ($wrapper.length) $key = $wrapper.find(".black-key, .white-key").first();
      return $key;
    }
  }, {
    key: "_pointerEventTarget",
    value: function _pointerEventTarget(event) {
      var _document;
      var source = (event === null || event === void 0 ? void 0 : event.originalEvent) || event;
      var clientX = Number(source === null || source === void 0 ? void 0 : source.clientX);
      var clientY = Number(source === null || source === void 0 ? void 0 : source.clientY);
      if (!Number.isFinite(clientX) || !Number.isFinite(clientY) || typeof ((_document = document) === null || _document === void 0 ? void 0 : _document.elementFromPoint) !== "function") {
        return null;
      }
      return document.elementFromPoint(clientX, clientY);
    }
  }, {
    key: "_visibleWhiteNotes",
    value: function _visibleWhiteNotes() {
      var out = [];
      var midi = this._startWhiteMidi;
      for (var i = 0; i < this.visibleWhiteKeys; i += 1) {
        out.push({
          midi: midi,
          note: this._naturalNoteNameFromMidi(midi)
        });
        midi = this._nextNaturalMidi(midi);
      }
      return out;
    }
  }, {
    key: "_blackNoteAfter",
    value: function _blackNoteAfter(whiteMidi) {
      var pitchClass = (whiteMidi % 12 + 12) % 12;
      if (pitchClass === 4 || pitchClass === 11) return null; // E/B have no black key above

      var midi = whiteMidi + 1;
      return {
        midi: midi,
        note: this._noteNameFromMidi(midi)
      };
    }
  }, {
    key: "_ensureMidiVisible",
    value: function _ensureMidiVisible(targetMidi) {
      if (!Number.isFinite(targetMidi)) return;
      while (targetMidi < this._startWhiteMidi) {
        this._startWhiteMidi = this._prevNaturalMidi(this._startWhiteMidi);
        this.render();
      }
      while (true) {
        var lastWhiteMidi = this._lastWhiteMidi();
        var lastBlack = this._blackNoteAfter(lastWhiteMidi);
        var maxVisibleMidi = lastBlack ? lastBlack.midi : lastWhiteMidi;
        if (targetMidi <= maxVisibleMidi) break;
        this._startWhiteMidi = this._nextNaturalMidi(this._startWhiteMidi);
        this.render();
      }
    }
  }, {
    key: "_isMidiVisible",
    value: function _isMidiVisible(targetMidi) {
      if (!Number.isFinite(targetMidi)) return false;
      var lastWhiteMidi = this._lastWhiteMidi();
      var lastBlack = this._blackNoteAfter(lastWhiteMidi);
      var maxVisibleMidi = lastBlack ? lastBlack.midi : lastWhiteMidi;
      return targetMidi >= this._startWhiteMidi && targetMidi <= maxVisibleMidi;
    }
  }, {
    key: "_lastWhiteMidi",
    value: function _lastWhiteMidi() {
      var midi = this._startWhiteMidi;
      for (var i = 1; i < this.visibleWhiteKeys; i += 1) {
        midi = this._nextNaturalMidi(midi);
      }
      return midi;
    }
  }, {
    key: "_nextNaturalMidi",
    value: function _nextNaturalMidi(midi) {
      var _current$match;
      var current = this._naturalNoteNameFromMidi(midi);
      var letter = current.replace(/\d+$/, "");
      var octave = Number(((_current$match = current.match(/-?\d+$/)) === null || _current$match === void 0 ? void 0 : _current$match[0]) || 4);
      var idx = PianoKeyboardUi.NATURAL_ORDER.indexOf(letter);
      var nextIdx = (idx + 1) % PianoKeyboardUi.NATURAL_ORDER.length;
      var nextOctave = nextIdx === 0 ? octave + 1 : octave;
      return this._naturalMidiFromLetterOctave(PianoKeyboardUi.NATURAL_ORDER[nextIdx], nextOctave);
    }
  }, {
    key: "_prevNaturalMidi",
    value: function _prevNaturalMidi(midi) {
      var _current$match2;
      var current = this._naturalNoteNameFromMidi(midi);
      var letter = current.replace(/\d+$/, "");
      var octave = Number(((_current$match2 = current.match(/-?\d+$/)) === null || _current$match2 === void 0 ? void 0 : _current$match2[0]) || 4);
      var idx = PianoKeyboardUi.NATURAL_ORDER.indexOf(letter);
      var prevIdx = (idx - 1 + PianoKeyboardUi.NATURAL_ORDER.length) % PianoKeyboardUi.NATURAL_ORDER.length;
      var prevOctave = idx === 0 ? octave - 1 : octave;
      return this._naturalMidiFromLetterOctave(PianoKeyboardUi.NATURAL_ORDER[prevIdx], prevOctave);
    }
  }, {
    key: "_midiForNoteSpec",
    value: function _midiForNoteSpec(letter, accidentalClass, octave) {
      var cleanLetter = String(letter || "").trim().toUpperCase();
      var numOctave = Number(octave);
      var basePc = PianoKeyboardUi.NATURAL_PITCH_CLASS[cleanLetter];
      if (!Number.isInteger(basePc) || !Number.isFinite(numOctave)) return null;
      var midi = (numOctave + 1) * 12 + basePc + this._accidentalOffset(accidentalClass);
      return midi;
    }
  }, {
    key: "_accidentalOffset",
    value: function _accidentalOffset(accidentalClass) {
      if (!accidentalClass) return 0;
      if (accidentalClass.includes("music-font__doublesharp")) return 2;
      if (accidentalClass.includes("music-font__sharp")) return 1;
      if (accidentalClass.includes("music-font__doubleflat")) return -2;
      if (accidentalClass.includes("music-font__flat")) return -1;
      return 0;
    }
  }, {
    key: "_naturalMidiFromNoteName",
    value: function _naturalMidiFromNoteName(noteName) {
      var m = String(noteName || "").trim().match(/^([A-G])(-?\d+)$/);
      if (!m) return null;
      return this._naturalMidiFromLetterOctave(m[1], Number(m[2]));
    }
  }, {
    key: "_naturalMidiFromLetterOctave",
    value: function _naturalMidiFromLetterOctave(letter, octave) {
      var pc = PianoKeyboardUi.NATURAL_PITCH_CLASS[String(letter || "").toUpperCase()];
      if (!Number.isInteger(pc) || !Number.isFinite(octave)) return null;
      return (octave + 1) * 12 + pc;
    }
  }, {
    key: "_noteNameFromMidi",
    value: function _noteNameFromMidi(midi) {
      if (!Number.isFinite(midi)) return "";
      var pitchClass = (midi % 12 + 12) % 12;
      var octave = Math.floor(midi / 12) - 1;
      return "".concat(PianoKeyboardUi.PITCH_CLASS_TO_NOTE[pitchClass]).concat(octave);
    }
  }, {
    key: "_naturalNoteNameFromMidi",
    value: function _naturalNoteNameFromMidi(midi) {
      if (!Number.isFinite(midi)) return "";
      var pitchClass = (midi % 12 + 12) % 12;
      var octave = Math.floor(midi / 12) - 1;
      var letter = Object.keys(PianoKeyboardUi.NATURAL_PITCH_CLASS).find(function (key) {
        return PianoKeyboardUi.NATURAL_PITCH_CLASS[key] === pitchClass;
      });
      return letter ? "".concat(letter).concat(octave) : "";
    }
  }, {
    key: "_keyByNoteName",
    value: function _keyByNoteName(noteName) {
      if (!noteName) return $();
      return $("".concat(this.rootSelector, " [data-note=\"").concat(noteName, "\"]")).first();
    }
  }, {
    key: "_hideAllMarkers",
    value: function _hideAllMarkers() {
      $("".concat(this.rootSelector, " .key-marker")).hide();
    }
  }, {
    key: "_reapplyActiveMarkers",
    value: function _reapplyActiveMarkers() {
      var _this5 = this;
      this._hideAllMarkers();
      if (!(this._activeMarkers instanceof Map) || !this._activeMarkers.size) return;
      this._activeMarkers.forEach(function (tone, noteName) {
        var $key = _this5._keyByNoteName(noteName);
        if (!$key.length) return;
        var $marker = $key.find(".key-marker").first();
        _this5._applyMarkerTone($marker, tone);
        _this5._showMarker($marker);
      });
    }
  }, {
    key: "_whiteKeyWidth",
    value: function _whiteKeyWidth() {
      var $whiteKey = $("".concat(this.rootSelector, " .white-key")).first();
      return $whiteKey.length ? $whiteKey.outerWidth() || 0 : 0;
    }
  }, {
    key: "_stepOffsetFromDeltaX",
    value: function _stepOffsetFromDeltaX(deltaX, whiteKeyWidth) {
      if (!Number.isFinite(deltaX) || !Number.isFinite(whiteKeyWidth) || whiteKeyWidth <= 0) return 0;
      if (deltaX > 0) return Math.floor(deltaX / whiteKeyWidth);
      if (deltaX < 0) return -Math.floor(Math.abs(deltaX) / whiteKeyWidth);
      return 0;
    }
  }, {
    key: "_shiftNaturalMidi",
    value: function _shiftNaturalMidi(midi, whiteSteps) {
      if (!Number.isFinite(midi) || !Number.isFinite(whiteSteps) || whiteSteps === 0) return midi;
      var nextMidi = midi;
      var stepCount = Math.abs(Math.trunc(whiteSteps));
      for (var i = 0; i < stepCount; i += 1) {
        nextMidi = whiteSteps > 0 ? this._nextNaturalMidi(nextMidi) : this._prevNaturalMidi(nextMidi);
      }
      return nextMidi;
    }
  }, {
    key: "_finishDrag",
    value: function _finishDrag() {
      if (!this._drag.active) return;
      var $root = $(this.rootSelector).first();
      if ($root.length) {
        var _$root$;
        $root.removeClass("dragging");
        if ((_$root$ = $root[0]) !== null && _$root$ !== void 0 && _$root$.releasePointerCapture && this._drag.pointerId != null) {
          try {
            $root[0].releasePointerCapture(this._drag.pointerId);
          } catch (_) {
            // Ignore capture release errors when the pointer is already gone.
          }
        }
      }
      this._drag.active = false;
      this._drag.pointerId = null;
      this._drag.startPageX = 0;
      this._drag.originWhiteMidi = this._startWhiteMidi;
      this._drag.suppressClickUntil = this._drag.didMove ? Date.now() + 250 : Math.max(this._drag.suppressClickUntil || 0, Date.now() + 250);
      this._drag.lastStepOffset = 0;
      this._drag.didMove = false;
    }
  }, {
    key: "_markerMapsEqual",
    value: function _markerMapsEqual(a, b) {
      if (!(a instanceof Map) || !(b instanceof Map)) return false;
      if (a.size !== b.size) return false;
      var _iterator = _createForOfIteratorHelper(a),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];
          if (b.get(key) !== value) return false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return true;
    }
  }, {
    key: "_applyMarkerTone",
    value: function _applyMarkerTone($marker, tone) {
      if (!($marker !== null && $marker !== void 0 && $marker.length)) return;
      var $swatch = $marker.find("span").first();
      if (!$swatch.length) return;
      $swatch.removeClass("bg-primary bg-secondary");
      $swatch.addClass(tone === "secondary" ? "bg-secondary" : "bg-primary");
    }
  }, {
    key: "_showMarker",
    value: function _showMarker($marker) {
      if (!($marker !== null && $marker !== void 0 && $marker.length)) return;
      $marker.show();
    }
  }, {
    key: "_ensureAudio",
    value: function () {
      var _ensureAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(this._audioReady && this._synth)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              if (window.Tone) {
                _context.n = 2;
                break;
              }
              return _context.a(2);
            case 2:
              _context.n = 3;
              return Tone.start();
            case 3:
              this._synth = this._synth || _GameAudio_js__WEBPACK_IMPORTED_MODULE_0__.GameAudio.createStaffNoteSynth();
              this._audioReady = true;
            case 4:
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
    key: "_canPlayNote",
    value: function _canPlayNote() {
      if (this.canPlayNote) return !!this.canPlayNote();
      return true;
    }
  }, {
    key: "_playNoteName",
    value: function () {
      var _playNoteName2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(noteName) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (this._canPlayNote()) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              if (String(noteName || "").trim()) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2);
            case 2:
              _context2.n = 3;
              return this._ensureAudio();
            case 3:
              if (this._synth) {
                _context2.n = 4;
                break;
              }
              return _context2.a(2);
            case 4:
              this._synth.triggerAttackRelease(String(noteName).trim(), 0.45, undefined, _GameAudio_js__WEBPACK_IMPORTED_MODULE_0__.GameAudio.scale("staffNote", 1));
            case 5:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _playNoteName(_x) {
        return _playNoteName2.apply(this, arguments);
      }
      return _playNoteName;
    }()
  }]);
}();
_defineProperty(PianoKeyboardUi, "NATURAL_ORDER", ["C", "D", "E", "F", "G", "A", "B"]);
_defineProperty(PianoKeyboardUi, "NATURAL_PITCH_CLASS", {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11
});
_defineProperty(PianoKeyboardUi, "PITCH_CLASS_TO_NOTE", ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]);

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
        html = _ref$html === void 0 ? true : _ref$html;
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
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$html = _ref2.html,
        html = _ref2$html === void 0 ? true : _ref2$html;
      if (!this.$long.length) return this;
      if (html) this.$long.html(value !== null && value !== void 0 ? value : "");else this.$long.text(value !== null && value !== void 0 ? value : "");
      return this;
    }
  }, {
    key: "clearLong",
    value: function clearLong() {
      if (this.$long.length) this.$long.html("");
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
  var accOffset = acc === "𝄪" ? 2 : acc === "#" ? 1 : acc === "bb" ? -2 : acc === "b" ? -1 : 0;
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
  var _window, _window2, _window3;
  var $finalOverlay = _ref.$finalOverlay,
    _ref$rounds = _ref.rounds,
    rounds = _ref$rounds === void 0 ? 0 : _ref$rounds,
    _ref$score = _ref.score,
    score = _ref$score === void 0 ? 0 : _ref$score,
    _ref$accuracy = _ref.accuracy,
    accuracy = _ref$accuracy === void 0 ? 0 : _ref$accuracy,
    _ref$durationSec = _ref.durationSec,
    durationSec = _ref$durationSec === void 0 ? 0 : _ref$durationSec,
    _ref$settingsBonus = _ref.settingsBonus,
    settingsBonus = _ref$settingsBonus === void 0 ? false : _ref$settingsBonus,
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
  var setSaveResultField = function setSaveResultField(name, value) {
    var $input = $("#save-results-modal input[name=\"".concat(name, "\"]")).first();
    if (!$input.length) return;
    $input.val(String(value !== null && value !== void 0 ? value : "").trim());
  };
  var getFinalPointsPreviewElements = function getFinalPointsPreviewElements() {
    var $modal = $("#save-results-modal");
    var $finalPoints = $modal.find("#finalPoints");
    return {
      $modal: $modal,
      $finalPoints: $finalPoints
    };
  };
  var countFinalPoints = function countFinalPoints(value) {
    var _getFinalPointsPrevie = getFinalPointsPreviewElements(),
      $finalPoints = _getFinalPointsPrevie.$finalPoints;
    if (!$finalPoints.length) return;
    var finalPoints = Number(value);
    if (!Number.isFinite(finalPoints)) {
      $finalPoints.text(value !== null && value !== void 0 ? value : "");
      return;
    }
    if (!CountUpCtor) {
      $finalPoints.text(String(Math.round(finalPoints)));
      return;
    }
    var counter = new CountUpCtor($finalPoints[0], finalPoints, {
      duration: 1.4,
      decimalPlaces: 0
    });
    if (!counter.error) counter.start();else $finalPoints.text(String(Math.round(finalPoints)));
  };
  var fetchFinalPointsPreview = function fetchFinalPointsPreview() {
    var _getFinalPointsPrevie2 = getFinalPointsPreviewElements(),
      $modal = _getFinalPointsPrevie2.$modal,
      $finalPoints = _getFinalPointsPrevie2.$finalPoints;
    if (!$modal.length || !$finalPoints.length || !window.axios) return;
    var url = $modal.data("final-points-url");
    if (!url) return;
    $modal.removeData("final-points-value");
    $finalPoints.text("");
    window.axios.get(url, {
      params: {
        game: $modal.find('input[name="game"]').val(),
        rounds: rounds,
        score: score,
        accuracy: accuracy,
        duration: Math.max(0, Math.floor(Number(durationSec) || 0))
      }
    }).then(function (response) {
      var _response$data$finalP, _response$data;
      var value = (_response$data$finalP = response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.finalPoints) !== null && _response$data$finalP !== void 0 ? _response$data$finalP : response === null || response === void 0 ? void 0 : response.data;
      $modal.data("final-points-value", value);
      if ($modal.hasClass("show")) countFinalPoints(value);
    })["catch"](function () {
      $modal.data("final-points-value", "");
      if ($modal.hasClass("show")) $finalPoints.text("");
    });
  };
  var bindFinalPointsPreview = function bindFinalPointsPreview() {
    var _getFinalPointsPrevie3 = getFinalPointsPreviewElements(),
      $modal = _getFinalPointsPrevie3.$modal,
      $finalPoints = _getFinalPointsPrevie3.$finalPoints;
    if (!$modal.length || !$finalPoints.length) return;
    $modal.off("show.bs.modal.finalPoints").on("show.bs.modal.finalPoints", function () {
      $finalPoints.text("");
    }).off("shown.bs.modal.finalPoints").on("shown.bs.modal.finalPoints", function () {
      var value = $modal.data("final-points-value");
      if (value == null) {
        $finalPoints.text("...");
        return;
      }
      countFinalPoints(value);
    });
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
  var $settingsBonus = $finalOverlay.find("#settings-bonus-earned");
  var $resultImg = $finalOverlay.find("img").first();
  var resultGreetings = {
    encouraging: ["Keep going!", "Nice try!", "You are learning!", "Getting there!", "Good effort!", "Keep practicing!", "Almost there!", "Let's try that again!", "Try another round!", "You are getting closer!"],
    strong: ["Great job!", "Well done!", "Nice work!", "Good one!", "Solid round!", "Looking good!", "You did it!", "That was good!", "Way to go!", "Good progress!"],
    excellent: ["You got it!", "Impressive!", "Fantastic!", "Excellent!", "Nailed it!", "Brilliant!", "Outstanding!", "Amazing round!", "That was sharp!", "Top notch!"]
  };
  var randomFrom = function randomFrom(items) {
    return items[Math.floor(Math.random() * items.length)];
  };
  var resultGreeting = accuracy < 50 ? randomFrom(resultGreetings.encouraging) : accuracy <= 80 ? randomFrom(resultGreetings.strong) : randomFrom(resultGreetings.excellent);
  if (accuracy < 50) {
    $greetingTitle.text(resultGreeting);
    if ($resultImg.length) {
      var cur = String($resultImg.attr("src") || "");
      if (cur.includes("trophy.svg")) $resultImg.attr("src", cur.replace("trophy.svg", "plant.svg"));
    }
  } else {
    $greetingTitle.text(resultGreeting);
    if ($resultImg.length) {
      var _cur = String($resultImg.attr("src") || "");
      if (_cur.includes("plant.svg")) $resultImg.attr("src", _cur.replace("plant.svg", "trophy.svg"));
    }
  }
  $settingsBonus.toggle(!!settingsBonus);
  $finalOverlay.show();
  var Confetti = ((_window2 = window) === null || _window2 === void 0 ? void 0 : _window2.Confetti) || ((_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.confetti);
  if (typeof Confetti === "function") {
    Confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        y: 0.6
      },
      zIndex: 1001
    });
  }
  if (typeof animateMetrics === "function") animateMetrics();else setMetricAnimationDelays();
  countTo('span[name="rounds"]', rounds);
  countTo('span[name="score"]', score);
  countTo('span[name="accuracy"]', accuracy, {
    suffix: "%"
  });
  countTo('span[name="duration"]', durationSec, {
    formattingFn: mmss
  });
  setSaveResultField("rounds", rounds);
  setSaveResultField("score", score);
  setSaveResultField("accuracy", "".concat(accuracy, "%"));
  setSaveResultField("duration", mmss(durationSec));
  bindFinalPointsPreview();
  fetchFinalPointsPreview();
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
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "black";
  var mojs = window.mojs;
  if (!mojs || !mojs.Burst || !parentEl) return null;
  if (fill !== "black") {
    var _DURATION = 400;
    return new mojs.Burst({
      parent: parentEl,
      left: 0,
      top: 0,
      degree: 0,
      count: 3,
      radius: {
        0: 100
      },
      children: {
        fill: fill,
        pathScale: "rand(0.5, 1)",
        radius: "rand(12, 15)",
        swirlSize: "rand(10, 15)",
        swirlFrequency: "rand(2, 4)",
        direction: [1, -1],
        duration: "rand(".concat(1 * _DURATION, ", ").concat(2 * _DURATION, ")"),
        delay: "rand(0, 75)",
        easing: "quad.out",
        isSwirl: true,
        isForce3d: true
      }
    });
  }
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
    parentEl = _ref2$parentEl === void 0 ? document.body : _ref2$parentEl,
    _ref2$fill = _ref2.fill,
    fill = _ref2$fill === void 0 ? "black" : _ref2$fill;
  var mojs = window.mojs;
  if (!mojs || !targetEl || !parentEl) return;
  var parentRect = parentEl.getBoundingClientRect();
  var rect = targetEl.getBoundingClientRect();
  var x = rect.left - parentRect.left + rect.width / 2;
  var y = rect.top - parentRect.top + rect.height / 2;
  var smoke = _getSmokeBurst(parentEl, fill);
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
      showLineNames: false,
      formatLineName: null,
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
    this._heldMidi = null;
    this._holdSoundTimer = null;
    this._pendingHeldStep = null;
    this._pendingHeldAccidentalOffset = 0;
    this._holdSoundDelayMs = 140;
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
    this._blockedSteps = new Set();
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
        this._releaseHeldStep();
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
    key: "isStepAllowed",
    value: function isStepAllowed(step) {
      return this._isStepAllowed(step);
    }
  }, {
    key: "setBlockedSteps",
    value: function setBlockedSteps(steps) {
      var next = new Set();
      var list = Array.isArray(steps) ? steps : [];
      for (var i = 0; i < list.length; i++) {
        var step = Number(list[i]);
        if (Number.isFinite(step)) next.add(step);
      }
      this._blockedSteps = next;
    }
  }, {
    key: "clearBlockedSteps",
    value: function clearBlockedSteps() {
      this._blockedSteps.clear();
    }
  }, {
    key: "isStepBlocked",
    value: function isStepBlocked(step) {
      var excludeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (excludeId && this.isNoteFixed(excludeId)) return false;
      return this._blockedSteps.has(Number(step));
    }
  }, {
    key: "ledgerStepsFor",
    value: function ledgerStepsFor(step) {
      return this._ledgerStepsFor(step);
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
        var step = (4 - i) * 2;
        var durationSec = (0.12 + Math.random() * 0.36).toFixed(3); // ~0.12s..0.48s
        var $line = $('<div class="staff-line"></div>').css({
          top: "".concat(y, "px"),
          animationDuration: "".concat(durationSec, "s")
        });
        var lineName = this._lineNameForStep(step);
        if (lineName) {
          $('<span class="line-note-name"></span>').text(lineName).appendTo($line);
        }
        $line.appendTo(this.$el);
      }
      this._drawClef();
    }
  }, {
    key: "_lineNameForStep",
    value: function _lineNameForStep(step) {
      if (!this.opts.showLineNames) return "";
      var noteState = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.stepToLetterOctave)(this, step);
      var letter = String((noteState === null || noteState === void 0 ? void 0 : noteState.letter) || "").trim().toUpperCase();
      if (!letter) return "";
      var formatter = this.opts.formatLineName;
      if (typeof formatter === "function") {
        return String(formatter(letter, {
          step: step,
          octave: noteState === null || noteState === void 0 ? void 0 : noteState.octave,
          clef: this.getClef()
        }) || "");
      }
      return letter;
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
    key: "_noteLocksX",
    value: function _noteLocksX(elOrId) {
      if (!elOrId) return false;
      var el = typeof elOrId === "string" ? this.$el.find(".note[data-note-id=\"".concat(elOrId, "\"]"))[0] : elOrId;
      if (!el) return false;
      var attr = String(el.getAttribute("data-lock-x") || "").trim().toLowerCase();
      return attr === "true" || attr === "1" || $(el).hasClass("lock-x");
    }
  }, {
    key: "_isStepOccupied",
    value: function _isStepOccupied(step, excludeId) {
      if (this.isStepBlocked(step, excludeId)) return true;
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
      if (this.isStepBlocked(step, excludeId)) return null;
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
    key: "playStep",
    value: function () {
      var _playStep3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(step) {
        var accidentalOffset,
          _args3 = arguments;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              accidentalOffset = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 0;
              _context3.n = 1;
              return this._playStep(step, accidentalOffset);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function playStep(_x3) {
        return _playStep3.apply(this, arguments);
      }
      return playStep;
    }()
  }, {
    key: "_releaseHeldStep",
    value: function _releaseHeldStep() {
      var _this$_synth;
      if (this._holdSoundTimer) {
        window.clearTimeout(this._holdSoundTimer);
        this._holdSoundTimer = null;
      }
      this._pendingHeldStep = null;
      this._pendingHeldAccidentalOffset = 0;
      if (this._heldMidi != null && (_this$_synth = this._synth) !== null && _this$_synth !== void 0 && _this$_synth.triggerRelease) this._synth.triggerRelease();
      this._heldMidi = null;
    }
  }, {
    key: "_startHeldStep",
    value: function () {
      var _startHeldStep2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(step) {
        var accidentalOffset,
          midi,
          _args4 = arguments;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              accidentalOffset = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 0;
              if (!(!this._soundEnabled() || !Number.isFinite(step))) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              _context4.n = 2;
              return this._ensureAudio();
            case 2:
              if (this._synth) {
                _context4.n = 3;
                break;
              }
              return _context4.a(2);
            case 3:
              if (!(this._pendingHeldStep !== step)) {
                _context4.n = 4;
                break;
              }
              return _context4.a(2);
            case 4:
              midi = this._stepToMidi(step) + (accidentalOffset || 0);
              if (!(this._heldMidi === midi)) {
                _context4.n = 5;
                break;
              }
              return _context4.a(2);
            case 5:
              if (this._synth.triggerRelease) this._synth.triggerRelease();
              this._synth.triggerAttack(Tone.Frequency(midi, "midi"), undefined, _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_2__.GameAudio.scale("staffNote", 1));
              this._heldMidi = midi;
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _startHeldStep(_x4) {
        return _startHeldStep2.apply(this, arguments);
      }
      return _startHeldStep;
    }()
  }, {
    key: "_scheduleHeldStep",
    value: function _scheduleHeldStep(step) {
      var _this3 = this;
      var accidentalOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (!this._soundEnabled() || !Number.isFinite(step)) return;
      this._pendingHeldStep = step;
      this._pendingHeldAccidentalOffset = accidentalOffset || 0;
      if (this._heldMidi != null) {
        void this._startHeldStep(step, this._pendingHeldAccidentalOffset);
        return;
      }
      if (this._holdSoundTimer) return;
      this._holdSoundTimer = window.setTimeout(function () {
        _this3._holdSoundTimer = null;
        void _this3._startHeldStep(_this3._pendingHeldStep, _this3._pendingHeldAccidentalOffset);
      }, this._holdSoundDelayMs);
    }
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
      this.$el.trigger("staff:userNotesChanged", {
        count: this._userNoteCount()
      });
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
      this.$el.trigger("staff:userNotesChanged", {
        count: this._userNoteCount()
      });
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
            step: self.yToStep(parseFloat($el.css("top"))),
            lockX: self._noteLocksX(el)
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
          if (list[i].lockX) continue;
          var id = list[i].$el.attr("data-note-id");
          self.moveNote(id, {
            x: cx,
            step: list[i].step
          });
          list[i]._shifted = false;
        }
      }
      function shiftUpperToTouch(upper, stepMap) {
        if (upper.lockX) return false;
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
      if (this._noteLocksX(dragId)) return;
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
        if (self.isStepBlocked(initialStep, null)) return;
        self._previewState.active = true;
        self._previewState.step = initialStep;
        self._previewState.lastSoundStep = initialStep;
        self._previewSet(initialStep);
        if (self._soundEnabled()) {
          self._ensureAudio();
          self._playStep(initialStep, 0);
          self._scheduleHeldStep(initialStep, 0);
        }
        var pointerId = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerId)(e);
        if (this.setPointerCapture && pointerId != null) this.setPointerCapture(pointerId);
        self.$el.off("pointermove.previewCreate").on("pointermove.previewCreate", function (ev) {
          if (!self._previewState.active) return;
          if (self._userNoteCount() >= self._maxUserNotes()) {
            self._previewState.active = false;
            self._releaseHeldStep();
            self._previewClear();
            self.$el.off("pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate");
            return;
          }
          var _getPointerPageXY2 = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerPageXY)(ev),
            py = _getPointerPageXY2.y;
          var s = self.yToStep(self._pageYToLocalY(py));
          if (!self._isStepAllowed(s)) return;
          if (self.isStepBlocked(s, null)) {
            self._previewState.step = null;
            self._releaseHeldStep();
            self._previewClear();
            return;
          }
          self._previewState.step = s;
          self._previewSet(s);
          if (self._soundEnabled() && s !== self._previewState.lastSoundStep) {
            self._previewState.lastSoundStep = s;
            self._scheduleHeldStep(s, 0);
          }
        });
        self.$el.off("pointerup.previewCreate pointercancel.previewCreate").on("pointerup.previewCreate pointercancel.previewCreate", function () {
          if (!self._previewState.active) return;
          self._previewState.active = false;
          var finalStep = self._previewState.step;
          self._releaseHeldStep();
          self._previewClear();
          self.$el.off("pointermove.previewCreate pointerup.previewCreate pointercancel.previewCreate");
          if (!Number.isFinite(finalStep)) return;
          if (!self._isStepAllowed(finalStep)) return;
          if (self.isStepBlocked(finalStep, null)) return;
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
          }
        });
      });
      $(window).on("blur.previewCreate", function () {
        if (!self._previewState.active) return;
        self._previewState.active = false;
        self._releaseHeldStep();
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
        if (self._soundEnabled()) {
          var accCls = self._getAttachedAccidentalClass(d.noteId);
          var accOff = self._accidentalClassToOffset(accCls);
          self._scheduleHeldStep(d.startStep, accOff);
        }
        var capEl = e.currentTarget && e.currentTarget.setPointerCapture ? e.currentTarget : null;
        if (capEl && pointerId != null) capEl.setPointerCapture(pointerId);
        self.$el.off("pointermove.noteDrag").on("pointermove.noteDrag", function (ev) {
          var evPointerId = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerId)(ev);
          if (pointerId != null && evPointerId != null && evPointerId !== pointerId) return;
          var py = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerPageXY)(ev).y;
          var dy = py - d.startPageY;
          d.movedPx = Math.max(d.movedPx, Math.abs(dy));
          if (!d.isDragging && d.movedPx >= d.thresholdPx) {
            d.isDragging = true;
            var _accCls = self._getAttachedAccidentalClass(d.noteId);
            var _accOff = self._accidentalClassToOffset(_accCls);
            self._pendingHeldStep = d.lastTargetStep;
            self._pendingHeldAccidentalOffset = _accOff;
            void self._startHeldStep(d.lastTargetStep, _accOff);
          }
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
            var _accCls2 = self._getAttachedAccidentalClass(d.noteId);
            var _accOff2 = self._accidentalClassToOffset(_accCls2);
            self._scheduleHeldStep(targetStep, _accOff2);
          }
        });
        self.$el.off("pointerup.noteDrag pointercancel.noteDrag").on("pointerup.noteDrag pointercancel.noteDrag", function (ev2) {
          var evPointerId = (0,_staffUtils_js__WEBPACK_IMPORTED_MODULE_0__.getPointerId)(ev2);
          if (pointerId != null && evPointerId != null && evPointerId !== pointerId) return;
          self.$el.off("pointermove.noteDrag pointerup.noteDrag pointercancel.noteDrag");
          var hadHeldSound = self._heldMidi != null;
          self._releaseHeldStep();
          d.swallowClick = d.isDragging || hadHeldSound;
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!noteEl) return;
      (0,_games_shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_0__.playSmokePuffAtElement)(noteEl, _objectSpread({
        parentEl: document.body
      }, opts));
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
  if (cls.includes("music-font__doublesharp")) return "<span class='doublesharp-symbol'>𝄪</span>";
  if (cls.includes("music-font__sharp")) return "<span class='sharp-symbol'>♯</span>";
  if (cls.includes("music-font__doubleflat")) return "<span class='doubleflat-symbol'>𝄫</span>";
  if (cls.includes("music-font__flat")) return "<span class='flat-symbol'>♭</span>";
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
/*!****************************************************!*\
  !*** ./resources/js/music/games/chorddetective.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chorddetective_ChordDetective_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chorddetective/ChordDetective.js */ "./resources/js/music/games/chorddetective/ChordDetective.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var options = readGlobal("__challengeOptions") || {};
var clefUrls = readGlobal("__clefUrls") || null;
var game = new _chorddetective_ChordDetective_js__WEBPACK_IMPORTED_MODULE_0__.ChordDetective(_objectSpread(_objectSpread({}, options), {}, {
  clefUrls: clefUrls
}));
game.start();
})();

/******/ })()
;