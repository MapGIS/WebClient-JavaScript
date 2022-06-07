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

DrawPlotObjectFactory3D.register("msbl_AssaultArrow", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_MultiArrow", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_CombinationalCircle", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_AntiAircraftGroup", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_cannonGroup", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_Kidney", DrawPolyline);

DrawPlotObjectFactory3D.register("msbl_doublearrow", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_singleArrow", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_squadarrow", DrawPolyline);
DrawPlotObjectFactory3D.register("msbl_FigureFan", DrawPolyline);

export { DrawPlotObjectFactory3D };
