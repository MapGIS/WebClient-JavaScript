import { MapGIS } from '../Base';
import { OGCService } from './OGCService';
import xml from 'fast-xml-parser';
import axios from 'axios';
import qs from 'qs';

/**
 * @author 基础平台-潘卓然
 * @class module:OGC服务.WMS
 * @classdesc OGC服务类
 * @description MapGIS.OGC.WMS
 * @extends  OGCService
 * @param option - {Object} 属性键值对。<br>
 * @param {String} [option.url = ""] 必选。服务url
 * @param {String} [option.version = "1.1.1"] 请求的版本号,1.1.1或1.3.0，服务默认版本为1.1.1。(getWMSInfo,getFeatureInfo)
 * @param {String} [option.layers] 请求的图层名，用逗号分隔多个图层；既支持单纯的图层名，也支持服务名称（图层名）。(getFeatureInfo)
 * @param {String} [option.srs] 空间坐标参考系。(getFeatureInfo)
 * @param {String} [option.bbox] 显示范围，坐标用minx,miny,maxx,maxy表示（1.1.1版本）,坐标用miny,minx,maxy,maxx表示（1.3.0版本），与srs对应设置可以达到动态投影的效果。(getFeatureInfo)
 * @param {String} [option.width = "1024"] 输出地图图片的象素宽。(getFeatureInfo)
 * @param {String} [option.height = "768"]  输出地图图片的象素高。(getFeatureInfo)
 * @param {String} [option.style = "default"] 图层样式，用逗号分隔各图层对应的样式。(getFeatureInfo)
 * @param {String} [option.format = "image/png"] 输出图象的类型,支持三种格式gif、png、jpg。(getFeatureInfo)
 */
class WMS extends OGCService {
    constructor(option) {
        var options = option || {};
        super(options);

        this.url = options.url;
    }

    isBaseUrl() {
        let valid = false;
        const name = 'WMSServer';
        const length = this.url.length;
        const index = this.url.indexOf(name) + name.length;
        let fullurl = this.url;
        if (index === length) {
            fullurl = `${this.url}?request=GetCapabilities&service=WMS`;
            valid = true;
        } else if (index === length - 1) {
            fullurl = `${this.url}request=GetCapabilities&service=WMS`;
            valid = true;
        }
        return valid;
    }

    async makeFullUrl() {
        if (this.isBaseUrl()) {
            let json = await this.getCapabilities();
            let { height, width, crs, format, version, styles } = this;
            let layers = json.WMT_MS_Capabilities.Capability.Layer.Layer.map((l) => l.Name).toString();
            let object = {
                service: 'WMS',
                request: 'GetMap',
                layers,
                styles: styles || '',
                format: format || 'image/png',
                transparent: true,
                version: version || '1.1.1',
                height: height || 256,
                width: width || 256,
                srs: crs || 'EPSG:4326'
            };
            let fullurl = `${this.url}?${qs.stringify(object)}`;
            return fullurl;
        }
    }

    async getCapabilities() {
        const name = 'WMSServer';
        const length = this.url.length;
        const index = this.url.indexOf(name) + name.length;
        let fullurl = this.url;
        if (index === length) {
            fullurl = `${this.url}?request=GetCapabilities&service=WMS`;
        } else if (index === length - 1) {
            fullurl = `${this.url}request=GetCapabilities&service=WMS`;
        }
        let res = await axios.get(fullurl);
        let data = res.data;
        let obj = xml.getTraversalObj(data, {});
        let json = xml.convertToJson(obj, {});
        return json;
    }
}
export { WMS };
MapGIS.OGC.WMS = WMS;
