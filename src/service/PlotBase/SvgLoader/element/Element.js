/*
 * @Description: element基础类
 * @Author: zk
 * @Date: 2021-11-04 17:02:07
 * @LastEditors: zk
 * @LastEditTime: 2022-06-15 09:21:27
 */

/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Matrix3 from "../../../PlotUtilBase/Math/Matrix3";
import Bounds from "../../../PlotUtilBase/Geometry/Bound";
import Property from "./Property";
import ElementFactory from "./ElementFactory";

import {GElement,SvgElement,DefsElement,StyleElement} from "./index";

const SVGDEFAULTSTYLE = {
  fill: "none",
  "fill-opacity":1,
  "fill-rule": "nonzero",
  stroke: "none",
  "stroke-width":1,
  "stroke-opacity": 1,
  "stroke-linecap": "butt",
  "stroke-dasharray": "none",
  "stroke-dashoffset": 1,
  "stroke-linejoin": "miter",
  "stroke-miterlimit": 4,
  opacity: 1,
  "font":'none',
  "font-size": "medium",
  "font-weight": "normal",
  "font-style": "normal",
  "font-family": "SimHei",
  "font-stretch": "normal",
  "font-variant": "normal",
  "text-decoration": "none",
  "text-anchor": "inherit",
};

export default class Element {
  // 基础属性
  constructor(node) {
    this.type = "element";
    this._init(node);
  }
  /**
   * @description: 初始化函数
   * @param {HTMLElement} node
   * @return {*}
   */
  _init(node) {
    this._initValues()
    this._traverNodes(node);
    this._traverAttributes(node.attributes);
    this._addStylesFromStyleDefinition(node);
  }
  _initValues(){
    this._attributes = {};
    this._styles = {};
    this._children = [];
  }

  _traverAttributes(attributes) {
    // 解析属性
    Array.from(attributes).forEach((attribute) => {
      const nodeName = attribute.nodeName.toLowerCase();
      this._attributes[nodeName] = new Property(attribute.value);
    });

    this._traverStyles();
  }

  _traverStyles() {
    // 解析样式
    if (this.getAttribute("style").hasValue()) {
      const styles = this.getAttribute("style")
        .getString()
        .split(";")
        .map((_) => _.trim());

      styles.forEach((style) => {
        if (!style) {
          return;
        }
        const [name, value] = style.split(":").map((_) => _.trim());
        this._styles[name] = new Property(value);
      });
    }
  }



  // 遍历节点
  _traverNodes(node) {
    // 添加子节点
    Array.from(node.childNodes).forEach((childNode) => {
      this._addChild(childNode);
    });
  }

  getAttribute(name, createIfNotExists = false,skipAncestors=true) {
    const attr = this._attributes[name.toLowerCase()];

    if (!attr && createIfNotExists) {
      const tempAttr = new Property("");

      this._attributes[name.toLowerCase()] = tempAttr;

      return tempAttr;
    }

    if (!skipAncestors) {
      const parent = this._parent;

      if (parent) {
        const parentStyle = parent.getAttribute(name);

        if (parentStyle&&parentStyle.hasValue()) {
          return parentStyle;
        }
      }
    }

    return attr || new Property("");
  }

  getStyle(name, createIfNotExists = false, skipAncestors = false) {
    const style = this._styles[name];

    if (style) {
      return style;
    }

    const attr = this.getAttribute(name);

    if (attr&&attr.hasValue()) {
      this._styles[name] = attr; // move up to me to cache
      return attr;
    }

    if (!skipAncestors) {
      const parent = this._parent;

      if (parent) {
        const parentStyle = parent.getStyle(name);

        if (parentStyle&&parentStyle.hasValue()) {
          return parentStyle;
        }
      }
    }

    if (createIfNotExists) {
      const tempstyle = new Property(SVGDEFAULTSTYLE[name]);

      this._styles[name] = tempstyle;

      return tempstyle;
    }

    return style || new Property("");
  }

  _addStylesFromStyleDefinition(node) {
    const { styles, stylesSpecificity } = node;

    for (const selector in styles) {
      if (!selector.startsWith("@") && this.matchesSelector(selector)) {
        const style = styles[selector];
        const specificity = stylesSpecificity[selector];

        if (style) {
          for (const name in style) {
            let existingSpecificity = this.stylesSpecificity[name];

            if (typeof existingSpecificity === "undefined") {
              existingSpecificity = "000";
            }

            if (specificity >= existingSpecificity) {
              this.styles[name] = style[name];
              this.stylesSpecificity[name] = specificity;
            }
          }
        }
      }
    }
  }

  _addChild(childNode) {
    const child =
      childNode instanceof Element
        ? childNode
        : ElementFactory.createInstance(childNode);

    if (child == null || child === "undefined") return;

    child._parent = this;

    this._children.push(child);
  }

  _getMatrix() {
    const matrix = new Matrix3();
    matrix.identity();

    let element = this;
    while (element && element._matrix) {
      matrix.premultiply(element._matrix);
      element = element._parent;
    }
    return matrix;
  }

  replaceChildById(id, replaceEle) {
    function _removeChildById(children, _id, _replaceEle) {
      if (children && _id) {
        const i = children.findIndex(
          (s) => s.getAttribute("id").getString() === _id
        );
        if (i > -1) {
          children[i] = _replaceEle;
        }
        children.forEach((e) => {
          _removeChildById(e._children, _id, _replaceEle);
        });
      }
    }
    _removeChildById(this._children, id, replaceEle);
  }

  getElementGroup() {
    if (!this._parent) return null;
    let parent = this._parent;
    while (parent) {
      if (parent instanceof GElement) {
        return parent;
      }
      parent = parent._parent;
    }

    return null;
  }

  

  getBoundingBox() {
    const boundingBox = new Bounds();
    this._children.forEach((child) => {
      boundingBox.addBounds(child.getBoundingBox());
    });
    return boundingBox;
  }

  _getSVGElement(){
    if(this instanceof SvgElement) return this;
    if (!this._parent) return null;
    let parent = this._parent;
    
    while (parent) {
      if (parent instanceof SvgElement) {
        return parent;
      }
      parent = parent._parent;
    }
    
    return null;
  }
  _getStyleElements(){
      const svgElement= this._getSVGElement()
      
      if(!svgElement){
        return null
      }
      if(!svgElement._children || svgElement._children.length===0){
        return null
      }
      const defsV = svgElement._children.filter((s)=> s instanceof DefsElement)
      if(defsV.length===0) return null;
      
      const styleElementGroupArr = defsV.map((def)=>{
         return  def._children.filter((d)=> d instanceof StyleElement)
      }).flat()

      return styleElementGroupArr
      
  }

  _cloneAttributes(obj) {
    const keys = Object.keys(obj);
    const temp = {};
    keys.forEach((s) => {
      temp[s] = obj[s].clone();
    });
    return temp;
  }
  _clone(cloneObject) {
    cloneObject._attributes = this._cloneAttributes(this._attributes);
    cloneObject._styles = this._cloneAttributes(this._styles);
    cloneObject.type = this.type;
  }
  clone() {
    // eslint-disable-next-line no-proto
    const cloneObject = Object.create(this.__proto__);
    this._clone(cloneObject);
    cloneObject._children = this._children.map((child) => {
      const cloneChild = child.clone();
      cloneChild._parent = cloneObject;
      return cloneChild;
    });

    return cloneObject;
  }
}
