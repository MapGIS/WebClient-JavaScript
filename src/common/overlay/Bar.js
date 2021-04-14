import {Zondy} from '../../service/common/Base';
import {copyAttributesWithClip} from '../../service/common/Util';
import {ShapeFactory} from './feature/ShapeFactory';
import {Polygon as FeaturePolygon} from './feature/Polygon';
import {Color} from './levelRender/Color';
import {Graph} from './Graph';

/**
 * @private
 * @class Zondy.Theme.Bar
 * @classdesc 柱状图 。
 * @example
 * // barStyleByCodomain参数用法如下：
 * // barStyleByCodomain 的每个元素是个包含值域信息和与值域对应样式信息的对象，该对象（必须）有三个属性：
 * // start: 值域值下限（包含）;
 * // end: 值域值上限（不包含）;
 * // style: 数据可视化图形的 style，这个样式对象的可设属性： <Zondy.Feature.ShapeParameters.Polygon.style> 。
 * // barStyleByCodomain 数组形如：
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
 * @extends Zondy.Feature.Theme.Graph
 * @param {Zondy.Feature.Vector} data - 用户数据。
 * @param {Zondy.Layer.Graph} layer - 此专题要素所在图层。
 * @param {Array.<string>} fields - data 属性中的参与此图表生成的属性字段名称。
 * @param {Zondy.Theme.Bar.setting} setting - 图表配置对象。
 * @param {Zondy.LonLat} [lonlat] - 专题要素地理位置。默认为 data 指代的地理要素 Bounds 中心。
 *
 * @typedef {Object} Zondy.Theme.Bar.setting
 * @property {number} width - 专题要素（图表）宽度。
 * @property {number} height - 专题要素（图表）高度。
 * @property {Array.<number>} codomain - 图表允许展示的数据值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @property {number} [XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
 * @property {number} [YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
 * @property {Array.<number>} [dataViewBoxParameter] - 数据视图框 dataViewBox 参数，它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）
 *                                                     在左、下，右，上四个方向上的内偏距值。当使用坐标轴时 dataViewBoxParameter 的默认值为：[45, 15, 15, 15]；
 *                                                     不使用坐标轴时 dataViewBoxParameter 的默认值为：[5, 5, 5, 5]。
 * @property {number} [decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @property {boolean} [useBackground=true] - 是否使用图表背景框。
 * @property {Zondy.Feature.ShapeParameters.Rectangle.style} [backgroundStyle] - 背景样式。
 * @property {Array.<number>} [backgroundRadius=[0, 0, 0, 0]] - 背景框矩形圆角半径，可以用数组分别指定四个角的圆角半径，设：左上、右上、右下、左下角的半径依次为 r1、r2、r3、r4 ,
 *                                         则 backgroundRadius 为 [r1、r2、r3、r4]。
 * @property {Array.<number>} xShapeBlank - 水平方向上的图形空白间隔参数。长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，
 *                                            第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。
 * @property {boolean} [showShadow=true] - 阴影开关。
 * @property {Object} [barShadowStyle] - 阴影样式,如：{shadowBlur : 8, shadowOffsetX: 2 , shadowOffsetY : 2,shadowColor : "rgba(100,100,100,0.8)"}
 * @property {Array.<string>} [barLinearGradient] - 按字段设置柱条样式[渐变开始颜色,渐变终止颜色]  与 themeLayer.themeFields 中的字段一一对应），
 *                                                  如：[["#00FF00","#00CD00"],["#00CCFF","#5E87A2"],["#00FF66","#669985"],["#CCFF00","#94A25E"],["#FF9900","#A2945E"]]
 * @property {boolean} [useAxis=true] - 是否使用坐标轴。</br>
 * @property {Zondy.Feature.ShapeParameters.Line.style} [axisStyle] - 坐标轴样式。
 * @property {boolean} [axisUseArrow=false] - 坐标轴是否使用箭头。
 * @property {number} [axisYTick=0] - y 轴刻度数量。
 * @property {Array.<string>}  [axisYLabels] - y 轴上的标签组内容，标签顺序沿着数据视图框左面条边自上而下，等距排布。例如：["1000", "750", "500", "250", "0"]。
 * @property {Zondy.Feature.ShapeParameters.Label.style} [axisYLabelsStyle] - y 轴上的标签组样式。
 * @property {Array.<number>} [axisYLabelsOffset=[0,0]] - y 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 y 轴标签组横向上的偏移量，向左为正；数组第二项表示 y 轴标签组纵向上的偏移量，向下为正。
 * @property {Array.<string>}  [axisXLabels] - x 轴上的标签组内容，标签顺序沿着数据视图框下面条边自左向右排布，例如：["92年", "95年", "99年"]。标签排布规则：当标签数量与 xShapeInfo 中的属性 xShapeCenter 数量相同（即标签个数与数据个数相等时）, 按照 xShapeCenter 提供的位置排布标签,否则沿数据视图框下面条边等距排布标签。
 * @property {Zondy.Feature.ShapeParameters.Label.style} [axisXLabelsStyle] - x 轴上的标签组样式。
 * @property {Array.<number>} [axisXLabelsOffset=[0,0]] - x 轴上的标签组偏移量。长度为 2 的数组，数组第一项表示 x 轴标签组横向上的偏移量，向左为正；数组第二项表示 x 轴标签组纵向上的偏移量，向下为正。
 * @property {boolean} [useXReferenceLine] - 是否使用水平参考线，如果为 true，在 axisYTick 大于 0 时有效，水平参考线是 y 轴刻度在数据视图框里的延伸。
 * @property {Zondy.Feature.ShapeParameters.Line.style} xReferenceLineStyle - 水平参考线样式。
 * @property {Object} barStyle - 柱状图柱条基础 style，此参数控制柱条基础样式，优先级低于 barStyleByFields 和 barStyleByCodomain。
 * @property {Array.<Zondy.Feature.ShapeParameters.Polygon.style>} barStyleByFields - 按专题字段 themeFields（<Zondy.Layer.Graph.themeFields|L.Zondy.graphThemeLayer.themeFields|ol.source.Graph.themeFields|mapboxgl.Zondy.GraphThemeLayer.themeFields>）为柱条赋 style，此参数按字段控制柱条样式，优先级低于 barStyleByCodomain，高于 barStyle。此数组中的元素是样式对象。此参数中的 style 与 themeFields 中的字段一一对应 。例如： themeFields（<Zondy.Layer.Graph.themeFields>） 为 ["POP_1992", "POP_1995", "POP_1999"],barStyleByFields 为[style1, style2, style3]，则在图表中，字段 POP_1992 对应的柱条使用 style1，字段 POP_1995 对应的柱条使用 style2 ，字段 POP_1999 对应的柱条使用 style3。
 * @property {Array.<Zondy.Feature.ShapeParameters.Polygon.style>} barStyleByCodomain - 按柱条代表的数据值所在值域范围控制柱条样式，优先级高于 barStyle 和 barStyleByFields。
 * @property {Object} [barHoverStyle] - 柱条 hover 状态时的样式，barHoverAble 为 true 时有效。
 * @property {Object} [barHoverAble] - 是否允许柱条使用 hover 状态，默认允许。同时设置 barHoverAble 和 barClickAble 为 false，可以直接屏蔽柱条对专题图层事件的响应。
 * @property {Object} [barClickAble] - 是否允许柱条被点击，默认允许。同时设置 barHoverAble 和 barClickAble 为 false，可以直接屏蔽柱条对专题图层事件的响应。
 */
class Bar extends Graph {

    constructor(data, layer, fields, setting, lonlat, option) {
        super(data, layer, fields, setting, lonlat, option);
        this.CLASS_NAME = "Zondy.Theme.Bar";
    }

    /**
     * @function Zondy.Theme.Bar.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function Zondy.Theme.Bar.prototype.assembleShapes
     * @description 图表图形装配函数。
     */
    assembleShapes() {
        //默认渐变颜色数组
        var deafaultColors = [["#00FF00", "#00CD00"], ["#00CCFF", "#5E87A2"], ["#00FF66", "#669985"], ["#CCFF00", "#94A25E"], ["#FF9900", "#A2945E"]];

        //默认阴影
        var deafaultShawdow = {
            showShadow: true,
            shadowBlur: 8,
            shadowColor: "rgba(100,100,100,0.8)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
        };

        // 图表配置对象
        var sets = this.setting;

        if (!sets.barLinearGradient) {
            sets.barLinearGradient = deafaultColors;
        }

        // 默认数据视图框
        if (!sets.dataViewBoxParameter) {
            if (typeof (sets.useAxis) === "undefined" || sets.useAxis) {
                sets.dataViewBoxParameter = [45, 15, 15, 15];
            } else {
                sets.dataViewBoxParameter = [5, 5, 5, 5];
            }
        }

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

        // 背景框，默认启用
        if (typeof (sets.useBackground) === "undefined" || sets.useBackground) {
            // 将背景框图形添加到模型的 shapes 数组，注意添加顺序，后添加的图形在先添加的图形之上。
            this.shapes.push(ShapeFactory.Background(this.shapeFactory, this.chartBox, sets));
        }

        // 坐标轴, 默认启用
        if (typeof (sets.useAxis) === "undefined" || sets.useAxis) {
            // 添加坐标轴图形数组
            this.shapes = this.shapes.concat(ShapeFactory.GraphAxis(this.shapeFactory, dvb, sets, xShapeInfo));
        }

        for (var i = 0; i < fv.length; i++) {
            // 计算柱条 top 边的 y 轴坐标值
            var yPx = dvb[1] - (fv[i] - codomain[0]) / this.DVBUnitValue;

            // 柱条节点数组
            var poiLists = [
                [xsLoc[i] - xsWdith / 2, dvb[1] - 1],
                [xsLoc[i] + xsWdith / 2, dvb[1] - 1],
                [xsLoc[i] + xsWdith / 2, yPx],
                [xsLoc[i] - xsWdith / 2, yPx]
            ];

            // 柱条参数对象（一个面参数对象）
            var barParams = new FeaturePolygon(poiLists);

            // 柱条 阴影 style
            if (typeof (sets.showShadow) === "undefined" || sets.showShadow) {
                if (sets.barShadowStyle) {
                    var sss = sets.barShadowStyle;
                    if (sss.shadowBlur) {
                        deafaultShawdow.shadowBlur = sss.shadowBlur;
                    }
                    if (sss.shadowColor) {
                        deafaultShawdow.shadowColor = sss.shadowColor;
                    }
                    if (sss.shadowOffsetX) {
                        deafaultShawdow.shadowOffsetX = sss.shadowOffsetX;
                    }
                    if (sss.shadowOffsetY) {
                        deafaultShawdow.shadowOffsetY = sss.shadowOffsetY;
                    }
                }
                barParams.style = {};
                copyAttributesWithClip(barParams.style, deafaultShawdow);
            }

            // 图形携带的数据信息
            barParams.refDataID = this.data.FID;
            barParams.dataInfo = {
                field: this.fields[i],
                value: fv[i]
            };

            // 柱条 hover click
            if (typeof (sets.barHoverAble) !== "undefined") {
                barParams.hoverable = sets.barHoverAble;
            }
            if (typeof (sets.barClickAble) !== "undefined") {
                barParams.clickable = sets.barClickAble;
            }

            // 创建柱条并添加到图表图形数组中
            this.shapes.push(this.shapeFactory.createShape(barParams));
        }

        // 重要步骤：将图形转为由相对坐标表示的图形，以便在地图平移缩放过程中快速重绘图形
        // （统计专题图模块从结构上要求使用相对坐标，assembleShapes() 函数必须在图形装配完成后调用 shapesConvertToRelativeCoordinate() 函数）
        this.shapesConvertToRelativeCoordinate();
    }

    /**
     * @function Zondy.Theme.Bar.prototype.calculateXShapeInfo
     * @description 计算 X 轴方向上的图形信息，此信息是一个对象，包含两个属性，
     *              属性 xPositions 是一个一维数组，该数组元素表示图形在 x 轴方向上的像素坐标值，
     *              如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *              width 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *              本函数中图形配置对象 setting 可设属性：
     *              xShapeBlank - {Array.<number>} 水平方向上的图形空白间隔参数。
     *              长度为 3 的数组，第一元素表示第一个图形左端与数据视图框左端的空白间距，第二个元素表示图形间空白间距，
     *              第三个元素表示最后一个图形右端与数据视图框右端端的空白间距 。
     * @returns {Object} 如果计算失败，返回 null；如果计算成功，返回 X 轴方向上的图形信息，此信息是一个对象，包含以下两个属性：
     *         xPositions - {Array.<number>} 表示图形在 x 轴方向上的像素坐标值，如果图形在 x 方向上有一定宽度，通常取图形在 x 方向上的中心点为图形在 x 方向上的坐标值。
     *         width - {number} 表示图形的宽度（特别注意：点的宽度始终为 0，而不是其直径）。
     *
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
            var xsLen = dvbWidth - (xBlank[0] + xBlank[2] + (fvc - 1) * xBlank[1]);
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

    /**
     * @function Zondy.Theme.Bar.prototype.resetLinearGradient
     * @description 图表的相对坐标存在的时候，重新计算渐变的颜色(目前用于二维柱状图 所以子类实现此方法)。
     */
    resetLinearGradient() {
        if (this.RelativeCoordinate) {
            var shpelength = this.shapes.length;
            var barLinearGradient = this.setting.barLinearGradient;
            var index = -1;
            for (var i = 0; i < shpelength; i++) {
                var shape = this.shapes[i];
                if (shape.CLASS_NAME === "Zondy.LevelRenderer.Shape.SmicPolygon") {
                    var style = shape.style;
                    //计算出当前的绝对 x y
                    var x1 = this.location[0] + style.pointList[0][0];
                    var x2 = this.location[0] + style.pointList[1][0];

                    //渐变颜色
                    index++;
                    //以防定义的颜色数组不够用
                    if (index >= barLinearGradient.length) {
                        index = index % barLinearGradient.length;
                    }
                    var color1 = barLinearGradient[index][0];
                    var color2 = barLinearGradient[index][1];

                    //颜色
                    var zcolor = new Color();
                    var linearGradient = zcolor.getLinearGradient(x1, 0, x2, 0,
                        [[0, color1], [1, color2]]);

                    //赋值
                    shape.style.color = linearGradient;
                }
            }
        }
    }
}

export {Bar};
Zondy.Theme.Bar = Bar;