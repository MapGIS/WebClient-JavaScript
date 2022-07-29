import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { Renderer } from './Renderer';

import { PointSymbol3D, PolygonSymbol3D, LineSymbol3D } from "../symbols/index";

/**
 * 三维专题图-单值专题图
 * @class mapgis.renderer.UniqueValueRenderer
 * @classdesc 三维专题图-单值专题图
 * @param {String} [type] 专题图类型，只能是'unique-value'
 * @param {String} [field] 专题图字段名称，用来确定分段要素
 * @param {String} [field2] 专题图字段名称，用来确定分段要素
 * @param {String} [field3] 专题图字段名称，用来确定分段要素
 * @param {Symbol} [defaultSymbol] 专题图默认符号样式，用来绘制具有与给定单值不匹配的要素
 * @param {String} [defaultLabel] 专题图图例标签，用来描述分配了默认符号的元素
 * @param {Array<UniqueValueInfo>} [uniqueValueInfos] 专题图单值信息
 * @param {Array<VisualVariable>} [visualVariables] 专题图视觉变量，可选 "color"|"opacity"|"size"|"rotation"
 * @param {PolygonSymbol3D} [backgroundFillSymbol] 专题图边界变量，使用分级符号对面要素进行符号化时，在此属性上设置以可视化每个要素的边界
 * @param {String} [fieldDelimiter] 专题图字段分隔符，如果指定了多个属性字段，则在值之间插入字符串
 * @param {Object} [legendOptions] 专题图图例选项，用来在图例中展示符号信息
 * @param {String} [valueExpression] 专题图计算表达式，用来对要素中的单/多个属性进行数学计算
 * @param {String} [valueExpressionTitle] 专题图计算表达式标题，在legendOptions属性中没有提供的情况下，将显示为图例中的标题
 */
export default class UniqueValueRenderer extends Renderer {
  constructor(option) {
    super(option);
    var options = option ? option : {};
    const { type = "unique-value" } = options;
    this.type = type;
    const { field, field2, field3, defaultSymbol, defaultLabel, uniqueValueInfos, visualVariables, backgroundFillSymbol, fieldDelimiter, legendOptions, valueExpression, valueExpressionTitle } = options;
    this.field = field;
    this.field2 = field2;
    this.field3 = field3;
    this.defaultSymbol = defaultSymbol;
    this.defaultLabel = defaultLabel;
    this.uniqueValueInfos = uniqueValueInfos;
    this.visualVariables = visualVariables;
    this.backgroundFillSymbol = backgroundFillSymbol;
    this.fieldDelimiter = fieldDelimiter;
    this.legendOptions = legendOptions;
    this.valueExpression = valueExpression;
    this.valueExpressionTitle = valueExpressionTitle;
  }

  /**
  * @description 克隆函数
  */
   clone() {
    return cloneDeep(this);
  }

  /**
  * @description 将JSON格式的渲染规则转换为JS对象
  * @param {Object} json 渲染规则的实例化JSON
  */
   fromJSON(json) {
    json = json || {};
    const { type = "unique-value" } = json;
    this.type = type;
    const { field, field2, field3, defaultSymbol, defaultLabel, uniqueValueInfos, visualVariables, backgroundFillSymbol, fieldDelimiter, legendOptions, valueExpression, valueExpressionTitle } = json;
    this.field = field;
    this.field2 = field2;
    this.field3 = field3;
    this.defaultSymbol = defaultSymbol;
    this.defaultLabel = defaultLabel;
    this.uniqueValueInfos = uniqueValueInfos;
    this.visualVariables = visualVariables;
    this.backgroundFillSymbol = backgroundFillSymbol;
    this.fieldDelimiter = fieldDelimiter;
    this.legendOptions = legendOptions;
    this.valueExpression = valueExpression;
    this.valueExpressionTitle = valueExpressionTitle;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 渲染规则的实例化JSON
  */
  toJSON() {
    return {
      type: this.type,
      field: this.field,
      field2: this.field2,
      field3: this.field3,
      defaultSymbol: this.defaultSymbol,
      defaultLabel: this.defaultLabel,
      uniqueValueInfos: this.uniqueValueInfos,
      visualVariables: this.visualVariables,
      backgroundFillSymbol: this.backgroundFillSymbol,
      fieldDelimiter: this.fieldDelimiter,
      legendOptions: this.legendOptions,
      valueExpression: this.valueExpression,
      valueExpressionTitle: this.valueExpressionTitle,
    };
  }

  /**
  * @description 添加单值信息
  * @param {Object} info 单值信息的实例化对象
  */
  addUniqueValueInfo(info) {
    info = info || {};
    this.uniqueValueInfos.push(info);
  }

  /**
  * @description 获取单值信息
  * @param {Object} info 单值信息的实例化对象
  * @returns {Object} 根据info查询到的单值信息
  */
  getUniqueValueInfo(info) {
    info = info || {};
    const { value, symbol, label } = info;
    for(let i = 0; i < this.uniqueValueInfos.length; i++) {
      let item = this.uniqueValueInfos[i];
      if (item.value == value) {
        return item;
      }
    }
  }

  /**
  * @description 移除单值信息
  * @param {Object} json 渲染规则的实例化JSON
  */
  removeUniqueValueInfo(info) {
    info = info || {};
    const { value, symbol, label } = info;
    for(let i = 0; i < this.uniqueValueInfos.length; i++) {
      let item = this.uniqueValueInfos[i];
      if (item.value == value) {
        this.uniqueValueInfos.splice(i, 1);
      }
    }
  }
}

export { UniqueValueRenderer };
mapgis.renderer.UniqueValueRenderer = UniqueValueRenderer;
