import {Zondy} from '../common/Base';
import {EditServiceBase}  from  "./EditServiceBase";
import {IgsServiceBase}  from  "../baseserver/IServiceBase";
/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.EditLayerFeature
 * @classdesc Zondy.Service.EditLayerFeature 矢量图层要素编辑类
 * @extends   Zondy.Service.EditServiceBase
 * @param gdbp  - {String} 图层的URL，添加要素只能同时操作单个图层。
 * @param option - {Object} 属性键值对。<br>
 * @param {Object} [option.guid = newGuid()] 唯一标识，用于标识地图图层
 */
class EditLayerFeature extends EditServiceBase {
    constructor(gdbp, option) {
        var options = option ? option : {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.EditLayerFeature.prototype.gdbp
         * @type {String}
         * @description 图层的URL，添加要素只能同时操作单个图层
         * @default null
         */
        this.gdbp = gdbp !== undefined ? gdbp : null;
    }

    /**
     * @description 添加一组要素
     * @function Zondy.Service.EditLayerFeature.prototype.add
     * @param  features  - {Zondy.Object.FeatureSet} 要添加的要素集合。
     * @param onSuccess - {Function} 添加成功回调函数。
     * @param onError - {Function} 添加失败回调函数。
     * @example
     var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市",
     {
         ip: "develop.smaryun.com",
         port: "6163"
     });
     editService.add(featureSet, function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    add(features, onSuccess, onError) {
        var me = this;
        if (features === undefined) {
            return;
        }
        me.partUrl = "layer/addFeatures?f=" + me.f + "&gdbp=" + me.gdbp + "&guid=" + me.guid;
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(features),
            headers: {'Content-Type': 'text/plain;charset=UTF-8'}
        });
    }

    /**
     * @description 更新一组要素
     * @function Zondy.Service.EditLayerFeature.prototype.update
     * @param features - {Zondy.Object.FeatureSet} 要更新的要素集合。
     * @param onSuccess - {Function} 更新成功后回调函数。
     * @param onError - {Function} 更新成功后回调函数。
     * @example
     var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mypntlayer",{
                    ip: "develop.smaryun.com",
                    port: "6163"
                });
     editService.update(featureSet, function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    update(features, onSuccess, onError) {
        var me = this;
        if (features === undefined) {
            return;
        }
        me.partUrl = "layer/updateFeatures?f=" + me.f + "&gdbp=" + me.gdbp + "&guid=" + me.guid;
        var url = me.getFullUrl();
        var service = new IgsServiceBase(url, {
            eventListeners: {
                scope: me,
                processCompleted: onSuccess,
                processFailed: onError
            }
        });
        service.processAsync({
            method: 'POST',
            data: JSON.stringify(features),
            headers: {'Content-Type': 'text/plain;charset=UTF-8'}
        });
    }

    /**
     * @description 删除一组要素
     * @function Zondy.Service.EditLayerFeature.prototype.deletes
     * @param  featureIds  - {String} 要删除的要素OID，多个要素OID间用','分割。
     * @param onSuccess - {Function} 删除成功后回调函数。
     * @param onError - {Function} 删除成功后回调函数。
     * @example
     var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/地图编辑缓存经纬度/sfcls/mypntlayer", {
                    ip: "develop.smaryun.com",
                    port: "6163"
                });
     editService.deletes(featureIds, function (res) {
                    console.log(res);
                },function (error) {
                    console.log(error);
                });
     */
    deletes(featureIds, onSuccess, onError) {
        var me = this;
        if (featureIds === undefined) {
            return;
        }
        me.partUrl = "layer/deleteFeatures?f=" + me.f + "&objectIds=" + featureIds + "&gdbp=" + me.gdbp + "&guid=" + me.guid;
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
export {EditLayerFeature};
Zondy.Service.EditLayerFeature = EditLayerFeature;