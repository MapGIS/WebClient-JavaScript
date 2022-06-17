import { Matrix4 } from "./Math/Matrix4";
import { Vector2 } from "./Math/Vector2";
import { Vector3 } from "./Math/Vector3";

class ArrayBuffer {
  constructor(itemSize) {
    this._array = [];
    this._itemSize = itemSize;
  }

  get array() {
    return this._array;
  }

  get itemSize() {
    return this._itemSize;
  }

  get count() {
    return this._array.length / this._itemSize;
  }

  push(...args) {
    for (let i = 0, end = args.length; i < end; i += 1) {
      this._array.push(args[i]);
    }

    return this;
  }

  get(index, itemIndex) {
    return this._array[index * this._itemSize + itemIndex];
  }

  set(index, itemIndex, value) {
    this._array[index * this._itemSize + itemIndex] = value;
    return this;
  }
}

let _vec2 = new Vector2();
let _matrix$ = new Matrix4();
class ArrayBufferVector2 extends ArrayBuffer {
  constructor(itemSize = 2) {
    super(itemSize);
  }

  getX(index) {
    return this.get(index, 0);
  }

  getY(index) {
    return this.get(index, 1);
  }

  setX(index, value) {
    return this.set(index, 0, value);
  }

  setY(index, value) {
    return this.set(index, 0, value);
  }

  setXY(index, x, y) {
    index *= this.itemSize;
    this._array[index + 0] = x;
    this._array[index + 1] = y;
    return this;
  }

  pushVector2(vec2) {
    super.push(vec2.x, vec2.y);
    return this;
  }

  getVector2(index, vec2) {
    index *= this.itemSize;
    vec2.x = this._array[index + 0];
    vec2.y = this._array[index + 1];
    return vec2;
  }

  applyMatrix3(matrix) {
    const count = this.count;
    for (let i = 0; i < count; i += 1) {
      _vec2 = this.getVector2(i, _vec2);
      _vec2.applyMatrix3(matrix);
      this.setXY(i, _vec2.x, _vec2.y);
    }
    return this;
  }
}

let _vec3 = new Vector3();
class ArrayBufferVector3 extends ArrayBufferVector2 {
  constructor(itemSize = 3) {
    super(itemSize);
  }

  getZ(index) {
    return this.get(index, 2);
  }

  setZ(index, value) {
    return this.set(index, 2, value);
  }

  setXYZ(index, x, y, z) {
    index *= this.itemSize;
    this._array[index + 0] = x;
    this._array[index + 1] = y;
    this._array[index + 2] = z;
    return this;
  }

  getVector3(index, vec3) {
    index *= this.itemSize;
    vec3.x = this._array[index + 0];
    vec3.y = this._array[index + 1];
    vec3.z = this._array[index + 2];
    return vec3;
  }

  pushVector3(vec3) {
    super.push(vec3.x, vec3.y, vec3.z);
    return this;
  }

  applyMatrix4(matrix) {
    const count = this.count;
    for (let i = 0; i < count; i += 1) {
      _vec3 = this.getVector3(i, _vec3);
      _vec3.applyMatrix4(matrix);
      this.setXYZ(i, _vec3.x, _vec3.y, _vec3.z);
    }
    return this;
  }

	translate( x, y, z ) {

		_matrix$.makeTranslation( x, y, z );

		this.applyMatrix4( _matrix$ );

		return this;
	}
}

export { ArrayBuffer, ArrayBufferVector2, ArrayBufferVector3 };
