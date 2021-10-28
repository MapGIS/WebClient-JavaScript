import { extend } from '../../common/Util';
import { mapgis } from '../common/base';
import { VectorStyle } from './VectorStyle';
import { Anchor } from './Enum';

/**
 * 模型样式
 * @class mapgis.style.ModelStyle
 * @classdesc 模型样式
 * @param {Number} [radius = 1] 半径
 * @param {Number} [outlineWidth = 0] 外边线宽度，默认0，没有外边线
 * @param {String} [outlineColor = #FFFFFF] 外边线颜色，16进制颜色或rgb值或rgba值，默认#FFFFFF，白色
 * @param {String} [anchor = center] 锚点，默center
 */
export default class ModelStyle extends VectorStyle {
    constructor(option) {
        super();
        let options = option ? option : {};
        const { scale = 1, url } = options;
        this.type = 'model';
        this.url = url;
        this.scale = scale;
        extend(this, options);
    }

    toMapboxStyle() {
    }

    /**
     * @link https://sandcastle.cesium.com/index.html?src=Circles%20and%20Ellipses.html&label=Geometries
     * @returns Cesium点格式的样式
     */
    toCesiumStyle(Cesium) {
        let { url, scale } = this;
        return {
            uri: url,
            scale: scale
        };
    }
}

export { ModelStyle };
mapgis.style.ModelStyle = ModelStyle;
