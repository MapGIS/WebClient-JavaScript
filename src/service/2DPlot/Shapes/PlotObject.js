/*
 * @Author: your name
 * @Date: 2021-07-05 11:32:52
 * @LastEditTime: 2022-06-08 09:54:23
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlot\src\js\Shapes\PlotObject.js
 */
import Point from '../../PlotUtilBase/Geometry/Point';
import { fabric } from 'fabric';

const _ = require('lodash');
const PlotObject = fabric.util.createClass(fabric.Object, {
    initialize: function initialize(options) {
        this.callSuper('initialize', options);
        this.canvas = options.canvas;
        this._elem = options.element;
        this._elem.positions = options.positions || [];
        this.m_coordsPx = [];
        this._elem.propsUpdateSignal.add(this._elemPropsUpdateHandler, this);
    },
    _elemPropsUpdateHandler(event) {
        this.set('dirty', true);
        const {type} = event;
        if(type === "positions"){
            this.canvas.requestRenderAll();
        }
    },
    setPnts(latlngs) {
        this._elem.positions = _.cloneDeep(latlngs);
        this.dataToPoint();
        this.set('dirty', true);
    },
    getElement() {
        return this._elem;
    },
    dataToPoint: function dataToPoint() {
        const coordSys = this.getCoordSys();
        const { positions } = this._elem;

        this.m_coordsPx = [];
        for (let i = 0; i < positions.length; i += 1) {
            const pntPx = coordSys.dataToPoint([positions[i].x, positions[i].y]);
            this.m_coordsPx.push(new Point(pntPx[0], pntPx[1]));
        }
    },
    render: function render(ctx) {
        if (this.isNotVisible()) {
            return;
        }
        this.setBounds(ctx);
        this.callSuper('render', ctx);
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
            const latlng = coordSys.pointToData([coordPx[i].x, coordPx[i].y]);
            coords.push(new Point(latlng[0], latlng[1]));
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
        if (geoJson.type === 'Feature') {
            // 控制点
            if (this._elem && isLoadElement) {
                this._elem.fromGeoJSON(geoJson);
                this.setPnts(this._elem.positions);
                // 控制geojson
                this.visible = geoJson.properties.show;
            }
        } else {
            // eslint-disable-next-line no-new
            new Error('GeoJSON类型错误!');
        }
    },
    isNotVisible: function () {
        return this.opacity === 0 || (!this.width && !this.height && this.strokeWidth === 0) || !this.visible || !this._elem.show;
    },
    setValue: function setValue(key, value, ids,isWaitRender=true) {
        this._elem.setNodeAttr(key, value, ids);
        this.set('dirty', true);
        if(isWaitRender){
            this.canvas.requestRenderAll();
        }
    },

    getPlotCanvas: function getPlotCanvas() {
        return this.canvas;
    },
    /**
     * @description: 设置标绘图元样式，必须通过此方法设置，修改样式的属性无效
     * @function @function module:3DPlot.BasePlotPrimitive.setStyle
     * @public
     *
     * @param key {String} 样式名
     * @param value {Any} 样式值
     * @param value {Any} 样式值
     * @param nodeIds {String} 图元部件ID字符串，可传入多个id，以逗号分隔，当id有多个时，可统一修改多个部件的样式，
     * 若找不到id则不做改变
     */
    setStyle(key, value, nodeIds) {
        this.setValue(key, value, nodeIds);
    },

    /**
     * @description: 获取标绘图元样式
     * @function @function module:3DPlot.BasePlotPrimitive.getStyle
     * @public
     *
     * @return {Object} style 图元样式
     */
    getStyle() {
        return this._elem.getStyleJSON();
    }
});
fabric.PlotObject = PlotObject;
export default PlotObject;
