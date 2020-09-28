import { Zondy } from '../../common/Base';
import { DataStoreService } from '../ServiceBase';

/**
 * @author 创新中心-潘卓然
 * @class module:PostGIS.PostgisQueryService
 * @param {PostgisQueryParameter} option 查询条件
 * @param {String} option.path 库名称/工作空间
 * @param {String} option.tableNames 表名，多个用逗号分隔，如：X431102TDXZ2005GDLTB,dltb2005
 */
export class PostgisQueryService extends DataStoreService {
    constructor(option) {
        super(option);

        /**
         * @member module:PostGIS.PostgisQueryService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/datastore/rest/dataset/pg/query';
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.path
         * @description 库名称/工作空间
         */
        this.path = option.path;
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.geometry
         * @description 几何信息，wkt、geojson、自定义等字符串
         */
        this.geometry = option.geometry;
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.geoFormat
         * @description 几何类型，支持wkt、geojson、circle、rect四种，
         * 其中当为circle时，geometry格式为：x坐标,y坐标,半径；
         * 当为rect时，geometry格式为：xmin,ymin,xmax,ymax
         */
        this.geoFormat = option.geoFormat;
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.sref
         * @description 动态投影坐标系ID，支持MapGIS和EPSG标准编号，
         * 其中MapGIS只支持当前库中自带的坐标系的ID，EPSG标准请使用EPSG:4326格式，
         * 若指定了该参数，则系统认为geometry的坐标系为此坐标系
         */
        this.sref = option.sref;
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.filter
         * @description 属性条件 （例如：id>5,id<10）
         */
        this.filter = option.filter;
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.fields
         * @description 统计计算中用于分组字段名列表，用逗号分隔
         */
        this.fields = option.fields;

        /**
         * @member module:PostGIS.PostgisQueryService.prototype.segments
         * @description 分段分组条件，如["银行<1000","银行 between 1000 and 4000"]
         */
        this.segments = option.segments;
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.statisticFields
         * @description Json格式，[field] 方法类型：count,min,max,mean,sum,variance(方差),stddev(标准差）
         */
        this.statisticFields = option.statisticFields;
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.includeProperites
         * @description 返回结果是否包含属性
         * @default false
         */
        this.includeProperites = option.includeProperites;
        /**
         * @member module:PostGIS.PostgisQueryService.prototype.includeGeometry
         * @description 返回结果是否包含几何
         * @default true*
         */
        this.includeGeometry = option.includeGeometry;

        this.fixOption(option);
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption(option) {
        this.option = {
            geometry: option.geometry,
            geoFormat: option.geoFormat,
            sref: option.sref,
            filter: option.filter,
            fields: option.fields,
            segments: option.segments,
            statisticFields: option.statisticFields,
            includeProperites: option.includeProperites,
            propertyNames: option.propertyNames,
            includeGeometry: option.includeGeometry,
            pageSize: option.pageSize,
            pageNo: option.pageNo
        };
    }

    /**
     * @description 查询函数，向服务器发送请求,返回地名地址格式数据
     * @function module:PostGIS.PostgisQueryService.prototype.query
     * @param  {Function} onSuccess 查询成功回调函数。
     * @param {Function} onError 查询失败回调函数。
     */
    query(onSuccess, onError) {
        let { serviceUrl, path, option } = this;
        serviceUrl += path;  
        let url = this.getFullUrl(serviceUrl, option);
        this.get(url, onSuccess, onError);
    }
}

export default PostgisQueryService;
Zondy.DataStore.PostGIS.PostgisQueryService = PostgisQueryService;
