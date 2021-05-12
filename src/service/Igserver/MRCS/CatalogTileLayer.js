import { CatalogService } from './CatalogService';
import { IgsServiceBase } from '../../baseserver/IServiceBase';

/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:目录服务.TileLayer
 * @classdesc 瓦片图层类
 * @description Zondy.Catalog.TileLayer
 * @extends   Zondy.Catalog.CatalogService
 * @param option - {Object} 属性键值对。<br>
 * @param {String} [option.tileName = null] 瓦片名称
 * @param {String} [option.version = 2.0] 瓦片版本
 */
class TileLayer extends CatalogService {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Catalog.TileLayer.prototype.tileName
         * @type {String}
         * @description 瓦片名称
         * @default null
         */
        this.tileName = options.tileName !== undefined ? options.tileName : null;

        /**
         * @private
         * @member Zondy.Catalog.TileLayer.prototype.tileName
         * @type {String}
         * @description 瓦片版本
         * @default 2.0
         */
        this.version = options.version !== undefined ? options.version : '2.0';
    }

    /**
     * 获取指定瓦片列表
     * @function  Zondy.Catalog.TileLayer.prototype.getTileList
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var tileInfo=new Zondy.Catalog.TileLayer({
                    ip: "localhost",
                    port: "6163",
                });
     tileInfo.getTileList(function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    getTileList(onSuccess, onError) {
        var me = this;
        me.partUrl = 'tiles?f=json';
        if (this.version) {
            if (me.version === '2.0') {
                me.partUrl += '&v=2';
            } else {
                me.partUrl += '&v=' + me.version;
            }
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * 获取指定瓦片的详细信息
     * @function  Zondy.Catalog.TileLayer.prototype.getTileInfo
     * @description  返回指定瓦片的详细信息
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function}  失败回调函数。
     * @example
     var tileInfo=new Zondy.Catalog.TileLayer({
                    ip: "localhost",
                    port: "6163",
                    tileName: "CHINA4490"
                });
     tileInfo.getTileInfo(function(res){
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    getTileInfo(onSuccess, onError) {
        var me = this;
        me.partUrl = 'tiles/' + me.tileName + '?f=json';
        if (me.version) {
            me.partUrl += '&v=' + me.version;
        }
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }
}
export { TileLayer };
Zondy.Catalog.TileLayer = TileLayer;
