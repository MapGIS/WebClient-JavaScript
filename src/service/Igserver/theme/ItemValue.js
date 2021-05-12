import {
    Zondy
} from '../../common/Base';
import {
    extend
} from "../../common/Util";
import {
    CItemType
} from "../../common/EnumComm";
/**
 * 分段专题图分段值对象构造函数
 * @class module:专题图服务.ItemValue
 * @classdesc 分段专题图分段值对象构造函数
 * @description Zondy.Object.Theme.ItemValue 
 * @param {Object} opt_options 属性键值对
 * @param {String} [startValue = ""] 开始值
 * @param {String} [endValue = ""] 结束值
 * @param {Zondy.Enum.Theme.CItemType} [classItemType = CItemType.RangeTheme] 统计分段类型 {@link Zondy.Enum.Theme.CItemType}
 */
var ItemValue = function (startValue, endValue, classItemType, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);

    /**
     * @private
     * @member Zondy.Object.Theme.ItemValue.prototype.StartValue
     * @type {String}
     * @description 开始值
     * @default ""
     */
    this.StartValue = (startValue !== undefined) ? startValue : "";

    /**
     * @private
     * @member Zondy.Object.Theme.ItemValue.prototype.EndValue
     * @type {String}
     * @description 结束值
     * @default ""
     */
    this.EndValue = (endValue !== undefined) ? endValue : "";

    /**
     * @private
     * @member Zondy.Object.Theme.ItemValue.prototype.ClassItemType
     * @type {Zondy.Enum.Theme.CItemType}
     * @description 统计分段类型 {@link Zondy.Enum.Theme.CItemType}
     * @default CItemType.RangeTheme
     */
    this.ClassItemType = (classItemType !== undefined) ? classItemType : CItemType.RangeTheme;
};
export {
    ItemValue
};
Zondy.Object.Theme.ItemValue = ItemValue;