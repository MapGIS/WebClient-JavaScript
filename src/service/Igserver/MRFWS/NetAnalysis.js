import {
    Zondy
} from '../../common/Base';
import {
    AnalysisBase
} from "./AnalysisBase";
import {
    NetAnalyType
} from "../../common/EnumComm";
import {
    NetElemType
} from "../../common/EnumComm";

/**
 * 网络分析类
 * @class module:分析服务.NetAnalysis
 * @classdesc 网络分析类
 * @description Zondy.Service.NetAnalysis
 * @extends Zondy.Service.AnalysisBase
 * @param {Object} option 属性键值对
 * @param {String} [option.netClsUrl = null] 网络类URL
 * @param {String} [option.flagPosStr = null] 网标序列，包括点上网标、线上网标
 * @param {String} [option.barrierPosStr = null] 障碍序列，包括点上障碍、线上障碍
 * @param {NetAnalyType} [option.analyType =  NetAnalyType.UserMod] Zondy.Enum.Net.NetAnalyType
 * @param {String} [option.weight = ",Weight1,Weight1"] 权值字段名序列
 * @param {NetElemType} [option.elementType = NetElemType.Edge] 网络元素类型 Zondy.Enum.Net.NetElemType
 * @param {Number} [option.nearDis = 0.001] 网络元素搜索半径
 * @param {String} [option.outFormat = "json"] 分析结果输出格式, json（默认值）|xml
 * @example
 var netAnalyParam = new Zondy.Service.NetAnalysis({
                    //设置网络类URL
                    netClsUrl: "gdbp://MapGisLocal/sample/ds/网络分析/ncls/道路交通网",
                    //指定感兴趣路径点坐标序列
                    flagPosStr: "114.44,38.06,114.56,38.03",
                    //分析类型：用户自定义
                    analyTp: 'UserMode',
                    //设置网络类某些属性字段为权值字段
                    weight: ",Weight1,Weight1",
                    //网络类型：1/2:节点网标/线网标
                    elementType: 2,
                    //设置网标搜索半径
                    nearDis: 0.01,
                    //设置障碍点的坐标序列
                    barrierPosStr: "",
                    //返回格式
                    outFormat: 'JSON',
                    //IGServer所在ip地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口号
                    port: "6163"
                });
 netAnalyParam.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class NetAnalysis extends AnalysisBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.netClsUrl
         * @type {String}
         * @description 网络类URL
         * @default null
         */
        this.netClsUrl = options.netClsUrl !== undefined ? options.netClsUrl : null;

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.flagPosStr
         * @type {String}
         * @description 网标序列，包括点上网标、线上网标
         * @default null
         */
        this.flagPosStr = options.flagPosStr !== undefined ? options.flagPosStr : null;

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.barrierPosStr
         * @type {String}
         * @description 障碍序列，包括点上障碍、线上障碍
         * @default null
         */
        this.barrierPosStr = options.barrierPosStr !== undefined ? options.barrierPosStr : null;

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.analyType
         * @type {NetAnalyType}
         * @description 分析类型 Zondy.Enum.Net.NetAnalyType
         * @default null
         */
        this.analyType = options.analyType !== undefined ? options.analyType : NetAnalyType.UserMode;

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.weight
         * @type {String}
         * @description 权值字段名序列
         * @default ",Weight1,Weight1"
         */
        this.weight = options.weight !== undefined ? options.weight : ",Weight1,Weight1";

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.elementType
         * @type {NetElemType}
         * @description 网络元素类型 Zondy.Enum.Net.NetElemType
         * @default NetElemType.Edge
         */
        this.elementType = options.elementType !== undefined ? options.elementType : NetElemType.Edge;

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.nearDis
         * @type {Number}
         * @description 网络元素搜索半径
         * @default 0.001
         */
        this.nearDis = options.nearDis !== undefined ? options.nearDis : 0.001;

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.outFormat
         * @type {String}
         * @description 分析结果输出格式, json（默认值）|xml
         * @default "json"
         */
        this.outFormat = options.outFormat !== undefined ? options.outFormat : "json";

        /**
         * @private
         * @member Zondy.Service.NetAnalysis.prototype.flowID
         * @type {String}
         * @description 工作流ID
         * @default "600233"
         */
        this.flowID = "600233";
    }
}
export {
    NetAnalysis
};
Zondy.Service.NetAnalysis = NetAnalysis;