import { AnimationUtil } from '../../../utils/AnimationUtil';
import PlotCoordsAnimation from './PlotCoordsAnimation';
import Spline from '../../../../../PlotUtilBase/Geometry/Spline';
import Point from '../../../../../PlotUtilBase/Geometry/Point';
import { calculatePolygonGravityCenter } from '../../../../../PlotUtilBase/Math/MathUtils';

/*
 * @Description: 路径动画类
 * @Author: zk
 * @Date: 2022-04-19 09:59:57
 * @LastEditors: zk
 * @LastEditTime: 2022-06-30 15:34:50
 */
export default class PlotPathAnimation extends PlotCoordsAnimation {
    constructor(options) {
        super(options);
    }
    _initBaseAttributes(options) {
        super._initBaseAttributes(options);
        // animation type
        this.animationType = 'path-animation';
        // init options
        this.animationCoords = options.animationCoords
            ? AnimationUtil.defineValue(
                  options.animationCoords.map((s) => new Point(s[0], s[1])),
                  []
              )
            : [];
        this.showPath = AnimationUtil.defineValue(options.showPath, true);
        this.pathStyle = AnimationUtil.defineValue(options.pathStyle, { fill: 'none', strokeStyle: '#00ff00', lineWidth: 5 });
        this.pathType = AnimationUtil.defineValue(options.pathType, 'spline');
        this.startPathRate = AnimationUtil.defineValue(options.startPathRate, 0);
        this.endPathRate = AnimationUtil.defineValue(options.endPathRate, 1);

        //是否沿切线方向
        this.alongTangent = AnimationUtil.defineValue(options.alongTangent, false);

        //绑定id
        this.symbolBindId = AnimationUtil.defineValue(options.symbolBindId, null);

        // 路径对象
        this.pathWayObject = null;
        this._cacheCoords = null;
        // init geometry
        this.geometryInstance = null;
        this.geometryAngles = [];
    }

    update() {
        super.update();
        // 根据路径类型生成几何
        const { pathType } = this;

        if (!this._cacheCoords) {
            let coords = [];
            if (this.symbolBindId) {
                const plot = this.getPlotObjectById(this.symbolBindId);
                if (plot) {
                    coords = plot.getElement().positions;
                } else {
                    coords = [];
                }
            } else {
                coords = this.animationCoords;
            }
            this._cacheCoords = coords;
        }

        if (this._cacheCoords.length === 0) {
            console.error('路径动画控制点数量不能为0');
            return;
        }

        if (this._cacheCoords.length === 1) {
            console.error('无法生成路径');
            return;
        } else {
            if (this.showPath) {
                this._initPathWayObject({ coords: this._cacheCoords, pathStyle: this.pathStyle });
            }

            if (pathType === 'spline') {
                this.geometryInstance = new Spline(this._cacheCoords, {});
            }
        }
        this.geometryAngles = this._plotObjects.map((s) => {
            const element = s.getElement();
            if (element.getGeometryAngle) {
                return element.getGeometryAngle();
            } else {
                console.error('目标对象没有控制点信息');
                return 0;
            }
        });

        this.centerActions = this._plotObjects.map((plotobject) => {
            const positions = plotobject.getElement().positions;
            const len = positions.length;
            let center;
            if (len === 1) {
                center = [positions[0].x, positions[0].y];
            } else if (len === 2) {
                center = [(positions[1].x - positions[0].x) / 2 + positions[0].x, (positions[1].y - positions[0].y) / 2 + positions[0].y];
            } else {
                // 计算中心点
                center = calculatePolygonGravityCenter(positions.map((t) => [t.x, t.y]));
            }

            return function (polys, pnt) {
                return polys.map((pol) => {
                    return new Point(pol.x + pnt.x - center[0], pol.y + pnt.y - center[1]);
                });
            };
        });
    }

    _initPathWayObject(options) {
        const { coords, pathStyle } = options;

        if (!this.pathWayObject) {
            this.drawUtilPlotObject(101, {
                positions: coords
            }).then((s) => {
                this.pathWayObject = s;
                this._setPathWayStyles(s, pathStyle);
            });
        } else {
            this._setPathWayStyles(this.pathWayObject, pathStyle);
        }
    }
    _setPathWayStyles(pathWayObject, styles) {
        const element = pathWayObject.getElement();
        element.setNodesAttributes({ templine_utilline: styles });
    }

    _calcTrueRate(rate) {
        const startRate = this.startPathRate;
        const endRate = this.endPathRate;
        return (endRate - startRate) * rate + startRate;
    }

    exportOption() {
        const object = super.exportOption();
        const propertys = PlotPathAnimation.cacheProperty.split(',');
        propertys.forEach((s) => {
            object[s] = this[s];
        });
        return object;
    }

    restore() {
        super.restore();
        this._plotObjects.forEach((s, i) => {
            const element = s.getElement();
            element.setGeometryAngle && element.setGeometryAngle(this.geometryAngles[i]);
        });

        if (this.pathWayObject) {
            this.removeDrawUtilPlotObject(this.pathWayObject);
            this.pathWayObject = null;
        }
    }

    _setPnts(obj, positions) {
        if (obj.positions) {
            obj.positions = positions;
            // 解决点类样式不刷新的问题
            obj._isTranslate = false;
        }
        if (obj.setPnts) {
            obj.setPnts(positions);
        }
    }

    render(rate) {
        if (!this.geometryInstance) return;

        // 重新适配路径
        if (this.pathWayObject) {
            this._cacheCoords = this.pathWayObject.getElement().positions;
        }

        const trueRate = this._calcTrueRate(rate);

        const v = this.geometryInstance.getTransfromByRate(trueRate);

        const pnt = new Point(v[0][0], v[0][1]);

        this._plotObjects.forEach((plotobject, index) => {
            const element = plotobject.getElement();

            // 设置沿斜线方向的角度
            if (this.alongTangent && element.setGeometryAngle) {
                element.setGeometryAngle(v[1]);
            }
            this._setPnts(plotobject, this.centerActions[index](this._animationPolys[index], pnt));
        });
    }
}

PlotPathAnimation.cacheProperty = 'symbolBindId,animationCoords,showPath,pathStyle,startPathRate,endPathRate,alongTangent';
