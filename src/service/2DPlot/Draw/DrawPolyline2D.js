/*
 * @Description:
 * @Author: zk
 * @Date: 2021-12-03 13:45:17
 * @LastEditors: zk
 * @LastEditTime: 2022-05-16 20:56:03
 */
import DrawObject from '../../PlotBase/Draw/DrawObject';
import Point from '../../PlotUtilBase/Geometry/Point';
import { PlotObjectFactory } from '../Shapes/PlotObjectFactory';

const _ = require('lodash');
export default class DrawPolyline2D extends DrawObject {
    constructor(fabricCanvas, symbol) {
        super();
        this.m_fabricCanvas = fabricCanvas;
        this.m_symbol = symbol;
        this.m_coordSys = this.m_fabricCanvas.getCoordSys();
        this.m_object = null;
        this.m_coords = [[0, 0]];
        this.onMouseUp = this.innerOnMouseUp.bind(this);
        this.onMouseMove = _.throttle(this.innerOnMouseMove.bind(this), 30);
    }

    addHooks() {
        super.addHooks();
        this.m_fabricCanvas.on('mouse:move', this.onMouseMove);
        this.m_fabricCanvas.on('mouse:up', this.onMouseUp);
        this.m_fabricCanvas.interactive = false;
    }

    removeHooks() {
        this.m_object = null;
        this.m_fabricCanvas.interactive = true;
        this.m_fabricCanvas.off('mouse:move', this.onMouseMove);
        this.m_fabricCanvas.off('mouse:up', this.onMouseUp);
        super.removeHooks();
    }

    innerOnMouseMove(event) {
        const pnt = this.m_coordSys.pointToData([event.pointer.x, event.pointer.y]);
        this.m_coords[this.m_coords.length - 1] = new Point(pnt[0], pnt[1]);
        if (this.m_coords.length >= 2) {
            this.m_object.setPnts(this.m_coords);
            this.m_fabricCanvas.requestRenderAll();
        }
    }
    innerOnMouseUp(event) {
        if (!this.m_startDrawing) this.m_startDrawing = true;

        const pnt = this.m_coordSys.pointToData([event.pointer.x, event.pointer.y]);
        const lastPnt = this.m_coords.length > 2 ? this.m_coords[this.m_coords.length - 2] : null;

        if (lastPnt && Math.abs(pnt[0] - lastPnt.x) < 1e-4 && Math.abs(pnt[1] - lastPnt.y) < 1e-4) {
            this.fireFinishEvent({ plotObj2D: this.m_object });
            this.m_startDrawing = false;
            this.disable();
        } else {
            this.m_coords.push(new Point(pnt[0], pnt[1]));

            if (!this.m_object) {
                this.m_symbol.getElement().then((element) => {
                    this.m_object = PlotObjectFactory.createInstance(this.m_symbol.type, {
                        element: element,
                        canvas: this.m_fabricCanvas
                    });
                    this.m_fabricCanvas.add(this.m_object);
                });
            }
        }

        this.m_fabricCanvas.requestRenderAll();
    }
}
