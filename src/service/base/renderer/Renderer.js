import { mapgis } from '../common/base';

/**
 * 三维专题图渲染基类
 * @class mapgis.renderer.Renderer
 * @classdesc 三维专题图渲染基类
 * @param {String} [type] 三维专题图类型，可选 "simple"|"unique-value"|"class-breaks"
 * @param {Object} [authoringInfo] 三维专题图创建的元信息
 */
export default class Renderer {
  constructor(option) {
    var options = option ? option : {};
    const { type, authoringInfo } = options;
    this.type = type;
    this.authoringInfo = authoringInfo;
  }

  /**
  * @description 将JSON格式的渲染规则转换为JS对象
  * @param {Object} json 渲染规则的实例化JSON
  */
  fromJSON(json) {
    json = json || {};
    const { type, authoringInfo } = json;
    this.type = type;
    this.authoringInfo = authoringInfo;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 渲染规则的实例化JSON
  */
  toJSON() {
    return {
      type: this.type,
      authoringInfo: this.authoringInfo,
    };
  }
}

export { Renderer };
mapgis.renderer.Renderer = Renderer;
