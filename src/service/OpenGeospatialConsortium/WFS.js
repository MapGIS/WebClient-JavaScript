import { MapGIS } from '../Base';
import { OGCService } from './OGCService';
import xml from 'fast-xml-parser';
import axios from 'axios';
import qs from 'qs';

/**
 * @author 基础平台-潘卓然
 * @class module:OGC服务.OGCService
 * @classdesc OGC服务类
 * @description MapGIS.OGC.OGCService
 * @extends  OGCService
 * @link https://www.ogc.org/standards/wfs
 * @param option - {Object} 属性键值对。<br>
 * @param {String} [option.url = ""] 必选。服务url
 * @param {String} [option.version = "1.1.1"] 请求的版本号,1.1.1或1.3.0，服务默认版本为1.1.1。(getWMSInfo,getFeatureInfo)
 */
class WFS extends OGCService {
    constructor(option) {
        var options = option || {};
        super(options);
        this.url = options.url;
        this.featureTypes = [];
        this.layers = [];
    }

    isBaseUrl() {
        let valid = false;
        const name = 'WFSServer';
        const length = this.url.length;
        const index = this.url.indexOf(name) + name.length;
        let fullurl;
        if (index === length) {
            fullurl = `${this.url}?request=GetCapabilities&service=WFS`;
            valid = true;
        } else if (index === length - 1) {
            fullurl = `${this.url}request=GetCapabilities&service=WFS`;
            valid = true;
        }
        return valid;
    }

    setVersion(version) {
        this.version = version;
        return this;
    }

    setCrs(crs) {
        this.srsname = crs;
        return this;
    }

    setName(name) {
        this.typename = name;
        return this;
    }

    setOutputFormat(format) {
        this.outputFormat = format;
    }

    async getCapabilities() {
        const name = 'WFSServer';
        const length = this.url.length;
        const index = this.url.indexOf(name) + name.length;
        let fullurl = this.url;
        if (index === length) {
            fullurl = `${this.url}?request=GetCapabilities&service=WFS`;
        } else if (index === length - 1) {
            fullurl = `${this.url}request=GetCapabilities&service=WFS`;
        }
        let res = await axios.get(fullurl);
        let data = res.data;
        let obj = xml.getTraversalObj(data, {});
        let json = xml.convertToJson(obj, {});
        let version = json['wfs:WFS_Capabilities']['ows:ServiceIdentification']['ows:ServiceTypeVersion'];
        if (version === '1.1.0') {
            // MapGIS 10.3.5 10.5.0
            this.featureTypes = json['wfs:WFS_Capabilities']['FeatureTypeList']['FeatureType'];
            let crs;
            let name = '';
            this.featureTypes.forEach((f, i) => {
                if (i == 0) {
                    crs = f['DefaultSRS'];
                    name = `${f['Name']}`;
                }
            });
            this.layers = this.featureTypes.map((f) => f['Name']);
            this.setName(name).setCrs(crs).setVersion(version).setOutputFormat('text/xml; subtype=gml/3.2');
        } else if (version === '2.0.0') {
            let featureType = json['wfs:WFS_Capabilities']['wfs:FeatureTypeList']['wfs:FeatureType'];
            let crs = featureType['wfs:DefaultCRS'];
            let name = featureType['wfs:Name'];
            this.setName(name).setCrs(crs).setVersion(version);
        }
        return json;
    }

    async getFeature() {
        const name = 'WFSServer';
        const length = this.url.length;
        const index = this.url.indexOf(name) + name.length;
        let fullurl = this.url;

        let { maxFeatures = 100, version = '1.1.0', typename = '', outputFormat, srsname = 'EPSG:4326', bbox } = this;
        let object = {
            service: 'WFS',
            request: 'GetFeature',
            version,
            typename,
            outputFormat,
            srsname,
            maxFeatures
        };

        if (version === '1.1.0') {
            if (bbox) {
              object = Object.assign(object, { bbox: `${bbox},${srsname}` });
            } else {
                object = object;
            }
        } else if (version === '2.0.0') {
            object = Object.assign(object, { Envelope: `${bbox},${srsname}`});
        }

        if (index === length) {
            fullurl = `${this.url}?${qs.stringify(object)}`;
        } else if (index === length - 1) {
            fullurl = `${this.url}${qs.stringify(object)}`;
        }

        let res = await axios.get(fullurl);
        let data = res.data;
        let obj = xml.getTraversalObj(data, {});
        let json = xml.convertToJson(obj, {});

        let result = {
            geojson: undefined,
            xml: json
        };
        let geojson;
        switch (version) {
            case '1.1.0':
                geojson = convert
                break;
            case '2.0.0':
                break;
        }
        return result;
    }
}
export { WFS };
MapGIS.OGC.WFS = WFS;
