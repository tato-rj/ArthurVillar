/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/offline.js"
/*!*********************************!*\
  !*** ./resources/js/offline.js ***!
  \*********************************/
(module) {

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var PROBE_PATH = '/_connectivity';
var PROBE_TIMEOUT = 5000;
var CONFIRMATION_DELAY = 650;
var ONLINE_CHECK_INTERVAL = 45000;
var OFFLINE_CHECK_INTERVAL = 10000;
var delay = function delay(milliseconds) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, milliseconds);
  });
};
var startOfflineDetection = function startOfflineDetection() {
  var offlineState = document.querySelector('[data-offline-state]');
  if (!offlineState || typeof window.fetch !== 'function') {
    return;
  }
  var retryButton = offlineState.querySelector('[data-offline-retry]');
  var retryLabel = offlineState.querySelector('[data-offline-retry-label]');
  var description = offlineState.querySelector('[data-offline-description]');
  var defaultMessage = description.dataset.defaultMessage;
  var activeCheck = null;
  var nextCheck = null;
  var previouslyFocusedElement = null;
  var setChecking = function setChecking(isChecking) {
    offlineState.classList.toggle('is-checking', isChecking);
    retryButton.disabled = isChecking;
    retryButton.setAttribute('aria-busy', String(isChecking));
    retryLabel.textContent = isChecking ? 'Checking…' : 'Try again';
  };
  var setOffline = function setOffline(isOffline) {
    var wasHidden = offlineState.hidden;
    offlineState.hidden = !isOffline;
    offlineState.setAttribute('aria-hidden', String(!isOffline));
    document.documentElement.classList.toggle('is-offline', isOffline);
    if (isOffline && wasHidden) {
      previouslyFocusedElement = document.activeElement;
      window.requestAnimationFrame(function () {
        return retryButton.focus({
          preventScroll: true
        });
      });
    }
    if (!isOffline && !wasHidden) {
      description.textContent = defaultMessage;
      setChecking(false);
      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus({
          preventScroll: true
        });
      }
      previouslyFocusedElement = null;
    }
  };
  var probe = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var controller, timeout, url, response, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (navigator.onLine) {
              _context.n = 1;
              break;
            }
            return _context.a(2, false);
          case 1:
            controller = typeof AbortController === 'function' ? new AbortController() : null;
            timeout = window.setTimeout(function () {
              return controller === null || controller === void 0 ? void 0 : controller.abort();
            }, PROBE_TIMEOUT);
            url = new URL(PROBE_PATH, window.location.origin);
            url.searchParams.set('_', Date.now().toString());
            _context.p = 2;
            _context.n = 3;
            return window.fetch(url.toString(), {
              cache: 'no-store',
              credentials: 'same-origin',
              headers: {
                Accept: 'text/plain'
              },
              signal: controller === null || controller === void 0 ? void 0 : controller.signal
            });
          case 3:
            response = _context.v;
            return _context.a(2, response.status === 204 && response.headers.get('X-Connectivity') === 'online');
          case 4:
            _context.p = 4;
            _t = _context.v;
            return _context.a(2, false);
          case 5:
            _context.p = 5;
            window.clearTimeout(timeout);
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4, 5, 6]]);
    }));
    return function probe() {
      return _ref.apply(this, arguments);
    };
  }();
  var checkConnectivity = function checkConnectivity() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$confirmFailure = _ref2.confirmFailure,
      confirmFailure = _ref2$confirmFailure === void 0 ? true : _ref2$confirmFailure,
      _ref2$manual = _ref2.manual,
      manual = _ref2$manual === void 0 ? false : _ref2$manual;
    if (activeCheck) {
      return activeCheck;
    }
    if (manual) {
      setChecking(true);
      description.textContent = defaultMessage;
    }
    activeCheck = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var isOnline;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return probe();
          case 1:
            isOnline = _context2.v;
            if (!(!isOnline && confirmFailure && navigator.onLine)) {
              _context2.n = 4;
              break;
            }
            _context2.n = 2;
            return delay(CONFIRMATION_DELAY);
          case 2:
            _context2.n = 3;
            return probe();
          case 3:
            isOnline = _context2.v;
          case 4:
            setOffline(!isOnline);
            if (!isOnline && manual) {
              description.textContent = 'Still offline. The piano is committed to the bit.';
            }
            return _context2.a(2, isOnline);
        }
      }, _callee2);
    }))()["finally"](function () {
      activeCheck = null;
      if (manual) {
        setChecking(false);
      }
    });
    return activeCheck;
  };
  var _scheduleCheck = function scheduleCheck() {
    window.clearTimeout(nextCheck);
    nextCheck = window.setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(document.visibilityState !== 'hidden')) {
              _context3.n = 1;
              break;
            }
            _context3.n = 1;
            return checkConnectivity();
          case 1:
            _scheduleCheck();
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    })), offlineState.hidden ? ONLINE_CHECK_INTERVAL : OFFLINE_CHECK_INTERVAL);
  };
  retryButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return checkConnectivity({
            confirmFailure: false,
            manual: true
          });
        case 1:
          _scheduleCheck();
        case 2:
          return _context4.a(2);
      }
    }, _callee4);
  })));
  window.addEventListener('offline', function () {
    setOffline(true);
    _scheduleCheck();
  });
  window.addEventListener('online', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return checkConnectivity({
            confirmFailure: false
          });
        case 1:
          _scheduleCheck();
        case 2:
          return _context5.a(2);
      }
    }, _callee5);
  })));
  document.addEventListener('visibilitychange', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          if (!(document.visibilityState === 'visible')) {
            _context6.n = 2;
            break;
          }
          _context6.n = 1;
          return checkConnectivity();
        case 1:
          _scheduleCheck();
        case 2:
          return _context6.a(2);
      }
    }, _callee6);
  })));
  if (!navigator.onLine) {
    setOffline(true);
    _scheduleCheck();
    return;
  }
  checkConnectivity()["finally"](_scheduleCheck);
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startOfflineDetection, {
    once: true
  });
} else {
  startOfflineDetection();
}
module.exports = startOfflineDetection;

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./resources/js/offline.js");
/******/ 	
/******/ })()
;