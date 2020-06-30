import {Zondy} from '../common/Base';
import {extend} from "../common/Util";
import {QueryFeatureStruct} from "./QueryFeatureStruct";
import {QueryFeatureRule} from "./QueryFeatureRule";

/**
 * @author 基础平台/研究院 陈琪
 * @class module:要素服务.QueryParameterBase
 * @classdesc  Zondy.Service.QueryParameterBase 矢量地图参数查询基类
 * @param option - {Object} 属性键值对。
 * @param {Zondy.Object.Tangram} [option.geometry=null] 用于查询的几何描述
 * @param {String} [option.where=null] 条件查询的SQL语句,如果为空，则表示为单一的几何查询；如果取值，表示为几何和条件混合查询
 * @param {Zondy.Service.QueryFeatureRule} [option.rule=null] 几何查询的规则
 * @param {String} [option.objectIds=null] 需要查询的要素OID号，多个间用‘，’分隔；如果此参数有值，查询将默认转化为使用要素ID查询，而忽略条件查询
 * @param {Number} [option.pageIndex=0] 分页号
 * @param {Number} [option.recordNumber=20] 每页记录数
 * @param {String} [option.resultFormat=json]  查询结果的序列化形式(json（默认值）|xml|kml|gml|georss，对于xml，kml，gml或者georss格式的类xml类型将以text文本返回，如需要可调用$.parseXML(text)得到其xml包装)
 * @param {Zondy.Service.QueryFeatureStruct} [option.struct=new QueryFeatureStruct()] 指定查询返回结果所包含的要素信息
 * @param {String} [option.orderField=null] 指定查询返回结果的排序字段
 * @param {Boolean} [option.rtnLabel=false] 是否计算Label点
 * @param {String} [option.fields=""] 指定结果字段
 * @param {Number} [option.coordPrecision=2] 坐标点的精度
 * @param {Boolean} [option.isAsc=false] 是否升序排列，与orderField配合使用
 * @param {String} [option.cursorType=“forward”] 游标类型 forward为向前光标 其他为向前向后
 * @param {string} [option.proj] 投影参考系，多个图层用半角逗号分隔
 * @param {string} [option.guid=“__readonly_user__”] 唯一id，可缺省
 */

class QueryParameterBase {
	constructor(option) {

		var options = option ? option : {};
		extend(this, options);

		this.geometry = options.geometry !== undefined ? options.geometry : null;

		this.where = options.where !== undefined ? options.where : null;

		this.rule = options.rule !== undefined ? options.rule : new QueryFeatureRule();

		this.objectIds = options.objectIds !== undefined ? options.objectIds : null;

		this.pageIndex = options.pageIndex !== undefined ? options.pageIndex : 0;

		this.recordNumber = options.recordNumber !== undefined ? options.recordNumber : 20;

		this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json";

		this.struct = options.struct !== undefined ? options.struct : new QueryFeatureStruct();

		this.orderField = options.orderField !== undefined ? options.orderField : null;

		this.rtnLabel = options.rtnLabel !== undefined ? options.rtnLabel : false;

		this.fields = options.fields || "";

		this.coordPrecision = options.coordPrecision || options.coordPrecision === 0 ? options.coordPrecision : 2;

		this.isAsc = options.isAsc !== undefined ? options.isAsc : false;

		this.cursorType = options.cursorType !== undefined ? options.cursorType : "forward";

		this.proj = options.proj || null;

		this.guid = options.guid || "__readonly_user__";
	}
}

export {QueryParameterBase};
Zondy.Service.QueryParameterBase = QueryParameterBase;
