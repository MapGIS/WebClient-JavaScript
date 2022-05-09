/*
 * @Author: your name
 * @Date: 2021-09-17 11:04:30
 * @LastEditTime: 2022-04-01 09:20:40
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\PlotCanvas3D.js
 */
import { defined } from "../PlotUtilBase/Check";
import SymbolManager from "../../service/PlotBase/SymbolManager/SymbolManager";
import { DrawPlotObjectFactory3D } from "./Draw";
import {CesiumUtil} from "./Utils/CesiumUtil";
import Observable from "../../service/PlotUtilBase/Observable";
import LineEditTool from "./EditTool/LineEditTool";
import { PrimitiveFactory } from "./Primitive/PrimitiveFactory";

function onLeftClick(clickEvent) {
  const { scene } = this._viewer;
  const pickObjs = scene.drillPick(clickEvent.position);
  let pick = null;
  // eslint-disable-next-line prefer-destructuring
  if (!!pickObjs && pickObjs.length > 0) pick = pickObjs[0];

  if (!pick && !this._selected) return;

  if (pick && pick.primitive === this._selected) return;

  if (!pick) this._selected = null;
  else this._selected = pick;

  this.fire("selected", { target: this._selected });
}

export default class PlotCanvas3D extends Observable {
  constructor(Cesium, viewer) {
    super();

    this._viewer = viewer;
    this._enableSelect = false;
    this._onLeftClick = onLeftClick.bind(this);
    this._selected = null;
    const linEditTool = new LineEditTool(this);
    linEditTool.enable();
  }

  DrawSymbol(symbol) {
    const viewer = this._viewer;
    if (this.drawTool) {
      this.drawTool.disable();
    }
    this.drawTool = DrawPlotObjectFactory3D.createInstance(
      symbol.type,
      viewer,
      symbol
    );
    if (this.drawTool) {
      this.drawTool.enable();
    }
    return this.drawTool;
  }

  getViewer() {
    return this._viewer;
  }

  enableSelect() {
    if (this._enableSelect) return;
    const viewer = this.getViewer();
    const { scene } = viewer;
    this._leftClickHandler = CesiumUtil.createEventHandler(
      Cesium.ScreenSpaceEventType.LEFT_CLICK,
      this._onLeftClick,
      scene
    );
    this._enableSelect = true;
  }

  disableSelect() {
    if (!this._enableSelect) return;
    this._selected = null;
    this._leftClickHandler = CesiumUtil.destroyEventHandler(
      this._leftClickHandler
    );
    this._enableSelect = false;
  }

  addPrimitive(primitive) {
    const { scene } = this._viewer;
    if (!scene) throw new Error("三维场景scene 未初始化");
    scene.primitives.add(primitive);
    return primitive;
  }

  addPrimitiveBy2DPlotObj(plotObj2D) {
    const element = plotObj2D.getElement();

    const primitive = PrimitiveFactory.createInstance(element.type, {
      positions: element.positions,
      element: element,
    });

    this.addPrimitive(primitive);

    return primitive;
  }

  removePrimitive(primitive) {
    const { scene } = this._viewer;
    if (!scene) throw new Error("三维场景scene 未初始化");

    return scene.primitives.remove(primitive);
  }

  enableCameraInputs() {
    const { scene } = this._viewer;
    scene.screenSpaceCameraController.enableInputs = true;
  }

  disableCameraInputs() {
    const { scene } = this._viewer;
    scene.screenSpaceCameraController.enableInputs = false;
  }

  pick(position) {
    const { scene } = this._viewer;
    const pickObjs = scene.drillPick(position);
    let pick = null;
    if (defined(pickObjs) && pickObjs.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      pick = pickObjs[0];
    }

    return pick;
  }
  toGeoJSON() {
    const { scene } = this._viewer;

    const base = {
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
    return base;
  }
  fromGeoJSON(geoJson) {
    if (geoJson.type === "FeatureCollection") {
      const { features } = geoJson;
      features.forEach((s) => {
        this.addGeoJSONObject(s);
      });
    } else {
      // eslint-disable-next-line no-new
      new Error("GeoJSON类型错误，传入值非要素集！");
    }
  }
  addGeoJSONObject(geoFeature) {
    const id = geoFeature.properties.symbolId;

    const symbolManager = SymbolManager.instance;

    const leaf = symbolManager.getLeafByID(id);

    const element = leaf.getElement();

    const primitive = PrimitiveFactory.createInstance(element.type, {
      positions: element.positions,
      element,
    });

    primitive.fromGeoJSON(geoFeature);

    this.addPrimitive(primitive);
  }
  /**
   * @description: 根据uid获取对象
   * @param {*} uid
   * @return {*}
   */
  getPlotObjectByUid(uid) {
    const { scene } = this._viewer;
    const primitives = scene.primitives;
    const length = primitives.length;
    for (let i = 0; i < length; i++) {
      const p = primitives.get(i);
      if(p.getElement){
        const elem = p.getElement();
        if (elem && elem.getFeatureId() === uid) {
          return p;
        }
      }

    }
  }
  /**
   * @description: 生成快照
   * @param {*}
   * @return {*}
   */
  saveScreenPhoto() {
    const url = this.convertCanvasToImage(this._viewer.scene.canvas);
    const tag = document.createElement("a");
    tag.setAttribute("download", "三维态势图");
    tag.href = url;
    tag.click();
  }
  convertCanvasToImage(canvas) {
    if (!canvas.toDataURL) return null;
    return canvas.toDataURL("image/png");
  }
}
