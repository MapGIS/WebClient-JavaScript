import mapboxgl from '@mapgis/mapbox-gl';
import '../core/Base';

/**
 * @class mapboxgl.zondy.CubeLayer
 * @category  时空立方体
 * @classdesc Cube图层
 * @param map - {Object} 地图
 * @param jsonData -{Object} 数据集
 * @param styleOptions -{Object} 样式参数。如：
 *        layerID - {string} 图层ID。<br>
 */
export class ElsCubeLayer {

  /**
   *
   * @param {Object} map
   * @param {Object} jsonData
   * @param {Object} Options
   */
  constructor(map, jsonData, options) {
    this.map = map;
    this.layers = [];

    this._prepareData(jsonData, options);
    this._createCubes(this.map, options.style);
  }

  /**
   * @function mapboxgl.zondy.ElsCubeLayer.prototype._prepareData
   * @description 针对原始数据进行数据处理，处理高程等信息
   */
  _prepareData(originData, options) {
    /* if(options.z) */
    for (var i = 0; i < 10; i++) {

      var layer = {
        "type": "FeatureCollection",
        "features": []
      };

      this._prepareLayerCubes(layer, originData, options.space, options.index, options.style);

      this.layers.push(layer);
    }

  }

  _prepareLayerCubes(layer, originData, spaceRange, indexRange, styleOption) {
    var item = {};

    originData.forEach(function (point) {
      var centerx = point.lng;
      var centery = point.lat;
      item.minx = centerx - styleOption.radio;
      item.maxx = centerx + styleOption.radio;
      item.miny = centery - styleOption.radio;
      item.maxy = centery + styleOption.radio;
    });

    layer.features.push(this._createCubeItem(item.minx, item.maxx, item.miny, item.maxy));
  }

  _createCubeItem(minx, maxx, miny, maxy, properties) {
    var feature = {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [minx, maxy],
            [maxx, maxy],
            [maxx, miny],
            [minx, miny],
            [minx, maxy]
          ]
        ]
      },
      "properties": properties
    };
    return feature;
  }

  _createCubes(map, style) {
    //this.layers.forEach(function (layer, index) {
    for (var index = 0; index < this.layers.length; index++) {
      var layer = this.layers[this.layers.length - index - 1];
      var sourceId = "TimeSpaceCubeSource" + index;
      var layerId = "ElsCubeLayer" + index;
      var color = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);

      map.addSource(sourceId, {
        "type": "geojson",
        "data": layer
      });

      map.addLayer({
        "id": layerId, //id不同重复，否则只绘制一次
        "type": "fill-extrusion",
        "source": sourceId, //必须和上面的geojsonCollections一致
        "paint": {
          "fill-extrusion-color": color, //颜色
          "fill-extrusion-height": style.height, //['get', 'height'], //固定语法，获取属性值height的数值
          "fill-extrusion-base": style.baseheight * index, //基础高度，表示相对水平面的高度
          "fill-extrusion-opacity": 0.8 //透明度
          //"fill-extrusion-pattern":"si-main-3", //线的拉伸图片类型，一定要与对应的样式库的图片名字一一对应
          //"fill-extrusion-translate": [0,0] //表示显示位置基于原始位置上,再按照屏幕坐标进行偏移,这个应该绝大部分都用不上
        }
      });


    }

  }

  _getRandomColor() {
    return (function (m, s, c) {
      return (c ? arguments.callee(m, s, c - 1) : '#') +
        s[m.floor(m.random() * 16)]
    })(Math, '0123456789abcdef', 5)
  }

}

mapboxgl.zondy.ElsCubeLayer = ElsCubeLayer;
