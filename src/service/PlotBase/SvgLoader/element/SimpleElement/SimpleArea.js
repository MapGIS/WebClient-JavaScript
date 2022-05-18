import Matrix3 from '../../../../PlotUtilBase/Math/Matrix3';
import Point from '../../../../PlotUtilBase/Geometry/Point';
import Bounds from '../../../../PlotUtilBase/Geometry/Bound';
import MainBorderElement from '../extend/MainBorderElement';
import Spline from '../../../../PlotUtilBase/Geometry/Spline';
import NoUseElement from '../extend/NoUseElement';
import BaseSimple from './BaseSimple';
import { calculatePolygonGravityCenter } from '../../../../PlotUtilBase/Math/MathUtils';

class SimpleArea extends BaseSimple {
    /**
     * mainBorderElement
     * border_ID
     * fillElementArr
     * fillImg
     */
    constructor(node) {
        super(node);
        this.type = 'simplearea';
        // 填充img
        this.fillImg = null;
        // 是否允许填充
        this._isMustFill = false;
        this.initBaseAttributes(node);
    }
    _initValues() {
        super._initValues();
        // 获取轴线组
        this._mainAreaArr = [];
        // 获取填充组
        this.fillElementArr = [];
    }

    _replaceChild(node, ele) {
        const useStyle = this._getUseStyle(ele);

        if (SimpleArea.sliceTypes.indexOf(useStyle) === -1) {
            const nouse = new NoUseElement(document.createElement('svg'));
            return nouse;
        }
        // 轴线解析
        if (useStyle === '10') {
            if (node.nodeName === 'g') {
                let childNode = node.firstElementChild;
                let i = 0;
                while (childNode) {
                    const mainArea = new MainBorderElement(childNode);
                    this._mainAreaArr.push(mainArea);
                    ele._children[i] = mainArea;
                    mainArea._parent = ele;
                    i = i + 1;
                    childNode = childNode.nextElementSibling;
                }
                return ele;
            } else {
                const mainArea = new MainBorderElement(node);
                this._mainAreaArr.push(mainArea);
                return mainArea;
            }
        }
        // 填充部件
        if (useStyle === '21') {
            const nouse = new NoUseElement(document.createElement('div'));
            if (node.nodeName === 'g') {
                this._travelElementArr(ele._children, (s) => {
                    this.fillElementArr.push(s);
                });
            } else {
                this.fillElementArr.push(ele);
            }
            return nouse;
        }
        // 中心部件
        // 点部件
        if (useStyle === '13' || useStyle === '22') {
            this._travelElementArr(ele._children, (s) => {
                this.applyPartElement(s);
            });
            if (node.nodeName !== 'g') {
                this.applyPartElement(ele);
            }
            return ele;
        }
    }

    initBaseAttributes(){
        super.initBaseAttributes()
        if (this.getAttribute('zondyPlotSymbol:type').getValue()!== '2') {
            throw new Error('符号类型不一致！');
        }
    }
    applyPartElement(ele) {
        super.applyPartElement(ele);
        const markerOffset = this._getMarkerOffset(ele);
        ele.getMarkerOffset = function () {
            return markerOffset;
        };
    }
    _getMarkerOffset(ele) {
        return this._getSourceAttribute(ele, 'zondyPlotSymbolItem:markerOffset', '0');
    }
    _getMainLineNode(node, id) {
        let mainNode = null;
        if (node.id && new RegExp(node.id, 'i').test(id)) {
            if (node.tagName === 'g') {
                let child = node.firstElementChild;
                while (child) {
                    if (child.tagName === 'path' || child.tagName === 'rect') {
                        mainNode = child;
                    }
                    child = child.nextElementSibling;
                }
            } else if (node.tagName === 'path' || node.tagName === 'rect') {
                mainNode = node;
            }
        }
        return mainNode;
    }

    _filterElement(child) {
        return !(child instanceof MainBorderElement);
    }

    /**
     * @description: 作用累加scale
     * @param {Bounds} pntsBounds 点bounds
     * @param {Bounds} baseBounds 基础bounds
     * @param {*} baseScaleX
     * @param {*} baseScaleY
     * @return {*}
     */
    _getMutiScale(pntsBounds, baseBounds, baseScaleX, baseScaleY) {
        const _scaleX = pntsBounds.width / (baseBounds.width * baseScaleX);
        const _scaleY = pntsBounds.height / (baseBounds.height * baseScaleY);
        const _scaleNum = _scaleX > _scaleY ? _scaleX : _scaleY;
        const baseRate = 2;
        return [_scaleNum / baseRate, _scaleNum / baseRate];
    }

    getMutiScale(pnts) {
        // 处理按区域缩放
        const pntsBounds = new Bounds();
        pnts.forEach((s) => {
            pntsBounds.addPnt(s[0], s[1]);
        });

        const [_muti_scaleX, _muti_scaleY] = this._getMutiScale(pntsBounds, new Bounds(0, 0, this.width, this.height), this.m_scaleX, this.m_scaleY);
        return [_muti_scaleX, _muti_scaleY];
    }
    _getFillCanvas() {
        
        const { fillElementArr } = this;
        const size = fillElementArr.length;
        if (size <= 0) return null;
        const tempCanvas = document.createElement('canvas');
        const tempctx = tempCanvas.getContext('2d');
        // 三维缩放比为一，考虑性能问题，三维缩放比放置外部实现
        const scaleX = this._is3d ? 1 : this.m_scaleX;
        const scaleY = this._is3d ? 1 : this.m_scaleY;
        // 填充物
        if (size === 1) {
            fillElementArr.forEach((ele) => {
                // 初始坐标点组
                const baseMatrix = ele._getMatrix();
                const coords = ele._getCoords(baseMatrix);
                const newBounds = new Bounds();
                const bounds = ele.getBoundingBox();
                const topLeft = new Point(bounds.left, bounds.bottom);

                const matrix3 = new Matrix3();
                matrix3.translate(-topLeft.x, -topLeft.y);

                coords.forEach((p) => {
                    p.forEach((s) => {
                        s.applyMatrix3(matrix3);
                        newBounds.addPnt(s.x, s.y);
                    });
                });

                const { width } = newBounds;
                const { height } = newBounds;

                tempCanvas.width = width * scaleX;
                tempCanvas.height = height * 1.5 * scaleY;
                tempctx.translate(0, height * scaleY * 0.25);
                tempctx.scale(scaleX, scaleY);

                this._drawCanvas(ele, tempctx, coords);
            });
        } else {
            tempCanvas.width = this.width * scaleX;
            tempCanvas.height = this.height * scaleY;
            fillElementArr.forEach((ele) => {
                tempctx.save();
                tempctx.scale(scaleX, scaleY);
                const baseMatrix = ele._getMatrix();
                const coords = ele._getCoords(baseMatrix);
                this._drawCanvas(ele, tempctx, coords);
                tempctx.restore();
            });
        }
        return tempCanvas;
    }

    _getFillImg() {
        if (this.fillImg) {
            return this.fillImg;
        }
        const tempCanvas = this._getFillCanvas();
        const img = this._convertCanvasToImage(tempCanvas);
        this.fillImg = img;
        return img;
    }

    _drawCanvas(ele, tempctx, coords) {
        const strokeProperty = ele.getStyle('stroke');
        const strokeWidthProperty = ele.getStyle('stroke-width');
        const fillProperty = ele.getStyle('fill');
        const fillOpacityStyleProp = ele.getStyle('fill-opacity');
        const strokeOpacityProp = ele.getStyle('stroke-opacity');

        const strokeStyle = strokeProperty.addOpacity(strokeOpacityProp).getString();

        const fillStyle = fillProperty.addOpacity(fillOpacityStyleProp).getString();

        const strokeWidth = strokeWidthProperty.getNumber();

        tempctx.strokeStyle = strokeStyle;
        tempctx.lineWidth = strokeWidth;
        tempctx.fillStyle = fillStyle;
        tempctx.lineCap = 'round';

        for (let i = 0; i < coords.length; i++) {
            tempctx.beginPath();
            const pntArr = coords[i];
            pntArr.forEach((t, index) => {
                const pnt = t;
                if (index === 0) {
                    tempctx.moveTo(pnt.x, pnt.y);
                } else {
                    tempctx.lineTo(pnt.x, pnt.y);
                }
            });

            if (strokeStyle && strokeStyle !== 'none') {
                tempctx.stroke();
            }

            if (fillStyle && fillStyle !== 'none') {
                tempctx.fill();
            }

            tempctx.closePath();
        }
    }

    _convertCanvasToImage(canvas) {
        const image = new Image();
        image.src = canvas.toDataURL('image/png');
        return image;
    }

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

    _applyMainElement(child) {

        const mainAreaArr = this._mainAreaArr;
        const fillElementArr = this.fillElementArr;
        // 检查轴线
        if (!mainAreaArr || mainAreaArr.length <= 0) {
            new Error('轴线缺失！');
        }
        // 检查是否有填充
        if (fillElementArr && fillElementArr.length > 0) {
            this._isMustFill = true;
        }

        child.applyMainGeo(this.mainBorder);
        child.applyMapScale(this.m_scaleX, this.m_scaleY);
    }

    _applyElementTransfrom(child) {
        const useStyle = this._getUseStyle(child);

        const { mainBorder } = this;
        const { poly } = this;
        if (!poly || poly.length <= 2 || !mainBorder) {
            child.isAllowCoords = false;
            return;
        }

        if (useStyle === '13') {
            this._nonAction(child);
        }
        if (useStyle === '22') {
            this._centerAction(child);
        }
    }

    _nonAction(element) {
        const { mainBorder } = this;
        const origin = element.getOriginPoint();
        const center = element.getBoundingBox().getCenter()
        const angle=180* Math.atan2(origin.y-center.y, origin.x- center.x)/Math.PI
        let matrix = new Matrix3();
        let offsetRate = parseFloat(element.getMarkerOffset());
        offsetRate = offsetRate < 0 ? 0 : offsetRate;
        offsetRate = offsetRate > 1 ? 1 : offsetRate;

        const [point, kAngle] = mainBorder.getTransfromByRate(offsetRate);
        let rotateAngle = -kAngle+angle-90;
        let translatePoint = new Point(point[0] - origin.x, point[1] - origin.y);

        if (this._is3d) {
            this._run3d(element, matrix, origin);
        }

        this._applyNormalMatrixTransfrom(matrix, origin, translatePoint, rotateAngle, 1, 1, this.m_scaleX, this.m_scaleY);

        element._transformMatrix = matrix;
    }
    _centerAction(element) {
        const { poly } = this;
        let matrix = new Matrix3();
        const origin = element.getOriginPoint();
        const hasPose = element.getPose() === '0' ? false : true;
        const defaultCenter = new Point(this.width / 2, this.height / 2);

        origin.x = defaultCenter.x;
        origin.y = defaultCenter.y;
  
        const pnts = poly.map((s) => [s.x, s.y]);
  
        const tranPoint = calculatePolygonGravityCenter(pnts);
  
        const translatePoint = new Point(
          tranPoint[0] - origin.x,
          tranPoint[1] - origin.y
        );
        const [muiScaleX, muiScaleY] = this.getMutiScale(pnts);

        // 特殊处理3d
        if (this._is3d && element._dimModal) {
            element._dimModal.set3D(hasPose);
            element._dimModal.setLineAngle(0);
            element._dimModal.setTranslatePoint(origin);
        }
        if (this._is3d) {
            this._run3d(element, matrix, origin);
        }

        this._applyNormalMatrixTransfrom(matrix, origin, translatePoint, null, muiScaleX, muiScaleY, this.m_scaleX, this.m_scaleY);

        element._transformMatrix = matrix;
    }

    set isMustFill(value) {
        this._isMustFill = value;
    }
    get isMustFill() {
        return this._isMustFill;
    }

    changeAttributeStatus(is3d, scaleX, scaleY) {
        super.changeAttributeStatus(is3d, scaleX, scaleY);
        if (is3d) {
            this.fillImg = this._getFillImg();
        }
    }

    setPoints(points, options) {
        super.setPoints(points, options);
        if (this.poly.length > 1) {
            this.mainBorder = new Spline(this.poly, {
                close: true,
                maxPoint: this.getInsertGeometryPoint(10)
            });
            this.traverChildren();
        }
    }
}
SimpleArea.sliceTypes = ['10','13', '21', '22'];
export default SimpleArea;
