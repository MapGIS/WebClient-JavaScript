/*
 * @Description: 属性动画类
 * @Author: zk
 * @Date: 2022-03-23 10:02:49
 * @LastEditors: zk
 * @LastEditTime: 2022-06-16 11:45:57
 */
import { AnimationUtil } from '../../utils/AnimationUtil';
import { GradientColor } from '../../utils/GradientColor';
import PlotBaseAnimation from '../PlotBaseAnimation';

export default class PlotAttributeAnimation extends PlotBaseAnimation {
    constructor(options) {
        super(options);
    }

    _initBaseAttributes(options) {
        super._initBaseAttributes(options);
        // animation type
        this.animationType = 'attribute-animation';
        // attrItems
        this._attrsItems = [];
        // this._attrsItems = this.resloveAttrsItems(options.attrsItems);
        const item = AnimationUtil.defineValue(options.attrsItem, null);
        if (item) {
            const type = this._getAttrType(item.attrName);
            if (type && item.attrName) {
                this._attrsItems.push(this.sloveItemByType(type, item.ids, item.attrName, item.value));
            }
        }
    }
    update() {
        super.update();
        // copy attributes
        this._copyAttributes = this._plotObjects.map((s) => s.toGeoJSON().properties);
    }

    // resloveAttrsItems(attrsItems) {
    //     if (!attrsItems) return [];
    //     return attrsItems.map((s) => {
    //         const arr = s.trim().split('_');
    //         return this.sloveItemByType(arr[3], arr[0], arr[1], arr[2]);
    //     });
    // }
    _getAttrType(attrName) {
        let type = null;
        if (PlotAttributeAnimation.limitColorItems.indexOf(attrName) > -1) {
            type = 'color';
        }
        if (PlotAttributeAnimation.limitNumberItems.indexOf(attrName) > -1) {
            type = 'number';
        }
        return type;
    }
    sloveItemByType(resloveType, ids, type, valStr) {
        const that = this;
        let item = {};
        if (resloveType === 'number') {
            item.ids = ids;
            item.type = type;
            item.getRateValue = function (rate) {
                return that.rateToNum(valStr, rate);
            };
        } else if (resloveType === 'color') {
            item.ids = ids;
            item.type = type;
            item.getRateValue = function (rate) {
                return that.rateToColor(valStr, rate);
            };
        }
        return item;
    }
    rateToNum(valArr, rate) {
        const arr = valArr;
        if (arr.length === 0) new Error('动画参数错误！');
        if (arr.length === 1) return arr[0];
        return AnimationUtil.getNumberRate(arr, rate);
    }
    rateToColor(valArr, rate) {
        return new GradientColor(valArr).getGradientColorByRate(rate);
    }

    exportOption() {
        const object = super.exportOption();
        const propertys = PlotAttributeAnimation.cacheProperty.split(',');
        propertys.forEach((s) => {
            object[s] = this[s];
        });
        return object;
    }

    restore() {
        super.restore();
        this._plotObjects.forEach((s, index) => {
            const geoJson = s.toGeoJSON();
            geoJson.properties = this._copyAttributes[index];
            s.fromGeoJSON(geoJson);
        });
    }
    render(rate) {
        this._plotObjects.forEach((s) => {
            this._attrsItems.forEach((item) => {
                const t = item.getRateValue(rate);
                s.setValue(item.type, t, item.ids, false);
            });
        });
    }
}
PlotAttributeAnimation.limitColorItems = ['compareLineColor', 'wallColor', 'wallGradColor', 'strokeStyle', 'fillGradColor', 'fillStyle'];
PlotAttributeAnimation.limitNumberItems = ['compareLineWidth', 'dimModHeight', 'lineWidth'];
PlotAttributeAnimation.cacheProperty = 'attrItem';
