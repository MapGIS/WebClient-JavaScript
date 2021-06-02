import {
    Zondy
} from '../../common/Base';
import {
    FeatureBuffBase
} from "./FeatureBuffBase";

/**
 * 要素缓冲分析（单圈）
 * @class module:分析服务.FeatureBuffBySingleRing
 * @classdesc 要素缓冲分析（单圈）
 * @description Zondy.Service.FeatureBuffBySingleRing
 * @extends Zondy.Service.FeatureBuffBase
 * @param {Object} option 属性键值对
 * @param {Number} [option.leftRad = 0.001] 缓冲分析左半径
 * @param {Number} [option.rightRad = 0.001] 缓冲分析右半径
 * @example
 //初始化Zondy.Object.FeatureGeometry对象
 var regGeo = new Zondy.Object.FeatureGeometry();
 //设置区要素的空间几何信息
 var gReg = new Zondy.Object.GRegion([
 new Zondy.Object.AnyLine([new Zondy.Object.Arc([
 new Zondy.Object.Point2D(0.46, 30.1),
 new Zondy.Object.Point2D(11.48, 6.22),
 new Zondy.Object.Point2D(36.73, 7.6),
 new Zondy.Object.Point2D(58.77, 25.51),
 new Zondy.Object.Point2D(41.33, 49.39) ]) ])]);
 regGeo.setRegGeom([gReg]);
 //设置属性结构
 var regAttStr = new Zondy.Object.CAttStruct({
                    FldName: ["ID", "面积", "周长", "LayerID"],
                    FldNumber: 4,
                    FldType: ["FldLong", "FldDouble", "FldDouble", "FldLong"]
                });
 //实例化CAttDataRow类
 var values = [0, 62.566714, 50.803211, 0];
 var valuesRow = new Zondy.Object.CAttDataRow(values, 1);
 //实例化FeatureBuffBySingleRing类，设置要素缓冲分析必要参数，输出分析结果到缓冲分析结果图层
 var featureBufBySR = new Zondy.Service.FeatureBuffBySingleRing({
                    //IGServer所在ip地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口号
                    port: "6163",
                    //设置要素缓冲分析左半径
                    leftRad: 5,
                    //设置要素缓冲分析右半径
                    rightRad: 5
                });
 //设置缓冲分析参数
 //设置几何信息
 featureBufBySR.sfGeometryXML = JSON.stringify([regGeo]);
 //设置属性结构
 featureBufBySR.attStrctXML = JSON.stringify(regAttStr);
 //设置属性值
 featureBufBySR.attRowsXML = JSON.stringify([valuesRow]);
 //设置追踪半径
 featureBufBySR.traceRadius = 0.0001;
 //设置缓冲结果的名称以及存放地址
 var resultname = "singleBuffAnalysisResultLayer" + getCurentTime();
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 featureBufBySR.resultName = resultBaseUrl + resultname;
 featureBufBySR.execute(function (res) {
                    console.log(res);
                }, "get",function (error) {
                    console.log(error);
                });
 */
class FeatureBuffBySingleRing extends FeatureBuffBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBySingleRing.prototype.leftRad
         * @type {Number}
         * @description 缓冲分析左半径
         * @default 0.001
         */
        this.leftRad = options.leftRad !== undefined ? options.leftRad : 0.001;

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBySingleRing.prototype.rightRad
         * @type {Number}
         * @description 缓冲分析右半径
         * @default 0.001
         */
        this.rightRad = options.rightRad !== undefined ? options.rightRad : 0.001;

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBySingleRing.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600238"
         */
        this.flowID = "600238";
    }
}
export {
    FeatureBuffBySingleRing
};
Zondy.Service.FeatureBuffBySingleRing = FeatureBuffBySingleRing;