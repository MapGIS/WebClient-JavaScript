## 加载 WMS 地图

### 示例功能

&ensp;&ensp;&ensp;&ensp;本示例加载了 IGSverver 发布的 WMS 地图。

### 示例实现

&ensp;&ensp;&ensp;&ensp;本示例需要使用【include-openlayers-local.js】开发库实现，首先实例化`ol.layer.Image`对象构建 WMS 图层，再通过实例化`ol.source.ImageWMS`对象构建 WMS 图层数据源，其中 url 属性设置为 IGserver WMS 图层访问链接。

> 开发库使用请参见*首页-概述-调用方式*。

### 实现步骤

**Step 1. <font color=red>引用开发库</font>**：
&ensp;&ensp;&ensp;&ensp;本示例引用 local 本地【include-openlayers-local.js 】开发库；

**Step 2. <font color=red>创建布局</font>**：
&ensp;&ensp;&ensp;&ensp;创建`id="mapCon"`的 div 作为地图容器，并设置其样式；

**Step 3. <font color=red>创建地图对象</font>**:
&ensp;&ensp;&ensp;&ensp;创建地图对象，设置地图的必要参数；

- Example:

  ```javascript
    //实例化Map对象加载地图,默认底图加载MapQuest地图
    var map = new ol.Map({
      target: 'mapCon',
      view: new ol.View({
        center: [11550000, 3860000],
        zoom: 3,
      }),
    })
  ```

**Step 4. <font color=red>构建 wms 地图图层</font>**:
&ensp;&ensp;&ensp;&ensp;实例化`ol.layer.Image`对象构建 WMS 图层，再通过实例化`ol.source.ImageWMS`对象构建 WMS 图层数据源，其中 url 属性设置为 IGserver WMS 图层访问链接；

- Example:

  ```javascript
    //实例化WMS图层对象（ol.layer.Image，ol.source.ImageWMS）
    wmsLayer = new ol.layer.Image({
      source: new ol.source.ImageWMS({
        //WMS服务基地址
        url: `${protocol}://${ip}:${port}/igs/rest/ogc/doc/WorldJWVector/WMSServer`,
        //图层等参数
        params: {
          LAYERS: '世界政区',
          TILED: true,
        },
        //服务类型
        serverType: 'geoserver',
      }),
    })
  ```

**Step 5. <font color=red>添加 WMS 图</font>**：
&ensp;&ensp;&ensp;&ensp;通过`map.addLayer()`方法添加 WMS 地图图层。

- Example：

  ```javascript
    //添加WMS地图图层
    map.addLayer(wmsLayer)
  ```

### 关键接口

#### 1.【图片数据图层类】`ol/layer/Image`

> 详细信息见 openlayers API:https://openlayers.org/en/v5.3.0/apidoc/module-ol_layer_Image.html

#### 2.【WMS 图片数据类】`ol.source.ImageWMS`

> 详细信息见 openlayers API：https://openlayers.org/en/v5.3.0/apidoc/module-ol_source_ImageWMS.html
