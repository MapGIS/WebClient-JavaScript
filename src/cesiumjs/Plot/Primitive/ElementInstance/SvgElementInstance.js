/*
 * @Author: your name
 * @Date: 2021-10-25 10:22:13
 * @LastEditTime: 2022-04-01 09:16:34
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\SvgElementInstance.js
 */
import { Vector2 } from "../../../../service/PlotUtilBase/Math/Vector2";
import { Vector3 } from "../../../../service/PlotUtilBase/Math/Vector3";
import PolylineCurve3 from "../../../../service/PlotUtilBase/Curves/PolylineCurve3";
import {CesiumGeomUtil} from "../../Utils/CesiumUtil";
import { defined } from "../../../../service/PlotUtilBase/Check";
import GeomUtil from "../../../../service/PlotUtilBase/Geometry/GeomUtil";
import { ExtrudeGeometryUtil } from "../../Utils/ExtrudeGeometryUtil";
import { Shape } from "../../../../service/PlotUtilBase/Path2D/Shape";

export default class SvgElementInstance {
  constructor(elem, options = {}) {
    this._elem = elem;
    this.globelScale=options.globelScale || 100
    this.fillDefaultWidth=5
    this.textDefaultWidth=10
    this.instance = this.svgToGeomInstances(elem, options);
  }

  getInstance() {
    return this.instance;
  }

  svgToGeomInstances(elem, options) {
    const paths = [];
    elem.getPathElem(paths);

    let instances = [];
    for (let i = 0; i < paths.length; i += 1) {
      const pathTempInst = this.pathElemToGeomInstance(paths[i], options);
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

  pathElemToGeomInstance(pathElem, options) {
    const instances = [];
    const style=pathElem.getContextStyle()
    const fill =style.fillStyle;
    const stroke = style.strokeStyle
    const lineWidth=style.lineWidth
    const strokeWidthSize = lineWidth*this.globelScale/2;
    const _fillWidthSize =  this.fillDefaultWidth*this.globelScale/2

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

    const textWidth = this.textDefaultWidth*this.globelScale/2;
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

  _generateStrokeGeometry(coords, strokeWidth) {
    const vec3s = [];
    const coordsLen = coords.length;
    for (let j = 0; j < coordsLen; j += 1) {
      const coord = coords[j];
      vec3s.push(new Vector3(coord.x, coord.y, 0));
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
    cesGeom.boundingSphere=Cesium.BoundingSphere.fromVertices(
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
    const styles =ele.getContextStyle()
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

  transformExtrudeGeometry(extrudeGeom, options) {}

  transfromGeoCesium(elem, cesgeo, options) {
    const { dimModHeight } = options;
    CesiumGeomUtil.translate(cesgeo, new Cesium.Cartesian3(0, 0, dimModHeight));
  }
}
