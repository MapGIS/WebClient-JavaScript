import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 创新中心-潘卓然
 * @class module:PostGIS.PostgisVectorTileService
 * @param {PostgisQueryParameter} option 查询条件
 * @param {String} [option.path] {数据库名}/{工作空间名}/{表名}
 * @param {String} [option.version] 版本号
 * @param {Number} [option.tileMatrix] 图层放大缩小等级
 * @param {Number} [option.tileRow] 瓦片行号
 * @param {Number} [option.tileCol] 瓦片列号
 */
export class PostgisVectorTileService extends DataStoreService {
    constructor(option) {
        super(option);

        /**
         * @member module:PostGIS.PostgisVectorTileService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/datastore/rest/dataset/pg/vectortile/';
        /**
         * @member module:PostGIS.PostgisVectorTileService.prototype.path
         * @description 库名称
         */
        this.path = option.path;
        /**
         * @member module:PostGIS.PostgisVectorTileService.prototype.version
         * @description 版本号
         */
        this.version = option.version;
        /**
         * @member module:PostGIS.PostgisVectorTileService.prototype.tileMatrix
         * @description 图层放大缩小等级
         */
        this.tileMatrix = option.tileMatrix;
        /**
         * @member module:PostGIS.PostgisVectorTileService.prototype.tileRow
         * @description 瓦片行号
         */
        this.tileRow = option.tileRow;
        /**
         * @member module:PostGIS.PostgisVectorTileService.prototype.tileCol
         * @description 瓦片列号
         */
        this.tileCol = option.tileCol;

        this.fixOption(option);
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption(option) {
        this.option = {
            version: option.version,
            tileMatrix: option.tileMatrix,
            tileRow: option.tileRow,
            tileCol: option.tileCol
        };
    }

    /**
     * @function module:PostGIS.PostgisVectorTileService.prototype.getWmtsUrl
     * @description 获取实时矢量瓦片的WMTS的实时WMTS接口
     */
    getWmtsUrl() {
        let { serviceUrl, path, option } = this;
        serviceUrl += path;
        let url = this.getFullUrl(serviceUrl, option);
        url = decodeURI(url);
        return url;
    }

    /**
     * @description 查询函数，向服务器发送请求,返回地名地址格式数据
     * @function module:PostGIS.PostgisVectorTileService.prototype.query
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

export default PostgisVectorTileService;
Zondy.DataStore.PostGIS.PostgisVectorTileService = PostgisVectorTileService;
