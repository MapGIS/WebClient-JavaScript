import {Zondy} from '../common/Base';
import {QueryParameter}  from  "./QueryParameter";
import {QueryFeatureStruct}  from  "./QueryFeatureStruct";
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.QueryByLayerParameter
 * @classdesc Zondy.Service.QueryByLayerParameter 矢量图层参数查询类
 * @extends Zondy.Service.QueryParameter
 * @param gdbp -{Object} 对象类GDBP地址。<br>
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
 * @param {Boolean} [option.isAsc=false] 是否升序排列，与orderField配合使用
 */
class QueryByLayerParameter extends QueryParameter {
    constructor(gdbp, option) {
        var options = option ? option : {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.QueryByLayerParameter.prototype.gdbp
         * @type {String}
         * @description 图层URL
         */
        this.gdbp = gdbp !== undefined ? encodeURI(gdbp) : null;
    }

    /**
     * @description 返回参数路径，重载基类getParameterURL，获取相关参数的REST-URL表示形式
     * @function Zondy.Service.QueryByLayerParameter.prototype.getParameterURL
     * @returns 参数路径
     */
    getParameterURL() {
        var paramUrl = super.getParameterURL();
        return paramUrl + "&gdbp=" + this.gdbp;
    }

    /**
     * @description 重载基类getParameterObject，获取相关参数的Object形式，私有方法
     * @function Zondy.Service.QueryByLayerParameter.prototype.getParameterObject
     * @returns 相关参数的Object形式
     */
    getParameterObject() {
        var obj = super.getParameterObject(this);
        obj.gdbp = this.gdbp;
        return obj;
    }
}
export {QueryByLayerParameter};
Zondy.Service.QueryByLayerParameter = QueryByLayerParameter;