import {
    Zondy,cloneObject
} from '../common';

/**
 * @class module:ArcGis.ArcGisBaseParam
 * @description ArcGis服务
 * @author 基础平台-杨琨
 */
class ArcGisBaseParam {
    clone(){
        //完全返回一个新对象
        return cloneObject(this);
    }

    //接收一个参数对象，如果参数对象里的值，本身也含有，则赋值，否则不赋值
    static fromJSON(JSON){
        let me = new this();
        if(JSON instanceof Object){
            for(let key in JSON){
                if(me.hasOwnProperty(key)){
                    me[key] = JSON[key];
                }
            }
        }
        return me;
    }

    toJSON(){
        //按照arcgis的tiJson编写，因为只接受对象类型，因此不做其他类型判断，返回一个对象
        let objInn = this;
        let returnObj = {};
        for (let attr in objInn) {
            if (typeof objInn[attr] !== "function" && attr !== "CLASS_NAME") {
                if(objInn[attr]) returnObj[attr] = objInn[attr];
            }
        }
        returnObj["spatialRel"] = "esriSpatialRelIntersects";
        return returnObj;
    }
}

export {ArcGisBaseParam};
Zondy.Service.ArcGisBaseParam = ArcGisBaseParam;