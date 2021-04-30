import {Zondy,extend} from "../common";

var queryExtraOarams = {
    displayFieldName:null,
    geometryType:null,
    hasM:false,
    hasZ:false,
    queryGeometry:null,
    spatialReference:null,
    transform:null
};

/**
 * @class module:ArcGis.ArcGisServiceBase
 * @description ArcGis服务
 * @author 基础平台-杨琨
 */
class ArcGisServiceBase {
    getPromise(url) {
        let me = this;
        return new Promise(function (resolve,reject) {
            me.get(url,function (data) {
                data = JSON.parse(data);
                if(url.indexOf("FeatureServer") > -1 && url.indexOf("query") > -1){
                    data = extend(data,queryExtraOarams);
                }
                resolve(data);
            },function (data) {
                reject(JSON.parse(data));
            })
        });
    }

    getPromiseP(url,dataStr) {
        let me = this;
        return new Promise(function (resolve,reject) {
            me.post(url,dataStr,function (data) {
                resolve(JSON.parse(data));
            },function (data) {
                reject(JSON.parse(data));
            });
        });
    }

    get(url, fn,error) {
        // XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据
                fn.call(this, xhr.responseText);
            }else if(xhr.readyState === 4 && xhr.status !== 200 && xhr.status !== 304 ) {
                error.call(this, xhr.responseText);
            }
        };
        xhr.send();
    }
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post(url, data, fn,error) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(data) {
            if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
                fn.call(this, xhr.responseText);
            }else if(xhr.readyState === 4 && xhr.status !== 200 && xhr.status !== 304 ) {
                error.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}
export {ArcGisServiceBase};
Zondy.Service.ArcGisServiceBase = ArcGisServiceBase;