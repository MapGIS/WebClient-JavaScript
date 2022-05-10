/*
 * @Description:坐标转换类（标绘）
 * @Author: zk
 * @Date: 2022-04-26 09:05:34
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-04-26 14:49:40
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
  const n=this.m_mapboxMap.getZoom()
  return  256* Math.pow(2,n);
};