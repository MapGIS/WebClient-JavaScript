import {Zondy} from './common/Base';
import {extend}  from  "./common/Util";
import {isArray}  from  "./common/Util";

/**
 * 服务基类
 * @class Zondy.Service.ServiceBase
 * @classdesc 服务基类
 * @param {Object} options 属性键值对
 * @param {String} [options.baseUrl=null] 基地址
 * @param {String} [option.domain = ''] 【domain和（networkProtocol，ip，port）二选一】。域名
 * @param {String} [option.networkProtocol = location.protocol.split(":")[0] || "http"] 【domain和（networkProtocol，ip，port）二选一】。网络协议
 * @param {String} [option.ip = localhost] 【domain和（networkProtocol，ip，port）二选一】。地图服务ip
 * @param {String} [option.port = 6163] 【domain和（networkProtocol，ip，port）二选一】。地图服务端口
 * @param {String} [options.partUrl=null] 服务地址
 */
class ServiceBase {
    constructor(options) {
        extend(this, options);
        this.baseUrl = options && options.baseUrl ? options.baseUrl : null;
        this.ip = options && options.ip ? options.ip : 'localhost';
        this.port = options && options.port ? options.port : '6163';
        this.partUrl = options && options.partUrl ? options.partUrl : null;
        this.networkProtocol = options &&options.networkProtocol? options.networkProtocol : location.protocol.split(":")[0]||"http";
        /**
         * @public
         * @type {string}
         * 请求使用的域名，基地址
         */
        this.domain = options && options.domain ? options.domain : '';
    }


    // /**
    //  * @function Zondy.Service.ServiceBase.prototype.destroy
    //  * @description 释放资源，将引用的资源属性置空。
    //  */
//    destroy: function () {
//        this.fire("destroy", this);
//    },

    /**
     * @function Zondy.Service.ServiceBase.prototype.getFullUrl
     * @description 获取服务完整的地址
     * @returns url
     */
    getFullUrl() {
        var me = this;
        var url = null;
        if (Zondy.Util.isArray(me.ip)) {
            for (var i = 0; i < me.ip.length; i++) {
                url = new Array();
                var _port = null;
                if (isArray(me.port)) {
                    _port = (me.port)[i] !== undefined ? (me.port)[i] : '6163';
                }
                else {
                    _port = me.port !== undefined ? me.port : '6163';
                }
                var _partUrl = null;
                if (isArray(me.partUrl)) {
                    _partUrl = (me.partUrl)[i] !== undefined ? (me.partUrl)[i] : null;
                }
                else {
                    _partUrl = me.partUrl !== undefined ? me.partUrl : null;
                }

                //url.push(encodeURI(("http://" + (me.ip)[i] + ':' + _port + '/' + me.baseUrl + '/' + _partUrl).trim()));
                if (me.domain === '') {
                    me.domainStr = me.networkProtocol + '://' + (me.ip)[i] + ':' + _port;
                } else {
                    me.domainStr = me.domain;
                }

                url.push(encodeURI((me.domainStr + '/' + me.baseUrl + '/' + _partUrl).trim()));
            }
        }
        else {
            //url = encodeURI(("http://" + me.ip + ':' + me.port + '/' + me.baseUrl + '/' + me.partUrl).trim());

            if (me.domain === '') {
                me.domainStr = me.networkProtocol + '://' + me.ip + ':' + me.port;
            } else {
                me.domainStr = me.domain;
            }
            url = encodeURI((me.domainStr + '/' + me.baseUrl + '/' + me.partUrl).trim());
        }
        return url;
    }

}
export {ServiceBase};
Zondy.Service.ServiceBase = ServiceBase;
