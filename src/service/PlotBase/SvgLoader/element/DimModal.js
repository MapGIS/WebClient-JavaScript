import { Point } from "../../../PlotUtilBase/Geometry/Point";
/*
 * @Description: element维度转换
 * @Author: zk
 * @Date: 2021-11-16 11:04:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-16 14:16:03
 */
export class DimModal {
  constructor() {
    this._3d = false;
    this.lineAngle = null;
    this.translatePoint = null;
    this.translatePnt = null;
  }
  is3DTran() {
    return this._3d;
  }
  set3D(flag) {
    this._3d = !!flag;
  }
  setLineAngle(angle){
    this.lineAngle=angle
  }
  getLineAngle(){
    return this.lineAngle
  }
  setTranslatePoint(point) {
    this.translatePoint = point;
  }
  getTranslatePoint() {
    if (this._3d) {
      return this.translatePoint;
    }
    // eslint-disable-next-line no-new
    new Error("控制点参数缺失！");
    return null;
  }
  setTranslatePnt(point) {
    this.translatePnt = point;
  }
  getTranslatePnt() {
    if (this._3d) {
      return this.translatePnt;
    }
    // eslint-disable-next-line no-new
    new Error("控制点参数缺失！");
    return null;
  }

  clone() {
    // eslint-disable-next-line no-proto
    const cloneObject = Object.create(this.__proto__);
    cloneObject.lineAngle = this.lineAngle ? this.lineAngle : null;
    cloneObject.translatePoint = this.translatePoint
      ? new Point(this.translatePoint.x, this.translatePoint.y)
      : null;
    cloneObject.translatePnt = this.translatePnt
      ? new Point(this.translatePnt.x, this.translatePnt.y)
      : null;
    cloneObject._3d=this._3d
    return cloneObject;
  }
}
