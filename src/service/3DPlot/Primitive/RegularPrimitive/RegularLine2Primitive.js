/*
 * @Author: your name
 * @Date: 2021-10-25 10:17:52
 * @LastEditTime: 2022-04-01 16:40:35
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\RegularLine1Primitive.js
 */
import RegularLine1Primitive from "./RegularLine1Primitive";
import RegularLine2ElementInstance from "../ElementInstance/RegularLine2ElementInstance";

class RegularLine2Primitive extends RegularLine1Primitive {
  constructor(options) {
    super(options);
  }

  _elementInstance(ele, callback) {
    new RegularLine2ElementInstance(ele, {
      ...this.getBaseSaveAttributesValues(),
      globelScale: this.getGlobelScale()
    }).getInstance(function (instances) {
      callback(instances);
    });
  }

  initBaseSaveAttributes() {
    this.dimModHeight = this._modHeight
    this.isOpenWall = true
    this.isWallGradColor = false
    this.wallColor = 'rgba(255,0,0,0.3)'
    this.wallGradColor = 'rgba(255,0,0,0.3)'
  }

  getPrimitiveBaseSaveAttributes() {
    const attrs = super.getPrimitiveBaseSaveAttributes();
    return attrs.concat(RegularLine2Primitive.extendPrimitiveAttributes);
  }
}

RegularLine2Primitive.extendPrimitiveAttributes = ['dimModHeight', 'isOpenWall', 'isWallGradColor', 'wallColor', 'wallGradColor'];

export default RegularLine2Primitive;