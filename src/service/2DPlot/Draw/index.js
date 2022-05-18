/*
 * @Description: 
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: zk
 * @LastEditTime: 2022-05-18 09:51:56
 */
import  DrawPoint2D  from './DrawPoint2D';
import  DrawPolyline2D  from './DrawPolyline2D';
import  {DrawPlotObjectFactory2D}  from './DrawPlotObjectFactory2D'

DrawPlotObjectFactory2D.register('msbl_regularpoint', DrawPoint2D)
DrawPlotObjectFactory2D.register('msbl_regularLine1', DrawPolyline2D)
DrawPlotObjectFactory2D.register('msbl_regularLine2', DrawPolyline2D)
DrawPlotObjectFactory2D.register("msbl_regularsurface", DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_kidneyarea", DrawPolyline2D);

// 新修规则
DrawPlotObjectFactory2D.register("simpleline", DrawPolyline2D);
DrawPlotObjectFactory2D.register("simplearea", DrawPolyline2D);
DrawPlotObjectFactory2D.register("simplepoint", DrawPoint2D);
// 非规则符号
DrawPlotObjectFactory2D.register("msbl_AssaultArrow", DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_MultiArrow", DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_CombinationalCircle",DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_AntiAircraftGroup", DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_cannonGroup", DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_Kidney", DrawPolyline2D);

DrawPlotObjectFactory2D.register("msbl_doublearrow", DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_singleArrow", DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_squadarrow", DrawPolyline2D);
DrawPlotObjectFactory2D.register("msbl_FigureFan", DrawPolyline2D);