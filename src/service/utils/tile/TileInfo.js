import xml from 'fast-xml-parser';

import { IgsServiceEnum, IgsServiceType } from '../../Igserver/common/IgsServiceType';
import { PortalServiceEnum, PortalServiceType } from '../../Portal/PortalServiceType';

import { IgsServiceParse } from '../../Igserver/common/IgsServiceParse';
import { PortalServiceParse } from '../../Portal/PortalServiceParse';

import { TileResolution } from './TileResolution';
import { TileScale } from './TileScale';

const XmlFormat = [IgsServiceEnum.WMS, IgsServiceEnum.WMTS, IgsServiceEnum.WFS, IgsServiceEnum.WCS, PortalServiceEnum.WMTS, PortalServiceEnum.WMS];

/**
 * @author 基础平台-潘卓然
 * @description 通过比例尺或者分辨率来计算是否是对应的瓦片错级
 * @example 
      let tileinfo = new TileInfo();
      let zoomOffset = await tileinfo.getZoomOffset(
        IgsServiceEnum.WMTS, // IgsServiceEnum.IGSRestTile PortalServiceEnum.WMTS PortalServiceEnum.IGSTile
        "localhost",
        "6163",
        "epsg_standard"
      );
 */
export class TileInfo {
    constructor(options) {
        let option = options || {};
        const { ip, port, serverName } = option;
        this.ip = ip;
        this.port = port;
        this.serverName = serverName;
    }

    async getZoomOffset(type, ip, port, serverName) {
        let zoomoffset = 0;
        ip = ip || this.ip;
        port = port || this.port;
        serverName = serverName || this.serverName;

        let isPortal = false;
        let isIGServer = false;
        let isJson = true;

        IgsServiceType.forEach((s) => {
            if (s.type === type) {
                isIGServer = true;
                if (XmlFormat.indexOf(type) >= 0) {
                    isJson = false;
                }
            }
        });
        PortalServiceType.forEach((s) => {
            if (s.type === type) {
                isPortal = true;
                if (XmlFormat.indexOf(type) >= 0) {
                    isJson = false;
                }
            }
        });

        if (isPortal) {
            this.parse = new PortalServiceParse();
        } else if (isIGServer) {
            this.parse = new IgsServiceParse();
        }
        if (this.parse) {
            let capability = this.parse.GetCapabilities(type, ip, port, serverName);
            if (isJson) {
                try {
                    let res = await fetch(capability);
                    let json = await res.json();
                    let util = new TileResolution();
                    const { TileInfo2 } = json;
                    const { tileInfo } = TileInfo2;
                    zoomoffset = util.getZoomOffsetByTileInfo(tileInfo);
                } catch (error) {}
            } else {
                let res = await fetch(capability);
                let text = await res.text();
                let obj = xml.getTraversalObj(text, {});
                let json = xml.convertToJson(obj, {});
                let tms = json.Capabilities.Contents.TileMatrixSet;
                let TileMatrixSet = tms[tms.length - 1];
                let scale = TileMatrixSet.TileMatrix[0].ScaleDenominator;
                let tileInfo = { lods: [{ resolution: scale, level: 0 }] };
                let util = new TileScale();
                zoomoffset = util.getZoomOffsetByTileInfo(tileInfo);
            }
        }

        return zoomoffset;
    }
}

export default TileInfo;
