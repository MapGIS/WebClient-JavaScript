/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-18 15:08:49
 * @LastEditors: zk
 * @LastEditTime: 2022-07-02 14:22:55
 */
import Point from '../../../PlotUtilBase/Geometry/Point';
import { createGuid } from '../../../PlotUtilBase/Util/Guid';
import SvgElement from './SvgElement';
import Signal from '../../../PlotUtilBase/Signal/Signal';
import PathElement from './PathElement';
import TSpanElement from './TSpanElement';
import { drawTypes } from './index';
import GElement from './GElement';
import TextElement from './TextElement';
import PropertyClass from './PropertyClass/PropertyClass';

/**
 * 标绘Element基类
 * @property propsUpdateSignal 属性更新信号
 * @property positions 经纬度坐标数组
 */
class BasePlotElement extends SvgElement {
    constructor(node) {
        super(node);
        // 三维转换坐标系选项
        this._is3d = true;
        this.m_scaleX = 100;
        this.m_scaleY = 100;
        this.adjustScale = 1;
        // 是否开启点组缓存
        this.isOpenCoordsCache = true;
        // 是否进行样式文件压缩合并
        this.isSmartStyle = true;
        // 是否显示或隐藏对象
        this.show = true;
        // 是否随图缩放
        this.isScaleByMap = true;
        // 衬线
        this.compareLine = 0;
        this.compareLineWidth = 6;
        this.compareLineColor = '#099563';
        this.compareLineOpacity = 1;
        // 控制点数组，统一为经纬度
        this._pnts = [];
        // 符号节点
        this._symbol = null;
        // 唯一标识
        this.featureId = createGuid();
        // 事件发送器
        this._propsUpdateSignal = new Signal();
    }

    _createStyleObject() {
        this.styleObject = new PropertyClass(this, BasePlotElement.styleClassArray);
    }

    set positions(pnts) {
        this._pnts = pnts;
        this._propsUpdateSignal.dispatch({
            type: 'positions',
            value: pnts
        });
    }

    get positions() {
        return this._pnts;
    }

    get propsUpdateSignal() {
        return this._propsUpdateSignal;
    }

    /**
     * @description: 设置调整的缩放比
     * @param {Number} num
     * @return {*}
     */
    setAdjustScale(num) {
        this.adjustScale = num;
    }

    getAdjustScale() {
        return this.adjustScale;
    }

    // 设置scale 比例尺
    setScale(scaleX, scaleY) {
        this.m_scaleX = scaleX;
        this.m_scaleY = scaleY;
    }

    // 获取scale 比例尺
    getScale() {
        return [this.m_scaleX, this.m_scaleY];
    }

    // 切换坐标
    changeAttributeStatus(is3d, scaleX, scaleY) {
        this._is3d = is3d;
        this.setScale(scaleX, scaleY);
    }

    /**
     * @description: 获取path element 数组
     * @param {Array} paths
     * @return {*}
     */
    getPathElem(paths) {
        this._getPathElem(this, paths);
    }

    _getPathElem(elem, paths) {
        if (elem._children.length === 0 && elem instanceof PathElement && elem.isAllowCoords) {
            paths.push(elem);
        } else {
            for (let i = 0; i < elem._children.length; i += 1) {
                this._getPathElem(elem._children[i], paths);
            }
        }
    }

    /**
     * @description: 获取span element 数组
     * @param {Array} spans
     * @return {*}
     */
    getSpanElem(spans) {
        this._getSpanElem(this, spans);
    }

    _getSpanElem(elem, spans) {
        if (elem._children.length === 0 && elem instanceof TSpanElement && elem.isAllowCoords) {
            spans.push(elem);
        } else {
            for (let i = 0; i < elem._children.length; i += 1) {
                this._getSpanElem(elem._children[i], spans);
            }
        }
    }

    /**
     * @description: 克隆
     * @param {*} cloneObject
     * @return {*}
     */
    _clone(cloneObject) {
        super._clone(cloneObject);
        cloneObject._is3d = this._is3d;
        cloneObject._pnts = this._pnts ? this._pnts.map((s) => new Point(s.x, s.y)) : null;
        cloneObject._propsUpdateSignal = new Signal();

        cloneObject.m_scaleX = this.m_scaleX;
        cloneObject.m_scaleY = this.m_scaleY;
    }

    /** 符号管理器 */
    symbolManager(symbol) {
        this._symbol = symbol;
    }

    getSymbol() {
        return this._symbol;
    }

    getFeatureId() {
        return this.featureId;
    }

    /** GeoJSON相关方法  保存与加载 */
    _createGeometry() {
        const coordinates = this._pnts.map((s) => [s.x, s.y]);
        return {
            type: 'MultiPoint',
            coordinates
        };
    }

    _createProperties() {
        const properties = Object.assign(this.toJson(), {
            symbolId: this._symbol.id,
            symbolName: this._symbol.name
        });
        // 存储样式节点属性
        properties.symbolNodes = this.getNodesAttributes();
        return properties;
    }

    getSaveBaseAttributes() {
        return this._getSaveBaseAttributes(BasePlotElement, {});
    }

    toGeoJSON() {
        return {
            type: 'Feature',
            properties: this._createProperties(),
            geometry: this._createGeometry()
        };
    }

    /**
     * @description: 获取样式json对象
     * @return {Object} json 样式对象
     */
    getStyleJSON() {
        const { properties } = this.toGeoJSON();
        const { symbolNodes } = properties;
        let style = JSON.parse(JSON.stringify(properties));
        style.nodeStyles = JSON.parse(JSON.stringify(symbolNodes));
        delete style.symbolNodes;
        return style;
    }

    /**
     * @description: 设置样式json对象
     * @params {Object} json 样式对象
     */
    setStyleJSON(object) {
        let style = JSON.parse(JSON.stringify(object));
        style.symbolNodes = JSON.parse(JSON.stringify(object.nodeStyles));
        delete style.nodeStyles;
        this.initProperties(style)
    }

    fromGeoJSON(geojson) {
        if (geojson.type === 'Feature') {
            // 初始化样式 样式覆盖
            const { coordinates } = geojson.geometry;
            const _coords = coordinates || [];
            const pnts = [];
            _coords.forEach((s) => {
                pnts.push(new Point(s[0], s[1]));
            });
            this.positions = pnts;
            this.initProperties(geojson.properties);
        } else {
            // eslint-disable-next-line no-new
            new Error('GeoJSON类型错误!');
        }
    }

    initProperties(properties) {
        this.initPlotAttributes(properties);
        this.initNodeStyles(properties.symbolNodes);
    }

    /**   子节点样式   */
    /**
     * @description: 获取子节点样式
     * @param {*}
     * @return {*}
     */
    getNodesAttributes() {
        const styleObject = {};
        this._getStyles(this._children, styleObject);
        if (this.isSmartStyle) {
            return this.smartStyleObject(styleObject);
        }
        return styleObject;
    }

    _getStyles(children, styleObject) {
        children.forEach((child) => {
            if (child instanceof GElement) {
                this._getStyles(child._children, styleObject);
            } else if (drawTypes.indexOf(child.type) > -1) {
                const id = child.getAttribute('id').getString();
                if (id) {
                    // 区分文字属性和普通样式属性
                    styleObject[id] = child.toJson();
                    if (child instanceof TSpanElement) {
                        styleObject[id].text = child.getText();
                    }
                }
            } else if (child instanceof TextElement) {
                this._getStyles(child._children, styleObject);
            }
        });
    }

    /**
     * @description: 修改子节点样式
     * @param {*} nodeStyleObject
     * @return {*}
     */
    setNodesAttributes(nodeStyleObject) {
        this.initNodeStyles(nodeStyleObject);
        //  发送属性变更事件
        this._propsUpdateSignal.dispatch({});
    }

    /**   属性节点     */
    /**
     * @description:修改属性对象
     * @param {*} properties
     * @return {*}
     */
    setAllAttributes(properties) {
        this.initProperties(properties);
        //  发送属性变更事件
        this._propsUpdateSignal.dispatch({});
    }

    /**
     * @description: 获取属性对象
     * @param {*}
     * @return {*}
     */
    getAllAttributes() {
        return this._createProperties();
    }

    /**
     * @description: 修改单个属性值
     * @param {*} type
     * @param {*} value
     * @param {*} childIds
     * @return {*}
     */
    setNodeAttr(type, value, childIds) {
        const { baseSVGAttributes, extendElementAttributes } = this.getSaveBaseAttributes();
        const baseSVGStyleAttributes = this.getStyleObject().getSVGStyleNameArr();

        let val = value;

        if (type === 'text') {
            const idArr = childIds.split(',');
            val = value.split(',');
            idArr.forEach((s, index) => {
                const ele = this._getElementById(s);
                if (ele) {
                    ele.setText(val[index]);
                }
            });
            //  发送属性变更事件
            this._propsUpdateSignal.dispatch({});
        } else if (
            extendElementAttributes.indexOf(type) > -1 ||
            baseSVGAttributes.indexOf(type) > -1 ||
            baseSVGStyleAttributes.indexOf(this.jsToCss(type)) > -1
        ) {
            this._setNodeAttr(this, type, value);
        } else {
            const idArr = childIds.split(',');
            idArr.forEach((s) => {
                const ele = this._getElementById(s);
                if (ele) {
                    this._setNodeAttr(ele, type, value);
                }
            });
        }
    }

    _setNodeAttr(child, key, value) {
        const { baseSVGAttributes, extendElementAttributes } = child.getSaveBaseAttributes();
        const baseSVGStyleAttributes = child.getStyleObject().getStyleNameArr();

        if (baseSVGStyleAttributes.indexOf(key) > -1) {
            child.getStyleObject().setStyle(key, value);
        } else if (baseSVGAttributes.indexOf(key) > -1) {
            const attrProperty = child.getAttribute(key, true, true);
            attrProperty.setValue(value);
        } else if (child && extendElementAttributes.indexOf(key) > -1) {
            child[key] = value;
        }
        //  发送属性变更事件
        this._propsUpdateSignal.dispatch({
            type: key,
            value: value
        });
    }

    /**
     * @description: 压缩样式
     * @param {*} styleObject
     * @return {*}
     */
    smartStyleObject(styleObject) {
        const keys = Object.keys(styleObject);
        const exp = {};
        // 区分文本和其他
        const textKeys = [];
        const textObjArr = [];
        const pathKeys = [];
        const pathObjArr = [];

        keys.forEach((key) => {
            const item = styleObject[key];
            if (item.text || item.fontSize) {
                textKeys.push(key);
                textObjArr.push(styleObject[key]);
            } else {
                pathKeys.push(key);
                pathObjArr.push(styleObject[key]);
            }
        });

        // 暂存文字
        const textValues = [];
        // 去除文字影响
        textObjArr.forEach((s) => {
            textValues.push(s.text);
            s.text = 'none';
        });
        const pathGroup = this.divideGroup(pathKeys, pathObjArr);
        const textGroup = this.divideGroup(textKeys, textObjArr);

        // path部分构件对象
        pathGroup.forEach((s) => {
            let _obj;
            s.forEach((t) => {
                _obj = styleObject[t];
            });
            exp[s.toString()] = _obj;
        });

        // 恢复文本
        textValues.forEach((s, index) => {
            textObjArr[index].text = s;
        });

        // text部分构建对象
        textGroup.forEach((s) => {
            let _obj;
            const textArr = [];
            s.forEach((t) => {
                _obj = styleObject[t];
                textArr.push(_obj.text);
            });
            _obj.text = textArr.toString();
            exp[s.toString()] = _obj;
        });
        return exp;
    }

    /**
     * @description: 分组
     * @param {*} childStyleObjectKeys
     * @param {*} childStyleObjectArr
     * @return {*}
     */
    divideGroup(childStyleObjectKeys, childStyleObjectArr) {
        const divide = [];
        const group = [];
        for (let i = 0; i < childStyleObjectArr.length; i++) {
            const temp = childStyleObjectArr[i];
            const iArr = [];
            if (divide.length === 0 || divide.indexOf(i) === -1) {
                childStyleObjectArr.forEach((s, index) => {
                    if (JSON.stringify(temp) === JSON.stringify(s)) {
                        divide.push(index);
                        iArr.push(index);
                    }
                });
                group.push(iArr);
            }
        }
        const t = group.map((s) => s.map((z) => childStyleObjectKeys[z]));
        return t;
    }

    isEqualStyleItem(item1, item2) {
        if (JSON.stringify(item1) === JSON.stringify(item2)) {
            return true;
        }
        return false;
    }

    /**
     * @description: 样式覆盖
     * @param {*} styleObject
     * @return {*}
     */
    initNodeStyles(nodeStyles) {
        if (!nodeStyles) return;

        const keys = Object.keys(nodeStyles);
        keys.forEach((s) => {
            const idArr = s.split(',');
            const styleObject = nodeStyles[s];
            const textArr = styleObject.text ? styleObject.text.split(',') : null;

            idArr.forEach((id, i) => {
                const ele = this._getElementById(id);
                if (ele) {
                    ele.fromJson(styleObject);
                }
                if (ele instanceof TSpanElement && textArr) {
                    ele.setText(textArr[i]);
                }
            });
        });
    }

    /**
     * @description: 属性覆盖
     * @param {*} properties
     * @return {*}
     */
    initPlotAttributes(properties) {
        this.fromJson(properties);
    }

    /**
     * @description: 根据id拿ele
     * @param {*} id
     * @param {*} children
     * @return {*}
     */
    _getElementById(id, children = this._children) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.getAttribute('id').getString() === id) {
                return child;
            }
            if (child instanceof TextElement || child instanceof GElement) {
                const ele = this._getElementById(id, child._children);
                if (ele) {
                    return ele;
                }
            }
        }
        return null;
    }

    /**
     * @description: 计算插值比例
     * @param {*}
     * @return {*}
     */
    _calcInsertGeometry() {
        if (this._is3d) {
            return 0.3;
        } else {
            return this.m_scaleY * 0.3;
        }
    }
}

BasePlotElement.extendElementAttributes = ['show', 'featureId', 'compareLine', 'compareLineWidth', 'compareLineColor'];

BasePlotElement.baseSVGAttributes = [];
BasePlotElement.styleClassArray = [];

export default BasePlotElement;
