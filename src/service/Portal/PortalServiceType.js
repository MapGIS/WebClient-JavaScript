export const PortalServiceEnum = {
    DynamicTile: 'DynamicTile',
    IGSMap2D: 'IGSMap2D',
    IGSTile: 'IGSTile',
    WMS: 'WMS',
    WMTS: 'WMTS'
};

/**
 * @class module:门户.PortalServiceType
 * @description 门户类型枚举类
 */
export const PortalServiceType = [
    {
        type: 'DynamicTile',
        id: 2,
        title: '动态裁图',
        description: '动态裁图为IGSMap2D的额外特性，为服务的功能',
        url: {
            GetCapabilities: '',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/tile/{serverName}/{level}/{row}/{col}',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/tile/{serverName}',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'IGSMap2D',
        id: 3,
        title: '二维文档服务',
        description: 'IGServer自定义的二维文档REST服务',
        url: {
            GetCapabilities: '',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/docs/{serverName}?bbox={bbox}&w={w}&h={h}&f={f}',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: '',
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/docs/{serverName}?bbox={bbox}',
            GetFeatureInfo: ''
        }
    },
    {
        type: 'IGSTile',
        id: 5,
        title: '瓦片服务',
        description: 'IGServer自定义的瓦片REST服务',
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
        type: 'WMS',
        id: 8,
        title: 'WMS',
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
        type: 'WMTS',
        id: 10,
        title: 'WMTS',
        description: 'OGC-WMTS服务',
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
    }
];

export default PortalServiceType;
