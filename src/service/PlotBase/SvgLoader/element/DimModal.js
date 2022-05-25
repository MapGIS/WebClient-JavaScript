import Point from '../../../PlotUtilBase/Geometry/Point';
/*
 * @Description: 三维控制点几何
 * @Author: zk
 * @Date: 2021-11-16 11:04:30
 * @LastEditors: zk
 * @LastEditTime: 2022-05-24 16:33:39
 */
export default class DimModal {
    constructor(element) {
        // element
        this._elem = element;
        this.lineAngles = [];
        this.translatePoints = [];
        this.translatePnts = null;
    }

    clear() {
        this.lineAngles = [];
        this.translatePoints = [];
        this.translatePnts = null;
    }

    setTranslatePoints(arr) {
        this.translatePoints = arr;
    }

    getTranslatePoints() {
        return this.translatePoints;
    }

    setLineAngles(lineAngles) {
        this.lineAngles = lineAngles;
    }

    getLineAngles() {
        return this.lineAngles;
    }

    push(object) {
        const {originPoint, lineAngle} = object;
        this.translatePoints.push(originPoint);
        this.lineAngles.push(lineAngle);
    }

    get(i) {
        const oLen = this.translatePoints.length;
        const lLen = this.lineAngles.length;
        let fIndex = i
        if (oLen === 0 || 0 === lLen) {
            return undefined
        }

        if (!this.translatePnts) {
            const elem = this._elem;
            const transformMatrix = elem._getTransform();
            let transforms = [];
            if (!Array.isArray(transformMatrix)) {
                transforms = [transformMatrix];
            } else {
                transforms = transformMatrix;
            }

            const trueMatrixs = transforms.map((s) => {
                return s.clone();
            });

            this.translatePnts = trueMatrixs.map((tureMatrix, index) => {
                return this.translatePoints[index].clone().applyMatrix3(tureMatrix);
            });
        }

        if (lLen === 1 || oLen === 1) {
            fIndex = 0
        }

        return {
            originPnt: this.translatePnts[fIndex],
            lineAngle: this.lineAngles[fIndex]
        };
    }
}