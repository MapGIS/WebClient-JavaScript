import {Zondy} from '../../common/Base';
import {toJSON} from "../../common/Util";
import {QueryParameterBase} from "./QueryParameterBase";

/**
 * modify to zondy mapv
 * @origin author kyle / http://nikai.us/
 * @author 基础平台/研究院 陈琪
 * @class module:要素服务.QueryParameter
 * @classdesc 参数查询类
 * @description Zondy.Service.QueryParameter
 * @extends  Zondy.Service.QueryParameterBase
 * @param option - {Object} 属性键值对。<br>
 * @param {Zondy.Object.Tangram} [option.geometry=null] 用于查询的几何描述
 * @param {String} [option.where=null] 条件查询的SQL语句,如果为空，则表示为单一的几何查询；如果取值，表示为几何和条件混合查询
 * @param {Zondy.Service.QueryFeatureRule} [option.rule=null] 几何查询的规则
 * @param {String} [option.objectIds=null] 需要查询的要素OID号，多个间用‘，’分隔；如果此参数有值，查询将默认转化为使用要素ID查询，而忽略条件查询
 * @param {Number} [option.pageIndex=0] 分页号
 * @param {Number} [option.recordNumber=20] 每页记录数
 * @param {String} [option.resultFormat=json]  查询结果的序列化形式(json（默认值）|xml|kml|gml|georss，对于xml，kml，gml或者georss格式的类xml类型将以text文本返回，如需要可调用$.parseXML(text)得到其xml包装)
 * @param {Zondy.Service.QueryFeatureStruct} [option.struct=new QueryFeatureStruct()] 指定查询返回结果所包含的要素信息
 * @param {String} [option.orderField=new String()] 指定查询返回结果的排序字段
 * @param {String} [option.proj=null] 只有图层才支持。设置查询结果中的坐标输出为特定坐标系下的坐标
 * @param {Boolean} [option.rtnLabel=false] 是否计算Label点
 * @param {String} [option.fields=""] 指定结果字段
 * @param {Number} [option.coordPrecision=2] 坐标点的精度
 * @param {Boolean} [option.isAsc=false] 是否升序排列，与orderField配合使用
 * @param {String} [option.cursorType=“forward”] 游标类型 forward为向前光标 其他为向前向后
 */
class QueryParameter extends QueryParameterBase {
	constructor(option) {
		var options = option ? option : {};
		super(options);
	}

	/**
	 * @description 获取相关参数的REST-URL表示形式
	 * @function Zondy.Service.QueryParameter.prototype.getParameterURL
	 * @returns 查询参数地址
	 */
	getParameterURL() {
		var paramUrl = "page=" + this.pageIndex.toString();
		paramUrl += "&pageCount=" + this.recordNumber.toString();
		paramUrl += "&f=" + this.resultFormat;

		if (this.geometry) {
			paramUrl += "&geometry=" + this.geometry.toString();
			paramUrl += "&geometryType=" + this.geometry.getGeometryType();
		}

		if (this.struct) {
			paramUrl += "&structs=" + toJSON(this.struct);
		}
		if (this.where) {
			paramUrl += "&where=" + this.where;
		}
		if (this.rule) {
			paramUrl += "&rule=" + toJSON(this.rule);
		}
		if (this.objectIds) {
			paramUrl += "&objectIds=" + this.objectIds;
		}
		if (this.orderField) {
			paramUrl += "&orderField=" + this.orderField;
		}
		if (this.rtnLabel !== undefined) {
			paramUrl += "&rtnLabel=" + this.rtnLabel;
		}
		if (this.fields) {
			paramUrl += "&fields=" + this.fields;
		}
		if (this.coordPrecision !== undefined) {
			paramUrl += "&coordPrecision=" + this.coordPrecision;
		}
		if (this.isAsc) {
			paramUrl += "&isAsc=" + this.isAsc;
		}
		if (this.proj) {
			paramUrl += "&srsIds=" + this.proj;
		}
		if (this.guid) {
			paramUrl += "&guid=" + this.guid;
		}
		paramUrl += "&cursorType=" + this.cursorType;

		return paramUrl;
	}

	/**
	 * @description 获取相关参数的Object形式,私有方法
	 * @function Zondy.Service.QueryParameter.prototype.getParameterObject
	 * @returns  相关参数的Object形式
	 */
	getParameterObject() {
		var obj = {};
		obj.f = this.resultFormat;
		if (this.struct !== null) {
			obj.structs = this.struct.toJSON();
		}

		if (this.objectIds !== null) {
			obj.objectIds = this.objectIds;
			return obj;
		}

		obj.page = this.pageIndex.toString();
		obj.pageCount = this.recordNumber.toString();

		if (this.geometry !== null) {
			obj.geometry = this.geometry.toString();
			obj.geometryType = this.geometry.getGeometryType();
		}
		if (this.where !== null) {
			obj.where = this.where;
		}
		if (this.rule !== null) {
			obj.rule = this.rule.toJSON();
		}
		if (this.orderField !== null) {
			obj.orderField = this.orderField;
		}
		if (this.isAsc !== null) {
			obj.isAsc = this.isAsc;
		}
		obj.cursorType = this.cursorType;

		return obj;
	}
}

export {QueryParameter};
Zondy.Service.QueryParameter = QueryParameter;
