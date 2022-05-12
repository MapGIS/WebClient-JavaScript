/**
 * @class module:3DPlot.PlotLayerMap
 * @description 行业标绘图层组
 * @author 基础平台-杨琨
 */
class PlotLayerMap {
  constructor() {
    this._plotLayerMap = [];

    if (!PlotLayerMap.instance) {
      PlotLayerMap.instance = this;
    }

    return PlotLayerMap.instance;
  }

  /**
   * @function module:3DPlot.addLayer
   * @description 添加图层至图层组
   * @param layer - {PlotLayer} 必选项，要添加图层。
   */
  addLayer(layer) {
    this._plotLayerMap.push(layer);
  }

  /**
   * @function module:3DPlot.removeLayer
   * @description 从图层组删除图层
   * @param layer - {PlotLayer} 必选项，要删除的图层。
   */
  removeLayer(layer) {
    if(!layer) return;
    const {id} = layer;

    if(id){
      this.removeLayerById(id);
    }
  }

  /**
   * @function module:3DPlot.removeLayerById
   * @description 根据图层ID从图层组删除图层
   * @param id - {String} 必选项，要删除的图层ID。
   */
  removeLayerById(id) {
    for (let i = 0; i < this._plotLayerMap.length; i++) {
      if (id === this._plotLayerMap[i].id) {
        this._plotLayerMap.splice(i, 1);
        break;
      }
    }
  }
}

PlotLayerMap.instance = null;

export default PlotLayerMap