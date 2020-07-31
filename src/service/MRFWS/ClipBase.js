import { Zondy } from '../common/Base';
import { AnalysisBase } from './AnalysisBase';

/**
 * 裁剪分析服务基类
 * @class module:分析服务.ClipBase
 * @classdesc 裁剪分析服务基类
 * @description Zondy.Service.ClipBase
 * @extends Zondy.Service.AnalysisBase
 * @param {Object} option 属性键值对
 * @param {String} [option.desInfo = null] 裁剪分析结果图层URL
 * @param {String} [option.attOptType = 1] 属性数据处理方式
 * @param {String} [option.infoOptType = 1] 图形参数处理方式
 * @param {String} [option.overType = 3] 裁剪方式
 * @param {String} [option.tolerance = 0.0001] 容差半径
 * @param {String} [option.isCleanNode = false] 是否结点平差
 * @param {String} [option.isLabelPnt = false] 是否裁剪label点
 * @param {String} [option.isValidReg = false] 是否检查区的合法性
 */
class ClipBase extends AnalysisBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ClipBase.prototype.desInfo
         * @type {String}
         * @description 裁剪分析结果图层URL
         * @default null
         */
        this.desInfo = options.desInfo !== undefined ? options.desInfo : null;

        /**
         * @private
         * @member Zondy.Service.ClipBase.prototype.attOptType
         * @type {Number}
         * @description 属性数据处理方式,该注释缺失，请联系igserver部门
         * @default 1
         */
        this.attOptType = options.attOptType !== undefined ? options.attOptType : 1;

        /**
         * @private
         * @member Zondy.Service.ClipBase.prototype.infoOptType
         * @type {Number}
         * @description 图形参数处理方式,该注释缺失，请联系igserver部门
         * @default 1
         */
        this.infoOptType = options.infoOptType !== undefined ? options.infoOptType : 1;

        /**
         * @private
         * @member Zondy.Service.ClipBase.prototype.overType
         * @type {Number}
         * @description 裁剪方式,该注释缺失，请联系igserver部门
         * @default 3
         */
        this.overType = options.overType !== undefined ? options.overType : 3;

        /**
         * @private
         * @member Zondy.Service.ClipBase.prototype.tolerance
         * @type {Number}
         * @description 容差半径
         * @default 0.0001
         */
        this.tolerance = options.tolerance !== undefined ? options.tolerance : 0.0001;

        /**
         * @private
         * @member Zondy.Service.ClipBase.prototype.isCleanNode
         * @type {Boolean}
         * @description 是否结点平差
         * @default false
         */
        this.isCleanNode = options.isCleanNode !== undefined ? options.isCleanNode : false;

        /**
         * @private
         * @member Zondy.Service.ClipBase.prototype.isLabelPnt
         * @type {Boolean}
         * @description 是否裁剪label点
         * @default false
         */
        this.isLabelPnt = options.isLabelPnt !== undefined ? options.isLabelPnt : false;

        /**
         * @private
         * @member Zondy.Service.ClipBase.prototype.isValidReg
         * @type {Boolean}
         * @description 是否检查区的合法性
         * @default false
         */
        this.isValidReg = options.isValidReg !== undefined ? options.isValidReg : false;
    }
}
export { ClipBase };
Zondy.Service.ClipBase = ClipBase;
