/*
 * @Author: your name
 * @Date: 2021-09-17 16:33:26
 * @LastEditTime: 2022-05-25 20:41:42
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\RegularPointElement.js
 */
import Matrix3 from "../../../../PlotUtilBase/Math/Matrix3";
import Point from "../../../../PlotUtilBase/Geometry/Point";
import BaseRegularElement from "./BaseRegularElement";
import GElement from "../GElement";
import ReplacedGroupElement from "../extend/ReplacedGroupElement";
import Bounds from "../../../../PlotUtilBase/Geometry/Bound";

class RegularPoint extends BaseRegularElement {
  constructor(node) {
    super(node);
    this.type = "msbl_regularpoint";
    this.poly = [new Point(0, 0)];
    this.transformAngle = 0;
    this.transformSizeX = 1;
    this.transformSizeY = 1;

    // 暂时处理逻辑。处理fabricjs转动角度无法满足动画需要的问题
    this.geometryAngle=0

    this.currentReplaceIndex = null;
    this.initBaseAttributes(node);
    this.traverChildren();
  }
  
  

  set tranAngle(value) {
    this.transformAngle = value;
    this._propsUpdateSignal.dispatch({
      type: "transformAngle",
      value,
    });
  }

  get tranAngle() {
    return this.transformAngle;
  }

  setTranSize(x, y) {
    this.transformSizeY = y;
    this.transformSizeX = x;
    this._propsUpdateSignal.dispatch({
      type: "transformSize",
      value: [x, y],
    });
  }

  getTranSize() {
    return [this.transformSizeX, this.transformSizeY];
  }

  setGeometryAngle(angle){
     this.geometryAngle=angle
  }
  getGeometryAngle(){
    return this.geometryAngle
  }

  getSaveBaseAttributes() {
    const attributes = super.getSaveBaseAttributes();
    return this._getSaveBaseAttributes(RegularPoint, attributes);
  }

  /**
   * @description: 替换replace属性的element对象
   * @param {*} node
   * @param {*} ele
   * @return {*}
   */
  _replaceChild(node, ele) {
    // replace Element
    if (
      ele instanceof GElement &&
      ele.getAttribute("ReplacedParts").hasValue()
    ) {
      // 替换icon
      const replaceElement = new ReplacedGroupElement(node);
      const replacedParts = replaceElement.replacedParts;
      this.currentReplaceId = replacedParts[0];
      return replaceElement;
    }
    return ele;
  }

  initBaseAttributes(node) {
    super.initBaseAttributes(node);
    const msblTag = this.getMsblElement(node);
    if (!msblTag) return;

    const enableRotateProps = msblTag.getAttribute("EnableRotate");
    if (enableRotateProps.hasValue()) {
      this.enableRotate = parseFloat(enableRotateProps.getValue());
    } else {
      this.enableRotate = 0;
    }

    let x, y;
    const xOriginProps = msblTag.getAttribute("xOrigin");
    const yOriginProps = msblTag.getAttribute("yOrigin");
    if (
      xOriginProps.hasValue() &&
      yOriginProps.hasValue() &&
      this.getAttribute("width").hasValue() &&
      this.getAttribute("height").hasValue()
    ) {
      x =
        parseFloat(xOriginProps.getValue()) *
        this.getAttribute("width").getValue();
      y =
        parseFloat(yOriginProps.getValue()) *
        this.getAttribute("height").getValue();
      this.originPoint = new Point(x, y);
    }
  }

  _applyElementTransfrom(element) {
    const {poly} = this;
    if (!poly || poly.length === 0) {
      element.isAllowCoords = false;
      return;
    }
    const origin = this.originPoint;
    const translatePoint = new Point(
      poly[0].x - origin.x,
      poly[0].y - origin.y
    );
    let matrix = new Matrix3();

    if (this._is3d) {
      this._run3d(matrix, origin);
    }
    this._applyNormalMatrixTransfrom(
      matrix,
      origin,
      translatePoint,
      this.getGeometryAngle(),
      1,
      1,
      this.m_scaleX,
      this.m_scaleY
    );
    element._transformMatrix = matrix;
  }

  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.originPoint = new Point(this.originPoint.x, this.originPoint.y);
    cloneObject.enableRotate = this.enableRotate;
  }

  getBounds() {
    const {width, height, originPoint, poly} = this;
    if (poly.length === 0) return new Bounds();
    const pnt = poly[0];
    const offsetX = pnt.x - originPoint.x;
    const offsetY = pnt.y - originPoint.y;
    const x1 = new Point(offsetX, offsetY);
    const x2 = new Point(offsetX + width, offsetY + height);
    x1.applyPointScale(pnt, this.m_scaleX, this.m_scaleY);
    x2.applyPointScale(pnt, this.m_scaleX, this.m_scaleY);
    return new Bounds(x1.x, x1.y, x2.x, x2.y);
  }

  setPoints(points) {
    super.setPoints(points);
    if (points && points.length > 0) {
      this.traverChildren();
    }
  }
}

RegularPoint.extendElementAttributes = [
  "transformAngle",
  "transformSizeX",
  "transformSizeY",
  "currentReplaceIndex",
];

export default RegularPoint;