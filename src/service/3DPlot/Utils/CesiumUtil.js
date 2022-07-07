import {Vector3} from "../../PlotUtilBase/Math/Vector3";
import MathUtil from "../../PlotUtilBase/Util/MathUtil";
import {defined, Check} from "../../PlotUtilBase/Check";

/**
 * cesium工具类
 */
class CesiumUtil {
  /**
   * 自定义用户交互处理程序
   * @function
   * @static
   * @param {*} type 事件类型
   * @param {Function} callback 回调函数
   * @param {Cesium.Scene} scene 场景对象
   * @returns {Cesium.ScreenSpaceEventHandler}
   */
  static createEventHandler(type, callback, scene, cesium) {
    cesium =  Cesium || cesium;
    const handler = new cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(callback, type);

    return handler;
  }

  /**
   * 销毁自定义事件处理程序
   * @function
   * @static
   * @param {Cesium.ScreenSpaceEventHandler} handler
   * @returns {null}
   */
  static destroyEventHandler(handler) {
    handler.removeInputAction();
    handler.destroy();
    return null;
  }

  /**
   * 屏幕坐标转世界坐标
   * @function
   * @static
   * @param {Cesium.Viewer} viewer
   * @param {Cesium.Cartesian2} cartesian2  屏幕坐标
   * @param {Cesium.Cartesian3} cartesian3  世界坐标
   * @returns {Cesium.Cartesian3} 世界坐标
   */
  static windowCoordToCartesian3(viewer, cartesian2, cartesian3) {
    if (!defined(viewer)) return null;

    if (!defined(cartesian2)) return null;

    return viewer.scene.globe.pick(
      viewer.camera.getPickRay(cartesian2),
      viewer.scene,
      cartesian3
    );
  }

  /**
   * 世界坐标转经纬度坐标
   * @function
   *
   * @static
   *
   * @param {Cesium.Ellipsoid} ellipsoid 椭球
   * @param {Cesium.Cartesian3} cartesian3 世界坐标
   * @param {Cesium.Cartesian2} result 经纬度坐标
   * @returns {Cesium.Cartesian2} 经纬度坐标
   */
  static cartesian3ToDegrees(ellipsoid, cartesian3, result) {
    const cartographic = Cesium.Cartographic.fromCartesian(
      cartesian3,
      ellipsoid
    );
    if (!Cesium.defined(result)) result = new Cesium.Cartesian2();

    result.x = Cesium.Math.toDegrees(cartographic.longitude);
    result.y = Cesium.Math.toDegrees(cartographic.latitude);

    return result;
  }

  /**
   * web墨卡托投影变化
   * @param {*} lng 经度
   * @param {*} lat  纬度
   * @param {*} x x坐标
   * @param {*} y y坐标
   */
  static WebMercatorProject(lng, lat, x, y, webMercatorProjection, cartographic, cartesian3) {
    cartographic.longitude = MathUtil.toRad(lng);
    cartographic.latitude = MathUtil.toRad(lat);
    cartographic.height = 0;

    webMercatorProjection.project(cartographic, cartesian3);
    x = cartesian3.x;
    y = cartesian3.y;
  }

  /**
   * web墨卡托反投影变换
   * @param {*} x x坐标
   * @param {*} y y坐标
   */
  static WebMercatorUnProject(x, y, res) {
    let gWebMercatorProjection = new Cesium.WebMercatorProjection();
    let gCartographic = new Cesium.Cartographic();
    let gCartesian3 = new Cesium.Cartesian3();
    gCartesian3.x = x;
    gCartesian3.y = y;
    gCartesian3.z = 0;

    gWebMercatorProjection.unproject(gCartesian3, gCartographic);
    if (!defined(res))
      res = new Vector3();

    res.x = MathUtil.toDegrees(gCartographic.longitude);
    res.y = MathUtil.toDegrees(gCartographic.latitude);

    return res;
  }
}

/**
 * CesiumGeom工具类
 */
class CesiumGeomUtil {
  /**
   * 平移
   * @param {Cesium.Geometry} geometry
   * @param {Cesium.Cartesian3} offset
   *
   * @static
   */
  static translate(geometry, offset) {
    Check.defined(geometry);
    Check.defined(offset);
    const pos = geometry.attributes.position.values;
    for (let i = 0; i < pos.length; i += 3) {
      pos[i] += offset.x;
      pos[i + 1] += offset.y;
      pos[i + 2] += offset.z;
    }
  }

  static _rotate(geometry, matrix4) {
    const pos = geometry.attributes.position.values;
    let cartesian3 = new Cesium.Cartesian3();
    for (let i = 0; i < pos.length; i += 3) {
      cartesian3.x = pos[i];
      cartesian3.y = pos[i + 1];
      cartesian3.z = pos[i + 2];
      Cesium.Matrix4.multiplyByPoint(matrix4, cartesian3, cartesian3);
      pos[i] = cartesian3.x;
      pos[i + 1] = cartesian3.y;
      pos[i + 2] = cartesian3.z;
    }
  }

  /**
   * @description: 作用转换矩阵
   * @param {*} geometry
   * @param {*} matrix4
   * @return {*}
   */
  static transform(geometry, matrix4) {
    const pos = geometry.attributes.position.values;
    const cartesian3 = new Cesium.Cartesian3();
    for (let i = 0; i < pos.length; i += 3) {
      cartesian3.x = pos[i];
      cartesian3.y = pos[i + 1];
      cartesian3.z = pos[i + 2];
      Cesium.Matrix4.multiplyByPoint(matrix4, cartesian3, cartesian3);
      pos[i] = cartesian3.x;
      pos[i + 1] = cartesian3.y;
      pos[i + 2] = cartesian3.z;
    }
  }

  /**
   * @description:缩放几何
   * @param {*} geomatry
   * @param {*} x
   * @param {*} y
   * @param {*} z
   * @return {*}
   */
  static scale(geometry, x, y, z) {
    const trs = new Cesium.TranslationRotationScale(
      Cesium.Cartesian3.ZERO,
      Cesium.Quaternion.IDENTITY,
      new Cesium.Cartesian3(x, y, z)
    );
    const matrix4 = Cesium.Matrix4.fromTranslationRotationScale(trs);
    CesiumGeomUtil.transform(geometry, matrix4);
  }

  /**
   * 绕x轴旋转
   * @param {Cesium.Geometry} geometry
   * @param {Number} angle 弧度
   */

  static rotateX(geometry, angle) {
    Check.defined(geometry);
    Check.defined(angle);

    const rotation = new Cesium.Matrix3();
    const matrix4 = new Cesium.Matrix4();
    Cesium.Matrix3.fromRotationX(angle, rotation);
    Cesium.Matrix4.fromRotationTranslation(
      rotation,
      Cesium.Cartesian3.ZERO,
      matrix4
    );

    CesiumGeomUtil._rotate(geometry, matrix4);
  }

  /**
   * 绕y轴旋转
   * @param {Cesium.Geometry} geometry
   * @param {Number} angle 弧度
   */
  static rotateY(geometry, angle) {
    Check.defined(geometry);
    Check.defined(angle);

    const rotation = new Cesium.Matrix3();
    const matrix4 = new Cesium.Matrix4();
    Cesium.Matrix3.fromRotationY(angle, rotation);
    Cesium.Matrix4.fromRotationTranslation(
      rotation,
      Cesium.Cartesian3.ZERO,
      matrix4
    );

    CesiumGeomUtil._rotate(geometry, matrix4);
  }

  /**
   * 绕z轴旋转
   * @function
   *
   * @static
   *
   * @param {Cesium.Geometry} geometry
   * @param {Number} angle 弧度
   */
  static rotateZ(geometry, angle) {
    Check.defined(geometry);
    Check.defined(angle);

    const rotation = new Cesium.Matrix3();
    const matrix4 = new Cesium.Matrix4();
    Cesium.Matrix3.fromRotationZ(angle, rotation);
    Cesium.Matrix4.fromRotationTranslation(
      rotation,
      Cesium.Cartesian3.ZERO,
      matrix4
    );

    CesiumGeomUtil._rotate(geometry, matrix4);
  }

  /**
   * @description: 作用表示围绕轴旋转的四元数。
   * @param {*} geometry
   * @param {*} axis
   * @param {*} translate
   * @param {*} scale
   * @param {*} angle
   * @return {*}
   */
  static rotateAxis(geometry, axis, translate, scale, angle) {
    Check.defined(geometry);
    Check.defined(axis);
    Check.defined(angle);

    const q = new Cesium.Quaternion();
    const matrix4 = new Cesium.Matrix4();
    Cesium.Quaternion.fromAxisAngle(axis, angle, q);

    Cesium.Matrix4.fromTranslationQuaternionRotationScale(
      translate,
      q,
      scale,
      matrix4
    );

    const pos = geometry.attributes.position.values;
    const cartesian3 = new Cesium.Cartesian3();

    for (let i = 0; i < pos.length; i += 3) {
      cartesian3.x = pos[i];

      cartesian3.y = pos[i + 1];
      cartesian3.z = pos[i + 2];

      Cesium.Matrix4.multiplyByPoint(matrix4, cartesian3, cartesian3);

      pos[i] = cartesian3.x;
      pos[i + 1] = cartesian3.y;
      pos[i + 2] = cartesian3.z;
    }
  }

  static degreesWithHeightToWorldCoords(geometry, height = 0) {
    const pos = geometry.attributes.position.values;
    for (let i = 0; i < pos.length; i += 3) {
      const positions = Cesium.Cartesian3.fromDegreesArrayHeights([
        pos[i],
        pos[i + 1],
        pos[i + 2] + height,
      ]);
      pos[i] = positions[0].x;
      pos[i + 1] = positions[0].y;
      pos[i + 2] = positions[0].z;
    }
  }

  static _getAttrs(geometry) {
    const attrNames = [];

    for (let name in geometry.attributes) {
      if (
        geometry.attributes.hasOwnProperty(name) &&
        geometry.attributes[name]
      ) {
        attrNames.push(name);
      }
    }
    return attrNames;
  }

  static _mergeGeometries(geometries) {
    var valueArrs = [];
    var valueTypes = [];
    var valueConstructors = [];
    var valueComponents = [];
    var valueNormalizes = [];
    var valueOffsets = [];
    var indices = [];
    var primitiveType;
    var indexOffst = 0;

    var componentCounts = [];

    const attrNames = [];
    let geometry = geometries[0];
    primitiveType = geometry.primitiveType;
    for (const attrName in geometry.attributes) {
      if (
        geometry.attributes.hasOwnProperty(attrName) &&
        geometry.attributes[attrName]
      ) {
        const attr = geometry.attributes[attrName];
        attrNames.push(attrName);

        valueComponents.push(attr.componentsPerAttribute);
        valueTypes.push(attr.componentDatatype);
        valueConstructors.push(attr.values.constructor);
        valueNormalizes.push(attr.normalize);

        componentCounts.push(0);
        valueOffsets.push(0);
      }
    }
    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i];
      for (let j = 0; j < attrNames.length; j++) {
        const attrName = attrNames[j];
        componentCounts[j] += geometry.attributes[attrName].values.length;
      }
    }

    for (let j = 0; j < attrNames.length; j++) {
      valueArrs.push(new valueConstructors[j](componentCounts[j]));
    }

    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i];
      for (let ai = 0; ai < attrNames.length; ai++) {
        var attrName = attrNames[ai];
        var valueArr = valueArrs[ai];
        var attrValues = geometry.attributes[attrName].values;
        valueArr.set(attrValues, valueOffsets[ai]);
        valueOffsets[ai] += attrValues.length;
      }

      for (let j = 0; j < geometry.indices.length; j++) {
        const index = geometry.indices[j];
        indices.push(index + indexOffst);
      }

      indexOffst += geometry.attributes.position.values.length / 3;
    }

    var attributes = {};
    for (let i = 0; i < attrNames.length; i++) {
      const attrName = attrNames[i];
      attributes[attrName] = {
        values: valueArrs[i],
        componentsPerAttribute: valueComponents[i],
        componentDatatype: valueTypes[i],
        normalize: valueNormalizes[i],
      };
    }

    var vertexCount = valueArrs[0] / valueComponents[0];
    indices = new Uint16Array(indices);

    geometry = new Cesium.Geometry({
      attributes: attributes,
      indices: indices,
      primitiveType: primitiveType,
      boundingSphere: Cesium.BoundingSphere.fromVertices(
        attributes.position.values
      ),
    });

    return geometry;
  }

  /**
   * 合并geometry
   *
   * @function
   *
   * @static
   *
   * @param {Array<Cesium.Geometry>} geometries
   */
  static mergeGeometries(geometries) {
    Check.typeOfArray("geometries", geometries);

    if (geometries.length === 0)
      throw new DeveloperError("传入参数geometries数组个数为0");

    if (geometries.length == 1) {
      return geometries[0];
    }

    const primitiveType = geometries[0].primitiveType;
    const geometryAttrs = CesiumGeomUtil._getAttrs(geometries[0]);

    let attrsChanged = false;
    let primitiveTypeChanged = false;
    for (let i = 1; i < geometries.length; i += 1) {
      const attrs = CesiumGeomUtil._getAttrs(geometries[i]);

      if (primitiveType != geometries[i].primitiveType) {
        primitiveTypeChanged = true;
        break;
      }

      if (attrs.length != geometryAttrs.length) {
        attrsChanged = true;
        break;
      }

      for (let j = 0; j < geometryAttrs.length; j += 1) {
        if (geometryAttrs[j] != attrs[j]) {
          attrsChanged = true;
          break;
        }
      }
    }
    if (primitiveTypeChanged) {
      throw new DeveloperError("待合并的几何体中primitiveType属性不完全一致");
    }
    if (attrsChanged) {
      throw new DeveloperError("待合并的几何体中属性数量和和名称不完全一致");
    }
    return CesiumGeomUtil._mergeGeometries(geometries);
  }

  static createCesiumGeomByExtrudeGeom(extrudeGeom) {
    const attributes = {};
    const attrName = "position";
    attributes[attrName] = new Cesium.GeometryAttribute({
      componentDatatype: Cesium.ComponentDatatype.DOUBLE,
      componentsPerAttribute: 3,
      values: new Float64Array(extrudeGeom.vertexArrayBuffer.array),
    });

    // 构建cesium几何对象
    let cesGeometry = new Cesium.Geometry({
      attributes: attributes,
      indices: new Uint16Array(extrudeGeom.indexArrayBuffer.array),
      primitiveType: Cesium.PrimitiveType.TRIANGLES,
    });

    // 计算法向量
    cesGeometry = Cesium.GeometryPipeline.computeNormal(cesGeometry);

    return cesGeometry;
  }
}

export {CesiumUtil, CesiumGeomUtil}