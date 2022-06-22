import axios from "axios";
import {Check, defined} from "../../PlotUtilBase/Check";
import {CesiumUtil} from "../Utils/CesiumUtil";
import BasePlotPrimitive from "../Primitive/BasePlotPrimitive";
import Point from "../../PlotUtilBase/Geometry/Point"
import * as turf from "@turf/turf";

/**
 * @class module:3DPlot.EditTool
 * @description 三维编辑工具
 * @author 基础平台-杨琨
 *
 * @param {Object} layer 标绘图层
 * @param options - {Object} 额外参数
 * @param {Object} [options.positionIcon] 位置控制点的绘制参数，参考cesium的billboard参数
 * @param {Object} [options.shapeIcon] 形状控制点的绘制参数，参考cesium的billboard参数
 */
export default class EditTool {
    constructor(layer, options) {
        options = options || {};
        const {positionIcon = {}, shapeIcon = {}} = options
        //标绘图层
        this._plotLayer = layer;
        //scene对象
        this._scene = this._plotLayer._viewer.scene;
        //是否移动位置点
        this._isChangePoisition = false;
        //是否改变形状
        this._isChangeShape = false;
        //位置点的广告牌对象
        this._positionBillboards = undefined;
        //形状控制点
        this._shapeBillboards = undefined;
        //当前选中的标绘图元
        this._selectPlot = undefined;
        //控制点高度
        this._controlHeight = 0;
        //形状控制点
        this._shapePoint = undefined;

        //位置点图标
        this._defaultIcon = "data:image/svg+xml;base64,77u/PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0nVVRGLTgnIHN0YW5kYWxvbmU9J25vJz8+PCEtLSBDcmVhdGVkIHdpdGggSW5rc2NhcGUgKGh0dHA6Ly93d3cuaW5rc2NhcGUub3JnLykgLS0+DQo8c3ZnIHdpZHRoPSI0ODAiDQogICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIiB2ZXJzaW9uPSIxLjEiDQogICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjQ4MCINCiAgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiBpZD0ic3ZnMiINCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iDQogICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQogICAgPGRlZnMgaWQ9ImRlZnMzMDA5Ii8+DQogICAgPG1ldGFkYXRhIGlkPSJtZXRhZGF0YTciPg0KICAgICAgICA8cmRmOlJERj4NCiAgICAgICAgICAgIDxjYzpXb3JrIHJkZjphYm91dD0iIj4NCiAgICAgICAgICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgICAgICAgICA8ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIi8+DQogICAgICAgICAgICAgICAgPGRjOnRpdGxlLz4NCiAgICAgICAgICAgIDwvY2M6V29yaz4NCiAgICAgICAgPC9yZGY6UkRGPg0KICAgIDwvbWV0YWRhdGE+DQogICAgPG1zYmwgQW5nbGU9IjkwIiBBdHRpdHVkZT0iMSIgeE9yaWdpbj0iMC41IiBUeXBlPSJtc2JsX3JlZ3VsYXJwb2ludCIgeU9yaWdpbj0iMC41IiBOYW1lPSLlm6LnuqciIGlkPSJkc2MyOTk0Ii8+DQogICAgPCEtLSBSb3RhdGVQb2xpY3kgIDA656aB5q2i5peL6L2sICAxOuayv+edgOWJjei/m+eahOaWueWQkSAgMjrlnoLnm7Tkuo7liY3ov5vnmoTmlrnlkJEtLT4NCiAgICA8XzNEIE1vZGVsPSIiIGlkPSJfM0QzMDI0Ii8+DQogICAgPGNpcmNsZSBjeD0iMjQwIiBjeT0iMjQwIiBzdHlsZT0iZmlsbDojM0M2RUJFO3N0cm9rZTojZmZmZmZmO3N0cm9rZS13aWR0aDo0OCIgcj0iMjQwIi8+DQo8L3N2Zz4=";
        this._positionIcon = positionIcon;
        //控制点图标
        this._shapeIcon = shapeIcon;

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

    _setSelectPlot(id) {
        if (id && id !== this._selectPlot.id) {
            this._selectPlot = this._plotLayer.getPlotByID(id);
        }
    }

    _onLeftDown(event) {
        let that = this;
        //拾取标绘图元
        const pick = this._scene.pick(event.position);

        if (!defined(pick)) return;

        let {primitive} = pick;
        let {pointType, _plotId} = primitive;

        if (defined(primitive)) {
            //是位置控制点
            if (pointType && pointType === "positionControl") {
                this._setSelectPlot();
                this._disableCamera();
                this._isChangePoisition = true;
            } else if (pointType && pointType === "shapeControl") {
                this._setSelectPlot();
                this._disableCamera();
                this._isChangeShape = true;
                this._shapePoint = primitive;
            } else if (defined(primitive.pickedPrimitive)) {
                //是标绘图元
                let {positions} = primitive.pickedPrimitive;
                //暂存标绘图元
                that._selectPlot = primitive.pickedPrimitive;
                //获取控制点高度
                const {dimModHeight = 0} = that._selectPlot;
                that._controlHeight = dimModHeight + 100;
                //获取控制点类型
                const {type} = that._selectPlot._elem;
                switch (type) {
                    //规则点
                    case "msbl_regularpoint":
                    case "simplepoint":
                        //设置位移点
                        that._setPositionControl(Cesium.Cartesian3.fromDegrees(positions[0].x, positions[0].y, that._controlHeight), undefined, primitive.pickedPrimitive);
                        break;
                    //规则区一
                    case "msbl_regularsurface":
                    //规则区二
                    case "msbl_kidneyarea":
                    //规则线一
                    case "msbl_regularline1":
                    //规则线二
                    case "msbl_regularline2":
                    //非规则符号
                    case "msbl_AssaultArrow":
                    case "msbl_MultiArrow":
                    case "msbl_CombinationalCircle":
                    case "msbl_AntiAircraftGroup":
                    case "msbl_cannonGroup":
                    case "msbl_Kidney":
                    case "msbl_doublearrow":
                    case "msbl_singleArrow":
                    case "msbl_squadarrow":
                    case "msbl_FigureFan":
                    case "simplearea":
                    case "simpleline":
                        let cneter = this._getCenter(that._selectPlot.positions);
                        //设置位置控制点
                        that._setPositionControl(Cesium.Cartesian3.fromDegrees(cneter.geometry.coordinates[0], cneter.geometry.coordinates[1], that._controlHeight), undefined, primitive.pickedPrimitive);
                        //设置几何控制点
                        //经纬度转笛卡尔坐标点
                        let newPositions = [];
                        for (let i = 0; i < positions.length; i++) {
                            newPositions.push(Cesium.Cartesian3.fromDegrees(positions[i].x, positions[i].y, that._controlHeight));
                        }
                        this._setShapeControl(newPositions, {
                            primitive: primitive.pickedPrimitive
                        });
                        break;
                }
            }
        }
    }

    _onMouseMove(event) {
        //获取鼠标点的笛卡尔坐标
        let mouseCartesian = CesiumUtil.windowCoordToCartesian3(
            this._plotLayer._viewer,
            event.endPosition
        );
        //获取上一次鼠标点的笛卡尔坐标
        let prevMouseCartesian = CesiumUtil.windowCoordToCartesian3(
            this._plotLayer._viewer,
            event.startPosition
        );
        if(!mouseCartesian || !prevMouseCartesian) return;
        //转化为经纬度坐标
        let mouseCartographic = Cesium.Cartographic.fromCartesian(mouseCartesian);
        //设置位置点高度
        mouseCartographic.height = 600;
        //计算平移距离
        let cartographicStart = Cesium.Cartographic.fromCartesian(prevMouseCartesian);
        let cartographicEnd = Cesium.Cartographic.fromCartesian(mouseCartesian);
        let offsetLng = Cesium.Math.toDegrees(cartographicEnd.longitude - cartographicStart.longitude);
        let offsetLat = Cesium.Math.toDegrees(cartographicEnd.latitude - cartographicStart.latitude);
        if (this._isChangePoisition) {
            let billboard = this._positionBillboards.get(0);
            const {type} = this._selectPlot._elem;
            //更新位置点坐标
            billboard.position = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(mouseCartographic.longitude), Cesium.Math.toDegrees(mouseCartographic.latitude), mouseCartographic.height);
            //更新标绘图元位置坐标
            switch (type) {
                //规则点一
                case "msbl_regularpoint":
                case "simplepoint":
                    let cartographic = Cesium.Cartographic.fromCartesian(mouseCartesian);
                    this._selectPlot.positions = [new Point(Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude))];
                    break;
                //规则区一
                case "msbl_regularsurface":
                //规则区二
                case "msbl_kidneyarea":
                //规则线一
                case "msbl_regularline1":
                //规则线二
                case "msbl_regularline2":
                //非规则符号
                case "msbl_MultiArrow":
                case "msbl_CombinationalCircle":
                case "msbl_AntiAircraftGroup":
                case "msbl_cannonGroup":
                case "msbl_Kidney":
                case "msbl_doublearrow":
                case "msbl_singleArrow":
                case "msbl_squadarrow":
                case "msbl_FigureFan":
                case "simplearea":
                case "simpleline":
                    //形状控制点
                    let shapeBillboards = this._shapeBillboards;
                    //平移图元和形状控制点
                    let newPositions = [];
                    let positions = this._selectPlot.positions;
                    for (let i = 0; i < positions.length; i++) {
                        let shapePoint = shapeBillboards.get(i);
                        shapePoint.position = Cesium.Cartesian3.fromDegrees(positions[i].x + offsetLng, positions[i].y + offsetLat, 600);
                        newPositions.push(new Point(positions[i].x + offsetLng, positions[i].y + offsetLat));
                    }
                    this._selectPlot.positions = newPositions;
                    break;
            }
        } else if (this._isChangeShape) {
            let {pointIndex} = this._shapePoint;
            for (let i = 0; i < this._shapeBillboards.length; i++) {
                let shapePoint = this._shapeBillboards.get(i);
                shapePoint._isEdit = true;
            }
            this._shapePoint.position = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(mouseCartographic.longitude), Cesium.Math.toDegrees(mouseCartographic.latitude), 600);
            let positions = this._selectPlot.positions, newPositions = [];
            for (let i = 0; i < positions.length; i++) {
                newPositions.push(new Point(positions[i].x, positions[i].y));
            }
            newPositions[pointIndex].x += offsetLng;
            newPositions[pointIndex].y += offsetLat;
            this._selectPlot.positions = newPositions;
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
        if (this._isChangeShape) {
            for (let i = 0; i < this._shapeBillboards.length; i++) {
                let shapePoint = this._shapeBillboards.get(i);
                shapePoint._isEdit = false;
            }
            this._isChangeShape = false;
            this._enableCamera();
        }
        // if (!this._dragging) return;
        //
        // this._plotLayer.enableCameraInputs();
        // this._dragging = false;
    }

    /**
     * @description 启用编辑工具
     * @function module:3DPlot.EditTool.enable
     */
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

    /**
     * @description 停用编辑工具
     * @function module:3DPlot.EditTool.disable
     */
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

    /**
     * @description 获取几何中心点
     * @private
     *
     * @param positions - {Array} 必选项，点数组
     * @return {Object} center 中心点
     */
    _getCenter(positions) {
        let points = [];
        for (let i = 0; i < positions.length; i++) {
            points.push(turf.point([positions[i].x, positions[i].y]));
        }

        return turf.center(turf.featureCollection(points));
    }

    /**
     * @description 设置位置控制点
     * @private
     *
     * @param position - {Cartesian3} 必选项，控制点坐标
     * @param name - {String} 可选项，控制点名称
     * @param primitive - {Object} 必选项，标绘图元
     */
    _setPositionControl(position, name, primitive) {
        name = name || "LineEditToolCtrlPnts";

        const {_positionBillboards} = primitive;
        if (!primitive) return;
        if (!_positionBillboards) {
            let billboards = new Cesium.BillboardCollection();
            let option = {
                position: position,
                image: this._defaultIcon,
                sizeInMeters: true,
                id: name,
                scale: 4
            };
            option = Object.assign(option, this._positionIcon);
            billboards.add(option);
            let billboard = billboards.get(0);
            billboard.pointType = "positionControl";
            billboard._plotId = primitive.id;
            this._scene.primitives.add(billboards);
            this._positionBillboards = billboards;
            primitive._positionBillboards = billboards;
        }
    }

    /**
     * @description 设置形状控制点
     * @private
     *
     * @param positions - {Array} 必选项，控制点坐标
     * @param options - {Object} 可选项，额外参数
     * @param {Number} [options.height = 0] 可选项，控制点高度
     * @param {String} [options.name = "EditToolShapePoints"] 可选项，控制点名称
     */
    _setShapeControl(positions, options) {
        options = options || {};
        let height = options.height || 0;
        let name = options.name || "EditToolShapePoints";
        let {primitive} = options;
        if (!primitive) return;
        const {_shapeBillboards} = primitive;
        if (!_shapeBillboards) {
            let billboards = new Cesium.BillboardCollection();
            //设置控制点
            for (let i = 0; i < positions.length; i++) {
                let position = Cesium.Cartesian3.clone(positions[i]);
                position.height = height;
                let option = {
                    position: position,
                    image: this._defaultIcon,
                    sizeInMeters: true,
                    id: name,
                    scale: 4
                };
                option = Object.assign(option, this._shapeIcon);
                billboards.add(option);
            }
            //在控制点上添加额外属性
            for (let i = 0; i < positions.length; i++) {
                let billboard = billboards.get(i);
                billboard.pointType = "shapeControl";
                billboard.pointIndex = i;
                billboard._plotId = primitive.id;
                billboard._isEdit = false;
            }
            this._scene.primitives.add(billboards);
            this._shapeBillboards = billboards;
            primitive._shapeBillboards = billboards;
        }
    }
}
