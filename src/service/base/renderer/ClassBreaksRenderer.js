import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { Renderer } from './Renderer';

import { PointSymbol3D, PolygonSymbol3D, LineSymbol3D } from "../symbols/index";

/**
 * 三维专题图-分段专题图
 * @class mapgis.renderer.ClassBreaksRenderer
 * @classdesc 三维专题图-分段专题图
 * @param {String} [type] 专题图类型，只能是'class-breaks'
 * @param {String} [field] 专题图字段名称，用来确定分段要素
 * @param {Symbol} [defaultSymbol] 专题图默认符号样式，用来绘制具有与给定中断值不匹配的要素
 * @param {String} [defaultLabel] 专题图图例标签，用来描述分配了默认符号的元素
 * @param {Array<ClassBreakInfo>} [classBreakInfos] 专题图分段信息
 * @param {Array<VisualVariable>} [visualVariables] 专题图视觉变量，可选 "color"|"opacity"|"size"|"rotation"
 * @param {PolygonSymbol3D} [backgroundFillSymbol] 专题图边界变量，使用分级符号对面要素进行符号化时，在此属性上设置以可视化每个要素的边界
 * @param {Object} [legendOptions] 专题图图例选项，用来在图例中展示符号信息
 * @param {String} [normalizationType] 专题图归一化类型，可选 "field"|"percent-of-total"|"log"
 * @param {String} [normalizationField] 专题图归一化字段，将数据值除以对应字段数据值
 * @param {Number} [normalizationTotal] 专题图归一化值，将数据值除以所有数据值的总和
 * @param {String} [valueExpression] 专题图计算表达式，用来对要素中的单/多个属性进行数学计算
 * @param {String} [valueExpressionTitle] 专题图计算表达式标题，在legendOptions属性中没有提供的情况下，将显示为图例中的标题
 */
export default class ClassBreaksRenderer extends Renderer {
  constructor(option) {
    super(option);
    var options = option ? option : {};
    const { type = "class-breaks" } = options;
    this.type = type;
    const { field, defaultSymbol, defaultLabel, classBreakInfos, visualVariables, backgroundFillSymbol, legendOptions, normalizationType, normalizationField, normalizationTotal, valueExpression, valueExpressionTitle } = options;
    this.field = field;
    this.defaultSymbol = defaultSymbol;
    this.defaultLabel = defaultLabel;
    this.classBreakInfos = classBreakInfos;
    this.visualVariables = visualVariables;
    this.backgroundFillSymbol = backgroundFillSymbol;
    this.legendOptions = legendOptions;
    this.normalizationType = normalizationType;
    this.normalizationField = normalizationField;
    this.normalizationTotal = normalizationTotal;
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
    const { type = "class-breaks" } = json;
    this.type = type;
    const { field, defaultSymbol, defaultLabel, classBreakInfos, visualVariables, backgroundFillSymbol, legendOptions, normalizationType, normalizationField, normalizationTotal, valueExpression, valueExpressionTitle } = json;
    this.field = field;
    this.defaultSymbol = defaultSymbol;
    this.defaultLabel = defaultLabel;
    this.classBreakInfos = classBreakInfos;
    this.visualVariables = visualVariables;
    this.backgroundFillSymbol = backgroundFillSymbol;
    this.legendOptions = legendOptions;
    this.normalizationType = normalizationType;
    this.normalizationField = normalizationField;
    this.normalizationTotal = normalizationTotal;
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
      defaultSymbol: this.defaultSymbol,
      defaultLabel: this.defaultLabel,
      classBreakInfos: this.classBreakInfos,
      visualVariables: this.visualVariables,
      backgroundFillSymbol: this.backgroundFillSymbol,
      legendOptions: this.legendOptions,
      normalizationType: this.normalizationType,
      normalizationField: this.normalizationField,
      normalizationTotal: this.normalizationTotal,
      valueExpression: this.valueExpression,
      valueExpressionTitle: this.valueExpressionTitle
    };
  }

  /**
  * @description 添加分段信息
  * @param {Object} info 分段信息的实例化对象
  */
  addClassBreakInfo(info) {
    info = info || {};
    this.classBreakInfos.push(info);
  }

  /**
  * @description 获取分段信息
  * @param {Object} info 分段信息的实例化对象
  * @returns {Object} 根据info查询到的分段信息
  */
  getClassBreakInfo(info) {
    info = info || {};
    const { minValue, maxValue, symbol, label } = info;
    for(let i = 0; i < this.classBreakInfos.length; i++) {
      let item = this.classBreakInfos[i];
      if (item.minValue == minValue && item.maxValue == maxValue) {
        return item;
      }
    }
  }

  /**
  * @description 移除分段信息
  * @param {Object} info 分段信息的实例化对象
  */
  removeClassBreakInfo(info) {
    info = info || {};
    const { minValue, maxValue, symbol, label } = info;
    for(let i = 0; i < this.classBreakInfos.length; i++) {
      let item = this.classBreakInfos[i];
      if (item.minValue == minValue && item.maxValue == maxValue) {
        this.classBreakInfos.splice(i, 1);
      }
    }
  }
}

export { ClassBreaksRenderer };
mapgis.renderer.ClassBreaksRenderer = ClassBreaksRenderer;
