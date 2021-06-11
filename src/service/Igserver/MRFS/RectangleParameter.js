import {BaseParameter} from "./BaseParameter";
import {extend, Zondy} from "../../common";

class RectangleParameter extends BaseParameter{
    constructor(options) {
        super();
        this.where = undefined;
        this.rectangle = [];
        this.compareRectOnly = false;
        this.enableDisplayCondition = false;
        this.spatialRelationType = "Intersects";

        extend(this,options);
    }
}

export {RectangleParameter}
Zondy.Service.RectangleParameter = RectangleParameter;