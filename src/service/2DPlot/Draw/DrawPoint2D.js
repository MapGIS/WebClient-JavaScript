/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-17 13:54:10
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-10 16:57:02
 */
import  DrawObject  from "../../PlotBase/Draw/DrawObject";
import  Point  from "../../PlotUtilBase/Geometry/Point";
import  {PlotObjectFactory}  from "../Shapes/PlotObjectFactory";

export default class DrawPoint2D extends DrawObject {
  constructor(fabricCanvas, symbol) {
    super();
    this.m_fabricCanvas = fabricCanvas;
    this.m_symbol = symbol;
    this.m_coordSys = this.m_fabricCanvas.getCoordSys();
    this.onMouseUp = this.innerOnMouseUp.bind(this);
  }

  addHooks() {
    super.addHooks();
    this.m_fabricCanvas.on("mouse:up", this.onMouseUp);
    this.m_fabricCanvas.interactive = false;
  }

  removeHooks() {
    this.m_fabricCanvas.interactive = true;
    this.m_fabricCanvas.off("mouse:up", this.onMouseUp);
    super.removeHooks();
  }

  innerOnMouseUp(event) {
    const pnt = this.m_coordSys.pointToData([event.pointer.x,event.pointer.y]);
    const object = PlotObjectFactory.createInstance(this.m_symbol.type, {
      element: this.m_symbol.getElement(),
      canvas: this.m_fabricCanvas,
    });

    object.setPnts([new Point(pnt[0],pnt[1])]);

    this.m_fabricCanvas.add(object);
    this.m_fabricCanvas.requestRenderAll();
    
    this.disable();

    this.fireFinishEvent({ plotObj2D: object });
  }
}
