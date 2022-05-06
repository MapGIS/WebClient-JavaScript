/*
 * @Description: 
 * @Author: zk
 * @Date: 2021-11-18 15:08:49
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-01-04 13:31:43
 */
import { param } from "jquery";
import { defaultValue } from "../Check";

export class SignalBinding {
  constructor(signal, listener, isOnce, context, priority) {
    this._listener = listener;
    this._isOnce = isOnce;
    this._context = context;
    this._signal = signal;
    this._priority = defaultValue(priority, 0);
  }

  excute(params) {
    // apply(this,[params])
    const ret = this._listener.apply(this._context, [params]);
    if (this._isOnce) {
      this.detach();
    }

    return ret;
  }

  detach() {
    return this.isValid()
      ? this._signal.remove(this._listener, this._context)
      : null;
  }

  isValid() {
    return !!this._signal && !!this._listener;
  }

  /**
   * 判断是否只监听一次
   * @returns {Boolean}
   */
  isOnce() {
    return this._isOnce;
  }

  getSignal() {
    return this._signal;
  }

  getListener() {
    return this._listener;
  }

  destroy() {
    this._listener = undefined;
    this._context = undefined;
    this._signal = undefined;
  }
}
