/*
 * @Author: your name
 * @Date: 2021-08-30 22:22:31
 * @LastEditTime: 2022-06-13 15:27:51
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\svg-loader\index.js
 */
import Element from './Element';
import PathElement from './PathElement';
import GElement from './GElement';
import SvgElement from './SvgElement';
import ElementFactory from './ElementFactory';
import TextElement from './TextElement';
import TSpanElement from './TSpanElement';
import RegularPoint from './RegularElement/RegularPoint.js';
import RegularLine1 from './RegularElement/RegularLine1';
import MsblElement from './MsblElement';
import CircleElement from './CircleElement';
import EllipseElement from './EllipseElement';
import RegularLine2 from './RegularElement/RegularLine2';
import KidneyArea from './RegularElement/KidneyArea';
import RegularSurface from './RegularElement/RegularSurface';
import RectElement from './RectElement';
import AssaultArrowGeometry from './IrregularElement/Arrow/AssaultArrowGeometry';
import MultiArrowGeometry from './IrregularElement/Arrow/MultiArrowGeometry';
import CombinationalCircleGeometry from './IrregularElement/CombinationalCircleGeometry';
import KidneyGeometry from './IrregularElement/KidneyGeometry';
import DoubleArrowGeometry from './IrregularElement/Arrow/DoubleArrowGeometry';
import SimpleArrowGeometry from './IrregularElement/Arrow/SimpleArrowGeometry';
import SquadArrowGeometry from './IrregularElement/Arrow/SquadArrowGeometry';
import FigureFanGeometry from './IrregularElement/FigureFanGeometry';
import SimpleLine from './SimpleElement/SimpleLine';
import SimpleArea from './SimpleElement/SimpleArea';
import SimplePoint from './SimpleElement/SimplePoint';
import TailedSquadArrowGeometry from './IrregularElement/Arrow/TailedSquadArrowGeometry';

const drawTypes = ['path', 'mainline', 'tspan', 'mainborder', 'circle', 'rect', 'extendline'];

ElementFactory.register('path', PathElement);
ElementFactory.register('g', GElement);
ElementFactory.register('svg', SvgElement);
ElementFactory.register('text', TextElement);
ElementFactory.register('tspan', TSpanElement);
ElementFactory.register('msbl', MsblElement);
ElementFactory.register('circle', CircleElement);
ElementFactory.register('ellipse', EllipseElement);
ElementFactory.register('rect', RectElement);

// 新修规则
ElementFactory.register('simpleline', SimpleLine);
ElementFactory.register('simplearea', SimpleArea);
ElementFactory.register('simplepoint', SimplePoint);

// 非规则符号
ElementFactory.register('combinationcircle', CombinationalCircleGeometry);
ElementFactory.register('kidney', KidneyGeometry);
ElementFactory.register('sector', FigureFanGeometry);

ElementFactory.register('singlearrow', SimpleArrowGeometry);
ElementFactory.register('squadarrow', SquadArrowGeometry);
ElementFactory.register('multiarrow', MultiArrowGeometry);
ElementFactory.register('doublearrow', DoubleArrowGeometry);
ElementFactory.register('assaultarrow', AssaultArrowGeometry);
ElementFactory.register('tailedsquadarrow', TailedSquadArrowGeometry);

export { Element, SvgElement, ElementFactory, GElement, drawTypes };
