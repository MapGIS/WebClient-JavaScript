import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { Renderer } from './Renderer';

import { Symbols } from "@mapgis/webclient-es6-service";
const { PointSymbol3D, PolygonSymbol3D, LineSymbol3D } = Symbols;

/**
 * 三维专题图-单值信息
 * @class mapgis.renderer.UniqueValueInfo
 * @classdesc 三维专题图-单值信息
 * @param {String|Number} [value] 指定字段下的要素值，具有此值的要素将使用给定的符号可视化
 * @param {Symbol} [symbol] 符号，用来渲染指定要素
 * @param {String} [label] 标签，用来描述符号表示的值
 */
export default class UniqueValueInfo {
  constructor(option) {
    var options = option ? option : {};
    const { value, symbol, label } = options;
    this.value = value;
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
  * @description 将JSON格式的单值信息转换为JS对象
  * @param {Object} json 单值信息的实例化JSON
  */
   fromJSON(json) {
    json = json || {};
    const { value, symbol, label } = json;
    this.value = value;
    this.symbol = symbol;
    this.label = label;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 单值信息的实例化JSON
  */
  toJSON() {
    return {
      value: this.value,
      symbol: this.symbol,
      label: this.label,
    };
  }
}

export { UniqueValueInfo };
mapgis.renderer.UniqueValueInfo = UniqueValueInfo;
