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
 * @enum LineCap
 * @description 线头类型
 */
export const LineCap = {
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
 * @enum LineJoin
 * @description 拐角类型
 */
export const LineJoin = {
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
 * @enum TextPlacement
 * @description 文字方向
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
