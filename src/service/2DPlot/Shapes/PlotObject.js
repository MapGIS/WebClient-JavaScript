/*
 * @Author: your name
 * @Date: 2021-07-05 11:32:52
 * @LastEditTime: 2022-05-11 16:02:33
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlot\src\js\Shapes\PlotObject.js
 */
import Point from "../../PlotUtilBase/Geometry/Point";
import { fabric } from "fabric";

const _ = require("lodash");
const PlotObject = fabric.util.createClass(fabric.Object, {
  initialize: function initialize(options) {
    this.callSuper("initialize", options);
    this.canvas = options.canvas;
    this._elem = options.element;
    this._elem.positions = options.positions || [];
    this.m_coordsPx = [];
    this._elem.propsUpdateSignal.add(this._elemPropsUpdateHandler, this);
  },
  _elemPropsUpdateHandler(event) {
    this.set("dirty", true);
  },
  _isInMapBounds: function _isInMapBounds(positions){
    const mapBounds= this.getCoordSys().getBounds()
    let flag=false

    const nw = mapBounds[0]
    const es = mapBounds[1]

    for(let i=0;i<positions.length;i++){
      const x= positions[i].x
      const y= positions[i].y
    
      if(x>nw[0]&&x<es[0]&&y<es[1]&&y>nw[1]){
        flag=true
        break
      }
    }
     return flag
  },
  setPnts(latlngs) {
    this._elem.positions = _.cloneDeep(latlngs);
    this.dataToPoint();
    this.set("dirty", true);
  },
  getElement() {
    return this._elem;
  },
  dataToPoint: function dataToPoint() {
    const coordSys = this.getCoordSys();
    const { positions } = this._elem;

    this.m_coordsPx = [];
    for (let i = 0; i < positions.length; i += 1) {
      const pntPx = coordSys.dataToPoint([positions[i].x,positions[i].y]);
      this.m_coordsPx.push(new Point(pntPx[0],pntPx[1]));
    }
  },
  render: function render(ctx) {
    this.dataToPoint();
    this.setBounds(ctx);
    this.callSuper("render", ctx);
  },
  setBounds: function setBounds(ctx) {},
  // eslint-disable-next-line no-unused-vars
  moveBy: function moveBy(moveX, moveY) {
    const coordSys = this.getCoordSys();
    const coords = [];
    const coordPx = this.m_coordsPx;

    for (let i = 0; i < coordPx.length; i += 1) {
      coordPx[i].x += moveX;
      coordPx[i].y += moveY;
    }

    for (let i = 0; i < coordPx.length; i += 1) {
      const latlng = coordSys.pointToData([coordPx[i].x,coordPx[i].y]);
      coords.push(new Point(latlng[0],latlng[1]));
    }

    this.setPnts(coords);
  },
  getCoordSys: function getCoordSys() {
    return this.canvas.getCoordSys();
  },
  toGeoJSON: function toGeoJSON() {
    return this._elem.toGeoJSON();
  },
  // eslint-disable-next-line no-unused-vars
  fromGeoJSON: function fromGeoJSON(geoJson, isLoadElement = true) {
    if (geoJson.type === "Feature") {
      // 控制点
      if (this._elem && isLoadElement) {
        this._elem.fromGeoJSON(geoJson);
        this.setPnts(this._elem.positions);
        // 控制geojson
        this.visible = geoJson.properties.show;
      }
    } else {
      // eslint-disable-next-line no-new
      new Error("GeoJSON类型错误!");
    }
  },
  setValue: function setValue(key, value, ids,isWaitRender) {
    this._elem.setNodeAttr(key, value,ids);
    if(isWaitRender){
      this.set("dirty", true);
    }
  },

  getPlotCanvas: function getPlotCanvas() {
    return this.canvas;
  },
});
fabric.PlotObject = PlotObject;
export default PlotObject

