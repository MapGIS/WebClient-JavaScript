export const IgserverRules = [
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
            GetMap: 'http://{ip}:{port}/igs/rest/mrms/docs/{serverName}?bbox={bbox}&w={w}&h={h}&f={f}&layers={layers}&filters={filters}&style={style}&guid={guid}&proj={proj}',
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
            GetMap: 'http://{ip}:{port}/igs/rest/ogc/WMTSServer/1.0.0/{serverName}:{serverName}/default/{tileMatrix}/{level}/{row}/{col}.png',
            GetFeatureInfo: ''
        },
        baseUrl: {
            GetCapabilities: 'http://{ip}:{port}/igs/rest/ogc/{serverName}/WMTSServer/1.0.0/WMTSCapabilities.xml',
            GetMap: 'http://{ip}:{port}/igs/rest/ogc/{serverName}/WMTSServerr',
            GetFeatureInfo: ''
        }
    }
];

/**
 * @author 基础平台 潘卓然
 * @class module:拓展服务.RuleParse
 * @classdesc MapGIS IGServer服务解析器
 * @description Zondy.Service.RuleParse
 * @example
 * // es 6
 * import RuleParse from '@mapgis/webclient-es6-service';
 * let parse = new RuleParse();
 * let url = parse.GetMapboxUrl(10, 'localhost', '6163', '世界地图');
 * // 浏览器
 * let parse = new Zondy.Service.RuleParse();
 * let url = parse.GetMapboxUrl(10, 'localhost', '6163', '世界地图');
 */
export class RuleParse {
    /**
     * @private
     * @function module:拓展服务.RuleParse.prototype.get
     * @param {String | Number} id 服务名称或者对应的Number型枚举值
     * @param {String} ip 服务的IP地址
     * @param {String} port 服务的端口地址
     * @param {String} serverName 服务的名称
     * @param {String } [baseUrl] urlType 服务的地址类型
     * @param {String } [GetMap] type 服务的类型
     * @example
     * let parse = new RuleParse();
     * let url = parse.get(10, 'localhost', '6163', '世界地图');
     */
    get(id, ip, port, serverName, urlType = 'baseUrl', type = 'GetMap') {
        let find = undefined;
        if (typeof id === 'number') {
            find = IgserverRules.find((r) => {
                return r.id === id;
            });
        } else if (typeof id === 'string') {
            find = IgserverRules.find((r) => {
                return r.title == id;
            });
        }
        if (!find) return undefined;
        let url = find[urlType][type];
        url = url.replace('{ip}', ip);
        url = url.replace('{port}', port);
        url = url.replace('{serverName}', serverName);
        return url;
    }

    /**
     * @function module:拓展服务.RuleParse.prototype.GetCapabilities
     * @param {String | Number} id 服务名称或者对应的Number型枚举值
     * @param {String} ip 服务的IP地址
     * @param {String} port 服务的端口地址
     * @param {String} serverName 服务的名称
     * @param {String } [baseUrl] urlType 服务的地址类型
     * @example
     * let parse = new RuleParse();
     * let url = parse.GetCapabilities(10, 'localhost', '6163', '世界地图');
     */
    GetCapabilities(id, ip, port, serverName, urlType = 'baseUrl') {
        return get(id, ip, port, serverName, urlType, 'GetCapabilities');
    }

    /**
     * @function module:拓展服务.RuleParse.prototype.GetMap
     * @param {String | Number} id 服务名称或者对应的Number型枚举值
     * @param {String} ip 服务的IP地址
     * @param {String} port 服务的端口地址
     * @param {String} serverName 服务的名称
     * @param {String } [baseUrl] urlType 服务的地址类型
     * @example
     * let parse = new RuleParse();
     * let url = parse.GetMap(10, 'localhost', '6163', '世界地图');
     */
    GetMap(id, ip, port, serverName, urlType = 'baseUrl') {
        return get(id, ip, port, serverName, urlType, 'GetMap');
    }

    /**
     * @function module:拓展服务.RuleParse.prototype.GetFeatureInfo
     * @param {String | Number} id 服务名称或者对应的Number型枚举值
     * @param {String} ip 服务的IP地址
     * @param {String} port 服务的端口地址
     * @param {String} serverName 服务的名称
     * @param {String } [baseUrl] urlType 服务的地址类型
     * @example
     * let parse = new RuleParse();
     * let url = parse.GetFeatureInfo(10, 'localhost', '6163', '世界地图');
     */
    GetFeatureInfo(id, ip, port, serverName, urlType = 'baseUrl') {
        return get(id, ip, port, serverName, urlType, 'GetFeatureInfo');
    }
}

export default RuleParse;
