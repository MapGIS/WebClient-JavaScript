import {defined} from "../PlotUtilBase/Check";
import SymbolManager from "../../service/PlotBase/SymbolManager/SymbolManager";
import {DrawPlotObjectFactory3D} from "./Draw";
import {CesiumUtil} from "./Utils/CesiumUtil";
import Observable from "../../service/PlotUtilBase/Observable";
import EditTool from "./EditTool/EditTool";
import {PrimitiveFactory} from "./Primitive/PrimitiveFactory";

/**
 * @class module:3DPlot.PlotLayer3D
 * @description 行业标绘图层
 * @author 基础平台-杨琨
 */
class PlotLayer3D extends Observable {
  constructor(Cesium, viewer) {
    super();
    //viewer对象
    this._viewer = viewer;
    //标绘图元列表
    this._plotList = [];
    //图元可否编辑
    this._editable = false;
    //编辑工具
    this._editTool = new EditTool(this);
  }

  /**
   * @function module:PlotLayer3D.addPlot
   * @description 添加标绘图元
   * @param plot - {Plot} 必选项，要添加的标绘图元
   */
  addPlot(plot) {
    const {scene} = this._viewer;
    if (!scene) throw new Error("三维场景scene 未初始化");
    scene.primitives.add(plot);
    this._plotList.push(plot.id);
    return plot;
  }

  /**
   * @function module:PlotLayer3D.removePlotByID
   * @description 根据标绘图元ID删除标绘图元
   * @param id - {String} 必选项，要删除的标绘图元ID
   * @return {Object} json
   */
  removePlotByID(id) {
    //删除图元列表中的id
    for (let j = 0; j < this._plotList.length; j++) {
      if (id === this._plotList[j]) {
        this._plotList.splice(j, 1);
        break;
      }
    }

    return this._removePlotByID(id);
  }

  _removePlotByID(id) {
    const {scene} = this._viewer;
    if (!scene) throw new Error("三维场景scene 未初始化");

    let result;

    //删除标绘图元
    for (let i = 0; i < scene.primitives.length; i++) {
      if (id === scene.primitives[i].id) {
        result = scene.primitives.remove(scene.primitives[i]);
        break;
      }
    }

    return result;
  }

  /**
   * @function module:PlotLayer3D.removePlotByID
   * @description 删除标绘图元
   * @param plot - {Plot} 必选项，要删除的标绘图元
   * @return {Object} json
   */
  removePlot(plot) {
    const {scene} = this._viewer;
    if (!scene) throw new Error("三维场景scene 未初始化");

    //删除图元列表中的id
    for (let i = 0; i < this._plotList.length; i++) {
      if (id === this._plotList[i]) {
        this._plotList.splice(i, 1);
        break;
      }
    }

    return scene.primitives.remove(plot);
  }

  /**
   * @function module:PlotLayer3D.getPlotByID
   * @description 根据标绘图元ID获取标绘图元
   * @param id - {String} 必选项，标绘图元ID
   * @return {Object} json
   */
  getPlotByID(id) {
    const {scene} = this._viewer;
    if (!scene) throw new Error("三维场景scene 未初始化");

    let index;

    for (let i = 0; i < scene.primitives.length; i++) {
      if (id === scene.primitives[i].id) {
        index = i;
        break;
      }
    }
    return scene.primitives[index];
  }

  /**
   * @function module:PlotLayer3D.removeAll
   * @description 移除图层下的所有标绘图元
   */
  removeAll() {
    for (let i = 0; i < this._plotList.length; i++) {
      this._removePlotByID(this._plotList[i]);
    }

    this._plotList = [];
  }

  /**
   * @function module:PlotLayer3D.toJSON
   * @description 导出图层数据
   * @return {Object} json
   */
  toJSON() {
    const {scene} = this._viewer;

    const json = {
      type: "FeatureCollection",
      features: [],
    };
    const primitives = scene.primitives;
    const length = primitives.length;
    for (let i = 0; i < length; i++) {
      const p = primitives.get(i);
      if (p.toGeoJSON) {
        base.features.push(p.toGeoJSON());
      }
    }
    return json;
  }

  /**
   * @function module:PlotLayer3D.fromJSON
   * @description 导入图层数据
   * @param geoJson - {Object} 必选项，标绘图元ID
   */
  fromJSON(geoJson) {
    if (geoJson.type === "FeatureCollection") {
      const {features} = geoJson;
      features.forEach((s) => {
        this.addGeoJSONObject(s);
      });
    } else {
      // eslint-disable-next-line no-new
      new Error("GeoJSON类型错误，传入值非要素集！");
    }
  }

  /**
   * @function module:PlotLayer3D.getSnapshot
   * @description 获取屏幕快照
   */
  getSnapshot() {
    function convertCanvasToImage(canvas) {
      if (!canvas.toDataURL) return null;
      return canvas.toDataURL("image/png");
    }

    const url = convertCanvasToImage(this._viewer.scene.canvas);
    const tag = document.createElement("a");
    tag.setAttribute("download", "三维态势图");
    tag.href = url;
    tag.click();
  }
}

Object.defineProperties(PlotLayer3D.prototype, {
  editable: {
    get: function () {
      return this._editable;
    },
    set: function (value) {
      this._editable = value;
      //启用编辑工具
      if(this._editable) {
        this._editTool.enable();
      }
    }
  }
});

export default PlotLayer3D;