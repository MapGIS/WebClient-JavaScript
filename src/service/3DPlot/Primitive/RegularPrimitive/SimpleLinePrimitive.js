import SimpleLineElementInstance from '../ElementInstance/SimpleLineElementInstance';
import RegularLine1Primitive from './RegularLine1Primitive';

/**
 * @class module:3DPlot.SimpleLinePrimitive
 * @description 标绘图元（新规则区）基类
 * @author 基础平台-杨琨
 *
 * @param options - {Object} 初始化参数
 */
class SimpleLinePrimitive extends RegularLine1Primitive {

    /**
     * @description 重写父类的_elementInstance方法
     * @private
     *
     * @param {function} callback 回调函数
     */
    _elementInstance(callback) {
        new SimpleLineElementInstance(this._elem, Object.assign(this.getBaseSaveAttributesValues(),{globelScale: this.getGlobelScale()})).getInstance(function (instances) {
            callback(instances);
        });
    }

    /**
     * @description 重写父类的initBaseSaveAttributes方法
     * @function module:3DPlot.SimpleLinePrimitive.initBaseSaveAttributes
     * @public
     */
    initBaseSaveAttributes() {
        super.initBaseSaveAttributes();
        this.dimModAttitude = this._elem.getSymbolPose();
        this.isOpenWall = true;
        this.isWallGradColor = false;
        this.wallColor = 'rgba(255,0,0,0.3)';
        this.wallGradColor = 'rgba(255,0,0,0.3)';
    }

    /**
     * @description 重写父类的getPrimitiveBaseSaveAttributes方法
     * @function module:3DPlot.SimpleLinePrimitive.getPrimitiveBaseSaveAttributes
     * @public
     *
     * @return {Array} Attributes 属性字段数组
     */
    getPrimitiveBaseSaveAttributes() {
        return SimpleLinePrimitive.extendPrimitiveAttributes.concat([]);
    }
}

SimpleLinePrimitive.extendPrimitiveAttributes = ['dimModHeight', 'dimModAttitude', 'isOpenWall', 'isWallGradColor', 'wallColor', 'wallGradColor'];

export default SimpleLinePrimitive;
