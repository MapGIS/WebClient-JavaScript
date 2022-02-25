import "./PromisePolyfill";
import 'fetch-ie8';

var fetch = window.fetch;

/*
 * @member Zondy.CORS
 * @description 是否支持跨域
 * @type {boolean}
 */
var CORS = Zondy.CORS = Zondy.CORS || (window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest());

/*
 * @member Zondy.RequestTimeout
 * @description 请求超时时间，默认45s
 * @type {number}
 */
var RequestTimeout = Zondy.RequestTimeout = Zondy.RequestTimeout || 45000;
var FetchRequest = Zondy.FetchRequest = {
    commit: function (method, url, params, options) {
        method = method ? method.toUpperCase() : method;
        switch (method) {
            case 'GET':
                return this._get(url, params, options);
            case 'POST':
                return this._post(url, params, options);
            case 'PUT':
                return this._put(url, params, options);
            case 'DELETE':
                return this._delete(url, params, options);
            default:
                return this._get(url, params, options);
        }
    },

    _get: function (url, params, options) {
        options = options || {};
        var type = 'GET';
        url = this._processUrl(url, options);
        url = Zondy.Util.urlAppend(url, this._getParameterString(params || {}));
        if (!this.urlIsLong(url)) {
            return this._fetch(url, params, options, type);
            //            if (MapGis.Util.isInTheSameDomain(url) || CORS || options.proxy) {
            //                return this._fetch(url, params, options, type);
            //            }
            //            if (!MapGis.Util.isInTheSameDomain(url)) {
            //                url = url.replace('.json', '.jsonp');
            //                return this._fetchJsonp(url, options);
            //            }
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    _delete: function (url, params, options) {
        options = options || {};
        var type = 'DELETE';
        url = this._processUrl(url, options);
        url = Zondy.Util.urlAppend(url, this._getParameterString(params || {}));
        if (!this.urlIsLong(url) && CORS) {
            return this._fetch(url, params, options, type);
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    _post: function (url, params, options) {
        options = options || {};
        return this._fetch(this._processUrl(url, options), params, options, 'POST');
    },

    _put: function (url, params, options) {
        options = options || {};
        return this._fetch(this._processUrl(url, options), params, options, 'PUT');
    },
    urlIsLong: function (url) {
        //当前url的字节长度。
        var totalLength = 0,
            charCode = null;
        for (var i = 0, len = url.length; i < len; i++) {
            //转化为Unicode编码
            charCode = url.charCodeAt(i);
            if (charCode < 0x007f) {
                totalLength++;
            } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
                totalLength += 2;
            } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
                totalLength += 3;
            }
        }
        return (totalLength < 2000) ? false : true;
    },
    _postSimulatie: function (type, url, params, options) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + '_method=' + type;
        if (typeof params !== 'string') {
            params = JSON.stringify(params);
        }
        return this._post(url, params, options);
    },

    _processUrl: function (url, options) {
        if (this._isMVTRequest(url)) {
            return url;
        }

        //        if (url.indexOf('.json') === -1 && !options.withoutFormatSuffix) {
        //            if (url.indexOf("?") < 0) {
        //                url += '.json'
        //            } else {
        //                var urlArrays = url.split("?");
        //                if (urlArrays.length === 2) {
        //                    url = urlArrays[0] + ".json?" + urlArrays[1]
        //                }
        //            }
        //        }
        if (options && options.proxy) {
            if (typeof options.proxy === "function") {
                url = options.proxy(url);
            } else {
                url = decodeURIComponent(url);
                url = options.proxy + encodeURIComponent(url);
            }
        }
        return url;
    },

    _fetch: function (url, params, options, type) {
        options = options || {};
        options.headers = options.headers || {};
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
//        options.headers['Access-Control-Allow-Origin'] = '*';
//        options.headers['Access-Control-Allow-Headers'] = 'Origin,X-Requested-With,Content-Type,Accept';
//        options.headers['Accept'] = 'application/json';
       // options.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT, DELETE';
        if (options.timeout) {
            return this._timeout(options.timeout, fetch(url, {
                method: type,
                headers: options.headers,
                body: type === 'PUT' || type === 'POST' ? params : undefined,
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: 'cors',
                timeout: RequestTimeout
            }).then(function (response) {
                return response;
            }));
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: 'cors',
            timeout: RequestTimeout
        }).then(function (response) {
            return response;
        }).catch(function(error){
            return error;
        });
    },

    //    _fetchJsonp: function (url, options) {
    //        options = options || {};
    //        return fetchJsonp(url, { method: 'GET', timeout: options.timeout })
    //            .then(function (response) {
    //                return response;
    //            });
    //    },

    _timeout: function (seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"))
            }, seconds)
            promise.then(resolve, reject)
        })
    },

    _getParameterString: function (params) {
        var paramsArray = [];
        for (var key in params) {
            var value = params[key];
            if ((value != null) && (typeof value !== 'function')) {
                var encodedValue;
                if (typeof value === 'object' && value.constructor === Array) {
                    var encodedItemArray = [];
                    var item;
                    for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                        item = value[itemIndex];
                        encodedItemArray.push(encodeURIComponent(
                            (item === null || item === undefined) ? "" : item)
                        );
                    }
                    encodedValue = '[' + encodedItemArray.join(",") + ']';
                } else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
            }
        }
        return paramsArray.join("&");
    },

    _isMVTRequest: function (url) {
        return (url.indexOf('.mvt') > -1 || url.indexOf('.pbf') > -1);
    }
};
export { CORS,RequestTimeout,FetchRequest};
Zondy.Service.FetchRequest = FetchRequest;
Zondy.Service.CORS = CORS;
Zondy.Service.RequestTimeout = RequestTimeout;
