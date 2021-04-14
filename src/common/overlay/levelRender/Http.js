import {Zondy} from '../../../service/common/Base';

/**
 * @private
 * @class  Zondy.LevelRenderer.Tool.Http
 * @classdesc LevelRenderer 工具-Http
 */
class Http {

    /**
     * @function Zondy.LevelRenderer.Tool.Http.constructor
     * @description 构造函数。
     */
    constructor() {
        this.CLASS_NAME = "Zondy.LevelRenderer.Tool.Http"

    }

    /**
     * @function Zondy.LevelRenderer.Tool.Http.prototype.get
     * @description get请求。
     * @param {(string|IHTTPGetOption)} url - 请求url
     * @param {function} onsuccess - 请求成功函数
     * @param {function} onerror - 请求失败函数
     * @param {Object} opts - 额外参数
     * @returns {number} cos值
     */
    get(url, onsuccess, onerror) {
        if (typeof (url) === 'object') {
            var obj = url;
            url = obj.url;
            onsuccess = obj.onsuccess;
            onerror = obj.onerror;

        }
        var xhr = window.XMLHttpRequest
            ? new XMLHttpRequest()
            : new window.ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    onsuccess && onsuccess(xhr.responseText);
                } else {
                    onerror && onerror();
                }
                xhr.onreadystatechange = new Function();
                xhr = null;
            }
        };

        xhr.send(null);
    }
}

export {Http};
Zondy.LevelRenderer.Tool.Http = Http;