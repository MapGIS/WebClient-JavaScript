## 加载 WMTS 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例加载了 IGSverver 发布的 WMTS 地图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，首先实例化`ol.layer.Tile`对象构建 WMTS 图层，再通过实例化`ol.source.WMTS`对象构建 WMTS 图层数据源，其中 url 属性设置为 IGserver WMTS 图层访问链接。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建底图图层</font>**:
&nbsp;&nbsp;&nbsp;&nbsp;通过实例化`Zondy.Map.MapDocTileLayer`对象创建底图图层；

- Example:

  ```javascript
    //创建底图图层
    baseLayer = new Zondy.Map.MapDocTileLayer('MapGIS IGS VectorMapdocLayer', 'WorldJWVector', {
      //矢量地图文档地图服务器ip
      ip: `${ip}`,
      //矢量地图文档地图服务端口
      port: `${port}`,
      //是否作为基础显示图层，默认为true，表示最为基础显示图层
      isBaseLayer: true,
    })
  ```

**Step 4. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图必要参数；

- Example:

  ```javascript
    //初始化地图容器
    map = new ol.Map({
      target: 'mapCon',
      layers: [baseLayer],
      view: new ol.View({
        center: [114.3, 30.6],
        zoom: 12,
        projection: 'EPSG:4326',
      }),
    })
  ```

**Step 5. <font color=red>构建 WMTS 图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`ol.layer.Tile`对象构建 WMTS 图层，再通过实例化`ol.source.WMTS`对象构建 WMTS 图层数据源，其中 url 属性设置为 IGserver WMTS 图层访问链接；

- Example：

  ```javascript
    /*======创建WMTS图层对象并加载到地图中======*/
    var projection = ol.proj.get('EPSG:4326')
    //var projectionExtent = projection.getExtent();
    var projectionExtent = [114.125602229914, 30.4539323507469, 114.500788705197, 30.8291188260302]
    var size = ol.extent.getWidth(projectionExtent) / 256
    var resolutions = new Array(14)
    var matrixIds = new Array(14)
    for (var z = 0; z < 14; ++z) {
      //为这个WMTS图层生存分辨率和matrixIds数组
      resolutions[z] = size / Math.pow(2, z)
      matrixIds[z] = z
    }
    //WMTS服务访问基地址
    baseUrlTile = `${protocol}://${ip}:${port}/igs/rest/ogc/WMTSServer`
    //初始化WMTS图层对象
    wmtsLayer = new ol.layer.Tile({
      opacity: 1,
      source: new ol.source.WMTS({
        //WMTS服务基地址
        url: baseUrlTile,
        //WMTS服务图层
        layer: 'WhMapTileWMTS',
        //瓦片模型呈现标识，设置为投影坐标系
        matrixSet: 'EPSG:4326',
        //样式
        style: 'default',
        //瓦片图片格式
        format: 'image/png',
        tileGrid: new ol.tilegrid.WMTS({
          //原点（左上角）
          origin: ol.extent.getTopLeft(projectionExtent),
          //分辨率数组
          resolutions: resolutions,
          //矩阵标识列表，与地图级数保持一致
          matrixIds: matrixIds,
        }),
        //数据的投影坐标系
        projection: projection,
        wrapX: true,
      }),
    })
  ```

**Step 5. <font color=red>添加 WMTS 地图</font>**：
&ensp;&ensp;&ensp;&ensp;通过`map.addLayer()`方法添加 WMTS 地图图层。

- Example：

  ```javascript
    //添加WMTS地图图层
    map.addLayer(wmtsLayer)
  ```

### 关键接口

#### 1. 【切片图层类】`ol.layer.Tile`

> 详细信息见 openlayers API：https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Tile.html

#### 2.【Web 地图瓦片服务类】`ol.source.WMTS`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_WMTS.html
