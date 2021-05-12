import {Zondy} from '../../common/Base';
import {MapServiceBase}  from  "./MapServiceBase";
import {IgsServiceBase}  from  "../../baseserver/IServiceBase";
import {newGuid}  from  "../../common/Util";
/**
 * 地图图片服务
 * @class module:地图服务.GetMapInfoService
 * @classdesc 地图信息服务
 * @description Zondy.Service.GetMapInfoService
 * @extends  Zondy.Service.MapServiceBase
 * @param {Object} option 属性键值对
 * @param {String} [option.mapName= null] 地图文档/瓦片地图名称
 * @param {Object} [option.guid= newGuid()] 唯一标识
 * @param {*} [option.token] 地图信息
 * @param {*} [option.type]  地图类型
 */
class GetMapInfoService extends MapServiceBase {
    constructor(option) {
        var options = option || {};
        super(options);
        /**
         * @private
         * @member  Zondy.Service.GetMapInfoService.prototype.mapName
         * @type {String}
         * @description 地图文档/瓦片地图名称
         * @default null
         */
        this.mapName = options.mapName !== undefined ? options.mapName : null;

        /**
         * @private
         * @member  Zondy.Service.GetMapInfoService.prototype.mapName
         * @type {Object}
         * @description 唯一标识
         * @default newGuid()
         */
        this.guid = options.guid !== undefined ? options.guid : newGuid();

        /**
         * @private
         * @member  Zondy.Service.GetMapInfoService.prototype.token
         * @type {*}
         * @description 地图信息
         */
        this.token = options.token;

        /**
         * @private
         * @member  Zondy.Service.GetMapInfoService.prototype.type
         * @type {*}
         * @description 地图类型
         */
        this.type = options.type;
    }

    /**
     * 获取地图文档/瓦片地图信息
     * @function  Zondy.Service.GetMapInfoService.prototype.GetMapInfo
     * @param  {Function}  [onSuccess] 获取地图信息成功回调函数
     * @param  {Function}  [onError]  获取地图信息失败回调函数
     * @example
     //创建获取文档信息服务
     var mapInfo = new Zondy.Service.GetMapInfoService({
                    //发布的地图文档名称
                    mapName: 'WorldJWEdit',
                    //IP地址
                    ip: "develop.smaryun.com",
                    //端口号
                    port: "6163"
                });
     //获取文档图片信息，getDataSuccess为回调函数
     mapInfo.GetMapInfo(function (res) {
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
     */
    GetMapInfo(onSuccess, onError) {
        var me = this;
        if (me.mapName) {
            me.partUrl = "info/" + this.mapName;
            var params = [];
            if (me.guid) {
                params.push("guid=" + me.guid);
            }
            if (this.token) {
                params.push("token=" + me.token);
            }
            if (this.type) {
                params.push("type=" + me.type);
            }
            if (params.length > 0) {
                me.partUrl += "?" + params.join('&');
            }
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
}
export {GetMapInfoService};
Zondy.Service.GetMapInfoService = GetMapInfoService;