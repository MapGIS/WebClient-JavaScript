import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { VisualVariable } from './VisualVariable';

/**
 * 视觉变量-颜色视觉变量
 * @class mapgis.renderer.ColorVariable
 * @classdesc 视觉变量-颜色视觉变量
 * @param {String} [type] 视觉变量类型，只能是 'color'
 * @param {String} [normalizationField] 标准化数据所依据的数字属性字段的名称，将数据值除以对应字段数据值
 * @param {Array<ColorStop>} [stops] 视觉变量颜色数组，定义在一系列停靠点中应用于要素的连续色带的颜色
 */
export default class ColorVariable extends VisualVariable {
  constructor(option) {
    super(option);
    var options = option ? option : {};
    const { type = "color" } = options;
    this.type = type;
    const { normalizationField, stops } = options;
    this.normalizationField = normalizationField;
    this.stops = stops;
  }

  /**
  * @description 克隆函数
  */
  clone() {
    return cloneDeep(this);
  }

  /**
  * @description 将JSON格式的视觉变量转换为JS对象
  * @param {Object} json 视觉变量的实例化JSON
  */
  fromJSON(json) {
    json = json || {};
    const { type = "color" } = json;
    this.type = type;
    const { normalizationField, stops } = json;
    this.normalizationField = normalizationField;
    this.stops = stops;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 视觉变量的实例化JSON
  */
  toJSON() {
    return {
      type: this.type,
      normalizationField: this.normalizationField,
      stops: this.stops,
    };
  }
}

export { ColorVariable };
mapgis.renderer.ColorVariable = ColorVariable;
