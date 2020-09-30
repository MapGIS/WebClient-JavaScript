import Qs from 'qs';

import { ServiceBase } from '../ServiceBase';
import { IgsServiceBase } from '../baseserver/IServiceBase';

/**
 * @class module:DataStore.DataStoreService
 * @description DataStore的基础服务
 * @author 基础平台-潘卓然
 */
export class DataStoreService extends ServiceBase {
    constructor(options) {
        super(options);
        this.fixParams(options);
    }

    fixParams(option) {
        this.params = option;
        delete this.params.url;
        delete this.params.ip;
        delete this.params.port;
        delete this.params.domain;
        delete this.params.baseUrl;
        delete this.params.networkProtocol;
        delete this.params.partUrl;
    }

    /**
     * @function module:DataStore.DataStoreService.prototype.getBaseUrl
     * @description 获取基地址url
     */
    getBaseUrl() {
        let url = '';
        const { baseUrl, ip, port, domain, networkProtocol } = this;
        if (baseUrl) {
            url = baseUrl;
        } else if (domain) {
            url = domain;
        } else if (networkProtocol && ip && port) {
            url = `${networkProtocol}://${ip}:${port}`;
        }
        return url;
    }

    /**
     * @function module:DataStore.DataStoreService.prototype.getFullUrl
     * @description 获取完整的url地址
     * @param {String}
     * @param {Object}
     * 可以使用SpaceTimeQueryByAgg.query方法，也可以使用axios，jquery进行请求
     */
    getFullUrl(serviceurl, options) {
        let baseurl = this.getBaseUrl();
        let url = baseurl + serviceurl + '?' + Qs.stringify(options);
        return url;
    }

    /**
     * @description 向服务器发送GET请求
     * @function module:DataStore.DataStoreService.prototype.get
     * @param  {String} url 完整的请求地址。
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    get(url, onSuccess, onError) {
        var me = this;
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 向服务器发送POST请求
     * @function module:DataStore.DataStoreService.prototype.post
     * @param  {String} url 完整的请求地址。
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    post(url, param, onSuccess, onError) {
        var me = this;
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(param),
            headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
        });
    }
}

export default DataStoreService;
