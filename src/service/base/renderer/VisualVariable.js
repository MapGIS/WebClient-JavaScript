import { mapgis } from '../common/base';

/**
 * 视觉变量基类
 * @class mapgis.renderer.VisualVariable
 * @classdesc 视觉变量基类
 * @param {String} [type] 视觉变量类型，可选 "color"|"opacity"|"rotation"|"size"
 * @param {String} [field] 字段名称，包含用于确定每个要素的颜色/不透明度/大小/旋转的数据值的数字属性字段的名称
 * @param {Object} [legendOptions] 图例选项，用来在图例中展示视觉变量信息
 * @param {String} [valueExpression] 计算表达式，用来对要素中的单/多个属性进行数学计算
 * @param {String} [valueExpressionTitle] 计算表达式标题，在legendOptions属性中没有提供的情况下，将显示为图例中的标题
 */
export default class VisualVariable {
  constructor(option) {
    var options = option ? option : {};
    const { type, field, legendOptions, valueExpression, valueExpressionTitle } = options;
    this.type = type;
    this.field = field;
    this.legendOptions = legendOptions;
    this.valueExpression = valueExpression;
    this.valueExpressionTitle = valueExpressionTitle;
  }

  /**
  * @description 将JSON格式的视觉变量转换为JS对象
  * @param {Object} json 视觉变量的实例化JSON
  */
  fromJSON(json) {
    json = json || {};
    const { type, field, legendOptions, valueExpression, valueExpressionTitle } = json;
    this.type = type;
    this.field = field;
    this.legendOptions = legendOptions;
    this.valueExpression = valueExpression;
    this.valueExpressionTitle = valueExpressionTitle;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 视觉变量的实例化JSON
  */
  toJSON() {
    return {
      type: this.type,
      field: this.field,
      legendOptions: this.legendOptions,
      valueExpression: this.valueExpression,
      valueExpressionTitle: this.valueExpressionTitle,
    };
  }
}

export { VisualVariable };
mapgis.renderer.VisualVariable = VisualVariable;
