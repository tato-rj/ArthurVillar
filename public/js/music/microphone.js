/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/music/games/shared/playedNotePitch.js"
/*!************************************************************!*\
  !*** ./resources/js/music/games/shared/playedNotePitch.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_MIC_SENSITIVITY: () => (/* binding */ DEFAULT_MIC_SENSITIVITY),
/* harmony export */   PLAYED_NOTE_STABLE_DURATION_MS: () => (/* binding */ PLAYED_NOTE_STABLE_DURATION_MS),
/* harmony export */   createStablePitchState: () => (/* binding */ createStablePitchState),
/* harmony export */   detectPlayedNotePitch: () => (/* binding */ detectPlayedNotePitch),
/* harmony export */   frequencyToMidi: () => (/* binding */ frequencyToMidi),
/* harmony export */   inputLevel: () => (/* binding */ inputLevel),
/* harmony export */   updateStablePitchState: () => (/* binding */ updateStablePitchState)
/* harmony export */ });
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function createStablePitchState() {
  return {
    midi: null,
    frequency: null,
    count: 0,
    samples: [],
    settled: false
  };
}
var PLAYED_NOTE_STABLE_DURATION_MS = 700;
var DEFAULT_MIC_SENSITIVITY = 65;
var MIN_STABLE_SAMPLES = 5;
var MAX_SAMPLE_GAP_MS = 250;
var MAX_PITCH_SPREAD_CENTS = 70;
var MAX_PITCH_DRIFT_CENTS = 25;
function frequencyToMidi(frequency) {
  return Math.round(69 + 12 * Math.log2(frequency / 440));
}
function updateStablePitchState(stablePitch, frequency) {
  var timestamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : performance.now();
  var settleMs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : PLAYED_NOTE_STABLE_DURATION_MS;
  if (!Number.isFinite(frequency) || frequency <= 0 || !Number.isFinite(timestamp)) {
    return createStablePitchState();
  }
  var current = stablePitch || createStablePitchState();
  var stableDuration = Number.isFinite(settleMs) ? Math.max(300, Math.min(2500, settleMs)) : PLAYED_NOTE_STABLE_DURATION_MS;
  var previousSamples = current.samples || [];
  var lastSample = previousSamples[previousSamples.length - 1];
  if ((lastSample === null || lastSample === void 0 ? void 0 : lastSample.timestamp) === timestamp) return current;
  var gap = lastSample ? timestamp - lastSample.timestamp : Infinity;
  var samples = gap > 0 && gap <= MAX_SAMPLE_GAP_MS ? _toConsumableArray(previousSamples) : [];
  samples.push({
    cents: 1200 * Math.log2(frequency / 440),
    timestamp: timestamp
  });

  // Keep one sample at the start of the time window, independent of frame rate.
  while (samples.length > MIN_STABLE_SAMPLES && timestamp - samples[1].timestamp >= stableDuration) {
    samples.shift();
  }
  // A changed note or a wide glide starts a fresh settling window.
  while (samples.length > 1) {
    var pitches = samples.map(function (sample) {
      return sample.cents;
    });
    if (Math.max.apply(Math, _toConsumableArray(pitches)) - Math.min.apply(Math, _toConsumableArray(pitches)) <= MAX_PITCH_SPREAD_CENTS) break;
    samples.shift();
  }
  var sortedPitches = samples.map(function (sample) {
    return sample.cents;
  }).sort(function (a, b) {
    return a - b;
  });
  var middle = Math.floor(sortedPitches.length / 2);
  var medianCents = sortedPitches.length % 2 ? sortedPitches[middle] : (sortedPitches[middle - 1] + sortedPitches[middle]) / 2;
  var settledFrequency = 440 * Math.pow(2, medianCents / 1200);
  var duration = timestamp - samples[0].timestamp;
  var settled = duration >= stableDuration && samples.length >= MIN_STABLE_SAMPLES;
  if (settled) {
    // A narrow range alone can still be a slow slide. Measure its overall drift
    // while allowing small oscillations (such as vibrato) around a steady note.
    var meanTime = samples.reduce(function (sum, sample) {
      return sum + sample.timestamp - samples[0].timestamp;
    }, 0) / samples.length;
    var meanPitch = samples.reduce(function (sum, sample) {
      return sum + sample.cents;
    }, 0) / samples.length;
    var covariance = 0;
    var timeVariance = 0;
    var _iterator = _createForOfIteratorHelper(samples),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var sample = _step.value;
        var timeOffset = sample.timestamp - samples[0].timestamp - meanTime;
        covariance += timeOffset * (sample.cents - meanPitch);
        timeVariance += Math.pow(timeOffset, 2);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    var drift = timeVariance > 0 ? covariance / timeVariance * duration : Infinity;
    settled = Math.abs(drift) <= MAX_PITCH_DRIFT_CENTS;
  }
  return {
    midi: frequencyToMidi(settledFrequency),
    frequency: settledFrequency,
    count: samples.length,
    samples: samples,
    settled: settled
  };
}
function inputLevel(buffer) {
  var rms = 0;
  var peak = 0;
  for (var i = 0; i < buffer.length; i += 1) {
    var sample = Math.abs(buffer[i]);
    rms += buffer[i] * buffer[i];
    if (sample > peak) peak = sample;
  }
  rms = Math.sqrt(rms / buffer.length);
  return {
    rms: rms,
    peak: peak
  };
}
function detectPlayedNotePitch(buffer, sampleRate) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
    _ref$sensitivity = _ref.sensitivity,
    sensitivity = _ref$sensitivity === void 0 ? DEFAULT_MIC_SENSITIVITY : _ref$sensitivity;
  var level = Number.isFinite(sensitivity) ? Math.max(0, Math.min(100, sensitivity)) : DEFAULT_MIC_SENSITIVITY;
  var thresholdScale = Math.pow(4, (50 - level) / 50);
  var minRms = 0.0008 * thresholdScale;
  var minPeak = 0.003 * thresholdScale;
  var trimThreshold = minPeak * 0.75;
  var minConfidence = 0.18;
  var _inputLevel = inputLevel(buffer),
    rms = _inputLevel.rms,
    peak = _inputLevel.peak;
  if (rms < minRms || peak < minPeak) return null;
  var start = 0;
  var end = buffer.length - 1;
  for (var i = 0; i < buffer.length / 2; i += 1) {
    if (Math.abs(buffer[i]) < trimThreshold) {
      start = i;
      break;
    }
  }
  for (var _i = 1; _i < buffer.length / 2; _i += 1) {
    if (Math.abs(buffer[buffer.length - _i]) < trimThreshold) {
      end = buffer.length - _i;
      break;
    }
  }
  var trimmed = buffer.slice(start, end);
  var trimmedSize = trimmed.length;
  if (trimmedSize < 32) return null;
  var minLag = Math.max(1, Math.floor(sampleRate / 2000));
  var maxLag = Math.min(trimmedSize - 1, Math.ceil(sampleRate / 40));
  var correlations = new Array(maxLag + 1).fill(0);
  var zeroLag = 0;
  for (var _i2 = 0; _i2 < trimmedSize; _i2 += 1) {
    zeroLag += trimmed[_i2] * trimmed[_i2];
  }
  if (zeroLag <= 0) return null;
  for (var lag = minLag; lag <= maxLag; lag += 1) {
    for (var _i3 = 0; _i3 < trimmedSize - lag; _i3 += 1) {
      correlations[lag] += trimmed[_i3] * trimmed[_i3 + lag];
    }
  }
  var maxValue = -Infinity;
  var maxPosition = -1;
  for (var _i4 = minLag; _i4 <= maxLag; _i4 += 1) {
    if (correlations[_i4] > maxValue) {
      maxValue = correlations[_i4];
      maxPosition = _i4;
    }
  }
  if (maxPosition <= 0) return null;
  var confidence = maxValue / zeroLag;
  if (confidence < minConfidence) return null;
  var x1 = correlations[maxPosition - 1] || 0;
  var x2 = correlations[maxPosition] || 0;
  var x3 = correlations[maxPosition + 1] || 0;
  var divisor = 2 * x2 - x1 - x3;
  var shift = divisor ? (x3 - x1) / (2 * divisor) : 0;
  var frequency = sampleRate / (maxPosition + shift);
  if (!Number.isFinite(frequency) || frequency < 40 || frequency > 2000) return null;
  return {
    frequency: frequency
  };
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
/*!******************************************!*\
  !*** ./resources/js/music/microphone.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./games/shared/playedNotePitch.js */ "./resources/js/music/games/shared/playedNotePitch.js");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

var form = document.getElementById("microphone-settings");
if (form) {
  var sensitivity = document.getElementById("mic-sensitivity");
  var settle = document.getElementById("mic-settle-ms");
  var sensitivityValue = document.getElementById("mic-sensitivity-value");
  var settleValue = document.getElementById("mic-settle-value");
  var toggle = document.getElementById("mic-test-toggle");
  var status = document.getElementById("mic-test-status");
  var currentNote = document.getElementById("mic-current-note");
  var capturedNote = document.getElementById("mic-captured-note");
  var levelMeter = document.getElementById("mic-level-meter");
  var levelBar = document.getElementById("mic-level-bar");
  var save = document.getElementById("mic-save");
  var saveStatus = document.getElementById("mic-save-status");
  var names = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  var stream = null;
  var context = null;
  var analyser = null;
  var data = null;
  var frame = null;
  var requestId = 0;
  var stable = (0,_games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__.createStablePitchState)();
  var noteName = function noteName(frequency) {
    var midi = (0,_games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__.frequencyToMidi)(frequency);
    return "".concat(names[(midi % 12 + 12) % 12]).concat(Math.floor(midi / 12) - 1);
  };
  var showValues = function showValues() {
    sensitivityValue.textContent = "".concat(sensitivity.value, "%");
    settleValue.textContent = "".concat((Number(settle.value) / 1000).toFixed(1), " seconds");
    stable = (0,_games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__.createStablePitchState)();
    saveStatus.textContent = "Unsaved changes";
  };
  sensitivity.addEventListener("input", showValues);
  settle.addEventListener("input", showValues);
  var stop = function stop() {
    var _stream, _context;
    requestId += 1;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    (_stream = stream) === null || _stream === void 0 || _stream.getTracks().forEach(function (track) {
      return track.stop();
    });
    (_context = context) === null || _context === void 0 || _context.close();
    stream = null;
    context = null;
    analyser = null;
    data = null;
    stable = (0,_games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__.createStablePitchState)();
    toggle.textContent = "Start listening";
    toggle.disabled = false;
    levelBar.style.width = "0%";
    levelMeter.setAttribute("aria-valuenow", "0");
  };
  var _listen = function listen() {
    if (!analyser || !context) return;
    analyser.getFloatTimeDomainData(data);
    var _inputLevel = (0,_games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__.inputLevel)(data),
      rms = _inputLevel.rms;
    var level = Math.min(100, Math.round(rms * 10000));
    levelBar.style.width = "".concat(level, "%");
    levelMeter.setAttribute("aria-valuenow", String(level));
    var pitch = (0,_games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__.detectPlayedNotePitch)(data, context.sampleRate, {
      sensitivity: Number(sensitivity.value)
    });
    if (pitch) {
      stable = (0,_games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__.updateStablePitchState)(stable, pitch.frequency, context.currentTime * 1000, Number(settle.value));
      currentNote.textContent = noteName(pitch.frequency);
      if (stable.settled) {
        capturedNote.textContent = noteName(stable.frequency);
        status.textContent = "Captured ".concat(capturedNote.textContent, ". Keep playing to test another note.");
      } else {
        status.textContent = "Hearing a note. Waiting for a steady pitch…";
      }
    } else {
      stable = (0,_games_shared_playedNotePitch_js__WEBPACK_IMPORTED_MODULE_0__.createStablePitchState)();
      currentNote.textContent = "—";
      status.textContent = "Listening… Play or sing a note at your normal volume.";
    }
    frame = requestAnimationFrame(_listen);
  };
  toggle.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var _navigator$mediaDevic;
    var id, _context$resume, _context2, opened, AudioContextCtor, source, _t;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!(stream || context)) {
            _context3.n = 1;
            break;
          }
          stop();
          status.textContent = "Microphone stopped.";
          return _context3.a(2);
        case 1:
          if (!(!window.isSecureContext || !((_navigator$mediaDevic = navigator.mediaDevices) !== null && _navigator$mediaDevic !== void 0 && _navigator$mediaDevic.getUserMedia) || !(window.AudioContext || window.webkitAudioContext))) {
            _context3.n = 2;
            break;
          }
          status.textContent = "Microphone unavailable. Use HTTPS or localhost in a browser with microphone access.";
          return _context3.a(2);
        case 2:
          id = ++requestId;
          toggle.disabled = true;
          status.textContent = "Connecting to the microphone…";
          _context3.p = 3;
          _context3.n = 4;
          return navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: true
            }
          });
        case 4:
          opened = _context3.v;
          if (!(id !== requestId)) {
            _context3.n = 5;
            break;
          }
          opened.getTracks().forEach(function (track) {
            return track.stop();
          });
          return _context3.a(2);
        case 5:
          stream = opened;
          AudioContextCtor = window.AudioContext || window.webkitAudioContext;
          context = new AudioContextCtor();
          _context3.n = 6;
          return (_context$resume = (_context2 = context).resume) === null || _context$resume === void 0 ? void 0 : _context$resume.call(_context2);
        case 6:
          if (!(id !== requestId)) {
            _context3.n = 7;
            break;
          }
          return _context3.a(2);
        case 7:
          source = context.createMediaStreamSource(stream);
          analyser = context.createAnalyser();
          analyser.fftSize = 8192;
          data = new Float32Array(analyser.fftSize);
          source.connect(analyser);
          toggle.textContent = "Stop listening";
          toggle.disabled = false;
          status.textContent = "Listening… Play or sing a note at your normal volume.";
          _listen();
          _context3.n = 10;
          break;
        case 8:
          _context3.p = 8;
          _t = _context3.v;
          if (!(id !== requestId)) {
            _context3.n = 9;
            break;
          }
          return _context3.a(2);
        case 9:
          stop();
          status.textContent = "Microphone access failed. Allow microphone access and try again.";
        case 10:
          return _context3.a(2);
      }
    }, _callee, null, [[3, 8]]);
  })));
  window.addEventListener("pagehide", stop);
  form.addEventListener("submit", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(event) {
      var response, _yield$response$json, settings, _t2;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            event.preventDefault();
            save.disabled = true;
            sensitivity.disabled = true;
            settle.disabled = true;
            saveStatus.textContent = "Saving…";
            _context4.p = 1;
            _context4.n = 2;
            return fetch(form.dataset.saveUrl, {
              method: "PATCH",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
              },
              body: JSON.stringify({
                sensitivity: Number(sensitivity.value),
                settleMs: Number(settle.value)
              })
            });
          case 2:
            response = _context4.v;
            if (response.ok) {
              _context4.n = 3;
              break;
            }
            throw new Error("Save failed (".concat(response.status, ")"));
          case 3:
            _context4.n = 4;
            return response.json();
          case 4:
            _yield$response$json = _context4.v;
            settings = _yield$response$json.settings;
            sensitivity.value = settings.sensitivity;
            settle.value = settings.settleMs;
            sensitivityValue.textContent = "".concat(settings.sensitivity, "%");
            settleValue.textContent = "".concat((settings.settleMs / 1000).toFixed(1), " seconds");
            saveStatus.textContent = "Saved. Your games will use these settings.";
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t2 = _context4.v;
            saveStatus.textContent = "Could not save. Please try again.";
          case 6:
            _context4.p = 6;
            save.disabled = false;
            sensitivity.disabled = false;
            settle.disabled = false;
            return _context4.f(6);
          case 7:
            return _context4.a(2);
        }
      }, _callee2, null, [[1, 5, 6, 7]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
}
})();

/******/ })()
;