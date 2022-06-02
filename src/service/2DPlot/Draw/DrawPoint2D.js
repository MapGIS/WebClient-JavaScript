/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-17 13:54:10
 * @LastEditors: zk
 * @LastEditTime: 2022-05-16 18:36:49
 */
import  DrawObject  from "../../PlotBase/Draw/DrawObject";
import  Point  from "../../PlotUtilBase/Geometry/Point";
import  {PlotObjectFactory}  from "../Shapes/PlotObjectFactory";
import {addExtendLayersPlot} from "../../3DPlot/Utils/PlotUtil";

export default class DrawPoint2D extends DrawObject {
  constructor(fabricCanvas, symbol, options) {
    super();
    this.m_fabricCanvas = fabricCanvas;
    this.m_symbol = symbol;
    this.m_coordSys = this.m_fabricCanvas.getCoordSys();
    this.onMouseUp = this.innerOnMouseUp.bind(this);
    //绘制完成回调函数
    const {addedPlot} = options;
    this._addedPlot = addedPlot;
  }

  addHooks() {
    super.addHooks();
    this.m_fabricCanvas.on("mouse:up", this.onMouseUp);
    this.m_fabricCanvas.interactive = false;
  }

  removeHooks() {
    this.m_fabricCanvas.interactive = false;
    this.m_fabricCanvas.off("mouse:up", this.onMouseUp);
    super.removeHooks();
  }

  innerOnMouseUp(event) {
    const pnt = this.m_coordSys.pointToData([event.pointer.x,event.pointer.y]);

    this.m_symbol.getElement().then((element)=>{
      const object = PlotObjectFactory.createInstance(this.m_symbol.type, {
        element:element ,
        canvas: this.m_fabricCanvas,
      });
  
      object.setPnts([new Point(pnt[0],pnt[1])]);
  
      this.m_fabricCanvas.add(object);
      this.m_fabricCanvas.requestRenderAll();
      this.fireFinishEvent({ plotObj2D: object });
      if(this._addedPlot){
        this._addedPlot(object);
      }
      addExtendLayersPlot(this.m_fabricCanvas._linkTool, object);
      this.disable();
    })



  }
}
