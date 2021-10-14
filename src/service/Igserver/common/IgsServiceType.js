export const IgsServiceEnum = {
    IGSRestMap2D: 'IGSRestMap2D',
    IGSRestMap3D: 'IGSRestMap3D',
    IGSRestTile: 'IGSRestTile',
    ArcGISRestMapServer: 'ArcGISRestMapServer',
    ArcGISRestFeatureServer: 'ArcGISRestFeatureServer',
    IGSRestMap3DCache: 'IGSRestMap3DCache',
    IGSRestMap3DModel: 'IGSRestMap3DModel',
    IGSRestMap3DTerrain: 'IGSRestMap3DTerrain',
    WMS: 'WMS',
    WFS: 'WFS',
    WMTS: 'WMTS',
    WCS: 'WCS',
    ArcGISRestVectorTileServer: 'ArcGISRestVectorTileServer'
}

/**
 * @description 服务协议类别,保证稳定性，注意不要重构枚举名和枚举值
 */
export const IgsServiceType = [
    {
        type: 'IGSRestMap2D',
        id: 1,
        title: 'IGServer二维地图服务',
        description: 'IGServer自定义二维文档REST，包括地图服务、要素服务、目录服务',
        url: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/mrcs/docs/{serverName}/0/layers?f=json',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/docs/{serverName}?bbox={bbox}&w={w}&h={h}&f={f}',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/mrcs/docs/{serverName}/0/layers?f=json',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/docs/{serverName}?bbox={bbox}',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'IGSRestMap3D',
        id: 2,
        title: 'IGServer三维地图服务',
        description: 'IGServer自定义三维文档REST',
        url: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetDocInfo',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/tile/{serverName}/{level}/{row}/{col}',
            GetFeatureInfo: '',
            GetCovering: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetCovering?sceneIndex={sceneIndex}&layerIndex={layerIndex}&level={level}&row={row}&col={col}&xDensity={xDensity}&yDensity={yDensity}',
            GetLabels: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetLabels?sceneIndex={sceneIndex}&layerIndex={layerIndex}&level={level}&row={row}&col={col}&xDensity={xDensity}&yDensity={yDensity}',
            GetModels: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetModels?sceneIndex={sceneIndex}&layerIndex={layerIndex}&level={level}&row={row}&col={col}&xDensity={xDensity}&yDensity={yDensity}',
            GetTerrain: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetTerrain?sceneIndex={sceneIndex}&layerIndex={layerIndex}&level={level}&row={row}&col={col}&xDensity={xDensity}&yDensity={yDensity}',
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: '',
            GetCovering: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetCovering?sceneIndex={sceneIndex}&layerIndex={layerIndex}&level={level}&row={row}&col={col}&xDensity={xDensity}&yDensity={yDensity}',
            GetLabels: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetLabels?sceneIndex={sceneIndex}&layerIndex={layerIndex}&level={level}&row={row}&col={col}&xDensity={xDensity}&yDensity={yDensity}',
            GetModels: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetModels?sceneIndex={sceneIndex}&layerIndex={layerIndex}&level={level}&row={row}&col={col}&xDensity={xDensity}&yDensity={yDensity}',
            GetTerrain: 'http://{ip}:{port}/igs/rest/g3d/{serverName}/GetTerrain?sceneIndex={sceneIndex}&layerIndex={layerIndex}&level={level}&row={row}&col={col}&xDensity={xDensity}&yDensity={yDensity}',
        }
    },
    {
        type: 'IGSRestTile',
        id: 3,
        title: 'IGServer瓦片服务',
        description: 'IGServer自定义瓦片REST',
        url: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/mrcs/tiles/{serverName}?f=json&v=2.0',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/tile/{serverName}/{level}/{row}/{col}',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/mrcs/tiles/{serverName}?f=json&v=2.0',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/tile/{serverName}',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'ArcGISRestMapServer',
        id: 4,
        title: 'ArcGIS Rest地图服务',
        description: 'ArcGIS Rest地图服务协议',
        url: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'ArcGISRestFeatureServer',
        id: 5,
        title: 'ArcGIS Rest要素服务',
        description: 'ArcGIS Rest要素服务协议',
        url: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'IGSRestMap3DCache',
        id: 6,
        title: 'IGServer三维缓存服务',
        description: 'IGServer三维缓存服务',
        url: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'IGSRestMap3DModel',
        id: 7,
        title: 'IGServer三维模型服务',
        description: 'IGServer三维模型服务',
        url: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'IGSRestMap3DTerrain',
        id: 8,
        title: 'IGServer三维地形服务',
        description: 'IGServer三维地形服务',
        url: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'WMS',
        id: 17,
        title: 'OGC-WMS',
        description: 'OGC-WMS服务',
        url: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/ogc/doc/{serverName}/WMSServer',
            GetMap: 'http://{ip}:{port}/igs/rest/ogc/doc/{serverName}/WMSServer',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/ogc/doc/{serverName}/WMSServer',
            GetMap: 'http://{ip}:{port}/igs/rest/ogc/{serverName}/WMSServer',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'WFS',
        id: 18,
        title: 'OGC WFS',
        description: 'OGC WFS服务',
        url: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'WMTS',
        id: 19,
        title: 'OGC WMTS',
        description: 'OGC WMTS服务',
        url: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/ogc/{serverName}/WMTSServer/1.0.0/WMTSCapabilities.xml',
            GetMap: 'http://{ip}:{port}/igs/rest/ogc/{serverName}/WMTSServer?service=WMTS&request=GetTile&version=1.0.0&style=default&format=image/png&layer={serverName}&tilematrix={tilematrix}&tilerow={tilerow}&tilecol={tilecol}',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/ogc/{serverName}/WMTSServer/1.0.0/WMTSCapabilities.xml',
            GetMap: 'http://{ip}:{port}/igs/rest/ogc/{serverName}/WMTSServerr',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'WCS',
        id: 20,
        title: 'OGC WCS',
        description: 'OGC WCS服务',
        url: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'ArcGISRestVectorTileServer',
        id: 32,
        title: 'ArcGIS Rest矢量瓦片服务',
        description: 'ArcGIS Rest矢量瓦片服务',
        url: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: '',
            GetFeatureInfo: ''
        }
    },
];

export default IgsServiceType;