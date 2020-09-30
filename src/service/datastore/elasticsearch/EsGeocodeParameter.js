import { Zondy } from '../../common/Base';
import BaseQueryParameter from '../ServiceParameter';

/**
 * @author 创新中心-潘卓然
 * @class module:弹性搜索服务.EsGeocodeParameter
 * @param gdbp 发布在igs上的pg图层gdbp地址，可以从中解析libName（数据库名）、schemas（工作空间名）、tableName（表名）
 * @param option - {Object} 查询条件
 * @param {Boolean} [option.includeProperites = true] 查询结果中是否包含属性
 * @param {String} [option.where] 属性条件 （例如：id>5,id<10）
 * @param {String} [option.fields] 统计计算中用于分组字段名列表
 * @param {String} [option.geometry] 几何信息，圆、多边形等
 * @param {String} [option.geoFormat="wkt"] 几何类型，wkt、wkb、geojson、自定义等
 * @param {String} [option.sref] 动态投影坐标系 ID，支持 MapGIS 和 EPSG 标准编号，其中 MapGIS 只支持当前库中自带的坐标系的 ID，EPSG 标准请 使用 EPSG:4326 格式，若指定了该参数，则系统认为 geometry 的坐标系为此坐标系
 */
export class EsGeocodeParameter extends BaseQueryParameter {
    constructor(option) {
        super(option);
        /**
         * @member  module:弹性搜索服务.EsGeocodeParameter.prototype.includeProperites
         * @description 查询结果中是否包含属性
         * @type Boolean
         * @default true
         */
        this.includeProperites = option.includeProperites;
        /**
         * @member  module:弹性搜索服务.EsGeocodeParameter.prototype.where
         * @description 属性条件 （例如：id>5,id<10）
         * @type String
         */
        this.where = option.where;
        /**
         * @member  module:弹性搜索服务.EsGeocodeParameter.prototype.fields
         * @description 统计计算中用于分组字段名列表
         * @type String
         */
        this.fields = option.fields;
        /**
         * @member  module:弹性搜索服务.EsGeocodeParameter.prototype.geometry
         * @description 几何信息，圆、多边形等
         * @type String
         */
        this.geometry = option.geometry;
        /**
         * @member  module:弹性搜索服务.EsGeocodeParameter.prototype.geoFormat
         * @description 几何类型，wkt、wkb、geojson、自定义等
         * @type String
         */
        this.geoFormat = option.geoFormat;
        /**
         * @member  module:弹性搜索服务.EsGeocodeParameter.prototype.sref
         * @description 动态投影坐标系 ID，支持 MapGIS 和 EPSG 标准编号，
         * 其中 MapGIS 只支持当前库中自带的坐标系的 ID，EPSG 标准请 使用 EPSG:4326 格式，
         * 若指定了该参数，则系统认为 geometry 的坐标系为此坐标系
         * @type String
         */
        this.sref = option.sref;
    }
}

export default EsGeocodeParameter;
Zondy.DataStore.ElasticSearch.EsGeocodeParameter = EsGeocodeParameter;
