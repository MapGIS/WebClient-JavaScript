import {Zondy} from '../../service/common/Base';
import {L} from 'leaflet';
import {ThemeLayer} from './ThemeLayer';
import {FeatureSet} from '../../service/common/FeatureSet';
import {Theme as FeatureTheme} from '../../overlay/feature/Theme';
import {Rectangle} from '../../service/common/Rectangle';
import {Point2D} from '../../service/common/Point2D';

/**
 * @class Zondy.map.graphThemeLayer
 * @classdesc 统计专题图图层。
 * @extends Zondy.map.ThemeLayer
 * @description 统计专题图通过为每个要素绘制统计图表来反映其对应的专题值的大小。它可同时表示多个字段属性信息，在区域本身与各区域之间形成横向和纵向的对比。<br>统计专题图多用于具有相关数量特征的地图上，比如表示不同地区多年的粮食产量、GDP、人口等，不同时段客运量、地铁流量等。目前提供的统计图类型有：柱状图（Bar），折线图（Line），饼图（Pie），三维柱状图（Bar3D），点状图（Point），环状图（Ring）。
 * @param {string} name - 专题图表名称。
 * @param {string} chartsType - 图表类型。目前可用："Bar"，"Bar3D"，"Line"，"Point"，"Pie"，"Ring"。
 * @param {Object} options - 待设置的参数。
 * @param {boolean} [options.isOverLay=true] - 是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表。
 * @param {string} options.themeFields - 指定创建专题图字段。
 * @param {Object} [options.cache] - 缓存。
 * @param {Object} [options.charts] - 图表。
 * @param {string} [options.id] - 专题图层 ID。默认使用 CommonUtil.createUniqueID("themeLayer_") 创建专题图层 ID。
 * @param {number} [options.opacity=1] - 图层透明度。
 * @param {Object} options.chartsSetting - 各类型图表的 chartsSetting 对象可设属性请参考具体图表模型类的注释中对 chartsSetting 对象可设属性的描述。chartsSetting 对象通常都具有以下 5 个基础可设属性:</br>
 * @param {number} options.chartsSetting.width - 专题要素（图表）宽度。
 * @param {number} options.chartsSetting.height - 专题要素（图表）高度。
 * @param {Array.<number>} options.chartsSetting.codomain - 值域，长度为 2 的一维数组，第一个元素表示值域下限，第二个元素表示值域上限。
 * @param {number} [options.chartsSetting.XOffset] - 专题要素（图表）在 X 方向上的偏移值，单位像素。
 * @param {number} [options.chartsSetting.YOffset] - 专题要素（图表）在 Y 方向上的偏移值，单位像素。
 * @param {Array.<number>} [options.chartsSetting.dataViewBoxParameter] - 数据视图框 dataViewBox 参数，它是指图表框 chartBox （由图表位置、图表宽度、图表高度构成的图表范围框）在左、下，右，上四个方向上的内偏距值，长度为 4 的一维数组。
 * @param {number} [options.chartsSetting.decimalNumber] - 数据值数组 dataValues 元素值小数位数，数据的小数位处理参数，取值范围：[0, 16]。如果不设置此参数，在取数据值时不对数据做小数位处理。
 */
var GraphThemeLayer = ThemeLayer.extend({

    options: {
        //是否进行压盖处理，如果设为 true，图表绘制过程中将隐藏对已在图层中绘制的图表产生压盖的图表,默认值：true。
        isOverLay: true
    },

    /**
     * @function Zondy.Map.GraphThemeLayer.prototype.initialize
     * @description 初始化。
     * @param {string} name - 专题图名。
     * @param {string} chartsType - 图表类型。目前可用："Bar"，"Bar3D"，"Line"，"Point"，"Pie"，"Ring"。
     * @param {Object} options - 需要设置的参数对象。
     */
    initialize: function (name, chartsType, options) {
        var newArgs = [];
        newArgs.push(name);
        newArgs.push(options);
        ThemeLayer.prototype.initialize.apply(this, newArgs);
        this.chartsType = chartsType;
        this.themeFields = options && options.themeFields ? options.themeFields : null;
        this.charts = options && options.charts ? options.charts : [];
        this.cache = options && options.cache ? options.cache : {};
        this.chartsSetting = options && options.chartsSetting ? options.chartsSetting : {};
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.setChartsType
     * @description 设置图表类型，此函数可动态改变图表类型。在调用此函数前请通过 chartsSetting 为新类型的图表做相关配置。图表类型，目前支持："Bar", "Bar3D", "Line","Point","Pie","Ring"。
     * @param {string} chartsType - 图表类型。目前可用："Bar", "Bar3D", "Line","Point","Pie","Ring"。
     */
    setChartsType: function (chartsType) {
        this.chartsType = chartsType;
        this.redraw();
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.addFeatures
     * @description 向专题图图层中添加数据。
     * @param {L.features} features - 待添加的要素。
     */
    addFeatures: function (features) {
        var me = this;
        /**
         * @event Zondy.map.graphThemeLayer#beforefeaturesadded
         * @description 向专题图图层中添加数据之前触发。
         * @property {L.features} features  - 待添加的要素。
         */
        me.fire("beforefeaturesadded", {features: features});
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
        if (!me.renderer) {
            return;
        }

        if (me._map) {
            me.redrawThematicFeatures(me._map.getBounds());
        } else {
            me.redrawThematicFeatures();
        }

    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.redrawThematicFeatures
     * @description 重绘所有专题要素 此方法包含绘制专题要素的所有步骤，包含用户数据到专题要素的转换，压盖处理，缓存等步骤。地图漫游时调用此方法进行图层刷新。
     * @param {L.bounds} bounds - 重绘的范围。
     */
    redrawThematicFeatures: function (bounds) {
        var me = this;
        //清除当前所有可视元素
        me.renderer.clearAll();
        var features = me.features;
        if (bounds && bounds instanceof window.L.LatLngBounds) {
            var crs = this._map.options.crs;
            bounds = window.L.bounds(crs.project(bounds.getSouthWest()), crs.project(bounds.getNorthEast()));
            bounds = new Rectangle(bounds.min.x, bounds.min.y, bounds.max.x, bounds.max.y);
        }
        for (var i = 0, len = features.length; i < len; i++) {
            var feature = features[i];
            // 要素范围判断
            var feaBounds = feature.bound;
            //剔除当前视图（地理）范围以外的数据
            if (bounds && !bounds.intersectsBounds(feaBounds)) {
                continue;
            }
            var cache = me.cache;
            // 用feature id 做缓存标识
            var cacheField = feature.FID;
            // 数据对应的图表是否已缓存，没缓存则重新创建图表
            if (!cache[cacheField]) {
                cache[cacheField] = cacheField;
                var chart = me.createThematicFeature(feature);
                // 压盖处理权重值
                var isValidOverlayWeightField = me.overlayWeightField
                    && feature.attributes[me.overlayWeightField]
                    && !isNaN(feature.attributes[me.overlayWeightField]);
                if (chart && isValidOverlayWeightField) {
                    chart["__overlayWeight"] = feature.attributes[me.overlayWeightField];
                }

                if (chart) {
                    me.charts.push(chart);
                }
            }
        }
        me.drawCharts();
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.createThematicFeature
     * @description 创建专题要素（图表）。
     * @param {Zondy.Feature} feature - 待创建的要素。
     */
    createThematicFeature: function (feature) {
        var me = this;
        var thematicFeature;
        // 检查图表创建条件并创建图形
        if (FeatureTheme[me.chartsType] && me.themeFields && me.chartsSetting) {
            thematicFeature = new FeatureTheme[me.chartsType](feature, me, me.themeFields, me.chartsSetting, null, me.options);
        }

        // thematicFeature 是否创建成功
        if (!thematicFeature) {
            return false
        }
        // 对专题要素执行图形装载
        thematicFeature.assembleShapes();
        return thematicFeature;
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.drawCharts
     * @description 绘制图表。包含压盖处理。
     */
    drawCharts: function () {
        var me = this;
        if (!me.renderer) {
            return;
        }

        // 图表权重值处理
        if (me.overlayWeightField) {
            me._sortChart();
        }

        if (me.options && !me.options.isOverLay) {
            // 不进行避让
            me._addOverlayShape();
        } else {
            //进行避让
            me._addNoOverlayShape();
        }
        // 绘制图形
        me.renderer.render();
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.getShapesByFeatureID
     * @description 通过 FeatureID 获取 feature 关联的所有图形。如果不传入此参数，函数将返回所有图形。
     * @param {number} featureID - 要素 ID。
     */
    getShapesByFeatureID: function (featureID) {
        var me = this,
            list = [];
        var shapeList = me.renderer.getAllShapes();

        if (!featureID) {
            return shapeList;
        }

        for (var i = 0, len = shapeList.length; i < len; i++) {
            var si = shapeList[i];
            if (si.refDataID && featureID === si.refDataID) {
                list.push(si);
            }
        }
        return list;
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.isQuadrilateralOverLap
     * @description 判断两个四边形是否有压盖。
     * @param {Array.<Object>} rect1 - 四边形节点数组。
     * @example
     * [{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}];
     * @param {Array.<Object>} rect2 - 第二个四边形节点数组。
     */
    isQuadrilateralOverLap: function (rect1, rect2) {

        var quadrilateral = [{
            "x": rect1.xmin,
            "y": rect1.ymin
        },
            {
                "x": rect1.xmax,
                "y": rect1.ymin
            },
            {
                "x": rect1.xmax,
                "y": rect1.ymax
            },
            {
                "x": rect1.xmin,
                "y": rect1.ymax
            }];
        var quadrilateral2 = [{
            "x": rect2.xmin,
            "y": rect2.ymin
        },
            {
                "x": rect2.xmax,
                "y": rect2.ymin
            },
            {
                "x": rect2.xmax,
                "y": rect2.ymax
            },
            {
                "x": rect2.xmin,
                "y": rect2.ymax
            }];
        var me = this;
        var quadLen = quadrilateral.length,
            quad2Len = quadrilateral2.length;
        if (quadLen !== 4 || quad2Len !== 4) {
            return null;
        }//不是四边形

        var OverLap = false;
        //如果两四边形互不包含对方的节点，则两个四边形不相交
        for (var i = 0; i < quadLen; i++) {
            if (me.isPointInPoly(quadrilateral[i], quadrilateral2)) {
                OverLap = true;
                break;
            }
        }
        for (let i = 0; i < quad2Len; i++) {
            if (me.isPointInPoly(quadrilateral2[i], quadrilateral)) {
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
                var isLineIn = me.lineIntersection(quadrilateral[i], quadrilateral[i + 1], quadrilateral2[j], quadrilateral2[j + 1]);
                if (isLineIn.CLASS_NAME === "Zondy.Object.Point2D") {
                    OverLap = true;
                    break;
                }
            }
        }

        return OverLap;
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.lineIntersection
     * @description 判断两条线段是不是有交点。
     * @param a1 - {Zondy.Geometry.Point}  第一条线段的起始节点。
     * @param a2 - {Zondy.Geometry.Point}  第一条线段的结束节点。
     * @param b1 - {Zondy.Geometry.Point}  第二条线段的起始节点。
     * @param b2 - {Zondy.Geometry.Point}  第二条线段的结束节点。
     * @return {Object} 如果相交返回交点，如果不相交返回两条线段的位置关系。
     */
    lineIntersection: function (a1, a2, b1, b2) {
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
    },
    /**
     * @function Zondy.map.graphThemeLayer.prototype.isPointInPoly
     * @description 判断一个点是否在多边形里面。(射线法)
     * @param pt - {Object} 需要判定的点对象，该对象含有属性x(横坐标)，属性y(纵坐标)。
     * @param poly - {Array<Object>}  多边形节点数组。<br>
     *        例如一个四边形：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]
     */
    isPointInPoly: function (pt, poly) {
        for (var isIn = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i) {
            ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
            && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
            && (isIn = !isIn);
        }
        return isIn;
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.isChartInMap
     * @description 判断图表是否在地图里。
     * @param {Zondy.Bounds} mapPxBounds - 地图像素范围。
     * @param {Array.<Object>} chartPxBounds - 图表范围的四边形节点数组。
     *        例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    isChartInMap: function (mapPxBounds, chartPxBounds) {
        var mb = mapPxBounds;

        var isIn = false;

        var cBounds = [
            {
                "x": chartPxBounds.xmin,
                "y": chartPxBounds.ymin
            },
            {
                "x": chartPxBounds.xmax,
                "y": chartPxBounds.ymin
            },
            {
                "x": chartPxBounds.xmax,
                "y": chartPxBounds.ymax
            },
            {
                "x": chartPxBounds.xmin,
                "y": chartPxBounds.ymax
            }
        ];


        for (var i = 0, len = cBounds.length; i < len; i++) {
            var cb = cBounds[i];
            if (cb.x >= mb.xmin && cb.x <= mb.xmax && cb.y >= mb.ymin && cb.y <= mb.ymax) {
                isIn = true;
                break;
            }
        }

        return isIn;
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.clearCache
     * @description 判断图表是否大小合适，超过地图范围的1/4的不绘制。
     * @param mapPxBounds - {Zondy.Bounds} 地图像素范围。
     * @param chartPxBounds - {Array<Object>} 图表范围的四边形节点数组。<br>
     *        例如：[{"x":1,"y":1},{"x":3,"y":1},{"x":6,"y":4},{"x":2,"y":10},{"x":1,"y":1}]。
     */
    isSuitableChart: function (mapPxBounds, chartPxBounds, zoomDis) {
        if (Math.abs(zoomDis) <= 1) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.clearCache
     * @description 清除缓存数据。
     */
    clearCache: function () {
        this.cache = {};
        this.charts = [];
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.removeFeatures
     * @description 从专题图中删除 feature。这个函数删除所有传递进来的矢量要素（数据）。
     * @param {Object} features - 待删除的要素。
     */
    removeFeatures: function (features) { // eslint-disable-line no-unused-vars
        var me = this;
        me.clearCache();
        ThemeLayer.prototype.removeFeatures.apply(me, arguments);
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.removeAllFeatures
     * @description 清除当前图层所有的矢量要素。
     */
    removeAllFeatures: function () {
        var me = this;
        me.clearCache();
        ThemeLayer.prototype.removeAllFeatures.apply(me, arguments);
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.redraw
     * @description 重绘该图层，成功则返回 true，否则返回 false。
     */
    redraw: function () {
        var me = this;
        me.clearCache();
        return ThemeLayer.prototype.redraw.apply(me, arguments);
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.clear
     * @description 清除图层。清除的内容包括数据（features） 、专题要素、缓存。
     */
    clear: function () {
        var me = this;
        if (me.renderer) {
            me.renderer.clearAll();
            me.renderer.refresh();
        }
        me.removeAllFeatures();
        me.clearCache();
    },

    /**
     * @function Zondy.map.graphThemeLayer.prototype.getWeightFieldValue
     * @description 获取权重字段的值。
     * @param {Zondy.Feature.Vector} feature - 矢量要素。
     * @param {Array.<string>} weightField - 字段名数组。
     * @param {number} defaultValue - 当通过 weightField 获取不到权重值时，使用 defaultValue 作为权重值。
     */
    getWeightFieldValue: function (feature, weightField, defaultValue) {
        if (typeof (defaultValue) === "undefined" || isNaN(defaultValue)) {
            defaultValue = 0;
        }
        if (!feature.attributes) {
            return defaultValue;
        }

        var fieldValue = feature.attributes[weightField];

        if (typeof (fieldValue) === "undefined" || isNaN(fieldValue)) {
            fieldValue = defaultValue
        }

        return fieldValue;
    },

    _sortChart: function () {
        var me = this;
        if (!me.charts) {
            return;
        }
        me.charts.sort(function (cs, ce) {
            if (typeof (cs["__overlayWeight"]) === "undefined" && typeof (ce["__overlayWeight"]) === "undefined") {
                return 0;
            } else if (typeof (cs["__overlayWeight"]) !== "undefined" && typeof (ce["__overlayWeight"]) === "undefined") {
                return -1;
            } else if (typeof (cs["__overlayWeight"]) === "undefined" && typeof (ce["__overlayWeight"]) !== "undefined") {
                return 1;
            } else if (typeof (cs["__overlayWeight"]) !== "undefined" && typeof (ce["__overlayWeight"]) !== "undefined") {
                return (parseFloat(cs["__overlayWeight"]) < parseFloat(ce["__overlayWeight"])) ? 1 : -1;
            }
            return 0;
        });
    },

    _addOverlayShape: function () {
        var me = this;
        var charts = me.charts;
        for (var m = 0, len_m = charts.length; m < len_m; m++) {
            var chart_m = charts[m];

            // 图形参考位置  (reSetLocation 会更新 chartBounds)
            var shapeROP_m = chart_m.resetLocation();

            // 添加图形
            var shapes_m = chart_m.shapes;
            for (var n = 0, slen_n = shapes_m.length; n < slen_n; n++) {
                shapes_m[n].refOriginalPosition = shapeROP_m;
                me.renderer.addShape(shapes_m[n]);
            }
        }
    },
    _addNoOverlayShape: function () {
        var me = this;
        // 压盖判断所需 chartsBounds 集合
        var mapBounds = me._map.getBounds();
        var crs = this._map.options.crs;
        mapBounds = window.L.bounds(crs.project(mapBounds.getSouthWest()), crs.project(mapBounds.getNorthEast()));

        var charts = me.charts;
        var chartsBounds = [];
        // 获取地图像素 bounds
        var mapPxLT = me.getLocalXY(mapBounds.min);
        var mapPxRB = me.getLocalXY(mapBounds.max);

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
            // 地图范围外不绘制
            if (mBounds && !me.isChartInMap(mBounds, cbs)) {
                continue;
            }
            //图形太大不绘制

            var zoomLevel = me._map.getZoom();
            var zoomD = zoomLevel - me.options.fitZoom;
            if (mBounds && me.options.fitZoom > -1 && !me.isSuitableChart(mBounds, cbs, zoomD)) {
                continue;
            }

            // 是否压盖
            var isOverlay = false;

            for (let j = 0; j < chartsBounds.length; j++) {
                //压盖判断
                if (me.isQuadrilateralOverLap(cbs, chartsBounds[j])) {
                    isOverlay = true;
                    break;
                }
            }

            if (isOverlay) {
                continue;
            } else {
                chartsBounds.push(cbs);
            }

            // 添加图形
            var shapes = chart.shapes;
            for (let j = 0, slen = shapes.length; j < slen; j++) {
                shapes[j].refOriginalPosition = shapeROP;
                me.renderer.addShape(shapes[j]);
            }
        }
    }
});
export var graphThemeLayer = function (name, chartsType, options) {
    return new GraphThemeLayer(name, chartsType, options);
};
export {GraphThemeLayer};
Zondy.Map.graphThemeLayer = graphThemeLayer;