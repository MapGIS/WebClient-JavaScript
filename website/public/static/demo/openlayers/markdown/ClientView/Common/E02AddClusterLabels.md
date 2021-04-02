## 聚合标注

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例实现向地图中添加聚合标注的功能。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库，首先实例化`ol.source.Cluster`对象构建聚合标注图层数据源，然后创建地图对象，添加底图以及聚合标注图层。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>构建聚合标注图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`ol.source.Cluster`对象构建聚合标注图层数据源，然后构建聚合标注图层；

- Example:

  ```javascript
    var vectorSource = new ol.source.Vector({ wrapX: false })
    var features = []
    for (var i in data) {
      var att = parseFloat(data[i].magnitude)
      for (var j in data[i].coordinates) {
        var newFeature = createFeature([parseFloat(data[i].coordinates[j][0]), parseFloat(data[i].coordinates[j][1])], att)
        features.push(newFeature)
      }
    }
    vectorSource.addFeatures(features)
    var clusterLayer = new ol.layer.Vector({
      source: new ol.source.Cluster({
        distance: 40, //最近的聚合图元距离(单位:像素)
        source: vectorSource,
        wrapX: false,
      }),
      style: styleFunction,
    })
  ```

**Step 4. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图必要参数。

- Example：

  ```javascript
    //初始化地图容器
    var map = new ol.Map({
      target: 'mapCon', //地图容器div的ID
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: true,
        },
      }),
      interactions: ol.interaction.defaults().extend([
        new ol.interaction.Select({
          condition: function(evt) {
            return evt.type == 'singleclick' || evt.type == 'pointermove'
          },
          style: selectStyleFunction,
          layers: [clusterLayer],
          wrapX: false,
        }),
      ]),
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
    map.addLayer(clusterLayer)
  ```

### 关键接口

#### 1.【聚合标注图层类】`ol.source.Cluster`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_Cluster.html
