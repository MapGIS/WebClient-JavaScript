/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: zk
 * @LastEditTime: 2022-06-13 15:33:34
 */
import  {PlotObjectFactory}  from "./PlotObjectFactory";
import  PlotRegularPoint  from "./RegularShapes/PlotRegularPoint";
import  PlotRegularObject  from "./RegularShapes/PlotRegularObject";
import  PlotIrregularShape  from "./IrregularShapes/PlotIrregularShape";
import  PlotIrregularShapeByLatlng  from "./IrregularShapes/PlotIrregularShapeByLatlng";
import PlotSimpleArea from "./RegularShapes/PlotSimpleArea";

// 新修规则
PlotObjectFactory.register("simpleline", PlotRegularObject);
PlotObjectFactory.register("simplearea", PlotSimpleArea);
PlotObjectFactory.register("simplepoint", PlotRegularPoint);

// 非规则符号
PlotObjectFactory.register("combinationcircle", PlotIrregularShapeByLatlng);
PlotObjectFactory.register("kidney", PlotIrregularShape);
PlotObjectFactory.register("sector", PlotIrregularShape);

PlotObjectFactory.register("singlearrow", PlotIrregularShape);
PlotObjectFactory.register("squadarrow", PlotIrregularShape);
PlotObjectFactory.register("multiarrow", PlotIrregularShape);
PlotObjectFactory.register("doublearrow", PlotIrregularShape);
PlotObjectFactory.register("assaultarrow", PlotIrregularShape);
PlotObjectFactory.register("tailedsquadarrow", PlotIrregularShape);