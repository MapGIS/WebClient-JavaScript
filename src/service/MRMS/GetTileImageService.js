import {Zondy} from '../common/Base';
import {MapServiceBase}  from  "./MapServiceBase";
/**
 * 地图图片服务
 * @class module:量算服务.GetTileImageService
 * @classdesc Zondy.Service.GetTileImageService 瓦片图片服务
 * @extends  Zondy.Service.MapServiceBase
 * @param {Object} option 属性键值对
 * @param {String} [option.hdfName= null] 地图名称
 * @param {Number} [option.level= 0] 动态裁图的级数
 * @param {Number} [option.row= 0] 行号
 * @param {Number} [option.col= 0] 列号
 */
class GetTileImageService extends MapServiceBase {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @member Zondy.Service.GetTileImageService.prototype.hdfName
         * @type {Number}
         * @description 地图名称
         * @default null
         */
        this.hdfName = options.hdfName !== undefined ? options.hdfName : null;

        /**
         * @member Zondy.Service.GetTileImageService.prototype.level
         * @type {Number}
         * @description 动态裁图的级数
         * @default 0
         */
        this.level = options.level !== undefined ? options.level : 0;

        /**
         * @member Zondy.Service.GetTileImageService.prototype.row
         * @type {Number}
         * @description 行号
         * @default 0
         */
        this.row = options.row !== undefined ? options.row : 0;

        /**
         * @member Zondy.Service.GetTileImageService.prototype.col
         * @type {Number}
         * @description 列号
         * @default 0
         */
        this.col = options.col !== undefined ? options.col : 0;
    }

    /**
     * @description 获取瓦片地图图片
     * @function  Zondy.Service.GetTileImageService.prototype.GetTileImage
     * @return URL{String} 取图地址
     * @example
     //创建获取瓦片信息服务
     var mapInfo = new Zondy.Service.GetMapInfoService({
                    //发布的瓦片名称
                    mapName: 'WORLDTILE',
                    //IP地址
                    ip: "develop.smaryun.com",
                    //端口号
                    port: "6163"
                });
     //获取瓦片图片信息，getDataSuccess为回调函数
     mapInfo.GetMapInfo(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    GetTileImage() {
        if (this.hdfName !== undefined) {
            this.partUrl = "tile/" + this.hdfName + "/" + this.level + "/" + this.row + "/" + this.col;
            var url = this.getFullUrl();
            return url;
        }
        return null;
    }
}
export {GetTileImageService};
Zondy.Service.GetTileImageService = GetTileImageService;