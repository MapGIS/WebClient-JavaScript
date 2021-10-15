import PortalServiceType from './PortalServiceType';

/**
 * @private
 * @description 内部引擎切换，不对外暴露
 */
const MapRules = [
    {
        type: 'mapboxgl',
        rule: '{z}/{y}/{x}'
    },
    {
        type: 'cesium',
        rule: '{z}/{y}/{x}'
    }
];

/**
 * @author 基础平台 潘卓然
 * @class module:门户.PortalServiceParse
 * @classdesc MapGIS IGServer服务解析器
 * @description Zondy.Service.PortalServiceParse
 * @example
 * // es 6
 * import PortalServiceParse from '@mapgis/webclient-es6-service';
 * let parse = new PortalServiceParse();
 * let url = parse.GetMapboxUrl(10, 'localhost', '6163', '世界地图');
 * // 浏览器
 * let parse = new Zondy.Service.PortalServiceParse();
 * let url = parse.GetMapboxUrl(10, 'localhost', '6163', '世界地图');
 */
export class PortalServiceParse {
    /**
     * @private
     * @function module:门户.PortalServiceParse.prototype.get
     * @param {String | Number} id 服务名称或者对应的Number型枚举值
     * @param {String} ip 服务的IP地址
     * @param {String} port 服务的端口地址
     * @param {String} serverName 服务的名称
     * @param {String } [baseUrl] urlType 服务的地址类型
     * @param {String } [GetMap] type 服务的类型
     * @example
     * let parse = new PortalServiceParse();
     * let url = parse.get(10, 'localhost', '6163', '世界地图');
     */
    get(id, ip, port, serverName, urlType = 'baseUrl', type = 'GetMap', map = 'mapboxgl') {
        let find = undefined;
        if (typeof id === 'number') {
            find = PortalServiceType.find((r) => {
                return r.id === id;
            });
        } else if (typeof id === 'string') {
            find = PortalServiceType.find((r) => {
                return r.title == id;
            });
        }
        if (!find) return undefined;
        let url = find[urlType][type];
        url = url.replace('{ip}', ip);
        url = url.replace('{port}', port);
        while (url.indexOf('{serverName}') >= 0) {
            url = url.replace('{serverName}', serverName);
        }
        let rule;
        switch (map) {
            case 'mapboxgl':
                rule = MapRules.filter((item) => item.type === 'mapboxgl');
                url = url.replace('{level}/{row}/{col}', rule[0].rule);
                url = url.replace('tilematrix={tilematrix}&tilerow={tilerow}&tilecol={tilecol}', 'tilematrix={z}&tilerow={y}&tilecol={x}');
                url = url.replace('w={w}&h={h}&f={f}', 'w=512&h=512&f=png');
            case 'cesium':
                rule = MapRules.filter((item) => item.type === 'cesium');
                url = url.replace('{level}/{row}/{col}', rule[0].rule);
        }
        return url;
    }

    /**
     * @function module:门户.PortalServiceParse.prototype.GetCapabilities
     * @param {String | Number} id 服务名称或者对应的Number型枚举值
     * @param {String} ip 服务的IP地址
     * @param {String} port 服务的端口地址
     * @param {String} serverName 服务的名称
     * @param {String } [baseUrl] urlType 服务的地址类型
     * @example
     * let parse = new PortalServiceParse();
     * let url = parse.GetCapabilities(10, 'localhost', '6163', '世界地图');
     */
    GetCapabilities(id, ip, port, serverName, urlType = 'baseUrl') {
        return this.get(id, ip, port, serverName, urlType, 'GetCapabilities');
    }

    /**
     * @function module:门户.PortalServiceParse.prototype.GetMap
     * @param {String | Number} id 服务名称或者对应的Number型枚举值
     * @param {String} ip 服务的IP地址
     * @param {String} port 服务的端口地址
     * @param {String} serverName 服务的名称
     * @param {String } [baseUrl] urlType 服务的地址类型
     * @example
     * let parse = new PortalServiceParse();
     * let url = parse.GetMap(10, 'localhost', '6163', '世界地图');
     */
    GetMap(id, ip, port, serverName, urlType = 'baseUrl', map = 'mapboxgl') {
        return this.get(id, ip, port, serverName, urlType, 'GetMap', map);
    }

    /**
     * @function module:门户.PortalServiceParse.prototype.GetFeatureInfo
     * @param {String | Number} id 服务名称或者对应的Number型枚举值
     * @param {String} ip 服务的IP地址
     * @param {String} port 服务的端口地址
     * @param {String} serverName 服务的名称
     * @param {String } [baseUrl] urlType 服务的地址类型
     * @example
     * let parse = new PortalServiceParse();
     * let url = parse.GetFeatureInfo(10, 'localhost', '6163', '世界地图');
     */
    GetFeatureInfo(id, ip, port, serverName, urlType = 'baseUrl') {
        return this.get(id, ip, port, serverName, urlType, 'GetFeatureInfo');
    }
}

export default PortalServiceParse;
