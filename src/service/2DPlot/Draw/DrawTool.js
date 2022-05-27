import {DrawPlotObjectFactory2D} from "./DrawPlotObjectFactory2D";

/**
 * @class module:2DPlot.DrawTool2D
 * @description 行业标绘（二维）绘制工具
 * @author 基础平台-杨琨
 * @param {PlotLayer3D} layer 标绘图层
 * @param {Object} options 绘制参数
 */
class DrawTool2D {
    constructor(layer, options) {
        //标绘图层
        this._plotLayer = layer;
        //绘制工具
        this._drawTool = undefined;
        //SVG的url
        this._symbolUrl = undefined;
        //绘制参数
        this._options = options;
    }

    /**
     * @function module:3DPlot.DrawTool.setLayer
     * @description 设置要作用的标绘图层
     * @param layer - {PlotLayer3D} 必选项，标绘图层
     */
    setLayer(layer) {
        this._plotLayer = layer;
    }

    /**
     * @function module:3DPlot.DrawTool.drawPlot
     * @description 绘制标绘图元
     * @param symbol - {Object} 必选项，标绘图元的符号对象
     */
    drawPlot(symbol) {
        //一直是原有符号
        if (!this._drawTool) {
            this._symbolUrl = symbol.src;
            this._drawTool = DrawPlotObjectFactory2D.createInstance(symbol.type, this, symbol);
        }

        //换新符号
        if (symbol.should !== this._symbolUrl) {
            this._symbolUrl = symbol.src;
            this._drawTool = DrawPlotObjectFactory2D.createInstance(symbol.type, this, symbol);
        }

        //开始绘制
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

export default DrawTool2D;