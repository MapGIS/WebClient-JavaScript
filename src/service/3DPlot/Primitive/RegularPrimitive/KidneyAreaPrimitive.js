/*
 * @Author: your name
 * @Date: 2021-10-25 10:17:52
 * @LastEditTime: 2022-03-31 11:59:14
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\RegularLine1Primitive.js
 */
import RegularLine2Primitive from "./RegularLine2Primitive";
import KidneyAreaElementInstance from "../ElementInstance/KidneyAreaElementInstance";

export default class KidneyAreaPrimitive extends RegularLine2Primitive {
  constructor(options) {
    super(options);
  }

  _elementInstance(ele, callback) {
    new KidneyAreaElementInstance(ele, {
      ...this.getBaseSaveAttributesValues(),
      globelScale: this.getGlobelScale()
    }).getInstance(function (instances) {
      callback(instances);
    });
  }
}
