import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 基础平台-潘卓然
 * @class module:弹性搜索服务.EsTableService
 * @classdesc 枚举目录树结果
 * @description Zondy.DataStore.ElasticSearch.EsTableService-根据数据库结构枚举目录，枚举库列表、表列表
 * @param {Object} option 属性键值对
 * @param {String} [option.path] 库名称
 * @param {String} [option.tableNames] 表名，多个用逗号分隔，如：时空库
 * @see https://shimo.im/docs/1d579d6a082a4631
 * @example http://192.168.96.101:9091//datastore/rest/dataset/es/schema/{path}?
 * tableNames=sp_taxibj_200_2
 */
export default class EsTableService extends DataStoreService {
    constructor(option) {
        let options = option || {};
        super(options);

        /**
         * @member module:弹性搜索服务.EsTableService.prototype.serviceUrl
         * @type {String}
         * @description 时空聚类查询地址
         * @default /datastore/rest/dataset/es/schema/
         */
        this.serviceUrl = '/datastore/rest/dataset/es/schema/';

        /**
         * @member module:弹性搜索服务.EsTableService.prototype.indexName
         * @type {String}
         * @description 库名称
         * @default null
         */
        this.indexName = options.indexName !== undefined ? options.indexName : null;

        /**
         * @member module:弹性搜索服务.EsTableService.prototype.tableNames
         * @type {String}
         * @description 表名，多个用逗号分隔，如：时空库
         * @default null
         */
        this.tableNames = options.tableNames !== undefined ? options.tableNames : null;
    }

    /**
     * @description 查询函数，向服务器发送请求,返回geosjon格式数据
     * @function module:弹性搜索服务.EsTableService.prototype.query
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    query(onSuccess, onError) {
        let { serviceUrl, params, indexName } = this;
        serviceUrl = serviceUrl + indexName;
        let url = this.getFullUrl(serviceUrl, params);
        this.get(url, onSuccess, onError);
    }
}
export { EsTableService };
Zondy.DataStore.ElasticSearch.EsTableService = EsTableService;
