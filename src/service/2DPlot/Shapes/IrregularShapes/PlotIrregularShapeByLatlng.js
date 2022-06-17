/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-18 15:08:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-12 15:52:43
 */
import { fabric } from "fabric";
import Bounds from "../../../PlotUtilBase/Geometry/Bound";
import Point from "../../../PlotUtilBase/Geometry/Point";
import  PlotIrregularShape  from "./PlotIrregularShape";

const PlotIrregularShapeByLatlng = fabric.util.createClass(
  PlotIrregularShape,
  {
    hasBorders: false,
    setCoordsPoints: function setCoordsPoints() {
      this._elem.setPoints(this._elem.positions);
    },
    _calcBounds: function _calcBounds(ctx) {
      const boundingBox = this._elem.getBounds();
      const newBounds = new Bounds();
      const coordSys = this.getCoordSys();

      this._elem.positions.forEach((t) => {
        boundingBox.addPnt(t.x, t.y);
      });

      const p1 = coordSys.dataToPoint([boundingBox.left, boundingBox.bottom]);
      const p2 = coordSys.dataToPoint([boundingBox.right, boundingBox.top]);

      newBounds.addPnt(p1[0], p1[1]);
      newBounds.addPnt(p2[0], p2[1]);

      return newBounds;
    },
    _render(ctx) {
      const coordSys = this.getCoordSys();
      const _coords = this._elem.cacheCoords || this._elem.getCoords();
      const coords = _coords.map((s) =>
        s.map((t) => {
          const temp = coordSys.dataToPoint([t.x, t.y]);
          return new Point(temp[0],temp[1]);
        })
      );
      this._comparePathElementRender(ctx, coords);
      this._pathElementRender(ctx, coords);
    },
  }
);

fabric.PlotIrregularShapeByLatlng = PlotIrregularShapeByLatlng;
export default PlotIrregularShapeByLatlng