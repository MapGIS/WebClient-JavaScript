import {
    Zondy
} from '../common/Base';
import {
    CGDBInfo
} from '../common/CGDBInfo';

/**
 * 用于进行SRSID投影的参数类
 * @class  module:量算服务.CProjectBySRSID
 * @classdesc Zondy.Service.CProjectBySRSID 用于进行SRSID投影的参数类
 * @param {Number} srsID 目标SRSID号
 * @param {Zondy.Object.CGDBInfo} gdbInfo 关于SRSID的GDB信息
 */
var CProjectBySRSID = function (srsID, gdbInfo) {
    /**
     * @private
     * @member Zondy.Service.CProjectBySRSID.prototype.SrsID
     * @type {Number}
     * @description 目标SRSID号
     * @default null
     */
    this.DesSrsID = srsID;

    /**
     * @private
     * @member Zondy.Service.CProjectBySRSID.prototype.GdbInfo
     * @type {Zondy.Object.CGDBInfo}
     * @description 关于SRSID的GDB信息
     * @default null
     */
    this.GdbInfo = gdbInfo;
};
export {
    CProjectBySRSID
};
Zondy.Service.CProjectBySRSID = CProjectBySRSID;