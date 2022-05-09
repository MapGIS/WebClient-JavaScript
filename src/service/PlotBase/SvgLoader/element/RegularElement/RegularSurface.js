import Matrix3 from "../../../../PlotUtilBase/Math/Matrix3";
import Point from "../../../../PlotUtilBase/Geometry/Point";
import Bounds from "../../../../PlotUtilBase/Geometry/Bound";
import BaseRegularElement from "./BaseRegularElement";
import MainBorderElement from "../extend/MainBorderElement";
import Spline from "../../../../PlotUtilBase/Geometry/Spline";
import NoUseElement from "../extend/NoUseElement";
import GElement from "../GElement";

export default class RegularSurface extends BaseRegularElement {

  /**
   * mainBorderElement
   * border_ID
   * fillElementArr
   * fillImg
   */
  constructor(node) {
    super(node);
    // 填充img
    this.initBaseAttributes(node);
    this.type = "msbl_regularsurface";
    this.fillImg = null;
  }

  // base
  _traverNodes(node) {
    // 填充对象数组
    this.fillElementArr = [];
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
    const mainBorderNode = this._getMainLineNode(node, this.border_ID);
    const type = this._getUseStyle(ele);
    if (mainBorderNode) {
      // 生成主轴对象
      const mainElement = new MainBorderElement(mainBorderNode);
      return mainElement;
    }

    const nouse = new NoUseElement(document.createElement("div"));
    if (type !== "NonUse") {
      if (ele instanceof GElement) {
        ele._children.forEach((s) => {
          this.fillElementArr.push(s);
        });
      } else {
        this.fillElementArr.push(ele);
      }
    }
    return nouse;
  }

  _getMainLineNode(node, id) {
    let mainNode = null;
    if (node.id && new RegExp(node.id, "i").test(id)) {
      if (node.tagName === "g") {
        let child = node.firstElementChild;
        while (child) {
          if (child.tagName === "path" || child.tagName === "rect") {
            mainNode = child;
          }
          child = child.nextElementSibling;
        }
      } else if (node.tagName === "path" || node.tagName === "rect") {
        mainNode = node;
      }
    }
    return mainNode;
  }

  _filterElement(child) {
    return !(child instanceof MainBorderElement);
  }
  _getFillCanvas() {
    const { fillElementArr } = this;
    const size = fillElementArr.length;
    if (size <= 0) return null;
    const tempCanvas = document.createElement("canvas");
    const tempctx = tempCanvas.getContext("2d");
    // 三维缩放比为一，考虑性能问题，三维缩放比放置外部实现
    const scaleX = this._is3d ? 1 : this.m_scaleX;
    const scaleY = this._is3d ? 1 : this.m_scaleY;
    // 填充物
    if (size === 1) {
      fillElementArr.forEach((ele) => {
        // 初始坐标点组
        const baseMatrix = ele._getMatrix();
        const coords = ele._getCoords(baseMatrix);
        const newBounds = new Bounds();
        const bounds = ele.getBoundingBox();
        const topLeft = new Point(bounds.left, bounds.bottom);

        const matrix3 = new Matrix3();
        matrix3.translate(-topLeft.x, -topLeft.y);

        coords.forEach((p) => {
          p.forEach((s) => {
            s.applyMatrix3(matrix3);
            newBounds.addPnt(s.x, s.y);
          });
        });

        const { width } = newBounds;
        const { height } = newBounds;

        tempCanvas.width = width * scaleX;
        tempCanvas.height = height * 1.5 * scaleY;
        tempctx.translate(0, height * scaleY * 0.25);
        tempctx.scale(scaleX, scaleY);

        this._drawCanvas(ele, tempctx, coords);
      });
    } else {
      tempCanvas.width = this.width * scaleX;
      tempCanvas.height = this.height * scaleY;
      fillElementArr.forEach((ele) => {
        tempctx.save();
        tempctx.scale(scaleX, scaleY);
        const baseMatrix = ele._getMatrix();
        const coords = ele._getCoords(baseMatrix);
        this._drawCanvas(ele, tempctx, coords);
        tempctx.restore();
      });
    }
    return tempCanvas;
  }

  _getFillImg() {
    if (this.fillImg) {
      return this.fillImg;
    }

    const tempCanvas = this._getFillCanvas();
    const img = this._convertCanvasToImage(tempCanvas);
    this.fillImg = img;
    return img;
  }

  _drawCanvas(ele, tempctx, coords) {
    const strokeProperty = ele.getStyle("stroke");
    const strokeWidthProperty = ele.getStyle("stroke-width");
    const fillProperty = ele.getStyle("fill");
    const fillOpacityStyleProp = ele.getStyle("fill-opacity");
    const strokeOpacityProp = ele.getStyle("stroke-opacity");

    const strokeStyle = strokeProperty
      .addOpacity(strokeOpacityProp)
      .getString();

    const fillStyle = fillProperty.addOpacity(fillOpacityStyleProp).getString();

    const strokeWidth = strokeWidthProperty.getNumber();

    tempctx.strokeStyle = strokeStyle;
    tempctx.lineWidth = strokeWidth;
    tempctx.fillStyle = fillStyle;
    tempctx.lineCap = "round";

    for (let i = 0; i < coords.length; i++) {
      tempctx.beginPath();
      const pntArr = coords[i];
      pntArr.forEach((t, index) => {
        const pnt = t;
        if (index === 0) {
          tempctx.moveTo(pnt.x, pnt.y);
        } else {
          tempctx.lineTo(pnt.x, pnt.y);
        }
      });

      if (strokeStyle && strokeStyle !== "none") {
        tempctx.stroke();
      }

      if (fillStyle && fillStyle !== "none") {
        tempctx.fill();
      }

      tempctx.closePath();
    }
  }

  _convertCanvasToImage(canvas) {
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }

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

  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject.border_ID = this.border_ID;
    cloneObject.fillElementArr = this.fillElementArr.map((s) => s.clone());
    // img异步
    cloneObject.fillImg = null;
  }

  _applyMainElement(child) {
    child.applyMainGeo(this.mainBorder);
    child.applyMapScale(this.m_scaleX, this.m_scaleY);
  }

  changeAttributeStatus(is3d, scaleX, scaleY) {
    super.changeAttributeStatus(is3d, scaleX, scaleY);
    if (is3d) {
      this.fillImg = this._getFillImg();
    }
  }

  setPoints(points, options) {
    super.setPoints(points, options);
    if (this.poly.length > 1) {
      this.mainBorder = new Spline(this.poly, true);
      this.traverChildren();
    }
  }
}
