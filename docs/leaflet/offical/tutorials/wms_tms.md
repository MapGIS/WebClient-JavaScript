## WMS and TMS
WMS（Web Map Service），网络地图服务。
TMS（Tiled Map Service），切片地图服务。

#### Leaflet中的WMS
在leaflet中使用WMS：

```javascript
var map = L.map(mapDiv, mapOptions);
var wmsLayer = L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', wmsOptions).addTo(map);
//一个L.TileLayer.WMS需要至少一个选项：layers。
```
注意Leaflet只支持很少的坐标系：CRS:3857、CRS:3395和CRS:4326（详细信息请看文档中的L.CRS）。如何你的WMS服务在这些坐标系中没有显示内容，你可能需要使用Proj4Leaflet这个插件，从而在Leaflet是使用其他坐标系。注意在初始化地图和加载WMS服务的时候，请使用正确的坐标系：

```javascript
var map = L.map('map', {
    crs: L.CRS.EPSG4326
});
var wmsLayer = L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', {
    layers: 'nasa:bluemarble'
}).addTo(map);
```
#### Leaflet中的TMS
Leaflet没有清晰的表明支持TMS服务，但是瓦片名称结构与L.TileLayer的命名规范是非常类似的，所以它经常用来显示TMS服务。  
在Leaflet 1.0中添加了一个新的特性，就是可以在URL中使用{-y}来代替tms: true选项，例如：

```javascript
var layer = L.tileLayer('http://base_url/tms/1.0.0/tileset/{z}/{x}/{-y}.png');
```
在Leaflet 0.7版本中的`tms: true`或者在Leaflet 1.0中的`{-y}`都是必须的，因为L.TileLayer的坐标原点在左上角，所以Y坐标向下的。在TMS中，原点坐标在左下角，Y坐标上向上的。
除了Y坐标的不同，TMS服务的行为都是与L.TileLayer一致的。
