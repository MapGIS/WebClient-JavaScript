# wms

> Web 地图服务（WMS）能够根据用户的请求返回相应的地图（包括 PNG，GIF，JPEG 等栅格形式或者是 SVG 和 WEB CGM 等矢量形式）。

WMS 支持网络协议 HTTP，所支持的操作是由 URL 定义的。

有三个重要操作 GetCapabilities，GetMap，GetFeatureinfo。

1. GetCapabilities 返回服务级元数据。
1. GetMap 返回一个地图影像。
1. GetFeatureinfo 返回显示在地图上的某些特殊要素的信息。

还有一些其它操作如 DescribeLayer，GetLegendGraphic，GetStyles，SetSytles。　
事实上用传统的观点来解释，GetMap 获得的就是在桌面程序中画在控件上的里的结果，是数据的表现。
GetFeatureInfo 更容易理解，它和几乎所有的桌面程序上都用的 Info 按钮功能相同，都是用来获得屏幕坐标某处的信息，GetFeatureInfo 中的参数是屏幕坐标、当前视图范
围等，在一定程度上也方便了客户端的编写。
GetFeatureInfo 可以同时返回多个图层中的要素信息，这一点和 ArcGIS Desktop 等也都是相同的。WMS 还包括一些 GetLegend 之类的返回图例信息的请求，也是完全按照桌面
既有的标准定义的。

# 英文原址
[OpenGIS Web Map Service (WMS) Implementation Specification](https://www.ogc.org/docs/is/)

## GetMap

1. url
   | Request parameter | Mandatory/optional | Description |
   | :---------------------- | :----------------- | :------------------------------------------ |
   | VERSION=version | |M| | Request version |
   | SERVICE=WMS | |M| | Service type |
   | REQUEST=GetCapabilities | |M| | Request name |
   | FORMAT=MIME_type | |M| | Output format of service metadata |
   | UPDATESEQUENCE=string | |M| | Sequence number or string for cache control |

2. param
   |Request parameter |Mandatory/optional |Description|
   | :---------------------- | :----------------- | :------------------------------------------ |
   |VERSION=1.3.0 |M|Request version.|
   |REQUEST=GetMap |M| Request name.|
   |LAYERS=layer_list |M| Comma-separated list of one or more map layers.|
   |STYLES=style_list |M| Comma-separated list of one rendering style per requested layer.|
   |CRS=namespace:identifier |M| Coordinate reference system.|
   |BBOX=minx,miny,maxx,maxy |M| Bounding box corners (lower left, upper right) in CRS units.|
   |WIDTH=output_width |M| Width in pixels of map picture.|
   |HEIGHT=output_height |M| Height in pixels of map picture.|
   |FORMAT=output_format |M| Output format of map.|
   |TRANSPARENT=TRUE|FALSE |M| Background transparency of map (default=FALSE).|
   |BGCOLOR=color_value |M| Hexadecimal red-green-blue colour value for the background color (default=0xFFFFFF).|
   |EXCEPTIONS=exception_format |M| The format in which exceptions are to be reported by the WMS (default=XML).|
   |TIME=time |M| Time value of layer desired.|
   |ELEVATION=elevation |M| Elevation of layer desired.|
   |Other sample dimension(s) |M| Value of other dimensions as appropriate. |


### 问题本质核心关键

> `动态投影` + 数据范围 + `图层名称`

### 解决方案
1. 坐标问题：由于你使用的是**天地图**裁图方式，对应的EPSG编号是EPSG：4326，因此需要将原始的墨卡托/高斯坐标动态投影成经纬度的方式， 采取的办法是**地图文档-动态投影**.
2. 图层对应：由于地图文档出图是实时出图的方式，因此再脚本代码中传入的图层的名字必须要和地图文档的名字一致

### 解决步骤
1. 打开MapGIS K10设置地图文档
![igserver](../static/demo/leaflet/markdown/ogc/document.png)
2. 检查**数据图层Layer**的`参照系`
![igserver](../static/demo/leaflet/markdown/ogc/layerinfo.png)

3. `关键步骤`:检查**地图文档**的`动态投影`信息
![igserver](../static/demo/leaflet/markdown/ogc/document_dynamic.png)

4. **地图文档**发布
![igserver](../static/demo/leaflet/markdown/ogc/igserver_document.png)

    > 选择分辨率按钮， 再点击 **天地图配置**

    ![igserver](../static/demo/leaflet/markdown/ogc/igserver_document_config.png)

5. **ogc地图文档**服务发布

    ![igserver](../static/demo/leaflet/markdown/ogc/igserver_ogc_map.png)
    ![igserver](../static/demo/leaflet/markdown/ogc/igserver_ogc_config.png)

6. 前端脚本关键语法

    ![igserver](../static/demo/leaflet/markdown/ogc/layers_name.png)

``` javascript
 //wms服务
var Layer = L.tileLayer.wms('http://192.168.10.185:6163/igs/rest/ogc/doc/EPSG_4326/WMSServer', {
	//图层名称
	layers: '一级道路',  //此处的名称要与上面地图文档的名称一一对应，多个图层逗号分割
	//wms版本号
	version: '1.3.0'
}).addTo(map);
```
