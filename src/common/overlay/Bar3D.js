import {Zondy} from '../../service/common/Base';
import {newGuid} from '../../service/common/Util';
import {ShapeFactory} from './feature/ShapeFactory';
import {Polygon as FeaturePolygon} from './feature/Polygon';
import {Graph} from './Graph';

/**
 * @private
 * @class Zondy.Theme.Bar3D
 * @classdesc 三维柱状图 。
 * @extends Zondy.Feature.Theme.Graph
 * @param {Zondy.Feature.Vector} data - 用户数据。
 * @param {Zondy.Layer.Graph} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 中的参与此图表生成的字段名称。
 * @param {Zondy.Theme.Bar3D.setting} setting - 图表配置对象。
 * @param {Zondy.LonLat} [lonlat] - 专题要素地理位置，默认为 data 指代的地理要素 Bounds 中心。
 *
 * @typedef {Object} Zondy.Theme.Bar3D.setting
 * @property {number} width - 专题要素（图表）宽度。
 * @property {number} height - 专题要素（图表）高度。
 * @property {Array.<number>} codomain - 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @property {number} [XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
 * @property {number} [YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
 * @property {Array.<number>} [dataViewBoxParameter] - 数据视图框 dataViewBox 参数，它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值。当使用坐标轴时 dataViewBoxParameter 的默认值为：[45, 25, 20, 20]；不使用坐标轴时 dataViewBoxParameter 的默认值为：[5, 5, 5, 5]。
 * @property {number} [decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @property {boolean} [useBackground=true] - 是否使用图表背景框。
 * @property {Zondy.Feature.ShapeParameters.Rectangle.style} [backgroundStyle] - 背景样式。
 * @property {Array.<number>} [backgroundRadius=[0, 0, 0, 0]] - 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,则 backgroundRadius 为 [r1、r2、r3、r4 ]。
 * @property {Array.<number>} [xShapeBlank] - 水平方向上的图形空白间隔参数。长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。
 * @property {number} [bar3DParameter=10] - 3D 柱状参数，3d柱形正面相对于背面向 x 轴和 y 轴负方向偏移的绝对值。
 * @property {boolean} [useAxis=true] - 是否使用坐标轴。
 * @property {Zondy.Feature.ShapeParameters.Line.style} [axisStyle] - 坐标轴样式。
 * @property {boolean} [axisUseArrow=true] -坐标轴是否使用箭头。
 * @property {number} [axisYTick=0] - y 轴刻度数量。
 * @property {Array.<string>}  [axisYLabels] - y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。
 * @property {Zondy.Feature.ShapeParameters.Label.style} [axisYLabelsStyle] - y 轴上的标签组样式。
 * @property {Array.<number>} [axisYLabelsOffset=0] - y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正，默认值：0；数组第二项表示 y 轴标签组纵向上的偏移量，向下为正。
 * @property {Array.<string>}  [axisXLabels] - x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。标签排布规则：当标签数量与 xShapeInfo 中的属性 xShapeCenter 数量相同（即标签个数与数据个数相等时）, 按照 xShapeCenter 提供的位置排布标签，否则沿数据视图框下面条边等距排布标签。
 * @property {Zondy.Feature.ShapeParameters.Label.style} axisXLabelsStyle - x 轴上的标签组样式。
 * @property {Array.<number>} axisXLabelsOffset - x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正，默认值：-10；数组第二项表示 x 轴标签组纵向上的偏移量，向下为正，默认值：10。
 * @property {boolean} [useXReferenceLine] - 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。
 * @property {Zondy.Feature.ShapeParameters.Line.style} [xReferenceLineStyle] - 水平参考线样式。
 * @property {number} [axis3DParameter=20] - 3D 坐标轴参数，此属性值在大于等于 15 时有效。
 * @property {Zondy.Feature.ShapeParameters.Polygon.style} barFaceStyle - 3d 柱状图柱条正面基础 style，此参数控制柱条正面基础样式，优先级低于 barFaceStyleByFields 和 barFaceStyleByCodomain。
 * @property {Array.<Zondy.Feature.ShapeParameters.Polygon.style>} [barFaceStyleByFields] - 按专题字段 themeFields（<Zondy.Layer.Graph.themeFields>）为柱条正面赋 style，此参数按字段控制柱条正面样式，优先级低于 barFaceStyleByCodomain，高于 barFaceStyle。此数组中的元素是样式对象。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<Zondy.Layer.Graph.themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],barFaceStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的柱条正面使用 style1，字段 POP_1995 对应的柱条正面使用 style2 ，字段 POP_1999 对应的柱条正面使用 style3。
 * @property {Array.<Object>} [barFaceStyleByCodomain] - 按柱条正面代表的数据值所在值域范围控制柱条正面样式，优先级高于 barFaceStyle 和 barFaceStyleByFields。
 * @property {Zondy.Feature.ShapeParameters.Polygon.style} [barSideStyle=barFaceStyle] - 3d 柱状图柱条侧面基础 style，此参数控制柱条侧面基础样式，优先级低于 barSideStyleByFields 和 barSideStyleByCodomain。
 * @property {Array.<Zondy.Feature.ShapeParameters.Polygon.style>} [barSideStyleByFields] - 按专题字段 themeFields（<Zondy.Layer.Graph.themeFields>）为柱条侧面赋style，此数按字段控制柱条侧面样式，优先级低于 barSideStyleByCodomain，高于 barSideStyle。此数组中的元素是样式对象。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<Zondy.Layer.Graph.themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],barSideStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的柱条侧面使用 style1，字段 POP_1995对应的柱条侧面使用style2，字段POP_1999对应的柱条侧面使用style3。默认值：barFaceStyleByFields。
 * @property {Array.<Object>} [barSideStyleByCodomain=barFaceStyleByCodomain] - 按柱条侧面代表的数据值所在值域范围控制柱条侧面样式，优先级高于 barSideStyle 和 barSideStyleByFields。
 * @property {Object} [barFaceHoverStyle] - 3d 柱条正面 hover 状态时的样式，barHoverAble 为 true 时有效。
 * @property {Object} [barSideHoverStyle=barFaceHoverStyle] - 3d 柱条侧面 hover 状态时的样式，barHoverAble 为 true 时有效。
 * @property {Object}  [barTopHoverStyle=barFaceHoverStyle] - 3d 柱条顶面 hover 状态时的样式，barHoverAble 为 true 时有效。
 * @property {boolean} [barHoverAble=true] - 是否允许柱条使用 hover 状态。同时设置 barHoverAble 和 barClickAble 为 false，可以直接屏蔽柱条对专题图层事件的响应。
 * @property {boolean} [barClickAble=true] - 是否允许柱条被点击。同时设置 barHoverAble 和 barClickAble 为 false，可以直接屏蔽柱条对专题图层事件的响应。
 * @property {Zondy.Feature.ShapeParameters.Polygon.style} [barTopStyle=barFaceStyle] - 3d 柱状图柱条顶面基础 style，此参数控制柱条顶面基础样式，优先级低于 barTopStyleByFields 和 barTopStyleByCodomain。
 * @property {Array.<Zondy.Feature.ShapeParameters.Polygon.style>} [barTopStyleByFields=barFaceStyleByFields] - 按专题字段 themeFields（<Zondy.Layer.Graph.themeFields>）为柱条顶面赋 style，此参数按字段控制柱条顶面样式，优先级低于 barTopStyleByCodomain，高于 barTopStyle。此数组中的元素是样式对象。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<Zondy.Layer.Graph.themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],barTopStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的柱条顶面使用 style1，字段 POP_1995 对应的柱条顶面使用 style2 ，字段 POP_1999 对应的柱条顶面使用 style3。
 * @property {Array.<Object>} [barTopStyleByCodomain=barFaceStyleByCodomain] - 按柱条顶面代表的数据值所在值域范围控制柱条顶面样式，优先级高于 barTopStyle 和 barTopStyleByFields。
 *
 * @example
 * // barFaceStyleByCodomain 用法示例如下：
 * // barFaceStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <Zondy.Feature.ShapeParameters.Polygon.style> 。
 * // barFaceStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 *
 * @example
 * // barSideStyleByCodomain 用法示例如下：
 * // barSideStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <Zondy.Feature.ShapeParameters.Polygon.style> 。
 * // barSideStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 *
 * @example
 * // barTopStyleByCodomain 用法示例如下：
 * // barTopStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性：<Zondy.Feature.ShapeParameters.Polygon.style> 。
 * // barTopStyleByCodomain 数组形如：
 * [
 *   {
 *     start:0,
 *     end:250,
 *     style:{
 *          fillColor:"#00CD00"
 *      }
 *  },
 *   {
 *     start:250,
 *     end:500,
 *     style:{
 *          fillColor:"#00EE00"
 *      }
 *  },
 *   {
 *     start:500,
 *     end:750,
 *     style:{
 *          fillColor:"#00FF7F"
 *      }
 *  },
 *   {
 *     start:750,
 *     end:1500,
 *     style:{
 *          fillColor:"#00FF00"
 *      }
 *  }
 * ]
 */

class Bar3D extends Graph {

    constructor(data, layer, fields, setting, lonlat, option) {
        super(data, layer, fields, setting, lonlat, option);
        this.CLASS_NAME = "Zondy.Theme.Bar3D";
    }

    /**
     * @function Zondy.Theme.Bar3D.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Zondy.Theme.Bar3D.prototype.assembleShapes
     * @description 图形装配实现（扩展接口）。
     */
    assembleShapes() {
        // 图表配置对象
        var sets = this.setting;

        // 默认数据视图框
        if (!sets.dataViewBoxParameter) {
            if (typeof (sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 25, 20, 20];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

        // 3d 柱图的坐标轴默认使用坐标轴箭头
        sets.axisUseArrow = (typeof (sets.axisUseArrow) !== "undefined") ? sets.axisUseArrow : true;
        sets.axisXLabelsOffset = (typeof (sets.axisXLabelsOffset) !== "undefined") ? sets.axisXLabelsOffset : [-10, 10];

        // 重要步骤：初始化参数
        if (!this.initBaseParameter()) {
            return;
        }

        // 值域
        var codomain = this.DVBCodomain;
        // 重要步骤：定义图表 Bar 数据视图框中单位值的含义
        this.DVBUnitValue = (codomain[1] - codomain[0]) / this.DVBHeight;
        // 数据视图域
        var dvb = this.dataViewBox;
        // 用户数据值
        var fv = this.dataValues;
        if (fv.length < 1) {
            return;
        }       // 没有数据

        // 数据溢出值域范围处理
        for (let i = 0, fvLen = fv.length; i < fvLen; i++) {
            if (fv[i] < codomain[0] || fv[i] > codomain[1]) {
                return;
            }
        }

        // 获取 x 轴上的图形信息
        var xShapeInfo = this.calculateXShapeInfo();
        if (!xShapeInfo) {
            return;
        }
        // 每个柱条 x 位置
        var xsLoc = xShapeInfo.xPositions;
        // 柱条宽度
        var xsWdith = xShapeInfo.width;

        // 坐标轴, 默认启用
        if (typeof (sets.useBackground) === "undefined" || sets.useBackground) {
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        // 坐标轴
        if (!sets.axis3DParameter || isNaN(sets.axis3DParameter) || sets.axis3DParameter < 15) {
            sets.axis3DParameter = 20;
        }
        if (typeof (sets.useAxis) === "undefined" || sets.useAxis) {
            this.shapes = this.shapes.concat(ShapeFactory.GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));
        }

        // 3d 偏移量, 默认值 10;
        var offset3d = (sets.bar3DParameter && !isNaN(sets.bar3DParameter)) ? sets.bar3DParameter : 10;

        for (let i = 0; i < fv.length; i++) {
            // 无 3d 偏移量时的柱面顶部 y 坐标
            var yPx = dvb[1] - (fv[i] - codomain[0]) / this.DVBUnitValue;
            // 无 3d 偏移量时的柱面的左、右端 x 坐标
            var iPoiL = xsLoc[i] - xsWdith / 2;
            var iPoiR = xsLoc[i] + xsWdith / 2;

            // 3d 柱顶面节点
            var bar3DTopPois = [
                [iPoiL, yPx],
                [iPoiR, yPx],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiL - offset3d, yPx + offset3d]
            ];

            // 3d 柱侧面节点
            var bar3DSidePois = [
                [iPoiR, yPx],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiR - offset3d, dvb[1] + offset3d],
                [iPoiR, dvb[1]]
            ];

            // 3d 柱正面节点
            var bar3DFacePois = [
                [iPoiL - offset3d, dvb[1] + offset3d],
                [iPoiR - offset3d, dvb[1] + offset3d],
                [iPoiR - offset3d, yPx + offset3d],
                [iPoiL - offset3d, yPx + offset3d]
            ];
            if (offset3d <= 0) {  // offset3d <= 0 时正面不偏移
                bar3DFacePois = [
                    [iPoiL, dvb[1]],
                    [iPoiR, dvb[1]],
                    [iPoiR, yPx],
                    [iPoiL, yPx]
                ];
            }

            // 新建 3d 柱面顶面、侧面、正面图形参数对象
            var polyTopSP = new FeaturePolygon(bar3DTopPois);
            var polySideSP = new FeaturePolygon(bar3DSidePois);
            var polyFaceSP = new FeaturePolygon(bar3DFacePois);


            // 侧面、正面图形 style 默认值
            sets.barSideStyle = sets.barSideStyle ? sets.barSideStyle : sets.barFaceStyle;
            sets.barSideStyleByFields = sets.barSideStyleByFields ? sets.barSideStyleByFields : sets.barFaceStyleByFields;
            sets.barSideStyleByCodomain = sets.barSideStyleByCodomain ? sets.barSideStyleByCodomain : sets.barFaceStyleByCodomain;
            sets.barTopStyle = sets.barTopStyle ? sets.barTopStyle : sets.barFaceStyle;
            sets.barTopStyleByFields = sets.barTopStyleByFields ? sets.barTopStyleByFields : sets.barFaceStyleByFields;
            sets.barTopStyleByCodomain = sets.barTopStyleByCodomain ? sets.barTopStyleByCodomain : sets.barFaceStyleByCodomain;
            // 顶面、侧面、正面图形 style
            polyFaceSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barFaceStyle, sets.barFaceStyleByFields, sets.barFaceStyleByCodomain, i, fv[i]);
            polySideSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barSideStyle, sets.barSideStyleByFields, sets.barSideStyleByCodomain, i, fv[i]);
            polyTopSP.style = ShapeFactory.ShapeStyleTool({
                    stroke: true,
                    strokeColor: "#ffffff",
                    fillColor: "#ee9900"
                },
                sets.barTopStyle, sets.barTopStyleByFields, sets.barTopStyleByCodomain, i, fv[i]);

            // 3d 柱条高亮样式
            sets.barSideHoverStyle = sets.barSideHoverStyle ? sets.barSideHoverStyle : sets.barFaceHoverStyle;
            sets.barTopHoverStyle = sets.barTopHoverStyle ? sets.barTopHoverStyle : sets.barFaceHoverStyle;
            polyFaceSP.highlightStyle = ShapeFactory.ShapeStyleTool({stroke: true}, sets.barFaceHoverStyle);
            polySideSP.highlightStyle = ShapeFactory.ShapeStyleTool({stroke: true}, sets.barSideHoverStyle);
            polyTopSP.highlightStyle = ShapeFactory.ShapeStyleTool({stroke: true}, sets.barTopHoverStyle);

            // 图形携带的数据 id 信息 & 高亮模式
            polyTopSP.refDataID = polySideSP.refDataID = polyFaceSP.refDataID = this.data.FID;
            // hover 模式（组合）
            polyTopSP.isHoverByRefDataID = polySideSP.isHoverByRefDataID = polyFaceSP.isHoverByRefDataID = true;
            // 高亮组(当鼠标 hover 到组内任何一个图形，整个组的图形都会高亮。refDataHoverGroup 在 isHoverByRefDataID 为 true 时有效)
            polyTopSP.refDataHoverGroup = polySideSP.refDataHoverGroup = polyFaceSP.refDataHoverGroup = newGuid();
            // 图形携带的数据信息
            polyTopSP.dataInfo = polySideSP.dataInfo = polyFaceSP.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 3d 柱条顶面、侧面、正面图形 hover click 设置
            if (typeof (sets.barHoverAble) !== "undefined") {
                polyTopSP.hoverable = polySideSP.hoverable = polyFaceSP.hoverable = sets.barHoverAble;
            }
            if (typeof (sets.barClickAble) !== "undefined") {
                polyTopSP.clickable = polySideSP.clickable = polyFaceSP.clickable = sets.barClickAble;
            }

            // 创建3d 柱条的顶面、侧面、正面图形并添加到图表的图形列表数组
            this.shapes.push(this.shapeFactory.createShape(polySideSP));
            this.shapes.push(this.shapeFactory.createShape(polyTopSP));
            this.shapes.push(this.shapeFactory.createShape(polyFaceSP));
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function Zondy.Theme.Bar3D.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性:
     *              xShapeBlank - {Array.<number>} 水平方向上的图形空白间隔参数。
     *              长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，
     *              第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。
     * @returns {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性:
     *                  xPositions - {Array.<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *                  width - {number} 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     */
    calculateXShapeInfo() {
        var dvb = this.dataViewBox;     // 数据视图框
        var sets = this.setting;     // 图表配置对象
        var fvc = this.dataValues.length;      // 数组值个数

        if (fvc < 1) {
            return null;
        }

        var xBlank;        // x 轴空白间隔参数
        var xShapePositions = [];         // x 轴上图形的位置
        var xShapeWidth = 0;          // x 轴上图形宽度(自适应)
        var dvbWidth = this.DVBWidth;            // 数据视图框宽度

        //  x 轴空白间隔参数处理
        if (sets.xShapeBlank && sets.xShapeBlank.length && sets.xShapeBlank.length === 3) {
            xBlank = sets.xShapeBlank;
            var xsLen = dvbWidth - (xBlank[0] + xBlank[2] + (fvc - 1) * xBlank[1])
            if (xsLen <= fvc) {
                return null;
            }
            xShapeWidth = xsLen / fvc
        } else {
            // 默认使用等距离空白间隔，空白间隔为图形宽度
            xShapeWidth = dvbWidth / (2 * fvc + 1);
            xBlank = [xShapeWidth, xShapeWidth, xShapeWidth];
        }

        // 图形 x 轴上的位置计算
        var xOffset = 0;
        for (var i = 0; i < fvc; i++) {
            if (i === 0) {
                xOffset = xBlank[0] + xShapeWidth / 2;
            } else {
                xOffset += (xShapeWidth + xBlank[1]);
            }

            xShapePositions.push(dvb[0] + xOffset);
        }

        return {
            "xPositions": xShapePositions,
            "width": xShapeWidth
        };
    }
}

export {Bar3D};
Zondy.Theme.Bar3D = Bar3D;