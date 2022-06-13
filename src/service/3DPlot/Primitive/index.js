/*
 * @Author: your name
 * @Date: 2021-09-17 16:36:53
 * @LastEditTime: 2022-06-13 15:28:14
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\RegularElement.js
 */
import { PrimitiveFactory } from "./PrimitiveFactory";
import RegularLine1Primitive from "./RegularPrimitive/RegularLine1Primitive";
import RegularPointPrimitive from "./RegularPrimitive/RegularPointPrimitive";
import KidneyAreaPrimitive from "./RegularPrimitive/KidneyAreaPrimitive";
import RegularSurfacePrimitive from "./RegularPrimitive/RegularSurfacePrimitive";
import RegularLine2Primitive from "./RegularPrimitive/RegularLine2Primitive";
import BaseIrregularPrimitive from "./IrregularPrimitive/BaseIrregularPrimitive";
import SimplePointPrimitive from "./RegularPrimitive/SimplePointPrimitive";
import SimpleLinePrimitive from "./RegularPrimitive/SimpleLinePrimitive";
import SimpleAreaPrimitive from "./RegularPrimitive/SimpleAreaPrimitive";

// 新修规则
PrimitiveFactory.register("simplepoint", SimplePointPrimitive);
PrimitiveFactory.register("simpleline", SimpleLinePrimitive);
PrimitiveFactory.register("simplearea", SimpleAreaPrimitive);

// 非规则符号
PrimitiveFactory.register("combinationcircle", BaseIrregularPrimitive);
PrimitiveFactory.register("kidney", BaseIrregularPrimitive);
PrimitiveFactory.register("sector", BaseIrregularPrimitive);

PrimitiveFactory.register("singlearrow", BaseIrregularPrimitive);
PrimitiveFactory.register("squadarrow", BaseIrregularPrimitive);
PrimitiveFactory.register("multiarrow", BaseIrregularPrimitive);
PrimitiveFactory.register("doublearrow", BaseIrregularPrimitive);
PrimitiveFactory.register("assaultarrow", BaseIrregularPrimitive);
PrimitiveFactory.register("tailedsquadarrow", BaseIrregularPrimitive);


export default PrimitiveFactory;
