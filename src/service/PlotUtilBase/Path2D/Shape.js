/*
 * @Author: your name
 * @Date: 2021-09-17 16:13:37
 * @LastEditTime: 2021-09-17 16:17:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\Path2D\Shape.js
 */
import { Path } from "./Path.js";
import * as MathUtils from "../Math/MathUtils.js";

class Shape extends Path {
  constructor(points) {
    super(points);

    this.uuid = MathUtils.generateUUID();

    this.type = "Shape";

    this.holes = [];
  }

  getPointsHoles(divisions) {
    const holesPts = [];

    for (let i = 0, l = this.holes.length; i < l; i++) {
      holesPts[i] = this.holes[i].getPoints(divisions);
    }

    return holesPts;
  }

  // get points of shape and holes (keypoints based on segments parameter)

  extractPoints(divisions) {
    return {
      shape: this.getPoints(divisions),
      holes: this.getPointsHoles(divisions),
    };
  }

  copy(source) {
    super.copy(source);

    this.holes = [];

    for (let i = 0, l = source.holes.length; i < l; i++) {
      const hole = source.holes[i];

      this.holes.push(hole.clone());
    }

    return this;
  }

  toJSON() {
    const data = super.toJSON();

    data.uuid = this.uuid;
    data.holes = [];

    for (let i = 0, l = this.holes.length; i < l; i++) {
      const hole = this.holes[i];
      data.holes.push(hole.toJSON());
    }

    return data;
  }

  fromJSON(json) {
    super.fromJSON(json);

    this.uuid = json.uuid;
    this.holes = [];

    for (let i = 0, l = json.holes.length; i < l; i++) {
      const hole = json.holes[i];
      this.holes.push(new Path().fromJSON(hole));
    }

    return this;
  }
}

export { Shape };
