import {defined} from "../PlotUtilBase/Check";
import SymbolManager from "../../service/PlotBase/SymbolManager/SymbolManager";
import {DrawPlotObjectFactory3D} from "./Draw";
import {CesiumUtil} from "./Utils/CesiumUtil";
import Observable from "../../service/PlotUtilBase/Observable";
import EditTool from "./EditTool/EditTool";
import {PrimitiveFactory} from "./Primitive/PrimitiveFactory";
import * as turf from "@turf/turf";
import Point from "../PlotUtilBase/Geometry/Point";
import GeomUtil from "../PlotUtilBase/Geometry/GeomUtil";

/**
 * @class module:3DPlot.PlotLayer3D
 * @description 行业标绘图层
 * @author 基础平台-杨琨
 *
 * @param {Object} Cesium Cesium对象
 * @param {Object} viewer viewer
 * @param {Object} options 图层额外参数
 */
class PlotLayer3D extends Observable {
    constructor(Cesium, viewer, options) {
        super();
        options = options || {};
        let that = this;
        //viewer对象
        this._viewer = viewer;
        //primitive数组
        this._primitiveCollection = new Cesium.PrimitiveCollection();
        //图元可否编辑
        this._editable = false;
        //编辑工具
        this._editTool = new EditTool(this);
        //图层id
        this._id = "plotLayer_" + parseInt(String(Math.random() * 100000000));
        const {pickPlot, pickEventType = 0} = options
        //点击事件回调
        this._pickPlot = pickPlot;
        //点击事件类型
        this._pickEventType = pickEventType;
        //是否在绘制图元，绘制途中不触发pick事件
        this._isDrawing = false;

        //标绘图元拾取事件，针对vue组件做出的修改
        this._handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        this._setPickPlot();

        this._primitiveCollection._id = this._id;
        let scene = this._getScene();
        scene.primitives.add(this._primitiveCollection);
    }

    /**
     * @function module:PlotLayer3D.addPlot
     * @description 添加标绘图元
     * @param plot - {Plot} 必选项，要添加的标绘图元
     */
    addPlot(plot) {
        this._primitiveCollection.add(plot);
        return plot;
    }

    _getScene() {
        let {scene} = this._viewer;
        if (!scene) throw new Error("三维场景scene 未初始化");

        return scene;
    }

    /**
     * @function module:PlotLayer3D.removePlotByID
     * @description 根据标绘图元ID删除标绘图元
     * @param id - {String} 必选项，要删除的标绘图元ID
     * @return {Object} json，被删除的标绘图元
     */
    removePlotByID(id) {
        let plot = this.getPlotByID(id);
        return this.removePlot(plot);
    }

    /**
     * @function module:PlotLayer3D.removePlotByID
     * @description 删除标绘图元
     * @param plot - {Plot} 必选项，要删除的标绘图元
     * @return {Object} json
     */
    removePlot(plot) {
        let plotLayer = this._getPlotLayer();
        if (plotLayer) {
            return plotLayer.remove(plot);
        }
    }

    /**
     * @function module:PlotLayer3D.getPlotByID
     * @description 根据标绘图元ID获取标绘图元
     * @param id - {String} 必选项，标绘图元ID
     * @return {Object} json，没找到返回undefined
     */
    getPlotByID(id) {
        let plotLayer = this._getPlotLayer();

        if (!plotLayer) {
            return undefined;
        }

        let index = this._getPlotIndexById(id, plotLayer);
        const {_primitives} = plotLayer;
        if (index !== undefined) {
            return _primitives[index];
        }
        return undefined;
    }

    /**
     * @description 根据标绘图元ID获取标绘图元的index
     * @private
     *
     * @param id - {String} 必选项，标绘图元ID
     * @param plotLayer - {Object} 必选项，标绘图层
     * @return {Number} index
     */
    _getPlotIndexById(id, plotLayer) {
        let index = undefined;

        const {_primitives} = plotLayer;
        for (let i = 0; i < _primitives.length; i++) {
            if (id === _primitives[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }

    /**
     * @description 根据标绘图层ID获取标绘图层
     * @private
     *
     * @return {Object} plotLayer 标绘图层，没找到返回undefined
     */
    _getPlotLayer() {
        let scene = this._getScene();
        //根据图层id寻找标绘图层
        const {_primitives} = scene.primitives;
        //标绘图层
        let primitiveCollection;
        for (let i = 0; i < _primitives.length; i++) {
            if (this._id === _primitives[i]._id) {
                primitiveCollection = _primitives[i];
                break;
            }
        }

        return primitiveCollection;
    }

    /**
     * @function module:PlotLayer3D.removeAll
     * @description 移除图层下的所有标绘图元
     */
    removeAll() {
        let plotLayer = this._getPlotLayer();
        plotLayer.removeAll();
    }

    /**
     * @function module:PlotLayer3D.toJSON
     * @description 导出图层数据
     * @return {Object} json
     */
    toJSON() {
        let scene = this._getScene();

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
                this._addGeoJSONObject(s);
            });
        } else {
            // eslint-disable-next-line no-new
            new Error("GeoJSON类型错误，传入值非要素集！");
        }
    }

    _addGeoJSONObject(geoFeature) {
        let that = this;
        const id = geoFeature.properties.symbolId;

        const symbolManager = SymbolManager.instance;

        const leaf = symbolManager.getLeafByID(id);

        leaf.getElement().then(function (element) {
            const primitive = PrimitiveFactory.createInstance(element.type, {
                positions: element.positions,
                element,
            });

            primitive.fromGeoJSON(geoFeature);
            primitive.id = id + "_" + parseInt(String(Math.random() * 1000000000));

            that._addPrimitive(primitive);
        });
    }

    _addPrimitive(primitive) {
        this._primitiveCollection.add(primitive);
        return primitive;
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

    /**
     * @function module:PlotLayer3D.queryByGeometry
     * @description 标绘图元几何查询接口
     *
     * @param geometry {Object} 查询几何，经纬度组成的点或点数组
     * @param {String} [type = 'polygon'] 几何类型，支持point,polygon
     * @example
     * 点查询
     * queryByGeometry({x: 113, y: 40}, "point");
     */
    queryByGeometry(geometry, type) {
        //先暂时使用查询标绘图元控制点的方式，其他方式太耗费性能
        let plots = [];
        type = type || "polygon";
        if (!geometry) return;
        switch (type) {
            case "point":
                break;
            case "polygon":
                let newPoints = [];
                for (let i = 0; i < geometry.length; i++) {
                    newPoints.push([geometry[i].x, geometry[i].y]);
                }
                const {_primitives} = this._primitiveCollection;
                for (let i = 0; i < _primitives.length; i++) {
                    const {positions} = _primitives[i];
                    for (let j = 0; j < positions.length; j++) {
                        if (turf.booleanPointInPolygon(turf.point([positions[j].x, positions[j].y]), turf.polygon([newPoints]))) {
                            plots.push(_primitives[i]);
                            break;
                        }
                    }
                }
                break;
        }
        return plots;
    }

    addPrimitiveBy2DPlotObj(plotObj2D) {
        const element = plotObj2D.getElement();

        const primitive = PrimitiveFactory.createInstance(element.type, {
            positions: element.positions,
            element: element,
        });

        this._addPrimitive(primitive);

        return primitive;
    }

    _mercatorTolonlat(mercator) {
        let lonlat = {lon: 0, lat: 0};

        let x = mercator.x / 20037508.34 * 180;
        let y = mercator.y / 20037508.34 * 180;

        y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);

        lonlat.lon = x;
        lonlat.lat = y;

        return lonlat;
    };

    /**
     * @description 标绘图元拾取事件，绘制中途不会触发该事件，只有绘制图元结束才会触发
     * @private
     */
    _setPickPlot() {
        let that = this;
        this._handler.setInputAction((event) => {
            if(!that._isDrawing && that._pickPlot){
                const pick = viewer.scene.pick(event.position);
                if(pick && pick.primitive && pick.primitive.pickedPrimitive){
                    that._pickPlot(pick.primitive.pickedPrimitive)
                }
            }
        }, this._pickEventType);
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
            if (this._editable) {
                this._editTool.enable();
            }
        }
    },
    pickPlot: {
        get: function () {
            return this._pickPlot;
        },
        set: function (value) {
            this._pickPlot = value;
        }
    },
    pickEventType: {
        get: function () {
            return this._pickEventType;
        },
        set: function (value) {
            let that = this;
            this._handler.removeInputAction(this._pickEventType);
            this._pickEventType = value;
            this._setPickPlot();
        }
    }
});

export default PlotLayer3D;