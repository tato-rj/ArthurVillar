/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/music/games/blocks/BlocksChallenge.js"
/*!************************************************************!*\
  !*** ./resources/js/music/games/blocks/BlocksChallenge.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlocksChallenge: () => (/* binding */ BlocksChallenge)
/* harmony export */ });
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
var BlocksChallenge = /*#__PURE__*/function () {
  function BlocksChallenge() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BlocksChallenge);
    var defaults = {
      tableEl: "table.table",
      pathLength: 9,
      maxGenerateAttempts: 2000,
      maxStraightRun: 3,
      intervals: null,
      initialNotes: null,
      sound: true,
      basePoints: 1,
      firstTryBonus: 2,
      numOfChallenges: 4,
      namespace: "blocksChallenge"
    };
    this.opts = _objectSpread(_objectSpread({}, defaults), options || {});
    this.opts.numOfChallenges = this._normalizeNumOfChallenges(this.opts.numOfChallenges);
    this.$table = $(this.opts.tableEl).first();
    this.$musicKeyboard = $("#music-keyboard").first();
    this.$feedback = $("#feedback-success");
    this.$helpBtn = $("#help");
    this.$checkWrap = $("#check");
    this.$checkBtn = $("#check button");
    this.$continueWrap = $("#continue");
    this.$continueBtn = $("#continue button");
    this.$progressBar = $("#progress-bar");
    this.$progressCounter = $("#progress-counter");
    this.$points = $("#points");
    this.$finalOverlay = $("#final-overlay");
    this.ns = this.opts.namespace || "blocksChallenge";
    this._audioReady = false;
    this._synth = null;
    this._revealTimeouts = [];
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
    this._points = 0;
    this._stats = {
      checksTotal: 0,
      checksCorrect: 0,
      finishedAtMs: null
    };
    this._roundAnswerKey = {};
    this._roundRecords = [];
    this._instructionsDismissed = false;
    this._correctionMode = false;
    this._wrongEditableIndexes = new Set();
  }
  return _createClass(BlocksChallenge, [{
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
      if (safe < BlocksChallenge.MIN_CHALLENGES) return BlocksChallenge.MIN_CHALLENGES;
      if (safe > BlocksChallenge.MAX_CHALLENGES) return BlocksChallenge.MAX_CHALLENGES;
      return safe;
    }
  }, {
    key: "_resetRunUi",
    value: function _resetRunUi() {
      this._finalStartMs = Date.now();
      this._currentRound = 1;
      this._roundLocked = false;
      this._usedHintThisRound = false;
      this._madeMistakeThisRound = false;
      this._madeAnyMistake = false;
      this._points = 0;
      this._stats = {
        checksTotal: 0,
        checksCorrect: 0,
        finishedAtMs: null
      };
      this._roundAnswerKey = {};
      this._roundRecords = [];
      this.$points.text("0");
      this.$feedback.hide();
      this.$helpBtn.hide();
      this.$continueWrap.hide();
      this.$finalOverlay.hide();
      this.$checkBtn.text("Check my answer");
      this.$progressBar.data("progress", 0).css({
        width: "0%"
      });
      this.$progressCounter.text("0 of ".concat(this.opts.numOfChallenges));
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
      this.$continueWrap.hide();
      this.$feedback.hide();
      this.$checkWrap.show().addClass("invisible");
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
              html: "<div><span>START HERE</span><input type=\"text\" name=\"note\" value=\"".concat(initialNote.display, "\" disabled=\"\"><i class=\"fa-solid ").concat(arrowClass, "\"></i></div>")
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
            html: "<div><span style=\"opacity: 0.2; font-size: 3rem;\">?</span><input type=\"text\" name=\"note\"></div>"
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
      return fromOptions.length ? fromOptions : BlocksChallenge.INTERVALS_FALLBACK.slice();
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
      var pool = fromOptions.length ? fromOptions : BlocksChallenge.INTERVALS_FALLBACK;
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
      return String(pool[Math.floor(Math.random() * pool.length)] || "E");
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
        if (_this2._currentRound >= _this2.opts.numOfChallenges) {
          _this2._showFinalResults();
          return;
        }
        _this2._currentRound += 1;
        _this2._startRound();
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
      this._finalizeRoundRecord({
        passed: false,
        earned: 0
      });
      this._enterCorrectionMode(evalResult);
      this._failAnimation();
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
        var _answers$idxStr;
        var idx = Number(idxStr);
        var $cell = _this4.$table.find("td[data-path-index=\"".concat(idx, "\"]")).first();
        if (!$cell.length || !$cell.hasClass("block")) return;
        var $input = $cell.find('input[name="note"]').first();
        if (!$input.length) return;
        var note = String(((_answers$idxStr = answers[idxStr]) === null || _answers$idxStr === void 0 ? void 0 : _answers$idxStr.display) || "");
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
      var m = normalized.match(/^([A-Ga-g])((?:#{1,2})|(?:b{1,2})|)?(\d+)?$/);
      if (!m) return null;
      var letter = m[1].toUpperCase();
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
        display: "".concat(letter).concat(this._accidentalDisplayFromOffset(accOffset))
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
        display: "".concat(targetLetter).concat(this._accidentalDisplayFromOffset(off))
      };
    }
  }, {
    key: "_awardPointsForCorrect",
    value: function _awardPointsForCorrect() {
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
      var mm = String(Math.floor(durationSec / 60)).padStart(2, "0");
      var ss = String(durationSec % 60).padStart(2, "0");
      var $overlay = this.$finalOverlay;
      $overlay.find('span[name="rounds"]').text(String(this.opts.numOfChallenges));
      $overlay.find('span[name="score"]').text(String(this._points));
      $overlay.find('span[name="accuracy"]').text("".concat(accuracy, "%"));
      $overlay.find('span[name="duration"]').text("".concat(mm, ":").concat(ss));
      var $greeting = $overlay.find("#result-greeting");
      var $title = $greeting.find("h1");
      var $subtitle = $greeting.find("h6");
      var $img = $overlay.find("img").first();
      if (accuracy < 50) {
        $title.text("Keep going!");
        $subtitle.text("That round was tough, but your next one can be much better.");
        var cur = String($img.attr("src") || "");
        if (cur.includes("trophy.svg")) $img.attr("src", cur.replace("trophy.svg", "plant.svg"));
      } else {
        $title.text("Great job!");
        $subtitle.text("It's not about getting the most points, but if it was...");
        var _cur = String($img.attr("src") || "");
        if (_cur.includes("plant.svg")) $img.attr("src", _cur.replace("plant.svg", "trophy.svg"));
      }
      this.$musicKeyboard.hide();
      this.$continueWrap.hide();
      this.$helpBtn.hide();
      this.$checkWrap.hide();
      $overlay.show();
    }
  }, {
    key: "_wireNoteInputUx",
    value: function _wireNoteInputUx() {
      var _this8 = this;
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
          _this8._clearActiveBlockInput();
          return;
        }
        _this8._setActiveBlockInput($input);
        $input.trigger("focus");
        _this8._showMusicKeyboard();
      });
      this.$table.off("focusin.".concat(this.ns, "Note"), 'input[name="note"]').on("focusin.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        _this8._setActiveBlockInput($input);
        _this8._showMusicKeyboard();
      });
      this.$table.off("focusout.".concat(this.ns, "Note"), 'input[name="note"]').on("focusout.".concat(this.ns, "Note"), 'input[name="note"]', function () {
        if (_this8._keyboardHideTimer) clearTimeout(_this8._keyboardHideTimer);
        _this8._keyboardHideTimer = setTimeout(function () {
          if (Date.now() < _this8._suppressKeyboardHideUntil) return;
          var $active = $(document.activeElement);
          var inNoteInput = $active.is('input[name="note"]') && $active.closest("td.block").length;
          var inKeyboard = $active.closest("#music-keyboard").length;
          if (!inNoteInput && !inKeyboard) {
            _this8._hideMusicKeyboard();
          }
        }, 0);
      });
      this.$table.off("blur.".concat(this.ns, "Note"), 'input[name="note"]').on("blur.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        _this8._updateNoteInputProgression();
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
          _this8._revealNextCovers(2);
        }
        $input.data("prev-value", curVal);
        _this8._updateNoteInputProgression();
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
          _this8._suppressKeyboardHideUntil = Date.now() + 250;
          return;
        }
        _this8._hideMusicKeyboard();
        _this8._clearActiveBlockInput();
      });
      this.$musicKeyboard.off("click.".concat(this.ns, "Write"), "button").on("click.".concat(this.ns, "Write"), "button", function (e) {
        e.preventDefault();
        var $target = $(e.currentTarget);
        var $active = _this8.$activeBlockInput && _this8.$activeBlockInput.length ? _this8.$activeBlockInput : $(document.activeElement).closest('input[name="note"]');
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
          $active.val(letter);
          $active.trigger("input");
          return;
        }
        if (accidentalType) {
          var nextValue = _this8._applyAccidentalToInputValue(current, accidentalType);
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
      var m = String(current || "").trim().match(/^([A-G])([#b♯♭𝄪𝄫]{0,2})$/i);
      if (!m) return null;
      var letter = m[1].toUpperCase();
      var rawAcc = m[2] || "";
      var normalizedAcc = rawAcc === "#" || rawAcc === "♯" ? "sharp" : rawAcc === "##" || rawAcc === "𝄪" ? "double_sharp" : rawAcc === "b" || rawAcc === "♭" ? "flat" : rawAcc === "bb" || rawAcc === "𝄫" ? "double_flat" : "";
      if (accidentalType === "sharp") {
        if (normalizedAcc === "double_sharp") return "".concat(letter, "\uD834\uDD2A");
        if (normalizedAcc === "sharp") return "".concat(letter, "\uD834\uDD2A");
        return "".concat(letter, "\u266F");
      }
      if (accidentalType === "flat") {
        if (normalizedAcc === "double_flat") return "".concat(letter, "\uD834\uDD2B");
        if (normalizedAcc === "flat") return "".concat(letter, "\uD834\uDD2B");
        return "".concat(letter, "\u266D");
      }
      return "".concat(letter);
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
      if (!this._instructionsDismissed) $("#instructions").show();
      $("#check").show().addClass("invisible");
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
              this._synth = new Tone.PolySynth(Tone.Synth, {
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
      var _this9 = this;
      if (!window.Tone) return;
      this._ensureAudio().then(function () {
        if (!_this9._synth) return;
        var now = Tone.now();
        var when = now + (Number(atSecondsFromNow) || 0);
        var dur = Number(durSeconds) || 0.6;
        _this9._synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), dur, when);
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
      var textFromInput = String($cell.find('input[name="note"]').first().val() || "").trim();
      var textFromInterval = String($cell.find("span[note]").first().text() || "").trim();
      var textFromInitial = String($cell.find("span").first().text() || "").trim();
      var rawText = textFromInput || textFromInterval || textFromInitial || String($cell.text() || "").trim();
      if (!rawText) return null;
      var normalized = rawText.replaceAll("𝄪", "##").replaceAll("♯", "#").replaceAll("𝄫", "bb").replaceAll("♭", "b");
      var m = normalized.match(/^([A-Ga-g])((?:#{1,2})|(?:b{1,2})|)?(\d+)?$/);
      if (!m) return null;
      var letter = m[1].toUpperCase();
      var acc = m[2] || "";
      var octave = m[3] != null ? parseInt(m[3], 10) : 4;
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
      return 12 * (octave + 1) + baseSemitoneFromC + accOffset;
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
      var _this0 = this;
      var onDone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var list = Array.isArray(items) ? items : [];
      if (!list.length) {
        if (typeof onDone === "function") onDone();
        return;
      }
      var _loop = function _loop() {
        var item = list[i];
        var tid = setTimeout(function () {
          var $cell = _this0._cellAt(item.r, item.c);
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
          _this0._showCellVisual($cell);
          _this0._updateNoteInputProgression();
        }, i * 80);
        _this0._revealTimeouts.push(tid);
      };
      for (var i = 0; i < list.length; i += 1) {
        _loop();
      }
      var coversTid = setTimeout(function () {
        _this0._revealNextCovers(1);
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
      var _this1 = this;
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
          $cover.addClass("cover-revealing");
          $cover.removeClass("animate__animated animate__hinge").addClass("animate__animated animate__hinge").one("animationend.".concat(_this1.ns, "CoverHinge webkitAnimationEnd.").concat(_this1.ns, "CoverHinge"), function () {
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
          _this1._revealTimeouts.push(fallbackTid);
        }, i * 500);
        _this1._revealTimeouts.push(tid);
      });
    }
  }, {
    key: "_showStandardGameUi",
    value: function _showStandardGameUi() {
      $("#instructions").show();
      $("#controls").show();
      $("#page-wrapper").fadeIn("fast");
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
      var _this10 = this;
      if (!this.$musicKeyboard.length) return;
      if (!this.$musicKeyboard.is(":visible")) return;
      this.$musicKeyboard.removeClass("animate__bounceInUp").addClass("animate__animated animate__bounceOutDown");
      var hideTid = setTimeout(function () {
        _this10.$musicKeyboard.hide();
        _this10.$musicKeyboard.removeClass("animate__bounceOutDown");
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
_defineProperty(BlocksChallenge, "INTERVALS_FALLBACK", ["m2", "M2", "m3", "M3", "P4", "A4", "d5", "P5", "m6", "M6", "m7", "M7", "P8"]);
_defineProperty(BlocksChallenge, "MIN_CHALLENGES", 2);
_defineProperty(BlocksChallenge, "MAX_CHALLENGES", 12);

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
/*!********************************************!*\
  !*** ./resources/js/music/games/blocks.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_BlocksChallenge_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/BlocksChallenge.js */ "./resources/js/music/games/blocks/BlocksChallenge.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var options = readGlobal("__challengeOptions") || {};
var game = new _blocks_BlocksChallenge_js__WEBPACK_IMPORTED_MODULE_0__.BlocksChallenge(_objectSpread({}, options));
game.start();
})();

/******/ })()
;