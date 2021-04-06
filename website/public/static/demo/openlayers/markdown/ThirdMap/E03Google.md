## 加载谷歌地图

### 示例功能

本示例加载了谷歌地图作为底图

### 示例实现

本示例需要使用 include-openlayers-local.js 开发库实现,通过`ol.source.XYZ()`构建 OSM 图层数据源，然后构建谷歌地图图层。然后将地图作为 openlayers 底图加载。

> 开发库使用请参见**首页**-**概述**-**原生 JS 调用**内容

1. 引用开发库，本示例通过本地离线 include-openlayers-local.js 脚本引入开发库；
2. 构建 OSM 地图图层
    ```javascript
        //加载谷歌地图图层数据
        var googleMapLayer = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'http://mt2.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil',
            }),
        })
    ```
3. 创建`id="mapCon"`的 div 作为地图容器，并设置其样式；
4. 创建地图对象，设置地图的必要参数,将 layers 属性设置为 OSM 地图图层
    ```javascript
        var map = new ol.Map({
            layers: [googleMapLayer],
            view: new ol.View({
                center: [106.51, 29.55],
                projection: 'EPSG:4326',
                zoom: 4,
            }),
            target: 'map',
        })
    ```

### 关键接口

#### ol.source.XYZ()

详细信息见 openlayers API
https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_XYZ.html
