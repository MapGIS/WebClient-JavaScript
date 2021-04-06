import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 基础平台-王魁帅
 * @class module:弹性搜索服务.ESGeoDecode
 * @description Zondy.DataStore.ElasticSearch.ESGeoDecode-根据给定的地理位置及半径检索地名，返回地名地址详细信息。
 * @param {Object} option 属性键值对
 * @param {String} [option.indexName] 必选。数据库名
 * @param {String} [option.province] 可选。省约束信息
 * @param {String} [option.city] 可选。市约束信息
 * @param {String} [option.bbox] 可选。矩形范围信息
 * @param {String} [option.geometry] 可选。多边形过滤条件
 * @param {String} [option.filter] 可选。过滤条件
 * @param {Double} [option.lon] 必选。经度
 * @param {Double} [option.lat] 必选。纬度
 * @param {Double} [option.dis=0.1] 可选。半径，默认单位是千米
 * @param {Int} [option.pageSize=100] 可选。每页大小
 * @param {Int} [option.pageNo=1] 可选。页码，从1开始
 * @see https://shimo.im/docs/1d579d6a082a4631
 */
export default class ESGeoDecode extends DataStoreService {
    constructor(option) {
        super(option);

        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.serviceUrl
         * @type {String}
         * @description es逆地址解析服务地址
         * @default /addressservice/es/location/geodecode/
         */
        this.serviceUrl = '/addressservice/es/location/geodecode/';
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.indexName
         * @type {String}
         * @description 库名称
         * @default null
         */
        this.indexName = option.indexName !== undefined ? option.indexName : null;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.province
         * @type {String}
         * @description 省约束信息
         * @default null
         */
        this.province = option.province !== undefined ? option.province : null;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.city
         * @type {String}
         * @description 市约束信息
         * @default null
         */
        this.city = option.city !== undefined ? option.city : null;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.bbox
         * @type {String}
         * @description 矩形范围信息
         * @default null
         */
        this.bbox = option.bbox !== undefined ? option.bbox : null;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.geometry
         * @type {String}
         * @description 多边形过滤条件
         * @default null
         */
        this.geometry = option.geometry !== undefined ? option.geometry : null;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.filter
         * @type {String}
         * @description 过滤条件
         * @default null
         */
        this.filter = option.filter !== undefined ? option.filter : null;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.lon
         * @type {Double}
         * @description 经度
         * @default null
         */
        this.lon = option.lon !== undefined ? option.lon : null;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.lat
         * @type {Double}
         * @description 每页大小
         * @default null
         */
        this.lat = option.lat !== undefined ? option.lat : null;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.dis
         * @type {Double}
         * @description 半径，默认单位是千米
         * @default 0.1
         */
        this.dis = option.dis !== undefined ? option.dis : 0.1;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.pageSize
         * @type {Int}
         * @description 每页大小
         * @default 100
         */
        this.pageSize = option.pageSize !== undefined ? option.pageSize : 100;
        /**
         * @member module:弹性搜索服务.ESGeoDecode.prototype.pageNo
         * @type {Int}
         * @description 页码，从1开始
         * @default 1
         */
        this.pageNo = option.pageNo !== undefined ? option.pageNo : 1;

        this.fixOption();
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption() {
        this.option = {
            province: this.province,
            city: this.city,
            bbox: this.bbox,
            geometry: this.geometry,
            filter: this.filter,
            lon: this.lon,
            lat: this.lat,
            dis: this.dis,
            pageSize: this.pageSize,
            pageNo: this.pageNo
        };
    }

    /**
     * @description 查询函数，向服务器发送请求,返回geosjon格式数据
     * @function module:弹性搜索服务.ESGeoDecode.prototype.query
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    query(onSuccess, onError) {
        let { serviceUrl, option, indexName } = this;
        serviceUrl = serviceUrl + indexName;
        let url = this.getFullUrl(serviceUrl, option);
        this.get(url, onSuccess, onError);
    }
}
export { ESGeoDecode };
Zondy.DataStore.ElasticSearch.ESGeoDecode = ESGeoDecode;
