## 加载 WMTS 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例加载了 WMTS 地图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，首先实例化`ol.layer.Tile`对象构建 WMTS 图层，再通过实例化`ol.source.WMTS`对象构建 WMTS 图层数据源。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图必要参数；

- Example:

  ```javascript
    var map = new ol.Map({
      target: 'mapCon',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
          opacity: 0.7,
        }),
      ],
      view: new ol.View({
        center: [-11158582, 4813697],
        zoom: 4,
        projection: 'EPSG:3857',
      }),
    })
  ```

**Step 4. <font color=red>构建 WMTS 图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`ol.layer.Tile`对象构建 WMTS 图层，再通过实例化`ol.source.WMTS`对象构建 WMTS 图层数据源；

- Example:

  ```javascript
    /*======创建WMTS图层对象并加载到地图中======*/
    var projection = ol.proj.get('EPSG:3857')
    var projectionExtent = projection.getExtent()
    var size = ol.extent.getWidth(projectionExtent) / 256

    var resolutions = new Array(14)
    var matrixIds = new Array(14)
    for (var z = 0; z < 14; ++z) {
      //为这个WMTS图层生存分辨率和matrixIds数组
      resolutions[z] = size / Math.pow(2, z)
      matrixIds[z] = z
    }
    var wmtsLayer = new ol.layer.Tile({
      opacity: 0.7,
      source: new ol.source.WMTS({
        url: 'https://services.arcgisonline.com/arcgis/rest/' + 'services/Demographics/USA_Population_Density/MapServer/WMTS/',
        layer: '0',
        matrixSet: 'EPSG:3857',
        format: 'image/png',
        projection: projection,
        tileGrid: new ol.tilegrid.WMTS({
          origin: ol.extent.getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds,
        }),
        style: 'default',
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
