import { mapgis } from '../common/base';

import { LineMarkerStyle, LineMarkerPlacement } from './Enum';

/**
 * 标记符号
 * @author 基础平台-潘卓然
 * @class mapgis.symbols.LineSymbolMarker
 * @classdesc 线符号标记
 * @param {String} [type = 'line-marker'] marker类型:只能是'line-marker'
 * @param {String} [color = 'rgb(0,0,0)'] 线符号标记颜色，默认为'rgb(0,0,0)'
 * @param {Number} [placement = "begin-end"] 线符号标记摆放位置，"begin"|"end"|"begin-end"
 * @param {LineMarkerStyle} [style = 'arrow'] 线符号标记样式，可选值"arrow"|"circle"|"square"|"diamond"|"cross"|"x"
 */
export default class LineSymbolMarker {
    constructor(option) {
        var options = option ? option : {};
        const { color = 'rgb(0,0,0)', placement = LineMarkerPlacement.begin_end, style = LineMarkerStyle.arrow } = options;
        this.type = 'line-marker';
        this.color = color;
        this.placement = placement;
        this.style = style;
    }
}

export { LineSymbolMarker };
mapgis.symbols.LineSymbolMarker = LineSymbolMarker;
