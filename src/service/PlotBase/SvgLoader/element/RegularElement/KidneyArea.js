/*
 * @Author: your name
 * @Date: 2021-06-02 15:16:15
 * @LastEditTime: 2022-02-24 11:39:59
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \TypeScript-Babel-Starter\src\Object\RegularElement\RegularSurface.ts
 */
import Matrix3 from "../../../../PlotUtilBase/Math/Matrix3";
import Point from "../../../../PlotUtilBase/Geometry/Point";
import {calculatePolygonGravityCenter} from "../../../../PlotUtilBase/Math/MathUtils";
import BaseRegularElement from "./BaseRegularElement";
import TSpanElement from "../TSpanElement";
import MainBorderElement from "../extend/MainBorderElement";
import Spline from "../../../../PlotUtilBase/Geometry/Spline";
import Bounds from "../../../../PlotUtilBase/Geometry/Bound";

export default class KidneyArea extends BaseRegularElement {
  /**
   * border_ID
   * muti_scaleX
   * muti_scaleY
   */
  constructor(node) {
    super(node);
    this.muti_scaleX = 1;
    this.muti_scaleY = 1;
    this.type = "msbl_KidneyArea";
  }

  // base
  _traverNodes(node) {
    // 获取主轴id
    const msbl = this.getMsblElement(node);
    const Border_IDProps = msbl.getAttribute("Border_ID");
    if (Border_IDProps.hasValue()) {
      this.border_ID = Border_IDProps.getValue();
    }
    // 添加子节点
    Array.from(node.childNodes).forEach((childNode) => {
      this._addChild(childNode);
    });
  }

  _replaceChild(node, ele) {
    const mainBorder = this._getMainLineNode(node, this.border_ID);

    if (mainBorder) {
      // 生成主轴对象
      const mainElement = new MainBorderElement(mainBorder);
      this.mainBorderElement = mainElement;
      return mainElement;
    }

    return ele;
  }

  _applyElementTransfrom(element) {
    const [direction, angle, relativeToBorder, partRate] =
      this._getKidneyElementAttribute(element);

    let matrix = new Matrix3();
    const {mainBorder} = this;

    const {poly} = this;

    if (!poly || poly.length <= 2 || !mainBorder) {
      element.isAllowCoords = false;
      return;
    }

    let translatePoint;
    let rotateAngle;
    this.muti_scaleX = 1;
    this.muti_scaleY = 1;

    const origin =
      element.getOriginPoint() || element.getBoundingBox().getCenter();
    if (
      direction === "AdhereToBorder_Outward" ||
      direction === "AdhereToBorder_Inward"
    ) {
      const [point, kAngle] = mainBorder.getTransfromByRate(partRate);

      let tempAngle = 0;
      let tempKAngle = -kAngle;

      if (direction === "AdhereToBorder_Outward") {
        tempAngle = 270;
      } else {
        tempAngle = -270;
      }

      if (!this._is3d) {
        tempAngle = -tempAngle
      } else {
        if (angle == 90 || angle === 270) {
          tempAngle += 180
        }
      }

      translatePoint = new Point(point[0] - origin.x, point[1] - origin.y);
      rotateAngle = tempKAngle - angle + tempAngle;


    } else if (direction === "Upward") {
      const pnts = poly.map((s) => [s.x, s.y]);

      const tranPoint = calculatePolygonGravityCenter(pnts);
      translatePoint = new Point(
        tranPoint[0] - origin.x,
        tranPoint[1] - origin.y
      );
      this._applyMutiScale(pnts);
      // 特殊处理3d
      if (this._is3d && element._dimModal) {
        element._dimModal.set3D(true);
        element._dimModal.setLineAngle(0);
        element._dimModal.setTranslatePoint(origin);
      }
    } else if (relativeToBorder === "Forward" || direction === "Forward") {
      const defaultCenter = new Point(this.width / 2, this.height / 2);

      origin.x = defaultCenter.x;
      origin.y = defaultCenter.y;

      const pnts = poly.map((s) => [s.x, s.y]);

      const tranPoint = calculatePolygonGravityCenter(pnts);

      translatePoint = new Point(
        tranPoint[0] - origin.x,
        tranPoint[1] - origin.y
      );
      this._applyMutiScale(pnts);
    }

    if (this._is3d) {
      this._run3d(element, matrix, origin);
    }

    this._applyNormalMatrixTransfrom(
      matrix,
      origin,
      translatePoint,
      rotateAngle,
      this.muti_scaleX,
      this.muti_scaleY,
      this.m_scaleX,
      this.m_scaleY
    );

    element._transformMatrix = matrix;
  }

  _applyMainElement(child) {
    child.applyMainGeo(this.mainBorder);
    child.applyMapScale(this.m_scaleX, this.m_scaleY);
  }

  _filterElement(child) {
    return !(child instanceof MainBorderElement);
  }

  /**
   * @description: 作用累加scale
   * @param {Bounds} pntsBounds 点bounds
   * @param {Bounds} baseBounds 基础bounds
   * @param {*} baseScaleX
   * @param {*} baseScaleY
   * @param {*} mutiScaleX 缩放x
   * @param {*} mutiScaleY 缩放y
   * @return {*}
   */
  _getMutiScale(pntsBounds, baseBounds, baseScaleX, baseScaleY) {
    const _scaleX = pntsBounds.width / (baseBounds.width * baseScaleX);
    const _scaleY = pntsBounds.height / (baseBounds.height * baseScaleY);
    const _scaleNum = _scaleX > _scaleY ? _scaleX : _scaleY;
    const baseRate = 2;
    return [_scaleNum / baseRate, _scaleNum / baseRate];
  }

  _applyMutiScale(pnts) {
    // 处理按区域缩放
    const pntsBounds = new Bounds();
    pnts.forEach((s) => {
      pntsBounds.addPnt(s[0], s[1]);
    });

    const [_muti_scaleX, _muti_scaleY] = this._getMutiScale(
      pntsBounds,
      new Bounds(0, 0, this.width, this.height),
      this.m_scaleX,
      this.m_scaleY
    );
    this.muti_scaleX = _muti_scaleX;
    this.muti_scaleY = _muti_scaleY;
  }

  /**
   * @description: 获取kidney对象基础参数
   * @param {*} element
   * @return {*}
   */
  _getKidneyElementAttribute(element) {
    let direction;
    let angle;
    let relativeToBorder;
    if (
      element.getAttribute("PartDirection").hasValue() ||
      (element._parent &&
        element._parent.getAttribute("PartDirection").hasValue())
    ) {
      direction =
        element.getAttribute("PartDirection").getValue() ||
        (element._parent &&
          element._parent.getAttribute("PartDirection").getValue());
    }

    if (
      element.getAttribute("angle").hasValue() ||
      (element._parent && element._parent.getAttribute("angle").hasValue())
    ) {
      angle =
        element.getAttribute("angle").getNumber() ||
        (element._parent && element._parent.getAttribute("angle").getNumber());
      while (angle < 0) {
        angle += 360;
      }
    }

    if (
      element.getAttribute("RelativeToBorder").hasValue() ||
      (element._parent &&
        element._parent.getAttribute("RelativeToBorder").hasValue())
    ) {
      relativeToBorder =
        element.getAttribute("RelativeToBorder").getString() ||
        (element._parent &&
          element._parent.getAttribute("RelativeToBorder").getString());
    }

    const partRate = angle / 360;
    return [direction, angle, relativeToBorder, partRate];
  }

  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.border_ID = this.border_ID;
    cloneObject.muti_scaleX = this.muti_scaleX;
    cloneObject.mutiScaleY = this.muti_scaleY;
    cloneObject.mainBorder = this.mainBorder.clone();
  }

  setPoints(points, options) {
    super.setPoints(points, options);
    if (this.poly.length > 1) {
      this.mainBorder = new Spline(this.poly, true);
      this.traverChildren();
    }
  }
}
