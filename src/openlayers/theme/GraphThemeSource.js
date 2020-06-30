import {Zondy} from '../../service/common/Base';
import {ThemeSource} from './ThemeSource';
import {Theme as FeatureTheme} from '../../overlay/feature/Theme';
import {Point2D} from '../../service/common/Point2D';
import {FeatureSet} from '../../service/common/FeatureSet';
import {Rectangle} from '../../service/common/Rectangle';

/**
 * @class Zondy.Source.GraphThemeSource
 * @classdesc 统计专题图图层基类。
 * @param {string} chartsType - 图表类别。
 * @param {string} name - 图层名称。
 * @param {Object} options - 参数。
 * @param {ol.Map} options.map - 当前 Map 对象。
 * @param {string} options.chartsType - 图表类型。目前可用："Bar"，"Bar3D"，"Line"，"Point"，"Pie"，"Ring"。
 * @param {Object} options.chartsSetting - 各类型图表的 chartsSetting 对象可设属性请参考具体图表模型类的注释中对 chartsSetting 对象可设属性的描述。chartsSetting 对象通常都具有以下几个基础可设属性。
 * @param {number} options.chartsSetting.width - 专题要素（图表）宽度。
 * @param {number} options.chartsSetting.height - 专题要素（图表）高度。
 * @param {Array.<number>} options.chartsSetting.codomain - 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @param {number} [options.chartsSetting.XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
 * @param {number} [options.chartsSetting.YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
 * @param {Array.<number>} [options.chartsSetting.dataViewBoxParameter] - 数据视图框 dataViewBox 参数，它是指图表框 chartBox（由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
 * @param {number} [options.chartsSetting.decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 * @param {string} options.themeFields - 指定创建专题图字段。
 * @param {string} [options.id] - 专题图层 ID。
 * @param {number} [options.opacity = 1] - 图层透明度。
 * @param {string} [options.logo] - Logo。
 * @param {ol.proj.Projection} [options.projection] - {@link ol.proj.Projection} 投影信息。
 * @param {number} [options.ratio=1.5] - 视图比, 1 表示画布是地图视口的大小，2 表示地图视口的宽度和高度的两倍，依此类推。必须是 1 或更高。
 * @param {Array.<number>} [options.resolutions] - 分辨率数组。
 * @param {boolean} [options.isOverLay=true] - 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表。
 * @param {ol.source.State} [options.state] - 资源状态。
 * @extends {Zondy.Source.ThemeSource}
 */
class GraphThemeSource extends ThemeSource {

    constructor(name, chartsType, options) {
        super(name, options);
        this.chartsSetting = options.chartsSetting || {};
        this.themeFields = options.themeFields || null;
        this.overlayWeightField = options.overlayWeightField || null;
        this.isOverLay = options.isOverLay || true;
        this.charts = options.charts || [];
        this.cache = options.cache || {};
        this.chartsType = chartsType;
        this.options = {
            calGravity: options.calGravity || true
        }
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        ThemeSource.prototype.destroy.apply(this, arguments);
        this.chartsType = null;
        this.chartsSetting = null;
        this.themeFields = null;
        this.overlayWeightField = null;
        this.isOverLay = null;
        this.options = {fitZoom: -1};
        this.charts = null;
        this.cache = null;
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.setChartsType
     * @description 设置图表类型，此函数可动态改变图表类型。在调用此函数前请通过 chartsSetting 为新类型的图表做相关配置。
     * @param {string} chartsType - 图表类型。目前可用："Bar"，"Bar3D"，"Line"，"Point"，"Pie"，"Ring"。
     */
    setChartsType(chartsType) {
        this.chartsType = chartsType;
        this.redraw();
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.addFeatures
     * @description 向专题图图层中添加数据。
     * @param {Object} features - 待添加的要素。
     */
    addFeatures(features) {
        var me = this;
        this.dispatchEvent({
            type: 'beforefeaturesadded',
            value: {features: features}
        });
        if (features instanceof FeatureSet) {

            var attrs = null;

            var attstruct = features.AttStruct;
            var feaArr = features.SFEleArray;
            if (feaArr != null && feaArr.length > 0) {
                for (var j = 0; j < feaArr.length; j++) {
                    var feature = feaArr[j];
                    if (feature.AttValue != null && feature.AttValue.length > 0) {
                        var attrs = {};
                        for (var i = 0; i < feature.AttValue.length; i++) {
                            attrs[(attstruct.FldName)[i]] = (feature.AttValue)[i];
                        }
                        attrs['FID'] = feature.FID;
                    }
                    feature.attributes = attrs;
                    me.features.push(feature);
                }
            }
        }
        //绘制专题要素
        if (this.renderer) {
            this.changed();
        }
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素。
     *              此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，抽稀，缓存等步骤。
     *              地图漫游时调用此方法进行图层刷新。
     * @param {Object} extent - 重绘的范围。
     *
     */
    redrawThematicFeatures(extent) {
        //清除当前所有可视元素
        this.renderer.clearAll();
        var features = this.features;
        var bounds = new Rectangle(extent[0], extent[1], extent[2], extent[3]);

        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            // 要素范围判断
            var feaBounds = feature.bound;
            //剔除当前视图（地理）范围以外的数据
            if (bounds && !bounds.intersectsBounds(feaBounds)) {
                continue;
            }
            var cache = this.cache;
            // 用 feature id 做缓存标识
            var cacheField = feature.id;
            // 数据对应的图表是否已缓存，没缓存则重新创建图表
            if (cache[cacheField]) {
                continue;
            }
            cache[cacheField] = cacheField;
            var chart = this.createThematicFeature(feature);
            // 压盖处理权重值
            if (chart && this.overlayWeightField) {
                if (feature.attributes[this.overlayWeightField] && !isNaN(feature.attributes[this.overlayWeightField])) {
                    chart["__overlayWeight"] = feature.attributes[this.overlayWeightField];
                }
            }
            if (chart) {
                this.charts.push(chart);
            }
        }
        this.drawCharts();
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.createThematicFeature
     * @description 向专题图图层中添加数据, 支持的 feature 类型为：iServer 返回的 feature JSON 对象。
     * @param {Object} feature - 待添加的要素。
     *
     */
    createThematicFeature(feature) {
        var thematicFeature;
        // 检查图表创建条件并创建图形
        if (FeatureTheme[this.chartsType] && this.themeFields && this.chartsSetting) {
            thematicFeature = new FeatureTheme[this.chartsType](feature, this, this.themeFields, this.chartsSetting, null, this.options);
        }
        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false;
        }
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.drawCharts
     * @description 绘制图表。包含压盖处理。
     *
     */
    drawCharts() {
        // 判断 rendere r就绪
        if (!this.renderer) {
            return;
        }
        var charts = this.charts;
        // 图表权重值处理
        if (this.overlayWeightField) {
            charts.sort(function (cs, ce) {
                if (typeof (cs["__overlayWeight"]) == "undefined" && typeof (ce["__overlayWeight"]) == "undefined") {
                    return 0;
                } else if (typeof (cs["__overlayWeight"]) != "undefined" && typeof (ce["__overlayWeight"]) == "undefined") {
                    return -1;
                } else if (typeof (cs["__overlayWeight"]) == "undefined" && typeof (ce["__overlayWeight"]) != "undefined") {
                    return 1;
                } else if (typeof (cs["__overlayWeight"]) != "undefined" && typeof (ce["__overlayWeight"]) != "undefined") {
                    if (parseFloat(cs["__overlayWeight"]) < parseFloat(ce["__overlayWeight"])) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
                return 0;
            });
        }
        // 不进行避让
        if (!this.isOverLay) {
            for (var m = 0, len_m = charts.length; m < len_m; m++) {
                var chart_m = charts[m];
                // 图形参考位置  (reSetLocation 会更新 chartBounds)
                var shapeROP_m = chart_m.resetLocation();
                // 添加图形
                var shapes_m = chart_m.shapes;
                for (var n = 0, slen_n = shapes_m.length; n < slen_n; n++) {
                    shapes_m[n].refOriginalPosition = shapeROP_m;
                    this.renderer.addShape(shapes_m[n]);
                }
            }
        } else {
            // 压盖判断所需 chartsBounds 集合
            var chartsBounds = [];
            var mapBounds = this.map.getView().calculateExtent();
            // 获取地图像素 bounds
            var mapPxLT = this.getLocalXY([mapBounds[0], mapBounds[3]]);
            var mapPxRB = this.getLocalXY([mapBounds[2], mapBounds[1]]);
            var mBounds = new Rectangle();
            mBounds.xmin = Math.min(parseFloat(mapPxLT[0]), parseFloat(mapPxRB[0]));
            mBounds.xmax = Math.max(parseFloat(mapPxLT[0]), parseFloat(mapPxRB[0]));
            mBounds.ymin = Math.min(parseFloat(mapPxLT[1]), parseFloat(mapPxRB[1]));
            mBounds.ymax = Math.max(parseFloat(mapPxLT[1]), parseFloat(mapPxRB[1]));
            // 压盖处理 & 添加图形
            for (var i = 0, len = charts.length; i < len; i++) {
                var chart = charts[i];
                // 图形参考位置  (reSetLocation 会更新 chartBounds)
                var shapeROP = chart.resetLocation();
                // 图表框
                var cbs = chart.chartBounds;
                var cBounds = [{
                    "x": cbs.xmin,
                    "y": cbs.ymin
                }, {
                    "x": cbs.xmin,
                    "y": cbs.ymax
                }, {
                    "x": cbs.xmax,
                    "y": cbs.ymax
                }, {
                    "x": cbs.xmax,
                    "y": cbs.ymin
                }, {
                    "x": cbs.xmin,
                    "y": cbs.ymin
                }];
                // 地图范围外不绘制
                if (mBounds) {
                    if (!this.isChartInMap(mBounds, cBounds)) {
                        continue;
                    }
                }
                // 是否压盖
                var isOL = false;
                if (i !== 0) {
                    for (let j = 0; j < chartsBounds.length; j++) {
                        //压盖判断
                        if (this.isQuadrilateralOverLap(cBounds, chartsBounds[j])) {
                            isOL = true;
                            break;
                        }
                    }
                }
                if (isOL) {
                    continue;
                } else {
                    chartsBounds.push(cBounds);
                }
                // 添加图形
                var shapes = chart.shapes;
                for (let j = 0, slen = shapes.length; j < slen; j++) {
                    shapes[j].refOriginalPosition = shapeROP;
                    this.renderer.addShape(shapes[j]);
                }
            }
        }
        // 绘制图形
        this.renderer.render();
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.getShapesByFeatureID
     * @description  通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @param {number} featureID - 要素 ID。
     */
    getShapesByFeatureID(featureID) {
        var list = [];
        var shapeList = this.renderer.getAllShapes();
        if (!featureID) {
            return shapeList
        }
        for (var i = 0, len = shapeList.length; i < len; i++) {
            var si = shapeList[i];
            if (si.refDataID && featureID === si.refDataID) {
                list.push(si);
            }
        }
        return list;
    }

    /**
     * @function Zondy.Source.GraphThemeSource.isQuadrilateralOverLap
     * @description  判断两个四边形是否有压盖。
     * @param {Array.<Object>} quadrilateral - 四边形节点数组。
     * @param {Array.<Object>} quadrilateral2 - 第二个四边形节点数组。
     */
    isQuadrilateralOverLap(quadrilateral, quadrilateral2) {
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if (quadLen !== 5 || quad2Len !== 5) {
            return null;
        } //不是四边形

        var OverLap = false;
        //如果两四边形互不包含对方的节点，则两个四边形不相交
        for (let i = 0; i < quadLen; i++) {
            if (this.isPointInPoly(quadrilateral[i], quadrilateral2)) {
                OverLap = true;
                break;
            }
        }
        for (let i = 0; i < quad2Len; i++) {
            if (this.isPointInPoly(quadrilateral2[i], quadrilateral)) {
                OverLap = true;
                break;
            }
        }
        //加上两矩形十字相交的情况
        for (let i = 0; i < quadLen - 1; i++) {
            if (OverLap) {
                break;
            }
            for (let j = 0; j < quad2Len - 1; j++) {
                var isLineIn = this.lineIntersection(quadrilateral[i], quadrilateral[i + 1], quadrilateral2[j], quadrilateral2[j + 1]);
                if (isLineIn.CLASS_NAME === "Zondy.Object.Point2D") {
                    OverLap = true;
                    break;
                }
            }
        }
        return OverLap;
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.lineIntersection
     * @description 判断两条线段是不是有交点。
     * @param a1 - {Zondy.Geometry.Point}  第一条线段的起始节点。
     * @param a2 - {Zondy.Geometry.Point}  第一条线段的结束节点。
     * @param b1 - {Zondy.Geometry.Point}  第二条线段的起始节点。
     * @param b2 - {Zondy.Geometry.Point}  第二条线段的结束节点。
     * @return {Object} 如果相交返回交点，如果不相交返回两条线段的位置关系。
     */
    lineIntersection(a1, a2, b1, b2) {
        var intersectValue = null;
        var k1;
        var k2;
        var b = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
        var a = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
        var ab = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
        //ab==0代表两条线断的斜率一样
        if (ab !== 0) {
            k1 = b / ab;
            k2 = a / ab;

            if (k1 >= 0 && k2 <= 1 && k1 <= 1 && k2 >= 0) {
                intersectValue = new Point2D(a1.x + k1 * (a2.x - a1.x), a1.y + k1 * (a2.y - a1.y));
            } else {
                intersectValue = "No Intersection";
            }
        } else {

            if (b === 0 && a === 0) {
                var maxy = Math.max(a1.y, a2.y);
                var miny = Math.min(a1.y, a2.y);
                var maxx = Math.max(a1.x, a2.x);
                var minx = Math.min(a1.x, a2.x);
                if (((b1.y >= miny && b1.y <= maxy) || (b2.y >= miny && b2.y <= maxy)) &&
                    (b1.x >= minx && b1.x <= maxx) || (b2.x >= minx && b2.x <= maxx)) {
                    intersectValue = "Coincident";//重合
                } else {
                    intersectValue = "Parallel";//平行
                }

            } else {
                intersectValue = "Parallel";//平行
            }
        }
        return intersectValue;
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.isPointInPoly
     * @description  判断一个点是否在多边形里面。（射线法）。
     * @param {Object} pt - 需要判定的点对象，该对象含有属性 x（横坐标），属性 y（纵坐标）。
     * @param {Array.<Object>} poly - 多边形节点数组。
     */
    isPointInPoly(pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y)) &&
            (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x) &&
            (isIn = !isIn);
        }
        return isIn;
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.isChartInMap
     * @description  判断图表是否在地图里。
     * @param {Zondy.Bounds} mapPxBounds - 地图像素范围。
     * @param {Array.<Object>} chartPxBounds - 图表范围的四边形节点数组。
     */
    isChartInMap(mapPxBounds, chartPxBounds) {
        var mb = mapPxBounds;
        var isIn = false;
        for (var i = 0, len = chartPxBounds.length; i < len; i++) {
            var cb = chartPxBounds[i];

            if (cb.x >= mb.xmin && cb.x <= mb.xmax && cb.y >= mb.ymin && cb.y <= mb.ymax) {
                isIn = true;
                break;
            }
        }
        return isIn;
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.clearCache
     * @description  清除缓存。
     */
    clearCache() {
        this.cache = {};
        this.charts = [];
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.removeFeatures
     * @description  从专题图中删除 feature。这个函数删除所有传递进来的矢量要素。参数中的 features 数组中的每一项，必须是已经添加到当前图层中的 feature。
     * @param {Zondy.Feature.Vector} features - 要删除的要素。
     */
    removeFeatures(features) {
        this.clearCache();
        super.removeFeatures(features);
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.removeAllFeatures
     * @description  移除所有的要素
     */
    removeAllFeatures() {
        this.clearCache();
        super.removeAllFeatures();
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.redraw
     * @description  重绘该图层
     */
    redraw() {
        this.clearCache();
        if (this.renderer) {
            this.redrawThematicFeatures(this.map.getView().calculateExtent());
            return true;
        }
        return false
    }

    /**
     * @function Zondy.Source.GraphThemeSource.prototype.clear
     * @description  清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear() {
        if (this.renderer) {
            this.renderer.clearAll();
            this.renderer.refresh();
        }
        this.removeAllFeatures();
        this.clearCache();
    }

    canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
        return ThemeSource.prototype.canvasFunctionInternal_.apply(this, arguments);
    }
}

export {GraphThemeSource};
Zondy.Source.GraphThemeSource = GraphThemeSource;