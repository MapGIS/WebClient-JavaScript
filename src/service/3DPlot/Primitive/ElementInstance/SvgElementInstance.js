/*
 * @Author: your name
 * @Date: 2021-10-25 10:22:13
 * @LastEditTime: 2022-05-20 20:10:07
 * @LastEditors: zk
 * @Description: In User Settings Edit
 * @FilePath: \MapGISPlotBase\src\3DPlot\Primitive\ElementInstance\SvgElementInstance.js
 */
import {Vector2} from "../../../PlotUtilBase/Math/Vector2";
import {Vector3} from "../../../PlotUtilBase/Math/Vector3";
import PolylineCurve3 from "../../../../service/PlotUtilBase/Curves/PolylineCurve3";
import {CesiumGeomUtil} from "../../Utils/CesiumUtil";
import {defined} from "../../../PlotUtilBase/Check";
import GeomUtil from "../../../../service/PlotUtilBase/Geometry/GeomUtil";
import {ExtrudeGeometryUtil} from "../../Utils/ExtrudeGeometryUtil";
import {Shape} from "../../../PlotUtilBase/Path2D/Shape";
import {setOffsetHeight} from "./Util";

export default class SvgElementInstance {
    constructor(elem, options = {}) {
        this._elem = elem;
        this._options = options;
        this.globelScale = options.globelScale || 100
        this.fillDefaultWidth = 5
        this.textDefaultWidth = 10
        this.instance = undefined;
    }

    getInstance(callback) {
        let that = this;
        this.svgToGeomInstances(this._elem, this._options, function (instance) {
            that.instance = instance;
            callback(instance);
        });
    }

    svgToGeomInstances(elem, options, callback) {
        const paths = [];
        elem.getPathElem(paths);
        const spans = [];
        elem.getSpanElem(spans);
        const {type, positions, classificationType} = elem;
        if(typeof classificationType === 'number'){
            this._initSampleOptions();
            if (type === 'simplepoint') {
                this.samplePoints = [Cesium.Cartesian3.fromDegrees(positions[0].x, positions[0].y, 0)];
            } else {
                this._getSampleOptions(paths, spans);
            }
            let that = this;
            let sampleElevationTool = new Cesium.SampleElevationTool(window.viewer, this.samplePoints, 'terrain', function (sampleResult) {
                let opt = {
                    sampleResult: sampleResult,
                    type: type,
                    paths: paths,
                    spans: spans,
                    options: options
                }
                const {instances, wallOffsetHeights} = that.getInstances(opt);
                callback(instances, wallOffsetHeights);
            }, {level: 10});
            sampleElevationTool.start();
        }else {
            let opt = {
                paths: paths,
                spans: spans,
                options: options
            }
            const {instances, wallOffsetHeights} = this.getInstances(opt);
            callback(instances, wallOffsetHeights);
        }
    }

    getInstances(opt) {
        let {sampleResult, type, paths, options, spans} = opt;
        let pathOffsetHeights, spanOffsetHeights, wallOffsetHeights;
        if(sampleResult){
            if (type !== 'simplepoint') {
                pathOffsetHeights = this._getOffsetHeights(sampleResult);
                spanOffsetHeights = this._getOffsetHeights(sampleResult, 'span');
                wallOffsetHeights = [];
                if (pathOffsetHeights.length !== paths.length) {
                    console.error("pathOffsetHeights长度有误！");
                }
            } else {
                options.dimModHeight += Number(sampleResult[0].height);
            }
        }
        let instances = [];
        for (let i = 0; i < paths.length; i += 1) {
            if(sampleResult){
                if (paths[i].type === 'mainline' || paths[i].type === 'extendline' || paths[i].type === 'mainborder') {
                    options.offsetHeights = pathOffsetHeights[i];
                    wallOffsetHeights.push(pathOffsetHeights[i]);
                } else {
                    options.offsetHeights = undefined;
                }
            }
            let pathTempInst = this.pathElemToGeomInstance(paths[i], options);
            if (!defined(pathTempInst)) continue;
            if(sampleResult){
                //针对circle和path，只能更改其生成的三维体的高度
                if (type !== 'simplepoint' && (paths[i].type === 'circle' || paths[i].type === 'path')) {
                    for (let j = 0; j < pathTempInst.length; j++) {
                        setOffsetHeight(pathTempInst[j], pathOffsetHeights[i][j][0]);
                    }
                }
            }
            if (Array.isArray(pathTempInst)) {
                instances = instances.concat(pathTempInst);
            } else {
                instances.push(pathTempInst);
            }
        }

        for (let i = 0; i < spans.length; i += 1) {
            let tempInst = this.spanElemToGeomInstance(spans[i], options);
            if(sampleResult){
                //针对span，只能更改其生成的三维体的高度
                setOffsetHeight(tempInst, spanOffsetHeights[i][0][0]);
            }
            if (defined(tempInst)) {
                instances.push(tempInst);
            }
        }

        return {instances, wallOffsetHeights}
    }

    pathElemToGeomInstance(pathElem, options) {
        const instances = [];
        const style = pathElem.getContextStyle()
        const fill = style.fillStyle;
        const stroke = style.strokeStyle
        const lineWidth = style.lineWidth
        const strokeWidthSize = lineWidth * this.globelScale / 2;
        const _fillWidthSize = this.fillDefaultWidth * this.globelScale / 2

        const parts = pathElem.cacheCoords || pathElem.getCoords();

        if (stroke && stroke !== "none") {
            for (let i = 0; i < parts.length; i += 1) {
                const coords = parts[i];
                this._closeCoordsPath(coords);
                const geometry = this._generateStrokeGeometry(coords, strokeWidthSize);
                geometry.modDetail = pathElem.getGeometryDetail(i)
                const instance = this._generateCesiumGeometryInstance(pathElem, geometry, options, this.getColor(pathElem, "strokeStyle"));
                if (defined(instance)) instances.push(instance);
            }
        }

        if (fill && fill !== "none") {
            for (let i = 0; i < parts.length; i += 1) {
                const coords = parts[i];
                const geometry = this._generateFillGeometry(coords, _fillWidthSize);
                geometry.modDetail = pathElem.getGeometryDetail(i)
                const instance = this._generateCesiumGeometryInstance(pathElem, geometry, options, this.getColor(pathElem, "fillStyle"));
                if (defined(instance)) instances.push(instance);
            }
        }
        return instances;
    }

    spanElemToGeomInstance(spanElem, options) {
        if (!spanElem) return undefined;

        const textWidth = this.textDefaultWidth * this.globelScale / 2;
        const textGeo = this._generateTextGeometry(spanElem, textWidth);

        if (!textGeo) return undefined;

        spanElem.applyTextGeo3D(textGeo);
        textGeo.modDetail = spanElem.getGeometryDetail(0)


        return this._generateCesiumGeometryInstance(spanElem, textGeo, options, this.getColor(spanElem, "fillStyle"));
    }

    _generateTextGeometry(spanElem, textWidth) {
        const text = spanElem.getText();
        const fontSize = spanElem.getStyle("font-size").getPixels();
        const font = spanElem.getFont();
        const shapes = font.generateShapes(text, fontSize);

        return ExtrudeGeometryUtil.createExtrudeGeometryByDepth(shapes, 4, textWidth, 1);
    }

    _generateStrokeGeometry(coords, strokeWidth, offsetHeights) {
        const vec3s = [];
        const coordsLen = coords.length;
        let coord;
        if (!offsetHeights) {
            for (let j = 0; j < coordsLen; j += 1) {
                coord = coords[j];
                vec3s.push(new Vector3(coord.x, coord.y, 0));
            }
        } else if (offsetHeights.length > 1) {
            for (let j = 0; j < coordsLen; j += 1) {
                coord = coords[j];
                vec3s.push(new Vector3(coord.x, coord.y, offsetHeights[j]));
            }
        } else if (offsetHeights.length === 1) {
            for (let j = 0; j < coordsLen; j += 1) {
                coord = coords[j];
                vec3s.push(new Vector3(coord.x, coord.y, offsetHeights[0]));
            }
        }

        const polylineCurve = new PolylineCurve3(vec3s);

        const pts = [];
        pts.push(new Vector2(-strokeWidth, -strokeWidth));
        pts.push(new Vector2(strokeWidth, -strokeWidth));
        pts.push(new Vector2(strokeWidth, strokeWidth));
        pts.push(new Vector2(-strokeWidth, strokeWidth));

        const shape = new Shape(pts);
        return ExtrudeGeometryUtil.createExtrudeGeometryByPath([shape], undefined, polylineCurve, coordsLen * 2 - 3);
    }

    _generateFillGeometry(coords, height) {
        const pts = [];
        let coordsLen = coords.length;

        if (coordsLen < 3) return undefined;
        const first = coords[0];
        const last = coords[coordsLen - 1];
        if (!GeomUtil.PointEqualFuzzy(first.x, first.y, last.x, last.y, 10e-8)) {
            coords.push(last);
        }

        coordsLen = coords.length;

        for (let j = 0; j < coordsLen; j += 1) {
            const coord = coords[j];
            pts.push(new Vector2(-(-first.y + coord.y), -(-first.x + coord.x)));
        }

        const shape = new Shape(pts);

        const vec3s = [];
        vec3s.push(new Vector3(first.x, first.y, height));
        vec3s.push(new Vector3(first.x, first.y, -height));
        const polylineCurve = new PolylineCurve3(vec3s);

        return ExtrudeGeometryUtil.createExtrudeGeometryByPath([shape], undefined, polylineCurve, 1);
    }

    _generateCesiumGeometryInstance(elem, extrudeGeom, options, color) {
        if (!defined(extrudeGeom)) return undefined;

        this.transformExtrudeGeometry(extrudeGeom, options);
        const cesGeom = CesiumGeomUtil.createCesiumGeomByExtrudeGeom(extrudeGeom);
        cesGeom.modDetail = extrudeGeom.modDetail
        this.transfromGeoCesium(elem, cesGeom, options);
        //  修改cesium边界，解决线宽过小时无法显示的问题
        cesGeom.boundingSphere = Cesium.BoundingSphere.fromVertices(cesGeom.attributes.position.values);
        return new Cesium.GeometryInstance({
            geometry: cesGeom, attributes: {
                color: color,
            },
        });
    }

    _getColorByType(ele, type) {
        let ret;
        const styles = ele.getContextStyle()
        if (styles[type]) {
            ret = styles[type]
        }
        if (ret === "none") ret = undefined;
        return ret;
    }

    getColor(ele, type) {
        let color = "rgba(255,0,0,1)";
        if (defined(type)) {
            color = this._getColorByType(ele, type) || color;
        } else {
            color = this._getColorByType(ele, "fillStyle") || this._getColorByType(ele, "strokeStyle") || color;
        }

        const cesColor = Cesium.Color.fromCssColorString(color);
        return Cesium.ColorGeometryInstanceAttribute.fromColor(cesColor);
    }

    /**
     * @description: 处理最后两点绘制不闭合
     * @param {*} coords
     * @return {*}
     */
    _closeCoordsPath(coords) {
        if (!coords || coords.length < 3) return;
        const firstPnt = coords[0];
        const endPnt = coords[coords.length - 1];

        if (GeomUtil.PointEqualFuzzy(firstPnt.x, firstPnt.y, endPnt.x, endPnt.y, 10e-8)) {
            const secondPnt = coords[1];
            const lastPnt = new Vector2(secondPnt.x, secondPnt.y);
            coords.push(lastPnt);
        }
    }

    transformExtrudeGeometry(extrudeGeom, options) {
    }

    transfromGeoCesium(elem, cesgeo, options) {
        const {dimModHeight} = options;
        CesiumGeomUtil.translate(cesgeo, new Cesium.Cartesian3(0, 0, dimModHeight));
    }

    _initSampleOptions() {
        this.samplePoints = [];
        this.sampleConfigs = [];
        this.pathIndex = [];
        this.spanIndex = [];
        this.index = 0;
    }

    _getCoords(path) {
        const {cacheCoords} = path;
        if (!cacheCoords) {
            console.error("没有cacheCoords对象！");
        }

        return cacheCoords;
    }

    /**
     * @description 全部点地形采样
     * @param path - {Object} 必选项，path对象
     * @return sample - {Object} 采样点（笛卡尔坐标）信息
     */
    _getFullSample(path) {
        const cacheCoords = this._getCoords(path);

        let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
        for (let j = 0; j < cacheCoords.length; j++) {
            for (let k = 0; k < cacheCoords[j].length; k++) {
                let sample = this._mercatorTolonlat(cacheCoords[j][k]);
                samples.push(Cesium.Cartesian3.fromDegrees(sample.lon, sample.lat, 0));
            }
            endIndex = startIndex + cacheCoords[j].length - 1;
            simpleConfig.push({
                start: startIndex, end: endIndex
            })
            startIndex = endIndex + 1;
        }

        return {samples, simpleConfig, endIndex}
    }

    /**
     * @description 全部点地形采样
     * @param path - {Object} 必选项，path对象
     * @return sample - {Object} 采样点（笛卡尔坐标）信息
     */
    _getFullSample(path) {
        const cacheCoords = this._getCoords(path);

        let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
        for (let j = 0; j < cacheCoords.length; j++) {
            for (let k = 0; k < cacheCoords[j].length; k++) {
                let sample = this._mercatorTolonlat(cacheCoords[j][k]);
                samples.push(Cesium.Cartesian3.fromDegrees(sample.lon, sample.lat, 0));
            }
            endIndex = startIndex + cacheCoords[j].length - 1;
            simpleConfig.push({
                start: startIndex, end: endIndex
            })
            startIndex = endIndex + 1;
        }

        return {samples, simpleConfig, endIndex}
    }

    /**
     * @description 指定点地形采样
     * @param points - {Array} 必选项，指定的采样点数组
     * @return sample - {Object} 采样点（笛卡尔坐标）信息
     */
    _getPointsSample(points) {
        let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
        for (let j = 0; j < points.length; j++) {
            let sample = this._mercatorTolonlat(points[j]);
            samples.push(Cesium.Cartesian3.fromDegrees(sample.lon, sample.lat, 0));
            endIndex = startIndex;
            simpleConfig.push({
                start: startIndex, end: endIndex
            })
            startIndex = endIndex + 1;
        }

        return {samples, simpleConfig, endIndex}
    }

    _setPointsSample(path) {
        let originPnts = [];
        let parts = path.cacheCoords || path.getCoords();
        for (let j = 0; j < parts.length; j++) {
            originPnts.push(path.getGeometryDetail(j).originPnt);
        }
        this._setSamples(this._getPointsSample(originPnts));
    }

    /**
     * @description 根据OriginPoint进行地形采样
     * @param originPnt - {Object} 必选项，originPnt对象
     * @return sample - {Object} 采样点（笛卡尔坐标）信息
     */
    _getOriginSample(originPnt) {
        let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
        let sample = this._mercatorTolonlat(originPnt);
        samples.push(Cesium.Cartesian3.fromDegrees(sample.lon, sample.lat, 0));
        endIndex = startIndex;
        simpleConfig.push({
            start: startIndex, end: endIndex
        })
        startIndex = endIndex + 1;

        return {samples, simpleConfig, endIndex}
    }

    /**
     * @description 根据经纬度进行地形采样
     * @param Lonlat - {Object} 必选项，Lonlat对象
     * @return sample - {Object} 采样点（笛卡尔坐标）信息
     */
    _getLonlatSample(Lonlat) {
        let samples = [], simpleConfig = [], startIndex = this.index, endIndex;
        samples.push(Cesium.Cartesian3.fromDegrees(Lonlat.x, Lonlat.y, 0));
        endIndex = startIndex;
        simpleConfig.push({
            start: startIndex, end: endIndex
        })
        startIndex = endIndex + 1;

        return {samples, simpleConfig, endIndex}
    }

    _setSamples(sampleObj, type) {
        type = type || 'path';
        this.samplePoints = this.samplePoints.concat(sampleObj.samples);
        this.sampleConfigs.push(sampleObj.simpleConfig);
        this.index = sampleObj.endIndex + 1;

        if (type === 'path') {
            this.pathIndex.push(this.sampleConfigs.length - 1);
        } else {
            this.spanIndex.push(this.sampleConfigs.length - 1);
        }
    }

    /**
     * @description 取得采样参数
     * @param type - {String} 必选项，path类型
     * @param paths - {Array} 必选项，path数组
     * @param spans - {Array} 必选项，span数组
     * @return sampleOptions - {Object} 采样参数
     */
    _getSampleOptions(paths, spans) {
        this._initSampleOptions();
        let sampleObj;

        for (let i = 0; i < paths.length; i++) {
            const {type} = paths[i];
            let originPnts, parts;
            switch (type) {
                case "mainline":
                case "extendline":
                case "mainborder":
                    this._setSamples(this._getFullSample(paths[i]));
                    break;
                case "path":
                    this._setPointsSample(paths[i]);
                    break;
                case "circle":
                    this._setPointsSample(paths[i]);
                    break;
            }
        }

        for (let i = 0; i < spans.length; i++) {
            this._setSamples(this._getOriginSample(spans[i].getGeometryDetail(0).originPnt), 'span');
        }
    }

    _getPointSampleOptions(lonlat) {
        this._initSampleOptions();
        this._setSamples(this._getLonlatSample(lonlat));
    }

    /**
     * @description 根据采样结果取得每个部件的高程采样数组
     * @param sampleResult - {Array} 必选项，高程采样结果
     * @param type - {String} 可选项，类型，path或span
     * @return pathHeights - {Array} 所有部件的高程采样数组
     */
    _getOffsetHeights(sampleResult, type) {
        type = type || 'path';
        let pathHeights = [];
        let indexes = this.pathIndex;
        if (type === 'span') {
            indexes = this.spanIndex;
        }
        for (let i = 0; i < indexes.length; i++) {
            pathHeights.push([]);
            let heightGroup = this.sampleConfigs[indexes[i]];
            for (let j = 0; j < heightGroup.length; j++) {
                pathHeights[i].push([]);
                for (let k = heightGroup[j].start; k <= heightGroup[j].end; k++) {
                    pathHeights[i][j].push(sampleResult[k].height);
                }
            }
        }
        return pathHeights;
    }

    /**
     * @description 墨卡托坐标转经纬度坐标
     * @param mercator - {Object} 必选项，墨卡托坐标
     * @return lonlat - {Object} 经纬度坐标
     */
    _mercatorTolonlat(mercator) {
        let lonlat = {lon: 0, lat: 0};

        let x = mercator.x / 20037508.34 * 180;
        let y = mercator.y / 20037508.34 * 180;

        y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);

        lonlat.lon = x;
        lonlat.lat = y;

        return lonlat;
    }
}
