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
  constructor(plotLayer, symbol, options) {
    super();
    this._plotLayer = plotLayer;
    this.m_symbol = symbol;
    this.m_coordSys = this._plotLayer.getCoordSys();
    this.onMouseUp = this.innerOnMouseUp.bind(this);
    //绘制完成回调函数
    const {addedPlot} = options;
    this._addedPlot = addedPlot;
  }

  addHooks() {
    super.addHooks();
    this._plotLayer.on("mouse:up", this.onMouseUp);
    this._plotLayer.interactive = false;
  }

  removeHooks() {
    this._plotLayer.interactive = false;
    this._plotLayer.off("mouse:up", this.onMouseUp);
    super.removeHooks();
  }

  innerOnMouseUp(event) {
    const pnt = this.m_coordSys.pointToData([event.pointer.x,event.pointer.y]);

    this.m_symbol.getElement().then((element)=>{
      const object = PlotObjectFactory.createInstance(this.m_symbol.type, {
        element:element ,
        canvas: this._plotLayer,
      });
  
      object.setPnts([new Point(pnt[0],pnt[1])]);
  
      this._plotLayer.addPlot(object);
      this._plotLayer.requestRenderAll();
      this.fireFinishEvent({ plotObj2D: object });
      if(this._addedPlot){
        this._addedPlot(object);
      }
      addExtendLayersPlot(this._plotLayer._linkTool, object);
      this.disable();
    })



  }
}
