## 加载 OSM 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例加载了 OSM 地图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】开发库实现,通过`ol.source.OSM()`构建 OSM 图层数据源，然后构建 OSM 图层。然后将地图作为 openlayers 底图加载。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；js 脚本引入开发库；

**Step 2. <font color=red>构建 OSM 地图图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`ol.source.OSM()`构建 OSM 数据源，从而构建 OSM 地图图层；

- Example:

  ```javascript
    //加载瓦片图层数据（OSM）
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    })
  ```

**Step 3. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 4. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为 OSM 地图图层。

- Example:

  ```javascript
    //实例化Map对象加载地图
    var map = new ol.Map({
      //地图容器div的ID
      target: 'map',
      //地图容器中加载的图层
      layers: [
        //加载瓦片图层数据（OSM）
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      //地图视图设置
      view: new ol.View({
        //地图初始中心点
        center: [11550000, 3860000],
        //地图初始显示级别
        zoom: 4,
        //最小级别
        minZoom: 3,
        //最大级别
        maxZoom: 12,
      }),
    })
  ```

### 关键接口

#### 1.【OSM 地图类】`ol.source.OSM`

> 详细信息见 openlayers API: https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_OSM.html
