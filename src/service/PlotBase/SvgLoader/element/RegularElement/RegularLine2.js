/* eslint-disable default-case */
import { Matrix3 } from "../../../../PlotUtilBase/Math/Matrix3";
import { Point } from "../../../../PlotUtilBase/Geometry/Point";
import { BaseRegularElement } from "./BaseRegularElement";
import { GElement } from "../GElement";
import Spline from "../../../../PlotUtilBase/Geometry/Spline";
import { DefaultLinePathParser } from "../Default/DefaultLine";
import { ExtendLineElement } from "../extend/ExtendLineElement";

export class RegularLine2 extends BaseRegularElement {
  type = "msbl_regularline2";
  /**
   * aboveAxisIDs
   * axis2_Y
   * mainLine
   * isExtendLine
   */
  static extendElementAttributes = ["axis2_Y"];
  constructor(node) {
    super(node);
    this.aboveAxisIDs = [];
    this.axis2_Y = 0.5;
    this.initBaseAttributes(node);
  }

  initBaseAttributes(node) {
    super.initBaseAttributes(node);
    const msblTag = this.getMsblElement(node);
    if (!msblTag) return;

    const aboveAxisIDs = msblTag.getAttribute("AboveAxisIDs");

    const axis2_YProps = msblTag.getAttribute("Axis2_Y");

    if (aboveAxisIDs.hasValue()) {
      this.aboveAxisIDs = aboveAxisIDs.getString().split(",");
    }

    if (axis2_YProps.hasValue()) {
      this.axis2_Y = axis2_YProps.getNumber();
    }
  }

  getSaveBaseAttributes() {
    const attributes = super.getSaveBaseAttributes();
    return this._getSaveBaseAttributes(RegularLine2, attributes);
  }

  _replaceChild(node, ele) {
    const useStyle = this._getUseStyle(ele);
    if (useStyle === "Extend") {
      this.isExtendLine = true;
      if (node.nodeName === "g") {
        let childNode = node.firstElementChild;
        while (childNode) {
          if (childNode.nodeName === "path") {
            const extendElement = new ExtendLineElement(childNode);
            ele.replaceChildById(childNode.id, extendElement);
          }
          childNode = childNode.nextElementSibling;
        }
        return ele;
      }

      if (node.nodeName === "path") {
        const extendElement = new ExtendLineElement(node);
        return extendElement;
      }
    }
    return ele;
  }
  _applyElementTransfrom(element) {
    const type = this._getUseStyle(element);
    switch (type) {
      case "Non-Duplicate": {
        this._nonAction(element);
        break;
      }
      case "Duplicate": {
        this._dupAction(element);
        break;
      }
    }
  }
  _applyMainElement(child) {
    const flag = this._is3d ? -1 : 1;
    const v =
      (this.axis2_Y * this.height -
        new DefaultLinePathParser(
          child.getAttribute("d").getString()
        ).getStart().y) *
      flag;

    if (!this.poly || this.poly.length < 2) {
      return;
    }

    const _spline = new Spline(this.poly, false, v * this.m_scaleY);

    child.applyMainGeo(_spline, this.width);
    child.applyMapScale(this.m_scaleX, this.m_scaleY, this.width);
  }

  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.aboveAxisIDs = this.aboveAxisIDs
      ? this.aboveAxisIDs.map((s) => s)
      : null;
    cloneObject.axis2_Y = this.axis2_Y;
    cloneObject.isExtendLine = this.isExtendLine;
    cloneObject.mainLine = this.mainLine.clone();
  }

  _nonAction(element) {
    const { mainLine } = this;
    if (!this._isDraw() || !mainLine) {
      return;
    }
    const start = new Point(0, this.axis2_Y * this.height);
    let matrix = new Matrix3();
    let origin, offsetXRate;


    if (element._parent instanceof GElement) {
      origin = element._parent.getOriginPoint();
    } else {
      origin = element.getOriginPoint() || element.getBoundingBox().getCenter();
    }

    offsetXRate = (origin.x - start.x) / this.width;
    offsetXRate = offsetXRate <= 0 ? 0 : offsetXRate;
    offsetXRate = offsetXRate >= 1 ? 1 : offsetXRate;

    let offsetY = origin.y - start.y;
    const [point, angle] = mainLine.getTransfromByRate(offsetXRate);

    let _angle = -angle;

    if (this._is3d) {
      this._run3d(element, matrix, origin);
      // 几何翻转后，y轴翻转取反
      offsetY = -offsetY;
    }

    const translatePoint = new Point(
      point[0] - origin.x,
      point[1] - origin.y + offsetY * this.m_scaleY
    );

    this._applyNormalMatrixTransfrom(
      matrix,
      origin,
      translatePoint,
      _angle,
      1,
      1,
      this.m_scaleX,
      this.m_scaleY
    );

    element._transformMatrix = matrix;
  }

  _dupAction(element) {
    let pntInfo;
    let origin;
    let trueOrigin;
    const matrixs = [];
    const { mainLine } = this;

    if (!mainLine || !this._isDraw()) return;
    // 判断是否有延伸线
    if (this.isExtendLine) {
      origin = element.getOriginPoint() || element.getBoundingBox().getCenter();
      const offsetY = origin.y - this.axis2_Y * this.height;
      const offsetRate = origin.x / this.width;
      pntInfo = mainLine.getPntInfoBywidth(
        this.width * this.m_scaleX,
        offsetRate
      );

      if (pntInfo && pntInfo.length > 0) {
        for (let i = 0; i < pntInfo.length; i++) {
          let matrix = new Matrix3();
          const [tranV, angle] = pntInfo[i];
          const translatePoint = Point.newSub(
            Point.newAdd(new Point(tranV[0], tranV[1]), 0, offsetY),
            origin.x,
            origin.y
          );
          trueOrigin = new Point(origin.x, this.axis2_Y * this.height);

          // 注：角度翻转后问题
          // 根据getPntInfoBywidth函数算出的角度默认是在直角坐标系下的
          // 因此角度在二维上使用时必须加一个-1，三维上则还原
          // 进行镜面翻转时（即scale（1，-1））,角度方向又发生变化，因此必须加乘以-1
          let _angle = -angle;
          if (this._is3d) {
            this._run3d(element, matrix, trueOrigin);
            // 第一步 回正角度
            _angle = -_angle;
            // 第二步 解决翻转后角度变化的问题
            _angle = -_angle;
          }

          this._applyNormalMatrixTransfrom(
            matrix,
            trueOrigin,
            translatePoint,
            _angle,
            1,
            1,
            this.m_scaleX,
            this.m_scaleY
          );
          matrixs.push(matrix);
        }
      }
    } else {
      origin = new Point(0, this.axis2_Y * this.height);
      trueOrigin = new Point(origin.x, this.axis2_Y * this.height);
      pntInfo = mainLine.getPntInfoBywidth(this.width * this.m_scaleX);

      if (pntInfo && pntInfo.length > 0) {
        let tempPoint = new Point(pntInfo[0][0][0], pntInfo[0][0][1]);
        for (let i = 1; i < pntInfo.length; i++) {
          let matrix = new Matrix3();
          const rad = Math.atan2(
            pntInfo[i][0][1] - tempPoint.y,
            pntInfo[i][0][0] - tempPoint.x
          );
          const angle = (180 * rad) / Math.PI;
          const translatePoint = Point.newSub(
            tempPoint,
            trueOrigin.x,
            trueOrigin.y
          );

          let _angle = -angle;
          if (this._is3d) {
            this._run3d(element, matrix, trueOrigin);
          }

          this._applyNormalMatrixTransfrom(
            matrix,
            trueOrigin,
            translatePoint,
            _angle,
            1,
            1,
            this.m_scaleX,
            this.m_scaleY
          );

          matrixs.push(matrix);

          tempPoint = this._getDuplicateEndPoint(
            tempPoint,
            this.width * this.m_scaleX,
            rad
          );
        }
      }
    }
    element._transformMatrix = matrixs;
  }



  /**
   * @description: 获取element使用方式
   * @param {*} element
   * @return {*}
   */
  _getUseStyle(element) {
    let type;
    if (
      element.getAttribute("UseStyle").hasValue() ||
      (element._parent && element._parent.getAttribute("UseStyle").hasValue())
    ) {
      type =
        element.getAttribute("UseStyle").getValue() ||
        (element._parent &&
          element._parent.getAttribute("UseStyle").getValue());
    } else {
      type = "Non-Duplicate";
    }
    return type;
  }

  /**
   * @description: 判断是否进行绘制
   * @param {*}
   * @return {Boolean}
   */
  _isDraw() {
    if (!this.poly || this.poly.length <= 1) {
      return false;
    }
    return true;
  }

  /**
   * @description: 计算倾角方向按距离去点
   * @param {*} tempPoint
   * @param {*} dis
   * @param {*} angle
   * @return {*}
   */
  _getDuplicateEndPoint(tempPoint, dis, angle) {
    const offsetX = dis * Math.cos(angle);
    const offsetY = dis * Math.sin(angle);
    return Point.newAdd(tempPoint, offsetX, offsetY);
  }

  setPoints(points) {
    super.setPoints(points);
    if (points.length > 1) {
      this.mainLine = new Spline(this.poly);
      this.traverChildren();
    }
  }
}
