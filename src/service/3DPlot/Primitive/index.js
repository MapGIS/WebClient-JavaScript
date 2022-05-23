/*
 * @Author: your name
 * @Date: 2021-09-17 16:36:53
 * @LastEditTime: 2022-05-23 15:58:22
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

// 规则符号
PrimitiveFactory.register("msbl_regularpoint", RegularPointPrimitive);
PrimitiveFactory.register("msbl_regularline1", RegularLine1Primitive);
PrimitiveFactory.register("msbl_regularline2", RegularLine2Primitive);
PrimitiveFactory.register("msbl_regularsurface", RegularSurfacePrimitive);
PrimitiveFactory.register("msbl_kidneyarea", KidneyAreaPrimitive);

// 新修规则
PrimitiveFactory.register("simplepoint", SimplePointPrimitive);
PrimitiveFactory.register("simpleline", SimpleLinePrimitive);
PrimitiveFactory.register("simplearea", SimpleAreaPrimitive);


// 非规则符号
PrimitiveFactory.register("msbl_AssaultArrow", BaseIrregularPrimitive);
PrimitiveFactory.register("msbl_MultiArrow", BaseIrregularPrimitive);
PrimitiveFactory.register("msbl_CombinationalCircle",BaseIrregularPrimitive);
PrimitiveFactory.register("msbl_AntiAircraftGroup", BaseIrregularPrimitive);
PrimitiveFactory.register("msbl_cannonGroup", BaseIrregularPrimitive);
PrimitiveFactory.register("msbl_Kidney", BaseIrregularPrimitive);

PrimitiveFactory.register("msbl_doublearrow", BaseIrregularPrimitive);
PrimitiveFactory.register("msbl_singleArrow", BaseIrregularPrimitive);
PrimitiveFactory.register("msbl_squadarrow", BaseIrregularPrimitive);
PrimitiveFactory.register("msbl_FigureFan", BaseIrregularPrimitive);

export default PrimitiveFactory;
