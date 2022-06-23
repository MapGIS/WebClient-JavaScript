/*
 * @class: 
 * @Description: 
 * @Author: zk
 * @Date: 2022-06-13 14:58:40
 * @LastEditors: zk
 * @LastEditTime: 2022-06-23 11:16:19
 */
import SimpleFactory from "../../../service/PlotUtilBase/SimpleFactory";
import DrawPoint from "./DrawPoint";
import DrawPolyline from "./DrawPolyline";

const DrawPlotObjectFactory3D = new SimpleFactory();

DrawPlotObjectFactory3D.register("msbl_regularpoint", DrawPoint);
DrawPlotObjectFactory3D.register("msbl_regularline1", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_regularline2", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_regularsurface", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_KidneyArea", DrawPolyline);

DrawPlotObjectFactory3D.register("simplepoint", DrawPoint);
DrawPlotObjectFactory3D.register("simpleline", DrawPolyline);
DrawPlotObjectFactory3D.register("simplearea", DrawPolyline);

DrawPlotObjectFactory3D.register('irregular', DrawPolyline);
DrawPlotObjectFactory3D.register("combinationcircle", DrawPolyline);
DrawPlotObjectFactory3D.register("kidney", DrawPolyline);
DrawPlotObjectFactory3D.register("sector", DrawPolyline);

DrawPlotObjectFactory3D.register("singlearrow", DrawPolyline);
DrawPlotObjectFactory3D.register("squadarrow", DrawPolyline);
DrawPlotObjectFactory3D.register("multiarrow", DrawPolyline);
DrawPlotObjectFactory3D.register("doublearrow", DrawPolyline);
DrawPlotObjectFactory3D.register("assaultarrow", DrawPolyline);
DrawPlotObjectFactory3D.register("tailedsquadarrow", DrawPolyline);


export { DrawPlotObjectFactory3D };
