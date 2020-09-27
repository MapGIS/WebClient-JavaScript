import { Zondy } from '../../common/Base';
import BaseQueryParameter from '../ServiceParameter';

/**
 * @author 创新中心-潘卓然
 * @class module:PostGIS.PostgisQueryParameter
 * @param {Object} option 查询条件
 * @param {String} [option.gdbp] 发布在igs上的pg图层gdbp地址，可以从中解析libName（数据库名）、schemas（工作空间名）、tableName（表名）
 * @param {Boolean} [option.includeProperites = true] 查询结果中是否包含属性
 * @param {String} [option.where] 属性条件 （例如：id>5,id<10）
 * @param {String} [option.fields] 统计计算中用于分组字段名列表
 * @param {String} [option.geometry] 几何信息，圆、多边形等
 * @param {String} [option.geoFormat="wkt"] 几何类型，wkt、wkb、geojson、自定义等
 * @param {String} [option.sref] 动态投影坐标系 ID，支持 MapGIS 和 EPSG 标准编号，其中 MapGIS 只支持当前库中自带的坐标系的 ID，EPSG 标准请 使用 EPSG:4326 格式，若指定了该参数，则系统认为 geometry 的坐标系为此坐标系
 */
export class PostgisQueryParameter extends BaseQueryParameter {
    constructor(option) {
        super(option);
        /**
         * @member module:PostGIS.PostgisQueryParameter.prototype.gdbp
         * @description 发布在igs上的pg图层gdbp地址，可以从中解析libName（数据库名）、schemas（工作空间名）、tableName（表名）
         * @type String
         */
        this.gdbp = option.gdbp;
        /**
         * @member module:PostGIS.PostgisQueryParameter.prototype.includeProperites
         * @description 查询结果中是否包含属性
         * @type Boolean
         * @default true
         */
        this.includeProperites = option.includeProperites;
        /**
         * @member module:PostGIS.PostgisQueryParameter.prototype.where
         * @description 属性条件 （例如：id>5,id<10）
         * @type String
         */
        this.where = option.where;
        /**
         * @member module:PostGIS.PostgisQueryParameter.prototype.fields
         * @description 统计计算中用于分组字段名列表
         * @type String
         */
        this.fields = option.fields;
        /**
         * @member module:PostGIS.PostgisQueryParameter.prototype.geometry
         * @description 几何信息，圆、多边形等
         * @type String
         */
        this.geometry = option.geometry;
        /**
         * @member module:PostGIS.PostgisQueryParameter.prototype.geoFormat
         * @description 几何类型，wkt、wkb、geojson、自定义等
         * @type String
         */
        this.geoFormat = option.geoFormat;
        /**
         * @member module:PostGIS.PostgisQueryParameter.prototype.sref
         * @description 动态投影坐标系 ID，支持 MapGIS 和 EPSG 标准编号，
         * 其中 MapGIS 只支持当前库中自带的坐标系的 ID，EPSG 标准请 使用 EPSG:4326 格式，
         * 若指定了该参数，则系统认为 geometry 的坐标系为此坐标系
         * @type String
         */
        this.sref = option.sref;
    }

    fixParams() {
        const { gdbp, pageNo, pageSize, includeProperites, where, fields, sref } = this;
        const vecStr = gdbp.split('/');
        if (vecStr.length < 5) return;
        let queryParam = {};
        queryParam.libName = vecStr[vecStr.length - 5];
        queryParam.tableName = vecStr[vecStr.length - 1];
        queryParam.schemas = vecStr[vecStr.length - 5];
        queryParam.pageNo = pageNo !== undefined ? pageNo : 1;
        queryParam.pageSize = pageSize || 10;
        queryParam.includeProperites = includeProperites;
        queryParam.filter = where;
        queryParam.fields = fields;
        queryParam.sref = sref;
        queryParam.geometry = this.fixGeometry();
    }

    fixGeometry() {
        let { geometry } = this;
        if (geometry) {
            queryParam.geoFormat = 'wkt';
            const geometryType = geometry.getGeometryType();
            const arr = [];
            let str;
            if (geometryType === 'rect') {
                arr.push(`${option.geometry.xmin} ${option.geometry.ymin}`);
                arr.push(`${option.geometry.xmin} ${option.geometry.ymax}`);
                arr.push(`${option.geometry.xmax} ${option.geometry.ymax}`);
                arr.push(`${option.geometry.xmax} ${option.geometry.ymin}`);
                arr.push(`${option.geometry.xmin} ${option.geometry.ymin}`);
            } else if (geometryType === 'polygon' || geometryType === 'polygon') {
                const { pointArr } = option.geometry;
                for (let i = 0; i < pointArr.length; i += 1) {
                    arr.push(`${pointArr[i].x} ${pointArr[i].y}`);
                }
                str = arr.join(',');
                if (geometryType === 'polygon') {
                    queryParam.geometry = `POLYGON(( ${str}))`;
                } else if (geometryType === 'line') {
                    queryParam.geometry = `LINESTRING(${str})`;
                }
            } else if (geometryType === 'point') {
                queryParam.geometry = `POINT(${option.geometry.x} ${option.geometry.y})`;
            }
        }
    }
}

export default PostgisQueryParameter;
Zondy.DataStore.PostGIS.PostgisQueryParameter = PostgisQueryParameter;
