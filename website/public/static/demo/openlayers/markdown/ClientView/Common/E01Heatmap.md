## 热力图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例在当前地图中加载了部分区域地震数据的热力图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先创建地图对象，添加 OSM 底图，后实例化`ol.layer.Heatmap`对象构建热力图图层并添加到地图中。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图必要参数；

- Example：
  ```javascript
    //初始化地图容器
    map = new ol.Map({
      target: 'mapCon', //地图容器div的ID
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: true,
        },
      }),
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [80, 30], //地图初始中心点
        maxZoom: 28, //最大瓦片显示级数
        minZoom: 1, //最小瓦片显示级数
        zoom: 3, //地图初始显示级数
      }),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM({ wrapX: false }),
          opacity: 0.7,
        }),
      ],
    })
  ```

**Step 4. <font color=red>构建热力图图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`ol.layer.Heatmap`对象构建热力图图层，并添加到地图中。

- Example：
    ```javascript
    source.addFeatures(features)
    //创建热力图层
    var Heatmap = new ol.layer.Heatmap({
      source,
      blur,
      radius,
      weight: 'weight', //默认热力图层权值字段（0-1）
    })
  ```

### 关键接口

#### 1.【热力图层类】`ol.layer.Heatmap`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Heatmap.html
