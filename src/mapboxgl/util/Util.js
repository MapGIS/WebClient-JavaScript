import { Zondy } from '../core/Base'

export var Util = (Zondy.Util = Zondy.Util || {})

/**
 * @description 复制源对象的所有属性到目标对象上，源对象上的没有定义的属性在目标对象上也不会被设置。
 * @example
 * 要复制Zondy.Size对象的所有属性到自定义对象上，使用方法如下:
 *     var size = new Zondy.Size(100, 100)
 *     var obj = {}；
 *     Zondy.Util.extend(obj, size)
 * @param destination - {Object} 目标对象。
 * @param source - {Object} 源对象，其属性将被设置到目标对象上。
 * @return {Object} 目标对象。
 */
export var extend = function(destination, source) {
  destination = destination || {}
  if (source) {
    for (var property in source) {
      var value = source[property]
      if (value !== undefined) {
        destination[property] = value
      }
    }

    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */

    /*
     * FF/Windows < 2.0.0.13 reports 'Illegal operation on WrappedNative
     * prototype object' when calling hawOwnProperty if the source object
     * is an instance of window.Event.
     */

    var sourceIsEvt =
      typeof window.Event === 'function' && source instanceof window.Event

    if (
      !sourceIsEvt &&
      source.hasOwnProperty &&
      source.hasOwnProperty('toString')
    ) {
      destination.toString = source.toString
    }
  }
  return destination
}

/**
 * @description 给url追加参数。
 * @param url - {string} 待追加参数的url字符串。
 * @param paramStr - {string} 待追加的参数。
 * @return {string} The new url
 */
export var appendUrl = function(url, paramStr) {
  var newUrl = url
  if (paramStr) {
    var parts = (url + ' ').split(/[?&]/)
    newUrl +=
      parts.pop() === ' ' //如果url是以?或者&结尾的直接追加参数
        ? paramStr
        : parts.length
        ? '&' + paramStr
        : '?' + paramStr
    //如果url不是以?或者&结尾的则根据是否有参数进行符号补充
  }
  return newUrl
}

/**
 * @description 复制源对象数组的所有属性到目标对象上，源对象数组的当前对象会重写前一个对象的值
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 * @param dest - {Object}  目标对象
 * @param sources -{Array} 源对象数据，每个对象都会给目的对象设置对应的属性值
 * @private
 */
export var extendFromArray = function(dest, sources) {
  for (const src of sources) {
    for (const k in src) {
      dest[k] = src[k]
    }
  }
  return dest
}

/**
 * @author 潘卓然ParnDeedlit 基础平台/创新中心
 * @description 判断字符串是否以特定后缀字符结束
 * @param string {String} 判断字符串
 * @param string {String} 尾部后缀
 * @private
 */
export var endsWith = function(string, suffix) {
  return string.indexOf(suffix, string.length - suffix.length) !== -1
}

// @function create(proto: Object, properties?: Object): Object
// Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
export var create =
  Object.create ||
  (function() {
    function F() {}
    return function(proto) {
      F.prototype = proto
      return new F()
    }
  })()

// @function bind(fn: Function, …): Function
// Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
// Has a `L.bind()` shortcut.
export function bind(fn, obj) {
  var slice = Array.prototype.slice

  if (fn.bind) {
    return fn.bind.apply(fn, slice.call(arguments, 1))
  }

  var args = slice.call(arguments, 2)

  return function() {
    return fn.apply(
      obj,
      args.length ? args.concat(slice.call(arguments)) : arguments
    )
  }
}

// @property lastId: Number
// Last unique ID used by [`stamp()`](#util-stamp)
export var lastId = 0

// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assigning it one if it doesn't have it.
export function stamp(obj) {
  /*eslint-disable */
  obj._leaflet_id = obj._leaflet_id || ++lastId
  return obj._leaflet_id
  /* eslint-enable */
}

// @function throttle(fn: Function, time: Number, context: Object): Function
// Returns a function which executes function `fn` with the given scope `context`
// (so that the `this` keyword refers to `context` inside `fn`'s code). The function
// `fn` will be called no more than one time per given amount of `time`. The arguments
// received by the bound function will be any arguments passed when binding the
// function, followed by any arguments passed when invoking the bound function.
// Has an `L.throttle` shortcut.
export function throttle(fn, time, context) {
  var lock, args, wrapperFn, later

  later = function() {
    // reset lock and call if queued
    lock = false
    if (args) {
      wrapperFn.apply(context, args)
      args = false
    }
  }

  wrapperFn = function() {
    if (lock) {
      // called too soon, queue to call later
      args = arguments
    } else {
      // call and lock until later
      fn.apply(context, arguments)
      setTimeout(later, time)
      lock = true
    }
  }

  return wrapperFn
}

// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
// Returns the number `num` modulo `range` in such a way so it lies within
// `range[0]` and `range[1]`. The returned value will be always smaller than
// `range[1]` unless `includeMax` is set to `true`.
export function wrapNum(x, range, includeMax) {
  var max = range[1],
    min = range[0],
    d = max - min
  return x === max && includeMax ? x : ((((x - min) % d) + d) % d) + min
}

// @function falseFn(): Function
// Returns a function which always returns `false`.
export function falseFn() {
  return false
}

// @function formatNum(num: Number, digits?: Number): Number
// Returns the number `num` rounded to `digits` decimals, or to 6 decimals by default.
export function formatNum(num, digits) {
  var pow = Math.pow(10, digits === undefined ? 6 : digits)
  return Math.round(num * pow) / pow
}

// @function trim(str: String): String
// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
export function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '')
}

// @function splitWords(str: String): String[]
// Trims and splits the string on whitespace and returns the array of parts.
export function splitWords(str) {
  return trim(str).split(/\s+/)
}

// @function setOptions(obj: Object, options: Object): Object
// Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
export function setOptions(obj, options) {
  if (!obj.hasOwnProperty('options')) {
    obj.options = obj.options ? create(obj.options) : {}
  }
  for (var i in options) {
    obj.options[i] = options[i]
  }
  return obj.options
}

// @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
// Converts an object into a parameter URL string, e.g. `{a: 'foo', b: 'bar'}`
// translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
// be appended at the end. If `uppercase` is `true`, the parameter names will
// be uppercased (e.g. `'?A=foo&B=bar'`)
export function getParamString(obj, existingUrl, uppercase) {
  var params = []
  for (var i in obj) {
    params.push(
      encodeURIComponent(uppercase ? i.toUpperCase() : i) +
        '=' +
        encodeURIComponent(obj[i])
    )
  }
  return (
    (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') +
    params.join('&')
  )
}

var templateRe = /\{ *([\w_-]+) *\}/g

// @function template(str: String, data: Object): String
// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
// `('Hello foo, bar')`. You can also specify functions instead of strings for
// data values — they will be evaluated passing `data` as an argument.
export function template(str, data) {
  return str.replace(templateRe, function(str, key) {
    var value = data[key]

    if (value === undefined) {
      throw new Error('No value provided for variable ' + str)
    } else if (typeof value === 'function') {
      value = value(data)
    }
    return value
  })
}

// @function isArray(obj): Boolean
// Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
export var isArray =
  Array.isArray ||
  function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
  }

// @function indexOf(array: Array, el: Object): Number
// Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
export function indexOf(array, el) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === el) {
      return i
    }
  }
  return -1
}

// @property emptyImageUrl: String
// Data URI string containing a base64-encoded empty GIF image.
// Used as a hack to free memory from unused images on WebKit-powered
// mobile devices (by setting image `src` to this string).
export var emptyImageUrl =
  'data:image/gifbase64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

function getPrefixed(name) {
  return window['webkit' + name] || window['moz' + name] || window['ms' + name]
}

var lastTime = 0

// fallback for IE 7-8
function timeoutDefer(fn) {
  var time = +new Date(),
    timeToCall = Math.max(0, 16 - (time - lastTime))

  lastTime = time + timeToCall
  return window.setTimeout(fn, timeToCall)
}

export var requestFn =
  window.requestAnimationFrame ||
  getPrefixed('RequestAnimationFrame') ||
  timeoutDefer
export var cancelFn =
  window.cancelAnimationFrame ||
  getPrefixed('CancelAnimationFrame') ||
  getPrefixed('CancelRequestAnimationFrame') ||
  function(id) {
    window.clearTimeout(id)
  }

// @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
// Schedules `fn` to be executed when the browser repaints. `fn` is bound to
// `context` if given. When `immediate` is set, `fn` is called immediately if
// the browser doesn't have native support for
// [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
// otherwise it's delayed. Returns a request ID that can be used to cancel the request.
export function requestAnimFrame(fn, context, immediate) {
  if (immediate && requestFn === timeoutDefer) {
    fn.call(context)
  } else {
    return requestFn.call(window, bind(fn, context))
  }
}

// @function cancelAnimFrame(id: Number): undefined
// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
export function cancelAnimFrame(id) {
  if (id) {
    cancelFn.call(window, id)
  }
}

Zondy.Util.extend = extend
Zondy.Util.appendUrl = appendUrl
Zondy.Util.endsWith = endsWith
Zondy.Util.extendFromArray = extendFromArray
