import mapboxgl from '@mapgis/mapbox-gl';
import '../core/Base';
import { SocketService } from '../service/socket/SocketService';

import { SubscribeEvent } from '../service/socket/SocketEvent';

import { MapvStreamLayer } from './stream/MapvStreamLayer';
import { GeojsonStreamLayer } from './stream/GeojsonStreamLayer';

/**
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.StreamLayer
 * @classdesc 基于leaflet的Layer对象进行的拓展
 * @extends {L.LayerGroup}
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 设置图层参数
 * @param {Object} [options.render='normal'] - 渲染方式。可选值为'geojson', 'mapv', 'echarts'
 */
export class StreamLayer {
  constructor(map, url, options) {
    this.options = options || {}
    this.map = map
    this.url = url

    this.layer = undefined

    this.socketService = new SocketService(this.url, this.options)
  }

  addTo(map) {
    this.map = map

    this.bindEvent()

    if (this.options.render === 'mapv') {
      this.layer = new MapvStreamLayer(this.map, this.url, this.options)
    } else {
      this.layer = new GeojsonStreamLayer(this.map, this.url, this.options)
    }
  }

  bindEvent() {
    this.socketService.createSubscribe()

    this.socketService.on(SubscribeEvent.OPEN, e =>
      this.fire(SubscribeEvent.OPEN, e)
    )
    this.socketService.on(SubscribeEvent.MESSAGE, msg => this.onMessage(msg))
  }

  unbindEvent() {
    if (!this.socketService) return

    this.socketService.on(SubscribeEvent.OPEN, e =>
      this.fire(SubscribeEvent.OPEN, e)
    )
    this.socketService.on(SubscribeEvent.MESSAGE, msg => this.onMessage(msg))

    this.socketService && this.socketService.closeSubscribe()
  }

  remove() {
    this.unbindEvent()
  }

  fire(type, event) {

  }

  onMessage(msg) {
    this.layer.onMessage(msg)
    /* this.fire(LayerEvent.UPDATE, {
      layer: this.layer,
      data: msg.feature
    }) */
  }
}

export var streamLayer = function (map, url, options) {
  return new StreamLayer(map, url, options)
}

mapboxgl.zondy.StreamLayer = streamLayer
