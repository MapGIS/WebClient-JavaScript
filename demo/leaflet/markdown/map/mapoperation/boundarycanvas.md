### 地图多边形裁剪
> `说明:`这里的地图裁剪，不是真正意义上的裁剪，只是通过绘制一个多边形地图容器，在绘制的多边形容器中显示要裁剪的地图，以达到显示为裁剪的效果。

```javascript
//BoundaryCanvas.js有两种调用方法：
//第一种：传入地图路径url
L.TileLayer.boundaryCanvas(url, {
                boundary: geoJSON,//绘制的多边形范围，使用Leaflet标注的GeoJSON格式
                attribution: ""
            }).addTo(map);

//第二种：传入地图，layer可以是多图层
L.TileLayer.BoundaryCanvas.createFromLayer(layer, {
                boundary: geoJSON,//绘制的多边形范围，使用Leaflet标注的GeoJSON格式
                attribution: ""
            }).addTo(map);

``` 

>gitHub上原生插件BoundaryCanvas.js只支持标准的瓦片地图，在此基础上，`新增支持WMTS和WMS`，具体使用方法如下：

```javascript
//对于wmts和wms新增ogc属性，如果传入的是wmts地图，则ogc设置如下：
ogc={
    wmts:true//（默认为false）
    }
//如果传入的是wms地图，则ogc设置如下：
ogc={
    wmts:true//（默认为false）
    }
L.TileLayer.BoundaryCanvas.createFromLayer(layer, {
                boundary: geoJSON,//绘制的多边形范围，使用Leaflet标注的GeoJSON格式
                ogc:ogc
            }).addTo(map);

``` 