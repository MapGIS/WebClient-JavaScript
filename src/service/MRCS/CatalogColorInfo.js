import {CatalogService}  from  "./CatalogService";
import {IgsServiceBase}  from  "../baseserver/IServiceBase";
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:目录服务.ColorInfo
 * @classdesc  Zondy.Catalog.ColorInfo 颜色信息类
 * @extends  Zondy.Catalog.CatalogService
 * @param option - {Object} 属性键值对，颜色属性字段。<br>
 * @param {Number} [option.SystemLibID = 0] 系统库索引号
 * @param {Number} [option.ColorNO = 6] 颜色号
 * @param {Number} [option.Red = 0] (红色)值，0~255取值
 * @param {Number} [option.Green = 0] (绿色)值，0~255取值
 * @param {Number} [option.Blue = 0] (蓝色)值，0~255取值
 * @param {Boolean} [option.addNew = false] 是否增加新的颜色
 */
class ColorInfo extends CatalogService {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member Zondy.Catalog.ColorInfo.prototype.SystemLibID
         * @type {Number}
         * @description 系统库索引号
         * @default 0
         */
        this.SystemLibID = options.SystemLibID !== undefined ? options.SystemLibID : 0;

        /**
         * @private
         * @member Zondy.Catalog.ColorInfo.prototype.ColorNO
         * @type {Number}
         * @description 颜色号
         * @default 6
         */
        this.ColorNO = options.ColorNO !== undefined ? options.ColorNO : 6;

        /**
         * @private
         * @member Zondy.Catalog.ColorInfo.prototype.Red
         * @type {Number}
         * @description (红色)值，0~255取值
         * @default 0
         */
        this.Red = options.Red !== undefined ? options.Red : 0;

        /**
         * @private
         * @member Zondy.Catalog.ColorInfo.prototype.Green
         * @type {Number}
         * @description (绿色)值，0~255取值
         * @default 0
         */
        this.Green = options.Green !== undefined ? options.Green : 0;

        /**
         * @private
         * @member Zondy.Catalog.ColorInfo.prototype.Blue
         * @type {Number}
         * @description (蓝色)值，0~255取值
         * @default 0
         */
        this.Blue = options.Blue !== undefined ? options.Blue : 0;

        /**
         * @private
         * @member Zondy.Catalog.ColorInfo.prototype.addNew
         * @type {Boolean}
         * @description 是否增加新的颜色
         * @default false
         */
        this.addNew = options.addNew !== undefined ? options.addNew : false;
    }

    /**
     * @description 根据RGB值获取该颜色在颜色库中的颜色号
     * @function Zondy.Catalog.ColorInfo.prototype.getColorNO
     * @description  返回颜色值在系统库中对应的ID编号
     * @param options - {Object} 颜色信息相关参数。
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServer = new Zondy.Catalog.ColorInfo({
                    //IGServer所在地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口
                    port: "6163",
                    //颜色库ID
                    SystemLibID: 1
                });
     CatalogServer.getColorNO({ Red: 255, Green: 145, Blue: 145 }, function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    getColorNO(options, onSuccess, onError) {
        var me = this;
        if (options !== null && options !== undefined) {
            if (options.SystemLibID !== undefined) {
                me.SystemLibID = options.SystemLibID;
            }
            if (options.Red !== undefined) {
                me.Red = options.Red;
            }
            if (options.Green !== undefined) {
                me.Green = options.Green;
            }
            if (options.Blue !== undefined) {
                me.Blue = options.Blue;
            }
            if (options.addNew !== undefined) {
                me.addNew = options.addNew;
            }
        }
        me.partUrl = "ColorLib/getColorNO?f=json&libID=" + me.SystemLibID + "&r=" + me.Red + "&g=" + me.Green + "&b=" + me.Blue + "&addNew=" + me.addNew;
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }

    /**
     * @description 根据颜色号获取颜色RGB值
     * @function Zondy.Catalog.ColorInfo.prototype.getColorRGB
     * @description  返回颜色信息对象
     * @param options - {Object} 属性键值对。
     * @param onSuccess - {Function} 成功回调函数。
     * @param onError - {Function} 失败回调函数。
     * @example
     var CatalogServer = new Zondy.Catalog.ColorInfo({
                    //IGServer所在地址
                    ip: "develop.smaryun.com",
                    //IGServer请求端口
                    port: "6163",
                    //颜色库ID
                    SystemLibID: 1
                });
     CatalogServer.getColorRGB({ ColorNO: 23 }, function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    getColorRGB(options, onSuccess, onError) {
        var me = this;
        if (options !== null && options !== undefined) {
            if (options.SystemLibID !== undefined) {
                me.SystemLibID = options.SystemLibID;
            }
            if (options.ColorNO !== undefined) {
                me.ColorNO = options.ColorNO;
            }
        }
        me.partUrl = "ColorLib/getColorRGB?f=json&libID=" + me.SystemLibID + "&colorNO=" + me.ColorNO;
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync();
    }
}
export {ColorInfo};
Zondy.Catalog.ColorInfo = ColorInfo;

