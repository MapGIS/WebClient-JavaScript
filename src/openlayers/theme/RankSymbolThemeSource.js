import {Zondy} from '../../service/common/Base';
import {GraphThemeSource} from './GraphThemeSource';
import {FeatureTheme} from "../../common/overlay/feature";

/**
 * @class Zondy.Source.RankSymbolThemeSource
 * @classdesc 等级符号专题图图层源。
 * @param {string} name - 专题图层名。
 * @param {string} symbolType - 标志类型。
 * @param {Object} options - 参数。
 * @param {ol.Map} options.map - 当前 Map 对象。
 * @param {string} options.themeFields - 指定创建专题图字段。
 * @param {Object} options.symbolSetting - 符号 Circle 配置对象 symbolSetting。
 * @param {Array.<number>} options.symbolSetting.codomain - 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @param {number} [options.symbolSetting.maxR] - 圆形的最大半径。
 * @param {number} [options.symbolSetting.minR] - 圆形的最小半径。
 * @param {string} [options.symbolSetting.fillColor] - 圆形的填充色，如：fillColor: "#FFB980"。
 * @param {Object} [options.symbolSetting.circleStyle] - 圆形的基础 style，此参数控制圆形基础样式，优先级低于 circleStyleByFields 和 circleStyleByCodomain。
 * @param {number} [options.symbolSetting.decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @param {Object} [options.symbolSetting.circleHoverStyle] - 圆形 hover 状态时的样式，circleHoverAble 为 true 时有效。
 * @param {boolean} [options.symbolSetting.circleHoverAble=true] - 是否允许圆形使用 hover 状态。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
 * @param {boolean} [options.symbolSetting.circleClickAble=true] - 是否允许圆形被点击。同时设置 circleHoverAble 和 circleClickAble 为 false，可以直接屏蔽图形对专题图层事件的响应。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {ol.proj.Projection} [options.projection] - 投影信息。
 * @param {number} [options.ratio=1.5] - 视图比，1 表示画布是地图视口的大小，2 表示地图视口的宽度和高度的两倍，依此类推。 必须是 1 或更高。
 * @param {Array} [options.resolutions] - 分辨率数组。
 * @param {ol.source.State} [options.state] - 资源状态。
 * @param {boolean} [options.isOverLay=true] - 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表。
 * @extends {Zondy.Source.GraphThemeSource}
 */
class RankSymbolThemeSource extends GraphThemeSource {

    constructor(name, symbolType, options) {
        super(name, symbolType, options);
        this.symbolType = symbolType;
        this.symbolSetting = options.symbolSetting;
        this.themeField = options.themeField;
        this.options = {
            calGravity: options.calGravity || true
        }
    }

    /**
     * @function ol.source.RankSymbol.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.symbolType = null;
        this.symbolSetting = null;
        this.themeField = null;
        GraphThemeSource.prototype.destroy.apply(this, arguments);
    }

    /**
     * @function ol.source.RankSymbol.prototype.setSymbolType
     * @description 设置标志符号。
     * @param {string} symbolType - 符号类型。
     */
    setSymbolType(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    }

    /**
     * @private
     * @function ol.source.RankSymbol.prototype.createThematicFeature
     * @description 创建专题图形要素。
     * @param {Object} feature - 要创建的专题图形要素。
     */
    createThematicFeature(feature) {
        var thematicFeature;
        // 检查图形创建条件并创建图形
        if (FeatureTheme[this.symbolType] && this.themeField && this.symbolSetting) {
            thematicFeature = new FeatureTheme[this.symbolType](feature, this, [this.themeField], this.symbolSetting, null, this.options);
        }
        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false;
        }
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    }
}

export {RankSymbolThemeSource};
Zondy.Source.RankSymbolThemeSource = RankSymbolThemeSource;