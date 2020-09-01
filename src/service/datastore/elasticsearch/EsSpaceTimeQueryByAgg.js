import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 基础平台-潘卓然
 * @class module:弹性搜索服务.EsSpaceTimeQueryByAgg
 * @classdesc 时空聚类服务
 * @description Zondy.DataStore.ElasticSearch.EsSpaceTimeQueryByAgg-获取指定范围内的指定时间段的聚类情况
 * @param {Object} option 属性键值对
 * @param {String} option.indexName 地址库名称
 * @param {String} [option.typeName=sptype] Es中type名称，DataStore中为时空库
 * @param {String} option.aggfield 聚合的几何字段
 * @param {String} option.spatialCondition 空间范围
 * @param {String} option.timefield 时间字段
 * @param {String} option.timeCondition 时间范围
 * @param {Number} option.aggGeoFormat 聚合返回格式
 * @param {Number} option.percision 查询精度/对应elasticsearch的percision
 * @see https://shimo.im/docs/1d579d6a082a4631
 * @example http://192.168.91.125:9093/es/stGeoHashQueryByAgg?
 * indexName=sp_taxibj_200_2
 * &typeName=sptype
 * &aggfield=geometry
 * &spatialCondition=polygon:29.843798,121.58775;29.843746,121.586464;29.845467,121.5646
 * &timefield=GPS_DateTime
 * &timeCondition=1351737960000,1351738020000
 * &aggGeoFormat=0
 * &percision=4
 */
export default class EsSpaceTimeQueryByAgg extends DataStoreService {
    constructor(option) {
        let options = option || {};
        super(options);

        /**
         * @private
         */
        this.options = option;

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.serviceUrl
         * @type {String}
         * @description 时空聚类查询地址
         * @default /es/stQueryByAgg
         */
        this.serviceUrl = '/es/stQueryByAgg';

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.indexName
         * @type {String}
         * @description 地址库名称
         * @default null
         */
        this.indexName = options.indexName !== undefined ? options.indexName : null;

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.typeName
         * @type {String}
         * @description Es中type名称，DataStore中为时空库
         * @default null
         */
        this.typeName = options.typeName !== undefined ? options.typeName : null;

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.aggfield
         * @type {String}
         * @description 空间字段
         * @default null
         */
        this.aggfield = options.aggfield !== undefined ? options.aggfield : null;

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.spatialCondition
         * @type {String}
         * @description 空间状态
         * @default null
         * @example polygon:29.843798,121.58775;29.843746,121.586464;29.845467,121.5646
         */
        this.spatialCondition = options.spatialCondition !== undefined ? options.spatialCondition : null;

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.timefield
         * @type {String}
         * @description 时间字段
         * @default null
         */
        this.timefield = options.timefield !== undefined ? options.timefield : null;

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.timeCondition
         * @type {String}
         * @description 时间状态
         * @default null
         * @example 1351737960000,1351738020000
         */
        this.timeCondition = options.timeCondition !== undefined ? options.timeCondition : null;

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.aggGeoFormat
         * @type {Number}
         * @description 返回格式
         * @default null
         */
        this.aggGeoFormat = options.aggGeoFormat !== undefined ? options.aggGeoFormat : null;

        /**
         * @member module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.percision
         * @type {Number}
         * @description 聚类精度
         * @default null
         */
        this.percision = options.percision !== undefined ? options.percision : 8;
    }

    /**
     * @description 查询函数，向服务器发送请求,返回geosjon格式数据
     * @function module:弹性搜索服务.EsSpaceTimeQueryByAgg.prototype.query
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    query(onSuccess, onError) {
        let { serviceUrl, options } = this;
        let url = this.getFullUrl(serviceUrl, options);
        this.get(url, onSuccess, onError);
    }
}
export { EsSpaceTimeQueryByAgg };
Zondy.DataStore.ElasticSearch.EsSpaceTimeQueryByAgg = EsSpaceTimeQueryByAgg;
