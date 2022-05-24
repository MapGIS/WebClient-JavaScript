/*
 * @Author: your name
 * @Date: 2021-10-25 10:26:48
 * @LastEditTime: 2022-05-23 16:50:58
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\RegularLine1ElementInstance.js
 */

import { CesiumGeomUtil, CesiumUtil } from '../../Utils/CesiumUtil';
import MainElement from '../../../../service/PlotBase/SvgLoader/element/extend/MainElement';
import RegularLineElementInstance from './RegularLineElementInstance';

export default class SimpleLineElementInstance extends RegularLineElementInstance {
    pathElemToWallGeomInstance(pathElem, options, wallOffsetHeights) {
        if (!(pathElem instanceof MainElement)) return undefined;
        return super.pathElemToWallGeomInstance(pathElem, options, wallOffsetHeights);
    }

    transfromGeoCesium(elem, cesgeo, options) {
        super.transfromGeoCesium(elem, cesgeo, options);
        const { dimModAttitude } = options;

        if (dimModAttitude === '1' && cesgeo.modDetail && elem.getPose && elem.getPose() === '1') {
            this._rotatePart(elem, cesgeo, options);
        }
    }

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
