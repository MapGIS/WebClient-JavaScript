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
    dash_dot: 'dash-dot',
    dot: 'dot',
    long_dash: 'long-dash',
    long_dash_dot: 'long-dash-dot',
    long_dash_dot_dot: 'long-dash-dot-dot',
    none: 'none',
    short_dash: 'short-dash',
    short_dash_dot: 'short-dash-dot',
    short_dash_dot_dot: 'short-dash-dot-dot',
    short_dot: 'short-dot',
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
    backward_diagonal: 'backward-diagonal',
    cross: 'cross',
    diagonal_cross: 'diagonal-cross',
    forward_diagonal: 'forward-diagonal',
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
    square: 'square'
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
    begin_end: 'begin-end'
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
    'bottom-right': 'bottom-right'
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
