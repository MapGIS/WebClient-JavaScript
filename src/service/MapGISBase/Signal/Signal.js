import { SignalBinding } from "./SignalBinding";

/**
 * 自定义事件监听发送
 */
export class Signal {
  constructor() {
    this._bindings = [];
    this._shouldPropagate = true;
  }

  /**
   * 添加监听
   * @param {Function} listener 调用函数，_shouldPropagate为false时，调用函数返回值代表了是否继续执行优先级更低的函数
   * @param {Object} context 上下文
   * @param {Number} priority 优先级 值越大，越先调用
   */
  add(listener, context, priority) {
    return this._registerListener(listener, false, context, priority);
  }

  addOnce(listener, context, priority) {
    return this._registerListener(listener, true, context, priority);
  }

  /**
   * 移除监听
   * @param {Function} listener 
   * @param {Object} context 
   * @returns 
   */
  remove(listener, context) {
    const index = this._indexOfListener(listener, context);
    if (index !== -1) {
      this._bindings[index].destory();
      this._bindings.splice(index, 1);
    }

    return listener;
  }

  /**
   * 触发事件
   * @param {Object} params 事件参数 
   */
  dispatch(params) {
    //clone array in case add/remove items during dispatch
    const bindings = this._bindings.slice();

    let len = this._bindings.length;
    do {
      len--;
    } while (
      bindings[len] &&
      this._shouldPropagate &&
      bindings[len].excute(params) !== false
    );
  }

  removeAll() {
    let len = this._bindings.length;
    while (len--) {
      this._bindings[n].destory();
    }

    this._bindings = [];
  }

  /**
   * 停止冒泡
   */
  halt()
  {
      this._shouldPropagate=false;
  }

  destory() {
    this.removeAll();
    this._bindings = undefined;
  }

  /**
   * 注册监听
   * @param {Function} listener
   * @param {boolean} isOnce
   * @param {Object} context
   * @param {Number} priority 优先级
   * @returns {}
   * @private
   */
  _registerListener(listener, isOnce, context, priority) {
    const binding = new SignalBinding(
      this,
      listener,
      isOnce,
      context,
      priority
    );
    this._addBinding(binding);
    return binding;
  }

  /**
   * 获取listener和context监听索引值
   * @function
   * @param {Function} listener
   * @param {Object} context
   * @returns {Number}
   * @private
   */
  _indexOfListener(listener, context) {
    let len = this._bindings.length;
    while (len--) {
      const cur = this._bindings[len];
      if (cur._listener === listener && cur._context === context) {
        return len;
      }
    }

    return -1;
  }

  /**
   * 根据优先级添加SignalBinding
   * @function
   * @param {SignalBinding} binding
   * @private
   */
  _addBinding(binding) {
    let len = this._bindings.length;
    do {
      --len;
    } while (
      this._bindings[len] &&
      binding._priority <= this._bindings[len]._priority
    );

    this._bindings.splice(len + 1, 0, binding);
  }
}
