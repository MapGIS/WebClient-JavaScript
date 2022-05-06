/*
 * @Author: your name
 * @Date: 2021-08-30 22:22:31
 * @LastEditTime: 2021-11-12 16:33:12
 * @LastEditors: Do not edit
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\index.js
 */
import { Element } from "./Element";
import { PathElement } from "./PathElement";
import { GElement } from "./GElement";
import { SvgElement } from "./SvgElement";
import { ElementFactory } from "./ElementFactory";
import { TextElement } from "./TextElement";
import { TSpanElement } from "./TSpanElement";
import { RegularPoint } from "./RegularElement/RegularPoint.js";
import { RegularLine1 } from "./RegularElement/RegularLine1";
import { MsblElement } from "./MsblElement";
import { CircleElement } from "./CircleElement";
import { RegularLine2 } from "./RegularElement/RegularLine2";
import { KidneyArea } from "./RegularElement/KidneyArea";
import { RegularSurface } from "./RegularElement/RegularSurface";
import RectElement from "./RectElement";
import { AssaultArrowGeometry } from "./IrregularElement/Arrow/AssaultArrowGeometry";
import { MultiArrowGeometry } from "./IrregularElement/Arrow/MultiArrowGeometry";
import { CombinationalCircleGeometry } from "./IrregularElement/CombinationalCircleGeometry";
import { KidneyGeometry } from "./IrregularElement/KidneyGeometry";
import { DoubleArrowGeometry } from "./IrregularElement/Arrow/DoubleArrowGeometry";
import { SimpleArrowGeometry } from "./IrregularElement/Arrow/SimpleArrowGeometry";
import { SquadArrowGeometry } from "./IrregularElement/Arrow/SquadArrowGeometry";
import { FigureFanGeometry } from "./IrregularElement/FigureFanGeometry";

export const drawTypes = [
  "path",
  "mainline",
  "tspan",
  "mainborder",
  "circle",
  "rect",
  "extendline"
];

ElementFactory.register("path", PathElement);
ElementFactory.register("g", GElement);
ElementFactory.register("svg", SvgElement);
ElementFactory.register("text", TextElement);
ElementFactory.register("tspan", TSpanElement);
ElementFactory.register("msbl", MsblElement);
ElementFactory.register("circle", CircleElement);
ElementFactory.register("rect", RectElement);

// 规则符号
ElementFactory.register("msbl_regularpoint", RegularPoint);
ElementFactory.register("msbl_regularline1", RegularLine1);
ElementFactory.register("msbl_regularline2", RegularLine2);
ElementFactory.register("msbl_kidneyarea", KidneyArea);
ElementFactory.register("msbl_regularsurface", RegularSurface);

// 非规则符号
ElementFactory.register("msbl_AssaultArrow", AssaultArrowGeometry);
ElementFactory.register("msbl_MultiArrow", MultiArrowGeometry);
ElementFactory.register(
  "msbl_CombinationalCircle",
  CombinationalCircleGeometry
);
ElementFactory.register("msbl_AntiAircraftGroup", CombinationalCircleGeometry);
ElementFactory.register("msbl_cannonGroup", CombinationalCircleGeometry);
ElementFactory.register("msbl_Kidney", KidneyGeometry);

ElementFactory.register("msbl_doublearrow", DoubleArrowGeometry);
ElementFactory.register("msbl_singleArrow", SimpleArrowGeometry);
ElementFactory.register("msbl_squadarrow", SquadArrowGeometry);
ElementFactory.register("msbl_FigureFan", FigureFanGeometry);

export { Element, SvgElement, ElementFactory, GElement };
