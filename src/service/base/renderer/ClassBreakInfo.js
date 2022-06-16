import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { Renderer } from './Renderer';

import { PointSymbol3D, PolygonSymbol3D, LineSymbol3D } from "../symbols/index";

/**
 * 三维专题图-分段信息
 * @class mapgis.renderer.ClassBreakInfo
 * @classdesc 三维专题图-分段信息
 * @param {Number} [minValue] 设置分段间隔的最小值
 * @param {Number} [maxValue] 设置分段间隔的最大值
 * @param {Symbol} [symbol] 符号，用来渲染分段间隔最小-最大值之间的要素
 * @param {String} [label] 标签，用来描述符号表示的值
 */
export default class ClassBreakInfo {
  constructor(option) {
    var options = option ? option : {};
    const { minValue, maxValue, symbol, label } = options;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.symbol = symbol;
    this.label = label;
  }

  /**
  * @description 克隆函数
  */
   clone() {
    return cloneDeep(this);
  }

  /**
  * @description 将JSON格式的分段信息转换为JS对象
  * @param {Object} json 分段信息的实例化JSON
  */
   fromJSON(json) {
    json = json || {};
    const { minValue, maxValue, symbol, label } = json;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.symbol = symbol;
    this.label = label;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 分段信息的实例化JSON
  */
  toJSON() {
    return {
      minValue: this.minValue,
      maxValue: this.maxValue,
      symbol: this.symbol,
      label: this.label,
    };
  }
}

export { ClassBreakInfo };
mapgis.renderer.ClassBreakInfo = ClassBreakInfo;
