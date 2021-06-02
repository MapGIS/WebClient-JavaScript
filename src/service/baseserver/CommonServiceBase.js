import {Zondy} from "../common/Base";
import {extend}  from  "../common/Util";
import {isArray}  from  "../common/Util";
import {isInTheSameDomain}  from  "../common/Util";
import {transformResult}  from  "../common/Util";
import {urlAppend}  from  "../common/Util";
import {getParameterString}  from  "../common/Util";
import {bind}  from  "../common/Util";
import {Events}  from  "./Events";
import {JSONFormat}  from  "./JSONFormat";
import {FetchRequest}  from  "./FetchRequest";

/**
 * @private
 * @class Zondy.Service.CommonServiceBase
 * @classdesc 对接各种服务的Service的基类。
 * @param url - {string} 服务地址。
 * @param options - {Object} 可选参数。如：
 * @param {Object} [options.eventListeners] 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。
 */

class CommonServiceBase {
    constructor(url, options) {
        var me = this;
        this.EVENT_TYPES = ["processCompleted", "processFailed"];

        this.events = null;
        this.eventListeners = null;
        this.url = null;
        this.urls = null;
        this.index = null;
        this.length = null;
        this.options = null;
        this.totalTimes = null;
        this.POLLING_TIMES = 3;
        this._processSuccess = null;
        this._processFailed = null;

        this.isInTheSameDomain = null;

        if (isArray(url)) {
            me.urls = url;
            me.length = url.length;
            me.totalTimes = me.length;
            if (me.length === 1) {
                me.url = url[0];
            } else {
                me.index = parseInt(Math.random() * me.length);
                me.url = url[me.index];
            }
        } else {
            me.totalTimes = 1;
            me.url = url;
        }
        options = options || {};

        if (options) {
            extend(this, options);
        }

        me.isInTheSameDomain = isInTheSameDomain(me.url);

        me.events = new Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    }

    destroy() {
        var me = this;
        if (isArray(me.urls)) {
            me.urls = null;
            me.index = null;
            me.length = null;
            me.totalTimes = null;
        }
        me.url = null;
        me.options = null;
        me._processSuccess = null;
        me._processFailed = null;
        me.isInTheSameDomain = null;

        me.EVENT_TYPES = null;
        if (me.events) {
            me.events.destroy();
            me.events = null;
        }
        if (me.eventListeners) {
            me.eventListeners = null;
        }
    }

    /**
     * @function  CommonServiceBase.prototype.request
     * @description: 该方法用于向服务发送请求。
     * @param options - {Object} 参数。
     * @param {string} [options.method] 请求方式，包括"GET"，"POST"，"PUT"，"DELETE"。
     * @param {string} [options.url] 发送请求的地址。<br>
     * @param {Object} [options.params] 作为查询字符串添加到url中的一组键值对，此参数只适用于GET方式发送的请求。
     * @param {String} [options.data] 发送到服务器的数据。
     * @param {Function} [options.success] 成功回调函数。
     * @param {Function} [options.failure] 失败回调函数。
     * @param {Object} [options.scope] 如果回调函数是对象的一个公共方法，设定该对象的范围。
     * @param {boolean} [options.isInTheSameDomain] 请求是否在当前域中。
     */
    request(options) {
        var me = this;
        options.url = options.url || me.url;
        options.isInTheSameDomain = me.isInTheSameDomain;
        //为url添加安全认证信息片段
        //        var credential = this.getCredential(options.url);
        //        if (credential) {
        //            //当url中含有?，并且?在url末尾的时候直接添加token *网络分析等服务请求url会出现末尾是?的情况*
        //            //当url中含有?，并且?不在url末尾的时候添加&token
        //            //当url中不含有?，在url末尾添加?token
        //            var endStr = options.url.substring(options.url.length - 1, options.url.length);
        //            if (options.url.indexOf("?") > -1 && endStr === "?") {
        //                options.url += credential.getUrlParameters();
        //            } else if (options.url.indexOf("?") > -1 && endStr !== "?") {
        //                options.url += "&" + credential.getUrlParameters();
        //            } else {
        //                options.url += "?" + credential.getUrlParameters();
        //            }
        //        }
        me.calculatePollingTimes();
        me._processSuccess = options.success;
        me._processFailed = options.failure;
        options.scope = me;
        options.success = me.getUrlCompleted;
        options.failure = me.getUrlFailed;
        me.options = options;
        me._commit(me.options);
    }

    /**
     * @function Zondy.CommonServiceBase.prototype.getUrlCompleted
     * @description 请求成功后执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    getUrlCompleted(result) {
        var me = this;
        me._processSuccess(result);
    }


    /**
     * @function CommonServiceBase.prototype.getUrlFailed
     * @description 请求失败后执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    getUrlFailed(result) {
        var me = this;
        if (me.totalTimes > 0) {
            me.totalTimes--;
            me.ajaxPolling();
        } else {
            me._processFailed(result);
        }
    }


    /**
     *
     * @function CommonServiceBase.prototype.ajaxPolling
     * @description 请求失败后，如果剩余请求失败次数不为0，重新获取url发送请求
     */
    ajaxPolling() {
        var me = this,
            url = me.options.url,
            re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/;
        me.index = parseInt(Math.random() * me.length);
        me.url = me.urls[me.index];
        url = url.replace(re, re.exec(me.url)[0]);
        me.options.url = url;
        me.options.isInTheSameDomain = isInTheSameDomain(url);
        me._commit(me.options);
    }


    /**
     * @function CommonServiceBase.prototype.calculatePollingTimes
     * @description 计算剩余请求失败执行次数。
     */
    calculatePollingTimes() {
        var me = this;
        if (me.times) {
            if (me.totalTimes > me.POLLING_TIMES) {
                if (me.times > me.POLLING_TIMES) {
                    me.totalTimes = me.POLLING_TIMES;
                } else {
                    me.totalTimes = me.times;
                }
            } else {
                if (me.times < me.totalTimes) {
                    me.totalTimes = me.times;
                }
            }

        } else {
            if (me.totalTimes > me.POLLING_TIMES) {
                me.totalTimes = me.POLLING_TIMES;
            }
        }
        me.totalTimes--;
    }


    /**
     * @function CommonServiceBase.prototype.serviceProcessCompleted
     * @description 状态完成，执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        result = transformResult(result);
        this.events.triggerEvent("processCompleted", {result: result});
    }

    /**
     * @function CommonServiceBase.prototype.serviceProcessFailed
     * @description 状态失败，执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    serviceProcessFailed(result) {
        result = transformResult(result);
        var error = result.error || result;
        this.events.triggerEvent("processFailed", {error: error});
    }

    _commit(options) {
        if (options.method === "POST" || options.method === "PUT") {
            if (options.params) {
                options.url = urlAppend(options.url,
                    getParameterString(options.params || {}));
            }
            options.params = options.data;
        }
        FetchRequest.commit(options.method, options.url, options.params, {
            headers: options.headers,
            withCredentials: options.withCredentials,
            timeout: options.async ? 0 : null,
            proxy: options.proxy
        })
        .then(function (response) {
            if (response.text) {
                return response.text();
            }
            return response.json();
        })
        .catch(function(error) {
            let result = {error: true, value: {}};
            var failure = (options.scope) ? bind(options.failure, options.scope) : options.failure;
            failure(result);
        })
        .then(function (text) {
            if (!text) return;
            var result = null;
            if (typeof text === "string" && (text.toLowerCase() === 'true' || text.toLowerCase() === 'false')) {
                result = {};
                if (text.toLowerCase() === 'true') {
                    result.succeed = true;
                }
                else {
                    result.error = true;
                }
            }
            else if (typeof text === "string") {
                result = new JSONFormat().read(text);
            }


            if ((!result && isNaN(result)) || result.error) {
                if (result && result.error) {
                    result = {error: result.error};
                } else {
                    result = {error: true};
                }
            }
            if (result.error) {
                var failure = (options.scope) ? bind(options.failure, options.scope) : options.failure;
                failure(result);
            } else {
                if (!isNaN(result))  //为数字
                {
                    result = {value: result};
                }
                if (typeof result === "string") {
                    result = {value: result};
                }
                if (Object.prototype.toString.call(result) !== '[object Array]') {
                    result.succeed = result.succeed === undefined ? true : result.succeed;
                }
                else {
                    result = {
                        value: result,
                        succeed: true
                    };
                }
                var success = (options.scope) ? bind(options.success, options.scope) : options.success;
                success(result);
            }
        });
    }
}
export {CommonServiceBase};
Zondy.Service.CommonServiceBase = CommonServiceBase;
