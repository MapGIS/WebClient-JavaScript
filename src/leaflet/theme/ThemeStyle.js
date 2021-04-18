import {Zondy} from '../../service/common/Base';
import {extend} from '../../service/common/Util';

/**
 * @class Zondy.Map.ThemeStyle
 * @classdesc 客户端专题图风格类。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.fill=true] - 是否填充，不需要填充则设置为 false。如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
 * @param {string} [options.fillColor='#000000'] - 十六进制填充颜色。
 * @param {number} [options.fillOpacity=1] - 填充不透明度。取值范围[0, 1]。
 * @param {boolean} [options.stroke=false] -  是否描边，不需要描边则设置为false。如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
 * @param {string} [options.strokeColor='#000000'] - 十六进制描边颜色。
 * @param {number} [options.strokeOpacity=1] - 描边的不透明度。取值范围[0, 1]。
 * @param {number} [options.strokeWidth=1] - 线宽度/描边宽度。
 * @param {string} [options.strokeLinecap='butt'] - 线帽样式。strokeLinecap 有三种类型 “butt", "round", "square"。
 * @param {string} [options.strokeLineJoin='iter'] - 线段连接样式。strokeLineJoin 有三种类型 “miter", "round", "bevel"。
 * @param {string} [options.strokeDashstyle='solid'] - 虚线类型。strokeDashstyle 有八种类型 “dot",“dash",“dashdot",“longdash",“longdashdot",“solid", "dashed", "dotted"。solid 表示实线。
 * @param {number} [options.pointRadius=6] - 点半径,单位为像素。
 * @param {number} [options.shadowBlur=0] - 阴影模糊度，（大于 0 有效;）。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
 * @param {string} [options.shadowColor='#000000'] - 阴影颜色。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
 * @param {number} [options.shadowOffsetX=0] - 阴影 X 方向偏移值。
 * @param {number} [options.shadowOffsetY=0] - 阴影 Y 方向偏移值。
 * @param {string} options.label - 专题要素附加文本标签内容。
 * @param {string} [options.fontColor] - 附加文本字体颜色。
 * @param {number} [options.fontSize=12] - 附加文本字体大小,单位是像素。
 * @param {string} [options.fontStyle='normal'] - 附加文本字体样式。可设值："normal", "italic", "oblique"。
 * @param {string} [options.fontVariant='normal'] - 附加文本字体变体。可设值："normal", "small-caps"。
 * @param {string} [options.fontWeight='normal'] - 附加文本字体粗细。可设值："normal", "bold", "bolder", "lighter"。
 * @param {string} [options.fontFamily='arial,sans-serif'] - 附加文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，
 *                             浏览器会使用它可识别的第一个可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称
 *                              （"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。
 * @param {string} [options.labelPosition='top'] - 附加文本位置, 可以是 'inside', 'left', 'right', 'top', 'bottom'。
 * @param {string} [options.labelAlign='center'] - 附加文本水平对齐。可以是 'left', 'right', 'center'。
 * @param {string} [options.labelBaseline='middle'] - 附加文本垂直对齐。 可以是 'top', 'bottom', 'middle' 。
 * @param {number} [options.labelXOffset=0] - 附加文本在x轴方向的偏移量。
 * @param {number} [options.labelYOffset=0] - 附加文本在y轴方向的偏移量。
 */
class ThemeStyle {

    constructor(options) {
        options = options || {};
        /**
         * @member {boolean} [Zondy.Map.ThemeStyle.prototype.fill=true]
         * @description 是否填充，不需要填充则设置为 false。如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
         */
        this.fill = true;
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.fillColor="#000000"]
         * @description 十六进制填充颜色。
         */
        this.fillColor = "#000000";
        /**
         *  @member {number} [Zondy.Map.ThemeStyle.prototype.fillOpacity=1]
         *  @description 填充不透明度。取值范围[0, 1]。
         */
        this.fillOpacity = 1;
        /**
         * @member {boolean} [Zondy.Map.ThemeStyle.prototype.stroke=false]
         * @description  是否描边，不需要描边则设置为false。如果 fill 与 stroke 同时为 false，将按 fill 与 stroke 的默认值渲染图层。
         */
        this.stroke = false;
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.strokeColor="#000000"]
         * @description  十六进制描边颜色。
         */
        this.strokeColor = "#000000";
        /**
         * @member {number} [Zondy.Map.ThemeStyle.prototype.strokeOpacity=1]
         * @description  描边的不透明度。取值范围[0, 1]。
         */
        this.strokeOpacity = 1;
        /**
         * @member {number} [Zondy.Map.ThemeStyle.prototype.strokeWidth=1]
         * @description  线宽度/描边宽度。
         */
        this.strokeWidth = 1;
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.strokeLinecap="butt"]
         * @description  线帽样式；strokeLinecap 有三种类型 “butt", "round", "square" 。
         */
        this.strokeLinecap = "butt";
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.strokeLineJoin="miter"]
         * @description  线段连接样式；strokeLineJoin 有三种类型 “miter", "round", "bevel"。
         */
        this.strokeLineJoin = "miter";
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.strokeDashstyle="solid"]
         * @description   虚线类型； strokeDashstyle 有八种类型 “dot",“dash",“dashdot",“longdash",“longdashdot",“solid", "dashed", "dotted";
         * solid 表示实线。
         */
        this.strokeDashstyle = "solid";
        /**
         * @member {number} [Zondy.Map.ThemeStyle.prototype.pointRadius=6]
         * @description   点半径。单位为像素。
         */
        this.pointRadius = 6;
        /**
         * @member {number} [Zondy.Map.ThemeStyle.prototype.shadowBlur=0]
         * @description   阴影模糊度，（大于 0 有效）。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
         */
        this.shadowBlur = 0;
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.shadowColor='#000000']
         * @description  阴影颜色。注：请将 shadowColor 属性与 shadowBlur 属性一起使用，来创建阴影。
         */
        this.shadowColor = "#000000";
        /**
         * @member {number} [Zondy.Map.ThemeStyle.prototype.shadowOffsetX=0]
         * @description 阴影 X 方向偏移值。
         */
        this.shadowOffsetX = 0;
        /**
         * @member {number} Zondy.Map.ThemeStyle.prototype.shadowOffsetY
         * @description Y 方向偏移值。
         */
        this.shadowOffsetY = 0;
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.label]
         * @description 专题要素附加文本标签内容。
         */
        this.label = "";
        /**
         * @member {boolean} [Zondy.Map.ThemeStyle.prototype.labelRect=false]
         * @description 是否显示文本标签矩形背景。
         */
        this.labelRect = false;
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.fontColor]
         * @description 附加文本字体颜色。
         */
        this.fontColor = "";
        /**
         * @member {number} [Zondy.Map.ThemeStyle.prototype.fontSize=12]
         * @description 附加文本字体大小,单位是像素。
         */
        this.fontSize = 12;
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.fontStyle="normal"]
         * @description 附加文本字体样式。可设值："normal", "italic", "oblique"。
         */
        this.fontStyle = "normal";
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.fontVariant="normal"]
         * @description 附加文本字体变体。可设值："normal", "small-caps"。
         */
        this.fontVariant = "normal";
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.fontWeight="normal"]
         * @description 附加文本字体粗细。可设值："normal", "bold", "bolder", "lighter"。
         */
        this.fontWeight = "normal";
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.fontFamily="arial,sans-serif"]
         * @description 附加文本字体系列。fontFamily 值是字体族名称或/及类族名称的一个优先表，每个值逗号分割，浏览器会使用它可识别的第一个
         * 可以使用具体的字体名称（"times"、"courier"、"arial"）或字体系列名称（"serif"、"sans-serif"、"cursive"、"fantasy"、"monospace"）。
         */
        this.fontFamily = "arial,sans-serif";
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.labelPosition='top']
         * @description 附加文本位置, 可以是 'inside', 'left', 'right', 'top', 'bottom'。
         */
        this.labelPosition = "top";
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.labelAlign='center']
         * @description 附加文本水平对齐。可以是 'left', 'right', 'center'。
         */
        this.labelAlign = "center";
        /**
         * @member {string} [Zondy.Map.ThemeStyle.prototype.labelBaseline='middle']
         * @description  附加文本垂直对齐。 可以是 'top', 'bottom', 'middle'。
         */
        this.labelBaseline = "middle";
        /**
         * @member {number} [Zondy.Map.ThemeStyle.prototype.labelXOffset=0]
         * @description  附加文本在 X 轴方向的偏移量。
         */
        this.labelXOffset = 0;
        /**
         * @member {number} [Zondy.Map.ThemeStyle.prototype.labelYOffset=0]
         * @description 附加文本在 Y 轴方向的偏移量。
         */
        this.labelYOffset = 0;

        extend(this, options);
    }
}

export {ThemeStyle};
Zondy.Map.ThemeStyle = ThemeStyle;
