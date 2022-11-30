//import Cesium from '../../../../node_modules/cesium/Source/Cesium';
import echarts from 'echarts';

/**
 * @private
 * @author 基础平台-潘卓然ParnDeedlit
 * @description 请仔细对应echart4.0的代码，目前只升级到了echarts-4.4.0版本
 * @example prepareCustoms 这个函数我后来在echarts的bug清单中发现了问题所在，请不要随便改动
 */

export function MapCoordSys(CesiumMap, api) {
  this._CesiumMap = CesiumMap
  this._CesiumScene = CesiumMap.scene;
  this.dimensions = ['lng', 'lat']
  this._mapOffset = [0, 0]
  this._mapViewRect;

  this._api = api
}

MapCoordSys.prototype.dimensions = ['lng', 'lat']

MapCoordSys.prototype.setMapOffset = function (mapOffset) {
  this._mapOffset = mapOffset
}

MapCoordSys.prototype.getBMap = function () {
  return this._CesiumMap
}


/**
 * 对应的地图引擎坐标换算的地方，如果echarts的源码改变了这部分也要一起变化。这里要注意
 * @param {*} data 
 */
MapCoordSys.prototype.dataToPoint = function (data) {
  var pointSphere = Cesium.Cartesian3.fromDegrees(data[0], data[1]);  
  var position = this._CesiumMap.camera.position;
  var cameraHeight = this._CesiumMap.scene.globe.ellipsoid.cartesianToCartographic(position).height;
  cameraHeight+=this._CesiumMap.scene.globe.ellipsoid.maximumRadius * 1.2;
  var distance = Cesium.Cartesian3.distance(position, pointSphere);
  if(distance>cameraHeight){
    return [-50, -50];
  }
  var mapOffset = this._mapOffset;

  // var cullingVolume = this._CesiumMap.camera.frustum.computeCullingVolume(
  //   this._CesiumMap.camera.positionWC, 
  //   this._CesiumMap.camera.directionWC, 
  //   this._CesiumMap.camera.upWC);
  // var boundingSphere = new Cesium.BoundingSphere(pointSphere, 1);
  // var visibility = cullingVolume.computeVisibility(boundingSphere);
  // if (visibility === Cesium.Intersect.INSIDE) {
    var position = Cesium.Cartesian3.fromDegrees(data[0], data[1]);
    var point = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._CesiumScene, position);
    point = point || { x: 0, y: 0};
    return [point.x - mapOffset[0], point.y - mapOffset[1]];
  //} else {
  //  return [-50, -50];
 // }
}

//这个函数先不处理，后面我有时间会处理的
MapCoordSys.prototype.pointToData = function (pt) {
  var mapOffset = this._mapOffset
  var position = Cesium.Cartesian3.fromDegrees(pt[0] + mapOffset[0], pt[1] + mapOffset[1]);

  var point = Cesium.SceneTransforms.wgs84ToWindowCoordinates(this._CesiumScene, position);

  return [point.x, point.y]
}

MapCoordSys.prototype.getViewRect = function () {
  var api = this._api
  return new echarts.graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight())
}

MapCoordSys.prototype.getRoamTransform = function () {
  return echarts.matrix.create()
}

//https://github.com/apache/incubator-echarts/issues/6953
//https://github.com/apache/incubator-echarts/issues/7789
MapCoordSys.prototype.prepareCustoms = function (data) {
  var zrUtil = echarts.util;

  var rect = this.getViewRect();
  return {
    coordSys: {
      type: 'cesium',
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height
    },
    api: {
      coord: zrUtil.bind(this.dataToPoint, this),
      size: zrUtil.bind(dataToCoordSize, this)
    }
  };

  function dataToCoordSize(dataSize, dataItem) {
    dataItem = dataItem || [0, 0];
    return zrUtil.map([0, 1], function (dimIdx) {
      var val = dataItem[dimIdx];
      var halfSize = dataSize[dimIdx] / 2;
      var p1 = [];
      var p2 = [];
      p1[dimIdx] = val - halfSize;
      p2[dimIdx] = val + halfSize;
      p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
      return Math.abs(this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]);
    }, this);
  }
}

MapCoordSys.dimensions = MapCoordSys.prototype.dimensions

MapCoordSys.create = function (ecModel, api) {
  var coordSys;

  ecModel.eachComponent('cesium', function (MapModel) {
    var viewportRoot = api.getZr().painter.getViewportRoot()
    var CesiumMap = echarts.cesiumMap;
    coordSys = new MapCoordSys(CesiumMap, api)
    coordSys.setMapOffset(MapModel.__mapOffset || [0, 0])
    MapModel.coordinateSystem = coordSys
  })

  ecModel.eachSeries(function (seriesModel) {
    if (seriesModel.get('coordinateSystem') === 'cesium') {
      seriesModel.coordinateSystem = coordSys
    }
  })
}

export default MapCoordSys;