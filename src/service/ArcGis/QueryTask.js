import {Zondy} from '../common/Base';
import {
    getPromise,getPromiseP,formatQuery,formatEdits,extend
} from '../common';

class ArcGisQueryTask {
    constructor(options) {
        this.options = {
            url: null,
            gdbVersion: null
        }
        extend(this.options,options);
    }
}

ArcGisQueryTask.prototype.execute = function (query, requestOptions) {}
ArcGisQueryTask.prototype.executeAttachmentQuery = function () {}
ArcGisQueryTask.prototype.executeForCount = function () {}
ArcGisQueryTask.prototype.executeForExtent = function () {}
ArcGisQueryTask.prototype.executeForIds = function () {}
ArcGisQueryTask.prototype.executeRelationshipQuery = function () {}

export {ArcGisQueryTask};
Zondy.Service.ArcGisQueryTask = ArcGisQueryTask;