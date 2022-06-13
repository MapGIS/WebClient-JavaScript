/*
 * @Description: 控制点动画类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-06-13 11:51:25
 */
import Point from '../../../../../PlotUtilBase/Geometry/Point';
import PlotBaseAnimation from '../../PlotBaseAnimation';

export default class PlotCoordsAnimation extends PlotBaseAnimation {
    constructor(options) {
        super(options);
    }

    _initBaseAttributes(options) {
        super._initBaseAttributes(options);
        // animation type
        this.animationType = 'coords-animation';
    }

    update() {
        super.update();
        // 初始化动画polys
        const plotObjects = this._plotObjects;
        this._animationPolys = plotObjects.map((s) => {
            const elem = s.getElement();
            if (elem) {
                return elem.positions.map((s) => new Point(s.x, s.y));
            }
        });
    }
    restore() {
        super.restore();
        this._plotObjects.forEach((s, i) => {
            this._setPnts(s, this._animationPolys[i]);
        });
    }
    _setPnts(obj, positions) {
        if (obj.positions) {
            obj.positions = positions;
        }
        if (obj.setPnts) {
            obj.setPnts(positions);
        }
    }
}
