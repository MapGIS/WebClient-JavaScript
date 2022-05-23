/*
 * @Description: 
 * @Author: zk
 * @Date: 2022-02-17 19:03:38
 * @LastEditors: zk
 * @LastEditTime: 2022-05-23 13:49:17
 */
import Point from "../../../../PlotUtilBase/Geometry/Point";
import Matrix3 from "../../../../PlotUtilBase/Math/Matrix3";
import BaseRegularElement from "./BaseRegularElement";
import MainLineElement from "../extend/MainLineElement";
import DefaultLinePathParser from "../Default/DefaultLine";
import Spline from "../../../../PlotUtilBase/Geometry/Spline";
import TSpanElement from "../TSpanElement";

export default class RegularLine1 extends BaseRegularElement {
  /**
   *  belowAxisIDs
   *  aboveAxisIDs
   *  axis1_id
   *  defaultLine
   */

  constructor(node) {
    super(node);
    this.belowAxisIDs = [];
    this.aboveAxisIDs = [];
    this.type = "msbl_regularline1";
    this.flag = true;
    this.initBaseAttributes(node);
  }

  _traverNodes(node) {
    // 获取主轴id
    const msbl = this.getMsblElement(node);
    const axis1_idProps = msbl.getAttribute("Axis1_ID");
    this.axis1_id = axis1_idProps.getString();

    // 添加子节点
    Array.from(node.childNodes).forEach((childNode) => {
      this._addChild(childNode);
    });
  }

  _replaceChild(node, ele) {
    // 处理主轴
    const mainNode = this._getMainLineNode(node, this.axis1_id);

    if (mainNode) {
      // 生成主轴对象
      const mainElement = new MainLineElement(mainNode);

      this.defaultLine = new DefaultLinePathParser(
        mainElement.getAttribute("d").getString()
      );
      // 主轴参数设置
      mainElement.flag = this.flag;

      return mainElement;
    }
    return ele;
  }

  initBaseAttributes(node) {
    super.initBaseAttributes(node);

    const msblTag = this.getMsblElement(node);

    if (!msblTag) return;

    const msblProps = msblTag.getAttribute("Type");

    if (msblProps.hasValue()) {
      if (!new RegExp(this.type, "i").test(msblProps.getValue())) {
        throw new Error("符号类型错误!");
      }
    }

    const axis1_idProps = msblTag.getAttribute("Axis1_ID");

    const aboveAxisIDs = msblTag.getAttribute("AboveAxisIDs");

    const belowAxisIDs = msblTag.getAttribute("BelowAxisIDs");

    if (axis1_idProps.hasValue()) {
      this.axis1_id = axis1_idProps.getValue();
    }

    if (aboveAxisIDs.hasValue()) {
      this.aboveAxisIDs = aboveAxisIDs.getString().split(",");
    }

    if (belowAxisIDs.hasValue()) {
      this.belowAxisIDs = belowAxisIDs.getString().split(",");
    }

    // 当符号角度为90度，代表线走向保持不变，即控制点坐标不发生倒置
    // 当符号角度为180度，代表线走向有方向，需要将控制点坐标倒置（参看线空隙处处理，即可）
    if (typeof this.angle === "number") {
      if (this.angle === 180) {
        this.flag = false;
      }
    }
  }
  _applyElementTransfrom(element) {
    // 子节点调用
    const { width, defaultLine, flag, poly } = this;
    let gOrigin;
    let arrowDir = false;
    let scaleX = 1;
    let scaleY = 1;
    let matrix = new Matrix3();

    const group = element.getElementGroup();

    const aboveBelowAxisIDs = this.aboveAxisIDs
      .concat(this.belowAxisIDs)
      .filter((s) => s);

    if (
      aboveBelowAxisIDs.indexOf(element.getAttribute("id").getString()) > -1 ||
      (group &&
        aboveBelowAxisIDs.indexOf(group.getAttribute("id").getString()) > -1)
    ) {
      arrowDir = true;
    }

    if (group) {
      gOrigin = group.getOriginPoint();
    } else {
      gOrigin =
        element.getOriginPoint() || element.getBoundingBox().getCenter();
    }

    if (
      !gOrigin ||
      Number.isNaN(gOrigin.x) ||
      Number.isNaN(gOrigin.y || !poly) ||
      !this.mainLine
    ) {
      return;
    }
    //计算偏移百分比和y轴上的偏移量
    const [offsetRate, , offsetY] = this._getPathRate(
      gOrigin,
      this.mainLine,
      defaultLine,
      width,
      flag
    );

    if (offsetRate > 1 || offsetRate < 0) {
      // 控制输出 getCoords 全不输出
      element.isAllowCoords = false;
      return;
    }

    const tran = this.mainLine.getTransfromByRate(offsetRate);
    if (!tran) return;

    let rotateAngle = 0;
    const [pnt, lineangle] = tran;
    const translatePoint = new Point(
      pnt[0] - gOrigin.x,
      pnt[1] - gOrigin.y + offsetY
    );

    const origin = Point.newSub(gOrigin, 0, offsetY);

    // 直线坐标系下角度转屏幕坐标系角度
    // 角度乘以-1
    rotateAngle = -lineangle;

    if (this._is3d) {
      this._run3d(matrix, origin);
    }
    
    // 控制点组调换把初始svg符号翻转
    if (!flag) {
      scaleX = -1;
      scaleY = 1;
    }
    // 修改有部件需要上下翻转的情况
    if (rotateAngle < -90 || rotateAngle > 90) {
      if (arrowDir) {
        scaleY = -scaleY;
      }
    }else{
      // 处理文字的翻转
      if(element instanceof TSpanElement){
        const bounds = element.getBoundingBox();
        const center = bounds.getCenter();
        this._runScale(matrix, center, -1, 1);
      }
    }
    this._applyNormalMatrixTransfrom(
      matrix,
      origin,
      translatePoint,
      rotateAngle,
      scaleX,
      scaleY,
      this.m_scaleX,
      this.m_scaleY 
    );
    element._transformMatrix = matrix;

    let _origin= origin.clone()

  if(arrowDir){
    let _lineangle = lineangle;
    if (arrowDir) {
        if (_lineangle < -90 || _lineangle >= 90) {
            _lineangle = 180 + _lineangle;
        }
    }
    element._dimModal.clear()
    element._dimModal.push(
      {
        originPoint:_origin,
        lineAngle:_lineangle
      }
    )
  }


  }

  _getPathRate(gOrigin, mainLine, defaultLine, width, flag) {
    const lengTotal = mainLine.lengthArr.reduce(
      (total, current) => total + current
    );
    const start = defaultLine.getStart();
    const end = defaultLine.getEnd();

    const offsetX = gOrigin.x - start.x;
    const offsetY = gOrigin.y - start.y;

    const startRate = (start.x * this.m_scaleX) / lengTotal;
    const endRate = ((width - end.x) * this.m_scaleX) / lengTotal;

    const mainLineRate = 1 - startRate - endRate;
    const _eleMainLineRate =
      (offsetX / (end.x - start.x)) * mainLineRate + startRate;

    const offsetRate = flag ? _eleMainLineRate : 1 - _eleMainLineRate;

    return [offsetRate, offsetX, offsetY];
  }

  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.flag = this.flag;
    cloneObject.belowAxisIDs = this.belowAxisIDs.concat();
    cloneObject.aboveAxisIDs = this.aboveAxisIDs.concat();
    cloneObject.axis1_id = this.axis1_id;
    cloneObject.defaultLine = this.defaultLine
      ? this.defaultLine.clone()
      : null;
    cloneObject.mainLine = new Spline(this.poly);
  }

  _applyMainElement(child) {
    child.applyMainGeo(this.mainLine, this.width);
    child.applyMapScale(this.m_scaleX, this.m_scaleY, this.width);
    child.flag = this.flag;
  }

  setPoints(points) {
    super.setPoints(points);
    if (points.length > 1) {
      this.mainLine = new Spline(this.poly,{
        maxPoint:this.getInsertGeometryPoint(10)
      });
      this.traverChildren();
    }
  }
}
