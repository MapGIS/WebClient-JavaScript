import { Zondy } from '../../common/Base';
import { IGServerXService } from '../ServiceBase';

/**
 * @author 创新中心-潘卓然
 * @class module:矢量大数据.SparkBufferService
 * @param {Object} srcLayer 原始图层
 * @param {String} srcLayer.srcUrl] 原始输入图层URL地址。如：hdfs://192.168.96.101:9000/mapgisanalystserver/nyc/trip_data_1.csv
 * @param {String} [srcLayer.schema] 输入原始图层元信息json的URL地址，支持hdfs、http。如hdfs://192.168.96.101:9000/mapgisanalystserver/datasetschema.json
 * @param {String} [srcLayer.filter] 输入原始图层属性过滤条件。如：speed>100 and id>0
 * @param {Object} [extend] 空间范围信息
 * @param {Number} [extend.xmin] 空间范围信息，x轴最小值。如：-74.25559136
 * @param {Number} [extend.xmax] 空间范围信息，x轴最大值。如：-73.70000906
 * @param {Number} [extend.ymin] 空间范围信息，y轴最小值。如：40.4961154
 * @param {Number} [extend.ymax] 空间范围信息，y轴最大值。如：40.91553278
 * @param {Number} [extend.startTime] 时间范围信息，起始时间。如：
 * @param {Number} [extend.endTime] 时间范围信息，结束时间。如：
 * @param {Number} [distance] 缓冲距离，和缓冲距离单位为一组参数，与缓冲表达式为二选一参数
 * @param {String} [spatialUnit] 缓冲距离单位，meter(米)、kilometer(千米)、none(数据单位)
 * @param {String} [bufferExp] 缓冲计算表达式
 * @param {String} [bufferType] 缓冲类型，flat(平头)、round(圆头)
 * @param {String} option 缓冲选项，all(聚合所有)、list(聚合相交部分)、none(不做处理)
 * @param {String} [reserveFields] 保留字段数组，用逗号分隔
 * @param {String} [isMultipart] 几何是否合并为多部分,当保留字段选项all、list时生效
 * @param {String} [statisticFields] 统计字段信息，当保留字段选项all、list时生效，值型字段支持 count,min,max,mean,sum,variance,stddev,range 等。如：[{"field":"trip_distance","statisticTypes":["mean","sum"]},{"field":"speed","statisticTypes":["mean", "count"]}]
 * @param {String} [rtnUrl] 结果图层地址，服务URL地址或具有一定规则的数据协议地址，即{协议}://{用户名}@{密码}/{IP}:{port}/{路径}。如：pg://mapgis@mapgis/192.168.81.223:5432/postgis/summarymesh_hexgon_96_101_001 或者 hdfs://192.168.96.101:9000/nyc
 */
export class SparkBufferService extends IGServerXService {
    constructor(option) {
        super(option);

        /**
         * @member module:矢量大数据.SparkBufferService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/analysticservice/v1.0/job/createBuffer/submit?';
        

        this.fixOption(option);
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption(option) {
        this.option = {
            classify: option.classify,
            keyWords: option.keyWords,
            pageSize: option.pageSize,
            pageNo: option.pageNo
        };
    }

    /**
     * @description 查询函数，向服务器发送请求,返回地名地址格式数据
     * @function module:矢量大数据.SparkBufferService.prototype.query
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    excute(onSuccess, onError) {
        let { serviceUrl, path, option } = this;
        serviceUrl += path;
        let url = this.getFullUrl(serviceUrl, option);
        this.post(url, onSuccess, onError);
    }
}

export default SparkBufferService;
Zondy.IGServerX.矢量大数据.SparkBufferService = SparkBufferService;
