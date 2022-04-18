import { mapgis } from '../common/base';
import { cloneDeep } from 'lodash';

import { FillSymbol } from './FillSymbol';
import SimpleLineSymbol from './SimpleLineSymbol';

/**
 * 简单标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.PointStyle
 * @classdesc 图片填充符号
 * @param {String} [type = 'picture-fill'] 简单填充符号类型，只能是picture-fill
 * @param {Number} [height=12] 简单填充符号颜色，默认为12
 * @param {SimpleLineSymbol} [outline] 简单填充符号轮廓
 * @param {String} [url] 简单填充符号颜色
 * @param {Number} [width=12] 简单填充符号颜色，默认为12
 * @param {Number} [xoffset=0] 简单填充符号颜色，默认为0
 * @param {Number} [xscale=1] 简单填充符号颜色，默认为1
 * @param {Number} [yoffset=0] 简单填充符号颜色，默认为0
 * @param {Number} [yscale=1] 简单填充符号颜色，默认为1
 */
export default class PictureFillSymbol extends FillSymbol {
    constructor(option) {
        super(option);
        var options = option ? option : {};
        const { outline = undefined, height = 12, width = 12 } = options;
        const { xoffset = 0, xscale = 1, yoffset = 0, yscale = 1 } = options;

        this.type = 'picture-fill';

        this.height = height;
        this.outline = outline;
        this.url = url;
        this.width = width;
        this.xoffset = xoffset;
        this.xscale = xscale;
        this.yoffset = yoffset;
        this.yscale = yscale;
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
        const { type = 'picture-fill' } = json;
        const { opacity = 1 } = json;
        const { outline = undefined, height = 12, width = 12 } = json;
        const { xoffset = 0, xscale = 1, yoffset = 0, yscale = 1 } = json;

        // 基类属性Symbol.fromJSON
        this.opacity = opacity;

        // 父类属性MarkerSymbol.fromJSON
        this.outline = outline;

        // 自身属性
        this.type = type;
        this.height = height;
        this.url = url;
        this.width = width;
        this.xoffset = xoffset;
        this.xscale = xscale;
        this.yoffset = yoffset;
        this.yscale = yscale;
    }

    /**
     * 将JS对象转换为JSON格式
     * @returns {Object} 符号的实例化JSON
     */
    toJSON() {
        return {
            type: this.type,
            height: this.height,
            outline: this.outline,
            url: this.url,
            width: this.width,
            xoffset: this.xoffset,
            xscale: this.xscale,
            yoffset: this.yoffset,
            yscale: this.yscale
        };
    }
}

export { PictureFillSymbol };
mapgis.symbols.PictureFillSymbol = PictureFillSymbol;
