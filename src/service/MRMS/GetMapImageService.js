import {Zondy} from '../common/Base';
import {MapServiceBase}  from  "./MapServiceBase";
import {MapType}  from  "../common/EnumComm";
/**
 * 地图图片服务
 * @class module:地图服务.GetMapImageService
 * @classdesc 图层图片服务
 * @description Zondy.Service.GetMapImageService
 * @extends  Zondy.Service.MapServiceBase
 * @param {Object} option 属性键值对
 * @param {String} [option.mapName= null] 地图名称
 * @param {Object} [option.mapType= MapType.Doc] 图片的格式
 * @param {Number} [option.level= 0] 动态裁图的级数
 * @param {Number} [option.row= 0] 行号
 * @param {Number} [option.col= 0] 列号
 * @param {String} [option.picType= gif] 图片的格式
 * @param {Number} [option.picWidth=512] 图片的宽度
 * @param {Number} [option.picHeight=512] 图片的高度
 * @param {Number} [option.xmin=null] 矢量图的x坐标最小值
 * @param {Number} [option.xmax=null] 矢量图的x坐标最大值
 * @param {Number} [option.ymin=null] 矢量图的y坐标最小值
 * @param {Number} [option.ymax=null] 矢量图的y坐标最大值
 */
class GetMapImageService extends MapServiceBase {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.GetMapImageService.prototype.mapName
         * @type {String}
         * @description 地图名称
         * @default null
         */
        this.mapName = options.mapName !== undefined ? options.mapName : null;

        /**
         * @private
         * @member Zondy.Service.GetMapImageService.prototype.mapName
         * @type {String}
         * @description 地图类型
         * @default null
         */
        this.mapType = options.mapType !== undefined ? options.mapType : MapType.Doc;

        if (this.mapType === MapType.Tile) {
            /*仅在获取瓦片地图图片时有意义。对于采用“动态裁切瓦片”方式，发布的矢量地图文档同样适用*/

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.level
             * @type {Number}
             * @description 动态裁图的级数
             * @default 0
             */
            this.level = options.level !== undefined ? options.level : 0;

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.row
             * @type {Number}
             * @description 行号
             * @default 0
             */
            this.row = options.row !== undefined ? options.row : 0;

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.col
             * @type {Number}
             * @description 列号
             * @default 0
             */
            this.col = options.col !== undefined ? options.col : 0;
        } else {
            /*仅在获取地图文档图片时有意义*/

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.picType
             * @type {String}
             * @description 图片的格式
             * @default gif
             */
            this.picType = options.picType !== undefined ? options.picType : "gif";

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.picWidth
             * @type {Number}
             * @description 图片的宽度
             * @default 512
             */
            this.picWidth = options.picWidth !== undefined ? options.picWidth : 512;

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.picHeight
             * @type {Number}
             * @description 图片的高度
             * @default 512
             */
            this.picHeight = options.picHeight !== undefined ? options.picHeight : 512;

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.xmin
             * @type {Number}
             * @description 矢量图的x坐标最小值
             * @default null
             */
            this.xmin = options.xmin !== undefined ? options.xmin : null;

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.xmax
             * @type {Number}
             * @description 矢量图的x坐标最大值
             * @default null
             */
            this.xmax = options.xmax !== undefined ? options.xmax : null;

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.ymin
             * @type {Number}
             * @description 矢量图的y坐标最小值
             * @default null
             */
            this.ymin = options.ymin !== undefined ? options.ymin : null;

            /**
             * @private
             * @member Zondy.Service.GetMapImageService.prototype.ymax
             * @type {Number}
             * @description 矢量图的y坐标最大值
             * @default null
             */
            this.ymax = options.ymax !== undefined ? options.ymax : null;
        }
    }

    /**
     * @description 获取地图文档/瓦片地图图片
     * @function  Zondy.Service.GetMapImageService.prototype.GetImage
     * @return URL{string} 取图地址
     * @example
     //创建获取瓦片图片信息服务
     var MapImageService = new Zondy.Service.GetMapImageService({
                    //指定类型为瓦片
                    dataType: Zondy.Enum.Map.MapType.Tile,
                    //发布的瓦片名称
                    mapName: 'WORLDTILE',
                    //设置级数
                    level: 0,
                    //行号
                    row: 0,
                    //列号
                    col: 0,
                    //IP地址
                    ip: "develop.smaryun.com",
                    //端口号
                    port: "6163"
                });
     //获取瓦片图片url路径
     var tileUrl = MapImageService.GetImage();
     console.log(tileUrl);
     */
    GetImage() {
        if (this.mapName) {
            if (this.mapType === MapType.Tile) {
                this.partUrl = "tile/" + this.mapName + "?"
                    + "lvl=" + this.level
                    + "&row=" + this.row
                    + "&col=" + this.col;
            }
            else {
                this.partUrl = "map/" + this.mapName + "?"
                    + "width=" + this.picWidth
                    + "&height=" + this.picHeight
                    + "&f=" + this.picType;
                if (this.xmin !== null && this.xmax !== null && this.ymin !== null && this.ymax !== null) {
                    this.partUrl += "&xmin=" + this.xmin
                        + "&ymin=" + this.ymin
                        + "&xmax=" + this.xmax
                        + "&ymax=" + this.ymax;
                }
            }
            var url = this.getFullUrl();
            return url;
        }
        return null;
    }
}
export {GetMapImageService};
Zondy.Service.GetMapImageService = GetMapImageService;