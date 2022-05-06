/*
 * @Author: your name
 * @Date: 2021-08-31 09:28:26
 * @LastEditTime: 2021-10-22 11:14:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\transform\index.js
 */
import { TransformFactory } from "./TransfromFactory";
import { Translate } from "./Translate";
import { Scale } from "./Scale";
import { Rotate } from "./Rotate";
import { SkewX } from "./SkewX";
import { SkewY } from "./SkewY";
import { Matrix } from "./Matrix";

import { Transform } from "./Transform";

TransformFactory.register("translate", Translate);
TransformFactory.register("scale", Scale);
TransformFactory.register("ratore", Rotate);
TransformFactory.register("skewX", SkewX);
TransformFactory.register("skewY", SkewY);
TransformFactory.register("matrix", Matrix);

export { Transform, TransformFactory };
