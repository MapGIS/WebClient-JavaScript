import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { Renderer } from './Renderer';

import { Symbols } from "@mapgis/webclient-es6-service";
const { PointSymbol3D, PolygonSymbol3D, LineSymbol3D } = Symbols;

/**
 * 三维专题图-统一专题图
 * @class mapgis.renderer.SimpleRenderer
 * @classdesc 三维专题图-统一专题图
 * @param {String} [type] 专题图类型，只能是'simple'
 * @param {Symbol} [symbol] 专题图符号样式
 * @param {String} [label] 专题图图例标签，用来描述分配了默认符号的元素
 * @param {Array<VisualVariable>} [visualVariables] 专题图视觉变量，可选 "color"|"opacity"|"size"|"rotation"
 */
export default class SimpleRenderer extends Renderer {
  constructor(option) {
    super(option);
    var options = option ? option : {};
    const { type = "simple" } = options;
    this.type = type;
    const { symbol, label, visualVariables } = options;
    this.symbol = symbol;
    this.label = label;
    this.visualVariables = visualVariables;
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
    const { type = "simple" } = json;
    this.type = type;
    const { symbol, label, visualVariables } = json;
    this.symbol = symbol;
    this.label = label;
    this.visualVariables = visualVariables;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 渲染规则的实例化JSON
  */
  toJSON() {
    return {
      type: this.type,
      symbol: this.symbol,
      label: this.label,
      visualVariables: this.visualVariables
    };
  }
}

export { SimpleRenderer };
mapgis.renderer.SimpleRenderer = SimpleRenderer;
