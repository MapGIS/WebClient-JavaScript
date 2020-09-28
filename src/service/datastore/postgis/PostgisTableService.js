import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 创新中心-潘卓然
 * @class module:PostGIS.PostgisTableService
 * @param {PostgisQueryParameter} option 查询条件
 * @param {String} option.path 库名称/工作空间
 * @param {String} option.tableNames 表名，多个用逗号分隔，如：X431102TDXZ2005GDLTB,dltb2005
 * @example 
 * let param = {
        networkProtocol: 'http',
        ip: '192.168.96.101',
        port: 9091,
        path: 'bigdata03/bigdata03',
        tableNames: 'mpf24091'
    };
    let catlog = new Zondy.DataStore.PostGIS.PostgisTableService(param);
 */
export class PostgisTableService extends DataStoreService {
    constructor(option) {
        super(option);

        /**
         * @member module:PostGIS.PostgisTableService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/datastore/rest/dataset/pg/schema/';
        /**
         * @member module:PostGIS.PostgisTableService.prototype.path
         * @description 库名称/工作空间
         */
        this.path = option.path;
        /**
         * @member module:PostGIS.PostgisTableService.prototype.tableNames
         * @description 表名，多个用逗号分隔，如：X431102TDXZ2005GDLTB,dltb2005
         */
        this.tableNames = option.tableNames;

        this.fixOption(option);
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption(option) {
        this.option = {
            tableNames: option.tableNames
        };
    }

    /**
     * @description 查询函数，向服务器发送请求,返回地名地址格式数据
     * @function module:PostGIS.PostgisTableService.prototype.query
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    query(onSuccess, onError) {
        let { serviceUrl, path, option } = this;
        serviceUrl += path;
        let url = this.getFullUrl(serviceUrl, option);
        this.get(url, onSuccess, onError);
    }
}

export default PostgisTableService;
Zondy.DataStore.PostGIS.PostgisTableService = PostgisTableService;
