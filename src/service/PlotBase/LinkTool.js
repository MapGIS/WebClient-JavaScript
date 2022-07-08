import DrawTool from "./Draw/DrawTool";
import {PlotLayer3D} from "../3DPlot";
import {PlotLayer2D} from "../2DPlot";

/**
 * @description 二三维联动工具
 * @author 基础平台-杨琨
 * @param {Object} plotLayer 三维标绘图层、二维标绘图层或者图层基类
 * @param {Array} containers 图层容器数组
 * @param {Object} options 初始化参数
 * @param {Boolean} [isLinked = true] 是否进行联动
 */
class LinkTool {
    constructor(plotLayer, containers, options) {
        options = options || {};
        this._plotLayer = plotLayer;
        this._containers = containers;
        this._plotLayer._linkTool = this;
        this._mapContainer = undefined;
        this._extendLayers = [];

        const {isLinked = true} = options;
        //是否进行联动
        this._isLinked = isLinked;

        if (this._plotLayer instanceof PlotLayer3D) {
            this._mapContainer = this._plotLayer._viewer;
        } else if (this._plotLayer instanceof PlotLayer2D) {
            this._mapContainer = this._plotLayer._fabricCanvas.getMap();
        }

        this._initPlotLayers();
    }

    /**
     * @description 根据容器生成二三维标绘图层
     * @private
     */
    _initPlotLayers() {
        if (!this._containers) return;

        this._extendLayers = [];

        for (let i = 0; i < this._containers.length; i++) {
            let id, type, _plotLayer, _container = this._containers[i];
            if (_container._container) {
                type = "cesium";
                id = _container._container.id;
            } else {
                type = "mapbox";
                id = _container.mapContainer.parentElement && _container.mapContainer.parentElement.id
                || _container._containerId;
            }
            if (this._mapContainer._container.id !== id) {
                switch (type) {
                    case "mapbox":
                        _plotLayer = new PlotLayer2D();
                        const fabricCanvas = _container.getFabricCanvas();
                        const {_primitiveCollection} = this._plotLayer;
                        if (_primitiveCollection) {
                            const {_primitives} = _primitiveCollection;
                            for (let j = 0; j < _primitives.length; j++) {
                                _plotLayer.addPlotObjectBy3DPlotObj(_primitives[j]);
                            }
                        }
                        fabricCanvas.addLayer(_plotLayer);
                        break;
                    case "cesium":
                        const {m_plotObjects} = this._plotLayer;
                        if (!m_plotObjects) return;
                        _plotLayer = new PlotLayer3D(Cesium, _container);
                        _plotLayer.editable = true;
                        for (let j = 0; j < m_plotObjects.length; j++) {
                            _plotLayer.addPrimitiveBy2DPlotObj(m_plotObjects[j]);
                        }
                        break;
                }
                this._extendLayers.push(_plotLayer);
            }
        }
    }
}

Object.defineProperties(LinkTool.prototype, {
    isLinked: {
        get() {
            return this._isLinked;
        },
        set(v) {
            this._isLinked = v;
        }
    }
})

export default LinkTool;