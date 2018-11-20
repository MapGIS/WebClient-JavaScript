/*------------------------绘制军标------------------------*/

/**
 * 绘制的枚举和标绘参数
 * @type {*}
 */
var MilStd = window.MilStd || {};

MilStd.enum = {
    ZERO_TOLERANCE: 0.0001
};

MilStd.EnumMilstdType = {
    ArrowCross: 'ArrowCross',                               //十字箭头指北针
    CircleClosedangle: 'CircleClosedangle',                 //圆形尖角指北针
    Closedangle: 'Closedangle',                             //尖角指北针
    DoubleClosedangle: 'DoubleClosedangle',                 //双向尖角指北针
    Fourstar: 'Fourstar',                                   //四角指北针
    Rhombus: 'Rhombus',                                     //菱形指北针
    SameDirectionClosedangle: 'SameDirectionClosedangle',   //同向尖角指北针
    Triangle: 'Triangle',                                   //三角指北针
    Vane: 'Vane',                                           //风向标指北针
    SimpleArrow: 'SimpleArrow',                             //简单箭头
    DoubleArrow: 'DoubleArrow',                             //双箭头
    StraightArrow: 'SimpleArrow',                           //直箭头
    SingleLineArrow: 'SingleLineArrow',                     //单线箭头
    TriangleFlag: 'TriangleFlag',                           //三角旗
    RectFlag: 'RectFlag',                                   //矩形旗
    CurveFlag: 'CurveFlag',                                 //波浪旗
    Bezier: 'Bezier',                                       //贝塞尔曲线成区
    BezierLine: 'BezierLine',                               //贝塞尔曲线
    AssemblyArea: 'AssemblyArea'                            //集结区
};

MilStd.MilstdParams = function (opt_options) {
    if (opt_options) {

        /**
         * 箭头头部高度因子
         * @type {number}
         */
        this.headHeightFactor = (opt_options.headHeightFactor !== undefined && opt_options.headHeightFactor !== null) ? opt_options.headHeightFactor : 0.2;

        /**
         * 箭头头部宽度因子
         * @type {number}
         */
        this.headWidthFactor = (opt_options.headWidthFactor !== undefined && opt_options.headWidthFactor !== null) ? opt_options.headWidthFactor : 0.5;

        /**
         * 箭头腰部高度因子
         * @type {number}
         */
        this.neckHeightFactor = (opt_options.neckHeightFactor !== undefined && opt_options.neckHeightFactor !== null) ? opt_options.neckHeightFactor : 0.8;

        /**
         * 箭头腰部宽度因子
         * @type {number}
         */
        this.neckWidthFactor = (opt_options.neckWidthFactor !== undefined && opt_options.neckWidthFactor !== null) ? opt_options.neckWidthFactor : 0.2;

        /**
         * 箭头尾部宽度因子
         * @type {number}
         */
        this.tailWidthFactor = (opt_options.tailWidthFactor !== undefined && opt_options.tailWidthFactor !== null) ? opt_options.tailWidthFactor : 0.1;

        /**
         * 是否有箭头尾部
         * @type {boolean}
         */
        this.hasSwallowTail = (opt_options.hasSwallowTail !== undefined && opt_options.hasSwallowTail !== null) ? opt_options.hasSwallowTail : true;

        /**
         * 箭头尾部因子
         * @type {number}
         */
        this.swallowTailFactor = (opt_options.swallowTailFactor !== undefined && opt_options.swallowTailFactor !== null) ? opt_options.swallowTailFactor : 0.5;

        /**
         * 曲线拟合方法
         * @type {string}
         */
        this.curveFitMethod = (opt_options.curveFitMethod !== undefined && opt_options.curveFitMethod !== null) ? opt_options.curveFitMethod : "useBSplieFit";

        /**
         * 最大控制点数
         * @type {number}
         */
        this.maxVertices = (opt_options.maxVertices !== undefined && opt_options.maxVertices !== null) ? opt_options.maxVertices : 20;
    }
};

/****************标绘基础算法（commonFun）****************/
MilStd.commonFun = new function () {
    var self = this;

    /**
     * Method: CalLengthOfTwoPoints
     * 计算两点之间的长度
     * Parameters:
     * p1-{L.latlngs}
     * p2-{L.latlngs}
     * Returns:
     * len-{double:长度}
     */
    self.CalLengthOfTwoPoints = function (p1, p2) {
        var len = 0;
        len = Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2));
        return len;
    };

    /**
     * Method: wholeDistance
     * 计算点集之间的长度
     * Parameters:
     * arrDots-{Array.<L.latlngs>}
     * Returns:
     * len-{double:长度}
     */
    self.wholeDistance = function (arrDots) {
        var len = 0;
        if (arrDots !== null && arrDots.length > 1) {
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
     * geoPntStart-{Array.<L.latlngs>:起始点}
     * geoPntEnd-{Array.<L.latlngs>：终点}
     * Returns:
     * num-{double:角度}
     */
    self.getAzimuthAngle = function (geoPntStart, geoPntEnd) {
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
            return num = Math.PI - num2; //修改，增加return关键字
        }
    };

    /**
     * Method: getThirdPoint
     * 根据两点、角度、距离、边,计算第三个点
     * Parameters:
     * startPnt-{Array.<L.latlngs>:起始点}
     * endPnt-{Array.<L.latlngs>：终点}
     * angle-{double:角度}
     * length-{double:长度}
     * side-{string:边("left"、"rught")}
     * Returns:
     * num-{double:角度}
     */
    self.getThirdPoint = function (startPnt, endPnt, angle, length, side) {
        var num = MilStd.commonFun.getAzimuthAngle(startPnt, endPnt);
        var num2 = 0.0;
        if (side.toLowerCase() === "left") {
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
     * pntA-{Array.<L.latlngs>: 点A}
     * pntB-{Array.<L.latlngs>：点B}
     * pntC-{Array.<L.latlngs>：点C}
     * Returns:
     * num-{double:角度}
     */
    self.getAngleOfThreePoints = function (pntA, pntB, pntC) {
        var a = MilStd.commonFun.getAzimuthAngle(pntB, pntA);
        var b = MilStd.commonFun.getAzimuthAngle(pntB, pntC);
        var num = a - b;
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
    self.getFactorial = function (n) {
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
    self.getBinomialFactor = function (n, index) {
        var num = 0.0;
        num = MilStd.commonFun.getFactorial(n) / (MilStd.commonFun.getFactorial(index) * MilStd.commonFun.getFactorial(n - index));
        return num;
    };

    /**
     * Method: getQuadricBSplineFactor
     * 计算二次样条因子
     * Parameters:
     * k-{Number: 阶乘因子}
     * t-{Number: 阶乘因子}
     * Returns:
     * {double:二次样条因子}
     */
    self.getQuadricBSplineFactor = function (k, t) {
        if (k === 0) {
            return (Math.pow((t - 1.0), 2.0) / 2.0);
        }
        if (k === 1) {
            return ((((-2.0 * Math.pow(t, 2.0)) + (2.0 * t)) + 1.0) / 2.0);
        }
        if (k === 2) {
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
    self.getBSplineFFactor = function (k, n, t) {
        if (n === 2) {
            return MilStd.commonFun.getQuadricBSplineFactor(k, t);
        }
        var num = 0.0;
        var num2 = getFactorial(n);
        for (var i = 0; i <= (n - k); i++) {
            var num4 = ((i % 2) === 0) ? 1 : -1;
            num += (num4 * MilStd.commonFun.getBinomialFactor(n + 1, i)) * Math.pow(((t + n) - k) - i, n);
        }
        return (num / num2);
    };

    /**
     * Method: getSide
     * 获取边
     * Parameters:
     * pnt1-{Array.<L.latlngs>: 点}
     * pnt2-{Array.<L.latlngs>：点}
     * pnt-{Array.<L.latlngs>：点}
     * Returns:
     * {String：边("left"、"right")}
     */
    self.getSide = function (pnt1, pnt2, pnt) {
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
     * pnt1-{Array.<L.latlngs>: 点}
     * pnt2-{Array.<L.latlngs>：点}
     * Returns:
     * pnt3-{Array.<L.latlngs>：中间点}
     */
    self.getMidPoint = function (pnt1, pnt2) {
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
     * points-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * {Array.<L.latlngs>：Bezier曲线的几何点数组}
     */
    self.getBezierPoints = function (points) {
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
     * points-{Array.<L.latlngs>:控制点数组}
     * n-{Number>=2：表示通过n项式计算}
     * Returns:
     * {Array.<L.latlngs>：样条曲线的几何点数组}
     */
    self.getBSplinePoints = function (points, n) {
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
     * geom-{L.polyline>:几何对象}
     * geom1-{L.polyline>:几何对象}
     * Returns:
     * equals-{Boolen：是否相等}
     */
    self.geomEquals = function (geom, geom1) {
        var equals = false;
        if (geom !== null) {
            equals = ((geom1[0] === geom[0] && geom1[1] === geom[1]) ||
            (geom1[0] === null && geom1[1] === null && geom[0] === null && geom[1] === null));
        }
        return equals;
    };

    /**
     * Method: CreateNewVertices
     * 重新设置新的拐点即控制点（左上+右下）
     * Parameters:
     * arg-{Array.<L.latlngs>:控制点数组}
     * Returns:
     */
    self.CreateNewVertices = function (arg) {
        if (arg !== null && arg.length >= 2) {
            var maxX = Math.max(arg[0][1], arg[1][1]);
            var minX = Math.min(arg[0][1], arg[1][1]);
            var maxY = Math.max(arg[0][0], arg[1][0]);
            var minY = Math.min(arg[0][0], arg[1][0]);

            var pnt1 = [minX, maxY];
            var pnt2 = [maxX, minY];

            arg.push(arg.splice(0, 1, pnt1));
            arg.push(arg.splice(1, 1, pnt2));
        }
    }

};

/****************箭头算法（Arrow）****************/
/**
 * SimpleArrow 简单箭头
 * DoubleArrow 双箭头
 * StraightArrow 直箭头
 * SingleLineArrow 单线箭头
 */
MilStd.Arrow = new function () {
    var self = this;

    /**
     * Method: getArrowFromVert
     * 根据箭头类型和控制点，获取组成该箭头的所有坐标点
     * Parameters:
     * arg-{Array.<L.latlngs>:控制点数组}
     * milStdParams-{MilStd.MilstdParams: 军标参数}
     * arrowType-{string:箭头类型（SimpleArrow、DoubleArrow、StraightArrow、SingleLineArrow）}
     * Returns:
     * parseDots 构建箭头的几何图形的所有坐标点
     */
    self.getArrowFromVert = function (arg, arrowType, milStdParams) {
        var geom = null;
        if (arg !== null && arg.length >= 2) {
            var parseDots = null;
            switch (arrowType) {
                case "SimpleArrow":
                case "StraightArrow":
                    parseDots = MilStd.Arrow.getSimpleArrowPnts(arg, milStdParams.hasSwallowTail, milStdParams.swallowTailFactor,
                        milStdParams.curveFitMethod, milStdParams.headHeightFactor, milStdParams.headWidthFactor,
                        milStdParams.neckHeightFactor, milStdParams.neckWidthFactor, milStdParams.tailWidthFactor);
                    //解析：这里只返回算法后的坐标数据，绘制或者更新在军标几何对象中进行
                    break;
                case "DoubleArrow":
                    parseDots = MilStd.Arrow.getDoubleArrowPnts(arg, milStdParams.headHeightFactor,
                        milStdParams.headWidthFactor, milStdParams.neckHeightFactor, milStdParams.neckWidthFactor);
                    break;
                case "SingleLineArrow":
                    parseDots = MilStd.Arrow.getSLArrowPnts(arg, milStdParams.headHeightFactor, milStdParams.headWidthFactor);
                    break;
            }
        }
        return parseDots;
    };

    /**
     * Method: getSimpleArrowPnts
     * 构建箭头的所有点
     * Parameters:
     * inpoints-{Array.<L.latlngs>:根据轨迹线解析得到坐标序列}
     * hasSwallowTail -{Boolean:是否含燕尾}
     * swallowTailFactor  -{Number(0-1):箭头燕尾因子}
     * curveFitMethod     -{string("bezier/BSpline"):曲线解析方式}
     * headHeightFactor   -{Number(0-1):箭头头部高度因子}
     * headWidthFactor    -{Number(0-1):箭头头部宽度因子}
     * neckHeightFactor   -{Number(0-1):箭头腰部高度因子}
     * neckWidthFactor    -{Number(0-1):箭头头部高度因子}
     * tailWidthFactor    -{Number(0-1):箭头腰部宽度因子}
     * Returns:
     * rangNew-{Array.<L.latlngs>:构建箭头的点数组}
     */
    self.getSimpleArrowPnts = function (inpoints, hasSwallowTail, swallowTailFactor, curveFitMethod, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor, tailWidthFactor) {
        if (inpoints.length < 2) {
            return inpoints;
        }

        var list2 = MilStd.Arrow.getArrowHeadPoints(inpoints, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
        var neckLeftPoint = list2[0];
        var neckRightPoint = list2[4];
        var list3 = MilStd.Arrow.getArrowBodyPoints(inpoints, neckLeftPoint, neckRightPoint, tailWidthFactor, 1.0, 1.0);
        var list4 = MilStd.Arrow.getArrowTailPoints(inpoints, tailWidthFactor, hasSwallowTail, swallowTailFactor);
        var point3 = list4[0];

        var point4 = (list4.length === 3) ? list4[1] : list4[1];
        var point5 = (list4.length === 3) ? list4[2] : list4[1];
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

        if (curveFitMethod === "useBezierFit") {
            rangNew = MilStd.commonFun.getBezierPoints(range);
            list6New = MilStd.commonFun.getBezierPoints(list6);
        }
        else {
            rangNew = MilStd.commonFun.getBSplinePoints(range, 2);
            list6New = MilStd.commonFun.getBSplinePoints(list6, 2);
        }
        if (point4 !== null) {
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
     * inpoints-{Array.<L.latlngs>:控制点数组}
     * headHeightFactor-{Number(0-1):箭头头部高度因子}
     * headWidthFactor -{Number(0-1):箭头头部宽度因子}
     * Returns:
     * mulLine-{Array.<Array.<L.latlngs>>:构建箭头的二维点数组}}
     */
    self.getSLArrowPnts = function (inpoints, headHeightFactor, headWidthFactor) {
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
     * vertices-{Array.<L.latlngs>:控制点数组}
     * Returns: 0：在同一直线上  >0:逆时针   <0:顺时针
     */
    self.isCounterClockwise = function (vertices) {
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
     * inpoints-{Array.<L.latlngs>:控制点数组}
     * headHeightFactor-{Number(0-1):箭头头部高度因子}
     * headWidthFactor -{Number(0-1):箭头头部宽度因子}
     * neckHeightFactor-{Number(0-1):箭头腰部高度因子}
     * neckWidthFactor -{Number(0-1):箭头腰部宽度因子}
     * Returns:
     * rangNew-{Array.<L.latlngs>:构建箭头的点数组}}
     */
    self.getDoubleArrowPnts = function (inpoints, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
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
            //修改控制点顺序，保证控制点为顺时针时可以正确计算
            var isCounter = MilStd.Arrow.isCounterClockwise(inpoints);
            if (isCounter < 0) {
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
     * points-Array.<L.latlngs>:控制点数组}
     * headHeightFactor-{Number(0-1):箭头头部高度因子}
     * headWidthFactor -{Number(0-1):箭头头部宽度因子}
     * neckHeightFactor-{Number(0-1):箭头腰部高度因子}
     * neckWidthFactor -{Number(0-1):箭头腰部宽度因子}
     * Returns:
     * Array.<L.latlngs>：箭头头部的几何点数组}
     */
    self.getArrowHeadPoints = function (points, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
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
     * points-Array.<L.latlngs>:控制点数组}
     * headHeightFactor-{Number(0-1):箭头头部高度因子}
     * headWidthFactor -{Number(0-1):箭头头部宽度因子}
     * Returns:
     * Array.<L.latlngs>：箭头头部的几何点数组}
     */
    self.getArrowHeadPointsForSLine = function (points, headHeightFactor, headWidthFactor) {
        if (points.length < 2) {
            return points;
        }
        var length = MilStd.commonFun.CalLengthOfTwoPoints(points[0], points[1]) * headHeightFactor;
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
     * points-{Array.<L.latlngs>:控制点数组}
     * neckLeftPoint  -{L.latlngs:腰部左边的几何点}
     * neckRightPoint -{L.latlngs:腰部右边的几何点}
     * tailWidthFactor-{Number(0-1):箭头尾部宽度因子}
     * leftFactor     -{Number(0-1):箭头腰部左边因子}
     * rightFactor    -{Number(0-1):箭头腰部右边因子}
     * Returns:
     * {Array.<L.latlngs>：箭头腰部的几何点数组}
     */
    self.getArrowBodyPoints = function (points, neckLeftPoint, neckRightPoint, tailWidthFactor, leftFactor, rightFactor) {
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
        for (var i = 1; i < (points.length - 1); i++) {
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
     * points-{Array.<L.latlngs>）:控制点数组}
     * tailWidthFactor-{Number(0-1):箭头尾部宽度因子}
     * hasSwallowTail -{Boolean:是否含燕尾}
     * swallowTailFactor  -{Number(0-1):箭头燕尾因子}
     * Returns:
     * {Array.<L.latlngs>：箭头尾部的几何点数组}
     */
    self.getArrowTailPoints = function (points, tailWidthFactor, hasSwallowTail, swallowTailFactor) {
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
     * pnt1-{L.latlngs:控制点1}
     * pnt2-{L.latlngs:控制点2}
     * pnt3 -{L.latlngs:控制点3}
     * side -{string（"left"/"right"）:组成双箭头的左边部分或者右边部分}
     * headHeightFactor-{Number(0-1):箭头头部高度因子}
     * headWidthFactor -{Number(0-1):箭头头部宽度因子}
     * neckHeightFactor-{Number(0-1):箭头腰部高度因子}
     * neckWidthFactor -{Number(0-1):箭头腰部宽度因子}
     * Returns:
     * range-{Array.<L.latlngs>：箭头的左边部分或者右边部分的几何点数组}
     */
    self.getArrowPoints = function (pnt1, pnt2, pnt3, side, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
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
        var leftFactor = (side === "left") ? 1.0 : 0.01;
        var rightFactor = (side === "left") ? 0.01 : 1.0;
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
     * linePnt1-{L.latlngs:控制点数组}
     * linePnt2-{L.latlngs:箭头头部高度因子}
     * point -{L.latlngs:箭头头部宽度因子}
     * Returns:
     * {L.latlngs：第四个控制点}
     */
    self.getTempPnt4 = function (linePnt1, linePnt2, point) {
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
    }
};

/****************指北针算法（Compass）****************/
/**
 * ArrowCross 十字箭头指北针
 * CircleClosedangle 圆形尖角指北针
 * Closedangle 尖角指北针
 * DoubleClosedangle 双向尖角指北针
 * Fourstar 四角指北针
 * Rhombus 菱形指北针
 * SameDirectionClosedangle 同向尖角指北针
 * Triangle 三角指北针
 * Vane 风向标指北针
 */
MilStd.Compass = new function () {
    var self = this;
    /**
     * Method: getCompassFromVert
     * 根据指北针类型和控制点，获取组成该类型指北针的点数组
     * Parameters:
     * arg-{Array.<L.latlngs>:控制点数组}
     * compassType-{string:指北针类型（ArrowCross、CircleClosedangle、Closedangle... etc.）}
     * Returns:
     * geometryArr-{Array.<L.latlngs>:构建指北针的几何图形的经纬度数组}
     */
    self.getCompassFromVert = function (arg, compassType) {
        //MilStd.commonFun.CreateNewVertices(arg);

        var dots = new Array();
        if (arg !== null && arg.length >= 2) {
            //modify_wy20180920---dot的取值采用写法调整XY顺序的方式，不用之前的调用函数的方式，避免在函数中总是置换指北针控制点的问题
            dots.push([arg[0][1], arg[0][0]]);//arg[0]
            dots.push([arg[1][1], arg[1][0]]);//arg[1]

            var parseDots = null;
            var multyLine = null;
            switch (compassType) {
                case "ArrowCross":         //十字箭头指北针
                    parseDots = MilStd.Compass.GetArrowCrossDots(dots);
                    break;
                case "CircleClosedangle":  //圆形尖角指北针
                    parseDots = MilStd.Compass.GetCircleClosedangleDots(dots);
                    break;
                case "Closedangle":        //尖角指北针
                    parseDots = MilStd.Compass.GetClosedangleDots(dots);
                    break;
                case "DoubleClosedangle":  //双向尖角指北针
                    parseDots = MilStd.Compass.GetDoubleClosedangleDots(dots);
                    break;
                case "Fourstar":           //四角指北针
                    parseDots = MilStd.Compass.GetFourstarDots(dots);
                    break;
                case "Rhombus":            //菱形指北针
                    parseDots = MilStd.Compass.GetRhombusDots(dots);
                    break;
                case "SameDirectionClosedangle": //同向尖角指北针
                    parseDots = MilStd.Compass.GetSameDirectionClosedangleDots(dots);
                    break;
                case "Triangle":                 //三角指北针
                    parseDots = MilStd.Compass.GetTriangleDots(dots);
                    break;
                case "Vane":                     //风向标指北针
                    parseDots = MilStd.Compass.GetVaneDots(dots);
                    break;
            }

            var mulLinDotArr = new Array();
            var polyDotArr = new Array();
            if (parseDots !== null && parseDots.length > 0) {
                for (var i = 0; i < parseDots.length; i++) {
                    switch (compassType) {
                        case "ArrowCross":
                        case "DoubleClosedangle":
                        case "CircleClosedangle":
                        case "Rhombus":
                        case "SameDirectionClosedangle":
                            if (i === (parseDots.length - 1)) {
                                polyDotArr.push(parseDots[i][0]);
                            }
                            else {
                                mulLinDotArr.push(parseDots[i][0]);
                            }
                            break;
                        case "Closedangle":
                        case "Fourstar":
                            if (i % 2 === 0) {
                                mulLinDotArr.push(parseDots[i][0]);
                            }
                            else {
                                polyDotArr.push(parseDots[i][0]);
                            }
                            break;
                        case "Triangle":
                            if (i === 1 || i === 4) {
                                polyDotArr.push(parseDots[i][0]);
                            }
                            else {
                                mulLinDotArr.push(parseDots[i][0]);
                            }
                            break;
                        case "Vane":
                            if (i === (parseDots.length - 1)) {
                                mulLinDotArr.push(parseDots[i][0]);
                            }
                            else {
                                polyDotArr.push(parseDots[i][0]);
                            }
                            break;
                    }
                }
                var geometryArr = new Array();
                geometryArr.push(polyDotArr);
                geometryArr.push(mulLinDotArr);
            }

            return geometryArr;
        }
    };

    /**
     * Method: GetArrowCrossDots
     * 根据控制点数组，获取组成十字箭头指北针的二维点数组
     * Parameters:
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，十字箭头由5部分组成，每一部分的用一个点数组存储}
     */
    self.GetArrowCrossDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
            return null;
        }

        var width = Math.abs(arg1[1][0] - arg1[0][0]);
        var height = Math.abs(arg1[1][1] - arg1[0][1]);

        //绘制一个字母“N”
        var locN = new Array();
        var loc1 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 15];
        locN.push(loc1);
        var loc2 = [arg1[0][1], arg1[0][0] + width / 32 * 15];
        locN.push(loc2);
        var loc3 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 17];
        locN.push(loc3);
        var loc4 = [arg1[0][1], arg1[0][0] + width / 32 * 17];
        locN.push(loc4);

        //绘制一个字母“W”
        var locW = new Array();
        var loc5 = [arg1[0][1] - height / 32 * 15, arg1[0][0]];
        locW.push(loc5);
        var loc6 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 128 * 3];
        locW.push(loc6);
        var loc7 = [arg1[0][1] - height / 32 * 15, arg1[0][0] + width / 128 * 6];
        locW.push(loc7);
        var loc8 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 128 * 9];
        locW.push(loc8);
        var loc9 = [arg1[0][1] - height / 32 * 15, arg1[0][0] + width / 128 * 12];
        locW.push(loc9);

        //绘制一个字母“E”
        var locE = new Array();
        var loc10 = [arg1[0][1] - height / 32 * 15, arg1[0][0] + width];
        var loc11 = [arg1[0][1] - height / 32 * 15, arg1[0][0] + width / 16 * 15];
        var loc12 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 16 * 15];
        var loc13 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width];
        var loc14 = [arg1[0][1] - height / 2, arg1[0][0] + width / 16 * 15];
        var loc15 = [arg1[0][1] - height / 2, arg1[0][0] + width / 50 * 48];
        locE.push(loc10);
        locE.push(loc11);
        locE.push(loc14);
        locE.push(loc15);
        locE.push(loc14);
        locE.push(loc12);
        locE.push(loc13);

        //绘制字母“S”
        var pnt4 = [arg1[1][1] + height / 32, arg1[0][0] + width / 2];
        var pnt1 = [arg1[1][1] + height / 32 + height / 64, arg1[0][0] + width / 2 + width / 32];
        var pnt3 = [arg1[1][1] + height / 32 + height / 64, arg1[0][0] + width / 2 + width / 32 - 2 * width / 32];
        var pnt2 = [arg1[1][1] + height / 32 + height / 32, arg1[0][0] + width / 2];
        var pnt6 = [arg1[1][1] + height / 32 - height / 32, arg1[0][0] + width / 2];
        var pnt5 = [arg1[1][1] + height / 32 + height / 64 - height / 32, arg1[0][0] + width / 2 + width / 32];
        var pnt7 = [arg1[1][1] + height / 32 + height / 64 - height / 32, arg1[0][0] + width / 2 + width / 32 - width / 16];
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
        var loc22 = [arg1[0][1] - height / 16 * 2, arg1[0][0] + width / 2];
        locImg.push(loc22);
        var loc23 = [arg1[0][1] - height / 16 * 4, arg1[0][0] + width / 32 * 18];
        locImg.push(loc23);
        var loc24 = [arg1[0][1] - height / 16 * 4, arg1[0][0] + width / 32 * 17];
        locImg.push(loc24);
        var loc25 = [arg1[0][1] - height / 32 * 15, arg1[0][0] + width / 32 * 17];
        locImg.push(loc25);
        var loc26 = [arg1[0][1] - height / 32 * 15, arg1[0][0] + width / 16 * 12];
        locImg.push(loc26);
        var loc27 = [arg1[0][1] - height / 32 * 14, arg1[0][0] + width / 16 * 12];
        locImg.push(loc27);
        var loc28 = [arg1[0][1] - height / 2, arg1[0][0] + width / 16 * 14];
        locImg.push(loc28);
        var loc29 = [arg1[0][1] - height / 32 * 18, arg1[0][0] + width / 16 * 12];
        locImg.push(loc29);
        var loc30 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 16 * 12];
        locImg.push(loc30);
        var loc31 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 32 * 17];
        locImg.push(loc31);
        var loc32 = [arg1[0][1] - height / 16 * 12, arg1[0][0] + width / 32 * 17];
        locImg.push(loc32);
        var loc33 = [arg1[0][1] - height / 16 * 12, arg1[0][0] + width / 32 * 18];
        locImg.push(loc33);
        var loc34 = [arg1[0][1] - height / 16 * 14, arg1[0][0] + width / 2];
        locImg.push(loc34);
        var loc35 = [arg1[0][1] - height / 16 * 12, arg1[0][0] + width / 32 * 14];
        locImg.push(loc35);
        var loc36 = [arg1[0][1] - height / 16 * 12, arg1[0][0] + width / 32 * 15];
        locImg.push(loc36);
        var loc37 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 32 * 15];
        locImg.push(loc37);
        var loc38 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 16 * 4];
        locImg.push(loc38);
        var loc39 = [arg1[0][1] - height / 32 * 18, arg1[0][0] + width / 16 * 4];
        locImg.push(loc39);
        var loc40 = [arg1[0][1] - height / 2, arg1[0][0] + width / 16 * 2];
        locImg.push(loc40);
        var loc41 = [arg1[0][1] - height / 32 * 14, arg1[0][0] + width / 16 * 4];
        locImg.push(loc41);
        var loc42 = [arg1[0][1] - height / 32 * 15, arg1[0][0] + width / 16 * 4];
        locImg.push(loc42);
        var loc43 = [arg1[0][1] - height / 32 * 15, arg1[0][0] + width / 32 * 15];
        locImg.push(loc43);
        var loc44 = [arg1[0][1] - height / 16 * 4, arg1[0][0] + width / 32 * 15];
        locImg.push(loc44);
        var loc45 = [arg1[0][1] - height / 16 * 4, arg1[0][0] + width / 32 * 14];
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，圆形尖角由4部分组成，每一部分的用一个点数组存储}
     */
    self.GetCircleClosedangleDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
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
        loc1 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 15];
        loc5.push(loc1);
        loc2 = [arg1[0][1], arg1[0][0] + width / 32 * 15];
        loc5.push(loc2);
        loc3 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 17];
        loc5.push(loc3);
        loc4 = [arg1[0][1], arg1[0][0] + width / 32 * 17];
        loc5.push(loc4);

        //绘制菱形
        var loc6 = null;
        var loc7 = null;
        var loc8 = null;
        var loc9 = null;
        var loc10 = null;

        var loc11 = new Array();
        loc6 = [arg1[0][1] - height / 16 * 2, arg1[0][0] + width / 2];
        loc11.push(loc6);
        loc7 = [arg1[0][1] - height, arg1[0][0] + width / 64 * 15];
        loc11.push(loc7);
        loc8 = [arg1[0][1] - height / 32 * 28, arg1[0][0] + width / 32 * 15];
        loc11.push(loc8);
        loc9 = [arg1[0][1] - height / 32 * 28, arg1[0][0] + width / 32 * 17];
        loc11.push(loc9);
        loc10 = [arg1[0][1] - height, arg1[0][0] + width / 64 * 49];
        loc11.push(loc10);
        loc11.push(loc6);

        //绘制横线
        var loc12 = null;
        var loc13 = null;
        var loc14 = new Array();
        var len1 = arg1[0][0] + width / 2 - height / 20 * 9;
        var len2 = arg1[0][0] + width / 2 + height / 20 * 9;

        loc12 = [arg1[0][1] - height / 16 * 9, len1];
        loc13 = [arg1[0][1] - height / 16 * 9, len2];

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

        loc16 = [arg1[0][1] - height / 16 * 9, arg1[0][0] + width / 2];
        loc17 = [arg1[0][1] - height / 5, arg1[0][0] + width / 2];
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，尖角指北针由2部分组成，每一部分的用一个点数组存储}
     */
    self.GetClosedangleDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
            return null;
        }
        var loc4 = new Array();
        var width = Math.abs(arg1[1][0] - arg1[0][0]);
        var height = Math.abs(arg1[1][1] - arg1[0][1]);
        var loc1 = [arg1[0][1], arg1[0][0] + width / 2];
        loc4.push(loc1);
        var loc2 = [arg1[0][1] - height, arg1[0][0] + width];
        loc4.push(loc2);
        var loc3 = [arg1[0][1] - height / 4 * 3, arg1[0][0] + width / 2];
        loc4.push(loc3);

        var loc8 = new Array();
        var loc5 = [arg1[0][1], arg1[0][0] + width / 2];
        loc8.push(loc5);
        var loc6 = [arg1[0][1] - height, arg1[0][0]];
        loc8.push(loc6);
        var loc7 = [arg1[0][1] - height / 4 * 3, arg1[0][0] + width / 2];
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，双向尖角指北针由4部分组成，每一部分的用一个点数组存储}
     */
    self.GetDoubleClosedangleDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
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
        loc1 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 15];
        loc5.push(loc1);
        loc2 = [arg1[0][1], arg1[0][0] + width / 32 * 15];
        loc5.push(loc2);
        loc3 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 17];
        loc5.push(loc3);
        loc4 = [arg1[0][1], arg1[0][0] + width / 32 * 17];
        loc5.push(loc4);

        //绘制菱形
        var loc6 = null;
        var loc7 = null;
        var loc8 = null;
        var loc9 = null;
        var loc10 = null;
        var loc11 = new Array();
        loc6 = [arg1[0][1] - height / 16 * 2, arg1[0][0] + width / 2];
        loc11.push(loc6);
        loc7 = [arg1[0][1] - height / 10 * 7, arg1[0][0]];
        loc11.push(loc7);
        loc8 = [arg1[0][1] - height / 32 * 18, arg1[0][0] + width / 32 * 13];
        loc11.push(loc8);
        loc9 = [arg1[0][1] - height / 32 * 18, arg1[0][0] + width / 32 * 19];
        loc11.push(loc9);
        loc10 = [arg1[0][1] - height / 10 * 7, arg1[0][0] + width];
        loc11.push(loc10);
        loc11.push(loc6);
        //绘制相反方向的菱形
        var loc12 = null;
        var loc13 = null;
        var loc14 = null;
        var loc15 = null;
        var loc16 = new Array();
        loc12 = [arg1[0][1] - height / 10 * 3, arg1[0][0]];
        loc16.push(loc12);
        loc13 = [arg1[0][1] - height / 8 * 7, arg1[0][0] + width / 2];
        loc16.push(loc13);
        loc14 = [arg1[0][1] - height / 10 * 3, arg1[0][0] + width];
        loc16.push(loc14);
        loc15 = [arg1[0][1] - height / 10 * 7, arg1[0][0] + width / 2];
        loc16.push(loc15);
        loc16.push(loc12);

        //绘制字母“S”
        var pnt4 = [arg1[1][1] + height / 32, arg1[0][0] + width / 2];
        var pnt1 = [arg1[1][1] + height / 32 + height / 64, arg1[0][0] + width / 2 + width / 32];
        var pnt3 = [arg1[1][1] + height / 32 + height / 64, arg1[0][0] + width / 2 + width / 32 - 2 * width / 32];
        var pnt2 = [arg1[1][1] + height / 32 + height / 32, arg1[0][0] + width / 2];
        var pnt6 = [arg1[1][1] + height / 32 - height / 32, arg1[0][0] + width / 2];
        var pnt5 = [arg1[1][1] + height / 32 + height / 64 - height / 32, arg1[0][0] + width / 2 + width / 32];
        var pnt7 = [arg1[1][1] + height / 32 + height / 64 - height / 32, arg1[0][0] + width / 2 + width / 32 - width / 16];
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，四角指北针由4部分组成，每一部分的用一个点数组存储}
     */
    self.GetFourstarDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
            return null;
        }
        var width = Math.abs(arg1[1][0] - arg1[0][0]);
        var height = Math.abs(arg1[1][1] - arg1[0][1]);
        var loc1 = null;
        var loc2 = null;
        var loc3 = null;
        var loc4 = null;
        var loc5 = new Array();
        loc1 = [arg1[0][1], arg1[0][0] + width / 2];
        loc5.push(loc1);
        loc2 = [arg1[0][1] - height, arg1[0][0] + width / 2];
        loc5.push(loc2);
        loc3 = [arg1[0][1] - height / 8 * 5, arg1[0][0] + width / 8 * 3];
        loc5.push(loc3);
        loc4 = [arg1[0][1] - height / 8 * 3, arg1[0][0] + width / 8 * 5];
        loc5.push(loc4);
        loc5.push(loc1);

        var loc6 = null;
        var loc7 = null;
        var loc8 = new Array();
        loc6 = [arg1[0][1] - height / 2, arg1[0][0]];
        loc8.push(loc6);
        loc7 = [arg1[0][1] - height / 2, arg1[0][0] + width];
        loc8.push(loc7);
        loc8.push(loc4);
        loc8.push(loc3);
        loc8.push(loc6);

        var loc9 = null;
        var loc10 = null;
        var loc11 = new Array();
        loc11.push(loc6);
        loc11.push(loc7);
        loc9 = [arg1[0][1] - height / 8 * 5, arg1[0][0] + width / 8 * 5];
        loc11.push(loc9);
        loc10 = [arg1[0][1] - height / 8 * 3, arg1[0][0] + width / 8 * 3];
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，菱形指北针由3部分组成，每一部分的用一个点数组存储}
     */
    self.GetRhombusDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
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

        loc1 = [arg1[0][1] - height / 16 * 2, arg1[0][0] + width / 2];
        loc5.push(loc1);
        loc2 = [arg1[0][1] - height / 16 * 9, arg1[0][0]];
        loc5.push(loc2);
        loc3 = [arg1[0][1] - height / 16 * 9, arg1[0][0] + width];
        loc5.push(loc3);
        loc5.push(loc1);

        loc4 = [arg1[1][1], arg1[0][0] + width / 2];
        loc6.push(loc3);
        loc6.push(loc4);
        loc6.push(loc2);

        loc8 = [arg1[0][1] - height / 16, (arg1[0][0] + width / 32 * 13)];
        loc12.push(loc8);
        loc9 = [arg1[0][1], (arg1[0][0] + width / 32 * 13)];
        loc12.push(loc9);
        loc10 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 19];
        loc12.push(loc10);
        loc11 = [arg1[0][1], arg1[0][0] + width / 32 * 19];
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，同向尖角指北针由3部分组成，每一部分的用一个点数组存储}
     */
    self.GetSameDirectionClosedangleDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
            return null;
        }

        var width = Math.abs(arg1[1][0] - arg1[0][0]);
        var height = Math.abs(arg1[1][1] - arg1[0][1]);
        var loc1 = [arg1[0][1], arg1[0][0] + width / 32 * 15];
        var loc2 = [arg1[0][1] - height / 16 * 13, arg1[0][0]];
        var loc3 = [arg1[0][1] - height / 16 * 11, arg1[0][0] + width / 32 * 15];
        var loc4 = [arg1[0][1] - height / 16 * 13, arg1[0][0] + width / 16 * 15];
        var loc5 = new Array();
        loc5.push(loc1);
        loc5.push(loc2);
        loc5.push(loc3);
        loc5.push(loc4);
        loc5.push(loc1);

        var loc6 = [arg1[0][1] - height / 32, arg1[0][0] + width / 32 * 17];
        var loc7 = [arg1[0][1] - height / 32 * 27, arg1[0][0] + width / 16];
        var loc8 = [arg1[0][1] - height / 16 * 12, arg1[0][0] + width / 32 * 17];
        var loc9 = [arg1[0][1] - height / 32 * 27, arg1[0][0] + width];
        var loc10 = new Array();
        loc10.push(loc6);
        loc10.push(loc7);
        loc10.push(loc8);
        loc10.push(loc9);

        //绘制N
        var loc11 = [arg1[0][1] - height, arg1[0][0] + width / 32 * 14];
        var loc12 = [arg1[0][1] - height / 16 * 15, arg1[0][0] + width / 32 * 14];
        var loc13 = [arg1[0][1] - height, arg1[0][0] + width / 32 * 18];
        var loc14 = [arg1[0][1] - height / 16 * 15, arg1[0][0] + width / 32 * 18];
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，三角指北针由6部分组成，每一部分的用一个点数组存储}
     */
    self.GetTriangleDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
            return null;
        }
        var width = Math.abs(arg1[1][0] - arg1[0][0]);
        var height = Math.abs(arg1[1][1] - arg1[0][1]);
        var locN = new Array();

        var loc1 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 13];
        locN.push(loc1);
        var loc2 = [arg1[0][1], arg1[0][0] + width / 32 * 13];
        locN.push(loc2);
        var loc3 = [arg1[0][1] - height / 16, arg1[0][0] + width / 32 * 19];
        locN.push(loc3);
        var loc4 = [arg1[0][1], arg1[0][0] + width / 32 * 19];
        locN.push(loc4);

        var loc11 = new Array();
        var loc5 = [arg1[0][1] - height / 16 * 2, arg1[0][0] + width / 2];
        loc11.push(loc5);
        var loc6 = [arg1[0][1] - height / 32 * 17, arg1[0][0]];
        loc11.push(loc6);
        var loc7 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 2];
        loc11.push(loc7);

        var loc12 = new Array();
        var loc8 = [arg1[0][1] - height / 16 * 2, arg1[0][0] + width / 2];
        loc12.push(loc8);
        var loc9 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width];
        loc12.push(loc9);
        var loc10 = [arg1[0][1] - height / 32 * 17, arg1[0][0] + width / 2];
        loc12.push(loc10);

        var loc15 = new Array();
        var loc13 = [arg1[0][1] - height / 32 * 18, arg1[0][0]];
        loc15.push(loc13);
        var loc14 = [arg1[0][1] - height / 32 * 18, arg1[0][0] + width];
        loc15.push(loc14);

        var loc19 = new Array();
        var loc16 = [arg1[0][1] - height, arg1[0][0] + width / 2];
        loc19.push(loc16);
        var loc17 = [arg1[0][1] - height / 32 * 19, arg1[0][0]];
        loc19.push(loc17);
        var loc18 = [arg1[0][1] - height / 32 * 19, arg1[0][0] + width / 2];
        loc19.push(loc18);

        var loc20 = [arg1[0][1] - height / 32 * 19, arg1[0][0] + width];
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<Array.<L.latlngs>>：二维点数组，风向标指北针由11部分组成，每一部分的用一个点数组存储}
     */
    self.GetVaneDots = function (arg1) {
        if (arg1 === null || arg1.length < 2) {
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
        loc1 = [arg1[0][1], arg1[0][0] + width / 2];
        loc2 = [arg1[0][1] - height / 8, arg1[0][0]];
        loc3 = [arg1[0][1] - height / 8 * 2, arg1[0][0] + width / 2];
        loc4 = [arg1[0][1] - height / 8, arg1[0][0] + width];
        loc5.push(loc1);
        loc5.push(loc2);
        loc5.push(loc3);
        loc6.push(loc1);
        loc6.push(loc3);
        loc6.push(loc4);
        loc6.push(loc1);
        //矩形	
        var loc7 = [arg1[0][1] - height / 8 * 2, arg1[0][0] + width / 14 * 6];
        var loc8 = [arg1[0][1] - height, arg1[0][0] + width / 14 * 6];
        var loc9 = [arg1[0][1] - height / 35 * 34, arg1[0][0] + width / 28 * 13];
        var loc10 = [arg1[0][1] - height / 35 * 34, arg1[0][0] + width / 28 * 15];
        var loc11 = [arg1[0][1] - height, arg1[0][0] + width / 14 * 8];
        var loc12 = [arg1[0][1] - height / 8 * 2, arg1[0][0] + width / 14 * 8];
        var loc13 = new Array();
        loc13.push(loc7);
        loc13.push(loc8);
        loc13.push(loc9);
        loc13.push(loc10);
        loc13.push(loc11);
        loc13.push(loc12);
        //两侧小矩形	
        var loc46 = new Array();
        var loc14 = [arg1[0][1] - height / 36 * 21, arg1[0][0] + width / 14 * 6];
        loc46.push(loc14);
        var loc15 = [arg1[0][1] - height / 36 * 22, arg1[0][0] + width / 14 * 2];
        loc46.push(loc15);
        var loc16 = [arg1[0][1] - height / 36 * 23, arg1[0][0] + width / 14 * 2];
        loc46.push(loc16);
        var loc17 = [arg1[0][1] - height / 36 * 22, arg1[0][0] + width / 14 * 6];
        loc46.push(loc17);

        var loc47 = new Array();
        var loc18 = [arg1[0][1] - height / 36 * 23, arg1[0][0] + width / 14 * 6];
        var loc19 = [arg1[0][1] - height / 36 * 24, arg1[0][0] + width / 14 * 2];
        var loc20 = [arg1[0][1] - height / 36 * 25, arg1[0][0] + width / 14 * 2];
        var loc21 = [arg1[0][1] - height / 36 * 24, arg1[0][0] + width / 14 * 6];
        loc47.push(loc18);
        loc47.push(loc19);
        loc47.push(loc20);
        loc47.push(loc21);

        var loc48 = new Array();
        var loc22 = [arg1[0][1] - height / 36 * 25, arg1[0][0] + width / 14 * 6];
        var loc23 = [arg1[0][1] - height / 36 * 26, arg1[0][0] + width / 14 * 2];
        var loc24 = [arg1[0][1] - height / 36 * 27, arg1[0][0] + width / 14 * 2];
        var loc25 = [arg1[0][1] - height / 36 * 26, arg1[0][0] + width / 14 * 6];
        loc48.push(loc22);
        loc48.push(loc23);
        loc48.push(loc24);
        loc48.push(loc25);

        var loc49 = new Array();
        var loc26 = [arg1[0][1] - height / 36 * 27, arg1[0][0] + width / 14 * 6];
        var loc27 = [arg1[0][1] - height / 36 * 28, arg1[0][0] + width / 14 * 2];
        var loc28 = [arg1[0][1] - height / 36 * 29, arg1[0][0] + width / 14 * 2];
        var loc29 = [arg1[0][1] - height / 36 * 28, arg1[0][0] + width / 14 * 6];
        loc49.push(loc26);
        loc49.push(loc27);
        loc49.push(loc28);
        loc49.push(loc29);

        var loc50 = new Array();
        var loc30 = [arg1[0][1] - height / 36 * 21, arg1[0][0] + width / 14 * 8];
        var loc31 = [arg1[0][1] - height / 36 * 22, arg1[0][0] + width / 14 * 12];
        var loc32 = [arg1[0][1] - height / 36 * 23, arg1[0][0] + width / 14 * 12];
        var loc33 = [arg1[0][1] - height / 36 * 22, arg1[0][0] + width / 14 * 8];
        loc50.push(loc30);
        loc50.push(loc31);
        loc50.push(loc32);
        loc50.push(loc33);

        var loc51 = new Array();
        var loc34 = [arg1[0][1] - height / 36 * 23, arg1[0][0] + width / 14 * 8];
        var loc35 = [arg1[0][1] - height / 36 * 24, arg1[0][0] + width / 14 * 12];
        var loc36 = [arg1[0][1] - height / 36 * 25, arg1[0][0] + width / 14 * 12];
        var loc37 = [arg1[0][1] - height / 36 * 24, arg1[0][0] + width / 14 * 8];
        loc51.push(loc34);
        loc51.push(loc35);
        loc51.push(loc36);
        loc51.push(loc37);

        var loc52 = new Array();
        var loc38 = [arg1[0][1] - height / 36 * 25, arg1[0][0] + width / 14 * 8];
        var loc39 = [arg1[0][1] - height / 36 * 26, arg1[0][0] + width / 14 * 12];
        var loc40 = [arg1[0][1] - height / 36 * 27, arg1[0][0] + width / 14 * 12];
        var loc41 = [arg1[0][1] - height / 36 * 26, arg1[0][0] + width / 14 * 8];
        loc52.push(loc38);
        loc52.push(loc39);
        loc52.push(loc40);
        loc52.push(loc41);

        var loc53 = new Array();
        var loc42 = [arg1[0][1] - height / 36 * 27, arg1[0][0] + width / 14 * 8];
        var loc43 = [arg1[0][1] - height / 36 * 28, arg1[0][0] + width / 14 * 12];
        var loc44 = [arg1[0][1] - height / 36 * 29, arg1[0][0] + width / 14 * 12];
        var loc45 = [arg1[0][1] - height / 36 * 28, arg1[0][0] + width / 14 * 8];
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
    }
}

/****************多种旗帜，包括三角形 矩形以及波浪形的算法（Flag）****************/
/**
 * TriangleFlag 三角旗
 * RectFlag 矩形旗
 * CurveFlag 波浪旗
 */
MilStd.Flag = new function () {
    var self = this;

    /**
     * Method: getFlagFromVert
     * 根据旗帜类型和控制点，获取组成旗帜的点数组
     * Parameters:
     * arg-{Array.<L.latlngs>:控制点数组}
     * flagType-{string:TriangleFlag（三角）、RectFlag（矩形）、CurveFlag（波浪）}
     * Returns:
     * parseDots-{Array.<L.latlngs>:构建旗帜的几何图形数组}
     */
    self.getFlagFromVert = function (arg, flagType) {
        var dots = new Array();
        var parseDots = null; //将返回的坐标几何作为返回值，所以放到函数体的外层
        if (arg !== null && arg.length >= 2) {
            //modify_wy20180920---dot的取值通过写法调整XY顺序的方式，不用之前的调用函数的方式，避免在函数中总是置换旗帜控制点的问题
            dots.push([arg[0][1], arg[0][0]]);//arg[0]
            dots.push([arg[1][1], arg[1][0]]);//arg[1]

            switch (flagType) {
                case "TriangleFlag":
                    parseDots = MilStd.Flag.GetTriangleFlagDots(dots);
                    break;
                case "RectFlag":
                    parseDots = MilStd.Flag.GetRectFlagDots(dots);
                    break;
                case "CurveFlag":
                    parseDots = MilStd.Flag.GetCurveFlagDots(dots);
                    break;
            }
        }
        return parseDots;
    };

    /**
     * Method: GetTriangleFlagDots
     * 根据控制点数组，获取组成三角形旗帜的点数组
     * Parameters:
     * arg-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locPnts-{Array.<L.latlngs>>：组成三角旗的几何点数组}
     */
    self.GetTriangleFlagDots = function (arg) {
        //MilStd.commonFun.CreateNewVertices(arg);
        var locPnts = new Array();

        var num = arg.length;
        if ((num >= 2) && (!MilStd.commonFun.geomEquals(arg[num - 1], arg[num - 2]))) {
            var point = arg[0];
            var point2 = arg[1];
            var point3 = [point[0], point2[1]];
            var point4 = MilStd.commonFun.getMidPoint(point, point3);
            var point5 = [point2[0], point4[1]];

            var polyPnts = new Array(); ////将得到数组的x\y调换位置
            polyPnts.push([point4[1], point4[0]]);
            polyPnts.push([point[1], point[0]]);
            polyPnts.push([point5[1], point5[0]]);
            polyPnts.push([point4[1], point4[0]]);

            var linPnts = new Array();
            linPnts.push([point3[1], point3[0]]);
            linPnts.push([point4[1], point4[0]]);

            locPnts.push(polyPnts);
            locPnts.push(linPnts);
        }
        return locPnts;
    };

    /**
     * Method: GetRectFlagDots
     * 根据控制点数组，获取组成矩形旗帜的二维点数组
     * Parameters:
     * arg-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locPnts-{Array.<L.latlngs>：组成矩形旗的几何点数组}
     */
    self.GetRectFlagDots = function (arg) {
        //MilStd.commonFun.CreateNewVertices(arg);
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
            polyPnts.push([point4[1], point4[0]]);
            polyPnts.push([point[1], point[0]]);
            polyPnts.push([point6[1], point6[0]]);
            polyPnts.push([point5[1], point5[0]]);
            polyPnts.push([point4[1], point4[0]]);

            var linPnts = new Array();
            linPnts.push([point3[1], point3[0]]);
            linPnts.push([point4[1], point4[0]]);

            locPnts.push(polyPnts);
            locPnts.push(linPnts);
        }
        return locPnts;
    };

    /**
     * Method: GetCurveFlagDots
     * 根据控制点数组，获取组成波浪旗帜的二维点数组
     * Parameters:
     * arg-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locPnts-{Array.<L.latlngs>：组成波浪旗的几何点数组}
     */
    self.GetCurveFlagDots = function (arg) {
        //MilStd.commonFun.CreateNewVertices(arg);
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
            polyPnts.push([point4[1], point4[0]]);
            for (var i = 0; i < list2.length; i++) {
                polyPnts.push([list2[i][1], list2[i][0]]);
            }

            list4.reverse();
            for (var i = 0; i < list4.length; i++) {
                polyPnts.push([list4[i][1], list4[i][0]]);
            }

            var linPnts = new Array();
            linPnts.push([point3[1], point3[0]]);
            linPnts.push([point4[1], point4[0]]);

            locPnts.push(polyPnts);
            locPnts.push(linPnts);
        }
        return locPnts;
    }
};

/****************贝赛尔曲线以及贝塞尔曲线成区的算法（Bezier）****************/
/**
 * Bezier 贝塞尔曲线成区
 * BezierLine 贝塞尔曲线
 */
MilStd.Bezier = new function () {
    var self = this;

    /**
     * Method: getBezierFromVert
     * 根据贝塞尔类型和控制点，获取组成该类型贝塞尔的点数组
     * Parameters:
     * arg-{Array.<L.latlngs>:控制点数组}
     * bazierType-{string:贝塞尔类型（Bezier、BezierLine）}
     * Returns:
     * geom-{Array.<L.latlngs>:构建贝塞尔的几何图形的数组}
     */
    self.getBezierFromVert = function (arg, bazierType) {
        var geom = null;
        if (bazierType === "BezierLine") {
            var dots = MilStd.commonFun.getBSplinePoints(arg, 2);
        }
        else if (bazierType === "Bezier") {
            arg.push(arg[0]);
            var dots = MilStd.commonFun.getBSplinePoints(arg, 2);
            arg.pop(arg[arg.length - 1]);
        }
        else if (bazierType === "AssemblyArea") {
            var dots = MilStd.Bezier.GetAssemblyAreaDots(arg);
        }
        return dots;
    };

    /**
     * Method: GetAssemblyAreaDots
     * 根据控制点数组，获取组成集结区的点数组
     * Parameters:
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<L.latlngs>：组成集结区的点数组}
     */
    self.GetAssemblyAreaDots = function (arg1) {
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
        if (loc1 >= 2 && !(arg1[loc1 - 1] === arg1[loc1 - 2])) {
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
     * arg1-{Array.<L.latlngs>:控制点数组}
     * Returns:
     * locArr-{Array.<L.latlngs>：组成集结区的贝塞尔点数组}
     */
    self.getAdvancedBezierPoints = function (arg1) {
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
    }
};

/****************扩展图形绘制和更新基本入口（MilStdGeomtry）****************/
/**
 * 军标几何
 * @type {*}
 */
MilStd.MilStdGeomtry = MilStd.MilStdGeomtry || {};
//定义一个全局变量，用来储存map上所有军标几何的id  
var idArray = [];
MilStd.MilStdGeomtry = L.FeatureGroup.extend({
    initialize: function (verticePnts, miltype, milStdParams, options) {
        L.FeatureGroup.prototype.initialize.call(this, map, options);
        if (verticePnts === undefined || verticePnts === null) {
            return;
        }
        this.vertices = verticePnts;
        this.OrgVertices = null;
        this.milStdType = miltype;
        //当前存储的图层id可能为多个或一个，所以定义成数组形式
        this.layerid = [];
        this.milStdParams = (milStdParams !== undefined && milStdParams !== null) ? milStdParams : new MilStd.MilstdParams();
        if (this.milStdType === MilStd.EnumMilstdType.TriangleFlag || this.milStdType === MilStd.EnumMilstdType.RectFlag ||
            this.milStdType === MilStd.EnumMilstdType.CurveFlag || this.milStdType === MilStd.EnumMilstdType.ArrowCross ||
            this.milStdType === MilStd.EnumMilstdType.CircleClosedangle || this.milStdType === MilStd.EnumMilstdType.Closedangle ||
            this.milStdType === MilStd.EnumMilstdType.DoubleClosedangle || this.milStdType === MilStd.EnumMilstdType.Fourstar ||
            this.milStdType === MilStd.EnumMilstdType.Rhombus || this.milStdType === MilStd.EnumMilstdType.SameDirectionClosedangle ||
            this.milStdType === MilStd.EnumMilstdType.Triangle || this.milStdType === MilStd.EnumMilstdType.Vane ||
            this.milStdType === MilStd.EnumMilstdType.AssemblyArea) {
            this.milStdParams.maxVertices = 2;
        }
        if (this.milStdType === MilStd.EnumMilstdType.DoubleArrow) {
            this.milStdParams.maxVertices = 4;
        }
        return this;
    },

    /**
     * 继承基类的添加图层方法
     * @param layer
     * @returns {*}
     */
    addLayer: function (layer) {
        if (this.hasLayer(layer)) {
            return this;
        }

        layer.addEventParent(this);
        L.FeatureGroup.prototype.addLayer.call(this, layer);
        return this.fire('layeradd', {layer: layer});
    },

    /**
     * 继承基类的获取图层方法
     * @returns {Array}
     */
    getLayers: function () {
        var layers = [];
        this.eachLayer(layers.push, layers);
        return layers;
    },

    /**
     * 图形的绘制与更新
     * @param vertices
     * @param isMouseMove
     * @returns {*}
     * @constructor
     */
    Update: function (vertices, isMouseMove) {
        if (this.milStdType === "DoubleArrow") {
            if (vertices.length < 3) {
                return;
            }
        }
        else {
            if (vertices.length < 2) {
                return;
            }
        }
        //单击时进入
        if (!isMouseMove) {
            this.vertices = vertices;
        }
        //定义点数组，用于存储算法处理过的点坐标
        var parseDots = null;
        switch (this.milStdType) {
            case MilStd.EnumMilstdType.SimpleArrow:
            case MilStd.EnumMilstdType.StraightArrow:
            case MilStd.EnumMilstdType.DoubleArrow:
            case MilStd.EnumMilstdType.SingleLineArrow:
                //算法后的坐标点，用于绘制几何图形
                parseDots = MilStd.Arrow.getArrowFromVert(vertices, this.milStdType, this.milStdParams);
                //根据最新的算法坐标点绘制几何图形（SingleLineArrow画线，其余三个箭头画多边形）
                var tempPoly = null; //图形或线
                if (this.milStdType === "SingleLineArrow") {
                    tempPoly = L.polyline(parseDots);
                }
                else {
                    tempPoly = L.polygon(parseDots);
                }
                //判断是否已存在该军标几何，若不存在则添加，若存在则更新
                //根据layerid判断该军标是否已经存在
                if ($.inArray(this.layerid, idArray) === -1) {
                    tempPoly.addTo(this);
                    this.layerid = this.getLayers()[0]._leaflet_id;
                    idArray.push(this.getLayers()[0]._leaflet_id);
                    this.setStyle({
                        layerid: this.layerid,
                        Originalvertices: this.vertices,
                        milStdType: this.milStdType,
                        milStdParams: this.milStdParams,
                        color: $('#LinClr').val(),
                        weight: $('#LinWidth').val(),
                        fillColor: $('#FillClr').val(),
                        fillOpacity: 0.5
                    }); //#000000 rgba(0,0,0,0.4)设置绘制图层的样式  （FeatureGroup可以设置样式，但是LayerGroup不可以）
                }
                else {
                    //更新几何图形
                    this._layers[this.layerid].editing._poly._setLatLngs(parseDots);
                    //刷新图层
                    this._layers[this.layerid].editing._poly.redraw();
                }
                return this;
                break;
            case MilStd.EnumMilstdType.TriangleFlag:
            case MilStd.EnumMilstdType.RectFlag:
            case MilStd.EnumMilstdType.CurveFlag:
                //调整顶点的存储，使军标几何中存储的都是正确的顶点。保留两份，一份绘制结束后的原本顶点，一份修改时的实时顶点
                this.OrgVertices = vertices;
                parseDots = MilStd.Flag.getFlagFromVert(vertices, this.milStdType);
                //图形
                var tempPoly = L.polygon(parseDots[0]);
                //线
                var templine = L.polyline(parseDots[1]);
                if ($.inArray(this.layerid[0], idArray) === -1) {
                    tempPoly.addTo(this);
                    templine.addTo(this);
                    this.layerid.push(this.getLayers()[0]._leaflet_id);
                    this.layerid.push(this.getLayers()[1]._leaflet_id);
                    idArray.push(this.getLayers()[0]._leaflet_id);
                    idArray.push(this.getLayers()[1]._leaflet_id);
                    //设置绘制图层的样式  （FeatureGroup可以设置样式，但是LayerGroup不可以）
                    return this.setStyle({
                        layerid: this.layerid,
                        Originalvertices: this.vertices,
                        milStdType: this.milStdType,
                        milStdParams: this.milStdParams,
                        color: $('#LinClr').val(),
                        weight: $('#LinWidth').val(),
                        fillColor: $('#FillClr').val(),
                        fillOpacity: 0.5
                    });
                }
                else {
                    //更新几何图形
                    this._layers[this.layerid[0]].editing._poly.setLatLngs(parseDots[0]);
                    this._layers[this.layerid[1]].editing._poly.setLatLngs(parseDots[1]);
                    //刷新图层
                    this._layers[this.layerid[0]].editing._poly.redraw();
                    this._layers[this.layerid[0]].editing._poly.redraw();
                }
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
                parseDots = MilStd.Compass.getCompassFromVert(vertices, this.milStdType);
                //图形
                var tempPoly = L.polygon(parseDots[0]);
                //线
                var templine = L.polyline(parseDots[1]);
                if ($.inArray(this.layerid[0], idArray) === -1) {
                    tempPoly.addTo(this);
                    templine.addTo(this);
                    this.layerid.push(this.getLayers()[0]._leaflet_id);
                    this.layerid.push(this.getLayers()[1]._leaflet_id);
                    idArray.push(this.getLayers()[0]._leaflet_id);
                    idArray.push(this.getLayers()[1]._leaflet_id);
                    return this.setStyle({
                        layerid: this.layerid,
                        vertices: this.vertices,
                        milStdType: this.milStdType,
                        milStdParams: this.milStdParams,
                        color: $('#LinClr').val(),
                        weight: $('#LinWidth').val(),
                        fillColor: $('#FillClr').val(),
                        fillOpacity: 0.5
                    }); //设置绘制图层的样式  （FeatureGroup可以设置样式，但是LayerGroup不可以）
                }
                else {
                    //更新几何图形
                    this._layers[this.layerid[0]].editing._poly._setLatLngs(parseDots[0]);
                    this._layers[this.layerid[1]].editing._poly._setLatLngs(parseDots[1]);
                    //刷新图层
                    this._layers[this.layerid[0]].editing._poly.redraw();
                    this._layers[this.layerid[1]].editing._poly.redraw();
                }
                break;
            case MilStd.EnumMilstdType.Bezier:
            case MilStd.EnumMilstdType.BezierLine:
            case MilStd.EnumMilstdType.AssemblyArea:
                parseDots = MilStd.Bezier.getBezierFromVert(vertices, this.milStdType);
                //图形或线（BezierLine画线，其余类型画图形）
                var tempPoly = null;
                if (this.milStdType === "BezierLine") {
                    tempPoly = L.polyline(parseDots);
                }
                else {
                    //图形
                    tempPoly = L.polygon(parseDots);
                }

                if ($.inArray(this.layerid[0], idArray) === -1) {
                    tempPoly.addTo(this);
                    this.layerid.push(this.getLayers()[0]._leaflet_id);
                    idArray.push(this.getLayers()[0]._leaflet_id);
                    return this.setStyle({
                        layerid: this.layerid,
                        Originalvertices: this.vertices,
                        milStdType: this.milStdType,
                        milStdParams: this.milStdParams,
                        color: $('#LinClr').val(),
                        weight: $('#LinWidth').val(),
                        fillColor: $('#FillClr').val(),
                        fillOpacity: 0.5
                    }); //设置绘制图层的样式  （FeatureGroup可以设置样式，但是LayerGroup不可以）
                }
                else {
                    //更新几何图形
                    this._layers[this.layerid].editing._poly._setLatLngs(parseDots);
                    //刷新图层
                    this._layers[this.layerid].editing._poly.redraw();
                }
                break;
        }
    }
});

/****************军标绘制工具****************/
MilStd.tool = MilStd.tool || {};
MilStd.MilStdDrawTool = L.Evented.extend({
    options: {},

    initialize: function (id, options) {
        map = id;
        this.vertices = new Array(); //军标控制点
        this.milStdGeom = null;      //军标几何
        this.milStdGeomArray = new Array(); //军标几何数组，
        this.milStdType = null;      //军标类型
        this.milStdParams = null;    //军标参数
        this.drawnItems = new L.LayerGroup(); //绘制图层组
        this.geom = null;//当前绘制几何
    },

    activate: function (milType, milStdParams, name) {
        this.deactivate();
        map.on("click", this.drawStartHandle, this);
        this.milStdType = milType;
        this.milStdParams = milStdParams;
        this.featureName = (name !== undefined && name !== null) ? name : "draw";
        map.addLayer(this.drawnItems);
    },

    deactivate: function () {
        this.disconnectEventHandlers();
        this.vertices = [];
        this.milStdGeom = null;
    },

    drawStartHandle: function (e) {
        var temPnt = [e.latlng.lat, e.latlng.lng];
        this.vertices.push(temPnt);
        this.milStdGeom = new MilStd.MilStdGeomtry(this.vertices, this.milStdType, this.milStdParams);
        //开始绘制时就附加一系列的监听事件
        map.off("click", this.drawStartHandle, this);
        var browserName = navigator.userAgent.toLowerCase();
        if (browserName.indexOf("chrome") > -1) {
            //Google内核浏览器下：关于鼠标单击与双击的事件触发，这里通过event.detail的值判别，为2进入双击事件，为1进入单击事件。
            map.on("click", this.drawClickHandle, this);
        }
        else {
            //IE内核浏览器下分别添加单击和双击事件
            map.on("click", this.drawContinueHandle, this);
            map.on("dblclick", this.drawEndHandle, this);
        }
        //鼠标经过事件，应该实现的是实时绘制的效果
        map.on("mousemove", this.mouseMoveHandle, this);
    },

    drawClickHandle: function (e) {
        if (event.detail === 2) {
            //结束绘制
            this.drawEndHandle(e);
        }
        else {
            this.drawContinueHandle(e)
        }
    },

    drawContinueHandle: function (e) {
        var temPnt = [e.latlng.lat, e.latlng.lng];
        var len = MilStd.commonFun.CalLengthOfTwoPoints(temPnt, this.vertices[this.vertices.length - 1]);
        if (len < MilStd.enum.ZERO_TOLERANCE) {
            return;
        }
        //箭头和集结区的点击为拐点，除此之外剩下的指北针和旗帜，单击为绘制完成
        if (this.milStdType === "SimpleArrow" || this.milStdType === "DoubleArrow" || this.milStdType === "StraightArrow" || this.milStdType === "SingleLineArrow" || this.milStdType === "Bezier" || this.milStdType === "BezierLine" || this.milStdType === "AssemblyArea") {
            this.vertices.push(temPnt);
            this.geom = this.milStdGeom.Update(this.vertices, false);
            if (this.geom !== undefined) {
                this.drawnItems.addLayer(this.geom);
            }
        }
        else {
            this.vertices.push(temPnt);
            this.drawEndHandle(e);
        }
    },

    drawEndHandle: function (e) {
        //禁止map的双击放大功能
        map.doubleClickZoom.disable();
        //绘制结束时设置绘制军标的填充不透明
        this.milStdGeom.setStyle({fillOpacity: 1});
        this.disconnectEventHandlers();
        event.preventDefault(); //preventDefault方法阻止元素发生默认的行为（例如，当点击提交按钮时阻止对表单的提交）
        //5s后开启map的双击放大功能
        //setTimeout(map.doubleClickZoom.enable(),5000);
    },

    mouseMoveHandle: function (e) {
        //获取当前鼠标经过的位置坐标
        var temPnt = [e.latlng.lat, e.latlng.lng];
        //两点间的距离，判断长度是否足够长，如果小于0.0001，则忽略不急
        var len = MilStd.commonFun.CalLengthOfTwoPoints(temPnt, this.vertices[this.vertices.length - 1]);
        if (len < MilStd.enum.ZERO_TOLERANCE) {
            return;
        }
        //根据获得顶点，然后传入算法中进行绘制
        var pnts = this.vertices.concat([temPnt]);
        //更新几何
        this.geom = this.milStdGeom.Update(pnts, true);
        if (this.geom !== undefined) {
            this.drawnItems.addLayer(this.geom);
        }
    },

    disconnectEventHandlers: function (e) {
        //清除地图上所有绘制相关的监听
        map.off("click", this.drawStartHandle, this);
        map.off("click", this.drawContinueHandle, this);
        map.off("mousemove", this.mouseMoveHandle, this);
        map.off("dbclick", this.drawEndHandle, this);
        map.off("click", this.drawClickHandle, this);
    }
});

/****************图形修改（ModifyTool）****************/
MilStd.ModifyTool = MilStd.ModifyTool || {};

/**
 * 选中状态下的军标几何控制点的图标显示图层
 */
MilStd.ModifyTool = L.Handler.extend({
    // @method initialize(): void
    initialize: function (MilStdPoly, drawTool) {
        this.MilStdPoly = MilStdPoly;
        //判断是否首次拖拽，以及被拖拽的控制点的序列号
        this.isFirstDrag = true;
        this.selectIndex = -1;
        this.MilStdiconItems = new L.LayerGroup();
        this.drawTool = drawTool;
    },

    addHooks: function () {//activate
        //this.deactivate();
        //地图上的所有军标几何添加点击监听，点击任意军标可以开启图形修改操作
        this.MilStdPoly.on('click', this.clickIt, this);
    },

    removeHooks: function () {//deactivate
        //清除修改控制点上的拖拽监听
        this.MilStdiconItems.eachLayer(function (TempMarker) {
            TempMarker.off();
        }, this);
        //清除军标几何上的所有图形修改的监听
        this.drawTool.drawnItems.eachLayer(function (layer) {
            layer.off();
        }, this);
    },

    dragIt: function (e) {
        //this.selectIndex =-1;
        //当前鼠标的位置
        var temPnt = [e.latlng.lat, e.latlng.lng];
        //当前控制点所在军标几何的控制点数组
        var vertices = this.MilStdPoly.vertices;
        //循环取出被拖动的控制点的序列号（此处可以优化下，不需要每次都从头比较，每次都与上次同类操作对比即可）
        for (var i = 0; i < vertices.length; i++) {
            var len = MilStd.commonFun.CalLengthOfTwoPoints(temPnt, vertices[i]);
            if (len < 5e-1) {
                this.selectIndex = i;
                // this.isFirstDrag = false;
            }
        }
        //若未取到控制点的序列号，就什么也不做
        if (this.selectIndex === -1) {
            return;
        }

        //根据鼠标拖动后的最新位置，实时更新对应序号下的控制点
        vertices[this.selectIndex] = temPnt;

        //根据最新的控制点，实时更新军标几何图形
        this.MilStdPoly.Update(vertices, true);
    },

    clickIt: function (e) {
        //清除地图上的所有控制点图标
        this.MilStdiconItems.clearLayers();
        //将标注图层组添加到地图中
        map.addLayer(this.MilStdiconItems);
        //循环取出控制点，并标注
        for (var i = 0; i < this.MilStdPoly.vertices.length; i++) {
            var TempVertices = new L.circle(this.MilStdPoly.vertices[i], {
                radius: 50000,
                CurrentPont: this.MilStdPoly.vertices[i],
                color: "#CC66FF",
                fillColor: 'red',
                fillOpacity: 1
            });
            var touchMoveIcon = new L.DivIcon({
                iconSize: [9, 9],
                className: 'leaflet-div-icon leaflet-editing-icon leaflet-edit-move leaflet-touch-icon'
            });
            //设置标注的样式和属性 
            var TempMarker = L.marker(this.MilStdPoly.vertices[i], {
                icon: touchMoveIcon,
                draggable: true,
                CurrentPont: this.MilStdPoly.vertices[i],
                it: this.MilStdPoly
            });
            //将标注添加到标注图层组中iconItems
            this.MilStdiconItems.addLayer(TempMarker);
            //为每一个控制点标注添加拖动监听
            TempMarker.on("drag", this.dragIt, this);
        }
    }
});

/****************图形拖拽（DragPan）****************/
MilStd.DragPan = MilStd.DragPan || {};

MilStd.DragPan = L.Handler.extend({
    // @method initialize(): void
    initialize: function (MilStdPoly) {
        this.MilStdPoly = MilStdPoly;
        //定义一个图形移动时，鼠标点击的初始位置
        this.theFirstPoint = null;
    },

    mouseupIt: function (e) {
        //鼠标拖动军标几何移动结束时，pointer-events设置为auto恢复鼠标相关事件
        $("#editGeomWin").css("pointer-events", "auto");
        //取消地图被拖拽的禁止
        map.dragging.enable();
    },

    mousemoveIt: function (e) {
//判断鼠标左键是否按下，当鼠标左键按下且鼠标移动时，军标几何才能跟
        if (e.originalEvent.buttons === 1) {
            //当前鼠标移动时的当前位置
            var temPnt = [e.latlng.lat, e.latlng.lng];
            //计算偏移量
            var deltaX = temPnt[0] - this.theFirstPoint[0];
            var deltaY = temPnt[1] - this.theFirstPoint[1];

            //当前控制点所在军标几何的控制点数组
            var vertices = this.MilStdPoly.vertices;
            //根据偏移量，计算被移动后的新的控制点位置
            for (var i = 0; i < vertices.length; i++) {
                vertices[i][0] = vertices[i][0] + deltaX;
                vertices[i][1] = vertices[i][1] + deltaY;
            }

            //根据最新的控制点，实时更新军标几何图形
            this.MilStdPoly.Update(vertices, true);
            this.theFirstPoint = temPnt;

            //禁止地图被拖拽
            map.dragging.disable();
            //鼠标拖动军标几何移动的时候，将军标工具集的div设置为该元素永远不会成为鼠标的target。即pointer-events设置为none，若再次设置为auto则恢复。
            $("#editGeomWin").css("pointer-events", "none");

        }
    },

    mousedownIt: function (e) {
        //鼠标点击时的当前位置
        var temPnt = [e.latlng.lat, e.latlng.lng];
        this.theFirstPoint = temPnt;
        this.MilStdPoly.on('mousemove', this.mousemoveIt, this);//添加监听，鼠标移动时，军标几何跟着移动
        this.MilStdPoly.off("mousedown", this.mousedownIt, this);//清除监听，鼠标按下时开启移动
        this.MilStdPoly.on('mouseup', this.mouseupIt, this);//添加监听，鼠标左键抬起时结束移动
    },

    mouseoverIt: function (e) {
    },

    addHooks: function () {//activate
        //this.deactivate();
        //先鼠标在军标几何上，也就是经过军标几何时，然后点击军标几何时才开启拖动事件
        this.MilStdPoly.on('mouseover', this.mouseoverIt, this);//添加鼠标经过时的样式变化
        this.MilStdPoly.on('mousedown', this.mousedownIt, this);//鼠标点击时，军标几何开始准备移动
    },

    removeHooks: function () {//deactivate
        //清除军标几何上的所有拖动相关的监听
        this.MilStdPoly.off();
        for (var i = 0; i < this.MilStdPoly.getLayers().length; i++) {
            //清除军标几何中的几何元素相关的所有监听
            this.MilStdPoly.getLayers()[i].off();
        }
    },

    modifyEndHandle: function (e) {
    }

});
