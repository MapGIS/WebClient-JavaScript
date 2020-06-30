import {
    Zondy
} from './Base';
import {
    extend
} from "./Util";
import {
    FeatureType
} from "./EnumComm";
import {
    CPointInfo
} from "./CPointInfo";
import {
    CLineInfo
} from "./CLineInfo";
import {
    CRegionInfo
} from "./CRegionInfo";

/**
 * 要素符号参数信息对象
 * @class Zondy.Object.WebGraphicsInfo
 * @classdesc 要素符号参数信息对象
 * @param {Object} option 属性键值对
 * @param {FeatureType} [option.InfoType = 0] 要素几何类型：Zondy.Enum.FeatureType 枚举类型，只对简单要素类有效
 * @param {Zondy.Object.CPointInfo} [option.PntInfo = null] 点信息对象
 * @param {Zondy.Object.CLineInfo} [option.LinInfo = null] 线信息对象
 * @param {Zondy.Object.CRegionInfo} [option.RegInfo = null] 区信息对象

 */
var WebGraphicsInfo = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.WebGraphicsInfo.prototype.InfoType
     * @type {FeatureType}
     * @description 要素几何类型：Zondy.Enum.FeatureType 枚举类型，只对简单要素类有效
     * @default 0
     */
    this.InfoType = (options.InfoType !== undefined && options.InfoType !== null) ? options.InfoType : 0;

    /**
     * @member Zondy.Object.WebGraphicsInfo.prototype.PntInfo
     * @type {Zondy.Object.CPointInfo}
     * @description 点信息对象
     * @default null
     */
    this.PntInfo = (options.PntInfo !== undefined && options.PntInfo !== null) ? options.PntInfo : null;

    /**
     * @member Zondy.Object.WebGraphicsInfo.prototype.LinInfo
     * @type {Zondy.Object.CLineInfo}
     * @description 线信息对象
     * @default null
     */
    this.LinInfo = (options.LinInfo !== undefined && options.LinInfo !== null) ? options.LinInfo : null;

    /**
     * @member Zondy.Object.WebGraphicsInfo.prototype.RegInfo
     * @type {Zondy.Object.CRegionInfo}
     * @description 区信息对象
     * @default null
     */
    this.RegInfo = (options.RegInfo !== undefined && options.RegInfo !== null) ? options.RegInfo : null;
};
export {
    WebGraphicsInfo
};
Zondy.Object.WebGraphicsInfo = WebGraphicsInfo;