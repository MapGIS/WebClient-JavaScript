import { Zondy } from '../../common/Base';
import { OverlayBase } from './OverlayBase';

/**
 * 图层叠加
 * @class module:分析服务.OverlayByLayer
 * @classdesc 图层叠加
 * @description Zondy.Service.OverlayByLayer 
 * @extends Zondy.Service.OverlayBase
 * @param {Object} option 属性键值对
 * @param {String} [option.srcInfo2 = null] 设置叠加图层URL
 * @param {Boolean} [option.calcRealAreaAndPerimeter = true] 是否计算真实的面积和周长，如果设置为true，则面积和周长返回结果为平方米
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 //结果图层的名称
 var resultname = resultBaseUrl + "overLayByLayerAnalysisResultLayer" + self.getCurentTime();
 //实例化OverlayByLayer类
 var overlayParam = new Zondy.Service.OverlayByLayer({
                    //IGServer所在ip地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口号
                    port: "6163",
                    //设置被叠加图层URL
                    srcInfo1: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流",
                    //设置叠加图层URL
                    srcInfo2: "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界政区",
                    //设置结果URL
                    desInfo: resultname,
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
class OverlayByLayer extends OverlayBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.OverlayByLayer.prototype.srcInfo2
         * @type {String}
         * @description 设置叠加图层URL
         * @default null
         */
        this.srcInfo2 = options.srcInfo2 !== undefined ? options.srcInfo2 : null;

        /**
         * @private
         * @member Zondy.Service.OverlayByLayer.prototype.calcRealAreaAndPerimeter
         * @type {Boolean}
         * @description 是否计算真实的面积和周长，如果设置为true，则面积和周长返回结果为平方米
         * @default true
         */
        this.calcRealAreaAndPerimeter = options.calcRealAreaAndPerimeter !== undefined ? options.calcRealAreaAndPerimeter : true;

        /**
         * @private
         * @member Zondy.Service.OverlayByLayer.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600227"
         */
        this.flowID = '600227';
    }
}
export { OverlayByLayer };
Zondy.Service.OverlayByLayer = OverlayByLayer;
