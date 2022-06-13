import { Zondy } from '../../common/Base';
import { FeatureBuffBase } from './FeatureBuffBase';

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
                    new Zondy.Object.Point2D(41.33, 49.39),
                    new Zondy.Object.Point2D(0.46, 30.1)
                ])
                ])
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
                port: "6163",    //访问IGServer的端口号，.net版为6163，Java版为8089,
                //设置多圈缓冲分析的缓冲半径字符串
                radiusStr: "2,4,6"
            });
            featureBufByMR.sfGeometryXML = JSON.stringify([regGeo]);
            featureBufByMR.attStrctXML = JSON.stringify(regAttStr);
            featureBufByMR.attRowsXML = JSON.stringify([valuesRow]);
            featureBufByMR.traceRadius = 0.0001;

            var resultname = "multiBuffResultLayer" + getCurentTime();
            var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/"; //缓存结果图层的基地址
            featureBufByMR.resultName = resultBaseUrl + resultname;
            //调用Zondy.Service.AnalysisBase基类的execute方法执行要素缓冲分析，AnalysisSuccess为回调函数。
            featureBufByMR.execute( res => {
              console.log(res);
            },
            "post",
            error => {
              console.log(res);
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
        this.flowID = '600238';
    }
}
export { FeatureBuffBySingleRing };
Zondy.Service.FeatureBuffBySingleRing = FeatureBuffBySingleRing;
