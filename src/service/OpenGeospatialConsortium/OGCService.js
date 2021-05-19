import { MapGIS } from '../Base';
import { ServiceBase } from '../ServiceBase';

/**
 * @author 基础平台-潘卓然
 * @class module:OGC服务.OGCService
 * @classdesc OGC服务类
 * @description Mapgis.OGC.OGCService
 * @extends  ServiceBase
 * @param option - {Object} 属性键值对。<br>
 * @param {String} [option.baseUrl = igs/rest/ogc] 基本地址
 * @param {String} [option.url = ""] 必选。服务url
 */
class OGCService extends ServiceBase {
    constructor(option) {
        var options = option || {};
        options.baseUrl = 'igs/rest/ogc';
        super(options);
    }

    /**
     * @description 向服务器发送GET请求
     * @function module:OGC.OGCService.prototype.get
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
     * @function module:OGC.OGCService.prototype.post
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
export { OGCService };
MapGIS.OGC.OGCService = OGCService;
