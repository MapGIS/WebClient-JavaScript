/**
 * @private
 * @author 技术支持-何振涛
 * @description 20190821-Util工具类,方法不对外使用
 * @constructor
 */
export class Util {
    constructor() {
        this.isIE = /(Trident)|(Edge)/.test(navigator.userAgent);
        let escape = /["\\\x00-\x1f\x7f-\x9f]/g;
        let meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        let hasOwn = Object.prototype.hasOwnProperty;

        this.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
            if (o === null) {
                return 'null';
            }

            let pairs, k, name, val, type = typeof (o);

            if (type === 'undefined') {
                return undefined;
            }
            if (type === 'number' || type === 'boolean') {
                return String(o);
            }
            if (type === 'string') {
                return this.quoteString(o);
            }
            if (typeof o.toJSON === 'function') {
                return this.toJSON(o.toJSON());
            }
            if (type === 'date') {
                let month = o.getUTCMonth() + 1,
                    day = o.getUTCDate(),
                    year = o.getUTCFullYear(),
                    hours = o.getUTCHours(),
                    minutes = o.getUTCMinutes(),
                    seconds = o.getUTCSeconds(),
                    milli = o.getUTCMilliseconds();

                if (month < 10) {
                    month = '0' + month;
                }
                if (day < 10) {
                    day = '0' + day;
                }
                if (hours < 10) {
                    hours = '0' + hours;
                }
                if (minutes < 10) {
                    minutes = '0' + minutes;
                }
                if (seconds < 10) {
                    seconds = '0' + seconds;
                }
                if (milli < 100) {
                    milli = '0' + milli;
                }
                if (milli < 10) {
                    milli = '0' + milli;
                }
                return '"' + year + '-' + month + '-' + day + 'T' +
                    hours + ':' + minutes + ':' + seconds +
                    '.' + milli + 'Z"';
            }

            pairs = [];

            if (typeof o === 'Array') {
                for (k = 0; k < o.length; k++) {
                    pairs.push(this.toJSON(o[k]) || 'null');
                }
                return '[' + pairs.join(',') + ']';
            }
            if (typeof o === 'object') {
                for (k in o) {
                    if (hasOwn.call(o, k)) {
                        type = typeof k;
                        if (type === 'number') {
                            name = '"' + k + '"';
                        } else if (type === 'string') {
                            name = this.quoteString(k);
                        } else {
                            continue;
                        }
                        type = typeof o[k];

                        if (type !== 'function' && type !== 'undefined') {
                            val = this.toJSON(o[k]);
                            pairs.push(name + ':' + val);
                        }
                    }
                }
                return '{' + pairs.join(',') + '}';
            }
        };
        this.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
            return eval('(' + str + ')');
        };
        this.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (str) {
            let filtered =
                str
                .replace(/\\["\\\/bfnrtu]/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, '');

            if (/^[\],:{}\s]*$/.test(filtered)) {
                return eval('(' + str + ')');
            }
            throw new SyntaxError('Error parsing JSON, source is not valid.');
        };
        this.quoteString = function (str) {
            if (str.match(escape)) {
                return '"' + str.replace(escape, function (a) {
                    let c = meta[a];
                    if (typeof c === 'string') {
                        return c;
                    }
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                }) + '"';
            }
            return '"' + str + '"';
        };
        //将object对象转换成地形分析的专用类:FLoodAnalyzeInfo、CutFillInfo、ViewShedInfo、PointQueryInfo、VisibleInfo、SlopeInfo、AspectInfo
        this.convertObjectToAnalyseTypeInfo = function (object) {
            if (object == null)
                return null;
            let info = null;
            switch (object.type) {
                case 1:
                    {
                        info = new FLoodAnalyzeInfo();
                        info.type = object.type;
                        info.connectivity = object.connectivity; //考虑连通性标识
                        info.startpos = object.startpos; //开始选择起点
                        info.startreg = object.startreg; //开始选择淹没区
                        info.height = object.height; //当前高程
                        info.alpha = object.alpha; //透明度(0-1.0之间有效)
                        info.max = object.max; //高程最大值
                        info.min = object.min; //高程最小值    
                        info.regzoom = object.regzoom; //淹没区域扩大倍数        
                        info.floodclr = object.floodclr; //淹没区域颜色 
                        return info;
                    }
                case 2:
                    {
                        info = new CutFillInfo();
                        info.type = object.type;
                        info.startreg = object.startreg; //开始选择区范围
                        info.height = object.height; //当前高程
                        info.min = object.min; //高程最小值
                        info.max = object.max; //高程最大值
                        info.cutclr = object.cutclr; //挖的颜色
                        info.fillclr = object.fillclr; //填的颜色
                        info.nocutfillclr = object.nocutfillclr; //不填不挖的颜色
                        info.surfacearea = object.surfacearea; //表面积
                        info.fillvolume = object.fillvolume; //填充体积
                        info.cutVolume = object.cutVolume; //挖出体积
                        return info;
                    }
                case 3:
                    {
                        info = new ViewShedInfo();
                        info.type = object.type;
                        info.startpos = object.startpos; //开始选择起点
                        info.startreg = object.startreg; //开始选择分析区
                        info.height = object.height; //观察点高程
                        info.alpha = object.alpha; //透明度(0-1.0之间有效)
                        info.viewclr = object.viewclr; //可视域颜色
                        info.shedclr = object.shedclr; //非可视域颜色
                        return info;
                    }
                case 4:
                    {
                        info = new PointQueryInfo();
                        info.type = object.type;
                        info.pos = new Point3D(object.pos.x, object.pos.y, object.pos.z); //当前点三维坐标
                        info.longitude = object.longitude; //经度
                        info.latitude = object.latitude; //纬度
                        info.height = object.height; //高程
                        info.slope = object.slope; //坡度
                        info.aspect = object.aspect; //坡向
                        return info;
                    }
                case 5:
                    {
                        info = new VisibleInfo();
                        info.type = object.type;
                        return info;
                    }
                case 6:
                    {
                        info = new SlopeInfo();
                        info.type = object.type;
                        return info;
                    }
                case 7:
                    {
                        info = new AspectInfo();
                        info.type = object.type;
                        return info;
                    }
            }
        };
    }

    corsAjax(url, type, postData, successCallback, errorCallback, dataType, proxy) {
        dataType = dataType || 'json';
        if (proxy) {
            url = proxy + "?request=" + encodeURIComponent(url);
            let param = {
                url: url,
                type: type,
                dataType: dataType,
                success: function (res, code) {
                    successCallback && successCallback(res, code);
                },
                error: function (xhr) {
                    errorCallback && errorCallback(xhr);
                }
            };
            if (type.toLowerCase() === 'post') {
                param.data = postData;
            }
            // axios[type]
            $.ajax(param);
            return;
        }
    
        type = type || "get";
        if (window.XDomainRequest && !/MSIE 10.0/.test(window.navigator.userAgent)) {
            let xdr = new window.XDomainRequest();
            xdr.onload = function () {
                let res = dataType === 'json' ? $.parseJSON(this.responseText) : this.responseText;
                successCallback && successCallback(res);
            };
            xdr.onerror = function () {
                errorCallback && errorCallback(xdr);
            };
            xdr.open(type, url);
            if (type.toLowerCase() === 'post') {
                xdr.send(postData);
            } else {
                xdr.send();
            }
        } else {
            $.support.cors = true;
            let param = {
                url: url,
                type: type,
                dataType: dataType,
                success: function (res, code) {
                    successCallback && successCallback(res, code);
                },
                error: function (xhr) {
                    errorCallback && errorCallback(xhr);
                }
            };
            if (type.toLowerCase() === 'post') {
                param.data = postData;
            }
            $.ajax(param);
        }
    }
}

export default Util;