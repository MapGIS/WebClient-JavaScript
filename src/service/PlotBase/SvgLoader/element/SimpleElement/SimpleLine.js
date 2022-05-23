/* eslint-disable default-case */
import Matrix3 from '../../../../PlotUtilBase/Math/Matrix3';
import Point from '../../../../PlotUtilBase/Geometry/Point';
import Spline from '../../../../PlotUtilBase/Geometry/Spline';
import DefaultLinePathParser from '../Default/DefaultLine';
import ExtendLineElement from '../extend/ExtendLineElement';
import BaseSimple from './BaseSimple';
import NoUseElement from '../extend/NoUseElement';
import TSpanElement from '../TSpanElement';
import MainLineElement from '../extend/MainLineElement';

class SimpleLine extends BaseSimple {
    constructor(node) {
        super(node);
        this.type = 'simpleline';
        this.defaultLine = this._getMainDefaultLine();
        this.initBaseAttributes(node);
    }

    _initValues() {
        super._initValues();
        // 获取轴线组
        this._extendLineArr = [];
    }
    _getMainDefaultLine() {
        for (let i = 0; i < this._extendLineArr.length; i++) {
            const v = this._extendLineArr[i].getDefaultLine();
            if (v && (v.getStart().y === this.height / 2 || v.getEnd().y === this.height / 2)) {
                return v;
            }
        }
        return new DefaultLinePathParser(`m 0,${this.height / 2} ${this.width},0`);
    }

    initBaseAttributes(node) {
        super.initBaseAttributes(node);
        if (this.getAttribute('zondyPlotSymbol:type').getValue() !== '1') {
            throw new Error('符号类型不一致！');
        }
    }

    getSaveBaseAttributes() {
        const attributes = super.getSaveBaseAttributes();
        return this._getSaveBaseAttributes(SimpleLine, attributes);
    }

    _replaceChild(node, ele) {
        const useStyle = this._getUseStyle(ele);

        if (SimpleLine.sliceTypes.indexOf(useStyle) === -1) {
            const nouse = new NoUseElement(document.createElement('svg'));
            return nouse;
        }

        if (useStyle === '10' || useStyle === '11') {
            this.isExtendLine = true;
            if (node.nodeName === 'g') {
                let childNode = node.firstElementChild;

                let i = 0;
                while (childNode) {
                    if (childNode.nodeName === 'path') {
                        let extendElement;
                        if (useStyle === '11') {
                            extendElement = new ExtendLineElement(childNode);
                        } else {
                            extendElement = new MainLineElement(childNode);
                        }

                        this._extendLineArr.push(extendElement);
                        ele._children[i] = extendElement;
                        extendElement._parent = ele;
                    }
                    i = i + 1;
                    childNode = childNode.nextElementSibling;
                }
                return ele;
            }
            if (node.nodeName === 'path') {
                let extendElement;
                if (useStyle === '11') {
                    extendElement = new ExtendLineElement(node);
                } else {
                    extendElement = new MainLineElement(node);
                }

                this._extendLineArr.push(extendElement);
                return extendElement;
            }
        }
        if (useStyle === '12' || useStyle === '13') {
            this._travelElementArr(ele._children, (s) => {
                this.applyPartElement(s);
            });
            if (node.nodeName !== 'g') {
                this.applyPartElement(ele);
            }
            return ele;
        }
        return ele;
    }

    _applyElementTransfrom(element) {
        const type = this._getUseStyle(element);
        switch (type) {
            case '12': {
                this._dupAction(element);
                break;
            }
            case '13': {
                this._nonAction(element);
                break;
            }
        }
    }
    _applyMainElement(child) {
        const flag = this._is3d ? -1 : 1;
        const v = (this.height / 2 - new DefaultLinePathParser(child.getAttribute('d').getString()).getStart().y) * flag;

        if (!this.poly || this.poly.length < 2) {
            return;
        }

        const _spline = new Spline(this.poly, {
            offset: v * this.m_scaleY,
            maxPoint: this.getInsertGeometryPoint(15)
        });

        child.applyMainGeo(_spline, this.width);
        child.applyMapScale(this.m_scaleX, this.m_scaleY, this.width);
    }

    _clone(cloneObject) {
        super._clone(cloneObject);
        cloneObject.isExtendLine = this.isExtendLine;
        cloneObject.mainLine = this.mainLine.clone();
    }

    _getPathRate(gOrigin, mainLine, defaultLine, width, flag) {
        const lengTotal = mainLine.lengthArr.reduce((total, current) => total + current);

        const start = defaultLine.getStart();
        const end = defaultLine.getEnd();

        const offsetX = gOrigin.x - start.x;
        const offsetY = gOrigin.y - start.y;

        const startRate = (start.x * this.m_scaleX) / lengTotal;
        const endRate = ((width - end.x) * this.m_scaleX) / lengTotal;

        const mainLineRate = 1 - startRate - endRate;
        const _eleMainLineRate = (offsetX / (end.x - start.x)) * mainLineRate + startRate;

        const offsetRate = flag ? _eleMainLineRate : 1 - _eleMainLineRate;

        return [offsetRate, offsetX, offsetY];
    }

    _nonAction(element) {
        // 子节点调用
        const { width, defaultLine, poly } = this;
        const arrowDir = element.getPose() === '0' ? false : true;

        let flag = true;
        let gOrigin = element.getOriginPoint();

        let scaleX = 1;
        let scaleY = 1;
        let matrix = new Matrix3();

        if (!gOrigin || Number.isNaN(gOrigin.x) || Number.isNaN(gOrigin.y || !poly) || !this.mainLine) {
            return;
        }
        //计算偏移百分比和y轴上的偏移量
        const [offsetRate, , offsetY] = this._getPathRate(gOrigin, this.mainLine, defaultLine, width, flag);

        if (offsetRate > 1 || offsetRate < 0) {
            // 控制输出 getCoords 全不输出
            element.isAllowCoords = false;
            return;
        }

        const tran = this.mainLine.getTransfromByRate(offsetRate);
        if (!tran) return;

        let rotateAngle = 0;
        const [pnt, lineangle] = tran;
        const translatePoint = new Point(pnt[0] - gOrigin.x, pnt[1] - gOrigin.y + offsetY);

        const origin = Point.newSub(gOrigin, 0, offsetY);

        // 直线坐标系下角度转屏幕坐标系角度
        // 角度乘以-1
        rotateAngle = -lineangle;

        if (this._is3d) {
            this._run3d(matrix, origin);
        }

        // 控制点组调换把初始svg符号翻转
        if (!flag) {
            scaleX = -1;
            scaleY = 1;
        }
        // 修改有部件需要上下翻转的情况
        if (rotateAngle < -90 || rotateAngle > 90) {
            if (arrowDir) {
                scaleY = -scaleY;
            }
        }

        if ((rotateAngle < -90 && rotateAngle > -180) || (rotateAngle > 90 && rotateAngle < 180)) {
            // 处理文字的翻转
            if (element instanceof TSpanElement) {
                const bounds = element.getBoundingBox();
                const center = bounds.getCenter();
                this._runScale(matrix, center, -1, 1);
            }
        }
        this._applyNormalMatrixTransfrom(matrix, origin, translatePoint, rotateAngle, scaleX, scaleY, this.m_scaleX, this.m_scaleY);

        let _lineangle = lineangle;
        if (arrowDir) {
            if (_lineangle < -90 || _lineangle >= 90) {
                _lineangle = 180 + _lineangle;
            }
        }

        element._transformMatrix = matrix;
        element._dimModal.clear();
        element._dimModal.push({
            originPoint: origin.clone(),
            lineAngle: _lineangle
        });
    }

    _dupAction(element) {
        let pntInfo;
        let origin;
        let trueOrigin;
        let lineAngles = [];
        let originPoints = [];
        const matrixs = [];
        const { mainLine } = this;

        if (!mainLine || !this._isDraw()) return;
        // 判断是否有延伸线
        if (this.isExtendLine) {
            origin = element.getOriginPoint();
            const offsetY = origin.y - 0.5 * this.height;
            const offsetRate = origin.x / this.width;
            pntInfo = mainLine.getPntInfoBywidth(this.width * this.m_scaleX, offsetRate);

            if (pntInfo && pntInfo.length > 0) {
                for (let i = 0; i < pntInfo.length; i++) {
                    let matrix = new Matrix3();
                    const [tranV, angle] = pntInfo[i];
                    const translatePoint = Point.newSub(Point.newAdd(new Point(tranV[0], tranV[1]), 0, offsetY), origin.x, origin.y);
                    trueOrigin = new Point(origin.x, 0.5 * this.height);

                    // 注：角度翻转后问题
                    // 根据getPntInfoBywidth函数算出的角度默认是在直角坐标系下的
                    // 因此角度在二维上使用时必须加一个-1，三维上则还原
                    // 进行镜面翻转时（即scale（1，-1））,角度方向又发生变化，因此必须加乘以-1
                    let _angle = -angle;
                    if (this._is3d) {
                        this._run3d(matrix, trueOrigin);
                        // 第一步 回正角度
                        _angle = -_angle;
                        // 第二步 解决翻转后角度变化的问题
                        _angle = -_angle;
                    }

                    this._applyNormalMatrixTransfrom(matrix, trueOrigin, translatePoint, _angle, 1, 1, this.m_scaleX, this.m_scaleY);
                    matrixs.push(matrix);
                    lineAngles.push(-_angle);
                    originPoints.push(trueOrigin);
                }
            }
        } else {
            origin = new Point(0, 0.5 * this.height);
            trueOrigin = new Point(origin.x, 0.5 * this.height);
            pntInfo = mainLine.getPntInfoBywidth(this.width * this.m_scaleX);

            if (pntInfo && pntInfo.length > 0) {
                let tempPoint = new Point(pntInfo[0][0][0], pntInfo[0][0][1]);
                for (let i = 1; i < pntInfo.length; i++) {
                    let matrix = new Matrix3();
                    const rad = Math.atan2(pntInfo[i][0][1] - tempPoint.y, pntInfo[i][0][0] - tempPoint.x);
                    const angle = (180 * rad) / Math.PI;
                    const translatePoint = Point.newSub(tempPoint, trueOrigin.x, trueOrigin.y);

                    let _angle = -angle;
                    if (this._is3d) {
                        this._run3d(matrix, trueOrigin);
                    }

                    this._applyNormalMatrixTransfrom(matrix, trueOrigin, translatePoint, _angle, 1, 1, this.m_scaleX, this.m_scaleY);

                    matrixs.push(matrix);
                    lineAngles.push(-_angle);
                    originPoints.push(trueOrigin);

                    tempPoint = this._getDuplicateEndPoint(tempPoint, this.width * this.m_scaleX, rad);
                }
            }
        }
        element._transformMatrix = matrixs;
        element._dimModal.clear();
        element._dimModal.setTranslatePoints(originPoints);
        element._dimModal.setLineAngles(lineAngles);
    }

    /**
     * @description: 获取element使用方式
     * @param {*} element
     * @return {*}
     */
    _getUseStyle(element) {
        let type;
        if (
            element.getAttribute('zondyPlotSymbolItem:type').hasValue() ||
            (element._parent && element._parent.getAttribute('zondyPlotSymbolItem:type').hasValue())
        ) {
            type =
                element.getAttribute('zondyPlotSymbolItem:type').getValue() ||
                (element._parent && element._parent.getAttribute('zondyPlotSymbolItem:type').getValue());
        } else {
            type = '13';
        }
        return type;
    }

    /**
     * @description: 判断是否进行绘制
     * @param {*}
     * @return {Boolean}
     */
    _isDraw() {
        if (!this.poly || this.poly.length <= 1) {
            return false;
        }
        return true;
    }

    /**
     * @description: 计算倾角方向按距离去点
     * @param {*} tempPoint
     * @param {*} dis
     * @param {*} angle
     * @return {*}
     */
    _getDuplicateEndPoint(tempPoint, dis, angle) {
        const offsetX = dis * Math.cos(angle);
        const offsetY = dis * Math.sin(angle);
        return Point.newAdd(tempPoint, offsetX, offsetY);
    }

    setPoints(points) {
        super.setPoints(points);
        if (points.length > 1) {
            this.mainLine = new Spline(this.poly, {
                maxPoint: this.getInsertGeometryPoint(10)
            });
            this.traverChildren();
        }
    }
}

SimpleLine.sliceTypes = ['10', '11', '12', '13'];

export default SimpleLine;
