import DrawObject from "../../PlotBase/Draw/DrawObject";
import PrimitiveFactory from "../Primitive/index";
import {CesiumUtil} from "../Utils/CesiumUtil";
import GeomUtil from "../../PlotUtilBase/Geometry/GeomUtil";
import Point from "../../PlotUtilBase/Geometry/Point";
import {addExtendLayersPlot} from "../Utils/PlotUtil";

function look(viewer, center, offset) {
  if (!viewer) {
    return;
  }

  var transform = Cesium.Transforms.eastNorthUpToFixedFrame(center);

  var { camera } = viewer;
  camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z;
  camera.lookAtTransform(
    transform,
    new Cesium.Cartesian3(-offset, -offset, offset)
  );
  setTimeout(() => {
    camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }, 100);
}

/**
 * @class module:3DPlot.DrawPolyline
 * @description 绘制线工具
 * @author 基础平台-杨琨
 *
 * @param {Object} viewer 三维视图容器对象
 * @param {Object} symbol 标绘符号对象
 * @param {Object} plotLayer 标绘图层
 * @param options - {Object} 额外参数
 * @param {Function} [options.addedPlot] 添加标绘图元完成后的回调函数
 */
export default class DrawPolyline extends DrawObject {
  constructor(viewer, symbol, plotLayer, options) {
    super();
    this.m_coords = [];
    this._viewer = viewer;
    this._symbol = symbol;
    this._primitive = null;
    this._isAdded = false;
    this._plotLayer = plotLayer;
    this.uuid = Math.random() * 10000000;
    //绘制完成回调函数
    const {addedPlot} = options;
    this._addedPlot = addedPlot;
  }

  /**
   * @description 添加点击事件
   * @function module:3DPlot.DrawPolyline.addHooks
   */
  addHooks() {
    const viewer = this._viewer;
    const symbol = this._symbol;
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    let that = this;

    //单击事件，开始绘制图元
    handler.setInputAction((event) => {
      const worldPos = viewer.scene.globe.pick(
        viewer.camera.getPickRay(event.position),
        viewer.scene
      );

      if (!worldPos) return;

      symbol.getElement().then(function (res) {
        if (!that._isAdded && that._handler) {
          const {classificationType} = that._symbol;
          res.classificationType = classificationType;
          const {style} = that._symbol;
          if(style && style.nodeStyles){
            res.initNodeStyles(style.nodeStyles);
          }
          that._primitive = PrimitiveFactory.createInstance(symbol.type, {
            positions: that.m_coords,
            element: res,
          });
          that._primitive.id = res.featureId;
          that._isAdded = true;
          that._plotLayer._isDrawing = true;
          that._plotLayer._primitiveCollection.add(that._primitive);
        }

        if(!that._handler){
          return;
        }

        const lnglat = CesiumUtil.cartesian3ToDegrees(
          viewer.scene.globe.ellipsoid,
          worldPos
        );
        that.m_coords.push(lnglat);

        if (that.m_coords.length >= 2) {
          const len = that.m_coords.length;
          const v1 = that.m_coords[len - 2];
          const v2 = that.m_coords[len - 1];
          if (v1.equals(v2)) {
            that.m_coords.splice(len - 1, 1);
          }
        }

        if (that.m_coords.length >= 2) {
          // 去除重复点
          const coords = that.m_coords.map((s) => new Point(s.x, s.y));
          GeomUtil.ClearSamePts(coords);
          that.m_coords = coords.map((s) => new Cesium.Cartesian2(s.x, s.y));
          that._primitive.positions = that.m_coords;
        }
      });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //双击事件，结束绘制图元
    handler.setInputAction((event) => {
      this.fireFinishEvent({ plotObj3D: this._primitive });
      addExtendLayersPlot(this._plotLayer._linkTool, this._primitive);
      let _primitive = this._primitive
      this.disable();
      if(this._addedPlot){
        this._addedPlot(_primitive);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    this._handler = handler;
  }

  /**
   * @description 移除点击事件
   * @function module:3DPlot.DrawPolyline.removeHooks
   */
  removeHooks() {
    const handler = this._handler;
    this._primitive = null;
    if (this.m_coords.length > 0) {
      look(this.viewer, this.m_coords[this.m_coords.length - 1], 1000);
    }

    handler.destroy();
    this._handler = null;
    this._isAdded = false;
    this.m_coords = [];
    this._plotLayer._isDrawing = false;
  }
}
