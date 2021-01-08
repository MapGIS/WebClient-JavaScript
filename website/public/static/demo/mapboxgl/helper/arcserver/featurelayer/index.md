# 非标准ogc wms地图服务加载出错
> 本质上是通过要素图层(Feature Layer)来实现 WMS的效果

[地图服务链接](http://192.168.27.33:6080/arcgis/rest/services/chanpin/xzq/MapServer)

![信息](../../static/demo/mapboxgl/helper/arcserver/featurelayer/info.png)

从服务链接进去可以看见这个是要素图层，4490坐标系。可以参考[要素图层](http://develop.smaryun.com:8899/#/demo/mapboxgl/arcgis-mapserver/arcgismapserver/featurelayer)

![BBox](../../static/demo/mapboxgl/helper/arcserver/featurelayer/bbox.png)

Bbox之前请求的范围不是经纬度的，像是墨卡托的。
![BBox](../../static/demo/mapboxgl/helper/arcserver/featurelayer/bbox-error.bmp)
请检查代码部分的坐标系, 初始化地图组件时候坐标系可能有问题
``` javascript
<mapbox-map
    id="map"
    v-bind:access-token="accessToken"
    v-bind:map-style="mapStyle"
    v-bind:zoom="mapZoom"
    v-bind:center="outerCenter"
    crs="EPSG:4326"   // 默认是EPSG:3857
    v-on:load="handleMapLoad"
>
</mapbox-map>
```
![BBox](../../static/demo/mapboxgl/helper/arcserver/featurelayer/bbox.png)
然后bbox正常之后
![Net-Error](../../static/demo/mapboxgl/helper/arcserver/featurelayer/net-error.png)
请求返回的任然不是图片是xml格式文件。代码报错`地图加载内容必须是png/jpeg/svg`

这个时候访问[服务地址](http://192.168.27.33:6080/arcgis/rest/services/chanpin/xzq/MapServer)
![Export](../../static/demo/mapboxgl/helper/arcserver/featurelayer/exportmap.png)

最底下 Export Map 点进去 打开f12
![Export](../../static/demo/mapboxgl/helper/arcserver/featurelayer/export.png)
检查这个URL和之前请求访问的URL

``` javascript
//这个是 Export Map里面请求的URL
http://192.168.27.33:6080/arcgis/services/chanpin/xianxzq/MapServer/WMSServer/export?F=image&FORMAT=PNG32&FORMAT=PNG32&LAYERS=show:0&SIZE=512,512&bbox=104.0625,27.421875,104.765625,28.125&DPI=90

//这个是自己写的请求的URL
http://192.168.27.33:6080/arcgis/rest/services/chanpin/xzq/MapServer/export?bbox=103.30955525542008,28.40020341081308,105.60811458705213,29.380541345215146
```

比较可以发现这个URL的前缀并不相同，修改对应的前缀后，成功出图
![预览](../../static/demo/mapboxgl/helper/arcserver/featurelayer/preview.png)
