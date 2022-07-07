import { CesiumGeomUtil, CesiumUtil } from '../../Utils/CesiumUtil';
import MainElement from '../../../PlotBase/SvgLoader/element/extend/MainElement';
import RegularLineElementInstance from './RegularLineElementInstance';

/**
 * @class module:3DPlot.SimpleLineElementInstance
 * @description SVG的新规则线符号解析基类
 * @author 基础平台-杨琨
 */
export default class SimpleLineElementInstance extends RegularLineElementInstance {

    /**
     * @function module:3DPlot.SimpleLineElementInstance.pathElemToWallGeomInstance
     * @description 重载父类的pathElemToWallGeomInstance方法
     * @public
     * @override
     *
     * @param {Object} pathElem SVG的path符号对象
     * @param {Object} options 额外参数
     * @param {Array} wallOffsetHeights 开启高程采样是墙体的抬高高度数组
     */
    pathElemToWallGeomInstance(pathElem, options, wallOffsetHeights) {
        if (!(pathElem instanceof MainElement)) return undefined;
        return super.pathElemToWallGeomInstance(pathElem, options, wallOffsetHeights);
    }

    /**
     * @function module:3DPlot.SimpleLineElementInstance.transfromGeoCesium
     * @description: 重载父类的transfromGeoCesium方法
     * @public
     * @override
     *
     * @param {Object} elem SVG符号对象
     * @param {Object} cesgeo 三维几何体对象
     * @param {Object} options 额外参数
     */
    transfromGeoCesium(elem, cesgeo, options) {
        super.transfromGeoCesium(elem, cesgeo, options);
        const { dimModAttitude } = options;

        if (dimModAttitude === '1' && cesgeo.modDetail && elem.getPose && elem.getPose() === '1') {
            this._rotatePart(elem, cesgeo, options);
        }
    }

    /**
     * @description: 对三维几何体机型坐标系转化，墨卡托转经纬度
     * @private
     *
     * @param {Object} ele SVG符号对象
     * @param {Object} cesGeom 三维几何体对象
     * @param {Object} options 额外参数
     */
    _rotatePart(ele, cesGeom, options) {
        const { dimModHeight } = options;
        if (ele instanceof MainElement) return;

        const translatePoint = cesGeom.modDetail.originPnt;
        let lineAngle = cesGeom.modDetail.lineAngle;

        const t = CesiumUtil.WebMercatorUnProject(translatePoint.x, translatePoint.y);

        const originPnt = Cesium.Cartesian3.fromDegreesArrayHeights([t.x, t.y, dimModHeight])[0];

        const rad = Cesium.Math.toRadians(lineAngle);
        const _axis = new Cesium.Cartesian3(Math.cos(rad), Math.sin(rad), 0);
        const axis = Cesium.Cartesian3.normalize(_axis, new Cesium.Cartesian3());

        const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(originPnt);

        const matrixInverse = Cesium.Matrix4.inverseTransformation(matrix, new Cesium.Matrix4());

        CesiumGeomUtil.transform(cesGeom, matrixInverse);
        CesiumGeomUtil.rotateAxis(cesGeom, axis, new Cesium.Cartesian3(0, 0, 0), new Cesium.Cartesian3(1, 1, 1), Math.PI / 2);
        CesiumGeomUtil.transform(cesGeom, matrix);
    }
}
