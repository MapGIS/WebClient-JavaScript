import {
    Zondy
} from '../common/Base';
import {
    AnalysisBase
} from "./AnalysisBase";

/**
 * 缓冲分析服务基类
 * @class module:分析服务.ClassBufferBase
 * @classdesc Zondy.Service.ClassBufferBase 缓冲分析服务基类
 * @extends Zondy.Service.AnalysisBase
 * @param {Object} option 属性键值对
 * @param {String} [option.srcInfo = null] 源简单要素类的URL
 * @param {String} [option.desInfo = null] 目的简单要素类的URL
 * @param {String} [option.idstr = ""] 需要缓冲的要素ID的字符串，以','分隔
 * @param {Number} [option.angleType] 拐角类型：圆头/尖头:0/1
 * @param {Boolean} [option.isDissolve] 缓冲区是否合并
 * @param {Boolean} [option.isDynPrj] 是否动态投影
 */
class ClassBufferBase extends AnalysisBase {
    constructor(opt_options) {
        var options = opt_options || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ClassBufferBase.prototype.srcInfo
         * @type {String}
         * @description 源简单要素类的URL
         * @default null
         */
        this.srcInfo = options.srcInfo !== undefined ? options.srcInfo : null;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBase.prototype.desInfo
         * @type {String}
         * @description 目的简单要素类的URL
         * @default null
         */
        this.desInfo = options.desInfo !== undefined ? options.desInfo : null;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBase.prototype.idstr
         * @type {String}
         * @description 需要缓冲的要素ID的字符串，以','分隔
         * @default ""
         */
        this.idstr = options.idstr !== undefined ? options.idstr : "";

        /**
         * @private
         * @member Zondy.Service.ClassBufferBase.prototype.angleType
         * @type {Number}
         * @description 拐角类型：圆头/尖头:0/1
         * @default 0
         */
        this.angleType = options.angleType !== undefined ? options.angleType : 0;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBase.prototype.isDissolve
         * @type {Boolean}
         * @description 缓冲区是否合并
         * @default true
         */
        this.isDissolve = options.isDissolve !== undefined ? options.isDissolve : true;

        /**
         * @private
         * @member Zondy.Service.ClassBufferBase.prototype.isDynPrj
         * @type {Boolean}
         * @description 是否动态投影
         * @default false
         */
        this.isDynPrj = options.isDynPrj !== undefined ? options.isDynPrj : false;
    }
}
export {
    ClassBufferBase
};
Zondy.Service.ClassBufferBase = ClassBufferBase;