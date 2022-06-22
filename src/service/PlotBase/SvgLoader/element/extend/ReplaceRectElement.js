/*
 * @Author: your name
 * @Date: 2021-11-04 17:02:07
 * @LastEditTime: 2022-06-22 10:00:07
 * @LastEditors: zk
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\extend\ReplacedGroupElement.js
 */
import { defined } from "../../../../PlotUtilBase/Check";
import Point from "../../../../PlotUtilBase/Geometry/Point";
import Matrix3 from "../../../../PlotUtilBase/Math/Matrix3";
import SymbolManager from "../../../SymbolManager/SymbolManager";
import ElementFactory from "../ElementFactory";
import RectElement from "../RectElement";

export default class ReplaceRectElement extends RectElement {
  constructor(node) {
    super(node);
    this.initBaseAttribute()
  }
  initBaseAttribute(){
    const x = this.getAttribute("x").getNumber();
    const y = this.getAttribute("y").getNumber();
    this.width = this.getStyle("width").getNumber();
    this.height = this.getStyle("height").getNumber();
    this.originPoint= new Point(x+ this.width/2,y+ this.height/2)

    this.replaceId = this.getAttribute('zondyPlotSymbolItem:replace').getValue()
    if(!this.replaceId){
        throw new Error("可替换符号标签为空！")
    }
  }
  setReplacePartId(id){
     this.replaceId=id
     this._setReplacePartId(id)
  }
  _setReplacePartId(id, symbolManager) {
    if (!defined(symbolManager)) symbolManager = new SymbolManager();

    this._children.forEach((child)=>{
        child._parent=null
    })
    this._children=[]


    const symbol = symbolManager.getLeafByID(parseInt(id,10));

    if(!symbol) return;

    const that = this;
    
    symbol.getSvg().then(function (res) {
     if(res instanceof Element){
         for(let i=0;i<res.childNodes.length;i++){
              const child= res.childNodes[i]
              if(child.nodeName==='rect' && child.getAttribute('zondyPlotSymbolItem:replace')){
                  throw new Error("标签嵌套使用replace属性！")
              }
         }
     }
     const ele=ElementFactory.createInstance(res,'svg')
     const bounds= ele.getBoundingBox()
     const center =bounds.getCenter()
     const width= bounds.width
     const height= bounds.height

    let matrix =new Matrix3()
    matrix.translate(-center.x,-center.y)
    matrix.scale(that.width/width,that.height/height)
    matrix.translate(center.x,center.y)
    matrix.translate(that.originPoint.x-center.x,that.originPoint.y-center.y)
    that._matrix= matrix

     ele._children.forEach((child)=>{
        child._parent=that
        that._children.push(child)
     })

    });
  }
}
