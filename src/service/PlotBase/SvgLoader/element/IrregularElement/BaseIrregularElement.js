/*
 * @Author: your name
 * @Date: 2021-10-18 09:13:48
 * @LastEditTime: 2022-06-22 10:24:02
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\IrregularElement\BaseIrregularElement.js
 */
import BasePlotElement from '../BasePlotElement';
import Bounds from '../../../../PlotUtilBase/Geometry/Bound';
import Point from '../../../../PlotUtilBase/Geometry/Point';

export default class BaseIrregularElement extends BasePlotElement {
    constructor(node) {
        super(node);
        this.type = 'irregular';
        this.m_coords = [];
        this._tempRegularPath = this._children[0];
        
        this.initBaseAttributes(node);
    }

    initBaseAttributes(node) {
        this.symbolVersion = this.getAttribute('zondyPlotSymbol:version').getValue();
        this.symbolId = this.getAttribute('zondyPlotSymbol:id').getValue();
        this.symbolName = this.getAttribute('zondyPlotSymbol:name').getValue();
        this.symbolDesc = this.getAttribute('zondyPlotSymbol:desc').getValue();
    }
    // 遍历节点
    _traverNodes(node) {
        let firstChild = node.firstChild;
        while (firstChild) {
            firstChild.parentElement.removeChild(firstChild);
            firstChild = node.firstChild;
        }
        // 添加子节点
        const path = document.createElement('path');
        path.setAttribute(
            'style',
            'fill:#ffff64;fill-opacity:0.70588235;stroke:#ff0000;stroke-width:4;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none'
        );
        path.setAttribute('id', 'irregular');
        path.setAttribute('d', 'm 200.0,100.0 -200,0');
        node.appendChild(path);

        for (let i = 0; i < node.childNodes.length; i++) {
            const childNode = node.childNodes[i];
            this._addChild(childNode);
        }
    }
    /**
     * @description: 计算真实外包边界
     */
    getBounds() {
        const _bounds = new Bounds();
        const coords = this.cacheCoords || this.getCoords();
        if (!coords) {
            return _bounds;
        }
        const _coordsPxArr = coords.slice(0);
        _coordsPxArr.forEach((s) => {
            s.forEach((t) => {
                if (t && !Number.isNaN(t.x) && !Number.isNaN(t.y)) {
                    _bounds.addPnt(t.x, t.y);
                }
            });
        });
        return _bounds;
    }
    
    applyFuncToStorkeGeometry(coords,func){
        return coords
    }
    applyFuncToFillGeometry(coords,func){
        return coords
    }
    
    /**
     * @description: 几何对象生成要素点
     * @param {*} points 插入控制点
     * @return {*} 要素点数组
     */
    _insertGeometry(points) {
        return points;
    }

    /**
     * @description:获取要素点
     * @return {Array<Point>} 要素点数组
     */
    getCoords() {
        const _expCoords = this._insertGeometry(this.m_coords);
        return _expCoords;
    }

    getContextStyle() {
        return this._tempRegularPath.getContextStyle();
    }
    /**
     * @description:修改要素点数组
     * @param {Array<Point>} points 点组
     */
    setPoints(points) {
        if (points && Array.isArray(points)) {
            this.m_coords = points.slice(0);
            this.traverChildren();
        } else {
            // eslint-disable-next-line no-new
            new Error('非规则几何对象参数错误！');
            this.m_coords = [];
        }
    }
    /**
     * @description: 遍历子节点
     */
    traverChildren() {
        if (this.isOpenCoordsCache) {
            this.cacheCoords = this.getCoords();
        }
        // 作用随图缩放
        if (this._tempRegularPath) {
            this._tempRegularPath.setMapScale(this.m_scaleY);
        }
        this._tempRegularPath.geometryInsertRate = this._calcInsertGeometry();
    }

    _clone(cloneObject) {
        super._clone(cloneObject);
        // 缓存不克隆，重新获取
        cloneObject.cacheCoords = null;
        cloneObject.m_coords = this.m_coords.map((s) => new Point(s.x, s.y));
    }
}
