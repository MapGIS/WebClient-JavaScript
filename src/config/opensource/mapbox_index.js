import { MapExtend } from '../../mapboxgl/MapExtend';

export { MapExtend };

import { mapboxgl, MapDocLayer, MapTileLayer, MapWmsLayer, MapWMTSLayer, MapVectorLayer, ArcGISLayer, TDTLayer } from '../../mapboxgl/layer';

export { mapboxgl, MapDocLayer, MapTileLayer, MapWmsLayer, MapWMTSLayer, MapVectorLayer, ArcGISLayer, TDTLayer };

import { ServiceBase } from '../../service/ServiceBase';

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
} from '../../service/common';

import {
    ContourNoteParam,
    ContourParam,
    ContourZValue,
    ContourRegionInfo,
    MeshingParam,
    NetAnalyse,
    NetAnalysisExtent,
    SlopLineParam
} from '../../service/Igserver/extend';

import { CommonServiceBase, Events, CORS, RequestTimeout, FetchRequest, IgsServiceBase, JSONFormat } from '../../service/baseserver';

import { ColorInfo, GDBInfo, MapDoc, CatalogService, TileLayer, VectorLayer } from '../../service/Igserver/MRCS';

import { G3DLayerType, M3DTileDataInfo, G3DMapDoc, G3DService } from '../../service/Igserver/G3D';

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
} from '../../service/Igserver/MRFS';

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
} from '../../service/Igserver/MRFWS';

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
} from '../../service/Igserver/MRGS';

import {
    GetDocImageService,
    GetLayerImageService,
    GetMapImageService,
    GetMapInfoService,
    GetTileImageService,
    MapServiceBase
} from '../../service/Igserver/MRMS';

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
} from '../../service/Igserver/theme';

import { UserService, GeoDatasetService, CalculateModelService } from '../../service/clouddisk';
export { UserService, GeoDatasetService, CalculateModelService };

export { ServiceBase };

export {
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
export { ContourNoteParam, ContourParam, ContourZValue, ContourRegionInfo, MeshingParam, NetAnalyse, NetAnalysisExtent, SlopLineParam };
export { CommonServiceBase, Events, CORS, RequestTimeout, FetchRequest, IgsServiceBase, JSONFormat };
export { ColorInfo, GDBInfo, MapDoc, CatalogService, TileLayer, VectorLayer };
export { G3DLayerType, M3DTileDataInfo, G3DMapDoc, G3DService };
export {
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
export {
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
export {
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
export { GetDocImageService, GetLayerImageService, GetMapImageService, GetMapInfoService, GetTileImageService, MapServiceBase };
export {
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

import {
    GeoFeatureThemeLayer,
    ThemeLayer,
    RangeThemeLayer,
    UniqueThemeLayer,
    GraphThemeLayer,
    graphThemeLayer,
    RandomThemeLayer,
    SimpleThemeLayer,
    RankSymbolThemeLayer,
    ThemeStyle
} from '../../mapboxgl/theme';
export {
    GeoFeatureThemeLayer,
    ThemeLayer,
    RangeThemeLayer,
    UniqueThemeLayer,
    GraphThemeLayer,
    graphThemeLayer,
    RandomThemeLayer,
    SimpleThemeLayer,
    RankSymbolThemeLayer,
    ThemeStyle
};

// 大数据相关
import {
    PostgisCatlogService,
    PostgisCustomQueryService,
    PostgisQueryService,
    PostgisTableService,
    PostgisVectorTileService
} from '../../service/datastore/postgis';

export { PostgisCatlogService, PostgisCustomQueryService, PostgisQueryService, PostgisTableService, PostgisVectorTileService };

import {
    EchartsLayer,
    MapvLayer,
    DeckglLayer
    /* StreamLayer */
} from '../../mapboxgl/overlay/index.js';

export {
    EchartsLayer,
    MapvLayer,
    DeckglLayer
    /* StreamLayer */
};
