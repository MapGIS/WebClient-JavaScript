import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 创新中心-潘卓然
 * @class module:PostGIS.PostgisCatlogService
 * @param {PostgisQueryParameter} option 查询条件
 * @param {String} [option.path] 库名称
 * @param {Boolean} [option.classify = true] 类别，地址库、时空库等
 * @param {String} [option.keyWords] 关键字
 */
export class PostgisCatlogService extends DataStoreService {
    constructor(option) {
        super(option);

        /**
         * @member module:PostGIS.PostgisCatlogService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/datastore/rest/catalog/pg/services/';
        /**
         * @member module:PostGIS.PostgisCatlogService.prototype.path
         * @description 库名称
         */
        this.path = option.path;
        /**
         * @member module:PostGIS.PostgisCatlogService.prototype.classify
         * @description 类别，地址库、时空库等
         */
        this.classify = option.classify;
        /**
         * @member module:PostGIS.PostgisCatlogService.prototype.keyWords
         * @description 关键字
         */
        this.keyWords = option.keyWords;

        this.fixOption(option);
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption(option) {
        this.option = {
            classify: option.classify,
            keyWords: option.keyWords,
            pageSize: option.pageSize,
            pageNo: option.pageNo
        };
    }

    /**
     * @description 查询函数，向服务器发送请求,返回地名地址格式数据
     * @function module:PostGIS.PostgisCatlogService.prototype.query
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

export default PostgisCatlogService;
Zondy.DataStore.PostGIS.PostgisCatlogService = PostgisCatlogService;
