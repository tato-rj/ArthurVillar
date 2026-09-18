/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/music/admin/GameAudioAdminPage.js"
/*!********************************************************!*\
  !*** ./resources/js/music/admin/GameAudioAdminPage.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GameAudioAdminPage: () => (/* binding */ GameAudioAdminPage)
/* harmony export */ });
/* harmony import */ var _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../games/shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
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

var GameAudioAdminPage = /*#__PURE__*/function () {
  function GameAudioAdminPage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$listSelector = _ref.listSelector,
      listSelector = _ref$listSelector === void 0 ? "#sound-effects-list" : _ref$listSelector,
      _ref$cardSelector = _ref.cardSelector,
      cardSelector = _ref$cardSelector === void 0 ? "[data-sound-card]" : _ref$cardSelector;
    _classCallCheck(this, GameAudioAdminPage);
    this.listSelector = listSelector;
    this.cardSelector = cardSelector;
    this.$list = $();
    this.$template = $();
  }
  return _createClass(GameAudioAdminPage, [{
    key: "init",
    value: function init() {
      this.$list = $(this.listSelector).first();
      if (!this.$list.length) return this;
      this.$template = this.$list.find(this.cardSelector).first().clone();
      if (!this.$template.length) return this;
      this.$list.empty();
      this._renderCards();
      this._bindEvents();
      return this;
    }
  }, {
    key: "_renderCards",
    value: function _renderCards() {
      var _this = this;
      var frag = document.createDocumentFragment();
      _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_0__.GameAudio.getSoundLibrary().forEach(function (sound) {
        var $card = _this.$template.clone();
        var $playBtn = $card.find("[data-play]").first();
        var $name = $card.find(".sound-name").first();
        var $value = $card.find(".sound-volume").first();
        var $input = $card.find('input[type="range"]').first();
        var $desc = $card.find(".sound-description").first();
        $card.attr("data-sound-card", sound.id);
        $playBtn.attr("data-play", sound.id);
        $name.text(sound.label);
        $desc.text(sound.description);
        $input.attr("name", sound.volumeKey).attr("data-volume-key", sound.volumeKey).attr("data-sound-id", sound.id).val(sound.valuePercent);
        $value.text(_this._formatVolumeLabel(sound.valuePercent));
        frag.appendChild($card[0]);
      });
      this.$list.append(frag);
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this2 = this;
      this.$list.off(".gameAudioAdmin").on("input.gameAudioAdmin change.gameAudioAdmin", 'input[type="range"][data-volume-key]', function (e) {
        var $input = $(e.currentTarget);
        var volumeKey = String($input.attr("data-volume-key") || "");
        var nextValue = _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_0__.GameAudio.setVelocityPercent(volumeKey, $input.val());
        $input.closest(_this2.cardSelector).find(".sound-volume").first().text(_this2._formatVolumeLabel(nextValue));
      }).on("click.gameAudioAdmin", "[data-play]", /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
          var soundId;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                e.preventDefault();
                soundId = String($(e.currentTarget).attr("data-play") || "");
                _context.n = 1;
                return _games_shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_0__.GameAudio.previewSound(soundId);
              case 1:
                return _context.a(2);
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "_formatVolumeLabel",
    value: function _formatVolumeLabel(percent) {
      var normalized = Math.max(0, Math.min(100, Number(percent) || 0)) / 100;
      return String(Number(normalized.toFixed(2)));
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
                  GameAudio.playFinalResults();
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
                },
                notePythonMelody: function notePythonMelody() {
                  var lead = GameAudio._getPreviewSynth("notePythonLead", function () {
                    return new Tone.Synth({
                      oscillator: {
                        type: "triangle"
                      },
                      envelope: {
                        attack: 0.004,
                        decay: 0.06,
                        sustain: 0.3,
                        release: 0.07
                      },
                      volume: -23
                    }).toDestination();
                  });
                  var arp = GameAudio._getPreviewSynth("notePythonArp", function () {
                    return new Tone.Synth({
                      oscillator: {
                        type: "square"
                      },
                      envelope: {
                        attack: 0.004,
                        decay: 0.06,
                        sustain: 0.3,
                        release: 0.04
                      },
                      volume: -30
                    }).toDestination();
                  });
                  var now = Tone.now();
                  ["E4", "G4", "C5", "G4"].forEach(function (note, i) {
                    lead.triggerAttackRelease(note, 0.18, now + i * 0.2, GameAudio.scale("notePythonMelody", 0.52));
                    arp.triggerAttackRelease(["C4", "E4", "G4", "B4"][i], 0.07, now + i * 0.2 + 0.1, GameAudio.scale("notePythonMelody", 0.5));
                  });
                },
                notePythonLowEnd: function notePythonLowEnd() {
                  var bass = GameAudio._getPreviewSynth("notePythonBass", function () {
                    return new Tone.Synth({
                      oscillator: {
                        type: "triangle"
                      },
                      envelope: {
                        attack: 0.004,
                        decay: 0.06,
                        sustain: 0.3,
                        release: 0.06
                      },
                      volume: -16
                    }).toDestination();
                  });
                  var keys = GameAudio._getPreviewSynth("notePythonKeys", function () {
                    return new Tone.PolySynth(Tone.Synth, {
                      oscillator: {
                        type: "triangle"
                      },
                      envelope: {
                        attack: 0.008,
                        decay: 0.12,
                        sustain: 0.2,
                        release: 0.09
                      },
                      volume: -27
                    }).toDestination();
                  });
                  var now = Tone.now();
                  bass.triggerAttackRelease("C2", 0.42, now, GameAudio.scale("notePythonLowEnd", 0.75));
                  bass.triggerAttackRelease("G2", 0.32, now + 0.4, GameAudio.scale("notePythonLowEnd", 0.68));
                  keys.triggerAttackRelease(["C3", "E3", "G3"], 0.5, now, GameAudio.scale("notePythonLowEnd", 0.55));
                },
                notePythonDrums: function notePythonDrums() {
                  var kick = GameAudio._getPreviewSynth("notePythonKick", function () {
                    return new Tone.MembraneSynth({
                      pitchDecay: 0.025,
                      octaves: 2,
                      oscillator: {
                        type: "sine"
                      },
                      envelope: {
                        attack: 0.001,
                        decay: 0.15,
                        sustain: 0,
                        release: 0.04
                      },
                      volume: -17
                    }).toDestination();
                  });
                  var snare = GameAudio._getPreviewSynth("notePythonSnare", function () {
                    return new Tone.NoiseSynth({
                      noise: {
                        type: "pink"
                      },
                      envelope: {
                        attack: 0.001,
                        decay: 0.07,
                        sustain: 0,
                        release: 0.02
                      },
                      volume: -26
                    }).toDestination();
                  });
                  var hats = GameAudio._getPreviewSynth("notePythonHats", function () {
                    return new Tone.NoiseSynth({
                      noise: {
                        type: "white"
                      },
                      envelope: {
                        attack: 0.001,
                        decay: 0.012,
                        sustain: 0,
                        release: 0.008
                      },
                      volume: -38
                    }).toDestination();
                  });
                  var now = Tone.now();
                  [0, 0.2, 0.4, 0.6].forEach(function (offset, i) {
                    if (i % 2 === 0) kick.triggerAttackRelease("C1", 0.06, now + offset, GameAudio.scale("notePythonDrums", 0.8));else snare.triggerAttackRelease(0.045, now + offset, GameAudio.scale("notePythonDrums", 0.65));
                    hats.triggerAttackRelease(0.01, now + offset + 0.1, GameAudio.scale("notePythonDrums", 0.3));
                  });
                },
                notePythonVictory: function notePythonVictory() {
                  var brass = GameAudio._getPreviewSynth("notePythonVictoryBrass", function () {
                    return new Tone.PolySynth(Tone.Synth, {
                      oscillator: {
                        type: "square"
                      },
                      envelope: {
                        attack: 0.012,
                        decay: 0.12,
                        sustain: 0.5,
                        release: 0.35
                      },
                      volume: -23
                    }).toDestination();
                  });
                  var bass = GameAudio._getPreviewSynth("notePythonVictoryBass", function () {
                    return new Tone.Synth({
                      oscillator: {
                        type: "triangle"
                      },
                      envelope: {
                        attack: 0.004,
                        decay: 0.06,
                        sustain: 0.3,
                        release: 0.4
                      },
                      volume: -17
                    }).toDestination();
                  });
                  var now = Tone.now();
                  [[0, 0.18, ["C4", "E4", "G4"]], [0.25, 0.18, ["C4", "E4", "G4"]], [0.5, 0.38, ["D4", "G4", "B4"]], [1, 0.8, ["C4", "E4", "G4", "C5"]]].forEach(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 3),
                      offset = _ref4[0],
                      duration = _ref4[1],
                      notes = _ref4[2];
                    brass.triggerAttackRelease(notes, duration, now + offset, GameAudio.scale("notePythonVictory", 0.7));
                  });
                  bass.triggerAttackRelease("G2", 0.4, now + 0.5, GameAudio.scale("notePythonVictory", 0.8));
                  bass.triggerAttackRelease("C2", 0.8, now + 1, GameAudio.scale("notePythonVictory", 0.85));
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
    key: "playFinalResults",
    value: function playFinalResults() {
      if (!window.Tone) return;
      var synth = GameAudio._getPreviewSynth("finalResults", function () {
        return new Tone.PolySynth(Tone.Synth, {
          oscillator: {
            type: "sine"
          },
          envelope: {
            attack: 0.02,
            decay: 0.25,
            sustain: 0.35,
            release: 0.9
          },
          volume: GameAudio.SYNTH_VOLUME_DB.uiPoly
        }).toDestination();
      });
      var now = Tone.now();
      var variants = [function () {
        ["C4", "G4", "C5", "E5"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.9, now, GameAudio.scale("final", 0.6));
        });
        ["G5", "A5", "B5", "C6", "D6", "E6", "G6"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.08, now + 0.25 + index * 0.06, GameAudio.scale("final", 0.35));
        });
      }, function () {
        ["C5", "E5", "G5", "B5", "D6", "G6"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.11, now + index * 0.08, GameAudio.scale("final", 0.44));
        });
        ["C6", "E6", "G6"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.28, now + 0.62, GameAudio.scale("final", 0.5));
        });
      }, function () {
        ["A3", "E4", "A4", "C5"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.45, now, GameAudio.scale("final", 0.45));
        });
        ["F4", "A4", "C5", "F5"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.52, now + 0.35, GameAudio.scale("final", 0.48));
        });
        ["C5", "F5", "A5"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.24, now + 0.78, GameAudio.scale("final", 0.4));
        });
      }, function () {
        ["E5", "G5", "A5", "B5", "D6", "E6", "G6", "A6"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.075, now + index * 0.055, GameAudio.scale("final", 0.34));
        });
        ["A5", "A6", "C7"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.2, now + 0.52, GameAudio.scale("final", 0.42));
        });
      }, function () {
        ["D4", "A4", "D5", "F#5"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.36, now, GameAudio.scale("final", 0.45));
        });
        ["D5", "F#5", "A5", "D6", "F#6"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.095, now + 0.2 + index * 0.065, GameAudio.scale("final", 0.4));
        });
      }, function () {
        ["G3", "D4", "G4", "B4"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.4, now, GameAudio.scale("final", 0.4));
        });
        ["C4", "E4", "G4", "C5"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.44, now + 0.32, GameAudio.scale("final", 0.46));
        });
        ["E5", "G5", "C6"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.22, now + 0.72, GameAudio.scale("final", 0.4));
        });
      }, function () {
        ["C6", "D6", "E6", "G6", "A6", "G6", "E6", "C7"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.06, now + index * 0.048, GameAudio.scale("final", 0.3));
        });
        ["G6", "C7"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.2, now + 0.48, GameAudio.scale("final", 0.38));
        });
      }, function () {
        ["F4", "C5", "A5"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.16, now + index * 0.06, GameAudio.scale("final", 0.45));
        });
        ["G4", "D5", "B5"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.16, now + 0.28 + index * 0.06, GameAudio.scale("final", 0.48));
        });
        ["C5", "E5", "G5", "C6"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.26, now + 0.54, GameAudio.scale("final", 0.44));
        });
      }, function () {
        ["A6", "G6", "E6", "D6", "C6"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.08, now + index * 0.06, GameAudio.scale("final", 0.34));
        });
        ["E6", "G6", "C7"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.24, now + 0.4, GameAudio.scale("final", 0.42));
        });
      }, function () {
        ["C4", "E4", "G4", "C5"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.34, now, GameAudio.scale("final", 0.48));
        });
        ["E5", "G5", "B5", "D6", "E6"].forEach(function (note, index) {
          synth.triggerAttackRelease(note, 0.09, now + 0.18 + index * 0.055, GameAudio.scale("final", 0.38));
        });
        ["C6", "E6", "G6", "C7"].forEach(function (note) {
          return synth.triggerAttackRelease(note, 0.3, now + 0.58, GameAudio.scale("final", 0.5));
        });
      }];
      variants[Math.floor(Math.random() * variants.length)]();
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
  hinge: 0.55,
  notePythonMelody: 1,
  notePythonLowEnd: 1,
  notePythonDrums: 1,
  notePythonVictory: 1
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
}, {
  id: "notePythonMelody",
  label: "Note Python Melody",
  volumeKey: "notePythonMelody",
  description: "Lead melody and fast arpeggios in the Note Python soundtrack."
}, {
  id: "notePythonLowEnd",
  label: "Note Python Bass & Chords",
  volumeKey: "notePythonLowEnd",
  description: "Bass line and low harmony in the Note Python soundtrack."
}, {
  id: "notePythonDrums",
  label: "Note Python Drums",
  volumeKey: "notePythonDrums",
  description: "Kick, snare, and hi-hat layers in the Note Python soundtrack."
}, {
  id: "notePythonVictory",
  label: "Note Python Victory",
  volumeKey: "notePythonVictory",
  description: "Majestic fanfare at the end of a Note Python game."
}]);
_defineProperty(GameAudio, "_previewSynths", {});

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
/*!**************************************************!*\
  !*** ./resources/js/music/admin-soundeffects.js ***!
  \**************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _admin_GameAudioAdminPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./admin/GameAudioAdminPage.js */ "./resources/js/music/admin/GameAudioAdminPage.js");

new _admin_GameAudioAdminPage_js__WEBPACK_IMPORTED_MODULE_0__.GameAudioAdminPage().init();
})();

/******/ })()
;