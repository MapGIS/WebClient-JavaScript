/* eslint-disable max-classes-per-file */
/*
 * @Author: your name
 * @Date: 2021-09-14 18:57:30
 * @LastEditTime: 2022-03-04 13:45:41
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\element\TSapnElement.js
 */
import { Bounds } from "../../../PlotUtilBase/Geometry/Bound";
import { Point } from "../../../PlotUtilBase/Geometry/Point";
import { Matrix4 } from "../../../PlotUtilBase/Math/Matrix4";
import { StringUtil } from "../../../PlotUtilBase/Util/StringUtil";
import { TextElement } from "./TextElement";
import { FontCache } from "./FontCache";
import { BaseRegularElement } from "./RegularElement/BaseRegularElement";
import { defined } from "../../../PlotUtilBase/Check";
import FontStyleClass from "./PropertyClass/BaseCanvasClass/FontStyleClass";
import FillStyleClass from "./PropertyClass/BaseCanvasClass/FillStyleClass";
import StrokeStyleClass from "./PropertyClass/BaseCanvasClass/StrokeStyleClass";
import PropertyClass from "./PropertyClass/PropertyClass";


export class TSpanElement extends TextElement {
  type = "tspan";
  static styleClassArray = [FillStyleClass,FontStyleClass,StrokeStyleClass];
  constructor(node) {
    super(node);
    this._text = this._getTextFrmNode(node);
    this._fontMetrics = null;
    this._textGeoBounds = null;
    this._baseTranslatePnt = null;
  }
  _createStyleObject() {
    this.styleObject = new PropertyClass(this, TSpanElement.styleClassArray);
  }
  /**
   * @description: 计算textGeometry边界
   * @param {*} textGeometry
   * @return {Bounds}
   */
  static getTextGeometryBounds(textGeometry) {
    const _bound = new Bounds();
    if (!textGeometry) return _bound;

    const position = textGeometry.vertexArrayBuffer;
    if (!defined(position)) return;

    const positionArr = position.array;
    for (let i = 0; i < positionArr.length; i += 3) {
      _bound.addPnt(positionArr[i], positionArr[i + 1]);
    }
    return _bound;
  }

  getText() {
    return this._text;
  }

  setText(text) {
    this._text = text;
  }

  getPos(width) {
    let textAnchorNum = 0;
    const textAnchorProps = this.getStyle("text-anchor");
    if (textAnchorProps.hasValue()) {
      const s = textAnchorProps.getString();
      if (s === "middle") {
        textAnchorNum = width / 2;
      } else if (s === "end") {
        textAnchorNum = width;
      }
    }

    const pnt = new Point(this._x - textAnchorNum, this._y);
    return pnt;
  }

  /**
   * @description: 获取font Geometry
   * @return {*} font Geometry
   */
  getFont() {
    if (this._fontMetrics) return this._fontMetrics;
    const strFontName = "SimHei_Regular";
    const fontCache = new FontCache();
    const font = fontCache.getFont(strFontName);
    this._fontMetrics = font;
    return font;
  }

  getAscent(font, height) {
    const fontBounds = font.data.boundingBox;
    const ascent =
      (font.data.ascender / (fontBounds.yMax - fontBounds.yMin)) * height;
    return ascent;
  }

  getDescender(font, height) {
    const fontBounds = font.data.boundingBox;
    const descent =
      (font.data.descender / (fontBounds.yMax - fontBounds.yMin)) * height;
    return descent;
  }

  /**
   * @description: 计算初始偏移点
   * @param {*} bounds
   * @return {*}
   */
  _baseTranslate(bounds) {
    if (this._baseTranslatePnt) return this._baseTranslatePnt;

    const pos = this.getPos(bounds.width);

    const pnt = new Point(pos.x, pos.y);

    this._baseTranslatePnt = pnt;
    return pnt;
  }

  /**
   * @description: 作用变换
   * @param {*} textGeo
   * @return {*}
   */
  applyTextGeo3D(textGeo) {
    if (!textGeo) return;

    const bounds = TSpanElement.getTextGeometryBounds(textGeo);
    const translatePnt = this._baseTranslate(bounds);
    const t1 = this._getMatrix();
    const matrix4_1 = new Matrix4();
    const matrix4_2 = new Matrix4();
    // 偏移初始svg
    const fontSize = this.getStyle("font-size").getNumber();
    textGeo.vertexArrayBuffer.translate(
      translatePnt.x,
      translatePnt.y - fontSize,
      0
    );

    matrix4_1.setThreeMatrix(t1);
    textGeo.vertexArrayBuffer.applyMatrix4(matrix4_1);

    let parent = this._parent;
    while (parent) {
      if (
        parent instanceof BaseRegularElement &&
        parent._applyElementTransfrom
      ) {
        parent._applyElementTransfrom(this);
      }
      parent = parent._parent;
    }

    // extra transfrom
    const t2 = this._getTransform();
    matrix4_2.setThreeMatrix(t2);
    textGeo.vertexArrayBuffer.applyMatrix4(matrix4_2);

    // 处理文字对象的竖立（特殊逻辑）
    if (this._dimModal.is3DTran()) {
      const _p = this._dimModal.getTranslatePoint();
      const tempY = -this._y;
      const p = new Point(_p.x, tempY);
      p.applyMatrix3(t1);
      p.applyMatrix3(t2);

      this._dimModal.setTranslatePnt(new Point(p.x, p.y));
    }
  }

  getBoundingBox() {
    const bounds = new Bounds();
    const fontSize = this.getStyle("font-size").getNumber();
    const width = this._getMeasureTextWidth();
    const pos = this.getPos(width);
    const matrix = this._getMatrix();
    bounds.addPnt(pos.x, pos.y - fontSize);
    bounds.addPnt(pos.x + width, pos.y);
    bounds.applyMatrix3(matrix);
    return bounds;
  }

  _getMeasureTextWidth() {
    const tempCanvas = document.createElement("canvas");
    const tempCtX = tempCanvas.getContext("2d");
    const { width } = tempCtX.measureText(this.getText());
    return width;
  }

  getBounds() {
    const bounds = this.getBoundingBox();
    const matrix = this._getMatrix();
    const transformMatrix = this._getTransform();
    const tureMatrix = transformMatrix.clone().multiply(matrix);

    bounds.applyMatrix3(tureMatrix);
    return bounds;
  }

  _getTextFrmNode(textNode) {
    const childNodes = Array.from(textNode.parentNode.childNodes);
    const index = childNodes.indexOf(textNode);
    const lastIndex = childNodes.length - 1;
    let text = StringUtil.compressSpaces(textNode.textContent || "");

    if (index === 0) {
      text = StringUtil.trimLeft(text);
    }

    if (index === lastIndex) {
      text = StringUtil.trimRight(text);
    }
    return text;
  }
  _clone(cloneObject) {
    super._clone(cloneObject);
    cloneObject._fontMetrics = this._fontMetrics ? cloneObject.getFont() : null;
    cloneObject._text = this._text;
    cloneObject._textGeoBounds = this._textGeoBounds
      ? this._textGeoBounds.clone()
      : null;
    cloneObject._baseTranslatePnt = this._baseTranslatePnt
      ? new Point(this._baseTranslatePnt.x, this._baseTranslatePnt.y)
      : null;
  }
  getSaveBaseAttributes() {
    const attrNames = super.getSaveBaseAttributes();
    attrNames.baseSVGStyleAttributes = TSpanElement.baseSVGStyleAttributes;
    return attrNames;
  }
}
