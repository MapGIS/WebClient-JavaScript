/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: zk
 * @LastEditTime: 2022-06-28 09:54:02
 */
import  {PlotObjectFactory}  from "./PlotObjectFactory";
import  PlotRegularPoint  from "./RegularShapes/PlotRegularPoint";
import  PlotRegularObject  from "./RegularShapes/PlotRegularObject";
import  PlotRegularSurface  from "./RegularShapes/PlotRegularSurface";
import  PlotIrregularShape  from "./IrregularShapes/PlotIrregularShape";
import  PlotIrregularShapeByLatlng  from "./IrregularShapes/PlotIrregularShapeByLatlng";
import  PlotKidneyarea  from "./RegularShapes/PlotKidneyarea";
import PlotSimpleArea from "./RegularShapes/PlotSimpleArea";

PlotObjectFactory.register("msbl_regularpoint", PlotRegularPoint);
PlotObjectFactory.register("msbl_regularLine1", PlotRegularObject);
PlotObjectFactory.register("msbl_regularLine2", PlotRegularObject);
PlotObjectFactory.register("msbl_regularsurface", PlotRegularSurface);
PlotObjectFactory.register("msbl_kidneyarea", PlotKidneyarea);

// 新修规则
PlotObjectFactory.register("simpleline", PlotRegularObject);
PlotObjectFactory.register("simplearea", PlotSimpleArea);
PlotObjectFactory.register("simplepoint", PlotRegularPoint);

// 非规则符号
PlotObjectFactory.register('irregular', PlotIrregularShape);
PlotObjectFactory.register("combinationcircle", PlotIrregularShapeByLatlng);
PlotObjectFactory.register("kidney", PlotIrregularShape);
PlotObjectFactory.register("sector", PlotIrregularShape);
PlotObjectFactory.register('pathway',PlotIrregularShape)
PlotObjectFactory.register('triangle',PlotIrregularShape)

PlotObjectFactory.register("singlearrow", PlotIrregularShape);
PlotObjectFactory.register("squadarrow", PlotIrregularShape);
PlotObjectFactory.register("multiarrow", PlotIrregularShape);
PlotObjectFactory.register("doublearrow", PlotIrregularShape);
PlotObjectFactory.register("assaultarrow", PlotIrregularShape);
PlotObjectFactory.register("tailedsquadarrow", PlotIrregularShape);

