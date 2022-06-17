/*
 * @Author: your name
 * @Date: 2021-08-30 16:50:45
 * @LastEditTime: 2022-06-15 10:23:08
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\Render.js
 */
import Matrix3 from '../../../PlotUtilBase/Math/Matrix3';
import Point from '../../../PlotUtilBase/Geometry/Point';
import Element from './Element';
import { Transform } from '../transform';
import DimModal from './DimModal';
import Bounds from '../../../PlotUtilBase/Geometry/Bound';
import { createGuid } from '../../../PlotUtilBase/Util/Guid';
import StrokeStyleClass from './PropertyClass/BaseCanvasClass/StrokeStyleClass';
import FillStyleClass from './PropertyClass/BaseCanvasClass/FillStyleClass';
import PropertyClass from './PropertyClass/PropertyClass';

const PSEUDO_ZERO = 0.00000001;

class RenderedElement extends Element {
    constructor(node) {
        super(node);
        this._matrix = Transform.getTransfromFrmElement(this);
        this._transformMatrix = new Matrix3();
        this._dimModal = new DimModal(this);

        this._mapScaleLineWidth = 1;
        this.isAllowCoords = true;
        // 后续自动生成
        this.cacheCoords = null;
        this.styleObject = null;
        // 几何控制点
        this.geometryInsertRate = 1;
        this._initBaseAttrs();
    }
    _initBaseAttrs() {
        this._createSaveAttributes();
    }

    _initClassStyleObject() {
        const classNames = this.getAttribute('class', false, false)
            .getString()
            .split(' ')
            .filter((s) => s);
        const classStyleArr = this._getStyleElements();
        if(!classStyleArr) return;
        const propertys = classStyleArr
            .map((s) => {
                return classNames.map((className) => {
                    return s.getStyleByClassName('.' + className);
                });
            })
            .flat();
        let obj = {};
        propertys.forEach((property) => {
            obj = Object.assign(obj, property);
        });
        if (!this._styles) {
            this._styles = {};
        }
        this._styles = Object.assign(this._styles, obj);
    }
    _createStyleObject() {
        this._initClassStyleObject();
        this.styleObject = new PropertyClass(this, RenderedElement.styleClassArray);
    }
    getStyleObject() {
        if (this.styleObject) return this.styleObject;
        this._createStyleObject();
        return this.styleObject;
    }
    _createSaveAttributes() {
        const { baseSVGAttributes } = this.getSaveBaseAttributes();
        baseSVGAttributes.forEach((attr) => {
            if (!this.getAttribute(attr).hasValue()) {
                this.getAttribute(attr, true);
            }
        });
    }
    calculateOpacity() {
        let opacity = 1.0;
        let element = this;

        while (element) {
            const opacityStyle = element.getStyle('opacity', false, true);

            if (opacityStyle.hasValue(true)) {
                opacity *= opacityStyle.getNumber();
            }

            element = element.parent;
        }
        return opacity;
    }

    getContextStyle() {
        return this.getStyleObject().getStyle();
    }
    /**
     * @description: 获取当前对象控制点
     * @param {*}
     * @return { null | Point}
     */
    getOriginPoint() {
        let origin;
        if (this.getAttribute('origin').hasValue()) {
            const arr = this.getAttribute('origin').getString().split(',');
            origin = new Point(parseFloat(arr[0]), parseFloat(arr[1]));
        } else {
            return null;
        }
        return origin;
    }

    /**
     * @description: 获取变换矩阵
     * @param {*}
     * @return {Matrix3}
     */
    _getTransform() {
        return this._transformMatrix;
    }
    /**
     * @description: 获取真实二维外包矩形
     * @param {*}
     * @return {*}
     */
    getBounds() {
        return Bounds();
    }

    /**
     * @description: 获取真实线宽
     * @param {*}
     * @return {*}
     */
    getMapScaleLineWidth() {
        let lineWidth = PSEUDO_ZERO;
        const strokeWidthStyleProp = this.getStyle('stroke-width');
        if (strokeWidthStyleProp.hasValue()) {
            const newLineWidth = strokeWidthStyleProp.getPixels() * this.getMapScale();
            lineWidth = !newLineWidth ? PSEUDO_ZERO : newLineWidth;
        }
        return lineWidth;
    }

    /**
     * @description: 获取缩放比
     * @param {*}
     * @return {*}
     */
    getMapScale() {
        return this._mapScaleLineWidth;
    }
    /**
     * @description: 设置缩放比
     * @param {*} _mapScale
     * @return {*}
     */
    setMapScale(_mapScale) {
        this._mapScaleLineWidth = _mapScale;
    }

    _clone(cloneObject) {
        super._clone(cloneObject);
        cloneObject._matrix = this._matrix.clone();
        cloneObject._dimModal = this._dimModal.clone();
        cloneObject._mapScaleLineWidth = this._mapScaleLineWidth;
        cloneObject.isAllowCoords = this.isAllowCoords;
        cloneObject.cacheCoords = null;

        if (this._transformMatrix) {
            if (Array.isArray(this._transformMatrix)) {
                cloneObject._transformMatrix = this._transformMatrix.map((s) => s.clone());
            } else {
                cloneObject._transformMatrix = this._transformMatrix.clone();
            }
        }
    }

    /**
     * @description: 驼峰式转css
     * @param {*} string
     * @return {*}
     */
    jsToCss(string) {
        return string.replace(/([A-Z])/, '-$1').toLowerCase();
    }

    /**
     * @description: 返回json
     * @param {*}
     * @return {*}
     */
    toJson() {
        const attrs = this.createStyleObject();
        return attrs;
    }
    /**
     * @description: json覆盖属性
     * @param {*} json
     * @return {*}
     */
    fromJson(json) {
        this.initStyleObject(json);
    }

    /**
     * @description: 创建child style对象
     * @return {*}
     */
    createStyleObject() {
        let childStyleObject = {};
        const { baseSVGAttributes, extendElementAttributes } = this.getSaveBaseAttributes();

        const styles = this.getStyleObject().getStyle();

        childStyleObject = styles;

        baseSVGAttributes.forEach((s, index) => {
            const attrName = baseSVGAttributes[index];
            const attrProperty = this.getAttribute(s);
            let v = '';
            if (attrProperty.hasValue()) {
                v = attrProperty.getString();
            } else {
                v = this.getAttribute(s, true).getString();
            }
            childStyleObject[attrName] = v;
        });

        extendElementAttributes.forEach((s, index) => {
            const attrName = extendElementAttributes[index];

            if (attrName === 'featureId' && !this[s]) {
                this[s] = createGuid();
            }
            childStyleObject[attrName] = this[s];
        });
        return childStyleObject;
    }
    /**
     * @description: 初始化
     * @param {*} styleObject
     * @return {*}
     */
    initStyleObject(styleObject) {
        const { baseSVGAttributes, extendElementAttributes } = this.getSaveBaseAttributes();

        const baseSVGStyleAttributes = this.getStyleObject().getStyleNameArr();

        baseSVGStyleAttributes.forEach((s) => {
            if (typeof styleObject[s] !== 'undefined') {
                this.getStyleObject().setStyle(s, styleObject[s]);
            }
        });

        baseSVGAttributes.forEach((s) => {
            if (typeof styleObject[s] !== 'undefined') {
                this.getAttribute(s, true, true).setValue(styleObject[s]);
            }
        });

        extendElementAttributes.forEach((s) => {
            if (typeof styleObject[s] !== 'undefined') {
                this[s] = styleObject[s];
            }
        });
    }
    /**
     * @description: 获取需要保存的属性字段
     * @param {*}
     * @return {object} {baseSVGAttributes,extendElementAttributes}
     */
    getSaveBaseAttributes() {
        return this._getSaveBaseAttributes(RenderedElement, {});
    }
    _getSaveBaseAttributes(BaseClass, superAttributesObject) {
        const baseAttributes = {
            baseSVGAttributes: [],
            extendElementAttributes: []
        };

        const { baseSVGAttributes, extendElementAttributes } = BaseClass;

        baseAttributes.baseSVGAttributes = baseSVGAttributes.concat(
            superAttributesObject && superAttributesObject.baseSVGAttributes ? superAttributesObject.baseSVGAttributes : []
        );

        baseAttributes.extendElementAttributes = extendElementAttributes.concat(
            superAttributesObject && superAttributesObject.extendElementAttributes ? superAttributesObject.extendElementAttributes : []
        );

        return baseAttributes;
    }

    getGeometryDetail(i) {
        return this._dimModal.get(i);
    }

    getBaseClass() {
        return RenderedElement;
    }
    /**
     * @description: 描述点组的丰富度
     * @param {*} number
     * @return {*}
     */
    getInsertGeometryPoint(number) {
        return number;
    }
}

RenderedElement.baseSVGAttributes = [];
RenderedElement.extendElementAttributes = [];
RenderedElement.styleClassArray = [StrokeStyleClass, FillStyleClass];

export default RenderedElement;
