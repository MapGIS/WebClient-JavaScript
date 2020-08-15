import {
    AnyLine,
    Arc,
    Zondy,
    CAttStruct,
    CAttDataRow,
    CDisplayStyle,
    CDisplayStyleExtend,
    CDynNoteInfo,
    CGDBInfo,
    Circle,
    CLineInfo,
    CPointInfo,
    CRegionInfo,
    DynNoteLableType,
    DynShowStyle,
    XClsType,
    VectClsType,
    FeatureType,
    FontShape,
    LabelLinType,
    LabelRegType,
    LabelPntType,
    RepeatType,
    LabelSpreadType,
    LineConstrain,
    EightDirType,
    ISShowArc,
    NetAnalyType,
    NetElemType,
    CLinAdjustType,
    CLinHeadType,
    CLinJointType,
    CLinStyleMakeType,
    CItemType,
    MapType,
    LayerStatusType,
    Feature,
    FeatureGeometry,
    FeatureGraphicBase,
    FeatureSet,
    GLine,
    GPoint,
    GRegion,
    LabelLinInfo,
    LabelRegInfo,
    LablePntInfo,
    MultiPolygon,
    Point2D,
    Polygon,
    PolyLine,
    Rectangle,
    Tangram,
    VectCls,
    WebGraphicsInfo,
    extend,
    isArray,
    extendDeep,
    copy,
    copyExcluce,
    reset,
    getElement,
    isElement,
    removeItem,
    indexOf,
    modifyDOMElement,
    applyDefaults,
    getParameterString,
    getWFParameterString,
    urlAppend,
    getParameters,
    IS_GECKO,
    Browser,
    getBrowser,
    isSupportCanvas,
    supportCanvas,
    isInTheSameDomain,
    toJSON,
    transformResult,
    copyAttributes,
    copyAttributesWithClip,
    cloneObject,
    newGuid,
    bind,
    bindAsEventListener,
    getTopAnalysisResult,
    ChineseToUtf8,
    DeepMerge,
    merge,
    mixin
} from './common';

export const Common = {
    AnyLine,
    Arc,
    Zondy,
    CAttStruct,
    CAttDataRow,
    CDisplayStyle,
    CDisplayStyleExtend,
    CDynNoteInfo,
    CGDBInfo,
    Circle,
    CLineInfo,
    CPointInfo,
    CRegionInfo,
    DynNoteLableType,
    DynShowStyle,
    XClsType,
    VectClsType,
    FeatureType,
    FontShape,
    LabelLinType,
    LabelRegType,
    LabelPntType,
    RepeatType,
    LabelSpreadType,
    LineConstrain,
    EightDirType,
    ISShowArc,
    NetAnalyType,
    NetElemType,
    CLinAdjustType,
    CLinHeadType,
    CLinJointType,
    CLinStyleMakeType,
    CItemType,
    MapType,
    LayerStatusType,
    Feature,
    FeatureGeometry,
    FeatureGraphicBase,
    FeatureSet,
    GLine,
    GPoint,
    GRegion,
    LabelLinInfo,
    LabelRegInfo,
    LablePntInfo,
    MultiPolygon,
    Point2D,
    Polygon,
    PolyLine,
    Rectangle,
    Tangram,
    VectCls,
    WebGraphicsInfo,
    extend,
    isArray,
    extendDeep,
    copy,
    copyExcluce,
    reset,
    getElement,
    isElement,
    removeItem,
    indexOf,
    modifyDOMElement,
    applyDefaults,
    getParameterString,
    getWFParameterString,
    urlAppend,
    getParameters,
    IS_GECKO,
    Browser,
    getBrowser,
    isSupportCanvas,
    supportCanvas,
    isInTheSameDomain,
    toJSON,
    transformResult,
    copyAttributes,
    copyAttributesWithClip,
    cloneObject,
    newGuid,
    bind,
    bindAsEventListener,
    getTopAnalysisResult,
    ChineseToUtf8,
    DeepMerge,
    merge,
    mixin
};

import {
    ContourNoteParam,
    ContourParam,
    ContourZValue,
    ContourRegionInfo,
    MeshingParam,
    NetAnalyse,
    NetAnalysisExtent,
    SlopLineParam
} from './extend';

export const Extend = {
    ContourNoteParam,
    ContourParam,
    ContourZValue,
    ContourRegionInfo,
    MeshingParam,
    NetAnalyse,
    NetAnalysisExtent,
    SlopLineParam
};

import { G3DMapDoc, G3DService } from './G3D';

export const G3D = {
    G3DMapDoc,
    G3DService
};

import { CommonServiceBase, Events, CORS, RequestTimeout, FetchRequest, IgsServiceBase, JSONFormat } from './baseserver';

export const BaseServer = {
    CommonServiceBase,
    Events,
    CORS,
    RequestTimeout,
    FetchRequest,
    IgsServiceBase,
    JSONFormat
};

import { ColorInfo, GDBInfo, MapDoc, CatalogService, TileLayer, VectorLayer, SystomInfo } from './MRCS';

export const MRCS = {
    ColorInfo,
    GDBInfo,
    MapDoc,
    CatalogService,
    TileLayer,
    VectorLayer,
    SystomInfo
};

import {
    EditDocFeature,
    EditLayerFeature,
    EditServiceBase,
    MultiGeoQuery,
    MultiGeoQueryParameter,
    ObjClsQuery,
    ObjClsQueryParameter,
    QueryByLayerParameter,
    QueryDocFeature,
    QueryFeatureRule,
    QueryFeatureStruct,
    QueryLayerFeature,
    QueryParameter,
    QueryParameterBase,
    QueryServiceBase
} from './MRFS';

export const MRFS = {
    EditDocFeature,
    EditLayerFeature,
    EditServiceBase,
    MultiGeoQuery,
    MultiGeoQueryParameter,
    ObjClsQuery,
    ObjClsQueryParameter,
    QueryByLayerParameter,
    QueryDocFeature,
    QueryFeatureRule,
    QueryFeatureStruct,
    QueryLayerFeature,
    QueryParameter,
    QueryParameterBase,
    QueryServiceBase
};

import {
    AnalysisBase,
    ClassBufferBase,
    ClassBufferByMultiplyRing,
    ClassBufferBySingleRing,
    ClipBase,
    ClipByCircle,
    ClipByLayer,
    ClipByPolygon,
    ContourAnalyse,
    FeatureBuffBase,
    FeatureBuffByMultiplyRing,
    FeatureBuffBySingleRing,
    NetAnalysis,
    OverlayBase,
    OverlayByLayer,
    OverlayByPolygon,
    ProjectBase,
    ProjectByLayer,
    ProjectBySRID
} from './MRFWS';

export const MRFWS = {
    AnalysisBase,
    ClassBufferBase,
    ClassBufferByMultiplyRing,
    ClassBufferBySingleRing,
    ClipBase,
    ClipByCircle,
    ClipByLayer,
    ClipByPolygon,
    ContourAnalyse,
    FeatureBuffBase,
    FeatureBuffByMultiplyRing,
    FeatureBuffBySingleRing,
    NetAnalysis,
    OverlayBase,
    OverlayByLayer,
    OverlayByPolygon,
    ProjectBase,
    ProjectByLayer,
    ProjectBySRID
};

import {
    CalArea,
    CalPolyLineLength,
    CalServiceBase,
    CProjectBySRSID,
    CProjectParam,
    GeometryAnalysisBase,
    ProjectDots,
    ProjectRang,
    Smooth,
    TopAnalysis
} from './MRGS';

export const MRGS = {
    CalArea,
    CalPolyLineLength,
    CalServiceBase,
    CProjectBySRSID,
    CProjectParam,
    GeometryAnalysisBase,
    ProjectDots,
    ProjectRang,
    Smooth,
    TopAnalysis
};

import { GetDocImageService, GetLayerImageService, GetMapImageService, GetMapInfoService, GetTileImageService, MapServiceBase } from './MRMS';

export const MRMS = {
    GetDocImageService,
    GetLayerImageService,
    GetMapImageService,
    GetMapInfoService,
    GetTileImageService,
    MapServiceBase
};

import {
    CAllOtherDataItemInfoSource,
    CAnnInfo,
    CChartLabelFormat,
    CChartTheme,
    CChartThemeInfo,
    CChartThemeRepresentInfo,
    CChartType,
    CDotDensityTheme,
    CFourColorTheme,
    CGraduatedSymbolTheme,
    CLinInfo,
    CMultiClassTheme,
    CPntInfo,
    CRandomTheme,
    CRangeTheme,
    CRangeThemeInfo,
    CRegInfo,
    CSimpleTheme,
    CTheme,
    CThemeInfo,
    CUniqueTheme,
    CUniqueThemeInfo,
    ExpInfo,
    FolderInfo,
    FolderInfoAttribute,
    ItemValue,
    ThemeOper,
    ThemesInfo
} from './theme';

export const Info = {
    CAllOtherDataItemInfoSource,
    CAnnInfo,
    CChartLabelFormat,
    CChartTheme,
    CChartThemeInfo,
    CChartThemeRepresentInfo,
    CChartType,
    CDotDensityTheme,
    CFourColorTheme,
    CGraduatedSymbolTheme,
    CLinInfo,
    CMultiClassTheme,
    CPntInfo,
    CRandomTheme,
    CRangeTheme,
    CRangeThemeInfo,
    CRegInfo,
    CSimpleTheme,
    CTheme,
    CThemeInfo,
    CUniqueTheme,
    CUniqueThemeInfo,
    ExpInfo,
    FolderInfo,
    FolderInfoAttribute,
    ItemValue,
    ThemeOper,
    ThemesInfo
};

import { WMSCapabilities, WMTSCapabilities, OGCWMTSInfo, OGCWMSInfo } from './OGC';

export const OGC = {
    WMSCapabilities,
    WMTSCapabilities,
    OGCWMTSInfo,
    OGCWMSInfo
};

import { EsCatlogType, EsCatlogName, EsCatlogService, EsTableService, EsSpaceTimeQueryByAgg } from './datastore';

export const DataStore = {
    EsCatlogType,
    EsCatlogName,
    EsCatlogService,
    EsTableService,
    EsSpaceTimeQueryByAgg
};

export default {
    MRFS,
    MRFWS
};
