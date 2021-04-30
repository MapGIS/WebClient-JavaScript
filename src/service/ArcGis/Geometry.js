import {
    Zondy,extend
} from '../common';
import {ArcGisBaseParam} from "./BaseParam";
import {ArcGisSpatialReference} from "./SpatialReference";

/**
 * @class module:ArcGis.ArcGisBaseParam
 * @description ArcGis服务
 * @author 基础平台-杨琨
 */

class ArcGisGeometry extends ArcGisBaseParam{
    constructor(options) {
        super();
        this.cache= {};
        this.extent= null;
        this.hasM= false;
        this.hasZ= false;
        this.spatialReference = new ArcGisSpatialReference({
                wkid: 4326,
                wkt: "GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]]"
            });
        this.type= null;
        extend(this,options);

        if (options && options.hasOwnProperty("spatialReference")){
            options.spatialReference = new ArcGisSpatialReference(options.spatialReference);
        }
    }
}

export {ArcGisGeometry};
Zondy.Service.ArcGisGeometry = ArcGisGeometry;