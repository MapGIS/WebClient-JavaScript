import {
    Zondy
} from '../common/Base';
import {
    ClassBufferBase
} from "./ClassBufferBase";

/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:分析服务.ClassBufferBySingleRing
 * @description  Zondy.Service.ClassBufferBySingleRing 类缓冲分析（单圈）
 * @classdesc 类缓冲分析（单圈）
 * @extends Zondy.Service.ClassBufferBase
 * @param {Object} option 属性键值对
 * @param {Number} [option.leftRad = 0.001] 缓冲分析左半径
 * @param {Number} [option.rightRad = 0.001] 缓冲分析右半径
 * @param {Boolean} [option.isByAtt = true] 是否根据属性字段设置缓冲区半径
 * @param {String} [option.fldName = null] 属性字段名称,当isByAtt为true时使用
 * @param {Number} [option.dynPrjRad = 0] 动态投影半径,使用前必须设置父类Zondy.Service.ClassBufferBase公共属性 isDynPrj 为”true”
 * @example
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 if (anaType == "rad") {//不允许根据属性字段设置缓冲区半径
                    //实例化ClassBufferBySingleRing类
                    var clsBufBySR = new Zondy.Service.ClassBufferBySingleRing({
                        //IGServer所在ip地址
                        ip: "develop.smaryun.com",
                        //IGServer请求端口号
                        port: "6163",
                        //缓冲时要素左侧缓冲半径
                        leftRad: 1,
                        //缓冲时要素右侧缓冲半径
                        rightRad: 1,
                        //不允许根据属性字段设置缓冲区半径
                        isByAtt: false
                    });
                } else if (anaType == "att") {//根据属性字段设置缓冲区半径
                    //实例化ClassBufferBySingleRing类
                    var clsBufBySR = new Zondy.Service.ClassBufferBySingleRing({
                        //IGServer所在ip地址
                        ip: "develop.smaryun.com",
                        //IGServer请求端口号
                        port: "6163",
                        //允许根据属性字段设置缓冲区半径
                        isByAtt: true
                    });
                    clsBufBySR.fldName = "长度";
                }
 //调用Zondy.Service.ClassBufferBase基类公共属性
 clsBufBySR.srcInfo = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流_1";
 var resultname = "singleBuffAnalysisResultLayer" + self.getCurentTime();
 clsBufBySR.desInfo = resultBaseUrl + resultname;
 clsBufBySR.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class ClassBufferBySingleRing extends ClassBufferBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ClassBufferBySingleRing.prototype.leftRad
         * @type {Number}
         * @description 缓冲分析左半径
         * @default 0.001
         */
        this.leftRad = options.leftRad !== undefined ? options.leftRad : 0.001;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBySingleRing.prototype.rightRad
         * @type {Number}
         * @description 缓冲分析右半径
         * @default 0.001
         */
        this.rightRad = options.rightRad !== undefined ? options.rightRad : 0.001;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBySingleRing.prototype.isByAtt
         * @type {Boolean}
         * @description 是否根据属性字段设置缓冲区半径
         * @default true
         */
        this.isByAtt = options.isByAtt !== undefined ? options.isByAtt : true;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBySingleRing.prototype.fldName
         * @type {String}
         * @description 属性字段名称,当isByAtt为true时使用
         * @default null
         */
        this.fldName = options.fldName !== undefined ? options.fldName : null;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBySingleRing.prototype.dynPrjRad
         * @type {Number}
         * @description 动态投影半径,使用前必须设置父类Zondy.Service.ClassBufferBase公共属性 isDynPrj 为”true”
         * @default 0
         */
        this.dynPrjRad = options.dynPrjRad !== undefined ? options.dynPrjRad : 0;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBySingleRing.prototype.flowID
         * @type {String}
         * @description 矢量图层单圈缓冲区分析的工作流ID
         * @default "600231"
         */
        this.flowID = "600231";
    }
}
export {
    ClassBufferBySingleRing
};
Zondy.Service.ClassBufferBySingleRing = ClassBufferBySingleRing;