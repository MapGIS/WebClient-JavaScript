/*
 * @Author: your name
 * @Date: 2021-09-17 16:33:26
 * @LastEditTime: 2022-05-23 13:51:01
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\base\SvgLoader\element\RegularPointElement.js
 */
import Matrix3 from '../../../../PlotUtilBase/Math/Matrix3';
import Point from '../../../../PlotUtilBase/Geometry/Point';
import Bounds from '../../../../PlotUtilBase/Geometry/Bound';
import BaseSimple from './BaseSimple';
import RectElement from '../RectElement';
import ReplaceRectElement from '../extend/ReplaceRectElement';

class SimplePoint extends BaseSimple {
    constructor(node) {
        super(node);
        this.type = 'simplepoint';
        this.poly = [new Point(0, 0)];
        this.transformAngle = 0;
        this.transformSizeX = 1;
        this.transformSizeY = 1;
        // 初始化
        this.initBaseAttributes(node);
        // 初始化扩展
        this.setReplaceIndex(0)
    }

    _initValues() {
        super._initValues();
        // 可扩展属性
        this.replaceElement=null
        this.currentReplaceIndex = null;
    }

    set tranAngle(value) {
        this.transformAngle = value;
        this._propsUpdateSignal.dispatch({
            type: 'transformAngle',
            value
        });
    }

    get tranAngle() {
        return this.transformAngle;
    }


    setTranSize(x, y) {
        this.transformSizeY = y;
        this.transformSizeX = x;
        this._propsUpdateSignal.dispatch({
            type: 'transformSize',
            value: [x, y]
        });
    }

    getTranSize() {
        return [this.transformSizeX, this.transformSizeY];
    }

    getSaveBaseAttributes() {
        const attributes = super.getSaveBaseAttributes();
        return this._getSaveBaseAttributes(SimplePoint, attributes);
    }

    /**
     * @description: 替换replace属性的element对象
     * @param {*} node
     * @param {*} ele
     * @return {*}
     */
    _replaceChild(node, ele) {
        // replace Element
        if (
          ele instanceof RectElement &&
          ele.getAttribute("zondyPlotSymbolItem:replace").hasValue()
        ) {

          // 替换icon
          const replaceElement=new ReplaceRectElement(node);
          this.replaceElement = replaceElement
          return  replaceElement;
        }
        return ele;
    }

    initBaseAttributes(node) {
        super.initBaseAttributes(node);
        if (this.getAttribute('zondyPlotSymbol:type').getValue() !== '0') {
            throw new Error('符号类型不一致！');
        }
        const mode = this.getAttribute('zondyPlotSymbol:originMode').hasValue() ? this.getAttribute('zondyPlotSymbol:originMode').getValue() : '0';
        const origin = this.getAttribute('zondyPlotSymbol:origin').hasValue() ? this.getAttribute('zondyPlotSymbol:origin').getValue() : '0.5,0.5';
        const originArr = origin.split(',').map((s) => parseFloat(s));
        this.originPoint = new Point(originArr[0], originArr[1]);
        if (mode === '0') {
            this.originPoint = new Point(this.originPoint.x * this.width, this.originPoint.y * this.height);
        }
        this.tags = this.getAttribute('zondyPlotSymbol:tags').hasValue() ? this.getAttribute('zondyPlotSymbol:tags').getValue().split(';') : [];
    }

    _applyElementTransfrom(element) {
        const { poly } = this;
        if (!poly || poly.length === 0) {
            element.isAllowCoords = false;
            return;
        }
        const origin = this.originPoint;
        const translatePoint = new Point(poly[0].x - origin.x, poly[0].y - origin.y);
        let matrix = new Matrix3();

        if (this._is3d) {
            this._run3d(matrix, origin);
        }
        this._applyNormalMatrixTransfrom(matrix, origin, translatePoint, null, 1, 1, this.m_scaleX, this.m_scaleY);
        element._transformMatrix = matrix;
        element._dimModal.clear();
        element._dimModal.push({
            originPoint: origin.clone(),
            lineAngle: 0
        });
    }

    getBounds() {
        const { width, height, originPoint, poly } = this;
        if (poly.length === 0) return new Bounds();
        const pnt = poly[0];
        const offsetX = pnt.x - originPoint.x;
        const offsetY = pnt.y - originPoint.y;
        const x1 = new Point(offsetX, offsetY);
        const x2 = new Point(offsetX + width, offsetY + height);
        x1.applyPointScale(pnt, this.m_scaleX, this.m_scaleY);
        x2.applyPointScale(pnt, this.m_scaleX, this.m_scaleY);
        return new Bounds(x1.x, x1.y, x2.x, x2.y);
    }

    setReplaceIndex(i){
        const replaceElement= this.replaceElement
        const tags= this.tags
        if(!replaceElement || !tags || i>=tags.length ){
            return
        }
        this.currentReplaceIndex= i
        replaceElement.setReplacePartId(tags[i])
    }

    setPoints(points) {
        super.setPoints(points);
        if (points && points.length > 0) {
            this.traverChildren();
        }
    }
}

SimplePoint.extendElementAttributes = ['transformAngle', 'transformSizeX', 'transformSizeY'];

export default SimplePoint;
