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
} from './Base';
import '../../core/Base';

import {
  MapVLayer
} from '../../overlay/MapvLayer';

import {
  IServiceLoadData
} from '../../../common/service/elasticsearch/IServiceLoadData';

L.zondy.GeoHashLayer = undefined;

export class GeoPointService {
  constructor(ip, socket, map, queryOption, styleOption) {
    this.layer = null;

    this.map = map;
    this.urlAddress = "";

    this.queryOption = {};
    this.styleOption = styleOption;

    this.prefixUrlPost(ip, socket, queryOption);
    new IServiceLoadData("GET", this.urlAddress, this.queryOption, this.styleOption,
      this.map, this.onSuccess, this.onFailure);
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
    this.queryOption.aggfield = queryOption.space.field; //空间字段
    this.queryOption.spatialCondition = SPACE_ENUM_POLYGON + PARAM_SUB +
      queryOption.space.north + PARAM_COMMA + queryOption.space.west + PARAM_SPLIT +
      queryOption.space.north + PARAM_COMMA + queryOption.space.east + PARAM_SPLIT +
      queryOption.space.south + PARAM_COMMA + queryOption.space.east + PARAM_SPLIT +
      queryOption.space.south + PARAM_COMMA + queryOption.space.west;
    this.queryOption.aggGeoFormat = QUERY_GEOHASH_POINT; //结果以点的形式返回
    this.queryOption.percision = queryOption.space.percision;
    //处理时间属性参数
    this.queryOption.timefield = queryOption.time.field; //时间字段
    this.queryOption.timeCondition = "" + queryOption.time.starttime +
      PARAM_COMMA + queryOption.time.endtime; //时间起始时间
  }

  onSuccess(result, map, style){
    if(L.zondy.GeoHashLayer != undefined) L.zondy.GeoHashLayer.remove();
    var dataSet = [];
    var features = result.features;
    if(features == null || features == undefined) return;
    features.forEach(function(feature) {
      dataSet.push({
        geometry: {
          type: 'Point',
          coordinates: feature.geometry.coordinates
        },
        count: feature.properties.aggcount
      });
    });
    dataSet = new dataSet(dataSet);
    L.zondy.GeoHashLayer = new MapVLayer(map, dataSet, style).addTo(map);
  }

  onFailure(){

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

export var geoPointService = function(ip, socket, map, queryOption, styleOption) {
  return new GeoPointService(ip, socket, map, queryOption, styleOption);
};

L.zondy.GeoPointService = geoPointService;
