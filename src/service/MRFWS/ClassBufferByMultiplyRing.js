import {
    Zondy
} from '../common/Base';
import {
    ClassBufferBase
} from "./ClassBufferBase";

/**
 * 类缓冲分析（多圈）
 * @class module:分析服务.ClassBufferByMultiplyRing
 * @classdesc  类缓冲分析（多圈）
 * @description Zondy.Service.ClassBufferByMultiplyRing
 * @extends Zondy.Service.ClassBufferBase
 * @param {Object} option 属性键值对
 * @param {String} [option.flowID = 600232] 矢量图层多圈缓冲区分析的工作流ID
 * @param {String} [option.radiusStr = 2,4,8,10] 多圈缓冲分析各圈的缓冲半径
 * @example
 //实例化ClassBufferByMultiplyRing类
 var clsBufByMR = new Zondy.Service.ClassBufferByMultiplyRing({
                ip: "develop.smaryun.com",
                port: "6163",
                //多圈缓冲分析各圈的缓冲半径
                radiusStr: "0.1,0.5,1"
            });
 //调用Zondy.Service.ClassBufferBase基类公共属性
 clsBufByMR.srcInfo = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流_1";
 //缓存结果图层的基地址
 var resultBaseUrl = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/";
 var resultname = "multiBuffAnalysisResultLayer" + getCurentTime();
 clsBufByMR.desInfo = resultBaseUrl + resultname;
 clsBufByMR.execute(function (res) {
                    console.log(res);
                }, "post",function (error) {
                    console.log(error);
                });
 */
class ClassBufferByMultiplyRing extends ClassBufferBase {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.ClassBufferByMultiplyRing.prototype.flowID
         * @type {String}
         * @description 矢量图层多圈缓冲区分析的工作流ID
         * @default 600232
         */
        this.flowID = "600232";

        /**
         * @private
         * @member Zondy.Service.ClassBufferByMultiplyRing.prototype.radiusStr
         * @type {String}
         * @description 多圈缓冲分析各圈的缓冲半径 "2,4,8,10"
         * @default "2,4,8,10"
         */
        this.radiusStr = options.radiusStr !== undefined ? options.radiusStr : "2,4,8,10";
    }
}
export {
    ClassBufferByMultiplyRing
};
Zondy.Service.ClassBufferByMultiplyRing = ClassBufferByMultiplyRing;