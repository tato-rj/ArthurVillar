/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/music/games/beathero/BeatHero.js"
/*!*******************************************************!*\
  !*** ./resources/js/music/games/beathero/BeatHero.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BeatHero: () => (/* binding */ BeatHero)
/* harmony export */ });
/* harmony import */ var _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var BeatHero = /*#__PURE__*/function () {
  function BeatHero() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BeatHero);
    this.opts = _objectSpread({
      wrapperSelector: "#game-wrapper",
      previewSelector: "#preview-score",
      tapSelector: "#tap-wrapper"
    }, options);
    this._resizeHandler = null;
    this._timeSignature = this._pickTimeSignature();
    this._bpm = this._normalizeBpm(this.opts.bpm);
    this._includeRests = this._normalizeBoolOption(this.opts.includeRests);
    this._enabledNoteValues = this._normalizeNoteOptions(this.opts.notesValues || this.opts.notes);
    this._numOfMeasures = this._normalizeMeasureCount(this.opts.numOfMeasures);
    this._measures = [];
    this._rhythm = [];
    this._previewRhythm = null;
    this._activeMeasureNumber = 1;
    this._metronomeInterval = null;
    this._metronomeStartTimeout = null;
    this._rhythmAnimationTimeouts = [];
    this._rhythmHighlightTimeouts = [];
    this._metronomeTickIndex = 0;
    this._rhythmPlaybackStarted = false;
    this._metronomeAudioReady = false;
    this._metronomeIsStarting = false;
    this._rhythmStartTime = null;
    this._tapEvents = [];
    this._tapWindowMs = 120;
    this._voiceAudioContext = null;
    this._voiceAnalyser = null;
    this._voiceData = null;
    this._voiceStream = null;
    this._voiceFrame = null;
    this._voiceBaseline = 0.02;
    this._voiceIsActive = false;
    this._voiceInputStarting = false;
    this._lastVoiceTapTime = 0;
    this.$playWrap = null;
    this.$playPlayBtn = null;
    this.$playStopBtn = null;
    this._resetMeasureQueue();
  }
  return _createClass(BeatHero, [{
    key: "start",
    value: function start() {
      var _this = this;
      this.renderChallenge();
      this._showInitialControls();
      this._wirePlayControls();
      this._wireTapControls();
      if (!this._resizeHandler) {
        this._resizeHandler = function () {
          return _this.renderChallenge();
        };
        window.addEventListener("resize", this._resizeHandler);
      }
    }
  }, {
    key: "renderChallenge",
    value: function renderChallenge() {
      var wrapper = document.querySelector(this.opts.wrapperSelector);
      var previewWrapper = document.querySelector(this.opts.previewSelector);
      if (!wrapper && !previewWrapper) return;
      this._setPreviewWrapperVisible(Boolean(this._previewRhythm));
      if (this._previewRhythm) {
        this._renderRhythmMeasure({
          wrapper: previewWrapper,
          rhythm: this._previewRhythm,
          showClef: false,
          showTimeSignature: false,
          showBarlines: false,
          isFinalMeasure: this._activeMeasureNumber + 1 >= this._numOfMeasures
        });
      } else {
        this._clearRhythmMeasure(previewWrapper);
      }
      this._renderRhythmMeasure({
        wrapper: wrapper,
        rhythm: this._rhythm,
        showTimeSignature: this._activeMeasureNumber === 1,
        isFinalMeasure: this._activeMeasureNumber >= this._numOfMeasures
      });
    }
  }, {
    key: "_setPreviewWrapperVisible",
    value: function _setPreviewWrapperVisible(isVisible) {
      var previewWrapper = document.querySelector(this.opts.previewSelector);
      var previewContainer = (previewWrapper === null || previewWrapper === void 0 ? void 0 : previewWrapper.closest("#preview-wrapper")) || previewWrapper;
      if (!previewContainer) return;
      previewContainer.classList.toggle("d-none", !isVisible);
      previewContainer.style.display = isVisible ? "block" : "none";
    }
  }, {
    key: "_renderRhythmMeasure",
    value: function _renderRhythmMeasure(_ref) {
      var _window$Vex, _VF$Stem;
      var wrapper = _ref.wrapper,
        rhythm = _ref.rhythm,
        _ref$showClef = _ref.showClef,
        showClef = _ref$showClef === void 0 ? true : _ref$showClef,
        _ref$showTimeSignatur = _ref.showTimeSignature,
        showTimeSignature = _ref$showTimeSignatur === void 0 ? true : _ref$showTimeSignatur,
        _ref$showBarlines = _ref.showBarlines,
        showBarlines = _ref$showBarlines === void 0 ? true : _ref$showBarlines,
        _ref$isFinalMeasure = _ref.isFinalMeasure,
        isFinalMeasure = _ref$isFinalMeasure === void 0 ? false : _ref$isFinalMeasure;
      if (!wrapper) return;
      wrapper.innerHTML = "";
      wrapper.classList.add("beat-hero-wrapper");
      if (wrapper.matches(this.opts.wrapperSelector)) {
        var beatCount = document.createElement("div");
        beatCount.id = "beat-count";
        wrapper.appendChild(beatCount);
      }
      var VF = (_window$Vex = window.Vex) === null || _window$Vex === void 0 ? void 0 : _window$Vex.Flow;
      if (!VF) {
        wrapper.textContent = "VexFlow could not be loaded.";
        return;
      }
      var width = Math.max(1, Math.floor(wrapper.clientWidth || 1));
      var height = 190;
      var renderer = new VF.Renderer(wrapper, VF.Renderer.Backends.SVG);
      renderer.resize(width, height);
      var context = renderer.getContext();
      context.setFont("Arial", 10);
      var stave = new VF.Stave(18, 24, width - 36, {
        fill_style: "#273043",
        spacing_between_lines_px: 14
      });
      stave.setConfigForLines([{
        visible: false
      }, {
        visible: false
      }, {
        visible: true
      }, {
        visible: false
      }, {
        visible: false
      }]);
      if (showClef) stave.addClef("percussion");
      if (showTimeSignature) stave.addTimeSignature(this._timeSignatureLabel());
      if (isFinalMeasure) {
        var _stave$setEndBarType, _VF$Barline$type$END, _VF$Barline;
        (_stave$setEndBarType = stave.setEndBarType) === null || _stave$setEndBarType === void 0 || _stave$setEndBarType.call(stave, (_VF$Barline$type$END = (_VF$Barline = VF.Barline) === null || _VF$Barline === void 0 || (_VF$Barline = _VF$Barline.type) === null || _VF$Barline === void 0 ? void 0 : _VF$Barline.END) !== null && _VF$Barline$type$END !== void 0 ? _VF$Barline$type$END : 3);
      }
      stave.setContext(context).draw();
      var stemDirection = ((_VF$Stem = VF.Stem) === null || _VF$Stem === void 0 ? void 0 : _VF$Stem.UP) || 1;
      var glyphFontScale = this._rhythmNoteGlyphFontScale(wrapper);
      var notes = rhythm.map(function (duration) {
        return new VF.StaveNote({
          clef: "percussion",
          keys: ["b/4"],
          duration: duration,
          glyph_font_scale: glyphFontScale,
          stem_direction: stemDirection
        });
      });
      this._extendStems(notes, 8);
      this._removeNoteSpacing(notes);
      var beams = VF.Beam.generateBeams(notes, {
        stem_direction: stemDirection
      });
      this._drawQuarterGrid({
        VF: VF,
        context: context,
        stave: stave,
        notes: notes,
        beams: beams,
        rhythm: rhythm,
        width: width
      });
      this._alignVerticalStaveLines(wrapper);
      if (!showBarlines) this._removeVerticalStaveLines(wrapper);
      this._extendRenderedStems(wrapper, 10);
      this._moveStemTopAttachments(wrapper, 10);
    }
  }, {
    key: "_clearRhythmMeasure",
    value: function _clearRhythmMeasure(wrapper) {
      if (!wrapper) return;
      wrapper.innerHTML = "";
      wrapper.classList.add("beat-hero-wrapper");
    }
  }, {
    key: "_showInitialControls",
    value: function _showInitialControls() {
      $("#controls").show();
      $("#instructions").show();
      $("#check").show().removeClass("invisible");
      $("#continue").hide();
    }
  }, {
    key: "_wirePlayControls",
    value: function _wirePlayControls() {
      var _this2 = this;
      this.$playWrap = $("#play");
      this.$playPlayBtn = this.$playWrap.find('button[action="play"]');
      this.$playStopBtn = this.$playWrap.find('button[action="stop"]');
      this.$playPlayBtn.off("click.beatHeroMetronome").on("click.beatHeroMetronome", function (event) {
        event.preventDefault();
        _this2._startVoiceInput();
        _this2._startMetronome();
      });
      this.$playStopBtn.off("click.beatHeroMetronome").on("click.beatHeroMetronome", function (event) {
        event.preventDefault();
        _this2._stopMetronome();
      });
      this._setPlayButtons(false);
    }
  }, {
    key: "_wireTapControls",
    value: function _wireTapControls() {
      var _this3 = this;
      var tapWrapper = document.querySelector(this.opts.tapSelector);
      if (!tapWrapper) return;
      tapWrapper.addEventListener("pointerdown", function (event) {
        event.preventDefault();
        _this3._handleTap();
      });
    }
  }, {
    key: "_setPlayButtons",
    value: function _setPlayButtons(isPlaying) {
      var _this$$playPlayBtn, _this$$playStopBtn;
      if ((_this$$playPlayBtn = this.$playPlayBtn) !== null && _this$$playPlayBtn !== void 0 && _this$$playPlayBtn.length) this.$playPlayBtn.toggle(!isPlaying);
      if ((_this$$playStopBtn = this.$playStopBtn) !== null && _this$$playStopBtn !== void 0 && _this$$playStopBtn.length) this.$playStopBtn.toggle(!!isPlaying);
    }
  }, {
    key: "_startMetronome",
    value: function _startMetronome() {
      var _this4 = this;
      if (this._isMetronomeActive()) return;
      if (!window.Tone) {
        this._setPlayButtons(false);
        return;
      }
      if (this._shouldRewindMeasureQueueForPlayback()) {
        this._rewindMeasureQueue();
        this.renderChallenge();
      }
      this._setPlayButtons(true);
      this._metronomeIsStarting = true;
      this._ensureMetronomeAudio().then(function () {
        if (!_this4._metronomeIsStarting) return;
        _this4._metronomeStartTimeout = setTimeout(function () {
          if (!_this4._metronomeIsStarting) return;
          var intervalMs = 60000 / _this4._bpm;
          var playBeat = function playBeat() {
            if (_this4._shouldStopAtEndOfPiece()) {
              _this4._stopMetronome();
              return;
            }
            _this4._advanceMeasureIfNeeded();
            _this4._playMetronomeClick(_this4._isMetronomeDownbeat());
            _this4._updateBeatCount(intervalMs);
            _this4._handleMetronomeBeat(intervalMs);
            _this4._metronomeTickIndex += 1;
          };
          _this4._metronomeStartTimeout = null;
          _this4._metronomeIsStarting = false;
          _this4._metronomeTickIndex = 0;
          _this4._rhythmPlaybackStarted = false;
          playBeat();
          _this4._metronomeInterval = setInterval(playBeat, intervalMs);
        }, 1000);
      })["catch"](function () {
        _this4._metronomeIsStarting = false;
        _this4._setPlayButtons(false);
      });
    }
  }, {
    key: "_stopMetronome",
    value: function _stopMetronome() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$resetButtons = _ref2.resetButtons,
        resetButtons = _ref2$resetButtons === void 0 ? true : _ref2$resetButtons;
      if (this._metronomeStartTimeout) {
        clearTimeout(this._metronomeStartTimeout);
        this._metronomeStartTimeout = null;
      }
      if (this._metronomeInterval) {
        clearInterval(this._metronomeInterval);
        this._metronomeInterval = null;
      }
      this._metronomeIsStarting = false;
      this._clearRhythmAnimationTimeouts();
      this._clearRhythmNoteAnimations();
      this._clearBeatCount();
      this._clearTapSchedule();
      this._stopVoiceInput();
      this._metronomeTickIndex = 0;
      this._rhythmPlaybackStarted = false;
      if (resetButtons) this._setPlayButtons(false);
    }
  }, {
    key: "_ensureMetronomeAudio",
    value: function () {
      var _ensureMetronomeAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(!window.Tone || this._metronomeAudioReady)) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.n = 2;
              return _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_0__.GameAudio.ensureMetronomeAudio();
            case 2:
              this._metronomeAudioReady = true;
            case 3:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _ensureMetronomeAudio() {
        return _ensureMetronomeAudio2.apply(this, arguments);
      }
      return _ensureMetronomeAudio;
    }()
  }, {
    key: "_isMetronomeActive",
    value: function _isMetronomeActive() {
      return Boolean(this._metronomeIsStarting || this._metronomeStartTimeout || this._metronomeInterval);
    }
  }, {
    key: "_isMetronomeDownbeat",
    value: function _isMetronomeDownbeat() {
      var groupSize = Math.max(1, this._timeSignature.beats);
      return this._metronomeTickIndex % groupSize === 0;
    }
  }, {
    key: "_shouldStopAtEndOfPiece",
    value: function _shouldStopAtEndOfPiece() {
      var countInBeats = Math.max(1, this._timeSignature.beats);
      var totalMeasureBeats = this._measurePlaybackBeats() * this._numOfMeasures;
      return this._metronomeTickIndex >= countInBeats + totalMeasureBeats;
    }
  }, {
    key: "_advanceMeasureIfNeeded",
    value: function _advanceMeasureIfNeeded() {
      var countInBeats = Math.max(1, this._timeSignature.beats);
      var measureBeats = this._measurePlaybackBeats();
      if (this._metronomeTickIndex < countInBeats) return;
      var elapsedMeasureBeats = this._metronomeTickIndex - countInBeats;
      if (elapsedMeasureBeats === 0 || elapsedMeasureBeats % measureBeats !== 0) return;
      if (this._activeMeasureNumber >= this._numOfMeasures) return;
      this._promotePreviewMeasure();
    }
  }, {
    key: "_playMetronomeClick",
    value: function _playMetronomeClick() {
      var isDownbeat = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_0__.GameAudio.playMetronomeClick(isDownbeat);
    }
  }, {
    key: "_updateBeatCount",
    value: function _updateBeatCount(intervalMs) {
      var beatCount = document.querySelector("".concat(this.opts.wrapperSelector, " #beat-count"));
      if (!beatCount) return;
      var beatsPerMeasure = Math.max(1, this._timeSignature.beats);
      var count = this._metronomeTickIndex % beatsPerMeasure + 1;
      beatCount.textContent = String(count);
      beatCount.style.animationDuration = "".concat(Math.round(intervalMs), "ms");
      beatCount.classList.remove("beat-animation");
      void beatCount.offsetWidth;
      beatCount.classList.add("beat-animation");
    }
  }, {
    key: "_clearBeatCount",
    value: function _clearBeatCount() {
      var beatCount = document.querySelector("".concat(this.opts.wrapperSelector, " #beat-count"));
      if (!beatCount) return;
      beatCount.textContent = "";
      beatCount.classList.remove("beat-animation");
      beatCount.style.animationDuration = "";
    }
  }, {
    key: "_handleMetronomeBeat",
    value: function _handleMetronomeBeat(intervalMs) {
      if (this._rhythmPlaybackStarted) return;
      var countInBeats = Math.max(1, this._timeSignature.beats);
      if (this._metronomeTickIndex < countInBeats) return;
      this._rhythmPlaybackStarted = true;
      this._prepareTapSchedule(intervalMs);
    }
  }, {
    key: "_promotePreviewMeasure",
    value: function _promotePreviewMeasure() {
      if (!this._previewRhythm) return;
      this._clearRhythmAnimationTimeouts();
      this._clearRhythmNoteAnimations();
      this._clearTapSchedule();
      this._activeMeasureNumber += 1;
      this._syncCurrentMeasures();
      this._rhythmPlaybackStarted = false;
      this.renderChallenge();
    }
  }, {
    key: "_prepareTapSchedule",
    value: function _prepareTapSchedule(intervalMs) {
      var _this5 = this;
      this._clearTapSchedule();
      this._rhythmStartTime = performance.now();
      this._tapWindowMs = this._tapTimingWindow(intervalMs);
      this._tapEvents = this._rhythmPlaybackSchedule().filter(function (event) {
        return !_this5._isRestDuration(event.duration);
      }).map(function (event) {
        return _objectSpread(_objectSpread({}, event), {}, {
          time: _this5._rhythmStartTime + event.beatOffset * intervalMs,
          tapped: false
        });
      });
    }
  }, {
    key: "_clearTapSchedule",
    value: function _clearTapSchedule() {
      this._rhythmStartTime = null;
      this._tapEvents = [];
    }
  }, {
    key: "_tapTimingWindow",
    value: function _tapTimingWindow(intervalMs) {
      return Math.min(260, Math.max(130, intervalMs * 0.28));
    }
  }, {
    key: "_handleTap",
    value: function _handleTap() {
      var event = this._findMatchingTapEvent(performance.now());
      if (!event) {
        console.log("Wrong tap");
        return;
      }
      event.tapped = true;
      console.log("Good tap");
      this._animateRhythmNote(event.index);
    }
  }, {
    key: "_findMatchingTapEvent",
    value: function _findMatchingTapEvent(tapTime) {
      var availableEvents = this._tapEvents.filter(function (event) {
        return !event.tapped;
      });
      if (!availableEvents.length) return null;
      var closestEvent = availableEvents.reduce(function (closest, event) {
        var distance = Math.abs(event.time - tapTime);
        if (!closest || distance < closest.distance) return {
          event: event,
          distance: distance
        };
        return closest;
      }, null);
      if (!closestEvent || closestEvent.distance > this._tapWindowMs) return null;
      return closestEvent.event;
    }
  }, {
    key: "_startVoiceInput",
    value: function _startVoiceInput() {
      var _navigator$mediaDevic,
        _this6 = this;
      if (this._voiceIsActive || this._voiceInputStarting) return Promise.resolve();
      if (!window.isSecureContext) {
        console.warn("Beat Hero voice input needs HTTPS or localhost to request microphone access.");
        return Promise.resolve();
      }
      if (!((_navigator$mediaDevic = navigator.mediaDevices) !== null && _navigator$mediaDevic !== void 0 && _navigator$mediaDevic.getUserMedia)) {
        console.warn("Beat Hero voice input is not supported by this browser.");
        return Promise.resolve();
      }
      var AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return Promise.resolve();
      this._voiceInputStarting = true;
      return navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      }).then(function (stream) {
        if (!_this6._metronomeIsStarting && !_this6._metronomeInterval) {
          var _stream$getTracks;
          (_stream$getTracks = stream.getTracks) === null || _stream$getTracks === void 0 || _stream$getTracks.call(stream).forEach(function (track) {
            return track.stop();
          });
          _this6._voiceInputStarting = false;
          return;
        }
        _this6._voiceAudioContext = new AudioContextCtor();
        _this6._voiceStream = stream;
        var source = _this6._voiceAudioContext.createMediaStreamSource(stream);
        _this6._voiceAnalyser = _this6._voiceAudioContext.createAnalyser();
        _this6._voiceAnalyser.fftSize = 1024;
        _this6._voiceData = new Uint8Array(_this6._voiceAnalyser.fftSize);
        source.connect(_this6._voiceAnalyser);
        _this6._voiceIsActive = true;
        _this6._voiceInputStarting = false;
        _this6._listenForVoiceTaps();
      })["catch"](function () {
        _this6._voiceInputStarting = false;
      });
    }
  }, {
    key: "_stopVoiceInput",
    value: function _stopVoiceInput() {
      var _this$_voiceStream, _this$_voiceStream$ge, _this$_voiceAudioCont, _this$_voiceAudioCont2;
      if (this._voiceFrame) {
        cancelAnimationFrame(this._voiceFrame);
        this._voiceFrame = null;
      }
      (_this$_voiceStream = this._voiceStream) === null || _this$_voiceStream === void 0 || (_this$_voiceStream$ge = _this$_voiceStream.getTracks) === null || _this$_voiceStream$ge === void 0 || _this$_voiceStream$ge.call(_this$_voiceStream).forEach(function (track) {
        return track.stop();
      });
      (_this$_voiceAudioCont = this._voiceAudioContext) === null || _this$_voiceAudioCont === void 0 || (_this$_voiceAudioCont2 = _this$_voiceAudioCont.close) === null || _this$_voiceAudioCont2 === void 0 || _this$_voiceAudioCont2.call(_this$_voiceAudioCont);
      this._voiceAudioContext = null;
      this._voiceAnalyser = null;
      this._voiceData = null;
      this._voiceStream = null;
      this._voiceBaseline = 0.02;
      this._voiceIsActive = false;
      this._voiceInputStarting = false;
      this._lastVoiceTapTime = 0;
    }
  }, {
    key: "_listenForVoiceTaps",
    value: function _listenForVoiceTaps() {
      var _this7 = this;
      if (!this._voiceAnalyser || !this._voiceData) return;
      this._voiceAnalyser.getByteTimeDomainData(this._voiceData);
      var level = this._voiceInputLevel(this._voiceData);
      var now = performance.now();
      var threshold = Math.max(0.09, this._voiceBaseline * 3.2);
      this._voiceBaseline = this._voiceBaseline * 0.96 + Math.min(level, 0.18) * 0.04;
      if (level > threshold && now - this._lastVoiceTapTime > 180) {
        this._lastVoiceTapTime = now;
        this._handleTap();
      }
      this._voiceFrame = requestAnimationFrame(function () {
        return _this7._listenForVoiceTaps();
      });
    }
  }, {
    key: "_voiceInputLevel",
    value: function _voiceInputLevel(data) {
      var sum = 0;
      data.forEach(function (value) {
        var centered = (value - 128) / 128;
        sum += centered * centered;
      });
      return Math.sqrt(sum / data.length);
    }
  }, {
    key: "_scheduleRhythmAnimations",
    value: function _scheduleRhythmAnimations(intervalMs) {
      var _this8 = this;
      this._clearRhythmAnimationTimeouts();
      this._rhythmPlaybackSchedule().forEach(function (event) {
        var timeout = setTimeout(function () {
          _this8._animateRhythmNote(event.index);
        }, event.beatOffset * intervalMs);
        _this8._rhythmAnimationTimeouts.push(timeout);
      });
    }
  }, {
    key: "_rhythmPlaybackSchedule",
    value: function _rhythmPlaybackSchedule() {
      var _this9 = this;
      var beatOffset = 0;
      return this._rhythm.map(function (duration, index) {
        var event = {
          index: index,
          beatOffset: beatOffset,
          duration: duration
        };
        beatOffset += _this9._durationToBeatBlocks(duration);
        return event;
      });
    }
  }, {
    key: "_clearRhythmAnimationTimeouts",
    value: function _clearRhythmAnimationTimeouts() {
      this._rhythmAnimationTimeouts.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
      this._rhythmAnimationTimeouts = [];
      this._rhythmHighlightTimeouts.forEach(function (timeout) {
        return clearTimeout(timeout);
      });
      this._rhythmHighlightTimeouts = [];
    }
  }, {
    key: "_clearRhythmNoteAnimations",
    value: function _clearRhythmNoteAnimations() {
      var _this0 = this;
      var wrapper = document.querySelector(this.opts.wrapperSelector);
      wrapper === null || wrapper === void 0 || wrapper.querySelectorAll(".vf-notehead.beat-hero-highlight, .vf-notehead.pulsate").forEach(function (notehead) {
        _this0._setNoteheadHighlight(notehead, false);
      });
    }
  }, {
    key: "_animateRhythmNote",
    value: function _animateRhythmNote(index) {
      var _wrapper$querySelecto,
        _this1 = this;
      var wrapper = document.querySelector(this.opts.wrapperSelector);
      var note = wrapper === null || wrapper === void 0 || (_wrapper$querySelecto = wrapper.querySelectorAll(".vf-stavenote")) === null || _wrapper$querySelecto === void 0 ? void 0 : _wrapper$querySelecto[index];
      var notehead = note === null || note === void 0 ? void 0 : note.querySelector(".vf-notehead");
      if (!notehead) return;
      this._setNoteheadHighlight(notehead, true);
      _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_0__.GameAudio.playRhythmHit();
      var timeout = setTimeout(function () {
        _this1._setNoteheadHighlight(notehead, false);
      }, 200);
      this._rhythmHighlightTimeouts.push(timeout);
    }
  }, {
    key: "_setNoteheadHighlight",
    value: function _setNoteheadHighlight(notehead, isHighlighted) {
      var paths = [notehead].concat(_toConsumableArray(notehead.querySelectorAll("path")));
      notehead.classList.toggle("beat-hero-highlight", isHighlighted);
      notehead.classList.toggle("pulsate", isHighlighted);
      paths.forEach(function (element) {
        if (isHighlighted) {
          element.style.fill = "#1cb0f6";
          element.style.stroke = "#1cb0f6";
        } else {
          element.style.fill = "";
          element.style.stroke = "";
        }
      });
    }
  }, {
    key: "_drawRhythmWithFormatter",
    value: function _drawRhythmWithFormatter(_ref3) {
      var VF = _ref3.VF,
        context = _ref3.context,
        stave = _ref3.stave,
        notes = _ref3.notes,
        beams = _ref3.beams,
        width = _ref3.width;
      var voice = new VF.Voice({
        num_beats: this._timeSignature.beats,
        beat_value: this._timeSignature.beatValue
      });
      voice.addTickables(notes);
      var formatter = new VF.Formatter();
      formatter.joinVoices([voice]);
      if (formatter.createTickContexts && formatter.preFormat) {
        var _formatter$getTickCon, _formatter$postFormat;
        formatter.createTickContexts([voice]);
        this._setTickContextPadding((_formatter$getTickCon = formatter.getTickContexts) === null || _formatter$getTickCon === void 0 ? void 0 : _formatter$getTickCon.call(formatter), 0);
        formatter.preFormat(width - 170, context, [voice], stave);
        (_formatter$postFormat = formatter.postFormat) === null || _formatter$postFormat === void 0 || _formatter$postFormat.call(formatter);
      } else {
        var _formatter$getTickCon2;
        formatter.format([voice], width - 170);
        this._setTickContextPadding((_formatter$getTickCon2 = formatter.getTickContexts) === null || _formatter$getTickCon2 === void 0 ? void 0 : _formatter$getTickCon2.call(formatter), 0);
      }
      voice.draw(context, stave);
      beams.forEach(function (beam) {
        beam.setContext(context).draw();
      });
    }
  }, {
    key: "_drawQuarterGrid",
    value: function _drawQuarterGrid(_ref4) {
      var _this10 = this;
      var VF = _ref4.VF,
        context = _ref4.context,
        stave = _ref4.stave,
        notes = _ref4.notes,
        beams = _ref4.beams,
        rhythm = _ref4.rhythm,
        width = _ref4.width;
      var firstNoteX = 0;
      var finalBarlineX = width - 16;
      var beatCount = Math.max(1, this._timeSignature.beats);
      var beatCursor = 0;
      var firstStemX = null;
      notes.forEach(function (note, index) {
        var tickContext = new VF.TickContext();
        tickContext.addTickable(note).preFormat();
        tickContext.setX(firstNoteX);
        note.setContext(context);
        note.setStave(stave);
        if (firstStemX === null) {
          var _note$getStemX;
          firstStemX = (_note$getStemX = note.getStemX) === null || _note$getStemX === void 0 ? void 0 : _note$getStemX.call(note);
        }
        var noteOffset = Number.isFinite(firstStemX) ? firstStemX : 0;
        var division = Math.max(0, (finalBarlineX - noteOffset) / beatCount);
        tickContext.setX(firstNoteX + beatCursor * division);
        note.draw();
        beatCursor += _this10._durationToBeatBlocks(rhythm[index]);
      });
      beams.forEach(function (beam) {
        beam.setContext(context).draw();
      });
    }
  }, {
    key: "_removeNoteSpacing",
    value: function _removeNoteSpacing(notes) {
      notes.forEach(function (note) {
        var _note$setExtraLeftPx, _note$setExtraRightPx;
        (_note$setExtraLeftPx = note.setExtraLeftPx) === null || _note$setExtraLeftPx === void 0 || _note$setExtraLeftPx.call(note, 0);
        (_note$setExtraRightPx = note.setExtraRightPx) === null || _note$setExtraRightPx === void 0 || _note$setExtraRightPx.call(note, 0);
      });
    }
  }, {
    key: "_setTickContextPadding",
    value: function _setTickContextPadding(tickContexts, padding) {
      if (!tickContexts) return;
      var contexts = tickContexts instanceof Map ? _toConsumableArray(tickContexts.values()) : Object.values(tickContexts);
      contexts.forEach(function (tickContext) {
        var _tickContext$setPaddi;
        tickContext === null || tickContext === void 0 || (_tickContext$setPaddi = tickContext.setPadding) === null || _tickContext$setPaddi === void 0 || _tickContext$setPaddi.call(tickContext, padding);
      });
    }
  }, {
    key: "_alignVerticalStaveLines",
    value: function _alignVerticalStaveLines(wrapper) {
      var barlines = wrapper.querySelectorAll("svg rect");
      var finalBarline = barlines[barlines.length - 1];
      if (!finalBarline) return;
      var x = parseFloat(finalBarline.getAttribute("x"));
      if (Number.isFinite(x)) finalBarline.setAttribute("x", String(x + 2));
    }
  }, {
    key: "_removeVerticalStaveLines",
    value: function _removeVerticalStaveLines(wrapper) {
      wrapper.querySelectorAll("svg rect").forEach(function (rect) {
        return rect.remove();
      });
    }
  }, {
    key: "_extendStems",
    value: function _extendStems(notes, extension) {
      notes.forEach(function (note) {
        var _note$getStem, _stem$setExtension;
        var stem = (_note$getStem = note.getStem) === null || _note$getStem === void 0 ? void 0 : _note$getStem.call(note);
        stem === null || stem === void 0 || (_stem$setExtension = stem.setExtension) === null || _stem$setExtension === void 0 || _stem$setExtension.call(stem, extension);
      });
    }
  }, {
    key: "_extendRenderedStems",
    value: function _extendRenderedStems(wrapper, extension) {
      wrapper.querySelectorAll(".vf-stem path").forEach(function (path) {
        var d = path.getAttribute("d") || "";
        var match = d.match(/^M([\d.-]+) ([\d.-]+)L([\d.-]+) ([\d.-]+)$/);
        if (!match) return;
        var _match = _slicedToArray(match, 5),
          startX = _match[1],
          startY = _match[2],
          endX = _match[3],
          endY = _match[4];
        var stemTop = parseFloat(endY);
        if (!Number.isFinite(stemTop)) return;
        path.setAttribute("d", "M".concat(startX, " ").concat(startY, "L").concat(endX, " ").concat(stemTop - extension));
      });
    }
  }, {
    key: "_moveStemTopAttachments",
    value: function _moveStemTopAttachments(wrapper, extension) {
      wrapper.querySelectorAll(".vf-flag, .vf-beam").forEach(function (element) {
        var transform = element.getAttribute("transform") || "";
        element.setAttribute("transform", "".concat(transform, " translate(0 -").concat(extension, ")").trim());
      });
      this._moveUnclassifiedEighthFlags(wrapper, 4.5);
    }
  }, {
    key: "_moveUnclassifiedEighthFlags",
    value: function _moveUnclassifiedEighthFlags(wrapper, extension) {
      wrapper.querySelectorAll("svg path").forEach(function (path) {
        if (path.getAttribute("class")) return;
        var d = path.getAttribute("d") || "";
        var match = d.match(/^M([\d.-]+) ([\d.-]+)/);
        if (!match || !d.includes("C") || !d.includes("L")) return;
        var _match2 = _slicedToArray(match, 2),
          startX = _match2[1];
        if (parseFloat(startX) < 80) return;
        var transform = path.getAttribute("transform") || "";
        path.setAttribute("transform", "".concat(transform, " translate(0 -").concat(extension, ")").trim());
      });
    }
  }, {
    key: "_rhythmNoteGlyphFontScale",
    value: function _rhythmNoteGlyphFontScale(wrapper) {
      var styles = getComputedStyle(wrapper);
      var noteWidth = this._pxFromCssVar(styles, "--note-width", 28);
      var noteHeight = this._pxFromCssVar(styles, "--note-height", 22);
      return Math.round(Math.max(noteWidth * 2, noteHeight * 2.55));
    }
  }, {
    key: "_pxFromCssVar",
    value: function _pxFromCssVar(styles, name, fallback) {
      var value = parseFloat(styles.getPropertyValue(name));
      return Number.isFinite(value) ? value : fallback;
    }
  }, {
    key: "_timeSignatureLabel",
    value: function _timeSignatureLabel() {
      return "".concat(this._timeSignature.beats, "/").concat(this._timeSignature.beatValue);
    }
  }, {
    key: "_measureBeatBlocks",
    value: function _measureBeatBlocks() {
      return this._timeSignature.beats * (4 / this._timeSignature.beatValue);
    }
  }, {
    key: "_measurePlaybackBeats",
    value: function _measurePlaybackBeats() {
      return Math.max(1, this._timeSignature.beats);
    }
  }, {
    key: "_durationToBeatBlocks",
    value: function _durationToBeatBlocks(duration) {
      var noteDuration = this._durationWithoutRest(duration);
      return {
        w: 4,
        h: 2,
        q: 1,
        8: 0.5
      }[noteDuration] || 1;
    }
  }, {
    key: "_durationWithoutRest",
    value: function _durationWithoutRest(duration) {
      return String(duration || "").replace(/r$/, "");
    }
  }, {
    key: "_isRestDuration",
    value: function _isRestDuration(duration) {
      return String(duration || "").endsWith("r");
    }
  }, {
    key: "_maybeRestDuration",
    value: function _maybeRestDuration(duration) {
      if (!this._includeRests || Math.random() < 0.5) return duration;
      return "".concat(duration, "r");
    }
  }, {
    key: "_normalizeBoolOption",
    value: function _normalizeBoolOption(value) {
      return value === true || value === 1 || value === "1" || value === "true";
    }
  }, {
    key: "_normalizeBpm",
    value: function _normalizeBpm(value) {
      var bpm = Number(value);
      if (!Number.isFinite(bpm) || bpm <= 0) return 80;
      return bpm;
    }
  }, {
    key: "_normalizeMeasureCount",
    value: function _normalizeMeasureCount(value) {
      var count = Number(value);
      if (!Number.isInteger(count) || count <= 0) return 1;
      return count;
    }
  }, {
    key: "_resetMeasureQueue",
    value: function _resetMeasureQueue() {
      var _this11 = this;
      this._activeMeasureNumber = 1;
      this._measures = Array.from({
        length: this._numOfMeasures
      }, function () {
        return _this11._makeRandomRhythm();
      });
      this._syncCurrentMeasures();
    }
  }, {
    key: "_rewindMeasureQueue",
    value: function _rewindMeasureQueue() {
      if (!this._measures.length) {
        this._resetMeasureQueue();
        return;
      }
      this._activeMeasureNumber = 1;
      this._syncCurrentMeasures();
    }
  }, {
    key: "_syncCurrentMeasures",
    value: function _syncCurrentMeasures() {
      var currentIndex = Math.max(0, this._activeMeasureNumber - 1);
      this._rhythm = this._measures[currentIndex] || [];
      this._previewRhythm = this._measures[currentIndex + 1] || null;
    }
  }, {
    key: "_shouldRewindMeasureQueueForPlayback",
    value: function _shouldRewindMeasureQueueForPlayback() {
      return this._activeMeasureNumber > 1 || !this._rhythm.length;
    }
  }, {
    key: "_pickTimeSignature",
    value: function _pickTimeSignature() {
      var signatures = this._normalizeTimeSignatures(this.opts.timeSignatures || this.opts.timeSignatues);
      return signatures[Math.floor(Math.random() * signatures.length)];
    }
  }, {
    key: "_normalizeTimeSignatures",
    value: function _normalizeTimeSignatures(timeSignatures) {
      var _this12 = this;
      var values = Array.isArray(timeSignatures) && timeSignatures.length ? timeSignatures : ["4/4"];
      var normalized = values.map(function (value) {
        return _this12._parseTimeSignature(value);
      }).filter(Boolean);
      return normalized.length ? normalized : [{
        beats: 4,
        beatValue: 4
      }];
    }
  }, {
    key: "_parseTimeSignature",
    value: function _parseTimeSignature(value) {
      var match = String(value || "").trim().match(/^(\d+)\s*\/\s*(\d+)$/);
      if (!match) return null;
      var beats = Number(match[1]);
      var beatValue = Number(match[2]);
      if (!Number.isInteger(beats) || !Number.isInteger(beatValue)) return null;
      if (beats <= 0 || beatValue <= 0) return null;
      return {
        beats: beats,
        beatValue: beatValue
      };
    }
  }, {
    key: "_normalizeNoteOptions",
    value: function _normalizeNoteOptions(notes) {
      var aliases = {
        whole: "whole",
        w: "whole",
        half: "half",
        h: "half",
        quarter: "quarter",
        q: "quarter",
        eigth: "eighth",
        eighth: "eighth",
        eight: "eighth",
        "8": "eighth"
      };
      var values = Array.isArray(notes) && notes.length ? notes : ["whole", "half", "quarter", "eighth"];
      var normalized = values.map(function (note) {
        return aliases[String(note).toLowerCase()];
      }).filter(Boolean);
      return new Set(normalized.length ? normalized : ["quarter"]);
    }
  }, {
    key: "_makeRandomRhythm",
    value: function _makeRandomRhythm() {
      var _this13 = this;
      var rhythm = [];
      var rhythmCells = this._rhythmCellsForEnabledNotes();
      var beatsRemaining = this._measureBeatBlocks();
      var previousHadEighths = false;
      while (beatsRemaining > 0) {
        var fittingChoices = rhythmCells.filter(function (cell) {
          return cell.beats <= beatsRemaining && _this13._canCompleteRhythm(beatsRemaining - cell.beats, rhythmCells);
        });
        var separatedChoices = fittingChoices.filter(function (cell) {
          return !(previousHadEighths && cell.hasEighths);
        });
        var safeChoices = separatedChoices.length ? separatedChoices : fittingChoices;
        if (!safeChoices.length) {
          rhythm.push(this._maybeRestDuration("q"));
          beatsRemaining -= 1;
          previousHadEighths = false;
          continue;
        }
        var cell = safeChoices[Math.floor(Math.random() * safeChoices.length)];
        rhythm.push.apply(rhythm, _toConsumableArray(cell.durations.map(function (duration) {
          return _this13._maybeRestDuration(duration);
        })));
        beatsRemaining -= cell.beats;
        previousHadEighths = cell.hasEighths;
      }
      return rhythm;
    }
  }, {
    key: "_canCompleteRhythm",
    value: function _canCompleteRhythm(beatsRemaining, rhythmCells) {
      var _this14 = this;
      if (beatsRemaining === 0) return true;
      if (beatsRemaining < 0) return false;
      return rhythmCells.some(function (cell) {
        return cell.beats <= beatsRemaining && _this14._canCompleteRhythm(beatsRemaining - cell.beats, rhythmCells);
      });
    }
  }, {
    key: "_rhythmCellsForEnabledNotes",
    value: function _rhythmCellsForEnabledNotes() {
      var enabled = this._enabledNoteValues;
      var cells = [];
      if (enabled.has("whole")) {
        cells.push({
          durations: ["w"],
          beats: 4,
          hasEighths: false
        });
      }
      if (enabled.has("half")) {
        cells.push({
          durations: ["h"],
          beats: 2,
          hasEighths: false
        });
      }
      if (enabled.has("quarter")) {
        cells.push({
          durations: ["q"],
          beats: 1,
          hasEighths: false
        });
      }
      if (enabled.has("eighth")) {
        cells.push({
          durations: ["8", "8"],
          beats: 1,
          hasEighths: true
        });
      }
      if (enabled.has("eighth") && enabled.has("quarter")) {
        cells.push({
          durations: ["8", "q", "8"],
          beats: 2,
          hasEighths: true
        });
      }
      return cells.length ? cells : [{
        durations: ["q"],
        beats: 1,
        hasEighths: false
      }];
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
  !*** ./resources/js/music/games/beathero.js ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _beathero_BeatHero_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./beathero/BeatHero.js */ "./resources/js/music/games/beathero/BeatHero.js");
var _game$start;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var options = readGlobal("__challengeOptions") || {};
var clefUrls = readGlobal("__clefUrls") || null;
var game = new _beathero_BeatHero_js__WEBPACK_IMPORTED_MODULE_0__.BeatHero(_objectSpread(_objectSpread({}, options), {}, {
  clefUrls: clefUrls
}));
(_game$start = game.start) === null || _game$start === void 0 ? void 0 : _game$start.call(game);
})();

/******/ })()
;