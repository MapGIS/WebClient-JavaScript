## Layer Groups and Layers Control
这个教程将告诉你如何管理地图图层，并且如何使用图层切换控件轻松的切换地图上的不同图层。
#### 图层组
将一系列的图层合并到一个图层组中，代码如下所示：

```javascript
var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
var cities = L.layerGroup([littleton, denver, aurora, golden]);
```
#### 图层控制
Leaflet有一个很好的小控件，可以让用户控制他们在地图上看到的图层。除了向您展示如何使用它之外，我们还将向您展示另一个适用于图层组的方便用途。
- 底图：只有该图层在用户的地图上能被看到，例如瓦片图层。  
- 覆盖物图层：放置在底图上用户的东西。

```javascript
var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution}),
    streets   = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution});
//默认地图
var map = L.map('map', {   
    center: [31.73, 114.99],
    zoom: 10,
    layers: [grayscale, cities]
});
```
我们将创建两个对象。一个将包括我们的底图，一个将包括我们的覆盖物图层。这些对象里是一些简单的键值对。键是控件中显示的文本信息，例如”Streets”。相关的值是反映在图层中的值，例如streets。

```javascript
var baseMaps = {
    "Grayscale": grayscale,
    "Streets": streets
};
var overlayMaps = {
    "Cities": cities
};
//第一个参数是底图图层对象，第二个参数是覆盖物图层对象。两个参数都是可选的。
L.control.layers(baseMaps, overlayMaps).addTo(map);
```