/**
 * 事件模型基类，负责事件监听和发送
 */
 export default class Observable {

  constructor() { }

  /**
   * 发送事件
   * @param { String } eventName 事件名称
   * @param { Object } options   事件参数
   * @returns Observable this对象
   */
  fire(eventName, options) {
      if (!this._eventListeners) {
          return this;
      }

      var listenersForEvent = this._eventListeners[eventName];
      if (!listenersForEvent) {
          return this;
      }

      for (let i = 0, len = listenersForEvent.length; i < len; i += 1) {
          listenersForEvent[i] && listenersForEvent[i].call(this, options || {});
      }

      this._eventListeners[eventName] = listenersForEvent.filter(function (
          value
      ) {
          return value !== false;
      });

      return this;
  }

  /**
   * 添加监听事件
   * @param {String} eventName 事件名称
   * @param {Function} handler 事件处理函数
   * @returns {Observable} this对象
   */
  on(eventName, handler) {
      if (!this._eventListeners) {
          this._eventListeners = {};
      }

      if (arguments.length === 1) {
          for (let prop in eventName) {
              this.on(prop, eventName[prop]);
          }
      } else {
          if (!this._eventListeners[eventName]) {
              this._eventListeners[eventName] = [];
          }
          this._eventListeners[eventName].push(handler);
      }

      return this;
  }

  /**
   * 添加事件监听,只触发一次
   * @param {String} eventName 事件名称
   * @param {Function} handler 事件处理函数
   * @returns {Observable} this对象
   */
  once(eventName, handler) {
      const _handler = function () {
          handler.apply(this, arguments);
          this.off(eventName, _handler);
      }.bind(this);

      this.on(eventName, _handler);

      return this;
  }

  /**
   * 移除事件监听
   * @param {String} eventName 事件名称
   * @param {Function} handler 事件处理函数
   * @returns {Observable} this对象
   */
  off(eventName, handler) {
      if (!this._eventListeners) {
          return this;
      }

      if (arguments.length === 0) {
          for (eventName in this._eventListeners) {
              this._removeEventListener(eventName);
          }
      }
      else if (arguments.length === 1 && typeof arguments[0] === "object") {
          for (var prop in eventName) {
              this._removeEventListener(prop, eventName[prop]);
          }
      } else {
          this._removeEventListener(eventName, handler);
      }
      return this;
  }

  _removeEventListener(eventName, handler) {
      if (!this._eventListeners[eventName]) {
          return;
      }
      var eventListener = this._eventListeners[eventName];
      if (handler) {
          eventListener[eventListener.indexOf(handler)] = false;
      }
      else {
          let k = eventListener.length;
          while (k--) {
              eventListener[k] = false;
          }
      }
  }
}
