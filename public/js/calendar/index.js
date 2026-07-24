/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/dompurify/dist/purify.cjs.js"
/*!***************************************************!*\
  !*** ./node_modules/dompurify/dist/purify.cjs.js ***!
  \***************************************************/
(module) {

"use strict";
/*! @license DOMPurify 3.4.12 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.12/LICENSE */



function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

const entries = Object.entries,
  setPrototypeOf = Object.setPrototypeOf,
  isFrozen = Object.isFrozen,
  getPrototypeOf = Object.getPrototypeOf,
  getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
let freeze = Object.freeze,
  seal = Object.seal,
  create = Object.create; // eslint-disable-line import/no-mutable-exports
let _ref = typeof Reflect !== 'undefined' && Reflect,
  apply = _ref.apply,
  construct = _ref.construct;
if (!freeze) {
  freeze = function freeze(x) {
    return x;
  };
}
if (!seal) {
  seal = function seal(x) {
    return x;
  };
}
if (!apply) {
  apply = function apply(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const arrayIsArray = Array.isArray;
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const numberToString = unapply(Number.prototype.toString);
const booleanToString = unapply(Boolean.prototype.toString);
const bigintToString = typeof BigInt === 'undefined' ? null : unapply(BigInt.prototype.toString);
const symbolToString = typeof Symbol === 'undefined' ? null : unapply(Symbol.prototype.toString);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const objectToString = unapply(Object.prototype.toString);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
/**
 * Creates a new function that calls the given function with a specified thisArg and arguments.
 *
 * @param func - The function to be wrapped and called.
 * @returns A new function that calls the given function with a specified thisArg and arguments.
 */
function unapply(func) {
  return function (thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply(func, thisArg, args);
  };
}
/**
 * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
 *
 * @param func - The constructor function to be wrapped and called.
 * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
 */
function unconstruct(Func) {
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
/**
 * Add properties to a lookup table
 *
 * @param set - The set to which elements will be added.
 * @param array - The array containing elements to be added to the set.
 * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
 * @returns The modified set with added elements.
 */
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    // Make 'in' and truthy checks like Boolean(set.constructor)
    // independent of any properties defined on Object.prototype.
    // Prevent prototype setters from intercepting set as a this value.
    setPrototypeOf(set, null);
  }
  if (!arrayIsArray(array)) {
    return set;
  }
  let l = array.length;
  while (l--) {
    let element = array[l];
    if (typeof element === 'string') {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        // Config presets (e.g. tags.js, attrs.js) are immutable.
        if (!isFrozen(array)) {
          array[l] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
/**
 * Clean up an array to harden against CSPP
 *
 * @param array - The array to be cleaned.
 * @returns The cleaned version of the array
 */
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
/**
 * Shallow clone an object
 *
 * @param object - The object to be cloned.
 * @returns A new object that copies the original.
 */
function clone(object) {
  const newObject = create(null);
  for (const _ref2 of entries(object)) {
    var _ref3 = _slicedToArray(_ref2, 2);
    const property = _ref3[0];
    const value = _ref3[1];
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (arrayIsArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === 'object' && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
/**
 * Convert non-node values into strings without depending on direct property access.
 *
 * @param value - The value to stringify.
 * @returns A string representation of the provided value.
 */
function stringifyValue(value) {
  switch (typeof value) {
    case 'string':
      {
        return value;
      }
    case 'number':
      {
        return numberToString(value);
      }
    case 'boolean':
      {
        return booleanToString(value);
      }
    case 'bigint':
      {
        return bigintToString ? bigintToString(value) : '0';
      }
    case 'symbol':
      {
        return symbolToString ? symbolToString(value) : 'Symbol()';
      }
    case 'undefined':
      {
        return objectToString(value);
      }
    case 'function':
    case 'object':
      {
        if (value === null) {
          return objectToString(value);
        }
        const valueAsRecord = value;
        const valueToString = lookupGetter(valueAsRecord, 'toString');
        if (typeof valueToString === 'function') {
          const stringified = valueToString(valueAsRecord);
          return typeof stringified === 'string' ? stringified : objectToString(stringified);
        }
        return objectToString(value);
      }
    default:
      {
        return objectToString(value);
      }
  }
}
/**
 * This method automatically checks if the prop is function or getter and behaves accordingly.
 *
 * @param object - The object to look up the getter function in its prototype chain.
 * @param prop - The property name for which to find the getter function.
 * @returns The getter function found in the prototype chain or a fallback function.
 */
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === 'function') {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
function isRegex(value) {
  try {
    regExpTest(value, '');
    return true;
  } catch (_unused) {
    return false;
  }
}

const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'search', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);
const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'enterkeyhint', 'exportparts', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'inputmode', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'part', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
// List of SVG elements that are disallowed by default.
// We still need to know them so that we can do namespace
// checks properly in case one wants to add them to
// allow-list.
const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);
// Similarly to SVG, we want to know all MathML elements,
// even those that we disallow by default.
const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
const text = freeze(['#text']);

const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'command', 'commandfor', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'exportparts', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inert', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns']);
const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'amplitude', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dominant-baseline', 'dur', 'edgemode', 'elevation', 'end', 'exponent', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'mask-type', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'slope', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'tablevalues', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-orientation', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnalign', 'columnlines', 'columnspacing', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lquote', 'lspace', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

const MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
const ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
const TMPLIT_EXPR = seal(/\${[\w\W]*/g);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
// Markup-significant character probes used by _sanitizeElements.
// Shared module-level instances are safe despite the sticky /g flags:
// unapply() resets lastIndex for RegExp receivers before every call.
const ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
const COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
const FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
const SELF_CLOSING_TAG = seal(/\/>/i);

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
const NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12 // Deprecated
};
const getGlobal = function getGlobal() {
  return typeof window === 'undefined' ? null : window;
};
/**
 * Creates a no-op policy for internal use only.
 * Don't export this function outside this module!
 * @param trustedTypes The policy factory.
 * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
 * @return The policy created (or null, if Trusted Types
 * are not supported or creating the policy failed).
 */
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
    return null;
  }
  // Allow the callers to control the unique policy name
  // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
  // Policy creation with duplicate names throws in Trusted Types.
  let suffix = null;
  const ATTR_NAME = 'data-tt-policy-suffix';
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html) {
        return html;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_) {
    // Policy creation failed (most likely another DOMPurify script has
    // already run). Skip creating the policy, as this will only cause errors
    // if TT are enforced.
    console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
    return null;
  }
};
const _createHooksMap = function _createHooksMap() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
/**
 * Resolve a set-valued configuration option: a fresh set built from
 * cfg[key] when it is an own array property (seeded with a clone of
 * options.base when given, case-normalized via options.transform),
 * the fallback set otherwise.
 *
 * @param cfg the cloned, prototype-free configuration object
 * @param key the configuration property to read
 * @param fallback the set to use when the option is absent or not an array
 * @param options transform and optional base set to merge into
 * @returns the resolved set
 */
const _resolveSetOption = function _resolveSetOption(cfg, key, fallback, options) {
  return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
};
function createDOMPurify() {
  let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
  const DOMPurify = root => createDOMPurify(root);
  DOMPurify.version = '3.4.12';
  DOMPurify.removed = [];
  if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
    // Not running in a browser, provide a factory function
    // so that you can pass your own Window
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let document = window.document;
  const originalDocument = document;
  const currentScript = originalDocument.currentScript;
  window.DocumentFragment;
    const HTMLTemplateElement = window.HTMLTemplateElement,
    Node = window.Node,
    Element = window.Element,
    NodeFilter = window.NodeFilter,
    _window$NamedNodeMap = window.NamedNodeMap;
    _window$NamedNodeMap === void 0 ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap;
    window.HTMLFormElement;
    const DOMParser = window.DOMParser,
    trustedTypes = window.trustedTypes;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
  const remove = lookupGetter(ElementPrototype, 'remove');
  const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
  const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
  const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
  const getShadowRoot = lookupGetter(ElementPrototype, 'shadowRoot');
  const getAttributes = lookupGetter(ElementPrototype, 'attributes');
  const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, 'nodeType') : null;
  const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, 'nodeName') : null;
  // As per issue #47, the web-components registry is inherited by a
  // new document created via createHTMLDocument. As per the spec
  // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
  // a new empty registry is used when creating a template contents owner
  // document, so we use that as our parent document to ensure nothing
  // is inherited.
  if (typeof HTMLTemplateElement === 'function') {
    const template = document.createElement('template');
    if (template.content && template.content.ownerDocument) {
      document = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = '';
  // The instance's own internal Trusted Types policy. Unlike a caller-supplied
  // `TRUSTED_TYPES_POLICY`, this is created at most once — Trusted Types throws
  // on duplicate policy names — and is the only policy allowed to persist
  // across configurations and survive `clearConfig()`.
  let defaultTrustedTypesPolicy;
  let defaultTrustedTypesPolicyResolved = false;
  // Tracks whether we are already inside a call to the configured Trusted Types
  // policy (`createHTML` or `createScriptURL`). If a supplied policy callback
  // itself calls `DOMPurify.sanitize` (the cause of #1422), `sanitize` would
  // re-enter the policy and recurse until the stack overflows. We detect that
  // re-entry and throw a clear, actionable error instead. The guard is shared
  // across both callbacks, because either one re-entering `sanitize` triggers
  // the same unbounded recursion.
  let IN_TRUSTED_TYPES_POLICY = 0;
  const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy() {
    if (IN_TRUSTED_TYPES_POLICY > 0) {
      throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or ' + 'createScriptURL) must not call DOMPurify.sanitize, as that causes ' + 'infinite recursion. Do not pass a policy whose callbacks wrap ' + 'DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted ' + 'Types" section of the README.');
    }
  };
  const _createTrustedHTML = function _createTrustedHTML(html) {
    _assertNotInTrustedTypesPolicy();
    IN_TRUSTED_TYPES_POLICY++;
    try {
      return trustedTypesPolicy.createHTML(html);
    } finally {
      IN_TRUSTED_TYPES_POLICY--;
    }
  };
  const _createTrustedScriptURL = function _createTrustedScriptURL(scriptUrl) {
    _assertNotInTrustedTypesPolicy();
    IN_TRUSTED_TYPES_POLICY++;
    try {
      return trustedTypesPolicy.createScriptURL(scriptUrl);
    } finally {
      IN_TRUSTED_TYPES_POLICY--;
    }
  };
  // Lazily resolve (and cache) the instance's internal default policy.
  // Resolution is attempted at most once: a successful `createPolicy` cannot be
  // repeated (Trusted Types throws on duplicate names), and a failed or
  // unsupported attempt must not be retried on every parse.
  const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy() {
    if (!defaultTrustedTypesPolicyResolved) {
      defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      defaultTrustedTypesPolicyResolved = true;
    }
    return defaultTrustedTypesPolicy;
  };
  const _document = document,
    implementation = _document.implementation,
    createNodeIterator = _document.createNodeIterator,
    createDocumentFragment = _document.createDocumentFragment,
    getElementsByTagName = _document.getElementsByTagName;
  const importNode = originalDocument.importNode;
  let hooks = _createHooksMap();
  /**
   * Expose whether this browser supports running the full DOMPurify.
   */
  DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
  const MUSTACHE_EXPR$1 = MUSTACHE_EXPR,
    ERB_EXPR$1 = ERB_EXPR,
    TMPLIT_EXPR$1 = TMPLIT_EXPR,
    DATA_ATTR$1 = DATA_ATTR,
    ARIA_ATTR$1 = ARIA_ATTR,
    IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE$1 = ATTR_WHITESPACE,
    CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
  let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
  /**
   * We consider the elements and attributes below to be safe. Ideally
   * don't add any new ones but feel free to remove unwanted ones.
   */
  /* allowed element names */
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  /* Allowed attribute names */
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  /*
   * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
   * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
   * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
   * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
   */
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
  let FORBID_TAGS = null;
  /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
  let FORBID_ATTR = null;
  /* Config object to store ADD_TAGS/ADD_ATTR functions (when used as functions) */
  const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  /* Decide if ARIA attributes are okay */
  let ALLOW_ARIA_ATTR = true;
  /* Decide if custom data attributes are okay */
  let ALLOW_DATA_ATTR = true;
  /* Decide if unknown protocols are okay */
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  /* Decide if self-closing tags in attributes are allowed.
   * Usually removed due to a mXSS issue in jQuery 3.0 */
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  /* Output should be safe for common template engines.
   * This means, DOMPurify removes data attributes, mustaches and ERB
   */
  let SAFE_FOR_TEMPLATES = false;
  /* Output should be safe even for XML used within HTML and alike.
   * This means, DOMPurify removes comments when containing risky content.
   */
  let SAFE_FOR_XML = true;
  /* Decide if document with <html>... should be returned */
  let WHOLE_DOCUMENT = false;
  /* Track whether config is already set on this instance of DOMPurify. */
  let SET_CONFIG = false;
  /* Pristine allowlist bindings captured at setConfig() time. On the
   * persistent-config path sanitize() restores the sets from these before
   * the per-walk hook clone-guard, so a hook's in-call widening cannot
   * carry across calls. Null until setConfig() is called; reset by
   * clearConfig(). */
  let SET_CONFIG_ALLOWED_TAGS = null;
  let SET_CONFIG_ALLOWED_ATTR = null;
  /* Decide if all elements (e.g. style, script) must be children of
   * document.body. By default, browsers might move them to document.head */
  let FORCE_BODY = false;
  /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
   * string (or a TrustedHTML object if Trusted Types are supported).
   * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
   */
  let RETURN_DOM = false;
  /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
   * string  (or a TrustedHTML object if Trusted Types are supported) */
  let RETURN_DOM_FRAGMENT = false;
  /* Try to return a Trusted Type object instead of a string, return a string in
   * case Trusted Types are not supported  */
  let RETURN_TRUSTED_TYPE = false;
  /* Output should be free from DOM clobbering attacks?
   * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
   */
  let SANITIZE_DOM = true;
  /* Achieve full DOM Clobbering protection by isolating the namespace of named
   * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
   *
   * HTML/DOM spec rules that enable DOM Clobbering:
   *   - Named Access on Window (§7.3.3)
   *   - DOM Tree Accessors (§3.1.5)
   *   - Form Element Parent-Child Relations (§4.10.3)
   *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
   *   - HTMLCollection (§4.2.10.2)
   *
   * Namespace isolation is implemented by prefixing `id` and `name` attributes
   * with a constant string, i.e., `user-content-`
   */
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
  /* Keep element content when removing element? */
  let KEEP_CONTENT = true;
  /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
   * of importing it into a new Document and returning a sanitized copy */
  let IN_PLACE = false;
  /* Allow usage of profiles like html, svg and mathMl */
  let USE_PROFILES = {};
  /* Tags to ignore content of when KEEP_CONTENT is true */
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script',
  // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
  // the UA (customizable <select>) — including any on* handlers — and the
  // engine re-mirrors synchronously whenever a removal changes which
  // option/selectedcontent is current, even inside DOMPurify's inert
  // DOMParser document. Hoisting its children on removal re-inserts a fresh
  // mirror target ahead of the walk, which the engine refills, looping
  // forever (DoS) and amplifying output. Dropping its content on removal
  // (rather than hoisting) breaks that cascade; the content is a duplicate
  // of the option, which is sanitized on its own. See campaign-3 F1/F6.
  'selectedcontent', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
  /* Tags that are safe for data: URIs */
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
  /* Attributes safe for values like "javascript:" */
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
  const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
  const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
  const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  /* Document namespace */
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  /* Allowed XHTML+XML namespaces */
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze(['mi', 'mo', 'mn', 'ms', 'mtext']);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
  const DEFAULT_HTML_INTEGRATION_POINTS = freeze(['annotation-xml']);
  let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
  // Certain elements are allowed in both SVG and HTML
  // namespace. We need to specify them explicitly
  // so that they don't get erroneously deleted from
  // HTML namespace.
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
  /* Parsing of strict XHTML documents */
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
  const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
  let transformCaseFunc = null;
  /* Keep a reference to config to pass to hooks */
  let CONFIG = null;
  /* Ideally, do not touch anything below this line */
  /* ______________________________________________ */
  const formElement = document.createElement('form');
  const isRegexOrFunction = function isRegexOrFunction(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  /**
   * _parseConfig
   *
   * @param cfg optional config literal
   */
  // eslint-disable-next-line complexity
  const _parseConfig = function _parseConfig() {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    /* Shield configuration object from tampering */
    if (!cfg || typeof cfg !== 'object') {
      cfg = {};
    }
    /* Shield configuration object from prototype pollution */
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE =
    // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
    transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
    /* Set configuration parameters */
    ALLOWED_TAGS = _resolveSetOption(cfg, 'ALLOWED_TAGS', DEFAULT_ALLOWED_TAGS, {
      transform: transformCaseFunc
    });
    ALLOWED_ATTR = _resolveSetOption(cfg, 'ALLOWED_ATTR', DEFAULT_ALLOWED_ATTR, {
      transform: transformCaseFunc
    });
    ALLOWED_NAMESPACES = _resolveSetOption(cfg, 'ALLOWED_NAMESPACES', DEFAULT_ALLOWED_NAMESPACES, {
      transform: stringToString
    });
    URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, 'ADD_URI_SAFE_ATTR', DEFAULT_URI_SAFE_ATTRIBUTES, {
      transform: transformCaseFunc,
      base: DEFAULT_URI_SAFE_ATTRIBUTES
    });
    DATA_URI_TAGS = _resolveSetOption(cfg, 'ADD_DATA_URI_TAGS', DEFAULT_DATA_URI_TAGS, {
      transform: transformCaseFunc,
      base: DEFAULT_DATA_URI_TAGS
    });
    FORBID_CONTENTS = _resolveSetOption(cfg, 'FORBID_CONTENTS', DEFAULT_FORBID_CONTENTS, {
      transform: transformCaseFunc
    });
    FORBID_TAGS = _resolveSetOption(cfg, 'FORBID_TAGS', clone({}), {
      transform: transformCaseFunc
    });
    FORBID_ATTR = _resolveSetOption(cfg, 'FORBID_ATTR', clone({}), {
      transform: transformCaseFunc
    });
    USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === 'object' ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
    RETURN_DOM = cfg.RETURN_DOM || false; // Default false
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
    FORCE_BODY = cfg.FORCE_BODY || false; // Default false
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
    IN_PLACE = cfg.IN_PLACE || false; // Default false
    IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI; // Default regexp
    NAMESPACE = typeof cfg.NAMESPACE === 'string' ? cfg.NAMESPACE : HTML_NAMESPACE; // Default HTML namespace
    MATHML_TEXT_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'MATHML_TEXT_INTEGRATION_POINTS') && cfg.MATHML_TEXT_INTEGRATION_POINTS && typeof cfg.MATHML_TEXT_INTEGRATION_POINTS === 'object' ? clone(cfg.MATHML_TEXT_INTEGRATION_POINTS) : addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS); // Default built-in map
    HTML_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'HTML_INTEGRATION_POINTS') && cfg.HTML_INTEGRATION_POINTS && typeof cfg.HTML_INTEGRATION_POINTS === 'object' ? clone(cfg.HTML_INTEGRATION_POINTS) : addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS); // Default built-in map
    const customElementHandling = objectHasOwnProperty(cfg, 'CUSTOM_ELEMENT_HANDLING') && cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING === 'object' ? clone(cfg.CUSTOM_ELEMENT_HANDLING) : create(null);
    CUSTOM_ELEMENT_HANDLING = create(null);
    if (objectHasOwnProperty(customElementHandling, 'tagNameCheck') && isRegexOrFunction(customElementHandling.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck; // Default undefined
    }
    if (objectHasOwnProperty(customElementHandling, 'attributeNameCheck') && isRegexOrFunction(customElementHandling.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck; // Default undefined
    }
    if (objectHasOwnProperty(customElementHandling, 'allowCustomizedBuiltInElements') && typeof customElementHandling.allowCustomizedBuiltInElements === 'boolean') {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements; // Default undefined
    }
    seal(CUSTOM_ELEMENT_HANDLING);
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    /* Parse profile info */
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = create(null);
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    /* Always reset function-based ADD_TAGS / ADD_ATTR checks to prevent
     * leaking across calls when switching from function to array config */
    EXTRA_ELEMENT_HANDLING.tagCheck = null;
    EXTRA_ELEMENT_HANDLING.attributeCheck = null;
    /* Merge configuration parameters */
    if (objectHasOwnProperty(cfg, 'ADD_TAGS')) {
      if (typeof cfg.ADD_TAGS === 'function') {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else if (arrayIsArray(cfg.ADD_TAGS)) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (objectHasOwnProperty(cfg, 'ADD_ATTR')) {
      if (typeof cfg.ADD_ATTR === 'function') {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else if (arrayIsArray(cfg.ADD_ATTR)) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') && arrayIsArray(cfg.ADD_URI_SAFE_ATTR)) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (objectHasOwnProperty(cfg, 'FORBID_CONTENTS') && arrayIsArray(cfg.FORBID_CONTENTS)) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (objectHasOwnProperty(cfg, 'ADD_FORBID_CONTENTS') && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    /* Add #text in case KEEP_CONTENT is set to true */
    if (KEEP_CONTENT) {
      ALLOWED_TAGS['#text'] = true;
    }
    /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
    }
    /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ['tbody']);
      delete FORBID_TAGS.tbody;
    }
    // Re-derive the active Trusted Types policy from this configuration on
    // every parse. The active policy must never be sticky closure state that
    // outlives the config that set it: a caller-supplied policy left in place
    // after `clearConfig()` — or after a later call that supplied none, or
    // `TRUSTED_TYPES_POLICY: null` — could sign a subsequent "default"
    // `RETURN_TRUSTED_TYPE` result with a foreign, possibly unsafe policy.
    // See GHSA-vxr8-fq34-vvx9.
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      // A caller-supplied policy applies to this configuration only.
      const previousTrustedTypesPolicy = trustedTypesPolicy;
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      // Sign local variables required by `sanitize`. If the supplied policy's
      // `createHTML` is circular (i.e. it calls `DOMPurify.sanitize`), this
      // throws via the re-entrancy guard. Restore the previous policy first so
      // the instance is not left in a poisoned state. See #1422.
      try {
        emptyHTML = _createTrustedHTML('');
      } catch (error) {
        trustedTypesPolicy = previousTrustedTypesPolicy;
        throw error;
      }
    } else if (cfg.TRUSTED_TYPES_POLICY === null) {
      // Explicit opt-out for this call: perform no Trusted Types signing and
      // create nothing (so a strict `trusted-types` CSP that disallows a
      // `dompurify` policy can still call `sanitize` from inside its own
      // policy — see #1422). Resetting to `undefined` rather than a sticky
      // `null` also drops any previously retained caller policy, so it cannot
      // resurface on a later call, while still allowing the next config-less
      // call to restore the internal default policy. See GHSA-vxr8-fq34-vvx9.
      trustedTypesPolicy = undefined;
      emptyHTML = '';
    } else {
      // No policy supplied: keep the currently active policy if one is set — a
      // previously supplied policy is intentionally sticky across config-less
      // calls — otherwise fall back to the instance's own internal policy,
      // created at most once. (A policy supplied for a *single* call still
      // lingers by design; what must not linger is a policy whose configuration
      // has been torn down via `clearConfig()`, which restores the default.)
      if (trustedTypesPolicy === undefined) {
        trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
      }
      // Sign internal variables only when a policy is active. A falsy policy
      // (Trusted Types unsupported, creation failed, or an explicit opt-out)
      // leaves `emptyHTML` as a plain string, so we never call `.createHTML` on
      // a non-policy and throw. See #1422.
      if (trustedTypesPolicy && typeof emptyHTML === 'string') {
        emptyHTML = _createTrustedHTML('');
      }
    }
    // Prevent further manipulation of configuration.
    // Not available in IE8, Safari 5, etc.
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  /* Keep track of all possible SVG and MathML tags
   * so that we can perform the namespace checks
   * correctly. */
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  /**
   * Namespace rules for an element in the SVG namespace.
   *
   * @param tagName the element's lowercase tag name
   * @param parent the (possibly simulated) parent node
   * @param parentTagName the parent's lowercase tag name
   * @returns true if a spec-compliant parser could produce this element
   */
  const _checkSvgNamespace = function _checkSvgNamespace(tagName, parent, parentTagName) {
    // The only way to switch from HTML namespace to SVG
    // is via <svg>. If it happens via any other tag, then
    // it should be killed.
    if (parent.namespaceURI === HTML_NAMESPACE) {
      return tagName === 'svg';
    }
    // The only way to switch from MathML to SVG is via <svg>
    // if the parent is either <annotation-xml> or a MathML
    // text integration point.
    if (parent.namespaceURI === MATHML_NAMESPACE) {
      return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
    }
    // We only allow elements that are defined in SVG
    // spec. All others are disallowed in SVG namespace.
    return Boolean(ALL_SVG_TAGS[tagName]);
  };
  /**
   * Namespace rules for an element in the MathML namespace.
   *
   * @param tagName the element's lowercase tag name
   * @param parent the (possibly simulated) parent node
   * @param parentTagName the parent's lowercase tag name
   * @returns true if a spec-compliant parser could produce this element
   */
  const _checkMathMlNamespace = function _checkMathMlNamespace(tagName, parent, parentTagName) {
    // The only way to switch from HTML namespace to MathML
    // is via <math>. If it happens via any other tag, then
    // it should be killed.
    if (parent.namespaceURI === HTML_NAMESPACE) {
      return tagName === 'math';
    }
    // The only way to switch from SVG to MathML is via
    // <math> and HTML integration points
    if (parent.namespaceURI === SVG_NAMESPACE) {
      return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
    }
    // We only allow elements that are defined in MathML
    // spec. All others are disallowed in MathML namespace.
    return Boolean(ALL_MATHML_TAGS[tagName]);
  };
  /**
   * Namespace rules for an element in the HTML namespace.
   *
   * @param tagName the element's lowercase tag name
   * @param parent the (possibly simulated) parent node
   * @param parentTagName the parent's lowercase tag name
   * @returns true if a spec-compliant parser could produce this element
   */
  const _checkHtmlNamespace = function _checkHtmlNamespace(tagName, parent, parentTagName) {
    // The only way to switch from SVG to HTML is via
    // HTML integration points, and from MathML to HTML
    // is via MathML text integration points
    if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
      return false;
    }
    if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
      return false;
    }
    // We disallow tags that are specific for MathML
    // or SVG and should never appear in HTML namespace
    return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
  };
  /**
   * @param element a DOM element whose namespace is being checked
   * @returns Return false if the element has a
   *  namespace that a spec-compliant parser would never
   *  return. Return true otherwise.
   */
  const _checkValidNamespace = function _checkValidNamespace(element) {
    let parent = getParentNode(element);
    // In JSDOM, if we're inside shadow DOM, then parentNode
    // can be null. We just simulate parent in this case.
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: 'template'
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      return _checkSvgNamespace(tagName, parent, parentTagName);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      return _checkMathMlNamespace(tagName, parent, parentTagName);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      return _checkHtmlNamespace(tagName, parent, parentTagName);
    }
    // For XHTML and XML documents that support custom namespaces
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    // The code should never reach this place (this means
    // that the element somehow got namespace that is not
    // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
    // Return false just in case.
    return false;
  };
  /**
   * _forceRemove
   *
   * @param node a DOM node
   */
  const _forceRemove = function _forceRemove(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      getParentNode(node).removeChild(node);
    } catch (_) {
      /* The normal detach failed — this is reached for a parentless node
         (getParentNode() is null, so .removeChild throws). Element.prototype
         .remove() is itself a spec no-op on a parentless node, so a recorded
         "removal" would otherwise hand the caller back an intact,
         payload-bearing node (e.g. a detached IN_PLACE root the mXSS canary or
         the style-with-element-child rule decided to kill). Fail closed by
         throwing — exactly as a clobbered root does at the IN_PLACE entry —
         rather than trying to "neutralize" the node via its own methods.
         Neutralizing would mean calling getAttributeNames()/removeAttribute()
         on the node, both of which a <form> root can clobber via a named child
         (and _isClobbered does not even probe getAttributeNames), so the
         neutralize step could itself be silently defeated, leaving the payload
         intact. A throw touches only the cached, clobber-safe remove() and
         getParentNode(). Generalizes GHSA-r47g-fvhr-h676 (clobbered-form root)
         to every root-kill reason. REPORT-3.
                This lives inside the catch, so it never fires for a normally-removed
         in-tree node: those have a parent, removeChild() succeeds, and the
         catch is not entered. Only a kept (parentless) root reaches here. */
      remove(node);
      if (!getParentNode(node)) {
        throw typeErrorCreate('a node selected for removal could not be detached from its tree ' + 'and cannot be safely returned; refusing to sanitize in place');
      }
    }
  };
  /**
   * _neutralizeRoot
   *
   * Fail-closed teardown of an in-place root after the sanitize walk aborts
   * (campaign-3 F2). An internal throw mid-walk — e.g. a page-registered
   * custom element's reaction detaches a node so `_forceRemove`'s deliberate
   * parentless guard throws, or any other re-entrant engine mutation — would
   * otherwise leave the caller's *live* tree half-sanitized, with everything
   * after the abort point still carrying its handlers. There is no safe way
   * to resume the walk (the tree mutated under us), so we strip the root bare:
   * remove every child and every attribute, then let the caller's catch see
   * the original error. Clobber-safe (cached `remove`/`childNodes`/`attributes`
   * getters; the root was already clobber-pre-flighted at the IN_PLACE entry).
   *
   * @param root the in-place root to empty
   */
  const _neutralizeRoot = function _neutralizeRoot(root) {
    /* Strip every disallowed attribute (on* handlers included) off the whole
       subtree BEFORE detaching anything. Detaching first would hand back
       handler-bearing originals (e.g. an already-loading `<img onerror>`)
       whose queued resource event still fires in page scope after we throw.
       Clobber-safe reads; a doomed clobbered node's own attributes are
       irrelevant while its non-clobbered descendants are reached and scrubbed. */
    _neutralizeSubtree(root);
    const childNodes = getChildNodes(root);
    if (childNodes) {
      const snapshot = [];
      arrayForEach(childNodes, child => {
        arrayPush(snapshot, child);
      });
      arrayForEach(snapshot, child => {
        try {
          remove(child);
        } catch (_) {
          /* Best-effort teardown; a still-attached child is handled below */
        }
      });
    }
    const attributes = getAttributes(root);
    if (attributes) {
      for (let i = attributes.length - 1; i >= 0; --i) {
        const attribute = attributes[i];
        const name = attribute && attribute.name;
        if (typeof name === 'string') {
          try {
            root.removeAttribute(name);
          } catch (_) {
            /* Clobbered removeAttribute — ignore (fail-closed best effort) */
          }
        }
      }
    }
  };
  /**
   * _removeAttribute
   *
   * @param name an Attribute name
   * @param element a DOM node
   */
  const _removeAttribute = function _removeAttribute(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    // We void attribute values for unremovable "is" attributes
    if (name === 'is') {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_) {}
      } else {
        try {
          element.setAttribute(name, '');
        } catch (_) {}
      }
    }
  };
  /**
   * _stripDisallowedAttributes
   *
   * Removes every attribute the active configuration does not allow from a
   * single element, using the same allowlist as the main attribute pass (so
   * `on*` handlers go, but no `/^on/` blocklist is introduced). Used only to
   * neutralise nodes that are being discarded from an in-place tree.
   *
   * @param element the element to strip
   */
  const _stripDisallowedAttributes = function _stripDisallowedAttributes(element) {
    const attributes = getAttributes(element);
    if (!attributes) {
      return;
    }
    for (let i = attributes.length - 1; i >= 0; --i) {
      const attribute = attributes[i];
      const name = attribute && attribute.name;
      if (typeof name !== 'string' || ALLOWED_ATTR[transformCaseFunc(name)]) {
        continue;
      }
      try {
        element.removeAttribute(name);
      } catch (_) {
        /* Clobbered removeAttribute on a doomed node — ignore */
      }
    }
  };
  /**
   * _neutralizeSubtree
   *
   * Completes the audit-5 F1 fix across every removal path. The KEEP_CONTENT
   * move-hoist neutralises only disallowed-tag removals; clobber, mXSS-canary,
   * namespace, comment, processing-instruction and KEEP_CONTENT:false removals
   * all drop their subtree wholesale via `_forceRemove`. On the IN_PLACE path
   * those dropped nodes are detached from the caller's LIVE tree but a
   * handler-bearing original among them (an `<img onerror>`/`<video>` that was
   * loading) keeps its queued resource event, which fires in page scope after
   * sanitize returns. This walks a removed subtree and strips every attribute
   * the active configuration does not allow — so `on*` handlers are cancelled
   * through the SAME allowlist that governs kept nodes, not a separate `/^on/`
   * blocklist. Run synchronously before sanitize returns, i.e. before any
   * queued event can fire. Hook-free by design: these nodes leave the output,
   * so firing attribute hooks for them would be surprising. Clobber-safe reads;
   * a doomed clobbered node may shadow `removeAttribute` (its own attributes are
   * irrelevant — it is discarded — while its non-clobbered descendants, e.g.
   * the `<img>`, are reached and scrubbed).
   *
   * @param root the root of a removed subtree to neutralise
   */
  const _neutralizeSubtree = function _neutralizeSubtree(root) {
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop();
      const nodeType = getNodeType ? getNodeType(node) : node.nodeType;
      if (nodeType === NODE_TYPE.element) {
        _stripDisallowedAttributes(node);
      }
      const childNodes = getChildNodes(node);
      if (childNodes) {
        for (let i = childNodes.length - 1; i >= 0; --i) {
          stack.push(childNodes[i]);
        }
      }
    }
  };
  /**
   * _neutralizePatchLinkage
   *
   * IN_PLACE entry pre-pass (declarative-partial-updates / streaming
   * hardening, https://github.com/WICG/declarative-partial-updates).
   *
   * The main walk strips patch linkage (`for`/`patchsrc`) and removes range
   * markers (PIs / markup comments) node-by-node, in document order, AS it
   * reaches each node. On a live in-place root that leaves a window: from the
   * moment the root is connected until the walk arrives at a given node, that
   * node's linkage is live. A patch applied on connection/stream can fire as
   * a microtask during the walk and inject or teleport an unsanitized DOM
   * range into a region the iterator has already passed and will not revisit,
   * so the post-return "tree is sanitized" contract is violated. Sweep the
   * whole tree once up front and sever every linkage before the walk begins,
   * closing that window.
   *
   * This CANNOT undo a patch that already fired before sanitize ran — that is
   * the irreducible "do not IN_PLACE a live-connected attacker tree" caveat —
   * but it closes everything from sanitize-start onward. Gated on SAFE_FOR_XML
   * to group with the rest of the declarative-partial-updates handling and
   * stay overridable, consistent with the codebase.
   *
   * Clobber-safe traversal (cached childNodes getter); per-node try/catch so a
   * clobbered root cannot defeat the sweep of its non-clobbered descendants.
   *
   * NOTE (pending real-Chrome confirmation, see test/declarative-patch-probe
   * .html Q1): this mirrors the existing policy of keeping `for` on
   * <label>/<output>. If the shipping feature can drive a patch through a
   * surviving `for`-on-label/output + `id` pair, this pre-pass and the
   * attribute check at _isBasicCustomElement's caller must additionally drop
   * that pair on the IN_PLACE path. Left as-is until the taxonomy is verified.
   *
   * @param root the in-place root to sweep
   */
  const _neutralizePatchLinkage = function _neutralizePatchLinkage(root) {
    if (!SAFE_FOR_XML) {
      return;
    }
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop();
      const nodeType = getNodeType ? getNodeType(node) : node.nodeType;
      /* Remove range markers (the target side of a patch linkage): every
         processing instruction, and any markup-bearing comment. */
      if (nodeType === NODE_TYPE.processingInstruction || nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, node.data)) {
        try {
          remove(node);
        } catch (_) {
          /* Best-effort */
        }
        continue;
      }
      /* Strip patch-source attributes (the source side) off elements. */
      if (nodeType === NODE_TYPE.element) {
        const element = node;
        const lcTag = transformCaseFunc(getNodeName ? getNodeName(node) : node.nodeName);
        try {
          if (element.hasAttribute && element.hasAttribute('patchsrc')) {
            element.removeAttribute('patchsrc');
          }
          if (element.hasAttribute && element.hasAttribute('for') && lcTag !== 'label' && lcTag !== 'output') {
            element.removeAttribute('for');
          }
        } catch (_) {
          /* Clobbered removeAttribute/hasAttribute on a doomed node — ignore */
        }
      }
      const childNodes = getChildNodes(node);
      if (childNodes) {
        for (let i = childNodes.length - 1; i >= 0; --i) {
          stack.push(childNodes[i]);
        }
      }
    }
  };
  /**
   * _initDocument
   *
   * @param dirty - a string of dirty markup
   * @return a DOM, filled with the dirty markup
   */
  const _initDocument = function _initDocument(dirty) {
    /* Create a HTML document */
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = '<remove></remove>' + dirty;
    } else {
      /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
      // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
    }
    const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
    /*
     * Use the DOMParser API by default, fallback later if needs be
     * DOMParser not work for svg when has multiple root element.
     */
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_) {}
    }
    /* Use createHTMLDocument in case DOMParser is not available */
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, 'template', null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_) {
        // Syntax error if dirtyPayload is invalid xml
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    /* Work on whole document or just its body */
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  /**
   * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
   *
   * @param root The root element or node to start traversing on.
   * @return The created NodeIterator
   */
  const _createNodeIterator = function _createNodeIterator(root) {
    return createNodeIterator.call(root.ownerDocument || root, root,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
  };
  /**
   * Replace template expression syntax (mustache, ERB, template
   * literal) with a space; shared by all SAFE_FOR_TEMPLATES scrub
   * sites. Order matters: mustache, then ERB, then template literal.
   *
   * @param value the string to scrub
   * @returns the scrubbed string
   */
  const _stripTemplateExpressions = function _stripTemplateExpressions(value) {
    value = stringReplace(value, MUSTACHE_EXPR$1, ' ');
    value = stringReplace(value, ERB_EXPR$1, ' ');
    value = stringReplace(value, TMPLIT_EXPR$1, ' ');
    return value;
  };
  /**
   * Strip template-engine expressions ({{...}}, ${...}, <%...%>) from the
   * character data of an element subtree. Used as the final safety net for
   * SAFE_FOR_TEMPLATES on every DOM-returning code path so that expressions
   * which only form after text-node normalization (e.g. fragments split across
   * stripped elements) cannot survive into a template-evaluating framework.
   *
   * Walks text/comment/CDATA/processing-instruction nodes and mutates `.data`
   * in place rather than round-tripping through innerHTML. This preserves
   * descendant node references (important for IN_PLACE callers), avoids a
   * serialize/reparse cycle, and reads literal character data — which means
   * `<%...%>` in text content matches the ERB regex against its real bytes
   * instead of the HTML-entity-escaped form innerHTML would produce.
   *
   * Attribute values are not visited here; SAFE_FOR_TEMPLATES handling for
   * attributes is performed during the per-node `_sanitizeAttributes` pass.
   *
   * @param node The root element whose character data should be scrubbed.
   */
  const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
    var _node$querySelectorAl;
    node.normalize();
    const walker = createNodeIterator.call(node.ownerDocument || node, node,
    // eslint-disable-next-line no-bitwise
    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
    let currentNode = walker.nextNode();
    while (currentNode) {
      currentNode.data = _stripTemplateExpressions(currentNode.data);
      currentNode = walker.nextNode();
    }
    // NodeIterator does not descend into <template>.content per the DOM spec,
    // so we must explicitly recurse into each template's content fragment,
    // mirroring the approach used by _sanitizeShadowDOM.
    const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, 'template');
    if (templates) {
      arrayForEach(templates, tmpl => {
        if (_isDocumentFragment(tmpl.content)) {
          _scrubTemplateExpressions2(tmpl.content);
        }
      });
    }
  };
  /**
   * _isClobbered
   *
   * Detect DOM-clobbering on HTMLFormElement nodes. Form is the only HTML
   * interface with [LegacyOverrideBuiltIns]; a descendant element with a
   * `name` attribute matching a prototype property shadows that property
   * on direct reads. We use this check at the IN_PLACE entry-point and
   * during attribute sanitization to refuse clobbered forms.
   *
   * @param element element to check for clobbering attacks
   * @return true if clobbered, false if safe
   */
  const _isClobbered = function _isClobbered(element) {
    // Realm-independent tag-name probe. If we can't determine the tag
    // name at all, we can't reason about clobbering — return false
    // (the caller's other defences still apply).
    const realTagName = getNodeName ? getNodeName(element) : null;
    if (typeof realTagName !== 'string') {
      return false;
    }
    if (transformCaseFunc(realTagName) !== 'form') {
      return false;
    }
    return typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' ||
    // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    element.attributes !== getAttributes(element) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function' ||
    // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    element.nodeType !== getNodeType(element) ||
    // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
    // "childNodes" shadows the prototype getter. Direct reads of
    // form.childNodes from a clobbered form return the named child
    // instead of the real NodeList, so any walk that reads it directly
    // skips the form's real children. Compare the direct read to the
    // cached Node.prototype getter — when the form's named-property
    // getter intercepts the read, the two values differ and we flag
    // the form. This catches every clobbering child type (input,
    // select, etc.) regardless of whether the named child happens to
    // carry a numeric .length, which a typeof-based probe would miss
    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
    element.childNodes !== getChildNodes(element);
  };
  /**
   * Checks whether the given value is a DocumentFragment from any realm.
   *
   * The realm-independent replacement reads `nodeType` through the cached
   * Node.prototype getter and compares to the DOCUMENT_FRAGMENT_NODE
   * constant (11). nodeType is a numeric value resolved from the node's
   * internal slot, identical across realms for the same kind of node.
   *
   * @param value object to check
   * @return true if value is a DocumentFragment-shaped node from any realm
   */
  const _isDocumentFragment = function _isDocumentFragment(value) {
    if (!getNodeType || typeof value !== 'object' || value === null) {
      return false;
    }
    try {
      return getNodeType(value) === NODE_TYPE.documentFragment;
    } catch (_) {
      return false;
    }
  };
  /**
   * Checks whether the given object is a DOM node, including nodes that
   * originate from a different window/realm (e.g. an iframe's
   * contentDocument). The previous `value instanceof Node` check was
   * realm-bound: nodes from a different window failed it, causing
   * sanitize() to silently stringify them and reset IN_PLACE to false,
   * returning the original node unsanitized. See GHSA-4w3q-35jp-p934.
   *
   * @param value object to check whether it's a DOM node
   * @return true if value is a DOM node from any realm
   */
  const _isNode = function _isNode(value) {
    if (!getNodeType || typeof value !== 'object' || value === null) {
      return false;
    }
    try {
      return typeof getNodeType(value) === 'number';
    } catch (_) {
      return false;
    }
  };
  function _executeHooks(hooks, currentNode, data) {
    if (hooks.length === 0) {
      return;
    }
    arrayForEach(hooks, hook => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  /**
   * Structural-threat checks that condemn a node regardless of the
   * allowlists: mXSS via namespace confusion, risky CSS construction,
   * processing instructions, markup-bearing comments. Pure predicate;
   * the caller removes. Check order is load-bearing.
   *
   * @param currentNode the node to inspect
   * @param tagName the node's transformCaseFunc'd tag name
   * @return true if the node must be removed
   */
  const _isUnsafeNode = function _isUnsafeNode(currentNode, tagName) {
    /* Detect mXSS attempts abusing namespace confusion */
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) {
      return true;
    }
    /* Remove risky CSS construction leading to mXSS */
    if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === 'style' && _isNode(currentNode.firstElementChild)) {
      return true;
    }
    /* Remove any occurrence of processing instructions */
    if (currentNode.nodeType === NODE_TYPE.processingInstruction) {
      return true;
    }
    /* Remove any kind of possibly harmful comments */
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) {
      return true;
    }
    return false;
  };
  /**
   * Handle a node whose tag is forbidden or not allowlisted: keep
   * allowed custom elements (false return exits _sanitizeElements
   * early - the namespace and fallback-tag removal checks are
   * intentionally skipped for kept custom elements), else hoist
   * content per KEEP_CONTENT and remove.
   *
   * A kept custom element is the ONLY case in which this function
   * returns false, so the caller uses that return value to run the
   * afterSanitizeElements hook on the kept element and keep the
   * element-hook lifecycle consistent with normal allowlisted
   * elements (GHSA-c2j3-45gr-mqc4).
   *
   * @param currentNode the disallowed node
   * @param tagName the node's transformCaseFunc'd tag name
   * @return true if the node was removed, false if kept
   */
  const _sanitizeDisallowedNode = function _sanitizeDisallowedNode(currentNode, tagName) {
    /* Check if we have a custom element to handle */
    if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
      if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
        return false;
      }
      if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
        return false;
      }
    }
    /* Keep content except for bad-listed elements.
         Use the cached prototype getters exclusively — the previous code
         had `|| currentNode.parentNode` / `|| currentNode.childNodes`
         fallbacks, but the cached getters always return the canonical
         value (or null for a real parent-less node), so the fallback
         path was dead in safe cases and a clobbering surface in unsafe
         ones. Falsy cached results stay falsy; the `if (childNodes &&
         parentNode)` check already gates correctly. */
    if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
      const parentNode = getParentNode(currentNode);
      const childNodes = getChildNodes(currentNode);
      if (childNodes && parentNode) {
        const childCount = childNodes.length;
        /* In-place: hoist the *original* children so the iterator visits
             and sanitises them through the same allowlist pass as every other
             node. The caller built the tree in the live document, so the
             originals carry already-queued resource events (`<img onerror>`,
             `<video>`/`<audio>` error, lazy/`onload`, …); cloning would leave
             those originals detached but still armed, firing in page scope
             while the returned tree looked clean. Moving is safe in-place: the
             root is pre-validated as an allowed tag and so is never the node
             being removed, which keeps `parentNode` inside the iterator root
             and the relocated child inside the serialised tree.
                      Otherwise (string / DOM-copy paths): clone. The iterator is rooted
             at — and the result serialised from — `body`, so a restrictive
             ALLOWED_TAGS that removes `body` itself must leave its content in
             place, which only cloning does; and those paths parse into an
             inert document, so their discarded originals never had a queued
             event to neutralise.
                      `childNodes` is live; a tail-to-head walk keeps `childNodes[i]`
             valid whether we move (drops the trailing entry) or clone (leaves
             the list intact). */
        for (let i = childCount - 1; i >= 0; --i) {
          const hoisted = IN_PLACE ? childNodes[i] : cloneNode(childNodes[i], true);
          parentNode.insertBefore(hoisted, getNextSibling(currentNode));
        }
      }
    }
    _forceRemove(currentNode);
    return true;
  };
  /**
   * _sanitizeElements
   *
   * @protect nodeName
   * @protect textContent
   * @protect removeChild
   * @param currentNode to check for permission to exist
   * @return true if node was killed, false if left alive
   */
  // eslint-disable-next-line complexity
  const _sanitizeElements = function _sanitizeElements(currentNode, root) {
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    /* A hook may have detached the node — treat it as removed (see the
       detached-node comment after the uponSanitizeElement hook below). */
    if (currentNode !== root && getParentNode(currentNode) === null) {
      return true;
    }
    /* Check if element is clobbered or can clobber */
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Now let's check the element's type and name */
    const tagName = transformCaseFunc(getNodeName ? getNodeName(currentNode) : currentNode.nodeName);
    /* Execute a hook if present */
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    /* A hook may have detached the node from the tree — a long-standing
       user pattern (issue #469; draw.io-style foreignObject filtering).
       Per the cached, unclobberable parentNode getter the node is
       genuinely out of the tree, so it can reach neither the serialized
       output nor an IN_PLACE live tree; treat it as removed and stop
       processing it. Without this guard, the unsafe-node / namespace
       checks below would call _forceRemove on a parentless node and hit
       the REPORT-3 fail-closed throw — which exists for nodes DOMPurify
       wants gone but *cannot* detach (clobbered / parentless roots), the
       opposite of a node that is already safely gone. The walk root is
       exempt: a detached IN_PLACE root is legitimate input and must still
       be fully sanitized, and a kill-decision on it must keep hitting the
       REPORT-3 throw. Nodes detached by hooks are the hook's
       responsibility: they are not recorded in DOMPurify.removed and are
       not neutralized by the post-walk IN_PLACE pass. */
    if (currentNode !== root && getParentNode(currentNode) === null) {
      return true;
    }
    /* Remove mXSS vectors, processing instructions and risky comments */
    if (_isUnsafeNode(currentNode, tagName)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Remove element if anything forbids its presence */
    if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
      const removed = _sanitizeDisallowedNode(currentNode, tagName);
      /* A false return means the node is a custom element kept via
         CUSTOM_ELEMENT_HANDLING - the only keep path through
         _sanitizeDisallowedNode. Run afterSanitizeElements on it so the
         element-hook lifecycle matches normal allowlisted elements: a
         security policy applied in this hook (e.g. stripping an attribute
         from every surviving element) must not silently skip kept custom
         elements (GHSA-c2j3-45gr-mqc4). This mirrors the normal-element
         tail below - the hook runs, then the walker's subsequent
         _sanitizeAttributes pass sanitizes the element's attributes. The
         deliberately skipped namespace and fallback-tag removal checks stay
         skipped; they are removal decisions, not the hook contract. */
      if (removed === false) {
        _executeHooks(hooks.afterSanitizeElements, currentNode, null);
      }
      return removed;
    }
    /* Check whether element has a valid namespace.
       Realm-safe check (GHSA-hpcv-96wg-7vj8): use the cached Node.prototype
       nodeType getter rather than `instanceof Element`, which is realm-
       bound and short-circuits to false for any node minted in a different
       realm — letting a foreign-realm element with a forbidden namespace
       slip past the namespace check entirely. */
    const nt = getNodeType ? getNodeType(currentNode) : currentNode.nodeType;
    if (nt === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Make sure that older browsers don't get fallback-tag mXSS */
    if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    /* Sanitize element content to be template-safe */
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      /* Get the element's text content */
      const content = _stripTemplateExpressions(currentNode.textContent);
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  /**
   * _isValidAttribute
   *
   * @param lcTag Lowercase tag name of containing element.
   * @param lcName Lowercase attribute name.
   * @param value Attribute value.
   * @return Returns true if `value` is valid, otherwise false.
   */
  // eslint-disable-next-line complexity
  const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
    /* FORBID_ATTR must always win, even if ADD_ATTR predicate would allow it */
    if (FORBID_ATTR[lcName]) {
      return false;
    }
    /* Reject declarative-partial-updates patch-linkage attributes
       (https://github.com/WICG/declarative-partial-updates).
            Empirical note (Chrome 150, verified — see
       test/declarative-patch-probe-v3.html): expansion is NOT applied after
       sanitization. For the string path it fires during sanitize()'s own
       parse, so the walk sees and sanitizes the fully materialized expanded
       tree — teleports into MathML/SVG integration points included; a
       weaponized `<template for>`->`<img onerror>` comes back with the handler
       stripped. For the IN_PLACE path it fires on connection, before the walk.
       Either way DOMPurify is NOT blind to the patch.
            This removal is therefore defense-in-depth rather than the sole barrier:
       it prevents live linkage from surviving into the OUTPUT and re-expanding
       in the caller's context, and keeps behaviour deterministic if a future
       engine defers expansion. `for` is legitimate only on <label>/<output>;
       anywhere else (notably <template for>) it links the element to a patch
       target and teleports or removes an arbitrary DOM range by id/marker name.
       `patchsrc` fetches remote markup and is treated as a script-loading
       mechanism (CSP). Gated on SAFE_FOR_XML so the removal groups with the
       other structural-threat checks and stays overridable, consistent with
       the rest of the codebase. PI range markers are already removed by
       _isUnsafeNode. */
    if (SAFE_FOR_XML && lcName === 'patchsrc') {
      return false;
    }
    if (SAFE_FOR_XML && lcName === 'for' && lcTag !== 'label' && lcTag !== 'output') {
      return false;
    }
    /* Make sure attribute cannot clobber */
    if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
      return false;
    }
    const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
    /* Allow valid data-* attributes: At least one character after "-"
        (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
        XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
        We don't need to check the value; it's always URI safe. */
    if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) ; else if (!nameIsPermitted) {
      if (
      // First condition does a very basic check if a) it's basically a valid custom element tagname AND
      // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
      _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) ||
      // Alternative, second condition checks if it's an `is`-attribute, AND
      // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
      lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
        return false;
      }
      /* Check value is safe. First, is attr inert? If so, is safe */
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if (value) {
      return false;
    } else ;
    return true;
  };
  /* Names the HTML spec reserves from valid-custom-element-name; these must
   * never be treated as basic custom elements even when a permissive
   * CUSTOM_ELEMENT_HANDLING.tagNameCheck is configured. */
  const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, ['annotation-xml', 'color-profile', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'missing-glyph']);
  /**
   * _isBasicCustomElement
   * checks if at least one dash is included in tagName, and it's not the first char
   * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
   *
   * @param tagName name of the tag of the node to sanitize
   * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
   */
  const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
    return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
  };
  /**
   * Wrap an attribute value in the matching Trusted Types object when
   * the active policy requires it. Namespaced attributes pass through
   * unchanged (no TT support yet, see
   * https://bugs.chromium.org/p/chromium/issues/detail?id=1305293).
   *
   * @param lcTag lowercase tag name of the containing element
   * @param lcName lowercase attribute name
   * @param namespaceURI the attribute's namespace, if any
   * @param value the attribute value to wrap
   * @return the value, wrapped when Trusted Types demand it
   */
  const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value) {
    if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function' && !namespaceURI) {
      switch (trustedTypes.getAttributeType(lcTag, lcName)) {
        case 'TrustedHTML':
          {
            return _createTrustedHTML(value);
          }
        case 'TrustedScriptURL':
          {
            return _createTrustedScriptURL(value);
          }
      }
    }
    return value;
  };
  /**
   * Write a modified attribute value back onto the element. On
   * success, re-probe for clobbering introduced by the new value and
   * remove the element when found; otherwise pop the removal entry
   * recorded by the earlier _removeAttribute (long-standing pairing
   * with the SANITIZE_NAMED_PROPS path - do not "fix" casually). On
   * failure, remove the attribute instead.
   *
   * @param currentNode the element carrying the attribute
   * @param name the attribute name as present on the element
   * @param namespaceURI the attribute's namespace, if any
   * @param value the new attribute value
   */
  const _setAttributeValue = function _setAttributeValue(currentNode, name, namespaceURI, value) {
    try {
      if (namespaceURI) {
        currentNode.setAttributeNS(namespaceURI, name, value);
      } else {
        /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
        currentNode.setAttribute(name, value);
      }
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
      } else {
        arrayPop(DOMPurify.removed);
      }
    } catch (_) {
      _removeAttribute(name, currentNode);
    }
  };
  /**
   * _sanitizeAttributes
   *
   * @protect attributes
   * @protect nodeName
   * @protect removeAttribute
   * @protect setAttribute
   *
   * @param currentNode to sanitize
   */
  const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const attributes = currentNode.attributes;
    /* Check if we have attributes; if not we might have a text node */
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: '',
      attrValue: '',
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: undefined
    };
    let l = attributes.length;
    const lcTag = transformCaseFunc(currentNode.nodeName);
    /* Go backwards over all attributes; safely remove bad ones */
    while (l--) {
      const attr = attributes[l];
      const name = attr.name,
        namespaceURI = attr.namespaceURI,
        attrValue = attr.value;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === 'value' ? initValue : stringTrim(initValue);
      /* Execute a hook if present */
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      /* Full DOM Clobbering protection via namespace isolation,
       * Prefix id and name attributes with `user-content-`
       */
      if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name') && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
        // Remove the attribute with this value
        _removeAttribute(name, currentNode);
        // Prefix the value and later re-create the attribute with the sanitized value
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      // Else: already prefixed, leave the attribute alone — the prefix is
      // itself the clobbering protection, and re-applying it is incorrect.
      /* Work around a security issue with comments inside attributes */
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Make sure we cannot easily use animated hrefs, even if animations are allowed */
      if (lcName === 'attributename' && stringMatch(value, 'href')) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Did the hooks force-keep the attribute? */
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      /* Did the hooks approve of the attribute? */
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Work around a security issue in jQuery 3.0 */
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Sanitize attribute content to be template-safe */
      if (SAFE_FOR_TEMPLATES) {
        value = _stripTemplateExpressions(value);
      }
      /* Is `value` valid for this attribute? */
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      /* Handle attributes that require Trusted Types */
      value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
      /* Handle invalid data-* attribute set by try-catching it */
      if (value !== initValue) {
        _setAttributeValue(currentNode, name, namespaceURI, value);
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  /**
   * _sanitizeShadowDOM
   *
   * @param fragment to iterate over recursively
   */
  const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    /* Execute a hook if present */
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      /* Execute a hook if present */
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      /* Sanitize tags and elements */
      _sanitizeElements(shadowNode, fragment);
      /* Check attributes next */
      _sanitizeAttributes(shadowNode);
      /* Deep shadow DOM detected.
         Realm-safe check (GHSA-hpcv-96wg-7vj8): use nodeType against the
         DOCUMENT_FRAGMENT_NODE constant rather than instanceof, so we
         recurse into <template>.content from foreign realms too. */
      if (_isDocumentFragment(shadowNode.content)) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
      /* An element iterated here may itself host an attached
         shadow root. The default NodeIterator does not enter shadow
         trees, so a shadow root nested inside template.content was
         previously reached by no walk at all (the pre-pass at
         _sanitizeAttachedShadowRoots descends via childNodes, which
         doesn't enter template.content; the template-content recursion
         above iterates the content but never inspected shadowRoot).
         Walk it explicitly. The nodeType guard avoids reading
         shadowRoot off text / comment / CDATA / PI nodes that the
         iterator also surfaces. */
      const shadowNodeType = getNodeType ? getNodeType(shadowNode) : shadowNode.nodeType;
      if (shadowNodeType === NODE_TYPE.element) {
        const innerSr = getShadowRoot(shadowNode);
        if (_isDocumentFragment(innerSr)) {
          _sanitizeAttachedShadowRoots(innerSr);
          _sanitizeShadowDOM2(innerSr);
        }
      }
    }
    /* Execute a hook if present */
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  /**
   * _sanitizeAttachedShadowRoots
   *
   * Walks `root` and feeds every attached shadow root we encounter into
   * the existing _sanitizeShadowDOM pipeline. The default node iterator
   * does not descend into shadow trees, so nodes inside an attached
   * shadow root would otherwise be skipped entirely.
   *
   * Two real input paths put attached shadow roots in front of us:
   *   1. IN_PLACE on a DOM node that already has shadow roots attached.
   *   2. DOM-node input where importNode(dirty, true) deep-clones the
   *      shadow root because it was created with `clonable: true`.
   *
   * This pass runs once, up front, so the main iteration loop (and the
   * existing _sanitizeShadowDOM template-content recursion) stay
   * untouched — string-input paths are not affected.
   *
   * @param root the subtree root to walk for attached shadow roots
   */
  const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots(root) {
    /* Iterative (explicit stack) rather than per-child recursion. DOM APIs
       impose no depth cap, so an attacker-shaped tree (JSON/CRDT/editor data
       built straight into the DOM — the IN_PLACE surface) deeper than the JS
       call-stack budget would otherwise overflow native recursion here and
       throw at the IN_PLACE entry pre-pass, before a single node is
       sanitized, leaving the caller's live tree untouched (fail-open). See
       campaign-3 F4. A heap stack keeps depth off the call stack.
            Each work item is either a node to descend into, or a deferred
       `_sanitizeShadowDOM` for an already-walked shadow root. The deferred
       form preserves the original post-order discipline: a shadow root's
       nested shadow roots are discovered before the outer shadow is
       sanitized (which may remove hosts). Pushes are in reverse of the
       desired processing order (LIFO): template content, then children, then
       the shadow-sanitize, then the shadow walk — so the order matches the
       previous recursion exactly. */
    const stack = [{
      node: root,
      shadow: null
    }];
    while (stack.length > 0) {
      const item = stack.pop();
      /* Deferred shadow-DOM sanitisation: runs after its subtree was walked. */
      if (item.shadow) {
        _sanitizeShadowDOM2(item.shadow);
        continue;
      }
      const node = item.node;
      const nodeType = getNodeType ? getNodeType(node) : node.nodeType;
      const isElement = nodeType === NODE_TYPE.element;
      /* (pushed last → processed first) Children, snapshotted in reverse so
         the first child is processed first. Snapshotting matters because a
         hook may detach siblings mid-walk. */
      const childNodes = getChildNodes(node);
      if (childNodes) {
        for (let i = childNodes.length - 1; i >= 0; --i) {
          stack.push({
            node: childNodes[i],
            shadow: null
          });
        }
      }
      /* (pushed before children → processed after them, matching the old
         "template content last" order) When the node is a <template>,
         descend into its content. */
      if (isElement) {
        const rootName = getNodeName ? getNodeName(node) : null;
        if (typeof rootName === 'string' && transformCaseFunc(rootName) === 'template') {
          const content = node.content;
          if (_isDocumentFragment(content)) {
            stack.push({
              node: content,
              shadow: null
            });
          }
        }
      }
      /* Shadow root (processed first): walk its subtree, then sanitise it.
         Realm-safe check (GHSA-hpcv-96wg-7vj8): nodeType-based detection
         rather than `instanceof DocumentFragment`, which is realm-bound and
         silently skipped foreign-realm shadow roots (e.g.
         iframe.contentDocument attachShadow). */
      if (isElement) {
        const sr = getShadowRoot(node);
        if (_isDocumentFragment(sr)) {
          /* Push the deferred sanitise first so it pops after the shadow
             walk we push next, i.e. nested shadow roots are discovered
             before this one is sanitised. */
          stack.push({
            node: null,
            shadow: sr
          }, {
            node: sr,
            shadow: null
          });
        }
      }
    }
  };
  // eslint-disable-next-line complexity
  DOMPurify.sanitize = function (dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    /* Make sure we have a string to sanitize.
      DO NOT return early, as this will return the wrong type if
      the user has requested a DOM object rather than a string */
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = '<!-->';
    }
    /* Stringify, in case dirty is an object */
    if (typeof dirty !== 'string' && !_isNode(dirty)) {
      dirty = stringifyValue(dirty);
      if (typeof dirty !== 'string') {
        throw typeErrorCreate('dirty is not a string, aborting');
      }
    }
    /* Return dirty HTML if DOMPurify cannot run */
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    /* Assign config vars */
    if (SET_CONFIG) {
      /* Persistent setConfig() path: _parseConfig is skipped, so the sets are
       * not re-derived per call. Restore them from the pristine bindings
       * captured at setConfig() time so a previous call's hook clone (mutated
       * below) does not carry over. */
      ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
      ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
    } else {
      _parseConfig(cfg);
    }
    /* Clone the hook-mutable allowlists before the walk whenever an
     * uponSanitize* hook is registered. The hook event exposes ALLOWED_TAGS
     * and ALLOWED_ATTR by reference (as allowedTags / allowedAttributes), so
     * a hook that widens them would otherwise mutate the shared set
     * permanently: across later calls and across every element. Cloning per
     * walk keeps documented in-call widening working while scoping it to the
     * call. A single guard for both config paths - the per-call path rebinds
     * the sets in _parseConfig each call, the persistent path restores them
     * from the captured bindings just above - so the two cannot diverge. */
    if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) {
      ALLOWED_TAGS = clone(ALLOWED_TAGS);
    }
    if (hooks.uponSanitizeAttribute.length > 0) {
      ALLOWED_ATTR = clone(ALLOWED_ATTR);
    }
    /* Clean up removed elements */
    DOMPurify.removed = [];
    /* Resolve IN_PLACE for this call without mutating persistent config.
       Writing the IN_PLACE closure variable here leaks under setConfig(),
       where _parseConfig is skipped on later calls: a single string call would
       disable in-place mode for every subsequent node call, returning a
       sanitized copy while leaving the caller's node — which in-place callers
       keep using and whose return value they ignore — unsanitized. REPORT-2. */
    const inPlace = IN_PLACE && typeof dirty !== 'string' && _isNode(dirty);
    if (inPlace) {
      /* Declarative-partial-updates / streaming pre-pass: sever every patch
         linkage across the live tree BEFORE the walk, so no patch can fire
         mid-walk and inject into an already-processed region. Runs first, so
         it also covers the forbidden/clobbered roots that throw below. */
      _neutralizePatchLinkage(dirty);
      /* Do some early pre-sanitization to avoid unsafe root nodes.
         Read nodeName through the cached prototype getter — a clobbering
         child named "nodeName" on the form root would otherwise shadow
         the property and let this check skip the root-allowlist
         validation entirely. */
      const nn = getNodeName ? getNodeName(dirty) : dirty.nodeName;
      if (typeof nn === 'string') {
        const tagName = transformCaseFunc(nn);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          /* Fail closed on a live root: neutralize handlers/children before
             throwing, exactly as the mid-walk abort path does. */
          _neutralizeRoot(dirty);
          throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
        }
      }
      /* Pre-flight the root through _isClobbered. The iterator-driven
         removal path can not detach a parent-less root: _forceRemove
         falls through to Element.prototype.remove(), which per spec
         is a no-op on a node with no parent. A clobbered root would
         then survive the main loop with its attributes uninspected,
         because _sanitizeAttributes early-returns on _isClobbered. The
         result would be an attacker-controlled form, complete with any
         event-handler attributes the caller passed in, handed back to
         the application unsanitized. Refuse to sanitize such a root
         the same way we refuse a forbidden tag. GHSA-r47g-fvhr-h676. */
      if (_isClobbered(dirty)) {
        /* Fail closed on a live clobbered root before throwing.
           _neutralizeRoot's reads are clobber-safe (cached getters); the
           form's non-clobbered descendants, e.g. an armed <img>, are scrubbed. */
        _neutralizeRoot(dirty);
        throw typeErrorCreate('root node is clobbered and cannot be sanitized in-place');
      }
      /* Sanitize attached shadow roots before the main iterator runs.
         The iterator does not descend into shadow trees. Same fail-closed
         barrier as the main walk (campaign-3 F2): a custom-element reaction
         inside a shadow root could abort this pre-pass before the walk runs,
         which would otherwise leave the entire live tree unsanitized. */
      try {
        _sanitizeAttachedShadowRoots(dirty);
      } catch (error) {
        _neutralizeRoot(dirty);
        throw error;
      }
    } else if (_isNode(dirty)) {
      /* If dirty is a DOM element, append to an empty document to avoid
         elements being stripped by the parser */
      body = _initDocument('<!---->');
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
        /* Node is already a body, use as is */
        body = importedNode;
      } else if (importedNode.nodeName === 'HTML') {
        body = importedNode;
      } else {
        // eslint-disable-next-line unicorn/prefer-dom-node-append
        body.appendChild(importedNode);
      }
      /* Clonable shadow roots are deep-cloned by importNode(); sanitize
         them before the main iterator runs, since the iterator does not
         descend into shadow trees. The walk routes every read through a
         cached prototype getter so clobbering descendants on a form root
         cannot hide a shadow host from this pass. */
      _sanitizeAttachedShadowRoots(importedNode);
    } else {
      /* Exit directly if we have nothing to do */
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
      // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf('<') === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
      }
      /* Initialize the document to work on */
      body = _initDocument(dirty);
      /* Check we have a DOM node from the data */
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
      }
    }
    /* Remove first element node (ours) if FORCE_BODY is set */
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    /* Get node iterator */
    const walkRoot = inPlace ? dirty : body;
    const nodeIterator = _createNodeIterator(walkRoot);
    /* Now start iterating over the created document.
       The walk runs inside an exception barrier (campaign-3 F2): a re-entrant
       engine/custom-element mutation can detach a node mid-walk so
       `_forceRemove`'s parentless guard throws, aborting the loop. Without the
       barrier the caller's in-place tree would be left half-sanitized with the
       unvisited tail still armed. On any throw we fail closed — strip the
       in-place root bare — then rethrow so the existing throw contract is
       preserved. (String/DOM-copy paths never return the partial body, so the
       propagating throw is already fail-closed there.) */
    try {
      while (currentNode = nodeIterator.nextNode()) {
        /* Sanitize tags and elements */
        _sanitizeElements(currentNode, walkRoot);
        /* Check attributes next */
        _sanitizeAttributes(currentNode);
        /* Shadow DOM detected, sanitize it.
           Realm-safe check (GHSA-hpcv-96wg-7vj8): nodeType-based detection
           instead of instanceof, so foreign-realm <template>.content is
           walked correctly. */
        if (_isDocumentFragment(currentNode.content)) {
          _sanitizeShadowDOM2(currentNode.content);
        }
      }
    } catch (error) {
      if (inPlace) {
        _neutralizeRoot(dirty);
        /* Nodes _forceRemove'd earlier in the aborted walk are already
           detached from the root, so _neutralizeRoot's subtree pass does not
           reach them. Defuse them too, mirroring the success-path loop below. */
        arrayForEach(DOMPurify.removed, entry => {
          if (entry.element) {
            _neutralizeSubtree(entry.element);
          }
        });
      }
      throw error;
    }
    /* If we sanitized `dirty` in-place, return it. */
    if (inPlace) {
      /* Fail-closed completion of the audit-5 F1 fix: every node removed from
         the caller's live tree is detached but may still hold a queued
         resource-event handler that fires in page scope after we return. The
         move-hoist covers only disallowed-tag KEEP_CONTENT removals; strip the
         non-allow-listed attributes off every other removed subtree (clobber,
         mXSS, namespace, comments, KEEP_CONTENT:false, …) so those handlers are
         cancelled before any event can fire. Runs synchronously, pre-return. */
      arrayForEach(DOMPurify.removed, entry => {
        if (entry.element) {
          _neutralizeSubtree(entry.element);
        }
      });
      if (SAFE_FOR_TEMPLATES) {
        _scrubTemplateExpressions2(dirty);
      }
      return dirty;
    }
    /* Return sanitized string or DOM */
    if (RETURN_DOM) {
      if (SAFE_FOR_TEMPLATES) {
        _scrubTemplateExpressions2(body);
      }
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        /*
          AdoptNode() is not used because internal state is not reset
          (e.g. the past names map of a HTMLFormElement), this is safe
          in theory but we would rather not risk another attack vector.
          The state that is cloned by importNode() is explicitly defined
          by the specs.
        */
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    /* Serialize doctype if allowed */
    if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
    }
    /* Sanitize final string template-safe */
    if (SAFE_FOR_TEMPLATES) {
      serializedHTML = _stripTemplateExpressions(serializedHTML);
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function () {
    let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
    SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
    SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
  };
  DOMPurify.clearConfig = function () {
    CONFIG = null;
    SET_CONFIG = false;
    SET_CONFIG_ALLOWED_TAGS = null;
    SET_CONFIG_ALLOWED_ATTR = null;
    // Drop any caller-supplied Trusted Types policy so it cannot poison later
    // `RETURN_TRUSTED_TYPE` output. The internal default policy (cached, and
    // never recreated — Trusted Types throws on duplicate names) is restored by
    // the next `_parseConfig`. See GHSA-vxr8-fq34-vvx9.
    trustedTypesPolicy = defaultTrustedTypesPolicy;
    emptyHTML = '';
  };
  DOMPurify.isValidAttribute = function (tag, attr, value) {
    /* Initialize shared config vars if necessary. */
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function (entryPoint, hookFunction) {
    if (typeof hookFunction !== 'function') {
      return;
    }
    /* Reject unknown entry points. Without this, a non-hook key (e.g.
     * '__proto__') indexes off the prototype chain rather than a real
     * hook array, and arrayPush then writes to Object.prototype. Guard
     * with an own-property check against the known hook names. */
    if (!objectHasOwnProperty(hooks, entryPoint)) {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function (entryPoint, hookFunction) {
    if (!objectHasOwnProperty(hooks, entryPoint)) {
      return undefined;
    }
    if (hookFunction !== undefined) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function (entryPoint) {
    if (!objectHasOwnProperty(hooks, entryPoint)) {
      return;
    }
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function () {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();

module.exports = purify;
//# sourceMappingURL=purify.cjs.js.map


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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./resources/js/calendar/index.js ***!
  \****************************************/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var DOMPurify = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.cjs.js");
var calendarjs = window.calendarjs;
var state = {
  date: null,
  miniDate: null,
  view: 'week',
  instance: null,
  events: [],
  customEvents: [],
  plannedLessons: [],
  singleLessonPlans: [],
  locations: [],
  selectedLocationIds: [],
  visibleEventsByDate: null,
  holidays: [],
  showHolidays: true,
  teachingBreaks: [],
  recitals: [],
  generalEvents: [],
  selectedEventTypes: ['recurring', 'single', 'general', 'google'],
  studentSearch: '',
  loadedRange: null,
  pendingRangeKey: null,
  scheduleObserver: null,
  schedulePatchFrame: null,
  scheduleLabelFrame: null,
  schedulePointerTimer: null,
  rescheduleDatePickerDate: null,
  generalEventRescheduleDatePickerDate: null,
  rescheduleDurationMinutes: 15,
  rescheduleAnchor: null,
  paymentTotalCounters: {},
  calendarFetchId: 0,
  didAutoNowScroll: false,
  birthdayWindow: 5,
  suppressNextScheduleAnimation: false,
  scheduleWindowStart: null,
  pendingScheduleScrollTop: null,
  pendingScheduleHeaderPreview: null
};
var calendarTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York';
var monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  timeZone: calendarTimeZone,
  year: 'numeric'
});
var shortMonthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: calendarTimeZone
});
var birthdayMonthFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  timeZone: calendarTimeZone
});
var dayFormatter = new Intl.DateTimeFormat('en', {
  month: 'long',
  day: 'numeric',
  timeZone: calendarTimeZone,
  year: 'numeric'
});
var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthWeekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var calendarViews = ['schedule', 'day', '2-days', 'week', 'month'];
var scheduleStart = '07:00';
var scheduleEnd = '22:00';
var sidebarHiddenQuery = '(max-width: 1000px)';
var dayMilliseconds = 24 * 60 * 60 * 1000;
var scheduleGridViews = ['day', '2-days', 'week'];
var calendarEventTypes = ['recurring', 'single', 'general', 'google', 'canceled'];
var createLocalDate = function createLocalDate(year, month, day) {
  return new Date(year, month, day, 12, 0, 0, 0);
};
var toDateString = function toDateString(date) {
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  return "".concat(year, "-").concat(month, "-").concat(day);
};
var todayString = function todayString() {
  return toDateString(getTodayDate());
};
var parseDateString = function parseDateString(value) {
  var parts = String(value).split('-').map(Number);
  return createLocalDate(parts[0], parts[1] - 1, parts[2]);
};
var isDateString = function isDateString(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ''));
};
var isValidDate = function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
};
var normalizeBirthdayWindow = function normalizeBirthdayWindow(value) {
  var windowDays = Number(value);
  return Number.isFinite(windowDays) && windowDays >= 0 ? Math.floor(windowDays) : 5;
};
var parseUrlDate = function parseUrlDate(value) {
  if (!isDateString(value)) {
    return null;
  }
  var date = parseDateString(value);
  return toDateString(date) === value ? date : null;
};
var parseNullableDateString = function parseNullableDateString(value) {
  return value ? parseDateString(String(value).substring(0, 10)) : null;
};
var getDefaultCalendarView = function getDefaultCalendarView() {
  var isMobile = window.matchMedia && window.matchMedia('(max-width: 767.98px)').matches;
  var configuredView = isMobile ? window.calendarDefaultMobileCalendarView : window.calendarDefaultDesktopCalendarView;
  if (calendarViews.includes(configuredView)) {
    return configuredView;
  }
  return isMobile ? '2-days' : 'week';
};
var isSidebarHiddenViewport = function isSidebarHiddenViewport() {
  return window.matchMedia && window.matchMedia(sidebarHiddenQuery).matches;
};
var getUrlState = function getUrlState() {
  var params = new URLSearchParams(window.location.search);
  var requestedView = params.get('view');
  var view = requestedView === '3-days' ? '2-days' : requestedView;
  var date = params.get('date');
  var windowStart = params.get('window_start');
  var eventTypes = params.has('event_types') ? params.get('event_types').split(',').filter(function (type, index, types) {
    return calendarEventTypes.includes(type) && types.indexOf(type) === index;
  }) : null;
  var usesGoogleEventFilter = params.get('event_filter_version') === '2';
  if (eventTypes && !usesGoogleEventFilter && eventTypes.includes('general') && !eventTypes.includes('google')) {
    eventTypes.push('google');
  }
  var locationIds = params.has('location_ids') ? params.get('location_ids').split(',').map(normalizeLocationId).filter(function (id, index, ids) {
    return id && ids.indexOf(id) === index;
  }) : null;
  return {
    view: calendarViews.includes(view) ? view : getDefaultCalendarView(),
    date: parseUrlDate(date),
    windowStart: parseUrlDate(windowStart),
    eventTypes: eventTypes,
    locationIds: locationIds
  };
};
var updateCalendarUrl = function updateCalendarUrl() {
  var url = new URL(window.location.href);
  url.searchParams.set('view', state.view);
  url.searchParams.set('date', toDateString(state.date));
  if (state.view === 'week' && isValidDate(state.scheduleWindowStart)) {
    url.searchParams.set('window_start', toDateString(state.scheduleWindowStart));
  } else {
    url.searchParams["delete"]('window_start');
  }
  url.searchParams.set('event_types', state.selectedEventTypes.join(','));
  url.searchParams.set('event_filter_version', '2');
  url.searchParams.set('location_ids', state.selectedLocationIds.join(','));
  window.history.replaceState({
    calendarView: state.view,
    calendarDate: toDateString(state.date),
    calendarEventTypes: state.selectedEventTypes.slice(),
    calendarLocationIds: state.selectedLocationIds.slice()
  }, '', url);
};
var normalizeRange = function normalizeRange(range) {
  if (!range || !range.start || !range.end) {
    return null;
  }
  var start = typeof range.start === 'string' ? range.start : toDateString(range.start);
  var end = typeof range.end === 'string' ? range.end : toDateString(range.end);
  return {
    start: start,
    end: end
  };
};
var getRangeKey = function getRangeKey(range) {
  var normalizedRange = normalizeRange(range);
  return normalizedRange ? "".concat(normalizedRange.start, ":").concat(normalizedRange.end) : '';
};
var isRangeLoaded = function isRangeLoaded(range) {
  return getRangeKey(state.loadedRange) === getRangeKey(range);
};
var getTodayDate = function getTodayDate() {
  var now = new Date();
  return createLocalDate(now.getFullYear(), now.getMonth(), now.getDate());
};
var setSelectedDate = function setSelectedDate(date) {
  state.date = cloneDate(date);
  state.miniDate = cloneDate(state.date);
  state.didAutoNowScroll = false;
  state.scheduleWindowStart = null;
};
var getVisibleDateRange = function getVisibleDateRange() {
  if (state.view === 'schedule') {
    var _start = createLocalDate(state.date.getFullYear(), state.date.getMonth() - 1, 1);
    var end = createLocalDate(state.date.getFullYear(), state.date.getMonth() + 5, 0);
    return {
      start: _start,
      end: end
    };
  }
  if (state.view === 'day') {
    return {
      start: cloneDate(state.date),
      end: cloneDate(state.date)
    };
  }
  if (state.view === '2-days') {
    return {
      start: cloneDate(state.date),
      end: addDays(state.date, 1)
    };
  }
  if (state.view === 'week') {
    var _start2 = getVisibleScheduleDates()[0];
    return {
      start: _start2,
      end: addDays(_start2, 6)
    };
  }
  if (state.view === 'month') {
    var _start3 = startOfMonthGrid(state.date);
    return {
      start: _start3,
      end: addDays(_start3, 41)
    };
  }
  var start = startOfWeek(state.date);
  return {
    start: start,
    end: addDays(start, 6)
  };
};
var getCalendarEventRange = function getCalendarEventRange() {
  if (state.view === 'schedule') {
    return getVisibleDateRange();
  }
  var year = state.date.getFullYear();
  return {
    start: createLocalDate(year - 1, 0, 1),
    end: createLocalDate(year + 1, 11, 31)
  };
};
var fetchPlannedLessons = function fetchPlannedLessons(range) {
  var normalizedRange = normalizeRange(range);
  if (!normalizedRange) {
    return Promise.resolve();
  }
  var rangeKey = getRangeKey(normalizedRange);
  if (state.pendingRangeKey === rangeKey) {
    return Promise.resolve();
  }
  var url = new URL(window.location.href);
  url.searchParams.set('view', state.view);
  url.searchParams.set('date', toDateString(state.date));
  url.searchParams.set('range_start', normalizedRange.start);
  url.searchParams.set('range_end', normalizedRange.end);
  url.searchParams.set('lesson_plans', '1');
  state.pendingRangeKey = rangeKey;
  state.calendarFetchId += 1;
  var fetchId = state.calendarFetchId;
  return fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Unable to load calendar lessons.');
    }
    return response.json();
  }).then(function (payload) {
    if (fetchId !== state.calendarFetchId || getRangeKey(getVisibleDateRange()) !== rangeKey) {
      return;
    }
    state.plannedLessons = Array.isArray(payload.plannedLessons) ? payload.plannedLessons : [];
    state.singleLessonPlans = Array.isArray(payload.singleLessonPlans) ? payload.singleLessonPlans : [];
    state.holidays = Array.isArray(payload.holidays) ? payload.holidays : [];
    state.teachingBreaks = Array.isArray(payload.teachingBreaks) ? payload.teachingBreaks : [];
    state.recitals = Array.isArray(payload.recitals) ? payload.recitals : [];
    state.generalEvents = Array.isArray(payload.generalEvents) ? payload.generalEvents : [];
    state.loadedRange = normalizeRange(payload.calendarRange) || normalizedRange;
  })["catch"](function (error) {
    if (fetchId !== state.calendarFetchId) {
      return;
    }
    console.error(error);
    state.loadedRange = normalizedRange;
  })["finally"](function () {
    if (state.pendingRangeKey === rangeKey && fetchId === state.calendarFetchId) {
      state.pendingRangeKey = null;
    }
  });
};
var getVisibleScheduleDates = function getVisibleScheduleDates() {
  if (state.view === 'day') {
    return [cloneDate(state.date)];
  }
  if (state.view === '2-days') {
    return Array.from({
      length: 2
    }, function (_, index) {
      return addDays(state.date, index);
    });
  }
  var start = isValidDate(state.scheduleWindowStart) ? cloneDate(state.scheduleWindowStart) : startOfWeek(state.date);
  return Array.from({
    length: 7
  }, function (_, index) {
    return addDays(start, index);
  });
};
var getTwoDaysBackingStart = function getTwoDaysBackingStart() {
  return startOfWeek(state.date);
};
var getTwoDaysBackingDateForIndex = function getTwoDaysBackingDateForIndex(index) {
  return addDays(getTwoDaysBackingStart(), index);
};
var getScheduleDateForGridIndex = function getScheduleDateForGridIndex(index) {
  if (state.view === '2-days') {
    var visibleDates = getVisibleScheduleDates();
    return visibleDates[index] ? cloneDate(visibleDates[index]) : getTwoDaysBackingDateForIndex(index);
  }
  if (state.view === 'week') {
    var _visibleDates = getVisibleScheduleDates();
    return _visibleDates[index] ? cloneDate(_visibleDates[index]) : null;
  }
  return getVisibleScheduleDates()[index] ? cloneDate(getVisibleScheduleDates()[index]) : null;
};
var getScheduleGridDates = function getScheduleGridDates() {
  var length = state.view === 'day' ? 1 : 7;
  return Array.from({
    length: length
  }, function (_, index) {
    return getScheduleDateForGridIndex(index);
  }).filter(Boolean);
};
var getDateRangeDates = function getDateRangeDates(range) {
  var dates = [];
  if (!range || !range.start || !range.end) {
    return dates;
  }
  for (var date = cloneDate(range.start); date <= range.end; date = addDays(date, 1)) {
    dates.push(date);
  }
  return dates;
};
var getScheduleValue = function getScheduleValue() {
  if (state.view === '2-days') {
    return toDateString(addDays(getTwoDaysBackingStart(), 1));
  }
  if (state.view === 'week' && isValidDate(state.scheduleWindowStart)) {
    return toDateString(addDays(startOfWeek(state.scheduleWindowStart), 1));
  }
  if (scheduleGridViews.includes(state.view)) {
    return toDateString(addDays(state.date, 1));
  }
  return toDateString(state.date);
};
var patchScheduleHeaders = function patchScheduleHeaders(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var headerRow = schedule ? schedule.querySelector('thead tr:not(.calendar-schedule-holiday-row)') : null;
  var headers = headerRow ? headerRow.querySelectorAll('td') : [];
  var firstScheduleRow = schedule ? schedule.querySelector('tbody tr') : null;
  var columns = firstScheduleRow ? firstScheduleRow.querySelectorAll('td[data-date]') : [];
  var gridDates = getScheduleGridDates();
  headers.forEach(function (header) {
    header.removeAttribute('data-selected');
    header.removeAttribute('data-real-date');
    header.classList.remove('calendar-schedule-hidden-column');
  });
  columns.forEach(function (column, index) {
    var date = gridDates[index];
    if (!date) {
      return;
    }
    var dateString = toDateString(date);
    var columnX = column.getAttribute('data-x');
    var header = headers[index + 1];
    var isHidden = state.view === '2-days' && index > 1;
    schedule.querySelectorAll("tbody td[data-x=\"".concat(columnX, "\"]")).forEach(function (cell) {
      cell.setAttribute('data-date', dateString);
      cell.setAttribute('data-real-date', dateString);
      cell.classList.toggle('calendar-schedule-hidden-column', isHidden);
    });
    if (!header) {
      return;
    }
    header.classList.toggle('calendar-schedule-hidden-column', isHidden);
    header.textContent = String(date.getDate()).padStart(2, '0');
    header.setAttribute('data-weekday', weekdays[date.getDay()]);
    header.setAttribute('data-real-date', dateString);
    if (dateString === todayString()) {
      header.setAttribute('data-selected', 'true');
    } else {
      header.removeAttribute('data-selected');
    }
  });
};
var createScheduleHeaderDragPreview = function createScheduleHeaderDragPreview(headerRow) {
  var visibleHeaders = Array.from(headerRow.cells).slice(1).filter(function (header) {
    return header.getBoundingClientRect().width > 0;
  });
  var gutter = headerRow.cells[0];
  if (!visibleHeaders.length || !gutter) {
    return null;
  }
  var gutterRect = gutter.getBoundingClientRect();
  var firstRect = visibleHeaders[0].getBoundingClientRect();
  var lastRect = visibleHeaders[visibleHeaders.length - 1].getBoundingClientRect();
  var visibleWidth = lastRect.right - firstRect.left;
  var dayWidth = visibleWidth / visibleHeaders.length;
  var bufferDays = 31;
  var visibleDates = getVisibleScheduleDates();
  var headerStyle = window.getComputedStyle(visibleHeaders[0]);
  var weekdayStyle = window.getComputedStyle(visibleHeaders[0], '::before');
  var scheduleStyle = window.getComputedStyle(headerRow.closest('.lm-schedule'));
  var preview = document.createElement('div');
  var gutterMask = document.createElement('div');
  var rail = document.createElement('div');
  preview.className = "calendar-schedule-header-drag-preview calendar-schedule-header-drag-preview-".concat(state.view);
  preview.style.left = "".concat(firstRect.left, "px");
  preview.style.top = "".concat(firstRect.top, "px");
  preview.style.width = "".concat(visibleWidth, "px");
  preview.style.height = "".concat(firstRect.height, "px");
  preview.style.borderTopRightRadius = scheduleStyle.borderTopRightRadius;
  preview.style.setProperty('--calendar-schedule-drag-number-size', headerStyle.fontSize);
  preview.style.setProperty('--calendar-schedule-drag-number-weight', headerStyle.fontWeight);
  preview.style.setProperty('--calendar-schedule-drag-number-line-height', headerStyle.lineHeight);
  preview.style.setProperty('--calendar-schedule-drag-weekday-size', weekdayStyle.fontSize);
  preview.style.setProperty('--calendar-schedule-drag-weekday-weight', weekdayStyle.fontWeight);
  preview.style.setProperty('--calendar-schedule-drag-weekday-line-height', weekdayStyle.lineHeight);
  preview.style.setProperty('--calendar-schedule-drag-weekday-spacing', weekdayStyle.paddingBottom);
  gutterMask.className = 'calendar-schedule-header-drag-gutter';
  gutterMask.style.left = "".concat(gutterRect.left, "px");
  gutterMask.style.top = "".concat(firstRect.top, "px");
  gutterMask.style.width = "".concat(Math.max(0, firstRect.left - gutterRect.left), "px");
  gutterMask.style.height = "".concat(firstRect.height, "px");
  gutterMask.style.borderTopLeftRadius = scheduleStyle.borderTopLeftRadius;
  rail.className = 'calendar-schedule-header-drag-rail';
  Array.from({
    length: bufferDays * 2 + visibleDates.length
  }, function (_, index) {
    return addDays(visibleDates[0], index - bufferDays);
  }).forEach(function (date) {
    var day = document.createElement('span');
    var weekday = document.createElement('span');
    var number = document.createElement('span');
    day.className = 'calendar-schedule-header-drag-day';
    day.style.flexBasis = "".concat(dayWidth, "px");
    day.style.width = "".concat(dayWidth, "px");
    day.classList.toggle('is-today', toDateString(date) === todayString());
    weekday.className = 'calendar-schedule-header-drag-weekday';
    number.className = 'calendar-schedule-header-drag-number';
    weekday.textContent = weekdays[date.getDay()];
    number.textContent = String(date.getDate()).padStart(2, '0');
    day.appendChild(weekday);
    day.appendChild(number);
    rail.appendChild(day);
  });
  preview.appendChild(rail);
  document.body.appendChild(preview);
  document.body.appendChild(gutterMask);
  return {
    element: preview,
    gutterMask: gutterMask,
    rail: rail,
    dayWidth: dayWidth,
    initialX: -(bufferDays * dayWidth),
    maxDistance: bufferDays * dayWidth
  };
};
var removeScheduleHeaderDragPreview = function removeScheduleHeaderDragPreview(preview) {
  if (!preview) {
    return;
  }
  if (preview.element) {
    preview.element.remove();
  }
  if (preview.gutterMask) {
    preview.gutterMask.remove();
  }
};
var bindScheduleHeaderDrag = function bindScheduleHeaderDrag(calendar, navigateByDays) {
  var drag = null;
  var settlePreview = function settlePreview(preview, currentX, targetX) {
    preview.rail.style.transform = "translate3d(".concat(currentX, "px, 0, 0)");
    if (Math.abs(currentX - targetX) < 0.5 || window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      preview.rail.style.transform = "translate3d(".concat(targetX, "px, 0, 0)");
      return Promise.resolve();
    }
    return new Promise(function (resolve) {
      var finished = false;
      var _finish = function finish() {
        if (finished) {
          return;
        }
        finished = true;
        window.clearTimeout(fallback);
        preview.rail.removeEventListener('transitionend', _finish);
        resolve();
      };
      var fallback = window.setTimeout(_finish, 180);
      preview.rail.addEventListener('transitionend', _finish);
      preview.rail.getBoundingClientRect();
      preview.rail.style.transition = 'transform 140ms ease-out';
      preview.rail.style.transform = "translate3d(".concat(targetX, "px, 0, 0)");
    });
  };
  var clearDrag = function clearDrag(preservePreview) {
    if (!drag) {
      return;
    }
    var current = drag;
    drag = null;
    current.row.classList.remove('calendar-schedule-header-dragging');
    if (current.preview && !preservePreview) {
      removeScheduleHeaderDragPreview(current.preview);
    }
    if (current.inputType === 'pointer' && typeof current.row.hasPointerCapture === 'function' && current.row.hasPointerCapture(current.pointerId)) {
      try {
        current.row.releasePointerCapture(current.pointerId);
      } catch (error) {
        // The browser may already have released capture after cancellation.
      }
    }
  };
  var finishDrag = function finishDrag(pointerId, inputType, commit) {
    if (!drag || pointerId !== null && drag.pointerId !== pointerId || inputType && drag.inputType !== inputType) {
      return;
    }
    var current = drag;
    var offset = commit && current.active && current.preview ? Math.round(-current.deltaX / current.preview.dayWidth) : 0;
    if (!current.active || !current.preview || !commit) {
      clearDrag();
      return;
    }
    var currentX = current.preview.initialX + current.deltaX;
    var targetX = current.preview.initialX - offset * current.preview.dayWidth;
    current.preview.settledPromise = settlePreview(current.preview, currentX, targetX);
    clearDrag(true);
    if (offset) {
      navigateByDays(offset, current.preview);
      return;
    }
    current.preview.settledPromise.then(function () {
      removeScheduleHeaderDragPreview(current.preview);
    });
  };
  var beginDrag = function beginDrag(row, pointerId, clientX, clientY, inputType) {
    if (!row || !scheduleGridViews.includes(state.view)) {
      return;
    }
    clearDrag();
    drag = {
      row: row,
      pointerId: pointerId,
      inputType: inputType,
      startX: clientX,
      startY: clientY,
      deltaX: 0,
      active: false,
      preview: null
    };
  };
  var moveDrag = function moveDrag(pointerId, inputType, clientX, clientY, e) {
    if (!drag || drag.pointerId !== pointerId || drag.inputType !== inputType) {
      return;
    }
    var deltaX = clientX - drag.startX;
    var deltaY = clientY - drag.startY;
    if (!drag.active) {
      if (Math.abs(deltaY) >= 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
        clearDrag();
        return;
      }
      if (Math.abs(deltaX) < 8 || Math.abs(deltaX) <= Math.abs(deltaY)) {
        return;
      }
      drag.preview = createScheduleHeaderDragPreview(drag.row);
      if (!drag.preview) {
        clearDrag();
        return;
      }
      drag.active = true;
      drag.row.classList.add('calendar-schedule-header-dragging');
      if (drag.inputType === 'pointer' && typeof drag.row.setPointerCapture === 'function') {
        try {
          drag.row.setPointerCapture(drag.pointerId);
        } catch (error) {
          // Window-level listeners still complete the drag safely.
        }
      }
    }
    e.preventDefault();
    drag.deltaX = Math.max(-drag.preview.maxDistance, Math.min(drag.preview.maxDistance, deltaX));
    drag.preview.rail.style.transform = "translate3d(".concat(drag.preview.initialX + drag.deltaX, "px, 0, 0)");
  };
  calendar.addEventListener('pointerdown', function (e) {
    var row = e.target.closest('.lm-schedule thead tr:not(.calendar-schedule-holiday-row)');
    if (e.pointerType === 'touch' || e.button !== 0 || e.isPrimary === false) {
      return;
    }
    beginDrag(row, e.pointerId, e.clientX, e.clientY, 'pointer');
  });
  window.addEventListener('pointermove', function (e) {
    moveDrag(e.pointerId, 'pointer', e.clientX, e.clientY, e);
  }, {
    passive: false
  });
  window.addEventListener('pointerup', function (e) {
    finishDrag(e.pointerId, 'pointer', true);
  });
  window.addEventListener('pointercancel', function (e) {
    finishDrag(e.pointerId, 'pointer', false);
  });
  calendar.addEventListener('lostpointercapture', function (e) {
    finishDrag(e.pointerId, 'pointer', false);
  });
  calendar.addEventListener('touchstart', function (e) {
    var touch = e.changedTouches[0];
    var row = e.target.closest('.lm-schedule thead tr:not(.calendar-schedule-holiday-row)');
    if (!touch || e.touches.length !== 1) {
      return;
    }
    beginDrag(row, touch.identifier, touch.clientX, touch.clientY, 'touch');
  }, {
    passive: true
  });
  window.addEventListener('touchmove', function (e) {
    if (!drag || drag.inputType !== 'touch') {
      return;
    }
    var touch = Array.from(e.touches).find(function (candidate) {
      return candidate.identifier === drag.pointerId;
    });
    if (touch) {
      moveDrag(touch.identifier, 'touch', touch.clientX, touch.clientY, e);
    }
  }, {
    passive: false
  });
  window.addEventListener('touchend', function (e) {
    var touch = drag && drag.inputType === 'touch' ? Array.from(e.changedTouches).find(function (candidate) {
      return candidate.identifier === drag.pointerId;
    }) : null;
    if (touch) {
      finishDrag(touch.identifier, 'touch', true);
    }
  });
  window.addEventListener('touchcancel', function (e) {
    var touch = drag && drag.inputType === 'touch' ? Array.from(e.changedTouches).find(function (candidate) {
      return candidate.identifier === drag.pointerId;
    }) : null;
    if (touch) {
      finishDrag(touch.identifier, 'touch', false);
    }
  });
  window.addEventListener('blur', function () {
    finishDrag(null, null, false);
  });
};
var formatScheduleHour = function formatScheduleHour(value) {
  var text = String(value).trim();
  var match = text.match(/^(\d{1,2})(?::\d{2})/);
  if (!match) {
    return text;
  }
  var hour = Number(match[1]);
  var period = hour >= 12 ? 'PM' : 'AM';
  var displayHour = hour % 12 || 12;
  return "".concat(displayHour, " ").concat(period);
};
var patchScheduleTimeLabels = function patchScheduleTimeLabels(calendar) {
  calendar.querySelectorAll('.lm-schedule-index').forEach(function (label) {
    var time = label.dataset.scheduleTime || label.textContent;
    label.dataset.scheduleTime = time;
    label.textContent = getTimeMinutes(time) === getTimeMinutes(scheduleStart) ? '' : formatScheduleHour(time);
    label.setAttribute('aria-hidden', getTimeMinutes(time) === getTimeMinutes(scheduleStart) ? 'true' : 'false');
  });
};
var getTimeMinutes = function getTimeMinutes(value) {
  var match = String(value || '').match(/^(\d{1,2}):(\d{2})/);
  if (!match) {
    return 0;
  }
  return Number(match[1]) * 60 + Number(match[2]);
};
var isEventInsideScheduleWindow = function isEventInsideScheduleWindow(event) {
  var start = getTimeMinutes(event.start);
  return start >= getTimeMinutes(scheduleStart) && start < getTimeMinutes(scheduleEnd);
};
var getEventDurationMinutes = function getEventDurationMinutes(event) {
  if (!event || !event.start || !event.end) {
    return 30;
  }
  return Math.max(15, getTimeMinutes(event.end) - getTimeMinutes(event.start));
};
var getAgendaEventHeight = function getAgendaEventHeight(event) {
  var duration = getEventDurationMinutes(event);
  return "".concat(Math.min(10, Math.max(3.75, 2 + duration / 15)), "rem");
};
var normalizeLocationId = function normalizeLocationId(value) {
  var number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
};
var getAllLocationIds = function getAllLocationIds() {
  return state.locations.map(function (location) {
    return normalizeLocationId(location.id);
  }).filter(Boolean);
};
var getSelectedLocationIds = function getSelectedLocationIds() {
  return state.selectedLocationIds;
};
var isLocationFilterActive = function isLocationFilterActive() {
  var allIds = getAllLocationIds();
  return allIds.length && state.selectedLocationIds.length < allIds.length;
};
var locationIsSelected = function locationIsSelected(locationId) {
  var selectedIds = getSelectedLocationIds();
  var normalized = normalizeLocationId(locationId);
  return !normalized || selectedIds.includes(normalized);
};
var eventMatchesLocationFilter = function eventMatchesLocationFilter(event) {
  if (!isLocationFilterActive() || event.isHoliday) {
    return true;
  }
  if (event.isBreak) {
    var locations = Array.isArray(event.locations) ? event.locations : [];
    return !locations.length || locations.some(function (location) {
      return locationIsSelected(location.id);
    });
  }
  return locationIsSelected(event.locationId);
};
var getVisibleCalendarEvents = function getVisibleCalendarEvents() {
  return state.events.filter(isEventInsideScheduleWindow).filter(eventMatchesLocationFilter);
};
var getScheduleRenderEvents = function getScheduleRenderEvents() {
  var events = getVisibleCalendarEvents();
  if (state.view !== '2-days' && !(state.view === 'week' && isValidDate(state.scheduleWindowStart))) {
    return events;
  }
  var visibleDateStrings = getVisibleScheduleDates().map(toDateString);
  var backingStart = state.view === '2-days' ? getTwoDaysBackingStart() : startOfWeek(state.scheduleWindowStart);
  return events.filter(isEventInsideVisibleRange).map(function (event) {
    var visibleIndex = visibleDateStrings.indexOf(String(event.date || '').substring(0, 10));
    var backingDate = visibleIndex < 0 ? null : toDateString(addDays(backingStart, visibleIndex));
    if (!backingDate) {
      return null;
    }
    return Object.assign({}, event, {
      date: backingDate,
      scheduleSourceDate: event.date
    });
  }).filter(Boolean);
};
var getVisibleEventsByDate = function getVisibleEventsByDate() {
  if (state.visibleEventsByDate) {
    return state.visibleEventsByDate;
  }
  var eventsByDate = {};
  getVisibleCalendarEvents().forEach(function (event) {
    if (!event || !event.date) {
      return;
    }
    var dateString = String(event.date).substring(0, 10);
    if (!eventsByDate[dateString]) {
      eventsByDate[dateString] = [];
    }
    eventsByDate[dateString].push(event);
  });
  Object.keys(eventsByDate).forEach(function (dateString) {
    eventsByDate[dateString].sort(function (a, b) {
      return String(a.start || '').localeCompare(String(b.start || ''));
    });
  });
  state.visibleEventsByDate = eventsByDate;
  return eventsByDate;
};
var paymentFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 0,
  style: 'currency'
});
var paymentCountUpOptions = {
  decimalPlaces: 0,
  prefix: '$'
};
var randomBetween = function randomBetween(min, max) {
  return min + Math.random() * (max - min);
};
var getEventFeeAmount = function getEventFeeAmount(event) {
  var amount = Number(event && event.feeAmount ? event.feeAmount : 0);
  return Number.isFinite(amount) ? amount : 0;
};
var renderLessonModalTitle = function renderLessonModalTitle(title, event) {
  if (!title) {
    return;
  }
  var feeAmount = getEventFeeAmount(event);
  title.textContent = '';
  title.appendChild(document.createTextNode(event && event.title ? event.title : 'Lesson'));
  if (feeAmount <= 0) {
    return;
  }
  var fee = document.createElement('span');
  fee.className = 'ml-2 opacity-4';
  fee.textContent = paymentFormatter.format(feeAmount / 100);
  title.appendChild(fee);
};
var renderCountTotal = function renderCountTotal(key, element, value, options, fallbackFormatter) {
  if (!element) {
    return;
  }
  var number = Number(value);
  var counter = state.paymentTotalCounters[key];
  var startVal = counter && counter.element === element ? counter.value : Number(element.dataset.countValue || 0);
  var safeStartVal = Number.isFinite(startVal) ? startVal : 0;
  var safeNumber = Number.isFinite(number) ? number : 0;
  var formatter = options && typeof options.formattingFn === 'function' ? options.formattingFn : typeof fallbackFormatter === 'function' ? fallbackFormatter : function (nextValue) {
    return String(nextValue);
  };
  if (counter && counter.frame) {
    cancelAnimationFrame(counter.frame);
  }
  if (Math.abs(safeNumber - safeStartVal) < 0.001) {
    element.textContent = formatter(safeNumber);
    element.dataset.countValue = String(safeNumber);
    state.paymentTotalCounters[key] = {
      element: element,
      frame: null,
      value: safeNumber
    };
    return;
  }
  var duration = Math.round(randomBetween(520, 980));
  var start = window.performance && typeof window.performance.now === 'function' ? window.performance.now() : Date.now();
  var change = safeNumber - safeStartVal;
  var easeOutCubic = function easeOutCubic(progress) {
    return 1 - Math.pow(1 - progress, 3);
  };
  var _renderFrame = function renderFrame(now) {
    var elapsed = now - start;
    var progress = Math.min(1, Math.max(0, elapsed / duration));
    var nextValue = safeStartVal + change * easeOutCubic(progress);
    var safeNextValue = Number.isFinite(nextValue) ? nextValue : safeNumber;
    var latest = state.paymentTotalCounters[key];
    if (!latest || latest.element !== element) {
      return;
    }
    element.textContent = formatter(progress >= 1 ? safeNumber : safeNextValue);
    element.dataset.countValue = String(safeNextValue);
    latest.value = safeNextValue;
    if (progress < 1) {
      latest.frame = requestAnimationFrame(_renderFrame);
      return;
    }
    latest.frame = null;
    latest.value = safeNumber;
    element.dataset.countValue = String(safeNumber);
  };
  state.paymentTotalCounters[key] = {
    element: element,
    frame: requestAnimationFrame(_renderFrame),
    value: safeStartVal
  };
};
var renderPaymentTotal = function renderPaymentTotal(key, element, cents) {
  renderCountTotal(key, element, cents / 100, Object.assign({}, paymentCountUpOptions, {
    formattingFn: function formattingFn(value) {
      var number = Number(value);
      return paymentFormatter.format(Number.isFinite(number) ? number : 0);
    }
  }), function (value) {
    var number = Number(value);
    return paymentFormatter.format(Number.isFinite(number) ? number : 0);
  });
};
var formatHoursMinutes = function formatHoursMinutes(minutes) {
  var safeMinutes = Number.isFinite(Number(minutes)) ? Math.round(Number(minutes)) : 0;
  var hours = Math.floor(safeMinutes / 60);
  var remainingMinutes = safeMinutes % 60;
  if (hours && remainingMinutes) {
    return "".concat(hours, "h ").concat(remainingMinutes, "m");
  }
  if (hours) {
    return "".concat(hours, "h");
  }
  if (!remainingMinutes) {
    return '0h';
  }
  return "".concat(remainingMinutes, "m");
};
var formatQuarterHours = function formatQuarterHours(minutes) {
  var safeMinutes = Number.isFinite(Number(minutes)) ? Number(minutes) : 0;
  var hours = Math.round(safeMinutes / 60 * 4) / 4;
  return "".concat(Number(hours.toFixed(2)), "h");
};
var getVisibleAverageHoursDayCount = function getVisibleAverageHoursDayCount() {
  if (state.view === '2-days') {
    return 2;
  }
  if (state.view === 'week') {
    return 7;
  }
  if (state.view === 'month') {
    return createLocalDate(state.date.getFullYear(), state.date.getMonth() + 1, 0).getDate();
  }
  return 0;
};
var isEventInsideVisibleRange = function isEventInsideVisibleRange(event) {
  if (!event || !event.date) {
    return false;
  }
  var range = getVisibleDateRange();
  var date = parseDateString(String(event.date).substring(0, 10));
  return date >= range.start && date <= range.end;
};
var isEventInsidePaymentRange = function isEventInsidePaymentRange(event) {
  if (!event || !event.date) {
    return false;
  }
  if (state.view !== 'month') {
    return isEventInsideVisibleRange(event);
  }
  var date = parseDateString(String(event.date).substring(0, 10));
  var start = createLocalDate(state.date.getFullYear(), state.date.getMonth(), 1);
  var end = createLocalDate(state.date.getFullYear(), state.date.getMonth() + 1, 0);
  return date >= start && date <= end;
};
var getVisiblePaymentEvents = function getVisiblePaymentEvents() {
  return getVisibleCalendarEvents().filter(function (event) {
    if (state.view !== 'schedule') {
      return isEventInsidePaymentRange(event);
    }
    return event.date === toDateString(state.date);
  }).filter(function (event) {
    return (event.lessonPlanId || event.singleLessonPlanId) && !event.isHoliday;
  });
};
var formatNameList = function formatNameList(names) {
  if (!names.length) {
    return '';
  }
  if (names.length === 1) {
    return names[0];
  }
  if (names.length === 2) {
    return "".concat(names[0], " and ").concat(names[1]);
  }
  return "".concat(names.slice(0, -1).join(', '), " and ").concat(names[names.length - 1]);
};
var renderCalendarBirthdayInsights = function renderCalendarBirthdayInsights(container, names) {
  if (!container) {
    return;
  }
  var label = container.querySelector('span');
  var formattedNames = formatNameList(names);
  container.style.display = formattedNames ? '' : 'none';
  if (label) {
    label.textContent = formattedNames;
  }
};
var renderCalendarPaymentTotals = function renderCalendarPaymentTotals() {
  var expected = document.querySelector('[data-calendar-expected-payment]');
  var confirmed = document.querySelector('[data-calendar-confirmed-payment]');
  var lessonsCount = document.querySelector('[data-calendar-lessons-count]');
  var hoursCount = document.querySelector('[data-calendar-hours-count]');
  var averageHours = document.querySelector('[data-calendar-average-hours]');
  var birthdayInsights = document.getElementById('calendar-calendar-insights-birthdays');
  if (!expected && !confirmed && !lessonsCount && !hoursCount && !averageHours && !birthdayInsights) {
    return;
  }
  var visiblePaymentEvents = getVisiblePaymentEvents();
  var totals = visiblePaymentEvents.reduce(function (carry, event) {
    var feeAmount = getEventFeeAmount(event);
    if (event.lessonStatus !== 'canceled' && event.calendarStatus !== 'canceled') {
      carry.expected += feeAmount;
      carry.lessons += 1;
      carry.minutes += getEventDurationMinutes(event);
    }
    if (event.lessonStatus === 'paid' || event.lessonStatus === 'early-payment') {
      carry.confirmed += feeAmount;
    }
    return carry;
  }, {
    confirmed: 0,
    expected: 0,
    lessons: 0,
    minutes: 0
  });
  var birthdayNames = [];
  var birthdayNameKeys = new Set();
  visiblePaymentEvents.forEach(function (event) {
    var name = event.studentFirstName || '';
    var key = name.toLowerCase();
    if (!name || !event.hasBirthdayNearEvent || birthdayNameKeys.has(key)) {
      return;
    }
    birthdayNameKeys.add(key);
    birthdayNames.push(name);
  });
  renderCalendarBirthdayInsights(birthdayInsights, birthdayNames);
  renderPaymentTotal('expected', expected, totals.expected);
  renderPaymentTotal('confirmed', confirmed, totals.confirmed);
  renderCountTotal('lessons', lessonsCount, totals.lessons, {
    decimalPlaces: 0,
    formattingFn: function formattingFn(value) {
      var number = Number(value);
      return String(Math.round(Number.isFinite(number) ? number : 0));
    }
  }, function (value) {
    var number = Number(value);
    return String(Math.round(Number.isFinite(number) ? number : 0));
  });
  renderCountTotal('hours', hoursCount, totals.minutes, {
    decimalPlaces: 0,
    formattingFn: function formattingFn(value) {
      return formatHoursMinutes(value);
    }
  }, function (value) {
    return formatHoursMinutes(value);
  });
  if (averageHours) {
    var dayCount = getVisibleAverageHoursDayCount();
    var container = averageHours.closest('.mb-3') || averageHours.parentElement;
    if (container) {
      container.style.display = dayCount ? '' : 'none';
    }
    if (dayCount) {
      renderCountTotal('average-hours', averageHours, totals.minutes / dayCount, {
        decimalPlaces: 0,
        formattingFn: function formattingFn(value) {
          return "".concat(formatQuarterHours(value), "/day");
        }
      }, function (value) {
        return "".concat(formatQuarterHours(value), "/day");
      });
    }
  }
};
var getHolidaysForDateString = function getHolidaysForDateString(dateString) {
  if (!state.showHolidays) {
    return [];
  }
  return state.holidays.filter(function (holiday) {
    return holiday.date === dateString;
  });
};
var getHolidaysForDate = function getHolidaysForDate(date) {
  return getHolidaysForDateString(toDateString(date));
};
var getBreakDateString = function getBreakDateString(teachingBreak, key) {
  return String(teachingBreak && teachingBreak[key] ? teachingBreak[key] : '').substring(0, 10);
};
var isDateWithinBreak = function isDateWithinBreak(dateString, teachingBreak) {
  var startsOn = getBreakDateString(teachingBreak, 'starts_on');
  var endsOn = getBreakDateString(teachingBreak, 'ends_on');
  return startsOn && endsOn && dateString >= startsOn && dateString <= endsOn;
};
var getBreaksForDateString = function getBreaksForDateString(dateString) {
  return state.teachingBreaks.filter(function (teachingBreak) {
    if (!isDateWithinBreak(dateString, teachingBreak)) {
      return false;
    }
    if (!isLocationFilterActive()) {
      return true;
    }
    var locations = Array.isArray(teachingBreak.locations) ? teachingBreak.locations : [];
    return !locations.length || locations.some(function (location) {
      return locationIsSelected(location.id);
    });
  });
};
var getBreaksForDate = function getBreaksForDate(date) {
  return getBreaksForDateString(toDateString(date));
};
var getRecitalsForDateString = function getRecitalsForDateString(dateString) {
  return state.recitals.filter(function (recital) {
    return String(recital.date || '').substring(0, 10) === dateString;
  });
};
var getRecitalsForDate = function getRecitalsForDate(date) {
  return getRecitalsForDateString(toDateString(date));
};
var eventTimeFormatter = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: calendarTimeZone
});
var modalDateFormatter = new Intl.DateTimeFormat('en', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  timeZone: calendarTimeZone
});
var formatEventTime = function formatEventTime(time) {
  if (!time) {
    return '';
  }
  var parts = time.split(':').map(Number);
  var date = new Date(2000, 0, 1, parts[0] || 0, parts[1] || 0);
  return eventTimeFormatter.format(date).replace(':00', '').replace(/\s/g, '').toLowerCase();
};
var formatModalEventTime = function formatModalEventTime(time) {
  if (!time) {
    return '';
  }
  var parts = time.split(':').map(Number);
  var date = new Date(2000, 0, 1, parts[0] || 0, parts[1] || 0);
  return eventTimeFormatter.format(date).replace(/\s/g, '').toLowerCase();
};
var formatAgendaEventTime = function formatAgendaEventTime(time) {
  return formatModalEventTime(time).toUpperCase();
};
var getLessonLocationIcon = function getLessonLocationIcon(locationName) {
  var location = String(locationName || '').trim().toLowerCase();
  if (location.includes('home')) {
    return 'house';
  }
  if (location.includes('online')) {
    return 'globe';
  }
  return 'building';
};
var getCalendarEventIcon = function getCalendarEventIcon(event) {
  if (!event) {
    return {
      name: '',
      title: ''
    };
  }
  return event.isGeneralEvent ? {
    name: event.eventTypeIcon || '',
    title: event.eventType || '',
    style: event.externalProvider === 'google' ? 'fa-brands' : 'fa-solid'
  } : {
    name: getLessonLocationIcon(event.locationName),
    title: event.locationName || '',
    style: 'fa-solid'
  };
};
var createCalendarEventIcon = function createCalendarEventIcon(event) {
  var icon = getCalendarEventIcon(event);
  if (!icon.name) {
    return null;
  }
  var element = document.createElement('span');
  element.className = 'event-icon';
  element.title = icon.title;
  element.innerHTML = "<i class=\"".concat(icon.style, " fa-").concat(icon.name, "\" aria-hidden=\"true\"></i>");
  return element;
};
var patchScheduleItems = function patchScheduleItems(calendar) {
  calendar.querySelectorAll('.lm-schedule-item:not([holding-event])').forEach(function (item) {
    var start = item.getAttribute('data-start');
    var end = item.getAttribute('data-end');
    var duration = getTimeMinutes(end) - getTimeMinutes(start);
    var isShort = duration <= 30;
    var event = getEventByScheduleItem(item);
    var cell = item.closest('td[data-date]');
    var visibleDate = cell ? cell.getAttribute('data-real-date') || cell.getAttribute('data-date') : '';
    var icon = getCalendarEventIcon(event);
    var eventIcon = item.querySelector(':scope > .event-icon');
    if (!icon.name) {
      if (eventIcon) {
        eventIcon.remove();
        eventIcon = null;
      }
    } else if (!eventIcon) {
      eventIcon = document.createElement('span');
      eventIcon.className = 'event-icon';
      eventIcon.innerHTML = '<i class="fa-solid" aria-hidden="true"></i>';
      item.appendChild(eventIcon);
    }
    if (eventIcon) {
      eventIcon.querySelector('i').className = "".concat(icon.style, " fa-").concat(icon.name);
      eventIcon.title = icon.title;
    }
    item.classList.toggle('is-short', isShort);
    item.classList.toggle('calendar-calendar-general-event', Boolean(event && event.isGeneralEvent));
    item.toggleAttribute('data-read-only', Boolean(event && event.readOnly));
    item.dataset.externalProvider = event && event.externalProvider ? event.externalProvider : '';
    item.setAttribute('data-display-time', event && event.externalProvider === 'google' ? 'from Google Calendar' : isShort ? formatEventTime(start) : "".concat(formatEventTime(start), " - ").concat(formatEventTime(end)));
    clearScheduleItemBirthdayDecoration(item);
    if (event) {
      item.setAttribute('data-lesson-status', event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed'));
    }
    applyEventTimeStatusAttributes(item, event, visibleDate);
    applyEventOverlapAttribute(item, event);
  });
};
var animateCalendarLessonItems = function animateCalendarLessonItems(calendar) {
  if (state.suppressNextScheduleAnimation) {
    calendar.querySelectorAll('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event').forEach(function (item) {
      item.dataset.lessonFadeAnimated = 'true';
    });
    state.suppressNextScheduleAnimation = false;
    return;
  }
  if (!scheduleGridViews.includes(state.view) || window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  var nonLessonStatuses = ['holiday', 'teaching-break', 'recital'];
  var lessonItems = Array.from(calendar.querySelectorAll('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event')).filter(function (item) {
    return !nonLessonStatuses.includes(item.dataset.lessonStatus || '') && item.dataset.lessonFadeAnimated !== 'true';
  });
  lessonItems.forEach(function (item, index) {
    item.dataset.lessonFadeAnimated = 'true';
    item.style.setProperty('--calendar-lesson-fade-delay', "".concat(index * 30, "ms"));
    item.style.setProperty('--calendar-lesson-fade-opacity', window.getComputedStyle(item).opacity || '1');
    item.classList.add('calendar-calendar-lesson-fade-in');
    item.addEventListener('animationend', function () {
      item.classList.remove('calendar-calendar-lesson-fade-in');
      item.style.removeProperty('--calendar-lesson-fade-delay');
      item.style.removeProperty('--calendar-lesson-fade-opacity');
    }, {
      once: true
    });
  });
};
var patchScheduleHolidays = function patchScheduleHolidays(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var thead = schedule ? schedule.querySelector('thead') : null;
  if (!schedule || !thead || !scheduleGridViews.includes(state.view)) {
    return;
  }
  thead.querySelectorAll('.calendar-schedule-holiday-row').forEach(function (row) {
    row.remove();
  });
  var headerRow = thead.querySelector('tr');
  var headerHeight = headerRow ? headerRow.offsetHeight : 0;
  schedule.style.setProperty('--calendar-schedule-header-height', "".concat(headerHeight, "px"));
  var visibleDates = getVisibleScheduleDates();
  var visibleDateStrings = visibleDates.map(toDateString);
  var hasBanner = visibleDates.some(function (date) {
    return getHolidaysForDate(date).length > 0 || getBreaksForDate(date).length > 0 || getRecitalsForDate(date).length > 0;
  });
  if (!hasBanner) {
    return;
  }
  var row = document.createElement('tr');
  var label = document.createElement('td');
  row.className = 'calendar-schedule-holiday-row';
  label.className = 'calendar-schedule-holiday-zone';
  row.appendChild(label);
  getScheduleGridDates().forEach(function (date) {
    var cell = document.createElement('td');
    var dateString = toDateString(date);
    var isVisible = state.view !== '2-days' || visibleDateStrings.includes(dateString);
    var holidays = isVisible ? getHolidaysForDate(date) : [];
    var teachingBreaks = isVisible ? getBreaksForDate(date) : [];
    var recitals = isVisible ? getRecitalsForDate(date) : [];
    cell.className = 'calendar-schedule-holiday-cell';
    cell.dataset.date = dateString;
    cell.dataset.realDate = dateString;
    cell.classList.toggle('calendar-schedule-hidden-column', !isVisible);
    applyDateStatusAttributes(cell, dateString);
    holidays.forEach(function (holiday) {
      var item = document.createElement('span');
      item.className = 'calendar-schedule-holiday';
      item.textContent = holiday.title;
      applyDateStatusAttributes(item, dateString);
      cell.appendChild(item);
    });
    teachingBreaks.forEach(function (teachingBreak) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'calendar-schedule-holiday calendar-schedule-break';
      item.textContent = teachingBreak.title;
      item.dataset.eventGuid = "teaching-break-".concat(teachingBreak.id, "-").concat(dateString);
      applyDateStatusAttributes(item, dateString);
      cell.appendChild(item);
    });
    recitals.forEach(function (recital) {
      var item = document.createElement('button');
      item.type = 'button';
      item.className = 'calendar-schedule-holiday calendar-schedule-recital';
      item.textContent = "".concat(formatEventTime(recital.start_time), " ").concat(recital.name);
      item.dataset.eventGuid = "recital-".concat(recital.id, "-").concat(dateString);
      applyDateStatusAttributes(item, dateString);
      cell.appendChild(item);
    });
    row.appendChild(cell);
  });
  thead.appendChild(row);
};
var getEventByGuid = function getEventByGuid(guid) {
  return state.events.find(function (event) {
    return event.guid === guid;
  }) || getTeachingBreakEventByGuid(guid) || getRecitalEventByGuid(guid) || getGeneralEventByGuid(guid);
};
var getEventByScheduleItem = function getEventByScheduleItem(item) {
  if (!item) {
    return null;
  }
  if (item.event) {
    if (item.event.scheduleSourceDate) {
      return Object.assign({}, item.event, {
        date: item.event.scheduleSourceDate
      });
    }
    return item.event;
  }
  var event = getEventByGuid(item.id || item.dataset.eventGuid);
  if (event) {
    return event;
  }
  var cell = item.closest('td[data-date]');
  var date = cell ? cell.dataset.date : '';
  var start = normalizeTime(item.getAttribute('data-start') || '08:00');
  var end = normalizeTime(item.getAttribute('data-end') || '08:15');
  var title = item.getAttribute('data-title') || '';
  return state.events.find(function (candidate) {
    return candidate.date === date && candidate.start === start && candidate.end === end && candidate.title === title;
  });
};
var getTeachingBreakEvent = function getTeachingBreakEvent(teachingBreak, dateString) {
  var impact = teachingBreak.impact || {};
  return {
    guid: "teaching-break-".concat(teachingBreak.id, "-").concat(dateString),
    isBreak: true,
    id: teachingBreak.id,
    date: dateString,
    title: teachingBreak.title || 'Teaching break',
    reason: teachingBreak.reason || '',
    startsOn: getBreakDateString(teachingBreak, 'starts_on'),
    endsOn: getBreakDateString(teachingBreak, 'ends_on'),
    locations: Array.isArray(teachingBreak.locations) ? teachingBreak.locations : [],
    missedLessonCount: impact.lessons_count || 0,
    missedFeeAmount: impact.fee_amount || 0,
    missedLessons: Array.isArray(impact.lessons) ? impact.lessons : []
  };
};
var getBreakEventsForDate = function getBreakEventsForDate(date) {
  var dateString = toDateString(date);
  return getBreaksForDateString(dateString).map(function (teachingBreak) {
    return getTeachingBreakEvent(teachingBreak, dateString);
  });
};
var getTeachingBreakEventByGuid = function getTeachingBreakEventByGuid(guid) {
  var match = String(guid || '').match(/^teaching-break-(\d+)-(\d{4}-\d{2}-\d{2})$/);
  if (!match) {
    return null;
  }
  var teachingBreak = state.teachingBreaks.find(function (item) {
    return Number(item.id) === Number(match[1]);
  });
  return teachingBreak ? getTeachingBreakEvent(teachingBreak, match[2]) : null;
};
var getRecitalEvent = function getRecitalEvent(recital) {
  var dateString = String(recital.date || '').substring(0, 10);
  return {
    guid: "recital-".concat(recital.id, "-").concat(dateString),
    isRecital: true,
    id: recital.id,
    date: dateString,
    start: recital.start_time,
    title: recital.name || 'Recital',
    location: recital.location || null,
    students: Array.isArray(recital.students) ? recital.students : []
  };
};
var getRecitalEventsForDate = function getRecitalEventsForDate(date) {
  return getRecitalsForDate(date).map(getRecitalEvent);
};
var getRecitalEventByGuid = function getRecitalEventByGuid(guid) {
  var match = String(guid || '').match(/^recital-(\d+)-(\d{4}-\d{2}-\d{2})$/);
  if (!match) {
    return null;
  }
  var recital = state.recitals.find(function (item) {
    return Number(item.id) === Number(match[1]);
  });
  return recital ? getRecitalEvent(recital) : null;
};
var getGeneralEvent = function getGeneralEvent(generalEvent) {
  var dateString = String(generalEvent.scheduled_date || '').substring(0, 10);
  var status = generalEvent.canceled_at ? 'canceled' : 'general-event';
  return {
    guid: "general-event-".concat(generalEvent.id, "-").concat(dateString),
    isGeneralEvent: true,
    id: generalEvent.id,
    date: dateString,
    start: normalizeTime(generalEvent.starts_at),
    end: normalizeTime(generalEvent.ends_at),
    title: generalEvent.name || 'Event',
    eventType: generalEvent.event_type || '',
    eventTypeIcon: generalEvent.event_type_icon || '',
    notes: generalEvent.notes || '',
    notificationMinutesBefore: generalEvent.notification_minutes_before,
    editUrl: generalEvent.edit_url || '',
    rescheduleUrl: generalEvent.reschedule_url || '',
    revertUrl: generalEvent.revert_url || '',
    destroyUrl: generalEvent.destroy_url || '',
    externalProvider: generalEvent.external_provider || '',
    externalUrl: generalEvent.external_url || '',
    meetingUrl: generalEvent.meeting_url || '',
    responseStatus: generalEvent.response_status || '',
    organizerName: generalEvent.organizer_name || '',
    organizerEmail: generalEvent.organizer_email || '',
    location: generalEvent.location || '',
    allDay: Boolean(generalEvent.all_day),
    readOnly: Boolean(generalEvent.read_only),
    calendarStatus: status,
    lessonStatus: status,
    'data-lesson-status': status
  };
};
var getGeneralEventCalendarEvents = function getGeneralEventCalendarEvents() {
  return state.generalEvents.filter(function (generalEvent) {
    if (generalEvent.canceled_at) {
      return state.selectedEventTypes.includes('canceled');
    }
    var eventType = generalEvent.external_provider === 'google' ? 'google' : 'general';
    return state.selectedEventTypes.includes(eventType);
  }).filter(generalEventMatchesCalendarSearch).map(getGeneralEvent);
};
var getGeneralEventByGuid = function getGeneralEventByGuid(guid) {
  var match = String(guid || '').match(/^general-event-(.+)-(\d{4}-\d{2}-\d{2})$/);
  if (!match) {
    return null;
  }
  var generalEvent = state.generalEvents.find(function (item) {
    return String(item.id) === match[1];
  });
  return generalEvent ? getGeneralEvent(generalEvent) : null;
};
var getCalendarEventElementsByGuid = function getCalendarEventElementsByGuid(guid) {
  if (!guid) {
    return [];
  }
  return Array.from(document.querySelectorAll('#calendar .lm-schedule-item, #calendar [data-event-guid]')).filter(function (item) {
    return item.id === guid || item.dataset.eventGuid === guid;
  });
};
var getLessonStatus = function getLessonStatus(lesson) {
  if (!lesson) {
    return 'unconfirmed';
  }
  if (lesson.canceled_at) {
    return 'canceled';
  }
  return lesson.paid_at ? 'paid' : 'unpaid';
};
var getDateTimeDateString = function getDateTimeDateString(value) {
  var match = String(value || '').match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : '';
};
var getDateTimeTimeString = function getDateTimeTimeString(value) {
  var match = String(value || '').match(/[T\s](\d{1,2}):(\d{2})/);
  if (!match) {
    return '';
  }
  return "".concat(String(Number(match[1])).padStart(2, '0'), ":").concat(match[2]);
};
var getDateTimeMinutes = function getDateTimeMinutes(value) {
  return getTimeMinutes(getDateTimeTimeString(value));
};
var getLessonEditUrl = function getLessonEditUrl(lesson) {
  var taught = document.getElementById('lesson-taught');
  var storeUrl = taught ? taught.dataset.url : '';
  if (!lesson || !lesson.id || !storeUrl) {
    return '';
  }
  return "".concat(storeUrl.replace(/\/$/, ''), "/").concat(lesson.id);
};
var getLessonPlanModalEditUrl = function getLessonPlanModalEditUrl(isSingleLessonPlan, id) {
  var template = isSingleLessonPlan ? window.calendarSingleLessonPlanEditUrlTemplate : window.calendarLessonPlanEditUrlTemplate;
  var placeholder = isSingleLessonPlan ? '__single_lesson_plan__' : '__lesson_plan__';
  return template && id ? String(template).replace(placeholder, id) : '';
};
var getLessonPaymentUrl = function getLessonPaymentUrl(lesson) {
  var editUrl = getLessonEditUrl(lesson);
  return editUrl ? "".concat(editUrl.replace(/\/$/, ''), "/payments") : '';
};
var preserveButtonLabel = function preserveButtonLabel(button) {
  if (button && !button.dataset.defaultHtml) {
    button.dataset.defaultHtml = button.innerHTML;
  }
};
var restoreButtonLabel = function restoreButtonLabel(button) {
  if (button && button.dataset.defaultHtml) {
    button.innerHTML = button.dataset.defaultHtml;
  }
};
var setFormSubmitting = function setFormSubmitting(form, isSubmitting) {
  if (!form) {
    return;
  }
  form.querySelectorAll('button:not([type]), button[type="submit"], input[type="submit"], input[type="image"]').forEach(function (submit) {
    if (isSubmitting) {
      if (submit.disabled) {
        return;
      }
      preserveButtonLabel(submit);
      submit.dataset.calendarDisabledOnSubmit = 'true';
      submit.disabled = true;
      submit.setAttribute('aria-disabled', 'true');
      return;
    }
    if (submit.dataset.calendarDisabledOnSubmit !== 'true') {
      return;
    }
    submit.disabled = false;
    submit.removeAttribute('aria-disabled');
    delete submit.dataset.calendarDisabledOnSubmit;
    restoreButtonLabel(submit);
  });
};
var resetLessonModalButtons = function resetLessonModalButtons(modal) {
  if (!modal) {
    return;
  }
  modal.querySelectorAll('button, input[type="submit"], input[type="image"]').forEach(function (button) {
    button.disabled = false;
    button.removeAttribute('aria-disabled');
    delete button.dataset.calendarDisabledOnSubmit;
    restoreButtonLabel(button);
  });
};
var getResponseErrorMessage = function getResponseErrorMessage(payload, fallback) {
  if (payload && payload.message) {
    return payload.message;
  }
  if (payload && payload.errors) {
    var firstError = Object.values(payload.errors).find(function (errors) {
      return Array.isArray(errors) && errors.length;
    });
    if (firstError) {
      return firstError[0];
    }
  }
  return fallback;
};
var requestJson = function requestJson(url, options, fallbackError) {
  return fetch(url, options).then(function (response) {
    return response.json()["catch"](function () {
      return {};
    }).then(function (payload) {
      if (!response.ok) {
        throw new Error(getResponseErrorMessage(payload, fallbackError));
      }
      return payload;
    });
  });
};
var showLessonActionError = function showLessonActionError(modal, message) {
  var error = modal ? modal.querySelector('[data-lesson-action-error]') : null;
  if (!error) {
    return;
  }
  error.textContent = message || 'Unable to update this lesson.';
  error.hidden = false;
};
var clearLessonActionError = function clearLessonActionError(modal) {
  var error = modal ? modal.querySelector('[data-lesson-action-error]') : null;
  if (!error) {
    return;
  }
  error.textContent = '';
  error.hidden = true;
};
var hideLessonModal = function hideLessonModal(modal) {
  if (!modal) {
    return;
  }
  if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
    window.bootstrap.Modal.getOrCreateInstance(modal).hide();
    return;
  }
  if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
    window.jQuery(modal).modal('hide');
  }
};
var finishLessonModalMutation = function finishLessonModalMutation(modal, refreshCalendar, keepOpen) {
  var guid = modal ? modal.dataset.eventGuid : '';
  return refreshCalendar().then(function () {
    var updatedEvent = guid ? getEventByGuid(guid) : null;
    if (keepOpen && updatedEvent) {
      openLessonModal(updatedEvent);
    } else {
      hideLessonModal(modal);
    }
  });
};
var getLessonForOccurrence = function getLessonForOccurrence(lessonPlan, dateString, startTime) {
  var lessons = Array.isArray(lessonPlan.lessons) ? lessonPlan.lessons : [];
  var lessonPlanId = Number(lessonPlan.id);
  var occurrenceMinutes = getTimeMinutes(startTime);
  return lessons.find(function (lesson) {
    var startsOnDate = getDateTimeDateString(lesson.starts_at) === dateString;
    var startsAtTime = getDateTimeMinutes(lesson.starts_at) === occurrenceMinutes;
    var belongsToPlan = !lesson.lesson_plan_id || Number(lesson.lesson_plan_id) === lessonPlanId;
    return startsOnDate && startsAtTime && belongsToPlan;
  }) || null;
};
var renderRescheduleDatePicker = function renderRescheduleDatePicker(modal) {
  var label = modal.querySelector('[data-reschedule-datepicker-label]');
  var grid = modal.querySelector('[data-reschedule-datepicker-grid]');
  var input = modal.querySelector('#reschedule-lesson-date');
  if (!label || !grid || !state.rescheduleDatePickerDate) {
    return;
  }
  var selected = input && input.value ? input.value : toDateString(state.rescheduleDatePickerDate);
  var gridStart = startOfMonthGrid(state.rescheduleDatePickerDate);
  var today = todayString();
  label.textContent = monthFormatter.format(state.rescheduleDatePickerDate);
  grid.innerHTML = '';
  for (var i = 0; i < 42; i++) {
    var date = addDays(gridStart, i);
    var dateString = toDateString(date);
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'calendar-date-picker-day';
    button.textContent = date.getDate();
    button.dataset.date = dateString;
    if (date.getMonth() !== state.rescheduleDatePickerDate.getMonth()) {
      button.classList.add('is-muted');
    }
    if (dateString === selected) {
      button.classList.add('is-selected');
    }
    if (dateString === today) {
      button.classList.add('is-today');
    }
    grid.appendChild(button);
  }
};
var renderGeneralEventRescheduleDatePicker = function renderGeneralEventRescheduleDatePicker(modal) {
  var label = modal.querySelector('[data-general-event-reschedule-datepicker-label]');
  var grid = modal.querySelector('[data-general-event-reschedule-datepicker-grid]');
  var input = modal.querySelector('#reschedule-general-event-date');
  var pickerDate = state.generalEventRescheduleDatePickerDate;
  if (!label || !grid || !pickerDate) {
    return;
  }
  var selected = input && input.value ? input.value : toDateString(pickerDate);
  var gridStart = startOfMonthGrid(pickerDate);
  var today = todayString();
  label.textContent = monthFormatter.format(pickerDate);
  grid.innerHTML = '';
  for (var i = 0; i < 42; i++) {
    var date = addDays(gridStart, i);
    var dateString = toDateString(date);
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'calendar-date-picker-day';
    button.textContent = date.getDate();
    button.dataset.date = dateString;
    if (date.getMonth() !== pickerDate.getMonth()) {
      button.classList.add('is-muted');
    }
    if (dateString === selected) {
      button.classList.add('is-selected');
    }
    if (dateString === today) {
      button.classList.add('is-today');
    }
    grid.appendChild(button);
  }
};
var resetLessonModalState = function resetLessonModalState(modal) {
  if (!modal) {
    return;
  }
  resetLessonModalButtons(modal);
  modal.classList.remove('is-canceling', 'is-rescheduling', 'is-drop-rescheduling');
  delete modal.dataset.dropRecurring;
  state.rescheduleAnchor = null;
  clearLessonActionError(modal);
};
var showLessonRescheduleForm = function showLessonRescheduleForm(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-canceling');
  modal.classList.add('is-rescheduling');
};
var showLessonCancelForm = function showLessonCancelForm(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-rescheduling');
  modal.classList.add('is-canceling');
};
var getEventStartDateTime = function getEventStartDateTime(event) {
  if (!event || !event.date || !event.start) {
    return null;
  }
  var dateParts = String(event.date).substring(0, 10).split('-').map(Number);
  var timeParts = normalizeTime(event.start).split(':').map(Number);
  var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], 0, 0);
  return isValidDate(date) ? date : null;
};
var canUseLessonActionButtons = function canUseLessonActionButtons(event) {
  if (event && event.date) {
    var eventDate = parseDateString(String(event.date).substring(0, 10));
    var today = getTodayDate();
    if (isValidDate(eventDate)) {
      return eventDate <= today;
    }
  }
  var startsAt = getEventStartDateTime(event);
  return startsAt ? startsAt <= new Date() : false;
};
var populateLessonModal = function populateLessonModal(modal, event) {
  var title = modal.querySelector('.modal-title');
  var date = modal.querySelector('#lesson-date');
  var time = modal.querySelector('#lesson-time');
  var recurrence = modal.querySelector('#lesson-recurrence');
  var birthday = modal.querySelector('#lesson-birthday');
  var birthdayLabel = birthday ? birthday.querySelector('[data-lesson-birthday-label]') : null;
  var lessonLocation = modal.querySelector('#lesson-location');
  var lessonLocationContent = lessonLocation ? lessonLocation.querySelector('[data-lesson-location]') : null;
  var lessonLocationIcon = lessonLocation ? lessonLocation.querySelector('[data-lesson-location-icon]') : null;
  var meetingUrl = modal.querySelector('#meeting-url');
  var meetingUrlLink = meetingUrl ? meetingUrl.querySelector('a') : null;
  var notesUrl = modal.querySelector('#notes-url');
  var notesUrlLink = notesUrl ? notesUrl.querySelector('a') : null;
  var revert = modal.querySelector('#lesson-revert');
  var edit = modal.querySelector('#lesson-edit');
  var taught = modal.querySelector('#lesson-taught');
  var cancelLesson = modal.querySelector('#cancel-lesson-button');
  var confirmPayment = modal.querySelector('#confirm-payment');
  var earlyPayment = modal.querySelector('#early-payment');
  var rescheduleOriginalDate = modal.querySelector('#reschedule-lesson-original-date');
  var rescheduleOriginalStartTime = modal.querySelector('#reschedule-lesson-original-start-time');
  var rescheduleDate = modal.querySelector('#reschedule-lesson-date');
  var rescheduleForm = modal.querySelector('#reschedule-lesson form');
  var rescheduleLessonPlan = modal.querySelector('#reschedule-lesson [name="lesson_plan_id"]');
  var rescheduleStartTime = modal.querySelector('#reschedule-lesson-start-time');
  var rescheduleEndTime = modal.querySelector('#reschedule-lesson-end-time');
  var cancelLessonForm = modal.querySelector('#cancel-lesson form');
  var lessonPlanId = event && event.lessonPlanId ? event.lessonPlanId : '';
  var singleLessonPlanId = event && event.singleLessonPlanId ? event.singleLessonPlanId : '';
  var hasLessonSource = !!(lessonPlanId || singleLessonPlanId);
  var eventDate = event && event.date ? event.date.substring(0, 10) : todayString();
  var canUseActions = canUseLessonActionButtons(event);
  renderLessonModalTitle(title, event);
  if (date) {
    date.textContent = event && event.date ? modalDateFormatter.format(parseDateString(event.date.substring(0, 10))) : '';
  }
  if (time) {
    var start = event && event.start ? formatModalEventTime(event.start) : '';
    var end = event && event.end ? formatModalEventTime(event.end) : '';
    time.textContent = start && end ? "".concat(start, " - ").concat(end) : start || end;
  }
  if (recurrence) {
    recurrence.textContent = event && event.recurrence ? event.recurrence : '';
    if (recurrence.parentElement) {
      recurrence.parentElement.hidden = !recurrence.textContent;
    }
  }
  if (birthday && birthdayLabel) {
    if (event && event.birthdayModalLabel) {
      birthday.style.display = '';
      birthdayLabel.textContent = event.birthdayModalLabel;
    } else {
      birthday.style.display = 'none';
      birthdayLabel.textContent = '';
    }
  }
  if (lessonLocation && lessonLocationContent) {
    var hasLocation = renderEventLocation(lessonLocationContent, lessonLocationIcon, event && event.location);
    lessonLocation.hidden = !hasLocation;
  }
  if (meetingUrl && meetingUrlLink) {
    if (event && event.meetingUrl) {
      meetingUrl.style.display = 'grid';
      meetingUrlLink.href = event.meetingUrl;
    } else {
      meetingUrl.style.display = 'none';
      meetingUrlLink.removeAttribute('href');
    }
  }
  if (notesUrl && notesUrlLink) {
    if (event && event.notesUrl) {
      notesUrl.style.display = 'grid';
      notesUrlLink.href = event.notesUrl;
    } else {
      notesUrl.style.display = 'none';
      notesUrlLink.removeAttribute('href');
    }
  }
  if (revert) {
    var hasPendingVisualDrop = Boolean(modal.updatedScheduleItem && modal.updatedScheduleItem.hasAttribute('updated-event') && modal.updatedScheduleItem.scheduleOriginalPosition);
    var canRevert = !!(event && (event.scheduleOverrideId || event.lessonId || event.earlyPaymentId && !canUseActions)) || hasPendingVisualDrop;
    revert.toggleAttribute('data-pending-visual-drop', hasPendingVisualDrop);
    revert.style.display = canRevert ? 'inline-flex' : 'none';
    revert.disabled = !canRevert;
  }
  if (edit) {
    edit.dataset.url = event && event.calendarEditUrl ? event.calendarEditUrl : '';
    edit.style.display = edit.dataset.url ? 'inline-flex' : 'none';
    edit.disabled = !edit.dataset.url;
  }
  if (taught) {
    preserveButtonLabel(taught);
    taught.disabled = !event || !hasLessonSource;
    taught.style.display = canUseActions ? '' : 'none';
    restoreButtonLabel(taught);
  }
  if (cancelLesson) {
    preserveButtonLabel(cancelLesson);
    cancelLesson.disabled = !event || !hasLessonSource || event.lessonStatus === 'canceled';
    cancelLesson.style.display = hasLessonSource ? '' : 'none';
    restoreButtonLabel(cancelLesson);
  }
  if (confirmPayment) {
    preserveButtonLabel(confirmPayment);
    confirmPayment.style.display = canUseActions ? '' : 'none';
    confirmPayment.dataset.url = event && event.paymentUrl ? event.paymentUrl : '';
    restoreButtonLabel(confirmPayment);
  }
  if (earlyPayment) {
    preserveButtonLabel(earlyPayment);
    earlyPayment.disabled = !event || !hasLessonSource;
    earlyPayment.style.display = event && !canUseActions && event.lessonStatus === 'unconfirmed' ? '' : 'none';
    restoreButtonLabel(earlyPayment);
  }
  if (rescheduleOriginalDate) {
    rescheduleOriginalDate.value = event && event.originalDate ? event.originalDate : eventDate;
  }
  if (rescheduleOriginalStartTime) {
    rescheduleOriginalStartTime.value = event && event.originalStartTime ? normalizeTime(event.originalStartTime) : event && event.start ? normalizeTime(event.start) : '08:00';
  }
  if (rescheduleDate) {
    rescheduleDate.value = eventDate;
  }
  if (rescheduleLessonPlan) {
    rescheduleLessonPlan.value = lessonPlanId;
  }
  var rescheduleSingleLessonPlan = modal.querySelector('#reschedule-lesson [name="single_lesson_plan_id"]');
  if (rescheduleSingleLessonPlan) {
    rescheduleSingleLessonPlan.value = singleLessonPlanId;
  }
  if (rescheduleForm) {
    rescheduleForm.action = singleLessonPlanId && rescheduleForm.dataset.singleAction ? rescheduleForm.dataset.singleAction : rescheduleForm.dataset.recurringAction || rescheduleForm.action;
  }
  if (cancelLessonForm) {
    var recurringCancelFields = cancelLessonForm.querySelectorAll('[data-recurring-cancel-fields]');
    var singleCancelWarning = cancelLessonForm.querySelector('[data-single-cancel-warning]');
    var cancelReasonInputs = cancelLessonForm.querySelectorAll('input[name="canceled_by"]');
    var isSingleLessonCancel = !!singleLessonPlanId;
    var cancelFormPayload = {
      lesson_plan_id: lessonPlanId,
      single_lesson_plan_id: singleLessonPlanId,
      date: eventDate,
      start: event && event.start ? normalizeTime(event.start) : '',
      end: event && event.end ? normalizeTime(event.end) : '',
      scheduled_date: event && event.originalDate ? event.originalDate : eventDate,
      scheduled_start_time: event && event.originalStartTime ? normalizeTime(event.originalStartTime) : event && event.start ? normalizeTime(event.start) : '',
      schedule_override_id: event && event.scheduleOverrideId ? event.scheduleOverrideId : ''
    };
    Object.keys(cancelFormPayload).forEach(function (name) {
      var input = cancelLessonForm.querySelector("[name=\"".concat(name, "\"]"));
      if (input) {
        input.value = cancelFormPayload[name];
      }
    });
    recurringCancelFields.forEach(function (fieldset) {
      fieldset.hidden = isSingleLessonCancel;
    });
    if (singleCancelWarning) {
      singleCancelWarning.hidden = !isSingleLessonCancel;
    }
    cancelReasonInputs.forEach(function (input) {
      input.disabled = isSingleLessonCancel;
    });
  }
  setTimeSelectValue(rescheduleStartTime, event && event.start ? event.start : '08:00');
  renderRescheduleEndOptions(rescheduleStartTime, rescheduleEndTime, event && event.end ? normalizeTime(event.end) : '08:15');
  setTimeSelectValue(rescheduleEndTime, event && event.end ? event.end : '08:15');
  state.rescheduleAnchor = null;
  state.rescheduleDurationMinutes = Math.max(15, getSelectTimeMinutes(rescheduleEndTime) - getSelectTimeMinutes(rescheduleStartTime));
  state.rescheduleDatePickerDate = parseDateString(eventDate);
  renderRescheduleDatePicker(modal);
  modal.dataset.lessonStatus = event && event.lessonStatus ? event.lessonStatus : 'unconfirmed';
  modal.dataset.lessonCanceledBy = event && event.canceledBy ? event.canceledBy : '';
};
var openLessonModal = function openLessonModal(event, options) {
  var modal = document.getElementById('lesson-modal');
  var settings = options || {};
  if (!modal) {
    return;
  }
  resetLessonModalState(modal);
  modal.updatedScheduleItem = settings.updatedItem || null;
  populateLessonModal(modal, event);
  if (settings.openReschedule) {
    modal.classList.add('is-drop-rescheduling');
    modal.dataset.dropRecurring = event && event.lessonPlanId ? 'true' : 'false';
    showLessonRescheduleForm(modal);
  }
  if (event) {
    modal.dataset.eventGuid = event.guid || '';
    modal.dataset.eventTitle = event.title || '';
    modal.dataset.eventDate = event.date || '';
    modal.dataset.eventStart = event.start || '';
    modal.dataset.eventEnd = event.end || '';
    modal.dataset.lessonPlanId = event.lessonPlanId || '';
    modal.dataset.singleLessonPlanId = event.singleLessonPlanId || '';
    modal.dataset.lessonId = event.lessonId || '';
    modal.dataset.scheduleOverrideId = event.scheduleOverrideId || '';
    modal.dataset.earlyPaymentId = event.earlyPaymentId || '';
    modal.dataset.originalDate = event.originalDate || event.date || '';
    modal.dataset.originalStartTime = event.originalStartTime || event.start || '';
  } else {
    modal.dataset.eventGuid = '';
    modal.dataset.eventTitle = '';
    modal.dataset.eventDate = '';
    modal.dataset.eventStart = '';
    modal.dataset.eventEnd = '';
    modal.dataset.lessonPlanId = '';
    modal.dataset.singleLessonPlanId = '';
    modal.dataset.lessonId = '';
    modal.dataset.scheduleOverrideId = '';
    modal.dataset.earlyPaymentId = '';
    modal.dataset.originalDate = '';
    modal.dataset.originalStartTime = '';
  }
  if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
    return;
  }
  if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
    window.jQuery(modal).modal('show');
  }
};
var formatBreakDateRange = function formatBreakDateRange(event) {
  var startsOn = event && event.startsOn ? event.startsOn : event && event.date ? event.date.substring(0, 10) : '';
  var endsOn = event && event.endsOn ? event.endsOn : startsOn;
  if (!startsOn) {
    return '';
  }
  var startLabel = modalDateFormatter.format(parseDateString(startsOn));
  var endLabel = endsOn && endsOn !== startsOn ? modalDateFormatter.format(parseDateString(endsOn)) : '';
  return endLabel ? "".concat(startLabel, " - ").concat(endLabel) : startLabel;
};
var openTeachingBreakModal = function openTeachingBreakModal(event) {
  var modal = document.getElementById('teaching-break-modal');
  if (!modal || !event) {
    return;
  }
  var title = modal.querySelector('.modal-title');
  var dates = modal.querySelector('#teaching-break-dates');
  var reason = modal.querySelector('#teaching-break-reason');
  var locations = modal.querySelector('#teaching-break-locations');
  var impact = modal.querySelector('#teaching-break-impact');
  var lessons = modal.querySelector('#teaching-break-lessons');
  var missedLessons = Array.isArray(event.missedLessons) ? event.missedLessons : [];
  if (title) {
    title.textContent = event.title || 'Teaching break';
  }
  if (dates) {
    dates.textContent = formatBreakDateRange(event);
  }
  if (reason) {
    reason.textContent = event.reason || 'No reason added.';
  }
  if (locations) {
    locations.textContent = Array.isArray(event.locations) && event.locations.length ? event.locations.map(function (location) {
      return location.name;
    }).join(', ') : 'All locations';
  }
  if (impact) {
    var count = Number(event.missedLessonCount || 0);
    impact.textContent = "".concat(count, " ").concat(count === 1 ? 'lesson' : 'lessons', " missed \xB7 ").concat(paymentFormatter.format(Number(event.missedFeeAmount || 0) / 100), " missed");
  }
  if (lessons) {
    lessons.innerHTML = '';
    if (!missedLessons.length) {
      var empty = document.createElement('div');
      empty.className = 'opacity-4';
      empty.textContent = 'No lessons are currently scheduled during this break.';
      lessons.appendChild(empty);
    }
    missedLessons.forEach(function (lesson) {
      var row = document.createElement('div');
      var name = document.createElement('strong');
      var details = document.createElement('span');
      row.className = 'calendar-break-lesson';
      name.textContent = lesson.student || 'Lesson';
      details.textContent = "".concat(lesson.date ? modalDateFormatter.format(parseDateString(String(lesson.date).substring(0, 10))) : '', " \xB7 ").concat(formatModalEventTime(lesson.start), "-").concat(formatModalEventTime(lesson.end), " \xB7 ").concat(paymentFormatter.format(Number(lesson.fee_amount || 0) / 100));
      row.appendChild(name);
      row.appendChild(details);
      lessons.appendChild(row);
    });
  }
  if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
    return;
  }
  if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
    window.jQuery(modal).modal('show');
  }
};
var openRecitalModal = function openRecitalModal(event) {
  var modal = document.getElementById('recital-modal');
  if (!modal || !event) {
    return;
  }
  var title = modal.querySelector('.modal-title');
  var date = modal.querySelector('#recital-date');
  var time = modal.querySelector('#recital-time');
  var location = modal.querySelector('#recital-location');
  var participants = modal.querySelector('#recital-participants');
  var students = Array.isArray(event.students) ? event.students : [];
  if (title) title.textContent = event.title || 'Recital';
  if (date) date.textContent = event.date ? modalDateFormatter.format(parseDateString(event.date)) : '';
  if (time) time.textContent = formatModalEventTime(event.start);
  if (location) {
    var locationName = event.location && event.location.name ? event.location.name : 'No location specified';
    var address = event.location && event.location.address ? event.location.address : '';
    var mapUrl = event.location && event.location.map_url ? event.location.map_url : '';
    location.innerHTML = '';
    if (mapUrl) {
      var link = document.createElement('a');
      link.href = mapUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = locationName;
      location.appendChild(link);
    } else {
      location.appendChild(document.createTextNode(locationName));
    }
    if (address) {
      location.appendChild(document.createTextNode(" \xB7 ".concat(address)));
    }
  }
  if (participants) {
    participants.innerHTML = '';
    if (!students.length) {
      var empty = document.createElement('div');
      empty.className = 'opacity-4';
      empty.textContent = 'No participating students.';
      participants.appendChild(empty);
    }
    students.forEach(function (student) {
      var row = document.createElement('div');
      row.className = 'calendar-break-lesson';
      row.textContent = student.name || 'Student';
      participants.appendChild(row);
    });
  }
  if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
    return;
  }
  if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
    window.jQuery(modal).modal('show');
  }
};
var appendTextWithLinks = function appendTextWithLinks(element, text, options) {
  var settings = options || {};
  var urlPattern = /(?:https?:\/\/|www\.)[^\s]+/gi;
  var cursor = 0;
  var match;
  while ((match = urlPattern.exec(text)) !== null) {
    var rawUrl = match[0];
    var trailingMatch = rawUrl.match(/[),.;!?]+$/);
    var trailing = trailingMatch ? trailingMatch[0] : '';
    var url = trailing ? rawUrl.slice(0, -trailing.length) : rawUrl;
    var link = document.createElement('a');
    element.appendChild(document.createTextNode(text.slice(cursor, match.index)));
    link.href = /^https?:\/\//i.test(url) ? url : "https://".concat(url);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = settings.labelZoomLinks && isZoomUrl(link.href) ? 'Join the meeting' : url;
    element.appendChild(link);
    if (trailing) {
      element.appendChild(document.createTextNode(trailing));
    }
    cursor = match.index + rawUrl.length;
  }
  element.appendChild(document.createTextNode(text.slice(cursor)));
};
var isZoomUrl = function isZoomUrl(value) {
  try {
    var hostname = new URL(value, window.location.origin).hostname.toLowerCase();
    return hostname === 'zoom.us' || hostname.endsWith('.zoom.us');
  } catch (error) {
    return false;
  }
};
var normalizeHttpUrl = function normalizeHttpUrl(value) {
  var text = String(value || '').trim();
  if (!text || /\s/.test(text)) {
    return '';
  }
  try {
    var url = new URL(/^www\./i.test(text) ? "https://".concat(text) : text);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch (error) {
    return '';
  }
};
var compactPhysicalLocation = function compactPhysicalLocation(location) {
  if (location && _typeof(location) === 'object') {
    var address = String(location.address || '').trim();
    var city = String(location.city || '').trim();
    return [address, city].filter(Boolean).join(', ') || String(location.name || '').trim();
  }
  var text = String(location || '').replace(/\s*\n+\s*/g, ', ').trim();
  var parts = text.split(',').map(function (part) {
    return part.trim();
  }).filter(Boolean);
  if (parts.length < 2) {
    return text;
  }
  var streetIndex = parts.findIndex(function (part) {
    return /^\d+[A-Za-z]?(?:[-\s]|$)/.test(part);
  });
  if (streetIndex >= 0 && parts[streetIndex + 1]) {
    return "".concat(parts[streetIndex], ", ").concat(parts[streetIndex + 1]);
  }
  return parts.slice(0, 2).join(', ');
};
var physicalLocationQuery = function physicalLocationQuery(location) {
  if (location && _typeof(location) === 'object') {
    return [location.address, location.city, location.state, location.postal_code].map(function (part) {
      return String(part || '').trim();
    }).filter(Boolean).join(', ') || String(location.name || '').trim();
  }
  return String(location || '').trim();
};
var locationValue = function locationValue(location) {
  if (!location || _typeof(location) !== 'object') {
    return String(location || '').trim();
  }
  return String(location.address || location.name || '').trim();
};
var isVirtualLocation = function isVirtualLocation(value) {
  return /^(?:online|virtual|remote|zoom|google meet|meet)$/i.test(String(value || '').trim());
};
var setLocationIcon = function setLocationIcon(icon, useVideoIcon) {
  if (!icon) {
    return;
  }
  icon.classList.remove('fa-location-dot', 'fa-video');
  icon.classList.add(useVideoIcon ? 'fa-video' : 'fa-location-dot');
};
var renderEventLocation = function renderEventLocation(element, icon, location) {
  var value = locationValue(location);
  var query = physicalLocationQuery(location);
  var url = normalizeHttpUrl(value);
  var virtual = isVirtualLocation(value);
  element.innerHTML = '';
  if (!value) {
    return false;
  }
  if (url) {
    var _link = document.createElement('a');
    setLocationIcon(icon, true);
    _link.href = url;
    _link.target = '_blank';
    _link.rel = 'noopener noreferrer';
    _link.textContent = 'Join the meeting';
    element.appendChild(_link);
    return true;
  }
  if (virtual) {
    setLocationIcon(icon, true);
    element.textContent = value;
    return true;
  }
  var link = document.createElement('a');
  setLocationIcon(icon, false);
  link.href = "https://www.google.com/maps/search/?api=1&query=".concat(encodeURIComponent(query));
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = compactPhysicalLocation(location);
  element.appendChild(link);
  return true;
};
var renderNotesWithLinks = function renderNotesWithLinks(element, notes, options) {
  var text = String(notes || '');
  element.innerHTML = '';
  if (!text) {
    return;
  }
  element.classList.remove('opacity-4');
  appendTextWithLinks(element, text, options);
};
var renderGoogleNotesHtml = function renderGoogleNotesHtml(element, notes) {
  element.innerHTML = DOMPurify.sanitize(String(notes || ''), {
    ALLOWED_TAGS: ['a', 'p', 'br', 'div', 'span', 'strong', 'b', 'em', 'i', 'u', 'ul', 'ol', 'li', 'blockquote'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false
  });
  element.classList.remove('opacity-4');
  element.querySelectorAll('a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var url;
    try {
      url = new URL(href, window.location.origin);
    } catch (error) {
      link.replaceWith(document.createTextNode(link.textContent || ''));
      return;
    }
    if (!['http:', 'https:'].includes(url.protocol)) {
      link.replaceWith(document.createTextNode(link.textContent || ''));
      return;
    }
    link.href = url.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
  var walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  var textNodes = [];
  var node;
  while (node = walker.nextNode()) {
    if (!node.parentElement || !node.parentElement.closest('a')) {
      textNodes.push(node);
    }
  }
  textNodes.forEach(function (textNode) {
    if (!/(?:https?:\/\/|www\.)/i.test(textNode.nodeValue || '')) {
      return;
    }
    var fragment = document.createDocumentFragment();
    appendTextWithLinks(fragment, textNode.nodeValue || '');
    textNode.replaceWith(fragment);
  });
};
var formatGeneralEventNotification = function formatGeneralEventNotification(minutes) {
  if (minutes === null || minutes === undefined || minutes === '') {
    return '';
  }
  var value = Number(minutes);
  if (value === 0) {
    return 'At the event time';
  }
  if (value === 1440) {
    return '1 day before';
  }
  if (value >= 60 && value % 60 === 0) {
    var hours = value / 60;
    return "".concat(hours, " ").concat(hours === 1 ? 'hour' : 'hours', " before");
  }
  return "".concat(value, " ").concat(value === 1 ? 'minute' : 'minutes', " before");
};
var clearGeneralEventActionError = function clearGeneralEventActionError(modal) {
  var error = modal ? modal.querySelector('[data-general-event-action-error]') : null;
  if (!error) {
    return;
  }
  error.textContent = '';
  error.hidden = true;
};
var showGeneralEventActionError = function showGeneralEventActionError(modal, message) {
  var error = modal ? modal.querySelector('[data-general-event-action-error]') : null;
  if (!error) {
    return;
  }
  error.textContent = message || 'Unable to update this event.';
  error.hidden = false;
};
var resetGeneralEventModalState = function resetGeneralEventModalState(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-canceling', 'is-rescheduling', 'is-drop-rescheduling');
  state.rescheduleAnchor = null;
  clearGeneralEventActionError(modal);
  modal.querySelectorAll('button[type="submit"], input[type="submit"]').forEach(function (submit) {
    submit.disabled = false;
    restoreButtonLabel(submit);
  });
};
var showGeneralEventRescheduleForm = function showGeneralEventRescheduleForm(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-canceling');
  modal.classList.add('is-rescheduling');
};
var showGeneralEventCancelForm = function showGeneralEventCancelForm(modal) {
  if (!modal) {
    return;
  }
  modal.classList.remove('is-rescheduling');
  modal.classList.add('is-canceling');
};
var openGeneralEventModal = function openGeneralEventModal(event, options) {
  var modal = document.getElementById('general-event-modal');
  var settings = options || {};
  if (!modal || !event) {
    return;
  }
  var title = modal.querySelector('.modal-title');
  var date = modal.querySelector('#general-event-date');
  var time = modal.querySelector('#general-event-time');
  var eventType = modal.querySelector('#general-event-type');
  var eventTypeIcon = modal.querySelector('#general-event-type-icon');
  var eventTypeSection = modal.querySelector('[data-general-event-type-section]');
  var notification = modal.querySelector('#general-event-notification');
  var notes = modal.querySelector('#general-event-notes');
  var notesSection = modal.querySelector('[data-general-event-notes-section]');
  var externalSection = modal.querySelector('[data-general-event-external-section]');
  var meetingLink = modal.querySelector('[data-general-event-meeting-link]');
  var organizer = modal.querySelector('[data-general-event-organizer]');
  var organizerSection = modal.querySelector('[data-general-event-organizer-section]');
  var location = modal.querySelector('[data-general-event-location]');
  var locationIcon = modal.querySelector('[data-general-event-location-icon]');
  var locationSection = modal.querySelector('[data-general-event-location-section]');
  var address = modal.querySelector('[data-general-event-address]');
  var addressSection = modal.querySelector('[data-general-event-address-section]');
  var edit = modal.querySelector('#event-edit');
  var revert = modal.querySelector('#event-revert');
  var controls = modal.querySelector('#general-event-controls');
  var rescheduleForm = modal.querySelector('#reschedule-general-event form');
  var cancelForm = modal.querySelector('#cancel-general-event form');
  var rescheduleDate = modal.querySelector('#reschedule-general-event-date');
  var rescheduleStartTime = modal.querySelector('#reschedule-general-event-start-time');
  var rescheduleEndTime = modal.querySelector('#reschedule-general-event-end-time');
  var isCanceled = event.calendarStatus === 'canceled';
  resetGeneralEventModalState(modal);
  modal.updatedScheduleItem = settings.updatedItem || null;
  if (title) title.textContent = event.title || 'Event';
  if (date) date.textContent = event.date ? modalDateFormatter.format(parseDateString(event.date)) : '';
  if (time) time.textContent = event.allDay ? 'All day' : event.start && event.end ? "".concat(formatModalEventTime(event.start), " - ").concat(formatModalEventTime(event.end)) : formatModalEventTime(event.start);
  if (eventType) eventType.textContent = event.eventType || '';
  if (eventTypeIcon) {
    var eventTypeIconStyle = event.externalProvider === 'google' ? 'fa-brands' : 'fas';
    eventTypeIcon.className = "".concat(eventTypeIconStyle, " calendar-modal-detail-icon").concat(event.eventTypeIcon ? " fa-".concat(event.eventTypeIcon) : '');
    eventTypeIcon.hidden = !event.eventTypeIcon;
  }
  if (eventTypeSection) eventTypeSection.hidden = !event.eventType;
  if (notification) {
    notification.textContent = formatGeneralEventNotification(event.notificationMinutesBefore);
    notification.parentElement.hidden = !notification.textContent;
  }
  if (notesSection) notesSection.hidden = !String(event.notes || '').trim();
  if (notes) {
    if (event.externalProvider === 'google') {
      renderGoogleNotesHtml(notes, event.notes);
    } else {
      renderNotesWithLinks(notes, event.notes);
    }
  }
  if (externalSection) externalSection.hidden = !event.meetingUrl;
  if (meetingLink) {
    meetingLink.href = event.meetingUrl || '#';
    meetingLink.hidden = !event.meetingUrl;
  }
  if (organizerSection) organizerSection.hidden = !(event.organizerName || event.organizerEmail);
  if (organizer) organizer.textContent = event.organizerName || event.organizerEmail || '';
  if (location && locationSection) {
    locationSection.hidden = !renderEventLocation(location, locationIcon, event.location);
  }
  if (address && addressSection) {
    var usesUrlLocation = event.externalProvider === 'google' && Boolean(normalizeHttpUrl(locationValue(event.location)));
    var homeLocation = usesUrlLocation ? window.calendarHomeLocation : null;
    addressSection.hidden = !homeLocation || !renderEventLocation(address, addressSection.querySelector('.calendar-modal-detail-icon'), homeLocation);
  }
  if (edit) {
    edit.dataset.url = event.editUrl || '';
    edit.style.display = edit.dataset.url ? 'inline-flex' : 'none';
    edit.disabled = !edit.dataset.url;
  }
  if (revert) {
    var hasPendingVisualDrop = Boolean(modal.updatedScheduleItem && modal.updatedScheduleItem.hasAttribute('updated-event') && modal.updatedScheduleItem.scheduleOriginalPosition);
    var canRevertCancellation = isCanceled && Boolean(event.revertUrl);
    revert.dataset.url = event.revertUrl || '';
    revert.toggleAttribute('data-pending-visual-drop', hasPendingVisualDrop);
    revert.style.display = hasPendingVisualDrop || canRevertCancellation ? 'inline-flex' : 'none';
    revert.disabled = !hasPendingVisualDrop && !canRevertCancellation;
    restoreButtonLabel(revert);
  }
  if (controls) {
    if (isCanceled || event.readOnly) {
      controls.style.setProperty('display', 'none', 'important');
    } else {
      controls.style.removeProperty('display');
    }
  }
  modal.dataset.eventGuid = event.guid || '';
  modal.dataset.eventId = event.id || '';
  if (rescheduleForm) rescheduleForm.action = event.rescheduleUrl || '';
  if (cancelForm) cancelForm.action = event.destroyUrl || '';
  if (rescheduleDate) rescheduleDate.value = event.date || todayString();
  setTimeSelectValue(rescheduleStartTime, event.start || '08:00');
  renderRescheduleEndOptions(rescheduleStartTime, rescheduleEndTime, event.end ? normalizeTime(event.end) : '08:15');
  setTimeSelectValue(rescheduleEndTime, event.end || '08:15');
  state.rescheduleDurationMinutes = Math.max(15, getSelectTimeMinutes(rescheduleEndTime) - getSelectTimeMinutes(rescheduleStartTime));
  state.generalEventRescheduleDatePickerDate = parseDateString(event.date || todayString());
  renderGeneralEventRescheduleDatePicker(modal);
  if (settings.openReschedule && !event.readOnly) {
    modal.classList.add('is-drop-rescheduling');
    showGeneralEventRescheduleForm(modal);
  }
  showBootstrapModal(modal);
};
var submitGeneralEventModalForm = function submitGeneralEventModalForm(form, refreshCalendar) {
  var modal = form ? form.closest('#general-event-modal') : null;
  var isReschedule = !!(form && form.closest('#reschedule-general-event'));
  if (!modal || !form.action) {
    return;
  }
  setFormSubmitting(form, true);
  clearGeneralEventActionError(modal);
  requestJson(form.action, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: new FormData(form)
  }, isReschedule ? 'Unable to reschedule event.' : 'Unable to cancel event.').then(function () {
    return refreshCalendar().then(function () {
      hideBootstrapModal(modal);
    });
  })["catch"](function (error) {
    console.error(error);
    showGeneralEventActionError(modal, error.message);
  })["finally"](function () {
    setFormSubmitting(form, false);
  });
};
var revertGeneralEventAction = function revertGeneralEventAction(button, refreshCalendar) {
  var modal = button ? button.closest('#general-event-modal') : null;
  var url = button ? button.dataset.url : '';
  if (!modal || !url) {
    return;
  }
  button.disabled = true;
  clearGeneralEventActionError(modal);
  requestJson(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }, 'Unable to revert event cancellation.').then(function () {
    return refreshCalendar().then(function () {
      hideBootstrapModal(modal);
    });
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showGeneralEventActionError(modal, error.message);
  });
};
var updateLessonModalState = function updateLessonModalState(modal, payload) {
  var revert = modal.querySelector('#lesson-revert');
  var taught = modal.querySelector('#lesson-taught');
  var cancelLesson = modal.querySelector('#cancel-lesson-button');
  var event = getEventByGuid(modal.dataset.eventGuid);
  var status = payload && payload.status ? payload.status : 'unpaid';
  var editUrl = payload && payload.edit_url ? payload.edit_url : '';
  var paymentUrl = payload && (payload.payment_url || payload.paymentUrl) ? payload.payment_url || payload.paymentUrl : '';
  var lessonId = payload && payload.lesson_id ? payload.lesson_id : '';
  var confirmPayment = modal.querySelector('#confirm-payment');
  var earlyPayment = modal.querySelector('#early-payment');
  var hasEarlyPaymentId = payload && Object.prototype.hasOwnProperty.call(payload, 'early_payment_id');
  var earlyPaymentId = hasEarlyPaymentId ? payload.early_payment_id || '' : event ? event.earlyPaymentId : '';
  modal.dataset.lessonStatus = status;
  modal.dataset.lessonCanceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
  modal.dataset.earlyPaymentId = earlyPaymentId;
  if (payload && payload.lesson_deleted) {
    modal.dataset.lessonId = '';
  } else if (lessonId) {
    modal.dataset.lessonId = lessonId;
  }
  if (taught) {
    taught.disabled = false;
    restoreButtonLabel(taught);
  }
  if (cancelLesson) {
    cancelLesson.disabled = status === 'canceled';
    restoreButtonLabel(cancelLesson);
  }
  if (confirmPayment && paymentUrl) {
    confirmPayment.dataset.url = paymentUrl;
  }
  if (earlyPayment) {
    earlyPayment.style.display = 'none';
    earlyPayment.disabled = false;
    restoreButtonLabel(earlyPayment);
  }
  if (event) {
    event.lessonStatus = status;
    event.calendarStatus = status === 'early-payment' ? status : payload && payload.schedule_override_deleted ? status : event.calendarStatus === 'rescheduled' ? 'rescheduled' : status;
    event['data-lesson-status'] = event.calendarStatus;
    event.canceledBy = payload && payload.canceled_by ? payload.canceled_by : '';
    event.lessonEditUrl = payload && payload.lesson_deleted ? '' : editUrl || event.lessonEditUrl || '';
    event.paymentUrl = payload && payload.lesson_deleted ? '' : paymentUrl || event.paymentUrl || '';
    event.lessonId = payload && payload.lesson_deleted ? '' : lessonId || event.lessonId || '';
    event.scheduleOverrideId = payload && payload.schedule_override_deleted ? '' : event.scheduleOverrideId;
    event.earlyPaymentId = earlyPaymentId;
  }
  if (revert) {
    var canRevert = !!(event && (event.scheduleOverrideId || event.lessonId || event.earlyPaymentId && !canUseLessonActionButtons(event)));
    revert.style.display = canRevert ? 'inline-flex' : 'none';
    revert.disabled = !canRevert;
  }
  var calendarStatus = event && event.calendarStatus ? event.calendarStatus : status;
  getCalendarEventElementsByGuid(modal.dataset.eventGuid).forEach(function (item) {
    item.setAttribute('data-lesson-status', calendarStatus);
    applyEventTimeStatusAttributes(item, event);
    item.querySelectorAll('[data-lesson-status]').forEach(function (child) {
      child.setAttribute('data-lesson-status', calendarStatus);
      applyEventTimeStatusAttributes(child, event);
    });
  });
  renderCalendarPaymentTotals();
};
var getLessonOccurrencePayload = function getLessonOccurrencePayload(modal) {
  return {
    lesson_plan_id: modal.dataset.lessonPlanId || '',
    single_lesson_plan_id: modal.dataset.singleLessonPlanId || '',
    date: modal.dataset.eventDate || '',
    start: modal.dataset.eventStart || '',
    end: modal.dataset.eventEnd || '',
    scheduled_date: modal.dataset.originalDate || modal.dataset.eventDate || '',
    scheduled_start_time: modal.dataset.originalStartTime || modal.dataset.eventStart || '',
    schedule_override_id: modal.dataset.scheduleOverrideId || ''
  };
};
var revertScheduleOverrideInState = function revertScheduleOverrideInState(event) {
  if (!event || !event.lessonPlanId || !event.scheduleOverrideId) {
    return;
  }
  var lessonPlan = state.plannedLessons.find(function (plan) {
    return String(plan.id) === String(event.lessonPlanId);
  });
  if (!lessonPlan || !Array.isArray(lessonPlan.occurrences)) {
    return;
  }
  lessonPlan.occurrences = lessonPlan.occurrences.filter(function (occurrence) {
    return String(occurrence.schedule_override_id || '') !== String(event.scheduleOverrideId);
  });
  if (!lessonPlan.occurrences.some(function (occurrence) {
    return occurrence.date === event.originalDate && normalizeTime(occurrence.start || lessonPlan.start_time) === normalizeTime(event.originalStartTime || event.start);
  })) {
    var start = normalizeTime(event.originalStartTime || lessonPlan.start_time);
    lessonPlan.occurrences.push({
      date: event.originalDate || event.date,
      start: start,
      end: addMinutesToTime(start, lessonPlan.duration_minutes),
      original_date: event.originalDate || event.date,
      original_start_time: start,
      lesson_id: '',
      lesson_status: 'unconfirmed',
      calendar_status: 'unconfirmed',
      fee_amount: event.feeAmount || lessonPlan.fee_amount || 0,
      canceled_by: '',
      lesson_edit_url: '',
      lesson_payment_url: ''
    });
  }
};
var revertLessonInState = function revertLessonInState(event, lessonId) {
  if (!event || !lessonId) {
    return;
  }
  var lessonPlan = state.plannedLessons.concat(state.singleLessonPlans).find(function (plan) {
    return String(plan.id) === String(event.lessonPlanId || event.singleLessonPlanId);
  });
  if (!lessonPlan || !Array.isArray(lessonPlan.occurrences)) {
    return;
  }
  lessonPlan.occurrences = lessonPlan.occurrences.map(function (occurrence) {
    if (String(occurrence.lesson_id || '') !== String(lessonId)) {
      return occurrence;
    }
    return Object.assign({}, occurrence, {
      lesson_id: '',
      lesson_status: 'unconfirmed',
      calendar_status: occurrence.schedule_override_id ? 'rescheduled' : 'unconfirmed',
      canceled_by: '',
      lesson_edit_url: '',
      lesson_payment_url: ''
    });
  });
};
var revertLessonAction = function revertLessonAction(button, refreshCalendar) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  if (!modal || !url || !modal.dataset.lessonId && !modal.dataset.scheduleOverrideId && !modal.dataset.earlyPaymentId) {
    return;
  }
  button.disabled = true;
  clearLessonActionError(modal);
  requestJson(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(modal.dataset.earlyPaymentId ? {
      lesson_id: '',
      schedule_override_id: '',
      early_payment_id: modal.dataset.earlyPaymentId
    } : {
      lesson_id: modal.dataset.lessonId || '',
      schedule_override_id: modal.dataset.scheduleOverrideId || '',
      early_payment_id: ''
    })
  }, 'Unable to revert lesson action.').then(function (payload) {
    updateLessonModalState(modal, payload);
    return finishLessonModalMutation(modal, refreshCalendar, true);
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showLessonActionError(modal, error.message);
  });
};
var storeEarlyPayment = function storeEarlyPayment(button, refreshCalendar) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  if (!modal || !url || !modal.dataset.lessonPlanId && !modal.dataset.singleLessonPlanId) {
    return;
  }
  button.disabled = true;
  clearLessonActionError(modal);
  requestJson(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(getLessonOccurrencePayload(modal))
  }, 'Unable to record the early payment.').then(function (payload) {
    updateLessonModalState(modal, payload);
    return finishLessonModalMutation(modal, refreshCalendar, true);
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showLessonActionError(modal, error.message);
  });
};
var storeTaughtLesson = function storeTaughtLesson(button, refreshCalendar) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  var lessonPlanId = modal ? modal.dataset.lessonPlanId : '';
  var singleLessonPlanId = modal ? modal.dataset.singleLessonPlanId : '';
  if (!modal || !url || !lessonPlanId && !singleLessonPlanId) {
    return;
  }
  button.disabled = true;
  clearLessonActionError(modal);
  requestJson(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify(getLessonOccurrencePayload(modal))
  }, 'Unable to confirm lesson.').then(function (payload) {
    updateLessonModalState(modal, payload);
    return finishLessonModalMutation(modal, refreshCalendar, true);
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showLessonActionError(modal, error.message);
  });
};
var confirmLessonPayment = function confirmLessonPayment(button, refreshCalendar) {
  var modal = button.closest('#lesson-modal');
  var url = button.dataset.url;
  if (!modal || !url) {
    return;
  }
  button.disabled = true;
  clearLessonActionError(modal);
  requestJson(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }, 'Unable to confirm payment.').then(function (payload) {
    updateLessonModalState(modal, payload);
    return finishLessonModalMutation(modal, refreshCalendar, true);
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    restoreButtonLabel(button);
    showLessonActionError(modal, error.message);
  });
};
var submitLessonModalForm = function submitLessonModalForm(form, refreshCalendar) {
  var modal = form ? form.closest('#lesson-modal') : null;
  var isReschedule = !!(form && form.closest('#reschedule-lesson'));
  if (!modal || !form.action) {
    return;
  }
  setFormSubmitting(form, true);
  clearLessonActionError(modal);
  requestJson(form.action, {
    method: String(form.method || 'POST').toUpperCase(),
    headers: {
      'Accept': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: new FormData(form)
  }, isReschedule ? 'Unable to reschedule lesson.' : 'Unable to cancel lesson.').then(function (payload) {
    if (!isReschedule && payload && payload.status) {
      updateLessonModalState(modal, payload);
    }
    return finishLessonModalMutation(modal, refreshCalendar, !isReschedule);
  })["catch"](function (error) {
    console.error(error);
    showLessonActionError(modal, error.message);
  })["finally"](function () {
    setFormSubmitting(form, false);
  });
};
var patchSchedulePointer = function patchSchedulePointer(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  var pointer = schedule ? schedule.querySelector('.lm-schedule-pointer') : null;
  if (!schedule || !pointer) {
    if (pointer) {
      pointer.style.display = 'none';
    }
    return;
  }
  var now = new Date();
  var minutesPerDivision = 15;
  var minutes = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60 + now.getMilliseconds() / 60000;
  var slot = Math.floor(minutes / minutesPerDivision);
  var slotOffset = minutes % minutesPerDivision / minutesPerDivision;
  var cell = schedule.querySelector("tbody td[data-date=\"".concat(todayString(), "\"][data-y=\"").concat(slot, "\"]:not(.lm-schedule-disabled)"));
  if (!cell || cell.offsetParent === null) {
    pointer.style.display = 'none';
    return;
  }
  var scheduleRect = schedule.getBoundingClientRect();
  var cellRect = cell.getBoundingClientRect();
  pointer.style.display = 'block';
  pointer.style.left = "".concat(cellRect.left - scheduleRect.left + schedule.scrollLeft, "px");
  pointer.style.top = "".concat(cellRect.top - scheduleRect.top + schedule.scrollTop + cellRect.height * slotOffset, "px");
  if (state.view === 'day') {
    pointer.style.width = "".concat(schedule.clientWidth - (cellRect.left - scheduleRect.left), "px");
  } else {
    pointer.style.width = "".concat(cellRect.width, "px");
  }
};
var scrollScheduleToNow = function scrollScheduleToNow(calendar) {
  if (state.didAutoNowScroll || !scheduleGridViews.includes(state.view)) {
    return;
  }
  var schedule = calendar.querySelector('.lm-schedule');
  var pointer = schedule ? schedule.querySelector('.lm-schedule-pointer') : null;
  if (!schedule || !pointer || pointer.style.display === 'none') {
    return;
  }
  var pointerTop = Number.parseFloat(pointer.style.top);
  if (!Number.isFinite(pointerTop)) {
    return;
  }
  schedule.scrollTop = Math.max(0, pointerTop - schedule.clientHeight / 2);
  state.didAutoNowScroll = true;
};
var disconnectScheduleObserver = function disconnectScheduleObserver() {
  if (state.scheduleObserver) {
    state.scheduleObserver.disconnect();
    state.scheduleObserver = null;
  }
};
var watchScheduleChanges = function watchScheduleChanges(calendar) {
  var schedule = calendar.querySelector('.lm-schedule');
  if (!schedule || !scheduleGridViews.includes(state.view)) {
    return;
  }
  disconnectScheduleObserver();
  state.scheduleObserver = new MutationObserver(function () {
    queueSchedulePatch(calendar);
  });
  state.scheduleObserver.observe(schedule, {
    attributes: true,
    attributeFilter: ['data-start', 'data-end'],
    childList: true,
    subtree: true
  });
};
var patchSchedule = function patchSchedule(calendar) {
  disconnectScheduleObserver();
  patchScheduleHeaders(calendar);
  patchScheduleTimeLabels(calendar);
  patchScheduleItems(calendar);
  patchScheduleHolidays(calendar);
  patchSchedulePointer(calendar);
  animateCalendarLessonItems(calendar);
  requestAnimationFrame(function () {
    scrollScheduleToNow(calendar);
  });
  watchScheduleChanges(calendar);
};
var queueSchedulePatch = function queueSchedulePatch(calendar) {
  if (state.schedulePatchFrame) {
    cancelAnimationFrame(state.schedulePatchFrame);
  }
  state.schedulePatchFrame = requestAnimationFrame(function () {
    state.schedulePatchFrame = null;
    patchSchedule(calendar);
  });
};
var normalizeScheduleEvents = function normalizeScheduleEvents(events) {
  return events.map(function (event) {
    return Object.assign({}, event);
  });
};
var isPlannedLessonEvent = function isPlannedLessonEvent(event) {
  var guid = String(event.guid || '');
  return guid.indexOf('planned-lesson-') === 0 || guid.indexOf('single-lesson-plan-') === 0;
};
var syncEvents = function syncEvents(instance) {
  if (!instance || typeof instance.getData !== 'function') {
    return;
  }
  state.customEvents = normalizeScheduleEvents(instance.getData()).filter(function (event) {
    return !isPlannedLessonEvent(event);
  });
};
var normalizeTime = function normalizeTime(value) {
  var match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if (!match || Number(match[1]) > 23 || Number(match[2]) > 59 || Number(match[2]) % 15 !== 0) {
    throw new Error('Lesson times must use HH:MM on 15-minute intervals.');
  }
  return "".concat(String(Number(match[1])).padStart(2, '0'), ":").concat(match[2]);
};
var minutesToTime = function minutesToTime(minutes) {
  var hour = Math.floor(minutes / 60) % 24;
  var minute = minutes % 60;
  return "".concat(String(hour).padStart(2, '0'), ":").concat(String(minute).padStart(2, '0'));
};
var addMinutesToTime = function addMinutesToTime(value, minutes) {
  var match = normalizeTime(value).match(/^(\d{2}):(\d{2})/);
  var total = Number(match[1]) * 60 + Number(match[2]) + Number(minutes || 0);
  return minutesToTime(total);
};
var getEventDateTime = function getEventDateTime(event, key, visibleDate) {
  var eventDate = visibleDate || event && event.date;
  if (!event || !eventDate || !event[key]) {
    return null;
  }
  var date = parseDateString(String(eventDate).substring(0, 10));
  var parts = normalizeTime(event[key]).split(':').map(Number);
  date.setHours(parts[0] || 0, parts[1] || 0, 0, 0);
  return date;
};
var getEventTimeStatus = function getEventTimeStatus(event, visibleDate) {
  if (!event || event.isHoliday || event.isBreak) {
    return '';
  }
  var start = getEventDateTime(event, 'start', visibleDate);
  var end = getEventDateTime(event, 'end', visibleDate);
  var now = new Date();
  if (!start || !end) {
    return '';
  }
  if (start < now && end < now) {
    return 'past';
  }
  if (start > now && end > now) {
    return 'future';
  }
  return '';
};
var applyEventTimeStatusAttributes = function applyEventTimeStatusAttributes(element, event, visibleDate) {
  if (!element) {
    return;
  }
  var status = getEventTimeStatus(event, visibleDate);
  element.toggleAttribute('past-event', status === 'past');
  element.toggleAttribute('future-event', status === 'future');
};
var applyDateStatusAttributes = function applyDateStatusAttributes(element, dateString) {
  if (!element || !dateString) {
    return;
  }
  var today = todayString();
  element.toggleAttribute('past-event', dateString < today);
  element.toggleAttribute('future-event', dateString > today);
};
var applyCalendarItemStatusAttributes = function applyCalendarItemStatusAttributes(element, event, fallbackDateString) {
  if (!element) {
    return;
  }
  if (event && (event.isHoliday || event.isBreak)) {
    applyDateStatusAttributes(element, event.date || fallbackDateString);
    return;
  }
  applyEventTimeStatusAttributes(element, event);
};
var isCanceledCalendarEvent = function isCanceledCalendarEvent(event) {
  return event && (event.lessonStatus === 'canceled' || event.calendarStatus === 'canceled' || event['data-lesson-status'] === 'canceled');
};
var isConflictEligibleTimedEvent = function isConflictEligibleTimedEvent(event) {
  return event && event.guid && !event.isHoliday && !event.isBreak && !isCanceledCalendarEvent(event) && event.start && event.end;
};
var getOverlappingTimedEventGuids = function getOverlappingTimedEventGuids(events) {
  var timedEvents = events.filter(function (event) {
    return isConflictEligibleTimedEvent(event);
  }).map(function (event) {
    return {
      guid: event.guid,
      start: getTimeMinutes(event.start),
      end: getTimeMinutes(event.end)
    };
  }).filter(function (event) {
    return event.end > event.start;
  });
  var guids = new Set();
  timedEvents.forEach(function (event, index) {
    timedEvents.slice(index + 1).forEach(function (otherEvent) {
      if (event.start < otherEvent.end && otherEvent.start < event.end) {
        guids.add(event.guid);
        guids.add(otherEvent.guid);
      }
    });
  });
  return guids;
};
var isOverlappingTimedEvent = function isOverlappingTimedEvent(event, visibleDate) {
  var eventDate = visibleDate || event && event.date;
  if (!isConflictEligibleTimedEvent(event) || !eventDate) {
    return false;
  }
  var date = parseDateString(String(eventDate).substring(0, 10));
  return getOverlappingTimedEventGuids(getEventsForDate(date)).has(event.guid);
};
var applyEventOverlapAttribute = function applyEventOverlapAttribute(element, event) {
  if (!element) {
    return;
  }
  var cell = element.closest('td[data-date]');
  var visibleDate = cell ? cell.getAttribute('data-real-date') || cell.getAttribute('data-date') : '';
  element.toggleAttribute('overlapping-event', isOverlappingTimedEvent(event, visibleDate));
};
var formatSelectTime = function formatSelectTime(value) {
  var match = normalizeTime(value).match(/^(\d{2}):(\d{2})/);
  var hour = Number(match[1]);
  var period = hour < 12 ? 'AM' : 'PM';
  hour = hour % 12 || 12;
  return "".concat(hour, ":").concat(match[2], " ").concat(period);
};
var formatDuration = function formatDuration(minutes) {
  if (minutes >= 60) {
    var hours = minutes / 60;
    return "".concat(Number.isInteger(hours) ? hours : hours.toFixed(1), " hr");
  }
  return "".concat(minutes, " min");
};
var setTimeSelectValue = function setTimeSelectValue(select, value) {
  if (!select) {
    return;
  }
  var normalized = normalizeTime(value);
  if (Array.from(select.options).some(function (option) {
    return option.value === normalized;
  })) {
    select.value = normalized;
    return;
  }
  if (select.options.length) {
    select.selectedIndex = 0;
  }
};
var getSelectTimeMinutes = function getSelectTimeMinutes(select) {
  return getTimeMinutes(select && select.value ? select.value : '00:00');
};
var getSelectOptionMinutes = function getSelectOptionMinutes(select) {
  return Array.from(select ? select.options : []).map(function (option) {
    return getTimeMinutes(option.value);
  });
};
var getSelectMinMinutes = function getSelectMinMinutes(select) {
  var options = getSelectOptionMinutes(select);
  return options.length ? Math.min.apply(null, options) : 0;
};
var getSelectMaxMinutes = function getSelectMaxMinutes(select) {
  var options = getSelectOptionMinutes(select);
  return options.length ? Math.max.apply(null, options) : 0;
};
var setSelectMinutes = function setSelectMinutes(select, minutes) {
  if (!select) {
    return;
  }
  select.value = minutesToTime(minutes);
};
var cacheRescheduleEndOptions = function cacheRescheduleEndOptions(endSelect) {
  if (!endSelect) {
    return [];
  }
  if (Array.isArray(endSelect.calendarRescheduleEndOptions)) {
    return endSelect.calendarRescheduleEndOptions;
  }
  endSelect.calendarRescheduleEndOptions = Array.from(endSelect.options).map(function (option) {
    return {
      value: option.value,
      label: option.textContent
    };
  });
  return endSelect.calendarRescheduleEndOptions;
};
var renderRescheduleEndOptions = function renderRescheduleEndOptions(startSelect, endSelect, preferredValue) {
  if (!startSelect || !endSelect) {
    return;
  }
  var allOptions = cacheRescheduleEndOptions(endSelect);
  var startMinutes = getSelectTimeMinutes(startSelect);
  var selectedValue = preferredValue || endSelect.value;
  var options = allOptions.filter(function (option) {
    return getTimeMinutes(option.value) > startMinutes;
  });
  endSelect.innerHTML = '';
  options.forEach(function (option) {
    var element = document.createElement('option');
    var duration = getTimeMinutes(option.value) - startMinutes;
    element.value = option.value;
    element.textContent = "".concat(option.label, " (").concat(formatDuration(duration), ")");
    endSelect.appendChild(element);
  });
  if (options.some(function (option) {
    return option.value === selectedValue;
  })) {
    endSelect.value = selectedValue;
    return;
  }
  if (endSelect.options.length) {
    endSelect.selectedIndex = 0;
  }
};
var syncRescheduleTimePicker = function syncRescheduleTimePicker(startSelect, endSelect, changedField) {
  if (!startSelect || !endSelect) {
    return;
  }
  var startMin = getSelectMinMinutes(startSelect);
  var endMax = getSelectMaxMinutes(endSelect);
  var startMinutes = getSelectTimeMinutes(startSelect);
  var endMinutes = getSelectTimeMinutes(endSelect);
  var duration = Math.max(15, state.rescheduleDurationMinutes || endMinutes - startMinutes || 15);
  if (!state.rescheduleAnchor) {
    state.rescheduleAnchor = changedField;
  }
  if (changedField === 'start') {
    startMinutes = Math.min(startMinutes, endMax - 15);
    if (state.rescheduleAnchor === 'start') {
      endMinutes = Math.min(startMinutes + duration, endMax);
    }
    if (endMinutes < startMinutes + 15) {
      endMinutes = Math.min(startMinutes + 15, endMax);
    }
    setSelectMinutes(startSelect, startMinutes);
    renderRescheduleEndOptions(startSelect, endSelect, minutesToTime(endMinutes));
    setSelectMinutes(endSelect, endMinutes);
  }
  if (changedField === 'end') {
    endMinutes = Math.max(endMinutes, startMin + 15);
    if (state.rescheduleAnchor === 'end') {
      startMinutes = Math.max(endMinutes - duration, startMin);
    }
    if (endMinutes < startMinutes + 15) {
      endMinutes = Math.min(startMinutes + 15, endMax);
    }
    setSelectMinutes(startSelect, startMinutes);
    renderRescheduleEndOptions(startSelect, endSelect, minutesToTime(endMinutes));
    setSelectMinutes(endSelect, endMinutes);
  }
  state.rescheduleDurationMinutes = Math.max(15, endMinutes - startMinutes);
};
var getStudentName = function getStudentName(student) {
  if (!student) {
    return 'No title';
  }
  return [student.first_name, student.last_name].filter(Boolean).join(' ') || 'No title';
};
var getStudentFirstName = function getStudentFirstName(student) {
  return student && student.first_name ? String(student.first_name).trim() : '';
};
var studentHasBirthdayInWeek = function studentHasBirthdayInWeek(student, dateString) {
  if (!student || !student.date_of_birth || !isDateString(dateString)) {
    return false;
  }
  var birthDate = parseNullableDateString(student.date_of_birth);
  if (!birthDate) {
    return false;
  }
  var eventDate = parseDateString(dateString);
  var weekStart = startOfWeek(eventDate);
  var weekEnd = addDays(weekStart, 6);
  var years = Array.from(new Set([weekStart.getFullYear(), weekEnd.getFullYear()]));
  return years.some(function (year) {
    var birthday = createLocalDate(year, birthDate.getMonth(), birthDate.getDate());
    return birthday >= weekStart && birthday <= weekEnd;
  });
};
var getOrdinalSuffix = function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
var formatBirthdayModalDate = function formatBirthdayModalDate(date) {
  return "".concat(birthdayMonthFormatter.format(date), " ").concat(date.getDate()).concat(getOrdinalSuffix(date.getDate()));
};
var getStudentBirthdayModalLabel = function getStudentBirthdayModalLabel(student, dateString) {
  if (!student || !student.date_of_birth || !isDateString(dateString)) {
    return '';
  }
  var birthDate = parseNullableDateString(student.date_of_birth);
  if (!birthDate) {
    return '';
  }
  var eventDate = parseDateString(dateString);
  var years = [eventDate.getFullYear() - 1, eventDate.getFullYear(), eventDate.getFullYear() + 1];
  var closestBirthday = null;
  var closestDiff = null;
  years.forEach(function (year) {
    var birthday = createLocalDate(year, birthDate.getMonth(), birthDate.getDate());
    var diff = Math.round((birthday.getTime() - eventDate.getTime()) / dayMilliseconds);
    if (Math.abs(diff) <= state.birthdayWindow && (closestDiff === null || Math.abs(diff) < Math.abs(closestDiff))) {
      closestBirthday = birthday;
      closestDiff = diff;
    }
  });
  if (!closestBirthday) {
    return '';
  }
  if (closestDiff === 0) {
    return 'today!';
  }
  if (closestDiff === -1) {
    return 'yesterday!';
  }
  if (closestDiff === 1) {
    return 'tomorrow!';
  }
  return "on ".concat(formatBirthdayModalDate(closestBirthday));
};
var studentHasBirthdayNearEvent = function studentHasBirthdayNearEvent(student, dateString) {
  return Boolean(getStudentBirthdayModalLabel(student, dateString));
};
var renderEventTitle = function renderEventTitle(element, event, fallback) {
  if (!element) {
    return;
  }
  element.textContent = event && event.title || fallback || 'No title';
};
var clearScheduleItemBirthdayDecoration = function clearScheduleItemBirthdayDecoration(item) {
  if (!item) {
    return;
  }
  Array.from(item.children).forEach(function (child) {
    if (child.classList && child.classList.contains('calendar-birthday-icon')) {
      child.remove();
    }
  });
  item.removeAttribute('data-birthday-this-week');
  item.removeAttribute('data-birthday-title');
};
var normalizeStudentSearch = function normalizeStudentSearch(value) {
  return String(value || '').trim().toLowerCase();
};
var generalEventMatchesCalendarSearch = function generalEventMatchesCalendarSearch(event) {
  var query = normalizeStudentSearch(state.studentSearch);
  if (query.length < 3) {
    return true;
  }
  return String(event.event_type || '').toLowerCase().includes(query);
};
var lessonMatchesStudentSearch = function lessonMatchesStudentSearch(lesson) {
  var query = normalizeStudentSearch(state.studentSearch);
  if (query.length < 3) {
    return true;
  }
  var student = lesson.student || {};
  var firstName = String(student.first_name || '').toLowerCase();
  var lastName = String(student.last_name || '').toLowerCase();
  var fullName = [firstName, lastName].filter(Boolean).join(' ');
  return firstName.includes(query) || lastName.includes(query) || fullName.includes(query);
};
var lessonMatchesLocationFilter = function lessonMatchesLocationFilter(lesson) {
  if (!isLocationFilterActive()) {
    return true;
  }
  return locationIsSelected(lesson.location_id);
};
var getFilteredPlannedLessons = function getFilteredPlannedLessons() {
  return state.plannedLessons.concat(state.singleLessonPlans).filter(function (lesson) {
    var type = lesson.type === 'single-lesson-plan' ? 'single' : 'recurring';
    return state.selectedEventTypes.includes(type) || state.selectedEventTypes.includes('canceled');
  }).filter(lessonMatchesStudentSearch).filter(lessonMatchesLocationFilter);
};
var lessonOccurrenceMatchesEventTypeFilter = function lessonOccurrenceMatchesEventTypeFilter(type, status) {
  if (status === 'canceled') {
    return state.selectedEventTypes.includes('canceled');
  }
  return state.selectedEventTypes.includes(type);
};
var getFirstOccurrenceDate = function getFirstOccurrenceDate(startsOn, weekday) {
  var start = cloneDate(startsOn);
  var carbonWeekday = Math.max(0, Math.min(6, Number(weekday) - 1));
  var offset = (carbonWeekday - start.getDay() + 7) % 7;
  return addDays(start, offset);
};
var getPlannedLessonEvents = function getPlannedLessonEvents(range) {
  var events = [];
  getFilteredPlannedLessons().forEach(function (lesson) {
    var isSingleLessonPlan = lesson.type === 'single-lesson-plan';
    if (Array.isArray(lesson.occurrences)) {
      lesson.occurrences.forEach(function (occurrence) {
        var dateString = occurrence.date || '';
        var lessonStatus = occurrence.lesson_status || 'unconfirmed';
        if (!dateString || !lessonOccurrenceMatchesEventTypeFilter(isSingleLessonPlan ? 'single' : 'recurring', lessonStatus)) {
          return;
        }
        var start = normalizeTime(occurrence.start || lesson.start_time);
        events.push({
          title: getStudentName(lesson.student),
          date: dateString,
          start: start,
          end: normalizeTime(occurrence.end || addMinutesToTime(lesson.start_time, lesson.duration_minutes)),
          color: '#2fbb7f',
          guid: "".concat(isSingleLessonPlan ? 'single-lesson-plan' : 'planned-lesson', "-").concat(lesson.id, "-").concat(dateString, "-").concat(start),
          lessonPlanId: isSingleLessonPlan ? '' : lesson.id,
          singleLessonPlanId: occurrence.single_lesson_plan_id || (isSingleLessonPlan ? lesson.id : ''),
          lessonId: occurrence.lesson_id || '',
          earlyPaymentId: occurrence.early_payment_id || '',
          scheduleOverrideId: occurrence.schedule_override_id || '',
          recurrence: isSingleLessonPlan ? 'Single lesson' : lesson.recurrence || '',
          isSingleLessonPlan: isSingleLessonPlan,
          originalDate: occurrence.original_date || dateString,
          originalStartTime: occurrence.original_start_time || start,
          lessonStatus: lessonStatus,
          calendarStatus: occurrence.calendar_status || lessonStatus,
          'data-lesson-status': occurrence.calendar_status || lessonStatus,
          feeAmount: occurrence.fee_amount || lesson.fee_amount || 0,
          locationId: normalizeLocationId(lesson.location_id),
          locationName: lesson.location && lesson.location.name ? lesson.location.name : '',
          location: lesson.location || null,
          canceledBy: occurrence.canceled_by || '',
          calendarEditUrl: getLessonPlanModalEditUrl(isSingleLessonPlan, lesson.id),
          lessonEditUrl: occurrence.lesson_edit_url || '',
          paymentUrl: occurrence.lesson_payment_url || occurrence.payment_url || '',
          meetingUrl: occurrence.meeting_url || lesson.meeting_url || '',
          notesUrl: occurrence.notes_url || lesson.notes_url || '',
          studentFirstName: getStudentFirstName(lesson.student),
          hasBirthdayThisWeek: studentHasBirthdayInWeek(lesson.student, dateString),
          hasBirthdayNearEvent: studentHasBirthdayNearEvent(lesson.student, dateString),
          birthdayModalLabel: getStudentBirthdayModalLabel(lesson.student, dateString)
        });
      });
      return;
    }
    if (isSingleLessonPlan) {
      return;
    }
    var startsOn = parseNullableDateString(lesson.starts_on);
    if (!startsOn) {
      return;
    }
    var interval = Math.max(1, Number(lesson.recurrence_interval || 1));
    var intervalDays = interval * 7;
    var endsOn = parseNullableDateString(lesson.ends_on);
    var firstOccurrence = getFirstOccurrenceDate(startsOn, lesson.weekday);
    var occurrence = cloneDate(firstOccurrence);
    if (endsOn && endsOn < range.start) {
      return;
    }
    if (occurrence < range.start) {
      var daysUntilRange = Math.floor((range.start - occurrence) / 86400000);
      var intervalsToSkip = Math.floor(daysUntilRange / intervalDays);
      occurrence = addDays(occurrence, intervalsToSkip * intervalDays);
      while (occurrence < range.start) {
        occurrence = addDays(occurrence, intervalDays);
      }
    }
    while (occurrence <= range.end && (!endsOn || occurrence <= endsOn)) {
      var dateString = toDateString(occurrence);
      var start = normalizeTime(lesson.start_time);
      var confirmedLesson = getLessonForOccurrence(lesson, dateString, start);
      var lessonStatus = getLessonStatus(confirmedLesson);
      if (!lessonOccurrenceMatchesEventTypeFilter('recurring', lessonStatus)) {
        occurrence = addDays(occurrence, intervalDays);
        continue;
      }
      events.push({
        title: getStudentName(lesson.student),
        date: dateString,
        start: start,
        end: addMinutesToTime(start, lesson.duration_minutes),
        color: '#2fbb7f',
        guid: "planned-lesson-".concat(lesson.id, "-").concat(dateString),
        lessonPlanId: lesson.id,
        lessonId: confirmedLesson ? confirmedLesson.id : '',
        recurrence: lesson.recurrence || '',
        lessonStatus: lessonStatus,
        calendarStatus: lessonStatus,
        'data-lesson-status': lessonStatus,
        feeAmount: confirmedLesson && confirmedLesson.fee_amount ? confirmedLesson.fee_amount : lesson.fee_amount || 0,
        locationId: normalizeLocationId(lesson.location_id),
        locationName: lesson.location && lesson.location.name ? lesson.location.name : '',
        location: lesson.location || null,
        canceledBy: confirmedLesson && confirmedLesson.canceled_by ? confirmedLesson.canceled_by : '',
        calendarEditUrl: getLessonPlanModalEditUrl(false, lesson.id),
        lessonEditUrl: getLessonEditUrl(confirmedLesson),
        paymentUrl: getLessonPaymentUrl(confirmedLesson),
        meetingUrl: lesson.meeting_url || '',
        notesUrl: lesson.notes_url || '',
        studentFirstName: getStudentFirstName(lesson.student),
        hasBirthdayThisWeek: studentHasBirthdayInWeek(lesson.student, dateString),
        hasBirthdayNearEvent: studentHasBirthdayNearEvent(lesson.student, dateString),
        birthdayModalLabel: getStudentBirthdayModalLabel(lesson.student, dateString)
      });
      occurrence = addDays(occurrence, intervalDays);
    }
  });
  return events;
};
var syncCalendarEvents = function syncCalendarEvents() {
  var generalEvents = getGeneralEventCalendarEvents();
  state.events = normalizeScheduleEvents(state.customEvents).concat(getPlannedLessonEvents(getCalendarEventRange())).concat(generalEvents);
  state.visibleEventsByDate = null;
};
var createCalendarEvent = function createCalendarEvent(date) {
  return {
    title: 'No title',
    date: toDateString(date),
    start: '09:00',
    end: '10:00',
    color: '#2fbb7f',
    guid: "calendar-".concat(Date.now(), "-").concat(Math.round(Math.random() * 100000))
  };
};
var getEventsForDate = function getEventsForDate(date) {
  var dateString = toDateString(date);
  return getVisibleEventsByDate()[dateString] || [];
};
var getCalendarItemsForDate = function getCalendarItemsForDate(date) {
  var holidays = getHolidaysForDate(date).map(function (holiday) {
    return Object.assign({}, holiday, {
      guid: "holiday-".concat(holiday.date, "-").concat(holiday.title),
      isHoliday: true
    });
  });
  return holidays.concat(getBreakEventsForDate(date)).concat(getRecitalEventsForDate(date)).concat(getEventsForDate(date));
};
var hasOverlappingTimedEvents = function hasOverlappingTimedEvents(events) {
  var latestEnd = null;
  return events.filter(function (event) {
    return isConflictEligibleTimedEvent(event);
  }).map(function (event) {
    return {
      start: getTimeMinutes(event.start),
      end: getTimeMinutes(event.end)
    };
  }).filter(function (event) {
    return event.end > event.start;
  }).sort(function (a, b) {
    return a.start - b.start || a.end - b.end;
  }).some(function (event) {
    var overlaps = latestEnd !== null && event.start < latestEnd;
    latestEnd = latestEnd === null ? event.end : Math.max(latestEnd, event.end);
    return overlaps;
  });
};
var createMonthEventElement = function createMonthEventElement(event, dateString) {
  var item = document.createElement('span');
  var dot = document.createElement('span');
  var time = document.createElement('span');
  var title = document.createElement('span');
  item.className = event.isHoliday ? 'calendar-month-event calendar-month-event-holiday' : event.isBreak ? 'calendar-month-event calendar-month-event-break' : event.isRecital ? 'calendar-month-event calendar-month-event-recital' : event.isGeneralEvent ? 'calendar-month-event calendar-month-event-general' : 'calendar-month-event';
  dot.className = 'calendar-month-event-dot';
  time.className = 'calendar-month-event-time';
  title.className = 'calendar-month-event-title';
  item.dataset.eventGuid = event.guid || '';
  item.toggleAttribute('data-read-only', Boolean(event.readOnly));
  item.dataset.externalProvider = event.externalProvider || '';
  item.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.isRecital ? 'recital' : event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed');
  dot.dataset.eventGuid = event.guid || '';
  dot.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.isRecital ? 'recital' : event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed');
  applyCalendarItemStatusAttributes(item, event, dateString);
  applyCalendarItemStatusAttributes(dot, event, dateString);
  time.textContent = event.isHoliday || event.isBreak ? '' : formatEventTime(event.start);
  renderEventTitle(title, event, 'No title');
  if (!event.isHoliday && !event.isBreak && !event.isRecital && !event.isGeneralEvent) {
    item.appendChild(dot);
  }
  if (!event.isHoliday && !event.isBreak) item.appendChild(time);
  item.appendChild(title);
  return item;
};
var hideBootstrapModal = function hideBootstrapModal(modal) {
  if (!modal) {
    return;
  }
  if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
    window.bootstrap.Modal.getOrCreateInstance(modal).hide();
    return;
  }
  if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
    window.jQuery(modal).modal('hide');
  }
};
var showBootstrapModal = function showBootstrapModal(modal) {
  if (!modal) {
    return;
  }
  if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
    window.bootstrap.Modal.getOrCreateInstance(modal).show();
    return;
  }
  if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
    window.jQuery(modal).modal('show');
  }
};
var showCalendarEditError = function showCalendarEditError(modal, message) {
  if (!modal) {
    return;
  }
  var error = modal.querySelector('[data-calendar-edit-error]');
  if (!error) {
    error = document.createElement('div');
    error.className = 'alert alert-danger small mb-3';
    error.setAttribute('data-calendar-edit-error', '');
    modal.querySelector('.modal-body').prepend(error);
  }
  error.textContent = message || 'Unable to update this item.';
  error.hidden = false;
};
var initializeCalendarEditModal = function initializeCalendarEditModal(modal) {
  if (!modal) {
    return;
  }
  initializeSingleLessonPlanForms(modal);
  initializeLessonPlanForms(modal);
  var currencyInputs = modal.querySelectorAll('[data-mask="usd"]');
  if (currencyInputs.length && typeof window.Inputmask === 'function') {
    new window.Inputmask({
      alias: 'numeric',
      groupSeparator: ',',
      prefix: '$ ',
      autoGroup: true,
      digits: 0,
      rightAlign: false
    }).mask(currencyInputs);
  }
};
var loadCalendarEditModal = function loadCalendarEditModal(button, sourceModal, container) {
  var url = button ? button.dataset.url : '';
  if (!button || !url || !container) {
    return;
  }
  button.disabled = true;
  fetch(url, {
    headers: {
      'Accept': 'text/html',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }).then(function (response) {
    if (!response.ok) {
      throw new Error('Unable to load the edit form.');
    }
    return response.text();
  }).then(function (html) {
    var didShow = false;
    container.innerHTML = html;
    var editModal = container.querySelector('.modal');
    var showEditModal = function showEditModal() {
      if (didShow || !editModal) {
        return;
      }
      didShow = true;
      initializeCalendarEditModal(editModal);
      showBootstrapModal(editModal);
    };
    button.disabled = false;
    if (sourceModal && sourceModal.classList.contains('show')) {
      sourceModal.addEventListener('hidden.bs.modal', showEditModal, {
        once: true
      });
      hideBootstrapModal(sourceModal);
      window.setTimeout(showEditModal, 250);
      return;
    }
    showEditModal();
  })["catch"](function (error) {
    console.error(error);
    button.disabled = false;
    if (sourceModal && sourceModal.id === 'lesson-modal') {
      showLessonActionError(sourceModal, error.message);
    } else {
      showGeneralEventActionError(sourceModal, error.message);
    }
  });
};
var submitCalendarEditForm = function submitCalendarEditForm(form, refreshCalendar) {
  var modal = form ? form.closest('.modal') : null;
  if (!form || !form.action || !modal) {
    return;
  }
  setFormSubmitting(form, true);
  requestJson(form.action, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'X-CSRF-TOKEN': window.calendarCsrfToken || '',
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: new FormData(form)
  }, 'Unable to update this item.').then(function () {
    hideBootstrapModal(modal);
    return refreshCalendar();
  })["catch"](function (error) {
    console.error(error);
    showCalendarEditError(modal, error.message);
  })["finally"](function () {
    setFormSubmitting(form, false);
  });
};
var openMonthDayEventsModal = function openMonthDayEventsModal(dateString) {
  var modal = document.getElementById('month-day-events-modal');
  if (!modal) {
    return;
  }
  var title = modal.querySelector('.modal-title');
  var list = modal.querySelector('[data-month-day-events-list]');
  var conflict = modal.querySelector('[data-month-day-events-conflict]');
  var date = parseDateString(dateString);
  var events = getCalendarItemsForDate(date);
  var overlappingEventGuids = getOverlappingTimedEventGuids(events);
  if (title) {
    title.textContent = dayFormatter.format(date);
  }
  if (list) {
    list.innerHTML = '';
    var specialEvents = events.filter(function (event) {
      return event.isHoliday || event.isBreak || event.isRecital;
    });
    var regularEvents = events.filter(function (event) {
      return !event.isHoliday && !event.isBreak && !event.isRecital;
    });
    var appendEvent = function appendEvent(container, event) {
      var item = createMonthEventElement(event, dateString);
      item.toggleAttribute('overlapping-event', overlappingEventGuids.has(event.guid));
      container.appendChild(item);
    };
    if (specialEvents.length) {
      var specialEventsContainer = document.createElement('div');
      specialEventsContainer.className = 'calendar-month-day-events-special d-flex flex-wrap gap-1';
      specialEvents.forEach(function (event) {
        appendEvent(specialEventsContainer, event);
      });
      list.appendChild(specialEventsContainer);
    }
    regularEvents.forEach(function (event) {
      appendEvent(list, event);
    });
  }
  if (conflict) conflict.hidden = overlappingEventGuids.size === 0;
  showBootstrapModal(modal);
};
var renderMonthCalendar = function renderMonthCalendar(calendar) {
  var today = todayString();
  var selected = toDateString(state.date);
  var month = state.date.getMonth();
  var gridStart = startOfMonthGrid(state.date);
  var wrapper = document.createElement('div');
  var weekdaysRow = document.createElement('div');
  var grid = document.createElement('div');
  wrapper.className = 'calendar-month-calendar';
  weekdaysRow.className = 'calendar-month-weekdays';
  grid.className = 'calendar-month-grid';
  monthWeekdays.forEach(function (day) {
    var heading = document.createElement('div');
    heading.textContent = day;
    weekdaysRow.appendChild(heading);
  });
  var _loop = function _loop() {
    var date = addDays(gridStart, i);
    var dateString = toDateString(date);
    var events = getCalendarItemsForDate(date);
    var cell = document.createElement('div');
    var day = document.createElement('span');
    var list = document.createElement('span');
    var hasOverlaps = hasOverlappingTimedEvents(events);
    var visibleEventCount = events.length >= 5 ? 3 : 4;
    cell.className = 'calendar-month-day';
    cell.dataset.date = dateString;
    cell.setAttribute('role', 'button');
    cell.tabIndex = 0;
    if (date.getMonth() !== month) {
      cell.classList.add('is-muted');
    }
    if (dateString === today) {
      cell.classList.add('is-today');
    }
    if (dateString === selected) {
      cell.classList.add('is-selected');
    }
    day.className = 'calendar-month-day-number';
    day.textContent = date.getDate() === 1 ? "".concat(shortMonthFormatter.format(date), " ").concat(date.getDate()) : date.getDate();
    list.className = 'calendar-month-events';
    if (hasOverlaps) {
      var alert = document.createElement('i');
      alert.className = 'fa-solid fa-circle-exclamation calendar-month-overlap-alert';
      alert.setAttribute('aria-hidden', 'true');
      cell.appendChild(alert);
    }
    events.slice(0, visibleEventCount).forEach(function (event) {
      list.appendChild(createMonthEventElement(event, dateString));
    });
    if (events.length > 4) {
      var more = document.createElement('span');
      more.className = 'calendar-month-more';
      more.dataset.monthMoreDate = dateString;
      more.setAttribute('role', 'button');
      more.tabIndex = 0;
      more.textContent = "".concat(events.length - visibleEventCount, " more");
      list.appendChild(more);
    }
    cell.appendChild(day);
    cell.appendChild(list);
    grid.appendChild(cell);
  };
  for (var i = 0; i < 42; i++) {
    _loop();
  }
  wrapper.appendChild(weekdaysRow);
  wrapper.appendChild(grid);
  calendar.appendChild(wrapper);
};
var renderScheduleAgenda = function renderScheduleAgenda(calendar) {
  var range = getVisibleDateRange();
  var today = todayString();
  var selected = toDateString(state.date);
  var wrapper = document.createElement('div');
  var renderedMonth = '';
  wrapper.className = 'calendar-schedule-agenda';
  getDateRangeDates(range).forEach(function (date) {
    var dateString = toDateString(date);
    var items = getCalendarItemsForDate(date);
    var shouldRenderEmpty = dateString === today || dateString === selected;
    if (!items.length && !shouldRenderEmpty) {
      return;
    }
    var month = dateString.substring(0, 7);
    if (month !== renderedMonth) {
      var monthBar = document.createElement('div');
      monthBar.className = 'calendar-schedule-month-bar';
      monthBar.dataset.month = month;
      monthBar.textContent = monthFormatter.format(date).toUpperCase();
      wrapper.appendChild(monthBar);
      renderedMonth = month;
    }
    var day = document.createElement('section');
    var dateRail = document.createElement('button');
    var weekday = document.createElement('div');
    var number = document.createElement('div');
    var list = document.createElement('div');
    day.className = 'calendar-schedule-day';
    day.dataset.date = dateString;
    dateRail.className = 'calendar-schedule-date';
    dateRail.type = 'button';
    dateRail.setAttribute('aria-label', "Scroll to ".concat(modalDateFormatter.format(date)));
    weekday.className = 'calendar-schedule-weekday';
    number.className = 'calendar-schedule-number';
    list.className = 'calendar-schedule-list';
    if (dateString === today) {
      day.classList.add('is-today');
    }
    if (dateString === selected) {
      day.classList.add('is-selected');
    }
    weekday.textContent = weekdays[date.getDay()].toUpperCase();
    number.textContent = date.getDate();
    dateRail.appendChild(weekday);
    dateRail.appendChild(number);
    if (!items.length) {
      var empty = document.createElement('div');
      empty.className = 'calendar-schedule-empty';
      empty.textContent = 'Nothing planned.';
      list.appendChild(empty);
    }
    items.forEach(function (event) {
      var item = document.createElement(event.isHoliday ? 'div' : 'button');
      var title = document.createElement('span');
      item.className = event.isHoliday ? 'calendar-schedule-event calendar-schedule-event-holiday' : event.isBreak ? 'calendar-schedule-event calendar-schedule-event-break' : event.isRecital ? 'calendar-schedule-event calendar-schedule-recital' : event.isGeneralEvent ? 'calendar-schedule-event calendar-schedule-event-general' : 'calendar-schedule-event';
      title.className = 'calendar-schedule-event-title';
      renderEventTitle(title, event, 'No title');
      item.dataset.eventGuid = event.guid || '';
      item.toggleAttribute('data-read-only', Boolean(event.readOnly));
      item.dataset.externalProvider = event.externalProvider || '';
      item.dataset.lessonStatus = event.isHoliday ? 'holiday' : event.isBreak ? 'teaching-break' : event.isRecital ? 'recital' : event.calendarStatus || event.lessonStatus || (event.isGeneralEvent ? 'general-event' : 'unconfirmed');
      applyCalendarItemStatusAttributes(item, event, dateString);
      applyEventOverlapAttribute(item, event);
      if (!event.isHoliday && !event.isBreak && !event.isRecital) {
        var time = document.createElement('span');
        var duration = getEventDurationMinutes(event);
        var eventIcon = createCalendarEventIcon(event);
        item.type = 'button';
        item.dataset.durationMinutes = duration;
        item.style.setProperty('--calendar-schedule-event-height', getAgendaEventHeight(event));
        time.className = 'calendar-schedule-event-time';
        time.textContent = event.externalProvider === 'google' ? 'from Google Calendar' : event.start && event.end ? "".concat(formatAgendaEventTime(event.start), "-").concat(formatAgendaEventTime(event.end)) : formatAgendaEventTime(event.start);
        if (eventIcon) {
          item.appendChild(eventIcon);
        }
        item.appendChild(title);
        item.appendChild(time);
      } else {
        if (event.isBreak || event.isRecital) {
          item.type = 'button';
        }
        item.appendChild(title);
        if (event.isRecital) {
          var _time = document.createElement('span');
          _time.className = 'calendar-schedule-event-time';
          _time.textContent = formatAgendaEventTime(event.start);
          item.appendChild(_time);
        }
      }
      list.appendChild(item);
    });
    day.appendChild(dateRail);
    day.appendChild(list);
    wrapper.appendChild(day);
  });
  calendar.appendChild(wrapper);
  return wrapper;
};
var cloneDate = function cloneDate(date) {
  return createLocalDate(date.getFullYear(), date.getMonth(), date.getDate());
};
var addDays = function addDays(date, days) {
  var next = cloneDate(date);
  next.setDate(next.getDate() + days);
  return next;
};
var addMonths = function addMonths(date, months) {
  var next = cloneDate(date);
  next.setMonth(next.getMonth() + months);
  return next;
};
var startOfMonthGrid = function startOfMonthGrid(date) {
  var start = createLocalDate(date.getFullYear(), date.getMonth(), 1);
  start.setDate(start.getDate() - start.getDay());
  return start;
};
var startOfWeek = function startOfWeek(date) {
  return addDays(date, -date.getDay());
};
var getWeekLabel = function getWeekLabel(date) {
  var start = isValidDate(state.scheduleWindowStart) ? cloneDate(state.scheduleWindowStart) : startOfWeek(date);
  var end = addDays(start, 6);
  return getRangeLabel(start, end);
};
var getRangeLabel = function getRangeLabel(start, end) {
  var sameMonth = start.getMonth() === end.getMonth();
  var sameYear = start.getFullYear() === end.getFullYear();
  if (sameMonth && sameYear) {
    return monthFormatter.format(start);
  }
  if (sameYear) {
    return "".concat(shortMonthFormatter.format(start), " - ").concat(shortMonthFormatter.format(end), " ").concat(end.getFullYear());
  }
  return "".concat(shortMonthFormatter.format(start), " ").concat(start.getFullYear(), " - ").concat(shortMonthFormatter.format(end), " ").concat(end.getFullYear());
};
var getLabel = function getLabel() {
  if (state.view === 'schedule') {
    return monthFormatter.format(state.date);
  }
  if (state.view === 'day') {
    return dayFormatter.format(state.date);
  }
  if (state.view === '2-days') {
    return getRangeLabel(state.date, addDays(state.date, 1));
  }
  if (state.view === 'week') {
    return getWeekLabel(state.date);
  }
  return monthFormatter.format(state.date);
};
var move = function move(direction) {
  if (state.view === 'day') {
    setSelectedDate(addDays(state.date, direction));
  } else if (state.view === '2-days') {
    setSelectedDate(addDays(state.date, direction * 2));
  } else if (state.view === 'week') {
    var rolling = isValidDate(state.scheduleWindowStart);
    var nextStart = addDays(getVisibleScheduleDates()[0], direction * 7);
    setSelectedDate(nextStart);
    if (rolling) {
      state.scheduleWindowStart = cloneDate(nextStart);
    }
  } else if (state.view === 'month' || state.view === 'schedule') {
    setSelectedDate(addMonths(state.date, direction));
  }
};
var filterStudentComboboxOptions = function filterStudentComboboxOptions(combobox) {
  var input = combobox.querySelector('[data-student-combobox-input]');
  var options = Array.from(combobox.querySelectorAll('[data-student-combobox-option]'));
  var empty = combobox.querySelector('[data-student-combobox-empty]');
  var query = input ? input.value.trim().toLowerCase() : '';
  var visibleCount = 0;
  options.forEach(function (option) {
    var name = String(option.dataset.studentName || option.textContent || '').toLowerCase();
    var isVisible = !query || name.includes(query);
    option.hidden = !isVisible;
    if (isVisible) {
      visibleCount += 1;
    }
  });
  if (empty) {
    empty.hidden = visibleCount > 0;
  }
};
var openStudentCombobox = function openStudentCombobox(combobox) {
  combobox.setAttribute('open', '');
  filterStudentComboboxOptions(combobox);
};
var closeStudentCombobox = function closeStudentCombobox(combobox) {
  combobox.removeAttribute('open');
};
var syncFormLocationFromStudentOption = function syncFormLocationFromStudentOption(option) {
  var form = option ? option.closest('form') : null;
  var locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
  var studentLocationId = option ? option.dataset.studentLocationId : null;
  if (!locationSelect || !studentLocationId) {
    return;
  }
  var matchingOption = Array.from(locationSelect.options).find(function (locationOption) {
    return String(locationOption.value) === String(studentLocationId);
  });
  if (!matchingOption) {
    return;
  }
  locationSelect.value = studentLocationId;
  locationSelect.dispatchEvent(new Event('change', {
    bubbles: true
  }));
};
var syncFormPaymentMethodFromStudentOption = function syncFormPaymentMethodFromStudentOption(option) {
  var form = option ? option.closest('form') : null;
  var paymentMethodSelect = form ? form.querySelector('select[name="payment_method"]') : null;
  var studentPaymentMethod = option ? option.dataset.studentPaymentMethod : null;
  if (!paymentMethodSelect || !studentPaymentMethod) {
    return;
  }
  var matchingOption = Array.from(paymentMethodSelect.options).find(function (paymentOption) {
    return String(paymentOption.value) === String(studentPaymentMethod);
  });
  if (!matchingOption) {
    return;
  }
  paymentMethodSelect.value = studentPaymentMethod;
  paymentMethodSelect.dispatchEvent(new Event('change', {
    bubbles: true
  }));
};
var syncFormDefaultsFromStudentOption = function syncFormDefaultsFromStudentOption(option) {
  syncFormLocationFromStudentOption(option);
  syncFormPaymentMethodFromStudentOption(option);
};
var initializeStudentComboboxes = function initializeStudentComboboxes() {
  var comboboxes = Array.from(document.querySelectorAll('[data-student-combobox]'));
  comboboxes.forEach(function (combobox) {
    var input = combobox.querySelector('[data-student-combobox-input]');
    var value = combobox.querySelector('[data-student-combobox-value]');
    var options = Array.from(combobox.querySelectorAll('[data-student-combobox-option]'));
    if (!input || !value) {
      return;
    }
    input.addEventListener('focus', function () {
      openStudentCombobox(combobox);
    });
    input.addEventListener('click', function () {
      openStudentCombobox(combobox);
    });
    input.addEventListener('input', function () {
      value.value = '';
      input.setCustomValidity('');
      openStudentCombobox(combobox);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeStudentCombobox(combobox);
        input.blur();
      }
    });
    options.forEach(function (option) {
      option.addEventListener('click', function () {
        input.value = option.dataset.studentName || option.textContent.trim();
        value.value = option.dataset.studentId || '';
        input.setCustomValidity('');
        syncFormDefaultsFromStudentOption(option);
        closeStudentCombobox(combobox);
      });
    });
    var form = combobox.closest('form');
    if (form) {
      form.addEventListener('submit', function (e) {
        if (!value.value) {
          var typedName = input.value.trim().toLowerCase();
          var exactMatch = options.find(function (option) {
            return String(option.dataset.studentName || '').toLowerCase() === typedName;
          });
          if (exactMatch) {
            input.value = exactMatch.dataset.studentName || exactMatch.textContent.trim();
            value.value = exactMatch.dataset.studentId || '';
            syncFormDefaultsFromStudentOption(exactMatch);
          }
        }
        if (!value.value) {
          e.preventDefault();
          input.setCustomValidity('Select a student from the list.');
          input.reportValidity();
          openStudentCombobox(combobox);
          return;
        }
        input.setCustomValidity('');
      });
    }
  });
  document.addEventListener('click', function (e) {
    comboboxes.forEach(function (combobox) {
      if (!combobox.contains(e.target)) {
        closeStudentCombobox(combobox);
      }
    });
  });
};
var getSelectedLocationOption = function getSelectedLocationOption(form) {
  var locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
  return locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
};
var singleLessonLocationIsOnline = function singleLessonLocationIsOnline(form) {
  var selectedOption = getSelectedLocationOption(form);
  return selectedOption && selectedOption.dataset.isOnline === '1';
};
var setSingleLessonOnlineFields = function setSingleLessonOnlineFields(form, shouldEmpty) {
  var fields = form ? Array.from(form.querySelectorAll('.single-lesson-plan-online-field')) : [];
  var isOnline = singleLessonLocationIsOnline(form);
  fields.forEach(function (field) {
    var input = field.querySelector('input');
    field.style.display = isOnline ? '' : 'none';
    if (input) {
      input.disabled = !isOnline;
      if (!isOnline || shouldEmpty) {
        input.value = '';
      }
    }
  });
};
var syncSingleLessonFee = function syncSingleLessonFee(form) {
  var selectedOption = getSelectedLocationOption(form);
  var durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
  var feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
  var hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
  var duration = durationSelect ? Number(durationSelect.value || 0) : 0;
  if (!feeInput) {
    return;
  }
  if (!hourlyFee || !duration) {
    return;
  }
  var proratedFee = hourlyFee * (duration / 60);
  var roundedFee = Math.floor(proratedFee / 5) * 5;
  feeInput.value = roundedFee.toFixed(2).replace(/\.00$/, '');
};
var getSingleLessonPlanDefaultDate = function getSingleLessonPlanDefaultDate() {
  if (!state.date) {
    return todayString();
  }
  if (state.view === 'month') {
    return toDateString(createLocalDate(state.date.getFullYear(), state.date.getMonth(), 1));
  }
  return toDateString(getVisibleDateRange().start);
};
var syncSingleLessonPlanModalDate = function syncSingleLessonPlanModalDate(modal) {
  var dateInput = modal ? modal.querySelector('input[name="scheduled_date"]') : null;
  if (dateInput) {
    dateInput.value = getSingleLessonPlanDefaultDate();
  }
};
var initializeSingleLessonPlanForms = function initializeSingleLessonPlanForms(root) {
  (root || document).querySelectorAll('[data-single-lesson-plan-form]').forEach(function (form) {
    if (form.dataset.calendarFormInitialized === 'true') {
      return;
    }
    form.dataset.calendarFormInitialized = 'true';
    var locationSelect = form.querySelector('select[name="location_id"]');
    var durationSelect = form.querySelector('select[name="duration_minutes"]');
    var modal = form.closest('#create-single-lesson-plan-modal');
    setSingleLessonOnlineFields(form, false);
    if (locationSelect && durationSelect) {
      syncSingleLessonFee(form);
    }
    if (locationSelect) {
      locationSelect.addEventListener('change', function () {
        syncSingleLessonFee(form);
        setSingleLessonOnlineFields(form, true);
      });
    }
    if (durationSelect) {
      durationSelect.addEventListener('change', function () {
        syncSingleLessonFee(form);
      });
    }
    if (modal) {
      modal.addEventListener('show.bs.modal', function () {
        syncSingleLessonPlanModalDate(modal);
      });
    }
  });
};
var setLessonPlanOnlineFields = function setLessonPlanOnlineFields(form, shouldEmpty) {
  var fields = form ? Array.from(form.querySelectorAll('.lesson-plan-online-field')) : [];
  var isOnline = singleLessonLocationIsOnline(form);
  fields.forEach(function (field) {
    var input = field.querySelector('input');
    field.style.display = isOnline ? '' : 'none';
    if (input) {
      input.disabled = !isOnline;
      if (!isOnline || shouldEmpty) {
        input.value = '';
      }
    }
  });
};
var syncLessonPlanFee = function syncLessonPlanFee(form) {
  var selectedOption = getSelectedLocationOption(form);
  var durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
  var feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
  var hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
  var duration = durationSelect ? Number(durationSelect.value || 0) : 0;
  if (!feeInput) {
    return;
  }
  if (!hourlyFee || !duration) {
    return;
  }
  var proratedFee = hourlyFee * (duration / 60);
  var roundedFee = Math.floor(proratedFee / 5) * 5;
  feeInput.value = roundedFee.toFixed(2).replace(/\.00$/, '');
};
var initializeLessonPlanForms = function initializeLessonPlanForms(root) {
  (root || document).querySelectorAll('[data-lesson-plan-form]').forEach(function (form) {
    if (form.dataset.calendarFormInitialized === 'true') {
      return;
    }
    form.dataset.calendarFormInitialized = 'true';
    var locationSelect = form.querySelector('select[name="location_id"]');
    var durationSelect = form.querySelector('select[name="duration_minutes"]');
    setLessonPlanOnlineFields(form, false);
    if (locationSelect && durationSelect) {
      syncLessonPlanFee(form);
    }
    if (locationSelect) {
      locationSelect.addEventListener('change', function () {
        syncLessonPlanFee(form);
        setLessonPlanOnlineFields(form, true);
      });
    }
    if (durationSelect) {
      durationSelect.addEventListener('change', function () {
        syncLessonPlanFee(form);
      });
    }
  });
};
document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    var button = e.target.closest('.setting-undo');
    if (!button) {
      return;
    }
    var input = document.getElementById(button.dataset.settingTarget);
    if (!input || typeof button.dataset.settingOriginal === 'undefined') {
      return;
    }
    if (input.type === 'checkbox') {
      input.checked = button.dataset.settingOriginal === 'true';
    } else {
      input.value = button.dataset.settingOriginal;
    }
    input.dispatchEvent(new Event('input', {
      bubbles: true
    }));
    input.dispatchEvent(new Event('change', {
      bubbles: true
    }));
  });
  var calendar = document.getElementById('calendar');
  var label = document.querySelector('[data-calendar-label]');
  var today = document.querySelector('[data-calendar-today]');
  var previous = document.querySelector('[data-calendar-prev]');
  var next = document.querySelector('[data-calendar-next]');
  var view = document.querySelector('[data-calendar-view]');
  var miniLabel = document.querySelector('[data-mini-label]');
  var miniGrid = document.querySelector('[data-mini-grid]');
  var miniPrevious = document.querySelector('[data-mini-prev]');
  var miniNext = document.querySelector('[data-mini-next]');
  var lessonModal = document.getElementById('lesson-modal');
  var generalEventModal = document.getElementById('general-event-modal');
  var calendarEditModalContainer = document.getElementById('calendar-edit-modal-container');
  var calendarSearch = document.querySelector('.calendar-calendar-search');
  var calendarToolbar = calendarSearch ? calendarSearch.closest('.calendar-calendar-toolbar') : null;
  var calendarSearchToggle = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-toggle]') : null;
  var calendarSearchClear = calendarSearch ? calendarSearch.querySelector('[data-calendar-search-clear]') : null;
  var studentSearch = calendarSearch ? calendarSearch.querySelector('input[name="search"]') : null;
  var offcanvasViews = document.getElementById('calendar-offcanvas-views');
  var offcanvasViewItems = Array.from(document.querySelectorAll('[data-calendar-offcanvas-view]'));
  var calendarInsights = document.getElementById('calendar-calendar-insights');
  var calendarInsightsSidebarTarget = document.querySelector('[data-calendar-insights-sidebar-target]');
  var calendarInsightsOffcanvasTarget = document.querySelector('[data-calendar-insights-offcanvas-target]');
  var locationFilters = document.querySelector('[data-calendar-location-filters]');
  var eventTypeFilters = document.querySelector('[data-calendar-event-type-filters]');
  var calendarCreateMenu = document.querySelector('[data-calendar-create-menu]');
  var calendarCreateToggle = document.querySelector('[data-calendar-create-toggle]');
  var calendarCreateSingle = document.querySelector('[data-calendar-create-single]');
  var calendarCreateRecurring = document.querySelector('[data-calendar-create-recurring]');
  var calendarCreateEvent = document.querySelector('[data-calendar-create-event]');
  var calendarFilter = document.querySelector('.calendar-calendar-filter');
  var calendarFilterReset = document.querySelector('[data-calendar-filter-reset]');
  var calendarCreateBackdrop = null;
  if (!calendar) {
    return;
  }
  var scheduleItemHold = null;
  var suppressedScheduleItemClick = null;
  var scheduleHoldNavigationSuppressedUntil = 0;
  var isScheduleHoldNavigationSuppressed = function isScheduleHoldNavigationSuppressed() {
    return Boolean(scheduleItemHold && scheduleItemHold.active) || Date.now() < scheduleHoldNavigationSuppressedUntil;
  };
  initializeStudentComboboxes();
  initializeSingleLessonPlanForms();
  initializeLessonPlanForms();
  state.plannedLessons = Array.isArray(window.calendarPlannedLessons) ? window.calendarPlannedLessons : Array.isArray(window.calendarLessonPlans) ? window.calendarLessonPlans : [];
  state.singleLessonPlans = Array.isArray(window.calendarSingleLessonPlans) ? window.calendarSingleLessonPlans : [];
  state.holidays = Array.isArray(window.calendarHolidays) ? window.calendarHolidays : [];
  state.showHolidays = window.calendarShowHolidays !== false;
  state.teachingBreaks = Array.isArray(window.calendarTeachingBreaks) ? window.calendarTeachingBreaks : [];
  state.recitals = Array.isArray(window.calendarRecitals) ? window.calendarRecitals : [];
  state.generalEvents = Array.isArray(window.calendarGeneralEvents) ? window.calendarGeneralEvents : [];
  state.locations = Array.isArray(window.calendarLocations) ? window.calendarLocations : [];
  state.loadedRange = normalizeRange(window.calendarCalendarRange);
  state.birthdayWindow = normalizeBirthdayWindow(window.calendarBirthdayWindow);
  var urlState = getUrlState();
  state.view = urlState.view;
  if (urlState.eventTypes !== null) {
    state.selectedEventTypes = urlState.eventTypes;
  }
  if (urlState.locationIds !== null) {
    state.selectedLocationIds = urlState.locationIds;
  }
  if (isValidDate(urlState.date)) {
    setSelectedDate(urlState.date);
  } else if (!state.date) {
    setSelectedDate(getTodayDate());
  } else {
    state.miniDate = cloneDate(state.date);
  }
  if (state.view === 'week' && isValidDate(urlState.windowStart)) {
    state.scheduleWindowStart = cloneDate(urlState.windowStart);
    state.date = cloneDate(state.scheduleWindowStart);
    state.miniDate = cloneDate(state.date);
  }
  var syncViewControls = function syncViewControls() {
    if (view) {
      view.value = state.view;
    }
    offcanvasViewItems.forEach(function (item) {
      var selected = item.dataset.calendarOffcanvasView === state.view;
      item.toggleAttribute('selected', selected);
      item.classList.toggle('is-selected', selected);
      item.querySelectorAll('button').forEach(function (button) {
        button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      });
    });
  };
  var removeCalendarCreateBackdrop = function removeCalendarCreateBackdrop(immediate) {
    if (!calendarCreateBackdrop) {
      return;
    }
    var backdrop = calendarCreateBackdrop;
    calendarCreateBackdrop = null;
    backdrop.classList.remove('show');
    var _removeBackdrop = function removeBackdrop() {
      backdrop.removeEventListener('transitionend', _removeBackdrop);
      backdrop.remove();
    };
    if (immediate) {
      _removeBackdrop();
      return;
    }
    backdrop.addEventListener('transitionend', _removeBackdrop);
    window.setTimeout(_removeBackdrop, 180);
  };
  var showCalendarCreateBackdrop = function showCalendarCreateBackdrop() {
    if (calendarCreateBackdrop) {
      return;
    }
    calendarCreateBackdrop = document.createElement('div');
    calendarCreateBackdrop.className = 'modal-backdrop fade';
    calendarCreateBackdrop.setAttribute('data-calendar-create-backdrop', '');
    document.body.appendChild(calendarCreateBackdrop);
    calendarCreateBackdrop.addEventListener('click', closeCalendarCreateMenu);
    window.requestAnimationFrame(function () {
      if (calendarCreateBackdrop) {
        calendarCreateBackdrop.classList.add('show');
      }
    });
  };
  var setCalendarCreateMenuOpen = function setCalendarCreateMenuOpen(isOpen, options) {
    if (!calendarCreateMenu || !calendarCreateToggle) {
      return;
    }
    calendarCreateMenu.toggleAttribute('selected', isOpen);
    calendarCreateToggle.toggleAttribute('selected', isOpen);
    calendarCreateToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      showCalendarCreateBackdrop();
    } else {
      removeCalendarCreateBackdrop(options && options.immediate);
    }
  };
  function closeCalendarCreateMenu(options) {
    setCalendarCreateMenuOpen(false, options);
  }
  ;
  var openCalendarCreateModal = function openCalendarCreateModal(modalId) {
    closeCalendarCreateMenu({
      immediate: true
    });
    showBootstrapModal(document.getElementById(modalId));
  };
  if (calendarCreateToggle) {
    calendarCreateToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setCalendarCreateMenuOpen(!(calendarCreateMenu && calendarCreateMenu.hasAttribute('selected')));
    });
  }
  if (calendarCreateSingle) {
    calendarCreateSingle.addEventListener('click', function () {
      openCalendarCreateModal('create-single-lesson-plan-modal');
    });
  }
  if (calendarCreateRecurring) {
    calendarCreateRecurring.addEventListener('click', function () {
      openCalendarCreateModal('create-calendar-lesson-plan-modal');
    });
  }
  if (calendarCreateEvent) {
    calendarCreateEvent.addEventListener('click', function () {
      openCalendarCreateModal('create-event-modal');
    });
  }
  if (calendarCreateMenu) {
    calendarCreateMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }
  document.addEventListener('click', function (e) {
    if (!calendarCreateMenu || !calendarCreateToggle || !calendarCreateMenu.hasAttribute('selected')) {
      return;
    }
    if (!calendarCreateMenu.contains(e.target) && !calendarCreateToggle.contains(e.target)) {
      closeCalendarCreateMenu();
    }
  });
  var syncCalendarInsightsPlacement = function syncCalendarInsightsPlacement() {
    if (!calendarInsights || !calendarInsightsSidebarTarget || !calendarInsightsOffcanvasTarget) {
      return;
    }
    var target = isSidebarHiddenViewport() ? calendarInsightsOffcanvasTarget : calendarInsightsSidebarTarget;
    if (calendarInsights.parentElement !== target) {
      target.appendChild(calendarInsights);
    }
  };
  var syncCalendarFilterSelectedState = function syncCalendarFilterSelectedState() {
    if (!calendarFilter) {
      return;
    }
    var defaultEventTypes = ['recurring', 'single', 'general', 'google'];
    var eventTypeFilterIsActive = state.selectedEventTypes.includes('canceled') || defaultEventTypes.some(function (type) {
      return !state.selectedEventTypes.includes(type);
    });
    var filterIsActive = Boolean(isLocationFilterActive() || eventTypeFilterIsActive);
    calendarFilter.toggleAttribute('selected', filterIsActive);
    if (calendarFilterReset) {
      calendarFilterReset.disabled = !filterIsActive;
    }
  };
  var syncLocationFilterState = function syncLocationFilterState() {
    if (!locationFilters) {
      return;
    }
    var checkedIds = Array.from(locationFilters.querySelectorAll('input[data-calendar-location-filter]:checked')).map(function (input) {
      return normalizeLocationId(input.value);
    }).filter(Boolean);
    state.selectedLocationIds = checkedIds;
    syncCalendarFilterSelectedState();
  };
  var syncEventTypeFilterState = function syncEventTypeFilterState() {
    if (!eventTypeFilters) {
      return;
    }
    state.selectedEventTypes = Array.from(eventTypeFilters.querySelectorAll('input[data-calendar-event-type-filter]:checked')).map(function (input) {
      return input.value;
    });
    syncCalendarFilterSelectedState();
  };
  var resetCalendarFilters = function resetCalendarFilters() {
    if (locationFilters) {
      locationFilters.querySelectorAll('input[data-calendar-location-filter]').forEach(function (input) {
        input.checked = true;
      });
      syncLocationFilterState();
    }
    if (eventTypeFilters) {
      eventTypeFilters.querySelectorAll('input[data-calendar-event-type-filter]').forEach(function (input) {
        input.checked = ['recurring', 'single', 'general', 'google'].includes(input.value);
      });
      syncEventTypeFilterState();
    }
    _render();
  };
  var renderLocationFilters = function renderLocationFilters() {
    if (!locationFilters) {
      return;
    }
    locationFilters.innerHTML = '';
    if (!state.locations.length) {
      var empty = document.createElement('div');
      empty.className = 'small opacity-4';
      empty.textContent = 'No locations';
      locationFilters.appendChild(empty);
      return;
    }
    state.locations.forEach(function (location) {
      var id = "calendar-location-filter-".concat(location.id);
      var option = document.createElement('div');
      var label = document.createElement('label');
      var input = document.createElement('input');
      option.className = 'form-check calendar-calendar-filter-option';
      label.className = 'form-check-label';
      label.setAttribute('for', id);
      input.type = 'checkbox';
      input.className = 'form-check-input';
      input.id = id;
      input.value = location.id;
      input.checked = urlState.locationIds === null || state.selectedLocationIds.includes(normalizeLocationId(location.id));
      input.dataset.calendarLocationFilter = '';
      label.textContent = location.name || 'Location';
      option.appendChild(input);
      option.appendChild(label);
      locationFilters.appendChild(option);
    });
    syncLocationFilterState();
  };
  var setCalendarView = function setCalendarView(nextView) {
    if (!nextView || nextView === state.view) {
      syncViewControls();
      return;
    }
    state.view = nextView;
    state.scheduleWindowStart = null;
    state.didAutoNowScroll = false;
    syncViewControls();
    _render();
  };
  bindScheduleHeaderDrag(calendar, function (dayOffset, preview) {
    if (!dayOffset || isScheduleHoldNavigationSuppressed()) {
      if (preview) {
        removeScheduleHeaderDragPreview(preview);
      }
      return;
    }
    var schedule = calendar.querySelector('.lm-schedule');
    var nextStart = addDays(getVisibleScheduleDates()[0], dayOffset);
    var keepRollingWeek = state.view === 'week';
    if (state.pendingScheduleHeaderPreview) {
      removeScheduleHeaderDragPreview(state.pendingScheduleHeaderPreview);
    }
    state.pendingScheduleHeaderPreview = preview;
    state.pendingScheduleScrollTop = schedule ? schedule.scrollTop : null;
    setSelectedDate(nextStart);
    if (keepRollingWeek) {
      state.scheduleWindowStart = cloneDate(nextStart);
    }
    state.didAutoNowScroll = true;
    state.suppressNextScheduleAnimation = true;
    _render();
  });
  var openCalendarSearch = function openCalendarSearch() {
    if (!calendarSearch) {
      return;
    }
    calendarSearch.setAttribute('selected', '');
    if (calendarToolbar) {
      calendarToolbar.setAttribute('searching', '');
    }
    if (studentSearch) {
      studentSearch.focus();
    }
  };
  var closeCalendarSearch = function closeCalendarSearch() {
    if (calendarSearch) {
      calendarSearch.removeAttribute('selected');
    }
    if (calendarToolbar) {
      calendarToolbar.removeAttribute('searching');
    }
  };
  var clearCalendarSearch = function clearCalendarSearch() {
    if (studentSearch) {
      studentSearch.value = '';
    }
    state.studentSearch = '';
    closeCalendarSearch();
    _render();
  };
  var closeCalendarViewsOffcanvas = function closeCalendarViewsOffcanvas() {
    if (!offcanvasViews) {
      return;
    }
    if (window.bootstrap && window.bootstrap.Offcanvas && typeof window.bootstrap.Offcanvas.getOrCreateInstance === 'function') {
      window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasViews).hide();
      return;
    }
    if (window.bootstrap && window.bootstrap.Offcanvas) {
      new window.bootstrap.Offcanvas(offcanvasViews).hide();
      return;
    }
    var close = offcanvasViews.querySelector('.offcanvas-header [data-bs-dismiss="offcanvas"]');
    if (close) {
      close.click();
    }
  };
  syncViewControls();
  syncCalendarInsightsPlacement();
  window.addEventListener('resize', syncCalendarInsightsPlacement);
  if (studentSearch) {
    state.studentSearch = studentSearch.value;
  }
  var renderMiniCalendar = function renderMiniCalendar() {
    if (!miniLabel || !miniGrid) {
      return;
    }
    miniLabel.textContent = monthFormatter.format(state.miniDate);
    miniGrid.innerHTML = '';
    var gridStart = startOfMonthGrid(state.miniDate);
    var selected = toDateString(state.date);
    var today = todayString();
    for (var i = 0; i < 42; i++) {
      var date = addDays(gridStart, i);
      var dateString = toDateString(date);
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'calendar-mini-calendar-date';
      button.textContent = date.getDate();
      button.dataset.date = dateString;
      if (date.getMonth() !== state.miniDate.getMonth()) {
        button.classList.add('is-muted');
      }
      if (dateString === selected) {
        button.classList.add('is-selected');
      }
      if (dateString === today) {
        button.classList.add('is-today');
      }
      miniGrid.appendChild(button);
    }
  };
  var getVisibleScheduleDay = function getVisibleScheduleDay(agenda) {
    var days = Array.from(agenda.querySelectorAll('.calendar-schedule-day'));
    if (!days.length) {
      return null;
    }
    var agendaRect = agenda.getBoundingClientRect();
    var marker = agendaRect.top + 1;
    return days.find(function (day) {
      var rect = day.getBoundingClientRect();
      return rect.bottom > marker;
    }) || days[0];
  };
  var syncScheduleLabelToScroll = function syncScheduleLabelToScroll(agenda) {
    if (state.view !== 'schedule' || !agenda) {
      return;
    }
    var visibleDay = getVisibleScheduleDay(agenda);
    if (!visibleDay || !visibleDay.dataset.date) {
      return;
    }
    var visibleDate = parseDateString(visibleDay.dataset.date);
    var visibleDateString = toDateString(visibleDate);
    if (label) {
      label.textContent = monthFormatter.format(visibleDate);
    }
    if (toDateString(state.date) !== visibleDateString) {
      state.date = visibleDate;
      state.miniDate = cloneDate(visibleDate);
      updateCalendarUrl();
      renderMiniCalendar();
      renderCalendarPaymentTotals();
    }
  };
  var queueScheduleLabelSync = function queueScheduleLabelSync(agenda) {
    if (state.scheduleLabelFrame) {
      cancelAnimationFrame(state.scheduleLabelFrame);
    }
    state.scheduleLabelFrame = requestAnimationFrame(function () {
      state.scheduleLabelFrame = null;
      syncScheduleLabelToScroll(agenda);
    });
  };
  var scrollScheduleToDay = function scrollScheduleToDay(agenda, target) {
    var behavior = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'auto';
    var firstItem = agenda ? agenda.firstElementChild : null;
    if (!agenda || !firstItem || !target) {
      return;
    }
    var precedingMonthBar = target.previousElementSibling && target.previousElementSibling.classList.contains('calendar-schedule-month-bar') ? target.previousElementSibling : null;
    var scrollTarget = behavior === 'auto' && precedingMonthBar ? precedingMonthBar : target;
    agenda.scrollTo({
      behavior: behavior,
      top: Math.max(0, scrollTarget.offsetTop - firstItem.offsetTop)
    });
    if (behavior !== 'smooth') {
      syncScheduleLabelToScroll(agenda);
    }
  };
  var scrollScheduleToSelectedDate = function scrollScheduleToSelectedDate(agenda) {
    if (!agenda) {
      return;
    }
    var selected = toDateString(state.date || getTodayDate());
    var firstDay = agenda.querySelector('.calendar-schedule-day');
    var target = agenda.querySelector(".calendar-schedule-day[data-date=\"".concat(selected, "\"]")) || agenda.querySelector(".calendar-schedule-day[data-date=\"".concat(todayString(), "\"]")) || firstDay;
    if (!target) {
      return;
    }
    scrollScheduleToDay(agenda, target);
  };
  var bindScheduleAgenda = function bindScheduleAgenda(agenda) {
    if (!agenda) {
      return;
    }
    agenda.addEventListener('scroll', function () {
      queueScheduleLabelSync(agenda);
    }, {
      passive: true
    });
    agenda.addEventListener('click', function (e) {
      var dateRail = e.target.closest('.calendar-schedule-date');
      var day = dateRail ? dateRail.closest('.calendar-schedule-day') : null;
      if (!day) {
        return;
      }
      scrollScheduleToDay(agenda, day, 'smooth');
    });
    requestAnimationFrame(function () {
      scrollScheduleToSelectedDate(agenda);
    });
  };
  var _render = function render() {
    var visibleRange = getVisibleDateRange();
    syncViewControls();
    updateCalendarUrl();
    if (!isRangeLoaded(visibleRange)) {
      fetchPlannedLessons(visibleRange).then(function () {
        if (isRangeLoaded(getVisibleDateRange())) {
          _render();
        }
      });
      return;
    }
    disconnectScheduleObserver();
    if (state.schedulePatchFrame) {
      cancelAnimationFrame(state.schedulePatchFrame);
      state.schedulePatchFrame = null;
    }
    if (state.scheduleLabelFrame) {
      cancelAnimationFrame(state.scheduleLabelFrame);
      state.scheduleLabelFrame = null;
    }
    calendar.innerHTML = '';
    calendar.classList.toggle('calendar-calendar-day-view', state.view === 'day');
    calendar.classList.toggle('calendar-calendar-two-days-view', state.view === '2-days');
    calendar.classList.toggle('calendar-calendar-week-view', state.view === 'week');
    calendar.classList.toggle('calendar-calendar-month-view', state.view === 'month');
    calendar.classList.toggle('calendar-calendar-schedule-view', state.view === 'schedule');
    syncCalendarEvents();
    renderCalendarPaymentTotals();
    if (label) {
      label.textContent = getLabel();
    }
    if (view) {
      view.value = state.view;
    }
    renderMiniCalendar();
    if (state.view === 'schedule') {
      state.instance = null;
      bindScheduleAgenda(renderScheduleAgenda(calendar));
      return;
    }
    if (scheduleGridViews.includes(state.view)) {
      state.instance = calendarjs.Schedule(calendar, {
        type: state.view === '2-days' ? 'week' : state.view,
        value: getScheduleValue(),
        data: normalizeScheduleEvents(getScheduleRenderEvents()),
        validRange: [scheduleStart, scheduleEnd],
        overlap: true,
        onbeforeinsert: function onbeforeinsert() {
          return false;
        },
        onbeforechangeevent: function onbeforechangeevent(instance, detail) {
          if (detail && detail.action && !(detail.element && detail.element.hasAttribute('holding-event'))) {
            return false;
          }
        },
        onbeforechange: function onbeforechange(instance, detail) {
          if (scheduleItemHold && scheduleItemHold.active && detail && detail.action === 'updateEvent') {
            return false;
          }
        },
        oncreate: function oncreate(instance) {
          syncEvents(instance);
          queueSchedulePatch(calendar);
        },
        onchange: function onchange(instance) {
          syncEvents(instance);
          queueSchedulePatch(calendar);
        },
        onchangeevent: function onchangeevent(instance) {
          syncEvents(instance);
          queueSchedulePatch(calendar);
        },
        ondelete: function ondelete(instance) {
          syncEvents(instance);
          queueSchedulePatch(calendar);
        }
      });
      patchSchedule(calendar);
      if (state.pendingScheduleHeaderPreview) {
        var preview = state.pendingScheduleHeaderPreview;
        state.pendingScheduleHeaderPreview = null;
        Promise.resolve(preview.settledPromise).then(function () {
          requestAnimationFrame(function () {
            removeScheduleHeaderDragPreview(preview);
          });
        });
      }
      if (state.pendingScheduleScrollTop !== null) {
        var schedule = calendar.querySelector('.lm-schedule');
        if (schedule) {
          schedule.scrollTop = state.pendingScheduleScrollTop;
        }
        state.pendingScheduleScrollTop = null;
      }
      return;
    }
    if (state.view === 'month') {
      state.instance = null;
      renderMonthCalendar(calendar);
      return;
    }
  };
  var refreshCalendarAfterLessonMutation = function refreshCalendarAfterLessonMutation() {
    var schedule = calendar.querySelector('.lm-schedule');
    var scrollTop = schedule ? schedule.scrollTop : 0;
    var scrollLeft = schedule ? schedule.scrollLeft : 0;
    var visibleRange = getVisibleDateRange();
    state.loadedRange = null;
    state.pendingRangeKey = null;
    return fetchPlannedLessons(visibleRange).then(function () {
      state.suppressNextScheduleAnimation = true;
      _render();
      requestAnimationFrame(function () {
        var refreshedSchedule = calendar.querySelector('.lm-schedule');
        if (refreshedSchedule) {
          refreshedSchedule.scrollTop = scrollTop;
          refreshedSchedule.scrollLeft = scrollLeft;
        }
      });
    });
  };
  if (today) {
    today.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      setSelectedDate(getTodayDate());
      _render();
    });
  }
  if (previous) {
    previous.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      move(-1);
      _render();
    });
  }
  if (next) {
    next.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      move(1);
      _render();
    });
  }
  if (view) {
    view.addEventListener('change', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        syncViewControls();
        return;
      }
      setCalendarView(this.value);
    });
  }
  offcanvasViewItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      setCalendarView(item.dataset.calendarOffcanvasView);
      closeCalendarViewsOffcanvas();
    });
  });
  if (studentSearch) {
    studentSearch.addEventListener('input', function () {
      state.studentSearch = this.value;
      _render();
    });
  }
  if (locationFilters) {
    locationFilters.addEventListener('change', function (e) {
      if (!e.target.matches('input[data-calendar-location-filter]')) {
        return;
      }
      syncLocationFilterState();
      _render();
    });
  }
  if (eventTypeFilters) {
    eventTypeFilters.addEventListener('change', function (e) {
      if (!e.target.matches('input[data-calendar-event-type-filter]')) {
        return;
      }
      syncEventTypeFilterState();
      _render();
    });
  }
  if (calendarFilterReset) {
    calendarFilterReset.addEventListener('click', resetCalendarFilters);
  }
  if (calendarSearchToggle) {
    calendarSearchToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openCalendarSearch();
    });
  }
  if (calendarSearchClear) {
    calendarSearchClear.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      clearCalendarSearch();
    });
  }
  if (calendarSearch) {
    calendarSearch.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    document.addEventListener('click', function (e) {
      if (!calendarSearch.contains(e.target)) {
        closeCalendarSearch();
      }
    });
  }
  if (miniPrevious) {
    miniPrevious.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      state.miniDate = addMonths(state.miniDate, -1);
      renderMiniCalendar();
    });
  }
  if (miniNext) {
    miniNext.addEventListener('click', function () {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      state.miniDate = addMonths(state.miniDate, 1);
      renderMiniCalendar();
    });
  }
  if (miniGrid) {
    miniGrid.addEventListener('click', function (e) {
      if (isScheduleHoldNavigationSuppressed()) {
        return;
      }
      var button = e.target.closest('[data-date]');
      if (!button) {
        return;
      }
      setSelectedDate(parseDateString(button.dataset.date));
      _render();
    });
  }
  var lessonTaught = document.getElementById('lesson-taught');
  if (lessonTaught) {
    lessonTaught.addEventListener('click', function (e) {
      e.preventDefault();
      storeTaughtLesson(lessonTaught, refreshCalendarAfterLessonMutation);
    });
  }
  var confirmPayment = document.getElementById('confirm-payment');
  if (confirmPayment) {
    confirmPayment.addEventListener('click', function (e) {
      e.preventDefault();
      confirmLessonPayment(confirmPayment, refreshCalendarAfterLessonMutation);
    });
  }
  var earlyPayment = document.getElementById('early-payment');
  if (earlyPayment) {
    earlyPayment.addEventListener('click', function (e) {
      e.preventDefault();
      storeEarlyPayment(earlyPayment, refreshCalendarAfterLessonMutation);
    });
  }
  var lessonRevert = document.getElementById('lesson-revert');
  if (lessonRevert) {
    lessonRevert.addEventListener('click', function (e) {
      e.preventDefault();
      var updatedItem = lessonModal && lessonModal.updatedScheduleItem;
      if (updatedItem && updatedItem.hasAttribute('updated-event') && updatedItem.scheduleOriginalPosition) {
        restoreUpdatedScheduleItem(updatedItem);
        lessonModal.updatedScheduleItem = null;
        openLessonModal(updatedItem.event);
        return;
      }
      revertLessonAction(lessonRevert, refreshCalendarAfterLessonMutation);
    });
  }
  var lessonEdit = document.getElementById('lesson-edit');
  if (lessonEdit) {
    lessonEdit.addEventListener('click', function (e) {
      e.preventDefault();
      loadCalendarEditModal(lessonEdit, lessonModal, calendarEditModalContainer);
    });
  }
  var cancelLessonButton = document.getElementById('cancel-lesson-button');
  if (cancelLessonButton) {
    cancelLessonButton.addEventListener('click', function (e) {
      e.preventDefault();
      showLessonCancelForm(lessonModal);
    });
  }
  if (lessonModal) {
    var rescheduleButton = lessonModal.querySelector('#reschedule-lesson-button');
    var rescheduleForm = lessonModal.querySelector('#reschedule-lesson form');
    var cancelForm = lessonModal.querySelector('#cancel-lesson form');
    var reschedulePrevious = lessonModal.querySelector('[data-reschedule-datepicker-prev]');
    var rescheduleNext = lessonModal.querySelector('[data-reschedule-datepicker-next]');
    var rescheduleGrid = lessonModal.querySelector('[data-reschedule-datepicker-grid]');
    var rescheduleDate = lessonModal.querySelector('#reschedule-lesson-date');
    var rescheduleStartTime = lessonModal.querySelector('#reschedule-lesson-start-time');
    var rescheduleEndTime = lessonModal.querySelector('#reschedule-lesson-end-time');
    if (rescheduleButton) {
      rescheduleButton.addEventListener('click', function (e) {
        e.preventDefault();
        showLessonRescheduleForm(lessonModal);
      });
    }
    [rescheduleForm, cancelForm].filter(Boolean).forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitLessonModalForm(form, refreshCalendarAfterLessonMutation);
      });
    });
    lessonModal.addEventListener('hidden.bs.modal', function () {
      lessonModal.updatedScheduleItem = null;
      resetLessonModalState(lessonModal);
    });
    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
      window.jQuery(lessonModal).on('hidden.bs.modal', function () {
        lessonModal.updatedScheduleItem = null;
        resetLessonModalState(lessonModal);
      });
    }
    if (reschedulePrevious) {
      reschedulePrevious.addEventListener('click', function () {
        state.rescheduleDatePickerDate = addMonths(state.rescheduleDatePickerDate || getTodayDate(), -1);
        renderRescheduleDatePicker(lessonModal);
      });
    }
    if (rescheduleNext) {
      rescheduleNext.addEventListener('click', function () {
        state.rescheduleDatePickerDate = addMonths(state.rescheduleDatePickerDate || getTodayDate(), 1);
        renderRescheduleDatePicker(lessonModal);
      });
    }
    if (rescheduleGrid) {
      rescheduleGrid.addEventListener('click', function (e) {
        var button = e.target.closest('[data-date]');
        if (!button) {
          return;
        }
        if (rescheduleDate) {
          rescheduleDate.value = button.dataset.date;
        }
        state.rescheduleDatePickerDate = parseDateString(button.dataset.date);
        renderRescheduleDatePicker(lessonModal);
      });
    }
    if (rescheduleStartTime) {
      rescheduleStartTime.addEventListener('change', function () {
        syncRescheduleTimePicker(rescheduleStartTime, rescheduleEndTime, 'start');
      });
    }
    if (rescheduleEndTime) {
      rescheduleEndTime.addEventListener('change', function () {
        syncRescheduleTimePicker(rescheduleStartTime, rescheduleEndTime, 'end');
      });
    }
  }
  if (generalEventModal) {
    var editButton = generalEventModal.querySelector('#event-edit');
    var revertButton = generalEventModal.querySelector('#event-revert');
    var cancelButton = generalEventModal.querySelector('#cancel-general-event-button');
    var _rescheduleButton = generalEventModal.querySelector('#reschedule-general-event-button');
    var _rescheduleForm = generalEventModal.querySelector('#reschedule-general-event form');
    var _cancelForm = generalEventModal.querySelector('#cancel-general-event form');
    var _reschedulePrevious = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-prev]');
    var _rescheduleNext = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-next]');
    var _rescheduleGrid = generalEventModal.querySelector('[data-general-event-reschedule-datepicker-grid]');
    var _rescheduleDate = generalEventModal.querySelector('#reschedule-general-event-date');
    var _rescheduleStartTime = generalEventModal.querySelector('#reschedule-general-event-start-time');
    var _rescheduleEndTime = generalEventModal.querySelector('#reschedule-general-event-end-time');
    if (editButton) {
      editButton.addEventListener('click', function (e) {
        e.preventDefault();
        loadCalendarEditModal(editButton, generalEventModal, calendarEditModalContainer);
      });
    }
    if (revertButton) {
      revertButton.addEventListener('click', function (e) {
        e.preventDefault();
        var updatedItem = generalEventModal && generalEventModal.updatedScheduleItem;
        if (updatedItem && updatedItem.hasAttribute('updated-event') && updatedItem.scheduleOriginalPosition) {
          restoreUpdatedScheduleItem(updatedItem);
          generalEventModal.updatedScheduleItem = null;
          openGeneralEventModal(updatedItem.event);
          return;
        }
        revertGeneralEventAction(revertButton, refreshCalendarAfterLessonMutation);
      });
    }
    if (cancelButton) {
      cancelButton.addEventListener('click', function () {
        showGeneralEventCancelForm(generalEventModal);
      });
    }
    if (_rescheduleButton) {
      _rescheduleButton.addEventListener('click', function () {
        showGeneralEventRescheduleForm(generalEventModal);
      });
    }
    [_rescheduleForm, _cancelForm].filter(Boolean).forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        submitGeneralEventModalForm(form, refreshCalendarAfterLessonMutation);
      });
    });
    generalEventModal.addEventListener('hidden.bs.modal', function () {
      generalEventModal.updatedScheduleItem = null;
      resetGeneralEventModalState(generalEventModal);
    });
    if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
      window.jQuery(generalEventModal).on('hidden.bs.modal', function () {
        generalEventModal.updatedScheduleItem = null;
        resetGeneralEventModalState(generalEventModal);
      });
    }
    if (_reschedulePrevious) {
      _reschedulePrevious.addEventListener('click', function () {
        state.generalEventRescheduleDatePickerDate = addMonths(state.generalEventRescheduleDatePickerDate || getTodayDate(), -1);
        renderGeneralEventRescheduleDatePicker(generalEventModal);
      });
    }
    if (_rescheduleNext) {
      _rescheduleNext.addEventListener('click', function () {
        state.generalEventRescheduleDatePickerDate = addMonths(state.generalEventRescheduleDatePickerDate || getTodayDate(), 1);
        renderGeneralEventRescheduleDatePicker(generalEventModal);
      });
    }
    if (_rescheduleGrid) {
      _rescheduleGrid.addEventListener('click', function (e) {
        var button = e.target.closest('[data-date]');
        if (!button) {
          return;
        }
        if (_rescheduleDate) {
          _rescheduleDate.value = button.dataset.date;
        }
        state.generalEventRescheduleDatePickerDate = parseDateString(button.dataset.date);
        renderGeneralEventRescheduleDatePicker(generalEventModal);
      });
    }
    if (_rescheduleStartTime) {
      _rescheduleStartTime.addEventListener('change', function () {
        syncRescheduleTimePicker(_rescheduleStartTime, _rescheduleEndTime, 'start');
      });
    }
    if (_rescheduleEndTime) {
      _rescheduleEndTime.addEventListener('change', function () {
        syncRescheduleTimePicker(_rescheduleStartTime, _rescheduleEndTime, 'end');
      });
    }
  }
  if (calendarEditModalContainer) {
    calendarEditModalContainer.addEventListener('submit', function (e) {
      var form = e.target.closest('form');
      if (!form || !calendarEditModalContainer.contains(form)) {
        return;
      }
      e.preventDefault();
      submitCalendarEditForm(form, refreshCalendarAfterLessonMutation);
    });
  }
  calendar.addEventListener('click', function (e) {
    var day = e.target.closest('.calendar-month-day');
    if (!day || state.view !== 'month') {
      return;
    }
    var more = e.target.closest('.calendar-month-more');
    if (more) {
      e.preventDefault();
      e.stopPropagation();
      openMonthDayEventsModal(more.dataset.monthMoreDate || day.dataset.date);
      return;
    }
    if (!e.target.closest('.calendar-month-event')) {
      setSelectedDate(parseDateString(day.dataset.date));
      state.view = 'week';
      _render();
    }
  });
  calendar.addEventListener('mousedown', function (e) {
    var item = e.target.closest('.lm-schedule-item');
    if (!item || item.hasAttribute('holding-event')) {
      return;
    }
    e.stopPropagation();
  }, true);
  var removeScheduleHoldTime = function removeScheduleHoldTime(hold) {
    if (!hold) {
      return;
    }
    if (hold.timeMarkerFrame) {
      window.cancelAnimationFrame(hold.timeMarkerFrame);
      hold.timeMarkerFrame = null;
    }
    if (hold.timeMarker) {
      hold.timeMarker.remove();
      hold.timeMarker = null;
    }
    hold.timeMarkerRow = null;
  };
  var updateScheduleHoldTime = function updateScheduleHoldTime(hold) {
    if (!hold || hold !== scheduleItemHold || !hold.active || !hold.clone) {
      return;
    }
    var row = hold.clone.closest('tr');
    var gutter = row && row.cells.length ? row.cells[0] : null;
    if (!gutter) {
      removeScheduleHoldTime(hold);
      return;
    }
    if (gutter.querySelector(':scope > .lm-schedule-index')) {
      removeScheduleHoldTime(hold);
      return;
    }
    if (hold.timeMarkerRow !== row) {
      if (hold.timeMarker) {
        hold.timeMarker.remove();
      }
      hold.timeMarker = document.createElement('span');
      hold.timeMarker.className = 'calendar-schedule-holding-time';
      gutter.appendChild(hold.timeMarker);
      hold.timeMarkerRow = row;
    }
    hold.timeMarker.textContent = formatEventTime(hold.clone.getAttribute('data-start') || hold.clone.start).replace(/(?:am|pm)$/i, '');
  };
  var queueScheduleHoldTimeUpdate = function queueScheduleHoldTimeUpdate(hold) {
    if (!hold || hold !== scheduleItemHold) {
      return;
    }
    if (hold.timeMarkerFrame) {
      window.cancelAnimationFrame(hold.timeMarkerFrame);
    }
    hold.timeMarkerFrame = window.requestAnimationFrame(function () {
      hold.timeMarkerFrame = null;
      updateScheduleHoldTime(hold);
    });
  };
  var finishScheduleNativeDrag = function finishScheduleNativeDrag(hold, clientX, clientY, commitVisualDrop) {
    if (!hold || !hold.active || hold.nativeDragFinished) {
      return;
    }
    hold.commitVisualDrop = Boolean(commitVisualDrop);
    hold.finishingNativeDrag = true;
    hold.nativeDragFinished = true;
    document.dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window,
      button: 0,
      buttons: 0,
      clientX: clientX === undefined ? hold.lastX : clientX,
      clientY: clientY === undefined ? hold.lastY : clientY
    }));
  };
  var restoreUpdatedScheduleItem = function restoreUpdatedScheduleItem(item) {
    var original = item && item.scheduleOriginalPosition;
    if (!item || !original || !item.isConnected || !original.cell || !original.cell.isConnected) {
      return;
    }
    Object.keys(original.attributes).forEach(function (attribute) {
      var value = original.attributes[attribute];
      if (value === null) {
        item.removeAttribute(attribute);
      } else {
        item.setAttribute(attribute, value);
      }
    });
    item.start = original.start;
    item.end = original.end;
    item.date = original.date;
    item.weekday = original.weekday;
    item.event.start = original.eventStart;
    item.event.end = original.eventEnd;
    item.event.date = original.eventDate;
    item.event.weekday = original.eventWeekday;
    if (original.eventOriginalDate === undefined) {
      delete item.event.originalDate;
    } else {
      item.event.originalDate = original.eventOriginalDate;
    }
    if (original.eventOriginalStartTime === undefined) {
      delete item.event.originalStartTime;
    } else {
      item.event.originalStartTime = original.eventOriginalStartTime;
    }
    original.cell.appendChild(item);
    item.removeAttribute('updated-event');
    delete item.scheduleOriginalPosition;
  };
  var getScheduleItemGuid = function getScheduleItemGuid(item) {
    var event = getEventByScheduleItem(item);
    return String(event && event.guid || item && (item.id || item.dataset.eventGuid) || '');
  };
  var removeDuplicateScheduleItems = function removeDuplicateScheduleItems(schedule, item) {
    var guid = getScheduleItemGuid(item);
    if (!schedule || !guid) {
      return;
    }
    schedule.querySelectorAll('.lm-schedule-item').forEach(function (candidate) {
      if (candidate !== item && getScheduleItemGuid(candidate) === guid) {
        candidate.remove();
      }
    });
  };
  var applyScheduleVisualDrop = function applyScheduleVisualDrop(hold) {
    if (!hold || !hold.commitVisualDrop || !hold.clone || !hold.item || !hold.item.event) {
      return;
    }
    var target = hold.clone.parentElement;
    if (!target || target.tagName !== 'TD' || !hold.schedule || !hold.schedule.contains(target)) {
      return;
    }
    var wasMoved = target !== hold.originCell;
    if (wasMoved && !hold.item.scheduleOriginalPosition) {
      hold.item.scheduleOriginalPosition = {
        cell: hold.originCell,
        attributes: ['data-x', 'data-height', 'data-start', 'data-end'].reduce(function (attributes, attribute) {
          attributes[attribute] = hold.item.getAttribute(attribute);
          return attributes;
        }, {}),
        start: hold.item.start,
        end: hold.item.end,
        date: hold.item.date,
        weekday: hold.item.weekday,
        eventStart: hold.item.event.start,
        eventEnd: hold.item.event.end,
        eventDate: hold.item.event.date,
        eventWeekday: hold.item.event.weekday,
        visibleDate: hold.originCell.getAttribute('data-real-date') || hold.originCell.getAttribute('data-date'),
        eventOriginalDate: hold.item.event.originalDate,
        eventOriginalStartTime: hold.item.event.originalStartTime
      };
    }
    var start = hold.clone.getAttribute('data-start') || hold.clone.start;
    var end = hold.clone.getAttribute('data-end') || hold.clone.end;
    var date = target.getAttribute('data-real-date') || target.getAttribute('data-date') || hold.clone.date;
    var weekday = hold.clone.weekday;
    ['data-x', 'data-height', 'data-start', 'data-end'].forEach(function (attribute) {
      var value = hold.clone.getAttribute(attribute);
      if (value === null) {
        hold.item.removeAttribute(attribute);
      } else {
        hold.item.setAttribute(attribute, value);
      }
    });
    hold.item.start = start;
    hold.item.end = end;
    hold.item.date = date;
    hold.item.weekday = weekday;
    if (hold.item.scheduleOriginalPosition) {
      hold.item.event.originalDate = hold.item.event.originalDate || hold.item.scheduleOriginalPosition.visibleDate || hold.item.scheduleOriginalPosition.eventDate;
      hold.item.event.originalStartTime = hold.item.event.originalStartTime || hold.item.scheduleOriginalPosition.eventStart;
    }
    hold.item.event.start = start;
    hold.item.event.end = end;
    if (date) {
      hold.item.event.date = date;
    }
    if (weekday !== undefined) {
      hold.item.event.weekday = weekday;
    }
    target.appendChild(hold.item);
    removeDuplicateScheduleItems(hold.schedule, hold.item);
    if (hold.item.scheduleOriginalPosition && target !== hold.item.scheduleOriginalPosition.cell) {
      hold.item.setAttribute('updated-event', '');
    } else {
      hold.item.removeAttribute('updated-event');
      delete hold.item.scheduleOriginalPosition;
    }
  };
  var clearScheduleItemHold = function clearScheduleItemHold(pointerId) {
    if (!scheduleItemHold || pointerId !== undefined && pointerId !== scheduleItemHold.pointerId) {
      return;
    }
    finishScheduleNativeDrag(scheduleItemHold);
    window.clearTimeout(scheduleItemHold.timer);
    if (scheduleItemHold.active) {
      scheduleHoldNavigationSuppressedUntil = Date.now() + 750;
      var suppressedItem = scheduleItemHold.item;
      suppressedScheduleItemClick = suppressedItem;
      window.setTimeout(function () {
        if (suppressedScheduleItemClick === suppressedItem) {
          suppressedScheduleItemClick = null;
        }
      }, 0);
    }
    applyScheduleVisualDrop(scheduleItemHold);
    removeScheduleHoldTime(scheduleItemHold);
    scheduleItemHold.item.removeAttribute('original-event');
    if (scheduleItemHold.clone) {
      scheduleItemHold.clone.remove();
    }
    var schedule = scheduleItemHold.schedule || scheduleItemHold.item.closest('.lm-schedule');
    if (schedule) {
      schedule.querySelectorAll('.lm-schedule-item[holding-event]').forEach(function (item) {
        item.remove();
      });
      schedule.style.removeProperty('cursor');
      schedule.style.touchAction = scheduleItemHold.scheduleTouchAction || '';
      schedule.style.overscrollBehavior = scheduleItemHold.scheduleOverscrollBehavior || '';
      schedule.style.overflow = scheduleItemHold.scheduleOverflow || '';
    }
    if (typeof scheduleItemHold.item.releasePointerCapture === 'function' && typeof scheduleItemHold.item.hasPointerCapture === 'function' && scheduleItemHold.item.hasPointerCapture(scheduleItemHold.pointerId)) {
      scheduleItemHold.item.releasePointerCapture(scheduleItemHold.pointerId);
    }
    var shouldPatchSchedule = scheduleItemHold.active;
    scheduleItemHold = null;
    if (shouldPatchSchedule && scheduleGridViews.includes(state.view)) {
      queueSchedulePatch(calendar);
    }
  };
  calendar.addEventListener('pointerdown', function (e) {
    var item = e.target.closest('.lm-schedule-item');
    if (!item || item.getAttribute('data-lesson-status') === 'canceled' || item.hasAttribute('data-read-only') || !scheduleGridViews.includes(state.view) || e.button !== 0 || !e.isPrimary) {
      return;
    }
    clearScheduleItemHold();
    scheduleItemHold = {
      item: item,
      originCell: item.parentElement,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      pointerType: e.pointerType,
      active: false,
      commitVisualDrop: false,
      finishingNativeDrag: false,
      nativeDragFinished: false,
      clone: null,
      timeMarker: null,
      timeMarkerRow: null,
      timeMarkerFrame: null,
      schedule: null,
      scheduleTouchAction: '',
      scheduleOverscrollBehavior: '',
      scheduleOverflow: '',
      timer: window.setTimeout(function () {
        if (!scheduleItemHold || scheduleItemHold.item !== item || !item.isConnected) {
          return;
        }
        var clone = item.cloneNode(true);
        var event = item.event;
        var schedule = item.closest('.lm-schedule');
        if (!event || !schedule) {
          clearScheduleItemHold(e.pointerId);
          return;
        }
        clone.removeAttribute('id');
        clone.setAttribute('holding-event', '');
        clone.setAttribute('aria-hidden', 'true');
        clone.event = event;
        clone.date = item.date || event.date;
        clone.weekday = item.weekday !== undefined ? item.weekday : event.weekday;
        clone.start = item.start || event.start;
        clone.end = item.end || event.end;
        disconnectScheduleObserver();
        if (state.schedulePatchFrame) {
          window.cancelAnimationFrame(state.schedulePatchFrame);
          state.schedulePatchFrame = null;
        }
        item.setAttribute('original-event', '');
        item.parentElement.appendChild(clone);
        scheduleItemHold.active = true;
        scheduleItemHold.clone = clone;
        scheduleItemHold.schedule = schedule;
        scheduleItemHold.scheduleTouchAction = schedule.style.touchAction;
        scheduleItemHold.scheduleOverscrollBehavior = schedule.style.overscrollBehavior;
        scheduleItemHold.scheduleOverflow = schedule.style.overflow;
        scheduleHoldNavigationSuppressedUntil = Number.POSITIVE_INFINITY;
        schedule.style.cursor = 'move';
        schedule.style.touchAction = 'none';
        schedule.style.overscrollBehavior = 'none';
        schedule.style.overflow = 'hidden';
        if (typeof item.setPointerCapture === 'function') {
          item.setPointerCapture(e.pointerId);
        }
        clone.dispatchEvent(new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
          view: window,
          button: 0,
          buttons: 1,
          clientX: e.clientX,
          clientY: e.clientY
        }));
        queueScheduleHoldTimeUpdate(scheduleItemHold);
      }, 600)
    };
  });
  calendar.addEventListener('pointermove', function (e) {
    if (!scheduleItemHold || scheduleItemHold.pointerId !== e.pointerId) {
      return;
    }
    scheduleItemHold.lastX = e.clientX;
    scheduleItemHold.lastY = e.clientY;
    if (scheduleItemHold.active) {
      e.preventDefault();
      if (scheduleItemHold.pointerType !== 'mouse') {
        document.dispatchEvent(new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          view: window,
          button: 0,
          buttons: 1,
          clientX: e.clientX,
          clientY: e.clientY
        }));
      }
      queueScheduleHoldTimeUpdate(scheduleItemHold);
      return;
    }
    if (Math.abs(e.clientX - scheduleItemHold.startX) > 8 || Math.abs(e.clientY - scheduleItemHold.startY) > 8) {
      clearScheduleItemHold(e.pointerId);
    }
  }, {
    passive: false
  });
  document.addEventListener('pointerup', function (e) {
    if (scheduleItemHold && scheduleItemHold.pointerId === e.pointerId && scheduleItemHold.active && scheduleItemHold.pointerType !== 'mouse') {
      e.preventDefault();
      finishScheduleNativeDrag(scheduleItemHold, e.clientX, e.clientY, true);
      return;
    }
    if (!scheduleItemHold || scheduleItemHold.pointerId !== e.pointerId || !scheduleItemHold.active) {
      clearScheduleItemHold(e.pointerId);
    }
  }, {
    passive: false
  });
  document.addEventListener('mouseup', function () {
    if (scheduleItemHold && scheduleItemHold.active) {
      if (!scheduleItemHold.finishingNativeDrag) {
        scheduleItemHold.commitVisualDrop = true;
      }
      scheduleItemHold.finishingNativeDrag = false;
      scheduleItemHold.nativeDragFinished = true;
      window.setTimeout(function () {
        clearScheduleItemHold();
      }, 0);
    }
  });
  document.addEventListener('pointercancel', function (e) {
    if (scheduleItemHold && scheduleItemHold.pointerId === e.pointerId && scheduleItemHold.active && scheduleItemHold.pointerType !== 'mouse') {
      finishScheduleNativeDrag(scheduleItemHold, e.clientX, e.clientY);
    }
    clearScheduleItemHold(e.pointerId);
  });
  window.addEventListener('blur', function () {
    clearScheduleItemHold();
  });
  calendar.addEventListener('click', function (e) {
    if (isScheduleHoldNavigationSuppressed()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    }
    var day = e.target.closest('.lm-schedule tbody td[data-date]');
    if (!day || !['2-days', 'week'].includes(state.view) || e.target.closest('.lm-schedule-item')) {
      return;
    }
    setSelectedDate(parseDateString(day.dataset.realDate || day.dataset.date));
    state.view = 'day';
    _render();
  });
  calendar.addEventListener('click', function (e) {
    var item = e.target.closest('.lm-schedule-item, .calendar-month-event, .calendar-schedule-event, .calendar-schedule-break, .calendar-schedule-recital');
    if (!item || item.classList.contains('calendar-month-event-holiday') || item.classList.contains('calendar-schedule-event-holiday')) {
      return;
    }
    if (item.hasAttribute('holding-event')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (item.classList.contains('lm-schedule-item') && suppressedScheduleItemClick === item) {
      suppressedScheduleItemClick = null;
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    var event = item.classList.contains('lm-schedule-item') ? getEventByScheduleItem(item) : getEventByGuid(item.id || item.dataset.eventGuid);
    var updatedItem = item.hasAttribute('updated-event') ? item : null;
    if (event && event.isBreak) {
      openTeachingBreakModal(event);
      return;
    }
    if (event && event.isRecital) {
      openRecitalModal(event);
      return;
    }
    if (event && event.isGeneralEvent) {
      openGeneralEventModal(event, {
        openReschedule: Boolean(updatedItem),
        updatedItem: updatedItem
      });
      return;
    }
    openLessonModal(event, {
      openReschedule: Boolean(updatedItem),
      updatedItem: updatedItem
    });
  });
  var monthDayEventsModal = document.getElementById('month-day-events-modal');
  if (monthDayEventsModal) {
    monthDayEventsModal.addEventListener('click', function (e) {
      var item = e.target.closest('.calendar-month-event, .calendar-schedule-break, .calendar-schedule-recital');
      if (!item || item.classList.contains('calendar-month-event-holiday')) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      var event = getEventByGuid(item.dataset.eventGuid);
      if (!event) {
        return;
      }
      hideBootstrapModal(monthDayEventsModal);
      if (event.isBreak) {
        openTeachingBreakModal(event);
        return;
      }
      if (event.isRecital) {
        openRecitalModal(event);
        return;
      }
      if (event.isGeneralEvent) {
        openGeneralEventModal(event);
        return;
      }
      openLessonModal(event);
    });
  }
  renderLocationFilters();
  if (urlState.eventTypes !== null && eventTypeFilters) {
    eventTypeFilters.querySelectorAll('input[data-calendar-event-type-filter]').forEach(function (input) {
      input.checked = state.selectedEventTypes.includes(input.value);
    });
  }
  syncEventTypeFilterState();
  _render();
  var stopSchedulePointerClock = function stopSchedulePointerClock() {
    if (state.schedulePointerTimer) {
      window.clearTimeout(state.schedulePointerTimer);
      state.schedulePointerTimer = null;
    }
  };
  var _updateSchedulePointerClock = function updateSchedulePointerClock() {
    stopSchedulePointerClock();
    if (document.hidden) {
      return;
    }
    if (scheduleGridViews.includes(state.view)) {
      patchSchedulePointer(calendar);
    }
    var nextSecondDelay = Math.max(50, 1000 - Date.now() % 1000);
    state.schedulePointerTimer = window.setTimeout(_updateSchedulePointerClock, nextSecondDelay);
  };
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stopSchedulePointerClock();
      return;
    }
    _updateSchedulePointerClock();
  });
  _updateSchedulePointerClock();
});
})();

/******/ })()
;