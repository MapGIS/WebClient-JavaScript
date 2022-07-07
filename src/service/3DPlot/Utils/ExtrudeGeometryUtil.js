import { ArrayBufferVector3 } from "../../PlotUtilBase/BufferArray";
import { defined, defaultValue } from "../../PlotUtilBase/Check";
import LogTool from "../../PlotUtilBase/Log/LogTool";
import { Vector3 } from "../../PlotUtilBase/Math/Vector3";
import { ShapeUtils } from "../../PlotUtilBase/Path2D/ShapeUtils";
import ArrayUtil from "../../PlotUtilBase/Util/ArrayUtil";

let _vec3$ = new Vector3();
let _binormal$ = new Vector3();
let _normal$ = new Vector3();
let _position2$ = new Vector3();
class ExtrudeGeometryUtil {
  static _concatHolesVertices(shape, holes, res) {
    ArrayUtil.pushArr(res, shape);
    for (let i = 0, len = holes.length; i < len; i += 1) {
      ArrayUtil.pushArr(res, holes[i]);
    }

    return res;
  }

  static _buildBottomFaces(
    faces,
    vertices,
    shapeVLen,
    vertexArrayBuffer,
    indexArrayBuffer,
    vertexOffset
  ) {
    // 添加顶点信息
    for (let i = 0; i < shapeVLen; i += 1) {
      vertexArrayBuffer.pushVector3(vertices.getVector3(i, _vec3$));
    }

    // 构建三角形索引
    const fLen = faces.length;
    for (let f = 0; f < fLen; f += 1) {
      const face = faces[f];
      indexArrayBuffer.push(face[2] + vertexOffset);
      indexArrayBuffer.push(face[1] + vertexOffset);
      indexArrayBuffer.push(face[0] + vertexOffset);
    }
  }

  static _buildTopFaces(
    faces,
    vertices,
    shapeVLen,
    steps,
    vertexArrayBuffer,
    indexArrayBuffer,
    vertexOffset
  ) {
    // 添加定点信息
    for (
      let i = shapeVLen * steps, end = shapeVLen * (steps + 1);
      i < end;
      i += 1
    ) {
      vertexArrayBuffer.pushVector3(vertices.getVector3(i, _vec3$));
    }

    // 构建三角形索引
    const fLen = faces.length;
    for (let i = 0; i < fLen; i += 1) {
      const face = faces[i];
      indexArrayBuffer.push(face[0] + shapeVLen + vertexOffset);
      indexArrayBuffer.push(face[1] + shapeVLen + vertexOffset);
      indexArrayBuffer.push(face[2] + shapeVLen + vertexOffset);
    }
  }

  static _buildSideWalls(
    contour,
    vertices,
    shapeVLen,
    offset,
    steps,
    vertexArrayBuffer,
    indexArrayBuffer
  ) {
    const contourLen = contour.length;
    let i = contourLen;
    while (--i >= 0) {
      const j = i;
      let k = i - 1;
      if (k < 0) k = contour.length - 1;

      for (let s = 0; s < steps; s += 1) {
        const slen1 = shapeVLen * s;
        const slen2 = shapeVLen * (s + 1);

        const a = offset + j + slen1;
        const b = offset + k + slen1;
        const c = offset + k + slen2;
        const d = offset + j + slen2;

        // 添加顶点
        let start = vertexArrayBuffer.count;
        vertexArrayBuffer.pushVector3(vertices.getVector3(a, _vec3$));
        vertexArrayBuffer.pushVector3(vertices.getVector3(b, _vec3$));
        vertexArrayBuffer.pushVector3(vertices.getVector3(c, _vec3$));
        vertexArrayBuffer.pushVector3(vertices.getVector3(d, _vec3$));

        // 构建三角形顶点索引
        indexArrayBuffer.push(start);
        indexArrayBuffer.push(start + 1);
        indexArrayBuffer.push(start + 3);

        indexArrayBuffer.push(start + 1);
        indexArrayBuffer.push(start + 2);
        indexArrayBuffer.push(start + 3);
      }
    }
  }

  static _addShapeByDepth(
    extrudeShape,
    curveSegments,
    depth,
    steps,
    vertexArrayBuffer,
    indexArrayBuffer
  ) {
    const shapePoints = extrudeShape.extractPoints(curveSegments);
    const shape = shapePoints.shape;
    const holes = shapePoints.holes;
    const faces = ShapeUtils.triangulateShape(shape, holes);
    const vertexOffset = vertexArrayBuffer.count;
    const verticesTemp = new ArrayBufferVector3();

    const shapeVertices = [];
    ExtrudeGeometryUtil._concatHolesVertices(shape, holes, shapeVertices);
    const shapeVLen = shapeVertices.length;

    // 1.将shape提取的顶点沿z方向拉伸，生成拉伸体的顶点
    for (let i = 0; i <= steps; i += 1) {
      const z = (depth * i) / steps;
      for (let j = 0; j < shapeVLen; j += 1) {
        verticesTemp.push(shapeVertices[j].x, shapeVertices[j].y, z);
      }
    }

    // 2.构建拉伸体底部三角形
    ExtrudeGeometryUtil._buildBottomFaces(
      faces,
      verticesTemp,
      shapeVLen,
      vertexArrayBuffer,
      indexArrayBuffer,
      vertexOffset
    );

    // 3.构建拉伸体顶部三角形
    ExtrudeGeometryUtil._buildTopFaces(
      faces,
      verticesTemp,
      shapeVLen,
      steps,
      vertexArrayBuffer,
      indexArrayBuffer,
      vertexOffset
    );

    // 4.构建拉伸体侧边三角形
    let offset = 0;
    ExtrudeGeometryUtil._buildSideWalls(
      shape,
      verticesTemp,
      shapeVLen,
      offset,
      steps,
      vertexArrayBuffer,
      indexArrayBuffer
    );

    offset += shape.length;

    for (let i = 0; i < holes.length; i += 1) {
      ExtrudeGeometryUtil._buildSideWalls(
        holes[i],
        verticesTemp,
        shapeVLen,
        offset,
        steps,
        vertexArrayBuffer,
        indexArrayBuffer
      );
      offset += holes[i].length;
    }
  }

  /**
   * 根据depth创建拉伸体
   * @param {*} extrudeShapes 要拉伸的平面几何数组
   * @param {*} curveSegments 曲线段数(Shape类调用extractPoints函数使用)
   * @param {*} depth 拉伸深度
   * @param {*} steps 拉伸步长
   * @returns
   */
  static createExtrudeGeometryByDepth(
    extrudeShapes,
    curveSegments,
    depth,
    steps
  ) {
    if (!defined(extrudeShapes)) {
      LogTool.error("传入参数extrudeShapes未定义!");
      return undefined;
    }

    curveSegments = defaultValue(curveSegments, 5);
    depth = defaultValue(depth, 10);
    steps = defaultValue(steps, 1);

    const vertices = new ArrayBufferVector3();
    const indices = new ArrayBufferVector3();
    for (let i = 0; i < extrudeShapes.length; i += 1) {
      ExtrudeGeometryUtil._addShapeByDepth(
        extrudeShapes[i],
        curveSegments,
        depth,
        steps,
        vertices,
        indices
      );
    }

    if (vertices.count < 3 || indices.count < 1) {
      LogTool.error("根据depth构建拉伸体失败");
      return undefined;
    }

    return {
      vertexArrayBuffer: vertices,
      indexArrayBuffer: indices,
    };
  }

  static _generateVerticesByPath(
    shapeVertices,
    extrudePnts,
    splineTube,
    steps,
    res
  ) {
    const vLen = shapeVertices.length;
    for (let s = 0; s <= steps; s += 1) {
      for (let i = 0; i < vLen; i += 1) {
        const vert = shapeVertices[i];

        _normal$.copy(splineTube.normals[s]).multiplyScalar(vert.x);
        _binormal$.copy(splineTube.binormals[s]).multiplyScalar(vert.y);

        _position2$.copy(extrudePnts[s]).add(_normal$).add(_binormal$);

        res.push(_position2$.x);
        res.push(_position2$.y);
        res.push(_position2$.z);
      }
    }
  }

  static _addShapeByPath(
    extrudeShape,
    curveSegments,
    extrudePath,
    steps,
    vertexArrayBuffer,
    indexArrayBuffer
  ) {
    const shapePoints = extrudeShape.extractPoints(curveSegments);
    const shape = shapePoints.shape;
    const holes = shapePoints.holes;
    const faces = ShapeUtils.triangulateShape(shape, holes);
    const vertexOffset = vertexArrayBuffer.count;
    const verticesTemp = new ArrayBufferVector3();

    const shapeVertices = [];
    ExtrudeGeometryUtil._concatHolesVertices(shape, holes, shapeVertices);
    const shapeVLen = shapeVertices.length;

    // 1.将shape提取的顶点沿extrudePath拉伸，生成拉伸体的顶点
    const extrudePnts = extrudePath.getSpacedPoints(steps);
    const splineTube = extrudePath.computeFrenetFrames(steps, false);
    ExtrudeGeometryUtil._generateVerticesByPath(
      shapeVertices,
      extrudePnts,
      splineTube,
      steps,
      verticesTemp
    );

    // 2.构建拉伸体底部三角形
    ExtrudeGeometryUtil._buildBottomFaces(
      faces,
      verticesTemp,
      shapeVLen,
      vertexArrayBuffer,
      indexArrayBuffer,
      vertexOffset
    );

    // 3.构建拉伸体顶部三角形
    ExtrudeGeometryUtil._buildTopFaces(
      faces,
      verticesTemp,
      shapeVLen,
      steps,
      vertexArrayBuffer,
      indexArrayBuffer,
      vertexOffset
    );

    // 4.构建拉伸体侧边三角形
    let offset = 0;
    ExtrudeGeometryUtil._buildSideWalls(
      shape,
      verticesTemp,
      shapeVLen,
      offset,
      steps,
      vertexArrayBuffer,
      indexArrayBuffer
    );

    offset += shape.length;

    for (let i = 0; i < holes.length; i += 1) {
      ExtrudeGeometryUtil._buildSideWalls(
        holes[i],
        verticesTemp,
        shapeVLen,
        offset,
        steps,
        vertexArrayBuffer,
        indexArrayBuffer
      );
      offset += holes[i].length;
    }
  }

  static createExtrudeGeometryByPath(
    extrudeShapes,
    curveSegments,
    extrudePath,
    steps
  ) {
    if (!defined(extrudeShapes)) {
      LogTool.error("传入参数extrudeShapes未定义!");
      return undefined;
    }

    if (!defined(extrudePath)) {
      LogTool.error("传入参数extrudePath未定义!");
      return undefined;
    }

    curveSegments = defaultValue(curveSegments, 5);

    if (!defined(steps) || steps < 1) {
      LogTool.error("传入参数steps非法!");
      return undefined;
    }

    const vertices = new ArrayBufferVector3();
    const indices = new ArrayBufferVector3();
    for (let i = 0; i < extrudeShapes.length; i += 1) {
      ExtrudeGeometryUtil._addShapeByPath(
        extrudeShapes[i],
        curveSegments,
        extrudePath,
        steps,
        vertices,
        indices
      );
    }

    if (vertices.count < 3 || indices.count < 1) {
      LogTool.error("根据extrudePath构建拉伸体失败");
      return undefined;
    }

    return {
      vertexArrayBuffer: vertices,
      indexArrayBuffer: indices,
    };
  }
}

export { ExtrudeGeometryUtil };
