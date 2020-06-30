import L from "leaflet";

import {
  DataSet
} from "mapv";

import {
  URL_HTTP_PROFIX,
  URL_SUB,
  QUERY_GEOHASH,
  PARAM_SUB,
  SPACE_ENUM_POLYGON,
  PARAM_COMMA,
  PARAM_SPLIT,
  QUERY_GEOHASH_POINT
} from '../../../common/service/elasticsearch/BaseDefine';

import {
  IServiceLoadData
} from '../../../common/service/elasticsearch/IServiceLoadData';


import '../../core/Base';

import {
  MapVLayer
} from '../../overlay/MapvLayer';



L.zondy.GeoHashLayer = undefined;

/**
 * @author 基础平台/创新中心 潘卓然 ParnDeedlit
 * @class L.zondy.GeoHashService
 * @classdesc 基于leaflet与mapv的针对els的地理哈希聚类的封装接口
 * @param ip - {String} 传入的datastore的部署的ip地址
 * @param socket - {String} 传入的datastore的部署的ip端口
 * @param map - {Object} 传入的leaflet的地图对象
 * @param queryOption - {TimeSpaceOption} 传入的时间空间查询接口
 * @param styleOption - {MapvOption} 传入的mapv的属性
 * @param callback(result) - {function} 请求成功的回调函数，返回请求数据<br>
 */
export class GeoHashService {
  constructor(ip, socket, map, queryOption, styleOption, callback) {
    this.layer = null;

    this.map = map;
    this.urlAddress = "";

    this.queryOption = {};
    this.styleOption = styleOption;

    this.onCallback = callback;

    this.prefixUrlPost(ip, socket, queryOption);
    new IServiceLoadData("GET", this.urlAddress, this.queryOption, this.styleOption,
      this.map, this.onSuccess, this.onFailure, this.onCallback);
  }

  /*
  * 下面的逻辑是对应的DataStore的Post请求一一对应，这里只是一个封装，将用户的直观参数
  转换成DataStore要求的参数
  */
  prefixUrlPost(ip, socket, queryOption) {
    //处理url
    this.urlAddress = "" + URL_HTTP_PROFIX + ip + URL_SUB + socket + "/es/" + QUERY_GEOHASH;
    //处理elasticsearch的数据库库名,表名
    this.queryOption.indexName = queryOption.db;
    this.queryOption.typeName = queryOption.table;

    //处理空间属性参数
    if (queryOption && queryOption.space) {
      this.queryOption.aggfield = queryOption.space.field; //空间字段  
      this.queryOption.spatialCondition = SPACE_ENUM_POLYGON + PARAM_SUB +
        queryOption.space.north + PARAM_COMMA + queryOption.space.west + PARAM_SPLIT +
        queryOption.space.north + PARAM_COMMA + queryOption.space.east + PARAM_SPLIT +
        queryOption.space.south + PARAM_COMMA + queryOption.space.east + PARAM_SPLIT +
        queryOption.space.south + PARAM_COMMA + queryOption.space.west;
    }

    //处理时间属性参数
    if (queryOption && queryOption.time) {
      this.queryOption.timefield = queryOption.time.field; //时间字段  
      this.queryOption.timeCondition = "" + queryOption.time.starttime +
        PARAM_COMMA + queryOption.time.endtime; //时间起始时间
      this.startTime = queryOption.time.starttime;
      this.endTime = queryOption.time.endtime;
    }

    this.queryOption.aggGeoFormat = QUERY_GEOHASH_POINT; //结果以点的形式返回
    this.queryOption.percision = queryOption.space.percision;

  }

  onSuccess(result, map, style, callback) {
/*     if(result.succeed != true){
      console.log("els成功的回调里面的succeed！=true，请检查els的后台环境！")
      return;
    }else{
      console.log(result)
    } */
    if (L.zondy.GeoHashLayer != undefined) L.zondy.GeoHashLayer.remove();
    var dataSet = [];
    var features = result.features;
    if (features == null || features == undefined) return;
    features.forEach(function (feature) {
      dataSet.push({
        geometry: {
          type: 'Point',
          coordinates: feature.geometry.coordinates
        },
        count: feature.properties.aggcount
      });
    });
    dataSet = new DataSet(dataSet);
    L.zondy.GeoHashLayer = new MapVLayer(map, dataSet, style).addTo(map);

    if (callback != null && callback != undefined) {
      callback(result);
    }
  }

  onFailure() {

  }

  // convertData(response) {
  //   this.dataSet = [];
  //   response.features.forEach(function(feature) {
  //     this.dataSet.push({
  //       geometry: {
  //         type: 'Point',
  //         coordinates: feature.geometry.coordinates
  //       },
  //       count: feature.properties.aggcount
  //     });
  //   });
  // }
  //
  // updateLayer() {
  //   this.layer = new MapVLayer(this.map, this.dataSet, this.styleOption).addTo(this.map);
  // }
  //
  // removeLayer() {
  //   this.layer.remove(this.map);
  // }

};

export var geoHashService = function (ip, socket, map, queryOption, styleOption, callback) {
  return new GeoHashService(ip, socket, map, queryOption, styleOption, callback);
};

L.zondy.GeoHashService = geoHashService;