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
/* harmony import */ var _shared_PianoKeyboardUi_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/PianoKeyboardUi.js */ "./resources/js/music/games/shared/PianoKeyboardUi.js");
/* harmony import */ var _shared_InstructionsUi_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/InstructionsUi.js */ "./resources/js/music/games/shared/InstructionsUi.js");
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
    this.prompt = new _shared_PromptUi_js__WEBPACK_IMPORTED_MODULE_4__.PromptUi("#prompt");
    this.instructionsUi = new _shared_InstructionsUi_js__WEBPACK_IMPORTED_MODULE_7__.InstructionsUi("#instructions");
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
    this.keyboard = this._shouldUsePianoKeyboard() ? new _shared_PianoKeyboardUi_js__WEBPACK_IMPORTED_MODULE_6__.PianoKeyboardUi({
      rootSelector: "#keyboard",
      namespace: "".concat(this.ns, ".keyboard")
    }) : null;

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
      notes.forEach(function (note) {
        if (note.noteId === primary.noteId) return;
        var noteState = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.stepToLetterOctave)(_this3.staff, note.step);
        var $key = _this3.keyboard.keyForNoteIfVisible(noteState === null || noteState === void 0 ? void 0 : noteState.letter, note.accidentalClass, noteState === null || noteState === void 0 ? void 0 : noteState.octave);
        if ($key.length) keys.push($key);
      });
      this.keyboard.syncActiveKeys(keys);
    }
  }, {
    key: "_syncPianoKeyboardMarkerFromAccidentalPreview",
    value: function _syncPianoKeyboardMarkerFromAccidentalPreview() {
      var _this$staff,
        _this4 = this;
      if (!this.keyboard || !this.staff) return;
      var dragState = ((_this$staff = this.staff) === null || _this$staff === void 0 ? void 0 : _this$staff._accDragSound) || {};
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
      notes.forEach(function (note) {
        if (note.noteId === primary.noteId) return;
        var noteState = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_1__.stepToLetterOctave)(_this4.staff, note.step);
        var accidentalClass = note.noteId === noteId ? previewAccidentalClass : note.accidentalClass;
        var $key = _this4.keyboard.keyForNoteIfVisible(noteState === null || noteState === void 0 ? void 0 : noteState.letter, accidentalClass, noteState === null || noteState === void 0 ? void 0 : noteState.octave);
        if ($key.length) keys.push($key);
      });
      this.keyboard.syncActiveKeys(keys.filter(function ($key) {
        return $key === null || $key === void 0 ? void 0 : $key.length;
      }));
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
          _this9._uiSfxSynth.triggerAttackRelease(n, 0.07, now + i * 0.05, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("successBasic", 0.42));
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
          _this0._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.045, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("successBonus", 0.45));
        });
        hit.forEach(function (n) {
          _this0._uiSfxSynth.triggerAttackRelease(n, 0.12, now + 0.26, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("successBonus", 0.30));
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
          _this1._uiSfxNoise.triggerAttackRelease(0.06, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("failNoise", 0.45));
        }
        if (_this1._uiSfxSynth) {
          _this1._uiSfxSynth.triggerAttackRelease("A2", 0.10, now + 0.01, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("failNote", 0.55));
          _this1._uiSfxSynth.triggerAttackRelease("G2", 0.12, now + 0.08, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("failNote", 0.6));
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
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.9, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.6));
          });
          ["G5", "A5", "B5", "C6", "D6", "E6", "G6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.08, now + 0.25 + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.35));
          });
        },
        // 2) Rising broken chord + final hit
        function () {
          ["C5", "E5", "G5", "B5", "D6", "G6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.11, now + i * 0.08, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.44));
          });
          ["C6", "E6", "G6"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.28, now + 0.62, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.5));
          });
        },
        // 3) Two chord swells
        function () {
          ["A3", "E4", "A4", "C5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.45, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.45));
          });
          ["F4", "A4", "C5", "F5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.52, now + 0.35, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.48));
          });
          ["C5", "F5", "A5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.78, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.4));
          });
        },
        // 4) Sparkly step run + octave landing
        function () {
          ["E5", "G5", "A5", "B5", "D6", "E6", "G6", "A6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.075, now + i * 0.055, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.34));
          });
          ["A5", "A6", "C7"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.20, now + 0.52, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.42));
          });
        },
        // 5) Major lift arpeggio
        function () {
          ["D4", "A4", "D5", "F#5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.36, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.45));
          });
          ["D5", "F#5", "A5", "D6", "F#6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.095, now + 0.2 + i * 0.065, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.4));
          });
        },
        // 6) Warm cadence
        function () {
          ["G3", "D4", "G4", "B4"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.4, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.4));
          });
          ["C4", "E4", "G4", "C5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.44, now + 0.32, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.46));
          });
          ["E5", "G5", "C6"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.22, now + 0.72, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.4));
          });
        },
        // 7) Fast gamey sparkle
        function () {
          ["C6", "D6", "E6", "G6", "A6", "G6", "E6", "C7"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.06, now + i * 0.048, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.3));
          });
          ["G6", "C7"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.2, now + 0.48, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.38));
          });
        },
        // 8) Two-step fanfare
        function () {
          ["F4", "C5", "A5"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.16, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.45));
          });
          ["G4", "D5", "B5"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.16, now + 0.28 + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.48));
          });
          ["C5", "E5", "G5", "C6"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.26, now + 0.54, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.44));
          });
        },
        // 9) Descend then resolve up
        function () {
          ["A6", "G6", "E6", "D6", "C6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.08, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.34));
          });
          ["E6", "G6", "C7"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.24, now + 0.4, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.42));
          });
        },
        // 10) Big finish hit
        function () {
          ["C4", "E4", "G4", "C5"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.34, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.48));
          });
          ["E5", "G5", "B5", "D6", "E6"].forEach(function (n, i) {
            _this10._uiSfxSynth.triggerAttackRelease(n, 0.09, now + 0.18 + i * 0.055, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.38));
          });
          ["C6", "E6", "G6", "C7"].forEach(function (n) {
            return _this10._uiSfxSynth.triggerAttackRelease(n, 0.3, now + 0.58, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("final", 0.5));
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
      synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), 0.055, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("finalMetric", 0.44));
      synth.triggerAttackRelease(Tone.Frequency(midi + 5, "midi"), 0.045, now + 0.03, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("finalMetric", 0.34));
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
          var _this11$$finalOverlay;
          _this11._playFinalMetricPopSfx(i);
          (0,_shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_3__.playBurstConfettiAtElement)(el, {
            parentEl: ((_this11$$finalOverlay = _this11.$finalOverlay) === null || _this11$$finalOverlay === void 0 ? void 0 : _this11$$finalOverlay[0]) || document.body,
            index: i
          });
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
          _this12._uiSfxSynth.triggerAttackRelease(n, 0.09, now + i * 0.06, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("perfectBonus", 0.62));
        });
        var hit = ["C6", "G6", "C7", "E7"];
        hit.forEach(function (n) {
          return _this12._uiSfxSynth.triggerAttackRelease(n, 0.35, now + 0.48, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("perfectBonus", 0.46));
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
          _this13._uiSfxSynth.triggerAttackRelease(notes, dur, now + t, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_5__.GameAudio.scale("runStart", vel));
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
        _this$staff2,
        _this15 = this;
      if (!((_this$$staffEl = this.$staffEl) !== null && _this$$staffEl !== void 0 && _this$$staffEl.length) || !((_this$staff2 = this.staff) !== null && _this$staff2 !== void 0 && _this$staff2.removeNote)) return;
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
      var _this$keyboard, _this$keyboard$bind;
      this._madeAnyMistake = false;
      this.instructionsUi.show().replay();
      $("#controls").show();
      this._instructionsRemoved = false;
      this._wireAccidentalPalette();
      this._wireStaffTools();
      (_this$keyboard = this.keyboard) === null || _this$keyboard === void 0 || (_this$keyboard$bind = _this$keyboard.bind) === null || _this$keyboard$bind === void 0 || _this$keyboard$bind.call(_this$keyboard);
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
      this.$staffEl.off("staff:userNoteAdded._uiGate.".concat(this.ns)).on("staff:userNoteAdded._uiGate.".concat(this.ns), function () {
        _this19._userNotesSinceGate += 1;
        if (!_this19._instructionsRemoved && _this19._userNotesSinceGate >= needForInstructions) {
          _this19._removeInstructions();
        }
        if (_this19._userNotesSinceGate >= needForCheck) {
          $("#check").show().removeClass("invisible");
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
    key: "_showFinalResults",
    value: function _showFinalResults() {
      var _this$_stats$checksTo,
        _this$_stats$checksCo,
        _this$_stats$finished,
        _this26 = this;
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
          var _this26$$doublePoints, _this26$$doublePoints2;
          (_this26$$doublePoints = _this26.$doublePoints) === null || _this26$$doublePoints === void 0 || (_this26$$doublePoints2 = _this26$$doublePoints.show) === null || _this26$$doublePoints2 === void 0 || _this26$$doublePoints2.call(_this26$$doublePoints);
          _this26._playPerfectGameBonusSfx();
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
          return _this26._clearFinalCountupTimers();
        },
        countupTimers: this._finalCountupTimeouts,
        animateMetrics: function animateMetrics() {
          return _this26._animateFinalMetricsWithSfx();
        },
        playFinalSfx: function playFinalSfx() {
          return _this26._playFinalSfx();
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

/***/ "./resources/js/music/games/notepython/NotePython.js"
/*!***********************************************************!*\
  !*** ./resources/js/music/games/notepython/NotePython.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotePython: () => (/* binding */ NotePython)
/* harmony export */ });
/* harmony import */ var _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/BaseStaffGame.js */ "./resources/js/music/games/base/BaseStaffGame.js");
/* harmony import */ var _shared_finalResults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/finalResults.js */ "./resources/js/music/games/shared/finalResults.js");
/* harmony import */ var _shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/mojsEffects.js */ "./resources/js/music/games/shared/mojsEffects.js");
/* harmony import */ var _shared_PromptUi_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/PromptUi.js */ "./resources/js/music/games/shared/PromptUi.js");
/* harmony import */ var _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
/* harmony import */ var _shared_InstructionsUi_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/InstructionsUi.js */ "./resources/js/music/games/shared/InstructionsUi.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var NotePython = /*#__PURE__*/function () {
  function NotePython() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, NotePython);
    var defaults = {
      boardEl: "#board",
      rows: 9,
      cols: 9,
      snakeSpeed: 500,
      sound: true,
      basePoints: 1,
      firstTryBonus: 2,
      numOfChallenges: 4,
      practiceMode: false,
      solfege: false,
      strictDirection: false,
      showBombs: false,
      realWalls: false,
      successPhrases: ["Awesome", "Nicely done", "Well done", "Great job", "Hooray", "Fantastic", "Nice work", "Looks good", "Good one", "Splendid", "Way to go", "Nailed it", "Brilliant", "Excellent", "Superb", "Right on", "You got it", "Perfect", "Spot on", "Impressive", "Top notch", "That’s it"],
      intervals: Object.keys(NotePython.INTERVAL_FULL_NAME_MAP),
      namespace: "notePython"
    };
    this.opts = _objectSpread(_objectSpread({}, defaults), options || {});
    this.ns = this.opts.namespace || "notePython";
    this.$board = $(this.opts.boardEl).first();
    this.$countdown = $("#game-countdown").first();
    this.$countdownText = this.$countdown.find("h1").first();
    this.$startBtn = this.$countdown.find("button").first();
    this.prompt = new _shared_PromptUi_js__WEBPACK_IMPORTED_MODULE_3__.PromptUi("#prompt");
    this.instructionsUi = new _shared_InstructionsUi_js__WEBPACK_IMPORTED_MODULE_5__.InstructionsUi("#instructions");
    this.$points = $("#points");
    this.$increment = $("#increment");
    this.$feedback = $("#feedback-success");
    this.$helpBtn = $("#help");
    this.$accidentals = $("#accidentals");
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$finalOverlay = $("#final-overlay");
    this.$doublePoints = $("#double-points");
    this.$controls = $("#controls");
    this.$restart = $("#restart");
    this._rows = 9;
    this._cols = 9;
    this._snake = [];
    this._foods = [];
    this._bombs = [];
    this._foodIdCounter = 1;
    this._animatedFoodIds = new Set();
    this._foodAnimTimeouts = [];
    this._direction = {
      dr: 1,
      dc: 0
    }; // starts moving downward
    this._directionQueue = [];
    this._tickTimer = null;
    this._countdownTimeouts = [];
    this._isGameOver = false;
    this._currentIntervalAbbr = null;
    this._currentIntervalDirection = 1; // 1=up, -1=down
    this._headNote = null;
    this._targetNotes = [];
    this._uiSfxReady = false;
    this._uiSfxSynth = null;
    this._uiSfxNoise = null;
    this._uiTimerSfxSynth = null;
    this._audioUnlockArmed = false;
    this._finalMetricsSfxTimeouts = [];
    this._finalCountupTimeouts = [];
    this._finalStartMs = Date.now();
    this._finalResultsTimeoutId = null;
    this._pausedByModal = false;
    this._pointsValue = 0;
    this._roundsCompleted = 0;
    this._madeMistakeThisRound = false;
    this._madeAnyMistake = false;
    this._correctStreak = 0;
    this._stats = {
      checksTotal: 0,
      checksCorrect: 0,
      finishedAtMs: null
    };
    this.successPhrases = Array.isArray(this.opts.successPhrases) && this.opts.successPhrases.length ? this.opts.successPhrases.slice() : ["Great job"];
  }
  return _createClass(NotePython, [{
    key: "_gridRows",
    value: function _gridRows() {
      var n = Number(this.opts.rows);
      return Math.max(2, Math.floor(Number.isFinite(n) ? n : 9));
    }
  }, {
    key: "_gridCols",
    value: function _gridCols() {
      var n = Number(this.opts.cols);
      return Math.max(2, Math.floor(Number.isFinite(n) ? n : 9));
    }
  }, {
    key: "_renderBoard",
    value: function _renderBoard() {
      if (!this.$board.length) return;
      var rows = this._gridRows();
      var cols = this._gridCols();
      this._rows = rows;
      this._cols = cols;
      var total = rows * cols;
      this.$board.empty();
      this.$board.attr("data-rows", String(rows)).attr("data-cols", String(cols)).css({
        display: "grid",
        gridTemplateColumns: "repeat(".concat(cols, ", 1fr)")
      });
      for (var i = 0; i < total; i += 1) {
        var r = Math.floor(i / cols);
        var c = i % cols;
        $("<div></div>").addClass("board-cell").attr("data-row", String(r)).attr("data-col", String(c)).attr("data-index", String(i)).appendTo(this.$board);
      }
    }
  }, {
    key: "_snakeSpeedMs",
    value: function _snakeSpeedMs() {
      var n = Number(this.opts.snakeSpeed);
      return Math.max(50, Math.floor(Number.isFinite(n) ? n : 500));
    }
  }, {
    key: "_wrapCell",
    value: function _wrapCell(_ref) {
      var r = _ref.r,
        c = _ref.c;
      var rr = (r % this._rows + this._rows) % this._rows;
      var cc = (c % this._cols + this._cols) % this._cols;
      return {
        r: rr,
        c: cc
      };
    }
  }, {
    key: "_sameCell",
    value: function _sameCell(a, b) {
      return !!a && !!b && a.r === b.r && a.c === b.c;
    }
  }, {
    key: "_torusAxisDistance",
    value: function _torusAxisDistance(a, b, size) {
      var d = Math.abs(a - b);
      return Math.min(d, Math.max(0, size) - d);
    }
  }, {
    key: "_isTooCloseToHead",
    value: function _isTooCloseToHead(cell) {
      var _this$_snake;
      var minDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
      var head = (_this$_snake = this._snake) === null || _this$_snake === void 0 ? void 0 : _this$_snake[0];
      if (!head || !cell) return false;
      var dr = this._torusAxisDistance(cell.r, head.r, this._rows);
      var dc = this._torusAxisDistance(cell.c, head.c, this._cols);
      return dr <= minDistance && dc <= minDistance;
    }
  }, {
    key: "_deriveFullNameFromAbbr",
    value: function _deriveFullNameFromAbbr(abbr) {
      var m = String(abbr || "").trim().match(/^([PMAmd])(\d+)$/);
      if (!m) return abbr;
      var q = m[1];
      var n = m[2];
      var qWord = q === "m" ? "minor" : q === "M" ? "major" : q === "P" ? "perfect" : q === "A" ? "augmented" : q === "d" ? "diminished" : q;
      return "".concat(qWord, " ").concat(n);
    }
  }, {
    key: "_fullNameForInterval",
    value: function _fullNameForInterval(abbr) {
      var key = String(abbr || "").trim();
      return NotePython.INTERVAL_FULL_NAME_MAP[key] || this._deriveFullNameFromAbbr(key);
    }
  }, {
    key: "_intervalPool",
    value: function _intervalPool() {
      var pool = Array.isArray(this.opts.intervals) ? this.opts.intervals : null;
      if (pool && pool.length) return pool.slice();
      return Object.keys(NotePython.INTERVAL_FULL_NAME_MAP);
    }
  }, {
    key: "_pickInterval",
    value: function _pickInterval() {
      var pool = this._intervalPool();
      return pool[Math.floor(Math.random() * pool.length)] || "M3";
    }
  }, {
    key: "_setIntervalUI",
    value: function _setIntervalUI(intervalAbbr) {
      this._setIntervalUIWithDirection(intervalAbbr, this._currentIntervalDirection);
    }
  }, {
    key: "_setIntervalUIWithDirection",
    value: function _setIntervalUIWithDirection(intervalAbbr) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var abbr = String(intervalAbbr || "").trim();
      this._currentIntervalAbbr = abbr;
      this._currentIntervalDirection = Number(direction) === -1 ? -1 : 1;
      this.prompt.setShort(abbr);
      if (this._isStrictDirection()) this.prompt.showDirection(this._currentIntervalDirection);else this.prompt.hideDirection();
      this.prompt.setLong(this._fullNameForInterval(abbr));
    }
  }, {
    key: "_normalizeOnOff",
    value: function _normalizeOnOff(v) {
      if (v === true) return true;
      if (v === false) return false;
      var s = String(v !== null && v !== void 0 ? v : "").trim().toLowerCase();
      return s === "on" || s === "true" || s === "1";
    }
  }, {
    key: "_isStrictDirection",
    value: function _isStrictDirection() {
      return this._normalizeOnOff(this.opts.strictDirection);
    }
  }, {
    key: "_useRealWalls",
    value: function _useRealWalls() {
      return this._normalizeOnOff(this.opts.realWalls);
    }
  }, {
    key: "_isSolfege",
    value: function _isSolfege() {
      return this._normalizeOnOff(this.opts.solfege);
    }
  }, {
    key: "_pickIntervalDirection",
    value: function _pickIntervalDirection() {
      if (!this._isStrictDirection()) return 1;
      return Math.random() < 0.5 ? -1 : 1;
    }
  }, {
    key: "_noteDisplay",
    value: function _noteDisplay() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        letter = _ref2.letter,
        _ref2$accOffset = _ref2.accOffset,
        accOffset = _ref2$accOffset === void 0 ? 0 : _ref2$accOffset;
      var L = String(letter || "").toUpperCase();
      var base = this._isSolfege() ? NotePython.LETTER_TO_SOLFEGE[L] || L : L;
      var off = Number(accOffset) || 0;
      var accText = off === 2 ? "##" : off === 1 ? "#" : off === -1 ? "b" : off === -2 ? "bb" : "";
      return "".concat(base).concat(accText);
    }
  }, {
    key: "_noteObj",
    value: function _noteObj(letter) {
      var accOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var off = Number(accOffset) || 0;
      var accText = off === 2 ? "##" : off === 1 ? "#" : off === -1 ? "b" : off === -2 ? "bb" : "";
      var naturalPc = {
        C: 0,
        D: 2,
        E: 4,
        F: 5,
        G: 7,
        A: 9,
        B: 11
      }[letter];
      var pitchClass = ((naturalPc + off) % 12 + 12) % 12;
      return {
        letter: letter,
        accOffset: off,
        pitchClass: pitchClass,
        canonical: "".concat(letter).concat(accText),
        display: this._noteDisplay({
          letter: letter,
          accOffset: off
        })
      };
    }
  }, {
    key: "_cloneNote",
    value: function _cloneNote(note) {
      if (!note) return null;
      return this._noteObj(String(note.letter || "C").toUpperCase(), Number(note.accOffset) || 0);
    }
  }, {
    key: "_parseIntervalAbbr",
    value: function _parseIntervalAbbr(abbr) {
      var m = String(abbr || "").trim().match(/^([PMAmd])(\d+)$/);
      if (!m) return null;
      return {
        quality: m[1],
        number: Number(m[2])
      };
    }
  }, {
    key: "_intervalToSemitones",
    value: function _intervalToSemitones(intervalAbbr) {
      var map = {
        P1: 0,
        m2: 1,
        M2: 2,
        m3: 3,
        M3: 4,
        P4: 5,
        A4: 6,
        d5: 6,
        P5: 7,
        m6: 8,
        M6: 9,
        m7: 10,
        M7: 11,
        P8: 12
      };
      return map[String(intervalAbbr || "").trim()];
    }
  }, {
    key: "_spelledIntervalTarget",
    value: function _spelledIntervalTarget(prevNote, intervalAbbr) {
      var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
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
      return this._noteObj(targetLetter, off);
    }
  }, {
    key: "_randomNoteObj",
    value: function _randomNoteObj() {
      var letters = ["C", "D", "E", "F", "G", "A", "B"];
      var letter = letters[Math.floor(Math.random() * letters.length)];
      var accPool = [0, 0, 0, 0, 1, -1];
      var off = accPool[Math.floor(Math.random() * accPool.length)];
      return this._noteObj(letter, off);
    }
  }, {
    key: "_computeTargetNotes",
    value: function _computeTargetNotes() {
      var interval = this._currentIntervalAbbr || "M3";
      var list = this._isStrictDirection() ? [this._spelledIntervalTarget(this._headNote, interval, this._currentIntervalDirection === -1 ? -1 : 1)].filter(Boolean) : [this._spelledIntervalTarget(this._headNote, interval, 1), this._spelledIntervalTarget(this._headNote, interval, -1)].filter(Boolean);
      var seen = new Set();
      return list.filter(function (n) {
        var key = String(n.canonical || "");
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
  }, {
    key: "_isPracticeMode",
    value: function _isPracticeMode() {
      var v = this.opts.practiceMode;
      if (v === true) return true;
      var s = String(v !== null && v !== void 0 ? v : "").trim().toLowerCase();
      return s === "on" || s === "true" || s === "1";
    }
  }, {
    key: "_showBombs",
    value: function _showBombs() {
      return this._normalizeOnOff(this.opts.showBombs);
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
    key: "_placeInitialSnake",
    value: function _placeInitialSnake() {
      var centerCol = Math.floor(this._cols / 2);
      var startRow = Math.min(1, this._rows - 1); // second row from top
      var head = {
        r: startRow,
        c: centerCol
      };
      this._direction = {
        dr: 1,
        dc: 0
      };
      this._snake = [head, {
        r: Math.max(0, startRow - 1),
        c: centerCol
      }];
      this._headNote = this._randomNoteObj();
    }
  }, {
    key: "_enqueueDirection",
    value: function _enqueueDirection(next) {
      if (this._isGameOver) return;
      if (!next || !Number.isFinite(next.dr) || !Number.isFinite(next.dc)) return;
      var lastQueued = this._directionQueue.length ? this._directionQueue[this._directionQueue.length - 1] : this._direction;
      if (next.dr === lastQueued.dr && next.dc === lastQueued.dc) return;
      // Prevent immediate 180 turn against effective direction (current or last queued).
      if (next.dr === -lastQueued.dr && next.dc === -lastQueued.dc) return;

      // Keep a short buffer so rapid inputs can chain (e.g. right then down).
      if (this._directionQueue.length >= 2) return;
      this._directionQueue.push({
        dr: next.dr,
        dc: next.dc
      });
    }
  }, {
    key: "_wireKeyboardControls",
    value: function _wireKeyboardControls() {
      var _this = this;
      var ns = ".toneTrailKeys.".concat(this.ns);
      $(document).off("keydown".concat(ns)).on("keydown".concat(ns), function (e) {
        var key = String(e.key || "").toLowerCase();
        if (key === "arrowup") {
          e.preventDefault();
          _this._enqueueDirection({
            dr: -1,
            dc: 0
          });
        } else if (key === "arrowdown") {
          e.preventDefault();
          _this._enqueueDirection({
            dr: 1,
            dc: 0
          });
        } else if (key === "arrowleft") {
          e.preventDefault();
          _this._enqueueDirection({
            dr: 0,
            dc: -1
          });
        } else if (key === "arrowright") {
          e.preventDefault();
          _this._enqueueDirection({
            dr: 0,
            dc: 1
          });
        }
      });
    }
  }, {
    key: "_wireSwipeControls",
    value: function _wireSwipeControls() {
      var _this$$board,
        _this2 = this;
      if (!((_this$$board = this.$board) !== null && _this$$board !== void 0 && _this$$board.length)) return;
      var ns = ".toneTrailSwipe.".concat(this.ns);
      var startX = 0;
      var startY = 0;
      var tracking = false;
      var minSwipe = 18;
      var queueFromDelta = function queueFromDelta(dx, dy) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < minSwipe) return;
        if (Math.abs(dx) > Math.abs(dy)) {
          _this2._enqueueDirection(dx > 0 ? {
            dr: 0,
            dc: 1
          } : {
            dr: 0,
            dc: -1
          });
        } else {
          _this2._enqueueDirection(dy > 0 ? {
            dr: 1,
            dc: 0
          } : {
            dr: -1,
            dc: 0
          });
        }
      };
      this.$board.off("touchstart".concat(ns, " touchmove").concat(ns, " touchend").concat(ns, " touchcancel").concat(ns)).on("touchstart".concat(ns), function (e) {
        var _e$originalEvent;
        var t = (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 || (_e$originalEvent = _e$originalEvent.touches) === null || _e$originalEvent === void 0 ? void 0 : _e$originalEvent[0];
        if (!t) return;
        startX = t.clientX;
        startY = t.clientY;
        tracking = true;
      }).on("touchmove".concat(ns), function (e) {
        var _e$originalEvent2;
        if (!tracking) return;
        var t = (_e$originalEvent2 = e.originalEvent) === null || _e$originalEvent2 === void 0 || (_e$originalEvent2 = _e$originalEvent2.touches) === null || _e$originalEvent2 === void 0 ? void 0 : _e$originalEvent2[0];
        if (!t) return;
        var dx = t.clientX - startX;
        var dy = t.clientY - startY;
        if (Math.max(Math.abs(dx), Math.abs(dy)) >= 10) e.preventDefault();
      }).on("touchend".concat(ns), function (e) {
        var _e$originalEvent3;
        if (!tracking) return;
        var t = (_e$originalEvent3 = e.originalEvent) === null || _e$originalEvent3 === void 0 || (_e$originalEvent3 = _e$originalEvent3.changedTouches) === null || _e$originalEvent3 === void 0 ? void 0 : _e$originalEvent3[0];
        tracking = false;
        if (!t) return;
        queueFromDelta(t.clientX - startX, t.clientY - startY);
      }).on("touchcancel".concat(ns), function () {
        tracking = false;
      });
    }
  }, {
    key: "_wireModalPause",
    value: function _wireModalPause() {
      var _this3 = this;
      var ns = ".toneTrailModalPause.".concat(this.ns);
      $(document).off("shown.bs.modal".concat(ns)).off("hidden.bs.modal".concat(ns)).on("shown.bs.modal".concat(ns), function () {
        _this3._pausedByModal = true;
        _this3._stopLoop();
      }).on("hidden.bs.modal".concat(ns), function () {
        // If another modal is still open, stay paused.
        if ($(".modal.show").length) return;
        if (!_this3._pausedByModal) return;
        _this3._pausedByModal = false;
        if (_this3._isGameOver) return;
        if (!_this3._snake.length) return; // game not started yet
        if (_this3._tickTimer != null) return;
        _this3._startLoop();
      });
    }
  }, {
    key: "_spawnFoods",
    value: function _spawnFoods() {
      var _this4 = this;
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$preferredRow = _ref3.preferredRow,
        preferredRow = _ref3$preferredRow === void 0 ? null : _ref3$preferredRow;
      var n = Math.max(0, Math.floor(Number(count) || 0));
      if (!n) return;
      var hasPreferredRow = Number.isFinite(preferredRow);
      var targetRow = hasPreferredRow ? Math.max(0, Math.min(this._rows - 1, Math.floor(preferredRow))) : null;
      for (var k = 0; k < n; k += 1) {
        var free = [];
        var rowStart = hasPreferredRow ? targetRow : 0;
        var rowEnd = hasPreferredRow ? targetRow + 1 : this._rows;
        for (var r = rowStart; r < rowEnd; r += 1) {
          var _loop = function _loop() {
            var cell = {
              r: r,
              c: c
            };
            var occupiedBySnake = _this4._snake.some(function (s) {
              return _this4._sameCell(s, cell);
            });
            var occupiedByFood = _this4._foods.some(function (f) {
              return _this4._sameCell(f, cell);
            });
            var occupiedByBomb = _this4._bombs.some(function (b) {
              return _this4._sameCell(b, cell);
            });
            var tooCloseToHead = _this4._isTooCloseToHead(cell, 2);
            if (!occupiedBySnake && !occupiedByFood && !occupiedByBomb && !tooCloseToHead) free.push(cell);
          };
          for (var c = 0; c < this._cols; c += 1) {
            _loop();
          }
        }
        if (!free.length) {
          if (hasPreferredRow) {
            this._spawnFoods(1);
            continue;
          }
          return;
        }
        var pick = free[Math.floor(Math.random() * free.length)];
        this._foods.push({
          id: this._foodIdCounter++,
          r: pick.r,
          c: pick.c,
          note: this._randomNoteObj()
        });
      }
    }
  }, {
    key: "_spawnBombs",
    value: function _spawnBombs() {
      var _this5 = this;
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$preferredRow = _ref4.preferredRow,
        preferredRow = _ref4$preferredRow === void 0 ? null : _ref4$preferredRow;
      if (!this._showBombs()) return;
      var n = Math.max(0, Math.floor(Number(count) || 0));
      if (!n) return;
      var hasPreferredRow = Number.isFinite(preferredRow);
      var targetRow = hasPreferredRow ? Math.max(0, Math.min(this._rows - 1, Math.floor(preferredRow))) : null;
      for (var k = 0; k < n; k += 1) {
        var free = [];
        var rowStart = hasPreferredRow ? targetRow : 0;
        var rowEnd = hasPreferredRow ? targetRow + 1 : this._rows;
        for (var r = rowStart; r < rowEnd; r += 1) {
          var _loop2 = function _loop2() {
            var cell = {
              r: r,
              c: c
            };
            var occupiedBySnake = _this5._snake.some(function (s) {
              return _this5._sameCell(s, cell);
            });
            var occupiedByFood = _this5._foods.some(function (f) {
              return _this5._sameCell(f, cell);
            });
            var occupiedByBomb = _this5._bombs.some(function (b) {
              return _this5._sameCell(b, cell);
            });
            var tooCloseToHead = _this5._isTooCloseToHead(cell, 2);
            if (!occupiedBySnake && !occupiedByFood && !occupiedByBomb && !tooCloseToHead) free.push(cell);
          };
          for (var c = 0; c < this._cols; c += 1) {
            _loop2();
          }
        }
        if (!free.length) {
          if (hasPreferredRow) {
            this._spawnBombs(1);
            continue;
          }
          return;
        }
        var pick = free[Math.floor(Math.random() * free.length)];
        this._bombs.push({
          r: pick.r,
          c: pick.c
        });
      }
    }
  }, {
    key: "_ensureTargetFoodPresent",
    value: function _ensureTargetFoodPresent() {
      if (!this._foods.length) return;
      this._targetNotes = this._computeTargetNotes();
      if (this._isStrictDirection() && !this._targetNotes.length) {
        // Re-pick prompt until the current head note can produce a valid strict target.
        for (var i = 0; i < 120 && !this._targetNotes.length; i += 1) {
          this._setIntervalUIWithDirection(this._pickInterval(), this._pickIntervalDirection());
          this._targetNotes = this._computeTargetNotes();
        }
      }
      if (!this._targetNotes.length) return;
      var valid = new Set(this._targetNotes.map(function (n) {
        return String(n.canonical || "").trim();
      }).filter(Boolean));

      // Hard guarantee: force at least one valid food note to exist.
      for (var attempt = 0; attempt < 3; attempt += 1) {
        var has = this._foods.some(function (f) {
          var _f$note;
          return valid.has(String(((_f$note = f.note) === null || _f$note === void 0 ? void 0 : _f$note.canonical) || "").trim());
        });
        if (has) return;
        var idx = Math.floor(Math.random() * this._foods.length);
        var pick = this._targetNotes[Math.floor(Math.random() * this._targetNotes.length)];
        this._foods[idx].note = this._cloneNote(pick);
      }
    }
  }, {
    key: "_renderEntities",
    value: function _renderEntities() {
      var _this6 = this;
      if (!this.$board.length) return;
      var $cells = this.$board.find(".board-cell");
      $cells.removeClass("snake snake-head food bomb animate__animated animate__rubberBand").html("");
      this._snake.forEach(function (cell, i) {
        var selector = ".board-cell[data-row=\"".concat(cell.r, "\"][data-col=\"").concat(cell.c, "\"]");
        var $cell = _this6.$board.find(selector);
        if (!$cell.length) return;
        $cell.addClass("snake");
        if (i === 0) {
          var _this6$_headNote;
          $cell.addClass("snake-head");
          if ((_this6$_headNote = _this6._headNote) !== null && _this6$_headNote !== void 0 && _this6$_headNote.display) $cell.html("<span class=\"food-note\">".concat(_this6._headNote.display, "</span>"));
        }
      });
      this._foods.forEach(function (food, i) {
        var _food$note;
        var $food = _this6.$board.find(".board-cell[data-row=\"".concat(food.r, "\"][data-col=\"").concat(food.c, "\"]"));
        if (!$food.length) return;
        $food.addClass("food").html("<span class=\"food-note\">".concat(String(((_food$note = food.note) === null || _food$note === void 0 ? void 0 : _food$note.display) || ""), "</span>"));
        if ((food === null || food === void 0 ? void 0 : food.id) == null || _this6._animatedFoodIds.has(food.id)) return;
        _this6._animatedFoodIds.add(food.id);
        var tid = setTimeout(function () {
          var $target = _this6.$board.find(".board-cell[data-row=\"".concat(food.r, "\"][data-col=\"").concat(food.c, "\"]")).first();
          if (!$target.length) return;
          $target.removeClass("animate__animated animate__rubberBand");
          // eslint-disable-next-line no-unused-expressions
          $target[0] && $target[0].offsetWidth;
          $target.addClass("animate__animated animate__rubberBand");
          $target.off("animationend.".concat(_this6.ns, "FoodHB webkitAnimationEnd.").concat(_this6.ns, "FoodHB")).one("animationend.".concat(_this6.ns, "FoodHB webkitAnimationEnd.").concat(_this6.ns, "FoodHB"), function () {
            $target.removeClass("animate__animated animate__rubberBand");
          });
        }, 0);
        _this6._foodAnimTimeouts.push(tid);
      });
      this._bombs.forEach(function (bomb) {
        if (!_this6._showBombs()) return;
        var $bomb = _this6.$board.find(".board-cell[data-row=\"".concat(bomb.r, "\"][data-col=\"").concat(bomb.c, "\"]"));
        if (!$bomb.length) return;
        $bomb.addClass("bomb").html('<div class="bomb"><i class="fa-solid fa-bomb"></i></div>');
      });
    }
  }, {
    key: "_explodeSnakeAndEndGame",
    value: function _explodeSnakeAndEndGame() {
      var _this$$board2, _this$$board2$addClas;
      if (this._isGameOver) return;
      this._isGameOver = true;
      this._stopLoop();
      this._clearCorrectStreak();
      (_this$$board2 = this.$board) === null || _this$$board2 === void 0 || (_this$$board2$addClas = _this$$board2.addClass) === null || _this$$board2$addClas === void 0 || _this$$board2$addClas.call(_this$$board2, "failed");
      this._playWallCrashSfx();
      this._playBombHitFailSfx();
      this._hingeClearSnake();
    }
  }, {
    key: "_hingeClearSnake",
    value: function _hingeClearSnake() {
      var _this$$board3,
        _this7 = this;
      if (!((_this$$board3 = this.$board) !== null && _this$$board3 !== void 0 && _this$$board3.length)) return;
      var $targets = this.$board.find(".board-cell.snake, .board-cell.snake-head");
      if (!$targets.length) {
        var _this$$restart, _this$$restart$show;
        (_this$$restart = this.$restart) === null || _this$$restart === void 0 || (_this$$restart$show = _this$$restart.show) === null || _this$$restart$show === void 0 || _this$$restart$show.call(_this$$restart);
        return;
      }
      var lastIndex = $targets.length - 1;
      $targets.each(function (i, el) {
        var delay = i * 85;
        var tid = setTimeout(function () {
          var $el = $(el);
          $el.removeClass("animate__animated animate__hinge animate__rubberBand").addClass("animate__animated animate__hinge").off("animationend.".concat(_this7.ns, "SnakeHinge webkitAnimationEnd.").concat(_this7.ns, "SnakeHinge")).one("animationend.".concat(_this7.ns, "SnakeHinge webkitAnimationEnd.").concat(_this7.ns, "SnakeHinge"), function () {
            var _this7$$restart, _this7$$restart$show;
            $el.removeClass("snake snake-head animate__animated animate__hinge animate__rubberBand").html("").css("animation-delay", "");
            if (i === lastIndex) (_this7$$restart = _this7.$restart) === null || _this7$$restart === void 0 || (_this7$$restart$show = _this7$$restart.show) === null || _this7$$restart$show === void 0 || _this7$$restart$show.call(_this7$$restart);
          });
        }, delay);
        _this7._countdownTimeouts.push(tid);
      });
    }
  }, {
    key: "_explodeBombCollision",
    value: function _explodeBombCollision(hitCell) {
      var _this$$board4,
        _this8 = this;
      if (!((_this$$board4 = this.$board) !== null && _this$$board4 !== void 0 && _this$$board4.length)) return;
      var parentEl = this.$board[0] || document.body;
      var explodedSelectors = [];
      this._snake.forEach(function (cell, i) {
        var $cell = _this8.$board.find(".board-cell[data-row=\"".concat(cell.r, "\"][data-col=\"").concat(cell.c, "\"]")).first();
        if (!$cell.length) return;
        (0,_shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_2__.playSnakeCellBreakBurstAtElement)($cell[0], {
          parentEl: parentEl,
          index: i
        });
        explodedSelectors.push(".board-cell[data-row=\"".concat(cell.r, "\"][data-col=\"").concat(cell.c, "\"]"));
      });
      if (hitCell) {
        var $bombCell = this.$board.find(".board-cell[data-row=\"".concat(hitCell.r, "\"][data-col=\"").concat(hitCell.c, "\"]")).first();
        if ($bombCell.length) {
          (0,_shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_2__.playSnakeCellBreakBurstAtElement)($bombCell[0], {
            parentEl: parentEl,
            index: this._snake.length + 1
          });
          explodedSelectors.push(".board-cell[data-row=\"".concat(hitCell.r, "\"][data-col=\"").concat(hitCell.c, "\"]"));
        }
      }
      var deduped = Array.from(new Set(explodedSelectors));
      var tid = setTimeout(function () {
        deduped.forEach(function (selector) {
          _this8.$board.find(selector).removeClass("snake snake-head bomb food animate__animated animate__rubberBand animate__hinge").html("");
        });
      }, 110);
      this._countdownTimeouts.push(tid);
    }
  }, {
    key: "_playBombHitFailSfx",
    value: function _playBombHitFailSfx() {
      var _this9 = this;
      if (!this._isSoundEnabled() || !window.Tone) return Promise.resolve(0);
      return this._ensureUiSfxAudio().then(function () {
        var _synth$get$oscillator;
        var synth = _this9._uiSfxSynth;
        var noiseSynth = _this9._uiSfxNoise;
        if (!synth) return 0;
        var now = Tone.now();
        var oldEnv = _objectSpread({}, synth.get().envelope);
        var oldOsc = (_synth$get$oscillator = synth.get().oscillator) === null || _synth$get$oscillator === void 0 ? void 0 : _synth$get$oscillator.type;
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
          synth.triggerAttackRelease(n, 0.15, when, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("bombFail", 0.42));
          if (noiseSynth && i < 8) {
            noiseSynth.triggerAttackRelease(0.05, when + 0.015, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("bombFail", 0.14));
          }
        });
        var restoreDelay = 2200;
        var tid = setTimeout(function () {
          try {
            synth.set({
              oscillator: {
                type: oldOsc || "triangle"
              },
              envelope: oldEnv
            });
          } catch (_) {}
        }, restoreDelay);
        _this9._countdownTimeouts.push(tid);
        return restoreDelay;
      });
    }
  }, {
    key: "_playWallCrashSfx",
    value: function _playWallCrashSfx() {
      var _this0 = this;
      if (!this._isSoundEnabled() || !window.Tone) return;
      this._ensureUiSfxAudio().then(function () {
        var synth = _this0._uiTimerSfxSynth || _this0._uiSfxSynth;
        var noiseSynth = _this0._uiSfxNoise;
        if (!synth) return;
        var now = Tone.now();
        if (noiseSynth) {
          noiseSynth.triggerAttackRelease(0.12, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("wallCrash", 0.32));
          noiseSynth.triggerAttackRelease(0.09, now + 0.045, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("wallCrash", 0.22));
        }
        synth.triggerAttackRelease("G3", 0.08, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("wallCrash", 0.85));
        synth.triggerAttackRelease("D3", 0.12, now + 0.04, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("wallCrash", 0.7));
        synth.triggerAttackRelease("A2", 0.18, now + 0.11, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("wallCrash", 0.62));
      });
    }
  }, {
    key: "_hingeClearBoardEntities",
    value: function _hingeClearBoardEntities() {
      var _this$$board5,
        _this1 = this;
      if (!((_this$$board5 = this.$board) !== null && _this$$board5 !== void 0 && _this$$board5.length)) return;
      var $targets = this.$board.find(".board-cell").filter(function (_, el) {
        var $el = $(el);
        return $el.hasClass("snake") || $el.hasClass("snake-head") || $el.hasClass("food") || $el.hasClass("bomb") || $el.children().length > 0;
      });
      if (!$targets.length) {
        var _this$$restart2, _this$$restart2$show;
        (_this$$restart2 = this.$restart) === null || _this$$restart2 === void 0 || (_this$$restart2$show = _this$$restart2.show) === null || _this$$restart2$show === void 0 || _this$$restart2$show.call(_this$$restart2);
        return;
      }
      var lastIndex = $targets.length - 1;
      $targets.each(function (i, el) {
        var delay = i * 85;
        var tid = setTimeout(function () {
          var $el = $(el);
          $el.removeClass("animate__animated animate__hinge animate__rubberBand").addClass("animate__animated animate__hinge").off("animationend.".concat(_this1.ns, "BombHinge webkitAnimationEnd.").concat(_this1.ns, "BombHinge")).one("animationend.".concat(_this1.ns, "BombHinge webkitAnimationEnd.").concat(_this1.ns, "BombHinge"), function () {
            var _this1$$restart, _this1$$restart$show;
            $el.removeClass("snake snake-head food bomb animate__animated animate__hinge animate__rubberBand").html("").css("animation-delay", "");
            if (i === lastIndex) (_this1$$restart = _this1.$restart) === null || _this1$$restart === void 0 || (_this1$$restart$show = _this1$$restart.show) === null || _this1$$restart$show === void 0 || _this1$$restart$show.call(_this1$$restart);
          });
        }, delay);
        _this1._countdownTimeouts.push(tid);
      });
    }
  }, {
    key: "_handleBombCollision",
    value: function _handleBombCollision() {
      var _this$_snake2,
        _this$$board6,
        _this$$board6$addClas,
        _this10 = this;
      if (this._isGameOver) return;
      var hitCell = (_this$_snake2 = this._snake) !== null && _this$_snake2 !== void 0 && _this$_snake2[0] ? this._wrapCell({
        r: this._snake[0].r + this._direction.dr,
        c: this._snake[0].c + this._direction.dc
      }) : null;
      this._isGameOver = true;
      this._stopLoop();
      this._clearCorrectStreak();
      (_this$$board6 = this.$board) === null || _this$$board6 === void 0 || (_this$$board6$addClas = _this$$board6.addClass) === null || _this$$board6$addClas === void 0 || _this$$board6$addClas.call(_this$$board6, "failed");
      this._playWallCrashSfx();
      this._playBombHitFailSfx();
      this._runBoardPreExplosionShake(function () {
        _this10._explodeBombCollision(hitCell);
        var tid = setTimeout(function () {
          _this10._hingeClearBoardEntities();
        }, 520);
        _this10._countdownTimeouts.push(tid);
      });
    }
  }, {
    key: "_runBoardPreExplosionShake",
    value: function _runBoardPreExplosionShake(onDone) {
      var _this$$board7;
      if (!((_this$$board7 = this.$board) !== null && _this$$board7 !== void 0 && _this$$board7.length)) {
        if (typeof onDone === "function") onDone();
        return;
      }
      var durationMs = 520;
      var stepMs = 22;
      var startedAt = Date.now();
      var $b = this.$board;
      var tick = setInterval(function () {
        var elapsed = Date.now() - startedAt;
        if (elapsed >= durationMs) {
          clearInterval(tick);
          $b.css("transform", "");
          if (typeof onDone === "function") onDone();
          return;
        }
        var t = elapsed / durationMs;
        var amp = 3 + 7 * t; // ramps up as if about to explode
        var dx = (Math.random() * 2 - 1) * amp;
        var dy = (Math.random() * 2 - 1) * amp;
        var rot = (Math.random() * 2 - 1) * (0.8 + 1.2 * t);
        $b.css("transform", "translate(".concat(dx, "px, ").concat(dy, "px) rotate(").concat(rot, "deg)"));
      }, stepMs);
      this._countdownTimeouts.push(tick);
    }
  }, {
    key: "_animateBoardCorrectHit",
    value: function _animateBoardCorrectHit() {
      var _this$$board8,
        _this11 = this;
      if (!((_this$$board8 = this.$board) !== null && _this$$board8 !== void 0 && _this$$board8.length)) return;
      this.$board.removeClass("board-correct-hit");
      // eslint-disable-next-line no-unused-expressions
      this.$board[0] && this.$board[0].offsetWidth;
      this.$board.addClass("board-correct-hit");
      var tid = setTimeout(function () {
        _this11.$board.removeClass("board-correct-hit");
      }, 900);
      this._countdownTimeouts.push(tid);
    }
  }, {
    key: "_animateBoardWrongHit",
    value: function _animateBoardWrongHit() {
      var _this$$board9,
        _this12 = this;
      if (!((_this$$board9 = this.$board) !== null && _this$$board9 !== void 0 && _this$$board9.length)) return;
      this.$board.removeClass("board-wrong-hit");
      // eslint-disable-next-line no-unused-expressions
      this.$board[0] && this.$board[0].offsetWidth;
      this.$board.addClass("board-wrong-hit");
      var tid = setTimeout(function () {
        _this12.$board.removeClass("board-wrong-hit");
      }, 420);
      this._countdownTimeouts.push(tid);
    }
  }, {
    key: "_animateSnakeFinalCelebrate",
    value: function _animateSnakeFinalCelebrate() {
      var _this$$board0,
        _this13 = this;
      if (!((_this$$board0 = this.$board) !== null && _this$$board0 !== void 0 && _this$$board0.length)) return;
      var $cells = this.$board.find(".board-cell.snake");
      $cells.each(function (_, el) {
        var $el = $(el);
        var dur = (0.85 + Math.random() * 0.6).toFixed(2);
        $el.removeClass("animate__animated animate__shakeY").css("animation-duration", "".concat(dur, "s"));
        // eslint-disable-next-line no-unused-expressions
        el && el.offsetWidth;
        $el.addClass("animate__animated animate__shakeY").off("animationend.".concat(_this13.ns, "SnakeCelebrate webkitAnimationEnd.").concat(_this13.ns, "SnakeCelebrate")).one("animationend.".concat(_this13.ns, "SnakeCelebrate webkitAnimationEnd.").concat(_this13.ns, "SnakeCelebrate"), function () {
          $el.removeClass("animate__animated animate__shakeY").css("animation-duration", "");
        });
      });
    }
  }, {
    key: "_advanceSnake",
    value: function _advanceSnake() {
      var _this14 = this,
        _eatenFood$note;
      if (!this._snake.length || this._isGameOver) return;
      if (this._directionQueue.length) {
        var queued = this._directionQueue.shift();
        if (queued) this._direction = queued;
      }
      var head = this._snake[0];
      var rawNext = {
        r: head.r + this._direction.dr,
        c: head.c + this._direction.dc
      };
      var hitWall = this._useRealWalls() && (rawNext.r < 0 || rawNext.r >= this._rows || rawNext.c < 0 || rawNext.c >= this._cols);
      if (hitWall) {
        this._playWallCrashSfx();
        this._explodeSnakeAndEndGame();
        return;
      }
      var next = this._wrapCell(rawNext);
      var hitBomb = this._showBombs() && this._bombs.some(function (bomb) {
        return _this14._sameCell(bomb, next);
      });
      if (hitBomb) {
        this._handleBombCollision();
        return;
      }
      var eatenFoodIdx = this._foods.findIndex(function (f) {
        return _this14._sameCell(f, next);
      });
      var eatenFood = eatenFoodIdx >= 0 ? this._foods[eatenFoodIdx] : null;
      var validTargets = new Set((Array.isArray(this._targetNotes) ? this._targetNotes : []).map(function (n) {
        return String((n === null || n === void 0 ? void 0 : n.canonical) || "").trim();
      }).filter(Boolean));
      var isCorrectFood = !!(eatenFood && validTargets.has(String(((_eatenFood$note = eatenFood.note) === null || _eatenFood$note === void 0 ? void 0 : _eatenFood$note.canonical) || "").trim()));
      var willGrow = !!isCorrectFood;
      this._snake.unshift(next);
      if (!willGrow) {
        this._snake.pop();
      }
      if (eatenFoodIdx >= 0) {
        var $eatenCell = this.$board.find(".board-cell[data-row=\"".concat(eatenFood.r, "\"][data-col=\"").concat(eatenFood.c, "\"]")).first();
        if ($eatenCell.length) {
          (0,_shared_mojsEffects_js__WEBPACK_IMPORTED_MODULE_2__.playSmokePuffAtElement)($eatenCell[0], {
            parentEl: document.body
          });
        }
        if ((eatenFood === null || eatenFood === void 0 ? void 0 : eatenFood.id) != null) this._animatedFoodIds["delete"](eatenFood.id);
        this._foods.splice(eatenFoodIdx, 1);
      }
      if (isCorrectFood) {
        this._stats.checksTotal += 1;
        this._stats.checksCorrect += 1;
        this._roundsCompleted += 1;
        var firstTry = !this._madeMistakeThisRound;
        this._applyCorrectStreakForOutcome({
          firstTry: firstTry
        });
        var earned = this._awardPointsForCorrect();
        var isBonusSuccess = !this._isPracticeMode() && !this._madeMistakeThisRound;
        this._successAnimation({
          isBonus: isBonusSuccess
        });
        if (earned > 0) this._showIncrement(earned);
        this._updateProgressBar();
        this._madeMistakeThisRound = false;
        this._headNote = this._cloneNote(eatenFood.note);
        this._animateBoardCorrectHit();
        this._renderEntities();
        if (!this._isPracticeMode() && this._roundsCompleted >= (Number(this.opts.numOfChallenges) || 4)) {
          this._isGameOver = true;
          this._stopLoop();
          this._animateSnakeFinalCelebrate();
          this._stats.finishedAtMs = Date.now();
          if (this._finalResultsTimeoutId != null) clearTimeout(this._finalResultsTimeoutId);
          this._finalResultsTimeoutId = setTimeout(function () {
            _this14._finalResultsTimeoutId = null;
            _this14._showFinalResults();
          }, 1600);
          return;
        }
        this._runSuccessFeedbackTransition({
          $interval: this.$interval,
          delayMs: 700,
          onDone: function onDone() {
            if (_this14._isGameOver) return;
            _this14._setIntervalUIWithDirection(_this14._pickInterval(), _this14._pickIntervalDirection());
            _this14._spawnFoods(2);
            _this14._spawnBombs(1);
            _this14._ensureTargetFoodPresent();
            _this14._renderEntities();
          }
        });
        return;
      } else if (eatenFood) {
        this._stats.checksTotal += 1;
        this._madeAnyMistake = true;
        this._madeMistakeThisRound = true;
        this._clearCorrectStreak();
        this._playFailSfx();
        this._animateBoardWrongHit();
        if (this._snake.length > 1) this._snake.pop(); // extra shrink by one
        this._spawnFoods(1);
        this._ensureTargetFoodPresent();
      }
      this._renderEntities();
    }
  }, {
    key: "_stopLoop",
    value: function _stopLoop() {
      if (this._tickTimer != null) {
        clearInterval(this._tickTimer);
        this._tickTimer = null;
      }
    }
  }, {
    key: "_clearCountdownTimers",
    value: function _clearCountdownTimers() {
      if (!Array.isArray(this._countdownTimeouts)) {
        this._countdownTimeouts = [];
        return;
      }
      this._countdownTimeouts.forEach(function (id) {
        return clearTimeout(id);
      });
      this._countdownTimeouts = [];
    }
  }, {
    key: "_showCountdownStep",
    value: function _showCountdownStep(text) {
      if (!this.$countdownText.length) return;
      this.$countdownText.removeClass("animate__animated animate__bounceInDown").text(String(text || ""));
      // eslint-disable-next-line no-unused-expressions
      this.$countdownText[0] && this.$countdownText[0].offsetWidth;
      this.$countdownText.addClass("animate__animated animate__bounceInDown");
    }
  }, {
    key: "_playCountdownBeepSfx",
    value: function _playCountdownBeepSfx() {
      if (!this._isSoundEnabled()) return;
      this._ensureUiSfxAudio();
      if (!window.Tone) return;
      var synth = this._uiTimerSfxSynth || this._uiSfxSynth;
      if (!synth) return;
      var now = Tone.now();
      synth.triggerAttackRelease("B5", 0.09, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_4__.GameAudio.scale("countdownBeep", 0.5));
    }
  }, {
    key: "_playCountdownGoFanfareSfx",
    value: function _playCountdownGoFanfareSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._playRunStartFanfareSfx.call(this);
    }
  }, {
    key: "_runCountdownThenStart",
    value: function _runCountdownThenStart() {
      var _this15 = this;
      if (!this.$countdown.length || !this.$countdownText.length) {
        this._placeInitialSnake();
        this._spawnFoods(2, {
          preferredRow: this._rows - 2
        });
        if (this._showBombs()) this._spawnBombs(2);
        this._ensureTargetFoodPresent();
        this._renderEntities();
        this._startLoop();
        return;
      }
      this.$countdown.show();
      this.$startBtn.hide();
      this.$countdownText.show();
      var steps = ["3", "2", "1", "GO!"];
      var stepMs = 1000;
      steps.forEach(function (label, i) {
        var tid = setTimeout(function () {
          _this15._showCountdownStep(label);
          var soundTid = setTimeout(function () {
            if (label === "GO!") _this15._playCountdownGoFanfareSfx();else _this15._playCountdownBeepSfx();
          }, 90);
          _this15._countdownTimeouts.push(soundTid);
        }, i * stepMs);
        _this15._countdownTimeouts.push(tid);
      });
      var doneTid = setTimeout(function () {
        _this15.$countdown.remove();
        _this15.$countdown = $();
        _this15.$countdownText = $();
        _this15._placeInitialSnake();
        _this15._directionQueue = [];
        _this15._spawnFoods(2, {
          preferredRow: _this15._rows - 2
        });
        if (_this15._showBombs()) _this15._spawnBombs(2);
        _this15._ensureTargetFoodPresent();
        _this15._renderEntities();
        _this15._startLoop();
      }, steps.length * stepMs + 500);
      this._countdownTimeouts.push(doneTid);
    }
  }, {
    key: "_awaitStartThenCountdown",
    value: function _awaitStartThenCountdown() {
      var _this16 = this;
      if (!this.$countdown.length) {
        this._runCountdownThenStart();
        return;
      }
      if (!this.$startBtn.length) {
        this._runCountdownThenStart();
        return;
      }
      this.$countdown.show();
      this.$countdownText.text("").hide();
      this.$startBtn.show();
      this.$startBtn.off("click.".concat(this.ns, "Start")).one("click.".concat(this.ns, "Start"), function (e) {
        e.preventDefault();
        _this16.$startBtn.hide();
        _this16._runCountdownThenStart();
      });
    }
  }, {
    key: "_startLoop",
    value: function _startLoop() {
      var _this17 = this;
      if (this._pausedByModal) return;
      this._stopLoop();
      this._tickTimer = setInterval(function () {
        _this17._advanceSnake();
      }, this._snakeSpeedMs());
    }
  }, {
    key: "_showStandardGameUi",
    value: function _showStandardGameUi() {
      var _this$$board1, _this$$board1$toggleC, _this$$interval, _this$$interval$show;
      if (typeof this._syncKeyboardLabels === "function") this._syncKeyboardLabels();
      this.instructionsUi.show().replay();
      $("#controls").show();
      $("#board-wrapper").show();
      (_this$$board1 = this.$board) === null || _this$$board1 === void 0 || (_this$$board1$toggleC = _this$$board1.toggleClass) === null || _this$$board1$toggleC === void 0 || _this$$board1$toggleC.call(_this$$board1, "walled", this._useRealWalls());
      (_this$$interval = this.$interval) === null || _this$$interval === void 0 || (_this$$interval$show = _this$$interval.show) === null || _this$$interval$show === void 0 || _this$$interval$show.call(_this$$interval);
      if (!this._currentIntervalAbbr) {
        this._setIntervalUIWithDirection(this._pickInterval(), this._pickIntervalDirection());
      }
      this._targetNotes = this._computeTargetNotes();
    }
  }, {
    key: "_clearFoodAnimTimers",
    value: function _clearFoodAnimTimers() {
      if (!Array.isArray(this._foodAnimTimeouts)) {
        this._foodAnimTimeouts = [];
        return;
      }
      this._foodAnimTimeouts.forEach(function (id) {
        return clearTimeout(id);
      });
      this._foodAnimTimeouts = [];
    }
  }, {
    key: "start",
    value: function start() {
      var _this$$feedback, _this$$feedback$hide, _this$$restart3, _this$$restart3$hide, _this$$board10, _this$$board10$remove;
      this._stopLoop();
      if (this._finalResultsTimeoutId != null) {
        clearTimeout(this._finalResultsTimeoutId);
        this._finalResultsTimeoutId = null;
      }
      this._clearCountdownTimers();
      this._clearFoodAnimTimers();
      this._wireKeyboardControls();
      this._wireModalPause();
      this._armUiSfxOnFirstGesture();
      this._renderBoard();
      this._wireSwipeControls();
      this._currentIntervalAbbr = null;
      this._currentIntervalDirection = 1;
      this._showStandardGameUi();
      this.$board.find(".board-cell").removeClass("snake snake-head food");
      this._snake = [];
      this._foods = [];
      this._bombs = [];
      this._foodIdCounter = 1;
      this._animatedFoodIds = new Set();
      this._isGameOver = false;
      this._pausedByModal = false;
      this._directionQueue = [];
      this._headNote = null;
      this._targetNotes = [];
      this._pointsValue = 0;
      this._roundsCompleted = 0;
      this._madeMistakeThisRound = false;
      this._madeAnyMistake = false;
      this._clearCorrectStreak();
      this._stats = {
        checksTotal: 0,
        checksCorrect: 0,
        finishedAtMs: null
      };
      this._finalStartMs = Date.now();
      this._syncPracticeUi();
      (_this$$feedback = this.$feedback) === null || _this$$feedback === void 0 || (_this$$feedback$hide = _this$$feedback.hide) === null || _this$$feedback$hide === void 0 || _this$$feedback$hide.call(_this$$feedback);
      (_this$$restart3 = this.$restart) === null || _this$$restart3 === void 0 || (_this$$restart3$hide = _this$$restart3.hide) === null || _this$$restart3$hide === void 0 || _this$$restart3$hide.call(_this$$restart3);
      (_this$$board10 = this.$board) === null || _this$$board10 === void 0 || (_this$$board10$remove = _this$$board10.removeClass) === null || _this$$board10$remove === void 0 || _this$$board10$remove.call(_this$$board10, "failed");
      this.$points.text("0");
      this.$progressBar.data("progress", 0).css({
        width: "0%"
      });
      if (this._isPracticeMode()) this.$progressCounter.text("Practice");else this.$progressCounter.text("0 of ".concat(Number(this.opts.numOfChallenges) || 4));
      this._awaitStartThenCountdown();
    }
  }, {
    key: "_isSoundEnabled",
    value: function _isSoundEnabled() {
      var v = this.opts.sound;
      if (v === true) return true;
      var s = String(v !== null && v !== void 0 ? v : "").trim().toLowerCase();
      if (v === false) return false;
      return !(s === "off" || s === "false" || s === "0");
    }
  }, {
    key: "isSoundEnabled",
    value: function isSoundEnabled() {
      return this._isSoundEnabled();
    }
  }, {
    key: "_awardPointsForCorrect",
    value: function _awardPointsForCorrect() {
      if (this._isPracticeMode()) {
        this.$points.text("0");
        return 0;
      }
      var base = Number.isFinite(Number(this.opts.basePoints)) ? Number(this.opts.basePoints) : 1;
      var bonus = Number.isFinite(Number(this.opts.firstTryBonus)) ? Number(this.opts.firstTryBonus) : 2;
      var earned = this._madeMistakeThisRound ? base : base + bonus;
      this._pointsValue += Math.max(0, earned);
      this.$points.text(String(this._pointsValue));
      return earned;
    }
  }, {
    key: "_updateProgressBar",
    value: function _updateProgressBar() {
      if (this._isPracticeMode()) {
        this.$progressBar.data("progress", 0).css({
          width: "0%"
        });
        this.$progressCounter.text("Practice");
        return 0;
      }
      var steps = Math.max(1, Number(this.opts.numOfChallenges) || 1);
      var progress = Math.min(100, this._roundsCompleted / steps * 100);
      this.$progressBar.data("progress", progress).css({
        width: "".concat(progress, "%")
      });
      this.$progressCounter.text("".concat(Math.min(steps, this._roundsCompleted), " of ").concat(steps));
      return progress;
    }
  }, {
    key: "_showFinalResults",
    value: function _showFinalResults() {
      var _this18 = this,
        _this$$controls,
        _this$$controls$hide;
      if (this._isPracticeMode()) return;
      this._stopLoop();
      this._stats.finishedAtMs = this._stats.finishedAtMs || Date.now();
      var accuracy = this._stats.checksTotal ? Math.round(this._stats.checksCorrect / this._stats.checksTotal * 100) : 0;
      var durationSec = Math.max(0, Math.floor((this._stats.finishedAtMs - this._finalStartMs) / 1000));
      var perfectGame = this._stats.checksCorrect > 0 && !this._madeAnyMistake;
      var finalScore = perfectGame ? this._pointsValue * 2 : this._pointsValue;
      if (perfectGame) {
        var tid = setTimeout(function () {
          var _this18$$doublePoints, _this18$$doublePoints2;
          (_this18$$doublePoints = _this18.$doublePoints) === null || _this18$$doublePoints === void 0 || (_this18$$doublePoints2 = _this18$$doublePoints.show) === null || _this18$$doublePoints2 === void 0 || _this18$$doublePoints2.call(_this18$$doublePoints);
          _this18._playPerfectGameBonusSfx();
        }, 1750);
        this._countdownTimeouts.push(tid);
      } else {
        var _this$$doublePoints, _this$$doublePoints$h;
        (_this$$doublePoints = this.$doublePoints) === null || _this$$doublePoints === void 0 || (_this$$doublePoints$h = _this$$doublePoints.hide) === null || _this$$doublePoints$h === void 0 || _this$$doublePoints$h.call(_this$$doublePoints);
      }
      (_this$$controls = this.$controls) === null || _this$$controls === void 0 || (_this$$controls$hide = _this$$controls.hide) === null || _this$$controls$hide === void 0 || _this$$controls$hide.call(_this$$controls);
      (0,_shared_finalResults_js__WEBPACK_IMPORTED_MODULE_1__.renderFinalResultsOverlay)({
        $finalOverlay: this.$finalOverlay,
        rounds: Number(this.opts.numOfChallenges) || 0,
        score: finalScore,
        accuracy: accuracy,
        durationSec: durationSec,
        clearCountupTimers: function clearCountupTimers() {
          return _this18._clearFinalCountupTimers();
        },
        countupTimers: this._finalCountupTimeouts,
        animateMetrics: function animateMetrics() {
          return _this18._animateFinalMetricsWithSfx();
        },
        playFinalSfx: function playFinalSfx() {
          return _this18._playFinalSfx();
        }
      });
    }
  }, {
    key: "_ensureUiSfxAudio",
    value: function _ensureUiSfxAudio() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._ensureUiSfxAudio.call(this);
    }
  }, {
    key: "_armUiSfxOnFirstGesture",
    value: function _armUiSfxOnFirstGesture() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._armUiSfxOnFirstGesture.call(this);
    }
  }, {
    key: "_playSuccessSfxBasic",
    value: function _playSuccessSfxBasic() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._playSuccessSfxBasic.call(this);
    }
  }, {
    key: "_playSuccessSfxBonus",
    value: function _playSuccessSfxBonus() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._playSuccessSfxBonus.call(this);
    }
  }, {
    key: "_successAnimation",
    value: function _successAnimation(args) {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._successAnimation.call(this, args);
    }
  }, {
    key: "_runSuccessFeedbackTransition",
    value: function _runSuccessFeedbackTransition(args) {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._runSuccessFeedbackTransition.call(this, args);
    }
  }, {
    key: "_applyCorrectStreakForOutcome",
    value: function _applyCorrectStreakForOutcome(args) {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._applyCorrectStreakForOutcome.call(this, args);
    }
  }, {
    key: "getCorrectStreak",
    value: function getCorrectStreak() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype.getCorrectStreak.call(this);
    }
  }, {
    key: "_syncStreakBarClass",
    value: function _syncStreakBarClass() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._syncStreakBarClass.call(this);
    }
  }, {
    key: "_clearCorrectStreak",
    value: function _clearCorrectStreak() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._clearCorrectStreak.call(this);
    }
  }, {
    key: "_playFailSfx",
    value: function _playFailSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._playFailSfx.call(this);
    }
  }, {
    key: "_playFinalSfx",
    value: function _playFinalSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._playFinalSfx.call(this);
    }
  }, {
    key: "_playPerfectGameBonusSfx",
    value: function _playPerfectGameBonusSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._playPerfectGameBonusSfx.call(this);
    }
  }, {
    key: "_playFinalMetricPopSfx",
    value: function _playFinalMetricPopSfx(index) {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._playFinalMetricPopSfx.call(this, index);
    }
  }, {
    key: "_clearFinalMetricsSfxTimers",
    value: function _clearFinalMetricsSfxTimers() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._clearFinalMetricsSfxTimers.call(this);
    }
  }, {
    key: "_animateFinalMetricsWithSfx",
    value: function _animateFinalMetricsWithSfx() {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._animateFinalMetricsWithSfx.call(this);
    }
  }, {
    key: "_showIncrement",
    value: function _showIncrement(earned) {
      return _base_BaseStaffGame_js__WEBPACK_IMPORTED_MODULE_0__.BaseStaffGame.prototype._showIncrement.call(this, earned);
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
  }]);
}();
_defineProperty(NotePython, "INTERVAL_FULL_NAME_MAP", {
  m2: "minor 2nd",
  M2: "major 2nd",
  m3: "minor 3rd",
  M3: "major 3rd",
  P4: "perfect 4th",
  A4: "augmented 4th",
  d5: "diminished 5th",
  P5: "perfect 5th",
  m6: "minor 6th",
  M6: "major 6th",
  m7: "minor 7th",
  M7: "major 7th",
  P8: "perfect 8th"
});
_defineProperty(NotePython, "LETTER_TO_SOLFEGE", {
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
  wallCrash: .4,
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
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
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
      _ref$visibleWhiteKeys = _ref.visibleWhiteKeys,
      visibleWhiteKeys = _ref$visibleWhiteKeys === void 0 ? 7 : _ref$visibleWhiteKeys,
      _ref$initialStartNote = _ref.initialStartNote,
      initialStartNote = _ref$initialStartNote === void 0 ? "C4" : _ref$initialStartNote;
    _classCallCheck(this, PianoKeyboardUi);
    this.rootSelector = rootSelector;
    this.ns = namespace;
    this.onKeyClick = typeof onKeyClick === "function" ? onKeyClick : null;
    this.visibleWhiteKeys = Math.max(1, Number(visibleWhiteKeys) || 7);
    this._startWhiteMidi = (_this$_naturalMidiFro = this._naturalMidiFromNoteName(initialStartNote)) !== null && _this$_naturalMidiFro !== void 0 ? _this$_naturalMidiFro : 60;
    this._activeNoteNames = new Set();
    this._renderTimeoutId = null;
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
        var $key = _this._resolveKeyFromTarget(e.target);
        if (!$key.length) return;
        var noteName = _this.noteNameForKey($key);
        if (_this.onKeyClick) _this.onKeyClick({
          $key: $key,
          noteName: noteName,
          manual: true
        });
      });
      $(document).off("pointerdown.".concat(this.ns, "Drag"), this.rootSelector).on("pointerdown.".concat(this.ns, "Drag"), this.rootSelector, function (e) {
        var _e$originalEvent;
        e.preventDefault();
        var pointerId = (_e$originalEvent = e.originalEvent) === null || _e$originalEvent === void 0 ? void 0 : _e$originalEvent.pointerId;
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
      this._activeNoteNames = new Set();
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
      var nextNoteNames = new Set(nextKeys.map(function ($key) {
        return _this2.noteNameForKey($key);
      }).filter(Boolean));
      if (this._setsEqual(this._activeNoteNames, nextNoteNames)) return this;
      this._hideAllMarkers();
      this._activeNoteNames = new Set();
      nextKeys.forEach(function ($key) {
        var noteName = _this2.noteNameForKey($key);
        if (!noteName || _this2._activeNoteNames.has(noteName)) return;
        _this2._showMarker($key.find(".key-marker").first());
        _this2._activeNoteNames.add(noteName);
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
      var _this3 = this;
      this._hideAllMarkers();
      if (!(this._activeNoteNames instanceof Set) || !this._activeNoteNames.size) return;
      this._activeNoteNames.forEach(function (noteName) {
        var $key = _this3._keyByNoteName(noteName);
        if (!$key.length) return;
        _this3._showMarker($key.find(".key-marker").first());
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
      this._drag.suppressClickUntil = this._drag.didMove ? Date.now() + 250 : 0;
      this._drag.lastStepOffset = 0;
      this._drag.didMove = false;
    }
  }, {
    key: "_setsEqual",
    value: function _setsEqual(a, b) {
      if (!(a instanceof Set) || !(b instanceof Set)) return false;
      if (a.size !== b.size) return false;
      var _iterator = _createForOfIteratorHelper(a),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var value = _step.value;
          if (!b.has(value)) return false;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return true;
    }
  }, {
    key: "_showMarker",
    value: function _showMarker($marker) {
      if (!($marker !== null && $marker !== void 0 && $marker.length)) return;
      $marker.show();
    }
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
    key: "isStepAllowed",
    value: function isStepAllowed(step) {
      return this._isStepAllowed(step);
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
/*!************************************************!*\
  !*** ./resources/js/music/games/notepython.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _notepython_NotePython_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notepython/NotePython.js */ "./resources/js/music/games/notepython/NotePython.js");
var _game$start;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var options = readGlobal("__challengeOptions") || {};
var game = new _notepython_NotePython_js__WEBPACK_IMPORTED_MODULE_0__.NotePython(_objectSpread({}, options));
(_game$start = game.start) === null || _game$start === void 0 ? void 0 : _game$start.call(game);
})();

/******/ })()
;