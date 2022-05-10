import { Vector3 } from "../Math/Vector3";
import { Matrix4 } from "../Math/Matrix4";
export class PolylineCurve3 {
  constructor(pnts) {
    this._pnts = [];
    if (!pnts) return;

    for (let i = 0; i < pnts.length; i += 1) {
      this._pnts.push(pnts[i].clone());
    }
  }

  getSpacedPoints(divisions = 5) {
    const points = [];
    const len = this._pnts.length;
    points.push(this._pnts[0].clone());

    for (let d = 1; d < len - 1; d++) {
      points.push(this._pnts[d].clone());
      points.push(this._pnts[d].clone());
    }

    points.push(this._pnts[len - 1].clone());

    return points;
  }

  computeFrenetFrames(segments, closed) {
    const normal = new Vector3();

    const tangents = [];
    const normals = [];
    const binormals = [];

    const vec = new Vector3();
    const mat = new Matrix4();

    const len = this._pnts.length;
    let pt1 = this._pnts[0];
    let pt2 = this._pnts[1];
    let tangent = new Vector3();
    tangent.copy(pt2).sub(pt1).normalize();
    tangents.push(tangent);

    for (let d = 1; d < len - 1; d++) {
      pt1 = this._pnts[d - 1];
      pt2 = this._pnts[d];
      tangent = new Vector3();
      tangent.copy(pt2).sub(pt1).normalize();
      tangents.push(tangent);

      pt1 = this._pnts[d];
      pt2 = this._pnts[d + 1];
      tangent = new Vector3();
      tangent.copy(pt2).sub(pt1).normalize();
      tangents.push(tangent);
    }

    pt1 = this._pnts[len - 2];
    pt2 = this._pnts[len - 1];
    tangent = new Vector3();
    tangent.copy(pt2).sub(pt1).normalize();
    tangents.push(tangent);

    normals[0] = new Vector3();
    binormals[0] = new Vector3();
    let min = Number.MAX_VALUE;
    const tx = Math.abs(tangents[0].x);
    const ty = Math.abs(tangents[0].y);
    const tz = Math.abs(tangents[0].z);

    if (tx <= min) {
      min = tx;
      normal.set(1, 0, 0);
    }

    if (ty <= min) {
      min = ty;
      normal.set(0, 1, 0);
    }

    if (tz <= min) {
      normal.set(0, 0, 1);
    }

    vec.crossVectors(tangents[0], normal).normalize();

    normals[0].crossVectors(tangents[0], vec);
    binormals[0].crossVectors(tangents[0], normals[0]);

    // compute the slowly-varying normal and binormal vectors for each segment on the curve

    for (let i = 1; i < 2 * len - 2; i++) {
      normals[i] = normals[i - 1].clone();

      binormals[i] = binormals[i - 1].clone();

      vec.crossVectors(tangents[i - 1], tangents[i]);

      binormals[i].crossVectors(tangents[i], normals[i]);
    }

    // if the curve is closed, postprocess the vectors so the first and last normal vectors are the same

    if (closed === true) {
      let theta = Math.acos(
        MathUtils.clamp(normals[0].dot(normals[segments]), -1, 1)
      );
      theta /= segments;

      if (
        tangents[0].dot(vec.crossVectors(normals[0], normals[segments])) > 0
      ) {
        theta = -theta;
      }

      for (let i = 1; i <= segments; i++) {
        // twist a little...
        normals[i].applyMatrix4(mat.makeRotationAxis(tangents[i], theta * i));
        binormals[i].crossVectors(tangents[i], normals[i]);
      }
    }

    return {
      tangents: tangents,
      normals: normals,
      binormals: binormals,
    };
  }
}
