import Point from '../../../../service/PlotUtilBase/Geometry/Point';
import { Vector2 } from '../../../PlotUtilBase/Math/Vector2';
import BasePlotPrimitive from '../BasePlotPrimitive';
import IrregularElementInstance from '../ElementInstance/IrregularElementInstance';

/**
 * @class module:3DPlot.BaseIrregularPrimitive
 * @description 非规则标绘图元基类
 * @author 基础平台-杨琨
 *
 * @param {Object} options 初始化参数
 */
class BaseIrregularPrimitive extends BasePlotPrimitive {
    constructor(options) {
        super(options);
    }

    /**
     * @function module:3DPlot.BaseIrregularPrimitive.update
     * @description 重载父类的update方法
     * @public
     * @override
     *
     * @param {Boolean} frameState 是否更新
     */
    update(frameState) {
        if (!this._elem || !this._elem.show) {
            return;
        }

        if (this._update) {
            let that = this;
            this._update = false;
            this._translucent = false;
            this._createGeomInstance(function (instanceObj) {
                const { instances, wallGeomInstances } = instanceObj;
                that.applySelectStatus(instances);
                that.instancesToPrimitives(instances);
                that.wallInstancesToPrimitive(wallGeomInstances);
                that.updatePrimitive(frameState);
            });
        } else {
            this.updatePrimitive(frameState);
        }
    }

    /**
     * @description: 处理最后两点绘制不闭合
     * @private
     *
     * @param {Array} coords 坐标点数组
     */
    _closeCoordsPath(coords) {
        if (!coords || coords.length < 3) return;
        const firstPnt = coords[0];
        const endPnt = coords[coords.length - 1];

        if (Math.abs(firstPnt.x - endPnt.x) < 10e-8 && Math.abs(firstPnt.y - endPnt.y) < 10e-8) {
            const secondPnt = coords[1];
            const lastPnt = new Vector2(secondPnt.x, secondPnt.y);
            coords.push(lastPnt);
        }
    }

    /**
     * @description 重载父类的_createGeomInstance方法
     * @private
     * @override
     *
     * @param {function} callback 回调函数
     * */
    _createGeomInstance(callback) {
        const webMercatorProjection = new Cesium.WebMercatorProjection();
        const projectPos = this._positions.map((s) => {
            var cartographic = Cesium.Cartographic.fromCartesian(s);
            var projectPnts = webMercatorProjection.project(cartographic);
            return new Point(projectPnts.x, projectPnts.y);
        });

        // 设置缩放参数
        const scale = this.getGlobelScale();
        this._elem.changeAttributeStatus(true, scale, scale);
        // 设置点
        this._elem.setPoints(projectPos);

        this._elementInstance(function (instance) {
            callback(instance);
        });
    }

    /**
     * @description 处理非规则几何方法
     * @private
     *
     * @param {function} callback 回调函数
     * */
    _elementInstance(callback) {
        new IrregularElementInstance(
            this._elem,
            Object.assign(this.getBaseSaveAttributesValues(), { globelScale: this.getGlobelScale() })
        ).getInstance(function (instance) {
            callback(instance);
        });
    }

    /**
     * @description: 重载父类的initBaseSaveAttributes方法
     * @function module:3DPlot.BaseIrregularPrimitive.initBaseSaveAttributes
     * @public
     * @override
     */
    initBaseSaveAttributes() {
        this.dimModHeight = this._modHeight;
        this.isOpenWall = true;
        this.isWallGradColor = false;
        this.wallColor = 'rgba(255,0,0,0.3)';
        this.wallGradColor = 'rgba(255,0,0,0.3)';
    }

    /**
     * @description: 重载父类的getPrimitiveBaseSaveAttributes方法
     * @function module:3DPlot.BaseIrregularPrimitive.initBaseSaveAttributes
     * @public
     * @override
     *
     * @return {Array} Attributes 字段数组
     */
    getPrimitiveBaseSaveAttributes() {
        return BaseIrregularPrimitive.extendPrimitiveAttributes.concat([]);
    }
}

BaseIrregularPrimitive.extendPrimitiveAttributes = ['dimModHeight', 'isOpenWall', 'isWallGradColor', 'wallColor', 'wallGradColor'];

export default BaseIrregularPrimitive;
