import {Zondy} from '../../service/common/Base';
import {copyAttributesWithClip} from '../../service/common/Util';
import {Theme as FeatureTheme} from './feature/Theme';
import {SmicBrokenLine} from './levelRender/SmicBrokenLine';
import {SmicPoint} from './levelRender/SmicPoint';
import {SmicPolygon} from './levelRender/SmicPolygon';

/**
 * @private
 * @class Zondy.Theme.ThemeVector
 * @classdesc 矢量专题要素类。
 * @extends Zondy.Theme
 * @param {Zondy.Feature.Vector} data - 用户数据，的类型为矢量数据 feature。
 * @param {Zondy.Layer} layer - 此专题要素所在图层。
 * @param {Object} style - 样式。
 * @param {Object} options - 创建专题要素时的可选参数。
 * @param {number} [options.nodesClipPixel=2] - 节点抽稀像素距离, 单位：像素。
 * @param {boolean} [options.isHoverAble=true] - 图形是否可 hover。
 * @param {boolean} [options.isMultiHover=true] - 是否使用多图形高亮，isHoverAble 为 true 时生效。
 * @param {boolean} [options.isClickAble=true] - 图形是否可点击。
 * @param {Object} [options.highlightStyle] - 高亮样式。
 */
class ThemeVector extends FeatureTheme {

    constructor(data, layer, style, options, shapeOptions) {
        super(data, layer);
        //数据的 geometry 属性必须存在且类型是 Zondy.Geometry 或其子类的类型
        if (!data.fGeom) {
            return;
        }

        /**
         * @member {Zondy.Bounds} [Zondy.Theme.ThemeVector.prototype.dataBounds]
         * @description 用户数据的（feature.geometry）地理范围。
         */
        this.dataBounds = data.bound;

        /**
         * @member {number} [Zondy.Theme.ThemeVector.prototype.nodesClipPixel=2]
         * @description 节点抽稀像素距离。
         */
        this.nodesClipPixel = 2;

        /**
         * @member {boolean} [Zondy.Theme.ThemeVector.prototype.isHoverAble=true]
         * @description 图形是否可 hover。
         */
        this.isHoverAble = true;

        /**
         * @member {boolean} [Zondy.Theme.ThemeVector.prototype.isMultiHover=true]
         * @description 是否使用多图形高亮，isHoverAble 为 true 时生效。
         */
        this.isMultiHover = true;

        /**
         * @member {boolean} [Zondy.Theme.ThemeVector.prototype.isClickAble=true]
         * @description 图形是否可点击。
         */
        this.isClickAble = true;

        /**
         * @member {Object} [Zondy.Theme.ThemeVector.prototype.highlightStyle]
         * @description 高亮样式。
         */
        this.highlightStyle = null;

        /**
         * @member {Object} [Zondy.Theme.ThemeVector.prototype.shapeOptions]
         * @description 添加到渲染器前修改 shape 的一些属性，非特殊情况通常不允许这么做。
         */
        this.shapeOptions = {};

        /**
         * @member {Object} [Zondy.Theme.ThemeVector.prototype.style]
         * @description 可视化图形的 style。在子类中规定其对象结构和默认属性值。
         */
        this.style = style || {};


        this.CLASS_NAME = "Zondy.Theme.ThemeVector";
        this.style = style ? style : {};
        if (options) {
            copyAttributesWithClip(this, options, ["shapeOptions", "dataBounds"])
        }
        if (shapeOptions) {
            copyAttributesWithClip(this.shapeOptions, shapeOptions);
        }

        //设置基础参数 dataBounds、lonlat、location
        var geometry = data.fGeom;
        this.lonlat = [(this.dataBounds.xmin + this.dataBounds.xmax) / 2.0, (this.dataBounds.ymin + this.dataBounds.ymax) / 2.0];
        this.location = this.getLocalXY(this.lonlat);

        //将地理要素转为专题要素
        switch (data.ftype) {
            case 0:
                break;
            case 1:
                this.pointsToTF(data.fGeom.PntGeom);
                break;
            case 2:
                this.linesToTF(data.fGeom.LinGeom)
                break;
            case 3:
                this.regsToTF(data.fGeom.RegGeom);
                break;
        }
    }

    /**
     * @function Zondy.Theme.ThemeVector.prototype.destroy
     * @override
     */
    destroy() {
        this.style = null;
        this.dataBounds = null;
        this.nodesClipPixel = null;
        this.isHoverAble = null;
        this.isMultiHover = null;
        this.isClickAble = null;
        this.highlightStyle = null;
        this.shapeOptions = null;
        super.destroy();
    }

    /**
     * @function Zondy.Theme.ThemeVector.prototype.pointsToTF
     * @description 转换点要素。
     * @param {Zondy.Geometry} geometry - 用户数据几何地理信息，这里必须是点。
     */
    pointsToTF(geometry) {
        if (geometry == null || geometry.length <= 0) {
            return;
        }
        var components = geometry.components;

        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < geometry.length; i++) {
            var components_i = geometry[i];
            refLocal = [];
            localLX = this.getLocalXY([components_i.Dot.x, components_i.Dot.y]);

            refLocal[0] = localLX[0] - location[0];
            refLocal[1] = localLX[1] - location[1];

            //抽稀
            if (pointList.length > 0) {
                var lastLocalXY = pointList[pointList.length - 1];
                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                    continue;
                }
            }

            //使用参考点
            pointList.push(refLocal);

            //赋 style
            var style = new Object();
            style.r = 6; //防止漏设此参数，默认 6 像素
            style = copyAttributesWithClip(style, this.style);
            style.x = refLocal[0];
            style.y = refLocal[1];

            //创建图形
            var shape = new SmicPoint({
                style: style,
                clickable: this.isClickAble,
                hoverable: this.isHoverAble
            });

            //设置高亮样式
            if (this.highlightStyle) {
                shape.highlightStyle = this.highlightStyle;
            }

            //设置参考中心，指定图形位置
            shape.refOriginalPosition = location;

            //储存数据 id 属性，用于事件
            shape.refDataID = this.data.FID;

            //储存数据 id 属性，用于事件-多图形同时高亮
            shape.isHoverByRefDataID = this.isMultiHover;

            //修改一些 shape 可选属性，通常不需要这么做
            if (this.shapeOptions) {
                copyAttributesWithClip(shape, this.shapeOptions);
            }

            this.shapes.push(shape);
        }
    }

    /**
     * @function Zondy.Theme.ThemeVector.prototype.lineToTF
     * @description 转换线要素。
     * @param {Zondy.Geometry} geometry - 用户数据几何地理信息，这里必须是线。
     */
    linesToTF(geometry) {
        if (geometry == null || geometry.length <= 0) {
            return;
        }
        for (var i = 0; i < geometry.length; i++) {
            this.lineToTF(geometry[i]);
        }
    }

    lineToTF(geometry) {
        var components = [];
        if (geometry.Line != null && geometry.Line.Arcs != null && geometry.Line.Arcs.length > 0) {
            var arcs = geometry.Line.Arcs;
            for (var i = 0; i < arcs.length; i++) {
                var dots = arcs[i].Dots;
                for (var j = 0; j < dots.length; j++) {
                    components.push([dots[j].x, dots[j].y]);
                }
            }
        }
        if (components.length <= 0) {
            return;
        }

        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            var components_i = components[i];
            refLocal = [];
            localLX = this.getLocalXY(components_i);

            refLocal[0] = localLX[0] - location[0];
            refLocal[1] = localLX[1] - location[1];

            //抽稀 - 2 px
            if (pointList.length > 0) {
                var lastLocalXY = pointList[pointList.length - 1];
                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                    continue;
                }
            }

            //使用参考点
            pointList.push(refLocal);
        }

        if (pointList.length < 2) {
            return null;
        }

        //赋 style
        var style = new Object();
        style = copyAttributesWithClip(style, this.style, ['pointList']);
        style.pointList = pointList;

        //创建图形
        var shape = new SmicBrokenLine({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = this.location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.FID;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //添加到渲染器前修改 shape 的一些属性，非特殊情况通常不允许这么做
        if (this.shapeOptions) {
            copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }

    /**
     * @function Zondy.Theme.ThemeVector.prototype.regsToTF
     * @description 转面要素。
     * @param {Zondy.Geometry} geometry - 用户数据几何地理信息，这里必须是面。
     */
    regsToTF(geometry) {
        if (geometry == null || geometry.length <= 0) {
            return;
        }
        for (var i = 0; i < geometry.length; i++) {
            this.regToTF(geometry[i]);
        }
    }

    regToTF(geometry) {

        var components = geometry.Rings;
        if (components == null || components.length <= 0) {
            return;
        }

        //节点像素坐标
        var localLX = [];
        //参考位置，参考中心为
        var refLocal = [];
        var location = this.location;
        var pointList = [];

        //岛洞
        var holePolygonPointList = [];
        var holePolygonPointLists = [];

        //节点抽稀距离
        var nCPx = this.nodesClipPixel;

        for (var i = 0; i < components.length; i++) {
            if (i === 0) {
                // 第一个 component 正常绘制
                pointList = [];
                if (components[i] != null && components[i].Arcs != null && components[i].Arcs.length > 0) {
                    var arcs = components[i].Arcs;
                    for (var j = 0; j < arcs.length; j++) {
                        var dots = arcs[j].Dots;
                        for (var k = 0; k < dots.length; k++) {
                            refLocal = [];
                            localLX = this.getLocalXY([dots[k].x, dots[k].y]);
                            refLocal[0] = localLX[0] - location[0];
                            refLocal[1] = localLX[1] - location[1];
                            //抽稀 - 2 px
                            if (pointList.length > 0) {
                                var lastLocalXY = pointList[pointList.length - 1];
                                if ((Math.abs(lastLocalXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastLocalXY[1] - refLocal[1]) <= nCPx)) {
                                    continue;
                                }
                            }

                            //使用参考点
                            pointList.push(refLocal);
                        }
                    }
                }
            } else {
                // 其它 component 作为岛洞
                holePolygonPointList = [];
                if (components[i] != null && components[i].Arcs != null && components[i].Arcs.length > 0) {
                    var arcs = components[i].Arcs;
                    for (var j = 0; j < arcs.length; j++) {
                        var dots = arcs[j].Dots;
                        for (var k = 0; k < dots.length; k++) {
                            refLocal = [];
                            localLX = this.getLocalXY([dots[k].x, dots[k].y]);
                            refLocal[0] = localLX[0] - location[0];
                            refLocal[1] = localLX[1] - location[1];
                            //抽稀 - 2 px
                            if (holePolygonPointList.length > 0) {
                                var lastXY = holePolygonPointList[holePolygonPointList.length - 1];
                                if ((Math.abs(lastXY[0] - refLocal[0]) <= nCPx) && (Math.abs(lastXY[1] - refLocal[1]) <= nCPx)) {
                                    continue;
                                }
                            }

                            //使用参考点
                            holePolygonPointList.push(refLocal);
                        }
                    }
                }
            }

            if (holePolygonPointList.length < 2) {
                continue;
            }

            holePolygonPointLists.push(holePolygonPointList);
        }

        if (pointList.length < 2) {
            return;
        }

        //赋 style
        var style = {};
        style = copyAttributesWithClip(style, this.style, ['pointList']);
        style.pointList = pointList;

        //创建图形
        var shape = new SmicPolygon({
            style: style,
            clickable: this.isClickAble,
            hoverable: this.isHoverAble
        });

        //设置高亮样式
        if (this.highlightStyle) {
            shape.highlightStyle = this.highlightStyle;
        }

        //设置参考中心，指定图形位置
        shape.refOriginalPosition = this.location;

        //储存数据 id 属性，用于事件
        shape.refDataID = this.data.FID;

        //储存数据 id 属性，用于事件-多图形同时高亮
        shape.isHoverByRefDataID = this.isMultiHover;

        //岛洞面
        if (holePolygonPointLists.length > 0) {
            shape.holePolygonPointLists = holePolygonPointLists;
        }

        //修改一些 shape 可选属性，通常不需要这么做
        if (this.shapeOptions) {
            copyAttributesWithClip(shape, this.shapeOptions);
        }

        this.shapes.push(shape);
    }

    /**
     * @function Zondy.Theme.ThemeVector.prototype.updateAndAddShapes
     * @description 修改位置，针对地图平移操作，地图漫游操作后调用此函数。
     */
    updateAndAddShapes() {
        var newLocalLX = this.getLocalXY(this.lonlat);
        this.location = newLocalLX;

        var render = this.layer.renderer;
        for (var i = 0, len = this.shapes.length; i < len; i++) {
            var shape = this.shapes[i];
            //设置参考中心，指定图形位置
            shape.refOriginalPosition = newLocalLX;
            render.addShape(shape);
        }
    }

    /**
     * @function Zondy.Theme.ThemeVector.prototype.getShapesCount
     * @description 获得专题要素中可视化图形的数量。
     * @return {number} 可视化图形的数量。
     */
    getShapesCount() {
        return this.shapes.length;
    }

    /**
     * @function Zondy.Theme.ThemeVector.prototype.getLocalXY
     * @description 地理坐标转为像素坐标。
     * @param lonlat - {Zondy.LonLat} 专题要素地理位置。
     */
    getLocalXY(lonlat) {
        return this.layer.getLocalXY(lonlat);
    }
}

export {ThemeVector};
Zondy.Theme.ThemeVector = ThemeVector;
