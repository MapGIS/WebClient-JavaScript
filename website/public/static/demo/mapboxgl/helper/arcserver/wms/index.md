# ArcServer OGC WMS
> 本质是两类问题：  
> 1. arcserver wms`规则对应`
> 2. arcserver `&reversebbox=true`将bbox的经纬度位置互换 `[minx, miny, maxx, maxy]` => `[miny, minx, maxy, maxx]`

## 标准ogc wms地图服务加载出错
[地图服务链接](http://192.168.27.33:6080/arcgis/services/chanpin/xianxzq/MapServer/WMSServer)


[查看地图服务信息URL](http://192.168.27.33:6080/arcgis/services/chanpin/xianxzq/MapServer/WMSServer?request=GetCapabilities&service=WMS )
http://192.168.27.33:6080/arcgis/services/chanpin/xianxzq/MapServer/WMSServer?request=GetCapabilities&service=WMS 

## 参考demo
[WebClient](http://develop.smaryun.com:8899/#/demo/mapboxgl/arcgis-mapserver/arcgisogc/wmsreverse)
http://develop.smaryun.com:8899/#/demo/mapboxgl/arcgis-mapserver/arcgisogc/wmsreverse

结合参考demo 加载地图时这样拼接URL
``` javascript
vm.igsWmsObj.source.tiles =  [`http://192.168.27.33:6080/arcgis/services/chanpin/xianxzq/MapServer/WMSServer?`+
    "service=WMS" +
    "&request=GetMap" +
    "&layers=" +
    "0" +
    "&styles=default" +
    "&format=image/png" +
    "&transparent=true" +
    "&version=1.3.0" + 
    "&height=512" +
    "&width=512" +
    "&crs=EPSG:4490" +
    "&bbox={bbox}&reversebbox=true"]
```
然后在地图请求的时候 一切正常 但是地图加载不出来
F12中network请求返回的是空图片
![网络请求](../../static/demo/mapboxgl/helper/arcserver/wms/http.png)

然后将URL粘到上面的参考demo上可以正确展示：
![DEMO](../../static/demo/mapboxgl/helper/arcserver/wms/demo-show.png)
在这个可以正确展示的demo里面 bbox请求是：
![reverse-bbox](../../static/demo/mapboxgl/helper/arcserver/wms/reverse-bbox.png)
需要调序
``` javascript
 tiles: [
    `http://219.142.81.85/arcgis/services/10wanZH/MapServer/WMSServer?` +
    "service=WMS" +
    "&request=GetMap" +
    "&layers=" +
    "0,1,2,3,5,7,9,11" +
    "&styles=" +
    "&format=image/png" +
    "&transparent=true" +
    "&version=1.3.0" + 
    "&height=512" +
    "&width=512" +
    "&crs=EPSG:4326" +
    "&bbox={bbox}" + 
    "&reversebbox=true"  // 部分arcgis需要转置bbox的顺序
]
```
但是这里的调序没有生效 ,需要更新mapbox
![vue-mapbox](../../static/demo/mapboxgl/helper/arcserver/wms/vue-mapboxgl.png)
![mapbox](../../static/demo/mapboxgl/helper/arcserver/wms/mapbox.png)


更新后的mapbox实例在onMapLoaded事件中会返回一个mapbox，注册到全局就行了
``` javascript
 <mapbox-map
    id="map"
    v-bind:access-token="accessToken"
    v-bind:map-style="mapStyle"
    v-bind:zoom="mapZoom"
    v-bind:center="outerCenter"
    v-bind:crs="mapCrs"
    v-on:load="onMapLoad"
>
</mapbox-map>

onMapLoad(payload) {
    console.log('payload', payload);
    this.mapbox = payload.mapbox;
}
```
![mapbox](../../static/demo/mapboxgl/helper/arcserver/wms/payload.png)