/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-10 17:05:14
 */
import { fabric } from "fabric";
import  {DrawPlotObjectFactory2D}  from "./Draw/DrawPlotObjectFactory2D";
import  {PlotObjectFactory}  from "./Shapes/PlotObjectFactory";
import  SymbolManager  from "../PlotBase/SymbolManager/SymbolManager";
import FabricLineUtil from "./EditTool/FabricLineUtil";

export const PlotCanvas = fabric.util.createClass(fabric.Canvas, {

  m_CoordSys: null,
  selection: false,

  /**
   * Constructor
   * @param {HTMLElement | String} el &lt;canvas> element to initialize instance on
   * @param {Object} [options] Options object
   * @return {Object} thisArg
   */
  initialize: function (el, options) {
    this.callSuper("initialize", el, options);
    // 更新触发事件
    this.on("object:modified", (event) => {
      const target = event.target;
      if (target && target.getElement) {
        const ele = target.getElement();

        if (event.action === "rotate") {
          if (ele.tranAngle || ele.tranAngle === 0) {
            ele.tranAngle = target.angle;
          }
        }
        if (
          event.action === "scale" ||
          event.action === "scaleX" ||
          event.action === "scaleY"
        ) {
          if (ele.setTranSize) {
            ele.setTranSize(target.scaleX, target.scaleY);
          }
        }
      }
    });
    // 修改lineUtil
    new FabricLineUtil(this)
  },
  /**
   * set given CoordSystem on PlotCanvas
   * @param {CoordSystem} coordSys CoordSystem to set
   * @return {void}
   */
  setCoordSys: function setCoordSys(coordSys) {
    this.m_CoordSys = coordSys;
  },
  /**
   * returns current CoordSystem
   * @return {CoordSystem} current CoordSystem
   */
  getCoordSys: function getCoordSys() {
    return this.m_CoordSys;
  },

  DrawSymbol: function DrawSymbol(symbol) {
    if (this.drawTool) {
      this.drawTool.disable();
    }
    this.drawTool = DrawPlotObjectFactory2D.createInstance(
      symbol.type,
      this,
      symbol
    );
    if (this.drawTool) {
      this.drawTool.enable();
    }
    return this.drawTool;
  },
  addPlotObjectBy3DPlotObj(plotObj3D) {
    const element = plotObj3D.getElement();

    const plotObj = PlotObjectFactory.createInstance(element.type, {
      element: element,
      positions: element.positions,
      canvas: this,
    });

    this.add(plotObj);
    return plotObj;
  },

  /**
   * @description: 根据uid获取对象
   * @param {*} uid
   * @return {*}
   */
  getPlotObjectByUid(uid) {
    let t;
    this.forEachObject((s) => {
      const elem = s.getElement();
      if (elem && elem.getFeatureId() === uid) {
        t = s;
      }
    });
    return t;
  },

  toGeoJSON: function toGeoJSON() {
    const base = {
      type: "FeatureCollection",
      features: [],
    };
    this.forEachObject((s) => {
      if (s.toGeoJSON) {
        base.features.push(s.toGeoJSON());
      }
    });
    return base;
  },
  // eslint-disable-next-line no-unused-vars
  fromGeoJSON: function fromGeoJSON(geoJson) {
    if (geoJson.type === "FeatureCollection") {
      const { features } = geoJson;
      features.forEach((s) => {
        this.addGeoJSONObject(s);
      });
    } else {
      // eslint-disable-next-line no-new
      new Error("GeoJSON类型错误，传入值非要素集！");
    }
  },
async  addGeoJSONObject(geoFeature) {
    // 1、element
    const id = geoFeature.properties.symbolId;
    const symbolManager = SymbolManager.instance;

    const leaf = symbolManager.getLeafByID(id);

    const element =await leaf.getElement()
    const plotObj = PlotObjectFactory.createInstance(element.type, {
      element,
      positions: element.positions,
      canvas: this,
    });

    plotObj.fromGeoJSON(geoFeature);

    this.add(plotObj);
  },


  /* 
  tip:改写方法
   修改宽度和高度并刷新,原有方法 setDimensions设置高宽时会触发 requestRenderAll()
   在二三维联动时三维会频繁发送事件，二维界面会出现闪烁，因此改写为立即触发render
  */
  setCanvasDimensionsSize: function (dimensions, options) {
    var cssValue;

    options = options || {};

    for (var prop in dimensions) {
      cssValue = dimensions[prop];

      if (!options.cssOnly) {
        this._setBackstoreDimension(prop, dimensions[prop]);
        cssValue += "px";
        this.hasLostContext = true;
      }

      if (!options.backstoreOnly) {
        this._setCssDimension(prop, cssValue);
      }
    }
    if (this._isCurrentlyDrawing) {
      this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles();
    }
    this._initRetinaScaling();
    this.calcOffset();

    return this;
  },
});

fabric.PlotCanvas = PlotCanvas;
