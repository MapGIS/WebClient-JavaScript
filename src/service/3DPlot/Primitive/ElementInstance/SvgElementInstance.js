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
import * as turf from "@turf/turf";

export default class SvgElementInstance {
  constructor(elem, options = {}) {
    this._elem = elem;
    this._options = options;
    this.globelScale = options.globelScale || 100
    this.fillDefaultWidth = 5
    this.textDefaultWidth = 10
    this.instance = undefined;
  }

  getInstance(callback) {
    if (!this.instance) {
      let that = this;
      this.svgToGeomInstances(this._elem, this._options, function (instance) {
        that.instance = instance;
        callback(instance);
      })
    }
  }

  _initSampleOptions() {
    this.samplePoints = [];
    this.sampleConfigs = [];
    this.pathIndex = [];
    this.spanIndex = [];
    this.index = 0;
  }

  _getCoords(path) {
    const {cacheCoords} = path;
    if (!cacheCoords) {
      console.error("没有cacheCoords对象！");
    }

    return cacheCoords;
  }

  /**
   * @description 全部点地形采样
   * @param path - {Object} 必选项，path对象
   * @return sample - {Object} 采样点（笛卡尔坐标）信息
   */
  _getFullSample(path) {
    const cacheCoords = this._getCoords(path);

    let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
    for (let j = 0; j < cacheCoords.length; j++) {
      for (let k = 0; k < cacheCoords[j].length; k++) {
        let sample = this._mercatorTolonlat(cacheCoords[j][k]);
        samples.push(Cesium.Cartesian3.fromDegrees(sample.lon, sample.lat, 0));
      }
      endIndex = startIndex + cacheCoords[j].length - 1;
      simpleConfig.push({
        start: startIndex,
        end: endIndex
      })
      startIndex = endIndex + 1;
    }

    return {samples, simpleConfig, endIndex}
  }

  /**
   * @description 中心点地形采样
   * @param path - {Object} 必选项，path对象
   * @return sample - {Object} 采样点（笛卡尔坐标）信息
   */
  _getCenterSample(path) {
    const cacheCoords = this._getCoords(path);

    let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
    for (let j = 0; j < cacheCoords.length; j++) {
      let points = [];
      for (let k = 0; k < cacheCoords[j].length; k++) {
        let point = this._mercatorTolonlat(cacheCoords[j][k]);
        points.push(turf.point([point.lon, point.lat]));
      }
      let features = turf.featureCollection(points);
      let center = turf.center(features);
      samples.push(Cesium.Cartesian3.fromDegrees(center.geometry.coordinates[0], center.geometry.coordinates[1], 0));
      endIndex = startIndex;
      simpleConfig.push({
        start: startIndex,
        end: endIndex
      })
      startIndex = endIndex + 1;
    }

    return {samples, simpleConfig, endIndex}
  }

  /**
   * @description 根据TranslatePoint进行地形采样
   * @param translatePnt - {Object} 必选项，translatePnt对象
   * @return sample - {Object} 采样点（笛卡尔坐标）信息
   */
  _getTranslateSample(translatePnt) {
    let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
    let sample = this._mercatorTolonlat(translatePnt);
    samples.push(Cesium.Cartesian3.fromDegrees(sample.lon, sample.lat, 0));
    endIndex = startIndex;
    simpleConfig.push({
      start: startIndex,
      end: endIndex
    })
    startIndex = endIndex + 1;

    return {samples, simpleConfig, endIndex}
  }

  /**
   * @description 根据经纬度进行地形采样
   * @param Lonlat - {Object} 必选项，Lonlat对象
   * @return sample - {Object} 采样点（笛卡尔坐标）信息
   */
  _getLonlatSample(Lonlat) {
    let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
    samples.push(Cesium.Cartesian3.fromDegrees(Lonlat.x, Lonlat.y, 0));
    endIndex = startIndex;
    simpleConfig.push({
      start: startIndex,
      end: endIndex
    })
    startIndex = endIndex + 1;

    return {samples, simpleConfig, endIndex}
  }

  _setSamples(sampleObj, type) {
    type = type || 'path';
    this.samplePoints = this.samplePoints.concat(sampleObj.samples);
    this.sampleConfigs.push(sampleObj.simpleConfig);
    this.index = sampleObj.endIndex + 1;

    if (type === 'path') {
      this.pathIndex.push(this.sampleConfigs.length - 1);
    } else {
      this.spanIndex.push(this.sampleConfigs.length - 1);
    }
  }

  /**
   * @description 取得采样参数
   * @param type - {String} 必选项，path类型
   * @param paths - {Array} 必选项，path数组
   * @param spans - {Array} 必选项，span数组
   * @return sampleOptions - {Object} 采样参数
   */
  _getSampleOptions(type, paths, spans) {
    this._initSampleOptions();
    let sampleObj;

    for (let i = 0; i < paths.length; i++) {
      switch (type) {
        case "msbl_regularline1":
          switch (paths[i].type) {
            case "path":
              //含有translatePnt点
              if (paths[i]._dimModal.translatePnt) {
                this._setSamples(this._getTranslateSample(paths[i]._dimModal.translatePnt));
              }
              //不含有translatePnt点
              else {
                this._setSamples(this._getFullSample(paths[i]));
              }
              break;
            case "mainline":
              //是一类线的主轴
              this._setSamples(this._getFullSample(paths[i]));
              break;
            case "circle":
              //是一类线的圆
              this._setSamples(this._getTranslateSample(paths[i]._dimModal.translatePnt));
              break;
          }
          break;
        case "msbl_regularline2":
          switch (paths[i].type) {
            case "path":
              //含有translatePnt点
              if (paths[i]._dimModal.translatePnt) {
              }
              //不含有translatePnt点
              else {
                this._setSamples(this._getFullSample(paths[i]));
              }
              break;
            case "extendline":
              //二类线扩展线
              this._setSamples(this._getFullSample(paths[i]));
              break;
          }
          break;
        case "msbl_kidneyarea":
          switch (paths[i].type) {
            case "mainborder":
              //二类区的外边线
              this._setSamples(this._getFullSample(paths[i]));
              break;
            case "path":
              //二类区的部件
              this._setSamples(this._getCenterSample(paths[i]));
              break;
          }
          break;
      }
    }

    for (let i = 0; i < spans.length; i++) {
      const textWidth = this.textDefaultWidth * this.globelScale / 2;
      const textGeo = this._generateTextGeometry(spans[i], textWidth);

      spans[i].applyTextGeo3D(textGeo);
      if (spans[i]._dimModal.translatePnt) {
        this._setSamples(this._getTranslateSample(spans[i]._dimModal.translatePnt), 'span');
      } else {
        this.spanIndex.push(undefined);
        console.error("没有translatePnt点！");
      }
    }
  }

  _getPointSampleOptions(lonlat) {
    this._initSampleOptions();
    this._setSamples(this._getLonlatSample(lonlat));
  }

  _getPathHeights(sampleResult) {
    let pathHeights = [];
    for (let i = 0; i < this.pathIndex.length; i++) {
      pathHeights.push([]);
      let heightGroup = this.sampleConfigs[this.pathIndex[i]];
      for (let j = 0; j < heightGroup.length; j++) {
        pathHeights[i].push([]);
        for (let k = heightGroup[j].start; k <= heightGroup[j].end; k++) {
          pathHeights[i][j].push(sampleResult[k].height);
        }
      }
    }
    return pathHeights;
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

  svgToGeomInstances(elem, options, callback) {
    const {type} = elem;
    const paths = [];
    elem.getPathElem(paths);
    const spans = [];
    elem.getSpanElem(spans);

    if (type === 'msbl_regularpoint') {
      this._getPointSampleOptions(elem._pnts[0]);
    } else {
      this._getSampleOptions(type, paths, spans);
    }

    let that = this;
    let sampleElevationTool = new Cesium.SampleElevationTool(window.viewer, this.samplePoints, 'terrain', function (sampleResult) {
      let pathHeights = that._getPathHeights(sampleResult);
      let instances = [];
      if (pathHeights.length !== paths.length) {
        console.error("pathHeights采样不全！");
      }
      if (type === 'msbl_regularpoint') {
        options.dimModHeight += Number(pathHeights[0][0]);
      }
      let axisHeights = [];
      for (let i = 0; i < paths.length; i += 1) {
        options.pathHeights = pathHeights[i];
        options.type = type;
        axisHeights.push(pathHeights[i]);
        const pathTempInst = that.pathElemToGeomInstance(paths[i], options);
        if (!defined(pathTempInst)) continue;
        if (Array.isArray(pathTempInst)) {
          instances = instances.concat(pathTempInst);
        } else {
          instances.push(pathTempInst);
        }
      }

      for (let i = 0; i < spans.length; i += 1) {
        const tempInst = that.spanElemToGeomInstance(spans[i], options);
        if (defined(tempInst)) {
          instances.push(tempInst);
        }
      }

      callback(instances, axisHeights);
    }, {level: 10});
    sampleElevationTool.start();
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
        let instance = this._generateCesiumGeometryInstance(
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

  _generateStrokeGeometry(coords, strokeWidth, pathHeights) {
    const vec3s = [];
    const coordsLen = coords.length;
    for (let j = 0; j < coordsLen; j += 1) {
      const coord = coords[j];
      let height = 0;
      if (pathHeights instanceof Array && pathHeights.length === coordsLen) {
        height += pathHeights[j];
      }

      if (typeof pathHeights === 'number') {
        height += pathHeights;
      }

      vec3s.push(new Vector3(coord.x, coord.y, height));
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

  _generateFillGeometry(coords, height, pathHeights) {
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
    let offset = 0;
    if (pathHeights && pathHeights instanceof Array) {
      offset += pathHeights[0];
    }
    vec3s.push(new Vector3(first.x, first.y, height + offset));
    vec3s.push(new Vector3(first.x, first.y, -height + offset));
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
    const {dimModHeight} = options;
    CesiumGeomUtil.translate(cesgeo, new Cesium.Cartesian3(0, 0, dimModHeight));
  }
}
