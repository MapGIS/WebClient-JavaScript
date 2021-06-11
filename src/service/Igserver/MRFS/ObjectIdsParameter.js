import {BaseParameter} from "./BaseParameter";
import { extend } from "../../common";
import {Zondy} from "../../common";

class ObjectIdsParameter extends BaseParameter{
    constructor(options) {
        super();
        this.objectIds = [];

        extend(this,options);
    }
}

export {ObjectIdsParameter}
Zondy.Service.ObjectIdsParameter = ObjectIdsParameter;