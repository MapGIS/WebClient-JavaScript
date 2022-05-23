/*
 * @Author: your name
 * @Date: 2021-10-20 10:57:25
 * @LastEditTime: 2022-05-20 10:00:14
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\SimplePointPrimitive.js
 */

import RegularPointPrimitive from "./RegularPointPrimitive";

class SimplePointPrimitive extends RegularPointPrimitive {
  initBaseSaveAttributes() {
    this.dimModHeight = 0;
    this.dimModAttitude = this._elem.getSymbolPose();
  }

  getPrimitiveBaseSaveAttributes() {
    return SimplePointPrimitive.extendPrimitiveAttributes.concat([]);
  }
}

SimplePointPrimitive.extendPrimitiveAttributes = ["dimModHeight", "dimModAttitude"];

export default SimplePointPrimitive;