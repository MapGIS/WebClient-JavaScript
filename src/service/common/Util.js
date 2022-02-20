import {
    Zondy
} from './Base';

var extend = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                destination[property] = value;
            }
        }

        /**
         * IE doesn't include the toString property when iterating over an object's
         * properties with the for(property in object) syntax.  Explicitly check if
         * the source has its own toString property.
         */

        /*
         * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
         * prototype object" when calling hawOwnProperty if the source object
         * is an instance of window.Event.
         */

        var sourceIsEvt = typeof window.Event === "function" &&
            source instanceof window.Event;

        if (!sourceIsEvt &&
            source.hasOwnProperty && source.hasOwnProperty("toString")) {
            destination.toString = source.toString;
        }
    }
    return destination;
};

/*
 * @description 判断一个对象是否是数组。
 * @param a - {Object} 对象。
 * @return {boolean} 是否是数组。
 */
var isArray = function (a) {
    return (Object.prototype.toString.call(a) === '[object Array]');
};

var extendDeep = function (destination, source) {
    var i, toStr = Object.prototype.toString,
        astr = "[object Array]";
    destination = destination || {};
    for (i in source) {
        if (source.hasOwnProperty(i)) {
            if (typeof source[i] === "object") {
                if (toStr.call(destination[i]) === '[object Null]' || toStr.call(destination[i]) === '[object Undefined]') {
                    destination[i] = (toStr.call(source[i]) === astr) ? [] : {};
                }
                extendDeep(destination[i], source[i]);
            } else {
                destination[i] = source[i];
            }
            if(source[i]===''||source[i]===null){
                destination[i] = source[i];
            }
        }
    }
    return destination;
};

/*
 * @description 对象拷贝。
 * @param des - {Object} 目标对象。
 * @param soc - {Object} 源对象
 */
var copy = function (des, soc) {
    des = des || {};
    var v;
    if (soc) {
        for (var p in des) {
            v = soc[p];
            if (typeof v !== 'undefined') {
                des[p] = v;
            }
        }
    }
};

/*
 * @description 对象拷贝。
 * @param des - {Object} 目标对象。
 * @param soc - {Object} 源对象
 */
var copyExcluce = function (des, soc, exclude) {
    des = des || {};
    var v;
    if (soc) {
        for (var p in soc) {
            v = soc[p];
            if (typeof v !== 'undefined' && typeof v !== 'function') {
                if (exclude.indexOf(p) < 0) {
                    des[p] = v;
                }
            }
        }
    }
};

/*
 * @description 销毁对象，将其属性置空
 * @param obj - {Object} 目标对象。
 */
var reset = function (obj) {
    obj = obj || {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            if (typeof obj[p] === "object" && obj[p] instanceof Array) {
                for (var i in obj[p]) {
                    if (obj[p][i].destroy) {
                        obj[p][i].destroy();
                    }
                }
                obj[p].length = 0;
            } else if (typeof obj[p] === "object" && obj[p] instanceof Object) {
                if (obj[p].destroy) {
                    obj[p].destroy();
                }
            }
            obj[p] = null;
        }
    }
};

/*
 * @description 获取HTML元素数组。
 * @param argument - {String | HTMLElement | Window}
 * @return {Array<HTMLElement>} HTML元素数组。
 */
var getElement = function () {
    var elements = [];

    for (var i = 0, len = arguments.length; i < len; i++) {
        var element = arguments[i];
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length === 1) {
            return element;
        }
        elements.push(element);
    }
    return elements;
};

/*
 * @description instance of的跨浏览器实现。
 * @param o - {Object} 对象。
 * @return {boolean} 是否是页面元素
 */
var isElement = function (o) {
    return !!(o && o.nodeType === 1);
};




/*
 * @description 从数组中删除某一项。
 * @param array - {Array} 数组。
 * @param item - {Object} 数组中要删除的一项。
 * @return {Array} 执行删除操作后的数组。
 */
var removeItem = function (array, item) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === item) {
            array.splice(i, 1);
            //break;more than once??
        }
    }
    return array;
};

/*
 * @description 获取某对象再数组中的索引值。
 * @param array - {Array} 数组。
 * @param obj - {Object} 对象。
 * @return {number} 某对象再数组中的索引值。
 */
var indexOf = function (array, obj) {
    if (array == null) {
        return -1;
    } else {
        // use the build-in function if available.
        if (typeof array.indexOf === "function") {
            return array.indexOf(obj);
        } else {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }
};


/*
 * @description 修改某DOM元素的许多属性。
 * @param element - {HTMLElement} 待修改的DOM元素。
 * @param id - {string} DOM元素的id。
 * @param px - {Pixel} 包含DOM元素的style属性的left和top属性。
 * @param sz - {Size} 包含DOM元素的width和height属性。
 * @param position - {string} DOM元素的position属性。
 * @param border - {string} DOM元素的style属性的border属性。
 * @param overflow - {string} DOM元素的style属性的overflow属性。
 * @param opacity - {number} 不透明度值。取值范围为 (0.0 - 1.0)。
 */
var modifyDOMElement = function (element, id, px, sz, position,
    border, overflow, opacity) {

    if (id) {
        element.id = id;
    }
    if (px) {
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) === 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};


/*
 * @description Takes an object and copies any properties that don't exist from
 *     another properties
 *
 * @param to -{Object} The destination object.
 * @param from -{Object} The source object.  Any properties of this object that
 *     are undefined in the to object will be set on the to object.
 *
 * @return {Object} A reference to the to object.  Note that the to argument is modified
 *     in place and returned by this function.
 */
var applyDefaults = function (to, from) {
    to = to || {};
    /*
     * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
     * prototype object" when calling hawOwnProperty if the source object is an
     * instance of window.Event.
     */
    var fromIsEvt = typeof window.Event === "function" &&
        from instanceof window.Event;

    for (var key in from) {
        if (to[key] === undefined ||
            (!fromIsEvt && from.hasOwnProperty &&
                from.hasOwnProperty(key) && !to.hasOwnProperty(key))) {
            to[key] = from[key];
        }
    }
    /**
     * IE doesn't include the toString property when iterating over an object's
     * properties with the for(property in object) syntax.  Explicitly check if
     * the source has its own toString property.
     */
    if (!fromIsEvt && from && from.hasOwnProperty &&
        from.hasOwnProperty('toString') && !to.hasOwnProperty('toString')) {
        to.toString = from.toString;
    }

    return to;
};


/*
 * @param params - {Object} 参数对象。
 * @return {string} HTTP的GEI请求中的参数字符串。
 * @description 将参数对象转换为HTTP的GEI请求中的参数字符串。例如："key1=value1&key2=value2&key3=value3"。
 */
var getParameterString = function (params) {
    var paramsArray = [];

    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value !== 'function')) {
            var encodedValue;
            if (typeof value === 'object' && value.constructor === Array) {
                /* value is an array; encode items and separate with "," */
                var encodedItemArray = [];
                var item;
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    item = value[itemIndex];
                    encodedItemArray.push(encodeURIComponent(
                        (item === null || item === undefined) ? "" : item));
                }
                encodedValue = encodedItemArray.join(",");
            } else {
                /* value is a string; simply encode */
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
        }
    }

    return paramsArray.join("&");
};

/*
 *获取工作流参数字符串
 */
var getWFParameterString = function (params) {
    var paramsArray = [];

    for (var key in params) {
        var value = params[key];
        if ((value != null) && (typeof value !== 'function')) {
            var encodedValue;
            if (typeof value === 'object' && value.constructor === Array) {
                /* value is an array; encode items and separate with "," */
                var encodedItemArray = [];
                var item;
                for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                    item = value[itemIndex];
                    encodedItemArray.push(encodeURIComponent(
                        (item === null || item === undefined) ? "" : item));
                }
                encodedValue = encodedItemArray.join(",");
            } else {
                /* value is a string; simply encode */
                encodedValue = encodeURIComponent(value);
            }
            paramsArray.push(encodeURIComponent(key) + ":" + encodedValue);
        }
    }

    return paramsArray.join(";");
};

/*
 * @description 给url追加参数。
 * @param url - {string} 待追加参数的url字符串。
 * @param paramStr - {string} 待追加的参数。
 * @return {string} The new url
 */
var urlAppend = function (url, paramStr) {
    var newUrl = url;
    if (paramStr) {
        var parts = (url + " ").split(/[?&]/);
        newUrl += (parts.pop() === " " ?
            paramStr :
            parts.length ? "&" + paramStr : "?" + paramStr);
    }
    return newUrl;
};

/*
 * @description 从URL字符串中解析出参数对象。
 * @param url - {string} url。
 * @return {Object} 解析出的参数对象。
 */
var getParameters = function (url) {
    // if no url specified, take it from the location bar
    url = (url === null || url === undefined) ? window.location.href : url;

    //parse out parameters portion of url string
    var paramsString = "";
    if (url.indexOf('?') > -1) {
        var start = url.indexOf('?') + 1;
        url.indexOf("#") > -1
        var end = url.indexOf("#") > -1 ?
            url.indexOf('#') : url.length;
        paramsString = url.substring(start, end);
    }

    var parameters = {};
    var pairs = paramsString.split(/[&;]/);
    for (var i = 0, len = pairs.length; i < len; ++i) {
        var keyValue = pairs[i].split('=');
        if (keyValue[0]) {

            var key = keyValue[0];
            try {
                key = decodeURIComponent(key);
            } catch (err) {
                key = unescape(key);
            }

            // being liberal by replacing "+" with " "
            var value = (keyValue[1] || '').replace(/\+/g, " ");

            try {
                value = decodeURIComponent(value);
            } catch (err) {
                value = unescape(value);
            }

            // follow OGC convention of comma delimited values
            value = value.split(",");

            //if there's only one value, do not return as array                    
            if (value.length == 1) {
                value = value[0];
            }

            parameters[key] = value;
        }
    }
    return parameters;
};

/*
 * @description 如果userAgent捕获到浏览器使用的是Gecko引擎则返回true。
 * @constant
 */
var IS_GECKO = (function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("webkit") === -1 && ua.indexOf("gecko") !== -1;
})();

/*
 * @description 浏览器名称，依赖于userAgent属性，BROWSER_NAME可以是空，或者以下浏览器：
 *     * "opera" -- Opera
 *     * "msie"  -- Internet Explorer
 *     * "safari" -- Safari
 *     * "firefox" -- Firefox
 *     * "mozilla" -- Mozilla
 * @constant
 */
var Browser = (function () {
    var name = '',
        version = '',
        device = 'pc',
        uaMatch;
    //以下进行测试
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") > -1 || (ua.indexOf("trident") > -1 && ua.indexOf("rv") > -1)) {
        name = 'msie';
        uaMatch = ua.match(/msie ([\d.]+)/) || ua.match(/rv:([\d.]+)/);
    } else if (ua.indexOf("chrome") > -1) {
        name = 'chrome';
        uaMatch = ua.match(/chrome\/([\d.]+)/);
    } else if (ua.indexOf("firefox") > -1) {
        name = 'firefox';
        uaMatch = ua.match(/firefox\/([\d.]+)/);
    } else if (ua.indexOf("opera") > -1) {
        name = 'opera';
        uaMatch = ua.match(/version\/([\d.]+)/);
    } else if (ua.indexOf("safari") > -1) {
        name = 'safari';
        uaMatch = ua.match(/version\/([\d.]+)/);
    }
    version = uaMatch ? uaMatch[1] : '';

    if (ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1 || ua.indexOf("iphone") > -1) {
        device = 'apple';
    } else if (ua.indexOf("android") > -1) {
        uaMatch = ua.match(/version\/([\d.]+)/);
        version = uaMatch ? uaMatch[1] : '';
        device = 'android';
    }
    return {
        name: name,
        version: version,
        device: device
    };
})();

/*
 * @description 获取浏览器相关信息。支持的浏览器包括：Opera，Internet Explorer，Safari，Firefox。
 * @return {Object} 获取浏览器名称、版本、设备名称。对应的属性分别为 name, version, device。
 */
var getBrowser = function () {
    return Browser;
};

/*
 * @description 浏览器是否支持Canvas。
 * @return {boolean} 获取当前浏览器是否支持 HTML5 Canvas 。
 */
var isSupportCanvas = (function () {
    var checkRes = true,
        broz = getBrowser();
    if (document.createElement("canvas").getContext) {
        if (broz.name === 'firefox' && parseFloat(broz.version) < 5) {
            checkRes = false;
        }
        if (broz.name === 'safari' && parseFloat(broz.version) < 4) {
            checkRes = false;
        }
        if (broz.name === 'opera' && parseFloat(broz.version) < 10) {
            checkRes = false;
        }
        if (broz.name === 'msie' && parseFloat(broz.version) < 9) {
            checkRes = false;
        }
    } else {
        checkRes = false;
    }
    return checkRes;
})();

/*
 * @description 判断；浏览器是否支持Canvas。
 * @return {boolean} 获取当前浏览器是否支持 HTML5 Canvas 。
 */
var supportCanvas = function () {
    return isSupportCanvas;
};



/*
 * @description 判断一个 URL 请求是否在当前域中。
 * @param url - {string}  URL 请求字符串。
 * @return {boolean} URL请求是否在当前域中。
 */
var isInTheSameDomain = function (url) {
    if (!url) {
        return true;
    }
    var index = url.indexOf("//");
    var documentUrl = document.location.toString();
    var documentIndex = documentUrl.indexOf("//");
    if (index === -1) {
        return true;
    } else {
        var protocol;
        var substring = protocol = url.substring(0, index);
        var documentSubString = documentUrl.substring(documentIndex + 2);
        documentIndex = documentSubString.indexOf("/");
        var documentPortIndex = documentSubString.indexOf(":");
        var documentDomainWithPort = documentSubString.substring(0, documentIndex);
        //var documentPort;

        var documentprotocol = document.location.protocol;
        if (documentPortIndex !== -1) {
            // documentPort = +documentSubString.substring(documentPortIndex, documentIndex);
        } else {
            documentDomainWithPort += ':' + (documentprotocol.toLowerCase() === 'http:' ? 80 : 443);
        }
        if (documentprotocol.toLowerCase() !== substring.toLowerCase()) {
            return false;
        }
        substring = url.substring(index + 2);
        var portIndex = substring.indexOf(":");
        index = substring.indexOf("/");
        var domainWithPort = substring.substring(0, index);
        var domain;
        if (portIndex !== -1) {
            domain = substring.substring(0, portIndex);
        } else {
            domain = substring.substring(0, index);
            domainWithPort += ':' + (protocol.toLowerCase() === 'http:' ? 80 : 443);
        }
        var documentDomain = document.domain;
        if (domain === documentDomain && domainWithPort === documentDomainWithPort) {
            return true;
        }
    }
    return false;
};


/*
 * @description 将对象转换成 JSON 字符串。
 * @param obj - {Object} 要转换成 JSON 的 Object 对象。
 * @return {string} 返回转换后的 JSON 对象。
 */
var toJSON = function (obj) {
    var objInn = obj;
    if (objInn == null) {
        return null;
    }
    switch (objInn.constructor) {
        case String:
            //s = "'" + str.replace(/(["\\])/g, "\\$1") + "'";   string含有单引号出错
            objInn = '"' + objInn.replace(/(["\\])/g, '\\$1') + '"';
            objInn = objInn.replace(/\n/g, "\\n");
            objInn = objInn.replace(/\r/g, "\\r");
            objInn = objInn.replace("<", "&lt;");
            objInn = objInn.replace(">", "&gt;");
            objInn = objInn.replace(/%/g, "%25");
            objInn = objInn.replace(/&/g, "%26");
            return objInn;
        case Array:
            var arr = [];
            for (var i = 0, len = objInn.length; i < len; i++) {
                arr.push(toJSON(objInn[i]));
            }
            return "[" + arr.join(",") + "]";
        case Number:
            return isFinite(objInn) ? String(objInn) : null;
        case Boolean:
            return String(objInn);
        case Date:
            var dateStr = "{" + "'__type':\"System.DateTime\"," +
                "'Year':" + objInn.getFullYear() + "," +
                "'Month':" + (objInn.getMonth() + 1) + "," +
                "'Day':" + objInn.getDate() + "," +
                "'Hour':" + objInn.getHours() + "," +
                "'Minute':" + objInn.getMinutes() + "," +
                "'Second':" + objInn.getSeconds() + "," +
                "'Millisecond':" + objInn.getMilliseconds() + "," +
                "'TimezoneOffset':" + objInn.getTimezoneOffset() + "}";
            return dateStr;
        default:
            //if (objInn["toJSON"] != null && typeof objInn["toJSON"] === "function") {
            //    return objInn.toJSON();
            //}
            if (typeof objInn === "object") {
                if (objInn.length) {
                    var arr = [];
                    for (var i = 0, len = objInn.length; i < len; i++) {
                        arr.push(toJSON(objInn[i]));
                    }
                    return "[" + arr.join(",") + "]";
                }
                var arr1 = [];
                for (var attr in objInn) {
                    if (typeof objInn[attr] !== "function" && attr !== "CLASS_NAME") {
                        arr1.push("'" + attr + "':" + toJSON(objInn[attr]));
                    }
                }

                if (arr1.length > 0) {
                    return "{" + arr1.join(",") + "}";
                } else {
                    return "{}";
                }
            }
            return objInn.toString();
    }
};


/*
 * @description 转换查询结果。
 * @param result - {Object} 查询结果。
 * @return {Object} 转换后的查询结果。
 */
var transformResult = function (result) {
    if (result.responseText && typeof result.responseText === "string") {
        result = JSON.parse(result.responseText);
    }
    return result;
};

/*
 * @description 属性拷贝，不拷贝方法类名(CLASS_NAME)等。
 * @param destination - {Object} 拷贝目标。
 * @param source - {Object} 源对象。
 *
 */
var copyAttributes = function (destination, source) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

/*
 * @description 将源对象上的属性拷贝到目标对象上。（不拷贝 CLASS_NAME 和方法）
 * @param destination - {Object} 目标对象。
 * @param source - {Object} 源对象。
 * @param clip - {Array<string>} 源对象中禁止拷贝到目标对象的属性，目的是防止目标对象上不可修改的属性被篡改。
 *
 */
var copyAttributesWithClip = function (destination, source, clip) {
    destination = destination || {};
    if (source) {
        for (var property in source) {
            //去掉禁止拷贝的属性
            var isInClip = false;
            if (clip && clip.length) {
                for (var i = 0, len = clip.length; i < len; i++) {
                    if (property === clip[i]) {
                        isInClip = true;
                        break;
                    }
                }
            }
            if (isInClip === true) {
                continue;
            }

            var value = source[property];
            if (value !== undefined && property !== "CLASS_NAME" && typeof value !== "function") {
                destination[property] = value;
            }
        }
    }
    return destination;
};

/*
 * @description 克隆一份Object对象
 * @param obj - {Object}  需要克隆的对象。
 * @return {Object} 返回对象的拷贝对象，注意是新的对象，不是指向。
 */
var cloneObject = function (obj) {
    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) {
        return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = obj.slice(0);
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = cloneObject(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

var newGuid = function () {
    /// <summary>生成一个guid</summary>
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
};

var bind = function (func, object) {
    // create a reference to all arguments past the second one
    var args = Array.prototype.slice.apply(arguments, [2]);
    return function () {
        // Push on any additional arguments from the actual function call.
        // These will come after those sent to the bind call.
        var newArgs = args.concat(
            Array.prototype.slice.apply(arguments, [0])
        );
        return func.apply(object, newArgs);
    };
};

/*
 * @description 绑定函数到对象,在调用该函数时配置并使用事件对象作为第一个参数.
 * @param func - {function} 用于监听事件的函数.
 * @param object - {Object} this 对象的引用.
 * @returns {function}
 */
var bindAsEventListener = function (func, object) {
    return function (event) {
        return func.call(object, event || window.event);
    };
};

var getTopAnalysisResult = function (data) {
    /// <summary>解析拓扑分析的服务器REST返回结果，以更友好的形式返回给客户端</summary>
    var enumNum = data.value;
    switch (enumNum) {
        case 0:
            return "Intersect";
        case 1:
            return "Disjoin";
        case 2:
            return "Include";
        case 3:
            return "Adjacent";
        default:
            return "Unknown";
    }
};

var ChineseToUtf8 = function (s) {
    return s.replace(/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g, function (newStr) {
        return EncodeUtf8(newStr);　　　　　　
    });
};
var EncodeUtf8 = function (s1) {
    var s = escape(s1);
    var sa = s.split("%");
    var retV = "";
    if (sa[0] != "") {
        retV = sa[0];
    }
    for (var i = 1; i < sa.length; i++) {
        if (sa[i].substring(0, 1) == "u") {
            retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)));

        } else retV += "%" + sa[i];
    }

    return retV;
};
var Str2Hex = function (s) {
    var c = "";
    var n;
    var ss = "0123456789ABCDEF";
    var digS = "";
    for (var i = 0; i < s.length; i++) {
        c = s.charAt(i);
        n = ss.indexOf(c);
        digS += Dec2Dig(n);

    }
    //return value;
    return digS;
};
var Hex2Utf8 = function (s) {
    var retS = "";
    var tempS = "";
    var ss = "";
    if (s.length == 16) {
        tempS = "1110" + s.substring(0, 4);
        tempS += "10" + s.substring(4, 10);
        tempS += "10" + s.substring(10, 16);
        var sss = "0123456789ABCDEF";
        for (var i = 0; i < 3; i++) {
            retS += "%";
            ss = tempS.substring(i * 8, (i + 1) * 8);



            retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
            retS += sss.charAt(Dig2Dec(ss.substring(4, 8)));
        }
        return retS;
    }
    return "";
};
var Dig2Dec = function (s) {
    var retV = 0;
    if (s.length == 4) {
        for (var i = 0; i < 4; i++) {
            retV += s.charAt(i) * Math.pow(2, 3 - i);
        }
        return retV;
    }
    return -1;
};

var Dec2Dig = function (n1) {
    var s = "";
    var n2 = 0;
    for (var i = 0; i < 4; i++) {
        n2 = Math.pow(2, 3 - i);
        if (n1 >= n2) {
            s += '1';
            n1 = n1 - n2;
        } else
            s += '0';

    }
    return s;
};


var DeepMerge = function (obj1, obj2) {
    if (Object.prototype.toString.call(obj1) === '[object Object]' && Object.prototype.toString.call(obj2) === '[object Object]') {
        for (var prop2 in obj2) { //obj1无值,都有取obj2
            if (!obj1[prop2]) {
                obj1[prop2] = obj2[prop2];
            } else { //递归赋值
                obj1[prop2] = DeepMerge(obj1[prop2], obj2[prop2]);
            }
        }
    } else if (Object.prototype.toString.call(obj1) === '[object Array]' && Object.prototype.toString.call(obj2) === '[object Array]') {
        // 两个都是数组，进行合并
        obj1 = obj1.concat(obj2);
    } else { //其他情况，取obj2的值
        obj1 = obj2;
    }
    return obj1;
};

/*
 * Method: mergeItem
 * 合并源对象的单个属性到目标对象。
 *
 * Parameters:
 * target - {Object} 目标对象。
 * source - {Object} 源对象。
 * key - {String} 键。
 * overwrite - {Boolean} 是否覆盖。
 *
 * Returns:
 * {Object} 目标对象。
 */
var mergeItem = function (target, source, key, overwrite) {
    var BUILTIN_OBJECT = {
        '[object Function]': 1,
        '[object RegExp]': 1,
        '[object Date]': 1,
        '[object Error]': 1,
        '[object CanvasGradient]': 1
    };
    if (source.hasOwnProperty(key)) {
        if (typeof target[key] == 'object' &&
            !BUILTIN_OBJECT[Object.prototype.toString.call(target[key])]
        ) {
            // 如果需要递归覆盖，就递归调用merge
            merge(
                target[key],
                source[key],
                overwrite
            );
        } else if (overwrite || !(key in target)) {
            // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
            target[key] = source[key];
        }
    }
};


/*
 * APIMethod: merge
 * 合并源对象的属性到目标对象。
 *
 * Parameters:
 * target - {Object} 目标对象。
 * source - {Object} 源对象。
 * overwrite - {Boolean} 是否覆盖。
 *
 * Returns:
 * {Object} 目标对象。
 */
var merge = function (target, source, overwrite) {
    for (var i in source) {
        mergeItem(target, source, i, overwrite);
    }
    return target;
};

/*
 * @description 实现多重继承
 * @param ...mixins {Class|Object}继承的类
 */
var mixin = function (...mixins) {
    class Mix {
        constructor(options) {
            for (var index = 0; index < mixins.length; index++) {
                copyProperties(this, new mixins[index](options));
            }
        }
    }

    for (var index = 0; index < mixins.length; index++) {
        var mixin = mixins[index];
        copyProperties(Mix, mixin);
        copyProperties(Mix.prototype, mixin.prototype);
        copyProperties(Mix.prototype, new mixin());
    }
    return Mix;

    function copyProperties(target, source) {
        var ownKeys = Object.getOwnPropertyNames(source);
        if (Object.getOwnPropertySymbols) {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source));
        }
        for (var index = 0; index < ownKeys.length; index++) {
            var key = ownKeys[index];
            if (key !== "constructor" &&
                key !== "prototype" &&
                key !== "name" && key !== "length") {
                let desc = Object.getOwnPropertyDescriptor(source, key);
                if (window["ActiveXObject"]) {
                    Object.defineProperty(target, key, desc || {});
                } else {
                    Object.defineProperty(target, key, desc);
                }
            }
        }
    }
};

var createCanvasContext2D = function (opt_width, opt_height) {
    var canvas = document.createElement('CANVAS');
    if (opt_width) {
        canvas.width = opt_width;
    }
    if (opt_height) {
        canvas.height = opt_height;
    }
    return canvas.getContext('2d');
};

/*
 * APIMethod: formatQuery
 * 转换参数对象为url字符串
 *
 * Parameters:
 * query - {Object} 要转换的参数对象。
 * url - {String} url字符串。
 * paramArr - {Array} 要转化为json字符串的参数。
 * formatObj - {Object} 要改名的参数对象
 *
 * Returns:
 * url - {String} url字符串。
 */
var formatQuery = function (query,url,paramArr,formatObj) {
    Object.keys(query).forEach(function (key) {
        let param = query[key],keyStr = key;
        //拼接url参数，param不能为空或者function
        if(notNULL(param) && typeof(param) !== 'function'){
            //当参数为geometry时，要转换格式
            if(paramArr && paramArr.indexOf(key) > -1){
                let geometry = {};
                if(key === "geometry"){
                    if(param.type === "polygon"){
                        geometry["rings"] = query[key]["rings"];
                    }
                    if(param.type === "multipoint"){
                        geometry["points"] = query[key]["points"];
                    }
                    if(param.type === "point"){
                        if(query[key]["x"] && query[key]["y"]){
                            geometry["y"] = query[key]["y"];
                            geometry["x"] = query[key]["x"];
                        }
                    }
                    if(param.type === "polyline"){
                        geometry["paths"] = query[key]["paths"];
                    }
                    if(param.type === "circle"){
                        param.type = "polygon";
                        geometry["rings"] = query[key]["rings"];
                    }
                    geometry["spatialReference"] = query[key]["spatialReference"];
                    param = geometry;
                    url += "&geometryType=esriGeometry" + query[key]["type"].charAt(0).toUpperCase() + query[key]["type"].slice(1);
                    param = encodeURI(JSON.stringify(param));
                }else {
                    param = JSON.stringify(param);
                }
            }
            if(formatObj && formatObj.hasOwnProperty(key)){
                keyStr = formatObj[key];
            }
            url += "&" + keyStr + "=" + param;
        }
    });
    return url;
}

/*
 * APIMethod: formatEdits
 * 转换参数对象为url字符串
 *
 * Parameters:
 * params - {Object} 要转换的参数对象。
 * dataStr - {String} url字符串。
 * editArr - {Array} 要转化名字的方法。
 *
 * Returns:
 * dataStr - {String} url字符串。
 */
var formatEdits = function (dataStr,params,editArr) {
    Object.keys(params).forEach(function (key) {
        if(editArr && editArr.indexOf(key) > -1) {
            let keyStr = key;
            keyStr = key.substring(0,keyStr.length - 'Features'.length) + "s";
            //add、update、delete都需要json格式，并进行转义
            dataStr += keyStr + "=" + encodeURIComponent(params[key] instanceof Object ? JSON.stringify(params[key]) : params[key]) + "&";
        }else {
            //不需要处理
            dataStr += key + "=" + params[key] + "&";
        }

    });
    return dataStr;
}

/*
 * APIMethod: returnPoint
 * 输入坐标数组[x,y]，将某个几何对象d的hasM、hasZ、spatialReference传给ArcGisPoint对象，并返回该对象
 *
 * Parameters:
 * constructor - {Function} ArcGisPoint构造函数。
 * geometry - {Object} 几何对象。
 * point - {Array} 数组坐标。
 *
 * Returns:
 * ArcGisPoint - {Object} ArcGisPoint对象。
 */
var returnPoint = function (constructor,geometry,point) {
    return new constructor({
        longitude: point[0],
        latitude: point[1],
        z: point[2],
        spatialReference: cloneObject(geometry.spatialReference)
    });
}

//递归处理数据
var formatPoints = function (points) {
    for(let i = 0; i < points.length; i++){
        if(points[i] instanceof Array){
            formatPoints(points[i]);
        }else {
            if(points[i] instanceof Object){
                points[i] = points[i].toArray();
            }
        }
    }
    return points;
}

/*
 * APIMethod: notNULL
 * 判断对象是否为""、null、undefined
 *
 * Parameters:
 * obj - {Object} 要判断的对象。
 *
 * Returns:
 * isNull - {Boolean} 是否为空。
 */
var notNULL = function (obj) {
    return obj !== "" && obj !== null && obj !== undefined;
}

export {
    extend,
    isArray,
    extendDeep,
    copy,
    copyExcluce,
    reset,
    getElement,
    isElement,
    removeItem,
    indexOf,
    modifyDOMElement,
    applyDefaults,
    getParameterString,
    getWFParameterString,
    urlAppend,
    getParameters,
    IS_GECKO,
    Browser,
    getBrowser,
    isSupportCanvas,
    supportCanvas,
    isInTheSameDomain,
    toJSON,
    transformResult,
    copyAttributes,
    copyAttributesWithClip,
    cloneObject,
    newGuid,
    bind,
    bindAsEventListener,
    getTopAnalysisResult,
    ChineseToUtf8,
    DeepMerge,
    merge,
    mixin,
    createCanvasContext2D,
    formatQuery,
    formatEdits,
    returnPoint,
    formatPoints,
    notNULL
};
Zondy.Util.extend = extend;
Zondy.Util.isArray = isArray;
Zondy.Util.extendDeep = extendDeep;
Zondy.Util.copy = copy;
Zondy.Util.copyExcluce = copyExcluce;
Zondy.Util.reset = reset;
Zondy.Util.getElement = getElement;
Zondy.Util.isElement = isElement;
Zondy.Util.removeItem = removeItem;
Zondy.Util.indexOf = indexOf;
Zondy.Util.modifyDOMElement = modifyDOMElement;
Zondy.Util.applyDefaults = applyDefaults;
Zondy.Util.getParameterString = getParameterString;
Zondy.Util.getWFParameterString = getWFParameterString;
Zondy.Util.urlAppend = urlAppend;
Zondy.Util.getParameters = getParameters;
Zondy.IS_GECKO = IS_GECKO;
Zondy.Browser = Browser;
Zondy.Util.getBrowser = getBrowser;
Zondy.Util.isSupportCanvas = isSupportCanvas;
Zondy.Util.supportCanvas = supportCanvas;
Zondy.Util.isInTheSameDomain = isInTheSameDomain;
Zondy.Util.toJSON = toJSON;
Zondy.Util.transformResult = transformResult;
Zondy.Util.copyAttributes = copyAttributes;
Zondy.Util.copyAttributesWithClip = copyAttributesWithClip;
Zondy.Util.cloneObject = cloneObject;
Zondy.Util.newGuid = newGuid;
Zondy.Util.bind = bind;
Zondy.Util.bindAsEventListener = bindAsEventListener;
Zondy.Util.getTopAnalysisResult = getTopAnalysisResult;
Zondy.Util.ChineseToUtf8 = ChineseToUtf8;
Zondy.Util.DeepMerge = DeepMerge;
Zondy.Util.merge = merge;
Zondy.Util.mixin = mixin;
Zondy.Util.createCanvasContext2D = createCanvasContext2D;
Zondy.Util.formatQuery = formatQuery;
Zondy.Util.formatEdits = formatEdits;
Zondy.Util.returnPoint = returnPoint;
Zondy.Util.returnPoint = formatPoints;
Zondy.Util.returnPoint = notNULL;