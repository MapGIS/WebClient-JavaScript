/*
 * @Description:
 * @Author: zk
 * @Date: 2021-12-03 13:45:17
 * @LastEditors: zk
 * @LastEditTime: 2022-05-16 20:56:03
 */
import DrawObject from '../../PlotBase/Draw/DrawObject';
import Point from '../../PlotUtilBase/Geometry/Point';
import {PlotObjectFactory} from '../Shapes/PlotObjectFactory';
import {addExtendLayersPlot} from "../../3DPlot/Utils/PlotUtil";

const _ = require('lodash');
export default class DrawPolyline2D extends DrawObject {
    constructor(plotLayer, symbol, options) {
        super();
        this._plotLayer = plotLayer;
        this.m_symbol = symbol;
        this.m_coordSys = this._plotLayer.getCoordSys();
        this.m_object = null;
        this.m_coords = [[0, 0]];
        this.onMouseUp = this.innerOnMouseUp.bind(this);
        this.onMouseMove = _.throttle(this.innerOnMouseMove.bind(this), 30);
        //绘制完成回调函数
        const {addedPlot} = options;
        this._addedPlot = addedPlot;
    }

    addHooks() {
        super.addHooks();
        this._plotLayer.on('mouse:move', this.onMouseMove);
        this._plotLayer.on('mouse:up', this.onMouseUp);
        this._plotLayer.interactive = false;
    }

    removeHooks() {
        this.m_object = null;
        this._plotLayer.interactive = true;
        this._plotLayer.off('mouse:move', this.onMouseMove);
        this._plotLayer.off('mouse:up', this.onMouseUp);
        this._plotLayer._isDrawing = false;
        super.removeHooks();
    }

    innerOnMouseMove(event) {
        const pnt = this.m_coordSys.pointToData([event.pointer.x, event.pointer.y]);
        this.m_coords[this.m_coords.length - 1] = new Point(pnt[0], pnt[1]);
        if (this.m_coords.length >= 2 && this.m_object) {
            this.m_object.setPnts(this.m_coords);
            this._plotLayer.requestRenderAll();
        }
    }

    innerOnMouseUp(event) {
        if (!this.m_startDrawing) this.m_startDrawing = true;
        let that = this;

        const pnt = this.m_coordSys.pointToData([event.pointer.x, event.pointer.y]);
        const lastPnt = this.m_coords.length > 2 ? this.m_coords[this.m_coords.length - 2] : null;

        if (lastPnt && Math.abs(pnt[0] - lastPnt.x) < 1e-4 && Math.abs(pnt[1] - lastPnt.y) < 1e-4) {
            this.fireFinishEvent({plotObj2D: this.m_object});
            this.m_startDrawing = false;
            if (this._addedPlot) {
                this._addedPlot(this.m_object);
            }
            this.disable();
        } else {
            this.m_coords.push(new Point(pnt[0], pnt[1]));

            if (!this.m_object) {
                this.m_symbol.getElement().then((element) => {
                    const {style} = that.m_symbol;
                    if(style && style.nodeStyles){
                        element.initNodeStyles(style.nodeStyles);
                    }
                    this.m_object = PlotObjectFactory.createInstance(this.m_symbol.type, {
                        element: element,
                        canvas: this._plotLayer
                    });
                    this._plotLayer.addPlot(this.m_object);
                    this._plotLayer._isDrawing = true;
                    addExtendLayersPlot(this._plotLayer._linkTool, this.m_object);
                });
            }
        }

        this._plotLayer.requestRenderAll();
    }
}
