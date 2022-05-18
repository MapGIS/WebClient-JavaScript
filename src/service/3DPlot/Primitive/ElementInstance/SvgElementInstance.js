/*
 * @Author: your name
 * @Date: 2021-10-25 10:22:13
 * @LastEditTime: 2022-04-01 09:16:34
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\SvgElementInstance.js
 */
import {Vector2} from "../../../PlotUtilBase/Math/Vector2";
import {Vector3} from "../../../PlotUtilBase/Math/Vector3";
import PolylineCurve3 from "../../../../service/PlotUtilBase/Curves/PolylineCurve3";
import {CesiumGeomUtil} from "../../Utils/CesiumUtil";
import {defined} from "../../../PlotUtilBase/Check";
import GeomUtil from "../../../../service/PlotUtilBase/Geometry/GeomUtil";
import {ExtrudeGeometryUtil} from "../../Utils/ExtrudeGeometryUtil";
import {Shape} from "../../../PlotUtilBase/Path2D/Shape";

export default class SvgElementInstance {
  constructor(elem, options = {}) {
    this._elem = elem;
    this._options = options;
    this.globelScale = options.globelScale || 100
    this.fillDefaultWidth = 5
    this.textDefaultWidth = 10
    this.instance = undefined;

    //是否贴地或贴模型
    const {_symbol = {}} = this._elem
    const {classificationType} = _symbol;
    this._classificationType = classificationType;
  }

  getInstance(callback) {
    if (!this.instance) {
      let that = this;
      this.instance = this.svgToGeomInstances(this._elem, this._options, function (instance) {
        that.instance = instance;
        callback(instance);
      });
    }
  }

  _mercatorTolonlat(mercator) {
    let lonlat = {lon: 0, lat: 0};

    let x = mercator.x / 20037508.34 * 180;
    let y = mercator.y / 20037508.34 * 180;

    y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);

    lonlat.lon = x;
    lonlat.lat = y;

    return lonlat;
  }

  /**
   * @description 取得地形或模型采样的高程数组
   * @param samples - {Array} 必选项，高程采样结果数组
   * @param sampleLength - {Array} 必选项，高程的下标数组，要拼成paths的结构
   * @return sampleHeights - {Array} 高程数组
   */
  _getSampleHeights(samples, sampleLength) {
    let sampleHeights = [], index = 0;

    for (let i = 0; i < sampleLength.length; i++) {
      sampleHeights.push([]);
      for (let j = 0; j < sampleLength[i].length; j++) {
        sampleHeights[i].push([]);
        for (let k = 0; k < sampleLength[i][j]; k++) {
          sampleHeights[i][j].push(samples[index].height);
          index++;
        }
      }
    }

    return sampleHeights;
  }

  /**
   * @description 取得采样参数
   * @param paths - {Array} 必选项，svg子元素解析出的对象
   * @param samplePoints - {Array} 必选项，要被采样的经纬度坐标数组
   * @return sampleOptions - {Object} 采样参数
   */
  _getSampleOptions(paths) {
    let sampleLength = [], samplePoints = [], index = 0;

    for (let i = 0; i < paths.length; i++) {
      const {cacheCoords} = paths[i];
      sampleLength.push([]);
      for (let j = 0; j < cacheCoords.length; j++) {
        sampleLength[i].push(cacheCoords[j].length);
        for (let k = 0; k < cacheCoords[j].length; k++) {
          let sample = this._mercatorTolonlat(cacheCoords[j][k]);
          samplePoints.push(Cesium.Cartesian3.fromDegrees(sample.lon, sample.lat, 0));
        }
      }
    }

    return {sampleLength, samplePoints};
  }

  /**
   * @description 符号对象转为三维体对象
   * @param paths - {Array} 必选项，svg子元素解析出的对象
   * @param elem - {Object} 必选项，符号对象
   * @param options - {Object} 必选项，额外参数
   * @param sampleHeights - {Array} 必选项，高程采样点数组
   * @return instances - {Object} 三维体对象以及高程采样点
   */
  _elementToInstance(paths, elem, options, sampleHeights) {
    let instances = [];
    for (let i = 0; i < paths.length; i += 1) {
      //循环较少，条件判断不用挪到外面去
      const pathTempInst = sampleHeights ? this.pathElemToGeomInstance(paths[i], options, sampleHeights[i]) : this.pathElemToGeomInstance(paths[i], options);
      if (!defined(pathTempInst)) continue;
      if (Array.isArray(pathTempInst)) {
        instances = instances.concat(pathTempInst);
      } else {
        instances.push(pathTempInst);
      }
    }

    const spans = [];
    elem.getSpanElem(spans);
    for (let i = 0; i < spans.length; i += 1) {
      const tempInst = this.spanElemToGeomInstance(spans[i], options);
      if (defined(tempInst)) {
        instances.push(tempInst);
      }
    }

    return instances;
  }

  svgToGeomInstances(elem, options, callback) {
    let that = this;
    const paths = [];
    elem.getPathElem(paths);

    let instances = [];
    let {sampleLength, samplePoints} = this._getSampleOptions(paths);

    //贴地或者贴模型
    if(typeof this._classificationType === 'number' && this._classificationType >=0) {
      let sampleElevationTool = new Cesium.SampleElevationTool(window.viewer, samplePoints, 'terrain', function (result) {
        let sampleHeights = that._getSampleHeights(result, sampleLength);
        let instances = that._elementToInstance(paths, elem, options, sampleHeights);

        callback(instances, sampleHeights);
      }, {level: 12});

      sampleElevationTool.start();
    }else {
      callback(this._elementToInstance(paths, elem, options));
    }
  }

  pathElemToGeomInstance(pathElem, options) {
    const instances = [];
    const style = pathElem.getContextStyle()
    const fill = style.fillStyle;
    const stroke = style.strokeStyle
    const lineWidth = style.lineWidth
    const strokeWidthSize = lineWidth * this.globelScale / 2;
    const _fillWidthSize = this.fillDefaultWidth * this.globelScale / 2

    const parts = pathElem.cacheCoords || pathElem.getCoords();

    if (stroke && stroke !== "none") {
      for (let i = 0; i < parts.length; i += 1) {
        const coords = parts[i];
        this._closeCoordsPath(coords);
        const geometry = this._generateStrokeGeometry(coords, strokeWidthSize);
        const instance = this._generateCesiumGeometryInstance(
          pathElem,
          geometry,
          options,
          this.getColor(pathElem, "strokeStyle")
        );
        if (defined(instance)) instances.push(instance);
      }
    }

    if (fill && fill !== "none") {
      for (let i = 0; i < parts.length; i += 1) {
        const coords = parts[i];
        const geometry = this._generateFillGeometry(coords, _fillWidthSize);
        const instance = this._generateCesiumGeometryInstance(
          pathElem,
          geometry,
          options,
          this.getColor(pathElem, "fillStyle")
        );
        if (defined(instance)) instances.push(instance);
      }
    }
    return instances;
  }

  spanElemToGeomInstance(spanElem, options) {
    if (!spanElem) return undefined;

    const textWidth = this.textDefaultWidth * this.globelScale / 2;
    const textGeo = this._generateTextGeometry(spanElem, textWidth);

    spanElem.applyTextGeo3D(textGeo);

    return this._generateCesiumGeometryInstance(
      spanElem,
      textGeo,
      options,
      this.getColor(spanElem, "fillStyle")
    );
  }

  _generateTextGeometry(spanElem, textWidth) {
    const text = spanElem.getText();
    const fontSize = spanElem.getStyle("font-size").getPixels();
    const font = spanElem.getFont();
    const shapes = font.generateShapes(text, fontSize);

    return ExtrudeGeometryUtil.createExtrudeGeometryByDepth(
      shapes,
      4,
      textWidth,
      1
    );
  }

  _generateStrokeGeometry(coords, strokeWidth, heights) {
    const vec3s = [];
    const coordsLen = coords.length;

    if(heights){
      for (let j = 0; j < coordsLen; j += 1) {
        const coord = coords[j];
        vec3s.push(new Vector3(coord.x, coord.y, 0 + heights[j]));
      }
    }else {
      for (let j = 0; j < coordsLen; j += 1) {
        const coord = coords[j];
        vec3s.push(new Vector3(coord.x, coord.y, 0));
      }
    }

    const polylineCurve = new PolylineCurve3(vec3s);

    const pts = [];
    pts.push(new Vector2(-strokeWidth, -strokeWidth));
    pts.push(new Vector2(strokeWidth, -strokeWidth));
    pts.push(new Vector2(strokeWidth, strokeWidth));
    pts.push(new Vector2(-strokeWidth, strokeWidth));

    const shape = new Shape(pts);
    return ExtrudeGeometryUtil.createExtrudeGeometryByPath(
      [shape],
      undefined,
      polylineCurve,
      coordsLen * 2 - 3
    );
  }

  _generateFillGeometry(coords, height) {
    const pts = [];
    let coordsLen = coords.length;

    if (coordsLen < 3) return undefined;
    const first = coords[0];
    const last = coords[coordsLen - 1];
    if (!GeomUtil.PointEqualFuzzy(first.x, first.y, last.x, last.y, 10e-8)) {
      coords.push(last);
    }

    coordsLen = coords.length;

    for (let j = 0; j < coordsLen; j += 1) {
      const coord = coords[j];
      pts.push(new Vector2(-(-first.y + coord.y), -(-first.x + coord.x)));
    }

    const shape = new Shape(pts);

    const vec3s = [];
    vec3s.push(new Vector3(first.x, first.y, height));
    vec3s.push(new Vector3(first.x, first.y, -height));
    const polylineCurve = new PolylineCurve3(vec3s);

    return ExtrudeGeometryUtil.createExtrudeGeometryByPath(
      [shape],
      undefined,
      polylineCurve,
      1
    );
  }

  _generateCesiumGeometryInstance(elem, extrudeGeom, options, color) {
    if (!defined(extrudeGeom)) return undefined;

    this.transformExtrudeGeometry(extrudeGeom, options);
    const cesGeom = CesiumGeomUtil.createCesiumGeomByExtrudeGeom(extrudeGeom);
    this.transfromGeoCesium(elem, cesGeom, options);
    //  修改cesium边界，解决线宽过小时无法显示的问题
    cesGeom.boundingSphere = Cesium.BoundingSphere.fromVertices(
      cesGeom.attributes.position.values
    );
    return new Cesium.GeometryInstance({
      geometry: cesGeom,
      attributes: {
        color: color,
      },
    });
  }

  _getColorByType(ele, type) {
    let ret;
    const styles = ele.getContextStyle()
    if (styles[type]) {
      ret = styles[type]
    }
    if (ret === "none") ret = undefined;
    return ret;
  }

  getColor(ele, type) {
    let color = "rgba(255,0,0,1)";
    if (defined(type)) {
      color = this._getColorByType(ele, type) || color;
    } else {
      color =
        this._getColorByType(ele, "fillStyle") ||
        this._getColorByType(ele, "strokeStyle") ||
        color;
    }

    const cesColor = Cesium.Color.fromCssColorString(color);
    return Cesium.ColorGeometryInstanceAttribute.fromColor(cesColor);
  }

  /**
   * @description: 处理最后两点绘制不闭合
   * @param {*} coords
   * @return {*}
   */
  _closeCoordsPath(coords) {
    if (!coords || coords.length < 3) return;
    const firstPnt = coords[0];
    const endPnt = coords[coords.length - 1];

    if (
      GeomUtil.PointEqualFuzzy(
        firstPnt.x,
        firstPnt.y,
        endPnt.x,
        endPnt.y,
        10e-8
      )
    ) {
      const secondPnt = coords[1];
      const lastPnt = new Vector2(secondPnt.x, secondPnt.y);
      coords.push(lastPnt);
    }
  }

  transformExtrudeGeometry(extrudeGeom, options) {
  }

  transfromGeoCesium(elem, cesgeo, options) {
    let {dimModHeight} = options;
    //这个地方控制抬起高度，贴地或贴模型时抬高高度为0
    if(typeof this._classificationType === 'number' && this._classificationType >= 0){
      dimModHeight = 0;
    }
    CesiumGeomUtil.translate(cesgeo, new Cesium.Cartesian3(0, 0, dimModHeight));
  }
}
