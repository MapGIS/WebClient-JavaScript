import mapboxgl from 'mapbox-gl';

/**
 * @class GeojsonStreamLayer
 * @classdesc SocketLayer GeoJson渲染器。
 * @param {string} url - 数据流图层服务地址
 * @param {Object} options - 其他参数，先保留。
 *
 * @param {Object} options.style - 默认的geojson的style。
 * @param {Object} options.pointToLayer - geojson针对点图层的样式设置。
 * @param {Object} options.onEachFeature - geojson针对常见几何的样式设置。
 *
 * @param {Object} options.field - geojson的唯一标识字段，请确保该字段的唯一性。
 * @param {Object} options.icon - 显示的图片，与sprite配合
 */
export class GeojsonStreamLayer {
  constructor(map, url, options) {
    options = options || {};

    this.map = map
    this.url = url
    this.options = options
    this.icon = options ? options.icon : 'rocket-15'

    this.data = {
      "type": "FeatureCollection",
      "features": []
    }

    this.fieldHash = {}

    this.bindData()
  }

  getPopupHtml(e) {
    let views = '';
     Object.keys(e.features[0].properties).map(key => {
       views += `<div class='mapgis-inspect-layer-popup-li'>
        <div class='mapgis-inspect-layer-popup-type'>${key}</div>
        <div class='mapgis-inspect-layer-popup-value'>${e.features[0].properties[key]}</div>
      </div>`
      return undefined
    });

    return `
      <div class='mapgis-inspect-layer-popup-list'>
        <div class='mapgis-inspect-layer-popup-li'>
          <div class='mapgis-inspect-layer-popup-type'>经度</div>
          <div class='mapgis-inspect-layer-popup-value'>${e.lngLat.lng}</div>
        </div>
        <div class='mapgis-inspect-layer-popup-li'>
          <div class='mapgis-inspect-layer-popup-type'>纬度</div>
          <div class='mapgis-inspect-layer-popup-value'>${e.lngLat.lat}</div>
        </div>
        <div class='mapgis-inspect-layer-popup-li'>
          <div class='mapgis-inspect-layer-popup-type'>屏幕像素X</div>
          <div class='mapgis-inspect-layer-popup-value'>${e.point.x}</div>
        </div>
        <div class='mapgis-inspect-layer-popup-li'>
          <div class='mapgis-inspect-layer-popup-type'>屏幕像素Y</div>
          <div class='mapgis-inspect-layer-popup-value'>${e.point.y}</div>
        </div>
      </div>
      `
      + views;
  }

  bindData() {
    let map = this.map
    let self = this
    map.addSource('webclient-mapboxgl-stream', { type: 'geojson', data: this.data })
    map.addLayer({
      "id": "webclient-mapboxgl-stream",
      "type": "symbol",
      "source": "webclient-mapboxgl-stream",
      "layout": {
        "icon-image": this.icon
      }
    });
    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on('click', 'webclient-mapboxgl-stream', function (e) {
      console.log('stream item', e)
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(self.getPopupHtml(e))
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the states layer.
    map.on('mouseenter', 'webclient-mapboxgl-stream', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'webclient-mapboxgl-stream', function () {
      map.getCanvas().style.cursor = '';
    });
  }

  unbindData() {
    let map = this.map
    map.removeLayer('webclient-mapboxgl-stream')
    map.removeSource('webclient-mapboxgl-stream')
    // map.off()
  }

  onMessage(msg) {
    const feature = msg.feature
    const field = msg.feature.properties[this.options.field]
    let layer = feature
    if (!field) return

    if (this.fieldHash[field]) {
      this.data.features[this.fieldHash[field]] = layer
    } else {
      this.data.features.push(layer)
      this.fieldHash[field] = this.data.features.length - 1
    }

    this.map.getSource('webclient-mapboxgl-stream').setData(this.data)

    if (this.options.onEachFeature) {
      // this.options.onEachFeature(feature, layer)
    }
  }

  parasFeature(layer, feature) {

  }
}


