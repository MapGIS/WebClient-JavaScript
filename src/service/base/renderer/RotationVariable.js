import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';
import { VisualVariable } from './VisualVariable';

/**
 * 视觉变量-旋转视觉变量
 * @class mapgis.renderer.RotationVariable
 * @classdesc 视觉变量-旋转视觉变量
 * @param {String} [type] 视觉变量类型，只能是 'rotation'
 * @param {String} [axis] 符号旋转所绕的轴，可选 "heading"|"tilt"|"roll"
 * @param {String} [rotationType] 符号旋转方向，此属性仅适用于绕heading轴旋转，可选 "geographic"|"arithmetic"
 */
export default class RotationVariable extends VisualVariable {
  constructor(option) {
    super(option);
    var options = option ? option : {};
    const { type = "rotation" } = options;
    this.type = type;
    const { axis, rotationType } = options;
    this.axis = axis;
    this.rotationType = rotationType;
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
    const { type = "rotation" } = json;
    this.type = type;
    const { axis, rotationType } = options;
    this.axis = axis;
    this.rotationType = rotationType;
  }

  /**
  * 将JS对象转换为JSON格式
  * @returns {Object} 视觉变量的实例化JSON
  */
  toJSON() {
    return {
      type: this.type,
      axis: this.axis,
      rotationType: this.rotationType,
    };
  }
}

export { RotationVariable };
mapgis.renderer.RotationVariable = RotationVariable;
