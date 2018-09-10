/*
修改日期：2017.11.2
修改说明：没有该版本号全部视为老版本！
*/
/**********************************************************常量(枚举)定义************************************************/
/// <summary>数据类型</summary>
goog.provide('Zondy.Enum.XClsType');

Zondy.Enum.XClsType = {};
/// <summary>简单要素类</summary>
Zondy.Enum.XClsType.SFCls = "SFeatureCls",
/// <summary>对象类</summary>
Zondy.Enum.XClsType.OCls = "ObjectCls",
/// <summary>注记类</summary>
Zondy.Enum.XClsType.ACls = "AnnotationCls",
/// <summary>网络类</summary>
Zondy.Enum.XClsType.GnetCls = "GNetCls",
/// <summary>栅格数据集</summary>
Zondy.Enum.XClsType.RDS = "RasterDataset",
/// <summary>简单要素类详细信息</summary>
Zondy.Enum.XClsType.SFClsInfo = "sfcls_new",

/// <summary>矢量数据类型</summary>
goog.provide('Zondy.Enum.VectClsType');

Zondy.Enum.VectClsType = {};
/// <summary>未知类型</summary>
Zondy.Enum.VectClsType.Unknown = 0;
/// <summary>简单要素类</summary>
Zondy.Enum.VectClsType.SFCls = "SFeatureCls",
/// <summary>注记类</summary>
Zondy.Enum.VectClsType.AnnoCls = "AnnotationCls"

/// <summary>要素几何类型</summary>
goog.provide('Zondy.Enum.FeatureType');

Zondy.Enum.FeatureType = {};
/// <summary>未知类型</summary>
Zondy.Enum.FeatureType.Unknown = 0;
/// <summary>点</summary>
Zondy.Enum.FeatureType.Pnt = 1;
/// <summary>线</summary>
Zondy.Enum.FeatureType.Lin = 2;
/// <summary>区</summary>
Zondy.Enum.FeatureType.Reg = 3;



/// <summary>动态注记字形的类型</summary>
goog.provide('Zondy.Enum.FontShape');
Zondy.Enum.FontShape = {};
/// <summary>正体</summary>
Zondy.Enum.FontShape.Positive = 0;
/// <summary>左斜</summary>
Zondy.Enum.FontShape.LeftOblique = 1;
/// <summary>右斜</summary>
Zondy.Enum.FontShape.RightOblique = 2;
/// <summary>左耸</summary>
Zondy.Enum.FontShape.LeftTowering = 3;
/// <summary>右耸</summary>
Zondy.Enum.FontShape.RightTowering = 4;


/// <summary>线的动态注记的线方位类型</summary>
goog.provide('Zondy.Enum.LabelLinType');

Zondy.Enum.LabelLinType = {};
/// <summary>弯曲注记</summary>
Zondy.Enum.LabelLinType.Curved = 0;
/// <summary>笔直注记</summary>
Zondy.Enum.LabelLinType.Forward = 1;
/// <summary>水平注记</summary>
Zondy.Enum.LabelLinType.Horizontal = 2;
/// <summary>正交注记</summary>
Zondy.Enum.LabelLinType.Tangent = 3;

/// <summary>区的动态注记的区方位类型</summary>
goog.provide('Zondy.Enum.LabelRegType');

Zondy.Enum.LabelRegType = {};
/// <summary>沿骨架线弯曲注记</summary>
Zondy.Enum.LabelRegType.Curved = 0;
/// <summary>沿骨架线笔直注记</summary>
Zondy.Enum.LabelRegType.Forward = 1;
/// <summary>水平注记</summary>
Zondy.Enum.LabelRegType.Horizontal = 2;
/// <summary>边界线注记</summary>
Zondy.Enum.LabelRegType.Boundray = 3;
/// <summary>区域外注记</summary>
Zondy.Enum.LabelRegType.Outside = 4;

/// <summary>点的动态注记的方位类型</summary>
goog.provide('Zondy.Enum.LabelPntType');

Zondy.Enum.LabelPntType = {};
/// <summary>任意方位</summary>
Zondy.Enum.LabelPntType.PntAnyDir = 0;
/// <summary>八方位</summary>
Zondy.Enum.LabelPntType.PntEightDir = 1;
/// <summary>压点</summary>
Zondy.Enum.LabelPntType.PntOnFea = 2;

/// <summary>线重复注记策略</summary>
goog.provide('Zondy.Enum.RepeatType');

Zondy.Enum.RepeatType = {};
/// <summary>自动重复注记（当线长度超过注记长度的2倍时重复注记，否则不重复注记）</summary>
Zondy.Enum.RepeatType.Auto = 0;
/// <summary>从不重复注记</summary>
Zondy.Enum.RepeatType.NoRep = 1;
/// <summary>分段注记</summary>
Zondy.Enum.RepeatType.OnStep = 2;

/// <summary> 注记分布的策略</summary>
goog.provide('Zondy.Enum.LabelSpreadType');

Zondy.Enum.LabelSpreadType = {};
/// <summary>自动分布策略（全是数字或字符采用集中注记方式，注记中带有汉字采用分散分布注记）</summary>
Zondy.Enum.LabelSpreadType.AutoSpread = 0;
/// <summary>字符集中分布</summary>
Zondy.Enum.LabelSpreadType.Centralization = 1;
/// <summary>字符分散分布</summary>
Zondy.Enum.LabelSpreadType.Decentralization = 2;

/// <summary>偏离线约束</summary>
goog.provide('Zondy.Enum.LineConstrain');

Zondy.Enum.LineConstrain = {};
/// <summary>注记在线的左边</summary>
Zondy.Enum.LineConstrain.Left = 0;
/// <summary>注记在线的右边</summary>
Zondy.Enum.LineConstrain.Right = 1;
/// <summary>注记在线的上方</summary>
Zondy.Enum.LineConstrain.Above = 2;
/// <summary>注记在线的下方</summary>
Zondy.Enum.LineConstrain.Below = 3;
/// <summary>注记在线的两边</summary>
Zondy.Enum.LineConstrain.Both = 4;
/// <summary>没有约束</summary>
Zondy.Enum.LineConstrain.NoRes = 5;

/// <summary>点八方位注记类型</summary>
goog.provide('Zondy.Enum.EightDirType');

Zondy.Enum.EightDirType = {};
/// <summary>东</summary>
Zondy.Enum.EightDirType.East = 0;
/// <summary>北</summary>
Zondy.Enum.EightDirType.North = 1;
/// <summary>东北</summary>
Zondy.Enum.EightDirType.NorthEast = 2;
/// <summary>西北</summary>
Zondy.Enum.EightDirType.NorthWest = 3;
/// <summary>南</summary>
Zondy.Enum.EightDirType.South = 4;
/// <summary>东南</summary>
Zondy.Enum.EightDirType.SouthEast = 5;
/// <summary>西南</summary>
Zondy.Enum.EightDirType.SouthWest = 6;
/// <summary>西</summary>
Zondy.Enum.EightDirType.West = 7;
/// <summary>无方位</summary>
Zondy.Enum.EightDirType.NoDir = 8;

/// <summary>是否显示弧段</summary>
goog.provide('Zondy.Enum.ISShowArc');

Zondy.Enum.ISShowArc = {};
/// <summary>只显示填充区域</summary>
Zondy.Enum.ISShowArc.Reg = 0;
/// <summary>只显示弧段</summary>
Zondy.Enum.ISShowArc.Arc = 1;
/// <summary>两者都显示</summary>
Zondy.Enum.ISShowArc.All = 2;


/***************************网络分析枚举类型******************************************/

/// <summary>网络分析类型</summary>
goog.provide('Zondy.Enum.Net.NetAnalyType');

Zondy.Enum.Net.NetAnalyType = {};
/// <summary>用户模式</summary>
Zondy.Enum.Net.NetAnalyType.UserMode = "UserMode";
/// <summary>系统模式--普通公路优先</summary>
Zondy.Enum.Net.NetAnalyType.SysModeCommwayPrefer = "SysModeCommwayPrefer";
/// <summary>系统模式--高速公路优先</summary>
Zondy.Enum.Net.NetAnalyType.SysModeHighWayPrefer = "SysModeHighWayPrefer";
/// <summary>系统模式--最少花费</summary>
Zondy.Enum.Net.NetAnalyType.SysModeMinCost = "SysModeMinCost";
/// <summary>系统模式--最短路径</summary>
Zondy.Enum.Net.NetAnalyType.SysModeMinDis = "SysModeMinDis";
/// <summary>系统模式--最短时间</summary>
Zondy.Enum.Net.NetAnalyType.SysModeMinDis = "SysModeMinDis";
/// <summary>系统模式--系统推荐</summary>
Zondy.Enum.Net.NetAnalyType.SysModeSysRecommend = "SysModeSysRecommend";

/// <summary>网络元素类型</summary>
goog.provide('Zondy.Enum.Net.NetElemType');
Zondy.Enum.Net.NetElemType = {};
/// <summary>节点元素</summary>
Zondy.Enum.Net.NetElemType.Node = 1;
/// <summary>边元素</summary>
Zondy.Enum.Net.NetElemType.Edge = 2;
/// <summary>复杂结点元素</summary>
Zondy.Enum.Net.NetElemType.CNode = 3;
/// <summary>链元素</summary>
Zondy.Enum.Net.NetElemType.Chain = 4;
/// <summary>中心元素</summary
Zondy.Enum.Net.NetElemType.Center = 5;
/// <summary>源</summary>
Zondy.Enum.Net.NetElemType.Source = 13;
/// <summary>汇</summary>
Zondy.Enum.Net.NetElemType.Sink = 13;





/// <summary>线型调整方法枚举</summary>
goog.provide('Zondy.Enum.Theme.CLinAdjustType');
Zondy.Enum.Theme.CLinAdjustType = {
    /// <summary>
    /// 调整
    /// </summary>
    Adjust: 0,
    /// <summary>
    /// 不调整
    /// </summary>
    NoAdjust: 1
};

/// <summary>线头类型枚举定义</summary>   
goog.provide('Zondy.Enum.Theme.CLinHeadType');
Zondy.Enum.Theme.CLinHeadType = {
    /// <summary>
    /// 圆头
    /// </summary>
    Round: 0,
    /// <summary>
    /// 平头
    /// </summary>
    Square: 1,
    /// <summary>
    /// 尖头
    /// </summary>
    Butt: 2
};

/// <summary>线拐角类型枚举</summary>
goog.provide('Zondy.Enum.Theme.CLinJointType');
Zondy.Enum.Theme.CLinJointType = {
    /// <summary>
    /// 圆角
    /// </summary>
    Round: 0,
    /// <summary>
    /// 平角
    /// </summary>
    Square: 1,
    /// <summary>
    /// 尖角
    /// </summary>
    Butt: 2
};

/// <summary>线型生成方法</summary>
goog.provide('Zondy.Enum.Theme.CLinStyleMakeType');
Zondy.Enum.Theme.CLinStyleMakeType = {
    /// <summary>
    /// 规律性生成线型
    /// </summary>
    Byrule: 0,
    /// <summary>
    /// 按控制点生成线型
    /// </summary> 
    Bypoint: 1
};

/// <summary>统计分段类型</summary>
goog.provide('Zondy.Enum.Theme.CItemType');
Zondy.Enum.Theme.CItemType = {
    /// <summary>
    /// 未知类型
    /// </summary>
    Unknown: 0,
    /// <summary>
    /// 唯一值
    /// </summary>
    UniqueTheme: 1,
    /// <summary>
    /// 范围
    /// </summary>
    RangeTheme: 2
};

/****************************************************************************************/



/***************************地图服务相关枚举类型******************************************/

/// <summary>地图类型</summary>
goog.provide('Zondy.Enum.Map.MapType');

Zondy.Enum.Map.MapType = {
    Doc: "mapType",  //发布的地图文档
    Tile: "tileType" //发布的瓦片地图
};

/// <summary>图层状态类型</summary>
goog.provide('Zondy.Enum.Map.LayerStatusType');

Zondy.Enum.Map.LayerStatusType = {
    Show: "show",         //仅仅显示指定了图层序号的图层
    Hide: "hide",        //显示除hide参数指定图层外所有的图层
    Include: "include",   //除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图层显示，追加的这些图层必须为地图中包含的图层。
    Exclude: "exclude"    //从默认图层列表里删除这些被指定的图层后，进行显示
};


/// <summary>天地图资源类型</summary>
goog.provide('Zondy.Enum.Map.TiandituType');

Zondy.Enum.Map.TiandituType = {
    VEC: 'vec',         //天地图矢量数据
    IMG: 'img',         //天地图影像数据
    CVA: 'cva',         //天地图矢量注记数据
    CIA: 'cia',         //天地图影像注记数据
    VEC_IGS: 'vec_igs', //天地图矢量数据(通过IGS)
    IMG_IGS: 'img_igs', //天地图影像数据(通过IGS)
    CVA_IGS: 'cva_igs', //天地图矢量注记数据(通过IGS)
    CIA_IGS: 'cia_igs'  //天地图影像注记数据(通过IGS)
};
/// <summary>天地图资源类型</summary>
goog.provide('Zondy.Enum.TiandituType');

Zondy.Enum.TiandituType = {
    VEC: 'vec',         //天地图矢量数据
    IMG: 'img',         //天地图影像数据
    CVA: 'cva',         //天地图矢量注记数据
    CIA: 'cia',         //天地图影像注记数据
    VEC_IGS: 'vec_igs', //天地图矢量数据(通过IGS)
    IMG_IGS: 'img_igs', //天地图影像数据(通过IGS)
    CVA_IGS: 'cva_igs', //天地图矢量注记数据(通过IGS)
    CIA_IGS: 'cia_igs'  //天地图影像注记数据(通过IGS)
};


/// <summary>谷歌地图资源类型</summary>
goog.provide('Zondy.Enum.Map.GoogleLayerType');

Zondy.Enum.Map.GoogleLayerType = {
    VEC: 'vector',            //Google矢量数据
    RASTER: 'raster',         //Google影像数据
    ROAD: 'road',             //Google道路数据
    TERRAIN: 'terrain',       //Google地形数据
    VEC_IGS: 'vector_igs',    //Google矢量数据(通过IGS)
    RASTER_IGS: 'raster_igs', //Google影像数据(通过IGS)
    ROAD_IGS: 'road_igs',     //Google道路数据(通过IGS)
    TERRAIN_IGS: 'terrain_igs'//Google地形数据(通过IGS)
};

/// <summary>谷歌地图资源类型</summary>
goog.provide('Zondy.Enum.GoogleLayerType');

Zondy.Enum.GoogleLayerType = {
    VEC: 'vector',            //Google矢量数据
    RASTER: 'raster',         //Google影像数据
    ROAD: 'road',             //Google道路数据
    TERRAIN: 'terrain',       //Google地形数据
    VEC_IGS: 'vector_igs',    //Google矢量数据(通过IGS)
    RASTER_IGS: 'raster_igs', //Google影像数据(通过IGS)
    ROAD_IGS: 'road_igs',     //Google道路数据(通过IGS)
    TERRAIN_IGS: 'terrain_igs'//Google地形数据(通过IGS)
};

/// <summary>ArcGIS地图资源类型</summary>
goog.provide('Zondy.Enum.Map.ArcGISLayerType');

Zondy.Enum.Map.ArcGISLayerType = {
    ImageryWorld2D: 'ESRI_Imagery_World_2D',
    StreetMapWorld2D: 'ESRI_StreetMap_World_2D',
    TopoUS2D: 'NGS_Topo_US_2D',
    WorldImagery: 'World_Imagery',
    WorldPhysical: 'World_Physical_Map',
    WorldShadedRelief: 'World_Shaded_Relief',
    WorldStreet: 'World_Street_Map',
    WorldTerrainBase: 'World_Terrain_Base',
    WorldTopo: 'World_Topo_Map',
    NatGeoWorldMap: 'NatGeo_World_Map',
    OceanBasemap: 'Ocean_Basemap',
    USATopoMaps: 'USA_Topo_Maps'
};

/// <summary>ArcGIS地图资源类型兼容OpenLayers2的枚举</summary>
goog.provide('Zondy.Enum.ArcGISLayerType');

Zondy.Enum.ArcGISLayerType = {
    ImageryWorld2D: 'ESRI_Imagery_World_2D',
    StreetMapWorld2D: 'ESRI_StreetMap_World_2D',
    TopoUS2D: 'NGS_Topo_US_2D',
    WorldImagery: 'World_Imagery',
    WorldPhysical: 'World_Physical_Map',
    WorldShadedRelief: 'World_Shaded_Relief',
    WorldStreet: 'World_Street_Map',
    WorldTerrainBase: 'World_Terrain_Base',
    WorldTopo: 'World_Topo_Map',
    NatGeoWorldMap: 'NatGeo_World_Map',
    OceanBasemap: 'Ocean_Basemap',
    USATopoMaps: 'USA_Topo_Maps'
};

/// <summary>OpenStreet地图资源类型</summary>
goog.provide('Zondy.Enum.Map.OpenStreetLayerType');

Zondy.Enum.Map.OpenStreetLayerType = {
    LandScape: 'landscape',
    CYCLE: 'cycle',
    CycleTransport: 'transport',
    OSM: 'openstreetmap',
    OSM_HYB: 'hyb',
    OSM_Quest: 'mapquest',
    OSM_Q_SAT: 'OSM_sat'
};

/// <summary>OpenStreet地图资源类型</summary>
goog.provide('Zondy.Enum.OpenStreetLayerType');

Zondy.Enum.OpenStreetLayerType = {
    LandScape: 'landscape',
    CYCLE: 'cycle',
    CycleTransport: 'transport',
    OSM: 'openstreetmap',
    OSM_HYB: 'hyb',
    OSM_Quest: 'mapquest',
    OSM_Q_SAT: 'OSM_sat'
};

/****************************************************************************************/

//**********************************************************常用扩展方法(start)************************************************//
goog.provide('Zondy.Util');

//扩展的一些常用的方法均写在该js文件中
Zondy.Util = function () {

};

Zondy.Util.getTopAnalysisResult = function (enumNum) {
    /// <summary>解析拓扑分析的服务器REST返回结果，以更友好的形式返回给客户端</summary>
    switch (enumNum) {
        case 0:
            return "Intersect";
        case 1:
            return "Disjoin";
        case 2:
            return "Include";
        case 3:
            return "Adjacent";
        default:
            return "Unknown";
    }
};

Zondy.Util.newGuid = function () {
    /// <summary>生成一个guid</summary>
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
};

Zondy.Util.objectDeleteUnuseful = function (obj, array) {
    /// <summary>删除对象的指定属性</summary>
    /// <param name="obj" type="Object">操作对象</param>
    /// <param name="array" type="String in an Array">需要删除的属性名称</param>
    $.each(array, function (i, value) {
        delete obj[value];
    });
    return obj;
};

Zondy.Util.toUrlParameters = function (obj) {
    if (obj) {
        var rltStr = '';
        $.each(obj, function (key, value) {
            rltStr = rltStr + '&' + key + '=' + value;
        });
        rltStr = rltStr.substring(1, rltStr.length);
        return rltStr;
    } else {
        return '';
    }
};



jQuery.extend({
    /// <summary>将javascript数据类型转换为json字符串</summary>
    /// <param name="object" type="{Object}">待转换对象,支持object,array,string,function,number,boolean,regexp</param>
    /// <param name="exclude" type="{Array}">要排除的属性名称数组，在次数组里的属性将不会被加入到json字符串中</param>
    /// <param name="splitor" type="String">指明属性间用什么符号分割，默认为‘，’</param>
    /// <param name="containQuot" type="Bool">属性名和属性值是否包含引号，如果为false，那么即使是字符串也不会被引号包裹</param>
    toJSON: function (object, exclude, splitor, containQuot) {
        if (object == null)
            return null;
        var type = typeof object;
        var results, value;
        if ('object' == type) {
            if (Array == object.constructor) type = 'array';
            else if (RegExp == object.constructor) type = 'regexp';
            else type = 'object';
        }
        switch (type) {
            case 'undefined':
            case 'unknown':
                return;
            case 'function':
                return;
            case 'boolean':
            case 'regexp':
                return object.toString();
            case 'number':
                return isFinite(object) ? object.toString() : 'null';
            case 'string':
                if (containQuot || containQuot == undefined) {
                    return '"' + object.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function () {
                        var a = arguments[0];
                        return (a == '\n') ? '\\n' : (a == '\r') ? '\\r' : (a == '\t') ? '\\t' : "";
                    }) + '"';
                }
                else {
                    return object;
                }
            case 'object':
                results = [];
                for (var property in object) {
                    if (exclude != undefined | exclude != null) {
                        if ($.inArray(property, exclude) > -1)
                            continue;
                    }
                    value = jQuery.toJSON(object[property], null, null, containQuot);
                    if (value !== undefined) results.push(jQuery.toJSON(property, null, null, containQuot) + ':' + value);
                }
                if (splitor != undefined) {
                    return '{' + results.join(splitor) + '}';
                }
                else {
                    return '{' + results.join(',') + '}';
                }
            case 'array':
                results = [];
                for (var i = 0; i < object.length; i++) {
                    value = jQuery.toJSON(object[i], null, null, containQuot);
                    if (value !== undefined) {
                        if (value == null) {
                            value = 'null';
                        }
                        results.push(value);
                    }
                }
                return '[' + results.join(',') + ']';
        }
    }
});

//扩展jQuery对json字符串的转换 
jQuery.extend({
    /** * @see 将json字符串转换为对象 * @param json字符串 * @return 返回object,array,string等对象 */
    evalJSON: function (strJson) {
        return eval("(" + strJson + ")");
    }
});
//**********************************************************常用扩展方法(end)************************************************//
//**********************************************************Zondy.Object(start)************************************************//
goog.provide('Zondy.Object.Tangram');

/// <summary> 几何对象基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Tangram = function (opt_options) {
    var options = opt_options ? opt_options : {};
    ol.obj.assign(this, options);
};

/// <summary> 
/// 实现将openlayers的geomerty转换为zondy的几何类型
/// 此方法由子类实现
/// </summary>
Zondy.Object.Tangram.prototype.setByOL = function (openlayersObj) {
    return null;
};

/// <summary>
/// 对象转化为字符串
/// </summary>
Zondy.Object.Tangram.prototype.toString = function () {
    return "";
};

/// <summary>
/// 获取几何类型名称,由子类实现
/// </summary>
Zondy.Object.Tangram.prototype.getGeometryType = function () {
    return;
};

/// <summary>
/// 1.去除字符串前后所有空格
/// 2.去除字符串中所有空格(包括中间空格,需要设置第2个参数为:g) 
/// </summary>
Zondy.Object.Tangram.prototype.Trim = function (str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
};
goog.provide('Zondy.Object.Point2D');
/// <summary>点几何对象构造函数</summary>
/// <param name="x" type="double">点x坐标</param>
/// <param name="y" type="double">点y坐标</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Point2D = function (x, y, opt_options) {
    this.x = x !== undefined ? x : null;
    this.y = y !== undefined ? y : null;

    var options = opt_options ? opt_options : {};

    /// <summary>容差半径 double</summary>(**只在做点查询时需赋值**)
    this.nearDis = options.nearDis !== undefined ? parseFloat(options.nearDis) : null;

    Zondy.Object.Tangram.call(this, options);
};
ol.inherits(Zondy.Object.Point2D, Zondy.Object.Tangram);

/// <summary>
/// 获取几何类型名称
/// </summary>
Zondy.Object.Point2D.prototype.getGeometryType = function () {
    return "point";
};

/// <summary>
///通过传入Openlayers的ol.geom.Point类型来设置参数
///</summary>
/// <param name="point" type="ol.geom.Point">Openlayers定义的点类型</param>
Zondy.Object.Point2D.prototype.setByOL = function (point) {
    if (point !== undefined) {
        var cordinate = point.getCoordinates();
        this.x = cordinate[0];
        this.y = cordinate[1];
    }
};

/// <summary>
/// 对象转化为字符串
/// </summary>
Zondy.Object.Point2D.prototype.toString = function () {
    /// <summary>返回一个以字符串形式表示的点</summary>
    if (this.x == null || this.y == null)
        return "";
    var str = this.x + ',' + this.y;
    if (this.nearDis !== undefined) {
        str += ";" + this.nearDis;
    }
    return str;
};
goog.provide('Zondy.Object.PointForQuery');
/// <summary>点几何对象构造函数</summary>
/// <param name="x" type="double">点x坐标</param>
/// <param name="y" type="double">点y坐标</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.PointForQuery = function (x, y, opt_options) {
    this.x = x !== undefined ? x : null;
    this.y = y !== undefined ? y : null;

    var options = opt_options ? opt_options : {};

    /// <summary>容差半径 double</summary>(**只在做点查询时需赋值**)
    this.nearDis = options.nearDis !== undefined ? parseFloat(options.nearDis) : null;

    Zondy.Object.Tangram.call(this, options);
};
ol.inherits(Zondy.Object.PointForQuery, Zondy.Object.Tangram);

/// <summary>
/// 获取几何类型名称
/// </summary>
Zondy.Object.PointForQuery.prototype.getGeometryType = function () {
    return "point";
};

/// <summary>
///通过传入Openlayers的ol.geom.Point类型来设置参数
///</summary>
/// <param name="point" type="ol.geom.Point">Openlayers定义的点类型</param>
Zondy.Object.PointForQuery.prototype.setByOL = function (point) {
    if (point !== undefined) {
        var cordinate = point.getCoordinates();
        this.x = cordinate[0];
        this.y = cordinate[1];
    }
};

/// <summary>
/// 对象转化为字符串
/// </summary>
Zondy.Object.PointForQuery.prototype.toString = function () {
    /// <summary>返回一个以字符串形式表示的点</summary>
    if (this.x == null || this.y == null)
        return "";
    var str = this.x + ',' + this.y;
    if (this.nearDis !== undefined) {
        str += ";" + this.nearDis;
    }
    return str;
};
/*Zondy.Object.Circle----------------------------------------------------------------------------------------------------------
* 圆几何对象
*/
goog.provide('Zondy.Object.Circle');

/// <summary>圆几何对象构造函数</summary>
/// <param name="point" type="Zondy.Object.Point2D">圆心点</param>
/// <param name="radious" type="Float">半径</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Circle = function (point, radious, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.Tangram.call(this, options);
    this.point = (point !== undefined && point != null) ? point : null;
    this.radious = (radious !== undefined && radious != null) ? radious : null;


};
ol.inherits(Zondy.Object.Circle, Zondy.Object.Tangram);

/// <summary> 通过传入Openlayers的ol.geom.Circle类型来设置参数</summary>
/// <param name="openlayersPoly" type="ol.geom.Circle">由Openlayers定义的多边形</param>
Zondy.Object.Circle.prototype.setByOL = function (openlayersPoly) {
    if (openlayersPoly !== undefined && openlayersPoly != null) {
        //圆心
        var centerPoint = openlayersPoly.getCenter();
        //圆半径
        var radious = openlayersPoly.getRadius();
        this.point = new Zondy.Object.Point2D(centerPoint[0], centerPoint[1]);
        this.radious = radious;
    }
};

/// <summary>
///返回一个字符串来表示该多边形
///</summary>
Zondy.Object.Circle.prototype.toString = function () {
    if (this.point == null || this.point.length == 0 || this.radious == null) {
        return "";
    }
    return this.point.x + "," + this.point.y + "," + this.radious;
};

/// <summary>
///获取几何类型名称
///</summary>
Zondy.Object.Circle.prototype.getGeometryType = function () {
    return "Circle";
};


/*Zondy.Object.PolyLine---------------------------------------------------------------------------------------------------------
* 线几何对象
*/
goog.provide('Zondy.Object.PolyLine');

/// <summary>线几何对象构造函数</summary>
/// <param name="pointArr" type="Array,Zondy.Object.Point2D in an Array">
/// 一组点几何对象
/// </param>
Zondy.Object.PolyLine = function (pointArr, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.Tangram.call(this, options);
    /// <summary>线搜素半径 double</summary>(**只在做线查询时需赋值**)
    this.nearDis = (options.nearDis !== undefined && options.nearDis != null) ? parseFloat(options.nearDis) : null;
    this.pointArr = ((pointArr !== undefined && pointArr != null) && Array.isArray(pointArr)) ? pointArr : new Array();
};
ol.inherits(Zondy.Object.PolyLine, Zondy.Object.Tangram);

/// <summary> 通过传入Openlayers的ol.geom.LineString类型来设置参数</summary>
/// <param name="openlayersLine" type="ol.geom.LineString">由Openlayers定义的折线对象</param>
Zondy.Object.PolyLine.prototype.setByOL = function (openlayersLine) {
    if (openlayersLine !== undefined && openlayersLine != null) {
        var dotArr = openlayersLine.getCoordinates();
        var len = dotArr.length;
        for (var i = 0; i < len; i++) {
            this.pointArr[i] = new Zondy.Object.Point2D(dotArr[i][0], dotArr[i][1]);
        }
    }
};

/// <summary>
/// 返回一个字符串来表示该折线
/// </summary>
Zondy.Object.PolyLine.prototype.toString = function () {
    if (this.pointArr == null || this.pointArr.length == 0)
        return "";
    var str = this.pointArr[0].x + ',' + this.pointArr[0].y;
    for (var i = 1; i < this.pointArr.length; i++) {
        str += "," + this.pointArr[i].x + ',' + this.pointArr[i].y;
    }
    if (this.nearDis !== undefined && this.nearDis != null) {

        str += ";" + this.nearDis;
    }
    else {
        str = str.substring(0, str.length - 1);
    }
    return this.Trim(str, "g");
};

/// <summary>
/// 获取几何类型名称
/// </summary>
Zondy.Object.PolyLine.prototype.getGeometryType = function () {
    return "line";
};
/*----------------------------------------------------------------------------------------------------------------------------*/
goog.provide('Zondy.Object.Rectangle');

/// <summary>矩形几何对象构造函数</summary>
/// <param name="m_arguments" type="String">矩形坐标（"xmin,ymin,xmax,ymax"）</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Rectangle = function (xmin, ymin, xmax, ymax, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.Tangram.call(this, options);
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
};
ol.inherits(Zondy.Object.Rectangle, Zondy.Object.Tangram);

/// <summary>
/// 使用一个由Openlayers定义的矩形来构造本对象
/// </summary>
/// <param name="openlayersRect" type="ol.extent">
/// 由OpenLayers定义的矩形对象
/// </param>
Zondy.Object.Rectangle.prototype.setByOL = function (openlayersRect) {
    if (openlayersRect === undefined || openlayersRect == null) {
        return;
    }
    this.xmin = openlayersRect[0];
    this.ymin = openlayersRect[1];
    this.xmax = openlayersRect[2];
    this.ymax = openlayersRect[3];
};

/// <summary>
/// 返回一个字符串来表示此矩形
/// </summary>
Zondy.Object.Rectangle.prototype.toString = function () {
    return "" + this.xmin + ',' + this.ymin + ',' + this.xmax + ',' + this.ymax;
};

/// <summary>
/// 获取几何类型名称
/// </summary>
Zondy.Object.Rectangle.prototype.getGeometryType = function () {
    return "rect";
};

/// <summary>
/// 将本对象转换为一个OpenLayers.Bound对象
/// </summary>
/// <returns type="ol.extent" />
Zondy.Object.Rectangle.prototype.convertToBound = function () {
    var bounds = [this.xmin, this.ymin, this.ymax, this.xmax];
    return bounds;
};
/*Zondy.Object.Polygon---------------------------------------------------------------------------------------------------------
* 多边形几何对象
*/
goog.provide('Zondy.Object.Polygon');

/// <summary>多边形几何对象构造函数</summary>
/// <param name="pointArr" type="Array,Zondy.Object.Point2D in an Array">一组点类型</param>
Zondy.Object.Polygon = function (pointArr, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.Tangram.call(this, options);
    this.pointArr = ((pointArr !== undefined && pointArr != null) && Array.isArray(pointArr)) ? pointArr : new Array();
};
ol.inherits(Zondy.Object.Polygon, Zondy.Object.Tangram);

/// <summary> 通过传入Openlayers的ol.geom.Polygon类型来设置参数</summary>
/// <param name="openlayersPoly" type="ol.geom.Polygon">由Openlayers定义的多边形</param>
Zondy.Object.Polygon.prototype.setByOL = function (openlayersPoly) {
    if (openlayersPoly !== undefined && openlayersPoly != null) {
        var linering = openlayersPoly.getLinearRing(0);
        var pointArr = linering.getCoordinates();
        var len = pointArr.length;
        for (var i = 0; i < len; i++) {
            this.pointArr[i] = new Zondy.Object.Point2D(pointArr[i][0], pointArr[i][1]);
        }
    }
};

/// <summary>
///返回一个字符串来表示该多边形
///</summary>
Zondy.Object.Polygon.prototype.toString = function () {
    if (this.pointArr == null || this.pointArr.length == 0) {
        return "";
    }
    var str = "";
    for (var i = 0; i < this.pointArr.length; i++) {
        str += this.pointArr[i].x + ',' + this.pointArr[i].y + ',';
    }
    return str.substring(0, str.length - 1);
};

/// <summary>
///获取几何类型名称
///</summary>
Zondy.Object.Polygon.prototype.getGeometryType = function () {
    return "polygon";
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.MultiPolygon----------------------------------------------------------------------------------------------------
* 多多边形几何对象
*/
goog.provide('Zondy.Object.MultiPolygon');

/// <summary>多多边形几何对象构造函数</summary>
/// <param name="polygonArr" type="Zondy.Object.Polygon in an Array">
/// 多边形数组
/// </param>
Zondy.Object.MultiPolygon = function (polygonArr, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.Tangram.call(this, options);
    this.polygonArr = ((polygonArr !== undefined && polygonArr != null) && Array.isArray(polygonArr)) ? polygonArr : new Array();
};
ol.inherits(Zondy.Object.MultiPolygon, Zondy.Object.Tangram);

/// <summary> 
/// 通过传入Openlayers的ol.geom.Polygon类型来设置参数
/// </summary>
/// <param name="openlayersPoly" type="ol.geom.Polygon">由Openlayers定义的多边形</param>
Zondy.Object.MultiPolygon.prototype.setByOL = function (openlayersPoly) {
    if (openlayersPoly !== undefined && openlayersPoly != null) {
        this.polygonArr = [];

        var polygonLen = openlayersPoly.getLinearRingCount();
        var lineRingArr = openlayersPoly.getLinearRings();
        for (var i = 0; i < polygonLen; i++) {
            var pointArr = lineRingArr[i].getCoordinates()
            var len = pointArr.length;
            var polygonPoints = [];
            for (var j = 0; j < len; j++) {
                polygonPoints[j] = new Zondy.Object.Point2D(pointArr[j][0], pointArr[j][1]);
            }
            this.polygonArr[i] = new Zondy.Object.Polygon(polygonPoints);
        }
    }
};

/// <summary>
/// 返回一个字符串来表示该多边形
/// </summary>
Zondy.Object.MultiPolygon.prototype.toString = function () {
    if (this.polygonArr === undefined || this.polygonArr == null || this.polygonArr.length == 0)
        return "";
    var str = "";
    for (var i = 0; i < this.polygonArr.length; i++) {
        str += this.polygonArr[i].toString() + ";";
    }
    return str.substring(0, str.length - 1);
};

/// <summary>
/// 获取几何类型名称
/// </summary>
Zondy.Object.MultiPolygon.prototype.getGeometryType = function () {
    return "multiPolygon";
};
/*----------------------------------------------------------------------------------------------------------------------------*/
goog.provide('Zondy.Object.CGDBInfo');

/// <summary>地理数据库信息对象构造函数</summary>
/// <param name="GDBSvrName" type="string">数据源名称</param>
/// <param name="GDBName" type="string">数据库名称</param>
/// <param name="User" type="string">用户名</param>
/// <param name="Password" type="string">密码</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.CGDBInfo = function (opt_options) {
    var options = opt_options ? opt_options : {};

    /// <summary>数据源名称{String}</summary>
    this.GDBSvrName = options.ServerName !== undefined ? options.ServerName : null;

    /// <summary>数据库名称{String}</summary>
    this.GDBName = options.GDBName !== undefined ? options.GDBName : null;

    /// <summary>用户名{String}</summary>         
    this.User = options.User !== undefined ? options.User : null;

    /// <summary>密码{String}</summary>                 
    this.Password = options.Password !== undefined ? options.Password : null;

    ol.obj.assign(this, options);
};
goog.provide('Zondy.Object.FeatureGraphicBase');

/// <summary>要素几何图形信息基类对象构造函数</summary>
/// <param name="GID" type="Int">要素几何图形ID</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.FeatureGraphicBase = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    this.GID = (options.GID !== undefined && options.GID != null) ? options.GID : 0;
};

/// <summary>设置要素几何图形ID</summary>
/// <param name="id" type="Interger">要素几何图形ID号</param>
Zondy.Object.FeatureGraphicBase.prototype.setGID = function (id) {
    if (id !== undefined && id != null) {
        this.GID = id;
    }
};
goog.provide('Zondy.Object.Arc');

/// <summary>弧段对象构造函数</summary>
/// <param name="dots" type="Array,Zondy.Object.Point2D in an Array">一组点用以构造弧段</param>
/// <param name="ArcID" type="int">弧段ID</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Arc = function (dots, opt_options) {
    this.ArcID = 0;
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    this.Dots = (dots !== undefined && dots != null) ? dots : null;
};
goog.provide('Zondy.Object.AnyLine');

/// <summary>线对象构造函数</summary>
/// <param name="arcs" type="Array,Zondy.Object.Arc in an Array">一组Zondy.Object.Arc，用以描述弧段</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.AnyLine = function (arcs, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    this.Arcs = (arcs !== undefined && arcs != null) ? arcs : null;
};
goog.provide('Zondy.Object.GRegion');

/// <summary>区要素几何图形信息对象构造函数</summary>
/// <param name="rings" type="Array,Zondy.Object.AnyLine in an Array">一组线几何对象</param>
Zondy.Object.GRegion = function (rings, opt_options) {


    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.FeatureGraphicBase.call(this, options);
    this.Rings = ((rings !== undefined && rings != null) && Array.isArray(rings)) ? rings : null;
};
ol.inherits(Zondy.Object.GRegion, Zondy.Object.FeatureGraphicBase);

/// <summary>设置区要素几何信息</summary>
/// <param name="rings" type="Zondy.Object.AnyLine in an Array">一组线几何对象</param>
Zondy.Object.GRegion.prototype.setRings = function (rings) {
    this.Rings = (rings !== undefined && rings != null) ? rings : null;
};
/*Zondy.Object.GLine----------------------------------------------------------------------------------------------------------
* 线要素几何图形信息对象
*/
goog.provide('Zondy.Object.GLine');

/// <summary>线要素几何图形信息对象构造函数</summary>
/// <param name="line" type="Zondy.Object.AnyLine">构造线要素的线几何对象</param>
Zondy.Object.GLine = function (line, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.FeatureGraphicBase.call(this, options);
    this.Line = (line !== undefined && line != null) ? line : null;
};
ol.inherits(Zondy.Object.GLine, Zondy.Object.FeatureGraphicBase);

/// <summary>设置线要素几何信息</summary>
/// <param name="line" type="Zondy.Object.AnyLine">线几何对象</param>
Zondy.Object.GLine.prototype.setLine = function (line) {
    this.Line = (line !== undefined && line != null) ? line : null;
};
/*Zondy.Object.GPoint----------------------------------------------------------------------------------------------------------
* 点要素几何图形信息对象
*/
goog.provide('Zondy.Object.GPoint');

/// <summary>点要素几何图形信息对象构造函数</summary>
/// <param name="x" type="Float">x坐标</param>
/// <param name="y" type="Float">y坐标</param>
Zondy.Object.GPoint = function (x, y, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.FeatureGraphicBase.call(this, options);

    if ((x !== undefined && x != null) && (y !== undefined && y != null)) {
        /// <summary>点几何对象</summary>
        /// <param name="Dot" type="Zondy.Object.Point2D">几何类型</param>
        this.Dot = new Zondy.Object.Point2D(x, y);
    }
};
ol.inherits(Zondy.Object.GPoint, Zondy.Object.FeatureGraphicBase);

/// <summary>设置点要素几何信息</summary>
/// <param name="pnt" type="Zondy.Object.Point2D">点几何对象</param>
Zondy.Object.GPoint.prototype.setDot = function (pnt) {
    this.Dot = (pnt !== undefined && pnt != null) ? pnt : null;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.CLineInfo------------------------------------------------------------------------------------------------------
* 线要素的符号参数信息对象
*/
goog.provide('Zondy.Object.CLineInfo');

/// <summary>线要素的符号参数信息对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.CLineInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>线颜色</summary>
    this.Color = (options.Color !== undefined && options.Color != null) ? options.Color : 1;

    /// <summary>线型ID</summary>
    this.LinStyleID = (options.LinStyleID !== undefined && options.LinStyleID != null) ? options.LinStyleID : 1;

    /// <summary>辅助线型ID</summary>
    this.LinStyleID2 = (options.LinStyleID2 !== undefined && options.LinStyleID2 != null) ? options.LinStyleID2 : 0;

    /// <summary>线宽度</summary>
    this.LinWidth = (options.LinWidth !== undefined && options.LinWidth != null) ? options.LinWidth : 1;

    /// <summary>x比例系数</summary>
    this.Xscale = (options.Xscale !== undefined && options.Xscale != null) ? options.Xscale : 1;

    /// <summary>y比例系数</summary>
    this.Yscale = (options.Yscale !== undefined && options.Yscale != null) ? options.Yscale : 1;


};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.CPointInfo------------------------------------------------------------------------------------------------------
* 点要素的符号参数信息对象
*/
goog.provide('Zondy.Object.CPointInfo');

/// <summary>点要素的符号参数信息对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.CPointInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>子图角度</summary>
    this.Angle = (options.Angle !== undefined && options.Angle != null) ? options.Angle : 1;

    /// <summary>子图颜色</summary>
    this.Color = (options.Color !== undefined && options.Color != null) ? options.Color : 1;

    /// <summary>子图高度</summary>
    this.SymHeight = (options.SymHeight !== undefined && options.SymHeight != null) ? options.SymHeight : 1;

    /// <summary>子图ID</summary>
    this.SymID = (options.SymID !== undefined && options.SymID != null) ? options.SymID : 1;

    /// <summary>子图宽度</summary>
    this.SymWidth = (options.SymWidth !== undefined && options.SymWidth != null) ? options.SymWidth : 1;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.CRegionInfo-----------------------------------------------------------------------------------------------------
* 区要素的符号参数信息对象
*/
goog.provide('Zondy.Object.CRegionInfo');

/// <summary>区要素的符号参数信息对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.CRegionInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>结束填充色</summary>
    this.EndColor = (options.EndColor !== undefined && options.EndColor != null) ? options.EndColor : 1;

    /// <summary>填充颜色</summary>
    this.FillColor = (options.FillColor !== undefined && options.FillColor != null) ? options.FillColor : 1;

    /// <summary>填充模式</summary>
    this.FillMode = (options.FillMode !== undefined && options.FillMode != null) ? options.FillMode : 0;

    /// <summary>填充图案笔宽</summary>
    this.OutPenWidth = (options.OutPenWidth !== undefined && options.OutPenWidth != null) ? options.OutPenWidth : 1;

    /// <summary>填充图案角度</summary>
    this.PatAngle = (options.PatAngle !== undefined && options.PatAngle != null) ? options.PatAngle : 1;

    /// <summary>填充图案颜色</summary>
    this.PatColor = (options.PatColor !== undefined && options.PatColor != null) ? options.PatColor : 1;

    /// <summary>填充图案高度</summary>
    this.PatHeight = (options.PatHeight !== undefined && options.PatHeight != null) ? options.PatHeight : 1;

    /// <summary>填充图案ID</summary>
    this.PatID = (options.PatID !== undefined && options.PatID != null) ? options.PatID : 1;

    /// <summary>填充图案宽度</summary>
    this.PatWidth = (options.PatWidth !== undefined && options.PatWidth != null) ? options.PatWidth : 1;


};
/*----------------------------------------------------------------------------------------------------------------------------*/
goog.provide('Zondy.Object.CAttDataRow');

/**
* @api stable
*/
Zondy.Object.CAttDataRow = function (values, fid, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    this.FID = (fid !== undefined && fid != null) ? fid : 0;
    this.Values = (values !== undefined && values != null) ? values : null;
};
goog.provide('Zondy.Object.CAttStruct');
/**
* @api stable
*/
Zondy.Object.CAttStruct = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    /// <param name="FldNumber" type="int">属性个数</param>
    this.FldNumber = (options.FldNumber !== undefined) ? options.FldNumber : 0;

    /// <param name="FldName" type="Array,string in an Array">属性字段名数组</param>
    this.FldName = (options.FldName !== undefined) ? options.FldName : null;

    /// <param name="FldType" type="Array,string in an Array">属性字段类型数组</param>
    this.FldType = (options.FldType !== undefined) ? options.FldType : null;

};

goog.provide('Zondy.Object.FeatureGeometry');

/// <summary>要素几何信息对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.FeatureGeometry = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>点几何信息</summary>
    /// <param name="PntGeom" type="Zondy.Object.GPoint in an Array">几何类型</param>
    this.PntGeom = (options.PntGeom !== undefined && options.PntGeom != null) ? options.PntGeom : null;

    /// <summary>线几何信息</summary>
    /// <param name="LinGeom" type="Zondy.Object.GLine in an Array">几何类型</param>
    this.LinGeom = (options.LinGeom !== undefined && options.LinGeom != null) ? options.LinGeom : null;

    /// <summary>区几何信息</summary>
    /// <param name="RegGeom" type="Zondy.Object.GRegion in an Array">几何类型</param>
    this.RegGeom = (options.RegGeom !== undefined && options.RegGeom != null) ? options.RegGeom : null;


};

/// <summary>设置点几何</summary>
/// <param name="pnts" type="Zondy.Object.GPoint in Array">点几何数组</param>
Zondy.Object.FeatureGeometry.prototype.setPntGeom = function (pnts) {
    this.PntGeom = ((pnts !== undefined && pnts != null) && Array.isArray(pnts)) ? pnts : null;
};

/// <summary>设置线几何</summary>
/// <param name="lines" type="Zondy.Object.GLine in Array">线几何数组</param>
Zondy.Object.FeatureGeometry.prototype.setLine = function (lines) {
    this.LinGeom = ((lines !== undefined && lines != null) && Array.isArray(lines)) ? lines : null;
};

/// <summary>设置区几何</summary>
/// <param name="Regs" type="Zondy.Object.GRegion in Array">区几何数组</param>
Zondy.Object.FeatureGeometry.prototype.setRegGeom = function (Regs) {
    this.RegGeom = ((Regs !== undefined && Regs != null) && Array.isArray(Regs)) ? Regs : null;
};
/*Zondy.Object.CGetImageBySRSID------------------------------------------------------------------------------------------------
* 空间参照系信息对象
*/
goog.provide('Zondy.Object.CGetImageBySRSID');

/// <summary>空间参照系信息对象构造函数</summary>
/// <param name="SRSID" type="Interger">空间参照系ID</param>
/// <param name="gdbInfo" type="Zondy.Object.CGDBInfo">空间参照系所属地理数据库信息</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.CGetImageBySRSID = function (srsID, gdbInfo, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    this.SRSID = (srsID !== undefined && srsID != null) ? srsID : -1;
    this.GdbInfo = (gdbInfo !== undefined && gdbInfo != null) ? gdbInfo : null;
};
/*Zondy.Object.DynNoteLabelType------------------------------------------------------------------------------------------------
* 动态注记方位属性对象
*/
goog.provide('Zondy.Object.DynNoteLableType');

/// <summary>动态注记方位属性对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.DynNoteLableType = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    /// <summary>点方位属性,Zondy.Object.LablePntInfo</summary>
    this.PntInfo = (options.PntInfo !== undefined && options.PntInfo != null) ? options.PntInfo : null;

    /// <summary>线方位属性,Zondy.Object.LabelLinInfo</summary>
    this.LinInfo = (options.LinInfo !== undefined && options.LinInfo != null) ? options.LinInfo : null;

    /// <summary>区方位属性,Zondy.Object.LabelRegInfo</summary>
    this.RegInfo = (options.RegInfo !== undefined && options.RegInfo != null) ? options.RegInfo : null;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.CDynNoteInfo-----------------------------------------------------------------------------------------------------
* 动态注记参数信息对象
*/
goog.provide('Zondy.Object.CDynNoteInfo');

/// <summary>动态注记参数信息对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.CDynNoteInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>动态注记字符串角度</summary>
    this.Angle = (options.Angle !== undefined) ? options.Angle : 0.00;

    /// <summary>背景颜色</summary>取值请参照MapGIS颜色库中颜色编号
    this.Backclr = (options.Backclr !== undefined) ? options.Backclr : 0;

    /// <summary>轮廓宽度</summary>
    this.Backexp = (options.Backexp !== undefined) ? options.Backexp : 0.00;

    /// <summary>加粗</summary>
    this.Bold = (options.Bold !== undefined) ? options.Bold : 0;

    /// <summary>注记字段名称</summary>
    this.FieldName = (options.FieldName !== undefined) ? options.FieldName : null;

    /// <summary>字体角度</summary>
    this.FontAngle = (options.FontAngle !== undefined) ? options.FontAngle : 0.00;

    /// <summary>注记颜色</summary>
    this.FontColor = (options.FontColor !== undefined) ? options.FontColor : 0;

    /// <summary>注记大小</summary>
    this.FontSize = (options.FontSize !== undefined) ? options.FontSize : 0;

    /// <summary>注记字体</summary>
    this.FontStyle = (options.FontStyle !== undefined) ? options.FontStyle : 0;

    /// <summary>中文字体</summary>
    this.Ifnt = (options.Ifnt !== undefined) ? options.Ifnt : 0;

    /// <summary>字形</summary>
    this.Ifnx = (options.Ifnx !== undefined) ? options.Ifnx : Zondy.Enum.FontShape.Positive;

    /// <summary>是否填充背景</summary>
    this.IsFilled = (options.IsFilled !== undefined) ? options.IsFilled : false;

    /// <summary>是否水平显示</summary>
    this.IsHzpl = (options.IsHzpl !== undefined) ? options.IsHzpl : false;

    /// <summary>覆盖方式（表明透明还是覆盖）</summary>
    this.IsOvprnt = (options.IsOvprnt !== undefined) ? options.IsOvprnt : false;

    /// <summary>Description</summary>
    this.LabelLevel = (options.LabelLevel !== undefined) ? options.LabelLevel : 0;

    /// <summary>动态注记方位属性,Zondy.Object.DynNoteLableType</summary>
    this.LableType = (options.LableType !== undefined) ? options.LableType : null;

    /// <summary> x方向的偏移</summary>
    this.Offsetx = (options.Offsetx !== undefined) ? options.Offsetx : 0.00;

    /// <summary>y方向的偏移</summary>
    this.Offsety = (options.Offsety !== undefined) ? options.Offsety : 0.00;

    /// <summary>字间距</summary>
    this.Space = (options.Space !== undefined) ? options.Space : 0.00;

    /// <summary>删除线</summary>
    this.StrikeThrough = (options.StrikeThrough !== undefined) ? options.StrikeThrough : 0;

    /// <summary>下划线</summary>
    this.UnderLine = (options.UnderLine !== undefined) ? options.UnderLine : 0;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.CDisplayStyle--------------------------------------------------------------------------------------------------
* 地图文档显示样式对象
*/
goog.provide('Zondy.Object.CDisplayStyle');

/// <summary>地图文档显示样式对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.CDisplayStyle = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>地图显示参数</summary>
    /// <summary>注记符号大小固定</summary>
    this.AnnSizeFixed = (options.AnnSizeFixed !== undefined) ? options.AnnSizeFixed : false;

    /// <summary>图像质量</summary>可选值为：1（低）、2（中）、3（高）
    this.DriverQuality = (options.DriverQuality !== undefined) ? options.DriverQuality : 0;

    /// <summary>是否动态投影</summary>
    this.DynProjFlag = (options.DynProjFlag !== undefined) ? options.DynProjFlag : false;

    /// <summary>符号是否跟随显示放大（该属性已过时，请使用各个要素类的大小固定及线宽固定）</summary>
    this.FollowScale = (options.FollowScale !== undefined) ? options.FollowScale : false;

    /// <summary>线状符号线宽固定</summary>
    this.LinPenWidFixed = (options.LinPenWidFixed !== undefined) ? options.LinPenWidFixed : false;

    /// <summary>线状符号大小固定</summary>
    this.LinSizeFixed = (options.LinSizeFixed !== undefined) ? options.LinSizeFixed : false;

    /// <summary>点状符号线宽固定</summary>
    this.PntPenWidFixed = (options.PntPenWidFixed !== undefined) ? options.PntPenWidFixed : false;

    /// <summary>点状符号大小固定</summary>
    this.PntSizeFixed = (options.PntSizeFixed !== undefined) ? options.PntSizeFixed : false;

    /// <summary>填充符号线宽固定</summary>
    this.RegPenWidFixed = (options.RegPenWidFixed !== undefined) ? options.RegPenWidFixed : false;

    /// <summary> 填充符号大小固定</summary>
    this.RegSizeFixed = (options.RegSizeFixed !== undefined) ? options.RegSizeFixed : false;

    /// <summary>显示坐标点</summary>
    this.ShowCoordPnt = (options.ShowCoordPnt !== undefined) ? options.ShowCoordPnt : false;

    /// <summary>显示元素的外包矩形</summary>
    this.ShowElemRect = (options.ShowElemRect !== undefined) ? options.ShowElemRect : false;

    /// <summary>图层显示参数Array,Zondy.Object.DynShowStyle in Array</summary>
    this.ShowStyle = (options.ShowStyle !== undefined) ? options.ShowStyle : null;

    /// <summary>是否进行还原显示</summary>
    this.SymbleShow = (options.SymbleShow !== undefined) ? options.SymbleShow : false;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.CDisplayStyleExtend----------------------------------------------------------------------------------------------
* 矢量图层显示样式对象
*/
goog.provide('Zondy.Object.CDisplayStyleExtend');

/// <summary>矢量图层显示样式对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.CDisplayStyleExtend = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>图层索引</summary>
    this.Index = (options.Index !== undefined) ? options.Index : 0;

    /// <summary>是否进行还原显示</summary>
    this.SymbleShow = (options.SymbleShow !== undefined) ? options.SymbleShow : false;

    /// <summary>线状符号线宽固定</summary>
    this.LinPenWidFixed = (options.LinPenWidFixed !== undefined) ? options.LinPenWidFixed : false;

    /// <summary>线状符号大小固定</summary>
    this.LinSizeFixed = (options.LinSizeFixed !== undefined) ? options.LinSizeFixed : false;

    /// <summary>点状符号线宽固定</summary>
    this.PntPenWidFixed = (options.PntPenWidFixed !== undefined) ? options.PntPenWidFixed : false;

    /// <summary>点状符号大小固定</summary>
    this.PntSizeFixed = (options.PntSizeFixed !== undefined) ? options.PntSizeFixed : false;

    /// <summary>填充符号线宽固定</summary>
    this.RegPenWidFixed = (options.RegPenWidFixed !== undefined) ? options.RegPenWidFixed : false;

    /// <summary> 填充符号大小固定</summary>
    this.RegSizeFixed = (options.RegSizeFixed !== undefined) ? options.RegSizeFixed : false;

    /// <summary>注记符号大小固定</summary>
    this.AnnSizeFixed = (options.AnnSizeFixed !== undefined) ? options.AnnSizeFixed : false;

    /// <summary>//符号是否跟随显示放大，该属性已过时，请使用各个要素类的大小固定及线宽固定</summary>
    this.FollowScale = (options.FollowScale !== undefined) ? options.FollowScale : false;

    /// <summary>显示坐标点</summary>
    this.ShowCoordPnt = (options.ShowCoordPnt !== undefined) ? options.ShowCoordPnt : false;

    /// <summary>显示元素的外包矩形</summary>
    this.ShowElemRect = (options.ShowElemRect !== undefined) ? options.ShowElemRect : false;

    /// <summary>图像质量</summary>可选值为：1（低）、2（中）、3（高）
    this.DriverQuality = (options.DriverQuality !== undefined) ? options.DriverQuality : 0;

    /// <summary>是否动态投影</summary>
    this.DynProjFlag = (options.DynProjFlag !== undefined) ? options.DynProjFlag : false;


};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.DynShowStyle-----------------------------------------------------------------------------------------------------
* 图层动态显示样式对象
*/
goog.provide('Zondy.Object.DynShowStyle');

/// <summary>地图文档动态显示样式对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.DynShowStyle = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    /// <summary>透明度</summary>
    this.Alpha = (options.Alpha !== undefined) ? options.Alpha : 0;

    /// <summary>是否使用错误处理符号</summary>
    this.BugSpare = (options.BugSpare !== undefined) ? options.BugSpare : false;

    /// <summary>是否自绘驱动</summary>
    this.CustomRender = (options.CustomRender !== undefined) ? options.CustomRender : false;

    /// <summary>自绘驱动路径设置,String</summary>
    this.CustomRenderPath = (options.CustomRenderPath !== undefined) ? options.CustomRenderPath : null;

    /// <summary>显示的线方向线符号(只适用于其颜色)</summary>
    this.DirectionLineClr = (options.DirectionLineClr !== undefined) ? options.DirectionLineClr : 0;

    /// <summary>是否动态注记</summary>
    this.DynNoteFlag = (options.DynNoteFlag !== undefined) ? options.DynNoteFlag : false;

    /// <summary>动态注记参数,Zondy.Object.CDynNoteInfo</summary>
    this.DynNoteInfo = (options.DynNoteInfo !== undefined) ? options.DynNoteInfo : null;

    /// <summary>是否显示填充区域的弧段,Zondy.Enum.ISShowArc;枚举类型</summary>
    /// 取值范围： 1（Zondy.Enum.ISShowArc.Reg）,2（Zondy.Enum.ISShowArc.Arc）,3（Zondy.Enum.ISShowArc.All）
    this.IsShowArc = (options.IsShowArc !== undefined) ? options.IsShowArc : 0;

    /// <summary>是否显示线方向</summary>
    this.ISShowLineDirection = (options.ISShowLineDirection !== undefined) ? options.ISShowLineDirection : false;

    /// <summary>显示的弧段样式(只适用于其颜色),Zondy.Object.CLineInfo</summary>
    this.LineInfo = (options.LineInfo !== undefined) ? options.LineInfo : null;

    /// <summary>最大显示比率</summary>
    this.MaxScale = (options.MaxScale !== undefined) ? options.MaxScale : 0.00;

    /// <summary>最小显示比率</summary>
    this.MinScale = (options.MinScale !== undefined) ? options.MinScale : 0.00;

    /// <summary>显示坐标点</summary>
    this.ShowCoordPnt = (options.ShowCoordPnt !== undefined) ? options.ShowCoordPnt : false;

    /// <summary>错误处理线符号,Zondy.Object.CLineInfo</summary>
    this.SpareLineInfo = (options.SpareLineInfo !== undefined) ? options.SpareLineInfo : null;

    /// <summary>错误处理点符号,Zondy.Object.CPointInfo</summary>
    this.SparePointInfo = (options.SparePointInfo !== undefined) ? options.SparePointInfo : null;

    /// <summary>错误处理区符号,Zondy.Object.CRegionInfo</summary>
    this.SpareRegInfo = (options.SpareRegInfo !== undefined) ? options.SpareRegInfo : null;

    /// <summary>符号显示比例</summary>
    this.SymbleScale = (options.SymbleScale !== undefined) ? options.SymbleScale : 0.00;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.LabelLinInfo------------------------------------------------------------------------------------------------
* 线要素动态注记方位属性对象
*/
goog.provide('Zondy.Object.LabelLinInfo');

/// <summary>线要素动态注记方位属性对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.LabelLinInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary> 不完全注记</summary>
    this.ClientOutLabel = (options.ClientOutLabel !== undefined && options.ClientOutLabel != null) ? options.ClientOutLabel : false;

    /// <summary>偏离线约束 偏移线的距离</summary>
    this.DistFromLine = (options.DistFromLine !== undefined && options.DistFromLine != null) ? options.DistFromLine : 0.00;

    /// <summary>Zondy.Enum.LineConstrain,枚举类型,偏离线约束</summary>
    this.FromLineConstrain = (options.FromLineConstrain !== undefined && options.FromLineConstrain != null) ? options.FromLineConstrain : 0;

    /// <summary>线重复注记 每段的长度</summary>
    this.Interval = (options.Interval !== undefined && options.Interval != null) ? options.Interval : 0.00;

    /// <summary>Zondy.Enum.LabelLinType,枚举类型, 线方位</summary>
    this.LinType = (options.LinType !== undefined && options.LinType != null) ? options.LinType : 0;

    /// <summary>Zondy.Enum.RepeatType,枚举类型,线重复注记策略</summary>
    this.Repeat = (options.Repeat !== undefined && options.Repeat != null) ? options.Repeat : 0;

    /// <summary>Zondy.Enum.LabelSpreadType,枚举类型,注记分布的策略</summary>
    this.SpreadType = (options.SpreadType !== undefined && options.SpreadType != null) ? options.SpreadType : null;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.LablePntInfo----------------------------------------------------------------------------------------------------
* 点要素动态注记方位属性对象
*/
goog.provide('Zondy.Object.LablePntInfo');

/// <summary>点要素动态注记方位属性对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.LablePntInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>点任意方位的角度值，Array,Double in an Array</summary>
    this.Ang = (options.Ang !== undefined && options.Ang != null) ? options.Ang : null;

    /// <summary>不完全注记</summary>
    this.ClientOutLabel = (options.ClientOutLabel !== undefined && options.ClientOutLabel != null) ? options.ClientOutLabel : false;

    /// <summary>偏移距离，单位为像素</summary>
    this.Distance = (options.Distance !== undefined && options.Distance != null) ? options.Distance : 0.00;

    /// <summary>点八方位注记类型，Array,Zondy.Enum.EightDirType in an Array</summary>
    this.EightDirLableType = (options.EightDirLableType !== undefined && options.EightDirLableType != null) ? options.EightDirLableType : null;

    /// <summary>Zondy.Enum.LabelPntType 枚举类型, 点方位</summary>
    this.PntType = (options.PntType !== undefined && options.PntType != null) ? options.PntType : 0;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.LabelRegInfo----------------------------------------------------------------------------------------------------
* 区要素动态注记方位属性对象
*/
goog.provide('Zondy.Object.LabelRegInfo');

/// <summary>区要素动态注记方位属性对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.LabelRegInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    /// <summary>不完全注记</summary>
    this.ClientOutLabel = (options.ClientOutLabel !== undefined && options.ClientOutLabel != null) ? options.ClientOutLabel : false;

    /// <summary>是否尝试水平注记微小区 short</summary>
    this.LabelMiniRegion = (options.LabelMiniRegion !== undefined && options.LabelMiniRegion != null) ? options.LabelMiniRegion : 0;

    /// <summary>自适应策略 区内不能注记时，是否可以注记在外部 short</summary>
    this.MayPlaceOutside = (options.MayPlaceOutside !== undefined && options.MayPlaceOutside != null) ? options.MayPlaceOutside : 0;

    /// <summary>微小区最大面积 short</summary>
    this.MiniRegionArea = (options.MiniRegionArea !== undefined && options.MiniRegionArea != null) ? options.MiniRegionArea : 0;

    /// <summary>区域外注记时，注记偏移的距离</summary>
    this.Offset = (options.Offset !== undefined && options.Offset != null) ? options.Offset : 0.00;

    /// <summary>区方位，Zondy.Enum.LabelRegType,枚举类型</summary>
    this.RegType = (options.RegType !== undefined && options.RegType != null) ? options.RegType : 0;


};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.Feature--------------------------------------------------------------------------------------------------------
* 要素信息对象
*/
goog.provide('Zondy.Object.Feature');

/// <summary>要素对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Feature = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary> 属性值 Array,String in an Array</summary>
    this.AttValue = (options.AttValue !== undefined && options.AttValue != null) ? options.AttValue : null;

    /// <summary> 要素id号 Interger</summary>
    this.FID = (options.FID !== undefined && options.FID != null) ? options.FID : 0;

    /// <summary>要素的外包矩形 Zondy.Object.Rectangle</summary>
    this.bound = (options.bound !== undefined && options.bound != null) ? options.bound : null;

    /// <summary>要素的几何图形描述 Zondy.Object.FeatureGeometry</summary>
    this.fGeom = (options.fGeom !== undefined && options.fGeom != null) ? options.fGeom : null;

    /// <summary> 要素几何类型 Zondy.Enum.FeatureType类型，只对简单要素类有效</summary>
    this.ftype = (options.ftype !== undefined && options.ftype != null) ? options.ftype : 0;

    /// <summary>几何图形参数 Zondy.Object.WebGraphicsInfo</summary>
    this.GraphicInfo = (options.GraphicInfo !== undefined && options.GraphicInfo != null) ? options.GraphicInfo : null;


};

/// <summary>获取当前要素的属性值</summary>
/// <param name="attKey" type="Interger">属性字段关键字或者属性序号</param>
/// <returns type="String" />
Zondy.Object.Feature.prototype.getAttValue = function (attKey) {
    if (this.AttValue === null) {
        return null;
    }
    var attLength = this.AttValue.length;

    if (typeof (attKey) == 'number') {
        if (attKey >= attLength) {
            return null;
        }
        return this.AttValue[attKey];
    }
};

/// <summary>获取当前要素的几何图形参数</summary>
/// <returns type="Zondy.Object.WebGraphicsInfo" />
Zondy.Object.Feature.prototype.getGraphicInfo = function () {
    if (this.GraphicInfo === null) {
        return null;
    }
    else {
        return new Zondy.Object.WebGraphicsInfo(this.GraphicInfo);
    }
};

/// <summary>获取当前要素的所有字段属性值</summary>
/// <returns type="Array contains String" />
Zondy.Object.Feature.prototype.getAttValueArray = function () {
    return this.AttValue;
};

/// <summary>获取当前要素的外包矩形</summary>
/// <returns type="Zondy.Object.Rectangle" />
Zondy.Object.Feature.prototype.getRectBound = function () {
    var bound = this.bound;
    if (bound != null) {
        return new Zondy.Object.Rectangle(bound);
    }
    else {
        return bound;
    }
};

/// <summary>获取当前要素的几何描述</summary>
/// <returns type="String" />
Zondy.Object.Feature.prototype.getGeometry = function () {
    return this.fGeom;
};

/// <summary>获取当前要素的FID</summary>
/// <returns type="Interger" />
Zondy.Object.Feature.prototype.getFID = function () {
    return this.FID;
};

/// <summary>设置当前要素的所有属性值</summary>
/// <param name="values" type="Array / Object">属性值数组 /或者属性键值对</param>
Zondy.Object.Feature.prototype.setAttValues = function (values) {
    this.AttValue = values;
};

/// <summary>设置当前要素的外包矩形</summary>
/// <param name="bound" type="String:'xmin,ymin,xmax,ymax' | Zondy.Object.Rectangle
/// <returns {ol.extent}">外包矩形描述，可以是字符串，zondy矩形或者openlayers矩形</param>
Zondy.Object.Feature.prototype.setBound = function (bound) {
    var rect = null;
    if (typeof (bound) == "string") {
        rect = new Zondy.Object.Rectangle(bound);
    }
    if (bound instanceof String) {
        rect = new Zondy.Object.Rectangle(bound);
    }
    if (bound instanceof Zondy.Object.Rectangle) {
        rect = bound;
    }
    if (bound instanceof ol.extent) {
        rect = new Zondy.Object.Rectangle();
        rect.setByOL(bound);
    }
    this.bound = rect;
};

/// <summary>设置当前要素的FID</summary>
/// <param name="fid" type="Interger">要素id号</param>
Zondy.Object.Feature.prototype.setFID = function (fid) {
    this.FID = fid;
};

/// <summary>设置几何图形的类型</summary>
/// <param name="type" type="Zondy.Enum.FeatureType">几何类型</param>
Zondy.Object.Feature.prototype.setFType = function (type) {
    this.ftype = type;
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.FeatureSet-------------------------------------------------------------------------------------------------------
* 要素集合信息对象
*/
goog.provide('Zondy.Object.FeatureSet');

/// <summary> 要素集合信息对象构造函数 </summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.FeatureSet = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    /// <summary>一次查询的总要素个数，仅在做要素查询时有意义 Int
    ///  ReadOnly
    /// </summary>
    this.TotalCount = 0;
    ol.obj.assign(this, options);

    /// <summary>属性结构 Zondy.Object.CAttStruct in an Array</summary>
    this.AttStruct = (options.AttStruct !== undefined && options.AttStruct != null) ? options.AttStruct : null;

    /// <summary>要素数组 Zondy.Object.Feature in an Array</summary>
    this.SFEleArray = (options.SFEleArray !== undefined && options.SFEleArray != null) ? options.SFEleArray : new Array();
};

/// <summary>
/// 清空要素集合
/// </summary>
Zondy.Object.FeatureSet.prototype.clear = function () {
    this.AttStruct = null;
    this.SFEleArray = new Array();
};

/// <summary>添加一组或者一个要素</summary>
/// <param name="features" type="{Array} | {Zondy.Object.Feature} | {Object}（代表Feature的属性键值对）">
/// 一组要素，或者一个要素
/// </param>
Zondy.Object.FeatureSet.prototype.addFeature = function (features) {
    if (features instanceof Array) {
        this.SFEleArray.concat(features);
    }
    else {
        this.SFEleArray.push(features);
    }
};

/// <summary>获取要素集要素的记录条数</summary>
/// <returns type="Integer" />
Zondy.Object.FeatureSet.prototype.getFeaturesLength = function () {
    if (this.SFEleArray instanceof Array) {
        return this.SFEleArray.length;
    }
    else {
        return 0;
    }
};

/// <summary>获取指定要素对象</summary>
/// <returns type="{Zondy.Object.Feature}" />
Zondy.Object.FeatureSet.prototype.getFeatureByIndex = function (i) {
    if (i >= this.getFeaturesLength()) {
        return null;
    }
    else {
        var feature = this.SFEleArray[i];
        if (feature instanceof Zondy.Object.Feature) {
            return feature;
        }
        else {
            return new Zondy.Object.Feature(this.SFEleArray[i]);
        }
    }
};

/// <summary>获取某属性字段的类型</summary>
/// <param name="attkey" type="String">属性字段关键字，可以是{String}字段名，可以是序号{Interger}</param>
/// <returns type="String" />
Zondy.Object.FeatureSet.prototype.getAttType = function (attKey) {
    var index;
    if (this.AttStruct == null) {
        return null;
    }
    if (typeof (attKey) == 'number') {
        index = attKey;
    }
    else {
        index = this.getAttIndexByAttName(attKey);
    }
    if (index == null) {
        return null;
    }
    else {
        return this.AttStruct.FldType[index];
    }
};

/// <summary>通过属性的名称获取属性的序号</summary>
/// <param name="name" type="String">属性名</param>
/// <returns type="Interger" />
Zondy.Object.FeatureSet.prototype.getAttIndexByAttName = function (name) {
    if (this.AttStruct == null) {
        return null;
    }
    if (this.AttStruct.FldName == null) {
        return null;
    }
    var length = this.AttStruct.FldName.length;
    for (var i = 0; i < length; i++) {
        if (this.AttStruct.FldName[i] == name) {
            return i;
        }
    }
    return null;
};

/// <summary>通过属性的序号获取属性名称</summary>
/// <param name="index" type="Interger">属性序号</param>
/// <returns type="String" />
Zondy.Object.FeatureSet.prototype.getAttNameByIndex = function (index) {
    if (this.AttStruct == null) {
        return null;
    }
    if (this.AttStruct.FldName == null) {
        return null;
    }
    if (this.AttStruct.FldName.length <= index) {
        return null;
    }
    return this.AttStruct.FldName[index];
};
/*----------------------------------------------------------------------------------------------------------------------------*/
/*Zondy.Object.WebGraphicsInfo-------------------------------------------------------------------------------------------------
* 要素符号参数信息对象
*/
goog.provide('Zondy.Object.WebGraphicsInfo');

/// <summary>要素符号参数信息对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.WebGraphicsInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
    /// <summary>要素几何类型：Zondy.Enum.FeatureType枚举类型，只对简单要素类有效/// </summary>
    this.InfoType = (options.InfoType !== undefined && options.InfoType != null) ? options.InfoType : 0;

    /// <summary>点信息对象,Zondy.Object.CPointInfo</summary>
    this.PntInfo = (options.PntInfo !== undefined && options.PntInfo != null) ? options.PntInfo : null;

    /// <summary>线信息对象,Zondy.Object.CLineInfo</summary>
    this.LinInfo = (options.LinInfo !== undefined && options.LinInfo != null) ? options.LinInfo : null;

    /// <summary>区信息对象,Zondy.Object.CRegionInfo</summary>
    this.RegInfo = (options.RegInfo !== undefined && options.RegInfo != null) ? options.RegInfo : null;


};
/*----------------------------------------------Zondy.Object.ContourAnalyse.MeshingParam(start)-------------------------------------------------------*/
goog.provide('Zondy.Object.ContourAnalyse.MeshingParam');
/**
*  离散数据网格化参数类
*  *param {string} SfClsURL 点简单要素类URL
*  param {string} FieldName Z值所在的字段名称
*  param {int} XCellNum 生成的影像X方向网格数。只输出X方向网格数，计算时Y方向网格密度会自动与X方向保持一致,默认值为200
*  param {Rect} Bound 生成的栅格数据集逻辑范围，如果为NULL则使用点简单要素类的逻辑范围
*/
Zondy.Object.ContourAnalyse.MeshingParam = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    this.SfClsURL = options.SfClsURL !== undefined ? options.SfClsURL : null;
    this.FieldName = options.FieldName !== undefined ? options.FieldName : null;
    this.XCellNum = options.XCellNum !== undefined ? options.XCellNum : 200;
    this.Bound = options.Bound !== undefined ? options.Bound : null;
};


goog.provide('Zondy.Object.ContourAnalyse.ContourNoteParam');
/**
*	平面等值线追踪所用到的注记参数类
*param {bool} IsClipLine 注记是否剪断线(true/false 剪断/不剪断),默认值为true
*param {bool} isXYScaleOut 是否输出轴向标尺,默认值为false
*param {int} NoteDirection 注记方向(1/2/3:斜坡上方/斜坡下方/图幅上方),默认值为1
*param {double} LineWidth 注记等值线线宽,默认值为0.05
*param {float} MaxAngle 注记的最大倾角,默认值为90.0
*param {float} MinDist 注记间最小允许距离,默认值为10.0
*param {bool} IsAbs 数值是否取绝对值,默认值为false
*param {bool} IsComma 数值是否采用千位分隔符,默认值为false
*param {short} DigitNum 注记数值的小数位数,默认值为0
*param {int} FormatNo 数据格式 （0/1/2: 定点/科学/通常）,默认值为0
*param {int} LogFlag 取对数标志（0/1/2: 未取对数/10为底/自然对数）,默认值为0
*param {string} Prefix 注记前缀,默认值为""
*param {string} Suffix 注记后缀,默认值为""
*param {int} ColorNo 注记颜色号,默认值为0
*param {float} FixSize 注记尺寸,默认值为0.01
*param {short} FontNo 注记字体号,默认值为0
*/
Zondy.Object.ContourAnalyse.ContourNoteParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.IsClipLine = options.IsClipLine != undefined ? options.IsClipLine : true;
    this.isXYScaleOut = options.isXYScaleOut != undefined ? options.isXYScaleOut : false;
    this.NoteDirection = options.NoteDirection != undefined ? options.NoteDirection : 1;
    this.LineWidth = options.LineWidth != undefined ? options.LineWidth : 0.05;
    this.MaxAngle = options.MaxAngle != undefined ? options.MaxAngle : 90.0;
    this.MinDist = options.MinDist != undefined ? options.MinDist : 10.0;
    this.IsAbs = options.IsAbs != undefined ? options.IsAbs : false;
    this.IsComma = options.IsComma != undefined ? options.IsComma : false;
    this.DigitNum = options.DigitNum != undefined ? options.DigitNum : 0;
    this.FormatNo = options.FormatNo != undefined ? options.FormatNo : 0;
    this.LogFlag = options.LogFlag != undefined ? options.LogFlag : 0;
    this.Prefix = options.Prefix != undefined ? options.Prefix : "";
    this.Suffix = options.Suffix != undefined ? options.Suffix : "";
    this.ColorNo = options.ColorNo != undefined ? options.ColorNo : 0;
    this.FixSize = options.FixSize != undefined ? options.FixSize : 0.01;
    this.FontNo = options.FontNo != undefined ? options.FontNo : 0;
};


goog.provide('Zondy.Object.ContourAnalyse.ContourZValue');
/*
*	等值线层参数类，用来描述每一层的信息
*param {double} ZValue 等值线层值，不能为NULL,默认值为1.0
*param {Zondy.Object.ContourAnalyse.CLineInfo} LineInfo 等值线参数，为空则取默认值
*param {Zondy.Object.ContourAnalyse.CRegionInfo} RegInfo 生成区参数，为空则取默认值
*param {bool} IsOutputNote 该层是否绘制注记,默认值为false
*@author fmm 2015-07-01
*/
Zondy.Object.ContourAnalyse.ContourZValue = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.ZValue = options.ZValue != undefined ? options.ZValue : 1;
    this.LineInfo = options.LineInfo != undefined ? options.LineInfo : null;
    this.RegInfo = options.RegInfo != undefined ? options.RegInfo : null;
    this.IsOutputNote = options.IsOutputNote != undefined ? options.IsOutputNote : false;
};

goog.provide('Zondy.Object.ContourAnalyse.CLineInfo');
/*
*	描述线参数
*param {double} LinWidth 线宽度,默认值为1
*param {int} Color 线颜色,默认值为1
*param {int} LinStyleID 线型号,默认值为1
*param {int} LinStyleID2 辅助线型号,默认值为0
*param {double} Xscale X比例系数,默认值为1.0
*param {double} Yscale Y比例系数,默认值为1.0
*@author fmm 2015-07-01
*/

Zondy.Object.ContourAnalyse.CLineInfo = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.LinWidth = options.LinWidth != undefined ? options.LinWidth : 1;
    this.Color = options.Color != undefined ? options.Color : 1;
    this.LinStyleID = options.LinStyleID != undefined ? options.LinStyleID : 1;
    this.LinStyleID2 = options.LinStyleID2 != undefined ? options.LinStyleID2 : 0;
    this.Xscale = options.Xscale != undefined ? options.Xscale : 1.0;
    this.Yscale = options.Yscale != undefined ? options.Yscale : 1.0;
};


goog.provide('Zondy.Object.ContourAnalyse.CRegionInfo');
/*
*	描述区参数
*param {int} PatID 填充图案编号,仅当填充模式为0(常规填充)才有意义。取0则无图案填充,默认值为0
*param {int} FillMode 填充模式,0:常规填充、1:线性渐变填充、2:矩形渐变填充、3:圆形渐变填充,默认值为0
*param {int} FillColor 填充色或起始色,当填充模式为0(常规填充)时,表示区填充色;当填充模式为1(线性渐变填充)或2(矩形渐变填充)或3(圆形渐变填充)时,表示起始色,默认值为1
*param {int} EndColor 终止色,仅当填充模式为1(线性渐变填充)或2(矩形渐变填充)或3(圆形渐变填充)时才有意义,默认值为1
*param {double} PatHeight 图案高,仅当填充模式为0(常规填充)才有意义,默认值为1.0
*param {double} PatWidth 图案宽,仅当填充模式为0(常规填充)才有意义,默认值为1.0
*param {double} PatAngle 图案角度或渐变角度,当填充模式为0(常规填充)时,表示图案角度;当填充模式为1(线性渐变填充)或2(矩形渐变填充)时,表示渐变角度;当填充模式为3(圆形渐变填充)时,此属性无意义,默认值为1.0
*param {int} PatColor 图案颜色,仅当填充模式为0(常规填充)才有意义,默认值为1
*param {double} OutPenWidth 图案笔宽,仅当填充模式为0(常规填充)才有意义,默认值为1.0
*param {short} OverMethod 覆盖方式(无意义),默认值为0
*@author fmm 2015-07-01
*/

Zondy.Object.ContourAnalyse.CRegionInfo = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.PatID = options.PatID != undefined ? options.PatID : 0;
    this.FillMode = options.FillMode != undefined ? options.FillMode : 0;
    this.FillColor = options.FillColor != undefined ? options.FillColor : 1;
    this.PatHeight = options.PatHeight != undefined ? options.PatHeight : 1.0;
    this.PatWidth = options.PatWidth != undefined ? options.PatWidth : 1.0;
    this.PatAngle = options.PatAngle != undefined ? options.PatAngle : 1.0;
    this.PatColor = options.PatColor != undefined ? options.PatColor : 1.0;
    this.OutPenWidth = options.OutPenWidth != undefined ? options.OutPenWidth : 1.0;
    this.OverMethod = options.OverMethod != undefined ? options.OverMethod : 0;
};

goog.provide('Zondy.Object.ContourAnalyse.SlopLineParam');
/*
*	示坡线参数类
*param {float} XScale X系数,默认值为2.0
*param {float} YScale Y系数,默认值为10.0
*param {short} LineType 线型,默认值为0
*param {short} SubLineType 辅助线型,默认值为0
*/
Zondy.Object.ContourAnalyse.SlopLineParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.XScale = options.XScale != undefined ? options.XScale : 2.0;
    this.YScale = options.YScale != undefined ? options.YScale : 10.0;
    this.LineType = options.LineType != undefined ? options.LineType : 0;
    this.SubLineType = options.SubLineType != undefined ? options.SubLineType : 0;
};

goog.provide('Zondy.Object.ContourAnalyse.ContourParam');
/*
*	平面等值线追踪参数类
*param {bool} IsSmoothLine 是否进行光滑线处理；如果为true则配合SmoothGrade使用,默认值为false
*param {int} SmoothGrade 线光滑程度， 0/1/2分别代表“低/中/高”，仅在IsSmoothLine为true时生效,默认值为1
*param {bool} IsMakeReg 是否生成区,默认值为false
*param {bool} IsMakeNote 是否生成注记,默认值为false
*param {bool} IsMakeSLin 是否输出示坡线,默认值为false
*param {int} MapWay 生成的地图范围的设置方法。0/1/2/3分表表示“自动检测设置/原始数据范围/数据投影变换/用户自定义”,默认值为1
*param {double} FrameWidth 制图宽度，仅在MapWay=3的情况下有效,默认值为1.0
*param {double} FrameHeight 制图高度，仅在MapWay=3的情况下有效,默认值为1.0
*param {bool} IsDrawColorScl 是否绘制色阶。如果绘制，则必须同时指定生成线、区、注记层，任何一个图层都不能忽略生成，才可见色阶输出效果,默认值为false
*param {bool} IsSaveEdge 线图层是否保存边界,默认值为false
*param {Zondy.Object.ContourAnalyse.ContourNoteParam} NoteParam 注记生成参数，如果NULL则取默认值。只有在IsMakeNote为true时该参数才能发挥作用
*param {Zondy.Object.ContourAnalyse.SlopLineParam} SlopLineParam 示坡线参数，如果为NULL则取默认值。只有在IsMakeSLin为true时该参数参能发挥作用
*param {Zondy.Object.ContourAnalyse.ContourZValue[]} ZValues 等值线层参数，不能为NULL
*       如果ZValues的最大层值小于影像最大像元值，则生成的区值区间是ZValues的次大值到像元最大值；如果要绘制ZVlaues最大值到像元最大值区间，需要为ZValues增加一个大于最大像元值的成员
*@author fmm 2015-07-01
*/
Zondy.Object.ContourAnalyse.ContourParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.IsSmoothLine = options.IsSmoothLine != undefined ? options.IsSmoothLine : false;
    this.SmoothGrade = options.SmoothGrade != undefined ? options.SmoothGrade : 1;
    this.IsMakeReg = options.IsMakeReg != undefined ? options.IsMakeReg : false;
    this.IsMakeNote = options.IsMakeNote != undefined ? options.IsMakeNote : false;
    this.IsMakeSLin = options.IsMakeSLin != undefined ? options.IsMakeSLin : false;
    this.MapWay = options.MapWay != undefined ? options.MapWay : 1;
    this.FrameWidth = options.FrameWidth != undefined ? options.FrameWidth : 1.0;
    this.FrameHeight = options.FrameHeight != undefined ? options.FrameHeight : 1.0;
    this.IsDrawColorScl = options.IsDrawColorScl != undefined ? options.IsDrawColorScl : false;
    this.IsSaveEdge = options.IsSaveEdge != undefined ? options.IsSaveEdge : false;
    this.NoteParam = options.NoteParam != undefined ? options.NoteParam : null;
    this.SlopLineParam = options.SlopLineParam != undefined ? options.SlopLineParam : null;
    this.ZValues = options.ZValues != undefined ? options.ZValues : null;
};
/*----------------------------------------------Zondy.Object.ContourAnalyse.MeshingParam(end)-------------------------------------------------------*/
/*Zondy.Object.VectCls-------------------------------------------------------------------------------------------------------
* 矢量类对象
*/
goog.provide('Zondy.Object.VectCls');

/// <summary>矢量类对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.VectCls = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);

    /// <summary>图层类型 {Zondy.Enum.VectClsType}</summary>
    this.clsType = (options.clsType !== undefined) ? options.clsType : Zondy.Enum.VectClsType.SFCls;

    /// <summary>图层名称 {String}</summary>
    this.clsName = (options.clsName !== undefined) ? options.clsName : null;

    /// <summary> 要素几何类型 Zondy.Enum.FeatureType类型，只对简单要素类有效</summary>
    this.geoType = (options.geoType !== undefined) ? options.geoType : 1;

    /// <summary>空间参照系名称 String</summary>
    this.srefName = (options.srefName !== undefined) ? encodeURI(options.srefName) : "";

    /// <summary>要素数据集名称 String</summary>
    this.dsName = (options.dsName !== undefined) ? encodeURI(options.dsName) : "";

    /// <summary>图层属性结构对象  Zondy.Object.CAttStruct</summary>
    this.attStruct = (options.attStruct !== undefined) ? options.attStruct : null;

};

/**********************************************************Zondy.Object(end)************************************************/
goog.provide('Zondy.Control.OverviewMap');
goog.require('ol.control.OverviewMap');

/**
* @classdesc
* @Zondy.Control.OverviewMap继承自ol.control.OverviewMap，
* @添加了鹰眼视图对主视图的控制
*/
Zondy.Control.OverviewMap = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    ol.control.OverviewMap.call(this, options);

    this.cursor_ = 'move';
    /**
    * @type {string|undefined}
    * @private
    */
    this.previousCursor_ = undefined;

    /**
    * @type {boolean|undefined}
    * @private
    * @鹰眼视图的Box中鼠标是否按下
    */
    this.mouseDown = false;

    /**
    * @type {Array<Number>}
    * @private
    * @鹰眼视图的Box的Bottom_Left的Pixel值
    */
    this.positionBox = null;

    /**
    * @type {Array<Number>}
    * @private
    * @鹰眼视图中鼠标位置的Pixel值
    */
    this.preMousePos = null;

    /**
    * @type {Array<Number>}
    * @private
    * @鹰眼视图中鼠标Down时的Pixel值
    */
    this.startPos = null;

    /**
    * @type {Array<Number>}
    * @private
    * @鹰眼视图中鼠标Up时的Pixel值
    */
    this.endPos = null;
    //设置初始鹰眼框Box的样式
    this.SetBoxStyle("#999999", 0.5);
    //判断初始鹰眼视图是否是显示的
    if (!this.collapsed_) {
        this.ConnectEventHandle();
    }

};
ol.inherits(Zondy.Control.OverviewMap, ol.control.OverviewMap);

/**
* @对鹰眼视图的view进行设置，当投影不为'EPSG:3857'时使用，2015/9/28修改
* @api stable
*/
Zondy.Control.OverviewMap.prototype.InitView = function (center, projection) {
    this.ovmap_.setView(new ol.View({ center: center, projection: projection }));
};

/**
* @对鹰眼视图的Box监听浏览器事件
* @api stable
*/
Zondy.Control.OverviewMap.prototype.ConnectEventHandle = function () {
    var box = this.boxOverlay_.getElement();
    if (box !== undefined && box != null) {
        ol.events.listen(box, ol.events.EventType.MOUSEMOVE,
      this.handleMouseEnter, this);
        ol.events.listen(box, ol.events.EventType.MOUSEOUT,
      this.handleMouseLeave, this);
    }
};

/**
* @设置Box的背景和透明度（灰色:"#999999" ,0.5 :(半透明)）
* @api stable
*/
Zondy.Control.OverviewMap.prototype.SetBoxStyle = function (fillColor, opacity) {
    if (this.boxOverlay_ !== undefined && this.boxOverlay_ != null) {
        var box = this.boxOverlay_.getElement();
        ///
        box.style['backgroundColor'] = fillColor;
        box.style['opacity'] = opacity;
        //goog.style.setStyle_(box, fillColor, "backgroundColor");
        //goog.style.setStyle_(box, opacity, "opacity");
    }
};


/**
* @注销对鹰眼视图的Box监听的浏览器事件
* @api stable
*/
Zondy.Control.OverviewMap.prototype.DisConnectEventHandle = function () {
    var box = this.boxOverlay_.getElement();
    if (box !== undefined && box != null) {
        ol.events.unlisten(box, ol.events.EventType.MOUSEMOVE,
      this.handleMouseEnter, this);
        ol.events.unlisten(box, ol.events.EventType.MOUSEOUT,
      this.handleMouseLeave, this);
    }
};

/**
* @将像素值的字串转换为数字（50px-->50）
* @api stable
*/
Zondy.Control.OverviewMap.prototype.ConvertPixelToNumber = function (str) {
    if (str !== undefined && str != null) {
        var index = str.indexOf("px");
        if (index > 0) {
            return Number(str.slice(0, index));
        }
    }
    return Number(str);
};

/**
* @Box中的MouseDown事件
* @api stable
*/
Zondy.Control.OverviewMap.prototype.handleMouseDown = function (e) {
    this.mouseDown = true;
    var bottom = this.ConvertPixelToNumber(e.target.parentNode.style.bottom);
    var left = this.ConvertPixelToNumber(e.target.parentNode.style.left);
    this.positionBox = [bottom, left];
    this.preMousePos = [e.clientX, e.clientY];
    this.startPos = [e.clientX, e.clientY];
};

/**
* @Box中的MouseMove事件，以控制Box的位置
* @api stable
*/
Zondy.Control.OverviewMap.prototype.handleMouseMove = function (e) {
    if ((this.positionBox !== undefined && this.positionBox != null) && this.mouseDown == true) {
        var deltaX = e.clientX - this.preMousePos[0];
        var deltaY = e.clientY - this.preMousePos[1];
        this.positionBox[0] -= deltaY;
        this.positionBox[1] += deltaX;
        e.target.parentNode.style.bottom = this.positionBox[0] + "px";
        e.target.parentNode.style.left = this.positionBox[1] + "px";
        this.preMousePos = [e.clientX, e.clientY];
    }
};


/**
* @Box中的MouseUp事件，通过Box移动的距离计算主视图中心点的偏移量，
* @从而实现鹰眼与主视图的联动
* @api stable
*/
Zondy.Control.OverviewMap.prototype.handleMouseUp = function (e) {
    if (this.startPos == null) {
        return;
    }
    this.mouseDown = false;
    this.endPos = [e.clientX, e.clientY];

    var map = this.getMap();
    var view = map.getView();
    // goog.asserts.assert(goog.isDef(view), 'view should be defined');

    var ovmap = this.ovmap_;
    var ovview = ovmap.getView();
    //goog.asserts.assert(goog.isDef(ovview), 'ovview should be defined');

    var deltaX = (this.endPos[0] - this.startPos[0]) * ovview.getResolution();
    var deltaY = (this.endPos[1] - this.startPos[1]) * ovview.getResolution();
    var preCenter = view.getCenter();
    var endCenter = [preCenter[0] + deltaX, preCenter[1] - deltaY];
    view.setCenter(endCenter);

    this.startPos = null;
    this.endPos = null;
};

/**
* @Box中的MouseEnter事件，修改鼠标样式为"move"
* @api stable
*/
Zondy.Control.OverviewMap.prototype.handleMouseEnter = function (e) {
    if (e.target.style.cursor != this.cursor_) {
        this.previousCursor_ = e.target.style.cursor;
        e.target.style.cursor = this.cursor_;
    }
    var box = this.boxOverlay_.getElement();
    if (box !== undefined && box != null) {
        ol.events.listen(box, ol.events.EventType.MOUSEDOWN,
      this.handleMouseDown, this);
        ol.events.listen(box, ol.events.EventType.MOUSEMOVE,
      this.handleMouseMove, this);
        ol.events.listen(box, ol.events.EventType.MOUSEUP,
      this.handleMouseUp, this);
    }

};

/**
* @Box中的MouseEnter事件，恢复鼠标的默认样式
* @api stable
*/
Zondy.Control.OverviewMap.prototype.handleMouseLeave = function (e) {
    this.handleMouseUp(e);
    if (this.previousCursor_ !== undefined) {
        e.target.style.cursor = this.previousCursor_;
        this.previousCursor_ = undefined;
    }
    var box = this.boxOverlay_.getElement();
    if (box !== undefined && box != null) {
        ol.events.unlisten(box, ol.events.EventType.MOUSEDOWN,
      this.handleMouseDown, this);
        ol.events.unlisten(box, ol.events.EventType.MOUSEMOVE,
      this.handleMouseMove, this);
        ol.events.unlisten(box, ol.events.EventType.MOUSEUP,
      this.handleMouseUp, this);
    }
};

/**
* @重载ol.control.OverviewMap的handleToggle_方法，从而实现对
* @Box监听的浏览器事件的控制
* @api stable
*/
Zondy.Control.OverviewMap.prototype.handleToggle_ = function () {
    ol.control.OverviewMap.prototype.handleToggle_.apply(this);

    if (!this.collapsed_) {
        this.ConnectEventHandle();
    }
    else {
        this.DisConnectEventHandle();
    }
};

/*----------------------------------------------Zondy.Format.PolygonJSON(start)-------------------------------------------------*/

goog.provide('Zondy.Format.PolygonJSON');

Zondy.Format.PolygonJSON = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    ol.obj.assign(this, options);
};

/**
Deserialize  a MapGIS Features , and Return an array of ol.Feature
*
* Parameters:
* json-{String} | {Object},needs a Zondy.Object.FeatureSet format Javascript object.
**/
Zondy.Format.PolygonJSON.prototype.read = function (json, options) {
    if (json === undefined) {
        return null;
    }
    var obj = null;
    if (typeof json === 'string') {
        obj = JSON.parse(json);
    } else {
        obj = json;
    }
    if (obj !== null) {
        return this.parseVectors(obj);
    }
};
/*
*   Parameters:
*   obj: {Object},an object stand for Zondy.IGServer.WebService.REST.IGS.ExtendBaselibClass.SFeatureElementSet
*/
Zondy.Format.PolygonJSON.prototype.parseVectors = function (zfeatureset) {
    // an array of OpenLayers.Feature.Vector
    if (zfeatureset === undefined || zfeatureset.SFEleArray === undefined) {
        return null;
    }
    if (zfeatureset.SFEleArray.length == 0) {
        return null;
    }
    var results = new Array();

    for (var i = 0, len = zfeatureset.SFEleArray.length; i < len; i++) {
        var zfeature = zfeatureset.SFEleArray[i];
        var attribute = this.parseAttribute(zfeatureset.AttStruct, zfeature.AttValue);
        var geometry = this.parseGeometry(zfeature.fGeom, zfeature.ftype);
        //var vector = new OpenLayers.Feature.Vector(geometry, attribute, null);
        var feature = new ol.Feature();
        feature.setGeometry(geometry);
        feature.setId(zfeature.FID.toString());
        feature.setProperties(attribute);
        results[i] = feature;
    }
    return results;
};

Zondy.Format.PolygonJSON.prototype.parseBound = function (zBound) {
    if (zBound === undefined) {
        return null;
    }
    var result = ol.extent.createOrUpdate(zBound.xmin, zBound.ymin, zBound.xmax, zBound.ymax);
    return result;
};

/*
*  get the attribute object of the vector
*   parameters :
*   attstruct: {Zondy.Object.CAttStruct}
*   attvalue: {ol.Object}
*/
Zondy.Format.PolygonJSON.prototype.parseAttribute = function (attstruct, attvalue) {
    if (attstruct === undefined || attvalue === undefined) {
        return null;
    }
    if (attstruct.FldName.length != attvalue.length) {
        return null;
    }
    var attributes = new ol.Object();
    for (var i = 0, len = attstruct.FldName.length; i < len; i++) {
        attributes.set(attstruct.FldName[i], attvalue[i]);
    };
    return attributes;
};

/**
* fGeom :{Zondy.Object.FeatureGeometry}转换为{ol.geom.Geometry}
* @fGeom {Zondy.Object.FeatureGeometry} fGeom.
* @type {number} type:{1:点;2:线;3:多边形}.
* @return {ol.geom.Geometry} .
* @api stable
*/
Zondy.Format.PolygonJSON.prototype.parseGeometry = function (fGeom, type) {
    var result = null;
    if (type == "Unknow") {
        if (fGeom.PntGeom.length > 0) {
            type = 1;
        }
        else if (fGeom.LinGeom.length > 0) {
            type = 2;
        } else {
            type = 3;
        }
    }

    switch (type) {
        case 1:
            result = this.parseGPoint(fGeom.PntGeom);
            break;
        case 2:
            // if the obj is type of Line
            result = this.parseGLine(fGeom.LinGeom);
            break;
        case 3:
            // if the obj is type of Region
            result = this.parseGRegion(fGeom.RegGeom);
            break;
    }
    return result;
};

/**
* gRegions Array{Zondy.Object.GRegion}转换为{ol.geom.Polygon}
* @param Array{Zondy.Object.GRegion} gRegions.
* @return {ol.geom.Polygon} .
* @api stable
*/
Zondy.Format.PolygonJSON.prototype.parseGRegion = function (gRegions) {
    if (gRegions === undefined || gRegions.length === undefined || gRegions.length == 0) {
        return null;
    }

    var m = 0;
    var results = new Array();
    for (var i = 0; i < gRegions.length; i++) {
        var specifiedGRegion = gRegions[i];
        if (specifiedGRegion === undefined || specifiedGRegion.Rings === undefined) {
            return null;
        }
        var specifiedGRegionLength = specifiedGRegion.Rings.length;
        for (var j = 0, len = specifiedGRegionLength; j < len; j++) {
            var zondyAnyLine = specifiedGRegion.Rings[j];
            var points = new Array();
            var zondyDots = zondyAnyLine.Arcs[0].Dots;
            for (var k = 0, zLen = zondyDots.length; k < zLen; k++) {
                points[k] = [zondyDots[k].x, zondyDots[k].y];
            }
            results[m++] = points;
        }
    }
    return new ol.geom.Polygon(results, ol.geom.GeometryLayout.XY);
};

/**
* glines Array{Zondy.Object.GLine}转换为{ol.geom.MultiLineString}
* @param Array{Zondy.Object.GLine} glines.
* @return {ol.geom.MultiLineString} .
* @api stable
*/
Zondy.Format.PolygonJSON.prototype.parseGLine = function (glines) {
    if (glines === undefined || glines.length === undefined || glines.length == 0) {
        return null;
    }
    var glinesLength;
    var results = []; // an array of ol.geom.LineString;
    if (!glines)
        return null;
    glinesLength = glines.length;
    if (glinesLength === 0)
        return null;
    for (var i = 0, len = glines.length; i < len; i++) {
        var points = new Array();
        var zondyDots = glines[i].Line.Arcs[0].Dots;
        for (var j = 0, dLen = zondyDots.length; j < dLen; j++) {
            points[j] = [zondyDots[j].x, zondyDots[j].y];
        }
        results[i] = points;
    }
    var mulLineString = new ol.geom.MultiLineString(results);
    //mulLineString.setLineStrings(results);
    return mulLineString;
};

/**
* 将gpoint： Array{Zondy.Object.GPoint}转换为{ol.geom.MultiPoint}
* @param： Array{Zondy.Object.GPoint} gpoint.
* @return {ol.geom.MultiPoint} .
* @api stable
*/
Zondy.Format.PolygonJSON.prototype.parseGPoint = function (gpoint) {
    if (gpoint === undefined || gpoint.length === undefined || gpoint.length == 0) {
        return null;
    }
    var points = [];
    var dot = null;
    for (var i = 0, len = gpoint.length; i < len; i++) {
        dot = gpoint[i].Dot;
        //points[i] = new ol.geom.Point([dot.x, dot.y], ol.geom.GeometryLayout.XY);
        points[i] = [dot.x, dot.y];
    }
    var result = new ol.geom.MultiPoint(points, ol.geom.GeometryLayout.XY);
    return result;
};

/*----------------------------------------------Zondy.Format.PolygonJSON(end)---------------------------------------------------*/﻿//**********************************************************Zondy.Service.HttpRequest(start)************************************************//
goog.provide('Zondy.Service.HttpRequest');

/// <summary>HTTP请求基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.HttpRequest = function (opt_options) {
    var options = opt_options ? opt_options : {};

    /**
    * 服务器地址
    * {String}
    */
    this.ip = options.ip !== undefined ? options.ip : "localhost";

    /**
    * 服务器端口
    * {String}
    */
    this.port = options.port !== undefined ? options.port : "6163";

    /**
    * 服务的基地址
    * {String}
    */
    this.baseUrl = null;

    /**
    * 服务地址
    * {String}
    */
    this.partUrl = null;

    /**
    * 使用代理地址
    * {String}
    */
    this.ProxyHost = options.ProxyHost !== undefined ? options.ProxyHost : "";

    /**
    * ajax返回的结果类型
    * {String}
    */
    this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json",

    //goog.object.extend(this, options);
    ol.obj.assign(this, options);
};

/// <summary>ajax调用REST服务</summary>
/// <param name="restUrl" type="String">REST服务地址</param>
/// <param name="dataObject" type="Object">服务器发送的数据，如果为Get则该参数为参数对象</param>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <param name="type" type="{String}">请求类型"Get","Post"</param>
/// <param name="contentType" type="String">get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain</param>
/// <param name="resultFormat" type="String">回调结果的包装形式，取值为'json','xml','kml','gml',georss'，默认为‘json’，对于resultFormat参数为xml，kml，
/// gml或者georss格式的类xml类型将以text文本返回，如需要可以调用$.parseXML(text)得到其xml包装
///</param>
Zondy.Service.HttpRequest.prototype.ajax = function (restUrl, dataObject, onSuccess, type, contentType, resultFormat, onError, options) {
    if (restUrl == null) {
        restUrl = "http://" + this.ip + ":" + this.port + "/" + this.baseUrl + "/" + this.partUrl;
    }
    $.support.cors = true;
    if (!type) {
        type = "GET";
    }
    if (type.toUpperCase() == "POST") {
        if (typeof (dataObject) === "object") {
            var jsonStr = $.toJSON(dataObject);
            dataObject = jsonStr;
        }
    }
    if (contentType === undefined || contentType === null) {
        if (dataObject != null && type.toUpperCase() == "POST")
            contentType = "text/plain";
        else {
            contentType = 'application/x-www-form-urlencoded';
        }
    }
    if (resultFormat != null)
        this.resultFormat = resultFormat;
    var dataType = this.analysisResultType(resultFormat);
    if (this.ProxyHost != "") {
        this.ajaxForProxy(restUrl, dataObject, onSuccess, type, contentType, dataType, onError, options);
    }
    else {
        this.ajaxNormal(restUrl, dataObject, onSuccess, type, contentType, dataType, onError, options);
    }
};

Zondy.Service.HttpRequest.prototype.analysisCrossDomain = function (url) {
    if (url.indexOf('http') < 0 && url.indexOf('https') < 0) {
        return false;
    }
    else {
        var domainHost = window.location.protocol + '://' + window.location.host;
        if (url.indexOf(domainHost) == 0) {
            return false;
        }
    }
    return true;
};

Zondy.Service.HttpRequest.prototype.analysisResultType = function (requestFormat) {
    if (!requestFormat)
        return "json";
    if (requestFormat != "json")
        return "text";
    return requestFormat;
};

//Zondy.Service.HttpRequest.prototype.analysisResultType = function (resultFormat) {
//    if (resultFormat != "json" && resultFormat != "xml")
//        return "json";
//    return resultFormat;
//};

/// <summary>通过代理服务调用IGServer</summary>
Zondy.Service.HttpRequest.prototype.ajaxForProxy = function (restUrl, dataObject, onSuccess, type, contentType, dataType, onError, options) {
    var reUrl = this.ProxyHost;
    if (type.toUpperCase() == "GET") {
        dataObject = { 'url': ol.uri.appendParams(restUrl, dataObject) };
    }
    else {
        reUrl += '?url=' + encodeURI(restUrl);
    }
    var thisObj = this;
    var ajaxParam = {
        type: type,
        url: reUrl,
        dataType: dataType,
        data: dataObject,
        context: thisObj,
        contentType: contentType,
        success: function (jsonObj, status, xrequest) {
            if (Object.prototype.toString.call(onSuccess) === '[object Function]') {
                onSuccess.call(this, jsonObj);
            }
        },
        error: function (s) {
            if (Object.prototype.toString.call(onError) === '[object Function]') {
                onError && onError();
            } else {
                alert("请求失败，请检查参数");
            }
        }
    };

    //goog.object.extend(ajaxParam, options);
    ol.obj.assign(ajaxParam, options);
    $.ajax(ajaxParam);
};

/// <summary>不经过代理服务，直接调用REST服务</summary>
Zondy.Service.HttpRequest.prototype.ajaxNormal = function (restUrl, dataObject, onSuccess, type, contentType, dataType, onError, options) {
    var thisObj = this;
    var crossDomain = this.analysisCrossDomain(restUrl);
    //if ($.browser.msie && window.XDomainRequest && crossDomain) {
    if (navigator.userAgent.indexOf("MSIE") >= 0 && window.XDomainRequest && crossDomain) {
        // window.XDomainRequest 要求服务器输出header信息，所以如果不是跨域的请求即使是IE也不要使用XDomainRequest
        this.ajaxForIE(restUrl, dataObject, onSuccess, type, thisObj, dataType, onError);
    }
    else {
        var ajaxParam = {
            type: type,
            url: restUrl,
            dataType: dataType,
            data: dataObject,
            context: thisObj,
            contentType: contentType,
            success: function (jsonObj, status, xrequest) {
                if (Object.prototype.toString.call(onSuccess) === '[object Function]') {
                    onSuccess.call(this, jsonObj);
                }
            },
            error: function (s) {
                if (Object.prototype.toString.call(onError) === '[object Function]') {
                    onError && onError();
                } else {
                    alert("请求失败，请检查参数");
                }
            }
        };
        // OpenLayers.Util.extend(ajaxParam, options);
        // var opt_options = goog.isDef(options) ? : {};
        //  goog.object.extend(ajaxParam, opt_options);
        $.ajax(ajaxParam);
    }
};

/// <summary>IE实现跨域，只支持IE8.0beta版本以上的浏览器，8.0以下版本无法实现跨域</summary>
Zondy.Service.HttpRequest.prototype.ajaxForIE = function (url, data, callback, type, context, resultFormat, onError) {
    var xdr = new window.XDomainRequest();
    xdr.timeout = 60000;
    var ontimeout = function () {
        alert("IE跨域访问超时");
    };
    //解决IE跨越访问不稳定的问题，需要监听该事件
    var onprogress = function () {

    };
    var onload = function () {
        var rlt;
        if (resultFormat != "text") {
            rlt = $.parseJSON(this.responseText);
        } else {
            rlt = this.responseText;
        }
        callback.call(context, rlt);
    };
    var onerror = function () {
        if (Object.prototype.toString.call(onError) === '[object Function]') {
            onError && onError();
        } else {
            alert("IE跨域请求请求失败");
        }
    };
    if (type.toUpperCase() == "GET") {
        var params = '';
        if (data) {
            for (var key in data) {
                params = params + '&' + key + '=' + encodeURIComponent(data[key]);
            }
            params = params.substring(1, params.length);
            if (url.indexOf('?') > 0)
                url += params;
            else
                url = url + "?" + params;
        }
        url = decodeURI(url);
        url = encodeURI(url);
        xdr.onload = onload;
        xdr.onerror = onerror;
        xdr.ontimeout = ontimeout;
        xdr.onprogress = onprogress;
        xdr.open('get', url);
        xdr.send();

    }
    if (type.toUpperCase() == "POST") {
        url = decodeURI(url);
        url = encodeURI(url);
        xdr.onload = onload;
        xdr.onerror = onerror;
        xdr.ontimeout = ontimeout;
        xdr.onprogress = onprogress;
        xdr.open("post", url);
        xdr.send(data);
    }
};

/// <summary> 获取完整服务的URL</summary>
/// <return name="requestUrl" type="string">完整服务的URL</return>
Zondy.Service.HttpRequest.prototype.getFullUrl = function () {
    var requestUrl = "http://" + this.ip + ":" + this.port + "/" + this.baseUrl + "/" + this.partUrl;
    return requestUrl;
};

//**********************************************************Zondy.Service.HttpRequest(end)************************************************//



//-----------------------------------------------------Zondy.Service.Catalog.CAddMapLayerInfo--------------------------------------------------/
/*
* 添加图层信息对象
*/
goog.provide('Zondy.Service.Catalog.CAddMapLayerInfo');

/// <summary>添加图层信息对象构造函数</summary>
/// <param name="layerName" type="String">图层名称</param>
/// <param name="index" type="Interger">图层在地图或者组下的序号</param>
/// <param name="gdbp" type="String">图层的gdbp</param>
Zondy.Service.Catalog.CAddMapLayerInfo = function (layerName, index, gdbp) {
    this.Index = index !== undefined ? index : 0;
    this.LayerName = layerName !== undefined ? layerName : null;
    this.GDBP = gdbp !== undefined ? gdbp : null;
};
//-----------------------------------------------------Zondy.Service.Catalog.CAddMapGroupInfo--------------------------------------------------/
/*
* 添加图层信息对象
*/
goog.provide('Zondy.Service.Catalog.CAddMapGroupInfo');

/// <summary>构造函数</summary>
/// <param name="groupName" type="String">组名称</param>
/// <param name="index" type="Interger">组在文档或者地图下的序号</param>
/// <param name="mapLayerInfo" type="Array,Zondy.Service.Catalog.CAddMapLayerInfo in an Array">图层信息</param>
Zondy.Service.Catalog.CAddMapGroupInfo = function (groupName, index, mapLayerInfo) {
    this.GroupName = groupName;
    this.Index = index;
    this.AddMapLayerInfos = mapLayerInfo;
};

//-----------------------------------------------------Zondy.Service.Catalog.CAddMapInfo--------------------------------------------------/
/*
* 添加图层信息对象
*/
goog.provide('Zondy.Service.Catalog.CAddMapInfo');

/// <summary>构造函数</summary>
/// <param name="mapName" type="String">地图名称</param>
/// <param name="layerInfos" type="Zondy.Service.Catalog.CAddMapLayerInfo in an Array">地图下的图层信息</param>
/// <param name="options" type="Object">属性对象</param>
Zondy.Service.Catalog.CAddMapInfo = function (mapName, layerInfos, opt_options) {
    var options = opt_options ? opt_options : {};
    /// <summary>地图名称</summary>
    this.MapName = mapName;
    /// <summary>Array,Zondy.Service.Catalog.CAddMapLayerInfo in an Array，地图下的图层信息</summary>
    this.LayerInfos = layerInfos;
    /// <summary>地图在文档下的序号</summary>
    this.Index = options.Index !== undefined ? options.Index : 0;
    /// <summary>Array,Zondy.Service.Catalog.CAddMapGroupInfo in an Array，地图下的组信息</summary>
    this.GroupInfos = options.GroupInfos !== undefined ? options.GroupInfos : null;
    ol.obj.assign(this, options);
};

//-----------------------------------------------------Zondy.Service.Catalog.CAddDocInfo--------------------------------------------------/
/*
* 添加图层信息对象
*/
goog.provide('Zondy.Service.Catalog.CAddDocInfo');

/// <summary>构造函数</summary>
/// <param name="mapName" type="String">地图名称</param>
/// <param name="layerInfos" type="Zondy.Service.Catalog.CAddMapLayerInfo in an Array">地图下的图层信息</param>
/// <param name="options" type="Object">属性对象</param>
Zondy.Service.Catalog.CAddDocInfo = function (docName, mapInfos, opt_options) {
    var options = opt_options ? opt_options : {};
    /// <summary>文档名称</summary>
    this.DocName = docName;
    ///<summary>
    ///  地图文档下得地图信息
    ///  Array
    ///  A list of Zondy.Service.Catalog.AddMapInfo in an Array
    /// </summary>
    this.AddMapInfos = mapInfos;
    /// <summary>是否在服务器文档列表里创建此文档结点</summary>
    this.CreatFolderNode = options.CreatFolderNode !== undefined ? options.CreatFolderNode : false;
    /// <summary>是否创建永久性地图文档，否则为临时性文档</summary>
    this.IsRelease = options.IsRelease !== undefined ? options.IsRelease : false;
    ol.obj.assign(this, options);
};

//**********************************************************Zondy.Service.Catalog.IncludeStruct(start)************************************************//
goog.provide('Zondy.Service.Catalog.IncludeStruct');

/// <summary>地图文档相关信息结构类构造函数</summary>
/// <param name="details" type="Boolean">是否包含细节内容</param>
/// <param name="subs" type="Boolean">是否包含子项</param>
Zondy.Service.Catalog.IncludeStruct = function (details, subs, opt_options) {
    this.includeDetails = true;
    this.includeSubs = false;

    if (typeof (details) == "boolean") {
        this.includeDetails = details;
    }
    if (typeof (subs) == "boolean") {
        this.includeSubs = subs;
    }
};

/**
* 返回此类的JSON字符串
*/
Zondy.Service.Catalog.IncludeStruct.prototype.toJSON = function () {
    return $.toJSON(this);
};
//**********************************************************Zondy.Service.Catalog.IncludeStruct(start)************************************************//
//**********************************************************Zondy.Service.Catalog.CatalogServiceBase(start)************************************************//
goog.provide('Zondy.Service.Catalog.CatalogServiceBase');

/// <summary>目录服务基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.Catalog.CatalogServiceBase = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.HttpRequest.call(this, options);
    this.baseUrl = "igs/rest/mrcs";
};
ol.inherits(Zondy.Service.Catalog.CatalogServiceBase, Zondy.Service.HttpRequest);
//**********************************************************Zondy.Service.Catalog.CatalogServiceBase(end)************************************************//

//**********************************************************Zondy.Service.Catalog.GDBInfo(start)************************************************//
/// <summary>
/// 数据源目录服务
/// </summary>
goog.provide('Zondy.Service.Catalog.GDBInfo');

/// <summary>数据源目录服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.Catalog.GDBInfo = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.Catalog.CatalogServiceBase.call(this, options);
    ol.obj.assign(this, options);
    /// <summary>数据源名称</summary>
    this.serverName = options.serverName !== undefined ? options.serverName : null;
    /// <summary>数据库名称</summary>
    this.gdbName = options.gdbName !== undefined ? options.gdbName : null;
    /// <summary>要素数据集</summary>
    this.dsName = options.dsName !== undefined ? options.dsName : null;
    /// <summary>栅格数据集</summary>
    this.rcsName = options.rcsName !== undefined ? options.rcsName : null;
    /// <summary>数据库用户名//除MapGISLocal数据源，其它的都设置</summary>
    this.User = options.User !== undefined ? options.User : null;
    /// <summary>数据库密码//除MapGISLocal数据源，其它的都设置</summary>
    this.Password = options.Password !== undefined ? options.Password : null;
    /// <summary>是否包含所有</summary>
    this.containAll = options.containAll !== undefined ? options.containAll : true;
};
ol.inherits(Zondy.Service.Catalog.GDBInfo, Zondy.Service.Catalog.CatalogServiceBase);

/// <summary>设置GDBServer的名称，默认为MapGISLocal</summary>
/// <param name="serverName" type="String">GDBServer 名称</param>
Zondy.Service.Catalog.GDBInfo.prototype.setServerName = function (serverName) {
    this.serverName = serverName;
};

Zondy.Service.Catalog.GDBInfo.prototype.setGdbName = function (gdbName) {
    /// <summary>设置GDB名称</summary>
    /// <param name="gdbName" type="String">GDB名称</param>
    this.gdbName = gdbName;
};

Zondy.Service.Catalog.GDBInfo.prototype.setDsName = function (dsName) {
    /// <summary>设置要素集名称</summary>
    /// <param name="dsName" type="String">要素集名称</param>
    this.dsName = dsName;
};

Zondy.Service.Catalog.GDBInfo.prototype.setRcsName = function (rcsName) {
    /// <summary>设置栅格目录名称</summary>
    /// <param name="rcsName" type="String">栅格目录名称</param>
    this.rcsName = rcsName;
};

Zondy.Service.Catalog.GDBInfo.prototype.getServerList = function (onSuccess, onError, options) {
    /// <summary>获取数据源列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    this.partUrl = "datasource?f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options)
};
Zondy.Service.Catalog.GDBInfo.prototype.getGDBList = function (onSuccess, onError, options) {
    /// <summary>获取指定数据源下数据库列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "?f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "?user=" + this.User + "&psw=" + this.Password + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

Zondy.Service.Catalog.GDBInfo.prototype.getDsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下要素集列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/ds?containAll=" + this.containAll + "&f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/ds?user=" + this.User + "&psw=" + this.Password + "&containAll=" + this.containAll + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

Zondy.Service.Catalog.GDBInfo.prototype.getRcsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下所有栅格目录列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/rcs?f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/rcs?user=" + this.User + "&psw=" + this.Password + "&containAll=" + this.containAll + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

Zondy.Service.Catalog.GDBInfo.prototype.getProjectList = function (onSuccess, onError, options) {
    /// <summary>获取参照系列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "?f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.GDBInfo.prototype.getProjectInfo = function (srefID, onSuccess, onError, options) {
    /// <summary>获取参照系信息</summary>
    /// <param name="srefID" type="Integer">空间参照系ID</param>
    /// <param name="onSuccess" type="Function">回调函数</param>
    this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + srefID + "?f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.GDBInfo.prototype.AttachGDB = function (path, onSuccess, onError, options) {
    /// <summary>附加地理数据库</summary>
    /// <param name="path" type="String">数据库的绝对路径</param>
    /// <param name="onSuccess" type="Function">回调函数</param>
    /// <param name="onError" type="Function">请求失败回调函数</param>
    var path = (path != null) ? encodeURI(path) : null;
    if (this.serverName == null || this.gdbName == null || path == null) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "gdb/attach/" + this.gdbName + "?gdbSvrName=" + this.serverName + "&path=" + path + "&f=" + f;
    if (this.user != null && this.password != null) {
        this.partUrl += "&gdbUserName=" + this.User + "&gdbPwd=" + this.Password;
    }
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.GDBInfo.prototype.DetachGDB = function (onSuccess, onError, options) {
    /// <summary>注销地理数据库</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    /// <param name="onError" type="Function">请求失败回调函数</param>
    if (this.serverName == null || this.gdbName == null) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "gdb/detach/" + this.gdbName + "?gdbSvrName=" + this.serverName;

    if (this.user != null && this.password != null) {
        this.partUrl += "&gdbUserName=" + this.User + "&gdbPwd=" + this.Password;
    }
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.GDBInfo.prototype.CreateGDB = function (path, onSuccess, onError, options) {
    /// <summary>创建地理数据库</summary>
    /// <param name="path" type="String">数据库的绝对路径（本地数据源，即MapGISLocal，必须设置，仅包含创建数据库路径，不包含数据库名称）</param>
    /// <param name="onSuccess" type="Function">回调函数</param>
    /// <param name="onError" type="Function">请求失败回调函数</param>
    var path = (path != null) ? encodeURI(path) : null;
    if (this.serverName == null || this.gdbName == null || path == null) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "gdb/creat/" + this.gdbName + "?gdbSvrName=" + this.serverName + "&path=" + path + "&f=" + f;
    if (this.user != null && this.password != null) {
        this.partUrl += "&gdbUserName=" + this.User + "&gdbPwd=" + this.Password;
    }
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.GDBInfo.prototype.DeleteGDB = function (onSuccess, onError, options) {
    /// <summary> 删除地理数据库</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    /// <param name="onError" type="Function">请求失败回调函数</param>
    if (this.serverName == null || this.gdbName == null) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "gdb/delete/" + this.gdbName + "?gdbSvrName=" + this.serverName;

    if (this.user != null && this.password != null) {
        this.partUrl += "&gdbUserName=" + this.User + "&gdbPwd=" + this.Password;
    }
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
//**********************************************************Zondy.Service.Catalog.GDBInfo(end)************************************************//
//**********************************************************Zondy.Service.Catalog.MapDoc(start)************************************************//
goog.provide('Zondy.Service.Catalog.MapDoc');

/// <summary>地图文档目录服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.Catalog.MapDoc = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.Catalog.CatalogServiceBase.call(this, options);
    ol.obj.assign(this, options);
    /// <summary>地图文档名称 {String}</summary>
    this.docName = options.docName !== undefined ? options.docName : null;

    /// <summary>地图索引 {Int}</summary>
    this.mapIndex = options.mapIndex !== undefined ? options.mapIndex : 0;

    /// <summary>图层索引 {Int}</summary>
    this.layerID = options.layerID !== undefined ? options.layerID : 0;

    /// <summary>版本信息 {Int}</summary>
    this.version = options.version !== undefined ? options.version : 2;

    ///<summary>指定地图文档相关信息的结构,值为Zondy.Service.Catalog.IncludeStruct类型</summary>
    ///默认includeDetails为true ,includeSubs为false
    ///当includeDetails为true时，includeSubs方有效
    this.include = options.include !== undefined ? options.include : "{includeDetails:true,includeSubs:false}";

    /// <summary>是否返回由DWS所返回的原始格式信息</summary>
    this.returnFullStyle = options.returnFullStyle !== undefined ? options.returnFullStyle : false;

    ///唯一标识，用于标识地图文档
    this.guid = options.guid !== undefined ? options.guid : Zondy.Util.newGuid();
};
ol.inherits(Zondy.Service.Catalog.MapDoc, Zondy.Service.Catalog.CatalogServiceBase);

/// <summary>设置地图文档名称</summary>
/// <param name="docName" type="String">文档名称</param>
Zondy.Service.Catalog.MapDoc.prototype.setDocName = function (docName) {
    this.docName = docName !== undefined ? docName : null;
};

/// <summary>设置地图序号</summary>
/// <param name="mapIndex" type="Int">地图在文档下的序号</param>
Zondy.Service.Catalog.MapDoc.prototype.setMapIndex = function (mapIndex) {
    this.mapIndex = mapIndex !== undefined ? mapIndex : 0;
};

/// <summary>设置图层序号</summary>
/// <param name="layerID" type="Int">图层在地图下得序号</param>
Zondy.Service.Catalog.MapDoc.prototype.setLayerID = function (layerID) {
    this.layerID = layerID !== undefined ? layerID : 0;;
};
/// <summary>
///处理查询结果，并调用用户回调将结果返回给用户
/// <param name="jsonObj" type="object">json对象</param>
///</summary>
Zondy.Service.Catalog.MapDoc.prototype.processResult = function (jsonObj) {
    if (this.resultFormat == "json") {
        switch (this.rltObjType) {
            case "DocInfo":
                var rltObj = new Zondy.Object.Catalog.DocInfo();
                break;
            case "MapInfo":
                var rltObj = new Zondy.Object.Catalog.MapInfo();
                break;
            default:
                this.resultCallBack(jsonObj);
                return
        }
        ol.obj.assign(rltObj, jsonObj);
        this.resultCallBack(rltObj);
    }
    else {
        this.resultCallBack(jsonObj);
    }
};
/// <summary>获取服务器地图文档列表</summary>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <param name="onError" type="Function">调用失败返回函数</param>
//(1)v为版本信息，例如v=2。当v缺省时，只返回直接发布的地图文档列表，当v=2时，返回包含直接发布的地图文档和目录形式发布的地图文档在内的所有地图文档列表。
//(2)在发布地图文档时需注意，尽量保证直接发布的地图文档与目录发布的地图文档之间不存在重名文件。
/// </return>
Zondy.Service.Catalog.MapDoc.prototype.getMapDocList = function (onSuccess, onError, options) {
    this.partUrl = "docs?v=" + this.version + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

/// <summary>获取指定地图文档的详细信息</summary>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <param name="details" type="Boolean">返回结果是否包含地图详细内容</param>
/// <param name="sub" type="Boolean">返回结果是否地图信息</param>
///  returnFullStyle = true时，details，sub属性设置才能生效
/// </param>
Zondy.Service.Catalog.MapDoc.prototype.getMapDocInfo = function (onSuccess, details, sub, onError, returnFullStyle, options) {
    if (typeof (returnFullStyle) == "boolean") {
        this.returnFullStyle = returnFullStyle;
    }
    if (typeof (details) == "boolean" || typeof (subs) == "boolean") {
        var includeObj = new Zondy.Service.Catalog.IncludeStruct(details, sub);
        this.include = includeObj.toJSON();
    }
    this.partUrl = "docs/" + this.docName + "?include=" + this.include + "&returnFullStyle=" + this.returnFullStyle + "&guid=" + this.guid + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

/// <summary>获取地图文档中指定地图的相关信息</summary>
/// <param name="returnFullStyle" type="Boolean">是否返回由DWS所返回的原始格式信息</param>
/// <param name="details" type="Boolean">兼容旧版本，该参数无效，调用时可不设置或设为null</param>
Zondy.Service.Catalog.MapDoc.prototype.getMapInfo = function (onSuccess, returnFullStyle, details, onError, options) {
    if (typeof (returnFullStyle) == "boolean") {
        this.returnFullStyle = returnFullStyle;
    }
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "?returnFullStyle=" + this.returnFullStyle + "&guid=" + this.guid + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

/// <summary>获取指定地图下指定图层的相关信息</summary>
/// <param name="returnFullStyle" type="Boolean">是否返回由DWS所返回的原始格式信息</param>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <return type="Zondy.Object.Catalog.MapInfo">指定图层的详细信息</return>
Zondy.Service.Catalog.MapDoc.prototype.getLayerInfo = function (onSuccess, onError, options) {
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "/" + this.layerID + "?returnFullStyle=" + this.returnFullStyle + "&guid=" + this.guid + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

/// <summary>获取指定地图下所有图层的图层信息</summary>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <return type="Object">指定地图的详细信息</return>
Zondy.Service.Catalog.MapDoc.prototype.getLayersInfo = function (onSuccess, onError, options) {
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "/layers?f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};



/// <summary>删除地图图层（GET）</summary>
/// <param name="layerIDs" type="String">图层索引列表（多个序号间以“,”号分隔，如0,6）</param>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <return type="Boolen">是否成功删除地图图层</return>
Zondy.Service.Catalog.MapDoc.prototype.deleteLayer = function (onSuccess, onError, options) {
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "/layers/delete?layerIDs=" + this.layerID + "&guid=" + this.guid + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

/// <summary>添加地图图层（POST）</summary>
/// <param name="addLayerInfo" type="Array, Zondy.Object.CAddLayerInfo in an Array">需要添加的图层数组</param>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <return type="Boolen">是否成功添加地图图层</return>
Zondy.Service.Catalog.MapDoc.prototype.addLayer = function (addLayerInfos, onSuccess, onError, options) {
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "/layers/add?guid=" + this.guid + "&f=" + this.resultFormat;
    this.ajax(null, addLayerInfos, onSuccess, "POST", null, null, onError, options);
};

/// <summary>更改图层顺序（POST）</summary>
/// <param name="newIndexArray" type="Array,Interger in an Array">新图层的序号顺序数组</param>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <return type="Boolen">是否成功更改图层顺序</return>
Zondy.Service.Catalog.MapDoc.prototype.changeIndex = function (newIndexArray, onSuccess, onError, options) {
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "/layers/index?guid=" + this.guid + "&f=" + this.resultFormat;
    this.ajax(null, newIndexArray, onSuccess, "POST", null, null, onError, options);
};

/// <summary>获取指定图层图例信息（Get）</summary>
/// <param name="layerIDs" type="string">需要获取图例信息的图层索引,如0,6</param>
///<param name="fields" type="string">需要获取图例信息图层对应的字段,如省名,ID</param>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <return type="Object">指定图层图例信息</return>
Zondy.Service.Catalog.MapDoc.prototype.getLegendInfo = function (layerIDs, fields, onSuccess, onError, options) {
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "legendInfo/" + this.docName + "?f=" + f + "&layerIndexes=" + layerIDs + "&fields=" + fields;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
//**********************************************************Zondy.Service.Catalog.MapDoc(end)************************************************//
//**********************************************************Zondy.Service.Catalog.TileLayer(start)************************************************//
goog.provide('Zondy.Service.Catalog.TileLayer');

/// <summary>瓦片目录服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.Catalog.TileLayer = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.Catalog.CatalogServiceBase.call(this, options);
    ol.obj.assign(this, options);
    /// <summary>瓦片名称</summary>
    this.tileName = options.tileName !== undefined ? options.tileName : null;
    /// <summary>瓦片版本</summary>
    this.version = options.version !== undefined ? options.version : "2.0";

};
ol.inherits(Zondy.Service.Catalog.TileLayer, Zondy.Service.Catalog.CatalogServiceBase);

/// <summary>设置瓦片名称</summary>
/// <param name="docName" type="String">文档名称</param>
Zondy.Service.Catalog.TileLayer.prototype.setTileName = function (tileName) {
    this.tileName = tileName;
};

/// <summary>获取服务器瓦片列表</summary>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <param name="includeDirTiles" type="Boolean">是否返回目录形式发布的瓦片</param>
/// <return type="Object/String in an Arry" >瓦片名称列表组成的数组
/// 当includeDirTiles为true时，return返回值类型为Object
/// 当includeDirTiles为false时，return返回值类型为String in an Arry
/// </return>
Zondy.Service.Catalog.TileLayer.prototype.getTileList = function (onSuccess, onError, options) {
    this.partUrl = "tiles?f=" + this.resultFormat;
    if (this.version) {
        if (this.version == "2.0") {
            this.partUrl += "&v=2";
        } else {
            this.partUrl += "&v=" + this.version;
        }
    }
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

/// <summary>获取指定瓦片的详细信息</summary>
/// <param name="tileName" type="Function">瓦片名称</param>
/// <param name="onSuccess" type="Function">回调函数</param>
/// <return type="Zondy.Object.Catalog.TileMapInfo">指定瓦片的详细信息</return>
Zondy.Service.Catalog.TileLayer.prototype.getTileInfo = function (onSuccess, onError, options) {
    this.partUrl = "tiles/" + this.tileName + "?f=" + this.resultFormat;
    if (this.version) {
        this.partUrl += "&v=" + this.version;
    }
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
}
//**********************************************************Zondy.Service.Catalog.TileLayer(end)************************************************//

//**********************************************************Zondy.Service.Catalog.TileLayer(start)************************************************//
goog.provide('Zondy.Service.Catalog.VectorLayer');

/**
* @api stable
*/
Zondy.Service.Catalog.VectorLayer = function (opt_options) {
    var options = goog.isDef(opt_options) ? opt_options : {};
    Zondy.Service.Catalog.GDBInfo.call(this, options);
    ol.obj.assign(this, options);
};
ol.inherits(Zondy.Service.Catalog.VectorLayer, Zondy.Service.Catalog.GDBInfo);


Zondy.Service.Catalog.VectorLayer.prototype.getSfclsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下所有简单要素类列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/sfcls?containAll=" + this.containAll + "&f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/sfcls?user=" + this.User + "&psw=" + this.Password + "&containAll=" + this.containAll + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, null, null, null, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.getAclsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下所有注记类列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/acls?containAll=" + this.containAll + "&f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/acls?user=" + this.User + "&psw=" + this.Password + "&containAll=" + this.containAll + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError);
};
Zondy.Service.Catalog.VectorLayer.prototype.getOclsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下所有对象类列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/ocls?containAll=" + this.containAll + "&f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/ocls?user=" + this.User + "&psw=" + this.Password + "&containAll=" + this.containAll + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.getNclsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下所有网络类列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/ncls?containAll=" + this.containAll + "&f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/ncls?user=" + this.User + "&psw=" + this.Password + "&containAll=" + this.containAll + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.getRdsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下所有栅格数据集列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/rds?containAll=" + this.containAll + "&f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/rds?user=" + this.User + "&psw=" + this.Password + "&containAll=" + this.containAll + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.getDsSfclsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下指定要素集内所有简单要素类列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/sfcls?f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/sfcls?user=" + this.User + "&psw=" + this.Password + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.getDsAclsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下指定要素集内所有注记类列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/acls?f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/acls?user=" + this.User + "&psw=" + this.Password + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.getDsOclsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下指定要素集内所有对象类列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/ocls?f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/ocls?user=" + this.User + "&psw=" + this.Password + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.getDsNclsList = function (onSuccess, onError, options) {
    /// <summary>获取GDB下指定要素集内所有网络类列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/ncls?f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/ncls?user=" + this.User + "&psw=" + this.Password + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

Zondy.Service.Catalog.VectorLayer.prototype.getRdsListInRcs = function (onSuccess, onError, options) {
    /// <summary>获取GDB下指定栅格目录内所有栅格数据集列表</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.rcsName + "/rds?f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.rcsName + "/rds?user=" + this.User + "&psw=" + this.Password + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

Zondy.Service.Catalog.VectorLayer.prototype.getLayerList = function (clsType, onSuccess, onError, options) {
    /// <summary>通过传入的参数选择获取GDB下面的哪一类</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    /// <param name="clsType" type="String">值为"sfcls","ds", "acls", "ncls"，"ocls", "rds", "rcs"</param>
    ///</param>分别为数据库下简单要素类，要素集，注记类,网络类,对象类，栅格数据集，栅格目录</param>
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + clsType + "?containAll=" + this.containAll + "&f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + clsType + "?user=" + this.User + "&psw=" + this.Password + "&containAll=" + this.containAll + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

Zondy.Service.Catalog.VectorLayer.prototype.getLayerListInDS = function (clsType, onSuccess, onError, options) {
    /// <summary>通过传入的参数选择获取GDB下面指定要素集下的哪一类</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    /// <param name="clsType" type="String">值为"sfcls", "acls", "ncls"，"ocls", "rds", "rcs"
    ///分别为GDB下简单要素类，要素类，注记类或网络类
    if (this.serverName.toLowerCase() == "mapgislocal")
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/" + clsType + "?f=" + this.resultFormat;
    else
        this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + this.dsName + "/" + clsType + "?user=" + this.User + "&psw=" + this.Password + "&f=" + this.resultFormat;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};

Zondy.Service.Catalog.VectorLayer.prototype.getLayerInfo = function (gdbpUrl, onSuccess, onError, options) {
    /// <summary>获取图层详细信息</summary>
    /// <param name="gdbpUrl" type="String">类URL</param>
    /// <param name="onSuccess" type="Function">回调函数</param>
    this.partUrl = "layerinfo?gdbpUrl=" + gdbpUrl + "&f=json";
    this.ajax(null, null, onSuccess, null, null, null, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.CreateVectCls = function (vectCls, onSuccess, onError, options) {
    /// <summary>在指定GDB中创建图层</summary>
    /// <param name="vectCls" type="Zondy.Object.VectCls"> 矢量类</param>
    /// 可指定图层的数据类型、几何形态、属性结构、要素数据集、空间参考等信息，
    /// 其中图层的属性结构，采用POST参数形式传入,若未设置图层名称，则图层名称为当前guid
    /// <param name="onSuccess" type="Function">回调函数</param>
    var vectCls = (vectCls != null) ? vectCls : null;
    if (vectCls == null || this.serverName == null || this.gdbName == null) {
        return;
    }
    if (this.User != null && this.Password != null) {
        this.partUrl = "datasource/" + this.User + ":" + this.Password + "@";
    }
    else {
        this.partUrl = "datasource/";
    }
    var f = this.analysisResultType(this.resultFormat);
    if (vectCls.clsName == null) {
        vectCls.clsName = Zondy.Util.newGuid();
    }
    this.partUrl += this.serverName + "/" + this.gdbName + "/" + vectCls.clsType + "/" + vectCls.clsName + "/create?"
                    + "geoType=" + vectCls.geoType + "&srefName=" + vectCls.srefName
                    + "&dsName=" + vectCls.dsName + "&f=" + f;

    //将属性结构对象转为json字符串
    var attStructStr = $.toJSON(vectCls.attStruct);
    this.ajax(null, attStructStr, onSuccess, "POST", null, this.resultFormat, onError, options);
};
Zondy.Service.Catalog.VectorLayer.prototype.deleteXCls = function (clsType, clsName, onSuccess, onError, options) {
    if (this.serverName == null || this.gdbName == null || clsType == null || clsName == null) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "datasource/" + this.serverName + "/" + this.gdbName + "/" + clsType + "/" + clsName + "/delete?f=" + f;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
//**********************************************************Zondy.Service.Catalog.VectorLayer(end)************************************************//


//**********************************************************Zondy.Service.Catalog.ColorInfo(start)************************************************//
/// <summary>
/// RGB和颜色号转换服务
/// </summary>
goog.provide('Zondy.Service.Catalog.ColorInfo');

/// <summary>RGB和颜色号转换服务构造函数</summary>
/// <param name="libID" type="Int">系统库ID</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.Catalog.ColorInfo = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.Catalog.CatalogServiceBase.call(this, options);
    ol.obj.assign(this, options);
    this.SystemLibID = options.SystemLibID !== undefined ? options.SystemLibID : 0;  //系统库索引号
    this.ColorNO = options.ColorNO !== undefined ? options.ColorNO : 6;               //颜色号
    this.Red = options.Red !== undefined ? options.Red : 0;            //（红色）值，0~255取值
    this.Green = options.Green !== undefined ? options.Green : 0;      //（绿色）值，0~255取值
    this.Blue = options.Blue !== undefined ? options.Blue : 0;        //（蓝色）值，0~255取值
    this.addNew = options.addNew !== undefined ? options.BladdNewue : false;
};
ol.inherits(Zondy.Service.Catalog.ColorInfo, Zondy.Service.Catalog.CatalogServiceBase);

/**
* 根据RGB值获取该颜色在颜色库中的颜色号
* Parameters:
* rgbArr-{Int in an Arry} rgb数组 eg:[5, 5, 5]
* addNew-{Boolen} 如果查找到的颜色与传入的颜色RGB不完全相同，是否根据传入的RGB值添加新颜色到颜色库
* onSuccess-{Function} 
* return:
* 颜色值在系统库中对应的ID编号 -{Int}
*/
Zondy.Service.Catalog.ColorInfo.prototype.getColorNO = function (options, onSuccess, onError/*, options*/) {
    if (options != null && options !== undefined) {
        if (options.SystemLibID !== undefined) {
            this.SystemLibID = options.SystemLibID;
        }
        if (options.Red !== undefined) {
            this.Red = options.Red;
        }
        if (options.Green !== undefined) {
            this.Green = options.Green;
        }
        if (options.Blue !== undefined) {
            this.Blue = options.Blue;
        }
        if (options.addNew !== undefined) {
            this.addNew = options.addNew;
        }
    }
    var f = this.resultFormat;
    this.partUrl = "ColorLib/getColorNO?f=" + f + "&libID=" + this.SystemLibID + "&r=" + this.Red + "&g=" + this.Green + "&b=" + this.Blue + "&addNew=" + this.addNew;
    this.ajax(null, null, onSuccess, null, null, null, onError, options);
};
/**
* 根据颜色号获取颜色RGB值
* Parameters:
* colorNO-{Int} 颜色号
* onSuccess-{Function} 回调函数
* return：
* 颜色信息对象 - {Zondy.Object.Catalog.ColorInfo}
*/
Zondy.Service.Catalog.ColorInfo.prototype.getColorRGB = function (options, onSuccess, onError/*, options*/) {
    if (options != null && options !== undefined) {
        if (options.SystemLibID !== undefined) {
            this.SystemLibID = options.SystemLibID;
        }
        if (options.ColorNO !== undefined) {
            this.ColorNO = options.ColorNO;
        }
    }
    var f = this.resultFormat;
    this.partUrl = "ColorLib/getColorRGB?f=" + f + "&libID=" + this.SystemLibID + "&colorNO=" + this.ColorNO;
    this.ajax(null, null, onSuccess, null, null, null, onError, options);
};
//**********************************************************Zondy.Service.Catalog.ColorInfo(end)************************************************//
//**********************************************************Zondy.Service.QueryFeatureStruct(start)************************************************//
goog.provide('Zondy.Service.QueryFeatureStruct');

/**
* Class: Zondy.Service.QueryFeatureStruct
* 要素查询结构基类
*/
Zondy.Service.QueryFeatureStruct = function (opt_options) {
    var options = opt_options ? opt_options : {};

    /**
    *  是否包含属性值
    *  {Bool}
    **/
    this.IncludeAttribute = options.IncludeAttribute !== undefined && (typeof (options.IncludeAttribute) == "boolean") ? options.IncludeAttribute : true;

    /**
    *  是否包含几何图形信息
    *  {Bool}
    **/
    this.IncludeGeometry = options.IncludeGeometry !== undefined && (typeof (options.IncludeGeometry) == "boolean") ? options.IncludeGeometry : false;

    /**
    *  是否包含图形参数
    *  {Bool}
    **/
    this.IncludeWebGraphic = options.IncludeWebGraphic !== undefined && (typeof (options.IncludeWebGraphic) == "boolean") ? options.IncludeWebGraphic : false;

    ol.obj.assign(this, options);

};

/// <summary>
///获取此类的json形式的字符串
///</summary>
Zondy.Service.QueryFeatureStruct.prototype.toJSON = function () {
    return $.toJSON(this);
};
//**********************************************************Zondy.Service.QueryFeatureStruct(end)************************************************//

//**********************************************************Zondy.Service.QueryServiceBase(start)************************************************//
/// <summary>
/// 查询服务基类
/// </summary>
goog.provide('Zondy.Service.QueryServiceBase');

/// <summary>查询服务基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.QueryServiceBase = function (opt_options) {
    var options = opt_options ? opt_options : {};

    Zondy.Service.HttpRequest.call(this, options);

    /// <summary>返回格式{string} json|xml</summary>
    this.resultCallBack = options.resultCallBack !== undefined ? options.resultCallBack : null;

    ///<summary> 用于查询的参数类{Zondy.Service.QueryParameter}</summary>
    this.queryParam = options.queryParam !== undefined ? options.queryParam : null;

    /// <summary>请求方式{string} GET|POST</summary>
    this.requestType = options.requestType !== undefined ? options.requestType : "GET";

    /// <summary>请求地址前缀{string}</summary>
    this.baseUrl = "igs/rest/mrfs/";
};
ol.inherits(Zondy.Service.QueryServiceBase, Zondy.Service.HttpRequest);

/// <summary>
///处理查询结果，并调用用户回调将结果返回给用户
/// Private, 本方法私有
///</summary>
Zondy.Service.QueryServiceBase.prototype.processResult = function (jsonObj) {
    var rltObj = new Zondy.Object.FeatureSet();
    $.extend(rltObj, jsonObj);
    this.resultCallBack(rltObj);
};

/// <summary>
///开始查询
/// 
///</summary>
Zondy.Service.QueryServiceBase.prototype.restQuery = function (restUrl, dataObject, onSuccess, way, onError, options) {
    this.resultCallBack = onSuccess;
    this.ajax(restUrl, dataObject, this.processResult, way, null, dataObject.f, onError, options);
};

/// <summary>
/// 执行查询
/// <param name="onSuccess" type="Function">回调函数</param>
///</summary>
Zondy.Service.QueryServiceBase.prototype.query = function (onSuccess, onError, requestType, options) {
    if (this.queryParam == null) {
        return;
    }
    var fullRestUrl = "";

    if (this.queryParam instanceof Zondy.Service.QueryParameter) {
        // 如果是属于几何查询类
        fullRestUrl = "http://" + this.ip + ":" + this.port + "/" + this.baseUrl
             + this.partUrl;
    }
    else {
        return;
    }
    var way = "";
    if (!requestType) {
        if (!this.requestType) {
            way = "GET";
        } else {
            way = this.requestType;
        }
    } else {
        way = requestType;
    }
    var dataObject = this.queryParam.getParameterObject();
    this.restQuery(fullRestUrl, dataObject, onSuccess, way, onError, options);
};
//**********************************************************Zondy.Service.QueryServiceBase(end)************************************************//
//**********************************************************Zondy.Service.QueryParameterBase(start)************************************************//
goog.provide('Zondy.Service.QueryParameterBase');


/**
* Class: Zondy.Service.QueryParameterBase
* 查询参数基类
*/
Zondy.Service.QueryParameterBase = function (opt_options) {
    var options = opt_options ? opt_options : {};

    /// <summary>用于查询的几何描述
    /// {Zondy.Object.Tangram}
    /// </summary>
    this.geometry = options.geometry !== undefined ? options.geometry : null;

    /// <summary>
    /// 条件查询的SQL语句,如果为空，则表示为单一的几何查询；
    ///  如果取值，表示为几何和条件混合查询
    ///  {String}
    ///</summary>
    this.where = options.where !== undefined ? options.where : null;

    /// <summary>几何查询的规则
    ///{Zondy.Service.QueryFeatureRule}
    ///</summary>
    this.rule = options.rule !== undefined ? options.rule : null;

    /// <summary>
    /// 需要查询的要素OID号，多个间用‘，’分隔
    /// 如果此参数有值，查询将默认转化为使用要素ID查询，而忽略条件查询
    ///</summary>
    this.objectIds = options.objectIds !== undefined ? options.objectIds : null;

    /// <summary>
    /// 分页号{Interger}
    ///</summary>
    this.pageIndex = options.pageIndex !== undefined ? options.pageIndex : 0;

    /// <summary>
    /// 每页记录数{Interger}
    ///</summary>
    this.recordNumber = options.recordNumber !== undefined ? options.recordNumber : 20;

    /// <summary>
    /// 查询结果的序列化形式(json（默认值）|xml|kml|gml|georss，对于xml，kml，gml或者georss格式的类xml类型将以text文本返回，如需要可调用$.parseXML(text)得到其xml包装)
    /// {String}
    ///</summary>
    this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json";

    /// <summary>
    /// 指定查询返回结果所包含的要素信息
    /// {Zondy.Service.QueryFeatureStruct}
    ///</summary>
    this.struct = options.struct !== undefined ? options.struct : new Zondy.Service.QueryFeatureStruct();

    /// <summary>
    /// 指定查询返回结果的排序字段
    /// {Zondy.Service.QueryFeatureStruct}
    ///</summary>
    this.orderField = options.orderField !== undefined ? options.orderField : null;

    /// <summary>
    /// 是否升序排列，与orderField配合使用
    /// {Zondy.Service.QueryFeatureStruct}
    ///</summary>
    this.isAsc = options.isAsc !== undefined ? options.isAsc : false;
};
//**********************************************************Zondy.Service.QueryParameterBase(end)************************************************//

//**********************************************************Zondy.Service.QueryParameter(start)************************************************//
goog.provide('Zondy.Service.QueryParameter');

/**
* Class: Zondy.Service.QueryParameter
* Inherits from:
*  - <Zondy.Service.QueryParameterBase> 
*/
Zondy.Service.QueryParameter = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.QueryParameterBase.call(this, options);
    ol.obj.assign(this, options);
};
ol.inherits(Zondy.Service.QueryParameter, Zondy.Service.QueryParameterBase);

/// <summary>
///获取相关参数的REST-URL表示形式
///</summary>
Zondy.Service.QueryParameter.prototype.getParameterURL = function () {
    var paramUrl = "";
    paramUrl = "geometry=" + this.geometry.toString();
    paramUrl += "&geometryType=" + this.geometry.getGeometryType();
    paramUrl += "&page=" + this.pageIndex.toString();
    paramUrl += "&pageCount=" + this.recordNumber.toString();
    paramUrl += "&f=" + this.resultFormat;

    if (this.struct != null) {
        paramUrl += "&structs=" + $.toJSON(this.struct);
    }
    if (this.where != null) {
        paramUrl += "&where=" + this.where;
    }
    if (this.rule != null) {
        paramUrl += "&rule=" + $.toJSON(this.rule);
    }
    if (this.objectIds != null) {
        paramUrl += "&objectIds=" + this.objectIds;
    }
    if (this.orderField != null) {
        paramUrl += "&orderField=" + this.orderField;
    }
    if (this.isAsc != null) {
        paramUrl += "&isAsc=" + this.isAsc;
    }
    return paramUrl;
};

/// <summary>
///获取相关参数的Object形式,私有方法
///</summary>
Zondy.Service.QueryParameter.prototype.getParameterObject = function () {
    var obj = {};
    obj.f = this.resultFormat;
    if (this.struct != null) {
        obj.structs = this.struct.toJSON();
    }

    if (this.objectIds != null) {

        obj.objectIds = this.objectIds;
        return obj;
    };

    obj.page = this.pageIndex.toString();
    obj.pageCount = this.recordNumber.toString();

    if (this.geometry != null) {
        obj.geometry = this.geometry.toString();
        obj.geometryType = this.geometry.getGeometryType();
    }
    if (this.where != null)
        obj.where = this.where;
    if (this.rule != null)
        obj.rule = this.rule.toJSON();
    if (this.orderField != null)
        obj.orderField = this.orderField;
    if (this.isAsc != null)
        obj.isAsc = this.isAsc;
    return obj;

};
//**********************************************************Zondy.Service.QueryParameter(end)************************************************//
//**********************************************************Zondy.Service.QueryFeatureRule(start)************************************************//
goog.provide('Zondy.Service.QueryFeatureRule');

/**
* Class: Zondy.Service.QueryFeatureRule
* 要素查询规则基类
*/
Zondy.Service.QueryFeatureRule = function (opt_options) {
    var options = opt_options ? opt_options : {};

    /**
    * 修改内容：!="boolean"修改为=="boolean"
    * 修改时间：2017.10.18
    * 修改人：朱鹏飞
    */

    /**
    *  是否仅比较要素的外包矩形，来判定是否与几何约束图形有交集
    *  {Bool}
    **/
    this.CompareRectOnly = (options.CompareRectOnly !== undefined && (typeof (options.CompareRectOnly) == "boolean")) ? options.CompareRectOnly : false;

    /**
    *  是否将要素的可见性计算在内
    *  {Bool}
    **/
    this.EnableDisplayCondition = (options.EnableDisplayCondition !== undefined && (typeof (options.EnableDisplayCondition) == "boolean")) ? options.EnableDisplayCondition : false;

    /**
    *  是否完全包含
    *  {Bool}
    **/
    this.MustInside = (options.MustInside !== undefined && (typeof (options.MustInside) == "boolean")) ? options.MustInside : false;

    /**
    *  是否相交
    *  {Bool}
    **/
    this.Intersect = (options.Intersect !== undefined && (typeof (options.Intersect) == "boolean")) ? options.Intersect : false;

    ol.obj.assign(this, options);
};

/// <summary>
///获取此类的json形式的字符串
///</summary>
Zondy.Service.QueryFeatureRule.prototype.toJSON = function () {
    return $.toJSON(this);
};
//**********************************************************Zondy.Service.QueryFeatureRule(end)************************************************//
//**********************************************************Zondy.Service.QueryLayerFeature(start)************************************************//
/// <summary>
/// 矢量图层查询服务
/// </summary>
goog.provide('Zondy.Service.QueryLayerFeature');

/// <summary>查矢量图层查询服务构造函数</summary>
/// <param name="queryParam" type="Zondy.Object.QueryParameter">查询参数信息</param>
/// <param name="gdbps" type="string">图层的gdbp地址，允许多个图层，图层间用“，”号分隔</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.QueryLayerFeature = function (queryParam, opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.QueryServiceBase.call(this, options);
    ol.obj.assign(this, options);
    this.queryParam = queryParam;
    this.partUrl = "layer/query";
};
ol.inherits(Zondy.Service.QueryLayerFeature, Zondy.Service.QueryServiceBase);
//**********************************************************Zondy.Service.QueryLayerFeature(end)************************************************//
//**********************************************************Zondy.Service.QueryDocFeature(start)************************************************//
/// <summary>
/// 矢量地图文档查询服务
/// </summary>
goog.provide('Zondy.Service.QueryDocFeature');

/// <summary>矢量地图文档查询服务构造函数</summary>
/// <param name="queryParam" type="Zondy.Object.QueryParameter">查询参数信息</param>
/// <param name="docName" type="string">地图文档名称</param>
/// <param name="mapIndex" type="Int">地图索引号</param>
/// <param name="layerIndexes" type="string">图层索引号, 多图层间以“,”号分隔</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.QueryDocFeature = function (queryParam, docName, layerIndex, opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.QueryServiceBase.call(this, options);
    ol.obj.assign(this, options);
    this.queryParam = queryParam;
    this.docName = docName;
    this.layerIndex = layerIndex;
    //目前只支持地图的所以为0的
    this.mapIndex = 0;
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex.toString() + "/" + this.layerIndex.toString() + "/query";

};
ol.inherits(Zondy.Service.QueryDocFeature, Zondy.Service.QueryServiceBase);
//**********************************************************Zondy.Service.QueryDocFeature(end)************************************************//
//**********************************************************Zondy.Service.QueryByLayerParameter(start)************************************************//
goog.provide('Zondy.Service.QueryByLayerParameter');

/**
* Class: Zondy.Service.QueryByLayerParameter
* Inherits from:
*  - <Zondy.Service.QueryParameter> 
*/
Zondy.Service.QueryByLayerParameter = function (gdbp, opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.QueryParameter.call(this, options);
    this.struct = options.struct !== undefined ? options.struct : new Zondy.Service.QueryFeatureStruct();
    this.gdbp = gdbp !== undefined ? encodeURI(gdbp) : null;

};
ol.inherits(Zondy.Service.QueryByLayerParameter, Zondy.Service.QueryParameter);

/// <summary>
///重载基类getParameterURL，获取相关参数的REST-URL表示形式
///</summary>
Zondy.Service.QueryByLayerParameter.prototype.getParameterURL = function () {
    var paramUrl = Zondy.Service.QueryParameter.prototype.getParameterURL.apply(this);
    return paramUrl + "&gdbp=" + this.gdbp;
};

/// <summary>
///重载基类getParameterObject，获取相关参数的Object形式,私有方法
///</summary>
Zondy.Service.QueryByLayerParameter.prototype.getParameterObject = function () {
    var obj = Zondy.Service.QueryParameter.prototype.getParameterObject.apply(this);
    obj.gdbp = this.gdbp;
    return obj;
};
//**********************************************************Zondy.Service.QueryByLayerParameter(end)************************************************//
//**********************************************************Zondy.Service.Catalog.EditServiceBase(start)************************************************//
/// <summary>
/// 用于编辑要素的服务基类
/// </summary>
goog.provide('Zondy.Service.EditServiceBase');

/// <summary>要素编辑服务基类构造函数 </summary>
/// <param name="opt_options" type="object">属性键值对</param>
Zondy.Service.EditServiceBase = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.HttpRequest.call(this, options);

    /// <summary>返回结果信息的格式{string}</summary>
    this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json";

    /// <summary>唯一标识{string}</summary>
    this.guid = options.guid !== undefined ? options.guid : Zondy.Util.newGuid();

    this.baseUrl = "igs/rest/mrfs";

};
ol.inherits(Zondy.Service.EditServiceBase, Zondy.Service.HttpRequest);

Zondy.Service.EditServiceBase.prototype.getFullUrl = function () {
    /// <summary>获取完整服务的URL</summary>
    var s = "http://" + this.ip + ":" + this.port + "/" + this.baseUrl + "/" + this.partUrl;
    return s;
};
Zondy.Service.EditServiceBase.prototype.getBaseUrl = function () {
    var s = "http://" + this.ip + ":" + this.port + "/" + this.baseUrl + "/";
    return s;
};
//**********************************************************Zondy.Service.Catalog.EditServiceBase(end)************************************************//
//**********************************************************Zondy.Service.Catalog.EditLayerFeature(start)************************************************//
/// <summary>
/// 矢量图层要素编辑服务
/// </summary>
goog.provide('Zondy.Service.EditLayerFeature');

/// <summary>矢量图层要素编辑服务构造函数</summary>
/// <param name="gdbp" type="String">图层的URL，添加要素只能同时操作单个图层</param>
Zondy.Service.EditLayerFeature = function (gdbp, opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.EditServiceBase.call(this, options);
    ol.obj.assign(this, options);
    this.gdbp = gdbp !== undefined ? gdbp : null;

};
ol.inherits(Zondy.Service.EditLayerFeature, Zondy.Service.EditServiceBase);

/**
* 添加一组要素
* param: features{Zondy.Object.FeatureSet} 要添加的要素集合
* param: onSuccess{Function} 添加成功后的回调函数
*/
Zondy.Service.EditLayerFeature.prototype.add = function (features, onSuccess, onError, options) {
    if (features === undefined) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "layer/addFeatures?f=" + f + "&gdbp=" + this.gdbp + "&guid=" + this.guid;
    this.ajax(null, features, onSuccess, "POST", null, null, onError, options);
};

/**
* 更新一组要素
* param: features{Zondy.Object.FeatureSet} 要更新的要素集合
* param: onSuccess{Function} 更新成功后的回调函数
*/
Zondy.Service.EditLayerFeature.prototype.update = function (features, onSuccess, onError, options) {
    if (features === undefined) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "layer/updateFeatures?f=" + f + "&gdbp=" + this.gdbp + "&guid=" + this.guid;
    this.ajax(null, features, onSuccess, "POST", null, null, onError, options);
};

/**
* 删除一组要素
* param: featureIds{String} 要删除的要素OID，多个要素OID间用','分割
* param: onSuccess{Function} 删除成功后的回调函数
*/
Zondy.Service.EditLayerFeature.prototype.deletes = function (featureIds, onSuccess, onError, options) {
    if (featureIds === undefined) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "layer/deleteFeatures?f=" + f + "&objectIds=" + featureIds + "&gdbp=" + this.gdbp + "&guid=" + this.guid;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
//**********************************************************Zondy.Service.Catalog.EditLayerFeature(end)************************************************//
//**********************************************************Zondy.Service.EditDocFeature(start)************************************************//
/// <summary>
/// 矢量地图文档要素编辑服务
/// </summary>
goog.provide('Zondy.Service.EditDocFeature');

/// <summary>编辑要素到文档服务构造函数</summary>
/// <param name="docName" type="string">文档名称</param>
/// <param name="mapIndex" type="Interger">地图索引号</param>
/// <param name="layerIndex" type="Interger">图层索引号，添加要素时只能同时操作单个图层</param>
/// <param name="opt_options" type="object">属性键值对</param>
Zondy.Service.EditDocFeature = function (docName, layerIndex, opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.EditServiceBase.call(this, options);
    ol.obj.assign(this, options);
    this.docName = docName !== undefined ? docName : null;
    //只允许赋值为0
    this.mapIndex = 0;
    this.layerIndex = layerIndex !== undefined ? layerIndex : 0;

};
ol.inherits(Zondy.Service.EditDocFeature, Zondy.Service.EditServiceBase);

/**
* 添加一组要素
* param: features{Zondy.Object.FeatureSet} 要添加的要素集合
* param: onSuccess{Function} 添加成功后的回调函数
*/
Zondy.Service.EditDocFeature.prototype.add = function (features, onSuccess, onError, options) {
    if (features === undefined) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "/" + this.layerIndex + "/addFeatures?f=" + f + "&guid=" + this.guid;
    this.ajax(null, features, onSuccess, "POST", null, null, onError, options);
};

/**
* 更新一组要素
* param: features{Zondy.Object.FeatureSet} 要更新的要素集合
* param: onSuccess{Function} 更新成功后的回调函数
*/
Zondy.Service.EditDocFeature.prototype.update = function (features, onSuccess, onError, options) {
    if (features === undefined) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "/" + this.layerIndex + "/updateFeatures?f=" + f + "&guid=" + this.guid;
    this.ajax(null, features, onSuccess, "POST", null, null, onError, options);
};

/**
* 删除一组要素
* param: featureIds{String} 要删除的要素OID，多个要素OID间用','分割
* param: onSuccess{Function} 删除成功后的回调函数
*/
Zondy.Service.EditDocFeature.prototype.deletes = function (featureIds, onSuccess, onError, options) {
    if (featureIds === undefined) {
        return;
    }
    var f = this.analysisResultType(this.resultFormat);
    this.partUrl = "docs/" + this.docName + "/" + this.mapIndex + "/" + this.layerIndex + "/deleteFeatures?f=" + f + "&objectIds=" + featureIds + "&guid=" + this.guid;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
//**********************************************************Zondy.Service.EditDocFeature(end)************************************************//
goog.provide('Zondy.Service.GeometryAnalysisBase');
goog.require('Zondy.Service.HttpRequest');

/// <summary>几何分析服务基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.GeometryAnalysisBase = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.HttpRequest.call(this, options);

    /// <summary>返回结果信息的格式{string}</summary>
    this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json";

    /// <summary>请求地址前缀{string}</summary>
    this.baseUrl = "igs/rest/mrgs";
};
ol.inherits(Zondy.Service.GeometryAnalysisBase, Zondy.Service.HttpRequest);
goog.provide('Zondy.Service.CProjectParam');
/**
* @api stable
*/
Zondy.Service.CProjectParam = function (opt_options) {
    var options = opt_options ? opt_options : {};
    /// <summary>投影转换空间参数类</summary>

    /// <summary>{Interger};角度单位</summary>
    this.ProjAngleUnit = options.ProjAngleUnit !== undefined ? options.ProjAngleUnit : 0;

    /// <summary>{Double};投影原点纬度</summary>
    this.ProjLat = options.ProjLat !== undefined ? options.ProjLat : 0.00;

    /// <summary>{Double};第一标准维度</summary>
    this.ProjLat1 = options.ProjLat1 !== undefined ? options.ProjLat1 : 0.00;

    /// <summary>{Double};第二标准维度</summary>
    this.ProjLat2 = options.ProjLat2 !== undefined ? options.ProjLat2 : 0.00;

    /// <summary>{Double}，中央子午线经度</summary>
    this.ProjLon = options.ProjLon !== undefined ? options.ProjLon : 0.00;

    /// <summary>{Double}，水平比例尺</summary>
    this.ProjRate = options.ProjRate !== undefined ? options.ProjRate : 0.00;

    /// <summary>{Interger}，坐标系类型</summary>
    this.ProjType = options.ProjType !== undefined ? options.ProjType : 0;

    /// <summary>{Interger}，投影类型</summary>
    this.ProjTypeID = options.ProjTypeID !== undefined ? options.ProjTypeID : 0;

    /// <summary>{Interger}，长度单位</summary>
    this.ProjUnit = options.ProjUnit !== undefined ? options.ProjUnit : 0;

    /// <summary>{Short}，投影带号</summary>
    this.ProjZoneNO = options.ProjZoneNO !== undefined ? options.ProjZoneNO : 0;

    /// <summary>{Short}，投影分带类型</summary>
    this.ProjZoneType = options.ProjZoneType !== undefined ? options.ProjZoneType : 0;

    /// <summary>{Interger}，椭球体参数</summary>
    this.SphereID = options.SphereID !== undefined ? options.SphereID : 0;

    ol.obj.assign(this, options);
};
goog.provide('Zondy.Service.CProjectBySRSID');
goog.require('Zondy.Object.CGDBInfo');


/**
*  <summary>用于进行SRSID投影的参数类/summary>
*  <param name="desSrsID" type="{Interger}">目标SRSID号</param>
*  <param name="gdbInfo" type="{Zondy.Object.CGDBInfo}">关于SRSID的GDB信息</param>
*/
Zondy.Service.CProjectBySRSID = function (desSrsID, gdbInfo) {
    this.DesSrsID = desSrsID;
    this.GdbInfo = gdbInfo;
};
goog.provide('Zondy.Service.CalServiceBase');
goog.require("Zondy.Service.GeometryAnalysisBase");

/// <summary>测量服务基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.CalServiceBase = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.GeometryAnalysisBase.call(this, options);
    ol.obj.assign(this, options);
    this.dots = options.dots !== undefined ? options.dots : null;
    /// <summary>{Zondy.Service.CProjectParam}类型</summary>
    this.projectInfo = options.projectInfo !== undefined ? options.projectInfo : null;
    /// <summary>{Zondy.Service.CProjectBySRSID}</summary>
    this.projectInfoBySRSID = options.projectInfoBySRSID !== undefined ? options.projectInfoBySRSID : null;

};
ol.inherits(Zondy.Service.CalServiceBase, Zondy.Service.GeometryAnalysisBase);

/// <summary>通过传入投影参数或者通过传入SRSID参数进行计算</summary>
/// <param name="fullURL" type="String">请求基地址</param>
/// <param name="projParam" type="Zondy.Service.CProjectBySRSID | Zondy.Service.CProjectParam（建议普通用户采用此类直接获取MapGIS GDB 已经提供的空间参考系）">投影参数</param>
/// <param name="onSuccess" type="Function">执行成功后的回调函数</param>
Zondy.Service.CalServiceBase.prototype.execute = function (projParam, onSuccess, onError, options) {
    if (projParam instanceof Zondy.Service.CProjectParam) {
        this.projectInfo = projParam;
    }
    if (projParam instanceof Zondy.Service.CProjectBySRSID) {
        this.projectInfoBySrsID = projParam;
    }
    var postObj = {};
    postObj.Dots = this.dots;
    postObj.ProjectInfo = this.projectInfo;
    postObj.ProjectInfoBySrsID = this.projectInfoBySrsID;
    //var postString = $.toJSON(postObj);
    this.ajax(null, postObj, onSuccess, "POST", null, this.resultFormat, onError, options);
}
goog.provide('Zondy.Service.CalPolyLineLength');
goog.require('Zondy.Service.CalServiceBase');


/**
* @api stable
* <summary>折线长度计算服务</summary>
*<param name="obj" type="Array">需要计算的点数组,数组类型为Zondy.Object.Point2D</param>
*<param name="options" type="Object">为其他属性赋值的键值对</param>
*/
Zondy.Service.CalPolyLineLength = function (obj, opt_options) {
    var options = opt_options ? opt_options : {};
    ol.obj.assign(options, { "dots": obj });
    Zondy.Service.CalServiceBase.call(this, options);
    this.partUrl = "geomservice/calLength?f=" + this.resultFormat;
};
ol.inherits(Zondy.Service.CalPolyLineLength, Zondy.Service.CalServiceBase);
goog.provide('Zondy.Service.CalArea');
goog.require('Zondy.Service.CalServiceBase');

/// <summary>计算面积服务构造函数</summary>
/// <param name="obj" type="Zondy.Object.Point2D in an Arry">需要计算的点数组</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.CalArea = function (obj, opt_options) {
    var options = goog.isDef(opt_options) ? opt_options : {};
    ol.obj.assign(options, { "dots": obj });
    Zondy.Service.CalServiceBase.call(this, options);
    this.partUrl = "geomservice/calArea?f=" + this.resultFormat;
};
ol.inherits(Zondy.Service.CalArea, Zondy.Service.CalServiceBase);
goog.provide('Zondy.Service.ProjectDots');
goog.require('Zondy.Service.GeometryAnalysisBase');


/**
* @api stable
* <param name="dots" type="Zondy.Object.Point2D in an Array">需要转换的点坐标</param>
* <param name="srcparam" type="Zondy.Service.CProjectParam">源投影参数</param>
* <param name="desparam" type="Zondy.Service.CProjectParam">目标投影参数</param>
*/
Zondy.Service.ProjectDots = function (dots, srcparam, desparam, opt_options) {
    var options = goog.isDef(opt_options) ? opt_options : {};
    //投影坐标
    this.InputDots = dots;
    //源投影参考
    this.SrcProjParam = srcparam;
    //目的投影参考
    this.DesProjParm = desparam;
    ol.obj.assign(this, options);
    Zondy.Service.GeometryAnalysisBase.call(this, options);
};
ol.inherits(Zondy.Service.ProjectDots, Zondy.Service.GeometryAnalysisBase);
/// <summary>执行点投影</summary>
/// <param name="onSuccess" type="Function">回调函数</param>
Zondy.Service.ProjectDots.prototype.execute = function (onSuccess, onError, options) {
    this.partUrl = "geomservice/projectdots?f=" + this.resultFormat;
    var jsonString = $.toJSON(this, ['ip', 'port', 'baseUrl', 'partUrl', 'resultFormat']);
    this.ajax(null, jsonString, onSuccess, "POST", null, null, onError, options);
};
goog.provide('Zondy.Service.ProjectRang');
goog.require('Zondy.Service.GeometryAnalysisBase');

/**
* @api stable
* 对矩形范围坐标点进行投影转换
*/
Zondy.Service.ProjectRang = function (opt_options) {
    var options = opt_options ? opt_options : {};
    //数据源名称
    this.gdbsvrName = options.gdbsvrName !== undefined ? options.gdbsvrName : "MapGISLocal";
    //数据库名称
    this.gdbName = options.gdbName !== undefined ? options.gdbName : null;
    //源投影参考系ID
    this.srefID = options.srefID !== undefined ? options.srefID : 0;
    //目的投影参考系ID。
    this.desfID = options.desfID !== undefined ? options.desfID : 0;
    //地理数据源/地理数据库账户名
    this.userName = options.userName !== undefined ? options.userName : null;
    //地理数据源/地理数据库密码
    this.password = options.password !== undefined ? options.password : null;

    Zondy.Service.GeometryAnalysisBase.call(this, options);
};

ol.inherits(Zondy.Service.ProjectRang, Zondy.Service.GeometryAnalysisBase);

/// <summary>设置GDBServer的名称，默认为MapGISLocal</summary>
/// <param name="gdbsvrName" type="String">GDBServer 名称</param>
Zondy.Service.ProjectRang.prototype.setGdbSvrName = function (gdbsvrName) {
    this.gdbsvrName = gdbsvrName;
};

/// <summary>设置GDB名称</summary>
/// <param name="gdbName" type="String">GDB名称</param>
Zondy.Service.ProjectRang.prototype.setGdbName = function (gdbName) {
    this.gdbName = gdbName;
};

/// <summary>设置源投影参考系ID</summary>
/// <param name="srefID" type="String">源投影参考系ID</param>
Zondy.Service.ProjectRang.prototype.setSrefID = function (srefID) {
    this.srefID = srefID;
};
/// <summary>设置目的投影参考系ID</summary>
/// <param name="desfID" type="String">目的投影参考系ID</param>
Zondy.Service.ProjectRang.prototype.setDesfID = function (desfID) {
    this.desfID = desfID;
};

/// <summary>设置用户名和密码</summary>
/// <param name="userName" type="String">数据库用户名</param>
/// <param name="password" type="String">数据库密码</param>
Zondy.Service.ProjectRang.prototype.setUserPass = function (userName, password) {
    this.userName = userName;
    this.password = password;
};


/// <summary>执行投影</summary>
///<param name="rectangle" type="Zondy.Object.Rectangle">
/// <param name="onSuccess" type="Function">回调函数</param>
Zondy.Service.ProjectRang.prototype.execute = function (rectangle, onSuccess, onError, options) {
    var rang = "";
    if (rectangle) {
        rang = rectangle.xmin + "$" + rectangle.ymin + "$" + rectangle.xmax + "$" + rectangle.ymax;
    }
    if (this.userName == null || this.password == null) {
        this.partUrl = "geomservice/" + this.gdbsvrName + "/" + this.gdbName + "/" + this.srefID + "/" + this.desfID + "?f=" + this.resultFormat + "&rang=" + rang;
    } else {
        this.partUrl = "geomservice/" + this.gdbsvrName + "/" + this.gdbName + "/" + this.srefID + "/" + this.desfID + "?f=" + this.resultFormat + "&rang=" + rang + "&userName=" + this.userName + "&password=" + this.password;
    }

    this.ajax(null, null, onSuccess, null, null, this.resultFormat, onError, options);
}
goog.provide('Zondy.Service.TopAnalysis');

goog.require('Zondy.Service.GeometryAnalysisBase');

/**
* @api stable
* 拓扑分析类,您只应该对pnt,line,reg3个属性中的一个赋值
*/
Zondy.Service.TopAnalysis = function (opt_options) {
    var options = opt_options ? opt_options : {};
    this.pnt = options.pnt !== undefined ? options.pnt : null;
    this.line = options.line !== undefined ? options.line : null;
    this.reg = options.reg !== undefined ? options.reg : null;
    /// <summary>分析半径</summary>
    this.nearDis = options.nearDis !== undefined ? options.nearDis : 0.01;
    /// <summary>相对对象</summary>
    this.relativeObj = options.relativeObj !== undefined ? options.relativeObj : null;
    this.p_onSuccess = options.p_onSuccess !== undefined ? options.p_onSuccess : null;
    Zondy.Service.GeometryAnalysisBase.call(this, options);
};
ol.inherits(Zondy.Service.TopAnalysis, Zondy.Service.GeometryAnalysisBase);

/// <summary>设置点类型</summary>
/// <param name="pnt" type="Zondy.Object.GPoint">需要设置的点类型</param>
Zondy.Service.TopAnalysis.prototype.setPnt = function (pnt) {
    this.pnt = pnt;
};
/// <summary>设置线类型</summary>
/// <param name="line" type="Zondy.Object.GLine">需要设置的线类型</param>
Zondy.Service.TopAnalysis.prototype.setLine = function (line) {
    this.line = line;
};
/// <summary>设置区类型</summary>
/// <param name="reg" type="Zondy.Object.GRegion">需要设置的区类型</param>
Zondy.Service.TopAnalysis.prototype.setReg = function (reg) {
    this.reg = reg;
};
/// <summary>设置拓扑分析的相对参照物</summary>
/// <param name="obj" type="Zondy.Object.GRegion">相对参照物</param>
Zondy.Service.TopAnalysis.prototype.setRelativeObj = function (obj) {
    this.relativeObj = obj;
};
Zondy.Service.TopAnalysis.prototype.execute = function (onSuccess) {
    this.p_onSuccess = onSuccess;
    var postObj = {};
    postObj.NearDis = this.nearDis;
    postObj.Pnt = this.pnt;
    postObj.Line = this.line;
    postObj.Reg = this.reg;
    postObj.RelativeObj = this.relativeObj;
    this.partUrl = "geomservice/topanalysis?f=" + this.resultFormat;
    var postString = $.toJSON(postObj);
    this.ajax(null, postString, this.onGetRltSuccess, "POST", null, this.resultFormat);
};
Zondy.Service.TopAnalysis.prototype.onGetRltSuccess = function (enumNum) {
    var rlt = Zondy.Util.getTopAnalysisResult(enumNum);
    this.p_onSuccess(rlt);
};
goog.provide('Zondy.Service.Smooth');
goog.require('Zondy.Service.GeometryAnalysisBase');
/**
* @api stable
* 光滑线
*/
Zondy.Service.Smooth = function (opt_options) {
    var options = opt_options ? opt_options : {};
    //插值方式。可取值0、1、2、3
    //0为二次样条、1为三次样条、2为三次Beizer样条、3为三次B样条
    this.type = options.type !== undefined ? options.type : 0;
    //步长，插值时的间隔步长。
    this.step = options.step !== undefined ? options.step : 1;
    Zondy.Service.GeometryAnalysisBase.call(this, options);
};
ol.inherits(Zondy.Service.Smooth, Zondy.Service.GeometryAnalysisBase);

/// <summary>设置插值方式</summary>
/// <param name="type" type="number">插值方式可取值0、1、2、3</param>
Zondy.Service.Smooth.prototype.setType = function (type) {
    this.type = type;
};
/// <summary>步长，插值时的间隔步长。</summary>
/// <param name="type" type="number">步长</param>
Zondy.Service.Smooth.prototype.setStep = function (step) {
    this.step = step;
};
/// <summary>执行光滑线调用</summary>
/// <param name="dots" type="Array.<Point2D>">回调函数</param>
/// <param name="onSuccess" type="Function">回调函数</param>
Zondy.Service.Smooth.prototype.execute = function (dots, onSuccess) {
    if (this.type == 2) {
        if (dots.length < 4) {
            alert("当前选中的为三次Beizer样条，最少需四个点");
            return;
        }
    } else {
        if (dots.length < 3) {
            alert("当前选中的类型最少需三个点");
            return;
        }
    }
    this.partUrl = "geomservice/smooth?f=" + this.resultFormat + "&type=" + this.type + "&step=" + this.step;
    var jsonString = $.toJSON(dots);
    this.ajax(null, jsonString, onSuccess, "POST", null, this.resultFormat);
};
goog.provide('Zondy.Service.AnalysisBase');
goog.require('Zondy.Service.HttpRequest');


/// <summary>空间分析服务基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.AnalysisBase = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.HttpRequest.call(this, options);

    /// <summary>工作流ID号,Interger</summary>
    this.flowID = options.flowID !== undefined ? options.flowID : null;

};
ol.inherits(Zondy.Service.AnalysisBase, Zondy.Service.HttpRequest);

/// <summary>执行空间分析服务</summary>
/// <param name="onSuccess" type="{Function}">必要参数，执行成功后的回调函数</param>
/// <param name="way" type="{String}">服务器请求类型
///  'POST' or 'GET'，默认为'Get',当所需要发送的数据量比较大时，请选择'Post',否则可能会执行失败
///</param>
/// <param name="isAsy" type="{Boolean}">是否异步执行，默认为false</param>
/// <param name="f" type="{String}">'json' or 'xml' 指明执行返回结果的格式</param>
Zondy.Service.AnalysisBase.prototype.execute = function (onSuccess, way, isAsy, f, onError, options) {
    /// <summary>执行分析语句</summary>
    /// <param name="onSuccess" type="{Function}">必要参数，执行成功后的回调函数</param>
    /// <param name="way" type="{String}">
    ///     'POST' or 'GET'，默认为'Get',当所需要发送的数据量比较大时，请选择'Post',否则可能会执行失败
    ///</param>
    /// <param name="isAsy" type="{Boolean}">是否异步执行，默认为false</param>
    /// <param name="f" type="{String}">'json' or 'xml' 指明执行返回结果的格式</param>
    var data = {};
    if (!way)
        way = "get";

    if (f == undefined)
        //  如果f 未定义，或者f为非法字符串时，默认为json
        f = "json";
    else {
        if (f.toLowerCase() != 'xml')
            f = 'json';
    }
    if (isAsy == undefined) {
        isAsy = false;
    }

    if (this.partUrl == null)
        this.partUrl = "execute/" + this.flowID;
    if (this.baseUrl == null)
        this.baseUrl = "igs/rest/mrfws";

    if (way.toLowerCase() == "get") {
        data.f = f;
        data.isAsy = isAsy;
        var jsonStr = $.toJSON(this, ['port', 'ip', 'baseUrl', 'partUrl'], ';', false);
        data.paraValues = jsonStr.substring(1, jsonStr.length - 1);
    }

    if (way.toLowerCase() == "post") {
        this.partUrl += "?isAsy=" + isAsy.toString() + "&f=" + f;
        jsonStr = $.toJSON(this, ['port', 'ip', 'baseUrl', 'partUrl'], ',');
        var obj = $.parseJSON(jsonStr);
        var keyValueArray = new Array();
        for (var o in obj) {
            var keyValue = {};
            keyValue.Key = o;
            /*
            * 修改内容：将if(obj[o])修改为if(obj[o]!=null)
            * 修改时间：2017.10.18
            * 修改人：朱鹏飞
            */
            if (obj[o] != null) {
                keyValue.Value = obj[o].toString();
                keyValueArray.push(keyValue);
            }
        }
        data = $.toJSON(keyValueArray);
    }

    this.ajax(null, data, onSuccess, way, null, f, onError, options);
};


goog.provide('Zondy.Service.ProjectBase');
goog.require('Zondy.Service.AnalysisBase');


/**
* @api stable
*/
Zondy.Service.ProjectBase = function (opt_options) {
    var options = opt_options ? opt_options : {};
    this.clsName = options.clsName !== undefined ? options.clsName : null;
    this.desClsName = options.desClsName !== undefined ? options.desClsName : null;
    this.resultName = options.resultName !== undefined ? options.resultName : null;
    Zondy.Service.AnalysisBase.call(this, options);
};
ol.inherits(Zondy.Service.ProjectBase, Zondy.Service.AnalysisBase);

goog.provide('Zondy.Service.ProjectByLayer');
goog.require('Zondy.Service.ProjectBase');

/**
* @api stable
* opt_cprojectParam类型为Zondy.Service.CProjectParam
*/
Zondy.Service.ProjectByLayer = function (opt_cprojectParam, opt_options) {
    var options = goog.isDef(opt_options) ? opt_options : {};
    /// <summary>根据投影参数投影类，生成目的类</summary>
    ol.obj.assign(options, opt_cprojectParam);
    ol.obj.assign(this, options);
    Zondy.Service.ProjectBase.call(this, options);
    this.flowID = "600235";
};
ol.inherits(Zondy.Service.ProjectByLayer, Zondy.Service.ProjectBase);

goog.provide('Zondy.Service.ProjectBySRID');
goog.require('Zondy.Service.ProjectBase');


/**
* @api stable
*/
Zondy.Service.ProjectBySRID = function (opt_cprojectParam, opt_options) {
    var options = opt_options ? opt_options : {};
    this.srID = options.srID !== undefined ? options.srID : 32;
    ol.obj.assign(options, opt_cprojectParam);
    ol.obj.assign(this, options);
    Zondy.Service.ProjectBase.call(this, options);
    this.flowID = "600234";
};
ol.inherits(Zondy.Service.ProjectBySRID, Zondy.Service.ProjectBase);

goog.provide('Zondy.Service.ClassBufferBase');
goog.require('Zondy.Service.AnalysisBase');


/**
* @api stable
* 类缓冲分析基类
*/
Zondy.Service.ClassBufferBase = function (opt_options) {
    var options = opt_options ? opt_options : {};

    this.srcInfo = options.srcInfo !== undefined ? options.srcInfo : null;
    this.desInfo = options.desInfo !== undefined ? options.desInfo : null;
    this.idstr = options.idstr !== undefined ? options.idstr : "";
    this.angleType = options.angleType !== undefined ? options.angleType : 0;
    this.isDissolve = options.isDissolve !== undefined ? options.isDissolve : true;
    this.isDynPrj = options.isDynPrj !== undefined ? options.isDynPrj : false;

    Zondy.Service.AnalysisBase.call(this, options);
};
ol.inherits(Zondy.Service.ClassBufferBase, Zondy.Service.AnalysisBase);

goog.provide('Zondy.Service.ClassBufferByMultiplyRing');
goog.require('Zondy.Service.ClassBufferBase');


/**
* @api stable
* 类缓冲分析（多圈）
*/
Zondy.Service.ClassBufferByMultiplyRing = function (opt_options) {
    var options = opt_options ? opt_options : {};
    this.radiusStr = options.radiusStr !== undefined ? options.radiusStr : "2,4,8,10";
    Zondy.Service.ClassBufferBase.call(this, options);
    this.flowID = "600232";
};
ol.inherits(Zondy.Service.ClassBufferByMultiplyRing, Zondy.Service.ClassBufferBase);

goog.provide('Zondy.Service.ClassBufferBySingleRing');
goog.require('Zondy.Service.ClassBufferBase');

/**
* @api stable
* 类缓冲分析（单圈）
*/
Zondy.Service.ClassBufferBySingleRing = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.ClassBufferBase.call(this, options);

    /// <summary>>缓冲分析左半径 {Double}</summary>
    this.leftRad = options.leftRad !== undefined ? options.leftRad : 0.001;

    /// <summary>>缓冲分析右半径{Double}</summary>
    this.rightRad = options.rightRad !== undefined ? options.rightRad : 0.001;

    /// <summary>>是否根据属性字段设置缓冲区半径{Boolen}</summary>
    this.isByAtt = options.isByAtt !== undefined ? options.isByAtt : true;

    /// <summary>>属性字段名称,当isByAtt为true时使用{String}</summary>
    this.fldName = options.fldName !== undefined ? options.fldName : null;

    /// <summary>>动态投影半径{Interger}
    /// 使用前必须设置父类Zondy.Service.ClassBufferBase公共属性 isDynPrj 为”true”
    /// </summary>
    this.dynPrjRad = options.dynPrjRad !== undefined ? options.dynPrjRad : 0;

    /// <summary>>矢量图层单圈缓冲区分析的工作流ID{String}</summary>
    this.flowID = "600231";
};
ol.inherits(Zondy.Service.ClassBufferBySingleRing, Zondy.Service.ClassBufferBase);

goog.provide('Zondy.Service.FeatureBuffBase');
goog.require('Zondy.Service.AnalysisBase');


/**
* @api stable
*/
Zondy.Service.FeatureBuffBase = function (opt_options) {
    var options = opt_options ? opt_options : {};
    //分析的要素的空间信息,序列化为字符串
    this.sfGeometryXML = options.sfGeometryXML !== undefined ? options.sfGeometryXML : null;
    //要素的属性结构,序列化为字符串
    this.attStrctXML = options.attStrctXML !== undefined ? options.attStrctXML : null;
    //要素的属性值,序列化为字符串
    this.attRowsXML = options.attRowsXML !== undefined ? options.attRowsXML : null;
    //追踪半径
    this.traceRadius = options.traceRadius !== undefined ? options.traceRadius : 0.0001;
    //分析结果的URL地址,如GDBP://mapgislocal/Sample/sfcls/多边形缓冲结果
    this.resultName = options.resultName !== undefined ? options.resultName : null;
    this.inFormat = options.inFormat !== undefined ? options.inFormat : "json";
    ol.obj.assign(this, options);
    Zondy.Service.AnalysisBase.call(this, options);

};
ol.inherits(Zondy.Service.FeatureBuffBase, Zondy.Service.AnalysisBase);
goog.provide('Zondy.Service.FeatureBuffBySingleRing');
goog.require('Zondy.Service.FeatureBuffBase');

/**
* @api stable
*/
Zondy.Service.FeatureBuffBySingleRing = function (opt_options) {
    var options = opt_options ? opt_options : {};
    this.leftRad = options.leftRad !== undefined ? options.leftRad : 0.001;
    this.rightRad = options.rightRad !== undefined ? options.rightRad : 0.001;
    Zondy.Service.FeatureBuffBase.call(this, options);
    this.flowID = "600238";
};
ol.inherits(Zondy.Service.FeatureBuffBySingleRing, Zondy.Service.FeatureBuffBase);

goog.provide('Zondy.Service.FeatureBuffByMultiplyRing');
goog.require('Zondy.Service.FeatureBuffBase');


/**
* @api stable
*/
Zondy.Service.FeatureBuffByMultiplyRing = function (opt_options) {
    var options = opt_options ? opt_options : {};
    this.radiusStr = options.radiusStr !== undefined ? options.radiusStr : "0.003,0.002,0.001";
    Zondy.Service.FeatureBuffBase.call(this, options);
    this.flowID = "600239";
};
ol.inherits(Zondy.Service.FeatureBuffByMultiplyRing, Zondy.Service.FeatureBuffBase);

goog.provide('Zondy.Service.ClipBase');
goog.require('Zondy.Service.AnalysisBase');


/**
* @api stable
* 裁剪分析基类分析类
*/
Zondy.Service.ClipBase = function (opt_options) {
    var options = opt_options ? opt_options : {};
    //裁剪分析结果图层URL
    this.desInfo = options.desInfo !== undefined ? options.desInfo : null;
    //属性数据处理方式
    this.attOptType = options.attOptType !== undefined ? options.attOptType : 1;
    //图形参数处理方式
    this.infoOptType = options.infoOptType !== undefined ? options.infoOptType : 1;
    //裁剪方式
    this.overType = options.overType !== undefined ? options.overType : 3;
    //容差半径
    this.tolerance = options.tolerance !== undefined ? options.tolerance : 0.0001;
    //是否结点平差
    this.isCleanNode = options.isCleanNode !== undefined ? options.isCleanNode : false;
    //是否裁剪label点
    this.isLabelPnt = options.isLabelPnt !== undefined ? options.isLabelPnt : false;
    //是否检查区的合法性
    this.isValidReg = options.isValidReg !== undefined ? options.isValidReg : false;
    Zondy.Service.AnalysisBase.call(this, options);
    ol.obj.assign(this, options);
};
ol.inherits(Zondy.Service.ClipBase, Zondy.Service.AnalysisBase);

goog.provide('Zondy.Service.ClipByCircle');
goog.require('Zondy.Service.ClipBase');


/**
* @api stable
*/
Zondy.Service.ClipByCircle = function (opt_options) {
    var options = opt_options ? opt_options : {};
    this.srcInfo = options.srcInfo !== undefined ? options.srcInfo : null; //源图层URL
    //圆点坐标，string：x,y
    this.center = options.center !== undefined ? options.center : null; //圆点坐标，string：x,y
    //半径长度float
    this.radius = options.radius !== undefined ? options.radius : null; //半径长度float
    this.step = options.step !== undefined ? options.step : 0.001; //离散化步长
    Zondy.Service.ClipBase.call(this, options);
    this.flowID = "600229";
};
ol.inherits(Zondy.Service.ClipByCircle, Zondy.Service.ClipBase);

goog.provide('Zondy.Service.ClipByPolygon');
goog.require('Zondy.Service.ClipBase');

/**
* @api stable
*/
Zondy.Service.ClipByPolygon = function (opt_options) {
    var options = opt_options ? opt_options : {};
    //源简单要素类的URL
    this.srcInfo = options.srcInfo !== undefined ? options.srcInfo : null; //源图层URL
    //strPos为STRING格式，内容是多边形几个点坐标：x1,y1,x2,y2....
    this.strPos = options.strPos !== undefined ? options.strPos : null; //多边形点坐标串。strPos为STRING格式，内容是多边形几个点坐标：x1,y1,x2,y2....
    Zondy.Service.ClipBase.call(this, options);
    this.flowID = "600228";
};
ol.inherits(Zondy.Service.ClipByPolygon, Zondy.Service.ClipBase);
goog.provide('Zondy.Service.ClipByLayer');
goog.require('Zondy.Service.ClipBase');

/**
* @api stable
* 图层裁剪类
*/
Zondy.Service.ClipByLayer = function (opt_options) {
    var options = opt_options ? opt_options : {};
    //源简单要素类的URL
    this.srcInfo1 = options.srcInfo1 !== undefined ? options.srcInfo1 : null; //源简单要素类的URL
    //裁剪框简单要素类的URL
    this.srcInfo2 = options.srcInfo2 !== undefined ? options.srcInfo2 : null; //裁剪框简单要素类的URL
    Zondy.Service.ClipBase.call(this, options);
    this.flowID = "600230";
};
ol.inherits(Zondy.Service.ClipByLayer, Zondy.Service.ClipBase);

goog.provide('Zondy.Service.OverlayBase');
goog.require('Zondy.Service.AnalysisBase');


/**
* @api stable
*/
Zondy.Service.OverlayBase = function (opt_options) {
    var options = opt_options ? opt_options : {};
    //被叠加简单要素类的信息
    this.srcInfo1 = options.srcInfo1 !== undefined ? options.srcInfo1 : null;
    //结果简单要素类信息
    this.desInfo = options.desInfo !== undefined ? options.desInfo : null;
    //是否进行属性操作
    this.attOptType = options.attOptType !== undefined ? options.attOptType : 1;
    //共有部分的图形参数操作
    this.infoOptType = options.infoOptType !== undefined ? options.infoOptType : 1;
    //叠加类型
    this.overType = options.overType !== undefined ? options.overType : 3;
    //是否结点平差
    this.isCleanNode = options.isCleanNode !== undefined ? options.isCleanNode : false;
    //是否裁剪label点
    this.isLabelPnt = options.isLabelPnt !== undefined ? options.isLabelPnt : false;
    //是否检查区的合法性
    this.isValidReg = options.isValidReg !== undefined ? options.isValidReg : false;
    //是否重算面积
    this.isReCalculate = options.isReCalculate !== undefined ? options.isReCalculate : true;
    //容差半径
    this.radius = options.radius !== undefined ? options.radius : 0.001;
    Zondy.Service.AnalysisBase.call(this, options);
    ol.obj.assign(this, options);
};
ol.inherits(Zondy.Service.OverlayBase, Zondy.Service.AnalysisBase);

goog.provide('Zondy.Service.OverlayByLayer');
goog.require('Zondy.Service.OverlayBase');


/**
* @api stable
*/
Zondy.Service.OverlayByLayer = function (opt_options) {
    var options = opt_options ? opt_options : {};
    this.srcInfo2 = options.srcInfo2 !== undefined ? options.srcInfo2 : null;
    Zondy.Service.OverlayBase.call(this, options);
    this.flowID = "600227";
};
ol.inherits(Zondy.Service.OverlayByLayer, Zondy.Service.OverlayBase);

goog.provide('Zondy.Service.OverlayByPolygon');

goog.require('Zondy.Service.OverlayBase');

/**
* @api stable
* 叠加分析类
*/
Zondy.Service.OverlayByPolygon = function (opt_options) {
    var options = opt_options ? opt_options : {};
    //Zondy.Object.GRegion的json或者xml序列化形式
    this.strGRegionXML = options.strGRegionXML !== undefined ? options.strGRegionXML : null;
    this.inFormat = options.inFormat !== undefined ? options.inFormat : "json";
    Zondy.Service.OverlayBase.call(this, options);
    this.flowID = "600237";
};
ol.inherits(Zondy.Service.OverlayByPolygon, Zondy.Service.OverlayBase);

goog.provide('Zondy.Service.NetAnalysis');
goog.require('Zondy.Service.AnalysisBase');

/**
* @api stable
* 路径分析类
*/
Zondy.Service.NetAnalysis = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.AnalysisBase.call(this, options);

    /// <summary>网络类URL{String}</summary>
    this.netClsUrl = options.netClsUrl !== undefined ? options.netClsUrl : null;

    /// <summary>网标序列，包括点上网标、线上网标{String}</summary>
    this.flagPosStr = options.flagPosStr !== undefined ? options.flagPosStr : null;

    /// <summary>障碍序列，包括点上障碍、线上障碍{String}</summary>
    this.barrierPosStr = options.barrierPosStr !== undefined ? options.barrierPosStr : null;

    /// <summary>分析类型{Zondy.Enum.Net.NetAnalyType}</summary>
    this.analyType = options.analyType !== undefined ? options.analyType : Zondy.Enum.Net.NetAnalyType.UserMode;

    /// <summary>权值字段名序列{String}</summary>
    this.weight = options.weight !== undefined ? options.weight : ",Weight1,Weight1";

    /// <summary>网络元素类型{Zondy.Enum.Net.NetElemType}</summary>
    this.elementType = options.elementType !== undefined ? options.elementType : Zondy.Enum.Net.NetElemType.Edge;

    /// <summary>网络元素搜索半径{Double}</summary>
    this.nearDis = options.nearDis !== undefined ? options.nearDis : 0.001;

    /// <summary>分析结果输出格式, json（默认值）|xml {String}</summary>
    this.outFormat = options.outFormat !== undefined ? options.outFormat : "json";

    ol.obj.assign(this, options);

    /// <summary>工作流ID{String}</summary>
    this.flowID = "600233";
};
ol.inherits(Zondy.Service.NetAnalysis, Zondy.Service.AnalysisBase);




/*----------------------------------------------Zondy.Object.Theme(start)--------------------------------------------------------*/
/***************************专题图枚举类型******************************************/

/// <summary>未参与分类数据图形参数</summary>
goog.provide('Zondy.Object.Theme.CAllOtherDataItemInfoSource');
Zondy.Object.Theme.CAllOtherDataItemInfoSource = {
    /// <summary>
    /// 缺省的专题图形信息
    /// </summary> 
    DefaultThemeInfo: 1,
    /// <summary>
    /// 数据项的固有图形信息
    /// </summary>
    DataItemIntrinsicInfo: 2
};

/// <summary>统计图类型</summary>
goog.provide('Zondy.Object.Theme.CChartType');
Zondy.Object.Theme.CChartType = {
    /// <summary>
    /// 未知类型
    /// </summary>
    Unknown: 0,
    /// <summary>
    /// 直方图
    /// </summary>
    Bar: 1,
    /// <summary>
    /// 3D直方图
    /// </summary>
    Bar3D: 2,
    /// <summary>
    /// 饼图
    /// </summary>
    Pie: 3,
    /// <summary>
    /// 3D饼图
    /// </summary>
    Pie3D: 4,
    /// <summary>
    /// 折线图
    /// </summary>
    Line: 5,
    /// <summary>
    /// 3D折线图
    /// </summary>
    Line3D: 6,
    /// <summary>
    /// 散点图
    /// </summary>
    Point: 7
};

/// <summary>统计图标注格式</summary>
goog.provide('Zondy.Object.Theme.CChartLabelFormat');
Zondy.Object.Theme.CChartLabelFormat = {
    /// <summary>
    /// 未知类型
    /// </summary>
    Unknown: 0,
    /// <summary>
    /// 实际值
    /// </summary>
    Value: 1,
    /// <summary>
    /// 百分比
    /// </summary>
    Percent: 2
};


/***************************专题图文件信息对象类**********************************/

goog.provide('Zondy.Object.Theme.FolderInfo');

//n:{string}
//att:{FolderInfoAttribute}
Zondy.Object.Theme.FolderInfo = function (n, att) {
    this.name = n !== undefined ? n : null;
    this.attribute = att !== undefined ? att : null;
};

goog.provide('Zondy.Object.Theme.FolderInfoAttribute');

//n:{string}
//v:{string}
Zondy.Object.Theme.FolderInfoAttribute = function (n, v) {
    this.name = n !== undefined ? n : null;
    this.Value = v !== undefined ? v : null;
};

/**********************************************************************************/

/***************************专题图对象类*******************************************/

/// <summary>
/// 专题图结构信息对象
/// </summary>
goog.provide('Zondy.Object.Theme.ThemesInfo');

/// <summary>专题图结构信息对象构造函数</summary>
/// <param name="layerIndexArr" type="Int in an Arry">图层索引数组</param>
/// <param name="themeArr" type="Zondy.Object.Theme.CTheme In an Arry">专题图数组</param>
Zondy.Object.Theme.ThemesInfo = function (LayerName, themeArr) {
    this.LayerName = LayerName !== undefined ? LayerName : null;
    this.ThemeArr = themeArr !== undefined ? themeArr : null;
};


/// <summary>
/// 专题图对象（基类）
/// </summary>
goog.provide('Zondy.Object.Theme.CTheme');
/// <summary>专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CTheme = function () {
    /// <summary>
    /// 专题图名称{string}
    /// </summary>
    this.Name = null;

    /// <summary>
    /// 是否为单值专题图{bool}
    /// </summary>
    this.IsBaseTheme = true;

    /// <summary>
    /// 专题图是否可见{bool}
    /// </summary>
    this.Visible = true;
};

/// <summary>
/// 统一配置专题图
/// </summary>
goog.provide('Zondy.Object.Theme.CSimpleTheme');
/// <summary>统一配置专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CSimpleTheme = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    /// <summary>
    /// 缺省专题绘制信息{Zondy.Object.Theme.CThemeInfo}
    /// </summary>
    this.ThemeInfo = (options.ThemeInfo !== undefined) ? options.ThemeInfo : new Zondy.Object.Theme.CThemeInfo();

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CSimpleTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CSimpleTheme, Zondy.Object.Theme.CTheme);

/// <summary>
/// 单值专题图
/// </summary>
goog.provide('Zondy.Object.Theme.CUniqueTheme');
/// <summary>单值专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CUniqueTheme = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 缺省专题绘制信息{Zondy.Object.Theme.CThemeInfo}
    /// </summary>
    this.DefaultInfo = (options.DefaultInfo !== undefined) ? options.DefaultInfo : null;

    /// <summary>
    /// 唯一字段表达式 类型{string}
    /// </summary>
    this.Expression = (options.Expression !== undefined) ? options.Expression : "";

    /// <summary>
    /// 专题绘制信息（如果不设置则采用默认绘制信息）{Zondy.Object.Theme.CUniqueThemeInfo[]} 
    /// </summary>
    this.UniqueThemeInfoArr = (options.UniqueThemeInfoArr !== undefined) ? options.UniqueThemeInfoArr : null;

    /// <summary>
    /// 专题绘制的图形类型，Reg/Lin/Pnt{string}
    /// </summary>
    this.GeoInfoType = (options.GeoInfoType !== undefined) ? options.GeoInfoType : null;

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CUniqueTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CUniqueTheme, Zondy.Object.Theme.CTheme);

/// <summary>
/// 分段专题图（单字段分段）
/// </summary>
goog.provide('Zondy.Object.Theme.CRangeTheme');
/// <summary>分段专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CRangeTheme = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 未参与分类数据图形参数{Zondy.Object.Theme.CAllOtherDataItemInfoSource}
    /// 默认值为缺省的专题图形信息
    /// </summary>
    this.AllOtherDataItemInfoSource = (options.AllOtherDataItemInfoSource !== undefined) ? options.AllOtherDataItemInfoSource : Zondy.Object.Theme.CAllOtherDataItemInfoSource.DefaultThemeInfo;

    /// <summary>
    /// 唯一字段表达式
    /// </summary>
    this.Expression = (options.Expression !== undefined) ? options.Expression : "";

    /// <summary>
    /// 缺省专题绘制信息{Zondy.Object.Theme.CThemeInfo}
    /// </summary>
    this.DefaultInfo = (options.DefaultInfo !== undefined) ? options.DefaultInfo : null;

    /// <summary>
    /// 范围专题图项信息数组{Zondy.Object.Theme.CRangeThemeInfo[]}
    /// </summary>
    this.RangeThemeInfoArr = (options.RangeThemeInfoArr !== undefined) ? options.RangeThemeInfoArr : null;

    /// <summary>
    /// 专题绘制的图形类型，Reg/Lin/Pnt{string}
    /// </summary>
    this.GeoInfoType = (options.GeoInfoType !== undefined) ? options.GeoInfoType : null;

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CRangeTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CRangeTheme, Zondy.Object.Theme.CTheme);

/// <summary>
/// 分段专题图（多字段）
/// </summary>
goog.provide('Zondy.Object.Theme.CMultiClassTheme');

/// <summary>分段专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CMultiClassTheme = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 缺省专题绘制信息{Zondy.Object.Theme.CThemeInfo}
    /// </summary>
    this.DefaultInfo = (options.DefaultInfo !== undefined) ? options.DefaultInfo : null;

    /// <summary>
    /// 分段信息{Zondy.Object.Theme.ExpInfo[]}
    /// </summary>
    this.ExpInfoArr = (options.ExpInfoArr !== undefined) ? options.ExpInfoArr : null;

    /// <summary>
    /// （笛卡尔积之后）每段专题绘制信息（如果不设置则采用默认绘制信息）{Zondy.Object.Theme.CThemeInfo[]}
    /// </summary>
    this.MultiClassThemeInfoArr = (options.MultiClassThemeInfoArr !== undefined) ? options.MultiClassThemeInfoArr : null;

    /// <summary>
    /// 专题绘制的图形类型，Reg/Lin/Pnt{string}
    /// </summary>
    this.GeoInfoType = (options.GeoInfoType !== undefined) ? options.GeoInfoType : null;

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CMultiClassTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CMultiClassTheme, Zondy.Object.Theme.CTheme);

/// <summary>
/// 随机专题图
/// </summary>
goog.provide('Zondy.Object.Theme.CRandomTheme');

/// <summary随机专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CRandomTheme = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CRandomTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CRandomTheme, Zondy.Object.Theme.CTheme);

/// <summary>
/// 四色专题图
/// </summary>
goog.provide('Zondy.Object.Theme.CFourColorTheme');
/// <summary四色专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CFourColorTheme = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 颜色信息,最长为16,优先选择前4种{int[]}
    /// </summary>
    this.ClrInfo = (options.ClrInfo !== undefined) ? options.ClrInfo : [25, 57, 89, 121];

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CFourColorTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CFourColorTheme, Zondy.Object.Theme.CTheme);

/// <summary>
/// 等级符号专题图
/// </summary>
goog.provide('Zondy.Object.Theme.CGraduatedSymbolTheme');
/// <summary等级符号专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CGraduatedSymbolTheme = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 一定大小的符号代表的属性值{float}
    /// </summary>
    this.BaseValue = (options.BaseValue !== undefined) ? options.BaseValue : 0.000141;

    /// <summary>
    /// 是否显示负值{bool}
    /// </summary>
    this.DispMinus = (options.DispMinus !== undefined) ? options.DispMinus : false;

    /// <summary>
    /// 是否显示零值{bool}
    /// </summary>
    this.DispZero = (options.DispZero !== undefined) ? options.DispZero : false;

    /// <summary>
    /// 字段表达式{string}
    /// </summary>
    this.Expression = (options.Expression !== undefined) ? options.Expression : null;

    /// <summary>
    /// 负值点图形信息{CPntInfo}
    /// </summary> 
    this.MinusPntInfo = (options.MinusPntInfo !== undefined) ? options.MinusPntInfo : null;

    /// <summary>
    /// 正值点图形信息{CPntInfo}
    /// </summary>
    this.PlusPntInfo = (options.PlusPntInfo !== undefined) ? options.PlusPntInfo : null;

    /// <summary>
    /// 零值点图形信息{CPntInfo}
    /// </summary>
    this.ZeroPntInfo = (options.ZeroPntInfo !== undefined) ? options.ZeroPntInfo : null;

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CGraduatedSymbolTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CGraduatedSymbolTheme, Zondy.Object.Theme.CTheme);

/// <summary>
/// 点密度专题图
/// </summary>
goog.provide('Zondy.Object.Theme.CDotDensityTheme');
/// <summary点密度专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CDotDensityTheme = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 字段表达式{string}
    /// </summary>
    this.Expression = (options.Expression !== undefined) ? options.Expression : "";

    /// <summary>
    /// 点图形信息{Zondy.Object.Theme.CPntInfo}
    /// </summary>
    this.Info = (options.Info !== undefined) ? options.Info : null;

    /// <summary>
    /// 专题图中每一个点所代表的数值{double}
    /// </summary>
    this.Value = (options.Value !== undefined) ? options.Value : null;

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CDotDensityTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CDotDensityTheme, Zondy.Object.Theme.CTheme);

/// <summary>
/// 统计专题图
/// </summary>
goog.provide('Zondy.Object.Theme.CChartTheme');
/// <summary统计专题图对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CChartTheme = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 统计图类型{Zondy.Object.Theme.CChartType}
    /// </summary>
    this.ChartType = (options.ChartType !== undefined) ? options.ChartType : Zondy.Object.Theme.CChartType.Bar;

    /// <summary>
    /// 统计专题图信息{Zondy.Object.Theme.CChartThemeInfo[]}
    /// </summary>
    this.ChartThemeInfoArr = (options.ChartThemeInfoArr !== undefined) ? options.ChartThemeInfoArr : null;

    /// <summary>
    /// 统计图符号参数信息{Zondy.Object.Theme.CChartThemeRepresentInfo}
    /// </summary>
    this.RepresentInfo = (options.RepresentInfo !== undefined) ? options.RepresentInfo : null;

    /// <summary>
    /// 专题图类型{string} 只读属性
    /// </summary>
    this.Type = "CChartTheme";

    Zondy.Object.Theme.CTheme.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CChartTheme, Zondy.Object.Theme.CTheme);

/**********************************************************************************/

/***************************专题图信息对象类***************************************/

/// <summary>
/// 专题图信息
/// </summary>
goog.provide('Zondy.Object.Theme.CThemeInfo');

/// <summary>专题图信息构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CThemeInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 名称{string}
    /// </summary>
    this.Caption = (options.Caption !== undefined) ? options.Caption : null;

    /// <summary>
    /// 可见标志{bool}
    /// </summary>
    this.IsVisible = (options.IsVisible !== undefined) ? options.IsVisible : true;

    /// <summary>
    /// 最大显示比{Float}
    /// </summary>
    this.MaxScale = (options.MaxScale !== undefined) ? parseFloat(options.MaxScale) : 0;

    /// <summary>
    /// 最小显示比{Float}
    /// </summary>
    this.MinScale = (options.MinScale !== undefined) ? parseFloat(options.MinScale) : 0;

    /// <summary>
    /// 区信息{Zondy.Object.Theme.CRegInfo}
    /// </summary>
    this.RegInfo = (options.RegInfo !== undefined) ? options.RegInfo : null;

    /// <summary>
    /// 线信息{Zondy.Object.Theme.CLinInfo}
    /// </summary>
    this.LinInfo = (options.LinInfo !== undefined) ? options.LinInfo : null;

    /// <summary>
    /// 点信息{Zondy.Object.Theme.CPntInfo}
    /// </summary>
    this.PntInfo = (options.PntInfo !== undefined) ? options.PntInfo : null;
};

// <summary>
/// 单值专题图信息
/// </summary>
goog.provide('Zondy.Object.Theme.CUniqueThemeInfo');

/// <summary>单值专题图信息对象构造函数</summary>
/// <param name="value" type="String">单值</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CUniqueThemeInfo = function (value, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.Theme.CThemeInfo.call(this, options);
    this.Value = (value !== undefined) ? value : "";
};
ol.inherits(Zondy.Object.Theme.CUniqueThemeInfo, Zondy.Object.Theme.CThemeInfo);

/// <summary>
/// 分段专题图（单字段）信息
/// </summary>
goog.provide('Zondy.Object.Theme.CRangeThemeInfo');

/// <summary>分段专题图信息对象构造函数</summary>
/// <param name="startValue" type="String">开始值</param>
/// <param name="endValue" type="String">结束值</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CRangeThemeInfo = function (startValue, endValue, opt_options) {
    this.StartValue = (startValue !== undefined) ? startValue : "";
    this.EndValue = (endValue !== undefined) ? endValue : "";

    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.Theme.CThemeInfo.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CRangeThemeInfo, Zondy.Object.Theme.CThemeInfo);

/// <summary>
/// 分段专题图（多字段）表达式信息
/// </summary>
goog.provide('Zondy.Object.Theme.ExpInfo');

/// <summary>分段专题图表达式信息对象构造函数</summary>
/// <param name="expression" type="String">分级字段表达式</param>
/// <param name="itemValueArr" type="Zondy.Object.Theme.ItemValue in an Arry">分段专题图分段值</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.ExpInfo = function (expression, itemValueArr, opt_options) {
    this.Expression = (expression !== undefined) ? expression : "";
    this.ItemValueArr = (itemValueArr !== undefined) ? itemValueArr : null;

    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
};

/// <summary>
/// 分段专题图分段值
/// </summary>
goog.provide('Zondy.Object.Theme.ItemValue');
/// <summary>分段专题图分段值对象构造函数</summary>
/// <param name="startValue" type="String">开始值</param>
/// <param name="endValue" type="String">结束值</param>
/// <param name="classItemType" type="Zondy.Enum.Theme.CItemType">统计分段类型</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.ItemValue = function (startValue, endValue, classItemType, opt_options) {
    this.StartValue = (startValue !== undefined) ? startValue : "";
    this.EndValue = (endValue !== undefined) ? endValue : "";
    this.ClassItemType = (classItemType !== undefined) ? classItemType : Zondy.Enum.Theme.CItemType.RangeTheme;

    var options = (opt_options !== undefined) ? opt_options : {};
    ol.obj.assign(this, options);
};

/// <summary>
/// 统计专题图信息
/// </summary>
goog.provide('Zondy.Object.Theme.CChartThemeInfo');
/// <summary>统计专题图信息对象构造函数</summary>
/// <param name="expression" type="String">字段表达式</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CChartThemeInfo = function (expression, opt_options) {
    this.Expression = (expression !== undefined) ? expression : "";

    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.Object.Theme.CThemeInfo.call(this, options);
};
ol.inherits(Zondy.Object.Theme.CChartThemeInfo, Zondy.Object.Theme.CThemeInfo);

/// <summary>
/// 统计图符号参数信息
/// </summary>
goog.provide('Zondy.Object.Theme.CChartThemeRepresentInfo');
/// <summary>统计图符号参数信息对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CChartThemeRepresentInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 统计值作为注记的表现信息{Zondy.Object.Theme.CAnnInfo}
    /// </summary>
    this.AnnInfoLabel = (options.AnnInfoLabel !== undefined) ? options.AnnInfoLabel : new Zondy.Object.Theme.CAnnInfo();

    /// <summary>
    /// 统计值小数点位置{int}
    /// </summary>
    this.DigitLabel = (options.DigitLabel !== undefined) ? options.DigitLabel : 0;

    /// <summary>
    /// 统计值类型{Zondy.Object.Theme.CChartLabelFormat}
    /// </summary>
    this.FormatLabel = (options.FormatLabel !== undefined) ? options.FormatLabel : Zondy.Object.Theme.CChartLabelFormat.Unknown;

    /// <summary>
    /// 是否显示统计值{bool}
    /// </summary>
    this.IsDrawLabel = (options.IsDrawLabel !== undefined) ? options.IsDrawLabel : true;

    /// <summary>
    /// 线颜色值{int}
    /// </summary>
    this.LineColor = (options.LineColor !== undefined) ? options.LineColor : -1;

    /// <summary>
    /// 统计图标最大长度{double}
    /// </summary>
    this.MaxLength = (options.MaxLength !== undefined) ? options.MaxLength : 30;

    /// <summary>
    /// 统计图标最小半径{double}
    /// </summary>
    this.MinRadius = (options.MinRadius !== undefined) ? options.MinRadius : 10;

    /// <summary>
    /// 统计图标大小是否固定{int}
    /// </summary>
    this.PieSizeFixFlag = (options.PieSizeFixFlag !== undefined) ? options.PieSizeFixFlag : 0;

    /// <summary>
    /// 统计图标倾斜角度{double}
    /// </summary>
    this.PieTiltedAngle = (options.PieTiltedAngle !== undefined) ? options.PieTiltedAngle : 30;

    /// <summary>
    /// 统计图标半径{double}
    /// </summary>
    this.PlotRadius = (options.PlotRadius !== undefined) ? options.PlotRadius : 1;

    /// <summary>
    /// 统计图标厚度{double}
    /// </summary>
    this.ThickPersent = (options.ThickPersent !== undefined) ? options.ThickPersent : 10;

    /// <summary>
    /// 统计图标宽度{double}
    /// </summary>
    this.Width = (options.Width !== undefined) ? options.Width : 3;

    ol.obj.assign(this, options);
};

/// <summary>
/// 点图形参数对象
/// </summary>
goog.provide('Zondy.Object.Theme.CPntInfo');
/// <summary>点图形参数对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CPntInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 库ID{int}
    /// </summary>
    this.LibID = (options.LibID !== undefined) ? options.LibID : 0;

    /// <summary>
    /// 覆盖方式,true/false 覆盖/透明{bool}
    /// </summary>
    this.Ovprnt = (options.Ovprnt !== undefined) ? options.Ovprnt : false;

    /// <summary>
    /// 角度{float}
    /// </summary>
    this.Angle = (options.Angle !== undefined) ? options.Angle : 0;

    /// <summary>
    /// 背景颜色{int}
    /// </summary>
    this.BackClr = (options.BackClr !== undefined) ? options.BackClr : 0;

    /// <summary>
    /// 范围扩展{float}
    /// </summary>
    this.BackExp = (options.BackExp !== undefined) ? options.BackExp : 0;

    /// <summary>
    /// 自动压背景颜色标志{int}
    /// </summary>
    this.FillFlg = (options.FillFlg !== undefined) ? options.FillFlg : 0;

    /// <summary>
    /// 高度{float}
    /// </summary>
    this.Height = (options.Height !== undefined) ? options.Height : 0;

    /// <summary>
    /// 宽度{float}
    /// </summary>
    this.Width = (options.Width !== undefined) ? options.Width : 0;

    /// <summary>
    /// 可变颜色,数组长度为3{int[]}
    /// </summary>
    this.OutClr = (options.OutClr !== undefined) ? options.OutClr : [0, 0, 0];

    /// <summary>
    /// 符号编号{int}
    /// </summary>
    this.SymID = (options.SymID !== undefined) ? options.SymID : 0;

    /// <summary>
    /// 外部笔宽,数组长度为3{float[]}
    /// </summary>
    this.OutPenW = (options.OutPenW !== undefined) ? options.OutPenW : [0.05, 0.05, 0.05];

    ol.obj.assign(this, options);
};

/// <summary>
/// 线图形参数对象
/// </summary>
goog.provide('Zondy.Object.Theme.CLinInfo');
/// <summary>线图形参数对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CLinInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 库ID{int}
    /// </summary>
    this.LibID = (options.LibID !== undefined) ? options.LibID : 0;

    /// <summary>
    /// 覆盖方式,true/false 覆盖/透明{bool}
    /// </summary>
    this.Ovprnt = (options.Ovprnt !== undefined) ? options.Ovprnt : false;

    /// <summary>
    /// 线型调整方法{Zondy.Enum.Theme.CLinAdjustType}
    /// </summary>
    this.AdjustFlg = (options.AdjustFlg !== undefined) ? options.AdjustFlg : Zondy.Enum.Theme.CLinAdjustType.Adjust;

    /// <summary>
    /// 线头类型{Zondy.Enum.Theme.CLinHeadType}
    /// </summary>
    this.HeadType = (options.HeadType !== undefined) ? options.HeadType : Zondy.Enum.Theme.CLinHeadType.Round;

    /// <summary>
    /// 拐角类型{Zondy.Enum.Theme.CLinJointType}
    /// </summary>
    this.JointType = (options.JointType !== undefined) ? options.JointType : Zondy.Enum.Theme.CLinJointType.Round;

    /// <summary>
    /// 线型号{int}
    /// </summary>
    this.LinStyID = (options.LinStyID !== undefined) ? options.LinStyID : 0;

    /// <summary>
    /// 线型生成方法{Zondy.Enum.Theme.CLinStyleMakeType}
    /// </summary>
    this.MakeMethod = (options.MakeMethod !== undefined) ? options.MakeMethod : Zondy.Enum.Theme.CLinStyleMakeType.Byrule;

    /// <summary>
    /// 可变颜色,数组长度为3{int[]}
    /// </summary>
    this.OutClr = (options.OutClr !== undefined) ? options.OutClr : [46, 4, 3];

    /// <summary>
    /// X系数{float}
    /// </summary>
    this.XScale = (options.XScale !== undefined) ? options.XScale : 10;

    /// <summary>
    /// Y系数{float}
    /// </summary>
    this.YScale = (options.YScale !== undefined) ? options.YScale : 10;

    /// <summary>
    /// 外部笔宽,数组长度为3{float[]}
    /// </summary>
    this.OutPenW = (options.OutPenW !== undefined) ? options.OutPenW : [0.05, 0.05, 0.05];

    ol.obj.assign(this, options);
};

/// <summary>
/// 区图形参数对象
/// </summary>
goog.provide('Zondy.Object.Theme.CRegInfo');
/// <summary>区图形参数对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CRegInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 库ID{int}
    /// </summary>
    this.LibID = (options.LibID !== undefined) ? options.LibID : 0;

    /// <summary>
    /// 覆盖方式,true/false 覆盖/透明{bool}
    /// </summary>
    this.Ovprnt = (options.Ovprnt !== undefined) ? options.Ovprnt : false;

    /// <summary>
    /// 图案角度{float}
    /// </summary>
    this.Angle = (options.Angle !== undefined) ? options.Angle : 0.0;

    /// <summary>
    /// 结束填充色{int}
    /// </summary>
    this.EndClr = (options.EndClr !== undefined) ? options.EndClr : 0;

    /// <summary>
    /// 区域填充色{int}
    /// </summary>
    this.FillClr = (options.FillClr !== undefined) ? options.FillClr : 46;

    /// <summary>
    /// 填充模式{int}
    /// </summary>
    this.FillMode = (options.FillMode !== undefined) ? options.FillMode : 0;

    /// <summary>
    /// 是否需要完整图案填充{bool}
    /// </summary>
    this.FullPatFlg = (options.FullPatFlg !== undefined) ? options.FullPatFlg : true;

    /// <summary>
    /// 图案颜色{int}
    /// </summary>
    this.PatClr = (options.PatClr !== undefined) ? options.PatClr : 3;

    /// <summary>
    /// 图案高{int}
    /// </summary>
    this.PatHeight = (options.PatHeight !== undefined) ? options.PatHeight : 5;

    /// <summary>
    /// 图案编号{int}
    /// </summary>
    this.PatID = (options.PatID !== undefined) ? options.PatID : 0;

    /// <summary>
    /// 图案宽{float}
    /// </summary>
    this.PatWidth = (options.PatWidth !== undefined) ? options.PatWidth : 5;

    /// <summary>
    /// 图案笔宽{float}
    /// </summary>
    this.OutPenW = (options.OutPenW !== undefined) ? options.OutPenW : 1.0;

    ol.obj.assign(this, options);
};

/// <summary>
/// 注记图形参数对象
/// </summary>
goog.provide('Zondy.Object.Theme.CAnnInfo');
/// <summary>注记图形参数对象构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.Theme.CAnnInfo = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};

    /// <summary>
    /// 库ID{int}
    /// </summary>
    //[DataMember(Name = "libID")]
    this.LibID = (options.LibID !== undefined) ? options.LibID : 0;

    /// <summary>
    /// 覆盖方式,true/false 覆盖/透明{bool}
    /// </summary>
    //[DataMember(Name = "ovprnt")]
    this.Ovprnt = (options.Ovprnt !== undefined) ? options.Ovprnt : false;

    /// <summary>
    /// 角度值{float}
    /// </summary>
    this.Angle = (options.Ovprnt !== undefined) ? options.Ovprnt : 0;

    /// <summary>
    /// 背景颜色{int}
    /// </summary>
    this.BackClr = (options.BackClr !== undefined) ? options.BackClr : 0;

    /// <summary>
    /// 文本显示范围扩展,返回扩展值{int}
    /// </summary>     
    this.BackExp = (options.BackExp !== undefined) ? options.BackExp : 0;

    /// <summary>
    /// 西文字体{int}
    /// </summary>
    this.Chnt = (options.Chnt !== undefined) ? options.Chnt : 0;

    /// <summary>
    /// 颜色号{int}
    /// </summary>
    this.Color = (options.Color !== undefined) ? options.Color : 0;

    /// <summary>
    /// 字符角度值{float}
    /// </summary>
    this.FontAngle = (options.FontAngle !== undefined) ? options.FontAngle : 0;

    /// <summary>
    /// 高度{float}
    /// </summary>
    this.Height = (options.Height !== undefined) ? options.Height : 0;

    /// <summary>
    /// 中文字体{float}
    /// </summary>
    this.Ifnt = (options.Ifnt !== undefined) ? options.Ifnt : 0;

    /// <summary>
    /// 字形{int}
    /// </summary>
    this.Ifnx = (options.Ifnx !== undefined) ? options.Ifnx : 0;

    /// <summary>
    /// 自动压背景颜色返回true，否则返回false{bool}
    /// </summary>
    this.IsFilled = (options.IsFilled !== undefined) ? options.IsFilled : false;

    /// <summary>
    /// 排列方式,水平排列返回true，垂直排列返回false{bool}
    /// </summary>
    this.IsHzpl = (options.IsHzpl !== undefined) ? options.IsHzpl : true;

    /// <summary>
    /// X方向的偏移{float}
    /// </summary>
    this.OffsetX = (options.OffsetX !== undefined) ? options.OffsetX : 0;

    /// <summary>
    /// Y方向的偏移{float}
    /// </summary>
    this.OffsetY = (options.OffsetY !== undefined) ? options.OffsetY : 0;

    /// <summary>
    /// 间隔值{float}
    /// </summary>
    this.Space = (options.Space !== undefined) ? options.Space : 0;

    /// <summary>
    /// 宽度{float}
    /// </summary>
    this.Width = (options.Width !== undefined) ? options.Width : 0;

    ol.obj.assign(this, options);
};

/**********************************************************************************/

/*----------------------------------------------Zondy.Object.Theme(end)----------------------------------------------------------*/

/*----------------------------------------------Zondy.Service.ThemeOper(start)-------------------------------------------------------*/

/**
* 专题图服务
*/
goog.provide('Zondy.Service.ThemeOper');

/// <summary>专题图服务类构造函数</summary>
/// <param name="opt_guid" type="String">地图文档唯一标识</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.ThemeOper = function (opt_guid, opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    /// <summary>服务器地址{String}</summary>
    this.ip = options.ip !== undefined ? options.ip : "localhost";

    /// <summary>服务器端口{String}</summary>
    this.port = options.port !== undefined ? options.port : "6163";

    /// <summary>客户端标识，用以服务器缓存地图{String}</summary>
    if (opt_guid != null)
        this.guid = opt_guid;
    else
        this.guid = Zondy.Util.newGuid();
};

/*
* 获取专题图信息
* mapDocName ：地图文档名称
* idxArr：专题图索引数组(索引从0开始,例如："0,1,2")
* onSuccess(themesInfoArr) : 获取成功回调方法
*/
Zondy.Service.ThemeOper.prototype.getThemesInfo = function (mapDocName, idxArr, onSuccess) {
    var rand = Math.random();
    var url = "http://" + this.ip + ":" + this.port + "/igs/rest/theme/" + mapDocName + "/get?idxArr=" + idxArr + "&r=" + rand + "&guid=" + this.guid;
    var http = new Zondy.Service.HttpRequest();

    http.ajax(url, null, function (jsonObj, status, xrequest) {
        var folderInfo = new Zondy.Object.Theme.FolderInfo();
        $.extend(true, folderInfo, jsonObj);
        if (folderInfo != null && folderInfo.attribute != null && folderInfo.attribute.length > 0) {
            var themesInfoArr = []; //new ThemesInfo[folderInfo.attribute.Length];
            var attArr;
            for (var i = 0; i < folderInfo.attribute.length; i++) {
                themesInfoArr[i] = new Zondy.Object.Theme.ThemesInfo();
                if (folderInfo.attribute[i] != null) {
                    themesInfoArr[i].LayerName = folderInfo.attribute[i].name;
                    attArr = $.parseJSON(folderInfo.attribute[i].value); //[];
                    //$.extend(true, attArr, folderInfo.attribute[i].Value);
                    if (attArr != null && attArr.length > 0) {
                        themesInfoArr[i].ThemeArr = []; //new ThemeBase[attArr.Length];
                        for (var j = 0; j < attArr.length; j++) {
                            switch (attArr[j].name) {
                                case "CMultiClassTheme": //多表达式（多分段）专题图
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CMultiClassTheme();
                                    break;
                                case "CSimpleTheme": //简单专题图
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CSimpleTheme();
                                    break;
                                case "CChartTheme": //统计专题图
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CChartTheme();
                                    break;
                                case "CGraduatedSymbolTheme": //等级符号专题图
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CGraduatedSymbolTheme();
                                    break;
                                case "CDotDensityTheme": ////点密度专题图
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CDotDensityTheme();
                                    break;
                                case "CRandomTheme": //随机专题图
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CRandomTheme();
                                    break;
                                case "CFourColorTheme": //四色专题图
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CFourColorTheme();
                                    break;
                                case "CUniqueTheme": //唯一值专题图
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CUniqueTheme();
                                    break;
                                case "CRangeTheme": //范围专题图（分段专题图）
                                    themesInfoArr[i].ThemeArr[j] = new Zondy.Object.Theme.CRangeTheme();
                                    break;
                            }
                            $.extend(true, themesInfoArr[i].ThemeArr[j], $.parseJSON(attArr[j].value));
                        }
                    }
                }
            }
        }
        if (onSuccess != null)
            onSuccess(themesInfoArr);
    }, "Get");

};

/*
* 删除专题图信息
* mapDocName ：地图文档名称
* idxArr：专题图索引数组(索引从0开始,例如："0,1,2")
* onSuccess(themesInfoArr) : 获取成功回调方法
*/
Zondy.Service.ThemeOper.prototype.removeThemesInfo = function (mapDocName, idxArr, onSuccess) {
    var rand = Math.random();
    var url = "http://" + this.ip + ":" + this.port + "/igs/rest/theme/" + mapDocName + "/remove?idxArr=" + idxArr + "&r=" + rand + "&guid=" + this.guid;
    var http = new Zondy.Service.HttpRequest();

    http.ajax(url, null, function (jsonObj, status, xrequest) {
        if (onSuccess != null) {
            onSuccess(jsonObj);
        }
    }, "Get");
};

/*
* 更新专题图信息
* mapDocName ：地图文档名称
* idxArr：专题图索引数组(索引从0开始,例如："0,1,2")
* themesInfoArr: 更新的数据(ThemesInfo[])
* onSuccess(themesInfoArr) : 获取成功回调方法
*/
Zondy.Service.ThemeOper.prototype.updateThemesInfo = function (mapDocName, idxArr, themesInfoArr, onSuccess) {
    var url = "http://" + this.ip + ":" + this.port + "/igs/rest/theme/" + mapDocName + "/update?idxArr=" + idxArr + "&guid=" + this.guid;
    var http = new Zondy.Service.HttpRequest();

    var jsStr = null;
    if (themesInfoArr != null && themesInfoArr.length > 0) {
        var folderInfo = new Zondy.Object.Theme.FolderInfo();
        folderInfo.name = "ThemeInfo";
        folderInfo.attribute = []; //new FolderInfoAttribute[themesInfoArr.Length];
        for (var i = 0; i < themesInfoArr.length; i++) {
            folderInfo.attribute[i] = new Zondy.Object.Theme.FolderInfoAttribute();
            folderInfo.attribute[i].name = themesInfoArr[i].LayerName;
            if (themesInfoArr[i].ThemeArr != null && themesInfoArr[i].ThemeArr.length > 0) {
                var res = []; //new FolderInfoAttribute[themesInfoArr[i].ThemeArr.Length];
                for (var j = 0; j < themesInfoArr[i].ThemeArr.length; j++) {
                    if (themesInfoArr[i].ThemeArr[j] != null)
                        res[j] = new Zondy.Object.Theme.FolderInfoAttribute(themesInfoArr[i].ThemeArr[j].Type, $.toJSON(themesInfoArr[i].ThemeArr[j]));
                }
                folderInfo.attribute[i].value = $.toJSON(res);
            }
        }
        jsStr = $.toJSON(folderInfo);
    }
    if (jsStr != null) {
        http.ajax(url, jsStr, function (jsonObj, status, xrequest) {
            if (onSuccess != null) {
                onSuccess(jsonObj);
            }
        }, "POST", "application/text");
    }
    else {
        onSuccess(false);
    }
};

/*
* 添加专题图信息
* mapDocName ：地图文档名称
* idxArr：专题图索引数组(层次从地图开始，索引从0开始,例如："0/0,1/1,2/2")
* themesInfoArr: 添加的数据(zondy.Object.ThemesInfo[])
* onSuccess(themesInfoArr) : 获取成功回调方法
*/
Zondy.Service.ThemeOper.prototype.addThemesInfo = function (mapDocName, idxArr, themesInfoArr, onSuccess) {
    var url = "http://" + this.ip + ":" + this.port + "/igs/rest/theme/" + mapDocName + "/add?idxArr=" + idxArr + "&guid=" + this.guid;
    var http = new Zondy.Service.HttpRequest();

    var jsStr = "";
    if (themesInfoArr != null && themesInfoArr.length > 0) {
        var folderInfo = new Zondy.Object.Theme.FolderInfo();
        folderInfo.name = "ThemeInfo";
        folderInfo.attribute = [];
        for (var i = 0; i < themesInfoArr.length; i++) {
            folderInfo.attribute[i] = new Zondy.Object.Theme.FolderInfoAttribute();
            folderInfo.attribute[i].name = themesInfoArr[i].LayerName;
            if (themesInfoArr[i].ThemeArr != null && themesInfoArr[i].ThemeArr.length > 0) {
                var res = [];
                for (var j = 0; j < themesInfoArr[i].ThemeArr.length; j++) {
                    if (themesInfoArr[i].ThemeArr[j] != null)
                        res[j] = new Zondy.Object.Theme.FolderInfoAttribute(themesInfoArr[i].ThemeArr[j].Type, $.toJSON(themesInfoArr[i].ThemeArr[j]));
                }
                folderInfo.attribute[i].Value = $.toJSON(res);
            }
        }
        jsStr = $.toJSON(folderInfo);
    }
    if (jsStr != null) {
        http.ajax(url, jsStr, function (jsonObj, status, xrequest) {
            if (onSuccess != null) {
                onSuccess(jsonObj);
            }
        }, "POST", "application/text");


    }
    else {
        onSuccess(false);
    }
};

/*----------------------------------------------Zondy.Service.ThemeOper(end)----------------------------------------------------------*/
/*----------------------------------------------Zondy.Service.MapService(start)--------------------------------------------------*/

/// <summary>
/// 地图服务基类
/// </summary>
goog.provide('Zondy.Service.MapServiceBase');

/// <summary>地图服务基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.MapServiceBase = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.HttpRequest.call(this, options);

    /// <summary>完整的请求地址{string}</summary>
    this.URL = null;

    /// <summary>请求地址前缀{string}</summary>
    this.baseUrl = "igs/rest/mrms";
};
ol.inherits(Zondy.Service.MapServiceBase, Zondy.Service.HttpRequest);

/// <summary>执行Ajax</summary>
Zondy.Service.MapServiceBase.prototype.executeAjax = function (requestType, resultFormat, onSuccess, onError, options) {
    if (this.baseUrl !== undefined && this.partUrl !== undefined) {
        this.ajax(null, null, onSuccess, requestType, null, resultFormat, onError, options);
    }
};

/// <summary>创建完整的请求地址</summary>
Zondy.Service.MapServiceBase.prototype.CreateFullUrl = function () {
    if (this.baseUrl !== undefined && this.partUrl !== undefined) {
        var fullURL = "http://" + this.ip + ":" + this.port + "/" + this.baseUrl + "/" + this.partUrl;
        this.URL = fullURL;
    }
};
/*----------------------------------------------Zondy.Service.MapService(end)--------------------------------------------------*/
//**********************************************************Zondy.Service.GetMapInfoService(start)************************************************//
/// <summary>
/// 地图信息服务
/// </summary>
goog.provide('Zondy.Service.GetMapInfoService');

/// <summary>地图信息服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.GetMapInfoService = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.MapServiceBase.call(this, options);

    /// <summary>地图文档/瓦片地图名称{string}</summary>
    this.mapName = options.mapName !== undefined ? options.mapName : null;

    /// <summary>唯一标识{string}</summary>
    this.guid = options.guid !== undefined ? options.guid : Zondy.Util.newGuid();
    this.token = options.token;
    this.type = options.type;
};
ol.inherits(Zondy.Service.GetMapInfoService, Zondy.Service.MapServiceBase);

/**
* 获取地图文档/瓦片地图信息
*/
Zondy.Service.GetMapInfoService.prototype.GetMapInfo = function (onSuccess, onError, options) {
    if (this.mapName !== undefined) {
        this.partUrl = "info/" + this.mapName;
        var params = [];
        if (this.guid) {
            params.push("guid=" + this.guid);
        }
        if(this.token){
            params.push("token=" + this.token);
        }
        if(this.type){
            params.push("type=" + this.type);
        }
        if(params.length>0){
            this.partUrl += "?" + params.join('&');
        }
        this.executeAjax("GET", "json", onSuccess, onError, options);
    }
};
//**********************************************************Zondy.Service.GetMapInfoService(end)************************************************//
//**********************************************************Zondy.Service.GetMapImageService(start)************************************************//
/// <summary>
/// 地图图片服务
/// </summary>
goog.provide('Zondy.Service.GetMapImageService');

/// <summary>地图图片服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.GetMapImageService = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.MapServiceBase.call(this, options);

    /// <summary>地图名称{String}</summary>
    this.mapName = options.mapName !== undefined ? options.mapName : null;

    /// <summary>地图类型{String}</summary>
    this.mapType = options.mapType !== undefined ? options.mapType : Zondy.Enum.Map.MapType.Doc;

    if (this.dataType == Zondy.Enum.Map.MapType.Tile) {
        /*仅在获取瓦片地图图片时有意义。对于采用“动态裁切瓦片”方式，发布的矢量地图文档同样适用*/

        /// <summary>动态裁图的级数{Int}</summary>
        this.level = options.level !== undefined ? options.level : 0;

        /// <summary>行号{Int}</summary>
        this.row = options.row !== undefined ? options.row : 0;

        /// <summary>列号{Int}</summary>
        this.col = options.col !== undefined ? options.col : 0;
    }
    else {
        /*仅在获取地图文档图片时有意义*/

        /// <summary>图片的格式{string} jpg|png|gif</summary>
        this.picType = options.picType !== undefined ? options.picType : "gif";

        /// <summary>图片的宽度{Float}</summary>
        this.picWidth = options.picWidth !== undefined ? options.picWidth : 512;

        /// <summary>图片的高度{Float}</summary>
        this.picHeight = options.picHeight !== undefined ? options.picHeight : 512;

        /// <summary>矢量图的坐标范围{Float}</summary>
        this.xmin = options.xmin !== undefined ? options.xmin : null;
        this.xmax = options.xmax !== undefined ? options.xmax : null;
        this.ymin = options.ymin !== undefined ? options.ymin : null;
        this.ymax = options.ymax !== undefined ? options.ymax : null;
    }
};
ol.inherits(Zondy.Service.GetMapImageService, Zondy.Service.MapServiceBase);

/**
* 获取地图文档/瓦片地图图片
* return: URL{string} 取图地址
*/
Zondy.Service.GetMapImageService.prototype.GetImage = function () {
    if (this.mapName) {
        if (this.dataType == Zondy.Enum.Map.MapType.Tile) {
            this.partUrl = "map/" + this.mapName + "?"
                         + "lvl=" + this.level
                         + "&row=" + this.row
                         + "&col=" + this.col;
        }
        else {
            this.partUrl = "map/" + this.mapName + "?"
                         + "width=" + this.picWidth
                         + "&height=" + this.picHeight
                         + "&f=" + this.picType;
            if (this.xmin != null && this.xmax != null && this.ymin != null && this.ymax != null) {
                this.partUrl += "&xmin=" + this.xmin
                              + "&ymin=" + this.ymin
                              + "&xmax=" + this.xmax
                              + "&ymax=" + this.ymax;
            }
        }
        this.CreateFullUrl();
        return this.URL;
    }
    return null;
};
//**********************************************************Zondy.Service.GetMapImageService(end)************************************************//
//**********************************************************Zondy.Service.GetDocImageService(end)************************************************//
/// <summary>
/// 地图文档图片服务
/// @取矢量地图文档图片，若采用动态裁切瓦片方式发布的矢量地图文档，
/// @可取指定行列号的矢量地图图片；若采用普通方式发布的矢量地图文档，
/// @可取一定范围内的矢量地图图片，还可设置该地图文档的动态投影参考
/// @信息、显示条件、显示样式等信息
/// </summary>
goog.provide('Zondy.Service.GetDocImageService');

/// <summary>地图文档图片服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.GetDocImageService = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.MapServiceBase.call(this, options);

    /// <summary>地图文档名称{String}</summary>
    this.docName = options.docName !== undefined ? options.docName : null;

    /// <summary>是否使用动态裁图功能{Bool} true|false</summary>
    this.cache = options.cache !== undefined ? options.cache : false;

    if (this.cache = true) {
        /* 以下参数，当cache为true时有效（仅在动态裁图时有意义）*/

        /// <summary>动态裁图的级数{Int}</summary>
        this.level = options.level !== undefined ? options.level : 0;

        /// <summary>行号{Int}</summary>
        this.row = options.row !== undefined ? options.row : 0;

        /// <summary>列号{Int}</summary>
        this.col = options.col !== undefined ? options.col : 0;

        /// <summary>是否更新当前瓦片{Bool} true|false</summary>
        this.update = options.update !== undefined ? options.update : false;
    }
    else {
        /* 以下参数，当cache为true时无效（仅在非动态裁图时有意义）*/

        /// <summary>需要被取图的图层序列号数组{String}
        /// 以","分隔。默认为依据文档原始图层状态进行设置。
        /// show：   仅仅显示指定了图层序号的图层
        /// hide ：  显示除hide参数指定图层外所有的图层
        /// include：除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图层显示，追加的这些图层必须为地图中包含的图层。
        /// exclude: 从默认图层列表里删除这些被指定的图层后，进行显示
        /// </summary>
        this.layers = options.layers !== undefined ? options.layers : null;

        /// <summary>地图文档显示样式{Zondy.Object.CDisplayStyle}///</summary>
        this.style = options.style !== undefined ? options.style : null;

        /// <summary>图片的格式{string} jpg|png|gif</summary>
        this.picType = options.picType !== undefined ? options.picType : "gif";

        /// <summary>图片的范围{string} xmin,ymin,xmax,ymax</summary>
        this.bbox = options.bbox !== undefined ? options.bbox : null;

        /// <summary>图层过滤条件{string} 1:ID>4,3:ID>1</summary>
        this.filters = options.filters !== undefined ? options.filters : null;

        /// <summary>图片的宽度{Float}</summary>
        this.picWidth = options.picWidth !== undefined ? options.picWidth : 512;

        /// <summary>图片的高度{Float}</summary>
        this.picHeight = options.picHeight !== undefined ? options.picHeight : 512;

        /// <summary>投影参照系信息{Zondy.Object.CSRefInfoBySRSID}</summary>
        this.proj = options.proj !== undefined ? options.proj : null;

        /// <summary>唯一标识{string}</summary>
        this.guid = options.guid !== undefined ? options.guid : Zondy.Util.newGuid();
    }
};
ol.inherits(Zondy.Service.GetDocImageService, Zondy.Service.MapServiceBase);

/**
* 获取地图文档图片
* return: URL{string} 取图地址
*/
Zondy.Service.GetDocImageService.prototype.GetMapImage = function () {
    if (this.docName) {
        if (this.cache == true) {
            this.partUrl = "docs/" + this.docName + "?"
                         + "cache=" + this.cache.toString()
                         + "&level=" + this.level
                         + "&row=" + this.row
                         + "&col=" + this.col
                         + "&update=" + this.update.toString();
        }
        else {
            this.partUrl = "docs/" + this.docName + "?"
            if (this.bbox != null) {
                this.partUrl += "bbox=" + this.bbox;
            }
            if (this.picWidth != null) {
                this.partUrl += "&w=" + this.picWidth;
            }
            if (this.picHeight != null) {
                this.partUrl += "&h=" + this.picHeight;
            }
            if (this.layers != null) {
                this.partUrl += "&layers=" + this.layers;
            }
            if (this.filters != null) {
                this.partUrl += "&filters=" + encodeURI(this.filters);
            }
            if (this.style != null) {
                this.partUrl += "&style=" + $.toJSON(this.style);
            }
            if (this.proj != null) {
                this.partUrl += "&proj=" + $.toJSON(this.proj);
            }
            if (this.picType != null) {
                this.partUrl += "&f=" + this.picType;
            }
            if (this.guid != null) {
                this.partUrl += "&guid=" + this.guid;
            }
        }
        this.CreateFullUrl();
        return this.URL;
    }
    return null;
};
//**********************************************************Zondy.Service.GetDocImageService(end)************************************************//
//**********************************************************Zondy.Service.GetLayerImageService(start)************************************************//
/// <summary>
/// 图层图片服务
/// </summary>
goog.provide('Zondy.Service.GetLayerImageService');

/// <summary>图层图片服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.GetLayerImageService = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.MapServiceBase.call(this, options);

    this.gdbps = options.gdbps !== undefined ? options.gdbps : null;

    /// <summary>图片的格式{string} jpg|png|gif</summary>
    this.picType = options.picType !== undefined ? options.picType : "gif";

    /// <summary>图层显示样式{Zondy.Object.CDisplayStyleExtend}</summary>
    this.style = options.style !== undefined ? options.style : null;

    /// <summary>图片的范围{string} xmin,ymin,xmax,ymax</summary>
    this.bbox = options.bbox !== undefined ? options.bbox : null;

    /// <summary>图层过滤条件{string} 1:ID>4,3:ID>1</summary>
    this.filters = options.filters !== undefined ? options.filters : null;

    /// <summary>图片的宽度{Float}</summary>
    this.picWidth = options.picWidth !== undefined ? options.picWidth : 512;

    /// <summary>图片的高度{Float}</summary>
    this.picHeight = options.picHeight !== undefined ? options.picHeight : 512;
};
ol.inherits(Zondy.Service.GetLayerImageService, Zondy.Service.MapServiceBase);

/**
* 获取图层图片
* return: URL{string} 取图地址
*/
Zondy.Service.GetLayerImageService.prototype.GetLayerImage = function () {
    if (this.gdbps != null && this.picWidth != null && this.picHeight != null) {
        this.partUrl = "layers?" + "f=" + this.picType;
        this.partUrl += "&gdbps=";
        this.gdbps.split(',');
        var gdbpsArr = new Array();
        gdbpsArr = this.gdbps.split(",");
        for (i = 0; i < gdbpsArr.length; i++) {
            this.partUrl += encodeURI(gdbpsArr[i]);
            if (i < (gdbpsArr.length - 1)) {
                this.partUrl += ",";
            }
        }
        if (this.style != null) {
            this.partUrl += "&style=" + $.toJSON(this.style);
        }
        if (this.filters != null) {
            this.partUrl += "&filters=" + encodeURI(this.filters);
        }
        if (this.bbox != null) {
            this.partUrl += "&bbox=" + this.bbox;
        }
        this.partUrl += "&w=" + this.picWidth;
        this.partUrl += "&h=" + this.picHeight;

        this.CreateFullUrl();
        return this.URL;
    }
    return null;
};
//**********************************************************Zondy.Service.GetLayerImageService(end)************************************************//
//**********************************************************Zondy.Service.GetTileImageService(start)************************************************//
/// <summary>
/// 瓦片图片服务
/// </summary>
goog.provide('Zondy.Service.GetTileImageService');

/**
* @api stable
*/
Zondy.Service.GetTileImageService = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    Zondy.Service.MapServiceBase.call(this, options);

    /// <summary>地图名称{String}</summary>
    this.hdfName = options.hdfName !== undefined ? options.hdfName : null;

    /// <summary>动态裁图的级数{Int}</summary>
    this.level = options.level !== undefined ? options.level : 0;

    /// <summary>行号{Int}</summary>
    this.row = options.row !== undefined ? options.row : 0;

    /// <summary>列号{Int}</summary>
    this.col = options.col !== undefined ? options.col : 0;
};
ol.inherits(Zondy.Service.GetTileImageService, Zondy.Service.MapServiceBase);

/**
* 获取瓦片地图图片
* return: URL{string} 取图地址
*/
Zondy.Service.GetTileImageService.prototype.GetTileImage = function () {
    if (this.hdfName !== undefined) {
        this.partUrl = "tile/" + this.hdfName + "/" + this.level + "/" + this.row + "/" + this.col;
        this.CreateFullUrl();
        return this.URL;
    }
    return null;
};
//**********************************************************Zondy.Service.GetTileImageService(end)************************************************//
//**********************************************************Zondy.Source.TileLayerSource(start)************************************************//
goog.provide('Zondy.Source.TileLayerSource');

/// <summary>瓦片地图资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Source.TileLayerSource = function (opt_options) {
    var options = opt_options ? opt_options : {};

    this.token = options.token;
    /**
    * @public
    * @type {string}
    * 地图服务请求地址（可通过初始对象的options赋值）
    */
    this.ip = options.ip !== undefined ? options.ip : "127.0.0.1";
    /**
    * @public
    * @type {string}
    * 地图服务请求端口（可通过初始对象的options赋值）
    */
    this.port = options.port !== undefined ? options.port : "6163";
    /**
    * @public
    * @type {string}
    * 地图名称,必须赋值
    */
    this.name = options.name !== undefined ? options.name : null;
    /**
    * @public
    * @type {number}
    * 最大分辨率,新瓦片必须指定
    */
    this.maxResolution = options.maxResolution !== undefined ? options.maxResolution : null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    //瓦片范围
    var tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        tileExtent = tileProjection.getExtent();
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : tileExtent;

    /**
    * @public
    * @type {number}
    * 瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? options.maxZoom : 16;

    /**
    * @public
    * @type {string}
    * 瓦片裁剪方式，是左上还是左下的方式，即是新瓦片裁剪的方式还是旧瓦片
    * 一般无需设置此参数，直接由原点和中心点进行判断，只有在某些特殊的裁剪的瓦片中需要用到
    * 例如若裁剪瓦片时以左下角为原点，方式却是新瓦片的方式则需要设置此参数为newTile
    * 参数：eg：若需要强制以新瓦片的方式进行显示，则赋值为oldTile即可
    */
    //this.tileVersion = options.tileOriginType !== undefined ? options.tileOriginType : "newTile";
    this.tileOriginType = options.tileOriginType !== undefined ? options.tileOriginType : "leftTop";

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    //分辨率数组，根据传入的分辨率或范围计算或者直接传入分辨率数组
    this.resolutions = options.resolutions !== undefined ? options.resolutions : this.getResolutions();

    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,默认左上角
    */
    this.origin = options.origin !== undefined ? options.origin : ol.extent.getCorner(this.extent, ol.extent.Corner.TOP_LEFT);

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.zondyTileGrid = new ol.tilegrid.TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        ip: this.ip,
        port: this.port,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? (options.state) : undefined,
        tileGrid: this.zondyTileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX !== undefined ? options.wrapX : false,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = goog.isDef(options.tileUrlFunction) ? options.tileUrlFunction : this.tileUrlFunctionExtend;
};
ol.inherits(Zondy.Source.TileLayerSource, ol.source.TileImage);

/**
* 创建分辨率数组
*/
Zondy.Source.TileLayerSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol.extent.getWidth(this.extent);
        var height = ol.extent.getHeight(this.extent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
Zondy.Source.TileLayerSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = 'http://' + this.ip + ':' + this.port + '/igs/rest/mrms/tile/' + this.name + '/{z}/{y}/{x}?size=' + this.tileSize;
    if(this.token){
        urlTemplate+="&token=" + this.token;
    }
    var latCenter = (this.extent[3] - this.extent[1]) / 2 + this.extent[1];
    if ((this.tileOriginType.toLowerCase() == "lefttop") || (this.origin[1] >= latCenter)) {
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = -(tileCoord[2] + 1);

    } else {  //按照左下角为原点进行计算
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];

        if (x >= Math.pow(2, z) || y >= Math.pow(2, z)) {
            return;
        }
    }

    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};
//**********************************************************Zondy.Source.TileLayerSource(end)************************************************//

//**********************************************************Zondy.Map.TileLayer(start)************************************************//
goog.provide('Zondy.Map.TileLayer');


/// <summary>显示瓦片地图的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {string} opt_hdfName 要显示的瓦片地图名称.</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.TileLayer = function (opt_name, opt_hdfName, opt_options) {
    var options = opt_options ? opt_options : {};

    ol.obj.assign(options, { 'layerName': opt_name });
    ol.obj.assign(options, { 'name': opt_hdfName });

    this.isAutoConfig = options.isAutoConfig !== undefined && options.isAutoConfig != null ? options.isAutoConfig : true;
    this.cache = false;
    var options_clone = ol.obj.assign({}, options);
    options_clone.maxResolution = Infinity;
    ol.layer.Tile.call(this, (options_clone));

    this.source = options.source !== undefined ? options.source : null;
    this.cache = options.cache !== undefined ? options.cache : false;
    if (this.source == null) {
        //自动配置情况下，通过目录服务获取相关信息后创建source,需把this当做参数传给地图服务

        if (this.isAutoConfig) {
            var mService = new Zondy.Service.GetMapInfoService({ ip: options.ip, port: options.port, mapName: opt_hdfName, layerObj: this, paraObj: options });
            mService.GetMapInfo(function (data) {
                var opt = ol.obj.assign({}, this.paraObj);
                opt.name = data.name;
                opt.extent = [data.xMin, data.yMin, data.xMax, data.yMax];
                opt.tileOriginType = data.originType;
                opt.resolutions = data.resolutions;
                opt.tileSize = data.tileWidth;
                opt.origin = [data.originX, data.originY];
                opt.maxZoom = data.endLevel;

                //if (data.type.toLowerCase() == "dtile") {
                    //this.layerObj.cache = true;
                //}
                if ((data.xMax - data.xMin <= 1e-6) && (data.yMax - data.yMin <= 1e-6)) {
                    alert("获取数据范围失败！");
                    return;
                }
                if (!this.layerObj.cache) {
                    this.layerObj.source = new Zondy.Source.TileLayerSource(opt);
                }
                else {
                    // this.layerObj.source =  new Zondy.Source.TileLayerSource(opt);
                    this.layerObj.source = new Zondy.Source.CacheTileLayerSource(opt);
                }
                this.layerObj.setSource(this.layerObj.source);
            }, function () { alert("请求失败！"); }, null);
        }
        else {

            if (!this.cache) {
                if(options.tileData){
                    var data = options.tileData;
                    options.name = data.name;
                    options.extent = [data.xMin, data.yMin, data.xMax, data.yMax];
                    options.tileOriginType = data.originType;
                    options.resolutions = data.resolutions;
                    options.tileSize = data.tileWidth;
                    options.origin = [data.originX, data.originY];
                    options.maxZoom = data.endLevel;
                }
                this.source = new Zondy.Source.TileLayerSource(options);
            }
            else {
                this.source = new Zondy.Source.CacheTileLayerSource(options);
            }
            this.setSource(this.source);
        }
    }
    ol.obj.assign(this, options);
};
ol.inherits(Zondy.Map.TileLayer, ol.layer.Tile);
//**********************************************************Zondy.Map.TileLayer(end)************************************************//

//**********************************************************Zondy.Source.CacheTileLayerSource(start)************************************************//
goog.provide('Zondy.Source.CacheTileLayerSource');


/// <summary>动态裁图的矢量地图文档资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Source.CacheTileLayerSource = function (opt_options) {
    var options = opt_options ? opt_options : {};

    /**
    * @public
    * @type {string}
    * 地图服务请求地址（可通过初始对象的options赋值）
    */
    this.ip = options.ip !== undefined ? options.ip : "127.0.0.1";

    /**
    * @public
    * @type {string}
    * 地图服务请求端口（可通过初始对象的options赋值）
    */
    this.port = options.port !== undefined ? options.port : "6163";

    /**
    * @public
    * @type {string}
    * 地图名称,必须赋值
    */
    this.name = options.name !== undefined ? options.name : null;

    /**
    * @public
    * @type {number}
    * 最大分辨率,新瓦片必须指定
    */
    this.maxResolution = options.maxResolution !== undefined ? options.maxResolution : null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    //地图范围
    var tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        tileExtent = tileProjection.getExtent();
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : tileExtent;

    /**
    * @public
    * @type {number}
    * 动态裁图瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? options.maxZoom : 16;

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = options.resolutions !== undefined ? options.resolutions : this.getResolutions();


    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,动态裁图默认左上角
    */

    this.origin = options.origin !== undefined ? options.origin : ol.extent.getCorner(this.extent, ol.extent.Corner.TOP_LEFT);

    /**
    * @private
    * @type {string}
    * 客户端标识，用以服务器缓存地图，一般情况下无需赋值
    */
    this.guid = options.guid !== undefined ? options.guid : Zondy.Util.newGuid();

    /**
    * @private
    * true表示动态裁图的方式显示出图
    */
    this.cache = true;

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.zondyTileGrid = new ol.tilegrid.TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        ip: this.ip,
        port: this.port,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ?
        /** @type {ol.source.State} */(options.state) : undefined,
        tileGrid: this.zondyTileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;
};
ol.inherits(Zondy.Source.CacheTileLayerSource, ol.source.TileImage);

/**
* 创建分辨率数组
*/
Zondy.Source.CacheTileLayerSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol.extent.getWidth(this.extent);
        var height = ol.extent.getHeight(this.extent);
        this.maxResolution = (width >= height ? width : height) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
Zondy.Source.CacheTileLayerSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    this.cache = true;
    var urlTemplate = 'http://' + this.ip + ':' + this.port + '/igs/rest/mrms/docs/' + this.name + '?f=' + this.f + '&cache=' + this.cache + '&guid=' + this.guid + '&level={z}&col={x}&row={y}&w=' + this.tileSize + '&h=' + this.tileSize;
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = -(tileCoord[2] + 1);
    if (x >= Math.pow(2, z) || y >= Math.pow(2, z)) {
        return;
    }
    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};
//**********************************************************Zondy.Source.CacheTileLayerSource(end)************************************************//

//**********************************************************Zondy.Map.CacheTileLayer(start)************************************************//
goog.provide('Zondy.Map.CacheTileLayer');

/// <summary>显示动态裁图的矢量地图文档的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {string} opt_docName 要显示的地图文档名称.</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.CacheTileLayer = function (opt_name, opt_docName, opt_options) {
    var options = opt_options ? opt_options : {};
    ol.obj.assign(options, { 'layerName': opt_name });
    ol.obj.assign(options, { 'name': opt_docName });
    var options_clone = ol.obj.assign({}, options);
    options_clone.maxResolution = Infinity;
    ol.layer.Tile.call(this, (options_clone));
    this.source = options.source !== undefined ? options.source : null;

    if (this.source == null) {
        this.source = new Zondy.Source.CacheTileLayerSource(options);
    }
    this.setSource(this.source);
    ol.obj.assign(this, options);
};
ol.inherits(Zondy.Map.CacheTileLayer, ol.layer.Tile);
//**********************************************************Zondy.Map.CacheTileLayer(end)************************************************//
//**********************************************************Zondy.Source.MapDocSource(start)************************************************//
goog.provide('Zondy.Source.MapDocSource');

/// <summary>
/// 矢量地图文档资源
/// </summary>

/// <summary>矢量地图文档资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Source.MapDocSource = function (opt_options) {
    var options = opt_options ? opt_options : {};
    ol.source.Image.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        projection: options.projection,
        resolutions: options.resolutions
    });
    //*******************MapGIS************************

    this.token = options.token;
    //=======================================================================
    /**
    * @public
    * @type {string}
    * 地图服务请求地址
    */
    this.ip = options.ip !== undefined ? options.ip : "127.0.0.1";

    /**
    * @public
    * @type {string}
    * 地图服务请求端口
    */
    this.port = options.port !== undefined ? options.port : "6163";

    /**
    * @public
    * @type {string}
    * 要显示的地图文档名称（必须赋值）
    */
    this.name = options.name !== undefined ? options.name : null;
    if (this.name == "" || this.name == null) {
        alert("地图文档名称不能为空！");
        return;
    }

    /**
    * @public
    * @type {string}
    * 图像类型：jpg,png,gif
    */
    this.f = options.f !== undefined ? options.f : "png";

    /**
    * @public
    * @type {string}
    * 指示需要显示的地图图层号
    * show,hide,include,exclude 4种形式
    * eg:  'layers=show:1,2,3','layers=include:4,5,7'
    */
    this.layers = options.layers !== undefined ? options.layers : null;

    /**
    * @public
    * @type {string}
    * 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
    * eg：'1:ID>4,3:ID>1'
    * 中文请使用UTF-8编码后再传入参数
    * javascitpt中请使用encodeURI（）函数编码后再代入filters参数中
    * 注意，在此函数中“：”和“，”是保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这2个字符用于自定义条件中
    */
    this.filters = options.filters !== undefined ? options.filters : null;

    /**
    * @public
    * @type {Zondy.Object.CDisplayStyle}
    * 显示参数
    */
    this.style = options.style !== undefined ? options.style : null;

    /**
    * @public
    * @type { Zondy.Object.CGetImageBySRSID}
    * 动态投影参数,设置地图文档在服务器端重新投影所需的空间参考系对象
    */
    this.proj = options.proj !== undefined ? options.proj : null;

    /**
    * @private
    * @type {string}
    * 唯一标识，一般无需赋值
    */
    this.guid = options.guid !== undefined ? options.guid : Zondy.Util.newGuid();

    /**
    * @public
    * @type {string}
    * 随机数用于取图无需取缓存，一般无需赋值
    */
    this.rlt = Math.random();
    //=====================================================================
    /**
    * @private
    * @type {string}
    * 请求方式
    */
    this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : null;

    /**
    * @private
    * @type {ol.ImageLoadFunctionType}
    * 非必要参数
    */
    this.imageLoadFunction_ = options.imageLoadFunction !== undefined ? options.imageLoadFunction : ol.source.Image.defaultImageLoadFunction;

    /**
    * @private
    * @type {ol.Image}
    *非必要参数，无须赋值
    */
    this.image_ = null;

    /**
    * @private
    * @type {ol.Size}
    *非必要参数，无须赋值
    */
    this.imageSize_ = [0, 0];

    /**
    * @private
    * @type {number}
    *非必要参数，无须赋值
    */
    this.renderedRevision_ = 0;

    /**
    * @private
    * @type {number}
    *非必要参数
    */
    this.ratio_ = options.ratio !== undefined ? options.ratio : 1;
    //=======================================================================

    /**
    * @private
    * @type {string|undefined}
    * 非必要参数，无须赋值
    * 取图地址
    */
    this.url_ = "http://" + this.ip + ":" + this.port + "/igs/rest/mrms/docs/" + this.name;
};
ol.inherits(Zondy.Source.MapDocSource, ol.source.Image);

/**
* @inheritDoc
* 拼接取图参数
*/
Zondy.Source.MapDocSource.prototype.getImage = function (extent, resolution, pixelRatio, projection) {
    if (this.url_ == undefined) {
        return null;
    }
    resolution = this.findNearestResolution(resolution);
    var image = this.image_;

    if (image &&
      this.renderedRevision_ == this.getRevision() &&
      image.getResolution() == resolution &&
      image.getPixelRatio() == pixelRatio &&
      ol.extent.containsExtent(image.getExtent(), extent)) {
        return image;
    }
    //客户端地图文档操作唯一标识
    if (this.guid == null) {
        this.guid = Zondy.Util.newGuid();
    }
    //定义参数
    var params = {
        'f': this.f,
        'cache': false,
        'rlt': this.rlt,
        'guid': this.guid
    };
    //设置地图文档显示样式
    if (this.style != null) {
        ol.obj.assign(params, { 'style': $.toJSON(this.style) });
    }
    //设置地图投影
    if (this.proj != null) {
        ol.obj.assign(params, { 'proj': $.toJSON(this.proj) });
    }
    //设置地图文档要显示的图层
    if (this.layers != null) {
        ol.obj.assign(params, { 'layers': this.layers });
    }
    //设置过滤条件
    if (this.filters != null) {
        ol.obj.assign(params, { 'filters': this.filters });
    }

    extent = extent.slice();
    var centerX = (extent[0] + extent[2]) / 2;
    var centerY = (extent[1] + extent[3]) / 2;
    if (this.ratio_ != 1) {
        var halfWidth = this.ratio_ * ol.extent.getWidth(extent) / 2;
        var halfHeight = this.ratio_ * ol.extent.getHeight(extent) / 2;
        extent[0] = centerX - halfWidth;
        extent[1] = centerY - halfHeight;
        extent[2] = centerX + halfWidth;
        extent[3] = centerY + halfHeight;
    }

    var imageResolution = resolution / pixelRatio;

    // Compute an integer width and height.
    var width = Math.ceil(ol.extent.getWidth(extent) / imageResolution);
    var height = Math.ceil(ol.extent.getHeight(extent) / imageResolution);

    // Modify the extent to match the integer width and height.
    extent[0] = centerX - imageResolution * width / 2;
    extent[2] = centerX + imageResolution * width / 2;
    extent[1] = centerY - imageResolution * height / 2;
    extent[3] = centerY + imageResolution * height / 2;

    this.imageSize_[0] = width;
    this.imageSize_[1] = height;
    var url = this.getRequestUrl_(extent, this.imageSize_, pixelRatio,
    projection, params);

    this.image_ = new ol.Image(extent, resolution, pixelRatio,
    this.getAttributions(), url, this.crossOrigin_, this.imageLoadFunction_);

    this.renderedRevision_ = this.getRevision();

    ol.events.listen(this.image_, ol.events.EventType.CHANGE,
        this.handleImageChange, this);
    return this.image_;

};

/**
* 获取请求地址
* @param {ol.Extent} extent Extent.
* @param {ol.Size} size Size.
* @param {number} pixelRatio Pixel ratio.
* @param {ol.proj.Projection} projection Projection.
* @param {Object} params Params.
* @return {string} Request URL.
* @private
*/
Zondy.Source.MapDocSource.prototype.getRequestUrl_ = function (extent, size, pixelRatio, projection, params) {

    goog.DEBUG && console.assert(this.url_ !== undefined, 'url is defined');
    //ol.asserts.assert(this.url_);
    ol.obj.assign(params, { 'w': size[0] });
    ol.obj.assign(params, { 'h': size[1] });
    if (this.layers != null) {
        ol.obj.assign(params, { 'layers': this.layers });
    }
    var axisOrientation = projection.getAxisOrientation();
    ol.obj.assign(params, { 'bbox': extent.join(',') });
    if(this.token){
        ol.obj.assign(params, { 'token': this.token });
    }
    return ol.uri.appendParams(this.url_, params);
};
//**********************************************************Zondy.Source.MapDocSource(end)************************************************//





//**********************************************************Zondy.Map.Doc(start)************************************************//
/// <summary>
/// 显示矢量地图文档的功能服务
/// </summary>
goog.provide('Zondy.Map.Doc');


/// <summary>显示矢量地图文档的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {string} opt_docName 要显示的地图文档名称.</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.Doc = function (opt_name, opt_docName, opt_options) {
    this.options = opt_options ? opt_options : {};

    ol.obj.assign(this.options, { 'layerName': opt_name });
    ol.obj.assign(this.options, { 'name': opt_docName });
    ol.layer.Image.call(this, (this.options));

    this.style = this.options.style !== undefined ? this.options.style : null;
    this.filters = this.options.filters !== undefined ? this.options.filters : null;
    this.layers = this.options.layers !== undefined ? this.options.layers : null;

    this.source = this.options.source !== undefined ? this.options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.MapDocSource(this.options);
    }
    this.setSource(this.source);

    ol.obj.assign(this, this.options);
};
ol.inherits(Zondy.Map.Doc, ol.layer.Image);

/**
* Source for MapGIS servers 
* 刷新地图，重新取图，但保留了原有的GUID的标识
*/
Zondy.Map.Doc.prototype.refresh = function () {
    this.setSource(null);

    var opt_guid = this.source.guid;
    ol.obj.assign(this.options, { 'guid': opt_guid });
    if (this.style !== undefined && this.style !== null) {
        ol.obj.assign(this.options, { 'style': this.style });
    }
    if (this.filters !== undefined && this.filters !== null) {
        ol.obj.assign(this.options, { 'filters': this.filters });
    }
    if (this.layers !== undefined && this.layers !== null) {
        ol.obj.assign(this.options, { 'layers': this.layers });
    }
    this.source = new Zondy.Source.MapDocSource(this.options);
    this.setSource(this.source);
}

/**
* Source for MapGIS servers 
* 获取地图样式
* 样式类型 Zondy.Object.CDisplayStyle
*/
Zondy.Map.Doc.prototype.getStyle = function () {
    return this.options.style !== undefined ? this.options.style : null;
}

/**
* Source for MapGIS servers 
* 设置地图样式
*/
Zondy.Map.Doc.prototype.setStyle = function (opt_style) {
    if (opt_style !== undefined && opt_style !== null) {
        this.style = opt_style;
    }
}

/**
* Source for MapGIS servers 
* 设置地图文档图层显示，隐藏，追加和删除等情况
* opt_layers 指定需要被取图的图层序列号，以“，”分隔,如1,2,3
* opt_type 状态类型,赋值类型为Zondy.Enum.Map.LayerStatusType
*/
Zondy.Map.Doc.prototype.setLayerStatus = function (opt_layers, opt_type) {
    if (opt_layers != null && opt_type != null) {
        var layersStatus = opt_type + ":" + opt_layers;
        this.layers = layersStatus;
    }
}

/**
* Source for MapGIS servers 
* 设置地图文档图层显示，隐藏，追加和删除等情况
* opt_filters 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
* 以“，”分隔,
* 如：1:ID>4,3:ID>1
* 如：1:面积>920
* 如：1:name='中华人民共和国'
* 如：FIRST_FIRS='Asia'
*/
Zondy.Map.Doc.prototype.setFilters = function (opt_filters) {
    if (opt_filters != null && opt_filters.toString() != "") {
        this.filters = opt_filters;
    }
};
//**********************************************************Zondy.Map.Doc(end)************************************************//
//**********************************************************Zondy.Source.MapLayerSource(start)************************************************//
goog.provide('Zondy.Source.MapLayerSource');
/// <summary>矢量图层资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Source.MapLayerSource = function (opt_options) {
    var options = opt_options ? opt_options : {};

    ol.source.Image.call(this, {
        attributions: options.attributions,
        logo: options.logo,
        projection: options.projection,
        resolutions: options.resolutions
    });

    //*******************MapGIS************************

    //======================================================================================   
    /**
    * @public
    * @type {string}
    * 地图服务请求地址
    */
    this.ip = options.ip !== undefined ? options.ip : "127.0.0.1";

    /**
    * @public
    * @type {string}
    * 地图服务请求端口
    */
    this.port = options.port !== undefined ? options.port : "6163";

    /**
    * @public
    * @type {Array.<string>}
    * 要显示的矢量图层的URL地址
    */
    this.gdbps = options.gdbps !== undefined ? options.gdbps : null;
    if (this.gdbps == null) {
        alert("当前没有赋值要显示的矢量图层！");
        return;
    }

    /**
    * @public
    * @type {string}
    * 图像类型：jpg,png,gif
    */
    this.f = options.f !== undefined ? options.f : "png";

    /**
    * @public
    * @type {string}
    * 随机数用于取图无需取缓存，一般无需赋值
    */
    this.rlt = Math.random();

    /**
    * @public
    * @type {string}
    * 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
    * eg：'1:ID>4,3:ID>1'
    * 中文请使用UTF-8编码后再传入参数
    * javascitpt中请使用encodeURI（）函数编码后再代入filters参数中
    * 注意，在此函数中“：”和“，”是保留字符，用于表示键值对概念和分隔不同图层的条件，请不要将这2个字符用于自定义条件中
    */
    this.filters = options.filters !== undefined ? options.filters : null;

    /**
    * @public
    * @type {Array.<Zondy.Object.CDisplayStyle>}
    * 显示参数
    * [Zondy.Object.CDisplayStyle,Zondy.Object.CDisplayStyle]
    */
    this.style = options.style !== undefined ? options.style : null;

    /**
    * @private
    * @type {string}
    * 客户端标识，用以服务器缓存地图，此属性一般内部
    */
    this.guid = options.guid !== undefined ? options.guid : Zondy.Util.newGuid();

    //=========================================================================================

    /**
    * @private
    * @type {string}
    */
    this.crossOrigin_ = options.crossOrigin !== undefined ? options.crossOrigin : null;

    /**
    * @private
    * @type {ol.ImageLoadFunctionType}
    * 非必要参数，无须赋值
    */
    this.imageLoadFunction_ = options.imageLoadFunction !== undefined ? options.imageLoadFunction : ol.source.Image.defaultImageLoadFunction;

    /**
    * @private
    * @type {ol.Image}
    *非必要参数，无须赋值
    */
    this.image_ = null;

    /**
    * @private
    * @type {ol.Size}
    *非必要参数，无须赋值
    */
    this.imageSize_ = [0, 0];

    /**
    * @private
    * @type {number}
    * 非必要参数，无须赋值
    */
    this.renderedRevision_ = 0;

    /**
    * @private
    * @type {number}
    * 非必要参数，无须赋值
    */
    this.ratio_ = options.ratio !== undefined ? options.ratio : 1.5;

    //===========================================================================

    /**
    * @private
    * @type {string|undefined}
    * 非必要参数，无须赋值
    */
    this.url_ = "http://" + this.ip + ":" + this.port + "/igs/rest/mrms/layers";
};
ol.inherits(Zondy.Source.MapLayerSource, ol.source.Image);

/**
* @inheritDoc
* 拼接取图参数
*/
Zondy.Source.MapLayerSource.prototype.getImage = function (extent, resolution, pixelRatio, projection) {
    if (this.url_ == undefined) {
        return null;
    }
    resolution = this.findNearestResolution(resolution);
    var image = this.image_;
    if (image &&
      this.renderedRevision_ == this.getRevision() &&
      image.getResolution() == resolution &&
      image.getPixelRatio() == pixelRatio &&
      ol.extent.containsExtent(image.getExtent(), extent)) {
        return image;
    }
    if (this.guid == null) {
        this.guid = Zondy.Util.newGuid();
    }
    //定义参数
    var params = {
        'f': this.f,
        'rlt': this.rlt,
        'guid': this.guid
    };

    if (this.gdbps != null && this.gdbps != "") {
        ol.obj.assign(params, { 'gdbps': this.gdbps.join(',') });
    }
    //设置地图文档显示样式
    if (this.style != null) {
        ol.obj.assign(params, { 'style': $.toJSON(this.style) });
    }
    //设置过滤条件
    if (this.filters != null) {
        ol.obj.assign(params, { 'filters': this.filters });
    }

    extent = extent.slice();
    var centerX = (extent[0] + extent[2]) / 2;
    var centerY = (extent[1] + extent[3]) / 2;
    if (this.ratio_ != 1) {
        var halfWidth = this.ratio_ * ol.extent.getWidth(extent) / 2;
        var halfHeight = this.ratio_ * ol.extent.getHeight(extent) / 2;
        extent[0] = centerX - halfWidth;
        extent[1] = centerY - halfHeight;
        extent[2] = centerX + halfWidth;
        extent[3] = centerY + halfHeight;
    }

    var imageResolution = resolution / pixelRatio;

    // Compute an integer width and height.
    var width = Math.ceil(ol.extent.getWidth(extent) / imageResolution);
    var height = Math.ceil(ol.extent.getHeight(extent) / imageResolution);

    // Modify the extent to match the integer width and height.
    extent[0] = centerX - imageResolution * width / 2;
    extent[2] = centerX + imageResolution * width / 2;
    extent[1] = centerY - imageResolution * height / 2;
    extent[3] = centerY + imageResolution * height / 2;

    this.imageSize_[0] = width;
    this.imageSize_[1] = height;
    var url = this.getRequestUrl_(extent, this.imageSize_, pixelRatio,
    projection, params);

    this.image_ = new ol.Image(extent, resolution, pixelRatio,
    this.getAttributions(), url, this.crossOrigin_, this.imageLoadFunction_);

    this.renderedRevision_ = this.getRevision();

    return this.image_;

};

/**
* 获取请求地址
* @param {ol.Extent} extent Extent.
* @param {ol.Size} size Size.
* @param {number} pixelRatio Pixel ratio.
* @param {ol.proj.Projection} projection Projection.
* @param {Object} params Params.
* @return {string} Request URL.
* @private
*/
Zondy.Source.MapLayerSource.prototype.getRequestUrl_ =
function (extent, size, pixelRatio, projection, params) {

    // goog.asserts.assert(goog.isDef(this.url_));
    ol.obj.assign(params, { 'w': size[0] });
    ol.obj.assign(params, { 'h': size[1] });
    if (this.layers != null) {
        ol.obj.assign(params, { 'layers': this.layers });
    }
    var axisOrientation = projection.getAxisOrientation();
    var bbox = extent;
    ol.obj.assign(params, { 'bbox': bbox.join(',') });
    return ol.uri.appendParams(this.url_, params);
};

/**
* 获取MapGIS 资源请求地址.
* @return {string|undefined} URL.
* @api stable
*/
Zondy.Source.MapLayerSource.prototype.getUrl = function () {
    return this.url_;
};

/**
* 设置MapGIS 资源请求地址.
* @param {string|undefined} url URL.
* @api stable
*/
Zondy.Source.MapLayerSource.prototype.setUrl = function (url) {
    if (url != this.url_) {
        this.url_ = url;
        this.image_ = null;
        this.changed();
    }
};

//**********************************************************Zondy.Source.MapLayerSource(end)************************************************//


//**********************************************************Zondy.Map.Layer(start)************************************************//
goog.provide('Zondy.Map.Layer');

/// <summary>显示矢量图层的功能服务构造函数</summary>
/// <param {string} opt_name 图层名称，无实际意义可为null.</param>
/// <param {Array.<string>} opt_gdbps 要显示的图层地址，数组类型,
/// 如: ["gdbps= gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地","gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/国界"].
/// </param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.Layer = function (opt_name, opt_gdbps, opt_options) {
    this.options = opt_options ? opt_options : {};
    ol.layer.Image.call(this, (this.options));

    ol.obj.assign(this.options, { 'layerName': opt_name });
    ol.obj.assign(this.options, { 'gdbps': opt_gdbps });

    this.style = this.options.style !== undefined ? this.options.style : null;
    this.filters = this.options.filters !== undefined ? this.options.filters : null;

    this.source = this.options.source !== undefined ? this.options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.MapLayerSource(this.options);
    }
    this.setSource(this.source);

    ol.obj.assign(this, this.options);
};
ol.inherits(Zondy.Map.Layer, ol.layer.Image);

/**
* Source for MapGIS servers 
* 刷新地图，重新取图，但保留了原有的GUID的标识
*/
Zondy.Map.Layer.prototype.refresh = function () {
    this.setSource(null);
    var opt_guid = this.source.guid;
    ol.obj.assign(this.options, { 'guid': opt_guid });
    if (this.style !== undefined && this.style !== null) {
        ol.obj.assign(this.options, { 'style': this.style });
    }
    if (this.filters !== undefined && this.filters !== null) {
        ol.obj.assign(this.options, { 'filters': this.filters });
    }
    this.source = new Zondy.Source.MapLayerSource(this.options);
    this.setSource(this.source);
}

/**
* Source for MapGIS servers 
* 获取地图样式
*/
Zondy.Map.Layer.prototype.getStyle = function () {
    return this.options.style !== undefined ? this.options.style : null;
}

/**
* Source for MapGIS servers 
* 设置地图样式
*/
Zondy.Map.Layer.prototype.setStyle = function (opt_style) {
    if (opt_style !== undefined && opt_style !== null) {
        this.style = opt_style;
    }
}

/**
* Source for MapGIS servers 
* 设置地图文档图层显示，隐藏，追加和删除等情况
* opt_filters 用户指定的图层过滤条件，它由多个键值对组成，值为您所要设定的过滤条件。
* 以“，”分隔,
* 如：1:ID>4,3:ID>1
* 如：1:面积>920
* 如：1:name='中华人民共和国'
* 如：FIRST_FIRS='Asia'
*/
Zondy.Map.Layer.prototype.setFilters = function (opt_filters) {
    if (opt_filters != null && opt_filters.toString() != "") {
        this.filters = opt_filters;
    }
};
//**********************************************************Zondy.Map.Layer(end)************************************************//
//**********************************************************Zondy.Source.BaiduMapSource(start)************************************************//
goog.provide('Zondy.source.BaiduMapSource');
/// <summary>百度地图资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对
///  extent(图层范围)必须设置，origin(瓦片原点)如果不赋值则默认取[0，0]
/// </param>
Zondy.Source.BaiduMapSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    /**
    * @public
    * @type {number}
    * 最大分辨率,新瓦片必须指定
    */
    this.maxResolution = options.maxResolution !== undefined ? options.maxResolution : null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    //瓦片范围
    this.tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }
    else {
        this.tileExtent = [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,默认左上角
    */
    this.origin = options.origin !== undefined ? options.origin : [0, 0];

    /**
    * @public
    * @type {number}
    * 瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? options.maxZoom : 16;

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = this.getResolutions();

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.zondyTileGrid = new ol.tilegrid.TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tileGrid: this.zondyTileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
ol.inherits(Zondy.Source.BaiduMapSource, ol.source.TileImage);

/**
* 创建分辨率数组
*/
Zondy.Source.BaiduMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol.extent.getWidth(this.tileExtent);
        var height = ol.extent.getHeight(this.tileExtent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
Zondy.Source.BaiduMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = "http://online2.map.bdimg.com/tile/?qt=tile&x=" + '{x}' + "&y=" + '{y}' + "&z=" + '{z}' + "&styles=pl&udt=20141219&scaler=1";
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = tileCoord[2];
    return urlTemplate.replace('{z}', z.toString()).replace('{y}', y.toString()).replace('{x}', x.toString());
};
//**********************************************************Zondy.Source.BaiduMapSource(end)************************************************//
//**********************************************************Zondy.Map.BaiDuLayer(start)************************************************//
goog.provide('Zondy.Map.BaiDuLayer');

/// <summary>显示百度地图的功能服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.BaiDuLayer = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    ol.layer.Tile.call(this, options);

    this.source = options.source !== undefined ? options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.BaiduMapSource(options)
    }
    this.setSource(this.source);

    //goog.object.extend(this, options);
};
ol.inherits(Zondy.Map.BaiDuLayer, ol.layer.Tile);
//**********************************************************Zondy.Map.BaiDuLayer(end)************************************************//
//**********************************************************Zondy.Source.GaodeMapSource(start)************************************************//
goog.provide('Zondy.source.GaodeMapSource');
/// <summary>高德地图资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对
///  extent(图层范围)必须设置，origin(瓦片原点)如果不赋值则默认取图层范围的左上角
/// </param>
Zondy.Source.GaodeMapSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    /**
    * @public
    * @type {number}
    * 最大分辨率
    */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    //瓦片范围
    this.tileExtent = [-180, -90, 180, 90];

    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }
    else {
        this.tileExtent = [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,默认左上角
    */
    this.origin = options.origin !== undefined ? options.origin : ol.extent.getCorner(this.extent, ol.extent.Corner.TOP_LEFT);

    /**
    * @public
    * @type {number}
    * 瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 18 ? options.maxZoom : 18) : 18;

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;
    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = this.getResolutions();

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.zondyTileGrid = new ol.tilegrid.TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tileGrid: this.zondyTileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
ol.inherits(Zondy.Source.GaodeMapSource, ol.source.TileImage);

/**
* 创建分辨率数组
*/
Zondy.Source.GaodeMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol.extent.getWidth(this.tileExtent);
        var height = ol.extent.getHeight(this.tileExtent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
Zondy.Source.GaodeMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = [
                        "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7" + "&z=" + '{z}' + "&y=" + '{y}' + "&x=" + '{x}',
                        "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7" + "&z=" + '{z}' + "&y=" + '{y}' + "&x=" + '{x}',
                        "http://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7" + "&z=" + '{z}' + "&y=" + '{y}' + "&x=" + '{x}',
                        "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7" + "&z=" + '{z}' + "&y=" + '{y}' + "&x=" + '{x}'
    ];

    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = -(tileCoord[2] + 1);
    return urlTemplate[Math.round(Math.random() * (urlTemplate.length - 1))].replace('{z}', z.toString())
                         .replace('{y}', y.toString())
                         .replace('{x}', x.toString());

};
//**********************************************************Zondy.Source.GaodeMapSource(end)************************************************//
//**********************************************************Zondy.Map.GaoDeLayer(start)************************************************//
goog.provide('Zondy.Map.GaoDeLayer');

/// <summary>显示高德地图的功能服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.GaoDeLayer = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    ol.layer.Tile.call(this, options);

    this.source = options.source !== undefined ? options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.GaodeMapSource(options);
    }
    this.setSource(this.source);

    //goog.object.extend(this, options);
};
ol.inherits(Zondy.Map.GaoDeLayer, ol.layer.Tile);
//**********************************************************Zondy.Map.GaoDeLayer(end)************************************************//
//**********************************************************Zondy.Source.TiandituMapSource(start)************************************************//
goog.provide('Zondy.source.TiandituMapSource');
/// <summary>天地图资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对
///  extent(图层范围)必须设置，
///  origin(瓦片原点)如果不赋值则默认取图层范围的左下角
///  layerType(图层类型)，默认情况下为"vec"
/// </param>
Zondy.Source.TiandituMapSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    this.ip = options.ip !== undefined ? options.ip : null;

    this.port = options.port !== undefined ? options.port : null;

    //图层类型，默认为矢量图
    this.layerType = options.layerType !== undefined ? options.layerType : Zondy.Enum.Map.TiandituType.VEC;

    /**
    * @public
    * @type {number}
    * 最大分辨率
    */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;

    //瓦片范围
    this.tileExtent = [-180, -90, 180, 90];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,默认左下角
    */
    this.origin = options.origin !== undefined ? options.origin : ol.extent.getCorner(this.extent, ol.extent.Corner.BOTTOM_LEFT);

    /**
    * @public
    * @type {number}
    * 瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 18 ? options.maxZoom : 18) : 18;

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;
    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = this.getResolutions();

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.zondyTileGrid = new ol.tilegrid.TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        ip: this.ip,
        port: this.port,
        layerType: this.layerType,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tileGrid: this.zondyTileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
ol.inherits(Zondy.Source.TiandituMapSource, ol.source.TileImage);

/**
* 创建分辨率数组
*/
Zondy.Source.TiandituMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol.extent.getWidth(this.tileExtent);
        var height = ol.extent.getHeight(this.tileExtent);
        this.maxResolution = (width <= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
Zondy.Source.TiandituMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = "";
    switch (this.layerType) {
        case Zondy.Enum.Map.TiandituType.VEC:
        case Zondy.Enum.TiandituType.VEC:
            urlTemplate = "http://t" + Math.round(Math.random() * 7) + ".tianditu.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
            break;
        case Zondy.Enum.Map.TiandituType.IMG:
        case Zondy.Enum.TiandituType.IMG:
            urlTemplate = "http://t" + Math.round(Math.random() * 7) + ".tianditu.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
            break;
        case Zondy.Enum.Map.TiandituType.CVA:
        case Zondy.Enum.TiandituType.CVA:
            urlTemplate = "http://t" + Math.round(Math.random() * 7) + ".tianditu.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
            break;
        case Zondy.Enum.Map.TiandituType.CIA:
        case Zondy.Enum.TiandituType.CIA:
            urlTemplate = "http://t" + Math.round(Math.random() * 7) + ".tianditu.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles" + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}';
            break;
        case Zondy.Enum.Map.TiandituType.VEC_IGS:
        case Zondy.Enum.TiandituType.VEC_IGS:
            urlTemplate = "http://" + this.ip + ":" + this.port + "/igs/rest/cts/tianditu" + "/vector/" + '{x}' + "/" + '{y}' + "/" + '{z}';
            break;
        case Zondy.Enum.Map.TiandituType.IMG_IGS:
        case Zondy.Enum.TiandituType.IMG_IGS:
            urlTemplate = "http://" + this.ip + ":" + this.port + "/igs/rest/cts/tianditu" + "/raster/" + '{x}' + "/" + '{y}' + "/" + '{z}';
            break;
        case Zondy.Enum.Map.TiandituType.CVA_IGS:
        case Zondy.Enum.TiandituType.CVA_IGS:
            urlTemplate = "http://" + this.ip + ":" + this.port + "/igs/rest/cts/tianditu" + "/vectorAnno/" + '{x}' + "/" + '{y}' + "/" + '{z}';
            break;
        case Zondy.Enum.Map.TiandituType.CIA_IGS:
        case Zondy.Enum.TiandituType.CIA_IGS:
            urlTemplate = "http://" + this.ip + ":" + this.port + "/igs/rest/cts/tianditu" + "/rasterAnno/" + '{x}' + "/" + '{y}' + "/" + '{z}';
            break;
    }
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = parseInt(Math.pow(2, z - 1) - 1 - tileCoord[2]);
    // var y = -(tileCoord[2]+1);
    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};
//**********************************************************Zondy.Source.TiandituMapSource(end)************************************************//
//**********************************************************Zondy.Map.TianDiTu(start)************************************************//
goog.provide('Zondy.Map.TianDiTu');


/// <summary>显示天地图的功能服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.TianDiTu = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    ol.layer.Tile.call(this, options);

    this.source = options.source !== undefined ? options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.TiandituMapSource(options);
    }
    this.setSource(this.source);

    //goog.object.extend(this, options);
};
ol.inherits(Zondy.Map.TianDiTu, ol.layer.Tile);
//**********************************************************Zondy.Map.TianDiTu(end)************************************************//
//**********************************************************Zondy.Source.GoogleMapSource(start)************************************************//
goog.provide('Zondy.source.GoogleMapSource');
/// <summary>谷歌地图资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对
///  extent(图层范围)必须设置，
///  origin(瓦片原点)如果不赋值则默认取图层范围的左上角
///  layerType(图层类型)，默认情况下为"vector"
/// </param>
Zondy.Source.GoogleMapSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    this.ip = options.ip !== undefined ? options.ip : '127.0.0.1';

    this.port = options.port !== undefined ? options.port : '6163';

    //图层类型，默认为矢量图
    this.layerType = options.layerType !== undefined ? options.layerType : Zondy.Enum.Map.GoogleLayerType.VEC,

    /**
    * @public
    * @type {number}
    * 最大分辨率
    */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : null;
    //瓦片范围
    this.tileExtent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,默认左下角
    */
    this.origin = options.origin !== undefined ? options.origin : ol.extent.getCorner(this.extent, ol.extent.Corner.TOP_LEFT);

    /**
    * @public
    * @type {number}
    * 瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 24 ? options.maxZoom : 24) : 24;

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;

    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = this.getResolutions();

    this.baseURL = options.baseURL !== undefined ? options.baseURL : this.getBaseURL();
    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.zondyTileGrid = new ol.tilegrid.TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        ip: this.ip,
        port: this.port,
        layerType: this.layerType,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tileGrid: this.zondyTileGrid,
        wrapX: options.wrapX,
        tilePixelRatio: options.tilePixelRatio,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
ol.inherits(Zondy.Source.GoogleMapSource, ol.source.TileImage);

/**
* 创建基地址
*/
Zondy.Source.GoogleMapSource.prototype.getBaseURL = function () {
    var url_base = "";
    switch (this.layerType) {
        case Zondy.Enum.Map.GoogleLayerType.VEC:
        case Zondy.Enum.GoogleLayerType.VEC:
            url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&s=Galile";
            break;
        case Zondy.Enum.Map.GoogleLayerType.RASTER:
        case Zondy.Enum.GoogleLayerType.RASTER:
            url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt?lyrs=s@173&hl=zh-Hans-CN&gl=CN&token=63145";
            break;
        case Zondy.Enum.Map.GoogleLayerType.ROAD:
        case Zondy.Enum.GoogleLayerType.ROAD:
            url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt/imgtp=png32&lyrs=h@248000000,highlight:0x342eaef8dd85f26f:0x39c2c9ac6c582210@1%7Cstyle:maps&hl=zh-CN&gl=CN&src=app&s=Galileo";
            break;
        case Zondy.Enum.Map.GoogleLayerType.TERRAIN:
        case Zondy.Enum.GoogleLayerType.TERRAIN:
            // url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt/lyrs=t@132,r@248000000&hl=zh-CN&src=app&s=Galileo";
            //url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt/lyrs=t@132,r@249000000&hl=zh-CN&src=app&s=Galileo";
            url_base = "http://mt" + Math.round(Math.random() * 3) + ".google.cn/vt?lyrs=t&scale=1";
            break;
        case Zondy.Enum.Map.GoogleLayerType.VEC_IGS:
        case Zondy.Enum.GoogleLayerType.VEC_IGS:
            url_base = "http://" + this.ip + ":" + this.port + "/igs/rest/cts/google" + "/vector/";
            break;
        case Zondy.Enum.Map.GoogleLayerType.RASTER_IGS:
        case Zondy.Enum.GoogleLayerType.RASTER_IGS:
            url_base = "http://" + this.ip + ":" + this.port + "/igs/rest/cts/google" + "/raster/";
            break;
        case Zondy.Enum.Map.GoogleLayerType.ROAD_IGS:
        case Zondy.Enum.GoogleLayerType.ROAD_IGS:
            url_base = "http://" + this.ip + ":" + this.port + "/igs/rest/cts/google" + "/road/";
            break;
        case Zondy.Enum.Map.GoogleLayerType.TERRAIN_IGS:
        case Zondy.Enum.GoogleLayerType.TERRAIN_IGS:
            url_base = "http://" + this.ip + ":" + this.port + "/igs/rest/cts/google" + "/terrain/";
            break;
    }
    return url_base;
};

/**
* 创建分辨率数组
*/
Zondy.Source.GoogleMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol.extent.getWidth(this.tileExtent);
        var height = ol.extent.getHeight(this.tileExtent);
        this.maxResolution = (width <= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
Zondy.Source.GoogleMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = "";
    switch (this.layerType) {
        case Zondy.Enum.Map.GoogleLayerType.VEC:
        case Zondy.Enum.GoogleLayerType.VEC:
        case Zondy.Enum.Map.GoogleLayerType.RASTER:
        case Zondy.Enum.GoogleLayerType.RASTER:
        case Zondy.Enum.Map.GoogleLayerType.ROAD:
        case Zondy.Enum.GoogleLayerType.ROAD:
        case Zondy.Enum.Map.GoogleLayerType.TERRAIN:
        case Zondy.Enum.GoogleLayerType.TERRAIN:
            urlTemplate = this.baseURL + "&x=" + '{x}' + "&y=" + '{y}' + "&z=" + '{z}';
            break;
        case Zondy.Enum.Map.GoogleLayerType.VEC_IGS:
        case Zondy.Enum.GoogleLayerType.VEC_IGS:
        case Zondy.Enum.Map.GoogleLayerType.RASTER_IGS:
        case Zondy.Enum.GoogleLayerType.RASTER_IGS:
        case Zondy.Enum.Map.GoogleLayerType.ROAD_IGS:
        case Zondy.Enum.GoogleLayerType.ROAD_IGS:
        case Zondy.Enum.Map.GoogleLayerType.TERRAIN_IGS:
        case Zondy.Enum.GoogleLayerType.TERRAIN_IGS:
            urlTemplate = this.baseURL + '{x}' + "/" + '{y}' + "/" + '{z}';
            break;
    }
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = -(tileCoord[2] + 1);
    //var y = Math.pow(2, z) - 1 - tileCoord[2];

    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};
//**********************************************************Zondy.Source.GoogleMapSource(end)************************************************//
//**********************************************************Zondy.Map.GoogleLayer(start)************************************************//
goog.provide('Zondy.Map.GoogleLayer');


/// <summary>显示谷歌地图的功能服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.GoogleLayer = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    ol.layer.Tile.call(this, options);

    this.source = goog.isDef(options.source) ? options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.GoogleMapSource(options);
    }
    this.setSource(this.source);

    // goog.object.extend(this, options);
};
ol.inherits(Zondy.Map.GoogleLayer, ol.layer.Tile);
//**********************************************************Zondy.Map.GoogleLayer(end)************************************************//
//**********************************************************Zondy.Source.ArcGISMapSource(start)************************************************//
goog.provide('Zondy.source.ArcGISMapSource');


/// <summary>ArcGIS地图资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对
///  extent(图层范围)必须设置，
///  origin(瓦片原点)如果不赋值则默认取图层范围的左下角
///  layerType(图层类型)，默认情况下为"World_Terrain_Base"
/// </param>
Zondy.Source.ArcGISMapSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    //图层类型，默认为矢量图
    this.layerType = options.layerType !== undefined ? options.layerType : Zondy.Enum.Map.ArcGISLayerType.WorldTerrainBase;

    /**
    * @public
    * @type {number}
    * 最大分辨率
    */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : this.initProjection();
    //瓦片范围
    this.tileExtent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,默认左下角
    */
    this.origin = options.origin !== undefined ? options.origin : ol.extent.getCorner(this.extent, ol.extent.Corner.BOTTOM_LEFT);
    /**
    * @public
    * @type {number}
    * 瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 20 ? options.maxZoom : 20) : this.initMaxZoom();

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : this.initTileSize();


    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = this.getResolutions();

    this.baseURL = options.baseURL !== undefined ? options.baseURL : "http://services.arcgisonline.com/ArcGIS/rest/services/";

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.zondyTileGrid = new ol.tilegrid.TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });
    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        ip: this.ip,
        port: this.port,
        layerType: this.layerType,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tileGrid: this.zondyTileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;
};
ol.inherits(Zondy.Source.ArcGISMapSource, ol.source.TileImage);

/**
* 初始化瓦片大小
*/
Zondy.Source.ArcGISMapSource.prototype.initTileSize = function () {
    var tileSize = 256;
    //枚举Zondy.Enum.ArcGISLayerType是为了兼容OpenLayers2的写法
    switch (this.layerType) {
        case Zondy.Enum.Map.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.TopoUS2D:
        case Zondy.Enum.ArcGISLayerType.TopoUS2D:
            tileSize = 512;
            break;
        default:
            tileSize = 256;
            break;
    }
    return tileSize;
};

/**
* 初始化投影参照系
*/
Zondy.Source.ArcGISMapSource.prototype.initProjection = function () {
    var projection = null;
    switch (this.layerType) {
        case Zondy.Enum.Map.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.TopoUS2D:
        case Zondy.Enum.ArcGISLayerType.TopoUS2D:
            projection = ol.proj.get('EPSG:4326');
            break;
        default:
            projection = ol.proj.get('EPSG:3857');
            break;
    }
    return projection;
};

/**
* 初始化最大级数
*/
Zondy.Source.ArcGISMapSource.prototype.initMaxZoom = function () {
    var maxZoom = null;
    switch (this.layerType) {
        case Zondy.Enum.Map.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.ArcGISLayerType.ImageryWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.ArcGISLayerType.StreetMapWorld2D:
        case Zondy.Enum.Map.ArcGISLayerType.USATopoMaps:
        case Zondy.Enum.ArcGISLayerType.USATopoMaps:
            maxZoom = 16;
            break;
        case Zondy.Enum.Map.ArcGISLayerType.TopoUS2D:
        case Zondy.Enum.ArcGISLayerType.TopoUS2D:
        case Zondy.Enum.Map.ArcGISLayerType.WorldShadedRelief:
        case Zondy.Enum.ArcGISLayerType.WorldShadedRelief:
        case Zondy.Enum.Map.ArcGISLayerType.WorldTerrainBase:
        case Zondy.Enum.ArcGISLayerType.WorldTerrainBase:
            maxZoom = 14;
            break;
        case Zondy.Enum.Map.ArcGISLayerType.WorldPhysical:
        case Zondy.Enum.ArcGISLayerType.WorldPhysical:
            maxZoom = 9;
            break;
        case Zondy.Enum.Map.ArcGISLayerType.WorldStreet:
        case Zondy.Enum.ArcGISLayerType.WorldStreet:
        case Zondy.Enum.Map.ArcGISLayerType.WorldTopo:
        case Zondy.Enum.ArcGISLayerType.WorldTopo:
        case Zondy.Enum.Map.ArcGISLayerType.WorldImagery:
        case Zondy.Enum.ArcGISLayerType.WorldImagery:
            maxZoom = 20;
            break;
        case Zondy.Enum.Map.ArcGISLayerType.NatGeoWorldMap:
        case Zondy.Enum.ArcGISLayerType.NatGeoWorldMap:
        case Zondy.Enum.Map.ArcGISLayerType.OceanBasemap:
        case Zondy.Enum.ArcGISLayerType.OceanBasemap:
            maxZoom = 17;
            break;
    }
    return maxZoom;
};

/**
* 创建分辨率数组
*/
Zondy.Source.ArcGISMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol.extent.getWidth(this.tileExtent);
        var height = ol.extent.getHeight(this.tileExtent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
Zondy.Source.ArcGISMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var urlTemplate = this.baseURL + this.layerType + "/MapServer/tile/" + '{z}' + "/" + '{y}' + "/" + '{x}' + ".jpg";

    var z = tileCoord[0];
    var x = tileCoord[1];
    // var y = tileCoord[2];

    var y = Math.pow(2, z) - 1 - tileCoord[2];
    return urlTemplate.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};
//**********************************************************Zondy.Source.ArcGISMapSource(end)************************************************//
//**********************************************************Zondy.Map.ArcGISLayer(start)************************************************//
goog.provide('Zondy.Map.ArcGISLayer');

/// <summary>显示ArcGIS地图的功能服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.ArcGISLayer = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    ol.layer.Tile.call(this, options);
    this.source = options.source !== undefined ? options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.ArcGISMapSource(options);
    }
    this.setSource(this.source);
    //this.setProperties(options);
};
ol.inherits(Zondy.Map.ArcGISLayer, ol.layer.Tile);
//**********************************************************Zondy.Map.ArcGISLayer(end)************************************************//
//**********************************************************Zondy.Source.OpenStreetMapSource(start)************************************************//
goog.provide('Zondy.source.OpenStreetMapSource');
/// <summary>OpenStreet地图资源构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对
///  extent(图层范围)必须设置，
///  origin(瓦片原点)如果不赋值则默认取图层范围的左下角
///  layerType(图层类型)，默认情况下为"openstreetmap"
/// </param>
Zondy.Source.OpenStreetMapSource = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};

    //图层类型，默认为矢量图
    this.layerType = options.layerType !== undefined ? options.layerType : Zondy.Enum.Map.OpenStreetLayerType.OSM,

    /**
    * @public
    * @type {number}
    * 最大分辨率
    */
    this.maxResolution = null;

    //根据投影获取地图范围
    var tileProjection = options.projection !== undefined ? options.projection : ol.proj.get('EPSG:3857');
    //瓦片范围
    this.tileExtent = [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
    if (tileProjection != null) {
        this.tileExtent = tileProjection.getExtent();
    }

    //设置地图范围
    this.extent = options.extent !== undefined ? options.extent : this.tileExtent;

    /**
    * @public
    * @type {Array.<number>}
    * 地图的原点，可由外部指定,默认左下角
    */
    this.origin = options.origin !== undefined ? options.origin : ol.extent.getCorner(this.extent, ol.extent.Corner.BOTTOM_LEFT);

    /**
    * @public
    * @type {number}
    * 瓦片地图总级数
    */
    this.maxZoom = options.maxZoom !== undefined ? (options.maxZoom <= 20 ? options.maxZoom : 20) : 20;

    /**
    * @public
    * @type {number}
    * 地图图片大小
    */
    this.tileSize = options.tileSize !== undefined ? options.tileSize : 256;


    //分辨率数组，根据传入的分辨率或范围计算得到
    this.resolutions = this.getResolutions();

    this.baseURL = options.baseURL !== undefined ? options.baseURL : this.GetUrlFormat();

    /**
    * @private
    * @type {Array.<number>}
    * 创建网格(内部调用)
    */
    this.zondyTileGrid = new ol.tilegrid.TileGrid({
        origin: this.origin, //数组类型，如[0,0],
        resolutions: this.resolutions, //分辨率
        tileSize: this.tileSize //瓦片图片大小
    });

    ol.source.TileImage.call(this, {
        attributions: options.attributions,
        extent: this.extent,
        tileExtent: this.tileExtent,
        ip: this.ip,
        port: this.port,
        layerType: this.layerType,
        logo: options.logo,
        opaque: options.opaque,
        projection: options.projection,
        state: options.state !== undefined ? options.state : undefined,
        tileGrid: this.zondyTileGrid,
        tilePixelRatio: options.tilePixelRatio,
        wrapX: options.wrapX,
        crossOrigin: options.crossOrigin !== undefined ? options.crossOrigin : null  //"anonymous"为跨域调用,
    });

    /**
    * @protected
    * @type {ol.TileUrlFunctionType}
    * 拼接取图地址方法
    */
    this.tileUrlFunction = options.tileUrlFunction !== undefined ? options.tileUrlFunction : this.tileUrlFunctionExtend;

};
ol.inherits(Zondy.Source.OpenStreetMapSource, ol.source.TileImage);

/**
* 获取取图地址的格式
*/
Zondy.Source.OpenStreetMapSource.prototype.GetUrlFormat = function () {
    var urlForMat = null;
    var preIndex = "abc";
    switch (this.layerType) {
        case Zondy.Enum.Map.OpenStreetLayerType.LandScape:
        case Zondy.Enum.OpenStreetLayerType.LandScape:
            urlForMat = "http://" + preIndex[Math.round(Math.random() * 2)] + ".tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.CYCLE:
        case Zondy.Enum.OpenStreetLayerType.CYCLE:
            urlForMat = "http://" + preIndex[Math.round(Math.random() * 2)] + ".tile.opencyclemap.org/cycle/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.CycleTransport:
        case Zondy.Enum.OpenStreetLayerType.CycleTransport:
            urlForMat = "http://" + preIndex[Math.round(Math.random() * 2)] + ".tile2.opencyclemap.org/transport/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.OSM:
        case Zondy.Enum.OpenStreetLayerType.OSM:
            urlForMat = "http://" + preIndex[Math.round(Math.random() * 2)] + ".tile.openstreetmap.org/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.OSM_HYB:
        case Zondy.Enum.OpenStreetLayerType.OSM_HYB:
            urlForMat = "http://otile" + (Math.round(Math.random() * 2) + 1) + ".mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.OSM_Quest:
        case Zondy.Enum.OpenStreetLayerType.OSM_Quest:
            urlForMat = "http://otile" + (Math.round(Math.random() * 2) + 1) + ".mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png";
            break;
        case Zondy.Enum.Map.OpenStreetLayerType.OSM_Q_SAT:
        case Zondy.Enum.OpenStreetLayerType.OSM_Q_SAT:
            urlForMat = "http://otile" + (Math.round(Math.random() * 2) + 1) + ".mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg";
            break;
    }
    return urlForMat;
};

/**
* 创建分辨率数组
*/
Zondy.Source.OpenStreetMapSource.prototype.getResolutions = function () {
    if (this.maxResolution == null) {
        var width = ol.extent.getWidth(this.tileExtent);
        var height = ol.extent.getHeight(this.tileExtent);
        this.maxResolution = (width >= height ? height : width) / (this.tileSize);
    }
    var opt_resolutions = new Array(this.maxZoom);
    for (z = 0; z < this.maxZoom; ++z) {
        opt_resolutions[z] = this.maxResolution / Math.pow(2, z);
    }
    return opt_resolutions;
};

/**
* 拼接url取图地址
* @param {Array.<number>} tileCoord 数据格式包含级数、行号、列号.
* @param {string} pixelRatio 像素比率
* @param {ol.proj.Projection} projection 投影
*/
Zondy.Source.OpenStreetMapSource.prototype.tileUrlFunctionExtend = function (tileCoord, pixelRatio, projection) {
    //判断返回的当前级数的行号和列号是否包含在整个地图范围内
    if (this.tileGrid != null) {
        var tileRange = this.tileGrid.getTileRangeForExtentAndZ(this.extent, tileCoord[0], tileRange);
        if (!tileRange.contains(tileCoord)) {
            return;
        }
    }
    var z = tileCoord[0];
    var x = tileCoord[1];
    var y = Math.pow(2, z) - 1 - tileCoord[2];

    return this.baseURL.replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
};
//**********************************************************Zondy.Source.OpenStreetMapSource(end)************************************************//
//**********************************************************Zondy.Map.OpenStreetLayer(start)************************************************//
goog.provide('Zondy.Map.OpenStreetLayer');


/// <summary>显示OpenStreet地图的功能服务构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Map.OpenStreetLayer = function (opt_options) {
    var options = opt_options !== undefined ? opt_options : {};
    ol.layer.Tile.call(this, options);

    this.source = options.source !== undefined ? options.source : null;
    if (this.source == null) {
        this.source = new Zondy.Source.OpenStreetMapSource(options);
    }
    this.setSource(this.source);

    //goog.object.extend(this, options);
};
ol.inherits(Zondy.Map.OpenStreetLayer, ol.layer.Tile);
//**********************************************************Zondy.Map.OpenStreetLayer(end)************************************************//
/**********************************************************标绘绘制（MilStd）start************************************************/
goog.provide('GeomInteraction.Drag');

/**
* @constructor
* @extends {ol.interaction.Pointer}
*/
GeomInteraction.Drag = function (map) {

    ol.interaction.Pointer.call(this, {
        handleDownEvent: GeomInteraction.Drag.prototype.handleDownEvent,
        handleDragEvent: GeomInteraction.Drag.prototype.handleDragEvent,
        handleMoveEvent: GeomInteraction.Drag.prototype.handleMoveEvent,
        handleUpEvent: GeomInteraction.Drag.prototype.handleUpEvent
    });

    /**
    * @type {ol.Pixel}
    * @private
    */
    this.coordinate_ = null;

    /**
    * @type {string|undefined}
    * @private
    */
    this.cursor_ = 'pointer';

    /**
    * @type {ol.Feature}
    * @private
    */
    this.feature_ = null;

    /**
    * @type {string|undefined}
    * @private
    */
    this.previousCursor_ = undefined;

};
ol.inherits(GeomInteraction.Drag, ol.interaction.Pointer);


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `true` to start the drag sequence.
*/
GeomInteraction.Drag.prototype.handleDownEvent = function (evt) {
    var map = evt.map;

    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
          return feature;
      });

    if (feature) {
        this.coordinate_ = evt.coordinate;
        this.feature_ = feature;
    }

    return !!feature;
};


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
*/
GeomInteraction.Drag.prototype.handleDragEvent = function (evt) {
    var map = evt.map;

    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
          return feature;
      });

    var deltaX = evt.coordinate[0] - this.coordinate_[0];
    var deltaY = evt.coordinate[1] - this.coordinate_[1];

    var geometry = /** @type {ol.geom.SimpleGeometry} */
      (this.feature_.getGeometry());
    geometry.translate(deltaX, deltaY);

    this.coordinate_[0] = evt.coordinate[0];
    this.coordinate_[1] = evt.coordinate[1];
};


/**
* @param {ol.MapBrowserEvent} evt Event.
*/
GeomInteraction.Drag.prototype.handleMoveEvent = function (evt) {
    if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });
        var element = evt.map.getTargetElement();
        if (feature) {
            if (element.style.cursor != this.cursor_) {
                this.previousCursor_ = element.style.cursor;
                element.style.cursor = this.cursor_;
            }
        } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
        }
    }
};


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `false` to stop the drag sequence.
*/
GeomInteraction.Drag.prototype.handleUpEvent = function (evt) {
    this.coordinate_ = null;
    this.feature_ = null;
    return false;
};

/**********************************************************绘制的枚举和标绘参数start************************************************/
goog.provide("MilStd.enum");
goog.provide("MilStd.EnumMilstdType");

MilStd.enum = {
    ZERO_TOLERANCE: 0.0001
};

MilStd.EnumMilstdType = {
    ArrowCross: 'ArrowCross',                      //十字箭头指北针            
    CircleClosedangle: 'CircleClosedangle',        //圆形尖角指北针
    Closedangle: 'Closedangle',                    //尖角指北针
    DoubleClosedangle: 'DoubleClosedangle',        //双向尖角指北针
    Fourstar: 'Fourstar',                          //四角指北针
    Rhombus: 'Rhombus',                            //菱形指北针
    SameDirectionClosedangle: 'SameDirectionClosedangle',   //同向尖角指北针
    Triangle: 'Triangle',                                   //三角指北针
    Vane: 'Vane',                                           //风向标指北针
    SimpleArrow: 'SimpleArrow',                             //简单箭头
    DoubleArrow: 'DoubleArrow',                             //双箭头
    StraightArrow: 'StraightArrow',                           //直箭头
    SingleLineArrow: 'SingleLineArrow',                     //单线箭头
    TriangleFlag: 'TriangleFlag',                           //三角旗
    RectFlag: 'RectFlag',                                   //矩形旗
    CurveFlag: 'CurveFlag',                                 //波浪旗
    Bezier: 'Bezier',                                       //贝塞尔曲线成区
    BezierLine: 'BezierLine',                               //贝塞尔曲线
    AssemblyArea: 'AssemblyArea'                            //集结区
};

goog.provide("MilStd.MilstdParams");

MilStd.MilstdParams = function (opt_options) {

    if (opt_options) {
        /**
        * Property: headHeightFactor
        * {Number} 箭头头部高度因子
        */
        this.headHeightFactor = (opt_options.headHeightFactor !== undefined && opt_options.headHeightFactor != null) ? opt_options.headHeightFactor : 0.2;

        /**
        * Property: headHeightFactor
        * {Number} 箭头头部宽度因子
        */
        this.headWidthFactor = (opt_options.headWidthFactor !== undefined && opt_options.headWidthFactor != null) ? opt_options.headWidthFactor : 0.5;

        /**
        * Property: headHeightFactor
        * {Number} 箭头腰部高度因子
        */
        this.neckHeightFactor = (opt_options.neckHeightFactor !== undefined && opt_options.neckHeightFactor != null) ? opt_options.neckHeightFactor : 0.8;

        /**
        * Property: headHeightFactor
        * {Number} 箭头腰部宽度因子
        */
        this.neckWidthFactor = (opt_options.neckWidthFactor !== undefined && opt_options.neckWidthFactor != null) ? opt_options.neckWidthFactor : 0.2;

        /**
        * Property: headHeightFactor
        * {Number} 箭头尾部宽度因子
        */
        this.tailWidthFactor = (opt_options.tailWidthFactor !== undefined && opt_options.tailWidthFactor != null) ? opt_options.tailWidthFactor : 0.1;
        this.hasSwallowTail = (opt_options.hasSwallowTail !== undefined && opt_options.hasSwallowTail != null) ? opt_options.hasSwallowTail : true;
        this.swallowTailFactor = (opt_options.swallowTailFactor !== undefined && opt_options.swallowTailFactor != null) ? opt_options.swallowTailFactor : 0.5;
        this.curveFitMethod = (opt_options.curveFitMethod !== undefined && opt_options.curveFitMethod != null) ? opt_options.curveFitMethod : "useBSplieFit";
        this.maxVertices = (opt_options.maxVertices !== undefined && opt_options.maxVertices != null) ? opt_options.maxVertices : 20;  //最大控制点数
    }
};

/**********************************************************标绘基础算法（commonFun）start************************************************/
goog.provide("MilStd.commonFun");
///标绘基础算法
/**
* Method: CalLengthOfTwoPoints
* 计算两点点之间的长度
* Parameters:
* p1-{ol.Coordinate}
* p2-{ol.Coordinate}
* Returns: 
* len-{double:长度}
*/
MilStd.commonFun.CalLengthOfTwoPoints = function (p1, p2) {
    var len = 0;
    len = Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2));
    return len;
};

/**
* Method: wholeDistance
* 计算点集之间的长度
* Parameters:
* arrDots-{Array.<ol.Coordinate>}
* Returns: 
* len-{double:长度}
*/
MilStd.commonFun.wholeDistance = function (arrDots) {
    var len = 0;
    if (arrDots != null && arrDots.length > 1) {
        for (var i = 0; i < arrDots.length - 1; i++) {
            len += MilStd.commonFun.CalLengthOfTwoPoints(arrDots[i], arrDots[i + 1]);
        }
    }
    return len;
};

/**
* Method: getAzimuthAngle
* 计算方位角
* Parameters:
* geoPntStart-{Array.<ol.Coordinate>:起始点}
* geoPntEnd-{Array.<ol.Coordinate>：终点}
* Returns: 
* num-{double:角度}
*/
MilStd.commonFun.getAzimuthAngle = function (geoPntStart, geoPntEnd) {
    var num = 0.0;
    var num2 = Math.asin(Math.abs((geoPntEnd[1] - geoPntStart[1])) / MilStd.commonFun.CalLengthOfTwoPoints(geoPntStart, geoPntEnd));
    //var num2 = Math.asin((geoPntEnd[1] - geoPntStart[1]) / MilStd.commonFun.CalLengthOfTwoPoints(geoPntStart, geoPntEnd));
    if ((geoPntEnd[1] >= geoPntStart[1]) && (geoPntEnd[0] >= geoPntStart[0])) {
        return (num2 + Math.PI);
    }
    if ((geoPntEnd[1] >= geoPntStart[1]) && (geoPntEnd[0] < geoPntStart[0])) {
        return (2 * Math.PI - num2);
    }
    if ((geoPntEnd[1] < geoPntStart[1]) && (geoPntEnd[0] < geoPntStart[0])) {
        return num2;
    }
    if ((geoPntEnd[1] < geoPntStart[1]) && (geoPntEnd[0] >= geoPntStart[0])) {
        num = Math.PI - num2;
    }
    return num;
};

/**
* Method: getThirdPoint
* 根据两点、角度、距离、边,计算第三个点
* Parameters:
* startPnt-{Array.<ol.Coordinate>:起始点}
* endPnt-{Array.<ol.Coordinate>：终点}
* angle-{double:角度}
* length-{double:长度}
* side-{string:边("left"、"rught")}
* Returns: 
* num-{double:角度}
*/
MilStd.commonFun.getThirdPoint = function (startPnt, endPnt, angle, length, side) {
    var num = MilStd.commonFun.getAzimuthAngle(startPnt, endPnt);
    var num2 = 0.0;
    if (side.toLowerCase() == "left") {
        num2 = num + angle;
    }
    else {
        num2 = num - angle;
    }
    var num3 = length * Math.cos(num2);
    var num4 = length * Math.sin(num2);
    return [endPnt[0] + num3, endPnt[1] + num4];
};

/**
* Method: getAngleOfThreePoints
* 计算三边角
* Parameters:
* pntA-{Array.<ol.Coordinate>: 点A}
* pntB-{Array.<ol.Coordinate>：点B}
* pntC-{Array.<ol.Coordinate>：点C}
* Returns: 
* num-{double:角度}
*/
MilStd.commonFun.getAngleOfThreePoints = function (pntA, pntB, pntC) {
    var num = MilStd.commonFun.getAzimuthAngle(pntB, pntA) - MilStd.commonFun.getAzimuthAngle(pntB, pntC);
    if (num < 0.0) {
        num += 2 * Math.PI;
    }
    return num;
};

/**
* Method: getAzimuthAngle
* 计算阶乘
* Parameters:
* n-{Number: 阶乘因子}
* Returns: 
* num-{double:角度}
*/
MilStd.commonFun.getFactorial = function (n) {
    var num = 1;
    for (var i = 1; i <= n; i++) {
        num *= i;
    }
    return num;
};

/**
* Method: getBinomialFactor
* 计算二项式系数
* Parameters:
* n-{Number: 阶乘因子}
* index-{Number: 阶乘因子}
* Returns: 
* num-{double:二项式系数}
*/
MilStd.commonFun.getBinomialFactor = function (n, index) {
    var num = 0.0;
    num = MilStd.commonFun.getFactorial(n) / (MilStd.commonFun.getFactorial(index) * MilStd.commonFun.getFactorial(n - index));
    return num;
};

/**
* Method: getBinomialFactor
* 计算二次样条因子
* Parameters:
* k-{Number: 阶乘因子}
* t-{Number: 阶乘因子}
* Returns: 
* {double:二次样条因子}
*/
MilStd.commonFun.getQuadricBSplineFactor = function (k, t) {
    if (k == 0) {
        return (Math.pow((t - 1.0), 2.0) / 2.0);
    }
    if (k == 1) {
        return ((((-2.0 * Math.pow(t, 2.0)) + (2.0 * t)) + 1.0) / 2.0);
    }
    if (k == 2) {
        return (Math.pow(t, 2.0) / 2.0);
    }
    return 0.0;
};

/**
* Method: getBSplineFFactor
* 计算样条曲线因子
* Parameters:
* k-{Number: 阶乘因子}
* n-{Number: 阶乘因子}
* t-{Number: 阶乘因子}
* Returns: 
* {double:样条曲线因子}
*/
MilStd.commonFun.getBSplineFFactor = function (k, n, t) {
    if (n == 2) {
        return MilStd.commonFun.getQuadricBSplineFactor(k, t);
    }
    var num = 0.0;
    var num2 = MilStd.commonFun.getFactorial(n);
    for (var i = 0; i <= (n - k) ; i++) {
        var num4 = ((i % 2) == 0) ? 1 : -1;
        num += (num4 * MilStd.commonFun.getBinomialFactor(n + 1, i)) * Math.pow(((t + n) - k) - i, n);
    }
    return (num / num2);
};

/**
* Method: getSide
* 获取边
* Parameters:
* pnt1-{Array.<ol.Coordinate>: 点}
* pnt2-{Array.<ol.Coordinate>：点}
* pnt-{Array.<ol.Coordinate>：点}
* Returns: 
* {String：边("left"、"right")}
*/
MilStd.commonFun.getSide = function (pnt1, pnt2, pnt) {
    var num = ((pnt2[1] - pnt1[1]) * (pnt[0] - pnt1[0])) - ((pnt[1] - pnt1[1]) * (pnt2[0] - pnt1[0]));
    if (num > 0.0) {
        return "left";
    }
    if (num < 0.0) {
        return "right";
    }
    return null;
};

/**
* Method: getMidPoint
* 获取两点的中间点
* Parameters:
* pnt1-{Array.<ol.Coordinate>: 点}
* pnt2-{Array.<ol.Coordinate>：点}
* Returns: 
* pnt3-{Array.<ol.Coordinate>：中间点}
*/
MilStd.commonFun.getMidPoint = function (pnt1, pnt2) {
    var pnt3 = new Array();
    var x = (pnt1[0] + pnt2[0]) / 2.0;
    var y = (pnt1[1] + pnt2[1]) / 2.0;
    pnt3.push(x);
    pnt3.push(y);
    return pnt3;
};

/**
* Method: getBezierPoints
* 根据其控制点数组，获取解析bezier曲线的几何点数组
* Parameters:
* points-{Array.<ol.Coordinate>:控制点数组} 
* Returns:
* {Array.<ol.Coordinate>：Bezier曲线的几何点数组}
*/
MilStd.commonFun.getBezierPoints = function (points) {
    if (points.length <= 2) {
        return points;
    }
    var list = new Array();
    var n = points.length - 1;
    for (var i = 0.0; i <= 1.0; i += 0.01) {
        var x = 0.0;
        var y = 0.0;
        for (var j = 0; j <= n; j++) {
            var num6 = MilStd.commonFun.getBinomialFactor(n, j);
            var num7 = Math.pow(i, j);
            var num8 = Math.pow(1.0 - i, (n - j));
            x += ((num6 * num7) * num8) * points[j][0];
            y += ((num6 * num7) * num8) * points[j][1];
        }
        list.push([x, y]);
    }
    list.push(points[n]);
    return list;
};

/**
* Method: getBSplinePoints
* 根据其控制点数组，获取解析BSpline曲线的几何点数组
* Parameters:
* points-{Array.<ol.Coordinate>:控制点数组} 
* n-{Number>=2：表示通过n项式计算}
* Returns:
* {Array.<ol.Coordinate>：样条曲线的几何点数组}
*/
MilStd.commonFun.getBSplinePoints = function (points, n) {
    if ((points.length <= 2) || (points.length <= n)) {
        return points;
    }
    var list = new Array();
    var num = (points.length - n) - 1;
    list.push(points[0]);
    for (var i = 0; i <= num; i++) {
        // for (var j = 0.0; j <= 1.0; j += 0.1) {
        for (var j = 0.0; j <= 1.0; j += 0.05) {
            var x = 0.0;
            var y = 0.0;
            for (var k = 0; k <= n; k++) {
                var num7 = MilStd.commonFun.getBSplineFFactor(k, n, j);
                x += num7 * points[i + k][0];
                y += num7 * points[i + k][1];
            }
            list.push([x, y]);
        }
    }
    list.push(points[points.length - 1]);
    return list;
};

/**
* Method: geomEquals
* 判断两个几何对象是否相等
* Parameters:
* geom-{ol.geom.Geometry>:几何对象} 
* geom1-{ol.geom.Geometry>:几何对象} 
* Returns:
* equals-{Boolen：是否相等}
*/
MilStd.commonFun.geomEquals = function (geom, geom1) {
    var equals = false;
    if (geom != null) {
        equals = ((geom1[0] == geom[0] && geom1[1] == geom[1]) ||
                  (geom1[0] == null && geom1[1] == null && geom[0] == null && geom[1] == null));
    }
    return equals;
};

/**
* Method: CreateNewVertices
* 重新设置新的拐点即控制点（左上+右下）
* Parameters:
* arg-{Array.<ol.Coordinate>:控制点数组} 
* Returns:
*/
MilStd.commonFun.CreateNewVertices = function (arg) {
    if (arg != null && arg.length >= 2) {
        var maxX = Math.max(arg[0][0], arg[1][0]);
        var minX = Math.min(arg[0][0], arg[1][0]);
        var maxY = Math.max(arg[0][1], arg[1][1]);
        var minY = Math.min(arg[0][1], arg[1][1]);
        var pnt1 = [minX, maxY];
        var pnt2 = [maxX, minY];
        arg.splice(0, 1, pnt1);
        arg.splice(1, 1, pnt2);
    }
};

/**********************************************************箭头算法（Arrow）start************************************************/
/* * 
* 该类是对箭头算法的实现
* SimpleArrow                        //简单箭头
* DoubleArrow                        //双箭头
* StraightArrow                      //直箭头
* SingleLineArrow                    //单线箭头
*/
goog.provide("MilStd.Arrow");

/**
* Method: getArrowFromVert
* 根据箭头类型和控制点，获取组成该箭头的几何图形
* Parameters:
* arg-{Array.<ol.Coordinate>:控制点数组}
* milStdParams-{MilStd.MilstdParams: 军标参数}
* arrowType-{string:箭头类型（SimpleArrow、DoubleArrow、StraightArrow、SingleLineArrow）} 
* Returns:
* geom-{Array.<ol.geom.Geometry>:构建箭头的几何图形}
*/
MilStd.Arrow.getArrowFromVert = function (arg, arrowType, milStdParams) {
    var geom = null;
    if (arg != null && arg.length >= 2) {
        var parseDots = null;
        switch (arrowType) {
            case "SimpleArrow":
            case "StraightArrow":
                parseDots = MilStd.Arrow.getSimpleArrowPnts(arg, milStdParams.hasSwallowTail, milStdParams.swallowTailFactor,
                milStdParams.curveFitMethod, milStdParams.headHeightFactor, milStdParams.headWidthFactor,
                milStdParams.neckHeightFactor, milStdParams.neckWidthFactor, milStdParams.tailWidthFactor);
                geom = new ol.geom.Polygon([parseDots]);
                break;
            case "DoubleArrow":
                parseDots = MilStd.Arrow.getDoubleArrowPnts(arg, milStdParams.headHeightFactor,
                milStdParams.headWidthFactor, milStdParams.neckHeightFactor, milStdParams.neckWidthFactor);
                geom = new ol.geom.Polygon([parseDots]);
                break;
            case "SingleLineArrow":
                parseDots = MilStd.Arrow.getSLArrowPnts(arg, milStdParams.headHeightFactor, milStdParams.headWidthFactor);
                geom = new ol.geom.MultiLineString(parseDots);
                break;
        }
    }
    return geom;
};

/** 
* Method: getSimpleArrowPnts
* 构建箭头的所有点
* Parameters:
* inpoints-{Array.<ol.Coordinate>:根据轨迹线解析得到坐标序列}
* hasSwallowTail -{Boolean:是否含燕尾} 
* swallowTailFactor  -{Number(0-1):箭头燕尾因子}
* curveFitMethod     -{string("bezier/BSpline"):曲线解析方式}
* headHeightFactor   -{Number(0-1):箭头头部高度因子} 
* headWidthFactor    -{Number(0-1):箭头头部宽度因子} 
* neckHeightFactor   -{Number(0-1):箭头腰部高度因子} 
* neckWidthFactor    -{Number(0-1):箭头头部高度因子} 
* tailWidthFactor    -{Number(0-1):箭头腰部宽度因子} 
* Returns:
* rangNew-{Array.<ol.Coordinate>:构建箭头的点数组}
*/
MilStd.Arrow.getSimpleArrowPnts = function (inpoints, hasSwallowTail, swallowTailFactor, curveFitMethod, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor, tailWidthFactor) {
    if (inpoints.length < 2) {
        return inpoints;
    }
    var list2 = MilStd.Arrow.getArrowHeadPoints(inpoints, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
    var neckLeftPoint = list2[0];
    var neckRightPoint = list2[4];
    var list3 = MilStd.Arrow.getArrowBodyPoints(inpoints, neckLeftPoint, neckRightPoint, tailWidthFactor, 1.0, 1.0);
    var list4 = MilStd.Arrow.getArrowTailPoints(inpoints, tailWidthFactor, hasSwallowTail, swallowTailFactor);
    var point3 = list4[0];

    var point4 = (list4.length == 3) ? list4[1] : list4[1];
    var point5 = (list4.length == 3) ? list4[2] : list4[1];
    var num = list3.length;
    var range = list3.slice(0, Math.ceil(num / 2));
    var list6 = list3.slice(Math.ceil(num / 2));
    range.push(neckLeftPoint);
    list6.push(neckRightPoint);
    range.reverse();
    range.push(point3);
    list6.reverse();
    list6.push(point5);

    var rangNew = null;
    var list6New = null;

    if (curveFitMethod == "useBezierFit") {
        rangNew = MilStd.commonFun.getBezierPoints(range);
        list6New = MilStd.commonFun.getBezierPoints(list6);
    }
    else {
        rangNew = MilStd.commonFun.getBSplinePoints(range, 2);
        list6New = MilStd.commonFun.getBSplinePoints(list6, 2);
    }
    if (point4 != null) {
        rangNew.push(point4);
        list6New.push(point4);
    }
    rangNew.reverse();
    for (var i = 0; i < list2.length; i++) {
        rangNew.push(list2[i]);
    }
    for (var j = 0; j < list6New.length; j++) {
        rangNew.push(list6New[j]);
    }
    return rangNew;
};

/**
* Method: getSLArrowPnts
* 根据控制点数组，获取组成单线箭头的二维点数组
* Parameters:
* inpoints-{Array.<ol.Coordinate>:控制点数组}
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* Returns:
* mulLine-{Array.<Array.<ol.Coordinate>>:构建箭头的二维点数组}}
*/
MilStd.Arrow.getSLArrowPnts = function (inpoints, headHeightFactor, headWidthFactor) {
    if (inpoints.length < 2) {
        return null;
    }
    //单线箭头头部的三个点
    var list1 = MilStd.Arrow.getArrowHeadPointsForSLine(inpoints, headHeightFactor, headWidthFactor);
    //单线箭头腰部坐标点序列（Bezier离散）
    var list2 = MilStd.commonFun.getBezierPoints(inpoints);

    var mulLine = new Array();
    mulLine.push(list1);
    mulLine.push(list2);

    return mulLine;
};

/**
* Method: isCounterClockwise
* 根据控制点的顺序，判断是否为逆时针
* Parameters:
* vertices-{Array.<ol.Coordinate>:控制点数组}
* Returns: 0：在同一直线上  >0:逆时针   <0:顺时针
*/
MilStd.Arrow.isCounterClockwise = function (vertices) {
    if (vertices.length < 3) {
        return 0;
    }
    else {
        var p1 = vertices[0];
        var p2 = vertices[1];
        var p3 = vertices[2];
        var rtn = (p2[0] - p1[0]) * (p3[1] - p2[1]) - (p2[1] - p1[1]) * (p3[0] - p2[0]);
        return rtn;
    }
};
/**
* Method: getDoubleArrowPnts
* 根据控制点组成的要素，获取组成双箭头的二维点数组
* Parameters:
* inpoints-{Array.<ol.Coordinate>:控制点数组}
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* neckHeightFactor-{Number(0-1):箭头腰部高度因子} 
* neckWidthFactor -{Number(0-1):箭头腰部宽度因子} 
* Returns:
* rangNew-{Array.<ol.Coordinate>:构建箭头的点数组}}
*/
MilStd.Arrow.getDoubleArrowPnts = function (inpoints, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
    var range = null;

    var num = inpoints.length;
    if ((num >= 3) && (!MilStd.commonFun.geomEquals(inpoints[num - 1], inpoints[num - 2]))) {


        var point = inpoints[0];
        var point2 = inpoints[1];
        var point3 = inpoints[2];
        var point4 = null;
        if (num == 3) {
            point4 = MilStd.Arrow.getTempPnt4(point, point2, point3);
            inpoints.push(point4);
        }
        else {
            point4 = inpoints[3];
        }
        //modify by www 2016.11.3:修改控制点顺序，保证控制点为顺时针时可以正确计算
        var isCounterClockwise = MilStd.Arrow.isCounterClockwise(inpoints);
        if (isCounterClockwise < 0) {
            point = inpoints[1];
            point2 = inpoints[0];
            point3 = inpoints[3];
            point4 = inpoints[2];
        }

        var connPointTemp = MilStd.commonFun.getMidPoint(point, point2);
        //  var list = MilStd.Arrow.getArrowPoints(point, connPointTemp, point4, "left", headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
        //  var list2 = MilStd.Arrow.getArrowPoints(connPointTemp, point2, point3, "right", headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);

        var list = MilStd.Arrow.getArrowPoints(point, connPointTemp, point4, "left", headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
        var list2 = MilStd.Arrow.getArrowPoints(connPointTemp, point2, point3, "right", headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);

        var num2 = list.length;
        var num3 = Math.ceil((num2 - 5) / 2);
        range = list.slice(0, num3);
        var list4 = list.slice(num3, num3 + 5);
        var list5 = list.slice(num3 + 5);
        var list6 = list2.slice(0, num3);
        var list7 = list2.slice(num3, num3 + 5);
        var list8 = list2.slice(num3 + 5);
        range = MilStd.commonFun.getBezierPoints(range);
        for (var i = 0; i < list6.length; i++) {
            list5.push(list6[i]);
        }

        var list9 = MilStd.commonFun.getBezierPoints(list5);
        list8 = MilStd.commonFun.getBezierPoints(list8);

        for (var i = 0; i < list4.length; i++) {
            range.push(list4[i]);
        }
        for (var i = 0; i < list9.length; i++) {
            range.push(list9[i]);
        }
        for (var i = 0; i < list7.length; i++) {
            range.push(list7[i]);
        }
        for (var i = 0; i < list8.length; i++) {
            range.push(list8[i]);
        }
        if (range.length > 0) {

            if (!MilStd.commonFun.geomEquals(range[0], range[range.length - 1])) {
                range.push(range[0]);
            }
        }
    }
    return range;
};

/**
* Method: getArrowHeadPoints
* 根据其控制点数组和相关控制因子，获取箭头头部的几何点数组
* Parameters:
* points-Array.<ol.Coordinate>:控制点数组} 
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* neckHeightFactor-{Number(0-1):箭头腰部高度因子} 
* neckWidthFactor -{Number(0-1):箭头腰部宽度因子} 
* Returns:
* Array.<ol.Coordinate>：箭头头部的几何点数组}
*/
MilStd.Arrow.getArrowHeadPoints = function (points, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
    if (points.length < 2) {
        return points;
    }
    var length = MilStd.commonFun.wholeDistance(points) * headHeightFactor;
    var num3 = length * headWidthFactor;
    var num4 = length * neckWidthFactor;
    var num5 = points.length;

    var point = [points[num5 - 1][0], points[num5 - 1][1]];
    var num6 = MilStd.commonFun.CalLengthOfTwoPoints(point, points[num5 - 2]);
    length = (length > num6) ? num6 : length;
    var num7 = length * neckHeightFactor;
    var endPnt = MilStd.commonFun.getThirdPoint(points[num5 - 2], point, 0.0, length, "left");
    var point3 = MilStd.commonFun.getThirdPoint(points[num5 - 2], point, 0.0, num7, "left");
    var point4 = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num3, "right");
    var point5 = MilStd.commonFun.getThirdPoint(point, point3, 1.5 * Math.PI, num4, "right");
    var point6 = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num3, "left");
    var point7 = MilStd.commonFun.getThirdPoint(point, point3, 1.5 * Math.PI, num4, "left");
    var listHead = new Array();
    listHead.push(point5);
    listHead.push(point4);
    listHead.push(point);
    listHead.push(point6);
    listHead.push(point7);
    return listHead;
};

/**
* Method: getArrowHeadPointsForSLine
* 根据其控制点数组和相关控制因子，获取单线箭头头部的几何点数组
* Parameters:
* points-Array.<ol.Coordinate>:控制点数组} 
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* Returns:
* Array.<ol.Coordinate>：箭头头部的几何点数组}
*/
MilStd.Arrow.getArrowHeadPointsForSLine = function (points, headHeightFactor, headWidthFactor) {
    if (points.length < 2) {
        return points;
    }
    var length = MilStd.commonFun.CalLengthOfTwoPoints(points[0], points[1]) * headHeightFactor;
    // var length = MilStd.commonFun.wholeDistance(points) * headHeightFactor;
    var num3 = length * headWidthFactor;

    var num5 = points.length;

    var point = points[num5 - 1];
    var num6 = MilStd.commonFun.CalLengthOfTwoPoints(point, points[num5 - 2]);
    length = (length > num6) ? num6 : length;

    var endPnt = MilStd.commonFun.getThirdPoint(points[num5 - 2], point, 0.0, length, "left");
    var point4 = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num3, "right");
    var point6 = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num3, "left");

    var listHead = new Array();

    listHead.push(point4);
    listHead.push(point);
    listHead.push(point6);

    return listHead;
};

/**
* Method: 计算箭头腰部的点
* 根据其控制点数组和相关控制因子，获取箭头腰部的几何点数组
* Parameters:
* points-{Array.<ol.Coordinate>:控制点数组} 
* neckLeftPoint  -{ol.Coordinate:腰部左边的几何点} 
* neckRightPoint -{ol.Coordinate:腰部右边的几何点} 
* tailWidthFactor-{Number(0-1):箭头尾部宽度因子} 
* leftFactor     -{Number(0-1):箭头腰部左边因子} 
* rightFactor    -{Number(0-1):箭头腰部右边因子} 
* Returns:
* {Array.<ol.Coordinate>：箭头腰部的几何点数组}
*/
MilStd.Arrow.getArrowBodyPoints = function (points, neckLeftPoint, neckRightPoint, tailWidthFactor, leftFactor, rightFactor) {
    if (points.length < 2) {
        return points;
    }

    var num = MilStd.commonFun.wholeDistance(points);
    var num3 = MilStd.commonFun.wholeDistance(points) * tailWidthFactor;
    var num4 = MilStd.commonFun.CalLengthOfTwoPoints(neckLeftPoint, neckRightPoint);
    var num5 = num3 - (num4 / 2.0);
    var num6 = 0.0;
    var list = new Array();
    var list2 = new Array();
    for (var i = 1; i < (points.length - 1) ; i++) {
        var angle = MilStd.commonFun.getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2.0;
        num6 += MilStd.commonFun.CalLengthOfTwoPoints(points[i - 1], points[i]);
        var num9 = (num3 - ((num6 / num) * num5)) / Math.sin(angle);
        list.push(MilStd.commonFun.getThirdPoint(points[i - 1], points[i], angle, num9 * leftFactor, "right"));
        list2.push(MilStd.commonFun.getThirdPoint(points[i - 1], points[i], Math.PI - angle, num9 * rightFactor, "left"));
    }
    for (var j = 0; j < list2.length; j++) {
        list.push(list2[j]);
    }
    return list;
};

/**
* Method: getArrowTailPoints
* 根据其控制点数组和相关控制因子，获取箭头尾部的几何点数组
* Parameters:
* points-{Array.<ol.Coordinate>）:控制点数组} 
* tailWidthFactor-{Number(0-1):箭头尾部宽度因子} 
* hasSwallowTail -{Boolean:是否含燕尾} 
* swallowTailFactor  -{Number(0-1):箭头燕尾因子} 
* Returns:
* {Array.<ol.Coordinate>：箭头尾部的几何点数组}
*/
MilStd.Arrow.getArrowTailPoints = function (points, tailWidthFactor, hasSwallowTail, swallowTailFactor) {
    if (points.length < 2) {
        return points;
    }
    var length = MilStd.commonFun.wholeDistance(points) * tailWidthFactor;
    var list = new Array();
    var point = MilStd.commonFun.getThirdPoint(points[1], points[0], 1.5 * Math.PI, length, "right");
    var point2 = MilStd.commonFun.getThirdPoint(points[1], points[0], 1.5 * Math.PI, length, "left");
    if (hasSwallowTail) {
        var num3 = length * swallowTailFactor;
        var point3 = MilStd.commonFun.getThirdPoint(points[1], points[0], 0.0, num3, "left");
        list.push(point);
        list.push(point3);
        list.push(point2);
        return list;
    }
    list.push(point);
    list.push(point2);
    return list;
};

/**
* Method: getArrowPoints
* 根据其中的三个控制点和相关控制因子，获取组成双箭头的左边或者右边部分的几何点数组
* Parameters:
* pnt1-{ol.Coordinate:控制点1} 
* pnt2-{ol.Coordinate:控制点2} 
* pnt3 -{ol.Coordinate:控制点3} 
* side -{string（"left"/"right"）:组成双箭头的左边部分或者右边部分} 
* headHeightFactor-{Number(0-1):箭头头部高度因子} 
* headWidthFactor -{Number(0-1):箭头头部宽度因子} 
* neckHeightFactor-{Number(0-1):箭头腰部高度因子} 
* neckWidthFactor -{Number(0-1):箭头腰部宽度因子} 
* Returns:
* range-{Array.<ol.Coordinate>：箭头的左边部分或者右边部分的几何点数组}
*/
MilStd.Arrow.getArrowPoints = function (pnt1, pnt2, pnt3, side, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor) {
    var point = MilStd.commonFun.getMidPoint(pnt1, pnt2);
    var num = MilStd.commonFun.CalLengthOfTwoPoints(point, pnt3);
    var endPnt = MilStd.commonFun.getThirdPoint(pnt3, point, 0.0, num * 0.3, "left");
    var point3 = MilStd.commonFun.getThirdPoint(pnt3, point, 0.0, num * 0.5, "left");
    var point4 = MilStd.commonFun.getThirdPoint(pnt3, point, 0.0, num * 0.7, "left");
    endPnt = MilStd.commonFun.getThirdPoint(point, endPnt, 1.5 * Math.PI, num / 4.0, side);
    point3 = MilStd.commonFun.getThirdPoint(point, point3, 1.5 * Math.PI, num / 4.0, side);
    point4 = MilStd.commonFun.getThirdPoint(point, point4, 1.5 * Math.PI, num / 4.0, side);

    var points = new Array();
    points.push(point);
    points.push(endPnt);
    points.push(point3);
    points.push(point4);
    points.push(pnt3);

    var list2 = MilStd.Arrow.getArrowHeadPoints(points, headHeightFactor, headWidthFactor, neckHeightFactor, neckWidthFactor);
    var neckLeftPoint = list2[0];
    var neckRightPoint = list2[4];
    var tailWidthFactor = (MilStd.commonFun.CalLengthOfTwoPoints(pnt1, pnt2) / MilStd.commonFun.wholeDistance(points)) / 2.0;
    var leftFactor = (side == "left") ? 1.0 : 0.01;
    var rightFactor = (side == "left") ? 0.01 : 1.0;
    var list3 = MilStd.Arrow.getArrowBodyPoints(points, neckLeftPoint, neckRightPoint, tailWidthFactor, leftFactor, rightFactor);
    var num5 = list3.length;

    var range = list3.slice(0, Math.ceil(num5 / 2));
    var list5 = list3.slice(Math.ceil(num5 / 2));

    range.push(neckLeftPoint);
    list5.push(neckRightPoint);
    range.reverse();
    range.push(pnt1);
    list5.reverse();
    list5.push(pnt2);
    range.reverse();

    for (var i = 0; i < list2.length; i++) {
        range.push(list2[i]);
    }
    for (var i = 0; i < list5.length; i++) {
        range.push(list5[i]);
    }

    return range;
};

/**
* Method: getTempPnt4
* 根据其中的三个控制点，获取第四个控制点（双箭头需要至少3个控制点，如果只提供3个控制点，则会计算出第四个控制点）
* Parameters:
* linePnt1-{ol.Coordinate:控制点数组} 
* linePnt2-{ol.Coordinate:箭头头部高度因子} 
* point -{ol.Coordinate:箭头头部宽度因子} 
* Returns:
* {ol.Coordinate：第四个控制点}
*/
MilStd.Arrow.getTempPnt4 = function (linePnt1, linePnt2, point) {
    var point4 = null;
    var point3 = MilStd.commonFun.getMidPoint(linePnt1, linePnt2);
    var num = MilStd.commonFun.CalLengthOfTwoPoints(point3, point);
    var num2 = MilStd.commonFun.getAngleOfThreePoints(linePnt1, point3, point);
    var length = 0.0;
    var num4 = 0.0;
    if (num2 < Math.PI / 2) {
        length = num * Math.sin(num2);
        num4 = num * Math.cos(num2);
        point4 = MilStd.commonFun.getThirdPoint(linePnt1, point3, 1.5 * Math.PI, length, "left");
        return MilStd.commonFun.getThirdPoint(point3, point4, 1.5 * Math.PI, num4, "right");
    }
    else if ((num2 >= Math.PI / 2) && (num2 < Math.PI)) {
        length = num * Math.sin(Math.PI - num2);
        num4 = num * Math.cos(Math.PI - num2);
        point4 = MilStd.commonFun.getThirdPoint(linePnt1, point3, 1.5 * Math.PI, length, "left");
        return MilStd.commonFun.getThirdPoint(point3, point4, 1.5 * Math.PI, num4, "left");
    }
    else if ((num2 >= Math.PI) && (num2 < 1.5 * Math.PI)) {
        length = num * Math.sin(num2 - Math.PI);
        num4 = num * Math.cos(num2 - Math.PI);
        point4 = MilStd.commonFun.getThirdPoint(linePnt1, point3, 1.5 * Math.PI, length, "right");
        return MilStd.commonFun.getThirdPoint(point3, point4, 1.5 * Math.PI, num4, "right");
    }
    else {
        length = num * Math.sin(2 * Math.PI - num2);
        num4 = num * Math.cos(2 * Math.PI - num2);
        point4 = MilStd.commonFun.getThirdPoint(linePnt1, point3, 1.5 * Math.PI, length, "right");
        return MilStd.commonFun.getThirdPoint(point3, point4, 1.5 * Math.PI, num4, "left");
    }
};

/**********************************************************多种旗帜，包括三角形 矩形以及波浪形的算法（Flag）start************************************************/
/* * 
* 该类实现了对多种旗帜，包括三角形 矩形以及波浪形的算法
* 说明:
* TriangleFlag:'TriangleFlag'：      //三角旗
* RectFlag:'RectFlag'：              //矩形旗
* CurveFlag: 'CurveFlag'：           //波浪旗
*/
goog.provide("MilStd.Flag");

/**
* Method: getFlagFromVert
* 根据旗帜类型和控制点，获取组成旗帜的点数组
* Parameters:
* arg-{Array.<ol.Coordinate>:控制点数组}
* flagType-{string:TriangleFlag（三角）、RectFlag（矩形）、CurveFlag（波浪）} 
* Returns:
* geometryArr-{Array.<ol.geom.Geometry>:构建旗帜的几何图形数组}
*/
MilStd.Flag.getFlagFromVert = function (arg, flagType) {
    var geometryArr = new Array();
    MilStd.commonFun.CreateNewVertices(arg);

    var dots = new Array();
    if (arg != null && arg.length >= 2) {
        dots.push(arg[0]);
        dots.push(arg[1]);

        var parseDots = null;
        switch (flagType) {
            case "TriangleFlag":
                parseDots = this.GetTriangleFlagDots(dots);
                break;
            case "RectFlag":
                parseDots = this.GetRectFlagDots(dots);
                break;
            case "CurveFlag":
                parseDots = this.GetCurveFlagDots(dots);
                break;
        }
        var polyGeom = new ol.geom.Polygon([parseDots[0]]);
        var lineGeom = new ol.geom.LineString(parseDots[1]);
        geometryArr.push(polyGeom);
        geometryArr.push(lineGeom);
    }

    return geometryArr;
};

/**
* Method: GetTriangleFlagDots
* 根据控制点数组，获取组成三角形旗帜的点数组
* Parameters:
* arg-{Array.<ol.Coordinate>:控制点数组} 
* Returns:
* locPnts-{Array.<Array.<ol.Coordinate>>：组成三角旗的几何点数组}
*/
MilStd.Flag.GetTriangleFlagDots = function (arg) {
    MilStd.commonFun.CreateNewVertices(arg);
    var locPnts = new Array();

    var num = arg.length;
    if ((num >= 2) && (!MilStd.commonFun.geomEquals(arg[num - 1], arg[num - 2]))) {
        var point = arg[0];
        var point2 = arg[1];
        var point3 = [point[0], point2[1]];
        var point4 = MilStd.commonFun.getMidPoint(point, point3);
        var point5 = [point2[0], point4[1]];

        var polyPnts = new Array();
        polyPnts.push(point4);
        polyPnts.push(point);
        polyPnts.push(point5);
        polyPnts.push(point4);

        var linPnts = new Array();
        linPnts.push(point3);
        linPnts.push(point4);

        locPnts.push(polyPnts);
        locPnts.push(linPnts);
    }
    return locPnts;
};

/**
* Method: GetRectFlagDots
* 根据控制点数组，获取组成矩形旗帜的二维点数组
* Parameters:
* arg-{Array.<ol.Coordinate>:控制点数组} 
* Returns:
* locPnts-{Array.<ol.Coordinate>：组成矩形旗的几何点数组}
*/
MilStd.Flag.GetRectFlagDots = function (arg) {
    MilStd.commonFun.CreateNewVertices(arg);
    var locPnts = new Array();
    var num = arg.length;
    if ((num >= 2) && (!MilStd.commonFun.geomEquals(arg[num - 1], arg[num - 2]))) {
        var point = arg[0];
        var point2 = arg[1];
        var point3 = [point[0], point2[1]];
        var point4 = MilStd.commonFun.getMidPoint(point, point3);
        var point5 = [point2[0], point4[1]];
        var point6 = [point2[0], point[1]];

        var polyPnts = new Array();
        polyPnts.push(point4);
        polyPnts.push(point);
        polyPnts.push(point6);
        polyPnts.push(point5);
        polyPnts.push(point4);

        var linPnts = new Array();
        linPnts.push(point3);
        linPnts.push(point4);

        locPnts.push(polyPnts);
        locPnts.push(linPnts);
    }
    return locPnts;
};

/**
* Method: GetCurveFlagDots
* 根据控制点数组，获取组成波浪旗帜的二维点数组
* Parameters:
* arg-{Array.<ol.Coordinate>:控制点数组} 
* Returns:
* locPnts-{Array.<ol.Coordinate>：组成波浪旗的几何点数组}
*/
MilStd.Flag.GetCurveFlagDots = function (arg) {
    MilStd.commonFun.CreateNewVertices(arg);
    var locPnts = new Array();
    var num = arg.length;
    if ((num >= 2) && (!MilStd.commonFun.geomEquals(arg[num - 1], arg[num - 2]))) {
        var point = arg[0];
        var point2 = arg[1];
        var point3 = [point[0], point2[1]];
        var point4 = MilStd.commonFun.getMidPoint(point, point3);
        var point5 = [point2[0], point4[1]];
        var point6 = [point2[0], point[1]];

        var length = MilStd.commonFun.CalLengthOfTwoPoints(point, point4) / 2.0;
        var num3 = MilStd.commonFun.CalLengthOfTwoPoints(point, point6);
        var endPnt = MilStd.commonFun.getThirdPoint(point6, point, 0.0, num3 / 4.0, "left");
        var point8 = MilStd.commonFun.getThirdPoint(point, endPnt, Math.PI * 1.5, length, "right");
        endPnt = MilStd.commonFun.getThirdPoint(point6, point, 0.0, (num3 / 4.0) * 3.0, "left");
        var point9 = MilStd.commonFun.getThirdPoint(point, endPnt, Math.PI * 1.5, length, "left");
        endPnt = MilStd.commonFun.getThirdPoint(point5, point4, 0.0, num3 / 4.0, "left");
        var point10 = MilStd.commonFun.getThirdPoint(point4, endPnt, Math.PI * 1.5, length, "right");
        endPnt = MilStd.commonFun.getThirdPoint(point5, point4, 0.0, (num3 / 4.0) * 3.0, "left");
        var point11 = MilStd.commonFun.getThirdPoint(point4, endPnt, Math.PI * 1.5, length, "left");

        var list = new Array();
        list.push(point);
        list.push(point8);
        list.push(point9);
        list.push(point6);
        var list2 = MilStd.commonFun.getBezierPoints(list);
        var list3 = new Array();
        list3.push(point4);
        list3.push(point10);
        list3.push(point11);
        list3.push(point5);
        var list4 = MilStd.commonFun.getBezierPoints(list3);

        var polyPnts = new Array();
        polyPnts.push(point4);
        for (var i = 0; i < list2.length; i++) {
            polyPnts.push(list2[i]);
        }

        list4.reverse();
        for (var i = 0; i < list4.length; i++) {
            polyPnts.push(list4[i]);
        }

        var linPnts = new Array();
        linPnts.push(point3);
        linPnts.push(point4);

        locPnts.push(polyPnts);
        locPnts.push(linPnts);
    }
    return locPnts;
};
/**********************************************************指北针算法（Compass）start************************************************/
/* * 
* 该类实现了各种类型的指北针的算法
* 说明：
* "ArrowCross":               //十字箭头指北针
* "CircleClosedangle":        //圆形尖角指北针
* "Closedangle":              //尖角指北针
* "DoubleClosedangle":        //双向尖角指北针
* "Fourstar":                 //四角指北针
* "Rhombus":                  //菱形指北针
* "SameDirectionClosedangle": //同向尖角指北针
* "Triangle":                 //三角指北针
* "Vane":                     //风向标指北针
*/
goog.provide("MilStd.Compass");

/**
* Method: getCompassFromVert
* 根据指北针类型和控制点，获取组成该类型指北针的点数组
* Parameters:
* arg-{Array.<ol.Coordinate>:控制点数组}
* compassType-{string:指北针类型（ArrowCross、CircleClosedangle、Closedangle... etc.）} 
* Returns:
* geometryArr-{Array.<ol.geom.Geometry>:构建指北针的几何图形数组}
*/
MilStd.Compass.getCompassFromVert = function (arg, compassType) {
    MilStd.commonFun.CreateNewVertices(arg);

    var dots = new Array();
    if (arg != null && arg.length >= 2) {
        dots.push(arg[0]);
        dots.push(arg[1]);

        var parseDots = null;
        var multyLine = null;
        switch (compassType) {
            case "ArrowCross":         //十字箭头指北针
                parseDots = this.GetArrowCrossDots(dots);
                break;
            case "CircleClosedangle":  //圆形尖角指北针
                parseDots = this.GetCircleClosedangleDots(dots);
                break;
            case "Closedangle":        //尖角指北针
                parseDots = this.GetClosedangleDots(dots);
                break;
            case "DoubleClosedangle":  //双向尖角指北针
                parseDots = this.GetDoubleClosedangleDots(dots);
                break;
            case "Fourstar":           //四角指北针
                parseDots = this.GetFourstarDots(dots);
                break;
            case "Rhombus":            //菱形指北针
                parseDots = this.GetRhombusDots(dots);
                break;
            case "SameDirectionClosedangle": //同向尖角指北针
                parseDots = this.GetSameDirectionClosedangleDots(dots);
                break;
            case "Triangle":                 //三角指北针
                parseDots = this.GetTriangleDots(dots);
                break;
            case "Vane":                     //风向标指北针
                parseDots = this.GetVaneDots(dots);
                break;
        }

        var mulLinDotArr = new Array();
        var polyDotArr = new Array();
        if (parseDots != null && parseDots.length > 0) {
            for (var i = 0; i < parseDots.length; i++) {
                switch (compassType) {
                    case "ArrowCross":
                    case "DoubleClosedangle":
                    case "CircleClosedangle":
                    case "Rhombus":
                    case "SameDirectionClosedangle":
                        if (i == (parseDots.length - 1)) {
                            polyDotArr.push(parseDots[i][0]);
                        }
                        else {
                            mulLinDotArr.push(parseDots[i][0]);
                        }
                        break;
                    case "Closedangle":
                    case "Fourstar":
                        if (i % 2 == 0) {
                            mulLinDotArr.push(parseDots[i][0]);
                        }
                        else {
                            polyDotArr.push(parseDots[i][0]);
                        }
                        break;
                    case "Triangle":
                        if (i == 1 || i == 4) {
                            polyDotArr.push(parseDots[i][0]);
                        }
                        else {
                            mulLinDotArr.push(parseDots[i][0]);
                        }
                        break;
                    case "Vane":
                        if (i == (parseDots.length - 1)) {
                            mulLinDotArr.push(parseDots[i][0]);
                        }
                        else {
                            polyDotArr.push(parseDots[i][0]);
                        }
                        break;
                }
            }
            var geometryArr = new Array();
            var mulLin = new ol.geom.MultiLineString(mulLinDotArr);
            geometryArr.push(mulLin);
            var poly = new ol.geom.Polygon(polyDotArr);
            geometryArr.push(poly);
        }

        return geometryArr;
    }
};

/**
* Method: GetArrowCrossDots
* 根据控制点数组，获取组成十字箭头指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，十字箭头由5部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetArrowCrossDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }

    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);

    //绘制一个字母“N”
    var locN = new Array();
    var loc1 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16 * 1];
    locN.push(loc1);
    var loc2 = [arg1[0][0] + width / 32 * 15, arg1[0][1]];
    locN.push(loc2);
    var loc3 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16 * 1];
    locN.push(loc3);
    var loc4 = [arg1[0][0] + width / 32 * 17, arg1[0][1]];
    locN.push(loc4);


    //绘制一个字母“W”
    var locW = new Array();
    var loc5 = [arg1[0][0], arg1[0][1] - height / 32 * 15];
    locW.push(loc5);
    var loc6 = [arg1[0][0] + width / 128 * 3, arg1[0][1] - height / 32 * 17];
    locW.push(loc6);
    var loc7 = [arg1[0][0] + width / 128 * 6, arg1[0][1] - height / 32 * 15];
    locW.push(loc7);
    var loc8 = [arg1[0][0] + width / 128 * 9, arg1[0][1] - height / 32 * 17];
    locW.push(loc8);
    var loc9 = [arg1[0][0] + width / 128 * 12, arg1[0][1] - height / 32 * 15];
    locW.push(loc9);

    //绘制一个字母“E”
    var locE = new Array();
    var loc10 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 15];
    var loc11 = [arg1[0][0] + width / 16 * 15, arg1[0][1] - height / 32 * 15];
    var loc12 = [arg1[0][0] + width / 16 * 15, arg1[0][1] - height / 32 * 17];
    var loc13 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 17];
    var loc14 = [arg1[0][0] + width / 16 * 15, arg1[0][1] - height / 2];
    var loc15 = [arg1[0][0] + width / 50 * 48, arg1[0][1] - height / 2];
    locE.push(loc10);
    locE.push(loc11);
    locE.push(loc14);
    locE.push(loc15);
    locE.push(loc14);
    locE.push(loc12);
    locE.push(loc13);

    //绘制字母“S”
    var pnt4 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32];
    var pnt1 = [arg1[0][0] + width / 2 + width / 32, arg1[1][1] + height / 32 + height / 64];
    var pnt3 = [arg1[0][0] + width / 2 + width / 32 - 2 * width / 32, arg1[1][1] + height / 32 + height / 64];
    var pnt2 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32 + height / 32];
    var pnt6 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32 - height / 32];
    var pnt5 = [arg1[0][0] + width / 2 + width / 32, arg1[1][1] + height / 32 + height / 64 - height / 32];
    var pnt7 = [arg1[0][0] + width / 2 + width / 32 - width / 16, arg1[1][1] + height / 32 + height / 64 - height / 32];
    var sLoc = new Array();
    sLoc.push(pnt1);
    sLoc.push(pnt2);
    sLoc.push(pnt3);
    sLoc.push(pnt4);
    sLoc.push(pnt5);
    sLoc.push(pnt6);
    sLoc.push(pnt7);
    var sBezier = MilStd.commonFun.getBSplinePoints(sLoc, 2);

    //绘制十字箭头
    var locImg = new Array();
    var loc22 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    locImg.push(loc22);
    var loc23 = [arg1[0][0] + width / 32 * 18, arg1[0][1] - height / 16 * 4];
    locImg.push(loc23);
    var loc24 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16 * 4];
    locImg.push(loc24);
    var loc25 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 32 * 15];
    locImg.push(loc25);
    var loc26 = [arg1[0][0] + width / 16 * 12, arg1[0][1] - height / 32 * 15];
    locImg.push(loc26);
    var loc27 = [arg1[0][0] + width / 16 * 12, arg1[0][1] - height / 32 * 14];
    locImg.push(loc27);
    var loc28 = [arg1[0][0] + width / 16 * 14, arg1[0][1] - height / 2];
    locImg.push(loc28);
    var loc29 = [arg1[0][0] + width / 16 * 12, arg1[0][1] - height / 32 * 18];
    locImg.push(loc29);
    var loc30 = [arg1[0][0] + width / 16 * 12, arg1[0][1] - height / 32 * 17];
    locImg.push(loc30);
    var loc31 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 32 * 17];
    locImg.push(loc31);
    var loc32 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16 * 12];
    locImg.push(loc32);
    var loc33 = [arg1[0][0] + width / 32 * 18, arg1[0][1] - height / 16 * 12];
    locImg.push(loc33);
    var loc34 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 14];
    locImg.push(loc34);
    var loc35 = [arg1[0][0] + width / 32 * 14, arg1[0][1] - height / 16 * 12];
    locImg.push(loc35);
    var loc36 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16 * 12];
    locImg.push(loc36);
    var loc37 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 32 * 17];
    locImg.push(loc37);
    var loc38 = [arg1[0][0] + width / 16 * 4, arg1[0][1] - height / 32 * 17];
    locImg.push(loc38);
    var loc39 = [arg1[0][0] + width / 16 * 4, arg1[0][1] - height / 32 * 18];
    locImg.push(loc39);
    var loc40 = [arg1[0][0] + width / 16 * 2, arg1[0][1] - height / 2];
    locImg.push(loc40);
    var loc41 = [arg1[0][0] + width / 16 * 4, arg1[0][1] - height / 32 * 14];
    locImg.push(loc41);
    var loc42 = [arg1[0][0] + width / 16 * 4, arg1[0][1] - height / 32 * 15];
    locImg.push(loc42);
    var loc43 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 32 * 15];
    locImg.push(loc43);
    var loc44 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16 * 4];
    locImg.push(loc44);
    var loc45 = [arg1[0][0] + width / 32 * 14, arg1[0][1] - height / 16 * 4];
    locImg.push(loc45);

    locImg.push(loc22);

    var locArr = new Array();
    for (var i = 0; i < 5; i++) {
        locArr[i] = new Array();
    }
    locArr[0].push(locN);
    locArr[1].push(locW);
    locArr[2].push(locE);
    locArr[3].push(sBezier);
    locArr[4].push(locImg);

    return locArr;
};

/**
* Method: GetCircleClosedangleDots
* 根据控制点数组，获取组成圆形尖角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，圆形尖角由4部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetCircleClosedangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }

    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;
    var loc5 = new Array();

    //绘制N
    loc1 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16];
    loc5.push(loc1);
    loc2 = [arg1[0][0] + width / 32 * 15, arg1[0][1]];
    loc5.push(loc2);
    loc3 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16];
    loc5.push(loc3);
    loc4 = [arg1[0][0] + width / 32 * 17, arg1[0][1]];
    loc5.push(loc4);



    //绘制菱形
    var loc6 = null;
    var loc7 = null;
    var loc8 = null;
    var loc9 = null;
    var loc10 = null;

    var loc11 = new Array();
    loc6 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc11.push(loc6);
    loc7 = [arg1[0][0] + width / 64 * 15, arg1[0][1] - height];
    loc11.push(loc7);
    loc8 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 32 * 28];
    loc11.push(loc8);
    loc9 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 32 * 28];
    loc11.push(loc9);
    loc10 = [arg1[0][0] + width / 64 * 49, arg1[0][1] - height];
    loc11.push(loc10);
    loc11.push(loc6);

    //绘制横线
    var loc12 = null;
    var loc13 = null;
    var loc14 = new Array();
    var len1 = arg1[0][0] + width / 2 - height / 20 * 9;
    var len2 = arg1[0][0] + width / 2 + height / 20 * 9;

    loc12 = [len1, arg1[0][1] - height / 16 * 9];
    loc13 = [len2, arg1[0][1] - height / 16 * 9];

    loc14.push(loc12);
    loc14.push(loc13);

    //绘制圆
    var loc16 = null;
    var loc17 = null;
    var loc18 = 0;
    var loc19 = 0;
    var loc20 = 0;
    var loc21 = 0;
    var loc22 = 0;
    var loc23 = new Array();
    var loc24 = 0;

    loc16 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 9];
    loc17 = [arg1[0][0] + width / 2, arg1[0][1] - height / 5 * 1];
    loc18 = MilStd.commonFun.CalLengthOfTwoPoints(loc16, loc17);
    while (loc24 < 500) {
        loc19 = Math.sin(Math.PI * 2 * loc24 / 500);
        loc20 = Math.cos(Math.PI * 2 * loc24 / 500);
        loc21 = loc16[0] + loc18 * loc19;
        loc22 = loc16[1] + loc18 * loc20;
        loc23.push([loc21, loc22]);
        ++loc24;
    }
    loc23.push(loc23[0]);

    var loc25 = new Array();
    for (var i = 0; i < 4; i++) {
        loc25[i] = new Array();
    }
    loc25[0].push(loc5);
    loc25[1].push(loc14);
    loc25[2].push(loc23);
    loc25[3].push(loc11);

    return loc25;
};

/**
* Method: GetClosedangleDots
* 根据控制点数组，获取组成尖角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，尖角指北针由2部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetClosedangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var loc4 = new Array();
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = [arg1[0][0] + width / 2, arg1[0][1]];
    loc4.push(loc1);
    var loc2 = [arg1[0][0] + width, arg1[0][1] - height];
    loc4.push(loc2);
    var loc3 = [arg1[0][0] + width / 2, arg1[0][1] - height / 4 * 3];
    loc4.push(loc3);

    var loc8 = new Array();
    var loc5 = [arg1[0][0] + width / 2, arg1[0][1]];
    loc8.push(loc5);
    var loc6 = [arg1[0][0], arg1[0][1] - height];
    loc8.push(loc6);
    var loc7 = [arg1[0][0] + width / 2, arg1[0][1] - height / 4 * 3];
    loc8.push(loc7);

    var loc9 = new Array();
    for (var i = 0; i < 2; i++) {
        loc9[i] = new Array();
    }
    loc9[0].push(loc4);
    loc9[1].push(loc8);

    return loc9;
};

/**
* Method: GetDoubleClosedangleDots
* 根据控制点数组，获取组成双向尖角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，双向尖角指北针由4部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetDoubleClosedangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;

    var loc5 = new Array();

    //绘制N
    loc1 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16];
    loc5.push(loc1);
    loc2 = [arg1[0][0] + width / 32 * 15, arg1[0][1]];
    loc5.push(loc2);
    loc3 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16];
    loc5.push(loc3);
    loc4 = [arg1[0][0] + width / 32 * 17, arg1[0][1]];
    loc5.push(loc4);

    //绘制菱形
    var loc6 = null;
    var loc7 = null;
    var loc8 = null;
    var loc9 = null;
    var loc10 = null;
    var loc11 = new Array();
    loc6 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc11.push(loc6);
    loc7 = [arg1[0][0], arg1[0][1] - height / 10 * 7];
    loc11.push(loc7);
    loc8 = [arg1[0][0] + width / 32 * 13, arg1[0][1] - height / 32 * 18];
    loc11.push(loc8);
    loc9 = [arg1[0][0] + width / 32 * 19, arg1[0][1] - height / 32 * 18];
    loc11.push(loc9);
    loc10 = [arg1[0][0] + width, arg1[0][1] - height / 10 * 7];
    loc11.push(loc10);
    loc11.push(loc6);
    //绘制相反方向的菱形
    var loc12 = null;
    var loc13 = null;
    var loc14 = null;
    var loc15 = null;
    var loc16 = new Array();
    loc12 = [arg1[0][0], arg1[0][1] - height / 10 * 3];
    loc16.push(loc12);
    loc13 = [arg1[0][0] + width / 2, arg1[0][1] - height / 8 * 7];
    loc16.push(loc13);
    loc14 = [arg1[0][0] + width, arg1[0][1] - height / 10 * 3];
    loc16.push(loc14);
    loc15 = [arg1[0][0] + width / 2, arg1[0][1] - height / 10 * 7];
    loc16.push(loc15);
    loc16.push(loc12);

    //绘制字母“S”
    var pnt4 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32];
    var pnt1 = [arg1[0][0] + width / 2 + width / 32, arg1[1][1] + height / 32 + height / 64];
    var pnt3 = [arg1[0][0] + width / 2 + width / 32 - 2 * width / 32, arg1[1][1] + height / 32 + height / 64];
    var pnt2 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32 + height / 32];
    var pnt6 = [arg1[0][0] + width / 2, arg1[1][1] + height / 32 - height / 32];
    var pnt5 = [arg1[0][0] + width / 2 + width / 32, arg1[1][1] + height / 32 + height / 64 - height / 32];
    var pnt7 = [arg1[0][0] + width / 2 + width / 32 - width / 16, arg1[1][1] + height / 32 + height / 64 - height / 32];
    var sLoc = new Array();
    sLoc.push(pnt1);
    sLoc.push(pnt2);
    sLoc.push(pnt3);
    sLoc.push(pnt4);
    sLoc.push(pnt5);
    sLoc.push(pnt6);
    sLoc.push(pnt7);
    var sBezier = MilStd.commonFun.getBSplinePoints(sLoc, 2);


    var loc23 = new Array();
    for (var i = 0; i < 4; i++) {
        loc23[i] = new Array();
    }
    loc23[0].push(loc5);
    loc23[1].push(sBezier);
    loc23[2].push(loc16);
    loc23[3].push(loc11);

    return loc23;
};

/**
* Method: GetFourstarDots
* 根据控制点数组，获取组成四角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，四角指北针由4部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetFourstarDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;
    var loc5 = new Array();
    loc1 = [arg1[0][0] + width / 2, arg1[0][1]];
    loc5.push(loc1);
    loc2 = [arg1[0][0] + width / 2, arg1[0][1] - height];
    loc5.push(loc2);
    loc3 = [arg1[0][0] + width / 8 * 3, arg1[0][1] - height / 8 * 5];
    loc5.push(loc3);
    loc4 = [arg1[0][0] + width / 8 * 5, arg1[0][1] - height / 8 * 3];
    loc5.push(loc4);
    loc5.push(loc1);

    var loc6 = null;
    var loc7 = null;
    var loc8 = new Array();
    loc6 = [arg1[0][0], arg1[0][1] - height / 2];
    loc8.push(loc6);
    loc7 = [arg1[0][0] + width, arg1[0][1] - height / 2];
    loc8.push(loc7);
    loc8.push(loc4);
    loc8.push(loc3);
    loc8.push(loc6);

    var loc9 = null;
    var loc10 = null;
    var loc11 = new Array();
    loc11.push(loc6);
    loc11.push(loc7);
    loc9 = [arg1[0][0] + width / 8 * 5, arg1[0][1] - height / 8 * 5];
    loc11.push(loc9);
    loc10 = [arg1[0][0] + width / 8 * 3, arg1[0][1] - height / 8 * 3];
    loc11.push(loc10);
    loc11.push(loc6);

    var loc12 = new Array();
    loc12.push(loc1);
    loc12.push(loc2);
    loc12.push(loc9);
    loc12.push(loc10);


    var loc13 = new Array();
    for (var i = 0; i < 4; i++) {
        loc13[i] = new Array();
    }
    loc13[0].push(loc5);
    loc13[1].push(loc8);
    loc13[2].push(loc11);
    loc13[3].push(loc12);

    return loc13;
};

/**
* Method: GetRhombusDots
* 根据控制点数组，获取组成菱形指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，菱形指北针由3部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetRhombusDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;
    var loc5 = new Array();
    var loc6 = new Array();

    var loc8 = null;
    var loc9 = null;
    var loc10 = null;
    var loc11 = null;
    var loc12 = new Array();

    loc1 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc5.push(loc1);
    loc2 = [arg1[0][0], arg1[0][1] - height / 16 * 9];
    loc5.push(loc2);
    loc3 = [arg1[0][0] + width, arg1[0][1] - height / 16 * 9];
    loc5.push(loc3);
    loc5.push(loc1);

    loc4 = [arg1[0][0] + width / 2, arg1[1][1]];
    loc6.push(loc3);
    loc6.push(loc4);
    loc6.push(loc2);
    //2017.1.19修改
    loc6.push(loc3);

    loc8 = [(arg1[0][0] + width / 32 * 13), arg1[0][1] - height / 16 * 1];
    loc12.push(loc8);
    loc9 = [(arg1[0][0] + width / 32 * 13), arg1[0][1]];
    loc12.push(loc9);
    loc10 = [arg1[0][0] + width / 32 * 19, arg1[0][1] - height / 16 * 1];
    loc12.push(loc10);
    loc11 = [arg1[0][0] + width / 32 * 19, arg1[0][1]];
    loc12.push(loc11);
    var loc7 = new Array();
    for (var i = 0; i < 3; i++) {
        loc7[i] = new Array();
    }
    loc7[0].push(loc5);
    loc7[1].push(loc12);
    loc7[2].push(loc6);

    return loc7;
};

/**
* Method: GetSameDirectionClosedangleDots
* 根据控制点数组，获取组成同向尖角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，同向尖角指北针由3部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetSameDirectionClosedangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }

    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = [arg1[0][0] + width / 32 * 15, arg1[0][1]];
    var loc2 = [arg1[0][0], arg1[0][1] - height / 16 * 13];
    var loc3 = [arg1[0][0] + width / 32 * 15, arg1[0][1] - height / 16 * 11];
    var loc4 = [arg1[0][0] + width / 16 * 15, arg1[0][1] - height / 16 * 13];
    var loc5 = new Array();
    loc5.push(loc1);
    loc5.push(loc2);
    loc5.push(loc3);
    loc5.push(loc4);
    loc5.push(loc1);

    var loc6 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 32 * 1];
    var loc7 = [arg1[0][0] + width / 16, arg1[0][1] - height / 32 * 27];
    var loc8 = [arg1[0][0] + width / 32 * 17, arg1[0][1] - height / 16 * 12];
    var loc9 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 27];
    var loc10 = new Array();
    loc10.push(loc6);
    loc10.push(loc7);
    loc10.push(loc8);
    loc10.push(loc9);

    //绘制N
    var loc11 = [arg1[0][0] + width / 32 * 14, arg1[0][1] - height];
    var loc12 = [arg1[0][0] + width / 32 * 14, arg1[0][1] - height / 16 * 15];
    var loc13 = [arg1[0][0] + width / 32 * 18, arg1[0][1] - height];
    var loc14 = [arg1[0][0] + width / 32 * 18, arg1[0][1] - height / 16 * 15];
    var loc15 = new Array();
    loc15.push(loc11);
    loc15.push(loc12);
    loc15.push(loc13);
    loc15.push(loc14);


    var loc16 = new Array();
    for (var i = 0; i < 3; i++) {
        loc16[i] = new Array();
    }
    loc16[0].push(loc5);
    loc16[1].push(loc15);
    loc16[2].push(loc10);

    return loc16;
};

/**
* Method: GetTriangleDots
* 根据控制点数组，获取组成三角指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，三角指北针由6部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetTriangleDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }
    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var locN = new Array();
    var loc1 = [arg1[0][0] + width / 32 * 13, arg1[0][1] - height / 16 * 1];
    locN.push(loc1);
    var loc2 = [arg1[0][0] + width / 32 * 13, arg1[0][1]];
    locN.push(loc2);
    var loc3 = [arg1[0][0] + width / 32 * 19, arg1[0][1] - height / 16 * 1];
    locN.push(loc3);
    var loc4 = [arg1[0][0] + width / 32 * 19, arg1[0][1]];
    locN.push(loc4);

    var loc11 = new Array();
    var loc5 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc11.push(loc5);
    var loc6 = [arg1[0][0], arg1[0][1] - height / 32 * 17];
    loc11.push(loc6);
    var loc7 = [arg1[0][0] + width / 2, arg1[0][1] - height / 32 * 17];
    loc11.push(loc7);

    var loc12 = new Array();
    var loc8 = [arg1[0][0] + width / 2, arg1[0][1] - height / 16 * 2];
    loc12.push(loc8);
    var loc9 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 17];
    loc12.push(loc9);
    var loc10 = [arg1[0][0] + width / 2, arg1[0][1] - height / 32 * 17];
    loc12.push(loc10);

    var loc15 = new Array();
    var loc13 = [arg1[0][0], arg1[0][1] - height / 32 * 18];
    loc15.push(loc13);
    var loc14 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 18];
    loc15.push(loc14);

    var loc19 = new Array();
    var loc16 = [arg1[0][0] + width / 2, arg1[0][1] - height];
    loc19.push(loc16);
    var loc17 = [arg1[0][0], arg1[0][1] - height / 32 * 19];
    loc19.push(loc17);
    var loc18 = [arg1[0][0] + width / 2, arg1[0][1] - height / 32 * 19];
    loc19.push(loc18);

    var loc20 = [arg1[0][0] + width, arg1[0][1] - height / 32 * 19];
    var loc21 = new Array();
    loc21.push(loc18);
    loc21.push(loc20);
    loc21.push(loc16);

    var loc22 = new Array();
    for (var i = 0; i < 6; i++) {
        loc22[i] = new Array();
    }
    loc22[0].push(locN);
    loc22[1].push(loc11);
    loc22[2].push(loc12);
    loc22[3].push(loc15);
    loc22[4].push(loc19);
    loc22[5].push(loc21);

    return loc22;
};

/**
* Method: GetVaneDots
* 根据控制点数组，获取组成风向标指北针的二维点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<Array.<ol.Coordinate>>：二维点数组，风向标指北针由11部分组成，每一部分的用一个点数组存储}
*/
MilStd.Compass.GetVaneDots = function (arg1) {
    if (arg1 == null || arg1.length < 2) {
        return null;
    }

    var width = Math.abs(arg1[1][0] - arg1[0][0]);
    var height = Math.abs(arg1[1][1] - arg1[0][1]);
    var loc1 = null;
    var loc2 = null;
    var loc3 = null;
    var loc4 = null;
    var loc5 = new Array();
    var loc6 = new Array();

    //菱形 
    loc1 = [arg1[0][0] + width / 2, arg1[0][1]];
    loc2 = [arg1[0][0], arg1[0][1] - height / 8];
    loc3 = [arg1[0][0] + width / 2, arg1[0][1] - height / 8 * 2];
    loc4 = [arg1[0][0] + width, arg1[0][1] - height / 8];
    loc5.push(loc1);
    loc5.push(loc2);
    loc5.push(loc3);
    loc6.push(loc1);
    loc6.push(loc3);
    loc6.push(loc4);
    loc6.push(loc1);
    //矩形	
    var loc7 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 8 * 2];
    var loc8 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height];
    var loc9 = [arg1[0][0] + width / 28 * 13, arg1[0][1] - height / 35 * 34];
    var loc10 = [arg1[0][0] + width / 28 * 15, arg1[0][1] - height / 35 * 34];
    var loc11 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height];
    var loc12 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 8 * 2];
    var loc13 = new Array();
    loc13.push(loc7);
    loc13.push(loc8);
    loc13.push(loc9);
    loc13.push(loc10);
    loc13.push(loc11);
    loc13.push(loc12);
    //两侧小矩形	
    var loc46 = new Array();
    var loc14 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 21];
    loc46.push(loc14);
    var loc15 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 22];
    loc46.push(loc15);
    var loc16 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 23];
    loc46.push(loc16);
    var loc17 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 22];
    loc46.push(loc17);

    var loc47 = new Array();
    var loc18 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 23];
    var loc19 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 24];
    var loc20 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 25];
    var loc21 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 24];
    loc47.push(loc18);
    loc47.push(loc19);
    loc47.push(loc20);
    loc47.push(loc21);

    var loc48 = new Array();
    var loc22 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 25];
    var loc23 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 26];
    var loc24 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 27];
    var loc25 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 26];
    loc48.push(loc22);
    loc48.push(loc23);
    loc48.push(loc24);
    loc48.push(loc25);

    var loc49 = new Array();
    var loc26 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 27];
    var loc27 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 28];
    var loc28 = [arg1[0][0] + width / 14 * 2, arg1[0][1] - height / 36 * 29];
    var loc29 = [arg1[0][0] + width / 14 * 6, arg1[0][1] - height / 36 * 28];
    loc49.push(loc26);
    loc49.push(loc27);
    loc49.push(loc28);
    loc49.push(loc29);

    var loc50 = new Array();
    var loc30 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 21];
    var loc31 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 22];
    var loc32 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 23];
    var loc33 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 22];
    loc50.push(loc30);
    loc50.push(loc31);
    loc50.push(loc32);
    loc50.push(loc33);

    var loc51 = new Array();
    var loc34 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 23];
    var loc35 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 24];
    var loc36 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 25];
    var loc37 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 24];
    loc51.push(loc34);
    loc51.push(loc35);
    loc51.push(loc36);
    loc51.push(loc37);

    var loc52 = new Array();
    var loc38 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 25];
    var loc39 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 26];
    var loc40 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 27];
    var loc41 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 26];
    loc52.push(loc38);
    loc52.push(loc39);
    loc52.push(loc40);
    loc52.push(loc41);

    var loc53 = new Array();
    var loc42 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 27];
    var loc43 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 28];
    var loc44 = [arg1[0][0] + width / 14 * 12, arg1[0][1] - height / 36 * 29];
    var loc45 = [arg1[0][0] + width / 14 * 8, arg1[0][1] - height / 36 * 28];
    loc53.push(loc42);
    loc53.push(loc43);
    loc53.push(loc44);
    loc53.push(loc45);

    var loc54 = new Array();
    for (var i = 0; i < 11; i++) {
        loc54[i] = new Array();
    }
    loc54[0].push(loc5);
    loc54[1].push(loc13);
    loc54[2].push(loc46);
    loc54[3].push(loc47);
    loc54[4].push(loc48);
    loc54[5].push(loc49);
    loc54[6].push(loc50);
    loc54[7].push(loc51);
    loc54[8].push(loc52);
    loc54[9].push(loc53);
    loc54[10].push(loc6);

    return loc54;

};

/**********************************************************贝赛尔曲线以及贝塞尔曲线成区的算法（Bezier）start************************************************/
/* * 
* 该类实现了贝赛尔曲线意义贝塞尔曲线成区的算法
* 说明：
* "Bezier":            //贝塞尔曲线成区
* "BezierLine":        //贝塞尔曲线
*/
goog.provide("MilStd.Bezier");

/**
* Method: getBezierFromVert
* 根据贝塞尔类型和控制点，获取组成该类型贝塞尔的点数组
* Parameters:
* arg-{Array.<ol.Coordinate>:控制点数组}
* bazierType-{string:贝塞尔类型（Bezier、BezierLine）} 
* Returns:
* geom-{Array.<ol.geom.Geometry>:构建贝塞尔的几何图形数组}
*/
MilStd.Bezier.getBezierFromVert = function (arg, bazierType) {
    var geom = null;
    if (bazierType == "BezierLine") {
        var dots = MilStd.commonFun.getBSplinePoints(arg, 2);
        geom = new ol.geom.LineString(dots);
    }
    else if (bazierType == "Bezier") {
        arg.push(arg[0]);
        var dots = MilStd.commonFun.getBSplinePoints(arg, 2);
        arg.pop(arg[arg.length - 1]);
        geom = new ol.geom.Polygon([dots]);
    }
    else if (bazierType == "AssemblyArea") {
        var dots = MilStd.Bezier.GetAssemblyAreaDots(arg);
        geom = new ol.geom.Polygon([dots]);
    }
    return geom;
};

/**
* Method: GetAssemblyAreaDots
* 根据控制点数组，获取组成集结区的点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<ol.Coordinate>：组成集结区的点数组}
*/
MilStd.Bezier.GetAssemblyAreaDots = function (arg1) {
    var loc2 = null;
    var loc3 = null;
    var loc4 = 0;
    var loc5 = null;
    var loc6 = null;
    var loc7 = null;
    var loc8 = null;
    var loc9 = null;
    var loc10 = null;
    var loc11 = null;
    var loc12 = null;
    var loc13 = null;
    var loc14 = null;
    var loc1 = arg1.length;
    if (loc1 >= 2 && !(arg1[loc1 - 1] == arg1[loc1 - 2])) {
        loc2 = arg1[0];
        loc3 = arg1[1];
        loc4 = MilStd.commonFun.CalLengthOfTwoPoints(loc2, loc3);
        loc5 = MilStd.commonFun.getMidPoint(loc2, loc3);
        loc6 = MilStd.commonFun.getThirdPoint(loc2, loc5, Math.PI * 1.5, loc4 / 4.5, "right");
        loc7 = MilStd.commonFun.getThirdPoint(loc2, loc3, 0, loc4 * 0.8, "left");
        loc8 = MilStd.commonFun.getThirdPoint(loc2, loc7, Math.PI * 1.5, loc4 / 5, "left");
        loc9 = MilStd.commonFun.getThirdPoint(loc2, loc3, 0, loc4 * 0.45, "left");
        loc10 = MilStd.commonFun.getThirdPoint(loc2, loc9, Math.PI * 1.5, loc4 / 10, "left");
        loc11 = MilStd.commonFun.getThirdPoint(loc2, loc3, 0, loc4 * 0.15, "left");
        loc12 = MilStd.commonFun.getThirdPoint(loc2, loc11, Math.PI * 1.5, loc4 / 7, "left");
        loc13 = new Array();
        loc14 = new Array();
        loc14.push(loc2, loc6, loc3, loc12, loc10, loc8);
        loc13 = MilStd.Bezier.getAdvancedBezierPoints(loc14);
    }
    return loc13;
};

/**
* Method: getAdvancedBezierPoints
* 根据控制点数组，获取组成集结区的点数组
* Parameters:
* arg1-{Array.<ol.Coordinate>:控制点数组}
* Returns:
* locArr-{Array.<ol.Coordinate>：组成集结区的贝塞尔点数组}
*/
MilStd.Bezier.getAdvancedBezierPoints = function (arg1) {
    var loc8 = 0;
    var loc9 = 0;
    var loc10 = 0;
    var loc11 = 0;
    var loc12 = 0;
    var loc13 = 0;
    arg1 = arg1.slice();
    var loc1 = arg1.length;
    arg1.push(arg1[0]);
    var loc2 = new Array();
    var loc3 = 0;
    while (loc3 < loc1) {
        loc2.push(MilStd.commonFun.getMidPoint(arg1[loc3], arg1[loc3 + 1]));
        ++loc3;
    }
    loc2.push(loc2[0]);
    arg1.push(arg1[1]);
    var loc4 = new Array();
    loc3 = 0;
    while (loc3 < loc1) {
        loc8 = MilStd.commonFun.CalLengthOfTwoPoints(arg1[loc3], arg1[loc3 + 1]);
        loc9 = MilStd.commonFun.CalLengthOfTwoPoints(arg1[loc3 + 1], arg1[loc3 + 2]);
        loc10 = MilStd.commonFun.CalLengthOfTwoPoints(loc2[loc3], loc2[loc3 + 1]);
        loc11 = loc10 * loc8 / (loc8 + loc9);
        loc4.push(MilStd.commonFun.getThirdPoint(loc2[loc3 + 1], loc2[loc3], 0, loc11, "left"));
        ++loc3;
    }
    var loc5 = new Array();
    loc3 = 0;
    while (loc3 < loc1) {
        loc12 = arg1[loc3 + 1][0] - loc4[loc3][0];
        loc13 = arg1[loc3 + 1][1] - loc4[loc3][1];

        loc5.push([loc2[loc3][0] + loc12, loc2[loc3][1] + loc13]);
        loc5.push(arg1[loc3 + 1]);
        loc5.push([loc2[loc3 + 1][0] + loc12, loc2[loc3 + 1][1] + loc13]);
        ++loc3;
    }
    var loc6 = new Array();
    var loc7 = loc5.slice();
    loc7.push(loc5[0], loc5[1]);
    loc3 = 1;
    while (loc3 < loc7.length) {
        loc6 = loc6.concat(MilStd.commonFun.getBezierPoints(loc7.slice(loc3, loc3 + 4)));
        loc3 = loc3 + 3;
    }
    return loc6;
};

/**********************************************************扩展图形绘制和更新基本入口（MilStdGeomtry）start************************************************/
goog.provide("MilStd.MilStdGeomtry");

MilStd.MilStdGeomtry = function (verticePnts, miltype, milStdParams, opt_options) {
    ol.geom.GeometryCollection.call(this, []);
    if (verticePnts === undefined || verticePnts == null) {
        return;
    }
    var options;
    if (opt_options !== undefined && opt_options == null) {

        ol.geom.GeometryCollection.call(this, opt_options);
    }
    this.vertices = verticePnts;
    this.milStdType = miltype;
    this.milStdParams = (milStdParams !== undefined && milStdParams != null) ? milStdParams : new MilStd.MilstdParams();
    if (this.milStdType == MilStd.EnumMilstdType.TriangleFlag || this.milStdType == MilStd.EnumMilstdType.RectFlag ||
        this.milStdType == MilStd.EnumMilstdType.CurveFlag || this.milStdType == MilStd.EnumMilstdType.ArrowCross ||
        this.milStdType == MilStd.EnumMilstdType.CircleClosedangle || this.milStdType == MilStd.EnumMilstdType.Closedangle ||
        this.milStdType == MilStd.EnumMilstdType.DoubleClosedangle || this.milStdType == MilStd.EnumMilstdType.Fourstar ||
        this.milStdType == MilStd.EnumMilstdType.Rhombus || this.milStdType == MilStd.EnumMilstdType.SameDirectionClosedangle ||
        this.milStdType == MilStd.EnumMilstdType.Triangle || this.milStdType == MilStd.EnumMilstdType.Vane ||
        this.milStdType == MilStd.EnumMilstdType.AssemblyArea) {
        this.milStdParams.maxVertices = 2;
    }
    if (this.milStdType == MilStd.EnumMilstdType.DoubleArrow) {
        this.milStdParams.maxVertices = 4;
    }
};
ol.inherits(MilStd.MilStdGeomtry, ol.geom.GeometryCollection);

MilStd.MilStdGeomtry.prototype.Create = function () {
    if (this.milStdType == "DoubleArrow") {
        if (this.vertices.length < 3) {
            return;
        };
    }
    else {
        if (this.vertices.length < 2) {
            return;
        };
    }
    switch (this.milStdType) {
        case MilStd.EnumMilstdType.SimpleArrow:
        case MilStd.EnumMilstdType.StraightArrow:
        case MilStd.EnumMilstdType.DoubleArrow:
        case MilStd.EnumMilstdType.SingleLineArrow:
            var geom = MilStd.Arrow.getArrowFromVert(this.vertices, this.milStdType, this.milStdParams);
            this.setGeometriesArray([geom]);
            break;
        case MilStd.EnumMilstdType.TriangleFlag:
        case MilStd.EnumMilstdType.RectFlag:
        case MilStd.EnumMilstdType.CurveFlag:
            var geomArr = MilStd.Flag.getFlagFromVert(this.vertices, this.milStdType);
            this.setGeometriesArray(geomArr);
            break;
        case MilStd.EnumMilstdType.ArrowCross:
        case MilStd.EnumMilstdType.CircleClosedangle:
        case MilStd.EnumMilstdType.Closedangle:
        case MilStd.EnumMilstdType.DoubleClosedangle:
        case MilStd.EnumMilstdType.Fourstar:
        case MilStd.EnumMilstdType.Rhombus:
        case MilStd.EnumMilstdType.SameDirectionClosedangle:
        case MilStd.EnumMilstdType.Triangle:
        case MilStd.EnumMilstdType.Vane:
            var geomArr = MilStd.Compass.getCompassFromVert(this.vertices, this.milStdType);
            this.setGeometriesArray(geomArr);
            break;
        case MilStd.EnumMilstdType.Bezier:
        case MilStd.EnumMilstdType.BezierLine:
        case MilStd.EnumMilstdType.AssemblyArea:
            //var geom = MilStd.Bezier.getBezierFromVert(this.vertices, this.milStdType);
            var geom = MilStd.Compass.getBezierFromVert(this.vertices, this.milStdType);
            this.setGeometriesArray([geom]);
            break;
    }
};

MilStd.MilStdGeomtry.prototype.Update = function (vertices, isMouseMove) {
    if (this.milStdType == "DoubleArrow") {
        if (vertices.length < 3) {
            return;
        };
    }
    else {
        if (vertices.length < 2) {
            return;
        };
    }

    if (!isMouseMove) {
        this.vertices = vertices;
    }

    switch (this.milStdType) {
        case MilStd.EnumMilstdType.SimpleArrow:
        case MilStd.EnumMilstdType.StraightArrow:
        case MilStd.EnumMilstdType.DoubleArrow:
        case MilStd.EnumMilstdType.SingleLineArrow:
            var geom = MilStd.Arrow.getArrowFromVert(vertices, this.milStdType, this.milStdParams);
            this.setGeometriesArray([geom]);
            break;
        case MilStd.EnumMilstdType.TriangleFlag:
        case MilStd.EnumMilstdType.RectFlag:
        case MilStd.EnumMilstdType.CurveFlag:
            var geomArr = MilStd.Flag.getFlagFromVert(vertices, this.milStdType);
            this.setGeometriesArray(geomArr);
            break;
        case MilStd.EnumMilstdType.ArrowCross:
        case MilStd.EnumMilstdType.CircleClosedangle:
        case MilStd.EnumMilstdType.Closedangle:
        case MilStd.EnumMilstdType.DoubleClosedangle:
        case MilStd.EnumMilstdType.Fourstar:
        case MilStd.EnumMilstdType.Rhombus:
        case MilStd.EnumMilstdType.SameDirectionClosedangle:
        case MilStd.EnumMilstdType.Triangle:
        case MilStd.EnumMilstdType.Vane:
            var geomArr = MilStd.Compass.getCompassFromVert(vertices, this.milStdType);
            this.setGeometriesArray(geomArr);
            break;
        case MilStd.EnumMilstdType.Bezier:
        case MilStd.EnumMilstdType.BezierLine:
        case MilStd.EnumMilstdType.AssemblyArea:
            var geom = MilStd.Bezier.getBezierFromVert(vertices, this.milStdType);
            this.setGeometriesArray([geom]);
            break;
    }
};

goog.provide("MilStd.event.MilStdDrawEvent");

/**
* @classdesc
* 军标绘制事件：绘制开始、绘制结束
* @constructor
* @extends {ol.events.Event}
* @param {ZondyMilStd.EnumMilstdType} etype.
* @param {ol.Feature} feature.
* @return 
*/
MilStd.event.MilStdDrawEvent = function (etype, feature) {
    ol.events.Event.call(this, etype);
    this.feature = feature !== undefined ? feature : null;
};
ol.inherits(MilStd.event.MilStdDrawEvent, ol.events.Event);

MilStd.event.MilStdDrawEvent.DRAW_START = "draw_start";  //开始绘制
MilStd.event.MilStdDrawEvent.DRAW_END = "draw_end";      //结束绘制
MilStd.event.MilStdDrawEvent.MODIFY_FEATURE_END = "modify_one_feature";  //修改完成一个要素

goog.provide("MilStd.tool.MilStdDrawTool");

/**
* @classdesc
* 军标绘制工具
* @constructor
* @extends {ol.Observable}
* @param {ol.Map} map.
* @return 
*/
MilStd.tool.MilStdDrawTool = function (map) {
    ol.Observable.call(this, []);
    this.vertices = null;        //军标控制点
    this.milStdGeom = null;      //军标几何
    this.feature = null;         //军标矢量要素
    this.milStdType = null;      //军标类型
    this.milStdParams = null;    //军标参数
    this.mapViewport = null;
    this.dbClickZoomEvent = null;
    this.map = map !== undefined ? map : null;
    this.featureName = null;
    var strock = new ol.style.Stroke({
        color: "#000000",
        width: 1.25
    });
    var fill = new ol.style.Fill({
        color: "rgba(0,0,0,0.4)"
    });

    //    var image = new ol.style.Icon({
    //        anchor: [0.5, 46],
    //        anchorXUnits: 'fraction',
    //        anchorYUnits: 'pixels',
    //        opacity: 0.75,
    //        src: '../lib/img/001.png'
    //    });
    this.style = new ol.style.Style({
        fill: fill,
        stroke: strock
        //image: image
    });
    //this.featureOverLay = new ol.layer.Vector({
    //    source:new ol.source.Vector({
    //        wrapX:false
    //    })
    //});
    //2017.1.19修改
    var featureOverlayTem = new ol.layer.Vector({
        source: new ol.source.Vector({
            useSpatialIndex: false,
            wrapX: false
        })
    });
    this.featureOverLay = featureOverlayTem;

    this.featureOverLay.setStyle(this.style);
    this.setMap(map);
};
ol.inherits(MilStd.tool.MilStdDrawTool, ol.Observable);

/**
* 设置工具的地图容器
* @param {ol.Map}map .
*/
MilStd.tool.MilStdDrawTool.prototype.setMap = function (map) {
    if (map !== undefined && map != null) {
        this.map = map;
        this.mapViewport = this.map.getViewport();
    }
};

/**
* 屏蔽DoubleClickZoom事件
* @param {} .
*/
MilStd.tool.MilStdDrawTool.prototype.ShieldDBClickZoomEvent = function (map) {
    var interActionArr = map.getInteractions();
    for (var i = 0, len = interActionArr.getLength() ; i < len; i++) {
        var item = interActionArr.item(i);
        if (item instanceof ol.interaction.DoubleClickZoom) {
            this.dbClickZoomEvent = item;
            interActionArr.remove(item);
            break;
        }
    }
};

/**
* 添加DoubleClickZoom交互事件
* @param {} .
*/
MilStd.tool.MilStdDrawTool.prototype.UnShieldDBClickZoomEvent = function (map) {
    if (this.dbClickZoomEvent != null) {
        map.getInteractions().push(this.dbClickZoomEvent);
        this.dbClickZoomEvent = null;
    }
};

MilStd.tool.MilStdDrawTool.prototype.activate = function (milType, milStdParams, name) {
    this.deactivate();
    this.ShieldDBClickZoomEvent(this.map);   //屏蔽DoubleClickZoom的监听
    // goog.events.listen(this.mapViewport, goog.events.EventType.CLICK, this.drawStartHandle, false, this);
    ol.events.listen(this.mapViewport, ol.events.EventType.CLICK, this.drawStartHandle, this);
    this.milStdType = milType;
    this.milStdParams = milStdParams;
    this.featureName = (name !== undefined && name != null) ? name : "draw";
    //this.map.addLayer(this.featureOverLay);
    //2017.1.19修改
    this.featureOverLay.setMap(this.map);
};

MilStd.tool.MilStdDrawTool.prototype.deactivate = function () {
    this.disconnectEventHandlers();
    //this.map.removeLayer(this.featureOverLay);
    //2017.1.19修改
    this.featureOverLay.setMap(null);

    this.vertices = [];
    this.milStdGeom = null;
    this.feature = null;
    this.UnShieldDBClickZoomEvent(this.map);
};

MilStd.tool.MilStdDrawTool.prototype.drawStartHandle = function (e) {
    var temPnt = this.map.getCoordinateFromPixel([e.clientX, e.clientY]);
    this.vertices.push(temPnt);
    this.milStdGeom = new MilStd.MilStdGeomtry(this.vertices, this.milStdType, this.milStdParams);
    this.featureOverLay.getSource().addFeature(new ol.Feature(new ol.geom.Point(temPnt)));
    ol.events.unlisten(this.mapViewport, ol.events.EventType.CLICK, this.drawStartHandle, this);
    ol.events.listen(this.mapViewport, ol.events.EventType.CLICK, this.drawContinueHandle, this);
    ol.events.listen(this.mapViewport, ol.events.EventType.DBLCLICK, this.drawEndHandle, this);
    ol.events.listen(this.mapViewport, ol.events.EventType.MOUSEMOVE, this.mouseMoveHandle, this);
};

MilStd.tool.MilStdDrawTool.prototype.drawContinueHandle = function (e) {
    var temPnt = this.map.getCoordinateFromPixel([e.clientX, e.clientY]);
    var len = MilStd.commonFun.CalLengthOfTwoPoints(temPnt, this.vertices[this.vertices.length - 1]);
    if (len < MilStd.enum.ZERO_TOLERANCE) {
        return;
    }
    this.vertices.push(temPnt);

    this.milStdGeom.Update(this.vertices, false);   //更新几何
    if (this.feature == null) {
        this.feature = new ol.Feature(this.milStdGeom);
        this.featureOverLay.getSource().addFeature(this.feature);
    }
    else {
        this.feature.setGeometry(this.milStdGeom);
    }

    //if (this.milStdGeom.vertices.length == this.milStdGeom.GetMaxVerticesNum()) {  //达到最大控制点数则终止
    if (this.milStdGeom.vertices.length == this.milStdGeom.milStdParams.maxVertices) {  //达到最大控制点数则终止
        this.drawEndHandle(e);
    }
};

MilStd.tool.MilStdDrawTool.prototype.drawEndHandle = function (e) {
    this.disconnectEventHandlers();
    e.preventDefault();
    this.clear();
};

MilStd.tool.MilStdDrawTool.prototype.mouseMoveHandle = function (e) {
    // var kkk = map.getEventPixel(e.getBrowserEvent());
    var temPnt = this.map.getCoordinateFromPixel([e.clientX, e.clientY]);
    var len = MilStd.commonFun.CalLengthOfTwoPoints(temPnt, this.vertices[this.vertices.length - 1]);
    if (len < MilStd.enum.ZERO_TOLERANCE) {
        return;
    }
    var pnts = this.vertices.concat([temPnt]);
    this.milStdGeom.Update(pnts, true);
    //var dots = this.milStdGeom.getCoordinates();

    if (this.feature == null) {
        this.feature = new ol.Feature(this.milStdGeom);
        this.featureOverLay.getSource().addFeature(this.feature);
    }
    else {
        this.feature.setGeometry(this.milStdGeom);
    }
    //this.feature.setGeometry(this.milStdGeom);
};

MilStd.tool.MilStdDrawTool.prototype.disconnectEventHandlers = function () {
    ol.events.unlisten(this.mapViewport, ol.events.EventType.CLICK, this.drawStartHandle, this);
    ol.events.unlisten(this.mapViewport, ol.events.EventType.CLICK, this.drawContinueHandle, this);
    ol.events.unlisten(this.mapViewport, ol.events.EventType.MOUSEMOVE, this.mouseMoveHandle, this);
    ol.events.unlisten(this.mapViewport, ol.events.EventType.DBLCLICK, this.drawEndHandle, this);
};

MilStd.tool.MilStdDrawTool.prototype.clear = function (opt_options) {
    this.feature.name = this.featureName;
    this.dispatchEvent(new MilStd.event.MilStdDrawEvent(MilStd.event.MilStdDrawEvent.DRAW_END, this.feature));
    this.featureOverLay.getSource().removeFeature(this.feature);
    this.UnShieldDBClickZoomEvent(this.map);
    //this.disconnectEventHandlers();
    //2017.1.19修改
    this.featureOverLay.setMap(null);
    //this.map.removeLayer(this.featureOverLay);
    this.vertices = [];
    this.milStdGeom = null;
    this.feature = null;
};﻿﻿﻿/**********************************************************图形修改（ModifyTool）start************************************************/
goog.provide('MilStd.ModifyTool');

/**
* @typedef {{depth: (Array.<number>|undefined),
*            feature: ol.Feature,
*            //geometry: ol.geom.SimpleGeometry,
*            index: (number|undefined),
*            segment: Array.<ol.Extent>}}
*/
ol.interaction.SegmentDataType;

/**
* @classdesc
* Interaction for modifying vector data.
*
* @constructor
* @extends {ol.interaction.Pointer}
* @param {olx.interaction.ModifyOptions} options Options.
* @api stable
*/
MilStd.ModifyTool = function (map, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    ol.interaction.Pointer.call(this, {
        handleDownEvent: MilStd.ModifyTool.handleDownEvent_,
        handleDragEvent: MilStd.ModifyTool.handleDragEvent_,
        handleEvent: MilStd.ModifyTool.handleEvent,
        handleUpEvent: MilStd.ModifyTool.handleUpEvent_,
        handleMoveEvent: MilStd.ModifyTool.handleMoveEvent
    });

    this.map_ = map;
    /**
    * Editing vertex.
    * @type {ol.Feature}
    * @private
    */
    this.vertexFeature_ = null;

    /**
    * @type {ol.Pixel}
    * @private
    */
    this.lastPixel_ = [0, 0];

    /**
    * Segment RTree for each layer
    * @type {Object.<*, ol.structs.RBush>}
    * @private
    */
    this.rBush_ = new ol.structs.RBush();

    /**
    * @type {number}
    * @private
    */
    this.pixelTolerance_ = (options.pixelTolerance !== undefined && options.pixelTolerance != null) ?
      options.pixelTolerance : 10;

    /**
    * @type {boolean}
    * @private
    */
    this.snappedToVertex_ = false;

    /**
    * @type {Array}
    * @private
    */
    this.dragSegments_ = null;

    this.oldVerticesFeature = new ol.Collection();

    /**
    * Draw overlay where are sketch features are drawn.
    * @type {ol.FeatureOverlay}
    * @private
    */
    //this.overlay_ = new ol.FeatureOverlay({
    //    //style: (options.style !== undefined) ? options.style :
    //    //MilStd.ModifyTool.getDefaultStyleFunction()
    //    style: options.style
    //});

    //this.overlay_ = new ol.layer.Vector({
    //    //source: new ol.source.Vector({
    //    //    useSpatialIndex: false,
    //    //    wrapX: !!options.wrapX
    //    //}),
    //    source: new ol.source.Vector({
    //        warpX:true
    //    }),
    //    style: (options.style !== undefined) ? options.style :
    //    MilStd.ModifyTool.getDefaultStyleFunction()

    //});

    //2017.1.19修改
    // this.featureOverLay = new ol.FeatureOverlay();

    this.overlay_ = new ol.layer.Vector({
        source: new ol.source.Vector({
            useSpatialIndex: false,
            wrapX: !!options.wrapX
        }),
        updateWhileAnimating: true,
        updateWhileInteracting: true
    });



    var olayerStyle = goog.isDef(options.style) ? options.style : MilStd.ModifyTool.getDefaultStyleFunction();
    this.overlay_.setStyle(olayerStyle);
    this.setMap(this.map_);

    /**
    * @const
    * @private
    * @type {Object.<string, function(ol.Feature, ol.geom.Geometry)> }
    */
    this.SEGMENT_WRITERS_ = {
        'Polygon': this.writeVerticeGeometry,
        'MultiLineString': this.writeVerticeGeometry,
        'LineString': this.writeVerticeGeometry
    };
    this.selectTool = null;
    /**
    * @type {ol.Collection.<ol.Feature>}
    * @private
    */
    this.features_ = (options.features !== undefined) ? options.features : null;

    /**
    * @type {string|undefined}
    * @private
    */
    this.cursor_ = 'pointer';

    //this.modifyTool_ = this;
    /**
    * @type {string|undefined}
    * @private
    */
    this.previousCursor_ = undefined;

};
ol.inherits(MilStd.ModifyTool, ol.interaction.Pointer);



MilStd.ModifyTool.prototype.activate = function () {
    if (this.selectTool == null) {
        this.selectTool = new ol.interaction.Select({ wrapX: false });
    }

    if (this.map_ === undefined || this.map_ == null) {
        return;
    }

    var interActionArr = this.map_.getInteractions();
    for (var i = 0, len = interActionArr.getLength() ; i < len; i++) {
        var item = interActionArr.item(i);
        if (item instanceof ol.interaction.Select || item instanceof MilStd.ModifyTool) {
            interActionArr.remove(item);
        }
    }
    //修改
    this.map_.addInteraction(this.selectTool);
    this.map_.addInteraction(this);
    //this.map_ = this.selectTool.map_;

    this.map_.on("dblclick", this.modifyEndHandle, this);
    this.features_ = this.selectTool.getFeatures();
    this.features_.forEach(this.addFeature_, this);
    //修改
    ol.events.listen(this.features_, ol.Collection.EventType.ADD, this.handleFeatureAdd_, this);
    ol.events.listen(this.features_, ol.Collection.EventType.REMOVE, this.handleFeatureRemove_, this);

    MilStd.tool.MilStdDrawTool.prototype.ShieldDBClickZoomEvent(this.map_);

};

MilStd.ModifyTool.prototype.deactivate = function () {
    if (this.map_ !== undefined && this.map_ != null) {
        MilStd.tool.MilStdDrawTool.prototype.UnShieldDBClickZoomEvent(this.map_);
        this.map_.removeInteraction(this.selectTool);
        this.map_.removeInteraction(this);
    }
};

MilStd.ModifyTool.prototype.disconnectEventHandlers = function () {
    if (this.map_ !== undefined && this.map_ != null) {
        this.map_.un("dblclick", this.modifyEndHandle, this);
        this.map_.removeInteraction(this.selectTool);
        this.map_.removeInteraction(this);
    }
    //修改2017.11.2
    ol.events.unlisten(this.features_, ol.Collection.EventType.ADD, this.handleFeatureAdd_, this);
    ol.events.unlisten(this.features_, ol.Collection.EventType.REMOVE, this.handleFeatureRemove_, this);
};

MilStd.ModifyTool.prototype.modifyEndHandle = function (e) {
    this.disconnectEventHandlers();
    if (this.oldVerticesFeature !== undefined && this.oldVerticesFeature != null) {
        this.clearOverLayer(this.overlay_);
        this.oldVerticesFeature.clear();
    }
};

/**
* @param {ol.Feature} feature Feature.
* @private
*/
MilStd.ModifyTool.prototype.addFeature_ = function (feature) {

    var geometry = feature.getGeometry();
    if (geometry instanceof ol.geom.Point) {
        geom = geometry;
    }
    if (geometry instanceof ol.geom.GeometryCollection) {
        geom = geometry.geometries_[0];
    }
    else {
        geom = geometry;
    }
    if (this.SEGMENT_WRITERS_[geom.getType()] !== undefined) {
        this.SEGMENT_WRITERS_[geom.getType()].call(this, feature);
        this.oldVerticesFeature.clear();
        this.clearOverLayer(this.overlay_);
        if (geometry.vertices !== undefined && geometry.vertices != null) {
            for (var i = 0; i < geometry.vertices.length; i++) {
                var vertexFeature = new ol.Feature(new ol.geom.Point(geometry.vertices[i]));
                this.overlay_.getSource().addFeature(vertexFeature);
                this.oldVerticesFeature.push(vertexFeature);
            }
        }
    }
    var map = this.getMap();
    if (map !== undefined && map != null) {
        this.handlePointerAtPixel(this.lastPixel_, map);
    }
};

MilStd.ModifyTool.prototype.clearOverLayer = function (overlayer) {
    //if (overlayer !== undefined && overlayer != null) {
    //    //var features = overlayer.getFeatures();
    //    //var vSource = overlayer.getSource();
    //    //if (vSource != null)
    //    //{
    //    //    vSource.clear();
    //    //}
    //    var features = overlayer.getSource().getFeatures();
    //    //var len = features.getLength();
    //    var len = features.length;
    //    for (var i = len - 1; i >= 0; i--) {
    //        overlayer.getSource().removeFeature(features[i]);
    //    }
    //};

    //2017.1.19修改
    if (overlayer !== undefined && overlayer != null) {
        overlayer.getSource().clear();
    };
};
/**
* @inheritDoc
*/
MilStd.ModifyTool.prototype.setMap = function (map) {
    this.overlay_.setMap(map);
    //ol.interaction.Pointer.call(this, 'setMap', map);
    //2017.1.19修改
    ol.interaction.Pointer.prototype.setMap.call(this, map);
};


/**
* @param {ol.CollectionEvent} evt Event.
* @private
*/
MilStd.ModifyTool.prototype.handleFeatureAdd_ = function (evt) {
    var feature = evt.element;
    //goog.asserts.assertInstanceof(feature, ol.Feature);
    this.addFeature_(feature);
};


/**
* @param {ol.CollectionEvent} evt Event.
* @private
*/
MilStd.ModifyTool.prototype.handleFeatureRemove_ = function (evt) {
    var feature = evt.element;
    if (feature !== undefined && feature != null) {
        this.dispatchEvent(new MilStd.event.MilStdDrawEvent(MilStd.event.MilStdDrawEvent.MODIFY_FEATURE_END, feature));
    }

    var rBush = this.rBush_;
    var i, nodesToRemove = [];
    rBush.forEachInExtent(feature.getGeometry().getExtent(), function (node) {
        if (feature === node.feature) {
            nodesToRemove.push(node);
        }
    });
    for (i = nodesToRemove.length - 1; i >= 0; --i) {
        rBush.remove(nodesToRemove[i]);
    }

    this.clearOverLayer(this.overlay_);
    this.oldVerticesFeature.clear();
    this.vertexFeature_ = null;
};

/**
* @把军标几何的控制点信息加入到rBush中，以调高检索能力
* @param {ol.Feature} feature Feature
* @param {MilStd.SimpleArrow} geometry Geometry.
* @private
*/
MilStd.ModifyTool.prototype.writeVerticeGeometry = function (feature) {
    var points = feature.getGeometry().vertices;
    var coordinates, i, ii, segmentData;
    for (i = 0, ii = points.length; i < ii; ++i) {
        coordinates = points[i];
        segmentData = {
            feature: feature,
            depth: [i],
            index: i,
            segment: [coordinates, coordinates]
        }; /** @type {ol.interaction.SegmentDataType} */
        this.rBush_.insert(ol.extent.boundingExtent(segmentData.segment), segmentData);
    }
};

/**
* @ 创建或更新控制点要素，
* @param {ol.Coordinate} coordinates Coordinates.
* @return {ol.Feature} Vertex feature.
* @private
*/
MilStd.ModifyTool.prototype.createOrUpdateVertexFeature_ = function (coordinates) {
    var vertexFeature = this.vertexFeature_;
    if (vertexFeature == null) {
        vertexFeature = new ol.Feature(new ol.geom.Point(coordinates));
        this.vertexFeature_ = vertexFeature;
        this.overlay_.getSource().addFeature(vertexFeature);
    } else {
        var geometry = vertexFeature.getGeometry(); /** @type {ol.geom.Point} */
        geometry.setCoordinates(coordinates);
        vertexFeature.setGeometry(geometry);
    }

    return vertexFeature;
};

/**
* @更新当前控制点，以实现拖拽过程中对当前控制点要素的控制
* @param {Number} verticeIndex（控制点索引）.
* @param {ol.coordinate} coordinate（新的控制点坐标）.
* @this {MilStd.ModifyTool}
* @private
*/
MilStd.ModifyTool.prototype.redrawVertices = function (verticeIndex, coordinate) {
    if (this.oldVerticesFeature !== undefined && this.oldVerticesFeature != null) {
        var feature = this.oldVerticesFeature.item(verticeIndex);
        feature.setGeometry(new ol.geom.Point(coordinate));
        this.oldVerticesFeature.setAt(verticeIndex, feature);
    }
};

/**
* @param {ol.MapBrowserPointerEvent} evt Event.
* @return {boolean} Start drag sequence?
* @this {MilStd.ModifyTool}
* @private
*/
MilStd.ModifyTool.handleDownEvent_ = function (evt) {
    this.handlePointerAtPixel(evt.pixel, evt.map);
    this.dragSegments_ = [];
    var vertexFeature = this.vertexFeature_;
    if (vertexFeature != null) {
        var geometry = vertexFeature.getGeometry(); /** @type {ol.geom.Point} */
        var vertex = geometry.getCoordinates();
        var vertexExtent = ol.extent.boundingExtent([vertex]);
        var segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
        for (var i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
            var segmentDataMatch = segmentDataMatches[i];
            var segment = segmentDataMatch.segment;

            if (ol.coordinate.equals(segment[0], vertex)) {
                this.dragSegments_.push([segmentDataMatch, 0]);
            }
            else if (ol.coordinate.equals(segment[1], vertex)) {
                this.dragSegments_.push([segmentDataMatch, 1]);
            }
        }
    }
    return this.vertexFeature_ != null ? true : false;
};


MilStd.ModifyTool.handleMoveEvent = function (evt) {
    if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });
        var element = evt.map.getTargetElement();
        if (feature) {
            if (element.style.cursor != this.cursor_) {
                this.previousCursor_ = element.style.cursor;
                element.style.cursor = this.cursor_;
            }
        } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
        }
    }
};

/**
* @param {ol.MapBrowserPointerEvent} evt Event.
* @this {MilStd.ModifyTool}
* @private
*/
MilStd.ModifyTool.handleDragEvent_ = function (evt) {
    var vertex = evt.coordinate;
    for (var i = 0, ii = this.dragSegments_.length; i < ii; ++i) {
        var dragSegment = this.dragSegments_[i];

        var segmentData = dragSegment[0];
        var index = dragSegment[1];

        var verticeIndex = segmentData.index;
        var feature = segmentData.feature;
        var geom = feature.getGeometry();

        if (geom.getType() == ol.geom.GeometryType.GEOMETRY_COLLECTION) {
            while (vertex.length < feature.getGeometry().geometries_[0].getStride()) {
                vertex.push(0);
            }
            var vertices = geom.vertices;
            if (geom.milStdType == MilStd.EnumMilstdType.TriangleFlag || geom.milStdType == MilStd.EnumMilstdType.RectFlag ||
            geom.milStdType == MilStd.EnumMilstdType.CurveFlag || geom.milStdType == MilStd.EnumMilstdType.ArrowCross ||
            geom.milStdType == MilStd.EnumMilstdType.CircleClosedangle || geom.milStdType == MilStd.EnumMilstdType.Closedangle ||
            geom.milStdType == MilStd.EnumMilstdType.DoubleClosedangle || geom.milStdType == MilStd.EnumMilstdType.Fourstar ||
            geom.milStdType == MilStd.EnumMilstdType.Rhombus || geom.milStdType == MilStd.EnumMilstdType.SameDirectionClosedangle ||
            geom.milStdType == MilStd.EnumMilstdType.Triangle || geom.milStdType == MilStd.EnumMilstdType.Vane) {

                if (verticeIndex == 0) {
                    if ((vertex[0] - vertices[1][0]) >= 0 || (vertex[1] - vertices[1][1]) <= 0) {
                        return;
                    }
                }
                else if (verticeIndex == 1) {
                    if ((vertex[0] - vertices[0][0]) <= 0 || (vertex[1] - vertices[0][1]) >= 0) {
                        return;
                    }
                }
            }

            this.updateFeature(segmentData, vertex, true);
            break;
        }
        this.createOrUpdateVertexFeature_(vertex);
    }
};

/**
* @param {ol.MapBrowserPointerEvent} evt Event.
* @return {boolean} Stop drag sequence?
* @this {MilStd.ModifyTool}
* @private
*/
MilStd.ModifyTool.handleUpEvent_ = function (evt) {
    var vertex = evt.coordinate;
    var segmentData;
    for (var i = this.dragSegments_.length - 1; i >= 0; --i) {
        segmentData = this.dragSegments_[i][0];
        this.rBush_.update(ol.extent.boundingExtent(segmentData.segment), segmentData);
        var geom = segmentData.feature.getGeometry();
        var vertices = geom.vertices;
        if (geom.milStdType == MilStd.EnumMilstdType.TriangleFlag || geom.milStdType == MilStd.EnumMilstdType.RectFlag ||
            geom.milStdType == MilStd.EnumMilstdType.CurveFlag || geom.milStdType == MilStd.EnumMilstdType.ArrowCross ||
            geom.milStdType == MilStd.EnumMilstdType.CircleClosedangle || geom.milStdType == MilStd.EnumMilstdType.Closedangle ||
            geom.milStdType == MilStd.EnumMilstdType.DoubleClosedangle || geom.milStdType == MilStd.EnumMilstdType.Fourstar ||
            geom.milStdType == MilStd.EnumMilstdType.Rhombus || geom.milStdType == MilStd.EnumMilstdType.SameDirectionClosedangle ||
            geom.milStdType == MilStd.EnumMilstdType.Triangle || geom.milStdType == MilStd.EnumMilstdType.Vane) {

            if (segmentData.index == 0) {
                if ((vertex[0] - vertices[1][0]) >= 0 || (vertex[1] - vertices[1][1]) <= 0) {
                    return false;
                }
            }
            else if (segmentData.index == 1) {
                if ((vertex[0] - vertices[0][0]) <= 0 || (vertex[1] - vertices[0][1]) >= 0) {
                    return false;
                }
            }
        }
        this.updateFeature(segmentData, evt.coordinate, true);
    }
    return false;
};

MilStd.ModifyTool.prototype.updateFeature = function (segmentData, coordinate, isDraging) {
    var geom = segmentData.feature.getGeometry();
    var vertices = geom.vertices;
    vertices[segmentData.index] = coordinate;

    geom.Update(vertices, isDraging);

    segmentData.feature.setGeometry(geom);
    if (this.vertexFeature_ != null) {
        var pntGeom = this.vertexFeature_.getGeometry();
        pntGeom.setCoordinates(coordinate);
        this.vertexFeature_.setGeometry(pntGeom);
    }

    this.redrawVertices(segmentData.index, coordinate);
    this.rBush_.remove(segmentData);
    var segment = segmentData.segment;
    segment[0] = segment[1] = coordinate;
    segmentData.segment = segment;
    this.rBush_.insert(ol.extent.boundingExtent(segmentData.segment), segmentData);

};

/**
* @param {ol.MapBrowserEvent} mapBrowserEvent Map browser event.
* @return {boolean} `false` to stop event propagation.
* @this {MilStd.ModifyTool}
* @api
*/
MilStd.ModifyTool.handleEvent = function (mapBrowserEvent) {
    //var handled;
    //if (!mapBrowserEvent.map.getView().getHints()[ol.ViewHint.INTERACTING] &&
    //mapBrowserEvent.type == ol.MapBrowserEvent.EventType.POINTERMOVE) {
    //    this.handlePointerMove_(mapBrowserEvent);
    //}
    //return ol.interaction.Pointer.handleEvent.call(this, mapBrowserEvent) &&
    //!handled;

    //2017.1.19修改
    if (!(mapBrowserEvent instanceof ol.MapBrowserPointerEvent)) {
        return true;
    }
    var handled;
    if (!mapBrowserEvent.map.getView().getHints()[ol.View.Hint.INTERACTING] &&
      mapBrowserEvent.type == ol.MapBrowserEvent.EventType.POINTERMOVE &&
      !this.handlingDownUpSequence) {
        this.handlePointerMove_(mapBrowserEvent);
    }

    return ol.interaction.Pointer.handleEvent.call(this, mapBrowserEvent) &&
    !handled;
};


/**
* @param {ol.MapBrowserEvent} evt Event.
* @private
*/
MilStd.ModifyTool.prototype.handlePointerMove_ = function (evt) {
    this.lastPixel_ = evt.pixel;
    this.handlePointerAtPixel(evt.pixel, evt.map);
};

/**
* @param {ol.Pixel} pixel Pixel
* @param {ol.Map} map Map.
* @private
*/
MilStd.ModifyTool.prototype.handlePointerAtPixel = function (pixel, map) {
    var pixelCoordinate = map.getCoordinateFromPixel(pixel);

    //像素点到控制点距离升序排列函数
    var sortByDistance = function (a, b) {
        return ol.coordinate.squaredDistanceToSegment(pixelCoordinate, a.segment) -
               ol.coordinate.squaredDistanceToSegment(pixelCoordinate, b.segment);
    };

    //构建点查询的范围（ol.extent）
    var lowerLeft = map.getCoordinateFromPixel(
        [pixel[0] - this.pixelTolerance_, pixel[1] + this.pixelTolerance_]);
    var upperRight = map.getCoordinateFromPixel(
        [pixel[0] + this.pixelTolerance_, pixel[1] - this.pixelTolerance_]);
    var box = ol.extent.boundingExtent([lowerLeft, upperRight]);

    var rBush = this.rBush_;
    var nodes = rBush.getInExtent(box);
    if (nodes.length > 0) {
        nodes.sort(sortByDistance);
        var node = nodes[0];
        var closestSegment = node.segment;
        var pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
        var pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
        var squaredDist1 = ol.coordinate.squaredDistance(pixel, pixel1);
        var squaredDist2 = ol.coordinate.squaredDistance(pixel, pixel2);
        var dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
        this.snappedToVertex_ = dist <= this.pixelTolerance_;
        if (this.snappedToVertex_) {
            this.createOrUpdateVertexFeature_(closestSegment[0]);
        }
        return;
    }
    if (this.vertexFeature_ != null) {
        this.overlay_.getSource().removeFeature(this.vertexFeature_);
        this.vertexFeature_ = null;
    }

};

/**
* @return {ol.style.StyleFunction} Styles.
*/
MilStd.ModifyTool.getDefaultStyleFunction = function () {
    var style = ol.style.Style.createDefaultEditing();
    return function (feature, resolution) {
        return style[ol.geom.GeometryType.POINT];
    };
};

/**********************************************************图形拖拽（DragPan）start************************************************/
goog.provide('MilStd.DragPan');

/**
* @constructor
* @extends {ol.interaction.Pointer}
*/
MilStd.DragPan = function (map) {

    ol.interaction.Pointer.call(this, {
        handleDownEvent: MilStd.DragPan.prototype.handleDownEvent,
        handleDragEvent: MilStd.DragPan.prototype.handleDragEvent,
        handleMoveEvent: MilStd.DragPan.prototype.handleMoveEvent,
        handleUpEvent: MilStd.DragPan.prototype.handleUpEvent
    });

    this.map_ = (map !== undefined && map != null) ? map : null;
    /**
    * @type {ol.Pixel}
    * @private
    */
    this.coordinate_ = null;

    /**
    * @type {ol.Feature}
    * @private
    */
    this.feature_ = null;

    /**
    * @type {string|undefined}
    * @private
    */
    // this.cursor_ = 'pointer';
    this.cursor_ = 'move';

    /**
    * @type {string|undefined}
    * @private
    */
    this.previousCursor_ = undefined;

};
ol.inherits(MilStd.DragPan, ol.interaction.Pointer);
//2017.1.19修改
MilStd.DragPan.prototype.activate = function () {
    if (this.map_ === undefined || this.map_ == null) {
        return;
    }
    var interActionArr = this.map_.getInteractions();

    var len = interActionArr.getLength();
    for (var i = len - 1; i >= 0; i--) {
        var item = interActionArr.item(i);
        if (item instanceof MilStd.DragPan) {
            interActionArr.remove(item);
        }
    }
    this.map_.addInteraction(this);
    MilStd.tool.MilStdDrawTool.prototype.ShieldDBClickZoomEvent(this.map_);
    this.map_.on("dblclick", this.modifyEndHandle, this);
};
//2017.1.19修改
MilStd.DragPan.prototype.deactivate = function () {
    if (this.map_ === undefined || this.map_ == null) {
        return;
    }
    MilStd.tool.MilStdDrawTool.prototype.UnShieldDBClickZoomEvent(this.map_);

    var interActionArr = this.map_.getInteractions();
    var len = interActionArr.getLength();
    for (var i = len - 1; i >= 0; i--) {
        var item = interActionArr.item(i);
        if (item instanceof MilStd.DragPan) {
            interActionArr.remove(item);
        }
    }

};

MilStd.DragPan.prototype.modifyEndHandle = function (e) {
    if (this.map_ === undefined || this.map_ == null) {
        return;
    }
    this.map_.un("dblclick", this.modifyEndHandle, this);
    this.setActive(false);
};

/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `true` to start the drag sequence.
*/
MilStd.DragPan.prototype.handleDownEvent = function (evt) {
    var map = evt.map;

    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
          return feature;
      });

    if (feature) {
        this.coordinate_ = evt.coordinate;
        this.feature_ = feature;
    }

    return !!feature;
};


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
*/
MilStd.DragPan.prototype.handleDragEvent = function (evt) {
    var map = evt.map;

    var feature = map.forEachFeatureAtPixel(evt.pixel,
      function (feature, layer) {
          return feature;
      });

    var deltaX = evt.coordinate[0] - this.coordinate_[0];
    var deltaY = evt.coordinate[1] - this.coordinate_[1];

    var geometry = /** @type {ol.geom.SimpleGeometry} */
      (this.feature_.getGeometry());
    geometry.translate(deltaX, deltaY);

    if (geometry.vertices !== undefined && geometry.vertices != null) {
        var vertices = geometry.vertices;
        for (var i = 0, len = vertices.length; i < len; i++) {
            ol.coordinate.sub(vertices[i], [-deltaX, -deltaY]);
        }
    }

    this.coordinate_[0] = evt.coordinate[0];
    this.coordinate_[1] = evt.coordinate[1];
};


/**
* @param {ol.MapBrowserEvent} evt Event.
*/
MilStd.DragPan.prototype.handleMoveEvent = function (evt) {
    if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });
        var element = evt.map.getTargetElement();
        if (feature) {
            if (element.style.cursor != this.cursor_) {
                this.previousCursor_ = element.style.cursor;
                element.style.cursor = this.cursor_;
            }
        } else if (this.previousCursor_ !== undefined) {
            element.style.cursor = this.previousCursor_;
            this.previousCursor_ = undefined;
        }
    }
};


/**
* @param {ol.MapBrowserEvent} evt Map browser event.
* @return {boolean} `false` to stop the drag sequence.
*/
MilStd.DragPan.prototype.handleUpEvent = function (evt) {
    var element = evt.map.getTargetElement();
    element.style.cursor = "default";
    if (this.feature_ !== undefined && this.feature_ != null) {
        this.dispatchEvent(new MilStd.event.MilStdDrawEvent(MilStd.event.MilStdDrawEvent.MODIFY_FEATURE_END, this.feature_));
    }
    this.coordinate_ = null;
    this.feature_ = null;
    return false;
};

/**********************************************************标绘绘制（MilStd）end************************************************/﻿//**********************************************************Zondy.Service.MultiGeoQueryParameter(start)************************************************//
goog.provide('Zondy.Service.MultiGeoQueryParameter');

/// <summary>多几何查询对象类</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.MultiGeoQueryParameter = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    /// <summary>用于查询的多几何数组
    /// {Zondy.Object.Point2D或Zondy.Object.PolyLine或Zondy.Object.Polygon对象构成的数组}
    /// </summary>
    this.geometry = options.geometry !== undefined ? options.geometry : null;
    /// <summary>
    /// 几何类型，表示geometry中元素代表的几何类型，可取值为"point","line","polygon"
    ///  {String}
    ///</summary>
    this.geometryType = options.geometryType !== undefined ? options.geometryType : null;
    /// <summary>
    /// 回调结果的包装形式
    ///  {String}
    ///</summary>
    this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json";
    /// <summary>
    /// 缓冲半径，仅在多点和多线查询时起效
    ///  {String}
    ///</summary>
    this.nearDis = options.nearDis !== undefined ? options.nearDis : 0.0001;
    ol.obj.assign(this, options);
};

Zondy.Service.MultiGeoQueryParameter.prototype.getParameterURL = function () {
    /// <summary>获取相关参数的REST-URL表示形式</summary>
    var paramUrl = "";
    paramUrl += "?f=" + this.resultFormat;
    paramUrl += "&geometryType=" + this.geometryType;
    paramUrl += "&nearDis=" + this.nearDis;
    return paramUrl;
};
//**********************************************************Zondy.Service.MultiGeoQueryParameter(end)************************************************//

//**********************************************************Zondy.Service.MultiGeoQuery(start)************************************************//
goog.provide('Zondy.Service.MultiGeoQuery');


/// <summary>构造函数</summary>
/// <param name="queryParam" type="Zondy.Service.MultiGeoQueryParameter">多几何查询的参数类</param>
/// <param name="docName" type="String">文档名称</param>
/// <param name="mapIndex" type="Interger">地图序号</param>
/// <param name="layerIndex" type="String">图层序号</param>
/// <param name="options" type="Object">属性赋值对象</param>
Zondy.Service.MultiGeoQuery = function (queryParam, docName, layerIndex, opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.QueryServiceBase.call(this, options);
    ol.obj.assign(this, options);
    this.queryParam = queryParam;
    this.mapName = docName;
    this.mapIndex = 0;
    this.layerIndex = layerIndex;
    this.partUrl = "docs/" + this.mapName + "/" + this.mapIndex.toString() + "/" + this.layerIndex + "/Geoquery";
    this.partUrl += queryParam.getParameterURL();

};
ol.inherits(Zondy.Service.MultiGeoQuery, Zondy.Service.QueryServiceBase);

/// <summary>查询函数，向服务器发送请求</summary>
/// <param name="onSuccess" type="{Function}">必要参数，执行成功后的回调函数</param>
/// <param name="onError" type="{Function}">非必要参数，执行失败后的回调函数</param>
/// <param name="options" type="Object">非必要参数，</param>
Zondy.Service.MultiGeoQuery.prototype.query = function (onSuccess, onError, options) {
    /// <summary>查询函数，向服务器发送请求</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.queryParam == null) {
        return;
    }
    var fullRestUrl = "";
    this.baseUrl = "igs/rest/extend/MultiGeo/";
    if (this.queryParam instanceof Zondy.Service.MultiGeoQueryParameter) {
        // 如果是属于多几何查询类
        fullRestUrl = "http://" + this.ip + ":" + this.port + "/" + this.baseUrl
             + this.partUrl;
    }
    else {
        return;
    }

    if (this.queryParam.geometryType == "point") {
        var dataObj = { pointArr: this.queryParam.geometry };
    }
    else if (this.queryParam.geometryType == "line") {
        var dataObj = { lineArr: this.queryParam.geometry };
    }
    else if (this.queryParam.geometryType == "polygon") {
        var dataObj = { PolygonObjs: this.queryParam.geometry };
    }
    this.ajax(fullRestUrl, dataObj, onSuccess, "post", null, this.resultFormat, onError, options);

};
//**********************************************************Zondy.Service.MultiGeoQuery(end)************************************************//
//**********************************************************Zondy.Service.ObjClsQueryParameter(start)************************************************//
goog.provide('Zondy.Service.ObjClsQueryParameter');

/// <summary>多几何查询对象类</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.ObjClsQueryParameter = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    /// <summary>
    ///     需要查询的要素OID号，多个间用‘，’分隔
    ///     如果此参数有值，查询将默认转化为使用要素ID查询，而忽略条件查询
    ///</summary>
    this.objectIds = options.objectIds !== undefined ? options.objectIds : null;
    /// <summary>
    /// 条件查询的SQL语句；
    ///  {String}
    ///</summary>
    this.where = options.where !== undefined ? options.where : null;
    /// <summary>
    /// 回调结果的包装形式
    ///  {String}
    ///</summary>
    this.resultFormat = options.resultFormat !== undefined ? options.resultFormat : "json";
    ol.obj.assign(this, options);
};

Zondy.Service.ObjClsQueryParameter.prototype.getParameterURL = function () {
    /// <summary>获取相关参数的REST-URL表示形式</summary>
    /// <summary>获取相关参数的REST-URL表示形式</summary>
    var paramUrl = "";
    paramUrl += "&f=" + this.resultFormat;
    if (this.objectIds != null) {
        paramUrl += "&objectIds=" + this.objectIds;
    }
    if (this.where != null) {
        paramUrl += "&where=" + this.where;
    }
    return paramUrl;
};
//**********************************************************Zondy.Service.ObjClsQueryParameter(end)************************************************//
//**********************************************************Zondy.Service.ObjClsQuery(start)************************************************//
goog.provide('Zondy.Service.ObjClsQuery');


/// <summary>构造函数</summary>
/// <param name="queryParam" type="Zondy.Service.ObjClsQueryParameter">对象类查询的参数类</param>
/// <param name="gdbp" type="String">对象类的GDBP地址</param>
/// <param name="options" type="Object">属性赋值对象</param>
Zondy.Service.ObjClsQuery = function (queryParam, gdbp, opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.QueryServiceBase.call(this, options);
    ol.obj.assign(this, options);
    this.queryParam = queryParam;
    this.gdbp = gdbp;

    this.partUrl = "objlayer/query?gdbp=" + gdbp;
    this.partUrl += queryParam.getParameterURL();

};
ol.inherits(Zondy.Service.ObjClsQuery, Zondy.Service.QueryServiceBase);

/// <summary>查询函数，向服务器发送请求</summary>
/// <param name="onSuccess" type="{Function}">必要参数，执行成功后的回调函数</param>
/// <param name="onError" type="{Function}">非必要参数，执行失败后的回调函数</param>
/// <param name="options" type="Object">非必要参数，</param>
Zondy.Service.ObjClsQuery.prototype.query = function (onSuccess, onError, options) {
    /// <summary>查询函数，向服务器发送请求</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    /// <summary>查询函数，向服务器发送请求</summary>
    /// <param name="onSuccess" type="Function">回调函数</param>
    if (this.queryParam == null) {
        return;
    }
    var fullRestUrl = "";
    this.baseUrl = "igs/rest/extend/dxlcz/";
    if (this.queryParam instanceof Zondy.Service.ObjClsQueryParameter) {
        // 如果是属于多几何查询类
        fullRestUrl = "http://" + this.ip + ":" + this.port + "/" + this.baseUrl + this.partUrl;
    }
    else {
        return;
    }
    this.ajax(fullRestUrl, null, onSuccess, "GET", null, this.resultFormat, onError, options);
};
//**********************************************************Zondy.Service.ObjClsQuery(end)************************************************//
//**********************************************************Zondy.ClientTheme(start)************************************************//
/**
客户端专题图
*/
goog.provide("Zondy.ClientTheme");

/**
* @classdesc
* 客户端专题图操作对象
* @constructor
* @param {ol.Map} map: 地图容器
* @param {string} layerURL: 图层URL（"gdbp://MapGisLocal/示例数据/ds/世界地图/sfcls/海洋陆地"）
* @param {string} ip: IGS服务器地址
* @param {string} port: IGS服务端口
* @param {Number} rows: 网格行数
* @param {Number} cols: 网格列数
* @param {string} layerFilter: 图层过滤条件
* @param {ol.Extent} layerExtend: 图层范围（[-180, -90, 180, 90]）
* @param {Zondy.ClientThemeInfos} ClientThemeInfos: 客户端专题图信息
* @param {ol.layer.Vector} vectLayer: 绘制的矢量图层
* @param {ol.structs.RBush} rbush
* @api
*/
Zondy.ClientTheme = function (map, layerURL, opt_options) {
    this.map = (map !== undefined) ? map : null;
    this.layerURL = (layerURL !== undefined) ? layerURL : null;

    var options = (opt_options !== undefined) ? opt_options : {};
    this.ip = (options.ip !== undefined) ? options.ip : "localhost";
    this.port = (options.port !== undefined) ? options.port : "6163";
    this.rows = (options.rows !== undefined) ? options.rows : 6;
    this.cols = (options.cols !== undefined) ? options.cols : 6;
    this.layerFilter = (options.layerFilter !== undefined) ? options.layerFilter : "1>0";
    this.layerExtend = (options.layerExtend !== undefined) ? options.layerExtend : null;
    this.ClientThemeInfos = (options.ClientThemeInfos !== undefined) ? options.ClientThemeInfos : null;
    this.vectLayer = null;
    this.rbush = new ol.structs.RBush();

    if (map !== undefined && map != null) {
        if (this.vectLayer === undefined || this.vectLayer == null) {
            this.vectLayer = new ol.layer.Vector({ source: new ol.source.Vector({ wrapX: false }) });
            this.map.addLayer(this.vectLayer);
        }

        if (this.layerExtend === undefined || this.layerExtend == null) {
            this.layerExtend = this.map.getView().getProjection().getExtent();
        }
    }
    $.extend(this, options);
};

/**
* Method: 根据视窗范围计算需优先请求的行列号
* @param {ol.Extent} viewExtent:当前视窗范围
* @return {Array.<minRow,minCol,maxRow,maxCol>} 网格序列范围.
*/
Zondy.ClientTheme.prototype.CalGridRange = function (viewExtent) {
    //修正网格范围到图层范围之内

    viewExtent[0] = viewExtent[0] < this.layerExtend[0] ? this.layerExtend[0] : viewExtent[0];
    viewExtent[1] = viewExtent[1] < this.layerExtend[1] ? this.layerExtend[1] : viewExtent[1];
    viewExtent[2] = viewExtent[2] > this.layerExtend[2] ? this.layerExtend[2] : viewExtent[2];
    viewExtent[3] = viewExtent[3] > this.layerExtend[3] ? this.layerExtend[3] : viewExtent[3];

    var minCol = Math.floor((viewExtent[0] - this.layerExtend[0]) / ((this.layerExtend[2] - this.layerExtend[0]) / this.cols));
    var maxCol = Math.ceil((viewExtent[2] - this.layerExtend[0]) / ((this.layerExtend[2] - this.layerExtend[0]) / this.cols)) - 1;
    var minRow = Math.floor((viewExtent[1] - this.layerExtend[1]) / ((this.layerExtend[3] - this.layerExtend[1]) / this.rows));
    var maxRow = Math.ceil((viewExtent[3] - this.layerExtend[1]) / ((this.layerExtend[3] - this.layerExtend[1]) / this.rows)) - 1;
    minCol = minCol < 0 ? 0 : minCol;
    minRow = minRow < 0 ? 0 : minRow;
    maxCol = maxCol >= this.cols - 1 ? this.cols - 1 : maxCol;
    maxRow = maxRow >= this.rows - 1 ? this.rows - 1 : maxRow;
    return [minRow, minCol, maxRow, maxCol];
};

/**
* Method: 计算视窗范围外的网格（按照优先绘制顺序）
* @param {Array.<minRow,minCol,maxRow,maxCol>} gridRange:当前视窗范围的网格数组
* @param {Number} rows:网格的行数.
* @param {Number} cols:网格的列数.
* @return {Array.<Array<row,col>>} 网格序列数组.
*/
Zondy.ClientTheme.prototype.CalOutsideGrid = function (gridRange, resultArr) {
    var minR = gridRange[0];
    var minC = gridRange[1];
    var maxR = gridRange[2];
    var maxC = gridRange[3];
    if (minR == 0 && minC == 0 && maxR == this.rows - 1 && maxC == this.cols - 1) {
        return;
    }
    if (resultArr === undefined && resultArr == null) {
        resultArr = new Array();
    }

    var _minR = minR - 1 >= 0 ? minR - 1 : 0;
    var _minC = minC - 1 >= 0 ? minC - 1 : 0;
    var _maxR = maxR + 1 <= this.rows - 1 ? maxR + 1 : this.rows - 1;
    var _maxC = maxC + 1 <= this.cols - 1 ? maxC + 1 : this.cols - 1;
    for (var i = _minC; i <= _maxC; i++) {
        if (minR != _minR) {
            resultArr.push([_minR, i]);
        }
        if (maxR != _maxR) {
            resultArr.push([_maxR, i]);
        }

    }
    for (var j = maxR; j >= minR; j--) {
        if (minC != _minC) {
            resultArr.push([j, _minC]);
        }

        if (_maxC != maxC) {
            resultArr.push([j, _maxC]);
        }

    }
    this.CalOutsideGrid([_minR, _minC, _maxR, _maxC], resultArr);
};
/**
* Method: 根据行列号数组计算请求范围数组
* @param {Array.<Array<row,col>>} gridArr:行列号数组
* @param {ol.Extent} layerExtend:当前图层范围
* @param {Number} rows:网格的行数.
* @param {Number} cols:网格的列数.
* @return {Array.<ol.Extent>} 网格范围数组.
*/
Zondy.ClientTheme.prototype.CalOutsideGridExtends = function (gridArr) {
    var rowHei = (this.layerExtend[3] - this.layerExtend[1]) / this.rows;
    var colWid = (this.layerExtend[2] - this.layerExtend[0]) / this.cols;
    var extendArr = new Array();
    for (var i = 0; i < gridArr.length; i++) {
        var colIndex = gridArr[i][1];
        var rowIndex = gridArr[i][0];

        var minX = this.layerExtend[0] + colWid * colIndex;
        var minY = this.layerExtend[1] + rowHei * rowIndex;
        var maxX = minX + colWid;
        var maxY = minY + rowHei;
        var extent = ol.extent.createOrUpdate(minX, minY, maxX, maxY);
        extendArr.push(extent);
    }
    return extendArr;
};

/**
* Method: 根据行列号范围计算请求范围数组
* @param {Array.<Number>:[minRow, minCol, maxRow, maxCol]} gridArr:行列号范围
* @param {ol.Extent} layerExtend:当前图层范围
* @return {Array.<ol.Extent>} 网格范围数组.
*/
Zondy.ClientTheme.prototype.CalGridExtends = function (gridArr) {
    var rowHei = (this.layerExtend[3] - this.layerExtend[1]) / this.rows;
    var colWid = (this.layerExtend[2] - this.layerExtend[0]) / this.cols;
    var extendArr = new Array();
    for (var i = gridArr[2]; i >= gridArr[0]; i--) {
        for (var j = gridArr[1]; j <= gridArr[3]; j++) {
            var minX = this.layerExtend[0] + colWid * j;
            var minY = this.layerExtend[1] + rowHei * i;
            var maxX = minX + colWid;
            var maxY = minY + rowHei;
            var extent = ol.extent.createOrUpdate(minX, minY, maxX, maxY);
            extendArr.push(extent);
        }
    }
    return extendArr;
};

/**
* Method: 根据视窗范围计算网格范围数组
* @param {ol.Extent} viewExtent:当前视窗范围
* @return {Array.<ol.Extent>} 网格范围数组.
*/
Zondy.ClientTheme.prototype.GetGridExtendArr = function (viewExtent) {
    var gridIndexArr = this.CalGridRange(viewExtent);
    var extendArr = this.CalGridExtends(gridIndexArr);
    var gridIndexOutsideArr = new Array();
    this.CalOutsideGrid(gridIndexArr, gridIndexOutsideArr);

    var outsideExtendArr = this.CalOutsideGridExtends(gridIndexOutsideArr);
    var gridExtentArr = [extendArr, outsideExtendArr];

    return gridExtentArr;
}

/**
* Method: 根据范围调用要素服务获取图元，保存图元的FID及范围到RBush中（需考虑要素不重复的因素）
* @param {ol.Extent} extent:网格范围
* @param {boolen} isInView:网格是否在当前视窗内
* @param {ol.Map} map:地图容器
* @return 
*/
Zondy.ClientTheme.prototype.GetFeatureByExtent = function (extent, isInView, map) {
    var rect = new Zondy.Object.Rectangle();
    rect.xmin = extent[0];
    rect.xmax = extent[2];
    rect.ymin = extent[1];
    rect.ymax = extent[3];

    var queryService = this.InitQueryService();
    queryService.queryParam.geometry = rect;
    queryService.queryTotalCnt = this.rows * this.cols;

    queryService.query(function (data) {
        if (data !== undefined && data != null) {
            var sfArr = data.SFEleArray;
            var attStruct = data.AttStruct;

            if (sfArr !== undefined && sfArr != null) {
                var featureArr = new Array();
                for (var i = 0; i < sfArr.length; i++) {
                    var fid = sfArr[i].FID;
                    var rect = sfArr[i].bound;
                    if (this.rbush === undefined || this.rbush == null) {
                        this.rbush = new ol.structs.RBush();
                    }
                    var isExist = false;
                    this.rbush.forEachInExtent([rect.xmin, rect.ymin, rect.xmax, rect.ymax], function (node) {
                        if (fid === node.FID) {
                            isExist = true;
                        }
                    });
                    if (isExist === false) {
                        var segmentData = {
                            FID: fid
                        };
                        this.rbush.insert([rect.xmin, rect.ymin, rect.xmax, rect.ymax], segmentData);
                        var feature;
                        if (this.themeInfos instanceof Zondy.ClientGradeInfos) {
                            feature = Zondy.ClientTheme.prototype.GetOLFeature(sfArr[i], attStruct, "grade");
                        }
                        else if (this.themeInfos instanceof Zondy.ClientDensityInfos) {
                            feature = Zondy.ClientTheme.prototype.GetOLFeature(sfArr[i], attStruct, "density");
                        }
                        else {
                            feature = Zondy.ClientTheme.prototype.GetOLFeature(sfArr[i], attStruct, "other");
                        }
                        featureArr.push(feature);
                    }
                }

                var vectSource = this.vectLayer.getSource();
                if (this.themeInfos !== undefined && this.themeInfos != null) {
                    if (this.themeInfos instanceof Zondy.ClientStatisticInfos) {
                        if (isInView) {
                            this.themeInfos.AddChartInView(featureArr, map);
                        }
                    }
                    else if (this.themeInfos instanceof Zondy.ClientFourClrInfos) {
                        this.themeInfos.queryCnt++;
                    }
                    else if (this.themeInfos instanceof Zondy.ClientDensityInfos) {
                        for (var i = 0; i < featureArr.length; i++) {
                            var dotFeature = this.themeInfos.SetThemeInfo(featureArr[i]);
                            if (dotFeature !== undefined && dotFeature != null) {
                                vectSource.addFeatures([dotFeature]);
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < featureArr.length; i++) {
                            this.themeInfos.SetThemeInfo(featureArr[i]);
                        }
                    }

                    vectSource.addFeatures(featureArr);

                    if (this.themeInfos instanceof Zondy.ClientFourClrInfos) {
                        if (this.themeInfos.queryCnt == this.queryTotalCnt) {
                            this.themeInfos.SetFourClrInfos(vectSource);
                        }
                    }
                } /*end of  if (goog.isDefAndNotNull(this.themeInfos))*/
            } /*end of if (goog.isDefAndNotNull(sfArr))*/
        } /*end of if (goog.isDefAndNotNull(data))*/
    });
};

/**
* Method: 初始化图层要素服务
* @param {string} ip:查询图层要素服务的服务器地址
* @param {string} port:查询图层要素服务的服务器端口
* @param {string} layerfilter:查询图层要素服务的图层过滤条件（符合MapGIS属性查询规范）
* @return 
*/
Zondy.ClientTheme.prototype.InitQueryService = function () {
    var queryStruct = new Zondy.Service.QueryFeatureStruct();
    queryStruct.IncludeGeometry = true;
    queryStruct.IncludeAttribute = true;
    //queryStruct.IncludeWebGraphic = false;
    var queryParam = new Zondy.Service.QueryByLayerParameter(this.layerURL);
    queryParam.struct = queryStruct;
    queryParam.resultFormat = "json";
    queryParam.page = 0;
    queryParam.recordNumber = 500000; //设置查询要素数目
    queryParam.where = this.layerFilter;

    var queryService = new Zondy.Service.QueryLayerFeature(queryParam, this.layerURL);
    queryService.ip = this.ip;
    queryService.port = this.port;
    queryService.requestType = "GET";

    $.extend(queryService, { vectLayer: this.vectLayer });
    $.extend(queryService, { themeInfos: this.ClientThemeInfos });
    $.extend(queryService, { rbush: this.rbush });

    return queryService;
};

/**
* Method: 转换MapGIS的要素到OL3要素，同时赋值相应的属性
* @param {Zondy.Object.Feature} mapFeature 要素
* @param {Zondy.Object.CAttStruct} AttStruct 属性结构
* @param {string} themeType 专题图类型
* @return {ol.Feature}
*/
Zondy.ClientTheme.prototype.GetOLFeature = function (mapFeature, AttStruct, themeType) {
    var geometry = null;
    if (themeType == "grade") {
        var x = (mapFeature.bound.xmax + mapFeature.bound.xmin) / 2;
        var y = (mapFeature.bound.ymax + mapFeature.bound.ymin) / 2;
        geometry = new ol.geom.Circle([x, y], 7)
    }
    else {
        switch (mapFeature.ftype) {
            case 1:
                var geom = mapFeature.fGeom.PntGeom;
                var pntCoord = [geom[0].Dot.x, geom[0].Dot.y];
                geometry = new ol.geom.Circle(pntCoord, 5);
                break;
            case 2:
                var geom = mapFeature.fGeom.LinGeom;
                var linCoords = new Array();
                var arcs = geom[0].Line.Arcs;
                for (var i = 0; i < arcs.length; i++) {
                    var dots = arcs[i].Dots;
                    for (var j = 0; j < dots.length; j++) {
                        linCoords.push([dots[j].x, dots[j].y]);
                    }
                }
                geometry = new ol.geom.LineString(linCoords);
                break;
            case 3:
                var geom = mapFeature.fGeom.RegGeom;
                var rings = geom[0].Rings;
                var polyCoords = new Array();
                for (var i = 0; i < rings.length; i++) {
                    polyCoords[i] = new Array();
                    var arcs = rings[i].Arcs;

                    for (var j = 0; j < arcs.length; j++) {
                        var dots = arcs[j].Dots;
                        for (var k = 0; k < dots.length; k++) {
                            polyCoords[i].push([dots[k].x, dots[k].y]);
                        }
                    }
                }
                geometry = new ol.geom.Polygon(polyCoords);
                break;
        }
    }

    var feature = new ol.Feature();
    feature.setGeometry(geometry);

    var attValue = mapFeature.AttValue;
    var fldNames = AttStruct.FldName;

    var attObj = new Object();
    attObj["fId"] = mapFeature.FID;
    if (attValue != null) {
        for (var i = 0; i < fldNames.length; i++) {
            attObj[fldNames[i]] = attValue[i];
        }
    }
    else {
        for (var i = 0; i < fldNames.length; i++) {
            attObj[fldNames[i]] = 0;
        }
    }
    feature.setProperties(attObj);

    if (themeType == "density") {
        var style = new ol.style.Style({
            fill: new ol.style.Fill({ color: 'rgba(0,0,0,0)' }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0,0,0,0)',
                width: 0
            }),
            image: new ol.style.Circle({
                radius: 0,
                fill: new ol.style.Fill({ color: 'rgba(0,0,0,0)' })
            })
        });
        feature.setStyle(style);
    }

    return feature;
};

/**
* Method: 获取所有图元
* @param {ol.Extend} extent:图层范围
* @param {ol.Extend in an Arry} gridExtentArr:网格范围数组
* @return 
*/
Zondy.ClientTheme.prototype.GetBaseValue = function (extent, gridExtentArr) {
    var queryService = this.InitQueryService();
    queryService.queryParam.struct.IncludeGeometry = false;
    queryService.ClientTheme = this;

    queryService.query(function (data) {
        if (data !== undefined && data != null) {
            if (this.themeInfos.baseValue == 0) {
                var sfArr = data.SFEleArray;
                var attStruct = data.AttStruct;
                var fldIndex = 0;
                for (var i = 0; i < attStruct.FldName.length; i++) {
                    if (attStruct.FldName[i] == this.themeInfos.fldName) {
                        if (attStruct.FldType[i] == "string") {
                            return;
                        }
                        fldIndex = i;
                    }
                }

                if (sfArr !== undefined && sfArr != null) {
                    var sumVal = 0;
                    for (var i = 0; i < sfArr.length; i++) {
                        var val = parseFloat(sfArr[i].AttValue[fldIndex]);
                        if (val > 0) {
                            sumVal += val;
                        }
                    }

                    var wid = extent[2] - extent[0];
                    var hei = extent[3] - extent[1];
                    this.themeInfos.baseValue = sumVal / Math.max(wid, hei);

                } /*end of if (goog.isDefAndNotNull(sfArr))*/
            } /*end of if (this.themeInfos.baseValue == 0)*/
        } /*end of if (goog.isDefAndNotNull(data))*/

        this.queryParam.struct.IncludeGeometry = true;
        for (var i = 0; i < gridExtentArr[0].length; i++) {
            this.ClientTheme.GetFeatureByExtent(gridExtentArr[0][i], true, this.map);
        }
        for (var i = 0; i < gridExtentArr[1].length; i++) {
            this.ClientTheme.GetFeatureByExtent(gridExtentArr[1][i], false, this.map);
        }
    });
};

/**
* Method: 客户端专题图绘制入口函数：实现根据图层范围及视图范围分块请求
* @param {}
* @return
*/
Zondy.ClientTheme.prototype.LayerRender = function () {
    if (this.map != null && (this.ClientThemeInfos !== undefined && this.ClientThemeInfos != null)) {

        var viewExtent = this.map.getView().calculateExtent(this.map.getSize());
        if (!ol.extent.isEmpty(viewExtent)) {
            if (this.ClientThemeInfos instanceof Zondy.ClientGradeInfos ||
            this.ClientThemeInfos instanceof Zondy.ClientDensityInfos) {
                var gridExtentArr = this.GetGridExtendArr(viewExtent);
                this.GetBaseValue(this.layerExtend, gridExtentArr);
            }
            else {
                if (this.ClientThemeInfos instanceof Zondy.ClientStatisticInfos) {
                    var layerNames = this.layerURL.split('/');
                    var chartThemeDiv = layerNames[layerNames.length - 1] + "-popUp";
                    this.ClientThemeInfos.chartThemeDiv = chartThemeDiv;
                    if (document.getElementById(chartThemeDiv) !== undefined && document.getElementById(chartThemeDiv) != null) {
                        $("#" + chartThemeDiv).empty();
                    }
                    else {
                        $("#map").append('<div id="' + chartThemeDiv + '"></div>');
                    }
                    this.vectLayer.setVisible(false);
                    this.map.ClientThemeInfos = this.ClientThemeInfos;
                    this.map.vectLayer = this.vectLayer;
                    this.map.on('moveend', this.UpdateRangeRender);
                }

                var gridExtentArr = this.GetGridExtendArr(viewExtent);
                for (var i = 0; i < gridExtentArr[0].length; i++) {
                    this.GetFeatureByExtent(gridExtentArr[0][i], true, this.map);
                }
                for (var i = 0; i < gridExtentArr[1].length; i++) {
                    this.GetFeatureByExtent(gridExtentArr[1][i], false, this.map);
                }
            }
        }
    }
};

/**
* Method: 客户端专题图更新（只有在绘制专题图：LayerRender完成后才能调用）
* @param {}
* @return
*/
Zondy.ClientTheme.prototype.UpdateLayerRender = function () {
    if (this.map != null && this.vectLayer != null && this.ClientThemeInfos !== undefined && this.ClientThemeInfos != null) {
        var vectSource = this.vectLayer.getSource();

        var viewExtent = this.map.getView().calculateExtent(this.map.getSize());
        if (!ol.extent.isEmpty(viewExtent)) {
            var gridExtentArr = this.GetGridExtendArr(viewExtent);

            if (this.ClientThemeInfos instanceof Zondy.ClientStatisticInfos) {
                var resolution = this.map.getView().getResolution();
                var OverLayers = this.map.getOverlays().getArray();
                for (var k = OverLayers.length; k > 0; k--) {
                    this.map.removeOverlay(OverLayers[k - 1]);
                }
                $("#" + this.ClientThemeInfos.chartThemeDiv).empty();

                var featureArr = vectSource.getFeaturesInExtent(viewExtent);
                this.ClientThemeInfos.AddChartInView(featureArr, this.map);
            } /*end of if (this.ClientThemeInfos instanceof Zondy.ClientStatisticInfos)*/
            else {
                var gridExtents = gridExtentArr[0].concat(gridExtentArr[1]);
                for (var i = 0; i < gridExtents.length; i++) {
                    var featureArr = vectSource.getFeaturesInExtent(gridExtents[i]);
                    for (var j = 0; j < featureArr.length; j++) {
                        if (this.ClientThemeInfos instanceof Zondy.ClientDensityInfos) {
                            if (featureArr[j].getGeometry() instanceof ol.geom.Circle) {
                                vectSource.removeFeature(featureArr[j]);
                            }
                            else {
                                var dotFeature = this.ClientThemeInfos.SetThemeInfo(featureArr[j]);
                                if (dotFeature !== undefined && dotFeature != null) {
                                    vectSource.addFeatures([dotFeature]);
                                } else {
                                    vectSource.removeFeature(featureArr[j]);
                                }
                            }
                        }
                        else {
                            this.ClientThemeInfos.SetThemeInfo(featureArr[j]);
                        }
                    }
                }
            }
        } /*end of if(!ol.extent.isEmpty(viewExtent)) */
    } /*end of if (this.map != null && this.vectLayer != null && goog.isDefAndNotNull(this.ClientThemeInfos))*/
};

//地图移动事件的回调
Zondy.ClientTheme.prototype.UpdateRangeRender = function (evt) {
    if (this.vectLayer != null && (this.ClientThemeInfos !== undefined && this.ClientThemeInfos != null)) {
        if (this.ClientThemeInfos instanceof Zondy.ClientStatisticInfos) {
            var vectSource = this.vectLayer.getSource();
            var viewExtent = this.getView().calculateExtent(this.getSize());
            if (!ol.extent.isEmpty(viewExtent)) {
                var resolution = this.getView().getResolution();
                var size = Math.max((this.ClientThemeInfos.height, this.ClientThemeInfos.width));
                var OverLayers = this.getOverlays().getArray();
                for (var k = OverLayers.length; k > 0; k--) {
                    var position = OverLayers[k - 1].getPosition();
                    if (position[0] > viewExtent[0] && position[0] < viewExtent[2] &&
                        position[1] > viewExtent[1] && position[1] < viewExtent[3]) {
                        var id = OverLayers[k - 1].getElement().getAttribute("id");
                        var feature = vectSource.getFeatureById(id);
                        var extend = feature.getGeometry().getExtent();
                        var length = Math.max((extend[2] - extend[0]), extend[3] - extend[1]) / resolution;
                        if (length < size) {
                            this.removeOverlay(OverLayers[k - 1]);
                        }
                    }
                    else {
                        this.removeOverlay(OverLayers[k - 1]);
                    }
                }

                var featureArr = vectSource.getFeaturesInExtent(viewExtent);
                this.ClientThemeInfos.AddChartInView(featureArr, this);
            } /*end of if(!ol.extent.isEmpty(viewExtent)) */
        } /*end of if (this.ClientThemeInfos instanceof Zondy.ClientStatisticInfos)*/
    } /*end of if (this.vectLayer != null && goog.isDefAndNotNull(this.ClientThemeInfos))*/
};

/**
* Method: 移除专题图
* @param {}
* @return
*/
Zondy.ClientTheme.prototype.RemoveThemeLayer = function () {
    if (this.map != null) {
        if (this.vectLayer != null) {
            var vectsource = this.vectLayer.getSource();
            vectsource.clear();
            this.map.removeLayer(this.vectLayer);
        }
        if (this.ClientThemeInfos instanceof Zondy.ClientStatisticInfos) {
            var OverLayers = this.map.getOverlays().getArray();
            for (var k = OverLayers.length; k > 0; k--) {
                this.map.removeOverlay(OverLayers[k - 1]);
            }
            $("#" + this.ClientThemeInfos.chartThemeDiv).remove();
            this.map.un('moveend', this.UpdateRangeRender);
        }
    }
};

/**
* Method: 动态生成笛卡尔积(分段专题图计算分段时使用)
* @param {Array<Array<object>>}list
* @return {Array<object>}
*/
Zondy.ClientTheme.prototype.DynamicCreateDescartes = function (list) {
    //parent上一级索引;count指针计数
    var point = {};
    var result = [];
    var pIndex = null;
    var tempCount = 0;
    var temp = [];

    //根据参数列生成指针对象
    for (var index in list) {
        if (typeof list[index] == 'object') {
            point[index] = { 'parent': pIndex, 'count': 0 }
            pIndex = index;
        }
    }

    //单维度数据结构直接返回
    if (pIndex == null) {
        return list;
    }

    //动态生成笛卡尔积
    while (true) {
        for (var index in list) {
            tempCount = point[index]['count'];
            temp.push(list[index][tempCount]);
        }
        //压入结果数组
        result.push(temp);
        temp = [];
        //检查指针最大值问题
        while (true) {
            if (point[index]['count'] + 1 >= list[index].length) {
                point[index]['count'] = 0;
                pIndex = point[index]['parent'];
                if (pIndex == null) {
                    return result;
                }
                //赋值parent进行再次检查
                index = pIndex;
            }
            else {
                point[index]['count']++;
                break;
            }
        }
    }
    return result;
};



/**
专题图信息
*/
goog.provide("Zondy.ClientThemeInfos");
/**
* @classdesc
* 专题图信息
* @constructor
* @param {Array} themeInfoArr: 专题图信息数组
* @api
*/
Zondy.ClientThemeInfos = function () {
    this.themeInfoArr = new Array();
};
/**
分段专题图
*/
goog.provide("Zondy.ClientClassInfo");
/**
* @classdesc
* 专题图分段信息
* @constructor
* @param {ol.style.Style} style: 分段样式
* @param {json} condition: 分段条件（json格式）<{fldName1:minValue/maxValue,fldName2:minValue/maxValue;}>
* @api
*/
Zondy.ClientClassInfo = function (style, condition) {
    this.style = (style !== undefined && style != null) ? style : null;
    this.classFldCondition = (condition !== undefined && condition != null) ? condition : null;
};

goog.provide("Zondy.ClientClassInfos");
/**
* @classdesc
* 分段专题图信息
* @constructor
* @param {Array<string>} classFldNames: 分段字段
* @param {Array<int>} classRangeNum: 分段数数组
* @api
*/
Zondy.ClientClassInfos = function (fldNames, classRangeNum) {
    Zondy.ClientThemeInfos.call(this);
    this.classFldNames = (fldNames !== undefined && fldNames != null) ? fldNames : null;
    this.classRangeNum = (classRangeNum !== undefined && classRangeNum != null) ? classRangeNum : null;
};
ol.inherits(Zondy.ClientClassInfos, Zondy.ClientThemeInfos);

/**
* 添加分段信息
* @param {json} conditionJson:分段条件（json格式）<{fldName1:minValue/maxValue,fldName2:minValue/maxValue;}>
* @param {ol.style.Style} style:分段样式
*/
Zondy.ClientClassInfos.prototype.AppendClassInfo = function (conditionJson, style) {
    var condition = (conditionJson !== undefined && conditionJson != null) ? conditionJson : "";
    var style = (style !== undefined && style != null) ? style : new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.4)'
        }),
        stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 1.25
        })
    });
    var classInfo = new Zondy.ClientClassInfo();
    classInfo.classFldCondition = condition;
    classInfo.style = style;
    this.themeInfoArr.push(classInfo);
};

/**
* 根据分段信息设置要素的样式
* @param {ol.Feature} feature:OL3要素
*/
Zondy.ClientClassInfos.prototype.SetThemeInfo = function (feature) {
    if (feature !== undefined && feature != null) {
        for (var j = 0; j < this.themeInfoArr.length; j++) {
            var classInfoCondition = this.themeInfoArr[j].classFldCondition;
            if (this.matchClassCondition(feature, classInfoCondition)) {
                feature.setStyle(this.themeInfoArr[j].style);
            }
        }
    }
};

/**
* 根据要素属性值匹配分段信息
* @param {ol.Feature} feature:OL3要素
* @param {json} classFldCondition: 分段条件（json格式）<{fldName1:minValue/maxValue,fldName2:minValue/maxValue;}>
* @return :true/false(是否匹配某一分段)
*/
Zondy.ClientClassInfos.prototype.matchClassCondition = function (feature, classFldCondition) {
    var isMatch = true;
    for (var i = 0; i < this.classFldNames.length; i++) {
        var fldvalueRange = classFldCondition[this.classFldNames[i]];
        var minValue = Number(fldvalueRange.split('/')[0]);
        var maxValue = Number(fldvalueRange.split('/')[1]);
        var fldValue = Number(feature.values_[this.classFldNames[i]]);
        if (fldValue < minValue || fldValue >= maxValue) {
            isMatch = false;
            break;
        }
    }
    return isMatch;
};
/**
单值专题图
*/
goog.provide("Zondy.ClientUniqueInfo");
/**
* @classdesc
* 单值专题图信息
* @constructor
* @param {ol.style.Style} style: 单值样式
* @param {string} fldValue: 单值
* @api
*/
Zondy.ClientUniqueInfo = function (style, fldValue) {
    this.style = (style !== undefined && style != null) ? style : null;
    this.fldValue = (fldValue !== undefined && fldValue != null) ? fldValue : null;
};

goog.provide("Zondy.ClientUniqueInfos");
/**
* @classdesc
* 单值专题图信息
* @constructor
* @param {string} fldName: 单值字段
* @param {ol.style.Style} style:默认样式
* @param {boolean} isGradualColor:默认样式是否渐进色显示
* @api
*/
Zondy.ClientUniqueInfos = function (fldName, opt_options) {
    Zondy.ClientThemeInfos.call(this);
    this.fldName = (fldName !== undefined) ? fldName : null;
    var options = (opt_options !== undefined) ? opt_options : {};
    this.defaultStyle = (options.defaultStyle !== undefined) ? options.defaultStyle : new ol.style.Style({
        fill: new ol.style.Fill({ color: 'rgba(255,255,255,0.4)' }),
        stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 1.25
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({ color: 'rgba(255,255,255,0.4)' })
        })
    });
    this.isGradualColor = (options.isGradualColor !== undefined) ? options.isGradualColor : false;
};
ol.inherits(Zondy.ClientUniqueInfos, Zondy.ClientThemeInfos);

/**
* 添加单值信息
* @param {string} fldValue:单值
* @param {ol.style.Style} style:单值样式
*/
Zondy.ClientUniqueInfos.prototype.AppendUniqueInfo = function (fldValue, style) {
    var fldValue = (fldValue !== undefined) ? fldValue : "";
    var fill = new ol.style.Fill({ color: 'rgba(255,255,255,0.4)' });
    var style = (style !== undefined) ? style : new ol.style.Style({
        fill: fill,
        stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 1.25
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: fill
        })
    });
    var uniqueInfo = new Zondy.ClientUniqueInfo();
    uniqueInfo.fldValue = fldValue;
    uniqueInfo.style = style;
    this.themeInfoArr.push(uniqueInfo);
};

/**
* 设置要素的样式
* @param {ol.Feature} feature:OL3要素
*/
Zondy.ClientUniqueInfos.prototype.SetThemeInfo = function (feature) {
    if (feature !== undefined) {
        if (this.themeInfoArr.length > 0) {
            for (var i = 0; i < this.themeInfoArr.length; i++) {
                if (feature.values_[this.fldName] == this.themeInfoArr[i].fldValue) {
                    feature.setStyle(this.themeInfoArr[i].style);
                    break;
                }
                else {
                    var style = this.getDefaultStyle();
                    feature.setStyle(style);
                }
            }
        }
        else {
            var style = this.getDefaultStyle();
            feature.setStyle(style);
        }
    }
};

/**
* 获取要素的默认样式
*/
Zondy.ClientUniqueInfos.prototype.getDefaultStyle = function () {
    var fillColor = "";
    if (this.defaultStyle == null) {
        fillColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }
    else {
        if (this.isGradualColor) {
            var defaultFillClr = this.defaultStyle.getFill().getColor().split(',');
            var r = Math.round(Math.random() * 255);
            var g = defaultFillClr[1];
            var b = defaultFillClr[2];
            fillColor = "rgba(" + r + "," + g + "," + b + ", 0.4)";
        }
        else {
            return this.defaultStyle;
        }
    }
    var fill = new ol.style.Fill({ color: fillColor });
    var style = new ol.style.Style({
        fill: fill,
        stroke: new ol.style.Stroke({
            color: fillColor,
            width: 1.25
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: fill
        })
    });
    return style;
};
/**
统一专题图
*/
goog.provide("Zondy.ClientUnifiedInfos");

/**
* @classdesc
* 统一专题图信息
* @constructor
* @param {ol.style.Style} style:默认样式
* @api
*/
Zondy.ClientUnifiedInfos = function (style) {
    Zondy.ClientThemeInfos.call(this);
    var fill = new ol.style.Fill({ color: 'rgba(255,255,255,0.4)' });
    this.defaultStyle = (style !== undefined && style != null) ? style : new ol.style.Style({
        fill: fill,
        stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 1.25
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: fill
        })
    });
};
ol.inherits(Zondy.ClientUnifiedInfos, Zondy.ClientThemeInfos);

/**
* 设置要素的样式
* @param {ol.Feature} feature:OL3要素
*/
Zondy.ClientUnifiedInfos.prototype.SetThemeInfo = function (feature) {
    if (feature !== undefined && feature != null) {
        var style = this.defaultStyle;
        feature.setStyle(style);
    }
};
/**
随机专题图
*/
goog.provide("Zondy.ClientRandomInfos");
/**
* @classdesc
* 随机专题图信息
* @constructor
* @api
*/
Zondy.ClientRandomInfos = function () {
    Zondy.ClientThemeInfos.call(this);
};
ol.inherits(Zondy.ClientRandomInfos, Zondy.ClientThemeInfos);

/**
* 设置要素的样式
* @param {ol.Feature} feature:OL3要素
*/
Zondy.ClientRandomInfos.prototype.SetThemeInfo = function (feature) {
    if (feature !== undefined && feature != null) {
        var fillColor = '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
        var fill = new ol.style.Fill({ color: fillColor });
        var style = new ol.style.Style({
            fill: fill,
            stroke: new ol.style.Stroke({
                color: fillColor,
                width: 1.25
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: fill
            })
        });
        feature.setStyle(style);
    }
};
/**
四色专题图
*/
goog.provide("Zondy.ClientFourClrInfos");

/**
* @classdesc
* 四色专题图信息
* @constructor
* @param {Array} fourClrInfoArry:四色信息数组
* @api
*/
Zondy.ClientFourClrInfos = function (fourClrInfoArry) {
    Zondy.ClientThemeInfos.call(this);
    this.fourClrInfoArry = (fourClrInfoArry !== undefined && fourClrInfoArry != null) ? fourClrInfoArry : null;
    this.queryCnt = 0;
};
ol.inherits(Zondy.ClientFourClrInfos, Zondy.ClientThemeInfos);


/**
* @classdesc
* 设置四色专题图配色信息
* @constructor
* @param {ol.source.Vector} vectSource 矢量资源
*/
Zondy.ClientFourClrInfos.prototype.SetFourClrInfos = function (vectSource) {
    console.time('ClientFourClrInfos');

    var featureArr = this.getRelateFeatures(vectSource);
    var relationList = this.getRalateMatrix(vectSource, featureArr);

    var s = featureArr.length;
    var i = 1;       //i表示区域序号，i=2即第二个区域
    var k = 0;       //k表示颜色序号
    var j = 0;
    var iMax = 0;
    var bFlag = false;
    var clrNum = 4;
    var Color = new Array(clrNum);     //用于判断第1，2，3，4种颜色是否用过
    var multi = new Array(s);
    multi[0] = 1;    //第一个区域即featureArr[0]填上1号颜色

    while (i < s) {
        loop:
            {
                k = 1;
                while (1) {
                    for (j = 1; j <= clrNum; j++)
                        Color[j - 1] = 0;    //储存颜色的数组Color清0

                    iMax = iMax > i ? iMax : i;

                    j = 0;
                    while (j < relationList[i].length) {
                        var nID = relationList[i][j];       //指相邻的区域的索引号
                        if (multi[nID] > 0)		            //已经赋过颜色  判断Matrix[i][j]是否关联
                            Color[multi[nID] - 1] = -1;     //关联则登记这号颜色用过==-1

                        j++;
                    }

                    while (k <= clrNum) {
                        if (Color[k - 1] == 0)       //判断k号颜色是否用过  == 0没有用过，可以赋色
                        {
                            bFlag = true;
                            multi[i] = k;   //把第k种颜色给第i个区域
                            i++;
                            break loop;

                        }
                        bFlag = false;
                        k++;
                    }

                    if (bFlag == false && multi[i] != 0) {
                        while (k > clrNum) {
                            multi[i] = 0;
                            i--;
                            if (i <= 0)
                                break;
                            k = multi[i] + 1;
                            if (k <= clrNum)
                                break;
                        }
                    }

                    if (multi[i] == 0)     //没有赋过色。若颜色已用尽，则退回到前一个区域改变颜色
                    {
                        while (k > clrNum) {
                            multi[i] = 0;
                            i--;
                            if (i <= 0)
                                break;
                            k = multi[i] + 1;
                            if (k <= clrNum)
                                break;
                        }
                    }

                    if (iMax - i > 50 || i <= 0) {
                        clrNum++;
                        i++;
                        if (clrNum < 16)
                            break;
                        else {
                            return;
                        }
                    }
                    if (i < 1)
                        break;
                }
            }

    }

    for (var i = 0; i < featureArr.length; i++) {
        var colorObj = { fiilColor: multi[i] };
        featureArr[i].setProperties(colorObj);
        this.SetThemeInfo(featureArr[i]);
    }

    console.timeEnd('ClientFourClrInfos');
};

/**
* @classdesc
* 获取邻接要素
* @constructor
* @param {ol.source.Vector} vectSource 矢量资源
* @return {Array <ol.Feature>} 矢量要素数组
*/
Zondy.ClientFourClrInfos.prototype.getRelateFeatures = function (vectSource) {
    var featureArr = new Array();
    var featureArr2 = new Array();

    var totalFeatures = vectSource.getFeatures();
    for (var i = 0; i < totalFeatures.length; i++) {
        var index = { index: i };
        totalFeatures[i].setProperties(index);
    }

    for (var i = 0; i < totalFeatures.length; i++) {
        var geom = totalFeatures[i].getGeometry();
        var mainExtent = this.getMainExtent(geom);
        var featuresInExtent = vectSource.getFeaturesInExtent(mainExtent);
        var relateFeatures = new Array();

        if (featuresInExtent != null) {
            for (var j = 0; j < featuresInExtent.length; j++) {
                var extent = this.getMainExtent(featuresInExtent[j].getGeometry());
                if (totalFeatures[i].values_["index"] != featuresInExtent[j].values_["index"] &&
                    geom.intersectsExtent(extent)) {
                    var isExit = false;
                    for (var k = 0; k < featureArr.length; k++) {
                        if (featureArr[k].values_["index"] == featuresInExtent[j].values_["index"]) {
                            isExit = true;
                            break;
                        }
                    }
                    if (!isExit) {
                        relateFeatures.push(featuresInExtent[j]);
                    }
                }
            }
            if (relateFeatures.length > 0) {
                for (var j = 0; j < relateFeatures.length; j++) {
                    featureArr.push(relateFeatures[j]);
                }
            }
        } /*end of if (featuresInExtent != null) */
    }

    for (var i = 0; i < totalFeatures.length; i++) {
        var isExit = false;
        for (var j = 0; j < featureArr.length; j++) {
            if (totalFeatures[i].values_["index"] == featureArr[j].values_["index"]) {
                isExit = true;
                break;
            }
        }
        if (!isExit) {
            featureArr2.push(totalFeatures[i]);
        }
    }

    for (var i = 0; i < featureArr2.length; i++) {
        var colorObj = { fiilColor: 0 };
        featureArr2[i].setProperties(colorObj);
        this.SetThemeInfo(featureArr2[i]);
    }

    return featureArr;
};

/**
* @classdesc
* 获取邻接矩阵
* @constructor
* @param {Array <ol.Feature>} 矢量要素数组
* @return {Array <Array <Int>>} 邻接矩阵
*/
Zondy.ClientFourClrInfos.prototype.getRalateMatrix = function (vectSource, featureArr) {
    var relationList = new Array(featureArr.length);
    for (var i = 0; i < featureArr.length; i++) {
        relationList[i] = new Array();
        featureArr[i].setId(i);
    }

    for (var i = 0; i < featureArr.length; i++) {
        var geom = featureArr[i].getGeometry();
        var mainExtent = this.getMainExtent(geom);
        var featuresInExtent = vectSource.getFeaturesInExtent(mainExtent);

        if (featuresInExtent != null) {
            for (var j = 0; j < featuresInExtent.length; j++) {
                var fId = featuresInExtent[j].getId();
                var extent = this.getMainExtent(featuresInExtent[j].getGeometry());
                if (fId && i != fId && geom.intersectsExtent(extent)) {
                    var isExit = false;
                    for (var k = 0; k < relationList[i].length; k++) {
                        if (relationList[i][k] == fId) {
                            isExit = true;
                            break;
                        }
                    }
                    if (!isExit) {
                        relationList[i].push(fId);
                    }
                    isExit = false;
                    for (var k = 0; k < relationList[fId].length; k++) {
                        if (relationList[fId][k] == i) {
                            isExit = true;
                            break;
                        }
                    }
                    if (!isExit) {
                        relationList[fId].push(i);
                    }
                } /*end of if (fId && i != fId)*/
            }
        } /*end of if (featuresInExtent != null) {*/
    }

    return relationList;
};

/**
* @classdesc
* 获取最大区域
* @constructor
* @param {ol.geom.Polygon} 多边形
* @return {ol.Extent} 最大多边形范围的外包矩形
*/
Zondy.ClientFourClrInfos.prototype.getMainExtent = function (geom) {
    var mainArea = 0;
    var mainIndex = 0;

    //var simplifiedPolygon = geom.getSimplifiedGeometryInternal(0.25);
    //var coords = simplifiedPolygon.getCoordinates();

    var coords = geom.getCoordinates();
    for (var i = 0; i < coords.length; i++) {
        //if (coords[i].length > 2) {
        var nextArea = new ol.geom.Polygon([coords[i]]).getArea();
        if (mainArea < nextArea) {
            mainArea = nextArea;
            mainIndex = i;
        }
        //}
    }

    //    var mainLength = 0;
    //    var mainIndex = 0;
    //    var coords = geom.getCoordinates();
    //    for (var i = 0; i < coords.length; i++) {
    //        var nextLenth = new ol.geom.LineString(coords[i]).getLength();
    //        if (mainLength < nextLenth) {
    //            mainLength = nextLenth;
    //            mainIndex = i;
    //        }
    //    }

    var mainPoly = new ol.geom.Polygon([geom.getCoordinates()[mainIndex]]);
    return mainPoly.getExtent();
};

/**
* 设置要素的样式
* @param {ol.Feature} feature:OL3要素
*/
Zondy.ClientFourClrInfos.prototype.SetThemeInfo = function (feature) {
    if (feature !== undefined && feature != null) {
        var fillColor;
        var tol;
        var color = feature.values_["fiilColor"] - 1;
        if (color < 0) {
            fillColor = this.fourClrInfoArry[Math.floor(Math.random() * this.fourClrInfoArry.length)];
        }
        else if (color > 3) {
            fillColor = this.fourClrInfoArry[color - 4];
        }
        else {
            fillColor = this.fourClrInfoArry[color];
        }
        var fill = new ol.style.Fill({ color: fillColor });
        var style = new ol.style.Style({
            fill: fill,
            stroke: new ol.style.Stroke({
                color: fillColor,
                width: 1.25
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: fill
            })
        });
        feature.setStyle(style);
    }
};
/**
等级专题图
*/
goog.provide("Zondy.ClientGradeInfos");
/**
* @classdesc
* 等级专题图信息
* @constructor
* @param {string} fldName: 属性字段
* @param {double} baseValue:一像素代表的属性值
* @param {boolean} dispMinus: 是否显示负值
* @param {boolean} dispZero: 是否显示零值
* @param {ol.style.Style} plusStyle: 正值样式
* @param {ol.style.Style} minusStyle: 负值样式
* @param {ol.style.Style} zeroStyle: 零值样式
* @api
*/
Zondy.ClientGradeInfos = function (fldName, opt_options) {
    this.fldName = (fldName !== undefined && fldName != null) ? fldName : null;

    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.ClientThemeInfos.call(this, options);

    this.baseValue = (options.baseValue !== undefined && options.baseValue != null) ? options.baseValue : 0;
    this.dispMinus = (options.dispMinus !== undefined && options.dispMinus != null) ? options.dispMinus : false;
    this.dispZero = (options.dispZero !== undefined && options.dispZero != null) ? options.dispZero : false;

    this.plusStyle = (options.plusStyle !== undefined && options.plusStyle != null) ? options.plusStyle : new ol.style.Style({
        fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.4)' }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255,0,0,0.4)',
            width: 1
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.4)' })
        })
    });
    this.minusStyle = (options.minusStyle !== undefined && options.minusStyle != null) ? options.minusStyle : new ol.style.Style({
        fill: new ol.style.Fill({ color: 'rgba(0,255,0,0.4)' }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0,255,0,0.4)',
            width: 1
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({ color: 'rgba(0,255,0,0.4)' })
        })
    });
    this.zeroStyle = (options.zeroStyle !== undefined && options.zeroStyle != null) ? options.zeroStyle : new ol.style.Style({
        fill: new ol.style.Fill({ color: 'rgba(0,0,255,0.4)' }),
        stroke: new ol.style.Stroke({
            color: 'rgba(0,0,255,0.4)',
            width: 1
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({ color: 'rgba(0,0,255,0.4)' })
        })
    });

    // Zondy.ClientThemeInfos.call(this);
};
ol.inherits(Zondy.ClientGradeInfos, Zondy.ClientThemeInfos);

/**
* 设置要素的样式
* @param {ol.Feature} feature:OL3要素
*/
Zondy.ClientGradeInfos.prototype.SetThemeInfo = function (feature) {
    var style, symbolSize;
    if (feature !== undefined && feature != null && this.baseValue != 0) {
        var val = parseFloat(feature.values_[this.fldName]);
        if (val > 0) {
            symbolSize = val / this.baseValue;
            style = this.plusStyle;
        }
        else if (val < 0 && this.dispMinus) {
            symbolSize = Math.abs(val) / this.baseValue;
            style = this.minusStyle;
        }
        else if (val == 0 && this.dispZero) {
            symbolSize = this.zeroStyle.getImage().radius_;
            style = this.zeroStyle;
        }
        else {
            symbolSize = 0;
            style = new ol.style.Style();
        }
        if (symbolSize > 400) {
            symbolSize = 400;
        }

        feature.getGeometry().setRadius(symbolSize);
        feature.setStyle(style);
    }
};
/**
密度专题图
*/
goog.provide("Zondy.ClientDensityInfos");
/**
* @classdesc
* 等级专题图信息
* @constructor
* @param {string} fldName: 属性字段
* @param {double} baseValue:点代表的属性值
* @param {double} rad:点半径
* @param {ol.style.Style} defaultStyle: 默认样式
* @api
*/
Zondy.ClientDensityInfos = function (fldName, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.ClientThemeInfos.call(this, options);

    this.fldName = (fldName !== undefined && fldName != null) ? fldName : null;
    this.baseValue = (options.baseValue !== undefined && options.baseValue != null) ? options.baseValue : 0;
    this.rad = (options.rad !== undefined && options.rad != null) ? options.rad : 5;
    this.defaultStyle = (options.defaultStyle !== undefined && options.defaultStyle != null) ? options.defaultStyle : new ol.style.Style({
        fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.4)' }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255,0,0,0.4)',
            width: 1
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.4)' })
        })
    });
};
ol.inherits(Zondy.ClientDensityInfos, Zondy.ClientThemeInfos);

/**
* 设置要素的样式
* @param {ol.Feature} feature:多边形要素
* @return {ol.Feature} dotFeature:点集要素
*/
Zondy.ClientDensityInfos.prototype.SetThemeInfo = function (feature) {
    var dotFeature;
    if ((feature !== undefined && feature != null) && this.baseValue != 0) {
        var val = parseFloat(feature.values_[this.fldName]);
        if (val > 0) {
            var dotArr = new Array();
            var num = parseInt(val / this.baseValue);
            var poly = feature.getGeometry();
            var extent = poly.getExtent();
            var wid = extent[2] - extent[0];
            var hei = extent[3] - extent[1];
            var count = Math.ceil(Math.sqrt(num));
            var hCount = 1, vCount = 1;
            var n = 0;
            var inum = 0;
            var val1 = 2, val2 = 2;

            if (num > 100) {
                num = 100
            }

            while ((inum < num) && (n < count * 2) && (num <= 100)) {
                var ver = hei / hCount;
                var her = wid / vCount;

                val2 = 2;

                for (i = 0; i < hCount; i++) {
                    val1 = 2 + Math.pow(parseFloat(-1), parseFloat(i));

                    for (j = 0; j < vCount; j++) {
                        if (inum >= num)
                            break;

                        var x = extent[0] + her * i + her / val2 + 0.5;
                        var y = extent[1] + ver * j + ver / val1 + 0.5;
                        var targetDot = new ol.geom.Point([x, y]);

                        if (targetDot.intersectsExtent(extent)) {
                            //if (Zondy.ClientDensityInfos.prototype.PointInPoly(poly, targetDot)) {
                            var geometry = new ol.geom.Circle([x, y], this.rad);
                            dotArr.push(geometry);
                            inum++;
                            //}
                        }
                        if (val1 < ver)
                            val1 += 1;
                    }
                    if (val2 < her)
                        val2 += 1;
                }
                if (i == hCount) {
                    vCount += 1;
                    hCount += 1;
                    n++;
                }
            }

            if (dotArr.length > 0) {
                var geomCollection = new ol.geom.GeometryCollection();
                geomCollection.setGeometries(dotArr);
                var dotFeature = new ol.Feature();
                dotFeature.setGeometry(geomCollection);
                dotFeature.setStyle(this.defaultStyle);
            }
        }
    }
    return dotFeature;
};

//计算一个点是否在多边形里,参数:点,多边形数组
Zondy.ClientDensityInfos.prototype.PointInPoly = function (polygon, point) {
    var testx = point.getCoordinates()[0];
    var testy = point.getCoordinates()[1];
    var coords = polygon.getCoordinates()[0];

    var vertx = new Array();
    var verty = new Array();
    for (var k = 0; k < coords.length; k++) {
        vertx.push(coords[k][0]);
        verty.push(coords[k][1]);
    }

    var i, j, c = 0;
    for (i = 0, j = coords.length - 1; i < coords.length; j = i++) {
        if (((verty[i] > testy) != (verty[j] > testy)) &&
            (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]))
            c = !c;
    }

    return c;
};
/**
统计专题图
*/
goog.provide("Zondy.ClientStatisticInfos");
/**
* @classdesc
* 等级专题图信息 ,当前接口需要先引入echart2的库
* @constructor
* @param {Array<string>} fldNames: 统计字段数组
* @param {string} chartType:统计图类型
* @param {Number} height:统计图高度
* @param {Number} width:统计图宽度
* @param {string} chartThemeDiv:存放统计图的div名称
* @api
*/
Zondy.ClientStatisticInfos = function (fldNames, opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    Zondy.ClientThemeInfos.call(this, options);

    this.fldNames = (fldNames !== undefined && fldNames != null) ? fldNames : null;
    this.chartType = (options.chartType !== undefined && options.chartType != null) ? options.chartType : Zondy.ClientStatisticInfos.ChartType.bar;
    this.height = (options.height !== undefined && options.height != null) ? options.height : 200;
    this.width = (options.width !== undefined && options.width != null) ? options.width : 200;
    this.chartThemeDiv = null;
};
ol.inherits(Zondy.ClientStatisticInfos, Zondy.ClientThemeInfos);

/**
* 设置要素的样式
* @param {ol.Feature} feature:OL3要素
* @return {ol.Overlay} overLayer:OL3叠加图层
*/
Zondy.ClientStatisticInfos.prototype.SetThemeInfo = function (feature) {
    feature.setId(feature.values_["fId"]);
    var id = feature.values_["fId"].toString();

    var width = this.width;
    if (this.chartType == "bar" || this.chartType == "line") {
        width += this.fldNames.length * 5;
    }
    var content = '<div id="' + id + '" style="height:' + this.height + 'px; width:' + width + 'px;"></div>';
    $("#" + this.chartThemeDiv).append(content);

    var flds = new Array();
    var data = new Array();
    var fldData = new Array();
    for (var i = 0; i < this.fldNames.length; i++) {
        var fldVal = parseFloat(feature.values_[this.fldNames[i]]).toFixed(2);
        flds.push(this.fldNames[i]);
        data.push(fldVal);

        var field = new Object;
        field["value"] = fldVal;
        field["name"] = this.fldNames[i];
        fldData.push(field);
    }

    var chartType = this.chartType;
    var rad = "55%";
    var center = ['50%', '60%'];
    if (chartType == "ring") {
        chartType = "pie";
        rad = ['50%', '70%'];
    }

    // 使用
    require(
        [
            'echarts',
            'echarts/chart/' + chartType  // 使用柱状图就加载bar模块，按需加载
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById(id));

            var option;
            switch (chartType) {
                case "bar":
                case "line":
                    {
                        option = {
                            tooltip: {
                                show: true
                            },
                            legend: {
                                data: [id]
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: flds
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    "name": id,
                                    "type": chartType,
                                    "data": data
                                }
                            ]
                        };
                    }
                    break;
                case "pie":
                    {
                        option = {
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                                orient: 'vertical',
                                x: 'left',
                                data: flds
                            },
                            calculable: false,
                            series: [
                                {
                                    name: id,
                                    type: chartType,
                                    radius: rad,
                                    center: center,
                                    data: fldData
                                }
                            ]
                        };
                    }
                    break;
                default:
                    return null;
            }

            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    )

    var element = document.getElementById(id);
    var extent = feature.getGeometry().getExtent();
    var x = (extent[2] + extent[0]) / 2;
    var y = (extent[3] + extent[1]) / 2;

    var overLayer = new ol.Overlay({
        element: element,
        position: [x, y],
        positioning: 'bottom-center',
        stopEvent: false
    });

    return overLayer;
};

/**
* Method: 添加统计图到当前视窗内
* @param {  Array<ol.Feature> } featureArr ：要素数组
* @param { ol.Map } map ：地图容器
*/
Zondy.ClientStatisticInfos.prototype.AddChartInView = function (featureArr, map) {
    var resolution = map.getView().getResolution();
    var viewExtent = map.getView().calculateExtent(map.getSize());
    for (var i = 0; i < featureArr.length; i++) {
        if (document.getElementById(featureArr[i].values_["fId"].toString()) != null) {
            var extent = featureArr[i].getGeometry().getExtent();
            var position = [(extent[2] + extent[0]) / 2, (extent[3] + extent[1]) / 2];
            if (position[0] > viewExtent[0] && position[0] < viewExtent[2] &&
                                position[1] > viewExtent[1] && position[1] < viewExtent[3]) {
                var length = Math.max((extent[2] - extent[0]), extent[3] - extent[1]) / resolution;
                if (length > 200) {
                    var overlay = this.SetThemeInfo(featureArr[i]);
                    map.addOverlay(overlay);
                }
            }
        }
    }
};

goog.provide("Zondy.ClientStatisticInfos.ChartType");
Zondy.ClientStatisticInfos.ChartType = {
    bar: "bar",
    pie: "pie",
    line: "line"
};
//**********************************************************Zondy.ClientTheme(end)************************************************//
//**********************************************************Zondy.Object.NetAnalyse(start)************************************************//
goog.provide('Zondy.Object.NetAnalyse');

/// <summary>线对象构造函数</summary>
/// <param name="arcs" type="Array,Zondy.Object.Arc in an Array">一组Zondy.Object.Arc，用以描述弧段</param>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Object.NetAnalyse = function (opt_options) {
    var options = (opt_options !== undefined) ? opt_options : {};
    this.netCls = options.netCls !== undefined ? options.netCls : null;               //网络类
    this.flagPosStr = options.flagPosStr !== undefined ? options.flagPosStr : null;           //网标序列，包括点上网标、网线网标
    this.barrierPosStr = options.barrierPosStr !== undefined ? options.barrierPosStr : null;        //障碍序列，包括点上障碍、线上障碍
    this.weight = options.weight !== undefined ? options.weight : null;               //权值
    this.mode = options.mode !== undefined ? options.mode : null;                 //分析模式
    this.isTour = options.isTour !== undefined ? options.isTour : false;              //是否迂回
    this.isTravel = options.isTravel !== undefined ? options.isTravel : false;            //是否游历
    this.usedTWgt = options.usedTWgt !== undefined ? options.usedTWgt : false;            //是否启用转角权值
    this.turnWgt = options.turnWgt !== undefined ? options.turnWgt : null;              //转角权值
    this.roadName = options.roadName !== undefined ? options.roadName : "name";            //生成报告时道路名称字段
    ol.obj.assign(this, options);
};
//**********************************************************Zondy.Object.NetAnalyse(end)************************************************//
//**********************************************************Zondy.Service.NetAnalysisExtent(start)************************************************//
goog.provide('Zondy.Service.NetAnalysisExtent');


/// <summary>空间分析服务基类构造函数</summary>
/// <param name="opt_options" type="Object">属性键值对</param>
Zondy.Service.NetAnalysisExtent = function (opt_options) {
    var options = opt_options ? opt_options : {};
    Zondy.Service.AnalysisBase.call(this, options);
    //网络类url
    this.netClsUrl = options.netClsUrl !== undefined ? options.netClsUrl : null;
    //网标序列，包括点上网标、网线网标
    this.flagPosStr = options.flagPosStr !== undefined ? options.flagPosStr : null;
    //分析模式，包括用户模式、系统模式（系统模型下有六种分析方式）
    this.analyTp = options.analyTp !== undefined ? options.analyTp : 'UserMode';
    //权值
    this.weight = options.weight !== undefined ? options.weight : ',Weight1,Weight1';
    //返回格式
    this.outFormat = options.outFormat !== undefined ? options.outFormat : 'JSON';
    //网络元素类型，包括结点元素、边线元素、以及其他分析中会用到的如源、汇等类型。
    this.elementType = options.elementType !== undefined ? options.elementType : 2;
    //网标或障碍的捕捉精度
    this.nearDis = options.nearDis !== undefined ? options.nearDis : 0.001;
    //障碍序列，包括点上障碍、线上障碍
    this.barrierPosStr = options.barrierPosStr !== undefined ? options.barrierPosStr : null;
    //生成报告时道路名称字段
    this.roadName = options.roadName !== undefined ? options.roadName : "name";

    ol.obj.assign(this, options);
    this.partUrl = "netAnalyse";
};
ol.inherits(Zondy.Service.NetAnalysisExtent, Zondy.Service.AnalysisBase);

/** 
* 获取网络类权值信息（只支持GET方式）
* Parameters:
* infoType-{string}获取网络类信息类型,取值"weight"
* onSuccess - {function} 执行成功的回调函数 
* onError - {function} 执行失败的回调函数 
* resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
* type-{string}请求类型,取值"Get","Post"，当前功能默认只取值GET，设置POST无效，只做兼容保留
* contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
* options-{Object} 主要用来扩展ajax的参数，一般无需设置
*/
Zondy.Service.NetAnalysisExtent.prototype.getNetInfo = function (infoType, onSuccess, onError, options) {
    if (infoType == null || infoType == undefined) {
        infoType = "weight";
    }
    //当前服务默认只支持GET方式
    this.baseUrl = "igs/rest/netAnaly";
    this.partUrl = "netClsInfo?netCls=" + this.netClsUrl + "&type=" + infoType;
    this.ajax(null, null, onSuccess, "GET", null, null, onError, options);
};
/** 
* 添加网标(支持GET和POST两种方式)
* Parameters:
* dotVal-{string}添加网标点坐标,格式为"x1,y1,x2,y2,...",
* onSuccess - {function} 执行成功的回调函数 
* onError - {function} 执行失败的回调函数 
* resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
* type-{string}请求类型,取值"Get","Post"，当前功能默认GET方式，也可以设置POST的方式
* contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
* options-{Object} 主要用来扩展ajax的参数，一般无需设置
*/
Zondy.Service.NetAnalysisExtent.prototype.addNetFlag = function (dotVal, onSuccess, onError, type, options) {
    var postString = null;
    if (type != null && type.toUpperCase() == "POST") {
        var postObj = {};
        postObj.dotVal = dotVal;
        dotVal = "";
        postString = $.toJSON(postObj);
    }
    this.baseUrl = "igs/rest/netAnaly";
    this.partUrl = "netClsFlag?netCls=" + this.netClsUrl + "&type=" + this.elementType + "&value=" + dotVal + "&nearDis=" + this.nearDis;
    this.ajax(null, postString, onSuccess, type, null, null, onError, options);
};
/** 
* 执行网络分析（只支持POST方式）
* Parameters:
* dataObject-{Object}服务器发送的数据
* onSuccess - {function} 执行成功的回调函数 
* onError - {function} 执行失败的回调函数 
* resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
* type-{string}请求类型,取值"Get","Post"，当前功能默认只提供POST的方式，GET方式设置无效，只做兼容保留
* contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
* options-{Object} 主要用来扩展ajax的参数，一般无需设置
*/
Zondy.Service.NetAnalysisExtent.prototype.netAnalyse = function (dataObject, onSuccess, onError, options) {
    this.baseUrl = "igs/rest/netAnaly";
    this.partUrl = "netAnalyse";
    //当前服务只支持POST的方式
    this.ajax(null, dataObject, onSuccess, "POST", null, null, onError, options);
};
/** 
* 执行多策略网络分析（只支持POST方式）
* Parameters:
* dataObject-{Object}服务器发送的数据
* onSuccess - {function} 执行成功的回调函数 
* onError - {function} 执行失败的回调函数 
* resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
* type-{string}请求类型,取值"Get","Post"，当前功能默认只提供POST的方式，GET方式设置无效，只做兼容保留
* contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
* options-{Object} 主要用来扩展ajax的参数，一般无需设置
*/
Zondy.Service.NetAnalysisExtent.prototype.comNetAnalyse = function (dataObject, onSuccess, onError, options) {
    this.baseUrl = "igs/rest/netAnaly";
    this.partUrl = "comNetAnalyse";
    this.ajax(null, dataObject, onSuccess, "POST", null, null, onError, options);
};
/** 
* 执行多路网络分析（只支持POST方式）
* Parameters:
* dataObject-{Object}服务器发送的数据
* onSuccess - {function} 执行成功的回调函数 
* onError - {function} 执行失败的回调函数 
* resultFormat-{string}回调结果的包装形式，取值为'json','xml',默认为json格式
* type-{string}请求类型,取值"Get","Post"，当前功能默认只提供POST的方式，GET方式设置无效，只做兼容保留
* contentType-{string}get方式默认为‘application/x-www-form-urlencoded’，post默认为text/plain,一般使用默认即可
* options-{Object} 主要用来扩展ajax的参数，一般无需设置
*/
Zondy.Service.NetAnalysisExtent.prototype.pluNetAnalyse = function (dataObject, onSuccess, onError, options) {
    this.baseUrl = "igs/rest/netAnaly";
    this.partUrl = "pluNetAnalyse";
    //当前服务只支持post的方式
    this.ajax(null, dataObject, onSuccess, "POST", null, null, onError, options);
};
//**********************************************************Zondy.Service.NetAnalysisExtent(end)************************************************//

/**********************************************************ContourAnalyse.js**********************************************************/
Zondy.Object.ContourAnalyse = {};
/**
*  离散数据网格化参数类
*  *param {string} SfClsURL 点简单要素类URL
*  param {string} FieldName Z值所在的字段名称
*  param {int} XCellNum 生成的影像X方向网格数。只输出X方向网格数，计算时Y方向网格密度会自动与X方向保持一致,默认值为200
*  param {Rect} Bound 生成的栅格数据集逻辑范围，如果为NULL则使用点简单要素类的逻辑范围
*/

Zondy.Object.ContourAnalyse.MeshingParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.SfClsURL = options.SfClsURL != undefined ? options.SfClsURL : null;
    this.FieldName = options.FieldName != undefined ? options.FieldName : null;
    this.XCellNum = options.XCellNum != undefined ? options.XCellNum : 200;
    this.Bound = options.Bound != undefined ? options.Bound : null;
};
/**
*	平面等值线追踪所用到的注记参数类
*param {bool} IsClipLine 注记是否剪断线(true/false 剪断/不剪断),默认值为true
*param {bool} isXYScaleOut 是否输出轴向标尺,默认值为false
*param {int} NoteDirection 注记方向(1/2/3:斜坡上方/斜坡下方/图幅上方),默认值为1
*param {double} LineWidth 注记等值线线宽,默认值为0.05
*param {float} MaxAngle 注记的最大倾角,默认值为90.0
*param {float} MinDist 注记间最小允许距离,默认值为10.0
*param {bool} IsAbs 数值是否取绝对值,默认值为false
*param {bool} IsComma 数值是否采用千位分隔符,默认值为false
*param {short} DigitNum 注记数值的小数位数,默认值为0
*param {int} FormatNo 数据格式 （0/1/2: 定点/科学/通常）,默认值为0
*param {int} LogFlag 取对数标志（0/1/2: 未取对数/10为底/自然对数）,默认值为0
*param {string} Prefix 注记前缀,默认值为""
*param {string} Suffix 注记后缀,默认值为""
*param {int} ColorNo 注记颜色号,默认值为0
*param {float} FixSize 注记尺寸,默认值为0.01
*param {short} FontNo 注记字体号,默认值为0
*/
Zondy.Object.ContourAnalyse.ContourNoteParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.IsClipLine = options.IsClipLine != undefined ? options.IsClipLine : true;
    this.isXYScaleOut = options.isXYScaleOut != undefined ? options.isXYScaleOut : false;
    this.NoteDirection = options.NoteDirection != undefined ? options.NoteDirection : 1;
    this.LineWidth = options.LineWidth != undefined ? options.LineWidth : 0.05;
    this.MaxAngle = options.MaxAngle != undefined ? options.MaxAngle : 90.0;
    this.MinDist = options.MinDist != undefined ? options.MinDist : 10.0;
    this.IsAbs = options.IsAbs != undefined ? options.IsAbs : false;
    this.IsComma = options.IsComma != undefined ? options.IsComma : false;
    this.DigitNum = options.DigitNum != undefined ? options.DigitNum : 0;
    this.FormatNo = options.FormatNo != undefined ? options.FormatNo : 0;
    this.LogFlag = options.LogFlag != undefined ? options.LogFlag : 0;
    this.Prefix = options.Prefix != undefined ? options.Prefix : "";
    this.Suffix = options.Suffix != undefined ? options.Suffix : "";
    this.ColorNo = options.ColorNo != undefined ? options.ColorNo : 0;
    this.FixSize = options.FixSize != undefined ? options.FixSize : 0.01;
    this.FontNo = options.FontNo != undefined ? options.FontNo : 0;
};
/*
*	等值线层参数类，用来描述每一层的信息
*param {double} ZValue 等值线层值，不能为NULL,默认值为1.0
*param {Zondy.Object.ContourAnalyse.CLineInfo} LineInfo 等值线参数，为空则取默认值
*param {Zondy.Object.ContourAnalyse.CRegionInfo} RegInfo 生成区参数，为空则取默认值
*param {bool} IsOutputNote 该层是否绘制注记,默认值为false
*@author fmm 2015-07-01
*/
Zondy.Object.ContourAnalyse.ContourZValue = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.ZValue = options.ZValue != undefined ? options.ZValue : 1;
    this.LineInfo = options.LineInfo != undefined ? options.LineInfo : null;
    this.RegInfo = options.RegInfo != undefined ? options.RegInfo : null;
    this.IsOutputNote = options.IsOutputNote != undefined ? options.IsOutputNote : false;
};
/*
*	描述线参数
*param {double} LinWidth 线宽度,默认值为1
*param {int} Color 线颜色,默认值为1
*param {int} LinStyleID 线型号,默认值为1
*param {int} LinStyleID2 辅助线型号,默认值为0
*param {double} Xscale X比例系数,默认值为1.0
*param {double} Yscale Y比例系数,默认值为1.0
*@author fmm 2015-07-01
*/

Zondy.Object.ContourAnalyse.CLineInfo = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.LinWidth = options.LinWidth != undefined ? options.LinWidth : 1;
    this.Color = options.Color != undefined ? options.Color : 1;
    this.LinStyleID = options.LinStyleID != undefined ? options.LinStyleID : 1;
    this.LinStyleID2 = options.LinStyleID2 != undefined ? options.LinStyleID2 : 0;
    this.Xscale = options.Xscale != undefined ? options.Xscale : 1.0;
    this.Yscale = options.Yscale != undefined ? options.Yscale : 1.0;
};
/*
*	描述区参数
*param {int} PatID 填充图案编号,仅当填充模式为0(常规填充)才有意义。取0则无图案填充,默认值为0
*param {int} FillMode 填充模式,0:常规填充、1:线性渐变填充、2:矩形渐变填充、3:圆形渐变填充,默认值为0
*param {int} FillColor 填充色或起始色,当填充模式为0(常规填充)时,表示区填充色;当填充模式为1(线性渐变填充)或2(矩形渐变填充)或3(圆形渐变填充)时,表示起始色,默认值为1
*param {int} EndColor 终止色,仅当填充模式为1(线性渐变填充)或2(矩形渐变填充)或3(圆形渐变填充)时才有意义,默认值为1
*param {double} PatHeight 图案高,仅当填充模式为0(常规填充)才有意义,默认值为1.0
*param {double} PatWidth 图案宽,仅当填充模式为0(常规填充)才有意义,默认值为1.0
*param {double} PatAngle 图案角度或渐变角度,当填充模式为0(常规填充)时,表示图案角度;当填充模式为1(线性渐变填充)或2(矩形渐变填充)时,表示渐变角度;当填充模式为3(圆形渐变填充)时,此属性无意义,默认值为1.0
*param {int} PatColor 图案颜色,仅当填充模式为0(常规填充)才有意义,默认值为1
*param {double} OutPenWidth 图案笔宽,仅当填充模式为0(常规填充)才有意义,默认值为1.0
*param {short} OverMethod 覆盖方式(无意义),默认值为0
*@author fmm 2015-07-01
*/

Zondy.Object.ContourAnalyse.CRegionInfo = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.PatID = options.PatID != undefined ? options.PatID : 0;
    this.FillMode = options.FillMode != undefined ? options.FillMode : 0;
    this.FillColor = options.FillColor != undefined ? options.FillColor : 1;
    this.PatHeight = options.PatHeight != undefined ? options.PatHeight : 1.0;
    this.PatWidth = options.PatWidth != undefined ? options.PatWidth : 1.0;
    this.PatAngle = options.PatAngle != undefined ? options.PatAngle : 1.0;
    this.PatColor = options.PatColor != undefined ? options.PatColor : 1.0;
    this.OutPenWidth = options.OutPenWidth != undefined ? options.OutPenWidth : 1.0;
    this.OverMethod = options.OverMethod != undefined ? options.OverMethod : 0;
};
/*
*	示坡线参数类
*param {float} XScale X系数,默认值为2.0
*param {float} YScale Y系数,默认值为10.0
*param {short} LineType 线型,默认值为0
*param {short} SubLineType 辅助线型,默认值为0
*/
Zondy.Object.ContourAnalyse.SlopLineParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.XScale = options.XScale != undefined ? options.XScale : 2.0;
    this.YScale = options.YScale != undefined ? options.YScale : 10.0;
    this.LineType = options.LineType != undefined ? options.LineType : 0;
    this.SubLineType = options.SubLineType != undefined ? options.SubLineType : 0;
};
/*
*	平面等值线追踪参数类
*param {bool} IsSmoothLine 是否进行光滑线处理；如果为true则配合SmoothGrade使用,默认值为false
*param {int} SmoothGrade 线光滑程度， 0/1/2分别代表“低/中/高”，仅在IsSmoothLine为true时生效,默认值为1
*param {bool} IsMakeReg 是否生成区,默认值为false
*param {bool} IsMakeNote 是否生成注记,默认值为false
*param {bool} IsMakeSLin 是否输出示坡线,默认值为false
*param {int} MapWay 生成的地图范围的设置方法。0/1/2/3分表表示“自动检测设置/原始数据范围/数据投影变换/用户自定义”,默认值为1
*param {double} FrameWidth 制图宽度，仅在MapWay=3的情况下有效,默认值为1.0
*param {double} FrameHeight 制图高度，仅在MapWay=3的情况下有效,默认值为1.0
*param {bool} IsDrawColorScl 是否绘制色阶。如果绘制，则必须同时指定生成线、区、注记层，任何一个图层都不能忽略生成，才可见色阶输出效果,默认值为false
*param {bool} IsSaveEdge 线图层是否保存边界,默认值为false
*param {Zondy.Object.ContourAnalyse.ContourNoteParam} NoteParam 注记生成参数，如果NULL则取默认值。只有在IsMakeNote为true时该参数才能发挥作用
*param {Zondy.Object.ContourAnalyse.SlopLineParam} SlopLineParam 示坡线参数，如果为NULL则取默认值。只有在IsMakeSLin为true时该参数参能发挥作用
*param {Zondy.Object.ContourAnalyse.ContourZValue[]} ZValues 等值线层参数，不能为NULL
*       如果ZValues的最大层值小于影像最大像元值，则生成的区值区间是ZValues的次大值到像元最大值；如果要绘制ZVlaues最大值到像元最大值区间，需要为ZValues增加一个大于最大像元值的成员
*@author fmm 2015-07-01
*/
Zondy.Object.ContourAnalyse.ContourParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.IsSmoothLine = options.IsSmoothLine != undefined ? options.IsSmoothLine : false;
    this.SmoothGrade = options.SmoothGrade != undefined ? options.SmoothGrade : 1;
    this.IsMakeReg = options.IsMakeReg != undefined ? options.IsMakeReg : false;
    this.IsMakeNote = options.IsMakeNote != undefined ? options.IsMakeNote : false;
    this.IsMakeSLin = options.IsMakeSLin != undefined ? options.IsMakeSLin : false;
    this.MapWay = options.MapWay != undefined ? options.MapWay : 1;
    this.FrameWidth = options.FrameWidth != undefined ? options.FrameWidth : 1.0;
    this.FrameHeight = options.FrameHeight != undefined ? options.FrameHeight : 1.0;
    this.IsDrawColorScl = options.IsDrawColorScl != undefined ? options.IsDrawColorScl : false;
    this.IsSaveEdge = options.IsSaveEdge != undefined ? options.IsSaveEdge : false;
    this.NoteParam = options.NoteParam != undefined ? options.NoteParam : null;
    this.SlopLineParam = options.SlopLineParam != undefined ? options.SlopLineParam : null;
    this.ZValues = options.ZValues != undefined ? options.ZValues : null;
};

/*
*	定义返回到前台参数的类
*@author fmm 2015-07-01
*/
Zondy.Object.ContourAnalyse.ResultContour = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.ip = options.ip != undefined ? options.ip : null;
    this.port = options.port != undefined ? options.port : null;
    this.wp = options.wp != undefined ? options.wp : null;
    this.wl = options.wl != undefined ? options.wl : null;
    this.wt = options.wt != undefined ? options.wt : null;
}

/*
*	定义返回到前台的类，以便转为json对象
*@author fmm 2015-07-01
*/
Zondy.Object.ContourAnalyse.ResultParam = function (opt_options) {
    var options = (opt_options != undefined) ? opt_options : {};
    this.isSuccess = options.isSuccess != undefined ? options.isSuccess : null;
    this.resultContour = options.resultContour != undefined ? options.resultContour : null;
};