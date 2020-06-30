/**********************************************************常量(枚举)定义************************************************/
import {
    Zondy
} from './Base';

/**
 * 数据类型
 * @readonly
 * @enum {String}
 */
var XClsType = {
    /** 简单要素类 */
    SFCls: "SFeatureCls",
    /** 对象类 */
    OCls: "ObjectCls",
    /** 注记类 */
    ACls: "AnnotationCls",
    /** 网络类 */
    GnetCls: "GNetCls",
    /** 栅格数据集 */
    RDS: "RasterDataset",
    /** 简单要素类详细信息 */
    SFClsInfo: "sfcls_new"
};
export {
    XClsType
};
Zondy.Enum.XClsType = XClsType;

/**
 * 矢量数据类型
 * @readonly
 * @enum {Number | String}
 */
var VectClsType = {
    /** 未知类型 */
    Unknown: 0,
    /** 简单要素类 */
    SFCls: "SFeatureCls",
    /** 注记类 */
    AnnoCls: "AnnotationCls"
};
export {
    VectClsType
};
Zondy.Enum.VectClsType = VectClsType;


/**
 * 要素几何类型
 * @readonly
 * @enum {Number}
 */
var FeatureType = {
    /** 未知类型 */
    Unknown: 0,
    /** 点 */
    Pnt: 1,
    /** 线 */
    Lin: 2,
    /** 区 */
    Reg: 3
};
export {
    FeatureType
};
Zondy.Enum.FeatureType = FeatureType;

/**
 * 动态注记字形的类型
 * @readonly
 * @enum {Number}
 */
var FontShape = {
    /** 正体 */
    Positive: 0,
    /** 左斜 */
    LeftOblique: 1,
    /** 右斜 */
    RightOblique: 2,
    /** 左耸 */
    LeftTowering: 3,
    /** 右耸 */
    RightTowering: 4
};
export {
    FontShape
};
Zondy.Enum.FontShape = FontShape;

/**
 * 线的动态注记的线方位类型
 * @readonly
 * @enum {Number}
 */
var LabelLinType = {
    /** 弯曲注记 */
    Curved: 0,
    /** 笔直注记 */
    Forward: 1,
    /** 水平注记 */
    Horizontal: 2,
    /** 正交注记 */
    Tangent: 3
};
export {
    LabelLinType
};
Zondy.Enum.LabelLinType = LabelLinType;

/**
 * 区的动态注记的区方位类型
 * @readonly
 * @enum {Number}
 */
var LabelRegType = {
    /** 沿骨架线弯曲注记 */
    Curved: 0,
    /** 沿骨架线笔直注记 */
    Forward: 1,
    /** 水平注记 */
    Horizontal: 2,
    /** 边界线注记 */
    Boundray: 3,
    /** 区域外注记 */
    Outside: 4
};
export {
    LabelRegType
};
Zondy.Enum.LabelRegType = LabelRegType;

/**
 * 点的动态注记的方位类型
 * @readonly
 * @enum {Number}
 */
var LabelPntType = {
    /** 任意方位 */
    PntAnyDir: 0,
    /** 八方位 */
    PntEightDir: 1,
    /** 压点 */
    PntOnFea: 2
};
export {
    LabelPntType
};
Zondy.Enum.LabelPntType = LabelPntType;

/**
 * 线重复注记策略
 * @readonly
 * @enum {Number}
 */
var RepeatType = {
    /** 自动重复注记（当线长度超过注记长度的2倍时重复注记，否则不重复注记） */
    Auto: 0,
    /** 从不重复注记 */
    NoRep: 1,
    /** 分段注记 */
    OnStep: 2
};
export {
    RepeatType
};
Zondy.Enum.RepeatType = RepeatType;

/**
 * 注记分布的策略
 * @readonly
 * @enum {Number}
 */
var LabelSpreadType = {
    /** 自动分布策略（全是数字或字符采用集中注记方式，注记中带有汉字采用分散分布注记） */
    AutoSpread: 0,
    /** 字符集中分布 */
    Centralization: 1,
    /** 字符分散分布 */
    Decentralization: 2
};
export {
    LabelSpreadType
};
Zondy.Enum.LabelSpreadType = LabelSpreadType;

/**
 * 偏离线约束
 * @readonly
 * @enum {Number}
 */
var LineConstrain = {
    /** 注记在线的左边 */
    Left: 0,
    /** 注记在线的右边 */
    Right: 1,
    /** 注记在线的上方 */
    Above: 2,
    /** 注记在线的下方 */
    Below: 3,
    /** 注记在线的两边 */
    Both: 4,
    /** 没有约束 */
    NoRes: 5
};
export {
    LineConstrain
};
Zondy.Enum.LineConstrain = LineConstrain;

/**
 * 点八方位注记类型
 * @readonly
 * @enum {Number}
 */
var EightDirType = {
    /** 东 */
    East: 0,
    /** 北 */
    North: 1,
    /** 东北 */
    NorthEast: 2,
    /** 西北 */
    NorthWest: 3,
    /** 南 */
    South: 4,
    /** 东南 */
    SouthEast: 5,
    /** 西南 */
    SouthWest: 6,
    /** 西 */
    West: 7,
    /** 无方位 */
    NoDir: 8
};
export {
    EightDirType
};
Zondy.Enum.EightDirType = EightDirType;

/**
 * 是否显示弧段
 * @readonly
 * @enum {Number}
 */
var ISShowArc = {
    /** 只显示填充区域 */
    Reg: 0,
    /** 只显示弧段 */
    Arc: 1,
    /** 两者都显示 */
    All: 2
};
export {
    ISShowArc
};
Zondy.Enum.ISShowArc = ISShowArc;


/***************************网络分析枚举类型******************************************/

/**
 * 网络分析类型
 * @readonly
 * @enum {String}
 */
var NetAnalyType = {

    /** 用户模式 */
    UserMode: "UserMode",

    /** 系统模式--普通公路优先 */
    SysModeCommwayPrefer: "SysModeCommwayPrefer",

    /** 系统模式--高速公路优先 */
    SysModeHighWayPrefer: "SysModeHighWayPrefer",

    /** 系统模式--最少花费 */
    SysModeMinCost: "SysModeMinCost",

    /** 系统模式--最短路径 */
    SysModeMinDis: "SysModeMinDis",

    /** 系统模式--最短时间 */
    SysModeMinDis: "SysModeMinDis",

    /** 系统模式--系统推荐 */
    SysModeSysRecommend: "SysModeSysRecommend"
};
export {
    NetAnalyType
};
Zondy.Enum.Net.NetAnalyType = NetAnalyType;

/**
 * 网络元素类型
 * @readonly
 * @enum {Number}
 */
var NetElemType = {

    /** 节点元素 */
    Node: 1,

    /** 边元素 */
    Edge: 2,

    /** 复杂结点元素 */
    CNode: 3,

    /** 链元素 */
    Chain: 4,

    /** 中心元素 */
    Center: 5,

    /** 源 */
    Source: 13,

    /** 汇 */
    Sink: 13
};
export {
    NetElemType
};
Zondy.Enum.Net.NetElemType = NetElemType;

/**
 * 线型调整方法枚举
 * @readonly
 * @enum {Number}
 */
var CLinAdjustType = {
    /** 调整 */
    Adjust: 0,

    /** 不调整 */
    NoAdjust: 1
};
export {
    CLinAdjustType
};
Zondy.Enum.Theme.CLinAdjustType = CLinAdjustType;

/**
 * 线头类型枚举定义
 * @readonly
 * @enum {Number}
 */
var CLinHeadType = {
    /** 圆头 */
    Round: 0,
    /** 平头 */
    Square: 1,
    /** 尖头 */
    Butt: 2
};
export {
    CLinHeadType
};
Zondy.Enum.Theme.CLinHeadType = CLinHeadType;

/**
 * 线拐角类型枚举
 * @readonly
 * @enum {Number}
 */
var CLinJointType = {
    /** 圆角 */
    Round: 0,
    /** 平角 */
    Square: 1,
    /** 尖角 */
    Butt: 2
};
export {
    CLinJointType
};
Zondy.Enum.Theme.CLinJointType = CLinJointType;

/**
 * 线型生成方法
 * @readonly
 * @enum {Number}
 */
var CLinStyleMakeType = {
    /** 规律性生成线型 */
    Byrule: 0,
    /** 按控制点生成线型 */
    Bypoint: 1
};
export {
    CLinStyleMakeType
};
Zondy.Enum.Theme.CLinStyleMakeType = CLinStyleMakeType;

/**
 * 统计分段类型
 * @readonly
 * @enum {Number}
 */
var CItemType = {
    /** 未知类型 */
    Unknown: 0,
    /** 唯一值 */
    UniqueTheme: 1,
    /** 范围 */
    RangeTheme: 2
};
export {
    CItemType
};
Zondy.Enum.Theme.CItemType = CItemType;
/***************************地图服务相关枚举类型******************************************/


/**
 * 地图类型
 * @readonly
 * @enum {String}
 */
var MapType = {
    /** 发布的地图文档 */
    Doc: "mapType",
    /** 发布的瓦片地图 */
    Tile: "tileType"
};
export {
    MapType
};
Zondy.Enum.Map.MapType = MapType;

/**
 * 图层状态类型
 * @readonly
 * @enum {Zondy.Enum.Map.LayerStatusType}
 */
var LayerStatusType = {
    /** 仅仅显示指定了图层序号的图层 */
    Show: "show",
    /** 显示除hide参数指定图层外所有的图层 */
    Hide: "hide",
    /** 除显示默认图层（地图文档内图层状态为可见的图层）外，另追加这些被指定的图层显示，追加的这些图层必须为地图中包含的图层。 */
    Include: "include",
    /** 从默认图层列表里删除这些被指定的图层后，进行显示 */
    Exclude: "exclude"
};
export {
    LayerStatusType
};
Zondy.Enum.Map.LayerStatusType = LayerStatusType;