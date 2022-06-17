/*
 * @class: 扩展类
 * @Description:
 * @Author: zk
 * @Date: 2022-05-16 12:05:54
 * @LastEditors: zk
 * @LastEditTime: 2022-05-27 20:22:33
 */

import Point from '../../../../PlotUtilBase/Geometry/Point';
import MsblElement from '../MsblElement';
import ElementFactory from '../ElementFactory';
import PathElement from '../PathElement';
import Element from '../Element';
import { drawTypes } from '../index';
import MainElement from '../extend/MainElement';
import BasePlotElement from '../BasePlotElement';
import Bounds from '../../../../PlotUtilBase/Geometry/Bound';

export default class BaseSimple extends BasePlotElement {
    constructor(node) {
        super(node);
        this.type = 'simple';
        this.poly = [];
    }

    /**
     * @description: 初始化符号参数
     * @param {*} node
     * @return {*}
     */
    initBaseAttributes(node) {
        this.symbolVersion = this.getAttribute('zondyPlotSymbol:version').getValue();
        this.symbolId = this.getAttribute('zondyPlotSymbol:id').getValue();
        this.symbolName = this.getAttribute('zondyPlotSymbol:name').getValue();
        this.symbolDesc = this.getAttribute('zondyPlotSymbol:desc').getValue();
        this.symbolPose = this.getAttribute('zondyPlotSymbol:pose').hasValue()? this.getAttribute('zondyPlotSymbol:pose').getValue() :'1';
    }

    // 遍历子节点
    _addChild(childNode) {
        const child = childNode instanceof Element ? childNode : ElementFactory.createInstance(childNode);

        if (child == null || child === 'undefined' || child instanceof MsblElement) return;
        // replace Element
        const temp = this._replaceChild(childNode, child);
        temp._parent = this;
        this._children.push(temp);
    }

    // 获取符号姿态
    getSymbolPose(){
       return  this.symbolPose
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
     * @param {object}  child 子节点
     */
    _applyScaleWidth(child) {
        // 作用随图缩放线宽
        if (child._mapScaleLineWidth) {
            child.setMapScale(this.m_scaleY);
        }
    }

    /** 转换矩阵相关封装*/
    /**
     * @description: 作用坐标系转换
     * @param {*} matrix
     * @param {*} origin
     * @return {*}
     */
    _run3d(matrix, origin) {
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
    _applyNormalMatrixTransfrom(matrix, trueOrigin, translatePoint, angle, scaleX, scaleY, m_scaleX, m_scaleY) {
        if (!matrix) new Error('转换矩阵不存在！');

        if (trueOrigin && typeof scaleX === 'number' && typeof scaleY === 'number') {
            this._runScale(matrix, trueOrigin, scaleX, scaleY);
        }
        if (trueOrigin && typeof m_scaleX === 'number' && typeof m_scaleY === 'number') {
            this._runMapScale(matrix, trueOrigin, m_scaleX, m_scaleY);
        }
        if (trueOrigin && typeof angle === 'number') {
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
     * @function: Module:
     * @description: 遍历element对象
     * @param {Array<Element>} eleArr
     * @param {Function} func
     */
    _travelElementArr(eleArr, func) {
        if (eleArr.length <= 0) {
            return;
        }
        eleArr.forEach((element) => {
            func(element);
            this._travelElementArr(element._children, func);
        });
    }

    // 点类型部件方法
    applyPartElement(ele) {
      if (!ele) return;
      const origin = this._getOriginPointByPx(ele);
      ele.getOriginPoint = function () {
          return origin.clone();
      };
      const pose = this._getPose(ele);
      ele.getPose = function () {
          return pose;
      };
  }

    _getOrigin(ele) {
        let origin;
        if (ele.getAttribute('zondyPlotSymbolItem:markerOrigin').hasValue()) {
            const arr = ele.getAttribute('zondyPlotSymbolItem:markerOrigin').getString().split(',');
            origin = new Point(parseFloat(arr[0]), parseFloat(arr[1]));
        } else {
            const bounds = ele.getBoundingBox();
            origin = bounds.getCenter();
        }
        return origin;
    }
    _getOriginPointByPx(ele) {
        let gOrigin;
        const group = ele.getElementGroup();
        if (group) {
            gOrigin = this._getOrigin(group);
        } else {
            gOrigin = this._getOrigin(ele);
        }
        return gOrigin;
    }
    _getSourceAttribute(ele,attributeName,defaultValue){
      if(ele.getAttribute(attributeName).hasValue()){
          return ele.getAttribute(attributeName).getValue()
      }else if(ele._parent){
          return this._getSourceAttribute(ele._parent,attributeName,defaultValue)
      }else{
          return defaultValue
      }
    }
    _getPose(ele) {
        let pose=this._getSourceAttribute(ele,'zondyPlotSymbolItem:pose',"0")
        return pose;
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
        cloneObject._pnts = this._pnts ? this._pnts.map((s) => new Point(s.x, s.y)) : null;
    }

    /**
     * @description: 计算真实外包边界
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
    }

    /* -------------------缩放 二三维坐标转换参数------------------ */
    changeAttributeStatus(is3d, scaleX, scaleY) {
        super.changeAttributeStatus(is3d, scaleX, scaleY);
        this.traverChildren();
    }
}
