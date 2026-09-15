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
/* harmony import */ var _shared_finalResults_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/finalResults.js */ "./resources/js/music/games/shared/finalResults.js");
/* harmony import */ var _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/GameAudio.js */ "./resources/js/music/games/shared/GameAudio.js");
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
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var BeatHero = /*#__PURE__*/function () {
  function BeatHero() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BeatHero);
    this.opts = _objectSpread({
      wrapperSelector: "#rhythm-card-grid",
      dotsSelector: "#sequence-dots",
      statusSelector: "#sequence-status",
      numOfChallenges: 4,
      bpm: 80,
      practiceMode: false,
      figures: BeatHero.DEFAULT_FIGURE_IDS,
      sound: true
    }, options);
    this.opts.numOfChallenges = this._normalizeChallengeCount(this.opts.numOfChallenges);
    this.opts.bpm = this._normalizeBpm(this.opts.bpm);
    this.opts.practiceMode = this._normalizeBool(this.opts.practiceMode);
    this.opts.figures = this._normalizeFigureIds(this.opts.figures);
    this.opts.sound = this._normalizeBool(this.opts.sound);
    this.$grid = $(this.opts.wrapperSelector);
    this.$dots = $(this.opts.dotsSelector);
    this.$status = $(this.opts.statusSelector);
    this.$playWrap = $("#play");
    this.$playBtn = this.$playWrap.find('button[action="play"]');
    this.$stopBtn = this.$playWrap.find('button[action="stop"]');
    this.$continueWrap = $("#continue");
    this.$continueBtn = this.$continueWrap.find("button");
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$points = $("#points");
    this.$increment = $("#increment");
    this.$finalOverlay = $("#final-overlay");
    this._cards = [];
    this._answer = [];
    this._selection = [];
    this._round = 1;
    this._roundHadMistake = false;
    this._madeAnyMistake = false;
    this._state = "ready";
    this._inputLocked = false;
    this._pointsValue = 0;
    this._correctTaps = 0;
    this._wrongTaps = 0;
    this._startedAt = Date.now();
    this._timers = new Set();
    this._rhythmSynth = null;
    this._uiSynth = null;
    this._uiNoise = null;
    this._audioReady = false;
  }
  return _createClass(BeatHero, [{
    key: "start",
    value: function start() {
      if (!this.$grid.length) return;
      this._wireControls();
      this._wireFigurePicker();
      this._resetGameUi();
      this._startRound();
    }
  }, {
    key: "_wireControls",
    value: function _wireControls() {
      var _this = this;
      this.$playBtn.off("click.beatHero").on("click.beatHero", function (event) {
        event.preventDefault();
        _this._playChallenge();
      });
      this.$stopBtn.off("click.beatHero").on("click.beatHero", function (event) {
        event.preventDefault();
        _this._stopChallenge();
      });
      this.$grid.off("click.beatHero", ".rhythm-card").on("click.beatHero", ".rhythm-card", function (event) {
        event.preventDefault();
        _this._handleCardTap(event.currentTarget);
      });
      this.$continueBtn.off("click.beatHero").on("click.beatHero", function (event) {
        event.preventDefault();
        _this._continue();
      });
    }
  }, {
    key: "_wireFigurePicker",
    value: function _wireFigurePicker() {
      var _this2 = this;
      var picker = document.querySelector("[data-beat-hero-symbol-picker]");
      if (!picker) return;
      var checkboxes = _toConsumableArray(picker.querySelectorAll(".beat-hero-symbol-input"));
      var message = document.querySelector("[data-beat-hero-symbol-message]");
      var form = picker.closest("form");
      picker.querySelectorAll("[data-beat-hero-figure-thumbnail]").forEach(function (thumbnail) {
        var figure = BeatHero.FIGURES.find(function (item) {
          return item.id === thumbnail.dataset.beatHeroFigureThumbnail;
        });
        if (figure) thumbnail.innerHTML = _this2._figureSvg(figure);
      });
      var selectedCount = function selectedCount() {
        return checkboxes.filter(function (checkbox) {
          return checkbox.checked;
        }).length;
      };
      var showCount = function showCount() {
        var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        if (!message) return;
        message.classList.toggle("is-error", Boolean(error));
        message.textContent = error || "".concat(selectedCount(), " selected");
      };
      checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
          var count = selectedCount();
          if (count < 2) {
            checkbox.checked = true;
            showCount("Choose at least 2 symbols.");
            return;
          }
          if (count > 4) {
            checkbox.checked = false;
            showCount("Choose no more than 4 symbols.");
            return;
          }
          showCount();
        });
      });
      form === null || form === void 0 || form.addEventListener("submit", function (event) {
        var count = selectedCount();
        if (count >= 2 && count <= 4) return;
        event.preventDefault();
        showCount("Choose between 2 and 4 symbols.");
      });
      showCount();
    }
  }, {
    key: "_resetGameUi",
    value: function _resetGameUi() {
      this._round = 1;
      this._pointsValue = 0;
      this._correctTaps = 0;
      this._wrongTaps = 0;
      this._madeAnyMistake = false;
      this._startedAt = Date.now();
      $("#timer").hide();
      $("#feedback-success").hide();
      $("#check, #help, #skip").hide();
      $("#controls").show();
      this.$finalOverlay.hide();
      this.$continueWrap.hide();
      this.$points.text("0");
      this.$increment.css("opacity", 0);
      this.$progressBar.data("progress", 0).css("width", "0%");
      this.$progressCounter.text(this.opts.practiceMode ? "Practice" : "0 of ".concat(this.opts.numOfChallenges));
      this._setPlayButtons(false);
    }
  }, {
    key: "_startRound",
    value: function _startRound() {
      var _this3 = this;
      this._cancelTimers();
      this._state = "ready";
      this._inputLocked = false;
      this._selection = [];
      this._roundHadMistake = false;
      this.$continueWrap.hide();
      var pool = BeatHero.FIGURES.filter(function (figure) {
        return _this3.opts.figures.includes(figure.id);
      });
      var cards = [];
      while (cards.length < 8) {
        cards.push.apply(cards, _toConsumableArray(this._shuffle(pool)));
      }
      this._cards = this._shuffle(cards.slice(0, 8));
      this._answer = this._shuffle(pool).slice(0, 2);
      this._renderCards();
      this._resetDots();
      this._setStatus("Press Play, listen to the two rhythms, then tap their cards in the same order.");
      this._setPlayButtons(false);
    }
  }, {
    key: "_renderCards",
    value: function _renderCards() {
      var _this4 = this;
      var html = this._cards.map(function (figure, index) {
        return "\n      <button\n        type=\"button\"\n        class=\"rhythm-card\"\n        data-figure-id=\"".concat(figure.id, "\"\n        aria-label=\"Card ").concat(index + 1, ": ").concat(figure.label, "\"\n      >\n        <span class=\"rhythm-card__number\" aria-hidden=\"true\"></span>\n        <span class=\"rhythm-card__figure\" aria-hidden=\"true\">\n          ").concat(_this4._figureSvg(figure), "\n        </span>\n      </button>\n    ");
      }).join("");
      this.$grid.html(html);
    }
  }, {
    key: "_figureSvg",
    value: function _figureSvg(figure) {
      var notes = figure.notes || [];
      var positions = this._notePositions(notes.length);
      var stemTop = 27;
      var headY = 69;
      var heads = notes.map(function (note, index) {
        var x = positions[index];
        var dot = note.dotted ? "<circle class=\"rhythm-note-dot\" cx=\"".concat(x + 14, "\" cy=\"66\" r=\"2.6\"></circle>") : "";
        return "\n        <ellipse class=\"rhythm-note-head\" cx=\"".concat(x, "\" cy=\"").concat(headY, "\" rx=\"8\" ry=\"5.7\" transform=\"rotate(-20 ").concat(x, " ").concat(headY, ")\"></ellipse>\n        <line class=\"rhythm-note-stem\" x1=\"").concat(x + 6, "\" y1=\"").concat(headY - 2, "\" x2=\"").concat(x + 6, "\" y2=\"").concat(stemTop, "\"></line>\n        ").concat(dot, "\n      ");
      }).join("");
      var beamed = notes.length > 1 ? this._beamSvg(notes, positions, stemTop) : this._flagSvg(notes[0], positions[0], stemTop);
      return "\n      <svg viewBox=\"0 0 100 100\" role=\"presentation\" focusable=\"false\">\n        ".concat(heads, "\n        ").concat(beamed, "\n      </svg>\n    ");
    }
  }, {
    key: "_beamSvg",
    value: function _beamSvg(notes, positions, stemTop) {
      var stems = positions.map(function (x) {
        return x + 6;
      });
      var first = stems[0];
      var last = stems[stems.length - 1];
      var mainBeam = "<line class=\"rhythm-note-beam\" x1=\"".concat(first, "\" y1=\"").concat(stemTop, "\" x2=\"").concat(last, "\" y2=\"").concat(stemTop, "\"></line>");
      var sixteenthIndexes = notes.map(function (note, index) {
        return note.value === 16 ? index : -1;
      }).filter(function (index) {
        return index >= 0;
      });
      var secondary = [];
      var cursor = 0;
      while (cursor < sixteenthIndexes.length) {
        var group = [sixteenthIndexes[cursor]];
        while (cursor + 1 < sixteenthIndexes.length && sixteenthIndexes[cursor + 1] === sixteenthIndexes[cursor] + 1) {
          cursor += 1;
          group.push(sixteenthIndexes[cursor]);
        }
        if (group.length > 1) {
          secondary.push("<line class=\"rhythm-note-beam rhythm-note-beam--secondary\" x1=\"".concat(stems[group[0]], "\" y1=\"").concat(stemTop + 10, "\" x2=\"").concat(stems[group[group.length - 1]], "\" y2=\"").concat(stemTop + 10, "\"></line>"));
        } else {
          var index = group[0];
          var pointsLeft = index === notes.length - 1;
          secondary.push("<line class=\"rhythm-note-beam rhythm-note-beam--secondary\" x1=\"".concat(stems[index], "\" y1=\"").concat(stemTop + 10, "\" x2=\"").concat(stems[index] + (pointsLeft ? -11 : 11), "\" y2=\"").concat(stemTop + 10, "\"></line>"));
        }
        cursor += 1;
      }
      return "".concat(mainBeam).concat(secondary.join(""));
    }
  }, {
    key: "_flagSvg",
    value: function _flagSvg(note, x, stemTop) {
      if (!note || note.value < 8) return "";
      var stemX = x + 6;
      return "<path class=\"rhythm-note-flag\" d=\"M ".concat(stemX, " ").concat(stemTop, " C ").concat(stemX + 17, " ").concat(stemTop + 5, ", ").concat(stemX + 16, " ").concat(stemTop + 18, ", ").concat(stemX + 7, " ").concat(stemTop + 24, "\"></path>");
    }
  }, {
    key: "_notePositions",
    value: function _notePositions(count) {
      if (count <= 1) return [50];
      if (count === 2) return [29, 70];
      if (count === 3) return [22, 50, 78];
      return [16, 39, 62, 84];
    }
  }, {
    key: "_playChallenge",
    value: function () {
      var _playChallenge2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _this5 = this;
        var beatMs, slotMs;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (!(this._state === "playing" || this._state === "complete")) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              this._cancelTimers();
              this._clearSelectionMarks();
              this._selection = [];
              this._state = "playing";
              this._inputLocked = true;
              this._resetDots();
              this._setStatus("Listen carefully…");
              this._setPlayButtons(true);
              _context.n = 2;
              return this._ensureAudio();
            case 2:
              if (!(this._state !== "playing")) {
                _context.n = 3;
                break;
              }
              return _context.a(2);
            case 3:
              beatMs = this._beatMs();
              slotMs = beatMs;
              this._answer.forEach(function (figure, index) {
                var startsAt = index * slotMs;
                _this5._setTimer(function () {
                  return _this5._activateDot(index);
                }, startsAt);
                _this5._scheduleFigureAudio(figure, startsAt);
                _this5._setTimer(function () {
                  return _this5._completeDot(index);
                }, startsAt + beatMs);
              });
              this._setTimer(function () {
                _this5._state = "answering";
                _this5._inputLocked = false;
                _this5._setPlayButtons(false);
                _this5._resetDots();
                _this5._setStatus("Now tap the two cards you heard, in order.");
              }, this._answer.length * slotMs + 120);
            case 4:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function _playChallenge() {
        return _playChallenge2.apply(this, arguments);
      }
      return _playChallenge;
    }()
  }, {
    key: "_stopChallenge",
    value: function _stopChallenge() {
      if (this._state !== "playing") return;
      this._cancelTimers();
      this._state = "ready";
      this._inputLocked = false;
      this._resetDots();
      this._setPlayButtons(false);
      this._setStatus("Playback stopped. Press Play when you’re ready.");
    }
  }, {
    key: "_handleCardTap",
    value: function () {
      var _handleCardTap2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(cardElement) {
        var _this6 = this;
        var figure, answerIndex, expected, resetDelay;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (!(this._inputLocked || this._state === "playing" || this._state === "complete")) {
                _context2.n = 1;
                break;
              }
              return _context2.a(2);
            case 1:
              figure = this._cards.find(function (item) {
                return item.id === cardElement.dataset.figureId;
              });
              if (figure) {
                _context2.n = 2;
                break;
              }
              return _context2.a(2);
            case 2:
              this._inputLocked = true;
              _context2.n = 3;
              return this._ensureAudio();
            case 3:
              this._scheduleFigureAudio(figure, 0, cardElement);
              if (!(this._state === "ready")) {
                _context2.n = 4;
                break;
              }
              cardElement.classList.add("is-previewing");
              this._setStatus("Press Play, listen to the two rhythms, then tap their cards in the same order.");
              this._setTimer(function () {
                cardElement.classList.remove("is-previewing");
                _this6._inputLocked = false;
              }, this._beatMs());
              return _context2.a(2);
            case 4:
              if (!(this._state !== "answering")) {
                _context2.n = 5;
                break;
              }
              return _context2.a(2);
            case 5:
              this._inputLocked = true;
              answerIndex = this._selection.length;
              expected = this._answer[answerIndex];
              this._activateDot(answerIndex);
              if (!(expected && expected.id === figure.id)) {
                _context2.n = 7;
                break;
              }
              this._correctTaps += 1;
              this._selection.push(figure);
              cardElement.classList.remove("is-wrong");
              cardElement.classList.add("is-correct");
              cardElement.querySelector(".rhythm-card__number").textContent = String(answerIndex + 1);
              this._chooseDot(answerIndex);
              if (!(this._selection.length === this._answer.length)) {
                _context2.n = 6;
                break;
              }
              this._finishRound();
              return _context2.a(2);
            case 6:
              this._setStatus("Great — now choose the second card.");
              this._setTimer(function () {
                _this6._inputLocked = false;
              }, this._beatMs());
              return _context2.a(2);
            case 7:
              this._wrongTaps += 1;
              this._roundHadMistake = true;
              this._madeAnyMistake = true;
              cardElement.classList.add("is-wrong");
              this._wrongDot(answerIndex);
              this._setStatus("Not quite. Start again with the first card.");
              this._playFailSound();
              resetDelay = Math.min(800, Math.max(600, Math.round(this._beatMs() * 0.75)));
              this._setTimer(function () {
                _this6._selection = [];
                _this6._clearSelectionMarks();
                _this6._resetDots();
                _this6._inputLocked = false;
              }, resetDelay);
            case 8:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _handleCardTap(_x) {
        return _handleCardTap2.apply(this, arguments);
      }
      return _handleCardTap;
    }()
  }, {
    key: "_finishRound",
    value: function _finishRound() {
      var _this7 = this;
      this._state = "complete";
      this._inputLocked = true;
      var earned = this._roundHadMistake ? 1 : 2;
      this._pointsValue += earned;
      this.$points.text(String(this._pointsValue));
      this.$increment.text("+".concat(earned)).css("opacity", 1);
      this._setTimer(function () {
        return _this7.$increment.css("opacity", 0);
      }, 900);
      this._updateProgress();
      this._setStatus("Perfect order! Ready for another pair?");
      this._setPlayButtons(false);
      this.$playWrap.hide();
      this.$continueWrap.show();
      this.$continueBtn.text(!this.opts.practiceMode && this._round >= this.opts.numOfChallenges ? "View results" : "Continue");
      this._playSuccessSound();
    }
  }, {
    key: "_continue",
    value: function _continue() {
      if (this._state !== "complete") return;
      if (!this.opts.practiceMode && this._round >= this.opts.numOfChallenges) {
        this._showFinalResults();
        return;
      }
      this._round += 1;
      this.$playWrap.show();
      this._startRound();
    }
  }, {
    key: "_updateProgress",
    value: function _updateProgress() {
      if (this.opts.practiceMode) {
        this.$progressCounter.text("Practice");
        return;
      }
      var completed = Math.min(this._round, this.opts.numOfChallenges);
      var progress = completed / this.opts.numOfChallenges * 100;
      this.$progressBar.data("progress", progress).css("width", "".concat(progress, "%"));
      this.$progressCounter.text("".concat(completed, " of ").concat(this.opts.numOfChallenges));
    }
  }, {
    key: "_showFinalResults",
    value: function _showFinalResults() {
      var _this8 = this;
      this._cancelTimers();
      this.$continueWrap.hide();
      this.$playWrap.hide();
      $("#controls").hide();
      var totalTaps = this._correctTaps + this._wrongTaps;
      var accuracy = totalTaps ? Math.round(this._correctTaps / totalTaps * 100) : 0;
      var durationSec = Math.max(0, Math.floor((Date.now() - this._startedAt) / 1000));
      (0,_shared_finalResults_js__WEBPACK_IMPORTED_MODULE_0__.renderFinalResultsOverlay)({
        $finalOverlay: this.$finalOverlay,
        rounds: this.opts.numOfChallenges,
        score: this._pointsValue,
        accuracy: accuracy,
        durationSec: durationSec,
        settingsBonus: false,
        playFinalSfx: function playFinalSfx() {
          return _this8._playFinalSound();
        }
      });
    }
  }, {
    key: "_scheduleFigureAudio",
    value: function _scheduleFigureAudio(figure) {
      var _this9 = this;
      var startsAtMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var cardElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var beatMs = this._beatMs();
      figure.events.forEach(function (offset) {
        _this9._setTimer(function () {
          _this9._playRhythmHit();
          if (!cardElement) return;
          cardElement.classList.remove("is-sounding");
          void cardElement.offsetWidth;
          cardElement.classList.add("is-sounding");
          _this9._setTimer(function () {
            return cardElement.classList.remove("is-sounding");
          }, 120);
        }, startsAtMs + offset * beatMs);
      });
    }
  }, {
    key: "_ensureAudio",
    value: function () {
      var _ensureAudio2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (window.Tone) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.p = 1;
              _context3.n = 2;
              return Tone.start();
            case 2:
              _context3.n = 3;
              return _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_1__.GameAudio.ensureMetronomeAudio();
            case 3:
              if (!this._rhythmSynth) {
                this._rhythmSynth = new Tone.MembraneSynth({
                  pitchDecay: 0.012,
                  octaves: 0.8,
                  oscillator: {
                    type: "sine"
                  },
                  envelope: {
                    attack: 0.001,
                    decay: 0.085,
                    sustain: 0,
                    release: 0.02
                  },
                  volume: -2
                }).toDestination();
              }
              if (this.opts.sound && !this._audioReady) {
                this._uiSynth = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_1__.GameAudio.createUiPolySynth();
                this._uiNoise = _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_1__.GameAudio.createUiNoiseSynth();
                this._audioReady = true;
              }
              _context3.n = 5;
              break;
            case 4:
              _context3.p = 4;
              _t = _context3.v;
              this._setStatus("Audio could not start. Check your browser sound settings.");
            case 5:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 4]]);
      }));
      function _ensureAudio() {
        return _ensureAudio2.apply(this, arguments);
      }
      return _ensureAudio;
    }()
  }, {
    key: "_playRhythmHit",
    value: function _playRhythmHit() {
      if (!this._rhythmSynth || !window.Tone) return;
      this._rhythmSynth.triggerAttackRelease("C5", "32n", Tone.now(), 0.95);
    }
  }, {
    key: "_playSuccessSound",
    value: function _playSuccessSound() {
      var _this0 = this;
      if (!this.opts.sound || !this._uiSynth || !window.Tone) return;
      var now = Tone.now();
      ["C6", "E6", "G6"].forEach(function (note, index) {
        _this0._uiSynth.triggerAttackRelease(note, 0.08, now + index * 0.055, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_1__.GameAudio.scale("successBasic", 0.5));
      });
    }
  }, {
    key: "_playFailSound",
    value: function _playFailSound() {
      var _this$_uiNoise, _this$_uiSynth;
      if (!this.opts.sound || !this._audioReady || !window.Tone) return;
      var now = Tone.now();
      (_this$_uiNoise = this._uiNoise) === null || _this$_uiNoise === void 0 || _this$_uiNoise.triggerAttackRelease(0.06, now, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_1__.GameAudio.scale("failNoise", 0.35));
      (_this$_uiSynth = this._uiSynth) === null || _this$_uiSynth === void 0 || _this$_uiSynth.triggerAttackRelease("A2", 0.1, now + 0.02, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_1__.GameAudio.scale("failNote", 0.45));
    }
  }, {
    key: "_playFinalSound",
    value: function _playFinalSound() {
      var _this1 = this;
      if (!this.opts.sound || !this._uiSynth || !window.Tone) return;
      var now = Tone.now();
      ["C5", "E5", "G5", "C6"].forEach(function (note, index) {
        _this1._uiSynth.triggerAttackRelease(note, 0.16, now + index * 0.08, _shared_GameAudio_js__WEBPACK_IMPORTED_MODULE_1__.GameAudio.scale("final", 0.5));
      });
    }
  }, {
    key: "_activateDot",
    value: function _activateDot(index) {
      var dot = this.$dots.find(".sequence-dot").get(index);
      if (!dot) return;
      dot.classList.remove("is-complete", "is-wrong", "is-chosen");
      dot.classList.add("is-active");
    }
  }, {
    key: "_completeDot",
    value: function _completeDot(index) {
      var dot = this.$dots.find(".sequence-dot").get(index);
      if (!dot) return;
      dot.classList.remove("is-active");
      dot.classList.add("is-complete");
    }
  }, {
    key: "_chooseDot",
    value: function _chooseDot(index) {
      var dot = this.$dots.find(".sequence-dot").get(index);
      if (!dot) return;
      dot.classList.remove("is-active", "is-wrong");
      dot.classList.add("is-chosen");
    }
  }, {
    key: "_wrongDot",
    value: function _wrongDot(index) {
      var dot = this.$dots.find(".sequence-dot").get(index);
      if (!dot) return;
      dot.classList.remove("is-active", "is-complete", "is-chosen");
      dot.classList.add("is-wrong");
    }
  }, {
    key: "_resetDots",
    value: function _resetDots() {
      this.$dots.find(".sequence-dot").removeClass("is-active is-complete is-chosen is-wrong");
    }
  }, {
    key: "_clearSelectionMarks",
    value: function _clearSelectionMarks() {
      this.$grid.find(".rhythm-card").removeClass("is-correct is-wrong is-previewing is-sounding");
      this.$grid.find(".rhythm-card__number").text("");
    }
  }, {
    key: "_setPlayButtons",
    value: function _setPlayButtons(isPlaying) {
      this.$playWrap.show();
      this.$playBtn.toggle(!isPlaying);
      this.$stopBtn.toggle(isPlaying);
    }
  }, {
    key: "_setStatus",
    value: function _setStatus(message) {
      this.$status.text(message);
    }
  }, {
    key: "_beatMs",
    value: function _beatMs() {
      return 60000 / this.opts.bpm;
    }
  }, {
    key: "_setTimer",
    value: function _setTimer(callback, delayMs) {
      var _this10 = this;
      var timer = setTimeout(function () {
        _this10._timers["delete"](timer);
        callback();
      }, Math.max(0, delayMs));
      this._timers.add(timer);
      return timer;
    }
  }, {
    key: "_cancelTimers",
    value: function _cancelTimers() {
      this._timers.forEach(function (timer) {
        return clearTimeout(timer);
      });
      this._timers.clear();
    }
  }, {
    key: "_shuffle",
    value: function _shuffle(items) {
      var shuffled = _toConsumableArray(items);
      for (var index = shuffled.length - 1; index > 0; index -= 1) {
        var other = Math.floor(Math.random() * (index + 1));
        var _ref = [shuffled[other], shuffled[index]];
        shuffled[index] = _ref[0];
        shuffled[other] = _ref[1];
      }
      return shuffled;
    }
  }, {
    key: "_normalizeChallengeCount",
    value: function _normalizeChallengeCount(value) {
      var count = Math.trunc(Number(value));
      if (!Number.isFinite(count)) return 4;
      return Math.min(BeatHero.MAX_CHALLENGES, Math.max(BeatHero.MIN_CHALLENGES, count));
    }
  }, {
    key: "_normalizeBpm",
    value: function _normalizeBpm(value) {
      var bpm = Number(value);
      if (!Number.isFinite(bpm)) return 80;
      return Math.min(160, Math.max(50, bpm));
    }
  }, {
    key: "_normalizeFigureIds",
    value: function _normalizeFigureIds(value) {
      var validIds = new Set(BeatHero.FIGURES.map(function (figure) {
        return figure.id;
      }));
      var selected = _toConsumableArray(new Set(Array.isArray(value) ? value : [])).filter(function (figureId) {
        return validIds.has(figureId);
      }).slice(0, 4);
      BeatHero.DEFAULT_FIGURE_IDS.forEach(function (figureId) {
        if (selected.length < 2 && !selected.includes(figureId)) selected.push(figureId);
      });
      return selected;
    }
  }, {
    key: "_normalizeBool",
    value: function _normalizeBool(value) {
      return value === true || value === 1 || ["1", "true", "on", "yes"].includes(String(value).toLowerCase());
    }
  }]);
}();
_defineProperty(BeatHero, "MIN_CHALLENGES", 2);
_defineProperty(BeatHero, "MAX_CHALLENGES", 12);
_defineProperty(BeatHero, "DEFAULT_FIGURE_IDS", ["quarter", "two-eighths", "four-sixteenths", "eighth-two-sixteenths"]);
_defineProperty(BeatHero, "FIGURES", [{
  id: "quarter",
  label: "Quarter note",
  events: [0],
  notes: [{
    value: 4
  }]
}, {
  id: "two-eighths",
  label: "Two eighth notes",
  events: [0, 0.5],
  notes: [{
    value: 8
  }, {
    value: 8
  }]
}, {
  id: "eighth-two-sixteenths",
  label: "Eighth note, two sixteenth notes",
  events: [0, 0.5, 0.75],
  notes: [{
    value: 8
  }, {
    value: 16
  }, {
    value: 16
  }]
}, {
  id: "sixteenth-eighth-sixteenth",
  label: "Sixteenth note, eighth note, sixteenth note",
  events: [0, 0.25, 0.75],
  notes: [{
    value: 16
  }, {
    value: 8
  }, {
    value: 16
  }]
}, {
  id: "two-sixteenths-eighth",
  label: "Two sixteenth notes, eighth note",
  events: [0, 0.25, 0.5],
  notes: [{
    value: 16
  }, {
    value: 16
  }, {
    value: 8
  }]
}, {
  id: "four-sixteenths",
  label: "Four sixteenth notes",
  events: [0, 0.25, 0.5, 0.75],
  notes: [{
    value: 16
  }, {
    value: 16
  }, {
    value: 16
  }, {
    value: 16
  }]
}, {
  id: "dotted-eighth-sixteenth",
  label: "Dotted eighth note, sixteenth note",
  events: [0, 0.75],
  notes: [{
    value: 8,
    dotted: true
  }, {
    value: 16
  }]
}, {
  id: "sixteenth-dotted-eighth",
  label: "Sixteenth note, dotted eighth note",
  events: [0, 0.25],
  notes: [{
    value: 16
  }, {
    value: 8,
    dotted: true
  }]
}]);

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