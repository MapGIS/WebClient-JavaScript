import {
    Zondy
} from '../common/Base';
import {
    MapServiceBase
} from "./MapServiceBase";
import {
    CProjectBySRSID
} from "../MRGS/CProjectBySRSID";
import {
    newGuid
} from "../common/Util";

/**
 * 地图文档图片服务
 * @class module:地图服务.GetDocImageService
 * @classdesc Zondy.Service.GetDocImageService 取矢量地图文档图片，若采用动态裁切瓦片方式发布的矢量地图文档，可取指定行列号的矢量地图图片；
 * 若采用普通方式发布的矢量地图文档，可取一定范围内的矢量地图图片，还可设置该地图文档的动态投影参考信息、显示条件、显示样式等信息
 * @param {Object} option 属性键值对
 * @param {String} [option.docName = null] 地图文档名称
 * @param {Boolean} [option.cache = false] 是否使用动态裁图功能
 * @param {Number} [option.level = 0] 动态裁图的级数
 * @param {Number} [option.row = 0] 行号
 * @param {Number} [option.col = 0] 列号
 * @param {Boolean} [option.update = false] 是否更新当前瓦片
 * @param {String} [option.layers = null] 该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @param {Zondy.Object.CDisplayStyle} [option.style = null] 图文档显示样式，该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @param {String} [option.picType = gif] 图片的格式 jpg|png|gif。该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @param {String} [option.bbox = null] 图片的范围xmin,ymin,xmax,ymax。该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @param {String} [option.filters = null] 图层过滤条件，1:ID>4,3:ID>1。该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @param {Number} [option.picWidth = 512] 图片的宽度。该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @param {Number} [option.picHeight = 512] 图片的高度。该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @param {Zondy.Service.CProjectBySRSID} [option.proj = null] 投影参照系信息。该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @param {String} [option.guid = new Guid()] 唯一标识。该参数，当cache为true时无效（仅在非动态裁图时有意义）
 * @see Zondy.Object.CDisplayStyle
 * @see Zondy.Service.CProjectBySRSID
 */
class GetDocImageService extends MapServiceBase {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.GetDocImageService.prototype.docName
         * @type {String}
         * @description 地图文档名称
         * @default null
         */
        this.docName = options.docName !== undefined ? options.docName : null;

        /**
         * @private
         * @member Zondy.Service.GetDocImageService.prototype.cache
         * @type {Boolean}
         * @description 是否使用动态裁图功能
         * @default false
         */
        this.cache = options.cache !== undefined ? options.cache : false;

        if (this.cache) {
            /* 以下参数，当cache为true时有效（仅在动态裁图时有意义）*/
            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.level
             * @type {Number}
             * @description 动态裁图的级数
             * @default 0
             */
            this.level = options.level !== undefined ? options.level : 0;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.row
             * @type {Number}
             * @description 行号
             * @default 0
             */
            this.row = options.row !== undefined ? options.row : 0;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.col
             * @type {Number}
             * @description 列号
             * @default 0
             */
            this.col = options.col !== undefined ? options.col : 0;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.update
             * @type {String}
             * @description 是否更新当前瓦片
             * @default false
             */
            this.update = options.update !== undefined ? options.update : false;
        } else {
            /* 以下参数，当cache为true时无效（仅在非动态裁图时有意义）*/
            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.layers
             * @type {String}
             * @description 需要被取图的图层序列号数组。以","分隔。默认为依据文档原始图层状态进行设置。[show：仅仅显示指定了图层序号的图层；hide：显示除hide参数指定图层外所有的图层；include：除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图层显示，追加的这些图层必须为地图中包含的图层；exclude：从默认图层列表里删除这些被指定的图层后，进行显示]
             * @default null
             */
            this.layers = options.layers !== undefined ? options.layers : null;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.style
             * @type {Zondy.Object.CDisplayStyle}
             * @description 地图文档显示样式
             * @default null
             */
            this.style = options.style !== undefined ? options.style : null;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.picType
             * @type {String}
             * @description 图片的格式，如jpg|png|gif
             * @default gif
             */
            this.picType = options.picType !== undefined ? options.picType : "gif";

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.bbox
             * @type {String}
             * @description 图片的范围(xmin,ymin,xmax,ymax)
             * @default null
             */
            this.bbox = options.bbox !== undefined ? options.bbox : null;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.filters
             * @type {String}
             * @description 图层过滤条件(1:ID>4,3:ID>1)
             * @default null
             */
            this.filters = options.filters !== undefined ? options.filters : null;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.picWidth
             * @type {Number}
             * @description 图片的宽度
             * @default 512
             */
            this.picWidth = options.picWidth !== undefined ? options.picWidth : 512;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.picHeight
             * @type {Number}
             * @description 图片的高度
             * @default 512
             */
            this.picHeight = options.picHeight !== undefined ? options.picHeight : 512;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.proj
             * @type {Zondy.Service.CProjectBySRSID}
             * @description 投影参照系信息
             * @default null
             */
            this.proj = options.proj !== undefined ? options.proj : null;

            /**
             * @private
             * @member Zondy.Service.GetDocImageService.prototype.guid
             * @type {Object}
             * @description 唯一标识
             * @default newGuid()
             */
            this.guid = options.guid !== undefined ? options.guid : newGuid();
        }
    }

    /**
     * @description 获取地图文档图片
     * @function   Zondy.Service.GetDocImageService.prototype.GetMapImage
     * @return URL{string} 取图地址
     * @example
     //创建获取地图文档图片信息服务
     var DocImageService = new Zondy.Service.GetDocImageService({
                    //发布的地图文档名称
                    docName: 'WorldJWEdit',
                    //图片宽
                    picWidth: 500,
                    //图片高
                    picHeight: 600,
                    //图片类型
                    picType: 'png',
                    //取图范围，依次是xmin、ymin、xmax、ymax
                    bbox: '50,0,140,90',
                    //IP地址
                    ip: "develop.smaryun.com",
                    //端口号
                    port: "6163"
                });
     //获取地图文档图片url路径
     var docUrl = DocImageService.GetMapImage();
     console.log(docUrl);
     */
    GetMapImage() {
        if (this.docName) {
            if (this.cache === true) {
                this.partUrl = "docs/" + this.docName + "?" +
                    "cache=" + this.cache.toString() +
                    "&level=" + this.level +
                    "&row=" + this.row +
                    "&col=" + this.col +
                    "&update=" + this.update.toString();
            } else {
                this.partUrl = "docs/" + this.docName + "?";
                if (this.bbox !== null) {
                    this.partUrl += "bbox=" + this.bbox;
                }
                if (this.picWidth !== null) {
                    this.partUrl += "&w=" + this.picWidth;
                }
                if (this.picHeight !== null) {
                    this.partUrl += "&h=" + this.picHeight;
                }
                if (this.layers !== null) {
                    this.partUrl += "&layers=" + this.layers;
                }
                if (this.filters !== null) {
                    this.partUrl += "&filters=" + encodeURI(this.filters);
                }
                if (this.style !== null) {
                    this.partUrl += "&style=" + JSON.stringify(this.style);
                }
                if (this.proj !== null) {
                    this.partUrl += "&proj=" + JSON.stringify(this.proj);
                }
                if (this.picType !== null) {
                    this.partUrl += "&f=" + this.picType;
                }
                if (this.guid !== null) {
                    this.partUrl += "&guid=" + this.guid;
                }
            }
            var url = this.getFullUrl();
            return url;
        }
        return null;
    }
}
export {
    GetDocImageService
};
Zondy.Service.GetDocImageService = GetDocImageService;