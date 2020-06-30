import {
    Zondy
} from '../common/Base';
import {
    extend
} from "../common/Util";

/**
 * 投影转换空间参数类
 * @class  module:量算服务.CProjectParam
 * @classdesc Zondy.Service.CProjectParam 投影转换空间参数类
 * @param {Object} option
 * @param {Number} [option.ProjAngleUnit = 0] 角度单位
 * @param {Number} [option.ProjLat = 0.00] 投影原点纬度
 * @param {Number} [option.ProjLat1 = 0.00] 第一标准维度
 * @param {Number} [option.ProjLat2 = 0.00] 第二标准维度
 * @param {Number} [option.ProjLon = 0.00] 中央子午线经度
 * @param {Number} [option.ProjRate = 0.00] 水平比例尺
 * @param {Number} [option.ProjType = 0] 坐标系类型
 * @param {Number} [option.ProjTypeID = 0] 投影类型
 * @param {Number} [option.ProjUnit = 0] 长度单位
 * @param {Number} [option.ProjZoneNO = 0] 投影带号
 * @param {Number} [option.ProjZoneType = 0] 投影分带类型
 * @param {Number} [option.SphereID = 0] 椭球体参数
 */
var CProjectParam = function (option) {

    var options = option ? option : {};

    extend(this, options);

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjAngleUnit
     * @type {Number}
     * @description 角度单位
     * @default 0
     */
    this.ProjAngleUnit = options.ProjAngleUnit !== undefined ? options.ProjAngleUnit : 0;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjLat
     * @type {Number}
     * @description 投影原点纬度
     * @default 0.00
     */
    this.ProjLat = options.ProjLat !== undefined ? options.ProjLat : 0.00;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjLat1
     * @type {Number}
     * @description 第一标准维度
     * @default 0.00
     */
    this.ProjLat1 = options.ProjLat1 !== undefined ? options.ProjLat1 : 0.00;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjLat2
     * @type {Number}
     * @description 第二标准维度
     * @default 0.00
     */
    this.ProjLat2 = options.ProjLat2 !== undefined ? options.ProjLat2 : 0.00;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjLon
     * @type {Number}
     * @description 中央子午线经度
     * @default 0.00
     */
    this.ProjLon = options.ProjLon !== undefined ? options.ProjLon : 0.00;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjRate
     * @type {Number}
     * @description 水平比例尺
     * @default 0.00
     */
    this.ProjRate = options.ProjRate !== undefined ? options.ProjRate : 0.00;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjType
     * @type {Number}
     * @description 坐标系类型
     * @default 0
     */
    this.ProjType = options.ProjType !== undefined ? options.ProjType : 0;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjTypeID
     * @type {Number}
     * @description 投影类型
     * @default 0
     */
    this.ProjTypeID = options.ProjTypeID !== undefined ? options.ProjTypeID : 0;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjUnit
     * @type {Number}
     * @description 长度单位
     * @default 0
     */
    this.ProjUnit = options.ProjUnit !== undefined ? options.ProjUnit : 0;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjZoneNO
     * @type {Number}
     * @description 投影带号
     * @default 0
     */
    this.ProjZoneNO = options.ProjZoneNO !== undefined ? options.ProjZoneNO : 0;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.ProjZoneType
     * @type {Number}
     * @description 投影分带类型
     * @default 0
     */
    this.ProjZoneType = options.ProjZoneType !== undefined ? options.ProjZoneType : 0;

    /**
     * @private
     * @member Zondy.Service.CProjectParam.prototype.SphereID
     * @type {Number}
     * @description 椭球体参数
     * @default 0
     */
    this.SphereID = options.SphereID !== undefined ? options.SphereID : 0;
};
export {
    CProjectParam
};
Zondy.Service.CProjectParam = CProjectParam;