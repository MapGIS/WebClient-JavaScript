import { AnimationUtil } from '../../../utils/AnimationUtil';
import PlotCoordsAnimation from './PlotCoordsAnimation';
import Spline from '../../../../../PlotUtilBase/Geometry/Spline';
import Point from '../../../../../PlotUtilBase/Geometry/Point';
import MainLineElement from '../../../../SvgLoader/element/extend/MainLineElement';
/*
 * @Description: 路径动画类
 * @Author: zk
 * @Date: 2022-04-19 09:59:57
 * @LastEditors: zk
 * @LastEditTime: 2022-05-26 16:13:31
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
        this.animationCoords = AnimationUtil.defineValue(
            options.animationCoords.map((s) => new Point(s[0], s[1])),
            []
        );
        this.showPath = AnimationUtil.defineValue(options.showPath, false);
        this.pathStyle = AnimationUtil.defineValue(options.pathStyle, {});
        this.pathType = AnimationUtil.defineValue(options.pathType, 'line');
        this.startPathRate = AnimationUtil.defineValue(options.startPathRate, 0);
        this.endPathRate = AnimationUtil.defineValue(options.endPathRate, 1);

        //是否沿切线方向
        this.AlongTangent = AnimationUtil.defineValue(options.AlongTangent, true);

        //绑定id
        this.symbolBindId =  AnimationUtil.defineValue(options.symbolBindId, null);

        // 路径对象
        this.pathWayObject=null
        // init geometry
        this.geometryInstance = null;
        this.geometryAngles = [];
    }
    update() {
        super.update();
        // 根据路径类型生成几何
        const { pathType } = this;

        const plot= this.getPlotObjectById(this.symbolBindId)
        let coords=null
        if(plot){
            coords=plot.getElement().positions
        }else{
            coords=this.animationCoords
        }

        if (pathType == 'line') {
            this.geometryInstance = new Spline(coords);
        }

        // const main= new MainLineElement()
        // main.applyMainGeo(this.geometryInstance)
        // const tempCoords=main.getCoords().flat()
        
        // this.pathWayObject=this.addUtilPath(tempCoords)
    
        this.geometryAngles = this._plotObjects.map((s) => s.getElement().getGeometryAngle());
    }

    _calcTrueRate(rate) {
        const startRate = this.startPathRate;
        const endRate = this.endPathRate;
        return (endRate - startRate) * rate + startRate;
    }

    restore() {
        super.restore();
        this._plotObjects.forEach((s, i) => {
            const element = s.getElement();
            element.setGeometryAngle(this.geometryAngles[i]);
        });
    }

    render(rate) {
        if(!this.geometryInstance) return;
        const trueRate = this._calcTrueRate(rate);
    
        const v = this.geometryInstance.getTransfromByRate(trueRate);
        const pnt = new Point(v[0][0], v[0][1]);

        this._plotObjects.forEach((plotobject) => {
            const element = plotobject.getElement();
            // 设置沿斜线方向的角度
            if (this.AlongTangent) {
                element.setGeometryAngle(v[1]);
            }
            this._setPnts(plotobject, [pnt]);
        });
    }
}
