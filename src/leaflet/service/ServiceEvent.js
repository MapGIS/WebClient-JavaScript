import L from "leaflet";

/**
 * @class L.zondy.ServiceEvent
 * @classdesc L.zondy 服务事件，该类主要是用于事件的传递
 * @param {string} url - url地址
 * @param {Object} options - 参数
 * @fires L.zondy.ServiceEvent#initialize
 * @fires L.zondy.ServiceEvent#destroy
 */
export var ServiceEvent = L.Evented.extend({
  initialize: function(url, options) {
    this.url = url;
    L.setOptions(this, options);
    this.fire("initialize", this);
  },

  destroy: function() {
    this.fire("destroy", this);
  }
});
L.zondy.ServiceEvent = ServiceEvent;
