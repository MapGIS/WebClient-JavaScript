import {
    Zondy
} from '../common/Base';
import {
    copyExcluce
} from "../common/Util";
import {
    AnalysisBase
} from "./AnalysisBase";
import {
    IgsServiceBase
} from "../baseserver/IServiceBase";
import {
    MeshingParam
} from "../extend/MeshingParam";
import {
    ContourParam
} from "../extend/ContourParam";

/**
 * 等值线追踪分析
 * @class module:分析服务.ContourAnalyse
 * @classdesc 等值线追踪分析
 * @description Zondy.Service.ContourAnalyse 
 * @extends Zondy.Service.AnalysisBase
 * @param {Object} option 属性键值对
 * @param {String} [option.linSfclsURL = null] 线简单要素Url
 * @param {String} [option.regSfclsURL = null] 区简单要素Url
 * @param {String} [option.annoClsURL = null] 注记要素Url
 * @param {Zondy.Object.ContourAnalyse.MeshingParam} [option.meshingParam = null] 离散数据网格化参数类
 * @param {Zondy.Object.ContourAnalyse.ContourParam} [option.contourParam = null] 平面等值线追踪参数类
 * @example
 var myDate = new Date();
 //定义起始和终点，中间有5条，生成步长t
 var t = parseInt((300 - 0) / 5 + 0.5);
 //获取系统时间
 var time = self.getTime(myDate);
 //临时存储的地址
 var GdbpTempStr = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/ContourAnalyse/";
 var wp = GdbpTempStr + "sfcls/ContourP_" + time;
 var wl = GdbpTempStr + "sfcls/ContourL_" + time;
 var wt = GdbpTempStr + "acls/ContourT_" + time;
 var layerName = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/ContourAnalyse/sfcls/离散点";
 //创建一个离散数据网格化参数类
 var mp = new Zondy.Object.ContourAnalyse.MeshingParam({
                    SfClsURL: layerName,
                    FieldName: "Rainfall",
                    XCellNum: 400,
                    Bound: null
                });
 var mpStr = JSON.stringify(mp);
 //创建一个平面等值线追踪所用到的注记参数类
 var cp = new Zondy.Object.ContourAnalyse.ContourParam();
 //等值线层参数
 var zValues = new Array();
 //循环描述等值线信息
 for (var i = 0; i < t; i++) {
                    //等值线层参数类，用来描述每一层的信息
                    var z = new Zondy.Object.ContourAnalyse.ContourZValue();
                    //等值线层值
                    z.ZValue = i * 5;
                    //等值线参数
                    z.LineInfo = new Zondy.Object.ContourAnalyse.SlopLineParam();
                    z.LineInfo.Color = i * parseInt(5) + 9;
                    z.LineInfo.LinStyleID = 1;
                    z.LineInfo.LinWidth = 0.02;
                    //生成区参数
                    z.RegInfo = new Zondy.Object.ContourAnalyse.ContourRegionInfo();
                    z.RegInfo.FillColor = i * parseInt(5) + 4;
                    z.RegInfo.FillMode = 0;
                    z.RegInfo.PatID = 0;
                    //该层是否绘制注记
                    z.IsOutputNote = true;
                    zValues.push(z);
                }
 //等值线层参数
 cp.ZValues = zValues;
 //平面等值线追踪所用到的注记参数类
 var noteParam = new Zondy.Object.ContourAnalyse.ContourNoteParam();
 //注记间最小允许距离
 noteParam.MinDist = 10;
 //注记尺寸
 noteParam.FixSize = 0.01;
 //注记生成参数。默认值为NULL，只有在IsMakeNote为true时该参数才能发挥作用。
 cp.NoteParam = noteParam;
 //示坡线参数。默认值为NULL，只有在IsMakeSLin为true时该参数参能发挥作用。
 var slopLineParam = new Zondy.Object.ContourAnalyse.SlopLineParam();
 cp.SlopLineParam = slopLineParam;
 //是否生成注记
 cp.IsMakeNote = true;
 //是否生成区
 cp.IsMakeReg = true;
 var cpStr = JSON.stringify(cp);
 //实例化对象信息
 var obj = {
                    "linSfclsURL": wl,
                    "regSfclsURL": wp,
                    "annoClsURL": wt,
                    "meshingParam": mpStr,
                    "contourParam": cpStr
                };
 var param = [{ "Key": "linSfclsURL", "Value": obj.linSfclsURL },
 { "Key": "regSfclsURL", "Value": obj.regSfclsURL },
 { "Key": "annoClsURL", "Value": obj.annoClsURL },
 //离散数据网格化参数类
 {"Key": "meshingParam", "Value": obj.meshingParam },
 //平面等值线追踪参数类
 {"Key": "contourParam", "Value": obj.contourParam}];
 var urlStr = "http://develop.smaryun.com:6163/igs/rest/mrfws/execute/" + "600320" + "?f=json";
 var service = new Zondy.Service.QueryServiceBase();
 service.restQuery(urlStr, param, function (res) {
                    console.log(res);
                }, "POST",function (error) {
                    console.log(error);
                });
 */
class ContourAnalyse extends AnalysisBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ContourAnalyse.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600320"
         */
        this.flowID = '600320';

        /**
         * @private
         * @member Zondy.Service.ContourAnalyse.prototype.linSfclsURL
         * @type {String}
         * @description 线简单要素Url
         * @default null
         */
        this.linSfclsURL = options.linSfclsURL !== undefined ? options.linSfclsURL : null;

        /**
         * @private
         * @member Zondy.Service.ContourAnalyse.prototype.regSfclsURL
         * @type {String}
         * @description 区简单要素Url
         * @default null
         */
        this.regSfclsURL = options.regSfclsURL !== undefined ? options.regSfclsURL : null;

        /**
         * @private
         * @member Zondy.Service.ContourAnalyse.prototype.annoClsURL
         * @type {String}
         * @description 注记简单要素Url
         * @default null
         */
        this.annoClsURL = options.annoClsURL !== undefined ? options.annoClsURL : null;

        /**
         * @private
         * @member Zondy.Service.ContourAnalyse.prototype.meshingParam
         * @type {Zondy.Object.ContourAnalyse.MeshingParam}
         * @description 离散数据网格化参数类
         * @default null
         */
        this.meshingParam = options.meshingParam !== undefined ? options.meshingParam : null;

        /**
         * @private
         * @member Zondy.Service.ContourAnalyse.prototype.ContourParam
         * @type {Zondy.Object.ContourAnalyse.ContourParam}
         * @description 平面等值线追踪参数类
         * @default null
         */
        this.contourParam = options.contourParam !== undefined ? options.contourParam : null;
    }
}
export {
    ContourAnalyse
};
Zondy.Service.ContourAnalyse = ContourAnalyse;