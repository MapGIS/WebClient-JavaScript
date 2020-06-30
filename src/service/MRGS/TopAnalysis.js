import {
    Zondy
} from '../common/Base';
import {
    GeometryAnalysisBase
} from "./GeometryAnalysisBase";
import {
    IgsServiceBase
} from "../baseserver/IServiceBase";
import {
    GPoint
} from "../common/GPoint";
import {
    GLine
} from "../common/GLine";
import {
    GRegion
} from "../common/GRegion";
import {
    getTopAnalysisResult
} from "../common/Util";

/**
 * 拓扑分析类,您只应该对pnt,line,reg3个属性中的一个赋值
 * @class module:量算服务.TopAnalysis
 * @classdesc Zondy.Service.TopAnalysis 拓扑分析类,您只应该对pnt,line,reg3个属性中的一个赋值
 * @extends Zondy.Service.GeometryAnalysisBase
 * @param {Object} option 属性键值对
 * @param {Zondy.Object.GPoint} [option.pnt = null] 需要设置的点类型
 * @param {Zondy.Object.GLine} [option.line = null] 需要设置的线类型
 * @param {Zondy.Object.GRegion} [option.reg = null] 需要设置的区类型
 * @param {Number} [option.nearDis = 0.01]  分析半径
 * @param {Zondy.Object.GRegion} [option.relativeObj = null] 相对对象
 * @param {function} [option.p_onSuccess = null] 回调函数
 * @example
 //创建线几何对象
 var lineObj = new Zondy.Object.GLine(
 new Zondy.Object.AnyLine([new Zondy.Object.Arc
 ([
 new Zondy.Object.Point2D(114.40, 30.60),
 new Zondy.Object.Point2D(114.45, 30.20)
 ])
 ])
 );
 //创建区几何对象
 var regionObj = new Zondy.Object.GRegion([
 new Zondy.Object.AnyLine([new Zondy.Object.Arc([
 new Zondy.Object.Point2D(114.301586, 30.533613),
 new Zondy.Object.Point2D(114.301586, 30.396517),
 new Zondy.Object.Point2D(114.544453, 30.396517),
 new Zondy.Object.Point2D(114.444453, 30.533613),
 new Zondy.Object.Point2D(114.401586, 30.533613)
 ])
 ])
 ]);
 //初始化TopAnalysis类
 var topService = new Zondy.Service.TopAnalysis({
                    //IP地址
                    ip: "develop.smaryun.com",
                    //端口号
                    port: "6163"
                });
 //调用setLine方法，设置线类型
 topService.setLine(lineObj);
 //调用setRelativeObj方法，设置拓扑分析参照物
 topService.setRelativeObj(regionObj);
 //设置拓扑分析半径
 topService.nearDis = "0.05";
 topService.execute(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
 */
class TopAnalysis extends GeometryAnalysisBase {
    constructor(option) {
        var options = option ? option : {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.TopAnalysis.prototype.pnt
         * @type {Zondy.Service.GPoint}
         * @description 需要设置的点类型
         * @default null
         */
        this.pnt = options.pnt !== undefined ? options.pnt : null;

        /**
         * @private
         * @member Zondy.Service.TopAnalysis.prototype.line
         * @type {Zondy.Service.GLine}
         * @description 步长，插值时的间隔步长
         * @default null
         */
        this.line = options.line !== undefined ? options.line : null;

        /**
         * @private
         * @member Zondy.Service.TopAnalysis.prototype.reg
         * @type {Zondy.Service.GRegion}
         * @description 步长，插值时的间隔步长
         * @default null
         */
        this.reg = options.reg !== undefined ? options.reg : null;

        /**
         * @private
         * @member Zondy.Service.TopAnalysis.prototype.nearDis
         * @type {Number}
         * @description 分析半径
         * @default 0.01
         */
        this.nearDis = options.nearDis !== undefined ? options.nearDis : 0.01;

        /**
         * @private
         * @member Zondy.Service.TopAnalysis.prototype.relativeObj
         * @type {Zondy.Object.GRegion}
         * @description 相对对象
         * @default null
         */
        this.relativeObj = options.relativeObj !== undefined ? options.relativeObj : null;

        /**
         * @private
         * @member Zondy.Service.TopAnalysis.prototype.p_onSuccess
         * @type {function}
         * @description 回调函数
         * @default null
         */
        this.p_onSuccess = options.p_onSuccess !== undefined ? options.p_onSuccess : null;
    }

    /**
     * @function Zondy.Service.TopAnalysis.prototype.setPnt
     * @description 设置点类型
     * @param {Zondy.Object.GPoint} pnt 需要设置的点类型
     */
    setPnt(pnt) {
        this.pnt = pnt;
    }

    /**
     * @function Zondy.Service.TopAnalysis.prototype.setLine
     * @description 设置线类型
     * @param {Zondy.Object.GLine} line 需要设置的线类型
     */
    setLine(line) {
        this.line = line;
    }

    /**
     * @function Zondy.Service.TopAnalysis.prototype.setReg
     * @description 设置区类型
     * @param {Zondy.Object.GRegion} reg 需要设置的区类型
     */
    setReg(reg) {
        this.reg = reg;
    }

    /**
     * @function Zondy.Service.TopAnalysis.prototype.setReg
     * @description 设置拓扑分析的相对参照物
     * @param {Zondy.Object.GRegion} obj 相对参照物
     */
    setRelativeObj(obj) {
        this.relativeObj = obj;
    }

    /**
     * @function Zondy.Service.TopAnalysis.prototype.onGetRltSuccess
     * @description 这里应该还需对返回结果解析（2018/01/30）
     * @param {Number} enumNum 缺少注释，请联系IGServer部门
     */
    onGetRltSuccess(enumNum) {
        var rlt = getTopAnalysisResult(enumNum);
        this.p_onSuccess(rlt);
    }

    /**
     * @function Zondy.Service.TopAnalysis.prototype.execute
     * @description 执行拓扑分析
     * @param {callback} onSuccess 执行成功后的回调函数
     * @param {callback} onError 执行失败后的回调函数
     */
    execute(onSuccess, onError) {
        var me = this;
        me.p_onSuccess = onSuccess;
        var postObj = {};
        postObj.NearDis = this.nearDis;
        postObj.Pnt = this.pnt;
        postObj.Line = this.line;
        postObj.Reg = this.reg;
        postObj.RelativeObj = this.relativeObj;
        me.partUrl = "geomservice/topanalysis?f=json";
        var url = me.getFullUrl();
        var me = this;
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: me.onGetRltSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(postObj),
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        });
    }
}
export {
    TopAnalysis
};
Zondy.Service.TopAnalysis = TopAnalysis;