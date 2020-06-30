import {Zondy} from './Base';
import {extend}  from  "./Util";
import {GPoint}  from  "./GPoint";
import {GLine}  from  "./GLine";
import {GRegion}  from  "./GRegion";

/**
 *
 * 要素几何信息对象
 * @class Zondy.Object.FeatureGeometry
 * @classdesc 要素几何信息对象
 * @param {Object} option 属性键值对
 * @param {Array} [option.PntGeom = null] 点几何信息 Array<Zondy.Object.GPoint>
 * @param {Array} [option.LinGeom = null] 线几何信息 Array<Zondy.Object.GLine>
 * @param {Array} [option.RegGeom = null] 区几何信息 Array<Zondy.Object.GRegion>
 */
var FeatureGeometry = function (option) {
    var options = (option !== undefined) ? option : {};
    extend(this, options);

    /**
     * @member Zondy.Object.FeatureGeometry.prototype.PntGeom
     * @type {Array}
     * @description 点几何信息 Array<{@link Zondy.Object.GPoint}>
     * @default 0
     */
    this.PntGeom = (options.PntGeom !== undefined && options.PntGeom !== null) ? options.PntGeom : null;

    /**
     * @member Zondy.Object.FeatureGeometry.prototype.LinGeom
     * @type {Array}
     * @description 线几何信息 Array<{@link Zondy.Object.GLine}>
     * @default 0
     */
    this.LinGeom = (options.LinGeom !== undefined && options.LinGeom !== null) ? options.LinGeom : null;

    /**
     * @member Zondy.Object.FeatureGeometry.prototype.RegGeom
     * @type {Array}
     * @description 区几何信息 Array<{@link Zondy.Object.GRegion}>
     * @default 0
     */
    this.RegGeom = (options.RegGeom !== undefined && options.RegGeom !== null) ? options.RegGeom : null;

};


/**
 * @function Zondy.Object.FeatureGeometry.prototype.setPntGeom
 * @description 设置点几何
 * @param {Array} [pnts= null] 点几何数组 {@link Zondy.Object.GPoint}
 */
FeatureGeometry.prototype.setPntGeom = function (pnts) {
    this.PntGeom = ((pnts !== undefined && pnts !== null) && Array.isArray(pnts)) ? pnts : null;
};

/**
 * @function Zondy.Object.FeatureGeometry.prototype.setLine
 * @description 设置线几何
 * @param {Array} [lines= null] 线几何数组 {@link Zondy.Object.GLine}
 */
FeatureGeometry.prototype.setLine = function (lines) {
    this.LinGeom = ((lines !== undefined && lines !== null) && Array.isArray(lines)) ? lines : null;
};

/**
 * @function Zondy.Object.FeatureGeometry.prototype.setRegGeom
 * @description 设置区几何
 * @param {Array} [regs= null] 区几何数组 {@link Zondy.Object.GRegion}
 */
FeatureGeometry.prototype.setRegGeom = function (regs) {
    this.RegGeom = ((regs !== undefined && regs !== null) && Array.isArray(regs)) ? regs : null;
};

export {FeatureGeometry};
Zondy.Object.FeatureGeometry = FeatureGeometry;