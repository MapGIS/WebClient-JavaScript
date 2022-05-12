import axios from "axios";
import {Check, defined} from "../../PlotUtilBase/Check";
import {CesiumUtil} from "../Utils/CesiumUtil";
import BasePlotPrimitive from "../Primitive/BasePlotPrimitive";
import Point from "../../PlotUtilBase/Geometry/Point"

/**
 * @class module:3DPlot.PlotLayer3D
 * @description 行业标绘图层
 * @author 基础平台-杨琨
 *
 * @param {PlotLayer3D} layer
 */
export default class EditTool {
  constructor(layer) {
    //标绘图层
    this._plotLayer = layer;
    //scene对象
    this._scene = this._plotLayer._viewer.scene;
    //是否移动位置点
    this._isChangePoisition = false;
    //位置点的广告牌对象
    this._positionBillboards = undefined;
    //当前选中的标绘图元
    this._selectPlot = undefined;

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

    const {positions} = obj;
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

    const {primitive} = obj;
    if (!defined(primitive)) {
      this.detachObj();
      return;
    }

    const {pickedPrimitive} = primitive;
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
    let that = this;
    //拾取标绘图元
    const pick = this._scene.pick(event.position);

    if (!defined(pick)) return;

    let {primitive} = pick;
    let {pointType} = primitive;

    if (defined(primitive)) {
      //是位置控制点
      if (pointType && pointType === "positionControl") {
        that._disableCamera();
        this._isChangePoisition = true;
      } else if (defined(primitive.pickedPrimitive)) {
        //是标绘图元
        let {positions} = primitive.pickedPrimitive;
        //暂存标绘图元
        that._selectPlot = primitive.pickedPrimitive;
        const {type} = that._selectPlot._elem;
        //规则点
        if (type === "msbl_regularpoint") {
          //设置位移点
          if (!that._positionBillboards) {
            let billboards = new Cesium.BillboardCollection();
            for (let i = 0; i < positions.length; i++) {
              billboards.add({
                position: Cesium.Cartesian3.fromDegrees(positions[i].x, positions[i].y, 0),
                image: "http://localhost:8895/assets/point.svg",
                sizeInMeters: true,
                id: "LineEditToolCtrlPnts_" + i,
                scale: 1
              });
            }
            let billboard = billboards.get(0);
            billboard.pointType = "positionControl";
            that._scene.primitives.add(billboards);
            that._positionBillboards = billboards;
          }
        }
      }
    }
  }

  _onMouseMove(event) {
    if (this._isChangePoisition) {
      let billboard = this._positionBillboards.get(0);
      if (this._scene.pickPosition(event.endPosition)) {
        //获取鼠标点的笛卡尔坐标
        let mouseCartesian = this._scene.pickPosition(event.endPosition);
        //转化为经纬度坐标
        let mouseCartographic = Cesium.Cartographic.fromCartesian(mouseCartesian);
        //设置位置点高度
        mouseCartographic.height = 0;
        //更新位置点坐标
        billboard.position = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(mouseCartographic.longitude), Cesium.Math.toDegrees(mouseCartographic.latitude), mouseCartographic.height);
        //更细标绘图元位置坐标
        let cartographic = Cesium.Cartographic.fromCartesian(this._scene.pickPosition(event.endPosition));
        this._selectPlot.positions = [new Point(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude))];
      }
    }
    // if (!this._dragging) return;
    //
    // const viewer = this._plotLayer.getViewer();
    // const index = this._pickedBillboard.positionIndex;
    //
    // const { positions } = this._pickedPrimitive;
    // const endPosition = CesiumUtil.windowCoordToCartesian3(
    //   viewer,
    //   event.endPosition
    // );
    //
    // let cartographic = undefined;
    // // 控制点移除边界外，导致无法获取点
    // try {
    //   cartographic = Cesium.Cartographic.fromCartesian(endPosition);
    // } catch(e) {
    //   cartographic = undefined;
    // }
    // if (!cartographic) return;
    //
    // const billboardPos = Cesium.Cartesian3.fromDegreesArrayHeights([
    //   Cesium.Math.toDegrees(cartographic.longitude),
    //   Cesium.Math.toDegrees(cartographic.latitude),
    //   503,
    // ]);
    //
    // // eslint-disable-next-line prefer-destructuring
    // this._pickedBillboard.position = billboardPos[0];
    //
    // positions[index] = CesiumUtil.cartesian3ToDegrees(
    //   viewer.scene.globe.ellipsoid,
    //   endPosition
    // );
    //
    // this._pickedPrimitive.positions = positions;
  }

  _onLeftUp(event) {
    if (this._isChangePoisition) {
      this._isChangePoisition = false;
      this._enableCamera();
    }
    // if (!this._dragging) return;
    //
    // this._plotLayer.enableCameraInputs();
    // this._dragging = false;
  }

  enable() {
    this._plotLayer.on("selected", this.onSelected);
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

    this._plotLayer.off("selected", this.onSelected);
    this._scene.primitives.remove(this._billboards);
  }

  _disableCamera() {
    // 禁用默认相机控制事件
    this._scene.screenSpaceCameraController.enableRotate = false;
    this._scene.screenSpaceCameraController.enableTranslate = false;
    this._scene.screenSpaceCameraController.enableZoom = false;
    this._scene.screenSpaceCameraController.enableTilt = false;
    this._scene.screenSpaceCameraController.enableLook = false;
  }

  _enableCamera() {
    // 禁用默认相机控制事件
    this._scene.screenSpaceCameraController.enableRotate = true;
    this._scene.screenSpaceCameraController.enableTranslate = true;
    this._scene.screenSpaceCameraController.enableZoom = true;
    this._scene.screenSpaceCameraController.enableTilt = true;
    this._scene.screenSpaceCameraController.enableLook = true;
  }
}
