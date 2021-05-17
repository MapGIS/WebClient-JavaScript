import Qs from 'qs';

import { Zondy } from '../../common/Base';
import { CloudDiskService } from '../ServiceBase';

const AddPath = '';
const CatalogPath = '/catalog';
const CatalogTypePath = '/catalog/{type}?';
const ExecutePath = '/execute/{type}/{modelID}?';
const NodePath = '/node';
const NodeIdPath = '/node/{id}?';
const NodeRootPath = '/node/root';
const NodesPath = '/nodes';
const NodesIdPath = '/nodes/{nodeId}?';

/**
 * @class module:CloudDisk.GisCore.CalculateModelService
 * @description DataStore的云盘数据转换服务
 * @see 该方法强依赖datastore
 * @author 基础平台-潘卓然
 * @example
 * let service = new CalculateModelService({ domain: "http://192.168.199.53:9011"});
 * service.setAuthorization('pk.sdfsedfsxseres');
 * service.add({nodeId: 100}, (res) => {}, (error) => {});
 * service.catalog({nodeId: 100}, (res) => {}, (error) => {});
 */
export class CalculateModelService extends CloudDiskService {
    constructor(options) {
        super(options);
        /**
         * @member module:CloudDisk.CalculateModelService.prototype.serviceUrl
         * @description 服务地址
         */
        this.serviceUrl = '/clouddisk/rest/CalculateModel';
    }

    /**
     * @private 修正get/post需要的真正参数
     */
    fixOption(option) {
        this.option = {};
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.add
     * @description 空间数据元数据
     * @param  {Object} options 请求参数
     * @param  {Number} options.nodeId 节点id
     * @param  {Object} options.model  目地目录
     * @param  {Number} options.model.id  
     * @param  {String} options.model.name 
     * @param  {String} options.model.version  
     * @param  {String} options.model.desp 
     * @param  {String} options.model.img
     * @param  {String} options.model.modelType
     * @param  {String} options.model.modelId
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel
     * {
            "nodeId": 3131,
            "id": 0,
            "name": "string",
            "version": "string",
            "desp": "string",
            "img": "string",
            "modelType": "string",
            "modelId": "string"
        }
     */
    add(options, onSuccess, onError) {
        let { serviceUrl } = this;
        let baseurl = this.getBaseUrl();
        let url = `${baseurl}${serviceUrl}${AddPath}?nodeId=${options.nodeId}`;
        delete options.nodeId;
        this.post(url, options, onSuccess, onError);
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.catalog
     * @description 空间数据元数据
     * @param  {Object} options 请求参数
     * @param  {Number} options.nodeId 节点id
     * @param  {String} options.keyword  检索关键词
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/catalog
     */
    catalog(options, onSuccess, onError) {
        let { serviceUrl } = this;
        serviceUrl += CatalogPath;
        let url = this.getFullUrl(serviceUrl, options);
        this.get(url, onSuccess, onError);
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.catalogtype
     * @description 空间数据元数据
     * @param  {Object} options 请求参数
     * @param  {String} options.type 模型类型eg: igs 、bigdata
     * @param  {String} options.modelID  模型id
     * @param  {String} options.keyWords  模型功能类型
     * @param  {String} options.keys  模型检索关键词
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/catalog/{type}
     */
    catalogtype(options, onSuccess, onError) {
        const { type } = options;
        let { serviceUrl } = this;
        let baseurl = this.getBaseUrl();
        let url = `${baseurl}${serviceUrl}${CatalogTypePath}`;
        url = url.replace('{type}', type);
        delete options.type;
        url = url + Qs.stringify(options);
        this.get(url, onSuccess, onError);
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.execute
     * @description 空间数据元数据
     * @param  {Object} options 请求参数
     * @param  {Object} options.type  模型类型
     * @param  {Object} options.modelID 模型id
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/execute/{type}/{modelID}
     */
    execute(options, onSuccess, onError) {
        const { serviceUrl } = this;
        const { type, modelID } = options;
        let baseurl = this.getBaseUrl();

        let url = `${baseurl}${serviceUrl}${ExecutePath}`;
        url = url.replace('{type}', type);
        url = url.replace('{modelID}', modelID);

        this.post(url, undefined, onSuccess, onError);
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.node
     * @description 空间数据元数据 Parameter-Content-Type application/json
     * @param  {Object} treeNode  请求参数
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/node
     * {
            "id": 0,
            "name": "string",
            "pid": 0,
            "type": 0,
            "desp": "string",
            "nodeSelected": true,
            "nodeExpand": true,
            "sortId": 0,
            "nodeIco": "string",
            "year": "string",
            "ownerType": 0,
            "ownerId": "string",
            "applicationId": 0,
            "children": [
                null
            ]
        }
     */
    node(options, onSuccess, onError) {
        const { serviceUrl } = this;
        let baseurl = this.getBaseUrl();
        let url = `${baseurl}${serviceUrl}${NodePath}`;
        this.post(url, options, onSuccess, onError);
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.nodeid
     * @description 空间数据元数据
     * @param  {Object} options 请求参数
     * @param  {String} options.id 节点id
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/node/{id}
     */
    nodeid(options, onSuccess, onError) {
        const { id } = options;
        let { serviceUrl } = this;
        let url = `${baseurl}${serviceUrl}${NodeIdPath}`;
        url = url.replace('{id}', id);
        this.get(url, onSuccess, onError);
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.noderoot
     * @description 空间数据元数据
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/node/root
     */
    noderoot(options, onSuccess, onError) {
        options = {};
        let { serviceUrl } = this;
        serviceUrl += NodeRootPath;
        let url = this.getFullUrl(serviceUrl, options);
        this.get(url, onSuccess, onError);
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.nodes
     * @description 空间数据元数据
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/nodes
     */
    nodes(options, onSuccess, onError) {
        options = {};
        let { serviceUrl } = this;
        serviceUrl += NodesPath;
        let url = this.getFullUrl(serviceUrl, options);
        this.get(url, onSuccess, onError);
    }

    /**
     * @function module:CloudDisk.CalculateModelService.prototype.nodesid
     * @description 空间数据元数据
     * @param  {Object} options 请求参数
     * @param  {String} options.nodeId 节点id
     * @param  {Boolean} [options.subLevel = false] 是否包含子级节点
     * @param  {Function} onSuccess 成功回调
     * @param  {Function} onError 失败回调
     * @example http://192.168.199.53:9011/clouddisk/rest/CalculateModel/nodes/{nodeId}?subLevel=false
     */
    nodesid(options, onSuccess, onError) {
        const { nodeId } = options;
        let { serviceUrl } = this;
        let url = `${baseurl}${serviceUrl}${NodesIdPath}`;
        url = url.replace('{nodeId}', nodeId);
        delete options.nodeId;
        url = url + Qs.stringify(options);
        this.get(url, onSuccess, onError);
    }
}

export default CalculateModelService;
Zondy.CloudDisk.Model.CalculateModelService = CalculateModelService;
