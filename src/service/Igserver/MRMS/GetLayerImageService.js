import {Zondy} from '../../common/Base';
import {MapServiceBase}  from  "./MapServiceBase";
import {CDisplayStyleExtend}  from  "../../common/CDisplayStyleExtend";

/**
 * 地图文档图片服务
 * @class module:地图服务.GetLayerImageService
 * @classdesc 图层图片服务
 * @description Zondy.Service.GetLayerImageService
 * @extends Zondy.Service.MapServiceBase
 * @param {Object} option 属性键值对
 * @param {String} [option.gdbps= null] 图层URL
 * @param {String} [option.picType= gif] 图片的格式
 * @param {Zondy.Object.CDisplayStyleExtend} [option.style= null] 图层显示样式
 * @param {String} [option.bbox=null] 图片范围
 * @param {String} [option.filters=null] 图层过滤条件
 * @param {Number} [option.picWidth=512] 图片的宽度
 * @param {Number} [option.picHeight=512] 图片的高度
 * @example
 //创建获取图层图片信息服务
 var LayerImageService = new Zondy.Service.GetLayerImageService({
                    //图层在数据库中的url
                    gdbps: 'gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mypntlayer',
                    //图片类型
                    picType: 'png',
                    //图片宽
                    picWidth: 500,
                    //图片高
                    picHeight: 600,
                    //取图范围，依次是xmin、ymin、xmax、ymax
                    bbox: '50,0,140,90',
                    //IP地址
                    ip: "develop.smaryun.com",
                    //端口号
                    port: "6163"
                });
 //获取图层图片url路径
 var layerUrl = LayerImageService.GetLayerImage();
 console.log(layerUrl);
 */
class GetLayerImageService extends MapServiceBase {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.GetLayerImageService.prototype.gdbps
         * @type {String}
         * @description 图层URL
         * @default null
         */
        this.gdbps = options.gdbps !== undefined ? options.gdbps : null;

        /**
         * @private
         * @member Zondy.Service.GetLayerImageService.prototype.picType
         * @type {String}
         * @description 图片的格式，如(jpg|png|gif)
         * @default  gif
         */
        this.picType = options.picType !== undefined ? options.picType : "gif";

        /**
         * @private
         * @member Zondy.Service.GetLayerImageService.prototype.style
         * @type {Zondy.Object.CDisplayStyleExtend}
         * @description 图层显示样式
         * @default  null
         */
        this.style = options.style !== undefined ? options.style : null;

        /**
         * @private
         * @member Zondy.Service.GetLayerImageService.prototype.bbox
         * @type {String}
         * @description 图片的范围(xmin,ymin,xmax,ymax)
         * @default  null
         */
        this.bbox = options.bbox !== undefined ? options.bbox : null;

        /**
         * @private
         * @member Zondy.Service.GetLayerImageService.prototype.filters
         * @type {String}
         * @description 图层过滤条件，1:ID>4,3:ID>1
         * @default  null
         */
        this.filters = options.filters !== undefined ? options.filters : null;

        /**
         * @private
         * @member Zondy.Service.GetLayerImageService.prototype.picWidth
         * @type {Number}
         * @description 图片的宽度
         * @default  512
         */
        this.picWidth = options.picWidth !== undefined ? options.picWidth : 512;

        /**
         * @private
         * @member Zondy.Service.GetLayerImageService.prototype.picHeight
         * @type {Number}
         * @description 图片的高度
         * @default  512
         */
        this.picHeight = options.picHeight !== undefined ? options.picHeight : 512;
    }

    /**
     * @description 获取图层图片
     * @function  Zondy.Service.GetLayerImageService.prototype.GetLayerImage
     * @return URL{String} 取图地址
     */
    GetLayerImage() {
        if (this.gdbps !== null && this.picWidth !== null && this.picHeight !== null) {
            this.partUrl = "layers?" + "f=" + this.picType;
            this.partUrl += "&gdbps=";
            this.gdbps.split(',');
            var gdbpsArr = this.gdbps.split(",");
            for (var i = 0; i < gdbpsArr.length; i++) {
                this.partUrl += gdbpsArr[i];
                if (i < (gdbpsArr.length - 1)) {
                    this.partUrl += ",";
                }
            }
            if (this.style !== null) {
                this.partUrl += "&style=" + JSON.stringify(this.style);
            }
            if (this.filters !== null) {
                this.partUrl += "&filters=" + this.filters;
            }

            if (this.bbox !== null) {
                this.partUrl += "&bbox=" + this.bbox;
            }
            this.partUrl += "&w=" + this.picWidth;
            this.partUrl += "&h=" + this.picHeight;

            var url = this.getFullUrl();
            return url;
        }
        return null;
    }
}
export {GetLayerImageService};
Zondy.Service.GetLayerImageService = GetLayerImageService;