import {
    Zondy,formatQuery,formatEdits,extend
} from '../common';
import {ArcGisServiceBase} from "./ServiceBase";
import {ArcGisQuery} from "./Query";

/**
 * @class module:ArcGis.ArcGisFeatureLayer
 * @description ArcGis服务
 * @author 基础平台-杨琨
 */
class ArcGisFeatureLayer {
    constructor(options) {
        this.id = null;
        this.uid = null;
        this.indexes = {
            items : []
        };
        this.load = null;

        this.attributionVisible = true;
        this.listMode = "show";
        this.hasAttributionData = false;
        this.createQueryVersion = 1;
        this.blendMode = "normal";
        this.capabilities = null;
        this.copyright = null;
        this.loadError = null;
        this.loadStatus = "not-loaded";
        this.loaded = false;
        this.loadWarnings = [];
        this.customParameters = null;
        this.definitionExpression = null;
        this.displayField = null;
        this.dynamicDataSource = null;
        this.editFieldsInfo = null;
        this.editingEnabled = true;
        this.editingInfo = null;
        this.effect = null;
        this.elevationInfo = null;
        this.featureReduction = null;
        this.fields = null;
        this.fieldsIndex = {
            dateFields:[],
            fields:[],
            uid:""
        };
        this.formTemplate = null;
        this.gdbVersion = null;
        this.geometryType = null;
        this.hasM = null;
        this.hasZ = null;
        this.historicMoment = null;
        this.isTable = false;
        this.labelingInfo = null;
        this.labelsVisible = true;
        this.layerId = null;
        this.legendEnabled = true;
        this.maxScale = 0;
        this.minScale = 0;
        this.opacity = 1;
        this.operationalLayerType = "ArcGisFeatureLayer";
        this.objectIdField = null;
        this.outFields = null;
        this.parent = null;
        this.path = null;
        this.parsedUrl = null;
        this.popupEnabled = true;
        this.popupTemplate = null;
        this.portalItem = null;
        this.refreshInterval = 0;
        this.relationships = null;
        this.renderer = null;
        this.returnM = null;
        this.returnZ = null;
        this.resourceReferences = {
            paths:[],
            portalItem: null
        };
        this.screenSizePerspectiveEnabled = true;
        this.serviceDefinitionExpression = null;
        this.source = null;
        this.scaleRangeId = "0,0";
        this.sourceJSON = null;
        this.spatialReference = {
            imageCoordinateSystem: null,
            isGeographic: true,
            isWGS84: true,
            isWebMercator: false,
            isWrappable: true,
            latestVcsWkid: null,
            latestWkid: null,
            vcsWkid: null,
            wkid: 4326,
            wkt: "GEOGCS['GCS_WGS_1984',DATUM['D_WGS_1984',SPHEROID['WGS_1984',6378137.0,298.257223563]],PRIMEM['Greenwich',0.0],UNIT['Degree',0.0174532925199433]]"
        };
        this.templates = null;
        this.sublayerTitleMode = "item-title";
        this.timeExtent = null;
        this.timeInfo = null;
        this.timeOffset = null;
        this.title = "";
        this.trackIdField = null;
        this.type = "feature";
        this.typeIdField = null;
        this.types = null;
        this.url = null;
        this.useViewTime = true;
        this.version = null;
        this.userIsAdmin = false;
        this.visible = true;

        extend(this,options)
        
        //判断是查询整个地图还是单个图层
        this._queryService = this.url && this.url.indexOf('FeatureServer') + 'FeatureServer'.length === this.url.length ? 'queryByMap' : 'queryByLayer'
        this._applyEditsService = this.url && this.url.indexOf('FeatureServer') + 'FeatureServer'.length === this.url.length ? 'applyEditsByMap' : 'applyEditsByLayer'
        let service = new ArcGisServiceBase();
        //对整个地图查询，url为http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer
        this.queryByMap = function (query) {
            let url = this.url + "/query?f=json";
            url = formatQuery(query,url,["geometry","layerDefs"],null);
            return service.getPromise(url);
        }
        //对单个图层查询，url为http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer/{layerId}
        this.queryByLayer = function (query) {
            let url = this.url + "/query?f=json";
            url = formatQuery(query,url,["geometry"],null);
            return service.getPromise(url);
        }

        //单个图层编辑
        this.applyEditsByLayer = function (edits,options) {
            let url = this.url + "/applyEdits",dataStr="";
            options = options ? options : {
                gdbVersion:[],
                rollbackOnFailure: true,
                f:'json'
            }
            //处理edits
            let editArr = ["addFeatures","updateFeatures","deleteFeatures"];
            if(edits.deleteFeatures){
                let IdsArr = [];
                for(let i = 0;i < edits.deleteFeatures.length;i++){
                    IdsArr.push(edits.deleteFeatures[i].objectId);
                }
                edits.deleteFeatures = IdsArr.join(",");
            }
            dataStr = formatEdits(dataStr,edits,editArr);
            //处理options
            dataStr = formatEdits(dataStr,options);
            //去聊多余的&符号
            dataStr = dataStr.substring(0,dataStr.length - 1);
            return service.getPromiseP(url,dataStr);
        }

        //整个地图编辑
        this.applyEditsByMap = function (edits,options) {
            options = options ? options : {
                gdbVersion:[],
                rollbackOnFailure: true,
                f:'json'
            }
            let url = this.url + "/applyEdits",dataStr="";
            //处理请求参数
            //处理edits
            dataStr += "edits=" + encodeURIComponent(JSON.stringify(edits)) + "&";
            //处理options
            dataStr = formatEdits(dataStr,options);
            //去聊多余的&符号
            dataStr = dataStr.substring(0,dataStr.length - 1);
            return service.getPromiseP(url,dataStr);
        }
    }
}

/**
 * @function module:ArcGis.ArcGisFeatureLayer.prototype.createQuery
 * @description 创建查询参数对象
 * @author 基础平台-杨琨
 */
ArcGisFeatureLayer.prototype.createQuery = function () {
    return new ArcGisQuery();
}


/**
 * @function  module:ArcGis.ArcGisFeatureLayer.prototype.queryFeatures
 * @description 查询要素信息
 * @author 基础平台-杨琨
 * @param query - {String} 必选项，查询参数。
 * @param {String} [query.geometry] 可选项。几何对象，要素查询条件，形式为x,y坐标。支持单个点，多个点、线、矩形、多边形。无需配合where使用，可单独查询。
 * 格式为：geometry对象或xmin,ymin,xmax,ymax点坐标；Example：单个点：geometry=-104,35.6；封闭矩形：geometry=-104,35.6,-94.32,41；geometry对象：{xmin: -104, ymin: 35.6, xmax: -94.32, ymax: 41}；
 * 参考链接：Geometry objects：https://developers.arcgis.com/documentation/common-data-types/geometry-objects.htm
 * @param {String} [query.geometryType] 可选项。配合geometry使用，当通过几何对象进行要素查询时，集合对象的类型，默认为矩形。可选值为：esriGeometryPoint | esriGeometryMultipoint | esriGeometryPolyline | esriGeometryPolygon | esriGeometryEnvelope
 * Example：geometryType=esriGeometryEnvelope
 * @param {String} [query.spatialRel] 可选项。空间关系。即所选的几何对象与图层的相交关系。例如包含、相交、相离等，默认值为esriSpatialRelIntersects。
 * 可选值为：esriSpatialRelIntersects | esriSpatialRelContains | esriSpatialRelCrosses | esriSpatialRelEnvelopeIntersects | esriSpatialRelIndexIntersects | esriSpatialRelOverlaps | esriSpatialRelTouches | esriSpatialRelWithin
 * Example：spatialRel=esriSpatialRelIntersects
 * @param {String} [query.returnGeometry] 可选项。返回要素集合时，是否返回几何信息。默认为true。返回几何信息。可选值：true | false
 * @param {String} [query.geometryPrecision] 可选项。指定返回的要素集合中x、y坐标的小数位数。Example：geometryPrecision=3
 * @param {String} [query.maxAllowableOffset] 可选项。简化返回的几何要素时，允许的最大偏移量。对返回的要素的geometry对象起作用。
 * @param {String} [query.where] 可选项。通过where进行条件查询。与整个地图的查询相比没有返回值过滤。Example：where=POP2000 > 350000
 * 参考链接：SQL语句：https://developers.arcgis.com/rest/services-reference/query-feature-service-.htm#ESRI_SECTION2_07DD2C5127674F6A814CE6C07D39AD46
 * @param {String} [query.sqlFormat] 可选项。sql语句的格式，默认为none。
 * @param {String} [query.objectIds] 可选项。通过Id查询要素。格式：objectIds=<objectId1>, <objectId2>；Example：objectIds=37, 462
 * @param {String} [query.orderByFields] 可选项。返回的要素几何以何种方式进行排序。是升序或降序。格式：orderByFields=field1 <ORDER>, field2 <ORDER>, field3 <ORDER>；
 * Example： orderByFields=STATE_NAME ASC, RACE DESC, GENDER
 * @param {String} [query.groupByFieldsForStatistics] 可选项。"以某个字段进行分组。只有当outStatistics 为true是有效
 * 格式：groupByFieldsForStatistics=field1, field2；Example：groupByFieldsForStatistics=STATE_NAME, GENDER"
 * @param {String} [query.outFields] 可选项。指定要显示的返回字段，为空时都不显示。Example：outFields=AREANAME,ST,POP2000；outFields=*
 * @param {String} [query.inSR] 可选项。几何对象的空间参考系。当不指定时，默认为地图的空间参考系。
 * @param {String} [query.outSR] 可选项。返回的要素几何的空间参考系。默认为地图的空间参考系。
 * @param {String} [query.returnCentroid] 可选项。返回要素集合时，是否返回每个要素的中心点。仅对layer有效。默认false；可选值：true | false
 * @param {String} [query.returnM] 可选项。是否返回m值，默认为false。可选值：true | false
 * @param {String} [query.returnZ] 可选项。是否返回z轴的值，默认为false。可选值：true | false
 * @param {String} [query.time] 可选项。按照时间进行查询。有两种方式瞬时查询和范围查询。Example：瞬时查询：time=<timeInstant>；time=1199145600000，即 (1 Jan 2008 00:00:00 GMT)
 * 范围查询：time=<startTime>, <endTime>；time=1199145600000, 1230768000000，即 (1 Jan 2008 00:00:00 GMT to 1 Jan 2009 00:00:00 GMT)；起始时间或结束时间可为null，即time=null, 1230768000000
 * @param {String} [query.distance] 可选项。缓冲距离。Example：distance=<distance>；distance=100
 * @param {String} [query.units] 可选项。缓冲距离单位。可选值：esriSRUnit_Meter | esriSRUnit_StatuteMile | esriSRUnit_Foot | esriSRUnit_Kilometer |
 * esriSRUnit_NauticalMile | esriSRUnit_USNauticalMile
 * @param {String} [query.supportsQueryWithDistance] 可选项。是否开启缓冲距离。默认false，不开启。可选项：true | false
 * @param {String} [query.returnDistinctValues] 可选项。返回值是否去重，只保留不同的值。默认为false。最好配合outfields一起使用。也可以和returnCountOnly使用。不能和geometry配合使用可选值：true | false
 * @param {String} [query.returnIdsOnly] 可选项。是只返回要素的ID还是返回要素集合。默认为false，即返回要素集合。可选值：true | false
 * @param {String} [query.returnCountOnly] 可选项。是只返回查询到的要素数量还是要素集合。默认为false，即返回要素集合。可选值：true | false
 * @param {String} [query.returnExtentOnly] 可选项。是否返回要素范围。
 * @param {String} [query.resultOffset] 可选项。当返回要素集合时，返回从resultOffset开始的要素。默认值为0；Example：resultRecordCount=10
 * @param {String} [query.resultRecordCount] 可选项。指定返回结果数量。
 * @param {String} [query.signal ] 可选项。是否取消异步任务。
 * @example
 *           //加载地图容器
            map = new mapboxgl.Map({
                container: 'map',
                crs: 'EPSG:4326',
                minZoom: 3,
                zoom: 6,
                center: [(114.02942023086823 + 114.9174350782441)/2,(30.562371200134724 + 30.96640367892471)/2]
            });
            //加载容器的级数控件，非必须
            var navigationControl = new mapboxgl.NavigationControl();
            map.addControl(navigationControl, 'top-left');
            //加载一个地图
            mapDocLayer = new mapboxgl.Zondy.Map.ArcGisTileLayer({
                url: 'http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer',
                mapgisOffset: -1
            });
            mapDocLayer.addToMap(map);
            //<-----------------------------查询单个图层------------------------------->
            //初始化要素编辑对象
            var queryServiceByLayer = new Zondy.Service.ArcGisFeatureLayer({
                //要查询的图层url，记得发布地图时，勾选Feature Access
                url:  'http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer/1'
            });
            //创建查询参数对象
            var queryParamsLayer = queryServiceByLayer.createQuery();
            //示例一 =====> objectIds查询，这里我查询objectId为155的要素，并返回该要素的全部字段
            queryParamsLayer.objectIds = "155";
            queryParamsLayer.outFields = "*";
            //示例二 =====> where查询，这里我查询Name为金口街道的要素，并返回该要素的Name,countyname字段
            queryParamsLayer.where = "Name = '金口街道'";
            queryParamsLayer.outFields = "Name,countyname";
            //示例三 =====> geometry查询--简单点查询（封闭矩形），并设置returnCountOnly为true只返回要素数量
            queryParamsLayer = queryServiceByLayer.createQuery();
            queryParamsLayer.geometry = "114.100,30.399,114.42,30608";
            queryParamsLayer.returnCountOnly = true;
            //示例四 =====> geometry查询--多边形查询，此时geometryType也要设成相应的值esriGeometryPolygon（多边形）
            queryParamsLayer.geometry = {
                           "rings" : [[[114.100,30.399],[114.214,30.723],[114.321,32.344],[114.42,30608],
                               [114.100,30.399]]],
                           "spatialReference" : {"wkid" : 4326}
                       }
            queryParamsLayer.geometryType = "esriGeometryPolygon";
            queryParamsLayer.returnCountOnly = false;
            //调用查询方法，并在then方法中执行之后的处理步骤
            queryServiceByLayer.queryFeatures(queryParamsLayer).then(function (data){
                console.log('查询单个图层')
                console.log(JSON.parse(data))
            })
            //<-----------------------------查询整个地图------------------------------->
            //初始化要素编辑对象
            var queryServiceByMap = new Zondy.Service.ArcGisFeatureLayer({
                //要查询的图层url，记得发布地图时，勾选Feature Access
                //此处url没有加layerId！！！，因此查询的是整个地图
                url:  'http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer'
            });
            //创建查询参数对象
            var queryParamsMap = queryServiceByLayer.createQuery();
            //示例一 =====> layerDefs(where)查询，layerId即图层id，where即查询语句，outFields选择显示的字段
            queryParamsMap.layerDefs = [{"layerId" : 1, "where" : "OBJECTID=155", "outFields" : "Name,pyname"}];
            //示例二 =====> geometry查询--简单点查询（封闭矩形），layerId即图层id，outFields选择显示的字段，注意因为是在整个地图文档上查询
            // 此处必须在layerDefs指定查询的图层，因此不能单独使用geometry
            queryParamsMap.layerDefs = [{"layerId" : 1, "outFields" : "Name,pyname"}];
            queryParamsMap.geometry = "114.100,30.399,114.42,30608";
            //示例三 =====> geometry查询--多边形查询
            queryParamsMap.layerDefs = [{"layerId" : 1, "outFields" : "Name,pyname"}];
            //设置要查询的多边形对象，rings为多边形点数组，spatialReference为多边形的坐标系可选填
            queryParamsMap.geometry = {
                           "rings" : [[[114.100,30.399],[114.214,30.723],[114.321,32.344],[114.42,30608],
                               [114.100,30.399]]],
                           "spatialReference" : {"wkid" : 4326}
                       }
            //如果是多边形，这里也要设成相应的选项
            queryParamsMap.geometryType = "esriGeometryPolygon";
            //调用查询方法，并在then方法中执行之后的处理步骤
            queryServiceByMap.queryFeatures(queryParamsMap).then(function (data){
                console.log('查询整个地图')
                console.log(JSON.parse(data))
            })
 */
ArcGisFeatureLayer.prototype.queryFeatures = function (query) {
    return this[this._queryService](query);
}

/**
 * @function module:ArcGis.ArcGisFeatureLayer.prototype.applyEdits
 * @description 要素编辑
 * @author 基础平台-杨琨
 * @param edits - {Object} 必选项，要执行的要素编辑操作。
 * @param {Array} [edits.addFeatures] 可选项。添加要素的集合。格式addFeatures:[feature-object1,feature-object2,...]。
 * feature-object没有必填项，也就是说空值也会新增。[{},{}]如此则新增两个空数据。其中OBJECTID是自增的，无法指定。
 * 格式为：
 * [
 *   {
 *      "geometry":{},
 *      "attributes":{}
 *    }
 * ]
 * 参考文档：https://developers.arcgis.com/documentation/common-data-types/feature-object.htm
 * @param {Array} [edits.updateFeatures] 可选项。要更新要素的集合。格式updateFeatures:[feature-object1,feature-object2,...]。
 * OBJECTID必须填写，其他选填。
 * 格式为：
 * [
 *   {
 *      "geometry":{},
 *      "attributes":{
 *            "OBJECTID":"Your-ID",//OBJECTID必填，其他的都是选填。
 *            ...
 *      }
 *    }
 * ]
 * 参考文档：https://developers.arcgis.com/documentation/common-data-types/feature-object.htm
 * @param {String} [edits.deleteFeatures] 可选项。删除要素。
 * @param {String} [edits.deleteFeatures.objectIds  ] 可选项。通过ObjectId来删除要素。
 * @param {String} [edits.deleteFeatures.where  ] 可选项。通过where语句来删除要素。
 * @param {String} [edits.deleteFeatures.geometry  ] 可选项。通过geometry对象来删除要素。
 * @param {String} [edits.deleteFeatures.geometryType  ] 可选项。指定geometry的想的类型。
 * @param {String} [edits.deleteFeatures.inSR  ] 可选项。指定geometry对象的坐标系，默认为地图坐标系。
 * @param {String} [edits.deleteFeatures.spatialRel  ] 可选项。指定geometry与图层的相交关系，例如包含、相交、相离等，默认值为esriSpatialRelIntersects。
 可选值为：esriSpatialRelIntersects | esriSpatialRelContains | esriSpatialRelCrosses | esriSpatialRelEnvelopeIntersects | esriSpatialRelIndexIntersects | esriSpatialRelOverlaps | esriSpatialRelTouches | esriSpatialRelWithin
 Example：spatialRel:esriSpatialRelIntersects
 * @param options  - {Object} 可选项，额外编辑选项。
 * @param {String} [options.gdbVersion] 可选项，地理数据库版本号。
 * @param {String} [options.rollbackOnFailure ] 可选项，是否允许回滚，默认为true，可选值true|false。
 * @param {String} [options.useGlobalIds] 可选项，是否允许使用GlobalId，可选值true|false。
 * @example
 *            //要素集合
 *            var features = [
 *                {
                      "geometry": {
                          "points": [
                              [
                                  114.23201742000003,
                                  30.576808980000067
                              ]
                          ]
                      },
                      "attributes": {
                          "gml_id": "layer_lottery_pt.58836",
                          "Name": "彩票销售店",
                          "pyname": "cpxsd",
                          "kind": "AE04",
                          "zipcode": null,
                          "telephone": "027-83876450",
                          "display_x": "114.23746",
                          "display_y": "30.57435",
                          "side": "L",
                          "address": "汉宜路170号附近",
                          "mpLayer": 0
                      }
                  }
            ]
            //<-------------------------单个图层的编辑操作示例----------------------------------------->
            //初始化要素服务对象
            var queryService = new Zondy.Service.ArcGisFeatureLayer({
                url:  'http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer/0'
            });
            //新增操作
            //调用编辑服务
            queryService.applyEdits({
                addFeatures: features
            }).then(function (data){
                //在这里编写成功之后的操作
                console.log('新增成功')
                console.log(data)
            })
            //更新操作
            //更新操作必须指定OBJECTID
            features[0].attributes.OBJECTID='577'
            //调用编辑服务
            queryService.applyEdits({
                updateFeatures: features
            }).then(function (data){
                //在这里编写成功之后的操作
                console.log('更新成功')
                console.log(data)
            })
            //删除操作，通过ObjectId删除要素
            queryService.applyEdits({
                deleteFeatures: 4020
            }).then(function (data){
                //在这里编写成功之后的操作
                console.log('删除成功')
                console.log(data)
            })
            //先新增要素，然后进行查询操作、新增要素、删除要素、
                //要编辑的要素对象
                var features = [
                {
                    "geometry": {
                        "points": [
                            [
                                114.23201742000003,
                                30.576808980000067
                            ]
                        ]
                    },
                    "attributes": {
                        "gml_id": "layer_lottery_pt.58836",
                        "Name": "彩票销售店",
                        "pyname": "cpxsd",
                        "kind": "AE04",
                        "zipcode": null,
                        "telephone": "027-83876450",
                        "display_x": "114.23746",
                        "display_y": "30.57435",
                        "side": "L",
                        "address": "汉宜路170号附近",
                        "mpLayer": 0
                    }
                }
            ]
            //初始化要素服务对象
            var queryService = new Zondy.Service.ArcGisFeatureLayer({
                           url:  'http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer/0'
                       });
            //调用编辑服务，新增要素
            queryService.applyEdits({
                addFeatures: features
            }).then(function (addData){
                //在这里编写成功之后的操作
                console.log('新增成功');
                addData = JSON.parse(addData);
                console.log(addData);
                //创建查询参数对象
                var queryParamsLayer = queryService.createQuery();
                //设置查询条件，根据objectIds进行查询
                queryParamsLayer.objectIds = addData.addResults[0].objectId;
                queryParamsLayer.outFields = "*";
                queryService.queryFeatures(queryParamsLayer).then(function (queryData) {
                    console.log('查询成功');
                    queryData = JSON.parse(queryData);
                    console.log(queryData);
                    features[0].attributes.objectId = queryData.features[0].attributes.OBJECTID;
                    features[0].attributes.Name = "修改名字";
                    queryService.applyEdits({
                        updateFeatures:features
                    }).then(function (updateData) {
                        console.log('更新成功');
                        updateData = JSON.parse(updateData);
                        console.log(updateData);
                        var objIds = updateData.updateResults[0].objectId;
                        queryService.applyEdits({
                            deleteFeatures:objIds
                        }).then(function (deleteData) {
                            console.log('删除成功');
                            deleteData = JSON.parse(deleteData);
                            console.log(deleteData);
                        });
                    });
                });
            })
            //<----------------------整个地图的编辑操作----------------------------------->
            //初始化要素服务对象
            var queryService = new Zondy.Service.ArcGisFeatureLayer({
                            //编辑整个地图，因此末尾不带layerId
                           url:  'http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer'
                       });
            //设置返回格式
            var options = {
                gdbVersion:[],
                rollbackOnFailure: true,
                f:'json'
            }
            //新增要素
            //新增要素的格式，[{第0个图层新增操作},{第1个图层新增操作},...]，对每个图层的操作分开来写，要带上layerid
            var edit = [
                    {
                        //id即为layerId，必须带，否则不知道编辑哪一个图层
                        "id" : 0,
                        //adds操作，[feature-object1,feature-object2,feature-object3,...]
                        adds: [
                            {
                                "geometry": {
                                    "points": [
                                        [
                                            114.23201742000003,
                                            30.576808980000067
                                        ]
                                    ]
                                },
                                "attributes": {
                                    "gml_id": "layer_lottery_pt.58836",
                                    "Name": "彩票销售店",
                                    "pyname": "cpxsd",
                                    "kind": "AE04",
                                    "zipcode": null,
                                    "telephone": "027-83876450",
                                    "display_x": "114.23746",
                                    "display_y": "30.57435",
                                    "side": "L",
                                    "address": "汉宜路170号附近",
                                    "mpLayer": 0
                                }
                            }
                        ]
                    }
                ]
            queryService.applyEdits(edit,options).then(function (data){
                //在这里编写成功之后的操作
                console.log('新增成功')
                console.log(data)
            })
            //更新要素
            var edit = [
                {
                    //id即为layerId，必须带，否则不知道编辑哪一个图层
                    "id" : 0,
                    //updates操作，[feature-object1,feature-object2,feature-object3,...]
                    updates: [
                        {
                            "geometry": {
                                "points": [
                                    [
                                        114.23201742000003,
                                        30.576808980000067
                                    ]
                                ]
                            },
                            "attributes": {
                                "gml_id": "layer_lottery_pt.58836",
                                //objectId也必须要带
                                "objectId":4013,
                                "Name": "彩票销售店",
                                "pyname": "cpxsd",
                                "kind": "AE04",
                                "zipcode": null,
                                "telephone": "027-83876450",
                                "display_x": "114.23746",
                                "display_y": "30.57435",
                                "side": "L",
                                "address": "汉宜路170号附近",
                                "mpLayer": 0
                            }
                        }
                    ]
                }
            ]
            queryService.applyEdits(edit,options).then(function (data){
                //在这里编写成功之后的操作
                console.log('更新成功')
                console.log(data)
            })
            //根据ObjectId删除要素
            var edit = [
                {
                    //id即为layerId，必须带，否则不知道编辑哪一个图层
                    "id" : 0,
                    deletes: [4014]
                }
            ]
            queryService.applyEdits(edit,options).then(function (data){
                //在这里编写成功之后的操作
                console.log('删除成功')
                console.log(data)
            })
            //新增、更新、删除同时进行，图层0、1分别进行操作
            var edit = [
                    //对图层0进行操作
                    {
                        //id即为layerId，必须带，否则不知道编辑哪一个图层
                        "id" : 0,
                        adds:[
                            {
                                "geometry": {
                                    "points": [
                                        [
                                            114.23201742000003,
                                            30.576808980000067
                                        ]
                                    ]
                                },
                                "attributes": {
                                    "gml_id": "layer_lottery_pt.58836",
                                    "Name": "彩票销售店",
                                    "pyname": "cpxsd",
                                    "kind": "AE04",
                                    "zipcode": null,
                                    "telephone": "027-83876450",
                                    "display_x": "114.23746",
                                    "display_y": "30.57435",
                                    "side": "L",
                                    "address": "汉宜路170号附近",
                                    "mpLayer": 0
                                }
                            }
                        ],
                        updates:[
                            {
                                "geometry": {
                                    "points": [
                                        [
                                            114.23201742000003,
                                            30.576808980000067
                                        ]
                                    ]
                                },
                                "attributes": {
                                    "gml_id": "layer_lottery_pt.58836",
                                    "objectId":4017,
                                    "Name": "彩票销售店",
                                    "pyname": "cpxsd",
                                    "kind": "AE04",
                                    "zipcode": null,
                                    "telephone": "027-83876450",
                                    "display_x": "114.23746",
                                    "display_y": "30.57435",
                                    "side": "L",
                                    "address": "汉宜路170号附近",
                                    "mpLayer": 0
                                }
                            }
                        ],
                        deletes:[4016]
                    },
                    //对图层1进行操作
                    {
                        id:1,
                        deletes: [155]
                    }
                ]
                queryService.applyEdits(edit,options).then(function (data){
                    //在这里编写成功之后的操作
                    console.log('编辑完成')
                    console.log(data)
                })
 */
ArcGisFeatureLayer.prototype.applyEdits = function (edits,options) {
    return this[this._applyEditsService](edits,options);
}

/**
 * @function module:ArcGis.ArcGisFeatureLayer.prototype.queryFeatureCount
 * @description 要素查询，仅返回要素数量
 * @author 基础平台-杨琨
 * @param query - {String} 必选项，查询参数。
 * @param options - {String} 可选项，是否取消异步操作。
 * @example 调用方法同queryObjectIds
 */
ArcGisFeatureLayer.prototype.queryFeatureCount = function (query) {
    query.returnCountOnly = true;
    return this[this._queryService](query);
}

/**
 * @function module:ArcGis.ArcGisFeatureLayer.prototype.queryObjectIds
 * @description 要素查询，仅返回ObjectId
 * @author 基础平台-杨琨
 * @param query - {String} 必选项，查询参数，参考queryFeatures方法。
 * @param options - {String} 可选项，是否取消异步操作。
 * @example
        //加载地图容器
        map = new mapboxgl.Map({
                       container: 'map',
                       crs: 'EPSG:4326',
                       minZoom: 3,
                       zoom: 6,
                       center: [(114.02942023086823 + 114.9174350782441)/2,(30.562371200134724 + 30.96640367892471)/2]
                   });
        //加载容器的级数控件，非必须
        var navigationControl = new mapboxgl.NavigationControl();
        map.addControl(navigationControl, 'top-left');
        //加载一个地图
        mapDocLayer = new mapboxgl.Zondy.Map.ArcGisTileLayer({
                       url: 'http://219.142.81.85/arcgis/rest/services/10wanZH/MapServer',
                       mapgisOffset: -1
                   });
        mapDocLayer.addToMap(map);
        //<-----------------------------查询单个图层------------------------------->
        //初始化要素编辑对象
        var queryServiceByLayer = new Zondy.Service.ArcGisFeatureLayer({
                       //要查询的图层url，记得发布地图时，勾选Feature Access
                       url:  'http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer/1'
                   });
        //创建查询参数对象
        var queryParamsLayer = queryServiceByLayer.createQuery();
        //查询layerId为1，countyname为江夏区的要素，并返回其Id
        queryParamsLayer.where = "countyname='江夏区'"
        queryServiceByLayer.queryObjectIds(queryParamsLayer).then(function (data){
                       console.log('查询单个图层')
                       console.log(JSON.parse(data))
                   })
        //<-----------------------------查询整个地图------------------------------->
        //初始化要素编辑对象
        var queryServiceByMap = new Zondy.Service.ArcGisFeatureLayer({
                       //要查询的图层url，记得发布地图时，勾选Feature Access
                       //此处url没有加layerId！！！，因此查询的是整个地图
                       url:  'http://localhost:6080/arcgis/rest/services/wuhan_2/FeatureServer'
                   });
        //创建查询参数对象
        var queryParamsMap = queryServiceByLayer.createQuery();
        //查询layerId为1，countyname为江夏区的要素，并返回其Id
        queryParamsMap.layerDefs = {"1":"countyname = '江夏区'"}
        queryServiceByMap.queryObjectIds(queryParamsMap).then(function (data){
                       console.log('查询整个地图')
                       console.log(JSON.parse(data))
                   })
 */
ArcGisFeatureLayer.prototype.queryObjectIds = function (query) {
    query.returnIdsOnly = true;
    return this[this._queryService](query);
}

/**
 * @function module:ArcGis.ArcGisFeatureLayer.prototype.queryExtent
 * @description 要素查询，仅返回要素geometry数组
 * @author 基础平台-杨琨
 * @param query - {String} 必选项，查询参数。
 * @param options - {String} 可选项，是否取消异步操作。
 * @example 调用方法同queryObjectIds
 */
ArcGisFeatureLayer.prototype.queryExtent = function (query) {
    query.returnExtentOnly = true;
    return this[this._queryService](query);
}

export {ArcGisFeatureLayer};
Zondy.Service.ArcGisFeatureLayer = ArcGisFeatureLayer;