import {Zondy} from '../common';
import {
    formatQuery,extend
} from '../common';
import {ArcGisServiceBase} from "./ServiceBase";

class ArcGisQueryTask {
    constructor(options) {
        this.url = null;
        this.gdbVersion = null;
        extend(this,options);
    }
}

ArcGisQueryTask.prototype.execute = function () {}
ArcGisQueryTask.prototype.queryByLayer = function (layerId, queryParams) {
    queryParams.outFields = queryParams.outFields || "*";
    let url = this.url + "/" + layerId + "/query?f=json";
    let service = new ArcGisServiceBase();
    url = formatQuery(queryParams,url,["geometry"],null);
    return service.getPromise(url);
}
ArcGisQueryTask.prototype.executeAttachmentQuery = function () {}
ArcGisQueryTask.prototype.executeForCount = function () {}
ArcGisQueryTask.prototype.executeForExtent = function () {}
ArcGisQueryTask.prototype.executeForIds = function () {}
ArcGisQueryTask.prototype.executeRelationshipQuery = function () {}

export {ArcGisQueryTask};
Zondy.Service.ArcGisQueryTask = ArcGisQueryTask;