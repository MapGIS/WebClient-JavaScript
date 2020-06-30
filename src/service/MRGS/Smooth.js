import {
    Zondy
} from '../common/Base';
import {
    GeometryAnalysisBase
} from "./GeometryAnalysisBase";
import {
    Point2D
} from "../common/Point2D";
import {
    IgsServiceBase
} from "../baseserver/IServiceBase";

/**
 * 光滑线
 * @class  module:量算服务.Smooth
 * @classdesc Zondy.Service.Smooth 光滑线.插值方式:可取值0、1、2、3
 * @extends Zondy.Service.GeometryAnalysisBase
 * @param {Object} option 属性键值对
 * @param {Number} [option.type = 0] 0为二次样条、1为三次样条、2为三次Beizer样条、3为三次B样条
 * @param {Number} [option.step = 1] 步长，插值时的间隔步长
 * @example
 //设置原始线坐标数组
 var dataObject = [
 {
     "x": 64.3026761440958,
     "y": -13.3927768273516
 }, {
                        "x": 81.3250355929193,
                        "y": -8.44081771496663
                    }, {
                        "x": 72.9827194,
                        "y": 7.0129852
                    }, {
                        "x": 93.7049333738818,
                        "y": -2.86986371353349
                    }, {
                        "x": 90,
                        "y": 13.6363636363636
                    }, {
                        "x": 105.213348388672,
                        "y": 8.70024061203003
                    }
 ];
 //创建光滑线分析服务
 var smooth = new Zondy.Service.Smooth({
                        //插值方式,可取值0、1、2、3，0为二次样条、1为三次样条、2为三次Beizer样条、3为三次B样条
                        type: 2,
                        //插值时的间隔步长
                        step: 1,
                        //IGServer服务器地址
                        ip: "develop.smaryun.com",
                        //IGServer服务器端口
                        port: "6163"
                    }
 );
 //执行光滑线功能服务，并返回结果信息，onSuccess为回调函数
 smooth.execute(dataObject, function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
 */
class Smooth extends GeometryAnalysisBase {
    constructor(option) {
        var options = option ? option : {};
        super(options);

        /**
         * @private
         * @member Zondy.Service.Smooth.prototype.type
         * @type {Zondy.Service.CProjectParam}
         * @description 插值方式。可取值0、1、2、3 0为二次样条、1为三次样条、2为三次Beizer样条、3为三次B样条
         * @default 0
         */
        this.type = options.type !== undefined ? options.type : 0;

        /**
         * @private
         * @member Zondy.Service.Smooth.prototype.step
         * @type {Zondy.Service.CProjectParam}
         * @description 步长，插值时的间隔步长
         * @default 1
         */
        this.step = options.step !== undefined ? options.step : 1;
    }

    /**
     * @function Zondy.Service.Smooth.prototype.setType
     * @description 设置插值方式,可取值0、1、2、3
     * @param {Number} type
     */
    setType(type) {
        this.type = type;
    }


    /**
     * @function Zondy.Service.Smooth.prototype.setStep
     * @description 设置步长，插值时的间隔步长
     * @param {Number} step
     */
    setStep(step) {
        this.step = step;
    }

    /**
     * @function Zondy.Service.Smooth.prototype.execute
     * @description 执行光滑线调用
     * @param {Array} dots Array<{@link Zondy.Object.Point2D}>
     * @param {callback} onSuccess 执行成功后的回调函数
     * @param {callback} onError 执行失败后的回调函数
     */
    execute(dots, onSuccess, onError) {
        if (this.type == 2) {
            if (dots.length < 4) {
                alert("当前选中的为三次Beizer样条，最少需四个点");
                return;
            }
        } else {
            if (dots.length < 3) {
                alert("当前选中的类型最少需三个点");
                return;
            }
        }
        this.partUrl = "geomservice/smooth?f=json&type=" + this.type + "&step=" + this.step;
        var url = this.getFullUrl();
        var me = this;
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(dots),
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8'
            }
        });
    }
}
export {
    Smooth
};
Zondy.Service.Smooth = Smooth;