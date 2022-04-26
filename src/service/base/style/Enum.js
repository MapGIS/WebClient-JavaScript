/**
 * @enum MarkStyle
 * @description 标注样式
 */
export const MarkStyle = {
    circle: 'circle',
    cross: 'cross',
    diamond: 'diamond',
    square: 'square',
    triangle: 'triangle',
    x: 'x'
};

/**
 * @enum LineStyle
 * @description 标注样式
 */
export const LineStyle = {
    dash: 'dash',
    'dash-dot': 'dash-dot',
    dot: 'dot',
    'long-dash': 'long-dash',
    'long-dash-dot': 'long-dash-dot',
    'long-dash-dot-dot': 'long-dash-dot-dot',
    none: 'none',
    'short-dash': 'short-dash',
    'short-dash-dot': 'short-dash-dot',
    'short-dash-dot-dot': 'short-dash-dot-dot',
    'short-dot': 'short-dot',
    solid: 'solid'
};

/**
 * @enum LineMarkerStyle
 * @description 线样式
 */
export const LineMarkerStyle = {
    arrow: 'arrow',
    circle: 'circle',
    square: 'square',
    diamond: 'diamond',
    cross: 'cross',
    x: 'x'
};

/**
 * @enum FillStyle
 * @description 填充样式
 */
export const FillStyle = {
    'backward-diagonal': 'backward-diagonal',
    cross: 'cross',
    'diagonal-cross': 'diagonal-cross',
    'forward-diagonal': 'forward-diagonal',
    horizontal: 'horizontal',
    none: 'none',
    solid: 'solid',
    vertical: 'vertical'
};

/**
 * @enum FontStyle
 * @description 字体样式
 */
export const FontStyle = {
    normal: 'normal',
    italic: 'italic',
    oblique: 'oblique'
};

/**
 * @enum FontWeight
 * @description 字体权重
 */
export const FontWeight = {
    normal: 'normal',
    bold: 'bold',
    bolder: 'bolder',
    lighter: 'lighter'
};

/**
 * @enum FontDecoration
 * @description 字体权重
 */
export const FontDecoration = {
    underline: 'underline',
    'line-through': 'line-through',
    none: 'none'
};

/**
 * @enum HorizontalAlignment
 * @description 水平对齐方向
 */
export const HorizontalAlignment = {
    left: 'left',
    center: 'center',
    right: 'right'
};

/**
 * @enum VerticalAlignment
 * @description 竖直对齐方向
 */
export const VerticalAlignment = {
    baseline: 'baseline',
    top: 'top',
    middle: 'middle',
    bottom: 'bottom'
};

/**
 * @enum Cap
 * @description 线头类型
 */
export const Cap = {
    /**
     * 尖头
     */
    butt: 'butt',
    /**
     * 圆头
     */
    round: 'round',
    /**
     * 平头
     */
    square: 'square',
    /**
     * 无，仅三维生效
     */
    none: 'none'
};

/**
 * @enum Join
 * @description 拐角类型
 */
export const Join = {
    /**
     * 平拐
     */
    bevel: 'bevel',
    /**
     * 圆拐
     */
    round: 'round',
    /**
     * 棱拐
     */
    miter: 'miter'
};

/**
 * @enum LineMarkerPlacement
 * @description 标记线标记点位置
 */
export const LineMarkerPlacement = {
    begin: 'begin',
    end: 'end',
    'begin-end': 'begin-end'
};

/**
 * @enum Anchor
 * @description 锚点方向
 */
export const Anchor = {
    center: 'center',
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
    'top-left': 'top-left',
    'top-right': 'top-right',
    'bottom-left': 'bottom-left',
    'bottom-right': 'bottom-right',
    origin: 'origin',
    relative: 'relative'
};
/**
 * @enum Align
 * @description 对齐方向
 */
export const Align = {
    left: 'left',
    center: 'center',
    right: 'right'
};

/**
 * @enum TextPlacement
 * @description 文字方向 mapboxgl引擎特有属性
 */
export const TextPlacement = {
    /**
     * 中心点/静态注记
     */
    point: 'point',
    /**
     * 动态注记-沿线方向
     */
    line: 'line'
};
