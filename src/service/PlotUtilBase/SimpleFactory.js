import { defined } from "./Check";
import { warn } from "./Log";

/**
 * 简单工厂方法
 */
export default class SimpleFactory {
  constructor() {
    this._type2Protos = {};
  }

  /**
   * 注册原型
   * @param { string } type 类型
   * @param { object } proto 原型
   * @returns this 对象,方便链式调用
   */
  register(type, proto) {
    this._type2Protos[type] = proto;

    return this;
  }

  /**
   * 根据类型及参数列表创建对象
   * @param {string} type 类型
   * @param  {...any} args 参数列表
   * @returns 实例化对象,失败返回undefined
   */
  createInstance(type, ...args) {
    let Proto = undefined;
    for (const key in this._type2Protos) {
      if (new RegExp(`^${key}$`, "i").test(type)) {
        Proto = this._type2Protos[key];
        break;
      }
    }

    if (!defined(Proto)) {
      warn("未找到", type, "对应的原型", this._type2Protos);
      return undefined;
    }

    return new Proto(...args);
  }
}