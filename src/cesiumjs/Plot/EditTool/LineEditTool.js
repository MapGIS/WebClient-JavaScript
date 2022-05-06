import axios from "axios";
import { Check, defined } from "../../../service/PlotUtilBase/Check";
import { CesiumUtil } from "../Utils/CesiumUtil";
import { BasePlotPrimitive } from "../Primitive/BasePlotPrimitive";

export class LineEditTool {
  constructor(plotViewer) {
    Check.defined(plotViewer);
    this._plotViewer = plotViewer;
    this._scene = this._plotViewer.getViewer().scene;
    this._pickedPrimitive = null;
    this.firstRequest = true;

    this._dragging = false;
    this.onSelected = this._onSelected.bind(this);
    this.onLeftDown = this._onLeftDown.bind(this);
    this.onMouseMove = this._onMouseMove.bind(this);
    this.onLeftUp = this._onLeftUp.bind(this);
  }

  detachObj() {
    if (defined(this._pickedPrimitive)) this._pickedPrimitive.selected = false;

    this._billboards.removeAll();
    this._pickedPrimitive = null;
  }

  attachObj(obj) {
    if (!defined(obj)) return;

    const { positions } = obj;
    for (let i = 0; i < positions.length; i += 1) {
      // const cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
      const position = Cesium.Cartesian3.fromDegreesArrayHeights([
        positions[i].x,
        positions[i].y,
        503,
      ]);

      if (this.firstRequest) {
        axios.get("assets/point.svg").then(() => {
          const billboard = this._billboards.add({
            position: position[0],
            image: "assets/point.svg",
            sizeInMeters: true,
            id: "LineEditToolCtrlPnts",
            // 取消深度检测 部分浏览器出现无法拖动问题
            // disableDepthTestDistance: Number.POSITIVE_INFINITY,
          });
          billboard.positionIndex = i;
          this.firstRequest = false;
        });
      } else {
        const billboard = this._billboards.add({
          position: position[0],
          image: "assets/point.svg",
          sizeInMeters: true,
          id: "LineEditToolCtrlPnts",
          // disableDepthTestDistance: Number.POSITIVE_INFINITY,
        });
        billboard.positionIndex = i;
      }
    }

    this._pickedPrimitive = obj;
    this._pickedPrimitive.selected = true;
  }

  _onSelected(event) {
    const obj = event.target;
    if (!defined(obj)) {
      this.detachObj();
      return;
    }

    const { primitive } = obj;
    if (!defined(primitive)) {
      this.detachObj();
      return;
    }

    const { pickedPrimitive } = primitive;
    if (defined(pickedPrimitive)) {
      // 选中自己直接return
      if (pickedPrimitive === this._pickedPrimitive) return;

      this.detachObj();
      // 不是线类型的primitive不处理

      // if (pickedPrimitive instanceof RegularPointPrimitive) return;

      if (!(pickedPrimitive instanceof BasePlotPrimitive)) return;
      this.attachObj(pickedPrimitive);
    } else {
      if (primitive.id === "LineEditToolCtrlPnts") return;

      this.detachObj();
    }
  }

  _onLeftDown(event) {
    if (!defined(this._pickedPrimitive)) return;

    const pick = this._plotViewer.pick(event.position);
    if (!defined(pick)) return;

    if (!(pick.id === "LineEditToolCtrlPnts")) return;

    this._pickedBillboard = pick.primitive;
    this._plotViewer.disableCameraInputs();
    this._dragging = true;
  }

  _onMouseMove(event) {
    if (!this._dragging) return;

    const viewer = this._plotViewer.getViewer();
    const index = this._pickedBillboard.positionIndex;

    const { positions } = this._pickedPrimitive;
    const endPosition = CesiumUtil.windowCoordToCartesian3(
      viewer,
      event.endPosition
    );

    let cartographic = undefined;
    // 控制点移除边界外，导致无法获取点
    try {
      cartographic = Cesium.Cartographic.fromCartesian(endPosition);
    } catch {
      cartographic = undefined;
    }
    if (!cartographic) return;

    const billboardPos = Cesium.Cartesian3.fromDegreesArrayHeights([
      Cesium.Math.toDegrees(cartographic.longitude),
      Cesium.Math.toDegrees(cartographic.latitude),
      503,
    ]);

    // eslint-disable-next-line prefer-destructuring
    this._pickedBillboard.position = billboardPos[0];

    positions[index] = CesiumUtil.cartesian3ToDegrees(
      viewer.scene.globe.ellipsoid,
      endPosition
    );

    this._pickedPrimitive.positions = positions;
  }

  _onLeftUp(event) {
    if (!this._dragging) return;

    this._plotViewer.enableCameraInputs();
    this._dragging = false;
  }

  enable() {
    this._plotViewer.on("selected", this.onSelected);
    this._billboards = new Cesium.BillboardCollection();
    this._scene.primitives.add(this._billboards);

    this._leftDownHandler = CesiumUtil.createEventHandler(
      Cesium.ScreenSpaceEventType.LEFT_DOWN,
      this.onLeftDown,
      this._scene
    );
    this._mouseMoveHandler = CesiumUtil.createEventHandler(
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
      this.onMouseMove,
      this._scene
    );
    this._leftUpHandler = CesiumUtil.createEventHandler(
      Cesium.ScreenSpaceEventType.LEFT_UP,
      this.onLeftUp,
      this._scene
    );
  }

  disable() {
    this._leftDownHandler = CesiumUtil.destroyEventHandler(
      this._leftDownHandler
    );
    this._mouseMoveHandler = CesiumUtil.destroyEventHandler(
      this._mouseMoveHandler
    );
    this._leftUpHandler = CesiumUtil.destroyEventHandler(this._leftUpHandler);

    this._plotViewer.off("selected", this.onSelected);
    this._scene.primitives.remove(this._billboards);
  }
}
