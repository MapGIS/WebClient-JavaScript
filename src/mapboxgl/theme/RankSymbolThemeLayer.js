import mapboxgl from '@mapgis/mapbox-gl';
import { Common } from '@mapgis/webclient-es6-service';

import { Theme as FeatureTheme } from './common/overlay/feature/Theme';
import { GraphThemeLayer } from './GraphThemeLayer';

const { Zondy } = Common;

/**
 * @class Zondy.Map.rankSymbolThemeLayer
 * @classdesc 等级符号专题图层。
 * @param {string} name - 图层名。
 * @param {string} symbolType - 符号类型。
 * @param {Object} options - 参数。
 * @param {string} [options.id] - 专题图层 ID
 * @param {boolean} [options.loadWhileAnimating=true] - 是否实时重绘。
 * @param {mapboxgl.Map} options.map - 当前 mapboxgl map 对象。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {string} options.themeFields - 指定创建专题图字段。
 * @param {boolean} [options.isOverLay=true] - 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表。
 * @param {string} [options.chartsType] - 图表类型。目前可用："Bar", "Line", "Pie"。
 * @param {Object} [options.symbolSetting] - 各类型图表的 symbolSetting 对象可设属性请参考具体图表模型类的注释中对 symbolSetting 对象可设属性的描述。symbolSetting 对象通常都具有以下 5 个基础可设属性:
 * @param {number} [options.symbolSetting.width] - 专题要素（图表）宽度。
 * @param {number} [options.symbolSetting.height] - 专题要素（图表）高度。
 * @param {Array.<number>} options.symbolSetting.codomain - 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @param {number} [options.symbolSetting.XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
 * @param {number} [options.symbolSetting.YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
 * @param {Array.<number>} options.symbolSetting.dataViewBoxParameter - 数据视图框 dataViewBox 参数，它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
 * @param {number} options.symbolSetting.decimalNumber - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @extends {Zondy.Map.GraphThemeLayer}
 */
class RankSymbolThemeLayer extends GraphThemeLayer {
    constructor(name, symbolType, options) {
        super(name, symbolType, options);
        this.symbolType = symbolType;
        this.symbolSetting = options.symbolSetting;
        this.themeField = options.themeField;
        this.options = {
            calGravity: options.calGravity || true
        };
    }

    /**
     * @function Zondy.Map.rankSymbolThemeLayer.prototype.setSymbolType
     * @description 设置标志符号。
     * @param {string} [symbolType] - 符号类型。
     */
    setSymbolType(symbolType) {
        this.symbolType = symbolType;
        this.redraw();
    }

    /**
     * @function Zondy.Map.rankSymbolThemeLayer.prototype.createThematicFeature
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

export { RankSymbolThemeLayer };
export var rankSymbolThemeLayer = function (name, symbolType, options) {
    return new RankSymbolThemeLayer(name, symbolType, options);
};
Zondy.Map.rankSymbolThemeLayer = rankSymbolThemeLayer;
