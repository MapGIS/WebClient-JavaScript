/*
 * @Author: your name
 * @Date: 2021-09-07 23:48:33
 * @LastEditTime: 2021-09-17 16:10:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\curves\LineCurve.js
 */
import { Vector2 } from "../Math/Vector2.js";
import { Curve } from "./Curve.js";

class LineCurve extends Curve {
  constructor(v1 = new Vector2(), v2 = new Vector2()) {
    super();

    this.type = "LineCurve";

    this.v1 = v1;
    this.v2 = v2;
  }

  getPoint(t, optionalTarget = new Vector2()) {
    const point = optionalTarget;

    if (t === 1) {
      point.copy(this.v2);
    } else {
      point.copy(this.v2).sub(this.v1);
      point.multiplyScalar(t).add(this.v1);
    }

    return point;
  }

  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(u, optionalTarget) {
    return this.getPoint(u, optionalTarget);
  }

  getTangent(t, optionalTarget) {
    const tangent = optionalTarget || new Vector2();

    tangent.copy(this.v2).sub(this.v1).normalize();

    return tangent;
  }

  copy(source) {
    super.copy(source);

    this.v1.copy(source.v1);
    this.v2.copy(source.v2);

    return this;
  }

  toJSON() {
    const data = super.toJSON();

    data.v1 = this.v1.toArray();
    data.v2 = this.v2.toArray();

    return data;
  }

  fromJSON(json) {
    super.fromJSON(json);

    this.v1.fromArray(json.v1);
    this.v2.fromArray(json.v2);

    return this;
  }
}

LineCurve.prototype.isLineCurve = true;

export { LineCurve };
