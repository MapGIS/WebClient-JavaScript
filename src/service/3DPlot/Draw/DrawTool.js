import {DrawPlotObjectFactory3D} from "./DrawPlotObjectFactory3D";

/**
 * @class module:3DPlot.DrawTool
 * @description 行业标绘绘制工具
 * @author 基础平台-杨琨
 * @param {PlotLayer3D} layer
 */
class DrawTool {
  constructor(layer) {
    //标绘图层
    this._plotLyaer = layer;
    //绘制工具
    this._drawTool = undefined;
  }

  /**
   * @function module:3DPlot.DrawTool.setLayer
   * @description 设置要作用的标绘图层
   * @param layer - {PlotLayer3D} 必选项，标绘图层
   */
  setLayer(layer) {
    this._plotLyaer = layer;
  }

  /**
   * @function module:3DPlot.DrawTool.drawPlot
   * @description 绘制标绘图元
   * @param symbol - {Object} 必选项，标绘图元的符号对象
   */
  drawPlot(symbol) {
    if (!this._drawTool) {
      this._drawTool = DrawPlotObjectFactory3D.createInstance(
        symbol.type,
        this._plotLyaer._viewer,
        symbol
      );

    }

    this._drawTool.enable();
  }

  /**
   * @function module:3DPlot.DrawTool.stopDraw
   * @description 停止绘制
   */
  stopDraw() {
    if (this._drawTool) {
      this._drawTool.disable();
    }

    this._drawTool = undefined;
  }
}

export default DrawTool;