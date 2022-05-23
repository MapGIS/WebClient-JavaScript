/*
 * @Author: your name
 * @Date: 2021-10-25 11:15:18
 * @LastEditTime: 2022-05-23 19:01:26
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\RegularSurfaceElementInstance.js
 */
import Bounds from "../../../../service/PlotUtilBase/Geometry/Bound";
import {CesiumUtil} from "../../Utils/CesiumUtil";
import SvgElementInstance from "./SvgElementInstance";

export default class RegularSurfaceElementInstance extends SvgElementInstance {
  svgToGeomInstances(elem,options) {
    const { surfaceBorderWidth }=options
    this.polylineOutInstance = null;
    this.polygonRect = new Bounds();
    this._borderColor = Cesium.Color.RED;
    this._surfaceBorderWidth = surfaceBorderWidth;

    const pathElements = [];
    const instances = [];

    elem.getPathElem(pathElements);

    const styleObject = pathElements[0].getContextStyle();
    if (styleObject) {
      if (styleObject.strokeStyle !== "none") {
        this._borderColor = Cesium.Color.fromCssColorString(
          styleObject.strokeStyle
        );
      }

      // 边线线宽为像素值，界面显示效果太差，因此边线宽度取固定值
      // if(pathElements[0].getStyle('stroke-width').hasValue()){
      //   const v=Math.round(pathElements[0].getStyle('stroke-width').getNumber())/2 
      //   this._surfaceBorderWidth=v
      // }

    }

    pathElements.forEach((s) => {
      instances.push(this.pathElemToGeomInstance(s));
    });

    const exportInstance = instances.flat();
    return {
      instances: exportInstance,
      polylineOutInstance: this.polylineOutInstance,
      polygonRect:this.polygonRect,
      borderColor:this._borderColor
    };
  }

  pathElemToGeomInstance(elem) {
    const _parts = elem.cacheCoords || elem.getCoords();

    const polygonparts = _parts
      .flatMap((s) =>
        s.map((t) => {
          this.polygonRect.addPnt(t.x, t.y);
          const latlng = CesiumUtil.WebMercatorUnProject(t.x, t.y);
          return [latlng.x, latlng.y];
        })
      )
      .flat();

    const polygon = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray(polygonparts)
      ),
    });

    const groundPolyline = new Cesium.GroundPolylineGeometry({
      positions: Cesium.Cartesian3.fromDegreesArray(polygonparts),
      width: this._surfaceBorderWidth,
    });

    const instance = new Cesium.GeometryInstance({
      geometry: polygon,
    });

    this.polylineOutInstance = new Cesium.GeometryInstance({
      geometry: groundPolyline,
    });

    return instance;
  }

}
