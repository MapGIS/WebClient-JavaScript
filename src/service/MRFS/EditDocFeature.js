import {Zondy} from '../common/Base';
import {EditServiceBase}  from  "./EditServiceBase";
import {IgsServiceBase}  from  "../baseserver/IServiceBase";

/**
 * @author 基础平台/产品2部 龚跃健
 * @class module:要素服务.EditDocFeature
 * @classdesc  Zondy.Service.EditDocFeature 文档要素编辑类
 * @extends  Zondy.Service.EditServiceBase
 * @param option - {Object} 属性键值对，颜色属性字段。<br>
 * @param {String} [option.docName = null] 文档名称
 * @param {String} [option.layerIndex = 0] 图层索引号
 */
class EditDocFeature extends EditServiceBase {

    constructor(docName, layerIndex, option) {
        var options = option ? option : {};
        super(options);
        /**
         * @private
         * @member Zondy.Service.EditDocFeature.prototype.docName
         * @type {String}
         * @description 文档名称
         * @default null
         */
        this.docName = docName !== undefined ? docName : null;

        /**
         * @private
         * @member Zondy.Service.EditDocFeature.prototype.mapIndex
         * @type {Number}
         * @description 地图索引
         * @default 0
         */
        this.mapIndex = 0;

        /**
         * @private
         * @member Zondy.Service.EditDocFeature.prototype.layerIndex
         * @type {Number}
         * @description 图层索引号
         * @default 0
         */
        this.layerIndex = layerIndex !== undefined ? layerIndex : 0;
    }

    /**
     * @description 添加一组要素
     * @function Zondy.Service.EditDocFeature.prototype.add
     * @param  features  -{Zondy.Object.FeatureSet} 要添加的要素集合。
     * @param onSuccess - {Function} 添加成功回调函数。
     * @param onError - {Function} 添加失败回调函数。
     * @example
     var editService = new Zondy.Service.EditDocFeature("WorldJWEdit", 11, {
                    ip: "develop.smaryun.com",
                    port: "6163"
                });
     editService.add(featureSet, function (res) {
                    console.log("add");
                    console.log(res)
                },function (error) {
                    console.log(error)
                });
     */
    add(features, onSuccess, onError) {
        var me = this;
        if (features === undefined) {
            return;
        }
        me.partUrl = "docs/" + me.docName + "/" + me.mapIndex + "/" + me.layerIndex + "/addFeatures?f=" + me.f + "&guid=" + me.guid;
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
     * @function Zondy.Service.EditDocFeature.prototype.update
     * @param  features  -{FeatureSet} 要更新的要素集合。
     * @param onSuccess - {Function} 更新成功回调函数。
     * @param onError - {Function} 更新失败回调函数。
     * @example
     var editService = new Zondy.Service.EditDocFeature("WorldJWEdit", 11, {
                            ip: "develop.smaryun.com",
                            port: "6163"
                        });
     //更新所选要素，UpdateDocSuccess为回调函数
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
        me.partUrl = "docs/" + me.docName + "/" + me.mapIndex + "/" + me.layerIndex + "/updateFeatures?f=" + me.f + "&guid=" + me.guid;
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
     * @function Zondy.Service.EditDocFeature.prototype.deletes
     * @param featureIds  -{String} 要删除的要素OID，多个要素OID间用','分割。
     * @param onSuccess - {Function} 删除成功回调函数。<br>
     * @param onError - {Function} 删除失败回调函数。
     * @example
     * var deleteService = new Zondy.Service.EditDocFeature("WorldJWEdit", 11,
     {
         ip: "develop.smaryun.com",
         port: "6163"
     });
     deleteService.deletes(featureIds, function (res) {
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
        me.partUrl = "docs/" + me.docName + "/" + me.mapIndex + "/" + me.layerIndex + "/deleteFeatures?f=" + me.f + "&objectIds=" + featureIds + "&guid=" + me.guid;
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
export {EditDocFeature};
Zondy.Service.EditDocFeature = EditDocFeature;