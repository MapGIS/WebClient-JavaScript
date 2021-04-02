## 加载 Bings 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例加载了 Bings 地图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用 【include-openlayers-local.js】开发库实现，首先通过`ol.source.BingMap`方法构建 Bings 地图图层，然后将地图作为 openlayers 底图加载。

> 开发库使用请参见*首页-概述-调用方式*。

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;引用开发库，本示例通过本地离线 include-openlayers-local.js 脚本引入开发库；

**Step 2. <font color=red>构建 Bings 地图图层</font>**:
&ensp;&ensp;&ensp;&ensp;构建 Bings 地图图层；

- Example:
  ```javascript
    //实例化Map对象加载地图
    var key = 'Q57tupj2UBsQNQdju4xL~xBceblfTd6icjljunbuaCw~AhwA-whmGMsfIpVhslZyknWhFYq-GvWJZqBnqV8Zq1uRlI5YM_qr7_hxvdgnU7nH'
    var roads = new ol.layer.Tile({
      source: new ol.source.BingMaps({
        key: key,
        imagerySet: 'Road',
      }),
    })
  ```

**Step 3. <font color=red>创建布局</font>**:
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 4. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数,将 layers 属性设置为 Bings 地图图层。

- Example:
  ```javascript
    var map = new ol.Map({
      layers: [roads],
      target: 'mapCon',
      view: new ol.View({
        center: ol.proj.fromLonLat([104, 30]),
        zoom: 4,
      }),
    })
  ```

### 关键接口

#### 【Bings 地图类】`ol.source.BingMap`

详细内容见 openlayers API
https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_BingMaps.html
