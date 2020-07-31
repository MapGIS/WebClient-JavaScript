import {
    Zondy
} from '../common/Base';
import {
    AnalysisBase
} from "./AnalysisBase";

/**
 * 要素缓冲分析服务基类
 * @class module:分析服务.FeatureBuffBase
 * @classdesc 要素缓冲分析服务基类
 * @description Zondy.Service.FeatureBuffBase
 * @extends Zondy.Service.AnalysisBase
 * @param {Object} option 属性键值对
 * @param {String} [option.sfGeometryXML = null] 分析的要素的空间信息,序列化为字符串
 * @param {String} [option.attStrctXML = null] 要素的属性结构,序列化为字符串
 * @param {String} [option.attRowsXML = null] 要素的属性值,序列化为字符串
 * @param {Number} [option.traceRadius = 0.0001] 追踪半径
 * @param {String} [option.resultName = null] 分析结果的URL地址,如GDBP://mapgislocal/Sample/sfcls/多边形缓冲结果
 * @param {String} [option.inFormat = "json"] 请求格式
 */
class FeatureBuffBase extends AnalysisBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBase.prototype.sfGeometryXML
         * @type {String}
         * @description 分析的要素的空间信息,序列化为字符串
         * @default null
         */
        this.sfGeometryXML = options.sfGeometryXML !== undefined ? options.sfGeometryXML : null;

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBase.prototype.attStrctXML
         * @type {String}
         * @description 要素的属性结构,序列化为字符串
         * @default null
         */
        this.attStrctXML = options.attStrctXML !== undefined ? options.attStrctXML : null;

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBase.prototype.attRowsXML
         * @type {String}
         * @description 要素的属性值,序列化为字符串
         * @default null
         */
        this.attRowsXML = options.attRowsXML !== undefined ? options.attRowsXML : null;

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBase.prototype.traceRadius
         * @type {Number}
         * @description 追踪半径
         * @default 0.0001
         */
        this.traceRadius = options.traceRadius !== undefined ? options.traceRadius : 0.0001;

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBase.prototype.resultName
         * @type {String}
         * @description 分析结果的URL地址,如GDBP://mapgislocal/Sample/sfcls/多边形缓冲结果
         * @default null
         */
        this.resultName = options.resultName !== undefined ? options.resultName : null;

        /**
         * @private
         * @member Zondy.Service.FeatureBuffBase.prototype.inFormat
         * @type {String}
         * @description 请求格式
         * @default "json"
         */
        this.inFormat = options.inFormat !== undefined ? options.inFormat : "json";
    }
}
export {
    FeatureBuffBase
};
Zondy.Service.FeatureBuffBase = FeatureBuffBase;