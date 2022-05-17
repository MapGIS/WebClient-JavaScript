/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: zk
 * @LastEditTime: 2022-05-16 19:02:53
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

// 新修规则
PlotObjectFactory.register("simpleline", PlotRegularObject);

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
