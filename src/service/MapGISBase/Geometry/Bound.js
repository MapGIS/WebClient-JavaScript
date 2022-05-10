import { defaultValue, defined } from "../Check";
import { Point } from './Point';

/**
 * 矩形范围类
 * @property left    左边界
 * @property bottom  下边界
 * @property right   右边界
 * @property top     上边界
 */
export class Bounds {
  left = 0;

  bottom = 0;

  right = 0;

  top = 0;

  /**
   *
   * @param {Number} [left=Number.POSITIVE_INFINITY]     左边界
   * @param {Number} [bottom=Number.POSITIVE_INFINITY]   下边界
   * @param {Number} [right=Number.NEGATIVE_INFINITY]    右边界
   * @param {Number} [top=Number.NEGATIVE_INFINITY]      上边界
   */
  constructor(left, bottom, right, top) {
    this.left = defaultValue(left, Number.POSITIVE_INFINITY);
    this.bottom = defaultValue(bottom, Number.POSITIVE_INFINITY);
    this.right = defaultValue(right, Number.NEGATIVE_INFINITY);
    this.top = defaultValue(top, Number.NEGATIVE_INFINITY);
  }

  /**
   * 克隆当前矩形范围对象
   * @returns {Bounds}
   */
  clone() {
    return new Bounds(this.left, this.bottom, this.right, this.top);
  }

  addPnt(x, y) {
    if (defined(x) && x!==Infinity && x!=-Infinity ) {
      this.left = Math.min(x, this.left);
      this.right = Math.max(x, this.right);
    }

    if (defined(y) &&  y!==Infinity && y!=-Infinity) {
      this.bottom = Math.min(y, this.bottom);
      this.top = Math.max(y, this.top);
    }
  }

  equals(bounds) {
    let equals = false;
    if (defined(bounds)) {
      equals =
        this.left === bounds.left &&
        this.right === bounds.right &&
        this.top === bounds.top &&
        this.bottom === bounds.bottom;
    }
    return equals;
  }

  toString() {
    return [this.left, this.bottom, this.right, this.top].join(",");
  }

  get width() {
    return this.right - this.left;
  }

  get height() {
    return this.top - this.bottom;
  }

  get x() {
    return this.left;
  }

  get y() {
    return this.bottom;
  }

  /**
   * 获取矩形范围中心
   * @function
   *
   * @returns {Point}
   */
  getCenter() {
    const x = (this.right + this.left) / 2;
    const y = (this.top + this.bottom) / 2;
    return new Point(x, y);
  }

  /**
   * 合并当前矩形范围和矩形范围boundingBox
   *
   * @function
   *
   * @param {Bounds} boundingBox
   * @returns {Bounds} this对象
   */
  addBounds(boundingBox) {
    if (!boundingBox) {
      return this;
    }

    const { left, right, bottom, top } = boundingBox;

    this.addPnt(left, bottom);
    this.addPnt(right, top);

    return this;
  }

  /**
   * 平移当前矩形范围
   * @function
   *
   * @param {Number} offsetX x方向平移距离
   * @param {Number} offsetY y方向平移距离
   * @returns {Bounds} this对象
   */
  offset(offsetX, offsetY) {
    if (typeof offsetX === "number") {
      this.left += offsetX;
      this.right += offsetX;
    }
    if (typeof offsetY === "number") {
      this.top += offsetY;
      this.bottom += offsetY;
    }

    return this;
  }

  applyMatrix3(matrix3){
    const p1=new Point(this.left,this.bottom)
    const p2=new Point(this.left,this.top)
    const p3=new Point(this.right,this.bottom)
    const p4=new Point(this.right,this.top)
    const _bounds= new Bounds()
    const pnts= [p1,p2,p3,p4]
    pnts.forEach(s => {
        s.applyMatrix3(matrix3)
        _bounds.addPnt(s.x,s.y)
      });
    this.left=_bounds.left
    this.bottom=_bounds.bottom
    this.top=_bounds.top
    this.right=_bounds.right
  }
  /**
   * @description: 扩大范围
   * @param {*} x
   * @param {*} y
   * @return {*}
   */
  extendBoundsArea(x,y){
    if (typeof x === "number") {
      this.left -= x;
      this.right += x;
    }
    if (typeof y === "number") {
      this.top += y;
      this.bottom -= y;
    }
  }

  destroy() {
    this.left = null;
    this.right = null;
    this.top = null;
    this.bottom = null;
  }

  static fromString(str) {
    const bounds = str.split(",");
    return Bounds.fromArray(bounds);
  }

  static fromArray(bbox) {
    return new Bounds(bbox[0], bbox[1], bbox[2], bbox[3]);
  }
}
