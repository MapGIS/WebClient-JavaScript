import { BaseParameter } from "./BaseParameter";
import { extend, Zondy } from "../../common";

class SQLParameter extends BaseParameter{
    constructor(options) {
        super();
        this.where = undefined;

        extend(this,options);
    }
}

export {SQLParameter}
Zondy.Service.SQLParameter = SQLParameter;