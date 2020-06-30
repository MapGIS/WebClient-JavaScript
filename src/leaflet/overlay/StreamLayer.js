import L from "leaflet";
import "../core/Base";
import { SocketService } from "../service/socket/SocketService";

import {
  SubscribeEvent,
  LayerEvent
} from "../../service/common/SocketEvent";

import { MapvStreamLayer } from "./stream/MapvStreamLayer";
import { GeojsonStreamLayer } from "./stream/GeojsonStreamLayer";

/**
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.StreamLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @extends {L.LayerGroup}
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 设置图层参数
 * @param {Object} [options.render='normal'] - 渲染方式。可选值为'geojson', 'mapv', 'echarts'
 */
export var StreamLayer = L.LayerGroup.extend({
  initialize: function(map, url, options) {
    this.options = options || {};
    this.map = map;
    this.url = url;

    //与leaflet源代码一致，
    //var i = this.getLayerId(t);
    //return this._layers[i] = t
    this._layers = {};

    L.Util.setOptions(this, options);

    this.socketService = new SocketService(this.url, this.options);
  },

  onAdd: function(map) {
    this.bindEvent();

    if (this.options.render === "mapv") {
      this.addLayer(new MapvStreamLayer(this.map, this.url, this.options));
    } else {
      this.addLayer(new GeojsonStreamLayer(this.url, this.options));
    }
    L.LayerGroup.prototype.onAdd.call(this, map);
  },

  bindEvent: function() {
    this.socketService.createSubscribe();

    this.socketService.on(SubscribeEvent.OPEN, e =>
      this.fire(SubscribeEvent.OPEN, e)
    );
    this.socketService.on(SubscribeEvent.MESSAGE, msg => this.onMessage(msg));
  },

  unbindEvent: function() {
    if (!this.socketService) return;

    this.socketService.on(SubscribeEvent.OPEN, e =>
      this.fire(SubscribeEvent.OPEN, e)
    );
    this.socketService.on(SubscribeEvent.MESSAGE, msg => this.onMessage(msg));

    this.socketService && this.socketService.closeSubscribe();
  },

  onRemove: function(map) {
    this.unbindEvent();
  },

  onMessage: function(msg) {
    this.getLayers().map(layer => {
      layer.onMessage(msg);
      this.fire(LayerEvent.UPDATE, {
        layer: layer,
        data: msg.feature
      });
      return layer;
    });
  }
});

export var streamLayer = function(map, url, options) {
  return new StreamLayer(map, url, options);
};

L.zondy.StreamLayer = streamLayer;
