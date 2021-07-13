import {
    extend, Zondy
} from '../common';
import {ArcGisBaseParam} from "./BaseParam";

/**
 * @class module=ArcGis.ArcGisIdentifyParameters
 * @description find查询参数对象
 * @author 基础平台-杨琨
 */
class ArcGisIdentifyParameters extends ArcGisBaseParam {
    constructor(options) {
        super();
        this.dpi = 96;
        this.dynamicLayerInfos = null;
        this.gdbVersion = null;
        this.geometry = null;
        this.geometryPrecision = null;
        this.height = 400;
        this.layerDefinitions = null;
        this.layerIds = null;
        this.layerOption = "top";
        this.layerTimeOptions = null;
        this.mapExtent = null;
        this.maxAllowableOffset = null;
        this.returnFieldName = !1;
        this.returnGeometry = !1;
        this.returnM = !1;
        this.returnUnformattedValues = !1;
        this.returnZ = !1;
        this.spatialReference = null;
        this.timeExtent = null;
        this.tolerance = 0;
        this.width = 400;
        extend(this, options);

        if (this.mapExtent) {
            this.mapExtent = this.mapExtent.toString();
        }
    }
}

export {ArcGisIdentifyParameters};
Zondy.Service.ArcGisIdentifyParameters = ArcGisIdentifyParameters;