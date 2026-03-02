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
      namespace: "blocksChallenge"
    };
    this.opts = _objectSpread(_objectSpread({}, defaults), options || {});
    this.$table = $(this.opts.tableEl).first();
    this.ns = this.opts.namespace || "blocksChallenge";
    this._audioReady = false;
    this._synth = null;
    this._revealTimeouts = [];
  }
  return _createClass(BlocksChallenge, [{
    key: "start",
    value: function start() {
      var _this = this;
      if (!this.$table.length) return;
      var $rows = this.$table.find("tbody tr");
      var rowCount = $rows.length;
      var colCount = rowCount ? $rows.first().find("td").length : 0;
      if (!rowCount || !colCount) return;
      this._clearRevealTimers();
      this.$table.find("td").removeClass("block interval-block initial-block").removeAttr("id").empty();
      this._hideAllCellsVisual();
      var maxCells = rowCount * colCount;
      var pathLength = Math.max(1, Math.min(maxCells, Number(this.opts.pathLength) || 9));
      var path = this._generatePath({
        rowCount: rowCount,
        colCount: colCount,
        length: pathLength,
        maxAttempts: Number(this.opts.maxGenerateAttempts) || 2000,
        maxStraightRun: Math.max(1, Number(this.opts.maxStraightRun) || 3)
      });
      if (!path) return;
      var revealItems = path.map(function (cell, i) {
        if (i === 0) {
          var note = _this._pickInitialNote();
          var next = path[1] || null;
          var arrowClass = _this._arrowClassForNextStep(cell, next);
          return {
            r: cell.r,
            c: cell.c,
            i: i,
            cls: "initial-block",
            html: "<div><span>START HERE</span><input type=\"text\" name=\"note\" value=\"".concat(note, "\" disabled=\"\"><i class=\"fa-solid ").concat(arrowClass, "\"></i></div>")
          };
        }
        if (i % 2 === 1) {
          var interval = _this._pickInitialInterval();
          var direction = Math.random() < 0.5 ? "UP" : "DOWN";
          return {
            r: cell.r,
            c: cell.c,
            i: i,
            cls: "interval-block",
            html: "<div><button type=\"button\" data-interval=\"".concat(interval, "\"><i class=\"fa-solid fa-volume-up\"></i></button><span interval>").concat(interval, "</span><span direction>").concat(direction, "</span></div>")
          };
        }
        return {
          r: cell.r,
          c: cell.c,
          i: i,
          cls: "block",
          html: "<div><span>NEW<br>NOTE<br>HERE</span><input type=\"text\" name=\"note\"></div>"
        };
      });
      this._wireNoteInputUx();
      this._wireIntervalBlocks();
      this._showStandardGameUi();
      this._revealPathCells(revealItems);
    }
  }, {
    key: "_generatePath",
    value: function _generatePath(_ref) {
      var rowCount = _ref.rowCount,
        colCount = _ref.colCount,
        length = _ref.length,
        maxAttempts = _ref.maxAttempts,
        maxStraightRun = _ref.maxStraightRun;
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
      var _this2 = this;
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
          _this2._shakeCell($cell);
          return;
        }
        var $prev = _this2.$table.find("td[data-path-index=\"".concat(idx - 1, "\"]")).first();
        var prevMidi = _this2._midiFromCell($prev);
        if (!Number.isFinite(prevMidi)) {
          _this2._shakeCell($cell);
          return;
        }
        var interval = String($btn.attr("data-interval") || "").trim();
        var dirRaw = String($cell.find("span[direction]").first().text() || "").trim().toUpperCase();
        var dir = dirRaw === "DOWN" ? -1 : 1;
        var semis = _this2._intervalToSemitones(interval);
        if (!Number.isFinite(semis)) {
          _this2._shakeCell($cell);
          return;
        }
        var secondMidi = prevMidi + dir * semis;
        _this2._playDictationLike(prevMidi, secondMidi);
      });
    }
  }, {
    key: "_wireNoteInputUx",
    value: function _wireNoteInputUx() {
      var _this3 = this;
      this.$table.off("blur.".concat(this.ns, "Note"), 'input[name="note"]').on("blur.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        _this3._updateNoteInputProgression();
      });
      this.$table.off("input.".concat(this.ns, "Note"), 'input[name="note"]').on("input.".concat(this.ns, "Note"), 'input[name="note"]', function (e) {
        var $input = $(e.currentTarget);
        if (!$input.closest("td.block").length) return;
        _this3._updateNoteInputProgression();
      });
    }
  }, {
    key: "_updateNoteInputProgression",
    value: function _updateNoteInputProgression() {
      var $blocks = this.$table.find("td.block").toArray().sort(function (a, b) {
        var ia = parseInt(a.getAttribute("data-path-index"), 10);
        var ib = parseInt(b.getAttribute("data-path-index"), 10);
        return (Number.isFinite(ia) ? ia : 9999) - (Number.isFinite(ib) ? ib : 9999);
      });
      var gateOpen = true;
      for (var i = 0; i < $blocks.length; i += 1) {
        var $cell = $($blocks[i]);
        var $input = $cell.find('input[name="note"]').first();
        var $label = $cell.children("div").children("span").not(".block-arrow").first();
        if (!$input.length) continue;
        var value = String($input.val() || "").trim();
        if (gateOpen) {
          $input.prop("disabled", false);
          if (value) {
            $label.hide();
          } else {
            $label.show();
            gateOpen = false;
          }
        } else {
          $input.prop("disabled", true);
          $label.hide();
        }
      }
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
      var _this4 = this;
      if (!window.Tone) return;
      this._ensureAudio().then(function () {
        if (!_this4._synth) return;
        var now = Tone.now();
        var when = now + (Number(atSecondsFromNow) || 0);
        var dur = Number(durSeconds) || 0.6;
        _this4._synth.triggerAttackRelease(Tone.Frequency(midi, "midi"), dur, when);
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
      var m = rawText.match(/^([A-Ga-g])((?:#{1,2})|(?:b{1,2})|)?(\d+)?$/);
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
      var _this5 = this;
      var onDone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var list = Array.isArray(items) ? items : [];
      if (!list.length) {
        if (typeof onDone === "function") onDone();
        return;
      }
      var _loop = function _loop() {
        var item = list[i];
        var tid = setTimeout(function () {
          var $cell = _this5._cellAt(item.r, item.c);
          $cell.attr("data-path-index", String(item.i));
          $cell.addClass(item.cls).append(item.html);
          if (item.cls === "block") {
            $cell.find('input[name="note"]').prop("disabled", true);
            $cell.children("div").children("span").not(".block-arrow").first().hide();
          }
          _this5._showCellVisual($cell);
          _this5._updateNoteInputProgression();
        }, i * 80);
        _this5._revealTimeouts.push(tid);
      };
      for (var i = 0; i < list.length; i += 1) {
        _loop();
      }
      if (typeof onDone === "function") {
        var doneTid = setTimeout(function () {
          return onDone();
        }, list.length * 80);
        this._revealTimeouts.push(doneTid);
      }
    }
  }, {
    key: "_showStandardGameUi",
    value: function _showStandardGameUi() {
      $("#instructions").show();
      $("#controls").show();
      $("#page-wrapper").fadeIn("fast");
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