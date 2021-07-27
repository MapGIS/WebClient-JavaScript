import { Zondy } from '../../common/Base';
import { extend } from '../../common/Util';
import { copyExcluce } from '../../common/Util';
import { ServiceBase } from '../../ServiceBase';
import { FeatureSet } from '../../common/FeatureSet';
import { QueryParameter } from './QueryParameter';
import { IgsServiceBase } from '../../baseserver/IServiceBase';
/**
 * @author 基础平台/研究院 陈琪
 * @class module:要素服务.QueryServiceBase
 * @classdesc 查询服务基类
 * @description Zondy.Service.QueryServiceBase
 * @extends  ServiceBase
 * @param option - {Object} 属性键值对。
 * @param {Object} [option.resultCallBack =null] 返回结果回调
 * @param {Zondy.Object.QueryByLayerParameter} [option.queryParam = null] 查询参数信息
 * @param {String} [option.requestType = GET] 请求方式{string} GET|POST
 */
class QueryServiceBase extends ServiceBase {
    constructor(option) {
        var options = option || {};
        options.baseUrl = 'igs/rest/mrfs';
        super(options);
        /**
         * @private
         * @member Zondy.Service.QueryServiceBase.prototype.resultCallBack
         * @type {Object}
         * @description  返回结果回调
         */
        this.resultCallBack = options.resultCallBack !== undefined ? options.resultCallBack : null;

        /**
         * @private
         * @member Zondy.Service.QueryServiceBase.prototype.queryParam
         * @type {Zondy.Object.QueryByLayerParameter}
         * @description  查询参数信息
         */
        this.queryParam = options.queryParam !== undefined ? options.queryParam : null;

        /**
         * @private
         * @member Zondy.Service.QueryServiceBase.prototype.queryParam
         * @type {String}
         * @description  请求方式 GET|POST
         */
        this.requestType = options.requestType !== undefined ? options.requestType : 'GET';
    }

    /**
     * @description 处理查询结果，并调用用户回调将结果返回给用户
     * @function   Zondy.Service.QueryServiceBase.prototype.processResult
     * @param jsonObj - {Object} 参数json对象。
     */
    processResult(jsonObj) {
        var rltObj = new FeatureSet();
        copyExcluce(rltObj, jsonObj, 'succeed');
        this.resultCallBack(rltObj);
    }

    /**
     * @description 处理json对象的结果
     * @function   Zondy.Service.QueryServiceBase.prototype.processGeoJsonResult
     * @param jsonObj - {Object} 参数json对象。
     */
    processGeoJsonResult(jsonObj) {
        var rltObj = {};
        copyExcluce(rltObj, jsonObj, 'succeed');
        this.resultCallBack(rltObj);
    }

    /**
     * @description 开始查询
     * @function   Zondy.Service.QueryServiceBase.prototype.restQuery
     * @param restUrl - {String} 查询路径。
     * @param dataObject - {Object} 数据对象。<br>
     * @param onSuccess - {Function} 查询成功回调函数。<br>
     * @param way - {String} 请求方式。<br>
     * @param onError - {Function} 查询失败回调函数。<br>
     * @param resultFormat - {String} 结果返回格式。
     */
    restQuery(restUrl, dataObject, onSuccess, way, onError, resultFormat) {
        var me = this;
        me.resultCallBack = onSuccess;
        var service = new IgsServiceBase(restUrl, {
            eventListeners: {
                scope: me,
                processCompleted: resultFormat !== 'geojson' ? me.processResult : me.processGeoJsonResult,
                processFailed: onError
            }
        });
        if (way === 'GET') {
            service.processAsync();
        } else {
            service.processAsync({
                method: 'POST',
                data: JSON.stringify(dataObject),
                headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
            });
        }
    }

    /**
     * @description 执行查询
     * @function   Zondy.Service.QueryServiceBase.prototype.query
     * @param onSuccess - {Function} 查询成功回调函数。
     * @param onError - {Function} 查询失败回调函数。
     * @param requestType - {Boolean} 响应类型。
     */
    query(onSuccess, onError, requestType) {
        if (this.queryParam === null) {
            return;
        }
        var fullRestUrl = '';

        if (this.queryParam instanceof QueryParameter) {
            fullRestUrl = this.getFullUrl();
        } else {
            return;
        }
        var way = '';
        var dataObject = null;
        if (!requestType) {
            if (!this.requestType) {
                way = 'GET';
            } else {
                way = this.requestType;
            }
        } else {
            way = requestType;
        }
        if (way.toUpperCase() === 'GET') {
            fullRestUrl += '?' + this.queryParam.getParameterURL();
            // @date 20181022 邬俊惠 必须encodeURI,避免url中出现特殊字符导致请求出错
            // @date 20200925 潘卓然 这里由于原来的 fullRestUrl = this.getFullUrl(); 是encode的，
            // 导致上面的this.queryParam.getParameterURL()这部分没有编码，因此原来是在后面加了下面一行来确保编码
            // 但是由于.NET能够处理2次encode的问题，JAVA不能处理所以统一换成了1次encode，后面不需要放开这段代码
            // fullRestUrl = encodeURI(fullRestUrl);
        } else {
            // dataObject = encodeURI(this.queryParam.getParameterObject());
            // @date 20201126 潘卓然 encodeURI移动到restQuery中处理，实际情况按照具体的NET/Java版本分析
            dataObject = this.queryParam.getParameterObject();
        }
        this.restQuery(fullRestUrl, dataObject, onSuccess, way, onError, this.queryParam.resultFormat.toLowerCase());
    }
}
export { QueryServiceBase };
Zondy.Service.QueryServiceBase = QueryServiceBase;
