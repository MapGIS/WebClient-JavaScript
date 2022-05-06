import { defaultValue } from "../Check";
import { StringUtil } from "../Util/StringUtil";
import { MathUtil } from "../Util/MathUtil";
/**
 * Point类
 * @property x x坐标
 * @property y y坐标
 */
export class Point {
  /**
   *
   * @param {Number} [x=0] x坐标
   * @param {Number} [y=0] y坐标
   */
  constructor(x, y) {
    this.x = defaultValue(x,0);
    this.y = defaultValue(y,0);
  }

  static parse(strPnt, defaultValue = 0) {
    const [x = defaultValue, y = defaultValue] = StringUtil.toNumbers(strPnt);

    return new Point(x, y);
  }

  /**
   * 克隆当前点对象
   * @function
   *
   * @returns {Point}
   */
  clone() {
    return new Point(this.x, this.y);
  }

  /**
   * 计算当前点对象和点pnt之间距离
   * @param {Point} pnt
   * @returns {Number} 两点之间距离
   */
  distanceTo(pnt) {
    const x0 = pnt.x;
    const y0 = pnt.y;

    return Math.sqrt(
      1 * (this.x - x0) * (this.x - x0) + 1 * (this.y - y0) * (this.y - y0)
    );
  }

  /**
   * 判断当前点对象与点pnt是否重合
   * @function
   *
   * @param {Point} pnt 点对象
   * @param {Number} tolerance 容差
   * @returns {Boolean} 两点重合返回true,否则返回false
   */
  isSamePnt(pnt, tolerance) {
    return (
      MathUtil.EqualFuzzy(this.x, pnt.x, tolerance) &&
      MathUtil.EqualFuzzy(this.y, pnt.y, tolerance)
    );
  }

  add(offsetx, offsety) {
    this.x += offsetx;
    this.y += offsety;
    return this;
  }

  sub(x, y) {
    this.x-=x
    this.y-=y
    return this
  }

  /**
   * 计算当前点对象与点point形成线段与x轴夹角
   * @function
   *
   * @param {Point} point 点对象
   * @returns {Number} 角度
   */
  angleTo(point) {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }

  /**
   * 对当前点对象应用matrix3矩阵
   * @function
   *
   * @param {Matrix3} m matrix3对象
   * @returns {Point} this对象，方便连续调用
   */
  applyMatrix3(m) {
    const x = this.x,
      y = this.y,
      z = 1;
    const e = m.elements;

    this.x = e[0] * x + e[3] * y + e[6] * z;
    this.y = e[1] * x + e[4] * y + e[7] * z;

    return this;
  }

  /**
   * @description: 绕某点旋转
   * @param {*} center
   * @param {*} angle
   * @return {*}
   */
  applyPointRotate(center, angle) {
    const dx = this.x - center.x
    const dy = this.y - center.y
    this.x =
      dx * Math.cos((angle * Math.PI) / 180) -
      dy * Math.sin((angle * Math.PI) / 180) +
      center.x
    this.y =
      dy * Math.cos((angle * Math.PI) / 180) +
      dx * Math.sin((angle * Math.PI) / 180) +
      center.y
  }

  /**
   * @description: 让某点缩放
   * @param {*} center
   * @param {*} scaleX
   * @param {*} scaleY
   * @return {*}
   */
  applyPointScale(center, scaleX, scaleY) {
    let dx = this.x - center.x
    let dy = this.y - center.y
    this.x = center.x + dx *scaleX
    this.y = center.y + dy *scaleY
  }

static newAdd(pnt,x,y){
    return new Point(pnt.x+x,pnt.y+y)
  }

  static newSub(pnt,x,y){
    return new Point(pnt.x-x,pnt.y-y)
  }
}
