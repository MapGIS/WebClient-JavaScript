/*
 * @Description: 动画基础类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-06-07 15:42:15
 */
import Point from '../../../../../PlotUtilBase/Geometry/Point';
import Spline from '../../../../../PlotUtilBase/Geometry/Spline';
import { calculatePolygonGravityCenter } from '../../../../../PlotUtilBase/Math/MathUtils';
import PlotCoordsAnimation from './PlotCoordsAnimation';

export default class PlotGrowAnimation extends PlotCoordsAnimation {
    constructor(options) {
        super(options);
    }
    _initBaseAttributes(options){
        super._initBaseAttributes(options)
        // animation type
        this.animationType = 'grow-animation';
        // init options
        this.startRate = options.startRate || 0;
        this.endRate = options.endRate || 1;
        this.growMode = options.growMode || 'spline';
    }
    update() {
        super.update();
        // mode init
        const mode = this.growMode;
        const polysArr = this._animationPolys;
        // 1.spline
        if (mode === 'spline') {
            this.splines = polysArr.map((s) => {
                return new Spline(s);
            });
        } else if (mode === 'center') {
            this.modeFunArr = [];
            for (let j = 0; j < polysArr.length; j++) {
                const polys = polysArr[j];
                const len = polys.length;
                const v = [];
                let center;
                if (len === 2) {
                    center = [(polys[1].x - polys[0].x) / 2 + polys[0].x, (polys[1].y - polys[0].y) / 2 + polys[0].y];
                } else {
                    // 计算中心点
                    center = calculatePolygonGravityCenter(polys.map((t) => [t.x, t.y]));
                }
                for (let i = 0; i < len; i++) {
                    v.push(this._getCenterFunc([polys[i].x, polys[i].y], center));
                }
                this.modeFunArr.push(v);
            }
        }
    }

    _calcTrueRate(rate) {
        const startRate = this.startRate;
        const endRate = this.endRate;
        return (endRate - startRate) * rate + startRate;
    }

    _getCenterFunc(poly, center) {
        return function (rate) {
            return [(poly[0] - center[0]) * rate + center[0], (poly[1] - center[1]) * rate + center[1]];
        };
    }
    _splineAction(rate) {
        const splines = this.splines;
        const trueRate = this._calcTrueRate(rate);
        splines.forEach((t, index) => {
            const animationPoly = this._animationPolys[index];
            const animationObject = this._plotObjects[index];
            if (animationPoly.length > 0) {
                const temp = t.getTransfromByRate(trueRate);
                const startPnt = animationPoly[0];
                const i = temp[2];
                const p = temp[0];
                let pArr = [];
                if (Math.abs(startPnt.x - p[0]) > 10e-8 || Math.abs(startPnt.y - p[1]) > 10e-8) {
                    pArr = pArr.concat(animationPoly.slice(0, i + 1));
                    pArr.push(new Point(p[0], p[1]));
                }

                if (pArr.length > 1) {
                    this._setPnts(animationObject, pArr);
                }
            }
        });
    }

    _centerAction(rate) {
        const trueRate = this._calcTrueRate(rate);
        this._plotObjects.forEach((plotObject, i) => {
            const tPolys = this.modeFunArr[i].map((s) => {  
                const p = s(trueRate);
                
                return new Point(p[0], p[1]);
            });
            this._setPnts(plotObject, tPolys);
        });
    }

    exportOption(){
        const object = super.exportOption()
        const propertys= PlotGrowAnimation.cacheProperty.split(',')
        propertys.forEach((s)=>{
            object[s]=this[s]
        })
        return object
    }


    _render(rate) {
        const mode = this.growMode;
        if (mode === 'spline') {
            this._splineAction(rate);
        } else if (mode === 'center') {
            this._centerAction(rate);
        }
    }
    render(rate) {
        this._render(rate);
    }
}

PlotGrowAnimation.cacheProperty='startRate,endRate,growMode'