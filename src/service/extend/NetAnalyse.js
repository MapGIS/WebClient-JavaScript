import { Zondy } from "../common/Base";
import { extend }  from  "../common/Util";

var NetAnalyse = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    extend(this, options);
    this.netCls = options.netCls !== undefined ? options.netCls : null;               //网络类
    this.flagPosStr = options.flagPosStr !== undefined ? options.flagPosStr : null;           //网标序列，包括点上网标、网线网标
    this.barrierPosStr = options.barrierPosStr !== undefined ? options.barrierPosStr : null;        //障碍序列，包括点上障碍、线上障碍
    this.weight = options.weight !== undefined ? options.weight : null;               //权值
    this.mode = options.mode !== undefined ? options.mode : null;                 //分析模式
    this.isTour = options.isTour !== undefined ? options.isTour : false;              //是否迂回
    this.isTravel = options.isTravel !== undefined ? options.isTravel : false;            //是否游历
    this.usedTWgt = options.usedTWgt !== undefined ? options.usedTWgt : false;            //是否启用转角权值
    this.turnWgt = options.turnWgt !== undefined ? options.turnWgt : null;              //转角权值
    this.roadName = options.roadName !== undefined ? options.roadName : "name";            //生成报告时道路名称字段
};
export { NetAnalyse};
Zondy.Object.NetAnalyse = NetAnalyse;