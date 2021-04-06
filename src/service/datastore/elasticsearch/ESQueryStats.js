// import {
//     PARAM_SUB,
//     SPACE_ENUM_POLYGON,
//     PARAM_COMMA,
//     PARAM_SPLIT,
//     PARAM_BRACKET_LEFT,
//     PARAM_SPACE,
//     PARAM_BRACKET_RIGHT
// } from './BaseDefine';
import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 基础平台-王魁帅
 * @class module:弹性搜索服务.ESQueryStats
 * @description Zondy.DataStore.ElasticSearch.ESQueryStats————DataStore的es数据查询统计接口。如果查询路径中只有数据库名、工作空间名和表名，则查询结果为对应表中要素信息，不包含属性；如果没有统计字段，则查询结果为查询结果对应的要素信息，是否包含属性与includeProperites是否为true相关；如果有统计字段，则查询结果只有对应的统计结果信息。
 * @param {Object} option 查询条件
 * @param {String} [option.libName] 必选。数据库名
 * @param {String} [option.tableName] 必选。表名
 * @param {String} [option.geometry] 可选。(geometry和extent，二选一)。几何信息，圆、多边形等
 * @param {String} [option.extent] 可选。(geometry和extent，二选一)。地图范围,示例：{xmin:-180,ymin:-90,xmax:180,ymax:90}。这里extent会转换为geometry
 * @param {String} [option.geoFormat] 可选。(与 geometry或extent并存)。几何类型，wkt、wkb、geojson、自定义等
 * @param {Object} [option.filter] 可选。过滤条件
 * @param {String} [option.filter.spatialCondition] 可选。(spatialCondition和extent，二选一)空间条件
 * @param {String} [option.filter.extent] 可选。(spatialCondition和extent，二选一)空间条件，这里的extent会转换为spatialCondition
 * @param {String} [option.filter.timeCondition] 可选。时间条件
 * @param {String} [option.filter.timeCondition.field] 可选。时间字段
 * @param {String} [option.filter.timeCondition.timeRange] 可选。时间范围
 * @param {String} [option.filter.otherProperty] 可选。其他过滤条件
 * @param {String} [option.filter.fieldTag] 可选。过滤字段标签
 * @param {String} [option.fields] 可选。统计计算中用于分组字段名列表
 * @param {Array} [option.statisticFields] 可选。 统计字段 数组，里面可以包含多个Json数据，每个Json包含field和statisticTypes两个字段，表示某个类型数据的统计方式。示例：{field:"图斑地类面积",statisticTypes:"sum"}，表示图斑地类面积求和。其中statisticTypes有count,min,max,mean,sum,variance(方差),stddev(标准差）几种方式。
 * @param {String} [option.sref] 可选。动态投影坐标系 ID，支持 MapGIS 和 EPSG 标准编号，其中 MapGIS 只支持当前库中自带的坐标系的 ID，EPSG 标准请 使用 EPSG:4326 格式，若指定了该参数，则系统认为 geometry 的坐标系为此坐标系
 * @param {Boolean} [option.includeProperites = false] 可选。查询结果中是否包含属性
 * @param {Int} [option.pageSize=10] 可选。每页大小
 * @param {Int} [option.pageNo=1] 可选。页码，从1开始
 * @see https://shimo.im/docs/1d579d6a082a4631
 */
export default class ESQueryStats extends DataStoreService {
    constructor(option) {
        super(option);

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.serviceUrl
         * @type {String}
         * @description es数据查询统计服务地址
         * @default /datastore/rest/dataset/es/query/
         */
        this.serviceUrl = '/datastore/rest/dataset/es/query/';

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.libName
         * @type {String}
         * @description 库名称
         * @default null
         */
        this.libName = option.libName !== undefined ? option.libName : null;

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.tableName
         * @type {String}
         * @description 表名称
         * @default null
         */
        this.tableName = option.tableName !== undefined ? option.tableName : null;

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.geometry
         * @type {String}
         * @description 几何信息，圆、多边形等
         * @default null
         */
        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.extent
         * @type {String}
         * @description 地图范围,示例：{xmin:-180,ymin:-90,xmax:180,ymax:90}。这里extent会转换为geometry
         * @default null
         */
        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.geoFormat
         * @type {String}
         * @description 几何类型，wkt、wkb、geojson、自定义等
         * @default 'wkt'
         */
        if (option.geometry !== undefined || option.extent !== undefined) {
            this.geoFormat = option.geoFormat !== undefined ? option.geoFormat : 'wkt'; // wkt、wkb、geojson等
            if (option.geometry !== undefined) {
                this.geometry = option.geometry !== undefined ? option.geometry : null;
            } else if (option.extent !== undefined) {
                let extent = option.extent;
                this.geometry = 'polygon' + '(' + '(' + extent.xmin + ' ' + extent.ymax + ',' + extent.xmin + ' ' + extent.ymin + ',' + extent.xmax + ' ' + extent.ymin + ',' + extent.xmax + ' ' + extent.ymax + ',' + extent.xmin + ' ' + extent.ymax + ')' + ')';
            }
        }

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.filter
         * @type {Object}
         * @description 过滤条件
         * @default null
         */
        if (option.filter !== undefined) {
            //this.option.filter = JSON.stringify(option.filter);
            this.filter = {};
            //[{"spatialCondition":"polygon:0.843798,80.58775;0.843746,140.586464;40.845467,140.5646;40.845467,80.5646;0.843798,80.58775","timeCondition":{"field":"GPS_DateTime","timeRange":"1351713168000,1351815300000"},"otherProperty":"ID=1012,Direction=178","fieldTag":"ID"}];
            if (option.filter.spatialCondition !== undefined) {
                this.filter.spatialCondition = option.filter.spatialCondition;
            } else if (option.filter.extent !== undefined) {
                let extent = option.filter.extent;
                this.filter.spatialCondition = 'polygon' + ':' +
                    extent.ymax + ',' + extent.xmin + ';' + extent.yamx + ',' + extent.xmax + ';' + extent.ymin + ',' + extent.xmax + ';' + extent.ymin + ',' + extent.xmin;
            }
            if (option.filter.timeCondition !== undefined && option.filter.timeCondition.field !== undefined && option.filter.timeCondition.timeRange !== undefined) {
                this.filter.timeCondition = {};
                this.filter.timeCondition.field = option.filter.timeCondition.field;
                this.filter.timeCondition.timeRange = option.filter.timeCondition.timeRange.join(',');
            }
            if (option.filter.otherProperty !== undefined && option.filter.otherProperty !== '') {
                this.filter.otherProperty = option.filter.otherProperty;
            }
            if (option.filter.fieldTag !== undefined) {
                this.filter.fieldTag = option.filter.fieldTag;
            }
            this.filter = '[' + JSON.stringify(this.filter) + ']';
        }

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.fields
         * @type {String}
         * @description 统计计算中用于分组字段名列表
         * @default null
         */
        this.fields = option.fields !== undefined ? option.fields : null;

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.statisticFields
         * @type {Array}
         * @description 统计字段 数组，里面可以包含多个Json数据
         * @default null
         */
        if (option.statisticFields !== undefined && option.statisticFields.length > 0) {
            let statisticFields = [];
            for (let i = 0; i < option.statisticFields.length; i++) {
                let sFields = {
                    "field": option.statisticFields[i].field,
                    "statisticTypes": [option.statisticFields[i].statisticTypes]
                };
                statisticFields.push(sFields);
            }
            this.statisticFields = JSON.stringify(statisticFields);
        }
        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.sref
         * @type {String}
         * @description 动态投影坐标系 ID
         * @default null
         */
        this.sref = option.sref !== undefined ? option.sref : null;

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.includeProperites
         * @type {Boolean}
         * @description 查询结果中是否包含属性
         * @default false
         */
        this.includeProperites = option.includeProperites !== undefined ? option.includeProperites : false;

        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.pageSize
         * @type {Int}
         * @description 每页大小
         * @default 10
         */
        this.pageSize = option.pageSize !== undefined ? option.pageSize : 10;
        /**
         * @member module:弹性搜索服务.ESQueryStats.prototype.pageNo
         * @type {Int}
         * @description 页码，从1开始
         * @default 1
         */
        this.pageNo = option.pageNo !== undefined ? option.pageNo : 1;

        this.fixOption();
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption() {
        this.option = {
            geoFormat: this.geoFormat,
            geometry: this.geometry,
            filter: this.filter,
            fields: this.fields,
            statisticFields: this.statisticFields,
            sref: this.sref,
            includeProperites: this.includeProperites,
            pageSize: this.pageSize,
            pageNo: this.pageNo
        };
    }

    /**
     * @description 查询函数，向服务器发送请求,返回geosjon格式数据
     * @function module:弹性搜索服务.ESQueryStats.prototype.query
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    query(onSuccess, onError) {
        let { serviceUrl, option, libName, tableName} = this;
        serviceUrl = serviceUrl + libName + '/' + tableName;
        let url = this.getFullUrl(serviceUrl, option);
        this.get(url, onSuccess, onError);
    }
}
export { ESQueryStats };
Zondy.DataStore.ElasticSearch.ESQueryStats = ESQueryStats;
