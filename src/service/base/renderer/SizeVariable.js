import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { VisualVariable } from './VisualVariable';

/**
 * 视觉变量-大小视觉变量
 * @class mapgis.renderer.SizeVariable
 * @classdesc 视觉变量-大小视觉变量
 * @param {String} [type] 视觉变量类型，只能是 'size'
 * @param {String} [axis] 轴，可选 "heading"|"tilt"|"roll"
 * @param {Object} [legendOptions] 图例选项，用来在图例中展示符号信息
 * @param {Number} [maxDataValue] 尺寸渐变中使用的最大数据值
 * @param {Number} [maxSize] 最大数据值的要素尺寸的大小
 * @param {Number} [minDataValue] 尺寸渐变中使用的最小数据值
 * @param {Number} [minSize] 最小数据值的要素尺寸的大小
 * @param {String} [normalizationField] 标准化数据所依据的数字属性字段的名称，将数据值除以对应字段数据值，然后乘以 100得到比率
 * @param {Array<SizeStop>} [stops] 视觉变量尺寸数组，定义从field或valueExpression返回的数据值到符号大小的映射的对象数组
 * @param {String} [target] outline在根据视图比例缩放多边形轮廓宽度时，必须使用此值
 * @param {Boolean} [useSymbolValue] 使用符号值，当使用ObjectSymbol3DLayer在渲染器上设置大小可视变量时，此属性指示是否将由height、width或depth属性定义的值应用于此可视变量的相应轴，而不是按比例缩放此轴的值
 * @param {String} [valueRepresentation] 指定在映射实际大小时如何应用数据值
 * @param {String} [valueUnit] 度量单位，用于field或valueExpression返回的值上
 */
export default class SizeVariable extends VisualVariable {
  constructor(option) {
    super(option);
    var options = option ? option : {};
    const { type = "size" } = options;
    this.type = type;
    const { axis, legendOptions, maxDataValue, maxSize, minDataValue, minSize, normalizationField, stops, target, useSymbolValue, valueRepresentation, valueUnit } = options;
    this.axis = axis;
    this.legendOptions = legendOptions;
    this.maxDataValue = maxDataValue;
    this.maxSize = maxSize;
    this.minDataValue = minDataValue;
    this.minSize = minSize;
    this.normalizationField = normalizationField;
    this.stops = stops;
    this.target = target;
    this.useSymbolValue = useSymbolValue;
    this.valueRepresentation = valueRepresentation;
    this.valueUnit = valueUnit;
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
    const { type = "size" } = json;
    this.type = type;
    const { axis, legendOptions, maxDataValue, maxSize, minDataValue, minSize, normalizationField, stops, target, useSymbolValue, valueRepresentation, valueUnit } = json;
    this.axis = axis;
    this.legendOptions = legendOptions;
    this.maxDataValue = maxDataValue;
    this.maxSize = maxSize;
    this.minDataValue = minDataValue;
    this.minSize = minSize;
    this.normalizationField = normalizationField;
    this.stops = stops;
    this.target = target;
    this.useSymbolValue = useSymbolValue;
    this.valueRepresentation = valueRepresentation;
    this.valueUnit = valueUnit;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 视觉变量的实例化JSON
  */
  toJSON() {
    return {
      type: this.type,
      axis: this.axis,
      legendOptions: this.legendOptions,
      maxDataValue: this.maxDataValue,
      maxSize: this.maxSize,
      minDataValue: this.minDataValue,
      minSize: this.minSize,
      normalizationField: this.normalizationField,
      stops: this.stops,
      target: this.target,
      useSymbolValue: this.useSymbolValue,
      valueRepresentation: this.valueRepresentation,
      valueUnit: this.valueUnit,
    };
  }
}

export { SizeVariable };
mapgis.renderer.SizeVariable = SizeVariable;
