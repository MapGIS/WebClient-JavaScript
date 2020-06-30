import {
    Zondy
} from '../common/Base';
import {
    FeatureBuffBase
} from "./FeatureBuffBase";

/**
 * 要素缓冲分析（多圈）
 * @class module:分析服务.FeatureBuffByMultiplyRing
 * @classdesc Zondy.Service.FeatureBuffByMultiplyRing 要素缓冲分析（多圈）
 * @extends Zondy.Service.FeatureBuffBase
 * @param {Object} option 属性键值对
 * @param {String} [option.radiusStr = "0.003,0.002,0.001"] 设置多圈缓冲分析的缓冲半径字符串
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 //初始化Zondy.Object.FeatureGeometry对象
 var regGeo = new Zondy.Object.FeatureGeometry();
 //设置区要素的空间几何信息
 var gReg = new Zondy.Object.GRegion([
 new Zondy.Object.AnyLine([new Zondy.Object.Arc([
 new Zondy.Object.Point2D(0.46, 30.1),
 new Zondy.Object.Point2D(11.48, 6.22),
 new Zondy.Object.Point2D(36.73, 7.6),
 new Zondy.Object.Point2D(58.77, 25.51),
 new Zondy.Object.Point2D(41.33, 49.39)
 ])])
 ]);
 //设置区要素几何信息的方法。
 regGeo.setRegGeom([gReg]);
 //实例化CAttStruct类
 var regAttStr = new Zondy.Object.CAttStruct({
                    FldName: ["ID", "面积", "周长", "LayerID"],
                    FldNumber: 4,
                    FldType: ["FldLong", "FldDouble", "FldDouble", "FldLong"]
                });
 var values = [1, 0.00058032464704422, 0.132101984752282, 8];
 //创建属性信息对象
 var valuesRow = new Zondy.Object.CAttDataRow(values, 3286);
 //实例化FeatureBuffByMultiplyRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
 var featureBufByMR = new Zondy.Service.FeatureBuffByMultiplyRing({
                    ip: "develop.smaryun.com",
                    port: "6163",
                    //设置多圈缓冲分析的缓冲半径字符串
                    radiusStr: "5,10,20"
                });
 featureBufByMR.sfGeometryXML = JSON.stringify([regGeo]);
 featureBufByMR.attStrctXML = JSON.stringify(regAttStr);
 featureBufByMR.attRowsXML = JSON.stringify([valuesRow]);
 featureBufByMR.traceRadius = 0.0001;
 var resultname = "multiBuffAnalysisResultLayer" + self.getCurentTime();
 featureBufByMR.resultName = resultBaseUrl + resultname;
 featureBufByMR.execute(function (res) {
                    console.log(res);
                }, "get",function (error) {
                    console.log(error);
                });
 */
class FeatureBuffByMultiplyRing extends FeatureBuffBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.FeatureBuffByMultiplyRing.prototype.radiusStr
         * @type {String}
         * @description 设置多圈缓冲分析的缓冲半径字符串
         * @default "0.003,0.002,0.001"
         */
        this.radiusStr = options.radiusStr !== undefined ? options.radiusStr : "0.003,0.002,0.001";

        /**
         * @private
         * @member Zondy.Service.FeatureBuffByMultiplyRing.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600239"
         */
        this.flowID = "600239";
    }
}
export {
    FeatureBuffByMultiplyRing
};
Zondy.Service.FeatureBuffByMultiplyRing = FeatureBuffByMultiplyRing;