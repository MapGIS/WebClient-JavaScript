/*
 * @Author: your name
 * @Date: 2021-10-25 10:17:52
 * @LastEditTime: 2022-05-23 17:27:48
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\SimpleLinePrimitive.js
 */
import SimpleLineElementInstance from '../ElementInstance/SimpleLineElementInstance';
import RegularLine1Primitive from './RegularLine1Primitive';

class SimpleLinePrimitive extends RegularLine1Primitive {
    _elementInstance(ele, callback) {
        new SimpleLineElementInstance(ele, {
            ...this.getBaseSaveAttributesValues(),
            globelScale: this.getGlobelScale()
        }).getInstance(function (instances) {
            callback(instances);
        });
    }

    initBaseSaveAttributes() {
        super.initBaseSaveAttributes();
        this.dimModAttitude = this._elem.getSymbolPose();
        this.isOpenWall = true;
        this.isWallGradColor = false;
        this.wallColor = 'rgba(255,0,0,0.3)';
        this.wallGradColor = 'rgba(255,0,0,0.3)';
    }

    getPrimitiveBaseSaveAttributes() {
        return SimpleLinePrimitive.extendPrimitiveAttributes.concat([]);
    }
}

SimpleLinePrimitive.extendPrimitiveAttributes = ['dimModHeight', 'dimModAttitude', 'isOpenWall', 'isWallGradColor', 'wallColor', 'wallGradColor'];

export default SimpleLinePrimitive;
