import {
    Zondy
} from '../common/Base';
/**
 * 统计图类型枚举
 * @class module:专题图服务.CChartType
 * @classdesc Zondy.Object.Theme.CChartType 统计图类型枚举
 * @param Unknown 未知类型
 * @param Bar 直方图
 * @param Bar3D 3D直方图
 * @param Pie 饼图
 * @param Pie3D 3D饼图
 * @param Line 折线图
 * @param Line3D 3D折线图
 * @param Point 散点图
 */
var CChartType = {
    /**
     * @member Zondy.Object.Theme.CChartType.Unknown
     * @description  未知类型
     */
    Unknown: 0,

    /**
     * @member Zondy.Object.Theme.CChartType.Bar
     * @description  直方图
     */
    Bar: 1,

    /**
     * @member Zondy.Object.Theme.CChartType.Bar3D
     * @description  3D直方图
     */
    Bar3D: 2,

    /**
     * @member Zondy.Object.Theme.CChartType.Pie
     * @description  饼图
     */
    Pie: 3,

    /**
     * @member Zondy.Object.Theme.CChartType.Pie3D
     * @description  3D饼图
     */
    Pie3D: 4,

    /**
     * @member Zondy.Object.Theme.CChartType.Line
     * @description  折线图
     */
    Line: 5,

    /**
     * @member Zondy.Object.Theme.CChartType.Line3D
     * @description  3D折线图
     */
    Line3D: 6,

    /**
     * @member Zondy.Object.Theme.CChartType.Point
     * @description  散点图
     */
    Point: 7
};
export {
    CChartType
};
Zondy.Object.Theme.CChartType = CChartType;