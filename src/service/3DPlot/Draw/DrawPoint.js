import DrawObject from "../../../service/PlotBase/Draw/DrawObject";
import {PrimitiveFactory} from "../Primitive/PrimitiveFactory";
import {CesiumUtil} from "../Utils/CesiumUtil";

/**
 * @class module:3DPlot.DrawPoint
 * @description 绘制点工具
 * @author 基础平台-杨琨
 *
 * @param {Object} viewer 三维视图容器对象
 * @param {Object} symbol 标绘符号对象
 * @param {Object} plotLayer 标绘图层
 * @param options - {Object} 额外参数
 * @param {Function} [options.addedPlot] 添加标绘图元完成后的回调函数
 */
export default class DrawPoint extends DrawObject {
    constructor(viewer, symbol, plotLayer, options) {
        super();
        this._viewer = viewer;
        this._symbol = symbol;
        this.m_coords = [];
        this._primitive = null;
        this._plotLayer = plotLayer;
        //绘制完成回调函数
        const {addedPlot} = options;
        this._addedPlot = addedPlot;
    }

    /**
     * @description 添加点击事件
     * @function module:3DPlot.DrawPoint.addHooks
     */
    addHooks() {
        const viewer = this._viewer;
        const symbol = this._symbol;
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        let that = this;
        handler.setInputAction((event) => {
            const worldPos = viewer.scene.globe.pick(
                viewer.camera.getPickRay(event.position),
                viewer.scene
            );

            if (!worldPos) return;

            symbol.getElement().then(function (res) {
                const {classificationType} = that._symbol;
                res.classificationType = classificationType;
                const {style} = that._symbol;
                if(style && style.nodeStyles){
                    res.initNodeStyles(style.nodeStyles);
                }
                that._primitive = PrimitiveFactory.createInstance(symbol.type, {
                    positions: that.m_coords,
                    element: res
                });
                that._primitive.id = res.featureId;
                if(that._addedPlot){
                    that._addedPlot(that._primitive);
                }
                that._plotLayer._isDrawing = true;
                const lnglat = CesiumUtil.cartesian3ToDegrees(
                    viewer.scene.globe.ellipsoid,
                    worldPos
                );
                that.m_coords.push(lnglat);
                that._plotLayer._primitiveCollection.add(that._primitive);

                that._primitive.positions = that.m_coords;
                that.disable();
                that.fireFinishEvent({plotObj3D: that._primitive});
            });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        this._handler = handler;
    }

    /**
     * @description 移除点击事件
     * @function module:3DPlot.DrawPoint.removeHooks
     */
    removeHooks() {
        const handler = this._handler;
        handler.destroy();
        this._handler = null;
        this._isAdded = false;
        this.m_coords = [];
        this._plotLayer._isDrawing = false;
    }
}
