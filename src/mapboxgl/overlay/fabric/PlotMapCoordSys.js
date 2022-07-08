/*
 * @Description:坐标转换类（标绘）
 * @Author: zk
 * @Date: 2022-04-26 09:05:34
 * @LastEditors: zk
 * @LastEditTime: 2022-05-24 09:49:28
 */

/**
 * mapbox 坐标转换类（标绘）
 * @constructor
 * @param {Object} map mapbox Map对象
 */
export function PlotMapCoordSys(map) {
    this.m_mapboxMap = map;
}

/**
 * 数据坐标转屏幕坐标
 * @function
 * @param {[number,number]} data 数据坐标
 * @returns {[number,number]} 屏幕坐标
 */
PlotMapCoordSys.prototype.dataToPoint = function dataToPoint(data) {
    const px = this.m_mapboxMap.project([data[0], data[1]]);
    return [px.x, px.y];
};

/**
 * 屏幕坐标转数据坐标
 * @function
 * @param {[number,number]} pt 屏幕坐标
 * @returns {[number,number]} 数据坐标
 */
PlotMapCoordSys.prototype.pointToData = function pointToData(pt) {
    const point = this.m_mapboxMap.unproject([pt[0], pt[1]]);
    return [point.lng, point.lat];
};


/**
 * @description: 获取当前视图下的像素块
 * @return {number}
 */
PlotMapCoordSys.prototype.getScale = function getScale() {
  let n=this.m_mapboxMap.getZoom()
  
  return  1024 * Math.pow(2,n+1);
};

/**
 * @description: 获取地图边界
 * @return {Array<Array<number>>} 边界
 */
PlotMapCoordSys.prototype.getBounds= function getBounds(){
   /**
    * toArray方法
    * var llb = new mapboxgl.LngLatBounds([-73.9876, 40.7661], [-73.9397, 40.8002]);
      llb.toArray(); // = [[-73.9876, 40.7661], [-73.9397, 40.8002]]
    */
    const lnglatBounds= this.m_mapboxMap.getBounds().toArray()
    return lnglatBounds
}
