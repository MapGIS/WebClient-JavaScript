/*
 * @Author: your name
 * @Date: 2021-09-26 15:12:35
 * @LastEditTime: 2022-03-14 13:34:02
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\RegularElement\BaseRegularElement.js
 */
import Point from "../../../../PlotUtilBase/Geometry/Point";
import MsblElement from "../MsblElement";
import ElementFactory from "../ElementFactory";
import PathElement from "../PathElement";
import Element from "../Element";
import {drawTypes} from "../index";
import MainElement from "../extend/MainElement";
import BasePlotElement from "../BasePlotElement";
import Bounds from "../../../../PlotUtilBase/Geometry/Bound";
import TSpanElement from "../TSpanElement";
import Spline from "../../../../PlotUtilBase/Geometry/Spline";

export default class BaseRegularElement extends BasePlotElement {
  constructor(node) {
    super(node);
    this.type = "regular";
    this.poly = [];
    this.animationPoly = [];
  }

  /**
   * @description: 初始化符号参数
   * @param {*} node
   * @return {*}
   */
  initBaseAttributes(node) {
    const msblTag = this.getMsblElement(node);

    if (!msblTag) return;

    const NameProps = msblTag.getAttribute("Name");

    if (NameProps.hasValue()) {
      this.name = NameProps.getValue();
    }

    const AttitudeProps = msblTag.getAttribute("Attitude");
    if (AttitudeProps.hasValue()) {
      this.attitude = AttitudeProps.getValue();
    }

    const angleProps = msblTag.getAttribute("Angle");
    if (angleProps.hasValue()) {
      this.angle = parseInt(angleProps.getValue(), 10);
    }
  }

  // 遍历子节点
  _addChild(childNode) {
    const child =
      childNode instanceof Element
        ? childNode
        : ElementFactory.createInstance(childNode);

    if (child == null || child === "undefined" || child instanceof MsblElement)
      return;
    // replace Element
    const temp = this._replaceChild(childNode, child);
    temp._parent = this;
    this._children.push(temp);
  }

  // 遍历子元素
  traverChildren() {
    this._traverChildren(this._children);
  }

  // 替换子元素
  _replaceChild(node, ele) {
    return ele;
  }

  /**
   * @description: 遍历子对象数组
   * @param {*} children
   * @return {*}
   */
  _traverChildren(children) {
    const insert = this._calcInsertGeometry();
    this.geometryInsertRate = insert;
    children.forEach((child) => {
      if (drawTypes.indexOf(child.type) > -1) {
        child.isAllowCoords = true;
        if (this._filterElement(child)) {
          this._applyElementTransfrom(child);
        } else {
          this._applyMainElement(child);
        }
        this._applyScaleWidth(child);

        child.geometryInsertRate = insert;
        // 几何对象点组缓存
        if (this.isOpenCoordsCache && child instanceof PathElement) {
          child.cacheCoords = child.getCoords();
        }
      }
      this._traverChildren(child._children);
    });
  }

  /**
   * @description: 作用主轴
   * @param {*} child
   * @return {*}
   */
  _applyMainElement(child) {}

  /**
   * @description: 作用非主轴节点
   * @param {*} child
   * @return {*}
   */
  _applyElementTransfrom(child) {}

  /**
   * @description: 作用线宽
   * @param {*}
   * @return {*}
   */
  _applyScaleWidth(child) {
    // 作用随图缩放线宽
    if (child._mapScaleLineWidth) {
      child.setMapScale(this.m_scaleY)
    }
  }

  /** 转换矩阵相关封装*/
  /**
   * @description: 作用坐标系转换
   * @param {*} child
   * @param {*} matrix
   * @param {*} origin
   * @return {*}
   */
  _run3d(child, matrix, origin) {
    if (child instanceof TSpanElement) {
      const bounds = child.getBoundingBox();
      const center = bounds.getCenter();
      this._runScale(matrix, center, 1, -1);
    }
    this._runScale(matrix, origin, 1, -1);
  }

  _runMapScale(matrix, mapScalePoint, scaleX, scaleY) {
    this._runScale(matrix, mapScalePoint, scaleX, scaleY);
  }

  /**
   * @description: 作用scale
   * @param {*} matrix
   * @param {*} origin
   * @param {*} scaleX
   * @param {*} scaleY
   * @return {*}
   */
  _runScale(matrix, origin, scaleX, scaleY) {
    matrix = matrix.translate(-origin.x, -origin.y);
    matrix = matrix.scale(scaleX, scaleY);
    matrix = matrix.translate(origin.x, origin.y);
  }

  /**
   * @description: 作用旋转
   * @param {*} matrix
   * @param {*} origin
   * @param {*} rad
   * @return {*}
   */
  _runRotate(matrix, origin, rad) {
    matrix = matrix.translate(-origin.x, -origin.y);
    matrix = matrix.rotate(rad);
    matrix = matrix.translate(origin.x, origin.y);
  }

  /**
   * @description: 作用平移
   * @param {*} matrix
   * @param {*} translatePoint
   * @return {*}
   */
  _runTranslate(matrix, translatePoint) {
    matrix = matrix.translate(translatePoint.x, translatePoint.y);
  }

  /**
   * @description: 处理非三维部分transfrom
   * @param {*} matrix 矩阵
   * @param {*} trueOrigin 真实原点
   * @param {*} translatePoint 偏移点
   * @param {*} angle 角度
   * @param {*} scaleX x方向拉伸
   * @param {*} scaleY y方向拉伸
   * @param {*} m_scaleX 缩图缩放参数x
   * @param {*} m_scaleY 缩图缩放参数y
   * @return {*}
   */
  _applyNormalMatrixTransfrom(
    matrix,
    trueOrigin,
    translatePoint,
    angle,
    scaleX,
    scaleY,
    m_scaleX,
    m_scaleY
  ) {
    if (!matrix) new Error("转换矩阵不存在！");

    if (
      trueOrigin &&
      typeof scaleX === "number" &&
      typeof scaleY === "number"
    ) {
      this._runScale(matrix, trueOrigin, scaleX, scaleY);
    }
    if (
      trueOrigin &&
      typeof m_scaleX === "number" &&
      typeof m_scaleY === "number"
    ) {
      this._runMapScale(matrix, trueOrigin, m_scaleX, m_scaleY);
    }
    if (trueOrigin && typeof angle === "number") {
      this._runRotate(matrix, trueOrigin, Math.PI * (angle / 180));
    }
    if (translatePoint) {
      this._runTranslate(matrix, translatePoint);
    }
  }

  /**
   * @description: 筛选节点
   * @param {*} child
   * @return {*}
   */
  _filterElement(child) {
    return !(child instanceof MainElement);
  }

  /**
   * @description: 获取svg符号元数据
   * @param {*} node
   * @return {*}
   */
  getMsblElement(node) {
    if (!node) return null;

    let child = node.firstElementChild;
    let msblEle = null;
    while (child && !msblEle) {
      if (child.tagName === "msbl") {
        msblEle = new MsblElement(child);
      }
      child = child.nextElementSibling;
    }
    return msblEle;
  }

  /**
   * @description:获取主轴element Node
   * @param {*} node dom元素
   * @param {*} id 主轴id
   * @return {*}
   */
  _getMainLineNode(node, id) {
    let mainNode = null;
    if (node.id && new RegExp(node.id, "i").test(id)) {
      if (node.tagName === "g") {
        let child = node.firstElementChild;
        while (child) {
          if (child.tagName === "path") {
            mainNode = child;
          }
          child = child.nextElementSibling;
        }
      } else if (node.tagName === "path") {
        mainNode = node;
      }
    }
    return mainNode;
  }

  /**
   * @description: 克隆
   * @param {*} cloneObject
   * @return {*}
   */
  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.name = this.name;
    cloneObject.attitude = this.attitude;
    cloneObject.angle = this.angle;
    cloneObject.poly = this.poly.map((s) => new Point(s.x, s.y));
    cloneObject._pnts = this._pnts
      ? this._pnts.map((s) => new Point(s.x, s.y))
      : null;
  }

  /**
   * @description: 计算真实外包边界
   * @param {*}
   * @return {*}
   */
  getBounds() {
    const _bounds = new Bounds();
    this._setCorrectBounds(this._children, _bounds);
    return _bounds;
  }

  /**
   * @description: 设置真实外包边界
   * @param {*} children 子数组
   * @param {*} bound 外包
   * @return {*}
   */
  _setCorrectBounds(children, bound) {
    children.forEach((child) => {
      if (drawTypes.indexOf(child.type) > -1 && child.getBounds) {
        const _b = child.getBounds();
        bound.addBounds(_b);
      }
      this._setCorrectBounds(child._children, bound);
    });
  }

  /* -------------------控制点操作------------------*/

  // 控制点修改
  setPoints(points) {
    const pnts = [];
    points.forEach((item) => {
      pnts.push(new Point(item.x, item.y));
    });
    this.poly = pnts;
    this.traverChildren();
  }

  /* -------------------缩放 二三维坐标转换参数------------------ */
  changeAttributeStatus(is3d, scaleX, scaleY) {
    super.changeAttributeStatus(is3d, scaleX, scaleY);
    this.traverChildren();
  }
}
