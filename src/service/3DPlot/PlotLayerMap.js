/**
 * @class module:3DPlot.PlotLayerMap
 * @description 行业标绘图层组
 * @author 基础平台-杨琨
 */
class PlotLayerMap {
  constructor() {
    this._plotLayerMap = [];

    if(!PlotLayerMap.instance){
      PlotLayerMap.instance = this;
    }

    return PlotLayerMap.instance;
  }

  /**
   * @function module: module:3DPlot.addLayer
   * @description 添加点坐标，可以为[x,y]坐标或者ArcGisPoint对象
   * @param point - {ArcGisPoint} 必选项，要查询的多边形序号，可为点坐标数组或者坐标或者ArcGisPoint对象数组。
   */
  addLayer(layer) {
    this._plotLayerMap.push()
  }
  removeLayer() {}
  removeLayerById() {}
}

PlotLayerMap.instance = null;

export default PlotLayerMap