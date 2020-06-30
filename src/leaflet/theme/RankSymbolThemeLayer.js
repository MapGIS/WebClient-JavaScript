import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';
import {Theme as FeatureTheme} from '../../overlay/feature/Theme';
import {GraphThemeLayer} from './GraphThemeLayer';
import {Rectangle} from '../../service/common/Rectangle';

/**
 * @class Zondy.map.rankSymbolThemeLayer
 * @classdesc 符号专题图图层。
 * @description 符号专题图通过为每个要素绘制符号大小来反映其对应的专题值的大小；它只能表示单个个字段属性信息。
 *            符号专题图多用于具有相关数量特征的地图上，比如表示不同地区粮食产量、GDP、人口等。
 *            即通过制作一个符号专题图，就可以清晰展示各个区域相关Value的分布差异等。
 *           目前提供的符号图形有：圆形（后续进行扩展 心形 五角星 多角心 图片等）
 * @extends Zondy.map.GraphThemeLayer
 * @param {string} name - 专题图层名。
 * @param {Zondy.ChartType} symbolType - 符号类型。目前支持："Circle"。
 * @param {Object} options - 参数。
 * @param {boolean} [options.isOverLay=true] - 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表。
 * @param {string} options.themeFields - 指定创建专题图字段。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 */
var RankSymbolThemeLayer = GraphThemeLayer.extend({

    /**
     * @member {Object} Zondy.map.rankSymbolThemeLayer.prototype.symbolSetting
     * @description 符号 Circle 配置对象。
     * @property {Array} codomain - 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
     * @property {number} [maxR] - 圆形的最大半径。
     * @property {number} [minR] - 圆形的最小半径。
     * @property {string} [fillColor] - 圆形的填充色，如：fillColor: "#FFB980"。
     * @property {Object} [circleStyle] - 圆形的基础 style，此参数控制圆形基础样式，优先级低于 circleStyleByFields 和 circleStyleByCodomain。
     * @property {number} [decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
     * @property {Object} [circleHoverStyle] - 圆形 hover 状态时的样式，circleHoverAble 为 true 时有效。
     * @property {boolean} [circleHoverAble=true] - 是否允许圆形使用 hover 状态。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
     * @property {boolean} [circleClickAble=true] - 是否允许圆形被点击。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
     */

    initialize: function (name, symbolType, options) {// eslint-disable-line no-unused-vars
        GraphThemeLayer.prototype.initialize.apply(this, arguments);
        this.symbolType = symbolType;
        this.symbolSetting = {};
    },

    /**
     * @function Zondy.map.rankSymbolThemeLayer.prototype.setSymbolType
     * @description 设置符号类型，此函数可动态改变图表类型。在调用此函数前请通过 symbolSetting 为新类型的图表做相关配置。
     * @param symbolType - {Zondy.ChartType} 目前支持："Circle"。
     */
    setSymbolType: function (symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    },

    /**
     * @function Zondy.map.rankSymbolThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素（图形）
     * @param feature  - {Zondy.Feature.Vector} 要创建的专题图形要素
     * @return {Zondy.Theme} 专题图形
     */
    createThematicFeature: function (feature) {
        var me = this;
        var thematicFeature;
        // 检查图形创建条件并创建图形
        if (FeatureTheme[me.symbolType] && me.themeField && me.symbolSetting) {
            thematicFeature = new FeatureTheme[me.symbolType](feature, me, [me.themeField], me.symbolSetting, null, me.options);
        }

        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false;
        }

        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();

        return thematicFeature;
    },

    _addNoOverlayShape: function () {
        var me = this;
        // 压盖判断所需 chartsBounds 集合
        var mapBounds = me._map.getBounds();
        var crs = this._map.options.crs;
        mapBounds = window.L.bounds(crs.project(mapBounds.getSouthWest()), crs.project(mapBounds.getNorthEast()));


        var mapPxLT = me.getLocalXY(mapBounds.min);
        var mapPxRB = me.getLocalXY(mapBounds.max);

        var mBounds = new Rectangle();
        mBounds.xmin = Math.min(parseFloat(mapPxLT[0]), parseFloat(mapPxRB[0]));
        mBounds.xmax = Math.max(parseFloat(mapPxLT[0]), parseFloat(mapPxRB[0]));
        mBounds.ymin = Math.min(parseFloat(mapPxLT[1]), parseFloat(mapPxRB[1]));
        mBounds.ymax = Math.max(parseFloat(mapPxLT[1]), parseFloat(mapPxRB[1]));

        var charts = me.charts;
        var chartsBounds = [];

        // 压盖处理 & 添加图形
        for (var i = 0, len = charts.length; i < len; i++) {
            var chart = charts[i];
            // 图形参考位置  (reSetLocation 会更新 chartBounds)
            var shapeROP = chart.resetLocation();
            // 图表框
            var cbs = chart.chartBounds;
            // 地图范围外不绘制
            if (mBounds && !me.isChartInMap(mBounds, cbs)) {
                continue;
            }
            //图形太大不绘制

            var zoomLevel = me._map.getZoom();
            var zoomD = zoomLevel - me.options.fitZoom;
            if (mBounds && me.options.fitZoom > -1 && Math.abs(zoomLevel - me.options.fitZoom) > 1) {
                continue;
            }

            // 是否压盖
            var isOverlay = false;

            for (let j = 0; j < chartsBounds.length; j++) {
                //压盖判断
                if (me.isQuadrilateralOverLap(cbs, chartsBounds[j])) {
                    isOverlay = true;
                    break;
                }
            }

            if (isOverlay) {
                continue;
            } else {
                chartsBounds.push(cbs);
            }

            // 添加图形
            var shapes = chart.shapes;
            for (let j = 0, slen = shapes.length; j < slen; j++) {
                shapes[j].refOriginalPosition = shapeROP;
                me.renderer.addShape(shapes[j]);
            }
        }
    }
});
export var rankSymbolThemeLayer = function (name, symbolType, options) {
    return new RankSymbolThemeLayer(name, symbolType, options);
};
Zondy.Map.rankSymbolThemeLayer = rankSymbolThemeLayer;