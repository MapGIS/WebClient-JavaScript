import {
    Zondy
} from '../common/Base';
import {
    ServiceBase
} from "../ServiceBase";

/**
 * 几何分析服务基类
 * @class  module:几何分析服务.GeometryAnalysisBase
 * @classdesc 几何分析服务基类
 * @description Zondy.Service.GeometryAnalysisBase
 * @extends Zondy.Service.ServiceBase
 * @param {Object} option 属性键值对,拓展属性,为其他属性赋值的键值对
 */
class GeometryAnalysisBase extends ServiceBase {
    constructor(option) {
        var options = option || {};

        /**
         * @private
         * @member Zondy.Service.GeometryAnalysisBase.prototype.baseUrl
         * @type {String}
         * @description 服务基础地址
         * @default "igs/rest/mrgs"
         */
        options.baseUrl = "igs/rest/mrgs";

        super(options);
    }
}
export {
    GeometryAnalysisBase
};
Zondy.Service.GeometryAnalysisBase = GeometryAnalysisBase;