### 问题本质核心关键

> `动态投影` + 数据范围 + `图层名称`

### 解决方案
1. 坐标问题：由于你使用的是**天地图**裁图方式，对应的EPSG编号是EPSG：4326，因此需要将原始的墨卡托/高斯坐标动态投影成经纬度的方式， 采取的办法是**地图文档-动态投影**.
2. 图层对应：由于地图文档出图是实时出图的方式，因此再脚本代码中传入的图层的名字必须要和地图文档的名字一致

### 解决步骤
1. 打开MapGIS K10设置地图文档
![igserver](../demo/leaflet/markdown/map/ogc/document.png)
2. 检查**数据图层Layer**的`参照系`
![igserver](../demo/leaflet/markdown/map/ogc/layerinfo.png)

3. `关键步骤`:检查**地图文档**的`动态投影`信息
![igserver](../demo/leaflet/markdown/map/ogc/document_dynamic.png)

4. **地图文档**发布
![igserver](../demo/leaflet/markdown/map/ogc/igserver_document.png)

    > 选择分辨率按钮， 再点击 **天地图配置**

    ![igserver](../demo/leaflet/markdown/map/ogc/igserver_document_config.png)

5. **ogc地图文档**服务发布

    ![igserver](../demo/leaflet/markdown/map/ogc/igserver_ogc_map.png)
    ![igserver](../demo/leaflet/markdown/map/ogc/igserver_ogc_config.png)

6. 前端脚本关键语法

    ![igserver](../demo/leaflet/markdown/map/ogc/layers_name.png)

``` javascript
 //wms服务
var Layer = L.tileLayer.wms('http://192.168.10.185:6163/igs/rest/ogc/doc/EPSG_4326/WMSServer', {
	//图层名称
	layers: '一级道路',  //此处的名称要与上面地图文档的名称一一对应，多个图层逗号分割
	//wms版本号
	version: '1.3.0'
}).addTo(map);
```
