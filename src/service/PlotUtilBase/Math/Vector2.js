/**
 * 二维向量类
 * @property x x分量
 * @property y y分量
 */
class Vector2 {
  /**
   *
   * @param {Number} [x=0] x分量
   * @param {Number} [y=0] y分量
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  get width() {
    return this.x;
  }

  set width(value) {
    this.x = value;
  }

  get height() {
    return this.y;
  }

  set height(value) {
    this.y = value;
  }

  /**
   * 设置x分量和y分量
   * @function
   *
   * @param {Number} x x分量
   * @param {Number} y y分量
   * @returns this对象
   */
  set(x, y) {
    this.x = x;
    this.y = y;

    return this;
  }

  setScalar(scalar) {
    this.x = scalar;
    this.y = scalar;

    return this;
  }

  /**
   * 设置x分量
   * @function
   *
   * @param {Number} x x分量
   * @returns this对象
   */
  setX(x) {
    this.x = x;

    return this;
  }

  /**
   * 设置y分量
   * @function
   *
   * @param {Number} y y分量
   * @returns this对象
   */
  setY(y) {
    this.y = y;

    return this;
  }

  setComponent(index, value) {
    switch (index) {
      case 0:
        this.x = value;
        break;
      case 1:
        this.y = value;
        break;
      default:
        throw new Error("index is out of range: " + index);
    }

    return this;
  }

  getComponent(index) {
    switch (index) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + index);
    }
  }

  /**
   * 克隆函数
   * @function
   *
   * @returns {Vector2}
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }

  /**
   * 复制函数
   * @function
   *
   * @param {Vector2} v
   * @returns this对象
   */
  copy(v) {
    this.x = v.x;
    this.y = v.y;

    return this;
  }

  add(v, w) {
    if (w !== undefined) {
      return this.addVectors(v, w);
    }

    this.x += v.x;
    this.y += v.y;

    return this;
  }

  addScalar(s) {
    this.x += s;
    this.y += s;

    return this;
  }

  addVectors(a, b) {
    this.x = a.x + b.x;
    this.y = a.y + b.y;

    return this;
  }

  addScaledVector(v, s) {
    this.x += v.x * s;
    this.y += v.y * s;

    return this;
  }

  sub(v, w) {
    if (w !== undefined) {
      return this.subVectors(v, w);
    }

    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  subScalar(s) {
    this.x -= s;
    this.y -= s;

    return this;
  }

  subVectors(a, b) {
    this.x = a.x - b.x;
    this.y = a.y - b.y;

    return this;
  }

  multiply(v) {
    this.x *= v.x;
    this.y *= v.y;

    return this;
  }

  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
  }

  divide(v) {
    this.x /= v.x;
    this.y /= v.y;

    return this;
  }

  divideScalar(scalar) {
    return this.multiplyScalar(1 / scalar);
  }

  applyMatrix3(m) {
    const x = this.x,
      y = this.y;
    const e = m.elements;

    this.x = e[0] * x + e[3] * y + e[6];
    this.y = e[1] * x + e[4] * y + e[7];

    return this;
  }

  min(v) {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);

    return this;
  }

  max(v) {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);

    return this;
  }

  clamp(min, max) {
    // assumes min < max, componentwise

    this.x = Math.max(min.x, Math.min(max.x, this.x));
    this.y = Math.max(min.y, Math.min(max.y, this.y));

    return this;
  }

  clampScalar(minVal, maxVal) {
    this.x = Math.max(minVal, Math.min(maxVal, this.x));
    this.y = Math.max(minVal, Math.min(maxVal, this.y));

    return this;
  }

  clampLength(min, max) {
    const length = this.length();

    return this.divideScalar(length || 1).multiplyScalar(
      Math.max(min, Math.min(max, length))
    );
  }

  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);

    return this;
  }

  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);

    return this;
  }

  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);

    return this;
  }

  roundToZero() {
    this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);

    return this;
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }

  normalize() {
    return this.divideScalar(this.length() || 1);
  }

  angle() {
    // computes the angle in radians with respect to the positive x-axis

    const angle = Math.atan2(-this.y, -this.x) + Math.PI;

    return angle;
  }

  distanceTo(v) {
    return Math.sqrt(this.distanceToSquared(v));
  }

  distanceToSquared(v) {
    const dx = this.x - v.x,
      dy = this.y - v.y;
    return dx * dx + dy * dy;
  }

  manhattanDistanceTo(v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
  }

  setLength(length) {
    return this.normalize().multiplyScalar(length);
  }

  lerp(v, alpha) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;

    return this;
  }

  lerpVectors(v1, v2, alpha) {
    this.x = v1.x + (v2.x - v1.x) * alpha;
    this.y = v1.y + (v2.y - v1.y) * alpha;

    return this;
  }

  equals(v) {
    return v.x === this.x && v.y === this.y;
  }

  fromArray(array, offset = 0) {
    this.x = array[offset];
    this.y = array[offset + 1];

    return this;
  }

  toArray(array = [], offset = 0) {
    array[offset] = this.x;
    array[offset + 1] = this.y;

    return array;
  }

  fromBufferAttribute(attribute, index, offset) {
    this.x = attribute.getX(index);
    this.y = attribute.getY(index);

    return this;
  }

  rotateAround(center, angle) {
    const c = Math.cos(angle),
      s = Math.sin(angle);

    const x = this.x - center.x;
    const y = this.y - center.y;

    this.x = x * c - y * s + center.x;
    this.y = x * s + y * c + center.y;

    return this;
  }

  random() {
    this.x = Math.random();
    this.y = Math.random();

    return this;
  }
}

Vector2.prototype.isVector2 = true;

export { Vector2 };