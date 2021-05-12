import {
    Zondy
} from '../../common/Base';
import {
    AnalysisBase
} from "./AnalysisBase";

/**
 * 投影服务基类
 * @class module:分析服务.ProjectBase
 * @classdesc 投影服务基类
 * @description Zondy.Service.ProjectBase 
 * @extends Zondy.Service.AnalysisBase
 * @param {Object} option 属性键值对
 * @param {String} [option.clsName = null] 需转换的要素类地址
 * @param {String} [option.desClsName = null] 结果要素类地址
 * @param {Number} [option.resultName = null] 结果要素名称
 */
class ProjectBase extends AnalysisBase {
    constructor(option) {
        var options = option || {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.ProjectBase.prototype.clsName
         * @type {String}
         * @description 需转换的要素类地址
         * @default null
         */
        this.clsName = options.clsName !== undefined ? options.clsName : null;

        /**
         * @private
         * @member Zondy.Service.ProjectBase.prototype.desClsName
         * @type {String}
         * @description 结果要素类地址
         * @default null
         */
        this.desClsName = options.desClsName !== undefined ? options.desClsName : null;

        /**
         * @private
         * @member Zondy.Service.ProjectBase.prototype.resultName
         * @type {String}
         * @description 结果要素名称-已废弃
         * @default null
         * @deprecated
         */
        this.resultName = options.resultName !== undefined ? options.resultName : null;
    }
}
export {
    ProjectBase
};
Zondy.Service.ProjectBase = ProjectBase;