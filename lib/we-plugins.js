(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("we-plugins", [], factory);
	else if(typeof exports === 'object')
		exports["we-plugins"] = factory();
	else
		root["we-plugins"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(31)('wks');
var uid = __webpack_require__(20);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var IE8_DOM_DEFINE = __webpack_require__(40);
var toPrimitive = __webpack_require__(25);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(2);
var ctx = __webpack_require__(11);
var hide = __webpack_require__(7);
var has = __webpack_require__(9);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(12)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var createDesc = __webpack_require__(13);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(42);
var defined = __webpack_require__(27);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(66);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(41);
var enumBugKeys = __webpack_require__(32);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f;
var has = __webpack_require__(9);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(29);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(31)('keys');
var uid = __webpack_require__(20);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 33 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(27);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(81)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(45)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(22);
var wksExt = __webpack_require__(36);
var defineProperty = __webpack_require__(3).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(18);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



/*********
 * 自己写的订阅发布模式
 */
var Subscribe = function () {
  function Subscribe() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Subscribe);

    this.handle = {};
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Subscribe, [{
    key: 'on',
    value: function on(name, listener) {
      // 必须是个函数
      if (typeof listener !== 'function') {
        throw new TypeError('"listener" must be a function');
      }
      // 获得订阅者信息
      var subscribe = this.handle[name];
      // 订阅者不存在
      if (!subscribe) {
        this.handle[name] = [];
      }
      this.handle[name].push(listener);
    }
  }, {
    key: 'emit',
    value: function emit(name) {
      var _this = this;

      for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        arg[_key - 1] = arguments[_key];
      }

      var result = true;
      var subscribe = this.handle[name];
      // 发布信息
      if (Array.isArray(subscribe)) {
        subscribe.map(function (item) {
          var flag = item.apply(_this, arg);
          if (!flag) {
            result = flag;
          }
        });
      }
      return result;
    }
  }, {
    key: 'off',
    value: function off(name, listener) {
      var subscribe = this.handle[name];
      if (!listener) {
        this.handle[name] = [];
        return;
      }
      if (Array.isArray(subscribe)) {
        var len = subscribe.indexOf(listener);
        if (len > -1) {
          // 取消订阅
          subscribe.splice(len, 1);
        }
      }
    }
  }, {
    key: 'install',
    value: function install(Vue) {
      Vue.prototype.$subscribe = this;
    }
  }]);

  return Subscribe;
}();

/* harmony default export */ __webpack_exports__["a"] = (Subscribe);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(12)(function () {
  return Object.defineProperty(__webpack_require__(24)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(9);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(77)(false);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(14);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["hasClass"] = hasClass;
/* harmony export (immutable) */ __webpack_exports__["addClass"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["getData"] = getData;
/* harmony export (immutable) */ __webpack_exports__["prefixStyle"] = prefixStyle;
/* harmony export (immutable) */ __webpack_exports__["assertionDom"] = assertionDom;
/* harmony export (immutable) */ __webpack_exports__["absolutePosition"] = absolutePosition;
/* harmony export (immutable) */ __webpack_exports__["getStyle"] = getStyle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);

/**
 * 判断元素是不是有某个className
 * @author zhangmin
 * @param el HTMLElement
 * @param className string
 * @returns {boolean}
 */
function hasClass(el, className) {
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

/**
 * 给某个元素添加className
 * @param el HTMLElement
 * @param className string
 */
function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }

  var newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

function getData(el, name, val) {
  var prefix = 'data-';
  if (val) {
    return el.setAttribute(prefix + name, val);
  }
  return el.getAttribute(prefix + name);
}

var elementStyle = document.createElement('div').style;

var vendor = function () {
  var transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  };

  for (var key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  return false;
}();

/**
 * 加浏览器前缀
 * @param style
 * @returns {vendor}
 */
function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }

  if (vendor === 'standard') {
    return style;
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

/**
 * 断言是不是元素
 * @param ele HTMLElement
 * @returns {boolean}
 */
function assertionDom(ele) {
  if ((typeof ele === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(ele)) === 'object' && ele instanceof HTMLElement) return true;
  return false;
}

function getPos(ele) {
  var left = 0,
      top = 0;
  while (ele) {
    left += ele.offsetLeft;
    top += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return {
    left: left,
    top: top
  };
}

/**
 * 获取元素在浏览器的左边距和上边距
 * @param ele HTMLElement
 * @returns {{left: *|number, top: *|number}}
 */
function absolutePosition(ele) {
  if (!assertionDom(ele)) {
    throw new Error('请传入一个dom元素');
  }
  var result = void 0;
  if (ele.getBoundingClientRect) {
    result = ele.getBoundingClientRect();
  } else {
    result = getPos(ele);
  }
  var left = result.left + document.documentElement.scrollLeft;
  var top = result.top + document.documentElement.scrollTop;
  return {
    left: left,
    top: top
  };
}

/**
 * 获得css样式值
 * @param ele HTMLElement
 * @param attr string
 * @returns {string}
 */
function getStyle(ele, attr) {
  if (!assertionDom(ele)) {
    throw new Error('请传入一个dom元素');
  }
  if (ele.currentStyle) {
    return ele.currentStyle[attr];
  } else {
    return window.getComputedStyle(ele, null)[attr];
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(79);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(88);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(46);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(15);
var $iterCreate = __webpack_require__(82);
var setToStringTag = __webpack_require__(23);
var getPrototypeOf = __webpack_require__(84);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(5);
var dPs = __webpack_require__(83);
var enumBugKeys = __webpack_require__(32);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(24)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(48).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
var global = __webpack_require__(0);
var hide = __webpack_require__(7);
var Iterators = __webpack_require__(15);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(41);
var hiddenKeys = __webpack_require__(32).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {



/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(53);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(15);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(57);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(15);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(14);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(5);
var aFunction = __webpack_require__(18);
var SPECIES = __webpack_require__(1)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var invoke = __webpack_require__(110);
var html = __webpack_require__(48);
var cel = __webpack_require__(24);
var global = __webpack_require__(0);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(14)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(38);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 判断对象类型
 * @param  {any} input    目标对象
 * @return {string}       目标对象的类型：'array', 'object', 'function', 'null', 'undefined', 'string', 'number','boolean'
 */
/* harmony default export */ __webpack_exports__["a"] = (function (input) {
  return {}.toString.call(input).slice(8, -1).toLowerCase();
});

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dom", function() { return Dom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tool", function() { return Tool; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefixStyle", function() { return prefixStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "absolutePosition", function() { return absolutePosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertionDom", function() { return assertionDom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyle", function() { return getStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getType", function() { return getType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasValue", function() { return hasValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "judge", function() { return judge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curring", function() { return curring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partial", function() { return partial; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__subscribe_Subscribe__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__session_Session__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LoazyLoading__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_Upload__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_index__ = __webpack_require__(117);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Upload", function() { return __WEBPACK_IMPORTED_MODULE_3__upload_Upload__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return __WEBPACK_IMPORTED_MODULE_4__util_index__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Subscribe", function() { return __WEBPACK_IMPORTED_MODULE_0__subscribe_Subscribe__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Session", function() { return __WEBPACK_IMPORTED_MODULE_1__session_Session__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LoazyLoading", function() { return __WEBPACK_IMPORTED_MODULE_2__LoazyLoading__["a"]; });





var _Util$Dom = __WEBPACK_IMPORTED_MODULE_4__util_index__["Dom"],
    hasClass = _Util$Dom.hasClass,
    getData = _Util$Dom.getData,
    addClass = _Util$Dom.addClass,
    prefixStyle = _Util$Dom.prefixStyle,
    absolutePosition = _Util$Dom.absolutePosition,
    assertionDom = _Util$Dom.assertionDom,
    getStyle = _Util$Dom.getStyle;

var wePlugins = {
  Subscribe: __WEBPACK_IMPORTED_MODULE_0__subscribe_Subscribe__["a" /* default */],
  Upload: __WEBPACK_IMPORTED_MODULE_3__upload_Upload__["a" /* default */],
  Session: __WEBPACK_IMPORTED_MODULE_1__session_Session__["a" /* default */],
  Util: __WEBPACK_IMPORTED_MODULE_4__util_index__
};
var URL = __WEBPACK_IMPORTED_MODULE_4__util_index__["URL"];
var _Util$Tool = __WEBPACK_IMPORTED_MODULE_4__util_index__["Tool"],
    getType = _Util$Tool.getType,
    hasValue = _Util$Tool.hasValue,
    random = _Util$Tool.random,
    merge = _Util$Tool.merge,
    judge = _Util$Tool.judge;
var _Util$partial = __WEBPACK_IMPORTED_MODULE_4__util_index__["partial"],
    debounce = _Util$partial.debounce,
    throttle = _Util$partial.throttle,
    curring = _Util$partial.curring;

var partial = __WEBPACK_IMPORTED_MODULE_4__util_index__["partial"];
var Dom = __WEBPACK_IMPORTED_MODULE_4__util_index__["Dom"],
    Tool = __WEBPACK_IMPORTED_MODULE_4__util_index__["Tool"];


window.wePlugins = wePlugins;
/* harmony default export */ __webpack_exports__["default"] = (wePlugins);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(3).f });


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);




var Session = function () {
  function Session() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Session);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Session, null, [{
    key: 'saveItem',
    value: function saveItem(key, value) {
      window[this.Storage].setItem(key, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(value));
    }
  }, {
    key: 'getItem',
    value: function getItem(key) {
      var value = window[this.Storage].getItem(key);
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
  }, {
    key: 'removeItem',
    value: function removeItem(key) {
      window[this.Storage].removeItem(key);
    }
  }, {
    key: 'clear',
    value: function clear() {
      window[this.Storage].clear();
    }
  }, {
    key: 'getProp',
    value: function getProp(key, prop) {
      var value = this.getItem(key);
      if (value) return value[prop];
      return null;
    }
  }, {
    key: 'initStorage',
    value: function initStorage(Storage) {
      this.Storage = Storage;
    }
  }, {
    key: 'install',
    value: function install(Vue) {
      var Storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'sessionStorage';

      Session.initStorage(Storage);
      Vue.prototype.$storage = Session;
    }
  }]);

  return Session;
}();

Session.Storage = 'sessionStorage';
/* harmony default export */ __webpack_exports__["a"] = (Session);

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libraries_util_dom__ = __webpack_require__(43);






var LoazyLoading = function () {
  function LoazyLoading(config) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, LoazyLoading);

    var base = {
      attr: "data-src",
      offSet: 0,
      container: window,
      loadingImg: '',
      on: function on() {}
    };
    this.config = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, base, config);
    this.cacheList = [];
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(LoazyLoading, [{
    key: 'init',
    value: function init() {
      var el = this.config.container;
      var body = document.body;
      var w = window;
      if (this.config.container === w) {
        this.container = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          width: w.innerWidth ? w.innerWidth : body.clientWidth,
          height: w.innerHeight ? w.innerHeight : body.clientHeight
        }, Object(__WEBPACK_IMPORTED_MODULE_4__libraries_util_dom__["absolutePosition"])(body));
      } else {
        this.container = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          width: el.clientWidth,
          height: el.clientHeight
        }, Object(__WEBPACK_IMPORTED_MODULE_4__libraries_util_dom__["absolutePosition"])(el));
      }
      this.initCachList();
      this.loading();
    }
  }, {
    key: 'initCachList',
    value: function initCachList() {
      var _this = this;

      if (document) {
        var lazyList = Array.prototype.slice.call(document.querySelectorAll('[' + this.config.attr + ']'), 0);

        lazyList.forEach(function (item) {
          var node = item.nodeName.toLowerCase();
          var url = Object(__WEBPACK_IMPORTED_MODULE_4__libraries_util_dom__["getData"])(item, 'src');
          var list = {
            el: item,
            tag: node,
            url: url
          };
          if (item.offsetWidth > 0 && item.offsetHeight > 0) {
            var _absolutePosition = Object(__WEBPACK_IMPORTED_MODULE_4__libraries_util_dom__["absolutePosition"])(item),
                top = _absolutePosition.top,
                left = _absolutePosition.left;

            list.top = top;
            list.left = left;
          }
          _this.cacheList.push(list);
          if (_this.config.loadingImg) {
            _this.addUrl(list, _this.config.loadingImg);
          }
        });
      } else {
        console.warn('没有要延迟加载的元素');
      }
    }
  }, {
    key: 'addUrl',
    value: function addUrl(item, url) {
      if (item.tag === 'img') {
        item.el.src = url;
      } else {
        item.el.style.backgroundImage = 'url(' + url + ')';
      }
    }
  }, {
    key: 'loading',
    value: function loading() {
      if (this.cacheList.length === 0) {
        this.config.container.removeEventListener('scroll', this.loading, false);
      } else {
        var len = this.cacheList.length - 1;
        var config = this.config;
        var container = this.config.container === window ? document.documentElement : this.config.container;
        for (var i = len; i > -1; i--) {
          var item = this.cacheList[i];
          var posTop = void 0;
          var posLeft = void 0;
          if (item.top) {
            posTop = item.top;
            posLeft = item.left;
          } else {
            var _absolutePosition2 = Object(__WEBPACK_IMPORTED_MODULE_4__libraries_util_dom__["absolutePosition"])(item.el),
                top = _absolutePosition2.top,
                left = _absolutePosition2.left;

            posTop = top;
            posLeft = left;
          }

          var scrollTop = container.scrollTop;
          var scrollLeft = container.scrollLeft;

          var url = item.url;

          if (posTop <= scrollTop + config.offSet + this.container.height && posLeft < scrollLeft + config.offSet + this.container.width) {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__libraries_util_dom__["getStyle"])(item.el, 'display') !== 'none' && Object(__WEBPACK_IMPORTED_MODULE_4__libraries_util_dom__["getStyle"])(item.el, 'visibility') !== 'hidden' && url) {
              this.addUrl(item, url);
            }
            if (item.on) item.on.apply(null, [item, i]);

            if (i < 0) {
              this.cacheList = [];
              return;
            } else {
              this.cacheList.splice(i, 1);
              len = len - 1;
            }
          }
        }
      }
    }
  }, {
    key: 'addEvent',
    value: function addEvent() {
      this.config.container.addEventListener("scroll", this.loading.bind(this), false);
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.config.container.removeEventListener("scroll", this.loading, false);
      this.cacheList = [];
    }
  }]);

  return LoazyLoading;
}();

/* harmony default export */ __webpack_exports__["a"] = (LoazyLoading);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(26);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(76) });


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(33);
var pIE = __webpack_require__(21);
var toObject = __webpack_require__(34);
var IObject = __webpack_require__(42);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(12)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(28);
var toAbsoluteIndex = __webpack_require__(78);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
__webpack_require__(49);
module.exports = __webpack_require__(36).f('iterator');


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(29);
var defined = __webpack_require__(27);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(47);
var descriptor = __webpack_require__(13);
var setToStringTag = __webpack_require__(23);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(3);
var anObject = __webpack_require__(5);
var getKeys = __webpack_require__(19);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9);
var toObject = __webpack_require__(34);
var IE_PROTO = __webpack_require__(30)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(86);
var step = __webpack_require__(87);
var Iterators = __webpack_require__(15);
var toIObject = __webpack_require__(10);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(45)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
__webpack_require__(51);
__webpack_require__(96);
__webpack_require__(97);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(46);
var META = __webpack_require__(91).KEY;
var $fails = __webpack_require__(12);
var shared = __webpack_require__(31);
var setToStringTag = __webpack_require__(23);
var uid = __webpack_require__(20);
var wks = __webpack_require__(1);
var wksExt = __webpack_require__(36);
var wksDefine = __webpack_require__(37);
var enumKeys = __webpack_require__(92);
var isArray = __webpack_require__(93);
var anObject = __webpack_require__(5);
var isObject = __webpack_require__(8);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(25);
var createDesc = __webpack_require__(13);
var _create = __webpack_require__(47);
var gOPNExt = __webpack_require__(94);
var $GOPD = __webpack_require__(95);
var $DP = __webpack_require__(3);
var $keys = __webpack_require__(19);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(50).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(21).f = $propertyIsEnumerable;
  __webpack_require__(33).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(22)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(7)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(20)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(9);
var setDesc = __webpack_require__(3).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(12)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(33);
var pIE = __webpack_require__(21);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(14);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(10);
var gOPN = __webpack_require__(50).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(21);
var createDesc = __webpack_require__(13);
var toIObject = __webpack_require__(10);
var toPrimitive = __webpack_require__(25);
var has = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(40);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('asyncIterator');


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37)('observable');


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__exif__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__subscribe_Subscribe__ = __webpack_require__(39);









function packingAsync(context) {
  return new __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    if (!context['onload']) {
      context['onload'] = function () {
        resolve(context);
      };
      context['onerror'] = function (e) {
        resolve(reject);
      };
    }
  });
}

var Upload = function () {
  function Upload(file, _ref) {
    var name = _ref.name,
        options = _ref.options;

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, Upload);

    this.file = file;
    this.initInfo();
    this.name = name;
    this.options = options;
    this.subscribe = new __WEBPACK_IMPORTED_MODULE_8__subscribe_Subscribe__["a" /* default */]();
  }

  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_createClass___default()(Upload, [{
    key: 'on',
    value: function on() {
      var _subscribe;

      (_subscribe = this.subscribe).on.apply(_subscribe, arguments);
    }
  }, {
    key: 'off',
    value: function off() {
      var _subscribe2;

      (_subscribe2 = this.subscribe).off.apply(_subscribe2, arguments);
    }
  }, {
    key: 'emit',
    value: function emit() {
      var _subscribe3;

      return (_subscribe3 = this.subscribe).emit.apply(_subscribe3, arguments);
    }
  }, {
    key: 'validationType',
    value: function validationType() {
      //TODO
      var reg = new RegExp('.(' + this.options.type + ')$');
      return reg.test(this.file);
    }
  }, {
    key: 'initInfo',
    value: function initInfo() {
      this.info = this.setFileInfo(this.file);
      this.file.fontSize = this.info.fontSize = this.getFileSizeDesc(this.file.size);
    }
  }, {
    key: 'setFileInfo',
    value: function setFileInfo(file) {

      if (this.validationFile(file)) {
        var type = file.type,
            size = file.size,
            name = file.name,
            lastModified = file.lastModified,
            lastModifiedDate = file.lastModifiedDate,
            webkitRelativePath = file.webkitRelativePath;

        return {
          type: type,
          size: size,
          name: name,
          status: 'beforeUpload',
          lastModified: lastModified,
          lastModifiedDate: lastModifiedDate,
          webkitRelativePath: webkitRelativePath
        };
      }
    }
  }, {
    key: 'validationFile',
    value: function validationFile(file) {
      if (file instanceof File) return true;
      return false;
    }
  }, {
    key: 'send',
    value: function () {
      var _ref2 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee() {
        var result;
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sendFile(this.file, this.info);

              case 2:
                result = _context.sent;
                return _context.abrupt('return', result);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function send() {
        return _ref2.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: 'getFileSizeDesc',
    value: function getFileSizeDesc(fileSize) {
      return fileSize / 1024 > 1024 ? ~~(10 * fileSize / 1024 / 1024) / 10 + 'MB' : ~~(fileSize / 1024) + 'kb';
    }
  }, {
    key: 'base64ToBlob',
    value: function base64ToBlob(base64, type) {
      var binary = atob(base64.split(',')[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], { type: type });
    }
  }, {
    key: 'base64',
    value: function () {
      var _ref3 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee2(fn, image) {
        var reader;
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!window.FileReader) {
                  _context2.next = 9;
                  break;
                }

                reader = new FileReader();

                fn.call(this);
                reader.readAsDataURL(this.file);
                _context2.next = 6;
                return packingAsync(reader);

              case 6:
                return _context2.abrupt('return', reader.result);

              case 9:
                if (navigator.appName === 'Microsoft Internet Explorer' && image) {
                  image.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)';
                  image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = this.file;
                }

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function base64(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return base64;
    }()
  }, {
    key: 'sendFile',
    value: function () {
      var _ref4 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee3(file, info) {
        var _this = this,
            _arguments = arguments;

        var arg,
            xhr,
            form,
            base64,
            blob,
            key,
            result,
            _args3 = arguments;
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.info(file);
                arg = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(_args3);
                xhr = this.createdAjax();
                form = new FormData(); // FormData 对象

                if (!(this.options.compressOptions && this.vailDateIMG(this.file.name) && this.file.size > 1024 * 1024)) {
                  _context3.next = 17;
                  break;
                }

                this.emit.apply(this, ['beforeCompress'].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(arg)));
                this.file.status = this.info.status = 'beforeCompress';
                _context3.next = 9;
                return this.compress();

              case 9:
                base64 = _context3.sent;

                this.file.status = this.info.status = 'compressSuccess';
                this.emit('compressSuccess', base64, this.info);
                this.file.fontSize = this.info.fontSize = this.getFileSizeDesc(base64.length);
                blob = this.base64ToBlob(base64, 'image/jpeg');

                form.append(this.name, blob, this.name + '.jpeg');
                _context3.next = 18;
                break;

              case 17:
                form.append(this.name, file); // 文件对象

              case 18:
                xhr.open("post", this.options.url, true);
                // xhr.setRequestHeader("Content-Type", "multipart/form-data");
                if (this.options.headers) {
                  for (key in this.options.headers) {
                    xhr.setRequestHeader(key, this.options.headers[key]);
                  }
                }
                result = true;

                xhr.upload.onloadstart = function () {
                  result = _this.emit.apply(_this, ['beforeUpload'].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(arg)));
                  if (!result) {
                    xhr.abort();
                    info.status = file.status = 'cancel';
                  }
                };
                if (xhr.upload) {
                  xhr.upload.onprogress = function (e) {
                    _this.emit('progress', e, _this.info, _arguments);
                  };
                }
                xhr.send(form);
                return _context3.abrupt('return', new __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
                  xhr.onreadystatechange = function () {

                    // 这步为判断服务器是否正确响应
                    if (xhr.readyState == 4 && xhr.status == 200) {
                      _this.emit('success', xhr.responseText);
                      file.status = info.status = 'success';
                      resolve(xhr.responseText, _this.info);
                    } else {
                      console.info(xhr.status);
                      _this.emit('error', _this.info, xhr.status);
                      file.status = info.status = 'error';
                      reject(xhr, _this.info, xhr.status);
                    }
                  };
                }).catch(function () {}));

              case 25:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendFile(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return sendFile;
    }()
  }, {
    key: 'vailDateIMG',
    value: function vailDateIMG(file) {
      var reg = new RegExp('.+(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$');
      return reg.test(file);
    }
  }, {
    key: 'createdAjax',
    value: function createdAjax() {
      if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      }
    }
  }, {
    key: 'compress',
    value: function () {
      var _ref5 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee4() {
        var compressOptions, Orientation, image, base64, imgWidth, imgHeight, maxWidth, maxHeight, canvas, ctx;
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                compressOptions = this.options.compressOptions || {};
                Orientation = null;
                image = new Image();
                _context4.next = 5;
                return this.base64(function () {
                  __WEBPACK_IMPORTED_MODULE_7__exif__["a" /* default */].getData(this.file, function () {
                    Orientation = __WEBPACK_IMPORTED_MODULE_7__exif__["a" /* default */].getTag(this, 'Orientation');
                  });
                }, image);

              case 5:
                base64 = _context4.sent;

                image.src = base64;
                _context4.next = 9;
                return packingAsync(image);

              case 9:
                imgWidth = image.width;
                imgHeight = image.height;
                maxWidth = compressOptions.maxWidth || 1920;
                maxHeight = compressOptions.maxHeight || 1080;

                if (imgWidth > imgHeight && imgWidth > maxWidth) {
                  imgWidth = maxWidth;
                  imgHeight = Math.ceil(maxWidth * image.height / image.width);
                } else if (imgWidth < imgHeight && imgHeight > maxHeight) {
                  imgWidth = Math.ceil(maxHeight * image.width / image.height);
                  imgHeight = maxHeight;
                }
                canvas = document.createElement("canvas");
                ctx = canvas.getContext('2d');

                ctx.fillStyle = '#fff';
                canvas.width = imgWidth;
                canvas.height = imgHeight;

                if (!(Orientation && Orientation != 1)) {
                  _context4.next = 38;
                  break;
                }

                _context4.t0 = Orientation;
                _context4.next = _context4.t0 === 6 ? 23 : _context4.t0 === 3 ? 28 : _context4.t0 === 8 ? 31 : 36;
                break;

              case 23:
                // 旋转90度
                canvas.width = imgHeight;
                canvas.height = imgWidth;
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(image, 0, -imgHeight, imgWidth, imgHeight);
                return _context4.abrupt('break', 36);

              case 28:
                // 旋转180度
                ctx.rotate(Math.PI);
                ctx.drawImage(image, -imgWidth, -imgHeight, imgWidth, imgHeight);
                return _context4.abrupt('break', 36);

              case 31:
                // 旋转-90度
                canvas.width = imgHeight;
                canvas.height = imgWidth;
                ctx.rotate(3 * Math.PI / 2);
                ctx.drawImage(image, -imgWidth, 0, imgWidth, imgHeight);
                return _context4.abrupt('break', 36);

              case 36:
                _context4.next = 40;
                break;

              case 38:
                ctx.clearRect(0, 0, imgWidth, imgHeight);
                this.ratio(image, canvas, ctx);

              case 40:
                return _context4.abrupt('return', canvas.toDataURL("image/jpeg", compressOptions.quality || 0.8));

              case 41:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function compress() {
        return _ref5.apply(this, arguments);
      }

      return compress;
    }()
  }, {
    key: 'initWidthHeigt',
    value: function initWidthHeigt(image) {
      var compressOptions = this.options.compressOptions || {};
      var maxWidth = compressOptions.maxWidth;
      var maxHeight = compressOptions.maxHeight;
      if (maxWidth && maxHeight) {
        return {
          width: maxWidth,
          height: maxHeight
        };
      } else {
        var imgWidth = maxWidth ? maxWidth : image.width;
        var imgHeight = maxHeight ? maxHeight : image.height;
        if (imgWidth > imgHeight && imgWidth > maxWidth) {
          imgWidth = maxWidth;
          imgHeight = Math.ceil(maxWidth * image.height / image.width);
        } else if (imgWidth < imgHeight && imgHeight > maxHeight) {
          imgWidth = Math.ceil(maxHeight * image.width / image.height);
          imgHeight = maxHeight;
        }
        return {
          width: imgWidth,
          height: imgHeight
        };
      }
    }
  }, {
    key: 'ratio',
    value: function () {
      var _ref6 = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee5(image, canvas, ctx, w, h) {
        var width, height, _width, _height, result, ratio, tCanvas, tctx, count, tileWidth, tileHeight, i, j;

        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                width = void 0, height = void 0;

                if (w & h) {
                  _width = w;
                  _height = h;
                } else {
                  result = this.initWidthHeigt(image);

                  width = result.width;
                  height = result.height;
                }
                ratio = void 0;

                if ((ratio = width * height / 4000000) > 1) {
                  ratio = Math.sqrt(ratio);
                  width /= ratio;
                  height /= ratio;
                } else {
                  ratio = 1;
                }
                tCanvas = document.createElement("canvas");
                tctx = tCanvas.getContext('2d');

                canvas.width = width;
                canvas.height = height;
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, width, height);
                count = void 0;

                if ((count = width * height / 3000000) > 1) {
                  count = ~~(Math.sqrt(count) + 1);
                  tileWidth = ~~(width / count);
                  tileHeight = ~~(height / count);

                  tCanvas.width = tileWidth;
                  tCanvas.height = tileHeight;
                  for (i = 0; i < count; i++) {
                    for (j = 0; j < count; j++) {
                      tctx.drawImage(image, i * tileWidth * ratio, j * tileHeight * ratio, tileWidth * ratio, tileHeight * ratio, 0, 0, tileWidth, tileHeight);
                      ctx.drawImage(tCanvas, i * tileWidth, j * tileHeight, tileWidth, tileHeight);
                    }
                  }
                } else {
                  ctx.drawImage(image, 0, 0, width, height);
                }

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function ratio(_x5, _x6, _x7, _x8, _x9) {
        return _ref6.apply(this, arguments);
      }

      return ratio;
    }()

    // async ratio(image,ctx,width,height){
    //   let count = width * height / 1000000;
    //   let tCanvas = document.createElement("canvas")
    //   let tctx = tCanvas.getContext('2d');
    //   if(count>1){
    //     count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片
    //     let nw = ~~(width / count);
    //     let nh = ~~(height / count);
    //      tCanvas.width = nw;
    //      tCanvas.height = nh;
    //     for (let i = 0; i < count; i++) {
    //       for (let j = 0; j < count; j++) {
    //         tctx.drawImage(image, i * nw * count, j * nh * count, nw * count, nh * count, 0, 0, nw, nh);
    //         ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
    //       }
    //     }
    //   }else{
    //     ctx.drawImage(image, 0, 0, width, height);
    //   }
    // }

  }]);

  return Upload;
}();

/* harmony default export */ __webpack_exports__["a"] = (Upload);

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
__webpack_require__(100);
module.exports = __webpack_require__(2).Array.from;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(11);
var $export = __webpack_require__(4);
var toObject = __webpack_require__(34);
var call = __webpack_require__(54);
var isArrayIter = __webpack_require__(55);
var toLength = __webpack_require__(28);
var createProperty = __webpack_require__(101);
var getIterFn = __webpack_require__(56);

$export($export.S + $export.F * !__webpack_require__(58)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(3);
var createDesc = __webpack_require__(13);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(103);


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(104);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(59);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
__webpack_require__(35);
__webpack_require__(49);
__webpack_require__(107);
__webpack_require__(114);
__webpack_require__(115);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var global = __webpack_require__(0);
var ctx = __webpack_require__(11);
var classof = __webpack_require__(57);
var $export = __webpack_require__(4);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(18);
var anInstance = __webpack_require__(108);
var forOf = __webpack_require__(109);
var speciesConstructor = __webpack_require__(60);
var task = __webpack_require__(61).set;
var microtask = __webpack_require__(111)();
var newPromiseCapabilityModule = __webpack_require__(38);
var perform = __webpack_require__(62);
var promiseResolve = __webpack_require__(63);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(1)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(112)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(23)($Promise, PROMISE);
__webpack_require__(113)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(58)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var call = __webpack_require__(54);
var isArrayIter = __webpack_require__(55);
var anObject = __webpack_require__(5);
var toLength = __webpack_require__(28);
var getIterFn = __webpack_require__(56);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 110 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(61).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(14)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(7);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var core = __webpack_require__(2);
var dP = __webpack_require__(3);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(1)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(4);
var core = __webpack_require__(2);
var global = __webpack_require__(0);
var speciesConstructor = __webpack_require__(60);
var promiseResolve = __webpack_require__(63);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(38);
var perform = __webpack_require__(62);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var EXIF = {};
var TiffTags = EXIF.TiffTags = {
  0x0112: "Orientation"
};

function imageHasData(img) {
  return !!img.exifdata;
}

function getImageData(img, callback) {
  function handleBinaryFile(binFile) {
    var data = findEXIFinJPEG(binFile);
    img.exifdata = data || {};
    if (callback) {
      callback.call(img);
    }
  }

  if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
      handleBinaryFile(e.target.result);
    };
    fileReader.readAsArrayBuffer(img);
  }
}

function findEXIFinJPEG(file) {
  var dataView = new DataView(file);

  if (dataView.getUint8(0) != 0xFF || dataView.getUint8(1) != 0xD8) {
    return false; // not a valid jpeg
  }

  var offset = 2,
      length = file.byteLength,
      marker;

  while (offset < length) {
    if (dataView.getUint8(offset) != 0xFF) {
      return false; // not a valid marker, something is wrong
    }

    marker = dataView.getUint8(offset + 1);

    if (marker == 225) {
      return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);
    } else {
      offset += 2 + dataView.getUint16(offset + 2);
    }
  }
}

function readTags(file, tiffStart, dirStart, strings, bigEnd) {
  var entries = file.getUint16(dirStart, !bigEnd),
      tags = {},
      entryOffset,
      tag,
      i;

  for (i = 0; i < entries; i++) {
    entryOffset = dirStart + i * 12 + 2;
    tag = strings[file.getUint16(entryOffset, !bigEnd)];
    tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
  }
  return tags;
}

function readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd) {
  var type = file.getUint16(entryOffset + 2, !bigEnd),
      numValues = file.getUint32(entryOffset + 4, !bigEnd),
      valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart,
      offset,
      vals,
      val,
      n,
      numerator,
      denominator;
  switch (type) {
    case 1: // byte, 8-bit unsigned int
    case 7:
      // undefined, 8-bit byte, value depending on field
      if (numValues == 1) {
        return file.getUint8(entryOffset + 8, !bigEnd);
      } else {
        offset = numValues > 4 ? valueOffset : entryOffset + 8;
        vals = [];
        for (n = 0; n < numValues; n++) {
          vals[n] = file.getUint8(offset + n);
        }
        return vals;
      }

    case 2:
      // ascii, 8-bit byte
      offset = numValues > 4 ? valueOffset : entryOffset + 8;
      return getStringFromDB(file, offset, numValues - 1);

    case 3:
      // short, 16 bit int
      if (numValues == 1) {
        return file.getUint16(entryOffset + 8, !bigEnd);
      } else {
        offset = numValues > 2 ? valueOffset : entryOffset + 8;
        vals = [];
        for (n = 0; n < numValues; n++) {
          vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
        }
        return vals;
      }

    case 4:
      // long, 32 bit int
      if (numValues == 1) {
        return file.getUint32(entryOffset + 8, !bigEnd);
      } else {
        vals = [];
        for (n = 0; n < numValues; n++) {
          vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
        }
        return vals;
      }

    case 5:
      // rational = two long values, first is numerator, second is denominator
      if (numValues == 1) {
        numerator = file.getUint32(valueOffset, !bigEnd);
        denominator = file.getUint32(valueOffset + 4, !bigEnd);
        val = new Number(numerator / denominator);
        val.numerator = numerator;
        val.denominator = denominator;
        return val;
      } else {
        vals = [];
        for (n = 0; n < numValues; n++) {
          numerator = file.getUint32(valueOffset + 8 * n, !bigEnd);
          denominator = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
          vals[n] = new Number(numerator / denominator);
          vals[n].numerator = numerator;
          vals[n].denominator = denominator;
        }
        return vals;
      }

    case 9:
      // slong, 32 bit signed int
      if (numValues == 1) {
        return file.getInt32(entryOffset + 8, !bigEnd);
      } else {
        vals = [];
        for (n = 0; n < numValues; n++) {
          vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd);
        }
        return vals;
      }

    case 10:
      // signed rational, two slongs, first is numerator, second is denominator
      if (numValues == 1) {
        return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset + 4, !bigEnd);
      } else {
        vals = [];
        for (n = 0; n < numValues; n++) {
          vals[n] = file.getInt32(valueOffset + 8 * n, !bigEnd) / file.getInt32(valueOffset + 4 + 8 * n, !bigEnd);
        }
        return vals;
      }
  }
}

function getStringFromDB(buffer, start, length) {
  var outstr = "";
  var n = 0;
  for (n = start; n < start + length; n++) {
    outstr += String.fromCharCode(buffer.getUint8(n));
  }
  return outstr;
}

function readEXIFData(file, start) {
  if (getStringFromDB(file, start, 4) != "Exif") {
    return false;
  }

  var bigEnd,
      tags,
      tag,
      exifData,
      gpsData,
      tiffOffset = start + 6;

  // test for TIFF validity and endianness
  if (file.getUint16(tiffOffset) == 0x4949) {
    bigEnd = false;
  } else if (file.getUint16(tiffOffset) == 0x4D4D) {
    bigEnd = true;
  } else {
    return false;
  }

  if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002A) {
    return false;
  }

  var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);
  if (firstIFDOffset < 0x00000008) {
    return false;
  }

  tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

  return tags;
}

EXIF.getData = function (img, callback) {
  if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete) return false;

  if (!imageHasData(img)) {
    getImageData(img, callback);
  } else {
    if (callback) {
      callback.call(img);
    }
  }
  return true;
};

EXIF.getTag = function (img, tag) {
  if (!imageHasData(img)) return;
  return img.exifdata[tag];
};
/* harmony default export */ __webpack_exports__["a"] = (EXIF);

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__url__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tool__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__partial__ = __webpack_require__(124);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Dom", function() { return __WEBPACK_IMPORTED_MODULE_0__dom__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return __WEBPACK_IMPORTED_MODULE_1__url__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Tool", function() { return __WEBPACK_IMPORTED_MODULE_2__tool__; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "partial", function() { return __WEBPACK_IMPORTED_MODULE_3__partial__; });






/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var URL = {
  // 当前页面路径
  href: window.location.href,
  // 当前页面查询字符串
  search: window.location.search,
  // 查询URL传递的参数值
  query: function query(key) {
    var reg = new RegExp('(^|&|\\?|#)' + key + '=([^&]*)(&|\x24)', '');
    var match = this.search.substr(1).match(reg);
    if (match) {
      return match[2];
    }
    return '';
  }
};
/* harmony default export */ __webpack_exports__["a"] = (URL);

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hasValue__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getType__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__merge__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detection_browser__ = __webpack_require__(122);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "hasValue", function() { return __WEBPACK_IMPORTED_MODULE_0__hasValue__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getType", function() { return __WEBPACK_IMPORTED_MODULE_1__getType__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return __WEBPACK_IMPORTED_MODULE_2__merge__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "judge", function() { return __WEBPACK_IMPORTED_MODULE_3__detection_browser__; });




/**
 * 返回一个随机数
 * @param n number
 * @param m number
 * @returns {number}
 */
function random(n, m) {
  if (isNaN(n) || isNaN(m)) {
    return Math.random();
  }
  return Math.round(Math.random() * (m - n) + n);
}


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 判断变量是否有值
 * - 空字符串、null、undefined视作无值
 * - 全部都是空格或者诸如tab的话作为无值看待
 * - 0视为有值
 * @param  {any} val     待判断的变量
 * @return {boolean}     是否有值
 */
/* harmony default export */ __webpack_exports__["a"] = (function (val) {
  return val != '' && val !== null && val !== undefined && !/^\s+$/.test(val);
});

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getType_js__ = __webpack_require__(64);





var type = ['string', 'number', 'boolean', 'null', 'undefined'];

function extend(deep, target) {
  target = target || {};

  for (var _len = arguments.length, arg = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    arg[_key - 2] = arguments[_key];
  }

  if (!deep) return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_assign___default.a.apply(Object, [target].concat(arg));else {
    var source = arg ? arg[0] : null;
    for (var name in source) {
      var item = source[name];
      if ((typeof item === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(item)) === "object") {
        if (Object(__WEBPACK_IMPORTED_MODULE_3__getType_js__["a" /* default */])(item) === 'date') {
          target[name] = new Date(item.valueOf());
        } else if (Object(__WEBPACK_IMPORTED_MODULE_3__getType_js__["a" /* default */])(item) === 'regexp') {
          var pattern = item.valueOf();
          var flags = '';
          flags += pattern.global ? 'g' : '';
          flags += pattern.ignoreCase ? 'i' : '';
          flags += pattern.multiline ? 'm' : '';
          target[name] = new RegExp(pattern.source, flags);
        } else {
          if (!target[name] || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_typeof___default()(target[name]) !== "object") {
            target[name] = item.constructor === Array ? [] : {};
          }

          extend(true, target[name], item);
        }
      } else {
        target[name] = source[name];
      }
    }
    return target;
  }
}

function oneLength(firstType, obj) {
  var sourceType = Object(__WEBPACK_IMPORTED_MODULE_3__getType_js__["a" /* default */])(obj);
  if (type.includes(sourceType)) {
    return obj;
  } else {
    var target = void 0;
    var source = void 0;
    if (sourceType === 'object') {
      target = {};
    } else if (sourceType === 'array') {
      target = [];
    }
    source = obj;
    return extend(true, target, source);
  }
}

/**
 * @author zhangmin
 * @param[0] 任何值，当只有一个参数时这返回这个参数，当参数大于1是这个值如果是boolean这标明是不是深拷贝
 * @params 把后面的多个对象合并到第二个对象中（第一个参数为占位，标明是不是深拷贝，如果第一个不是boolean这默认调用Object.assign）
 * @returns {any} 返回新的合并后对象
 */
function merge() {
  var target = void 0;
  var source = void 0;

  for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    arg[_key2] = arguments[_key2];
  }

  if (arg.length === 0) return;
  //只传一个值，强制认为是深拷贝
  if (arg.length > 0) {
    var firstType = Object(__WEBPACK_IMPORTED_MODULE_3__getType_js__["a" /* default */])(arg[0]);
    if (arg.length === 1) {
      return oneLength(firstType, arg[0]);
    } else if (arg.length === 2 && firstType === 'boolean') {
      return oneLength(firstType, arg[1]);
    } else {
      if (firstType === 'boolean') {
        target = arg[1];
        source = arg.slice(2);
        if (arg[0] === true) {
          source.forEach(function (item) {
            target = extend(true, target, item);
          });
          return target;
        }
        return extend.apply(undefined, [false, target].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(source)));
      } else {
        target = arg[0];
        source = arg.slice(1);
        extend.apply(undefined, [false, target].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(source)));
        return target;
      }
    }
  }
}

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userAgent", function() { return userAgent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBrowser", function() { return isBrowser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isClient", function() { return isClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIE", function() { return isIE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOpera", function() { return isOpera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebKit", function() { return isWebKit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFirefox", function() { return isFirefox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIos", function() { return isIos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAndroid", function() { return isAndroid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIphone", function() { return isIphone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIpad", function() { return isIpad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWx", function() { return isWx; });
var userAgent = navigator.userAgent;

var isBrowser = typeof window !== 'undefined';
var isClient = typeof global !== 'undefined';
var isIE = userAgent.indexOf("MSIE") > -1;
var isOpera = userAgent.indexOf('Presto') > -1;
var isWebKit = userAgent.indexOf('AppleWebKit') > -1;
var isFirefox = userAgent.indexOf('Gecko') > -1 && userAgent.indexOf('KHTML');
var isMobile = !!userAgent.match(/AppleWebKit.*Mobile.*/);
var isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;
var isIphone = userAgent.indexOf('iPhone') > -1;
var isIpad = userAgent.indexOf('iPad') > -1;
var isWx = userAgent.indexOf('MicroMessenger') > -1;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(123)))

/***/ }),
/* 123 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["debounce"] = debounce;
/* harmony export (immutable) */ __webpack_exports__["throttle"] = throttle;
/* harmony export (immutable) */ __webpack_exports__["curring"] = curring;
/**
 * 函数防抖
 * @param fun Function
 * @param context Object 指针
 * @param delay Nubmer 延迟时间
 * @param immediate Boolean 第一次是否立即执行
 * @returns {Function}
 */
function debounce(fun, context) {
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var immediate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (typeof fun !== "function") {
    console.warn('传入的不是一个函数');
    return fun;
  }
  var time = null;
  return function () {
    var arg = [].call(arguments, 0);
    clearTimeout(time);
    time = setTimeout(function () {
      fun.apply(context, arg);
    }, delay);
  };
}

/**
 * 函数节流
 * @param fun Function
 * @param context Object 指针
 * @param interval Nubmer 时间间隔
 * @returns {Function}
 */
function throttle(fun, context) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;

  if (typeof fun !== "function") {
    console.warn('传入的不是一个函数');
    return fun;
  }
  var startTime = 0;
  var endTime = void 0;
  return function () {
    var arg = [].slice.call(arguments, 0);
    endTime = new Date().getTime();
    if (endTime - startTime > interval) {
      fun.apply(context, arg);
      startTime = endTime;
    }
  };
}

/***
 * 函数柯里化
 * @param fun Function
 * @param context Object 指针
 * @returns {Function}
 */
function curring(fun, context) {
  if (typeof fun !== "function") {
    console.warn('传入的不是一个函数');
    return fun;
  }
  var arg = [].slice.call(arguments, 1);
  return function () {
    var newArgs = arg.concat([].slice.call(arguments));
    return fun.apply(context, newArgs);
  };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=we-plugins.js.map