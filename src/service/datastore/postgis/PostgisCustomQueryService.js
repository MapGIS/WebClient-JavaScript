import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 创新中心-潘卓然
 * @class module:PostGIS.PostgisCustomQueryService
 * @param {PostgisQueryParameter} option 查询条件
 * @param {String} [option.path] 库名称
 * @param {String} [option.queryBody] 查询sql语句，如：select * from hunan01.dltb2005 where 地类编码 == 1011 limit 1
 */
export class PostgisCustomQueryService extends DataStoreService {
    constructor(option) {
        super(option);

        /**
         * @member module:PostGIS.PostgisCustomQueryService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/datastore/rest/dataset/pg/executequery/';
        /**
         * @member module:PostGIS.PostgisCustomQueryService.prototype.path
         * @description 库名称
         */
        this.path = option.path;
        /**
         * @member module:PostGIS.PostgisCustomQueryService.prototype.queryBody
         * @description 查询sql语句，如：
         * select * from hunan01.dltb2005 where 地类编码 == 1011 limit 1
         */
        this.queryBody = option.queryBody;

        this.fixOption(option);
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption(option) {
        this.option = {
            queryBody: option.queryBody
        };
    }

    /**
     * @description 查询函数，向服务器发送请求,返回地名地址格式数据
     * @function module:PostGIS.PostgisCustomQueryService.prototype.query
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

export default PostgisCustomQueryService;
Zondy.DataStore.PostGIS.PostgisCustomQueryService = PostgisCustomQueryService;
