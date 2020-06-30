import {inherits} from 'ol/util.js';
import MultiLineString  from 'ol/geom/MultiLineString.js';
import Polygon  from 'ol/geom/Polygon.js';
import LineString  from 'ol/geom/LineString.js';
import GeometryCollection  from 'ol/geom/GeometryCollection.js';
import Event from 'ol/events/Event.js';
import Stroke  from 'ol/style/Stroke.js';
import Fill  from 'ol/style/Fill.js';
import Style from 'ol/style/Style.js';
import {createEditingStyle} from 'ol/style/Style.js';
import VectorLayer  from 'ol/layer/Vector.js';
import VectorSource  from 'ol/source/Vector.js';
import Observable from 'ol/Observable.js';
import DoubleClickZoom  from 'ol/interaction/DoubleClickZoom.js';
import EventType from 'ol/events/EventType.js';
import * as ol_events from 'ol/events.js';
import PointerInteraction,{handleEvent as handlePointerEvent} from 'ol/interaction/Pointer.js';
import RBush  from 'ol/structs/RBush.js';
import Collection  from 'ol/Collection.js';
import CollectionEventType   from 'ol/CollectionEventType.js'
import Feature  from 'ol/Feature.js';
import Point  from 'ol/geom/Point.js';
import * as ol_extent from 'ol/extent.js';
import MapBrowserPointerEvent  from 'ol/MapBrowserPointerEvent.js';
import MapBrowserEventType from 'ol/MapBrowserEventType.js';
import ViewHint from 'ol/ViewHint.js';
import * as ol_coordinate from 'ol/coordinate.js';
import GeometryType from 'ol/geom/GeometryType.js';
var MilStd = window.MilStd = window.MilStd || {};
MilStd.commonFun = MilStd.commonFun  || {};
MilStd.Arrow = MilStd.Arrow ||{};
MilStd.Flag = MilStd.Flag ||{};
MilStd.Compass = MilStd.Compass||{};
MilStd.Bezier = MilStd.Bezier ||{};
MilStd.event = MilStd.event ||{};
MilStd.tool = MilStd.tool ||{};
MilStd.enum = {
    ZERO_TOLERANCE: 0.0001
};
var EnumMilstdType = {
    ArrowCross: 'ArrowCross',                      //十字箭头指北针            
    CircleClosedangle: 'CircleClosedangle',        //圆形尖角指北针
    Closedangle: 'Closedangle',                    //尖角指北针
    DoubleClosedangle: 'DoubleClosedangle',        //双向尖角指北针
    Fourstar: 'Fourstar',                          //四角指北针
    Rhombus: 'Rhombus',                            //菱形指北针
    SameDirectionClosedangle: 'SameDirectionClosedangle',   //同向尖角指北针
    Triangle: 'Triangle',                                   //三角指北针
    Vane: 'Vane',                                           //风向标指北针
    SimpleArrow: 'SimpleArrow',                             //简单箭头
    DoubleArrow: 'DoubleArrow',                             //双箭头
    StraightArrow: 'StraightArrow',                           //直箭头
    SingleLineArrow: 'SingleLineArrow',                     //单线箭头
    TriangleFlag: 'TriangleFlag',                           //三角旗
    RectFlag: 'RectFlag',                                   //矩形旗
    CurveFlag: 'CurveFlag',                                 //波浪旗
    Bezier: 'Bezier',                                       //贝塞尔曲线成区
    BezierLine: 'BezierLine',                               //贝塞尔曲线
    AssemblyArea: 'AssemblyArea'                            //集结区
};

var MilstdParams = function (opt_options) {

    if (opt_options) {
        /**
        * Property: headHeightFactor
        * {Number} 箭头头部高度因子
        */
        this.headHeightFactor = (opt_options.headHeightFactor !== undefined && opt_options.headHeightFactor != null) ? opt_options.headHeightFactor : 0.2;

        /**
        * Property: headHeightFactor
        * {Number} 箭头头部宽度因子
        */
        this.headWidthFactor = (opt_options.headWidthFactor !== undefined && opt_options.headWidthFactor != null) ? opt_options.headWidthFactor : 0.5;

        /**
        * Property: headHeightFactor
        * {Number} 箭头腰部高度因子
        */
        this.neckHeightFactor = (opt_options.neckHeightFactor !== undefined && opt_options.neckHeightFactor != null) ? opt_options.neckHeightFactor : 0.8;

        /**
        * Property: headHeightFactor
        * {Number} 箭头腰部宽度因子
        */
        this.neckWidthFactor = (opt_options.neckWidthFactor !== undefined && opt_options.neckWidthFactor != null) ? opt_options.neckWidthFactor : 0.2;

        /**
        * Property: headHeightFactor
        * {Number} 箭头尾部宽度因子
        */
        this.tailWidthFactor = (opt_options.tailWidthFactor !== undefined && opt_options.tailWidthFactor != null) ? opt_options.tailWidthFactor : 0.1;
        this.hasSwallowTail = (opt_options.hasSwallowTail !== undefined && opt_options.hasSwallowTail != null) ? opt_options.hasSwallowTail : true;
        this.swallowTailFactor = (opt_options.swallowTailFactor !== undefined && opt_options.swallowTailFactor != null) ? opt_options.swallowTailFactor : 0.5;
        this.curveFitMethod = (opt_options.curveFitMethod !== undefined && opt_options.curveFitMethod != null) ? opt_options.curveFitMethod : "useBSplieFit";
        this.maxVertices = (opt_options.maxVertices !== undefined && opt_options.maxVertices != null) ? opt_options.maxVertices : 20;  //最大控制点数
    }
};
///标绘基础算法
/**
* Method: CalLengthOfTwoPoints
* 计算两点点之间的长度
* Parameters:
* p1-{ol_coordinate}
* p2-{ol_coordinate}
* Returns: 
* len-{double:长度}
*/
MilStd.commonFun.CalLengthOfTwoPoints = function (p1, p2) {
    var len = 0;
    len = Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2));
    return len;
};

/**
* Method: wholeDistance
* 计算点集之间的长度
* Parameters:
* arrDots-{Array.<ol_coordinate>}
* Returns: 
* len-{double:长度}
*/
MilStd.commonFun.wholeDistance = function (arrDots) {
    var len = 0;
    if (arrDots != null && arrDots.length > 1) {
        for (var i = 0; i < arrDots.length - 1; i++) {
            len += MilStd.commonFun.CalLengthOfTwoPoints(arrDots[i], arrDots[i + 1]);
        }
    }
    return len;
};

/**
* Method: getAzimuthAngle
* 计算方位角
* Parameters:
* geoPntStart-{Array.<ol_coordinate>:起始点}
* geoPntEnd-{Array.<ol_coordinate>：终点}
* Returns: 
* num-{double:角度}
*/
MilStd.commonFun.getAzimuthAngle = function (geoPntStart, geoPntEnd) {
    var num = 0.0;
    var num2 = Math.asin(Math.abs((geoPntEnd[1] - geoPntStart[1])) / MilStd.commonFun.CalLengthOfTwoPoints(geoPntStart, geoPntEnd));
    if ((geoPntEnd[1] >= geoPntStart[1]) && (geoPntEnd[0] >= geoPntStart[0])) {
        return (num2 + Math.PI);
    }
    if ((geoPntEnd[1] >= geoPntStart[1]) && (geoPntEnd[0] < geoPntStart[0])) {
        return (2 * Math.PI - num2);
    }
    if ((geoPntEnd[1] < geoPntStart[1]) && (geoPntEnd[0] < geoPntStart[0])) {
        return num2;
    }
    if ((geoPntEnd[1] < geoPntStart[1]) && (geoPntEnd[0] >= geoPntStart[0])) {
        num = Math.PI - num2;
    }
    return num;
};

/**
* Method: getThirdPoint
* 根据两点、角度、距离、边,计算第三个点
* Parameters:
* startPnt-{Array.<ol_coordinate>:起始点}
* endPnt-{Array.<ol_coordinate>：终点}
* angle-{double:角度}
* length-{double:长度}
* side-{string:边("left"、"rught")}
* Returns: 
* num-{double:角度}
*/
MilStd.commonFun.getThirdPoint = function (startPnt, endPnt, angle, length, side) {
    var num = MilStd.commonFun.getAzimuthAngle(startPnt, endPnt);
    var num2 = 0.0;
    if (side.toLowerCase() == "left") {
        num2 = num + angle;
    }
    else {
        num2 = num - angle;
    }
    var num3 = length * Math.cos(num2);
    var num4 = length * Math.sin(num2);
    return [endPnt[0] + num3, endPnt[1] + num4];
};

/**
* Method: getAngleOfThreePoints
* 计算三边角
* Parameters:
* pntA-{Array.<ol_coordinate>: 点A}
* pntB-{Array.<ol_coordinate>：点B}
* pntC-{Array.<ol_coordinate>：点C}
* Returns: 
* num-{double:角度}
*/
MilStd.commonFun.getAngleOfThreePoints = function (pntA, pntB, pntC) {
    var num = MilStd.commonFun.getAzimuthAngle(pntB, pntA) - MilStd.commonFun.getAzimuthAngle(pntB, pntC);
    if (num < 0.0) {
        num += 2 * Math.PI;
    }
    return num;
};

/**
* Method: getAzimuthAngle
* 计算阶乘
* Parameters:
* n-{Number: 阶乘因子}
* Returns: 
* num-{double:角度}
*/
MilStd.commonFun.getFactorial = function (n) {
    var num = 1;
    for (var i = 1; i <= n; i++) {
        num *= i;
    }
    return num;
};

/**
* Method: getBinomialFactor
* 计算二项式系数
* Parameters:
* n-{Number: 阶乘因子}
* index-{Number: 阶乘因子}
* Returns: 
* num-{double:二项式系数}
*/
MilStd.commonFun.getBinomialFactor = function (n, index) {
    var num = 0.0;
    num = MilStd.commonFun.getFactorial(n) / (MilStd.commonFun.getFactorial(index) * MilStd.commonFun.getFactorial(n - index));
    return num;
};

/**
* Method: getBinomialFactor
* 计算二次样条因子
* Parameters:
* k-{Number: 阶乘因子}
* t-{Number: 阶乘因子}
* Returns: 
* {double:二次样条因子}
*/
MilStd.commonFun.getQuadricBSplineFactor = function (k, t) {
    if (k == 0) {
        return (Math.pow((t - 1.0), 2.0) / 2.0);
    }
    if (k == 1) {
        return ((((-2.0 * Math.pow(t, 2.0)) + (2.0 * t)) + 1.0) / 2.0);
    }
    if (k == 2) {
        return (Math.pow(t, 2.0) / 2.0);
    }
    return 0.0;
};

/**
* Method: getBSplineFFactor
* 计算样条曲线因子
* Parameters:
* k-{Number: 阶乘因子}
* n-{Number: 阶乘因子}
* t-{Number: 阶乘因子}
* Returns: 
* {double:样条曲线因子}
*/
MilStd.commonFun.getBSplineFFactor = function (k, n, t) {
    if (n == 2) {
        return MilStd.commonFun.getQuadricBSplineFactor(k, t);
    }
    var num = 0.0;
    var num2 = MilStd.commonFun.getFactorial(n);
    for (var i = 0; i <= (n - k) ; i++) {
        var num4 = ((i % 2) == 0) ? 1 : -1;
        num += (num4 * MilStd.commonFun.getBinomialFactor(n + 1, i)) * Math.pow(((t + n) - k) - i, n);
    }
    return (num / num2);
};

/**
* Method: getSide
* 获取边
* Parameters:
* pnt1-{Array.<ol_coordinate>: 点}
* pnt2-{Array.<ol_coordinate>：点}
* pnt-{Array.<ol_coordinate>：点}
* Returns: 
* {String：边("left"、"right")}
*/
MilStd.commonFun.getSide = function (pnt1, pnt2, pnt) {
    var num = ((pnt2[1] - pnt1[1]) * (pnt[0] - pnt1[0])) - ((pnt[1] - pnt1[1]) * (pnt2[0] - pnt1[0]));
    if (num > 0.0) {
        return "left";
    }
    if (num < 0.0) {
        return "right";
    }
    return null;
};

/**
* Method: getMidPoint
* 获取两点的中间点
* Parameters:
* pnt1-{Array.<ol_coordinate>: 点}
* pnt2-{Array.<ol_coordinate>：点}
* Returns: 
* pnt3-{Array.<ol_coordinate>：中间点}
*/
MilStd.commonFun.getMidPoint = function (pnt1, pnt2) {
    var pnt3 = new Array();
    var x = (pnt1[0] + pnt2[0]) / 2.0;
    var y = (pnt1[1] + pnt2[1]) / 2.0;
    pnt3.push(x);
    pnt3.push(y);
    return pnt3;
};

/**
* Method: getBezierPoints
* 根据其控制点数组，获取解析bezier曲线的几何点数组
* Parameters:
* points-{Array.<ol_coordinate>:控制点数组} 
* Returns:
* {Array.<ol_coordinate>：Bezier曲线的几何点数组}
*/
MilStd.commonFun.getBezierPoints = function (points) {
    if (points.length <= 2) {
        return points;
    }
    var list = new Array();
    var n = points.length - 1;
    for (var i = 0.0; i <= 1.0; i += 0.01) {
        var x = 0.0;
        var y = 0.0;
        for (var j = 0; j <= n; j++) {
            var num6 = MilStd.commonFun.getBinomialFactor(n, j);
            var num7 = Math.pow(i, j);
            var num8 = Math.pow(1.0 - i, (n - j));
            x += ((num6 * num7) * num8) * points[j][0];
            y += ((num6 * num7) * num8) * points[j][1];
        }
        list.push([x, y]);
    }
    list.push(points[n]);
    return list;
};

/**
* Method: getBSplinePoints
* 根据其控制点数组，获取解析BSpline曲线的几何点数组
* Parameters:
* points-{Array.<ol_coordinate>:控制点数组} 
* n-{Number>=2：表示通过n项式计算}
* Returns:
* {Array.<ol_coordinate>：样条曲线的几何点数组}
*/
MilStd.commonFun.getBSplinePoints = function (points, n) {
    if ((points.length <= 2) || (points.length <= n)) {
        return points;
    }
    var list = new Array();
    var num = (points.length - n) - 1;
    list.push(points[0]);
    for (var i = 0; i <= num; i++) {
        // for (var j = 0.0; j <= 1.0; j += 0.1) {
        for (var j = 0.0; j <= 1.0; j += 0.05) {
            var x = 0.0;
            var y = 0.0;
            for (var k = 0; k <= n; k++) {
                var num7 = MilStd.commonFun.getBSplineFFactor(k, n, j);
                x += num7 * points[i + k][0];
                y += num7 * points[i + k][1];
            }
            list.push([x, y]);
        }
    }
    list.push(points[points.length - 1]);
    return list;
};

/**
* Method: geomEquals
* 判断两个几何对象是否相等
* Parameters:
* geom-{ol.geom.Geometry>:几何对象} 
* geom1-{ol.geom.Geometry>:几何对象} 
* Returns:
* equals-{Boolen：是否相等}
*/
MilStd.commonFun.geomEquals = function (geom, geom1) {
    var equals = false;
    if (geom != null) {
        equals = ((geom1[0] == geom[0] && geom1[1] == geom[1]) ||
                  (geom1[0] == null && geom1[1] == null && geom[0] == null && geom[1] == null));
    }
    return equals;
};

/**
* Method: CreateNewVertices
* 重新设置新的拐点即控制点（左上+右下）
* Parameters:
* arg-{Array.<ol_coordinate>:控制点数组} 
* Returns:
*/
MilStd.commonFun.CreateNewVertices = function (arg) {
    if (arg != null && arg.length >= 2) {
        var maxX = Math.max(arg[0][0], arg[1][0]);
        var minX = Math.min(arg[0][0], arg[1][0]);
        var maxY = Math.max(arg[0][1], arg[1][1]);
        var minY = Math.min(arg[0][1], arg[1][1]);
        var pnt1 = [minX, maxY];
        var pnt2 = [maxX, minY];
        arg.splice(0, 1, pnt1);
        arg.splice(1, 1, pnt2);
    }
};

/* * 
* 该类是对箭头算法的实现
* SimpleArrow                        //简单箭头
* DoubleArrow                        //双箭头
* StraightArrow                      //直箭头
* SingleLineArrow                    //单线箭头
*/
/**
* Method: getArrowFromVert
* 根据箭头类型和控制点，获取组成该箭头的几何图形
* Parameters:
* arg-{Array.<ol_coordinate>:控制点数组}
* milStdParams-{MilStd.MilstdParams: 军标参数}
* arrowType-{string:箭头类型（SimpleArrow、DoubleArrow、StraightArrow、SingleLineArrow）} 
* Returns:
* geom-{Array.<ol.geom.Geometry>:构建箭头的几何图形}
*/
MilStd.Arrow.getArrowFromVert = function (arg, arrowType, milStdParams) {
    var geom = null;
    if (arg != null && arg.length >= 2) {
        var parseDots = null;
        switch (arrowType) {
            case "SimpleArrow":
            case "StraightArrow":
                parseDots = MilStd.Arrow.getSimpleArrowPnts(arg, milStdParams.hasSwallowTail, milStdParams.swallowTailFactor,
                milStdParams.curveFitMethod, milStdParams.headHeightFactor, milStdParams.headWidthFactor,
                milStdParams.neckHeightFactor, milStdParams.neckWidthFactor, milStdParams.tailWidthFactor);
                geom = new Polygon([parseDots]);
                break;
            case "DoubleArrow":
                parseDots = MilStd.Arrow.getDoubleArrowPnts(arg, milStdParams.headHeightFactor,
                milStdParams.headWidthFactor, milStdParams.neckHeightFactor, milStdParams.neckWidthFactor);
                geom = new Polygon([parseDots]);
                break;
            case "SingleLineArrow":
                parseDots = MilStd.Arrow.getSLArrowPnts(arg, milStdParams.headHeightFactor, milStdParams.headWidthFactor);
                geom = new MultiLineString(parseDots);
                break;
        }
    }
    return geom;
};

/** 
* Method: getSimpleArrowPnts
* 构建箭头的所有点
* Parameters:
* inpoints-{Array.<ol_coordinate>:根据轨迹线解析得到坐标序列}
* hasSwallowTail -{Boolean:是否含燕尾} 
* swallowTailFactor  -{Number(0-1):箭头燕尾因子}
* curveFitMethod     -{string("bezier/BSpline"):曲线解析方式}
* headHeightFactor   -{Number(0-1):箭头头部高度因子} 
* headWidthFactor    -{Number(0-1):箭头头部宽度因子} 
* neckHeightFactor   -{Number(0-1):箭头腰部高度因子} 
* neckWidthFactor    -{Number(0-1):箭头头部高度因子} 
* tailWidthFactor    -{Number(0-1):箭头腰部宽度因子} 
* Returns:
* rangNew-{Array.<ol_coordinate>:构建箭头的点数组}
*/
MilStd.Arrow.getSimpleArrowPnts = function (inpoints, hasSwallowTail, swallowTailFactor, curveFitMethod, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor, tailWidthFactor) {
    if (inpoints.length < 2) {
        return inpoints;
    }
    var list2 = MilStd.Arrow.getArrowHeadPoints(inpoints, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
    var neckLeftPoint = list2[0];
    var neckRightPoint = list2[4];
    var list3 = MilStd.Arrow.getArrowBodyPoints(inpoints, neckLeftPoint, neckRightPoint, tailWidthFactor, 1.0, 1.0);
    var list4 = MilStd.Arrow.getArrowTailPoints(inpoints, tailWidthFactor, hasSwallowTail, swallowTailFactor);
    var point3 = list4[0];

    var point4 = (list4.length == 3) ? list4[1] : list4[1];
    var point5 = (list4.length == 3) ? list4[2] : list4[1];
    var num = list3.length;
    var range = list3.slice(0, Math.ceil(num / 2));
    var list6 = list3.slice(Math.ceil(num / 2));
    range.push(neckLeftPoint);
    list6.push(neckRightPoint);
    range.reverse();
    range.push(point3);
    list6.reverse();
    list6.push(point5);

    var rangNew = null;
    var list6New = null;

    if (curveFitMethod == "useBezierFit") {
        rangNew = MilStd.commonFun.getBezierPoints(range);
        list6New = MilStd.commonFun.getBezierPoints(list6);
    }
    else {
        rangNew = MilStd.commonFun.getBSplinePoints(range, 2);
        list6New = MilStd.commonFun.getBSplinePoints(list6, 2);
    }
    if (point4 != null) {
        rangNew.push(point4);
        list6New.push(point4);
    }
    rangNew.reverse();
    for (var i = 0; i < list2.length; i++) {
        rangNew.push(list2[i]);
    }
    for (var j = 0; j < list6New.length; j++) {
        rangNew.push(list6New[j]);
    }
    return rangNew;
};

/**
* Method: getSLArrowPnts
* 根据控制点数组，获取组成单线箭头的二维点数组
* Parameters:
* inpoints-{Array.<ol_coordinate>:控制点数组}
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* Returns:
* mulLine-{Array.<Array.<ol_coordinate>>:构建箭头的二维点数组}}
*/
MilStd.Arrow.getSLArrowPnts = function (inpoints, headHeightFactor, headWidthFactor) {
    if (inpoints.length < 2) {
        return null;
    }
    //单线箭头头部的三个点
    var list1 = MilStd.Arrow.getArrowHeadPointsForSLine(inpoints, headHeightFactor, headWidthFactor);
    //单线箭头腰部坐标点序列（Bezier离散）
    var list2 = MilStd.commonFun.getBezierPoints(inpoints);

    var mulLine = new Array();
    mulLine.push(list1);
    mulLine.push(list2);

    return mulLine;
};

/**
* Method: isCounterClockwise
* 根据控制点的顺序，判断是否为逆时针
* Parameters:
* vertices-{Array.<ol_coordinate>:控制点数组}
* Returns: 0：在同一直线上  >0:逆时针   <0:顺时针
*/
MilStd.Arrow.isCounterClockwise = function (vertices) {
    if (vertices.length < 3) {
        return 0;
    }
    else {
        var p1 = vertices[0];
        var p2 = vertices[1];
        var p3 = vertices[2];
        var rtn = (p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0]);
        return rtn;
    }
};
/**
* Method: getDoubleArrowPnts
* 根据控制点组成的要素，获取组成双箭头的二维点数组
* Parameters:
* inpoints-{Array.<ol_coordinate>:控制点数组}
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* neckHeightFactor-{Number(0-1):箭头腰部高度因子} 
* neckWidthFactor -{Number(0-1):箭头腰部宽度因子} 
* Returns:
* rangNew-{Array.<ol_coordinate>:构建箭头的点数组}}
*/
MilStd.Arrow.getDoubleArrowPnts = function (inpoints, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
    var range = null;

    var num = inpoints.length;
    if ((num >= 3) && (!MilStd.commonFun.geomEquals(inpoints[num - 1], inpoints[num - 2]))) {


        var point = inpoints[0];
        var point2 = inpoints[1];
        var point3 = inpoints[2];
        var point4 = null;
        if (num == 3) {
            point4 = MilStd.Arrow.getTempPnt4(point, point2, point3);
            inpoints.push(point4);
        }
        else {
            point4 = inpoints[3];
        }
        //modify by www 2016.11.3:修改控制点顺序，保证控制点为顺时针时可以正确计算
        var isCounterClockwise = MilStd.Arrow.isCounterClockwise(inpoints);
        if (isCounterClockwise < 0) {
            point = inpoints[1];
            point2 = inpoints[0];
            point3 = inpoints[3];
            point4 = inpoints[2];
        }

        var connPointTemp = MilStd.commonFun.getMidPoint(point, point2);

        var list = MilStd.Arrow.getArrowPoints(point, connPointTemp, point4, "left", headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
        var list2 = MilStd.Arrow.getArrowPoints(connPointTemp, point2, point3, "right", headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);

        var num2 = list.length;
        var num3 = Math.ceil((num2 - 5) / 2);
        range = list.slice(0, num3);
        var list4 = list.slice(num3, num3 + 5);
        var list5 = list.slice(num3 + 5);
        var list6 = list2.slice(0, num3);
        var list7 = list2.slice(num3, num3 + 5);
        var list8 = list2.slice(num3 + 5);
        range = MilStd.commonFun.getBezierPoints(range);
        for (var i = 0; i < list6.length; i++) {
            list5.push(list6[i]);
        }

        var list9 = MilStd.commonFun.getBezierPoints(list5);
        list8 = MilStd.commonFun.getBezierPoints(list8);

        for (var i = 0; i < list4.length; i++) {
            range.push(list4[i]);
        }
        for (var i = 0; i < list9.length; i++) {
            range.push(list9[i]);
        }
        for (var i = 0; i < list7.length; i++) {
            range.push(list7[i]);
        }
        for (var i = 0; i < list8.length; i++) {
            range.push(list8[i]);
        }
        if (range.length > 0) {

            if (!MilStd.commonFun.geomEquals(range[0], range[range.length - 1])) {
                range.push(range[0]);
            }
        }
    }
    return range;
};

/**
* Method: getArrowHeadPoints
* 根据其控制点数组和相关控制因子，获取箭头头部的几何点数组
* Parameters:
* points-Array.<ol_coordinate>:控制点数组} 
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* neckHeightFactor-{Number(0-1):箭头腰部高度因子} 
* neckWidthFactor -{Number(0-1):箭头腰部宽度因子} 
* Returns:
* Array.<ol_coordinate>：箭头头部的几何点数组}
*/
MilStd.Arrow.getArrowHeadPoints = function (points, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
    if (points.length < 2) {
        return points;
    }
    var length = MilStd.commonFun.wholeDistance(points) * headHeightFactor;
    var num3 = length * headWidthFactor;
    var num4 = length * neckWidthFactor;
    var num5 = points.length;

    var point = [points[num5 - 1][0], points[num5 - 1][1]];
    var num6 = MilStd.commonFun.CalLengthOfTwoPoints(point, points[num5 - 2]);
    length = (length > num6) ? num6 : length;
    var num7 = length * neckHeightFactor;
    var endPnt = MilStd.commonFun.getThirdPoint(points[num5 - 2], point, 0.0, length, "left");
    var point3 = MilStd.commonFun.getThirdPoint(points[num5 - 2], point, 0.0, num7, "left");
    var point4 = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num3, "right");
    var point5 = MilStd.commonFun.getThirdPoint(point, point3, 1.5 * Math.PI, num4, "right");
    var point6 = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num3, "left");
    var point7 = MilStd.commonFun.getThirdPoint(point, point3, 1.5 * Math.PI, num4, "left");
    var listHead = new Array();
    listHead.push(point5);
    listHead.push(point4);
    listHead.push(point);
    listHead.push(point6);
    listHead.push(point7);
    return listHead;
};

/**
* Method: getArrowHeadPointsForSLine
* 根据其控制点数组和相关控制因子，获取单线箭头头部的几何点数组
* Parameters:
* points-Array.<ol_coordinate>:控制点数组} 
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* Returns:
* Array.<ol_coordinate>：箭头头部的几何点数组}
*/
MilStd.Arrow.getArrowHeadPointsForSLine = function (points, headHeightFactor, headWidthFactor) {
    if (points.length < 2) {
        return points;
    }
    var length = MilStd.commonFun.CalLengthOfTwoPoints(points[0], points[1]) * headHeightFactor;
    // var length = MilStd.commonFun.wholeDistance(points) * headHeightFactor;
    var num3 = length * headWidthFactor;

    var num5 = points.length;

    var point = points[num5 - 1];
    var num6 = MilStd.commonFun.CalLengthOfTwoPoints(point, points[num5 - 2]);
    length = (length > num6) ? num6 : length;

    var endPnt = MilStd.commonFun.getThirdPoint(points[num5 - 2], point, 0.0, length, "left");
    var point4 = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num3, "right");
    var point6 = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num3, "left");

    var listHead = new Array();

    listHead.push(point4);
    listHead.push(point);
    listHead.push(point6);

    return listHead;
};

/**
* Method: 计算箭头腰部的点
* 根据其控制点数组和相关控制因子，获取箭头腰部的几何点数组
* Parameters:
* points-{Array.<ol_coordinate>:控制点数组} 
* neckLeftPoint  -{ol_coordinate:腰部左边的几何点} 
* neckRightPoint -{ol_coordinate:腰部右边的几何点} 
* tailWidthFactor-{Number(0-1):箭头尾部宽度因子} 
* leftFactor     -{Number(0-1):箭头腰部左边因子} 
* rightFactor    -{Number(0-1):箭头腰部右边因子} 
* Returns:
* {Array.<ol_coordinate>：箭头腰部的几何点数组}
*/
MilStd.Arrow.getArrowBodyPoints = function (points, neckLeftPoint, neckRightPoint, tailWidthFactor, leftFactor, rightFactor) {
    if (points.length < 2) {
        return points;
    }

    var num = MilStd.commonFun.wholeDistance(points);
    var num3 = MilStd.commonFun.wholeDistance(points) * tailWidthFactor;
    var num4 = MilStd.commonFun.CalLengthOfTwoPoints(neckLeftPoint, neckRightPoint);
    var num5 = num3 - (num4 / 2.0);
    var num6 = 0.0;
    var list = new Array();
    var list2 = new Array();
    for (var i = 1; i < (points.length - 1) ; i++) {
        var angle = MilStd.commonFun.getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2.0;
        num6 += MilStd.commonFun.CalLengthOfTwoPoints(points[i - 1], points[i]);
        var num9 = (num3 - ((num6 / num) * num5)) / Math.sin(angle);
        list.push(MilStd.commonFun.getThirdPoint(points[i - 1], points[i], angle, num9 * leftFactor, "right"));
        list2.push(MilStd.commonFun.getThirdPoint(points[i - 1], points[i], Math.PI - angle, num9 * rightFactor, "left"));
    }
    for (var j = 0; j < list2.length; j++) {
        list.push(list2[j]);
    }
    return list;
};

/**
* Method: getArrowTailPoints
* 根据其控制点数组和相关控制因子，获取箭头尾部的几何点数组
* Parameters:
* points-{Array.<ol_coordinate>）:控制点数组} 
* tailWidthFactor-{Number(0-1):箭头尾部宽度因子} 
* hasSwallowTail -{Boolean:是否含燕尾} 
* swallowTailFactor  -{Number(0-1):箭头燕尾因子} 
* Returns:
* {Array.<ol_coordinate>：箭头尾部的几何点数组}
*/
MilStd.Arrow.getArrowTailPoints = function (points, tailWidthFactor, hasSwallowTail, swallowTailFactor) {
    if (points.length < 2) {
        return points;
    }
    var length = MilStd.commonFun.wholeDistance(points) * tailWidthFactor;
    var list = new Array();
    var point = MilStd.commonFun.getThirdPoint(points[1], points[0], 1.5 * Math.PI, length, "right");
    var point2 = MilStd.commonFun.getThirdPoint(points[1], points[0], 1.5 * Math.PI, length, "left");
    if (hasSwallowTail) {
        var num3 = length * swallowTailFactor;
        var point3 = MilStd.commonFun.getThirdPoint(points[1], points[0], 0.0, num3, "left");
        list.push(point);
        list.push(point3);
        list.push(point2);
        return list;
    }
    list.push(point);
    list.push(point2);
    return list;
};

/**
* Method: getArrowPoints
* 根据其中的三个控制点和相关控制因子，获取组成双箭头的左边或者右边部分的几何点数组
* Parameters:
* pnt1-{ol_coordinate:控制点1} 
* pnt2-{ol_coordinate:控制点2} 
* pnt3 -{ol_coordinate:控制点3} 
* side -{string（"left"/"right"）:组成双箭头的左边部分或者右边部分} 
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* neckHeightFactor-{Number(0-1):箭头腰部高度因子} 
* neckWidthFactor -{Number(0-1):箭头腰部宽度因子} 
* Returns:
* range-{Array.<ol_coordinate>：箭头的左边部分或者右边部分的几何点数组}
*/
MilStd.Arrow.getArrowPoints = function (pnt1, pnt2, pnt3, side, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
    var point = MilStd.commonFun.getMidPoint(pnt1, pnt2);
    var num = MilStd.commonFun.CalLengthOfTwoPoints(point, pnt3);
    var endPnt = MilStd.commonFun.getThirdPoint(pnt3, point, 0.0, num * 0.3, "left");
    var point3 = MilStd.commonFun.getThirdPoint(pnt3, point, 0.0, num * 0.5, "left");
    var point4 = MilStd.commonFun.getThirdPoint(pnt3, point, 0.0, num * 0.7, "left");
    endPnt = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num / 4.0, side);
    point3 = MilStd.commonFun.getThirdPoint(point, point3, 1.5 * Math.PI, num / 4.0, side);
    point4 = MilStd.commonFun.getThirdPoint(point, point4, 1.5 * Math.PI, num / 4.0, side);

    var points = new Array();
    points.push(point);
    points.push(endPnt);
    points.push(point3);
    points.push(point4);
    points.push(pnt3);

    var list2 = MilStd.Arrow.getArrowHeadPoints(points, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
    var neckLeftPoint = list2[0];
    var neckRightPoint = list2[4];
    var tailWidthFactor = (MilStd.commonFun.CalLengthOfTwoPoints(pnt1, pnt2) / MilStd.commonFun.wholeDistance(points)) / 2.0;
    var leftFactor = (side == "left") ? 1.0 : 0.01;
    var rightFactor = (side == "left") ? 0.01 : 1.0;
    var list3 = MilStd.Arrow.getArrowBodyPoints(points, neckLeftPoint, neckRightPoint, tailWidthFactor, leftFactor, rightFactor);
    var num5 = list3.length;

    var range = list3.slice(0, Math.ceil(num5 / 2));
    var list5 = list3.slice(Math.ceil(num5 / 2));

    range.push(neckLeftPoint);
    list5.push(neckRightPoint);
    range.reverse();
    range.push(pnt1);
    list5.reverse();
    list5.push(pnt2);
    range.reverse();

    for (var i = 0; i < list2.length; i++) {
        range.push(list2[i]);
    }
    for (var i = 0; i < list5.length; i++) {
        range.push(list5[i]);
    }

    return range;
};

/**
* Method: getTempPnt4
* 根据其中的三个控制点，获取第四个控制点（双箭头需要至少3个控制点，如果只提供3个控制点，则会计算出第四个控制点）
* Parameters:
* linePnt1-{ol_coordinate:控制点数组} 
* linePnt2-{ol_coordinate:箭头头部高度因子} 
* point -{ol_coordinate:箭头头部宽度因子} 
* Returns:
* {ol_coordinate：第四个控制点}
*/
MilStd.Arrow.getTempPnt4 = function (linePnt1, linePnt2, point) {
    var point4 = null;
    var point3 = MilStd.commonFun.getMidPoint(linePnt1, linePnt2);
    var num = MilStd.commonFun.CalLengthOfTwoPoints(point3, point);
    var num2 = MilStd.commonFun.getAngleOfThreePoints(linePnt1, point3, point);
    var length = 0.0;
    var num4 = 0.0;
    if (num2 < Math.PI / 2) {
        length = num * Math.sin(num2);
        num4 = num * Math.cos(num2);
        point4 = MilStd.commonFun.getThirdPoint(linePnt1, point3, 1.5 * Math.PI, length, "left");
        return MilStd.commonFun.getThirdPoint(point3, point4, 1.5 * Math.PI, num4, "right");
    }
    else if ((num2 >= Math.PI / 2) && (num2 < Math.PI)) {
        length = num * Math.sin(Math.PI - num2);
        num4 = num * Math.cos(Math.PI - num2);
        point4 = MilStd.commonFun.getThirdPoint(linePnt1, point3, 1.5 * Math.PI, length, "left");
        return MilStd.commonFun.getThirdPoint(point3, point4, 1.5 * Math.PI, num4, "left");
    }
    else if ((num2 >= Math.PI) && (num2 < 1.5 * Math.PI)) {
        length = num * Math.sin(num2 - Math.PI);
        num4 = num * Math.cos(num2 - Math.PI);
        point4 = MilStd.commonFun.getThirdPoint(linePnt1, point3, 1.5 * Math.PI, length, "right");
        return MilStd.commonFun.getThirdPoint(point3, point4, 1.5 * Math.PI, num4, "right");
    }
    else {
        length = num * Math.sin(2 * Math.PI - num2);
        num4 = num * Math.cos(2 * Math.PI - num2);
        point4 = MilStd.commonFun.getThirdPoint(linePnt1, point3, 1.5 * Math.PI, length, "right");
        return MilStd.commonFun.getThirdPoint(point3, point4, 1.5 * Math.PI, num4, "left");
    }
};

/* * 
* 该类实现了对多种旗帜，包括三角形 矩形以及波浪形的算法
* 说明:
* TriangleFlag:'TriangleFlag'：      //三角旗
* RectFlag:'RectFlag'：              //矩形旗
* CurveFlag: 'CurveFlag'：           //波浪旗
*/
/**
* Method: getFlagFromVert
* 根据旗帜类型和控制点，获取组成旗帜的点数组
* Parameters:
* arg-{Array.<ol_coordinate>:控制点数组}
* flagType-{string:TriangleFlag（三角）、RectFlag（矩形）、CurveFlag（波浪）} 
* Returns:
* geometryArr-{Array.<ol.geom.Geometry>:构建旗帜的几何图形数组}
*/
MilStd.Flag.getFlagFromVert = function (arg, flagType) {
    var geometryArr = new Array();
    MilStd.commonFun.CreateNewVertices(arg);

    var dots = new Array();
    if (arg != null && arg.length >= 2) {
        dots.push(arg[0]);
        dots.push(arg[1]);

        var parseDots = null;
        switch (flagType) {
            case "TriangleFlag":
                parseDots = this.GetTriangleFlagDots(dots);
                break;
            case "RectFlag":
                parseDots = this.GetRectFlagDots(dots);
                break;
            case "CurveFlag":
                parseDots = this.GetCurveFlagDots(dots);
                break;
        }
        var polyGeom = new Polygon([parseDots[0]]);
        var lineGeom = new LineString(parseDots[1]);
        geometryArr.push(polyGeom);
        geometryArr.push(lineGeom);
    }

    return geometryArr;
};

/**
* Method: GetTriangleFlagDots
* 根据控制点数组，获取组成三角形旗帜的点数组
* Parameters:
* arg-{Array.<ol_coordinate>:控制点数组} 
* Returns:
* locPnts-{Array.<Array.<ol_coordinate>>：组成三角旗的几何点数组}
*/
MilStd.Flag.GetTriangleFlagDots = function (arg) {
    MilStd.commonFun.CreateNewVertices(arg);
    var locPnts = new Array();

    var num = arg.length;
    if ((num >= 2) && (!MilStd.commonFun.geomEquals(arg[num - 1], arg[num - 2]))) {
        var point = arg[0];
        var point2 = arg[1];
        var point3 = [point[0], point2[1]];
        var point4 = MilStd.commonFun.getMidPoint(point, point3);
        var point5 = [point2[0], point4[1]];

        var polyPnts = new Array();
        polyPnts.push(point4);
        polyPnts.push(point);
        polyPnts.push(point5);
        polyPnts.push(point4);

        var linPnts = new Array();
        linPnts.push(point3);
        linPnts.push(point4);

        locPnts.push(polyPnts);
        locPnts.push(linPnts);
    }
    return locPnts;
};

/**
* Method: GetRectFlagDots
* 根据控制点数组，获取组成矩形旗帜的二维点数组
* Parameters:
* arg-{Array.<ol_coordinate>:控制点数组} 
* Returns:
* locPnts-{Array.<ol_coordinate>：组成矩形旗的几何点数组}
*/
MilStd.Flag.GetRectFlagDots = function (arg) {
    MilStd.commonFun.CreateNewVertices(arg);
    var locPnts = new Array();
    var num = arg.length;
    if ((num >= 2) && (!MilStd.commonFun.geomEquals(arg[num - 1], arg[num - 2]))) {
        var point = arg[0];
        var point2 = arg[1];
        var point3 = [point[0], point2[1]];
        var point4 = MilStd.commonFun.getMidPoint(point, point3);
        var point5 = [point2[0], point4[1]];
        var point6 = [point2[0], point[1]];

        var polyPnts = new Array();
        polyPnts.push(point4);
        polyPnts.push(point);
        polyPnts.push(point6);
        polyPnts.push(point5);
        polyPnts.push(point4);

        var linPnts = new Array();
        linPnts.push(point3);
        linPnts.push(point4);

        locPnts.push(polyPnts);
        locPnts.push(linPnts);
    }
    return locPnts;
};

/**
* Method: GetCurveFlagDots
* 根据控制点数组，获取组成波浪旗帜的二维点数组
* Parameters:
* arg-{Array.<ol_coordinate>:控制点数组} 
* Returns:
* locPnts-{Array.<ol_coordinate>：组成波浪旗的几何点数组}
*/
MilStd.Flag.GetCurveFlagDots = function (arg) {
    MilStd.commonFun.CreateNewVertices(arg);
    var locPnts = new Array();
    var num = arg.length;
    if ((num >= 2) && (!MilStd.commonFun.geomEquals(arg[num - 1], arg[num - 2]))) {
        var point = arg[0];
        var point2 = arg[1];
        var point3 = [point[0], point2[1]];
        var point4 = MilStd.commonFun.getMidPoint(point, point3);
        var point5 = [point2[0], point4[1]];
        var point6 = [point2[0], point[1]];

        var length = MilStd.commonFun.CalLengthOfTwoPoints(point, point4) / 2.0;
        var num3 = MilStd.commonFun.CalLengthOfTwoPoints(point, point6);
        var endPnt = MilStd.commonFun.getThirdPoint(point6, point, 0.0, num3 / 4.0, "left");
        var point8 = MilStd.commonFun.getThirdPoint(point, endPnt, Math.PI * 1.5, length, "right");
        endPnt = MilStd.commonFun.getThirdPoint(point6, point, 0.0, (num3 / 4.0) * 3.0, "left");
        var point9 = MilStd.commonFun.getThirdPoint(point, endPnt, Math.PI * 1.5, length, "left");
        endPnt = MilStd.commonFun.getThirdPoint(point5, point4, 0.0, num3 / 4.0, "left");
        var point10 = MilStd.commonFun.getThirdPoint(point4, endPnt, Math.PI * 1.5, length, "right");
        endPnt = MilStd.commonFun.getThirdPoint(point5, point4, 0.0, (num3 / 4.0) * 3.0, "left");
        var point11 = MilStd.commonFun.getThirdPoint(point4, endPnt, Math.PI * 1.5, length, "left");

        var list = new Array();
        list.push(point);
        list.push(point8);
        list.push(point9);
        list.push(point6);
        var list2 = MilStd.commonFun.getBezierPoints(list);
        var list3 = new Array();
        list3.push(point4);
        list3.push(point10);
        list3.push(point11);
        list3.push(point5);
        var list4 = MilStd.commonFun.getBezierPoints(list3);

        var polyPnts = new Array();
        polyPnts.push(point4);
        for (var i = 0; i < list2.length; i++) {
            polyPnts.push(list2[i]);
        }

        list4.reverse();
        for (var i = 0; i < list4.length; i++) {
            polyPnts.push(list4[i]);
        }

        var linPnts = new Array();
        linPnts.push(point3);
        linPnts.push(point4);

        locPnts.push(polyPnts);
        locPnts.push(linPnts);
    }
    return locPnts;
};
/* * 
* 该类实现了各种类型的指北针的算法
* 说明：
* "ArrowCross":               //十字箭头指北针
* "CircleClosedangle":        //圆形尖角指北针
* "Closedangle":              //尖角指北针
* "DoubleClosedangle":        //双向尖角指北针
* "Fourstar":                 //四角指北针
* "Rhombus":                  //菱形指北针
* "SameDirectionClosedangle": //同向尖角指北针
* "Triangle":                 //三角指北针
* "Vane":                     //风向标指北针
*/
/**
* Method: getCompassFromVert
* 根据指北针类型和控制点，获取组成该类型指北针的点数组
* Parameters:
* arg-{Array.<ol_coordinate>:控制点数组}
* compassType-{string:指北针类型（ArrowCross、CircleClosedangle、Closedangle... etc.）} 
* Returns:
* geometryArr-{Array.<ol.geom.Geometry>:构建指北针的几何图形数组}
*/
MilStd.Compass.getCompassFromVert = function (arg, compassType) {
    MilStd.commonFun.CreateNewVertices(arg);

    var dots = new Array();
    if (arg != null && arg.length >= 2) {
        dots.push(arg[0]);
        dots.push(arg[1]);

        var parseDots = null;
        var multyLine = null;
        switch (compassType) {
            case "ArrowCross":         //十字箭头指北针
                parseDots = this.GetArrowCrossDots(dots);
                break;
            case "CircleClosedangle":  //圆形尖角指北针
                parseDots = this.GetCircleClosedangleDots(dots);
                break;
            case "Closedangle":        //尖角指北针
                parseDots = this.GetClosedangleDots(dots);
                break;
            case "DoubleClosedangle":  //双向尖角指北针
                parseDots = this.GetDoubleClosedangleDots(dots);
                break;
            case "Fourstar":           //四角指北针
                parseDots = this.GetFourstarDots(dots);
                break;
            case "Rhombus":            //菱形指北针
                parseDots = this.GetRhombusDots(dots);
                break;
            case "SameDirectionClosedangle": //同向尖角指北针
                parseDots = this.GetSameDirectionClosedangleDots(dots);
                break;
            case "Triangle":                 //三角指北针
                parseDots = this.GetTriangleDots(dots);
                break;
            case "Vane":                     //风向标指北针
                parseDots = this.GetVaneDots(dots);
                break;
        }

        var mulLinDotArr = new Array();
        var polyDotArr = new Array();
        if (parseDots != null && parseDots.length > 0) {
            for (var i = 0; i < parseDots.length; i++) {
                switch (compassType) {
                    case "ArrowCross":
                    case "DoubleClosedangle":
                    case "CircleClosedangle":
                    case "Rhombus":
                    case "SameDirectionClosedangle":
                        if (i == (parseDots.length - 1)) {
                            polyDotArr.push(parseDots[i][0]);
                        }
                        else {
                            mulLinDotArr.push(parseDots[i][0]);
                        }
                        break;
                    case "Closedangle":
                    case "Fourstar":
                        if (i % 2 == 0) {
                            mulLinDotArr.push(parseDots[i][0]);
                        }
                        else {
                            polyDotArr.push(parseDots[i][0]);
                        }
                        break;
                    case "Triangle":
                        if (i == 1 || i == 4) {
                            polyDotArr.push(parseDots[i][0]);
                        }
                        else {
                            mulLinDotArr.push(parseDots[i][0]);
                        }
                        break;
                    case "Vane":
                        if (i == (parseDots.length - 1)) {
                            mulLinDotArr.push(parseDots[i][0]);
                        }
                        else {
                            polyDotArr.push(parseDots[i][0]);
                        }
                        break;
                }
            }
            var geometryArr = new Array();
            var mulLin = new MultiLineString(mulLinDotArr);
            geometryArr.push(mulLin);
            var poly = new Polygon(polyDotArr);
            geometryArr.push(poly);
        }

        return geometryArr;
    }
};

/**
* Method: GetArrowCrossDots
* 根据控制点数组，获取组成十字箭头指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，十字箭头由5部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetArrowCrossDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }

    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);

    //绘制一个字母“N”
    var locN = new Array();
    var loc1 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16 * 1];
    locN.push(loc1);
    var loc2 = [arg1[0][0] + width / 32 * 15, arg1[0][1]];
    locN.push(loc2);
    var loc3 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16 * 1];
    locN.push(loc3);
    var loc4 = [arg1[0][0] + width / 32 * 17, arg1[0][1]];
    locN.push(loc4);


    //绘制一个字母“W”
    var locW = new Array();
    var loc5 = [arg1[0][0], arg1[0][1] - height / 32 * 15];
    locW.push(loc5);
    var loc6 = [arg1[0][0] + width / 128 * 3, arg1[0][1] - height / 32 * 17];
    locW.push(loc6);
    var loc7 = [arg1[0][0] + width / 128 * 6, arg1[0][1] - height / 32 * 15];
    locW.push(loc7);
    var loc8 = [arg1[0][0] + width / 128 * 9, arg1[0][1] - height / 32 * 17];
    locW.push(loc8);
    var loc9 = [arg1[0][0] + width / 128 * 12, arg1[0][1] - height / 32 * 15];
    locW.push(loc9);

    //绘制一个字母“E”
    var locE = new Array();
    var loc10 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 15];
    var loc11 = [arg1[0][0] + width / 16 * 15, arg1[0][1] - height / 32 * 15];
    var loc12 = [arg1[0][0] + width / 16 * 15, arg1[0][1] - height / 32 * 17];
    var loc13 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 17];
    var loc14 = [arg1[0][0] + width / 16 * 15, arg1[0][1] - height / 2];
    var loc15 = [arg1[0][0] + width / 50 * 48, arg1[0][1] - height / 2];
    locE.push(loc10);
    locE.push(loc11);
    locE.push(loc14);
    locE.push(loc15);
    locE.push(loc14);
    locE.push(loc12);
    locE.push(loc13);

    //绘制字母“S”
    var pnt4 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32];
    var pnt1 = [arg1[0][0] + width / 2 + width / 32, arg1[1][1] + height / 32 + height / 64];
    var pnt3 = [arg1[0][0] + width / 2 + width / 32 - 2 * width / 32, arg1[1][1] + height / 32 + height / 64];
    var pnt2 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32 + height / 32];
    var pnt6 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32 - height / 32];
    var pnt5 = [arg1[0][0] + width / 2 + width / 32, arg1[1][1] + height / 32 + height / 64 - height / 32];
    var pnt7 = [arg1[0][0] + width / 2 + width / 32 - width / 16, arg1[1][1] + height / 32 + height / 64 - height / 32];
    var sLoc = new Array();
    sLoc.push(pnt1);
    sLoc.push(pnt2);
    sLoc.push(pnt3);
    sLoc.push(pnt4);
    sLoc.push(pnt5);
    sLoc.push(pnt6);
    sLoc.push(pnt7);
    var sBezier = MilStd.commonFun.getBSplinePoints(sLoc, 2);

    //绘制十字箭头
    var locImg = new Array();
    var loc22 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    locImg.push(loc22);
    var loc23 = [arg1[0][0] + width / 32 * 18, arg1[0][1] - height / 16 * 4];
    locImg.push(loc23);
    var loc24 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16 * 4];
    locImg.push(loc24);
    var loc25 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 32 * 15];
    locImg.push(loc25);
    var loc26 = [arg1[0][0] + width / 16 * 12, arg1[0][1] - height / 32 * 15];
    locImg.push(loc26);
    var loc27 = [arg1[0][0] + width / 16 * 12, arg1[0][1] - height / 32 * 14];
    locImg.push(loc27);
    var loc28 = [arg1[0][0] + width / 16 * 14, arg1[0][1] - height / 2];
    locImg.push(loc28);
    var loc29 = [arg1[0][0] + width / 16 * 12, arg1[0][1] - height / 32 * 18];
    locImg.push(loc29);
    var loc30 = [arg1[0][0] + width / 16 * 12, arg1[0][1] - height / 32 * 17];
    locImg.push(loc30);
    var loc31 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 32 * 17];
    locImg.push(loc31);
    var loc32 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16 * 12];
    locImg.push(loc32);
    var loc33 = [arg1[0][0] + width / 32 * 18, arg1[0][1] - height / 16 * 12];
    locImg.push(loc33);
    var loc34 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 14];
    locImg.push(loc34);
    var loc35 = [arg1[0][0] + width / 32 * 14, arg1[0][1] - height / 16 * 12];
    locImg.push(loc35);
    var loc36 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16 * 12];
    locImg.push(loc36);
    var loc37 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 32 * 17];
    locImg.push(loc37);
    var loc38 = [arg1[0][0] + width / 16 * 4, arg1[0][1] - height / 32 * 17];
    locImg.push(loc38);
    var loc39 = [arg1[0][0] + width / 16 * 4, arg1[0][1] - height / 32 * 18];
    locImg.push(loc39);
    var loc40 = [arg1[0][0] + width / 16 * 2, arg1[0][1] - height / 2];
    locImg.push(loc40);
    var loc41 = [arg1[0][0] + width / 16 * 4, arg1[0][1] - height / 32 * 14];
    locImg.push(loc41);
    var loc42 = [arg1[0][0] + width / 16 * 4, arg1[0][1] - height / 32 * 15];
    locImg.push(loc42);
    var loc43 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 32 * 15];
    locImg.push(loc43);
    var loc44 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16 * 4];
    locImg.push(loc44);
    var loc45 = [arg1[0][0] + width / 32 * 14, arg1[0][1] - height / 16 * 4];
    locImg.push(loc45);

    locImg.push(loc22);

    var locArr = new Array();
    for (var i = 0; i < 5; i++) {
        locArr[i] = new Array();
    }
    locArr[0].push(locN);
    locArr[1].push(locW);
    locArr[2].push(locE);
    locArr[3].push(sBezier);
    locArr[4].push(locImg);

    return locArr;
};

/**
* Method: GetCircleClosedangleDots
* 根据控制点数组，获取组成圆形尖角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，圆形尖角由4部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetCircleClosedangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }

    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;
    var loc5 = new Array();

    //绘制N
    loc1 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16];
    loc5.push(loc1);
    loc2 = [arg1[0][0] + width / 32 * 15, arg1[0][1]];
    loc5.push(loc2);
    loc3 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16];
    loc5.push(loc3);
    loc4 = [arg1[0][0] + width / 32 * 17, arg1[0][1]];
    loc5.push(loc4);



    //绘制菱形
    var loc6 = null;
    var loc7 = null;
    var loc8 = null;
    var loc9 = null;
    var loc10 = null;

    var loc11 = new Array();
    loc6 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc11.push(loc6);
    loc7 = [arg1[0][0] + width / 64 * 15, arg1[0][1] - height];
    loc11.push(loc7);
    loc8 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 32 * 28];
    loc11.push(loc8);
    loc9 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 32 * 28];
    loc11.push(loc9);
    loc10 = [arg1[0][0] + width / 64 * 49, arg1[0][1] - height];
    loc11.push(loc10);
    loc11.push(loc6);

    //绘制横线
    var loc12 = null;
    var loc13 = null;
    var loc14 = new Array();
    var len1 = arg1[0][0] + width / 2 - height / 20 * 9;
    var len2 = arg1[0][0] + width / 2 + height / 20 * 9;

    loc12 = [len1, arg1[0][1] - height / 16 * 9];
    loc13 = [len2, arg1[0][1] - height / 16 * 9];

    loc14.push(loc12);
    loc14.push(loc13);

    //绘制圆
    var loc16 = null;
    var loc17 = null;
    var loc18 = 0;
    var loc19 = 0;
    var loc20 = 0;
    var loc21 = 0;
    var loc22 = 0;
    var loc23 = new Array();
    var loc24 = 0;

    loc16 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 9];
    loc17 = [arg1[0][0] + width / 2, arg1[0][1] - height / 5 * 1];
    loc18 = MilStd.commonFun.CalLengthOfTwoPoints(loc16, loc17);
    while (loc24 < 500) {
        loc19 = Math.sin(Math.PI * 2 * loc24 / 500);
        loc20 = Math.cos(Math.PI * 2 * loc24 / 500);
        loc21 = loc16[0] + loc18 * loc19;
        loc22 = loc16[1] + loc18 * loc20;
        loc23.push([loc21, loc22]);
        ++loc24;
    }
    loc23.push(loc23[0]);

    var loc25 = new Array();
    for (var i = 0; i < 4; i++) {
        loc25[i] = new Array();
    }
    loc25[0].push(loc5);
    loc25[1].push(loc14);
    loc25[2].push(loc23);
    loc25[3].push(loc11);

    return loc25;
};

/**
* Method: GetClosedangleDots
* 根据控制点数组，获取组成尖角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，尖角指北针由2部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetClosedangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var loc4 = new Array();
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = [arg1[0][0] + width / 2, arg1[0][1]];
    loc4.push(loc1);
    var loc2 = [arg1[0][0] + width, arg1[0][1] - height];
    loc4.push(loc2);
    var loc3 = [arg1[0][0] + width / 2, arg1[0][1] - height / 4 * 3];
    loc4.push(loc3);

    var loc8 = new Array();
    var loc5 = [arg1[0][0] + width / 2, arg1[0][1]];
    loc8.push(loc5);
    var loc6 = [arg1[0][0], arg1[0][1] - height];
    loc8.push(loc6);
    var loc7 = [arg1[0][0] + width / 2, arg1[0][1] - height / 4 * 3];
    loc8.push(loc7);

    var loc9 = new Array();
    for (var i = 0; i < 2; i++) {
        loc9[i] = new Array();
    }
    loc9[0].push(loc4);
    loc9[1].push(loc8);

    return loc9;
};

/**
* Method: GetDoubleClosedangleDots
* 根据控制点数组，获取组成双向尖角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，双向尖角指北针由4部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetDoubleClosedangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;

    var loc5 = new Array();

    //绘制N
    loc1 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16];
    loc5.push(loc1);
    loc2 = [arg1[0][0] + width / 32 * 15, arg1[0][1]];
    loc5.push(loc2);
    loc3 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16];
    loc5.push(loc3);
    loc4 = [arg1[0][0] + width / 32 * 17, arg1[0][1]];
    loc5.push(loc4);

    //绘制菱形
    var loc6 = null;
    var loc7 = null;
    var loc8 = null;
    var loc9 = null;
    var loc10 = null;
    var loc11 = new Array();
    loc6 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc11.push(loc6);
    loc7 = [arg1[0][0], arg1[0][1] - height / 10 * 7];
    loc11.push(loc7);
    loc8 = [arg1[0][0] + width / 32 * 13, arg1[0][1] - height / 32 * 18];
    loc11.push(loc8);
    loc9 = [arg1[0][0] + width / 32 * 19, arg1[0][1] - height / 32 * 18];
    loc11.push(loc9);
    loc10 = [arg1[0][0] + width, arg1[0][1] - height / 10 * 7];
    loc11.push(loc10);
    loc11.push(loc6);
    //绘制相反方向的菱形
    var loc12 = null;
    var loc13 = null;
    var loc14 = null;
    var loc15 = null;
    var loc16 = new Array();
    loc12 = [arg1[0][0], arg1[0][1] - height / 10 * 3];
    loc16.push(loc12);
    loc13 = [arg1[0][0] + width / 2, arg1[0][1] - height / 8 * 7];
    loc16.push(loc13);
    loc14 = [arg1[0][0] + width, arg1[0][1] - height / 10 * 3];
    loc16.push(loc14);
    loc15 = [arg1[0][0] + width / 2, arg1[0][1] - height / 10 * 7];
    loc16.push(loc15);
    loc16.push(loc12);

    //绘制字母“S”
    var pnt4 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32];
    var pnt1 = [arg1[0][0] + width / 2 + width / 32, arg1[1][1] + height / 32 + height / 64];
    var pnt3 = [arg1[0][0] + width / 2 + width / 32 - 2 * width / 32, arg1[1][1] + height / 32 + height / 64];
    var pnt2 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32 + height / 32];
    var pnt6 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32 - height / 32];
    var pnt5 = [arg1[0][0] + width / 2 + width / 32, arg1[1][1] + height / 32 + height / 64 - height / 32];
    var pnt7 = [arg1[0][0] + width / 2 + width / 32 - width / 16, arg1[1][1] + height / 32 + height / 64 - height / 32];
    var sLoc = new Array();
    sLoc.push(pnt1);
    sLoc.push(pnt2);
    sLoc.push(pnt3);
    sLoc.push(pnt4);
    sLoc.push(pnt5);
    sLoc.push(pnt6);
    sLoc.push(pnt7);
    var sBezier = MilStd.commonFun.getBSplinePoints(sLoc, 2);


    var loc23 = new Array();
    for (var i = 0; i < 4; i++) {
        loc23[i] = new Array();
    }
    loc23[0].push(loc5);
    loc23[1].push(sBezier);
    loc23[2].push(loc16);
    loc23[3].push(loc11);

    return loc23;
};

/**
* Method: GetFourstarDots
* 根据控制点数组，获取组成四角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，四角指北针由4部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetFourstarDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;
    var loc5 = new Array();
    loc1 = [arg1[0][0] + width / 2, arg1[0][1]];
    loc5.push(loc1);
    loc2 = [arg1[0][0] + width / 2, arg1[0][1] - height];
    loc5.push(loc2);
    loc3 = [arg1[0][0] + width / 8 * 3, arg1[0][1] - height / 8 * 5];
    loc5.push(loc3);
    loc4 = [arg1[0][0] + width / 8 * 5, arg1[0][1] - height / 8 * 3];
    loc5.push(loc4);
    loc5.push(loc1);

    var loc6 = null;
    var loc7 = null;
    var loc8 = new Array();
    loc6 = [arg1[0][0], arg1[0][1] - height / 2];
    loc8.push(loc6);
    loc7 = [arg1[0][0] + width, arg1[0][1] - height / 2];
    loc8.push(loc7);
    loc8.push(loc4);
    loc8.push(loc3);
    loc8.push(loc6);

    var loc9 = null;
    var loc10 = null;
    var loc11 = new Array();
    loc11.push(loc6);
    loc11.push(loc7);
    loc9 = [arg1[0][0] + width / 8 * 5, arg1[0][1] - height / 8 * 5];
    loc11.push(loc9);
    loc10 = [arg1[0][0] + width / 8 * 3, arg1[0][1] - height / 8 * 3];
    loc11.push(loc10);
    loc11.push(loc6);

    var loc12 = new Array();
    loc12.push(loc1);
    loc12.push(loc2);
    loc12.push(loc9);
    loc12.push(loc10);


    var loc13 = new Array();
    for (var i = 0; i < 4; i++) {
        loc13[i] = new Array();
    }
    loc13[0].push(loc5);
    loc13[1].push(loc8);
    loc13[2].push(loc11);
    loc13[3].push(loc12);

    return loc13;
};

/**
* Method: GetRhombusDots
* 根据控制点数组，获取组成菱形指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，菱形指北针由3部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetRhombusDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;
    var loc5 = new Array();
    var loc6 = new Array();

    var loc8 = null;
    var loc9 = null;
    var loc10 = null;
    var loc11 = null;
    var loc12 = new Array();

    loc1 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc5.push(loc1);
    loc2 = [arg1[0][0], arg1[0][1] - height / 16 * 9];
    loc5.push(loc2);
    loc3 = [arg1[0][0] + width, arg1[0][1] - height / 16 * 9];
    loc5.push(loc3);
    loc5.push(loc1);

    loc4 = [arg1[0][0] + width / 2, arg1[1][1]];
    loc6.push(loc3);
    loc6.push(loc4);
    loc6.push(loc2);
    //2017.1.19修改
    loc6.push(loc3);

    loc8 = [(arg1[0][0] + width / 32 * 13), arg1[0][1] - height / 16 * 1];
    loc12.push(loc8);
    loc9 = [(arg1[0][0] + width / 32 * 13), arg1[0][1]];
    loc12.push(loc9);
    loc10 = [arg1[0][0] + width / 32 * 19, arg1[0][1] - height / 16 * 1];
    loc12.push(loc10);
    loc11 = [arg1[0][0] + width / 32 * 19, arg1[0][1]];
    loc12.push(loc11);
    var loc7 = new Array();
    for (var i = 0; i < 3; i++) {
        loc7[i] = new Array();
    }
    loc7[0].push(loc5);
    loc7[1].push(loc12);
    loc7[2].push(loc6);

    return loc7;
};

/**
* Method: GetSameDirectionClosedangleDots
* 根据控制点数组，获取组成同向尖角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，同向尖角指北针由3部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetSameDirectionClosedangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }

    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = [arg1[0][0] + width / 32 * 15, arg1[0][1]];
    var loc2 = [arg1[0][0], arg1[0][1] - height / 16 * 13];
    var loc3 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16 * 11];
    var loc4 = [arg1[0][0] + width / 16 * 15, arg1[0][1] - height / 16 * 13];
    var loc5 = new Array();
    loc5.push(loc1);
    loc5.push(loc2);
    loc5.push(loc3);
    loc5.push(loc4);
    loc5.push(loc1);

    var loc6 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 32 * 1];
    var loc7 = [arg1[0][0] + width / 16, arg1[0][1] - height / 32 * 27];
    var loc8 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16 * 12];
    var loc9 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 27];
    var loc10 = new Array();
    loc10.push(loc6);
    loc10.push(loc7);
    loc10.push(loc8);
    loc10.push(loc9);

    //绘制N
    var loc11 = [arg1[0][0] + width / 32 * 14, arg1[0][1] - height];
    var loc12 = [arg1[0][0] + width / 32 * 14, arg1[0][1] - height / 16 * 15];
    var loc13 = [arg1[0][0] + width / 32 * 18, arg1[0][1] - height];
    var loc14 = [arg1[0][0] + width / 32 * 18, arg1[0][1] - height / 16 * 15];
    var loc15 = new Array();
    loc15.push(loc11);
    loc15.push(loc12);
    loc15.push(loc13);
    loc15.push(loc14);


    var loc16 = new Array();
    for (var i = 0; i < 3; i++) {
        loc16[i] = new Array();
    }
    loc16[0].push(loc5);
    loc16[1].push(loc15);
    loc16[2].push(loc10);

    return loc16;
};

/**
* Method: GetTriangleDots
* 根据控制点数组，获取组成三角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，三角指北针由6部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetTriangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var locN = new Array();
    var loc1 = [arg1[0][0] + width / 32 * 13, arg1[0][1] - height / 16 * 1];
    locN.push(loc1);
    var loc2 = [arg1[0][0] + width / 32 * 13, arg1[0][1]];
    locN.push(loc2);
    var loc3 = [arg1[0][0] + width / 32 * 19, arg1[0][1] - height / 16 * 1];
    locN.push(loc3);
    var loc4 = [arg1[0][0] + width / 32 * 19, arg1[0][1]];
    locN.push(loc4);

    var loc11 = new Array();
    var loc5 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc11.push(loc5);
    var loc6 = [arg1[0][0], arg1[0][1] - height / 32 * 17];
    loc11.push(loc6);
    var loc7 = [arg1[0][0] + width / 2, arg1[0][1] - height / 32 * 17];
    loc11.push(loc7);

    var loc12 = new Array();
    var loc8 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc12.push(loc8);
    var loc9 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 17];
    loc12.push(loc9);
    var loc10 = [arg1[0][0] + width / 2, arg1[0][1] - height / 32 * 17];
    loc12.push(loc10);

    var loc15 = new Array();
    var loc13 = [arg1[0][0], arg1[0][1] - height / 32 * 18];
    loc15.push(loc13);
    var loc14 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 18];
    loc15.push(loc14);

    var loc19 = new Array();
    var loc16 = [arg1[0][0] + width / 2, arg1[0][1] - height];
    loc19.push(loc16);
    var loc17 = [arg1[0][0], arg1[0][1] - height / 32 * 19];
    loc19.push(loc17);
    var loc18 = [arg1[0][0] + width / 2, arg1[0][1] - height / 32 * 19];
    loc19.push(loc18);

    var loc20 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 19];
    var loc21 = new Array();
    loc21.push(loc18);
    loc21.push(loc20);
    loc21.push(loc16);

    var loc22 = new Array();
    for (var i = 0; i < 6; i++) {
        loc22[i] = new Array();
    }
    loc22[0].push(locN);
    loc22[1].push(loc11);
    loc22[2].push(loc12);
    loc22[3].push(loc15);
    loc22[4].push(loc19);
    loc22[5].push(loc21);

    return loc22;
};

/**
* Method: GetVaneDots
* 根据控制点数组，获取组成风向标指北针的二维点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol_coordinate>>：二维点数组，风向标指北针由11部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetVaneDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }

    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;
    var loc5 = new Array();
    var loc6 = new Array();

    //菱形 
    loc1 = [arg1[0][0] + width / 2, arg1[0][1]];
    loc2 = [arg1[0][0], arg1[0][1] - height / 8];
    loc3 = [arg1[0][0] + width / 2, arg1[0][1] - height / 8 * 2];
    loc4 = [arg1[0][0] + width, arg1[0][1] - height / 8];
    loc5.push(loc1);
    loc5.push(loc2);
    loc5.push(loc3);
    loc6.push(loc1);
    loc6.push(loc3);
    loc6.push(loc4);
    loc6.push(loc1);
    //矩形    
    var loc7 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 8 * 2];
    var loc8 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height];
    var loc9 = [arg1[0][0] + width / 28 * 13, arg1[0][1] - height / 35 * 34];
    var loc10 = [arg1[0][0] + width / 28 * 15, arg1[0][1] - height / 35 * 34];
    var loc11 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height];
    var loc12 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 8 * 2];
    var loc13 = new Array();
    loc13.push(loc7);
    loc13.push(loc8);
    loc13.push(loc9);
    loc13.push(loc10);
    loc13.push(loc11);
    loc13.push(loc12);
    //两侧小矩形 
    var loc46 = new Array();
    var loc14 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 21];
    loc46.push(loc14);
    var loc15 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 22];
    loc46.push(loc15);
    var loc16 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 23];
    loc46.push(loc16);
    var loc17 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 22];
    loc46.push(loc17);

    var loc47 = new Array();
    var loc18 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 23];
    var loc19 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 24];
    var loc20 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 25];
    var loc21 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 24];
    loc47.push(loc18);
    loc47.push(loc19);
    loc47.push(loc20);
    loc47.push(loc21);

    var loc48 = new Array();
    var loc22 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 25];
    var loc23 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 26];
    var loc24 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 27];
    var loc25 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 26];
    loc48.push(loc22);
    loc48.push(loc23);
    loc48.push(loc24);
    loc48.push(loc25);

    var loc49 = new Array();
    var loc26 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 27];
    var loc27 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 28];
    var loc28 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 29];
    var loc29 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 28];
    loc49.push(loc26);
    loc49.push(loc27);
    loc49.push(loc28);
    loc49.push(loc29);

    var loc50 = new Array();
    var loc30 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 21];
    var loc31 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 22];
    var loc32 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 23];
    var loc33 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 22];
    loc50.push(loc30);
    loc50.push(loc31);
    loc50.push(loc32);
    loc50.push(loc33);

    var loc51 = new Array();
    var loc34 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 23];
    var loc35 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 24];
    var loc36 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 25];
    var loc37 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 24];
    loc51.push(loc34);
    loc51.push(loc35);
    loc51.push(loc36);
    loc51.push(loc37);

    var loc52 = new Array();
    var loc38 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 25];
    var loc39 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 26];
    var loc40 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 27];
    var loc41 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 26];
    loc52.push(loc38);
    loc52.push(loc39);
    loc52.push(loc40);
    loc52.push(loc41);

    var loc53 = new Array();
    var loc42 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 27];
    var loc43 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 28];
    var loc44 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 29];
    var loc45 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 28];
    loc53.push(loc42);
    loc53.push(loc43);
    loc53.push(loc44);
    loc53.push(loc45);

    var loc54 = new Array();
    for (var i = 0; i < 11; i++) {
        loc54[i] = new Array();
    }
    loc54[0].push(loc5);
    loc54[1].push(loc13);
    loc54[2].push(loc46);
    loc54[3].push(loc47);
    loc54[4].push(loc48);
    loc54[5].push(loc49);
    loc54[6].push(loc50);
    loc54[7].push(loc51);
    loc54[8].push(loc52);
    loc54[9].push(loc53);
    loc54[10].push(loc6);

    return loc54;

};

/* * 
* 该类实现了贝赛尔曲线意义贝塞尔曲线成区的算法
* 说明：
* "Bezier":            //贝塞尔曲线成区
* "BezierLine":        //贝塞尔曲线
*/
/**
* Method: getBezierFromVert
* 根据贝塞尔类型和控制点，获取组成该类型贝塞尔的点数组
* Parameters:
* arg-{Array.<ol_coordinate>:控制点数组}
* bazierType-{string:贝塞尔类型（Bezier、BezierLine）} 
* Returns:
* geom-{Array.<ol.geom.Geometry>:构建贝塞尔的几何图形数组}
*/
MilStd.Bezier.getBezierFromVert = function (arg, bazierType) {
    var geom = null;
    if (bazierType == "BezierLine") {
        var dots = MilStd.commonFun.getBSplinePoints(arg, 2);
        geom = new LineString(dots);
    }
    else if (bazierType == "Bezier") {
        arg.push(arg[0]);
        var dots = MilStd.commonFun.getBSplinePoints(arg, 2);
        arg.pop(arg[arg.length - 1]);
        geom = new Polygon([dots]);
    }
    else if (bazierType == "AssemblyArea") {
        var dots = MilStd.Bezier.GetAssemblyAreaDots(arg);
        geom = new Polygon([dots]);
    }
    return geom;
};

/**
* Method: GetAssemblyAreaDots
* 根据控制点数组，获取组成集结区的点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<ol_coordinate>：组成集结区的点数组}
*/
MilStd.Bezier.GetAssemblyAreaDots = function (arg1) {
    var loc2 = null;
    var loc3 = null;
    var loc4 = 0;
    var loc5 = null;
    var loc6 = null;
    var loc7 = null;
    var loc8 = null;
    var loc9 = null;
    var loc10 = null;
    var loc11 = null;
    var loc12 = null;
    var loc13 = null;
    var loc14 = null;
    var loc1 = arg1.length;
    if (loc1 >= 2 && !(arg1[loc1 - 1] == arg1[loc1 - 2])) {
        loc2 = arg1[0];
        loc3 = arg1[1];
        loc4 = MilStd.commonFun.CalLengthOfTwoPoints(loc2, loc3);
        loc5 = MilStd.commonFun.getMidPoint(loc2, loc3);
        loc6 = MilStd.commonFun.getThirdPoint(loc2, loc5, Math.PI * 1.5, loc4 / 4.5, "right");
        loc7 = MilStd.commonFun.getThirdPoint(loc2, loc3, 0, loc4 * 0.8, "left");
        loc8 = MilStd.commonFun.getThirdPoint(loc2, loc7, Math.PI * 1.5, loc4 / 5, "left");
        loc9 = MilStd.commonFun.getThirdPoint(loc2, loc3, 0, loc4 * 0.45, "left");
        loc10 = MilStd.commonFun.getThirdPoint(loc2, loc9, Math.PI * 1.5, loc4 / 10, "left");
        loc11 = MilStd.commonFun.getThirdPoint(loc2, loc3, 0, loc4 * 0.15, "left");
        loc12 = MilStd.commonFun.getThirdPoint(loc2, loc11, Math.PI * 1.5, loc4 / 7, "left");
        loc13 = new Array();
        loc14 = new Array();
        loc14.push(loc2, loc6, loc3, loc12, loc10, loc8);
        loc13 = MilStd.Bezier.getAdvancedBezierPoints(loc14);
    }
    return loc13;
};

/**
* Method: getAdvancedBezierPoints
* 根据控制点数组，获取组成集结区的点数组
* Parameters:
* arg1-{Array.<ol_coordinate>:控制点数组}
* Returns:
* locArr-{Array.<ol_coordinate>：组成集结区的贝塞尔点数组}
*/
MilStd.Bezier.getAdvancedBezierPoints = function (arg1) {
    var loc8 = 0;
    var loc9 = 0;
    var loc10 = 0;
    var loc11 = 0;
    var loc12 = 0;
    var loc13 = 0;
    arg1 = arg1.slice();
    var loc1 = arg1.length;
    arg1.push(arg1[0]);
    var loc2 = new Array();
    var loc3 = 0;
    while (loc3 < loc1) {
        loc2.push(MilStd.commonFun.getMidPoint(arg1[loc3], arg1[loc3 + 1]));
        ++loc3;
    }
    loc2.push(loc2[0]);
    arg1.push(arg1[1]);
    var loc4 = new Array();
    loc3 = 0;
    while (loc3 < loc1) {
        loc8 = MilStd.commonFun.CalLengthOfTwoPoints(arg1[loc3], arg1[loc3 + 1]);
        loc9 = MilStd.commonFun.CalLengthOfTwoPoints(arg1[loc3 + 1], arg1[loc3 + 2]);
        loc10 = MilStd.commonFun.CalLengthOfTwoPoints(loc2[loc3], loc2[loc3 + 1]);
        loc11 = loc10 * loc8 / (loc8 + loc9);
        loc4.push(MilStd.commonFun.getThirdPoint(loc2[loc3 + 1], loc2[loc3], 0, loc11, "left"));
        ++loc3;
    }
    var loc5 = new Array();
    loc3 = 0;
    while (loc3 < loc1) {
        loc12 = arg1[loc3 + 1][0] - loc4[loc3][0];
        loc13 = arg1[loc3 + 1][1] - loc4[loc3][1];

        loc5.push([loc2[loc3][0] + loc12, loc2[loc3][1] + loc13]);
        loc5.push(arg1[loc3 + 1]);
        loc5.push([loc2[loc3 + 1][0] + loc12, loc2[loc3 + 1][1] + loc13]);
        ++loc3;
    }
    var loc6 = new Array();
    var loc7 = loc5.slice();
    loc7.push(loc5[0], loc5[1]);
    loc3 = 1;
    while (loc3 < loc7.length) {
        loc6 = loc6.concat(MilStd.commonFun.getBezierPoints(loc7.slice(loc3, loc3 + 4)));
        loc3 = loc3 + 3;
    }
    return loc6;
};

MilStd.MilStdGeomtry = function (verticePnts, miltype, milStdParams, opt_options) {
    GeometryCollection.call(this, []);
    if (verticePnts === undefined || verticePnts == null) {
        return;
    }
    var options;
    if (opt_options !== undefined && opt_options == null) {

        GeometryCollection.call(this, opt_options);
    }
    this.vertices = verticePnts;
    this.milStdType = miltype;
    this.milStdParams = (milStdParams !== undefined && milStdParams != null) ? milStdParams : new MilStd.MilstdParams();
    if (this.milStdType == MilStd.EnumMilstdType.TriangleFlag || this.milStdType == MilStd.EnumMilstdType.RectFlag ||
        this.milStdType == MilStd.EnumMilstdType.CurveFlag || this.milStdType == MilStd.EnumMilstdType.ArrowCross ||
        this.milStdType == MilStd.EnumMilstdType.CircleClosedangle || this.milStdType == MilStd.EnumMilstdType.Closedangle ||
        this.milStdType == MilStd.EnumMilstdType.DoubleClosedangle || this.milStdType == MilStd.EnumMilstdType.Fourstar ||
        this.milStdType == MilStd.EnumMilstdType.Rhombus || this.milStdType == MilStd.EnumMilstdType.SameDirectionClosedangle ||
        this.milStdType == MilStd.EnumMilstdType.Triangle || this.milStdType == MilStd.EnumMilstdType.Vane ||
        this.milStdType == MilStd.EnumMilstdType.AssemblyArea) {
        this.milStdParams.maxVertices = 2;
    }
    if (this.milStdType == MilStd.EnumMilstdType.DoubleArrow) {
        if(milStdParams.maxVertices!=undefined && milStdParams.maxVertices<=4 && milStdParams.maxVertices>=3)
        {
           this.milStdParams.maxVertices = milStdParams.maxVertices;
        }
        else
        {
            this.milStdParams.maxVertices = 4;
        }

        //this.milStdParams.maxVertices = !!milStdParams.maxVertices?milStdParams.maxVertices:4;
    }
};
inherits(MilStd.MilStdGeomtry, GeometryCollection);

MilStd.MilStdGeomtry.prototype.Create = function () {
    if (this.milStdType == "DoubleArrow") {
        if (this.vertices.length < 3) {
            return;
        };
    }
    else {
        if (this.vertices.length < 2) {
            return;
        };
    }
    switch (this.milStdType) {
        case MilStd.EnumMilstdType.SimpleArrow:
        case MilStd.EnumMilstdType.StraightArrow:
        case MilStd.EnumMilstdType.DoubleArrow:
        case MilStd.EnumMilstdType.SingleLineArrow:
            var geom = MilStd.Arrow.getArrowFromVert(this.vertices, this.milStdType, this.milStdParams);
            this.setGeometriesArray([geom]);
            break;
        case MilStd.EnumMilstdType.TriangleFlag:
        case MilStd.EnumMilstdType.RectFlag:
        case MilStd.EnumMilstdType.CurveFlag:
            var geomArr = MilStd.Flag.getFlagFromVert(this.vertices, this.milStdType);
            this.setGeometriesArray(geomArr);
            break;
        case MilStd.EnumMilstdType.ArrowCross:
        case MilStd.EnumMilstdType.CircleClosedangle:
        case MilStd.EnumMilstdType.Closedangle:
        case MilStd.EnumMilstdType.DoubleClosedangle:
        case MilStd.EnumMilstdType.Fourstar:
        case MilStd.EnumMilstdType.Rhombus:
        case MilStd.EnumMilstdType.SameDirectionClosedangle:
        case MilStd.EnumMilstdType.Triangle:
        case MilStd.EnumMilstdType.Vane:
            var geomArr = MilStd.Compass.getCompassFromVert(this.vertices, this.milStdType);
            this.setGeometriesArray(geomArr);
            break;
        case MilStd.EnumMilstdType.Bezier:
        case MilStd.EnumMilstdType.BezierLine:
        case MilStd.EnumMilstdType.AssemblyArea:
            //var geom = MilStd.Bezier.getBezierFromVert(this.vertices, this.milStdType);
            var geom = MilStd.Compass.getBezierFromVert(this.vertices, this.milStdType);
            this.setGeometriesArray([geom]);
            break;
    }
};

MilStd.MilStdGeomtry.prototype.Update = function (vertices, isMouseMove) {
    if (this.milStdType == "DoubleArrow") {
        if (vertices.length < 3) {
            return;
        };
    }
    else {
        if (vertices.length < 2) {
            return;
        };
    }

    if (!isMouseMove) {
        this.vertices = vertices;
    }

    switch (this.milStdType) {
        case MilStd.EnumMilstdType.SimpleArrow:
        case MilStd.EnumMilstdType.StraightArrow:
        case MilStd.EnumMilstdType.DoubleArrow:
        case MilStd.EnumMilstdType.SingleLineArrow:
            var geom = MilStd.Arrow.getArrowFromVert(vertices, this.milStdType, this.milStdParams);
            this.setGeometriesArray([geom]);
            break;
        case MilStd.EnumMilstdType.TriangleFlag:
        case MilStd.EnumMilstdType.RectFlag:
        case MilStd.EnumMilstdType.CurveFlag:
            var geomArr = MilStd.Flag.getFlagFromVert(vertices, this.milStdType);
            this.setGeometriesArray(geomArr);
            break;
        case MilStd.EnumMilstdType.ArrowCross:
        case MilStd.EnumMilstdType.CircleClosedangle:
        case MilStd.EnumMilstdType.Closedangle:
        case MilStd.EnumMilstdType.DoubleClosedangle:
        case MilStd.EnumMilstdType.Fourstar:
        case MilStd.EnumMilstdType.Rhombus:
        case MilStd.EnumMilstdType.SameDirectionClosedangle:
        case MilStd.EnumMilstdType.Triangle:
        case MilStd.EnumMilstdType.Vane:
            var geomArr = MilStd.Compass.getCompassFromVert(vertices, this.milStdType);
            this.setGeometriesArray(geomArr);
            break;
        case MilStd.EnumMilstdType.Bezier:
        case MilStd.EnumMilstdType.BezierLine:
        case MilStd.EnumMilstdType.AssemblyArea:
            var geom = MilStd.Bezier.getBezierFromVert(vertices, this.milStdType);
            this.setGeometriesArray([geom]);
            break;
    }
};

/**
* @classdesc
* 军标绘制事件：绘制开始、绘制结束
* @constructor
* @extends {ol.events.Event}
* @param {ZondyMilStd.EnumMilstdType} etype.
* @param {ol.Feature} feature.
*/
MilStd.event.MilStdDrawEvent = function (etype, feature) {
    Event.call(this, etype);
    this.feature = feature !== undefined ? feature : null;
};
inherits(MilStd.event.MilStdDrawEvent, Event);

MilStd.event.MilStdDrawEvent.DRAW_START = "draw_start";  //开始绘制
MilStd.event.MilStdDrawEvent.DRAW_END = "draw_end";      //结束绘制
MilStd.event.MilStdDrawEvent.MODIFY_FEATURE_END = "modify_one_feature";  //修改完成一个要素

/**
* @classdesc 军标绘制工具
* @constructor
* @extends {ol.Observable}
* @param {ol.Map} map.
*/
var MilStdDrawTool = function (map) {
    Observable.call(this, []);
    this.vertices = null;        //军标控制点
    this.milStdGeom = null;      //军标几何
    this.feature = null;         //军标矢量要素
    this.milStdType = null;      //军标类型
    this.milStdParams = null;    //军标参数
    this.mapViewport = null;
    this.dbClickZoomEvent = null;
    this.map = map !== undefined ? map : null;
    this.featureName = null;
    var strock = new Stroke({
        color: "#000000",
        width: 1.25
    });
    var fill = new Fill({
        color: "rgba(0,0,0,0.5)"
    });
    this.style = new Style({
        fill: fill,
        stroke: strock
        //image: image
    });
    var featureOverlayTem = new VectorLayer({
        source: new VectorSource({
            useSpatialIndex: false,
            wrapX: false
        })
    });
    this.featureOverLay = featureOverlayTem;
    this.featureOverLay.setStyle(this.style);
    this.setMap(map);

    this.featureOverLay.on('postcompose',function(evt){
         evt.context.shadowBlur = 25;
         evt.context.shadowColor = 'black';
    });
};
inherits(MilStdDrawTool, Observable);

/**
* 设置工具的地图容器
* @param {ol.Map}map .
*/
MilStdDrawTool.prototype.setMap = function (map) {
    if (map !== undefined && map != null) {
        this.map = map;
        this.mapViewport = this.map.getViewport();
    }
};

/**
* 屏蔽DoubleClickZoom事件
* @param {} .
*/
MilStdDrawTool.prototype.ShieldDBClickZoomEvent = function (map) {
    var interActionArr = map.getInteractions();
    for (var i = 0, len = interActionArr.getLength() ; i < len; i++) {
        var item = interActionArr.item(i);
        if (item instanceof DoubleClickZoom) {
            this.dbClickZoomEvent = item;
            interActionArr.remove(item);
            break;
        }
    }
};

/**
* 添加DoubleClickZoom交互事件
* @param {} .
*/
MilStdDrawTool.prototype.UnShieldDBClickZoomEvent = function (map) {
    if (this.dbClickZoomEvent != null) {
        map.getInteractions().push(this.dbClickZoomEvent);
        this.dbClickZoomEvent = null;
    }
};

MilStdDrawTool.prototype.activate = function (milType, milStdParams, name) {
    this.deactivate();
    this.ShieldDBClickZoomEvent(this.map);   //屏蔽DoubleClickZoom的监听
    ol_events.listen(this.mapViewport, EventType.CLICK, this.drawStartHandle, this);
    this.milStdType = milType;
    this.milStdParams = milStdParams;
    this.featureName = (name !== undefined && name != null) ? name : "draw";
    this.featureOverLay.setMap(this.map);
};

MilStdDrawTool.prototype.deactivate = function () {
    this.disconnectEventHandlers();
    this.featureOverLay.setMap(null);

    this.vertices = [];
    this.milStdGeom = null;
    this.feature = null;
    this.UnShieldDBClickZoomEvent(this.map);
};

MilStdDrawTool.prototype.drawStartHandle = function (e) {
    var temPnt = this.map.getCoordinateFromPixel([e.offsetX, e.offsetY]);
    this.vertices.push(temPnt);
    this.milStdGeom = new MilStd.MilStdGeomtry(this.vertices, this.milStdType, this.milStdParams);
    this.featureOverLay.getSource().addFeature(new Feature(new Point(temPnt)));
    ol_events.unlisten(this.mapViewport, EventType.CLICK, this.drawStartHandle, this);
    ol_events.listen(this.mapViewport, EventType.CLICK, this.drawContinueHandle, this);
    ol_events.listen(this.mapViewport, EventType.DBLCLICK, this.drawEndHandle, this);
    ol_events.listen(this.mapViewport, EventType.MOUSEMOVE, this.mouseMoveHandle, this);
};

MilStdDrawTool.prototype.drawContinueHandle = function (e) {
    var temPnt = this.map.getCoordinateFromPixel([e.offsetX, e.offsetY]);
    var len = MilStd.commonFun.CalLengthOfTwoPoints(temPnt, this.vertices[this.vertices.length - 1]);
    if (len < MilStd.enum.ZERO_TOLERANCE) {
        return;
    }
    this.vertices.push(temPnt);

    this.milStdGeom.Update(this.vertices.slice(0), false);   //更新几何
    if (this.feature == null) {
        this.feature = new Feature(this.milStdGeom);
        this.featureOverLay.getSource().addFeature(this.feature);
    }
    else {
        this.feature.setGeometry(this.milStdGeom);
    }

    // if (this.milStdGeom.vertices.length == this.milStdGeom.milStdParams.maxVertices) {  //达到最大控制点数则终止
    //     this.drawEndHandle(e);
    // }
    if (this.vertices.length == this.milStdGeom.milStdParams.maxVertices) {  //达到最大控制点数则终止
        this.drawEndHandle(e);
    }
};

MilStdDrawTool.prototype.drawEndHandle = function (e) {
    this.disconnectEventHandlers();
    e.preventDefault();
    this.clear();
};

MilStdDrawTool.prototype.mouseMoveHandle = function (e) {
    var temPnt = this.map.getCoordinateFromPixel([e.offsetX, e.offsetY]);
    var len = MilStd.commonFun.CalLengthOfTwoPoints(temPnt, this.vertices[this.vertices.length - 1]);
    if (len < MilStd.enum.ZERO_TOLERANCE) {
        return;
    }
    var pnts = this.vertices.concat([temPnt]);
    this.milStdGeom.Update(pnts, true);
    if (this.feature == null) {
        this.feature = new Feature(this.milStdGeom);
        this.featureOverLay.getSource().addFeature(this.feature);
    }
    else {
        this.feature.setGeometry(this.milStdGeom);
    }
};

MilStdDrawTool.prototype.disconnectEventHandlers = function () {
    ol_events.unlisten(this.mapViewport, EventType.CLICK, this.drawStartHandle, this);
    ol_events.unlisten(this.mapViewport, EventType.CLICK, this.drawContinueHandle, this);
    ol_events.unlisten(this.mapViewport, EventType.MOUSEMOVE, this.mouseMoveHandle, this);
    ol_events.unlisten(this.mapViewport, EventType.DBLCLICK, this.drawEndHandle, this);
};

MilStdDrawTool.prototype.clear = function (opt_options) {
    this.feature.name = this.featureName;
    this.dispatchEvent(new MilStd.event.MilStdDrawEvent(MilStd.event.MilStdDrawEvent.DRAW_END, this.feature));
    this.featureOverLay.getSource().removeFeature(this.feature);
    this.UnShieldDBClickZoomEvent(this.map);
    this.featureOverLay.setMap(null);

    this.vertices = [];
    this.milStdGeom = null;
    this.feature = null;
};﻿﻿﻿

// /**
// * @typedef {{depth: (Array.<number>|undefined),
// *            feature: ol.Feature,
// *            //geometry: ol.geom.SimpleGeometry,
// *            index: (number|undefined),
// *            segment: (Array.<Object>)}}
// */
//ol.interaction.SegmentDataType;

/**
* @classdesc
* Interaction for modifying vector data.
*
* @constructor
* @extends {ol.interaction.Pointer}
* @param {olx.interaction.ModifyOptions} options Options.
* @api stable
*/
var MilStdModifyTool = function (map, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    PointerInteraction.call(this, {
        handleDownEvent: MilStdModifyTool.handleDownEvent_,
        handleDragEvent: MilStdModifyTool.handleDragEvent_,
        handleEvent: MilStdModifyTool.handleEvent,
        handleUpEvent: MilStdModifyTool.handleUpEvent_,
        handleMoveEvent: MilStdModifyTool.handleMoveEvent
    });

    this.map_ = map;
    /**
    * Editing vertex.
    * @type {ol.Feature}
    * @private
    */
    this.vertexFeature_ = null;

    /**
    * @type {ol.Pixel}
    * @private
    */
    this.lastPixel_ = [0, 0];

    /**
    * Segment RTree for each layer
    * @type {Object.<*, ol.structs.RBush>}
    * @private
    */
    this.rBush_ = new RBush();

    /**
    * @type {number}
    * @private
    */
    this.pixelTolerance_ = (options.pixelTolerance !== undefined && options.pixelTolerance != null) ?
      options.pixelTolerance : 10;

    /**
    * @type {boolean}
    * @private
    */
    this.snappedToVertex_ = false;

    /**
    * @type {Array}
    * @private
    */
    this.dragSegments_ = null;

    this.oldVerticesFeature = new Collection();

    /**
    * Draw overlay where are sketch features are drawn.
    * @type {ol.FeatureOverlay}
    * @private
    */
    this.overlay_ = new VectorLayer({
        source: new VectorSource({
            useSpatialIndex: false,
            wrapX: !!options.wrapX
        }),
        updateWhileAnimating: true,
        updateWhileInteracting: true
    });



    var olayerStyle = options.style!=undefined ? options.style : MilStdModifyTool.getDefaultStyleFunction();
    this.overlay_.setStyle(olayerStyle);
    this.setMap(this.map_);

    /**
    * @const
    * @private
    * @type {Object.<string, function(ol.Feature, ol.geom.Geometry)> }
    */
    this.SEGMENT_WRITERS_ = {
        'Polygon': this.writeVerticeGeometry,
        'MultiLineString': this.writeVerticeGeometry,
        'LineString': this.writeVerticeGeometry
    };
    this.selectTool = null;
    /**
    * @type {ol.Collection.<ol.Feature>}
    * @private
    */
    this.features_ = (options.features !== undefined) ? options.features : null;

    /**
    * @type {string|undefined}
    * @private
    */
    this.cursor_ = 'pointer';

    //this.MilStdModifyTool_ = this;
    /**
    * @type {string|undefined}
    * @private
    */
    this.previousCursor_ = undefined;

};
inherits(MilStdModifyTool, PointerInteraction);



MilStdModifyTool.prototype.activate = function () {
    if (this.selectTool == null) {
        this.selectTool = new ol.interaction.Select({ wrapX: false });
    }

    if (this.map_ === undefined || this.map_ == null) {
        return;
    }

    var interActionArr = this.map_.getInteractions();
    for (var i = 0, len = interActionArr.getLength() ; i < len; i++) {
        var item = interActionArr.item(i);
        if (item instanceof ol.interaction.Select || item instanceof MilStdModifyTool) {
            interActionArr.remove(item);
        }
    }
    this.map_.addInteraction(this.selectTool);
    this.map_.addInteraction(this);

    ol_events.listen(this.map_, 'dblclick', this.modifyEndHandle, this);
    this.features_ = this.selectTool.getFeatures();
    this.features_.forEach(this.addFeature_, this);
    //修改
    ol_events.listen(this.features_, CollectionEventType.ADD, this.handleFeatureAdd_, this);
    ol_events.listen(this.features_, CollectionEventType.REMOVE, this.handleFeatureRemove_, this);

    MilStdDrawTool.prototype.ShieldDBClickZoomEvent(this.map_);

};

MilStdModifyTool.prototype.deactivate = function () {
    if (this.map_ !== undefined && this.map_ != null) {
        MilStdDrawTool.prototype.UnShieldDBClickZoomEvent(this.map_);
        this.map_.removeInteraction(this.selectTool);
        this.map_.removeInteraction(this);
    }
};

MilStdModifyTool.prototype.disconnectEventHandlers = function () {
    if (this.map_ !== undefined && this.map_ != null) {
        ol_events.unlisten(this.map_, 'dblclick', this.modifyEndHandle, this);
        this.map_.removeInteraction(this.selectTool);
        this.map_.removeInteraction(this);
    }
    ol_events.unlisten(this.features_, CollectionEventType.ADD, this.handleFeatureAdd_, this);
    ol_events.unlisten(this.features_, CollectionEventType.REMOVE, this.handleFeatureRemove_, this);
};

MilStdModifyTool.prototype.modifyEndHandle = function (e) {
    this.disconnectEventHandlers();
    if (this.oldVerticesFeature !== undefined && this.oldVerticesFeature != null) {
        this.clearOverLayer(this.overlay_);
        this.oldVerticesFeature.clear();
    }
};

/**
* @param {ol.Feature} feature Feature.
* @private
*/
MilStdModifyTool.prototype.addFeature_ = function (feature) {

    var geometry = feature.getGeometry();
    var geom = null;
    if (geometry instanceof Point) {
        geom = geometry;
    }
    if (geometry instanceof GeometryCollection) {
        geom = (geometry.geometries_)[0];
    }
    else {
        geom = geometry;
    }
    if (this.SEGMENT_WRITERS_[geom.getType()] !== undefined) {
        this.SEGMENT_WRITERS_[geom.getType()].call(this, feature);
        this.oldVerticesFeature.clear();
        this.clearOverLayer(this.overlay_);
        if (geometry.vertices !== undefined && geometry.vertices != null) {
            for (var i = 0; i < geometry.vertices.length; i++) {
                var vertexFeature = new Feature(new Point(geometry.vertices[i]));
                this.overlay_.getSource().addFeature(vertexFeature);
                this.oldVerticesFeature.push(vertexFeature);
            }
        }
    }
    var map = this.getMap();
    if (map !== undefined && map != null) {
        this.handlePointerAtPixel(this.lastPixel_, map);
    }
};

MilStdModifyTool.prototype.clearOverLayer = function (overlayer) {
    if (overlayer !== undefined && overlayer != null) {
        overlayer.getSource().clear();
    };
};
/**
* @inheritDoc
*/
MilStdModifyTool.prototype.setMap = function (map) {
    this.overlay_.setMap(map);
    PointerInteraction.prototype.setMap.call(this, map);
};


/**
* @param {ol.CollectionEvent} evt Event.
* @private
*/
MilStdModifyTool.prototype.handleFeatureAdd_ = function (evt) {
    var feature = evt.element;
    this.addFeature_(feature);
};


/**
* @param {ol.CollectionEvent} evt Event.
* @private
*/
MilStdModifyTool.prototype.handleFeatureRemove_ = function (evt) {
    var feature = evt.element;
    if (feature !== undefined && feature != null) {
        this.dispatchEvent(new MilStd.event.MilStdDrawEvent(MilStd.event.MilStdDrawEvent.MODIFY_FEATURE_END, feature));
    }

    var rBush = this.rBush_;
    var i, nodesToRemove = [];
    rBush.forEachInExtent(feature.getGeometry().getExtent(), function (node) {
        if (feature === node.feature) {
            nodesToRemove.push(node);
        }
    });
    for (i = nodesToRemove.length - 1; i >= 0; --i) {
        rBush.remove(nodesToRemove[i]);
    }

    this.clearOverLayer(this.overlay_);
    this.oldVerticesFeature.clear();
    this.vertexFeature_ = null;
};

/**
* @把军标几何的控制点信息加入到rBush中，以调高检索能力
* @param {ol.Feature} feature Feature
* @param {MilStd.SimpleArrow} geometry Geometry.
* @private
*/
MilStdModifyTool.prototype.writeVerticeGeometry = function (feature) {
    var points = feature.getGeometry().vertices;
    var coordinates, i, ii, segmentData;
    for (i = 0, ii = points.length; i < ii; ++i) {
        coordinates = points[i];
        segmentData = {
            feature: feature,
            depth: [i],
            index: i,
            segment: [coordinates, coordinates]
        }; /** @type {ol.interaction.SegmentDataType} */
        this.rBush_.insert(ol_extent.boundingExtent(segmentData.segment), segmentData);
    }
};

/**
* @ 创建或更新控制点要素，
* @param {ol_coordinate} coordinates Coordinates.
* @return {ol.Feature} Vertex feature.
* @private
*/
MilStdModifyTool.prototype.createOrUpdateVertexFeature_ = function (coordinates) {
    var vertexFeature = this.vertexFeature_;
    if (vertexFeature == null) {
        vertexFeature = new Feature(new Point(coordinates));
        this.vertexFeature_ = vertexFeature;
        this.overlay_.getSource().addFeature(vertexFeature);
    } else {
        var geometry = vertexFeature.getGeometry(); /** @type {ol.geom.Point} */
        geometry.setCoordinates(coordinates);
        vertexFeature.setGeometry(geometry);
    }
    return vertexFeature;
};

/**
* @更新当前控制点，以实现拖拽过程中对当前控制点要素的控制
* @param {Number} verticeIndex（控制点索引）.
* @param {ol_coordinate} coordinate（新的控制点坐标）.
* @this {MilStdModifyTool}
* @private
*/
MilStdModifyTool.prototype.redrawVertices = function (verticeIndex, coordinate) {
    if (this.oldVerticesFeature !== undefined && this.oldVerticesFeature != null) {
        var feature = this.oldVerticesFeature.item(verticeIndex);
        feature.setGeometry(new Point(coordinate));
        this.oldVerticesFeature.setAt(verticeIndex, feature);
    }
};

/**
* @param {ol.MapBrowserPointerEvent} evt Event.
* @return {boolean} Start drag sequence?
* @this {MilStdModifyTool}
* @private
*/
MilStdModifyTool.handleDownEvent_ = function (evt) {
    this.handlePointerAtPixel(evt.pixel, evt.map);
    this.dragSegments_ = [];
    var vertexFeature = this.vertexFeature_;
    if (vertexFeature != null) {
        var geometry = vertexFeature.getGeometry(); /** @type {ol.geom.Point} */
        var vertex = geometry.getCoordinates();
        var vertexExtent = ol_extent.boundingExtent([vertex]);
        var segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
        for (var i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
            var segmentDataMatch = segmentDataMatches[i];
            var segment = segmentDataMatch.segment;

            if (ol_coordinate.equals(segment[0], vertex)) {
                this.dragSegments_.push([segmentDataMatch, 0]);
            }
            else if (ol_coordinate.equals(segment[1], vertex)) {
                this.dragSegments_.push([segmentDataMatch, 1]);
            }
        }
    }
    return this.vertexFeature_ != null ? true : false;
};


MilStdModifyTool.handleMoveEvent = function (evt) {
    if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });
        var element = evt.map.getTargetElement();
        if (feature) {
            if (element.style.cursor != this.cursor_) {
                this.previousCursor_ = element.style.cursor;
                element.style.cursor = this.cursor_;
            }
        } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
        }
    }
};

/**
* @param {ol.MapBrowserPointerEvent} evt Event.
* @this {MilStdModifyTool}
* @private
*/
MilStdModifyTool.handleDragEvent_ = function (evt) {
    var vertex = evt.coordinate;
    for (var i = 0, ii = this.dragSegments_.length; i < ii; ++i) {
        var dragSegment = this.dragSegments_[i];

        var segmentData = dragSegment[0];
        var index = dragSegment[1];

        var verticeIndex = segmentData.index;
        var feature = segmentData.feature;
        var geom = feature.getGeometry();

        if (geom.getType() == GeometryType.GEOMETRY_COLLECTION) {
            while (vertex.length < feature.getGeometry().geometries_[0].getStride()) {
                vertex.push(0);
            }
            var vertices = geom.vertices;
            if (geom.milStdType == MilStd.EnumMilstdType.TriangleFlag || geom.milStdType == MilStd.EnumMilstdType.RectFlag ||
            geom.milStdType == MilStd.EnumMilstdType.CurveFlag || geom.milStdType == MilStd.EnumMilstdType.ArrowCross ||
            geom.milStdType == MilStd.EnumMilstdType.CircleClosedangle || geom.milStdType == MilStd.EnumMilstdType.Closedangle ||
            geom.milStdType == MilStd.EnumMilstdType.DoubleClosedangle || geom.milStdType == MilStd.EnumMilstdType.Fourstar ||
            geom.milStdType == MilStd.EnumMilstdType.Rhombus || geom.milStdType == MilStd.EnumMilstdType.SameDirectionClosedangle ||
            geom.milStdType == MilStd.EnumMilstdType.Triangle || geom.milStdType == MilStd.EnumMilstdType.Vane) {

                if (verticeIndex == 0) {
                    if ((vertex[0] - vertices[1][0]) >= 0 || (vertex[1] - vertices[1][1]) <= 0) {
                        return;
                    }
                }
                else if (verticeIndex == 1) {
                    if ((vertex[0] - vertices[0][0]) <= 0 || (vertex[1] - vertices[0][1]) >= 0) {
                        return;
                    }
                }
            }

            this.updateFeature(segmentData, vertex, true);
            break;
        }
        this.createOrUpdateVertexFeature_(vertex);
    }
};

/**
* @param {ol.MapBrowserPointerEvent} evt Event.
* @return {boolean} Stop drag sequence?
* @this {MilStdModifyTool}
* @private
*/
MilStdModifyTool.handleUpEvent_ = function (evt) {
    var vertex = evt.coordinate;
    var segmentData;
    for (var i = this.dragSegments_.length - 1; i >= 0; --i) {
        segmentData = this.dragSegments_[i][0];
        this.rBush_.update(ol_extent.boundingExtent(segmentData.segment), segmentData);
        var geom = segmentData.feature.getGeometry();
        var vertices = geom.vertices;
        if (geom.milStdType == MilStd.EnumMilstdType.TriangleFlag || geom.milStdType == MilStd.EnumMilstdType.RectFlag ||
            geom.milStdType == MilStd.EnumMilstdType.CurveFlag || geom.milStdType == MilStd.EnumMilstdType.ArrowCross ||
            geom.milStdType == MilStd.EnumMilstdType.CircleClosedangle || geom.milStdType == MilStd.EnumMilstdType.Closedangle ||
            geom.milStdType == MilStd.EnumMilstdType.DoubleClosedangle || geom.milStdType == MilStd.EnumMilstdType.Fourstar ||
            geom.milStdType == MilStd.EnumMilstdType.Rhombus || geom.milStdType == MilStd.EnumMilstdType.SameDirectionClosedangle ||
            geom.milStdType == MilStd.EnumMilstdType.Triangle || geom.milStdType == MilStd.EnumMilstdType.Vane) {

            if (segmentData.index == 0) {
                if ((vertex[0] - vertices[1][0]) >= 0 || (vertex[1] - vertices[1][1]) <= 0) {
                    return false;
                }
            }
            else if (segmentData.index == 1) {
                if ((vertex[0] - vertices[0][0]) <= 0 || (vertex[1] - vertices[0][1]) >= 0) {
                    return false;
                }
            }
        }
        this.updateFeature(segmentData, evt.coordinate, true);
    }
    return false;
};

MilStdModifyTool.prototype.updateFeature = function (segmentData, coordinate, isDraging) {
    var geom = segmentData.feature.getGeometry();
    var vertices = geom.vertices;
    vertices[segmentData.index] = coordinate;

    geom.Update(vertices, isDraging);

    segmentData.feature.setGeometry(geom);
    if (this.vertexFeature_ != null) {
        var pntGeom = this.vertexFeature_.getGeometry();
        pntGeom.setCoordinates(coordinate);
        this.vertexFeature_.setGeometry(pntGeom);
    }

    this.redrawVertices(segmentData.index, coordinate);
    this.rBush_.remove(segmentData);
    var segment = segmentData.segment;
    segment[0] = segment[1] = coordinate;
    segmentData.segment = segment;
    this.rBush_.insert(ol_extent.boundingExtent(segmentData.segment), segmentData);

};

/**
* @param {ol.MapBrowserEvent} mapBrowserEvent Map browser event.
* @return {boolean} `false` to stop event propagation.
* @this {MilStdModifyTool}
* @api
*/
MilStdModifyTool.handleEvent = function (mapBrowserEvent) {
    if (!(mapBrowserEvent instanceof MapBrowserPointerEvent)) {
        return true;
    }
    var handled;
    if (!mapBrowserEvent.map.getView().getHints()[ViewHint.INTERACTING] &&
      mapBrowserEvent.type == MapBrowserEventType.POINTERMOVE &&
      !this.handlingDownUpSequence) {
        this.handlePointerMove_(mapBrowserEvent);
    }

    // return PointerInteraction.handleEvent.call(this, mapBrowserEvent) &&
    // !handled;
    return handlePointerEvent.call(this, mapBrowserEvent) && !handled;
};


/**
* @param {ol.MapBrowserEvent} evt Event.
* @private
*/
MilStdModifyTool.prototype.handlePointerMove_ = function (evt) {
    this.lastPixel_ = evt.pixel;
    this.handlePointerAtPixel(evt.pixel, evt.map);
};

/**
* @param {ol.Pixel} pixel Pixel
* @param {ol.Map} map Map.
* @private
*/
MilStdModifyTool.prototype.handlePointerAtPixel = function (pixel, map) {
    var pixelCoordinate = map.getCoordinateFromPixel(pixel);

    //像素点到控制点距离升序排列函数
    var sortByDistance = function (a, b) {
        return ol_coordinate.squaredDistanceToSegment(pixelCoordinate, a.segment) -
               ol_coordinate.squaredDistanceToSegment(pixelCoordinate, b.segment);
    };

    //构建点查询的范围（ol.extent）
    var lowerLeft = map.getCoordinateFromPixel(
        [pixel[0] - this.pixelTolerance_, pixel[1] + this.pixelTolerance_]);
    var upperRight = map.getCoordinateFromPixel(
        [pixel[0] + this.pixelTolerance_, pixel[1] - this.pixelTolerance_]);
    var box = ol_extent.boundingExtent([lowerLeft, upperRight]);

    var rBush = this.rBush_;
    var nodes = rBush.getInExtent(box);
    if (nodes.length > 0) {
        nodes.sort(sortByDistance);
        var node = nodes[0];
        var closestSegment = node.segment;
        var pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
        var pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
        var squaredDist1 = ol_coordinate.squaredDistance(pixel, pixel1);
        var squaredDist2 = ol_coordinate.squaredDistance(pixel, pixel2);
        var dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
        this.snappedToVertex_ = dist <= this.pixelTolerance_;
        if (this.snappedToVertex_) {
            this.createOrUpdateVertexFeature_(closestSegment[0]);
        }
        return;
    }
    if (this.vertexFeature_ != null) {
        this.overlay_.getSource().removeFeature(this.vertexFeature_);
        this.vertexFeature_ = null;
    }

};

/**
* @return {ol.style.StyleFunction} Styles.
*/
MilStdModifyTool.getDefaultStyleFunction = function () {
    var style = createEditingStyle();
    return function (feature, resolution) {
        return style[GeometryType.POINT];
    };
};

/**
* @constructor
* @extends {ol.interaction.Pointer}
*/
var MilStdDragPan = function (map) {

    PointerInteraction.call(this, {
        handleDownEvent: MilStdDragPan.prototype.handleDownEvent,
        handleDragEvent: MilStdDragPan.prototype.handleDragEvent,
        handleMoveEvent: MilStdDragPan.prototype.handleMoveEvent,
        handleUpEvent: MilStdDragPan.prototype.handleUpEvent
    });

    this.map_ = (map !== undefined && map != null) ? map : null;
    /**
    * @type {ol.Pixel}
    * @private
    */
    this.coordinate_ = null;

    /**
    * @type {ol.Feature}
    * @private
    */
    this.feature_ = null;

    /**
    * @type {string|undefined}
    * @private
    */
    // this.cursor_ = 'pointer';
    this.cursor_ = 'move';

    /**
    * @type {string|undefined}
    * @private
    */
    this.previousCursor_ = undefined;

};
inherits(MilStdDragPan, PointerInteraction);

MilStdDragPan.prototype.activate = function () {
    if (this.map_ === undefined || this.map_ == null) {
        return;
    }
    var interActionArr = this.map_.getInteractions();

    var len = interActionArr.getLength();
    for (var i = len - 1; i >= 0; i--) {
        var item = interActionArr.item(i);
        if (item instanceof MilStdDragPan) {
            interActionArr.remove(item);
        }
    }
    this.map_.addInteraction(this);
    MilStdDrawTool.prototype.ShieldDBClickZoomEvent(this.map_);
    ol_events.listen(this.map_, 'dblclick', this.modifyEndHandle, this);
};

MilStdDragPan.prototype.deactivate = function () {
    if (this.map_ === undefined || this.map_ == null) {
        return;
    }
    MilStdDrawTool.prototype.UnShieldDBClickZoomEvent(this.map_);

    var interActionArr = this.map_.getInteractions();
    var len = interActionArr.getLength();
    for (var i = len - 1; i >= 0; i--) {
        var item = interActionArr.item(i);
        if (item instanceof MilStdDragPan) {
            interActionArr.remove(item);
        }
    }

};

MilStdDragPan.prototype.modifyEndHandle = function (e) {
    if (this.map_ === undefined || this.map_ == null) {
        return;
    }
    ol_events.unlisten(this.map_, 'dblclick', this.modifyEndHandle, this);
    this.setActive(false);
};

/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `true` to start the drag sequence.
*/
MilStdDragPan.prototype.handleDownEvent = function (evt) {
    var map = evt.map;

    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
          return feature;
      });

    if (feature) {
        this.coordinate_ = evt.coordinate;
        this.feature_ = feature;
    }

    return !!feature;
};


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
*/
MilStdDragPan.prototype.handleDragEvent = function (evt) {
    var map = evt.map;

    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
          return feature;
      });

    var deltaX = evt.coordinate[0] - this.coordinate_[0];
    var deltaY = evt.coordinate[1] - this.coordinate_[1];

    var geometry = /** @type {ol.geom.SimpleGeometry} */
      (this.feature_.getGeometry());
    geometry.translate(deltaX, deltaY);

    if (geometry.vertices !== undefined && geometry.vertices != null) {
        var vertices = geometry.vertices;
        for (var i = 0, len = vertices.length; i < len; i++) {
            //ol_coordinate.sub(vertices[i], [-deltaX, -deltaY]);
            ol_coordinate.add(vertices[i], [deltaX, deltaY]);
        }
    }

    this.coordinate_[0] = evt.coordinate[0];
    this.coordinate_[1] = evt.coordinate[1];
};

/**
* @param {ol.MapBrowserEvent} evt Event.
*/
MilStdDragPan.prototype.handleMoveEvent = function (evt) {
    if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });
        var element = evt.map.getTargetElement();
        if (feature) {
            if (element.style.cursor != this.cursor_) {
                this.previousCursor_ = element.style.cursor;
                element.style.cursor = this.cursor_;
            }
        } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
        }
    }
};

/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `false` to stop the drag sequence.
*/
MilStdDragPan.prototype.handleUpEvent = function (evt) {
    var element = evt.map.getTargetElement();
    element.style.cursor = "default";
    if (this.feature_ !== undefined && this.feature_ != null) {
        this.dispatchEvent(new MilStd.event.MilStdDrawEvent(MilStd.event.MilStdDrawEvent.MODIFY_FEATURE_END, this.feature_));
    }
    this.coordinate_ = null;
    this.feature_ = null;
    return false;
};
export {MilStd};
export {EnumMilstdType};
MilStd.EnumMilstdType = EnumMilstdType;
export{MilstdParams};
MilStd.MilstdParams = MilstdParams;
export { MilStdDrawTool };
MilStd.tool.MilStdDrawTool = MilStdDrawTool;
export { MilStdModifyTool };
MilStd.ModifyTool = MilStdModifyTool;
export { MilStdDragPan };
MilStd.DragPan = MilStdDragPan;


