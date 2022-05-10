/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-05-10 16:57:33
 */
import  {PlotObjectFactory}  from "./PlotObjectFactory";
import  PlotRegularPoint  from "./RegularShapes/PlotRegularPoint";
import  PlotRegularObject  from "./RegularShapes/PlotRegularObject";
import  PlotRegularSurface  from "./RegularShapes/PlotRegularSurface";
import  PlotIrregularShape  from "./IrregularShapes/PlotIrregularShape";
import  PlotIrregularShapeByLatlng  from "./IrregularShapes/PlotIrregularShapeByLatlng";
import  PlotKidneyarea  from "./RegularShapes/PlotKidneyarea";

PlotObjectFactory.register("msbl_regularpoint", PlotRegularPoint);
PlotObjectFactory.register("msbl_regularLine1", PlotRegularObject);
PlotObjectFactory.register("msbl_regularLine2", PlotRegularObject);
PlotObjectFactory.register("msbl_regularsurface", PlotRegularSurface);
PlotObjectFactory.register("msbl_kidneyarea", PlotKidneyarea);

// 非规则符号
PlotObjectFactory.register("msbl_AssaultArrow", PlotIrregularShape);
PlotObjectFactory.register("msbl_MultiArrow", PlotIrregularShape);
PlotObjectFactory.register(
  "msbl_CombinationalCircle",
  PlotIrregularShapeByLatlng
);
PlotObjectFactory.register(
  "msbl_AntiAircraftGroup",
  PlotIrregularShapeByLatlng
);
PlotObjectFactory.register("msbl_cannonGroup", PlotIrregularShapeByLatlng);
PlotObjectFactory.register("msbl_Kidney", PlotIrregularShape);

PlotObjectFactory.register("msbl_doublearrow", PlotIrregularShape);
PlotObjectFactory.register("msbl_singleArrow", PlotIrregularShape);
PlotObjectFactory.register("msbl_squadarrow", PlotIrregularShape);
PlotObjectFactory.register("msbl_FigureFan", PlotIrregularShape);
