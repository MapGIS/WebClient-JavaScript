//不要加到OneMap的包里，否则会出现冲突
/**
 * 天地图资源类型
 * @readonly
 * @enum {String}
 */
var TiandituType = {
    /** 天地图矢量数据 */
    VEC: 'vec',
    /** 天地图影像数据 */
    IMG: 'img',
    /** 天地图矢量注记数据 */
    CVA: 'cva',
    /** 天地图影像注记数据 */
    CIA: 'cia',
    /** 天地图矢量数据(通过IGS) */
    VEC_IGS: 'vec_igs',
    /** 天地图影像数据(通过IGS) */
    IMG_IGS: 'img_igs',
    /** 天地图矢量注记数据(通过IGS) */
    CVA_IGS: 'cva_igs',
    /** 天地图影像注记数据(通过IGS) */
    CIA_IGS: 'cia_igs'
};
export{TiandituType};
Zondy.Enum.Map.TiandituType = Zondy.Enum.TiandituType = TiandituType;

/**
 * 谷歌地图资源类型
 * @readonly
 * @enum {String}
 */
var GoogleLayerType = {
    /** Google矢量数据 */
    VEC: 'vector',
    /** Google影像数据 */
    RASTER: 'raster',
    /** Google道路数据 */
    ROAD: 'road',
    /** Google地形数据 */
    TERRAIN: 'terrain',
    /** Google矢量数据(通过IGS) */
    VEC_IGS: 'vector_igs',
    /** Google影像数据(通过IGS) */
    RASTER_IGS: 'raster_igs',
    /** Google道路数据(通过IGS) */
    ROAD_IGS: 'road_igs',
    /** Google地形数据(通过IGS) */
    TERRAIN_IGS: 'terrain_igs'
};
export{GoogleLayerType};
Zondy.Enum.Map.GoogleLayerType = Zondy.Enum.GoogleLayerType = GoogleLayerType;

/**
 * ArcGIS地图资源类型
 * @readonly
 * @enum {String}
 */
var ArcGISLayerType = {
    /** ESRI_Imagery_World_2D */
    ImageryWorld2D: 'ESRI_Imagery_World_2D',
    /** ESRI_StreetMap_World_2D */
    StreetMapWorld2D: 'ESRI_StreetMap_World_2D',
    /** NGS_Topo_US_2D */
    TopoUS2D: 'NGS_Topo_US_2D',
    /** World_Imagery */
    WorldImagery: 'World_Imagery',
    /** World_Physical_Map */
    WorldPhysical: 'World_Physical_Map',
    /** World_Shaded_Relief */
    WorldShadedRelief: 'World_Shaded_Relief',
    /** World_Street_Map */
    WorldStreet: 'World_Street_Map',
    /** World_Terrain_Base */
    WorldTerrainBase: 'World_Terrain_Base',
    /** World_Topo_Map */
    WorldTopo: 'World_Topo_Map',
    /** NatGeo_World_Map */
    NatGeoWorldMap: 'NatGeo_World_Map',
    /** Ocean_Basemap */
    OceanBasemap: 'Ocean_Basemap',
    /** USA_Topo_Maps */
    USATopoMaps: 'USA_Topo_Maps'
};
export{ArcGISLayerType};
Zondy.Enum.Map.ArcGISLayerType = Zondy.Enum.ArcGISLayerType = ArcGISLayerType;

/**
 * OpenStreet地图资源类型
 * @readonly
 * @enum {String}
 */
var OpenStreetLayerType = {
    /** landscape */
    LandScape: 'landscape',
    /** cycle */
    CYCLE: 'cycle',
    /** transport */
    CycleTransport: 'transport',
    /** openstreetmap */
    OSM: 'openstreetmap',
    /** hyb */
    OSM_HYB: 'hyb',
    /** mapquest */
    OSM_Quest: 'mapquest',
    /** OSM_sat */
    OSM_Q_SAT: 'OSM_sat'
};
export{OpenStreetLayerType};
Zondy.Enum.Map.OpenStreetLayerType = Zondy.Enum.OpenStreetLayerType = OpenStreetLayerType;