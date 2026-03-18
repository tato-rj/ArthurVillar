/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/music/games/modesmaster/ModesMaster.js"
/*!*************************************************************!*\
  !*** ./resources/js/music/games/modesmaster/ModesMaster.js ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModesMaster: () => (/* binding */ ModesMaster)
/* harmony export */ });
/* harmony import */ var _staff_Staff_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../staff/Staff.js */ "./resources/js/music/staff/Staff.js");
/* harmony import */ var _shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/challengeUtils.js */ "./resources/js/music/games/shared/challengeUtils.js");
/* harmony import */ var _staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../staff/staffUtils.js */ "./resources/js/music/staff/staffUtils.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var ModesMaster = /*#__PURE__*/function () {
  function ModesMaster() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ModesMaster);
    var defaults = {
      namespace: "modesMaster",
      staffEl: "#staff",
      initialClef: "treble",
      clefUrls: null,
      sound: true
    };
    this.opts = _objectSpread(_objectSpread({}, defaults), options || {});
    this.ns = this.opts.namespace || "modesMaster";
    this.$staffEl = $(this.opts.staffEl).first();
    this._clefPool = (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_1__.normalizeClefPool)(this.opts.clefs != null ? this.opts.clefs : this.opts.clef != null ? this.opts.clef : this.opts.initialClef);
    this.staff = null;
  }
  return _createClass(ModesMaster, [{
    key: "start",
    value: function start() {
      if (!this.$staffEl.length) return;
      this._ensureStaff();
      this._resetBoard();
      this._bindPlacement();
    }
  }, {
    key: "_ensureStaff",
    value: function _ensureStaff() {
      var _this = this;
      if (this.staff) return;
      this.staff = new _staff_Staff_js__WEBPACK_IMPORTED_MODULE_0__.Staff(this.$staffEl, {
        clef: (0,_shared_challengeUtils_js__WEBPACK_IMPORTED_MODULE_1__.pickChallengeClef)(this._clefPool),
        clefUrls: this.opts.clefUrls || null,
        autoClef: false,
        sound: this._isSoundEnabled(),
        getMaxUserNotes: function getMaxUserNotes() {
          return _this._maxUserNotes();
        }
      });
      this.staff.enableNoteDragAndClickDelete();
    }
  }, {
    key: "_isSoundEnabled",
    value: function _isSoundEnabled() {
      var v = this.opts.sound;
      if (v === true) return true;
      if (v === false) return false;
      var s = String(v !== null && v !== void 0 ? v : "").trim().toLowerCase();
      return !(s === "off" || s === "false" || s === "0");
    }
  }, {
    key: "_resetBoard",
    value: function _resetBoard() {
      var _this$staff, _this$staff$clearNote;
      (_this$staff = this.staff) === null || _this$staff === void 0 || (_this$staff$clearNote = _this$staff.clearNotes) === null || _this$staff$clearNote === void 0 || _this$staff$clearNote.call(_this$staff);
    }
  }, {
    key: "_maxUserNotes",
    value: function _maxUserNotes() {
      var raw = Number(this.opts.maxUserNotes);
      return Math.max(1, Math.floor(Number.isFinite(raw) ? raw : 7));
    }
  }, {
    key: "_bindPlacement",
    value: function _bindPlacement() {
      var _this2 = this;
      this.$staffEl.off(".".concat(this.ns));
      this.$staffEl.on("pointerdown.".concat(this.ns), function (e) {
        var _this2$staff$_emitNot, _this2$staff, _this2$staff$_playSte, _this2$staff2;
        if ($(e.target).closest(".note, .accidental").length) return;
        var slotIndex = _this2._nextFreeSlotIndex();
        if (slotIndex < 0) return;
        var _getPointerPageXY = (0,_staff_staffUtils_js__WEBPACK_IMPORTED_MODULE_2__.getPointerPageXY)(e),
          pageY = _getPointerPageXY.y;
        var localY = pageY - _this2.$staffEl.offset().top;
        var step = _this2.staff.yToStep(localY);
        if (!_this2.staff._isStepAllowed(step)) return;
        var noteId = _this2.staff.addNote({
          step: step,
          allowOccupied: true,
          skipResolve: true
        });
        if (!noteId) return;
        _this2.$staffEl.find(".note[data-note-id=\"".concat(noteId, "\"]")).attr("data-slot-index", String(slotIndex)).attr("data-lock-x", "true").addClass("lock-x").addClass("slot-".concat(slotIndex + 1)).css("left", "");
        (_this2$staff$_emitNot = (_this2$staff = _this2.staff)._emitNoteState) === null || _this2$staff$_emitNot === void 0 || _this2$staff$_emitNot.call(_this2$staff, noteId, "user");
        (_this2$staff$_playSte = (_this2$staff2 = _this2.staff)._playStep) === null || _this2$staff$_playSte === void 0 || _this2$staff$_playSte.call(_this2$staff2, step, 0);
      });
    }
  }, {
    key: "_nextFreeSlotIndex",
    value: function _nextFreeSlotIndex() {
      var maxSlots = this._maxUserNotes();
      for (var i = 0; i < maxSlots; i += 1) {
        var hasNote = this.$staffEl.find(".note[data-slot-index=\"".concat(i, "\"]")).length > 0;
        if (!hasNote) return i;
      }
      return -1;
    }
  }]);
}();

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
/*!*************************************************!*\
  !*** ./resources/js/music/games/modesmaster.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modesmaster_ModesMaster_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modesmaster/ModesMaster.js */ "./resources/js/music/games/modesmaster/ModesMaster.js");
var _game$start;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var options = readGlobal("__challengeOptions") || {};
var clefUrls = readGlobal("__clefUrls") || null;
var game = new _modesmaster_ModesMaster_js__WEBPACK_IMPORTED_MODULE_0__.ModesMaster(_objectSpread(_objectSpread({}, options), {}, {
  clefUrls: clefUrls
}));
(_game$start = game.start) === null || _game$start === void 0 ? void 0 : _game$start.call(game);
})();

/******/ })()
;