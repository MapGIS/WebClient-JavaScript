import { EsCatlogType } from './Enum';
import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 基础平台-潘卓然
 * @class module:弹性搜索服务.EsCatlogService
 * @classdesc 枚举目录树结果
 * @description Zondy.DataStore.ElasticSearch.EsCatlogService-根据数据库结构枚举目录，枚举库列表、表列表
 * @param {Object} option 属性键值对
 * @param {String} [option.indexName] 库名称
 * @param {EsCatlogType} [option.classify] 类别，地址库、时空库等
 * @param {String} [option.keyWords] 关键字
 * @param {Number} [option.pageSize = 100] 每页大小
 * @param {Number} [option.pageNo = 1] 页码，从1开始
 * @see https://shimo.im/docs/1d579d6a082a4631
 * @example http://192.168.96.101:9091/datastore/rest/catalog/es/services/?
 * indexName=sp_taxibj_200_2
 * &classify=sptype
 * &keyWords='出租车'
 * &pageSize=0
 * &pageNo=4
 */
export default class EsCatlogService extends DataStoreService {
    constructor(option) {
        let options = option || {};
        super(options);

        /**
         * @member module:弹性搜索服务.EsCatlogService.prototype.serviceUrl
         * @type {String}
         * @description 时空聚类查询地址
         * @default /datastore/rest/catalog/es/services/
         */
        this.serviceUrl = '/datastore/rest/catalog/es/services/';

        /**
         * @member module:弹性搜索服务.EsCatlogService.prototype.indexName
         * @type {String}
         * @description 库名称
         * @default null
         */
        this.indexName = options.indexName !== undefined ? options.indexName : null;

        /**
         * @member module:弹性搜索服务.EsCatlogService.prototype.classify
         * @type {String}
         * @description 类别，地址库、时空库等
         * @default null
         */
        this.classify = options.classify !== undefined ? options.classify : null;

        /**
         * @member module:弹性搜索服务.EsCatlogService.prototype.keyWords
         * @type {String}
         * @description 关键字
         * @default null
         */
        this.keyWords = options.keyWords !== undefined ? options.keyWords : null;

        /**
         * @member module:弹性搜索服务.EsCatlogService.prototype.pageSize
         * @type {Number}
         * @description 每页大小
         * @default null
         */
        this.pageSize = options.pageSize !== undefined ? options.pageSize : 100;

        /**
         * @member module:弹性搜索服务.EsCatlogService.prototype.pageNo
         * @type {Number}
         * @description 页码，从1开始
         * @default null
         */
        this.pageNo = options.pageNo !== undefined ? options.pageNo : 1;
    }

    /**
     * @description 查询函数，向服务器发送请求,返回geosjon格式数据
     * @function module:弹性搜索服务.EsCatlogService.prototype.query
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    query(onSuccess, onError) {
        let { serviceUrl, params } = this;
        let url = this.getFullUrl(serviceUrl, params);
        this.get(url, onSuccess, onError);
    }
}
export { EsCatlogService };
Zondy.DataStore.ElasticSearch.EsCatlogService = EsCatlogService;
