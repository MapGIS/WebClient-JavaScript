import {DrawPlotObjectFactory3D} from "../../3DPlot/Draw";
import {PlotLayer3D} from "../../3DPlot";
import {PlotCanvas} from "../../2DPlot";
import {DrawPlotObjectFactory2D} from "../../2DPlot/Draw/DrawPlotObjectFactory2D";

/**
 * @class module:3DPlot.DrawTool
 * @description 行业标绘绘制工具
 * @author 基础平台-杨琨
 * @param {PlotLayer3D} layer 标绘图层
 * @param {Object} options 绘制参数
 */
class DrawTool {
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
     * @public
     *
     * @param layer - {PlotLayer3D} 必选项，标绘图层
     */
    setLayer(layer) {
        this._plotLayer = layer;
    }

    /**
     * @description 绘制标绘图元工具
     * @public
     *
     * @param symbol - {Object} 必选项，标绘图元的符号对象
     */
    drawPlot(symbol) {
        if(this._plotLayer instanceof PlotLayer3D){
            this._drawPlot3D(symbol);
        }else if(this._plotLayer instanceof PlotCanvas){
            this._drawPlot2D(symbol);
        }
    }

    /**
     * @description 绘制标绘图元（三维）
     * @private
     *
     * @param symbol - {Object} 必选项，标绘图元的符号对象
     */
    _drawPlot3D(symbol) {
        //一直是原有符号
        if (!this._drawTool) {
            this._symbolUrl = symbol.src;
            this._drawTool = DrawPlotObjectFactory3D.createInstance(
                symbol.type,
                this._plotLayer._viewer,
                symbol,
                this._plotLayer,
                this._options
            );
        }

        //换新符号
        if (symbol.should !== this._symbolUrl) {
            this._symbolUrl = symbol.src;
            this._drawTool = DrawPlotObjectFactory3D.createInstance(
                symbol.type,
                this._plotLayer._viewer,
                symbol,
                this._plotLayer,
                this._options
            );
        }

        //开始绘制
        this._drawTool.enable();
    }

    /**
     * @description 绘制标绘图元（二维）
     * @private
     *
     * @param symbol - {Object} 必选项，标绘图元的符号对象
     */
    _drawPlot2D(symbol){
        if (!this._drawTool) {
            this._drawTool = DrawPlotObjectFactory2D.createInstance(symbol.type, this._plotLayer, symbol, this._options);
        }

        //开始绘制
        this._drawTool.enable();
    }

    /**
     * @function module:3DPlot.DrawTool.stopDraw
     * @public
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