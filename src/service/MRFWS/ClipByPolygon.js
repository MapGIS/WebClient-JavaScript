import {
    Zondy
} from '../common/Base';
import {
    ClipBase
} from "./ClipBase";

/**
 * 多边形裁剪
 * @class module:分析服务.ClipByPolygon
 * @classdesc Zondy.Service.ClipByPolygon 多边形裁剪
 * @extends Zondy.Service.ClipBase
 * @param {Object} option 属性键值对
 * @param {String} [option.srcInfo = null] 源图层URL
 * @param {String} [option.strPos = null] 多边形点坐标串。strPos为STRING格式，内容是多边形几个点坐标：x1,y1,x2,y2....
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 var resultname = resultBaseUrl + "clipByCircleAnalysisResultLayer" + self.getCurentTime();
 //实例化ClipByLayer类
 //实例化ClipByPolygon类develop.smaryun.com
 var clipParam = new Zondy.Service.ClipByPolygon({
                    //IGServer所在ip地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口号
                    port: "6163"
                });
 //设置被裁剪图层URL
 clipParam.srcInfo = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区";
 //设置结果URL
 clipParam.desInfo = resultname;
 //多边形点坐标串
 clipParam.strPos = "0.46, 30.1,11.48, 6.22,36.73, 7.6,58.77, 25.51,41.33, 49.39, 0.46, 30.1";
 clipParam.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class ClipByPolygon extends ClipBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ClipByPolygon.prototype.srcInfo
         * @type {String}
         * @description 源图层URL
         * @default null
         */
        this.srcInfo = options.srcInfo !== undefined ? options.srcInfo : null;

        /**
         * @private
         * @member Zondy.Service.ClipByPolygon.prototype.strPos
         * @type {String}
         * @description 多边形点坐标串。strPos为STRING格式，内容是多边形几个点坐标：x1,y1,x2,y2....
         * @default null
         */
        this.strPos = options.strPos !== undefined ? options.strPos : null;

        /**
         * @private
         * @member Zondy.Service.ClipByPolygon.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600228"
         */
        this.flowID = "600228";
    }
}
export {
    ClipByPolygon
};
Zondy.Service.ClipByPolygon = ClipByPolygon;