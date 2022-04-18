import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import MarkerSymbol from './MarkerSymbol';

/**
 * 简单标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PictureMarkerSymbol
 * @classdesc 图片标记符号
 * @param {String} [type = 'picture-marker'] 图片标记符号类型，只能是picture-marker
 * @param {Number} [angle = 0] 图片标记符号角度，默认为0
 * @param {Number} [height = 12] 图片标记符号高度，默认为12
 * @param {String} [url] 图片标记符号url路径
 * @param {Number} [width = 12] 图片标记符号宽度，默认为12像素
 * @param {Number} [xoffset = 0] 图片标记符号x偏移，默认为0像素
 * @param {Number} [yoffset = 0] 图片标记符号y偏移，默认为0像素
 */
export default class PictureMarkerSymbol extends MarkerSymbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { angle = 0, height = 12, url = undefined, width = 12 } = options;
        const { xoffset = 0, yoffset = 0 } = options;
        this.type = 'picture-marker';

        this.angle = angle;
        this.height = height;
        this.url = url;
        this.width = width;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
    }

    /**
     * @description 克隆函数
     */
    clone() {
        return cloneDeep(this);
    }

    /**
     * @description 将JSON格式的符号转换为JS对象
     * @param {Object} json 符号的实例化JSON
     */
    fromJSON(json) {
        json = json || {};
        const { type = 'picture-marker' } = json;
        const { opacity = 1.0 } = json;
        const { angle = 0, height = 12, url = undefined, width = 12 } = options;
        const { xoffset = 0, yoffset = 0 } = options;

        // 基类属性Symbol.fromJSON
        this.opacity = opacity;

        // 父类属性MarkerSymbol.fromJSON
        this.angle = angle;
        this.xoffset = xoffset;
        this.yoffset = yoffset;

        // 自身属性
        this.type = type;
        this.height = height;
        this.width = width;
        this.url = url;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            angle: this.angle,
            height: this.height,
            url: this.url,
            width: this.width,
            xoffset: this.xoffset,
            yoffset: this.yoffset
        };
    }
}

export { PictureMarkerSymbol };
mapgis.symbols.PictureMarkerSymbol = PictureMarkerSymbol;
