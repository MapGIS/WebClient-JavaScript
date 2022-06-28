/*
 * @Description:
 * @Author: zk
 * @Date: 2021-11-15 17:47:45
 * @LastEditors: zk
 * @LastEditTime: 2022-06-28 09:53:26
 */
import DrawPoint2D from './DrawPoint2D';
import DrawPolyline2D from './DrawPolyline2D';
import { DrawPlotObjectFactory2D } from './DrawPlotObjectFactory2D';

DrawPlotObjectFactory2D.register('msbl_regularpoint', DrawPoint2D);
DrawPlotObjectFactory2D.register('msbl_regularLine1', DrawPolyline2D);
DrawPlotObjectFactory2D.register('msbl_regularLine2', DrawPolyline2D);
DrawPlotObjectFactory2D.register('msbl_regularsurface', DrawPolyline2D);
DrawPlotObjectFactory2D.register('msbl_kidneyarea', DrawPolyline2D);

// 新修规则
DrawPlotObjectFactory2D.register('simpleline', DrawPolyline2D);
DrawPlotObjectFactory2D.register('simplearea', DrawPolyline2D);
DrawPlotObjectFactory2D.register('simplepoint', DrawPoint2D);

// 非规则符号
DrawPlotObjectFactory2D.register('irregular', DrawPolyline2D);
DrawPlotObjectFactory2D.register('combinationcircle', DrawPolyline2D);
DrawPlotObjectFactory2D.register('kidney', DrawPolyline2D);
DrawPlotObjectFactory2D.register('sector', DrawPolyline2D);
DrawPlotObjectFactory2D.register('pathway',DrawPolyline2D)
DrawPlotObjectFactory2D.register('triangle',DrawPolyline2D)

DrawPlotObjectFactory2D.register('singlearrow', DrawPolyline2D);
DrawPlotObjectFactory2D.register('squadarrow', DrawPolyline2D);
DrawPlotObjectFactory2D.register('multiarrow', DrawPolyline2D);
DrawPlotObjectFactory2D.register('doublearrow', DrawPolyline2D);
DrawPlotObjectFactory2D.register('assaultarrow', DrawPolyline2D);
DrawPlotObjectFactory2D.register('tailedsquadarrow', DrawPolyline2D);
