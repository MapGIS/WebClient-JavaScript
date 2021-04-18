import { mapboxgl } from "@mapgis/mapbox-gl";
import { Zondy } from "../../service/common/Base";
import { extend } from "../../service/common/Util";

/**
 * @class Theme3DLayer
 * @classdesc 三维专题图基类,不能直接实例化
 * @param  id -{string} 专题图图层id
 * @param  layerOptions -{Object} 专题图图层配置项<br>
 *             opacity -{number} 图层透明度，默认1<br>
 *             parseNumber -{boolean} 是否预处理数据，将数据转换为number，默认false<br>
 *             enableHighlight -{boolean} 是否开启高亮,默认false<br>
 *             highlight -{Object} 高亮颜色,默认"#ADA91E"<br>
 *             baseHeightField -{string} 数据中表示基础高度的字段<br>
 *             height -{number} 高度。如果数据指定的heightField(默认height)没有可以表示高度的字段，可以为所有数据统一设置一个高度<br>
 *             heightField -{string} 数据中表示高度的字段<br>
 *             themeField -{string} 专题展示的字段<br>
 *             showLegend -{boolean} 是否显示图例,默认显示<br>
 *             legendTitle -{string} 图例标题<br>
 *             legendTheme -{string} 图例主题，取值：'light','dark',默认：'light'<br>
 *             legendOrientation -{string} 图例方向，取值：'horizontal','vertical'，默认：'horizontal'<br>
 *             legendPosition -{string} 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'<br>
 */
class Theme3DLayer {
  constructor(id, layerOptions) {
    /**
     * @member  id -{string}
     * @description mapbox gl图层id
     */
    this.id = id;

    /**
     * @member  map -{object}
     * @description mapbox gl地图对象
     */
    this.map = null;
    /**
     * @member  opacity -{number}
     * @description 图层透明度，默认1
     */
    this.opacity = 1;
    /**
     * @member  parseNumber -{boolean}
     * @description 是否进行数据预处理,有些字段是string类型，需要转换为number
     */
    this.parseNumber = false;
    /**
     * @member  enableHighlight -{boolean}
     * @description 是否开启高亮,默认false
     */
    this.enableHighlight = false;

    /**
     * @member  highlight -{Object}
     * @description 高亮相关配置,默认null
     */
    this.highlight = { color: "#ADA91E" };

    /**
     * @member  baseHeightField -{string}
     * @description 数据中表示基础高度的字段
     */
    this.baseHeightField = null;

    /**
     * @member height -{number}
     * @description 高度。如果数据指定的heightField(默认height)没有可以表示高度的字段，可以为所有数据统一设置一个高度
     */
    this.height = null;

    /**
     * @member  heightField -{string}
     * @description 数据中表示高度的字段
     */
    this.heightField = "height";

    /**
     * @member  themeField -{string}
     * @description 专题展示的字段
     */
    this.themeField = this.heightField;

    /**
     * @member  showLegend -{Boolean}
     * @description 是否显示图例
     */
    this.showLegend = true;

    /**
     * @member  legendTitle -{string}
     * @description 图例标题
     */
    this.legendTitle = null;

    /**
     * @member  legendTheme -{string}
     * @description 图例主题，取值：'light','dark'
     * @default 'light'
     */
    this.legendTheme = "light";

    /**
     * @member  legendOrientation -{string}
     * @description 图例方向，取值：'horizontal','vertical'，默认：'horizontal'
     * @default 'horizontal'
     */
    this.legendOrientation = "horizontal";
    /**
     * @member  legendPosition -{string}
     * @description 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'
     * @default 'bottom-right'
     */
    this.legendPosition = "bottom-right";
    this.mousemoveOn = true;
    extend(this, layerOptions);
  }

  /**
   * @function setLayerOptions
   * @description 设置图层相关参数
   * @param layerOptions -{object} 该专题图图层相关参数<br>
   * *          opacity -{number} 图层透明度，默认1<br>
   *            parseNumber -{boolean} 是否预处理数据，将数据转换为number，默认false<br>
   *            baseHeightField -{string} 数据中表示基础高度的字段<br>
   *            height -{number} 高度。如果数据指定的heightField(默认height)没有可以表示高度的字段，可以为所有数据统一设置一个高度<br>
   *            heightField -{string} 数据中表示高度的字段<br>
   *            themeField -{string} 专题展示的字段<br>
   *            showLegend -{boolean} 是否显示图例,默认显示<br>
   *            legendTitle -{string} 图例标题<br>
   *            legendTheme -{string} 图例主题，取值：'light','dark',默认：'light'<br>
   *            legendOrientation -{string} 图例方向，取值：'horizontal','vertical'，默认：'horizontal'<br>
   *            legendPosition -{string} 图例位置，取值：'top-right'|'top-left'|'bottom-left'|'bottom-right'<br>
   * @returns {this}
   */
  setLayerOptions(layerOptions) {
    extend(this, layerOptions);
    return this;
  }

  /**
   * @function mapboxgl.zondy.Theme3DLayer.prototype.setHighlightStyleOptions
   * @description 设置图层高亮相关参数
   * @param highlightOptions -{object} 该专题图图层高亮相关参数<br>
   *            color -{string} 颜色<br>
   *            callback -{function} 回调,返回数据参数（data,event）<br>
   * @returns {this}
   */
  setHighlightStyleOptions(highlightOptions) {
    extend(this.highlight, highlightOptions);
    return this;
  }

  /**
   * @function setData
   * @description 设置数据，数据格式必须为geojson格式
   * @param data -{object} geojson格式数据
   * @param parseNumber -{object} 是否进行数据预处理,有些字段是string类型，需要转换为number
   */
  setData(data, parseNumber) {
    var me = this;
    me.data = data;
    if (parseNumber != null) {
      me.parseNumber = parseNumber;
    }
    me.parseNumber &&
      me.data &&
      me.data.features &&
      me.data.features.map(function(val) {
        if (me.baseHeightField && val.properties[me.baseHeightField]) {
          val.properties[me.baseHeightField] = parseFloat(
            val.properties[me.baseHeightField]
          );
        }
        if (me.heightField && val.properties[me.heightField]) {
          val.properties[me.heightField] = parseFloat(
            val.properties[me.heightField]
          );
        }
        return val;
      });
    return this;
  }

  WebMercator2lonLat(cx, cy) {
    var x = (cx / 20037508.34) * 180;
    var y = (cy / 20037508.34) * 180;
    y =
      (180 / Math.PI) *
      (2 * Math.atan(Math.exp((y * Math.PI) / 180)) - Math.PI / 2);
    return [x, y];
  }

  convertData(data) {
    if (data != null && data.features != null && data.features.length > 0) {
      for (var i = 0; i < data.features.length; i++) {
        var temGeom = data.features[i].geometry;
        if (
          temGeom != null &&
          temGeom.coordinates != null &&
          temGeom.coordinates.length > 0
        ) {
          if (temGeom.type == "Polygon") {
            var rings = temGeom.coordinates;
            for (var j = 0; j < rings.length; j++) {
              var ring = rings[j];
              if (ring != null && ring.length > 0) {
                for (var k = 0; k < ring.length; k++) {
                  data.features[i].geometry.coordinates[j][
                    k
                  ] = this.WebMercator2lonLat(ring[k][0], ring[k][1]);
                }
              }
            }
          } else if (temGeom.type == "MultiPolygon") {
            var polygons = temGeom.coordinates;
            for (var m = 0; m < polygons.length; m++) {
              var polygon = polygons[m];
              if (polygon != null && polygon.length > 0) {
                for (var j = 0; j < polygon.length; j++) {
                  var ring = polygon[j];
                  if (ring != null && ring.length > 0) {
                    for (var k = 0; k < ring.length; k++) {
                      data.features[i].geometry.coordinates[m][j][
                        k
                      ] = this.WebMercator2lonLat(ring[k][0], ring[k][1]);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return data;
  }
  /**
   * @function getData
   * @description 获取数据，返回的数据格式为geojson
   * @returns {Object}
   */
  getData() {
    return this.data;
  }

  /**
   * @function addTo
   * @description 添加图层到地图上
   * @param map -{Object} mapboxgl 地图对象
   * @returns {this}
   */
  addTo(map) {
    this.map = map;
    if (!this.map) {
      return this;
    }

    this.show();
    return this;
  }

  /**
   * @function show
   * @description 显示图层
   * @param options -{Object} 图层配置项
   * @returns {this}
   */
  show(options) {
    extend(this, options);
    this._addLayer();
    if (this.enableHighlight) {
      this._addHighLightLayer();
    }
    if (this.showLegend) {
      if (!this.legend) {
        this.legend = this._createLegendControl();
      }
      this.map.addControl(this.legend, this.legendPosition);
    }
    return this;
  }

  /**
   * @function remove
   * @description 从地图上移除图层
   * @returns {this}
   */
  remove() {
    if (!this.map) {
      return this;
    }
    var me = this;
    me.mousemoveOn = false;
    // this.map.off('mousemove',function(e){
    //     me.mousemoveCallback(e,me);
    // });
    //移除图层
    var layerId = this.id ? this.id : "theme3DLayer";
    if (this.map.getLayer(layerId)) {
      this.map.removeLayer(layerId);
    }
    //移除高亮图层
    var highlightLayerId = "highlightLayer";
    if (this.map.getLayer(highlightLayerId)) {
      this.map.removeLayer(highlightLayerId);
    }
    // if (!!this.map.getSource(this.sourceId)) {
    //   this.map.removeSource(this.sourceId);
    // }
    // if (!!this.map.getSource("highlight")) {
    //   this.map.removeSource("highlight");
    // }

    //移除图例
    if (this.legend) {
      this.map.removeControl(this.legend);
    }

    return this;
  }

  /**
   * @function  getLayerStyleOptions
   * @description 获取图层样式
   * @return {Object} mapbox gl样式对象
   */
  getLayerStyleOptions() {
    //子类重写实现
  }

  /**
   * @function mapboxgl.zondy.Theme3DLayer.prototype.getHighlightStyleOptions
   * @description 获取高亮样式,子类重写实现
   * @returns {Object} mapbox gl样式对象
   */
  getHighlightStyleOptions() {
    //子类重写实现
  }

  _createLegendControl(html) {
    var me = this;

    function LegendControl() {}

    LegendControl.prototype.onAdd = function(map) {
      this._map = map;
      this._container = document.createElement("div");
      var className = "mapboxgl-ctrl legend ";
      var theme = "legend-light";
      if (me.legendTheme === "dark") {
        theme = "legend-dark";
      }
      var orientation = " legend-horizontal";
      if (me.legendOrientation === "vertical") {
        orientation = " legend-vertical";
      }
      this._container.className = className + theme + orientation;

      if (html) {
        this._container.innerHTML = html;
      } else {
        var legendTitle = me.legendTitle || "";
        var titleElement =
          " <div class='legend-title'>" + legendTitle + "</div>";
        var content = me._createLegendElement.call(me) || "";
        var contentElement =
          "<div class='legend-content'>" + content + "</div>";
        this._container.innerHTML = titleElement + contentElement;
      }
      me._appendLegendCSSStyle();
      return this._container;
    };

    LegendControl.prototype.onRemove = function() {
      this._container.parentNode.removeChild(this._container);
      this._map = undefined;
    };

    return new LegendControl();
  }

  _createLegendElement() {
    //子类实现
  }

  _addLayer() {
    var paintOptions = this.getLayerStyleOptions();
    var id = this.id ? this.id : "theme3DLayer";
    this.id = id;
    var sourceId = (this.sourceId = id + "Source");
    if (!!this.map.getSource(sourceId)) {
      this.map.removeSource(sourceId);
    }
    this.map.addSource(sourceId, {
      type: "geojson",
      data: this.data
    });
    if (!!this.map.getLayer(id)) {
      this.map.removeLayer(id);
    }
    this.map.addLayer({
      id: id,
      type: "fill-extrusion",
      source: sourceId,
      paint: paintOptions
    });

    this.map.moveLayer(id);
  }

  //添加高亮图层
  _addHighLightLayer() {
    if (!this.map) {
      return;
    }
    var map = this.map;
    if (map.getSource("highlight")) {
      map.removeSource("highlight");
    }
    map.addSource("highlight", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: []
      }
    });
    if (!!map.getLayer("highlightLayer")) {
      map.removeLayer("highlightLayer");
    }
    map.addLayer({
      id: "highlightLayer",
      type: "fill-extrusion",
      source: "highlight",
      paint: this.getHighlightStyleOptions()
    });

    var me = this;
    var featureId;
    //map.on('mousemove',this.mousemoveCallback);
    // map.on('mousemove',function(e){
    //     if(!me.mousemoveOn)
    //     {
    //         return;
    //     }
    //     me.mousemoveCallback(e,me);
    // });

    map.on("mousemove", function(e) {
      if (!me.mousemoveOn) {
        return;
      }
      me.mousemoveOn = true;
      var canvas = document.querySelector(
        ".mapboxgl-canvas-container.mapboxgl-interactive"
      );
      canvas.style.cursor = "auto";

      var features = me.map.queryRenderedFeatures(e.point, { layers: [me.id] });
      //var sta =  me.map.getFeatureState(features[0]);

      if (me.highlight && me.highlight.callback) {
        me.highlight.callback(features, e);
      }

      if (!features || features.length < 1) {
        me._clearHighlight.call(me);
        return;
      }
      var id = features[0].properties.fid;
      if (featureId === id) {
        return;
      }
      featureId = id;
      me._clearHighlight.call(me);
      var sourceFeatures = me.map.querySourceFeatures(me.sourceId, {
        filter: ["==", "fid", id]
      });
      var i,
        len = sourceFeatures.length;
      var geoFeatures = { type: "FeatureCollection", features: [] };
      for (i = 0; i < len; i++) {
        geoFeatures["features"].push(sourceFeatures[i].toJSON());
      }
      me.map.getSource("highlight").setData(geoFeatures);
    });
  }
  // mousemoveCallback (e,obj) {
  //         obj.mousemoveOn= true;
  //         var canvas = document.querySelector('.mapboxgl-canvas-container.mapboxgl-interactive');
  //         canvas.style.cursor = 'auto';

  //         var features = obj.map.queryRenderedFeatures(e.point, {layers: [obj.id]});
  //         if (obj.highlight && obj.highlight.callback) {
  //             obj.highlight.callback(features, e);
  //         }

  //         if (!features || features.length < 1) {
  //             obj._clearHighlight.call(obj);
  //             return;
  //         }
  //         var id = features[0].properties.fid;
  //         if (featureId === id) {
  //             return;
  //         }
  //         featureId = id;
  //         obj._clearHighlight.call(obj);
  //         var sourceFeatures = obj.map.querySourceFeatures(obj.sourceId, {filter: ['==','fid',id]});
  //         var i, len = sourceFeatures.length;
  //         var geoFeatures = {'type': 'FeatureCollection', 'features': []};
  //         for (i = 0; i < len; i++) {
  //             geoFeatures['features'].push(sourceFeatures[i].toJSON());
  //         }
  //         obj.map.getSource('highlight').setData(geoFeatures);
  //     }
  _clearHighlight() {
    if (this.map) {
      if (!!this.map.getSource("highlight")) {
        this.map.getSource("highlight").setData({
          type: "FeatureCollection",
          features: []
        });
      }
    }
  }

  _appendLegendCSSStyle() {
    var legendStyle = document.createElement("style");
    legendStyle.type = "text/css";
    var baseStyle = `
        .legend {
            display: inline-block;
            border-radius: 2px;
            -moz-border-radius: 2px;
            -webkit-border-radius: 2px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.8);
            background-color: rgb(255, 255, 255);
        }
        .legend-light {
            color: rgba(0, 0, 0, 0.8);
            background-color: rgb(255, 255, 255);
            box-shadow: 0px 0px 6px #bbbbbb;
            -moz-box-shadow: 0px 6px 10px #bbbbbb;
            -webkit-box-shadow: 0px 0px 6px #bbbbbb;
        }
        .legend-dark {
            color: rgba(255, 255, 255, 0.8);
            background-color: rgb(64, 64, 64);
        }
        .legend .legend-title {
            min-height: 14px;
            max-width: 500px;
            padding:6px 10px;
        }
        .legend-light .legend-title {
            color: rgba(0, 0, 0, 0.8);
        }
        .legend-dark .legend-title {
            color: rgba(255, 255, 255, 0.8);
        }
        .legend-content{
            padding:6px 10px;
        }
        `;
    legendStyle.innerHTML = baseStyle + this._legendCSSStyle();
    document.getElementsByTagName("head")[0].appendChild(legendStyle);
  }

  //各种图层对应的自己的图例的样式
  _legendCSSStyle() {
    //子类可重写实现
    return `  
        .legend ul {
            padding: 0;
            margin: 0 16px;
            height: 100%;
            display: block;
            list-style: none;
        }

        .legend li {
            vertical-align: middle;
        }

        .legend li span:first-child {
            vertical-align: middle;
        }

        .legend li span:last-child {
            line-height: 28px;
            max-width: 200px;
            vertical-align: middle;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            -ms-text-overflow: ellipsis;
        }

        .legend-vertical li {
            height: 28px;
        }

        .legend-vertical li span:first-child {
            display: inline-block;
            width: 60px;
            height: 100%;
        }

        .legend-vertical li span:last-child {
            display: inline-block;
            margin-left: 16px;
            height: 100%;
        }

        .legend-horizontal li {
            height: 56px;
            float: left;
        }

        .legend-horizontal li span:first-child {
            display: block;
            width: 100%;
            height: 50%;
        }

        .legend-horizontal li span:last-child {
            display: block;
            vertical-align: middle;
            width: 60px;
            height: 50%;
            text-align: center;
        }
        `;
  }
}
export { Theme3DLayer };
Zondy.Map.Theme3DLayer = Theme3DLayer;
