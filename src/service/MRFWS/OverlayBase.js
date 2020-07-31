import {
    Zondy
} from '../common/Base';
import {
    AnalysisBase
} from "./AnalysisBase";

/**
 * 叠加分析服务基类
 * @class module:分析服务.OverlayBase
 * @classdesc 叠加分析服务基类
 * @description Zondy.Service.OverlayBase 
 * @extends Zondy.Service.AnalysisBase
 * @param {Object} option 属性键值对
 * @param {String} [option.srcInfo1 = null] 被叠加简单要素类的信息
 * @param {String} [option.desInfo = null] 结果简单要素类信息
 * @param {Number} [option.attOptType = 1] 是否进行属性操作,该注释缺失，请联系igserver部门
 * @param {Number} [option.infoOptType = 1] 共有部分的图形参数操作,该注释缺失，请联系igserver部门
 * @param {Number} [option.overType = 3] 叠加类型,该注释缺失，请联系igserver部门
 * @param {Boolean} [option.isCleanNode = false] 是否结点平差
 * @param {Boolean} [option.isLabelPnt = false] 是否裁剪label点
 * @param {Boolean} [option.isValidReg = false] 是否检查区的合法性
 * @param {Boolean} [option.isReCalculate = false] 是否重算面积
 * @param {Number} [option.radius = 0.001] 容差半径
 */
class OverlayBase extends AnalysisBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.srcInfo1
         * @type {String}
         * @description 被叠加简单要素类的信息
         * @default null
         */
        this.srcInfo1 = options.srcInfo1 !== undefined ? options.srcInfo1 : null;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.desInfo
         * @type {String}
         * @description 结果简单要素类信息
         * @default null
         */
        this.desInfo = options.desInfo !== undefined ? options.desInfo : null;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.attOptType
         * @type {Number}
         * @description 是否进行属性操作,该注释缺失，请联系igserver部门
         * @default 1
         */
        this.attOptType = options.attOptType !== undefined ? options.attOptType : 1;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.infoOptType
         * @type {Number}
         * @description 共有部分的图形参数操作,该注释缺失，请联系igserver部门
         * @default 1
         */
        this.infoOptType = options.infoOptType !== undefined ? options.infoOptType : 1;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.overType
         * @type {Number}
         * @description 叠加类型,该注释缺失，请联系igserver部门
         * @default 1
         */
        this.overType = options.overType !== undefined ? options.overType : 3;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.isCleanNode
         * @type {Boolean}
         * @description 是否结点平差
         * @default false
         */
        this.isCleanNode = options.isCleanNode !== undefined ? options.isCleanNode : false;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.isLabelPnt
         * @type {Boolean}
         * @description 是否裁剪label点
         * @default false
         */
        this.isLabelPnt = options.isLabelPnt !== undefined ? options.isLabelPnt : false;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.isValidReg
         * @type {Boolean}
         * @description 是否检查区的合法性
         * @default false
         */
        this.isValidReg = options.isValidReg !== undefined ? options.isValidReg : false;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.isReCalculate
         * @type {Boolean}
         * @description 是否重算面积
         * @default true
         */
        this.isReCalculate = options.isReCalculate !== undefined ? options.isReCalculate : true;

        /**
         * @private
         * @member Zondy.Service.OverlayBase.prototype.radius
         * @type {Number}
         * @description 容差半径
         * @default 0.001
         */
        this.radius = options.radius !== undefined ? options.radius : 0.001;
    }
}
export {
    OverlayBase
};
Zondy.Service.OverlayBase = OverlayBase;