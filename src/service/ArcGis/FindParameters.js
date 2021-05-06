import {
    extend,Zondy
} from '../common';
import {ArcGisBaseParam} from "./BaseParam";

/**
 * @class module=ArcGis.ArcGisFindParameters
 * @description find查询参数对象
 * @author 基础平台-杨琨
 */
class ArcGisFindParameters extends ArcGisBaseParam{
    constructor(options) {
        super();
        this.contains = true;
        this.dynamicLayerInfos = null;
        this.gdbVersion = null;
        this.geometryPrecision = null;
        this.layerDefinitions = null;
        this.layerIds = null;
        this.maxAllowableOffset = null;
        this.outSpatialReference = null;
        this.returnGeometry = true;
        this.searchFields = null;
        this.searchText = null;
        extend(this,options);
    }
}

export {ArcGisFindParameters};
Zondy.Service.ArcGisFindParameters = ArcGisFindParameters;