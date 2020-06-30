import {Zondy} from '../common/Base';
import {OverlayBase}  from  "./OverlayBase";

/**
 * 多边形叠加
 * @class module:分析服务.OverlayByPolygon
 * @classdesc Zondy.Service.OverlayByPolygon 多边形叠加
 * @extends Zondy.Service.OverlayBase
 * @param {Object} option 属性键值对
 * @param {String} [option.strGRegionXML = null] 多边形坐标序列化对象
 * @param {String} [option.inFormat = null] 多边形字符串输入格式
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 //显示结果的图层名称
 var resultname = resultBaseUrl + "overLayByPolyAnalysisResultLayer" + self.getCurentTime();
 //设置叠加空间几何信息
 var geoRegion = new Zondy.Object.GRegion([
 new Zondy.Object.AnyLine([new Zondy.Object.Arc([
 new Zondy.Object.Point2D(114, 30),
 new Zondy.Object.Point2D(25, 49),
 new Zondy.Object.Point2D(53, 17),
 new Zondy.Object.Point2D(44, 30.36),
 new Zondy.Object.Point2D(114, 30)
 ], 0)])
 ], 0);
 //实例化OverlayByPolygon类
 var overlayParam = new Zondy.Service.OverlayByPolygon({
                    //IGServer所在ip地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口号
                    port: "6163",
                    //设置被叠加图层URL
                    srcInfo1: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区",
                    //设置结果URL
                    desInfo: resultname,
                    //设置多边形坐标序列化对象
                    strGRegionXML: JSON.stringify(geoRegion),
                    //多边形字符串输入格式
                    inFormat: "json",
                    //设置结果图层的图形参数信息
                    infoOptType: 2,
                    //求交
                    overType: 1,
                    //允许重算面积
                    isReCalculate: true,
                    //容差半径
                    radius: 0.05
                });
 overlayParam.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class OverlayByPolygon extends OverlayBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.OverlayByPolygon.prototype.strGRegionXML
         * @type {String}
         * @description 多边形坐标序列化对象
         * @default null
         */
        this.strGRegionXML = options.strGRegionXML !== undefined ? options.strGRegionXML : null;

        /**
         * @private
         * @member Zondy.Service.OverlayByPolygon.prototype.inFormat
         * @type {String}
         * @description 多边形字符串输入格式
         * @default "json"
         */
        this.inFormat = options.inFormat !== undefined ? options.inFormat : "json";

        /**
         * @private
         * @member Zondy.Service.OverlayByPolygon.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600237"
         */
        this.flowID = "600237";
    }
}
export {OverlayByPolygon};
Zondy.Service.OverlayByPolygon = OverlayByPolygon;