import {
    Tangram
} from "./Tangram";

/**
 * 矩形几何对象
 * @class Zondy.Object.Rectangle
 * @classdesc 矩形几何对象
 * @extends Zondy.Object.Tangram
 * @param {Number} xmin x最小值
 * @param {Number} xmax x最大值
 * @param {Number} ymin y最小值
 * @param {Number} ymax y最大值
 * @param {Object} option 属性键值对,拓展属性
 */
class Rectangle extends Tangram {
    /// <summary>矩形几何对象构造函数</summary>
    /// <param name="m_arguments" type="String">矩形坐标（"xmin,ymin,xmax,ymax"）</param>
    /// <param name="option" type="Object">属性键值对</param>
    constructor(xmin, ymin, xmax, ymax, option) {
        var options = option ? option : {};
        super(options);

        /**
         * @member Zondy.Object.Rectangle.prototype.xmin
         * @type {Number}
         * @description xmin
         */
        this.xmin = xmin;

        /**
         * @member Zondy.Object.Rectangle.prototype.xmax
         * @type {Number}
         * @description xmax
         */
        this.xmax = xmax;

        /**
         * @member Zondy.Object.Rectangle.prototype.ymin
         * @type {Number}
         * @description ymin
         */
        this.ymin = ymin;

        /**
         * @member Zondy.Object.Rectangle.prototype.ymax
         * @type {Number}
         * @description ymax
         */
        this.ymax = ymax;
    }

    /**
     * @function Zondy.Object.Rectangle.prototype.setByOL
     * @description 使用一个由Openlayers定义的矩形来构造本对象
     * @param {ol.extent} openlayersRect 由OpenLayers定义的矩形对象
     */
    setByOL(openlayersRect) {
        if (openlayersRect === undefined || openlayersRect === null) {
            return;
        }
        this.xmin = openlayersRect[0];
        this.ymin = openlayersRect[1];
        this.xmax = openlayersRect[2];
        this.ymax = openlayersRect[3];
    }

    /**
     * @function Zondy.Object.Rectangle.prototype.toString
     * @description 对象转化为字符串
     * @returns {String} 返回一个字符串来表示此矩形
     */
    toString() {
        return "" + this.xmin + ',' + this.ymin + ',' + this.xmax + ',' + this.ymax;
    }

    /**
     * @function Zondy.Object.Rectangle.prototype.getGeometryType
     * @description 获取几何类型名称
     * @returns {String} rect
     */
    getGeometryType() {
        return "rect";
    }

    /**
     * @function Zondy.Object.Rectangle.prototype.convertToBound
     * @description 将本对象转换为一个OpenLayers.Bound对象
     * @returns {ol.extent} 返回一个字符串来表示此矩形
     */
    convertToBound() {
        var bounds = [this.xmin, this.ymin, this.xmax, this.ymax];
        return bounds;
    }

    /**
     * @function Zondy.Object.Rectangle.prototype.intersectsBounds
     * @description 判断是否和另一个矩形相交
     * @param {ol.extent} bounds
     * @param {String} options 判断参数
     * @param {Boolean} [options.inclusive = true] 是否精准计算
     */
    intersectsBounds(bounds, options) {
        if (typeof options === "boolean") {
            options = {
                inclusive: options
            };
        }
        options = options || {};
        if (options.inclusive === null) {
            options.inclusive = true;
        }
        var self = this;
        var intersects = false;
        var mightTouch = (
            self.xmin === bounds.xmax ||
            self.xmax === bounds.xmin ||
            self.ymax === bounds.ymin ||
            self.ymin === bounds.ymax
        );

        // if the two bounds only touch at an edge, and inclusive is false,
        // then the bounds don't *really* intersect.
        if (options.inclusive || !mightTouch) {
            // otherwise, if one of the boundaries even partially contains another,
            // inclusive of the edges, then they do intersect.
            var inBottom = (
                ((bounds.ymin >= self.ymin) && (bounds.ymin <= self.ymax)) ||
                ((self.ymin >= bounds.ymin) && (self.ymin <= bounds.ymax))
            );
            var inTop = (
                ((bounds.ymax >= self.ymin) && (bounds.ymax <= self.ymax)) ||
                ((self.ymax > bounds.ymin) && (self.ymax < bounds.ymax))
            );
            var inLeft = (
                ((bounds.xmin >= self.xmin) && (bounds.xmin <= self.xmax)) ||
                ((self.xmin >= bounds.xmin) && (self.xmin <= bounds.xmax))
            );
            var inRight = (
                ((bounds.xmax >= self.xmin) && (bounds.xmax <= self.xmax)) ||
                ((self.xmax >= bounds.xmin) && (self.xmax <= bounds.xmax))
            );
            intersects = ((inBottom || inTop) && (inLeft || inRight));
        }
        return intersects;
    }
}
export {
    Rectangle
};
Zondy.Object.Rectangle = Rectangle;