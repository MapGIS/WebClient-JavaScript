/*
 * @class: 
 * @Description: 
 * @Author: zk
 * @Date: 2022-05-16 15:00:08
 * @LastEditors: zk
 * @LastEditTime: 2022-05-16 19:40:17
 */
import PathElement from "../PathElement";
import Point from "../../../../PlotUtilBase/Geometry/Point";
export default class PartOriginElement extends PathElement{
    constructor(node){
        super(node)
        this.initBaseAttributes()
    }
    initBaseAttributes(){
       this._pose= this.getAttribute('zondyPlotSymbolItem:pose').hasValue()?this.getAttribute('zondyPlotSymbolItem:pose').getValue():'0'
       this.originPoint=this._getOriginPointByPx()
    }
    _getOrigin(ele){
        let origin;
        
        if (ele.getAttribute("zondyPlotSymbolItem:markerOrigin").hasValue()) {
          const arr = ele.getAttribute("zondyPlotSymbolItem:markerOrigin").getString().split(",");
          origin = new Point(parseFloat(arr[0]), parseFloat(arr[1]));
        } else {
          const bounds = ele.getBoundingBox();
          origin = bounds.getCenter();
        }
        return origin;
    }
    
    _getOriginPointByPx(){
        let gOrigin;
        const group = this.getElementGroup();
        if (group) {
          gOrigin = this._getOrigin(group)
        } else {
          gOrigin = this._getOrigin(this)
        }
        return gOrigin
    }
    getOriginPoint(){
       return  this.originPoint.clone()
    }
    getPose(){
        return this._pose
    }
}