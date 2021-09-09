import { Common } from '@mapgis/webclient-es6-service';

const { newGuid, Zondy } = Common;

/**
 * @private
 * @class  Zondy.Theme
 * @classdesc 专题要素基类，此类不可实例化。
 */
class Theme {

    /**
     * @function Zondy.Theme.prototype.constructor
     * @description 构造函数。
     * @param {Object} data - 用户数据，用于生成可视化 shape，必设参数。
     * @param {Zondy.Layer.Theme} layer - 此专题要素所在图层，必设参数。
     * @returns {Zondy.Theme} 返回一个专题要素。
     */
    constructor(data, layer) {

        if (!data) {
            return;
        }
        // layer 必须已经添加到地图, 且已初始化渲染器
        if (!layer || !layer.map || !layer.renderer) {
            return;
        }

        /**
         * @member {string} Zondy.Theme.prototype.id
         * @description 专题要素唯一标识。
         */
        this.id = newGuid();

        /**
         * @member {Zondy.LonLat} Zondy.Theme.prototype.lonlat
         * @description 专题要素地理参考位置。子类中必须根据用户数据（或地理位置参数）对其赋值。
         */
        this.lonlat = null;

        /**
         * @member {Array} Zondy.Theme.prototype.location
         * @description 专题要素像素参考位置。通常由地理参考位置决定。长度为 2 的数组，第一个元素表示 x 坐标，第二个元素表示 y 坐标。
         */
        this.location = [];

        /**
         * @readonly
         * @member {Object} Zondy.Theme.prototype.data
         * @description 用户数据，用于生成可视化 shape，可在子类中规定数据格式或类型，如：<Zondy.Vector>。
         */
        this.data = data;

        /**
         * @readonly
         * @member {Array} Zondy.Theme.prototype.shapes
         * @description 构成此专题要素的可视化图形对象数组，数组顺序控制渲染。
         */
        this.shapes = [];

        /**
         * @readonly
         * @member {Zondy.Layer.Theme} Zondy.Theme.prototype.layer
         * @description 此专题要素所在专题图层。
         */
        this.layer = layer;

        this.CLASS_NAME = "Zondy.Feature.Theme";

    }


    /**
     * @function Zondy.Theme.prototype.destroy
     * @description 销毁专题要素。
     */
    destroy() {
        this.data = null;
        this.id = null;
        this.lonlat = null;
        this.location = null;
        this.shapes = null;
        this.layer = null;
    }
}
export {Theme};
Zondy.Theme = Theme;