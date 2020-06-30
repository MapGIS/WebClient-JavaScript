import {L} from  'leaflet';
import {Zondy} from '../../service/common/Base';
import proj4 from "proj4";

window.proj4 = proj4;
window.Zondy.Proj = {};

/**
 * @function window.Zondy.Proj._isProj4Obj
 * @description 判断地理编码是否是Proj4对象(是否已定义地理编码和逆地理编码)
 * @param {String} a 地理编码
 */
window.Zondy.Proj._isProj4Obj = function (a) {
    return (typeof a.inverse !== 'undefined' &&
    typeof a.forward !== 'undefined');
};

/**
 * @private
 * @class window.Zondy.Proj.Projection
 * @classdesc Proj投影定义类
 * @extends L.Class {@link doc-leaflet/#class}
 * @param {Number} code 地理编码
 * @param {String} def 投影的proj4定义
 * @param {Object} bounds 投影范围参数 {@link L.bounds}
 */
window.Zondy.Proj.Projection = window.L.Class.extend({

    /**
     * @function L.Proj.Projection.prototype.initialize
     * @description 初始化
     * @param {Number} code 地理编码
     * @param {String} def 投影的proj4定义
     * @param {Object} bounds 投影范围参数 {@link L.bounds}
     */
    initialize: function (code, def, bounds) {
        var isP4 = window.Zondy.Proj._isProj4Obj(code);
        this._proj = isP4 ? code : this._projFromCodeDef(code, def);
        var boundsOption = bounds;
        if (window.L.Util.isArray(bounds)) {
            boundsOption = window.L.bounds(bounds);
        }
        this.bounds = isP4 ? def : boundsOption;
    },

    /**
     * @function L.Proj.Projection.prototype.project
     * @description 通过地理坐标得到投影坐标
     * @param {Object} latlng 经纬度坐标 {@link L.latlng}
     * @return {Object} 返回投影坐标点 {@link L.point}
     */
    project: function (latlng) {
        // if(latlng==undefined)
        // {
        //     return new window.L.Point();
        // }
        var point = this._proj.forward([latlng.lng, latlng.lat]);
        return new window.L.Point(point[0], point[1]);
    },

    /**
     * @function L.Proj.Projection.prototype.unproject
     * @description 通过投影坐标得到地理坐标
     * @param {Object} point 地理坐标点 {@link L.Point}
     * @param {String} unbounded 坐标点高程不限
     * @return {Object} 返回经纬度坐标 {@link L.LatLng}
     */
    unproject: function (point, unbounded) {
        // if(point==undefined || isNaN(point.x) || isNaN(point.y))
        // {
        //     return new window.L.LatLng();
        // }
        if (this.bounds) {
            point.x = point.x < this.bounds.min.x ? this.bounds.min.x : (point.x > this.bounds.max.x ? this.bounds.max.x : point.x );
            point.y = point.y < this.bounds.min.y ? this.bounds.min.y : (point.y > this.bounds.max.y ? this.bounds.max.y : point.y);
        }
        var point2 = this._proj.inverse([point.x, point.y]);
        return new window.L.LatLng(point2[1], point2[0], unbounded);
    },

    /**
     * @private
     * @function Zondy.Map.MapWMTSLayer.prototype.getTileUrl
     * @description 通过地理编码和定位获取投影
     * @param {Number} code 地理编码
     * @param {String} def 投影的proj4定义
     * @return {Number} Proj4的code
     */
    _projFromCodeDef: function (code, def) {
        if (def) {
            proj4.defs(code, def);
        } else if (proj4.defs[code] === undefined) {
            var urn = code.split(':');
            if (urn.length > 3) {
                code = urn[urn.length - 3] + ':' + urn[urn.length - 1];
            }
            if (proj4.defs[code] === undefined) {
                throw 'No projection definition for code ' + code;
            }
        }

        return proj4(code);
    },

    /**
     * @function L.Proj.Projection.prototype.getUnits
     * @description 获取单位信息
     * @return {String} 返回单位信息
     */
    getUnits: function () {
        return this._proj.oProj.units;
    }
});

/**
 * @class Zondy.Proj.CRS
 * @classdesc 基于Proj4坐标系统扩展类
 * @extends L.Class {@linkdoc-leaflet/#class}
 * @param {string} srsCode 地理编码。
 * @param {Object} options 可选参数对象
 * @param {string} [options.def] 投影的proj4定义
 * @param {Object} [options.origin] 原点。必填 {@link L.Point}
 * @param {Array} [options.scales] 比例尺数组
 * @param {Array} [options.scaleDenominators] 比例尺分母数组
 * @param {Array} [options.resolutions] 分辨率数组
 * @param {Object} [options.bounds] 投影范围参数 {@link L.bounds}
 * @example
 var crs =L.Proj.CRS("EPSG:4326",{
           origin: [-180,90],
           scaleDenominators: [2000,1000,500,200,100,50,20,10],
     });
 var map=L.map('map', {
        crs: crs
       ...
     })
 */
var CRS = window.L.Class.extend({
    includes: window.L.CRS,

    options: {
        transformation: new window.L.Transformation(1, 0, -1, 0) //仿射变换 
    },

    /**
     * @function L.Proj.CRS.prototype.initialize
     * @description 初始化
     * @param {Number} srsCode 地理编码
     * @param {Object} options 定位
     */
    initialize: function (srsCode, options) {
        var code,
            proj,
            def;

        if (window.Zondy.Proj._isProj4Obj(srsCode)) {
            proj = srsCode;
            code = proj.srsCode;
            options = options || {};
            this.projection = new window.Zondy.Proj.Projection(proj, options.bounds);
        } else {
            code = srsCode;
            options = options || {};
            def = options.def || '';
            this.projection = new window.Zondy.Proj.Projection(code, def, options.bounds);
        }

        window.L.Util.setOptions(this, options);
        this.code = code;
        this.transformation = this.options.transformation;

        if (this.options.bounds) {
            this.options.bounds = window.L.bounds(this.options.bounds);
        }
        if (!this.options.origin && this.options.bounds) {
            this.options.origin = [this.options.bounds.min.x, this.options.bounds.max.y];
        }
        if (this.options.origin) {
            if (this.options.origin instanceof window.L.Point) {
                this.options.origin = [this.options.origin.x, this.options.origin.y];
            }
            this.transformation =
                new window.L.Transformation(1, -this.options.origin[0],
                    -1, this.options.origin[1]);
        }

        if (this.options.scales && this.options.scales.length > 0) {//如果存在比例尺
            this._scales = this._toProj4Scales(this.options.scales);
        } else if (this.options.scaleDenominators && this.options.scaleDenominators.length > 0) {//如果存在比例尺分母
            var scales = [];
            for (let i = 0; i < this.options.scaleDenominators.length; i++) {
                scales[i] = 1 / this.options.scaleDenominators[i];
            }
            this._scales = this._toProj4Scales(scales);
        } else if (this.options.resolutions && this.options.resolutions.length > 0) {//如果存在分辨率
            this._scales = [];
            for (let i = this.options.resolutions.length - 1; i >= 0; i--) {
                if (this.options.resolutions[i]) {
                    this._scales[i] = 1 / this.options.resolutions[i];
                }
            }
        } else if (this.options.bounds) {//如果存在投影范围参数
            this._scales = this._getDefaultProj4ScalesByBounds(this.options.bounds);
        }

        this.infinite = !this.options.bounds;

    },

    /**
     * @function L.Proj.CRS.prototype.scale
     * @description 通过缩放级别获取比例尺值
     * @param {Number} zoom 缩放级别
     * @return {Number} 比例尺值
     */
    scale: function (zoom) {
        var iZoom = Math.floor(zoom),
            baseScale,
            nextScale,
            scaleDiff,
            zDiff;
        if (zoom === iZoom) {
            return this._scales[zoom];
        } else {
            // Non-integer zoom, interpolate
            baseScale = this._scales[iZoom];
            nextScale = this._scales[iZoom + 1];
            scaleDiff = nextScale - baseScale;
            zDiff = (zoom - iZoom);
            return baseScale + scaleDiff * zDiff;
        }
    },

    /**
     * @function L.Proj.CRS.prototype.zoom
     * @description 根据比例尺返回缩放级别
     * @param {number} scale 比例尺
     * @return {number} 缩放级别
     */
    zoom: function (scale) {
        // Find closest number in this._scales, down
        var downScale = this._closestElement(this._scales, scale),
            downZoom = this._scales.indexOf(downScale),
            nextScale,
            nextZoom,
            scaleDiff;
        // Check if scale is downScale => return array index
        if (scale === downScale) {
            return downZoom;
        }
        // Interpolate
        nextZoom = downZoom + 1;
        nextScale = this._scales[nextZoom];
        if (nextScale === undefined) {
            return Infinity;
        }
        scaleDiff = nextScale - downScale;
        return (scale - downScale) / scaleDiff + downZoom;
    },

    distance: window.L.CRS.Earth.distance,

    R: window.L.CRS.Earth.R,

    /**
     * @private
     * @function
     * @description 获取数组中最接近最低值的元素
     * @param {Array} array 数组
     * @param {Number} element 元素
     * @return {Number} 数组中最接近最低值的元素
     */
    _closestElement: function (array, element) {
        var low;
        for (var i = array.length; i--;) {
            if (array[i] <= element && (low === undefined || low < array[i])) {
                low = array[i];
            }
        }
        return low;
    },

    /**
     * @private
     * @function
     * @description 将比例尺数组转成Proj4的比例尺数组
     * @param {Array} scales 比例尺数组
     * @return {Array} Proj4的比例尺数组
     */
    _toProj4Scales: function (scales) {
        var proj4Scales = [];
        if (!scales) {
            return proj4Scales;
        }
        for (var i = 0; i < scales.length; i++) {
            var a = this.projection ? this._getMeterPerMapUnit(this.projection.getUnits()) : 1;
            proj4Scales[i] = 1 / ( 0.0254 / (96 * scales[i]) / a);
        }
        return proj4Scales;
    },

    /**
     * @private
     * @function
     * @description 计算地图的单位代表的米数，比如地图单位是度，则计算每度表示多少米
     * @param {String} mapUnit 地图单位
     * @return {String} 地图的单位代表的米数
     */
    _getMeterPerMapUnit: function (mapUnit) {
        var earchRadiusInMeters = 6378137;
        var meterPerMapUnit = 1;
        if (mapUnit === "meter") {
            meterPerMapUnit = 1;
        } else if (mapUnit === "degrees") {
            // 每度表示多少米。
            meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
        } else if (mapUnit === "kilometer") {
            meterPerMapUnit = 1.0E-3;
        } else if (mapUnit === "inch") {
            meterPerMapUnit = 1 / 2.5399999918E-2;
        } else if (mapUnit === "feet") {
            meterPerMapUnit = 0.3048;
        }
        return meterPerMapUnit;
    },

    /**
     * @private
     * @function
     * @description 通过投影范围参数获取默认比例尺
     * @param {Object} bounds 投影范围参数 {L.bounds}
     * @return {Array} 比例尺数组
     */
    _getDefaultProj4ScalesByBounds: function (bounds) {
        if (!bounds) {
            return [];
        }
        var boundsSize = bounds.getSize();
        var extendsSize = Math.max(boundsSize.x, boundsSize.y);
        var resolution = extendsSize / 256;
        var scales = [];
        var maxZoom = 23;
        for (var i = 0; i < maxZoom; i++) {
            scales[i] = Math.pow(2, i) / resolution;
        }
        return scales;
    }
});
export {CRS};
export var crs = function (srsCode, options) {
    return new CRS(srsCode, options)
};
window.Zondy.Proj.CRS = crs;
