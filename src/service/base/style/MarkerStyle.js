import { extend } from '../Util';
import { mapgis } from '../Base';
import { VectorStyle } from './VectorStyle';
import { SymbolStyle } from './SymbolStyle';

/**
 * 点样式
 * @class mapgis.style.PointStyle
 * @classdesc 点样式
 * @param {Number} [symbol] 符号样式
 */
export default class MarkerStyle extends VectorStyle {
    constructor(option) {
        super();
        var options = option ? option : {};
        const { symbol } = option;
        this.symbol = symbol || new SymbolStyle();
        extend(this, options);
    }
}

export { MarkerStyle };
mapgis.style.MarkerStyle = MarkerStyle;
