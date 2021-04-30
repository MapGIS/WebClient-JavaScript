import {
    extend,Zondy
} from '../common';
import {ArcGisBaseParam} from "./BaseParam";

/**
 * @class module:ArcGis.ArcGisQuery
 * @description ArcGis服务
 * @author 基础平台-杨琨
 */
class ArcGisQuery extends ArcGisBaseParam{
    constructor(options) {
        super();
        this.aggregateIds = null;
        this.cacheHint = null;
        this.datumTransformation = null;
        this.distance = null;
        this.gdbVersion = null;
        this.geometry = null;
        this.geometryPrecision = null;
        this.groupByFieldsForStatistics = null;
        this.having = null;
        this.historicMoment = null;
        this.maxAllowableOffset = null;
        this.maxRecordCountFactor = 1;
        this.multipatchOption = null;
        this.num = null;
        this.objectIds = null;
        this.orderByFields = null;
        this.outFields = null;
        this.outSpatialReference = null;
        this.outStatistics = null;
        this.parameterValues = null;
        this.pixelSize = null;
        this.quantizationParameters = null;
        this.rangeValues = null;
        this.relationParameter = null;
        this.returnCentroid = false;
        this.returnDistinctValues = false;
        this.returnExceededLimitFeatures = true;
        this.returnGeometry = false;
        this.returnM = null;
        this.returnQueryGeometry = true;
        this.returnZ = null;
        this.spatialRelationship = "intersects";
        this.sqlFormat = null;
        this.start = null;
        this.text = null;
        this.timeExtent = null;
        this.units = null;
        this.where = null;

        extend(this,options);
    }
}

export {ArcGisQuery};
Zondy.Service.ArcGisQuery = ArcGisQuery;