import { CesiumZondy } from '../../core/Base';

/**
 * @author IGServer-邬俊惠
 * @class module:服务端数据查询.G3DDocQuery
 * @classdesc 三维地图文档查询
 * @description CesiumZondy.Query.G3DDocQuery 三维地图文档查询,必填参数为(docName,layerIndex)或gdbp,其他参数可选
 */
export class G3DDocQuery {
    constructor() {
        /**
        * @description igs服务ip
        * @member module:服务端数据查询.G3DDocQuery.prototype.serverIp
        * @type {string}
        */
        this.serverIp = "127.0.0.1";
        /**
         * @description igs服务ip
         * @member module:服务端数据查询.G3DDocQuery.prototype.serverPort
         * @type {int}
         */
        this.serverPort = 6163;
        /**
        * @description 三维文档的名称(docName与gdbp参数二选一)
        * @member module:服务端数据查询.G3DDocQuery.prototype.docName
        * @type {string}
        */
        this.docName = '';
        /**
        * @description 三维图层的gdbpUrl(docName与gdbp参数二选一)
        * @member module:服务端数据查询.G3DDocQuery.prototype.gdbp
        * @type {string}
        */
        this.gdbp = '';
        /**
        * @description 图层序号
        * @member module:服务端数据查询.G3DDocQuery.prototype.layerIndex
        * @type {int}
        */
        this.layerIndex = 0;

        /**
        * @description 几何类型描述,格式:point | circle | rect | line | polygon | Point3D
        * @member module:服务端数据查询.G3DDocQuery.prototype.geometryType
        * @type {string}
        */
        this.geometryType = '';

        /**
        * @description 点的集合        
        * 几何约束区域参数，其形式取决于geometryType的值，即取决于几何约束类型
        * point--x,y,[ neardistance],neardistance为可选，即容差，下同
        * Point3D--x,y,z,[neardistance],neardistance为可选，即容差，下同
        * circle--x，y，r 注意在球上执行画圆时由于插件提供的圆为椭圆，给出的点集也是大量离散点，因此这种情况下，依然采用polygon方式执行查询
        * rect--xmin，ymin，xmax，ymax 
        * line--x1,y1,x2,y2,x3,y3…;[neardistance]
        * polygon--x1,y1,x2,y2,x3,y3…第一个点与最后一个点相同
        * @member module:服务端数据查询.G3DDocQuery.prototype.geometry
        * @type {string}
        */
        this.geometry = '';

        /**
        * @description 符合SQL查询规范的任何字符串
        * @member module:服务端数据查询.G3DDocQuery.prototype.where
        * @type {string}
        */
        this.where = '';

        /**
        * @description 需要查询的要素Id号,格式：oid1，oid2，oid3
        * @member module:服务端数据查询.G3DDocQuery.prototype.objectIds
        * @type {string}
        */
        this.objectIds = '';

        /**
        * @description 指定查询结果的结构，json规范
        *    struct={ IncludeAttribute:true | false, 
        *             IncludeGeometry:true | false, 
        *             IncludeWebGraphic :true |false}
        *    参数不区分大小写，可以省略，默认为IncludeAttribute:true，其他参数均为false
        * @member module:服务端数据查询.G3DDocQuery.prototype.structs
        * @type {json}
        */
        this.structs = '';

        /**
        * @description 返回的要素分页的页数，默认返回第0页
        * @member module:服务端数据查询.G3DDocQuery.prototype.page
        * @type {string}
        */
        this.page = '';
        /**
        * @description 要素结果集每页的记录数量，默认为20条/页
        * @member module:服务端数据查询.G3DDocQuery.prototype.pageCount
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
        * @member module:服务端数据查询.G3DDocQuery.prototype.rule
        * @type {json}
        */
        this.rule = '';

        /**
        * @description 这里查询结果,这里主要是存放查询过程中报错信息
        * @member module:服务端数据查询.G3DDocQuery.prototype.queryResult
        * @type {string}
        */
        this.queryResult = '未查询';
        this.rtnLabel = false;
    }

    /**
     * @description 查询对应的三维地图文档
     * @function module:服务端数据查询.G3DDocQuery.prototype.queryG3DFeature
     * @param {Function} successCallback 成功回调
     * @param {Function} errorCallback 失败回调
     * @param {String} type 类型 post/get
     */
    queryG3DFeature(successCallback, errorCallback, type) {
        var o = this;
        if (!o) {
            alert("调用queryG3DFeature，查询参数g3DDocQuery不能为空");
            return;
        }
        var querystring;
        if (o.gdbp) {
            querystring = 'gdbp=' + o.gdbp;
        } else {
            querystring = 'docName=' + o.docName + '&layerindex=' + o.layerIndex;
        }
        //构建查询参数
        if (o.geometryType && o.geometry) {
            //这里可以进行进一步的参数验证
            querystring += '&geometryType=' + o.geometryType + '&geometry=' + o.geometry;
        }
        querystring += '&f=json'; //只能是json格式
        if (o.where)
            querystring += '&where=' + o.where;
        if (o.objectIds)
            querystring += '&objectIds=' + o.objectIds;
        if (o.structs)
            querystring += '&structs=' + o.structs;
        if (o.page)
            querystring += '&page=' + o.page;
        if (o.pageCount)
            querystring += '&pageCount=' + o.pageCount;
        if (o.rule)
            querystring += '&rule=' + o.rule;
        if (o.rtnLabel)
            querystring += '&rtnLabel=' + o.rtnLabel;
        var url = 'http://' + o.serverIp + ':' + o.serverPort + '/igs/rest/g3d/getFeature';
        var postData = null;
        if (type && type.toLowerCase() === 'post') {
            postData = querystring;
        } else {
            url = url + "?" + querystring;
        }
        Util.corsAjax(url, type, postData, function (res, code) {
            successCallback && successCallback(res, code, o.layerIndex);
        }, errorCallback, 'json', this.proxy);
    }    
}

export default G3DDocQuery;
CesiumZondy.Query.G3DDocQuery = G3DDocQuery;