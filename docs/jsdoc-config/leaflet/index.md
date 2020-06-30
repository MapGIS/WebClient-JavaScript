<br>

### MapGIS WebClient for Leaflet API

> `CANVAS 轻量级绘制,多插件.`

#### Leaflet 优点

> leaflet是常规的的最适合常规gis开发的地图，因此核心功能就是`传统GIS`功能.

1. `主流投影坐标支持`-几乎所有的主流投影坐标系都可以支持
1. 矢量表达-`矢量专题图`，矢量空间分析，矢量瓦片，矢量可视化等矢量表达
1. `全样式表达`-结合主流的互联网客户四化技术D3,Echarts,Mapv，几乎主要的地图的可视化表达都可以实现
1. 功能全，操作友好-功能全，插件丰富，`社区生态完善`.出现bug几乎百度找到，对开发者友好.
1. `跨平台`-兼容大部分浏览器，跨平台强.
1. `移动设备`的支持-内部代码框架设计的时候考虑到移动设备的支持.针对移动设备天然支持.


*   官网(website)：[http://client.snanyun.com:8899/ui/index.html](http://client.snanyun.com:8899/ui/index.html)

*   源码(source code)：[https://github.com/ParnDeedlit/WebClient-Leaflet](https://github.com/ParnDeedlit/WebClient-Leaflet)


#### IGServer
> igserver的Object,Catalog,Service的对象的分类与封装
    >> [Zondy.Object.Feature](Zondy.Object.Feature.html)<br>
    >> [Zondy.Catalog.MapDoc](Zondy.Catalog.MapDoc.html)<br>
    >> [Zondy.Service.GetDocImageService](Zondy.Service.GetDocImageService.html)<br>

#### DataStore

> ElasticSearch的时空聚类效果
    >> [L.zondy.GeoHashService](L.zondy.GeoHashService.html)<br>

#### D3，Echarts，MapV

> 丰富的可视化效果，矢量瓦片、客户端专题图、开源可视化库[ECharts](http://echarts.baidu.com/)，[MapV](http://mapv.baidu.com/)
    >> [L.zondy.EchartsLayer](L.zondy.EchartsLayer.html)<br>
    >> [L.zondy.MapVLayer](L.zondy.MapVLayer.html)<br>


#### 参考API

*   Leaflet API：[http://leafletjs.com/reference.html](http://leafletjs.com/reference.html)
*   D3:          [https://github.com/d3/d3/wiki](https://github.com/d3/d3/wiki)
*   ECharts API：[http://echarts.baidu.com/api.html#echarts](http://echarts.baidu.com/api.html#echarts)
*   MapV API：   [https://github.com/huiyan-fe/mapv/blob/master/API.md](https://github.com/huiyan-fe/mapv/blob/master/API.md)
