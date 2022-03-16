import { Zondy } from './Base';
import { extend } from './Util';
import { DynShowStyle } from './DynShowStyle';

/**
 * 地图文档显示样式对象
 * @class Zondy.Object.CDisplayStyle
 * @classdesc 地图文档显示样式对象构造函数
 * @param {Object} option 属性键值对
 * @param {Boolean} [option.AnnSizeFixed = false] 注记符号大小固定
 * @param {Number} [option.DriverQuality = 0] 图像质量,可选值为：1（低）、2（中）、3（高）
 * @param {Boolean} [option.DynProjFlag = false] 是否动态投影
 * @param {Boolean} [option.FollowScale = false] 符号是否跟随显示放大（该属性已过时，请使用各个要素类的大小固定及线宽固定）
 * @param {Boolean} [option.LinPenWidFixed = false] 线状符号线宽固定
 * @param {Boolean} [option.LinSizeFixed = false] 线状符号大小固定
 * @param {Boolean} [option.PntPenWidFixed = false] 点状符号线宽固定
 * @param {Boolean} [option.PntSizeFixed = false] 点状符号大小固定
 * @param {Boolean} [option.RegPenWidFixed = false] 填充符号线宽固定
 * @param {Boolean} [option.RegSizeFixed = false] 填充符号大小固定
 * @param {Boolean} [option.ShowCoordPnt = false] 显示坐标点
 * @param {Boolean} [option.ShowElemRect = false] 显示元素的外包矩形
 * @param {Array} [option.ShowStyle = null] 图层显示参数 Array,  {@link Zondy.Object.DynShowStyle}
 * @param {Array} [option.LayerStyles = null] 图层显示参数 Map,  {@link Zondy.Object.DynShowStyle}
 * @param {Boolean} [option.SymbleShow = false] 是否进行还原显示
 * @see Zondy.Service.GetDocImageService
 * @example 
 * var layerStyle = new Zondy.Object.DynShowStyle({
                    Alpha: 50
                });
                var style = new Zondy.Object.CDisplayStyle({
                    LayerStyles: {
                        0: layerStyle,
                        1: layerStyle,
                        '2-0': layerStyle
                    }
                });
 */
var CDisplayStyle = function (option) {
    var options = option !== undefined ? option : {};
    extend(this, options);

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.AnnSizeFixed
     * @type {Boolean}
     * @description 注记符号大小固定
     * @default false
     */
    this.AnnSizeFixed = options.AnnSizeFixed !== undefined ? options.AnnSizeFixed : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.DriverQuality
     * @type {Number}
     * @description 图像质量</summary>可选值为：1（低）、2（中）、3（高）
     * @default 0
     */
    this.DriverQuality = options.DriverQuality !== undefined ? options.DriverQuality : 0;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.DynProjFlag
     * @type {Boolean}
     * @description 是否动态投影
     * @default false
     */
    this.DynProjFlag = options.DynProjFlag !== undefined ? options.DynProjFlag : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.FollowScale
     * @type {Boolean}
     * @description 符号是否跟随显示放大（该属性已过时，请使用各个要素类的大小固定及线宽固定）
     * @default false
     */
    this.FollowScale = options.FollowScale !== undefined ? options.FollowScale : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.LinPenWidFixed
     * @type {Boolean}
     * @description 线状符号线宽固定
     * @default false
     */
    this.LinPenWidFixed = options.LinPenWidFixed !== undefined ? options.LinPenWidFixed : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.LinSizeFixed
     * @type {Boolean}
     * @description 线状符号大小固定
     * @default false
     */
    this.LinSizeFixed = options.LinSizeFixed !== undefined ? options.LinSizeFixed : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.PntPenWidFixed
     * @type {Boolean}
     * @description 点状符号线宽固定
     * @default false
     */
    this.PntPenWidFixed = options.PntPenWidFixed !== undefined ? options.PntPenWidFixed : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.PntSizeFixed
     * @type {Boolean}
     * @description 点状符号大小固定
     * @default false
     */
    this.PntSizeFixed = options.PntSizeFixed !== undefined ? options.PntSizeFixed : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.RegPenWidFixed
     * @type {Boolean}
     * @description 填充符号线宽固定
     * @default false
     */
    this.RegPenWidFixed = options.RegPenWidFixed !== undefined ? options.RegPenWidFixed : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.RegSizeFixed
     * @type {Boolean}
     * @description 填充符号大小固定
     * @default false
     */
    this.RegSizeFixed = options.RegSizeFixed !== undefined ? options.RegSizeFixed : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.ShowCoordPnt
     * @type {Boolean}
     * @description 显示坐标点
     * @default false
     */
    this.ShowCoordPnt = options.ShowCoordPnt !== undefined ? options.ShowCoordPnt : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.ShowElemRect
     * @type {Boolean}
     * @description 显示元素的外包矩形
     * @default false
     */
    this.ShowElemRect = options.ShowElemRect !== undefined ? options.ShowElemRect : false;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.ShowStyle
     * @type {Array}
     * @description 图层显示参数Array<{@link Zondy.Object.DynShowStyle}>
     * @default null
     */
    this.ShowStyle = options.ShowStyle !== undefined ? options.ShowStyle : null;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.LayerStyles
     * @type {Map}
     * @description 图层显示参数Map<{@link Zondy.Object.DynShowStyle}>
     * @default null
     */
    this.LayerStyles = options.LayerStyles !== undefined ? options.LayerStyles : null;

    /**
     * @private
     * @member Zondy.Object.CDisplayStyle.prototype.SymbleShow
     * @type {Boolean}
     * @description 是否进行还原显示
     * @default false
     */
    this.SymbleShow = options.SymbleShow !== undefined ? options.SymbleShow : false;
};

export { CDisplayStyle };
Zondy.Object.CDisplayStyle = CDisplayStyle;
