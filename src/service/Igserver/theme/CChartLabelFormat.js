import {
    Zondy
} from '../../common/Base';

/**
 * 统计图形标签枚举
 * @class module:专题图服务.CChartLabelFormat
 * @classdesc 统计图形标签枚举
 * @description Zondy.Object.Theme.CChartLabelFormat 
 * @param Unknown 未知类型
 * @param Value 实际值
 * @param Percent 百分比
 */
var CChartLabelFormat = {
    /**
     * @member Zondy.Object.Theme.CChartLabelFormat.Unknown
     * @description  未知类型
     */
    Unknown: 0,

    /**
     * @member Zondy.Object.Theme.CChartLabelFormat.Value
     * @description  实际值
     */
    Value: 1,

    /**
     * @member Zondy.Object.Theme.CChartLabelFormat.Percent
     * @description  百分比
     */
    Percent: 2
};
export {
    CChartLabelFormat
};
Zondy.Object.Theme.CChartLabelFormat = CChartLabelFormat;