import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { VisualVariable } from './VisualVariable';

/**
 * 视觉变量-透明度视觉变量
 * @class mapgis.renderer.OpacityVariable
 * @classdesc 视觉变量-透明度视觉变量
 * @param {String} [type] 视觉变量类型，只能是 'opacity'
 * @param {String} [field] 视觉变量字段
 * @param {String} [valueExpression] 计算表达式，用来对要素中的单/多个属性进行数学计算
 * @param {String} [valueExpressionTitle] 计算表达式标题
 * @param {String} [normalizationType] 归一化类型，可选 "field"|"percent-of-total"|"log"
 * @param {String} [normalizationField] 归一化字段，将renderer中对应字段数据值除以归一化字段数据值
 * @param {Number} [normalizationTotal] 归一化值，将renderer中对应字段数据值除以所有数据值的总和
 * @param {Array<OpacityStop>} [stops] 视觉变量透明度数组，定义在一系列停靠点中应用于要素的透明度
 */
export default class OpacityVariable extends VisualVariable {
  constructor(option) {
    super(option);
    var options = option ? option : {};
    const { type = "opacity" } = options;
    this.type = type;
    const { field, valueExpression, valueExpressionTitle, normalizationType, normalizationField, normalizationTotal, stops } = options;
    this.field = field;
    this.valueExpression = valueExpression;
    this.valueExpressionTitle = valueExpressionTitle;
    this.normalizationType = normalizationType;
    this.normalizationField = normalizationField;
    this.normalizationTotal = normalizationTotal;
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
    const { type = "opacity" } = json;
    this.type = type;
    const { field, valueExpression, valueExpressionTitle, normalizationType, normalizationField, normalizationTotal, stops } = json;
    this.field = field;
    this.valueExpression = valueExpression;
    this.valueExpressionTitle = valueExpressionTitle;
    this.normalizationType = normalizationType;
    this.normalizationField = normalizationField;
    this.normalizationTotal = normalizationTotal;
    this.stops = stops;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 视觉变量的实例化JSON
  */
  toJSON() {
    return {
      type: this.type,
      field: this.field,
      valueExpression: this.valueExpression,
      valueExpressionTitle: this.valueExpressionTitle,
      normalizationType: this.normalizationType,
      normalizationField: this.normalizationField,
      normalizationTotal: this.normalizationTotal,
      stops: this.stops,
    };
  }
}

export { OpacityVariable };
mapgis.renderer.OpacityVariable = OpacityVariable;
