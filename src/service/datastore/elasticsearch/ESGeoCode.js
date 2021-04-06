import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 基础平台-王魁帅
 * @class module:弹性搜索服务.ESGeoCode
 * @description Zondy.DataStore.ElasticSearch.ESGeoCode-根据给定的关键字检索对应的地名地址，返回地名地址详细信息列表。
 * @param {Object} option 属性键值对
 * @param {String} [option.indexName] 必选。数据库名
 * @param {String} [option.province] 可选。省约束信息
 * @param {String} [option.city] 可选。市约束信息
 * @param {String} [option.keyWord=""] 可选。查询关键字
 * @param {String} [option.bbox] 可选。矩形范围信息
 * @param {String} [option.geometry] 可选。多边形过滤条件
 * @param {String} [option.filter] 可选。过滤条件
 * @param {Int} [option.pageSize=100] 可选。每页大小
 * @param {Int} [option.pageNo=1] 可选。页码，从1开始
 * @see https://shimo.im/docs/1d579d6a082a4631
 */
export default class ESGeoCode extends DataStoreService {
    constructor(option) {
        super(option);

        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.serviceUrl
         * @type {String}
         * @description es地理编码服务地址
         * @default /addressservice/es/location/geocode/
         */
        this.serviceUrl = '/addressservice/es/location/geocode/';
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.indexName
         * @type {String}
         * @description 库名称
         * @default null
         */
        this.indexName = option.indexName !== undefined ? option.indexName : null;
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.province
         * @type {String}
         * @description 省约束信息
         * @default null
         */
        this.province = option.province !== undefined ? option.province : null;
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.city
         * @type {String}
         * @description 市约束信息
         * @default null
         */
        this.city = option.city !== undefined ? option.city : null;
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.keyWord
         * @type {String}
         * @description 查询关键字
         * @default ''
         */
        this.keyWord = option.keyWord !== undefined ? option.keyWord : '';
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.bbox
         * @type {String}
         * @description 矩形范围信息
         * @default null
         */
        this.bbox = option.bbox !== undefined ? option.bbox : null;
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.geometry
         * @type {String}
         * @description 多边形过滤条件
         * @default null
         */
        this.geometry = option.geometry !== undefined ? option.geometry : null;
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.过滤条件
         * @type {String}
         * @description 数据分类
         * @default null
         */
        this.filter = option.filter !== undefined ? option.filter : null;
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.pageSize
         * @type {Int}
         * @description 每页大小
         * @default 100
         */
        this.pageSize = option.pageSize !== undefined ? option.pageSize : 100;
        /**
         * @member module:弹性搜索服务.ESGeoCode.prototype.pageNo
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
            keyWord: this.keyWord,
            bbox: this.bbox,
            geometry: this.geometry,
            filter: this.filter,
            pageSize: this.pageSize,
            pageNo: this.pageNo
        };
    }

    /**
     * @description 查询函数，向服务器发送请求,返回geosjon格式数据
     * @function module:弹性搜索服务.ESGeoCode.prototype.query
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
export { ESGeoCode };
Zondy.DataStore.ElasticSearch.ESGeoCode = ESGeoCode;
