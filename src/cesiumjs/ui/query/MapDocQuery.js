import { CesiumZondy } from '../../core/Base';
import axios from 'axios';

/**
 * @author 技术支持-何振涛
 * @class module:服务端数据查询.MapDocQuery
 * @description CesiumZondy.Query.MapDocQuery
 * @classdesc 二维地图文档查询
 */
export class MapDocQuery {
    constructor() {
        /**
         * @description 查询对应的地图服务,参考ClassLib.js中的MapDocObj对象
         * @member module:服务端数据查询.MapDocQuery.prototype.docObj
         * @type {MapDocObj}
         */
        this.docObj = null;

        /**
         * @description 地图服务名称
         * @member module:服务端数据查询.MapDocQuery.prototype.docName
         * @type {String}
         */
        this.docName = '';
        /**
         * @description 地图在文档下得序号,一般为0
         * @member module:服务端数据查询.MapDocQuery.prototype.mapIndex
         * @type {Int}
         */
        this.mapIndex = 0;
        /**
         * @description 图层序号
         * @member module:服务端数据查询.MapDocQuery.prototype.layerID
         * @type {Int}
         */
        this.layerID = 0;

        /**
         * @description 几何类型描述,格式:point | circle | rect | line | polygon
         * @member module:服务端数据查询.MapDocQuery.prototype.geometryType
         * @type {string}
         */
        this.geometryType = '';

        /**
         * @description 点的集合
         * 几何约束区域参数，其形式取决于geometryType的值，即取决于几何约束类型
         * point--x,y,[ neardistance],neardistance为可选，即容差，下同
         * circle--x，y，r 注意在球上执行画圆时由于插件提供的圆为椭圆，给出的点集也是大量离散点，因此这种情况下，依然采用polygon方式执行查询
         * rect--xmin，ymin，xmax，ymax
         * line--x1,y1,x2,y2,x3,y3…;[neardistance]
         * polygon--x1,y1,x2,y2,x3,y3…第一个点与最后一个点相同
         * @member module:服务端数据查询.MapDocQuery.prototype.geometry
         * @type {string}
         */
        this.geometry = '';

        /**
         * @description 符合SQL查询规范的任何字符串
         * @member module:服务端数据查询.MapDocQuery.prototype.where
         * @type {string}
         */
        this.where = '';

        /**
         * @description 返回结果的序列化形式
         * @member module:服务端数据查询.MapDocQuery.prototype.f
         * @type {string}
         */
        this.f = 'json';
        /**
         * @description 需要查询的要素Id号,格式：oid1，oid2，oid3
         * @member module:服务端数据查询.MapDocQuery.prototype.objectIds
         * @type {string}
         */
        this.objectIds = '';

        /**
         * @description 指定查询结果的结构，json规范
         *    struct={ IncludeAttribute:true | false,
         *             IncludeGeometry:true | false,
         *             IncludeWebGraphic :true |false}
         *    参数不区分大小写，可以省略，默认为IncludeAttribute:true，其他参数均为false
         * @member module:服务端数据查询.MapDocQuery.prototype.structs
         * @type {json}
         */
        this.structs = '';

        /**
         * @description 返回的要素分页的页数，默认返回第0页
         * @member module:服务端数据查询.MapDocQuery.prototype.page
         * @type {string}
         */
        this.page = '';
        /**
         * @description 要素结果集每页的记录数量，默认为20条/页
         * @member module:服务端数据查询.MapDocQuery.prototype.pageCount
         * @type {string}
         */
        this.pageCount = '';

        /**
         * @description 指定查询规则，Json表示形式
         *    rule={  CompareRectOnly:true | false,
         *            EnableDisplayCondition:true | false,
         *            MustInside : true|false,
         *            Intersect : true|false }
         *    参数不区分大小写，可以省略
         *    CompareRectOnly表示是否仅比较要素的外包矩形，来判定是否与几何约束图形有交集；
         *    EnableDisplayCondition表示是否将隐藏图层计算在内；
         *    MustInside表示是否完全包含；
         *    Intersect：是否相交
         * @member module:服务端数据查询.MapDocQuery.prototype.rule
         * @type {json}
         */
        this.rule = '';

        /**
         * @description 这里查询结果,这里主要是存放查询过程中报错信息
         * @member module:服务端数据查询.MapDocQuery.prototype.queryResult
         * @type {string}
         */
        this.queryResult = '未查询';

        this.ip = '';
        this.port = '';
    }

    /**
     * @description 查询对应的二维地图文档
     * @function module:服务端数据查询.MapDocQuery.prototype.beginQuery
     * @param {Function} successCallback 成功回调
     * @param {Function} errorCallback 失败回调
     */
    beginQuery(successCallback, errorCallback) {
        let o = this;
        //检验参数合法性
        //if (o.docObj && o.docObj.type != DocType.TypeDoc) {
        //    o.queryResult = "目标文档不符合查询要求";
        //    alert(o.queryResult);
        //    return;
        //}
        //如果docName未设置则设置为服务名
        if (!o.docName)
            o.docName = o.docObj.name;
        let queryString = 'query?guid=' + Math.random();
        //构建查询参数
        if (o.geometryType && o.geometry) {
            //这里可以进行进一步的参数验证
            queryString += '&geometryType=' + o.geometryType + '&geometry=' + o.geometry;
        }
        if (o.where)
            queryString += '&where=' + o.where;
        if (o.f)
            queryString += '&f=' + o.f;
        if (o.objectIds)
            queryString += '&objectIds=' + o.objectIds;
        if (o.structs)
            queryString += '&structs=' + o.structs;
        if (o.page)
            queryString += '&page=' + o.page;
        if (o.pageCount)
            queryString += '&pageCount=' + o.pageCount;
        if (o.rule)
            queryString += '&rule=' + o.rule;
        let url = 'http://' + o.ip + ':' + o.port + '/igs/rest/mrfs/docs/' + o.docName + '/' + o.mapIndex + '/' + o.layerID + '/' + queryString;

        axios.get(url)
            .then(res => {
                successCallback && successCallback(res.data, res, o);
            })
            .catch(error=>{
                errorCallback && errorCallback(error);
            });
    }
}

export default MapDocQuery;

CesiumZondy.Query.MapDocQuery = MapDocQuery;
